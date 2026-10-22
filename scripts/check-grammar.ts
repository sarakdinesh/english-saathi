import assert from "node:assert/strict";
import fs from "node:fs";
import { load } from "./lib.ts";
const g = load("src/data/grammar.ts");
const { lessons } = load("src/data/course.ts");
const ids = new Set(lessons.map((l: any) => l.id));
const deva = (s: string) => /[ऀ-ॿ]/.test(s);
const all = [...g.tenses, ...g.modals];
assert.equal(new Set(all.map((x: any) => x.id)).size, all.length, "unique ids");
assert.equal(g.tenses.length, 12, "12 tenses");
for (const x of all) {
  if (x.lesson) assert.ok(ids.has(x.lesson), `${x.id}: unknown lesson ${x.lesson}`);
  assert.ok(deva(x.use), `${x.id}: Marathi use`);
  for (const k of ["affirmative", "negative", "question", "passive"]) {
    const f = x[k];
    if (!f) { assert.ok(k === "passive" && g.tenses.includes(x), `${x.id}: missing ${k}`); continue; }
    assert.ok(f.en && f.ex && deva(f.mr), `${x.id}.${k} incomplete`);
    assert.match(f.ex, /[.?]$/, `${x.id}.${k} example should end with . or ?`);
  }
  assert.match(x.question.ex, /\?$/, `${x.id}: question example needs ?`);
  assert.ok(/V1|V2|V3|V-ing/.test(x.affirmative.en) || x.modal, `${x.id}: formula uses V forms`);
}
assert.ok(g.tenses.filter((t: any) => t.passive).length >= 9, "passive for most tenses");
assert.ok(g.passiveSteps.length === 3 && g.passiveNotes.length >= 3);
assert.equal(g.patterns.length, 3);
for (const p of g.patterns) {
  assert.ok(deva(p.use) && p.forms.length >= 3, p.id);
  if (p.lesson) assert.ok(ids.has(p.lesson), p.id);
  for (const x of p.forms) assert.ok(x.f.en && /[.?]$/.test(x.f.ex) && deva(x.f.mr), `${p.id}: ${x.label}`);
}
// Every tab has the same kind of "at a glance" summary.
const expected: Record<string, number> = {
  tenses: g.tenses.length,
  modals: g.modals.length,
  passive: g.tenses.filter((x: any) => x.passive).length,
  patterns: g.patterns.reduce((n: number, p: any) => n + p.forms.length, 0),
};
for (const [tab, n] of Object.entries(expected)) {
  const rows = g.grammarSummary(tab);
  assert.equal(rows.length, n, `${tab} summary rows`);
  for (const r of rows) assert.ok(/[.?]$/.test(r.en) && r.sub, `${tab}: ${r.en}`);
}
const screen = fs.readFileSync("src/screens/Grammar.tsx", "utf8");
assert.match(screen, /<SegmentTabs/, "Grammar uses tabs");
assert.match(screen, /<Summary tab=\{tab\} \/>/, "one summary component for every tab");
assert.match(screen, /<Collapsible/, "summary can be shown and hidden");
for (const tab of Object.keys(expected)) assert.match(screen, new RegExp(`\\["${tab}", "[^"]*[\\u0900-\\u097F]`), `${tab} tab label in Marathi`);
console.log(`Grammar checks passed: ${g.tenses.length} tenses, ${g.modals.length} modal groups, passive, lesson links, tab summaries.`);
