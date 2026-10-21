# Content status

The existing 39 lessons, 100 words, 12 mixed questions and all stable IDs in course.ts/extra.ts were preserved byte-for-byte during this change. Automated checks establish structural validity, not editorial approval.

Newly authored (not independently reviewed): optional reading foundations; eight first-unit exercises and Marathi explanations (`intro`, `be`); Marathi interface labels, activity descriptions, progress/recording/import feedback. English sentence examples in these exercises reuse familiar structures from the original lessons. This is a deliberately small unit rather than bulk-generated material.

Editorial review flags for a Marathi-speaking teacher:

- `intro`: “I am from Pune.” uses “मी पुण्याची/पुण्याचा आहे.” This is understandable but the gender alternatives could be presented more naturally for a new reader; decide whether to use “मी पुण्याचा आहे / मी पुण्याची आहे” or a gender-neutral origin example.
- `intro`: “I am a student.” → “मी विद्यार्थी आहे.” Decide whether beginner material should explicitly offer “विद्यार्थिनी” as an alternative.
- `question-words`: “Question word + helping verb + subject…” is a useful starter pattern but not a universal rule (e.g. “Who lives here?”). Consider adding that exception in a future revision.
- Optional foundations introduce alphabet case and spacing, not a complete phonics or literacy curriculum. A teacher should check sequencing, vocabulary and readability with learners who cannot yet read English.

No independent linguistic review or learner usability study has been performed. The app makes no claim of certified curriculum or proficiency assessment.


## Version 2.0 curriculum (awaiting independent teacher review)

All content in `src/curriculum/` (93 lessons' outcomes, conversations, 552 guided exercises, 91 checkpoint questions, 93 scripted role-plays, 8 long talks, 9 placement questions, new lesson texts and Marathi explanations) was authored for this release and has **not** been independently reviewed. Automated tests prove structure (required fields, answer validity, solvable sentence-building tasks, unique IDs, Marathi present in explanations), not linguistic quality.

Specific review requests for a Marathi-speaking English teacher:

- Natural Marathi in conversation translations and exercise explanations; gender alternatives written as "/" (for example "आहे/होतो").
- Distractor quality: some wrong options are deliberately ungrammatical; check none is accidentally acceptable and none is distracting.
- Reading-foundations content (letter sounds, blending) against a proper phonics sequence.
- Approximate Devanagari pronunciation guides (184 of 354 lesson sentences) and the sound tips for V/W, TH and stress.
- The placement thresholds (`src/curriculum/placement.ts`) and recommended start units.
- Cultural fit and register of the role-plays (interview, workplace, complaints).
