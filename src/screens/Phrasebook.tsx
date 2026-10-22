import type { StackProps } from "../navigation/types";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  situations,
  sounds,
  routine,
  phraseKey,
  drillCards,
} from "../data/speaking";
import { useProgress } from "../state/progress";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
  Icon,
  IconName,
} from "../components/ui";
import { Listen, Recorder } from "../components/Audio";
import { s } from "../components/styles";
import { C } from "../components/theme";

export default function Phrasebook({ route }: StackProps<"Phrasebook">) {
  const { activity, progress, toggleSave, review } = useProgress();
  const [id, setId] = useState<string>(route.params?.situation ?? "meet");
  const [open, setOpen] = useState<string | null>(null);
  const [shadow, setShadow] = useState(!!route.params?.sounds);
  const sit = situations.find((x) => x.id === id) ?? situations[0];
  return (
    <Shell>
      <Label>रोजच्या प्रसंगातील इंग्रजी · PHRASEBOOK</Label>
      <Heading
        title="Say it like you mean it."
        sub="आधी ऐका, मग मोठ्याने म्हणा. देवनागरीतील उच्चार फक्त अंदाजे मदत आहे; खरा आवाज ऑडिओतून शिका."
      />
      <View style={s.routine}>
        {routine.map((r, i) => (
          <View key={r.title} style={s.routineItem}>
            <View style={s.routineIcon}>
              <Icon name={r.icon as IconName} size={18} color={C.green} />
            </View>
            <Text style={s.routineTitle}>{r.mr}</Text>
            <Text style={s.routineEn}>
              {i + 1}. {r.title}
            </Text>
          </View>
        ))}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filters}
      >
        {situations.map((x) => (
          <Pressable
            key={x.id}
            accessibilityRole="button"
            accessibilityState={{ selected: x.id === id }}
            onPress={() => {
              setId(x.id);
              setOpen(null);
            }}
            style={[s.filter, x.id === id && s.filterActive]}
          >
            <Text style={[s.filterText, x.id === id && { color: C.onPrimary }]}>
              {x.mr}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={s.tip}>
        <Icon name={sit.icon as IconName} color={C.green} />
        <View style={{ flex: 1 }}>
          <Text style={s.rowTitle}>{sit.title}</Text>
          <Text style={s.body}>{sit.tip}</Text>
        </View>
      </View>
      {sit.phrases.map((p, i) => {
        const key = phraseKey(sit.id, p.en);
        const saved = progress.saved.includes(key);
        return (
          <View key={p.en} style={s.phraseCard}>
            <View style={s.dailyHead}>
              <Text style={[s.phraseEn, { flex: 1 }]}>{p.en}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={saved ? "Remove from saved" : "Save phrase"}
                onPress={() => toggleSave(key)}
                style={s.bookmark}
              >
                <Icon
                  name={saved ? "bookmark" : "bookmark-outline"}
                  color={C.green}
                />
              </Pressable>
            </View>
            <View style={s.sayBox}>
              <Text style={s.sayLabel}>उच्चार मार्गदर्शक (अंदाजे)</Text>
              <Text style={s.sayText}>{p.say}</Text>
            </View>
            <Text style={s.marathiBody}>{p.mr}</Text>
            <Listen text={p.en} compact />
            <View style={{ marginTop: 10 }}>
              <Button
                secondary
                disabled={!!progress.reviews[`say-${sit.id}-${i}`]}
                title={
                  progress.reviews[`say-${sit.id}-${i}`]
                    ? "उजळणीत जोडले ✓"
                    : "उजळणीसाठी जोडा"
                }
                onPress={() => review(`say-${sit.id}-${i}`, false)}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setOpen(open === p.en ? null : p.en);
                activity("speak");
              }}
            >
              <Text style={[s.link, { marginTop: 14 }]}>
                {open === p.en
                  ? "रेकॉर्डर बंद करा ↑"
                  : "स्वतः म्हणून रेकॉर्ड करा →"}
              </Text>
            </Pressable>
            {open === p.en && <Recorder />}
          </View>
        );
      })}
      <Pressable
        accessibilityRole="button"
        onPress={() => setShadow(!shadow)}
        style={{ marginTop: 28 }}
      >
        <Label>तुमचा उच्चार सुधारा · PRONUNCIATION</Label>
        <Text style={s.sectionTitle}>
          मराठी भाषकांसाठी उच्चार मार्गदर्शक {shadow ? "↑" : "↓"}
        </Text>
      </Pressable>
      {shadow &&
        sounds.map((x) => (
          <View key={x.id} style={s.phraseCard}>
            <Text style={s.rowTitle}>{x.title}</Text>
            <Text style={s.marathiBody}>{x.mr}</Text>
            <Text style={s.body}>{x.tip}</Text>
            <View style={s.soundGrid}>
              {x.pairs.map((p) => (
                <View key={p.en} style={s.soundChip}>
                  <Text style={s.chipEn}>{p.en}</Text>
                  <Text style={s.smallMuted}>{p.say}</Text>
                </View>
              ))}
            </View>
            <Listen
              text={x.pairs
                .map((p) => p.en.replace(/-/g, "").toLowerCase())
                .join(". ")}
              compact
            />
          </View>
        ))}
    </Shell>
  );
}
