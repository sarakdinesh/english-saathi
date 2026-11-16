// Level 4 (Advanced) unit 2: meetings, reported speech, describing data and
// checking understanding. Roughly CEFR B2 targets. Written with AI assistance
// on 16 November 2026; not yet reviewed by a teacher.
import {
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
    "chairing",
    "work",
    "Run a meeting: start, move on, sum up",
    "बैठक चालवा: सुरुवात, पुढचा मुद्दा, सारांश",
    "बैठक चालवणाऱ्याचे काम म्हणजे वेळ आणि क्रम सांभाळणे. सुरुवात: Let's get started. The main aim of today's meeting is … . पुढे जाणे: Let's move on to … . कोणाला बोलू देणे: Priya, what do you think? विषय भरकटला तर: Let's come back to that later. शेवट: To sum up, … / Thank you all for coming.",
    "Let's get started · Let's move on to … · Let's come back to that later · To sum up, …",
    [
      ["Let's get started. The main aim of today's meeting is the new budget.", "चला सुरू करूया. आजच्या बैठकीचा मुख्य उद्देश नवीन बजेट आहे."],
      ["Let's move on to the next point: the delivery schedule.", "आता पुढच्या मुद्द्याकडे जाऊया: डिलिव्हरीचे वेळापत्रक."],
      ["That's a good question. Let's come back to that later.", "चांगला प्रश्न आहे. त्यावर नंतर परत येऊया."],
      ["To sum up, we agree to start the project in May.", "थोडक्यात, मे महिन्यात प्रकल्प सुरू करायचे आपण ठरवले."],
    ],
    "तुम्ही पाच मिनिटांची टीम बैठक चालवत आहात. सुरुवात, एक मुद्दा, पुढचा मुद्दा आणि सारांश असे चार वाक्यांत बोला.",
  ),
  newLesson(
    "reported-speech",
    "work",
    "Report what people said",
    "दुसऱ्याने काय सांगितले ते सांगा",
    "दुसऱ्याचे बोलणे सांगताना काळ एक पायरी मागे जातो: \"I am busy\" → He said (that) he was busy. \"We will call\" → They said they would call. प्रश्न: \"Can you come?\" → She asked if I could come. आदेश/विनंती: \"Send it today\" → He told me to send it today. tell नंतर व्यक्ती (told me), say नंतर नाही (said that).",
    "He said (that) … · She asked if … · He told me to …",
    [
      ["The manager said that the meeting was cancelled.", "व्यवस्थापकांनी सांगितले की बैठक रद्द झाली."],
      ["The client said they would pay next week.", "ग्राहकाने सांगितले की ते पुढच्या आठवड्यात पैसे देतील."],
      ["She asked if we could finish by Friday.", "आपण शुक्रवारपर्यंत पूर्ण करू शकतो का, असे तिने विचारले."],
      ["He told me to send the file today.", "त्यांनी मला आज फाइल पाठवायला सांगितले."],
    ],
    "आज कोणीतरी तुम्हाला सांगितलेल्या तीन गोष्टी (एक माहिती, एक प्रश्न, एक विनंती) reported speech मध्ये सांगा.",
  ),
  newLesson(
    "describing-trends",
    "work",
    "Describe numbers and trends",
    "आकडे आणि कल (trend) सांगा",
    "आलेख किंवा आकडे सांगताना: वाढ — rose / increased / went up; घट — fell / decreased / went down; बदल नाही — remained stable / stayed the same; सर्वोच्च — peaked at … . किती वेगाने: sharply (झपाट्याने), steadily (हळूहळू सतत), slightly (थोडेसे). from … to … आणि by … (by 10% = दहा टक्क्यांनी) नीट वापरा.",
    "rose sharply · fell slightly · remained stable · peaked at … · by 10%",
    [
      ["Sales rose sharply in March.", "मार्चमध्ये विक्री झपाट्याने वाढली."],
      ["Costs fell slightly from 50,000 to 48,000 rupees.", "खर्च ५०,००० वरून ४८,००० रुपयांपर्यंत थोडासा कमी झाला."],
      ["The number of customers remained stable in the summer.", "उन्हाळ्यात ग्राहकांची संख्या स्थिर राहिली."],
      ["Online orders peaked at 900 in December.", "डिसेंबरमध्ये ऑनलाइन ऑर्डर ९०० वर सर्वोच्च पातळीवर पोहोचल्या."],
    ],
    "तुमच्या घरचा महिन्याचा खर्च, दुकानाची विक्री किंवा एखादा आकडा घ्या आणि तीन महिन्यांत तो कसा बदलला ते तीन वाक्यांत सांगा.",
  ),
  newLesson(
    "clarifying",
    "work",
    "Check you understood and ask for more",
    "समजले का ते तपासा आणि अधिक माहिती मागा",
    "ऑनलाइन बैठक किंवा फोनवर गैरसमज टाळण्यासाठी: समजलेले स्वतःच्या शब्दांत सांगा — So what you're saying is … / Just to clarify, … ; अधिक माहिती मागा — Could you elaborate on …? / Could you give me an example?; ऐकू आले नाही — Sorry, you broke up. Could you repeat the last part? ही वाक्ये कमकुवतपणा नाहीत; व्यावसायिक लोक ती रोज वापरतात.",
    "So what you're saying is … · Just to clarify, … · Could you elaborate on …?",
    [
      ["So what you're saying is that we need more staff.", "म्हणजे तुम्हाला असे म्हणायचे आहे की आपल्याला अधिक कर्मचारी हवेत."],
      ["Just to clarify, is the deadline Monday or Tuesday?", "स्पष्ट करण्यासाठी विचारतो/विचारते — अंतिम तारीख सोमवार की मंगळवार?"],
      ["Could you elaborate on the new process?", "नवीन प्रक्रियेबद्दल थोडे विस्ताराने सांगाल का?"],
      ["Sorry, you broke up. Could you repeat the last part?", "माफ करा, आवाज तुटला. शेवटचा भाग पुन्हा सांगाल का?"],
    ],
    "एखाद्या सहकाऱ्याने तुम्हाला नवीन काम समजावले आहे अशी कल्पना करा. समजलेले स्वतःच्या शब्दांत सांगा आणि एक स्पष्टीकरणाचा प्रश्न विचारा.",
  ),
];

