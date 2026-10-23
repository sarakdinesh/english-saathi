// Daily-life verbs with their four forms and Marathi meaning. Reference
// content: AI-drafted, not yet reviewed by a Marathi-medium teacher.
// British spelling (travelled, practise), as taught in Indian schools.
// One line per verb: V1 | V2 (past) | V3 (past participle) | V-ing | मराठी

export type Verb = {
  v1: string;
  v2: string;
  v3: string;
  ing: string;
  mr: string;
  // Irregular: V2 or V3 is not the regular "-ed" form.
  irregular: boolean;
};

const RAW = `
accept|accepted|accepted|accepting|स्वीकारणे
achieve|achieved|achieved|achieving|साध्य करणे
act|acted|acted|acting|अभिनय करणे; कृती करणे
add|added|added|adding|जोडणे, बेरीज करणे
adjust|adjusted|adjusted|adjusting|जुळवून घेणे, सरळ करणे
admire|admired|admired|admiring|कौतुक करणे
admit|admitted|admitted|admitting|कबूल करणे; दाखल करणे
advertise|advertised|advertised|advertising|जाहिरात करणे
advise|advised|advised|advising|सल्ला देणे
afford|afforded|afforded|affording|परवडणे
agree|agreed|agreed|agreeing|सहमत होणे
aim|aimed|aimed|aiming|लक्ष्य ठेवणे, नेम धरणे
allow|allowed|allowed|allowing|परवानगी देणे
amuse|amused|amused|amusing|करमणूक करणे
analyse|analysed|analysed|analysing|विश्लेषण करणे
announce|announced|announced|announcing|जाहीर करणे
annoy|annoyed|annoyed|annoying|त्रास देणे, चिडवणे
answer|answered|answered|answering|उत्तर देणे
apologise|apologised|apologised|apologising|माफी मागणे
appear|appeared|appeared|appearing|दिसणे, दिसू लागणे
apply|applied|applied|applying|अर्ज करणे; लावणे
appoint|appointed|appointed|appointing|नेमणूक करणे
appreciate|appreciated|appreciated|appreciating|कदर करणे
approve|approved|approved|approving|मंजूर करणे
argue|argued|argued|arguing|वाद घालणे
arise|arose|arisen|arising|उद्भवणे
arrange|arranged|arranged|arranging|व्यवस्था करणे, मांडणे
arrest|arrested|arrested|arresting|अटक करणे
arrive|arrived|arrived|arriving|पोहोचणे
ask|asked|asked|asking|विचारणे
attach|attached|attached|attaching|जोडणे, अडकवणे
attack|attacked|attacked|attacking|हल्ला करणे
attend|attended|attended|attending|उपस्थित राहणे
attract|attracted|attracted|attracting|आकर्षित करणे
avoid|avoided|avoided|avoiding|टाळणे
awake|awoke|awoken|awaking|जागे होणे
bake|baked|baked|baking|भाजणे (ओव्हनमध्ये)
bang|banged|banged|banging|आपटणे, जोरात वाजवणे
bargain|bargained|bargained|bargaining|घासाघीस करणे
bathe|bathed|bathed|bathing|आंघोळ करणे/घालणे
be|was/were|been|being|असणे
bear|bore|borne|bearing|सहन करणे
beat|beat|beaten|beating|मारणे; हरवणे
become|became|become|becoming|बनणे, होणे
beg|begged|begged|begging|भीक मागणे; विनवणी करणे
begin|began|begun|beginning|सुरू करणे
behave|behaved|behaved|behaving|वागणे
believe|believed|believed|believing|विश्वास ठेवणे
belong|belonged|belonged|belonging|मालकीचे असणे
bend|bent|bent|bending|वाकवणे, वाकणे
bet|bet|bet|betting|पैज लावणे
bind|bound|bound|binding|बांधणे
bite|bit|bitten|biting|चावणे
blame|blamed|blamed|blaming|दोष देणे
bleed|bled|bled|bleeding|रक्त येणे
bless|blessed|blessed|blessing|आशीर्वाद देणे
blink|blinked|blinked|blinking|डोळे मिचकावणे
blow|blew|blown|blowing|फुंकणे; (वारा) वाहणे
boast|boasted|boasted|boasting|बढाई मारणे
boil|boiled|boiled|boiling|उकळणे
book|booked|booked|booking|आरक्षण करणे
borrow|borrowed|borrowed|borrowing|उसने घेणे
bother|bothered|bothered|bothering|त्रास देणे
bounce|bounced|bounced|bouncing|उसळणे, टप्पा पडणे
bow|bowed|bowed|bowing|नमन करणे, वाकणे
break|broke|broken|breaking|तोडणे, मोडणे
breathe|breathed|breathed|breathing|श्वास घेणे
breed|bred|bred|breeding|पैदास करणे
bring|brought|brought|bringing|आणणे
broadcast|broadcast|broadcast|broadcasting|प्रसारित करणे
brush|brushed|brushed|brushing|घासणे (दात), ब्रश करणे
build|built|built|building|बांधणे
bump|bumped|bumped|bumping|धडकणे, आदळणे
burn|burnt|burnt|burning|जळणे, जाळणे
burst|burst|burst|bursting|फुटणे
bury|buried|buried|burying|पुरणे
buy|bought|bought|buying|विकत घेणे
calculate|calculated|calculated|calculating|हिशोब करणे
call|called|called|calling|फोन करणे; हाक मारणे
calm|calmed|calmed|calming|शांत करणे
camp|camped|camped|camping|तंबू ठोकून राहणे
cancel|cancelled|cancelled|cancelling|रद्द करणे
care|cared|cared|caring|काळजी घेणे
carry|carried|carried|carrying|वाहून नेणे
catch|caught|caught|catching|पकडणे
celebrate|celebrated|celebrated|celebrating|साजरे करणे
change|changed|changed|changing|बदलणे
charge|charged|charged|charging|चार्ज करणे; पैसे आकारणे
chase|chased|chased|chasing|पाठलाग करणे
chat|chatted|chatted|chatting|गप्पा मारणे
cheat|cheated|cheated|cheating|फसवणे
check|checked|checked|checking|तपासणे
cheer|cheered|cheered|cheering|उत्साह वाढवणे, जल्लोष करणे
chew|chewed|chewed|chewing|चावणे (अन्न)
choose|chose|chosen|choosing|निवडणे
chop|chopped|chopped|chopping|चिरणे, तोडणे
clap|clapped|clapped|clapping|टाळ्या वाजवणे
clean|cleaned|cleaned|cleaning|साफ करणे
clear|cleared|cleared|clearing|मोकळे करणे, साफ करणे
climb|climbed|climbed|climbing|चढणे
cling|clung|clung|clinging|घट्ट चिकटून राहणे
close|closed|closed|closing|बंद करणे
collect|collected|collected|collecting|गोळा करणे
colour|coloured|coloured|colouring|रंगवणे
comb|combed|combed|combing|विंचरणे (केस)
combine|combined|combined|combining|एकत्र करणे
come|came|come|coming|येणे
comfort|comforted|comforted|comforting|सांत्वन करणे
command|commanded|commanded|commanding|आज्ञा देणे
comment|commented|commented|commenting|टिप्पणी करणे
commit|committed|committed|committing|वचनबद्ध होणे; (चूक) करणे
communicate|communicated|communicated|communicating|संवाद साधणे
compare|compared|compared|comparing|तुलना करणे
compete|competed|competed|competing|स्पर्धा करणे
complain|complained|complained|complaining|तक्रार करणे
complete|completed|completed|completing|पूर्ण करणे
concentrate|concentrated|concentrated|concentrating|लक्ष केंद्रित करणे
confirm|confirmed|confirmed|confirming|खात्री करणे, पक्के करणे
confuse|confused|confused|confusing|गोंधळात टाकणे
congratulate|congratulated|congratulated|congratulating|अभिनंदन करणे
connect|connected|connected|connecting|जोडणे
consider|considered|considered|considering|विचार करणे
consult|consulted|consulted|consulting|सल्ला घेणे
contact|contacted|contacted|contacting|संपर्क करणे
contain|contained|contained|containing|समाविष्ट असणे
continue|continued|continued|continuing|चालू ठेवणे
control|controlled|controlled|controlling|नियंत्रण ठेवणे
convince|convinced|convinced|convincing|पटवून देणे
cook|cooked|cooked|cooking|स्वयंपाक करणे
cooperate|cooperated|cooperated|cooperating|सहकार्य करणे
copy|copied|copied|copying|नक्कल करणे
correct|corrected|corrected|correcting|दुरुस्त करणे
cost|cost|cost|costing|किंमत असणे
cough|coughed|coughed|coughing|खोकणे
count|counted|counted|counting|मोजणे
cover|covered|covered|covering|झाकणे
crack|cracked|cracked|cracking|तडा जाणे, फोडणे
crash|crashed|crashed|crashing|धडकणे, आपटणे
crawl|crawled|crawled|crawling|रांगणे
create|created|created|creating|निर्माण करणे
creep|crept|crept|creeping|हळूच सरकणे
cross|crossed|crossed|crossing|ओलांडणे
cry|cried|cried|crying|रडणे
cure|cured|cured|curing|बरे करणे
cut|cut|cut|cutting|कापणे
cycle|cycled|cycled|cycling|सायकल चालवणे
damage|damaged|damaged|damaging|नुकसान करणे
dance|danced|danced|dancing|नाचणे
dare|dared|dared|daring|धाडस करणे
deal|dealt|dealt|dealing|हाताळणे; व्यवहार करणे
decide|decided|decided|deciding|ठरवणे
decorate|decorated|decorated|decorating|सजवणे
decrease|decreased|decreased|decreasing|कमी होणे, कमी करणे
defend|defended|defended|defending|बचाव करणे
delay|delayed|delayed|delaying|उशीर करणे
delete|deleted|deleted|deleting|काढून टाकणे, पुसणे
deliver|delivered|delivered|delivering|पोहोचवणे
demand|demanded|demanded|demanding|मागणी करणे
deny|denied|denied|denying|नाकारणे
depart|departed|departed|departing|निघणे, प्रस्थान करणे
depend|depended|depended|depending|अवलंबून असणे
describe|described|described|describing|वर्णन करणे
deserve|deserved|deserved|deserving|पात्र असणे
design|designed|designed|designing|रचना करणे
destroy|destroyed|destroyed|destroying|नष्ट करणे
develop|developed|developed|developing|विकसित करणे
dial|dialled|dialled|dialling|नंबर लावणे
die|died|died|dying|मरणे
dig|dug|dug|digging|खणणे
disagree|disagreed|disagreed|disagreeing|असहमत असणे
disappear|disappeared|disappeared|disappearing|गायब होणे
discover|discovered|discovered|discovering|शोध लावणे
discuss|discussed|discussed|discussing|चर्चा करणे
dislike|disliked|disliked|disliking|नापसंत करणे
dive|dived|dived|diving|सूर मारणे
divide|divided|divided|dividing|विभागणे, भाग करणे
do|did|done|doing|करणे
donate|donated|donated|donating|दान करणे
doubt|doubted|doubted|doubting|शंका घेणे
download|downloaded|downloaded|downloading|डाउनलोड करणे
drag|dragged|dragged|dragging|ओढणे, खेचणे
draw|drew|drawn|drawing|चित्र काढणे; ओढणे
dream|dreamt|dreamt|dreaming|स्वप्न पाहणे
dress|dressed|dressed|dressing|कपडे घालणे
drink|drank|drunk|drinking|पिणे
drive|drove|driven|driving|गाडी चालवणे
drop|dropped|dropped|dropping|टाकणे, पडू देणे
drown|drowned|drowned|drowning|बुडणे
dry|dried|dried|drying|वाळवणे, सुकवणे
dust|dusted|dusted|dusting|धूळ झटकणे
dwell|dwelt|dwelt|dwelling|वास्तव्य करणे
earn|earned|earned|earning|कमावणे
eat|ate|eaten|eating|खाणे
edit|edited|edited|editing|संपादन करणे
educate|educated|educated|educating|शिक्षण देणे
elect|elected|elected|electing|निवडून देणे
employ|employed|employed|employing|नोकरी देणे
empty|emptied|emptied|emptying|रिकामे करणे
encourage|encouraged|encouraged|encouraging|प्रोत्साहन देणे
end|ended|ended|ending|संपणे, संपवणे
enjoy|enjoyed|enjoyed|enjoying|आनंद घेणे
enquire|enquired|enquired|enquiring|चौकशी करणे
enter|entered|entered|entering|आत जाणे; प्रविष्ट करणे
envy|envied|envied|envying|हेवा करणे
escape|escaped|escaped|escaping|पळून जाणे, सुटका करून घेणे
estimate|estimated|estimated|estimating|अंदाज बांधणे
examine|examined|examined|examining|तपासणी करणे
exchange|exchanged|exchanged|exchanging|देवाणघेवाण करणे, बदलून घेणे
excuse|excused|excused|excusing|माफ करणे
exercise|exercised|exercised|exercising|व्यायाम करणे
exist|existed|existed|existing|अस्तित्वात असणे
expand|expanded|expanded|expanding|विस्तार करणे
expect|expected|expected|expecting|अपेक्षा करणे
explain|explained|explained|explaining|समजावून सांगणे
explore|explored|explored|exploring|फिरून शोध घेणे
export|exported|exported|exporting|निर्यात करणे
express|expressed|expressed|expressing|व्यक्त करणे
face|faced|faced|facing|सामोरे जाणे
fade|faded|faded|fading|फिका पडणे
fail|failed|failed|failing|अपयशी होणे, नापास होणे
fall|fell|fallen|falling|पडणे
fasten|fastened|fastened|fastening|बांधणे, लावणे (पट्टा)
fear|feared|feared|fearing|भीती वाटणे
feed|fed|fed|feeding|खाऊ घालणे
feel|felt|felt|feeling|जाणवणे, वाटणे
fetch|fetched|fetched|fetching|जाऊन आणणे
fight|fought|fought|fighting|भांडणे, लढणे
file|filed|filed|filing|फाईल करणे, दाखल करणे
fill|filled|filled|filling|भरणे
film|filmed|filmed|filming|चित्रीकरण करणे
find|found|found|finding|सापडणे, शोधणे
finish|finished|finished|finishing|संपवणे
fish|fished|fished|fishing|मासे पकडणे
fit|fitted|fitted|fitting|मापात बसणे
fix|fixed|fixed|fixing|दुरुस्त करणे; ठरवणे
flash|flashed|flashed|flashing|चमकणे, लुकलुकणे
flee|fled|fled|fleeing|पळून जाणे
float|floated|floated|floating|तरंगणे
flow|flowed|flowed|flowing|वाहणे
fly|flew|flown|flying|उडणे
focus|focused|focused|focusing|लक्ष केंद्रित करणे
fold|folded|folded|folding|घडी करणे
follow|followed|followed|following|मागे जाणे, पाळणे
forbid|forbade|forbidden|forbidding|मनाई करणे
force|forced|forced|forcing|जबरदस्ती करणे
forecast|forecast|forecast|forecasting|अंदाज वर्तवणे
foresee|foresaw|foreseen|foreseeing|आधीच ओळखणे
forget|forgot|forgotten|forgetting|विसरणे
forgive|forgave|forgiven|forgiving|क्षमा करणे
freeze|froze|frozen|freezing|गोठणे, गोठवणे
frighten|frightened|frightened|frightening|घाबरवणे
fry|fried|fried|frying|तळणे
gain|gained|gained|gaining|मिळवणे
gather|gathered|gathered|gathering|जमवणे, जमणे
gaze|gazed|gazed|gazing|एकटक पाहणे
get|got|got|getting|मिळणे; होणे
give|gave|given|giving|देणे
glow|glowed|glowed|glowing|चमकणे, उजळणे
glue|glued|glued|gluing|गोंदाने चिकटवणे
go|went|gone|going|जाणे
grab|grabbed|grabbed|grabbing|पटकन पकडणे
grate|grated|grated|grating|किसणे
greet|greeted|greeted|greeting|अभिवादन करणे
grin|grinned|grinned|grinning|दात दाखवून हसणे
grind|ground|ground|grinding|दळणे, वाटणे
grow|grew|grown|growing|वाढणे; पिकवणे
guarantee|guaranteed|guaranteed|guaranteeing|हमी देणे
guard|guarded|guarded|guarding|पहारा देणे
guess|guessed|guessed|guessing|अंदाज लावणे
guide|guided|guided|guiding|मार्गदर्शन करणे
handle|handled|handled|handling|हाताळणे
hang|hung|hung|hanging|टांगणे, लटकवणे
happen|happened|happened|happening|घडणे
harm|harmed|harmed|harming|इजा करणे
hate|hated|hated|hating|तिरस्कार करणे
have|had|had|having|असणे (जवळ); घेणे
heal|healed|healed|healing|बरे होणे
hear|heard|heard|hearing|ऐकू येणे
heat|heated|heated|heating|गरम करणे
help|helped|helped|helping|मदत करणे
hide|hid|hidden|hiding|लपवणे, लपणे
hire|hired|hired|hiring|भाड्याने घेणे; कामावर ठेवणे
hit|hit|hit|hitting|मारणे, आदळणे
hold|held|held|holding|धरणे
hope|hoped|hoped|hoping|आशा करणे
hug|hugged|hugged|hugging|मिठी मारणे
hum|hummed|hummed|humming|गुणगुणणे
hunt|hunted|hunted|hunting|शिकार करणे
hurry|hurried|hurried|hurrying|घाई करणे
hurt|hurt|hurt|hurting|दुखणे, दुखापत करणे
identify|identified|identified|identifying|ओळखणे
ignore|ignored|ignored|ignoring|दुर्लक्ष करणे
imagine|imagined|imagined|imagining|कल्पना करणे
import|imported|imported|importing|आयात करणे
impress|impressed|impressed|impressing|प्रभावित करणे
improve|improved|improved|improving|सुधारणे
include|included|included|including|समाविष्ट करणे
increase|increased|increased|increasing|वाढवणे
inform|informed|informed|informing|कळवणे
injure|injured|injured|injuring|जखमी करणे
insist|insisted|insisted|insisting|आग्रह धरणे
inspire|inspired|inspired|inspiring|प्रेरणा देणे
install|installed|installed|installing|बसवणे, इन्स्टॉल करणे
interrupt|interrupted|interrupted|interrupting|मध्ये बोलणे, व्यत्यय आणणे
interview|interviewed|interviewed|interviewing|मुलाखत घेणे
introduce|introduced|introduced|introducing|ओळख करून देणे
invent|invented|invented|inventing|शोध लावणे
investigate|investigated|investigated|investigating|चौकशी करणे
invite|invited|invited|inviting|आमंत्रण देणे
iron|ironed|ironed|ironing|इस्त्री करणे
irritate|irritated|irritated|irritating|चिडवणे
join|joined|joined|joining|सामील होणे; जोडणे
joke|joked|joked|joking|विनोद करणे
judge|judged|judged|judging|पारखणे, निर्णय देणे
jump|jumped|jumped|jumping|उडी मारणे
keep|kept|kept|keeping|ठेवणे
kick|kicked|kicked|kicking|लाथ मारणे
kill|killed|killed|killing|जीव घेणे
kiss|kissed|kissed|kissing|चुंबन घेणे
kneel|knelt|knelt|kneeling|गुडघे टेकणे
knit|knitted|knitted|knitting|विणणे
knock|knocked|knocked|knocking|ठोठावणे
know|knew|known|knowing|माहीत असणे
label|labelled|labelled|labelling|लेबल लावणे
lack|lacked|lacked|lacking|कमतरता असणे
land|landed|landed|landing|उतरणे (विमान)
last|lasted|lasted|lasting|टिकणे
laugh|laughed|laughed|laughing|हसणे
launch|launched|launched|launching|सुरू करणे, प्रक्षेपित करणे
lay|laid|laid|laying|ठेवणे, मांडणे
lead|led|led|leading|नेतृत्व करणे
lean|leant|leant|leaning|टेकणे, झुकणे
leap|leapt|leapt|leaping|झेप घेणे
learn|learnt|learnt|learning|शिकणे
leave|left|left|leaving|सोडणे, निघणे
lend|lent|lent|lending|उसने देणे
let|let|let|letting|करू देणे
lick|licked|licked|licking|चाटणे
lie|lay|lain|lying|आडवे पडणे, पडून राहणे
lie (tell a lie)|lied|lied|lying|खोटे बोलणे
lift|lifted|lifted|lifting|उचलणे
light|lit|lit|lighting|पेटवणे
like|liked|liked|liking|आवडणे
limit|limited|limited|limiting|मर्यादा घालणे
link|linked|linked|linking|जोडणे
listen|listened|listened|listening|ऐकणे
live|lived|lived|living|राहणे; जगणे
load|loaded|loaded|loading|भरणे (सामान)
locate|located|located|locating|जागा शोधणे
lock|locked|locked|locking|कुलूप लावणे
look|looked|looked|looking|पाहणे
lose|lost|lost|losing|हरवणे; हरणे
love|loved|loved|loving|प्रेम करणे
make|made|made|making|बनवणे
manage|managed|managed|managing|सांभाळणे, व्यवस्थापन करणे
manufacture|manufactured|manufactured|manufacturing|उत्पादन करणे
mark|marked|marked|marking|खूण करणे
marry|married|married|marrying|लग्न करणे
match|matched|matched|matching|जुळणे
matter|mattered|mattered|mattering|महत्त्वाचे असणे
mean|meant|meant|meaning|अर्थ असणे
measure|measured|measured|measuring|मोजणे, माप घेणे
meet|met|met|meeting|भेटणे
melt|melted|melted|melting|वितळणे
memorise|memorised|memorised|memorising|पाठ करणे
mend|mended|mended|mending|दुरुस्त करणे, शिवणे
mention|mentioned|mentioned|mentioning|उल्लेख करणे
milk|milked|milked|milking|दूध काढणे
mind|minded|minded|minding|हरकत असणे
mislead|misled|misled|misleading|दिशाभूल करणे
miss|missed|missed|missing|चुकणे; आठवण येणे
mistake|mistook|mistaken|mistaking|चुकून समजणे
mix|mixed|mixed|mixing|मिसळणे
mop|mopped|mopped|mopping|फरशी पुसणे
move|moved|moved|moving|हलवणे, हलणे
mow|mowed|mown|mowing|गवत कापणे
multiply|multiplied|multiplied|multiplying|गुणाकार करणे
murmur|murmured|murmured|murmuring|पुटपुटणे
nail|nailed|nailed|nailing|खिळा ठोकणे
name|named|named|naming|नाव देणे
narrate|narrated|narrated|narrating|कथन करणे
need|needed|needed|needing|गरज असणे
negotiate|negotiated|negotiated|negotiating|वाटाघाटी करणे
nod|nodded|nodded|nodding|मान डोलावणे
note|noted|noted|noting|नोंद करणे
notice|noticed|noticed|noticing|लक्षात येणे
nurse|nursed|nursed|nursing|शुश्रूषा करणे
obey|obeyed|obeyed|obeying|आज्ञा पाळणे
object|objected|objected|objecting|आक्षेप घेणे
observe|observed|observed|observing|निरीक्षण करणे
obtain|obtained|obtained|obtaining|प्राप्त करणे
occupy|occupied|occupied|occupying|व्यापणे
occur|occurred|occurred|occurring|घडणे
offer|offered|offered|offering|देऊ करणे
open|opened|opened|opening|उघडणे
operate|operated|operated|operating|चालवणे; शस्त्रक्रिया करणे
order|ordered|ordered|ordering|मागवणे; आदेश देणे
organise|organised|organised|organising|आयोजन करणे
overcome|overcame|overcome|overcoming|मात करणे
overhear|overheard|overheard|overhearing|चोरून/अचानक ऐकणे
oversleep|overslept|overslept|oversleeping|जास्त झोपणे
overtake|overtook|overtaken|overtaking|मागे टाकणे (वाहन)
owe|owed|owed|owing|देणे लागणे
own|owned|owned|owning|मालक असणे
pack|packed|packed|packing|सामान बांधणे
paint|painted|painted|painting|रंगवणे
park|parked|parked|parking|गाडी उभी करणे
pass|passed|passed|passing|पास होणे; पुढे देणे
paste|pasted|pasted|pasting|चिकटवणे
pause|paused|paused|pausing|थोडे थांबणे
pay|paid|paid|paying|पैसे देणे
pedal|pedalled|pedalled|pedalling|पेडल मारणे
peel|peeled|peeled|peeling|साल काढणे
perform|performed|performed|performing|सादर करणे
permit|permitted|permitted|permitting|परवानगी देणे
phone|phoned|phoned|phoning|फोन करणे
pick|picked|picked|picking|उचलणे, निवडणे
pinch|pinched|pinched|pinching|चिमटा काढणे
place|placed|placed|placing|ठेवणे
plan|planned|planned|planning|योजना आखणे
plant|planted|planted|planting|रोप लावणे
play|played|played|playing|खेळणे; वाजवणे
please|pleased|pleased|pleasing|खूश करणे
plug|plugged|plugged|plugging|प्लग लावणे
point|pointed|pointed|pointing|बोट दाखवणे
polish|polished|polished|polishing|चकाकी आणणे
post|posted|posted|posting|पाठवणे (टपाल); पोस्ट करणे
pour|poured|poured|pouring|ओतणे
practise|practised|practised|practising|सराव करणे
praise|praised|praised|praising|स्तुती करणे
pray|prayed|prayed|praying|प्रार्थना करणे
predict|predicted|predicted|predicting|भाकीत करणे
prefer|preferred|preferred|preferring|जास्त पसंत करणे
prepare|prepared|prepared|preparing|तयारी करणे
present|presented|presented|presenting|सादर करणे
preserve|preserved|preserved|preserving|जतन करणे
press|pressed|pressed|pressing|दाबणे
pretend|pretended|pretended|pretending|नाटक करणे, सोंग करणे
prevent|prevented|prevented|preventing|रोखणे
print|printed|printed|printing|छापणे
produce|produced|produced|producing|उत्पादन करणे
promise|promised|promised|promising|वचन देणे
pronounce|pronounced|pronounced|pronouncing|उच्चार करणे
protect|protected|protected|protecting|संरक्षण करणे
prove|proved|proved|proving|सिद्ध करणे
provide|provided|provided|providing|पुरवणे
publish|published|published|publishing|प्रकाशित करणे
pull|pulled|pulled|pulling|ओढणे
punch|punched|punched|punching|ठोसा मारणे
punish|punished|punished|punishing|शिक्षा करणे
purchase|purchased|purchased|purchasing|खरेदी करणे
push|pushed|pushed|pushing|ढकलणे
put|put|put|putting|ठेवणे
queue|queued|queued|queuing|रांगेत उभे राहणे
quit|quit|quit|quitting|सोडून देणे
race|raced|raced|racing|शर्यत लावणे
rain|rained|rained|raining|पाऊस पडणे
raise|raised|raised|raising|वर करणे; वाढवणे
reach|reached|reached|reaching|पोहोचणे
read|read|read|reading|वाचणे
realise|realised|realised|realising|लक्षात येणे
rebuild|rebuilt|rebuilt|rebuilding|पुन्हा बांधणे
receive|received|received|receiving|मिळणे, स्वीकारणे
recognise|recognised|recognised|recognising|ओळखणे
recommend|recommended|recommended|recommending|शिफारस करणे
record|recorded|recorded|recording|नोंदवणे, रेकॉर्ड करणे
reduce|reduced|reduced|reducing|कमी करणे
refer|referred|referred|referring|संदर्भ देणे
reflect|reflected|reflected|reflecting|परावर्तित करणे; विचार करणे
refuse|refused|refused|refusing|नकार देणे
register|registered|registered|registering|नोंदणी करणे
regret|regretted|regretted|regretting|पश्चात्ताप होणे
reject|rejected|rejected|rejecting|नाकारणे
relax|relaxed|relaxed|relaxing|आराम करणे
release|released|released|releasing|सोडणे; प्रदर्शित करणे
rely|relied|relied|relying|विसंबून राहणे
remain|remained|remained|remaining|राहणे, उरणे
remember|remembered|remembered|remembering|आठवणे, लक्षात ठेवणे
remind|reminded|reminded|reminding|आठवण करून देणे
remove|removed|removed|removing|काढून टाकणे
rent|rented|rented|renting|भाड्याने घेणे/देणे
repair|repaired|repaired|repairing|दुरुस्त करणे
repeat|repeated|repeated|repeating|पुन्हा म्हणणे/करणे
reply|replied|replied|replying|उत्तर देणे
report|reported|reported|reporting|कळवणे, अहवाल देणे
request|requested|requested|requesting|विनंती करणे
rescue|rescued|rescued|rescuing|वाचवणे
reserve|reserved|reserved|reserving|राखून ठेवणे
respect|respected|respected|respecting|आदर करणे
rest|rested|rested|resting|विश्रांती घेणे
retire|retired|retired|retiring|निवृत्त होणे
return|returned|returned|returning|परत येणे/देणे
reveal|revealed|revealed|revealing|उघड करणे
review|reviewed|reviewed|reviewing|आढावा घेणे
revise|revised|revised|revising|उजळणी करणे
rewrite|rewrote|rewritten|rewriting|पुन्हा लिहिणे
ride|rode|ridden|riding|सवारी करणे (सायकल, घोडा)
ring|rang|rung|ringing|वाजणे, वाजवणे
rinse|rinsed|rinsed|rinsing|खळखळून धुणे
rise|rose|risen|rising|उगवणे, वर येणे
rob|robbed|robbed|robbing|लुटणे
roll|rolled|rolled|rolling|गुंडाळणे, लोळणे
rot|rotted|rotted|rotting|कुजणे
rub|rubbed|rubbed|rubbing|घासणे, चोळणे
rule|ruled|ruled|ruling|राज्य करणे
run|ran|run|running|धावणे
rush|rushed|rushed|rushing|घाईने जाणे
sail|sailed|sailed|sailing|जहाजाने जाणे, होडी चालवणे
save|saved|saved|saving|वाचवणे; बचत करणे
say|said|said|saying|म्हणणे
scan|scanned|scanned|scanning|स्कॅन करणे
scare|scared|scared|scaring|घाबरवणे
schedule|scheduled|scheduled|scheduling|वेळ ठरवणे
scold|scolded|scolded|scolding|रागावणे
score|scored|scored|scoring|गुण मिळवणे
scratch|scratched|scratched|scratching|खाजवणे, ओरखडणे
scream|screamed|screamed|screaming|किंचाळणे
scrub|scrubbed|scrubbed|scrubbing|घासून धुणे
seal|sealed|sealed|sealing|बंद करणे, सील करणे
search|searched|searched|searching|शोधणे
see|saw|seen|seeing|पाहणे, दिसणे
seek|sought|sought|seeking|शोधणे, मागणे
seem|seemed|seemed|seeming|वाटणे, दिसणे
select|selected|selected|selecting|निवडणे
sell|sold|sold|selling|विकणे
send|sent|sent|sending|पाठवणे
separate|separated|separated|separating|वेगळे करणे
serve|served|served|serving|वाढणे (जेवण); सेवा करणे
set|set|set|setting|ठेवणे; लावणे
settle|settled|settled|settling|स्थायिक होणे; मिटवणे
sew|sewed|sewn|sewing|शिवणे
shake|shook|shaken|shaking|हलवणे
share|shared|shared|sharing|वाटून घेणे
shave|shaved|shaved|shaving|दाढी करणे
shed|shed|shed|shedding|गाळणे (पाने, अश्रू)
shine|shone|shone|shining|चमकणे
shiver|shivered|shivered|shivering|थरथर कापणे
shoot|shot|shot|shooting|गोळी मारणे; चित्रीकरण करणे
shop|shopped|shopped|shopping|खरेदी करणे
shout|shouted|shouted|shouting|ओरडणे
show|showed|shown|showing|दाखवणे
shower|showered|showered|showering|शॉवरखाली आंघोळ करणे
shrink|shrank|shrunk|shrinking|आकसणे
shut|shut|shut|shutting|बंद करणे
sigh|sighed|sighed|sighing|उसासा टाकणे
sign|signed|signed|signing|सही करणे
sing|sang|sung|singing|गाणे गाणे
sink|sank|sunk|sinking|बुडणे
sit|sat|sat|sitting|बसणे
skip|skipped|skipped|skipping|वगळणे; दोरीउड्या मारणे
slap|slapped|slapped|slapping|थप्पड मारणे
sleep|slept|slept|sleeping|झोपणे
slice|sliced|sliced|slicing|काप करणे
slide|slid|slid|sliding|घसरणे
slip|slipped|slipped|slipping|घसरणे, निसटणे
smash|smashed|smashed|smashing|फोडणे, चक्काचूर करणे
smell|smelt|smelt|smelling|वास घेणे/येणे
smile|smiled|smiled|smiling|स्मित करणे
smoke|smoked|smoked|smoking|धूम्रपान करणे
sneeze|sneezed|sneezed|sneezing|शिंकणे
snore|snored|snored|snoring|घोरणे
soak|soaked|soaked|soaking|भिजवणे
solve|solved|solved|solving|सोडवणे
sort|sorted|sorted|sorting|वर्गवारी करणे
sound|sounded|sounded|sounding|ऐकायला वाटणे
sow|sowed|sown|sowing|पेरणे
speak|spoke|spoken|speaking|बोलणे
spell|spelt|spelt|spelling|स्पेलिंग सांगणे
spend|spent|spent|spending|खर्च करणे; घालवणे
spill|spilt|spilt|spilling|सांडणे
spin|spun|spun|spinning|गरगर फिरवणे
spit|spat|spat|spitting|थुंकणे
split|split|split|splitting|फाडणे, वाटून घेणे
spoil|spoilt|spoilt|spoiling|खराब करणे
spray|sprayed|sprayed|spraying|फवारणे
spread|spread|spread|spreading|पसरवणे
sprinkle|sprinkled|sprinkled|sprinkling|शिंपडणे
squeeze|squeezed|squeezed|squeezing|पिळणे
stamp|stamped|stamped|stamping|शिक्का मारणे
stand|stood|stood|standing|उभे राहणे
stare|stared|stared|staring|टक लावून पाहणे
start|started|started|starting|सुरू करणे
starve|starved|starved|starving|उपाशी राहणे
stay|stayed|stayed|staying|राहणे, थांबणे
steal|stole|stolen|stealing|चोरी करणे
steer|steered|steered|steering|दिशा देणे (वाहन)
step|stepped|stepped|stepping|पाऊल टाकणे
stick|stuck|stuck|sticking|चिकटणे, चिकटवणे
sting|stung|stung|stinging|डंख मारणे
stir|stirred|stirred|stirring|ढवळणे
stitch|stitched|stitched|stitching|टाके घालणे
stop|stopped|stopped|stopping|थांबणे, थांबवणे
store|stored|stored|storing|साठवणे
stretch|stretched|stretched|stretching|ताणणे
strike|struck|struck|striking|आघात करणे; संप करणे
study|studied|studied|studying|अभ्यास करणे
stuff|stuffed|stuffed|stuffing|कोंबणे, भरणे
subtract|subtracted|subtracted|subtracting|वजाबाकी करणे
succeed|succeeded|succeeded|succeeding|यशस्वी होणे
suffer|suffered|suffered|suffering|त्रास सहन करणे
suggest|suggested|suggested|suggesting|सुचवणे
suit|suited|suited|suiting|शोभणे, सोयीचे असणे
supply|supplied|supplied|supplying|पुरवठा करणे
support|supported|supported|supporting|आधार देणे, पाठिंबा देणे
suppose|supposed|supposed|supposing|गृहीत धरणे
surprise|surprised|surprised|surprising|आश्चर्यचकित करणे
surround|surrounded|surrounded|surrounding|वेढणे
survive|survived|survived|surviving|जिवंत राहणे
suspect|suspected|suspected|suspecting|संशय घेणे
swallow|swallowed|swallowed|swallowing|गिळणे
swap|swapped|swapped|swapping|अदलाबदल करणे
sweat|sweated|sweated|sweating|घाम येणे
sweep|swept|swept|sweeping|झाडणे
swell|swelled|swollen|swelling|सुजणे
swim|swam|swum|swimming|पोहणे
swing|swung|swung|swinging|झोका घेणे, झुलणे
switch|switched|switched|switching|बटण चालू/बंद करणे; बदलणे
take|took|taken|taking|घेणे
talk|talked|talked|talking|बोलणे, गप्पा मारणे
tap|tapped|tapped|tapping|हलकेच ठोकणे, टॅप करणे
taste|tasted|tasted|tasting|चव घेणे
teach|taught|taught|teaching|शिकवणे
tear|tore|torn|tearing|फाडणे
tease|teased|teased|teasing|चिडवणे
tell|told|told|telling|सांगणे
test|tested|tested|testing|चाचणी घेणे
thank|thanked|thanked|thanking|आभार मानणे
think|thought|thought|thinking|विचार करणे
threaten|threatened|threatened|threatening|धमकी देणे
throw|threw|thrown|throwing|फेकणे
tick|ticked|ticked|ticking|बरोबरची खूण करणे
tidy|tidied|tidied|tidying|आवरणे, नीटनेटके करणे
tie|tied|tied|tying|बांधणे
tip|tipped|tipped|tipping|टीप देणे; कलंडणे
touch|touched|touched|touching|स्पर्श करणे
tour|toured|toured|touring|सहल करणे
trade|traded|traded|trading|व्यापार करणे
train|trained|trained|training|प्रशिक्षण देणे
transfer|transferred|transferred|transferring|हस्तांतरित करणे, बदली करणे
translate|translated|translated|translating|भाषांतर करणे
trap|trapped|trapped|trapping|अडकवणे
travel|travelled|travelled|travelling|प्रवास करणे
treat|treated|treated|treating|वागवणे; उपचार करणे
tremble|trembled|trembled|trembling|थरथरणे
trick|tricked|tricked|tricking|फसवणे
trim|trimmed|trimmed|trimming|छाटणे, कापणे
trouble|troubled|troubled|troubling|त्रास देणे
trust|trusted|trusted|trusting|विश्वास ठेवणे
try|tried|tried|trying|प्रयत्न करणे
turn|turned|turned|turning|वळणे, फिरवणे
type|typed|typed|typing|टाइप करणे
understand|understood|understood|understanding|समजणे
undo|undid|undone|undoing|उलटवणे, सोडवणे
undress|undressed|undressed|undressing|कपडे काढणे
unite|united|united|uniting|एकत्र येणे
unlock|unlocked|unlocked|unlocking|कुलूप उघडणे
unpack|unpacked|unpacked|unpacking|सामान उघडणे
update|updated|updated|updating|अद्ययावत करणे
upload|uploaded|uploaded|uploading|अपलोड करणे
upset|upset|upset|upsetting|नाराज करणे
urge|urged|urged|urging|आग्रहाने सांगणे
use|used|used|using|वापरणे
vanish|vanished|vanished|vanishing|नाहीसे होणे
visit|visited|visited|visiting|भेट देणे
vote|voted|voted|voting|मत देणे
wait|waited|waited|waiting|वाट पाहणे
wake|woke|woken|waking|उठणे, जागे होणे
walk|walked|walked|walking|चालणे
wander|wandered|wandered|wandering|भटकणे
want|wanted|wanted|wanting|हवे असणे
warm|warmed|warmed|warming|गरम करणे, ऊब देणे
warn|warned|warned|warning|इशारा देणे
wash|washed|washed|washing|धुणे
waste|wasted|wasted|wasting|वाया घालवणे
watch|watched|watched|watching|लक्ष देऊन पाहणे
water|watered|watered|watering|पाणी घालणे
wave|waved|waved|waving|हात हलवणे
wear|wore|worn|wearing|परिधान करणे, घालणे
weave|wove|woven|weaving|विणणे (कापड)
weep|wept|wept|weeping|रडणे, अश्रू ढाळणे
weigh|weighed|weighed|weighing|वजन करणे
welcome|welcomed|welcomed|welcoming|स्वागत करणे
whisper|whispered|whispered|whispering|कुजबुजणे
whistle|whistled|whistled|whistling|शिट्टी वाजवणे
win|won|won|winning|जिंकणे
wind|wound|wound|winding|गुंडाळणे; चावी देणे
wink|winked|winked|winking|डोळा मारणे
wipe|wiped|wiped|wiping|पुसणे
wish|wished|wished|wishing|शुभेच्छा देणे; इच्छा करणे
withdraw|withdrew|withdrawn|withdrawing|मागे घेणे; (पैसे) काढणे
wonder|wondered|wondered|wondering|विचारात पडणे
work|worked|worked|working|काम करणे
worry|worried|worried|worrying|काळजी करणे
worship|worshipped|worshipped|worshipping|पूजा करणे
wrap|wrapped|wrapped|wrapping|गुंडाळणे
write|wrote|written|writing|लिहिणे
yawn|yawned|yawned|yawning|जांभई देणे
yell|yelled|yelled|yelling|ओरडणे
zip|zipped|zipped|zipping|चेन लावणे
`;

const isRegular = (form: string) => /ed$/.test(form);

export const verbs: Verb[] = RAW.trim()
  .split("\n")
  .map((line) => {
    const [v1, v2, v3, ing, mr] = line.split("|").map((x) => x.trim());
    return { v1, v2, v3, ing, mr, irregular: !(isRegular(v2) && isRegular(v3)) };
  })
  .sort((a, b) => a.v1.localeCompare(b.v1, "en"));
