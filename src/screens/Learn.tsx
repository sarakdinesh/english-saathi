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
import { useProgress } from "../state/progress";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
} from "../components/ui";
import { LessonCard } from "../components/cards";
import { s } from "../components/styles";
import { C } from "../components/theme";

export { nextLessonFor };
export const pathInfo: Record<PathId, { mr: string; en: string; sub: string }> =
  {
    foundation: {
      mr: "पाया: अक्षरे आणि आवाज",
      en: "Foundation",
      sub: "वर्णमाला, उच्चार आवाज आणि पहिले शब्द",
    },
    beginner: {
      mr: "सुरुवातीपासून शिका",
      en: "Beginner",
      sub: "अक्षरांपासून रोजच्या संभाषणापर्यंत",
    },
    intermediate: {
      mr: "आत्मविश्वासाने बोला",
      en: "Intermediate",
      sub: "लांब उत्तरे, मत, कामाचे आणि रोजचे प्रसंग",
    },
  };

export default function Learn({ navigation, route }: any) {
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
      {(["foundation", "beginner", "intermediate"] as PathId[]).map((id) => {
        const list = pathLessons(id);
        const done = list.filter((l) =>
          progress.completed.includes(l.id),
        ).length;
        const on = path === id;
        return (
          <Pressable
            key={id}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            onPress={() => setPath(id)}
            style={[s.pathCard, on && s.pathCardOn]}
          >
            <Label light={on}>
              {pathInfo[id].en.toUpperCase()} {on ? "· निवडलेला" : ""}
            </Label>
            <Text style={[s.sectionTitle, on && { color: C.white }]}>
              {pathInfo[id].mr}
            </Text>
            <Text style={[s.smallMuted, on && { color: "#C1CEBF" }]}>
              {pathInfo[id].sub}
            </Text>
            <Text style={[s.smallMuted, on && { color: "#C1CEBF" }]}>
              {done} / {list.length} धडे वाचले
            </Text>
          </Pressable>
        );
      })}
      <View style={{ height: 6 }} />
      <Button
        title="व्याकरण सूत्र तक्ता · Grammar chart"
        onPress={() => navigation.navigate("Grammar")}
      />
      <View style={{ height: 10 }} />
      <Button
        secondary
        title={
          progress.placement
            ? "सुरुवातीची चाचणी पुन्हा करा · ऐच्छिक"
            : "कुठून सुरू करू? · ऐच्छिक चाचणी"
        }
        onPress={() => navigation.navigate("Placement")}
      />
      {progress.placement && (
        <Text style={s.smallMuted}>
          मागील शिफारस: {unitById(progress.placement.unit)?.title}. ही प्रमाणित
          चाचणी नाही.
        </Text>
      )}
      {readingUnit && (
        <View style={s.dailyCard}>
          <Label>ऐच्छिक · READING FOUNDATIONS</Label>
          <Text style={s.sectionTitle}>इंग्रजी वाचायला अडचण येते का?</Text>
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
        </View>
      )}
      <View style={{ height: 16 }} />
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
        {[{ id: "all", title: "सर्व धडे" }, ...categories].map((c) => {
          const on = (!active && c.id === "all") || active === c.id;
          return (
            <Pressable
              key={c.id}
              accessibilityRole="button"
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
              <Text style={[s.filterText, on && { color: C.white }]}>
                {c.title}
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
            <View key={unit.id} style={{ marginTop: 26 }}>
              <Label>
                UNIT {index + 1} · {unit.en}
                {unit.optional ? " · ऐच्छिक" : ""}
              </Label>
              <Text style={s.sectionTitle}>{unit.title}</Text>
              <Text style={s.body}>
                {unit.outcome[0]}
                {"\n"}
                {unit.outcome[1]}
              </Text>
              <Text style={s.smallMuted}>
                {done}/{all.length} धडे वाचले
              </Text>
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
                    <Text style={s.catSymbol}>✓</Text>
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
            </View>
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
