var alert_debugmode = "";
var adsg_dbgmsg=" \nVersion 2.2012.02.15\n mit xml support(15.2.2012)"; //  debug html debug on ist platzhalter/keine technische relevanz
debout("1603");

// zwischenloesung fuer nugg.ad and adprobe 
var adsg_inf={
  major:2,
  minor:2,
  file:"js_ng_chip_0300.js",
  path:"http://i.tfag.de/js.ng/",
  modified:{
    year:2012,
    month:3,
    day:2
    },
  client:{
    swf:0,
    swfminv:4,
    swfmaxv:12,
    cw:1011
    },
  config:{
    istslot:1,
    fifurl:"fif.html",
    wunderloop:false,
    nuggad:false,
    adprobe:{
     ap:true,  // AdProbe on/off
     pg:false,  // Procter&Gamble on/off
     as:true  // AudienceSience on/off
    },
    adlabel:"content",
    fif:true,
    pap:false,
    konsoledebug:false,
    video:false,
    companiondelay:1
  }
};

var adsg_companiondelay=1,adsg_locusr=1,adsg_dwcache="";
// Wunderloop Cookie auslesen
var adsg_wlswitch=false;
var js_wlrcmd = ""; 
adsg_tfr2="";
var wlrcmd ="kw=";
var ord=Math.random()*10000000000000000;
var adsg_istsession=[-1,1,0,1,0,1,0,0,0,0];  
var adso_response={"conf":{
 'default':['adj',  'js'],
 'pfxml':  ['pfadx','url'],
 'xml':    ['adx','url'],
 'pfjs':   ['pfadj','js'],
 'html':   ['adi','iframe'],
 'htmlurl':['adi','url'],
 'js':     ['adj',  'js'],
 'jsurl':  ['adj',  'url'],
 'none':['none','none']
 }  } 

// wlcacheread
wlrcmd=adsf_cookie("adcc_wl");
if(wlrcmd==""){wlrcmd="kw=";}/*bugfix wlrkw 080520*/
js_wlrcmd=wlrcmd+",";
var adsg_wrlcache=wlrcmd;


// NuggAd Werte vorbesetzen
var n_pbt="";
var n_default="test";
var nugg_id="718543823";


/* kookirkor */

/*cookiekeyword weil trad. methode nich geht, siehe forum*/
var adsg_ckwtemp=adsf_cookie("adcc_ckw");
if(typeof adsg_ckwtemp=="string"&&adsg_ckwtemp.length>3){
adsc_keyword=adsc_keyword+","+adsg_ckwtemp;} 



// 4. Juli 2008 neue AdAlert Infos
adsa_tempdt=new Date();adsa_temptm=adsa_tempdt.getTime();if(!window.adsg_adids){var adsg_adids=[];}adsg_adids[adsg_adids.length]=["0000000","0000000","000000000","00000000",adsa_temptm,"00 Adengine"];


// muss esrt noch gesetzt werden, weil es als Parameter bei der flash-videoplayer Uebergabe verwendet wird 
var ng_bh_str="CO=1;TE=1;";


var adsc_wunderloop = "chip/sonstiges";
var ad_channel = "/sonstiges";
var ad_subchannel = "";


var adsg_nsiteloc=document.location.href;
var adsg_toplocation=top.location.href;


var tiletype="tile"; //für ptile variante
var adsc_tile=0; //tilenummer: wird inkrementiert
var adsc_adid1=0,adsc_adid2=0,adsc_adid4=0,adsc_adid6=0,adsc_adid12=0,adsc_adid8=0; //für die adids

adsg_katprozent = new Array(); //  das array für die prozentwerte der einzelnen slots
adsg_size = new Array(); //  für die slotgrössen und für dart adids

adsg_dbginit="0"; // dbginit ist dbg eingeschaltet wenn nein schreib layer und dbginit=2
var adsg_debug="",adsc_debug=""; //  debug status --on/onv ab2.0 nur noch on wegen fehlender trace styles in dfp


var adsg_site="chip"; //----->id der site
var adsg_icpsite="20"; //----->nummer der site


// Session Cookie für Besucherzaeler
var c_now = new Date();  // aktuelles Datum
var c_path = "/";        // Pfad für Cookies

var adsg_locusr=1;


var otp_typ=0;   // Wert wird im PopUp gesetzt, 1=kein PopUpBlocker, 2=PopUp-Blocker, 3=kein PopUp-Blocker aber Frequency Cap
var c_otp_typ=0; // Wert wird aus Cookie ausgelesen


// User Counter
if(document.cookie && document.cookie.indexOf("adsg_locusr") > -1) { adsg_locusr=holeKeks("adsg_locusr"); } else {adsg_locusr=0;}
adsg_locusr=parseInt(adsg_locusr)+1; 

