/* 
Expedia SiteAnalytics 20120313
Contact Expedia Site Analytics group before any editing or updates
*/

// set s_exp_* values to legacy settings if needed

//Exclude Safari preview window joe
if (navigator.userAgent.match(/4 Public Beta Safari/)|| navigator.loadPurpose === "preview"){
     s_exp_account = "devexpediaexclusions";
}

if(! window.s_exp_account) {	var s_exp_account = window.s_account }
if(! window.s_exp_EAPID) { var s_exp_EAPID = window.s_EAPID }
if(! window.s_exp_BrandEAPID) { var s_exp_BrandEAPID = window.s_BrandEAPID }

// alter s_exp_account as needed, but only for expedia* values
s_exp_account=s_exp_account.toLowerCase()
if(s_exp_account.substr(0,7)=="expedia") {
	if(document.domain.indexOf("customer")>-1){
		// agent report suite
		s_exp_account="expediaagent"+s_exp_account.substr(7);
	}
	else if(window.s_exp_EAPID) { 
		// multitagged TPID-EAPID report suite
		var s_t=s_exp_account.indexOf(",")
		if(s_t==-1){s_t=s_exp_account.length}
		var s_exp_account2=s_exp_account.substr(0,s_t)+"-"+s_exp_EAPID
		if(s_exp_account.indexOf(s_exp_account2)==-1){s_exp_account=s_exp_account+","+s_exp_account2}
	}
	else if (window.s_exp_BrandEAPID) { 
		// single tagged TPID-EAPID report suite
		var s_t=s_exp_account.indexOf(",")
		if(s_t==-1){s_t=s_exp_account.length}
		var s_exp_account2=s_exp_account.substr(0,s_t)+"-"+s_exp_BrandEAPID
		s_exp_account=s_exp_account2;
	}	
}

//Rename scandi rsids
//IE
if (s_exp_account=='expedia63') {s_exp_account="expedia30007-711";}
if (s_exp_account=='expedia63-0') {s_exp_account="expedia30007-711";}
if (s_exp_account=='expedia63-711') {s_exp_account="expedia30007-711";}
//BE
if (s_exp_account=='expedia64') {s_exp_account="expedia30007-712";}
if (s_exp_account=='expedia64-0') {s_exp_account="expedia30007-712";}
if (s_exp_account=='expedia64-712') {s_exp_account="expedia30007-712";}
//SE
if (s_exp_account=='expedia65-0') {s_exp_account="expedia30009-314";}
if (s_exp_account=='expedia65') {s_exp_account="expedia30009-314";}
if (s_exp_account=='expedia65-314') {s_exp_account="expedia30009-314";}
//NO
if (s_exp_account=='expedia66') {s_exp_account="expedia30035-327";}
if (s_exp_account=='expedia66-0') {s_exp_account="expedia30035-327";}
if (s_exp_account=='expedia66-327') {s_exp_account="expedia30035-327";}
//DK
if (s_exp_account=='expedia67') {s_exp_account="expedia30036-392";}
if (s_exp_account=='expedia67-0') {s_exp_account="expedia30036-392";}
if (s_exp_account=='expedia67-392') {s_exp_account="expedia30036-392";}

//TD for Expedia Additions. Set report suite id. Expedia CA
//alert(LTYpartner);
if (typeof LTYpartner!=='undefined' && LTYpartner == 'TD-CA'){
s_exp_account='expedia4-60835';
s_eVar40=LTYcustomerTier;
}
//end td for expedia

var s_trackExternalLinks=true
var s_linkInternalFilters="javascript:,expedia,"+document.domain
var s_linkLeaveQueryString=false
var s_trackDownloadLinks=true
var s_linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
var s_trackInlineStats=false
var s_linkTrackVars="None"
var s_linkTrackEvents="None"

/*if(! window.s_charSet) { 
	var s_charSet="ISO-8859-1";
	if (s_exp_account=="expedia28") {var s_charSet="SJIS"; }
}*/

//comented the lines above, and created these two lines, so that we have only JS file, and forcefully set the charset to UTF-8. Otherwise decodeURIComponent in s_vp_getCGI does not work with ISO.
var s_charSet="UTF-8";
if (s_exp_account=="expedia28") {var s_charSet="SJIS"; }

   //rolling out global rsid on emea first
    var globalRsids = ["expedia3",
		"expedia6",
		"expedia8",
		"expedia9",
		"expedia11",
		"expedia20",
		"expedia72",
		"expedia73",
		"expedia6-10122",
		"expedia30007-711",
		"expedia30007-712",
		"expedia30009-314",
		"expedia30035-327",
		"expedia30036-392",
		"expedia3mobile",
		"expedia6mobile",
		"expedia8mobile",
		"expedia9mobile",
		"expedia11mobile"]
	, devGlobalRsids = ["expedia3dev",
		"expedia6dev",
		"expedia8dev",
		"expedia9dev",
		"expedia11dev",
		"expedia20dev",
		"expedia72dev",
		"expedia73dev",
		"expedia6-10122dev",
		"expedia30007-711dev",
		"expedia30007-712dev",
		"expedia30009-314dev",
		"expedia30035-327dev",
		"expedia30036-392dev",
		"expedia3mobiledev",
		"expedia6mobiledev",
		"expedia8mobiledev",
		"expedia9mobiledev",
		"expedia11mobiledev"]
    , inGlobalRsid = false;
    
    for (var i = 0, max = globalRsids.length; i < max; i++) {
    	if (globalRsids[i] === s_exp_account) {
    		s_exp_account += ',expediaglobal';
    		inGlobalRsid = true;
    		break;
    	}
    }
    
    if (!inGlobalRsid) {
    	for (var i = 0, max = devGlobalRsids.length; i < max; i++) {
        	if (devGlobalRsids[i] === s_exp_account) {
        		s_exp_account += ',expediaglobaldev';
        		break;
        	}
        }
    }

/* Cookie Domain Periods */
s_cookieDomainPeriods="2"
s_fpCookieDomainPeriods="2"
var s_exp_d=window.location.hostname
if(s_exp_d.indexOf('.co.uk')>-1) { s_fpCookieDomainPeriods="3" }
if(s_exp_d.indexOf('.com.au')>-1) { s_fpCookieDomainPeriods="3" }
if(s_exp_d.indexOf('.co.jp')>-1) { s_fpCookieDomainPeriods="3" }
if(s_exp_d.indexOf('.co.in')>-1) { s_fpCookieDomainPeriods="3" }
if(s_exp_d.indexOf('.co.nz')>-1) { s_fpCookieDomainPeriods="3" }

/* Expedia file version */
s_prop50="G.20110910"

/*Fix prop1 escape lines in EU POS*/
s_prop1="";
/* s_prop1=s_prop1.replace(/\t/,"");
s_prop1=s_prop1.replace(/\n/,"");
s_prop1=s_prop1+"JoePlaceHolder";
prop1Pos=s_prop1.search(/JoePlaceHolder/)-1;
s_prop1=s_prop1.substring(0,prop1Pos); */

