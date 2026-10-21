import assert from "node:assert/strict";
import { load } from "./lib.ts";

const r = load("src/state/reminders.ts");
const { validateProgress, initial } = load("src/state/model.ts");
const on = { enabled: true, hour: 18, minute: 0 };
const at = (d: number, h: number, m = 0) => new Date(2026, 5, d, h, m);

// Disabled: nothing is scheduled.
assert.deepEqual(r.planReminders(at(10, 9), { ...on, enabled: false }, false, 10), []);

// Before today's time: today plus the next six days, one per day at the chosen time.
const plan = r.planReminders(at(10, 9), on, false, 10);
assert.equal(plan.length, 7);
plan.forEach((p: any, i: number) => {
  assert.equal(p.at.getDate(), 10 + i);
  assert.equal(p.at.getHours(), 18);
  assert.equal(p.at.getMinutes(), 0);
});

// Time already passed: starts tomorrow. Studied today: today skipped.
assert.equal(r.planReminders(at(10, 19), on, false, 10)[0].at.getDate(), 11);
assert.equal(r.planReminders(at(10, 9), on, true, 10)[0].at.getDate(), 11);
// A reminder due within the next minute is not scheduled (it would fire at once).
assert.equal(r.planReminders(at(10, 17, 59), on, false, 10)[0].at.getDate(), 11);
// Always exactly seven future reminders, all in the future, month boundaries included.
const edge = r.planReminders(new Date(2026, 11, 29, 20), on, true, 10);
assert.equal(edge.length, 7);
assert.ok(edge.every((p: any) => p.at > new Date(2026, 11, 29, 20)));
assert.equal(edge[0].at.getMonth(), 11);
assert.equal(edge[2].at.getFullYear(), 2027);

// Copy: Marathi, varied, deterministic, uses the learner's minutes, no streak pressure.
const again = r.planReminders(at(10, 9), on, false, 10);
assert.deepEqual(again.map((p: any) => p.body), plan.map((p: any) => p.body));
assert.ok(new Set(plan.map((p: any) => p.body)).size >= 6);
assert.ok(plan.every((p: any) => /[ऀ-ॿ]/.test(p.body) && p.title));
assert.ok(r.reminderBodies(20)[0].includes("20"));
assert.ok(r.reminderBodies(10).every((b: string) => !/streak|सलग/.test(b)));
assert.ok(r.REMINDER_TIMES.every((t: any) => r.isReminder({ enabled: true, ...t })));

// Storage.
const saved = JSON.parse(JSON.stringify({ ...initial, reminder: on }));
assert.deepEqual(validateProgress(saved).reminder, on);
assert.equal(validateProgress(JSON.parse(JSON.stringify(initial))).reminder, undefined);
for (const bad of [
  { ...on, hour: 24 },
  { ...on, minute: -1 },
  { ...on, hour: 1.5 },
  { ...on, enabled: "yes" },
  "on",
])
  assert.throws(() => validateProgress({ ...saved, reminder: bad }));
console.log("Reminder checks passed: schedule planning, skipping, boundaries, Marathi copy, storage.");
