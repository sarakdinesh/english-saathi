import type { TabProps } from "../navigation/types";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { useProgress, streakFor, localDate } from "../state/progress";
import { allExercises } from "../curriculum";
import { skillInfo, skillStats, summarize } from "../state/skills";
import { goalInfo } from "../state/onboarding";
import { useDaily } from "../daily/useDaily";
import { DailyToday } from "./Daily";
import { duration } from "../data/journey";
import { kits, pathLessons, unitOf } from "../curriculum";
import { nextLessonFor, pathInfo } from "./Learn";
import {
  AppText as Text,
  Shell,
  Label,
  Button,
  Icon,
  Section,
} from "../components/ui";
import { ProgressCard } from "../components/cards";
import { s } from "../components/styles";
import { C } from "../components/theme";

const confidenceWord = [
  "",
  "अजून सराव हवा",
  "थोडा आत्मविश्वास",
  "आत्मविश्वास आहे",
];

export default function Home({ navigation }: TabProps<"Home">) {
  const { progress } = useProgress();
  const [now, setNow] = useState(Date.now());
  useFocusEffect(
    useCallback(() => {
      setNow(Date.now());
      const timer = setInterval(() => setNow(Date.now()), 30000);
      return () => clearInterval(timer);
    }, []),
  );
  const path = progress.path;
  const list = pathLessons(path);
  const next = nextLessonFor(path, progress.completed, progress.lastLesson);
  const resume = !!next && progress.steps[next.id] !== undefined;
  const due = Object.values(progress.reviews).filter(
    (r) => r.due <= now,
  ).length;
  const daily = useDaily();
  const dailyWords = daily.plan.words;
  const today = progress.daily[daily.plan.date] ?? [];
  const count = list.filter((l) => progress.completed.includes(l.id)).length;
  const unit = next ? unitOf(next.id) : undefined;
  const learnedToday = today.filter((x) => dailyWords.includes(x)).length;
  const goals = [
    { label: "एक धडा पूर्ण करा", done: today.includes("lesson") },
    { label: `पाच शब्द शिका (${learnedToday}/5)`, done: learnedToday >= 5 },
    { label: "एक वाक्य मोठ्याने बोला", done: today.includes("speak") },
  ];
  const marathiDays = ["र", "सो", "मं", "बु", "गु", "शु", "श"];
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return {
      date,
      label: marathiDays[d.getDay()],
      on: progress.dates.includes(date),
    };
  });
  // One recommended speaking activity: the current lesson's role-play, else a phrase drill.
  const nextKit = next ? kits[next.id] : undefined;
  const speakRec = nextKit
    ? {
        title: nextKit.rp.title,
        sub: "ठरलेला संवाद सराव · " + nextKit.rp.en,
        go: () => navigation.navigate("RolePlay", { id: nextKit.rp.id }),
      }
    : {
        title: "रोजचे वाक्य मोठ्याने बोला",
        sub: "उच्चारासह दुकान, प्रवास आणि ऑफिसची वाक्ये",
        go: () => navigation.navigate("Phrasebook"),
      };
  const kitIds = list.map((l) => kits[l.id]).filter(Boolean);
  const exTotal = kitIds.reduce((n, k) => n + k.ex.length, 0);
  const exOk = kitIds.reduce(
    (n, k) => n + k.ex.filter((e) => progress.mastered.includes(e.id)).length,
    0,
  );
  const speakCount = Object.entries(progress.speaking)
    .filter(
      ([id]) =>
        list.some((l) => id === l.id || id === `rp-${l.id}`) ||
        ((path === "intermediate" || path === "advanced") && id.startsWith("talk-")),
    )
    .reduce((n, [, v]) => n + v.task + v.role, 0);
  const rated = list
    .map((l) => progress.confidence[l.id])
    .filter(Boolean) as number[];
  const skillSummary = summarize(skillStats(progress, allExercises));
  const streak = streakFor(progress.dates);
  const avg = rated.length
    ? Math.round(rated.reduce((a, b) => a + b, 0) / rated.length)
    : 0;
  return (
    <Shell>
      <View style={[s.welcome, { marginTop: 4 }]}>
        <Label>थोडे शिका. रोज बोला.</Label>
        <Text style={s.greeting}>नमस्कार! आज थोडं इंग्रजी बोलूया.</Text>
        <Text style={s.subtitle}>
          {streak > 0
            ? `🔥 ${streak} दिवसांची सलग वाटचाल`
            : "आज एक छोटी सुरुवात पुरेशी आहे."}
        </Text>
        {progress.profile && (
          <Text style={s.smallMuted}>
            🎯 {goalInfo[progress.profile.goal].mr} · दररोज{" "}
            {progress.profile.studyMinutes} मिनिटे
          </Text>
        )}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`तुमचा मार्ग: ${pathInfo[path].mr}. मार्ग बदलण्यासाठी दाबा.`}
        onPress={() => navigation.navigate("Learn")}
        style={s.pathPill}
      >
        <Text style={s.smallMuted}>
          तुमचा मार्ग: <Text style={s.rowTitle}>{pathInfo[path].mr}</Text> ·{" "}
          {pathInfo[path].en}
        </Text>
        <Text style={s.link}>बदला →</Text>
      </Pressable>
      <View style={s.hero}>
        <View style={s.heroTop}>
          <Text style={s.heroTag}>
            {next ? "CONTINUE LEARNING" : "PATH COMPLETE"}
          </Text>
          <Text style={s.heroBadgeText}>
            {count}/{list.length} धडे
          </Text>
        </View>
        <Text style={s.heroTitle}>
          {next ? next.title : "अभिनंदन! छान वाटचाल."}
        </Text>
        <Text style={[s.heroMarathi, { fontSize: 16, lineHeight: 27 }]}>
          {next
            ? nextKit
              ? nextKit.can[1]
              : next.subtitle
            : "या मार्गातील सर्व धडे वाचले आहेत. आता सराव आणि उजळणी सुरू ठेवा."}
        </Text>
        {!!unit && next && (
          <Text style={[s.heroMarathi, { marginBottom: 14 }]}>
            {unit.title} · सुमारे {duration(next.id) + (nextKit ? 8 : 0)} मिनिटे
          </Text>
        )}
        <Button
          accent
          title={
            next
              ? resume
                ? "पुढे सुरू ठेवा"
                : "शिकायला सुरुवात करा"
              : "उजळणी करा"
          }
          onPress={() =>
            next
              ? navigation.navigate("Lesson", { id: next.id })
              : navigation.navigate("Review")
          }
        />
      </View>
      <DailyToday />
      <Section title="आजची बोलण्याची शिफारस" />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${speakRec.title}. ${speakRec.sub}`}
        onPress={speakRec.go}
        style={({ pressed }) => [s.lessonRow, { opacity: pressed ? 0.65 : 1 }]}
      >
        <View style={[s.smallIcon, { backgroundColor: C.lime }]}>
          <Icon name="mic-outline" color={C.onLime} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.rowTitle}>{speakRec.title}</Text>
          <Text style={s.smallMuted}>{speakRec.sub}</Text>
        </View>
        <Icon name="chevron-forward" />
      </Pressable>
      <View style={s.dailyCard}>
        <Label>आठवण पक्की करूया · REVIEW</Label>
        <Text style={s.sectionTitle}>
          {due ? `${due} गोष्टींची उजळणी बाकी` : "सध्या उजळणी बाकी नाही"}
        </Text>
        <Text style={s.body}>
          चुकलेले प्रश्न, अवघड शब्द आणि तुम्ही निवडलेली वाक्ये विसरायला
          लागण्याच्या सुमारास पुन्हा येतात. बरोबर उत्तर दिले की पुढची उजळणी
          जास्त दिवसांनी येते.
        </Text>
        <View style={{ height: 12 }} />
        <Button
          secondary
          title="उजळणी सुरू करा · Review"
          onPress={() => navigation.navigate("Review")}
        />
      </View>
      <ProgressCard
        label="तुमची प्रगती · PRACTICAL PROGRESS"
        note="चार गोष्टी वेगवेगळ्या मोजल्या जातात. त्या बोलण्याच्या पातळीचा पुरावा नाहीत."
        rows={[
          ["धडे वाचले", `${count} / ${list.length}`],
          [
            "प्रश्नांवरील कामगिरी (सध्या बरोबर)",
            exTotal ? `${exOk} / ${exTotal}` : "—",
          ],
          ["बोलण्याचा सराव (स्वतः नोंदवलेला)", `${speakCount} वेळा`],
          [
            "तुमचा आत्मविश्वास (स्वतः सांगितलेला)",
            avg ? confidenceWord[avg] : "अजून नोंद नाही",
          ],
        ]}
        value={count}
        total={list.length}
      />
      <View style={s.goalCard}>
        <Label>कौशल्य प्रगती · SKILLS</Label>
        <Text style={s.body}>
          {skillSummary.strengths.length || skillSummary.weaknesses.length
            ? [
                skillSummary.strengths.length
                  ? `बलस्थाने: ${skillSummary.strengths.map((x) => skillInfo[x.skill].mr).join(", ")}`
                  : "",
                skillSummary.weaknesses.length
                  ? `सराव हवा: ${skillSummary.weaknesses.map((x) => skillInfo[x.skill].mr).join(", ")}`
                  : "",
              ]
                .filter(Boolean)
                .join("\n")
            : "वाचन, श्रवण, व्याकरण आणि शब्दसंग्रहातील तुमची प्रगती पाहा."}
        </Text>
        <Button
          secondary
          title="सर्व कौशल्ये पाहा · Skills"
          onPress={() => navigation.navigate("Skills")}
        />
        <View style={{ height: 10 }} />
        <Button
          secondary
          title="व्याकरण सूत्र तक्ता · Grammar"
          onPress={() => navigation.navigate("Grammar")}
        />
      </View>
      <View style={s.goalCard}>
        <Label>आजचे ध्येय · DAILY GOAL</Label>
        <Text style={s.sectionTitle}>
          {goals.every((g) => g.done)
            ? "आजचे ध्येय पूर्ण! 🎉"
            : `${goals.filter((g) => g.done).length} / ${goals.length} पूर्ण`}
        </Text>
        {goals.map((g) => (
          <View key={g.label} style={s.goalRow}>
            <View style={[s.goalDot, g.done && s.goalDotDone]}>
              {g.done && <Icon name="checkmark" size={16} color={C.onPrimary} />}
            </View>
            <Text style={s.body}>{g.label}</Text>
          </View>
        ))}
        <View style={s.weekRow}>
          {week.map((d) => (
            <View key={d.date} style={s.weekDay}>
              <View style={[s.weekBar, d.on && s.weekBarOn]} />
              <Text style={s.smallMuted}>{d.label}</Text>
            </View>
          ))}
        </View>
        <Text style={s.smallMuted}>
          या आठवड्यात {week.filter((d) => d.on).length} / ७ दिवस सराव
        </Text>
      </View>
    </Shell>
  );
}