/*set eVar9=no DRR*/
function array_oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}
if(s_pageName in array_oc(['HTX_HOTDTLS','HTX_HOTDTLS_RATE_CHG','HTX_HOTDTLS_UPSL','HTX_HOTDTLS_UPSL_CHG','HTX_HOTDTLS_NEWUPSL','HTX_HOTDTLS_NEWUPSL_CHG','HTX_HOTDTLS_GDS','HTX_HOTDTLS_GDS_RATE_CHG','HTX_HOTVPAGE_OVER','HTX_HOTVPAGE_LOCA','HTX_HOTVPAGE_PROP','HTX_HOTVPAGE_ROOM','HTX_HOTVPAGE_PICS','HTX_HOTVPAGE_MEDIA','HTX_HOTVPAGE_RATECAL','HTX_HOTVPAGE_VTOUR','HTX_HOTVPAGE_REVIEW','HTX_HOTVPAGE_THEMES','HTX_CMBPAGE','HTX_CMBHOINF','HTX_CMBHOINF_OVER','HTX_CMBHOINF_LOCA','HTX_CMBHOINF_PROP','HTX_CMBHOINF_ROOM','HTX_CMBHOINF_PICS','HTX_CMBHOINF_VTOUR','HTX_CMBHOINF_MEDIA','HTX_CMBHOINF_REVIEW','HTX_CMBHOINF_THEMES','page.Hotels.Infosite.Information','page.Hotels.Infosite.Pictures','page.Hotels.Infosite.Maps','page.Hotels.Infosite.Details','page.Hotels.Infosite.Reviews','page.Hotels.Infosite.RoomsRates']) ) {
	if(s_eVar9 == undefined) {var s_eVar9 = 'No DRR message';}
	//if(s_eVar9 == ''){s_vpr('s_eVar9','No DRR message');}
}


function s_IsLikeMDP(e)
{
	if(e == '53-20'){return false;} // anyway EAPID
	if(e == '501-30038') { return false;} // hotels.com India
	if(e == '711-30007') { return false;} // Expedia.ie
	if(e == '712-30007') { return false;} // Expedia.be
	if(e == '327-30035') { return false;} // Expedia.no
	if(e == '327-30025') { return false;} // Expedia.no
	if(e == '392-30036') { return false;} // Expedia.dk
	if(e == '314-30009') { return false;} // Expedia.se
	if(e == '315-30009') { return false;} // Expedia.se
	if(e.substr(0,2) == '0-'){return false;}
	if(e.substr(e.length - 2,2) == '-1'){return false;} // ignore unspecified US partners
	return true;
}

function s_IsValidEAPID(e){
	var re = /\d+-\d+$/;
	return re.test(e);
}

function getTTC(t){
	// truncates email tracking code. used for E.com only
	if(t.indexOf('-segm') > -1){return t.substr(0,t.indexOf('-segm'));}
	else{return t}
}


/* Link Tracking Functions */
g_s_gsDelay=500
function s_exp_trackClick(linkObj,linkType,linkID) {
	if(linkType=="i"){
		// save in cookie for next page (future feature)
		return;
	}
	if(linkType=="e") {
		g_s_gsDelay=500
		s_trackExternalLinks=false; // used to avoid doublecounting
		s_linkTrackVars='prop16,eVar28'
		s_linkTrackEvents='None'
		s_vpr("s_prop16",linkID);
		s_vpr("s_eVar28",linkID);
		s_linkType='e';
		s_linkName='RFRR Exit Link';
		s_lnk=s_co(linkObj);
		s_gs(s_exp_account);
		return;
	}
	if(linkType=="a") {
		g_s_gsDelay=10
		s_linkTrackVars='prop16,eVar28'
		s_linkTrackEvents='None'
		s_vpr("s_prop16",linkID);
		s_vpr("s_eVar28",linkID);
		s_linkType='o';
		s_linkName='RFRR Action Link';
		s_lnk=s_co(linkObj);
		s_gs(s_exp_account);
		g_s_gsDelay=500
		return;
	}
}
/* End Link Tracking Functions */



