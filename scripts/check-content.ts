import assert from "node:assert/strict";
import { load } from "./lib.ts";

const { lessons, words, questions, categories } = load("src/data/course.ts");
const unique = (items: any[], field: string, label = field) =>
  assert.equal(
    new Set(items.map((x) => x[field])).size,
    items.length,
    `Duplicate ${label}`,
  );
const marathi = (x: string) => /[ऀ-ॿ]/.test(x);

unique(lessons, "id");
unique(lessons, "title");
unique(words, "id");
unique(words, "en");
unique(categories, "id");
for (const l of lessons) {
  assert(
    categories.some((c: any) => c.id === l.category),
    `Unknown category ${l.category}`,
  );
  assert(l.title && l.rule && l.formula && l.task, l.id);
  assert(l.examples.length >= 3, `${l.id} needs 3+ examples`);
  assert(marathi(l.rule), l.id);
  for (const e of l.examples) assert(e.en && marathi(e.mr), `${l.id}: ${e.en}`);
}
for (const w of words) assert(w.en && w.mr && w.example && w.translation);
for (const q of questions) {
  assert(
    Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length,
  );
  assert.equal(new Set(q.options).size, q.options.length);
  assert(q.explanation && q.prompt);
}

const { say, sayFor } = load("src/data/pronunciation.ts");
let guided = 0;
let total = 0;
for (const l of lessons)
  for (const e of l.examples) {
    total++;
    if (sayFor(e.en)) guided++;
  }
for (const [en, mr] of Object.entries(say))
  assert(marathi(mr as string), `Not Devanagari: ${en}`);

// ---- Curriculum ------------------------------------------------------------
const cur = load("src/curriculum/index.ts");
const { units, kits, rolePlays, allExercises, talks } = cur;
const { placementQuestions, foundationQuestions, recommend } = load("src/curriculum/placement.ts");

unique(units, "id", "unit id");
const seen = new Map<string, string>();
for (const u of units) {
  assert(["foundation", "beginner", "intermediate", "reading"].includes(u.path), u.id);
  assert(
    u.title && u.en && u.outcome[0] && marathi(u.outcome[1]),
    `${u.id} outcome`,
  );
  assert(u.lessons.length >= 1, `${u.id} empty`);
  for (const id of u.lessons) {
    assert(
      lessons.some((l: any) => l.id === id),
      `${u.id}: unknown lesson ${id}`,
    );
    assert(!seen.has(id), `${id} appears in ${seen.get(id)} and ${u.id}`);
    seen.set(id, u.id);
  }
}
assert.equal(
  seen.size,
  lessons.length,
  "Every lesson must belong to exactly one unit",
);

const tokens = (s: string) =>
  s.toLowerCase().replace(/,/g, "").split(" ").sort().join("|");
const stats = {
  lessons: 0,
  complete: 0,
  partial: [] as string[],
  exercises: 0,
  roleplays: 0,
  checkpoints: 0,
  checkpointEx: 0,
};
const problems: string[] = [];
function checkEx(e: any, owner: string) {
  try {
    checkExInner(e, owner);
  } catch (err: any) {
    problems.push(String(err.message).split("\n")[0]);
  }
}
function checkExInner(e: any, owner: string) {
  assert(e.id && e.lesson === owner, `${e.id}: owner`);
  assert(
    e.prompt && e.explanation && marathi(e.explanation),
    `${e.id}: prompt/explanation`,
  );
  if (e.kind === "choice") {
    assert(e.options.length >= 3, `${e.id}: needs 3+ options`);
    assert.equal(
      new Set(e.options.map((o: string) => o.toLowerCase().trim())).size,
      e.options.length,
      `${e.id}: duplicate options`,
    );
    assert(
      Number.isInteger(e.answer) &&
        e.answer >= 0 &&
        e.answer < e.options.length,
      `${e.id}: answer`,
    );
    assert(
      e.options.every((o: string) => o.trim()),
      `${e.id}: empty option`,
    );
  } else {
    assert.equal(e.kind, "build");
    assert(e.accept.length >= 1, `${e.id}: accept`);
    const base = e.accept[0].split(" ");
    for (const a of e.accept)
      assert.equal(
        tokens(a),
        tokens(e.accept[0]),
        `${e.id}: alternative uses different words`,
      );
    const pool = [...e.options];
    for (const w of base) {
      const k = pool.indexOf(w);
      assert(k >= 0, `${e.id}: token "${w}" missing from options`);
      pool.splice(k, 1);
    }
    assert(e.options.length >= base.length, `${e.id}: too few tokens`);
  }
  if (e.skill === "listen") assert(e.audio, `${e.id}: listening needs audio`);
  if (e.skill === "en-mr")
    assert(marathi(e.options.join("")), `${e.id}: Marathi options`);
}

