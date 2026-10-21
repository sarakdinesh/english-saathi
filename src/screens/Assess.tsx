import React, { useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { talks, unitById, unitLessons } from "../curriculum";
import {
  foundationQuestions,
  placementQuestions,
  recommend,
  speakingChecks,
} from "../curriculum/placement";
import { pathInfo } from "./Learn";
import { useProgress } from "../state/progress";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
} from "../components/ui";
import { Recorder } from "../components/Audio";
import { Exercise } from "../components/Exercise";
import { s } from "../components/styles";
import { C } from "../components/theme";

// Optional starting-level check. Results recommend a start only.
export function Placement({ navigation }: any) {
  const { savePlacement, setPath, progress } = useProgress();
  const first = useRef<Record<string, boolean>>({});
  const [done, setDone] = useState(0);
  const [self, setSelf] = useState<boolean[]>([false, false, false]);
  const [result, setResult] = useState<ReturnType<typeof recommend> | null>(
    null,
  );
  const correctIn = (list: { id: string }[]) =>
    list.filter((q) => first.current[q.id]).length;
  const score = correctIn(placementQuestions);
  const foundation = correctIn(foundationQuestions);
  const ready = done >= placementQuestions.length + foundationQuestions.length;
  const finish = () => {
    const speak = self.filter(Boolean).length;
    const rec = recommend(score, speak, foundation);
    savePlacement({
      path: rec.path,
      unit: rec.unit,
      score,
      total: placementQuestions.length,
      speak,
      foundation,
      at: Date.now(),
    });
    setResult(rec);
  };
  if (result) {
    const unit = unitById(result.unit);
    return (
      <Shell>
        <Label>सुरुवातीची शिफारस · RECOMMENDATION</Label>
        <Heading
          title={pathInfo[result.path].mr}
          sub={`शिफारस केलेले युनिट: ${unit?.title ?? ""}`}
        />
        <View style={s.noteBox}>
          <Text style={s.body}>
            तुम्ही {foundation} / {foundationQuestions.length} अक्षरे-आवाजांचे
            आणि {score} / {placementQuestions.length} वाक्यांचे प्रश्न पहिल्या
            प्रयत्नात बरोबर सोडवले. हा प्रमाणित पातळी-चाचणी निकाल नाही; फक्त
            कुठून सुरू करायचे हे सुचवण्यासाठी आहे. तुम्ही कधीही मार्ग बदलू शकता
            आणि सर्व धडे उघडे आहेत.
          </Text>
        </View>
        <Button
          title="या युनिटपासून सुरू करा"
          onPress={() => {
            setPath(result.path);
            const first = unit ? unitLessons(unit)[0] : undefined;
            if (first) navigation.replace("Lesson", { id: first.id });
            else navigation.goBack();
          }}
        />
        <View style={{ height: 12 }} />
        <Button
          secondary
          title="माझा सध्याचा मार्ग ठेवा"
          onPress={() => navigation.goBack()}
        />
        <Text style={s.smallMuted}>
          तुमचा मार्ग तुम्ही कधीही Learn मधून बदलू शकता. सर्व धडे खुले आहेत.
        </Text>
      </Shell>
    );
  }
  return (
    <Shell>
      <Label>ऐच्छिक · OPTIONAL STARTING CHECK</Label>
      <Heading
        title="कुठून सुरू करावे?"
        sub="३ अक्षरे-आवाजांचे प्रश्न, ९ छोटे प्रश्न आणि ३ स्वतःचे मूल्यांकन. वगळायचे असल्यास मागे जा."
      />
      <View style={s.noteBox}>
        <Text style={s.body}>
          हे प्रमाणित मूल्यांकन नाही. निकाल फक्त सुरुवातीचा मार्ग सुचवतो. प्रश्न
          चुकले तरी काळजी नको.
          {progress.placement
            ? "\nतुम्ही हे आधी केले आहे; पुन्हा करू शकता."
            : ""}
        </Text>
      </View>
      {[
        { title: "भाग १ · अक्षरे आणि आवाज", list: foundationQuestions },
        { title: "भाग २ · इंग्रजी वाक्ये", list: placementQuestions },
      ].map((part) => (
        <View key={part.title}>
          <Text style={s.sectionTitle}>{part.title}</Text>
          {part.list.map((q) => (
            <Exercise
              key={q.id}
              item={q}
              track={false}
              onResult={(correct) => {
                if (first.current[q.id] === undefined) {
                  first.current[q.id] = correct;
                  setDone((d) => d + 1);
                }
              }}
            />
          ))}
        </View>
      ))}
      <Text style={s.sectionTitle}>
        स्वतःचे मूल्यांकन · Speaking self-check
      </Text>
      {speakingChecks.map((c, i) => (
        <Pressable
          key={c}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: self[i] }}
          onPress={() => setSelf(self.map((v, k) => (k === i ? !v : v)))}
          style={[
            s.option,
            { marginTop: 10 },
            self[i] && { borderColor: C.green, backgroundColor: "#E9F2E8" },
          ]}
        >
          <Text style={[s.exampleEnglish, { flex: 1, fontSize: 15 }]}>
            {self[i] ? "✓ " : "○ "}
            {c}
          </Text>
        </Pressable>
      ))}
      <View style={{ height: 18 }} />
      <Button
        disabled={!ready}
        title={
          ready
            ? "शिफारस पाहा · See recommendation"
            : `प्रश्न सोडवा (${done}/${placementQuestions.length + foundationQuestions.length})`
        }
        onPress={finish}
      />
    </Shell>
  );
}

