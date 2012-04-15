/****Customer: Consumer Reports Health

/************ don't modify below this line *********

 *************  Version: OnExit 7.3 v.28 [compatible with triggerParams.js v.26] ***********

 ****** Copyright 2001-2008 ForeseeResults, Inc****/



foresee.popupURL = "//www.foreseeresults.com/survey/display";	//do not change this url

foresee.FSRImgURL= "//www.foreseeresults.com/survey/FSRImg"; 	//do not change this url

foresee.CSURL= "//www.foreseeresults.com/survey/processCPP"; 	//do not change this url

foresee.OTCImgURL = "//controller.foreseeresults.com/fsrSurvey/OTCImg";

foresee.fullURL="";

foresee.winOptions = "toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=1,height=1,top=4000,left=4000";

foresee.ckAlreadyShown = foresee.triggerParms["ascookie"];

foresee.ckLoyaltyCount = foresee.triggerParms["lfcookie"];

foresee.surveyPresentedBy = "normal";

foresee.dcQString="";

foresee.fsrTrackerImg=null;

foresee.OTCImg=null;

foresee.FSRImg=null;

foresee.rNum=null;

foresee.newDt=null;

foresee.currTime=null;	

foresee.runningscout=null;

foresee.scoutTracker=null;

foresee.trackerFromClick = false;

foresee.timeoutId=null;

foresee.fsrAbortTimer=false;

foresee.hParent = window.opener;

foresee.tempURL= null;

foresee.oeCounter=1;

foresee.fireBug = (typeof(console) == "undefined") ? false : true;

foresee.PROCESS_RSID=1;	/*action id to generate respondent*/

foresee.PROCESS_CPP=2;	/*action id to save CPPs*/

foresee.persistentExpires = new Date();

foresee.persistentExpires.setTime(foresee.persistentExpires.getTime() + (foresee.triggerParms["rw"]*60*1000));

foresee.detect = navigator.userAgent.toLowerCase();

foresee.version= navigator.appVersion.toLowerCase();

foresee.fsr_aol= ((foresee.detect.indexOf("aol") >=0) || (foresee.detect.indexOf("america online browser") >=0)) ? 1 : 0;

foresee.fsr_opera = (foresee.detect.indexOf("opera") >=0) ? 1 : 0;

foresee.fsr_NS = ((foresee.detect.indexOf("netscape") >=0) || (foresee.detect.indexOf("firefox") >=0)) ? 1 : 0;

foresee.fsr_NS8=(foresee.detect.indexOf("netscape/8") >=0) ? 1 : 0;	

foresee.fsr_NS70=(foresee.detect.indexOf("netscape") >= 0 && foresee.detect.indexOf("7.0") >= 0) ? 1 : 0;

foresee.fsr_NS62=(foresee.detect.indexOf("netscape") >= 0 && foresee.detect.indexOf("6.2") >= 0) ? 1 : 0;

foresee.fsr_mac= (navigator.platform.indexOf("Win32") < 0) ? 1 : 0;

foresee.fsr_safari=(foresee.detect.indexOf("safari") >=0) ? 1 : 0;

foresee.fsr_safari_2_x=(foresee.fsr_mac && foresee.detect.indexOf("safari") >=0 && foresee.detect.indexOf("412") >= 0) ? 1 : 0;

foresee.fsr_ie=(foresee.detect.indexOf("msie")>=0 && foresee.version.indexOf("win") != -1) ? 1 :0;

foresee.fsr_ie5=(foresee.detect.indexOf("msie 5")>=0 && foresee.version.indexOf("win") != -1) ? 1 :0;

foresee.fsr_sp2=(navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf('sp2') != -1) ? 1 : 0

if (typeof(foresee.triggerParms["domain"]) == "undefined") foresee.triggerParms["domain"]= document.domain;

if (foresee.fsr_safari || (foresee.fsr_ie && foresee.fsr_sp2)) foresee.triggerParms["sMode"] = 0;

foresee.triggerParms["dhtmlLeft"]=0;

foresee.triggerParms["dhtmlTop"]=0;



foresee.cppUrlPatch= function cppUrlPatch(s) {

	var translated = "";

	var i; 

	var found = 0;

	for(i = 0; (found = s.indexOf(':', found)) != -1; ) {

		translated += s.substring(i, found) + "|";

		i = found + 1;

		found++;

	}

	translated += s.substring(i, s.length);

	return translated;

}

foresee.specialEscape = function specialEscape(str) {

	var translated = "";

	var i; 

	var found = 0;

	for(i = 0; (found = str.indexOf('+', found)) != -1; ) {

		translated += str.substring(i, found) + "%2B";

		i = found + 1;

		found++;

	}

	translated += str.substring(i, str.length);

	return translated;

}

foresee.fsrExceptionHandler = function fsrExceptionHandler(obj,e) {

	if (foresee.fireBug) {console.log("Error in "+ obj +"."+ e.name + "="+ e.message);}

}

foresee.fsrAttachEvent = function fsrAttachEvent(obj, evt, fnc, useCapture){

	if (foresee.triggerParms["evtListener"] == 0) return false;

	if (fnc == null || obj == null) return true;

	if (obj.addEventListener && document.addEventListener) {

		if (evt == "beforeunload") return false;

		obj.addEventListener(evt,fnc,useCapture);	/*W3C DOM*/

	}

	else if (obj.attachEvent) {

		obj.attachEvent("on"+evt,fnc);	/*IE DOM Model*/

	}

	else {

		/**otherwise not supported by major browsers - disable event listener mode**/

		foresee.triggerParms["evtListener"] = 0;

		return false;

	}

	return true;

} 

foresee.fsrCallCookieTimer = function fsrCallCookieTimer(){

	/**Avoiding False Positive Pops using multiple tabs in browsers**/ 

	if (foresee.fsrReadCookie(foresee.ckAlreadyShown) != null) {return;}

	foresee.fsrWriteCookie('currentURL', escape(window.location.href));

	foresee.timeoutId = setTimeout("foresee.fsrCallCookieTimer()", 1000, "JavaScript");

}		

foresee.ForeCStdGetCookie = function ForeCStdGetCookie (name) {

	var arg = name + "=";

	var alen = arg.length;

	var clen = document.cookie.length;

	var i = 0;

	while (i < clen) {

		var j = i + alen;

		if (document.cookie.substring(i, j) == arg) {

			return foresee.ForeCStdGetCookieVal (j);

		}

		i = document.cookie.indexOf(" ", i) + 1;

		if (i == 0) {

			break;

		}

	}

	return null;

}

foresee.ForeCStdGetCookieVal = function ForeCStdGetCookieVal(offset) {

	var endstr = document.cookie.indexOf (";", offset);

	if (endstr == -1) {

		endstr = document.cookie.length;

	}

	return document.cookie.substring(offset, endstr);

}

foresee.ForeCStdSetCookie = function ForeCStdSetCookie (name, value, expires, path, domain, secure){

    document.cookie = name+'='+value +

        ((expires) ? ';expires=' + expires.toGMTString() : '') +

        ((path) ? ';path=' + path : '') +

        ((domain) ? ';domain=' + domain : '') +

        ((secure) ? ';secure' : '');

}

