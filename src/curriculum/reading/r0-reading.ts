import {
  e2m,
  gap,
  lessonKit,
  lis,
  m2e,
  newLesson,
  rolePlay,
  und,
  finish,
  bld,
} from "../author";
import type { Unit, Enrich } from "../types";

export const lessons = [
  newLesson(
    "read-sounds",
    "reading",
    "Letter sounds",
    "अक्षरांचे आवाज ओळखा",
    "इंग्रजी अक्षराचे नाव आणि शब्दातील आवाज वेगळे असतात. उदा. b चे नाव 'बी' आहे, पण bat मध्ये त्याचा आवाज फक्त 'ब्' येतो. आधी हे आवाज शिका: b, d, m, n, p, s, t. आणि स्वर a, e, i, o, u: त्यांचे आवाज शब्दानुसार बदलतात.",
    "letter → sound → word: b → 'ब्' → bat",
    [
      ["b as in bat", "b चा आवाज 'ब्' आहे: bat म्हणजे बॅट."],
      ["m as in man", "m चा आवाज 'म्' आहे: man म्हणजे माणूस."],
      ["s as in sun", "s चा आवाज 'स्' आहे: sun म्हणजे सूर्य."],
      [
        "t as in top",
        "t चा आवाज 'ट्' आणि 'त्' यांच्या मधला असतो: top म्हणजे वरचा भाग.",
      ],
      ["a as in apple", "a चा आवाज 'अ‍ॅ' सारखा असतो: apple म्हणजे सफरचंद."],
    ],
    "तुमच्या आजूबाजूच्या तीन वस्तूंची नावे सांगा आणि त्यांचा पहिला आवाज ओळखा.",
  ),
  newLesson(
    "read-blend",
    "reading",
    "Blending sounds into words",
    "आवाज जोडून शब्द वाचा",
    "शब्द वाचताना आवाज एकेक करून जोडा: c-a-t → cat. आधी आवाज वेगळे म्हणा, मग जलद जोडा. छोट्या शब्दांपासून सुरुवात करा: cat, sun, pen, bus, big, hot. स्वर लहान आवाजात येतो: cat मधील a म्हणजे 'ॲ'.",
    "sound + sound + sound → word",
    [
      ["c – a – t → cat", "c, a, t जोडल्यावर cat (मांजर)."],
      ["s – u – n → sun", "s, u, n जोडल्यावर sun (सूर्य)."],
      ["p – e – n → pen", "p, e, n जोडल्यावर pen (पेन)."],
      ["b – u – s → bus", "b, u, s जोडल्यावर bus (बस)."],
    ],
    "घरातील पाच लहान वस्तूंची नावे आवाज वेगळे करून आणि मग जोडून म्हणा.",
  ),
  newLesson(
    "read-words",
    "reading",
    "Reading short sentences",
    "छोटी वाक्ये वाचा",
    "वाक्य वाचताना शब्दांमध्ये थांबा आणि प्रत्येक शब्द ओळखा. नेहमी येणारे लहान शब्द ओळखायला शिका: I, am, a, the, is, my, in, on. पूर्णविराम (.) वाक्य संपल्याचे दाखवतो. प्रश्नचिन्ह (?) प्रश्न दर्शवते.",
    "word + word + word + . or ?",
    [
      ["I am a boy.", "मी मुलगा आहे."],
      ["The sun is hot.", "सूर्य गरम आहे."],
      ["My bag is on the bus.", "माझी पिशवी बसमध्ये आहे."],
      ["Is the pen big?", "पेन मोठे आहे का?"],
    ],
    "वरील चार वाक्ये हळू वाचा, मग डोळ्यांसमोर न पाहता आठवून बोला.",
  ),
];