// Unit checkpoint: new situation, applying the unit's patterns.
export function Checkpoint({ route, navigation }: any) {
  const unit = unitById(route.params.unit);
  const { saveCheckpoint, activity, progress } = useProgress();
  const first = useRef<Record<string, boolean>>({});
  const [done, setDone] = useState(0);
  const [saved, setSaved] = useState(false);
  if (!unit?.checkpoint)
    return (
      <Shell>
        <Heading title="चेकपॉइंट सापडला नाही" />
        <Button title="मागे जा" onPress={() => navigation.goBack()} />
      </Shell>
    );
  const cp = unit.checkpoint;
  const correct = Object.values(first.current).filter(Boolean).length;
  const prev = progress.checkpoints[unit.id];
  return (
    <Shell>
      <Label>युनिट चेकपॉइंट · {unit.en.toUpperCase()}</Label>
      <Heading title="नवीन परिस्थिती" sub={cp.scenario[1]} />
      <View style={s.noteBox}>
        <Text style={s.exampleEnglish}>{cp.scenario[0]}</Text>
        <Text style={s.body}>
          हे प्रश्न धड्यांतील वाक्ये पुन्हा विचारत नाहीत; शिकलेली रचना नवीन
          प्रसंगात वापरायला सांगतात. चुकलेले प्रश्न उजळणीत येतील.
        </Text>
        {prev && (
          <Text style={s.smallMuted}>
            मागील निकाल: {prev.correct}/{prev.total}
          </Text>
        )}
      </View>
      {cp.ex.map((q) => (
        <Exercise
          key={q.id}
          item={q}
          onResult={(c) => {
            if (first.current[q.id] === undefined) {
              first.current[q.id] = c;
              setDone((d) => d + 1);
            }
          }}
        />
      ))}
      <View style={s.explanation}>
        <Label>बोलण्याचा सराव · SPEAKING TASK</Label>
        <Text style={s.marathiBody}>{cp.speak}</Text>
        <Text style={s.body}>
          रेकॉर्ड करणे ऐच्छिक आहे. अॅप बोलणे तपासत नाही.
        </Text>
        <Recorder />
      </View>
      {saved ? (
        <Text accessibilityLiveRegion="polite" style={s.rowTitle}>
          निकाल नोंदवला: {correct} / {cp.ex.length} (पहिल्या प्रयत्नात) ✓
        </Text>
      ) : (
        <Button
          disabled={done < cp.ex.length}
          title={
            done < cp.ex.length
              ? `प्रश्न सोडवा (${done}/${cp.ex.length})`
              : "निकाल नोंदवा"
          }
          onPress={() => {
            saveCheckpoint(unit.id, correct, cp.ex.length);
            activity("check");
            setSaved(true);
          }}
        />
      )}
      <View style={{ height: 12 }} />
      <Button secondary title="मागे जा" onPress={() => navigation.goBack()} />
    </Shell>
  );
}