foresee.fsrFindCookieVal = function fsrFindCookieVal(ckVal, name){

	if (ckVal == null || typeof ckVal == "undefined" || name==null) return null;

	var ckParams = ckVal.split(foresee.triggerParms["fsrCkSeparator"]);

	for (var i=0; i<ckParams.length; i++) {

		var ckValues = ckParams[i].split(foresee.triggerParms["fsrParmSeparator"]);

		if (name.toLowerCase()==ckValues[0].toLowerCase()){ return unescape(ckValues[1]);}

	}

	return null;

}

foresee.fsrReplaceCookieVal = function fsrReplaceCookieVal(ckVal, name, value){

	if (ckVal == null || typeof ckVal == "undefined") return "";

	var replaceCkValue = "";

	var ckParams = ckVal.split(foresee.triggerParms["fsrCkSeparator"]);

	for (var i=0; i<ckParams.length; i++) {

		var ckValues = ckParams[i].split(foresee.triggerParms["fsrParmSeparator"]);

		replaceCkValue += ckValues[0];

		if (name.toLowerCase()==ckValues[0].toLowerCase()){

			var newCkValue = ckValues[1].replace(ckValues[1], value);

            ckValues[1] = newCkValue;

		}

		if (ckValues[1] != null) {

			replaceCkValue += foresee.triggerParms["fsrParmSeparator"] + ckValues[1];

		}

	    if (i+1 < ckParams.length) {

    	    replaceCkValue += foresee.triggerParms["fsrCkSeparator"];

		}	

	}

	return replaceCkValue;

}

foresee.fsrReadCookie = function fsrReadCookie(paramName, cookieName){

	var ckName="FSRCookie";

	if (arguments.length==2) {

		ckName = cookieName;

	}

	if (foresee.triggerParms["useOneCookie"] == 0 && arguments.length==1) return foresee.ForeCStdGetCookie(paramName);

	var ckVal = foresee.ForeCStdGetCookie(ckName);

	return foresee.fsrFindCookieVal(ckVal, paramName);

}

foresee.fsrWriteCookie = function fsrWriteCookie(parmName, parmValue, cookieName, expDt){

    if (foresee.fsrReadCookie(foresee.ckAlreadyShown) == 'true') return;

	var ckName="FSRCookie";

	if (arguments.length==4) {

		ckName = cookieName;

	}

	if (foresee.triggerParms["useOneCookie"] == 0 && arguments.length==2) {

		(foresee.triggerParms["npc"] == 0 && parmName == foresee.ckAlreadyShown) ? foresee.ForeCStdSetCookie(parmName, parmValue , foresee.persistentExpires, '/',foresee.triggerParms['domain']) : foresee.ForeCStdSetCookie(parmName, parmValue , null ,'/',foresee.triggerParms['domain']);

		return;

	}

	if (parmName == null || parmValue == null || typeof(parmValue) == "undefined") return;

	if (parmValue.length==0) return;

	if (parmName == "ScoutRunningCheck")	{ parmValue = escape(parmValue);}	/*only for MID's we meed to encode the == signs*/

	var ckVal = (foresee.ForeCStdGetCookie(ckName) == null) ? "" : foresee.ForeCStdGetCookie(ckName);

	var isParamExists=false;

	if (ckVal.indexOf(parmName) != -1) {

		ckVal = foresee.fsrReplaceCookieVal(ckVal, parmName, parmValue);

		isParamExists=true;

	}

	if (!isParamExists) {

		if (ckVal.length>0) ckVal += foresee.triggerParms["fsrCkSeparator"];

		ckVal += parmName + foresee.triggerParms["fsrParmSeparator"] + parmValue;

	}

	if (arguments.length==4) foresee.ForeCStdSetCookie(ckName, ckVal , expDt, '/',foresee.triggerParms['domain']);

	else {

		(foresee.triggerParms["npc"]== 0 && parmName == foresee.ckAlreadyShown) ? foresee.ForeCStdSetCookie(ckName, ckVal , foresee.persistentExpires ,'/',foresee.triggerParms['domain']) : foresee.ForeCStdSetCookie(ckName, ckVal , null, '/',foresee.triggerParms['domain']); 

	}

}

foresee.fsrDeleteCookie = function fsrDeleteCookie(name) {

	 var expires="Fri, 3 Aug 2001 00:00:00 GMT";	//some arbitary past date

	 document.cookie = name+'=' + ';expires=' + expires + ';path=/' +

        ((typeof(foresee.triggerParms["domain"]) != "undefined") ? ';domain=' + foresee.triggerParms["domain"] : '');

}

foresee.fsrDeleteAdminCookie = function fsrDeleteAdminCookie(val) {

	if (foresee.triggerParms["useOneCookie"] == 0) {

		foresee.fsrDeleteCookie(foresee.ckAlreadyShown);

		foresee.fsrDeleteCookie('ScoutRunningCheck');

	}

	else {

		foresee.fsrDeleteCookie('FSRCookie');

		foresee.fsrDeleteCookie('FSRAdmin');	

	}

}

foresee.fsrWriteAdminCookie = function fsrWriteAdminCookie(val,lf,sp) {

	if (foresee.triggerParms["useOneCookie"] == 0 && val=="1") foresee.fsrDeleteCookie('ScoutRunningCheck');

	else if (foresee.triggerParms["useOneCookie"] == 1 && val=="1") foresee.fsrDeleteCookie('FSRCookie');

	var expDate = new Date();

	expDate.setTime(expDate.getTime() + (24*60*1000));	//1 day expiry date

	if (val=="0"){

		foresee.fsrWriteCookie("lf", lf, "FSRAdmin", expDate);

		foresee.fsrWriteCookie("sp", sp, "FSRAdmin", expDate);	

	}

	else {

		foresee.fsrWriteCookie("dLF", lf, "FSRAdmin", expDate);

		foresee.fsrWriteCookie("spL", sp, "FSRAdmin", expDate);	

	}

}

foresee.fsrOnBeforeUnload = function fsrOnBeforeUnload(){

	if (foresee.triggerParms["oeMode"] == 1 && foresee.fsrReadCookie(foresee.ckAlreadyShown) == null) {

		if (foresee.fsrReadCookie('currentURL') != null || foresee.fsrReadCookie('currentURL') != 'blank') {

			foresee.fsrWriteCookie('previousURL',escape(foresee.fsrReadCookie('currentURL')));

		}

		foresee.fsrWriteCookie('currentURL', 'blank');

	}

}

foresee.fsrOnUnload = function fsrOnUnload(){

	if (foresee.triggerParms["oeMode"] == 1 && foresee.fsrReadCookie(foresee.ckAlreadyShown) == null) {

		if (foresee.fsrReadCookie('currentURL') != 'blank') {

			foresee.fsrWriteCookie('previousURL',escape(foresee.fsrReadCookie('currentURL')));

		}

		foresee.fsrWriteCookie('currentURL', 'blank');

	}

}

foresee.fsrOnUnloadTracker = function fsrOnUnloadTracker(){

	if(foresee.triggerParms["trackerWinRep"] == 0) {

		foresee.fsrWriteCookie('ScoutRunningCheck', 'ScoutClosed');

	}

}

