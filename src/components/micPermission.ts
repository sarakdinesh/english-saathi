// Asks for the microphone once, on first launch, right after the splash.
// Android cannot grant a runtime permission at install time, so this is the
// earliest point. Only asks when the learner has never been asked: a refusal
// is respected (recording and the word check fall back), and the recorder
// still asks again when the learner taps "Record".
import { Platform } from "react-native";
import {
  getRecordingPermissionsAsync,
  requestRecordingPermissionsAsync,
} from "expo-audio";

export async function askMicrophoneOnce() {
  if (Platform.OS === "web") return;
  try {
    const now = await getRecordingPermissionsAsync();
    if (now.granted || now.status !== "undetermined" || !now.canAskAgain) return;
    await requestRecordingPermissionsAsync();
  } catch {
    // Never block the app on a permission prompt.
  }
}
