import React from "react";
import { Pressable, View } from "react-native";
import { useProgress } from "../state/progress";
import { categories, Lesson } from "../data/course";
import { AppText as Text, Button, Icon, IconName, Label } from "./ui";
import { s } from "./styles";
import { C } from "./theme";

// Empty, first-use or no-results state with an optional next action.
export function EmptyState({
  icon = "book-outline",
  title,
  sub,
  actionTitle,
  onAction,
}: {
  icon?: IconName;
  title: string;
  sub: string;
  actionTitle?: string;
  onAction?: () => void;
}) {
  return (
    <View style={s.empty} accessibilityRole="summary">
      <Icon name={icon} size={42} color={C.muted} />
      <Text style={[s.sectionTitle, { textAlign: "center" }]}>{title}</Text>
      <Text style={[s.body, { textAlign: "center" }]}>{sub}</Text>
      {actionTitle && onAction && (
        <Button secondary title={actionTitle} onPress={onAction} />
      )}
    </View>
  );
}

// A lesson in a list: category icon, title, subtitle and completion state.
export function LessonCard({
  item,
  onPress,
}: {
  item: Lesson;
  onPress: () => void;
}) {
  const { progress } = useProgress();
  const cat = categories.find((c) => c.id === item.category);
  const done = progress.completed.includes(item.id);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.title}. ${item.subtitle}${done ? ". Completed" : ""}`}
      onPress={onPress}
      style={({ pressed }) => [s.lessonRow, pressed && { opacity: 0.65 }]}
    >
      <View style={[s.smallIcon, { backgroundColor: cat?.color ?? C.line }]}>
        <Text style={s.catSymbol}>{cat?.icon ?? "•"}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.rowTitle}>{item.title}</Text>
        <Text style={s.smallMuted}>{item.subtitle}</Text>
      </View>
      <Icon
        name={done ? "checkmark-circle" : "chevron-forward"}
        color={done ? C.green : C.muted}
      />
    </Pressable>
  );
}

// Labelled measures plus an optional bar. `value`/`total` drive the bar only.
export function ProgressCard({
  label,
  note,
  rows = [],
  value,
  total,
}: {
  label: string;
  note?: string;
  rows?: [name: string, value: string][];
  value?: number;
  total?: number;
}) {
  const pct =
    total && total > 0 && value !== undefined
      ? Math.min(100, Math.max(0, (value / total) * 100))
      : undefined;
  return (
    <View style={s.goalCard}>
      <Label>{label}</Label>
      {!!note && <Text style={s.body}>{note}</Text>}
      {rows.map(([name, v]) => (
        <View key={name} style={[s.goalRow, { justifyContent: "space-between" }]}>
          <Text style={[s.body, { flex: 1 }]}>{name}</Text>
          <Text style={s.rowTitle}>{v}</Text>
        </View>
      ))}
      {pct !== undefined && (
        <View
          style={s.track}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: total, now: value }}
        >
          <View style={[s.trackFill, { width: `${pct}%` }]} />
        </View>
      )}
    </View>
  );
}

// One multiple-choice question with right/wrong marking and a Marathi
// explanation once answered. The parent owns the answer and moves on.
export function ExerciseCard({
  prompt,
  options,
  answer,
  selected,
  explanation,
  onSelect,
  header,
  children,
}: {
  prompt: string;
  options: string[];
  answer: number;
  selected: number | null;
  explanation?: string;
  onSelect: (index: number) => void;
  header?: string;
  children?: React.ReactNode;
}) {
  const answered = selected !== null;
  return (
    <View>
      {!!header && <Label>{header}</Label>}
      <Text style={[s.title, { marginVertical: 20 }]}>{prompt}</Text>
      {children}
      <View style={{ gap: 12, marginVertical: 20 }}>
        {options.map((option, i) => {
          const right = answered && i === answer;
          const wrong = selected === i && i !== answer;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: answered, selected: selected === i }}
              disabled={answered}
              key={`${option}-${i}`}
              onPress={() => onSelect(i)}
              style={[
                s.option,
                right && { borderColor: C.green, backgroundColor: "#E9F2E8" },
                wrong && { borderColor: "#B65C4C", backgroundColor: "#FBECE7" },
              ]}
            >
              <Text style={s.optionLetter}>{String.fromCharCode(65 + i)}</Text>
              <Text style={[s.exampleEnglish, { flex: 1 }]}>{option}</Text>
              {right && <Icon name="checkmark-circle" color={C.green} />}
            </Pressable>
          );
        })}
      </View>
      {answered && (
        <View accessibilityLiveRegion="polite" style={s.explanation}>
          <Text style={s.rowTitle}>
            {selected === answer ? "बरोबर! छान!" : "चला, यातून शिकूया."}
          </Text>
          {!!explanation && <Text style={s.marathiBody}>{explanation}</Text>}
        </View>
      )}
    </View>
  );
}
