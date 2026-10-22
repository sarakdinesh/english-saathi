// Grammar reference: formula charts for tenses, modal verbs and active/passive.
// Reference only (no scoring). `lesson` links to an existing lesson id, or is
// omitted where the app has no lesson on that point yet. Marathi notes are
// unreviewed by a teacher, like all other content.

export type Formula = { en: string; ex: string; mr: string };
export type TenseRow = {
  id: string;
  name: string;
  mr: string;
  use: string;
  signals: string;
  affirmative: Formula;
  negative: Formula;
  question: Formula;
  passive?: Formula;
  lesson?: string;
};
export type ModalRow = {
  id: string;
  modal: string;
  mr: string;
  use: string;
  affirmative: Formula;
  negative: Formula;
  question: Formula;
  passive: Formula;
  lesson?: string;
};

export const tenses: TenseRow[] = [
  {
    id: "present-simple", name: "Present simple", mr: "साधा वर्तमानकाळ",
    use: "सवयी, रोजची कामे, सर्वसाधारण सत्य.",
    signals: "always, usually, often, every day, never",
    affirmative: { en: "Subject + V1 (he/she/it + V1-s)", ex: "She works every day.", mr: "ती रोज काम करते." },
    negative: { en: "Subject + do/does + not + V1", ex: "She does not work on Sunday.", mr: "ती रविवारी काम करत नाही." },
    question: { en: "Do/Does + subject + V1 ?", ex: "Does she work here?", mr: "ती इथे काम करते का?" },
    passive: { en: "Object + am/is/are + V3", ex: "English is spoken here.", mr: "इथे इंग्रजी बोलली जाते." },
    lesson: "routine",
  },
  {
    id: "present-continuous", name: "Present continuous", mr: "चालू वर्तमानकाळ",
    use: "आत्ता चालू असलेली कृती; जवळचा ठरलेला बेत.",
    signals: "now, at the moment, today, these days",
    affirmative: { en: "Subject + am/is/are + V-ing", ex: "I am cooking now.", mr: "मी आत्ता जेवण बनवत आहे." },
    negative: { en: "Subject + am/is/are + not + V-ing", ex: "He is not sleeping.", mr: "तो झोपलेला नाही." },
    question: { en: "Am/Is/Are + subject + V-ing ?", ex: "Are you studying?", mr: "तुम्ही अभ्यास करत आहात का?" },
    passive: { en: "Object + am/is/are + being + V3", ex: "The road is being repaired.", mr: "रस्त्याची दुरुस्ती चालू आहे." },
    lesson: "now",
  },
  {
    id: "present-perfect", name: "Present perfect", mr: "पूर्ण वर्तमानकाळ",
    use: "आत्ताशी संबंध असलेली पूर्ण कृती; अनुभव.",
    signals: "already, yet, just, ever, never, for, since",
    affirmative: { en: "Subject + have/has + V3", ex: "I have finished my work.", mr: "मी माझे काम संपवले आहे." },
    negative: { en: "Subject + have/has + not + V3", ex: "She has not come yet.", mr: "ती अजून आलेली नाही." },
    question: { en: "Have/Has + subject + V3 ?", ex: "Have you eaten?", mr: "तुम्ही जेवलात का?" },
    passive: { en: "Object + have/has + been + V3", ex: "The work has been finished.", mr: "काम संपले आहे." },
    lesson: "present-perfect",
  },
  {
    id: "present-perfect-continuous", name: "Present perfect continuous", mr: "पूर्ण चालू वर्तमानकाळ",
    use: "आधी सुरू झालेली आणि अजून चालू असलेली कृती (किती वेळ).",
    signals: "for, since, all day, lately, how long",
    affirmative: { en: "Subject + have/has + been + V-ing", ex: "I have been waiting for an hour.", mr: "मी एक तासापासून वाट पाहत आहे." },
    negative: { en: "Subject + have/has + not + been + V-ing", ex: "He has not been working.", mr: "तो काम करत नाहीये." },
    question: { en: "Have/Has + subject + been + V-ing ?", ex: "How long have you been learning?", mr: "तुम्ही किती काळ शिकत आहात?" },
  },
  {
    id: "past-simple", name: "Past simple", mr: "साधा भूतकाळ",
    use: "भूतकाळात पूर्ण झालेली कृती.",
    signals: "yesterday, last week, ago, in 2020",
    affirmative: { en: "Subject + V2 (was/were for be)", ex: "We visited Pune last week.", mr: "आम्ही गेल्या आठवड्यात पुण्याला गेलो." },
    negative: { en: "Subject + did + not + V1", ex: "I did not go out.", mr: "मी बाहेर गेलो नाही." },
    question: { en: "Did + subject + V1 ?", ex: "Did you call him?", mr: "तुम्ही त्याला फोन केला का?" },
    passive: { en: "Object + was/were + V3", ex: "The letter was sent yesterday.", mr: "पत्र काल पाठवले गेले." },
    lesson: "yesterday",
  },
  {
    id: "past-continuous", name: "Past continuous", mr: "चालू भूतकाळ",
    use: "भूतकाळात एखाद्या वेळी चालू असलेली कृती.",
    signals: "while, when, at 5 o'clock yesterday",
    affirmative: { en: "Subject + was/were + V-ing", ex: "I was working at six.", mr: "सहा वाजता मी काम करत होतो." },
    negative: { en: "Subject + was/were + not + V-ing", ex: "They were not sleeping.", mr: "ते झोपलेले नव्हते." },
    question: { en: "Was/Were + subject + V-ing ?", ex: "Were you watching TV?", mr: "तुम्ही टीव्ही पाहत होता का?" },
    passive: { en: "Object + was/were + being + V3", ex: "The house was being painted.", mr: "घराला रंग दिला जात होता." },
    lesson: "past-continuous",
  },
  {
    id: "past-perfect", name: "Past perfect", mr: "पूर्ण भूतकाळ",
    use: "भूतकाळातील दुसऱ्या कृतीच्या आधी पूर्ण झालेली कृती.",
    signals: "before, after, by the time, already",
    affirmative: { en: "Subject + had + V3", ex: "The train had left before I came.", mr: "मी येण्यापूर्वी गाडी निघून गेली होती." },
    negative: { en: "Subject + had + not + V3", ex: "She had not eaten.", mr: "तिने जेवले नव्हते." },
    question: { en: "Had + subject + V3 ?", ex: "Had you finished?", mr: "तुम्ही संपवले होते का?" },
    passive: { en: "Object + had + been + V3", ex: "The work had been done.", mr: "काम झाले होते." },
  },
  {
    id: "past-perfect-continuous", name: "Past perfect continuous", mr: "पूर्ण चालू भूतकाळ",
    use: "भूतकाळातील एका वेळेपर्यंत किती काळ कृती चालू होती.",
    signals: "for, since, before",
    affirmative: { en: "Subject + had + been + V-ing", ex: "I had been waiting for an hour.", mr: "मी तासभर वाट पाहत होतो." },
    negative: { en: "Subject + had + not + been + V-ing", ex: "He had not been sleeping.", mr: "तो झोपत नव्हता." },
    question: { en: "Had + subject + been + V-ing ?", ex: "Had you been working?", mr: "तुम्ही काम करत होता का?" },
  },
  {
    id: "future-simple", name: "Future simple (will)", mr: "साधा भविष्यकाळ",
    use: "आत्ता ठरवलेले निर्णय, अंदाज, वचन.",
    signals: "tomorrow, next week, soon, probably",
    affirmative: { en: "Subject + will + V1", ex: "I will call you tomorrow.", mr: "मी उद्या तुम्हाला फोन करीन." },
    negative: { en: "Subject + will + not (won't) + V1", ex: "She will not come.", mr: "ती येणार नाही." },
    question: { en: "Will + subject + V1 ?", ex: "Will you help me?", mr: "तुम्ही मला मदत कराल का?" },
    passive: { en: "Object + will + be + V3", ex: "The result will be announced.", mr: "निकाल जाहीर केला जाईल." },
    lesson: "will",
  },
  {
    id: "future-going-to", name: "Future with going to", mr: "ठरलेला बेत",
    use: "आधी ठरवलेला बेत; पुरावा असलेला अंदाज.",
    signals: "tonight, tomorrow, next month",
    affirmative: { en: "Subject + am/is/are + going to + V1", ex: "We are going to visit our village.", mr: "आम्ही आमच्या गावी जाणार आहोत." },
    negative: { en: "Subject + am/is/are + not + going to + V1", ex: "I am not going to buy it.", mr: "मी ते घेणार नाही." },
    question: { en: "Am/Is/Are + subject + going to + V1 ?", ex: "What are you going to do?", mr: "तुम्ही काय करणार आहात?" },
    passive: { en: "Object + am/is/are + going to be + V3", ex: "A new school is going to be built.", mr: "नवीन शाळा बांधली जाणार आहे." },
    lesson: "going-to",
  },
  {
    id: "future-continuous", name: "Future continuous", mr: "चालू भविष्यकाळ",
    use: "भविष्यात एखाद्या वेळी चालू असणारी कृती.",
    signals: "at this time tomorrow, next Monday at 5",
    affirmative: { en: "Subject + will + be + V-ing", ex: "I will be travelling at noon.", mr: "दुपारी मी प्रवास करत असेन." },
    negative: { en: "Subject + will + not + be + V-ing", ex: "She will not be working.", mr: "ती काम करत नसेल." },
    question: { en: "Will + subject + be + V-ing ?", ex: "Will you be using the car?", mr: "तुम्ही गाडी वापरत असाल का?" },
  },
  {
    id: "future-perfect", name: "Future perfect", mr: "पूर्ण भविष्यकाळ",
    use: "भविष्यातील एका वेळेपूर्वी पूर्ण झालेली कृती.",
    signals: "by tomorrow, by then, by next year",
    affirmative: { en: "Subject + will + have + V3", ex: "I will have finished by Friday.", mr: "शुक्रवारपर्यंत माझे काम संपलेले असेल." },
    negative: { en: "Subject + will + not + have + V3", ex: "They will not have arrived.", mr: "ते पोहोचलेले नसतील." },
    question: { en: "Will + subject + have + V3 ?", ex: "Will you have finished?", mr: "तुमचे संपलेले असेल का?" },
    passive: { en: "Object + will + have + been + V3", ex: "The work will have been done.", mr: "काम झालेले असेल." },
  },
];