export const kits: Record<string, Enrich> = {
  "read-sounds": lessonKit(
    "read-sounds",
    [
      "I can hear and say the first sound of simple words.",
      "मी साध्या शब्दांचा पहिला आवाज ऐकून म्हणू शकतो/शकते.",
    ],
    [
      [
        "A",
        "What is the first sound in 'sun'?",
        "'sun' मधील पहिला आवाज कोणता?",
      ],
      ["B", "The first sound is s.", "पहिला आवाज s आहे."],
      ["A", "Good. And in 'bat'?", "छान. आणि 'bat' मध्ये?"],
      ["B", "It is b.", "तो b आहे."],
    ],
    ["letter → sound → word", "What is the first sound in …?"],
    [
      lis(
        "bat",
        "ऐका. शब्द कोणत्या आवाजाने सुरू होतो?",
        "b",
        ["d", "p"],
        "bat चा पहिला आवाज b आहे: 'ब्'.",
      ),
      lis(
        "sun",
        "ऐका. शब्द कोणत्या आवाजाने सुरू होतो?",
        "s",
        ["z", "t"],
        "sun चा पहिला आवाज s आहे: 'स्'.",
      ),
      und(
        "'man' शब्दाचा पहिला आवाज कोणता?",
        "m",
        ["n", "b"],
        "man मध्ये m चा आवाज 'म्' आहे.",
      ),
      e2m("sun", "सूर्य", ["चंद्र", "पाणी"], "sun म्हणजे सूर्य."),
      m2e(
        "माणूस",
        "man",
        ["map", "sun"],
        "माणूस म्हणजे man. 'map' म्हणजे नकाशा.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["आवाज ओळखा", "Sound game"],
      "तुम्ही आणि तुमचा मित्र आवाजाचा खेळ खेळत आहात.",
      "तुम्ही: खेळाडू",
      [
        [
          "o",
          "What is the first sound in 'sun'?",
          "'sun' मधील पहिला आवाज कोणता?",
        ],
        [
          "y",
          "पहिला आवाज सांगा.",
          "The first sound is s.",
          "The first sound is…",
        ],
        [
          "o",
          "Good. Now say a word with b.",
          "छान. आता b ने सुरू होणारा शब्द सांगा.",
        ],
        ["y", "b ने सुरू होणारा एक शब्द सांगा.", "Bus.", "B…"],
      ],
    ),
  ),
  "read-blend": lessonKit(
    "read-blend",
    [
      "I can blend simple sounds to read short words.",
      "मी साधे आवाज जोडून लहान शब्द वाचू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Can you read this word? c, a, t.",
        "हा शब्द वाचता येतो का? c, a, t.",
      ],
      ["B", "Yes. It is cat.", "हो. तो cat आहे."],
      ["A", "Good. What about s, u, n?", "छान. s, u, n चे काय?"],
      ["B", "That is sun.", "तो sun आहे."],
    ],
    ["sound + sound + sound → word"],
    [
      lis(
        "cat",
        "ऐका. कोणता शब्द ऐकू आला?",
        "cat",
        ["cut", "cot"],
        "c-a-t जोडल्यावर cat. a चा आवाज 'ॲ' आहे.",
      ),
      und(
        "s – u – n जोडल्यावर कोणता शब्द बनतो?",
        "sun",
        ["sin", "sat"],
        "s, u, n जोडल्यावर sun बनतो.",
      ),
      und(
        "p – e – n जोडल्यावर कोणता शब्द बनतो?",
        "pen",
        ["pan", "pin"],
        "p, e, n जोडल्यावर pen बनतो.",
      ),
      e2m("bus", "बस", ["बाग", "पेटी"], "bus म्हणजे बस."),
      m2e("पेन", "pen", ["pan", "ten"], "पेन म्हणजे pen. 'pan' म्हणजे तवा."),
    ],
    rolePlay(
      "",
      "beginner",
      ["शब्द वाचा", "Read a word"],
      "तुमचा मित्र तुम्हाला फलकावरचा शब्द वाचायला सांगतो.",
      "तुम्ही: विद्यार्थी",
      [
        [
          "o",
          "Can you read this word? c, a, t.",
          "हा शब्द वाचता येतो का? c, a, t.",
        ],
        ["y", "शब्द वाचून सांगा.", "Yes. It is cat.", "Yes. It is…"],
        ["o", "Good. Now s, u, n.", "छान. आता s, u, n."],
        ["y", "दुसरा शब्द वाचा.", "That is sun.", "That is…"],
      ],
    ),
  ),
  "read-words": lessonKit(
    "read-words",
    [
      "I can read and say a short English sentence.",
      "मी इंग्रजीतील एक छोटे वाक्य वाचून म्हणू शकतो/शकते.",
    ],
    [
      ["A", "Please read this sentence.", "कृपया हे वाक्य वाचा."],
      ["B", "I am a boy.", "मी मुलगा आहे."],
      ["A", "Very good. Now this one.", "खूप छान. आता हे."],
      ["B", "The sun is hot.", "सूर्य गरम आहे."],
    ],
    ["word + word + word + .", "Is + subject + … ?"],
    [
      lis(
        "The sun is hot.",
        "ऐका. काय गरम आहे?",
        "सूर्य",
        ["चहा", "पाणी"],
        "The sun is hot म्हणजे सूर्य गरम आहे.",
      ),
      e2m(
        "My bag is on the bus.",
        "माझी पिशवी बसमध्ये आहे.",
        ["माझी बस पिशवीत आहे.", "माझी पिशवी घरी आहे."],
        "bag म्हणजे पिशवी आणि on the bus म्हणजे बसमध्ये.",
      ),
      m2e(
        "पेन मोठे आहे का?",
        "Is the pen big?",
        ["The pen is big.", "Pen is the big?"],
        "प्रश्नात Is सुरुवातीला येते आणि शेवटी ? असतो.",
      ),
      bld(
        "मी मुलगा आहे.",
        "I am a boy.",
        ["is"],
        "I नंतर am येते. मुलगा म्हणजे a boy.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["वाक्य वाचा", "Read a sentence"],
      "शिक्षक तुम्हाला एक वाक्य वाचायला सांगतात.",
      "तुम्ही: विद्यार्थी",
      [
        [
          "o",
          "Please read this sentence: I am a boy.",
          "कृपया हे वाक्य वाचा: I am a boy.",
        ],
        ["y", "वाक्य मोठ्याने वाचा.", "I am a boy.", "I am…"],
        [
          "o",
          "Very good. Now: The sun is hot.",
          "खूप छान. आता: The sun is hot.",
        ],
        ["y", "हे वाक्य वाचा.", "The sun is hot.", "The sun…"],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "r0",
  path: "reading",
  optional: true,
  title: "इंग्रजी वाचायला सुरुवात (ऐच्छिक)",
  en: "Reading foundations",
  outcome: [
    "I can read simple English words and short sentences.",
    "मी साधे इंग्रजी शब्द आणि छोटी वाक्ये वाचू शकतो/शकते.",
  ],
  lessons: ["read-sounds", "read-blend", "read-words"],
  checkpoint: {
    scenario: [
      "You see a sign at a bus stop: 'The bus is big.'",
      "बस स्टॉपवर तुम्हाला फलक दिसतो: 'The bus is big.'",
    ],
    ex: finish("r0", "cp", [
      lis(
        "bus",
        "ऐका. शब्द कोणत्या आवाजाने सुरू होतो?",
        "b",
        ["s", "p"],
        "bus चा पहिला आवाज b आहे.",
      ),
      und(
        "फलकावर 'The bus is big.' लिहिले आहे. बसबद्दल काय सांगितले आहे?",
        "बस मोठी आहे",
        ["बस लहान आहे", "बस आली नाही"],
        "big म्हणजे मोठा.",
      ),
      bld("बस मोठी आहे.", "The bus is big.", ["a"], "The bus नंतर is आणि big."),
      e2m(
        "The pen is big.",
        "पेन मोठे आहे.",
        ["पेन लहान आहे.", "पेन नवे आहे."],
        "big म्हणजे मोठा. The pen is big म्हणजे पेन मोठे आहे.",
      ),
    ]),
    speak:
      "फलकावरचे वाक्य मोठ्याने वाचा आणि त्यातील एक शब्दाचे आवाज वेगळे करून म्हणा.",
  },
};