export const kits: Record<string, Enrich> = {
  chairing: lessonKit(
    "chairing",
    [
      "I can open a meeting, move between points and sum up clearly.",
      "मी बैठक सुरू करू शकतो/शकते, मुद्द्यांमध्ये पुढे जाऊ शकतो/शकते आणि स्पष्ट सारांश देऊ शकतो/शकते.",
    ],
    [
      ["A", "Let's get started. The main aim today is the festival sale.", "चला सुरू करूया. आजचा मुख्य विषय सणाची विक्री आहे."],
      ["B", "Can we also talk about the new uniforms?", "आपण नवीन गणवेशाबद्दलही बोलू शकतो का?"],
      ["A", "Good point. Let's come back to that later. First, the sale dates.", "चांगला मुद्दा. त्यावर नंतर येऊया. आधी विक्रीच्या तारखा."],
      ["B", "I think the sale should start on the first of October.", "मला वाटते विक्री एक ऑक्टोबरपासून सुरू व्हावी."],
    ],
    [
      "Let's get started. The main aim is …",
      "Let's move on to …",
      "Let's come back to that later.",
      "To sum up, …",
    ],
    [
      und(
        "बैठक सुरू करताना सर्वात योग्य वाक्य कोणते?",
        "Let's get started. The main aim of today's meeting is the budget.",
        ["Start now. Budget.", "Why are we here today?"],
        "Let's get started + मुख्य उद्देश सांगितल्याने सगळ्यांना बैठकीची दिशा कळते. बाकी दोन वाक्ये उद्धट किंवा गोंधळात टाकणारी आहेत.",
      ),
      gap(
        "Let's move ___ to the next point.",
        "on",
        ["up", "in"],
        "move on to = पुढच्या मुद्द्याकडे जाणे. हा ठरलेला phrasal verb आहे.",
      ),
      gap(
        "To ___ up, we agree to hire two people.",
        "sum",
        ["some", "summary"],
        "To sum up = थोडक्यात. sum (बेरीज) आणि some (काही) यांचा उच्चार सारखा, पण अर्थ वेगळा.",
      ),
      resp(
        "Can we discuss the parking problem now?",
        "That's important. Let's come back to it at the end of the meeting.",
        ["No. Be quiet.", "Parking is not a meeting."],
        "विषय महत्त्वाचा असल्याचे मान्य करा आणि तो नंतर घेऊ असे सांगा. यामुळे बैठक वेळेत राहते आणि कोणी दुखावत नाही.",
      ),
      m2e(
        "प्रिया, तुम्हाला काय वाटते?",
        "Priya, what do you think?",
        ["Priya, what you think?", "Priya, what are you thinking about it?"],
        "मत विचारताना what do you think? — do सुटू नये. what are you thinking म्हणजे 'आत्ता कशाचा विचार करताय'.",
      ),
      lis(
        "To sum up, we will open the new shop in June and hire three people.",
        "ऐका. नवीन दुकान कधी उघडणार?",
        "जूनमध्ये",
        ["जुलैमध्ये", "पुढच्या वर्षी"],
        "To sum up नंतर निर्णय येतो: open the new shop in June.",
      ),
    ],
    rolePlay(
      "",
      "advanced",
      ["टीम बैठक चालवणे", "Chairing a team meeting"],
      "तुम्ही सोमवारची टीम बैठक चालवत आहात. एक सहकारी विषयाबाहेरचा मुद्दा काढतो.",
      "तुम्ही: बैठकीचे अध्यक्ष",
      [
        ["o", "Good morning, everyone is here.", "सुप्रभात, सगळे आले आहेत."],
        ["y", "बैठक सुरू करा आणि मुख्य उद्देश सांगा.", "Let's get started. The main aim today is the new delivery schedule.", "Let's get started. The main aim…"],
        ["o", "Before that, can we talk about the office canteen?", "त्याआधी आपण कँटीनबद्दल बोलू शकतो का?"],
        ["y", "तो विषय नंतर घ्या.", "Let's come back to that later. First, the schedule.", "Let's come back to that later."],
        ["o", "Okay. We think deliveries should be on Tuesdays.", "ठीक आहे. आम्हाला वाटते डिलिव्हरी मंगळवारी व्हावी."],
        ["y", "सारांश सांगा.", "To sum up, deliveries will be on Tuesdays from next week.", "To sum up,…"],
      ],
    ),
  ),
  "reported-speech": lessonKit(
    "reported-speech",
    [
      "I can tell others what someone said, asked or told me to do.",
      "कोणी काय सांगितले, विचारले किंवा करायला सांगितले ते मी इतरांना सांगू शकतो/शकते.",
    ],
    [
      ["A", "Did the client call back?", "ग्राहकाचा परत फोन आला का?"],
      ["B", "Yes. She said that the order was ready.", "हो. तिने सांगितले की ऑर्डर तयार आहे."],
      ["A", "Did she ask anything?", "तिने काही विचारले का?"],
      ["B", "She asked if we could collect it tomorrow, and she told me to bring the bill.", "उद्या घेऊन जाऊ शकतो का असे तिने विचारले, आणि बिल आणायला सांगितले."],
    ],
    [
      "He said (that) + past",
      "They said they would + verb",
      "She asked if + past",
      "He told me to + verb",
    ],
    [
      gap(
        "\"I am tired.\" → He said that he ___ tired.",
        "was",
        ["is", "be"],
        "reported speech मध्ये काळ एक पायरी मागे जातो: am/is → was.",
      ),
      gap(
        "\"We will call you.\" → They said they ___ call us.",
        "would",
        ["will to", "can to"],
        "will → would. would नंतर थेट मूळ क्रियापद येते.",
      ),
      und(
        "\"Can you come early?\" हे reported speech मध्ये कसे सांगाल?",
        "She asked if I could come early.",
        ["She asked can I come early.", "She said me to come early?"],
        "प्रश्न सांगताना asked if + सामान्य वाक्यरचना (I could). प्रश्नचिन्ह आणि उलटी रचना नाही.",
      ),
      und(
        "कोणते वाक्य बरोबर आहे?",
        "He told me to send the file.",
        ["He said me to send the file.", "He told to me send the file."],
        "tell नंतर थेट व्यक्ती येते (told me). say नंतर व्यक्ती थेट येत नाही (said me चूक).",
      ),
      e2m(
        "The manager said that the meeting was cancelled.",
        "व्यवस्थापकांनी सांगितले की बैठक रद्द झाली.",
        ["व्यवस्थापक बैठक रद्द करणार आहेत.", "बैठक रद्द करायला व्यवस्थापकांनी नकार दिला."],
        "said that … was cancelled = सांगितले की रद्द झाली. भविष्य किंवा नकार या वाक्यात नाही.",
      ),
      lis(
        "My boss told me to finish the report before lunch.",
        "ऐका. साहेबांनी काय करायला सांगितले?",
        "जेवणाआधी अहवाल पूर्ण करायला",
        ["जेवणानंतर फोन करायला", "अहवाल उद्या द्यायला"],
        "told me to finish the report before lunch — जेवणाआधी अहवाल पूर्ण करा.",
      ),
    ],
    rolePlay(
      "",
      "advanced",
      ["निरोप पोहोचवणे", "Passing on a message"],
      "तुमचे सहकारी बाहेर गेले होते. त्यांच्यासाठी आलेले निरोप तुम्ही त्यांना सांगत आहात.",
      "तुम्ही: सहकारी",
      [
        ["o", "Did anyone call for me?", "माझ्यासाठी कोणाचा फोन आला होता का?"],
        ["y", "ग्राहकाने काय सांगितले ते सांगा.", "Yes, Mr Shah called. He said that the payment was ready.", "He said that…"],
        ["o", "Great. Did he ask anything?", "छान. त्यांनी काही विचारले का?"],
        ["y", "त्यांचा प्रश्न सांगा.", "He asked if you could visit his office on Friday.", "He asked if you could…"],
        ["o", "Anything else?", "आणखी काही?"],
        ["y", "त्यांची विनंती सांगा.", "He told me to remind you to bring the contract.", "He told me to…"],
      ],
    ),
  ),
  "describing-trends": lessonKit(
    "describing-trends",
    [
      "I can describe how numbers went up, went down or stayed the same.",
      "आकडे कसे वाढले, कमी झाले किंवा तसेच राहिले ते मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "How were sales this quarter?", "या तिमाहीत विक्री कशी होती?"],
      ["B", "They rose sharply in October because of Diwali.", "दिवाळीमुळे ऑक्टोबरमध्ये विक्री झपाट्याने वाढली."],
      ["A", "And in November?", "आणि नोव्हेंबरमध्ये?"],
      ["B", "They fell slightly, and then remained stable in December.", "थोडी कमी झाली, आणि मग डिसेंबरमध्ये स्थिर राहिली."],
    ],
    [
      "rose / increased / went up",
      "fell / decreased / went down",
      "remained stable",
      "sharply · steadily · slightly · by 10%",
    ],
    [
      und(
        "'झपाट्याने वाढली' साठी योग्य शब्द कोणते?",
        "rose sharply",
        ["fell sharply", "remained slightly"],
        "rose = वाढली, sharply = झपाट्याने. fell = कमी झाली; remained stable = बदल नाही.",
      ),
      gap(
        "Prices increased ___ 10% last year.",
        "by",
        ["with", "of"],
        "किती बदलले ते सांगताना by: increased by 10% = दहा टक्क्यांनी वाढले.",
      ),
      gap(
        "Costs fell ___ 60,000 to 55,000 rupees.",
        "from",
        ["since", "of"],
        "सुरुवातीचा आणि शेवटचा आकडा: from … to … .",
      ),
      m2e(
        "उन्हाळ्यात ग्राहकांची संख्या स्थिर राहिली.",
        "The number of customers remained stable in the summer.",
        ["The number of customers was stable up in summer.", "Customers number remained stably in summer."],
        "remained stable = स्थिर राहिले. stable विशेषण आहे; stably नाही.",
      ),
      resp(
        "Did online orders go up last month?",
        "Yes, they went up steadily and peaked at 900 at the end of the month.",
        ["Yes, they are very up.", "Orders is online last month."],
        "कसे वाढले (steadily) आणि सर्वोच्च आकडा (peaked at 900) सांगितल्याने उत्तर पूर्ण होते.",
      ),
      lis(
        "Our electricity bill decreased by fifteen percent after we installed solar panels.",
        "ऐका. वीजबिल किती कमी झाले?",
        "पंधरा टक्के",
        ["पन्नास टक्के", "पाच टक्के"],
        "decreased by fifteen percent — पंधरा टक्क्यांनी कमी झाले. fifteen आणि fifty यांचा उच्चार नीट ऐका.",
      ),
    ],
    rolePlay(
      "",
      "advanced",
      ["महिन्याचा अहवाल सांगणे", "Presenting monthly figures"],
      "तुमचे साहेब फोनवर गेल्या तीन महिन्यांच्या विक्रीबद्दल विचारत आहेत.",
      "तुम्ही: विक्री प्रतिनिधी",
      [
        ["o", "How were sales in January?", "जानेवारीत विक्री कशी होती?"],
        ["y", "विक्री झपाट्याने वाढली असे सांगा.", "Sales rose sharply in January, by about twenty percent.", "Sales rose sharply…"],
        ["o", "And February?", "आणि फेब्रुवारी?"],
        ["y", "थोडी घट झाली असे सांगा.", "They fell slightly in February because of the exams.", "They fell slightly…"],
        ["o", "What about March?", "मार्चचे काय?"],
        ["y", "स्थिर राहिली असे सांगा.", "In March they remained stable at around two lakh rupees.", "They remained stable…"],
      ],
    ),
  ),
  clarifying: lessonKit(
    "clarifying",
    [
      "I can check that I understood and ask someone to explain more.",
      "मला नीट समजले का ते मी तपासू शकतो/शकते आणि अधिक स्पष्टीकरण मागू शकतो/शकते.",
    ],
    [
      ["A", "We need the new forms from all branches by the end of the month.", "आपल्याला महिनाअखेरपर्यंत सर्व शाखांकडून नवीन फॉर्म हवे आहेत."],
      ["B", "Just to clarify, do you mean the thirtieth or the thirty-first?", "स्पष्ट करण्यासाठी विचारतो — तीस तारीख की एकतीस?"],
      ["A", "The thirtieth. And please use the new format.", "तीस तारीख. आणि कृपया नवीन नमुना वापरा."],
      ["B", "Could you elaborate on the new format? I haven't seen it yet.", "नवीन नमुन्याबद्दल थोडे सांगाल का? मी तो अजून पाहिलेला नाही."],
    ],
    [
      "So what you're saying is …",
      "Just to clarify, …",
      "Could you elaborate on …?",
      "Could you repeat the last part?",
    ],
    [
      und(
        "समोरच्याचे म्हणणे स्वतःच्या शब्दांत तपासण्यासाठी कोणते वाक्य?",
        "So what you're saying is that we need more time.",
        ["You said nothing clear.", "I don't understand anything you say."],
        "So what you're saying is … ने तुम्ही काय समजलात ते शांतपणे तपासता. बाकी दोन वाक्ये समोरच्याला दोष देतात.",
      ),
      gap(
        "Just to ___, is the meeting at 3 or 4?",
        "clarify",
        ["clear", "clarity"],
        "Just to clarify = स्पष्ट करून घेण्यासाठी. to नंतर क्रियापद (clarify) हवे; clarity नाम आहे.",
      ),
      gap(
        "Could you elaborate ___ the new rules?",
        "on",
        ["about to", "at"],
        "elaborate on something = एखाद्या गोष्टीबद्दल विस्ताराने सांगणे.",
      ),
      resp(
        "...and then we... the server... next... (the line is bad)",
        "Sorry, you broke up. Could you repeat the last part?",
        ["What? Speak properly!", "Okay, bye."],
        "फोन/ऑनलाइन बैठकीत आवाज तुटला तर you broke up म्हणा आणि नम्रपणे पुन्हा सांगायला विनंती करा.",
      ),
      m2e(
        "तुम्ही एक उदाहरण द्याल का?",
        "Could you give me an example?",
        ["Could you give me example?", "Can you giving an example?"],
        "an example — example स्वराने सुरू होतो म्हणून an. can/could नंतर मूळ क्रियापद (give).",
      ),
      lis(
        "Just to clarify, the training is on Saturday morning, not Sunday.",
        "ऐका. प्रशिक्षण कधी आहे?",
        "शनिवारी सकाळी",
        ["रविवारी सकाळी", "शनिवारी संध्याकाळी"],
        "on Saturday morning, not Sunday — शनिवार सकाळ.",
      ),
    ],
    rolePlay(
      "",
      "advanced",
      ["ऑनलाइन बैठकीत स्पष्टीकरण", "Clarifying in an online meeting"],
      "ऑनलाइन बैठकीत तुमचे व्यवस्थापक नवीन नियम सांगत आहेत, पण इंटरनेट अधूनमधून तुटते.",
      "तुम्ही: टीम सदस्य",
      [
        ["o", "From next month, all reports go to... (the line breaks)", "पुढच्या महिन्यापासून सर्व अहवाल... (आवाज तुटतो)"],
        ["y", "शेवटचा भाग पुन्हा मागा.", "Sorry, you broke up. Could you repeat the last part?", "Sorry, you broke up…"],
        ["o", "All reports go to the regional office, not to me.", "सर्व अहवाल माझ्याकडे नाही, प्रादेशिक कार्यालयात जातील."],
        ["y", "समजले ते तपासा.", "So what you're saying is that we send everything to the regional office.", "So what you're saying is…"],
        ["o", "Exactly. And use the new template.", "बरोबर. आणि नवीन नमुना वापरा."],
        ["y", "अधिक माहिती मागा.", "Could you elaborate on the new template? Where can I find it?", "Could you elaborate on…?"],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "a2",
  path: "advanced",
  title: "बैठका, अहवाल आणि आकडे",
  en: "Meetings, reports and figures",
  outcome: [
    "I can run a short meeting, report what people said, describe figures and check that I understood.",
    "मी छोटी बैठक चालवू शकतो/शकते, कोणी काय सांगितले ते सांगू शकतो/शकते, आकडे वर्णन करू शकतो/शकते आणि समजले का ते तपासू शकतो/शकते.",
  ],
  lessons: ["chairing", "reported-speech", "describing-trends", "clarifying"],
  checkpoint: {
    scenario: [
      "You lead a monthly review meeting, share the sales figures and pass on a message from a client.",
      "तुम्ही महिन्याची आढावा बैठक घेता, विक्रीचे आकडे सांगता आणि एका ग्राहकाचा निरोप पोहोचवता.",
    ],
    ex: finish("a2", "cp", [
      und(
        "बैठकीत पुढच्या मुद्द्याकडे जाण्यासाठी कोणते वाक्य?",
        "Let's move on to the sales figures.",
        ["Next, next, sales.", "Let's moving to the sales."],
        "Let's move on to … हे स्पष्ट आणि नम्र आहे. Let's नंतर मूळ क्रियापद (move), -ing नाही.",
      ),
      gap(
        "Sales increased ___ 12% in October.",
        "by",
        ["of", "with"],
        "बदल किती झाला ते by ने सांगतात: increased by 12%.",
      ),
      gap(
        "\"We will pay on Monday.\" → The client said they ___ pay on Monday.",
        "would",
        ["will to", "are"],
        "दुसऱ्याचे बोलणे सांगताना will चे would होते.",
      ),
      lis(
        "Just to clarify, the new prices start on the first of April.",
        "ऐका. नवीन किमती कधीपासून?",
        "एक एप्रिलपासून",
        ["एक ऑगस्टपासून", "एकतीस मार्चपासून"],
        "start on the first of April — एक एप्रिल.",
      ),
    ]),
    speak:
      "एका मिनिटाची आढावा बैठक घ्या: सुरुवात करा, एक आकडा (वाढ किंवा घट) सांगा, एका ग्राहकाने काय सांगितले ते सांगा आणि सारांश द्या.",
  },
};
