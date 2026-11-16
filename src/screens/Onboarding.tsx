import type { StackProps } from "../navigation/types";
import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useProgress } from "../state/progress";
import {
  GOALS,
  MINUTES,
  goalInfo,
  recommendedMinutes,
  type Goal,
  type StudyMinutes,
} from "../state/onboarding";
import type { PathId } from "../curriculum/types";
import { pathInfo } from "./Learn";
import { AppText as Text, Button, Heading, Label, Shell } from "../components/ui";
import { s } from "../components/styles";
import { BRAND } from "../brand";
import { Listen } from "../components/Audio";
import { WordCheck } from "../components/WordCheck";
import { Celebration } from "../components/Celebrate";
import { C } from "../components/theme";

// The first thing a new learner says: short, true for everyone, and easy for
// the phone's recogniser.
export const FIRST_SENTENCE = "Hello, I am learning English.";

const levels: { path: PathId; mr: string; sub: string }[] = [
  {
    path: "foundation",
    mr: "मला इंग्रजी अक्षरे आणि आवाज शिकायचे आहेत",
    sub: "अगदी सुरुवातीपासून: वर्णमाला, आवाज, पहिले शब्द",
  },
  {
    path: "beginner",
    mr: "मला थोडे शब्द आणि वाक्ये येतात",
    sub: "रोजचे साधे संभाषण शिकूया",
  },
  {
    path: "intermediate",
    mr: "मी साधे इंग्रजी बोलू शकतो/शकते",
    sub: "लांब उत्तरे, मत, कामाचे प्रसंग",
  },
];

function Choice({
  title,
  sub,
  on,
  onPress,
}: {
  title: string;
  sub?: string;
  on: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: on }}
      onPress={onPress}
      style={[s.option, on && { borderColor: C.green, backgroundColor: C.successSoft }]}
    >
      <View style={{ flex: 1 }}>
        <Text style={s.rowTitle}>
          {on ? "✓ " : ""}
          {title}
        </Text>
        {!!sub && <Text style={s.smallMuted}>{sub}</Text>}
      </View>
    </Pressable>
  );
}

