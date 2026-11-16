import assert from "node:assert/strict";
import fs from "node:fs";
import { load } from "./lib.ts";

const { isCorrect, normalize, answerText, correctText } = load("src/curriculum/score.ts");
const cur = load("src/curriculum/index.ts");
const { validateProgress, initial, scheduleReview, reviewIds } =
  load("src/state/model.ts");
const { finish, bld, gap } = load("src/curriculum/author.ts");

// ---- Mistake feedback --------------------------------------------------------
// Every exercise can show "your answer" vs a complete correct answer, and the
// correct answer always scores as correct.
for (const e of cur.allExercises) {
  const shown = correctText(e);
  assert.ok(shown && !/_{2,}/.test(shown), `${e.id}: correct answer incomplete`);
  if (e.kind === "choice") {
    assert.ok(shown.includes(e.options[e.answer]), e.id);
    assert.equal(answerText(e, [e.answer]), e.options[e.answer]);
  } else assert.equal(shown, e.accept[0]);
}
assert.equal(
  correctText({ kind: "choice", prompt: "I ___ tea.", options: ["drink", "drinks"], answer: 0, accept: [] }),
  "I drink tea.",
);

// ---- Reviewed explanations -----------------------------------------------------
const { reviewedExplanations } = load("src/curriculum/reviewed.ts");
const reviewedIds = Object.keys(reviewedExplanations);
assert.ok(reviewedIds.length >= 100);
for (const id of reviewedIds) {
  const e = cur.exerciseById(id);
  assert.ok(e, `reviewed explanation for unknown exercise ${id}`);
  assert.equal(e.explanation, reviewedExplanations[id], `${id} not applied`);
  assert.ok(/[\u0900-\u097F]/.test(e.explanation) && e.explanation.length >= 25, `${id} too short`);
}

// ---- Exercise scoring -------------------------------------------------------
// Repeated words are selected by position, so "the" twice is handled.
const dup = finish("t", "p", [
  bld("कुत्रा कुत्र्याला पाहतो.", "The dog sees the cat.", ["bird"], "test"),
])[0];
const idx = (w: string, used: number[] = []) =>
  dup.options.findIndex((o: string, i: number) => o === w && !used.includes(i));
const the1 = idx("The");
const the2 = idx("the");
assert.ok(the1 >= 0 && the2 >= 0);
const correctOrder = ["The", "dog", "sees", "the", "cat."].map((w, i, a) =>
  idx(w),
);
assert.equal(isCorrect(dup, correctOrder), true);
assert.equal(isCorrect(dup, [...correctOrder].reverse()), false);
// The same token position can never be counted twice.
assert.equal(
  isCorrect(dup, [the1, the1, idx("dog"), idx("sees"), idx("cat.")]),
  false,
);
// Repeated words: either "the" token is interchangeable.
const swapped = ["The", "dog", "sees", "the", "cat."].map((w) => w);
assert.equal(normalize(swapped.join(" ")), normalize(dup.accept[0]));

// Explicit alternative answers and comma tolerance.
const alt = {
  ...dup,
  kind: "build",
  options: ["Yesterday", "I", "went", "home", "I", "yesterday"],
  accept: ["Yesterday I went home", "I went home yesterday"],
};
assert.equal(isCorrect(alt, [0, 1, 2, 3]), true);
assert.equal(isCorrect(alt, [1, 2, 3, 5]), true);
assert.equal(isCorrect(alt, [3, 2, 1, 0]), false);
assert.equal(
  normalize("Good evening, how are you?"),
  normalize("good evening how are you?"),
);