foresee.fsrGetURLParameters = function fsrGetURLParameters(paramName) {

	if (paramName == null || typeof(paramName) == "undefined") return "";

	try {

	var sURL = window.document.URL.toString();		

	if (sURL.indexOf("?") == -1) return "";

	var arrParams = sURL.split("?");			

	var arrURLParams = arrParams[1].split("&");		

	for (var i=0;i<arrURLParams.length;i++)

	{

	    var sParam =  arrURLParams[i].split("=");

	    if (paramName.toLowerCase()==sParam[0].toLowerCase()){

	    	if (sParam[1] == "undefined") return "";

	       	return unescape(sParam[1]);

	    }

	}

	} catch (e) {}

	return "";

}

foresee.setFSRSurveyCookie = function setFSRSurveyCookie() {

		foresee.fsrWriteCookie(foresee.ckAlreadyShown,'true');

}

foresee.fsrSizeWindow = function fsrSizeWindow(w,h) {

	/**important xp2 fix - do not change these lines below**/

	window.moveTo(self.screen.width/2 - w/2,self.screen.height/2 - h/2);

	window.resizeTo(w,h);

}

foresee.fsrIsCookieEnabled = function fsrIsCookieEnabled() {

	var cookieEnabled=(navigator.cookieEnabled)? true : false;

	/*if not IE4+ nor NS6+*/

	if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 

		document.cookie="testcookie";

		cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false;

	}

	return cookieEnabled;

}

foresee.isReferrerSponsoredLink = function isReferrerSponsoredLink() {

	if ((window.document.referrer!="")&&(window.document.referrer!="-")){

		if (foresee.fsrIsOnList(foresee.referrerList,foresee.triggerParms["trackerExclude"],document.referrer)) return true;

	}

	return false;

}

foresee.fsrIsOnList = function fsrIsOnList(list,trkActFlg,param){

	/** where list is any generic array list 

        param is the parameter that is checked against this list values

        if param is missing, then by default we choose the page URL 

        trkActFlg is the boolean that is defined in foresee.triggerParms["trackerExclude"], false by default

	**/

	if (typeof(list) == "undefined") return false;

	if (list.length == 0) {return false;}

	if (arguments.length==1 || param == null) {

		foresee.hParent = window.opener;

		if (foresee.hParent != null ){param = foresee.hParent.location.href;}	/**default page url**/

		else {param = window.parent.location.href;}

	}

	/* can still reach the parent - check if on excludeList*/

	for(var i=0; i<list.length ; i++) {

		if ((param.toLowerCase()).indexOf(list[i].toLowerCase()) != -1) {

		    if (typeof(trgActFlg) != "undefined" && trkActFlg==1) foresee.closeTrackerWin();	

			return true;

		}

	}

	return false;

}

foresee.oeImgProc = function oeImgProc() {

	if(foresee.triggerParms["compliant508"] == 1) { foresee.showDHTMLWin(); }

	else {setTimeout("foresee.showDHTMLWin();", foresee.triggerParms["dhtmlDelay"],"JavaScript");}

}

foresee.fsrShowSurvey = function fsrShowSurvey(){

	if(foresee.dcQString == "") { foresee.oeImgProc(); }

	else {

		foresee.newDt   = new Date();

		foresee.currTime= foresee.newDt.getTime(); 

		foresee.FSRImg = new Image();

		foresee.FSRImg.onerror = foresee.imgErrorProc;

		foresee.FSRImg.onload = foresee.imgOnloadProc;

		foresee.FSRImg.src = foresee.FSRImgURL + "?" + foresee.dcQString + "&uid="+ foresee.currTime;	

	}

}

foresee.imgOnloadProc = function imgOnloadProc() {

	if(foresee.FSRImg.width == 3) { foresee.oeImgProc(); }

  	return true;

}

foresee.imgErrorProc = function imgErrorProc() {

	return true;

}

foresee.otcOnloadProc = function otcOnloadProc() {

	if(foresee.OTCImg.width == 3) { foresee.fsrShowSurvey(); }

  	return true;

}

foresee.otcErrorProc = function otcErrorProc() {

	foresee.fsrShowSurvey();

	return true;

}

foresee.fsrSendReq = function fsrSendReq(actId) {

	var midVal= (foresee.triggerParms["mid"] == null) ? foresee.triggerParms["sid"] : foresee.specialEscape(escape(foresee.triggerParms["mid"]));

	if (actId==foresee.PROCESS_RSID) {

		foresee.CSURL += "?actionId="+ actId +"&mid="+ midVal;

	}

	else if (actId==foresee.PROCESS_CPP) {

		foresee.CSURL += "?actionId="+ actId +"&mid="+ midVal + foresee.fsrGetCPP();

	}	

	foresee.fsrTrackerImg = new Image();

 	foresee.fsrTrackerImg.onerror = foresee.fsrOnImgError;

 	foresee.fsrTrackerImg.onload = foresee.fsrOnImgLoad;

 	foresee.newDt   = new Date();

 	foresee.currTime= foresee.newDt.getTime(); 

 	foresee.fsrTrackerImg.src = foresee.CSURL + "&uid="+ foresee.currTime;

}

foresee.fsrOnImgLoad = function fsrOnImgLoad(){

	if(foresee.fsrTrackerImg.width >= 5) {

		if (foresee.triggerParms["sMode"]==1) {

			foresee.fsrWriteCookie("fsrImgLoaded",false);

			window.close();

		}

	}

	else {

		if (foresee.triggerParms["sMode"]==1) foresee.fsrWriteCookie("fsrImgLoaded",true);

	}

}

foresee.fsrOnImgError = function fsrOnImgError() {

	if (foresee.triggerParms["sMode"]==1) foresee.fsrWriteCookie("fsrImgLoaded",false);

}

foresee.fsrSetFilter = function fsrSetFilter() {

	foresee.fullURL += "&sid=" + foresee.triggerParms["sid"];

	if (foresee.triggerParms["patternType"] != null && (foresee.triggerParms["patternType"].toUpperCase()).indexOf("URL") != -1) {

		var parentURL = "";

		if (foresee.fsrReadCookie('currentURL') != null && foresee.fsrReadCookie('currentURL') != 'blank')

			parentURL = foresee.fsrReadCookie('currentURL');

		else if (foresee.fsrReadCookie('previousURL') != null)

			parentURL = foresee.fsrReadCookie('previousURL');

		foresee.fullURL += "&pattern="+ escape(parentURL);

	}

	else if (foresee.triggerParms["patternType"] != null && (foresee.triggerParms["patternType"].toUpperCase()).indexOf("CK=") != -1) {

		var pos = foresee.triggerParms["patternType"].indexOf("=");

		var cookieValue = foresee.fsrReadCookie(foresee.triggerParms["patternType"].substring(pos+1));

		foresee.fullURL += "&pattern="+ escape(cookieValue);

	}

	else if (foresee.triggerParms["patternType"] != null && (foresee.triggerParms["patternType"].toUpperCase()) != null && foresee.triggerParms["patternType"].length >0) {

		foresee.fullURL += "&pattern="+ escape(foresee.triggerParms["patternType"]);

	}	

}

