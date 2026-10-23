// Speaking dictionary: daily-life words, verb forms, phrasal verbs and
// opposites, all sorted A→Z, with one search used by every tab.
import { groups1 } from "./words-1";
import { groups2 } from "./words-2";
import { groups3 } from "./words-3";
import { groups4 } from "./words-4";
import { groups5 } from "./words-5";
import { groups6 } from "./words-6";
import type { Word, WordGroup } from "./types";
export { verbs } from "./verbs";
export type { Verb } from "./verbs";
export { phrasalVerbs, opposites } from "./extras";
export type { Phrasal, Opposite } from "./extras";
export type { Word } from "./types";

const groups: WordGroup[] = [...groups1, ...groups2, ...groups3, ...groups4, ...groups5, ...groups6];

// Categories for the filter chips, in the order they are written.
export const wordCategories = groups.map(({ id, mr, en }) => ({ id, mr, en }));

export const dictionaryWords: Word[] = groups
  .flatMap((g) =>
    g.raw
      .trim()
      .split("\n")
      .map((line) => {
        const [en, mr] = line.split("|").map((x) => x.trim());
        return { en, mr, cat: g.id };
      }),
  )
  .sort((a, b) => a.en.localeCompare(b.en, "en", { sensitivity: "base" }));

// Case-insensitive match on any of the given fields; English or Marathi.
const fold = (s: string) => s.toLowerCase().normalize("NFC").trim();
export function matches(query: string, ...fields: string[]) {
  const q = fold(query);
  return !q || fields.some((f) => fold(f).includes(q));
}
// Exact matches first, then entries starting with the query, then the rest
// (each group stays A→Z). A meaning like "पाणी, जल" counts as exact for "पाणी".
export function search<T>(list: T[], query: string, fields: (x: T) => string[]) {
  const q = fold(query);
  const hit = list.filter((x) => matches(q, ...fields(x)));
  if (!q) return hit;
  const rank = (x: T) => {
    const fs = fields(x).map(fold);
    if (fs.some((f) => f === q || f.split(/[,;/(]\s*/).some((p) => p.trim() === q))) return 0;
    return fs.some((f) => f.startsWith(q)) ? 1 : 2;
  };
  const ranked = hit.map((x, i) => ({ x, i, r: rank(x) }));
  ranked.sort((a, b) => a.r - b.r || a.i - b.i);
  return ranked.map((e) => e.x);
}