if(document.cookie && document.cookie.indexOf("otp_typ") > -1)
{
	c_otp_typ=holeKeks("otp_typ");

	if(c_otp_typ==3) {c_otp_typ=1}
	if(c_otp_typ==4) {c_otp_typ=1}
	if(c_otp_typ==5) {c_otp_typ=2}

}

// Schreibt mit Zeitverzögerung die Cookie-Werten, damit aus den Anzeigen die Variable otp_typ gelesen werden kann
setTimeout('setzeKeks();',2000);   // Cookie Werte zeitverzögert setzen, damit Variable aus dem PopUp-Fenster abgefragt werden kann.


var dcopt_ist="dcopt=ist;";
var category="!c=bl_chip;";
var adsc_cat="";



var dcopt_ist="dcopt=ist;",adsc_cat="none;";

var dcopt_ist="";
var c_otp="!c=otp;"; 
var adsc_cat="itp;"; 
if(adsg_locusr&&adsg_locusr<=adsg_istsession.length&&adsg_istsession[adsg_locusr]==1){ /*otp slot anmachen*/
dcopt_ist="dcopt=ist;";c_otp="!c=itp;";adsc_cat="otp;"; 
} 


debout("\n adsg_locusr=" + adsg_locusr + " - " + dcopt_ist + " - Ausschlusskategorie: " + category + " \n\n");
 
// test ob alle Variable gesetzt ist
if(window.adsc_agof){}else {adsc_agof="10177"};
if(window.adsc_ressort){}else {adsc_ressort="sonstiges"};
if(window.adsc_rubrik){}else {adsc_rubrik="sonstiges"};
if(window.adsc_rubrik_int){}else {adsc_rubrik_int="36143"};
if(window.adsc_keyword){}else {adsc_keyword=""};
if(window.adsc_sw){}else {adsc_sw="none"};
if(window.adsc_layout){}else {adsc_layout="none"};

if(window.adsc_contentwidth){}else {adsc_contentwidth="833"};     // x Startposition für Einfärbungen
if(window.adsc_skyscraperposx){}else {adsc_skyscraperposx="833"}; // x Startposition für SkyScraper
if(window.adsc_bannerposx){}else {adsc_bannerposx="0"}; // früheste Startposition (horizontal) für Bannerleiste
if(window.adsc_bannerposy){}else {adsc_bannerposy="0"}; //Startposition (vertikal) für Bannerleiste
if(window.adsc_bannerheight){}else {adsc_bannerheight="90"}; // Hoehe der Bannerleiste
if(window.adsc_bgc_typ){}else {adsc_bgc_typ="color_hex";};        // Hintergrundfarbe für body setzen oder color_hex oder img_url

/*keyword String zusammen bauen*/
var adsc_kw_string = "";
if(adsc_sw!="none"){adsc_kw_string = adsc_kw_string +";sw=" + adsc_sw;}


// Keyword für Rubriken 2006.04_04 Klcso
for (i = 0; i <= 12; i++) {adsc_rubrik=adsc_rubrik.replace('__', '_');}
adsc_rub=adsc_rubrik;
for (i = 0; i <= 12; i++) {adsc_rub=adsc_rub.replace('_', ',');}


adsc_rub=adsc_rubrik.toLowerCase();
adsc_rub=adsc_rub.replace('chip_', '');
adsc_rub=adsc_rub.replace('die_', '');
adsc_rub=adsc_rub.replace('mit_', '');
adsc_rub=adsc_rub.replace('notebooks', 'notebook');
adsc_rub=adsc_rub.replace('handys', 'handy');
adsc_rub=adsc_rub.replace('e_mail', 'email');
adsc_rub=adsc_rub.replace('w_lan', 'wlan');
adsc_rub=adsc_rub.replace('pdas', 'pda');
adsc_rub=adsc_rub.replace('_und_', '_');
adsc_rub=adsc_rub.replace('pc_hardware', 'pchardware');

for (i = 0; i <= 3; i++) {adsc_rub=adsc_rub.replace(',_', '_');}
for (i = 0; i <= 6; i++) {adsc_rub=adsc_rub.replace('__', '_');}

var adsc_location=( ! document.location ? 'nourl' : document.location.href);
adsc_location=adsc_location.replace('http://', '/');
adsc_location=adsc_location.replace('&', '/'); 
adsc_location=adsc_location.replace('?', '/');  //reinigt die url hängt - an, um target page von directory zu trennen


var adsc_document_uri = adsc_location + "///";
var adsg_level = adsc_document_uri.split("/"); /*als array flexibler*/


var adsc_dartsite="";
var adsc_zone= "_" +adsc_rub;

if(adsc_rubrik_int=="1") { adsc_dartsite=adsc_rub; adsc_zone="_frontpage";}; // 