foresee.fsrSetFullURL = function fsrSetFullURL() {

	foresee.fullURL = foresee.popupURL + "?" + "width=" + foresee.triggerParms["width"] + "&height=" + foresee.triggerParms["height"] +

		"&cid=" + foresee.specialEscape(escape(foresee.triggerParms["cid"]));

	if (foresee.triggerParms["sid"] != null && foresee.triggerParms["mid"] == null) {

		foresee.fsrSetFilter();

	}		

	if (foresee.triggerParms["mid"] != null) {

		foresee.fullURL += "&mid=" + foresee.specialEscape(escape(foresee.triggerParms["mid"]));

	}

	if (foresee.triggerParms["omb"] != null) {

		foresee.fullURL += "&omb=" + escape(foresee.triggerParms["omb"]);

	}

	if ((foresee.triggerParms["cmetrics"] ) != null) {

		foresee.fullURL += "&cmetrics=" + escape(foresee.triggerParms["cmetrics"]);

	}	

	if (foresee.triggerParms["olpu"] == 1) {

		foresee.fullURL += "&olpu=1";

	}

	if ((foresee.triggerParms["dcUniqueId"]) != null) {

		foresee.fullURL += "&dcUniqueId=" + escape(foresee.triggerParms["dcUniqueId"]);

	}

	if ((foresee.triggerParms["midexp"] ) != null) {

		foresee.fullURL += "&ndc=1&fsexp=5256000&midexp=" + foresee.triggerParms["midexp"];

	}

	if (foresee.triggerParms["sMode"] != null) {

		foresee.fullURL += "&sMode="+ foresee.triggerParms["sMode"];

	}

}

foresee.getCPPString = function getCPPString(){

	var cppString="";

	for(paramKey in foresee.triggerParms) {

	     if(paramKey.substring(0,3) == "cpp"){

		  cppString += "&" + paramKey + "=" + escape(foresee.triggerParms[paramKey]);

	     }

	}

	return cppString;

}

foresee.fsrGetCPP = function fsrGetCPP(){

	var pageCount = foresee.fsrReadCookie(foresee.ckLoyaltyCount);

	if (pageCount == null) {pageCount = 1;}

	if (foresee.triggerParms["capturePageView"] == 1) {

		foresee.triggerParms["cpp_2"] = "PageView:"+ pageCount; 

	}

	var sMode=foresee.triggerParms["sMode"];

	if (foresee.triggerParms["sMode"] == null) {sMode=0};

	foresee.triggerParms["cpp_3"] = "Browser:OE_Mode"+ foresee.triggerParms["oeMode"] +";Survey_Mode"+ sMode +";" + foresee.cppUrlPatch (foresee.detect) + ";" + foresee.triggerParms["captureTriggerVersion"] + ";" + foresee.fsrGetURLParameters('surveypresented');

	var counter=4;

	for(paramKey in foresee.triggerParms) {

		if(paramKey.substring(0,5) == "oecpp"){

			var value = foresee.triggerParms[paramKey];

			var session = foresee.fsrReadCookie(value);

			if (session != null) {

				foresee.triggerParms["cpp_"+ counter] = value.substring(8,value.length) + ":" + foresee.cppUrlPatch (session);

				counter++;	

			}

		}

	}	

	return foresee.getCPPString();

}

/************************* Scout Tracker Code starts here **************************/

foresee.fsrShowConsole = function fsrShowConsole(msg){

	if (foresee.fireBug) {

		console.log(msg);

	}

}

foresee.popSurvey = function popSurvey(){

	if (!foresee.oePoll()) {window.close();}

	foresee.fsrAbortTimer=true; /**used to abort tracker code which is running in a loop**/

}

foresee.isParentClosed = function isParentClosed(){

	try {if (window.opener.closed){return true;}}

	catch (e) {return true;}

	return false;

}

foresee.retryScout = function retryScout(){

	if (foresee.oeCounter<foresee.triggerParms["trackerRetry"]) {

		foresee.oeCounter++;

		return true;

	}

	/** added MODE 0 false positive check for MODE 1 (sitewise) code to see if its in the same domain otherwise continue checking**

	 ** Updated 3/3/08 **/

	try {

	  if (foresee.triggerParms["oeMode"] == 1) {

	      foresee.hParent = window.opener;

		  foresee.fsrShowConsole("retryScout() - Checking domain false positive check");

	      if (foresee.triggerParms["domain"] == null || typeof(foresee.triggerParms["domain"]) == "undefined") { foresee.triggerParms["domain"] = window.location.hostname;}

	      if ((foresee.hParent.location.hostname).indexOf(foresee.triggerParms["domain"]) != -1 ) {

			if (foresee.oeCounter >1) {foresee.oeCounter=1;}

			return true;

	      }

	  }

	} catch (e) {

		  foresee.fsrShowConsole("retryScout() - domain check failed - popping survey");

	}

	if (!foresee.fsrAbortTimer)	foresee.popSurvey();

	return false;

}

foresee.updateParentURL = function updateParentURL(){

try {

	if (foresee.triggerParms["userURL"] == 1) {

		if (foresee.triggerParms["oeMode"] == 0){

			foresee.hParent = window.opener;

			foresee.triggerParms["cpp_1"] = "userURL:"+ foresee.cppUrlPatch (foresee.hParent.location.href);

		}

		else {

			if (foresee.fsrReadCookie('previousURL') != null && arguments.length == 0 && foresee.triggerParms["nLF"] == null)

				foresee.triggerParms["cpp_1"] = "userURL:"+ foresee.cppUrlPatch (foresee.fsrReadCookie('previousURL'));

			else {

				if (foresee.fsrReadCookie('currentURL') == 'blank') foresee.triggerParms["cpp_1"] = "userURL:"+ foresee.cppUrlPatch (foresee.fsrReadCookie('previousURL'));

				else foresee.triggerParms["cpp_1"] = "userURL:"+ foresee.cppUrlPatch (foresee.fsrReadCookie('currentURL'));

			}

		}

	}

} catch (e) {foresee.fsrShowConsole(e); foresee.errortrap();}	

}

foresee.updateLoyaltyFactor = function updateLoyaltyFactor() {

try {

   var currentURL=null;

   if (arguments.length==0 && foresee.triggerParms["oeMode"] == 0){

   	foresee.hParent = window.opener;

   	currentURL= foresee.hParent.location.href;/*throws exception in OnExit condition*/

   }

   else if (foresee.triggerParms["oeMode"] == 1){

   	currentURL = foresee.fsrReadCookie('currentURL');

   }

   if (currentURL != foresee.tempURL && currentURL != 'blank') {

    	var stickyCounter =  foresee.fsrReadCookie(foresee.ckLoyaltyCount);

		if (stickyCounter == null) {stickyCounter = 1;}

		else if (arguments.length == 0) stickyCounter++;

		foresee.fsrWriteCookie(foresee.ckLoyaltyCount,stickyCounter);

   }

   foresee.tempURL=currentURL;

   if (typeof(foresee.excludeList) != "undefined") {if (foresee.fsrIsOnList(foresee.excludeList,foresee.triggerParms["trackerExclude"])) {return;}}

} catch (e) {foresee.fsrShowConsole(e); foresee.errortrap();}	

}

foresee.javaUpdate = function javaUpdate(){

	foresee.updateParentURL();

	if (foresee.triggerParms["dLFPreCheck"]==0) foresee.updateLoyaltyFactor();

   	/**Custom Coded added on 8/7/08 - to check if page URL is not in the WatchList then pop survey**/

	if (!foresee.fsrIsOnList(foresee.watchList)){

		foresee.triggerParms["nLF"] = 0;

	}

	if(foresee.triggerParms["nLF"] != null) {	

		var lfCounter = foresee.fsrReadCookie(foresee.ckLoyaltyCount);

		if(lfCounter >= foresee.triggerParms["nLF"]) {

			foresee.trackerFromClick=true;

			if (!foresee.fsrAbortTimer)	foresee.popSurvey();

		}		

	}	

}

