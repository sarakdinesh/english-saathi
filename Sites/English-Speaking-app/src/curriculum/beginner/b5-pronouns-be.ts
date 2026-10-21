import {
  bld,
  e2m,
  gap,
  lessonKit,
  lis,
  m2e,
  resp,
  rolePlay,
  und,
  finish,
} from "../author";
import type { Unit, Enrich } from "../types";

export const kits: Record<string, Enrich> = {
  pronouns: lessonKit(
    "pronouns",
    [
      "I can say who is doing something using I, you, he, she, we and they.",
      "मी I, you, he, she, we आणि they वापरून कोण काय करत आहे ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "Who is he?", "तो कोण आहे?"],
      [
        "B",
        "He is my brother. We live together.",
        "तो माझा भाऊ आहे. आम्ही एकत्र राहतो.",
      ],
      ["A", "And who are they?", "आणि ते कोण आहेत?"],
      [
        "B",
        "They are my friends. They are at school.",
        "ते माझे मित्र आहेत. ते शाळेत आहेत.",
      ],
    ],
    ["I / you / he / she / it / we / they", "He is… · She is… · They are…"],
    [
      gap(
        "___ is my sister. (ती)",
        "She",
        ["He", "They"],
        "स्त्रीसाठी She वापरतात.",
      ),
      gap(
        "___ are at school. (ते सर्व)",
        "They",
        ["He", "It"],
        "अनेक जणांसाठी They आणि are.",
      ),
      e2m(
        "We are ready.",
        "आम्ही तयार आहोत.",
        ["ते तयार आहेत.", "मी तयार आहे."],
        "We म्हणजे आम्ही.",
      ),
      m2e(
        "तो माझा भाऊ आहे.",
        "He is my brother.",
        ["She is my brother.", "He are my brother."],
        "पुरुषासाठी He आणि is.",
      ),
      resp(
        "Who is she?",
        "She is my sister.",
        ["He is my sister.", "I am my sister."],
        "स्त्रीबद्दल She वापरा.",
      ),
      bld("आम्ही तयार आहोत.", "We are ready.", ["is"], "We सोबत are."),
    ],
    rolePlay(
      "",
      "beginner",
      ["लोकांची ओळख", "Who is who"],
      "तुमच्या सहकाऱ्याने तुमच्या फोटोतील लोकांबद्दल विचारले.",
      "तुम्ही: सहकारी",
      [
        ["o", "Who is she?", "ती कोण आहे?"],
        ["y", "ती तुमची बहीण आहे असे सांगा.", "She is my sister.", "She is…"],
        ["o", "And who are they?", "आणि ते कोण आहेत?"],
        [
          "y",
          "ते तुमचे मित्र आहेत असे सांगा.",
          "They are my friends.",
          "They are…",
        ],
      ],
    ),
  ),
  be: lessonKit(
    "be",
    [
      "I can say who or what something is using am, is and are.",
      "मी am, is आणि are वापरून कोण किंवा काय आहे ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "Are you busy now?", "तुम्ही आता व्यस्त आहात का?"],
      [
        "B",
        "No, I am not busy. I am ready.",
        "नाही, मी व्यस्त नाही. मी तयार आहे.",
      ],
      ["A", "Is she at home?", "ती घरी आहे का?"],
      [
        "B",
        "Yes, she is. We are all at home.",
        "हो, आहे. आम्ही सगळे घरी आहोत.",
      ],
    ],
    ["I am · he / she / it is · you / we / they are", "Are you…? Is she…?"],
    [],
    rolePlay(
      "",
      "beginner",
      ["तयार आहात का?", "Are you ready?"],
      "तुम्ही मित्रासोबत बाहेर जाण्याची तयारी करत आहात.",
      "तुम्ही: मित्र",
      [
        ["o", "Are you ready?", "तुम्ही तयार आहात का?"],
        [
          "y",
          "होय, तुम्ही तयार आहात असे सांगा.",
          "Yes, I am ready.",
          "Yes, I am…",
        ],
        ["o", "Is your sister ready too?", "तुमची बहीणसुद्धा तयार आहे का?"],
        [
          "y",
          "तुमची बहीण अजून घरी आहे असे सांगा.",
          "No, she is at home.",
          "No, she is…",
        ],
      ],
    ),
  ),
  "this-that": lessonKit(
    "this-that",
    [
      "I can point to things near and far with this, that, these and those.",
      "मी this, that, these आणि those वापरून जवळच्या आणि लांबच्या वस्तू दाखवू शकतो/शकते.",
    ],
    [
      ["A", "Is this your bag?", "ही तुमची पिशवी आहे का?"],
      [
        "B",
        "Yes, this is my bag. That one is my sister's.",
        "हो, ही माझी पिशवी आहे. ती माझ्या बहिणीची आहे.",
      ],
      ["A", "Are those your books?", "ती तुमची पुस्तके आहेत का?"],
      ["B", "No, these are my books.", "नाही, ही माझी पुस्तके आहेत."],
    ],
    ["this / that + one thing", "these / those + many things"],
    [
      gap(
        "___ is my bag. (जवळची एक वस्तू)",
        "This",
        ["These", "Those"],
        "जवळची एक वस्तू: this.",
      ),
      gap(
        "___ are my books. (जवळची अनेक पुस्तके)",
        "These",
        ["This", "That"],
        "जवळच्या अनेक वस्तूंसाठी these आणि are.",
      ),
      gap(
        "___ is a bus. (लांबची एक)",
        "That",
        ["These", "This"],
        "लांबची एक वस्तू: that.",
      ),
      e2m(
        "Those are expensive.",
        "ते महाग आहेत.",
        ["ते स्वस्त आहेत.", "हे महाग आहे."],
        "those म्हणजे लांबच्या अनेक वस्तू; expensive म्हणजे महाग.",
      ),
      m2e(
        "ही माझी पुस्तके आहेत.",
        "These are my books.",
        ["This are my books.", "These is my books."],
        "अनेक जवळच्या वस्तूंसाठी These are.",
      ),
      resp(
        "Is this your phone?",
        "Yes, this is my phone.",
        ["Yes, these are my phone.", "No, it is Monday."],
        "एक वस्तू असल्याने this is.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["बाजारात", "Pointing things out"],
      "तुम्ही दुकानात वस्तू दाखवता.",
      "तुम्ही: ग्राहक",
      [
        ["o", "What would you like?", "तुम्हाला काय हवे आहे?"],
        [
          "y",
          "जवळची पिशवी किती रुपये आहे ते विचारा.",
          "How much is this bag?",
          "How much is…",
        ],
        ["o", "It is two hundred rupees.", "ती दोनशे रुपये आहे."],
        [
          "y",
          "तिथली दोन पिशव्या किती आहेत ते विचारा.",
          "How much are those bags?",
          "How much are…",
        ],
      ],
    ),
  ),
  "articles-a": lessonKit(
    "articles-a",
    [
      "I can use a and an with the right sound.",
      "मी योग्य आवाजानुसार a आणि an वापरू शकतो/शकते.",
    ],
    [
      ["A", "What do you do?", "तुम्ही काय करता?"],
      [
        "B",
        "I am an engineer. My sister is a doctor.",
        "मी अभियंता आहे. माझी बहीण डॉक्टर आहे.",
      ],
      ["A", "Do you have a car?", "तुमच्याकडे कार आहे का?"],
      [
        "B",
        "No, but I have a bike and an umbrella.",
        "नाही, पण माझ्याकडे सायकल आणि छत्री आहे.",
      ],
    ],
    ["a + consonant sound", "an + vowel sound"],
    [
      gap(
        "She is ___ engineer.",
        "an",
        ["a", "the"],
        "engineer स्वराच्या आवाजाने सुरू होतो: an.",
      ),
      gap(
        "I have ___ book.",
        "a",
        ["an", "some"],
        "book व्यंजनाच्या आवाजाने सुरू होतो: a.",
      ),
      gap(
        "Please wait for ___ hour.",
        "an",
        ["a", "one"],
        "hour मध्ये h चा आवाज येत नाही; आवाज स्वराचा आहे, म्हणून an.",
      ),
      gap(
        "He studies at ___ university.",
        "a",
        ["an", "the"],
        "university चा आवाज 'यू' (व्यंजनासारखा) असतो: a.",
      ),
      e2m(
        "I have an umbrella.",
        "माझ्याकडे छत्री आहे.",
        ["माझ्याकडे पुस्तक आहे.", "माझ्याकडे कार आहे."],
        "umbrella म्हणजे छत्री.",
      ),
      lis(
        "She is an engineer.",
        "ऐका. ती कोण आहे?",
        "अभियंता",
        ["डॉक्टर", "शिक्षिका"],
        "engineer म्हणजे अभियंता.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["नोकरीबद्दल सांगा", "Talking about jobs"],
      "पार्टीत कोणीतरी तुम्हाला तुमच्या कामाबद्दल विचारते.",
      "तुम्ही: पाहुणे",
      [
        ["o", "What do you do?", "तुम्ही काय करता?"],
        [
          "y",
          "तुमचे काम सांगा (a किंवा an वापरा).",
          "I am a teacher.",
          "I am a / an…",
        ],
        ["o", "Does your sister work too?", "तुमची बहीणसुद्धा काम करते का?"],
        [
          "y",
          "ती डॉक्टर आहे असे सांगा.",
          "Yes, she is a doctor.",
          "Yes, she is…",
        ],
      ],
    ),
  ),
  "articles-the": lessonKit(
    "articles-the",
    [
      "I can use the for something both people know.",
      "मी दोघांनाही माहीत असलेल्या गोष्टीसाठी the वापरू शकतो/शकते.",
    ],
    [
      ["A", "I bought a book yesterday.", "मी काल एक पुस्तक घेतले."],
      ["B", "Is the book interesting?", "ते पुस्तक रंजक आहे का?"],
      [
        "A",
        "Yes. Please close the door, it is cold.",
        "हो. कृपया दार बंद करा, थंडी आहे.",
      ],
      [
        "B",
        "Sure. The sun is not bright today.",
        "नक्की. आज सूर्य तेजस्वी नाही.",
      ],
    ],
    ["a + new thing → the + same thing", "the + one specific thing"],
    [
      gap(
        "I bought a pen. ___ pen is blue.",
        "The",
        ["A", "An"],
        "आधी a pen म्हणाल्यावर तेच pen पुन्हा सांगताना the.",
      ),
      gap(
        "Please close ___ door.",
        "the",
        ["a", "an"],
        "कोणते दार हे दोघांना माहीत आहे: the door.",
      ),
      und(
        "'The sun is bright today.' मध्ये the का वापरले?",
        "सूर्य एकच आहे",
        ["सूर्य नवीन आहे", "सूर्य अनेक आहेत"],
        "एकमेव गोष्टीसाठी the वापरतात.",
      ),
      m2e(
        "कृपया खिडकी उघडा.",
        "Please open the window.",
        ["Please open a window.", "Please open window the."],
        "विशिष्ट खिडकी माहीत असल्याने the window.",
      ),
      e2m(
        "I bought a book. The book is useful.",
        "मी एक पुस्तक घेतले. ते पुस्तक उपयुक्त आहे.",
        ["मी पुस्तक विकले.", "मी दोन पुस्तके घेतली."],
        "पहिल्यांदा a book, पुन्हा सांगताना the book.",
      ),
      resp(
        "Could you close the door, please?",
        "Sure, I will close the door.",
        ["Sure, I will close a doors.", "I am a door."],
        "विशिष्ट दार असल्याने the door.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["खोलीत मदत", "A request in the room"],
      "तुम्ही सहकाऱ्याला खोलीत लहानशी मदत मागता.",
      "तुम्ही: सहकारी",
      [
        [
          "y",
          "खिडकी उघडायला सांगा.",
          "Please open the window.",
          "Please open…",
        ],
        ["o", "Sure. It is hot in here.", "नक्की. इथे गरम होत आहे."],
        [
          "y",
          "आभार माना आणि दिवा लावायला सांगा.",
          "Thank you. Please switch on the light.",
          "Thank you. Please…",
        ],
        ["o", "Okay.", "ठीक आहे."],
      ],
    ),
  ),
  "no-article": lessonKit(
    "no-article",
    [
      "I can talk about things in general without a or the.",
      "मी a किंवा the शिवाय सर्वसाधारण गोष्टींबद्दल बोलू शकतो/शकते.",
    ],
    [
      ["A", "What do you like?", "तुम्हाला काय आवडते?"],
      ["B", "I like books and music.", "मला पुस्तके आणि संगीत आवडते."],
      ["A", "Is water important?", "पाणी महत्त्वाचे आहे का?"],
      [
        "B",
        "Yes. Water is important for life.",
        "हो. जीवनासाठी पाणी महत्त्वाचे आहे.",
      ],
    ],
    [
      "I like + plural noun (no article)",
      "Water / music / rice + is … (no article)",
    ],
    [
      gap(
        "I like ___. (सर्वसाधारण पुस्तके)",
        "books",
        ["a books", "the book"],
        "सर्वसाधारण आवडीसाठी अनेकवचन आणि article नाही.",
      ),
      gap(
        "___ is important. (सर्वसाधारण पाणी)",
        "Water",
        ["A water", "The waters"],
        "न मोजता येणाऱ्या नामाला a लावत नाहीत.",
      ),
      und(
        "'The water in this glass is cold.' मध्ये the का आहे?",
        "विशिष्ट ग्लासमधील पाणी आहे",
        ["पाणी अनेक आहे", "पाणी महत्त्वाचे आहे"],
        "विशिष्ट पाणी असल्याने the.",
      ),
      m2e(
        "मला संगीत आवडते.",
        "I like music.",
        ["I like a music.", "I like the musics."],
        "सर्वसाधारण आवडीसाठी article नाही.",
      ),
      resp(
        "What do you like?",
        "I like books and music.",
        ["I like a books.", "I am a music."],
        "आवडीबद्दल सर्वसाधारण बोलताना article वापरू नका.",
      ),
      e2m(
        "Rice is cheap.",
        "तांदूळ स्वस्त आहे.",
        ["तांदूळ महाग आहे.", "तांदूळ चविष्ट आहे."],
        "cheap म्हणजे स्वस्त.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["तुमची आवड", "Talking about likes"],
      "नवीन मित्र तुमच्या आवडीनिवडी विचारतो.",
      "तुम्ही: मित्र",
      [
        ["o", "What do you like?", "तुम्हाला काय आवडते?"],
        [
          "y",
          "तुम्हाला पुस्तके आणि संगीत आवडते असे सांगा.",
          "I like books and music.",
          "I like…",
        ],
        ["o", "Do you like sports?", "तुम्हाला खेळ आवडतात का?"],
        ["y", "तुमचे उत्तर सांगा.", "Yes, I like cricket.", "Yes, I like…"],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b5",
  path: "beginner",
  title: "सर्वनामे, असणे आणि लहान शब्द",
  en: "Pronouns, am/is/are and small words",
  outcome: [
    "I can say who and what things are, and use this/that, a/an/the correctly.",
    "मी कोण आणि काय आहे ते सांगू शकतो/शकते आणि this/that, a/an/the योग्य वापरू शकतो/शकते.",
  ],
  lessons: [
    "pronouns",
    "be",
    "this-that",
    "articles-a",
    "articles-the",
    "no-article",
  ],
  checkpoint: {
    scenario: [
      "You are showing a photo album to a colleague.",
      "तुम्ही सहकाऱ्याला फोटो अल्बम दाखवत आहात.",
    ],
    ex: finish("b5", "cp", [
      resp(
        "Who is that woman in the photo?",
        "She is my aunt. She is an artist.",
        ["He is my aunt. He is a artist.", "That is an photos."],
        "स्त्रीसाठी She आणि artist स्वराने सुरू होतो: an.",
      ),
      gap(
        "___ are my cousins. (जवळचे अनेक)",
        "These",
        ["This", "That"],
        "जवळच्या अनेक लोकांसाठी These are.",
      ),
      gap(
        "My father is ___ honest man.",
        "an",
        ["a", "some"],
        "honest मध्ये h चा आवाज येत नाही: an.",
      ),
      bld(
        "ते माझे मित्र आहेत.",
        "They are my friends.",
        ["is"],
        "They सोबत are.",
      ),
    ]),
    speak:
      "फोटो दाखवत तुमच्या तीन व्यक्तींची ओळख करून द्या: ती कोण आहे, काय करते.",
  },
};
