// Route names and their params for the root stack. Tab routes (Home, Learn,
// Speak, Review) live inside "Main".
export type StackParams = {
  Main: undefined;
  Lesson: { id: string };
  Quiz: undefined;
  Words: { daily?: boolean } | undefined;
  Saved: undefined;
  Settings: undefined;
  SpeakDrill: undefined;
  Mistakes: undefined;
  RolePlay: { id: string };
  RolePlayList: undefined;
  Placement: undefined;
  Checkpoint: { unit: string };
  LongTalk: { id: string };
  Phrasebook: { situation?: string; sounds?: boolean } | undefined;
  Foundations: undefined;
  UnitPractice: { lesson: string };
  DailyQuiz: undefined;
  Onboarding: undefined;
  Skills: undefined;
  Grammar: undefined;
  SkillPractice: { skill: string };
};

export type TabParams = {
  Home: undefined;
  Learn: undefined;
  Speak: undefined;
  Review: undefined;
  Menu: undefined;
};

export const TAB_ROUTES = ["Home", "Learn", "Speak", "Review"] as const;
