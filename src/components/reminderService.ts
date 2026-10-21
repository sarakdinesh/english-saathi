// Bridge to expo-notifications. Loaded lazily and only on iOS/Android; the web
// build has no local scheduling, so every call there is a safe no-op.
import { Platform } from "react-native";
import { planReminders, type Reminder } from "../state/reminders";

export const remindersSupported = Platform.OS === "android" || Platform.OS === "ios";
const CHANNEL = "daily-reminder";
const ID_PREFIX = "daily-";

async function load() {
  return await import("expo-notifications");
}

// Current permission without prompting: "granted", "denied" or "unsupported".
export async function getPermission(): Promise<PermissionResult> {
  if (!remindersSupported) return "unsupported";
  const N = await load();
  return (await N.getPermissionsAsync()).granted ? "granted" : "denied";
}

// Fires one notification a few seconds from now so the learner can check that
// notifications work on this phone, without waiting for the scheduled time.
export async function sendTestNotification(seconds = 5): Promise<boolean> {
  if (!remindersSupported || (await getPermission()) !== "granted") return false;
  const N = await load();
  if (Platform.OS === "android")
    await N.setNotificationChannelAsync(CHANNEL, {
      name: "दैनिक आठवण",
      importance: N.AndroidImportance.DEFAULT,
    });
  await N.scheduleNotificationAsync({
    content: {
      title: "इंग्रजी साथी",
      body: "ही चाचणी सूचना आहे. तुमच्या फोनवर आठवणी नीट येतील.",
    },
    trigger: {
      type: N.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: CHANNEL,
    },
  });
  return true;
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
  // Cancel only the daily reminders, never an in-flight test notification.
  for (const n of await N.getAllScheduledNotificationsAsync())
    if (n.identifier.startsWith(ID_PREFIX))
      await N.cancelScheduledNotificationAsync(n.identifier);
  if (!reminder?.enabled) return;
  if (!(await N.getPermissionsAsync()).granted) return;
  if (Platform.OS === "android")
    await N.setNotificationChannelAsync(CHANNEL, {
      name: "दैनिक आठवण",
      importance: N.AndroidImportance.DEFAULT,
    });
  for (const r of planReminders(new Date(), reminder, studiedToday, minutes))
    await N.scheduleNotificationAsync({
      identifier: `${ID_PREFIX}${r.at.getTime()}`,
      content: { title: r.title, body: r.body },
      trigger: {
        type: N.SchedulableTriggerInputTypes.DATE,
        date: r.at,
        channelId: CHANNEL,
      },
    });
}
