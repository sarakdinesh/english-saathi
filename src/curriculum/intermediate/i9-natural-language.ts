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
    "collocations",
    "fluency",
    "Words that go together",
    "नैसर्गिक शब्दजोड्या",
    "काही शब्द नेहमी एकत्र येतात. ते जोडीने शिका: make a decision, have a meeting, take a break, give advice, do homework, keep in touch, catch a bus, heavy rain, strong tea. मराठीतून शब्दशः भाषांतर केले तर जोडी चुकते (उदा. 'do a decision' म्हणणे चुकीचे आहे).",
    "make a decision · have a meeting · take a break · give advice",
    [
      ["We need to make a decision today.", "आपल्याला आज निर्णय घ्यावा लागेल."],
      [
        "Let's take a short break and then continue.",
        "चला थोडा ब्रेक घेऊया आणि मग पुढे चालू करूया.",
      ],
      [
        "She gave me good advice about my career.",
        "तिने मला माझ्या करिअरबद्दल चांगला सल्ला दिला.",
      ],
      [
        "It was raining heavily, so we missed the bus.",
        "जोराचा पाऊस पडत होता, म्हणून आमची बस चुकली.",
      ],
    ],
    "make, take, have आणि give वापरून चार जोड्यांचे वाक्य तयार करा.",
  ),
  newLesson(
    "phrasal-verbs",
    "fluency",
    "Useful phrasal verbs",
    "रोजचे phrasal verbs",
    "Phrasal verb म्हणजे क्रियापद + लहान शब्द ज्यांचा एकत्र वेगळा अर्थ होतो: look for (शोधणे), pick up (उचलणे / आणायला जाणे), turn on / turn off (चालू / बंद करणे), find out (शोधून काढणे), fill in (भरणे), give up (हार मानणे), come back (परत येणे), set up (सुरू करणे). वाक्यात उदाहरणांसह शिका.",
    "look for · pick up · turn on/off · find out · fill in · give up",
    [
      ["I am looking for my keys.", "मी माझ्या चाव्या शोधत आहे."],
      [
        "Could you pick me up at the station?",
        "तुम्ही मला स्टेशनवर घ्यायला याल का?",
      ],
      [
        "Please fill in this form and turn off your phone.",
        "कृपया हा फॉर्म भरा आणि फोन बंद करा.",
      ],
      [
        "Do not give up. You will find out the answer.",
        "हार मानू नका. तुम्हाला उत्तर सापडेल.",
      ],
    ],
    "look for, pick up, fill in आणि find out वापरून तुमच्या दिवसाची चार वाक्ये बोला.",
  ),
];

