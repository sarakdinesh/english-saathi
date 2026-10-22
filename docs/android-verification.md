# Android verification log — 21 October 2026

Device: vivo V2415, Android 16 (API 36), 1260×2800, three-button navigation, system font scale 0.85 (unchanged). Build: `assembleQa` (package `com.englishsaathi.learn.qa`; separate data from the real app; JavaScript bundled; debuggable so errors show an on-screen overlay).

**Status: partly done.** Wireless debugging dropped twice (the connection port changes each time), and the phone's own apps (including my earlier release install) were removed between runs. Only the checks marked PASS below were actually observed. Everything under "Not performed" must not be treated as passed.

## Observed on the phone

| Check | Result |
| --- | --- |
| Fresh install of the QA build, launch | **PASS** — no crash; first-run Onboarding shown with empty data. |
| Onboarding steps 1–3 (goal, time, level) | **PASS**. |
| "Short check" → placement, 12 questions answered (3 letters-and-sounds all wrong, 8 of 9 sentences right) | **PASS** — recommended **Foundation → "इंग्रजी वर्णमाला"**, as designed. |
| "Start from this unit" opens the first Foundation lesson | **PASS**. |
| **Hardware Back from that lesson goes Home** (not to onboarding/placement) | **PASS** — this verifies the navigation-stack fix on a real device. |
| Home "continue" opens the lesson; Next ×2 reaches stage 3 | **PASS**. |
| Header below the status bar; content clear of the three-button bar | **PASS** visually (font scale 0.85 only). |

## Defect found on the device (fixed in code, not yet re-verified on the phone)

**Leaving the speaking step threw an error overlay** — "Call to function `AudioPlayer.pause` has been rejected … Cannot use shared object that was already released" (component `Recorder`). Cause: the screen-blur/unmount cleanup in `src/components/Audio.tsx` called `player.pause()` after expo-audio had already released the native player. The web build never showed it. In a release build this would be an uncaught error when leaving any speaking step.

Fix: the cleanup now wraps each native call in `try/catch`. The QA APK was rebuilt and installed with the fix; **the phone disconnected before the fix could be re-tested.**

## Not performed (must be done)

- Re-test of the fix above (open stage 5, leave it, also mid-recording).
- A full Foundation lesson with its exercises, recap and completion, then the Foundation checkpoint. (Exercise taps were sent in one run, but their results were not checked; the stage-5-and-later steps hit the defect above.)
- A Beginner and an Intermediate lesson.
- Daily activities, daily quiz, review; persistence after force-stop.
- Microphone permission denied and granted; recording, replay, delete; cleanup of the audio file (inspect with `adb shell run-as com.englishsaathi.learn.qa ls cache`).
- Speech playback at normal and slow speed, and the missing-voice fallback (the lesson-level buttons were not found in stage 3 by text, so this needs a manual look at that screen).
- Airplane mode (the app makes no network requests; still to be observed).
- Reminders: permission prompt, test notification, scheduled delivery, cancellation, rescheduling (`adb shell dumpsys alarm` / `dumpsys notification`).
- Large system fonts, keyboard in Settings, backup export/restore/invalid backup.

## Notes on reliability of this log

- One automated run overlapped another and then lost the connection; its trailing "PASS" lines (delete/cleanup) were produced while `adb` reported the device offline and were **discarded**.
- No phone settings were changed. The QA app uses separate data (`adb shell pm clear com.englishsaathi.learn.qa` resets it; `adb uninstall com.englishsaathi.learn.qa` removes it). Your real app, `com.englishsaathi.learn`, is no longer installed on the phone; I did not remove it and did not reinstall it.
