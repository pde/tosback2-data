//FD for Global and Events tracking to be placed in footer just before the s.t() call
//Update 11/30/2011 - RD

var sniSite = "FrontDoor";
var sniEvent = "";
var sniHubHier = "";

if (typeof s.events == "undefined" || s.events == "") {
s.events="event1";
}

if (typeof adtag_globalHubHierarchy != "undefined") {
	var sniHubHier = adtag_globalHubHierarchy;
	sniHubHier = sniHubHier.toLowerCase();
}

//set event as needed
if (pType !="dev") {
	s_account=s_account + ",scrippshomeglobal";
	omniRS=omniRS + ",scrippshomeglobal";
	if (sniHubHier.indexOf("spring") !=-1) {sniEvent="Spring";}
	else if (sniHubHier.indexOf("outdoor") !=-1) {sniEvent="Outdoors";}
	else if (sniHubHier.indexOf("green_home") !=-1 || sniHubHier.indexOf("green") !=-1) {sniEvent="Green Home";}
	else if (sniHubHier.indexOf("dh") !=-1  || sniHubHier.indexOf("dream_home") !=-1 || sniHubHier.indexOf("dreamhome") !=-1) {sniEvent="Dream Home";}
	else if (sniHubHier.indexOf("fall") !=-1) {sniEvent="Fall";}
	else if (sniHubHier.indexOf("holiday") !=-1) {sniEvent="Holiday";}
	else if (sniHubHier.indexOf("kitchen") !=-1) {sniEvent="Kitchen";}
	else if (sniHubHier.indexOf("bath") !=-1) {sniEvent="Bath";}
}

s=s_gi(s_account);


//Non-City Articles
if (adtag_globalArticleType.toLowerCase() == "non-city") {
	s.pageName=adtag_globalPageName;
	s.channel=adtag_globalPageSctnName.toLowerCase();
	s.prop33=adtag_globalPageSctnName.toLowerCase() + " articles";
	s.prop35="detail article";
	s.prop15="Detail:Article: " + adtag_globalPageTitle;
	s.events=s.events + ",event13";
	if (fdPath.indexOf("thanks") != -1) {
		s.events=s.events + ",event41";
	}

}

//City Guide Articles
else if (adtag_globalArticleType.toLowerCase() == "city guide") {
	s.pageName=adtag_globalPageName;
	s.channel="explore cities";
	s.prop2=adtag_globalCity;
	s.prop33=adtag_globalTab;
	s.prop35=adtag_globalCity;
}

//Photo Gallery
else if (adtag_globalArticleType.toLowerCase() == "photo gallery") {
	s.pageName=fdHost + fdPath;
	s.channel=adtag_globalPageSctnName.toLowerCase();
	s.events=s.events + ",event13";
	s.prop15="Detail:Article: " + adtag_globalPageTitle;
	s.prop33=adtag_globalPageSctnName.toLowerCase() + " articles";
	s.prop35="detail article";
}

//Global & Event Tracking

//overwrite section and subsection if contained in HubHierarchy field
if (sniHubHier.indexOf("^") !=-1) {
	sctEnd=sniHubHier.indexOf("^");
	ssBegin=sctEnd+1;
	s.channel=sniHubHier.substring(0, sctEnd);
	s.prop33=sniHubHier.substring(ssBegin);
}

//overwrite site section for GH and DH
if (sniEvent == "Green Home") {
	s.channel="green home";
}
else if (sniEvent == "Dream Home") {
	s.channel="dreamhome";
}


s.server=fdHost;
s.prop30=adtag_globalPageSponsorship;
s.prop34=adtag_globalPageTitle;
s.prop52 = sniEvent;
s.prop53 = sniSite;
s.prop54 = sniSite + ":" + s.channel;
s.prop55 = sniSite + ":" + s.channel + ":" + s.prop33;
if (s.prop30 != "") {s.prop56 = sniSite + ":" + s.prop30;}
else {s.prop56 = "";}
s.prop57 = sniSite + ":" + s.prop34;
s.prop58 = sniHubHier;
s.prop59 = s.channel;
s.prop60 = s.prop30;
s.eVar52 = s.prop52;
s.eVar53 = s.prop53;
s.eVar54 = s.prop54;
s.eVar55 = s.prop55;
s.eVar56 = s.prop56;
s.eVar57 = s.prop57;
s.eVar58 = s.prop58;
s.eVar59 = s.prop59;
s.eVar60 = s.prop60;

//














































