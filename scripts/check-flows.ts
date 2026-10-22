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

console.log(
  `Flow checks passed: scoring (${cur.allExercises.length} exercises solvable, duplicates, alternatives), ` +
    `${cur.rolePlays.length} role-play progressions, resume logic, short-step helpers, migration + 12 invalid new-field imports, revision IDs (${reviewIds.length}).`,
);
void initial;
