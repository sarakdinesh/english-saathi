import React, { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { drillCards, situations } from "../data/speaking";
import { useProgress } from "../state/progress";
import { wordAt, wordSpans } from "../state/shadowing";
import {
  AppText as Text,
  Button,
  Chips,
  Heading,
  Label,
  Shell,
} from "../components/ui";
import { s } from "../components/styles";
import { C } from "../components/theme";

// Shadowing: the phone reads a sentence, the current word lights up, and the
// learner speaks at the same time. Highlighting needs a voice that reports
// word positions (most Android 8+ and iOS voices); otherwise it just reads.
export default function SpeakAlong() {
  const { progress, activity } = useProgress();
  const [topic, setTopic] = useState("all");
  const [index, setIndex] = useState(0);
  const [at, setAt] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [note, setNote] = useState("");
  const request = useRef(0);
  const pool = useMemo(
    () => drillCards.filter((c) => topic === "all" || c.situation === topic),
    [topic],
  );
  const card = pool[index % pool.length];
  const spans = useMemo(() => wordSpans(card.en), [card]);
  const current = wordAt(spans, at);

  const stop = useCallback(() => {
    request.current++;
    void Speech.stop();
    setPlaying(false);
    setAt(-1);
  }, []);
  useFocusEffect(useCallback(() => stop, [stop]));

  const play = async (rate: number) => {
    if (!progress.settings.sound) return setNote("आवाज सेटिंग्जमध्ये बंद आहे.");
    const id = ++request.current;
    setAt(-1);
    await Speech.stop();
    if (id !== request.current) return;
    const end = (ok: boolean) => {
      if (id !== request.current) return;
      setPlaying(false);
      setAt(-1);
      if (ok) activity("speak");
      else setNote("आवाज उपलब्ध नाही. वाक्य वाचून सोबत बोला.");
    };
    setNote("");
    setPlaying(true);
    Speech.speak(card.en, {
      language: "en-US",
      rate,
      onBoundary: (e: any) =>
        id === request.current && setAt(e?.charIndex ?? -1),
      onDone: () => end(true),
      onStopped: () => end(true),
      onError: () => end(false),
    });
  };
  const move = (step: number) => {
    stop();
    setIndex((i) => (i + step + pool.length) % pool.length);
  };

  return (
    <Shell>
      <Label>सोबत बोला · SPEAK ALONG</Label>
      <Heading
        title="आवाजासोबत बोला"
        sub="फोन वाक्य वाचतो, चालू शब्द उजळतो. त्याच वेळी तुम्हीही मोठ्याने बोला — लाजायचे कारण नाही, तुम्ही एकटे बोलत नाही."
      />
      <Chips
        label="विषय निवडा"
        value={topic}
        options={[
          ["all", "सर्व"],
          ...situations.map((x) => [x.id, x.mr] as const),
        ]}
        onChange={(v) => {
          stop();
          setTopic(v);
          setIndex(0);
        }}
      />
      <View style={[s.phraseCard, { gap: 12, marginTop: 14 }]}>
        <Text style={s.smallMuted}>
          {(index % pool.length) + 1} / {pool.length}
        </Text>
        <Text
          style={{
            fontSize: 26,
            lineHeight: 40,
            fontWeight: "700",
            color: C.ink,
          }}
          accessibilityLabel={card.en}
        >
          {spans.map((w, i) => (
            <Text
              key={i}
              style={
                i === current
                  ? { backgroundColor: C.limeTint, color: C.green }
                  : i < current
                    ? { color: C.green }
                    : undefined
              }
            >
              {w.word}
              {i < spans.length - 1 ? " " : ""}
            </Text>
          ))}
        </Text>
        <Text style={s.sayText}>{card.say}</Text>
        <Text style={s.marathiBody}>{card.mr}</Text>
        {playing ? (
          <Button icon="stop" title="थांबवा · Stop" onPress={stop} />
        ) : (
          <View style={{ gap: 10 }}>
            <Button
              icon="play"
              title="सोबत बोला · Speak along"
              onPress={() => void play(0.75)}
            />
            <Button
              secondary
              icon="hourglass-outline"
              title="अजून हळू · Slower"
              onPress={() => void play(0.55)}
            />
          </View>
        )}
        {!!note && <Text style={s.body}>{note}</Text>}
        <Text style={s.smallMuted}>
          १. आधी एकदा ऐका · २. मग आवाजासोबत बोला · ३. शेवटी आवाजाशिवाय स्वतः
          म्हणा.
        </Text>
        <View style={s.pillRow}>
          <Button
            small
            secondary
            icon="arrow-back"
            title="मागे"
            onPress={() => move(-1)}
          />
          <Button
            small
            secondary
            icon="arrow-forward"
            title="पुढे"
            onPress={() => move(1)}
          />
        </View>
      </View>
    </Shell>
  );
}