foresee.fsrSurveyTimeout = function fsrSurveyTimeout(){

try {

	foresee.fsrShowConsole("foresee.fsrSurveyTimeout() - checking exit condition...");

	if (foresee.fsrAbortTimer) { 

		foresee.fsrShowConsole("foresee.fsrSurveyTimeout() - STOP checking...");

		return false;

	}

	if (foresee.fsrReadCookie("ScoutRunningCheck") == null || foresee.fsrReadCookie(foresee.ckAlreadyShown) != null) {window.close();}

	foresee.javaUpdate();

	foresee.hParent = window.opener;

	if (foresee.triggerParms["oeMode"] == 0) {

		if (window.document.domain != foresee.hParent.document.domain) {

			if (foresee.retryScout()&& !foresee.fsrAbortTimer) {

				setTimeout("foresee.fsrSurveyTimeout();", foresee.triggerParms["trackerDelay"], "JavaScript" );

			}

		}

		else if (!foresee.fsrAbortTimer) {setTimeout("foresee.fsrSurveyTimeout();", foresee.triggerParms["trackerDelay"], "JavaScript" );}

	}

	else {

		foresee.fsrIsCookieBlank();

	}

} catch (e) {foresee.fsrShowConsole(e); foresee.errortrap();}	

}

foresee.fsrIsCookieBlank = function fsrIsCookieBlank(){

try {	/*no cookies setup, close tracker*/

	if (foresee.fsrReadCookie("currentURL") == null){window.close();}

	else {

		if (foresee.fsrReadCookie('currentURL') == 'blank') {

			foresee.fsrShowConsole("fsrIsCookieBlank() - Cookie blank check :"+ foresee.oeCounter);

			foresee.fsrWriteCookie('fsr_retry', foresee.oeCounter);

			/**In IE, onUnload is blocked by GoogleToobar if the parent browser/tab is closed

			 **To make the cookie blank, we use the onBeforeUnload event for IE only

			 **Otherwise it causes the survey to pop even when other tabs are open

			 **In Mozilla - do not use hParent.closed - causes problem

			 **COMMENTED CODE BELOW TO AVOID SURVEY WHEN CLOSING MULTIPLE TABS

			 **updated 5/7/08 **/

			 //if (window.opener == null || (foresee.fsr_ie && foresee.isParentClosed())){

				// updateParentURL(true);/*get currentURL instead of previousURL*/

				// foresee.oeCounter = foresee.triggerParms["trackerRetry"];

				 //if (!foresee.fsrAbortTimer) foresee.popSurvey(); 

				 //return false;

			 //}

			 if (foresee.retryScout() && !foresee.fsrAbortTimer) {			

				setTimeout ( "foresee.fsrSurveyTimeout();", foresee.triggerParms["trackerDelay"], "JavaScript" );

			 }

		}

		else {

			/**resetting retry counter to avoid false positive due to delay in page loading**/

			if (foresee.oeCounter >1) {foresee.oeCounter=1;}

			if (!foresee.fsrAbortTimer) {setTimeout("foresee.fsrSurveyTimeout();", foresee.triggerParms["trackerDelay"], "JavaScript" );}

		}

	}

} catch (e) {foresee.fsrShowConsole(e);}

}

foresee.errortrap = function errortrap(){

	/*for debugging purpose*/

	foresee.fsrShowConsole("errortrap() - Exception caught");

	if (foresee.fsrReadCookie("ScoutRunningCheck") == null) {window.close();}

	foresee.hParent = window.opener;

	if (foresee.triggerParms["oeMode"] == 0){

		if (foresee.hParent == null || (foresee.fsr_ie && foresee.isParentClosed())){ foresee.oeCounter = foresee.triggerParms["trackerRetry"]};

		if (foresee.retryScout() && !foresee.fsrAbortTimer) {setTimeout("foresee.fsrSurveyTimeout();", foresee.triggerParms["trackerDelay"], "JavaScript" );}

	}

	else {

		foresee.fsrIsCookieBlank();

	}

	return true;

}

/********************* Scout Tracker Code ends here *****************************/

foresee.showDHTMLWin = function showDHTMLWin(){

	if((foresee.runningscout != null && !foresee.runningscout.closed && foresee.fsr_aol==false) || foresee.scoutTracker != null){return;}

	foresee.surveyPresentedBy = "dhtml";

	if(document.all) {

		if (foresee.triggerParms["dhtmlHighlight"]==1) document.all.fsrOverlayDiv.style.visibility = 'visible';

		document.all.FSRInviteWin.style.visibility = 'visible';

	}			

	else if(document.getElementById) {

		if (foresee.triggerParms["dhtmlHighlight"]==1) document.getElementById("fsrOverlayDiv").style.visibility = 'visible';

		document.getElementById("FSRInviteWin").style.visibility = 'visible';

	}	

}

foresee.FSRInviteAct = function FSRInviteAct(actFlag) {

	if(actFlag == '1') {

		if (arguments.length>1) {

			foresee.triggerParms["mid"] = arguments[1];

			foresee.fsrWriteCookie(foresee.triggerParms["oecpp_Language"], arguments[2]);

		}

	 	foresee.openTrackerWin();

	}

	else {

		foresee.setFSRSurveyCookie();

	}

	/*always hide div after tracker is open otherwise it will be blocked in IE-GooglePopup blocker*/



	if(document.all) {

		if (foresee.triggerParms["dhtmlHighlight"]==1) document.all.fsrOverlayDiv.style.visibility = 'hidden';

		document.all.FSRInviteWin.style.visibility = 'hidden';

	}	

	else if(document.getElementById) {

		if (foresee.triggerParms["dhtmlHighlight"]==1) document.getElementById("fsrOverlayDiv").style.visibility = 'hidden';

		document.getElementById("FSRInviteWin").style.visibility = 'hidden';

	}

}

foresee.fsrSetDivPos = function fsrSetDivPos() {

	var xWidth;var yWidth;

	if (window.innerHeight) {

		/**used by Mozilla based browsers and Safari **/

		xWidth = window.innerWidth; yWidth = window.innerHeight;

	} else if (document.documentElement.clientHeight > 0) {

		/**used by IE based browsers **/

		xWidth = document.documentElement.clientWidth; yWidth = document.documentElement.clientHeight;

	} else {

		/**used by AOL Explorer **/

		xWidth = document.body.clientWidth; yWidth = document.body.clientHeight;

	}

	if (foresee.xPosition == "CENTER") {foresee.triggerParms["dhtmlLeft"] = (xWidth/2) - (foresee.triggerParms["dhtmlWidth"]/2);}

	else if (foresee.xPosition == "LEFT") {foresee.triggerParms["dhtmlLeft"] = 10;}

	else if (foresee.xPosition == "RIGHT") {foresee.triggerParms["dhtmlLeft"] = (xWidth) - (foresee.triggerParms["dhtmlWidth"]) - 30;}

	if (foresee.yPosition == "CENTER") {foresee.triggerParms["dhtmlTop"] = (yWidth/2) - (foresee.triggerParms["dhtmlHeight"]/2);}

	else if (foresee.yPosition == "TOP") {foresee.triggerParms["dhtmlTop"] = 10;}

	else if (foresee.yPosition == "BOTTOM") {foresee.triggerParms["dhtmlTop"] = (yWidth) - (foresee.triggerParms["dhtmlHeight"]) - 30;}

}

