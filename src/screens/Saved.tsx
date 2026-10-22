import React from "react";
import { Pressable, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { lessons, words } from "../data/course";
import { situations, phraseKey } from "../data/speaking";
import { useProgress } from "../state/progress";
import { Listen } from "../components/Audio";
import { EmptyState, LessonCard } from "../components/cards";
import {
  AppText as Text,
  Heading,
  Icon,
  Label,
  Section,
  Shell,
} from "../components/ui";
import { s } from "../components/styles";
import type { StackParams } from "../navigation/types";

export default function Saved({
  navigation,
}: NativeStackScreenProps<StackParams, "Saved">) {
  const { progress } = useProgress();
  const savedLessons = lessons.filter((l) => progress.saved.includes(l.id));
  const savedWords = words.filter((w) => progress.saved.includes(w.id));
  const savedPhrases = situations.flatMap((x) =>
    x.phrases.filter((p) => progress.saved.includes(phraseKey(x.id, p.en))),
  );
  return (
    <Shell>
      <Label>तुमचा संग्रह · SAVED</Label>
      <Heading
        title="आवडलेले जपून ठेवा"
        sub="आवडलेले धडे आणि शब्द पुन्हा पाहा."
      />
      {!savedLessons.length && !savedWords.length && !savedPhrases.length ? (
        <EmptyState
          title="सध्या इथे काही नाही"
          sub="धडा किंवा शब्दावरील जतन (🔖) चिन्ह दाबा. तुमचा संग्रह येथे दिसेल."
        />
      ) : (
        <>
          <Section title={`जतन केलेले धडे · ${savedLessons.length}`} />
          {savedLessons.map((l) => (
            <LessonCard
              key={l.id}
              item={l}
              onPress={() => navigation.navigate("Lesson", { id: l.id })}
            />
          ))}
          <Section title={`जतन केलेले शब्द · ${savedWords.length}`} />
          {savedWords.map((w) => (
            <View key={w.id} style={s.dailyCard}>
              <Text style={s.rowTitle}>
                {w.en} · {w.mr}
              </Text>
              <Text style={s.marathiBody}>{w.example}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate("Words")}
              >
                <Text style={[s.link, { marginTop: 12 }]}>
                  सर्व शब्द पाहा →
                </Text>
              </Pressable>
            </View>
          ))}
          {savedPhrases.length > 0 && (
            <>
              <Section title={`जतन केलेली वाक्ये · ${savedPhrases.length}`} />
              {savedPhrases.map((p) => (
                <View key={p.en} style={s.phraseCard}>
                  <Text style={s.phraseEn}>{p.en}</Text>
                  <Text style={s.sayText}>{p.say}</Text>
                  <Text style={s.marathiBody}>{p.mr}</Text>
                  <Listen text={p.en} compact />
                </View>
              ))}
            </>
          )}
        </>
      )}
      <View style={s.tip}>
        <Icon name="lock-closed-outline" />
        <Text style={[s.body, { flex: 1 }]}>
          तुमची प्रगती फक्त या फोनवर जतन होते. ॲपचा डेटा पुसल्यास ती हटेल.
        </Text>
      </View>
    </Shell>
  );
}
