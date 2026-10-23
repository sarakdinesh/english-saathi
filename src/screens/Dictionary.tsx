// Speaking dictionary: 3000+ daily-life words, 500+ verbs with four forms,
// phrasal verbs and opposites. One search (English or Marathi) and a filter
// per tab; every row can be heard with the phone's own voice (offline).
// A virtualised FlatList keeps thousands of rows smooth, so this screen
// builds its own layout instead of Shell's ScrollView.
import type { StackProps } from "../navigation/types";
import React, { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  dictionaryWords,
  opposites,
  phrasalVerbs,
  search,
  verbs,
  wordCategories,
  type Opposite,
  type Phrasal,
  type Verb,
  type Word,
} from "../data/dictionary";
import { Speaker } from "../components/Audio";
import {
  AppHeader,
  AppText as Text,
  Heading,
  Icon,
  Label,
  SegmentTabs,
} from "../components/ui";
import { s } from "../components/styles";
import { C } from "../components/theme";

export type DictTab = "words" | "verbs" | "phrasal" | "opposites";
const TABS = [
  ["words", "शब्द", "text-outline"],
  ["verbs", "क्रियापदे", "flash-outline"],
  ["phrasal", "फ्रेजल", "git-merge-outline"],
  ["opposites", "विरुद्धार्थी", "swap-horizontal-outline"],
] as const;
type VerbFilter = "all" | "regular" | "irregular";

function Chip({ on, label, sub, onPress }: { on: boolean; label: string; sub?: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={sub ? `${label} · ${sub}` : label}
      accessibilityState={{ selected: on }}
      onPress={onPress}
      style={[s.filter, on && s.filterActive]}
    >
      <Text style={[s.filterText, on && { color: C.onPrimary }]}>
        {label}
        {!!sub && <Text style={[s.filterSub, on && { color: C.onPrimary }]}> · {sub}</Text>}
      </Text>
    </Pressable>
  );
}

const WordRow = ({ w }: { w: Word }) => (
  <View style={s.dictRow}>
    <View style={{ flex: 1 }}>
      <Text style={s.rowTitle}>{w.en}</Text>
      <Text style={s.body}>{w.mr}</Text>
    </View>
    <Speaker text={w.en} label={`ऐका: ${w.en}`} />
  </View>
);
const VerbRow = ({ v }: { v: Verb }) => (
  <View style={s.dictRow}>
    <View style={{ flex: 1 }}>
      <Text style={s.rowTitle}>
        {v.v1}
        {v.irregular ? <Text style={s.dictTag}>  अनियमित</Text> : null}
      </Text>
      <Text style={s.dictForms}>
        {v.v2} · {v.v3} · {v.ing}
      </Text>
      <Text style={s.body}>{v.mr}</Text>
    </View>
    <Speaker
      text={`${v.v1.replace(/ \(.*\)$/, "")}, ${v.v2.replace("/", ", ")}, ${v.v3}, ${v.ing}`}
      label={`ऐका: ${v.v1}`}
    />
  </View>
);
const PhrasalRow = ({ p }: { p: Phrasal }) => (
  <View style={s.dictRow}>
    <View style={{ flex: 1 }}>
      <Text style={s.rowTitle}>{p.en}</Text>
      <Text style={s.body}>{p.mr}</Text>
      <Text style={s.dictForms}>{p.ex}</Text>
    </View>
    <Speaker text={`${p.en}. ${p.ex}`} label={`ऐका: ${p.en}`} />
  </View>
);
const OppositeRow = ({ o }: { o: Opposite }) => (
  <View style={s.dictRow}>
    <View style={{ flex: 1 }}>
      <Text style={s.rowTitle}>
        {o.a} ↔ {o.b}
      </Text>
      <Text style={s.body}>{o.mr}</Text>
    </View>
    <Speaker text={`${o.a}, ${o.b}`} label={`ऐका: ${o.a}, ${o.b}`} />
  </View>
);

