// Warm, no-guilt encouragement: weekly summary, welcome-back message and
// "unit finished" detection. Pure functions over existing progress; nothing
// here is stored.

// Celebrations are on unless the learner switched them off in Settings.
export const celebrationsOn = (settings: { celebrate?: boolean }) =>
  settings.celebrate !== false;

// Date keys are local "YYYY-MM-DD". Noon avoids daylight-saving edges.
const toDate = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};
const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const daysBetween = (from: string, to: string) =>
  Math.round((toDate(to).getTime() - toDate(from).getTime()) / 86400000);

// The last seven days, today included, oldest first.
export function lastWeek(today: string) {
  const base = toDate(today);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() - (6 - i));
    return toKey(d);
  });
}

// "या आठवड्यात 12 शब्द शिकलात · 4 दिवस सराव". Words are the daily words the
// learner marked as learned (activity ids "word-…"), counted once each.
export function weekSummary(
  daily: Record<string, string[]>,
  dates: string[],
  today: string,
) {
  const week = lastWeek(today);
  const words = new Set(
    week.flatMap((d) => (daily[d] ?? []).filter((x) => x.startsWith("word-"))),
  ).size;
  const days = week.filter((d) => dates.includes(d)).length;
  const text =
    words && days
      ? `या आठवड्यात ${words} शब्द शिकलात · ${days} दिवस सराव`
      : words
        ? `या आठवड्यात ${words} शब्द शिकलात`
        : days
          ? `या आठवड्यात ${days} दिवस सराव केलात`
          : "या आठवड्याची सुरुवात आज एका छोट्या टप्प्याने करूया.";
  return { words, days, text };
}

// Days since the last practice before today, or null when the learner
// practised today, yesterday, or never.
export function daysAway(dates: string[], today: string) {
  const past = dates.filter((d) => d < today).sort();
  if (!past.length || dates.includes(today)) return null;
  const gap = daysBetween(past[past.length - 1], today);
  return gap >= 2 ? gap : null;
}

// A kind message after a break of three days or more. Never mentions a lost
// streak or missed days.
export function welcomeBack(dates: string[], today: string) {
  const gap = daysAway(dates, today);
  if (gap === null || gap < 3) return null;
  return gap >= 7
    ? {
        title: "पुन्हा भेटून आनंद झाला! 🙂",
        body: "तुमची सगळी प्रगती जपलेली आहे. जिथे थांबलात तिथूनच, एका छोट्या टप्प्याने सुरू करूया.",
      }
    : {
        title: "पुन्हा स्वागत! 🙂",
        body: "थोडा ब्रेक झाला तरी हरकत नाही. आज ५ मिनिटांचा एक टप्पा पुरेसा आहे.",
      };
}

// True when finishing `id` completes every lesson of its unit.
export function unitJustCompleted(
  unitLessons: string[],
  completed: string[],
  id: string,
) {
  return (
    unitLessons.includes(id) &&
    unitLessons.every((l) => l === id || completed.includes(l))
  );
}
