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
  yesterday: lessonKit(
    "yesterday",
    ["I can say what I did yesterday.", "मी काल काय केले ते सांगू शकतो/शकते."],
    [
      ["A", "What did you do yesterday?", "तुम्ही काल काय केले?"],
      [
        "B",
        "I visited my friend. We went to the market.",
        "मी मित्राला भेटलो/भेटले. आम्ही बाजारात गेलो.",
      ],
      ["A", "Did you buy anything?", "तुम्ही काही घेतले का?"],
      ["B", "No, I did not buy anything.", "नाही, मी काही घेतले नाही."],
    ],
    [
      "verb + ed / irregular: went, bought, saw",
      "Did + subject + base verb? · did not + base verb",
    ],
    [
      gap(
        "I ___ my friend yesterday. (भेटलो)",
        "visited",
        ["visit", "visiting"],
        "भूतकाळात visited.",
      ),
      gap(
        "We ___ to the market. (गेलो)",
        "went",
        ["go", "goed"],
        "go चे भूतकाळी रूप went.",
      ),
      gap(
        "Did you ___ your work?",
        "finish",
        ["finished", "finishes"],
        "Did नंतर मूळ रूप.",
      ),
      e2m(
        "I did not go out.",
        "मी बाहेर गेलो/गेले नाही.",
        ["मी बाहेर जाणार नाही.", "मी बाहेर जात आहे."],
        "did not go म्हणजे गेलो नाही.",
      ),
      m2e(
        "तुम्ही काल काय केले?",
        "What did you do yesterday?",
        ["What you did yesterday?", "What did you did yesterday?"],
        "did नंतर मूळ रूप do.",
      ),
      lis(
        "Yesterday I bought vegetables and cooked dinner.",
        "ऐका. व्यक्तीने काल काय केले?",
        "भाज्या घेतल्या आणि जेवण केले",
        ["बाजारात गेली नाही", "फक्त टीव्ही पाहिला"],
        "bought vegetables आणि cooked dinner म्हणजे भाज्या घेतल्या आणि स्वयंपाक केला.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["काल काय केले?", "Yesterday"],
      "सहकारी तुम्हाला कालच्या दिवसाबद्दल विचारतो.",
      "तुम्ही: सहकारी",
      [
        ["o", "What did you do yesterday?", "तुम्ही काल काय केले?"],
        [
          "y",
          "तुम्ही मित्राला भेटलात असे सांगा.",
          "I visited my friend.",
          "I visited…",
        ],
        ["o", "Did you go to the market?", "तुम्ही बाजारात गेलात का?"],
        [
          "y",
          "'हो, गेलो' किंवा 'नाही, गेलो नाही' असे सांगा.",
          "Yes, we went to the market.",
          "Yes, we went… / No, I did not…",
        ],
      ],
    ),
  ),
  "going-to": lessonKit(
    "going-to",
    ["I can talk about my plans.", "मी माझ्या योजनांबद्दल बोलू शकतो/शकते."],
    [
      [
        "A",
        "What are you going to do tonight?",
        "आज रात्री तुम्ही काय करणार आहात?",
      ],
      [
        "B",
        "I am going to study. My brother is going to cook.",
        "मी अभ्यास करणार आहे. माझा भाऊ स्वयंपाक करणार आहे.",
      ],
      [
        "A",
        "Are you going to visit your village?",
        "तुम्ही गावाला जाणार आहात का?",
      ],
      [
        "B",
        "Yes, we are going to visit next week.",
        "हो, आम्ही पुढच्या आठवड्यात जाणार आहोत.",
      ],
    ],
    ["am / is / are + going to + base verb", "What are you going to do?"],
    [
      gap(
        "I am going ___ study tonight.",
        "to",
        ["for", "at"],
        "going to + क्रियापद.",
      ),
      gap(
        "We ___ going to visit our village.",
        "are",
        ["is", "am"],
        "We सोबत are.",
      ),
      e2m(
        "What are you going to do?",
        "तुम्ही काय करणार आहात?",
        ["तुम्ही काय केले?", "तुम्ही कुठे आहात?"],
        "going to do म्हणजे करणार आहात.",
      ),
      m2e(
        "मी आज रात्री अभ्यास करणार आहे.",
        "I am going to study tonight.",
        ["I going to study tonight.", "I am go to study tonight."],
        "am going to + मूळ क्रियापद.",
      ),
      resp(
        "What are you going to do tomorrow?",
        "I am going to visit my friend.",
        ["I visited my friend.", "I am visit going."],
        "भविष्यातील बेतासाठी going to.",
      ),
      lis(
        "We are going to visit the village next week.",
        "ऐका. ते कधी जाणार आहेत?",
        "पुढच्या आठवड्यात",
        ["या आठवड्यात", "काल"],
        "next week म्हणजे पुढच्या आठवड्यात.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["उद्याचे बेत", "Tomorrow's plans"],
      "मित्र तुम्हाला उद्याच्या योजना विचारतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "What are you going to do tomorrow?",
          "तुम्ही उद्या काय करणार आहात?",
        ],
        [
          "y",
          "तुम्ही मित्राला भेटणार आहात असे सांगा.",
          "I am going to visit my friend.",
          "I am going to…",
        ],
        ["o", "And your family?", "आणि तुमचे कुटुंब?"],
        [
          "y",
          "ते गावाला जाणार आहेत असे सांगा.",
          "They are going to visit our village.",
          "They are going to…",
        ],
      ],
    ),
  ),
  will: lessonKit(
    "will",
    [
      "I can make a promise or a quick decision.",
      "मी वचन किंवा तत्काळ निर्णय सांगू शकतो/शकते.",
    ],
    [
      ["A", "I cannot carry this bag.", "मला ही पिशवी उचलता येत नाही."],
      ["B", "I will help you.", "मी तुम्हाला मदत करेन."],
      ["A", "Will you join us for lunch?", "तुम्ही आमच्यासोबत जेवायला याल का?"],
      [
        "B",
        "Yes, I will. I will not be late.",
        "हो, येईन. मी उशीर करणार नाही.",
      ],
    ],
    [
      "I will + base verb",
      "I will not (won’t) + base verb",
      "Will you + base verb?",
    ],
    [
      gap(
        "I ___ help you. (मी मदत करेन)",
        "will",
        ["am", "do"],
        "तत्काळ निर्णयासाठी will.",
      ),
      gap(
        "I will ___ forget. (विसरणार नाही)",
        "not",
        ["no", "never"],
        "will नंतर not: will not (won’t).",
      ),
      resp(
        "Will you join us for lunch?",
        "Yes, I will.",
        ["Yes, I do will.", "Yes, I am."],
        "Will you…? ला Yes, I will.",
      ),
      e2m(
        "I won’t forget.",
        "मी विसरणार नाही.",
        ["मी विसरलो.", "मी विसरतो."],
        "विसरणार नाही = won’t forget. won’t म्हणजे will not.",
      ),
      m2e(
        "मी तुम्हाला मदत करेन.",
        "I will help you.",
        ["I will helps you.", "I am will help you."],
        "will नंतर मूळ रूप.",
      ),
      lis(
        "I will call you tomorrow morning.",
        "ऐका. व्यक्ती काय करेल?",
        "उद्या सकाळी फोन करेल",
        ["आज रात्री येईल", "काल फोन केला"],
        "will call tomorrow morning म्हणजे उद्या सकाळी फोन करेल.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["मदतीचे वचन", "Offering help"],
      "सहकारी जड वस्तू उचलत आहे.",
      "तुम्ही: सहकारी",
      [
        ["o", "This box is very heavy.", "हा बॉक्स खूप जड आहे."],
        ["y", "तुम्ही मदत कराल असे सांगा.", "I will help you.", "I will…"],
        [
          "o",
          "Thank you. Will you also join us for lunch?",
          "धन्यवाद. तुम्ही आमच्यासोबत जेवायलाही याल का?",
        ],
        ["y", "'हो, येईन' म्हणा.", "Yes, I will.", "Yes, I…"],
      ],
    ),
  ),
  "would-like": lessonKit(
    "would-like",
    [
      "I can ask for things politely with would like.",
      "would like वापरून मी नम्रपणे गोष्टी मागू शकतो/शकते.",
    ],
    [
      ["A", "Would you like some water?", "तुम्हाला थोडे पाणी हवे आहे का?"],
      [
        "B",
        "Yes, please. I would like a cup of tea too.",
        "हो, कृपया. मला एक कप चहाही हवा आहे.",
      ],
      ["A", "Would you like to sit here?", "तुम्हाला इथे बसायला आवडेल का?"],
      [
        "B",
        "Yes, I would like to sit near the window.",
        "हो, मला खिडकीजवळ बसायला आवडेल.",
      ],
    ],
    ["I would like + noun", "I would like to + verb", "Would you like …?"],
    [
      gap(
        "I ___ like a cup of tea.",
        "would",
        ["will", "am"],
        "नम्र इच्छेसाठी would like.",
      ),
      gap(
        "Would you like ___ water? (थोडे)",
        "some",
        ["a", "an"],
        "water न मोजता येणारे; some water.",
      ),
      und(
        "दुकानात कोणते वाक्य अधिक नम्र आहे?",
        "I would like a notebook, please.",
        ["Give me notebook.", "I want notebook now."],
        "would like आणि please नम्र वाटतात.",
      ),
      e2m(
        "I would like to meet you.",
        "मला तुम्हाला भेटायला आवडेल.",
        ["मी तुम्हाला भेटलो.", "तुम्ही मला भेटाल का?"],
        "would like to म्हणजे आवडेल.",
      ),
      m2e(
        "तुम्हाला थोडे पाणी हवे आहे का?",
        "Would you like some water?",
        ["You would like some water?", "Would you like a water?"],
        "प्रश्नात Would आधी येते.",
      ),
      resp(
        "Would you like some tea?",
        "Yes, please. I would like some tea.",
        ["Yes, I am tea.", "No, I would a tea."],
        "नम्रपणे Yes, please म्हणा.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["कॅफेमध्ये", "At a café"],
      "तुम्ही कॅफेमध्ये ऑर्डर देता.",
      "तुम्ही: ग्राहक",
      [
        [
          "o",
          "Good evening. What would you like?",
          "शुभ संध्याकाळ. तुम्हाला काय हवे आहे?",
        ],
        [
          "y",
          "नम्रपणे चहा मागा.",
          "I would like a cup of tea, please.",
          "I would like…",
        ],
        [
          "o",
          "Would you like something to eat?",
          "तुम्हाला खायला काही हवे का?",
        ],
        [
          "y",
          "सँडविच मागा.",
          "Yes, I would like a sandwich.",
          "Yes, I would like…",
        ],
      ],
    ),
  ),
  "let-us": lessonKit(
    "let-us",
    [
      "I can suggest doing something together.",
      "मी एकत्र काहीतरी करायचे सुचवू शकतो/शकते.",
    ],
    [
      [
        "A",
        "It is a nice evening. Let’s go for a walk.",
        "छान संध्याकाळ आहे. चला फिरायला जाऊया.",
      ],
      ["B", "Good idea. Let’s go now.", "छान कल्पना. चला आता जाऊया."],
      ["A", "Let’s not be late for dinner.", "जेवणाला उशीर करू नकोया."],
      ["B", "Okay. Let’s call a taxi.", "ठीक आहे. चला टॅक्सी बोलावूया."],
    ],
    ["Let’s + base verb", "Let’s not + base verb"],
    [
      gap(
        "Let’s ___ for a walk.",
        "go",
        ["goes", "going"],
        "Let’s नंतर मूळ क्रियापद.",
      ),
      gap("Let’s ___ be late.", "not", ["no", "don't"], "नकारात Let’s not."),
      e2m(
        "Let’s start the meeting.",
        "चला, बैठक सुरू करूया.",
        ["बैठक संपली.", "कृपया शांत राहा."],
        "Let’s म्हणजे चला … करूया.",
      ),
      m2e(
        "चला, एकत्र जेवूया.",
        "Let’s eat together.",
        ["Let’s eating together.", "Let’s to eat together."],
        "Let’s + मूळ क्रियापद.",
      ),
      resp(
        "Let’s go for a walk.",
        "Good idea. Let’s go.",
        ["Yes, let’s going.", "I am let."],
        "सूचनेला Good idea म्हणा.",
      ),
      lis(
        "Let’s start at nine.",
        "ऐका. ते कधी सुरू करायचे सुचवतात?",
        "नऊ वाजता",
        ["सहा वाजता", "नऊ दिवसांनी"],
        "at nine म्हणजे नऊ वाजता.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["सुचवणे", "Suggesting plans"],
      "तुम्ही मित्राला संध्याकाळची योजना सुचवता.",
      "तुम्ही: मित्र",
      [
        ["y", "फिरायला जायचे सुचवा.", "Let’s go for a walk.", "Let’s go…"],
        ["o", "Good idea. When?", "छान कल्पना. कधी?"],
        ["y", "सहा वाजता जाऊया असे सांगा.", "Let’s go at six.", "Let’s go at…"],
        ["o", "Okay, see you at six.", "ठीक आहे, सहाला भेटू."],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b9",
  path: "beginner",
  title: "काल, उद्या आणि सुचवणे",
  en: "Talking about yesterday, plans and suggestions",
  outcome: [
    "I can say what I did, what I will do, and suggest plans.",
    "मी काय केले, काय करणार आहे ते सांगू शकतो/शकते आणि योजना सुचवू शकतो/शकते.",
  ],
  lessons: ["yesterday", "going-to", "will", "would-like", "let-us"],
  checkpoint: {
    scenario: [
      "You and a friend are planning a day trip after last weekend.",
      "मागच्या आठवड्याच्या शेवटानंतर तुम्ही आणि मित्र सहलीची योजना आखत आहात.",
    ],
    ex: finish("b9", "cp", [
      resp(
        "Where did you go last Sunday?",
        "We went to a fort. It was nice.",
        ["We go to a fort.", "We are going last Sunday."],
        "भूतकाळात went.",
      ),
      gap(
        "Next Sunday we ___ going to visit Raigad.",
        "are",
        ["is", "were"],
        "We सोबत are going to.",
      ),
      gap(
        "___ take a taxi. It is late. (चला)",
        "Let’s",
        ["Let", "We’s"],
        "सूचनेसाठी Let’s.",
      ),
      bld(
        "मला एक कप चहा हवा आहे.",
        "I would like a cup of tea.",
        ["will"],
        "नम्र इच्छा: I would like.",
      ),
    ]),
    speak:
      "मित्राला सांगा तुम्ही काल काय केले, उद्या काय करणार आहात आणि एक सूचना द्या.",
  },
};
