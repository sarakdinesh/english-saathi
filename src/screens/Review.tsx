import type { StackProps, TabProps } from "../navigation/types";
import { Listen } from "../components/Audio";
import { drillCards, mistakes } from "../data/speaking";
import React, { useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useProgress } from "../state/progress";
import { words, questions } from "../data/course";
import { exerciseById, expressionById, kits, pathLessons } from "../curriculum";
import { Exercise } from "../components/Exercise";
import {
  AppText as Text,
  Shell,
  Heading,
  Label,
  Button,
  Section,
} from "../components/ui";
import { s } from "../components/styles";
export default function Review({ navigation }: TabProps<"Review">) {
  const { progress, review } = useProgress();
  const [held, setHeld] = useState<string[]>([]);
  const [now, setNow] = useState(Date.now());
  const [reveal, setReveal] = useState<string[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      setHeld([]);
      setNow(Date.now());
      const timer = setInterval(() => setNow(Date.now()), 30000);
      return () => clearInterval(timer);
    }, []),
  );
  const due = Object.entries(progress.reviews)
    .filter(([, r]) => r.due <= now)
    .map(([id]) => id);
  const upcoming = Object.entries(progress.reviews).filter(
    ([, r]) => r.due > now,
  );
  return (
    <Shell>
      <Label>आठवा, सराव करा · REVIEW</Label>
      <Heading
        title="उजळणी आणि सराव"
        sub="चुका समजून घ्या. आत्मविश्वास वाढवा."
      />
      <View style={s.explanation}>
        <Text style={s.sectionTitle}>{due.length} गोष्टींची उजळणी बाकी</Text>
        {due.length > 0 && (
          <Text style={s.smallMuted}>
            शब्द {due.filter((i) => i.startsWith("word")).length} · प्रश्न{" "}
            {due.filter((i) => exerciseById(i) || i.startsWith("quiz-")).length}{" "}
            · वाक्ये{" "}
            {
              due.filter((i) => i.startsWith("exp-") || i.startsWith("say-"))
                .length
            }{" "}
            · चुका {due.filter((i) => i.startsWith("mistake-")).length}
          </Text>
        )}
        <Text style={s.body}>
          {due.length
            ? "एकावेळी एक गोष्ट आठवा."
            : "छान! सध्या काही बाकी नाही. खालील सराव निवडा."}
        </Text>
        {upcoming.length > 0 && (
          <Text style={s.body}>
            पुढची उजळणी:{" "}
            {new Date(
              Math.min(...upcoming.map(([, r]) => r.due)),
            ).toLocaleString()}{" "}
            · {upcoming.length} नियोजित
          </Text>
        )}
      </View>
      {Array.from(new Set([...due, ...held])).map((id) => {
        const e = exerciseById(id);
        if (e)
          return (
            <Exercise
              key={id}
              item={e}
              onAttempt={() => setHeld((v) => Array.from(new Set([...v, id])))}
              onDone={() => setHeld((v) => v.filter((x) => x !== id))}
            />
          );
        const drill = drillCards.find((c) => c.id === id);
        const slip = id.startsWith("mistake-")
          ? mistakes[Number(id.slice(8))]
          : undefined;
        const expr = expressionById(id);
        const word = words.find((w) => w.id === id);
        const q = id.startsWith("quiz-")
          ? questions[Number(id.slice(5))]
          : undefined;
        if (!word && !q && !drill && !slip && !expr) return null;
        const kind = word
          ? "शब्द · WORD"
          : q
            ? "प्रश्न · QUESTION"
            : slip
              ? "सामान्य चूक · MISTAKE"
              : "उपयुक्त वाक्य · PHRASE";
        const english =
          word?.example ?? drill?.en ?? slip?.right.split(" / ")[0] ?? expr?.en;
        return (
          <View key={id} style={s.dailyCard}>
            <Label>{kind}</Label>
            <Text style={s.exampleEnglish}>
              {word?.en ?? q?.prompt ?? drill?.mr ?? slip?.wrong ?? expr?.mr}
            </Text>
            {!reveal.includes(id) ? (
              <Button
                secondary
                title="उत्तर आठवा, मग पाहा · Reveal"
                onPress={() => setReveal((v) => [...v, id])}
              />
            ) : (
              <>
                <Text style={s.marathiBody}>
                  {word?.mr ??
                    q?.options[q.answer] ??
                    drill?.en ??
                    slip?.right ??
                    expr?.en}
                </Text>
                <Text style={s.body}>
                  {word
                    ? `${word.example}\n${word.translation}`
                    : (q?.explanation ?? drill?.say ?? slip?.why)}
                </Text>
                {!!english && <Listen text={english} compact />}
                <View style={{ gap: 10, marginTop: 14 }}>
                  <Button
                    title="आठवले · I remembered"
                    onPress={() => {
                      review(id, true);
                      setReveal((v) => v.filter((x) => x !== id));
                    }}
                  />
                  <Button
                    secondary
                    title="पुन्हा शिकायचे आहे · Review sooner"
                    onPress={() => {
                      review(id, false);
                      setReveal((v) => v.filter((x) => x !== id));
                    }}
                  />
                </View>
              </>
            )}
          </View>
        );
      })}
      <Section title="पाठानुसार सराव · Practice by lesson" />
      <Text style={s.body}>
        ज्या धड्यांना तुम्ही सुरुवात केली आहे किंवा पूर्ण केले आहे त्यांचे
        प्रश्न पुन्हा सोडवा.
      </Text>
      {pathLessons(progress.path)
        .filter(
          (l) =>
            kits[l.id] &&
            (progress.completed.includes(l.id) ||
              progress.steps[l.id] !== undefined),
        )
        .slice(-8)
        .map((l) => (
          <View key={l.id} style={{ marginTop: 10 }}>
            <Button
              secondary
              title={`${l.title} · ${kits[l.id].ex.filter((e) => progress.mastered.includes(e.id)).length}/${kits[l.id].ex.length}`}
              onPress={() =>
                navigation.navigate("UnitPractice", { lesson: l.id })
              }
            />
          </View>
        ))}
      <Section title="मिश्र प्रश्नमंजुषा" />
      {progress.history.length > 0 && (
        <Text style={s.body}>
          मागील प्रश्नमंजुषा:{" "}
          {progress.history[progress.history.length - 1].score}% ·{" "}
          {new Date(
            progress.history[progress.history.length - 1].at,
          ).toLocaleDateString()}
        </Text>
      )}
      <Text style={s.body}>
        १२ ठरावीक प्रश्न · {progress.attempts} प्रयत्न · सर्वोत्तम{" "}
        {progress.bestScore}% हा या प्रश्नमंजुषेचा गुण आहे; एकूण इंग्रजी
        कौशल्याचा नाही.
      </Text>
      <View style={{ height: 14 }} />
      <Button
        secondary
        title="मिश्र सराव सुरू करा · Mixed quiz"
        onPress={() => navigation.navigate("Quiz")}
      />
      <View style={{ height: 14 }} />
      <Button
        secondary
        title="जतन केलेले · Saved"
        onPress={() => navigation.navigate("Saved")}
      />
    </Shell>
  );
}
export function UnitPractice({ route }: StackProps<"UnitPractice">) {
  return (
    <Shell>
      <Heading
        title="थोडा सराव करूया"
        sub="पहिले युनिट · योग्य उत्तरानंतर उजळणी पुढे ढकलली जाते."
      />
      {(kits[route.params.lesson]?.ex ?? []).map((e) => (
        <Exercise key={e.id} item={e} />
      ))}
    </Shell>
  );
}
const letterNames =
  "ए बी सी डी ई एफ जी एच आय जे के एल एम एन ओ पी क्यू आर एस टी यू व्ही डब्ल्यू एक्स वाय झेड";
