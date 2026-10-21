import React, { useState } from "react";
import { Pressable, View } from "react-native";
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
import { C } from "../components/theme";

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
      style={[s.option, on && { borderColor: C.green, backgroundColor: "#E9F2E8" }]}
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
export default function Onboarding({ navigation }: any) {
  const { progress, saveProfile, setPath } = useProgress();
  const [step, setStep] = useState(0);
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
  const pickLevel = (path: PathId) => {
    save();
    setPath(path);
    toMain();
  };
  const first = !progress.profile;
  return (
    <Shell>
      <Label>
        {first ? "स्वागत · WELCOME" : "तुमची निवड · YOUR CHOICES"} · {step + 1}/3
      </Label>
      {step === 0 && (
        <>
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
      {first && (
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
