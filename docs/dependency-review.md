# Dependency advisory review · 19 October 2026

`npm audit --json` reports 35 affected dependency entries: 23 high and 12 moderate, with no critical advisories. Many are parent-package propagation of the direct advisories below. The SDK-compatible audio additions do not require a framework upgrade. No forced audit fix was run.

Each root advisory was reviewed for affected surface and remediation. These remain release risks; none is declared harmless. The app accepts structured JSON backups, not dependency configuration, source files or images for compilation. Build tools must still be protected from untrusted projects/assets. npm proposes Expo 44.0.6 or React Native 0.88.0 for several propagation paths; neither is a compatible update to this SDK 54 project. Use a separately tested framework upgrade or narrowly verified patches rather than applying those suggestions.

| Package | Severity | Advisory | Assessment / action |
| --- | --- | --- | --- |
| braces | high | [braces vulnerable to stack-exhaustion denial of service through deeply nested patterns](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) | Pattern/format input denial of service in transitive tooling. Avoid untrusted build inputs; track a compatible upstream patch. |
| image-size | high | [image-size: JXL and HEIF parsers allow denial of service through infinite loops](https://github.com/advisories/GHSA-5p2g-fcmc-qvqq) | Malicious image parsing can hang tooling. No learner image uploads; patch the image parser through a verified compatible dependency update before release. |
| image-size | high | [image-size: ICNS parser allows denial of service through an infinite loop](https://github.com/advisories/GHSA-w3rx-r6r6-pgpr) | Malicious image parsing can hang tooling. No learner image uploads; patch the image parser through a verified compatible dependency update before release. |
| node-forge | high | [node-forge RSA PKCS#1 v1.5 signature verification accepts extra nested DigestAlgorithm elements](https://github.com/advisories/GHSA-86w9-cpqp-85rv) | Certificate/signature verification in Expo signing tooling. Keep signing inputs trusted; verify an SDK-compatible patched version before distribution. |
| postcss | moderate | [PostCSS has XSS via Unescaped </style> in its CSS Stringify Output](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) | CSS serialization/source-map handling in Metro web tooling. No user CSS compilation; review source-map paths and verify upstream patches before a public release. |
| postcss | high | [PostCSS: Arbitrary file read and information disclosure via attacker-controlled sourceMappingURL in CSS comments](https://github.com/advisories/GHSA-6g55-p6wh-862q) | CSS serialization/source-map handling in Metro web tooling. No user CSS compilation; review source-map paths and verify upstream patches before a public release. |
| postcss | moderate | [PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappingURL reads arbitrary .map files when `from` is unset](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) | CSS serialization/source-map handling in Metro web tooling. No user CSS compilation; review source-map paths and verify upstream patches before a public release. |
| postcss | high | [PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) leads to Arbitrary .map File Disclosure](https://github.com/advisories/GHSA-r28c-9q8g-f849) | CSS serialization/source-map handling in Metro web tooling. No user CSS compilation; review source-map paths and verify upstream patches before a public release. |
| sprintf-js | moderate | [sprintf-js vulnerable to denial of service through unbounded precision specifiers](https://github.com/advisories/GHSA-hp3w-g68c-fv3c) | Pattern/format input denial of service in transitive tooling. Avoid untrusted build inputs; track a compatible upstream patch. |
| uuid | moderate | [uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided](https://github.com/advisories/GHSA-w5hq-g745-h8pq) | Explicit output-buffer bounds in UUID generation via xcode tooling. Verify upstream fix through compatible config tooling updates. |

Affected entries (including propagated advisories):

- `@expo/cli`: high; via @expo/code-signing-certificates, @expo/config, @expo/config-plugins, @expo/metro, @expo/metro-config, @expo/prebuild-config, node-forge.
- `@expo/code-signing-certificates`: high; via node-forge.
- `@expo/config`: moderate; via @expo/config-plugins.
- `@expo/config-plugins`: moderate; via xcode.
- `@expo/metro`: high; via metro, metro-config, metro-file-map, metro-transform-worker.
- `@expo/metro-config`: high; via @expo/config, @expo/metro, postcss.
- `@expo/prebuild-config`: moderate; via @expo/config, @expo/config-plugins.
- `@istanbuljs/load-nyc-config`: moderate; via js-yaml.
- `@jest/environment`: high; via @jest/fake-timers.
- `@jest/fake-timers`: high; via jest-message-util.
- `@jest/transform`: high; via babel-plugin-istanbul, jest-haste-map, micromatch.
- `@react-native/community-cli-plugin`: high; via metro, metro-config.
- `argparse`: moderate; via sprintf-js.
- `babel-jest`: high; via @jest/transform, babel-plugin-istanbul.
- `babel-plugin-istanbul`: moderate; via @istanbuljs/load-nyc-config.
- `braces`: high; via braces.
- `expo`: high; via @expo/cli, @expo/config, @expo/config-plugins, @expo/metro, @expo/metro-config, expo-asset, expo-constants.
- `expo-asset`: moderate; via expo-constants.
- `expo-constants`: moderate; via @expo/config.
- `image-size`: high; via image-size, image-size.
- `jest-environment-node`: high; via @jest/environment, @jest/fake-timers.
- `jest-haste-map`: high; via micromatch.
- `jest-message-util`: high; via micromatch.
- `js-yaml`: moderate; via argparse.
- `metro`: high; via metro-config, metro-file-map, metro-transform-worker.
- `metro-config`: high; via metro.
- `metro-file-map`: high; via micromatch.
- `metro-transform-worker`: high; via metro.
- `micromatch`: high; via braces.
- `node-forge`: high; via node-forge.
- `postcss`: high; via postcss, postcss, postcss, postcss.
- `react-native`: high; via @react-native/community-cli-plugin, babel-jest, jest-environment-node.
- `sprintf-js`: moderate; via sprintf-js.
- `uuid`: moderate; via uuid.
- `xcode`: moderate; via uuid.

## Update · 22 October 2026

Reproduced with `npm audit` before changes: **31 entries (23 high, 8 moderate)**, from 7 root packages (braces, image-size, node-forge, postcss, sprintf-js, uuid, js-yaml propagation). The earlier "35" figure had already dropped through upstream patch releases.

Changes (no `--force`, no framework upgrade):

1. `npm audit fix` (semver-compatible only): `expo` 54.0.37 → 54.0.38, `@expo/cli` 54.0.28, `@expo/config-plugins` 54.0.6, `expo-asset` 12.0.14, `expo-modules-autolinking` 3.0.28, `xcode` 4.0.0 (drops the vulnerable `uuid@7`). `npx expo install --check`: "Dependencies are up to date".
2. `overrides.postcss = ^8.5.31` (was 8.4.49 under `@expo/metro-config`). Same major version; fixes all four PostCSS advisories. Used only by Metro's web CSS pipeline.

Result: **27 entries (22 high, 5 moderate)** from **4 root packages**, all build-time tooling — none is bundled into the app's JavaScript or runs on a learner's phone:

| Root package | Pulled in by | Why not fixed | Exposure |
| --- | --- | --- | --- |
| braces 3.0.3 | micromatch → metro / jest-haste-map | 3.0.3 is the latest release; no patched version exists. | Glob patterns in dev tooling; patterns come from this repository. |
| image-size 1.2.1 | metro | Fix is image-size 2.x (breaking API) under Metro 0.83; needs a Metro/Expo upgrade. | Parses images in `assets/` at build time; all are first-party. |
| node-forge 1.4.0 | @expo/code-signing-certificates | 1.4.0 is the latest release. | Expo Updates code signing — not used by this app. |
| sprintf-js 1.0.3 | argparse → js-yaml → istanbul (jest) | Fix requires the React Native 0.88 toolchain. | Test-coverage tooling only. |

`npm audit --omit=dev` reports the same set because `expo` and `react-native` are runtime dependencies that also carry their CLIs; the vulnerable code paths are in those CLIs, not in the app bundle. Re-check at the next Expo SDK upgrade.
