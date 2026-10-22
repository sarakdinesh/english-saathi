import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { drillCards, mistakes, situations } from "../data/speaking";
import { useProgress } from "../state/progress";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
  Icon,
  IconName,
  ProgressBar,
} from "../components/ui";
import { Listen } from "../components/Audio";
import { s } from "../components/styles";
import { C } from "../components/theme";

// Say the sentence aloud from the Marathi prompt, then check and self-rate.
// "Practise more" re-schedules the card in the existing review queue.
export function SpeakDrill() {
  const { progress, review, activity } = useProgress();
  const [topic, setTopic] = useState("all");
  const [seen, setSeen] = useState<string[]>([]);
  const [shown, setShown] = useState(false);
  const [rated, setRated] = useState({ good: 0, again: 0 });
  const pool = useMemo(
    () => drillCards.filter((c) => topic === "all" || c.situation === topic),
    [topic],
  );
  const now = Date.now();
  // Cards never tried or due first, then the rest, so every session is useful.
  const queue = pool
    .filter((c) => !seen.includes(c.id))
    .sort((a, b) => {
      const da = progress.reviews[a.id]?.due ?? 0;
      const db = progress.reviews[b.id]?.due ?? 0;
      return da - db;
    });
  const card = queue[0];
  const finish = (good: boolean) => {
    review(card.id, good);
    activity("speak");
    setRated((r) => ({
      good: r.good + (good ? 1 : 0),
      again: r.again + (good ? 0 : 1),
    }));
    setSeen((v) => [...v, card.id]);
    setShown(false);
  };
  return (
    <Shell>
      <Label>बोलण्याचा सराव · SPEAK THE SENTENCE</Label>
      <Heading
        title="विचार करा. म्हणा. तपासा."
        sub="मराठी वाक्य वाचा, इंग्रजीत मोठ्याने म्हणा, मग उत्तर तपासा."
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filters}
      >
        {[{ id: "all", mr: "सर्व" }, ...situations].map((x) => (
          <Pressable
            key={x.id}
            accessibilityRole="button"
            accessibilityState={{ selected: topic === x.id }}
            onPress={() => {
              setTopic(x.id);
              setSeen([]);
              setShown(false);
            }}
            style={[s.filter, topic === x.id && s.filterActive]}
          >
            <Text style={[s.filterText, topic === x.id && { color: C.onPrimary }]}>
              {x.mr}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={s.smallMuted}>
        {seen.length} / {pool.length} पूर्ण · बरोबर {rated.good} · पुन्हा{" "}
        {rated.again}
      </Text>
      <ProgressBar value={seen.length} max={pool.length} label="सराव प्रगती" />
      <View style={{ height: 18 }} />
      {card ? (
        <View style={s.phraseCard}>
          <Label>इंग्रजीत म्हणा · SAY IN ENGLISH</Label>
          <Text style={[s.marathiBody, { fontSize: 22, lineHeight: 34 }]}>
            {card.mr}
          </Text>
          {!shown ? (
            <View style={{ marginTop: 18 }}>
              <Button
                title="मी म्हणून पाहिले · Show answer"
                onPress={() => setShown(true)}
              />
            </View>
          ) : (
            <>
              <Text style={[s.phraseEn, { marginTop: 16 }]}>{card.en}</Text>
              <View style={s.sayBox}>
                <Text style={s.sayLabel}>उच्चार मार्गदर्शक (अंदाजे)</Text>
                <Text style={s.sayText}>{card.say}</Text>
              </View>
              <Listen text={card.en} compact />
              <Text style={[s.body, { marginTop: 14 }]}>
                आता हे वाक्य तुमच्या शब्दात एकदा मोठ्याने पुन्हा म्हणा.
              </Text>
              <View style={{ gap: 10, marginTop: 14 }}>
                <Button
                  title="बरोबर म्हणालो · Got it"
                  onPress={() => finish(true)}
                />
                <Button
                  secondary
                  title="पुन्हा सराव · Practise more"
                  onPress={() => finish(false)}
                />
              </View>
            </>
          )}
        </View>
      ) : (
        <View style={s.speakBanner}>
          <Label>सराव पूर्ण</Label>
          <Text style={s.sectionTitle}>
            {rated.good} बरोबर · {rated.again} पुन्हा सरावासाठी
          </Text>
          <Text style={[s.body, { textAlign: "center" }]}>
            "पुन्हा सराव" निवडलेली वाक्ये १० मिनिटांनी उजळणीत येतील.
          </Text>
          <Button
            title="पुन्हा सुरू करा"
            onPress={() => {
              setSeen([]);
              setRated({ good: 0, again: 0 });
            }}
          />
        </View>
      )}
    </Shell>
  );
}

// Typical word-for-word translation errors, with the natural version.
export function Mistakes() {
  const { progress, review } = useProgress();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Shell>
      <Label>सामान्य चुका · COMMON MISTAKES</Label>
      <Heading
        title="बोलण्याआधी चूक ओळखा."
        sub="मराठीतून शब्दशः भाषांतर केल्यावर होणाऱ्या चुका. योग्य वाक्य शिका."
      />
      {mistakes.map((m, i) => {
        const id = `mistake-${i}`;
        const isOpen = open === i;
        return (
          <Pressable
            key={id}
            accessibilityRole="button"
            onPress={() => setOpen(isOpen ? null : i)}
            style={s.phraseCard}
          >
            <Text style={s.mistakeWrong}>✗ {m.wrong}</Text>
            {isOpen ? (
              <>
                <Text style={s.mistakeRight}>✓ {m.right}</Text>
                <View style={s.sayBox}>
                  <Text style={s.sayLabel}>उच्चार मार्गदर्शक (अंदाजे)</Text>
                  <Text style={s.sayText}>{m.say}</Text>
                </View>
                <Text style={s.marathiBody}>{m.why}</Text>
                <Listen text={m.right.split(" / ")[0]} compact />
                <View style={{ gap: 10, marginTop: 14 }}>
                  <Button
                    secondary
                    title={
                      progress.reviews[id]
                        ? "उजळणीत जोडले ✓"
                        : "उजळणीसाठी जोडा · Add to review"
                    }
                    disabled={!!progress.reviews[id]}
                    onPress={() => review(id, false)}
                  />
                </View>
              </>
            ) : (
              <Text style={s.link}>बरोबर वाक्य पाहा →</Text>
            )}
          </Pressable>
        );
      })}
    </Shell>
  );
}
