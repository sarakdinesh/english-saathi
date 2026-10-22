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
} from "../../components/ui";
import { stepLabel } from "../../state/steps";
import { Pop } from "../../components/Celebrate";
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
  minutesLeft,
  justDone,
  celebrate,
  saved,
  onToggleSave,
}: {
  item: Lesson;
  unit?: Unit;
  names: string[];
  stages: number[];
  position: number;
  minutesLeft: number;
  // Position of the stage the learner just finished, for the ✓ moment.
  justDone: number | null;
  // Animate the ✓ moment (Settings → celebrations; reduce motion still wins).
  celebrate: boolean;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const current = stages[position];
  return (
    <>
      {justDone !== null && (
        <Pop animate={celebrate}>
          <View style={s.stageDone} accessibilityLiveRegion="polite">
            <Icon name="checkmark-circle" color={C.green} size={20} />
            <Text style={[s.rowTitle, { flex: 1 }]}>
              {celebrate ? "✨ " : ""}छान! टप्पा {justDone + 1} पूर्ण ✓
            </Text>
          </View>
        </Pop>
      )}
      <Label>
        {stepLabel(position, stages.length)} · {names[current]}
      </Label>
      <StepDots stages={stages} position={position} names={names} />
      <Text style={[s.smallMuted, { marginTop: 6 }]}>
        {unit ? `${unit.title} · ` : ""}सुमारे {minutesLeft} मिनिटे बाकी
        {position < stages.length - 1
          ? ` · पुढे: ${names[stages[position + 1]]}`
          : " · शेवटचा टप्पा"}
      </Text>
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

// One dot per stage: ✓ for finished stages, filled for the current one.
// Announced as a progress bar ("टप्पा 2/7").
function StepDots({
  stages,
  position,
  names,
}: {
  stages: number[];
  position: number;
  names: string[];
}) {
  return (
    <View
      style={s.stepDots}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`धड्याचा टप्पा: ${names[stages[position]]}`}
      accessibilityValue={{ min: 1, max: stages.length, now: position + 1, text: stepLabel(position, stages.length) }}
    >
      {stages.map((v, i) => (
        <View
          key={v}
          style={[s.stepDot, i < position && s.stepDotDone, i === position && s.stepDotOn]}
        >
          {i < position && <Icon name="checkmark" size={12} color={C.onPrimary} />}
        </View>
      ))}
    </View>
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
        <Button title="टप्पा पूर्ण ✓ · पुढे" onPress={onNext} />
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
