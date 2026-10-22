import type { TabProps } from "../navigation/types";
import React, { useState } from "react";
import { View, TextInput, Pressable, ScrollView } from "react-native";
import { lessons, categories } from "../data/course";
import {
  nextLessonFor,
  pathLessons,
  pathUnits,
  readingUnit,
  unitLessons,
  unitById,
} from "../curriculum";
import type { PathId } from "../curriculum";
import { PATHS } from "../curriculum/types";
import { useProgress } from "../state/progress";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
  Collapsible,
  SegmentTabs,
} from "../components/ui";
import { LessonCard } from "../components/cards";
import { s } from "../components/styles";
import { C } from "../components/theme";

export { nextLessonFor };
export const pathInfo: Record<
  PathId,
  { mr: string; en: string; sub: string; short: string }
> = {
  foundation: {
    short: "पाया",
    mr: "पाया: अक्षरे आणि आवाज",
    en: "Foundation",
    sub: "वर्णमाला, उच्चार आवाज आणि पहिले शब्द",
  },
  beginner: {
    short: "सुरुवात",
    mr: "सुरुवातीपासून शिका",
    en: "Beginner",
    sub: "अक्षरांपासून रोजच्या संभाषणापर्यंत",
  },
  intermediate: {
    short: "मध्यम",
    mr: "आत्मविश्वासाने बोला",
    en: "Intermediate",
    sub: "लांब उत्तरे, मत, कामाचे आणि रोजचे प्रसंग",
  },
  advanced: {
    short: "व्यावसायिक",
    mr: "व्यावसायिक इंग्रजी (प्रायोगिक)",
    en: "Advanced · Preview",
    sub: "सौम्य भाषा, वाटाघाटी, आक्षेप आणि औपचारिक ईमेल · पहिला युनिट",
  },
};

