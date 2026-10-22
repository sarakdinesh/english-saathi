import React, { useState } from "react";
import { View, Pressable } from "react-native";
import type { Ex } from "../curriculum/types";
import { answerText, correctText, isCorrect } from "../curriculum/score";
import { useProgress } from "../state/progress";
import { AppText as Text, Button, Label } from "./ui";
import { Listen } from "./Audio";
import { s } from "./styles";
import { C } from "./theme";

const labels: Record<Ex["skill"], string> = {
  understand: "समजून घ्या · UNDERSTAND",
  gap: "रिकामी जागा · GAP",
  "en-mr": "इंग्रजी → मराठी",
  "mr-en": "मराठी → इंग्रजी",
  response: "योग्य उत्तर · REPLY",
  listen: "ऐका आणि निवडा · LISTEN",
  build: "वाक्य बनवा · BUILD",
};
export function Exercise({
  item,
  onDone,
  onAttempt,
  onResult,
  track = true,
}: {
  item: Ex;
  onDone?: () => void;
  onAttempt?: () => void;
  onResult?: (correct: boolean) => void;
  track?: boolean;
}) {
  const { review } = useProgress();
  const [chosen, setChosen] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const [transcript, setTranscript] = useState(false);
  const build = item.kind === "build";
  const check = (selection: number[]) => {
    const correct = isCorrect(item, selection);
    onAttempt?.();
    setResult(correct);
    if (track) review(item.id, correct, transcript);
    onResult?.(correct);
  };
  return (
    <View style={s.dailyCard}>
      <Label>{labels[item.skill]}</Label>
      <Text style={s.exampleEnglish}>{item.prompt}</Text>
      {!!item.audio && (
        <View>
          <Listen text={item.audio} compact />
          <Pressable
            accessibilityRole="button"
            onPress={() => setTranscript(!transcript)}
          >
            <Text style={[s.link, { marginTop: 10 }]}>
              {transcript ? "Transcript लपवा ↑" : "Transcript पाहा ↓"}
            </Text>
          </Pressable>
          {transcript && (
            <View style={s.noteBox}>
              <Text style={s.exampleEnglish}>{item.audio}</Text>
            </View>
          )}
        </View>
      )}
      {build && (
        <View
          style={[s.noteBox, { minHeight: 56 }]}
          accessibilityLiveRegion="polite"
        >
          {chosen.length ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {chosen.map((i, n) => (
                <Pressable
                  key={n}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item.options[i]}`}
                  disabled={result !== null}
                  onPress={() => setChosen(chosen.filter((_, k) => k !== n))}
                  style={s.chip}
                >
                  <Text style={s.exampleEnglish}>{item.options[i]}</Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={s.marathiBody}>खालील शब्दांवर टॅप करा…</Text>
          )}
        </View>
      )}
      <View
        style={{
          gap: 10,
          marginVertical: 18,
          flexDirection: build ? "row" : "column",
          flexWrap: "wrap",
        }}
      >
        {item.options.map((option, i) => {
          const used = chosen.includes(i);
          const picked = !build && chosen[0] === i;
          return (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityState={{
                selected: used,
                disabled: result !== null || used,
              }}
              disabled={result !== null || used}
              onPress={() => {
                const n = [...chosen, i];
                setChosen(n);
                if (!build) check(n);
              }}
              style={({ pressed }) => [
                s.option,
                picked &&
                  result !== null && {
                    borderColor: result ? C.green : C.danger,
                    backgroundColor: result ? C.successSoft : C.dangerSoft,
                  },
                { opacity: used && build ? 0.4 : pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={s.exampleEnglish}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
      {build && result === null && (
        <View style={{ gap: 10 }}>
          <Button
            title="शब्द पुन्हा लावा · Clear"
            secondary
            onPress={() => setChosen([])}
          />
          {chosen.length > 0 && (
            <Button title="उत्तर तपासा · Check" onPress={() => check(chosen)} />
          )}
        </View>
      )}
      {result !== null && (
        <View accessibilityLiveRegion="polite">
          <Text style={[s.rowTitle, { color: result ? C.green : C.dangerInk }]}>
            {result ? "बरोबर! छान प्रयत्न." : "हरकत नाही! फरक पाहूया."}
          </Text>
          {!result && (
            <View style={s.compareBox}>
              <Text style={s.smallMuted}>तुमचे उत्तर · Your answer</Text>
              <Text
                style={[s.exampleEnglish, s.compareWrong]}
                accessibilityLabel={`तुमचे उत्तर: ${answerText(item, chosen)}`}
              >
                ✗ {answerText(item, chosen)}
              </Text>
              <Text style={[s.smallMuted, { marginTop: 8 }]}>
                योग्य उत्तर · Correct answer
              </Text>
              <Text
                style={[s.exampleEnglish, { color: C.green }]}
                accessibilityLabel={`योग्य उत्तर: ${correctText(item)}`}
              >
                ✓ {correctText(item)}
              </Text>
            </View>
          )}
          {!result && <Text style={[s.smallMuted, { marginTop: 10 }]}>का? · Why</Text>}
          <Text style={s.marathiBody}>{item.explanation}</Text>
          {!result && (
            <Text style={[s.smallMuted, { marginTop: 6 }]}>
              हा प्रश्न उजळणीत लवकरच पुन्हा येईल.
            </Text>
          )}
          <View style={{ height: 16 }} />
          {!result ? (
            <Button
              title="पुन्हा प्रयत्न करा · Retry"
              onPress={() => {
                setResult(null);
                setChosen([]);
              }}
            />
          ) : onDone ? (
            <Button title="पुढे · Next" onPress={onDone} />
          ) : (
            <Text style={s.smallMuted}>पुढील उजळणी नियोजित केली आहे. ✓</Text>
          )}
        </View>
      )}
    </View>
  );
}
