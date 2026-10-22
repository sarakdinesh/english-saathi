// The seven stages of a lesson with a full curriculum kit, one component each.
// Order (see stageNames): goal + conversation → meaning and formula → listen
// and repeat → guided practice → own speaking → role-play → recap.
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import type { Lesson } from "../../data/course";
import { sayFor } from "../../data/pronunciation";
import { expressionId } from "../../curriculum";
import type { Enrich, Ex } from "../../curriculum/types";
import { useProgress } from "../../state/progress";
import { AppText as Text, Button, Label } from "../../components/ui";
import {
  Listen,
  ListenAll,
  Recorder,
  Speaker,
  VoiceVariety,
} from "../../components/Audio";
import { Exercise } from "../../components/Exercise";
import { s } from "../../components/styles";
import { ConfidenceChips } from "./parts";

type StageProps = { item: Lesson; kit: Enrich; beginner: boolean };

// 0 · What you will be able to do, and the example conversation.
export function GoalStage({ kit, beginner }: StageProps) {
  // Intermediate learners listen first and reveal the Marathi on request.
  const [showMeaning, setShowMeaning] = useState(beginner);
  return (
    <>
      <View style={s.explanation}>
        <Label>मी हे करू शकेन · I CAN…</Label>
        <Text style={s.phraseEn}>{kit.can[0]}</Text>
        <Text style={s.marathiBody}>{kit.can[1]}</Text>
      </View>
      <Text style={s.sectionTitle}>उदाहरण संवाद · Example conversation</Text>
      <View style={{ height: 12 }} />
      <ListenAll lines={kit.conv.map((l) => l.en)} />
      <View style={{ height: 16 }} />
      {kit.conv.map((l, i) => (
        <View
          key={i}
          style={[s.convRow, l.who === "B" && { flexDirection: "row-reverse" }]}
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
        <Pressable accessibilityRole="button" onPress={() => setShowMeaning(!showMeaning)}>
          <Text style={s.link}>
            {showMeaning ? "मराठी अर्थ लपवा ↑" : "आधी ऐका, मग मराठी अर्थ पाहा ↓"}
          </Text>
        </Pressable>
      )}
    </>
  );
}

// 1 · The rule in Marathi, the formula, patterns and examples.
export function RuleStage({ item, kit }: StageProps) {
  return (
    <>
      <View style={s.explanation}>
        <Label>समजून घ्या · UNDERSTAND</Label>
        <Text style={s.marathiBody}>{item.rule}</Text>
      </View>
      <View style={s.formula}>
        <Text style={s.formulaText}>{item.formula}</Text>
      </View>
      <Text style={[s.sectionTitle, { marginTop: 22 }]}>वाक्य-रचना · Patterns</Text>
      {kit.patterns.map((p) => (
        <Text key={p} style={[s.exampleEnglish, { marginTop: 8 }]}>
          • {p}
        </Text>
      ))}
      <Text style={[s.sectionTitle, { marginTop: 22 }]}>उदाहरणे · Examples</Text>
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
  );
}

// 2 · Listen to each example, say it aloud, optionally record and compare.
export function ListenStage({ item, beginner }: StageProps) {
  const [recordIdx, setRecordIdx] = useState<number | null>(null);
  return (
    <>
      <Text style={s.body}>
        प्रत्येक वाक्य ऐका, मग मोठ्याने म्हणा. स्पष्ट समजेल असे बोलणे हे ध्येय
        आहे; कोणत्याही एका accent ची नक्कल करणे आवश्यक नाही.
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
              {recordIdx === i ? "रेकॉर्डर बंद करा ↑" : "मॉडेलशी तुलना करा: रेकॉर्ड करा →"}
            </Text>
          </Pressable>
          {recordIdx === i && <Recorder model={e.en} />}
        </View>
      ))}
      <Text style={s.smallMuted}>
        ब्रॅकेटमधील देवनागरी उच्चार फक्त अंदाजे मदत आहे. इंग्रजी आवाज देवनागरीत
        अचूक लिहिता येत नाहीत; खरा आवाज ऐकूनच शिका.
      </Text>
      {!beginner && (
        <View style={[s.phraseCard, { marginTop: 14 }]}>
          <Text style={s.rowTitle}>वेगवेगळ्या शैलीत ऐका · Listening styles</Text>
          <VoiceVariety text={item.examples[0].en} />
        </View>
      )}
    </>
  );
}

