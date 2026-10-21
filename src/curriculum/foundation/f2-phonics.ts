// Level 0 · Unit 2: phonics. Short vowels, blending and segmenting CVC words,
// and long vowels with a silent final e. Marathi sound guides are approximate:
// English vowel sounds do not match any single Marathi vowel exactly.
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
    "f-short-vowels",
    "phonics",
    "Short vowel sounds",
    "लहान स्वरांचे आवाज",
    "प्रत्येक स्वराचा एक लहान आवाज असतो. a – cat ('ॲ' सारखा), e – bed (लहान 'ए'), i – pig (लहान 'इ'), o – dog ('ऑ' सारखा), u – cup ('अ' सारखा, 'उ' नाही). मराठीत हे आवाज अगदी तसेच नसतात, म्हणून शब्द ऐकून नक्कल करा. प्रत्येक स्वराला एक ओळखीचा शब्द लक्षात ठेवा.",
    "a–cat · e–bed · i–pig · o–dog · u–cup",
    [
      ["a — cat", "cat मधील a चा आवाज 'ॲ' सारखा आहे. cat म्हणजे मांजर."],
      ["e — bed", "bed मधील e चा आवाज लहान 'ए' आहे. bed म्हणजे पलंग."],
      ["i — pig", "pig मधील i चा आवाज लहान 'इ' आहे. pig म्हणजे डुक्कर."],
      ["o — dog", "dog मधील o चा आवाज 'ऑ' सारखा आहे. dog म्हणजे कुत्रा."],
      ["u — cup", "cup मधील u चा आवाज 'अ' सारखा आहे. cup म्हणजे कप."],
    ],
    "cat, bed, pig, dog, cup हे शब्द ऐका आणि प्रत्येकातील स्वराचा आवाज वेगळा म्हणा.",
  ),
  newLesson(
    "f-cvc",
    "phonics",
    "Blending and segmenting CVC words",
    "आवाज जोडा आणि वेगळे करा",
    "CVC म्हणजे व्यंजन – स्वर – व्यंजन: c-a-t, d-o-g, p-i-g. वाचताना आवाज एकेक म्हणा आणि मग जोडा (blending): s – u – n → sun. लिहिताना शब्द आवाजांत वेगळा करा (segmenting): sit → s – i – t. या CVC शब्दांत प्रत्येक अक्षराचा एक आवाज असतो, म्हणून तीन अक्षरे आणि तीन आवाज. (sh, ch सारख्या शब्दांत मात्र दोन अक्षरे मिळून एकच आवाज येतो.)",
    "c – v – c : b – e – d → bed",
    [
      ["c – a – t → cat", "तीन आवाज जोडले की cat (मांजर) बनतो."],
      ["d – o – g → dog", "तीन आवाज जोडले की dog (कुत्रा) बनतो."],
      ["p – i – g → pig", "तीन आवाज जोडले की pig (डुक्कर) बनतो."],
      ["b – e – d → bed", "तीन आवाज जोडले की bed (पलंग) बनतो."],
      ["sit → s – i – t", "sit शब्दाचे तीन आवाज: s, i, t."],
    ],
    "map, top, hen या शब्दांचे आवाज वेगळे करा आणि मग जोडून म्हणा.",
  ),
  newLesson(
    "f-magic-e",
    "phonics",
    "Long vowels and the silent e",
    "लांब स्वर आणि शेवटचा e",
    "बहुतेक शब्दांत, शेवटी न बोलला जाणारा e असेल तर आधीचा स्वर स्वतःचे नाव म्हणतो (लांब आवाज). अपवाद आहेत: have, give, come, some हे या नियमाप्रमाणे म्हटले जात नाहीत. cap → cape (a = 'ए'), kit → kite (i = 'आय'), hop → hope (o = 'ओ'), tub → tube (u = 'यू'). शेवटचा e बोलला जात नाही, पण तो स्वराचा आवाज बदलतो.",
    "CVC + e → long vowel : kit → kite",
    [
      ["cap → cape", "cap म्हणजे टोपी; cape म्हणजे झगा. e मुळे a 'ए' म्हणतो."],
      ["kit → kite", "kit म्हणजे साहित्याचा संच; kite म्हणजे पतंग. i 'आय' म्हणतो."],
      ["hop → hope", "hop म्हणजे उडी मारणे; hope म्हणजे आशा. o 'ओ' म्हणतो."],
      ["tub → tube", "tub म्हणजे टब; tube म्हणजे नळी. u 'यू' म्हणतो."],
      ["not → note", "not म्हणजे नाही; note म्हणजे टिपण. o 'ओ' म्हणतो."],
    ],
    "kit/kite आणि hop/hope ही जोडी मोठ्याने म्हणा आणि आवाज कसा बदलतो ते ऐका.",
  ),
];

