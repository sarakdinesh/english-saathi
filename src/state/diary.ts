// Voice diary and progress sharing: pure rules, no React or native modules.
// Diary recordings are files named "<YYYY-MM-DD>.<ext>" in one folder; the
// folder listing is the diary, so nothing is added to stored progress or
// backups (recordings stay on this phone).
import { BRAND } from "../brand";
import { daysBetween } from "./encourage";

export type DiaryEntry = { date: string; name: string };

// The same prompt every time, so first and latest recordings compare fairly.
export const DIARY_PROMPT = {
  en: "Introduce yourself: your name, where you live, what you do, and why you are learning English.",
  mr: "स्वतःची ओळख करून द्या: नाव, कुठे राहता, काय करता आणि इंग्रजी का शिकत आहात.",
};

// Suggested recording days, counting the first recording as day 1.
export const MILESTONES = [1, 7, 30, 90, 180, 365];

export const diaryName = (date: string, sourceUri: string) =>
  `${date}.${/\.(\w+)$/.exec(sourceUri)?.[1] ?? "m4a"}`;

// File names → entries, oldest first. Anything else in the folder is ignored.
export const parseEntries = (names: string[]): DiaryEntry[] =>
  names
    .map((name) => ({ name, m: /^(\d{4}-\d{2}-\d{2})\.\w+$/.exec(name) }))
    .filter((x) => x.m)
    .map((x) => ({ date: x.m![1], name: x.name }))
    .sort((a, b) => a.date.localeCompare(b.date));

export const dayNumber = (first: string, date: string) => daysBetween(first, date) + 1;

// The next suggested recording day (today's, if today is one and not yet
// recorded), or null after the last one.
export function nextMilestone(first: string | undefined, today: string, recordedToday: boolean) {
  if (!first) return 1;
  const now = dayNumber(first, today);
  return MILESTONES.find((d) => (recordedToday ? d > now : d >= now)) ?? null;
}

export type ShareStats = {
  days: number;
  streak: number;
  lessons: number;
  spokeDays: number;
  diary: number;
};

// The weekly recap as a message. Only non-zero lines.
export function weekShareText(
  x: { days: number; words: number; spokeDays: number; lessonDays: number },
  link: string,
) {
  return [
    `माझा या आठवड्याचा इंग्रजी सराव (${BRAND.mr}) 💪`,
    `📅 ७ पैकी ${x.days} दिवस सराव`,
    x.spokeDays > 0 && `🗣️ ${x.spokeDays} दिवस मोठ्याने बोललो/बोलले`,
    x.lessonDays > 0 && `📘 ${x.lessonDays} दिवस धडे`,
    x.words > 0 && `🔤 ${x.words} नवीन शब्द`,
    "",
    `तुम्हीही मराठीतून इंग्रजी शिका: ${link}`,
  ]
    .filter((l) => l !== false)
    .join("\n");
}

// Today's sentence as a family-group message: English, sound guide, meaning.
export function sentenceShareText(x: { en: string; say: string; mr: string }, link: string) {
  return [
    "आजचे इंग्रजी वाक्य ✨",
    x.en,
    `🗣️ ${x.say}`,
    `मराठी: ${x.mr}`,
    "",
    `रोज एक वाक्य शिका: ${link}`,
  ].join("\n");
}

// A short Marathi message for WhatsApp and other apps. Only non-zero lines.
export function shareText(x: ShareStats, link: string) {
  return [
    `मी ${BRAND.mr} (${BRAND.en}) वर इंग्रजी बोलायला शिकत आहे! 🎉`,
    x.days > 0 && `📅 ${x.days} दिवस सराव`,
    x.streak > 1 && `🔥 सलग ${x.streak} दिवस`,
    x.lessons > 0 && `📘 ${x.lessons} धडे पूर्ण`,
    x.spokeDays > 0 && `🗣️ ${x.spokeDays} दिवस मोठ्याने इंग्रजी बोललो/बोलले`,
    x.diary > 1 && `🎙️ आवाज डायरीत ${x.diary} रेकॉर्डिंग — पहिल्या दिवसापेक्षा फरक ऐकू येतो!`,
    "",
    `तुम्हीही मराठीतून इंग्रजी शिका: ${link}`,
  ]
    .filter((l) => l !== false)
    .join("\n");
}
