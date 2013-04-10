//Google Analytics
//btg.config.ReportSettings.GoogleAnalytics.enabled = true;
//btg.config.ReportSettings.GoogleAnalytics.account = sw.envConfig.googleAnalyticsAcct;
//Hack to get GA to track page load times until CODA supports it
//var _gaq = _gaq || [];
//_gaq.push(['_trackPageLoadTime']);

// Also see omnitureTracking.tag for initialization of Omniture related variables.
//convesion of advertisement setupt tag vars to btg vars
if(!/mobile/.test(self.location.href)){
    btg.config.DoubleClick['dartSite'] = sw.adSettings.DoubleClickDartSite;
    btg.config.DoubleClick['positionThreshold'] = sw.adSettings.DoubleClickPositionThreshold;
    btg.config.DoubleClick['sections'] = sw.adSettings.DoubleClickSections;
    btg.config.DoubleClick['keyValues'] = sw.adSettings.DoubleClickKeyValues;
    btg.config.DoubleClick['autoDcopt'] = sw.adSettings.DoubleClickAutoDcopt;
}

// Coda config overrides
btg.config.Omniture.dynamicAccountList += ",spicy,shiva,adam,grognard";
btg.config.Omniture.trackExternalLinks = true;
btg.config.Omniture.percentPageViewedVarMap = {
	previousPage:"prop21",
	percentage:"prop24"
};

// omniCookie is used for temporary storage and next page tracking of Omniture variables
var omniCookie =  btg.Cookie.read( "swOmni" );
if( omniCookie ){
    omniCookie = ( btg.JSON.parse(  omniCookie ) );
	btg.Cookie.remove( "swOmni" );
	//  if pageOmniVars has events and omniCookie has events then we need to concatinate two comma delimited lists
	//  and delete the value in omniCookie before it is copied to pageOmniVars
	if ( pageOmniVars.events && omniCookie.events ) {
		pageOmniVars.events += "," + omniCookie.events;
		omniCookie.events = "";
	}
	// copy omni cookie into Omniture Page Variables Object
	btg.Object.copyProperties(omniCookie, pageOmniVars, true);
}

var hierarchy=gameType+"/"+primaryCategory+"/"+gameID;
pageOmniVars.pageName = location.pathname;
pageOmniVars.hier1 = hierarchy;
pageOmniVars.channel = primaryCategory;
pageOmniVars.prop1 = gameID;
pageOmniVars.prop2 = isFacebookConnected ? loginState + '_facebook' :  loginState;
if (gameType=="club"){
	pageOmniVars.prop4 = gameID;
}else if (gameType=="non-club"){
	pageOmniVars.prop5 = gameID;
}
pageOmniVars.prop6 = categoryList;
pageOmniVars.prop7 = queryString("q");
if (tokenType=="token"){
	pageOmniVars.prop8 = gameID;
}else if (tokenType=="non-token"){
	pageOmniVars.prop9 = gameID;
}
if (trophyType=="trophy"){
	pageOmniVars.prop10 = gameID;
}else if (trophyType=="non-trophy"){
	pageOmniVars.prop11 = gameID;
}
pageOmniVars.prop13 = userInfo.creationDateInDays;
pageOmniVars.prop14 = userInfo.gender;
pageOmniVars.prop15 = userInfo.daysSinceLastLogin;
pageOmniVars.prop16 = userInfo.memberId;
pageOmniVars.prop18 = userInfo.birthDateInDays;

var sw_gameRecs = function(){
	var csGameReco = choicestreamRecs.getGroup() == 'choicestream';

	if( recommendedGamesServed ){
        if( csGameReco ){
            if ( downloadGame ) {
			    pageOmniVars.events ? pageOmniVars.events += ",event41,event22" : pageOmniVars.events = "event41,event22";
            } else {
                pageOmniVars.events ? pageOmniVars.events += ",event41" : pageOmniVars.events = "event41";
            }
		} else {
            if ( downloadGame ) {
                pageOmniVars.events ? pageOmniVars.events += ",event33" : pageOmniVars.events = "event33";
            } else {
                pageOmniVars.events ? pageOmniVars.events += ",event18" : pageOmniVars.events = "event18";
            }
		}
	}
}
pageOmniVars.pageType = pageType;
pageOmniVars.campaign = queryString("extcmp");
//if the campaign variable isn't alredy set by extcmp then check for fb_ref and set
if ( !pageOmniVars.campaign ){
	pageOmniVars.campaign = queryString("fb_ref");
}
pageOmniVars.eVar17 = pageOmniVars.campaign;

