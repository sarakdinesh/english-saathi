# English Boluya · इंग्लिश बोलूया

*आपल्या भाषेत शिकूया, इंग्रजीत बोलूया!*

> Formerly **English Saathi**. Internal identifiers (Android package `com.englishsaathi.learn`, storage key `english-saathi.progress.v1`, Expo slug) keep the old name on purpose so existing installs keep their progress — see `docs/release-readiness.md`.

A Marathi-first beginner English app with bundled lessons and local progress. Built with verified installed Expo 54.0.37, React Native 0.81.5, React 19.1.0, TypeScript 5.9.3, React Navigation 7 and AsyncStorage 2.2.0.

## Run

```sh
npm install
npm start
# Browser
npm run web
# Android emulator / connected development client
npm run android
```

Use an Expo Go or development build that supports SDK 54. Native audio plugins require rebuilding an existing development client.

## Learning paths (version 2.0)

Three labelled paths plus optional reading foundations, all bundled offline:

- **Foundation (Level 0) — पाया: अक्षरे आणि आवाज**: 4 units, 18 lessons: the alphabet (names, sounds, vowels and consonants), short and long vowels, blending and segmenting, digraphs, blends, silent letters, spelling patterns, then numbers, days and months, colours, family, objects, classroom English and the time of day. Letter sounds are taught through example words; the device voice cannot say an isolated sound.

- **Beginner — सुरुवातीपासून शिका**: 11 units, 48 lessons (greetings, family, numbers, time, places, home and food, pronouns and *be*, useful patterns, questions and negatives, routines, past and future, shopping/restaurant/directions/travel/calls, asking for help, contractions, stress and sounds).
- **Intermediate — आत्मविश्वासाने बोला**: 10 units, 42 lessons (longer answers, describing, storytelling, opinions, workplace, interviews, appointments/complaints/problems, modals and conditionals, collocations/phrasal verbs/passive, comparing/summarising/presenting).
- **Reading foundations (optional)**: 3 lessons on letter sounds, blending and short sentences.

Every lesson follows one structure: an "I can…" outcome (English and Marathi) → example conversation with audio → meanings and pattern → listen-and-repeat → 4+ guided exercises → personal speaking task → scripted role-play → recap and revision items. Each unit ends with a checkpoint in a new situation. An optional starting-level check only recommends where to begin.

Source layout: `src/curriculum/` (schemas, helpers, unit files, placement, talks), `scripts/` (validation). See `docs/curriculum-coverage.md` for the generated coverage table and `docs/audio-and-pronunciation.md` for the audio limits.

Checks: `npm test` runs content integrity, progress migration and flow checks; `npm run report:coverage` regenerates the coverage table.

## Learning experience

- Four tabs: घर (Home), शिका (Learn), बोला (Speak), उजळणी (Review). Saved and Settings are visible from Home; Saved is also on Review.
- Home shows the next unfinished lesson, saved step, duration estimate, actual streak, daily lesson/word/speaking activity and due review count. Completing all lessons offers revision.
- Six unlocked curriculum units. Unit 1 contains `intro` and `be`, with eight authored exercises covering tap-to-arrange, missing words, English-to-Marathi and Marathi-to-English choices. Other lessons show reading/listening/speaking steps without unsupported practice actions.
- Optional reading foundations are separate from the grammar course.
- Seven lesson stages in the first unit; five in other lessons. Previous/next controls, bookmarks, step resume, explanations and personal speaking prompts. Completion measures reading; success on questions is stored separately.
- The existing 39 lessons, 100 words, 12 mixed questions and their IDs remain unchanged. All vocabulary is reachable from today's five words via “All words”.
- Mixed quiz retains explanations and scores, adds retry of missed questions and scheduled review. A shorter retry does not overwrite the fixed 12-question best score. A quiz score is not a proficiency assessment.
- Cream/green/lime tokens and shared components, 18-point lesson text, system scaling plus three text sizes, minimum-size buttons, visible feedback and accessible labels. Stack animation is disabled to respect reduced motion without adding distracting movement.

## Progress and revision

