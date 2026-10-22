// Shared pieces of the lesson screen: stage names, header, stage navigation
// and the self-rated confidence chips.
import React from "react";
import { Pressable, View } from "react-native";
import type { Lesson } from "../../data/course";
import type { Unit } from "../../curriculum/types";
import {
  AppText as Text,
  Button,
  Heading,
  Icon,
  Label,
  ProgressBar,
} from "../../components/ui";
import { s } from "../../components/styles";
import { C } from "../../components/theme";

// Stage names for lessons with a full curriculum kit…
export const stageNames = [
  "लक्ष्य आणि संवाद",
  "अर्थ आणि सूत्र",
  "ऐका आणि म्हणा",
  "मार्गदर्शित सराव",
  "तुमचे बोलणे",
  "संवाद सराव",
  "उजळणी",
];
// …and for the original flow kept for lessons without one.
export const legacyNames = [
  "समजून घ्या",
  "उदाहरणे पाहा",
  "ऐका",
  "वाक्य बनवा",
  "सराव करा",
  "बोला",
  "आढावा",
];
export const LAST_STAGE = 6;

export function LessonHeader({
  item,
  unit,
  names,
  stages,
  position,
  saved,
  onToggleSave,
}: {
  item: Lesson;
  unit?: Unit;
  names: string[];
  stages: number[];
  position: number;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const current = stages[position];
  return (
    <>
      <Label>
        {unit ? `${unit.en.toUpperCase()} · ` : ""}
        {position + 1} / {stages.length} · {names[current]}
      </Label>
      <ProgressBar
        value={position + 1}
        max={stages.length}
        label={`धड्याचा टप्पा: ${names[current]}`}
      />
      {position < stages.length - 1 && (
        <Text style={[s.smallMuted, { marginTop: 6 }]}>
          पुढे: {names[stages[position + 1]]}
        </Text>
      )}
      <View style={{ height: 16 }} />
      <Heading title={item.title} sub={item.subtitle} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={saved ? "धडा जतन केला आहे. काढण्यासाठी दाबा." : "हा धडा जतन करा"}
        accessibilityState={{ selected: saved }}
        onPress={onToggleSave}
        hitSlop={8}
        style={({ pressed }) => [s.inlineAction, pressed && { opacity: 0.6 }]}
      >
        <Icon name={saved ? "bookmark" : "bookmark-outline"} color={C.green} size={20} />
        <Text style={s.link}>{saved ? "जतन केले · Saved" : "जतन करा · Save"}</Text>
      </Pressable>
      <View style={{ height: 12 }} />
    </>
  );
}

export function StageNav({
  isLast,
  finishTitle,
  canGoBack,
  onNext,
  onPrevious,
  onFinish,
}: {
  isLast: boolean;
  finishTitle: string;
  canGoBack: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
}) {
  return (
    <View style={{ gap: 12, marginTop: 24 }}>
      {isLast ? (
        <Button title={finishTitle} onPress={onFinish} />
      ) : (
        <Button title="पुढचा टप्पा · Next" onPress={onNext} />
      )}
      {canGoBack && (
        <Button secondary title="मागचा टप्पा · Previous" onPress={onPrevious} />
      )}
    </View>
  );
}

const confidenceLabels: [1 | 2 | 3, string][] = [
  [1, "अजून सराव हवा"],
  [2, "थोडा आत्मविश्वास"],
  [3, "आत्मविश्वास आहे"],
];

export function ConfidenceChips({
  value,
  onPick,
}: {
  value?: number;
  onPick: (v: 1 | 2 | 3) => void;
}) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 12 }}>
      {confidenceLabels.map(([v, label]) => (
        <Pressable
          key={v}
          accessibilityRole="button"
          accessibilityState={{ selected: value === v }}
          onPress={() => onPick(v)}
          style={[s.chip, value === v && s.chipOn]}
        >
          <Text style={[s.filterText, value === v && { color: C.onPrimary }]}>
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
