import { useEffect, useMemo, useState } from "react";
import { AppState } from "react-native";
import { localDate, useProgress } from "../state/progress";
import {
  buildPlan,
  dayHasActivity,
  effectiveDate,
  type DailyPlan,
} from "./engine";

// Today's plan, available on first render (no async step) and then persisted
// once so it stays identical after restarts and mastery changes.
export function useDaily() {
  const { progress, savePlan, markDaily, setClock } = useProgress();
  // Re-evaluated whenever the app returns to the foreground, so a day that
  // changed while it was in the background is picked up straight away.
  const [, setTick] = useState(0);
  useEffect(() => {
    const sub = AppState.addEventListener("change", (s) => {
      if (s === "active") setTick((n) => n + 1);
    });
    return () => sub.remove();
  }, []);
  const date = effectiveDate(localDate(), progress.clock);
  const stored = progress.dailyPlans[date];
  const usable =
    stored &&
    (stored.path === progress.path ||
      dayHasActivity(progress.dailyDone, progress.daily, date))
      ? stored
      : undefined;
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
  useEffect(() => {
    if (progress.clock !== date) setClock(date);
  }, [progress.clock, date, setClock]);
  const previous = Object.values(progress.dailyPlans)
    .filter((p) => p.date < date)
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  const done = progress.dailyDone[date] ?? [];
  return { plan, previous, done, mark: (task: string) => markDaily(date, task) };
}
