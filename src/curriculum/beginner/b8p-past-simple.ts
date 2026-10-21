// Beginner · unit b8p: the past, built up in four steps. Placed between the
// present-tense unit (b8) and the plans/suggestions unit (b9), whose
// `yesterday` lesson then acts as consolidation. Fills the gap found in
// docs/curriculum-inventory.md: no `was/were`, and regular -ed and irregular
// verbs were not taught as sets.
import {
  bld,
  e2m,
  finish,
  gap,
  lessonKit,
  lis,
  m2e,
  newLesson,
  resp,
  rolePlay,
  und,
} from "../author";
import type { Enrich, Unit } from "../types";

export const lessons = [
  newLesson(
    "was-were",
    "tenses",
    "Was and were",
    "होतो, होती, होते: भूतकाळात असणे",
    "am / is / are चे भूतकाळी रूप was आणि were आहे. I, he, she, it सोबत was येते. you, we, they सोबत were येते. 'काल मी घरी होतो/होते' = I was at home yesterday. नकार: was not (wasn't), were not (weren't). प्रश्नात was/were आधी येते: Were you at home? उत्तर: Yes, I was. / No, I wasn't. वेळ दाखवणारे शब्द: yesterday, last night, last week, two days ago.",
    "I / he / she / it + was · you / we / they + were",
    [
      ["I was at home yesterday.", "मी काल घरी होतो/होते."],
      ["She was tired last night.", "ती काल रात्री थकली होती."],
      ["We were at the market.", "आम्ही बाजारात होतो."],
      ["The shop was not open.", "दुकान उघडे नव्हते."],
      ["Were you at school?", "तुम्ही शाळेत होता का?"],
    ],
    "काल सकाळी, दुपारी आणि संध्याकाळी तुम्ही कुठे होता ते was/were वापरून तीन वाक्यांत सांगा.",
  ),
  newLesson(
    "past-regular",
    "tenses",
    "Regular verbs in the past (-ed)",
    "भूतकाळ: -ed लावा",
    "बहुतेक क्रियापदांना भूतकाळासाठी -ed लावतात: work → worked, play → played, visit → visited. e ने संपणाऱ्या क्रियापदाला फक्त -d: live → lived. व्यंजन + y असेल तर y चे i करून -ed: study → studied. लहान शब्दात (स्वर + एक व्यंजन) व्यंजन दुप्पट करतात: stop → stopped. I, he, they सर्वांसाठी रूप सारखेच असते: he worked, they worked. -ed चे तीन उच्चार आहेत: worked ('ट्' सारखा), played ('ड्' सारखा), visited (वेगळा भाग 'इड').",
    "verb + ed · live → lived · study → studied · stop → stopped",
    [
      ["I worked all day.", "मी दिवसभर काम केले."],
      ["They played cricket.", "ते क्रिकेट खेळले."],
      ["He lived in Pune.", "तो पुण्यात राहत होता."],
      ["I studied for two hours.", "मी दोन तास अभ्यास केला."],
      ["We stopped at the shop.", "आम्ही दुकानाजवळ थांबलो."],
    ],
    "काल तुम्ही केलेल्या चार गोष्टी -ed असलेल्या क्रियापदांनी सांगा, उदा. I cooked… I watched…",
  ),
  newLesson(
    "past-irregular",
    "tenses",
    "Common irregular verbs in the past",
    "-ed न लागणारी क्रियापदे",
    "काही क्रियापदांचे भूतकाळी रूप -ed ने बनत नाही; ते वेगळे लक्षात ठेवावे लागते: go → went, see → saw, have → had, buy → bought, eat → ate, make → made, take → took, come → came, meet → met. 'goed', 'buyed' असे रूप नसते. भूतकाळात he, she, it साठीही रूप बदलत नाही: he went, she bought. read चे भूतकाळी रूपही read असते, पण उच्चार 'रेड' होतो. रोज चार-पाच क्रियापदे पाठ करा आणि वाक्यात वापरा.",
    "go → went · see → saw · have → had · buy → bought · eat → ate",
    [
      ["I went to the market.", "मी बाजारात गेलो/गेले."],
      ["She bought vegetables.", "तिने भाज्या घेतल्या."],
      ["We saw a film.", "आम्ही चित्रपट पाहिला."],
      ["They came by bus.", "ते बसने आले."],
      ["I ate rice and dal.", "मी भात आणि डाळ खाल्ली."],
    ],
    "काल तुम्ही कुठे गेलात, काय घेतले आणि काय खाल्ले ते went, bought, ate वापरून सांगा.",
  ),
  newLesson(
    "past-questions",
    "tenses",
    "Past questions and negatives",
    "भूतकाळातील प्रश्न आणि नकार",
    "भूतकाळात प्रश्न आणि नकारासाठी did वापरतात आणि क्रियापद मूळ रूपात राहते: Did you go? (went नाही). I did not go (didn't go). प्रश्न: Did + subject + base verb? What did you eat? Where did she go? लहान उत्तर: Yes, I did. / No, I didn't. was/were असेल तेव्हा did लागत नाही: Were you tired? सामान्य चूक: 'Did you went?' चुकीचे आहे; बरोबर: Did you go? वेळेचे शब्द: yesterday, last week, two days ago.",
    "Did + subject + base verb? · subject + did not + base verb",
    [
      ["Did you go to the market?", "तुम्ही बाजारात गेलात का?"],
      ["I did not buy anything.", "मी काही घेतले नाही."],
      ["What did you eat?", "तुम्ही काय खाल्ले?"],
      ["She didn't come yesterday.", "ती काल आली नाही."],
      ["He called me two days ago.", "त्याने मला दोन दिवसांपूर्वी फोन केला."],
    ],
    "'Did you…?' ने सुरू होणारे तीन प्रश्न स्वतःला विचारा आणि Yes, I did. / No, I didn't. असे उत्तर द्या.",
  ),
];

