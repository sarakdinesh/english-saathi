import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { advanceTurn, rolePlayById } from "../curriculum";
import { useProgress } from "../state/progress";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
} from "../components/ui";
import { Listen, Recorder, Speaker } from "../components/Audio";
import { s } from "../components/styles";
import { C } from "../components/theme";

const checks = [
  "मी समोरच्याचे बोलणे समजलो/समजले.",
  "शक्य तितके कमी मदत घेऊन उत्तरे दिली.",
  "मी मोठ्याने बोललो/बोलले.",
];
const confidence: [1 | 2 | 3, string][] = [
  [1, "अजून सराव हवा"],
  [2, "थोडा आत्मविश्वास"],
  [3, "आत्मविश्वास आहे"],
];

// Reusable scripted role-play. The partner's lines are fixed; the app does not
// listen to or assess the learner. Support reduces at the intermediate level.
export default function RolePlay({ route, navigation }: any) {
  const rp = rolePlayById(route.params?.id);
  const { progress, markSpeaking, setConfidence } = useProgress();
  const [stage, setStage] = useState<"intro" | "play" | "review">("intro");
  const [step, setStep] = useState(0);
  const [help, setHelp] = useState(0);
  const [record, setRecord] = useState(false);
  const [ticked, setTicked] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  if (!rp)
    return (
      <Shell>
        <Heading title="संवाद सापडला नाही" />
        <Button title="मागे जा" onPress={() => navigation.goBack()} />
      </Shell>
    );
  const beginner = rp.level === "beginner";
  const turn = rp.turns[step];
  const startHelp = beginner ? 1 : 0;
  const advance = () => {
    setRecord(false);
    const next = advanceTurn(step, rp.turns.length);
    if (next.finished) setStage("review");
    else {
      setStep(next.step);
      setHelp(startHelp);
    }
  };
  const done = progress.speaking[rp.id]?.role ?? 0;
  if (stage === "intro")
    return (
      <Shell>
        <Label>{rp.en.toUpperCase()} · ROLE-PLAY</Label>
        <Heading title={rp.title} sub={rp.situation} />
        <View style={s.scripted}>
          <Text style={s.sayLabel}>ठरलेला सराव · SCRIPTED PRACTICE</Text>
        </View>
        <View style={s.explanation}>
          <Text style={s.rowTitle}>{rp.role}</Text>
          <Text style={s.body}>
            समोरच्या व्यक्तीचे वाक्य वाचा किंवा ऐका, मग तुमचे उत्तर मोठ्याने
            द्या. हा पूर्वी ठरवलेला संवाद आहे. अॅप तुमचा आवाज ऐकत नाही आणि तपासत
            नाही; अचूकता तुम्हीच तपासता.
          </Text>
          <Text style={s.body}>
            {beginner
              ? "सुरुवातीच्या पातळीवर मराठी सूचना आणि मदत लगेच दिसेल."
              : "मदत गरजेनुसारच दिसेल: आधी स्वतः प्रयत्न करा."}
          </Text>
        </View>
        {done > 0 && (
          <Text style={s.smallMuted}>आतापर्यंत {done} वेळा सराव नोंदवला.</Text>
        )}
        <View style={{ height: 14 }} />
        <Button
          title="सुरू करा · Start"
          onPress={() => {
            setHelp(startHelp);
            setStage("play");
          }}
        />
      </Shell>
    );
  if (stage === "review")
    return (
      <Shell>
        <Label>स्वतःचे मूल्यमापन · SELF-REVIEW</Label>
        <Heading
          title="छान! संवाद पूर्ण."
          sub="खालील गोष्टी तुम्ही स्वतः ठरवा. हे फक्त तुमच्या नोंदीसाठी आहे; अॅप बोलण्याची पातळी तपासत नाही."
        />
        {checks.map((c, i) => (
          <Pressable
            key={c}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: ticked.includes(i) }}
            onPress={() =>
              setTicked(
                ticked.includes(i)
                  ? ticked.filter((x) => x !== i)
                  : [...ticked, i],
              )
            }
            style={[
              s.option,
              { marginBottom: 10 },
              ticked.includes(i) && {
                borderColor: C.green,
                backgroundColor: C.successSoft,
              },
            ]}
          >
            <Text style={[s.exampleEnglish, { flex: 1, fontSize: 15 }]}>
              {ticked.includes(i) ? "✓ " : "○ "}
              {c}
            </Text>
          </Pressable>
        ))}
        <Text style={[s.rowTitle, { marginTop: 14 }]}>
          आज तुम्हाला किती आत्मविश्वास वाटतो?
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginVertical: 12,
          }}
        >
          {confidence.map(([v, label]) => (
            <Pressable
              key={v}
              accessibilityRole="button"
              accessibilityState={{
                selected: progress.confidence[rp.id] === v,
              }}
              onPress={() => setConfidence(rp.id, v)}
              style={[s.chip, progress.confidence[rp.id] === v && s.chipOn]}
            >
              <Text
                style={[
                  s.filterText,
                  progress.confidence[rp.id] === v && { color: C.white },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
        {saved ? (
          <Text accessibilityLiveRegion="polite" style={s.rowTitle}>
            सराव नोंदवला ✓
          </Text>
        ) : (
          <Button
            disabled={!ticked.includes(2)}
            title="सराव नोंदवा · Log this practice"
            onPress={() => {
              markSpeaking(rp.id, "role");
              setSaved(true);
            }}
          />
        )}
        {!ticked.includes(2) && !saved && (
          <Text style={s.smallMuted}>
            मोठ्याने बोललात तरच सराव नोंदवला जाईल.
          </Text>
        )}
        <View style={{ height: 12 }} />
        <Button
          secondary
          title="पुन्हा करा · Again"
          onPress={() => {
            setStep(0);
            setHelp(startHelp);
            setTicked([]);
            setSaved(false);
            setStage("play");
          }}
        />
        <View style={{ height: 12 }} />
        <Button secondary title="मागे जा" onPress={() => navigation.goBack()} />
      </Shell>
    );
  return (
    <Shell>
      <Label>
        {rp.en.toUpperCase()} · {step + 1} / {rp.turns.length}
      </Label>
      <View style={s.track}>
        <View
          style={[
            s.trackFill,
            { width: `${((step + 1) / rp.turns.length) * 100}%` },
          ]}
        />
      </View>
      <View style={s.scripted}>
        <Text style={s.sayLabel}>ठरलेला सराव · अॅप तुमचा आवाज तपासत नाही</Text>
      </View>
      {rp.turns.slice(0, step).map((t, i) => (
        <View
          key={i}
          style={[s.bubble, t.who === "you" ? s.bubbleYou : s.bubbleOther]}
        >
          <Text style={s.sayLabel}>
            {t.who === "you" ? "तुम्ही" : "समोरची व्यक्ती"}
          </Text>
          <Text style={s.exampleEnglish}>{t.en}</Text>
        </View>
      ))}
      {turn.who === "other" ? (
        <View style={[s.bubble, s.bubbleOther]}>
          <Text style={s.sayLabel}>समोरची व्यक्ती · PARTNER</Text>
          <Text style={s.phraseEn}>{turn.en}</Text>
          {(beginner || help > 0) && (
            <Text style={s.marathiBody}>{turn.mr}</Text>
          )}
          <Listen text={turn.en} compact />
          {!beginner && help === 0 && (
            <Pressable accessibilityRole="button" onPress={() => setHelp(1)}>
              <Text style={[s.link, { marginTop: 10 }]}>अर्थ पाहा →</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View
          style={[
            s.bubble,
            s.bubbleYou,
            { alignSelf: "stretch", maxWidth: "100%" },
          ]}
        >
          <Text style={s.sayLabel}>तुमची पाळी · YOUR TURN</Text>
          {help >= 1 ? (
            <Text style={[s.marathiBody, { color: C.ink }]}>{turn.mr}</Text>
          ) : (
            <Text style={s.marathiBody}>उत्तर द्या. अडल्यास सूचना घ्या.</Text>
          )}
          {help >= 2 && !!turn.hint && (
            <Text style={s.sayText}>सुरुवात: {turn.hint}</Text>
          )}
          {help >= 3 && (
            <View>
              <Text style={s.phraseEn}>{turn.en}</Text>
              <Speaker text={turn.en} />
            </View>
          )}
          {help < 3 && (
            <Pressable
              accessibilityRole="button"
              onPress={() => setHelp(Math.min(3, help + 1))}
            >
              <Text style={[s.link, { marginTop: 10 }]}>
                {help === 0
                  ? "सूचना पाहा →"
                  : help === 1
                    ? "सुरुवातीचे शब्द →"
                    : "नमुना उत्तर →"}
              </Text>
            </Pressable>
          )}
          <Pressable
            accessibilityRole="button"
            onPress={() => setRecord(!record)}
          >
            <Text style={[s.link, { marginTop: 10 }]}>
              {record ? "रेकॉर्डर बंद करा ↑" : "ऐच्छिक: रेकॉर्ड करा →"}
            </Text>
          </Pressable>
          {record && <Recorder model={help >= 3 ? turn.en : undefined} />}
        </View>
      )}
      <View style={{ height: 14 }} />
      <Button
        title={
          step + 1 >= rp.turns.length ? "पूर्ण करा · Finish" : "पुढे · Next"
        }
        onPress={advance}
      />
    </Shell>
  );
}
