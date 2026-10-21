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
    "comparing",
    "fluency",
    "Compare two things",
    "दोन गोष्टींची तुलना करा",
    "तुलना करण्यासाठी: -er than (cheaper than), more + लांब शब्द + than (more comfortable than), the + -est / most (the cheapest, the most comfortable), as … as (बरोबरीचे). निवड सांगताना कारण द्या: I would choose … because …",
    "-er / more … than · the -est / the most · as … as",
    [
      [
        "The bus is cheaper than the train, but the train is faster.",
        "बस रेल्वेपेक्षा स्वस्त आहे, पण रेल्वे जलद आहे.",
      ],
      [
        "This phone is more expensive than that one.",
        "हा फोन त्या फोनपेक्षा महाग आहे.",
      ],
      [
        "It is the most comfortable option of the three.",
        "तिघांमध्ये हा सर्वात आरामदायी पर्याय आहे.",
      ],
      [
        "I would choose the train because it is as cheap as the bus and much faster.",
        "मी रेल्वे निवडेन कारण ती बससारखीच स्वस्त आणि खूप जलद आहे.",
      ],
    ],
    "तुमचे दोन पर्याय (उदा. बस आणि रेल्वे) निवडा, तुलना करा आणि तुमची निवड कारणासह सांगा.",
  ),
  newLesson(
    "summarising",
    "fluency",
    "Summarise what you heard or read",
    "थोडक्यात सारांश सांगा",
    "सारांश म्हणजे मुख्य मुद्दे थोडक्यात आणि स्वतःच्या शब्दांत सांगणे. उपयुक्त वाक्ये: The main point is …; In short, …; According to the article, …; To sum up, …; Overall, … तपशील वगळा, फक्त दोन-तीन मुख्य गोष्टी सांगा.",
    "The main point is … · In short, … · According to …",
    [
      [
        "The main point of the article is that sleep improves learning.",
        "लेखाचा मुख्य मुद्दा असा आहे की झोप शिकण्यास मदत करते.",
      ],
      [
        "According to the manager, the project will finish by June.",
        "व्यवस्थापकांच्या म्हणण्यानुसार प्रकल्प जूनपर्यंत संपेल.",
      ],
      [
        "In short, the plan is cheaper and quicker.",
        "थोडक्यात, ही योजना स्वस्त आणि जलद आहे.",
      ],
      ["Overall, the meeting was useful.", "एकंदरीत, बैठक उपयुक्त होती."],
    ],
    "एखादी बातमी किंवा बैठक आठवून तिचा सारांश तीन वाक्यांत सांगा.",
  ),
  newLesson(
    "short-presentation",
    "work",
    "Give a short presentation",
    "छोटे सादरीकरण करा",
    "छोट्या सादरीकरणाचे तीन भाग: सुरुवात (Today I would like to talk about …), मुख्य भाग (First, … Second, … Finally, …) आणि शेवट (To conclude, … Thank you. Are there any questions?). प्रेक्षकांकडे पाहून हळू आणि स्पष्ट बोला. मुद्दे दोन ते तीनच ठेवा.",
    "Opening → 2–3 points (First, Second, Finally) → Conclusion + questions",
    [
      [
        "Today I would like to talk about saving water at home.",
        "आज मला घरी पाणी बचतीबद्दल बोलायचे आहे.",
      ],
      [
        "First, we can fix leaking taps. Second, we can use buckets instead of showers.",
        "पहिले, आपण गळणारे नळ दुरुस्त करू शकतो. दुसरे, शॉवरऐवजी बादली वापरू शकतो.",
      ],
      [
        "To conclude, small habits can save a lot of water.",
        "शेवटी, छोट्या सवयींमुळे खूप पाणी वाचू शकते.",
      ],
      ["Thank you. Are there any questions?", "धन्यवाद. काही प्रश्न आहेत का?"],
    ],
    "'घरी पाणी बचत' किंवा तुमच्या आवडत्या विषयावर तीन मुद्द्यांचे छोटे सादरीकरण बोला.",
  ),
  newLesson(
    "one-minute-talk",
    "fluency",
    "Speak for one to two minutes",
    "एक ते दोन मिनिटे अडखळू न देता बोला",
    "एक-दोन मिनिटे बोलण्यासाठी आधी तीन मुद्दे ठरवा (opening, 2 points, ending). प्रत्येक मुद्द्यासाठी एक कारण आणि एक उदाहरण तयार ठेवा. जोडण्यासाठी First, Also, However, For example, So वापरा. चुकलात तर थांबू नका: Let me say that again. म्हणा आणि पुढे जा. तयारीसाठी दोन मिनिटे घ्या; पूर्ण वाक्ये लिहिण्याऐवजी फक्त मुद्दे लिहा.",
    "Plan 3 points → speak with linking words → recover with 'Let me say that again'",
    [
      [
        "Let me start by saying why this topic matters to me.",
        "हा विषय माझ्यासाठी का महत्त्वाचा आहे ते सांगून सुरुवात करतो/करते.",
      ],
      [
        "First, it saves time. Also, it saves money.",
        "पहिले, त्यामुळे वेळ वाचतो. तसेच, पैसे वाचतात.",
      ],
      [
        "For example, last month I saved two hours every day.",
        "उदाहरणार्थ, गेल्या महिन्यात मी रोज दोन तास वाचवले.",
      ],
      [
        "Sorry, let me say that again. So, the main benefit is time.",
        "माफ करा, मी पुन्हा सांगतो/सांगते. तर, मुख्य फायदा म्हणजे वेळ.",
      ],
    ],
    "तुमच्या आवडत्या छंदाबद्दल एक मिनिट बोला: एक सुरुवात, दोन मुद्दे आणि एक शेवट.",
  ),
  newLesson(
    "listening-styles",
    "sounds",
    "Understanding fast and informal speech",
    "वेगवान आणि अनौपचारिक बोलणे समजणे",
    "खऱ्या संभाषणात लोक वेगाने बोलतात, शब्द जोडतात आणि लहान रूपे वापरतात: gonna = going to, wanna = want to, gotta = have to, 'cause = because, kinda = kind of. शब्द ऐकायला कठीण वाटले तर पूर्ण रूप आठवा. लोकांचे उच्चार आणि वेग वेगवेगळे असतात; या अॅपमध्ये एकच संगणकीय आवाज आहे (काही devices वर अनेक इंग्रजी आवाज असू शकतात). वेगवेगळ्या वेगाने ऐकून सराव करा.",
    "gonna = going to · wanna = want to · gotta = have to · 'cause = because",
    [
      ["I'm gonna call you later.", "मी तुम्हाला नंतर फोन करणार आहे."],
      ["Do you wanna come with us?", "तुम्हाला आमच्यासोबत यायचे आहे का?"],
      [
        "I gotta go now, 'cause I'm late.",
        "मला आता जायला हवे, कारण मला उशीर झाला आहे.",
      ],
      ["It's kinda cold today.", "आज थोडी थंडी आहे."],
    ],
    "वरील वाक्ये वेगवेगळ्या वेगाने ऐका आणि प्रत्येक वाक्याचे पूर्ण रूप सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  comparing: lessonKit(
    "comparing",
    [
      "I can compare two options and explain my choice.",
      "मी दोन पर्यायांची तुलना करू शकतो/शकते आणि माझी निवड समजावू शकतो/शकते.",
    ],
    [
      [
        "A",
        "How should we travel to Pune, by bus or by train?",
        "आपण पुण्याला कसे जायचे, बसने की रेल्वेने?",
      ],
      [
        "B",
        "The bus is cheaper than the train, but the train is faster.",
        "बस रेल्वेपेक्षा स्वस्त आहे, पण रेल्वे जलद आहे.",
      ],
      ["A", "Which is more comfortable?", "कोणता अधिक आरामदायी आहे?"],
      [
        "B",
        "The train. I would choose it because it is much faster and almost as cheap.",
        "रेल्वे. मी ती निवडेन कारण ती खूप जलद आहे आणि जवळजवळ तितकीच स्वस्त आहे.",
      ],
    ],
    [
      "short adjective + -er + than",
      "more + long adjective + than",
      "the + -est / the most + adjective",
      "as + adjective + as",
    ],
    [
      gap(
        "The bus is ___ than the train. (स्वस्त)",
        "cheaper",
        ["more cheap", "cheapest"],
        "लहान शब्द + er + than: cheaper than.",
      ),
      gap(
        "This phone is ___ expensive than that one.",
        "more",
        ["most", "much"],
        "लांब शब्दांसाठी more + adjective + than.",
      ),
      gap(
        "It is the ___ comfortable option.",
        "most",
        ["more", "much"],
        "सर्वोत्तम दर्जासाठी the most.",
      ),
      und(
        "'as cheap as the bus' म्हणजे काय?",
        "बसइतकीच स्वस्त",
        ["बसपेक्षा जास्त स्वस्त", "बसपेक्षा महाग"],
        "as … as म्हणजे तितकेच.",
      ),
      resp(
        "Which option do you prefer?",
        "I would choose the train because it is faster than the bus.",
        ["I choose train than fast.", "Train is most than bus."],
        "निवड आणि तुलना दोन्ही सांगा.",
      ),
      m2e(
        "ही बस रेल्वेपेक्षा हळू आहे.",
        "This bus is slower than the train.",
        ["This bus is more slow than train.", "This bus slower the train."],
        "हळू = slow; तुलना slower than.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["दोन पर्यायांतून निवड", "Choosing between two options"],
      "मित्र प्रवासाचा पर्याय निवडायला मदत मागतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "Should I take the bus or the train to Pune?",
          "मी पुण्याला बसने जाऊ की रेल्वेने?",
        ],
        [
          "y",
          "दोन्हींची तुलना करा.",
          "The bus is cheaper than the train, but the train is faster.",
          "The bus is cheaper than…, but…",
        ],
        ["o", "Which one is more comfortable?", "कोणता अधिक आरामदायी?"],
        [
          "y",
          "तुमची निवड कारणासह सांगा.",
          "I would choose the train because it is more comfortable and it is not much more expensive.",
          "I would choose… because…",
        ],
        ["o", "Thanks.", "धन्यवाद."],
        [
          "y",
          "विचारा त्याला किती वेळ लागतो ते माहीत आहे का.",
          "Do you know how long each one takes?",
          "Do you know how long…",
        ],
      ],
    ),
  ),
  summarising: lessonKit(
    "summarising",
    [
      "I can summarise the main points of something in a few sentences.",
      "मी एखाद्या गोष्टीचे मुख्य मुद्दे काही वाक्यांत सांगू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Can you tell me what the meeting was about?",
        "बैठक कशाबद्दल होती ते सांगाल का?",
      ],
      [
        "B",
        "In short, we discussed the new schedule. The main point is that testing will finish by Friday.",
        "थोडक्यात, आपण नवीन वेळापत्रकावर चर्चा केली. मुख्य मुद्दा असा की चाचणी शुक्रवारपर्यंत पूर्ण होईल.",
      ],
      ["A", "Was it useful?", "ती उपयुक्त होती का?"],
      [
        "B",
        "Overall, yes. According to the manager, we will meet again on Monday.",
        "एकंदरीत, हो. व्यवस्थापकांच्या म्हणण्यानुसार आपण सोमवारी पुन्हा भेटू.",
      ],
    ],
    ["The main point is …", "In short, … · Overall, …", "According to …, …"],
    [
      und(
        "सारांशात काय असावे?",
        "फक्त मुख्य मुद्दे",
        ["प्रत्येक तपशील", "फक्त तुमचे मत"],
        "सारांश म्हणजे मुख्य मुद्दे थोडक्यात.",
      ),
      gap(
        "___ short, the plan is cheaper.",
        "In",
        ["On", "At"],
        "In short म्हणजे थोडक्यात.",
      ),
      gap(
        "___ to the manager, we will meet on Monday.",
        "According",
        ["Accord", "Accordingly"],
        "According to + व्यक्ती.",
      ),
      e2m(
        "Overall, the meeting was useful.",
        "एकंदरीत, बैठक उपयुक्त होती.",
        ["ती बैठक झाली नाही.", "बैठक खूप मोठी होती."],
        "Overall म्हणजे एकंदरीत.",
      ),
      resp(
        "What was the article about?",
        "The main point is that sleep improves learning.",
        ["The article about sleep is.", "Main point sleep article."],
        "The main point is that + वाक्य.",
      ),
      lis(
        "In short, the plan is cheaper and quicker, but it needs more staff.",
        "ऐका. योजनेची कमतरता काय?",
        "जास्त कर्मचारी लागतात",
        ["ती महाग आहे", "ती हळू आहे"],
        "needs more staff ही कमतरता.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["बैठकीचा सारांश", "Summarising a meeting"],
      "व्यवस्थापक बैठक चुकवल्यामुळे तुम्हाला सारांश विचारतात.",
      "तुम्ही: कर्मचारी",
      [
        [
          "o",
          "I missed the meeting. Can you summarise it?",
          "माझी बैठक चुकली. तुम्ही सारांश सांगाल का?",
        ],
        [
          "y",
          "मुख्य मुद्दा सांगा.",
          "In short, we discussed the new schedule. The main point is that testing will finish by Friday.",
          "In short,… The main point is that…",
        ],
        ["o", "Any problems?", "काही अडचणी?"],
        [
          "y",
          "एक अडचण सांगा.",
          "According to the team, we need two more people for testing.",
          "According to…, we need…",
        ],
        [
          "o",
          "I see. Overall, was it positive?",
          "समजले. एकंदरीत, सकारात्मक होती का?",
        ],
        [
          "y",
          "उत्तर द्या आणि विचारा त्यांना लिखित सारांश हवा का.",
          "Overall, yes. Would you like a written summary by email?",
          "Overall, yes. Would you like…",
        ],
      ],
    ),
  ),
  "short-presentation": lessonKit(
    "short-presentation",
    [
      "I can give a short presentation with an opening, points and a conclusion.",
      "मी सुरुवात, मुद्दे आणि शेवट असलेले छोटे सादरीकरण करू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Good morning, everyone. Today I would like to talk about saving water at home.",
        "सुप्रभात सर्वांना. आज मला घरी पाणी बचतीबद्दल बोलायचे आहे.",
      ],
      ["B", "Please go ahead.", "कृपया सुरू करा."],
      [
        "A",
        "First, we can fix leaking taps. Second, we can use buckets instead of showers.",
        "पहिले, आपण गळणारे नळ दुरुस्त करू शकतो. दुसरे, शॉवरऐवजी बादली वापरू शकतो.",
      ],
      [
        "A",
        "To conclude, small habits save a lot of water. Thank you. Are there any questions?",
        "शेवटी, छोट्या सवयींमुळे खूप पाणी वाचते. धन्यवाद. काही प्रश्न आहेत का?",
      ],
    ],
    [
      "Today I would like to talk about …",
      "First, … Second, … Finally, …",
      "To conclude, … Are there any questions?",
    ],
    [
      und(
        "सादरीकरणाची सुरुवात कोणती?",
        "Today I would like to talk about saving water.",
        ["To conclude, we save water.", "Thank you for listening."],
        "सुरुवातीला विषय सांगा.",
      ),
      gap(
        "___, we can fix leaking taps. (पहिले)",
        "First",
        ["Finally", "Overall"],
        "पहिल्या मुद्द्यासाठी First.",
      ),
      gap(
        "To ___, small habits save water.",
        "conclude",
        ["concluding", "conclusion"],
        "To conclude म्हणजे शेवटी.",
      ),
      e2m(
        "Are there any questions?",
        "काही प्रश्न आहेत का?",
        ["तुम्ही काही प्रश्न विचारले का?", "प्रश्न विचारू नका."],
        "शेवटी प्रश्न विचारण्यासाठी हे वाक्य.",
      ),
      resp(
        "Could you repeat your second point?",
        "Of course. My second point is that we can use buckets instead of showers.",
        ["Of course. Second I repeat is.", "Yes second point."],
        "मुद्दा शांतपणे पुन्हा सांगा.",
      ),
      lis(
        "First, fix leaking taps. Second, use buckets. Finally, reuse water for plants.",
        "ऐका. शेवटचा मुद्दा कोणता?",
        "झाडांसाठी पाणी पुन्हा वापरा",
        ["बादली वापरा", "नळ दुरुस्त करा"],
        "Finally म्हणजे शेवटचा मुद्दा: reuse water for plants.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["छोटे सादरीकरण", "A short presentation"],
      "तुम्ही सहकाऱ्यांसमोर तीन मिनिटांचे सादरीकरण करता.",
      "तुम्ही: वक्ता",
      [
        [
          "o",
          "Good morning. Please begin your presentation.",
          "सुप्रभात. कृपया तुमचे सादरीकरण सुरू करा.",
        ],
        [
          "y",
          "विषय सांगून सुरुवात करा.",
          "Good morning, everyone. Today I would like to talk about saving water at home.",
          "Good morning. Today I would like to talk about…",
        ],
        ["o", "Please continue.", "कृपया पुढे चला."],
        [
          "y",
          "दोन मुद्दे सांगा.",
          "First, we can fix leaking taps. Second, we can reuse water for plants.",
          "First,… Second,…",
        ],
        ["o", "Thank you.", "धन्यवाद."],
        [
          "y",
          "शेवट करा आणि प्रश्न विचारा.",
          "To conclude, small habits save a lot of water. Thank you. Are there any questions?",
          "To conclude,… Are there any questions?",
        ],
      ],
    ),
  ),
  "one-minute-talk": lessonKit(
    "one-minute-talk",
    [
      "I can plan and speak for one to two minutes with simple linking words.",
      "मी नियोजन करून सोप्या जोडणाऱ्या शब्दांसह एक ते दोन मिनिटे बोलू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Can you talk for one minute about your hobby?",
        "तुम्ही तुमच्या छंदाबद्दल एक मिनिट बोलू शकाल का?",
      ],
      [
        "B",
        "Sure. Let me start by saying why it matters to me. First, it saves time. Also, it saves money.",
        "नक्की. हा माझ्यासाठी का महत्त्वाचा आहे ते सांगून सुरुवात करतो/करते. पहिले, वेळ वाचतो. तसेच, पैसे वाचतात.",
      ],
      [
        "B",
        "For example, last month I saved two hours every day. Sorry, let me say that again: the main benefit is time.",
        "उदाहरणार्थ, गेल्या महिन्यात मी रोज दोन तास वाचवले. माफ करा, पुन्हा सांगतो/सांगते: मुख्य फायदा म्हणजे वेळ.",
      ],
      ["A", "Thank you. That was clear.", "धन्यवाद. ते स्पष्ट होते."],
    ],
    ["Opening → First / Also / For example → ending", "Let me say that again."],
    [
      und(
        "एक मिनिट बोलण्यासाठी तयारीचा सर्वोत्तम मार्ग कोणता?",
        "फक्त तीन मुद्दे लिहा",
        ["पूर्ण भाषण लिहून पाठ करा", "काहीही तयारी करू नका"],
        "मुद्दे लक्षात ठेवा; पाठांतर नको.",
      ),
      gap(
        "___, it saves time. Also, it saves money. (पहिले)",
        "First",
        ["However", "Finally"],
        "पहिल्या मुद्द्यासाठी First.",
      ),
      gap(
        "___ example, last month I saved two hours.",
        "For",
        ["In", "By"],
        "For example म्हणजे उदाहरणार्थ.",
      ),
      resp(
        "(You made a mistake while speaking.)",
        "Sorry, let me say that again.",
        ["Stop. I cannot.", "Sorry, I silent."],
        "चूक झाली तर थांबू नका, पुन्हा सांगा आणि पुढे चला.",
      ),
      e2m(
        "Let me start by saying why it matters to me.",
        "हा माझ्यासाठी का महत्त्वाचा आहे ते सांगून मी सुरुवात करतो/करते.",
        ["मी आता निघतो.", "मला हे आवडत नाही."],
        "matters to me म्हणजे माझ्यासाठी महत्त्वाचे.",
      ),
      lis(
        "First, it saves time. Also, it saves money. For example, I saved two hours every day.",
        "ऐका. उदाहरण काय आहे?",
        "रोज दोन तास वाचवले",
        ["पैसे वाचवले", "नवीन नोकरी मिळाली"],
        "For example नंतर रोज दोन तास.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["एक मिनिटाचे बोलणे", "A one-minute talk"],
      "सहकारी तुम्हाला तुमच्या छंदाबद्दल बोलायला सांगतात.",
      "तुम्ही: वक्ता",
      [
        [
          "o",
          "Could you talk for one minute about your hobby?",
          "तुम्ही तुमच्या छंदाबद्दल एक मिनिट बोलाल का?",
        ],
        [
          "y",
          "छंद आणि तो महत्त्वाचा का आहे ते सांगून सुरुवात करा.",
          "Sure. Let me start by saying why my hobby matters to me.",
          "Sure. Let me start by saying…",
        ],
        ["o", "Please continue.", "कृपया पुढे चला."],
        [
          "y",
          "दोन मुद्दे आणि एक उदाहरण द्या.",
          "First, it helps me relax. Also, I meet new people. For example, last month I joined a group.",
          "First,… Also,… For example,…",
        ],
        ["o", "Thank you.", "धन्यवाद."],
        [
          "y",
          "शेवट करा आणि विचारा त्यांचा काही छंद आहे का.",
          "That is why I enjoy it. Do you have a hobby too?",
          "That is why… Do you have…",
        ],
      ],
    ),
  ),
  "listening-styles": lessonKit(
    "listening-styles",
    [
      "I can understand common informal short forms in fast speech.",
      "वेगवान बोलण्यातील सामान्य अनौपचारिक संक्षिप्त रूपे मी समजू शकतो/शकते.",
    ],
    [
      [
        "A",
        "I'm gonna call you later, okay?",
        "मी तुम्हाला नंतर फोन करणार आहे, ठीक आहे?",
      ],
      [
        "B",
        "Sure. Do you wanna meet at six?",
        "नक्की. तुम्हाला सहा वाजता भेटायचे आहे का?",
      ],
      [
        "A",
        "I gotta go now, 'cause I'm late.",
        "मला आता जायला हवे, कारण मला उशीर झाला आहे.",
      ],
      [
        "B",
        "Okay. It's kinda cold today, so take a jacket.",
        "ठीक आहे. आज थोडी थंडी आहे, म्हणून जॅकेट घ्या.",
      ],
    ],
    [
      "gonna = going to · wanna = want to",
      "gotta = have to · 'cause = because · kinda = kind of",
    ],
    [
      und(
        "'gonna' म्हणजे काय?",
        "going to",
        ["gone to", "got to"],
        "gonna म्हणजे going to.",
      ),
      und(
        "'wanna' म्हणजे काय?",
        "want to",
        ["wait to", "went to"],
        "wanna म्हणजे want to.",
      ),
      und(
        "'gotta' म्हणजे काय?",
        "have to / must",
        ["got a", "go to"],
        "gotta म्हणजे have to.",
      ),
      lis(
        "I'm gonna call you tonight.",
        "ऐका. व्यक्ती काय करणार आहे?",
        "रात्री फोन करणार",
        ["सकाळी भेटणार", "आधीच फोन केला"],
        "gonna call you tonight म्हणजे रात्री फोन करणार.",
      ),
      e2m(
        "I gotta go now, 'cause I'm late.",
        "मला आता जायला हवे, कारण मला उशीर झाला आहे.",
        ["मला आता यायला नको.", "मी आता जेवत आहे."],
        "जायला हवे = gotta (have to); कारण = 'cause (because).",
      ),
      resp(
        "Do you wanna come with us?",
        "Yes, I want to come. What time?",
        ["Yes, I wanna comes.", "No wanna."],
        "wanna चे पूर्ण रूप want to आणि उत्तर.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["वेगवान गप्पा", "Casual conversation"],
      "तुमचा मित्र वेगाने आणि अनौपचारिक बोलतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "Hey, I'm gonna grab some tea. Wanna come?",
          "अरे, मी चहा घ्यायला जातोय. येणार का?",
        ],
        [
          "y",
          "उत्तर द्या: हो, येणार आहे.",
          "Yes, I want to come. Let's go.",
          "Yes, I want to…",
        ],
        [
          "o",
          "Cool. I gotta be back by five, 'cause I have a meeting.",
          "छान. मला पाचपर्यंत परत यायला हवे, कारण माझी बैठक आहे.",
        ],
        [
          "y",
          "'तुम्ही पाचपर्यंत परत यायला हवे' समजले असे सांगा आणि कारण पुन्हा सांगा.",
          "I understand. You have to be back by five because of your meeting.",
          "I understand. You have to…",
        ],
        ["o", "Exactly.", "अगदी बरोबर."],
        [
          "y",
          "हळू बोलायला सांगा.",
          "Could you speak a bit slowly next time, please?",
          "Could you speak…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "i10",
  path: "intermediate",
  title: "तुलना, सारांश आणि सादरीकरण",
  en: "Comparing, summarising and short presentations",
  outcome: [
    "I can compare options, summarise ideas and speak for one to two minutes.",
    "मी पर्यायांची तुलना करू शकतो/शकते, मुद्द्यांचा सारांश सांगू शकतो/शकते आणि एक ते दोन मिनिटे बोलू शकतो/शकते.",
  ],
  lessons: [
    "comparing",
    "summarising",
    "short-presentation",
    "one-minute-talk",
    "listening-styles",
  ],
  checkpoint: {
    scenario: [
      "Your team must choose between two vendors, and you present your recommendation.",
      "तुमच्या टीमला दोन पुरवठादारांपैकी एक निवडायचा आहे आणि तुम्ही तुमची शिफारस सादर करता.",
    ],
    ex: finish("i10", "cp", [
      resp(
        "Which vendor do you recommend?",
        "I recommend Vendor A because it is cheaper than Vendor B and delivers on time.",
        ["Vendor A is cheap than B.", "I recommend because A B."],
        "तुलना आणि कारण द्या.",
      ),
      gap(
        "Vendor B is ___ expensive than Vendor A.",
        "more",
        ["most", "much"],
        "लांब शब्दासाठी more … than.",
      ),
      und(
        "सादरीकरणाचा शेवट कोणत्या वाक्याने करावा?",
        "To conclude, Vendor A is the best choice. Are there any questions?",
        ["First, let me introduce the vendors.", "Sorry, let me start again."],
        "शेवटी निष्कर्ष आणि प्रश्न.",
      ),
      lis(
        "I'm gonna send the report tonight, 'cause the deadline is tomorrow.",
        "ऐका. ते रिपोर्ट कधी पाठवतील?",
        "आज रात्री",
        ["उद्या सकाळी", "काल"],
        "gonna send tonight म्हणजे आज रात्री पाठवणार.",
      ),
    ]),
    speak:
      "दोन पुरवठादारांची तुलना करून तुमची शिफारस एका मिनिटात सादर करा: सुरुवात, दोन मुद्दे आणि शेवट.",
  },
};
