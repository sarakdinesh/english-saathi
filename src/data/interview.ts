// Interview kit: common job-interview questions with short, simple model
// answers. [Brackets] hold example details the learner replaces with their
// own; audio and the word check use the examples without brackets. Awaiting the same
// Marathi-teacher review as the rest of the content.
export type InterviewQuestion = {
  id: string;
  q: string;
  qMr: string;
  answer: string;
  answerMr: string;
  tip: string;
};

// Phrases that buy time or ask for help without panic.
export const interviewPhrases = [
  { en: "Could you please repeat the question?", mr: "कृपया प्रश्न पुन्हा सांगाल का?" },
  { en: "Let me think for a moment.", mr: "मला एक क्षण विचार करू द्या." },
  { en: "Sorry, I did not understand. Could you say it slowly?", mr: "माफ करा, समजले नाही. हळू सांगाल का?" },
  { en: "That is a good question.", mr: "हा चांगला प्रश्न आहे." },
];

export const plainAnswer = (text: string) => text.replace(/\[([^\]]+)\]/g, "$1");

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "iv-about",
    q: "Tell me about yourself.",
    qMr: "तुमच्याबद्दल सांगा.",
    answer:
      "My name is [Rahul Patil]. I am from [Pune]. I have completed [B.Com], and I have [one year] of experience in [sales]. I am hardworking, and I enjoy learning new things.",
    answerMr:
      "माझे नाव [नाव]. मी [शहर] चा/ची आहे. मी [पदवी] पूर्ण केली आहे आणि मला [क्षेत्र] मध्ये [एक वर्ष] अनुभव आहे. मी मेहनती आहे आणि मला नवीन गोष्टी शिकायला आवडतात.",
    tip: "एक मिनिट बोला: नाव, शिक्षण, अनुभव आणि एक चांगला गुण. घरचा पूर्ण इतिहास नको.",
  },
  {
    id: "iv-why-job",
    q: "Why do you want this job?",
    qMr: "तुम्हाला ही नोकरी का हवी आहे?",
    answer:
      "This job matches my skills and my interest. I want to grow in [sales], and I believe I can learn a lot and contribute to your team.",
    answerMr:
      "ही नोकरी माझ्या कौशल्यांशी आणि आवडीशी जुळते. मला [क्षेत्र] मध्ये प्रगती करायची आहे, आणि मी खूप शिकू शकेन व तुमच्या टीमला मदत करू शकेन.",
    tip: "पगाराबद्दल नाही, कामाबद्दल बोला.",
  },
  {
    id: "iv-hire",
    q: "Why should we hire you?",
    qMr: "आम्ही तुम्हाला का निवडावे?",
    answer:
      "I have the right skills for this role, and I learn quickly. I am punctual and responsible, and I always try to finish my work on time.",
    answerMr:
      "या कामासाठी लागणारी कौशल्ये माझ्याकडे आहेत आणि मी पटकन शिकतो/शिकते. मी वेळेवर येतो/येते, जबाबदार आहे आणि काम वेळेत पूर्ण करण्याचा प्रयत्न करतो/करते.",
    tip: "दोन-तीन गुण सांगा आणि शक्य असल्यास एक छोटे उदाहरण द्या.",
  },
  {
    id: "iv-strengths",
    q: "What are your strengths?",
    qMr: "तुमची बलस्थाने कोणती?",
    answer:
      "My main strength is that I am a quick learner. I am also good at working with people, and I stay calm when there is a lot of work.",
    answerMr:
      "मी पटकन शिकतो/शिकते हे माझे मुख्य बलस्थान आहे. मी लोकांसोबत चांगले काम करतो/करते आणि खूप काम असताना शांत राहतो/राहते.",
    tip: "तीनपेक्षा जास्त गुण नको. खरे गुण सांगा.",
  },
  {
    id: "iv-weakness",
    q: "What is your weakness?",
    qMr: "तुमची कमजोरी कोणती?",
    answer:
      "Sometimes I spend too much time checking my work. I am learning to plan my time better, so I can finish quickly without mistakes.",
    answerMr:
      "कधी कधी मी माझे काम तपासण्यात जास्त वेळ घालवतो/घालवते. मी वेळेचे नियोजन चांगले करायला शिकत आहे, म्हणजे काम लवकर आणि अचूक होईल.",
    tip: "खरी पण लहान कमजोरी सांगा, आणि तुम्ही ती कशी सुधारत आहात ते सांगा.",
  },
  {
    id: "iv-five-years",
    q: "Where do you see yourself in five years?",
    qMr: "पाच वर्षांनी तुम्ही स्वतःला कुठे पाहता?",
    answer:
      "In five years, I see myself as an experienced member of this team. I want to take more responsibility and help new people learn.",
    answerMr:
      "पाच वर्षांनी मी या टीमचा अनुभवी सदस्य असेन. मला जास्त जबाबदारी घ्यायची आहे आणि नवीन लोकांना शिकायला मदत करायची आहे.",
    tip: "ही कंपनी सोडण्याचा विचार बोलू नका.",
  },
  {
    id: "iv-left",
    q: "Why did you leave your last job?",
    qMr: "तुम्ही मागची नोकरी का सोडली?",
    answer:
      "I learned a lot in my last job. Now I am looking for a role with more growth and new challenges.",
    answerMr:
      "मागच्या नोकरीत मी खूप शिकलो/शिकले. आता मला जास्त प्रगती आणि नवीन आव्हाने असलेले काम हवे आहे.",
    tip: "जुन्या कंपनीबद्दल कधीही वाईट बोलू नका.",
  },
  {
    id: "iv-education",
    q: "Tell me about your education.",
    qMr: "तुमच्या शिक्षणाबद्दल सांगा.",
    answer:
      "I completed my [B.Com] from [Pune University] in [2023]. My favourite subject was [Accounts], and I also did a project on [online shopping].",
    answerMr:
      "मी [वर्ष] मध्ये [कॉलेज] मधून [पदवी] पूर्ण केली. [विषय] हा माझा आवडता विषय होता आणि मी [विषय] वर एक प्रकल्पही केला.",
    tip: "कामाशी जुळणारा विषय किंवा प्रकल्प आवर्जून सांगा.",
  },
  {
    id: "iv-company",
    q: "What do you know about our company?",
    qMr: "आमच्या कंपनीबद्दल तुम्हाला काय माहिती आहे?",
    answer:
      "Your company works in [retail], and it is known for [good customer service]. I read about you on your website, and I like that you [train young people].",
    answerMr:
      "तुमची कंपनी [क्षेत्र] मध्ये काम करते आणि [चांगली गुणवत्ता / सेवा] साठी ओळखली जाते. मी तुमच्या वेबसाइटवर वाचले, आणि तुम्ही [एक माहिती] हे मला आवडले.",
    tip: "मुलाखतीआधी कंपनीबद्दल दोन गोष्टी नक्की वाचा.",
  },
  {
    id: "iv-pressure",
    q: "How do you handle pressure?",
    qMr: "कामाचा ताण तुम्ही कसा हाताळता?",
    answer:
      "I make a list and do the most important work first. I stay calm, and if I need help, I ask my seniors early.",
    answerMr:
      "मी कामांची यादी करतो/करते आणि सर्वात महत्त्वाचे काम आधी करतो/करते. मी शांत राहतो/राहते आणि गरज असल्यास वरिष्ठांची मदत लवकर घेतो/घेते.",
    tip: "एक खरी घटना सांगितली तर उत्तर अजून चांगले होते.",
  },
  {
    id: "iv-team",
    q: "Do you prefer working alone or in a team?",
    qMr: "तुम्हाला एकट्याने काम करायला आवडते की टीममध्ये?",
    answer:
      "I can do both. I like working in a team because we learn from each other, but I can also work alone and finish my tasks on time.",
    answerMr:
      "मी दोन्ही करू शकतो/शकते. टीममध्ये एकमेकांकडून शिकायला मिळते म्हणून ते आवडते, पण मी एकट्यानेही काम वेळेत पूर्ण करू शकतो/शकते.",
    tip: "\"दोन्ही\" असे उत्तर सुरक्षित आणि खरे असते.",
  },
  {
    id: "iv-problem",
    q: "Tell me about a problem you solved.",
    qMr: "तुम्ही सोडवलेल्या एखाद्या अडचणीबद्दल सांगा.",
    answer:
      "In my last job, a customer was angry about a late delivery. I listened calmly, checked the order, and gave him a clear date. He was happy, and he ordered again.",
    answerMr:
      "मागच्या नोकरीत उशिरा डिलिव्हरीमुळे एक ग्राहक रागावला होता. मी शांतपणे ऐकले, ऑर्डर तपासली आणि स्पष्ट तारीख सांगितली. तो खूश झाला आणि त्याने पुन्हा ऑर्डर दिली.",
    tip: "क्रम ठेवा: अडचण → तुम्ही काय केले → निकाल.",
  },
  {
    id: "iv-hobbies",
    q: "What are your hobbies?",
    qMr: "तुमचे छंद कोणते?",
    answer: "I like reading, playing cricket, and learning English. Cricket teaches me teamwork.",
    answerMr: "मला वाचन, क्रिकेट खेळणे आणि इंग्रजी शिकणे आवडते. क्रिकेटमुळे मी टीमवर्क शिकतो/शिकते.",
    tip: "छंदातून एखादा चांगला गुण कसा येतो ते जोडा.",
  },
  {
    id: "iv-salary",
    q: "What are your salary expectations?",
    qMr: "तुम्हाला किती पगार अपेक्षित आहे?",
    answer:
      "I am expecting around [25,000 rupees] per month, based on my experience. But I am open to discussion.",
    answerMr:
      "माझ्या अनुभवानुसार मला महिन्याला साधारण [रक्कम] अपेक्षित आहे. पण मी चर्चेसाठी तयार आहे.",
    tip: "आधी त्या कामाचा साधारण पगार माहिती करून घ्या.",
  },
  {
    id: "iv-relocate",
    q: "Are you willing to relocate?",
    qMr: "तुम्ही दुसऱ्या शहरात जाऊन काम करायला तयार आहात का?",
    answer: "Yes, I am ready to move to a new city for a good opportunity.",
    answerMr: "हो, चांगल्या संधीसाठी मी नवीन शहरात जायला तयार आहे.",
    tip: "तयार नसाल तर नम्रपणे आणि प्रामाणिकपणे सांगा.",
  },
  {
    id: "iv-gap",
    q: "Why is there a gap in your career?",
    qMr: "तुमच्या कामात खंड का पडला?",
    answer:
      "I took a break for [family reasons]. During that time, I also improved my skills, for example my English and computer skills.",
    answerMr:
      "मी [कौटुंबिक कारणांसाठी / अभ्यासासाठी] सुट्टी घेतली होती. त्या काळात मी माझी कौशल्ये सुधारली, उदा. इंग्रजी आणि संगणक.",
    tip: "कारण थोडक्यात सांगा आणि त्या काळात काय शिकलात ते सांगा.",
  },
  {
    id: "iv-learn",
    q: "How do you learn new skills?",
    qMr: "तुम्ही नवीन कौशल्ये कशी शिकता?",
    answer:
      "I practise a little every day. I watch videos, I ask experienced people, and I use apps. For example, I am improving my English with daily speaking practice.",
    answerMr:
      "मी रोज थोडा सराव करतो/करते. मी व्हिडिओ पाहतो/पाहते, अनुभवी लोकांना विचारतो/विचारते आणि ॲप्स वापरतो/वापरते. उदा. रोज बोलण्याचा सराव करून मी इंग्रजी सुधारत आहे.",
    tip: "हे ॲप वापरत आहात हे खरे उदाहरण आहे — नक्की सांगा!",
  },
  {
    id: "iv-liked",
    q: "What did you like about your last job?",
    qMr: "मागच्या नोकरीत तुम्हाला काय आवडले?",
    answer: "I liked my team and the chance to learn from customers every day.",
    answerMr: "मला माझी टीम आणि रोज ग्राहकांकडून शिकण्याची संधी आवडली.",
    tip: "सकारात्मक बोला, एक-दोन गोष्टी पुरेशा.",
  },
  {
    id: "iv-join",
    q: "When can you join?",
    qMr: "तुम्ही कधी रुजू होऊ शकता?",
    answer: "I can join within [two weeks], after I complete my notice period.",
    answerMr: "नोटीस कालावधी पूर्ण झाल्यावर मी [दोन आठवड्यांत] रुजू होऊ शकतो/शकते.",
    tip: "खरी तारीख सांगा; नंतर बदलणे टाळा.",
  },
  {
    id: "iv-questions",
    q: "Do you have any questions for us?",
    qMr: "तुम्हाला आम्हाला काही विचारायचे आहे का?",
    answer:
      "Yes, thank you. What does a normal day in this job look like? And what will I learn in the first three months?",
    answerMr:
      "हो, धन्यवाद. या कामात रोजचा दिवस कसा असतो? आणि पहिल्या तीन महिन्यांत मी काय शिकेन?",
    tip: "एक-दोन प्रश्न नक्की विचारा; \"नाही\" म्हणणे टाळा.",
  },
];
