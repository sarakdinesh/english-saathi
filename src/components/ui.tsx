import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text as NativeText,
  View,
  TextProps,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProgress } from "../state/progress";
import { C } from "./theme";
import { s } from "./styles";
import { Image, StyleSheet } from "react-native";
export function AppText({ style, ...props }: TextProps) {
  const { progress } = useProgress();
  const flat = StyleSheet.flatten(style) ?? {};
  const size = progress.settings.textSize;
  return (
    <NativeText
      {...props}
      style={[
        style,
        {
          fontSize: (flat.fontSize ?? 14) * size,
          lineHeight: (flat.lineHeight ?? (flat.fontSize ?? 14) * 1.55) * size,
        },
      ]}
    />
  );
}
const Text = AppText;
export type IconName = React.ComponentProps<typeof Ionicons>["name"];
export const Icon = ({
  name,
  size = 22,
  color = C.ink,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) => <Ionicons name={name} size={size} color={color} />;
export function Button({
  title,
  onPress,
  secondary = false,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        s.button,
        disabled && { opacity: 0.5 },
        secondary && s.secondary,
        pressed && { opacity: 0.75 },
      ]}
    >
      <AppText style={[s.buttonText, secondary && { color: C.ink }]}>
        {title}
      </AppText>
      <Icon
        name="arrow-forward"
        size={18}
        color={secondary ? C.ink : C.white}
      />
    </Pressable>
  );
}
const TAB_ROUTES = ["Home", "Learn", "Speak", "Review"];
// Marathi title with an English subtitle for every routed screen.
export const screenTitles: Record<string, { mr: string; en: string }> = {
  Home: { mr: "english saathi", en: "तुमचा इंग्रजीचा सोबती" },
  Learn: { mr: "शिका", en: "Learn" },
  Speak: { mr: "बोला", en: "Speak" },
  Review: { mr: "उजळणी", en: "Review" },
  Saved: { mr: "जतन केलेले", en: "Saved" },
  Settings: { mr: "सेटिंग्ज", en: "Settings" },
  Phrasebook: { mr: "बोलण्याची वाक्ये", en: "Phrasebook" },
  SpeakDrill: { mr: "बोलण्याचा सराव", en: "Speaking practice" },
  RolePlay: { mr: "संवाद सराव", en: "Role-play" },
  RolePlayList: { mr: "सर्व संवाद", en: "All conversations" },
  Placement: { mr: "सुरुवातीची चाचणी", en: "Starting-level check" },
  Checkpoint: { mr: "युनिट चेकपॉइंट", en: "Unit checkpoint" },
  LongTalk: { mr: "दीर्घ बोलणे", en: "Longer talk" },
  Mistakes: { mr: "सामान्य चुका", en: "Common mistakes" },
  Foundations: { mr: "वाचनाची सुरुवात", en: "Reading foundations" },
  UnitPractice: { mr: "युनिट सराव", en: "Unit practice" },
  Lesson: { mr: "धडा", en: "Lesson" },
  Words: { mr: "शब्द", en: "Words" },
  Quiz: { mr: "रोजचा सराव", en: "Daily practice" },
  Grammar: { mr: "व्याकरण", en: "Grammar" },
  Skills: { mr: "कौशल्ये", en: "Skills" },
  SkillPractice: { mr: "कौशल्य सराव", en: "Skill practice" },
  Onboarding: { mr: "स्वागत", en: "Welcome" },
  DailyQuiz: { mr: "आजचा सराव", en: "Daily quiz" },
};
function HeaderButton({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={4}
      onPress={onPress}
      style={({ pressed }) => [s.headerButton, pressed && { opacity: 0.6 }]}
    >
      <Icon name={icon} />
    </Pressable>
  );
}
// Fixed header: sits outside the ScrollView and pads for the status bar,
// notch / Dynamic Island and side insets itself.
export function AppHeader({ title }: { title?: string }) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const isTab = TAB_ROUTES.includes(route.name);
  const isHome = route.name === "Home";
  const names = screenTitles[route.name] ?? { mr: route.name, en: "" };
  const canGoBack = !isTab && navigation.canGoBack();
  return (
    <View
      style={[
        s.header,
        {
          paddingTop: insets.top + 6,
          paddingLeft: insets.left + 12,
          paddingRight: insets.right + 12,
        },
      ]}
    >
      {canGoBack ? (
        <HeaderButton
          icon="chevron-back"
          label="Back · मागे"
          onPress={() => navigation.goBack()}
        />
      ) : isHome ? (
        <View style={{ width: 4 }} />
      ) : (
        <View style={{ width: 8 }} />
      )}
      <View style={s.headerTitleWrap} accessibilityRole="header">
        {isHome ? (
          <Image
            source={require("../../assets/logo-horizontal.png")}
            accessibilityLabel="English Boluya · इंग्लिश बोलूया"
            resizeMode="contain"
            style={{ width: 190, height: 41 }}
          />
        ) : (
          <>
            <Text style={s.headerTitle} numberOfLines={1}>
              {title ?? names.mr}
            </Text>
            {!!names.en && (
              <Text style={s.headerSub} numberOfLines={1}>
                {names.en}
              </Text>
            )}
          </>
        )}
      </View>
      {isTab && (
        <>
          <HeaderButton
            icon="bookmark-outline"
            label="Saved · जतन केलेले"
            onPress={() => navigation.navigate("Saved")}
          />
          <HeaderButton
            icon="settings-outline"
            label="Settings · सेटिंग्ज"
            onPress={() => navigation.navigate("Settings")}
          />
        </>
      )}
    </View>
  );
}
// Page layout: fixed header, one scrolling body, bottom inset applied once.
// Tab screens skip the bottom inset because the tab bar already consumes it.
export function Shell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const isTab = TAB_ROUTES.includes(route.name);
  return (
    <View style={s.safe}>
      <AppHeader title={title} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            s.page,
            {
              paddingLeft: 24 + insets.left,
              paddingRight: 24 + insets.right,
              paddingBottom: 24 + (isTab ? 0 : insets.bottom),
            },
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
export function Label({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Text style={[s.eyebrow, light && { color: "#B5C7A4" }]}>{children}</Text>
  );
}
export function Heading({ title, sub }: { title: string; sub?: string }) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text style={s.title}>{title}</Text>
      {!!sub && <Text style={s.subtitle}>{sub}</Text>}
    </View>
  );
}
export function Section({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      {!!action && (
        <Pressable accessibilityRole="button" onPress={onPress}>
          <Text style={s.link}>{action} →</Text>
        </Pressable>
      )}
    </View>
  );
}
