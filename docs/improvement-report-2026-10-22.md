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
