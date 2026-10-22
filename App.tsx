import React, { useEffect, useState } from "react";
import { ActivityIndicator, AppState, View, useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { ProgressProvider, useProgress, localDate } from "./src/state/progress";
import { C } from "./src/components/theme";
import { s } from "./src/components/styles";
import { BRAND } from "./src/brand";
import type { StackParams, TabParams } from "./src/navigation/types";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { syncReminders } from "./src/components/reminderService";
import { needsOnboarding } from "./src/state/onboarding";
import { Icon, IconName, AppText as Text } from "./src/components/ui";
import Home from "./src/screens/Home";
import Menu, { MenuSheet, MenuItem, isTabRoute } from "./src/screens/Menu";
import Grammar from "./src/screens/Grammar";
import Skills, { SkillPractice } from "./src/screens/Skills";
import Onboarding from "./src/screens/Onboarding";
import { DailyQuiz } from "./src/screens/Daily";
import Learn from "./src/screens/Learn";
import LessonScreen from "./src/screens/Lesson";
import { SpeakDrill, Mistakes } from "./src/screens/Practice";
import RolePlay from "./src/screens/RolePlay";
import Speak, { RolePlayList } from "./src/screens/Speak";
import { Placement, Checkpoint, LongTalk } from "./src/screens/Assess";
import Phrasebook from "./src/screens/Phrasebook";
import Settings from "./src/screens/Settings";
import Review, { UnitPractice, Foundations } from "./src/screens/Review";
import WordsScreen from "./src/screens/Words";
import QuizScreen from "./src/screens/Quiz";
import Saved from "./src/screens/Saved";

const Stack = createNativeStackNavigator<StackParams>();
const Tab = createBottomTabNavigator<TabParams>();
const tabIcons: Record<keyof TabParams, IconName> = {
  Home: "home-outline",
  Learn: "book-outline",
  Speak: "chatbubbles-outline",
  Review: "barbell-outline",
  Menu: "grid-outline",
};
function Tabs() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [menuOpen, setMenuOpen] = useState(false);
  function goTo(item: MenuItem) {
    setMenuOpen(false);
    if (isTabRoute(item.route))
      navigation.navigate("Main", { screen: item.route });
    else navigation.navigate(item.route, item.params);
  }
  return (
    <>
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
          <Icon name={tabIcons[route.name]} color={color} size={24} />
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
          tabBarLabel: "सराव",
          tabBarAccessibilityLabel: "Practice · सराव आणि उजळणी",
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: "आणखी",
          tabBarAccessibilityLabel: "More · सर्व विभाग",
        }}
        listeners={{
          tabPress: (e) => {
            // Opens the section popup instead of switching to a page.
            e.preventDefault();
            setMenuOpen(true);
          },
        }}
      />
    </Tab.Navigator>
    <MenuSheet
      visible={menuOpen}
      onClose={() => setMenuOpen(false)}
      onSelect={goTo}
    />
    </>
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
    syncReminders(reminder, profile?.studyMinutes ?? 15, studied).catch(() => {});
  }, [ready, reminder, profile?.studyMinutes, studied, tick]);
}
function Root() {
  const { ready, error, progress } = useProgress();
  useReminderSync();
  const { width } = useWindowDimensions();
  return (
    <View style={[s.root, width > 700 && { paddingVertical: 20 }]}>
      <View style={s.appFrame}>
        <StatusBar style="dark" />
        {!!error && (
          <Text accessibilityRole="alert" style={s.error}>
            {error}
          </Text>
        )}
        {!ready ? (
          <View style={s.empty}>
            <ActivityIndicator color={C.green} />
            <Text style={s.sectionTitle}>{BRAND.mr}</Text>
            <Text style={s.body}>तुमचे धडे तयार होत आहेत…</Text>
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
              <Stack.Screen name="Grammar" component={Grammar} options={{ title: "व्याकरण" }} />
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
      <ErrorBoundary>
        <ProgressProvider>
          <Root />
        </ProgressProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
