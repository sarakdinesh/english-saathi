import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Speech from "expo-speech";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { File } from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { AppText as Text, Button } from "./ui";
import { C } from "./theme";
import { s } from "./styles";
import { WordCheck } from "./WordCheck";
import { useProgress } from "../state/progress";
let speechRequest = 0;
const voiceTimeout = <T,>(p: Promise<T>, fallback: T) =>
  Promise.race([p, new Promise<T>((r) => setTimeout(() => r(fallback), 2500))]);

// Shared English speech playback: normal/slow rate, sequences of lines,
// replay/stop and a clear message when no English voice is installed.
export function useSpeech() {
  const { progress } = useProgress();
  const [status, setStatus] = useState("");
  const [playing, setPlaying] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      void Speech.stop();
    };
  }, []);
  useFocusEffect(
    useCallback(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
        speechRequest++;
        void Speech.stop();
      };
    }, []),
  );
  const stop = useCallback(() => {
    speechRequest++;
    void Speech.stop();
    setPlaying(false);
    setStatus("थांबवले.");
  }, []);
  const play = async (
    texts: string | string[],
    rate = 1,
    language = "en-US",
  ) => {
    const lines = Array.isArray(texts) ? texts : [texts];
    const request = ++speechRequest;
    try {
      setStatus("आवाज तयार होत आहे…");
      await Speech.stop();
      if (!progress.settings.sound) {
        setStatus("आवाज सेटिंग्जमध्ये बंद आहे.");
        return;
      }
      const voices = await voiceTimeout(
        Speech.getAvailableVoicesAsync(),
        [] as Speech.Voice[],
      );
      if (!mounted.current || request !== speechRequest) return;
      if (!voices.some((v) => v.language.toLowerCase().startsWith("en"))) {
        setStatus(
          "इंग्रजी आवाज उपलब्ध नाही. Device मध्ये English voice जोडा किंवा वाक्य वाचून सराव करा.",
        );
        return;
      }
      setPlaying(true);
      setStatus("ऐकत आहात…");
      const fail = () => {
        if (mounted.current && request === speechRequest) {
          setStatus("आवाज उपलब्ध नाही. वाक्य वाचून सराव करा.");
          setPlaying(false);
        }
      };
      const speakAt = (i: number) => {
        if (!mounted.current || request !== speechRequest) return;
        if (i >= lines.length) {
          setStatus("पुन्हा ऐकू शकता.");
          setPlaying(false);
          return;
        }
        Speech.speak(lines[i], {
          language,
          rate,
          onDone: () => speakAt(i + 1),
          onStopped: () => {
            if (mounted.current && request === speechRequest) setPlaying(false);
          },
          onError: fail,
        });
      };
      speakAt(0);
    } catch {
      setPlaying(false);
      setStatus("आवाज उपलब्ध नाही. वाक्य वाचून सराव करा.");
    }
  };
  return { play, stop, status, playing };
}

export function Listen({
  text,
  compact = false,
}: {
  text: string;
  compact?: boolean;
}) {
  const { play, stop, status, playing } = useSpeech();
  return (
    <View style={{ gap: 8, marginTop: 12 }}>
      <View style={s.pillRow}>
        {playing ? (
          <Button small icon="stop" title="थांबवा · Stop" onPress={stop} />
        ) : (
          <>
            <Button
              small
              secondary
              icon="play"
              title={compact ? "ऐका" : "ऐका · Listen"}
              onPress={() => void play(text, 1)}
            />
            <Button
              small
              secondary
              icon="hourglass-outline"
              title={compact ? "हळू" : "हळू · Slow"}
              onPress={() => void play(text, compact ? 0.6 : 0.65)}
            />
          </>
        )}
      </View>
      {!!status && (
        <Text accessibilityLiveRegion="polite" style={s.body}>
          {status}
        </Text>
      )}
    </View>
  );
}

// A small speaker button for one line inside a conversation or pattern list.
export function Speaker({ text, label }: { text: string; label?: string }) {
  const { play, stop, playing, status } = useSpeech();
  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          playing ? "Stop audio" : (label ?? `Listen: ${text}`)
        }
        onPress={() => (playing ? stop() : void play(text, 0.9))}
        style={s.speaker}
      >
        <Ionicons
          name={playing ? "stop" : "volume-high"}
          size={20}
          color={C.green}
        />
      </Pressable>
      {!playing && /उपलब्ध नाही|बंद आहे/.test(status) && (
        <Text style={s.smallMuted}>{status}</Text>
      )}
    </View>
  );
}

