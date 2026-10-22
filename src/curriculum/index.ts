// Curriculum registry: paths, units, lesson kits, exercises, role-plays and
// review-item lookup. Pure data and lookups: no React, no storage.
import { lessons, type Lesson } from "../data/course";
import { exercises as legacyExercises, buildAnswers } from "../data/journey";
import { unitFiles } from "./registry";
import { talks } from "./talks";
import { reviewedExplanations } from "./reviewed";
import type { Enrich, Ex, PathId, RolePlay, Unit } from "./types";

export type { Enrich, Ex, PathId, RolePlay, Unit } from "./types";
export { talks };

const legacy = (lesson: string): Ex[] =>
  legacyExercises
    .filter((e) => e.lesson === lesson)
    .map((e) => ({
      id: e.id,
      lesson: e.lesson,
      kind: e.kind,
      skill:
        e.kind === "build"
          ? "build"
          : e.id.endsWith("-gap")
            ? "gap"
            : e.id.endsWith("-en")
              ? "en-mr"
              : "mr-en",
      prompt: e.prompt,
      options: e.options,
      answer: e.answer,
      accept: e.kind === "build" ? [buildAnswers[e.id]] : [],
      explanation: e.explanation,
    }));

export const kits: Record<string, Enrich> = {};
for (const f of unitFiles)
  for (const [id, k] of Object.entries(f.kits))
    kits[id] = k.ex.length ? k : { ...k, ex: legacy(id) };

const byId = new Map(lessons.map((l) => [l.id, l]));
export const lessonById = (id: string): Lesson | undefined => byId.get(id);

// Reading foundations are optional and live outside both paths.
const authored: Unit[] = unitFiles.map((f) => f.unit);
const placed = new Set(authored.flatMap((u) => u.lessons));
const leftover = lessons.filter((l) => !placed.has(l.id)).map((l) => l.id);
export const units: Unit[] = leftover.length
  ? [
      ...authored,
      {
        id: "x1",
        path: "intermediate",
        optional: true,
        title: "अधिक विषय",
        en: "More topics to explore",
        outcome: [
          "I can explore extra grammar and vocabulary topics at my own pace.",
          "मी अतिरिक्त व्याकरण आणि शब्दसंग्रहाचे विषय माझ्या गतीने शिकू शकतो/शकते.",
        ],
        lessons: leftover,
      },
    ]
  : authored;

export const pathUnits = (path: PathId) => units.filter((u) => u.path === path);
export const readingUnit = units.find((u) => u.path === "reading");
export const unitOf = (lessonId: string) =>
  units.find((u) => u.lessons.includes(lessonId));
export const unitById = (id: string) => units.find((u) => u.id === id);
export const unitLessons = (u: Unit) =>
  u.lessons.map((id) => byId.get(id)!).filter(Boolean);
// Learning order across the whole course: reading, beginner, intermediate.
export const orderedLessons: Lesson[] = units.flatMap(unitLessons);
export const pathLessons = (path: PathId) =>
  pathUnits(path).flatMap((u) => unitLessons(u));
export const isEnriched = (id: string) => !!kits[id];

export const rolePlays: RolePlay[] = Object.values(kits).map((k) => k.rp);
export const rolePlayById = (id: string) => rolePlays.find((r) => r.id === id);

// Reviewed explanations (./reviewed.ts) replace the authored ones by ID.
for (const e of [
  ...Object.values(kits).flatMap((k) => k.ex),
  ...units.flatMap((u) => u.checkpoint?.ex ?? []),
]) {
  const reviewed = reviewedExplanations[e.id];
  if (reviewed) e.explanation = reviewed;
}

export const checkpointExercises: Ex[] = units.flatMap(
  (u) => u.checkpoint?.ex ?? [],
);
export const allExercises: Ex[] = [
  ...Object.values(kits).flatMap((k) => k.ex),
  ...checkpointExercises,
];
const exById = new Map(allExercises.map((e) => [e.id, e]));
export const exerciseById = (id: string) => exById.get(id);

// Useful expressions: any line of a lesson conversation can be revised.
export const expressionId = (lesson: string, index: number) =>
  `exp-${lesson}-${index}`;
export const expressions = Object.entries(kits).flatMap(([lesson, k]) =>
  k.conv.map((line, i) => ({
    id: expressionId(lesson, i),
    lesson,
    en: line.en,
    mr: line.mr,
  })),
);
const exprById = new Map(expressions.map((e) => [e.id, e]));
export const expressionById = (id: string) => exprById.get(id);

export const talkIds = talks.map((t) => t.id);
export const rolePlayIds = rolePlays.map((r) => r.id);
export const unitIds = units.map((u) => u.id);

// Resume the lesson the learner left, else the first unfinished lesson of the path.
export function nextLessonFor(
  path: PathId,
  completed: string[],
  last?: string,
) {
  const list = pathLessons(path);
  const resume = list.find((l) => l.id === last && !completed.includes(l.id));
  return resume ?? list.find((l) => !completed.includes(l.id));
}

// Role-play progression: moves one turn, finishing after the last one.
export function advanceTurn(step: number, total: number) {
  return step + 1 >= total
    ? { step, finished: true as const }
    : { step: step + 1, finished: false as const };
}
