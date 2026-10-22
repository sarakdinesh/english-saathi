# Your two release jobs: the upload key and the phone test

These need you because the key is a secret that only you should hold, and the phone test needs a person to look, listen and speak.

---

## Part 1 — Create the upload key (about 10 minutes, once)

The upload key proves to Google Play that a new version really comes from you. **If you lose it you can still recover through Play App Signing, but keep a backup anyway.** Never put it in the project folder, Git, email or chat.

### 1. Make a safe folder outside the project

```bash
mkdir -p ~/keys/english-boluya
```

### 2. Create the key

Run this and answer the questions. Use a strong password and **write it down in your password manager**. Name/organisation can be your own name.

```bash
"/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/keytool" -genkeypair -v -storetype PKCS12 -keystore ~/keys/english-boluya/boluya-upload.jks -alias boluya-upload -keyalg RSA -keysize 2048 -validity 10000
```

### 3. Tell Gradle where the key is (outside the project)

Open (or create) `~/.gradle/gradle.properties` — this is in your home folder, **not** in the project — and add:

```properties
BOLUYA_UPLOAD_STORE_FILE=/Users/etpl-012/keys/english-boluya/boluya-upload.jks
BOLUYA_UPLOAD_STORE_PASSWORD=your-password
BOLUYA_UPLOAD_KEY_ALIAS=boluya-upload
BOLUYA_UPLOAD_KEY_PASSWORD=your-password
```

### 4. Build the Play Store bundle (AAB)

```bash
cd ~/Sites/English-Speaking-app/android && ./gradlew :app:bundleRelease
```

The file appears at `android/app/build/outputs/bundle/release/app-release.aab`. If Gradle prints *"BOLUYA_UPLOAD_STORE_FILE not set; release is debug-signed and NOT store-ready"*, step 3 was not picked up.

### 5. Check it is signed with your key (not the debug key)

```bash
"/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/keytool" -printcert -jarfile ~/Sites/English-Speaking-app/android/app/build/outputs/bundle/release/app-release.aab
```

The owner line must show the name you typed in step 2, **not** "Android Debug".

### 6. Back up

Copy `boluya-upload.jks` and its password to a second safe place (encrypted USB drive or password-manager attachment). When you create the app in Play Console, turn on **Play App Signing** (default); Google then keeps the final signing key and can reset a lost upload key.

### Before step 4 — decide the app ID

The app is still `com.englishsaathi.learn`. If you want `com.englishboluya…`, it must change **before the first Play upload** (see `docs/release-readiness.md`). Ask Claude to do the rename; it is mechanical but must be done once, before publishing.

---

## Part 2 — The phone test (about 1–1½ hours)

Install the **QA app** (it uses separate data — your real app is untouched). With the phone connected (USB or wireless debugging):

```bash
~/Library/Android/sdk/platform-tools/adb install -r ~/Sites/English-Speaking-app/android/app/build/outputs/apk/qa/app-qa.apk
```

Or ask Claude to "build and install the QA app on my phone". For the final check, repeat the most important rows on the signed release build.

Write ✅ / ❌ and a short note for each row. Take a screenshot (Power + Volume-down) of anything wrong.

| # | Do this | Pass if |
| --- | --- | --- |
| 1 | Clear the QA app's data (Settings → Apps → English Boluya QA → Storage → Clear), open it | Onboarding appears in Marathi; you can reach the first lesson without help |
| 2 | Finish one lesson stage, close the app from Recents, reopen | You return to the same lesson stage |
| 3 | Tap any 🔊 button; then tap **हळू** (slow) | English is spoken; slow is clearly slower |
| 4 | Phone Settings → Text-to-speech → switch the engine off or remove English voice; tap 🔊 | App shows a message; nothing crashes |
| 5 | In a lesson, tap **रेकॉर्ड करा** → **Deny** microphone | Friendly Marathi message; app keeps working |
| 6 | Allow the microphone later (phone Settings → Apps → Permissions), record, replay, delete | You hear yourself; delete works |
| 7 | Start recording, then press Home; come back | No crash; recording stopped |
| 8 | Airplane mode on; open every tab, a lesson, a role-play, today's words | Everything works offline |
| 9 | Settings → daily reminder → on, pick a time 2–3 minutes ahead; lock the phone | Notification arrives in Marathi at that time |
| 10 | Tap **चाचणी सूचना पाठवा** (send a test) | Notification arrives in ~5 seconds |
| 11 | Restart the phone, open the app once | Today's plan is unchanged; reminder still scheduled |
| 12 | Phone Settings → Display → Font size **largest**; app Settings → अक्षरांचा आकार → **Extra large** | No text cut off: buttons, tabs, More sheet tiles, lesson cards |
| 13 | Phone dark mode on (app on फोनप्रमाणे / System), then app → गडद / उजळ | Colours switch; text readable everywhere; you stay on the same screen |
| 14 | Switch between gesture navigation and 3-button navigation | Bottom bar and the More sheet never hide behind system buttons |
| 15 | Settings → Backup → create a copy; Reset progress; paste the copy back → Restore | Progress returns exactly |
| 16 | Paste random text into Restore | Rejected; existing progress untouched |
| 17 | Change the phone's time zone (e.g. to London) and back | Daily plan for today does not change unexpectedly |
| 18 | TalkBack on (Settings → Accessibility); move through Home, tabs, a lesson question, Settings chips | Every button is read with a meaningful name; selected chips are announced |
| 19 | Learn → **व्यावसायिक इंग्रजी (प्रायोगिक)** → open a lesson | The new Level 4 lessons open and play audio |
| 20 | Leave the app in the background for an hour, reopen | Opens quickly to where you were |

If you have a second, cheaper phone (≤ 3 GB RAM), repeat rows 1, 3, 8, 12 and 20 on it — slow phones show problems that fast ones hide.

Send the filled table (and screenshots) back to Claude; each ❌ becomes a fix.

### What has already been checked on your vivo V2415 (22 October 2026)

Automated, by Claude over wireless debugging — not a replacement for your pass:

- QA build installs and opens; Home in dark and light mode; tab bar sits above the three-button navigation.
- **Found and fixed:** the main Home button cut off its last word ("शिकायला सुरुवात **करा**"), and More-sheet tiles showed only the first word ("संवाद" instead of "संवाद सराव"). Cause: Android measures bold Devanagari slightly narrower than it draws it. Fixed in the shared button and tile styles; re-checked on the phone after the rebuild.
