// Animated launch screen shown over the app while progress loads.
// The mark pops in over a soft ring, the wordmark rises after it, and a thin
// bar runs until storage is ready; then the whole screen fades away to
// reveal the already-mounted app. Reduce-motion users get a plain fade.
import React, { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Image,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { BRAND } from "../brand";
import { palettes } from "./theme";

// The launch screen is always on the light brand surface (like the native
// splash), so it uses the light palette whatever the scheme.
const L = palettes.light;

const native = Platform.OS !== "web";
// Long enough for the intro to finish; short enough not to delay learning.
const MIN_SHOW = 1500;

export function Splash({ ready, onDone }: { ready: boolean; onDone: () => void }) {
  const mark = useRef(new Animated.Value(0)).current;
  const ring = useRef(new Animated.Value(0)).current;
  const word = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;
  const exit = useRef(new Animated.Value(0)).current;
  const [introDone, setIntroDone] = useState(false);
  const [reduce, setReduce] = useState<boolean | null>(null);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then(setReduce)
      .catch(() => setReduce(false));
  }, []);

  useEffect(() => {
    if (reduce === null) return;
    if (reduce) {
      mark.setValue(1);
      word.setValue(1);
      setIntroDone(true);
      return;
    }
    Animated.parallel([
      Animated.spring(mark, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: native,
      }),
      Animated.timing(ring, {
        toValue: 1,
        duration: 1100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: native,
      }),
      Animated.timing(word, {
        toValue: 1,
        duration: 520,
        delay: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: native,
      }),
    ]).start();
    // The loading bar loops gently until storage is ready.
    const loop = Animated.loop(
      Animated.timing(bar, {
        toValue: 1,
        duration: 1100,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: native,
      }),
    );
    loop.start();
    const timer = setTimeout(() => setIntroDone(true), MIN_SHOW);
    return () => {
      loop.stop();
      clearTimeout(timer);
    };
  }, [reduce]);

  useEffect(() => {
    if (!ready || !introDone) return;
    const duration = reduce ? 200 : 380;
    let finished = false;
    const finish = () => {
      if (!finished) (finished = true), onDone();
    };
    Animated.timing(exit, {
      toValue: 1,
      duration,
      easing: Easing.in(Easing.quad),
      useNativeDriver: native,
    }).start(finish);
    // Animations can stall (app sent to background mid-launch, a paused
    // web tab); the splash must never block the app.
    const fallback = setTimeout(finish, duration + 400);
    return () => clearTimeout(fallback);
  }, [ready, introDone]);

  const fade = exit.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  return (
    <Animated.View
      style={[styles.root, { opacity: fade }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`${BRAND.full}. तुमचे धडे तयार होत आहेत…`}
    >
      <Animated.View
        style={{
          alignItems: "center",
          transform: [
            {
              scale: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }),
            },
          ],
        }}
      >
        <View style={styles.markWrap}>
          <Animated.View
            style={[
              styles.ring,
              {
                opacity: ring.interpolate({
                  inputRange: [0, 0.2, 1],
                  outputRange: [0, 0.5, 0],
                }),
                transform: [
                  {
                    scale: ring.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1.6],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.Image
            source={require("../../assets/splash-mark.png")}
            resizeMode="contain"
            style={[
              styles.mark,
              {
                opacity: mark.interpolate({
                  inputRange: [0, 0.4, 1],
                  outputRange: [0, 1, 1],
                  extrapolate: "clamp",
                }),
                transform: [
                  {
                    scale: mark.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.6, 1],
                    }),
                  },
                  {
                    rotate: mark.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["-8deg", "0deg"],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
        <Animated.View
          style={{
            opacity: word,
            transform: [
              {
                translateY: word.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }),
              },
            ],
          }}
        >
          <Image
            source={require("../../assets/splash-wordmark.png")}
            resizeMode="contain"
            style={styles.wordmark}
          />
        </Animated.View>
      </Animated.View>
      {!reduce && (
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.fill,
              {
                transform: [
                  {
                    translateX: bar.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-48, 120],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      )}
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
  markWrap: {
    width: 220,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: L.lime,
  },
  mark: { width: 190, height: 148 },
  wordmark: { width: 260, height: 92, marginTop: 18 },
  track: {
    position: "absolute",
    bottom: 72,
    width: 120,
    height: 3,
    borderRadius: 2,
    backgroundColor: L.line,
    overflow: "hidden",
  },
  fill: { width: 48, height: 3, borderRadius: 2, backgroundColor: L.green },
});