foresee.fsrShowDIV = function fsrShowDIV(divId, dLeft, dTop, dWidth, dHeight, dVisible, zIdx, pos, cursorType) {

	var oBody = document.getElementsByTagName("BODY")[0];

	if (oBody==null || typeof(oBody) == "undefined") {

		return false;

	}	

	var oDiv = document.createElement("div");

	oDiv.id = divId;

	oDiv.style.background = foresee.triggerParms["dhtmlOverlayBgClr"];

	oDiv.style.position = pos;

	oDiv.style.left = dLeft +"pt";

	oDiv.style.top = dTop +"pt";

	oDiv.style.width=dWidth +"%";

	oDiv.style.height=dHeight +"%";

	oDiv.style.border = "0";

	oDiv.style.visibility = dVisible;

	oDiv.style.zIndex = zIdx;

	oDiv.style.opacity = foresee.triggerParms["dhtmlOverlayOpacity"];

	oDiv.style.filter = "-moz-opacity ="+ foresee.triggerParms["dhtmlOverlayOpacity"];

	oDiv.style.filter = "alpha(opacity="+ foresee.triggerParms["dhtmlOverlayOpacity"]*100+")";

	oDiv.style.cursor = cursorType;

	oBody.appendChild(oDiv);

	return true;

}

foresee.fsrCreateInvite = function fsrCreateInvite(type, divId, dLeft, dTop, dWidth, dHeight, dVisible, frameId, fWidth, fHeight, fScroll, frameSrc) {

	if (type==1) {/*when opening Invite*/

		foresee.fsrSetDivPos();

		dLeft = foresee.triggerParms["dhtmlLeft"];

		dTop = foresee.triggerParms["dhtmlTop"];

	}

	if (foresee.triggerParms["evtListener"]==0 && type==1){

		var divStr= "<div id=\""+ divId+ "\" style=\"position:absolute; left:" + dLeft+"px; top:"+ dTop+ "px; z-index:"+foresee.triggerParms["dhtmlIndex"]+"; border:0; visibility:"+dVisible+";\">"

				   +"<iframe id=\""+ frameId+"\" src=\""+ frameSrc+"\" FrameBorder=0 Scrolling="+fScroll+" width="+fWidth+" height="+fHeight+"></iframe></div>";

		document.write(divStr);

		return true;	

	}

	var oBody = document.getElementsByTagName("BODY")[0];

	if (oBody==null || typeof(oBody) == "undefined") {

		return false;

	}	

	var oDiv = document.createElement("div");

	oDiv.id = divId;

	oDiv.style.position = "absolute";

	oDiv.style.left = dLeft +"px";

	oDiv.style.top = dTop +"px";

	if (type==0) {/*when opening Tracker*/

		oDiv.style.width=dWidth +"%";;

		oDiv.style.height=dHeight +"%";

	}

	oDiv.style.border = "0";

	oDiv.style.visibility = dVisible;

	oDiv.style.zIndex = foresee.triggerParms["dhtmlIndex"];

	oBody.appendChild(oDiv);

	var divEl  = document.getElementById(divId);

	var oFrame = document.createElement("iframe");

	oFrame.id  = frameId;

	oFrame.src = frameSrc;

	if (type==1) {/*when opening Invite*/

		oFrame.width=fWidth +"px";

		oFrame.height=fHeight +"px";

	}

	else {

		oFrame.width=fWidth + "%";

		oFrame.height=fHeight + "%";

	}

	oFrame.frameBorder = "0";

	oFrame.scrolling = fScroll;

	divEl.appendChild(oFrame);

	return true;

}

foresee.fsrCreateScript = function fsrCreateScript(srcName, tag){

	var headNode = document.getElementsByTagName(tag)[0];

    var fsrScript = document.createElement('script');

    fsrScript.type = 'text/javascript';

    fsrScript.src = srcName;

    headNode.appendChild(fsrScript);

}

foresee.fsrLoadIFrame = function fsrLoadIFrame(){

	if (foresee.triggerParms["sMode"] == 1) {

		foresee.fsrSetFullURL();

		foresee.fsrCreateInvite("0", "FSRSurveyDiv", 0, 0, 100, 100, "hidden", "FSRSurveyIframeWin", 100, 100, "YES", foresee.fullURL);  

	}

}

foresee.closeTrackerWin = function closeTrackerWin() {

    foresee.scoutTracker = foresee.fsrReadCookie("ScoutRunningCheck");

    if (foresee.scoutTracker!=null) {

		var trackerWin = window.open("","ForeseeSurveyWindow");

	    if (trackerWin != null && !trackerWin.closed) {trackerWin.close();}

    }

}

/**passing a parameter 'true' will increment LF cookie */

foresee.fsrCheckPageVisited = function fsrCheckPageVisited() {

	if (foresee.triggerParms["dLFPreCheck"] == 0) {return foresee.triggerParms["dLF"];}

	var stickyCounter = foresee.fsrReadCookie(foresee.ckLoyaltyCount);

 	if (stickyCounter == null) stickyCounter = 0;

 	 /**don't drop or increment LFCookie when pageCounter<=1 or continue button is clicked from Invite dhtml ***/

 	if (arguments.length==1) {

 		stickyCounter++;

 		foresee.fsrWriteCookie(foresee.ckLoyaltyCount, stickyCounter);

 	}

 	return stickyCounter;

}

foresee.openFSRSurveyLink = function openFSRSurveyLink() {	

	foresee.fsrSetClientCPPS();

	foresee.closeTrackerWin();

	var lf =(self.screen.width - foresee.triggerParms["width"])/2;

	var tp =(self.screen.height - foresee.triggerParms["height"])/2;

	foresee.winOptions = "toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,top="+tp+",left="+lf+",width="+foresee.triggerParms["width"]+ ",height="+ foresee.triggerParms["height"];

	foresee.trackerFromClick=true;

	if (!foresee.oePoll(true)) {alert(foresee.fsrMSG1)};

}

foresee.oePoll = function oePoll() {

	foresee.rNum = Math.random()*100;

	var stickyCounter = foresee.fsrReadCookie(foresee.ckLoyaltyCount);

	var alreadyShown = foresee.fsrReadCookie(foresee.ckAlreadyShown);

	if (alreadyShown == null && stickyCounter != null) {

		if(stickyCounter >= foresee.triggerParms["dLF"] || foresee.trackerFromClick) {

		    if(foresee.rNum <= foresee.triggerParms["spE"]) {

				foresee.setFSRSurveyCookie();

		    	if (foresee.triggerParms["sMode"] == 1 && arguments.length==0) {

					foresee.fsrSendReq(foresee.PROCESS_CPP);

					if (foresee.triggerParms["olpu"] == 0) window.blur();

					else window.focus();

					document.getElementById("FSRTrackerDiv").style.visibility = "hidden";

					document.getElementById("FSRSurveyDiv").style.visibility = "visible";

					foresee.fsrSizeWindow(foresee.triggerParms["width"],foresee.triggerParms["height"]);	

					return true;

				}

				else {	

					foresee.fsrSetFullURL();

					foresee.fullURL += foresee.fsrGetCPP();

					document.getElementById("FSRTrackerDiv").innerHTML = "<font class='subtitle'>Survey is loading. Please wait...</font>";

					var myPopUp = window.open(foresee.fullURL, "ForeseeSurveyWindow",foresee.winOptions);

					if(myPopUp == null || myPopUp.closed) {return false;}

					if (foresee.triggerParms["olpu"] == 0) myPopUp.blur();

					else myPopUp.focus();

					return true;

				}

			}				

		}

	}

	return false;

}

