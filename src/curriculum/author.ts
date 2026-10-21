// Compact authoring helpers. Authors give the correct answer first and the
// builder places it deterministically, so answer positions do not follow a
// pattern and content files stay short.
import type { Lesson } from "../data/course";
import type {
  Ex,
  Skill,
  RolePlay,
  RpTurn,
  PathId,
  Enrich,
  ConvLine,
  Bi,
} from "./types";

export type Draft = Omit<Ex, "id" | "lesson">;

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function choice(
  skill: Skill,
  prompt: string,
  correct: string,
  wrong: string[],
  explanation: string,
  audio?: string,
): Draft {
  return {
    kind: "choice",
    skill,
    prompt,
    options: [correct, ...wrong],
    answer: 0,
    accept: [],
    audio,
    explanation,
  };
}

// Understand a short English text or situation.
export const und = (
  prompt: string,
  correct: string,
  wrong: string[],
  why: string,
): Draft => choice("understand", prompt, correct, wrong, why);
// Complete the gap.
export const gap = (
  sentence: string,
  correct: string,
  wrong: string[],
  why: string,
): Draft => choice("gap", sentence, correct, wrong, why);
// English sentence -> Marathi meaning.
export const e2m = (
  en: string,
  correct: string,
  wrong: string[],
  why: string,
): Draft => choice("en-mr", `“${en}” याचा अर्थ काय?`, correct, wrong, why);
// Marathi sentence -> English.
export const m2e = (
  mr: string,
  correct: string,
  wrong: string[],
  why: string,
): Draft => choice("mr-en", `“${mr}” इंग्रजीत निवडा.`, correct, wrong, why);
// Choose a suitable reply in a conversation.
export const resp = (
  line: string,
  correct: string,
  wrong: string[],
  why: string,
): Draft =>
  choice(
    "response",
    `समोरची व्यक्ती म्हणते: “${line}” योग्य उत्तर कोणते?`,
    correct,
    wrong,
    why,
  );
// Listening: the English sentence is played, not shown; a transcript can be revealed.
export const lis = (
  heard: string,
  question: string,
  correct: string,
  wrong: string[],
  why: string,
): Draft => choice("listen", question, correct, wrong, why, heard);
// Sentence arrangement. accept[0] defines the tokens; extra distractors are added.
export const bld = (
  mr: string,
  accept: string | string[],
  extra: string[],
  why: string,
): Draft => {
  const list = Array.isArray(accept) ? accept : [accept];
  return {
    kind: "build",
    skill: "build",
    prompt: `${mr} · शब्द योग्य क्रमाने लावा.`,
    options: [...list[0].split(" "), ...extra],
    answer: 0,
    accept: list,
    explanation: why,
  };
};

function shuffled<T>(
  items: T[],
  seed: string,
  keepOrderOut?: (x: T[]) => boolean,
): T[] {
  const out = [...items];
  let h = hash(seed) || 1;
  for (let i = out.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  if (keepOrderOut && !keepOrderOut(out) && out.length > 1)
    out.push(out.shift() as T);
  return out;
}

// Assign stable IDs and place correct answers. IDs look like "<owner>-<prefix><n>".
export function finish(owner: string, prefix: string, drafts: Draft[]): Ex[] {
  return drafts.map((d, i) => {
    const id = `${owner}-${prefix}${i + 1}`;
    if (d.kind === "build") {
      const original = d.options.join(" ");
      const options = shuffled(
        d.options,
        id,
        (x) => x.join(" ") !== d.accept[0] && x.join(" ") !== original,
      );
      return { ...d, id, lesson: owner, options };
    }
    const correct = d.options[0];
    const options = shuffled(d.options, id);
    return {
      ...d,
      id,
      lesson: owner,
      options,
      answer: options.indexOf(correct),
    };
  });
}

type RpInput =
  ["o", string, string] | ["y", string, string] | ["y", string, string, string];

export function rolePlay(
  id: string,
  level: PathId,
  title: [string, string],
  situation: string,
  role: string,
  turns: RpInput[],
  featured = false,
): RolePlay {
  return {
    id,
    level,
    title: title[0],
    en: title[1],
    situation,
    role,
    featured,
    turns: turns.map((t): RpTurn =>
      t[0] === "o"
        ? { who: "other", en: t[1], mr: t[2] }
        : { who: "you", mr: t[1], en: t[2], hint: (t as string[])[3] },
    ),
  };
}

export function lessonKit(
  id: string,
  can: Bi,
  conv: ["A" | "B", string, string][],
  patterns: string[],
  drafts: Draft[],
  rp: RolePlay,
): Enrich {
  return {
    can,
    conv: conv.map(([who, en, mr]): ConvLine => ({ who, en, mr })),
    patterns,
    ex: finish(id, "p", drafts),
    rp: { ...rp, id: rp.id || `rp-${id}` },
  };
}

// A new lesson body, in the same shape the existing lessons use.
export function newLesson(
  id: string,
  category: string,
  title: string,
  subtitle: string,
  rule: string,
  formula: string,
  pairs: string[][],
  task: string,
): Lesson {
  return {
    id,
    category,
    title,
    subtitle,
    rule,
    formula,
    examples: pairs.map(([en, mr]) => ({ en, mr })),
    task,
  };
}
