/* SiteCatalyst code version: H.23.4.
Copyright 1996-2011 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

function getAccount() {
	var acct_map = {"adopt.nature.org"	:"tncglobalprod1",
			"blog.nature.org"	:"tncglobalprod1",
			"change.nature.org"	:"tncglobalprod1",
			"dev.nature.org"	:"tncoucmdev",
			"earthday.nature.org"	:"tncglobalprod1",
			"help.nature.org"      	:"tncglobalprod1",
			"m.nature.org"          :"tncmobile",
			"m.support.nature.org"   :"tncmobile",
			"m.help.nature.org"      :"tncmobile",
			"m.my.nature.org"        :"tncmobile",
			"m.blog.nature.org"      :"tncmobile",
			"m.change.nature.org"    :"tncmobile",
			"m.voice.nature.org"     :"tncmobile",
			"mstage.nature.org" :"tncmobilestage",
			"mstage.change.nature.org" :"tncmobilestage",
			"mstage.blog.nature.org"   :"tncmobilestage",
			"mstage.help.nature.org"   :"tncmobilestage",
			"mstage.support.nature.org" :"tncmobilestage",
			"mstage.my.nature.org" :"tncmobilestage",
			"mstage.voice.nature.org" :"tncmobilestage",
			"magazine.nature.org"	:"tncglobalprod1",
			"magazinestage.nature.org" :"tncoucmtest",
			"my.nature.org"		:"tncglobalprod1",
			"natureaustralia.org.au"   :"tncglobalprod1",
			"plantabillion.org"	:"tncglobalprod1",
			"photocontest.nature.org"	:"tncglobalprod1",
 			"portugues.tnc.org"	:"tncglobalprod1",
			"prod.nature.org"	:"tncoucmtest",
			"secure.artezpacific.com"   :"tncglobalprod1",
			"shop.nature.org"	:"tncoucmtest",
			"stage.nature.org"	:"tncoucmtest",
			"support.nature.org"	:"tncglobalprod1",
			"voice.nature.org"	:"tncglobalprod1",
			"vote.nature.org"	:"tncoucmtest",
			"www.adoptanacre.org"	:"tncglobalprod1",
			"www.conserveca.org"	:"tncconserveca",
			"www.greatriverspartnership.org"   : "tncgreatrivers",
			"www.natureaustralia.org.au"   :"tncglobalprod1",
			"www.natureconservancy.planyourlegacy.org" :"tncglobalprod1",
			"www.plantabillion.org"	:"tncglobalprod1",
			"www.nature.org"	:"tncglobalprod1"};
	var curr_host = window.location.host;
	for ( host in acct_map ) {
		if ( host == curr_host )
			return acct_map[host];
	}
	return "tncexternal";
}

var s_account=getAccount();
var s=s_gi(s_account)

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/

s.visitorNamespace="thenatureconservancy"
s.trackingServer="thenatureconservancy.112.2o7.net"

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Dynamically select report suite */
s.dynamicAccountSelection=false;
s.dynamicAccountMatch=window.location.hostname;
s.dynamicAccountList="tncprod=nature.org,tnc.org,natureconservancy.planyourlegacy.org,adoptanacre.org,plantabillion.org,greatriverspartnership.org,secure.artezpacific.com,natureaustralia.org.au,conserveca.org";

s.charSet="UTF-8"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,docx,xlsx,ppt,pptx"
s.linkInternalFilters="javascript:,nature.org,tnc.org,natureconservancy.planyourlegacy.org,adoptanacre.org,plantabillion.org,greatriverspartnership.org,secure.artezpacific.com,natureaustralia.org.au,conserveca.org"
/* tncfire.org no longer in use -- now in Gateway.     */
/* nature.planyourlegacy.org no longer in use     */

s.linkLeaveQueryString=false
s.linkTrackVars="prop36,prop10,eVar10"
s.linkTrackEvents="None"

/* Form Analysis Config */
s.formList="process"; /* comma-separated list of forms to be tracked.  All current donation forms are called "process"*/
s.trackFormList=true; // use s.formList
s.trackPageName=true; // pageName:form name:result
s.useCommerce=true; //true-use eVars + events, false-use prop only
s.varUsed="eVar36";
// Abandon, Success, Error
s.eventList="event22,event23,event24";

//ChannelManager Config Variables
s._channelDomain="SocialMedia|blinklist.com,del.icio.us,fark.com,blogmarks.net,smarking.com,segnalo.com,shadows.com,gifttagging.com,simpy.com,wists.com,feedmarker.com,lilisto.com,ma.gnolia.com,faved.net,spurl.net,blummy.com,myweb2.search.yahoo.com,buddymarks.com,feedmelinks.com,hyperlinkomatic.com,linkagogo.com,unalog.com,tag.zurpy.com,de.lirio.us,furl.net,linkroll.com,blogmarks.net,givealink.org,looklater.com,netvouz.com,slashdot.org,doggdot.us,listible.com,digg.com,blogmemes.net,blinkbits.com,netscape.com,spicypage.com,shoutwire.com,youhypeit.com,reddit.com,rojo.com,consumating.com,blogcatalog.com,linkedin.com,ning.com,facebook.com,myspace.com,allconsuming.net,othersonline.com,mybloglog.com,tickme.com,orkut.com,standpoint.com,meetup.com,43things.com,43people.com,43places.com,efamilyties.com,9rules.com,youtube.com,broadcaster.com,dailymotion.com,metacafe.com,vsocial.com,springdoo.com,alexadex.com,jot.com,spinspy.com,googlemark.org,meebo.com,slawsome.com,stumbleupon.com,rollyo.com,quimble.com,twitter.com,metawishlist.com,seomoz.org,rawsugar.com,squidoo.com,wink.com,kinja.com,tailrank.com,flickr.com,slide.com,feedburner.com,tagsy.com,feedmeme.com,technorati.com>Partner|naturerocks.org,mothernaturenet.com>NatureReferrals|blog.nature.org,adopt.nature.org,careers.nature.org,espanol.tnc.org,giftplanning.nature.org,change.nature.org,help.nature.org,earthday.nature.org,m.nature.org,plantabillion.org,shop.nature.org>Direct|support.nature.org,my.nature.org"
s._channelParameter="PaidSearch|gclid,cpc"
s._channelPattern="Email|email_gpn,email_mem,email_renew,email_state,email_wel>Partner|part_emiles,part_mnn>DisplayAds|display_google,display_target"

