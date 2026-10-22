import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { load } from "./lib.ts";

// Static checks over the app shell: branding, navigation wiring,
// accessibility props, design tokens and release safety. They read source
// files, so they catch regressions without a device.

const read = (f: string) => fs.readFileSync(f, "utf8");
const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
const tsx = [...walk("src").filter((f) => f.endsWith(".tsx")), "App.tsx"];
const lineOf = (text: string, index: number) =>
  text.slice(0, index).split("\n").length;

// ---- Branding ---------------------------------------------------------------
const { BRAND } = load("src/brand.ts");
assert.equal(BRAND.en, "English Boluya");
assert.equal(BRAND.mr, "इंग्लिश बोलूया");
assert.equal(BRAND.tagline, "आपल्या भाषेत शिकूया, इंग्रजीत बोलूया!");
const app = JSON.parse(read("app.json")).expo;
assert.equal(app.name, BRAND.en);
assert.equal(app.web.name, BRAND.en);
assert.match(
  read("android/app/src/main/res/values/strings.xml"),
  new RegExp(`<string name="app_name">${BRAND.en}</string>`),
);
assert.equal(load("src/state/reminders.ts").reminderTitle, BRAND.mr);
// No obsolete name in anything a learner can see. Internal identifiers are
// listed explicitly and must not change (see below).
for (const f of [...walk("src"), "App.tsx"]) {
  const text = read(f).replace(/"english-saathi\.progress\.v1"/g, "");
  const code = text.replace(/\/\/.*$/gm, ""); // comments may explain history
  assert.ok(!/saathi|साथी|सोबती/i.test(code), `old brand name in ${f}`);
}

// ---- Compatibility: identifiers that existing installs depend on -----------
assert.match(read("src/state/progress.tsx"), /const KEY = "english-saathi\.progress\.v1";/);
assert.equal(app.android.package, "com.englishsaathi.learn");
assert.match(read("android/app/build.gradle"), /applicationId 'com\.englishsaathi\.learn'/);

