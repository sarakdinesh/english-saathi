// Which words of a target sentence did the phone's recogniser write down?
// This is word recognition, not pronunciation or accent scoring: a missed
// word only means the recogniser did not write it, which also happens with
// clear, correct speech.

const CONTRACTIONS: Record<string, string> = {
  "i'm": "i am",
  "you're": "you are",
  "we're": "we are",
  "they're": "they are",
  "he's": "he is",
  "she's": "she is",
  "it's": "it is",
  "that's": "that is",
  "what's": "what is",
  "where's": "where is",
  "there's": "there is",
  "let's": "let us",
  "i've": "i have",
  "you've": "you have",
  "we've": "we have",
  "i'll": "i will",
  "you'll": "you will",
  "we'll": "we will",
  "i'd": "i would",
  "don't": "do not",
  "doesn't": "does not",
  "didn't": "did not",
  "can't": "can not",
  "cannot": "can not",
  "won't": "will not",
  "isn't": "is not",
  "aren't": "are not",
  "wasn't": "was not",
  "weren't": "were not",
  "haven't": "have not",
  "hasn't": "has not",
  "shouldn't": "should not",
  "couldn't": "could not",
  "wouldn't": "would not",
};
const NUMBERS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

// One written word → its comparable tokens ("I'm" → ["i", "am"], "5" → ["five"]).
export function tokens(word: string): string[] {
  const w = word
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[^a-z0-9']/g, "")
    .replace(/^'+|'+$/g, "");
  if (!w) return [];
  if (CONTRACTIONS[w]) return CONTRACTIONS[w].split(" ");
  if (/^\d+$/.test(w) && Number(w) <= 20) return [NUMBERS[Number(w)]];
  return [w.replace(/'s$/, "")];
}

export type WordResult = { text: string; heard: boolean };
export type WordCheck = { words: WordResult[]; heard: number; total: number };

// Compares the target with one transcript. Order-free and count-aware: each
// heard token can be used once, so "the … the" needs two "the"s.
function compare(target: string, transcript: string): WordCheck {
  const pool = new Map<string, number>();
  for (const t of transcript.split(/\s+/).flatMap(tokens))
    pool.set(t, (pool.get(t) ?? 0) + 1);
  const words = target
    .split(/\s+/)
    .filter((w) => tokens(w).length)
    .map((text) => {
      const need = tokens(text);
      const heard = need.every((t) => (pool.get(t) ?? 0) > 0);
      if (heard) need.forEach((t) => pool.set(t, pool.get(t)! - 1));
      return { text, heard };
    });
  return { words, heard: words.filter((w) => w.heard).length, total: words.length };
}

// The recogniser may offer several alternatives; use the one that matches best.
export function checkWords(target: string, transcripts: string[]): WordCheck {
  const options = transcripts.length ? transcripts : [""];
  return options
    .map((t) => compare(target, t))
    .reduce((best, c) => (c.heard > best.heard ? c : best));
}

const MR_DIGITS = "०१२३४५६७८९";
export const marathiDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => MR_DIGITS[Number(d)]);

// "६ पैकी ५ शब्द ऐकू आले" — neutral wording, never a score or pass/fail.
export const heardLine = (c: WordCheck) =>
  `${marathiDigits(c.total)} पैकी ${marathiDigits(c.heard)} शब्द ऐकू आले`;

// Preferred English locale among those installed for offline use.
export function pickLocale(installed: string[]) {
  const norm = installed.map((l) => l.replace("_", "-"));
  for (const want of ["en-IN", "en-US", "en-GB"]) {
    const hit = norm.find((l) => l.toLowerCase() === want.toLowerCase());
    if (hit) return hit;
  }
  return norm.find((l) => /^en-/i.test(l)) ?? null;
}