/* Plugin Config */
var s_usePlugins=true
function s_doPlugins()
{
	var siteList;	// temp variable for logic limited to specific sites
	var tempVar;      // temp variable for query string parameter
	var tempVar2;      // temp variable for query string parameter
	var sPrefix;
	
	/* override referrer if needed */
	s_vp_getCGI("tempVar","origref");
	if (s_vp_getValue("tempVar"))	{
		s_vpr("s_referrer",s_vp_getValue("tempVar"));
	}
	
	/* server */
	s_vpr("s_server",document.domain);
	
	//Temporary fix for Utility bar AB tracking

/* 	if(typeof(utilityBarAB) != 'undefined' && utilityBarAB == 1) {
		if (!s_vp_getValue("s_prop34")) {
		s_vpr("s_prop34","975_1");
		s_vpr("s_eVar34","975_1");
		}else{
		s_vpr("s_prop34",s_prop34+"|975_1");
		s_vpr("s_eVar34",s_prop34+"|975_1");
		}
	} else {
		if (!s_vp_getValue("s_prop34")) {
		s_vpr("s_prop34","975_0");
		s_vpr("s_eVar34","975_0");
		}else{
		s_vpr("s_prop34",s_prop34+"|975_0");
		s_vpr("s_eVar34",s_prop34+"|975_0");
		}
	} */
	
	
	/* A-B pathing */
	if (!s_vp_getValue("s_prop34")) {
		s_vpr("s_prop34",(s_vp_getValue("s_pageName")));
	}
	
	/* Internal Campaigns */
	if (!s_vp_getValue("s_eVar11")) {
		tempVar = "";
		sPrefix = "MCH.";
		s_vp_getCGI("tempVar","mcicid");
		if (s_vp_getValue("tempVar") != "")	{
			s_vpr("s_eVar11",(sPrefix + s_vp_getValue("tempVar")));
		}
	}
	if (!s_vp_getValue("s_eVar11")) {
		tempVar = "";
		sPrefix = "PMI.";
		s_vp_getCGI("tempVar","pmicid");
		if (s_vp_getValue("tempVar") != "")	{
			s_vp_getMultiCGI("tempVar","pmicid,lnkloc",".");
			s_vpr("s_eVar11",(sPrefix + s_vp_getValue("tempVar")));
		}
	}

	// Other IntCmp variables
	s_vpr("s_eVar12",(s_vp_getValue("s_eVar11")));
	
	//Loyalty tracking
	if (!s_vp_getValue("s_eVar38")) {
		tempVar = "";
		sPrefix = "LYT.";
		s_vp_getCGI("tempVar","lytid");
		if (s_vp_getValue("tempVar") != "")	{
			s_vpr("s_eVar38",(sPrefix + s_vp_getValue("tempVar")));
		}
	}

	/** Marketing Channels **/

	/* E-mail campaigns */
	tempVar = "";
	sPrefix = "EML.";
	s_vp_getCGI("tempVar","emlcid");
	if (s_vp_getValue("tempVar") != "")
	{
		var ttc = getTTC(s_vp_getValue("tempVar"));
		s_vpr("s_eVar10","Direct");
		s_vpr("s_eVar13",(sPrefix + s_vp_getValue("tempVar")));
		s_vpr("s_eVar22",(sPrefix + ttc));
		bUseEAPID = false;
	}

	
	/* Affiliate campaigns */
	tempVar = "";
	sPrefix = "AFF.";
	s_vp_getCGI("tempVar","affcid");
	if (s_vp_getValue("tempVar") != "")
	{
		s_vp_getMultiCGI("tempVar","affcid,afflid",".");
		s_vpr("s_eVar10","Direct");
		s_vpr("s_eVar16",(sPrefix + s_vp_getValue("tempVar")));
		s_vpr("s_eVar22",(sPrefix + s_vp_getValue("tempVar")));

	}
	
	/* Affinity Marketing */
	tempVar = "";
	sPrefix = "AFM.";
	s_vp_getCGI("tempVar","afmcid");
	if (s_vp_getValue("tempVar") != "")
	{
		s_vp_getMultiCGI("tempVar","afmcid,lnkloc",".");
		s_vpr("s_eVar10","Direct");
		s_vpr("s_eVar22",(sPrefix + s_vp_getValue("tempVar")));

	}
	
	/* Off-line Advertising */
	tempVar = "";
	sPrefix = "OFF.";
	s_vp_getCGI("tempVar","offcid");
	if (s_vp_getValue("tempVar") != "")
	{
		s_vp_getMultiCGI("tempVar","offcid,lnkloc",".");
		s_vpr("s_eVar10","Direct");
		s_vpr("s_eVar22",(sPrefix + s_vp_getValue("tempVar")));

	}
	
	/* EAP campaigns (MSN, MDP, SEM) */
	
	/* ICM campaigns */
	tempVar = "";
	sPrefix = "ICM.";
	s_vp_getCGI("tempVar","icmcid");
	if (s_vp_getValue("tempVar") != "")
	{
		s_vpr("s_eVar22",(sPrefix + s_vp_getValue("tempVar")));
		s_vp_getMultiCGI("tempVar","icmcid,icmdtl,lnkloc",".");
		s_vpr("s_eVar10","Direct");
		s_vpr("s_eVar21",(sPrefix + s_vp_getValue("tempVar")));
		/* Clear eVar14 so VISTA rule does not fire */
		s_vpr("s_eVar14","");

	}

	/* Distribution Partner campaigns */
	tempVar = "";
	sPrefix = "MDP.";
	s_vp_getCGI("tempVar","mdpcid");
	if (s_vp_getValue("tempVar") != "")
	{
		s_vpr("s_eVar10","Direct");
		s_vpr("s_eVar22",(sPrefix + s_vp_getValue("tempVar")));
		s_vp_getMultiCGI("tempVar","mdpcid,mdpdtl,lnkloc",".");
		s_vpr("s_eVar14",(sPrefix + s_vp_getValue("tempVar")));
	}

	/* Search Engine Marketing campaigns */
	tempVar = "";
	sPrefix  = "SEM.";
	s_vp_getCGI("tempVar","semcid");
	if (s_vp_getValue("tempVar") != "")
	{
		s_vpr("s_eVar10","Direct");
		s_vpr("s_eVar22",(sPrefix + s_vp_getValue("tempVar")));
		/* Clear eVar14 so VISTA rule does not fire */
		s_vpr("s_eVar14","");
		s_vp_getMultiCGI("tempVar","semcid,kword,lnkloc",".");
		s_vpr("s_eVar15",(sPrefix + s_vp_getValue("tempVar")));

	}
	
	
	/* On-line Advertising campaigns */
	tempVar = "";
	sPrefix = "OLA.";
	s_vp_getCGI("tempVar","olacid");
	if (s_vp_getValue("tempVar") != "")
	{
		s_vpr("s_eVar10","Direct");
		s_vpr("s_eVar22",(sPrefix + s_vp_getValue("tempVar")));
		s_vp_getMultiCGI("tempVar","olacid,oladtl,lnkloc",".");
		s_vpr("s_eVar19",(sPrefix + s_vp_getValue("tempVar")));

	}
	
	//Brand tracking brandcid
	tempVar = "";
	sPrefix = "Brand.";
	s_vp_getCGI("tempVar","brandcid");
	if (s_vp_getValue("tempVar") != "")
	{
		s_vpr("s_eVar10","Direct");
		s_vpr("s_eVar22",(sPrefix + s_vp_getValue("tempVar")));

	}
	/* Non-campaign links */
	tempVar = "";
	sPrefix = "LNK.";
	s_vp_getCGI("tempVar","lnkcid");
	if (s_vp_getValue("tempVar") != "")
	{
		s_vp_getMultiCGI("tempVar","lnkcid,lnkloc",".");
		s_vpr("s_eVar1",(sPrefix + s_vp_getValue("tempVar")));

	}
	
	/* Other AllMkt variables */
	if(!s_vp_getValue("s_eVar22")){s_vpr("s_eVar22","")}
	//s_vpr("s_eVar23",s_vp_getValue("s_eVar22"));
	//s_vpr("s_eVar24",s_vp_getValue("s_eVar22"));
	/*s_vpr("s_eVar27",s_vp_getValue("s_eVar22"));
	s_vpr("s_campaign",s_vp_getValue("s_eVar22"));
	s_vpr("s_eVar1",s_vp_getValue("s_eVar22"));
	s_vpr("s_eVar33",s_vp_getValue("s_eVar22"));*/
	s_vpr("s_eVar27","D=v22");
	s_vpr("s_campaign","D=v22");
	s_vpr("s_eVar1","D=v22");
	s_vpr("s_eVar33","D=v22");
	
	
	/* rfrr IDs */
	tempVar = "";
	if (!s_vp_getValue("s_eVar28")) {
		s_vp_getCGI("tempVar","rfrr");
		if (!s_vp_getValue("tempVar") && s_vp_getValue("qscr_rfrr")) {
        	s_vpr("tempVar",s_vp_getValue("qscr_rfrr"));
    	}	
		if (s_vp_getValue("tempVar")) {
			s_vpr("s_eVar28",s_vp_getValue("tempVar"));
		}
	}
	s_vpr("s_prop16",s_vp_getValue("s_eVar28"));
	
	/* ThankYou Registrations */
	siteList=",devexpediacom,expedia1,expediaagent1,"
	if (siteList.indexOf(","+s_exp_account+",")>-1) {
		if (s_pageName == "HTX_AWD_ENROLL_CONF" && window.s_prop11) {
			var lst=s_vp_getValue('s_events');
			if(!lst) lst='';
			lst=s_apl(lst,'event10:'+s_prop11,',',1);
			s_vpr('s_events',lst);
		}
	}
	
	
	
	/* Search Results */
		
	// Search Type
	s_vp_getCGI("tempVar","qscr")
	tempVar = s_vp_getValue("tempVar")
	if (tempVar == "cmfd" || tempVar == "cmts") { tempVar = "cmsh"; }
	if (s_pageName == "HTX_COMBO_DESTINATION_DISAMBIG" || s_pageName == "HTX_CMBCARPS" || s_pageName == "HTX_CMBSRCH") { tempVar = ""; }
	var srchTypes=",fexp,flex,cars,cmsh,htwv,kruz,tshw,";
	if(srchTypes.indexOf(","+tempVar+",") > -1) {
		s_vpr("s_prop2",tempVar);
		s_vpr("s_eVar2",tempVar);

		// Origin prop3,eVar3
		var dairport = document.getElementById("dairportcode");
		s_vpr("tempVar2","");
		switch (tempVar) {
			case "fexp":
				s_vp_getCGI("tempVar2","city1"); break
			case "flex":
				s_vp_getCGI("tempVar2","city"); break
			case "cars":
				s_vp_getCGI("tempVar2","locn"); break
			case "cmsh":
				if(dairport){
					dairport = dairport.value;
					tempVar2 = "pkg:"+dairport.toLowerCase(); 
				}	else{
				tempVar2 = "NA";}
				break
				}
				if(tempVar!="cmsh")
					tempVar2=s_vp_getValue("tempVar2").toLowerCase();
				if(tempVar2){
					s_vpr("s_prop3",tempVar2); s_vpr("s_eVar3",tempVar2);
				}	else {
					if(tempVar!="cmsh")
						{s_vpr("s_prop3","NA"); s_vpr("s_eVar3","NA");}
				}

				// Destination prop4,eVar4
				var airportcode = document.getElementById("aairportcode");
				var regionid = document.getElementById("aregionid");
				s_vpr("tempVar2","");
				s_vpr("s_prop4","");s_vpr("s_eVar4","");
				switch (tempVar) {
			case "fexp":
				s_vp_getCGI("tempVar2","citd1"); break
			case "flex":
				s_vp_getCGI("tempVar2","citd"); break
			case "htwv":
				s_vp_getCGI("tempVar2","locn"); break
			case "cars":
				s_vp_getCGI("tempVar2","loc2");	
				if(!s_vp_getValue("tempVar2")) { s_vpr("tempVar2","Origin") }
				break
case "cmsh":
    if (!regionid) {
        s_vp_getCGI("regionid", "drid1");
        regionid = s_vp_getValue("regionid");
    }
    if (regionid) {
        var hotRegionId = document.Chtn;
        if (hotRegionId) {
            hotRegionId = hotRegionId.ridc;
            if (hotRegionId) {
                regionid = hotRegionId.options[hotRegionId.selectedIndex].value;
            } else {
                regionid = regionid.value;
            }
        } else {
            regionid = regionid.value;
        }
        if (airportcode) {
            airportcode = airportcode.value;
            tempVar2 = "pkg:" + airportcode.toLowerCase() + ":" + regionid.toLowerCase();
        }
        else {
            tempVar2 = "pkg:" + regionid.toLowerCase();
        }
    } else if (airportcode) {
        airportcode = airportcode.value;
        tempVar2 = "pkg:" + airportcode.toLowerCase();
    }
    else {
        tempVar2 = "";
    }
    break
			case "kruz":
				s_vp_getCGI("tempVar2","topd");	break
			case "tshw":
				s_vp_getCGI("tempVar2","locn")
				if(!s_vp_getValue("tempVar2")) { s_vp_getCGI("tempVar2","loid") }
				break
		}
		if(tempVar!="cmsh")
			tempVar2=s_vp_getValue("tempVar2").toLowerCase();
		if(tempVar2){
			s_vpr("s_prop4",tempVar2); s_vpr("s_eVar4",tempVar2);
		}	else {
			if(tempVar!="cmsh")
			{s_vpr("s_prop4","NA"); s_vpr("s_eVar4","NA");}
		}
		s_vpr("s_prop5","");s_vpr("s_eVar5","");
		s_vpr("s_prop6","");s_vpr("s_eVar6","");
		var datein = document.getElementById("checkindata");
		var dateout = document.getElementById("checkoutdata");
		var sArray;
		if (!datein) {
		    s_vp_getCGI("datein", "date1");
		    datein = s_vp_getValue("datein");
		    if (datein == "") {
		        s_vp_getCGI("datein", "ddpt1");
		        datein = s_vp_getValue("datein");
		    }
		}
		else {
		    datein = datein.value;
		}
		if (!dateout) {
		    s_vp_getCGI("dateout", "date2");
		    dateout = s_vp_getValue("dateout");
		    if (dateout == "") {
		        s_vp_getCGI("dateout", "drtn1");
		        dateout = s_vp_getValue("dateout");
		    }
		}
		else {
		    dateout = dateout.value;
		}
		if(datein != "" && dateout != "")
		{
			sArray = datein.split("/");
			var sDatein = new Date(sArray[2],(sArray[0]-1),sArray[1]);
			fArray = dateout.split("/");
			var sDateout = new Date(fArray[2],(fArray[0]-1),fArray[1]);
			var nowday = new Date();
			
			// the number of days between today and the day that  flight departs  prop5,eVar5
			s_vpr("tempVar2","");
			switch (tempVar) {
                case "fexp":
				case "cmsh":
					tempVar2 = parseInt(getDateNum(sDatein,nowday)); break
			}
			if(tempVar2){
				s_vpr("s_prop5",tempVar2); s_vpr("s_eVar5",tempVar2);
			}	else {
				s_vpr("s_prop5",""); s_vpr("s_eVar5","");
			}
			
			// the number of days from when the flight departs to  when it returns prop6,eVar6
			s_vpr("tempVar2","");
			switch (tempVar) {
			    case "fexp":
				case "cmsh":
				tempVar2 = parseInt(getDateNum(sDateout,sDatein)); break
			}
			if(tempVar2){
				s_vpr("s_prop6",tempVar2); s_vpr("s_eVar6",tempVar2);
			}	else {
				s_vpr("s_prop6",""); s_vpr("s_eVar6","");
			}
            }
			// Destination s_eVar48
			s_vpr("tempVar2",""); 
			var tempVar3 
			s_vpr("tempVar3",""); 		
			s_vpr("s_eVar48","NA");
			switch (tempVar) {
				case "cmsh":
					s_vp_getCGI("tempVar2","dcty"); 
					s_vp_getCGI("tempVar3","dnam");
					break
	            case "fexp":
	                s_vp_getCGI("tempVar2", "city1");
	                s_vp_getCGI("tempVar3", "citd1");
	                break
			}
			tempVar2=s_vp_getValue("tempVar2").toLowerCase();
			tempVar3 = s_vp_getValue("tempVar3").toLowerCase();
			if (!tempVar3 || tempVar3=="") {
			    s_vp_getCGI("tempVar3", "lsdt");
			    tempVar3 = s_vp_getValue("tempVar3").toLowerCase();
			}
			if (tempVar2 && tempVar3) {
			    if (tempVar == "cmsh")
			        s_vpr("s_eVar48", "Pkg:Orig:" + tempVar2 + "-Dest:" + tempVar3);
			    if (tempVar == "fexp")
			        s_vpr("s_eVar48", "Flt:Orig:" + tempVar2 + "-Dest:" + tempVar3);
			} else if (tempVar3) {
				s_vpr("s_eVar48","Pkg:"+tempVar3);
			}	else {
				s_vpr("s_eVar48","");
			}
		
		
	}

	/* pageName in conversion variables */
	s_vpr("s_eVar17",s_vp_getValue("s_pageName"));
	s_vpr("s_eVar18",s_vp_getValue("s_pageName"));
	
	setLPVandClickPast('event15','event16');
}
/* end s_doPlugins */
/* get the number between fDate and sDate */

