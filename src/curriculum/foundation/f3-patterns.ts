// Level 0 · Unit 3: digraphs, blends, silent letters and common spelling patterns.
import {
  bld,
  e2m,
  finish,
  gap,
  lessonKit,
  lis,
  m2e,
  newLesson,
  rolePlay,
  und,
} from "../author";
import type { Enrich, Unit } from "../types";

export const lessons = [
  newLesson(
    "f-digraphs",
    "phonics",
    "Digraphs: sh, ch, th, wh, ck",
    "दोन अक्षरे, एक आवाज",
    "काही वेळा दोन अक्षरे मिळून एकच आवाज देतात. sh = 'श्' (ship). ch = बहुतेक शब्दांत 'च्' (chair); school मध्ये ch चा आवाज 'क्' असतो. ck = 'क्' (duck). th चा आवाज मराठीत नाही: जीभेचे टोक वरच्या आणि खालच्या दातांमध्ये हलके ठेवून हवा सोडा (thin, this); तो 'त्' किंवा 'द्' नाही. wh चा आवाज बहुतेक शब्दांत w सारखा असतो (when): ओठ गोल करा आणि वरचे दात खालच्या ओठाला लावू नका; तो v चा आवाज नाही. who मध्ये मात्र 'ह्' असा आवाज येतो.",
    "sh · ch · th · wh · ck = one sound",
    [
      ["sh — ship", "sh चा आवाज 'श्' आहे. ship म्हणजे जहाज."],
      ["ch — chair", "ch चा आवाज 'च्' सारखा आहे. chair म्हणजे खुर्ची."],
      ["th — thin, this", "जीभ दातांमध्ये हलकी ठेवा; 'त्' किंवा 'द्' म्हणू नका."],
      ["wh — when", "wh चा आवाज w सारखा आहे: ओठ गोल करा, दात लावू नका. when म्हणजे केव्हा."],
      ["ck — duck", "ck चा आवाज एकच 'क्' आहे. duck म्हणजे बदक."],
    ],
    "ship, chair, duck हे शब्द म्हणा आणि th असलेले दोन शब्द जीभ दातांमध्ये ठेवून म्हणा.",
  ),
  newLesson(
    "f-blends",
    "phonics",
    "Consonant blends",
    "जोडलेले व्यंजन आवाज",
    "काही शब्दांत दोन व्यंजने एकत्र येतात आणि दोन्हींचा आवाज ऐकू येतो: bl – blue, st – star, tr – tree, fr – frog, sp – spoon, nd – hand. शब्दाच्या सुरुवातीला स्वर जोडू नका: star ला 'इस्टार', spoon ला 'इस्पून' म्हणू नका. दोन्ही आवाज एकामागोमाग, मधे स्वर न घालता म्हणा.",
    "consonant + consonant : st – star, tr – tree",
    [
      ["bl — blue", "bl: दोन्ही आवाज जोडून म्हणा. blue म्हणजे निळा."],
      ["st — star", "'स्टार' म्हणा, 'इस्टार' नाही. star म्हणजे तारा."],
      ["tr — tree", "tr: दोन्ही आवाज एकत्र. tree म्हणजे झाड."],
      ["fr — frog", "fr: frog म्हणजे बेडूक."],
      ["sp — spoon", "'स्पून' म्हणा, 'इस्पून' नाही. spoon म्हणजे चमचा."],
    ],
    "star, spoon, tree, frog हे शब्द सुरुवातीला स्वर न जोडता म्हणा.",
  ),
  newLesson(
    "f-silent",
    "phonics",
    "Silent letters",
    "न बोलली जाणारी अक्षरे",
    "काही शब्दांत एखादे अक्षर लिहिलेले असते पण बोलले जात नाही. kn: k बोलला जात नाही (knife, knee, know). wr: w बोलला जात नाही (write). mb: शेवटचा b बोलला जात नाही (lamb, climb). igh मध्ये gh बोलला जात नाही (night, light); laugh सारख्या काही शब्दांत gh चा आवाज 'फ्' असतो. hour मध्ये h बोलला जात नाही. असे शब्द एकेक करून पाठ करावे लागतात.",
    "kn → n · wr → r · mb → m · igh → i",
    [
      ["knife", "k silent आहे; 'नाइफ' असे म्हणतात. knife म्हणजे सुरी."],
      ["write", "w silent आहे; 'राइट' असे म्हणतात. write म्हणजे लिहिणे."],
      ["lamb", "शेवटचा b silent आहे; 'लॅम'. lamb म्हणजे कोकरू."],
      ["night", "gh silent आहे; 'नाइट'. night म्हणजे रात्र."],
      ["hour", "h silent आहे; 'आउअर'. hour म्हणजे तास."],
    ],
    "knife, write, lamb हे शब्द लिहा आणि न बोलले जाणारे अक्षर गोल करा.",
  ),
  newLesson(
    "f-spelling",
    "phonics",
    "Common spelling patterns",
    "नेहमीचे स्पेलिंग पॅटर्न",
    "एकच आवाज वेगवेगळ्या अक्षरसमूहांनी लिहिला जातो. ee आणि ea बहुतेक वेळा लांब 'ई' देतात: see, tree, tea, eat. ai आणि ay 'ए' देतात: rain, day. oo दोन आवाज देतो: moon ('ऊ') आणि book (लहान 'उ'). -ing क्रियापदाच्या शेवटी येते: going, eating. नमुने ओळखा; शब्द सोपे वाटू लागतात.",
    "ee/ea = ई · ai/ay = ए · oo = ऊ / उ · -ing",
    [
      ["see, tree", "ee चा आवाज लांब 'ई' आहे. see म्हणजे पाहणे; tree म्हणजे झाड."],
      ["tea, eat", "ea चाही आवाज लांब 'ई' आहे. tea म्हणजे चहा; eat म्हणजे खाणे."],
      ["rain, day", "ai आणि ay चा आवाज 'ए' आहे. rain म्हणजे पाऊस; day म्हणजे दिवस."],
      ["moon, book", "moon मध्ये लांब 'ऊ'; book मध्ये लहान 'उ'."],
      ["going, eating", "-ing क्रिया चालू आहे असे दाखवते: जात आहे, खात आहे."],
    ],
    "tree, tea, rain, moon हे चार शब्द लिहा आणि प्रत्येकातील अक्षरसमूहाखाली रेघ ओढा.",
  ),
];