export default function Learn({ navigation, route }: TabProps<"Learn">) {
  const { progress, setPath } = useProgress();
  const [query, setQuery] = useState("");
  const active = route.params?.category;
  const path = progress.path;
  const next = nextLessonFor(path, progress.completed, progress.lastLesson);
  const searching = !!query.trim() || !!active;
  const matches = lessons.filter(
    (l) =>
      (!active || l.category === active) &&
      `${l.title} ${l.subtitle} ${l.rule} ${l.examples.map((e) => e.en + " " + e.mr).join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const units = pathUnits(path);
  return (
    <Shell>
      <Label>तुमचा शिकण्याचा मार्ग · LEARN</Label>
      <Heading
        title="शब्दांपासून संवादापर्यंत"
        sub="मार्ग निवडा किंवा कोणताही धडा उघडा. सर्व धडे खुले आहेत; कोणताही कालावधी किंवा प्रवाहीपणाचे आश्वासन नाही."
      />
      <SegmentTabs
        label="शिकण्याचा मार्ग · Level"
        value={path}
        onChange={setPath}
        options={PATHS.map((id) => [id, pathInfo[id].short] as const)}
      />
      <View style={[s.pathCard, s.pathCardOn, { marginTop: 8 }]}>
        <Label light>निवडलेला मार्ग · {pathInfo[path].en}</Label>
        <Text style={[s.sectionTitle, { color: C.heroText }]}>
          {pathInfo[path].mr}
        </Text>
        <Text style={[s.smallMuted, { color: C.heroSub }]}>
          {pathInfo[path].sub} ·{" "}
          {
            pathLessons(path).filter((l) => progress.completed.includes(l.id))
              .length
          }{" "}
          / {pathLessons(path).length} धडे वाचले
        </Text>
      </View>
      <View style={s.pillRow}>
        <Button
          small
          icon="grid-outline"
          title="व्याकरण तक्ता · Grammar"
          onPress={() => navigation.navigate("Grammar")}
        />
        <Button
          small
          secondary
          icon="compass-outline"
          title={
            progress.placement
              ? "चाचणी पुन्हा करा · ऐच्छिक"
              : "कुठून सुरू करू? · चाचणी"
          }
          onPress={() => navigation.navigate("Placement")}
        />
      </View>
      {progress.placement && (
        <Text style={s.smallMuted}>
          मागील शिफारस: {unitById(progress.placement.unit)?.title}. ही प्रमाणित
          चाचणी नाही.
        </Text>
      )}
      {readingUnit && (
        <Collapsible
          icon="reader-outline"
          title="इंग्रजी वाचायला अडचण येते का?"
          sub="ऐच्छिक · Reading foundations"
        >
          <Text style={s.body}>
            अक्षरांचे आवाज, शब्द जोडून वाचणे आणि छोटी वाक्ये. हे आवश्यक नाही;
            कधीही सुरू करा.
          </Text>
          {unitLessons(readingUnit).map((l) => (
            <LessonCard
              key={l.id}
              item={l}
              onPress={() => navigation.navigate("Lesson", { id: l.id })}
            />
          ))}
        </Collapsible>
      )}
      <View style={{ height: 6 }} />
      <View style={s.search}>
        <TextInput
          accessibilityLabel="धडे शोधा · Search lessons"
          value={query}
          onChangeText={setQuery}
          placeholder="धडा किंवा इंग्रजी शब्द शोधा…"
          placeholderTextColor={C.muted}
          style={s.input}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filters}
      >
        {[{ id: "all", short: "सर्व धडे", title: "All" }, ...categories].map((c) => {
          const on = (!active && c.id === "all") || active === c.id;
          return (
            <Pressable
              key={c.id}
              accessibilityRole="button"
              accessibilityLabel={`${c.short} · ${c.title}`}
              accessibilityState={{ selected: on }}
              onPress={() =>
                navigation.setParams({
                  category: c.id === "all" ? undefined : c.id,
                })
              }
              style={({ pressed }) => [
                s.filter,
                on && s.filterActive,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={[s.filterText, on && { color: C.onPrimary }]}>
                {c.short}
                <Text style={[s.filterSub, on && { color: C.onPrimary }]}>
                  {" "}· {c.title}
                </Text>
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {searching ? (
        <>
          {matches.map((l) => (
            <LessonCard
              key={l.id}
              item={l}
              onPress={() => navigation.navigate("Lesson", { id: l.id })}
            />
          ))}
          {!matches.length && (
            <Text style={s.marathiBody}>
              धडा सापडला नाही. दुसरा शब्द शोधून पाहा.
            </Text>
          )}
        </>
      ) : (
        units.map((unit, index) => {
          const all = unitLessons(unit);
          const done = all.filter((l) =>
            progress.completed.includes(l.id),
          ).length;
          const cp = progress.checkpoints[unit.id];
          return (
            <Collapsible
              key={unit.id}
              icon={done === all.length ? "checkmark-circle" : "albums-outline"}
              title={`${index + 1}. ${unit.title}`}
              sub={`${done}/${all.length} धडे · ${unit.en}${unit.optional ? " · ऐच्छिक" : ""}`}
              initiallyOpen={
                next ? all.some((l) => l.id === next.id) : index === 0
              }
            >
              <Text style={s.body}>{unit.outcome[1]}</Text>
              <Text style={s.smallMuted}>{unit.outcome[0]}</Text>
              {all.map((l) => (
                <View key={l.id}>
                  {l.id === next?.id && (
                    <Text style={[s.link, { marginTop: 15 }]}>
                      येथून पुढे शिका · NEXT LESSON
                    </Text>
                  )}
                  {!progress.completed.includes(l.id) &&
                    progress.steps[l.id] !== undefined && (
                      <Text style={s.smallMuted}>
                        सुरू आहे · टप्पा {progress.steps[l.id] + 1}
                      </Text>
                    )}
                  <LessonCard
                    item={l}
                    onPress={() => navigation.navigate("Lesson", { id: l.id })}
                  />
                </View>
              ))}
              {unit.checkpoint && (
                <Pressable
                  accessibilityRole="button"
                  onPress={() =>
                    navigation.navigate("Checkpoint", { unit: unit.id })
                  }
                  style={[s.lessonRow, { borderBottomWidth: 0 }]}
                >
                  <View style={[s.smallIcon, { backgroundColor: C.lime }]}>
                    <Text style={[s.catSymbol, { color: C.onLime }]}>✓</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.rowTitle}>
                      युनिट चेकपॉइंट · नवीन परिस्थिती
                    </Text>
                    <Text style={s.smallMuted}>
                      {cp
                        ? `मागील निकाल ${cp.correct}/${cp.total}`
                        : "नवीन प्रसंगात शिकलेले वापरा"}
                    </Text>
                  </View>
                </Pressable>
              )}
            </Collapsible>
          );
        })
      )}
      {!searching && (
        <View style={{ marginTop: 26 }}>
          <Button
            secondary
            title={`दुसरा मार्ग पाहा · ${pathInfo[path === "beginner" ? "intermediate" : "beginner"].en}`}
            onPress={() =>
              setPath(path === "beginner" ? "intermediate" : "beginner")
            }
          />
        </View>
      )}
    </Shell>
  );
}