s.usePlugins=true;

/* Intialize Page Variables */
var s_donation_page=false;
var s_article_page=false;
var s_site_section="";
var s_site_group="";
var s_author="";
var s_publish_date="";
var s_content_genre="";
var s_content_id="";
var s_reference="";
var s_page_template="undefined";
var s_form_name = "";

var s_adsShown="";
var s_slideshow_start="";
var s_slideshow_50="";
var s_slideshow_end="";

function s_doPlugins(s) {

/* Form Analysis Setup*/
s.setupFormAnalysis();

if(!s.pageName) s.pageName=location.href;
s.pageName=s.pageName.toLowerCase();

/* Set cart open event on first instance of cart view */
if(s.events && s.events.indexOf('scView')!=-1){
	if (s.getValOnce('opened',"s_cartopen",0)=="opened") s.events=s.apl(s.events,"scOpen",",",1);
}
/* Reset cart open event after purchase */
if(s.events && s.events.indexOf('purchase')!=-1) s.getValOnce('closed',"s_cartopen",0); 


/* Download Tracking */
var s_download = s.downloadLinkHandler();
if (s_download) {
	s.linkTrackVars="prop6,prop7,prop8,prop9,prop10,prop33,prop21,prop23,prop13,prop24,prop25,prop26,prop27,prop28,prop31,prop41,prop42,prop44,"+
		"eVar6,eVar7,eVar8,eVar9,eVar10,eVar33,eVar21,eVar23,eVar13,eVar25,eVar26,eVar31,eVar41,eVar42,eVar43,eVar44,"+
		"events,channel,server,hier1"; 
	s.linkTrackEvents="event7";	// set Download event
	s.linkName = s.eVar33 = s.prop33 = s_download.substring(s_download.lastIndexOf("/") + 1, s_download.length); // track file name
	s.pageName=s.linkName;			// Set page name to link name to enable download pathing
	s.events = s.apl(s.events, "event7", ",", 1);
}

var s_photo_download = s.downloadLinkHandler('jpg,tif,png,gif');
if (s_photo_download) {
	s.linkTrackVars="prop6,prop7,prop8,prop9,prop10,prop33,prop21,prop23,prop13,prop24,prop25,prop26,prop27,prop28,prop31,prop41,prop42,prop44,"+
		"eVar6,eVar7,eVar8,eVar9,eVar10,eVar33,eVar21,eVar23,eVar13,eVar25,eVar26,eVar31,eVar41,eVar42,eVar43,eVar44,"+
		"events,channel,server,hier1"; 
	s.linkTrackEvents="event6";	// Set Download Photo event
	s.linkName = s.eVar33 = s.prop33 = s_photo_download.substring(s_photo_download.lastIndexOf("/") + 1, s_photo_download.length); // track file name
	s.pageName=s.linkName;			// Set page name to link name to enable download pathing
	s.events = s.apl(s.events, "event6", ",", 1);
}

/* Set Page View Event */
s.events=s.apl(s.events,'event2',',',1);

/* Set Article View Event */
if(s_article_page==true) s.events=s.apl(s.events,'event8',',',1);

/* External Campaign Tracking */
var s_campaign=""; // Campaigns only
var s_campaign_plus="" // Campaigns plus traffic sources

if(!s.campaign) 
	s_campaign=s_campaign_plus=s.getQueryParam('src,gclid,kw',":").split(":",1);
else 
	s_campaign=s_campaign_plus=s.campaign;


/* Channel Manager */
s.channelManager('src,gclid,kw,cpc',':','','1');
if (typeof s._channel != 'undefined'){
	var s_entry_type="";

	if(typeof s._keywords != 'undefined' && s._keywords!="" && s._keywords!="n/a"){
		s.eVar19=s._keywords;
		s_entry_type= s._channel+"_"+s._partner;
	}
	else s_entry_type = s._channel;

	if(s_campaign_plus=="") s_campaign_plus=s_entry_type;
}
s.campaign=s.getValOnce(s_campaign_plus,'s_campaign_plus',0);	
s.eVar47=s.getValOnce(s_campaign,'s_campaign',0);
if(s.eVar47) s.eVar48=s.eVar49="D=v47";

s.eVar17=s._referringDomain;
s.eVar18=s._referrer;

/* Search Terms from GSA on first page only*/
if(s.pageName && s.pageName.indexOf('search')!=-1 && s.getQueryParam('start')=='')
{
	var search_term = "";
	search_term = s.getQueryParam("q");
	if(search_term!="") {
		s.prop1=s.eVar1=search_term.trim().toLowerCase();
		s.prop14="basic search";
		s.events=s.apl(s.events,'event1',',',1);

	} else {

	var search_all = s.getQueryParam("as_q");
	var search_exact = s.getQueryParam("as_epq");
	var search_or = s.getQueryParam("as_oq");
	var search_not = s.getQueryParam("as_eq");
	
	if(search_all!="") search_term+= " "+search_all.fullTrim().toLowerCase();
	if(search_or!="") search_term+= " "+search_or.fullTrim().toLowerCase().split(" ").join(" OR ")
	if(search_exact!="") search_term+= " \""+search_exact.toLowerCase()+"\"";
	if(search_not!="") search_term+= " -"+search_not.fullTrim().toLowerCase().split(" ").join(" -");

	s.prop1=search_term.trim();
	s.eVar1="D=c1";

	var search_options = "";

	var search_occt = s.getQueryParam("as_occt");
	if(search_occt!="" && search_occt!="any") search_options+=" allin"+search_occt;
	var file_type = s.getQueryParam("as_filetype");
	var include_file_type = s.getQueryParam("as_ft");
	if(file_type!="") search_options+=" "+(include_file_type=="e"?"-":"")+"filetype:"+file_type.toLowerCase();
	var search_lang = s.getQueryParam("lr");
	if(search_lang!="") search_options+=" language:"+search_lang;

	s.prop15=search_options.trim();
	if(s.prop15) s.eVar15="D=c15";

	var search_options2 = "";
	var site_search = s.getQueryParam("as_sitesearch");
	var include_site_search = s.getQueryParam("as_dt");
	if(site_search!="") search_options2+=" "+(include_file_type=="e"?"-":"")+"site:"+site_search.toLowerCase();
	var search_link = s.getQueryParam("as_lq");
	if(search_link!="") search_options+=" link:"+search_link;

	s.prop16=search_options2.trim();
	if(s.prop16) s.eVar16="D=c16";	

	if(search_term+search_options2!="") { //Check for blank search
		s.prop14="advanced search";
		s.events=s.apl(s.events,'event1',',',1);
	}
	

	}
	if(s.prop14) s.eVar14="D=c14";
}

/* Content Variables */
s.prop3=s_author;
s.prop4=s_publish_date;
s.prop5=s_content_genre;
if(s.prop3) s.eVar3="D=c3";
if(s.prop4) s.eVar4="D=c4";
if(s.prop5) s.eVar5="D=c5";

/* Populate Site Section and Subsections */
var s_subsection = s_site_section;
var s_subsection2 = s_site_section;
if (s.hier1 && s.hier1.substring(s.hier1.length-1)=="|")
	s.hier1=s.hier1.substring(0,s.hier1.length-1) // Remove extra "|" at end of s.hier1
if(s.hier1 && s.hier1.indexOf(s_site_section)!=-1){
	var s_substr=s.hier1.substring(s.hier1.indexOf(s_site_section)).split("|");
	if (s_substr.length>1){
		s_subsection=s_subsection2=s_substr.slice(0,2).join("|");
		if (s_substr.length>2) s_subsection2=s_substr.slice(0,3).join("|");
	}
}
s.prop6=s_site_section;
s.prop7=s_subsection;
s.prop8=s_subsection2;

s.prop52=s_site_group;
s.eVar52="D=c52";

/* Set Site Entry (Visit) Event */
var s_visit_start=s.getVisitStart("s_visit");
if (s_visit_start) s.events=s.apl(s.events,'event3',',',1);

/* Entry Site Section */
if (s_visit_start) s.eVar9=s_site_section;

/* Campaign Pathing */
if(s.pageName) {
	if(""!=s.getAndPersistValue(s_campaign_plus,'s_persist_campaign',0)) 
		s.prop27='D="'+s.getAndPersistValue(s_campaign_plus,"s_persist_campaign",0)+':"+pageName';
	else
		s.prop27='D="NONE:"+pageName';
}

/* Determine Daylight Savings Time start and end */
var dst_start = new Date;
var dst_end = new Date;
dst_start.setMonth(2); 
dst_start.setDate(14);
var day = dst_start.getDay();
dst_start.setDate(14-day); // second Sunday in March
dst_end.setMonth(10);
dst_end.setDate(7);
day = dst_end.getDay();
dst_end.setDate(7-day); // first Sunday in November

/* Set getTimeParting Variables */
var theDate=new Date();
s.currentYear=(theDate.getFullYear());
s.dstStart="03/"+pad2(dst_start.getDate())+"/"+s.currentYear; //Daylight Savings Start
s.dstEnd="11/"+pad2(dst_end.getDate())+"/"+s.currentYear; // Daylight Savings End
 
/* Set Time Parting Variables */
s_timepart=s.getTimeParting('d','-5')+"|"+s.getTimeParting('h','-5');
s.prop10=s_timepart.toLowerCase();
s.eVar10="D=c10";

/* Path Length */
s.eVar11='+1';

/* Internal Campaign Tracking */
s.prop12=s.getQueryParam('s_intc');
if(!s.prop12 && typeof(intc)!='undefined' && intc != '') 
{
	s.prop12 = intc+'';
	s.prop12=s.getValOnce(s.prop12,'s_intc',0); /* When internal campaign is set by page variable only set once per session*/
}
if(s.prop12) s.eVar12="D=c12";
	
/* Previous 3 Unique Internal Campaigns in Visit Stacked */   
s.prop13=s.crossVisitParticipation(s.prop12,'s_ev13','','3','>','',0);
s.eVar13="D=c13";

/* Reference */
if(s_reference) s.prop21=s.eVar21=s_reference;

/* Content ID */
if(s_content_id) s.prop22=s.eVar22=s_content_id;

/* Logged in / Not logged in */
s.prop23=(s_reference==""?"logged_out":"logged_in");
s.eVar23="D=c23";

/* Logged in pathing */
s.prop24='D=c23+":"+pageName';

/* Visit Number */	
s.prop25=s.eVar25=s.getVisitNum()+'';

/* New Repeat Pathing */
s.prop26='D="'+s.getNewRepeat()+':"+pageName';

/* Page Name */
s.eVar26="D=pageName";

/* Entry Page */
if(s_visit_start) {
	s.prop31=s.eVar31="D=pageName";
	s.getAndPersistValue(s.pageName,'gpv_entry');
} else
	s.prop31=s.getAndPersistValue('','gpv_entry');

/* URL */
s.eVar32=s.prop32="D=g";

/* Previous 3 External Campaigns Stacked */
if(s.campaign){
	s.prop41=s.crossVisitParticipation(s.campaign,'s_ev41','30','3','>','',0); // 30 day expiration
	if(s.prop41) s.eVar41="D=c41";
}

/* Store Previous Page, Previous 3 Unique Site Sections in Visit Stacked, Previous Page Template, and Previous Percent Page Viewed */
var s_ppn = s.getPreviousValue(s.pageName,'s_ppn','');
s.prop42=s_ppn;
	
s.prop44=s.crossVisitParticipation(s_site_section,'s_ev44','1','3','>','',0); // 1 day expiration

if(!s_page_template) s_page_template="undefined";
s.prop45=s.getPreviousValue(s_page_template,'gpv_pgtemplate','');

/* Percent of Previous Page Viewed*/
s.prop37=s.getPercentPageViewed();

/* On non-donation pages, store "previous" variables in eVars, else allow eVars to persist*/
if(s_site_section=="Donation2") s_donation_page=true;
if(!s_donation_page==true) {
	s.eVar43=s.eVar42="D=c42";
	s.eVar44="D=c44";
	s.eVar45="D=c45";
	s.eVar37="D=c37";
	if(s.prop6) s.eVar6="D=c6";
	if(s.prop7) s.eVar7="D=c7";
	if(s.prop8) s.eVar8="D=c8";
}

/* Site Section New/Repeat Entry and Bounce Rate */
/* Campaign Entry and Bounce Rate */
if (s_visit_start){
	s.prop9=s.getNewRepeat()+":"+s_site_section;
	s.prop28="D=v0";
}
else if (s.pageName!=s_ppn) {
	s.prop9=s.getValOnce("Non-bounce","s_nonbounce",0);
	if(s.prop9) s.prop28="D=c9";
}

/* Get Previous Link ID, if exists and is a known ID */
var s_link_id="";

var rcLeft = document.getElementById('rcLeft')
if (rcLeft && typeof rcLeft == "object") var rcLeft_a = rcLeft.getElementsByTagName('a');
var relatedContent = document.getElementById('relatedContent')
if (relatedContent && typeof relatedContent == "object") var relatedContent_a = relatedContent.getElementsByTagName('a');
var callToAction = document.getElementById('callToAction')
if (callToAction && typeof callToAction == "object") var callToAction_a = callToAction.getElementsByTagName('a');
var globalRightContent = document.getElementById('globalRightContent')
if (globalRightContent && typeof globalRightContent == "object") var globalRightContent_a = globalRightContent.getElementsByTagName('a');
var header = document.getElementById('header')
if (header && typeof header == "object") var header_a = header.getElementsByTagName('a');
var footer = document.getElementById('footer')
if (footer && typeof footer == "object") var footer_a = footer.getElementsByTagName('a');
var splash = document.getElementById('splash')
if (splash && typeof splash == "object") var splash_a = splash.getElementsByTagName('a');
var sidebar = document.getElementById('sidebar')
if (sidebar && typeof sidebar == "object") var sidebar_a = sidebar.getElementsByTagName('a');
var tab_1 = document.getElementById('tab_1')
if (tab_1 && typeof tab_1 == "object") var tab_1_a = tab_1.getElementsByTagName('a');
var tab_2 = document.getElementById('tab_2')
if (tab_2 && typeof tab_2 == "object") var tab_2_a = tab_2.getElementsByTagName('a');
var tab_3 = document.getElementById('tab_3')
if (tab_3 && typeof tab_3 == "object") var tab_3_a = tab_3.getElementsByTagName('a');

if (typeof document.activeElement != "undefined" && document.activeElement && typeof document.activeElement.getAttribute('link_id') != "undefined" && document.activeElement.getAttribute('link_id')) {
    switch (document.activeElement.getAttribute('link_id')) {
		case "body":  /** Allowed Values of link_id= attribute in <a> tag **/
		case "lnav":
		case "rnav": case "rnav1": case "rnav2": case "rnav3":
		    s_link_id = s.getPreviousValue(document.activeElement.getAttribute('link_id'), 'gpv_linkid', 0)
			break;
		default:s_link_id=s.getPreviousValue('','gpv_linkid',0)
	}
}
else if(rcLeft_a && contains(rcLeft_a,document.activeElement)) s_link_id=s.getPreviousValue('body','gpv_linkid',0);
else if(relatedContent_a && contains(relatedContent_a,document.activeElement)) s_link_id=s.getPreviousValue('rnav1','gpv_linkid',0);
else if(callToAction_a && contains(callToAction_a,document.activeElement)) s_link_id=s.getPreviousValue('rnav2','gpv_linkid',0);
else if(globalRightContent_a && contains(globalRightContent_a,document.activeElement)) s_link_id=s.getPreviousValue('rnav3','gpv_linkid',0);
else if(header_a && contains(header_a,document.activeElement)) s_link_id=s.getPreviousValue('header','gpv_linkid',0);
else if(footer_a && contains(footer_a,document.activeElement)) s_link_id=s.getPreviousValue('footer','gpv_linkid',0);
else if(splash_a && contains(splash_a,document.activeElement)) s_link_id=s.getPreviousValue('hpsplash','gpv_linkid',0);
else if(sidebar_a && contains(sidebar_a,document.activeElement)) s_link_id=s.getPreviousValue('hpsidebar','gpv_linkid',0);
else if(tab_1_a && contains(tab_1_a,document.activeElement)) s_link_id=s.getPreviousValue('hptab1','gpv_linkid',0);
else if(tab_2_a && contains(tab_2_a,document.activeElement)) s_link_id=s.getPreviousValue('hptab2','gpv_linkid',0);
else if(tab_3_a && contains(tab_3_a,document.activeElement)) s_link_id=s.getPreviousValue('hptab3','gpv_linkid',0);
else 
	s_link_id=s.getPreviousValue('','gpv_linkid',0);
if(s_link_id!="no value")
	s.eVar46=s.prop46=s_link_id;

/* set Editorial Theme from meta data */
s.prop53 = getMetaValue('editorialtheme'); 
s.eVar53 = s.prop53;


/* Slideshow Events */
if(s_slideshow_start) s_slideshow_start=s.getValOnce(s_slideshow_start,'slideshow_start',0);
if(s_slideshow_start) s.events+=',event12';

if(s_slideshow_50) s_slideshow_50=s.getValOnce(s_slideshow_50,'slideshow_50',0);
if(s_slideshow_50) s.events+=',event13';

if(s_slideshow_end) s_slideshow_end=s.getValOnce(s_slideshow_end,'slideshow_end',0);
if(s_slideshow_end) s.events+=',event14';

/*Shorten s.purchaseID to 20 characters*/
if(s.purchaseID) {
	s.purchaseID=s.purchaseID.replace(/-/g,"");
	if(s.purchaseID.length > 4)
		s.purchaseID=s.purchaseID.substring(4); // Remove the leading 4 digits "1361" which do not change
}

/* Form Pathing */
if(!s.prop36) s.prop36='D=v36';

/* Form Entries */
if(s_form_name!="" && s.pageName!=s_ppn && !s.eVar36) {
	s.events=s.apl(s.events,'event25',',',1);
	s.eVar36='D=pageName+":'+s_form_name+'"';
}

}

