import type { StackProps } from "../navigation/types";
import React from "react";
import { View } from "react-native";
import { allExercises } from "../curriculum";
import { localDate, useProgress } from "../state/progress";
import {
  MIN_ATTEMPTS,
  SKILL_AREAS,
  skillInfo,
  skillOfExercise,
  skillStats,
  speakingSelfReport,
  summarize,
  type Level,
  type SkillArea,
} from "../state/skills";
import { effectiveDate, skillPractice } from "../daily/engine";
import { AppText as Text, Button, Heading, Label, Shell } from "../components/ui";
import { EmptyState } from "../components/cards";
import { Exercise } from "../components/Exercise";
import { s } from "../components/styles";
import { C } from "../components/theme";

const levelText: Record<Level, string> = {
  strong: "बलस्थान ✓",
  ok: "चांगली प्रगती",
  weak: "सुधारणा हवी",
  unknown: "अजून माहिती कमी",
};
const levelColor = (): Record<Level, string> => ({
  strong: C.green,
  ok: C.ink,
  weak: C.danger,
  unknown: C.muted,
});

export default function Skills({ navigation }: StackProps<"Skills">) {
  const { progress } = useProgress();
  const stats = skillStats(progress, allExercises);
  const { strengths, weaknesses, focus } = summarize(stats);
  const names = (list: typeof stats) =>
    list.map((x) => skillInfo[x.skill].mr).join(", ");
  const spoken = speakingSelfReport(progress);
  return (
    <Shell>
      <Label>तुमची कौशल्ये · SKILLS</Label>
      <Heading
        title="कुठे मजबूत, कुठे सराव हवा"
        sub="तुम्ही दिलेल्या उत्तरांवरून. हा सराव-निर्देशक आहे; भाषेच्या पातळीचा पुरावा, परीक्षा किंवा CEFR प्रमाणपत्र नाही."
      />
      <View style={s.goalCard}>
        <Label>सारांश · SUMMARY</Label>
        {strengths.length > 0 && (
          <Text style={s.body}>बलस्थाने: {names(strengths)}</Text>
        )}
        {weaknesses.length > 0 && (
          <Text style={s.body}>सराव हवा: {names(weaknesses)}</Text>
        )}
        {!strengths.length && !weaknesses.length && (
          <Text style={s.body}>
            अजून पुरेशी माहिती नाही. प्रत्येक कौशल्यात किमान {MIN_ATTEMPTS}{" "}
            प्रश्न सोडवल्यावर बलस्थाने आणि कमकुवत भाग दिसतील.
          </Text>
        )}
        {focus && focus.total > 0 && (
          <Button
            title={`सुचवलेला सराव: ${skillInfo[focus.skill].mr}`}
            onPress={() => navigation.navigate("SkillPractice", { skill: focus.skill })}
          />
        )}
      </View>
      {stats.map((st) => (
        <View key={st.skill} style={s.goalCard}>
          <View style={[s.goalRow, { justifyContent: "space-between" }]}>
            <Text style={s.sectionTitle}>
              {skillInfo[st.skill].mr} · {skillInfo[st.skill].en}
            </Text>
          </View>
          <Text style={[s.rowTitle, { color: levelColor()[st.level] }]}>
            {levelText[st.level]}
            {st.level === "unknown" ? ` (${st.attempted}/${MIN_ATTEMPTS})` : ""}
          </Text>
          <View
            style={s.track}
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: Math.max(st.attempted, 1), now: st.correct }}
          >
            <View style={[s.trackFill, { width: `${st.pct * 100}%` }]} />
          </View>
          <Text style={s.smallMuted}>
            {st.attempted
              ? `${st.attempted} प्रश्न सोडवले · सध्या ${st.correct} बरोबर`
              : "अजून प्रश्न सोडवलेले नाहीत"}
          </Text>
          {st.excluded > 0 && (
            <Text style={s.smallMuted}>
              {st.excluded} प्रश्न मजकूर पाहून सोडवले; ते मोजले नाहीत.
            </Text>
          )}
          <Text style={s.smallMuted}>
            काय मोजते: {skillInfo[st.skill].measures}
          </Text>
          <Text style={s.smallMuted}>
            काय मोजत नाही: {skillInfo[st.skill].notMeasured}
          </Text>
          {st.total > 0 && (
            <Button
              secondary
              title="या कौशल्याचा सराव · Practise"
              onPress={() => navigation.navigate("SkillPractice", { skill: st.skill })}
            />
          )}
        </View>
      ))}
      <View style={s.goalCard}>
        <Label>बोलण्याचा सराव · SPEAKING (SELF-REPORTED)</Label>
        <Text style={s.body}>
          तुम्ही नोंदवलेला बोलण्याचा सराव: {spoken.practice} वेळा.
          {spoken.averageConfidence !== undefined
            ? ` तुमच्या स्वतःच्या आत्मविश्वासाची सरासरी: ${spoken.averageConfidence.toFixed(1)} / 3 (${spoken.rated} धड्यांवर).`
            : " अजून आत्मविश्वासाची नोंद नाही."}
        </Text>
        <Text style={s.smallMuted}>
          हे फक्त तुम्ही स्वतः सांगितलेले आहे. रेकॉर्डिंग तपासले जात नाही, त्याला
          गुण दिले जात नाहीत आणि वरील निर्देशकांत मिसळले जात नाही.
        </Text>
      </View>
    </Shell>
  );
}

export function SkillPractice({ route }: StackProps<"SkillPractice">) {
  const { progress } = useProgress();
  // Params can come from an old saved navigation state; validate anyway.
  const skill: SkillArea = SKILL_AREAS.includes(route.params?.skill)
    ? route.params.skill
    : "vocabulary";
  const date = effectiveDate(localDate(), progress.clock);
  // Fixed when the screen opens so answering does not reshuffle the set.
  const [set] = React.useState(() =>
    skillPractice(skill, date, progress, allExercises, skillOfExercise),
  );
  const items = set as typeof allExercises;
  return (
    <Shell>
      <Label>सराव · PRACTICE</Label>
      <Heading
        title={`${skillInfo[skill].mr} · ${skillInfo[skill].en}`}
        sub="आधी चुकलेले प्रश्न, मग नवे. उत्तरे उजळणीत नोंदवली जातात."
      />
      {items.length ? (
        items.map((e) => <Exercise key={e.id} item={e} />)
      ) : (
        <EmptyState title="या कौशल्यासाठी प्रश्न नाहीत" sub="इतर धडे पूर्ण केल्यावर प्रश्न येतील." />
      )}
    </Shell>
  );
}