foresee.openTrackerWin = function openTrackerWin(){

	var sl = (screen.width-foresee.triggerParms["trackerWidth"])/2;

	var st = (screen.height-foresee.triggerParms["trackerHeight"])/2;

	var winOpts = "top=" + st + ",left=" + sl + ",width=" + foresee.triggerParms["trackerWidth"] + ",height=" + foresee.triggerParms["trackerHeight"] + ",resizable=1,toolbar=0,location=0,statusbar=0,menubar=0";

	if (foresee.triggerParms["sMode"] == 1) { winOpts += ",scrollbars=0";}

	else {winOpts += ",scrollbars=1";}

	if(arguments.length == 0) {foresee.rNum = 0}		

	foresee.scoutTracker = foresee.fsrReadCookie("ScoutRunningCheck");

	if (foresee.scoutTracker == null) {

		/**** Checking dLF & spL before opening ScoutTracker ***/

		if(foresee.fsrCheckPageVisited() >= foresee.triggerParms["dLF"] && foresee.rNum <= foresee.triggerParms["spL"]) {

		   if (foresee.triggerParms["displayMode"] ==3 && arguments[0] >0) {return 0;}

		   foresee.runningscout = window.open(foresee.triggerParms["trackerURL"]+"?mid="+escape(foresee.triggerParms["mid"]) + "&sid="+ foresee.triggerParms["sid"] +"&surveypresented="+foresee.surveyPresentedBy, "ForeseeSurveyWindow", winOpts);

		}

		else {return 1;}

	} else {	

		var midVal="";

		if (typeof(foresee.triggerParms["mid"]) == "undefined") midVal = foresee.triggerParms["sid"];

		if (typeof(foresee.triggerParms["sid"]) == "undefined") midVal = foresee.triggerParms["mid"];

		/*dont show dhtml or open scout again if already surveyed or mid is same or if one scout closes another scout or user closes scout or dhtml*/

		if (foresee.fsrReadCookie(foresee.ckAlreadyShown) != null || foresee.scoutTracker == midVal){return 1;}

		/*otherwise override scout tracker with another MID - ignore spL once tracker is open */

		foresee.runningscout = window.open(foresee.triggerParms["trackerURL"]+"?mid="+escape(foresee.triggerParms["mid"]) + "&sid="+ foresee.triggerParms["sid"] + "&surveypresented="+foresee.surveyPresentedBy, "ForeseeSurveyWindow", winOpts);

	}	

	if((foresee.trackerFromClick == true || arguments.length == 0) && foresee.runningscout != null && !foresee.runningscout.closed) {

		/**hide behind when opening through DHTML Invite or Click event **/

		foresee.runningscout.blur();

	}

	window.parent.focus();

	if (foresee.triggerParms["sMode"] == 1 || (foresee.triggerParms["sid"] != null && foresee.triggerParms["mid"] == null && foresee.triggerParms["patternType"] != null)) {foresee.fsrSendReq(foresee.PROCESS_RSID);}	/*generate RSID when new tracker opens*/

	return 0;

}

foresee.openFSRTracker = function openFSRTracker() {	

		var alreadyShown = foresee.fsrReadCookie(foresee.ckAlreadyShown);

		var excludeBrowserFlag = foresee.fsr_NS62 || foresee.fsr_safari_2_x;

		if(foresee.triggerParms["displayMode"] == 0 || excludeBrowserFlag || alreadyShown!=null || foresee.fsrReadCookie("ScoutRunningCheck") == 'ScoutClosed' || !foresee.fsrIsCookieEnabled()) {return;}

		foresee.fsrSetAdminParms();

		foresee.fsrCheckPageVisited(true);	/**passing true will indicate an increment to LF cookie */		

		var excludeListFlag = false; 

		if (typeof(foresee.excludeList) != "undefined") {excludeListFlag = foresee.fsrIsOnList(foresee.excludeList,foresee.triggerParms["trackerExclude"]);}

		if(excludeListFlag || foresee.isReferrerSponsoredLink()) {return;}

		foresee.trackerFromClick = false;

		if (arguments.length>0 && arguments[0] == '0')	foresee.triggerParms["displayMode"] = 0;

		if(arguments.length >0 && arguments[1] == true) {foresee.trackerFromClick = true;}

		if (foresee.triggerParms["sid"] != null && foresee.triggerParms["mid"] == null && foresee.triggerParms["patternType"] != null && (foresee.triggerParms["patternType"].toUpperCase()).indexOf("URL") != -1) {

			foresee.triggerParms["sMode"] = 0;

			if (foresee.triggerParms["oeMode"] == 0) {

				foresee.fsrWriteCookie("currentURL", escape(window.location.href));

			}

		}

		foresee.rNum = Math.random()*100;

		/***calling client functions here **/

		if (foresee.fsrSetClientFunc() == false) return;

		/***/

		var scoutFlag = foresee.openTrackerWin(foresee.rNum);

		if (foresee.fsr_aol) {

		  try{ /*aolToolbar and yahoo popupblocker fix*/

		    foresee.runningscout.focus();

		    scoutFlag=1;

		  } catch (e){scoutFlag=0;}

		}

		if(!foresee.trackerFromClick && !foresee.fsr_NS70 && (scoutFlag==null || scoutFlag == 0) && foresee.triggerParms["displayMode"] != 2) {

				if (foresee.fsr_NS8) foresee.triggerParms["dhtmlHeight"] = foresee.triggerParms["dhtmlHeight"] + 15;

				/**show curtain-div **/

				if (foresee.triggerParms["dhtmlHighlight"]==1) foresee.fsrShowDIV("fsrOverlayDiv", 0, 0, 100, 100, "hidden", 9999, "fixed", "wait");

				/**creating foresee invite div element using DOM**/ 

				if (!foresee.fsrCreateInvite("1", "FSRInviteWin", foresee.triggerParms["dhtmlLeft"], foresee.triggerParms["dhtmlTop"], 100, 100, "hidden", "cframe", foresee.triggerParms["dhtmlWidth"], foresee.triggerParms["dhtmlHeight"], "NO", foresee.triggerParms["dhtmlURL"])) {foresee.fsrWriteCookie("FSRDivCreated", "false"); return;}

				if ((foresee.triggerParms["midexp"] ) != null) {

					foresee.dcQString = "ndc=1&midexp=" + foresee.triggerParms["midexp"] + "&mid=" + foresee.specialEscape(escape(foresee.triggerParms["mid"]));

					if(foresee.triggerParms["dcUniqueId"]!=null) { foresee.dcQString += "&dcUniqueId=" + foresee.specialEscape(escape(foresee.triggerParms["dcUniqueId"])); }						

				}

				foresee.newDt   = new Date();

				foresee.currTime= foresee.newDt.getTime(); 

				foresee.OTCImg = new Image();

				foresee.OTCImg.onerror = foresee.otcErrorProc;

				foresee.OTCImg.onload = foresee.otcOnloadProc;

				foresee.OTCImg.src = foresee.OTCImgURL + "?protocol=" + window.location.protocol + "&uid="+ foresee.currTime;	

				

		}

}