// Choice exercises score by option index and place correct answers varied.
const choices = finish("t2", "p", [
  gap("a", "x", ["y", "z"], "test"),
  gap("b", "x", ["y", "z"], "test"),
  gap("c", "x", ["y", "z"], "test"),
  gap("d", "x", ["y", "z"], "test"),
  gap("e", "x", ["y", "z"], "test"),
  gap("f", "x", ["y", "z"], "test"),
]);
for (const c of choices) {
  assert.equal(c.options[c.answer], "x");
  assert.equal(isCorrect(c, [c.answer]), true);
  assert.equal(isCorrect(c, [(c.answer + 1) % 3]), false);
}
assert.ok(
  new Set(choices.map((c: any) => c.answer)).size >= 2,
  "answer positions should vary",
);

// Every real build exercise is solvable and every real choice has one right answer.
for (const e of cur.allExercises) {
  if (e.kind === "build") {
    const pool = [...e.options.keys()];
    const order = e.accept[0].split(" ").map((w: string) => {
      const k = pool.findIndex((i: number) => e.options[i] === w);
      assert.ok(k >= 0, `${e.id}: token ${w}`);
      return pool.splice(k, 1)[0];
    });
    assert.equal(isCorrect(e, order), true, `${e.id} solvable`);
  } else {
    assert.equal(isCorrect(e, [e.answer]), true, `${e.id}`);
    const wrong = e.options.findIndex((_: string, i: number) => i !== e.answer);
    assert.equal(isCorrect(e, [wrong]), false);
  }
}

// ---- Role-play navigation ---------------------------------------------------
for (const rp of cur.rolePlays) {
  let step = 0;
  let guard = 0;
  while (true) {
    const r = cur.advanceTurn(step, rp.turns.length);
    if (r.finished) break;
    assert.equal(r.step, step + 1);
    step = r.step;
    assert.ok(++guard < 100);
  }
  assert.equal(step, rp.turns.length - 1, `${rp.id} reaches its last turn`);
}
assert.equal(cur.advanceTurn(0, 1).finished, true);

// ---- Lesson resume and path progression ------------------------------------
const first = cur.nextLessonFor("beginner", [], undefined);
assert.equal(first.id, cur.pathLessons("beginner")[0].id);
const second = cur.pathLessons("beginner")[1];
assert.equal(
  cur.nextLessonFor("beginner", [first.id], undefined).id,
  second.id,
);
// An unfinished lesson in the path is resumed.
assert.equal(cur.nextLessonFor("beginner", [], second.id).id, second.id);
// A completed "last lesson" is not resumed.
assert.equal(
  cur.nextLessonFor("beginner", [second.id], second.id).id,
  first.id,
);
const everyBeginner = cur.pathLessons("beginner").map((l: any) => l.id);
assert.equal(
  cur.nextLessonFor("beginner", everyBeginner, undefined),
  undefined,
);
// The two paths do not share lessons, and the reading unit is outside both.
const beginnerIds = new Set(everyBeginner);
for (const l of cur.pathLessons("intermediate"))
  assert.ok(!beginnerIds.has(l.id));
for (const l of cur.units
  .find((u: any) => u.path === "reading")
  .lessons.map((id: string) => ({ id })))
  assert.ok(!beginnerIds.has(l.id));

// ---- Progress compatibility -------------------------------------------------
const legacy = {
  completed: ["intro"],
  saved: ["intro", "word-0"],
  dates: ["2026-10-18"],
  bestScore: 75,
  attempts: 2,
  lastLesson: "intro",
  steps: { intro: 3 },
  reviews: { "intro-gap": { due: 5, interval: 1, correct: 1 } },
  mastered: ["intro-gap"],
};
const migrated = validateProgress(legacy);
assert.equal(migrated.path, "beginner");
assert.deepEqual(migrated.speaking, {});
assert.deepEqual(migrated.confidence, {});
assert.deepEqual(migrated.checkpoints, {});
assert.equal(migrated.placement, undefined);
assert.deepEqual(migrated.steps, { intro: 3 });
assert.deepEqual(migrated.reviews["intro-gap"], {
  due: 5,
  interval: 1,
  correct: 1,
});

