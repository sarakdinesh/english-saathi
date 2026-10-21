# Speech options: recording, transcription and pronunciation assessment

Assessment only. **Nothing here is integrated**; the app still has no speech recognition and no pronunciation score, and it says so. Researched 21 October 2026. Each claim is tagged **[verified]** (read in the cited official documentation in this session), **[reported]** (stated by a project's own README or a search summary) or **[unverified]** (from general knowledge; confirm before relying on it).

## Three different jobs

| Job | Question it answers | Output | What it is *not* |
| --- | --- | --- | --- |
| **Recording** | Can the learner hear themselves? | An audio file | Any judgement of the speech. (Already built: `expo-audio`, temporary, deleted on leaving the screen.) |
| **Transcription / recognition** | Did the recogniser hear the words we expected? | Text, sometimes with recognition *confidence* | **Not pronunciation scoring.** A recogniser is built to understand accented speech; a correct transcript says the words were intelligible, not that the sounds were right. Confidence values reflect the model's certainty, not the speaker's accuracy. |
| **Pronunciation assessment** | Which words/phonemes differed from a reference? | Scores against a reference pronunciation (accuracy, fluency, completeness; phoneme detail) | A certification of ability, or proof of an accent being "wrong". |

The app must never present the second as the third.

## Option A — device-native recognition (free, mostly on-device)

| | Android | iOS |
| --- | --- | --- |
| Engine | `SpeechRecognizer` (system / Google). On-device variant `createOnDeviceSpeechRecognizer`, availability check `isOnDeviceRecognitionAvailable`, `checkRecognitionSupport`, `triggerModelDownload` exist **[verified: methods listed in the official reference]**. | `SFSpeechRecognizer`. `supportsOnDeviceRecognition` decides whether audio stays on the device; otherwise it is sent to Apple's servers **[verified via Apple's documentation summary]**. |
| OS needed for on-device | Android 13+ **[reported by the `expo-speech-recognition` README]**; the Android reference page's per-method API levels could not be read by the fetch tool, so confirm. | iOS 17+ for the library's on-device path **[reported, same README]**. |
| Locales | Depends on installed offline model; `getSupportedLocales()` shows what is installed **[reported]**. `en-IN` and `mr-IN` not confirmed by an official list. | Same locales as keyboard dictation; Apple points to its dictation list. `en-IN` appeared in one third-party list, `mr-IN` was not seen **[unverified]**. Check `SFSpeechRecognizer.supportedLocales()` on a real device. |
| Pronunciation score | **None.** Text and confidence only **[verified: no such API in the reference listing]**. | **None.** Text and segment confidence only **[verified]**. |
| Offline | Yes, if the model for the language is installed. | Yes, if on-device is supported for the locale. |
| Privacy | Server-based path may upload audio; on-device does not. | Server path uploads audio to Apple; on-device does not. A forum report of error 1101 when forcing on-device on iOS 16.5 means "supported" is not a guarantee **[reported]**. |

**Expo access:** the community package `expo-speech-recognition` wraps both **[reported]** — install `expo-speech-recognition@sdk-54` for this project's SDK; on-device mode and recording need Android 13+ / iOS 17+; it needs a **development build** (not Expo Go); Android permission `RECORD_AUDIO`, iOS microphone (+ speech permission for server recognition); can persist the audio file. It is not an official Expo module and the README itself notes an unverified Android 12 case, so it needs device testing.

**Use for this app:** an optional "did your words come through?" check (transcript vs the target sentence) clearly labelled *speech recognition, not a pronunciation score*, with wording that avoids pass/fail.

## Option B — cloud pronunciation assessment

### Microsoft Azure AI Speech — Pronunciation Assessment **[verified from learn.microsoft.com]**
- Scores: accuracy (phoneme match to a native-speaker pronunciation), fluency, completeness, and an overall score; granularity down to **phoneme** (IPA); syllable/word detail; optional miscue (omission/insertion) for scripted text.
- **Prosody score is `en-US` only.**
- **33 locales** supported. Relevant to this app: **`en-IN` (English, India) is listed**, as are `hi-IN` and `ta-IN`; **Marathi (`mr-IN`) is not in the pronunciation-assessment list** (Marathi *is* listed for plain speech-to-text, real support level per docs). Since the learner speaks *English*, `en-IN` or `en-US`/`en-GB` is the relevant choice, not Marathi.
- SDKs: Swift/Objective-C (iOS) and Java (Android) supported; word/syllable/phoneme results are SDK objects on Android Java and in the JSON result; no Go support. Streaming mode available. Pricing and quotas: not checked.
- **Accent caveat:** accuracy is defined relative to a native-speaker pronunciation. Scores for Marathi-accented English can therefore be lower for differences that are normal and fully intelligible in Indian English. Choosing `en-IN` reduces but does not remove this; it needs validation with real Marathi-speaking learners before any threshold is shown to users.
- **Credentials:** an Azure subscription key must never be in the app. The documented pattern is a backend that holds the key and issues **short-lived authorization tokens** (about 10 minutes **[reported, REST docs]**), authenticated per learner. That requires a small server (or serverless function) and an Azure account.

