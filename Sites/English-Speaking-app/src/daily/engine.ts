// Deterministic daily content. Pure and offline: the same date, path, history
// and mastery always give the same plan. A plan stores IDs only, so content
// text can be corrected later without invalidating stored plans.
import { words, questions } from "../data/course";
import { drillCards, mistakes, sounds } from "../data/speaking";
import {
  allExercises,
  kits,
  pathLessons,
  rolePlays,
  talks,
} from "../curriculum";
import type { PathId } from "../curriculum/types";
import { goalSituations, type Goal } from "../state/onboarding";
import {
  foundationSharedSoundIds,
  foundationSounds,
  foundationTips,
} from "./foundation";

export const DAILY_TASKS = [
  "words",
  "sentence",
  "conversation",
  "tip",
  "pronunciation",
  "speaking",
  "quiz",
] as const;
export type DailyTask = (typeof DAILY_TASKS)[number];

export type DailyPlan = {
  date: string; // YYYY-MM-DD, the learner's local calendar day
  path: PathId;
  words: string[];
  sentence: string; // drill card id
  conversation: string; // lesson id with a bundled conversation
  tip: string; // `mistake-N`
  sound: string; // pronunciation sound id
  speaking: string; // talk id (intermediate) or role-play id (beginner)
  quiz: string[]; // `quiz-N` or an exercise id
};

export const HISTORY_DAYS = 14;
export const MAX_STORED_PLANS = 60;
const QUIZ_SIZE = 5;
// A device date further ahead than this is treated as a changed clock, not
// as evidence that the learner really is in the future.
const MAX_AHEAD_DAYS = 3;

// Level pools. Foundation learners get a hand-picked set of concrete, everyday
// words and only short sentences; other paths use all content. Pools smaller
// than HISTORY_DAYS * perDay shorten the no-repeat window instead of repeating.
const FOUNDATION_WORDS = new Set(
  [
    22, 23, 24, 28, 31, 37, 39, 40, 50, 51, 52, 53, 54, 56, 60, 61, 62, 63, 65,
    66, 67, 68, 69, 70, 73, 77, 81, 86, 90, 91, 92, 93, 94, 96, 98,
  ].map((n) => `word-${n}`),
);
const FOUNDATION_SENTENCE_WORDS = 5;
export const wordsFor = (path: PathId) =>
  path === "foundation" ? words.filter((w) => FOUNDATION_WORDS.has(w.id)) : words;
export const sentencesFor = (path: PathId) =>
  path === "foundation"
    ? drillCards.filter((c) => c.en.split(/\s+/).length <= FOUNDATION_SENTENCE_WORDS)
    : drillCards;
export const recentWindow = (poolSize: number, perDay: number) =>
  Math.max(0, Math.min(HISTORY_DAYS, Math.floor(poolSize / perDay) - 1));

export type Context = {
  date: string;
  path: PathId;
  mastered: string[];
  completed: string[];
  lastLesson?: string;
  goal?: Goal;
  // Plans for earlier days (any order); only the newest HISTORY_DAYS are used.
  history: DailyPlan[];
};

export const isDate = (d: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(d) &&
  new Date(d + "T00:00:00Z").toISOString().slice(0, 10) === d;
const dayNumber = (d: string) => Math.floor(Date.parse(d + "T00:00:00Z") / 864e5);

// The day the app treats as "today". Setting the device clock backwards never
// reopens or rewrites an earlier day; a large jump forward is not trusted.
export function effectiveDate(local: string, lastSeen?: string) {
  if (!lastSeen || !isDate(lastSeen) || lastSeen <= local) return local;
  return dayNumber(lastSeen) - dayNumber(local) <= MAX_AHEAD_DAYS
    ? lastSeen
    : local;
}

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffled<T>(items: T[], random: () => number) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Picks `n` unique items. Order of preference: not recently used and preferred,
// not recently used, then anything. Ties are broken by the date-seeded shuffle.
export function pick<T>(
  items: T[],
  n: number,
  seed: string,
  key: (x: T) => string,
  avoid: Set<string>,
  prefer: (x: T) => boolean = () => true,
): T[] {
  const random = rng(hash(seed));
  const fresh = items.filter((x) => !avoid.has(key(x)));
  const tiers = [
    fresh.filter(prefer),
    fresh.filter((x) => !prefer(x)),
    items.filter((x) => avoid.has(key(x))),
  ];
  return tiers.flatMap((t) => shuffled(t, random)).slice(0, n);
}

export type QuizItem = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  audio?: string;
};
const quizById = new Map<string, QuizItem>();
questions.forEach((q, i) => quizById.set(`quiz-${i}`, { id: `quiz-${i}`, ...q }));
allExercises
  .filter((e) => e.kind === "choice")
  .forEach((e) => quizById.set(e.id, e));
export const quizItem = (id: string) => quizById.get(id);
export const quizIds = [...quizById.keys()];

const cardById = new Map(drillCards.map((c) => [c.id, c]));
export const sentenceById = (id: string) => cardById.get(id);
const beginnerTipIds = mistakes.map((_, i) => `mistake-${i}`);
const foundationTipIds = foundationTips.map((x) => x.id);
// Every ID a stored plan may hold; `tipsFor`/`soundsFor` give a path's own pool.
export const tipIds = [...beginnerTipIds, ...foundationTipIds];
export const tipById = (id: string) =>
  id.startsWith("mistake-")
    ? mistakes[Number(id.slice(8))]
    : foundationTips.find((x) => x.id === id);
export const tipsFor = (path: PathId) =>
  path === "foundation" ? foundationTipIds : beginnerTipIds;
