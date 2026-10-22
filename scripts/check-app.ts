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
  ["green", "successSoft"], ["danger", "white"],
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

console.log("App checks passed: branding, compatibility IDs, navigation, accessibility props, design tokens and contrast, release safety.");
