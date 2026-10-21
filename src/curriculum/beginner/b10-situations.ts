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
    "travel",
    "conversation",
    "Travel: tickets and transport",
    "तिकीट, बस आणि रेल्वे",
    "प्रवासात उपयोगी शब्द: ticket, platform, bus, train, station, fare, seat, late. तिकीट घेताना One ticket to Pune, please म्हणा. वेळ विचारताना What time does the train leave? आणि फलाटासाठी Which platform? वापरा.",
    "One ticket to + place, please · Which platform? · What time does it leave?",
    [
      ["One ticket to Pune, please.", "पुण्याचे एक तिकीट द्या."],
      [
        "Which platform is the train to Nashik?",
        "नाशिकची गाडी कोणत्या फलाटावर आहे?",
      ],
      ["What time does the bus leave?", "बस किती वाजता निघते?"],
      ["The train is ten minutes late.", "गाडी दहा मिनिटे उशिरा आहे."],
    ],
    "तुम्ही तिकीट कसे मागाल आणि फलाट आणि वेळ कशी विचाराल ते बोला.",
  ),
];

export const kits: Record<string, Enrich> = {
  shop: lessonKit(
    "shop",
    [
      "I can ask for things and prices in a shop.",
      "मी दुकानात वस्तू आणि किंमत विचारू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Hello, do you have notebooks?",
        "नमस्कार, तुमच्याकडे वह्या आहेत का?",
      ],
      ["B", "Yes. How many do you want?", "हो. तुम्हाला किती हव्या आहेत?"],
      [
        "A",
        "Three, please. How much does this cost?",
        "तीन, कृपया. याची किंमत किती आहे?",
      ],
      [
        "B",
        "It is sixty rupees. Can I pay by card? — Yes, you can.",
        "ते साठ रुपये आहे. मी कार्डने पैसे देऊ शकतो/शकते का? — हो, देऊ शकता.",
      ],
    ],
    [
      "Do you have + thing?",
      "How much does this cost?",
      "Can I pay by card / UPI?",
    ],
    [
      resp(
        "How can I help you?",
        "I want two notebooks, please.",
        ["I am two notebooks.", "It costs sixty."],
        "दुकानदाराच्या मदतीच्या प्रश्नाला काय हवे ते सांगा.",
      ),
      gap("How much ___ this cost?", "does", ["do", "is"], "this सोबत does."),
      gap(
        "Can I ___ by card?",
        "pay",
        ["paid", "paying"],
        "Can I नंतर मूळ रूप.",
      ),
      e2m(
        "How much does this cost?",
        "याची किंमत किती आहे?",
        ["हे कुठे मिळते?", "हे किती आहेत?"],
        "cost म्हणजे किंमत.",
      ),
      m2e(
        "तुमच्याकडे वह्या आहेत का?",
        "Do you have notebooks?",
        ["Have you notebooks do?", "You have notebooks?"],
        "Do you have + वस्तू?",
      ),
      lis(
        "It costs sixty rupees.",
        "ऐका. किंमत किती आहे?",
        "60 रुपये",
        ["16 रुपये", "600 रुपये"],
        "sixty म्हणजे 60. sixteen म्हणजे 16.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["दुकानात", "At a shop"],
      "तुम्ही वह्या घ्यायला दुकानात गेला आहात.",
      "तुम्ही: ग्राहक",
      [
        [
          "o",
          "Good morning. How can I help you?",
          "सुप्रभात. मी तुम्हाला कशी मदत करू?",
        ],
        [
          "y",
          "वह्या आहेत का ते विचारा.",
          "Hello, do you have notebooks?",
          "Hello, do you have…",
        ],
        ["o", "Yes. How many do you want?", "हो. किती हव्या आहेत?"],
        [
          "y",
          "तीन हव्या आहेत असे सांगा आणि किंमत विचारा.",
          "Three, please. How much does this cost?",
          "Three, please. How much…",
        ],
        ["o", "It is sixty rupees.", "ते साठ रुपये आहे."],
        [
          "y",
          "UPI ने पैसे देऊ शकता का ते विचारा.",
          "Can I pay by UPI?",
          "Can I pay…",
        ],
      ],
      true,
    ),
  ),
  restaurant: lessonKit(
    "restaurant",
    [
      "I can order food politely in a restaurant.",
      "मी हॉटेलमध्ये नम्रपणे जेवण मागवू शकतो/शकते.",
    ],
    [
      ["A", "Good evening. A table for two?", "शुभ संध्याकाळ. दोघांसाठी टेबल?"],
      [
        "B",
        "Yes, please. Could I see the menu?",
        "हो, कृपया. मला मेनू पाहता येईल का?",
      ],
      ["A", "What would you like to order?", "तुम्हाला काय मागवायचे आहे?"],
      [
        "B",
        "I would like a vegetable sandwich. Please make it less spicy.",
        "मला भाज्यांचे सँडविच हवे आहे. कृपया ते कमी तिखट करा.",
      ],
    ],
    [
      "Could I see the menu, please?",
      "I would like + food",
      "Could we have the bill, please?",
    ],
    [
      resp(
        "What would you like to order?",
        "I would like a vegetable sandwich.",
        ["I am a vegetable sandwich.", "I like order."],
        "ऑर्डर देताना I would like…",
      ),
      gap(
        "Could I ___ the menu, please?",
        "see",
        ["saw", "seen"],
        "Could I नंतर मूळ रूप.",
      ),
      gap(
        "Please make it ___ spicy. (कमी)",
        "less",
        ["fewer", "little"],
        "less spicy म्हणजे कमी तिखट.",
      ),
      e2m(
        "Could we have the bill, please?",
        "कृपया आम्हाला बिल मिळेल का?",
        ["कृपया आम्हाला मेनू द्या.", "आम्ही बिल दिले."],
        "bill म्हणजे बिल.",
      ),
      m2e(
        "दोघांसाठी टेबल द्या.",
        "A table for two, please.",
        ["Table two for a please.", "A table is two."],
        "दोघांसाठी टेबल = A table for two. नम्र विनंतीसाठी शेवटी please जोडा.",
      ),
      lis(
        "I would like tea and a sandwich, please.",
        "ऐका. व्यक्ती काय मागवते?",
        "चहा आणि सँडविच",
        ["कॉफी आणि भात", "पाणी आणि फळे"],
        "tea and a sandwich म्हणजे चहा आणि सँडविच.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["हॉटेलमध्ये जेवण मागवणे", "Ordering food"],
      "तुम्ही मित्रासोबत हॉटेलमध्ये जेवायला गेला आहात.",
      "तुम्ही: ग्राहक",
      [
        [
          "o",
          "Welcome. A table for how many?",
          "स्वागत आहे. किती जणांसाठी टेबल?",
        ],
        [
          "y",
          "दोघांसाठी टेबल मागा.",
          "A table for two, please.",
          "A table for…",
        ],
        ["o", "What would you like to order?", "तुम्हाला काय मागवायचे आहे?"],
        [
          "y",
          "सँडविच आणि चहा मागवा.",
          "I would like a vegetable sandwich and tea.",
          "I would like…",
        ],
        ["o", "Anything else?", "आणखी काही?"],
        [
          "y",
          "'नाही, धन्यवाद' म्हणा आणि बिल मागा.",
          "No, thank you. Could we have the bill, please?",
          "No, thank you. Could we…",
        ],
      ],
      true,
    ),
  ),
  directions: lessonKit(
    "directions",
    [
      "I can ask for and follow simple directions.",
      "मी रस्ता विचारू शकतो/शकते आणि सोपे मार्गदर्शन समजू शकतो/शकते.",
    ],
    [
      ["A", "Excuse me, where is the bus stop?", "माफ करा, बस थांबा कुठे आहे?"],
      [
        "B",
        "Go straight and turn right at the signal.",
        "सरळ जा आणि सिग्नलला उजवीकडे वळा.",
      ],
      ["A", "Is it far from here?", "ते इथून लांब आहे का?"],
      ["B", "No, it is five minutes on foot.", "नाही, चालत पाच मिनिटे लागतात."],
    ],
    [
      "Excuse me, where is …?",
      "Go straight · turn left / right · It is near / far",
    ],
    [
      und(
        "'Turn left' म्हणजे काय?",
        "डावीकडे वळा",
        ["उजवीकडे वळा", "सरळ जा"],
        "left म्हणजे डावीकडे.",
      ),
      gap(
        "Go ___ and turn right. (सरळ)",
        "straight",
        ["strange", "street"],
        "straight म्हणजे सरळ.",
      ),
      m2e(
        "ते इथून लांब आहे का?",
        "Is it far from here?",
        ["It is far from here?", "Is far it from here?"],
        "प्रश्नात Is आधी.",
      ),
      resp(
        "Is the station far?",
        "No, it is five minutes on foot.",
        ["No, it is blue.", "Yes, I am far."],
        "अंतर/वेळ सांगा.",
      ),
      lis(
        "Turn left at the bank and go straight.",
        "ऐका. बँकेजवळ काय करायचे?",
        "डावीकडे वळायचे",
        ["उजवीकडे वळायचे", "थांबायचे"],
        "turn left म्हणजे डावीकडे वळा.",
      ),
      bld(
        "सरळ जा आणि उजवीकडे वळा.",
        "Go straight and turn right.",
        ["left"],
        "straight = सरळ; right = उजवीकडे.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["रस्ता विचारणे", "Asking the way"],
      "तुम्ही नवीन ठिकाणी स्टेशनचा रस्ता शोधत आहात.",
      "तुम्ही: प्रवासी",
      [
        [
          "y",
          "माफ करा म्हणून रेल्वे स्टेशन कुठे आहे ते विचारा.",
          "Excuse me, where is the railway station?",
          "Excuse me, where is…",
        ],
        [
          "o",
          "Go straight and turn left at the signal.",
          "सरळ जा आणि सिग्नलला डावीकडे वळा.",
        ],
        [
          "y",
          "ते लांब आहे का ते विचारा.",
          "Is it far from here?",
          "Is it far…",
        ],
        [
          "o",
          "No, it is about five minutes on foot.",
          "नाही, चालत सुमारे पाच मिनिटे.",
        ],
        ["y", "आभार माना.", "Thank you for your help.", "Thank you for…"],
      ],
      true,
    ),
  ),
  travel: lessonKit(
    "travel",
    [
      "I can buy a ticket and ask about the platform and time.",
      "मी तिकीट घेऊ शकतो/शकते आणि फलाट आणि वेळेबद्दल विचारू शकतो/शकते.",
    ],
    [
      ["A", "One ticket to Pune, please.", "पुण्याचे एक तिकीट द्या."],
      [
        "B",
        "That is two hundred rupees. The train leaves at ten.",
        "ते दोनशे रुपये आहे. गाडी दहा वाजता निघते.",
      ],
      ["A", "Which platform is it?", "ती कोणत्या फलाटावर आहे?"],
      [
        "B",
        "Platform three. The train is ten minutes late.",
        "फलाट तीन. गाडी दहा मिनिटे उशिरा आहे.",
      ],
    ],
    [
      "One ticket to + place, please.",
      "Which platform …? · What time does … leave?",
    ],
    [
      gap(
        "One ___ to Pune, please. (तिकीट)",
        "ticket",
        ["tickets", "ticking"],
        "एका तिकीटासाठी ticket.",
      ),
      resp(
        "Which platform is the train to Pune?",
        "It is platform three.",
        ["It is two hundred rupees.", "It is at the bank."],
        "फलाटाबद्दल फलाट क्रमांक सांगा.",
      ),
      e2m(
        "The train is ten minutes late.",
        "गाडी दहा मिनिटे उशिरा आहे.",
        ["गाडी दहा मिनिटे लवकर आहे.", "गाडी दहा वाजता आहे."],
        "late म्हणजे उशिरा.",
      ),
      m2e(
        "बस किती वाजता निघते?",
        "What time does the bus leave?",
        ["What time the bus leaves?", "What time do the bus leave?"],
        "bus सोबत does; leave मूळ रूप.",
      ),
      lis(
        "The train to Nashik leaves from platform two at eleven.",
        "ऐका. गाडी किती वाजता निघते?",
        "अकरा वाजता",
        ["दोन वाजता", "तीन वाजता"],
        "at eleven म्हणजे अकरा वाजता.",
      ),
      bld(
        "पुण्याचे एक तिकीट द्या.",
        "One ticket to Pune, please.",
        ["at"],
        "One ticket to + ठिकाण, please.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["तिकीट घेणे", "Buying a ticket"],
      "तुम्ही स्टेशनवर तिकीट घेता.",
      "तुम्ही: प्रवासी",
      [
        [
          "y",
          "पुण्याचे एक तिकीट मागा.",
          "One ticket to Pune, please.",
          "One ticket…",
        ],
        ["o", "That is two hundred rupees.", "ते दोनशे रुपये आहे."],
        [
          "y",
          "कोणता फलाट आहे ते विचारा.",
          "Which platform is it?",
          "Which platform…",
        ],
        [
          "o",
          "Platform three. The train leaves at ten.",
          "फलाट तीन. गाडी दहा वाजता निघते.",
        ],
      ],
    ),
  ),
  phone: lessonKit(
    "phone",
    [
      "I can start, handle and end a simple phone call.",
      "मी साधा फोन कॉल सुरू करू, सांभाळू आणि संपवू शकतो/शकते.",
    ],
    [
      ["A", "Hello, this is Asha speaking.", "नमस्कार, मी आशा बोलत आहे."],
      ["B", "Hello Asha. How can I help you?", "नमस्कार आशा. मी कशी मदत करू?"],
      ["A", "May I speak to Rahul?", "मी राहुलशी बोलू शकते का?"],
      [
        "B",
        "He is not here. Could you call back later?",
        "तो इथे नाही. तुम्ही नंतर फोन कराल का?",
      ],
    ],
    [
      "Hello, this is … speaking.",
      "May I speak to …?",
      "Could you call me back?",
    ],
    [
      resp(
        "Hello, this is Rahul's office.",
        "Hello, may I speak to Rahul, please?",
        ["Hello, I am a phone.", "Goodbye, see you."],
        "फोनवर कोणाशी बोलायचे ते नम्रपणे सांगा.",
      ),
      gap(
        "May I ___ to Rahul?",
        "speak",
        ["say", "tell"],
        "फोनवर बोलण्यासाठी speak to.",
      ),
      e2m(
        "Sorry, I cannot hear you clearly.",
        "माफ करा, मला तुमचा आवाज नीट ऐकू येत नाही.",
        ["माफ करा, मला तुमचा नंबर माहीत नाही.", "माफ करा, मी उशिरा आलो."],
        "cannot hear clearly म्हणजे नीट ऐकू येत नाही.",
      ),
      m2e(
        "तुम्ही मला नंतर फोन कराल का?",
        "Could you call me back later?",
        ["Could you call back me later?", "Can you calling me later?"],
        "नंतर फोन करा = call me back later. Could you… ने नम्र विनंती होते.",
      ),
      lis(
        "Hello, this is Neha speaking. Can I speak to Mr. Patil?",
        "ऐका. ती कोणाशी बोलू इच्छिते?",
        "श्री. पाटील",
        ["नेहा", "डॉक्टर"],
        "Can I speak to Mr. Patil म्हणजे पाटील यांच्याशी बोलू शकते का?",
      ),
      bld(
        "नमस्कार, मी आशा बोलत आहे.",
        "Hello, this is Asha speaking.",
        ["am"],
        "फोनवर 'मी … बोलत आहे' = this is … speaking.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["फोनवर बोलणे", "A phone call"],
      "तुम्ही मित्राला भेटायची वेळ ठरवायला फोन करता.",
      "तुम्ही: कॉल करणारे",
      [
        ["o", "Hello?", "हॅलो?"],
        [
          "y",
          "तुमची ओळख सांगा आणि राहुलशी बोलायचे आहे असे सांगा.",
          "Hello, this is Asha speaking. May I speak to Rahul?",
          "Hello, this is… speaking.",
        ],
        [
          "o",
          "He is not here. Can I take a message?",
          "तो इथे नाही. निरोप घेऊ का?",
        ],
        [
          "y",
          "त्याला परत फोन करायला सांगा.",
          "Please ask him to call me back.",
          "Please ask him…",
        ],
      ],
      true,
    ),
  ),
};

export const unit: Unit = {
  id: "b10",
  path: "beginner",
  title: "रोजचे प्रसंग",
  en: "Everyday situations: shopping, food, directions, travel and calls",
  outcome: [
    "I can manage simple everyday situations in English.",
    "मी रोजच्या साध्या प्रसंगांत इंग्रजी वापरू शकतो/शकते.",
  ],
  lessons: ["shop", "restaurant", "directions", "travel", "phone"],
  checkpoint: {
    scenario: [
      "You are in a new city and need a hotel, directions and a cup of tea.",
      "तुम्ही नवीन शहरात आहात आणि तुम्हाला हॉटेल, रस्ता आणि चहा हवा आहे.",
    ],
    ex: finish("b10", "cp", [
      resp(
        "Can I help you?",
        "Yes, please. Where is the nearest bus stop?",
        ["Yes, I am the bus stop.", "No, I help you."],
        "रस्ता विचारताना Where is… वापरा.",
      ),
      gap(
        "Could I ___ a cup of tea, please?",
        "have",
        ["has", "having"],
        "Could I नंतर मूळ रूप.",
      ),
      lis(
        "Take the second left and the hotel is on your right.",
        "ऐका. हॉटेल कुठे आहे?",
        "उजव्या बाजूला",
        ["डाव्या बाजूला", "समोर"],
        "on your right म्हणजे उजव्या बाजूला.",
      ),
      bld(
        "हे किती रुपयांना आहे?",
        "How much is this?",
        ["are"],
        "किंमत विचारताना How much is this?",
      ),
    ]),
    speak: "नवीन शहरात हॉटेलचा रस्ता विचारा, चहा मागा आणि किंमत विचारा.",
  },
};
