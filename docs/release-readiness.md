# Release readiness — English Boluya (Android)

Status on 22 October 2026. "Verified" means checked in this repository by a command or file inspection; nothing here was tested on a physical device in this round.

## Identity

| Item | Value | Status |
| --- | --- | --- |
| Display name | English Boluya (`app.json`, `strings.xml`, web title) | Verified by `scripts/check-app.ts` |
| Marathi name / tagline | इंग्लिश बोलूया · आपल्या भाषेत शिकूया, इंग्रजीत बोलूया! (`src/brand.ts`) | Verified |
| Application ID | `com.englishsaathi.learn` — **kept** | Decision needed (below) |
| Storage key | `english-saathi.progress.v1` — **kept** | Must never change without a migration |
| Version | `versionName 1.0.0`, `versionCode 1` (override with `-PboluyaVersionCode=N`) | Raise for every Play upload |
| Icon / adaptive icon / splash | New English Boluya artwork in `assets/` and `mipmap-*` | Present; not re-reviewed on a device this round |

### Should the application ID change?

The ID is the app's permanent identity on Google Play and on the phone. Changing it to something like `com.englishboluya.app` creates a *different app*: existing testers would get a second icon and start with empty progress, because Android keeps data per application ID.

- **Not yet published on Play:** this is the last cheap moment to choose a final ID. If you want `com.englishboluya…`, change it before the first upload (namespace, `applicationId`, Kotlin package directory, `app.json`). Testers would need to export a backup from the old app and import it in the new one (Settings → Backup already supports this).
- **Already published:** keep `com.englishsaathi.learn`. Users never see it.

This is a product decision, so it was not changed.

## Signing (fixed in this round)

Release builds used the public debug key. `android/app/build.gradle` now:

- signs `release` with an **upload key** when `BOLUYA_UPLOAD_STORE_FILE` is set;
- otherwise falls back to the debug key and prints a Gradle warning that the build is **not store-ready**.

Set up once (values never go into the repository):

```properties
# ~/.gradle/gradle.properties  (outside the project)
BOLUYA_UPLOAD_STORE_FILE=/absolute/path/to/boluya-upload.jks
BOLUYA_UPLOAD_STORE_PASSWORD=…
BOLUYA_UPLOAD_KEY_ALIAS=boluya-upload
BOLUYA_UPLOAD_KEY_PASSWORD=…
```

Create the key with `keytool -genkeypair -v -storetype PKCS12 -keystore boluya-upload.jks -alias boluya-upload -keyalg RSA -keysize 2048 -validity 10000`, back it up somewhere safe, and enrol in **Play App Signing** so Google holds the final signing key. `.gitignore` now excludes `*.keystore`, `*.jks`, `*.p12`, `*.pem`, `.env*`.

If you build with EAS instead (`eas.json` has a `production` profile), EAS-managed credentials replace these properties.

## Permissions (fixed in this round)

Merged release manifest, verified with `./gradlew :app:processReleaseMainManifest`:

| Permission | Why |
| --- | --- |
| RECORD_AUDIO | Self-recording practice (asked at first use) |
| POST_NOTIFICATIONS, RECEIVE_BOOT_COMPLETED, WAKE_LOCK, VIBRATE | Optional daily reminder (expo-notifications) |
| INTERNET | React Native runtime; the learning content itself needs no network |
| MODIFY_AUDIO_SETTINGS, FOREGROUND_SERVICE, FOREGROUND_SERVICE_MEDIA_PLAYBACK | Added by expo-audio. Background playback is disabled in config, but Play Console will ask for a foreground-service declaration — check whether it can be removed with `tools:node="remove"` after a device test |
| DUMP, BIND_JOB_SERVICE, READ_APP_BADGE | Added by libraries; not user-facing |

**Removed:** `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE` (backups use the share sheet and pasted text) and `SYSTEM_ALERT_WINDOW` (now only in the debug manifest for the developer menu). `app.json` `blockedPermissions` mirrors this if the native project is ever regenerated with `expo prebuild`.

## Data safety (draft answers for Play Console)

- No account, no analytics, no ads, no crash reporting service; progress is stored only on the device (AsyncStorage).
- Audio recordings are temporary files in app cache, deleted when the learner leaves the screen; never uploaded.
- Device text-to-speech may use the phone's own voice service.
- Backup export is a JSON text the learner shares themselves.
- Data collected: none. Data shared: none. (Confirm against the final build before submitting.)

## Remaining blockers before a Play release

| Severity | Item |
| --- | --- |
| Blocker | Create the upload key and set the properties above; build `bundleRelease` (AAB, not APK) |
| Blocker | Decide the final application ID (see above) |
| Blocker | Physical-device pass of the checklist below on the release build |
| High | Privacy policy URL (required by Play because RECORD_AUDIO is requested) |
| High | Store listing assets: feature graphic 1024×500, phone screenshots from the release build, short/full description in Marathi and English |
| Medium | Foreground-service declaration or removal for expo-audio |
| Medium | Third-party licence notice screen or file (all dependencies are MIT/Apache/BSD; generate with `npx license-checker --production --summary`) |
| Low | Enable R8 minification (`android.enableMinifyInReleaseBuilds`) after testing; reduces APK size |

## Physical-device checklist

Run on the release build, on at least one budget phone (≤ 3 GB RAM, Android 10–12) and one recent phone. Record device, Android version and result for each.

1. Fresh install → onboarding → first lesson started without help.
2. Upgrade over the previous build: progress, bookmarks, streak and today's plan unchanged.
3. Microphone: deny → friendly message; grant later from Settings → recording works.
4. Record, replay, delete; leave the screen while recording.
5. No English TTS voice installed / TTS disabled → app explains, nothing crashes.
6. Slow and normal playback.
7. Airplane mode: every tab, a lesson, a role-play, the daily plan.
8. Daily reminder delivered at the chosen time; turned off → no more notifications.
9. Time-zone change and device restart: same daily plan, reminder re-scheduled after opening the app.
10. Force-stop and reopen mid-lesson → resumes.
11. System font size largest + app "Extra large": no clipped buttons or tab labels.
12. Gesture navigation and three-button navigation: bottom bar and sheets clear of system bars.
13. Small screen (≈ 5", 720p) and a display cutout.
14. Backup export → reset → import → progress restored; invalid text rejected without data loss.
15. TalkBack: tabs, More sheet, lesson exercise, Grammar chips, Settings text-size chips.

Dark mode is **not** offered: `userInterfaceStyle` is `light`, so the app stays light when the phone is in dark mode (by design for now; see the improvement report).