// 28. Januar 2008 Klcso Relaunch nicht mehr verwendet
if(adsc_ressort=="9234")     {ad_channel="/special";}; // Special
if(adsc_ressort=="22985")    {ad_channel="/foto";}; // Foto
if(adsc_ressort=="19501")    {ad_channel="/handy";}; // Handy
if(adsc_ressort=="30715355") {ad_channel="/download_de/content";}; // download.de - Content
if(adsc_ressort=="15355")    {ad_channel="/download_de/homepage";}; // download.de - Homepage
if(adsc_ressort=="24072")    {ad_channel="/hardware";}; // Hardware

// Klcso 31.01.2008 neues Mapping fuer Relaunch mit sprechenden Zonennamen

switch (adsc_ressort)
{
  case "1":     ad_channel="/homepage"; break;
  case "27633": adsc_zone=""; ad_channel="/bildergalerien"; break;
  case "26784": adsc_zone=""; ad_channel="/preisvergleich"; var dcopt_ist=""; var c_otp="!c=otp;"; var adsc_cat="off;"; break;
  case "33656": ad_channel="/sicherheit"; break;
  case "19506": ad_channel="/dsl_internet"; adsc_dartsite="dsl_internet"; break;
  case "30593": adsc_dartsite="videos"; ad_channel="/videos"; break;
  case "33105": ad_channel="/archiv"; break;
  case "9231":  adsc_dartsite="community_forum"; adsc_zone= ""; ad_channel="/foren"; break;
  case "21453": adsc_ressort="9231"; adsc_dartsite="community_forum"; adsc_zone= ""; ad_channel="/foren"; break;
  case "20385": adsc_dartsite="suchergebnisse"; adsc_zone= ""; ad_channel="/suche"; break;
  case "27634": adsc_dartsite="bildergalerie_exitpage"; adsc_zone= ""; ad_channel="/bildergalerien"; break;
  case "blogs": adsc_dartsite="community_blogs"; adsc_zone= ""; ad_channel="/blogs"; break;
  case "antivir": adsc_dartsite="antivir"; adsc_zone= "_" + adsc_rubrik; ad_channel="/antivir"; category = category + "!c=bl_antivir"; break;
  case "9227":
    ad_channel="/test_kaufberatung"; adsc_dartsite="test_kaufberatung";
    switch (adsc_rubrik_int)
    {
      case "36143": adsc_ressort="9227"; adsc_zone="_frontpage"; ad_subchannel=""; break; // Home Entertainment
      case "39535": adsc_ressort="39535"; ad_subchannel=""; break; // Home Entertainment
      case "39536": adsc_ressort="39536"; ad_subchannel=""; break; // PC-Hardware
      case "9228": adsc_ressort="9228"; ad_subchannel=""; break; // Spiele
      case "21013": adsc_ressort="21013"; ad_subchannel=""; break; // Software
      case "43746": adsc_ressort="43746"; ad_subchannel=""; break; // Digitalkameras
      case "43744": adsc_ressort="43744"; ad_subchannel=""; break; // Home Entertainment
      case "43748": adsc_ressort="43748"; ad_subchannel=""; break; // Camcorder
      case "20827": adsc_ressort="20827"; ad_subchannel=""; break; // Navigation
      case "64445": adsc_ressort="64445"; ad_subchannel=""; break; // Tablet-PC
      case "43741": adsc_ressort="43741"; ad_subchannel=""; break; // Brenner & Festplatte
      case "43736": adsc_ressort="43736"; ad_subchannel=""; break; // Drucker & Scaner
      case "14945": adsc_ressort="14945"; ad_subchannel=""; break; // TFT-Display
      case "14933": adsc_ressort="14933"; ad_subchannel=""; break; // Notebook
      case "14948": adsc_ressort="14948"; ad_subchannel=""; break; // MP3-Playeer
      case "44199": adsc_ressort="44199"; ad_subchannel=""; break; // Business Hard- & Software
      default: ad_subchannel=""; break; // Default Wert
    }
  break;
  case "9226": adsc_dartsite="news"; ad_channel="/news";
    switch (adsc_rubrik_int)
    {
      case "1": adsc_zone="_frontpage"; ad_subchannel=""; break; // News Frontpage
      case "9240": adsc_ressort="9240"; ad_subchannel=""; break; // News  Business
     }
  break;
  case "9229": adsc_dartsite="tipps_tools"; ad_channel="/tips_tricks";
    switch (adsc_rubrik_int)
    {
      case "9229": if(adsc_rub=="tipps_tools"){ adsc_dartsite="tipps_tools"; adsc_zone = "_frontpage"; ad_subchannel="";}; break; // Tipps&Tools Frontpage
      case "26113": adsc_ressort="26113"; ad_subchannel=""; break; // Tipps&Tools Sicherheit
     }
  break;
  case "9232": adsc_dartsite="downloads"; ad_channel="/downloads";
    switch (adsc_rubrik_int)
    {
      case "26113": adsc_ressort="26113"; ad_subchannel=""; break; // Downloads
     }
  break;
  case "36143": ad_channel="/sonstiges"; break;

  case "52023": adsc_dartsite="handy-welt-news"; adsc_zone = ""; ad_channel="/handy"; ad_subchannel="";
    switch (adsc_rubrik_int)
    {
      case "1":     adsc_ressort="handy_index"; adsc_dartsite="handy-welt-frotpage"; break; // Indexseite
      case "52054": adsc_ressort="handy_tests"; adsc_dartsite="handy-welt-tests"; break; // Tests
      case "52053": adsc_ressort="handy_news"; adsc_dartsite="handy-welt-news"; break; // News
      case "52055": adsc_ressort="handy_tipps_tools"; adsc_dartsite="handy-welt-tipps-tools"; break; // Tipps&Tools
      case "52052": adsc_ressort="handy_tarife"; adsc_dartsite="handy-welt-tarife"; break; // Tarife
      case "52056": adsc_ressort="handy_downloads"; adsc_dartsite="handy-welt-ownloads"; break; // Downloads
     }
  break;
  
  case "54913": adsc_dartsite="business"; adsc_zone = ""; ad_channel="/business"; ad_subchannel=""; adsc_ressort="business";
    switch (adsc_rubrik_int)
    {
      case "1":     adsc_ressort="business"; adsc_rubrik="frontpage"; adsc_zone="_frontpage"; break;
      case "54914": adsc_ressort="business"; adsc_rubrik="news"; adsc_zone="_news"; break;
      case "54915": adsc_ressort="business"; adsc_rubrik="hardware"; adsc_zone="_hardware"; break;
      case "54916": adsc_ressort="business"; adsc_rubrik="mittelstand"; adsc_zone="_mittelstand"; break;
      case "54917": adsc_ressort="business"; adsc_rubrik="admin"; adsc_zone="_admin"; break;
     }
  break;
  
  case "9234": adsc_ressort="business"; adsc_dartsite="business"; adsc_zone = "_blog" ; ad_channel="/business"; ad_subchannel="";  break;
  case "37899": adsc_ressort="business"; adsc_dartsite="business"; adsc_zone = "_blog"; ad_channel="/business"; ad_subchannel="";  break;
  
    case "43706": adsc_dartsite="bestenlisten"; adsc_zone = "_sonstiges"; ad_channel="/bestenlisten"; ad_subchannel=""; adsc_ressort="bestenlisten";
    switch (adsc_rubrik_int)
    {
      case "1":     adsc_ressort="bestenlisten"; adsc_rubrik="frontpage"; adsc_zone="_frontpage"; break; // Indexseite
     }
  break;
  
  default:
    adsc_ressort="sonstiges"; adsc_zone= adsc_ressort + "_" + adsc_rubrik + "_" + adsc_rubrik_int;
  break;
}

