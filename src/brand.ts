// Single source for every user-facing name. Internal identifiers (Android
// package `com.englishsaathi.learn`, storage key `english-saathi.progress.v1`,
// Expo slug) intentionally keep the old name: changing them would orphan
// existing installs and saved progress. See docs/release-readiness.md.
export const BRAND = {
  en: "English Boluya",
  mr: "इंग्लिश बोलूया",
  full: "English Boluya · इंग्लिश बोलूया",
  tagline: "आपल्या भाषेत शिकूया, इंग्रजीत बोलूया!",
  version: "1.0.0",
} as const;