export function Foundations() {
  return (
    <Shell>
      <Label>ऐच्छिक सुरुवात · OPTIONAL FOUNDATIONS</Label>
      <Heading
        title="इंग्रजी वाचायला सुरुवात"
        sub="व्याकरणापूर्वी · तुमच्या गतीने वाचा."
      />
      <Text style={s.marathiBody}>
        इंग्रजीत २६ अक्षरे आहेत. मोठे आणि छोटे अक्षर त्याच अक्षराची दोन रूपे
        आहेत: A a, B b, C c. अक्षराचे नाव आणि शब्दातील आवाज नेहमी सारखे नसतात.
      </Text>
      <View style={s.dailyCard}>
        <Text style={s.exampleEnglish}>
          A a · B b · C c · D d · E e{"\n"}F f · G g · H h · I i · J j{"\n"}K k
          · L l · M m · N n · O o{"\n"}P p · Q q · R r · S s · T t{"\n"}U u · V
          v · W w · X x · Y y · Z z
        </Text>
      </View>
      <View style={s.dailyCard}>
        <Text style={s.rowTitle}>अक्षरांची नावे · Letter names</Text>
        <Text style={s.exampleEnglish}>
          {letterNames
            .split(" ")
            .map((n, i) => `${String.fromCharCode(65 + i)} ${n}`)
            .join(" · ")}
        </Text>
        <Listen text="A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z" />
      </View>
      <Text style={s.marathiBody}>
        मोकळी जागा दोन शब्द वेगळे करते. पूर्णविराम (.) वाक्य संपल्याचे दाखवतो.
        एकेक शब्द वाचा, मग पूर्ण वाक्य बोला.
      </Text>
      {[
        ["I", "मी"],
        ["am", "आहे"],
        ["home", "घर"],
        ["water", "पाणी"],
      ].map(([en, mr]) => (
        <View key={en} style={s.lessonRow}>
          <Text style={s.exampleEnglish}>
            {en} · {mr}
          </Text>
        </View>
      ))}
      <Text style={s.marathiBody}>
        I am at home. · मी घरी आहे. आता Learn मध्ये “स्वतःची ओळख” हा धडा सुरू
        करा.
      </Text>
    </Shell>
  );
}
