// Learner profile chosen during onboarding. Pure data and rules: no React.
import type { PathId } from "../curriculum/types";

export const GOALS = [
  "daily",
  "speaking",
  "work",
  "school",
  "travel",
  "interview",
] as const;
export type Goal = (typeof GOALS)[number];
export const MINUTES = [10, 15, 20, 30] as const;
export type Profile = {
  onboarded: true;
  goal: Goal;
  minutes: (typeof MINUTES)[number];
  at: number;
};

export const goalInfo: Record<Goal, { mr: string; en: string; sub: string }> = {
  daily: { mr: "रोजचे इंग्रजी", en: "Daily English", sub: "घर, बाजार आणि गप्पा" },
  speaking: { mr: "बोलायला शिकणे", en: "Speaking", sub: "आत्मविश्वासाने बोलणे" },
  work: { mr: "कामासाठी", en: "Work", sub: "ऑफिस, बैठका आणि फोन" },
  school: { mr: "शाळा / अभ्यास", en: "School", sub: "वर्ग आणि परीक्षेची तयारी" },
  travel: { mr: "प्रवास", en: "Travel", sub: "प्रवास, हॉटेल आणि दिशा" },
  interview: { mr: "मुलाखत", en: "Interviews", sub: "नोकरीची मुलाखत" },
};

// Phrasebook situations (see data/speaking.ts) each goal leans towards.
export const goalSituations: Record<Goal, string[]> = {
  daily: ["shop", "food", "health", "meet"],
  speaking: ["meet", "help", "phone"],
  work: ["work", "phone"],
  school: ["help", "meet"],
  travel: ["travel", "food"],
  interview: ["work", "meet"],
};

export const recommendedMinutes = (path: PathId): Profile["minutes"] =>
  path === "foundation" ? 10 : 15;

// First-run onboarding is for new learners only: anyone with existing
// progress keeps the app exactly as it was.
export function needsOnboarding(p: {
  profile?: unknown;
  completed: string[];
  dates: string[];
  attempts: number;
  placement?: unknown;
}) {
  return (
    !p.profile &&
    !p.placement &&
    p.completed.length === 0 &&
    p.dates.length === 0 &&
    p.attempts === 0
  );
}

export const isProfile = (v: any): v is Profile =>
  !!v &&
  typeof v === "object" &&
  v.onboarded === true &&
  (GOALS as readonly string[]).includes(v.goal) &&
  (MINUTES as readonly number[]).includes(v.minutes) &&
  Number.isFinite(v.at) &&
  v.at >= 0;
