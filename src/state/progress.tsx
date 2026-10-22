import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  initial,
  validateProgress,
  scheduleReview,
  Progress,
  Placement,
} from "./model";
import type { PathId } from "../curriculum/types";
import type { Profile } from "./onboarding";
import type { Reminder } from "./reminders";
import {
  dateKey,
  effectiveDate,
  mergePlan,
  prunePlans,
  type DailyPlan,
} from "../daily/engine";
// Never rename: existing installs keep their progress under this key (the app
// was called English Saathi when it was introduced).
const KEY = "english-saathi.progress.v1";
export const localDate = () => dateKey();
// The day used for daily plans and their completion (see effectiveDate).
const planDay = (clock?: string) => effectiveDate(localDate(), clock);
export function streakFor(dates: string[]) {
  const cursor = new Date();
  let count = 0;
  if (!dates.includes(localDate())) cursor.setDate(cursor.getDate() - 1);
  while (
    dates.includes(
      `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`,
    )
  ) {
    count++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}
type Context = {
  progress: Progress;
  ready: boolean;
  error: string;
  complete: (id: string) => void;
  toggleSave: (id: string) => void;
  recordQuiz: (score: number) => void;
  step: (id: string, n: number) => void;
  // `assisted`: the transcript was shown before answering (listening only).
  review: (id: string, correct: boolean, assisted?: boolean) => void;
  activity: (id: string) => void;
  settings: (patch: Partial<Progress["settings"]>) => void;
  importProgress: (raw: string) => void;
  reset: () => void;
  setPath: (path: PathId) => void;
  savePlacement: (placement: Placement) => void;
  markSpeaking: (id: string, kind: "task" | "role") => void;
  setConfidence: (id: string, value: 1 | 2 | 3) => void;
  saveCheckpoint: (unit: string, correct: number, total: number) => void;
  savePlan: (plan: DailyPlan) => void;
  setClock: (date: string) => void;
  saveProfile: (profile: Profile) => void;
  saveReminder: (reminder: Reminder) => void;
  markDaily: (date: string, task: string) => void;
};
const ProgressContext = createContext<Context | null>(null);
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(initial);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const writes = useRef(Promise.resolve());
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (!active || !raw) return;
        setProgress(validateProgress(JSON.parse(raw)));
      })
      .catch(() => {
        if (active)
          setError(
            "Saved progress could not be loaded. या सत्रात तुम्ही शिकणे सुरू ठेवू शकता.",
          );
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (!ready || error) return;
    const snapshot = JSON.stringify(progress);
    writes.current = writes.current
      .then(() => AsyncStorage.setItem(KEY, snapshot))
      .catch(() => setError("Progress could not be saved on this device."));
  }, [progress, ready, error]);
  const activeDates = (dates: string[]) =>
    Array.from(new Set([...dates, localDate()]));
  return (
    <ProgressContext.Provider
      value={{
        step: (id, n) =>
          setProgress((p) => ({
            ...p,
            lastLesson: id,
            steps: { ...p.steps, [id]: n },
          })),
        review: (id, correct, assisted = false) =>
          setProgress((p) => ({
            ...p,
            assisted: assisted
              ? Array.from(new Set([...(p.assisted ?? []), id]))
              : (p.assisted ?? []).filter((x) => x !== id),
            dates: activeDates(p.dates),
            reviews: {
              ...p.reviews,
              [id]: scheduleReview(p.reviews[id], correct),
            },
            mastered: correct
              ? Array.from(new Set([...p.mastered, id]))
              : p.mastered.filter((x) => x !== id),
          })),
        activity: (id) =>
          setProgress((p) => ({
            ...p,
            dates: activeDates(p.dates),
            daily: {
              ...p.daily,
              [planDay(p.clock)]: Array.from(
                new Set([...(p.daily[planDay(p.clock)] ?? []), id]),
              ),
            },
          })),
        setPath: (path) => setProgress((p) => ({ ...p, path })),
        savePlacement: (placement) =>
          setProgress((p) => ({
            ...p,
            placement,
            dates: activeDates(p.dates),
          })),
        markSpeaking: (id, kind) =>
          setProgress((p) => {
            const cur = p.speaking[id] ?? { task: 0, role: 0 };
            return {
              ...p,
              dates: activeDates(p.dates),
              speaking: {
                ...p.speaking,
                [id]: { ...cur, [kind]: cur[kind] + 1 },
              },
              daily: {
                ...p.daily,
                [planDay(p.clock)]: Array.from(
                  new Set([...(p.daily[planDay(p.clock)] ?? []), "speak"]),
                ),
              },
            };
          }),
        setConfidence: (id, value) =>
          setProgress((p) => ({
            ...p,
            confidence: { ...p.confidence, [id]: value },
          })),
        saveCheckpoint: (unit, correct, total) =>
          setProgress((p) => ({
            ...p,
            dates: activeDates(p.dates),
            checkpoints: {
              ...p.checkpoints,
              [unit]: { correct, total, at: Date.now() },
            },
          })),
        // Stores a day's plan once. An existing plan is kept when the path is
        // unchanged or when anything has been done that day; it is replaced only
        // by a different-path plan on a day with no activity yet.
        savePlan: (plan) =>
          setProgress((p) => {
            const plans = mergePlan(p.dailyPlans, p.dailyDone, p.daily, plan);
            return plans === p.dailyPlans ? p : { ...p, dailyPlans: plans };
          }),
        // Records the day the app treats as today (see effectiveDate).
        setClock: (date) =>
          setProgress((p) => (p.clock === date ? p : { ...p, clock: date })),
        saveProfile: (profile) => setProgress((p) => ({ ...p, profile })),
        saveReminder: (reminder) => setProgress((p) => ({ ...p, reminder })),
        markDaily: (date, task) =>
          setProgress((p) => {
            const list = p.dailyDone[date] ?? [];
            if (list.includes(task)) return p;
            return {
              ...p,
              dates: activeDates(p.dates),
              dailyDone: { ...p.dailyDone, [date]: [...list, task] },
            };
          }),
        settings: (patch) =>
          setProgress((p) => ({ ...p, settings: { ...p.settings, ...patch } })),
        importProgress: (raw) => {
          if (raw.length > 1000000) throw Error("Backup too large");
          const next = validateProgress(JSON.parse(raw));
          setError("");
          setProgress(next);
        },
        reset: () => {
          setError("");
          setProgress({ ...initial });
        },
        progress,
        ready,
        error,
        complete: (id) =>
          setProgress((p) => ({
            ...p,
            completed: Array.from(new Set([...p.completed, id])),
            dates: activeDates(p.dates),
            lastLesson: id,
          })),
        toggleSave: (id) =>
          setProgress((p) => ({
            ...p,
            saved: p.saved.includes(id)
              ? p.saved.filter((x) => x !== id)
              : [...p.saved, id],
          })),
        recordQuiz: (score) =>
          setProgress((p) => ({
            ...p,
            history: [...p.history, { score, at: Date.now() }].slice(-100),
            bestScore: Math.max(p.bestScore, score),
            attempts: p.attempts + 1,
            dates: activeDates(p.dates),
          })),
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("ProgressProvider required");
  return value;
}
