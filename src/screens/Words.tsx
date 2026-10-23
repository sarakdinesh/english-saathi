import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { words } from "../data/course";
import { useProgress } from "../state/progress";
import { useDaily } from "../daily/useDaily";
import { Listen } from "../components/Audio";
import { EmptyState } from "../components/cards";
import {
  AppText as Text,
  Button,
  Heading,
  Icon,
  Label,
  Shell,
} from "../components/ui";
import { s } from "../components/styles";
import { C } from "../components/theme";
import type { StackParams } from "../navigation/types";

export default function WordsScreen({
  route,
  navigation,
}: NativeStackScreenProps<StackParams, "Words">) {
  const { progress, toggleSave, activity, review } = useProgress();
  const [query, setQuery] = useState("");
  const { plan } = useDaily();
  const daily = plan.words.map((id) => words.find((w) => w.id === id)!);
  const matches = (route.params?.daily ? daily : words).filter((w) =>
    `${w.en} ${w.mr}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Shell>
      <Label>रोजचे शब्द · WORDS</Label>
      <Heading
        title="रोजच्या वापरातील शब्द"
        sub="शब्द शिका. वाक्यात वापरा. लक्षात ठेवा."
      />
      <View style={s.search}>
        <Icon name="search-outline" />
        <TextInput
          accessibilityLabel="शब्द शोधा · Search vocabulary"
          style={s.input}
          value={query}
          onChangeText={setQuery}
          placeholder="शब्द किंवा मराठी अर्थ शोधा…"
        />
      </View>
      <Text style={s.smallMuted}>
        {matches.length} शब्द ·{" "}
        {route.params?.daily ? "आजचे पाच शब्द" : "सर्व शब्द"}
      </Text>
      <Button
        small
        icon="library-outline"
        title="पूर्ण शब्दकोश · 3000+ शब्द"
        onPress={() => navigation.navigate("Dictionary")}
      />
      {route.params?.daily && (
        <Button
          secondary
          title="सर्व १०० शब्द पाहा · All words"
          onPress={() => navigation.setParams({ daily: false })}
        />
      )}
      {matches.map((w) => (
        <View key={w.id} style={s.dailyCard}>
          <View style={s.dailyHead}>
            <View style={{ flex: 1 }}>
              <Text style={s.sectionTitle}>{w.en}</Text>
              <Text style={s.marathiBody}>{w.mr}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                progress.saved.includes(w.id)
                  ? `Remove ${w.en} bookmark`
                  : `Save ${w.en}`
              }
              onPress={() => toggleSave(w.id)}
              style={s.bookmark}
            >
              <Icon
                name={
                  progress.saved.includes(w.id)
                    ? "bookmark"
                    : "bookmark-outline"
                }
                color={C.green}
              />
            </Pressable>
          </View>
          <Listen text={w.en} />
          <View style={{ gap: 10, marginTop: 14 }}>
            <Button
              secondary
              title="हा शब्द अवघड आहे · Review sooner"
              onPress={() => review(w.id, false)}
            />
            <Button
              secondary
              disabled={(progress.daily[plan.date] ?? []).includes(w.id)}
              title={
                (progress.daily[plan.date] ?? []).includes(w.id)
                  ? "आज शिकलो ✓"
                  : "आज शिकलो · Learned today"
              }
              onPress={() => {
                activity(w.id);
                review(w.id, true);
              }}
            />
          </View>
          {progress.reviews[w.id] && (
            <Text accessibilityLiveRegion="polite" style={s.smallMuted}>
              उजळणी नियोजित:{" "}
              {new Date(progress.reviews[w.id].due).toLocaleString()}
            </Text>
          )}
          <View style={s.wordExample}>
            <Text style={s.exampleEnglish}>{w.example}</Text>
            <Text style={s.marathiBody}>{w.translation}</Text>
          </View>
        </View>
      ))}
      {!matches.length && (
        <EmptyState title="शब्द सापडला नाही" sub="वेगळा शब्द शोधून पहा." />
      )}
    </Shell>
  );
}
