import {
  bld,
  e2m,
  gap,
  lessonKit,
  lis,
  m2e,
  resp,
  rolePlay,
  und,
  finish,
} from "../author";
import type { Unit, Enrich } from "../types";

export const kits: Record<string, Enrich> = {
  routine: lessonKit(
    "routine",
    [
      "I can talk about my daily routine.",
      "मी माझ्या रोजच्या दिनक्रमाबद्दल बोलू शकतो/शकते.",
    ],
    [
      ["A", "What time do you wake up?", "तुम्ही किती वाजता उठता?"],
      [
        "B",
        "I wake up at seven. My sister wakes up at six.",
        "मी सात वाजता उठतो/उठते. माझी बहीण सहा वाजता उठते.",
      ],
      ["A", "How do you go to work?", "तुम्ही कामावर कसे जाता?"],
      [
        "B",
        "I go by bus. She goes by train.",
        "मी बसने जातो/जाते. ती रेल्वेने जाते.",
      ],
    ],
    ["I / you / we / they + verb", "he / she + verb + s"],
    [
      gap(
        "I ___ up at seven.",
        "wake",
        ["wakes", "waking"],
        "I सोबत मूळ रूप wake.",
      ),
      gap(
        "She ___ to work by bus.",
        "goes",
        ["go", "going"],
        "she सोबत go → goes.",
      ),
      gap(
        "Do you ___ every day?",
        "practise",
        ["practises", "practising"],
        "Do you नंतर मूळ रूप.",
      ),
      e2m(
        "I do not drink coffee.",
        "मी कॉफी पीत नाही.",
        ["मी कॉफी प्यायलो.", "मला कॉफी हवी आहे."],
        "do not drink म्हणजे पीत नाही.",
      ),
      m2e(
        "ती बसने कामावर जाते.",
        "She goes to work by bus.",
        ["She go to work by bus.", "She is go to work by bus."],
        "she सोबत goes.",
      ),
      lis(
        "I wake up at seven and drink tea.",
        "ऐका. व्यक्ती किती वाजता उठते?",
        "सात वाजता",
        ["सहा वाजता", "आठ वाजता"],
        "wake up at seven म्हणजे सात वाजता उठते.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["दिनक्रम सांगणे", "Your day"],
      "नवीन सहकारी तुमचा दिनक्रम विचारतो.",
      "तुम्ही: सहकारी",
      [
        ["o", "What time do you wake up?", "तुम्ही किती वाजता उठता?"],
        [
          "y",
          "तुम्ही सात वाजता उठता असे सांगा.",
          "I wake up at seven.",
          "I wake up…",
        ],
        ["o", "How do you come to the office?", "तुम्ही ऑफिसला कसे येता?"],
        ["y", "तुम्ही बसने येता असे सांगा.", "I come by bus.", "I come by…"],
      ],
    ),
  ),
  now: lessonKit(
    "now",
    [
      "I can say what is happening now.",
      "सध्या काय सुरू आहे ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "What are you doing?", "तुम्ही काय करत आहात?"],
      [
        "B",
        "I am learning English. My sister is cooking.",
        "मी इंग्रजी शिकत आहे. माझी बहीण स्वयंपाक करत आहे.",
      ],
      ["A", "Where are the children?", "मुले कुठे आहेत?"],
      ["B", "They are playing outside.", "ते बाहेर खेळत आहेत."],
    ],
    ["am / is / are + verb-ing", "What are you doing?"],
    [
      gap("I ___ learning English.", "am", ["is", "are"], "I सोबत am."),
      gap("They ___ playing outside.", "are", ["is", "am"], "They सोबत are."),
      gap(
        "My sister is ___ now. (स्वयंपाक करत आहे)",
        "cooking",
        ["cook", "cooks"],
        "is नंतर verb-ing.",
      ),
      e2m(
        "What are you doing?",
        "तुम्ही काय करत आहात?",
        ["तुम्ही कुठे आहात?", "तुम्ही कधी येणार?"],
        "doing म्हणजे करत आहात.",
      ),
      m2e(
        "मी वाचत आहे.",
        "I am reading.",
        ["I reading.", "I am read."],
        "वाचत आहे = am reading. am नंतर verb-ing येते.",
      ),
      resp(
        "What are you doing?",
        "I am waiting for the bus.",
        ["I wait at the bus.", "I am wait for."],
        "सध्याची कृती am + verb-ing ने सांगा.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["फोनवर विचारपूस", "What are you doing?"],
      "मित्र तुम्हाला फोन करतो.",
      "तुम्ही: मित्र",
      [
        ["o", "Hello! What are you doing?", "नमस्कार! तुम्ही काय करत आहात?"],
        [
          "y",
          "तुम्ही इंग्रजी शिकत आहात असे सांगा.",
          "I am learning English.",
          "I am learning…",
        ],
        ["o", "Nice. Where is your sister?", "छान. तुमची बहीण कुठे आहे?"],
        ["y", "ती स्वयंपाक करत आहे असे सांगा.", "She is cooking.", "She is…"],
      ],
    ),
  ),
  "how-often": lessonKit(
    "how-often",
    [
      "I can say how often I do things.",
      "मी एखादी गोष्ट किती वेळा करतो/करते ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "How often do you exercise?", "तुम्ही किती वेळा व्यायाम करता?"],
      [
        "B",
        "I exercise three times a week.",
        "मी आठवड्यातून तीन वेळा व्यायाम करतो/करते.",
      ],
      ["A", "Does your sister exercise too?", "तुमची बहीणही व्यायाम करते का?"],
      ["B", "She walks every evening.", "ती दर संध्याकाळी चालते."],
    ],
    [
      "How often + do/does + subject + verb?",
      "… times a week · every day · sometimes · never",
    ],
    [
      und(
        "'three times a week' म्हणजे काय?",
        "आठवड्यातून तीन वेळा",
        ["तीन आठवडे", "दर तीन दिवसांनी"],
        "times a week म्हणजे आठवड्यातून इतक्या वेळा.",
      ),
      gap(
        "She reads ___ evening.",
        "every",
        ["each of", "all"],
        "दररोज संध्याकाळी = every evening.",
      ),
      gap(
        "I ___ eat late. (कधीही नाही)",
        "never",
        ["always", "often"],
        "never म्हणजे कधीही नाही.",
      ),
      m2e(
        "तुम्ही किती वेळा व्यायाम करता?",
        "How often do you exercise?",
        ["How often you exercise?", "How many do you exercise?"],
        "किती वेळा = How often. प्रश्न: How often + do + you + verb?",
      ),
      resp(
        "How often do you cook?",
        "I cook every day.",
        ["I cook at five.", "I am cooking tea."],
        "How often ला वारंवारता सांगा.",
      ),
      lis(
        "I go to the market twice a week.",
        "ऐका. व्यक्ती बाजारात किती वेळा जाते?",
        "आठवड्यातून दोन वेळा",
        ["दररोज", "महिन्यातून एकदा"],
        "twice a week म्हणजे आठवड्यातून दोन वेळा.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["सवयींबद्दल बोलणे", "How often do you…?"],
      "मित्र तुमच्या सवयी विचारतो.",
      "तुम्ही: मित्र",
      [
        ["o", "How often do you exercise?", "तुम्ही किती वेळा व्यायाम करता?"],
        [
          "y",
          "आठवड्यातून तीन वेळा असे सांगा.",
          "I exercise three times a week.",
          "I exercise…",
        ],
        [
          "o",
          "That is good. How often do you cook?",
          "छान. तुम्ही किती वेळा स्वयंपाक करता?",
        ],
        ["y", "तुमचे उत्तर सांगा.", "I cook every day.", "I cook…"],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b8",
  path: "beginner",
  title: "रोजचा दिनक्रम आणि सध्या काय सुरू आहे",
  en: "Daily routines and what is happening now",
  outcome: [
    "I can talk about my daily habits and what I am doing now.",
    "मी माझ्या रोजच्या सवयी आणि सध्या काय करत आहे ते सांगू शकतो/शकते.",
  ],
  lessons: ["routine", "now", "how-often"],
  checkpoint: {
    scenario: [
      "A friend calls you on a Sunday morning.",
      "रविवारी सकाळी मित्राचा फोन येतो.",
    ],
    ex: finish("b8", "cp", [
      resp(
        "What are you doing right now?",
        "I am making breakfast. I usually wake up late on Sundays.",
        ["I make now breakfast.", "I am wake up late."],
        "सध्याची कृती am + verb-ing; सवयीसाठी simple present.",
      ),
      gap(
        "She ___ tea every morning.",
        "drinks",
        ["drink", "drinking"],
        "she सोबत drinks.",
      ),
      gap(
        "They ___ watching a film now.",
        "are",
        ["is", "do"],
        "They सोबत are + verb-ing.",
      ),
      bld(
        "मी रोज चालतो.",
        "I walk every day.",
        ["walks"],
        "I सोबत मूळ रूप walk.",
      ),
    ]),
    speak: "रविवारी तुम्ही सहसा काय करता आणि आत्ता काय करत आहात ते सांगा.",
  },
};
