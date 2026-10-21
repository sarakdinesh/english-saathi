// Bridge to expo-notifications. Loaded lazily and only on iOS/Android; the web
// build has no local scheduling, so every call there is a safe no-op.
import { Platform } from "react-native";
import { planReminders, type Reminder } from "../state/reminders";

export const remindersSupported = Platform.OS === "android" || Platform.OS === "ios";
const CHANNEL = "daily-reminder";

async function load() {
  return await import("expo-notifications");
}

export type PermissionResult = "granted" | "denied" | "unsupported";

// Asks only when the learner turns reminders on, never at app start.
export async function ensurePermission(): Promise<PermissionResult> {
  if (!remindersSupported) return "unsupported";
  const N = await load();
  const current = await N.getPermissionsAsync();
  if (current.granted) return "granted";
  if (!current.canAskAgain) return "denied";
  const asked = await N.requestPermissionsAsync();
  return asked.granted ? "granted" : "denied";
}

// Replaces every scheduled reminder with the current plan. Safe to call often.
export async function syncReminders(
  reminder: Reminder | undefined,
  minutes: number,
  studiedToday: boolean,
): Promise<void> {
  if (!remindersSupported) return;
  const N = await load();
  await N.cancelAllScheduledNotificationsAsync();
  if (!reminder?.enabled) return;
  if (!(await N.getPermissionsAsync()).granted) return;
  if (Platform.OS === "android")
    await N.setNotificationChannelAsync(CHANNEL, {
      name: "दैनिक आठवण",
      importance: N.AndroidImportance.DEFAULT,
    });
  for (const r of planReminders(new Date(), reminder, studiedToday, minutes))
    await N.scheduleNotificationAsync({
      content: { title: r.title, body: r.body },
      trigger: {
        type: N.SchedulableTriggerInputTypes.DATE,
        date: r.at,
        channelId: CHANNEL,
      },
    });
}
