import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { SkillArea } from "../state/skills";

// Route names and their params for the root stack. Tab routes (Home, Learn,
// Speak, Review) live inside "Main".
export type StackParams = {
  Main: NavigatorScreenParams<TabParams> | undefined;
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
  Dictionary: { tab?: "words" | "verbs" | "phrasal" | "opposites" } | undefined;
  SkillPractice: { skill: SkillArea };
};

export type TabParams = {
  Home: undefined;
  Learn: { category?: string } | undefined;
  Speak: undefined;
  Review: undefined;
  Menu: undefined;
};

export const TAB_ROUTES = ["Home", "Learn", "Speak", "Review"] as const;

// Props for a screen in the root stack.
export type StackProps<K extends keyof StackParams> = NativeStackScreenProps<
  StackParams,
  K
>;
// Props for a tab screen: can navigate to sibling tabs and to stack screens.
export type TabProps<K extends keyof TabParams> = CompositeScreenProps<
  BottomTabScreenProps<TabParams, K>,
  NativeStackScreenProps<StackParams>
>;
// For components and hooks that navigate without being a screen themselves.
export type AppNavigation = NativeStackNavigationProp<StackParams>;
