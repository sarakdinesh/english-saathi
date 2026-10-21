import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  Pressable,
  ScrollView,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { categories, lessons, words, questions } from "./src/data/course";
import { situations, phraseKey } from "./src/data/speaking";
import { ProgressProvider, useProgress, localDate } from "./src/state/progress";

import { C } from "./src/components/theme";
import { s } from "./src/components/styles";
import { LessonCard, EmptyState, ExerciseCard } from "./src/components/cards";
type StackParams = {
  Main: undefined;
  Lesson: { id: string };
  Quiz: undefined;
  Words: { daily?: boolean } | undefined;
  Saved: undefined;
  Settings: undefined;
  SpeakDrill: undefined;
  Mistakes: undefined;
  RolePlay: { id: string };
  RolePlayList: undefined;
  Placement: undefined;
  Checkpoint: { unit: string };
  LongTalk: { id: string };
  Phrasebook: { situation?: string; sounds?: boolean } | undefined;
  Foundations: undefined;
  UnitPractice: { lesson: string };
  DailyQuiz: undefined;
  Onboarding: undefined;
  Skills: undefined;
  SkillPractice: { skill: string };
};
import Home from "./src/screens/Home";
import { syncReminders } from "./src/components/reminderService";
import Skills, { SkillPractice } from "./src/screens/Skills";
import Onboarding from "./src/screens/Onboarding";
import { needsOnboarding } from "./src/state/onboarding";
import { DailyQuiz } from "./src/screens/Daily";
import { useDaily } from "./src/daily/useDaily";
import Learn from "./src/screens/Learn";
import LessonScreen from "./src/screens/Lesson";
import { SpeakDrill, Mistakes } from "./src/screens/Practice";
import RolePlay from "./src/screens/RolePlay";
import Speak, { RolePlayList } from "./src/screens/Speak";
import { Placement, Checkpoint, LongTalk } from "./src/screens/Assess";
import Phrasebook from "./src/screens/Phrasebook";
import Settings from "./src/screens/Settings";
import Review, { UnitPractice, Foundations } from "./src/screens/Review";
import { Listen, Recorder } from "./src/components/Audio";
const Stack = createNativeStackNavigator<StackParams>();
const Tab = createBottomTabNavigator();
import {
  Icon,
  IconName,
  Button,
  Shell,
  Label,
  Heading,
  Section,
  AppText as Text,
} from "./src/components/ui";
function WordsScreen({ route, navigation }: any) {
  const { progress, toggleSave, activity, review } = useProgress();
  const [query, setQuery] = useState("");
  const { plan } = useDaily();
  const daily = plan.words.map((id) => words.find((w) => w.id === id)!);
  const matches = (route.params?.daily ? daily : words).filter((w) =>
    `${w.en} ${w.mr}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Shell>
      <Label>A FEW WORDS, A NEW WORLD</Label>
      <Heading
        title="Everyday words"
        sub="शब्द शिका. वाक्यात वापरा. लक्षात ठेवा."
      />
      <View style={s.search}>
        <Icon name="search-outline" />
        <TextInput
          accessibilityLabel="Search vocabulary"
          style={s.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Find a word or मराठी अर्थ…"
        />
      </View>
      <Text style={s.smallMuted}>
        {matches.length} शब्द ·{" "}
        {route.params?.daily ? "आजचे पाच शब्द" : "सर्व शब्द"}
      </Text>
      {route.params?.daily && (
        <Button
          secondary
          title="सर्व १०० शब्द पाहा · All words"
          onPress={() => navigation.setParams({ daily: false })}
        />
      )}
      {matches.map((w) => (
        <View key={w.id} style={s.dailyCard}>
          <View style={s.dailyHead}>
            <View style={{ flex: 1 }}>
              <Text style={s.sectionTitle}>{w.en}</Text>
              <Text style={s.marathiBody}>{w.mr}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                progress.saved.includes(w.id)
                  ? `Remove ${w.en} bookmark`
                  : `Save ${w.en}`
              }
              onPress={() => toggleSave(w.id)}
              style={s.bookmark}
            >
              <Icon
                name={
                  progress.saved.includes(w.id)
                    ? "bookmark"
                    : "bookmark-outline"
                }
                color={C.green}
              />
            </Pressable>
          </View>
          <Listen text={w.en} />
          <View style={{ gap: 10, marginTop: 14 }}>
            <Button
              secondary
              title="हा शब्द अवघड आहे · Review sooner"
              onPress={() => review(w.id, false)}
            />
            <Button
              secondary
              disabled={(progress.daily[localDate()] ?? []).includes(w.id)}
              title={
                (progress.daily[localDate()] ?? []).includes(w.id)
                  ? "आज शिकलो ✓"
                  : "आज शिकलो · Learned today"
              }
              onPress={() => {
                activity(w.id);
                review(w.id, true);
              }}
            />
          </View>
          {progress.reviews[w.id] && (
            <Text accessibilityLiveRegion="polite" style={s.smallMuted}>
              उजळणी नियोजित:{" "}
              {new Date(progress.reviews[w.id].due).toLocaleString()}
            </Text>
          )}
          <View style={s.wordExample}>
            <Text style={s.exampleEnglish}>{w.example}</Text>
            <Text style={s.marathiBody}>{w.translation}</Text>
          </View>
        </View>
      ))}
      {!matches.length && (
        <EmptyState title="No words found" sub="वेगळा शब्द शोधून पहा." />
      )}
    </Shell>
  );
}
function QuizScreen({
  navigation,
}: NativeStackScreenProps<StackParams, "Quiz">) {
  const { recordQuiz, review } = useProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [missed, setMissed] = useState<number[]>([]);
  const [pool, setPool] = useState(questions.map((_, i) => i));
  const questionId = pool[index];
  const q = questions[questionId];
  function next() {
    const correct = selected === q.answer;
    const total = score + (correct ? 1 : 0);
    setScore(total);
    review(`quiz-${questionId}`, correct);
    if (!correct) setMissed((m) => [...m, questionId]);
    if (index === pool.length - 1) {
      if (pool.length === questions.length)
        recordQuiz(Math.round((total / pool.length) * 100));
      setDone(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  }
  if (done)
    return (
      <Shell>
        <View style={s.speakBanner}>
          <Icon name="ribbon-outline" size={64} color={C.green} />
          <Label>PRACTICE COMPLETE</Label>
          <Text style={s.resultScore}>
            {Math.round((score / pool.length) * 100)}%
          </Text>
          <Text style={s.sectionTitle}>
            {score} of {pool.length} correct
          </Text>
          <Text style={s.marathiBody}>
            छान प्रयत्न! रोजच्या सरावाने आत्मविश्वास वाढतो.
          </Text>
        </View>
        {missed.length > 0 && (
          <>
            <Section title="A little revision" />
            {missed.map((i) => (
              <View key={i} style={s.dailyCard}>
                <Text style={s.rowTitle}>{questions[i].prompt}</Text>
                <Text
                  style={[s.exampleEnglish, { color: C.green, marginTop: 10 }]}
                >
                  {questions[i].options[questions[i].answer]}
                </Text>
                <Text style={s.marathiBody}>{questions[i].explanation}</Text>
              </View>
            ))}
          </>
        )}
        <Button
          title={
            missed.length
              ? "चुकलेले प्रश्न पुन्हा सोडवा · Retry missed"
              : "पुन्हा सराव करा · Try again"
          }
          onPress={() => {
            setPool(missed.length ? missed : questions.map((_, i) => i));
            setIndex(0);
            setScore(0);
            setSelected(null);
            setMissed([]);
            setDone(false);
          }}
        />
        <View style={{ height: 12 }} />
        <Button
          title="Back to learning"
          secondary
          onPress={() => navigation.goBack()}
        />
      </Shell>
    );
  return (
    <Shell>
      <ExerciseCard
        header={`QUESTION ${index + 1} OF ${pool.length}`}
        prompt={q.prompt}
        options={q.options}
        answer={q.answer}
        selected={selected}
        explanation={q.explanation}
        onSelect={setSelected}
      />
      {selected !== null && (
        <Button
          title={index === pool.length - 1 ? "See my results" : "Next question"}
          onPress={next}
        />
      )}
    </Shell>
  );
}
function Saved({ navigation }: any) {
  const { progress } = useProgress();
  const savedLessons = lessons.filter((l) => progress.saved.includes(l.id));
  const savedWords = words.filter((w) => progress.saved.includes(w.id));
  const savedPhrases = situations.flatMap((x) =>
    x.phrases.filter((p) => progress.saved.includes(phraseKey(x.id, p.en))),
  );
  return (
    <Shell>
      <Label>YOUR PERSONAL COLLECTION</Label>
      <Heading
        title="Keep the good words."
        sub="आवडलेले धडे आणि शब्द पुन्हा पाहा."
      />
      {!savedLessons.length && !savedWords.length && !savedPhrases.length ? (
        <EmptyState
          title="A little empty, for now."
          sub="धडा किंवा शब्दावरील bookmark दाबा. तुमचा संग्रह येथे दिसेल."
        />
      ) : (
        <>
          <Section title={`Saved lessons · ${savedLessons.length}`} />
          {savedLessons.map((l) => (
            <LessonCard
              key={l.id}
              item={l}
              onPress={() => navigation.navigate("Lesson", { id: l.id })}
            />
          ))}
          <Section title={`Saved words · ${savedWords.length}`} />
          {savedWords.map((w) => (
            <View key={w.id} style={s.dailyCard}>
              <Text style={s.rowTitle}>
                {w.en} · {w.mr}
              </Text>
              <Text style={s.marathiBody}>{w.example}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate("Words")}
              >
                <Text style={[s.link, { marginTop: 12 }]}>
                  Manage saved words →
                </Text>
              </Pressable>
            </View>
          ))}
          {savedPhrases.length > 0 && (
            <>
              <Section title={`Saved phrases · ${savedPhrases.length}`} />
              {savedPhrases.map((p) => (
                <View key={p.en} style={s.phraseCard}>
                  <Text style={s.phraseEn}>{p.en}</Text>
                  <Text style={s.sayText}>{p.say}</Text>
                  <Text style={s.marathiBody}>{p.mr}</Text>
                  <Listen text={p.en} compact />
                </View>
              ))}
            </>
          )}
        </>
      )}
      <View style={s.tip}>
        <Icon name="lock-closed-outline" />
        <Text style={[s.body, { flex: 1 }]}>
          तुमची प्रगती या device वर सेव्ह होते. App data clear केल्यास ती हटेल.
        </Text>
      </View>
    </Shell>
  );
}
const tabIcons: Record<string, IconName> = {
  Home: "home-outline",
  Learn: "book-outline",
  Speak: "chatbubbles-outline",
  Review: "refresh-outline",
  Saved: "bookmark-outline",
};
function Tabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: C.green,
        tabBarInactiveTintColor: C.muted,
        // Content height plus the real bottom inset (gesture bar, three-button
        // bar, home indicator); room for tall Marathi glyphs.
        tabBarStyle: {
          backgroundColor: C.white,
          borderTopColor: C.line,
          height: 62 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarAllowFontScaling: true,
        tabBarIcon: ({ color }) => (
          <Icon name={tabIcons[route.name]} color={color} size={22} />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: "घर", tabBarAccessibilityLabel: "Home · घर" }}
      />
      <Tab.Screen
        name="Learn"
        component={Learn}
        options={{
          tabBarLabel: "शिका",
          tabBarAccessibilityLabel: "Learn · शिका",
        }}
      />
      <Tab.Screen
        name="Speak"
        component={Speak}
        options={{
          tabBarLabel: "बोला",
          tabBarAccessibilityLabel: "Speak · बोला",
        }}
      />
      <Tab.Screen
        name="Review"
        component={Review}
        options={{
          tabBarLabel: "उजळणी",
          tabBarAccessibilityLabel: "Review · उजळणी",
        }}
      />
    </Tab.Navigator>
  );
}
function useReminderSync() {
  const { ready, progress } = useProgress();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const sub = AppState.addEventListener("change", (s) => {
      if (s === "active") setTick((n) => n + 1);
    });
    return () => sub.remove();
  }, []);
  const studied = progress.dates.includes(localDate());
  const { reminder, profile } = progress;
  useEffect(() => {
    if (!ready) return;
    syncReminders(reminder, profile?.minutes ?? 15, studied).catch(() => {});
  }, [ready, reminder, profile?.minutes, studied, tick]);
}
function Root() {
  const { ready, error, progress } = useProgress();
  useReminderSync();
  const { width } = useWindowDimensions();
  return (
    <View style={[s.root, width > 700 && { paddingVertical: 20 }]}>
      <View style={s.appFrame}>
        <StatusBar style="dark" />
        {error && (
          <Text accessibilityRole="alert" style={s.error}>
            {error}
          </Text>
        )}
        {!ready ? (
          <View style={s.empty}>
            <ActivityIndicator color={C.green} />
            <Text style={s.body}>Getting your lessons ready…</Text>
          </View>
        ) : (
          <NavigationContainer
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                background: C.bg,
                primary: C.green,
              },
            }}
          >
            <Stack.Navigator
              initialRouteName={needsOnboarding(progress) ? "Onboarding" : "Main"}
              screenOptions={{
                // Every screen draws one fixed AppHeader via Shell.
                headerShown: false,
                animation: "none",
                contentStyle: { backgroundColor: C.bg },
              }}
            >
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ title: "स्वागत" }}
              />
              <Stack.Screen name="Skills" component={Skills} options={{ title: "कौशल्ये" }} />
              <Stack.Screen
                name="SkillPractice"
                component={SkillPractice}
                options={{ title: "कौशल्य सराव" }}
              />
              <Stack.Screen
                name="Main"
                component={Tabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Saved"
                component={Saved}
                options={{ title: "जतन केलेले · Saved" }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ title: "सेटिंग्ज · Settings" }}
              />
              <Stack.Screen
                name="Phrasebook"
                component={Phrasebook}
                options={{ title: "बोलण्याची वाक्ये · Phrasebook" }}
              />
              <Stack.Screen
                name="SpeakDrill"
                component={SpeakDrill}
                options={{ title: "बोलण्याचा सराव" }}
              />
              <Stack.Screen
                name="RolePlay"
                component={RolePlay}
                options={{ title: "संवाद सराव" }}
              />
              <Stack.Screen
                name="RolePlayList"
                component={RolePlayList}
                options={{ title: "सर्व संवाद" }}
              />
              <Stack.Screen
                name="Placement"
                component={Placement}
                options={{ title: "सुरुवातीची चाचणी" }}
              />
              <Stack.Screen
                name="Checkpoint"
                component={Checkpoint}
                options={{ title: "युनिट चेकपॉइंट" }}
              />
              <Stack.Screen
                name="LongTalk"
                component={LongTalk}
                options={{ title: "दीर्घ बोलणे" }}
              />
              <Stack.Screen
                name="Mistakes"
                component={Mistakes}
                options={{ title: "सामान्य चुका" }}
              />
              <Stack.Screen
                name="Foundations"
                component={Foundations}
                options={{ title: "वाचनाची सुरुवात" }}
              />
              <Stack.Screen
                name="UnitPractice"
                component={UnitPractice}
                options={{ title: "युनिट सराव" }}
              />
              <Stack.Screen
                name="Lesson"
                component={LessonScreen}
                options={{ title: "Your lesson" }}
              />
              <Stack.Screen
                name="Words"
                component={WordsScreen}
                options={{ title: "Word collection" }}
              />
              <Stack.Screen
                name="DailyQuiz"
                component={DailyQuiz}
                options={{ title: "आजचा सराव" }}
              />
              <Stack.Screen
                name="Quiz"
                component={QuizScreen}
                options={{ title: "Daily practice" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </View>
    </View>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <Root />
      </ProgressProvider>
    </SafeAreaProvider>
  );
}
