import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { soundGroups } from "../data/soundPairs";
import { useSpeech } from "../components/Audio";
import { AppText as Text, Button, Chips, Heading, Label, Shell } from "../components/ui";
import { s } from "../components/styles";

type Round = { group: string; pair: [string, string]; answer: string };

function newRound(groupId: string): Round {
  const pool = soundGroups.filter((g) => groupId === "all" || g.id === groupId);
  const g = pool[Math.floor(Math.random() * pool.length)];
  const pair = g.pairs[Math.floor(Math.random() * g.pairs.length)];
  return { group: g.id, pair, answer: pair[Math.floor(Math.random() * 2)] };
}

// Listen-and-choose game: the phone says one word of a pair; the learner
// picks which one they heard, then hears both and says them aloud.
export default function SoundPairs() {
  const { play, status } = useSpeech();
  const [groupId, setGroupId] = useState("all");
  const [round, setRound] = useState(() => newRound("all"));
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const group = useMemo(() => soundGroups.find((g) => g.id === round.group)!, [round]);

  const next = (id = groupId) => {
    setRound(newRound(id));
    setPicked(null);
  };
  const choose = (w: string) => {
    if (picked) return;
    setPicked(w);
    setScore((x) => ({ right: x.right + (w === round.answer ? 1 : 0), total: x.total + 1 }));
  };
  const right = picked === round.answer;

  return (
    <Shell>
      <Label>आवाजांच्या जोड्या · SOUND PAIRS</Label>
      <Heading
        title="कोणता शब्द ऐकला?"
        sub="मराठी बोलणाऱ्यांना गोंधळात टाकणारे आवाज. ऐका, निवडा, मग दोन्ही शब्द मोठ्याने म्हणा."
      />
      <Chips
        label="आवाज निवडा"
        value={groupId}
        options={[["all", "सर्व"], ...soundGroups.map((g) => [g.id, g.title] as const)]}
        onChange={(v) => {
          setGroupId(v);
          next(v);
        }}
      />
      <Text style={[s.smallMuted, { marginTop: 10 }]}>
        बरोबर {score.right} / {score.total}
      </Text>
      <View style={[s.phraseCard, { gap: 12, marginTop: 12 }]}>
        <Text style={s.rowTitle}>
          {group.title} · {group.mr}
        </Text>
        <Button
          icon="volume-high"
          title="शब्द ऐका · Listen"
          onPress={() => void play(round.answer, 0.8)}
        />
        {!!status && /उपलब्ध नाही|बंद आहे/.test(status) && (
          <Text style={s.body}>{status}</Text>
        )}
        <View style={s.pillRow}>
          {round.pair.map((w) => (
            <Button
              key={w}
              secondary={picked !== w}
              title={w}
              onPress={() => choose(w)}
            />
          ))}
        </View>
        {!!picked && (
          <View accessibilityLiveRegion="polite" style={{ gap: 10 }}>
            <Text style={s.sectionTitle}>
              {right ? "✓ बरोबर!" : `✗ हा शब्द होता: ${round.answer}`}
            </Text>
            <Text style={s.body}>💡 {group.tip}</Text>
            <View style={s.pillRow}>
              {round.pair.map((w) => (
                <Button
                  key={w}
                  small
                  secondary
                  icon="play"
                  title={w}
                  onPress={() => void play(w, 0.7)}
                />
              ))}
            </View>
            <Text style={s.smallMuted}>
              आता दोन्ही शब्द मोठ्याने म्हणा: {round.pair.join(" — ")}
            </Text>
            <Button title="पुढचा · Next" onPress={() => next()} />
          </View>
        )}
      </View>
    </Shell>
  );
}
