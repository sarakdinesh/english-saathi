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
    "opinions",
    "fluency",
    "Give your opinion",
    "तुमचे मत कारणासह मांडा",
    "मत मांडताना In my opinion, … / I think … / I believe … वापरा आणि कारण द्या: because, since. सुरुवातीला मत, मग कारण आणि गरज असल्यास उदाहरण द्या. अनिश्चित असल्यास I am not sure, but … म्हणा.",
    "In my opinion + opinion, because + reason",
    [
      [
        "In my opinion, learning English is useful for every job.",
        "माझ्या मते, प्रत्येक नोकरीसाठी इंग्रजी शिकणे उपयुक्त आहे.",
      ],
      [
        "I think daily practice is better than long weekly classes.",
        "मला वाटते रोजचा सराव आठवड्याच्या लांब वर्गांपेक्षा चांगला आहे.",
      ],
      [
        "I believe public transport should be cheaper because many people depend on it.",
        "मला वाटते सार्वजनिक वाहतूक स्वस्त असावी, कारण अनेक लोक तिच्यावर अवलंबून असतात.",
      ],
      [
        "I am not sure, but I think it will help.",
        "मला खात्री नाही, पण मला वाटते त्याचा उपयोग होईल.",
      ],
    ],
    "एका विषयावर (उदा. मोबाईल, ऑनलाइन शिक्षण) तुमचे मत कारणासह बोला.",
  ),
  newLesson(
    "agree-disagree",
    "fluency",
    "Agree and disagree politely",
    "नम्रपणे सहमत आणि असहमत व्हा",
    "सहमतीसाठी: I agree. / That is true. / Exactly. असहमतीसाठी थेट 'No, you are wrong' म्हणू नका; म्हणा: I see your point, but … / I am not sure I agree, because … / I understand, however … आधी समोरच्याचा मुद्दा मान्य करा, मग तुमचे मत सांगा.",
    "I see your point, but … · I am not sure I agree, because …",
    [
      [
        "I agree with you. That is a good idea.",
        "मी तुमच्याशी सहमत आहे. ही चांगली कल्पना आहे.",
      ],
      [
        "I see your point, but I think it is expensive.",
        "तुमचा मुद्दा समजला, पण मला वाटते ते महाग आहे.",
      ],
      [
        "I am not sure I agree, because it takes a lot of time.",
        "मला पटत नाही, कारण त्याला खूप वेळ लागतो.",
      ],
      [
        "That is true, however we should try it once.",
        "ते खरे आहे, तरीही आपण एकदा प्रयत्न करूया.",
      ],
    ],
    "एखाद्या कल्पनेशी अर्धे सहमत व्हा आणि एक नम्र असहमती सांगा.",
  ),
  newLesson(
    "follow-up",
    "fluency",
    "Ask follow-up questions",
    "संभाषण पुढे नेणारे प्रश्न",
    "संभाषण चालू ठेवण्यासाठी पुढचे प्रश्न विचारा: Really? What happened next? Why did you choose that? How did you feel? What about you? फक्त Yes/No ने थांबू नका. समोरच्याचे उत्तर ऐकून त्यातील एका शब्दावरून प्रश्न तयार करा.",
    "Really? + wh- question · What about you?",
    [
      [
        "I started a new job last month. — Oh, really? How is it going?",
        "मी गेल्या महिन्यात नवीन नोकरी सुरू केली. — अरे, खरंच? कशी चालली आहे?",
      ],
      [
        "I go to the gym early. — Why do you go so early?",
        "मी पहाटे व्यायामशाळेत जातो. — इतक्या लवकर का जाता?",
      ],
      [
        "I visited Goa. — What was the best part?",
        "मी गोव्याला गेलो/गेले. — सर्वात चांगला भाग कोणता?",
      ],
      [
        "I like cooking. — What about you?",
        "मला स्वयंपाक आवडतो. — आणि तुम्हाला?",
      ],
    ],
    "एखाद्या मित्राने 'मी नवीन छंद सुरू केला' असे म्हटले तर तुम्ही तीन पुढचे प्रश्न विचारा.",
  ),
  newLesson(
    "keep-talking",
    "fluency",
    "Keep the conversation going",
    "अडखळल्यास बोलणे थांबू देऊ नका",
    "योग्य शब्द आठवत नसेल तेव्हा थांबू नका. वेळ घेण्यासाठी: Let me think. / Well, … / How can I put it? दुसऱ्या शब्दांत सांगण्यासाठी: What I mean is … / In other words, … / It is something you use to …. यामुळे संभाषण थांबत नाही.",
    "Well, … · What I mean is … · It is something you use to …",
    [
      ["Well, let me think for a moment.", "बरं, मला क्षणभर विचार करू द्या."],
      [
        "What I mean is, I need more time.",
        "मला म्हणायचे आहे की मला अधिक वेळ हवा आहे.",
      ],
      [
        "It is something you use to cut vegetables.",
        "ती अशी वस्तू आहे जी भाजी कापायला वापरतात.",
      ],
      [
        "Sorry, how can I put it? I felt a little worried.",
        "माफ करा, कसे सांगू? मला थोडी काळजी वाटली.",
      ],
    ],
    "एखादी वस्तू नाव न घेता तिचे वर्णन करा आणि दुसऱ्याला ती ओळखायला सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  opinions: lessonKit(
    "opinions",
    [
      "I can give an opinion with a reason.",
      "मी कारणासह माझे मत सांगू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Do you think children should use phones?",
        "मुलांनी फोन वापरावेत असे तुम्हाला वाटते का?",
      ],
      [
        "B",
        "In my opinion, only for a short time, because too much screen time is tiring.",
        "माझ्या मते, थोडा वेळच, कारण जास्त स्क्रीन वेळ थकवणारा असतो.",
      ],
      ["A", "What about learning?", "शिकण्याचे काय?"],
      [
        "B",
        "I am not sure, but I think good apps can help.",
        "मला खात्री नाही, पण चांगले ॲप्स मदत करू शकतात असे वाटते.",
      ],
    ],
    [
      "In my opinion, … because …",
      "I think / I believe …",
      "I am not sure, but …",
    ],
    [
      und(
        "मत मांडण्याची योग्य सुरुवात कोणती?",
        "In my opinion, …",
        ["In my opinion are …", "My opinion in …"],
        "In my opinion, + मत.",
      ),
      gap(
        "I think daily practice ___ better.",
        "is",
        ["are", "be"],
        "practice एकवचनी असल्याने is.",
      ),
      gap(
        "I believe it is useful ___ it saves time.",
        "because",
        ["but", "so"],
        "कारणासाठी because.",
      ),
      e2m(
        "I am not sure, but I think it will help.",
        "मला खात्री नाही, पण मला वाटते त्याचा उपयोग होईल.",
        ["मला खात्री आहे की ते मदत करणार नाही.", "मी तिथे नव्हतो."],
        "I am not sure, but … म्हणजे खात्री नाही, पण …",
      ),
      resp(
        "What do you think about online classes?",
        "In my opinion, they are useful because we can learn from home.",
        ["In my opinion online classes are.", "Classes online me."],
        "मत आणि कारण द्या.",
      ),
      lis(
        "I think public transport should be cheaper because many people use it.",
        "ऐका. व्यक्तीचे मत काय आहे?",
        "सार्वजनिक वाहतूक स्वस्त असावी",
        ["वाहतूक महाग असावी", "वाहतूक बंद व्हावी"],
        "should be cheaper म्हणजे स्वस्त असावी.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["मत मांडणे", "Giving an opinion"],
      "मित्र तुम्हाला एका विषयावर मत विचारतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "Do you think working from home is better than working in the office?",
          "घरून काम करणे ऑफिसपेक्षा चांगले आहे असे तुम्हाला वाटते का?",
        ],
        [
          "y",
          "तुमचे मत कारणासह सांगा.",
          "In my opinion, it depends, because some jobs need teamwork.",
          "In my opinion, … because…",
        ],
        ["o", "Can you give an example?", "तुम्ही उदाहरण देऊ शकाल का?"],
        [
          "y",
          "एक उदाहरण द्या.",
          "For example, in my job we solve problems faster in person.",
          "For example,…",
        ],
        ["o", "Interesting.", "रंजक आहे."],
        ["y", "त्याचे मत विचारा.", "What do you think?", "What do you…"],
      ],
    ),
  ),
  "agree-disagree": lessonKit(
    "agree-disagree",
    [
      "I can agree and disagree politely.",
      "मी नम्रपणे सहमत आणि असहमत होऊ शकतो/शकते.",
    ],
    [
      ["A", "I think we should take a taxi.", "मला वाटते आपण टॅक्सी घ्यावी."],
      [
        "B",
        "I see your point, but it is expensive.",
        "तुमचा मुद्दा समजला, पण ती महाग आहे.",
      ],
      ["A", "True. What do you suggest?", "खरे आहे. तुम्ही काय सुचवता?"],
      [
        "B",
        "Let's take the bus. I agree it is slower, however it is cheaper.",
        "बसने जाऊया. बस हळू आहे हे मान्य, तरीही ती स्वस्त आहे.",
      ],
    ],
    [
      "I agree. · That is true.",
      "I see your point, but …",
      "I am not sure I agree, because …",
    ],
    [
      und(
        "कोणते वाक्य अधिक नम्र असहमती दाखवते?",
        "I see your point, but I think it is expensive.",
        ["You are wrong.", "No. Not good."],
        "आधी मुद्दा मान्य करून मग मत सांगा.",
      ),
      gap(
        "I am not sure I ___, because it takes time.",
        "agree",
        ["agrees", "agreeing"],
        "असहमतीसाठी I am not sure I agree. असे नम्रपणे म्हणतात; agree नंतर s किंवा -ing नाही.",
      ),
      gap(
        "That is true, ___ we should try.",
        "however",
        ["because", "or"],
        "पण/तरीही = however.",
      ),
      e2m(
        "I see your point, but …",
        "तुमचा मुद्दा समजला, पण …",
        ["तुम्ही चुकीचे आहात", "मी तुम्हाला पाहिले"],
        "I see your point म्हणजे मुद्दा समजला.",
      ),
      resp(
        "I think we should start early.",
        "I agree. That is a good idea.",
        ["I agree is early.", "Yes, you are wrong."],
        "सहमतीसाठी I agree.",
      ),
      lis(
        "I agree it is cheaper, but I am not sure it is faster.",
        "ऐका. व्यक्ती कशाशी सहमत आहे?",
        "ते स्वस्त आहे",
        ["ते जलद आहे", "ते महाग आहे"],
        "agree it is cheaper म्हणजे ते स्वस्त आहे हे मान्य.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["असहमती नम्रपणे", "Disagreeing politely"],
      "टीम बैठकीत सहकारी एक कल्पना सुचवतो.",
      "तुम्ही: सहकारी",
      [
        [
          "o",
          "I think we should hold the meeting on Saturday.",
          "मला वाटते आपण बैठक शनिवारी घ्यावी.",
        ],
        [
          "y",
          "नम्रपणे असहमती सांगा आणि कारण द्या.",
          "I see your point, but many people are not available on Saturday.",
          "I see your point, but…",
        ],
        [
          "o",
          "That is true. What do you suggest?",
          "ते खरे आहे. तुम्ही काय सुचवता?",
        ],
        [
          "y",
          "पर्याय सुचवा.",
          "How about Friday afternoon? It is easier for everyone.",
          "How about…",
        ],
        ["o", "Good idea.", "छान कल्पना."],
        [
          "y",
          "सहमतीसाठी आभार माना.",
          "Great, thank you for being flexible.",
          "Great, thank you…",
        ],
      ],
    ),
  ),
  "follow-up": lessonKit(
    "follow-up",
    [
      "I can ask follow-up questions to keep a conversation going.",
      "संभाषण चालू ठेवण्यासाठी मी पुढचे प्रश्न विचारू शकतो/शकते.",
    ],
    [
      [
        "A",
        "I started a new job last month.",
        "मी गेल्या महिन्यात नवीन नोकरी सुरू केली.",
      ],
      ["B", "Oh, really? How is it going?", "अरे, खरंच? कशी चालली आहे?"],
      ["A", "Good, but the travel is long.", "चांगली आहे, पण प्रवास लांब आहे."],
      [
        "B",
        "How long does it take? What about working from home?",
        "किती वेळ लागतो? घरून काम करता येते का?",
      ],
    ],
    ["Really? How / What / Why …?", "What about you?"],
    [
      und(
        "कोणता प्रतिसाद संभाषण पुढे नेतो?",
        "Oh, really? How is it going?",
        ["Okay.", "Yes."],
        "पुढचा प्रश्न संभाषण वाढवतो.",
      ),
      gap(
        "I visited Goa. What ___ the best part?",
        "was",
        ["were", "is"],
        "भूतकाळ आणि एकवचन: was.",
      ),
      gap(
        "I like cooking. What ___ you?",
        "about",
        ["for", "at"],
        "What about you? म्हणजे आणि तुम्हाला?",
      ),
      resp(
        "I just moved to a new city.",
        "Oh, really? How do you like it so far?",
        ["Okay.", "I move city yes."],
        "रस आणि प्रश्न दाखवा.",
      ),
      e2m(
        "What happened next?",
        "पुढे काय झाले?",
        ["तुम्ही काय कराल?", "तुम्ही कुठे आहात?"],
        "next म्हणजे पुढे.",
      ),
      m2e(
        "तुम्ही हे का निवडले?",
        "Why did you choose this?",
        ["Why you choose this?", "Why did you chose this?"],
        "Why did you + मूळ क्रियापद.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["पुढचे प्रश्न", "Showing interest"],
      "सहकारी म्हणतो की तो नवीन छंद शिकतोय.",
      "तुम्ही: सहकारी",
      [
        [
          "o",
          "I started learning the guitar last month.",
          "मी गेल्या महिन्यात गिटार शिकायला सुरुवात केली.",
        ],
        [
          "y",
          "रस दाखवा आणि कसे चालले आहे ते विचारा.",
          "Oh, really? How is it going?",
          "Oh, really? How…",
        ],
        ["o", "It is difficult, but I enjoy it.", "अवघड आहे, पण मला आवडते."],
        [
          "y",
          "का निवडले ते विचारा.",
          "Why did you choose the guitar?",
          "Why did you…",
        ],
        ["o", "I always loved music.", "मला नेहमी संगीत आवडायचे."],
        [
          "y",
          "स्वतःबद्दल एक वाक्य आणि प्रश्न: आणि तुम्हाला?",
          "I love music too. What kind of songs do you play?",
          "I love… What kind…",
        ],
      ],
    ),
  ),
  "keep-talking": lessonKit(
    "keep-talking",
    [
      "I can keep talking when I forget a word.",
      "एखादा शब्द आठवला नाही तरी मी बोलणे चालू ठेवू शकतो/शकते.",
    ],
    [
      ["A", "What did you buy at the market?", "तुम्ही बाजारात काय घेतले?"],
      [
        "B",
        "Well, let me think. It is something you use to cut vegetables.",
        "बरं, मला विचार करू द्या. ती अशी वस्तू आहे जी भाजी कापायला वापरतात.",
      ],
      ["A", "A knife?", "सुरी?"],
      [
        "B",
        "Yes! What I mean is, a sharp knife. Thank you.",
        "हो! म्हणजे एक धारदार सुरी. धन्यवाद.",
      ],
    ],
    ["Well, let me think.", "It is something you use to …", "What I mean is …"],
    [
      und(
        "शब्द आठवत नसेल तेव्हा काय म्हणू शकता?",
        "Let me think for a moment.",
        ["I do not speak.", "Stop talking."],
        "थोडा वेळ घेण्यासाठी Let me think.",
      ),
      gap(
        "It is something you ___ to cut vegetables.",
        "use",
        ["uses", "using"],
        "you सोबत मूळ रूप use.",
      ),
      gap(
        "What I ___ is, I need more time.",
        "mean",
        ["means", "meaning"],
        "I सोबत mean.",
      ),
      e2m(
        "How can I put it?",
        "मी हे कसे सांगू?",
        ["तुम्ही हे कुठे ठेवले?", "मी हे कधी ठेवू?"],
        "How can I put it? म्हणजे कसे सांगू.",
      ),
      resp(
        "What is the word you are looking for?",
        "I do not remember, but it is something you use to cut.",
        ["Sorry, I stop.", "I am forgot."],
        "शब्द आठवला नाही तर वर्णन करा.",
      ),
      lis(
        "Well, how can I put it? It is a place where we wait for trains.",
        "ऐका. व्यक्ती कशाचे वर्णन करते?",
        "रेल्वे स्टेशन",
        ["बस थांबा", "ग्रंथालय"],
        "place where we wait for trains म्हणजे रेल्वे स्टेशन.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["शब्द आठवत नाही", "Forgot the word"],
      "तुम्ही दुकानात एक वस्तू मागता पण नाव आठवत नाही.",
      "तुम्ही: ग्राहक",
      [
        ["o", "How can I help you?", "मी कशी मदत करू?"],
        [
          "y",
          "नाव न घेता वस्तूचे वर्णन करा (उदा. भाजी कापायला).",
          "I need something you use to cut vegetables.",
          "I need something you use…",
        ],
        ["o", "A knife or a peeler?", "सुरी की सोलणे?"],
        [
          "y",
          "स्पष्ट करा 'What I mean is…'.",
          "What I mean is a knife, please. A small one.",
          "What I mean is…",
        ],
        ["o", "Here you are.", "ही घ्या."],
        [
          "y",
          "आभार माना आणि किंमत विचारा.",
          "Thank you. How much is it?",
          "Thank you. How…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "i4",
  path: "intermediate",
  title: "मत, चर्चा आणि संभाषण पुढे नेणे",
  en: "Opinions, discussion and maintaining a conversation",
  outcome: [
    "I can give opinions, agree or disagree politely and keep a conversation going.",
    "मी मत मांडू शकतो/शकते, नम्रपणे सहमत किंवा असहमत होऊ शकतो/शकते आणि संभाषण चालू ठेवू शकतो/शकते.",
  ],
  lessons: ["opinions", "agree-disagree", "follow-up", "keep-talking"],
  checkpoint: {
    scenario: [
      "At a community meeting, people are discussing a new bus route.",
      "सोसायटीच्या बैठकीत नवीन बस मार्गावर चर्चा सुरू आहे.",
    ],
    ex: finish("i4", "cp", [
      resp(
        "I think the new bus route is a good idea.",
        "I agree. It will save time, because many people travel to the market.",
        ["I agree is time.", "No, you wrong."],
        "सहमत व्हा आणि कारण द्या.",
      ),
      resp(
        "The route will make the road busier.",
        "I see your point, but it will also reduce the number of cars.",
        ["Your point is bad.", "No busier."],
        "आधी मुद्दा मान्य करा, मग वेगळे मत सांगा.",
      ),
      gap(
        "Oh, really? What ___ the main reason?",
        "is",
        ["are", "do"],
        "reason एकवचनी म्हणून is.",
      ),
      und(
        "बोलताना शब्द आठवला नाही; काय म्हणावे?",
        "What I mean is, it will be cheaper.",
        ["I cannot.", "Please stop."],
        "दुसऱ्या शब्दांत सांगताना What I mean is.",
      ),
    ]),
    speak:
      "नवीन बस मार्गाबद्दल तुमचे मत कारणासह सांगा, एका मुद्द्याशी नम्रपणे असहमत व्हा आणि एक प्रश्न विचारा.",
  },
};
