import type { AppNavigation, StackProps } from "../navigation/types";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProgress, localDate } from "../state/progress";
import { words } from "../data/course";
import { kits, lessonById } from "../curriculum";
import {
  quizItem,
  sentenceById,
  soundById,
  speakingById,
  tipById,
  type DailyPlan,
} from "../daily/engine";
import { useDaily } from "../daily/useDaily";
import { Listen, ListenAll } from "../components/Audio";
import {
  AppText as Text,
  Button,
  Icon,
  IconName,
  Label,
  Section,
  Shell,
} from "../components/ui";
import { ExerciseCard } from "../components/cards";
import { s } from "../components/styles";
import { C } from "../components/theme";

const wordById = (id: string) => words.find((w) => w.id === id)!;

function DailyCard({
  icon,
  title,
  sub,
  done,
  open,
  onToggle,
  children,
}: {
  icon: IconName;
  title: string;
  sub: string;
  done: boolean;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={[s.dailyCard, { marginBottom: 12 }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title}. ${done ? "पूर्ण झाले" : "बाकी आहे"}. ${sub}`}
        accessibilityState={{ expanded: open }}
        onPress={onToggle}
        style={s.goalRow}
      >
        <View style={[s.smallIcon, { backgroundColor: done ? C.lime : C.greenMist }]}>
          <Icon name={done ? "checkmark" : icon} color={done ? C.onLime : C.ink} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.rowTitle}>{title}</Text>
          <Text style={s.smallMuted}>{sub}</Text>
        </View>
        <Icon name={open ? "chevron-up" : "chevron-down"} color={C.muted} />
      </Pressable>
      {open && <View style={{ marginTop: 6 }}>{children}</View>}
    </View>
  );
}

// Today's content, chosen by the daily engine. Completion here is stored
// separately from lesson progress and is self-reported for speaking items.
export function DailyToday() {
  const navigation = useNavigation<AppNavigation>();
  const { plan, previous, done, mark } = useDaily();
  const { progress } = useProgress();
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (k: string) => setOpen(open === k ? null : k);
  const learned = (progress.daily[plan.date] ?? []).filter((x) =>
    plan.words.includes(x),
  ).length;
  const isDone = (k: string) =>
    k === "words" ? learned >= 5 || done.includes(k) : done.includes(k);
  const sentence = sentenceById(plan.sentence)!;
  const lesson = lessonById(plan.conversation);
  const conv = kits[plan.conversation]?.conv ?? [];
  const tip = tipById(plan.tip);
  const sound = soundById(plan.sound)!;
  const speaking = speakingById(plan.speaking);
  const total = 7;
  const count = [
    "words",
    "sentence",
    "conversation",
    "tip",
    "pronunciation",
    "speaking",
    "quiz",
  ].filter(isDone).length;
  const finish = (k: string) => (
    <View style={{ marginTop: 12 }}>
      <Button
        secondary
        disabled={isDone(k)}
        title={isDone(k) ? "पूर्ण ✓" : "पूर्ण केले · Mark done"}
        onPress={() => mark(k)}
      />
    </View>
  );
  return (
    <View>
      <Section title={`आजचे शिक्षण · ${count}/${total}`} />
      <DailyCard
        icon="text-outline"
        title="आजचे पाच शब्द"
        sub={`${learned}/5 शिकले · ${plan.words.map((id) => wordById(id).en).join(", ")}`}
        done={isDone("words")}
        open={open === "words"}
        onToggle={() => toggle("words")}
      >
        {plan.words.map((id) => (
          <View key={id} style={s.dailyWord}>
            <View style={{ flex: 1 }}>
              <Text style={s.rowTitle}>
                {wordById(id).en} · {wordById(id).mr}
              </Text>
              <Text style={s.smallMuted}>{wordById(id).example}</Text>
              <Text style={s.smallMuted}>{wordById(id).translation}</Text>
            </View>
            <Listen text={wordById(id).en} compact />
          </View>
        ))}
        <View style={{ marginTop: 12 }}>
          <Button
            secondary
            title="शब्द उघडा · Open words"
            onPress={() => navigation.navigate("Words", { daily: true })}
          />
        </View>
      </DailyCard>
      <DailyCard
        icon="chatbox-ellipses-outline"
        title="आजचे वाक्य"
        sub={sentence.en}
        done={isDone("sentence")}
        open={open === "sentence"}
        onToggle={() => toggle("sentence")}
      >
        <Text style={s.phraseEn}>{sentence.en}</Text>
        <Text style={s.sayText}>{sentence.say}</Text>
        <Text style={s.marathiBody}>{sentence.mr}</Text>
        <Listen text={sentence.en} compact />
        {finish("sentence")}
      </DailyCard>
      <DailyCard
        icon="people-outline"
        title="आजचा संवाद"
        sub={lesson ? lesson.title : "Conversation"}
        done={isDone("conversation")}
        open={open === "conversation"}
        onToggle={() => toggle("conversation")}
      >
        {conv.map((l, i) => (
          <View key={i} style={{ marginTop: 10 }}>
            <Text style={s.rowTitle}>
              {l.who}: {l.en}
            </Text>
            <Text style={s.smallMuted}>{l.mr}</Text>
          </View>
        ))}
        <ListenAll lines={conv.map((l) => l.en)} />
        {finish("conversation")}
      </DailyCard>
      {tip && (
        <DailyCard
          icon="bulb-outline"
          title="आजची व्याकरण टीप"
          sub={tip.right}
          done={isDone("tip")}
          open={open === "tip"}
          onToggle={() => toggle("tip")}
        >
          <Text style={[s.exampleEnglish, { color: C.danger }]}>✗ {tip.wrong}</Text>
          <Text style={[s.exampleEnglish, { color: C.green }]}>✓ {tip.right}</Text>
          <Text style={s.marathiBody}>{tip.why}</Text>
          <Listen text={tip.right} compact />
          {finish("tip")}
        </DailyCard>
      )}
      <DailyCard
        icon="ear-outline"
        title="उच्चार आव्हान"
        sub={sound.title}
        done={isDone("pronunciation")}
        open={open === "pronunciation"}
        onToggle={() => toggle("pronunciation")}
      >
        <Text style={s.marathiBody}>{sound.tip}</Text>
        {sound.pairs.map((p) => (
          <View key={p.en} style={{ marginTop: 10 }}>
            <Text style={s.rowTitle}>
              {p.en} · {p.say}
            </Text>
            <Listen text={p.en} compact />
          </View>
        ))}
        <Text style={s.smallMuted}>
          हे स्वतः ऐकून सराव करण्यासाठी आहे. उच्चाराचे गुण दिले जात नाहीत.
        </Text>
        {finish("pronunciation")}
      </DailyCard>
      {speaking && (
        <DailyCard
          icon="mic-outline"
          title="आजचे बोलण्याचे आव्हान"
          sub={speaking.kind === "talk" ? speaking.talk.title : speaking.rp.title}
          done={isDone("speaking")}
          open={open === "speaking"}
          onToggle={() => toggle("speaking")}
        >
          {speaking.kind === "talk" ? (
            <>
              <Text style={s.marathiBody}>{speaking.talk.mr}</Text>
              <Text style={s.body}>{speaking.talk.prompt}</Text>
              <View style={{ marginTop: 12 }}>
                <Button
                  title="सुरू करा · Start"
                  onPress={() => navigation.navigate("LongTalk", { id: speaking.talk.id })}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={s.body}>
                {speaking.rp.en} · {speaking.rp.situation}
              </Text>
              <View style={{ marginTop: 12 }}>
                <Button
                  title="संवाद सुरू करा · Start"
                  onPress={() => navigation.navigate("RolePlay", { id: speaking.rp.id })}
                />
              </View>
            </>
          )}
          {finish("speaking")}
        </DailyCard>
      )}
      <DailyCard
        icon="help-circle-outline"
        title="आजचा सराव प्रश्न"
        sub={`${plan.quiz.length} प्रश्न`}
        done={isDone("quiz")}
        open={open === "quiz"}
        onToggle={() => toggle("quiz")}
      >
        <Button
          title={isDone("quiz") ? "पुन्हा सोडवा · Again" : "सुरू करा · Start"}
          onPress={() => navigation.navigate("DailyQuiz")}
        />
      </DailyCard>
      {previous && <Yesterday plan={previous} />}
    </View>
  );
}

function Yesterday({ plan }: { plan: DailyPlan }) {
  const [open, setOpen] = useState(false);
  return (
    <DailyCard
      icon="time-outline"
      title="कालची उजळणी"
      sub={plan.date}
      done={false}
      open={open}
      onToggle={() => setOpen(!open)}
    >
      {plan.words.map((id) => (
        <Text key={id} style={[s.body, { marginTop: 6 }]}>
          {wordById(id).en} · {wordById(id).mr}
        </Text>
      ))}
      <Text style={[s.exampleEnglish, { marginTop: 10 }]}>
        {sentenceById(plan.sentence)?.en}
      </Text>
    </DailyCard>
  );
}

export function DailyQuiz({ navigation }: StackProps<"DailyQuiz">) {
  const { plan, mark, done } = useDaily();
  const { review } = useProgress();
  // Replaying today's quiz is allowed, but only the first completed run counts
  // towards the review schedule, so repeats cannot inflate it.
  const [firstRun] = useState(() => !done.includes("quiz"));
  const items = plan.quiz.map((id) => quizItem(id)).filter(Boolean) as NonNullable<
    ReturnType<typeof quizItem>
  >[];
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = items[index];
  if (!q)
    return (
      <Shell>
        <Text style={s.body}>आज प्रश्न उपलब्ध नाहीत.</Text>
      </Shell>
    );
  const choose = (i: number) => {
    setSelected(i);
    const ok = i === q.answer;
    if (firstRun) review(q.id, ok);
    if (ok) setScore((n) => n + 1);
  };
  const next = () => {
    if (index === items.length - 1) {
      mark("quiz");
      setFinished(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  };
  if (finished)
    return (
      <Shell>
        <Label>DAILY QUIZ</Label>
        <Text style={s.title}>
          {score} / {items.length}
        </Text>
        <Text style={s.marathiBody}>
          {firstRun
            ? "चुकलेले प्रश्न उजळणीत पुन्हा येतील. हा गुण भाषेच्या पातळीचा पुरावा नाही."
            : "हा पुन्हा केलेला सराव आहे; तो उजळणीच्या वेळापत्रकात नोंदवला जात नाही."}
        </Text>
        <View style={{ height: 16 }} />
        <Button title="परत जा · Back" onPress={() => navigation.goBack()} />
      </Shell>
    );
  return (
    <Shell>
      <ExerciseCard
        header={`QUESTION ${index + 1} OF ${items.length}`}
        prompt={q.prompt}
        options={q.options}
        answer={q.answer}
        selected={selected}
        explanation={q.explanation}
        onSelect={choose}
      >
        {!!q.audio && <Listen text={q.audio} compact />}
      </ExerciseCard>
      {selected !== null && (
        <Button
          title={index === items.length - 1 ? "निकाल पाहा" : "पुढचा प्रश्न"}
          onPress={next}
        />
      )}
    </Shell>
  );
}
