import assert from "node:assert/strict";
import { load } from "./lib.ts";

const sk = load("src/state/skills.ts");
const eng = load("src/daily/engine.ts");
const { allExercises } = load("src/curriculum/index.ts");

// Every exercise type maps to an area, and every area has real questions.
const types = new Set(allExercises.map((e: any) => e.skill));
for (const t of types) assert.ok(sk.skillOfExercise[t as string], `unmapped ${t}`);
const none = { reviews: {}, mastered: [], completed: [] };
const base = sk.skillStats(none, allExercises);
assert.equal(base.length, 6);
for (const st of base) {
  assert.ok(st.total >= 10, `${st.skill} has only ${st.total} questions`);
  assert.equal(st.attempted, 0);
  assert.equal(st.level, "unknown");
}

// Thresholds: fewer than 5 answers is never labelled; 80%+ strong; under 60% weak.
assert.equal(sk.levelOf(4, 4), "unknown");
assert.equal(sk.levelOf(5, 5), "strong");
assert.equal(sk.levelOf(5, 4), "strong");
assert.equal(sk.levelOf(5, 3), "ok");
assert.equal(sk.levelOf(5, 2), "weak");
assert.equal(sk.levelOf(10, 5), "weak");

// Stats count answered questions only; "correct" means the latest answer was right.
const listen = allExercises.filter((e: any) => e.skill === "listen").slice(0, 6);
const gaps = allExercises.filter((e: any) => e.skill === "gap").slice(0, 5);
const reviews: any = {};
for (const e of [...listen, ...gaps]) reviews[e.id] = { due: 0, interval: 0, correct: 0 };
const mastered = [...listen.slice(0, 5), ...gaps.slice(0, 1)].map((e: any) => e.id);
const stats = sk.skillStats({ reviews, mastered }, allExercises);
const by = (k: string) => stats.find((s: any) => s.skill === k);
assert.deepEqual([by("listening").attempted, by("listening").correct, by("listening").level], [6, 5, "strong"]);
assert.deepEqual([by("grammar").attempted, by("grammar").correct, by("grammar").level], [5, 1, "weak"]);
assert.equal(by("reading").attempted, 0);
const sum = sk.summarize(stats);
assert.deepEqual(sum.strengths.map((s: any) => s.skill), ["listening"]);
assert.deepEqual(sum.weaknesses.map((s: any) => s.skill), ["grammar"]);
assert.equal(sum.focus.skill, "grammar");
// With nothing weak, the focus is the least-practised area.
const calm = sk.summarize(sk.skillStats({ reviews: { [listen[0].id]: {} }, mastered: [] }, allExercises));
assert.equal(calm.weaknesses.length, 0);
assert.ok(calm.focus && calm.focus.attempted === 0);
// Self-reported speaking is a count, never a score.
assert.equal(sk.speakingPractice({ a: { task: 2, role: 1 }, b: { task: 0, role: 4 } }), 7);

// Targeted practice: right skill, wrong answers first, unique, stable per day.
const prog = { reviews, mastered, completed: [] };
const set = eng.skillPractice("grammar", "2026-03-01", prog, allExercises, sk.skillOfExercise);
assert.equal(set.length, 5);
assert.equal(new Set(set.map((e: any) => e.id)).size, 5);
assert.ok(set.every((e: any) => sk.skillOfExercise[e.skill] === "grammar"));
const wrongIds = gaps.slice(1).map((e: any) => e.id);
assert.deepEqual(set.slice(0, 4).map((e: any) => e.id).sort(), [...wrongIds].sort());
assert.deepEqual(set, eng.skillPractice("grammar", "2026-03-01", prog, allExercises, sk.skillOfExercise));
for (const area of sk.SKILL_AREAS)
  assert.ok(eng.skillPractice(area, "2026-03-01", none, allExercises, sk.skillOfExercise).length >= 1, area);
console.log("Skill checks passed: mapping, thresholds, strengths/weaknesses, honest speaking, targeted practice.");
