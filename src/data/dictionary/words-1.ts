// Daily-life words, part 1: people, body & health, food & drink.
// One line per word: English | मराठी. AI-drafted, not yet teacher-reviewed.
import type { WordGroup } from "./types";

export const groups1: WordGroup[] = [
  {
    id: "people",
    mr: "कुटुंब आणि लोक",
    en: "Family & people",
    raw: `
mother|आई
father|वडील
parents|आई-वडील
son|मुलगा
daughter|मुलगी
brother|भाऊ
sister|बहीण
elder brother|मोठा भाऊ
younger sister|लहान बहीण
grandfather|आजोबा
grandmother|आजी
grandson|नातू
granddaughter|नात
grandparents|आजी-आजोबा
uncle|काका, मामा
aunt|काकू, मावशी, आत्या
cousin|चुलत/मावस भावंड
nephew|पुतण्या, भाचा
niece|पुतणी, भाची
husband|नवरा, पती
wife|बायको, पत्नी
baby|बाळ
child|मूल
children|मुले
boy|मुलगा
girl|मुलगी
man|माणूस, पुरुष
woman|स्त्री, बाई
men|पुरुष (अनेकवचन)
women|स्त्रिया
person|व्यक्ती
people|लोक
family|कुटुंब
relative|नातेवाईक
friend|मित्र, मैत्रीण
best friend|जिवलग मित्र
neighbour|शेजारी
guest|पाहुणा
host|यजमान
stranger|अनोळखी व्यक्ती
adult|प्रौढ
teenager|किशोरवयीन
kid|लहान मूल
twins|जुळे
father-in-law|सासरे
mother-in-law|सासू
son-in-law|जावई
daughter-in-law|सून
brother-in-law|मेहुणा, दीर
sister-in-law|मेहुणी, नणंद, वहिनी
bride|नवरी, वधू
bridegroom|नवरदेव, वर
fiancé|वाग्दत्त वर
couple|जोडपे
partner|जोडीदार
orphan|अनाथ
widow|विधवा
ancestor|पूर्वज
generation|पिढी
elder|वडीलधारी व्यक्ती
youth|तरुण
infant|तान्हे बाळ
toddler|चालायला शिकणारे मूल
gentleman|सभ्य गृहस्थ
lady|बाई, महिला
sir|साहेब
madam|मॅडम, बाईसाहेब
Mr|श्री.
Mrs|श्रीमती
Miss|कुमारी
name|नाव
surname|आडनाव
first name|पहिले नाव
nickname|टोपणनाव
age|वय
birthday|वाढदिवस
marriage|लग्न
wedding|विवाह समारंभ
divorce|घटस्फोट
birth|जन्म
death|मृत्यू
childhood|बालपण
old age|म्हातारपण
member|सदस्य
crowd|गर्दी
group|गट
team|संघ
community|समाज, समुदाय
villager|गावकरी
citizen|नागरिक
foreigner|परदेशी व्यक्ती
tourist|पर्यटक
visitor|भेट देणारा
customer|ग्राहक
owner|मालक
servant|नोकर
maid|मोलकरीण
helper|मदतनीस
leader|नेता
follower|अनुयायी
hero|नायक
heroine|नायिका
king|राजा
queen|राणी
prince|राजकुमार
princess|राजकुमारी
`,
  },
  {
    id: "body",
    mr: "शरीर",
    en: "Body",
    raw: `
body|शरीर
head|डोके
hair|केस
face|चेहरा
forehead|कपाळ
eye|डोळा
eyebrow|भुवई
eyelash|पापणीचे केस
eyelid|पापणी
ear|कान
nose|नाक
cheek|गाल
mouth|तोंड
lip|ओठ
tooth|दात
teeth|दात (अनेकवचन)
tongue|जीभ
chin|हनुवटी
jaw|जबडा
beard|दाढी
moustache|मिशी
neck|मान
throat|घसा
shoulder|खांदा
arm|हात (दंड)
elbow|कोपर
wrist|मनगट
hand|हात
palm|तळहात
finger|बोट
thumb|अंगठा
nail|नख
chest|छाती
back|पाठ
waist|कंबर
stomach|पोट
belly|पोट (ढेरी)
navel|बेंबी
hip|नितंब, कंबर
leg|पाय
thigh|मांडी
knee|गुडघा
ankle|घोटा
foot|पाऊल
feet|पावले
heel|टाच
toe|पायाचे बोट
skin|त्वचा
bone|हाड
muscle|स्नायू
blood|रक्त
heart|हृदय
lungs|फुफ्फुसे
brain|मेंदू
liver|यकृत
kidney|मूत्रपिंड
vein|शीर
nerve|मज्जातंतू
skull|कवटी
spine|पाठीचा कणा
rib|बरगडी
joint|सांधा
sweat|घाम
tear|अश्रू
breath|श्वास
voice|आवाज
pulse|नाडी
fist|मूठ
lap|मांडी (बसल्यावर)
gums|हिरड्या
height|उंची
weight|वजन
`,
  },
  {
    id: "health",
    mr: "आरोग्य",
    en: "Health",
    raw: `
health|आरोग्य
doctor|डॉक्टर
nurse|परिचारिका
patient|रुग्ण
hospital|रुग्णालय
clinic|दवाखाना
medicine|औषध
tablet|गोळी
injection|इंजेक्शन
syrup|सिरप, पातळ औषध
prescription|औषधाची चिठ्ठी
pharmacy|औषधांचे दुकान
chemist|केमिस्ट
fever|ताप
cold|सर्दी
cough|खोकला
headache|डोकेदुखी
stomachache|पोटदुखी
toothache|दातदुखी
backache|पाठदुखी
pain|वेदना
wound|जखम
injury|दुखापत
cut|कापलेली जखम
bruise|मुका मार
burn|भाजलेली जखम
bandage|पट्टी
plaster|प्लास्टर
blood pressure|रक्तदाब
diabetes|मधुमेह
infection|संसर्ग
allergy|ॲलर्जी
vomiting|उलटी
diarrhoea|जुलाब
dizziness|चक्कर
weakness|अशक्तपणा
illness|आजारपण
disease|रोग
germ|जंतू
virus|विषाणू
vaccine|लस
treatment|उपचार
operation|शस्त्रक्रिया
check-up|तपासणी
report|अहवाल
X-ray|एक्स-रे
test|चाचणी
ambulance|रुग्णवाहिका
emergency|आणीबाणी
first aid|प्रथमोपचार
thermometer|थर्मामीटर
stretcher|स्ट्रेचर
wheelchair|व्हीलचेअर
dentist|दंतवैद्य
specialist|तज्ज्ञ डॉक्टर
ward|रुग्णालयातील कक्ष
appointment|भेटीची वेळ
recovery|बरे होणे
rest|विश्रांती
diet|आहार
exercise|व्यायाम
yoga|योग
sleep|झोप
hygiene|स्वच्छता
fitness|तंदुरुस्ती
sneeze|शिंक
itching|खाज
swelling|सूज
fracture|हाड मोडणे
sprain|मुरगळणे
cramp|पेटका
acidity|पित्त, ॲसिडिटी
constipation|बद्धकोष्ठता
asthma|दमा
cancer|कर्करोग
heart attack|हृदयविकाराचा झटका
stress|ताण
tiredness|थकवा
blindness|अंधत्व
deafness|बहिरेपणा
spectacles|चष्मा
hearing aid|श्रवणयंत्र
pill|गोळी (औषधाची)
ointment|मलम
drops|थेंब (औषधाचे)
cotton|कापूस
mask|मुखवटा, मास्क
sanitiser|सॅनिटायझर
pregnancy|गर्भधारणा
`,
  },
  {
    id: "food",
    mr: "अन्न आणि पेय",
    en: "Food & drink",
    raw: `
food|अन्न
meal|जेवण
breakfast|नाश्ता
lunch|दुपारचे जेवण
dinner|रात्रीचे जेवण
snack|अल्पोपहार
tiffin|डबा
water|पाणी
milk|दूध
tea|चहा
coffee|कॉफी
juice|रस
buttermilk|ताक
curd|दही
butter|लोणी
ghee|तूप
cheese|चीज
paneer|पनीर
cream|साय, क्रीम
bread|पाव, ब्रेड
roti|पोळी, चपाती
bhakri|भाकरी
rice|भात, तांदूळ
dal|डाळ, वरण
curry|आमटी, करी
vegetable|भाजी
salad|कोशिंबीर
pickle|लोणचे
papad|पापड
chutney|चटणी
soup|सूप
egg|अंडे
omelette|ऑम्लेट
meat|मांस
chicken|कोंबडीचे मांस
mutton|मटण
fish|मासा
prawns|कोळंबी
sugar|साखर
jaggery|गूळ
salt|मीठ
pepper|मिरी
chilli|मिरची
turmeric|हळद
cumin|जिरे
mustard seeds|मोहरी
coriander|कोथिंबीर
mint|पुदिना
ginger|आले
garlic|लसूण
onion|कांदा
potato|बटाटा
tomato|टोमॅटो
cabbage|कोबी
cauliflower|फुलकोबी
brinjal|वांगे
lady's finger|भेंडी
spinach|पालक
fenugreek|मेथी
peas|वाटाणे
beans|घेवडा, शेंगा
carrot|गाजर
radish|मुळा
beetroot|बीट
cucumber|काकडी
pumpkin|भोपळा
bottle gourd|दुधी भोपळा
bitter gourd|कारले
drumstick|शेवगा
capsicum|ढोबळी मिरची
mushroom|अळंबी
corn|मका
lemon|लिंबू
coconut|नारळ
groundnut|शेंगदाणा
cashew|काजू
almond|बदाम
raisin|मनुका
dates|खजूर
walnut|अक्रोड
fruit|फळ
apple|सफरचंद
banana|केळे
mango|आंबा
orange|संत्रे
grapes|द्राक्षे
guava|पेरू
papaya|पपई
pineapple|अननस
watermelon|कलिंगड
melon|खरबूज
pomegranate|डाळिंब
chikoo|चिकू
custard apple|सीताफळ
jackfruit|फणस
pear|नासपती
strawberry|स्ट्रॉबेरी
cherry|चेरी
plum|आलूबुखार
wheat|गहू
flour|पीठ
gram flour|बेसन
semolina|रवा
jowar|ज्वारी
bajra|बाजरी
ragi|नाचणी
oats|ओट्स
lentils|मसूर, डाळी
chickpeas|हरभरे
oil|तेल
vinegar|व्हिनेगर
sauce|सॉस
ketchup|केचप
jam|जाम
honey|मध
biscuit|बिस्किट
cake|केक
chocolate|चॉकलेट
sweet|मिठाई, गोड पदार्थ
ice cream|आईस्क्रीम
laddoo|लाडू
halwa|शिरा, हलवा
kheer|खीर
puran poli|पुरणपोळी
modak|मोदक
poha|पोहे
upma|उपमा
idli|इडली
dosa|डोसा
vada pav|वडापाव
samosa|सामोसा
sandwich|सँडविच
burger|बर्गर
pizza|पिझ्झा
noodles|नूडल्स
pasta|पास्ता
chips|वेफर्स
popcorn|लाह्या, पॉपकॉर्न
cold drink|थंड पेय
soda|सोडा
lassi|लस्सी
sugarcane juice|उसाचा रस
tender coconut|शहाळे
spice|मसाला
taste|चव
flavour|स्वाद
recipe|पाककृती
dish|पदार्थ
plate of food|ताट
leftovers|उरलेले अन्न
hunger|भूक
thirst|तहान
appetite|भूक (इच्छा)
fast|उपवास
feast|मेजवानी
party|पार्टी
dough|कणीक
batter|पीठ (भिजवलेले)
slice|काप
piece|तुकडा
bite|घास
sip|घोट
drink|पेय
`,
  },
];
