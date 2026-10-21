# English Saathi — Development Report

**Date:** 19 October 2026  
**Overall status:** Learning-app improvements implemented and verified on web. Native Android project generated and standalone test APK built and verified. Device validation and release preparation remain.

## Work completed

| Area | Delivered |
| --- | --- |
| Project inspection | Verified Expo 54.0.37, React Native 0.81.5, React 19.1.0, TypeScript 5.9.3, React Navigation 7 and AsyncStorage 2.2.0. Inspected existing screens, learning content and storage. |
| Visual design | Shared cream/green/lime design tokens, reusable UI components, clearer Marathi typography, 18-point lesson text, scalable text, touch targets, feedback states and centered reading layout on larger screens. |
| Navigation | Four main tabs: Home, Learn, Speak and Review. Saved and Settings remain accessible through visible shortcuts. |
| Home | Clear start/continue action, next unfinished lesson, saved step, approximate duration, real streak and progress, daily activities, due-review count and course-completed state. |
| Learning journey | Six unlocked curriculum units, recommended progression, completed/in-progress indicators, next-lesson guidance, English/Marathi search and category filters. Optional reading foundations are separate from grammar lessons. |
| Lessons | Short learning stages, previous/next controls, persisted step positions, examples, listening, speaking prompts, bookmarks and separate reading-completion/practice-success tracking. |
| First beginner unit | Two lessons (`intro`, `be`) with eight exercises: sentence arrangement, gap filling and translation choices in both directions, Marathi explanations and retry. |
| Existing mixed quiz | Preserved twelve questions and explanations; added missed-question retry and revision scheduling. Short retries do not overwrite the full-quiz best score. New full-quiz results retain timestamped history (last 100). Older historical results are not fabricated. |
| Revision | Local queue for difficult words and mistakes. Mistakes return in ten minutes; correct-answer spacing is 1, 3, 7, 14, then 30 days. Due items refresh while Home/Review is open. |
| Vocabulary | Preserved 100 entries and examples; daily five-word selection, full collection, search, word bookmarks, learning marks and explicit difficult-word scheduling. |
| Listening | English synthesis at normal/slower speed, playback status/stop and unavailable-voice fallback using Expo Speech. Browser playback start and completion callbacks were observed. |
| Speaking | Implemented permission handling, record/stop/replay/delete, 60-second cap, temporary recording cleanup and a microphone-free speaking fallback. This is self-practice, without pronunciation scoring. Successful native recording remains unverified. |
| Settings/backups | Three text sizes, sound preference, selectable JSON export, native share action, validated import with restore confirmation and confirmed reset. Invalid imports cannot replace current progress. |
| Existing progress | Preserved the original storage key and stable lesson/word IDs. Backward-compatible validation adds the new fields while retaining completions, bookmarks, dates, best score and attempts. |
| Code organization | Split Home, Learn, Lesson, Review and Settings into screen files; extracted shared UI, styles, audio, exercises, curriculum and pure progress validation/scheduling logic. |
| Android preparation | Generated the native `android/` project, configured the local SDK path and opened the project in Android Studio. Built a standalone release-mode APK with a test signing key; verified its signature, ZIP integrity, package metadata, embedded JavaScript and four native CPU architectures. |
| Documentation | Updated run/build instructions, verification notes, editorial review flags and an individual dependency advisory review. |

## Verification completed

| Check | Result |
| --- | --- |
| TypeScript | Passed. |
| Content validation | Passed: 39 bilingual lessons, 100 words, 12 mixed questions, eight categories. |
| Progress tests | Passed: legacy migration, backup round trip, eleven invalid imports, revision intervals, curriculum coverage and eight beginner exercise checks. |
| Production web export | Passed. |
| Production Android JavaScript/Hermes export | Passed. This output is not an APK. |
| Browser lesson flow | Verified navigation, sentence building, incorrect-answer explanations, retry, four successful introductory exercises, speaking fallback, completion and opening the next lesson. |
| Browser persistence | Verified bookmark and lesson-step persistence after reload. |
| Browser quiz | All-first-option test produced the expected 4/12 (33%); retry contained only eight missed questions. |
| Browser import/export | Verified invalid import leaves exported progress unchanged; valid restore succeeds. A due-review fixture appeared after reload and retained feedback after rescheduling; the pre-fixture backup was restored. |
| Browser vocabulary | Verified daily learning mark, word bookmark, All words and vocabulary search. |
| Responsive layout | Inspected 390×844, 320×740 with extra-large text, and 1280×900 layouts. Shortened visible bottom-tab labels to avoid truncation. |
| Browser console | No error entries in the final inspected preview. |
| Dependencies | Reviewed 35 affected dependency entries: 12 moderate and 23 high. No forced framework upgrades applied. |

## Pending work

### Immediate — Android test delivery

1. **Completed:** standalone APK build, package/signature checks and embedded JavaScript/assets verification.
2. Install and launch on an Android phone or emulator.
3. Test native microphone permission granted/denied flows; record, stop, replay, delete, the 60-second limit and screen-exit cleanup.
4. Test native English voices at both speeds, missing-voice fallback and airplane-mode behavior.
5. Confirm bookmarks, progress, quiz history, settings and revision survive app force-stop/relaunch.
6. Test hardware Back, OS font scaling, screen-reader labels, safe areas and native sharing.