export const modals: ModalRow[] = [
  {
    id: "can", modal: "can / could", mr: "क्षमता, परवानगी, विनंती",
    use: "can = सध्याची क्षमता/परवानगी; could = भूतकाळातील क्षमता, नम्र विनंती.",
    affirmative: { en: "Subject + can/could + V1", ex: "I can swim.", mr: "मला पोहता येते." },
    negative: { en: "Subject + cannot (can't) / could not + V1", ex: "He can't drive.", mr: "त्याला गाडी चालवता येत नाही." },
    question: { en: "Can/Could + subject + V1 ?", ex: "Could you help me, please?", mr: "कृपया मला मदत कराल का?" },
    passive: { en: "Object + can/could + be + V3", ex: "The door can be opened.", mr: "दार उघडता येते." },
    lesson: "can",
  },
  {
    id: "may-might", modal: "may / might", mr: "शक्यता, परवानगी",
    use: "may = शक्यता/औपचारिक परवानगी; might = कमी शक्यता.",
    affirmative: { en: "Subject + may/might + V1", ex: "It may rain today.", mr: "आज पाऊस पडू शकेल." },
    negative: { en: "Subject + may/might + not + V1", ex: "She might not come.", mr: "ती कदाचित येणार नाही." },
    question: { en: "May + subject + V1 ?", ex: "May I come in?", mr: "मी आत येऊ का?" },
    passive: { en: "Object + may/might + be + V3", ex: "The meeting may be cancelled.", mr: "बैठक रद्द केली जाऊ शकते." },
    lesson: "may-might",
  },
  {
    id: "should", modal: "should / ought to", mr: "सल्ला, योग्य कर्तव्य",
    use: "सल्ला देण्यासाठी.",
    affirmative: { en: "Subject + should + V1", ex: "You should rest.", mr: "तुम्ही विश्रांती घ्यावी." },
    negative: { en: "Subject + should not (shouldn't) + V1", ex: "You should not shout.", mr: "तुम्ही ओरडू नये." },
    question: { en: "Should + subject + V1 ?", ex: "Should I wait?", mr: "मी थांबू का?" },
    passive: { en: "Object + should + be + V3", ex: "Homework should be finished.", mr: "गृहपाठ पूर्ण केला जावा." },
    lesson: "should",
  },
  {
    id: "must", modal: "must / have to", mr: "गरज, सक्ती, मनाई",
    use: "must = ठाम गरज; must not = मनाई; have to = बाहेरची सक्ती.",
    affirmative: { en: "Subject + must + V1 · Subject + have/has to + V1", ex: "I must go now.", mr: "मला आता गेलेच पाहिजे." },
    negative: { en: "Subject + must not + V1 (मनाई) · don't/doesn't have to + V1 (गरज नाही)", ex: "You must not park here.", mr: "इथे गाडी लावू नका." },
    question: { en: "Must + subject + V1 ? · Do/Does + subject + have to + V1 ?", ex: "Do I have to pay?", mr: "मला पैसे द्यावे लागतील का?" },
    passive: { en: "Object + must + be + V3", ex: "Rules must be followed.", mr: "नियम पाळले पाहिजेत." },
    lesson: "must",
  },
  {
    id: "will-would", modal: "will / would", mr: "भविष्य, विनंती, काल्पनिक",
    use: "will = भविष्य/वचन; would = नम्र विनंती, काल्पनिक परिस्थिती.",
    affirmative: { en: "Subject + will/would + V1", ex: "I would like some tea.", mr: "मला थोडा चहा हवा आहे." },
    negative: { en: "Subject + will not / would not + V1", ex: "He would not agree.", mr: "तो सहमत झाला नसता." },
    question: { en: "Will/Would + subject + V1 ?", ex: "Would you like to sit?", mr: "तुम्हाला बसायला आवडेल का?" },
    passive: { en: "Object + will/would + be + V3", ex: "It would be done.", mr: "ते केले जाईल." },
    lesson: "would-like",
  },
  {
    id: "perfect-modals", modal: "modal + have + V3", mr: "भूतकाळाबद्दल अंदाज, खंत",
    use: "should have = करायला हवे होते; might have = कदाचित झाले असेल; must have = नक्कीच झाले असेल.",
    affirmative: { en: "Subject + modal + have + V3", ex: "You should have called me.", mr: "तुम्ही मला फोन करायला हवा होता." },
    negative: { en: "Subject + modal + not + have + V3", ex: "She can't have left.", mr: "ती गेलेली असू शकत नाही." },
    question: { en: "Modal + subject + have + V3 ?", ex: "Could he have forgotten?", mr: "तो विसरला असेल का?" },
    passive: { en: "Object + modal + have + been + V3", ex: "It must have been stolen.", mr: "ते चोरले गेले असावे." },
  },
];

