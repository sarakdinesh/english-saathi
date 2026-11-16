import React, { useCallback, useState } from "react";
import { Platform, View } from "react-native";
import { useShareCard } from "../components/ShareCard";
import { useFocusEffect } from "@react-navigation/native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Directory, File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useProgress, localDate, streakFor } from "../state/progress";
import {
  DIARY_PROMPT,
  dayNumber,
  diaryName,
  nextMilestone,
  parseEntries,
  shareText,
  type DiaryEntry,
} from "../state/diary";
import { BRAND } from "../brand";
import { Recorder } from "../components/Audio";
import { AppText as Text, Button, Heading, Label, Shell } from "../components/ui";
import { s } from "../components/styles";

// Recordings are kept in app storage (not cache, not backups) until deleted.
const native = Platform.OS !== "web";
const folder = () => new Directory(Paths.document, "voice-diary");
const fileOf = (e: DiaryEntry) => new File(folder(), e.name);
function readEntries(): DiaryEntry[] {
  try {
    const dir = folder();
    return dir.exists
      ? parseEntries(dir.list().filter((f) => f instanceof File).map((f) => f.name))
      : [];
  } catch {
    return [];
  }
}

export default function VoiceDiary() {
  const { progress } = useProgress();
  const [entries, setEntries] = useState<DiaryEntry[]>(() => (native ? readEntries() : []));
  const [message, setMessage] = useState("");
  const [current, setCurrent] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);
  const playing = status.playing ? current : null;
  useFocusEffect(
    useCallback(
      () => () => {
        try {
          player.pause();
        } catch {}
      },
      [player],
    ),
  );

  const today = localDate();
  const first = entries[0]?.date;
  const recordedToday = entries.some((e) => e.date === today);
  const next = nextMilestone(first, today, recordedToday);
  const now = first ? dayNumber(first, today) : 1;

  const play = (e: DiaryEntry) => {
    try {
      if (playing === e.name) return player.pause();
      if (!progress.settings.sound) return setMessage("आवाज सेटिंग्जमध्ये बंद आहे.");
      player.replace(fileOf(e).uri);
      setCurrent(e.name);
      player.play();
    } catch {
      setMessage("हे रेकॉर्डिंग वाजवता आले नाही.");
    }
  };
  const save = (tempUri: string) => {
    try {
      const dir = folder();
      dir.create({ intermediates: true, idempotent: true });
      // Copy first, then replace today's recording (one per day), so a failed
      // copy never loses the one already saved.
      const tmp = new File(dir, "saving.tmp");
      if (tmp.exists) tmp.delete();
      new File(tempUri).copy(tmp);
      entries.filter((e) => e.date === today).forEach((e) => fileOf(e).delete());
      tmp.move(new File(dir, diaryName(today, tempUri)));
      setEntries(readEntries());
      setMessage(recordedToday ? "आजचे रेकॉर्डिंग बदलले." : "डायरीत जतन केले! 🎉");
    } catch {
      setMessage("जतन करता आले नाही. फोनमध्ये जागा आहे का ते तपासा.");
    }
  };
  const remove = (e: DiaryEntry) => {
    if (confirm !== e.name) return setConfirm(e.name);
    try {
      if (playing === e.name) player.pause();
      fileOf(e).delete();
    } catch {}
    setConfirm(null);
    setEntries(readEntries());
  };
  // Only when the learner taps Share on that recording; nothing is uploaded otherwise.
  const shareEntry = async (e: DiaryEntry) => {
    try {
      await Sharing.shareAsync(fileOf(e).uri, {
        mimeType: "audio/mp4",
        dialogTitle: `${BRAND.mr} · दिवस ${dayNumber(first!, e.date)}`,
      });
    } catch {
      setMessage("हे रेकॉर्डिंग शेअर करता आले नाही.");
    }
  };
  const progressShare = useShareCard(
    shareText(
      {
        days: progress.dates.length,
        streak: streakFor(progress.dates),
        lessons: progress.completed.length,
        spokeDays: Object.values(progress.daily).filter((a) => a.includes("speak")).length,
        diary: entries.length,
      },
      BRAND.playUrl,
    ),
  );

  const latest = entries[entries.length - 1];
  return (
    <Shell>
      <Label>आवाज डायरी · VOICE DIARY</Label>
      <Heading
        title="तुमचा आवाज, तुमची प्रगती"
        sub="एकाच विषयावर काही दिवसांनी पुन्हा ३० सेकंद बोला. पहिला आणि आजचा आवाज ऐकून फरक स्वतः ऐका."
      />
      {!native ? (
        <View style={s.dailyCard}>
          <Text style={s.body}>
            आवाज डायरी फोनवरील ॲपमध्ये उपलब्ध आहे. रेकॉर्डिंग फक्त तुमच्या फोनवर
            राहतात.
          </Text>
        </View>
      ) : (
        <>
          <View style={[s.dailyCard, { gap: 6 }]}>
            <Text style={s.rowTitle}>
              {entries.length
                ? `${entries.length} रेकॉर्डिंग · आज दिवस ${now}`
                : "पहिले रेकॉर्डिंग आजच करा"}
            </Text>
            <Text style={s.body}>
              {next === null
                ? "सर्व टप्पे पूर्ण! हवे तेव्हा नवीन रेकॉर्डिंग करा."
                : next === now
                  ? `आज दिवस ${now} — रेकॉर्ड करण्याचा दिवस आहे!`
                  : `पुढचे रेकॉर्डिंग: दिवस ${next} (${next - now} दिवसांनी)`}
            </Text>
          </View>
          {entries.length > 1 && (
            <View style={[s.phraseCard, { gap: 10 }]}>
              <Text style={s.rowTitle}>पहिला आणि आजचा आवाज · Compare</Text>
              {[entries[0], latest].map((e) => (
                <Button
                  key={e.name}
                  secondary={playing !== e.name}
                  icon={playing === e.name ? "stop" : "play"}
                  title={`दिवस ${dayNumber(first!, e.date)} ऐका`}
                  onPress={() => play(e)}
                />
              ))}
              <Text style={s.smallMuted}>
                फरक मित्रांना ऐकवायचा आहे? खालील यादीतून दिवस १ आणि आजचे रेकॉर्डिंग शेअर करा.
              </Text>
            </View>
          )}
          <View style={{ height: 14 }} />
          <View style={s.phraseCard}>
            <Label>आजचा विषय · TODAY'S TOPIC</Label>
            <Text style={s.exampleEnglish}>{DIARY_PROMPT.en}</Text>
            <Text style={[s.marathiBody, { marginTop: 6 }]}>{DIARY_PROMPT.mr}</Text>
          </View>
          <View style={{ height: 14 }} />
          <Recorder onSave={save} />
          {!!message && (
            <Text accessibilityLiveRegion="polite" style={[s.body, { marginTop: 10 }]}>
              {message}
            </Text>
          )}
          {entries.length > 0 && (
            <View style={{ gap: 10, marginTop: 18 }}>
              <Text style={s.sectionTitle}>सर्व रेकॉर्डिंग</Text>
              {[...entries].reverse().map((e) => (
                <View key={e.name} style={[s.dailyCard, { gap: 8 }]}>
                  <Text style={s.rowTitle}>
                    दिवस {dayNumber(first!, e.date)} · {e.date}
                  </Text>
                  <View style={s.pillRow}>
                    <Button
                      small
                      secondary={playing !== e.name}
                      icon={playing === e.name ? "stop" : "play"}
                      title={playing === e.name ? "थांबवा" : "ऐका"}
                      onPress={() => play(e)}
                    />
                    <Button
                      small
                      secondary
                      icon="share-social-outline"
                      title="शेअर"
                      onPress={() => void shareEntry(e)}
                    />
                    <Button
                      small
                      secondary
                      icon="trash-outline"
                      title={confirm === e.name ? "नक्की हटवा?" : "हटवा"}
                      onPress={() => remove(e)}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}
        </>
      )}
      <View style={[s.phraseCard, { gap: 10, marginTop: 18 }]}>
        <Text style={s.rowTitle}>मित्रांना सांगा · Share your progress</Text>
        <Text style={s.smallMuted}>
          तुमची प्रगती चित्र म्हणून WhatsApp किंवा इतर ॲपवर शेअर करा. यात फक्त आकडे
          असतात; रेकॉर्डिंग तुम्ही स्वतः "शेअर" दाबले तरच जाते.
        </Text>
        <Button
          icon="share-social-outline"
          title="प्रगती शेअर करा · Share"
          onPress={() => void progressShare.share()}
        />
        {progressShare.card}
      </View>
    </Shell>
  );
}