// Plays a whole list of lines in order, with slow replay and stop.
export function ListenAll({
  lines,
  title,
}: {
  lines: string[];
  title?: string;
}) {
  const { play, stop, playing, status } = useSpeech();
  return (
    <View style={{ gap: 10 }}>
      {!!title && <Text style={s.rowTitle}>{title}</Text>}
      <View style={s.pillRow}>
        {playing ? (
          <Button small icon="stop" title="थांबवा · Stop" onPress={stop} />
        ) : (
          <>
            <Button
              small
              secondary
              icon="play"
              title="पूर्ण ऐका"
              onPress={() => void play(lines, 0.95)}
            />
            <Button
              small
              secondary
              icon="hourglass-outline"
              title="हळू ऐका"
              onPress={() => void play(lines, 0.6)}
            />
          </>
        )}
      </View>
      {!!status && (
        <Text accessibilityLiveRegion="polite" style={s.body}>
          {status}
        </Text>
      )}
    </View>
  );
}

// Plays one sentence in each installed English locale. It never claims more
// voices than the device really offers.
export function VoiceVariety({ text }: { text: string }) {
  const { play, status } = useSpeech();
  const [locales, setLocales] = useState<string[] | null>(null);
  useEffect(() => {
    let live = true;
    voiceTimeout(Speech.getAvailableVoicesAsync(), [] as Speech.Voice[])
      .then((v) => {
        if (!live) return;
        const set = new Set(
          v
            .map((x) => x.language.replace("_", "-"))
            .filter((l) => l.toLowerCase().startsWith("en-")),
        );
        setLocales(Array.from(set).sort().slice(0, 6));
      })
      .catch(() => live && setLocales([]));
    return () => {
      live = false;
    };
  }, []);
  const names: Record<string, string> = {
    "en-US": "American",
    "en-GB": "British",
    "en-IN": "Indian",
    "en-AU": "Australian",
  };
  return (
    <View style={{ gap: 10 }}>
      <Text style={s.body}>
        {locales === null
          ? "आवाज तपासत आहे…"
          : locales.length > 1
            ? `या device वर ${locales.length} इंग्रजी संगणकीय आवाज-शैली उपलब्ध आहेत. हे वेगवेगळ्या खऱ्या व्यक्तींचे रेकॉर्डिंग नाहीत; device चा आवाज-इंजिन वेगवेगळे उच्चार वाचून दाखवतो.`
            : "या device वर फक्त एकच इंग्रजी आवाज उपलब्ध आहे. वेगवेगळ्या वेगाने ऐकून सराव करा."}
      </Text>
      {(locales ?? []).length > 1 &&
        (locales ?? []).map((l) => (
          <Button
            key={l}
            secondary
            title={`${names[l] ?? l} · ${l}`}
            onPress={() => void play(text, 0.9, l)}
          />
        ))}
      <View style={s.pillRow}>
        <Button small secondary icon="flash-outline" title="जलद" onPress={() => void play(text, 1.25)} />
        <Button small secondary icon="hourglass-outline" title="हळू" onPress={() => void play(text, 0.6)} />
      </View>
      {!!status && <Text style={s.smallMuted}>{status}</Text>}
    </View>
  );
}
function erase(uri: string | null) {
  if (!uri) return;
  try {
    if (Platform.OS === "web") {
      if (uri.startsWith("blob:")) URL.revokeObjectURL(uri);
    } else {
      const file = new File(uri);
      if (file.exists) file.delete();
    }
  } catch {
    /* Cache cleanup is best effort. */
  }
}
const PRACTICE_STEPS = [
  { mr: "ऐका", en: "Listen" },
  { mr: "म्हणा", en: "Record" },
  { mr: "तुलना", en: "Compare" },
  { mr: "पुन्हा", en: "Try again" },
];

