import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText as Text, Icon, IconName } from "../components/ui";
import { C, themed } from "../components/theme";
import { TAB_ROUTES, type StackParams } from "../navigation/types";

export type MenuItem = {
  icon: IconName;
  mr: string;
  en: string;
  // Stack screens (no params needed from the menu) or a tab inside Main.
  route: MenuRoute;
};
type Group = { title: string; tint: string; ink: string; items: MenuItem[] };

// Routes that live inside the bottom-tab navigator rather than the root stack.
type ParamFree = {
  [K in keyof StackParams]: undefined extends StackParams[K] ? K : never;
}[keyof StackParams];
export type MenuRoute = Exclude<ParamFree, "Main"> | (typeof TAB_ROUTES)[number];
export const isTabRoute = (route: string): route is (typeof TAB_ROUTES)[number] =>
  (TAB_ROUTES as readonly string[]).includes(route);

const groups = (): Group[] => [
  {
    title: "शिका · LEARN",
    tint: C.greenTint,
    ink: C.green,
    items: [
      { icon: "book-outline", mr: "सर्व धडे", en: "Lessons", route: "Learn" },
      { icon: "list-outline", mr: "व्याकरण तक्ता", en: "Grammar chart", route: "Grammar" },
      { icon: "text-outline", mr: "पाच शब्द शिका", en: "Words", route: "Words" },
      { icon: "newspaper-outline", mr: "वाचायला सुरुवात", en: "Reading basics", route: "Foundations" },
      { icon: "navigate-outline", mr: "कुठून सुरू करू?", en: "Starting check", route: "Placement" },
    ],
  },
  {
    title: "बोला · SPEAK",
    tint: C.amberTint,
    ink: C.amberInk,
    items: [
      { icon: "chatbubbles-outline", mr: "बोलण्याची वाक्ये", en: "Phrasebook", route: "Phrasebook" },
      { icon: "mic-outline", mr: "बोलण्याचा सराव", en: "Speaking drill", route: "SpeakDrill" },
      { icon: "people-outline", mr: "संवाद सराव", en: "Role-plays", route: "RolePlayList" },
    ],
  },
  {
    title: "सराव · PRACTICE",
    tint: C.limeTint,
    ink: C.olive,
    items: [
      { icon: "flame-outline", mr: "आजचा सराव", en: "Daily quiz", route: "DailyQuiz" },
      { icon: "help-circle-outline", mr: "मिश्र प्रश्न", en: "Mixed quiz", route: "Quiz" },
      { icon: "alert-circle-outline", mr: "सामान्य चुका", en: "Mistakes", route: "Mistakes" },
      { icon: "refresh-outline", mr: "उजळणी", en: "Review", route: "Review" },
    ],
  },
  {
    title: "माझी प्रगती · MY PROGRESS",
    tint: C.blueTint,
    ink: C.blueInk,
    items: [
      { icon: "stats-chart-outline", mr: "कौशल्ये", en: "Skills", route: "Skills" },
      { icon: "bookmark-outline", mr: "जतन केलेले", en: "Saved", route: "Saved" },
      { icon: "settings-outline", mr: "सेटिंग्ज", en: "Settings", route: "Settings" },
    ],
  },
];

// The Menu tab only opens the sheet; it never renders a page of its own.
export default function Menu() {
  return null;
}

// Bottom sheet listing every section of the app; tapping a tile jumps there.
export function MenuSheet({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (item: MenuItem) => void;
}) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const m = menuStyles();
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== "web",
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: Platform.OS !== "web",
      }).start(({ finished }) => finished && setMounted(false));
    }
  }, [visible, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  return (
    <Modal
      transparent
      visible={mounted}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={m.overlay}>
        <Animated.View style={[StyleSheet.absoluteFill, m.scrim, { opacity: progress }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="बंद करा · Close menu"
            style={StyleSheet.absoluteFill}
            onPress={onClose}
          />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
          style={[
            m.sheet,
            { maxHeight: height * 0.86, transform: [{ translateY }] },
          ]}
        >
          <View style={m.handle} />
          <View style={m.head}>
            <View style={{ flex: 1 }}>
              <Text style={m.title}>सर्व विभाग</Text>
              <Text style={m.subtitle}>सर्व विभाग · थेट तिथे जा</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="बंद करा · Close menu"
              hitSlop={8}
              onPress={onClose}
              style={({ pressed }) => [m.close, pressed && { opacity: 0.6 }]}
            >
              <Icon name="close" size={20} color={C.ink} />
            </Pressable>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 14 + insets.left,
              paddingBottom: 20 + insets.bottom,
            }}
          >
            {groups().map((g) => (
              <View key={g.title} style={{ marginTop: 14 }}>
                <Text style={m.groupTitle}>{g.title}</Text>
                <View style={m.grid}>
                  {g.items.map((it) => (
                    <View key={it.route} style={m.cell}>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`${it.mr} · ${it.en}`}
                        onPress={() => onSelect(it)}
                        style={({ pressed }) => [m.tile, pressed && m.tilePressed]}
                      >
                        <View style={[m.iconWrap, { backgroundColor: g.tint }]}>
                          <Icon name={it.icon} size={22} color={g.ink} />
                        </View>
                        <Text style={m.tileMr} numberOfLines={2}>
                          {it.mr}
                        </Text>
                        <Text style={m.tileEn} numberOfLines={1}>
                          {it.en}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const menuStyles = themed(() =>
  StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  scrim: { backgroundColor: C.scrim },
  sheet: {
    width: "100%",
    maxWidth: 700,
    backgroundColor: C.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    shadowColor: C.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -6 },
    elevation: 24,
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.line,
    marginTop: 10,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 6,
  },
  title: { fontSize: 21, fontWeight: "700", color: C.ink, lineHeight: 30 },
  subtitle: { fontSize: 12, color: C.muted, lineHeight: 18 },
  close: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.line,
    alignItems: "center",
    justifyContent: "center",
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: C.muted,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: "33.3333%", padding: 4 },
  tile: {
    backgroundColor: C.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.line,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    minHeight: 112,
    shadowColor: C.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  tilePressed: { backgroundColor: C.pressed, transform: [{ scale: 0.97 }] },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },
  // alignSelf: stretch — a centred label that shrinks to its measured width
  // clipped its last word on Android ("संवाद सराव" showed "संवाद").
  tileMr: {
    alignSelf: "stretch",
    fontSize: 13,
    fontWeight: "700",
    color: C.ink,
    textAlign: "center",
    lineHeight: 21,
  },
  tileEn: {
    alignSelf: "stretch",
    fontSize: 11,
    color: C.muted,
    textAlign: "center",
    lineHeight: 16,
  },
  }),
);
