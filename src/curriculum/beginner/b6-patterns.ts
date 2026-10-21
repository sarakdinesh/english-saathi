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
  finish,
} from "../author";
import type { Unit, Enrich } from "../types";

export const lessons = [
  newLesson(
    "like",
    "formulas",
    "I like…",
    "मला … आवडते",
    "आवडीसाठी like वापरा. वस्तू आवडत असल्यास like + noun (I like tea). कृती आवडत असल्यास like to + क्रियापद (I like to read). नावड सांगण्यासाठी do not like. प्रश्न: Do you like …? उत्तर: Yes, I do. / No, I do not.",
    "I like + noun · I like to + verb · Do you like …?",
    [
      ["I like tea.", "मला चहा आवडतो."],
      ["I like to read in the evening.", "मला संध्याकाळी वाचायला आवडते."],
      ["She does not like spicy food.", "तिला तिखट जेवण आवडत नाही."],
      [
        "Do you like cricket? — Yes, I do.",
        "तुम्हाला क्रिकेट आवडते का? — हो, आवडते.",
      ],
    ],
    "तुम्हाला काय आवडते आणि काय आवडत नाही ते प्रत्येकी तीन वाक्यांत सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  "have-has": lessonKit(
    "have-has",
    [
      "I can say what I and other people have.",
      "मी माझ्याकडे आणि इतरांकडे काय आहे ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "Do you have a pen?", "तुमच्याकडे पेन आहे का?"],
      ["B", "Yes, I have two pens.", "हो, माझ्याकडे दोन पेन आहेत."],
      ["A", "Does your sister have a phone?", "तुमच्या बहिणीकडे फोन आहे का?"],
      ["B", "Yes, she has a new phone.", "हो, तिच्याकडे नवा फोन आहे."],
    ],
    ["I / you / we / they have", "he / she / it has"],
    [
      gap(
        "She ___ two brothers.",
        "has",
        ["have", "haves"],
        "she सोबत has वापरतात.",
      ),
      gap("We ___ time.", "have", ["has", "having"], "we सोबत have."),
      gap(
        "Do you ___ a pen?",
        "have",
        ["has", "had"],
        "Do you नंतर मूळ रूप have.",
      ),
      m2e(
        "माझ्याकडे फोन आहे.",
        "I have a phone.",
        ["I has a phone.", "I am have a phone."],
        "I सोबत have.",
      ),
      resp(
        "Do you have a pen?",
        "Yes, I have a pen.",
        ["Yes, I am a pen.", "Yes, it has."],
        "Do you have…? ला Yes, I have… असे उत्तर देता येते.",
      ),
      lis(
        "She has two brothers.",
        "ऐका. तिला किती भाऊ आहेत?",
        "दोन",
        ["तीन", "एक"],
        "two brothers म्हणजे दोन भाऊ.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["उधार मागणे", "Asking to borrow"],
      "वर्गात तुम्हाला पेन हवा आहे.",
      "तुम्ही: विद्यार्थी",
      [
        [
          "y",
          "तुमच्या मित्राकडे पेन आहे का ते विचारा.",
          "Do you have a pen?",
          "Do you have…",
        ],
        [
          "o",
          "Yes, I have two pens. Take one.",
          "हो, माझ्याकडे दोन पेन आहेत. एक घ्या.",
        ],
        ["y", "आभार माना.", "Thank you very much.", "Thank you…"],
        ["o", "You are welcome.", "आपले स्वागत आहे."],
      ],
    ),
  ),
  want: lessonKit(
    "want",
    [
      "I can say what I want to do.",
      "मला काय करायचे आहे ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "What do you want to do today?", "आज तुम्हाला काय करायचे आहे?"],
      [
        "B",
        "I want to learn English and drink some tea.",
        "मला इंग्रजी शिकायचे आहे आणि थोडा चहा प्यायचा आहे.",
      ],
      [
        "A",
        "Do you want to come with me?",
        "तुम्हाला माझ्यासोबत यायचे आहे का?",
      ],
      [
        "B",
        "I do not want to wait. Let us go now.",
        "मला थांबायचे नाही. आपण आता जाऊया.",
      ],
    ],
    ["I want to + base verb", "Do you want to + base verb?"],
    [
      gap(
        "I want ___ learn English.",
        "to",
        ["for", "at"],
        "want नंतर to + क्रियापद.",
      ),
      gap(
        "I want to ___ water.",
        "drink",
        ["drinks", "drinking"],
        "to नंतर क्रियापदाचे मूळ रूप.",
      ),
      e2m(
        "I do not want to wait.",
        "मला थांबायचे नाही.",
        ["मला थांबायचे आहे.", "मी थांबलो नाही."],
        "do not want म्हणजे नको/नाही.",
      ),
      m2e(
        "तुम्हाला यायचे आहे का?",
        "Do you want to come?",
        ["You want to come?", "Do you wants to come?"],
        "प्रश्नात Do सुरुवातीला येते.",
      ),
      resp(
        "Do you want to come with me?",
        "Yes, I want to come.",
        ["Yes, I wants come.", "No, I am come."],
        "want to नंतर मूळ क्रियापद.",
      ),
      bld(
        "मला पाणी प्यायचे आहे.",
        "I want to drink water.",
        ["drinks"],
        "want to नंतर मूळ रूप drink.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["योजना ठरवणे", "Making a plan"],
      "सुट्टीच्या दिवशी तुम्ही मित्राशी बोलता.",
      "तुम्ही: मित्र",
      [
        ["o", "What do you want to do today?", "आज तुम्हाला काय करायचे आहे?"],
        [
          "y",
          "तुम्हाला फिरायला जायचे आहे असे सांगा.",
          "I want to go for a walk.",
          "I want to…",
        ],
        [
          "o",
          "Do you want to come with me?",
          "तुम्हाला माझ्यासोबत यायचे आहे का?",
        ],
        [
          "y",
          "'हो' म्हणा आणि वेळ विचारा.",
          "Yes, I want to come. What time?",
          "Yes, I want to come…",
        ],
      ],
    ),
  ),
  need: lessonKit(
    "need",
    [
      "I can say what I need and what I need to do.",
      "मला काय हवे आहे आणि काय करायला हवे ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "Do you need anything?", "तुम्हाला काही हवे आहे का?"],
      [
        "B",
        "I need some help with this form.",
        "मला या फॉर्मसाठी थोडी मदत हवी आहे.",
      ],
      [
        "A",
        "Sure. Do you need a pen too?",
        "नक्की. तुम्हाला पेनही हवे आहे का?",
      ],
      [
        "B",
        "Yes, and I need to leave by five.",
        "हो, आणि मला पाचपर्यंत निघायला हवे.",
      ],
    ],
    ["I need + noun", "I need to + base verb"],
    [
      gap(
        "I need ___ help.",
        "some",
        ["to", "an"],
        "help हे न मोजता येणारे नाम आहे; some help.",
      ),
      gap(
        "I need ___ leave now.",
        "to",
        ["some", "for"],
        "कृतीसाठी need to + क्रियापद.",
      ),
      e2m(
        "Do you need anything?",
        "तुम्हाला काही हवे आहे का?",
        ["तुम्ही काही केले का?", "तुम्हाला काही दिसले का?"],
        "need म्हणजे हवे/गरज असणे.",
      ),
      m2e(
        "मला पेन हवे आहे.",
        "I need a pen.",
        ["I need to a pen.", "I am need a pen."],
        "वस्तू हवी असल्यास need + noun.",
      ),
      resp(
        "Do you need any help?",
        "Yes, I need some help, please.",
        ["Yes, I need to some.", "Yes, it is help."],
        "need नंतर some help.",
      ),
      lis(
        "I need to leave by five.",
        "ऐका. व्यक्तीला काय करायला हवे?",
        "पाचपर्यंत निघायला",
        ["पाच वाजता यायला", "पाच पेन घ्यायला"],
        "leave by five म्हणजे पाचपर्यंत निघणे.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["मदत मागणे", "Asking for help"],
      "ऑफिसमध्ये तुम्हाला एका फॉर्मसाठी मदत हवी आहे.",
      "तुम्ही: कर्मचारी",
      [
        ["o", "Do you need anything?", "तुम्हाला काही हवे आहे का?"],
        [
          "y",
          "फॉर्मसाठी थोडी मदत हवी आहे असे सांगा.",
          "I need some help with this form.",
          "I need some help…",
        ],
        [
          "o",
          "Sure. Do you need a pen too?",
          "नक्की. तुम्हाला पेनही हवे आहे का?",
        ],
        [
          "y",
          "'हो, कृपया' म्हणा आणि आभार माना.",
          "Yes, please. Thank you.",
          "Yes, please…",
        ],
      ],
    ),
  ),
  like: lessonKit(
    "like",
    [
      "I can say what I like and do not like.",
      "मला काय आवडते आणि काय आवडत नाही ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "Do you like cricket?", "तुम्हाला क्रिकेट आवडते का?"],
      [
        "B",
        "Yes, I do. I like to play on Sundays.",
        "हो, आवडते. मला रविवारी खेळायला आवडते.",
      ],
      ["A", "Do you like spicy food?", "तुम्हाला तिखट जेवण आवडते का?"],
      [
        "B",
        "No, I do not. I like sweet food.",
        "नाही, आवडत नाही. मला गोड जेवण आवडते.",
      ],
    ],
    [
      "I like + noun",
      "I like to + verb",
      "Do you like …? — Yes, I do. / No, I do not.",
    ],
    [
      gap(
        "I like ___ read in the evening.",
        "to",
        ["at", "for"],
        "कृती आवडत असल्यास like to + क्रियापद.",
      ),
      gap(
        "She ___ not like spicy food.",
        "does",
        ["do", "is"],
        "she सोबत does not.",
      ),
      resp(
        "Do you like tea?",
        "Yes, I do.",
        ["Yes, I like.", "Yes, I does."],
        "Do you like…? ला Yes, I do. असे उत्तर देतात.",
      ),
      e2m(
        "I like to read in the evening.",
        "मला संध्याकाळी वाचायला आवडते.",
        ["मी संध्याकाळी वाचले.", "मला संध्याकाळी वाचन नको."],
        "like to म्हणजे करायला आवडते.",
      ),
      m2e(
        "तिला तिखट जेवण आवडत नाही.",
        "She does not like spicy food.",
        ["She not like spicy food.", "She do not like spicy food."],
        "she सोबत does not like.",
      ),
      lis(
        "I like sweet food, but I do not like spicy food.",
        "ऐका. व्यक्तीला काय आवडत नाही?",
        "तिखट जेवण",
        ["गोड जेवण", "चहा"],
        "do not like spicy food म्हणजे तिखट आवडत नाही.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["आवडीनिवडी", "Talking about likes"],
      "नवीन सहकारी तुमच्या आवडीनिवडी विचारतो.",
      "तुम्ही: सहकारी",
      [
        ["o", "Do you like cricket?", "तुम्हाला क्रिकेट आवडते का?"],
        [
          "y",
          "तुमचे उत्तर सांगा आणि कधी खेळता ते सांगा.",
          "Yes, I do. I like to play on Sundays.",
          "Yes, I do. I like to…",
        ],
        ["o", "Do you like spicy food?", "तुम्हाला तिखट जेवण आवडते का?"],
        [
          "y",
          "तुमचे उत्तर सांगा.",
          "No, I do not. I like sweet food.",
          "No, I do not…",
        ],
      ],
    ),
  ),
  can: lessonKit(
    "can",
    [
      "I can say what I can and cannot do and ask for permission.",
      "मी काय करू शकतो/शकत नाही ते सांगू शकतो/शकते आणि परवानगी मागू शकतो/शकते.",
    ],
    [
      ["A", "Can you speak English?", "तुम्हाला इंग्रजी बोलता येते का?"],
      [
        "B",
        "Yes, I can speak a little. I can speak Marathi and Hindi.",
        "हो, थोडे बोलता येते. मला मराठी आणि हिंदी बोलता येते.",
      ],
      ["A", "Can you swim?", "तुम्हाला पोहता येते का?"],
      ["B", "No, I cannot swim.", "नाही, मला पोहता येत नाही."],
    ],
    ["I can + base verb", "Can you + base verb? / Can I + base verb?"],
    [
      gap(
        "I can ___ Marathi.",
        "speak",
        ["speaks", "to speak"],
        "can नंतर क्रियापदाचे मूळ रूप.",
      ),
      gap(
        "She ___ swim.",
        "cannot",
        ["not can", "does not can"],
        "नकारासाठी cannot.",
      ),
      e2m(
        "Can you help me?",
        "तुम्ही मला मदत करू शकता का?",
        ["तुम्ही मला भेटाल का?", "तुम्ही मला पाहिले का?"],
        "Can you… म्हणजे तुम्ही … करू शकता का?",
      ),
      m2e(
        "मला मराठी बोलता येते.",
        "I can speak Marathi.",
        ["I can speaks Marathi.", "I can to speak Marathi."],
        "can नंतर मूळ रूप speak.",
      ),
      resp(
        "Can you swim?",
        "No, I cannot swim.",
        ["No, I am swim.", "Yes, I can swims."],
        "Can you…? ला Yes, I can. / No, I cannot. असे उत्तर.",
      ),
      lis(
        "I can cook, but I cannot drive.",
        "ऐका. व्यक्तीला काय येत नाही?",
        "गाडी चालवणे",
        ["स्वयंपाक", "पोहणे"],
        "cannot drive म्हणजे गाडी चालवता येत नाही.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["काय येते?", "What can you do?"],
      "नवीन ऑफिसमध्ये तुमची ओळख होते.",
      "तुम्ही: कर्मचारी",
      [
        ["o", "Can you speak English?", "तुम्हाला इंग्रजी बोलता येते का?"],
        [
          "y",
          "'थोडे बोलता येते' असे सांगा आणि मराठी येते असे सांगा.",
          "I can speak a little. I can speak Marathi.",
          "I can speak a little…",
        ],
        ["o", "Can you use a computer?", "तुम्हाला संगणक वापरता येतो का?"],
        [
          "y",
          "तुमचे उत्तर सांगा.",
          "Yes, I can use a computer.",
          "Yes, I can…",
        ],
      ],
    ),
  ),
  "there-is": lessonKit(
    "there-is",
    [
      "I can say what there is and is not in a place.",
      "एखाद्या ठिकाणी काय आहे आणि काय नाही ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "Is there a bus stop near here?", "इथे जवळ बस थांबा आहे का?"],
      [
        "B",
        "Yes, there is a bus stop next to the bank.",
        "हो, बँकेच्या शेजारी बस थांबा आहे.",
      ],
      ["A", "Are there any shops?", "तिथे दुकाने आहेत का?"],
      ["B", "Yes, there are three shops.", "हो, तीन दुकाने आहेत."],
    ],
    [
      "There is + one thing",
      "There are + many things",
      "Is there…? / Are there…?",
    ],
    [
      gap(
        "___ a shop nearby.",
        "There is",
        ["There are", "They are"],
        "एका गोष्टीसाठी There is.",
      ),
      gap(
        "___ three books on the table.",
        "There are",
        ["There is", "It is"],
        "अनेक गोष्टींसाठी There are.",
      ),
      m2e(
        "इथे बस थांबा आहे का?",
        "Is there a bus stop here?",
        ["There is a bus stop here?", "Is a bus stop there here?"],
        "प्रश्नात Is there सुरुवातीला.",
      ),
      e2m(
        "There are three books on the table.",
        "टेबलावर तीन पुस्तके आहेत.",
        ["टेबल तीन पुस्तकांचे आहे.", "टेबलावर पुस्तक नाही."],
        "There are + संख्या म्हणजे … आहेत.",
      ),
      resp(
        "Is there a bank near here?",
        "Yes, there is a bank next to the market.",
        ["Yes, there are a bank.", "Yes, it has a bank."],
        "एकासाठी there is.",
      ),
      lis(
        "There are two hospitals in this city.",
        "ऐका. शहरात किती हॉस्पिटल आहेत?",
        "दोन",
        ["एक", "तीन"],
        "two hospitals म्हणजे दोन हॉस्पिटल.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["भाग कसा आहे?", "Describing your area"],
      "नवीन मित्र तुमच्या भागाबद्दल विचारतो.",
      "तुम्ही: रहिवासी",
      [
        [
          "o",
          "Is there a market near your house?",
          "तुमच्या घराजवळ बाजार आहे का?",
        ],
        [
          "y",
          "'हो, जवळ एक बाजार आहे' असे सांगा.",
          "Yes, there is a market near my house.",
          "Yes, there is…",
        ],
        ["o", "Are there any parks?", "तिथे बागा आहेत का?"],
        [
          "y",
          "'हो, दोन बागा आहेत' असे सांगा.",
          "Yes, there are two parks.",
          "Yes, there are…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b6",
  path: "beginner",
  title: "उपयुक्त वाक्यरचना",
  en: "Useful patterns: have, want, need, like, can, there is",
  outcome: [
    "I can say what I have, want, need, like and can do.",
    "माझ्याकडे काय आहे, मला काय हवे, काय आवडते आणि काय करता येते ते मी सांगू शकतो/शकते.",
  ],
  lessons: ["have-has", "want", "need", "like", "can", "there-is"],
  checkpoint: {
    scenario: [
      "You are talking to a new neighbour about your home and plans.",
      "तुम्ही नवीन शेजाऱ्याशी तुमचे घर आणि योजना याबद्दल बोलत आहात.",
    ],
    ex: finish("b6", "cp", [
      resp(
        "Do you like living here?",
        "Yes, I do. There is a park near my house.",
        ["Yes, I am living a park.", "No, I has a house."],
        "आवडते का या प्रश्नाला Yes, I do आणि तपशील.",
      ),
      gap(
        "My neighbour ___ a big garden.",
        "has",
        ["have", "having"],
        "My neighbour = he/she, म्हणून has.",
      ),
      gap(
        "I need ___ buy some vegetables.",
        "to",
        ["for", "at"],
        "need to + क्रियापद.",
      ),
      bld(
        "मला चालायला आवडते.",
        "I like to walk.",
        ["walks"],
        "like to + मूळ क्रियापद.",
      ),
      lis(
        "I cannot cook, but I can make tea.",
        "ऐका. व्यक्तीला काय येते?",
        "चहा करता येतो",
        ["स्वयंपाक करता येतो", "गाडी चालवता येते"],
        "can make tea म्हणजे चहा करता येतो.",
      ),
    ]),
    speak:
      "नवीन शेजाऱ्याला सांगा तुमच्या घराजवळ काय आहे, तुम्हाला काय आवडते आणि तुम्हाला काय येते.",
  },
};