export const kits: Record<string, Enrich> = {
  "f-short-vowels": lessonKit(
    "f-short-vowels",
    [
      "I can hear and say the five short vowel sounds.",
      "मी पाच लहान स्वरांचे आवाज ऐकून म्हणू शकतो/शकते.",
    ],
    [
      ["A", "Say this word: cat.", "हा शब्द म्हणा: cat."],
      ["B", "Cat. The vowel is a.", "Cat. स्वर a आहे."],
      ["A", "Now say: bed.", "आता म्हणा: bed."],
      ["B", "Bed. The vowel is e.", "Bed. स्वर e आहे."],
    ],
    ["The vowel is …", "a–cat · e–bed · i–pig · o–dog · u–cup"],
    [
      lis(
        "bed",
        "ऐका. कोणता शब्द ऐकला?",
        "bed",
        ["bad", "bud"],
        "bed मधील e चा आवाज लहान 'ए' आहे. bad मध्ये a आणि bud मध्ये u आहे.",
      ),
      und(
        "pig शब्दात कोणता स्वर ऐकू येतो?",
        "i",
        ["a", "o"],
        "pig मधील i चा आवाज लहान 'इ' आहे.",
      ),
      und(
        "cup मधील u चा आवाज कोणत्या सारखा आहे?",
        "अ",
        ["उ", "ऊ"],
        "cup मधील u चा आवाज 'अ' सारखा असतो, 'उ' सारखा नाही.",
      ),
      m2e(
        "कुत्रा",
        "dog",
        ["dig", "dug"],
        "कुत्रा म्हणजे dog. dig म्हणजे खणणे.",
      ),
      e2m("bed", "पलंग", ["खुर्ची", "टेबल"], "bed म्हणजे पलंग."),
    ],
    rolePlay(
      "",
      "foundation",
      ["स्वराचा आवाज", "Short vowel"],
      "शिक्षक तुम्हाला एक शब्द म्हणायला सांगतात.",
      "तुम्ही: विद्यार्थी",
      [
        ["o", "Please say this word: pig.", "कृपया हा शब्द म्हणा: pig."],
        ["y", "शब्द म्हणा.", "Pig.", "Pig…"],
        ["o", "Which vowel do you hear?", "तुम्हाला कोणता स्वर ऐकू येतो?"],
        ["y", "स्वर सांगा.", "I hear i.", "I hear…"],
      ],
    ),
  ),
  "f-cvc": lessonKit(
    "f-cvc",
    [
      "I can blend and split the sounds of three-sound words.",
      "मी तीन आवाजांचे शब्द जोडू आणि वेगळे करू शकतो/शकते.",
    ],
    [
      ["A", "Can you read this word? s – u – n.", "हा शब्द वाचता येतो का? s – u – n."],
      ["B", "Yes. Sun.", "हो. Sun."],
      ["A", "Now tell me the sounds in 'sit'.", "आता 'sit' मधले आवाज सांगा."],
      ["B", "S – i – t.", "S – i – t. हे तीन आवाज आहेत."],
    ],
    ["c – v – c : b – e – d → bed"],
    [
      lis(
        "sit",
        "ऐका. शब्दात कोणते आवाज आहेत?",
        "s – i – t",
        ["s – a – t", "s – o – t"],
        "sit मध्ये s, i, t असे तीन आवाज आहेत.",
      ),
      und(
        "d – o – g जोडल्यावर कोणता शब्द बनतो?",
        "dog",
        ["dig", "dug"],
        "d, o, g जोडल्यावर dog बनतो.",
      ),
      und(
        "hat शब्दात किती आवाज आहेत?",
        "3",
        ["2", "4"],
        "h – a – t: तीन आवाज आहेत.",
      ),
      bld(
        "ही टोपी आहे.",
        "This is a hat.",
        ["hot"],
        "hat म्हणजे टोपी. This is a … असे वाक्य बनवतात.",
      ),
      e2m("pot", "भांडे", ["पेन", "बाटली"], "pot म्हणजे भांडे."),
    ],
    rolePlay(
      "",
      "foundation",
      ["आवाज जोडा", "Blend the sounds"],
      "शिक्षक तुम्हाला आवाज वाचायला सांगतात.",
      "तुम्ही: विद्यार्थी",
      [
        [
          "o",
          "Let us read a word. m – a – p.",
          "चला, एक शब्द वाचूया. m – a – p.",
        ],
        ["y", "आवाज जोडून शब्द म्हणा.", "Map.", "Map…"],
        [
          "o",
          "Good. Now say the sounds in 'top'.",
          "छान. आता 'top' मधले आवाज सांगा.",
        ],
        ["y", "आवाज वेगळे करा.", "T – o – p.", "T…"],
      ],
    ),
  ),
  "f-magic-e": lessonKit(
    "f-magic-e",
    [
      "I can read words with a silent e, like kite and hope.",
      "मी kite आणि hope सारखे शेवटी e असलेले शब्द वाचू शकतो/शकते.",
    ],
    [
      ["A", "What is the difference between 'hop' and 'hope'?", "'hop' आणि 'hope' मध्ये काय फरक आहे?"],
      ["B", "Hope has a silent e at the end.", "hope च्या शेवटी न बोलला जाणारा e आहे."],
      ["A", "Does the o sound change?", "o चा आवाज बदलतो का?"],
      ["B", "Yes, the o says its name.", "हो, o स्वतःचे नाव म्हणतो."],
    ],
    ["CVC + e → long vowel : kit → kite"],
    [
      lis(
        "kite",
        "ऐका. कोणता शब्द ऐकला?",
        "kite",
        ["kit", "kid"],
        "kite मध्ये i स्वतःचे नाव 'आय' म्हणतो. kit मध्ये लहान 'इ' आहे.",
      ),
      und(
        "cap च्या शेवटी e लावल्यास कोणता शब्द बनतो?",
        "cape",
        ["cop", "cup"],
        "cap + e = cape. a चा आवाज 'ए' होतो.",
      ),
      und(
        "hope मधील शेवटचा e काय करतो?",
        "तो बोलला जात नाही, पण o चा आवाज लांब करतो",
        ["तो 'ई' असा बोलला जातो", "तो काहीच करत नाही"],
        "शेवटचा e बोलला जात नाही, पण तो o ला लांब आवाज देतो.",
      ),
      e2m("kite", "पतंग", ["पाखरू", "टोपी"], "kite म्हणजे पतंग."),
      m2e(
        "टिपण",
        "note",
        ["not", "nose"],
        "टिपण म्हणजे note. not म्हणजे नाही.",
      ),
    ],
    rolePlay(
      "",
      "foundation",
      ["शेवटचा e", "The silent e"],
      "शिक्षक तुम्हाला शब्द बदलायला सांगतात.",
      "तुम्ही: विद्यार्थी",
      [
        [
          "o",
          "Read this word: kit. Now add an e.",
          "हा शब्द वाचा: kit. आता e जोडा.",
        ],
        ["y", "नवा शब्द म्हणा.", "Kite.", "Kite…"],
        ["o", "What does the e do?", "e काय करतो?"],
        [
          "y",
          "सांगा: i स्वतःचे नाव म्हणतो.",
          "It makes the i say its name.",
          "It makes the i…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "f2",
  path: "foundation",
  title: "आवाज जोडून शब्द वाचा",
  en: "Phonics: short and long vowels",
  outcome: [
    "I can read and say simple words by blending their sounds.",
    "मी आवाज जोडून साधे शब्द वाचू आणि म्हणू शकतो/शकते.",
  ],
  lessons: ["f-short-vowels", "f-cvc", "f-magic-e"],
  checkpoint: {
    scenario: [
      "Your teacher reads out words and asks you for the sounds.",
      "शिक्षक शब्द वाचतात आणि तुम्हाला आवाज विचारतात.",
    ],
    ex: finish("f2", "cp", [
      lis(
        "pot",
        "ऐका. शिक्षकांनी कोणता शब्द म्हटला?",
        "pot",
        ["pat", "put"],
        "pot मधील o चा आवाज 'ऑ' सारखा आहे.",
      ),
      und(
        "fed शब्दात कोणता स्वर आहे?",
        "e",
        ["a", "i"],
        "f – e – d: मधला आवाज e आहे.",
      ),
      und(
        "tap च्या शेवटी e लावल्यास कोणता शब्द बनतो?",
        "tape",
        ["tip", "top"],
        "tap + e = tape. a 'ए' म्हणतो.",
      ),
      gap(
        "c – ___ – t → cat",
        "a",
        ["e", "u"],
        "cat मधला स्वर a आहे: c – a – t.",
      ),
      bld(
        "हा पतंग आहे.",
        "This is a kite.",
        ["kit"],
        "kite म्हणजे पतंग. This is a … असे वाक्य बनवतात.",
      ),
    ]),
    speak:
      "bed, pig, cup हे शब्द आवाज वेगळे करून आणि मग जोडून म्हणा. मग kit आणि kite मधला फरक सांगा.",
  },
};