foresee.openMultiVendorSurvey = function openMultiVendorSurvey(randNum) {

		foresee.closeTrackerWin();			/**Explicitly closing tracker if its open **/		

		/**Looping through MultiVendors**/

		var spVendor1 = foresee.triggerParms["spL"];

		for(var key in foresee.vendorLookupTable) {

			pos = foresee.vendorLookupTable[key].indexOf(foresee.triggerParms["fsrCkSeparator"]);

			vendorSP = foresee.vendorLookupTable[key].substring(0,pos);

			vendorURL= foresee.vendorLookupTable[key].substring(pos+2);

			if (randNum > spVendor1 && randNum <= vendorSP) {

				foresee.setFSRSurveyCookie();

				foresee.fsrCreateScript(vendorURL, "head");		/*appending dynamic vendor's survey code at the end of body tag*/

				return;

			}

			spVendor1 = vendorSP;

		}

}

foresee.fsrSetAdminParms = function fsrSetAdminParms(){

	if (foresee.fsrReadCookie("dLF","FSRAdmin") != null && foresee.fsrReadCookie("spL","FSRAdmin") != null) {

		foresee.triggerParms["dLF"] = foresee.fsrReadCookie("dLF","FSRAdmin");

		foresee.triggerParms["spL"] = foresee.fsrReadCookie("spL","FSRAdmin");

	}

}

foresee.fsrSetMode1Parms = function fsrSetMode1Parms(){

	if (foresee.triggerParms["oeMode"] == 1 && foresee.fsrReadCookie(foresee.ckAlreadyShown) == null) {

		if (foresee.fsr_ie) foresee.fsrAttachEvent(window, "beforeunload", foresee.fsrOnBeforeUnload, false);

		foresee.fsrAttachEvent(window, "unload", foresee.fsrOnUnload, false);

   		setTimeout("foresee.fsrCallCookieTimer()", 1000, "JavaScript");

 	}

}

foresee.fsrSetTrackerParms = function fsrSetTrackerParms(){

	midVal = foresee.fsrGetURLParameters('mid');

	if (midVal == "") {

		midVal = foresee.fsrGetURLParameters('sid');

		if (midVal=="")	midVal = foresee.triggerParms["mid"];

	}

	else {foresee.triggerParms["mid"] = midVal;}

	foresee.fsrWriteCookie("ScoutRunningCheck", midVal);

	foresee.fsrSetTriggerParms();

}

foresee.fsrSetTriggerParms = function fsrSetTriggerParms(cValue){

	if (foresee.fsr_ie5) foresee.triggerParms["evtListener"]=0;

	if (typeof(foresee.midLookupTable) == "undefined") return false;

	if (cValue == null) {	/**check location pathname as default **/

			foresee.hParent = window.opener;

			if (foresee.hParent != null )	{cValue = foresee.hParent.location.href;}	

			else {cValue = window.location.href;}

	}

	for(var key in foresee.midLookupTable) {

		if ((cValue.toLowerCase()).indexOf(key.toLowerCase()) != -1) {

			var lookupParams = foresee.midLookupTable[key].split(":");			

			foresee.triggerParms["spL"] = lookupParams[0];

			foresee.triggerParms["mid"] = lookupParams[1];

			if (lookupParams.length == 3)	foresee.triggerParms["nLF"] = lookupParams[2];

			return true;

		}

	}

	return false;

}

foresee.fsrTagEvent = function fsrTagEvent(tag,matchStr,evt,fnc){

	var anchorTags=null;

	if (window.opener) 

		anchorTags = window.opener.document.getElementsByTagName(tag.toLowerCase());

	else 

		anchorTags = document.getElementsByTagName(tag.toLowerCase());

	for (var i=0; i< anchorTags.length ; i++)

	{

	   var oTag = anchorTags[i];

	   var oProperty = oTag.href;

 	   if (oProperty != null) {

 	   		if ((oProperty.toLowerCase()).indexOf(matchStr.toLowerCase()) != -1) {

		   		foresee.fsrAttachEvent(oTag, evt, fnc);

			}

		}

	}

}

foresee.fsrTagEventListeners = function fsrTagEventListeners(tagFunc){

	if (typeof(foresee.eventTagList) == "undefined" || foresee.fsrReadCookie(foresee.ckAlreadyShown) != null) {

		return;

	}

	if (tagFunc == null) return;

	for(var matchingStr in foresee.eventTagList) {

		var arrParams = foresee.eventTagList[matchingStr].split("|");			

		if (arrParams.length==2) {

			foresee.fsrTagEvent(arrParams[0], matchingStr, arrParams[1], tagFunc);

		}

	}

}

foresee.fsrSetClientFunc = function fsrSetClientFunc(){

	/** add event listener here **/

	foresee.fsrTagEventListeners(foresee.closeTrackerWin);	//passing function reference as parameter to be executed

	/** add multivendor code here **/

	if (typeof(foresee.vendorLookupTable) != "undefined") {

		if (foresee.rNum >0 && foresee.rNum > foresee.triggerParms["spL"]) {

			foresee.openMultiVendorSurvey(foresee.rNum);

			return false;

		}

	}

	if (foresee.triggerParms["flashDetect"]==1){

		if (foresee.fsrDetectFlash() == false) return false;

	}

	return true;

}

foresee.fsrDetectFlash = function fsrDetectFlash(){

	/** return a true if no flash is detected otherwise dont show invite/tracker **

	/** For Mozilla based browsers **/

	if (document.embeds && document.embeds.length > 0) {

			return false;

	}

	/** For all other browsers **/

	else if (document.all){

		var obj = document.all.tags("OBJECT");

    	for (var e=0; e<obj.length;e++){

   	    	for (var d=0; d<obj[e].attributes.length;d++){

	       	     if ((obj[e].attributes[d].name).toLowerCase() == "classid") {

					return false;

        	  	 }

       		}

    	}

    }

	return true;

}

/********************************/

/**calling foresee survey code **/

/********************************/

try {

	if (window.name=="ForeseeSurveyWindow" || (window.opener && foresee.triggerParms["displayMode"] == 2)) {	/*if tracker*/

		window.name="ForeseeSurveyWindow";	//must be set for displayMode 2

		foresee.fsrSetTrackerParms();	/**reload the mid or sid passed from the parent page**/

		setTimeout("foresee.fsrSurveyTimeout();", foresee.triggerParms["trackerDelay"], "JavaScript" );

	}

	else {

		foresee.fsrSetTriggerParms();	/**used for multi-measure only, overwrite triggerParams**/

		foresee.fsrSetMode1Parms();		/**used for mode1 only, drop cookie and attach unload event listener**/		

		if (!foresee.fsrAttachEvent(window, "load", foresee.openFSRTracker, false)) foresee.openFSRTracker();

	}

} catch(e) {foresee.fsrExceptionHandler(foresee.triggerParms["captureTriggerVersion"],e);} 