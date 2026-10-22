import React from "react";
import { Pressable, Text, View } from "react-native";
import { BRAND } from "../brand";
import { C, font, radius, space, touch } from "./theme";

// Last-resort screen for a rendering error. Saved progress lives in storage
// and is untouched; "Try again" simply re-mounts the app tree.
export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // No remote crash reporting: the app sends nothing off the device.
    console.error("English Boluya render error", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <View
        accessibilityRole="alert"
        style={{
          flex: 1,
          backgroundColor: C.bg,
          justifyContent: "center",
          padding: space.xl,
          gap: space.md,
        }}
      >
        <Text style={{ ...font.heading, color: C.ink, fontWeight: "700" }}>
          काहीतरी चुकले.
        </Text>
        <Text style={{ ...font.marathi, color: C.bodyMr }}>
          तुमची प्रगती सुरक्षित आहे. पुन्हा प्रयत्न करा. अडचण राहिल्यास {BRAND.mr}{" "}
          बंद करून पुन्हा उघडा.
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="पुन्हा प्रयत्न करा · Try again"
          onPress={() => this.setState({ failed: false })}
          style={{
            minHeight: touch + 6,
            backgroundColor: C.green,
            borderRadius: radius.md,
            alignItems: "center",
            justifyContent: "center",
            marginTop: space.lg,
          }}
        >
          <Text style={{ ...font.body, color: C.onPrimary, fontWeight: "700" }}>
            पुन्हा प्रयत्न करा · Try again
          </Text>
        </Pressable>
      </View>
    );
  }
}
