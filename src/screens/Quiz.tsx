import React, { useState } from "react";
import { View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { questions } from "../data/course";
import { useProgress } from "../state/progress";
import { ExerciseCard } from "../components/cards";
import {
  AppText as Text,
  Button,
  Icon,
  Label,
  Section,
  Shell,
} from "../components/ui";
import { s } from "../components/styles";
import { C } from "../components/theme";
import type { StackParams } from "../navigation/types";

export default function QuizScreen({
  navigation,
}: NativeStackScreenProps<StackParams, "Quiz">) {
  const { recordQuiz, review } = useProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [missed, setMissed] = useState<number[]>([]);
  const [pool, setPool] = useState(questions.map((_, i) => i));
  const questionId = pool[index];
  const q = questions[questionId];
  function next() {
    const correct = selected === q.answer;
    const total = score + (correct ? 1 : 0);
    setScore(total);
    review(`quiz-${questionId}`, correct);
    if (!correct) setMissed((m) => [...m, questionId]);
    if (index === pool.length - 1) {
      if (pool.length === questions.length)
        recordQuiz(Math.round((total / pool.length) * 100));
      setDone(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  }
  if (done)
    return (
      <Shell>
        <View style={s.speakBanner}>
          <Icon name="ribbon-outline" size={64} color={C.green} />
          <Label>सराव पूर्ण · DONE</Label>
          <Text style={s.resultScore}>
            {Math.round((score / pool.length) * 100)}%
          </Text>
          <Text style={s.sectionTitle}>
            {pool.length} पैकी {score} बरोबर
          </Text>
          <Text style={s.marathiBody}>
            छान प्रयत्न! रोजच्या सरावाने आत्मविश्वास वाढतो.
          </Text>
        </View>
        {missed.length > 0 && (
          <>
            <Section title="थोडी उजळणी" />
            {missed.map((i) => (
              <View key={i} style={s.dailyCard}>
                <Text style={s.rowTitle}>{questions[i].prompt}</Text>
                <Text
                  style={[s.exampleEnglish, { color: C.green, marginTop: 10 }]}
                >
                  {questions[i].options[questions[i].answer]}
                </Text>
                <Text style={s.marathiBody}>{questions[i].explanation}</Text>
              </View>
            ))}
          </>
        )}
        <Button
          title={
            missed.length
              ? "चुकलेले प्रश्न पुन्हा सोडवा · Retry missed"
              : "पुन्हा सराव करा · Try again"
          }
          onPress={() => {
            setPool(missed.length ? missed : questions.map((_, i) => i));
            setIndex(0);
            setScore(0);
            setSelected(null);
            setMissed([]);
            setDone(false);
          }}
        />
        <View style={{ height: 12 }} />
        <Button
          title="धड्यांकडे परत · Back"
          secondary
          onPress={() => navigation.goBack()}
        />
      </Shell>
    );
  return (
    <Shell>
      <ExerciseCard
        header={`प्रश्न ${index + 1} / ${pool.length} · QUESTION`}
        prompt={q.prompt}
        options={q.options}
        answer={q.answer}
        selected={selected}
        explanation={q.explanation}
        onSelect={setSelected}
      />
      {selected !== null && (
        <Button
          title={index === pool.length - 1 ? "निकाल पाहा · Results" : "पुढचा प्रश्न · Next"}
          onPress={next}
        />
      )}
    </Shell>
  );
}
