// Asks for a Play Store rating once: after 7 study days, right after a lesson
// is finished (a happy moment). Play itself decides whether the dialog shows
// and limits how often; the app never asks again after one request.
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";

const KEY = "english-boluya.review-asked";
export const REVIEW_AFTER_DAYS = 7;

export async function askReviewOnce(studyDays: number) {
  if (Platform.OS === "web" || studyDays < REVIEW_AFTER_DAYS) return;
  try {
    if (await AsyncStorage.getItem(KEY)) return;
    if (!(await StoreReview.isAvailableAsync())) return;
    await AsyncStorage.setItem(KEY, String(Date.now()));
    await StoreReview.requestReview();
  } catch {
    // A rating prompt must never get in the learner's way.
  }
}
