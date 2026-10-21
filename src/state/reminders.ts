// Optional daily reminder: pure planning only (no React, no native modules).
// Reminders are local notifications; nothing is sent to or from a server.
export type Reminder = { enabled: boolean; hour: number; minute: number };

export const REMINDER_TIMES: { hour: number; minute: number; label: string }[] = [
  { hour: 7, minute: 0, label: "सकाळी ७:००" },
  { hour: 13, minute: 0, label: "दुपारी १:००" },
  { hour: 18, minute: 0, label: "संध्याकाळी ६:००" },
  { hour: 20, minute: 0, label: "रात्री ८:००" },
  { hour: 21, minute: 30, label: "रात्री ९:३०" },
];

export const defaultReminder: Reminder = { enabled: false, hour: 18, minute: 0 };

export const isReminder = (v: any): v is Reminder =>
  !!v &&
  typeof v === "object" &&
  typeof v.enabled === "boolean" &&
  Number.isInteger(v.hour) &&
  v.hour >= 0 &&
  v.hour <= 23 &&
  Number.isInteger(v.minute) &&
  v.minute >= 0 &&
  v.minute <= 59;

export const reminderTitle = "इंग्रजी साथी";

// Gentle, varied Marathi copy. No streak or guilt wording: a skipped day is fine.
export const reminderBodies = (minutes: number) => [
  `आजचा सराव करायची वेळ झाली. फक्त ${minutes} मिनिटे पुरे!`,
  "आजचे पाच शब्द तुमची वाट पाहत आहेत.",
  "एक वाक्य मोठ्याने बोलूया का? आजचे वाक्य तयार आहे.",
  "थोडे शिका, रोज बोला. आजचा धडा सुरू करा.",
  "आजचा छोटा प्रश्नसराव करून पाहा.",
  "आजचे उच्चार आव्हान ऐका आणि म्हणा.",
  "५ मिनिटेही चालतील! आज एक छोटा धडा पूर्ण करा.",
];

// How many days ahead are scheduled. The schedule is rebuilt every time the app
// opens or returns to the foreground; if the app is not opened for this long,
// reminders simply stop rather than nagging indefinitely. Well under the 64
// pending local notifications iOS allows.
export const REMINDER_DAYS = 14;

export type PlannedReminder = { at: Date; title: string; body: string };

const dayNumber = (d: Date) =>
  Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);

// The next `days` reminders from `now`, in the device's local time. A time that
// has already passed is skipped, and today's reminder is skipped once the
// learner has studied today. Called again on every app open, so the schedule
// always reflects the latest activity.
export function planReminders(
  now: Date,
  reminder: Reminder,
  studiedToday: boolean,
  minutes: number,
  days = REMINDER_DAYS,
): PlannedReminder[] {
  if (!reminder.enabled) return [];
  const bodies = reminderBodies(minutes);
  const out: PlannedReminder[] = [];
  for (let d = 0; d <= days && out.length < days; d++) {
    const at = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + d,
      reminder.hour,
      reminder.minute,
      0,
      0,
    );
    if (at.getTime() <= now.getTime() + 60_000) continue;
    if (d === 0 && studiedToday) continue;
    out.push({
      at,
      title: reminderTitle,
      body: bodies[dayNumber(at) % bodies.length],
    });
  }
  return out;
}
