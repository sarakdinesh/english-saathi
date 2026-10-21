import {
  bld,
  e2m,
  gap,
  lessonKit,
  lis,
  m2e,
  newLesson,
  resp,
  rolePlay,
  und,
  finish,
} from "../author";
import type { Unit, Enrich } from "../types";

export const lessons = [
  newLesson(
    "yes-no",
    "formulas",
    "Yes/no questions and short answers",
    "होय/नाही प्रश्न विचारा आणि उत्तर द्या",
    "होय/नाही उत्तर असलेले प्रश्न Do / Does / Are / Can ने सुरू करा. I, you, we, they सोबत Do; he, she, it सोबत Does. उत्तर लहान ठेवा: Yes, I do. / No, I do not. Yes, she does. / Yes, I am. / No, I cannot.",
    "Do / Does + subject + verb? → Yes, I do. / No, I do not.",
    [
      [
        "Do you live in Pune? — Yes, I do.",
        "तुम्ही पुण्यात राहता का? — हो, राहतो/राहते.",
      ],
      [
        "Does she work here? — No, she does not.",
        "ती इथे काम करते का? — नाही, करत नाही.",
      ],
      ["Are you tired? — Yes, I am.", "तुम्ही थकलात का? — हो, थकलो/थकले आहे."],
      [
        "Can you swim? — No, I cannot.",
        "तुम्हाला पोहता येते का? — नाही, येत नाही.",
      ],
    ],
    "तुमच्या मित्राला चार होय/नाही प्रश्न विचारा आणि त्याची उत्तरे ऐका.",
  ),
  newLesson(
    "negatives",
    "formulas",
    "Saying no: not",
    "नकार कसा द्यायचा?",
    "नकारासाठी not वापरा. सवय किंवा सामान्य गोष्टींसाठी I, you, we, they सोबत do not आणि he, she, it सोबत does not; नंतर क्रियापदाचे मूळ रूप (s नाही). am / is / are नंतर थेट not येतो: He is not at home. We are not ready.",
    "do not / does not + base verb · am / is / are + not",
    [
      ["I do not like coffee.", "मला कॉफी आवडत नाही."],
      ["She does not work on Sundays.", "ती रविवारी काम करत नाही."],
      ["He is not at home.", "तो घरी नाही."],
      ["We are not ready.", "आम्ही तयार नाही."],
    ],
    "तुम्ही रोज काय करत नाही ते तीन वाक्यांत सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  "question-words": lessonKit(
    "question-words",
    [
      "I can ask what, where, when, why, who and how questions.",
      "मी what, where, when, why, who आणि how प्रश्न विचारू शकतो/शकते.",
    ],
    [
      ["A", "Where do you live?", "तुम्ही कुठे राहता?"],
      ["B", "I live in Pune. And you?", "मी पुण्यात राहतो/राहते. आणि तुम्ही?"],
      ["A", "When does your class start?", "तुमचा वर्ग कधी सुरू होतो?"],
      [
        "B",
        "It starts at ten. Why do you ask?",
        "तो दहा वाजता सुरू होतो. तुम्ही का विचारता?",
      ],
    ],
    [
      "Question word + do/does + subject + verb?",
      "Where / When / Why / How / What / Who",
    ],
    [
      gap(
        "___ do you live? (कुठे)",
        "Where",
        ["When", "Why"],
        "ठिकाण विचारण्यासाठी Where.",
      ),
      gap(
        "___ does the class start? (कधी)",
        "When",
        ["Where", "Who"],
        "वेळ विचारण्यासाठी When.",
      ),
      gap(
        "___ are you learning English? (का)",
        "Why",
        ["How", "Who"],
        "कारण विचारण्यासाठी Why.",
      ),
      gap(
        "___ do you go to work? (कसे)",
        "How",
        ["Why", "When"],
        "पद्धत विचारण्यासाठी How.",
      ),
      resp(
        "Where do you live?",
        "I live in Pune.",
        ["I live at ten.", "I live because I am happy."],
        "Where ला ठिकाणाने उत्तर द्या.",
      ),
      m2e(
        "तुम्ही कधी निघता?",
        "When do you leave?",
        ["When you leave?", "Where do you leave?"],
        "कधी = When. प्रश्नात When + do + you + leave? अशी रचना असते.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["प्रश्न विचारा", "Asking questions"],
      "तुम्ही नवीन वर्गात सहकाऱ्याला प्रश्न विचारता.",
      "तुम्ही: विद्यार्थी",
      [
        [
          "y",
          "वर्ग कधी सुरू होतो ते विचारा.",
          "When does the class start?",
          "When does…",
        ],
        ["o", "It starts at ten.", "तो दहा वाजता सुरू होतो."],
        ["y", "ते कुठे राहतात ते विचारा.", "Where do you live?", "Where do…"],
        ["o", "I live in Nashik.", "मी नाशिकमध्ये राहतो."],
      ],
    ),
  ),
  "yes-no": lessonKit(
    "yes-no",
    [
      "I can ask yes/no questions and give short answers.",
      "मी होय/नाही प्रश्न विचारू शकतो/शकते आणि लहान उत्तर देऊ शकतो/शकते.",
    ],
    [
      ["A", "Do you live in Pune?", "तुम्ही पुण्यात राहता का?"],
      ["B", "Yes, I do. Do you?", "हो, राहतो/राहते. तुम्ही?"],
      [
        "A",
        "No, I do not. Does your sister live here?",
        "नाही, मी राहत नाही. तुमची बहीण इथे राहते का?",
      ],
      ["B", "Yes, she does.", "हो, ती राहते."],
    ],
    [
      "Do + I/you/we/they + verb? → Yes, I do.",
      "Does + he/she/it + verb? → Yes, she does.",
    ],
    [
      gap("___ you live in Pune?", "Do", ["Does", "Are"], "you सोबत Do."),
      gap("___ she work here?", "Does", ["Do", "Is"], "she सोबत Does."),
      resp(
        "Does your brother work here?",
        "Yes, he does.",
        ["Yes, he works.", "Yes, he is does."],
        "Does… ला Yes, he does. असे लहान उत्तर.",
      ),
      resp(
        "Are you tired?",
        "Yes, I am.",
        ["Yes, I do.", "Yes, I tired."],
        "Are you…? ला Yes, I am.",
      ),
      m2e(
        "तिला इंग्रजी येते का?",
        "Does she know English?",
        ["Do she know English?", "Does she knows English?"],
        "she सोबत Does आणि क्रियापद मूळ रूप.",
      ),
      lis(
        "No, she does not.",
        "ऐका. उत्तर काय आहे?",
        "नाही",
        ["हो", "कदाचित"],
        "does not म्हणजे नाही.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["होय/नाही प्रश्न", "Quick questions"],
      "तुम्ही नवीन शेजाऱ्याशी बोलता.",
      "तुम्ही: शेजारी",
      [
        ["o", "Do you live in this building?", "तुम्ही या इमारतीत राहता का?"],
        ["y", "'हो, राहतो/राहते' असे सांगा.", "Yes, I do.", "Yes, I…"],
        [
          "o",
          "Does your family live here too?",
          "तुमचे कुटुंबही इथे राहते का?",
        ],
        ["y", "'हो, ते राहतात' असे सांगा.", "Yes, they do.", "Yes, they…"],
      ],
    ),
  ),
  negatives: lessonKit(
    "negatives",
    [
      "I can say what I do not do, and what is not true.",
      "मी काय करत नाही आणि काय खरे नाही ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "Do you drink coffee?", "तुम्ही कॉफी पिता का?"],
      [
        "B",
        "No, I do not drink coffee. I drink tea.",
        "नाही, मी कॉफी पीत नाही. मी चहा पितो/पिते.",
      ],
      ["A", "Is your brother at home?", "तुमचा भाऊ घरी आहे का?"],
      ["B", "No, he is not at home.", "नाही, तो घरी नाही."],
    ],
    [
      "I / you / we / they + do not + base verb",
      "he / she / it + does not + base verb",
      "am / is / are + not",
    ],
    [
      gap("I ___ not like coffee.", "do", ["does", "am"], "I सोबत do not."),
      gap(
        "She does not ___ on Sundays.",
        "work",
        ["works", "working"],
        "does not नंतर मूळ रूप work.",
      ),
      gap("He ___ not at home.", "is", ["does", "do"], "असणे दाखवताना is not."),
      e2m(
        "We are not ready.",
        "आम्ही तयार नाही.",
        ["आम्ही तयार आहोत.", "आम्ही उशिरा आलो."],
        "are not म्हणजे नाही आहोत.",
      ),
      m2e(
        "तो रविवारी काम करत नाही.",
        "He does not work on Sundays.",
        ["He not works on Sundays.", "He do not work on Sundays."],
        "he सोबत does not + मूळ रूप.",
      ),
      resp(
        "Do you drink coffee?",
        "No, I do not drink coffee.",
        ["No, I am not drink.", "No, I does not."],
        "नकारात do not + क्रियापद.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["आवडत नाही सांगणे", "Politely saying no"],
      "मित्र तुम्हाला कॉफी देतो.",
      "तुम्ही: पाहुणे",
      [
        ["o", "Would you like some coffee?", "तुम्हाला कॉफी हवी आहे का?"],
        [
          "y",
          "नम्रपणे नाही म्हणा आणि चहा मागा.",
          "No, thank you. I do not drink coffee. Tea, please.",
          "No, thank you. I do not…",
        ],
        ["o", "Sure. Do you want sugar?", "नक्की. साखर हवी आहे का?"],
        [
          "y",
          "तुम्हाला साखर नको असे सांगा.",
          "No, I do not want sugar.",
          "No, I do not…",
        ],
      ],
    ),
  ),
  possessives: lessonKit(
    "possessives",
    [
      "I can say whose things they are using my, your, his, her, our and their.",
      "my, your, his, her, our आणि their वापरून वस्तू कोणाच्या आहेत ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "Is this your phone?", "हा तुमचा फोन आहे का?"],
      [
        "B",
        "No, it is not my phone. It is her phone.",
        "नाही, तो माझा फोन नाही. तो तिचा फोन आहे.",
      ],
      ["A", "Where is their house?", "त्यांचे घर कुठे आहे?"],
      [
        "B",
        "Their house is near our school.",
        "त्यांचे घर आमच्या शाळेजवळ आहे.",
      ],
    ],
    ["my / your / his / her / our / their + noun"],
    [
      gap("This is ___ bag. (माझी)", "my", ["me", "I"], "मालकीसाठी my."),
      gap(
        "___ house is near our school. (त्यांचे)",
        "Their",
        ["They", "There"],
        "their = त्यांचे; there = तिथे.",
      ),
      gap(
        "Is this ___ phone? (तुमचा)",
        "your",
        ["you", "yours phone"],
        "नामापूर्वी your.",
      ),
      m2e(
        "हा तिचा फोन आहे.",
        "This is her phone.",
        ["This is she phone.", "This is hers phone."],
        "तिचा/तिची = her.",
      ),
      e2m(
        "Their house is near our school.",
        "त्यांचे घर आमच्या शाळेजवळ आहे.",
        ["आमचे घर त्यांच्या शाळेजवळ आहे.", "त्यांचे घर शाळेत आहे."],
        "Their = त्यांचे; our = आमच्या.",
      ),
      resp(
        "Is this your pen?",
        "No, it is his pen.",
        ["No, it is he pen.", "No, it is him."],
        "तो/त्याचा = his.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["हरवलेली वस्तू", "Whose is this?"],
      "ऑफिसमध्ये एक पिशवी सापडली आहे.",
      "तुम्ही: कर्मचारी",
      [
        ["o", "Is this your bag?", "ही तुमची पिशवी आहे का?"],
        [
          "y",
          "'नाही, ती माझी नाही; कदाचित तिची आहे' असे सांगा.",
          "No, it is not my bag. It is her bag.",
          "No, it is not my bag…",
        ],
        ["o", "Whose is that phone?", "तो फोन कोणाचा आहे?"],
        ["y", "तो त्यांचा आहे असे सांगा.", "It is their phone.", "It is…"],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b7",
  path: "beginner",
  title: "प्रश्न आणि नकार",
  en: "Simple questions and negatives",
  outcome: [
    "I can ask simple questions and say no politely.",
    "मी साधे प्रश्न विचारू शकतो/शकते आणि नम्रपणे नाही म्हणू शकतो/शकते.",
  ],
  lessons: ["question-words", "yes-no", "negatives", "possessives"],
  checkpoint: {
    scenario: [
      "You meet a new classmate and want to know about him.",
      "तुम्ही नवीन वर्गमित्राला भेटता आणि त्याच्याबद्दल जाणून घ्यायचे आहे.",
    ],
    ex: finish("b7", "cp", [
      resp(
        "Do you take the bus to college?",
        "No, I do not. I walk.",
        ["No, I am not walk.", "Yes, I does."],
        "नकारात do not + मूळ क्रियापद.",
      ),
      gap(
        "___ does your class finish? (कधी)",
        "When",
        ["Why", "Who"],
        "वेळेसाठी When.",
      ),
      gap(
        "Is this ___ notebook? (त्याची)",
        "his",
        ["he", "him"],
        "त्याची = his.",
      ),
      bld("तुम्ही चहा पिता का?", "Do you drink tea?", ["Does"], "you सोबत Do."),
    ]),
    speak:
      "नवीन वर्गमित्राला तीन प्रश्न विचारा: तो कुठे राहतो, तो कसा येतो आणि त्याला काय आवडते.",
  },
};
