import { useEffect, useMemo } from "react";
import { localDate, useProgress } from "../state/progress";
import { buildPlan, effectiveDate, type DailyPlan } from "./engine";

// Today's plan, available on first render (no async step) and then persisted
// once so it stays identical after restarts and mastery changes.
export function useDaily() {
  const { progress, savePlan, markDaily } = useProgress();
  const date = effectiveDate(localDate(), progress.clock);
  const stored = progress.dailyPlans[date];
  const usable = stored && stored.path === progress.path ? stored : undefined;
  const plan: DailyPlan = useMemo(
    () =>
      usable ??
      buildPlan({
        date,
        path: progress.path,
        mastered: progress.mastered,
        completed: progress.completed,
        lastLesson: progress.lastLesson,
        goal: progress.profile?.goal,
        history: Object.values(progress.dailyPlans),
      }),
    // Rebuild only when the day or path changes or nothing is stored yet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, progress.path, usable],
  );
  useEffect(() => {
    if (!usable) savePlan(plan);
  }, [usable, plan, savePlan]);
  const previous = Object.values(progress.dailyPlans)
    .filter((p) => p.date < date)
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  const done = progress.dailyDone[date] ?? [];
  return { plan, previous, done, mark: (task: string) => markDaily(date, task) };
}