// Longer speaking task with optional preparation and a plain timer.
export function LongTalk({ route, navigation }: any) {
  const talk = talks.find((t) => t.id === route.params.id);
  const { markSpeaking, progress, setConfidence } = useProgress();
  const [notes, setNotes] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [logged, setLogged] = useState(false);
  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  if (!talk)
    return (
      <Shell>
        <Heading title="विषय सापडला नाही" />
        <Button title="मागे जा" onPress={() => navigation.goBack()} />
      </Shell>
    );
  const mm = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const done = progress.speaking[talk.id]?.task ?? 0;
  return (
    <Shell>
      <Label>दीर्घ बोलणे · 1–2 MINUTE TALK</Label>
      <Heading title={talk.title} sub={talk.mr} />
      <View style={s.explanation}>
        <Text style={s.marathiBody}>{talk.prompt}</Text>
      </View>
      <Text style={s.sectionTitle}>१. तयारी (ऐच्छिक)</Text>
      {talk.outline.map((o) => (
        <Text key={o} style={s.body}>
          • {o}
        </Text>
      ))}
      <TextInput
        accessibilityLabel="तुमच्या नोट्स"
        multiline
        value={notes}
        onChangeText={setNotes}
        placeholder="मुद्दे इंग्रजीत किंवा मराठीत लिहा (हे सेव्ह होत नाही)…"
        placeholderTextColor={C.muted}
        style={[
          s.input,
          s.search,
          {
            minHeight: 90,
            textAlignVertical: "top",
            paddingHorizontal: 15,
            marginTop: 12,
          },
        ]}
      />
      <Text style={s.sectionTitle}>उपयुक्त सुरुवातीची वाक्ये</Text>
      {talk.starters.map((x) => (
        <Text key={x} style={[s.exampleEnglish, { marginTop: 6 }]}>
          “{x}”
        </Text>
      ))}
      <Text style={[s.sectionTitle, { marginTop: 22 }]}>२. बोला</Text>
      <View style={s.noteBox}>
        <Text style={s.resultScore}>{mm}</Text>
        <Text style={s.smallMuted}>
          ध्येय: सुमारे १ ते २ मिनिटे. फक्त वेळेचा अंदाज; अॅप तुमचे बोलणे तपासत
          नाही.
        </Text>
        <View style={{ height: 10 }} />
        <Button
          secondary
          title={
            running
              ? "थांबवा · Pause"
              : seconds
                ? "पुन्हा सुरू · Resume"
                : "टायमर सुरू करा"
          }
          onPress={() => setRunning(!running)}
        />
        {seconds > 0 && (
          <>
            <View style={{ height: 8 }} />
            <Button
              secondary
              title="टायमर शून्य करा"
              onPress={() => {
                setRunning(false);
                setSeconds(0);
              }}
            />
          </>
        )}
      </View>
      <Recorder />
      <Button
        title="मी मोठ्याने बोललो/बोलले · Log"
        onPress={() => {
          markSpeaking(talk.id, "task");
          setRunning(false);
          setLogged(true);
        }}
      />
      {(logged || done > 0) && (
        <Text accessibilityLiveRegion="polite" style={s.smallMuted}>
          नोंद झाली · एकूण {done || 1} वेळा.
        </Text>
      )}
      <Text style={[s.rowTitle, { marginTop: 18 }]}>
        आत्मविश्वास कसा वाटला?
      </Text>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 }}
      >
        {(
          [
            [1, "अजून सराव हवा"],
            [2, "थोडा आत्मविश्वास"],
            [3, "आत्मविश्वास आहे"],
          ] as [1 | 2 | 3, string][]
        ).map(([v, l]) => (
          <Pressable
            key={v}
            accessibilityRole="button"
            accessibilityState={{
              selected: progress.confidence[talk.id] === v,
            }}
            onPress={() => setConfidence(talk.id, v)}
            style={[s.chip, progress.confidence[talk.id] === v && s.chipOn]}
          >
            <Text
              style={[
                s.filterText,
                progress.confidence[talk.id] === v && { color: C.white },
              ]}
            >
              {l}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={s.smallMuted}>
        आत्मविश्वासाची निवड फक्त तुमच्या भावनेची नोंद आहे.
      </Text>
    </Shell>
  );
}