// Handy-Welt



adsc_wunderloop = "chip"+ ad_channel + ad_subchannel;


n_default=adsc_wunderloop;  // Wunderloop Profil an NuggAd uebergeben


if(ad_channel!="" && adsg_wlswitch==true){
adsf_setpix('http://tr.sales.tfag.de/Cnt/tofo/CP/'+adsc_wunderloop+'?d='+Math.random()*10000000000);
}


 
var now = new Date();
var ng_day = now.getDay(); // 0=SON 1=MON 2=DIE 3=MIT 4=DON 5=FRE 6=SAM
var ng_hour = now.getHours(); // Stunde
var ng_minute = now.getMinutes(); // Minuten
var ng_cache = ng_day + "_" + ng_hour;


//globale prozentwerte (werden von kleineren werten in adsc_gettag überschrieben)
adsg_katprozent[1]=100; //banner
adsg_katprozent[2]=100; //contentad 300x250
adsg_katprozent[3]=100; //contentbox
adsg_katprozent[4]=1;  //popup entfällt (interstitial)
adsg_katprozent[5]=100; //neu OTP   
adsg_katprozent[6]=100; //skyscraper
adsg_katprozent[7]=100; //content Ad 2
adsg_katprozent[9]=100; //Content Ad 3 
adsg_katprozent[10]=100;
adsg_katprozent[11]=100;
adsg_katprozent[12]=100; //Content Ad 3
       
adsg_katprozent[13]=100; /*itp 5x5 pf*/
adsg_katprozent[14]=100; /*preroll*/
adsg_katprozent[15]=100; /*midroll*/
adsg_katprozent[16]=100; /*postroll*/
adsg_katprozent[17]=100; /*videolayer*/

// Klcso 2004.02-09 um mehrere werte für sz und adsize setzen zu können
 