### Other commercial pronunciation APIs **[reported/unverified]**
Speechace and SpeechSuper both advertise phoneme-level scoring; SpeechSuper lists English among eight languages. The accent coverage (e.g. Indian English) and pricing were **not** confirmed from official documentation in this session. Same credential and privacy requirements as Azure.

## Option C — general cloud transcription (no pronunciation scoring)

- **Google Cloud Speech-to-Text**: Chirp 3 lists `en-IN` as generally available and `mr-IN` as **Preview** **[verified via search summary of Google's docs]**. Transcription and confidence only.
- **OpenAI speech-to-text** (Whisper / `gpt-4o-transcribe`): transcription only. Marathi support and audio retention rules for the transcription endpoint were **not** confirmed (a third-party summary mentions up to 30 days' retention for API data); check OpenAI's current API data-controls page **[unverified]**.
- **On-device Whisper-class models** (for example via `whisper.cpp` wrappers): possible offline transcription at the cost of app size, CPU and battery; transcription only; not evaluated here **[unverified]**.

## Comparison for this app

| | Offline | Pronunciation score | Marathi-speaker accent fit | Audio leaves the phone | Needs credentials / server |
| --- | --- | --- | --- | --- | --- |
| Device recognition (Option A) | Yes (on-device mode) | No | Intelligibility check only | Not in on-device mode | No |
| Azure Pronunciation Assessment | No | Yes, phoneme level | `en-IN` supported; scoring baseline is "native speaker", needs validation | **Yes** | **Yes** (Azure + token backend) |
| Other scoring APIs | No | Yes | Unconfirmed | Yes | Yes |
| Cloud transcription only | No | No | Intelligibility only | Yes | Yes |

## Privacy and consent requirements (any cloud option)

- Explicit, separate opt-in before the first upload, in Marathi, stating that the recording is sent to a named provider, for how long it is kept, and how to stop. Default **off**; the self-practice flow must keep working without it.
- Send only the single utterance being assessed; never store recordings server-side by default; do not include them in progress backups (already true for local recordings).
- Children: if learners under 18 or 13 may use the app, local rules on children's voice data apply; this needs a legal decision.
- No API key in the bundle, in `app.json`, or in a repository. Use a backend token broker with per-user authentication and rate limits.
- Graceful offline fallback: when the network or the permission is missing, fall back to today's self-practice flow and say so.

## Recommended path (not started)

1. **Milestone S1 (no external service):** add optional on-device recognition via `expo-speech-recognition@sdk-54` in a development build, behind a Settings toggle, labelled as *recognition*, with the target sentence shown and a neutral "heard / did not hear" message. Test on Android 13+ with `en-IN`, and on an iPhone. Success criterion: it works fully offline and never claims a score.
2. **Milestone S2 (needs your decisions):** pilot Azure Pronunciation Assessment with `en-IN` for a handful of scripted sentences. Needs an Azure account, a small token-issuing backend, a consent screen and a pilot with Marathi-speaking learners to see whether scores track a teacher's judgement. Do not ship numeric scores unless the pilot supports them; consider showing only word-level "listen again" hints.
3. Revisit Marathi speech only if you later want learners to *speak Marathi prompts*; it is not needed for pronunciation of English.

## Sources

- Azure pronunciation assessment how-to: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment
- Azure language and voice support (pronunciation-assessment tab): https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=pronunciation-assessment
- Azure token-based access pattern (Microsoft Q&A): https://learn.microsoft.com/answers/a/12233499
- Android `SpeechRecognizer` reference: https://developer.android.com/reference/android/speech/SpeechRecognizer
- Apple `SFSpeechRecognizer`: https://developer.apple.com/documentation/speech/sfspeechrecognizer
- `expo-speech-recognition`: https://github.com/jamsch/expo-speech-recognition
- Google Cloud Chirp 3 languages: https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3
- Speechace API docs: https://api-docs.speechace.com ; SpeechSuper samples: https://github.com/speechsuper/SpeechSuper-API-Samples