export const kits: Record<string, Enrich> = {
  "f-digraphs": lessonKit(
    "f-digraphs",
    [
      "I can read and say words with sh, ch, th, wh and ck.",
      "मी sh, ch, th, wh आणि ck असलेले शब्द वाचू आणि म्हणू शकतो/शकते.",
    ],
    [
      ["A", "What sound is 'sh'?", "'sh' चा आवाज कोणता?"],
      ["B", "It is the sound in ship.", "तो ship मधला आवाज आहे."],
      ["A", "And what about 'ch'?", "आणि 'ch' चा?"],
      ["B", "It is the sound in chair.", "तो chair मधला आवाज आहे."],
    ],
    ["It is the sound in …"],
    [
      lis(
        "ship",
        "ऐका. कोणता शब्द ऐकला?",
        "ship",
        ["sip", "chip"],
        "ship मध्ये sh चा एकच आवाज 'श्' आहे.",
      ),
      und(
        "ch चा आवाज कोणत्या शब्दात आहे?",
        "chair",
        ["ship", "duck"],
        "chair मध्ये ch चा आवाज 'च्' सारखा आहे.",
      ),
      und(
        "duck मधील ck चा आवाज कोणता?",
        "क्",
        ["च्", "श्"],
        "ck चा आवाज एकच 'क्' आहे.",
      ),
      m2e(
        "खुर्ची",
        "chair",
        ["share", "check"],
        "खुर्ची म्हणजे chair. share म्हणजे वाटून घेणे.",
      ),
      gap(
        "The ___ is on the water. (जहाज पाण्यावर आहे.)",
        "ship",
        ["chip", "shop"],
        "जहाज म्हणजे ship. shop म्हणजे दुकान.",
      ),
    ],
    rolePlay(
      "",
      "foundation",
      ["दोन अक्षरे, एक आवाज", "Two letters, one sound"],
      "शिक्षक तुम्हाला शब्द म्हणायला सांगतात.",
      "तुम्ही: विद्यार्थी",
      [
        ["o", "Please say this word: chair.", "कृपया हा शब्द म्हणा: chair."],
        ["y", "शब्द म्हणा.", "Chair.", "Chair…"],
        ["o", "Good. Now say: ship.", "छान. आता म्हणा: ship."],
        ["y", "शब्द म्हणा.", "Ship.", "Ship…"],
      ],
    ),
  ),
  "f-blends": lessonKit(
    "f-blends",
    [
      "I can say words that begin with two consonants together.",
      "मी दोन व्यंजनांनी सुरू होणारे शब्द स्पष्ट म्हणू शकतो/शकते.",
    ],
    [
      ["A", "Is it 'istar' or 'star'?", "'istar' की 'star'?"],
      ["B", "It is 'star'. There is no extra vowel.", "तो 'star' आहे. जादा स्वर नाही."],
      ["A", "Please say 'spoon'.", "कृपया 'spoon' म्हणा."],
      ["B", "Spoon.", "Spoon. मधे स्वर नाही."],
    ],
    ["No extra vowel: star, spoon"],
    [
      lis(
        "star",
        "ऐका. कोणता शब्द ऐकला?",
        "star",
        ["tar", "scar"],
        "star मध्ये s आणि t दोन्ही आवाज ऐकू येतात.",
      ),
      und(
        "frog शब्द कोणत्या जोडाक्षर आवाजाने सुरू होतो?",
        "fr",
        ["fl", "gr"],
        "frog मध्ये सुरुवातीला f आणि r एकत्र येतात.",
      ),
      und(
        "spoon च्या सुरुवातीचे जोडलेले आवाज कोणते?",
        "sp",
        ["st", "sk"],
        "spoon मध्ये सुरुवातीला s आणि p एकत्र येतात.",
      ),
      m2e(
        "झाड",
        "tree",
        ["three", "free"],
        "झाड म्हणजे tree. three म्हणजे तीन.",
      ),
      e2m("hand", "हात", ["पाय", "डोके"], "hand म्हणजे हात."),
    ],
    rolePlay(
      "",
      "foundation",
      ["स्पष्ट उच्चार", "Clear sounds"],
      "शिक्षक तुम्हाला दोन शब्द म्हणायला सांगतात.",
      "तुम्ही: विद्यार्थी",
      [
        ["o", "Please say: star.", "कृपया म्हणा: star."],
        ["y", "शब्द म्हणा.", "Star.", "Star…"],
        ["o", "Good. Now say: spoon.", "छान. आता म्हणा: spoon."],
        ["y", "शब्द म्हणा.", "Spoon.", "Spoon…"],
      ],
    ),
  ),
  "f-silent": lessonKit(
    "f-silent",
    [
      "I can spot letters that are written but not said.",
      "मी लिहिलेली पण न बोलली जाणारी अक्षरे ओळखू शकतो/शकते.",
    ],
    [
      ["A", "Do we say the k in 'knife'?", "'knife' मधला k आपण बोलतो का?"],
      ["B", "No. The k is silent.", "नाही. k silent आहे."],
      ["A", "How do we start the word?", "मग शब्द कसा सुरू करतो?"],
      ["B", "We start with the n sound.", "आपण n च्या आवाजाने सुरू करतो."],
    ],
    ["The … is silent."],
    [
      lis(
        "knee",
        "ऐका. कोणता शब्द ऐकला?",
        "knee",
        ["key", "tea"],
        "knee चा आवाज 'नी' आहे; k बोलला जात नाही.",
      ),
      und(
        "knife मध्ये कोणते अक्षर बोलले जात नाही?",
        "k",
        ["n", "f"],
        "knife मध्ये k silent आहे; शब्द 'नाइफ' असा म्हणतात.",
      ),
      und(
        "write मध्ये कोणते अक्षर बोलले जात नाही?",
        "w",
        ["r", "t"],
        "write मध्ये w silent आहे; शब्द 'राइट' असा म्हणतात.",
      ),
      e2m("night", "रात्र", ["दिवस", "संध्याकाळ"], "night म्हणजे रात्र."),
      m2e(
        "सुरी",
        "knife",
        ["wife", "life"],
        "सुरी म्हणजे knife. wife म्हणजे पत्नी.",
      ),
    ],
    rolePlay(
      "",
      "foundation",
      ["न बोललेले अक्षर", "The silent letter"],
      "शिक्षक तुम्हाला silent letter विचारतात.",
      "तुम्ही: विद्यार्थी",
      [
        ["o", "Is the k silent in 'knee'?", "'knee' मध्ये k silent आहे का?"],
        ["y", "उत्तर सांगा.", "Yes, the k is silent.", "Yes, the…"],
        ["o", "Good. Now say 'knee'.", "छान. आता 'knee' म्हणा."],
        ["y", "शब्द म्हणा.", "Knee.", "Knee…"],
      ],
    ),
  ),
  "f-spelling": lessonKit(
    "f-spelling",
    [
      "I can use common spelling patterns to read and spell words.",
      "मी नेहमीचे स्पेलिंग पॅटर्न वापरून शब्द वाचू आणि लिहू शकतो/शकते.",
    ],
    [
      ["A", "How do you spell 'tree'?", "'tree' चे स्पेलिंग काय?"],
      ["B", "T, R, E, E.", "T, R, E, E. असे स्पेलिंग आहे."],
      ["A", "What sound does 'ee' make?", "'ee' कोणता आवाज देतो?"],
      ["B", "It makes the long e sound.", "तो लांब 'ई' चा आवाज देतो."],
    ],
    ["How do you spell …?", "ee · ea · ai · ay · oo"],
    [
      lis(
        "rain",
        "ऐका. कोणता शब्द ऐकला?",
        "rain",
        ["ran", "run"],
        "rain मध्ये ai चा आवाज 'ए' आहे. rain म्हणजे पाऊस.",
      ),
      und(
        "tea मध्ये ea चा आवाज कोणता?",
        "ई",
        ["ए", "आ"],
        "tea मध्ये ea चा आवाज लांब 'ई' आहे.",
      ),
      gap(
        "I ___ a tree. (मी झाड पाहतो.)",
        "see",
        ["say", "saw"],
        "पाहणे = see. say म्हणजे म्हणणे.",
      ),
      und(
        "day मधील शेवटचा 'ए' आवाज कोणत्या अक्षरांनी लिहिला आहे?",
        "ay",
        ["ee", "oo"],
        "day मध्ये 'ए' आवाज ay ने लिहिला आहे.",
      ),
      m2e(
        "पाऊस",
        "rain",
        ["ring", "rail"],
        "पाऊस म्हणजे rain. rail म्हणजे रेल्वेचा रूळ.",
      ),
    ],
    rolePlay(
      "",
      "foundation",
      ["स्पेलिंग सांगा", "Spell it"],
      "शिक्षक तुम्हाला स्पेलिंग विचारतात.",
      "तुम्ही: विद्यार्थी",
      [
        ["o", "How do you spell 'see'?", "'see' चे स्पेलिंग काय?"],
        ["y", "स्पेलिंग सांगा.", "S, E, E.", "S, E…"],
        ["o", "Good. How do you spell 'day'?", "छान. 'day' चे स्पेलिंग काय?"],
        ["y", "स्पेलिंग सांगा.", "D, A, Y.", "D, A…"],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "f3",
  path: "foundation",
  title: "जोडाक्षरे आणि स्पेलिंग",
  en: "Digraphs, blends and spelling patterns",
  outcome: [
    "I can read words with digraphs, blends, silent letters and common spelling patterns.",
    "मी जोडाक्षर आवाज, silent letters आणि नेहमीचे स्पेलिंग पॅटर्न असलेले शब्द वाचू शकतो/शकते.",
  ],
  lessons: ["f-digraphs", "f-blends", "f-silent", "f-spelling"],
  checkpoint: {
    scenario: [
      "You are reading a short story and meet new words.",
      "तुम्ही एक छोटी गोष्ट वाचत आहात आणि नवे शब्द भेटतात.",
    ],
    ex: finish("f3", "cp", [
      lis(
        "fish",
        "ऐका. शब्दाच्या शेवटी कोणता आवाज येतो?",
        "sh",
        ["ch", "th"],
        "fish च्या शेवटी sh चा आवाज 'श्' आहे.",
      ),
      und(
        "tree मध्ये सुरुवातीला कोणता जोडाक्षर आवाज आहे?",
        "tr",
        ["th", "st"],
        "tree मध्ये t आणि r एकत्र येतात.",
      ),
      und(
        "lamb मध्ये कोणते अक्षर बोलले जात नाही?",
        "b",
        ["l", "m"],
        "lamb मध्ये शेवटचा b silent आहे; शब्द 'लॅम' असा म्हणतात.",
      ),
      gap(
        "The ___ is in the sky. (तारा आकाशात आहे.)",
        "star",
        ["tar", "stair"],
        "तारा म्हणजे star. stair म्हणजे पायरी.",
      ),
      bld(
        "मी पाऊस पाहतो.",
        "I see the rain.",
        ["sea"],
        "see म्हणजे पाहणे आणि rain म्हणजे पाऊस. sea म्हणजे समुद्र.",
      ),
    ]),
    speak:
      "knife, ship, star हे शब्द स्पष्ट म्हणा आणि प्रत्येकातील खास आवाज किंवा silent letter सांगा.",
  },
};