s.doPlugins=s_doPlugins

/************************** PAGE FUNCTIONS *************************/
/* These functions should only be called on a page load, not within*/
/* an onClick or form submit.  */

s_carbonCalculatorInitiation = function() {s.events=s.apl(s.events,'event15',',',1);}

/* s_homepagePopup = function() {s.events=s.apl(s.events,'event28',',',1);} */



s_pageAdImpression = function(ad_ID_list) 
{
	if(ad_ID_list && s_adsShown.indexOf(ad_ID_list+',')==-1 && ((typeof s.products=='undefined') || s.products=='')) {
		s_adsShown+=ad_ID_list+',';
		s.events=s.apl(s.events,'event26',',',1); 
		var s_products=';'+ad_ID_list.split(',').join(',;');
		s.products = s_products.replace(/\s*;\s*/g,';').replace(/\s*\,\s*/g,',');
	}
} 


/************************** LINK FUNCTIONS *************************/
/* These functions are standalone and can be called in any onClick, or*/
/* within the form validation area of a form.*/

s_setEvent = function (f, g) {
    if ((null != g) && ("" != g) && (0 != g)) {
        var s_linkTrackVarsTemp = s.linkTrackVars;
        var s_linkTrackEventsTemp = s.linkTrackEvents;
        s.linkTrackVars = 'events,prop10,eVar10';
        s.linkTrackEvents = 'event' + g.toString();
        s.events = 'event' + g.toString();
        var link_name = f + '';
        s.tl(this, 'o', link_name);
        s.linkTrackVars = s_linkTrackVarsTemp;
        s.linkTrackEvents = s_linkTrackEventsTemp;
        s.events='';
    }
}
s_login = function () {s_setEvent('login', 4);}
s_registration = function () {s_setEvent('nature.org registrations', 5);}
s_photoContestSubmit = function () {s_setEvent('photo contest submit', 9);}
s_editorialContentSubmit = function () {s_setEvent('editorial content submit', 10);}
s_commentPosted = function () {s_setEvent('comment posted', 16);}
s_sendECard = function () {s_setEvent('ecard sent', 17);}
s_carbonCalculatorOffsetClicks = function () {s_setEvent('offset carbon',18);}
s_bequestLead = function () {s_setEvent('bequest lead', 19);}
s_giftPlanningLead = function () {s_setEvent('gift planning lead', 20);}
s_contactUs = function () {s_setEvent('contact us', 21);}
s_homepagePopup = function () {s_setEvent('homepage popups', 28);}
s_popupClicks = function () {s_setEvent('homepage popup clicks', 29);}
s_earthdayRSVP = function () {s_setEvent('earthday rsvp', 32);}
s_earthdayEmail = function () {s_setEvent('earthday email', 33);}


