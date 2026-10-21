import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { exercises as legacyList } from "../data/journey";
import { sayFor } from "../data/pronunciation";
import {
  expressionId,
  kits,
  lessonById,
  orderedLessons,
  unitOf,
} from "../curriculum";
import { useProgress } from "../state/progress";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
} from "../components/ui";
import { s } from "../components/styles";
import { C } from "../components/theme";
import {
  Listen,
  ListenAll,
  Recorder,
  Speaker,
  VoiceVariety,
} from "../components/Audio";
import { Exercise } from "../components/Exercise";
import type { Ex } from "../curriculum/types";

const stageNames = [
  "लक्ष्य आणि संवाद",
  "अर्थ आणि सूत्र",
  "ऐका आणि म्हणा",
  "मार्गदर्शित सराव",
  "तुमचे बोलणे",
  "संवाद सराव",
  "उजळणी",
];
const confidenceLabels: [1 | 2 | 3, string][] = [
  [1, "अजून सराव हवा"],
  [2, "थोडा आत्मविश्वास"],
  [3, "आत्मविश्वास आहे"],
];

function Chips({
  value,
  onPick,
}: {
  value?: number;
  onPick: (v: 1 | 2 | 3) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginVertical: 12,
      }}
    >
      {confidenceLabels.map(([v, label]) => (
        <Pressable
          key={v}
          accessibilityRole="button"
          accessibilityState={{ selected: value === v }}
          onPress={() => onPick(v)}
          style={[s.chip, value === v && s.chipOn]}
        >
          <Text style={[s.filterText, value === v && { color: C.white }]}>
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function Lesson({ navigation, route }: any) {
  const {
    progress,
    step,
    complete,
    toggleSave,
    activity,
    review,
    markSpeaking,
    setConfidence,
  } = useProgress();
  const item = lessonById(route.params.id);
  const kit = item ? kits[item.id] : undefined;
  const unit = item ? unitOf(item.id) : undefined;
  const beginner = unit?.path !== "intermediate";
  const [n, setN] = useState(Math.min(progress.steps[route.params.id] ?? 0, 6));
  const [showMeaning, setShowMeaning] = useState(beginner);
  const [recordIdx, setRecordIdx] = useState<number | null>(null);
  const [tasked, setTasked] = useState(false);
  if (!item)
    return (
      <Shell>
        <Heading title="धडा सापडला नाही" />
        <Button title="मागे जा" onPress={() => navigation.goBack()} />
      </Shell>
    );
  const legacy = legacyList.filter((e) => e.lesson === item.id);
  // Lessons without a full kit keep the original reading/listening/speaking flow.
  const stages = kit
    ? [0, 1, 2, 3, 4, 5, 6]
    : legacy.length
      ? [0, 1, 2, 3, 4, 5, 6]
      : [0, 1, 2, 5, 6];
  const position = Math.max(stages.indexOf(n), 0);
  const current = stages[position];
  const go = (value: number) => {
    setN(value);
    step(item.id, value);
  };
  const next = () => go(stages[Math.min(position + 1, stages.length - 1)]);
  const idx = orderedLessons.findIndex((l) => l.id === item.id);
  const following = orderedLessons[idx + 1];
  const exs: Ex[] = kit?.ex ?? [];
  const mastered = exs.filter((e) => progress.mastered.includes(e.id)).length;
  const speak = progress.speaking[item.id];
  const finish = () => {
    complete(item.id);
    activity("lesson");
    const last = unit && unit.lessons[unit.lessons.length - 1] === item.id;
    if (last && unit?.checkpoint && !progress.checkpoints[unit.id])
      navigation.replace("Checkpoint", { unit: unit.id });
    else if (following) navigation.replace("Lesson", { id: following.id });
    else navigation.goBack();
  };
  const header = (
    <>
      <Label>
        {unit ? `${unit.en.toUpperCase()} · ` : ""}
        {position + 1} / {stages.length} ·{" "}
        {kit ? stageNames[current] : legacyNames[current]}
      </Label>
      <View style={s.track}>
        <View
          style={[
            s.trackFill,
            { width: `${((position + 1) / stages.length) * 100}%` },
          ]}
        />
      </View>
      <View style={{ height: 20 }} />
      <Heading title={item.title} sub={item.subtitle} />
      <Button
        secondary
        title={
          progress.saved.includes(item.id)
            ? "जतन केले ✓ · Remove bookmark"
            : "जतन करा · Bookmark"
        }
        onPress={() => toggleSave(item.id)}
      />
      <View style={{ height: 20 }} />
    </>
  );
  const nav = (
    <View style={{ gap: 12, marginTop: 24 }}>
      {current === 6 ? (
        <Button
          title={
            unit?.checkpoint &&
            unit.lessons[unit.lessons.length - 1] === item.id &&
            !progress.checkpoints[unit.id]
              ? "धडा पूर्ण करा · युनिट चेकपॉइंट"
              : following
                ? "धडा पूर्ण करा · पुढचा धडा"
                : "धडा पूर्ण करा · अभिनंदन!"
          }
          onPress={finish}
        />
      ) : (
        <Button title="पुढचा टप्पा · Next" onPress={next} />
      )}
      {position > 0 && (
        <Button
          secondary
          title="मागचा टप्पा · Previous"
          onPress={() => go(stages[position - 1])}
        />
      )}
    </View>
  );
  if (!kit)
    return (
      <Shell key={current}>
        {header}
        <LegacyBody
          item={item}
          current={current}
          legacy={legacy}
          next={next}
          activity={activity}
          progress={progress}
        />
        {nav}
      </Shell>
    );
  const bLines = kit.conv.filter((l) => l.who === "B");
  return (
    <Shell key={current}>
      {header}
      {current === 0 && (
        <>
          <View style={s.explanation}>
            <Label>मी हे करू शकेन · I CAN…</Label>
            <Text style={s.phraseEn}>{kit.can[0]}</Text>
            <Text style={s.marathiBody}>{kit.can[1]}</Text>
          </View>
          <Text style={s.sectionTitle}>
            उदाहरण संवाद · Example conversation
          </Text>
          <View style={{ height: 12 }} />
          <ListenAll lines={kit.conv.map((l) => l.en)} />
          <View style={{ height: 16 }} />
          {kit.conv.map((l, i) => (
            <View
              key={i}
              style={[
                s.convRow,
                l.who === "B" && { flexDirection: "row-reverse" },
              ]}
            >
              <Speaker text={l.en} />
              <View style={[s.convBubble, l.who === "A" ? s.convA : s.convB]}>
                <Text style={s.sayLabel}>
                  {l.who === "A" ? "समोरची व्यक्ती" : "तुम्ही"}
                </Text>
                <Text style={s.exampleEnglish}>{l.en}</Text>
                {showMeaning && <Text style={s.marathiBody}>{l.mr}</Text>}
              </View>
            </View>
          ))}
          {!beginner && (
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowMeaning(!showMeaning)}
            >
              <Text style={s.link}>
                {showMeaning
                  ? "मराठी अर्थ लपवा ↑"
                  : "आधी ऐका, मग मराठी अर्थ पाहा ↓"}
              </Text>
            </Pressable>
          )}
        </>
      )}
      {current === 1 && (
        <>
          <View style={s.explanation}>
            <Label>समजून घ्या · UNDERSTAND</Label>
            <Text style={s.marathiBody}>{item.rule}</Text>
          </View>
          <View style={s.formula}>
            <Text style={s.formulaText}>{item.formula}</Text>
          </View>
          <Text style={[s.sectionTitle, { marginTop: 22 }]}>
            वाक्य-रचना · Patterns
          </Text>
          {kit.patterns.map((p) => (
            <Text key={p} style={[s.exampleEnglish, { marginTop: 8 }]}>
              • {p}
            </Text>
          ))}
          <Text style={[s.sectionTitle, { marginTop: 22 }]}>
            उदाहरणे · Examples
          </Text>
          {item.examples.map((e, i) => (
            <View style={s.example} key={i}>
              <Text style={s.exampleNumber}>{i + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.exampleEnglish}>{e.en}</Text>
                <Text style={s.marathiBody}>{e.mr}</Text>
              </View>
            </View>
          ))}
        </>
      )}
      {current === 2 && (
        <>
          <Text style={s.body}>
            प्रत्येक वाक्य ऐका, मग मोठ्याने म्हणा. स्पष्ट समजेल असे बोलणे हे
            ध्येय आहे; कोणत्याही एका accent ची नक्कल करणे आवश्यक नाही.
          </Text>
          {item.examples.slice(0, 4).map((e, i) => (
            <View key={i} style={s.phraseCard}>
              <Text style={s.phraseEn}>{e.en}</Text>
              {!!sayFor(e.en) && (
                <View style={s.sayBox}>
                  <Text style={s.sayLabel}>उच्चार मार्गदर्शक (अंदाजे)</Text>
                  <Text style={s.sayText}>{sayFor(e.en)}</Text>
                </View>
              )}
              <Text style={s.marathiBody}>{e.mr}</Text>
              <Listen text={e.en} compact />
              <Pressable
                accessibilityRole="button"
                onPress={() => setRecordIdx(recordIdx === i ? null : i)}
              >
                <Text style={[s.link, { marginTop: 12 }]}>
                  {recordIdx === i
                    ? "रेकॉर्डर बंद करा ↑"
                    : "मॉडेलशी तुलना करा: रेकॉर्ड करा →"}
                </Text>
              </Pressable>
              {recordIdx === i && <Recorder model={e.en} />}
            </View>
          ))}
          <Text style={s.smallMuted}>
            ब्रॅकेटमधील देवनागरी उच्चार फक्त अंदाजे मदत आहे. इंग्रजी आवाज
            देवनागरीत अचूक लिहिता येत नाहीत; खरा आवाज ऐकूनच शिका.
          </Text>
          {!beginner && (
            <View style={[s.phraseCard, { marginTop: 14 }]}>
              <Text style={s.rowTitle}>
                वेगवेगळ्या शैलीत ऐका · Listening styles
              </Text>
              <VoiceVariety text={item.examples[0].en} />
            </View>
          )}
        </>
      )}
      {current === 3 && (
        <>
          <Text style={s.body}>
            {exs.length} प्रश्न · प्रश्न चुकले तरी समजावून सांगितले जाईल आणि ते
            उजळणीत येतील.
          </Text>
          {exs.map((e) => (
            <Exercise key={e.id} item={e} />
          ))}
          <View style={s.noteBox}>
            <Text style={s.body}>
              सध्या बरोबर: {mastered} / {exs.length}. हे फक्त या प्रश्नांवरील
              तुमची कामगिरी आहे.
            </Text>
          </View>
        </>
      )}
      {current === 4 && (
        <>
          <View style={s.explanation}>
            <Label>तुमचे स्वतःचे बोलणे · PERSONAL TASK</Label>
            <Text style={s.marathiBody}>{item.task}</Text>
          </View>
          <Text style={s.sectionTitle}>नमुना · Model</Text>
          {bLines.slice(0, 2).map((l, i) => (
            <View key={i} style={s.convRow}>
              <Speaker text={l.en} />
              <Text style={[s.exampleEnglish, { flex: 1 }]}>{l.en}</Text>
            </View>
          ))}
          <Text style={s.body}>
            नमुना वाचून थांबू नका: तुमच्या स्वतःच्या आयुष्यातील माहिती वापरा.
            आधी मनात तयारी करा, मग मोठ्याने बोला.
          </Text>
          <Recorder model={bLines[0]?.en} />
          <Button
            secondary
            title="मी मोठ्याने बोललो/बोलले ✓"
            onPress={() => {
              markSpeaking(item.id, "task");
              setTasked(true);
            }}
          />
          {(tasked || (speak?.task ?? 0) > 0) && (
            <Text accessibilityLiveRegion="polite" style={s.smallMuted}>
              नोंद झाली · एकूण {speak?.task ?? 1} वेळा. ही फक्त तुमची स्वतःची
              नोंद आहे.
            </Text>
          )}
        </>
      )}
      {current === 5 && (
        <View style={s.explanation}>
          <Label>संवाद सराव · ROLE-PLAY</Label>
          <Text style={s.sectionTitle}>{kit.rp.title}</Text>
          <Text style={s.marathiBody}>{kit.rp.situation}</Text>
          <Text style={s.body}>
            ठरलेला सराव: समोरच्या व्यक्तीचे वाक्य आधीच ठरलेले आहे आणि अॅप तुमचे
            बोलणे तपासत नाही.
          </Text>
          <View style={{ height: 12 }} />
          <Button
            title={
              (speak ? progress.speaking[kit.rp.id]?.role : 0)
                ? "पुन्हा संवाद करा"
                : "संवाद सुरू करा · Start"
            }
            onPress={() => navigation.navigate("RolePlay", { id: kit.rp.id })}
          />
          {(progress.speaking[kit.rp.id]?.role ?? 0) > 0 && (
            <Text style={s.smallMuted}>
              नोंदवलेले सराव: {progress.speaking[kit.rp.id].role}
            </Text>
          )}
        </View>
      )}
      {current === 6 && (
        <>
          <View style={s.explanation}>
            <Label>आढावा · RECAP</Label>
            <Text style={s.phraseEn}>{kit.can[0]}</Text>
            <Text style={s.marathiBody}>{kit.can[1]}</Text>
          </View>
          <View style={[s.formula, { marginBottom: 16 }]}>
            <Text style={s.formulaText}>{item.formula}</Text>
          </View>
          <View style={s.noteBox}>
            <Text style={s.rowTitle}>तुमची नोंद · Your record</Text>
            <Text style={s.body}>
              • प्रश्नांवरील कामगिरी: {mastered} / {exs.length} बरोबर{"\n"}•
              बोलण्याचा सराव: कार्य {speak?.task ?? 0} वेळा, संवाद{" "}
              {progress.speaking[kit.rp.id]?.role ?? 0} वेळा{"\n"}• धडा वाचन:{" "}
              {progress.completed.includes(item.id)
                ? "पूर्ण"
                : "अजून पूर्ण केले नाही"}
            </Text>
          </View>
          <Text style={s.rowTitle}>आता तुम्हाला किती आत्मविश्वास वाटतो?</Text>
          <Chips
            value={progress.confidence[item.id]}
            onPick={(v) => setConfidence(item.id, v)}
          />
          <Text style={s.smallMuted}>
            ही तुमची स्वतःची भावना आहे. ती बोलण्याच्या क्षमतेचा पुरावा नाही.
          </Text>
          <Text style={[s.sectionTitle, { marginTop: 20 }]}>
            उजळणीसाठी उपयुक्त वाक्ये
          </Text>
          {kit.conv.map((l, i) => {
            const id = expressionId(item.id, i);
            const added = !!progress.reviews[id];
            return (
              <View key={id} style={s.phraseCard}>
                <Text style={s.exampleEnglish}>{l.en}</Text>
                <Text style={s.marathiBody}>{l.mr}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <Speaker text={l.en} />
                  <View style={{ flex: 1 }}>
                    <Button
                      secondary
                      disabled={added}
                      title={added ? "उजळणीत जोडले ✓" : "उजळणीसाठी जोडा"}
                      onPress={() => review(id, false)}
                    />
                  </View>
                </View>
              </View>
            );
          })}
          <Text style={s.body}>चुकलेले प्रश्न आपोआप उजळणीत येतात.</Text>
        </>
      )}
      {nav}
    </Shell>
  );
}

const legacyNames = [
  "समजून घ्या",
  "उदाहरणे पाहा",
  "ऐका",
  "वाक्य बनवा",
  "सराव करा",
  "बोला",
  "आढावा",
];

// The original reading/listening/speaking flow, kept for lessons that do not
// yet have a complete curriculum kit.
function LegacyBody({ item, current, legacy, next, activity, progress }: any) {
  return (
    <>
      <View style={s.scripted}>
        <Text style={s.sayLabel}>या धड्याचा पूर्ण सराव संच अजून तयार नाही</Text>
      </View>
      {current === 0 && (
        <>
          <View style={s.explanation}>
            <Label>समजून घ्या · UNDERSTAND</Label>
            <Text style={s.marathiBody}>{item.rule}</Text>
          </View>
          <View style={s.formula}>
            <Text style={s.formulaText}>{item.formula}</Text>
          </View>
        </>
      )}
      {current === 1 &&
        item.examples.map((e: any, i: number) => (
          <View style={s.example} key={i}>
            <Text style={s.exampleNumber}>{i + 1}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.exampleEnglish}>{e.en}</Text>
              <Text style={s.marathiBody}>{e.mr}</Text>
            </View>
          </View>
        ))}
      {current === 2 && (
        <View style={s.dailyCard}>
          <Text style={s.exampleEnglish}>{item.examples[0].en}</Text>
          <Text style={s.marathiBody}>{item.examples[0].mr}</Text>
          <Listen text={item.examples[0].en} />
        </View>
      )}
      {current === 5 && (
        <>
          <Text style={s.marathiBody}>{item.task}</Text>
          <Recorder model={item.examples[0].en} />
          <Button
            secondary
            title="मी मोठ्याने बोलून सराव केला ✓"
            onPress={() => {
              activity("speak");
              next();
            }}
          />
        </>
      )}
      {current === 6 && (
        <View style={s.explanation}>
          <Label>आढावा · REVIEW</Label>
          <Text style={s.marathiBody}>{item.formula}</Text>
          <Text style={s.body}>
            या धड्याचा सराव मोठ्याने बोलून करा. स्वतंत्र प्रश्न अद्याप उपलब्ध
            नाहीत.
          </Text>
        </View>
      )}
    </>
  );
}