export const passiveSteps: { n: number; en: string; mr: string; ex: string }[] = [
  { n: 1, en: "Take the object of the active sentence and make it the new subject.", mr: "कर्मवाचक वाक्यातील कर्म नवीन कर्ता बनवा.", ex: "Raj wrote the letter → The letter …" },
  { n: 2, en: "Use the right form of be (same tense as the active verb) + V3.", mr: "मूळ काळाप्रमाणे be चे रूप आणि V3 वापरा.", ex: "… was written …" },
  { n: 3, en: "Add by + the old subject, only if it matters.", mr: "गरज असेल तरच by + जुना कर्ता जोडा.", ex: "… by Raj." },
];

export const passiveNotes: { en: string; mr: string }[] = [
  { en: "Use the passive when the doer is unknown or unimportant: “My phone was stolen.”", mr: "करणारा माहीत नसेल किंवा महत्त्वाचा नसेल तेव्हा passive वापरा." },
  { en: "Only verbs with an object can be passive. “She arrived” has no passive.", mr: "कर्म असलेल्या क्रियापदांचेच passive होते." },
  { en: "V3 means the past participle: written, done, taken, finished.", mr: "V3 = क्रियापदाचे तिसरे रूप: written, done, taken, finished." },
  { en: "Pronouns change: I → me, he → him, she → her, we → us, they → them.", mr: "सर्वनामे बदलतात: I → me, he → him, they → them." },
];