**APK delivered:** `artifacts/English-Saathi-1.0-test.apk` (68,650,518 bytes; about 65.5 MiB). Package `com.englishsaathi.learn`, version 1.0.0, minimum Android API 24, target API 36. Includes arm64-v8a, armeabi-v7a, x86 and x86_64. It embeds its JavaScript and assets and does not need Metro to serve the app. It is test-signed, not production-signed.

**Checks:** Gradle `assembleRelease` succeeded; `apksigner verify` passed (v2 signature); APK ZIP integrity passed; embedded bundle and font assets confirmed. SHA-256: `acd13d47e924246bd7da8faab22cdb7edff53583bd6286da5da1d53472b3521e`.

**Build fixes:** The default Java Gradle downloader timed out, so Gradle 8.14.3 was downloaded from the official distribution endpoint and verified against its official SHA-256. The native configuration also exposed incompatible transitive Expo Font 58.0.8 from the icon package. Expo Font is now explicitly pinned to SDK 54-compatible `~14.0.12`. TypeScript and content/progress tests passed again after the fix. The APK was built with Android Studio's bundled Java and the installed SDK. No device installation or launch has yet been verified.


### Before a public release

- Resolve or explicitly assess the remaining dependency advisories with compatible patches/framework updates. See `dependency-review.md`.
- Have a Marathi-speaking teacher independently review the original translations, eight new exercises and reading foundations. Automated checks do not establish linguistic quality. See `content-review.md`.
- Perform learner usability testing with Marathi-speaking beginners.
- Configure a private production signing key, release versioning, final app icon/store assets, privacy disclosure and distribution. Current generated native release configuration uses a test key.
- Complete a platform regression pass after any dependency or content changes.

### Future product expansion

- Add targeted exercises to the remaining 37 lessons; their current supported flow is reading, examples, listening and speaking.
- Expand optional foundations into a teacher-reviewed literacy/phonics sequence if learner testing supports it.
- Consider bundled human audio for predictable offline listening. Current synthesis depends on installed device/browser voices, and some voices require a download or connectivity.
- Consider persistent recording libraries, reminders or web offline caching only if wanted. Recordings are currently temporary, there are no notifications, and web reload requires its server.

## Important boundaries

- No speech recognition, pronunciation assessment, proficiency certification, paid service, backend or cloud sync has been added.
- Browser verification is complete for the listed flows; physical-device testing has not been performed.
- Existing learning content remains bundled. New exercises and UI text are authored content, not independently reviewed content.
- APK compilation is complete. Device validation and store publication are separate remaining milestones. The test-signed APK is for testing, not Play Store release.

## Relevant files

- `App.tsx`: root navigation and retained word/speaking/quiz/saved screens.
- `src/screens/`: new Home, Learn, Lesson, Review and Settings screens.
- `src/components/`: shared UI, styles, exercise and audio controls.
- `src/data/journey.ts`: curriculum and eight beginner exercises.
- `src/state/model.ts`: validation, migration defaults and revision scheduling.
- `src/state/progress.tsx`: local storage provider.
- `android/`: generated Android Studio/Gradle project.
- `README.md`: exact run/build commands.
- `docs/verification.md`, `docs/content-review.md`, `docs/dependency-review.md`: detailed checks and limitations.


## Update — 19 October 2026: complete learning paths (version 2.0)

| Area | Delivered |
| --- | --- |
| Paths | Beginner (11 units, 48 lessons), Intermediate (10 units, 42 lessons) and optional reading foundations (3 lessons). All 93 lessons use one structure. |
| Content | 552 guided exercises (choice, gap, English↔Marathi, response, listening with transcript reveal, tap-to-build with alternatives), 22 unit checkpoints in new situations (91 questions), 93 scripted role-plays, 8 long (1–2 minute) talks, 9-question starting check with speaking self-check. |
| Components | Reusable lesson flow, exercise component, role-play screen (scripted, graduated hints, optional recording, self-review), long-talk screen, placement and checkpoint screens, audio hook with sequential playback, slow/normal, replay/stop and clear fallbacks, model-compare recorder. |
| Progress | Backward-compatible fields: path, placement, self-reported speaking practice, learner confidence, checkpoint results. Lesson completion, objective performance, speaking practice and confidence are tracked and shown separately. |
| Revision | Missed exercises, difficult words, conversation expressions and phrasebook phrases join the existing scheduler (unchanged intervals). |
| Honesty | Role-plays are labelled scripted; no speech recognition; Devanagari pronunciation guides are labelled approximate; one synthetic voice engine documented. |
| Verification | See `docs/verification.md`. Web and Android builds pass; the APK launches on an emulator. |

Remaining: independent Marathi-teacher review of all new content; learner usability testing; physical-device microphone, voice and airplane-mode checks; production signing; resolving dependency advisories. Reading foundations are a short introduction, not a full phonics course.

Test APK: `artifacts/English-Saathi-2.0-test.apk` (SHA-256 in `artifacts/English-Saathi-2.0-test.apk.sha256`).
