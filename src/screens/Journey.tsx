import type { StackProps } from "../navigation/types";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useProgress, localDate } from "../state/progress";
import {
  JOURNEYS,
  currentDay,
  journeyById,
  journeyForGoal,
  type JourneyTask,
} from "../state/journeys";
import { lessonById, nextLessonFor } from "../curriculum";
import { situations } from "../data/speaking";
import { interviewQuestions } from "../data/interview";
import { Celebration } from "../components/Celebrate";
import {
  AppText as Text,
  Button,
  Heading,
  Icon,
  type IconName,
  Label,
  ProgressBar,
  Shell,
} from "../components/ui";
import { s } from "../components/styles";
import { C } from "../components/theme";

type Nav = StackProps<"Journey">["navigation"];

// What a task says and where it goes.
function taskInfo(
  t: JourneyTask,
  next: { id: string; title: string } | undefined,
): { icon: IconName; title: string; go?: (n: Nav) => void } {
  switch (t.kind) {
    case "lesson": {
      const l = lessonById(t.id);
      return {
        icon: "book-outline",
        title: `धडा: ${l?.title ?? t.id}`,
        go: (n) => n.navigate("Lesson", { id: t.id }),
      };
    }
    case "nextLesson":
      return next
        ? {
            icon: "book-outline",
            title: `पुढचा धडा: ${next.title}`,
            go: (n) => n.navigate("Lesson", { id: next.id }),
          }
        : {
            icon: "refresh-outline",
            title: "उजळणी करा",
            go: (n) => n.navigate("Main", { screen: "Review" }),
          };
    case "interview": {
      const q = interviewQuestions.find((x) => x.id === t.id);
      return {
        icon: "briefcase-outline",
        title: `मुलाखत प्रश्न: ${q?.q ?? ""}`,
        go: (n) => n.navigate("InterviewKit", { open: t.id }),
      };
    }
    case "phrasebook": {
      const x = situations.find((y) => y.id === t.id);
      return {
        icon: "chatbubbles-outline",
        title: `वाक्ये: ${x?.mr ?? t.id}`,
        go: (n) => n.navigate("Phrasebook", { situation: t.id }),
      };
    }
    case "diary":
      return {
        icon: "journal-outline",
        title: "आवाज डायरी: आजचे रेकॉर्डिंग",
        go: (n) => n.navigate("VoiceDiary"),
      };
    case "sounds":
      return {
        icon: "ear-outline",
        title: "आवाजांच्या जोड्या: ५ शब्द",
        go: (n) => n.navigate("SoundPairs"),
      };
    case "drill":
      return {
        icon: "mic-outline",
        title: "बोलण्याचा सराव: ५ वाक्ये",
        go: (n) => n.navigate("SpeakDrill"),
      };
    case "mock":
      return {
        icon: "trophy-outline",
        title: "सराव मुलाखत: ५ प्रश्नांची उत्तरे न वाचता द्या",
        go: (n) => n.navigate("InterviewKit"),
      };
  }
}