// Other sentence patterns: conditionals, reported speech, relative clauses.
export type PatternRow = {
  id: string;
  name: string;
  mr: string;
  use: string;
  forms: { label: string; f: Formula }[];
  note?: string;
  lesson?: string;
};

export const patterns: PatternRow[] = [
  {
    id: "conditionals", name: "Conditionals (if)", mr: "जर … तर",
    use: "अटीवर अवलंबून असलेल्या गोष्टी. If वाक्यात will/would वापरत नाहीत.",
    forms: [
      { label: "ZERO · सामान्य सत्य", f: { en: "If + present simple, present simple", ex: "If you heat ice, it melts.", mr: "बर्फ तापवला तर तो वितळतो." } },
      { label: "FIRST · शक्य भविष्य", f: { en: "If + present simple, will + V1", ex: "If it rains, we will stay home.", mr: "पाऊस पडला तर आम्ही घरी राहू." } },
      { label: "SECOND · काल्पनिक वर्तमान", f: { en: "If + past simple, would + V1", ex: "If I had time, I would learn French.", mr: "माझ्याकडे वेळ असता तर मी फ्रेंच शिकलो असतो." } },
      { label: "THIRD · न घडलेला भूतकाळ", f: { en: "If + past perfect, would have + V3", ex: "If I had known, I would have called.", mr: "मला माहीत असते तर मी फोन केला असता." } },
    ],
    note: "Second conditional मध्ये I/he/she/it सोबत If I were … असे म्हणणे औपचारिक आहे.",
    lesson: "conditionals",
  },
  {
    id: "reported-speech", name: "Reported speech", mr: "अप्रत्यक्ष कथन",
    use: "दुसऱ्याचे बोलणे आपल्या शब्दांत सांगताना काळ एक पाऊल मागे जातो.",
    forms: [
      { label: "STATEMENT · विधान", f: { en: "Subject + said (that) + subject + backshifted verb", ex: "He said that he was tired.", mr: "तो म्हणाला की तो थकला आहे." } },
      { label: "YES/NO QUESTION · होय/नाही प्रश्न", f: { en: "Subject + asked + if/whether + subject + verb", ex: "She asked if I was ready.", mr: "तिने विचारले की मी तयार आहे का." } },
      { label: "WH- QUESTION · प्रश्नवाचक", f: { en: "Subject + asked + wh-word + subject + verb", ex: "He asked where I lived.", mr: "त्याने विचारले की मी कुठे राहतो." } },
      { label: "COMMAND · आज्ञा", f: { en: "Subject + told + person + to + V1", ex: "She told me to wait.", mr: "तिने मला थांबायला सांगितले." } },
    ],
    note: "Backshift: am/is → was · will → would · can → could · do/does → did · did/was → had + V3. today → that day, tomorrow → the next day, here → there. प्रश्नात do/does/did वापरत नाहीत आणि शब्दक्रम विधानासारखा असतो.",
  },
  {
    id: "relative-clauses", name: "Relative clauses", mr: "who / which / that",
    use: "नाम किंवा व्यक्तीबद्दल अधिक माहिती देणारे उपवाक्य.",
    forms: [
      { label: "PERSON · व्यक्ती", f: { en: "Noun + who + verb", ex: "The man who called is my uncle.", mr: "ज्याने फोन केला तो माणूस माझा काका आहे." } },
      { label: "THING · वस्तू", f: { en: "Noun + which/that + verb", ex: "This is the book that I bought.", mr: "हे मी घेतलेले पुस्तक आहे." } },
      { label: "POSSESSION · मालकी", f: { en: "Noun + whose + noun + verb", ex: "She is the girl whose bag was lost.", mr: "ती मुलगी जिची बॅग हरवली." } },
      { label: "PLACE / TIME", f: { en: "Noun + where / when + subject + verb", ex: "This is the town where I was born.", mr: "हे ते गाव आहे जिथे माझा जन्म झाला." } },
    ],
    note: "Who व्यक्तींसाठी, which वस्तूंसाठी, that दोन्हींसाठी. वस्तू कर्म असेल तर that/which सोडता येते: the book I bought.",
  },
];

// "At a glance" rows for each Grammar tab: one example sentence per item with
// its name. Every tab shows the same kind of summary behind a show/hide toggle.
export type GrammarTab = "tenses" | "modals" | "passive" | "patterns";
export type SummaryRow = { en: string; sub: string };
export function grammarSummary(tab: GrammarTab): SummaryRow[] {
  if (tab === "tenses")
    return tenses.map((t) => ({ en: t.affirmative.ex, sub: `${t.name} · ${t.mr}` }));
  if (tab === "modals")
    return modals.map((m) => ({ en: m.affirmative.ex, sub: `${m.modal} · ${m.mr}` }));
  if (tab === "passive")
    return tenses
      .filter((t) => t.passive)
      .map((t) => ({ en: t.passive!.ex, sub: `${t.name} · ${t.affirmative.ex}` }));
  return patterns.flatMap((p) =>
    p.forms.map((x) => ({ en: x.f.ex, sub: `${p.name} · ${x.label}` })),
  );
}
