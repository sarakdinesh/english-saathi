// Short celebrations with the built-in Animated API. Respects the phone's
// "reduce motion" setting: content still appears, just without movement.
import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Platform, View } from "react-native";
import { AppText as Text } from "./ui";
import { s } from "./styles";

export function useReduceMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    let live = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((v) => live && setReduce(v))
      .catch(() => {});
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduce);
    return () => {
      live = false;
      sub?.remove();
    };
  }, []);
  return reduce;
}

// Springs its children in (scale + fade). Static when motion is reduced or
// `animate` is false.
export function Pop({
  children,
  animate = true,
  delay = 0,
}: {
  children: React.ReactNode;
  animate?: boolean;
  delay?: number;
}) {
  const reduce = useReduceMotion();
  const still = !animate || reduce;
  const v = useRef(new Animated.Value(still ? 1 : 0)).current;
  useEffect(() => {
    if (still) {
      v.setValue(1);
      return;
    }
    const run = Animated.sequence([
      Animated.delay(delay),
      Animated.spring(v, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]);
    run.start();
    return () => run.stop();
  }, [still]);
  return (
    <Animated.View
      style={{
        opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: "clamp" }),
        transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }],
      }}
    >
      {children}
    </Animated.View>
  );
}

// A celebration card: large emoji, title and an optional line.
export function Celebration({
  emoji,
  title,
  sub,
  animate = true,
  delay = 0,
}: {
  emoji: string;
  title: string;
  sub?: string;
  animate?: boolean;
  delay?: number;
}) {
  return (
    <Pop animate={animate} delay={delay}>
      <View style={s.celebrate} accessible accessibilityLiveRegion="polite">
        <Text style={s.celebrateEmoji} accessibilityElementsHidden importantForAccessibility="no">
          {emoji}
        </Text>
        <Text style={s.celebrateTitle}>{title}</Text>
        {!!sub && <Text style={[s.body, { textAlign: "center" }]}>{sub}</Text>}
      </View>
    </Pop>
  );
}
