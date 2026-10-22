import React, { useState } from "react";
import { View } from "react-native";
import { lessons } from "../data/course";
import {
  modals,
  passiveNotes,
  passiveSteps,
  patterns,
  tenses,
  type Formula,
} from "../data/grammar";
import { AppText as Text, Button, Chips, Heading, Label, Shell } from "../components/ui";
import { Listen } from "../components/Audio";
import { s } from "../components/styles";

const tabs = [
  ["tenses", "काळ · Tenses"],
  ["modals", "Modal verbs"],
  ["passive", "Active & Passive"],
  ["patterns", "If · Reported · Who/Which"],
] as const;
type Tab = (typeof tabs)[number][0];

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

function LessonLink({ id, navigation }: { id?: string; navigation: any }) {
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

export default function Grammar({ navigation }: any) {
  const [tab, setTab] = useState<Tab>("tenses");
  return (
    <Shell>
      <Label>व्याकरण संदर्भ · GRAMMAR REFERENCE</Label>
      <Heading
        title="सूत्र तक्ता"
        sub="V1 = मूळ रूप (go) · V2 = भूतकाळी रूप (went) · V3 = तिसरे रूप (gone). हे पाहण्यासाठी आहे; सराव धड्यांमध्ये करा."
      />
      <Chips options={tabs} value={tab} onChange={setTab} label="व्याकरण विभाग" />

      {tab === "tenses" && (
        <View style={s.noteBox}>
          <Label>सर्व काळ एका नजरेत · COMPARE</Label>
          <Text style={s.smallMuted}>
            प्रत्येक काळाचे एक उदाहरण. क्रियापदाचे रूप कसे बदलते ते पाहा; तपशील
            खाली आहे.
          </Text>
          {tenses.map((t) => (
            <View key={t.id} style={{ marginTop: 8 }}>
              <Text style={s.rowTitle}>{t.affirmative.ex}</Text>
              <Text style={s.smallMuted}>
                {t.name} · {t.mr}
              </Text>
            </View>
          ))}
        </View>
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
            <LessonLink id={t.lesson} navigation={navigation} />
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
              <LessonLink id={m.lesson} navigation={navigation} />
            </View>
          ))}
        </>
      )}

      {tab === "passive" && (
        <>
          <View style={s.dailyCard}>
            <Text style={s.sectionTitle}>Active → Passive: 3 steps</Text>
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
              Active and passive together
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
                <Row label="ACTIVE" f={t.affirmative} />
                <Row label="PASSIVE" f={t.passive!} />
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
            <LessonLink id="passive-intro" navigation={navigation} />
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
            <LessonLink id={p.lesson} navigation={navigation} />
          </View>
        ))}
      <Text style={s.smallMuted}>
        हा तक्ता भाषेच्या पातळीचे प्रमाणपत्र नाही. मराठी स्पष्टीकरण शिक्षकांकडून
        तपासले जायचे आहे.
      </Text>
    </Shell>
  );
}
