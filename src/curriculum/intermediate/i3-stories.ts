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
    "sequencing",
    "fluency",
    "First, then, after that, finally",
    "घटनांचा क्रम सांगा",
    "घटना क्रमाने सांगण्यासाठी हे शब्द वापरा: First (आधी), Then / Next (मग), After that (त्यानंतर), Finally (शेवटी). दोन घटना जोडण्यासाठी: before (आधी), after (नंतर), while (त्या वेळी). ते शब्द कथा समजायला सोपी करतात.",
    "First … Then … After that … Finally …",
    [
      ["First, I woke up late.", "आधी मी उशिरा उठलो/उठले."],
      [
        "Then I missed the bus, so I took a taxi.",
        "मग माझी बस चुकली, म्हणून मी टॅक्सी घेतली.",
      ],
      [
        "After that, I called my manager from the taxi.",
        "त्यानंतर मी टॅक्सीतून व्यवस्थापकांना फोन केला.",
      ],
      [
        "Finally, I reached the office just in time.",
        "शेवटी मी वेळेवर ऑफिसला पोहोचलो/पोहोचले.",
      ],
    ],
    "आज सकाळपासून तुम्ही काय काय केले ते First, Then, After that आणि Finally वापरून सांगा.",
  ),
  newLesson(
    "tell-story",
    "fluency",
    "Tell a short story",
    "छोटी गोष्ट सांगा",
    "गोष्टीत चार भाग असतात: सुरुवात (कधी, कुठे, कोण), अडचण (काय बिघडले), उपाय (तुम्ही काय केले) आणि शेवट (काय झाले आणि काय शिकलात). मुख्य घटनेसाठी simple past (went, missed) आणि त्या वेळी चालू असलेल्या गोष्टींसाठी past continuous (was raining) वापरा.",
    "Setting → Problem → What I did → Ending",
    [
      [
        "Last month I was travelling to Pune when it started to rain.",
        "गेल्या महिन्यात मी पुण्याला जात असताना पाऊस सुरू झाला.",
      ],
      ["The bus broke down near the village.", "बस गावाजवळ बंद पडली."],
      [
        "A local man helped us call another bus.",
        "एका स्थानिक माणसाने आम्हाला दुसरी बस बोलावण्यात मदत केली.",
      ],
      [
        "In the end, I arrived late but safe, and I learnt to leave early.",
        "शेवटी मी उशिरा पण सुरक्षित पोहोचलो/पोहोचले आणि लवकर निघायला शिकलो/शिकले.",
      ],
    ],
    "एखादा प्रसंग (उशीर, पाऊस, बस चुकणे) चार भागांत सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  "past-continuous": lessonKit(
    "past-continuous",
    [
      "I can say what was happening at a time in the past.",
      "भूतकाळात एखाद्या वेळी काय सुरू होते ते मी सांगू शकतो/शकते.",
    ],
    [
      [
        "A",
        "What were you doing at eight yesterday?",
        "काल आठ वाजता तुम्ही काय करत होतात?",
      ],
      [
        "B",
        "I was cooking dinner. My sister was studying.",
        "मी जेवण बनवत होतो/होते. माझी बहीण अभ्यास करत होती.",
      ],
      ["A", "Was it raining?", "पाऊस पडत होता का?"],
      [
        "B",
        "Yes, it was raining when I arrived.",
        "हो, मी आलो तेव्हा पाऊस पडत होता.",
      ],
    ],
    ["was / were + verb-ing", "when + simple past (interruption)"],
    [
      gap("I ___ cooking at eight.", "was", ["were", "am"], "I सोबत was."),
      gap(
        "They ___ waiting for the bus.",
        "were",
        ["was", "are"],
        "they सोबत were.",
      ),
      gap(
        "I was walking home ___ it started to rain.",
        "when",
        ["while", "because"],
        "मध्येच घडलेली घटना: when + simple past.",
      ),
      e2m(
        "What were you doing?",
        "तुम्ही काय करत होतात?",
        ["तुम्ही काय केले?", "तुम्ही काय कराल?"],
        "were you doing म्हणजे करत होतात.",
      ),
      resp(
        "What were you doing at eight yesterday?",
        "I was cooking dinner.",
        ["I cooked dinner yesterday eight.", "I am cooking."],
        "भूतकाळातील चालू कृतीसाठी was + verb-ing.",
      ),
      lis(
        "I was waiting for the bus when I saw my teacher.",
        "ऐका. व्यक्ती काय करत होती?",
        "बसची वाट पाहत होती",
        ["शिक्षकांशी बोलत होती", "घरी जात होती"],
        "was waiting for the bus म्हणजे बसची वाट पाहत होती.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["काल संध्याकाळी", "Last evening"],
      "मित्र तुम्हाला काल संध्याकाळच्या फोनबद्दल विचारतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "I called you at eight, but you did not answer.",
          "मी आठला फोन केला होता, पण तुम्ही उत्तर दिले नाही.",
        ],
        [
          "y",
          "तुम्ही काय करत होता ते सांगा.",
          "Sorry, I was cooking dinner and my phone was in the bedroom.",
          "Sorry, I was…",
        ],
        [
          "o",
          "No problem. What were you cooking?",
          "ठीक आहे. तुम्ही काय बनवत होता?",
        ],
        [
          "y",
          "पदार्थ सांगा आणि त्यालाही विचारा तो काय करत होता.",
          "I was making dal and rice. What were you doing?",
          "I was making… What were you…",
        ],
      ],
    ),
  ),
  sequencing: lessonKit(
    "sequencing",
    [
      "I can tell events in order with first, then, after that and finally.",
      "मी first, then, after that आणि finally वापरून घटना क्रमाने सांगू शकतो/शकते.",
    ],
    [
      ["A", "Why were you late today?", "आज तुम्हाला उशीर का झाला?"],
      [
        "B",
        "First, I woke up late. Then I missed the bus.",
        "आधी मी उशिरा उठलो/उठले. मग माझी बस चुकली.",
      ],
      ["A", "What did you do after that?", "त्यानंतर तुम्ही काय केले?"],
      [
        "B",
        "I took a taxi. Finally, I reached just in time.",
        "मी टॅक्सी घेतली. शेवटी मी वेळेवर पोहोचलो/पोहोचले.",
      ],
    ],
    ["First … Then … After that … Finally …", "before / after / while"],
    [
      und(
        "कोणता शब्द कथेचा शेवट दाखवतो?",
        "Finally",
        ["First", "Then"],
        "Finally म्हणजे शेवटी.",
      ),
      gap(
        "___, I woke up late. (आधी)",
        "First",
        ["Finally", "After"],
        "सुरुवातीसाठी First.",
      ),
      gap(
        "I called my manager ___ I reached the office. (पोहोचण्याआधी)",
        "before",
        ["after", "because"],
        "before म्हणजे आधी.",
      ),
      e2m(
        "After that, I called my manager.",
        "त्यानंतर मी माझ्या व्यवस्थापकांना फोन केला.",
        ["मी व्यवस्थापकांना फोन करणार नाही.", "आधी मी व्यवस्थापकांना भेटलो."],
        "After that म्हणजे त्यानंतर.",
      ),
      resp(
        "What did you do after that?",
        "After that, I took a taxi.",
        ["After that is a taxi.", "Finally I first took."],
        "क्रम दाखवा.",
      ),
      lis(
        "First, I made tea. Then I read the news. Finally, I left for work.",
        "ऐका. शेवटी व्यक्तीने काय केले?",
        "कामावर निघाली",
        ["चहा केला", "बातम्या वाचल्या"],
        "Finally म्हणजे शेवटी: left for work.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["उशीर का झाला?", "Why were you late?"],
      "तुम्ही सहकाऱ्याला उशिराचे कारण क्रमाने सांगता.",
      "तुम्ही: सहकारी",
      [
        [
          "o",
          "You are late today. What happened?",
          "तुम्हाला आज उशीर झाला. काय झाले?",
        ],
        [
          "y",
          "आधी काय झाले आणि मग काय झाले ते सांगा.",
          "First, my alarm did not ring. Then I missed the bus.",
          "First,… Then…",
        ],
        [
          "o",
          "Oh no. What did you do after that?",
          "अरे नाही. त्यानंतर काय केले?",
        ],
        [
          "y",
          "त्यानंतर काय केले आणि शेवटी काय झाले ते सांगा.",
          "After that, I took a taxi. Finally, I reached ten minutes late.",
          "After that,… Finally,…",
        ],
        ["o", "I see.", "समजले."],
        [
          "y",
          "माफी मागा आणि पुन्हा असे होणार नाही असे सांगा.",
          "I am sorry. I will leave earlier next time.",
          "I am sorry. I will…",
        ],
      ],
    ),
  ),
  "tell-story": lessonKit(
    "tell-story",
    [
      "I can tell a short story with a beginning, a problem and an ending.",
      "मी सुरुवात, अडचण आणि शेवट असलेली छोटी गोष्ट सांगू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Do you have an interesting story?",
        "तुमच्याकडे एखादी रंजक गोष्ट आहे का?",
      ],
      [
        "B",
        "Yes. Last month, I was going to Pune when the bus broke down.",
        "हो. गेल्या महिन्यात मी पुण्याला जात असताना बस बंद पडली.",
      ],
      ["A", "What happened then?", "मग काय झाले?"],
      [
        "B",
        "A local man helped us. In the end, I arrived late, but safe.",
        "एका स्थानिक माणसाने मदत केली. शेवटी मी उशिरा पण सुरक्षित पोहोचलो/पोहोचले.",
      ],
    ],
    [
      "Setting: Last month… was … when …",
      "Problem: … broke down",
      "Ending: In the end, …",
    ],
    [
      und(
        "गोष्टीतील 'problem' भाग कोणता आहे?",
        "The bus broke down.",
        ["Last month I travelled.", "I learnt to leave early."],
        "अडचण म्हणजे काय बिघडले ते.",
      ),
      gap(
        "It was raining ___ I left the house.",
        "when",
        ["but", "so"],
        "त्या वेळी चालू असताना घडलेली घटना: when.",
      ),
      gap(
        "The bus broke ___ near the village.",
        "down",
        ["up", "off"],
        "break down म्हणजे बंद पडणे.",
      ),
      resp(
        "What happened next?",
        "A local man helped us call another bus.",
        ["A local man is help.", "We help local man."],
        "पुढील घटना simple past ने सांगा.",
      ),
      e2m(
        "In the end, I arrived late but safe.",
        "शेवटी मी उशिरा पण सुरक्षित पोहोचलो/पोहोचले.",
        ["शेवटी मी पोहोचलोच नाही.", "सुरुवातीला मी लवकर पोहोचलो."],
        "In the end म्हणजे शेवटी.",
      ),
      lis(
        "It was raining when we left. The car stopped, but a farmer helped us.",
        "ऐका. अडचणीत कोणी मदत केली?",
        "एका शेतकऱ्याने",
        ["पोलिसांनी", "मित्राने"],
        "a farmer helped us म्हणजे शेतकऱ्याने मदत केली.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["एक गोष्ट सांगा", "Telling a story"],
      "मित्र तुम्हाला एखादी रंजक गोष्ट सांगायला सांगतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "Tell me about a time something went wrong on a trip.",
          "सहलीत काहीतरी बिघडले अशा प्रसंगाबद्दल सांगा.",
        ],
        [
          "y",
          "कधी आणि काय बिघडले ते सांगा.",
          "Last month, I was travelling to Pune when the bus broke down.",
          "Last month,… when…",
        ],
        ["o", "Oh no! What did you do?", "अरे! तुम्ही काय केले?"],
        [
          "y",
          "तुम्ही काय केले आणि कोणी मदत केली ते सांगा.",
          "We waited by the road. A local man helped us call another bus.",
          "We… A local man…",
        ],
        ["o", "How did it end?", "शेवट कसा झाला?"],
        [
          "y",
          "शेवट आणि शिकवण सांगा.",
          "In the end, I arrived late but safe. I learnt to leave early.",
          "In the end,… I learnt…",
        ],
      ],
    ),
  ),
  "used-to": lessonKit(
    "used-to",
    [
      "I can talk about past habits that are now different.",
      "आता वेगळ्या असलेल्या पूर्वीच्या सवयींबद्दल मी बोलू शकतो/शकते.",
    ],
    [
      ["A", "Where did you live as a child?", "लहानपणी तुम्ही कुठे राहत होता?"],
      [
        "B",
        "I used to live in Satara. We used to play near the river.",
        "मी पूर्वी साताऱ्यात राहत होतो/होते. आम्ही नदीजवळ खेळायचो.",
      ],
      [
        "A",
        "Did you use to walk to school?",
        "तुम्ही शाळेत चालत जायचा/जायची का?",
      ],
      ["B", "Yes, I did. Now I go by bus.", "हो. आता मी बसने जातो/जाते."],
    ],
    ["used to + base verb", "Did you use to + base verb?"],
    [
      gap(
        "I ___ to live in Satara.",
        "used",
        ["use", "using"],
        "पूर्वीची सवय: used to.",
      ),
      gap(
        "Did you ___ to walk to school?",
        "use",
        ["used", "using"],
        "Did नंतर use to.",
      ),
      und(
        "'I used to play cricket.' चा अर्थ काय?",
        "मी पूर्वी क्रिकेट खेळायचो, आता नाही",
        ["मी रोज क्रिकेट खेळतो", "मी क्रिकेट खेळणार आहे"],
        "used to म्हणजे पूर्वी होते, आता नाही.",
      ),
      e2m(
        "We used to play here.",
        "आम्ही पूर्वी इथे खेळायचो.",
        ["आम्ही आज इथे खेळतो.", "आम्ही इथे खेळणार आहोत."],
        "used to म्हणजे पूर्वी सवय होती.",
      ),
      resp(
        "Did you use to walk to school?",
        "Yes, I did. Now I go by bus.",
        ["Yes, I used to walking.", "Yes, I am."],
        "Did you use to…? ला Yes, I did.",
      ),
      m2e(
        "मी पूर्वी चहा पीत नव्हतो.",
        "I did not use to drink tea.",
        ["I did not used to drink tea.", "I not use to drink tea."],
        "did not use to + मूळ रूप.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["लहानपणीच्या आठवणी", "Childhood memories"],
      "मित्र तुमच्या लहानपणाबद्दल विचारतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "What did you use to do after school?",
          "शाळेनंतर तुम्ही काय करायचात?",
        ],
        [
          "y",
          "तुम्ही काय करायचात ते सांगा.",
          "I used to play cricket with my friends near the river.",
          "I used to…",
        ],
        ["o", "Do you still play?", "तुम्ही अजूनही खेळता का?"],
        [
          "y",
          "आता काय बदलले ते सांगा.",
          "Not much now. I am busy with work, but I play on Sundays.",
          "Not much now…",
        ],
        ["o", "That is nice.", "छान आहे."],
        [
          "y",
          "त्यालाही विचारा.",
          "What about you? What did you use to do?",
          "What about you…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "i3",
  path: "intermediate",
  title: "गोष्टी आणि घटनांचा क्रम",
  en: "Storytelling and sequencing events",
  outcome: [
    "I can tell a short story in a clear order.",
    "मी एखादी छोटी गोष्ट स्पष्ट क्रमाने सांगू शकतो/शकते.",
  ],
  lessons: ["past-continuous", "sequencing", "tell-story", "used-to"],
  checkpoint: {
    scenario: [
      "At a family function, someone asks you to tell about a funny or difficult day.",
      "कौटुंबिक कार्यक्रमात कोणीतरी तुम्हाला एखाद्या मजेशीर किंवा कठीण दिवसाबद्दल सांगायला सांगते.",
    ],
    ex: finish("i3", "cp", [
      resp(
        "What happened to you last Diwali?",
        "First, the lights went out. Then we lit lamps and told stories.",
        ["First lights out. Then I lamps.", "Finally first lights."],
        "घटनाक्रम आणि भूतकाळ वापरा.",
      ),
      gap(
        "We were having dinner ___ the lights went out.",
        "when",
        ["but", "if"],
        "चालू कृती असताना घडलेली घटना: when.",
      ),
      gap(
        "I ___ to live near the market.",
        "used",
        ["use", "am"],
        "पूर्वीची सवय: used to.",
      ),
      und(
        "कथेचा शेवट कोणत्या वाक्यातून समजतो?",
        "In the end, we enjoyed the night.",
        ["First, we sat down.", "While we were eating."],
        "In the end म्हणजे शेवटी.",
      ),
    ]),
    speak:
      "तुमच्या लक्षात राहिलेल्या एका प्रसंगाची छोटी गोष्ट (सुमारे ४५ सेकंद) क्रमाने सांगा.",
  },
};