for (const u of units) {
  for (const id of u.lessons) {
    stats.lessons++;
    const k = kits[id];
    if (!k) {
      stats.partial.push(id);
      continue;
    }
    assert(k.can[0] && marathi(k.can[1]), `${id}: can-do`);
    assert(k.conv.length >= 4, `${id}: conversation too short`);
    assert(
      k.conv.some((l: any) => l.who === "A") &&
        k.conv.some((l: any) => l.who === "B"),
      `${id}: conversation roles`,
    );
    for (const l of k.conv)
      assert(l.en && marathi(l.mr), `${id}: conversation line`);
    assert(k.patterns.length >= 1, `${id}: patterns`);
    assert(k.ex.length >= 4, `${id}: needs 4+ exercises (has ${k.ex.length})`);
    assert(
      new Set(k.ex.map((e: any) => e.skill)).size >= 3,
      `${id}: needs 3+ exercise types`,
    );
    unique(k.ex, "id", `${id} exercise ids`);
    k.ex.forEach((e: any) => checkEx(e, id));
    const rp = k.rp;
    assert(rp.id === `rp-${id}`, `${id}: role-play id`);
    assert(rp.turns.length >= 4, `${id}: role-play too short`);
    assert(
      rp.turns.filter((t: any) => t.who === "you").length >= 2,
      `${id}: role-play needs 2+ learner turns`,
    );
    for (const t of rp.turns)
      assert(t.en && marathi(t.mr), `${id}: role-play turn`);
    assert.equal(
      rp.level,
      u.path === "reading"
        ? "beginner"
        : u.path === "intermediate"
          ? "intermediate"
          : u.path === "foundation"
            ? "foundation"
            : "beginner",
      `${id}: role-play level`,
    );
    stats.complete++;
    stats.exercises += k.ex.length;
    stats.roleplays++;
  }
  if (!u.optional && u.path !== "reading") {
    assert(u.checkpoint, `${u.id}: missing checkpoint`);
  }
  if (u.checkpoint) {
    stats.checkpoints++;
    assert(
      u.checkpoint.ex.length >= 4,
      `${u.id}: checkpoint needs 4+ questions`,
    );
    assert(
      marathi(u.checkpoint.scenario[1]) && marathi(u.checkpoint.speak),
      `${u.id}: checkpoint text`,
    );
    unique(u.checkpoint.ex, "id", `${u.id} checkpoint ids`);
    u.checkpoint.ex.forEach((e: any) => checkEx(e, u.id));
    stats.checkpointEx += u.checkpoint.ex.length;
    // A checkpoint must use a new situation, not repeat lesson exercises.
    const lessonPrompts = new Set(
      u.lessons.flatMap((id: string) =>
        (kits[id]?.ex ?? []).map((e: any) => e.prompt + "|" + (e.audio ?? "")),
      ),
    );
    for (const e of u.checkpoint.ex)
      assert(
        !lessonPrompts.has(e.prompt),
        `${u.id}: checkpoint repeats a lesson question`,
      );
  }
}
if (problems.length) {
  console.error(
    `${problems.length} exercise problem(s):\n  ` + problems.join("\n  "),
  );
  process.exit(1);
}
unique(allExercises, "id", "exercise ids");
unique(rolePlays, "id", "role-play ids");

// Placement check and recommendations point at real units.
assert(placementQuestions.length >= 6);
placementQuestions.forEach((e: any) => checkEx(e, "place"));
assert.equal(foundationQuestions.length, 3);
foundationQuestions.forEach((e: any) => checkEx(e, "place"));
unique([...placementQuestions, ...foundationQuestions], "id", "placement ids");
for (const score of [0, 3, 4, 5, 6, 7, 8, 9])
  for (const speak of [0, 1, 2, 3])
    for (const f of [undefined, 0, 1, 2, 3]) {
      const r = recommend(score, speak, f);
      assert(
        units.some((u: any) => u.id === r.unit && u.path === r.path),
        `placement ${score}/${speak}/${f}`,
      );
    }
for (const t of talks) {
  assert(
    t.id.startsWith("talk-") && t.title && marathi(t.mr) && marathi(t.prompt),
  );
  assert(t.outline.length >= 3 && t.starters.length >= 3);
}
unique(talks, "id", "talk ids");

for (const c of categories)
  assert(
    lessons.some((l: any) => l.category === c.id),
    `Empty category ${c.id}`,
  );

console.log(
  `Pronunciation guides (optional, approximate): ${guided}/${total} lesson sentences.`,
);
const foundation = units.filter((u: any) => u.path === "foundation");
const beginner = units.filter((u: any) => u.path === "beginner");
const inter = units.filter(
  (u: any) => u.path === "intermediate" && !u.optional,
);
console.log(
  `Validated ${lessons.length} lessons, ${words.length} words, ${questions.length} quiz questions, ${categories.length} categories.`,
);
console.log(
  `Curriculum: ${foundation.length} foundation units, ${beginner.length} beginner units, ${inter.length} intermediate units, ${units.filter((u: any) => u.path === "reading").length} reading unit; ` +
    `${stats.complete}/${stats.lessons} lessons with full kits, ${stats.exercises} guided exercises, ${stats.roleplays} lesson role-plays, ` +
    `${stats.checkpoints} checkpoints (${stats.checkpointEx} questions), ${talks.length} long talks, ${placementQuestions.length} placement questions.`,
);
if (stats.partial.length)
  console.log(`Partial (no full kit yet): ${stats.partial.join(", ")}`);