s_tabView = function(tab_name) {
    var s_linkTrackVarsTemp = s.linkTrackVars;
    var s_linkTrackEventsTemp = s.linkTrackEvents;
    s.linkTrackVars='prop10,eVar10,prop38,prop42';  
	s.linkTrackEvents='None';
	var full_tab_name='tab:'+tab_name;
	s.prop38=tab_name;
	s.tl(true, 'o', full_tab_name);
	s.linkTrackVars = s_linkTrackVarsTemp;
	s.linkTrackEvents = s_linkTrackEventsTemp;
	s.prop38='';
}

s_photoSlideshowView = function(slideshow_name,length,slide_num) {
    var s_linkTrackVarsTemp = s.linkTrackVars;
    var s_linkTrackEventsTemp = s.linkTrackEvents;
    s.linkTrackVars='events,prop10,eVar10,eVar24';  
	s.linkTrackEvents='event11,event12,event13,event14';
	s.events='event11';

	s_slideshow_start=slideshow_name;
	if(slide_num>=length/2) s_slideshow_50=slideshow_name;
	if(slide_num==length) s_slideshow_end=slideshow_name;

	s.eVar24=slideshow_name+'';
	s.tl(this, 'o', 'slideshow:' + slideshow_name);
	s.linkTrackVars = s_linkTrackVarsTemp;
	s.linkTrackEvents = s_linkTrackEventsTemp;
	s.events=s.eVar24='';
}

