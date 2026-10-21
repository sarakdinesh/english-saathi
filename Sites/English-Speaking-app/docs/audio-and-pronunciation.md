# Audio and pronunciation: what the app does and does not do

- **Listening** uses the device or browser speech synthesis (`expo-speech`). It is one synthetic engine, not recordings of different people. Where a device has several English voices (for example en-US, en-GB, en-IN), the intermediate "Listening styles" panel lists only the locales the device actually reports and says so. On a device with one voice the app offers speed variation only.
- **Offline**: lesson content and storage are bundled and work offline. Speech depends on installed voices; some voices need a one-time download. If no English voice is installed the app says so and falls back to reading the text.
- **Normal / slow playback, replay and stop** are available on lines, conversations and exercises. Listening exercises hide the transcript until the learner asks for it.
- **Recording** is temporary self-practice (up to 60 seconds). Learners can record, replay and compare with a model sentence, and delete it. Recordings are not stored after leaving the screen. The app does **not** assess pronunciation or fluency.
- **Devanagari pronunciation guides** are approximate reading aids, labelled "अंदाजे". English sounds cannot be written exactly in Devanagari, and the app does not ask learners to imitate one accent; the goal is to be easily understood.
- **Role-plays are scripted.** The partner's lines are fixed; the app does not listen to or understand the learner, and the self-review is the learner's own record.
- **Progress measures are separate and self-reported where they must be**: lessons read, objective exercise results, speaking practice logged by the learner, and learner-reported confidence. None of these is a proficiency score.
