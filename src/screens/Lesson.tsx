// Lesson screen: works out which stage to show, saves the learner's position
// and handles finishing. The stages themselves live in ./lesson/.
import type { StackProps } from "../navigation/types";
import React, { useState } from "react";
import { exercises as legacyList } from "../data/journey";
import { kits, lessonById, orderedLessons, unitOf } from "../curriculum";
import { useProgress } from "../state/progress";
import { Button, Heading, Shell } from "../components/ui";
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
  const stages = kit || legacy.length ? [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 5, 6];
  const names = kit ? stageNames : legacyNames;
  const position = Math.max(stages.indexOf(n), 0);
  const current = stages[position];
  const go = (value: number) => {
    setN(value);
    step(item.id, value);
  };
  const next = () => go(stages[Math.min(position + 1, stages.length - 1)]);
  const following = orderedLessons[orderedLessons.findIndex((l) => l.id === item.id) + 1];
  const opensCheckpoint =
    !!unit?.checkpoint &&
    unit.lessons[unit.lessons.length - 1] === item.id &&
    !progress.checkpoints[unit.id];
  const finish = () => {
    complete(item.id);
    activity("lesson");
    if (opensCheckpoint) navigation.replace("Checkpoint", { unit: unit!.id });
    else if (following) navigation.replace("Lesson", { id: following.id });
    else navigation.goBack();
  };
  const stageProps = kit ? { item, kit, beginner } : undefined;
  return (
    <Shell key={current}>
      <LessonHeader
        item={item}
        unit={unit}
        names={names}
        stages={stages}
        position={position}
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
        onPrevious={() => go(stages[position - 1])}
        onFinish={finish}
      />
    </Shell>
  );
}
