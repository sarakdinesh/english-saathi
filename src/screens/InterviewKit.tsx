import type { StackProps } from "../navigation/types";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { interviewPhrases, interviewQuestions, plainAnswer } from "../data/interview";
import { Listen, Recorder, Speaker } from "../components/Audio";
import { AppText as Text, Heading, Icon, Label, Shell } from "../components/ui";
import { s } from "../components/styles";
import { C } from "../components/theme";

// Common interview questions: hear the question, read a simple model answer,
// then record your own version. One question open at a time, so only one
// recorder exists.
export default function InterviewKit({ route }: StackProps<"InterviewKit">) {
  const [open, setOpen] = useState<string | null>(route.params?.open ?? null);
  return (
    <Shell>
      <Label>मुलाखत किट · INTERVIEW KIT</Label>
      <Heading
        title="मुलाखतीची तयारी"
        sub="नेहमी विचारले जाणारे २० प्रश्न. प्रश्न ऐका, सोपे उत्तर वाचा आणि [ ] मधील माहिती तुमची वापरून स्वतः बोला."
      />
      <View style={[s.dailyCard, { gap: 10 }]}>
        <Text style={s.rowTitle}>अडकलात तर ही वाक्ये वापरा</Text>
        {interviewPhrases.map((p) => (
          <View key={p.en} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Speaker text={p.en} />
            <View style={{ flex: 1 }}>
              <Text style={s.exampleEnglish}>{p.en}</Text>
              <Text style={s.smallMuted}>{p.mr}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ gap: 10, marginTop: 16 }}>
        {interviewQuestions.map((x, i) => {
          const on = open === x.id;
          return (
            <View key={x.id} style={s.phraseCard}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: on }}
                onPress={() => setOpen(on ? null : x.id)}
                style={{ flexDirection: "row", alignItems: "center", gap: 10, minHeight: 48 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={s.rowTitle}>
                    {i + 1}. {x.q}
                  </Text>
                  <Text style={s.smallMuted}>{x.qMr}</Text>
                </View>
                <Icon name={on ? "chevron-up" : "chevron-down"} size={20} color={C.muted} />
              </Pressable>
              {on && (
                <View style={{ gap: 8, marginTop: 8 }}>
                  <Listen text={x.q} compact />
                  <Text style={[s.sectionHint, { marginTop: 8 }]}>सोपे उत्तर · Model answer</Text>
                  <Text style={s.exampleEnglish}>{x.answer}</Text>
                  <Text style={s.marathiBody}>{x.answerMr}</Text>
                  <View style={s.noteBox}>
                    <Text style={s.body}>💡 {x.tip}</Text>
                  </View>
                  <Recorder model={plainAnswer(x.answer)} />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </Shell>
  );
}
