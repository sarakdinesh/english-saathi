// Per-skill progress derived from answers the learner has actually given.
// Pure: no React, no storage. Nothing here is a proficiency measurement; it
// only summarises which kinds of practice questions are currently answered
// correctly, and says "not enough data" rather than guessing.
import type { Ex } from "../curriculum/types";

export const SKILL_AREAS = [
  "reading",
  "writing",
  "listening",
  "speaking",
  "grammar",
  "vocabulary",
] as const;
export type SkillArea = (typeof SKILL_AREAS)[number];

// Which exercise types count towards which area. Writing is sentence building
// (arranging words); free writing is not assessed. Speaking is only the
// choose-the-reply questions; spoken practice is self-reported and not scored.
export const skillOfExercise: Record<Ex["skill"], SkillArea> = {
  understand: "reading",
  build: "writing",
  listen: "listening",
  response: "speaking",
  gap: "grammar",
  "en-mr": "vocabulary",
  "mr-en": "vocabulary",
};

export const skillInfo: Record<SkillArea, { mr: string; en: string; note: string }> = {
  reading: {
    mr: "वाचन",
    en: "Reading",
    note: "छोटे मजकूर आणि प्रसंग समजून घेण्याचे प्रश्न",
  },
  writing: {
    mr: "लेखन",
    en: "Writing",
    note: "वाक्य रचण्याचा सराव; मुक्त लेखन तपासले जात नाही",
  },
  listening: {
    mr: "श्रवण",
    en: "Listening",
    note: "ऐकून उत्तर निवडण्याचे प्रश्न",
  },
  speaking: {
    mr: "संवाद / बोलणे",
    en: "Speaking",
    note: "योग्य उत्तर निवडण्याचे प्रश्न. प्रत्यक्ष बोलण्याचा सराव स्वतः नोंदवला जातो, तपासला जात नाही",
  },
  grammar: {
    mr: "व्याकरण",
    en: "Grammar",
    note: "रिकाम्या जागा भरण्याचे प्रश्न",
  },
  vocabulary: {
    mr: "शब्दसंग्रह",
    en: "Vocabulary",
    note: "इंग्रजी-मराठी अर्थाचे प्रश्न",
  },
};

export const MIN_ATTEMPTS = 5;
export const STRONG_AT = 0.8;
export const WEAK_BELOW = 0.6;
export type Level = "strong" | "ok" | "weak" | "unknown";

export type SkillStat = {
  skill: SkillArea;
  total: number; // questions available
  attempted: number; // answered at least once
  correct: number; // currently answered correctly (last answer)
  pct: number; // correct / attempted, 0 when nothing attempted
  level: Level;
};

type Answers = { reviews: Record<string, unknown>; mastered: string[] };

export const levelOf = (attempted: number, correct: number): Level =>
  attempted < MIN_ATTEMPTS
    ? "unknown"
    : correct / attempted >= STRONG_AT
      ? "strong"
      : correct / attempted < WEAK_BELOW
        ? "weak"
        : "ok";

export function skillStats(progress: Answers, exercises: Ex[]): SkillStat[] {
  const mastered = new Set(progress.mastered);
  return SKILL_AREAS.map((skill) => {
    const own = exercises.filter((e) => skillOfExercise[e.skill] === skill);
    const answered = own.filter((e) => e.id in progress.reviews);
    const correct = answered.filter((e) => mastered.has(e.id)).length;
    return {
      skill,
      total: own.length,
      attempted: answered.length,
      correct,
      pct: answered.length ? correct / answered.length : 0,
      level: levelOf(answered.length, correct),
    };
  });
}

export function summarize(stats: SkillStat[]) {
  const strengths = stats
    .filter((s) => s.level === "strong")
    .sort((a, b) => b.pct - a.pct);
  const weaknesses = stats
    .filter((s) => s.level === "weak")
    .sort((a, b) => a.pct - b.pct);
  // Suggest the weakest area; with none, the area with the least practice so far.
  const focus =
    weaknesses[0] ??
    [...stats].filter((s) => s.total > 0).sort((a, b) => a.attempted - b.attempted)[0];
  return { strengths, weaknesses, focus };
}

// Self-reported speaking practice (counts, not scores).
export function speakingPractice(
  speaking: Record<string, { task: number; role: number }>,
) {
  return Object.values(speaking).reduce((n, v) => n + v.task + v.role, 0);
}
