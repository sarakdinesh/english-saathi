// Goal journeys: a fixed day-by-day plan with a finish line ("Interview-ready
// in 21 days"). Each day points at content the app already has. Pure data and
// rules; the learner's state is stored in progress.journey.
import type { Goal } from "./onboarding";

export type JourneyTask =
  | { kind: "lesson"; id: string }
  | { kind: "nextLesson" }
  | { kind: "interview"; id: string }
  | { kind: "phrasebook"; id: string }
  | { kind: "diary" }
  | { kind: "sounds" }
  | { kind: "drill" }
  | { kind: "mock" };

export type Journey = {
  id: string;
  title: string;
  mr: string;
  sub: string;
  days: JourneyTask[][];
};
export type JourneyState = { id: string; start: string; done: number[] };

// Extra tasks added on given days (1-based).
function build(
  length: number,
  base: (day: number) => JourneyTask[],
  extra: Record<number, JourneyTask[]>,
) {
  return Array.from({ length }, (_, i) => [
    ...base(i + 1),
    ...(extra[i + 1] ?? []),
  ]);
}

const IV = [
  "iv-about",
  "iv-why-job",
  "iv-hire",
  "iv-strengths",
  "iv-weakness",
  "iv-five-years",
  "iv-left",
  "iv-education",
  "iv-company",
  "iv-pressure",
  "iv-team",
  "iv-problem",
  "iv-hobbies",
  "iv-salary",
  "iv-relocate",
  "iv-gap",
  "iv-learn",
  "iv-liked",
  "iv-join",
  "iv-questions",
];

const TRAVEL: JourneyTask[] = [
  { kind: "lesson", id: "places" },
  { kind: "lesson", id: "directions" },
  { kind: "lesson", id: "travel" },
  { kind: "phrasebook", id: "travel" },
  { kind: "lesson", id: "time" },
  { kind: "lesson", id: "restaurant" },
  { kind: "phrasebook", id: "food" },
  { kind: "lesson", id: "would-like" },
  { kind: "lesson", id: "shop" },
  { kind: "lesson", id: "ask-help" },
  { kind: "phrasebook", id: "help" },
  { kind: "lesson", id: "phone" },
  { kind: "lesson", id: "could" },
  { kind: "phrasebook", id: "health" },
];

export const JOURNEYS: Journey[] = [
  {
    id: "interview-21",
    title: "Interview-ready in 21 days",
    mr: "२१ दिवसांत मुलाखतीची तयारी",
    sub: "रोज एक मुलाखतीचा प्रश्न, उपयोगी धडे आणि शेवटी सराव मुलाखत.",
    days: build(
      21,
      (d) =>
        d <= 20 ? [{ kind: "interview", id: IV[d - 1] }] : [{ kind: "mock" }],
      {
        1: [{ kind: "diary" }],
        2: [{ kind: "lesson", id: "interview" }],
        3: [{ kind: "sounds" }],
        4: [{ kind: "lesson", id: "explain-experience" }],
        5: [{ kind: "drill" }],
        6: [{ kind: "lesson", id: "strengths-goals" }],
        7: [{ kind: "diary" }],
        8: [{ kind: "lesson", id: "connectors" }],
        9: [{ kind: "sounds" }],
        10: [{ kind: "lesson", id: "reasons-examples" }],
        12: [{ kind: "drill" }],
        13: [{ kind: "lesson", id: "describe-experience" }],
        15: [{ kind: "sounds" }],
        16: [{ kind: "lesson", id: "work-calls" }],
        18: [{ kind: "drill" }],
        19: [{ kind: "lesson", id: "one-minute-talk" }],
        21: [{ kind: "diary" }],
      },
    ),
  },
  {
    id: "travel-14",
    title: "Travel English in 14 days",
    mr: "१४ दिवसांत प्रवासाचे इंग्रजी",
    sub: "दिशा, प्रवास, हॉटेल, खाणे आणि मदत मागणे.",
    days: build(14, (d) => [TRAVEL[d - 1]], {
      1: [{ kind: "diary" }],
      4: [{ kind: "sounds" }],
      6: [{ kind: "drill" }],
      9: [{ kind: "drill" }],
      11: [{ kind: "sounds" }],
      14: [{ kind: "diary" }],
    }),
  },
  {
    id: "daily-30",
    title: "30 days of speaking",
    mr: "३० दिवस रोज बोलूया",
    sub: "रोज पुढचा धडा आणि एक छोटा बोलण्याचा सराव.",
    days: build(
      30,
      (d) => [
        { kind: "nextLesson" },
        [
          { kind: "drill" },
          { kind: "sounds" },
          { kind: "phrasebook", id: "meet" },
        ][d % 3] as JourneyTask,
      ],
      {
        1: [{ kind: "diary" }],
        7: [{ kind: "diary" }],
        30: [{ kind: "diary" }],
      },
    ),
  },
];

export const journeyById = (id: string) => JOURNEYS.find((j) => j.id === id);

export const journeyForGoal = (goal: Goal | undefined) =>
  goal === "interview" || goal === "work"
    ? "interview-21"
    : goal === "travel"
      ? "travel-14"
      : "daily-30";

// The next day to do (1-based), or null when every day is done.
export function currentDay(state: JourneyState) {
  const j = journeyById(state.id);
  if (!j) return null;
  for (let d = 1; d <= j.days.length; d++)
    if (!state.done.includes(d)) return d;
  return null;
}

// Validates stored or imported journey state; undefined when invalid.
export function normalizeJourney(v: any): JourneyState | undefined {
  const j = v && typeof v === "object" ? journeyById(v.id) : undefined;
  if (!j || typeof v.start !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v.start))
    return undefined;
  if (!Array.isArray(v.done)) return undefined;
  const done = [...new Set(v.done as unknown[])];
  if (
    !done.every(
      (d) =>
        Number.isInteger(d) &&
        (d as number) >= 1 &&
        (d as number) <= j.days.length,
    )
  )
    return undefined;
  return {
    id: j.id,
    start: v.start,
    done: (done as number[]).sort((a, b) => a - b),
  };
}
