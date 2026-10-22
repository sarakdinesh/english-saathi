import assert from "node:assert/strict";
import { load } from "./lib.ts";
const { validateProgress, initial, scheduleReview } =
  load("src/state/model.ts");
const { exercises, buildAnswers } = load("src/data/journey.ts");
const { orderedLessons } = load("src/curriculum/index.ts");
const { lessons } = load("src/data/course.ts");
const { situations, phraseKey, drillCards, mistakes } = load(
  "src/data/speaking.ts",
);
const speaking = {
  ...initial,
  dates: ["2026-10-18"],
  saved: [phraseKey(situations[0].id, situations[0].phrases[0].en)],
  reviews: {
    [drillCards[0].id]: { due: 1, interval: 0, correct: 0 },
    "mistake-0": { due: 1, interval: 0, correct: 0 },
  },
};
assert.deepEqual(
  validateProgress(JSON.parse(JSON.stringify(speaking))).saved,
  speaking.saved,
);
assert.equal(new Set(drillCards.map((c: any) => c.id)).size, drillCards.length);
assert.ok(mistakes.every((m: any) => m.wrong && m.right && m.why && m.say));
const legacy = {
  completed: ["intro"],
  saved: ["intro", "word-0"],
  dates: ["2026-10-18"],
  bestScore: 75,
  attempts: 2,
  lastLesson: "intro",
};
const migrated = validateProgress(legacy);
assert.deepEqual(migrated.completed, legacy.completed);
assert.deepEqual(migrated.saved, legacy.saved);
assert.equal(migrated.version, 2);
assert.deepEqual(migrated.steps, {});
assert.deepEqual(
  validateProgress(JSON.parse(JSON.stringify(migrated))),
  migrated,
);
for (const bad of [
  null,
  {},
  { ...legacy, saved: ["unknown"] },
  { ...legacy, bestScore: 101 },
  { ...legacy, attempts: -1 },
  { ...legacy, dates: ["2026-02-31"] },
  { ...legacy, steps: { intro: 100 } },
  { ...legacy, reviews: { oops: { due: 0, interval: 0, correct: 0 } } },
  { ...legacy, settings: { textSize: 9, sound: true } },
  { ...legacy, settings: { textSize: 1, sound: true, theme: "sepia" } },
  { ...legacy, completed: ["__proto__"] },
  { ...legacy, version: 3 },
])
  assert.throws(() => validateProgress(bad));
// Level 4 path is accepted; unknown paths are still rejected.
assert.equal(validateProgress({ ...migrated, path: "advanced" }).path, "advanced");
assert.throws(() => validateProgress({ ...migrated, path: "expert" }));
// Theme preference: optional (older data has none), validated, round-trips.
assert.equal(validateProgress(legacy).settings.theme, undefined);
const themed = validateProgress({ ...migrated, settings: { textSize: 1.15, sound: false, theme: "dark" } });
assert.deepEqual(themed.settings, { textSize: 1.15, sound: false, theme: "dark" });
assert.deepEqual(validateProgress(JSON.parse(JSON.stringify(themed))).settings, themed.settings);
const now = 1000000;
let r = scheduleReview(undefined, false, now);
assert.equal(r.due, now + 600000);
for (const days of [1, 3, 7, 14, 30, 30]) {
  r = scheduleReview(r, true, now);
  assert.equal(r.interval, days);
  assert.equal(r.due, now + days * 86400000);
}
r = scheduleReview(r, false, now);
assert.equal(r.correct, 0);
assert.equal(r.due, now + 600000);
assert.equal(
  new Set(orderedLessons.map((x: any) => x.id)).size,
  lessons.length,
);
assert.equal(exercises.length, 8);
assert.equal(new Set(exercises.map((e: any) => e.id)).size, 8);
for (const e of exercises) {
  assert(lessons.some((l: any) => l.id === e.lesson));
  assert(e.options[e.answer]);
  assert(e.explanation);
  if (e.kind === "build")
    assert.deepEqual(
      [...e.options].sort(),
      buildAnswers[e.id].split(" ").sort(),
    );
}
console.log(
  "Passed legacy migration, backup round-trip, 12 invalid imports, theme setting, revision intervals, curriculum coverage and 8 beginner exercise checks.",
);
