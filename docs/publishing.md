# Publishing English Boluya to Google Play (production)

One command builds a store-ready release; the Play Console steps stay manual so a person always decides what goes live.

- **Version source:** `app.json` → `expo.version` (versionName, shown to users) and `expo.android.versionCode` (must go up for every upload). Gradle and EAS both read it; never edit `build.gradle` for a version.
- **Signing:** your upload key from `~/.gradle/gradle.properties`. Store builds (`-PboluyaStoreRelease=true`) **fail** instead of falling back to the debug key.
- **Output:** `artifacts/english-boluya-<version>-<code>.aab` plus a `.sha256` file, a release commit and a tag `v<version>+<code>`.

---

## First release only (once)

1. **Upload key** — create it and add the four `BOLUYA_UPLOAD_*` lines to `~/.gradle/gradle.properties`: [upload-key-and-phone-test.md](upload-key-and-phone-test.md), Part 1, steps 1–3 and 6 (backup).
2. **Final application ID** — decide now; it can never change after the first upload ([release-readiness.md](release-readiness.md#should-the-application-id-change)).
3. **Privacy policy URL** — required because the app asks for the microphone. Base it on the Data safety answers in [release-readiness.md](release-readiness.md#data-safety-draft-answers-for-play-console) and host it on a public page.
4. **Play Console** (play.google.com/console, one-time USD 25 developer account):
   1. *Create app* → name "English Boluya", default language Marathi (mr-IN) or English, App, Free.
   2. *App content*: privacy policy URL, ads = none, app access = no login needed, content rating questionnaire, target audience, Data safety (from the draft), foreground-service declaration for expo-audio if Play asks.
   3. *Store listing*: short and full description (Marathi + English), icon 512×512, feature graphic 1024×500, at least 2 phone screenshots from the release build.
   4. *Setup → App signing*: keep **Play App Signing** on (default). Google then holds the final key and can reset a lost upload key.
5. Check everything locally without changing anything:

   ```bash
   npm run release:check
   ```

---

## Every release

1. **Start clean on `main`** with everything committed. The script stops on a dirty tree or another branch.
2. **Run the release** — choose how the visible version changes:

   ```bash
   npm run release:android -- patch
   ```

   | Argument | versionName | When |
   | --- | --- | --- |
   | `patch` | 1.0.0 → 1.0.1 | Fixes, content corrections |
   | `minor` | 1.0.0 → 1.1.0 | New lessons or features |
   | `major` | 1.0.0 → 2.0.0 | Large redesign |
   | `same` | unchanged | Re-upload after a rejected build |
   | `X.Y.Z` | exactly that | Anything else |

   versionCode always goes up by one. The script then: checks the upload key, runs `typecheck` and the full `npm test`, bumps `app.json`, runs `./gradlew clean :app:bundleRelease`, refuses a debug-signed bundle, copies the AAB to `artifacts/`, and makes the release commit and tag. If any step fails, `app.json` is restored and nothing is committed.
3. **Upload to internal testing first** — Play Console → *Testing → Internal testing → Create new release* → upload the `.aab` from `artifacts/` → release notes (Marathi + English) → *Review release* → *Start rollout*.
4. **Install it** from the internal-testing opt-in link (testers list: your own Google account at least). It's the exact bundle that production users will get.
5. **Smoke test on the phone** (about 10 minutes; the full list is in [upload-key-and-phone-test.md](upload-key-and-phone-test.md), Part 2):
   - upgrade over the previous Play version: progress, streak and bookmarks kept;
   - one lesson end to end with 🔊 audio and a recording;
   - airplane mode: Home, Learn, a lesson;
   - daily reminder test notification;
   - dark mode and largest font: nothing cut off.
6. **Promote to production** — *Internal testing → Promote release → Production*, choose a **staged rollout** (e.g. 20%), then *Review → Start rollout*. Watch *Quality → Android vitals* (crashes, ANRs) for 1–2 days, then raise to 100%.
7. **Push the release record:**

   ```bash
   git push origin main --follow-tags
   ```

### If something goes wrong

- **Bad build in internal testing:** fix, commit, run `npm run release:android -- same` (new versionCode, same versionName), upload again.
- **Bad build in production:** *Production → Releases → Halt rollout*. Play cannot roll back to a lower versionCode, so ship a fixed build with `patch`.
- **"Version code N has already been used":** someone uploaded without the script. Set `expo.android.versionCode` in `app.json` to the highest code in Play Console, commit, and release again.
- **Upload key lost:** Play Console → *Setup → App signing → Request upload key reset* (works only because Play App Signing is on).

---

## Alternative: EAS cloud build

`eas.json` has a matching `production` profile (AAB, version from `app.json`) and a `submit` profile that sends a draft to the internal track. It needs an Expo account and lets EAS hold its own copy of the upload key, so pick **one** path and stick to it.

```bash
npx eas-cli build --platform android --profile production
```

```bash
npx eas-cli submit --platform android --profile production
```

With EAS, raise `expo.version` and `expo.android.versionCode` in `app.json` yourself and commit before each build.
