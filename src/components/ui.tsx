import type { AppNavigation } from "../navigation/types";
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
import { BRAND } from "../brand";
import { TAB_ROUTES } from "../navigation/types";
const isTabName = (name: string) => (TAB_ROUTES as readonly string[]).includes(name);
import { Image, StyleSheet } from "react-native";
// Every visible string goes through AppText. On Android the default
// "highQuality" line breaking measures Devanagari differently from how it
// draws it, so a wrapped last word can land on a clipped line (seen on a
// vivo V2415, Android 16: "संवाद सराव" showed only "संवाद"). "simple" keeps
// measurement and drawing in agreement.
export function AppText({ style, textBreakStrategy = "simple", ...props }: TextProps) {
  const { progress } = useProgress();
  const flat = StyleSheet.flatten(style) ?? {};
  const size = progress.settings.textSize;
  return (
    <NativeText
      {...props}
      textBreakStrategy={textBreakStrategy}
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
// Three variants, used consistently:
//  - primary (default): deep green, the main action of a card or screen;
//  - accent: lime, reserved for the single most important action on a screen
//    (Home's "continue learning");
//  - secondary: quiet outline for every other action.
export function Button({
  title,
  onPress,
  secondary = false,
  accent = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  accent?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}) {
  const variant = accent ? s.accent : secondary ? s.secondary : null;
  const ink = disabled
    ? C.muted
    : accent
      ? C.onLime
      : secondary
        ? C.green
        : C.onPrimary;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        s.button,
        variant,
        disabled && s.buttonDisabled,
        pressed && !disabled && { opacity: 0.8, transform: [{ scale: 0.99 }] },
      ]}
    >
      <AppText style={[s.buttonText, { color: ink }]}>{title}</AppText>
      <Icon name="arrow-forward" size={18} color={ink} />
    </Pressable>
  );
}
// Marathi title with an English subtitle for every routed screen.
export const screenTitles: Record<string, { mr: string; en: string }> = {
  Home: { mr: BRAND.mr, en: BRAND.en },
  Learn: { mr: "शिका", en: "Learn" },
  Speak: { mr: "बोला", en: "Speak" },
  Review: { mr: "सराव", en: "Practice & review" },
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
  const navigation = useNavigation<AppNavigation>();
  const route = useRoute();
  const isTab = isTabName(route.name);
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
          <View style={[s.logoPlate, { alignSelf: "flex-start" }]}>
            <Image
              source={require("../../assets/logo-horizontal.png")}
              accessibilityLabel={BRAND.full}
              resizeMode="contain"
              style={{ width: 190, height: 41 }}
            />
          </View>
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
  const isTab = isTabName(route.name);
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
    <Text style={[s.eyebrow, light && { color: C.heroMuted }]}>{children}</Text>
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

// Single-choice selector (tabs within a screen). Selection is announced by
// screen readers and does not rely on colour alone (✓ prefix).
export function Chips<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly (readonly [T, string])[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <View style={s.chipRow} accessibilityRole="tablist" accessibilityLabel={label}>
      {options.map(([id, text]) => {
        const on = id === value;
        return (
          <Pressable
            key={id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            aria-selected={on}
            onPress={() => onChange(id)}
            style={({ pressed }) => [s.chip, on && s.chipOn, pressed && { opacity: 0.8 }]}
          >
            <Text style={[s.chipText, on && s.chipTextOn]}>
              {on ? "✓ " : ""}
              {text}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// Thin progress track announced as "label, N of M" by screen readers.
export function ProgressBar({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const total = Math.max(max, 1);
  const now = Math.min(Math.max(value, 0), total);
  return (
    <View
      style={s.track}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: total, now, text: `${now} / ${total}` }}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={now}
      aria-valuetext={`${now} / ${total}`}
    >
      <View style={[s.trackFill, { width: `${(now / total) * 100}%` }]} />
    </View>
  );
}