const lesson = cur.pathLessons("intermediate")[0].id;
const rpId = `rp-${lesson}`;
const unit = cur.units.find((u: any) => u.path === "intermediate");
const expr = cur.expressions[0].id;
const exId = cur.allExercises[10].id;
const cpId = unit.checkpoint.ex[0].id;
const full = {
  ...migrated,
  path: "intermediate",
  placement: {
    path: "intermediate",
    unit: unit.id,
    score: 7,
    total: 9,
    speak: 2,
    at: 1000,
  },
  speaking: {
    [lesson]: { task: 2, role: 1 },
    [rpId]: { task: 0, role: 3 },
    [cur.talks[0].id]: { task: 1, role: 0 },
  },
  confidence: { [lesson]: 2, [rpId]: 3, [cur.talks[0].id]: 1 },
  checkpoints: { [unit.id]: { correct: 3, total: 4, at: 2000 } },
  reviews: {
    ...migrated.reviews,
    [expr]: { due: 1, interval: 0, correct: 0 },
    [exId]: { due: 1, interval: 1, correct: 1 },
    [cpId]: { due: 1, interval: 0, correct: 0 },
  },
  saved: [...migrated.saved, expr],
  steps: { ...migrated.steps, [lesson]: 6 },
  lastLesson: lesson,
};
const back = validateProgress(JSON.parse(JSON.stringify(full)));
assert.deepEqual(back, full, "new fields survive a backup round trip");

for (const bad of [
  { ...full, path: "expert" },
  { ...full, placement: { ...full.placement, score: 10 } },
  { ...full, placement: { ...full.placement, unit: "nope" } },
  { ...full, placement: { ...full.placement, speak: 4 } },
  { ...full, speaking: { unknown: { task: 1, role: 0 } } },
  { ...full, speaking: { [lesson]: { task: -1, role: 0 } } },
  { ...full, confidence: { [lesson]: 4 } },
  { ...full, confidence: { nope: 1 } },
  { ...full, checkpoints: { [unit.id]: { correct: 5, total: 4, at: 1 } } },
  { ...full, checkpoints: { nope: { correct: 1, total: 4, at: 1 } } },
  { ...full, reviews: { "exp-x-0": { due: 1, interval: 0, correct: 0 } } },
  { ...full, steps: { [lesson]: 7 } },
])
  assert.throws(
    () => validateProgress(bad),
    undefined,
    JSON.stringify(bad).slice(0, 80),
  );

// ---- Revision scheduling with the new item types ----------------------------
const now = 5_000_000;
const missed = scheduleReview(undefined, false, now);
assert.equal(
  missed.due,
  now + 600_000,
  "missed exercises return in ten minutes",
);
let r = missed;
for (const days of [1, 3, 7, 14, 30])
  assert.equal((r = scheduleReview(r, true, now)).interval, days);
assert.ok(
  reviewIds.includes(expr) &&
    reviewIds.includes(exId) &&
    reviewIds.includes(cpId),
);
assert.equal(
  new Set(reviewIds).size,
  reviewIds.length,
  "review IDs are unique",
);

// Every exercise and expression ID can be stored by the validator.
const everything = Object.fromEntries(
  reviewIds.map((id: string) => [id, { due: 0, interval: 0, correct: 0 }]),
);
assert.equal(
  Object.keys(validateProgress({ ...migrated, reviews: everything }).reviews)
    .length,
  reviewIds.length,
);

