import type { AppNavigation, StackProps } from "../navigation/types";
import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { lessons } from "../data/course";
import {
  grammarSummary,
  modals,
  passiveNotes,
  passiveSteps,
  patterns,
  tenses,
  type Formula,
  type GrammarTab,
} from "../data/grammar";
import {
  AppText as Text,
  Button,
  Collapsible,
  Heading,
  Label,
  SegmentTabs,
  Shell,
} from "../components/ui";
import { Listen } from "../components/Audio";
import { s } from "../components/styles";

// Four tabs; each opens with the same kind of "at a glance" summary.
const tabs = [
  ["tenses", "काळ", "time-outline"],
  ["modals", "मोडल", "key-outline"],
  ["passive", "कर्मणी", "swap-vertical-outline"],
  ["patterns", "वाक्यरचना", "git-branch-outline"],
] as const satisfies readonly (readonly [GrammarTab, string, string])[];
type Tab = GrammarTab;
const summaryTitle: Record<Tab, { title: string; sub: string }> = {
  tenses: { title: "सर्व काळ एका नजरेत", sub: "१२ काळ · प्रत्येकी एक उदाहरण · Tenses" },
  modals: { title: "सर्व मोडल एका नजरेत", sub: "can, should, must… · Modal verbs" },
  passive: { title: "सर्व कर्मणी रूपे एका नजरेत", sub: "प्रत्येक काळाचे कर्मणी वाक्य · Active & passive" },
  patterns: { title: "सर्व वाक्यरचना एका नजरेत", sub: "If · Reported speech · Who/Which" },
};

// The tab's summary, closed by default; tap to show or hide.
function Summary({ tab }: { tab: Tab }) {
  return (
    <Collapsible
      key={tab}
      icon="list-outline"
      title={summaryTitle[tab].title}
      sub={summaryTitle[tab].sub}
    >
      {grammarSummary(tab).map((r, i) => (
        <View key={i} style={{ marginTop: 8 }}>
          <Text style={s.rowTitle}>{r.en}</Text>
          <Text style={s.smallMuted}>{r.sub}</Text>
        </View>
      ))}
    </Collapsible>
  );
}

// One labelled formula with its example, sentence audio and Marathi meaning.
function Row({ label, f }: { label: string; f: Formula }) {
  return (
    <View style={{ gap: 4, marginTop: 10 }}>
      <Label>{label}</Label>
      <Text style={s.rowTitle}>{f.en}</Text>
      <Text style={s.exampleEnglish}>{f.ex}</Text>
      <Text style={s.smallMuted}>{f.mr}</Text>
      <Listen text={f.ex} compact />
    </View>
  );
}

const lessonTitle = (id?: string) => lessons.find((l) => l.id === id)?.title;

function LessonLink({ id }: { id?: string }) {
  const navigation = useNavigation<AppNavigation>();
  const title = lessonTitle(id);
  if (!id || !title) return null;
  return (
    <View style={{ marginTop: 12 }}>
      <Button
        secondary
        title={`धडा: ${title}`}
        onPress={() => navigation.navigate("Lesson", { id })}
      />
    </View>
  );
}