function getDateNum(fDate,sDate) {
	fDate.setHours(0,0,0,0);
	sDate.setHours(0,0,0,0);
	var t = Math.abs(fDate.getTime()-sDate.getTime());
	var daynum = t/(1000*60*60*24);
	return daynum;
}

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/*
 * Function - read combined cookies v 0.1
 */
function s_c_r(k){
var d=new Date,v=s_c_rr(k),c=s_c_rr('s_pers'),i,m,e;if(v)return v;k=
s_ape(k);i=c.indexOf(' '+k+'=');c=i<0?s_c_rr('s_sess'):c;i=c.indexOf(
' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';',i);m=m>0?m:e
v=i<0?'':s_epa(c.substring(i+2+k.length,m<0?c.length:m));if(m>0&&m!=e)
if(parseInt(c.substring(m+1,e<0?c.length:e))<d.getTime()){d.setTime(
d.getTime()-60000);s_c_w(s_epa(k),'',d);v=''}return v}
/*
 * Function - write combined cookies v 0.1
 */
function s_c_w(k,v,e){
var d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,c,i,t
d.setTime(d.getTime()-60000);if(s_c_rr(k)) s_c_wr(k,'',d);k=s_ape(k)
pv=s_c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substring(0,i)+
pv.substring(pv.indexOf(';',i)+1);pc=1}sv=s_c_rr(sn);i=sv.indexOf(' '+
k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.indexOf(';',i)+1)
sc=1}d=new Date;if(e){if(e.getTime()>d.getTime()){pv+=' '+k+'='+s_ape(
v)+'|'+e.getTime()+';';pc=1}}else{sv+=' '+k+'='+s_ape(v)+';';sc=1}if(
sc) s_c_wr(sn,sv,0);if(pc){t=pv;while(t){var t1=parseInt(t.substring(
t.indexOf('|')+1,t.indexOf(';')));t=t.substring(t.indexOf(';')+1);ht=
ht<t1?t1:ht}d.setTime(ht);s_c_wr(pn,pv,d)}return v==s_c_r(s_epa(k))}
/*
 * Plugin: Get Plugin Modified Value
 */
