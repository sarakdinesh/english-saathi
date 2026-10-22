// Day rollover, time zones, DST, clock changes and returning after a gap.
// Run under several TZ values by `npm test` (see package.json).
import assert from "node:assert/strict";
import { load } from "./lib.ts";

const eng = load("src/daily/engine.ts");
const tz = process.env.TZ ?? "system";
const day = (n: number) => new Date(Date.UTC(2026, 2, 1 + n)).toISOString().slice(0, 10);

// ---- dateKey is built from local date parts: DST-safe ----------------------
const keys: string[] = [];
for (let h = 0; h < 24 * 400; h += 6) {
  // Walk 400 days in six-hour steps of real elapsed time across every DST change.
  const d = new Date(2026, 0, 1, 12);
  d.setTime(d.getTime() + h * 3600_000);
  keys.push(eng.dateKey(d));
}
const unique = [...new Set(keys)];
for (let i = 1; i < unique.length; i++) {
  const gap = (Date.parse(unique[i] + "T00:00:00Z") - Date.parse(unique[i - 1] + "T00:00:00Z")) / 864e5;
  assert.equal(gap, 1, `${tz}: date jumped from ${unique[i - 1]} to ${unique[i]}`);
}
assert.ok(unique.length >= 399, `${tz}: ${unique.length} distinct days in 400`);
// Late evening and just after midnight are different days; DST-change days still have one key.
assert.equal(eng.dateKey(new Date(2026, 5, 10, 23, 59)), "2026-06-10");
assert.equal(eng.dateKey(new Date(2026, 5, 11, 0, 1)), "2026-06-11");
assert.equal(eng.dateKey(new Date(2026, 2, 8, 12)), "2026-03-08");
assert.equal(eng.dateKey(new Date(2026, 10, 1, 12)), "2026-11-01");

// ---- A small model of the app's clock + plan handling ----------------------
type Store = { clock?: string; plans: Record<string, any>; done: Record<string, string[]>; daily: Record<string, string[]> };
const fresh = (): Store => ({ plans: {}, done: {}, daily: {} });
function open(store: Store, local: string, path = "beginner") {
  const date = eng.effectiveDate(local, store.clock);
  store.clock = date; // useDaily's setClock effect
  const locked = eng.dayHasActivity(store.done, store.daily, date);
  const stored = store.plans[date];
  const usable = stored && (stored.path === path || locked) ? stored : undefined;
  const plan =
    usable ??
    eng.buildPlan({ date, path, mastered: [], completed: [], history: Object.values(store.plans) });
  store.plans = eng.mergePlan(store.plans, store.done, store.daily, plan);
  return { date, plan: store.plans[date] };
}
const complete = (s: Store, date: string, task = "words") => {
  s.done[date] = [...new Set([...(s.done[date] ?? []), task])];
};

// Normal use: a new plan every day; stored plans never change afterwards.
{
  const s = fresh();
  const seen: Record<string, any> = {};
  for (let i = 0; i < 40; i++) {
    const { date, plan } = open(s, day(i));
    assert.equal(date, day(i));
    seen[date] = JSON.parse(JSON.stringify(plan));
    if (i > 0) assert.notDeepEqual(plan.words, seen[day(i - 1)].words);
  }
  for (const d of Object.keys(seen)) assert.deepEqual(s.plans[d], seen[d], `${d} was rewritten`);
  // Reopening the same day any number of times gives the identical plan.
  assert.deepEqual(open(s, day(39)).plan, seen[day(39)]);
}

// Time zone moved back one day (e.g. travelling west): keep today's plan, then catch up.
{
  const s = fresh();
  open(s, day(5));
  const a = open(s, day(5)).plan;
  const b = open(s, day(4)); // device date went back one day
  assert.equal(b.date, day(5));
  assert.deepEqual(b.plan, a);
  assert.equal(open(s, day(5)).date, day(5));
  assert.equal(open(s, day(6)).date, day(6)); // never stuck
}

// Clock set back several days: accepted as the new date; earlier plans untouched.
{
  const s = fresh();
  for (let i = 0; i <= 10; i++) open(s, day(i));
  const before = JSON.parse(JSON.stringify(s.plans));
  complete(s, day(10), "quiz");
  const back = open(s, day(5));
  assert.equal(back.date, day(5), "a large backward change is accepted at once");
  assert.deepEqual(s.plans, before, "history must not be rewritten");
  assert.deepEqual(s.done[day(10)], ["quiz"], "completion preserved");
  // ... and fresh content resumes after the stored days.
  for (let i = 6; i <= 10; i++) assert.deepEqual(open(s, day(i)).plan, before[day(i)]);
  const next = open(s, day(11));
  assert.equal(next.date, day(11));
  assert.ok(!before[day(11)], "a genuinely new day gets a genuinely new plan");
}

// Clock set far forward and then corrected: no lasting hold-up.
{
  const s = fresh();
  open(s, day(0));
  const jumped = open(s, day(30));
  assert.equal(jumped.date, day(30));
  const corrected = open(s, day(1));
  assert.equal(corrected.date, day(1));
  assert.equal(open(s, day(2)).date, day(2));
  assert.equal(open(s, day(3)).date, day(3));
}

