// Optional on-device word check: the learner says the target sentence and
// sees which words the phone's recogniser wrote down. Recognition only — not
// pronunciation or accent scoring. Shown only when on-device recognition
// with an installed English model is available; otherwise it renders nothing
// and the record-and-compare flow is unchanged. Never uses the internet.
import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { AppText as Text, Button } from "./ui";
import { s } from "./styles";
import { checkWords, heardLine, pickLocale, type WordCheck as Result } from "../state/wordcheck";

type Sub = { remove: () => void };
type Recognizer = {
  isRecognitionAvailable(): boolean;
  supportsOnDeviceRecognition(): boolean;
  getSupportedLocales(o: { androidRecognitionServicePackage?: string }): Promise<{
    locales: string[];
    installedLocales: string[];
  }>;
  requestPermissionsAsync(): Promise<{ granted: boolean }>;
  start(o: Record<string, unknown>): void;
  abort(): void;
  stop(): void;
  addListener(event: string, fn: (e: any) => void): Sub;
};

// Loaded lazily: a build without the native module (or the web build, whose
// browser recogniser uploads audio) must keep working without it.
let cached: Recognizer | null | undefined;
function recognizer(): Recognizer | null {
  if (cached !== undefined) return cached;
  cached = null;
  if (Platform.OS === "web") return cached;
  try {
    cached =
      (require("expo-speech-recognition").ExpoSpeechRecognitionModule as Recognizer) ?? null;
  } catch {
    cached = null;
  }
  return cached ?? null;
}

const ON_DEVICE_SERVICE = "com.google.android.as";

// The installed offline English locale, or null when on-device recognition
// cannot run (old OS, no model downloaded, no recogniser).
export async function onDeviceLocale(): Promise<string | null> {
  const M = recognizer();
  if (!M) return null;
  try {
    if (!M.isRecognitionAvailable() || !M.supportsOnDeviceRecognition()) return null;
    const r = await M.getSupportedLocales(
      Platform.OS === "android" ? { androidRecognitionServicePackage: ON_DEVICE_SERVICE } : {},
    );
    // Android lists offline models separately; iOS on-device covers its locales.
    return pickLocale(
      Platform.OS === "android" || r.installedLocales.length ? r.installedLocales : r.locales,
    );
  } catch {
    return null;
  }
}

export function WordCheck({ target, disabled = false }: { target: string; disabled?: boolean }) {
  // undefined: still checking; null: unavailable (render nothing).
  const [locale, setLocale] = useState<string | null | undefined>(undefined);
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [note, setNote] = useState("");
  const subs = useRef<Sub[]>([]);
  const heard = useRef<string[]>([]);
  const clear = () => {
    subs.current.forEach((x) => x.remove());
    subs.current = [];
  };
  useEffect(() => {
    let live = true;
    void onDeviceLocale().then((l) => live && setLocale(l));
    return () => {
      live = false;
      clear();
      try {
        recognizer()?.abort();
      } catch {}
    };
  }, []);
  useEffect(() => {
    setResult(null);
    setNote("");
  }, [target]);
  const M = recognizer();
  if (!locale || !M) return null;

  const start = async () => {
    try {
      const perm = await M.requestPermissionsAsync();
      if (!perm.granted) return setLocale(null);
      clear();
      heard.current = [];
      setResult(null);
      setNote("");
      subs.current = [
        M.addListener("result", (e) => {
          if (e.isFinal)
            heard.current = (e.results ?? []).map((r: { transcript: string }) => r.transcript);
        }),
        M.addListener("error", (e) => {
          setListening(false);
          if (e.error === "no-speech" || e.error === "speech-timeout")
            setNote("काहीच ऐकू आले नाही. पुन्हा प्रयत्न करा.");
          else if (e.error !== "aborted") setLocale(null); // fall back quietly
        }),
        M.addListener("end", () => {
          setListening(false);
          clear();
          if (heard.current.length) setResult(checkWords(target, heard.current));
        }),
      ];
      M.start({
        lang: locale,
        requiresOnDeviceRecognition: true,
        interimResults: false,
        maxAlternatives: 5,
        continuous: false,
        addsPunctuation: false,
        ...(Platform.OS === "android"
          ? { androidRecognitionServicePackage: ON_DEVICE_SERVICE }
          : {}),
      });
      setListening(true);
    } catch {
      setListening(false);
      setLocale(null);
    }
  };

  const missed = result ? result.words.filter((w) => !w.heard).length : 0;
  return (
    <View style={s.wordCheck}>
      <Text style={s.rowTitle}>शब्द ओळख · फोनवरच</Text>
      <Text style={s.smallMuted}>
        वाक्य म्हणा; फोनने कोणते शब्द ओळखले ते दिसेल. ही फक्त शब्द ओळख आहे,
        उच्चाराचे मूल्यमापन नाही.
      </Text>
      <Button
        small
        secondary={!listening}
        icon={listening ? "stop" : "mic-outline"}
        disabled={disabled}
        title={listening ? "ऐकत आहे… थांबवा" : "म्हणा आणि शब्द पाहा"}
        onPress={() => {
          if (listening) {
            try {
              M.stop();
            } catch {}
          } else void start();
        }}
      />
      {!!note && (
        <Text accessibilityLiveRegion="polite" style={s.body}>
          {note}
        </Text>
      )}
      {result && (
        <View accessibilityLiveRegion="polite">
          <Text style={s.rowTitle}>{heardLine(result)}</Text>
          <View style={s.heardRow}>
            {/* The chip is a View: on Android a Text with its own background
                was measured shorter than drawn and overlapped the next line. */}
            {result.words.map((w, i) => (
              <View
                key={i}
                accessible
                accessibilityLabel={`${w.text}: ${w.heard ? "ऐकू आला" : "ऐकू आला नाही"}`}
                style={[s.heardChip, !w.heard && s.heardChipMissed]}
              >
                <Text style={[s.heardChipText, !w.heard && s.heardChipTextMissed]}>
                  {w.text}
                </Text>
              </View>
            ))}
          </View>
          <Text style={s.smallMuted}>
            {missed
              ? "हायलाइट केलेले शब्द मॉडेलमध्ये पुन्हा ऐका आणि हळू, स्पष्ट म्हणा."
              : "सर्व शब्द ओळखले गेले. छान!"}
          </Text>
        </View>
      )}
    </View>
  );
}
