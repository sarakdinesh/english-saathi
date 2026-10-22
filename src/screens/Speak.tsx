import type { StackProps, TabProps } from "../navigation/types";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { categories, lessons } from "../data/course";
import { rolePlays, talks, pathLessons } from "../curriculum";
import { pathInfo } from "./Learn";
import { useProgress } from "../state/progress";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
  Icon,
  IconName,
} from "../components/ui";
import { Listen, Recorder } from "../components/Audio";
import { s } from "../components/styles";
import { C } from "../components/theme";

function Section({ title, sub }: { title: string; sub?: string }) {
  return (
    <View style={{ marginTop: 26, marginBottom: 8 }}>
      <Text style={s.sectionTitle}>{title}</Text>
      {!!sub && <Text style={s.smallMuted}>{sub}</Text>}
    </View>
  );
}

export default function Speak({ navigation }: TabProps<"Speak">) {
  const { progress, activity, markSpeaking } = useProgress();
  const [revealed, setRevealed] = useState<string[]>([]);
  const [topic, setTopic] = useState("conversation");
  const [prompt, setPrompt] = useState<string | null>(null);
  const path = progress.path;
  const dayIndex = Math.floor(Date.now() / 86400000);
  // Personal prompts come from the learner's own path, rotated daily.
  const personal = useMemo(() => {
    const list = pathLessons(path).filter((l) => l.task);
    return Array.from(
      { length: Math.min(3, list.length) },
      (_, i) => list[(dayIndex + i * 7) % list.length],
    );
  }, [path, dayIndex]);
  const level = rolePlays.filter((r) => r.level === path);
  const featured = level.filter((r) => r.featured);
  const prompts = lessons.filter((l) => l.category === topic);
  return (
    <Shell>
      <Label>FIND YOUR ENGLISH VOICE</Label>
      <Heading
        title="Let's talk, a little."
        sub={`${pathInfo[path].mr} · परिपूर्ण बोलण्यापेक्षा, बोलायला सुरुवात करा.`}
      />
      <View style={s.noteBox}>
        <Text style={s.body}>
          येथे स्वतःचा सराव आहे. अॅप तुमचे बोलणे ऐकत नाही, उच्चार तपासत नाही आणि
          प्रवाहीपणाचे गुण देत नाही. मोठ्याने बोला, ऐका, पुन्हा करा.
        </Text>
      </View>

      <Section
        title="१. ऐका आणि म्हणा · Listen and repeat"
        sub="रोजची वाक्ये, ऐका, मग स्वतः म्हणा"
      />
      <View style={s.speakTiles}>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("Phrasebook")}
          style={s.speakTile}
        >
          <Icon name="chatbox-ellipses-outline" color={C.tileAccent} size={26} />
          <Text style={s.speakTileTitle}>रोजची वाक्ये</Text>
          <Text style={s.speakTileSub}>दुकान, प्रवास, ऑफिस</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("Phrasebook", { sounds: true })}
          style={s.speakTile}
        >
          <Icon name="volume-high-outline" color={C.tileAccent} size={26} />
          <Text style={s.speakTileTitle}>उच्चार टिप्स</Text>
          <Text style={s.speakTileSub}>V/W, TH, S आणि जोर</Text>
        </Pressable>
      </View>
      <Button
        title="वाक्य बोलून पाहा · Speaking drill"
        onPress={() => navigation.navigate("SpeakDrill")}
      />
      <View style={{ height: 10 }} />
      <Button
        secondary
        title="सामान्य चुका · Common mistakes"
        onPress={() => navigation.navigate("Mistakes")}
      />

      <Section
        title="२. तुमच्या स्वतःच्या विषयावर बोला · Personal prompts"
        sub="आज तुमच्या मार्गातील तीन विषय"
      />
      {personal.map((l) => (
        <View key={l.id} style={s.phraseCard}>
          <Text style={s.rowTitle}>{l.title}</Text>
          <Text style={s.marathiBody}>{l.task}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setPrompt(prompt === l.id ? null : l.id)}
          >
            <Text style={[s.link, { marginTop: 10 }]}>
              {prompt === l.id ? "बंद करा ↑" : "रेकॉर्ड करा आणि नोंदवा →"}
            </Text>
          </Pressable>
          {prompt === l.id && (
            <>
              <Recorder />
              <Button
                secondary
                title="मी मोठ्याने बोललो/बोलले ✓"
                onPress={() => markSpeaking(l.id, "task")}
              />
              {(progress.speaking[l.id]?.task ?? 0) > 0 && (
                <Text style={s.smallMuted}>
                  नोंदवले: {progress.speaking[l.id].task} वेळा
                </Text>
              )}
            </>
          )}
        </View>
      ))}

      <Section
        title="३. संवाद सराव · Role-play"
        sub="ठरलेला संवाद. अॅप तुमचे बोलणे तपासत नाही."
      />
      {featured.map((r) => (
        <Pressable
          key={r.id}
          accessibilityRole="button"
          onPress={() => navigation.navigate("RolePlay", { id: r.id })}
          style={({ pressed }) => [s.lessonRow, pressed && { opacity: 0.65 }]}
        >
          <View style={[s.smallIcon, { backgroundColor: C.lime }]}>
            <Icon name="people-outline" color={C.onLime} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.rowTitle}>{r.title}</Text>
            <Text style={s.smallMuted}>
              {r.en}{" "}
              {progress.speaking[r.id]?.role
                ? `· ${progress.speaking[r.id].role} वेळा`
                : ""}
            </Text>
          </View>
          <Icon name="chevron-forward" color={C.muted} />
        </Pressable>
      ))}
      <Button
        secondary
        title={`सर्व संवाद पाहा (${level.length})`}
        onPress={() => navigation.navigate("RolePlayList")}
      />

      {path === "intermediate" || progress.completed.length > 20 ? (
        <>
          <Section
            title="४. दीर्घ बोलणे · 1–2 minute talks"
            sub="तयारी ऐच्छिक. मुद्दे, सुरुवातीची वाक्ये आणि टायमर"
          />
          {talks.map((t) => (
            <Pressable
              key={t.id}
              accessibilityRole="button"
              onPress={() => navigation.navigate("LongTalk", { id: t.id })}
              style={({ pressed }) => [
                s.lessonRow,
                pressed && { opacity: 0.65 },
              ]}
            >
              <View style={[s.smallIcon, { backgroundColor: C.lime }]}>
                <Icon name={"mic-outline" as IconName} color={C.onLime} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.rowTitle}>{t.mr}</Text>
                <Text style={s.smallMuted}>{t.title}</Text>
              </View>
              <Icon name="chevron-forward" color={C.muted} />
            </Pressable>
          ))}
        </>
      ) : (
        <View style={[s.noteBox, { marginTop: 22 }]}>
          <Text style={s.body}>
            दीर्घ बोलण्याचे विषय (१–२ मिनिटे) “आत्मविश्वासाने बोला” मार्गात
            उपलब्ध आहेत. Learn मध्ये मार्ग बदलून पाहा.
          </Text>
        </View>
      )}

      <Section
        title="५. मराठीतून इंग्रजी · Translate aloud"
        sub="मराठी वाक्य वाचा, इंग्रजीत म्हणा, मग उत्तर पाहा"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filters}
      >
        {["conversation", "formulas", "tenses", "modals"].map((id) => (
          <Pressable
            accessibilityRole="button"
            key={id}
            onPress={() => {
              setTopic(id);
              setRevealed([]);
            }}
            style={[s.filter, topic === id && s.filterActive]}
          >
            <Text style={[s.filterText, topic === id && { color: C.onPrimary }]}>
              {categories.find((c) => c.id === id)?.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      {prompts.map((l) => (
        <View key={l.id} style={s.dailyCard}>
          <Text style={s.sectionTitle}>{l.title}</Text>
          <Text style={s.marathiBody}>{l.task}</Text>
          {l.examples.map((e, i) => {
            const key = l.id + i;
            return (
              <View key={key} style={s.speakingExample}>
                <Text style={s.marathiBody}>{e.mr}</Text>
                {revealed.includes(key) ? (
                  <View>
                    <Text
                      style={[
                        s.exampleEnglish,
                        { color: C.green, marginTop: 8 },
                      ]}
                    >
                      {e.en}
                    </Text>
                    <Listen text={e.en} compact />
                  </View>
                ) : (
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => setRevealed([...revealed, key])}
                  >
                    <Text style={[s.link, { marginTop: 10 }]}>
                      Reveal English →
                    </Text>
                  </Pressable>
                )}
              </View>
            );
          })}
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate("Lesson", { id: l.id })}
          >
            <Text style={s.link}>Read full lesson →</Text>
          </Pressable>
        </View>
      ))}
      <View style={{ height: 8 }} />
      <Button
        secondary
        title="मी मोठ्याने बोलून सराव केला ✓"
        onPress={() => activity("speak")}
      />
    </Shell>
  );
}

// Every role-play for the chosen path, grouped by lesson order.
export function RolePlayList({ navigation }: StackProps<"RolePlayList">) {
  const { progress } = useProgress();
  const list = rolePlays.filter((r) => r.level === progress.path);
  return (
    <Shell>
      <Label>ROLE-PLAY LIBRARY</Label>
      <Heading
        title="संवाद सराव"
        sub={`${pathInfo[progress.path].mr} · ठरलेले संवाद`}
      />
      {list.map((r) => (
        <Pressable
          key={r.id}
          accessibilityRole="button"
          onPress={() => navigation.navigate("RolePlay", { id: r.id })}
          style={({ pressed }) => [s.lessonRow, pressed && { opacity: 0.65 }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={s.rowTitle}>{r.title}</Text>
            <Text style={s.smallMuted}>
              {r.en}
              {progress.speaking[r.id]?.role
                ? ` · ${progress.speaking[r.id].role} वेळा`
                : ""}
            </Text>
          </View>
          <Icon name="chevron-forward" color={C.muted} />
        </Pressable>
      ))}
    </Shell>
  );
}
