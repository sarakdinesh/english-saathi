// Reusable curriculum schemas. Every ID here is stable: it is stored in
// learner progress, so renaming one would orphan saved data.
export type PathId = "foundation" | "beginner" | "intermediate";
export type Bi = [en: string, mr: string];

export type Skill =
  "understand" | "gap" | "en-mr" | "mr-en" | "response" | "listen" | "build";

// One objectively checked exercise. `choice` uses options/answer; `build`
// uses option tokens (tap to arrange) and accepts every sentence in `accept`.
export type Ex = {
  id: string;
  lesson: string;
  kind: "choice" | "build";
  skill: Skill;
  prompt: string;
  options: string[];
  answer: number;
  accept: string[];
  audio?: string;
  explanation: string;
};

export type ConvLine = { who: "A" | "B"; en: string; mr: string };

// "you" turns: `mr` is the goal shown in Marathi, `en` the sample answer.
export type RpTurn = {
  who: "other" | "you";
  en: string;
  mr: string;
  hint?: string;
};

export type RolePlay = {
  id: string;
  level: PathId;
  title: string;
  en: string;
  situation: string;
  role: string;
  featured?: boolean;
  turns: RpTurn[];
};

export type Enrich = {
  can: Bi;
  conv: ConvLine[];
  ex: Ex[];
  rp: RolePlay;
  patterns: string[];
};

export type Checkpoint = {
  scenario: Bi;
  ex: Ex[];
  speak: string;
};

export type Unit = {
  id: string;
  path: PathId | "reading";
  title: string;
  en: string;
  outcome: Bi;
  lessons: string[];
  optional?: boolean;
  checkpoint?: Checkpoint;
};

// A long speaking task (about one to two minutes) with optional preparation.
export type Talk = {
  id: string;
  level: PathId;
  title: string;
  mr: string;
  prompt: string;
  outline: string[];
  starters: string[];
};