// First-run onboarding in Marathi: goal, daily time, starting level. Every
// choice can be changed later (Settings, Learn). Skipping keeps the defaults.
export default function Onboarding({ navigation }: StackProps<"Onboarding">) {
  const { progress, saveProfile, setPath, activity } = useProgress();
  const [step, setStep] = useState(0);
  const [spoke, setSpoke] = useState(false);
  const [goal, setGoal] = useState<Goal>(progress.profile?.goal ?? "daily");
  const [minutes, setMinutes] = useState<StudyMinutes>(
    progress.profile?.studyMinutes ?? 15,
  );
  const save = () =>
    saveProfile({ onboarded: true, goal, studyMinutes: minutes, at: Date.now() });
  const toMain = () =>
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }),
    );
  // Fixed at open: saving the profile on the last choice must not change it.
  const [first] = useState(!progress.profile);
  // New learners say their first sentence before Home; returning ones go back.
  const pickLevel = (path: PathId) => {
    save();
    setPath(path);
    if (first) setStep(3);
    else toMain();
  };
  const said = () => {
    if (spoke) return;
    setSpoke(true);
    activity("speak");
  };
  return (
    <Shell>
      <Label>
        {first ? "स्वागत · WELCOME" : "तुमची निवड · YOUR CHOICES"} · {step + 1}/
        {first ? 4 : 3}
      </Label>
      {step === 0 && (
        <>
          {first && (
            <View style={[s.logoPlate, { marginBottom: 12 }]}>
              <Image
                source={require("../../assets/logo-stacked.png")}
                accessibilityLabel={BRAND.full}
                resizeMode="contain"
                style={{ width: "100%", height: 170 }}
              />
            </View>
          )}
          <Heading
            title="तुम्हाला इंग्रजी कशासाठी शिकायचे आहे?"
            sub="तुमच्या ध्येयानुसार रोजची वाक्ये निवडली जातील. नंतर बदलता येईल."
          />
          <View style={{ gap: 10 }}>
            {GOALS.map((g) => (
              <Choice
                key={g}
                on={goal === g}
                title={`${goalInfo[g].mr} · ${goalInfo[g].en}`}
                sub={goalInfo[g].sub}
                onPress={() => setGoal(g)}
              />
            ))}
          </View>
          {/* Said once here, plainly; recording screens keep a one-line hint. */}
          <View style={[s.noteBox, { marginTop: 16 }]}>
            <Text style={s.rowTitle}>हे ॲप कसे मदत करते · How it works</Text>
            <Text style={s.body}>
              🔊 फोनचा आवाज इंग्रजी वाक्य ऐकवतो.{"\n"}🗣️ तुम्ही ते मोठ्याने
              म्हणता.{"\n"}🎙️ हवे तर रेकॉर्ड करून स्वतःचा आवाज ऐकता आणि तुलना
              करता.
            </Text>
            <Text style={[s.smallMuted, { marginTop: 6 }]}>
              काही फोनवर ॲप तुम्ही म्हटलेले कोणते शब्द ओळखले ते दाखवते —
              फोनवरच, इंटरनेटशिवाय. ॲप गुण देत नाही आणि उच्चार तपासत नाही;
              बरोबर आहे की नाही ते तुम्ही स्वतः ठरवता. इंटरनेटची गरज नाही.
            </Text>
          </View>
          <View style={{ height: 18 }} />
          <Button title="पुढे · Next" onPress={() => setStep(1)} />
        </>
      )}
      {step === 1 && (
        <>
          <Heading
            title="रोज किती वेळ देऊ शकता?"
            sub="अगदी नवशिक्यांसाठी दररोज १० मिनिटे पुरेशी आहेत. नियमितपणा जास्त महत्त्वाचा आहे."
          />
          <View style={{ gap: 10 }}>
            {MINUTES.map((m) => (
              <Choice
                key={m}
                on={minutes === m}
                title={`दररोज ${m} मिनिटे`}
                sub={
                  m === recommendedMinutes(progress.path)
                    ? "तुमच्यासाठी सुचवलेले"
                    : undefined
                }
                onPress={() => setMinutes(m)}
              />
            ))}
          </View>
          <View style={{ height: 18 }} />
          <Button title="पुढे · Next" onPress={() => setStep(2)} />
          <View style={{ height: 10 }} />
          <Button secondary title="मागे · Back" onPress={() => setStep(0)} />
        </>
      )}
      {step === 2 && (
        <>
          <Heading
            title="तुम्ही कुठून सुरू कराल?"
            sub="तुमचे सध्याचे इंग्रजी सर्वात जवळ कोणते वाटते ते निवडा. सर्व धडे नेहमी खुले असतात."
          />
          <View style={{ gap: 10 }}>
            {levels.map((l) => (
              <Choice
                key={l.path}
                on={false}
                title={l.mr}
                sub={`${pathInfo[l.path].en} · ${l.sub}`}
                onPress={() => pickLevel(l.path)}
              />
            ))}
          </View>
          <View style={{ height: 18 }} />
          <Button
            secondary
            title="खात्री नाही? छोटी चाचणी घ्या"
            onPress={() => {
              save();
              navigation.navigate("Placement");
            }}
          />
          <View style={{ height: 10 }} />
          <Button secondary title="मागे · Back" onPress={() => setStep(1)} />
        </>
      )}
      {step === 3 && (
        <>
          <Heading
            title="तुमचे पहिले इंग्रजी वाक्य!"
            sub="आधी ऐका, मग मोठ्याने म्हणा. चूक झाली तरी चालेल — बोलणे हाच पहिला विजय."
          />
          <View style={s.phraseCard}>
            <Text style={[s.phraseEn, { fontSize: 24, lineHeight: 34 }]}>{FIRST_SENTENCE}</Text>
            <Text style={s.sayText}>हॅलो, आय ॲम लर्निंग इंग्लिश.</Text>
            <Text style={s.marathiBody}>नमस्कार, मी इंग्रजी शिकत आहे.</Text>
            <Listen text={FIRST_SENTENCE} compact />
            <WordCheck
              target={FIRST_SENTENCE}
              onResult={(r) => {
                if (r.heard === r.total) said();
              }}
            />
          </View>
          <View style={{ height: 14 }} />
          {spoke ? (
            <>
              <Celebration
                emoji="🎉"
                title="छान! तुम्ही आज इंग्रजी बोललात."
                sub="हीच सुरुवात आहे. रोज थोडे बोलूया."
              />
              <Button title="सुरू करूया · Let's start" onPress={toMain} />
            </>
          ) : (
            <Button title="मी म्हणालो / म्हणाले · I said it" onPress={said} />
          )}
        </>
      )}
      {first && step < 3 && (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            save();
            toMain();
          }}
          style={{ minHeight: 48, justifyContent: "center", marginTop: 14 }}
        >
          <Text style={[s.link, { textAlign: "center" }]}>
            आत्ता वगळा · Skip for now
          </Text>
        </Pressable>
      )}
    </Shell>
  );
}
