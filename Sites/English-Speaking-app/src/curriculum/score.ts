import type { Ex } from "./types";

// Commas are ignored when comparing a built sentence; words and word order are not.
export const normalize = (x: string) =>
  x.toLowerCase().replace(/,/g, "").replace(/\s+/g, " ").trim();

// Objectively checks a choice or a tapped sentence. `selection` holds option
// positions, so repeated words are tracked by position, not by text. Every
// accepted alternative is listed explicitly in `accept`.
export function isCorrect(item: Ex, selection: number[]) {
  if (item.kind === "build") {
    if (new Set(selection).size !== selection.length) return false;
    const built = normalize(selection.map((i) => item.options[i]).join(" "));
    return item.accept.some((a) => normalize(a) === built);
  }
  return selection[0] === item.answer;
}