//Tracking autoLoginSuccess with a cookie because the session variable was getting lost with SWU login redirect --%>
var autoLoginSuccess = false;
if(btg.Cookie.read('autoLoginSuccess') == '1'){
	autoLoginSuccess = true;
	btg.Cookie.set('autoLoginSuccess', null, null, '/', 'shockwave.com');
}

if( autoLoginSuccess ){
	pageOmniVars.events ? pageOmniVars.events += ",event7,event8,event20" : pageOmniVars.events = "event7,event8,event20";
	pageOmniVars.eVar9 = isFacebookConnected ? loginState + '_facebook' :  loginState;
	pageOmniVars.eVar12 = userInfo.memberId;
	pageOmniVars.eVar20 = userInfo.creationDateInDays;
	pageOmniVars.eVar21 = userInfo.gender;
	pageOmniVars.eVar22 = userInfo.birthDateInDays;
}

// Set variables to be sent with real page calls here.
pageOmniVars.eVar13 = location.pathname;

// set event1 on gamepages when we see a gameID unless:
// 1. clubgame and not signed in or signed in standard (this means upsell page)
//// 2. Download only game
if( gameID && (pageGroup != "download") && ( (gameType != "club") || ( (gameType == "club") && (userInfo.signedInState != "SignedInStandard") && (userInfo.signedInState != "NotSignedIn") ) ) ){
	pageOmniVars.events ? pageOmniVars.events += ",event1" : pageOmniVars.events = "event1";
}
// URL based analytics variables
// prop26 = form progression path
if ( location.pathname.indexOf("/about/privacyPolicy.jsp") == 0 ) { pageOmniVars.prop26 = location.pathname; }
if ( location.pathname.indexOf("/about/terms.jsp") == 0 ) { pageOmniVars.prop26 = location.pathname; }
if ( location.pathname.indexOf("/forgotPassword.jsp") == 0 ) { pageOmniVars.prop26 = location.pathname; }
// unlink facebook account
if ( location.pathname.indexOf("/member/removeFacebookConnectConfirm.jsp") == 0 ) {
	pageOmniVars.events ? pageOmniVars.events += ",event6" : pageOmniVars.events = "event6";
}
// set up login page form tracking. This is for the non-modal login page
if ( location.pathname.indexOf("/memberLogin.jsp") == 0 ) {
	pageOmniVars.events ? pageOmniVars.events += ",event28" : pageOmniVars.events = "event28";
	pageOmniVars.eVar14 = 'memberLoginPage';
	pageOmniVars.prop26 = 'memberLoginPage';
}

//moved init and sendPageCall inside body tags
//btg.Controller.init();
//btg.Controller.sendPageCall();