s_previousPageFormSuccess = function(form_name) {
    var s_linkTrackVarsTemp = s.linkTrackVars;
    var s_linkTrackEventsTemp = s.linkTrackEvents;
    s.linkTrackVars='events,eVar36,prop36,prop10,eVar10';
	s.linkTrackEvents=s.events='event23';
	s.eVar36=s.prop42+':'+form_name;
	s.prop36='D=v36+":Success"';
	s.tl(true,'o','Form Analysis');
	s.eVar36=s.prop36=s.events='';
	s.prop36 = 'D=v36';
	s.linkTrackVars = s_linkTrackVarsTemp;
	s.linkTrackEvents = s_linkTrackEventsTemp;
}

s_previousPageFormError = function(form_name,form_error) {
    var s_linkTrackVarsTemp = s.linkTrackVars;
    var s_linkTrackEventsTemp = s.linkTrackEvents;
    s.linkTrackVars='events,eVar36,prop36,prop10,eVar10';
	s.linkTrackEvents=s.events='event24';
	var previous_page = s.pageName;
	if(s.prop42!='') previous_page = s.prop42;
	s.eVar36=previous_page+':'+form_name+':('+form_error+')';
	s.prop36=previous_page+':'+form_name+':Error:('+form_error+')';
	s.tl(true,'o','Form Analysis');
	s.eVar36=s.prop36=s.events='';
	s.prop36 = 'D=v36';
	s.linkTrackVars = s_linkTrackVarsTemp;
	s.linkTrackEvents = s_linkTrackEventsTemp;
}