adsg_size=["",dcopt_ist,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
adsg_katval=["00","BANNER","CONTENTAD","CONTENTBOX","POPUP","OTP","SKYSCRAPER","CONTENTAD2","TEXTAD","CONTENTAD3","10","11","COUNT","ITP","PREROLL","MIDROLL","POSTROLL","VIDEOLAYER","18","19","20","21","22","23","24","25","26"];    
adsg_size_slot=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; /*zahlt pro adtype hoch*/
adsg_tagsizeoverride=[0,1,2,3,4,5,'1x2',7,8,9,10,11,12,13,'4x5;dcmt=text/xml','4x6;dcmt=text/xml','4x7;dcmt=text/xml','4x8;dcmt=text/xml',18,19,20,21,22,23,24,25,26,27,28]; /* wenn fur einen slottyp wie video eine adgroesse erzwungen werden soll als string sonst zahl */



var adsg_params=(window.location.search);
adsg_debugmode=adsc_getParams(adsg_params,'jsdbug','&');  

// alert debug mode Klcso 2006.03.23
alert_debugmode=adsc_getParams(adsg_params,'jsalert','&');  

//test debugon  -- bitte entfernen, nur für lokalen test
//adsg_debugmode="on";

if (adsg_debugmode){adsg_debug=adsg_debugmode;}
debout("page_debug= "+adsg_debugmode);      

var adsg_adkeyword=adsc_getParams(adsg_params,'adkeyword','&');
if (adsg_adkeyword){adsc_keyword=adsg_adkeyword;}

var adsg_adkeyword2=adsc_getParams(adsg_params,'showroom','&');//showroom
if (adsg_adkeyword2){adsc_keyword=adsg_adkeyword2;}//showroom

var adsc_isegm="",adsa_isegm="";

debout(adsc_location);
var adsc_transid=(Math.round(Math.random()*9999999));
//hier wird die zufalls-transaction-ord-id für den seitenaufruf hergestellt  

var adsc_percval=(Math.round(Math.random()*100));
//zufallszahl fuer prozentuale auslieferungssteuerung in katprozent

function ads_writetag(adsc_type,adsc_width,adsc_height,adsc_perc){ 
document.write(ads_gettag(adsc_type,adsc_width,adsc_height,adsc_perc));
}


function ads_gettag(adsc_type,adsc_width,adsc_height,adsc_perc,adsc_responsetype,adsc_tagparams){ 
var adsc_type,adsc_width,adsc_height,adsc_perc,adsc_responsetype,adsc_tagparams,adsg_newtags="",temp=""; 
if(adsc_responsetype){}else{adsc_responsetype='default';}
if((adsf_gtAdTyp(adsc_type)==1)&&adsc_cat!="off;"&&adsg_size_slot[adsf_gtAdTyp(adsc_type)]==0){  /*mk wenns der erste banner ist und itp noch nicht war?*/
if(adsc_cat=="otp;"&&dcopt_ist!=""){     
adsg_newtags=ads_maketag("OTP","1","1","100",'js');  
}
if(adsc_cat=="itp;"&&dcopt_ist==""){   
var adsg_newtags=ads_maketag("ITP","5","5","100",'pfjs');
}
if(!window.adsg_companiondelay||adsg_companiondelay==0){
adsg_newtags=adsg_newtags+ads_maketag(adsc_type,adsc_width,adsc_height,adsc_perc,adsc_responsetype);
}else{
temp=adsg_newtags;	
adsg_newtags="\n<script>\n";
adsg_newtags=adsg_newtags+"function adsz_companionslot(){adsg_size[1]=\"dcopt=ist;\";document.write(ads_maketag(\""+adsc_type+"\",\""+adsc_width+"\",\""+adsc_height+"\",\""+adsc_perc+"\",\""+adsc_responsetype+"\"));adsg_size[1]=\"\";}";
adsg_newtags=adsg_newtags+"\n</script>\n"+temp;	/*wenn cat nicht off interstitial an*/
}
return adsg_newtags;
}else{   
return ads_maketag(adsc_type,adsc_width,adsc_height,adsc_perc,adsc_responsetype);
}}     
     
function ads_maketag(adsc_type,adsc_width,adsc_height,adsc_perc,adsc_responsetype,adsc_tagparams){   
var temptid="ad_"+adsc_tile+Math.floor(Math.random()*9999);

var adsc_type,adsc_width,adsc_height,adsc_perc,adsc_responsetype,adsc_tagparams;
if(adsc_type==10||adsc_type==13) {adsc_responsetype="pfjs";} /* Video Ad (4x4) mk:und alle prefetch js, kann weg*/
debout("responseconf:"+adso_response.conf[adsc_responsetype]+"-"+adsc_responsetype); 
adsc_tile++;     
adsc_type=adsf_gtAdTyp(adsc_type); 
adsg_size_slot[adsc_type]++;   /*inc ss*/
ad_size=adsg_size[adsc_type];   
adsc_dartsize=adsg_size[adsc_type];   
if (adsc_perc>=adsg_katprozent[adsc_type]){ 
adsc_perc=adsg_katprozent[adsc_type];  
}         
adsc_tagout="<!--nix-->";  /*der nix-kommentar wird bei chip z.b. erwartet  !immer noch?*/ 
debout("Schreibe Tag:"+adsc_type+"-"+adsc_width+"-"+adsc_height+"-"+adsc_perc+"  \n\r IDS: 1:"+adsc_adid1+" 2:"+adsc_adid2+" 4:"+adsc_adid4+"6:"+adsc_adid6);
if (adsc_keyword!=""){adsc_isegm=adsc_isegm+""+adsc_keyword;debout("page_keyword= "+adsc_keyword+" gefunden");adsc_keyword="";}
if (adsa_isegm!="") {
if (adsa_isegm=="flashlayer"){adsc_isegm=adsc_isegm+"!c=flashlayer";}else{adsc_isegm=adsc_isegm+""+adsa_isegm;}
debout("isegment "+adsa_isegm+" gefunden");adsa_isegm="";
}   
if (adsc_type==6){adsc_width=1;adsc_height=2;} //raus in konfig ? 
adsc_isegm=adsc_isegm.replace('kw=', '');
adsc_adformat= "sz=" + adsc_width + "x" + adsc_height; 
if(typeof(adsg_tagsizeoverride[adsc_type])=="string"){
adsc_adformat="sz="+adsg_tagsizeoverride[adsc_type]; /*originalgroesse muss noch in den request uebertragen werden*/
}

//alle sonderfälle für adsizes etc


var adsg_asdomain="http://ad.de.doubleclick.net/";

var adsc_darturl_str=adsg_site+"_"+adsc_ressort+"/"+adsc_dartsite+adsc_zone+";site="+adsg_site+";res="+adsc_ressort+";rub="+adsc_rubrik+";"+adsc_adformat+";tagid="+temptid+";ss="+adsg_size_slot[adsc_type]+";"+adsg_size[adsc_type]+"cat="+adsc_cat+category+tofo_adprode_cids+";lay="+adsc_layout+";"+js_wlrcmd+adsc_isegm+";"+n_pbt+";chip_usr="+adsg_locusr+";otp_typ="+c_otp_typ+";tile="+adsc_tile+adsc_kw_string+";tp="+adsc_location+";ord="; 

/*url*/
var adsg_respconfig=adso_response.conf[adsc_responsetype];
adsc_darturl=adsg_asdomain+adsg_respconfig[0]+"/"+adsc_darturl_str+adsc_transid+"?";
debout("---->da:"+adsg_respconfig[0]);

/*interface fuer galerielayouts */
if(adsc_layout=="Diashow" || adsc_layout=="Galerie")
{
if (adsc_type==1) {adsc_darturl_banner_top=adsg_asdomain+"adi/"+adsc_darturl_str;}
if (adsc_type==2) {adsc_darturl_contentad1=adsg_asdomain+"adi/"+adsc_darturl_str;}
if (adsc_type==3) {adsc_darturl_contentbox=adsg_asdomain+"adi/"+adsc_darturl_str;}
if (adsc_type==6) {adsc_darturl_skyscraper=adsg_asdomain+"adi/"+adsc_darturl_str;}
if (adsc_type==7) {adsc_darturl_contentad2=adsg_asdomain+"adi/"+adsc_darturl_str;}
if (adsc_type==9) {adsc_darturl_contentad3=adsg_asdomain+"adi/"+adsc_darturl_str;}
}

switch(adsg_respconfig[1]){
case 'js':
  adsc_tagout="<sc"+"ript language='javascript' id='"+temptid+"' src='"+adsc_darturl+"'></sc"+"ript>"; 
  break;    
case 'iframe':
   adsc_tagout='<iframe src="'+adsc_darturl+'" width="'+adsc_width+'" height="'+adsc_height+'" marginheight="0" marginwidth="0" hspace="0" vspace="0" frameborder="0" noresize scrolling="no"></iframe>';
  break;
case 'url':
  adsc_tagout=adsc_darturl;
  break;     
case 'none':
  adsc_tagout="";
  break;
default:
  adsc_tagout="<sc"+"ript language='javascript' id='ad' src='"+adsc_darturl+"'></sc"+"ript>";
}
if (adsc_type==4){
debout("kein popup");adsc_tagout="<!--ist-->"; 
}
debout(adsc_darturl);  
return adsc_tagout;
}


function adsc_getParams(adsc_scringo,adsc_sname,adsc_splitter){
adsc_scringo_split = adsc_scringo.split(adsc_splitter);
for (var i=0;i<adsc_scringo_split.length;i++) {
var adsc_part_of_split = adsc_scringo_split[i];
var adsc_find_name = adsc_part_of_split.indexOf(adsc_sname);
if (adsc_find_name!=-1) {
var adsc_equal = adsc_part_of_split.indexOf("=") + 1;
var adsc_value_of_split = adsc_part_of_split.substring(adsc_equal,adsc_part_of_split.length);
return adsc_value_of_split; 
}}}

function debout(dbgval){
adsg_dbgmsg=adsg_dbgmsg+dbgval+"\n";
if (adsg_debug=="on"){
window.status="TrueAffinity2=" + adsc_wunderloop;
if (adsg_dbginit==0){
adsg_dbginit=2;
document.write('<div id=jsdebug style="position:absolute; top:1px; left:1000px;  text-align:left; font-family:Fixedsys,Courier;"><textarea id=jssdebug cols=80 rows=100></textarea></div>');
}
document.getElementById("jssdebug").value=adsg_dbgmsg;
}}


function adsf_ckwtemp(v){var v;adsf_cookie("adcc_ckw",v.replace(/\W/g,""),1,"/");}



function holeKeks(name){
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}


function setzeKeks(){
if(otp_typ==1 || otp_typ==2){ } else { otp_typ=c_otp_typ; }
if(otp_typ==1) {adsg_dbgmsg=adsg_dbgmsg+" \n Kein PopUP-Blocker! \n";}
if(otp_typ==2) {adsg_dbgmsg=adsg_dbgmsg+" \n PopUp-Blocker! \n";}
if(otp_typ==3) {otp_typ=1}
if(otp_typ==4) {otp_typ=1}
if(otp_typ==5) {otp_typ=2}
c1_name="adsg_locusr";
c2_name="otp_typ";
c1_wert=adsg_locusr;
c2_wert=otp_typ;
c1_expires = new Date(c_now.getTime() +1000*60*60*1);      // 1 Stunden
c2_expires = new Date(c_now.getTime() +1000*60*60*24*30);  // 30 Tage
document.cookie = c1_name+'='+c1_wert+'; path='+c_path+'; expires='+c1_expires.toGMTString()+';';
document.cookie = c2_name+'='+c2_wert+'; path='+c_path+'; expires='+c2_expires.toGMTString()+';';
if (alert_debugmode){alert(adsg_dbgmsg);}
}

// frequencyTyp bestimmt Art der Frequenzsteuerung
// 1 = Zeitsteuerung in Minuten
// 2 = nach Anzahl der aufgerufenen Videos  
var frequencyType = 2; 
// Value bei 1 in Minuten, bei 2 nach Anzahl der abgespielten Videos
var frequencyValue = 1;
// generelle on-off funktion 1=on, 0=off
var AdspotsOn  = 1;

function videomafo(vmdat){  //+ video mafo
var vmdat; 
var vmrand=Math.round(Math.random()*654646);
var vmdarr=vmdat.split("|");
var vmimgurl="http://php.sales.tfag.de/test/mf/phpmf/mf_05_1b_filter3exa.php?url=keine&cnt="+vmdarr[0]+"&trs=1&cid="+vmdarr[1]+"&dbg=0&cmd=0&rand="+vmrand+"&spotid=none;";
var vmspotimgurl="http://ad.de.doubleclick.net/activity;src=1011930;type="+vmdarr[3]+";cat="+vmdarr[4]+";ord="+vmrand+"?";
if(vmdarr.length==5){
var vmimg=new Image();
vmimg.src=vmimgurl;
if(vmdarr[3]&&vmdarr[4]&&(vmdarr[2]==1||vmdarr[2]==3)){
var vmspimg=new Image();
vmspimg.src=vmspotimgurl; 
}}}


/* geschrumpft, weiss noch nicht ob getparams 100% ident ergebnisse liefert */ 
//function adsc_getParams(str,nam,spl){var str,nam,spl,t,tt="";str=str.split(spl);for(var i=0; i<str.length;i++){t=str[i].split("=");if(t[0]&& t[1] && t[0]==nam){tt=t[1];}}return tt;}

function adsf_gtAdTyp(a){var a;if (a && String(a) == String(parseInt(String(a)))) return parseInt(String(a));for (var i=0;i<adsg_katval.length;i++){if(adsg_katval[i]==a.toUpperCase())return i;}return '0';}
function adsf_setpix(tloc){var tloc,wlpix,ppt; 
   if(!window.adsa_pixArr){window.adsa_pixArr=[];} 
   if(tloc&&tloc.indexOf("http://")==0){ 
      ppt=adsa_pixArr.length; 
      adsa_pixArr[ppt]=new Image();adsa_pixArr[ppt].src=tloc; 
      } 
   } /*url*/



function adsf_wlread(){      /* wl_read header */  
var a,b;    
a=document.createElement("script"); 
a.type="text/javascript";   
a.src="http://rc.sales.tfag.de/Get/tofo/JS/GetRcmd.js?d="+Math.round(Math.random()*654654); 
var b=document.getElementsByTagName("head"); 
if(b[0]&&(b[0].readyState=="complete"||b[0].readyState==undefined)){
b[0].appendChild(a); 
window.setTimeout(adsf_wlwait,500);
}else{
}} 
function adsf_wlwait(){
if(wlrcmd==adsg_wrlcache){
}else{        
if(wlrcmd.length>3){
adsf_cookie("adcc_wl",wlrcmd,30,"/"); 
}}}  

function adsf_sessionreset(){adsg_locusr=1;setzeKeks();}
function adsf_cookie(na,va,du,pa){ /* write:name,wert,tage,pfad, read:name  */
var na,va,du,pa,dur,dut; 
if(arguments.length==4){  
if(du&&parseInt(du)>0){
dur=new Date();dut=dur.getTime()+du*86400000;dur.setTime(dut);dur=dur.toGMTString();
document.cookie=na+"="+escape(va)+"; expires="+dur+"; path="+pa+";";}
}else{
dur="";
if(na && na.length>3){ 
var va=document.cookie.split(';');
for(var i=0;i<va.length;i++){ 
if(va[i].indexOf(na+"=")!=-1){
dut=va[i].split("=");
dur=unescape(dut[1]);
}}} 
return dur;
}}       
if (adsg_wlswitch==true){/* wltimer */
window.setTimeout(adsf_wlread,9000);
} 
function adsf_addcache(w){if(w=="-1"){document.write(adsg_dwcache);adsg_dwcache="";}else{adsg_dwcache+=w;}} 
adsf_addcache("-1");/*alle document writes*/


(function(){
  var nuggsid=nugg_id;
  var nuggtg=encodeURIComponent(n_default);
  var nuggrid=encodeURIComponent(top.location.href) || 0;
  document.write('<scr'+'ipt type="text/javascript" src="http://tofo.nuggad.net/rc?nuggn=575796532&nuggsid='+nuggsid+'&nuggrid=' + nuggrid + '&nuggtg='+ nuggtg +'"><\/scr'+'ipt>');
})();



// **** Sonderloesung bis alle AdEngines auf dem aktuellen Stand sind pk 20.2.2012****
var tofo_adprode_cids = ""; // String mit allen Campain IDs fuer die DART URL

function addAdProbe(pub,site,cuid1,cuids)
{
var p=document.getElementsByTagName('script')[0],n=document.createElement('script');
n.starttime=new Date().getTime();
n.urlstr="http://req.connect.wunderloop.net/AP/"+pub+"/"+site+"/"+cuid1+"/js?cus="+cuids+"&ord="+n.starttime;
n.id="tfs_scrcidsf_"+Math.floor(Math.random()*9999999);
n.cuids=cuids;
n.type='text/javascript';
n.onload=function(){
   try{
      
      for(var i=0;i<n.cuids.length;i++){
         if(window["wl"+n.cuids[i]+"camp"]&&window["wl"+n.cuids[i]+"camp"]!=""){
            tofo_adprode_cids = tofo_adprode_cids + ";wlcuid=" +n.cuids[i] ;
            //adso_tagvars.add("wlcuid",n.cuids[i]);
            }
         }
       
       }
         catch(w){
          
            }
      }
   n.onreadystatechange=function(){if(this.readyState == 'complete' || this.readyState == 'loaded'){this.onload();}}
   p.parentNode.appendChild(n);
   n.src = n.urlstr;
}
if(adsg_inf.config.adprobe.ap==true && adsg_inf.config.adprobe.pg==true){ addAdProbe(1539,6159,10638,[10638,10639,10640]); } // Procter&Gamble
if(adsg_inf.config.adprobe.ap==true && adsg_inf.config.adprobe.as==true){ addAdProbe(1615,6504,12508,[12508,12509,12510,12511,12512,12513,12514,12515,12516]); } // AudienceSience ROP

/*adprobeaddon mit zeitmessung*/
/*pubid,siteid,cuid1,[cuids] */
/*ende adprobeaddon*/


function addAdProbeGatewayInit(urlstr)
{
 var p=document.getElementsByTagName('script')[0],n=document.createElement('script');
 n.urlstr=urlstr;
 n.type='text/javascript';
 p.parentNode.appendChild(n);
 n.src = n.urlstr;
}
if(adsg_inf.config.adprobe.ap==true && adsg_inf.config.adprobe.as==true){ addAdProbeGatewayInit('http://js.revsci.net/gateway/gw.js?csid=L11279&auto=t'); } // AudienceSience ROP


if(adsg_inf.config.adprobe.ap==true && adsg_inf.config.adprobe.as==true){
 var segQS=(function addAdProbeGatewayCookie()
 {
  var rsi_segs = [];
  var segs_beg=document.cookie.indexOf('rsi_segs=');
  if (segs_beg>=0){
   segs_beg=document.cookie.indexOf('=',segs_beg)+1;
   if(segs_beg>0){
    var segs_end=document.cookie.indexOf(';',segs_beg);
    if(segs_end==-1) segs_end=document.cookie.length;
    rsi_segs=document.cookie.substring(segs_beg,segs_end)
    .split('|');
   }
  }
  var segLen=20;
  var segQS="";
  if (rsi_segs.length<segLen){segLen=rsi_segs.length}
  for (var i=0;i<segLen;i++){
  segQS+=("asi"+"="+rsi_segs[i]+";")
  }
  return segQS;
 }
 )();
}

