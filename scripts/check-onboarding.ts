import assert from "node:assert/strict";
import { load } from "./lib.ts";

const { recommend } = load("src/curriculum/placement.ts");
const { validateProgress, initial } = load("src/state/model.ts");
const ob = load("src/state/onboarding.ts");
const eng = load("src/daily/engine.ts");

// Placement: letters-and-sounds score routes to Foundation; older callers unchanged.
assert.deepEqual(recommend(9, 3, 0), { path: "foundation", unit: "f1" });
assert.deepEqual(recommend(9, 3, 1), { path: "foundation", unit: "f1" });
assert.deepEqual(recommend(9, 3, 2), { path: "foundation", unit: "f2" });
assert.deepEqual(recommend(1, 0, 3), { path: "foundation", unit: "f4" });
assert.deepEqual(recommend(3, 0, 3), { path: "beginner", unit: "b1" });
assert.deepEqual(recommend(9, 3, 3), { path: "intermediate", unit: "i1" });
assert.deepEqual(recommend(3, 0), { path: "beginner", unit: "b1" });

// Onboarding applies to brand-new learners only.
const fresh = { ...initial };
assert.equal(ob.needsOnboarding(fresh), true);
assert.equal(ob.needsOnboarding({ ...fresh, completed: ["intro"] }), false);
assert.equal(ob.needsOnboarding({ ...fresh, dates: ["2026-01-01"] }), false);
assert.equal(ob.needsOnboarding({ ...fresh, attempts: 1 }), false);
assert.equal(
  ob.needsOnboarding({ ...fresh, profile: { onboarded: true, goal: "work", minutes: 10, at: 1 } }),
  false,
);

// Profile and placement storage.
const profile = { onboarded: true, goal: "travel", minutes: 20, at: 5 };
const saved = JSON.parse(JSON.stringify({ ...initial, profile }));
assert.deepEqual(validateProgress(saved).profile, profile);
assert.equal(validateProgress(JSON.parse(JSON.stringify(initial))).profile, undefined);
for (const bad of [
  { ...profile, goal: "fun" },
  { ...profile, minutes: 7 },
  { ...profile, onboarded: false },
  { ...profile, at: -1 },
  "yes",
])
  assert.throws(() => validateProgress({ ...saved, profile: bad }));
const placement = { path: "foundation", unit: "f1", score: 2, total: 9, speak: 0, at: 1, foundation: 1 };
assert.equal(validateProgress({ ...saved, placement }).placement.foundation, 1);
assert.equal(validateProgress({ ...saved, placement: { ...placement, foundation: undefined } }).placement.foundation, undefined);
assert.throws(() => validateProgress({ ...saved, placement: { ...placement, foundation: 4 } }));
assert.throws(() => validateProgress({ ...saved, placement: { ...placement, unit: "zz" } }));

// Goals lean daily sentences towards matching situations without breaking history rules.
const day = (n: number) => new Date(Date.UTC(2026, 0, 1 + n)).toISOString().slice(0, 10);
for (const goal of ["travel", "work"]) {
  const plans: any[] = [];
  let hits = 0;
  for (let i = 0; i < 20; i++) {
    const p = eng.buildPlan({ date: day(i), path: "beginner", mastered: [], completed: [], history: plans, goal });
    plans.push(p);
    if (ob.goalSituations[goal].includes(eng.sentenceById(p.sentence).situation)) hits++;
  }
  const pool = eng.sentencesFor("beginner").filter((c: any) => ob.goalSituations[goal].includes(c.situation));
  assert.ok(hits >= Math.min(pool.length, 10), `${goal}: ${hits} of 20 matched (${pool.length} available)`);
}
for (const g of ob.GOALS) assert.ok(ob.goalInfo[g].mr && ob.goalSituations[g].length);
console.log("Onboarding checks passed: placement routing, first-run rule, profile storage, goal-aware sentences.");