// ---- On-device word check (recognition, not scoring) -------------------------
const wc = load("src/state/wordcheck.ts");
{
  const all = wc.checkWords("Where is the bus stop?", ["where is the bus stop"]);
  assert.deepEqual([all.heard, all.total], [5, 5]);
  assert.equal(wc.heardLine(all), "५ पैकी ५ शब्द ऐकू आले");
  const some = wc.checkWords("I would like a cup of tea.", ["I like a cup of tea"]);
  assert.deepEqual(some.words.filter((w: any) => !w.heard).map((w: any) => w.text), ["would"]);
  assert.equal(wc.heardLine(some), "७ पैकी ६ शब्द ऐकू आले");
  // Punctuation and case do not matter; the displayed words keep their form.
  assert.equal(wc.checkWords("Hello, Ravi!", ["hello ravi"]).heard, 2);
  assert.equal(wc.checkWords("Hello, Ravi!", ["hello ravi"]).words[0].text, "Hello,");
  // Contractions either way, curly apostrophes, small numbers.
  assert.equal(wc.checkWords("I'm fine.", ["I am fine"]).heard, 2);
  assert.equal(wc.checkWords("I am fine.", ["I’m fine"]).heard, 3);
  assert.equal(wc.checkWords("I don't know.", ["I do not know"]).heard, 3);
  assert.equal(wc.checkWords("I have 2 brothers.", ["I have two brothers"]).heard, 4);
  // Repeated words need repeated hearing.
  const twice = wc.checkWords("The cat sees the dog.", ["the cat sees dog"]);
  assert.deepEqual([twice.heard, twice.total], [4, 5]);
  // Best of several alternatives; nothing heard is 0, never an error.
  assert.equal(wc.checkWords("Good morning", ["good mourning", "good morning"]).heard, 2);
  assert.deepEqual([wc.checkWords("Good morning", []).heard, wc.checkWords("Good morning", []).total], [0, 2]);
  assert.equal(wc.marathiDigits(10), "१०");
  // Locale: an installed English model only; prefer Indian English.
  assert.equal(wc.pickLocale(["en-US", "en-IN", "hi-IN"]), "en-IN");
  assert.equal(wc.pickLocale(["en_GB"]), "en-GB");
  assert.equal(wc.pickLocale(["en-AU"]), "en-AU");
  assert.equal(wc.pickLocale(["hi-IN", "mr-IN"]), null);
  assert.equal(wc.pickLocale([]), null, "no installed model: fall back");
  // Every lesson sentence can be checked: tokens exist for each word.
  // (the Recorder's model sentences: lesson examples and conversation lines).
  let sentences = 0;
  for (const l of cur.orderedLessons)
    for (const e of [...l.examples, ...(cur.kits[l.id]?.conv ?? [])]) {
      const c = wc.checkWords(e.en, [e.en]);
      assert.ok(c.total > 0 && c.heard === c.total, `${l.id}: "${e.en}"`);
      sentences++;
    }
  assert.ok(sentences > 500, `checked ${sentences} sentences`);
}

