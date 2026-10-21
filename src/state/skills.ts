// Practice indicators derived from answers the learner has actually given.
// Pure: no React, no storage. These are NOT proficiency measurements and not
// CEFR levels: they summarise which kinds of practice question are currently
// answered correctly, and say "not enough data" rather than guess.
//
// Scored areas (objectively checked questions only):
//   reading, sentence building, listening, conversational understanding,
//   grammar, vocabulary.
// Speaking is deliberately NOT a scored area: spoken practice, recordings and
// confidence ratings are self-reported and are shown separately.
import type { Ex } from "../curriculum/types";

export const SKILL_AREAS = [
  "reading",
  "sentenceBuilding",
  "listening",
  "conversation",
  "grammar",
  "vocabulary",
] as const;
export type SkillArea = (typeof SKILL_AREAS)[number];

export const skillOfExercise: Record<Ex["skill"], SkillArea> = {
  understand: "reading",
  build: "sentenceBuilding",
  listen: "listening",
  response: "conversation",
  gap: "grammar",
  "en-mr": "vocabulary",
  "mr-en": "vocabulary",
};

export const skillInfo: Record<
  SkillArea,
  { mr: string; en: string; measures: string; notMeasured: string }
> = {
  reading: {
    mr: "वाचन समज",
    en: "Reading comprehension",
    measures: "छोटे मजकूर आणि प्रसंग वाचून अर्थ समजण्याचे प्रश्न.",
    notMeasured: "मोठ्याने वाचणे किंवा वाचनाचा वेग मोजला जात नाही.",
  },
  sentenceBuilding: {
    mr: "वाक्यरचना",
    en: "Sentence building",
    measures: "शब्द योग्य क्रमाने लावून वाक्य बनवण्याचे प्रश्न.",
    notMeasured: "स्वतः लिहिलेले लेखन, स्पेलिंग आणि विरामचिन्हे तपासली जात नाहीत.",
  },
  listening: {
    mr: "श्रवण",
    en: "Listening",
    measures:
      "ऐकूनच उत्तर निवडण्याचे प्रश्न. मजकूर (transcript) पाहून सोडवलेले प्रश्न येथे मोजले जात नाहीत.",
    notMeasured: "वेगवेगळ्या उच्चारांतील किंवा नैसर्गिक वेगातील भाषण समजणे तपासले जात नाही.",
  },
  conversation: {
    mr: "संभाषण समज",
    en: "Conversational understanding",
    measures: "संवादात योग्य उत्तर निवडण्याचे प्रश्न.",
    notMeasured: "प्रत्यक्ष बोलणे किंवा उच्चार तपासले जात नाहीत.",
  },
  grammar: {
    mr: "व्याकरण",
    en: "Grammar",
    measures: "रिकाम्या जागी योग्य शब्द निवडण्याचे प्रश्न.",
    notMeasured: "स्वतः वाक्य तयार करताना होणाऱ्या चुका तपासल्या जात नाहीत.",
  },
  vocabulary: {
    mr: "शब्दसंग्रह",
    en: "Vocabulary",
    measures: "इंग्रजी-मराठी अर्थ ओळखण्याचे प्रश्न.",
    notMeasured: "शब्द स्वतः वापरता येणे तपासले जात नाही. “शिकलो” अशी स्वतः केलेली नोंद येथे धरली जात नाही.",
  },
};

export const MIN_ATTEMPTS = 5;
export const STRONG_AT = 0.8;
export const WEAK_BELOW = 0.6;
export type Level = "strong" | "ok" | "weak" | "unknown";

export type SkillStat = {
  skill: SkillArea;
  total: number; // questions that can count towards this area
  attempted: number; // counted: answered at least once
  correct: number; // currently answered correctly (latest answer)
  excluded: number; // answered but not counted (listening with transcript)
  pct: number; // correct / attempted, 0 when nothing attempted
  level: Level;
};

type Answers = {
  reviews: Record<string, unknown>;
  mastered: string[];
  assisted?: string[];
};

export const levelOf = (attempted: number, correct: number): Level =>
  attempted < MIN_ATTEMPTS
    ? "unknown"
    : correct / attempted >= STRONG_AT
      ? "strong"
      : correct / attempted < WEAK_BELOW
        ? "weak"
        : "ok";

// A listening question counts only if it plays audio and was answered without
// revealing the transcript first.
const countsTowards = (e: Ex, skill: SkillArea, assisted: Set<string>) =>
  skillOfExercise[e.skill] === skill &&
  (skill !== "listening" || (!!e.audio && !assisted.has(e.id)));

export function skillStats(progress: Answers, exercises: Ex[]): SkillStat[] {
  const mastered = new Set(progress.mastered);
  const assisted = new Set(progress.assisted ?? []);
  return SKILL_AREAS.map((skill) => {
    const own = exercises.filter((e) => skillOfExercise[e.skill] === skill);
    const answered = own.filter((e) => e.id in progress.reviews);
    const counted = answered.filter((e) => countsTowards(e, skill, assisted));
    const correct = counted.filter((e) => mastered.has(e.id)).length;
    return {
      skill,
      total: own.length,
      attempted: counted.length,
      correct,
      excluded: answered.length - counted.length,
      pct: counted.length ? correct / counted.length : 0,
      level: levelOf(counted.length, correct),
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

// Self-reported speaking: counts and the learner's own confidence ratings.
// Never combined with, or converted into, the scored indicators above.
export function speakingSelfReport(progress: {
  speaking: Record<string, { task: number; role: number }>;
  confidence: Record<string, 1 | 2 | 3>;
}) {
  const practice = Object.values(progress.speaking).reduce(
    (n, v) => n + v.task + v.role,
    0,
  );
  const ratings = Object.values(progress.confidence);
  return {
    practice,
    rated: ratings.length,
    averageConfidence: ratings.length
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : undefined,
  };
}
