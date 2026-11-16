// Launch screen shown over the app while progress loads. It draws the logo at
// the same size and place as the native splash (android res
// splashscreen_logo: 150dp wide, centred), so launch looks like one screen,
// then fades away as soon as storage is ready. No minimum time.
import React, { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, Easing, Platform, StyleSheet } from "react-native";
import { BRAND } from "../brand";
import { palettes } from "./theme";

// The launch screen is always on the light brand surface (like the native
// splash), so it uses the light palette whatever the scheme.
const L = palettes.light;
const native = Platform.OS !== "web";

export function Splash({ ready, onDone }: { ready: boolean; onDone: () => void }) {
  const exit = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!ready) return;
    let finished = false;
    const finish = () => {
      if (!finished) (finished = true), onDone();
    };
    let fallback: ReturnType<typeof setTimeout> | undefined;
    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduce) => {
        const duration = reduce ? 120 : 220;
        Animated.timing(exit, {
          toValue: 1,
          duration,
          easing: Easing.in(Easing.quad),
          useNativeDriver: native,
        }).start(finish);
        // Animations can stall (app sent to background mid-launch, a paused
        // web tab); the splash must never block the app.
        fallback = setTimeout(finish, duration + 400);
      });
    return () => clearTimeout(fallback);
  }, [ready]);

  return (
    <Animated.View
      style={[
        styles.root,
        { opacity: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) },
      ]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`${BRAND.full}. तुमचे धडे तयार होत आहेत…`}
    >
      <Animated.Image
        source={require("../../assets/splash-mark.png")}
        resizeMode="contain"
        style={[
          styles.mark,
          {
            transform: [
              { scale: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) },
            ],
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: L.splash,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  // 560×435 source at 150dp wide, matching the native splash logo.
  mark: { width: 150, height: 117 },
});