export default function Grammar({ navigation }: StackProps<"Grammar">) {
  const [tab, setTab] = useState<Tab>("tenses");
  return (
    <Shell>
      <Label>व्याकरण संदर्भ · GRAMMAR REFERENCE</Label>
      <Heading
        title="सूत्र तक्ता"
        sub="V1 = मूळ रूप (go) · V2 = भूतकाळी रूप (went) · V3 = तिसरे रूप (gone). हे पाहण्यासाठी आहे; सराव धड्यांमध्ये करा."
      />
      <SegmentTabs options={tabs} value={tab} onChange={setTab} label="व्याकरण विभाग" />
      <View style={{ height: 8 }} />
      <Summary tab={tab} />
      {(tab === "tenses" || tab === "passive") && (
        <Button
          small
          secondary
          icon="flash-outline"
          title="क्रियापदांची रूपे · V1 V2 V3"
          onPress={() => navigation.navigate("Dictionary", { tab: "verbs" })}
        />
      )}

      {tab === "tenses" &&
        tenses.map((t) => (
          <View key={t.id} style={s.dailyCard}>
            <Text style={s.sectionTitle}>{t.name}</Text>
            <Text style={s.smallMuted}>{t.mr}</Text>
            <Text style={s.body}>{t.use}</Text>
            <Text style={s.smallMuted}>खुणेचे शब्द: {t.signals}</Text>
            <Row label="होकारार्थी · AFFIRMATIVE" f={t.affirmative} />
            <Row label="नकारार्थी · NEGATIVE" f={t.negative} />
            <Row label="प्रश्नार्थी · QUESTION" f={t.question} />
            {t.passive ? (
              <Row label="कर्मणी · PASSIVE" f={t.passive} />
            ) : (
              <Text style={s.smallMuted}>
                या काळात passive क्वचित वापरतात.
              </Text>
            )}
            <LessonLink id={t.lesson} />
          </View>
        ))}

      {tab === "modals" && (
        <>
          <View style={s.noteBox}>
            <Text style={s.body}>
              Modal नंतर नेहमी V1 येते: He can swim (swims नाही). सर्व कर्त्यांसोबत
              modal चे रूप तेच राहते.
            </Text>
          </View>
          {modals.map((m) => (
            <View key={m.id} style={s.dailyCard}>
              <Text style={s.sectionTitle}>{m.modal}</Text>
              <Text style={s.smallMuted}>{m.mr}</Text>
              <Text style={s.body}>{m.use}</Text>
              <Row label="होकारार्थी · AFFIRMATIVE" f={m.affirmative} />
              <Row label="नकारार्थी · NEGATIVE" f={m.negative} />
              <Row label="प्रश्नार्थी · QUESTION" f={m.question} />
              <Row label="कर्मणी · PASSIVE" f={m.passive} />
              <LessonLink id={m.lesson} />
            </View>
          ))}
        </>
      )}

      {tab === "passive" && (
        <>
          <View style={s.dailyCard}>
            <Text style={s.sectionTitle}>कर्तरी → कर्मणी: ३ पायऱ्या · Active → Passive</Text>
            {passiveSteps.map((p) => (
              <View key={p.n} style={{ gap: 2, marginTop: 8 }}>
                <Text style={s.rowTitle}>
                  {p.n}. {p.en}
                </Text>
                <Text style={s.smallMuted}>{p.mr}</Text>
                <Text style={s.exampleEnglish}>{p.ex}</Text>
              </View>
            ))}
            <Text style={[s.sectionTitle, { marginTop: 14 }]}>
              दोन्ही एकत्र · Active and passive
            </Text>
            <Text style={s.exampleEnglish}>
              Active: The cook makes food.{"\n"}Passive: Food is made by the cook.
            </Text>
          </View>
          {tenses
            .filter((t) => t.passive)
            .map((t) => (
              <View key={t.id} style={s.dailyCard}>
                <Text style={s.sectionTitle}>{t.name}</Text>
                <Row label="कर्तरी · ACTIVE" f={t.affirmative} />
                <Row label="कर्मणी · PASSIVE" f={t.passive!} />
              </View>
            ))}
          <View style={s.dailyCard}>
            <Text style={s.sectionTitle}>लक्षात ठेवा · Notes</Text>
            {passiveNotes.map((n) => (
              <View key={n.en} style={{ marginTop: 8 }}>
                <Text style={s.body}>{n.en}</Text>
                <Text style={s.smallMuted}>{n.mr}</Text>
              </View>
            ))}
            <LessonLink id="passive-intro" />
          </View>
        </>
      )}
      {tab === "patterns" &&
        patterns.map((p) => (
          <View key={p.id} style={s.dailyCard}>
            <Text style={s.sectionTitle}>{p.name}</Text>
            <Text style={s.smallMuted}>{p.mr}</Text>
            <Text style={s.body}>{p.use}</Text>
            {p.forms.map((x) => (
              <Row key={x.label} label={x.label} f={x.f} />
            ))}
            {!!p.note && <Text style={[s.smallMuted, { marginTop: 10 }]}>{p.note}</Text>}
            <LessonLink id={p.lesson} />
          </View>
        ))}
      <Text style={s.smallMuted}>
        हा तक्ता भाषेच्या पातळीचे प्रमाणपत्र नाही. मराठी स्पष्टीकरण शिक्षकांकडून
        तपासले जायचे आहे.
      </Text>
    </Shell>
  );
}
