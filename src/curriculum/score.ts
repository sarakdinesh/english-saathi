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

// What the learner answered, as text.
export const answerText = (item: Ex, selection: number[]) =>
  item.kind === "build"
    ? selection.map((i) => item.options[i]).join(" ")
    : (item.options[selection[0]] ?? "");

// The model answer shown after a mistake. Gap-fill prompts ("I ___ tea.")
// are completed so the learner sees the whole correct sentence.
export function correctText(item: Ex) {
  if (item.kind === "build") return item.accept[0];
  const option = item.options[item.answer];
  return /_{2,}/.test(item.prompt) ? item.prompt.replace(/_{2,}/, option) : option;
}
