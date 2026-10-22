// Design tokens. Every colour, size and spacing value used by components
// should come from here; screens never introduce their own hex values.
// Text colours are checked against WCAG AA (4.5:1) on the surfaces they are
// used on — see scripts/check-design.ts.

const light = {
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
  // Text and icons on green / ink fills, and on lime
  onPrimary: "#FFFFFF",
  onLime: "#172B24",
  tileAccent: "#D8F36A", // icon on the dark speaking tiles
  logoPlate: "transparent", // behind the logo artwork (dark lettering)
  splash: "#FEFDF5", // launch screen; matches the native splash and icon
  // Hero card and speaking tiles stay dark in both schemes
  hero: "#174C3C",
  tile: "#172B24",
  // Text on the hero card and speaking tiles
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
export type Palette = typeof light;

// Dark palette: same keys. Primary fills (buttons, links, selected chips)
// become a soft green with dark text; the hero card and tiles stay dark.
const dark: Palette = {
  green: "#8FD3AE",
  lime: "#D8F36A",
  ink: "#E6EEE8",
  bg: "#0E1714",
  white: "#17241F",
  frame: "#09100D",
  sand: "#1E2C26",
  line: "#2C3D35",
  pressed: "#22332B",
  shadow: "#000000",
  scrim: "rgba(0,0,0,0.6)",
  body: "#BCCAC1",
  bodyMr: "#C4D1C8",
  muted: "#97A89D",
  onPrimary: "#0E1714",
  onLime: "#172B24",
  tileAccent: "#D8F36A",
  logoPlate: "#F7F8F2",
  splash: "#FEFDF5", // the brand launch screen stays light in both schemes
  hero: "#1D4536",
  tile: "#1D3A2F",
  heroText: "#EEF4EF",
  heroSub: "#BFD1C5",
  heroMuted: "#B2CBA2",
  heroFaint: "#CFDBD2",
  heroLine: "#36624F",
  successSoft: "#1C3329",
  danger: "#F0A090",
  dangerInk: "#F4B3A5",
  dangerSoft: "#3A2420",
  greenTint: "#1F3329",
  greenMist: "#1D2E27",
  limeSoft: "#2E3A17",
  limeTint: "#2A3616",
  limeMist: "#232E14",
  olive: "#C9E77A",
  amberInk: "#E6CB8E",
  amberSoft: "#2E2818",
  amberTint: "#332B17",
  coralSoft: "#3A2620",
  coralInk: "#F2B39F",
  blueTint: "#1C2A35",
  blueInk: "#9CC3E0",
};

export const palettes = { light, dark: dark as Palette };
export type Scheme = keyof typeof palettes;

// The live palette. Components read `C.x` while rendering, so switching the
// scheme (setScheme) and re-rendering is enough; module-level styles are
// rebuilt through `themed` below.
export const C: Palette = { ...light };
let schemeVersion = 0;
let current: Scheme = "light";
export const currentScheme = () => current;
export function setScheme(scheme: Scheme) {
  if (scheme === current) return;
  Object.assign(C, palettes[scheme]);
  current = scheme;
  schemeVersion++;
}
// Wraps a style factory so it is rebuilt once per scheme change.
export function themed<T>(make: () => T): () => T {
  let version = -1;
  let cache: T;
  return () => {
    if (version !== schemeVersion) {
      cache = make();
      version = schemeVersion;
    }
    return cache;
  };
}


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
