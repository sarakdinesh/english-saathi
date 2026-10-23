import assert from "node:assert/strict";
import fs from "node:fs";
import { load } from "./lib.ts";

// Speaking dictionary: counts the app promises, clean data, A→Z order and
// a search that works in English and Marathi.
const d = load("src/data/dictionary/index.ts");
const deva = /[ऀ-ॿ]/;
const ascii = /^[A-Za-z][A-Za-z '\-.,?!/()]*$/;
const sorted = (xs: string[]) =>
  xs.every((x, i) => i === 0 || xs[i - 1].localeCompare(x, "en", { sensitivity: "base" }) <= 0);

// ---- Words -----------------------------------------------------------------
const words = d.dictionaryWords;
const uniqueEn = new Set(words.map((w: any) => w.en.toLowerCase()));
assert.ok(uniqueEn.size >= 3000, `only ${uniqueEn.size} unique words`);
assert.ok(sorted(words.map((w: any) => w.en)), "words sorted A→Z");
const cats = new Set(d.wordCategories.map((c: any) => c.id));
assert.equal(cats.size, d.wordCategories.length, "unique category ids");
for (const c of d.wordCategories) {
  assert.ok(deva.test(c.mr) && c.en, `${c.id}: Marathi + English label`);
  assert.ok(words.filter((w: any) => w.cat === c.id).length >= 20, `${c.id}: at least 20 words`);
}
const perCat = new Set<string>();
for (const w of words) {
  assert.ok(cats.has(w.cat), `${w.en}: unknown category ${w.cat}`);
  assert.ok(ascii.test(w.en) || /[A-Za-z]/.test(w.en), `${w.en}: English headword`);
  assert.ok(deva.test(w.mr), `${w.en}: Marathi meaning`);
  assert.ok(!/[­​]/.test(w.mr + w.en), `${w.en}: hidden characters`);
  const key = `${w.cat}:${w.en.toLowerCase()}`;
  assert.ok(!perCat.has(key), `duplicate in one category: ${key}`);
  perCat.add(key);
}
// A word repeated across categories must carry a different meaning there.
const byEn = new Map<string, string[]>();
for (const w of words) byEn.set(w.en.toLowerCase(), [...(byEn.get(w.en.toLowerCase()) ?? []), w.mr]);
for (const [en, mrs] of byEn) assert.equal(new Set(mrs).size, mrs.length, `${en}: same meaning listed twice`);

// ---- Verbs ------------------------------------------------------------------
const verbs = d.verbs;
assert.ok(verbs.length >= 500, `only ${verbs.length} verbs`);
assert.ok(sorted(verbs.map((v: any) => v.v1)), "verbs sorted A→Z");
assert.equal(new Set(verbs.map((v: any) => v.v1)).size, verbs.length, "unique verbs");
for (const v of verbs) {
  for (const f of [v.v1, v.v2, v.v3, v.ing]) assert.ok(/^[a-z][a-z' ()/-]*$/.test(f), `${v.v1}: form "${f}"`);
  assert.match(v.ing, /ing$/, `${v.v1}: V-ing`);
  assert.ok(deva.test(v.mr), `${v.v1}: Marathi meaning`);
  assert.equal(v.irregular, !(/ed$/.test(v.v2) && /ed$/.test(v.v3)), `${v.v1}: irregular flag`);
  if (!v.irregular) assert.equal(v.v2, v.v3, `${v.v1}: regular V2 = V3`);
}
// Spot checks on forms learners get wrong.
const verb = (x: string) => verbs.find((v: any) => v.v1 === x);
assert.deepEqual([verb("go").v2, verb("go").v3, verb("go").ing], ["went", "gone", "going"]);
assert.deepEqual([verb("stop").v2, verb("stop").ing], ["stopped", "stopping"]);
assert.deepEqual([verb("lie").v2, verb("lie (tell a lie)").v2], ["lay", "lied"]);
assert.equal(verb("travel").v2, "travelled", "British spelling");
assert.ok(verb("write").irregular && !verb("work").irregular);
assert.ok(verbs.filter((v: any) => v.irregular).length >= 100, "enough irregular verbs");

// ---- Phrasal verbs and opposites ----------------------------------------------
assert.ok(d.phrasalVerbs.length >= 100);
assert.equal(new Set(d.phrasalVerbs.map((p: any) => p.en)).size, d.phrasalVerbs.length, "unique phrasal verbs");
for (const p of d.phrasalVerbs) {
  assert.ok(deva.test(p.mr), `${p.en}: Marathi`);
  assert.match(p.ex, /[.?!]$/, `${p.en}: example is a sentence`);
}
assert.ok(d.opposites.length >= 150);
const pairs = new Set<string>();
for (const o of d.opposites) {
  assert.ok(o.a !== o.b && deva.test(o.mr) && o.mr.includes("/"), `${o.a}/${o.b}`);
  const key = [o.a, o.b].sort().join("|");
  assert.ok(!pairs.has(key), `duplicate opposite pair ${key}`);
  pairs.add(key);
}

// ---- Search -------------------------------------------------------------------
const fields = (w: any) => [w.en, w.mr];
assert.equal(d.search(words, "", fields).length, words.length, "empty search shows all");
assert.equal(d.search(words, "  WATER ", fields)[0].en, "water", "case and spaces ignored; prefix first");
assert.equal(d.search(words, "पाणी", fields)[0].en, "water", "Marathi search, exact meaning first");
assert.equal(d.search(words, "आई", fields)[0].en, "mother");
assert.equal(d.search(verbs, "करणे", (v: any) => [v.v1, v.mr])[0].v1, "do", "exact Marathi verb meaning first");
assert.ok(d.search(verbs, "went", (v: any) => [v.v1, v.v2, v.v3, v.ing, v.mr]).some((v: any) => v.v1 === "go"), "search by V2");
assert.equal(d.search(words, "zzzz", fields).length, 0);

// ---- Screen wiring --------------------------------------------------------------
const screen = fs.readFileSync("src/screens/Dictionary.tsx", "utf8");
assert.match(screen, /<FlatList/, "virtualised list for thousands of rows");
assert.ok(!/<Shell/.test(screen), "no ScrollView around the FlatList");
for (const t of ["words", "verbs", "phrasal", "opposites"]) assert.match(screen, new RegExp(`\\["${t}", "[\\u0900-\\u097F]`));
assert.match(fs.readFileSync("src/screens/Menu.tsx", "utf8"), /route: "Dictionary"/);

console.log(
  `Dictionary checks passed: ${uniqueEn.size} words in ${cats.size} categories, ${verbs.length} verbs (${verbs.filter((v: any) => v.irregular).length} irregular), ${d.phrasalVerbs.length} phrasal verbs, ${d.opposites.length} opposites, search.`,
);
