import React, { useRef } from "react";
import { Image, Platform, Share, Text, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { BRAND } from "../brand";
import { palettes } from "./theme";

const P = palettes.light;

// A branded picture of a share message, for WhatsApp status and groups. The
// card is drawn off-screen and captured; the web, or any failure, falls back
// to sharing the plain text. Fixed brand colours, so it looks the same in dark mode.
export function useShareCard(text: string) {
  const ref = useRef<View>(null);
  // The last line is the Play link; an image share can't carry it, so the card prints the app name instead.
  const lines = text.split("\n").filter((l) => l && !l.includes("http"));
  const card = (
    <View
      ref={ref}
      collapsable={false}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        position: "absolute",
        left: -10000,
        top: 0,
        width: 360,
        padding: 28,
        gap: 12,
        backgroundColor: P.hero,
        borderRadius: 24,
      }}
    >
      <Image source={require("../../assets/icon.png")} style={{ width: 56, height: 56, borderRadius: 14 }} />
      {lines.map((l, i) => (
        <Text
          key={i}
          style={{
            color: i === 0 ? P.lime : P.heroText,
            fontSize: i === 0 ? 22 : 19,
            lineHeight: i === 0 ? 32 : 28,
            fontWeight: i === 0 ? "700" : "500",
          }}
        >
          {l}
        </Text>
      ))}
      <View style={{ marginTop: 8, backgroundColor: P.lime, borderRadius: 999, padding: 12 }}>
        <Text style={{ color: P.onLime, fontWeight: "700", textAlign: "center", fontSize: 16 }}>
          Google Play वर मोफत · {BRAND.en}
        </Text>
      </View>
    </View>
  );
  const share = async () => {
    if (Platform.OS !== "web") {
      try {
        const uri = await captureRef(ref, { format: "png", quality: 1, result: "tmpfile" });
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, { mimeType: "image/png", UTI: "public.png" });
          return;
        }
      } catch {}
    }
    await Share.share({ message: text }).catch(() => {});
  };
  return { card, share };
}
