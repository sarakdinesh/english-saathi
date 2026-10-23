#!/usr/bin/env bash
# Production release for Google Play: checks, version bump, signed AAB,
# signature check, release commit + tag. See docs/publishing.md.
#
#   npm run release:android -- patch      # 1.0.0 -> 1.0.1
#   npm run release:android -- minor      # 1.0.0 -> 1.1.0
#   npm run release:android -- 2.0.0      # explicit versionName
#   npm run release:android -- same      # keep versionName (versionCode still +1)
#   npm run release:android -- check      # preflight only, changes nothing
#
# versionCode always goes up by one: Play rejects a code it has seen before.
set -euo pipefail

cd "$(dirname "$0")/.."
BUMP="${1:-}"
case "$BUMP" in
  patch|minor|major|same|check) ;;
  [0-9]*.[0-9]*.[0-9]*) ;;
  *) echo "Usage: npm run release:android -- <patch|minor|major|same|X.Y.Z|check>" >&2; exit 2 ;;
esac

fail() { echo "✖ $*" >&2; exit 1; }
step() { echo; echo "▶ $*"; }

export JAVA_HOME="${JAVA_HOME:-/Applications/Android Studio.app/Contents/jbr/Contents/Home}"
KEYTOOL="$JAVA_HOME/bin/keytool"
[ -x "$KEYTOOL" ] || fail "JDK not found at JAVA_HOME=$JAVA_HOME"

# ---- Preflight ---------------------------------------------------------------
step "Preflight"
[ "$(git rev-parse --abbrev-ref HEAD)" = "main" ] || fail "Release from main (currently on $(git rev-parse --abbrev-ref HEAD))."
[ -z "$(git status --porcelain)" ] || fail "Working tree has uncommitted changes. Commit or stash them first."

# Upload key: ~/.gradle/gradle.properties, or ORG_GRADLE_PROJECT_* env vars (CI).
prop() {
  local name="$1" env="ORG_GRADLE_PROJECT_$1"
  if [ -n "${!env:-}" ]; then echo "${!env}"; return; fi
  [ -f "$HOME/.gradle/gradle.properties" ] && sed -n "s/^$name=//p" "$HOME/.gradle/gradle.properties" | tail -1
}
STORE_FILE="$(prop BOLUYA_UPLOAD_STORE_FILE)"
[ -n "$STORE_FILE" ] || fail "BOLUYA_UPLOAD_STORE_FILE not set in ~/.gradle/gradle.properties. See docs/upload-key-and-phone-test.md, Part 1."
[ -f "$STORE_FILE" ] || fail "Upload key not found: $STORE_FILE"
for p in BOLUYA_UPLOAD_STORE_PASSWORD BOLUYA_UPLOAD_KEY_ALIAS BOLUYA_UPLOAD_KEY_PASSWORD; do
  [ -n "$(prop "$p")" ] || fail "$p not set in ~/.gradle/gradle.properties."
done
echo "Upload key: $STORE_FILE"

step "Typecheck and tests"
npm run typecheck
npm test

if [ "$BUMP" = "check" ]; then
  echo; echo "✔ Preflight passed. Nothing was changed."
  exit 0
fi

# ---- Version bump (app.json is the single source) ----------------------------
step "Version bump"
cp app.json app.json.release-backup
restore() { [ -f app.json.release-backup ] && mv app.json.release-backup app.json && echo "app.json restored."; }
trap 'restore' EXIT  # also on failures inside subshells

read -r VERSION CODE < <(node -e '
  const fs = require("fs");
  const bump = process.argv[1];
  const cfg = JSON.parse(fs.readFileSync("app.json", "utf8"));
  const [ma, mi, pa] = cfg.expo.version.split(".").map(Number);
  const next = { patch: `${ma}.${mi}.${pa + 1}`, minor: `${ma}.${mi + 1}.0`,
                 major: `${ma + 1}.0.0`, same: cfg.expo.version }[bump] ?? bump;
  cfg.expo.version = next;
  cfg.expo.android.versionCode += 1;
  fs.writeFileSync("app.json", JSON.stringify(cfg, null, 2) + "\n");
  console.log(next, cfg.expo.android.versionCode);
' "$BUMP")
TAG="v$VERSION+$CODE"
git rev-parse -q --verify "refs/tags/$TAG" >/dev/null && fail "Tag $TAG already exists."
echo "versionName $VERSION, versionCode $CODE"

# ---- Build -------------------------------------------------------------------
step "Build signed AAB"
(cd android && NODE_ENV=production ./gradlew clean :app:bundleRelease -PboluyaStoreRelease=true --max-workers=4)
AAB=android/app/build/outputs/bundle/release/app-release.aab
[ -f "$AAB" ] || fail "Build finished but $AAB is missing."

step "Verify signature"
CERT="$("$KEYTOOL" -printcert -jarfile "$AAB")"
echo "$CERT" | grep -m1 "Owner:"
echo "$CERT" | grep -q "Android Debug" && fail "AAB is signed with the debug key. Not store-ready."

mkdir -p artifacts
OUT="artifacts/english-boluya-$VERSION-$CODE.aab"
cp "$AAB" "$OUT"
shasum -a 256 "$OUT" | tee "$OUT.sha256"

# ---- Record the release ------------------------------------------------------
step "Commit and tag"
rm -f app.json.release-backup
trap - EXIT
git add app.json
git commit -m "Release $VERSION (versionCode $CODE)"
git tag -a "$TAG" -m "English Boluya $VERSION (versionCode $CODE), Google Play"

cat <<EOF

✔ Release $VERSION ($CODE) built: $OUT

Next:
  1. Play Console → English Boluya → Testing → Internal testing → Create new release
     → upload $OUT, add release notes, Save → Review → Roll out.
  2. Install from the internal-testing link on a phone and run the smoke test
     (docs/publishing.md, "Every release", step 5).
  3. Promote the same release to Production (start with a staged rollout, e.g. 20%).
  4. Push the release commit and tag:
       git push origin main --follow-tags
EOF
