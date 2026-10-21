# Foundation (Level 0) — linguistic self-review and teacher flags

Reviewed by the developer (not a qualified Marathi or English phonics teacher) after the first implementation. **Nothing here is teacher-approved.** Items marked **TEACHER** need a qualified person's decision; items marked **FIXED** were corrected in code during this review.

## What was checked

For every Foundation lesson, daily tip and daily pronunciation challenge: (1) letter *name* versus letter *sound* confusion, (2) Devanagari transliteration of English sounds, (3) phonics rules stated more broadly than they are true, (4) claims about what the device voice can do.

## Fixed in this review

| Area | Problem found | Fix |
| --- | --- | --- |
| `f-digraphs` (`wh`) | Said `wh` sounds like Marathi 'व्'. That reinforces the V/W confusion the app teaches against elsewhere. | `wh` is now described as the **w** sound (rounded lips, no teeth on the lip) and not **v**; `who` noted as 'ह्'. |
| `f-name-sound`, daily `f-b-d` | Described English `d` as "between 'द्' and 'ड्'". Vague, and Marathi 'ड्' is retroflex. | Now: tongue tip touches the ridge behind the upper teeth; do not curl the tongue back. |
| `f-cvc` | "One letter per sound" stated as a general fact. | Limited to these CVC words; notes that `sh`, `ch` are two letters, one sound. |
| `f-magic-e` | Silent-e rule stated without exceptions. | Now "in most words"; names `have`, `give`, `come`, `some`. |
| `f-digraphs` (`ch`) | `ch = 'च्'` only. | Notes `school` (`ch` = 'क्'). |
| `f-silent` (`gh`) | "`gh` is silent" (false for `laugh`). | Limited to `igh`; notes `laugh` ('फ्'). |
| `f-numbers` | Stress rule for -teen / -ty stated as always true. | Now "when the number is said alone"; notes stress can shift in a phrase. |

## Open items for a teacher

1. **TEACHER — Devanagari guides for `t` and `d`.** Conventional Marathi transliteration writes English `t`/`d` as retroflex ट/ड (e.g. "डॉग", "बेड"). That is how most learners already hear them, but it conflicts with the tongue-position advice in the `d` lessons. Decide whether to keep the conventional spelling and add a one-line caution, or to use त/द with a different note.
2. **TEACHER — vowel guides are approximations.** `a` = 'ॲ', `e` = short 'ए', `i` = short 'इ', `o` = 'ऑ', `u` = 'अ' (not 'उ'). The `o` in *dog* varies by dialect (British /ɒ/, several American vowels); 'ऑ' fits some accents only. Confirm the target accent (Indian English, British or American) and adjust.
3. **TEACHER — letter `c` and `g` have two sounds** (*cat*/*city*, *go*/*gym*). Not taught anywhere in Foundation. Decide whether to add a lesson before learners meet words like `city` and `gym`.
4. **TEACHER — the two `th` sounds** (voiced in *this*, voiceless in *thin*) are shown together with one instruction. Confirm that one shared instruction is acceptable at this level.
5. **TEACHER — `ea`, `ai`, `oo` pattern statements** use "most words" but the exercises treat them as reliable (`tea`, `rain`, `moon`/`book`). Common exceptions (*bread*, *said*, *blood*) are not mentioned.
6. **TEACHER — family words.** Only mother, father, brother, sister, grandmother, grandfather are taught. Marathi distinguishes maternal and paternal relatives (मामा/काका, आत्या/मावशी…); English *uncle*/*aunt* were left out deliberately. Confirm.
7. **TEACHER — transliterations such as 'आउअर' (*hour*), 'लॅम' (*lamb*)** are rough; consider omitting transliteration for irregular words.
8. **Letter-name audio.** The lessons use the device's text-to-speech to say a single letter (for example "W"). Voices differ: some read it as the letter name, some may read it as a word or abbreviation. This has **not** been checked on a device. Letter *sounds* (/b/, /s/) cannot be played in isolation by text-to-speech, so sounds are taught only through example words.
9. **Pronunciation is self-judged.** Nothing in Foundation scores pronunciation.

## Not reviewed

- Marathi grammar, register and word choice in explanations (the developer is not a native-level reviewer).
- Whether the lesson order suits real learners; no learner has used the course.
