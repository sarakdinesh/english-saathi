// Level 0 · Unit 1: the English alphabet.
// Letter-name audio uses the device voice, which says a single letter by its
// name. Sounds of letters are taught through example words, not isolated audio.
import {
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
    "f-alpha-am",
    "alphabet",
    "Letters A to M",
    "A ते M अक्षरे",
    "इंग्रजी वर्णमालेत एकूण 26 अक्षरे आहेत. प्रत्येक अक्षराचे मोठे (capital) आणि लहान (small) रूप असते: A a, B b, C c. A ते M: A B C D E F G H I J K L M. नावे अशी म्हणतात: ए, बी, सी, डी, ई, एफ, जी, एच, आय, जे, के, एल, एम. वाक्याची आणि नावाची सुरुवात मोठ्या अक्षराने करतात.",
    "Capital + small: A a, B b, C c",
    [
      ["A a — apple", "A (ए) चे लहान रूप a आहे. apple म्हणजे सफरचंद."],
      ["B b — ball", "B (बी) चे लहान रूप b आहे. ball म्हणजे चेंडू."],
      ["C c — cat", "C (सी) चे लहान रूप c आहे. cat म्हणजे मांजर."],
      ["D d — dog", "D (डी) चे लहान रूप d आहे. dog म्हणजे कुत्रा."],
      ["M m — mango", "M (एम) चे लहान रूप m आहे. mango म्हणजे आंबा."],
    ],
    "A ते M अक्षरे वहीत मोठी आणि लहान दोन्ही रूपांत लिहा आणि प्रत्येक अक्षराचे नाव मोठ्याने म्हणा.",
  ),
  newLesson(
    "f-alpha-nz",
    "alphabet",
    "Letters N to Z",
    "N ते Z अक्षरे",
    "N ते Z: N O P Q R S T U V W X Y Z. नावे: एन, ओ, पी, क्यू, आर, एस, टी, यू, व्ही, डब्ल्यू, एक्स, वाय, झेड. W चे नाव 'डबल-यू' आहे आणि V चे नाव 'व्ही' आहे; दोन्ही वेगळे म्हणा. b/d आणि p/q ही अक्षरे सारखी दिसतात, त्यामुळे ती नीट पाहा. Z चे नाव भारतात आणि ब्रिटनमध्ये 'झेड' म्हणतात; अमेरिकेत 'झी' म्हणतात.",
    "N O P Q R S T U V W X Y Z",
    [
      ["N n — nose", "N (एन) चे लहान रूप n आहे. nose म्हणजे नाक."],
      ["O o — orange", "O (ओ) चे लहान रूप o आहे. orange म्हणजे संत्रे."],
      ["P p — pen", "P (पी) चे लहान रूप p आहे. pen म्हणजे पेन."],
      ["S s — sun", "S (एस) चे लहान रूप s आहे. sun म्हणजे सूर्य."],
      ["Z z — zebra", "Z (झेड) चे लहान रूप z आहे. zebra म्हणजे झेब्रा."],
    ],
    "N ते Z अक्षरे वहीत लिहा. b-d आणि p-q यांतील फरक स्वतःच्या शब्दांत सांगा.",
  ),
  newLesson(
    "f-name-sound",
    "alphabet",
    "Letter names and letter sounds",
    "अक्षराचे नाव आणि आवाज",
    "प्रत्येक अक्षराला एक नाव असते आणि शब्दात त्याचा एक आवाज असतो; दोन्ही वेगळे असतात. b चे नाव 'बी' आहे, पण ball मध्ये आवाज फक्त 'ब्' येतो. शब्द वाचताना अक्षराचे नाव नाही तर त्याचा आवाज वापरतात. आवाज शिकण्यासाठी नेहमी एक ओळखीचा शब्द लक्षात ठेवा: b – ball.",
    "name: bee · sound: b · word: ball",
    [
      [
        "b — name 'bee', sound b — ball",
        "b चे नाव 'बी' आहे, पण ball मध्ये आवाज 'ब्' येतो.",
      ],
      [
        "m — name 'em', sound m — man",
        "m चे नाव 'एम' आहे, पण man मध्ये आवाज 'म्' येतो.",
      ],
      [
        "s — name 'ess', sound s — sun",
        "s चे नाव 'एस' आहे, पण sun मध्ये आवाज 'स्' येतो.",
      ],
      [
        "d — name 'dee', sound d — dog",
        "d चे नाव 'डी' आहे. dog मध्ये आवाज 'द्' आणि 'ड्' यांच्या मधला असतो; जीभ वरच्या दातांच्या मागे टेकते.",
      ],
    ],
    "b, m, s, d यांपैकी प्रत्येक अक्षराचे नाव आणि त्याचा आवाज असलेला एक शब्द सांगा.",
  ),
  newLesson(
    "f-vowels",
    "alphabet",
    "Vowels and consonants",
    "स्वर आणि व्यंजने",
    "26 अक्षरांपैकी 5 अक्षरे स्वर (vowels) आहेत: a, e, i, o, u. बाकी 21 अक्षरे व्यंजने (consonants) आहेत. प्रत्येक इंग्रजी शब्दात किमान एक स्वराचा आवाज असतो. y हे अक्षर कधी कधी स्वरासारखे काम करते, उदा. my, gym. सुरुवातीला शब्दातील स्वर आणि व्यंजने वेगळी ओळखायला शिका.",
    "vowels: a e i o u · the rest: consonants",
    [
      ["a, e, i, o, u", "हे पाच स्वर आहेत."],
      ["b, c, d, f, g, h", "ही व्यंजने आहेत."],
      ["cat = c + a + t", "cat मध्ये a स्वर आहे; c आणि t व्यंजने आहेत."],
      ["egg = e + g + g", "egg मध्ये e स्वर आहे; g व्यंजन आहे."],
      ["sun = s + u + n", "sun मध्ये u स्वर आहे; s आणि n व्यंजने आहेत."],
    ],
    "तुमच्या नावातील स्वर आणि व्यंजने वेगळी लिहा.",
  ),
];

