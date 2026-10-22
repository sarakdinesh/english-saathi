// Lesson screen: works out which stage to show, saves the learner's position
// and handles finishing. The stages themselves live in ./lesson/.
import type { StackProps } from "../navigation/types";
import React, { useState } from "react";
import { View } from "react-native";
import { duration, exercises as legacyList } from "../data/journey";
import { lessonMinutes, lessonStages, minutesLeft, stagePosition } from "../state/steps";
import { celebrationsOn, unitJustCompleted, weekSummary } from "../state/encourage";
import { Celebration } from "../components/Celebrate";
import { localDate } from "../state/progress";
import { kits, lessonById, orderedLessons, unitOf } from "../curriculum";
import { useProgress } from "../state/progress";
import { AppText as Text, Button, Heading, Shell } from "../components/ui";
import { s } from "../components/styles";
import {
  LAST_STAGE,
  LessonHeader,
  StageNav,
  legacyNames,
  stageNames,
} from "./lesson/parts";
import {
  GoalStage,
  ListenStage,
  PracticeStage,
  RecapStage,
  RolePlayStage,
  RuleStage,
  TaskStage,
} from "./lesson/stages";
import LegacyBody from "./lesson/LegacyBody";

export default function Lesson({ navigation, route }: StackProps<"Lesson">) {
  const { progress, step, complete, toggleSave, activity } = useProgress();
  const item = lessonById(route.params.id);
  const kit = item ? kits[item.id] : undefined;
  const unit = item ? unitOf(item.id) : undefined;
  // Beginner-style support (Marathi shown by default) below Intermediate.
  const beginner = unit?.path !== "intermediate" && unit?.path !== "advanced";
  const [justDone, setJustDone] = useState<number | null>(null);
  // Set when the lesson was just finished: shows the celebration before moving on.
  const [finished, setFinished] = useState<{ unitDone: boolean } | null>(null);
  const [n, setN] = useState(
    Math.min(progress.steps[route.params.id] ?? 0, LAST_STAGE),
  );
  if (!item)
    return (
      <Shell>
        <Heading title="धडा सापडला नाही" />
        <Button title="मागे जा" onPress={() => navigation.goBack()} />
      </Shell>
    );
  const legacy = legacyList.filter((e) => e.lesson === item.id);
  // Lessons without a full kit keep the original reading/listening/speaking flow.
  const stages = lessonStages(!!kit || legacy.length > 0);
  const names = kit ? stageNames : legacyNames;
  const position = stagePosition(stages, n);
  const current = stages[position];
  const left = minutesLeft(lessonMinutes(duration(item.id), !!kit), stages.length, position);
  const go = (value: number) => {
    setN(value);
    step(item.id, value);
  };
  const next = () => {
    // A short "✓ stage done" moment on the following stage; not stored.
    setJustDone(position);
    go(stages[Math.min(position + 1, stages.length - 1)]);
  };
  const following = orderedLessons[orderedLessons.findIndex((l) => l.id === item.id) + 1];
  const opensCheckpoint =
    !!unit?.checkpoint &&
    unit.lessons[unit.lessons.length - 1] === item.id &&
    !progress.checkpoints[unit.id];
  const moveOn = () => {
    if (opensCheckpoint) navigation.replace("Checkpoint", { unit: unit!.id });
    else if (following) navigation.replace("Lesson", { id: following.id });
    else navigation.goBack();
  };
  const celebrate = celebrationsOn(progress.settings);
  const finish = () => {
    // Only the first time the unit's last lesson is finished.
    const unitDone =
      !!unit &&
      !progress.completed.includes(item.id) &&
      unitJustCompleted(unit.lessons, progress.completed, item.id);
    complete(item.id);
    activity("lesson");
    if (celebrate) setFinished({ unitDone });
    else moveOn();
  };
  if (finished) {
    const week = weekSummary(progress.daily, progress.dates, localDate());
    return (
      <Shell>
        <View style={{ height: 8 }} />
        <Celebration
          emoji="🎉"
          title="धडा पूर्ण! छान काम."
          sub={`${item.title} · आज तुम्ही एक पाऊल पुढे गेलात.`}
        />
        {finished.unitDone && unit && (
          <Celebration
            emoji="🏆"
            title={`युनिट पूर्ण: ${unit.title}`}
            sub={`${unit.lessons.length} धडे पूर्ण · ${unit.en}`}
            delay={350}
          />
        )}
        <Text style={[s.smallMuted, { textAlign: "center", marginBottom: 16 }]}>
          {week.text}
        </Text>
        <Button
          title={
            opensCheckpoint
              ? "युनिट चेकपॉइंट · पुढे"
              : following
                ? "पुढचा धडा · Next lesson"
                : "पूर्ण · Done"
          }
          onPress={moveOn}
        />
        <View style={{ height: 10 }} />
        <Button
          secondary
          icon="home-outline"
          title="आत्ता इतकेच · Back"
          onPress={() => navigation.goBack()}
        />
      </Shell>
    );
  }
  const stageProps = kit ? { item, kit, beginner } : undefined;
  return (
    <Shell key={current}>
      <LessonHeader
        item={item}
        unit={unit}
        names={names}
        stages={stages}
        position={position}
        minutesLeft={left}
        justDone={justDone === position - 1 ? justDone : null}
        celebrate={celebrate}
        saved={progress.saved.includes(item.id)}
        onToggleSave={() => toggleSave(item.id)}
      />
      {!stageProps ? (
        <LegacyBody
          item={item}
          current={current}
          onSpoke={() => {
            activity("speak");
            next();
          }}
        />
      ) : current === 0 ? (
        <GoalStage {...stageProps} />
      ) : current === 1 ? (
        <RuleStage {...stageProps} />
      ) : current === 2 ? (
        <ListenStage {...stageProps} />
      ) : current === 3 ? (
        <PracticeStage {...stageProps} />
      ) : current === 4 ? (
        <TaskStage {...stageProps} />
      ) : current === 5 ? (
        <RolePlayStage
          {...stageProps}
          onStart={() => navigation.navigate("RolePlay", { id: stageProps.kit.rp.id })}
        />
      ) : (
        <RecapStage {...stageProps} />
      )}
      <StageNav
        isLast={current === LAST_STAGE}
        finishTitle={
          opensCheckpoint
            ? "धडा पूर्ण करा · युनिट चेकपॉइंट"
            : following
              ? "धडा पूर्ण करा · पुढचा धडा"
              : "धडा पूर्ण करा · अभिनंदन!"
        }
        canGoBack={position > 0}
        onNext={next}
        onPrevious={() => {
          setJustDone(null);
          go(stages[position - 1]);
        }}
        onFinish={finish}
      />
    </Shell>
  );
}