// ---- Navigation ---------------------------------------------------------------
const appSrc = read("App.tsx");
const stackScreens = [...appSrc.matchAll(/<Stack\.Screen\s+name="(\w+)"/g)].map((m) => m[1]);
const tabScreens = [...appSrc.matchAll(/<Tab\.Screen\s+name="(\w+)"/g)].map((m) => m[1]);
assert.equal(new Set(stackScreens).size, stackScreens.length, "duplicate stack route");
const routes = new Set([...stackScreens, ...tabScreens]);
// Typed params and registered screens describe the same set of routes.
const typesSrc = read("src/navigation/types.ts");
const stackBlock = typesSrc.slice(typesSrc.indexOf("type StackParams"), typesSrc.indexOf("\n};"));
const paramRoutes = [...stackBlock.matchAll(/^\s+(\w+)\??:/gm)].map((m) => m[1]);
assert.deepEqual([...paramRoutes].sort(), [...stackScreens].sort());
// Primary navigation: four destinations plus the "More" sheet.
assert.deepEqual(tabScreens, ["Home", "Learn", "Speak", "Review", "Menu"]);
const { TAB_ROUTES } = load("src/navigation/types.ts");
assert.deepEqual([...TAB_ROUTES], tabScreens.filter((t) => t !== "Menu"));
// Every navigate("X") call targets a real route.
for (const f of tsx) {
  const text = read(f);
  for (const m of text.matchAll(/navigate\(\s*"(\w+)"/g))
    assert.ok(routes.has(m[1]), `${f}:${lineOf(text, m.index!)} navigates to unknown route ${m[1]}`);
}
// Every menu entry opens a registered screen, and no secondary feature is
// unreachable: each stack screen (except flow-only ones) is in the menu or
// reachable through a navigate() call somewhere.
const menuSrc = read("src/screens/Menu.tsx");
const menuRoutes = [...menuSrc.matchAll(/route: "(\w+)"/g)].map((m) => m[1]);
menuRoutes.forEach((r) => assert.ok(routes.has(r), `menu route ${r} missing`));
const navigated = new Set(
  tsx.flatMap((f) => [...read(f).matchAll(/navigate\(\s*"(\w+)"/g)].map((m) => m[1])),
);
for (const r of stackScreens)
  if (!["Main", "Onboarding"].includes(r))
    assert.ok(menuRoutes.includes(r) || navigated.has(r), `${r} is unreachable`);
for (const must of ["Grammar", "Skills", "Saved", "Settings", "Phrasebook", "Words"])
  assert.ok(menuRoutes.includes(must), `${must} missing from More menu`);

// ---- Accessibility properties -------------------------------------------------
for (const f of tsx) {
  const text = read(f);
  for (const m of text.matchAll(/<Pressable\b([\s\S]*?)>/g))
    assert.ok(/accessibilityRole=/.test(m[1]), `${f}:${lineOf(text, m.index!)} Pressable without accessibilityRole`);
  for (const m of text.matchAll(/<TextInput\b([\s\S]*?)\/>/g))
    assert.ok(/accessibilityLabel=/.test(m[1]), `${f}:${lineOf(text, m.index!)} TextInput without accessibilityLabel`);
}
// Progress tracks are announced (role progressbar + value).
for (const f of tsx) {
  const text = read(f);
  for (const m of text.matchAll(/style=\{s\.track\}/g)) {
    const around = text.slice(Math.max(0, m.index! - 200), m.index! + 300);
    assert.ok(/accessibilityRole="progressbar"/.test(around) && /accessibilityValue=/.test(around), `${f}:${lineOf(text, m.index!)} progress track without progressbar semantics`);
  }
}
assert.equal(
  (appSrc.match(/tabBarAccessibilityLabel:/g) ?? []).length,
  tabScreens.length,
  "every tab needs a spoken label",
);
const uiSrc = read("src/components/ui.tsx");
assert.match(uiSrc, /accessibilityState=\{\{ disabled \}\}/, "Button exposes disabled state");

// ---- Marathi first --------------------------------------------------------------
// Learner-facing eyebrows, headings, section titles and button labels start in
// Marathi; English may follow only as a subtitle ("मराठी · English").
// English learning content (example sentences, prompts) lives in data files.
const devanagari = /[\u0900-\u097F]/;
const firstWords = (s: string) => s.replace(/^[^A-Za-z\u0900-\u097F]+/, "").slice(0, 1);
for (const f of tsx.filter((f) => f.includes(`${path.sep}screens${path.sep}`) || f.endsWith("Exercise.tsx") || f.endsWith("Audio.tsx"))) {
  const text = read(f);
  const checks: [RegExp, string][] = [
    [/<Label(?: light)?>([^<{]+)</g, "eyebrow"],
    [/\btitle="([^"]+)"/g, "title"],
    [/<Section title=\{?[`"]([^`"$]+)/g, "section"],
  ];
  for (const [re, kind] of checks)
    for (const m of text.matchAll(re)) {
      const value = m[1].trim();
      if (!value) continue;
      assert.ok(
        devanagari.test(firstWords(value)) || !/[A-Za-z]/.test(firstWords(value)),
        `${f}:${lineOf(text, m.index!)} ${kind} must start in Marathi: "${value}"`,
      );
    }
  // Subtitles may lead with notation (V1, A/An) but must carry Marathi.
  for (const m of text.matchAll(/\bsub="([^"]+)"/g))
    assert.ok(devanagari.test(m[1]), `${f}:${lineOf(text, m.index!)} subtitle has no Marathi: "${m[1]}"`);
  // Links ("… →") are actions too.
  for (const m of text.matchAll(/>\s*([A-Z][A-Za-z ]+)→\s*</g))
    assert.fail(`${f}:${lineOf(text, m.index!)} English-only link "${m[1].trim()}"`);
}
for (const banned of ["CONTINUE LEARNING", "PATH COMPLETE", "FIND YOUR ENGLISH VOICE", "Let's talk, a little.", "Reveal English", "Read full lesson"])
  for (const f of tsx) assert.ok(!read(f).includes(banned), `"${banned}" is back in ${f}`);
// Tab labels, spoken tab labels and browser titles also lead in Marathi.
for (const m of appSrc.matchAll(/(?:tabBarAccessibilityLabel|tabBarLabel|title): "([^"]+)"/g))
  assert.ok(devanagari.test(firstWords(m[1])), `App.tsx:${lineOf(appSrc, m.index!)} "${m[1]}" must start in Marathi`);
// Header titles: Marathi title, English subtitle.
for (const [route, t] of Object.entries(
  [...uiSrc.matchAll(/^\s+(\w+): \{ mr: "([^"]+)", en: "([^"]+)" \}/gm)].reduce(
    (o, m) => ({ ...o, [m[1]]: { mr: m[2], en: m[3] } }), {} as Record<string, { mr: string; en: string }>,
  ),
))
  assert.ok(devanagari.test(t.mr), `screen title for ${route} must be Marathi`);
// The "the app does not listen to or score your speech" note is said once in
// onboarding; outside it only the recorder (one line) and About may repeat it.
const disclaimer = /ऐकत नाही|तपासत नाही|गुण देत नाही|गुणांकन/;
assert.match(read("src/screens/Onboarding.tsx"), disclaimer, "onboarding explains that speech is not scored");
for (const f of tsx.filter((f) => !/Onboarding\.tsx$|Audio\.tsx$|Settings\.tsx$/.test(f)))
  assert.ok(!disclaimer.test(read(f)), `${f} repeats the no-scoring disclaimer; keep it in onboarding`);
assert.equal((read("src/components/Audio.tsx").match(/गुण देत नाही/g) ?? []).length, 1, "recorder keeps one short hint");

// ---- Celebrations -----------------------------------------------------------------
// Built-in Animated only, reduce-motion respected, no haptics dependency added
// without the owner's approval, and celebrations can be switched off.
const celebrateSrc = read("src/components/Celebrate.tsx");
assert.match(celebrateSrc, /isReduceMotionEnabled/);
assert.match(celebrateSrc, /reduceMotionChanged/);
assert.match(celebrateSrc, /from "react-native"/);
const pkg = JSON.parse(read("package.json"));
for (const dep of ["expo-haptics", "lottie-react-native", "react-native-reanimated", "moti"])
  assert.ok(!pkg.dependencies[dep], `${dep} needs the owner's approval before it is added`);
assert.match(read("src/screens/Settings.tsx"), /celebrate: progress\.settings\.celebrate === false/);
assert.match(read("src/screens/Lesson.tsx"), /celebrationsOn\(progress\.settings\)/);

// ---- On-device word check ----------------------------------------------------------
// Approved by the owner (2026-10-22): expo-speech-recognition@3.1.3, on-device
// only, native only, silent fallback. Never framed as pronunciation scoring.
assert.equal(pkg.dependencies["expo-speech-recognition"], "3.1.3", "pinned to the approved SDK 54 release");
const wcSrc = read("src/components/WordCheck.tsx");
assert.match(wcSrc, /requiresOnDeviceRecognition: true/);
assert.match(wcSrc, /Platform\.OS === "web"\) return/, "web never uses the browser recogniser (it uploads audio)");
assert.match(wcSrc, /require\("expo-speech-recognition"\)/, "loaded lazily so a missing native module cannot crash the app");
assert.ok(!/import .* from "expo-speech-recognition"/.test(wcSrc));
assert.ok(!/triggerOfflineModelDownload|androidTriggerOfflineModelDownload/.test(wcSrc), "never downloads models (needs internet)");
for (const f of ["src/components/WordCheck.tsx", "src/state/wordcheck.ts"]) {
  const visible = read(f).replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
  assert.ok(!/score|accuracy|accent|pass\b|fail|स्कोअर|गुण|टक्के|उत्तीर्ण|नापास|अचूक/i.test(visible), `${f}: scoring language`);
}
assert.match(read("src/components/Audio.tsx"), /<WordCheck target=\{model\}/);
assert.ok(app.plugins.some((p: any) => p[0] === "expo-speech-recognition"));
const mainManifest = read("android/app/src/main/AndroidManifest.xml");
assert.match(mainManifest, /android\.speech\.RecognitionService/);
assert.deepEqual(
  [...mainManifest.matchAll(/<uses-permission android:name="([^"]+)"\/>/g)].map((m) => m[1]).sort(),
  ["android.permission.INTERNET", "android.permission.MODIFY_AUDIO_SETTINGS", "android.permission.RECORD_AUDIO", "android.permission.VIBRATE"],
  "no new Android permission",
);

// ---- Design tokens --------------------------------------------------------------
const theme = load("src/components/theme.ts");
// Screens and components use tokens, not their own hex colours. Lesson and
// category data may carry illustration tints.
for (const f of [...walk("src"), "App.tsx"].filter((f) => /\.tsx?$/.test(f)))
  if (!/theme\.ts$|data[\\/]course\.ts$/.test(f))
    assert.ok(!/"#[0-9A-Fa-f]{3,8}"/.test(read(f)), `hard-coded colour in ${f}`);
const lum = (hex: string) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const pairs: [string, string][] = [
  ["ink", "bg"], ["ink", "white"], ["body", "bg"], ["body", "white"],
  ["bodyMr", "white"], ["muted", "bg"], ["muted", "white"], ["green", "bg"],
  ["green", "white"], ["onPrimary", "green"], ["onPrimary", "ink"],
  ["onLime", "lime"], ["heroText", "tile"], ["heroSub", "tile"], ["ink", "limeSoft"], ["ink", "sand"],
  ["green", "successSoft"], ["ink", "successSoft"], ["body", "successSoft"], ["body", "limeSoft"], ["danger", "white"],
  ["danger", "dangerSoft"], ["dangerInk", "dangerSoft"], ["amberInk", "amberSoft"],
  ["coralInk", "coralSoft"], ["blueInk", "blueTint"], ["olive", "limeTint"],
  ["heroText", "hero"], ["heroSub", "hero"], ["heroMuted", "hero"],
  ["heroFaint", "hero"], ["muted", "sand"],
];
// Every pair must pass in both colour schemes; both palettes have the same keys.
assert.deepEqual(Object.keys(theme.palettes.dark).sort(), Object.keys(theme.palettes.light).sort());
for (const [name, C] of Object.entries(theme.palettes) as [string, Record<string, string>][]) {
  for (const [fg, bg] of pairs)
    assert.ok(contrast(C[fg], C[bg]) >= 4.5, `${name}: ${fg} on ${bg}: ${contrast(C[fg], C[bg]).toFixed(2)}`);
  // Icons (non-text) need 3:1.
  assert.ok(contrast(C.tileAccent, C.tile) >= 3, `${name}: tile icon`);
  assert.ok(contrast(C.green, C.bg) >= 3, `${name}: active tab icon`);
}
// Switching schemes swaps the live palette and invalidates themed styles.
let builds = 0;
const styles = theme.themed(() => ({ n: ++builds, bg: theme.C.bg }));
assert.equal(styles().bg, theme.palettes.light.bg);
assert.equal(styles().n, 1, "cached while the scheme is unchanged");
theme.setScheme("dark");
assert.equal(theme.C.bg, theme.palettes.dark.bg);
assert.equal(styles().bg, theme.palettes.dark.bg);
theme.setScheme("light");
assert.equal(styles().bg, theme.palettes.light.bg);
assert.equal(builds, 3);
assert.ok(theme.touch >= 48);
assert.ok(Object.values(theme.font).every((f: any) => f.fontSize >= 12 && f.lineHeight >= f.fontSize * 1.4));

// ---- Release safety --------------------------------------------------------------
const manifest = read("android/app/src/main/AndroidManifest.xml");
for (const p of ["READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"])
  assert.match(manifest, new RegExp(`${p}" tools:node="remove"`));
assert.ok(!/permission\.SYSTEM_ALERT_WINDOW"/.test(manifest), "overlay permission only in debug");
const gradle = read("android/app/build.gradle");
assert.ok(!/BOLUYA_UPLOAD_STORE_PASSWORD\s*=|storePassword\s+'(?!android')/.test(gradle), "no committed upload password");
const ignore = read(".gitignore");
for (const p of ["*.keystore", "*.jks", ".env"]) assert.ok(ignore.includes(p), `${p} must be git-ignored`);
assert.ok(Number.isInteger(app.android.versionCode) && app.android.versionCode >= 1);
assert.match(app.version, /^\d+\.\d+\.\d+$/);
// app.json is the single version source; store builds refuse the debug key.
assert.match(gradle, /versionName expoConfig\.version/);
assert.match(gradle, /expoConfig\.android\.versionCode/);
assert.match(gradle, /boluyaStoreRelease/);

console.log("App checks passed: branding, compatibility IDs, navigation, accessibility props, Marathi-first labels, design tokens and contrast, release safety.");
