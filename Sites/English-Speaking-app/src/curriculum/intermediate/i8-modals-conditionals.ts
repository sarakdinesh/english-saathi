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
    "conditionals",
    "tenses",
    "If … (real and unreal situations)",
    "जर … तर",
    "खऱ्या शक्यतेसाठी: If + present, will + verb (If it rains, I will stay home). काल्पनिक किंवा कमी शक्यतेसाठी: If + past, would + verb (If I had more time, I would learn French). दोन्ही वाक्यांचा अर्थ वेगळा आहे: पहिले शक्य आहे, दुसरे आत्ता खरे नाही.",
    "If + present, will + verb · If + past, would + verb",
    [
      [
        "If it rains tomorrow, I will stay at home.",
        "उद्या पाऊस पडला तर मी घरीच राहीन.",
      ],
      [
        "If you practise every day, your speaking will improve.",
        "तुम्ही रोज सराव केलात तर तुमचे बोलणे सुधारेल.",
      ],
      [
        "If I had more time, I would learn another language.",
        "मला जास्त वेळ असता तर मी दुसरी भाषा शिकलो/शिकले असते.",
      ],
      [
        "If I were you, I would ask for help.",
        "मी तुमच्या जागी असतो/असते तर मदत मागितली असती.",
      ],
    ],
    "'उद्या मला सुट्टी मिळाली तर…' आणि 'माझ्याकडे खूप पैसे असते तर…' अशी प्रत्येकी दोन वाक्ये बोला.",
  ),
  newLesson(
    "tense-contrast",
    "tenses",
    "Past simple or present perfect?",
    "कोणता काळ कधी?",
    "संपलेल्या, ठरावीक वेळेसाठी simple past: I visited Goa in 2022. आत्तापर्यंतचा अनुभव किंवा परिणामासाठी present perfect: I have visited Goa (अजून त्याचा संबंध आहे). ठरावीक वेळ (yesterday, last year, in 2022) असेल तर simple past; ever, never, already, yet, since, for असेल तर present perfect.",
    "ठरावीक वेळ → simple past · अनुभव/आत्तापर्यंत → present perfect",
    [
      ["I visited Goa in 2022.", "मी २०२२ मध्ये गोव्याला गेलो/गेले."],
      ["I have visited Goa twice.", "मी गोव्याला दोनदा गेलो/गेले आहे."],
      ["She has lived here since 2019.", "ती २०१९ पासून इथे राहते आहे."],
      ["She lived in Nagpur before that.", "त्याआधी ती नागपूरमध्ये राहत होती."],
    ],
    "तुमच्या आयुष्यातील एक संपलेली घटना आणि आत्तापर्यंतचे एक अनुभव ह्यातील फरक दोन वाक्यांत सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  should: lessonKit(
    "should",
    ["I can give and ask for advice.", "मी सल्ला देऊ आणि मागू शकतो/शकते."],
    [
      [
        "A",
        "I want to improve my English. What should I do?",
        "मला माझे इंग्रजी सुधारायचे आहे. मी काय करावे?",
      ],
      [
        "B",
        "You should practise every day, and you should not worry about mistakes.",
        "तुम्ही रोज सराव करायला हवा आणि चुकांची काळजी करू नये.",
      ],
      ["A", "Should I join a class?", "मी वर्गात सहभागी व्हावे का?"],
      [
        "B",
        "I think you should, but a short daily practice is more important.",
        "मला वाटते तुम्ही व्हावे, पण रोजचा थोडा सराव अधिक महत्त्वाचा आहे.",
      ],
    ],
    [
      "You should + base verb",
      "You should not + base verb",
      "What should I do? · Should I …?",
    ],
    [
      gap(
        "You ___ practise every day.",
        "should",
        ["are", "will be"],
        "सल्ल्यासाठी should.",
      ),
      gap(
        "You should ___ worry.",
        "not",
        ["no", "don't"],
        "should not म्हणजे करू नये.",
      ),
      resp(
        "What should I do to improve my speaking?",
        "You should practise a little every day.",
        ["You should to practise.", "You practise should daily."],
        "सल्ल्यासाठी should + मूळ रूप.",
      ),
      e2m(
        "We should leave early.",
        "आपण लवकर निघायला हवे.",
        ["आपण लवकर निघालो.", "आपण निघणार नाही."],
        "should म्हणजे हवे/करायला हवे.",
      ),
      m2e(
        "तुम्ही काळजी करू नये.",
        "You should not worry.",
        ["You not should worry.", "You should not to worry."],
        "should not + मूळ रूप.",
      ),
      lis(
        "You should drink more water and sleep early.",
        "ऐका. कोणता सल्ला दिला आहे?",
        "जास्त पाणी प्या आणि लवकर झोपा",
        ["कमी पाणी प्या", "उशिरा झोपा"],
        "should drink more water आणि sleep early.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["सल्ला मागणे", "Asking for advice"],
      "सहकारी तुम्हाला त्याच्या अडचणीबद्दल सांगतो.",
      "तुम्ही: सहकारी",
      [
        [
          "o",
          "I get nervous when I speak English. What should I do?",
          "इंग्रजी बोलताना मला भीती वाटते. मी काय करावे?",
        ],
        [
          "y",
          "दोन सल्ले द्या.",
          "You should practise with a friend, and you should not worry about mistakes.",
          "You should… and you should not…",
        ],
        ["o", "Should I record myself?", "मी स्वतःला रेकॉर्ड करावे का?"],
        [
          "y",
          "तुमचे मत द्या आणि कारण सांगा.",
          "Yes, you should, because you can hear your progress.",
          "Yes, you should, because…",
        ],
        ["o", "Good idea.", "छान कल्पना."],
        [
          "y",
          "त्यालाही विचारा की त्याने कधी प्रयत्न केला आहे का.",
          "Have you ever tried that?",
          "Have you ever…",
        ],
      ],
    ),
  ),
  must: lessonKit(
    "must",
    [
      "I can talk about rules and strong necessity.",
      "मी नियम आणि ठाम गरज याबद्दल बोलू शकतो/शकते.",
    ],
    [
      [
        "A",
        "You must wear a helmet on this road.",
        "या रस्त्यावर तुम्ही हेल्मेट घालायलाच हवे.",
      ],
      [
        "B",
        "Okay. Must I wear it in the village too?",
        "ठीक आहे. गावातही मला ते घालावे लागेल का?",
      ],
      [
        "A",
        "Yes. You must not park here, but you do not have to come early.",
        "हो. तुम्ही इथे गाडी लावू नये, पण लवकर येण्याची गरज नाही.",
      ],
      ["B", "Understood. Thank you.", "समजले. धन्यवाद."],
    ],
    [
      "must + base verb (ठाम गरज)",
      "must not (मनाई)",
      "do not have to (गरज नाही)",
    ],
    [
      und(
        "'You must not park here.' याचा अर्थ काय?",
        "तुम्ही इथे गाडी लावायची नाही",
        ["तुम्हाला गाडी लावायलाच हवी", "तुम्हाला गाडी लावायची गरज नाही"],
        "must not म्हणजे मनाई.",
      ),
      und(
        "'You do not have to come early.' याचा अर्थ काय?",
        "लवकर येण्याची गरज नाही (आलात तरी चालते)",
        ["लवकर येऊ नका", "लवकर आलेच पाहिजे"],
        "do not have to म्हणजे गरज नाही; मनाई नव्हे.",
      ),
      gap(
        "You ___ wear a helmet. (अनिवार्य)",
        "must",
        ["may", "might"],
        "अनिवार्यतेसाठी must.",
      ),
      e2m(
        "You must wear a helmet.",
        "तुम्ही हेल्मेट घालायलाच हवे.",
        ["तुम्ही हेल्मेट घालू शकता.", "तुम्ही हेल्मेट घालू नये."],
        "must म्हणजे घालायलाच हवे.",
      ),
      resp(
        "Do I have to come early tomorrow?",
        "No, you do not have to. Ten o'clock is fine.",
        ["No, you must not to.", "Yes, do not have to."],
        "do not have to = गरज नाही.",
      ),
      lis(
        "Visitors must not use their phones in this room.",
        "ऐका. येथे काय मनाई आहे?",
        "फोन वापरणे",
        ["बोलणे", "बसणे"],
        "must not use phones म्हणजे फोन वापरायला मनाई.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["कामाचे नियम", "Explaining rules"],
      "तुम्ही नवीन सहकाऱ्याला ऑफिसचे नियम सांगता.",
      "तुम्ही: वरिष्ठ सहकारी",
      [
        [
          "o",
          "Are there any rules I should know?",
          "मला माहीत असावेत असे काही नियम आहेत का?",
        ],
        [
          "y",
          "एक अनिवार्य नियम सांगा.",
          "Yes. You must wear your ID card at all times.",
          "Yes. You must…",
        ],
        ["o", "Anything I must not do?", "मी काही करू नये असे आहे का?"],
        [
          "y",
          "एक मनाई सांगा आणि एक गरज नसलेली गोष्ट सांगा.",
          "You must not use your phone in the meeting room. You do not have to come before nine.",
          "You must not… You do not have to…",
        ],
        ["o", "That is clear.", "समजले."],
        [
          "y",
          "विचारा त्यांना काही शंका आहेत का.",
          "Great. Do you have any questions?",
          "Great. Do you have…",
        ],
      ],
    ),
  ),
  "may-might": lessonKit(
    "may-might",
    [
      "I can talk about possibilities and ask permission.",
      "मी शक्यतांबद्दल बोलू शकतो/शकते आणि परवानगी मागू शकतो/शकते.",
    ],
    [
      ["A", "Will you come to the party?", "तुम्ही पार्टीला याल का?"],
      [
        "B",
        "I might be late. It may rain, so I am not sure.",
        "मला कदाचित उशीर होईल. पाऊस पडू शकतो, म्हणून मला खात्री नाही.",
      ],
      ["A", "May I join you for lunch?", "मी तुमच्यासोबत जेवायला येऊ का?"],
      ["B", "Of course. Please come in.", "नक्कीच. कृपया आत या."],
    ],
    ["may / might + base verb (शक्यता)", "May I + base verb? (परवानगी)"],
    [
      gap("It ___ rain today.", "may", ["must", "does"], "शक्यतेसाठी may."),
      gap(
        "I ___ be late. (कदाचित)",
        "might",
        ["must", "do"],
        "कमी शक्यतेसाठी might.",
      ),
      gap("___ I come in?", "May", ["Must", "Does"], "नम्र परवानगीसाठी May I?"),
      e2m(
        "It may rain tomorrow.",
        "उद्या पाऊस पडू शकतो.",
        ["उद्या पाऊस पडलाच पाहिजे.", "काल पाऊस पडला."],
        "may म्हणजे शक्यता.",
      ),
      resp(
        "May I use your phone?",
        "Of course. Here you are.",
        ["Of course. I may.", "Yes may."],
        "परवानगी द्या.",
      ),
      lis(
        "It might rain, so take an umbrella.",
        "ऐका. काय घ्यायला सांगितले?",
        "छत्री",
        ["टोपी", "पाणी"],
        "umbrella म्हणजे छत्री.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["शक्यता सांगणे", "Talking about possibilities"],
      "मित्र उद्याच्या योजनेबद्दल विचारतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "Are we still going out tomorrow?",
          "आपण उद्या बाहेर जात आहोत ना?",
        ],
        [
          "y",
          "'कदाचित पाऊस पडेल' असे सांगा आणि पर्याय सुचवा.",
          "It may rain, so we might need an indoor plan.",
          "It may rain, so we might…",
        ],
        [
          "o",
          "Good point. What do you suggest?",
          "चांगला मुद्दा. तुम्ही काय सुचवता?",
        ],
        [
          "y",
          "पर्याय सुचवा आणि विचारा त्यांना चालेल का.",
          "We could meet at the café. Does that work for you?",
          "We could… Does that work…",
        ],
        ["o", "Yes, that works.", "हो, चालेल."],
        [
          "y",
          "'मी कदाचित थोडा उशिरा येईन' असे सांगा.",
          "I might be ten minutes late.",
          "I might be…",
        ],
      ],
    ),
  ),
  conditionals: lessonKit(
    "conditionals",
    [
      "I can talk about real and imaginary situations with if.",
      "मी if वापरून खऱ्या आणि काल्पनिक परिस्थितींबद्दल बोलू शकतो/शकते.",
    ],
    [
      [
        "A",
        "What will you do if it rains tomorrow?",
        "उद्या पाऊस पडला तर तुम्ही काय कराल?",
      ],
      [
        "B",
        "If it rains, I will stay at home and study.",
        "पाऊस पडला तर मी घरी राहून अभ्यास करेन.",
      ],
      [
        "A",
        "And if you had more free time?",
        "आणि जर तुमच्याकडे जास्त मोकळा वेळ असता तर?",
      ],
      [
        "B",
        "If I had more time, I would learn another language.",
        "मला जास्त वेळ असता तर मी दुसरी भाषा शिकलो/शिकले असते.",
      ],
    ],
    ["If + present, will + verb (शक्य)", "If + past, would + verb (काल्पनिक)"],
    [
      gap(
        "If it rains tomorrow, I ___ stay at home.",
        "will",
        ["would", "am"],
        "खऱ्या शक्यतेसाठी If + present, will.",
      ),
      gap(
        "If I ___ more time, I would learn French.",
        "had",
        ["have", "will have"],
        "काल्पनिक: If + past (had).",
      ),
      und(
        "कोणते वाक्य काल्पनिक आहे (आत्ता खरे नाही)?",
        "If I had a car, I would drive to work.",
        ["If it rains, I will take a bus.", "If you call me, I will answer."],
        "If + past + would म्हणजे काल्पनिक.",
      ),
      e2m(
        "If you practise every day, your speaking will improve.",
        "तुम्ही रोज सराव केलात तर तुमचे बोलणे सुधारेल.",
        ["तुम्ही सराव केला नाही.", "तुमचे बोलणे आधीच सुधारले."],
        "If + present, will म्हणजे शक्य परिणाम.",
      ),
      resp(
        "What would you do if you won a lot of money?",
        "If I won a lot of money, I would travel with my family.",
        ["If I win lot money I will travelled.", "I would if win."],
        "काल्पनिक प्रश्नाला If + past, would.",
      ),
      m2e(
        "मी तुमच्या जागी असतो तर मदत मागितली असती.",
        "If I were you, I would ask for help.",
        [
          "If I am you, I will ask for help.",
          "If I was you, I will asking for help.",
        ],
        "सल्ल्यासाठी If I were you, I would…",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["जर … तर", "What if…?"],
      "मित्र तुमच्या योजनांबद्दल विचारतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "What will you do if it rains on Sunday?",
          "रविवारी पाऊस पडला तर तुम्ही काय कराल?",
        ],
        [
          "y",
          "खऱ्या शक्यतेसाठी उत्तर द्या.",
          "If it rains, I will stay at home and watch a film.",
          "If it rains, I will…",
        ],
        [
          "o",
          "And what would you do if you had a free month?",
          "आणि तुम्हाला एक महिना मोकळा मिळाला तर काय कराल?",
        ],
        [
          "y",
          "काल्पनिक उत्तर द्या.",
          "If I had a free month, I would travel around India.",
          "If I had…, I would…",
        ],
        ["o", "Sounds great!", "छान वाटते!"],
        [
          "y",
          "त्याला तोच प्रश्न विचारा.",
          "What would you do?",
          "What would you…",
        ],
      ],
    ),
  ),
  "tense-contrast": lessonKit(
    "tense-contrast",
    [
      "I can choose between past simple and present perfect.",
      "मी simple past आणि present perfect यांतून योग्य काळ निवडू शकतो/शकते.",
    ],
    [
      ["A", "Have you ever visited Goa?", "तुम्ही कधी गोव्याला गेला आहात का?"],
      [
        "B",
        "Yes, I have. I visited it in 2022.",
        "हो. मी २०२२ मध्ये तिथे गेलो होतो/गेले होते.",
      ],
      [
        "A",
        "How long have you lived in Pune?",
        "तुम्ही पुण्यात किती काळ राहत आहात?",
      ],
      [
        "B",
        "I have lived here since 2019. Before that, I lived in Nagpur.",
        "मी २०१९ पासून इथे राहत आहे. त्याआधी मी नागपूरमध्ये राहत होतो/होते.",
      ],
    ],
    [
      "ठरावीक वेळ (in 2022, last year) → simple past",
      "ever, never, already, yet, since, for → present perfect",
    ],
    [
      gap(
        "I ___ Goa in 2022.",
        "visited",
        ["have visited", "visit"],
        "in 2022 सारखी ठरावीक वेळ असेल तर simple past.",
      ),
      gap(
        "She ___ here since 2019.",
        "has lived",
        ["lived", "lives"],
        "since असेल तर present perfect.",
      ),
      gap(
        "___ you ever visited Goa?",
        "Have",
        ["Did", "Are"],
        "अनुभव विचारताना Have you ever…?",
      ),
      und(
        "कोणते वाक्य योग्य आहे?",
        "I have never seen snow.",
        ["I never have seen snow yesterday.", "I did never seen snow."],
        "अनुभव आणि never → present perfect.",
      ),
      resp(
        "When did you visit Goa?",
        "I visited it in 2022.",
        ["I have visited it in 2022.", "I am visiting 2022."],
        "ठरावीक वेळ सांगताना simple past.",
      ),
      lis(
        "I have lived in Pune for five years, but I was born in Nagpur.",
        "ऐका. व्यक्ती पुण्यात किती काळ राहिली आहे?",
        "पाच वर्षे",
        ["तीन वर्षे", "दहा वर्षे"],
        "for five years म्हणजे पाच वर्षे.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["अनुभव आणि वेळ", "Past or present perfect?"],
      "नवीन सहकारी तुमच्या प्रवासाबद्दल विचारतो.",
      "तुम्ही: सहकारी",
      [
        [
          "o",
          "Have you ever travelled by plane?",
          "तुम्ही कधी विमानाने प्रवास केला आहे का?",
        ],
        [
          "y",
          "अनुभव सांगा आणि कधी ते सांगा.",
          "Yes, I have. I flew to Delhi in 2021.",
          "Yes, I have. I flew… in…",
        ],
        [
          "o",
          "How long have you worked here?",
          "तुम्ही इथे किती काळ काम करत आहात?",
        ],
        [
          "y",
          "कालावधी सांगा आणि आधी कुठे होतात ते सांगा.",
          "I have worked here for two years. Before that, I worked in a small company.",
          "I have worked here for… Before that, I worked…",
        ],
        ["o", "Interesting.", "रंजक."],
        [
          "y",
          "त्याला विचारा.",
          "And how long have you been here?",
          "And how long…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "i8",
  path: "intermediate",
  title: "सल्ला, नियम, शक्यता आणि जर … तर",
  en: "Modals, conditionals and tense contrasts in use",
  outcome: [
    "I can give advice, explain rules, talk about possibilities and use if sentences.",
    "मी सल्ला देऊ शकतो/शकते, नियम सांगू शकतो/शकते, शक्यतांबद्दल बोलू शकतो/शकते आणि if वाक्ये वापरू शकतो/शकते.",
  ],
  lessons: ["should", "must", "may-might", "conditionals", "tense-contrast"],
  checkpoint: {
    scenario: [
      "A friend is deciding whether to take a new job in another city.",
      "तुमचा मित्र दुसऱ्या शहरातील नवीन नोकरी घ्यावी का याचा विचार करत आहे.",
    ],
    ex: finish("i8", "cp", [
      resp(
        "Should I accept the job in Mumbai?",
        "I think you should, but if the rent is too high, you might not save money.",
        ["You should to accept it.", "If I am you I accepting."],
        "सल्ला + शक्यता + जर वाक्य.",
      ),
      gap(
        "If you ___ the job, you will move next month.",
        "accept",
        ["accepted", "will accept"],
        "खऱ्या शक्यतेसाठी If + present.",
      ),
      gap(
        "If I ___ you, I would visit the office first.",
        "were",
        ["am", "will be"],
        "सल्ल्यासाठी If I were you.",
      ),
      und(
        "कोणते वाक्य अनुभव सांगते?",
        "I have worked in two cities.",
        ["I worked in Nagpur in 2020.", "I will work in Mumbai."],
        "आत्तापर्यंतचा अनुभव present perfect ने.",
      ),
    ]),
    speak:
      "मित्राला सल्ला द्या: एक चांगली बाजू, एक धोका आणि 'जर … तर' असलेले एक वाक्य.",
  },
};
