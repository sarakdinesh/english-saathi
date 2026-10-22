import assert from "node:assert/strict";
import { load } from "./lib.ts";

const eng = load("src/daily/engine.ts");
const { validateProgress, initial } = load("src/state/model.ts");
const { buildPlan, effectiveDate, quizItem, sentenceById, tipById, soundById, speakingById } = eng;
const cur = load("src/curriculum/index.ts");

const day = (n: number) =>
  new Date(Date.UTC(2026, 0, 1 + n)).toISOString().slice(0, 10);
const base = (date: string, path: string, history: any[] = [], mastered: string[] = []) => ({
  date, path, mastered, completed: [], history,
});

// Deterministic: identical inputs, identical plan; different days differ.
for (const path of ["foundation", "beginner", "intermediate", "advanced"]) {
  const a = buildPlan(base(day(5), path));
  assert.deepEqual(a, buildPlan(base(day(5), path)));
  assert.notDeepEqual(a.words, buildPlan(base(day(6), path)).words);
}

// 90-day simulation with history: valid content, no short-term repeats.
for (const path of ["foundation", "beginner", "intermediate", "advanced"]) {
  const plans: any[] = [];
  for (let i = 0; i < 90; i++) {
    const p = buildPlan(base(day(i), path, plans));
    assert.equal(new Set(p.words).size, 5);
    assert.equal(new Set(p.quiz).size, 5);
    assert.ok(sentenceById(p.sentence) && tipById(p.tip) && soundById(p.sound));
    assert.ok(speakingById(p.speaking), `speaking ${p.speaking}`);
    assert.ok(cur.kits[p.conversation]?.conv.length >= 2);
    p.quiz.forEach((id: string) => assert.ok(quizItem(id), id));
    const wordWin = eng.recentWindow(eng.wordsFor(path).length, 5);
    const sentWin = eng.recentWindow(eng.sentencesFor(path).length, 1);
    assert.ok(wordWin >= 5 && sentWin >= 5, "pools large enough to avoid repeats");
    p.words.forEach((w: string) =>
      assert.ok(
        !plans.slice(-wordWin).some((r) => r.words.includes(w)),
        `word repeat ${w} day ${i}`,
      ),
    );
    assert.ok(
      !plans.slice(-sentWin).some((r) => r.sentence === p.sentence),
      "sentence repeat",
    );
    // Level rules: content comes only from the learner's own level.
    const pathLessonIds = new Set(cur.pathLessons(path).map((l: any) => l.id));
    p.words.forEach((w: string) =>
      assert.ok(eng.wordsFor(path).some((x: any) => x.id === w), `${w} not for ${path}`),
    );
    p.quiz.forEach((id: string) => {
      const lesson = (quizItem(id) as any).lesson;
      if (path === "beginner") assert.ok(!lesson || pathLessonIds.has(lesson), id);
      else assert.ok(lesson && pathLessonIds.has(lesson), `${path} quiz ${id}`);
    });
    assert.ok(eng.tipsFor(path).includes(p.tip), `${path} tip ${p.tip}`);
    assert.ok(eng.soundsFor(path).some((x: any) => x.id === p.sound), `${path} sound ${p.sound}`);
    const tw = eng.recentWindow(eng.tipsFor(path).length, 1);
    const sw = eng.recentWindow(eng.soundsFor(path).length, 1);
    assert.ok(!plans.slice(-tw).some((r) => r.tip === p.tip), "tip repeat");
    assert.ok(!plans.slice(-sw).some((r) => r.sound === p.sound), "sound repeat");
    if (path === "foundation")
      assert.ok(sentenceById(p.sentence).en.split(/\s+/).length <= 5, p.sentence);
    plans.push(p);
  }
}

// Foundation tip and sound content is well-formed and bilingual.
const fnd = load("src/daily/foundation.ts");
const deva = (s: string) => /[\u0900-\u097F]/.test(s);
assert.equal(new Set(fnd.foundationTips.map((x: any) => x.id)).size, fnd.foundationTips.length);
for (const x of fnd.foundationTips) assert.ok(x.wrong !== x.right && deva(x.why) && deva(x.say), x.id);
assert.equal(new Set(fnd.foundationSounds.map((x: any) => x.id)).size, fnd.foundationSounds.length);
for (const x of fnd.foundationSounds)
  assert.ok(deva(x.mr) && deva(x.tip) && x.pairs.length >= 3 && x.pairs.every((p: any) => p.en && deva(p.say)), x.id);

// Prefers words not yet mastered.
const words = load("src/data/course.ts").words;
const mastered = words.slice(0, 90).map((w: any) => w.id);
const fresh = buildPlan(base(day(1), "beginner", [], mastered));
assert.ok(fresh.words.every((w: string) => !mastered.includes(w)));

// Clock handling: the last day seen holds for at most one day ahead (time-zone
// changes); anything larger is a correction and the device date is used.
assert.equal(effectiveDate("2026-03-10", "2026-03-11"), "2026-03-11");
assert.equal(effectiveDate("2026-03-10", "2026-03-12"), "2026-03-10");
assert.equal(effectiveDate("2026-03-10", "2026-03-10"), "2026-03-10");
assert.equal(effectiveDate("2026-03-10", "2026-03-01"), "2026-03-10");
assert.equal(effectiveDate("2026-03-10", "2027-01-01"), "2026-03-10");
assert.equal(effectiveDate("2026-03-10", undefined), "2026-03-10");
assert.equal(effectiveDate("2026-03-10", "garbage"), "2026-03-10");

// Storage: plans and completion round-trip; bad data is rejected; old data loads.
const p = buildPlan(base(day(3), "beginner"));
const saved = { ...initial, dailyPlans: { [p.date]: p }, dailyDone: { [p.date]: ["words", "quiz"] }, clock: p.date };
assert.deepEqual(validateProgress(JSON.parse(JSON.stringify(saved))).dailyPlans[p.date], p);
const legacy = JSON.parse(JSON.stringify(initial));
delete legacy.dailyPlans; delete legacy.dailyDone;
assert.deepEqual(validateProgress(legacy).dailyPlans, {});
const bad = (f: (x: any) => void) => {
  const x = JSON.parse(JSON.stringify(saved));
  f(x);
  assert.throws(() => validateProgress(x));
};
bad((x) => (x.dailyPlans[p.date].words = ["word-0"]));
bad((x) => (x.dailyPlans[p.date].quiz = ["nope"]));
bad((x) => (x.dailyPlans[p.date].date = "2026-01-01"));
bad((x) => (x.dailyDone[p.date] = ["hack"]));
bad((x) => (x.clock = "tomorrow"));
console.log("Daily engine checks passed: determinism, level pools, 90-day history, mastery preference, clock rules, storage validation.");
