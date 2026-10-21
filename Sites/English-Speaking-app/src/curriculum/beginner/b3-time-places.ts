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
    "places",
    "basics",
    "Places in town",
    "ठिकाणे आणि ती कुठे आहेत",
    "शहरातील ठिकाणे: bank, market, hospital, school, station, bus stop, post office, park. ठिकाण विचारण्यासाठी Where is the …? म्हणा. उत्तरासाठी near (जवळ), next to (शेजारी), opposite (समोर), behind (मागे) वापरा.",
    "Where is the + place? → It is near / next to / opposite the …",
    [
      ["Where is the bank?", "बँक कुठे आहे?"],
      ["It is next to the post office.", "ती पोस्ट ऑफिसच्या शेजारी आहे."],
      ["The hospital is opposite the market.", "हॉस्पिटल बाजारासमोर आहे."],
      ["The school is near my house.", "शाळा माझ्या घराजवळ आहे."],
    ],
    "तुमच्या घराजवळील तीन ठिकाणे कुठे आहेत ते सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  "days-months": lessonKit(
    "days-months",
    [
      "I can say the days and months and talk about dates.",
      "मी वार आणि महिने सांगू शकतो/शकते आणि तारखांबद्दल बोलू शकतो/शकते.",
    ],
    [
      ["A", "What day is it today?", "आज कोणता वार आहे?"],
      ["B", "Today is Monday.", "आज सोमवार आहे."],
      ["A", "When is your birthday?", "तुमचा वाढदिवस कधी आहे?"],
      ["B", "My birthday is in March.", "माझा वाढदिवस मार्चमध्ये आहे."],
    ],
    ["Today is + day.", "on + day · in + month"],
    [
      und(
        "'Wednesday' म्हणजे कोणता वार?",
        "बुधवार",
        ["गुरुवार", "मंगळवार"],
        "Wednesday म्हणजे बुधवार.",
      ),
      gap(
        "I have a meeting ___ Friday.",
        "on",
        ["in", "at"],
        "वारांसाठी on वापरा: on Friday.",
      ),
      gap(
        "My birthday is ___ March.",
        "in",
        ["on", "at"],
        "महिन्यासाठी in वापरा: in March.",
      ),
      m2e(
        "आज रविवार आहे.",
        "Today is Sunday.",
        ["Today is Monday.", "Today are Sunday."],
        "रविवार = Sunday.",
      ),
      resp(
        "What day is it today?",
        "Today is Tuesday.",
        ["It is in March.", "I am fine."],
        "वार विचारला तर वार सांगा.",
      ),
      lis(
        "The class is on Saturday.",
        "ऐका. वर्ग कोणत्या वारी आहे?",
        "शनिवार",
        ["रविवार", "शुक्रवार"],
        "Saturday म्हणजे शनिवार.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["वार आणि तारीख", "Days and dates"],
      "तुम्ही सहकाऱ्यासोबत बैठकीचा दिवस ठरवता.",
      "तुम्ही: सहकारी",
      [
        ["o", "When is the meeting?", "बैठक कधी आहे?"],
        [
          "y",
          "बैठक शुक्रवारी आहे असे सांगा.",
          "The meeting is on Friday.",
          "The meeting is on…",
        ],
        ["o", "And when is your birthday?", "आणि तुमचा वाढदिवस कधी आहे?"],
        [
          "y",
          "तुमचा वाढदिवस कोणत्या महिन्यात आहे ते सांगा.",
          "My birthday is in May.",
          "My birthday is in…",
        ],
      ],
    ),
  ),
  time: lessonKit(
    "time",
    [
      "I can ask and tell the time.",
      "मी किती वाजले ते विचारू आणि सांगू शकतो/शकते.",
    ],
    [
      ["A", "Excuse me, what time is it?", "माफ करा, किती वाजले?"],
      ["B", "It is half past nine.", "साडेनऊ वाजले आहेत."],
      ["A", "What time does the class start?", "वर्ग किती वाजता सुरू होतो?"],
      ["B", "It starts at ten.", "तो दहा वाजता सुरू होतो."],
    ],
    ["What time is it? — It is …", "at + time"],
    [
      und(
        "'It is five o'clock.' म्हणजे काय?",
        "पाच वाजले आहेत.",
        ["पाच मिनिटे झाली.", "साडेपाच वाजले."],
        "o'clock म्हणजे ठीक तास पूर्ण.",
      ),
      und(
        "'half past nine' म्हणजे किती?",
        "साडेनऊ",
        ["सव्वानऊ", "नऊ वाजून पाच"],
        "half past म्हणजे अर्धा तास उलटला: 9:30.",
      ),
      gap(
        "The class starts ___ ten.",
        "at",
        ["on", "in"],
        "वेळेसाठी at वापरा.",
      ),
      lis(
        "It is quarter past seven.",
        "ऐका. किती वाजले?",
        "सव्वासात",
        ["पावणेसात", "साडेसात"],
        "quarter past म्हणजे पंधरा मिनिटे उलटली: 7:15.",
      ),
      m2e(
        "किती वाजले?",
        "What time is it?",
        ["What is time it?", "What time it is?"],
        "प्रश्नात is आधी येते: What time is it?",
      ),
      resp(
        "What time does the class start?",
        "It starts at ten.",
        ["It is in March.", "Yes, it is Monday."],
        "वेळ विचारली तर at + वेळ सांगा.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["वेळ विचारणे", "Asking the time"],
      "रस्त्यावर तुम्ही एका व्यक्तीला वेळ विचारता.",
      "तुम्ही: प्रवासी",
      [
        [
          "y",
          "नम्रपणे वेळ विचारा.",
          "Excuse me, what time is it?",
          "Excuse me…",
        ],
        ["o", "It is half past nine.", "साडेनऊ वाजले आहेत."],
        [
          "y",
          "आभार माना आणि बस किती वाजता येते ते विचारा.",
          "Thank you. What time does the bus come?",
          "Thank you…",
        ],
        ["o", "It comes at ten.", "ती दहा वाजता येते."],
      ],
    ),
  ),
  places: lessonKit(
    "places",
    [
      "I can ask where a place is and say where something is.",
      "मी एखादे ठिकाण कुठे आहे ते विचारू शकतो/शकते आणि सांगू शकतो/शकते.",
    ],
    [
      ["A", "Excuse me, where is the bank?", "माफ करा, बँक कुठे आहे?"],
      ["B", "It is next to the post office.", "ती पोस्ट ऑफिसच्या शेजारी आहे."],
      ["A", "Is the market near here?", "बाजार इथून जवळ आहे का?"],
      ["B", "Yes. It is opposite the bus stop.", "हो. तो बस स्टॉपसमोर आहे."],
    ],
    ["Where is the + place?", "It is next to / near / opposite the …"],
    [
      und(
        "'opposite the market' म्हणजे काय?",
        "बाजारासमोर",
        ["बाजाराच्या मागे", "बाजाराच्या आत"],
        "opposite म्हणजे समोर.",
      ),
      gap(
        "The school is ___ my house. (जवळ)",
        "near",
        ["opposite", "behind"],
        "near म्हणजे जवळ.",
      ),
      m2e(
        "बँक कुठे आहे?",
        "Where is the bank?",
        ["Where the bank is?", "What is the bank?"],
        "प्रश्नात Where is आधी येते.",
      ),
      lis(
        "The hospital is behind the school.",
        "ऐका. हॉस्पिटल कुठे आहे?",
        "शाळेच्या मागे",
        ["शाळेसमोर", "शाळेजवळ नाही"],
        "behind म्हणजे मागे.",
      ),
      resp(
        "Where is the post office?",
        "It is next to the bank.",
        ["It is five rupees.", "At ten o'clock."],
        "ठिकाण विचारले तर ठिकाण सांगा.",
      ),
      bld(
        "बाजार बस स्टॉपसमोर आहे.",
        "The market is opposite the bus stop.",
        ["near"],
        "opposite म्हणजे समोर.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["ठिकाण विचारणे", "Asking where a place is"],
      "तुम्ही नवीन भागात आहात आणि बँक शोधत आहात.",
      "तुम्ही: नवीन रहिवासी",
      [
        [
          "y",
          "बँक कुठे आहे ते नम्रपणे विचारा.",
          "Excuse me, where is the bank?",
          "Excuse me, where…",
        ],
        [
          "o",
          "It is next to the post office.",
          "ती पोस्ट ऑफिसच्या शेजारी आहे.",
        ],
        [
          "y",
          "बाजार जवळ आहे का ते विचारा.",
          "Is the market near here?",
          "Is the market…",
        ],
        ["o", "Yes, it is opposite the bus stop.", "हो, तो बस स्टॉपसमोर आहे."],
      ],
    ),
  ),
  "in-on-at": lessonKit(
    "in-on-at",
    [
      "I can use in, on and at for places and times.",
      "मी जागा आणि वेळेसाठी in, on आणि at वापरू शकतो/शकते.",
    ],
    [
      ["A", "Where are my keys?", "माझ्या चाव्या कुठे आहेत?"],
      ["B", "They are on the table.", "त्या टेबलावर आहेत."],
      ["A", "And where is mother?", "आणि आई कुठे आहे?"],
      ["B", "She is in the kitchen.", "ती स्वयंपाकघरात आहे."],
    ],
    [
      "in + room / city / month",
      "on + surface / day",
      "at + place point / time",
    ],
    [
      gap(
        "The keys are ___ the table.",
        "on",
        ["in", "at"],
        "टेबलाच्या पृष्ठभागावर असल्यास on वापरा.",
      ),
      gap(
        "Mother is ___ the kitchen.",
        "in",
        ["on", "at"],
        "खोलीच्या आत असल्यास in वापरा.",
      ),
      gap(
        "I am ___ the bus stop.",
        "at",
        ["in", "on"],
        "ठराविक जागी असल्यास at वापरा.",
      ),
      e2m(
        "We live in Pune.",
        "आम्ही पुण्यात राहतो.",
        ["आम्ही पुण्याला जातो.", "आम्ही पुण्यात खेळतो."],
        "live म्हणजे राहणे; in Pune म्हणजे पुण्यात.",
      ),
      m2e(
        "मी बस स्टॉपवर आहे.",
        "I am at the bus stop.",
        ["I am in the bus stop.", "I at the bus stop."],
        "ठराविक जागेसाठी at.",
      ),
      resp(
        "Where is my phone?",
        "It is on the table.",
        ["It is at ten.", "It is in March."],
        "वस्तू कुठे आहे ते सांगताना on / in / at वापरा.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["वस्तू शोधणे", "Finding things"],
      "घरी तुम्ही तुमची पिशवी शोधता.",
      "तुम्ही: घरातील व्यक्ती",
      [
        [
          "y",
          "तुमची पिशवी कुठे आहे ते विचारा.",
          "Where is my bag?",
          "Where is…",
        ],
        ["o", "It is on the chair.", "ती खुर्चीवर आहे."],
        ["y", "आई कुठे आहे ते विचारा.", "Where is mother?", "Where is…"],
        ["o", "She is in the kitchen.", "ती स्वयंपाकघरात आहे."],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b3",
  path: "beginner",
  title: "वेळ आणि ठिकाणे",
  en: "Time and places",
  outcome: [
    "I can talk about days, times and where places are.",
    "मी वार, वेळ आणि ठिकाणे कुठे आहेत याबद्दल बोलू शकतो/शकते.",
  ],
  lessons: ["days-months", "time", "places", "in-on-at"],
  checkpoint: {
    scenario: [
      "You need to meet a friend at a library you do not know.",
      "तुम्हाला मित्राला अशा ग्रंथालयात भेटायचे आहे जे तुम्हाला माहीत नाही.",
    ],
    ex: finish("b3", "cp", [
      resp(
        "Where is the library?",
        "It is opposite the hospital.",
        ["It is on Friday.", "It is in March."],
        "ठिकाण विचारले तर जागा सांगा.",
      ),
      gap("Let us meet ___ five o'clock.", "at", ["in", "on"], "वेळेसाठी at."),
      gap("Let us meet ___ Saturday.", "on", ["at", "in"], "वारासाठी on."),
      lis(
        "The library is next to the bank. It opens at nine.",
        "ऐका. ग्रंथालय किती वाजता उघडते?",
        "नऊ वाजता",
        ["दहा वाजता", "पाच वाजता"],
        "opens at nine म्हणजे नऊ वाजता उघडते.",
      ),
    ]),
    speak:
      "तुमच्या मित्राला सांगा की तुम्ही त्याला शनिवारी पाच वाजता बस स्टॉपजवळ भेटाल.",
  },
};