s_linkAdImpression = function(ad_ID_list) 
{
} 

s_adClick = function(adID) {
	var s_linkTrackVarsTemp = s.linkTrackVars; 
	var s_linkTrackEventsTemp = s.linkTrackEvents;
	s.linkTrackVars='events,products,prop10,eVar10';
	s.linkTrackEvents=s.events='event27';
	s.products=';'+adID;
	s.tl(true,'o','Ad clicked');
	s.linkTrackVars = s_linkTrackVarsTemp; 
	s.linkTrackEvents = s_linkTrackEventsTemp; 
	s.events=s.products='';
}

s_regStart = function() {
    var s_linkTrackVarsTemp = s.linkTrackVars;
    var s_linkTrackEventsTemp = s.linkTrackEvents;
    s.linkTrackVars='events,prop10,eVar10,prop50,eVar50';  
                s.linkTrackEvents='event30';
                s.events='event30';
                s.prop50=s.pageName;
                s.eVar50=s.pageName;
                s.tl(true, 'o', 'get_involved');
                s.linkTrackVars = s_linkTrackVarsTemp;
                s.linkTrackEvents = s_linkTrackEventsTemp;
 
}

s_buttonTest = function() {
    var s_linkTrackVarsTemp = s.linkTrackVars;
    var s_linkTrackEventsTemp = s.linkTrackEvents;
    s.linkTrackVars='events,prop10,eVar10,prop51,eVar51';  
                s.linkTrackEvents='event31';
                s.events='event31';
                s.prop51=s.pageName;
                s.eVar51=s.pageName;
                s.tl(true, 'o', 'cta_button_test');
                s.linkTrackVars = s_linkTrackVarsTemp;
                s.linkTrackEvents = s_linkTrackEventsTemp;
 
}

/*
 * Function - Get meta tag content
 */

function getMetaValue(metatag_name) {

	var meta_array=document.getElementsByTagName("meta");
		for (var i=0; i<meta_array.length; i++) 
			{
				if (meta_array[i].name.toLowerCase() == metatag_name.toLowerCase()) 
				{
				return meta_array[i].content.toLowerCase();
				}
			}
	}


/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */ 

/* Pad 1 digit numbers with leading 0 */
function pad2(num) {  
     return (num<10?'0':'')+num;
}

/* Search within an array for an object */
function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}

/*
 * Utility Functions: apl, p_c, p_gh, split, replace, join
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/* Trim leading and trailing whitespace */
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

/* Trim leading and trailing whitespace */
String.prototype.fullTrim = function() {
	return this.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
}


/*
 * Plugin: getPercentPageViewed v1.1
 */
