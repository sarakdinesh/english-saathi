// The original reading/listening/speaking flow, kept for lessons that do not
// yet have a complete curriculum kit.
import React from "react";
import { View } from "react-native";
import type { Lesson } from "../../data/course";
import { AppText as Text, Button, Label } from "../../components/ui";
import { Listen, Recorder } from "../../components/Audio";
import { s } from "../../components/styles";

export default function LegacyBody({
  item,
  current,
  onSpoke,
}: {
  item: Lesson;
  current: number;
  onSpoke: () => void;
}) {
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
        item.examples.map((e, i) => (
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
          <Button secondary title="मी मोठ्याने बोलून सराव केला ✓" onPress={onSpoke} />
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