function queryString(parameter) {
	var loc = location.search.substring(1, location.search.length);
	var param_value = false;
	var params = loc.split("&");
	for (i=0; i<params.length;i++) {
		param_name = params[i].substring(0,params[i].indexOf('='));
		if (param_name == parameter) {
			param_value = params[i].substring(params[i].indexOf('=')+1)
		}
	}
	if (param_value) {
		return param_value;
	}
	else {
		return false; //Here determine return if no parameter is found
	}
}
function gameDownload(gameID){
	btg.Controller.init();
	btg.Controller.sendPageCall( { pageName: location.pathname+"-download",prop25: gameID, events: 'event2' });
}
function sendLinkEvent(lnkname){
	sendAnalyticsEvent(null,lnkname);
}
function sendAnalyticsEvent(str,lnkname){
	try {
		if(btg.String.isDefined(lnkname)){
			obj = {};
			if(btg.String.isDefined(str)){
				obj.name=str;
				omniSetOverrides(obj, "append");
			}else{
				obj.name=btg.config.Omniture["account"];
				omniSetOverrides(obj, null);
			}
			delete obj;
			btg.Controller.init();
			btg.Controller.sendLinkEvent({linkType:"o",lnk:true,linkName:lnkname});
		}else{
			if(btg.String.isDefined(str))
				omniSetOverrides({name:str}, "append");
			else
				omniSetOverrides({name:btg.config.Omniture["account"]}, null);
			btg.Controller.init();
			btg.Controller.sendPageCall();
		}
	}
	catch(e){}
}
/**
 * Send a Custom Link Event to Omniture
 * Optionally send custom Omniture variables by passing
 * an object composed of Omniture names and values.
 * @param lnkname a required string for Omniture Custom Link
 * @param omniVarsObj an optional object for extra Omniture Variables
 */
function sendCustomLinkEvent( lnkname, omniVarsObj ){
	try{
		// check for lnkname
		if( !btg.String.isDefined( lnkname ) ){
			return false;
		}

		// check that omniVarsObj really is an object
		if( !btg.Object.isDefined( omniVarsObj ) ) {
			omniVarsObj = {};
		}

		omniVarsObj.linkType = "o";
		omniVarsObj.lnk = true;
		omniVarsObj.linkName = lnkname;

		clearDispatcher(); // does clearDispatcher need to be modified to clear other stuff like events and evars?
		btg.Controller.init();
		btg.Controller.sendLinkEvent( omniVarsObj );
	} catch(e) {}
}

function omniSetOverrides(or,acctNameAction){
	try{
		clearDispatcher();
		var ro = {};
		for(i in or){
			var tmpi=i.replace(/s_/,"");
			tmpi=(tmpi=="account")? "name" : tmpi;
			ro[tmpi]=or[i];

			if(tmpi=="name"){
				if(acctNameAction){
					if(acctNameAction=="append"){
						var pattern = new RegExp("^"+ro[tmpi]+"$|^"+ro[tmpi]+",|,"+ro[tmpi]+"$|,"+ro[tmpi]+",");
						if(!pattern.test(btg.config.Omniture["account"]))
							btg.config.Omniture["account"] += ',' + ro[tmpi];
					}else if(acctNameAction=="overwrite")
						btg.config.Omniture["account"] = ro[tmpi];
				}
				ro[tmpi]= btg.config.Omniture["account"];
			}
		}
		ro.dynamicAccountSelection = true;
		ro.dynamicAccountList = 'viashockwavedev=dev,qa,stage,relaunch-d,relaunch-q,localhost,sandbox,spicy,shiva,adam,grognard,cmillsga';
		ro.linkInternalFilters = 'javascript:,shockwave.com,facebook.com,digg.com';
		ro.trackExternalLinks = true;
		ro.trackDownloadLinks = false;
		if(btg.String.isDefined(btg.config.Omniture)) btg.config.Omniture.setAccountVars(ro);
	}catch(e){}
}
function clearDispatcher(){
	try {
		if(btg.String.isDefined(btg.config.Omniture)){
			btg.config.Omniture={
				name:'viashockwave',
				dynamicAccountSelection:true,
				dynamicAccountList:'viashockwavedev=dev,qa,stage,relaunch-d,relaunch-q,localhost,sandbox,spicy,shiva,adam,grognard,cmillsga',
				linkInternalFilters:'javascript:,shockwave.com,facebook.com,digg.com',
				trackExternalLinks: true,
				trackDownloadLinks: false
			};
			btg.config.Omniture["pageName"] = "";
			btg.config.Omniture["channel"] = "";
			btg.config.Omniture["hier1"] = "";
			for(var i=1; i<41; i++){
				btg.config.Omniture["prop"+i] = "";
				btg.reporting.omniture.Hcode["prop"+i] = "";
			}
		}
	} catch(e){}
}