// Returning after several days: today's plan is new and avoids recent history.
{
  const s = fresh();
  for (let i = 0; i < 5; i++) open(s, day(i));
  const back = open(s, day(12));
  assert.equal(back.date, day(12));
  const recentWords = new Set(Object.values(s.plans).filter((p: any) => p.date < day(12)).flatMap((p: any) => p.words));
  assert.ok(back.plan.words.every((w: string) => !recentWords.has(w)), "recent words avoided");
}

// A day's plan is fixed once anything was done; before that a path change replaces it.
{
  const s = fresh();
  const first = open(s, day(2), "beginner").plan;
  const switched = open(s, day(2), "foundation").plan;
  assert.equal(switched.path, "foundation");
  assert.notEqual(switched.path, first.path);
  complete(s, day(2), "sentence");
  const kept = open(s, day(2), "beginner").plan;
  assert.deepEqual(kept, switched, "completed day keeps its plan");
  assert.deepEqual(s.done[day(2)], ["sentence"]);
  // Words learned (recorded in `daily`) also lock the day.
  const t = fresh();
  open(t, day(3), "beginner");
  t.daily[day(3)] = ["word-1"];
  assert.equal(open(t, day(3), "foundation").plan.path, "beginner");
}

// Completion is idempotent: repeating it never duplicates entries.
{
  const s = fresh();
  complete(s, day(1));
  complete(s, day(1));
  assert.deepEqual(s.done[day(1)], ["words"]);
}
// ---- Encouragement: weekly summary and welcome back --------------------------
{
  const enc = load("src/state/encourage.ts");
  // Across the DST changes in March/April and October/November.
  for (const today of ["2026-03-08", "2026-03-29", "2026-04-05", "2026-10-25", "2026-11-01", "2026-01-01"]) {
    const w = enc.lastWeek(today);
    assert.equal(w.length, 7);
    assert.equal(w[6], today);
    assert.equal(new Set(w).size, 7, `${tz} ${today}: duplicate day in week`);
    w.forEach((d: string, i: number) => assert.equal(enc.daysBetween(d, today), 6 - i));
  }
  assert.deepEqual(enc.lastWeek("2026-03-02").slice(0, 2), ["2026-02-24", "2026-02-25"]);
  const daily = {
    "2026-10-20": ["word-1", "word-2", "lesson"],
    "2026-10-21": ["word-2", "word-3", "speak"],
    "2026-10-22": ["word-4"],
    "2026-10-10": ["word-9"], // older than a week: not counted
  };
  const dates = ["2026-10-10", "2026-10-20", "2026-10-21", "2026-10-22"];
  const sum = enc.weekSummary(daily, dates, "2026-10-22");
  assert.deepEqual([sum.words, sum.days], [4, 3], "words counted once each");
  assert.equal(sum.text, "या आठवड्यात 4 शब्द शिकलात · 3 दिवस सराव");
  assert.equal(enc.weekSummary({}, ["2026-10-21"], "2026-10-22").text, "या आठवड्यात 1 दिवस सराव केलात");
  assert.match(enc.weekSummary({}, [], "2026-10-22").text, /सुरुवात/);
  // Welcome back: only after 3+ days away, never on the same day, never guilt.
  assert.equal(enc.welcomeBack([], "2026-10-22"), null, "new learners get no welcome-back");
  assert.equal(enc.welcomeBack(["2026-10-21"], "2026-10-22"), null);
  assert.equal(enc.welcomeBack(["2026-10-20"], "2026-10-22"), null, "2 days is not a break");
  assert.equal(enc.welcomeBack(["2026-10-15", "2026-10-22"], "2026-10-22"), null, "already practised today");
  const short = enc.welcomeBack(["2026-10-19"], "2026-10-22");
  const long = enc.welcomeBack(["2026-09-01", "2026-10-01"], "2026-10-22");
  assert.ok(short && long && short.title !== long.title);
  assert.equal(enc.daysAway(["2026-09-01", "2026-10-01"], "2026-10-22"), 21);
  for (const m of [short, long])
    assert.ok(!/स्ट्रीक|streak|चुकल|गमाव|तुटल/i.test(m.title + m.body), "no guilt or lost-streak wording");
  // Across a month boundary and DST.
  assert.equal(enc.daysAway(["2026-10-28"], "2026-11-02"), 5);
  assert.equal(enc.daysAway(["2026-03-27"], "2026-03-30"), 3);
  // Unit completion.
  assert.equal(enc.unitJustCompleted(["a", "b", "c"], ["a", "b"], "c"), true);
  assert.equal(enc.unitJustCompleted(["a", "b", "c"], ["a"], "c"), false);
  assert.equal(enc.unitJustCompleted(["a", "b"], ["a", "b"], "x"), false);
}
console.log(`Time checks passed (${tz}): DST-safe dates, midnight, time zones, clock changes, gaps, plan locking, weekly summary, welcome back.`);