export const kits: Record<string, Enrich> = {
  "was-were": lessonKit(
    "was-were",
    [
      "I can say where I was and how things were.",
      "मी कुठे होतो/होते आणि गोष्टी कशा होत्या ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "Where were you yesterday?", "तुम्ही काल कुठे होता?"],
      [
        "B",
        "I was at home. I was not well.",
        "मी घरी होतो/होते. माझी तब्येत बरी नव्हती.",
      ],
      ["A", "Was your brother at home too?", "तुमचा भाऊही घरी होता का?"],
      ["B", "No, he was at work.", "नाही, तो कामावर होता."],
    ],
    [
      "I / he / she / it + was · you / we / they + were",
      "Was / Were + subject …? · was not / were not",
    ],
    [
      gap(
        "I ___ at the market yesterday.",
        "was",
        ["were", "is"],
        "I सोबत भूतकाळात was येते. were फक्त you, we, they सोबत येते.",
      ),
      gap(
        "They ___ very tired last night.",
        "were",
        ["was", "are"],
        "they सोबत भूतकाळात were येते.",
      ),
      m2e(
        "तुम्ही काल कुठे होता?",
        "Where were you yesterday?",
        ["Where was you yesterday?", "Where you were yesterday?"],
        "you सोबत were येते आणि प्रश्नात were आधी येते: Where were you?",
      ),
      e2m(
        "The shop was not open.",
        "दुकान उघडे नव्हते.",
        ["दुकान उघडे नाही.", "दुकान उघडे असेल."],
        "was not म्हणजे 'नव्हते'; तो भूतकाळ आहे.",
      ),
      lis(
        "We were at the station at six.",
        "ऐका. ते कुठे होते?",
        "स्थानकावर",
        ["बाजारात", "शाळेत"],
        "at the station म्हणजे स्थानकावर.",
      ),
      bld(
        "ती काल घरी होती.",
        "She was at home yesterday.",
        ["were"],
        "she सोबत was येते.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["काल तुम्ही कुठे होता?", "Where were you?"],
      "मित्र तुम्हाला काल भेटला नाही, म्हणून विचारतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "Where were you yesterday? I called you.",
          "काल तुम्ही कुठे होता? मी तुम्हाला फोन केला होता.",
        ],
        ["y", "घरी होतो असे सांगा.", "I was at home.", "I was…"],
        ["o", "Were you not well?", "तुमची तब्येत बरी नव्हती का?"],
        [
          "y",
          "हो, थोडा आजारी होतो असे सांगा.",
          "Yes, I was a little ill.",
          "Yes, I was…",
        ],
      ],
    ),
  ),
  "past-regular": lessonKit(
    "past-regular",
    [
      "I can use regular -ed verbs to say what I did.",
      "मी -ed असलेली क्रियापदे वापरून मी काय केले ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "Tell me about your Sunday.", "तुमच्या रविवारबद्दल सांगा."],
      [
        "B",
        "I cleaned the house and cooked lunch.",
        "मी घर स्वच्छ केले आणि जेवण बनवले.",
      ],
      ["A", "And in the evening?", "आणि संध्याकाळी?"],
      [
        "B",
        "We watched the match and I called my mother.",
        "आम्ही सामना पाहिला आणि मी आईला फोन केला.",
      ],
    ],
    [
      "verb + ed: worked, played, watched",
      "live → lived · study → studied · stop → stopped",
    ],
    [
      gap(
        "Yesterday I ___ cricket with my friends.",
        "played",
        ["play", "playing"],
        "yesterday म्हणजे भूतकाळ; play चे भूतकाळी रूप played आहे.",
      ),
      gap(
        "She ___ in Nashik last year.",
        "lived",
        ["live", "lives"],
        "live मध्ये आधीच e आहे, म्हणून फक्त -d लावतात: lived.",
      ),
      und(
        "stop चे भूतकाळी रूप कोणते?",
        "stopped",
        ["stoped", "stopt"],
        "लहान शब्दात (स्वर + एक व्यंजन) व्यंजन दुप्पट होते: stop → stopped.",
      ),
      und(
        "studied हे कोणत्या क्रियापदाचे भूतकाळी रूप आहे?",
        "study",
        ["stud", "studing"],
        "व्यंजन + y असेल तर y चे i होऊन -ed लागते: study → studied.",
      ),
      lis(
        "I watched a film last night.",
        "ऐका. त्याने काल रात्री काय केले?",
        "चित्रपट पाहिला",
        ["जेवण बनवले", "गाणे ऐकले"],
        "watched a film म्हणजे चित्रपट पाहिला.",
      ),
      m2e(
        "आम्ही काल क्रिकेट खेळलो.",
        "We played cricket yesterday.",
        ["We play cricket yesterday.", "We playing cricket yesterday."],
        "yesterday सोबत भूतकाळ played येतो.",
      ),
      bld(
        "मी काल घर स्वच्छ केले.",
        "I cleaned the house yesterday.",
        ["clean"],
        "cleaned हे clean चे भूतकाळी रूप आहे.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["तुमचा रविवार", "Your Sunday"],
      "सहकारी तुम्हाला तुमच्या रविवारबद्दल विचारतो.",
      "तुम्ही: सहकारी",
      [
        ["o", "How was your Sunday?", "तुमचा रविवार कसा गेला?"],
        ["y", "छान गेला असे सांगा.", "It was nice.", "It was…"],
        ["o", "What did you do?", "तुम्ही काय केले?"],
        [
          "y",
          "दोन गोष्टी सांगा: घर स्वच्छ केले आणि जेवण बनवले.",
          "I cleaned the house and cooked lunch.",
          "I cleaned…",
        ],
      ],
    ),
  ),
  "past-irregular": lessonKit(
    "past-irregular",
    [
      "I can use common irregular past verbs: went, saw, had, bought, ate.",
      "मी went, saw, had, bought, ate सारखी नेहमीची क्रियापदे वापरू शकतो/शकते.",
    ],
    [
      ["A", "Tell me about your trip.", "तुमच्या सहलीबद्दल सांगा."],
      [
        "B",
        "We went to Pune by bus. We saw a fort and ate vada pav.",
        "आम्ही बसने पुण्याला गेलो. आम्ही किल्ला पाहिला आणि वडापाव खाल्ला.",
      ],
      ["A", "That sounds nice. What happened in the evening?", "छान वाटते. संध्याकाळी काय झाले?"],
      [
        "B",
        "We came home late and had dinner.",
        "आम्ही उशिरा घरी आलो आणि जेवण केले.",
      ],
    ],
    [
      "go → went · see → saw · have → had · buy → bought · eat → ate",
      "make → made · take → took · come → came · meet → met",
    ],
    [
      gap(
        "Yesterday we ___ to the market.",
        "went",
        ["go", "goed"],
        "go चे भूतकाळी रूप went आहे. 'goed' असे रूप नसते.",
      ),
      gap(
        "She ___ vegetables and fruits.",
        "bought",
        ["buyed", "buy"],
        "buy चे भूतकाळी रूप bought आहे.",
      ),
      m2e(
        "मी काल एक चित्रपट पाहिला.",
        "I saw a film yesterday.",
        ["I see a film yesterday.", "I seed a film yesterday."],
        "see चे भूतकाळी रूप saw आहे.",
      ),
      e2m(
        "They came by bus.",
        "ते बसने आले.",
        ["ते बसने जातील.", "ते बस घेऊन गेले."],
        "came म्हणजे 'आले' (come चे भूतकाळी रूप). 'गेले' म्हणजे went.",
      ),
      lis(
        "We ate rice and dal.",
        "ऐका. त्यांनी काय खाल्ले?",
        "भात आणि डाळ",
        ["पोळी आणि भाजी", "फक्त फळे"],
        "ate म्हणजे खाल्ले; rice and dal म्हणजे भात आणि डाळ.",
      ),
      und(
        "take चे भूतकाळी रूप कोणते?",
        "took",
        ["taked", "takes"],
        "take चे भूतकाळी रूप took आहे; -ed लागत नाही.",
      ),
      bld(
        "आम्ही पुण्याला गेलो.",
        "We went to Pune.",
        ["go"],
        "go चे भूतकाळी रूप went आहे.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["सहलीची गोष्ट", "The trip"],
      "मित्र तुमच्या सहलीबद्दल विचारतो.",
      "तुम्ही: मित्र",
      [
        ["o", "How was your trip?", "तुमची सहल कशी होती?"],
        [
          "y",
          "पुण्याला गेलो आणि किल्ला पाहिला असे सांगा.",
          "We went to Pune and saw a fort.",
          "We went to Pune…",
        ],
        ["o", "Nice! What did you eat?", "छान! तुम्ही काय खाल्ले?"],
        ["y", "वडापाव खाल्ला असे सांगा.", "We ate vada pav.", "We ate…"],
      ],
    ),
  ),
  "past-questions": lessonKit(
    "past-questions",
    [
      "I can ask and answer questions about the past.",
      "मी भूतकाळाबद्दल प्रश्न विचारू आणि उत्तरे देऊ शकतो/शकते.",
    ],
    [
      ["A", "Did you meet Rahul yesterday?", "तुम्ही काल राहुलला भेटलात का?"],
      [
        "B",
        "No, I did not meet him. I met Anil.",
        "नाही, मी त्याला भेटलो नाही. मी अनिलला भेटलो.",
      ],
      ["A", "What did you do together?", "तुम्ही एकत्र काय केले?"],
      [
        "B",
        "We watched a match and ate dinner.",
        "आम्ही सामना पाहिला आणि जेवण केले.",
      ],
    ],
    [
      "Did + subject + base verb?",
      "subject + did not + base verb · What / Where + did + subject + base verb?",
    ],
    [
      gap(
        "Did you ___ to the shop?",
        "go",
        ["went", "going"],
        "did नंतर क्रियापद मूळ रूपात येते: go. went वापरू नका.",
      ),
      gap(
        "I did not ___ the film.",
        "see",
        ["saw", "seen"],
        "did not नंतर मूळ क्रियापद see येते.",
      ),
      und(
        "कोणते वाक्य बरोबर आहे?",
        "Did you eat lunch?",
        ["Did you ate lunch?", "Do you ate lunch?"],
        "Did नंतर eat (मूळ रूप) येते; ate नाही.",
      ),
      m2e(
        "तुम्ही काल काय खाल्ले?",
        "What did you eat yesterday?",
        ["What you ate yesterday?", "What did you ate yesterday?"],
        "प्रश्नात What did you + मूळ क्रियापद येते.",
      ),
      resp(
        "Did you finish your homework?",
        "Yes, I did.",
        ["Yes, I finished do.", "Yes, I am."],
        "Did…? चे लहान उत्तर Yes, I did. किंवा No, I didn't. असते.",
      ),
      lis(
        "I did not go to school last week.",
        "ऐका. त्याने काय केले नाही?",
        "शाळेत गेला नाही",
        ["जेवला नाही", "फोन केला नाही"],
        "did not go म्हणजे 'गेला नाही'; school म्हणजे शाळा.",
      ),
      bld(
        "तुम्ही काल बाजारात गेलात का?",
        "Did you go to the market yesterday?",
        ["went"],
        "Did you नंतर go (मूळ रूप) येते.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["सुट्टीबद्दल गप्पा", "Weekend chat"],
      "सहकारी तुम्हाला गेल्या आठवड्याच्या शेवटाबद्दल विचारतो.",
      "तुम्ही: सहकारी",
      [
        [
          "o",
          "Did you go anywhere last weekend?",
          "गेल्या आठवड्याच्या शेवटी तुम्ही कुठे गेलात का?",
        ],
        [
          "y",
          "कुठे गेला नाहीत, घरीच राहिलात असे सांगा.",
          "No, I stayed at home. I did not go out.",
          "No, I stayed…",
        ],
        ["o", "What did you do at home?", "घरी तुम्ही काय केले?"],
        [
          "y",
          "जेवण बनवले आणि टीव्ही पाहिला असे सांगा.",
          "I cooked and watched TV.",
          "I cooked…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b8p",
  path: "beginner",
  title: "भूतकाळ: काय झाले?",
  en: "The past: was/were, -ed and irregular verbs",
  outcome: [
    "I can say where I was and what I did in the past, and ask simple questions about it.",
    "मी कुठे होतो/होते आणि काय केले ते भूतकाळात सांगू शकतो/शकते आणि त्याबद्दल साधे प्रश्न विचारू शकतो/शकते.",
  ],
  lessons: ["was-were", "past-regular", "past-irregular", "past-questions"],
  checkpoint: {
    scenario: [
      "Your neighbour asks about your holiday last month.",
      "तुमचे शेजारी गेल्या महिन्याच्या सुट्टीबद्दल विचारतात.",
    ],
    ex: finish("b8p", "cp", [
      resp(
        "Where were you during the holidays?",
        "We were in Goa.",
        ["We are in Goa.", "We was in Goa."],
        "we सोबत भूतकाळात were येते.",
      ),
      gap(
        "We ___ a lot of fish in Goa.",
        "ate",
        ["eated", "eat"],
        "eat चे भूतकाळी रूप ate आहे; -ed लागत नाही.",
      ),
      m2e(
        "आम्ही समुद्रकिनाऱ्यावर खेळलो.",
        "We played on the beach.",
        ["We play on the beach.", "We playing on the beach."],
        "भूतकाळात play चे रूप played होते.",
      ),
      lis(
        "We did not stay long. We came back on Sunday.",
        "ऐका. ते कधी परत आले?",
        "रविवारी",
        ["शनिवारी", "सोमवारी"],
        "came back on Sunday म्हणजे रविवारी परत आले.",
      ),
      bld(
        "आम्ही तिथे पाच दिवस राहिलो.",
        "We stayed there for five days.",
        ["stay"],
        "stay चे भूतकाळी रूप stayed आहे.",
      ),
    ]),
    speak:
      "गेल्या रविवारी तुम्ही कुठे होता आणि काय केले ते चार वाक्यांत सांगा. त्यात was/were, -ed असलेले एक क्रियापद, एक irregular क्रियापद आणि एक नकारात्मक वाक्य (I did not…) वापरा.",
  },
};