// ---- Short steps: Home focus and lesson step labels --------------------------
const steps = load("src/state/steps.ts");
assert.equal(steps.simpleHome("foundation"), true);
assert.equal(steps.simpleHome("beginner"), true);
assert.equal(steps.simpleHome("intermediate"), false);
assert.equal(steps.simpleHome("advanced"), false);
{
  const none = steps.todayGoals([], 0);
  assert.deepEqual([none.done, none.total], [0, 3]);
  const some = steps.todayGoals(["lesson", "word-1"], 7);
  assert.deepEqual([some.done, some.total], [2, 3]);
  assert.match(some.goals[1].label, /\(5\/5\)/, "word count is capped at 5");
  assert.equal(steps.todayGoals(["lesson", "speak"], 5).done, 3);
}
// Stage lists must stay exactly as before: stored progress keeps stage values.
assert.deepEqual(steps.lessonStages(true), [0, 1, 2, 3, 4, 5, 6]);
assert.deepEqual(steps.lessonStages(false), [0, 1, 2, 5, 6]);
assert.equal(steps.stagePosition([0, 1, 2, 5, 6], 5), 3, "stored value 5 is the 4th short stage");
assert.equal(steps.stagePosition([0, 1, 2, 5, 6], 3), 0, "unknown stored value starts at the beginning");
assert.equal(steps.stagePosition([0, 1, 2, 5, 6], undefined), 0);
assert.equal(steps.stepLabel(1, 7), "टप्पा 2/7");
assert.equal(steps.stepLabel(9, 7), "टप्पा 7/7");
assert.equal(steps.lessonMinutes(5, true), 13);
assert.equal(steps.lessonMinutes(5, false), 5);
// Minutes left fall as stages finish, never below 1 on an open stage.
const left = [0, 1, 2, 3, 4, 5, 6].map((p) => steps.minutesLeft(14, 7, p));
assert.deepEqual(left, [14, 12, 10, 8, 6, 4, 2]);
assert.ok(left.every((m, i) => i === 0 || m <= left[i - 1]));
assert.equal(steps.minutesLeft(3, 7, 6), 1);
assert.equal(steps.minutesLeft(0, 7, 0), 0);
assert.equal(steps.minutesLeft(10, 0, 0), 0);
// Every lesson in every path gets a sensible estimate.
const { duration } = load("src/data/journey.ts");
for (const l of cur.orderedLessons) {
  const m = steps.lessonMinutes(duration(l.id), !!cur.kits[l.id]);
  assert.ok(m >= 3 && m <= 30, `${l.id}: ${m} minutes`);
}
// The lesson screen derives stages from the shared helper (no second copy).
const lessonSrc = fs.readFileSync("src/screens/Lesson.tsx", "utf8");
assert.match(lessonSrc, /lessonStages\(/);
assert.ok(!/\[0, 1, 2, 5, 6\]/.test(lessonSrc), "stage list duplicated in Lesson.tsx");
const homeSrc = fs.readFileSync("src/screens/Home.tsx", "utf8");
assert.match(homeSrc, /simpleHome\(path\)/);
assert.match(homeSrc, /<Collapsible[\s\S]*?title="आणखी पाहा/, "beginner Home keeps extras behind आणखी पाहा");

// Voice diary: folder listing is the diary; milestones count day 1 = first recording.
{
  const d = load("src/state/diary.ts");
  assert.deepEqual(
    d.parseEntries(["2026-11-20.m4a", "saving.tmp", "2026-11-16.m4a", "notes.txt"]).map((e: any) => e.date),
    ["2026-11-16", "2026-11-20"],
  );
  assert.equal(d.diaryName("2026-11-16", "file:///cache/rec-1.m4a"), "2026-11-16.m4a");
  assert.equal(d.diaryName("2026-11-16", "file:///cache/rec"), "2026-11-16.m4a");
  assert.equal(d.dayNumber("2026-11-16", "2026-11-22"), 7);
  assert.equal(d.nextMilestone(undefined, "2026-11-16", false), 1);
  assert.equal(d.nextMilestone("2026-11-16", "2026-11-16", true), 7);
  assert.equal(d.nextMilestone("2026-11-16", "2026-11-22", false), 7); // day 7, not yet recorded
  assert.equal(d.nextMilestone("2026-11-16", "2026-11-22", true), 30);
  assert.equal(d.nextMilestone("2026-11-16", "2028-01-01", false), null);
  const text = d.shareText({ days: 12, streak: 1, lessons: 0, spokeDays: 3, diary: 2 }, "https://x");
  assert.match(text, /12 दिवस सराव/);
  assert.doesNotMatch(text, /सलग|धडे पूर्ण/); // zero / one-day lines are left out
  assert.match(text, /https:\/\/x$/);
}

// Interview kit: 20 unique questions, every field filled, audio text has no brackets.
{
  const iv = load("src/data/interview.ts");
  assert.equal(iv.interviewQuestions.length, 20);
  assert.equal(new Set(iv.interviewQuestions.map((q: any) => q.id)).size, 20);
  for (const q of iv.interviewQuestions) {
    for (const k of ["q", "qMr", "answer", "answerMr", "tip"]) assert.ok(q[k]?.trim(), `${q.id} ${k}`);
    assert.doesNotMatch(iv.plainAnswer(q.answer), /[\[\]]/, q.id);
  }
  assert.equal(iv.plainAnswer("I am [Rahul] from [Pune]."), "I am Rahul from Pune.");
}

// Sound pairs: each pair is two different lowercase words, every group has a tip.
{
  const { soundGroups } = load("src/data/soundPairs.ts");
  assert.ok(soundGroups.length >= 6);
  for (const g of soundGroups) {
    assert.ok(g.tip.trim() && g.pairs.length >= 3, g.id);
    for (const [a, b] of g.pairs) assert.ok(a !== b && /^[a-z]+$/.test(a + b), `${g.id}: ${a}/${b}`);
  }
}

// Goal journeys: every task points at real content; days advance in order.
{
  const jn = load("src/state/journeys.ts");
  const { lessonById } = load("src/curriculum/index.ts");
  const { situations } = load("src/data/speaking.ts");
  const { interviewQuestions } = load("src/data/interview.ts");
  const ivIds = new Set(interviewQuestions.map((q: any) => q.id));
  for (const j of jn.JOURNEYS)
    j.days.forEach((tasks: any[], i: number) => {
      assert.ok(tasks.length >= 1, `${j.id} day ${i + 1} is empty`);
      for (const t of tasks) {
        if (t.kind === "lesson") assert.ok(lessonById(t.id), `${j.id}: lesson ${t.id}`);
        if (t.kind === "interview") assert.ok(ivIds.has(t.id), `${j.id}: question ${t.id}`);
        if (t.kind === "phrasebook") assert.ok(situations.some((x: any) => x.id === t.id), `${j.id}: ${t.id}`);
      }
    });
  assert.equal(jn.journeyForGoal("interview"), "interview-21");
  assert.equal(jn.journeyForGoal("travel"), "travel-14");
  assert.equal(jn.journeyForGoal(undefined), "daily-30");
  assert.equal(jn.currentDay({ id: "travel-14", start: "2026-11-16", done: [] }), 1);
  assert.equal(jn.currentDay({ id: "travel-14", start: "2026-11-16", done: [1, 2, 4] }), 3);
  assert.equal(jn.currentDay({ id: "travel-14", start: "2026-11-16", done: Array.from({ length: 14 }, (_, i) => i + 1) }), null);
}

// Speak along: word spans and the word under the voice's character position.
{
  const sa = load("src/state/shadowing.ts");
  const spans = sa.wordSpans("Where is the bus stop?");
  assert.deepEqual(spans.map((w: any) => w.start), [0, 6, 9, 13, 17]);
  assert.equal(sa.wordAt(spans, -1), -1);
  assert.equal(sa.wordAt(spans, 0), 0);
  assert.equal(sa.wordAt(spans, 9), 2);
  assert.equal(sa.wordAt(spans, 11), 2); // inside "the"
  assert.equal(sa.wordAt(spans, 17), 4);
}

console.log(
  `Flow checks passed: scoring (${cur.allExercises.length} exercises solvable, duplicates, alternatives), ` +
    `${cur.rolePlays.length} role-play progressions, resume logic, short-step helpers, migration + 12 invalid new-field imports, revision IDs (${reviewIds.length}).`,
);
void initial;

// ---- Website learn pages -----------------------------------------------------
{
  const { pages } = await import("./site-pages.ts");
  const all = pages();
  const files = new Set(all.map((p: any) => p.file));
  assert.equal(files.size, all.length, "learn pages: duplicate file names");
  for (const p of all) {
    assert.ok(p.title && p.description && p.body, `${p.file}: empty field`);
    assert.ok(!/undefined|\[object/.test(p.body + p.title), `${p.file}: missing data`);
    for (const [, href] of p.body.matchAll(/href="\/learn\/([^"]+)"/g))
      assert.ok(files.has(href), `${p.file}: broken link ${href}`);
  }
  console.log(`Learn pages: ${all.length} pages, links resolve.`);
}