s.getPercentPageViewed=new Function("",""
+"if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var v=s.c_r('s"
+"_ppv');s.c_w('s_ppv',0);return v;}");
s.getPPVCalc=new Function("",""
+"var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement."
+"scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.of"
+"fsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clie"
+"ntHeight)),vph=s.d.clientHeight||Math.min(s.d.documentElement.clien"
+"tHeight,s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document."
+"documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,"
+"pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){s.c_w('s_ppv'"
+",'');}else if(pv>cp){s.c_w('s_ppv',pv);}");
s.getPPVSetup=new Function("",""
+"if(s.wd.addEventListener){s.wd.addEventListener('load',s.getPPVCalc"
+",false);s.wd.addEventListener('scroll',s.getPPVCalc,false);s.wd.add"
+"EventListener('resize',s.getPPVCalc,false);}else if(s.wd.attachEven"
+"t){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEvent('onscro"
+"ll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCalc);}");
s.getPPVSetup();

/*
 * Plugin: downloadLinkHandler 0.5 - identify and report download links
 */
s.downloadLinkHandler=new Function("p",""
+"var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT"
+"ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;"
+"if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");

/*
 * Plugin: linkHandler 0.5 - identify and report custom links
 */
s.linkHandler=new Function("p","t",""
+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn=new Function("t","h",""
+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+"return 0;");

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;"); 

/*                                                                  
* Plugin: getVisitNum - version 3.0
*/
s.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+"t;");

/*
 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
 */
s.getTimeParting=new Function("t","z",""
+"var s=this,cy;dc=new Date('1/1/2000');"
+"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
+"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
+"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
+"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
+"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
+"var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',"
+"'Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
+"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
+"var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';"
+"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
+"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};"
+"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
+"if(t=='d'){return dow};if(t=='w'){return dt}}};");

/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 *	Plug-in: crossVisitParticipation v1.7 - stacks values from
 *	specified variable in cookie and returns value
 */

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

/*
 * Plugin: Form Analysis 2.1 (Success, Error, Abandonment)
 */
