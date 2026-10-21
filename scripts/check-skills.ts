import assert from "node:assert/strict";
import { load } from "./lib.ts";

const sk = load("src/state/skills.ts");
const eng = load("src/daily/engine.ts");
const { allExercises } = load("src/curriculum/index.ts");

// Every exercise type maps to an area, and every area has real questions.
const types = new Set(allExercises.map((e: any) => e.skill));
for (const t of types) assert.ok(sk.skillOfExercise[t as string], `unmapped ${t}`);
const none = { reviews: {}, mastered: [], completed: [], assisted: [] };
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
// Speaking is not a scored area; self-reports stay separate and are never scores.
assert.ok(!(sk.SKILL_AREAS as string[]).includes("speaking"));
assert.ok(!(sk.SKILL_AREAS as string[]).includes("writing"));
const self = sk.speakingSelfReport({
  speaking: { a: { task: 2, role: 1 }, b: { task: 0, role: 4 } },
  confidence: { a: 3, b: 1 },
});
assert.deepEqual([self.practice, self.rated, self.averageConfidence], [7, 2, 2]);
assert.equal(sk.speakingSelfReport({ speaking: {}, confidence: {} }).averageConfidence, undefined);
for (const a of sk.SKILL_AREAS) {
  assert.ok(sk.skillInfo[a].measures && sk.skillInfo[a].notMeasured, a);
}
// Reply-selection and sentence-arrangement are named for what they are.
assert.equal(sk.skillOfExercise.response, "conversation");
assert.equal(sk.skillOfExercise.build, "sentenceBuilding");
assert.match(sk.skillInfo.conversation.en, /Conversational understanding/);
assert.match(sk.skillInfo.sentenceBuilding.en, /Sentence building/);

// Listening counts only exercises that play audio and were answered without the transcript.
const lis = allExercises.filter((e: any) => e.skill === "listen");
assert.ok(lis.length > 20 && lis.every((e: any) => !!e.audio), "every listening exercise plays audio");
assert.ok(allExercises.filter((e: any) => e.skill !== "listen").every((e: any) => !e.audio), "only listening exercises carry audio");
// The visible prompt must not give the spoken text away.
const leaks = lis.filter((e: any) => e.audio.length > 6 && e.prompt.toLowerCase().includes(e.audio.toLowerCase()));
assert.equal(leaks.length, 0, `prompt reveals audio: ${leaks.map((e: any) => e.id).join(", ")}`);
{
  const six = lis.slice(0, 6);
  const rev: any = Object.fromEntries(six.map((e: any) => [e.id, {}]));
  const all = sk.skillStats({ reviews: rev, mastered: six.map((e: any) => e.id) }, allExercises).find((s: any) => s.skill === "listening");
  assert.deepEqual([all.attempted, all.correct, all.excluded, all.level], [6, 6, 0, "strong"]);
  const some = sk.skillStats({ reviews: rev, mastered: six.map((e: any) => e.id), assisted: [six[0].id, six[1].id] }, allExercises).find((s: any) => s.skill === "listening");
  assert.deepEqual([some.attempted, some.correct, some.excluded, some.level], [4, 4, 2, "unknown"]);
}

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
// Storage of "answered with transcript" flags.
{
  const { validateProgress, initial } = load("src/state/model.ts");
  const id = lis[0].id;
  const base = JSON.parse(JSON.stringify(initial));
  const ok = validateProgress({ ...base, reviews: { [id]: { due: 0, interval: 0, correct: 0 } }, assisted: [id, id] });
  assert.deepEqual(ok.assisted, [id]);
  assert.equal(validateProgress(base).assisted, undefined);
  assert.throws(() => validateProgress({ ...base, assisted: ["nope"] }));
}
console.log("Skill checks passed: mapping, thresholds, strengths/weaknesses, honest speaking, targeted practice.");