`english-saathi.progress.v1` remains the storage key. A pure validator migrates the original shape by adding version 2 fields while preserving completed IDs, bookmarks, dates, attempts, best score and last lesson. Loading invalid data shows a warning and suppresses writes, preserving the stored copy. Writes are serialized. Lesson steps, settings, per-day activities and revision persist locally. The last 100 full-quiz results are retained with timestamps from this version onward; older attempts retain their existing count/best score without invented historical results.

Review schedule (local device clock): a mistake schedules the item in 10 minutes and resets its correct streak. Correct answers schedule 1, 3, 7, 14 and then 30 days. New difficult vocabulary can be explicitly queued. Items become due according to timestamps; opening the app is required—there are no notifications. Review answers for words/mixed-quiz cards are self-reported; first-unit exercises check answers automatically. Immediate retry is available in lesson/topic practice and mixed-quiz results.

Settings exports complete progress as selectable JSON; native platforms also have the system share sheet. Copy the JSON somewhere safe. Paste a backup into Settings, validate it, then confirm Restore. Validation checks known IDs, types, numeric bounds, dates, exercise records and settings before applying anything. Invalid imports leave current progress intact. Reset has a separate inline confirmation and Cancel action. No cloud sync, accounts or backend.

## Listening and recording

Uses SDK-compatible `expo-speech` 14.0.8 and `expo-audio` 1.1.1, selected after checking Expo documentation and installed package APIs. `expo-file-system` 19.0.24 removes native recordings when deleted.

- Listen at normal or slower speed in lessons, vocabulary and revealed speaking examples. Status, Stop and unavailable-voice fallback are included; voice lookup times out rather than hanging. Sound preferences apply to synthesis and replay.
- The device/browser supplies English voices. An installed offline English voice can work offline; some voices require connectivity or an OS voice download. No bundled human audio is included. iOS system speech may require the silent switch to be off.
- Self-practice recording requests microphone permission only when Record is pressed. Pending, denied and error states explain how to continue. Stop, replay, stop replay and delete are included. A recording is temporary, capped at 60 seconds, and removed when leaving its screen; it is not included in backups. Native recordings use app cache; web uses a temporary blob URL. Cleanup is best effort if the OS has already removed the file.
- Web recording needs a supported browser, microphone, MediaRecorder and localhost/HTTPS. Permission can be changed in site/device settings. Learners can mark a spoken attempt without recording. There is no speech recognition or pronunciation score.
- Screen blur/unmount stops playback and recording. Background recording and background playback are disabled.

Bundled content, local progress and on-device recording need no backend in the packaged native app. Static web output has no service worker: a first load/reload still needs a server. Browser offline audio depends on installed voices and browser support.

## Verify

```sh
npm run typecheck
npm test
npm run export:web
npm run export:android
```

See [verification notes](docs/verification.md), [content editorial notes](docs/content-review.md) and [dependency advisory review](docs/dependency-review.md). Tests cover the exact bundled content, migration, backup round trips, rejected invalid imports, revision intervals, curriculum coverage and exercise answers. Production Android export is a JavaScript/Hermes bundle, not an APK or a physical-device test.

## Build a test APK

The existing `eas.json` preview profile produces an APK. From this project directory:

```sh
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform android --profile preview
```

Expo sign-in, EAS project setup, cloud access and Android signing credentials are required. Follow EAS prompts; no build has been submitted and no APK was produced during this change. For a local EAS build on a configured Android SDK/JDK machine:

```sh
npx eas-cli build --platform android --profile preview --local
```

## Local Android Studio build — 19 October 2026

The native project is in `android/`. Open that folder in Android Studio. Local SDK settings and Gradle's Java selection are configured for this machine. Gradle 8.14.3 has a pinned distribution checksum; Expo Font is pinned to the SDK 54-compatible version.

A standalone test-signed APK was built with the local Gradle toolchain:

```sh
cd android
JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" NODE_ENV=production ./gradlew assembleRelease --max-workers=4
```

Output: `android/app/build/outputs/apk/release/app-release.apk`. A clearly named copy is in `artifacts/English-Saathi-1.0-test.apk`. Signature and archive integrity were verified; device installation and microphone tests remain pending. The generated release variant uses the debug/test key and must be configured with a private production key before publishing.

See [development report](docs/development-report.md) for completed and pending work.
