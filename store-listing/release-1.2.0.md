# Release 1.2.0 (versionCode 5): Play Console steps and search keywords

File to upload: `artifacts/english-boluya-1.2.0-5.aab`
(its SHA-256 is in `artifacts/english-boluya-1.2.0-5.aab.sha256`).

## Part 1: publish the update

The app is already live, so this is an update to the existing listing. Do **not** create a new app.

1. **Open the app.** Go to play.google.com/console, select **English Boluya**.
2. **Internal test first (about 10 minutes, strongly recommended).**
   - Go to **Test and release → Testing → Internal testing → Create new release**.
   - Under **App bundles**, upload `english-boluya-1.2.0-5.aab`. Play checks it; you should see versionCode **5** and version **1.2.0**.
   - **Release name:** `1.2.0 (5)`.
   - **Release notes:** paste the block from "Release notes for the update with journeys, interview kit and voice diary" in `store-listing/README.md` (both `<mr-IN>` and `<en-IN>`).
   - Click **Next → Save and publish**.
   - On your phone, open the internal-testing opt-in link, then update the app from the Play Store.
3. **Smoke test on the phone (5 minutes).**
   - The app opens fast and your old progress is still there.
   - Settings shows "आवृत्ती 1.2.0".
   - On Home, open a journey, start it, and open one task.
   - Daily practice → "आजचे वाक्य" → **Share**: a green picture card opens in the share sheet. Send it to yourself on WhatsApp.
   - Voice diary: record, save, play it back, then tap **Share** on the recording.
   - Speak along: words light up while the phone reads.
4. **Promote to Production.**
   - In **Internal testing**, open the release and choose **Promote release → Production**. If that option isn't shown, go to **Production → Create new release → Add from library** and pick the 1.2.0 (5) bundle.
   - Keep the same release notes.
   - Set **Staged rollout** to **20%**, then **Next → Save → Send for review** (on the "Publishing overview" page if Play asks).
5. **App content check.** Nothing changes in Data safety. Sharing goes through Android's share sheet only when the user taps Share, and nothing is uploaded by the app. No new permissions were added. If Play asks again, keep the answers in `store-listing/README.md` section 4.
6. **After review (usually a few hours to 2 days):**
   - Watch **Quality → Android vitals** for crashes for 2–3 days.
   - If it's clean, go to **Production → Manage rollout → Increase rollout → 100%**.
   - If there are crashes, choose **Halt rollout** and send me the crash text.
7. **Push the release commit and tag:**
   ```bash
   git push origin main --follow-tags
   ```

## Part 2: store listing changes for search

Go to **Grow users → Store presence → Main store listing**. Edit the Marathi (mr-IN) listing first, then **Translations → English (India)**.

| Field | What to change | Where the text is |
| --- | --- | --- |
| Short description (mr-IN) | Replace with the search-friendly version | `README.md` → "Search-friendly alternative" |
| Full description (both) | Replace with the updated text: new features plus the "who it's for" paragraph | `README.md` → "Full description" |
| App name (en-IN listing only, optional) | `English Boluya: Spoken English` (30/30 characters) | Below |
| Screenshots | Add 1–2 of the new features (journey, interview kit). Screenshots don't affect search, but they turn visits into installs | Ask me to make them from the web build |

**App name:** the name is the strongest ranking signal. Keep the Marathi name as it is. For the English (India) listing, `English Boluya: Spoken English` adds the most searched phrase. Change it only if you're happy for English users to see that name.

Click **Save**. Listing changes are reviewed separately and usually go live within a day.

## Part 3: search keywords

Play has **no keyword field**. Google reads the app name, the short description and the full description. Rankings then rise with installs, ratings and how many people keep using the app. Use each phrase naturally once or twice; repeating a word many times is treated as spam and can get the listing rejected.

**Main targets (high search, good fit)**
- spoken english
- english speaking app
- learn english in marathi
- english speaking course in marathi
- marathi to english
- english grammar in marathi
- स्पोकन इंग्लिश
- इंग्रजी बोलायला शिका
- मराठीतून इंग्रजी

**Long-tail (less competition, easier to rank)**
- english interview questions and answers in marathi
- daily english sentences marathi
- english conversation practice offline
- english bolayla shika (romanised Marathi, which people really type)
- इंग्रजी व्याकरण मराठीत
- मुलाखत इंग्रजी प्रश्न
- रोजची इंग्रजी वाक्ये

**Where each one already appears**
- Name: "English Boluya", plus "Spoken English" on the en-IN listing.
- Short description: Spoken English, मराठीतून, मुलाखत, व्याकरण, इंटरनेटशिवाय.
- Full description: spoken english, learn english in marathi, english grammar in marathi, interview, daily English sentences, English conversation, इंग्रजी बोलायला शिका and स्पोकन इंग्लिश.
- Website: 37 Marathi lesson pages target the long-tail searches on Google (bank, interview, grammar). Each one links to the Play listing.

**What moves the ranking most after this**
1. **Ratings.** The rating prompt in this update asks after 7 study days. Reply to every review in Play Console, in Marathi.
2. **Installs from outside Play.** WhatsApp share cards, the website pages, and Instagram/YouTube Shorts that show the app.
3. **Retention.** Journeys and the streak freeze keep people opening the app, and Play rewards that.
4. **Track it.** Check **Grow users → Store performance → Acquisition** after 2–3 weeks to see which search terms bring installs, then adjust the short description.
