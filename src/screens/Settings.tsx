import React, { useState } from "react";
import { View, TextInput, Share, Platform } from "react-native";
import { validateProgress } from "../state/model";
import { useNavigation } from "@react-navigation/native";
import { goalInfo } from "../state/onboarding";
import { REMINDER_TIMES, defaultReminder } from "../state/reminders";
import { ensurePermission, remindersSupported } from "../components/reminderService";
import { useProgress } from "../state/progress";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
} from "../components/ui";
import { s } from "../components/styles";
import * as Speech from "expo-speech";
export default function Settings() {
  const { progress, settings, importProgress, reset, saveReminder } =
    useProgress();
  const reminder = progress.reminder ?? defaultReminder;
  const [reminderNote, setReminderNote] = useState("");
  const navigation = useNavigation<any>();
  const [backup, setBackup] = useState("");
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  return (
    <Shell>
      <Heading
        title="तुमच्या आवडीनुसार"
        sub="Settings · प्रगतीची प्रत सुरक्षित ठेवा."
      />
      <Label>तुमचे ध्येय · YOUR GOAL</Label>
      <Text style={s.body}>
        {progress.profile
          ? `${goalInfo[progress.profile.goal].mr} · दररोज ${progress.profile.minutes} मिनिटे`
          : "अजून निवडलेले नाही."}
      </Text>
      <View style={{ height: 10 }} />
      <Button
        secondary
        title="ध्येय आणि वेळ बदला · Change"
        onPress={() => navigation.navigate("Onboarding")}
      />
      <View style={{ height: 24 }} />
      <Label>रोजची आठवण · DAILY REMINDER</Label>
      <Text style={s.body}>
        ठरलेल्या वेळी फोनवर आठवण येईल. सूचना फक्त तुमच्या फोनवरच तयार होतात;
        काहीही बाहेर पाठवले जात नाही. आज सराव केला असेल तर आजची आठवण येत नाही.
      </Text>
      {!remindersSupported ? (
        <Text style={s.smallMuted}>
          ही सुविधा Android आणि iPhone अॅपमध्ये उपलब्ध आहे.
        </Text>
      ) : (
        <View style={{ gap: 10, marginTop: 10 }}>
          <Button
            secondary={!reminder.enabled}
            title={reminder.enabled ? "✓ आठवण सुरू आहे · Turn off" : "आठवण सुरू करा · Turn on"}
            onPress={async () => {
              if (reminder.enabled) {
                saveReminder({ ...reminder, enabled: false });
                setReminderNote("आठवण बंद केली.");
                return;
              }
              const result = await ensurePermission();
              if (result === "granted") {
                saveReminder({ ...reminder, enabled: true });
                setReminderNote("आठवण सुरू झाली.");
              } else {
                setReminderNote(
                  "सूचनांची परवानगी मिळाली नाही. फोनच्या सेटिंग्जमध्ये इंग्रजी साथीसाठी सूचना सुरू करा.",
                );
              }
            }}
          />
          {REMINDER_TIMES.map((t) => {
            const on = t.hour === reminder.hour && t.minute === reminder.minute;
            return (
              <Button
                key={t.label}
                secondary={!on}
                title={`${on ? "✓ " : ""}${t.label}`}
                onPress={() =>
                  saveReminder({ ...reminder, hour: t.hour, minute: t.minute })
                }
              />
            );
          })}
          {!!reminderNote && (
            <Text accessibilityLiveRegion="polite" style={s.smallMuted}>
              {reminderNote}
            </Text>
          )}
        </View>
      )}
      <View style={{ height: 24 }} />
      <Label>अक्षरांचा आकार · TEXT SIZE</Label>
      <View style={{ gap: 10 }}>
        {[
          [1, "नेहमीचा · Standard"],
          [1.15, "मोठा · Large"],
          [1.3, "अधिक मोठा · Extra large"],
        ].map(([n, label]) => (
          <Button
            key={n}
            secondary={progress.settings.textSize !== n}
            title={`${progress.settings.textSize === n ? "✓ " : ""}${label}`}
            onPress={() => settings({ textSize: n as number })}
          />
        ))}
      </View>
      <View style={{ height: 24 }} />
      <Button
        secondary
        title={
          progress.settings.sound
            ? "आवाज सुरू आहे · Turn sound off"
            : "आवाज बंद आहे · Turn sound on"
        }
        onPress={() => {
          void Speech.stop();
          settings({ sound: !progress.settings.sound });
        }}
      />
      <View style={s.dailyCard}>
        <Label>प्रगतीची प्रत · BACKUP</Label>
        <Text style={s.body}>
          Export दाबा, मग खालील पूर्ण मजकूर copy करून सुरक्षित ठेवा. Restore
          केल्यास सध्याची प्रगती बदलेल. रेकॉर्डिंग या प्रतीत नसते.
        </Text>
        <View style={{ height: 14 }} />
        <Button
          title="प्रत तयार करा · Export"
          onPress={() => {
            setBackup(JSON.stringify(progress, null, 2));
            setMessage("प्रत तयार आहे. पूर्ण मजकूर copy करून ठेवा.");
          }}
        />
        <View style={{ height: 14 }} />
        <TextInput
          accessibilityLabel="Progress backup JSON"
          multiline
          value={backup}
          onChangeText={(v) => {
            setBackup(v);
            setPending(false);
          }}
          placeholder="प्रत येथे paste करा…"
          style={[
            s.input,
            {
              minHeight: 160,
              borderWidth: 1,
              borderColor: "#617168",
              padding: 14,
              textAlignVertical: "top",
            },
          ]}
        />
        <View style={{ height: 14 }} />
        {Platform.OS !== "web" && (
          <>
            <Button
              secondary
              title="प्रत शेअर करा · Share backup"
              onPress={() => {
                void Share.share({
                  message: JSON.stringify(progress, null, 2),
                }).catch(() =>
                  setMessage("प्रत शेअर करता आली नाही. मजकूर copy करा."),
                );
              }}
            />
            <View style={{ height: 12 }} />
          </>
        )}
        <Button
          secondary
          title="प्रत तपासा · Validate import"
          onPress={() => {
            try {
              if (backup.length > 1000000) throw Error();
              validateProgress(JSON.parse(backup));
              setPending(true);
              setMessage(
                "वैध प्रत आहे. सध्याची प्रगती बदलण्यापूर्वी Export करून ठेवा.",
              );
            } catch {
              setPending(false);
              setMessage(
                "ही प्रत वैध नाही. तुमची सध्याची प्रगती सुरक्षित आहे.",
              );
            }
          }}
        />
        {pending && (
          <View style={{ gap: 12, marginTop: 12 }}>
            <Button
              title="हो, या प्रतीतून प्रगती बदला · Restore"
              onPress={() => {
                try {
                  importProgress(backup);
                  setPending(false);
                  setMessage("प्रगती यशस्वीपणे आणली.");
                } catch {
                  setMessage(
                    "प्रत आणता आली नाही. सध्याची प्रगती सुरक्षित आहे.",
                  );
                }
              }}
            />
            <Button
              secondary
              title="रद्द करा · Cancel"
              onPress={() => setPending(false)}
            />
          </View>
        )}
      </View>
      <Text accessibilityLiveRegion="polite" style={s.marathiBody}>
        {message}
      </Text>
      <View style={{ gap: 12, marginTop: 24 }}>
        <Button
          secondary
          title="प्रगती पुसा · Reset"
          onPress={() => setConfirm(true)}
        />
        {confirm && (
          <>
            <Text style={s.marathiBody}>
              सर्व प्रगती, जतन केलेले शब्द आणि सेटिंग्ज पुसायचे? आधी प्रत तयार
              करा.
            </Text>
            <Button
              title="हो, सर्व प्रगती पुसा · Confirm reset"
              onPress={() => {
                reset();
                setConfirm(false);
                setBackup("");
                setMessage("प्रगती पुसली. नव्याने सुरुवात करूया.");
              }}
            />
            <Button
              secondary
              title="नको · Cancel"
              onPress={() => setConfirm(false)}
            />
          </>
        )}
      </View>
    </Shell>
  );
}
