// Daily-life words, part 2: home & kitchen, clothes, school, work, shopping & money.
// One line per word: English | मराठी. AI-drafted, not yet teacher-reviewed.
import type { WordGroup } from "./types";

export const groups2: WordGroup[] = [
  {
    id: "home",
    mr: "घर आणि स्वयंपाकघर",
    en: "Home & kitchen",
    raw: `
house|घर
home|घर (आपले)
flat|सदनिका, फ्लॅट
building|इमारत
room|खोली
bedroom|झोपण्याची खोली
kitchen|स्वयंपाकघर
bathroom|न्हाणीघर
toilet|शौचालय
living room|दिवाणखाना
hall|हॉल
balcony|बाल्कनी, सज्जा
terrace|गच्ची
verandah|व्हरांडा
courtyard|अंगण
garden|बाग
roof|छप्पर
ceiling|छत
floor|फरशी, मजला
wall|भिंत
door|दार
window|खिडकी
gate|फाटक
stairs|जिना
lift|लिफ्ट
corridor|मार्गिका
basement|तळघर
garage|गॅरेज
store room|कोठीची खोली
lock|कुलूप
key|किल्ली
doorbell|दारावरची घंटी
curtain|पडदा
carpet|गालिचा
mat|सतरंजी, पायपुसणे
bed|पलंग
mattress|गादी
pillow|उशी
pillow cover|उशीचा अभ्रा
bedsheet|चादर
blanket|पांघरूण, घोंगडी
quilt|रजई
mosquito net|मच्छरदाणी
table|टेबल
chair|खुर्ची
sofa|सोफा
stool|स्टूल
bench|बाक
cupboard|कपाट
shelf|फळी, कप्पा
drawer|ड्रॉवर
mirror|आरसा
clock|घड्याळ
calendar|दिनदर्शिका
photo frame|फोटो फ्रेम
lamp|दिवा
bulb|बल्ब
tube light|ट्यूबलाईट
fan|पंखा
switch|बटण
socket|सॉकेट
wire|तार
plug|प्लग
fridge|फ्रिज
television|दूरदर्शन, टीव्ही
air conditioner|वातानुकूलक
cooler|कूलर
heater|हीटर
geyser|गिझर
washing machine|कपडे धुण्याचे यंत्र
vacuum cleaner|व्हॅक्यूम क्लीनर
iron box|इस्त्री
broom|झाडू
mop|पोछा
bucket|बादली
mug|मग, टमरेल
tap|नळ
pipe|पाईप
sink|सिंक
washbasin|वॉशबेसिन
shower|शॉवर
soap|साबण
shampoo|शॅम्पू
towel|टॉवेल
toothbrush|दात घासण्याचा ब्रश
toothpaste|टूथपेस्ट
comb|कंगवा
hairbrush|केसांचा ब्रश
razor|वस्तरा
dustbin|कचरापेटी
garbage|कचरा
dust|धूळ
stove|शेगडी
gas cylinder|गॅस सिलिंडर
burner|बर्नर
oven|ओव्हन
microwave|मायक्रोवेव्ह
mixer|मिक्सर
grinder|ग्राइंडर
pressure cooker|कुकर
pan|कढई, तवा
frying pan|फ्रायपॅन
griddle|तवा
pot|भांडे
vessel|भांडे (मोठे)
lid|झाकण
plate|ताट, प्लेट
bowl|वाटी
glass|पेला, ग्लास
cup|कप
saucer|बशी
spoon|चमचा
fork|काटा
knife|सुरी
ladle|पळी, डाव
spatula|उलथने
rolling pin|लाटणे
rolling board|पोळपाट
grater|किसणी
sieve|चाळणी
strainer|गाळणी
tongs|चिमटा
mortar and pestle|खलबत्ता
chopping board|चॉपिंग बोर्ड
jar|बरणी
bottle|बाटली
container|डबा
tray|ट्रे
basket|टोपली
box|पेटी, डबा
bag|पिशवी
match box|काडेपेटी
candle|मेणबत्ती
torch|विजेरी
battery|बॅटरी
napkin|रुमाल (जेवणाचा)
apron|ॲप्रन
tablecloth|टेबलक्लॉथ
dining table|जेवणाचे टेबल
water filter|पाणी शुद्धीकरण यंत्र
tank|टाकी
well|विहीर
hammer|हातोडा
screwdriver|स्क्रूड्रायव्हर
screw|स्क्रू
ladder|शिडी
rope|दोरी
thread|धागा
needle|सुई
scissors|कात्री
safety pin|सेफ्टी पिन
button|बटण (कपड्याचे)
hanger|हँगर
clothesline|कपडे वाळत घालायची दोरी
clothes peg|चिमटा (कपड्यांचा)
umbrella|छत्री
shoe rack|चपलांचे कपाट
cushion|उशी (सोफ्याची)
vase|फुलदाणी
plant pot|कुंडी
painting|चित्र
poster|पोस्टर
neighbourhood|परिसर
address|पत्ता
rent|भाडे
landlord|घरमालक
tenant|भाडेकरू
furniture|फर्निचर
electricity|वीज
power cut|वीज जाणे
light|प्रकाश, दिवा
housework|घरकाम
laundry|धुण्याचे कपडे
dishes|खरकटी भांडी
cooking|स्वयंपाक
cleaning|साफसफाई
`,
  },
  {
    id: "clothes",
    mr: "कपडे आणि वस्तू",
    en: "Clothes & accessories",
    raw: `
clothes|कपडे
shirt|शर्ट
T-shirt|टी-शर्ट
trousers|पँट
jeans|जीन्स
shorts|हाफ पँट
skirt|स्कर्ट
dress|पोशाख, फ्रॉक
saree|साडी
blouse|ब्लाऊज
kurta|कुर्ता
pyjama|पायजमा
salwar|सलवार
dupatta|ओढणी
dhoti|धोतर
lungi|लुंगी
coat|कोट
jacket|जॅकेट
sweater|स्वेटर
shawl|शाल
raincoat|रेनकोट
uniform|गणवेश
suit|सूट
tie|टाय
belt|पट्टा
cap|टोपी
hat|हॅट
scarf|स्कार्फ
gloves|हातमोजे
socks|पायमोजे
shoes|बूट
sandals|सँडल
slippers|चपला
boots|उंच बूट
underwear|अंतर्वस्त्र
vest|बनियन
nightdress|रात्रीचा पोशाख
handkerchief|रुमाल
pocket|खिसा
collar|कॉलर
sleeve|बाही
zip|चेन
wallet|पाकीट
purse|पर्स
handbag|हँडबॅग
watch|मनगटी घड्याळ
ring|अंगठी
necklace|हार
chain|साखळी
earrings|कानातले
bangles|बांगड्या
bracelet|ब्रेसलेट
anklet|पैंजण
nose ring|नथ
mangalsutra|मंगळसूत्र
bindi|टिकली
sunglasses|गॉगल
jewellery|दागिने
gold|सोने
silver|चांदी
cloth|कापड
silk|रेशीम
wool|लोकर
cotton cloth|सुती कापड
size|माप
fashion|फॅशन
style|शैली
tailor|शिंपी
laundry shop|लॉंड्री
perfume|अत्तर
lipstick|लिपस्टिक
powder|पावडर
kajal|काजळ
hairpin|पिन, आकडा
hair oil|केसांचे तेल
mehendi|मेंदी
`,
  },
  {
    id: "school",
    mr: "शाळा आणि शिक्षण",
    en: "School & education",
    raw: `
school|शाळा
college|महाविद्यालय
university|विद्यापीठ
class|वर्ग
classroom|वर्गखोली
teacher|शिक्षक
student|विद्यार्थी
principal|मुख्याध्यापक
classmate|वर्गमित्र
lesson|धडा
subject|विषय
book|पुस्तक
notebook|वही
textbook|पाठ्यपुस्तक
page|पान
pen|पेन
pencil|पेन्सिल
eraser|खोडरबर
sharpener|टोकयंत्र
ruler|पट्टी
compass box|कंपास पेटी
crayons|मेणाचे रंग
colour pencils|रंगीत पेन्सिली
school bag|दप्तर
blackboard|फळा
chalk|खडू
duster|डस्टर
desk|बाक
homework|गृहपाठ
classwork|वर्गकार्य
exam|परीक्षा
result|निकाल
marks|गुण
grade|श्रेणी
question|प्रश्न
answer|उत्तर
mistake|चूक
paper|कागद
question paper|प्रश्नपत्रिका
answer sheet|उत्तरपत्रिका
library|ग्रंथालय
laboratory|प्रयोगशाळा
playground|मैदान
canteen|उपाहारगृह
holiday|सुट्टी
vacation|दीर्घ सुट्टी
timetable|वेळापत्रक
period|तासिका
recess|मधली सुट्टी
assembly|प्रार्थना सभा
attendance|हजेरी
absent|गैरहजर
present|हजर
admission|प्रवेश
fees|शुल्क
scholarship|शिष्यवृत्ती
certificate|प्रमाणपत्र
degree|पदवी
diploma|पदविका
education|शिक्षण
knowledge|ज्ञान
study|अभ्यास
reading|वाचन
writing|लेखन
spelling|स्पेलिंग
grammar|व्याकरण
vocabulary|शब्दसंग्रह
sentence|वाक्य
word|शब्द
letter|अक्षर; पत्र
alphabet|वर्णमाला
language|भाषा
English|इंग्रजी
Marathi|मराठी
Hindi|हिंदी
mathematics|गणित
science|विज्ञान
history|इतिहास
geography|भूगोल
civics|नागरिकशास्त्र
physics|भौतिकशास्त्र
chemistry|रसायनशास्त्र
biology|जीवशास्त्र
computer science|संगणकशास्त्र
drawing|चित्रकला
music|संगीत
physical education|शारीरिक शिक्षण
project|प्रकल्प
experiment|प्रयोग
chapter|प्रकरण
poem|कविता
story|गोष्ट
essay|निबंध
dictionary|शब्दकोश
map|नकाशा
globe|पृथ्वीचा गोल
chart|तक्ता
number|संख्या
addition|बेरीज
subtraction|वजाबाकी
multiplication|गुणाकार
division|भागाकार
fraction|अपूर्णांक
percentage|टक्केवारी
average|सरासरी
total|एकूण
formula|सूत्र
example|उदाहरण
explanation|स्पष्टीकरण
meaning|अर्थ
practice|सराव
revision|उजळणी
tuition|शिकवणी
coaching class|क्लास
monitor|वर्गप्रमुख
prize|बक्षीस
competition|स्पर्धा
annual day|स्नेहसंमेलन
picnic|सहल
roll number|हजेरी क्रमांक
semester|सत्र
syllabus|अभ्यासक्रम
hostel|वसतिगृह
`,
  },
  {
    id: "work",
    mr: "काम आणि ऑफिस",
    en: "Work & office",
    raw: `
work|काम
job|नोकरी
office|कार्यालय
company|कंपनी
business|व्यवसाय
boss|साहेब, वरिष्ठ
manager|व्यवस्थापक
employee|कर्मचारी
colleague|सहकारी
staff|कर्मचारी वर्ग
worker|कामगार
labourer|मजूर
officer|अधिकारी
clerk|लिपिक
secretary|सचिव
receptionist|स्वागतकर्ता
accountant|लेखापाल
engineer|अभियंता
lawyer|वकील
judge|न्यायाधीश
police officer|पोलीस अधिकारी
soldier|सैनिक
farmer|शेतकरी
driver|चालक
mechanic|मेकॅनिक
electrician|वीजतंत्री
plumber|नळकारागीर
carpenter|सुतार
painter|रंगारी, चित्रकार
mason|गवंडी
barber|न्हावी
cook|स्वयंपाकी
waiter|वेटर
shopkeeper|दुकानदार
salesman|विक्रेता
vendor|फेरीवाला
watchman|पहारेकरी
security guard|सुरक्षा रक्षक
postman|पोस्टमन
delivery boy|डिलिव्हरी बॉय
cleaner|सफाई कर्मचारी
sweeper|झाडूवाला
pilot|वैमानिक
conductor|वाहक
businessman|व्यापारी
scientist|शास्त्रज्ञ
journalist|पत्रकार
writer|लेखक
artist|कलाकार
singer|गायक
actor|अभिनेता
photographer|छायाचित्रकार
designer|डिझायनर
programmer|प्रोग्रामर
architect|वास्तुविशारद
priest|पुजारी
social worker|समाजसेवक
politician|राजकारणी
minister|मंत्री
salary|पगार
wages|मजुरी
bonus|बोनस
promotion|बढती
interview|मुलाखत
resume|माहितीपत्रक (बायोडेटा)
application|अर्ज
experience|अनुभव
skill|कौशल्य
training|प्रशिक्षण
meeting|बैठक
presentation|सादरीकरण
deadline|अंतिम मुदत
target|लक्ष्य
task|काम (नेमलेले)
duty|कर्तव्य
shift|पाळी
overtime|जादा वेळ
leave|रजा
holiday list|सुट्ट्यांची यादी
contract|करार
agreement|करारनामा
client|ग्राहक (व्यावसायिक)
file|फाईल
document|दस्तऐवज
form|अर्ज (नमुना)
signature|सही
stamp|शिक्का
letterhead|लेटरहेड
email|ईमेल
report card|प्रगतीपुस्तक
schedule|वेळापत्रक
plan|योजना
budget|अंदाजपत्रक
profit|नफा
loss|तोटा
sales|विक्री
market|बाजार
factory|कारखाना
machine|यंत्र
tool|साधन
equipment|उपकरणे
desk job|बैठे काम
department|विभाग
branch|शाखा
headquarters|मुख्यालय
reception|स्वागतकक्ष
cabin|केबिन
conference room|सभागृह
printer|प्रिंटर
photocopy|झेरॉक्स
stapler|स्टेपलर
paper clip|पेपर क्लिप
envelope|पाकीट (पत्राचे)
register|नोंदवही
notice board|सूचना फलक
retirement|निवृत्ती
pension|निवृत्तिवेतन
resignation|राजीनामा
union|संघटना
strike|संप
career|कारकीर्द
goal|ध्येय
success|यश
failure|अपयश
effort|प्रयत्न
responsibility|जबाबदारी
problem|समस्या
solution|उपाय
decision|निर्णय
idea|कल्पना
suggestion|सूचना
feedback|अभिप्राय
complaint|तक्रार
permission|परवानगी
`,
  },
  {
    id: "shopping",
    mr: "खरेदी आणि पैसे",
    en: "Shopping & money",
    raw: `
shop|दुकान
store|दुकान (मोठे)
mall|मॉल
supermarket|सुपरमार्केट
grocery|किराणा
vegetable market|भाजी मंडई
bakery|बेकरी
dairy|दूध डेअरी
medical store|औषध दुकान
hardware shop|हार्डवेअर दुकान
stationery|लेखनसाहित्य
money|पैसे
cash|रोख
coin|नाणे
note|नोट
rupee|रुपया
paisa|पैसा
change|सुटे पैसे
price|किंमत
cost|खर्च
rate|दर
discount|सूट
offer|ऑफर
sale|सेल
bill|बिल
receipt|पावती
total amount|एकूण रक्कम
tax|कर
GST|जीएसटी
payment|पेमेंट, भरणा
online payment|ऑनलाइन पेमेंट
card|कार्ड
debit card|डेबिट कार्ड
credit card|क्रेडिट कार्ड
bank|बँक
account|खाते
balance|शिल्लक
deposit|ठेव
withdrawal|पैसे काढणे
loan|कर्ज
interest|व्याज
EMI|हप्ता
cheque|धनादेश
ATM|एटीएम
PIN|पिन क्रमांक
savings|बचत
expense|खर्च
income|उत्पन्न
debt|कर्ज (देणे)
gift|भेटवस्तू
packet|पाकीट
carry bag|कॅरी बॅग
counter|काउंटर
cashier|रोखपाल
queue|रांग
trolley|ट्रॉली
weight machine|वजनकाटा
kilogram|किलो
gram|ग्रॅम
litre|लिटर
dozen|डझन
half|अर्धा
quarter|पाव
quantity|प्रमाण
quality|दर्जा
brand|ब्रँड
product|उत्पादन
item|वस्तू
stock|साठा
order|ऑर्डर
delivery|डिलिव्हरी
return|परत करणे (वस्तू)
exchange|बदलून घेणे
refund|परतावा
warranty|वॉरंटी
guarantee|हमी
expiry date|अंतिम वापर तारीख
cheap|स्वस्त
expensive|महाग
free|मोफत
wholesale|घाऊक
retail|किरकोळ
bargain|घासाघीस
customer care|ग्राहक सेवा
advertisement|जाहिरात
list|यादी
shopping list|खरेदीची यादी
budget limit|खर्च मर्यादा
wallet app|वॉलेट ॲप
UPI|यूपीआय
QR code|क्यूआर कोड
`,
  },
];