function s_vp_getValue(vs)
	{var k=vs.substring(0,2)=='s_'?vs.substring(2):vs;return s_wd[
	's_vpm_'+k]?s_wd['s_vpv_'+k]:s_gg(k)}
/*
 * Plugin: Get Query String CGI Variable Value
 */
function s_vp_getCGI(vs,k)
	{
	var v='';
	
		if(k&&s_wd.location.search){
		var q=s_wd.location.search,qq=q.indexOf('?');
		q=qq<0?q:q.substring(qq+1);v=s_pt(q,'&',s_cgif,
		k.toLowerCase())
		}
		/*joe for secure rate details page redirects with POST method. Id query string is blank because of redirect stripped off, look for RFRR URL and get parameters from there*/
		else if(k&&s_wd.location.href.match('agent.dll')&&document.referrer.match('agent.dll')&&s_wd.location.search.substring(1)==''){
		var q=document.referrer.substring(document.referrer.indexOf("?")+1),qq=q.indexOf('?');
		q=qq<0?q:q.substring(qq+1);v=s_pt(q,'&',s_cgif,
		k.toLowerCase())
		}/*end joe*/
	
	s_vpr(vs,v)}function s_cgif(t,k){if(t){var te=
	t.indexOf('='),sk=te<0?t:t.substring(0,te),sv=te<0?'True':
	t.substring(te+1);if(sk.toLowerCase()==k)return decodeURIComponent(sv)}
	return ''}
/*
 * Plugin: Get Multiple Query String CGI Variable Values
 */
function s_vp_getMultiCGI(vs,ks,dli)
	{var s_fv='';if(ks.indexOf(",")>-1){while(ks.indexOf(",")>-1){t=
	gcgi(ks.substring(0,ks.indexOf(",")));if(t)s_fv=s_fv+dli+
	t;ks=ks.substring(ks.indexOf(",")+1,ks.length);
	if(ks.indexOf(",")<0){t=gcgi(ks);if(t)s_fv=s_fv+dli+
	gcgi(ks);}}}else s_fv=dli+gcgi(ks);
	s_vpr(vs,s_fv.substring(dli.length,s_fv.length));}function gcgi(k)
	{var v='';
		if(k&&s_wd.location.search){
		var q=s_wd.location.search.toLowerCase(),qq=q.indexOf('?');
		q=qq<0?q:q.substring(qq+1);v=s_pt(q,'&',s_cgif,k)
		}
		/*joe for secure rate details page redirects with POST method. Id query string is blank because of redirect stripped off, look for RFRR URL and get parameters from there*/
		else if(k&&s_wd.location.href.match('agent.dll')&&document.referrer.match('agent.dll')&&s_wd.location.search.substring(1)==''){
		var q=document.referrer.substring(document.referrer.indexOf("?")+1).toLowerCase(),qq=q.indexOf('?');
		q=qq<0?q:q.substring(qq+1);v=s_pt(q,'&',s_cgif,k)
		}/*end joe*/
	return v}
/*
 * Plugin: Get Value From Cookie
 */
function s_vp_getCookie(vs,k)
	{s_vpr(vs,s_c_r(k))}
/*
 * Plugin Utilities v2.0 (Required For All Plugins)
 */
function s_vpr(vs,v){if(s_wd[vs])s_wd[vs]=s_wd[vs];else s_wd[vs]=''
if(vs.substring(0,2) == 's_')vs=vs.substring(2);s_wd['s_vpv_'+vs]=v
s_wd['s_vpm_'+vs]=1}function s_dt(tz,t){var d=new Date;if(t)d.setTime(
t);d=new Date(d.getTime()+(d.getTimezoneOffset()*60*1000))
return new Date(Math.floor(d.getTime()+(tz*60*60*1000)))}
function s_vh_gt(k,v){var vh='|'+s_c_r('s_vh_'+k),vi=vh.indexOf('|'+v
+'='),ti=vi<0?vi:vi+2+v.length,pi=vh.indexOf('|',ti),t=ti<0?'':
vh.substring(ti,pi<0?vh.length:pi);return t}function s_vh_gl(k){var
vh=s_c_r('s_vh_'+k),e=vh?vh.indexOf('='):0;return vh?(vh.substring(0,
e?e:vh.length)):''}function s_vh_s(k,v){if(k&&v){var e=new Date,st=
e.getTime(),y=e.getYear(),c='s_vh_'+k,vh='|'+s_c_r(c)+'|',t=s_vh_gt(k,
v);e.setYear((y<1900?y+1900:y)+5);if(t)vh=s_rep(vh,'|'+v+'='+t+'|','|'
);if(vh.substring(0,1)=='|')vh=vh.substring(1);if(vh.substring(
vh.length-1,vh.length)=='|')vh=vh.substring(0,vh.length-1);vh=v
+'=[PCC]'+(vh?'|'+vh:'');s_c_w(c,vh,e);if(s_vh_gt(k,v)!='[PCC]')
return 0;vh=s_rep(vh,'[PCC]',st);s_c_w(c,vh,e)}return 1}

var g_s_gsDelayDefault = 500;
var g_s_gsDelay = g_s_gsDelayDefault;
function SetSGSDelay(c)
{
	g_s_gsDelay = c;
}
function ResetSGSDelay()
{
	SetSGSDelay(g_s_gsDelayDefault);
}

/*
 * Plugin: setLPVandClickPast 1.0 - set Landing Page View Event and 
 * Click Past Event
 */

function setLPVandClickPast(lpv,cp){
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1){return; }
clickThrough=s_c_r('clickThrough');
clickPast=s_c_r('clickPast');ckRfrrUrlPage1=s_c_r('ckRfrrUrlPage1');
ckRfrrUrlPage2=s_c_r('ckRfrrUrlPage2');currRfrrUrl=document.referrer; currRfrrUrl=currRfrrUrl.substring(0,35);
currURL=location.href; currURL=currURL.substring(0,35); domainName=window.location.hostname;
if (currRfrrUrl.match('/' + domainName + '/') && ckRfrrUrlPage2.match('/' + domainName + '/')){
return;}if (clickThrough=='' && clickPast=='') {var lst=s_vp_getValue('s_events');
if(!lst) lst='';lst=s_apl(lst,lpv,',',1);s_vpr('s_events',lst);s_c_w('ckRfrrUrlPage1',currRfrrUrl,0);
s_c_w('clickThrough','yes',0);return;} if (clickThrough!=='' && clickPast=='') {
if (currRfrrUrl == ckRfrrUrlPage1) { return;} if (currRfrrUrl.match('/' + domainName + '/')) {
var lst=s_vp_getValue('s_events');if(!lst) lst='';lst=s_apl(lst,cp,',',1);
s_vpr('s_events',lst);s_c_w('ckRfrrUrlPage2',currRfrrUrl,0);s_c_w('clickPast','yes',0);
return;} else{var lst=s_vp_getValue('s_events');if(!lst) lst='';lst=s_apl(lst,lpv,',',1);
s_vpr('s_events',lst);s_c_w('ckRfrrUrlPage1',currRfrrUrl,0);s_c_w('clickThrough','yes',0);
s_c_w('ckRfrrUrlPage2','',0);return;}} if (clickPast!==''){if (currRfrrUrl == ckRfrrUrlPage2) { 
return;} if (currRfrrUrl.match('/' + domainName + '/')) {var lst=s_vp_getValue('s_events');
if(!lst) lst='';lst=s_apl(lst,cp,',',1);s_vpr('s_events',lst);s_c_w('clickPast','yes',0);
s_c_w('ckRfrrUrlPage2',currRfrrUrl,0);return;}else{if ((currRfrrUrl!==''&&ckRfrrUrlPage1!=='')
&&(currRfrrUrl == ckRfrrUrlPage1)) {return;} var lst=s_vp_getValue('s_events');if(!lst) lst='';
lst=s_apl(lst,lpv,',',1);s_vpr('s_events',lst);s_c_w('clickThrough','yes',0);
s_c_w('ckRfrrUrlPage1',currRfrrUrl,0);s_c_w('ckRfrrUrlPage2','',0);return;}}}