// 3 · Checked exercises with explanations; mistakes go to review.
export function PracticeStage({ kit }: StageProps) {
  const { progress } = useProgress();
  const exs: Ex[] = kit.ex;
  const mastered = exs.filter((e) => progress.mastered.includes(e.id)).length;
  return (
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
          सध्या बरोबर: {mastered} / {exs.length}. हे फक्त या प्रश्नांवरील तुमची
          कामगिरी आहे.
        </Text>
      </View>
    </>
  );
}

// 4 · The learner's own speaking task (self-reported, no scoring).
export function TaskStage({ item, kit }: StageProps) {
  const { progress, markSpeaking } = useProgress();
  const [tasked, setTasked] = useState(false);
  const speak = progress.speaking[item.id];
  const bLines = kit.conv.filter((l) => l.who === "B");
  return (
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
        नमुना वाचून थांबू नका: तुमच्या स्वतःच्या आयुष्यातील माहिती वापरा. आधी
        मनात तयारी करा, मग मोठ्याने बोला.
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
          नोंद झाली · एकूण {speak?.task ?? 1} वेळा. ही फक्त तुमची स्वतःची नोंद
          आहे.
        </Text>
      )}
    </>
  );
}

// 5 · Entry to the scripted role-play for this lesson.
export function RolePlayStage({
  kit,
  onStart,
}: StageProps & { onStart: () => void }) {
  const { progress } = useProgress();
  const done = progress.speaking[kit.rp.id]?.role ?? 0;
  return (
    <View style={s.explanation}>
      <Label>संवाद सराव · ROLE-PLAY</Label>
      <Text style={s.sectionTitle}>{kit.rp.title}</Text>
      <Text style={s.marathiBody}>{kit.rp.situation}</Text>
      <Text style={s.body}>
        ठरलेला सराव: समोरच्या व्यक्तीचे वाक्य आधीच ठरलेले आहे आणि अॅप तुमचे बोलणे
        तपासत नाही.
      </Text>
      <View style={{ height: 12 }} />
      <Button
        title={done ? "पुन्हा संवाद करा" : "संवाद सुरू करा · Start"}
        onPress={onStart}
      />
      {done > 0 && <Text style={s.smallMuted}>नोंदवलेले सराव: {done}</Text>}
    </View>
  );
}

// 6 · Recap: goal, formula, the learner's own record, confidence and phrases
// to add to review.
export function RecapStage({ item, kit }: StageProps) {
  const { progress, setConfidence, review } = useProgress();
  const mastered = kit.ex.filter((e) => progress.mastered.includes(e.id)).length;
  const speak = progress.speaking[item.id];
  return (
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
          • प्रश्नांवरील कामगिरी: {mastered} / {kit.ex.length} बरोबर{"\n"}•
          बोलण्याचा सराव: कार्य {speak?.task ?? 0} वेळा, संवाद{" "}
          {progress.speaking[kit.rp.id]?.role ?? 0} वेळा{"\n"}• धडा वाचन:{" "}
          {progress.completed.includes(item.id) ? "पूर्ण" : "अजून पूर्ण केले नाही"}
        </Text>
      </View>
      <Text style={s.rowTitle}>आता तुम्हाला किती आत्मविश्वास वाटतो?</Text>
      <ConfidenceChips
        value={progress.confidence[item.id]}
        onPick={(v) => setConfidence(item.id, v)}
      />
      <Text style={s.smallMuted}>
        ही तुमची स्वतःची भावना आहे. ती बोलण्याच्या क्षमतेचा पुरावा नाही.
      </Text>
      <Text style={[s.sectionTitle, { marginTop: 20 }]}>उजळणीसाठी उपयुक्त वाक्ये</Text>
      {kit.conv.map((l, i) => {
        const id = expressionId(item.id, i);
        const added = !!progress.reviews[id];
        return (
          <View key={id} style={s.phraseCard}>
            <Text style={s.exampleEnglish}>{l.en}</Text>
            <Text style={s.marathiBody}>{l.mr}</Text>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginTop: 8 }}>
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
  );
}