// Shows where the learner is in listen → record → compare → try again.
function PracticeSteps({ current }: { current: number }) {
  return (
    <View
      style={s.stepRow}
      accessible
      accessibilityLabel={`पायरी ${current + 1} पैकी ${PRACTICE_STEPS.length}: ${PRACTICE_STEPS[current].mr}`}
    >
      {PRACTICE_STEPS.map((step, i) => (
        <View key={step.en} style={[s.stepChip, i === current && s.stepChipOn]}>
          <Text style={[s.stepChipText, i === current && s.stepChipTextOn]}>
            {i + 1}. {step.mr}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function Recorder({
  model,
  onRecorded,
}: {
  model?: string;
  onRecorded?: () => void;
}) {
  const { activity, progress } = useProgress();
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);
  const [uri, setUri] = useState<string | null>(null);
  const uriRef = useRef<string | null>(null);
  const player = useAudioPlayer(null);
  useEffect(() => {
    if (uri) player.replace(uri);
  }, [uri, player]);
  const playerState = useAudioPlayerStatus(player);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const active = useRef(true);
  useFocusEffect(
    useCallback(() => {
      active.current = true;
      return () => {
        active.current = false;
        // On unmount expo-audio has usually released these native objects
        // already; touching a released object throws (found on Android), so
        // every call here must be allowed to fail.
        try {
          player.pause();
        } catch {}
        try {
          if (recorder.isRecording)
            void recorder
              .stop()
              .then(() => erase(recorder.uri))
              .catch(() => {});
        } catch {}
        erase(uriRef.current);
        uriRef.current = null;
        setUri(null);
        void setAudioModeAsync({ allowsRecording: false }).catch(() => {});
      };
    }, [player, recorder]),
  );
  const toggle = async () => {
    setBusy(true);
    try {
      if (recorder.isRecording) {
        await recorder.stop();
        await setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: true,
        });
        if (active.current) {
          uriRef.current = recorder.uri;
          setUri(recorder.uri);
          setMessage("स्वतः ऐका आणि उदाहरणाशी तुलना करा.");
          activity("speak");
          onRecorded?.();
        } else erase(recorder.uri);
      } else {
        await Speech.stop();
        player.pause();
        setMessage(
          "मायक्रोफोनची परवानगी द्या. परवानगी नसेल तरी मोठ्याने बोलून सराव करू शकता.",
        );
        const permission = await Promise.race([
          AudioModule.requestRecordingPermissionsAsync(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(Error("Permission timed out")), 15000),
          ),
        ]);
        if (!permission.granted) {
          setMessage(
            "मायक्रोफोनची परवानगी मिळाली नाही. Device किंवा browser settings मध्ये परवानगी द्या. तोपर्यंत मोठ्याने बोलून सराव करा.",
          );
          return;
        }
        if (!active.current) return;
        erase(uriRef.current);
        uriRef.current = null;
        setUri(null);
        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });
        await recorder.prepareToRecordAsync();
        if (!active.current) return;
        recorder.record();
        setMessage("रेकॉर्ड होत आहे… पूर्ण झाल्यावर थांबवा.");
      }
    } catch {
      setMessage(
        "रेकॉर्ड करता आले नाही. मायक्रोफोन आणि परवानगी तपासा. Browser साठी localhost किंवा HTTPS वापरा.",
      );
    } finally {
      setBusy(false);
    }
  };
  useEffect(() => {
    if (state.isRecording && state.durationMillis >= 60000) void toggle();
  }, [state.durationMillis]);
  return (
    <View style={[s.dailyCard, { gap: 12 }]}>
      <Text style={s.rowTitle}>तुमचा आवाज · Self-practice</Text>
      <PracticeSteps
        current={state.isRecording ? 1 : uri ? (playerState.playing ? 2 : 3) : model ? 0 : 1}
      />
      <Text style={s.body}>
        बोला, ऐका, स्वतः तुलना करा — ॲप गुण देत नाही. (कमाल ६० सेकंद)
      </Text>
      {!!model && (
        <View>
          <Text style={s.smallMuted}>
            आधी मॉडेल वाक्य ऐका, मग स्वतः म्हणा आणि तुमचा आवाज ऐकून तुलना करा.
            उद्देश स्पष्ट समजेल असे बोलणे; एकाच विशिष्ट accent ची नक्कल नाही.
          </Text>
          <Text style={[s.exampleEnglish, { marginTop: 6 }]}>{model}</Text>
          <Listen text={model} compact />
          <WordCheck target={model} disabled={busy || state.isRecording} />
        </View>
      )}
      <Button
        disabled={busy}
        title={
          busy
            ? "कृपया थांबा…"
            : state.isRecording
              ? `थांबवा · Stop (${Math.floor(state.durationMillis / 1000)}s)`
              : "रेकॉर्ड करा · Record"
        }
        onPress={() => {
          if (!busy) void toggle();
        }}
      />
      {!!uri && (
        <>
          <Button
            secondary
            title={
              playerState.playing
                ? "प्लेबॅक थांबवा · Stop replay"
                : "माझा आवाज ऐका · Replay"
            }
            onPress={() => {
              try {
                if (playerState.playing) player.pause();
                else if (!progress.settings.sound)
                  setMessage("आवाज सेटिंग्जमध्ये बंद आहे.");
                else {
                  void player
                    .seekTo(0)
                    .then(() => player.play())
                    .catch(() =>
                      setMessage("प्लेबॅक उपलब्ध नाही. पुन्हा रेकॉर्ड करा."),
                    );
                }
              } catch {
                setMessage("प्लेबॅक उपलब्ध नाही. पुन्हा रेकॉर्ड करून पाहा.");
              }
            }}
          />
          <Button
            secondary
            title="रेकॉर्डिंग हटवा · Delete"
            onPress={() => {
              player.pause();
              erase(uri);
              uriRef.current = null;
              setUri(null);
              setMessage("रेकॉर्डिंग हटवले.");
            }}
          />
        </>
      )}
      <Text accessibilityLiveRegion="polite" style={s.body}>
        {message}
      </Text>
    </View>
  );
}