export default function Dictionary({ route }: StackProps<"Dictionary">) {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<DictTab>(route.params?.tab ?? "words");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [kind, setKind] = useState<VerbFilter>("all");

  const data = useMemo((): (Word | Verb | Phrasal | Opposite)[] => {
    if (tab === "words")
      return search(
        cat === "all" ? dictionaryWords : dictionaryWords.filter((w) => w.cat === cat),
        query,
        (w) => [w.en, w.mr],
      );
    if (tab === "verbs")
      return search(
        kind === "all" ? verbs : verbs.filter((v) => v.irregular === (kind === "irregular")),
        query,
        (v) => [v.v1, v.v2, v.v3, v.ing, v.mr],
      );
    if (tab === "phrasal") return search(phrasalVerbs, query, (p) => [p.en, p.mr, p.ex]);
    return search(opposites, query, (o) => [o.a, o.b, o.mr]);
  }, [tab, query, cat, kind]);

  const header = (
    <View>
      <Label>शब्दकोश · DICTIONARY</Label>
      <Heading
        title="बोलण्यासाठी शब्दकोश"
        sub={`${dictionaryWords.length} शब्द · ${verbs.length} क्रियापदे · ${phrasalVerbs.length} फ्रेजल क्रियापदे · ${opposites.length} विरुद्धार्थी जोड्या. 🔊 दाबून ऐका.`}
      />
      <SegmentTabs
        label="शब्दकोश विभाग"
        value={tab}
        onChange={(t) => {
          setTab(t);
          setQuery("");
        }}
        options={TABS}
      />
      <View style={[s.search, { marginTop: 12 }]}>
        <Icon name="search-outline" />
        <TextInput
          accessibilityLabel="शब्द शोधा · Search"
          style={s.input}
          value={query}
          onChangeText={setQuery}
          placeholder="इंग्रजी किंवा मराठी शब्द शोधा…"
          placeholderTextColor={C.muted}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {!!query && (
          <Pressable accessibilityRole="button" accessibilityLabel="शोध पुसा" onPress={() => setQuery("")}>
            <Icon name="close-circle" color={C.muted} />
          </Pressable>
        )}
      </View>
      {tab === "words" && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[s.filters, { paddingTop: 12 }]}>
          <Chip on={cat === "all"} label="सर्व" sub={`${dictionaryWords.length}`} onPress={() => setCat("all")} />
          {wordCategories.map((c) => (
            <Chip key={c.id} on={cat === c.id} label={c.mr} sub={c.en} onPress={() => setCat(c.id)} />
          ))}
        </ScrollView>
      )}
      {tab === "verbs" && (
        <View style={[s.chipRow, { paddingTop: 12, paddingBottom: 8 }]}>
          <Chip on={kind === "all"} label="सर्व" sub={`${verbs.length}`} onPress={() => setKind("all")} />
          <Chip on={kind === "regular"} label="नियमित" sub="-ed लागणारी" onPress={() => setKind("regular")} />
          <Chip on={kind === "irregular"} label="अनियमित" sub="रूप बदलणारी (go-went)" onPress={() => setKind("irregular")} />
        </View>
      )}
      {tab === "verbs" && (
        <Text style={s.smallMuted}>V1 · V2 (भूतकाळ) · V3 (तिसरे रूप) · V-ing</Text>
      )}
      <Text accessibilityLiveRegion="polite" style={[s.smallMuted, { marginTop: 6, marginBottom: 4 }]}>
        {data.length} नोंदी · A→Z
      </Text>
    </View>
  );

  return (
    <View style={s.safe}>
      <AppHeader />
      <FlatList
        data={data}
        keyExtractor={(x, i) =>
          "v1" in x ? `v-${x.v1}` : "a" in x ? `o-${x.a}-${x.b}` : "ex" in x ? `p-${x.en}` : `w-${x.cat}-${x.en}-${i}`
        }
        renderItem={({ item }) =>
          "v1" in item ? (
            <VerbRow v={item} />
          ) : "a" in item ? (
            <OppositeRow o={item} />
          ) : "ex" in item ? (
            <PhrasalRow p={item} />
          ) : (
            <WordRow w={item} />
          )
        }
        ListHeaderComponent={header}
        ListEmptyComponent={
          <Text style={[s.marathiBody, { marginTop: 20 }]}>शब्द सापडला नाही. दुसरा शब्द शोधून पाहा.</Text>
        }
        ListFooterComponent={
          <Text style={[s.smallMuted, { marginTop: 20 }]}>
            मराठी अर्थ शिक्षकांकडून तपासले जायचे आहेत. चूक दिसल्यास कळवा.
          </Text>
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        initialNumToRender={20}
        windowSize={11}
        contentContainerStyle={[
          s.page,
          { paddingLeft: 24 + insets.left, paddingRight: 24 + insets.right, paddingBottom: 24 + insets.bottom },
        ]}
      />
    </View>
  );
}