// A goal journey: pick one, then do each day's tasks and mark the day done.
export default function JourneyScreen({ navigation }: StackProps<"Journey">) {
  const { progress, saveJourney } = useProgress();
  const [confirm, setConfirm] = useState(false);
  // "Day done" sits where "Start" was; needing a task first stops a double tap skipping day 1.
  const [opened, setOpened] = useState(false);
  const state = progress.journey;
  const journey = state && journeyById(state.id);
  const recommended = journeyForGoal(progress.profile?.goal);

  if (!state || !journey) {
    return (
      <Shell>
        <Label>ध्येय प्रवास · GOAL JOURNEY</Label>
        <Heading
          title="एक ध्येय, ठरलेले दिवस"
          sub="रोज थोडे काम आणि शेवटी स्पष्ट निकाल. एक प्रवास निवडा; नंतर बदलता येईल."
        />
        <View style={{ gap: 12 }}>
          {[...JOURNEYS]
            .sort(
              (a, b) =>
                Number(b.id === recommended) - Number(a.id === recommended),
            )
            .map((j) => (
              <View key={j.id} style={[s.phraseCard, { gap: 8 }]}>
                {j.id === recommended && (
                  <Label>तुमच्या ध्येयासाठी सुचवलेले</Label>
                )}
                <Text style={s.sectionTitle}>{j.mr}</Text>
                <Text style={s.smallMuted}>{j.title}</Text>
                <Text style={s.body}>{j.sub}</Text>
                <Button
                  secondary={j.id !== recommended}
                  title={`सुरू करा · ${j.days.length} दिवस`}
                  onPress={() =>
                    saveJourney({ id: j.id, start: localDate(), done: [] })
                  }
                />
              </View>
            ))}
        </View>
      </Shell>
    );
  }

  const day = currentDay(state);
  const next = nextLessonFor(
    progress.path,
    progress.completed,
    progress.lastLesson,
  );
  const total = journey.days.length;
  return (
    <Shell>
      <Label>ध्येय प्रवास · GOAL JOURNEY</Label>
      <Heading title={journey.mr} sub={journey.title} />
      <ProgressBar
        value={state.done.length}
        max={total}
        label="प्रवासाची प्रगती"
      />
      <Text style={[s.smallMuted, { marginTop: 6 }]}>
        {state.done.length} / {total} दिवस पूर्ण
      </Text>
      {day === null ? (
        <>
          <Celebration
            emoji="🏆"
            title="प्रवास पूर्ण! अभिनंदन."
            sub={`${total} दिवसांचा प्रवास तुम्ही पूर्ण केलात. आवाज डायरीत पहिला आणि आजचा आवाज ऐका.`}
          />
          <Button
            title="आवाज डायरी उघडा"
            onPress={() => navigation.navigate("VoiceDiary")}
          />
          <View style={{ height: 10 }} />
          <Button
            secondary
            title="नवीन प्रवास निवडा"
            onPress={() => saveJourney(undefined)}
          />
        </>
      ) : (
        <View style={[s.phraseCard, { gap: 10, marginTop: 16 }]}>
          <Label>
            दिवस {day} / {total}
          </Label>
          {journey.days[day - 1].map((t, i) => {
            const info = taskInfo(t, next);
            return (
              <Pressable
                key={i}
                accessibilityRole="button"
                onPress={() => {
                  setOpened(true);
                  info.go?.(navigation);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  minHeight: 48,
                }}
              >
                <Icon name={info.icon} size={22} color={C.green} />
                <Text style={[s.body, { flex: 1 }]}>{info.title}</Text>
                <Icon name="chevron-forward" size={18} color={C.muted} />
              </Pressable>
            );
          })}
          <Button
            icon="checkmark"
            title={`दिवस ${day} पूर्ण · Day done`}
            disabled={!opened}
            onPress={() => {
              setOpened(false);
              saveJourney({ ...state, done: [...state.done, day] });
            }}
          />
          {!opened && (
            <Text style={s.smallMuted}>आधी वरचे एखादे काम उघडा.</Text>
          )}
        </View>
      )}
      <View style={[s.pillRow, { marginTop: 18, flexWrap: "wrap" }]}>
        {journey.days.map((_, i) => {
          const d = i + 1;
          const done = state.done.includes(d);
          return (
            <View
              key={d}
              accessible
              accessibilityLabel={`दिवस ${d}: ${done ? "पूर्ण" : "बाकी"}`}
              style={[s.stepChip, done && s.stepChipOn]}
            >
              <Text style={[s.stepChipText, done && s.stepChipTextOn]}>
                {done ? "✓" : d}
              </Text>
            </View>
          );
        })}
      </View>
      {day !== null && (
        <Pressable
          accessibilityRole="button"
          onPress={() => (confirm ? saveJourney(undefined) : setConfirm(true))}
          style={{ minHeight: 48, justifyContent: "center", marginTop: 14 }}
        >
          <Text style={[s.link, { textAlign: "center" }]}>
            {confirm
              ? "नक्की? पूर्ण केलेले दिवस जातील · Tap again to change"
              : "प्रवास बदला · Change journey"}
          </Text>
        </Pressable>
      )}
    </Shell>
  );
}