s.setupFormAnalysis=new Function(""
+"var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s."
+"wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even"
+"tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''"
+",'','')}");
s.sendFormEvent=new Function("t","pn","fn","en",""
+"var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='"
+"s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd."
+"event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng"
+"th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name"
+";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);"
+"if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='"
+"No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element"
+"s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.on"
+"mousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toStrin"
+"g():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd"
+"=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s"
+".wd.onunload;s.wd.onunload=s.fasl;}return r;");
s.faos=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v"
+"u]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):tru"
+"e;");
s.fasl=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag"
+"eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path"
+"name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]="
+"'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]"
+"='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]"
+"!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV"
+"ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars="
+"ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt"
+"e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'"
+",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s"
+".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f."
+"vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object"
+"();faLink.href='#';s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.us"
+"ePlugins=up}return f.ul&&e!='e'&&e!='s'?f.ul(e):true;");
s.fam=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas"
+"tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this."
+"form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e."
+"which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW"
+"N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM"
+"AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e"
+"n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1"
+"){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va["
+"1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s"
+"_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak"
+"d(e);");
s.ee=new Function("e","n",""
+"return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage=new Function("e","a",""
+"var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");
/*
 * channelManager v2.4 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f",""
+"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+"e)){v=0}if(!s.c_w(e,1,n)){s.c_w(e,1,0)}if(!s.c_r(e)){v=0}}g=s.refer"
+"rer?s.referrer:document.referrer;g=g.toLowerCase();if(!g){h=1}i=g.i"
+"ndexOf('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkI"
+"nternalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<"
+"l;m++){B=j.indexOf(k[m])==-1?'':g;if(B)O=B}if(!O&&!h){p=g;U=g.index"
+"Of('//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q"
+",r);t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSear"
+"chEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g"
+"=s.repl(g,'as_q','*')}A=s.split(S,'>');T=A.length;for(i=0;i<T;i++){"
+"D=A[i];D=s.split(D,'|');E=s.split(D[0],',');F=E.length;for(G=0;G<F;"
+"G++){H=j.indexOf(E[G]);if(H>-1){i=s.split(D[1],',');U=i.length;for("
+"k=0;k<U;k++){l=s.getQueryParam(i[k],'',g);if(l){l=l.toLowerCase();M"
+"=l;if(D[2]){u=D[2];N=D[2]}else{N=t}if(d==1){N=s.repl(N,'#',' - ');g"
+"=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle'"
+");}}}}}}}if(!O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M){P='P"
+"aidSearch'}else{P='PaidNonSearch';}}if(!O&&M){u=N;P='NaturalSea"
+"rch'}}if(h==1&&!O&&v==1){u=P=t=p='Direct'}X=M+u+t;c=c?c:'c_m';"
+"if(c!='0'){X=s.getValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.s"
+"plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
+"it(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i"
+"=j.indexOf(Y);if(i>-1)P=q[0]}}}g=s._channelParameter;if(g&&X){k=s.s"
+"plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
+"it(q[1],',');S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if"
+"(U)P=q[0]}}}g=s._channelPattern;if(g&&X){k=s.split(g,'>');l=k.lengt"
+"h;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.leng"
+"th;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i."
+"indexOf(Y);if(H==0)P=q[0]}}}if(X)M=M?M:'n/a';p=X&&p?p:'';t=X&&t?t:'"
+"';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?P:'';s._re"
+"ferrer=p;s._referringDomain=t;s._partner=N;s._campaignID=O;s._campa"
+"ign=u;s._keywords=M;s._channel=P");
/* non-custom list */
s.seList="search.aol.com,search.aol.ca|query,q|AOL.com Search>ask.com"
+",ask.co.uk|ask,q|Ask Jeeves>google.co,googlesyndication.com|q,as_q|"
+"Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as_q"
+"|Google - Australia>google.be|q,as_q|Google - Belgium>google.com.br"
+"|q,as_q|Google - Brasil>google.ca|q,as_q|Google - Canada>google.cl|"
+"q,as_q|Google - Chile>google.cn|q,as_q|Google - China>google.com.co"
+"|q,as_q|Google - Colombia>google.dk|q,as_q|Google - Denmark>google."
+"com.do|q,as_q|Google - Dominican Republic>google.fi|q,as_q|Google -"
+" Finland>google.fr|q,as_q|Google - France>google.de|q,as_q|Google -"
+" Germany>google.gr|q,as_q|Google - Greece>google.com.hk|q,as_q|Goog"
+"le - Hong Kong>google.co.in|q,as_q|Google - India>google.co.id|q,as"
+"_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google.co.i"
+"l|q,as_q|Google - Israel>google.it|q,as_q|Google - Italy>google.co."
+"jp|q,as_q|Google - Japan>google.com.my|q,as_q|Google - Malaysia>goo"
+"gle.com.mx|q,as_q|Google - Mexico>google.nl|q,as_q|Google - Netherl"
+"ands>google.co.nz|q,as_q|Google - New Zealand>google.com.pk|q,as_q|"
+"Google - Pakistan>google.com.pe|q,as_q|Google - Peru>google.com.ph|"
+"q,as_q|Google - Philippines>google.pl|q,as_q|Google - Poland>google"
+".pt|q,as_q|Google - Portugal>google.com.pr|q,as_q|Google - Puerto R"
+"ico>google.ro|q,as_q|Google - Romania>google.com.sg|q,as_q|Google -"
+" Singapore>google.co.za|q,as_q|Google - South Africa>google.es|q,as"
+"_q|Google - Spain>google.se|q,as_q|Google - Sweden>google.ch|q,as_q"
+"|Google - Switzerland>google.co.th|q,as_q|Google - Thailand>google."
+"com.tr|q,as_q|Google - Turkey>google.co.uk|q,as_q|Google - United K"
+"ingdom>google.co.ve|q,as_q|Google - Venezuela>bing.com|q|Microsoft "
+"Bing>naver.com,search.naver.com|query|Naver>yahoo.com,search.yahoo."
+"com|p|Yahoo!>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Canada>yah"
+"oo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>sg.yahoo.com,sg.sea"
+"rch.yahoo.com|p|Yahoo! - Singapore>uk.yahoo.com,uk.search.yahoo.com"
+"|p|Yahoo! - UK and Ireland>search.cnn.com|query|CNN Web Search>sear"
+"ch.earthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Se"
+"arch>search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Searc"
+"h";

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.23.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s."
+"d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window."
+"s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload"
+"=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTrackin"
+"g){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.na"
+"me))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){va"
+"r s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s"
+".pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.su"
+"bstring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,s"
+"earch_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',"
+"')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs"
+"='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)){nfm=0;if(nf"
+"l)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(n"
+"ke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='ret"
+"rieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss"
+")){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs!='')qs+='&.'+k"
+"}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrac"
+"kVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+f"
+"e+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if("
+"v&&(!fv||fv.indexOf(k)>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}"
+"else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else i"
+"f(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else i"
+"f(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel"
+"')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q"
+"='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';"
+"else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='ligh"
+"tStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q"
+"='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else "
+"if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('"
+"?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;"
+"return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&l"
+"ft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Func"
+"tion('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&"
+"s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');"
+"s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o."
+"protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot="
+"function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.ty"
+"pe&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t="
+"='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o"
+".value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t"
+",un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return"
+" q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t"
+".indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='"
+"s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s."
+"squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wd"
+"l=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\""
+"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)"
+"s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.vis"
+"itorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};"
+"s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dy"
+"asmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if"
+"(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun"
+")s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m"
+"_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s',"
+"'n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._i"
+"n]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]="
+"new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}"
+"m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x"
+");u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else i"
+"f(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadMod"
+"ule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))"
+"&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o"
+".l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f"
+"2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.o"
+"nreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;"
+"o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){"
+"k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.leng"
+"th;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime"
+"()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if("
+"!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&"
+"&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.ge"
+"tHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tf"
+"s.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s"
+".isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if"
+"(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerH"
+"eight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&"
+"&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b."
+"addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;p"
+"n++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb)"
+";s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer"
+"=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.paren"
+"tElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)r"
+"eturn ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||"
+"t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1"
+";i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s"
+".sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs"
+");}else{s.dl(vo);}if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};"
+"s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncre"
+"mentBy=i;s.t(vo)};s.jsLoaded=function(){var s=this,x;if(s.lmq)for(i=0;i<s.lmq.length;i++){x=s.lmq[i];s.loadModule(x.n,x.u,x.d)}if(s.onLoad)s.onLoad(s);if(s.tq)for(i=0;i<s.tq.length;i++)s.t(s.tq[i])"
+"};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navi"
+"gator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='"
+"Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substrin"
+"g(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(St"
+"ring.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,vis"
+"itorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,co"
+"okieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,z"
+"ip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s"
+".vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,color"
+"Depth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerS"
+"ecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,"
+"trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';"
+"s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(u"
+"n,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,x,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||x=='s_l')&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}

