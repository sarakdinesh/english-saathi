# English Boluya — improvement round, 22 October 2026

Scope: the first two phases of the transformation brief (safety/foundations, UI consistency) plus targeted learning, accessibility and release work. Everything below was changed in code and checked by the commands listed; nothing was tested on a physical device.

## 1. Repository safety

- Git previously resolved to the home folder (`/Users/etpl-012`). The project now has its **own repository** (`.git` inside the project), history taken from the project-only `english-saathi-clean` branch, plus a baseline snapshot commit `6721d30` of the state before this round.
- The home-folder repository was not modified (no reset, no staging, no branch changes). Its remote URL still contains a GitHub personal access token in plain text — **revoke and rotate it** (see `docs/repo-isolation.md`).
- The project repository's `origin` is token-free. Nothing was pushed.

## 2. Baseline inventory (preserved)

`npm test` content check: 115 lessons, 100 words, 669 guided exercises + 115 checkpoint questions (784 total), 115 role-plays, 27 checkpoints, 8 long talks, 9 placement questions, 12 tenses, 6 modal groups. Unchanged after this round. Storage key, data shape and migrations unchanged.

## 3. What changed

| Area | Change | Files |
| --- | --- | --- |
| Branding | One source of truth for name/tagline; reminders, Settings copy, Home header, loading screen, error screen and About card use it. No user-visible "Saathi" remains (enforced by test). Internal IDs deliberately kept. | `src/brand.ts`, `src/state/reminders.ts`, `src/components/reminderService.ts`, `src/screens/Settings.tsx`, `README.md` |
| Design tokens | `theme.ts` now defines semantic colours, spacing, radius, type scale (Devanagari line heights), touch size and elevation. All 54 hard-coded hex colours in screens/components replaced by tokens. Two failing-contrast greys (2.4–2.6:1) and two borderline colours fixed. Contrast of 23 text/background pairs is asserted ≥ 4.5:1. | `src/components/theme.ts`, `styles.ts`, 11 screens |
| Buttons | Lime was used for almost every button. Now: **primary** green, **accent** lime only for Home's "continue learning", **secondary** quiet outline; disabled state no longer relies on opacity alone. | `src/components/ui.tsx` |
| Navigation | Tabs: घर Home · शिका Learn · बोला Speak · सराव Practice · आणखी More (sheet with every other section, grouped). "Review" tab is presented as the Practice hub; duplicate Home entry removed from the sheet. | `App.tsx`, `src/screens/Menu.tsx` |
| Home | Streak line no longer shows "0 days" — says a small start today is enough. One lime CTA. Review card explains *why* items come back (spaced repetition). Three duplicate navigation buttons at the bottom removed. Daily words preview shows example + Marathi translation + audio per word. Spoken labels on path and speaking cards. | `src/screens/Home.tsx`, `src/screens/Daily.tsx` |
| Speaking | Recorder shows the learner's step: ऐका → म्हणा → तुलना → पुन्हा (Listen, Record, Compare, Try again), announced to screen readers. Still clearly self-practice — no score. | `src/components/Audio.tsx` |
| Grammar | Four stacked full-width buttons replaced by an accessible tab selector; new "all tenses at a glance" comparison card. | `src/screens/Grammar.tsx` |
| Settings | Text size uses the same selector; note that phone font scaling also applies; About card (version, offline and privacy statement, honest TTS/pronunciation note). | `src/screens/Settings.tsx` |
| Accessibility | New `Chips` component (role tab, selected state, ✓ not colour-only, 48 dp). Chip touch targets across lessons/role-plays/exercises grow to 48 dp. Expandable daily cards announce done/pending. | `src/components/ui.tsx`, `styles.ts` |
| Engineering | `App.tsx` 618 → 304 lines: Words, Quiz and Saved moved to their own modules with typed navigation props; route params in `src/navigation/types.ts`; one `TAB_ROUTES` list instead of two copies. Top-level error boundary with a Marathi retry screen. | `App.tsx`, `src/screens/{Words,Quiz,Saved}.tsx`, `src/navigation/types.ts`, `src/components/ErrorBoundary.tsx` |
| Release | Property-driven upload-key signing; versionCode override; storage and overlay permissions removed from release; signing material git-ignored. | `android/app/build.gradle`, `AndroidManifest.xml`, `app.json`, `.gitignore`, `docs/release-readiness.md` |
| Dependencies | 31 → 27 audit entries; root advisories 7 → 4 packages, all build tooling with no compatible patch. | `package.json`, `package-lock.json`, `docs/dependency-review.md` |
| Tests | New suite `scripts/check-app.ts` (branding, compatibility IDs, route integrity, reachability of every screen, a11y props, no hex colours outside tokens, contrast, permissions, no committed upload password). | `scripts/check-app.ts`, `package.json` |

