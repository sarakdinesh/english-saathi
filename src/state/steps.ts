// Small, pure helpers that make the day and the lesson feel like short steps.
// Nothing here is stored: it reads existing progress and lesson shape only.
import type { PathId } from "../curriculum/types";

// Foundation and Beginner learners get a focused Home: one next step, today's
// progress and the streak; everything else waits behind "आणखी पाहा".
export const simpleHome = (path: PathId) =>
  path === "foundation" || path === "beginner";

// Today's three goals, in the order Home lists them.
export function todayGoals(today: string[], learnedWords: number) {
  const goals = [
    {
      key: "lesson",
      label: "एक धडा पूर्ण करा",
      done: today.includes("lesson"),
    },
    {
      key: "words",
      label: `पाच शब्द शिका (${Math.min(learnedWords, 5)}/5)`,
      done: learnedWords >= 5,
    },
    {
      key: "speak",
      label: "एक वाक्य मोठ्याने बोला",
      done: today.includes("speak"),
    },
  ];
  return {
    goals,
    done: goals.filter((g) => g.done).length,
    total: goals.length,
  };
}

// Estimated minutes for a whole lesson: reading time plus about eight minutes
// for a full kit's practice, role-play and recap.
export const lessonMinutes = (readMinutes: number, hasKit: boolean) =>
  readMinutes + (hasKit ? 8 : 0);

// Minutes left when the learner is on `position` (0-based) of `count` stages,
// counting the current stage as still to do. Never shows 0 while a stage is open.
export function minutesLeft(total: number, count: number, position: number) {
  if (count <= 0 || total <= 0) return 0;
  const p = Math.min(Math.max(position, 0), count - 1);
  return Math.max(1, Math.ceil((total * (count - p)) / count));
}

// "टप्पा 2/7" — 1-based, clamped to the lesson's stages.
export function stepLabel(position: number, count: number) {
  const total = Math.max(count, 1);
  return `टप्पा ${Math.min(Math.max(position, 0), total - 1) + 1}/${total}`;
}

// Stage values shown for a lesson. Lessons without a kit or legacy exercises
// skip the two practice stages. Stored progress keeps the stage *value*
// (progress.steps[id]), so positions are always derived from this list.
export const lessonStages = (full: boolean) =>
  full ? [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 5, 6];
export const stagePosition = (stages: number[], value: number | undefined) =>
  Math.max(stages.indexOf(value ?? 0), 0);
