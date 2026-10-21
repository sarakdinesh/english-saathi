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
    "work-update",
    "work",
    "Give a work update",
    "कामाची प्रगती सांगा",
    "कामाचे अपडेट देताना तीन भाग सांगा: काय पूर्ण झाले (I have finished…), सध्या काय सुरू आहे (I am working on…) आणि पुढे काय करणार (I will… / I am going to…). अडचण असेल तर सांगा आणि मदत किंवा वेळ मागा.",
    "Done: I have finished … · Now: I am working on … · Next: I will … · Problem: I need …",
    [
      [
        "I have finished the first draft of the report.",
        "मी अहवालाचा पहिला मसुदा पूर्ण केला आहे.",
      ],
      [
        "I am working on the charts at the moment.",
        "सध्या मी तक्त्यांवर काम करत आहे.",
      ],
      [
        "I will send it to you by Thursday evening.",
        "मी तो गुरुवारी संध्याकाळपर्यंत तुम्हाला पाठवेन.",
      ],
      [
        "I need two more days because the data is incomplete.",
        "माहिती अपूर्ण आहे, म्हणून मला आणखी दोन दिवस हवे आहेत.",
      ],
    ],
    "तुमच्या सध्याच्या कामाचे किंवा अभ्यासाचे अपडेट: काय पूर्ण झाले, काय सुरू आहे आणि पुढे काय.",
  ),
  newLesson(
    "meetings",
    "work",
    "In a meeting",
    "बैठकीत बोला",
    "बैठकीत उपयुक्त वाक्ये: सुरुवात (Let's get started.), मत (I would suggest…), प्रश्न (Could you clarify…?), मध्येच बोलणे (Sorry to interrupt, but …), आणि सारांश (To sum up, …). नम्र रहा आणि लहान वाक्ये वापरा.",
    "Let's get started · I would suggest … · Could you clarify …? · To sum up, …",
    [
      [
        "Let's get started. The first item is the schedule.",
        "चला सुरू करूया. पहिला मुद्दा वेळापत्रकाचा आहे.",
      ],
      [
        "I would suggest that we finish testing by Friday.",
        "मी सुचवेन की आपण चाचणी शुक्रवारपर्यंत पूर्ण करावी.",
      ],
      [
        "Could you clarify what you mean by 'final version'?",
        "'final version' म्हणजे काय ते तुम्ही स्पष्ट कराल का?",
      ],
      [
        "To sum up, we agreed to meet again on Monday.",
        "सारांश: आपण सोमवारी पुन्हा भेटायचे ठरवले.",
      ],
    ],
    "एखाद्या छोट्या बैठकीत तुम्ही एक सूचना, एक प्रश्न आणि शेवटी सारांश कसा सांगाल ते बोला.",
  ),
  newLesson(
    "work-calls",
    "work",
    "Work calls and requests",
    "कामाचे फोन आणि विनंती",
    "कामाच्या फोनवर स्वतःची आणि कंपनीची ओळख द्या, कारण सांगा, आणि नम्र विनंती करा: I am calling about …; Could you send me …?; Would it be possible to …?; I will follow up with an email. शेवटी आभार माना आणि पुढील पावले सांगा.",
    "I am calling about … · Could you … ? · Would it be possible to … ? · I will follow up …",
    [
      [
        "Good morning, this is Rahul from Sunrise Traders. I am calling about the invoice.",
        "सुप्रभात, मी सनराइज ट्रेडर्समधून राहुल बोलतोय. मी बिलाबद्दल फोन करतोय.",
      ],
      [
        "Could you send me the corrected invoice today?",
        "तुम्ही आज मला दुरुस्त केलेले बिल पाठवाल का?",
      ],
      [
        "Would it be possible to extend the deadline by one day?",
        "अंतिम मुदत एक दिवस वाढवता येईल का?",
      ],
      [
        "Thank you. I will follow up with an email.",
        "धन्यवाद. मी ईमेलने पाठपुरावा करेन.",
      ],
    ],
    "एखाद्या पुरवठादाराला फोन करून बिल दुरुस्त करायला सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  "office-help": lessonKit(
    "office-help",
    [
      "I can ask a colleague for help and check that I understand.",
      "मी सहकाऱ्याकडे मदत मागू शकतो/शकते आणि मला समजले आहे का ते तपासू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Do you have a minute? I need some help with this report.",
        "तुमच्याकडे एक मिनिट आहे का? मला या अहवालासाठी मदत हवी आहे.",
      ],
      ["B", "Sure. What is the problem?", "नक्की. काय अडचण आहे?"],
      [
        "A",
        "I do not understand this part. Could you explain it?",
        "मला हा भाग समजत नाही. तुम्ही समजावून सांगाल का?",
      ],
      [
        "B",
        "Of course. ... Does that make sense?",
        "नक्कीच. ... आता समजले का?",
      ],
    ],
    [
      "Do you have a minute?",
      "I need some help with …",
      "Could you explain …? · Does that make sense?",
    ],
    [
      resp(
        "Do you have a minute?",
        "Sure. What can I do for you?",
        ["Yes, minute is.", "No, I minute."],
        "विनंतीला नम्रपणे उत्तर द्या.",
      ),
      gap(
        "I need some help ___ this report.",
        "with",
        ["on", "at"],
        "need help with + गोष्ट.",
      ),
      gap(
        "Could you ___ this part?",
        "explain",
        ["explains", "explained"],
        "Could you नंतर मूळ रूप.",
      ),
      e2m(
        "Thanks, that makes sense now.",
        "धन्यवाद, आता ते समजले.",
        ["धन्यवाद, आता ते चुकीचे आहे.", "धन्यवाद, मी निघतो."],
        "makes sense म्हणजे समजले/अर्थ लागला.",
      ),
      m2e(
        "तुम्ही हे पुन्हा समजावून सांगाल का?",
        "Could you explain this again?",
        ["Could you explaining this again?", "You could explain again this?"],
        "Could you + मूळ क्रियापद.",
      ),
      lis(
        "I did not understand the second page. Could you go through it with me?",
        "ऐका. व्यक्तीला काय हवे आहे?",
        "दुसरे पान समजावून सांगणे",
        ["नवीन अहवाल", "सुट्टी"],
        "go through it with me म्हणजे माझ्यासोबत समजून घ्या.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["सहकाऱ्याकडे मदत", "Asking a colleague for help"],
      "तुम्हाला एका अहवालात अडचण येत आहे.",
      "तुम्ही: कर्मचारी",
      [
        [
          "o",
          "Hi, do you need anything?",
          "नमस्कार, तुम्हाला काही हवे आहे का?",
        ],
        [
          "y",
          "वेळ आहे का ते विचारा आणि अडचण सांगा.",
          "Do you have a minute? I do not understand the second page of this report.",
          "Do you have a minute? I do not…",
        ],
        ["o", "Sure. Which part?", "नक्की. कोणता भाग?"],
        [
          "y",
          "भाग सांगा आणि समजावून सांगायला सांगा.",
          "This table. Could you explain how you calculated it?",
          "This… Could you explain…",
        ],
        [
          "o",
          "Of course. First, we add the totals.",
          "नक्कीच. आधी आपण बेरीज करतो.",
        ],
        [
          "y",
          "समजले का ते सांगा आणि आभार माना.",
          "That makes sense now. Thank you for your time.",
          "That makes sense…",
        ],
      ],
    ),
  ),
  "work-update": lessonKit(
    "work-update",
    [
      "I can give a short update on my work.",
      "मी माझ्या कामाबद्दल छोटे अपडेट देऊ शकतो/शकते.",
    ],
    [
      [
        "A",
        "Can you give me a quick update on the report?",
        "अहवालाबद्दल थोडे अपडेट द्याल का?",
      ],
      [
        "B",
        "Yes. I have finished the first draft. I am working on the charts now.",
        "हो. मी पहिला मसुदा पूर्ण केला आहे. आता तक्त्यांवर काम करत आहे.",
      ],
      ["A", "Any problems?", "काही अडचणी?"],
      [
        "B",
        "The data is incomplete, so I need two more days. I will send it by Friday.",
        "माहिती अपूर्ण आहे, म्हणून मला आणखी दोन दिवस हवे आहेत. मी शुक्रवारपर्यंत पाठवेन.",
      ],
    ],
    [
      "I have finished …",
      "I am working on …",
      "I will … by …",
      "I need … because …",
    ],
    [
      gap(
        "I ___ finished the first draft.",
        "have",
        ["am", "will"],
        "पूर्ण झालेल्या कामासाठी have finished.",
      ),
      gap(
        "I ___ working on the charts now.",
        "am",
        ["have", "will"],
        "सध्या सुरू असलेल्या कामासाठी am working.",
      ),
      gap(
        "I ___ send it by Friday.",
        "will",
        ["am", "have"],
        "भविष्यातील वचनासाठी will.",
      ),
      und(
        "कोणते वाक्य अडचण आणि कारण सांगते?",
        "I need more time because the data is incomplete.",
        ["I have finished the draft.", "I will send it by Friday."],
        "need … because … अडचण आणि कारण सांगते.",
      ),
      resp(
        "Can you give me a quick update?",
        "I have finished the draft and I am now working on the charts.",
        ["I finish draft now charts.", "Update is quick."],
        "काय पूर्ण झाले आणि काय सुरू आहे ते सांगा.",
      ),
      lis(
        "I have completed testing and I am fixing two small bugs. I will release it on Monday.",
        "ऐका. ते कधी रिलीज करतील?",
        "सोमवारी",
        ["आज", "शुक्रवारी"],
        "release it on Monday म्हणजे सोमवारी.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["कामाचे अपडेट", "A work update"],
      "तुमचे व्यवस्थापक अहवालाबद्दल विचारतात.",
      "तुम्ही: कर्मचारी",
      [
        [
          "o",
          "Can you give me a quick update on the report?",
          "अहवालाबद्दल थोडे अपडेट द्याल का?",
        ],
        [
          "y",
          "काय पूर्ण झाले आणि सध्या काय सुरू आहे ते सांगा.",
          "Yes. I have finished the first draft and I am working on the charts.",
          "Yes. I have finished… I am working on…",
        ],
        ["o", "Are there any problems?", "काही अडचणी आहेत का?"],
        [
          "y",
          "अडचण आणि त्याचे कारण सांगा.",
          "The data is incomplete, so I need two more days.",
          "The data is…, so I need…",
        ],
        ["o", "Okay. When will you send it?", "ठीक आहे. तुम्ही तो कधी पाठवाल?"],
        [
          "y",
          "वेळ सांगा आणि प्रश्न विचारा की त्यांना काही बदल हवे आहेत का.",
          "I will send it by Friday. Would you like any changes?",
          "I will send it by… Would you like…",
        ],
      ],
      true,
    ),
  ),
  meetings: lessonKit(
    "meetings",
    [
      "I can take part in a short meeting.",
      "मी छोट्या बैठकीत सहभाग घेऊ शकतो/शकते.",
    ],
    [
      [
        "A",
        "Let's get started. The first item is the schedule.",
        "चला सुरू करूया. पहिला मुद्दा वेळापत्रकाचा आहे.",
      ],
      [
        "B",
        "I would suggest that we finish testing by Friday.",
        "मी सुचवेन की आपण चाचणी शुक्रवारपर्यंत पूर्ण करावी.",
      ],
      ["A", "Could you clarify why Friday?", "शुक्रवारच का ते स्पष्ट कराल का?"],
      [
        "B",
        "Because the client visits on Monday. To sum up, we need a final version by Friday.",
        "कारण ग्राहक सोमवारी येतो. सारांश: आपल्याला शुक्रवारपर्यंत अंतिम आवृत्ती हवी.",
      ],
    ],
    [
      "Let's get started.",
      "I would suggest …",
      "Could you clarify …? · Sorry to interrupt, but …",
      "To sum up, …",
    ],
    [
      und(
        "बैठकीच्या शेवटी कोणता वाक्प्रचार वापराल?",
        "To sum up, …",
        ["Let's get started.", "Sorry to interrupt."],
        "To sum up म्हणजे सारांश.",
      ),
      gap(
        "I would ___ that we finish by Friday.",
        "suggest",
        ["suggests", "suggesting"],
        "would नंतर मूळ रूप.",
      ),
      gap(
        "Could you ___ what you mean?",
        "clarify",
        ["clarifies", "clarified"],
        "Could you नंतर मूळ रूप.",
      ),
      e2m(
        "Sorry to interrupt, but I have a question.",
        "मध्येच बोलल्याबद्दल माफ करा, पण मला एक प्रश्न आहे.",
        ["माफ करा, मी निघतो.", "मी तुम्हाला प्रश्न विचारला नाही."],
        "interrupt म्हणजे मध्येच बोलणे.",
      ),
      resp(
        "Does anyone have questions?",
        "Yes. Could you clarify the deadline?",
        ["Yes, deadline clarify.", "Questions have I."],
        "प्रश्न नम्रपणे विचारा.",
      ),
      lis(
        "To sum up, we agreed to meet again on Monday and send the draft by Friday.",
        "ऐका. ठरल्याप्रमाणे सोमवारी काय आहे?",
        "पुन्हा भेट",
        ["मसुदा पाठवणे", "सुट्टी"],
        "meet again on Monday म्हणजे सोमवारी पुन्हा भेट.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["बैठकीत", "In a team meeting"],
      "तुम्ही टीम बैठकीत सहभागी आहात.",
      "तुम्ही: टीम सदस्य",
      [
        [
          "o",
          "Let's get started. We need to decide the date for the test.",
          "चला सुरू करूया. आपल्याला चाचणीची तारीख ठरवायची आहे.",
        ],
        [
          "y",
          "तुमची सूचना कारणासह सांगा.",
          "I would suggest Friday, because the client visits on Monday.",
          "I would suggest…, because…",
        ],
        ["o", "That might be difficult.", "ते कठीण असू शकते."],
        [
          "y",
          "स्पष्ट करायला सांगा किंवा विचारा काय अडचण आहे.",
          "Could you clarify what the difficulty is?",
          "Could you clarify…",
        ],
        [
          "o",
          "We do not have enough staff on Friday.",
          "शुक्रवारी आपल्याकडे पुरेसे कर्मचारी नाहीत.",
        ],
        [
          "y",
          "पर्याय सुचवा आणि सारांश द्या.",
          "Then how about Thursday? To sum up, we test on Thursday and review on Friday.",
          "Then how about… To sum up,…",
        ],
      ],
    ),
  ),
  "work-calls": lessonKit(
    "work-calls",
    [
      "I can make a work call and make a polite request.",
      "मी कामाचा फोन करू शकतो/शकते आणि नम्र विनंती करू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Good morning, this is Rahul from Sunrise Traders. I am calling about the invoice.",
        "सुप्रभात, मी सनराइज ट्रेडर्समधून राहुल बोलतोय. मी बिलाबद्दल फोन करतोय.",
      ],
      ["B", "Good morning. How can I help you?", "सुप्रभात. मी कशी मदत करू?"],
      [
        "A",
        "Could you send me the corrected invoice today?",
        "तुम्ही आज मला दुरुस्त केलेले बिल पाठवाल का?",
      ],
      [
        "B",
        "Of course. I will send it by two.",
        "नक्कीच. मी दोन वाजेपर्यंत पाठवेन.",
      ],
    ],
    [
      "I am calling about …",
      "Could you … ? · Would it be possible to … ?",
      "I will follow up with an email.",
    ],
    [
      gap(
        "I am calling ___ the invoice.",
        "about",
        ["for to", "at"],
        "कारण सांगताना calling about.",
      ),
      und(
        "कोणती विनंती अधिक नम्र आहे?",
        "Would it be possible to extend the deadline?",
        ["Extend the deadline.", "You extend deadline now."],
        "Would it be possible to…? अधिक नम्र आहे.",
      ),
      e2m(
        "I will follow up with an email.",
        "मी ईमेलने पाठपुरावा करेन.",
        ["मी ईमेल करणार नाही.", "मी फोन उचलला."],
        "follow up म्हणजे पाठपुरावा.",
      ),
      m2e(
        "तुम्ही आज मला बिल पाठवाल का?",
        "Could you send me the invoice today?",
        [
          "Could you sending me invoice today?",
          "You could send the invoice me today?",
        ],
        "Could you + मूळ क्रियापद.",
      ),
      resp(
        "How can I help you?",
        "I am calling about the invoice. Could you send the corrected one?",
        ["I am calling the invoice.", "Invoice about am I."],
        "फोन करण्याचे कारण सांगा आणि विनंती करा.",
      ),
      lis(
        "I will send the corrected invoice by two o'clock, and I will follow up with an email.",
        "ऐका. बिल कधीपर्यंत येईल?",
        "दोन वाजेपर्यंत",
        ["उद्यापर्यंत", "आजच्या रात्रीपर्यंत"],
        "by two o'clock म्हणजे दोन वाजेपर्यंत.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["कामाचा फोन", "A work call"],
      "तुम्ही पुरवठादाराला बिलाबद्दल फोन करता.",
      "तुम्ही: कर्मचारी",
      [
        [
          "o",
          "Good morning, Sunrise Traders. How can I help you?",
          "सुप्रभात, सनराइज ट्रेडर्स. मी कशी मदत करू?",
        ],
        [
          "y",
          "ओळख द्या आणि बिलाबद्दल फोन केला आहे असे सांगा.",
          "Good morning, this is Rahul. I am calling about the invoice.",
          "Good morning, this is… I am calling about…",
        ],
        ["o", "What is the problem?", "काय अडचण आहे?"],
        [
          "y",
          "चुकीची रक्कम आहे असे सांगा आणि दुरुस्त बिल मागा.",
          "The amount is wrong. Could you send the corrected invoice today?",
          "The amount is wrong. Could you…",
        ],
        [
          "o",
          "Of course. I will send it by two.",
          "नक्कीच. मी दोन वाजेपर्यंत पाठवेन.",
        ],
        [
          "y",
          "आभार माना आणि पाठपुरावा करण्याबद्दल सांगा.",
          "Thank you. I will follow up with an email.",
          "Thank you. I will…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "i5",
  path: "intermediate",
  title: "कामाच्या ठिकाणचे इंग्रजी",
  en: "Workplace updates, meetings, requests and calls",
  outcome: [
    "I can give an update, join a meeting and make a polite work call.",
    "मी कामाचे अपडेट देऊ शकतो/शकते, बैठकीत सहभागी होऊ शकतो/शकते आणि कामाचा फोन करू शकतो/शकते.",
  ],
  lessons: ["office-help", "work-update", "meetings", "work-calls"],
  checkpoint: {
    scenario: [
      "Your client wants to change the delivery date, and you must reply politely.",
      "तुमचा ग्राहक वितरणाची तारीख बदलू इच्छितो आणि तुम्हाला नम्रपणे उत्तर द्यायचे आहे.",
    ],
    ex: finish("i5", "cp", [
      resp(
        "Can we move the delivery to Wednesday?",
        "Let me check. I would suggest Thursday, because the packing is not finished.",
        ["Delivery Wednesday no.", "I check am."],
        "नम्रपणे पर्याय आणि कारण द्या.",
      ),
      gap(
        "I ___ finished packing and I am checking the labels.",
        "have",
        ["will", "do"],
        "पूर्ण झालेल्या कामासाठी have finished.",
      ),
      gap(
        "Would it ___ possible to deliver on Thursday?",
        "be",
        ["is", "being"],
        "नम्र विनंतीसाठी Would it be possible to … ? ही रचना वापरतात.",
      ),
      und(
        "बैठक संपवताना कोणते वाक्य योग्य?",
        "To sum up, we will deliver on Thursday.",
        ["Let's get started.", "Sorry to interrupt."],
        "To sum up ने सारांश सांगतात.",
      ),
    ]),
    speak:
      "ग्राहकाला कळवा की पॅकिंग सुरू आहे, काही पूर्ण झाले आहे आणि गुरुवारी वितरण होईल.",
  },
};
