// Design tokens. Every colour, size and spacing value used by components
// should come from here; screens never introduce their own hex values.
// Text colours are checked against WCAG AA (4.5:1) on the surfaces they are
// used on — see scripts/check-design.ts.

export const C = {
  // Brand
  green: "#174C3C", // primary: deep green
  lime: "#D8F36A", // highlight for the one most important action
  ink: "#172B24", // primary text
  // Surfaces
  bg: "#F7F8F2", // warm off-white page
  white: "#FFFFFF", // cards
  frame: "#E9EDE5", // outside the phone-width frame (tablets, web)
  sand: "#F2F0E5",
  line: "#DCE3D8",
  pressed: "#EEF3EA",
  shadow: "#173D35",
  scrim: "rgba(23,43,36,0.45)",
  // Text
  body: "#566558",
  bodyMr: "#536452",
  muted: "#617168",
  // Hero (text on the deep-green card)
  heroText: "#F4F6E8",
  heroSub: "#C1CEBF",
  heroMuted: "#B5C7A4",
  heroFaint: "#D4DECC",
  heroLine: "#3C5749",
  // Feedback
  successSoft: "#E9F2E8",
  danger: "#A1473A",
  dangerInk: "#9A3929",
  dangerSoft: "#FBECE7",
  // Accent tints (icons, chips, conversation bubbles)
  greenTint: "#E4EFE9",
  greenMist: "#EAF0E4",
  limeSoft: "#E9F3C9",
  limeTint: "#EDF5CC",
  limeMist: "#F3F9D8",
  olive: "#4E6A0F",
  amberInk: "#7E6838",
  amberSoft: "#F7F2E6",
  amberTint: "#F7F0DD",
  coralSoft: "#F7E4D5",
  coralInk: "#7C3A2C",
  blueTint: "#E6EDF3",
  blueInk: "#35607F",
};

// 4-point spacing scale.
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 8, md: 14, lg: 20, xl: 28, pill: 999 } as const;

// Type scale. Marathi (Devanagari) needs taller line heights than Latin text;
// every size here already includes that headroom. AppText multiplies these by
// the learner's text-size setting, and the OS font scale applies on top.
export const font = {
  caption: { fontSize: 12, lineHeight: 18 },
  small: { fontSize: 13, lineHeight: 21 },
  body: { fontSize: 15, lineHeight: 25 },
  marathi: { fontSize: 18, lineHeight: 31 },
  title: { fontSize: 19, lineHeight: 28 },
  heading: { fontSize: 24, lineHeight: 36 },
  display: { fontSize: 30, lineHeight: 42 },
} as const;

// Minimum touch target (Android guidance: 48dp).
export const touch = 48;

export const elevation = {
  card: {
    shadowColor: C.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  sheet: {
    shadowColor: C.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -6 },
    elevation: 24,
  },
} as const;
