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
    "greetings",
    "basics",
    "Greetings and how are you?",
    "भेटल्यावर काय म्हणायचे?",
    "वेळेनुसार अभिवादन करा: Good morning (सकाळी), Good afternoon (दुपारी), Good evening (संध्याकाळी). Good night फक्त झोपण्यापूर्वी किंवा रात्री निरोप घेताना म्हणतात. 'कसे आहात?' = How are you? उत्तर: I am fine, thank you. And you?",
    "Good morning + name · How are you? → I am fine, thank you. And you?",
    [
      ["Good morning, Asha!", "सुप्रभात आशा!"],
      ["How are you?", "तुम्ही कसे आहात?"],
      ["I am fine, thank you. And you?", "मी ठीक आहे, धन्यवाद. आणि तुम्ही?"],
      ["Good evening, sir.", "शुभ संध्याकाळ, सर."],
      ["See you tomorrow.", "उद्या भेटू."],
    ],
    "सकाळी, दुपारी आणि संध्याकाळी तुम्ही कोणाला काय म्हणाल ते तीन वाक्यांत बोला.",
  ),
];

export const kits: Record<string, Enrich> = {
  greetings: lessonKit(
    "greetings",
    [
      "I can greet someone and ask how they are.",
      "मी कोणालाही अभिवादन करू शकतो/शकते आणि ते कसे आहेत ते विचारू शकतो/शकते.",
    ],
    [
      ["A", "Good morning! How are you?", "सुप्रभात! तुम्ही कसे आहात?"],
      [
        "B",
        "I am fine, thank you. And you?",
        "मी ठीक आहे, धन्यवाद. आणि तुम्ही?",
      ],
      ["A", "I am very well, thanks.", "मी अगदी छान आहे, धन्यवाद."],
      ["B", "Good. See you later!", "छान. नंतर भेटू!"],
    ],
    [
      "Good morning / afternoon / evening.",
      "How are you? — I am fine, thank you. And you?",
      "See you later. / See you tomorrow.",
    ],
    [
      und(
        "सकाळचे नऊ वाजले आहेत. तुम्ही शिक्षकांना काय म्हणाल?",
        "Good morning",
        ["Good night", "Good evening"],
        "सकाळी Good morning म्हणतात. Good night फक्त झोपताना किंवा रात्री निरोप घेताना म्हणतात.",
      ),
      gap(
        "___ are you? — I am fine, thank you.",
        "How",
        ["What", "Where"],
        "'कसे आहात?' हा प्रश्न How are you? असा विचारतात.",
      ),
      e2m(
        "See you tomorrow.",
        "उद्या भेटू.",
        ["काल भेटलो.", "आता निघा."],
        "See you म्हणजे 'भेटू'. tomorrow म्हणजे उद्या.",
      ),
      m2e(
        "मी ठीक आहे, धन्यवाद.",
        "I am fine, thank you.",
        ["You are fine, please.", "I fine thank."],
        "I सोबत am वापरतो. Thank you म्हणजे धन्यवाद.",
      ),
      resp(
        "How are you?",
        "I am fine, thank you. And you?",
        ["My name is Asha.", "See you tomorrow."],
        "How are you? ला उत्तर म्हणून तुम्ही कसे आहात ते सांगा आणि समोरच्याला विचारा.",
      ),
      lis(
        "Good evening. How are you?",
        "ऐका. व्यक्ती दिवसाची कोणती वेळ सांगते?",
        "संध्याकाळ",
        ["सकाळ", "झोपण्याची वेळ"],
        "Evening म्हणजे संध्याकाळ. आधी Good evening ऐकू येते.",
      ),
      bld(
        "शुभ संध्याकाळ, तुम्ही कसे आहात?",
        "Good evening, how are you?",
        ["is"],
        "Good evening नंतर how are you? हा प्रश्न येतो.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["अभिवादन", "Greeting a colleague"],
      "सकाळी ऑफिसमध्ये तुम्ही सहकारी नेहाला भेटता.",
      "तुम्ही: सहकारी",
      [
        ["o", "Good morning! How are you?", "सुप्रभात! तुम्ही कसे आहात?"],
        [
          "y",
          "अभिवादन करा, तुम्ही ठीक आहात असे सांगा आणि तिला विचारा.",
          "Good morning, Neha. I am fine, thank you. And you?",
          "Good morning… I am fine…",
        ],
        [
          "o",
          "I am very well, thanks. See you at the meeting!",
          "मी अगदी छान आहे, धन्यवाद. बैठकीत भेटू!",
        ],
        [
          "y",
          "'ठीक आहे, नंतर भेटू' असे सांगा.",
          "Okay, see you later.",
          "See you…",
        ],
      ],
    ),
  ),
  intro: lessonKit(
    "intro",
    [
      "I can introduce myself and ask someone's name.",
      "मी स्वतःची ओळख करून देऊ शकतो/शकते आणि समोरच्याचे नाव विचारू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Hello! I am Neha. What is your name?",
        "नमस्कार! मी नेहा. तुमचे नाव काय?",
      ],
      [
        "B",
        "My name is Rahul. Nice to meet you.",
        "माझे नाव राहुल आहे. तुम्हाला भेटून आनंद झाला.",
      ],
      [
        "A",
        "Nice to meet you too. Where are you from?",
        "मलाही आनंद झाला. तुम्ही कुठले आहात?",
      ],
      [
        "B",
        "I am from Pune. I am a student.",
        "मी पुण्याचा/पुण्याची आहे. मी विद्यार्थी आहे.",
      ],
    ],
    [
      "My name is … / I am …",
      "I am from … (गाव/शहर)",
      "What is your name? / Where are you from?",
    ],
    [],
    rolePlay(
      "",
      "beginner",
      ["नवीन ओळख", "Meeting someone new"],
      "तुम्ही एका कार्यक्रमात नवीन व्यक्तीला भेटता.",
      "तुम्ही: पाहुणे",
      [
        [
          "o",
          "Hello! I am Neha. What is your name?",
          "नमस्कार! मी नेहा. तुमचे नाव काय?",
        ],
        [
          "y",
          "स्वतःचे नाव सांगा आणि भेटून आनंद झाला असे म्हणा.",
          "My name is Rahul. Nice to meet you.",
          "My name is…",
        ],
        [
          "o",
          "Nice to meet you too. Where are you from?",
          "मलाही आनंद झाला. तुम्ही कुठले आहात?",
        ],
        [
          "y",
          "तुमचे गाव सांगा आणि तिला काम विचारा.",
          "I am from Pune. What do you do?",
          "I am from…",
        ],
        [
          "o",
          "I am a teacher. I work in a school.",
          "मी शिक्षिका आहे. मी शाळेत काम करते.",
        ],
        [
          "y",
          "'छान आहे' असे म्हणा आणि पुन्हा भेटण्याबद्दल बोला.",
          "That is nice. See you again.",
          "That is…",
        ],
      ],
      true,
    ),
  ),
  polite: lessonKit(
    "polite",
    [
      "I can use polite words: please, thank you, sorry and excuse me.",
      "मी नम्र शब्द वापरू शकतो/शकते: please, thank you, sorry आणि excuse me.",
    ],
    [
      ["A", "Excuse me, is this seat free?", "माफ करा, ही जागा रिकामी आहे का?"],
      ["B", "Yes, please sit down.", "हो, कृपया बसा."],
      ["A", "Thank you very much.", "खूप धन्यवाद."],
      ["B", "You are welcome.", "आपले स्वागत आहे."],
    ],
    [
      "Please + request",
      "Thank you. — You are welcome.",
      "Sorry, I am late. / Excuse me, can you help me?",
    ],
    [
      und(
        "तुमचा धक्का चुकून एखाद्याला लागला. तुम्ही काय म्हणाल?",
        "Sorry",
        ["Welcome", "Excuse"],
        "चूक झाल्यावर Sorry म्हणतात.",
      ),
      resp(
        "Thank you very much.",
        "You are welcome.",
        ["Excuse me.", "Good night."],
        "Thank you ला उत्तर You are welcome असे देतात.",
      ),
      gap(
        "___ me, where is the station?",
        "Excuse",
        ["Sorry", "Please"],
        "कोणाचे लक्ष वेधण्यासाठी Excuse me म्हणतात.",
      ),
      m2e(
        "कृपया थांबा.",
        "Please wait.",
        ["Sorry wait.", "Thank you wait."],
        "विनंती नम्र करण्यासाठी Please वापरा.",
      ),
      e2m(
        "You are welcome.",
        "आपले स्वागत आहे.",
        ["तुम्ही उशिरा आलात.", "तुम्ही कुठे आहात?"],
        "You are welcome म्हणजे 'आभार मानायची गरज नाही'.",
      ),
      lis(
        "Sorry, I am late.",
        "ऐका. बोलणारी व्यक्ती काय सांगते?",
        "मला उशीर झाला आहे.",
        ["मला मदत हवी आहे.", "मी घरी आहे."],
        "late म्हणजे उशीर. Sorry, I am late म्हणजे माफ करा, मला उशीर झाला.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["नम्र बोलणे", "Being polite"],
      "तुम्ही बसमध्ये एका रिकाम्या जागेबद्दल विचारता.",
      "तुम्ही: प्रवासी",
      [
        [
          "y",
          "नम्रपणे लक्ष वेधून जागा रिकामी आहे का ते विचारा.",
          "Excuse me, is this seat free?",
          "Excuse me…",
        ],
        ["o", "Yes, please sit down.", "हो, कृपया बसा."],
        ["y", "आभार माना.", "Thank you very much.", "Thank you…"],
        ["o", "You are welcome.", "आपले स्वागत आहे."],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b1",
  path: "beginner",
  title: "भेट आणि ओळख",
  en: "Greetings and introductions",
  outcome: [
    "I can greet people, introduce myself and be polite.",
    "मी लोकांना अभिवादन करू शकतो/शकते, स्वतःची ओळख करून देऊ शकतो/शकते आणि नम्रपणे बोलू शकतो/शकते.",
  ],
  lessons: ["greetings", "intro", "polite"],
  checkpoint: {
    scenario: [
      "You meet your neighbour's guest in the evening.",
      "संध्याकाळी तुम्ही शेजाऱ्यांच्या पाहुण्याला भेटता.",
    ],
    ex: finish("b1", "cp", [
      und(
        "संध्याकाळी पाहुण्याला पहिल्यांदा काय म्हणाल?",
        "Good evening",
        ["Good morning", "Good night"],
        "संध्याकाळी Good evening म्हणतात.",
      ),
      resp(
        "Hello, I am Ravi. What is your name?",
        "Hello Ravi, my name is Sana. Nice to meet you.",
        ["I am fine, thank you.", "See you tomorrow."],
        "नाव विचारले तर नाव सांगा आणि भेटून आनंद झाला असे म्हणा.",
      ),
      gap(
        "I am ___ Nashik. (मी नाशिकचा/ची आहे)",
        "from",
        ["at", "is"],
        "आपण कुठले आहोत हे सांगताना from वापरा.",
      ),
      bld(
        "तुम्हाला भेटून आनंद झाला.",
        "Nice to meet you.",
        ["am"],
        "भेटल्यावर Nice to meet you म्हणा.",
      ),
    ]),
    speak:
      "पाहुण्याला अभिवादन करा, तुमचे नाव आणि गाव सांगा आणि त्यांचे नाव विचारा.",
  },
};
