#!/usr/bin/env bash
# Creates a project-only Git repository from this project, WITHOUT touching the
# repository in your home folder, its branches, its remotes or any staged file.
# Everything it creates is a new directory; delete that directory to undo.
#
#   scripts/prepare-clean-repo.sh [target-dir]
#
# The new repository has:
#   - the history of the already-prepared project-only branch (english-saathi-clean),
#   - one extra commit with the current working tree of this project,
#   - NO remote (so nothing can be pushed by accident) and no credentials.
# Pushing it anywhere is a separate, deliberate step (see docs/repo-isolation.md).
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HOME_REPO="$(git -C "$PROJECT_DIR" rev-parse --show-toplevel)"
PREFIX="${PROJECT_DIR#"$HOME_REPO"/}"
TARGET="${1:-$HOME_REPO/Sites/english-saathi-clean}"
BASE_BRANCH="english-saathi-clean"

if [ -e "$TARGET" ]; then echo "Refusing: $TARGET already exists." >&2; exit 1; fi
if ! git -C "$HOME_REPO" rev-parse --verify -q "$BASE_BRANCH" >/dev/null; then
  echo "Branch $BASE_BRANCH not found; creating it with git subtree split (read-only for your other branches)." >&2
  (cd "$HOME_REPO" && git subtree split --prefix="$PREFIX" -b "$BASE_BRANCH" >/dev/null)
fi

# 1. Clone only the project-only branch (local clone: no network, no credentials).
git clone --quiet --single-branch --branch "$BASE_BRANCH" --no-hardlinks "file://$HOME_REPO" "$TARGET"
git -C "$TARGET" remote remove origin
git -C "$TARGET" checkout --quiet -b main

# 2. Bring the working tree up to date: tracked + untracked files that are not
#    ignored, minus the Android debug keystore (regenerate it locally).
cd "$PROJECT_DIR"
LIST="$(mktemp)"
git ls-files -co --exclude-standard | grep -v '^android/app/debug\.keystore$' | sort -u > "$LIST"
# Remove files that no longer exist in the project, then copy everything else.
( cd "$TARGET" && git ls-files ) | while read -r f; do
  grep -qxF "$f" "$LIST" || rm -f "$TARGET/$f"
done
rsync -a --files-from="$LIST" "$PROJECT_DIR"/ "$TARGET"/
rm -f "$LIST"

# 3. Commit (uses your configured Git identity).
cd "$TARGET"
git add -A
if git diff --cached --quiet; then echo "No changes beyond the base branch."; else
  git commit --quiet -m "Reliability, accurate indicators, audit docs and past-tense unit

Project-only snapshot prepared by scripts/prepare-clean-repo.sh."
fi
echo "Created $TARGET"
git log --oneline | head -5
echo "Remotes: [$(git remote | tr '\n' ' ')]  (none by design)"