## 4. Verification

| Command | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm test` (10 suites, time/reminder suites in 7 time zones) | Pass |
| `npx expo install --check` | Dependencies up to date for SDK 54 |
| `npm audit` | 27 entries (22 high, 5 moderate) — see dependency review |
| `./gradlew :app:processReleaseMainManifest` | Pass; merged permissions listed in release-readiness |
| Expo web preview at 375×812 | Onboarding, Home, More sheet, Grammar, Settings, Speaking drill rendered; no console errors; tab bar within viewport; chip `aria-selected` exposed |

Not verified: Android release build end-to-end (`bundleRelease`), TalkBack on a device, any physical device, the recorder step guide visually (type-checked only).

Known web-only issue: the browser font renders "ॲ" (U+0972, as in ॲप) with a dotted circle. Android's Noto Devanagari supports it; check on device.

## 5. Before / after (evidence-based, 0–10)

| Dimension | Before | After | Evidence / what holds it back |
| --- | --- | --- | --- |
| Features & content | 8 | 8 | Unchanged by design; no advanced level yet |
| Visual design | 6.5 | 7.5 | Tokens, one accent, consistent buttons; no dark theme, no custom font |
| UX & navigation | 6.5 | 7.5 | Clear 4 + More structure, decluttered Home; Lesson flow itself not restructured |
| Accessibility | 6 | 7 | Roles/labels enforced by test, contrast verified, 48 dp chips; no TalkBack device pass |
| Engineering | 7 | 7.5 | Smaller App.tsx, typed routes, error boundary, new suite; many screens still `any`-typed |
| Learning effectiveness | 7 | 7 | Small gains (word preview, SRS explanation, step guide); content not reviewed by a teacher |
| Offline reliability | 8.5 | 8.5 | Already offline-first; unchanged |
| Release readiness | 4 | 6 | Signing path, permissions, docs; still needs key, AAB, device pass, privacy policy |

Overall roughly 7 → 7.5. Not 9: the remaining gap is device testing, a dark theme, lesson-flow restructuring, teacher review of Marathi, validated phoneme audio and an advanced level.

## 6. Remaining work, by priority

**P0 — before release:** rotate the leaked GitHub token; create upload key and build an AAB; physical-device checklist; privacy policy; decide application ID.

**P1 — next round:** done in round 2 (see below), except splitting `Lesson.tsx` into step components.

**P2 — product:**
- Human review of Marathi wording (`docs/content-review.md` lists flagged items); no expert review has happened.
- Phonics: generic TTS cannot reliably say isolated phonemes (see `docs/audio-and-pronunciation.md`); budget recorded audio for the ~44 sounds.
- Speech recognition: options and trade-offs are in `docs/speech-options.md`; the on-device route (`expo-speech-recognition`, Android 13+) fits the offline requirement but gives transcripts, not pronunciation scores — label it that way if added.

**P3 — Level 4 (advanced) gap analysis:** current intermediate units (`i1`–`i10`) reach opinions, workplace, interviews, problems, modals/conditionals, natural language and presenting at roughly CEFR A2–B1. A genuine advanced level needs new content for: meetings and negotiation, formal writing (email/report), extended listening (2–5 min audio), reported speech and complex clauses in use (not just reference), idiom and register, and presentation practice with timed long-talk recording. None of the existing lessons should be relabelled as advanced.

---

# Round 2 — same day

| Area | Change | Files |
| --- | --- | --- |
| Dark theme | Light and dark palettes with identical keys; Settings → रंगसंगती (System / Light / Dark), stored as optional `settings.theme` (older data and backups without it stay valid; invalid values are rejected on import). The palette is swapped in place and module-level styles are rebuilt (`themed()`), then the navigation tree is re-mounted with its saved state so the learner stays on the same screen. Hero card and speaking tiles stay dark in both schemes; the logo sits on a light plate in dark mode. `app.json` `userInterfaceStyle` → `automatic`. | `src/components/theme.ts`, `styles.ts`, `App.tsx`, `src/screens/Settings.tsx`, `src/state/model.ts`, `Menu.tsx`, `Skills.tsx` |
| Semantic tokens | `onPrimary` (text on green/ink fills), `onLime`, `hero`, `tile`, `tileAccent`, `logoPlate` replace places where `white`/`ink` did double duty. | 12 files |
| Typed navigation | Every screen uses `StackProps<…>` / `TabProps<…>`; `Main` takes typed nested params; menu routes are a checked union of parameter-free screens; `SkillPractice.skill` is a `SkillArea`. No `any` screen props remain. | `src/navigation/types.ts`, all screens |
| Mistake feedback | A wrong answer shows **your answer** (struck through) vs the **complete correct answer** (gap-fill sentences completed), then "का? · Why" with the explanation and a note that the question will come back in review. Headline changed to a neutral "हरकत नाही! फरक पाहूया." | `src/components/Exercise.tsx`, `src/curriculum/score.ts` |
| Explanation audit | 784 explanations: none empty, none without Marathi; 234 short or restating the answer, listed for a teacher in `docs/explanation-review.md`. Not rewritten (needs human Marathi review). | `docs/explanation-review.md` |
| Lesson flow | The existing 7 stages already cover the brief's sequence (goal + conversation → Marathi meaning/formula → listen & repeat → guided practice → own speaking → conversation practice → review/next), so they were not reordered (stored step positions depend on them). Added: "पुढे: <next stage>" hint, an announced stage progress bar, and a compact Save link instead of a full-width button on every stage. | `src/screens/Lesson.tsx` |
| Android | Dark window background while the app loads (`values-night/colors.xml`). `./gradlew :app:mergeReleaseResources` passes and produced the release JS bundle; no APK/AAB built. | `android/app/src/main/res/values-night/colors.xml` |
| Accessibility | Reusable `ProgressBar` (role, value, label; also aria props for web) used in Lesson, Practice and RolePlay; test enforces progressbar semantics on every track. | `src/components/ui.tsx`, `scripts/check-app.ts` |

Tests added: both palettes pass 4.5:1 on 25 text pairs and 3:1 for icons; scheme switching invalidates cached styles; theme setting validation and round-trip; every exercise yields a complete correct answer that scores as correct.

Verification: `npx tsc --noEmit` pass; `npm test` exit 0 (10 suites). Web preview at 375×812 in dark mode: Home, Learn, Speak, Settings, Lesson stage 4 with a wrong answer; Light/Dark/System switching from Settings keeps the screen and back stack; no console errors. Not verified on Android hardware.

Scores after round 2 (same scale as above): visual design 7.5 → 8, accessibility 7 → 7.5, engineering 7.5 → 8, learning effectiveness 7 → 7.5 (clearer mistake feedback); others unchanged. Overall about 7.5 → 8.

Still open: device pass (P0 list above), `Lesson.tsx` split into step components, teacher review of the flagged explanations, phoneme audio, Level 4 content.

---

# Round 3 — device run, content review, Lesson split, Level 4 pilot

| Area | Change | Files |
| --- | --- | --- |
| Real device | QA build installed on the owner's vivo V2415 (Android 16, three-button navigation, font scale 0.85) over wireless debugging. **Two device-only bugs found and fixed:** bold Devanagari labels that shrink to their measured width lost their last word (Home button "शिकायला सुरुवात करा" → "…सुरुवात"; More tiles "संवाद सराव" → "संवाद"). Button labels now fill the row (`flex: 1`), tile labels stretch to the tile, and all text uses `textBreakStrategy="simple"`. Re-checked on the phone after rebuilding. | `styles.ts`, `ui.tsx`, `Menu.tsx` |
| Content review | 178 explanations that only restated the answer rewritten (rule in simple Marathi + why the tempting wrong option fails), kept by ID in one file so the authored text is untouched and each line can be compared or reverted; 56 plain vocabulary explanations deliberately left. Applied at load; a test checks every ID exists and is applied. | `src/curriculum/reviewed.ts`, `index.ts`, `docs/explanation-review.md` |
| Lesson split | `Lesson.tsx` 555 → 121 lines; seven stage components, header/navigation parts and the legacy flow in `src/screens/lesson/`. Behaviour preserved (all 7 stages verified in the browser); one fix: the role-play button now says "पुन्हा संवाद करा" after any role-play attempt (it previously also required a recorded speaking task). | `src/screens/Lesson.tsx`, `src/screens/lesson/*` |
| Level 4 pilot | New "advanced" path (stored progress from older versions stays valid; unknown paths still rejected). Unit `a1` — softening, negotiating with conditions, handling objections, formal email: 4 lessons, 24 exercises, 4 role-plays, 4-question checkpoint. Labelled "प्रायोगिक / Preview" in Learn; placement never routes to it. | `src/curriculum/advanced/a1-professional.ts`, `types.ts`, `model.ts`, `Learn.tsx` and 4 other screens |
| Guide for the owner | Step-by-step upload key creation, AAB build and signature check; 20-row phone test table. | `docs/upload-key-and-phone-test.md` |

Content now: 119 lessons, 812 exercises (693 lesson + 119 checkpoint), 119 role-plays. Everything from before is unchanged.

Honesty notes: the rewritten explanations and the Level 4 unit are AI-written and have **not** been reviewed by a Marathi-medium teacher. Recorded phoneme audio needs a human voice and was not attempted. The device check was a smoke test of a few screens, not the 20-row pass.

---

# Beginner experience — Round 1: Marathi first

| Area | Change | Files |
| --- | --- | --- |
| Labels | Every eyebrow, heading, section title, chip, link and button a learner sees now leads in Marathi, with English only as a short subtitle (`मराठी · English`). Fixed: Home hero tag (`पुढचा धडा · Continue` / `मार्ग पूर्ण · Complete`), Speak heading and links (`इंग्रजी उत्तर पाहा →`, `पूर्ण धडा वाचा →`), role-play library, Review, Words, Saved, Quiz, Daily quiz, Practice, Phrasebook, Settings, More menu, Grammar passive table, quiz question headers, lesson "Transcript" toggle, unit outcomes in Learn (Marathi line first). | `src/screens/*`, `src/components/Exercise.tsx`, `src/components/ui.tsx` |
| Category chips | New `short` Marathi label per category (ids unchanged; `title` kept as the English subtitle). Learn chips show `सुरुवात · Beginner basics`; Speak's translate chips show the Marathi label. | `src/data/course.ts`, `Learn.tsx`, `Speak.tsx`, `styles.ts` (`filterSub`) |
| Lesson header | `टप्पा 2/7 · <stage name>` instead of the upper-case English unit name. Stage names were already Marathi. | `src/screens/lesson/parts.tsx` |
| Navigation | Tab labels for screen readers, header buttons and browser titles lead in Marathi (`बोला · Speak`, `मागे · Back`, `धडा · Lesson`). | `App.tsx`, `ui.tsx` |
| Honesty note | "The app does not listen to or score your speech" is said once, clearly, on the first onboarding screen ("हे ॲप कसे मदत करते"), with the offline note. Removed the repeats from Speak, RolePlay (intro, play, self-review), the lesson role-play stage and the checkpoint. The recorder keeps one short line; Settings → About keeps its factual note. | `Onboarding.tsx`, `Speak.tsx`, `RolePlay.tsx`, `lesson/stages.tsx`, `Assess.tsx`, `Audio.tsx` |

Tests added (`scripts/check-app.ts`, `scripts/check-content.ts`): labels/titles/section titles in screens must start in Marathi; subtitles must contain Marathi; no English-only `… →` links; the fixed English strings may not return; tab and browser titles lead in Marathi; the no-scoring disclaimer must be in onboarding and may appear elsewhere only in the recorder (once) and About; every category has a short Marathi chip label.

Verification: `npx tsc --noEmit` pass; `npm test` exit 0. Web preview 375×812, light and dark: onboarding (new note), Home, Speak (translate tab), Learn (chips, unit), lesson stage 1 header; no console errors. Not checked on Android hardware.

Left as is, on purpose: lesson and role-play titles (e.g. "Greetings and how are you?") are English learning content and still appear as the big title, with the Marathi line underneath. Translating 119 lesson titles is a content decision for the owner.

---

# Beginner experience — Round 2: one clear next step, shorter-feeling lessons

| Area | Change | Files |
| --- | --- | --- |
| Focused Home (Foundation, Beginner) | Home now shows the greeting, one big **"आजचा पुढचा टप्पा"** card with the next lesson and its single button, and a small **"आजची प्रगती · 1/3"** card (progress bar, the three goals, streak `🔥 N दिवस`). The path pill, the 7 daily items, the speaking suggestion and the four summary tabs are inside a closed **"आणखी पाहा · More for today"** section. Nothing was removed. | `src/screens/Home.tsx`, `styles.ts` |
| Intermediate / Advanced | Full Home, in the same order as before. | `Home.tsx` |
| Hero estimate | New lesson: "सुमारे 13 मिनिटे · 7 छोटे टप्पे". Started lesson: "टप्पा 2/7 · सुमारे 12 मिनिटे बाकी". | `Home.tsx` |
| Lesson steps | Header shows `टप्पा 2/7 · <stage>`, a row of 7 step dots (✓ on finished stages, announced as a progress bar), and "सुमारे N मिनिटे बाकी · पुढे: <next stage>". The Next button reads "टप्पा पूर्ण ✓ · पुढे". After it, the next stage opens with a short "छान! टप्पा 1 पूर्ण ✓" note (screen-reader live region; it isn't stored). | `src/screens/Lesson.tsx`, `src/screens/lesson/parts.tsx`, `styles.ts` |
| Shared logic | `src/state/steps.ts`: `simpleHome`, `todayGoals`, `lessonMinutes`, `minutesLeft`, `stepLabel`, `lessonStages`, `stagePosition`. Lesson and Home use the same stage list. **Stage values, exercise IDs and the stored `progress.steps` keys are unchanged.** | `src/state/steps.ts` |

Tests added (`scripts/check-flows.ts`): which paths get the focused Home; today's goal counting (word count capped at 5); stage lists match the previous values exactly, and a stored value maps to the right position (for example 5 → the 4th of 5 short stages); step labels clamp; minutes left fall stage by stage and never show 0 on an open stage; every lesson's estimate is 3–30 minutes; Lesson.tsx has no second copy of the stage list; beginner Home keeps the extras behind "आणखी पाहा".

Verification: `npx tsc --noEmit` pass; `npm test` exit 0. Web preview 375×812: beginner Home (light and dark), "आणखी पाहा" opened, lesson stage 1 → 2 showing the ✓ note, dots and minutes left (light and dark), Home resume line "टप्पा 2/7 · सुमारे 12 मिनिटे बाकी", Intermediate full Home; no console errors. Not checked on Android hardware.

---

# Beginner experience — Round 3: reward and encouragement

| Area | Change | Files |
| --- | --- | --- |
| Stage ✓ | The "छान! टप्पा N पूर्ण ✓" note from Round 2 now springs in (scale + fade) with ✨. | `src/screens/lesson/parts.tsx`, `src/components/Celebrate.tsx` |
| Lesson / unit finished | Finishing a lesson shows a short celebration screen ("🎉 धडा पूर्ण! छान काम.") with the weekly summary line, a primary "पुढचा धडा" / "युनिट चेकपॉइंट · पुढे" button and "आत्ता इतकेच · Back". If that lesson completes its unit for the first time, a second card follows: "🏆 युनिट पूर्ण: <unit>". Progress is saved before the screen shows, so leaving at any point loses nothing. | `src/screens/Lesson.tsx` |
| Motion | Built-in `Animated` only. `useReduceMotion()` reads `AccessibilityInfo.isReduceMotionEnabled` and listens for changes; with reduced motion the same content shows without movement. **No haptics:** `expo-haptics` isn't installed and I didn't add it. | `src/components/Celebrate.tsx` |
| Setting | Settings → "छोटे अभिनंदन सुरू आहेत / बंद आहेत". Stored as optional `settings.celebrate` (boolean). Old data without it loads unchanged and means "on". When off, stages show the plain ✓ note and lessons move on exactly as before. | `src/state/model.ts`, `Settings.tsx` |
| Weekly summary | "या आठवड्यात 12 शब्द शिकलात · 4 दिवस सराव" (last 7 days; daily words counted once each; practice days from the existing `dates`). Shown in the beginner "आजची प्रगती" card, the full Home goal panel and the lesson celebration. With no activity it invites ("…आज एका छोट्या टप्प्याने करूया."). | `src/state/encourage.ts`, `Home.tsx` |
| Welcome back | After 3+ days away (and not yet practised today): "पुन्हा स्वागत! 🙂 थोडा ब्रेक झाला तरी हरकत नाही…" or, after 7+ days, "पुन्हा भेटून आनंद झाला! … तुमची सगळी प्रगती जपलेली आहे." No streak-loss or missed-day wording. On every path's Home. | `encourage.ts`, `Home.tsx` |

Tests added: `check-progress.ts` — the celebrate field is optional, never invented for old data, round-trips through backup, and rejects non-booleans. `check-time.ts` (runs in 7 time zones) — week window across DST and month edges, word de-duplication, summary wording, welcome-back thresholds (none for new learners, none at 1–2 days, none after practising today, two tones), no guilt words, unit-completion detection. `check-app.ts` — reduce-motion handling present, no haptics/animation dependency added, the setting is wired into Settings and Lesson, and contrast for the new card colours in both palettes.

Verification: `npx tsc --noEmit` pass; `npm test` exit 0. Web preview 375×812 with seeded local test data (last practice 12 days earlier, unit 1 at its last lesson): welcome-back card on Home (light), lesson + unit celebration (light), lesson celebration again in dark (no repeated unit card), Settings toggle stores `celebrate: false` and back; no console errors. Not verified: actual reduce-motion behaviour on a phone (checked in code and tests only) and Android hardware.

---

# Beginner experience — Round 4: honest offline speaking check

Approved by the owner on 22 October 2026: `expo-speech-recognition@3.1.3` (the SDK 54 release; MIT; community package), on-device only, native only, silent fallback.

| Area | Change | Files |
| --- | --- | --- |
| Dependency | `expo-speech-recognition` pinned to `3.1.3`. Config plugin in `app.json` with Marathi iOS permission texts. The `android/` folder is checked in, so the plugin's `<queries>` entry (Google speech services + `android.speech.RecognitionService`) was added to the manifest by hand. **No new Android permission** (`RECORD_AUDIO` was already there; the package's own manifest is empty). QA APK grew by about 30 KB (144,154,195 → 144,184,251 bytes). | `package.json`, `app.json`, `android/app/src/main/AndroidManifest.xml` |
| Word check | Where the recorder has a model sentence (lesson listen stage, own-speaking stage, legacy lessons, role-play with full help), a "शब्द ओळख · फोनवरच" card appears: "म्हणा आणि शब्द पाहा" → the phone's recogniser listens once → "६ पैकी ५ शब्द ऐकू आले", each word shown as a chip, missed words highlighted (amber, bold, underlined — not colour alone) with a "listen again and say it slowly" hint. Labelled "फक्त शब्द ओळख आहे, उच्चाराचे मूल्यमापन नाही"; no score, percentage or pass/fail anywhere. | `src/components/WordCheck.tsx`, `src/components/Audio.tsx`, `styles.ts` |
| Matching | `src/state/wordcheck.ts`: case/punctuation-insensitive, contractions both ways (I'm ↔ I am), curly apostrophes, numbers 0–20 as words, repeated words counted, best of up to 5 alternatives, Marathi digits in the message, preferred offline locale `en-IN` → `en-US` → `en-GB` → any `en-*`. | `src/state/wordcheck.ts` |
| Offline and fallback | `requiresOnDeviceRecognition: true` always; on Android the on-device service `com.google.android.as`. The card only renders if recognition is available, on-device is supported, and an English model is **already installed** (the app never triggers a model download, which would need internet). It disappears silently on web (the browser recogniser uploads audio), on Android 12 and below, with no model, if permission is refused, if the native module is missing, or on any recogniser error other than "no speech". The record-and-compare recorder is unchanged in every case. | `WordCheck.tsx` |

Tests added: `check-flows.ts` — matching rules above, the Marathi message, locale choice (no English model → no card), and every lesson example and conversation line (the recorder's model sentences) matches itself fully. `check-app.ts` — pinned approved version, on-device flag present, web excluded, lazy `require` (a build without the native module cannot crash), no model download call, no scoring words in user-visible text of the word-check files, wired into the recorder, plugin and `<queries>` present, and the app's own Android permission list unchanged.

Verification: `npx tsc --noEmit` pass; `npm test` exit 0. Web preview 375×812: lesson listen stage → recorder opens with no word-check card and no console errors (fallback). `./gradlew :app:assembleQa` succeeds; merged manifest has the queries and no new permission from the package. **Not verified on the phone:** it was asleep and locked, so the QA build was not installed and real on-device recognition (accuracy with Marathi-accented English, model availability on the vivo, iOS) is still untested.

## Round 4 — phone check (vivo V2415, Android 16)

- QA build installed while the phone was unlocked. Google's speech services (`com.google.android.googlequicksearchbox`, `com.google.android.as`) are present, and the **"शब्द ओळख · फोनवरच" card appears** in lesson stage 3 under "Good morning, Asha!". The card only renders when on-device recognition is available with an installed English model, so this phone qualifies.
- The microphone permission dialog was dismissed on the first tap. The card then hid itself and the recorder stayed usable, which is the designed fallback. Re-opening the recorder brings the card back. **Actual recognition of speech (the "N पैकी M शब्द ऐकू आले" result) has not been seen yet:** at the time of writing the app's `RECORD_AUDIO` permission was still not granted. I didn't grant it over adb; that's the owner's choice on the phone.
- Device bugs found and fixed: (1) small pill buttons lost the last letter of a short bold label ("हळू" drawn as "ह"). Fixed with a trailing no-break space and a slightly smaller right padding in `Button small`. (2) The beginner Home "आणखी पाहा" subtitle lost its last word ("प्रगती") because a line that only just fits is drawn wider than measured. Fixed by a shorter subtitle ("७ छोटे सराव, शिफारस, उजळणी, प्रगती"). Fix (1) is in the build now on the phone, not yet re-checked on screen. Fix (2) is in a newer QA build that hasn't been installed yet.

## Follow-up — Grammar tabs, microphone on first launch, device fixes

| Area | Change | Files |
| --- | --- | --- |
| Grammar | Chips replaced by four segmented tabs with icons and Marathi labels: काळ · मोडल · कर्मणी · वाक्यरचना. Every tab opens with the same kind of "…एका नजरेत" summary (one example per item with its name), closed by default, tap to show or hide; it closes again on a tab change. The old always-open tenses comparison is now that summary. Detail cards unchanged. | `src/screens/Grammar.tsx`, `src/data/grammar.ts` (`grammarSummary`) |
| Microphone | Asked once on first launch, right after the splash (Android cannot grant runtime permissions at install). Only when never asked before; a refusal is respected, the app never waits on it, and web is skipped. The recorder still asks when the learner taps "Record". | `src/components/micPermission.ts`, `App.tsx` |
| Device fixes | Small pill labels keep their last letter ("हळू"); the beginner Home "आणखी पाहा" subtitle is shortened so it no longer loses "प्रगती". | `ui.tsx`, `styles.ts`, `Home.tsx` |
| Screen readers | More-menu tiles and the close button announce Marathi first. | `Menu.tsx` |

Tests: `check-grammar.ts` — summary row counts per tab match the data, every row is a full sentence, the screen uses `SegmentTabs`, one `Summary` for every tab inside a `Collapsible`, Marathi tab labels. `check-app.ts` — microphone asked after the splash, only when undetermined, not on web, errors caught; spoken labels may not start in English.

Verification: `npx tsc --noEmit` pass; `npm test` exit 0; web preview 375×812 light and dark: Grammar tabs, summary open/close, tab switch; no console errors. QA build compiled. On the phone, the owner has granted the microphone (`RECORD_AUDIO: granted=true`), but the phone was locked when the new build was ready, so the word-check result, the first-launch prompt and the two clipping fixes have not yet been seen on the device.

### Phone re-check after the follow-up build (vivo V2415, Android 16, unlocked)

- Confirmed on screen: the "हळू" pill shows the whole word; the Home "आणखी पाहा" subtitle shows in full; Grammar tabs and the closed "सर्व मोडल एका नजरेत" summary render correctly; Home resume line "टप्पा 3/7 · सुमारे 10 मिनिटे बाकी".
- Microphone granted by the owner. Tapping "म्हणा आणि शब्द पाहा" now runs recognition: logcat shows Google's **on-device** recogniser (`SodaSpeechRecognizer` in `com.google.android.as`) opening the mic and ending with `NO_SPEECH_DETECTED`, and the card shows "काहीच ऐकू आले नाही. पुन्हा प्रयत्न करा." (the test voice was played from a computer speaker that wasn't near the phone). So the on-device path, the listening state and the no-speech message all work on the device. A recognised sentence ("N पैकी M शब्द ऐकू आले") still needs a person speaking into the phone.
- **Recognised on the phone (owner speaking):** "Good morning, Asha!" → the card showed **"३ पैकी ३ शब्द ऐकू आले"**, chips Good · morning, · Asha!, and "सर्व शब्द ओळखले गेले. छान!". Logcat: on-device `SodaSpeechRecognizer`, 3 hypotheses, no network recogniser. Round 4 works end to end on this device.
- Two display bugs seen in that screenshot and fixed: (1) the word chips were drawn taller than their row and overlapped the hint line; each chip is now a `View` holding the background, with plain text inside. (2) "अॅप" (अ + ॅ) drew as "अ ॅप"; app text now uses the single letter "ॲप" (U+0972), with a test for UI files. Fix (2) is confirmed on the phone; fix (1) needs another spoken result to see. **Left for the owner:** 32 pronunciation guides in `src/data/pronunciation.ts`, `src/data/speaking.ts` and `src/daily/foundation.ts` still write अॅ ("आय अॅम"). That's learning content, so I didn't change it.
- **Missed-word case on the phone (owner said only "Good morning"):** "३ पैकी २ शब्द ऐकू आले", Good and morning, in green chips, **Asha!** highlighted (amber, bold, underlined), hint "हायलाइट केलेले शब्द मॉडेलमध्ये पुन्हा ऐका आणि हळू, स्पष्ट म्हणा." Screen readers hear "Asha!: ऐकू आला नाही". The chips no longer overlap the hint, so fix (1) above is confirmed on the device.
- **Pronunciation guides:** अॅ (अ + ॅ) replaced by ॲ (U+0972) in 32 lines (34 occurrences) of `src/data/pronunciation.ts`, `src/data/speaking.ts` and `src/daily/foundation.ts` ("आय ॲम", "ॲट", "ॲन"). Only the letter's encoding changed: same spelling, same sound, no IDs or English text touched. `check-app.ts` now rejects अॅ in every source file. QA build installed and **checked on the phone:** the phrasebook guide for "I am fine, thank you." shows "आय ॲम फाइन, थँक यू." with ॲ drawn as one letter.