export const kits: Record<string, Enrich> = {
  collocations: lessonKit(
    "collocations",
    [
      "I can use common word pairs to sound more natural.",
      "नैसर्गिक वाटण्यासाठी मी सामान्य शब्दजोड्या वापरू शकतो/शकते.",
    ],
    [
      [
        "A",
        "We need to make a decision today.",
        "आपल्याला आज निर्णय घ्यावा लागेल.",
      ],
      ["B", "Let's take a short break first.", "आधी थोडा ब्रेक घेऊया."],
      [
        "A",
        "Good idea. Then we can have a meeting with the team.",
        "चांगली कल्पना. मग आपण टीमसोबत बैठक घेऊ शकतो.",
      ],
      [
        "B",
        "Yes, and I will give them some advice.",
        "हो, आणि मी त्यांना थोडा सल्ला देईन.",
      ],
    ],
    ["make a decision · have a meeting", "take a break · give advice"],
    [
      gap(
        "We need to ___ a decision.",
        "make",
        ["do", "take up"],
        "make a decision ही नैसर्गिक जोडी आहे.",
      ),
      gap(
        "Let's ___ a short break.",
        "take",
        ["make", "do"],
        "विश्रांती घेणे = take a break (make नाही).",
      ),
      gap(
        "I want to ___ homework tonight.",
        "do",
        ["make", "give"],
        "गृहपाठ करणे = do homework.",
      ),
      und(
        "कोणते वाक्य नैसर्गिक आहे?",
        "It rained heavily yesterday.",
        ["It rained strongly yesterday.", "It rained big yesterday."],
        "heavy rain / rained heavily ही जोडी.",
      ),
      resp(
        "Can you help me decide?",
        "Of course. I can give you some advice.",
        ["Of course. I can do you advice.", "Yes I make advice."],
        "give advice ही जोडी.",
      ),
      m2e(
        "आपण बैठक घेऊया.",
        "Let's have a meeting.",
        ["Let's do a meeting.", "Let's make a meeting."],
        "meeting सोबत have.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["निर्णय घेणे", "Making a decision"],
      "टीमला एक निर्णय घ्यायचा आहे.",
      "तुम्ही: टीम सदस्य",
      [
        [
          "o",
          "We need to make a decision about the venue.",
          "आपल्याला जागेबद्दल निर्णय घ्यायचा आहे.",
        ],
        [
          "y",
          "ब्रेक घेण्याचे सुचवा आणि मग निर्णय घेऊया असे सांगा.",
          "Let's take a short break and then make a decision.",
          "Let's take a break… then make…",
        ],
        [
          "o",
          "Good idea. Who should we ask for advice?",
          "चांगली कल्पना. आपण कोणाचा सल्ला घ्यावा?",
        ],
        [
          "y",
          "कोणाला विचारावे ते सुचवा.",
          "I think we should ask our manager. She can give us good advice.",
          "I think we should ask… She can give…",
        ],
        ["o", "Okay.", "ठीक आहे."],
        [
          "y",
          "बैठक कधी घ्यायची ते विचारा.",
          "When can we have a meeting with her?",
          "When can we have…",
        ],
      ],
    ),
  ),
  "phrasal-verbs": lessonKit(
    "phrasal-verbs",
    [
      "I can use common phrasal verbs in everyday conversation.",
      "मी रोजच्या संभाषणात सामान्य phrasal verbs वापरू शकतो/शकते.",
    ],
    [
      [
        "A",
        "I am looking for my keys. Have you seen them?",
        "मी माझ्या चाव्या शोधत आहे. तुम्ही त्या पाहिल्या का?",
      ],
      [
        "B",
        "No. Please turn off the fan and look on the table.",
        "नाही. कृपया पंखा बंद करा आणि टेबलावर पाहा.",
      ],
      [
        "A",
        "Found them! Could you pick me up at six?",
        "सापडल्या! तुम्ही मला सहा वाजता घ्यायला याल का?",
      ],
      [
        "B",
        "Sure. Do not give up searching next time!",
        "नक्की. पुढच्या वेळी शोधणे सोडू नका!",
      ],
    ],
    ["look for · pick up · turn on / off", "find out · fill in · give up"],
    [
      und(
        "'look for' म्हणजे काय?",
        "शोधणे",
        ["पाहणे", "सोडणे"],
        "look for म्हणजे शोधणे. look at म्हणजे पाहणे.",
      ),
      gap(
        "Please ___ off the light.",
        "turn",
        ["make", "put to"],
        "turn off म्हणजे बंद करणे.",
      ),
      gap(
        "Could you ___ me up at the station?",
        "pick",
        ["take", "bring in"],
        "pick up म्हणजे घ्यायला येणे.",
      ),
      e2m(
        "Please fill in this form.",
        "कृपया हा फॉर्म भरा.",
        ["कृपया हा फॉर्म फाडा.", "कृपया हा फॉर्म वाचा."],
        "fill in म्हणजे फॉर्म भरणे.",
      ),
      resp(
        "I cannot solve this problem.",
        "Do not give up. We will find out the answer together.",
        ["Do not give out.", "We find out together answer."],
        "give up म्हणजे हार मानणे.",
      ),
      m2e(
        "मला उत्तर शोधून काढायचे आहे.",
        "I want to find out the answer.",
        ["I want to find the answer out of.", "I want find out to answer."],
        "find out म्हणजे शोधून काढणे.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["घरी शोध", "Looking for something"],
      "तुम्ही घरातून निघण्याआधी चाव्या शोधता.",
      "तुम्ही: घरातील व्यक्ती",
      [
        ["o", "Why are you in a hurry?", "तुम्ही घाईत का आहात?"],
        [
          "y",
          "तुम्ही चाव्या शोधत आहात आणि निघायचे आहे असे सांगा.",
          "I am looking for my keys, and I need to leave in five minutes.",
          "I am looking for… and I need to…",
        ],
        ["o", "Have you checked the table?", "तुम्ही टेबल पाहिले का?"],
        [
          "y",
          "सापडल्या असे सांगा आणि घ्यायला येण्याबद्दल विचारा.",
          "Found them! Could you pick me up at six?",
          "Found them! Could you pick me up…",
        ],
        ["o", "Sure.", "नक्की."],
        [
          "y",
          "आभार माना आणि पंखा बंद करायला सांगा.",
          "Thanks. Please turn off the fan before you leave.",
          "Thanks. Please turn off…",
        ],
      ],
    ),
  ),
  "passive-intro": lessonKit(
    "passive-intro",
    [
      "I can say what is done without saying who does it.",
      "कोण करतो हे न सांगता काय केले जाते ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "Who cleans the office?", "ऑफिस कोण स्वच्छ करते?"],
      [
        "B",
        "The office is cleaned every day. The cleaners come at six.",
        "ऑफिस रोज स्वच्छ केले जाते. सफाई कर्मचारी सहा वाजता येतात.",
      ],
      ["A", "And the reports?", "आणि अहवाल?"],
      [
        "B",
        "They are written by the team and checked by the manager.",
        "ते टीम लिहिते आणि व्यवस्थापक तपासतात.",
      ],
    ],
    ["Object + am / is / are + past participle (+ by …)"],
    [
      gap(
        "The office ___ cleaned every day.",
        "is",
        ["are", "does"],
        "एकवचनी नाम + is cleaned.",
      ),
      gap(
        "The reports ___ written by the team.",
        "are",
        ["is", "do"],
        "अनेकवचनी नाम + are written.",
      ),
      und(
        "'A letter is written by Riya.' मध्ये भर कशावर आहे?",
        "पत्रावर",
        ["रियावर", "लिहिण्याच्या वेळेवर"],
        "passive मध्ये ज्यावर कृती होते त्यावर भर असतो.",
      ),
      e2m(
        "The room is cleaned every day.",
        "खोली दररोज स्वच्छ केली जाते.",
        ["खोली स्वच्छ करा.", "खोली काल स्वच्छ केली."],
        "is cleaned म्हणजे स्वच्छ केली जाते.",
      ),
      m2e(
        "पत्र रोज लिहिले जाते.",
        "The letter is written every day.",
        ["The letter writes every day.", "The letter is write every day."],
        "is + written (तिसरे रूप).",
      ),
      resp(
        "Who writes the reports?",
        "The reports are written by the team.",
        ["The reports writes the team.", "The team is written."],
        "अनेकवचनी passive: are written by … (टीमकडून लिहिले जातात).",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["नोटीस आणि सूचना", "Describing a process"],
      "तुम्ही नवीन सहकाऱ्याला ऑफिसची प्रक्रिया सांगता.",
      "तुम्ही: सहकारी",
      [
        [
          "o",
          "How are the reports prepared here?",
          "इथे अहवाल कसे तयार होतात?",
        ],
        [
          "y",
          "ते टीमकडून लिहिले जातात असे सांगा.",
          "They are written by the team.",
          "They are written…",
        ],
        ["o", "And then?", "आणि मग?"],
        [
          "y",
          "ते व्यवस्थापकाकडून तपासले जातात असे सांगा.",
          "Then they are checked by the manager.",
          "Then they are checked…",
        ],
        ["o", "Understood.", "समजले."],
        [
          "y",
          "विचारा त्यांच्या जुन्या ऑफिसमध्ये ते कसे होते.",
          "How was it done in your old office?",
          "How was it done…",
        ],
      ],
    ),
  ),
  "passive-past": lessonKit(
    "passive-past",
    [
      "I can say what was done in the past.",
      "भूतकाळात काय केले गेले ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "Was the letter sent?", "पत्र पाठवले गेले का?"],
      [
        "B",
        "Yes, it was sent yesterday. The windows were cleaned too.",
        "हो, ते काल पाठवले गेले. खिडक्याही स्वच्छ केल्या गेल्या.",
      ],
      ["A", "Was the work completed on time?", "काम वेळेवर पूर्ण झाले का?"],
      ["B", "Yes, it was completed on Friday.", "हो, ते शुक्रवारी पूर्ण झाले."],
    ],
    ["Object + was / were + past participle"],
    [
      gap(
        "The letter ___ sent yesterday.",
        "was",
        ["were", "is"],
        "एकवचनी + was sent.",
      ),
      gap(
        "The windows ___ cleaned.",
        "were",
        ["was", "are"],
        "अनेकवचनी + were cleaned.",
      ),
      e2m(
        "The work was completed on time.",
        "काम वेळेवर पूर्ण केले गेले.",
        ["काम वेळेवर पूर्ण होईल.", "काम पूर्ण केले नाही."],
        "was completed म्हणजे पूर्ण केले गेले.",
      ),
      m2e(
        "पार्सल काल पाठवले गेले.",
        "The parcel was sent yesterday.",
        ["The parcel is sent yesterday.", "The parcel was send yesterday."],
        "was sent (तिसरे रूप).",
      ),
      resp(
        "Was the room cleaned?",
        "Yes, it was cleaned this morning.",
        ["Yes, it cleaned.", "Yes, it is cleaning morning."],
        "Was … ला Yes, it was …",
      ),
      lis(
        "The invoices were sent on Monday, and the payment was received on Wednesday.",
        "ऐका. पैसे कधी मिळाले?",
        "बुधवारी",
        ["सोमवारी", "शुक्रवारी"],
        "payment was received on Wednesday म्हणजे बुधवारी.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["काय झाले?", "Reporting what was done"],
      "व्यवस्थापक कामाची स्थिती विचारतात.",
      "तुम्ही: कर्मचारी",
      [
        [
          "o",
          "Was the report sent to the client?",
          "अहवाल ग्राहकाला पाठवला गेला का?",
        ],
        [
          "y",
          "होय, तो काल पाठवला गेला असे सांगा.",
          "Yes, it was sent yesterday.",
          "Yes, it was…",
        ],
        ["o", "And the invoices?", "आणि बिले?"],
        [
          "y",
          "ती सोमवारी पाठवली गेली असे सांगा.",
          "They were sent on Monday.",
          "They were…",
        ],
        ["o", "Good.", "छान."],
        [
          "y",
          "विचारा की ग्राहकाकडून काही उत्तर आले आहे का.",
          "Has the client replied yet?",
          "Has the client…",
        ],
      ],
    ),
  ),
  "passive-future": lessonKit(
    "passive-future",
    [
      "I can say what will be done.",
      "पुढे काय केले जाईल ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "When will the parcel be delivered?", "पार्सल कधी पोहोचवले जाईल?"],
      ["B", "It will be delivered tomorrow.", "ते उद्या पोहोचवले जाईल."],
      ["A", "And the results?", "आणि निकाल?"],
      [
        "B",
        "They will be announced soon, and the road will be repaired next week.",
        "ते लवकरच जाहीर केले जातील, आणि रस्त्याची दुरुस्ती पुढच्या आठवड्यात केली जाईल.",
      ],
    ],
    ["Object + will be + past participle"],
    [
      gap(
        "The parcel will ___ delivered tomorrow.",
        "be",
        ["is", "been"],
        "will be + तिसरे रूप.",
      ),
      gap(
        "The results will be ___ soon.",
        "announced",
        ["announce", "announcing"],
        "भविष्यातील passive: will be + तिसरे रूप (announced).",
      ),
      e2m(
        "The road will be repaired.",
        "रस्त्याची दुरुस्ती केली जाईल.",
        ["रस्त्याची दुरुस्ती केली गेली.", "रस्ता दुरुस्त करा."],
        "will be repaired म्हणजे दुरुस्त केली जाईल.",
      ),
      m2e(
        "निकाल लवकरच जाहीर केले जातील.",
        "The results will be announced soon.",
        ["The results will announced soon.", "The results are announce soon."],
        "जाहीर केले जातील = will be announced.",
      ),
      resp(
        "When will the road be repaired?",
        "It will be repaired next week.",
        ["It will repair next week.", "It repair will next week."],
        "दुरुस्त केली जाईल = will be repaired.",
      ),
      lis(
        "The new bridge will be opened next month.",
        "ऐका. पूल कधी उघडला जाईल?",
        "पुढच्या महिन्यात",
        ["पुढच्या आठवड्यात", "काल"],
        "next month म्हणजे पुढच्या महिन्यात.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["घोषणा", "Making an announcement"],
      "तुम्ही सोसायटीच्या बैठकीत घोषणा करता.",
      "तुम्ही: सचिव",
      [
        ["o", "What is happening with the road?", "रस्त्याचे काय चालले आहे?"],
        [
          "y",
          "तो पुढच्या आठवड्यात दुरुस्त केला जाईल असे सांगा.",
          "The road will be repaired next week.",
          "The road will be…",
        ],
        ["o", "And the water supply?", "आणि पाणीपुरवठा?"],
        [
          "y",
          "ती शनिवारी बंद ठेवला जाईल असे सांगा.",
          "The water supply will be stopped on Saturday.",
          "The water supply will be…",
        ],
        ["o", "Thank you.", "धन्यवाद."],
        [
          "y",
          "लोकांना आधी पाणी साठवायला सांगा.",
          "Please store some water before that.",
          "Please store…",
        ],
      ],
    ),
  ),
  "passive-modal": lessonKit(
    "passive-modal",
    [
      "I can say what can, should or must be done.",
      "काय करता येते, करायला हवे किंवा केलेच पाहिजे ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "Can this work be done today?", "हे काम आज केले जाऊ शकते का?"],
      [
        "B",
        "Yes, it can be done today. But the form must be signed first.",
        "हो, आज होऊ शकते. पण आधी फॉर्मवर सही केली गेली पाहिजे.",
      ],
      ["A", "And the room?", "आणि खोली?"],
      [
        "B",
        "It should be cleaned before the guests arrive.",
        "पाहुणे येण्याआधी ती स्वच्छ केली गेली पाहिजे.",
      ],
    ],
    ["Object + can / should / must + be + past participle"],
    [
      gap(
        "This work can ___ done today.",
        "be",
        ["is", "been"],
        "modal + be + तिसरे रूप.",
      ),
      gap(
        "The form must be ___.",
        "signed",
        ["sign", "signing"],
        "सही केली गेली पाहिजे = must be + signed.",
      ),
      e2m(
        "The room should be cleaned.",
        "खोली स्वच्छ केली गेली पाहिजे.",
        ["खोली स्वच्छ झाली.", "खोली स्वच्छ करू नका."],
        "should be cleaned म्हणजे स्वच्छ केली गेली पाहिजे.",
      ),
      m2e(
        "हे आज केले जाऊ शकते.",
        "This can be done today.",
        ["This can done today.", "This can be do today."],
        "केले जाऊ शकते = can be done.",
      ),
      resp(
        "Can the report be finished today?",
        "Yes, it can be finished today.",
        ["Yes, it can finished.", "Yes, report can be finish."],
        "can be + तिसरे रूप.",
      ),
      lis(
        "All forms must be signed before Friday.",
        "ऐका. फॉर्मसाठी काय आवश्यक आहे?",
        "शुक्रवारआधी सही",
        ["शुक्रवारी भरणे", "सोमवारी जमा करणे"],
        "must be signed before Friday म्हणजे शुक्रवारआधी सही.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["कामाचे नियम", "Rules and requirements"],
      "तुम्ही नव्या सहकाऱ्याला प्रक्रिया समजावता.",
      "तुम्ही: वरिष्ठ सहकारी",
      [
        [
          "o",
          "What must be done before I submit the form?",
          "फॉर्म जमा करण्याआधी काय करायला हवे?",
        ],
        [
          "y",
          "फॉर्मवर सही केली गेली पाहिजे असे सांगा.",
          "The form must be signed first.",
          "The form must be…",
        ],
        ["o", "Can it be submitted online?", "तो ऑनलाइन जमा करता येतो का?"],
        [
          "y",
          "हो, तो ऑनलाइनही जमा केला जाऊ शकतो असे सांगा.",
          "Yes, it can be submitted online.",
          "Yes, it can be…",
        ],
        ["o", "Anything else?", "आणखी काही?"],
        [
          "y",
          "कागदपत्रे तपासली गेली पाहिजेत असे सांगा.",
          "All documents should be checked twice.",
          "All documents should be…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "i9",
  path: "intermediate",
  title: "नैसर्गिक इंग्रजी: शब्दजोड्या आणि passive",
  en: "Natural expressions: collocations, phrasal verbs and the passive",
  outcome: [
    "I can use natural word pairs and phrasal verbs, and describe processes with the passive.",
    "मी नैसर्गिक शब्दजोड्या आणि phrasal verbs वापरू शकतो/शकते आणि passive ने प्रक्रिया सांगू शकतो/शकते.",
  ],
  lessons: [
    "collocations",
    "phrasal-verbs",
    "passive-intro",
    "passive-past",
    "passive-future",
    "passive-modal",
  ],
  checkpoint: {
    scenario: [
      "You are writing a short notice for your housing society about a water tank cleaning.",
      "तुम्ही सोसायटीसाठी पाण्याची टाकी स्वच्छ करण्याबद्दल छोटी सूचना लिहीत आहात.",
    ],
    ex: finish("i9", "cp", [
      gap(
        "The tank ___ be cleaned on Sunday.",
        "will",
        ["is", "was"],
        "भविष्यातील passive: will be cleaned.",
      ),
      gap(
        "Residents are asked to ___ off their motors.",
        "turn",
        ["make", "give"],
        "turn off म्हणजे बंद करणे.",
      ),
      resp(
        "When was the tank cleaned last time?",
        "It was cleaned in March.",
        ["It cleaned in March.", "It is clean March."],
        "भूतकाळात was cleaned.",
      ),
      und(
        "कोणते वाक्य नैसर्गिक आहे?",
        "Please take a decision before Friday.",
        [
          "Please make a break before Friday.",
          "Please do a meeting before Friday.",
        ],
        "decision सोबत make/take; वाक्यात फक्त हेच योग्य जोडते.",
      ),
    ]),
    speak:
      "सोसायटीच्या सूचनेत पाण्याची टाकी कधी स्वच्छ केली जाईल, काय करावे लागेल आणि काय करता येणार नाही ते सांगा.",
  },
};
