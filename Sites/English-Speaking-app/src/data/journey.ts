import { lessons } from "./course";
// Legacy first-unit exercises. Their IDs are stored in learner progress, so
// they are preserved and adapted into the curriculum by curriculum/index.ts.
export type Exercise = {
  id: string;
  lesson: string;
  kind: "build" | "choice";
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};
export const duration = (id: string) => {
  const l = lessons.find((x) => x.id === id)!;
  return Math.max(
    3,
    Math.ceil(
      (l.rule.length +
        l.examples.reduce((n, e) => n + e.en.length + e.mr.length, 0)) /
        200,
    ) + 2,
  );
};
export const exercises: Exercise[] = [
  {
    id: "intro-build",
    lesson: "intro",
    kind: "build",
    prompt: "मी विद्यार्थी आहे. · शब्द योग्य क्रमाने लावा.",
    options: ["student.", "a", "I", "am"],
    answer: 0,
    explanation:
      "I am a student. स्वतःबद्दल सांगताना I नंतर am येते. student च्या आधी a वापरा.",
  },
  {
    id: "intro-gap",
    lesson: "intro",
    kind: "choice",
    prompt: "I ___ a student.",
    options: ["is", "am", "are"],
    answer: 1,
    explanation:
      "I सोबत नेहमी am वापरतो. म्हणून I am a student. हे योग्य वाक्य आहे.",
  },
  {
    id: "intro-en",
    lesson: "intro",
    kind: "choice",
    prompt: "“My name is Asha.” याचा अर्थ काय?",
    options: ["माझे नाव आशा आहे.", "मी घरी आहे.", "तू तयार आहेस."],
    answer: 0,
    explanation:
      "My name is म्हणजे माझे नाव … आहे. नाव सांगण्यासाठी हे वाक्य वापरा.",
  },
  {
    id: "intro-mr",
    lesson: "intro",
    kind: "choice",
    prompt: "“मी पुण्याची/पुण्याचा आहे.” इंग्रजीत निवडा.",
    options: ["I am at home.", "I am from Pune.", "My name is Pune."],
    answer: 1,
    explanation: "आपण कुठले आहोत हे सांगताना from वापरा: I am from Pune.",
  },
  {
    id: "be-build",
    lesson: "be",
    kind: "build",
    prompt: "आम्ही घरी आहोत. · शब्द योग्य क्रमाने लावा.",
    options: ["home.", "are", "We", "at"],
    answer: 0,
    explanation: "We are at home. We सोबत are वापरतो; at home म्हणजे घरी.",
  },
  {
    id: "be-gap",
    lesson: "be",
    kind: "choice",
    prompt: "She ___ happy.",
    options: ["am", "are", "is"],
    answer: 2,
    explanation:
      "She, he आणि it सोबत is वापरा. She is happy. म्हणजे ती आनंदी आहे.",
  },
  {
    id: "be-en",
    lesson: "be",
    kind: "choice",
    prompt: "“I am ready.” याचा अर्थ काय?",
    options: ["मी तयार आहे.", "ती आनंदी आहे.", "आम्ही घरी आहोत."],
    answer: 0,
    explanation:
      "I म्हणजे मी आणि ready म्हणजे तयार. I am ready. म्हणजे मी तयार आहे.",
  },
  {
    id: "be-mr",
    lesson: "be",
    kind: "choice",
    prompt: "“तुम्ही व्यस्त आहात का?” इंग्रजीत निवडा.",
    options: ["You is busy.", "Am you busy?", "Are you busy?"],
    answer: 2,
    explanation:
      "You सोबत are वापरा. प्रश्न विचारताना are सुरुवातीला येते: Are you busy?",
  },
];
export const buildAnswers: Record<string, string> = {
  "intro-build": "I am a student.",
  "be-build": "We are at home.",
};
