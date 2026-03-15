var ye=Object.defineProperty;var we=(n,e,t)=>e in n?ye(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var E=(n,e,t)=>we(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const Se=`/* constants 1 2 3 */
true: 1 ;
false: 0 ;

/* incrementors */

--: 1 - ;
++: 1 + ;
pred: dup -- ;
succ: dup ++ ;

/* shuffle words */

slip: q< eval q> ;
drop2: drop drop ;
swapd: q< swap q> ;
dupd: q< dup q> ;

dip: swap slip ; .inline /* [B] [A] dip == A [B] */
dig: swapd swap ; .inline /* c b a -> b a c */
bury: swap swapd ; .inline /* c b a -> a c b */
rot: swap swapd swap ; .inline /* c b a -> a b c */
over: dupd swap ; .inline
dup2: over over ; .inline
run: dup slip ; .inline
nip: swap drop ; .inline
tuck: swap over ; .inline
sip: over slip ; .inline       /* b [A*] -> b a* b    (aka keep) */
sipd: q< sip q> ; .inline      /* c b [A*] -> c a* c b */
bi: q< over q< eval q> q> dig q< eval q> swap ; .inline
bi2: q< q< dup2 q> eval bury q> eval ; .inline


/* inquisitive */

not: 0 = ;
zero?: 0 = ;
truthy?: zero? not ; .inline
falsey?: zero? ; .inline
!=: = not ; .inline
nz?: zero? not ; .inline
divisor?: % zero? ; .inline
even?: 2 divisor? ; .inline
odd?: even? not ; .inline

/* comparison */
<=: > not ; .inline
>=: < not ; .inline

sort2: dup2 > [ swap ] ? ; .inline
min: sort2 drop ; .inline
max: sort2 nip ; .inline
clamp: dig max min ; .inline
between?: [ sort2 ] dip swap dupd < bury < and ; .inline

/* binary operators */

bxor: dup2 ~ & rot ~ & | ;

/* logical */

and: * truthy? ;
or: + truthy? ;
nand: * zero? ;
nor: + zero? ;

/* short circuit */

or_else: q< over slip swap q> swap [ drop2 true ] [ eval ] branch ; .inline
and_also: q< over slip swap q> swap [ eval ] [ drop2 false ] branch ; .inline

/* branching */

choose: rot [ swap ] ? drop ;
branch: choose eval ;
if: slip ? ;
ifte: slipd branch ;

/* stack */

empty?: depth zero? ;
pushtop: depth 1 > [ swap q< pushtop q> ] ? ;

/* counters */

_loop: dup [ -- q< dup q< eval q> q> _loop ] ? ;
loop: _loop drop ;

times: loop drop ;
seq: swap times ;

range: dupd swap - [ succ ] seq ;
count: 0 swap ++ [ succ ] seq drop ;

/* stack reduction */
tail!: q< clr q> ;
head!: [ drop ] reduce! ;

_reduce_r: depth 3 > [ dup slip _reduce_r ] ? ;
reduce_r!: _reduce_r eval ;
foldr!: pushtop reduce_r! ;

_reduce_l: depth 3 > [ swap q< _reduce_l dup slip q> swap ] ? ;
reduce_l!: _reduce_l eval ;
foldl!: pushtop reduce_l! ;

_map: depth 2 > [ swap q< _map dup slip q> swap ] ? ;
map!: _map eval ;

_filter: depth 2 > [ swap q< _filter over over eval not [ nip ] ? q> swap ] ? ;
filter!: _filter dupd eval not [ drop ] ? ;

reduce!: depth 2 - times ;

sum!: depth 1 > [ + sum! ] ? ;
product!: depth 1 > [ * product! ] ? ;
reverse!: depth 1 > [ q< reverse! q> pushtop ] ? ;

/* math */
negitive?: 0 < ;
positive?: 0 > ;
sgn: dup positive? swap negitive? - ; .inline
abs: dup negitive? [ -1 * ] ? ; .inline
sqr: dup * ;
lg: dup 1 > [ 1 >> lg ++ ] [ drop 0 ] branch ;
!: dup [ dup -- ! * ] [ drop 1 ] branch ;
nck: dup2 - ! swap ! * [ ! ] dip / ;  /* n choose k */
divrem: [ / ] [ % ] bi2 ;

/* string printing */

space: 32 ;
newline: 10 ;

sp: space putc ;
cr: newline putc ;

_prints: dup [ q< _prints q> putc ] ? ;
prints: _prints drop ;
println: prints cr ;

ucase?: dup 'a' -- 'z' ++ dig between? ;
lcase?: dup 'A' -- 'Z' ++ dig between? ;

ucase: ucase? [ 32 - ] ? ;
lcase: lcase? [ 32 + ] ? ;`,ne=`.load ./lib/core.ff

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

100 fact .

/* 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 */`,_e=`.load ./lib/core.ff

/* FizzBuzz */
/* source https://rosettacode.org/wiki/FizzBuzz#the_unrolled_approach */

n: dup putn cr ++ ;
f: 0 'Fizz' println ++ ;
b: 0 'Buzz' println ++ ;
fb: 0 'FizzBuzz' println ++ ;
fb10: n n f n b f n n f b ;
fb15: fb10 n f n n fb ;
fb100: fb15 fb15 fb15 fb15 fb15 fb15 fb10 ;

1 fb100 drop`,ke=`.load ./lib/core.ff

bottles: dup putn 0 '\\sbottles' ;
beer: bottles '\\sof\\sbeer' ;
wall: beer '\\son\\sthe\\swall\\n' ;
take: 0 '\\nTake\\sone\\sdown,\\spass\\sit\\saround\\n' ;
verse: 
  wall prints
  beer prints
  --
  take prints
  wall prints
  cr ;
verses: verse dup [ verses ] ? ;

99 verses`,Ae=`.load ./lib/core.ff

/* Pascal's triangle */

ps: putn sp ;

line: dup 0 swap [ dup2 ++ q< q< nck ps q> q> ] seq nck ps cr ;

0 [ dup line ++ ] 16 times

`,qe=`.load ../lib/core.ff

/* http://projecteuler.net/index.php?section=problems&id=1 */

mod?: [ 3 divisor? ] [ 5 divisor? ] bi or ;

999 count [ mod? ] filter! sum! .

/* 233168 */
`,Ee=`.import ../lib/core.ff
.import ../lib/primes.ffp

/* http://projecteuler.net/index.php?section=problems&id=7 */

10001 th-prime . /* 104743 */`,Pe=`.import ./core.ff

/* Test if value is a factor of 2 or 3 */
simple-composite?: [ 2 divisor? ] [ 3 divisor? ] or_else ;

_trial_loop: dup2 [ dup * > ] [ % 0 > ] bi2 and [ next-prime _trial_loop ] ? ;
_trial_by_division: 5 _trial_loop dup * < ;

/* First 10000 primes encoded as bits (/2) */
N: 
.load ./primes-encoded.ff
; .unsafe

M: 104729 ;  /* Largest prime encoded in primes-encoded.ff */

/* Lookup prime in encoded list */
_prime-lookup: N swap 2 / >> 1 & ; .unsafe

/* invoke lookup or trial division test */
prime?: 
  dup simple-composite?
  [ [ 2 = ] [ 3 = ] or_else ]
  [ dup M <= [ _prime-lookup ] [ _trial_by_division ] branch ]
  branch
;

_count_zero_bits: dup 1 & 0 = [ swap ++ swap 1 >> _count_zero_bits ] ? ;
count_zero_bits: 0 swap _count_zero_bits drop ;

/* Find next prime using lookup */
small-next-prime: 2 + dup 1 >> N swap >> count_zero_bits 1 << + ;

_next-prime-by-trial: dup prime? not [ 2 + _next-prime-by-trial ] ? ;
next-prime-by-trial: dup 2 < [ drop 2 ] [ 1 + dup even? + _next-prime-by-trial ] branch ;

next-prime: 
  dup 2 < [ drop 2 ]
  [ dup M < [ dup even? [ -- ] ? small-next-prime ] [ next-prime-by-trial ] branch ]
  branch ;

th-prime: 0 swap [ next-prime ] swap times ;
`,Te="15587954230498627325646588036564918192892371283113935445094991167813229303466801157946860041425838177050377883594427636470648042330825646958248056319938497154431999826688737043840805602729880659310844290085378753882277650578145603728678171835725570449109280896328328689861822982929560660054103265941406156761267139671461942835818679922821671936462455671088746135509655087146313381209283613235930521010586466087050834305171746033339139141661729818224514010980145683807076410306672083872992771020698004041097147119563960296762376538348811513460297529491630379008480512975237853831759556845620569297468298637648057682426805956209412099131821818485428512436928066559243340730394365118295921672312603744868975570772494109324343564688643806957806607543988613076163976026845353826879828129067268306531527618755571428160364699324091935641404039294204507850014492057795339085260723252043906242939086157234961545144680389093664242709788465713811477638784882744821750310736295087506275177891098608232261891890910012632512316473538639064458388347287203936676809688286855489771355347459841429254796753249932586706564718749946377061258606758638803055515592582609172615435626444279986383514378601263716120490614081345356149018248909315450035477470931874779305369336369414061371307656454268095552994449296952355036652505532189829489833476045881648403172566142253245200811323827225007572600131781268385340229107428584271763096942380661599607528941790898086277497210426320862753450944106292682466223514701449479584586692675229048684815810670160683505247848007969569147267689876566645629229637734697008503610875012199525174109340822138738472417497579832043454937051507253061123531299181536794655715417641924398634073954981015583774489006907282601064189008451477242245475557929570440954069123445152152591805785010354585214282301249426753613264539709513121270426906401651483593894743909997215163041538281655333265045062671234399647557518830113800138362612748016171740070083170390862452551124027791668958390978211325530096869224634340380433424402216732891085710454868334495556279305111671006450820155230988817678130623924787097199683419440354976966408131287555861845481308157545395465714671189337766296228849500832655258055661487769172053344738271290390321220691160847057270555914072637860058013061570677093345244429286636415734462766770996018129923053392001049657486887847233073459594301355653706003643570370193774229547630176100951519998259044359125572830355431642731856464873687220364014993986008990885865091369352580702773252697185641911513369040729632430404371109473548829503914991987421431386793288059927296664906912284492798247041870013823437634851587128077350653257995122910976870687966027797005142131559914479529859507076543815517367826007585070023536769066495598914705854257045765898733478305122211925114685142610836604222325587293494723567076440479783585371010434071468899768596247192074752440898102524004057018504953131381989664198069978552568756622999232288033204414576475174043834768054809821250780720636779033642024383286312784181888335059454767102142744310094187285312055237588145163877729967403160548099958991295903076543129075054214058358230356447136713034676304030993590246553910586422639311857550918672381428448360993950673652478972763079848174304269541298047726448058428681272715488755706137056917093454193621676953712809501956418349162384771204225100011981598748522574940144124960085014421705677461243863553023456894500882469787600798252747242243891861529924092592347494299413589970418456564923791844275148850595202084630708365840981094243754152336513477496706564089895011654046047241985586439824920122473839491937563648765179716035480644476162039823074104531462312538922504480438474196821884133866733626716451323898112627208519168063826110789302720572637365135966835311592754157773903323897324899819903356458447972814506337220392055917751375094634822608072983522381700510875341573503989886316311003900038566810299083341421294683931881849155437858791067733890910641366239419850771854596290831187943701105821612990987620725385203650126794333490204761347298897685717872361739369230243716670175473609924414020402324675585702735244901098383569904378027778258496807437947921090170712755700580635274308568327268234725921967658338719300511782709352234173511875307000778836907385960834267738379631737145639561658804736921802550569264265252041012629254168970381973595567924870273198521500967940813398641282596359969590494502399436109890605882942959604518552685358329579927390117650357337396107283754643869209320333570530528130401959550768648565636992081324179305852995540936841290477367713717294997798350528665012223298059537724399587028308123593104381077604791802085510396991871199616873244989837791106946780979096596417855536982773328124316600981960606635434521548638371298226643943908408370060093943396520665374886856123004387673988644896374719704728391900071790459856957997452921277867678854626592528976166048133362358401010643386613300860836409442134635750011591058572862097035498723431967839695835863613789817405596078577461642978151491204141453003412686924490820078035652762888085357225141543839421886022247386356642480226721166084951055461264445870991536090525288776373962161984061878218583771517663562505632131555156065949835040226969022714964385526372782175602593926890601798825892668660095998741715570575999940173992460775216286058668496586381547066510877952168480182966640869151974626443492009547373469331933361820322573764525290869696324483661490246143821443280952478247540288825782217376314327938379122333697506092863640243593913570671734754773366781361715219258922811584530053105600193199652493666408256725178523865660525470202772909762911448651396333612976744809178492415037740900450862030331833820619058315361182259262259139638426750524069038775713257005718425612746907173626953766709872697328945987828783438359631765066787222866037416543852340477871961770784271493770194025200311078703565837042012151743357312827886440165282136047079518030522880521254803082737386806208141321168704537070913673741467393283984369562692001447784749543591948284756997646783969780000949081216689437074932804275463033735433935938869267379817420070672585669351222668958582315860785545033771846115867073356851387338040196746986147393520315039510865981504195880252749393613320493401017366086377424550719828590779737175428084461683068027093420694478563001522057081178725514891139712023939302864344680570956281326881356491218783224230894983872272196095659354035961886750422740443321146156856146697989184908945751383264622404173980742436922035148988963971902703487103367156740698961054265399046691863240483901418990590871231333343836291434308150645189041167200849076829127740460646207890587224694205033236248716966923583937332001988302615455355119033048041675547125549122056679887371787563920114485792807505524245560649157375005113711706385972104522379582711800559636017654267151059497697124171913604396023288344520799002969157238616035968966604468803798557259045885787986486577566922214250951451244223617571703614391508999282917490502037575619614750269031504195515621410489445061103018915810844117118558784657174422508985893587265834062169280141143108596571760594969792029446279868710443374432162696654901123971145456956773540964221589256426423740666945896438044288253014923147235319491562788666526692948102296565573801846271901076462553211607979278621834452685810061707057429858486415598099539580406268491605716581150415742503197078127210984606173768581346799316975478692710238917143222685379863759230915664143453532934128895606153481852393683983306954336939522430265405249991372680779314146400088400010301388282341339613659234248159669202485752449034382892241007209554881754005593905919975791007395184275493882145186820869642643786280731726132323900292121877540986720267024828588530024639453538464251240023923331952863139643281149433155899255807729889691252736490522761583317577843117993557273046508777912794044154842951999496390130330986926379356159676601587612682467563593889251138601112570863107623150387649243758325844645118172812695619486497609004356876039305717721093984622734310808248423612055333520700916781050443030837718434682743737915321543523492202690669191840662587082577110791646722962148646121102383292237183285457225106972812770356781715314346123861142860550106027299644140663993007092567717469147285966465742173379883739237569529049529534337857203198309922452012677454748823535877430095634593319589968890769743122625308833671116035359332063782068134726372689062847759399329138472176376655211572122376038534936825388298217783747483079284423239091369208181377826812289781155457962926632860106882217722116643634656400306888553273706709093640236457753891314071739421740126604780516806016378776015974807920422414728141729505045176335966130878306102146590186021887456646467036284667723378792148216889948890726347554313781204330490631573923106378969017795113593070576444863405480334419303350308439859940757386940087241205922717681874597041574552960750314293899215514818591746254028069598563046833413978820126681706748730045478343365958559049637863504288792918735981837526994095622981177889947682395662429691375616734522185717451300145116683137709244382322916145376226763729472409394076404138096618669806058201162183837194079818903680178787206568189199470945017773483935277983220980746090488247282616960523075294387104572736726449486708939883684104083724379450583458005387479861541519395556546195605220243126046318184219479118406406200204379026644327736143809166486673036819143955016158669861119161369067397131592762781956401203419708655899219259492187515466717940699732568260696847800855996363284685371569045754323794160342999634054132032714183531112624356015706034362645421917047034201617680530795074924765343072190929667966412254152407154842049899973878378388881269764615261461319375466364886660810844759955338424349090465227532556717346735740599618169163456637807624141135163945255917867082195959537467819513817568564516234389091956736465515899699288754129534588051250631749509651392753154914091876496243717595502957408318878186668062291929701933560308816010134501773824281821620562089751340108594644022516456855655765239827293258696476782968920735513557510457566341678551584813343727702376132209776408110895772443256505766123255677500699191442026523288238752813117281117633282073650274904434952558911418629340628085803733469767779401692194204302493641097647137595000731808880741267064790173686862097596788759684174039136299138918745858613441024352821221227434997035166183911289978267835916360163649676844229293805535048206499321639942275991261960393743212399730559406729531004966141295847908136260522846685281348472103025909990571428687338841892248202899651217567594139517183164750463746805204110423052792125987694219355885452251114180416578595807463579394065162421961342792458843460108859572677642969994350678509214966049597965415572030969844858199297033640341040739406326359552005129468048468513772278277020485495772221309734243007721749523545991448308299932119323165798724388803123136238174725741896262353961653075802651841315430676526323390763591827414343438018877826787971964430742029954010259257799056677396903275410910004717552643444268312522747847079360140219440440435821028902698470653768600336944999638240367019962066057430344733296732038460339107513061405048199002845774032679172399433936374339405600769036106675360111925747791421477781693013997194012119398114979248399813073538644939495568868077722835775802695818395153201520889804348647294298290924576339655968984466183045804817304037136179610903380562319051895522476086583770902431298024376881111952712385617242142816574964809259688660330647304589634580321007186983285113226717212148460796603878704326329440916135780196624944728700768447355825937948850821185834321576855068815722637954738497818215203841224467121414232120089750535800209995260274737626847198904311248938362034460312165263327124398962049847245661011297085368907902995340430313802714035463175460689143357004937918184009905505823315797724125131744403883122119434024416433271984429044715109244932261772185114677184480945669021325439459099424423636530988111667703574618143405528035582842502845470265202892105556534980251172117506040988974130531616968912801665732754160373370542256705797627084985269704170717031435356490647672805851305538821876914254255585952005317114523397837880934758059974751125209657233902344465152857692876614530179448722022152047878773689598919303956890600827028864292757350925883851028302242006011515198255664540842671558864450175484646217869673907523890589203344305681781581154677946205210714829991745996979113841940528492875232986908268735252669864222684646937846913893705799007535643934205340377178052864542781067054647918581643964903225283122708644259384649301432867832791732888479487604128652837833100707721019438802016530222945997553534708947132268348471692463108394452762863884317536538644123231259331286015009013257554760342270722199444997674379945409173099196371257302018493091343286728355173457011073067037593678441257951290738918942588264530321712730811155614469626932171141259079705297664871511853298123050334578641619475215851356148786113550164699694354579313801430822586271645001033249259640015646682596309090555654184182873959414618564655439933631831769887523475139304631952062285134096680210747528908907513664383873227792450539119048068211140003052611119195216150966242290069381371531417890571432830713567410044308824144900366933470616489604001174470990653479841727380580073201430034268365007584241750770251202522701279393666763355333110639455882874561185199193083946540579897856750674905983491269516241202828178186290529512244052260673692754513578834698480885769399850980724909548339370816537985211674675229040883265725262382515799654706907899826343534771411270423704303111516109979682354793032342946087380374833074254167356287665453204395601987890870877597942570920499184864405145405479124813513474505371769074860599426678308063309724611309345005017322540913962029419774257573605755008005841936647530036496205547971722223988258023244952965418336817564772415949753562425193158436137392660006482953739090145803158769709392781229972247714976547927913311276814174701878027794772021003822893706437287420327622128670397825374492485060582813275729731289189509818797013662166251883008672333586217261397898960525224656322221918235405858687062231555930343670575259625119032985281858695580375450769221242553365617170631658616368641723481136858567559192624585569880262203559443190748959013416031757176114144766202473734411202070923272922139774414462688175110831969505145913404429973730856316783191625825808539426147892268800475621402562140777451075457830244709495432562332287273807687900180428942163556777766376333559797198190013219900058905962791464237081259073639639945354281460601420064211822698462341812553263020113831701378420332851290319171435495534709600715896202627227895136028081893800871243969907039859879617887038738220485267675215975892309505127658219161421585218541870962897341969676736495620860324635670925115574604570999159842596288783300948959487370658505845144189338562497346733489225269511075345901205427942376440332347112107008048275490993527776055568378712941464590586929087349875977938382435687288990143572918143872589134729365653232732901965390506360823467213426272360661004149072799847054697354639391389186623614172141255633403738939332864712663173793298589517009224571863570936947841081083575655627528971250851159717787415141341802515229434970790540809612919260627740442858888487300142923403355679920106191894075647691611565116380460418712019353981190905244097266141449116992735991106313947918391158719165051988059068853299595660983470525006642465831675632468566019982627866361806285414094247352264958444074729725982065037738921487549531132982919985336720138957249349143458882036891437934";function Le(){var e,t,s,i,o;return!!(((s=(t=(e=globalThis.Deno)==null?void 0:e.stdout)==null?void 0:t.isTerminal)==null?void 0:s.call(t))??((o=(i=globalThis.process)==null?void 0:i.stdout)==null?void 0:o.isTTY)??!1)}function V(n,e){return Le()?`\x1B[${n}m${e}\x1B[0m`:e}function xe(n){return V(34,n)}function ze(n){return V(32,n)}function P(n){return V(36,n)}const a={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,SUB:45,PRN:46,DIV:47,RAT:92,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},x={nop:a.NOP,eval:a.CALL,";":a.DEF,":":a.MARK,clr:a.CLR,rand:a.RAND,exit:a.EXIT,".":a.PRN,putc:a.PUTC,getc:a.GETC,putn:a.PUTN,clock:a.CLOCK,drop:a.DROP,swap:a.SWAP,dup:a.DUP,"<<":a.SHIFTL,">>":a.SHIFTR,"+":a.ADD,"-":a.SUB,"*":a.MUL,"/":a.DIV,"<":a.LT,"=":a.EQ,">":a.GT,"?":a.IF,"%":a.MOD,"&":a.AND,"(":a.STASH,")":a.FETCH,"q<":a.PUSHR,"q>":a.PULLR,depth:a.DEPTH,"^":a.POW,"[":a.BRA,"]":a.KET,"|":a.OR,"~":a.NOT,"\\\\":a.RAT},M=255,Ce=n=>n,Re=n=>n,d={call:"call",push:"push"},De=6,Ie=10;function Oe(n){return n.op.toUpperCase().padEnd(De," ")}function Be(n){return(""+n.value).padEnd(Ie," ")}function Ue(n){for(const e in x)if(x[e]===n)return e;return""}function Me(n){var e,t;if(n.op===d.call||n.op===d.push&&((e=n.meta)!=null&&e.pointer))return((t=n.meta)==null?void 0:t.name)||Ue(Number(n.value))||""}function Ne(n){n.forEach(e=>{var r,c;const t=Oe(e),s=((r=Me(e))==null?void 0:r.toUpperCase())||"",i=Be(e),o=[s,((c=e.meta)==null?void 0:c.comment)||""].join(" ").trim();console.log(Ce(t),Re(i),o?`; ${o}`:"")})}function $e(n){return n=n.replace(/\\U([A-Fa-f0-9]{8})/g,(e,t)=>Z(t)),n=n.replace(/\\u([A-Fa-f0-9]{4})/g,(e,t)=>Z(t)),n.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function Z(n){let e="",t=parseInt(n,16);return t<=65535?e+=String.fromCharCode(t):t<=1114111?(t-=65536,e+=String.fromCharCode(55296|t>>10)+String.fromCharCode(56320|t&1023)):e+=`hex2Char error: Code point out of range: ${Fe(t)}`,e}function Fe(n){return(n+0).toString(16).toUpperCase()}const ie="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ae=new Map;ie.split("").forEach(function(n,e){ae.set(n,e)});const He=5n,oe=1n<<He,re=Number(oe),le=oe-1n;function We(n){return n.map(Qe).map(Ge).join("")}function je(n){return Ye(Xe(n)).map(Ze)}function Ke(n){return n>=0n?n<<1n:(-n<<1n)+1n}function Ve(n){return n&1n?-(n>>1n):n>>1n}function Qe(n){if(n===0n)return[0];n=Ke(n);const e=[];for(;n>0;){let t=Number(n&le);n>>=5n,n>0&&(t|=re),e.push(t)}return e}function Ge(n){return n.map(e=>ie[e]).join("")}function Xe(n){return n.split("").map(e=>{const t=ae.get(e);if(t===void 0)throw new Error(`${n} is not a valid base64 encoded VLQ`);return t})}function Ye(n){const e=[];let t=[];if(n.forEach(s=>{t.push(s),(s&re)===0&&(e.push(t),t=[])}),t.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function Ze(n){const e=n.reverse().reduce((t,s)=>(t<<=5n,t|=BigInt(s)&le,t),0n);return Ve(e)}const Je="/*",et="*/";function tt(n){try{let e=1n;return n=n.replaceAll("_",""),n.startsWith("-0")&&(e=-1n,n=n.replace("-","")),n.includes("e")||n.includes("E")?e*BigInt(+n):e*BigInt(n)}catch{return}}class q{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let t;for(t in x)this.symbols.set(t,BigInt(x[t]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(t=>{const s=tt(t);return s!==void 0?s:t})}static compileToBase64(e){const t=e.flatMap(s=>{if(s.op===d.call&&s.value===0n)return[];const i=s.value<<1n;return[s.op===d.push?i:i|1n]});return We(t)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let t=this.symbols.get(e);return t===void 0&&(t=this.nextCode(),this.symbols.set(e,t)),t}compileToIR(e,t=""){var f,m,b;let s=0;const i=e.length;let o="";const r=[];for(;s<i;)if(o=e[s++],typeof o=="bigint")c(o);else if(o.length>1&&o.startsWith(".")){const[h]=o.split(" ");switch(h){case".push":r[r.length-1].op=d.push;break;case".call":r[r.length-1].op=d.call;break;case".inline":(f=r[r.length-1]).meta||(f.meta={}),r[r.length-1].meta.inline=!0;break;case".unsafe":(m=r[r.length-1]).meta||(m.meta={}),r[r.length-1].meta.unsafe=!0;break;case".pointer":(b=r[r.length-1]).meta||(b.meta={}),r[r.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((v,_)=>{(this.host.log||console.log)(_,v)});break;case".words":{const v=Array.from(this.symbols,([_])=>_).join(" ");(this.host.log||console.log)(v);break}}}else if(o[0]==="'"&&o.length>1)$e(o).replace(/^'/,"").replace(/'$/,"").split("").forEach(h=>{c(h.charCodeAt(0),{comment:h})});else if(o.endsWith(":")&&o.length>1){const h=o.replace(/:$/,"");c(this.getSymbol(h),{name:`${h}`,pointer:!0}),l(a.MARK,{name:":"})}else if(o===Je){const h=[];for(;s<e.length&&(o=e[s++],o!==et);)h.push(o);l(0n,{comment:h.join(" ")})}else if(o.startsWith("[")&&o.endsWith("]")){const h=o.replace(/^\[/,"").replace(/\]$/,"");c(this.getSymbol(h),{name:h,pointer:!0})}else l(this.getSymbol(o),{name:o});return r;function c(h,v={}){r.push({value:BigInt(h),op:d.push,meta:{...v,filename:t}})}function l(h,v={}){r.push({value:BigInt(h),op:d.call,meta:{...v,filename:t}})}}validate(e){var o,r;const t=e.slice(),s=[];let i=0;for(;i<t.length;){const c=t[i];if(c.op===d.call&&c.value===BigInt(a.DEF)){let l=0;for(l=i;l>0&&!(t[l].op===d.call&&t[l].value===BigInt(a.MARK));l--);const f=t.splice(l-1,i-l+2);(r=(o=f.at(-1))==null?void 0:o.meta)!=null&&r.unsafe||s.push(...this.validateDef(f)),i=l-1}i++}return s.push(...this.validateDef(t,"main")),s}validateDef(e,t){var f,m,b;const s=[];let i=0,o=0,r=0,c=0;if(!e[0])return[];t=ze(t||((m=(f=e[0].meta)==null?void 0:f.name)==null?void 0:m.replace(/^&/,""))||"main");const l=xe(((b=e[0].meta)==null?void 0:b.filename)||"-");for(;i<e.length;){const h=e[i];h.op===d.call&&(h.op===d.call&&h.value===BigInt(a.MARK)&&o++,h.op===d.call&&h.value===BigInt(a.DEF)&&o--,h.op===d.call&&h.value===BigInt(a.BRA)&&r++,h.op===d.call&&h.value===BigInt(a.KET)&&r--,h.op===d.call&&h.value===BigInt(a.PUSHR)&&c++,h.op===d.call&&h.value===BigInt(a.PULLR)&&c--,r<0&&s.push(`${l}: Bracket ( ${P("[ ]")} ) mismatch in ${t}`),c<0&&s.push(`${l}: Queue push ( ${P("q< q>")} ) mismatch in ${t}`),o<0&&s.push(`${l}: Definition ( ${P(": ;")} ) mismatch in ${t}`)),i++}return r!==0&&s.push(`${l}: Unbalanced brackets ( ${P("[ ]")} ) in ${t}`),c!==0&&s.push(`${l}: Unbalanced queue push ( ${P("q< q>")} ) in ${t}`),o!==0&&s.push(`${l}: Unbalanced definition ( ${P(": ;")} ) in ${t}`),s}}const st=[BigInt(a.DEF),BigInt(a.KET),BigInt(a.MARK),BigInt(a.BRA)],T=0n,O=1n;class ce{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=M+1,this.traceOn=!1,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=e,this.setup()}static fromBase64(e){return je(e).flatMap(t=>{const s=t&1n,i=t>>1n;return[s,i]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const t=this.stack.length;if(t>0){this.stack[t-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(e,t){this.queue.push(e,t)}queueUnshift(e,t){this.queue.unshift(e,t)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const e=this.queue.pop()??0n;return[this.queue.pop()??0n,e]}defineSystem(e,t){const s=BigInt(t),i=this.getName(s);if(this.defs.has(s))throw new Error(`Define: cannot redefine system word "${i}"`);this.defs.set(s,e)}defineUser(e,t){const s=this.getName(t);if(t>-1&&t<M)throw new Error(`Define: cannot define system op "${s}"`);if(this.defs.has(t))throw t>-1?new Error(`Define: cannot redefine system op "${s}"`):new Error(`Define: cannot redefine user op "${s}"`);this.defs.set(t,e)}callSystem(e){var i;const t=this.defs.get(e);if(typeof t=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const o=performance.now();t();const r=performance.now(),c=this.getName(e)||Number(e);(i=this.profile)[c]||(i[c]=[0,0]),this.profile[c][0]++,this.profile[c][1]!=0,this.profile[c][1]+=r-o;return}return t()}const s=this.getName(e)||e;throw new Error(`Call: undefined system op "${s}"`)}callUser(e){var i;const t=this.defs.get(e);if(Array.isArray(t)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...t),this.profileOn){const o=this.getName(e,`&${e}`);(i=this.profile)[o]||(i[o]=[0,void 0]),this.profile[o][0]++}return}const s=this.getName(e)||e;throw new Error(`Call: undefined user op "${s}"`)}callOp(e){return e>-1n&&e<M?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){var s,i;let t=0;for(;t<e.length;){const o=e[t++];if(o.op===d.call){if(o.value===0n)continue;(s=o.meta)!=null&&s.name&&!this.symbols.has(o.value)&&this.symbols.set(o.value,(i=o.meta)==null?void 0:i.name),this.queuePush(O,o.value)}else this.queuePush(T,o.value)}return this.stack}run(){const e=this.queue;let t=!1;for(;e.length>0;){const[s,i]=this.queueShift(),o=s===O;t=!this.depth||o&&st.includes(i),this.traceOn&&this.trace(s,i,t),o?t?this.callOp(i):(this.push(s),this.push(i)):(t||this.push(s),this.push(i)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,e.length/2))}return this.stack}trace(e,t,s){let i=e===O?this.getName(t):String(t);s&&(i=`*${i}*`);const o=this.stack.map(String).join(" "),r=this.queue.map(String).join(" ");console.log(`[ ${o} ] ${i} [ ${r.slice(0,10)}...`)}getName(e,t=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(t)}print(){const e=this.stack.map(t=>t.toString(this.base)).join(" ");console.log(`[ ${e} ]`)}loadSourceMap(e){Object.keys(e.symbols).forEach(t=>{this.symbols.set(BigInt(t),e.symbols[t])})}setup(){const e=new TextEncoder;let t;for(t in x)this.symbols.set(BigInt(x[t]),t);this.defineSystem(()=>{},a.NOP),this.defineSystem(()=>{const s=this.pop();this.callOp(s)},a.CALL),this.defineSystem(()=>{this.depth--;const[,s]=this.queuePop(),i=this.stack.splice(Number(s||0))||[];this.defineUser(i,this.pop())},a.DEF),this.defineSystem(()=>{this.depth--;const[,s]=this.queuePop(),i=this.stack.splice(Number(s||0))||[],o=BigInt(this.nextAnonOp++);this.defineUser(i,o),this.depth>0&&this.push(0n),this.push(o)},a.KET),this.defineSystem(()=>{this.depth++;const s=this.stack.length;this.queuePush(T,BigInt(s))},a.BRA),this.defineSystem(()=>{this.depth++;const s=this.stack.length;this.queuePush(T,BigInt(s))},a.MARK),this.defineSystem(()=>this.clear(),a.CLR),this.defineSystem(()=>{const s=this.pop();this.platform.exit(Number(s))},a.EXIT),this.defineSystem(()=>{const s=this.pop();this.push(nt(s))},a.RAND),this.defineSystem(()=>{this.print()},a.PRN),this.defineSystem(()=>{const s=this.pop(),i=this.pop();console.log(Number(i)/Number(s))},a.RAT),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},a.CLOCK),this.defineSystem(()=>{const s=e.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(s)},a.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const s=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(s??0))},a.GETC),this.defineSystem(()=>{const s=e.encode(this.pop().toString(this.base));this.platform.io.write(s)},a.PUTN),this.defineSystem(()=>{this.pop()},a.DROP),this.defineSystem(()=>{const s=this.peek(),i=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=s,this.poke(i)},a.SWAP),this.defineSystem(()=>{this.push(this.peek())},a.DUP),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]+=s},a.ADD),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]-=s},a.SUB),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]*=s},a.MUL),this.defineSystem(()=>{const s=this.pop();if(s===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=s},a.DIV),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]%=s},a.MOD),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]<<=s},a.SHIFTL),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]>>=s},a.SHIFTR),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]&=s},a.AND),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]**=s},a.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},a.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},a.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},a.GT),this.defineSystem(()=>{const s=this.pop();this.pop()!==0n&&this.queueUnshift(O,s)},a.IF),this.defineSystem(()=>{this.queuePush(T,this.pop())},a.PUSHR),this.defineSystem(()=>{const[,s]=this.queuePop();this.push(s)},a.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},a.DEPTH),this.defineSystem(()=>{const s=this.stack.length;this.stack.splice(0,s).forEach(o=>this.queuePush(T,o)),this.queuePush(T,BigInt(s))},a.STASH),this.defineSystem(()=>{const[,s]=this.queuePop(),i=Number(s),o=[];for(let r=0;r<i;r++){const[,c]=this.queuePop();o.unshift(c)}this.stack.unshift(...o)},a.FETCH),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]|=s},a.OR),this.defineSystem(()=>{const s=this.pop();this.push(~s)},a.NOT)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(i=>{const o=this.profile[i][0],r=this.profile[i][1];return{name:i,calls:o,time:r,system:typeof r<"u","ops/ms":r?Math.round(o/r):""}}).sort((i,o)=>o.calls-i.calls),t=e.filter(i=>i.system),s=e.filter(i=>!i.system);console.table(t,["name","calls","ops/ms"]),console.table(s,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function nt(n){const e=n,t=e.toString().length;let s="";for(;s.length<t;)s+=Math.random().toString().split(".")[1];s=s.slice(0,t);const i="1"+"0".repeat(t);return e*BigInt(s)/BigInt(i)}const B=BigInt(a.DEF),J=BigInt(a.KET),U=BigInt(a.MARK),ee=BigInt(a.BRA),u=n=>(n=BigInt(n),e=>e.op===d.call&&e.value===n),L=n=>(n=BigInt(n),e=>e.op===d.push&&e.value===n),y=n=>n.op===d.push,te=n=>n.op===d.push&&n.value!==0n,it=[{name:"No operation",pattern:[u(a.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[u(a.SWAP),u(a.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[u(a.DUP),u(a.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[u(a.PUSHR),u(a.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[u(a.CLOCK),u(a.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[u(a.RAND),u(a.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[u(a.DEPTH),u(a.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[u(a.NOT),u(a.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[y,u(a.CALL)],replacement:n=>{var e,t;return[{op:d.call,value:n.value,meta:{name:(t=(e=n.meta)==null?void 0:e.name)==null?void 0:t.replace(/^&/,"")}}]}},{name:"Null Sequence - n DROP",pattern:[y,u(a.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[y,y,u(a.ADD)],replacement:(n,e)=>[{op:d.push,value:n.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[L(0),u(a.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[u(a.SWAP),u(a.ADD)],replacement:(n,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[y,y,u(a.SUB)],replacement:(n,e)=>[{op:d.push,value:n.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[L(0),u(a.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[y,y,u(a.MUL)],replacement:(n,e)=>[{op:d.push,value:n.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[L(1),u(a.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[u(a.SWAP),u(a.MUL)],replacement:(n,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[y,te,u(a.DIV)],replacement:(n,e)=>[{op:d.push,value:n.value/e.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[L(1),u(a.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[y,u(a.DUP)],replacement:n=>[n,n]},{name:"Unreachable Code - 0 &b IF",pattern:[L(0),y,u(a.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[te,y,u(a.IF)],replacement:(n,e,t)=>{var s,i;return[{op:d.call,value:e.value,meta:{name:(i=(s=e.meta)==null?void 0:s.name)==null?void 0:i.replace(/^&/,"")}}]}},{name:"Null Sequence - 0 eval",pattern:[L(0),u(a.CALL)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - n [ ]",pattern:[y,u(a.BRA),u(a.KET)],replacement:()=>[{op:d.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[y,u(a.PUSHR),y,u(a.PULLR)],replacement:(n,e,t)=>[t,n]}];class at{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=M+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let t;do t=this.optimized.length,this.optLoop();while((this.optimized.length<t||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){var s;let t=0;for(;t<e.length;){const i=e[t];if(i.op===d.call){if(i.value===J){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,i.meta??(i.meta={}),(s=i.meta).uid??(s.uid=this.nextAnonOp++);let o=t;for(;o-- >0;){const f=e[o];if(f.op===d.call&&f.value===ee)break}const r=BigInt(i.meta.uid),c={op:d.push,value:r,meta:{pointer:!0}},l=e.slice(o,t+1);l.unshift(c),l[1]={...l[1],value:U,meta:{...l[1].meta,name:":"}},l[l.length-1]={...l[l.length-1],value:B,meta:{...l[l.length-1].meta,name:";"}},this.defs.set(r,l)}else if(i.value===B){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let o=t;for(;o-- >0;){const l=e[o];if(l.op===d.call&&l.value===U)break}const r=e[o-1];r.meta||(r.meta={}),r.meta.pointer=!0;const c=e.slice(o-1,t+1);this.defs.set(r.value,c)}}t++}return e}pullDefs(e,t=!1){var o;const s=e.slice();let i=0;for(;i<s.length;){const r=s[i];if(r.op===d.call){if(r.value===J){r.meta??(r.meta={}),(o=r.meta).uid??(o.uid=this.nextAnonOp++);const c=i;for(;i-- >0;){const b=s[i];if(b.op===d.call&&b.value===ee)break}const l=BigInt(r.meta.uid),f={op:d.push,value:l,meta:{pointer:!0}},m=s.splice(i,c-i+1,f);m.unshift(f),m[1]={...m[1],value:U,meta:{...m[1].meta,name:":"}},m[m.length-1]={...m[m.length-1],value:B,meta:{...m[m.length-1].meta,name:";"}},this.defs.set(l,m)}else if(r.value===B&&!t){const c=i;for(;i-- >0;){const m=s[i];if(m.op===d.call&&m.value===U)break}const l=s[i-1];l.meta||(l.meta={}),l.meta.pointer=!0;const f=s.splice(i-1,c-i+2);i=i-2,this.defs.set(f[0].value,f)}}i++}return s}peepholeOptimization(e){const t=e.slice();for(;;){const s=this.stats.peephole_optimizations;let i=0;for(;i<t.length;){for(const o of it){const{pattern:r,replacement:c}=o;if(r.every((f,m)=>f(t[i+m]))){this.stats.peephole_optimizations++;const f=t.slice(i,i+r.length);t.splice(i,r.length,...c(...f)),i=Math.max(0,i-r.length-1);break}}i++}if(this.stats.peephole_optimizations>=s)break}return t}inlineWords(e,t=1,s=[]){return e.flatMap(i=>{var o,r,c,l;if((o=i.meta)!=null&&o.unsafe)return i;if(i.op===d.call&&this.defs.has(i.value)){if(s.includes(i.value))return i;const f=this.defs.get(i.value);if(!f)return i;const m=f[f.length-1];if((r=m.meta)!=null&&r.unsafe)return i;if((c=m.meta)!=null&&c.inline||(l=i.meta)!=null&&l.inline)return this.stats.inlined_calls++,this.inlineWords(f.slice(2,-1),1/0,s.concat(i.value));if(f.length<=t+3)return this.stats.inlined_calls++,this.inlineWords(f.slice(2,-1),t,s.concat(i.value))}return i})}addReferencedWords(e){return e.slice().forEach(t=>{var s;t.op===d.push&&((s=t.meta)!=null&&s.pointer)?this.addDef(t.value):t.op===d.call&&this.addDef(t.value)}),e}addDef(e){if(!this.calledWords.has(e)){const t=this.defs.get(e);if(t)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...t),this.addReferencedWords(t)}}}class z{constructor(e,t){this.imported=new Set,this.host=e,this.engine=t.engine,this.compiler=t.compiler||new q}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,t="-"){return e.map(s=>{if(s.length>1&&s[0]==="."){const[i,...o]=s.split(" ");if(i[0]==="."&&i.length>1){switch(i){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const r=this.findFile(o.join(" "),t),c=this.host.readTextFile(r);return this.preprocess(z.tokenize(c),r)}case".import":{const r=this.findFile(o.join(" "),t);if(!this.imported.has(r)){this.imported.add(r);const c=this.host.readTextFile(r);return this.preprocess(z.tokenize(c),r)}return""}case".m":{const r=this.compiler.compileToIR(q.tokenize(o.join(" ")));this.engine.loadIR(r),this.engine.run();const c=this.engine.getStack();return this.engine.clear(),c.map(String).join(" ")+` /* ${s} */`}}return""}}return s}).join(`
`)}findFile(e,t="-"){if(t&&t!=="-"&&!this.host.path.isAbsolute(e)){const s=this.host.path.dirname(t),i=this.host.path.resolve(s,e);if(this.host.fileExists(i))return i}if(this.host.fileExists(e))return e;throw'File not found: "'+e+'"'}}function N(n){const e=n.startsWith("/"),t=n.split("/").filter(Boolean),s=[];for(const i of t)if(i!=="."){if(i===".."){s.pop();continue}s.push(i)}return`${e?"/":""}${s.join("/")}`||(e?"/":".")}function ot(n){const e=N(n),t=e.lastIndexOf("/");return t<=0?e.startsWith("/")?"/":".":e.slice(0,t)}function rt(...n){const e=n.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return N(e)}function pe(n){return{readTextFile(e){const t=N(e),s=n[t];if(typeof s!="string")throw new Error(`Virtual file not found: ${t}`);return s},fileExists(e){return typeof n[N(e)]=="string"},path:{isAbsolute(e){return e.startsWith("/")},dirname:ot,resolve:rt}}}function de(n={}){const e=new TextDecoder,t=new TextEncoder,s=Array.from(t.encode(n.stdin??""));return{io:{write(i){var o;(o=n.onWrite)==null||o.call(n,e.decode(i))},readByte(){return s.shift()??null}},exit(i){var o;(o=n.onExit)==null||o.call(n,i)},now(){return Date.now()}}}const ue={"/examples/fact.ffp":ne,"/examples/fizzbuzz.ffp":_e,"/examples/99bottles.ffp":ke,"/examples/pascal.ffp":Ae,"/examples/euler1.ffp":qe,"/examples/euler7.ffp":Ee},se=ne,j="b64.";function k(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function lt(n){const e=new TextEncoder().encode(n);let t="";for(const s of e)t+=String.fromCharCode(s);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function ct(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),s=atob(t),i=Uint8Array.from(s,o=>o.charCodeAt(0));return new TextDecoder().decode(i)}function pt(n){return`${j}${lt(n)}`}function dt(n){if(n===null||!n.startsWith(j))return null;const e=n.slice(j.length);try{return ct(e)}catch{return null}}function he(n,e="/main.ffp"){return{[e]:n,"/lib/core.ff":Se,"/lib/primes.ffp":Pe,"/lib/primes-encoded.ff":Te,...ue}}function K(n,e){const t=console.log;console.log=(...s)=>{n(s.map(String).join(" "))};try{return e()}finally{console.log=t}}function ut(n,e,t){let s="";const i=[];let o=0;const r=de({stdin:e,onWrite(b){s+=b},onExit(b){o=b}}),c=new q,l=new ce(r),f=he(n),m=new z(pe(f),{engine:l,compiler:c});return K(b=>i.push(b),()=>{const b=m.preprocess(z.tokenize(n),"/main.ffp"),h=performance.now();let v=c.compileToIR(q.tokenize(b),"/main.ffp");const _=performance.now(),$=c.validate(v);t&&(v=new at().optimize(v));const C=[];K(D=>C.push(D),()=>{Ne(v)}),l.loadIR(v);const A=performance.now();l.run();const R=performance.now();return{output:s,preprocessed:b,ir:C.join(`
`),bytecode:q.compileToBase64(v),issues:$,stack:l.getStack().map(String),logs:i,exitCode:o,compileMs:_-h,executeMs:R-A}})}class ht{constructor(){E(this,"compiler");E(this,"engine");E(this,"preprocessor");E(this,"files");E(this,"output","");this.reset()}reset(){this.output="",this.files=he("","/repl.ffp");const e=de({onWrite:t=>{this.output+=t}});this.compiler=new q,this.engine=new ce(e),this.preprocessor=new z(pe(this.files),{engine:this.engine,compiler:this.compiler}),this.execute(".load /lib/core.ff")}execute(e){const t=e.trim(),s=[];return t?t===".reset"?(this.reset(),{output:"Session reset. Core library reloaded.",clearTranscript:!0,logs:s,stack:this.engine.getStack().map(String)}):t===".clear"?{output:"Transcript cleared.",clearTranscript:!0,logs:s,stack:this.engine.getStack().map(String)}:t===".exit"||t===".quit"?{output:"Browser REPL sessions stay open. Use .reset to clear state.",logs:s,stack:this.engine.getStack().map(String)}:(this.files["/repl.ffp"]=e,this.output="",K(i=>s.push(i),()=>{try{const i=this.preprocessor.preprocess([e],"/repl.ffp"),o=this.compiler.compileToIR(q.tokenize(i),"/repl.ffp");return this.engine.loadIR(o),this.engine.run(),{output:this.output,logs:s,stack:this.engine.getStack().map(String)}}catch(i){return{output:this.output,logs:s,stack:this.engine.getStack().map(String),error:i instanceof Error?i.message:String(i)}}})):{output:"",logs:s,stack:this.engine.getStack().map(String)}}}const ft=`
  <div class="help-grid">
    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Overview</p>
          <h2>What F-flat-minor is</h2>
        </div>
      </div>
      <div class="help-copy">
        <p>F-flat-minor is a tiny stack-oriented language built around one value type: big integers.</p>
        <p>Programs manipulate a data stack, a queue used during execution, and a vocabulary of built-in and user-defined words.</p>
        <p>The shared TypeScript core in this repo preprocesses source, compiles it to IR and bytecode, and executes the result.</p>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Execution</p>
          <h2>Core model</h2>
        </div>
      </div>
      <div class="help-copy">
        <ul class="help-list">
          <li>Numbers are pushed onto the stack.</li>
          <li>Non-numeric tokens are treated as words and executed.</li>
          <li>The language compiles to base64 VLQ encoded big integers.</li>
          <li>Pointers to words are also just integers, so code and data share the same stack.</li>
        </ul>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Syntax</p>
          <h2>Language details</h2>
        </div>
      </div>
      <div class="help-copy">
        <dl class="help-defs">
          <dt>Numbers</dt>
          <dd><code>42</code>, <code>-3</code>, and other integers are pushed directly.</dd>
          <dt>Words</dt>
          <dd><code>dup</code>, <code>swap</code>, <code>+</code>, <code>putc</code>, and user definitions execute when encountered.</dd>
          <dt>Definitions</dt>
          <dd><code>fact: dup 1 - [ dup 1 - fact * ] ? ;</code> defines a new word.</dd>
          <dt>Quotes</dt>
          <dd><code>[ dup * ]</code> creates an unnamed word and leaves its pointer on the stack.</dd>
          <dt>Pointers</dt>
          <dd><code>[+]</code> pushes a pointer to a word instead of calling it.</dd>
          <dt>Strings</dt>
          <dd><code>'Hello\\sWorld!\\n'</code> expands to character codes on the stack.</dd>
        </dl>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Preprocessor</p>
          <h2>Supported directives</h2>
        </div>
      </div>
      <div class="help-copy">
        <ul class="help-list">
          <li><code>.load path</code>: inline another file every time it appears.</li>
          <li><code>.import path</code>: inline a file once per preprocessor session.</li>
          <li><code>.m ...</code>: evaluate a compile-time macro and splice the resulting stack values into the source.</li>
          <li><code>.exit</code>: request termination from the host.</li>
        </ul>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Useful words</p>
          <h2>Common vocabulary</h2>
        </div>
      </div>
      <div class="help-copy">
        <div class="word-grid">
          <code>dup</code><span>duplicate the top stack item</span>
          <code>swap</code><span>swap the top two items</span>
          <code>drop</code><span>discard the top item</span>
          <code>+</code><span>add the top two values</span>
          <code>*</code><span>multiply the top two values</span>
          <code>?</code><span>conditional execution</span>
          <code>:</code> <span>begin a definition</span>
          <code>;</code> <span>end a definition</span>
          <code>putc</code><span>print a character</span>
          <code>putn</code><span>print a number in the current base</span>
          <code>.</code><span>print the stack to the console/log channel</span>
        </div>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Examples</p>
          <h2>Try these</h2>
        </div>
      </div>
      <div class="help-copy">
        <pre class="code-block help-code">0 'Hello\\sWorld!\\n' prints

fact: dup 1 - [ dup 1 - fact * ] ? ;
20 fact putn 10 putc

[ dup * ] 12 swap eval putn</pre>
      </div>
    </section>
  </div>
`;function mt(n){n.innerHTML=`
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">f-flat-minor / web</p>
        <h1>Run F-flat-minor in the browser.</h1>
        <p class="lede">
          Playground, REPL, and language help powered by the shared TypeScript core.
        </p>
        <p class="hero-links">
          <a
            class="repo-link"
            href="https://github.com/Hypercubed/f-flat-minor"
            target="_blank"
            rel="noreferrer"
          >View the GitHub repository</a>
        </p>
      </section>

      <nav class="mode-tabs" aria-label="Application modes">
        <button class="mode-tab is-active" data-tab="playground">Playground</button>
        <button class="mode-tab" data-tab="repl">REPL</button>
        <button class="mode-tab" data-tab="help">Help</button>
      </nav>

      <section class="tab-panel is-active" data-panel="playground">
        <section class="workspace">
          <div class="panel editor-panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">Editor</p>
                <h2>Main source</h2>
              </div>
            </div>
            <textarea id="source" spellcheck="false"></textarea>
            <div class="controls">
              <label class="field">
                <span>Example</span>
                <select id="example">
                <option value="/examples/fact.ffp">fact.ffp</option>
                <option value="/examples/fizzbuzz.ffp">fizzbuzz.ffp</option>
                <option value="/examples/99bottles.ffp">99bottles.ffp</option>
                <option value="/examples/pascal.ffp">pascal.ffp</option>
                <option value="/examples/euler1.ffp">euler1.ffp</option>
                <option value="/examples/euler7.ffp">euler7.ffp</option>
              </select>
              </label>
              <label class="field">
                <span>stdin</span>
                <input id="stdin" type="text" placeholder="Optional input for getc" />
              </label>
              <div class="actions">
                <button id="run" class="primary">Run Program</button>
              </div>
            </div>
          </div>

          <div class="results">
            <div class="panel summary-panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Status</p>
                  <h2>Run summary</h2>
                </div>
              </div>
              <div id="summary" class="summary-grid"></div>
            </div>

            <div class="panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Inspect</p>
                  <h2>Program details</h2>
                </div>
              </div>
              <div class="subtabs" aria-label="Program details">
                <button class="subtab is-active" data-detail-tab="output">Output</button>
                <button class="subtab" data-detail-tab="preprocessed">Expanded Source</button>
                <button class="subtab" data-detail-tab="ir">IR</button>
                <button class="subtab" data-detail-tab="bytecode">Bytecode</button>
              </div>
              <div id="detail-tools" class="detail-tools" hidden>
                <label class="toggle">
                  <input id="optimize" type="checkbox" checked />
                  <span>Optimize</span>
                </label>
              </div>
              <div class="detail-panels">
                <pre id="output" class="console detail-panel is-active" data-detail-panel="output"></pre>
                <pre id="error" class="console detail-panel is-active" data-detail-panel="output"></pre>
                <pre id="preprocessed" class="code-block detail-panel" data-detail-panel="preprocessed"></pre>
                <pre id="ir" class="code-block detail-panel" data-detail-panel="ir"></pre>
                <pre id="bytecode" class="code-block detail-panel" data-detail-panel="bytecode"></pre>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section class="tab-panel" data-panel="repl">
        <section class="workspace repl-workspace">
          <div class="panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">REPL</p>
                <h2>Persistent session</h2>
              </div>
            </div>
            <div class="help-copy">
              <p>The REPL keeps your definitions and stack between lines. It preloads <code>/lib/core.ff</code>.</p>
              <p>Special commands: <code>.reset</code>, <code>.clear</code>, <code>.exit</code>, <code>.quit</code>.</p>
            </div>
            <div class="controls repl-controls">
              <label class="field repl-field">
                <span>Line</span>
                <input id="repl-input" type="text" placeholder="Try: 2 3 + putn 10 putc" />
              </label>
              <div class="actions">
                <button id="repl-reset" class="ghost">Reset Session</button>
                <button id="repl-run" class="primary">Run Line</button>
              </div>
            </div>
          </div>

          <div class="results">
            <div class="panel summary-panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">State</p>
                  <h2>Current stack</h2>
                </div>
              </div>
              <div id="repl-stack" class="summary-grid"></div>
            </div>

            <div class="panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Transcript</p>
                  <h2>REPL output</h2>
                </div>
              </div>
              <pre id="repl-output" class="console"></pre>
            </div>
          </div>
        </section>
      </section>

      <section class="tab-panel" data-panel="help">
        ${ft}
      </section>
    </main>
  `;const e=n.querySelector("#source"),t=n.querySelector("#stdin"),s=n.querySelector("#optimize"),i=n.querySelector("#example"),o=n.querySelector("#run"),r=n.querySelector("#summary"),c=n.querySelector("#output"),l=n.querySelector("#error"),f=n.querySelector("#preprocessed"),m=n.querySelector("#ir"),b=n.querySelector("#bytecode"),h=Array.from(n.querySelectorAll(".mode-tab")),v=Array.from(n.querySelectorAll(".tab-panel")),_=Array.from(n.querySelectorAll(".subtab")),$=Array.from(n.querySelectorAll(".detail-panel")),C=n.querySelector("#detail-tools"),A=n.querySelector("#repl-input"),R=n.querySelector("#repl-run"),D=n.querySelector("#repl-reset"),Q=n.querySelector("#repl-output"),G=n.querySelector("#repl-stack");if(!e||!t||!s||!i||!o||!r||!c||!l||!f||!m||!b||!C||!A||!R||!D||!Q||!G)throw new Error("App failed to mount");const me=new URLSearchParams(window.location.search),ge=dt(me.get("code"));e.value=ge??se;function F(){const p=new URLSearchParams(window.location.search);e.value?p.set("code",pt(e.value)):p.delete("code");const g=p.toString(),w=`${window.location.pathname}${g?`?${g}`:""}${window.location.hash}`;window.history.replaceState(window.history.state,"",w)}function be(p){h.forEach(g=>{const w=g.dataset.tab===p;g.classList.toggle("is-active",w)}),v.forEach(g=>{const w=g.dataset.panel===p;g.classList.toggle("is-active",w)})}h.forEach(p=>{p.addEventListener("click",()=>{be(p.dataset.tab??"playground")})});function ve(p){_.forEach(g=>{const w=g.dataset.detailTab===p;g.classList.toggle("is-active",w)}),$.forEach(g=>{const w=g.dataset.detailPanel===p;g.classList.toggle("is-active",w)}),C.hidden=!(p==="ir"||p==="bytecode")}_.forEach(p=>{p.addEventListener("click",()=>{ve(p.dataset.detailTab??"output")})});async function I(){document.body.dataset.ready="false";try{const p=ut(e.value,t.value,s.checked),g=p.issues.length,w=[p.output?p.output.trimEnd():"(no stdout)",g?`

${g} compiler issue(s):
${p.issues.join(`
`)}`:"",p.logs.length?`

console log:
${p.logs.join(`
`)}`:""].join("");r.innerHTML=`
        <article class="summary-card">
          <span class="summary-k">compile</span>
          <strong>${p.compileMs.toFixed(2)} ms</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">execute</span>
          <strong>${p.executeMs.toFixed(2)} ms</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">stack</span>
          <strong>${p.stack.length?k(p.stack.join(" ")):"(empty)"}</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">exit</span>
          <strong>${p.exitCode}</strong>
        </article>
      `,c.innerHTML=k(w),l.textContent="",f.innerHTML=k(p.preprocessed),m.innerHTML=k(p.ir),b.innerHTML=k(p.bytecode)}catch(p){const g=p instanceof Error?p.message:String(p);r.innerHTML=`
        <article class="summary-card">
          <span class="summary-k">status</span>
          <strong>run failed</strong>
        </article>
      `,c.innerHTML="",l.innerHTML=k(g),f.innerHTML="",m.innerHTML="",b.innerHTML=""}finally{document.body.dataset.ready="true"}}const X=new ht,S=["Core library loaded. Try defining words, evaluating quotes, or printing values."];function H(p){G.innerHTML=`
      <article class="summary-card">
        <span class="summary-k">depth</span>
        <strong>${p.length}</strong>
      </article>
      <article class="summary-card">
        <span class="summary-k">stack</span>
        <strong>${p.length?k(p.join(" ")):"(empty)"}</strong>
      </article>
    `}function W(){Q.innerHTML=k(S.join(`

`))}function Y(){const p=A.value,g=X.execute(p);g.clearTranscript&&S.splice(0,S.length),S.push(`ff> ${p}`),g.output.trim()&&S.push(g.output.trimEnd()),g.logs.length&&S.push(g.logs.join(`
`)),g.error&&S.push(`Error: ${g.error}`),S.push(`[ ${g.stack.join(" ")} ]`),H(g.stack),W(),A.value="",A.focus()}i.addEventListener("change",()=>{e.value=ue[i.value]??se,F(),I()}),o.addEventListener("click",()=>{F(),I()}),s.addEventListener("change",()=>{F(),I()}),R.addEventListener("click",Y),D.addEventListener("click",()=>{X.reset(),S.splice(0,S.length,"Session reset. Core library reloaded."),H([]),W()}),A.addEventListener("keydown",p=>{p.key==="Enter"&&(p.preventDefault(),Y())}),I(),H([]),W()}const fe=document.querySelector("#app");if(!fe)throw new Error("Missing #app root");mt(fe);