/*
 * Plugin Utility: split v1.5
 */
function s_split(l,d){
var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;
a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a;}
 
/*
 * Plugin Utility: apl v1.1
 s*/
function s_apl(L,v,d,u){
var m=0;if(!L) L='';if(u){var i,n,a=s_split(L,d);for(i=0;i<a.length;i++){
n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)
L=L?L+d+v:v;return L;}
 
 

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_linkType,s_linkName,s_objectID,s_un,s_ios=0,s_q='',s_code='',
code='',s_bcr=0,s_lnk='',s_eo='',s_vb,s_pl,s_tfs=0,s_etfs=0,s_wd=
window,s_d=s_wd.document,s_ssl=(s_wd.location.protocol.toLowerCase(
).indexOf('https')>=0),s_n=navigator,s_u=s_n.userAgent,s_apn=
s_n.appName,s_v=s_n.appVersion,s_apv,s_i,s_ie=s_v.indexOf('MSIE '),
s_ns6=s_u.indexOf('Netscape6/'),s_em=0;if(s_v.indexOf('Opera')>=0||
s_u.indexOf('Opera')>=0)s_apn='Opera';var s_isie=(s_apn==
'Microsoft Internet Explorer'),s_isns=(s_apn=='Netscape'),s_isopera=(
s_apn=='Opera'),s_ismac=(s_u.indexOf('Mac')>=0);if(s_ie>0){s_apv=
parseInt(s_i=s_v.substring(s_ie+5));if(s_apv>3)s_apv=parseFloat(s_i)}
else if(s_ns6>0)s_apv=parseFloat(s_u.substring(s_ns6+10));else s_apv=
parseFloat(s_v);if(String.fromCharCode){s_i=escape(
String.fromCharCode(256)).toUpperCase();s_em=(s_i=='%C4%80'?2:(s_i==
'%U0100'?1:0))}function s_fl(s,l){return s?(s+'').substring(0,l):s}
function s_co(o){if(!o)return o;var n=new Object,x;for(x in o)if(
x.indexOf("select")<0&&x.indexOf("filter")<0)n[x]=o[x];return n}
function s_num(x){var s=x.toString(),g='0123456789',p,d
for(p=0;p<s.length;p++){d=s.substring(p,p+1);if(g.indexOf(d)<0)
return 0}return 1}function s_rep(s,o,n){var i=s.indexOf(o),l=n.length>
0?n.length:1;while(s&&i>=0){s=s.substring(0,i)+n+s.substring(i
+o.length);i=s.indexOf(o,i+l)}return s}function s_ape(x){var i;x=x?
s_rep(escape(''+x),'+','%2B'):x;if(x&&s_gg('charSet')&&s_em==1&&
x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++
if(('89ABCDEFabcdef').indexOf(x.substring(i,i+1))>=0)
return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}
return x}function s_epa(s){return s?unescape(s_rep(''+s,'+',' ')):s}
function s_pt(s,d,f,a){var t=s,x=0,y,r;while(t){y=t.indexOf(d);y=y<0?
t.length:y;t=t.substring(0,y);r=f(t,a);if(r)return r;x+=y+d.length;t=
s.substring(x,s.length);t=x<s.length?t:''}return ''}function s_isf(t,a
){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2
)=='s_')t=t.substring(2);return (t!=''&&t==a)}function s_fsf(t,a){if(
s_pt(a,',',s_isf,t))s_fsg+=(s_fsg!=''?',':'')+t;return 0}var s_fsg
function s_fs(s,f){s_fsg='';s_pt(s,',',s_fsf,f);return s_fsg}var
s_c_d='';function s_c_gdf(t,a){if(!s_num(t))return 1;return 0}
function s_c_gd(){var d=s_wd.location.hostname,n=s_gg(
'cookieDomainPeriods'),p;if(d&&!s_c_d){n=n?parseInt(n):2;n=n>2?n:2;p=
d.lastIndexOf('.');while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}
s_c_d=p>0&&s_pt(d,'.',s_c_gdf,0)?d.substring(p):''}return s_c_d}
function s_c_rr(k){k=s_ape(k);var c=' '+s_d.cookie,s=c.indexOf(' '+k
+'='),e=s<0?s:c.indexOf(';',s),v=s<0?'':s_epa(c.substring(s+2
+k.length,e<0?c.length:e));return v!='[[B]]'?v:''}function s_c_wr(k,v,e
){var d=s_c_gd(),l=s_gg('cookieLifetime'),s;v=''+v;l=l?(''+l
).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){s=(v!=''?parseInt(l?
l:0):-60);if(s){e=new Date;e.setTime(e.getTime()+(s*1000))}}if(k&&l!=
'NONE'){s_d.cookie=k+'='+s_ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!=
'SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'')
return s_c_r(k)==v}return 0}function s_cet(f,a,et,oe,fb){var r,d=0
/*@cc_on@if(@_jscript_version>=5){try{return f(a)}catch(e){return et(e)}d=1}@end@*/
if(
!d){if(s_ismac&&s_u.indexOf('MSIE 4')>=0)return fb(a);else{s_wd.s_oe=
s_wd.onerror;s_wd.onerror=oe;r=f(a);s_wd.onerror=s_wd.s_oe;return r}}}
function s_gtfset(e){return s_tfs}function s_gtfsoe(e){s_wd.onerror=
s_wd.s_oe;s_etfs=1;var code=s_gs(s_un);if(code)s_d.write(code);s_etfs=
0;return true}function s_gtfsfb(a){return s_wd}function s_gtfsf(w){var
p=w.parent,l=w.location;s_tfs=w;if(p&&p.location!=l&&p.location.host==
l.host){s_tfs=p;return s_gtfsf(s_tfs)}return s_tfs}function s_gtfs(){
if(!s_tfs){s_tfs=s_wd;if(!s_etfs)s_tfs=s_cet(s_gtfsf,s_tfs,s_gtfset,
s_gtfsoe,s_gtfsfb)}return s_tfs}function s_ca(un){un=un.toLowerCase()
var ci=un.indexOf(','),fun=ci<0?un:un.substring(0,ci),imn='s_i_'+fun
if(s_d.images&&s_apv>=3&&!s_isopera&&(s_ns6<0||s_apv>=6.1)){s_ios=1
if(!s_d.images[imn]&&(!s_isns||(s_apv<4||s_apv>=5))){s_d.write('<im'
+'g name="'+imn+'" height=1 width=1 border=0 alt="">');if(!s_d.images[
imn])s_ios=0}}}function s_it(un){s_ca(un)}function s_mr(un,sess,q,ta){
un=un.toLowerCase();var ci=un.indexOf(','),fun=ci<0?un:un.substring(0,
ci),unc=s_rep(fun,'_','-'),imn='s_i_'+fun,ns=s_gg('visitorNamespace'),
im,b,e,rs='http'+(s_ssl?'s':'')+'://'+(s_ssl?'oms':'om')+'.expedia.com/b/ss/'+un+'/1/G.9p2/'
+sess+'?[AQB]&ndh=1'+(q?q:'')+(s_q?s_q:'')+'&[AQE]';if(s_ios){im=s_wd[
imn]?s_wd[imn]:s_d.images[imn];if(!im)im=s_wd[imn]=new Image;im.src=rs
if(rs.indexOf('&pe=')>=0&&(!ta||ta=='_self'||ta=='_top'||(s_wd.name&&
ta==s_wd.name))){b=e=new Date;while(e.getTime()-b.getTime()<g_s_gsDelay)e=
new Date}return ''}return '<im'+'g sr'+'c="'+rs
+'" width=1 height=1 border=0 alt="">'}function s_gg(v){var g='s_'+v
return s_wd[g]||s_wd.s_disableLegacyVars?s_wd[g]:s_wd[v]}
function s_gv(v){return s_wd['s_vpm_'+v]?s_wd['s_vpv_'+v]:s_gg(v)}var
s_qav='';function s_havf(t,a){var b=t.substring(0,4),s=t.substring(4),
n=parseInt(s),k='s_g_'+t,m='s_vpm_'+t,q=t,v=s_gg('linkTrackVars'),e=
s_gg('linkTrackEvents');if(!s_wd['s_'+t])s_wd['s_'+t]='';s_wd[k]=s_gv(
t);if(s_lnk||s_eo){v=v?v+',pageName,pageURL,referrer,vmk,charSet,visi'
+'torNamespace,cookieDomainPeriods,cookieLifetime,currencyCode,purcha'
+'seID':'';if(v&&!s_pt(v,',',s_isf,t))s_wd[k]='';if(t=='events'&&e)
s_wd[k]=s_fs(s_wd[k],e)}s_wd[m]=0;if(t=='pageURL')q='g';else if(t==
'referrer')q='r';else if(t=='vmk')q='vmt';else if(t=='charSet'){q='ce'
if(s_wd[k]&&s_em==2)s_wd[k]='UTF-8'}else if(t=='visitorNamespace')q=
'ns';else if(t=='cookieDomainPeriods')q='cdp';else if(t==
'cookieLifetime')q='cl';else if(t=='currencyCode')q='cc';else if(t==
'channel')q='ch';else if(t=='campaign')q='v0';else if(s_num(s)){if(b==
'prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='hier'){q='h'+n
s_wd[k]=s_fl(s_wd[k],255)}}if(s_wd[k]&&t!='linkName'&&t!='linkType')
s_qav+='&'+q+'='+s_ape(s_wd[k]);return ''}function s_hav(){var n,av=
'vmk,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,page'
+'Name,pageURL,referrer,channel,server,pageType,campaign,state,zip,ev'
+'ents,products,currencyCode,purchaseID,linkName,linkType'
for(n=1;n<51;n++)av+=',prop'+n+',eVar'+n+',hier'+n;s_qav='';s_pt(av,
',',s_havf,0);return s_qav}function s_lnf(t,h){t=t?
t.toLowerCase():'';h=h?h.toLowerCase():'';var te=t.indexOf('=');if(t&&
te>0&&h.indexOf(t.substring(te+1))>=0)return t.substring(0,te)
return ''}function s_ln(h){if(s_gg('linkNames'))return s_pt(s_gg(
'linkNames'),',',s_lnf,h);return ''}function s_ltdf(t,h){t=t?
t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=
0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)
return 1;return 0}function s_ltef(t,h){t=t?t.toLowerCase():'';h=h?
h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0}
function s_lt(h){var lft=s_gg('linkDownloadFileTypes'),lef=s_gg(
'linkExternalFilters'),lif=s_gg('linkInternalFilters')?s_gg(
'linkInternalFilters'):s_wd.location.hostname;h=h.toLowerCase();if(
s_gg('trackDownloadLinks')&&lft&&s_pt(lft,',',s_ltdf,h))return 'd';if(
s_gg('trackExternalLinks')&&(lef||lif)&&(!lef||s_pt(lef,',',s_ltef,h)
)&&(!lif||!s_pt(lif,',',s_ltef,h)))return 'e';return ''}function s_lc(
e){s_lnk=s_co(this);s_gs('');s_lnk='';if(this.s_oc)return this.s_oc(e)
return true}function s_ls(){var l,ln,oc
for(ln=0;ln<s_d.links.length;ln++){l=s_d.links[ln];oc=l.onclick?
l.onclick.toString():'';if(oc.indexOf("s_gs(")<0&&oc.indexOf("s_lc(")<
0){l.s_oc=l.onclick;l.onclick=s_lc}}}function s_bc(e){s_eo=
e.srcElement?e.srcElement:e.target;s_gs('');s_eo=''}function s_ot(o){
var a=o.type,b=o.tagName;return (a&&a.toUpperCase?a:b&&b.toUpperCase?b
:o.href?'A':'').toUpperCase()}function s_oid(o){var t=s_ot(o),p=
o.protocol,c=o.onclick,n='',x=0;if(!o.s_oid){if(o.href&&(t=='A'||t==
'AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=o.href
else if(c){n=s_rep(s_rep(s_rep(s_rep(c.toString(),"\r",''),"\n",''),
"\t",''),' ','');x=2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=
o.value;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s_fl(n,100
);o.s_oidt=x}}return o.s_oid}function s_rqf(t,un){var e=t.indexOf('='
),u=e>=0?','+t.substring(0,e)+',':'';return u&&u.indexOf(','+un+',')>=
0?s_epa(t.substring(e+1)):''}function s_rq(un){var c=un.indexOf(','),
v=s_c_r('s_sq'),q='';if(c<0)return s_pt(v,'&',s_rqf,un);return s_pt(
un,',',s_rq,0)}var s_sqq,s_squ;function s_sqp(t,a){var e=t.indexOf('='
),q=e<0?'':s_epa(t.substring(e+1));s_sqq[q]='';if(e>=0)s_pt(
t.substring(0,e),',',s_sqs,q);return 0}function s_sqs(un,q){s_squ[un]=
q;return 0}function s_sq(un,q){s_sqq=new Object;s_squ=new Object
s_sqq[q]='';var k='s_sq',v=s_c_r(k),x,c=0;s_pt(v,'&',s_sqp,0);s_pt(un,
',',s_sqs,q);v='';for(x in s_squ)s_sqq[s_squ[x]]+=(s_sqq[s_squ[x]]?','
:'')+x;for(x in s_sqq)if(x&&s_sqq[x]&&(x==q||c<2)){v+=(v?'&':'')
+s_sqq[x]+'='+s_ape(x);c++}return s_c_w(k,v,0)}function s_wdl(e){
s_wd.s_wd_l=1;var r=true;if(s_wd.s_ol)r=s_wd.s_ol(e);if(s_wd.s_ls)
s_wd.s_ls();return r}function s_wds(un){un=un.toLowerCase()
s_wd.s_wd_l=1;if(s_apv>3&&(!s_isie||!s_ismac||s_apv>=5)){s_wd.s_wd_l=0
if(!s_wd.s_unl)s_wd.s_unl=new Array;s_wd.s_unl[s_wd.s_unl.length]=un
if(s_d.body&&s_d.body.attachEvent){if(!s_wd.s_bcr&&
s_d.body.attachEvent('onclick',s_bc))s_wd.s_bcr=1}else if(s_d.body&&
s_d.body.addEventListener){if(!s_wd.s_bcr&&s_d.body.addEventListener(
'click',s_bc,false))s_wd.s_bcr=1}else{if(!s_wd.s_olr){s_wd.s_ol=
s_wd.onload;s_wd.onload=s_wdl}s_wd.s_olr=1}}}function s_iepf(i,a){if(
i.substring(0,1)!='{')i='{'+i+'}';if(s_d.body.isComponentInstalled(i,
'ComponentID')){var n=s_pl.length;s_pl[n]=new Object;s_pl[n].name=i
+':'+s_d.body.getComponentVersion(i,'ComponentID')}return 0}
function s_vs(un,x){var s=s_gg('visitorSampling'),g=s_gg(
'visitorSamplingGroup'),k='s_vsn_'+un+(g?'_'+g:''),n=s_c_r(k),e=
new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(s){s*=100
if(!n){if(!s_c_w(k,x,e))return 0;n=x}if(n%10000>s)return 0}return 1}
function s_dyasmf(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0}
function s_dyasf(t,m){var i=t?t.indexOf('='):-1,un,s;if(i>=0&&m){var
un=t.substring(0,i),s=t.substring(i+1);if(s_pt(s,',',s_dyasmf,m))
return un}return 0}function s_dyas(un,l,m){if(!m)m=s_wd.location.host
if(!m.toLowerCase)m=m.toString();l=l.toLowerCase();m=m.toLowerCase()
var nun=s_pt(l,';',s_dyasf,m);if(nun)return nun;return un}
function s_gs(un){un=un.toLowerCase();var dyas=s_gg(
'dynamicAccountSelection'),dyal=s_gg('dynamicAccountList'),dyam=s_gg(
'dynamicAccountMatch');if(dyas&&dyal)un=s_dyas(un,dyal,dyam);s_un=un
var trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()
*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/
10800000)%10+sed,yr=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'
+(yr<1900?yr+1900:yr)+' '+tm.getHours()+':'+tm.getMinutes()+':'
+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tfs=
s_gtfs(),vt,ta='',q='',qs='';if(!s_q){var tl=tfs.location,s='',c='',v=
'',p='',bw='',bh='',j='1.0',k=s_c_w('s_cc','true',0)?'Y':'N',hp='',ct=
'',iepl=s_gg('iePlugins'),pn=0,ps;if(s_apv>=4)s=screen.width+'x'
+screen.height;if(s_isns||s_isopera){if(s_apv>=3){j='1.1';v=
s_n.javaEnabled()?'Y':'N';if(s_apv>=4){j='1.2';c=screen.pixelDepth;bw=
s_wd.innerWidth;bh=s_wd.innerHeight;if(s_apv>=4.06)j='1.3'}}s_pl=
s_n.plugins}else if(s_isie){if(s_apv>=4){v=s_n.javaEnabled()?'Y':'N'
j='1.2';c=screen.colorDepth;if(s_apv>=5){bw=
s_d.documentElement.offsetWidth;bh=s_d.documentElement.offsetHeight;j=
'1.3';if(!s_ismac&&s_d.body){s_d.body.addBehavior("#default#homePage")
hp=s_d.body.isHomePage(tl)?"Y":"N";s_d.body.addBehavior(
"#default#clientCaps");ct=s_d.body.connectionType;if(iepl){s_pl=
new Array;s_pt(iepl,',',s_iepf,'')}}}}else r='';if(!s_pl&&iepl)s_pl=
s_n.plugins}if(s_pl)while(pn<s_pl.length&&pn<30){ps=s_fl(s_pl[pn
].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s_q=(s?'&s='+s_ape(s):''
)+(c?'&c='+s_ape(c):'')+(j?'&j='+j:'')+(v?'&v='+v:'')+(k?'&k='+k:'')+(
bw?'&bw='+bw:'')+(bh?'&bh='+bh:'')+(ct?'&ct='+s_ape(ct):'')+(hp?'&hp='
+hp:'')+(s_vb?'&vb='+s_vb:'')+(p?'&p='+s_ape(p):'')}if(s_gg(
'usePlugins'))s_wd.s_doPlugins();var l=s_wd.location,r=
tfs.document.referrer;if(!s_gg("pageURL"))s_wd.s_pageURL=s_fl(l?l:'',
255);if(!s_gg("referrer"))s_wd.s_referrer=s_fl(r?r:'',255);if(s_lnk||
s_eo){var o=s_eo?s_eo:s_lnk;if(!o||o.tagName == 'shape')return '';var p=s_gv('pageName'),w=
1,t=s_ot(o),n=s_oid(o),x=o.s_oidt,h,l,i,oc;if(s_eo&&o==s_eo){while(o&&
!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)
return '';t=s_ot(o);n=s_oid(o);x=o.s_oidt}oc=o.onclick?
o.onclick.toString():'';if(oc.indexOf("s_gs(")>=0)return ''}ta=
o.target;h=o.href?o.href:'';i=h.indexOf('?');h=s_gg(
'linkLeaveQueryString')||i<0?h:h.substring(0,i);l=s_gg('linkName')?
s_gg('linkName'):s_ln(h);t=s_gg('linkType')?s_gg('linkType'
).toLowerCase():s_lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?
s_ape(t):'o')+(h?'&pev1='+s_ape(h):'')+(l?'&pev2='+s_ape(l):'');else
trk=0;if(s_gg('trackInlineStats')){if(!p){p=s_gv('pageURL');w=0}t=
s_ot(o);i=o.sourceIndex;if(s_gg('objectID')){n=s_gg('objectID');x=1;i=
1}if(p&&n&&t)qs='&pid='+s_ape(s_fl(p,255))+(w?'&pidt='+w:'')+'&oid='
+s_ape(s_fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s_ape(t)+(i?'&oi='+i:'')}
}if(!trk&&!qs)return '';if(trk)q=(vt?'&t='+s_ape(vt):'')+s_hav()+q
s_wd.s_linkName=s_wd.s_linkType=s_wd.s_objectID=s_lnk=s_eo='';if(
!s_wd.s_disableLegacyVars)s_wd.linkName=s_wd.linkType=s_wd.objectID=''
var code='';if(un){if(trk&&s_vs(un,sed))code+=s_mr(un,sess,q+(qs?qs:
s_rq(un)),ta);s_sq(un,trk?'':qs)}else if(s_wd.s_unl)
for(var unn=0;unn<s_wd.s_unl.length;unn++){un=s_wd.s_unl[unn];if(trk&&
s_vs(un,sed))code+=s_mr(un,sess,q+(qs?qs:s_rq(un)),ta);s_sq(un,trk?'':
qs)}return code}function s_dc(un){un=un.toLowerCase();var dyas=s_gg(
'dynamicAccountSelection'),dyal=s_gg('dynamicAccountList'),dyam=s_gg(
'dynamicAccountMatch');if(dyas&&dyal)un=s_dyas(un,dyal,dyam);s_wds(un)
s_ca(un);return s_gs(un)}
s_code=s_dc(s_exp_account);if(s_code)s_d.write(s_code)