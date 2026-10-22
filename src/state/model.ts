import { lessons, words, questions } from "../data/course";
import { phraseKeys, drillCards, mistakes } from "../data/speaking";
import { exercises as legacyExercises } from "../data/journey";
import {
  allExercises,
  expressions,
  rolePlayIds,
  talkIds,
  unitIds,
} from "../curriculum";
import { PATHS, type PathId } from "../curriculum/types";
import { normalizeProfile, type Profile } from "./onboarding";
import { isReminder, type Reminder } from "./reminders";
import {
  DAILY_TASKS,
  MAX_STORED_PLANS,
  isDate,
  quizIds,
  tipIds,
  soundById,
  type DailyPlan,
} from "../daily/engine";
import { talks, rolePlays } from "../curriculum";
export type ReviewItem = { due: number; interval: number; correct: number };
export const THEMES = ["system", "light", "dark"] as const;
export type ThemeChoice = (typeof THEMES)[number];

export type Progress = {
  completed: string[];
  saved: string[];
  dates: string[];
  bestScore: number;
  attempts: number;
  lastLesson?: string;
  history: { score: number; at: number }[];
  version: 2;
  steps: Record<string, number>;
  reviews: Record<string, ReviewItem>;
  mastered: string[];
  // Listening questions whose latest answer was given after the transcript had
  // been revealed: they are not counted as listening evidence.
  assisted?: string[];
  // `theme` was added later; missing means "system" (follow the phone).
  // `celebrate` was added later; missing means on (short celebrations shown).
  settings: {
    textSize: number;
    sound: boolean;
    theme?: ThemeChoice;
    celebrate?: boolean;
  };
  daily: Record<string, string[]>;
  // Added after the first release. All are optional in stored/imported data.
  path: PathId;
  placement?: Placement;
  // Self-reported completions only: never evidence of verified proficiency.
  speaking: Record<string, SpeakingPractice>;
  confidence: Record<string, 1 | 2 | 3>;
  checkpoints: Record<string, CheckpointResult>;
  // Daily content engine. Plans store IDs; completion is kept apart from
  // lesson progress. `clock` is the latest day seen, so a device date moved
  // backwards cannot reopen or rewrite earlier days.
  dailyPlans: Record<string, DailyPlan>;
  dailyDone: Record<string, string[]>;
  clock?: string;
  profile?: Profile;
  reminder?: Reminder;
};
export type SpeakingPractice = { task: number; role: number };
export type CheckpointResult = { correct: number; total: number; at: number };
export type Placement = {
  path: PathId;
  unit: string;
  score: number;
  total: number;
  speak: number;
  at: number;
  // Letters-and-sounds score (0-3); absent in older placements.
  foundation?: number;
};
export const initial: Progress = {
  history: [],
  version: 2,
  completed: [],
  saved: [],
  dates: [],
  bestScore: 0,
  attempts: 0,
  steps: {},
  reviews: {},
  mastered: [],
  settings: { textSize: 1, sound: true },
  daily: {},
  path: "beginner",
  speaking: {},
  confidence: {},
  checkpoints: {},
  dailyPlans: {},
  dailyDone: {},
};
export const reviewIds = Array.from(
  new Set([
    ...words.map((w) => w.id),
    ...questions.map((_, i) => `quiz-${i}`),
    ...legacyExercises.map((e) => e.id),
    ...allExercises.map((e) => e.id),
    ...expressions.map((e) => e.id),
    ...drillCards.map((c) => c.id),
    ...mistakes.map((_, i) => `mistake-${i}`),
  ]),
);
const plain = (v: any) => v && typeof v === "object" && !Array.isArray(v);
const finite = (v: any) => typeof v === "number" && Number.isFinite(v);
const lessonIds = lessons.map((l) => l.id);
function ids(v: any, allowed: string[]) {
  if (
    !Array.isArray(v) ||
    v.length > 10000 ||
    !v.every((x) => typeof x === "string" && allowed.includes(x))
  )
    throw Error("Invalid IDs");
  return [...new Set(v)] as string[];
}
export function validateProgress(p: any): Progress {
  if (!plain(p) || (p.version !== undefined && p.version !== 2))
    throw Error("Unsupported backup");
  const completed = ids(p.completed, lessonIds),
    saved = ids(p.saved, [
      ...lessonIds,
      ...words.map((w) => w.id),
      ...phraseKeys,
      ...expressions.map((e) => e.id),
    ]);
  if (
    !Array.isArray(p.dates) ||
    !p.dates.every(
      (d: any) =>
        typeof d === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(d) &&
        !Number.isNaN(Date.parse(d)) &&
        new Date(d).toISOString().slice(0, 10) === d,
    )
  )
    throw Error("Invalid dates");
  if (
    !finite(p.bestScore) ||
    p.bestScore < 0 ||
    p.bestScore > 100 ||
    !Number.isInteger(p.attempts) ||
    p.attempts < 0
  )
    throw Error("Invalid scores");
  if (p.lastLesson !== undefined && !lessonIds.includes(p.lastLesson))
    throw Error("Invalid lesson");
  const steps: Record<string, number> = {};
  if (p.steps !== undefined) {
    if (!plain(p.steps)) throw Error("Invalid steps");
    for (const [id, n] of Object.entries(p.steps)) {
      if (
        !lessonIds.includes(id) ||
        !Number.isInteger(n) ||
        (n as number) < 0 ||
        (n as number) > 6
      )
        throw Error("Invalid step");
      steps[id] = n as number;
    }
  }
  const reviews: Record<string, ReviewItem> = {};
  if (p.reviews !== undefined) {
    if (!plain(p.reviews)) throw Error("Invalid reviews");
    for (const [id, r] of Object.entries(p.reviews) as [string, any][]) {
      if (
        !reviewIds.includes(id) ||
        !plain(r) ||
        !finite(r.due) ||
        r.due < 0 ||
        !finite(r.interval) ||
        r.interval < 0 ||
        r.interval > 30 ||
        !Number.isInteger(r.correct) ||
        r.correct < 0
      )
        throw Error("Invalid review");
      reviews[id] = { due: r.due, interval: r.interval, correct: r.correct };
    }
  }
  const settings = p.settings ?? initial.settings;
  if (
    !plain(settings) ||
    ![1, 1.15, 1.3].includes(settings.textSize) ||
    typeof settings.sound !== "boolean" ||
    (settings.theme !== undefined && !THEMES.includes(settings.theme)) ||
    (settings.celebrate !== undefined && typeof settings.celebrate !== "boolean")
  )
    throw Error("Invalid settings");
  const daily: Record<string, string[]> = {};
  if (p.daily !== undefined) {
    if (!plain(p.daily)) throw Error("Invalid daily activity");
    for (const [day, list] of Object.entries(p.daily)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) throw Error("Invalid day");
      daily[day] = ids(list, [
        "lesson",
        "speak",
        "check",
        ...words.map((w) => w.id),
      ]);
    }
  }
  const path: PathId = p.path ?? "beginner";
  if (!PATHS.includes(path)) throw Error("Invalid path");
  let placement: Placement | undefined;
  if (p.placement !== undefined) {
    const x = p.placement;
    if (
      !plain(x) ||
      !PATHS.includes(x.path) ||
      !unitIds.includes(x.unit) ||
      (x.foundation !== undefined && ![0, 1, 2, 3].includes(x.foundation)) ||
      !Number.isInteger(x.score) ||
      !Number.isInteger(x.total) ||
      x.score < 0 ||
      x.total < 1 ||
      x.score > x.total ||
      ![0, 1, 2, 3].includes(x.speak) ||
      !finite(x.at) ||
      x.at < 0
    )
      throw Error("Invalid placement");
    placement = {
      path: x.path,
      unit: x.unit,
      score: x.score,
      total: x.total,
      speak: x.speak,
      at: x.at,
      ...(x.foundation !== undefined ? { foundation: x.foundation } : {}),
    };
  }
  const profile = p.profile === undefined ? undefined : normalizeProfile(p.profile);
  if (p.profile !== undefined && !profile) throw Error("Invalid profile");
  if (p.reminder !== undefined && !isReminder(p.reminder))
    throw Error("Invalid reminder");
  const speaking: Record<string, SpeakingPractice> = {};
  if (p.speaking !== undefined) {
    if (!plain(p.speaking)) throw Error("Invalid speaking practice");
    for (const [id, v] of Object.entries(p.speaking) as [string, any][]) {
      if (
        ![...lessonIds, ...rolePlayIds, ...talkIds].includes(id) ||
        !plain(v) ||
        !Number.isInteger(v.task) ||
        !Number.isInteger(v.role) ||
        v.task < 0 ||
        v.role < 0 ||
        v.task > 100000 ||
        v.role > 100000
      )
        throw Error("Invalid speaking practice");
      speaking[id] = { task: v.task, role: v.role };
    }
  }
  const confidence: Record<string, 1 | 2 | 3> = {};
  if (p.confidence !== undefined) {
    if (!plain(p.confidence)) throw Error("Invalid confidence");
    for (const [id, v] of Object.entries(p.confidence)) {
      if (
        ![...lessonIds, ...rolePlayIds, ...talkIds].includes(id) ||
        ![1, 2, 3].includes(v as number)
      )
        throw Error("Invalid confidence");
      confidence[id] = v as 1 | 2 | 3;
    }
  }
  const checkpoints: Record<string, CheckpointResult> = {};
  if (p.checkpoints !== undefined) {
    if (!plain(p.checkpoints)) throw Error("Invalid checkpoints");
    for (const [id, v] of Object.entries(p.checkpoints) as [string, any][]) {
      if (
        !unitIds.includes(id) ||
        !plain(v) ||
        !Number.isInteger(v.correct) ||
        !Number.isInteger(v.total) ||
        v.correct < 0 ||
        v.total < 1 ||
        v.correct > v.total ||
        !finite(v.at) ||
        v.at < 0
      )
        throw Error("Invalid checkpoint");
      checkpoints[id] = { correct: v.correct, total: v.total, at: v.at };
    }
  }
  const dailyPlans: Record<string, DailyPlan> = {};
  if (p.dailyPlans !== undefined) {
    if (!plain(p.dailyPlans)) throw Error("Invalid daily plans");
    const entries = Object.entries(p.dailyPlans) as [string, any][];
    if (entries.length > MAX_STORED_PLANS) throw Error("Invalid daily plans");
    const only = (v: any, allowed: string[], n?: number) =>
      Array.isArray(v) &&
      (n === undefined || v.length === n) &&
      v.every((x) => allowed.includes(x));
    for (const [day, x] of entries) {
      if (
        !isDate(day) ||
        !plain(x) ||
        x.date !== day ||
        !PATHS.includes(x.path) ||
        !only(x.words, words.map((w) => w.id), 5) ||
        !drillCards.some((c) => c.id === x.sentence) ||
        !lessonIds.includes(x.conversation) ||
        !tipIds.includes(x.tip) ||
        !soundById(x.sound) ||
        ![...talks, ...rolePlays].some((c) => c.id === x.speaking) ||
        !only(x.quiz, quizIds)
      )
        throw Error("Invalid daily plan");
      dailyPlans[day] = {
        date: day,
        path: x.path,
        words: [...x.words],
        sentence: x.sentence,
        conversation: x.conversation,
        tip: x.tip,
        sound: x.sound,
        speaking: x.speaking,
        quiz: [...x.quiz],
      };
    }
  }
  const dailyDone: Record<string, string[]> = {};
  if (p.dailyDone !== undefined) {
    if (!plain(p.dailyDone)) throw Error("Invalid daily completion");
    for (const [day, list] of Object.entries(p.dailyDone)) {
      if (!isDate(day)) throw Error("Invalid day");
      dailyDone[day] = ids(list, [...DAILY_TASKS]);
    }
  }
  if (p.clock !== undefined && (typeof p.clock !== "string" || !isDate(p.clock)))
    throw Error("Invalid clock");
  const history = p.history ?? [];
  if (
    !Array.isArray(history) ||
    history.length > 100 ||
    !history.every(
      (h: any) =>
        plain(h) &&
        finite(h.score) &&
        h.score >= 0 &&
        h.score <= 100 &&
        finite(h.at) &&
        h.at >= 0,
    )
  )
    throw Error("Invalid quiz history");
  return {
    history: history.map((h: any) => ({ score: h.score, at: h.at })),
    version: 2,
    completed,
    saved,
    dates: [...new Set(p.dates)] as string[],
    bestScore: p.bestScore,
    attempts: p.attempts,
    lastLesson: p.lastLesson,
    steps,
    reviews,
    mastered: ids(p.mastered ?? [], reviewIds),
    ...(p.assisted ? { assisted: ids(p.assisted, reviewIds) } : {}),
    settings: {
      textSize: settings.textSize,
      sound: settings.sound,
      ...(settings.theme ? { theme: settings.theme } : {}),
      ...(typeof settings.celebrate === "boolean"
        ? { celebrate: settings.celebrate }
        : {}),
    },
    daily,
    path,
    ...(placement ? { placement } : {}),
    speaking,
    confidence,
    checkpoints,
    dailyPlans,
    dailyDone,
    ...(p.clock ? { clock: p.clock } : {}),
    ...(profile ? { profile } : {}),
    ...(p.reminder
      ? {
          reminder: {
            enabled: p.reminder.enabled,
            hour: p.reminder.hour,
            minute: p.reminder.minute,
          },
        }
      : {}),
  };
}
// Wrong: retry after 10 minutes. Correct: 1, 3, 7, 14, then 30 days.
export function scheduleReview(
  previous: ReviewItem | undefined,
  correct: boolean,
  now = Date.now(),
): ReviewItem {
  const count = correct ? (previous?.correct ?? 0) + 1 : 0;
  const interval = correct ? [1, 3, 7, 14, 30][Math.min(count - 1, 4)] : 0;
  return {
    correct: count,
    interval,
    due: now + (correct ? interval * 86400000 : 600000),
  };
}