export const allSounds = [...sounds, ...foundationSounds];
export const soundById = (id: string) => allSounds.find((x) => x.id === id);
export const soundsFor = (path: PathId) =>
  path === "foundation"
    ? [
        ...foundationSounds,
        ...sounds.filter((x) => foundationSharedSoundIds.includes(x.id)),
      ]
    : sounds;
export const speakingById = (id: string) =>
  talks.find((t) => t.id === id)
    ? ({ kind: "talk", talk: talks.find((t) => t.id === id)! } as const)
    : rolePlays.find((r) => r.id === id)
      ? ({ kind: "roleplay", rp: rolePlays.find((r) => r.id === id)! } as const)
      : undefined;

export function buildPlan(ctx: Context): DailyPlan {
  const { date, path, mastered } = ctx;
  const done = new Set(mastered);
  const recent = ctx.history
    .filter((p) => p.date < date)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, HISTORY_DAYS);
  const used = (
    f: (p: DailyPlan) => string | string[],
    poolSize = Infinity,
    perDay = 1,
  ) => new Set(recent.slice(0, recentWindow(poolSize, perDay)).flatMap((p) => f(p)));
  const seed = (salt: string) => `${date}|${path}|${salt}`;

  // Lessons the learner has met: everything up to and including the next one.
  const list = pathLessons(path).filter((l) => kits[l.id]);
  const nextIndex = list.findIndex((l) => !ctx.completed.includes(l.id));
  const met = list.slice(0, Math.max(3, nextIndex < 0 ? list.length : nextIndex + 1));
  const metIds = new Set(met.map((l) => l.id));

  const wordPool = wordsFor(path);
  const sentencePool = sentencesFor(path);
  const pickedWords = pick(
    wordPool,
    5,
    seed("words"),
    (w) => w.id,
    used((p) => p.words, wordPool.length, 5),
    (w) => !done.has(w.id),
  ).map((w) => w.id);
  const sentence = pick(
    sentencePool,
    1,
    seed("sentence"),
    (c) => c.id,
    used((p) => p.sentence, sentencePool.length),
    // Phrases from situations that match the learner's goal come first.
    (c) => !ctx.goal || goalSituations[ctx.goal].includes(c.situation),
  )[0].id;
  const conversation = pick(
    met,
    1,
    seed("conversation"),
    (l) => l.id,
    used((p) => p.conversation),
    (l) => !ctx.completed.includes(l.id) || l.id === ctx.lastLesson,
  )[0].id;
  const tipPool = tipsFor(path);
  const soundPool = soundsFor(path);
  const tip = pick(
    tipPool,
    1,
    seed("tip"),
    (x) => x,
    used((p) => p.tip, tipPool.length),
  )[0];
  const sound = pick(
    soundPool,
    1,
    seed("sound"),
    (x) => x.id,
    used((p) => p.sound, soundPool.length),
  )[0].id;
  const speakPool: { id: string }[] =
    path === "intermediate"
      ? talks.filter((t) => t.level === path)
      : rolePlays.filter((r) => r.level === path && metIds.has(r.id.replace(/^rp-/, "")));
  const speaking = pick(
    speakPool.length ? speakPool : rolePlays.filter((r) => r.level === path),
    1,
    seed("speaking"),
    (x) => x.id,
    used((p) => p.speaking),
  )[0].id;
  // Exercises from lessons the learner has met; the original mixed questions
  // are beginner-level and only used on that path. Never falls back to other
  // levels: widen to every lesson of the learner's own path instead.
  const pathIds = new Set(list.map((l) => l.id));
  const inPool = (lessons: Set<string>) =>
    quizIds.filter((id) => {
      const lesson = (quizById.get(id) as any).lesson as string | undefined;
      return lesson ? lessons.has(lesson) : path === "beginner";
    });
  const metPool = inPool(metIds);
  const quizPool = metPool.length >= QUIZ_SIZE ? metPool : inPool(pathIds);
  const quiz = pick(
    quizPool,
    QUIZ_SIZE,
    seed("quiz"),
    (x) => x,
    used((p) => p.quiz, quizPool.length, QUIZ_SIZE),
    (x) => !done.has(x),
  );
  return {
    date,
    path,
    words: pickedWords,
    sentence,
    conversation,
    tip,
    sound,
    speaking,
    quiz,
  };
}

// Keeps the newest plans; used before storing so progress stays small.
export function prunePlans(plans: Record<string, DailyPlan>) {
  const keep = Object.keys(plans).sort().slice(-MAX_STORED_PLANS);
  return Object.fromEntries(keep.map((d) => [d, plans[d]]));
}

// A short practice set for one skill area: questions the learner got wrong
// first, then new ones from lessons they have started or finished. Stable for a
// given day so reopening the screen does not reshuffle.
export function skillPractice(
  skill: string,
  date: string,
  progress: { reviews: Record<string, unknown>; mastered: string[]; completed: string[] },
  exercises: { id: string; lesson: string; skill: string }[],
  skillOf: Record<string, string>,
  n = 5,
) {
  const mastered = new Set(progress.mastered);
  const own = exercises.filter((e) => skillOf[e.skill] === skill);
  const wrong = (id: string) => id in progress.reviews && !mastered.has(id);
  const fresh = (e: { id: string; lesson: string }) =>
    !(e.id in progress.reviews) && progress.completed.includes(e.lesson);
  const rank = (e: { id: string; lesson: string }) =>
    wrong(e.id) ? 0 : fresh(e) ? 1 : e.id in progress.reviews ? 3 : 2;
  const tiers = [0, 1, 2, 3].map((r) => own.filter((e) => rank(e) === r));
  return tiers.flatMap((tier, i) =>
    pick(tier, n, `${date}|skill|${skill}|${i}`, (e) => e.id, new Set()),
  ).slice(0, n);
}