export const kits: Record<string, Enrich> = {
  "f-alpha-am": lessonKit(
    "f-alpha-am",
    [
      "I can name the letters A to M.",
      "मी A ते M अक्षरांची नावे सांगू शकतो/शकते.",
    ],
    [
      ["A", "What is this letter?", "हे कोणते अक्षर आहे?"],
      ["B", "It is M.", "हे M आहे."],
      ["A", "Is it a capital letter or a small letter?", "हे मोठे अक्षर आहे की लहान?"],
      ["B", "It is a capital M.", "हे मोठे M आहे."],
    ],
    ["What is this letter?", "It is …"],
    [
      lis(
        "B",
        "ऐका. कोणते अक्षर ऐकले?",
        "B",
        ["D", "P"],
        "'बी' हे B अक्षराचे नाव आहे. D चे नाव 'डी' आणि P चे 'पी' आहे.",
      ),
      und(
        "D चे लहान रूप कोणते?",
        "d",
        ["b", "p"],
        "D चे लहान रूप d आहे. b आणि p ही वेगळी अक्षरे आहेत.",
      ),
      gap(
        "A, B, ___, D, E",
        "C",
        ["G", "K"],
        "वर्णमालेत B नंतर C येते.",
      ),
      m2e(
        "सफरचंद",
        "apple",
        ["ball", "dog"],
        "सफरचंद म्हणजे apple. ball म्हणजे चेंडू आणि dog म्हणजे कुत्रा.",
      ),
      e2m("mango", "आंबा", ["केळे", "सफरचंद"], "mango म्हणजे आंबा."),
    ],
    rolePlay(
      "",
      "foundation",
      ["अक्षर ओळखा", "Name the letter"],
      "शिक्षक फळ्यावर एक अक्षर दाखवतात.",
      "तुम्ही: विद्यार्थी",
      [
        [
          "o",
          "Look at the board. What is this letter? It is a B.",
          "फळ्याकडे पाहा. हे कोणते अक्षर आहे? हे B आहे.",
        ],
        ["y", "अक्षराचे नाव सांगा.", "It is B.", "It is…"],
        [
          "o",
          "Good. What is the small letter?",
          "छान. याचे लहान रूप कोणते?",
        ],
        ["y", "लहान रूप सांगा.", "It is b.", "It is…"],
      ],
    ),
  ),
  "f-alpha-nz": lessonKit(
    "f-alpha-nz",
    [
      "I can name the letters N to Z.",
      "मी N ते Z अक्षरांची नावे सांगू शकतो/शकते.",
    ],
    [
      ["A", "Which letter comes after R?", "R नंतर कोणते अक्षर येते?"],
      ["B", "S comes after R.", "R नंतर S येते."],
      ["A", "And which letter comes after S?", "आणि S नंतर कोणते?"],
      ["B", "T comes after S.", "S नंतर T येते."],
    ],
    ["Which letter comes after …?", "… comes after …"],
    [
      lis(
        "W",
        "ऐका. कोणते अक्षर ऐकले?",
        "W",
        ["V", "U"],
        "W चे नाव 'डब्ल्यू' आहे. V चे नाव 'व्ही' आणि U चे 'यू' आहे.",
      ),
      gap(
        "X, Y, ___",
        "Z",
        ["V", "W"],
        "वर्णमाला Z वर संपते: X, Y, Z.",
      ),
      und(
        "इंग्रजी वर्णमालेत एकूण किती अक्षरे आहेत?",
        "26",
        ["24", "30"],
        "इंग्रजी वर्णमालेत 26 अक्षरे आहेत.",
      ),
      und(
        "Q चे लहान रूप कोणते?",
        "q",
        ["p", "g"],
        "Q चे लहान रूप q आहे. p आणि g ही वेगळी अक्षरे आहेत.",
      ),
      m2e(
        "संत्रे",
        "orange",
        ["onion", "oil"],
        "संत्रे म्हणजे orange. onion म्हणजे कांदा आणि oil म्हणजे तेल.",
      ),
    ],
    rolePlay(
      "",
      "foundation",
      ["अक्षरांचा क्रम", "Letter order"],
      "तुम्ही आणि तुमचा मित्र वर्णमालेचा क्रम तपासत आहात.",
      "तुम्ही: विद्यार्थी",
      [
        ["o", "Which letter comes after P?", "P नंतर कोणते अक्षर येते?"],
        ["y", "P नंतरचे अक्षर सांगा.", "Q comes after P.", "Q comes…"],
        ["o", "Good. And after T?", "छान. आणि T नंतर?"],
        ["y", "T नंतरचे अक्षर सांगा.", "U comes after T.", "U comes…"],
      ],
    ),
  ),
  "f-name-sound": lessonKit(
    "f-name-sound",
    [
      "I can tell a letter's name from its sound.",
      "मी अक्षराचे नाव आणि त्याचा आवाज वेगळा सांगू शकतो/शकते.",
    ],
    [
      ["A", "What is the name of this letter?", "या अक्षराचे नाव काय आहे?"],
      ["B", "Its name is bee.", "त्याचे नाव 'बी' आहे."],
      ["A", "And what is its sound?", "आणि त्याचा आवाज कोणता?"],
      ["B", "Its sound is b, as in ball.", "त्याचा आवाज b आहे, ball मध्ये आहे तसा."],
    ],
    ["name: bee · sound: b", "as in ball"],
    [
      lis(
        "ball",
        "ऐका. शब्द कोणत्या आवाजाने सुरू होतो?",
        "b",
        ["d", "m"],
        "ball चा पहिला आवाज b आहे: 'ब्'.",
      ),
      lis(
        "dog",
        "ऐका. शब्द कोणत्या आवाजाने सुरू होतो?",
        "d",
        ["b", "g"],
        "dog चा पहिला आवाज d आहे.",
      ),
      und(
        "m चे नाव कोणते?",
        "एम",
        ["एन", "एल"],
        "m चे नाव 'एम' आहे. शब्दात त्याचा आवाज 'म्' येतो.",
      ),
      und(
        "pig शब्दाचा पहिला आवाज कोणता?",
        "p",
        ["b", "g"],
        "pig मध्ये पहिला आवाज p आहे: 'प्'.",
      ),
      e2m("dog", "कुत्रा", ["मांजर", "बदक"], "dog म्हणजे कुत्रा."),
    ],
    rolePlay(
      "",
      "foundation",
      ["नाव आणि आवाज", "Name and sound"],
      "शिक्षक तुम्हाला एक अक्षर दाखवतात.",
      "तुम्ही: विद्यार्थी",
      [
        [
          "o",
          "What is the name of this letter?",
          "या अक्षराचे नाव काय आहे?",
        ],
        ["y", "अक्षराचे नाव सांगा.", "Its name is B.", "Its name is…"],
        [
          "o",
          "And what sound does it make?",
          "आणि तो कोणता आवाज करतो?",
        ],
        [
          "y",
          "आवाज आणि शब्द सांगा.",
          "It makes the sound b, as in ball.",
          "It makes the sound…",
        ],
      ],
    ),
  ),
  "f-vowels": lessonKit(
    "f-vowels",
    [
      "I can tell vowels from consonants.",
      "मी स्वर आणि व्यंजने वेगळी ओळखू शकतो/शकते.",
    ],
    [
      ["A", "Is 'e' a vowel?", "'e' स्वर आहे का?"],
      ["B", "Yes, e is a vowel.", "हो, e स्वर आहे."],
      ["A", "Is 't' a vowel?", "'t' स्वर आहे का?"],
      ["B", "No, t is a consonant.", "नाही, t व्यंजन आहे."],
    ],
    ["… is a vowel.", "… is a consonant."],
    [
      und(
        "खालीलपैकी कोणते अक्षर स्वर आहे?",
        "o",
        ["b", "t"],
        "a, e, i, o, u हे स्वर आहेत. b आणि t व्यंजने आहेत.",
      ),
      und(
        "इंग्रजीत किती अक्षरे स्वर आहेत?",
        "5",
        ["3", "21"],
        "5 स्वर (a, e, i, o, u) आणि 21 व्यंजने आहेत.",
      ),
      gap(
        "a, e, ___, o, u",
        "i",
        ["y", "k"],
        "स्वरांचा क्रम a, e, i, o, u असा आहे.",
      ),
      und(
        "cat शब्दात स्वर कोणता आहे?",
        "a",
        ["c", "t"],
        "cat मध्ये c आणि t व्यंजने आहेत; a स्वर आहे.",
      ),
      m2e(
        "अंडे",
        "egg",
        ["ear", "eye"],
        "अंडे म्हणजे egg. ear म्हणजे कान आणि eye म्हणजे डोळा.",
      ),
    ],
    rolePlay(
      "",
      "foundation",
      ["स्वर की व्यंजन?", "Vowel or consonant?"],
      "शिक्षक तुम्हाला अक्षरे विचारतात.",
      "तुम्ही: विद्यार्थी",
      [
        [
          "o",
          "Is 'a' a vowel or a consonant?",
          "'a' स्वर आहे की व्यंजन?",
        ],
        ["y", "उत्तर सांगा.", "A is a vowel.", "A is…"],
        ["o", "Good. And what about 'b'?", "छान. आणि 'b'?"],
        ["y", "उत्तर सांगा.", "B is a consonant.", "B is…"],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "f1",
  path: "foundation",
  title: "इंग्रजी वर्णमाला",
  en: "The English alphabet",
  outcome: [
    "I can name the letters A to Z and tell vowels from consonants.",
    "मी A ते Z अक्षरांची नावे सांगू शकतो/शकते आणि स्वर-व्यंजने ओळखू शकतो/शकते.",
  ],
  lessons: ["f-alpha-am", "f-alpha-nz", "f-name-sound", "f-vowels"],
  checkpoint: {
    scenario: [
      "Your teacher writes letters on the board and asks questions.",
      "शिक्षक फळ्यावर अक्षरे लिहितात आणि प्रश्न विचारतात.",
    ],
    ex: finish("f1", "cp", [
      lis(
        "K",
        "ऐका. शिक्षकांनी कोणते अक्षर म्हटले?",
        "K",
        ["Q", "C"],
        "'के' हे K अक्षराचे नाव आहे.",
      ),
      und(
        "H चे लहान रूप कोणते?",
        "h",
        ["n", "k"],
        "H चे लहान रूप h आहे.",
      ),
      gap(
        "J, K, ___, M",
        "L",
        ["N", "H"],
        "वर्णमालेत K नंतर L आणि मग M येते.",
      ),
      und(
        "u हे अक्षर स्वर आहे की व्यंजन?",
        "स्वर",
        ["व्यंजन", "दोन्ही नाही"],
        "a, e, i, o, u हे पाच स्वर आहेत.",
      ),
    ]),
    speak: "A ते Z अक्षरे क्रमाने मोठ्याने म्हणा आणि पाच स्वर वेगळे सांगा.",
  },
};
