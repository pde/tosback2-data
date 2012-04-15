/****Customer: Home Depot Post Purchase 2008
/************ don't modify below this line *********
 *************  Version: Std 5.3 v.21 ***********
 ****** Copyright 2001-2008 ForeseeResults, Inc****/
  
foresee.popupURL = "//www.foreseeresults.com/survey/display";	//do not change this url
foresee.FSRImgURL= "//www.foreseeresults.com/survey/FSRImg"; 	//do not change this url
foresee.CSURL= "//www.foreseeresults.com/survey/processCPP"; 	//do not change this url
foresee.OTCImgURL = "//controller.foreseeresults.com/fsrSurvey/OTCImg";
foresee.ckAlreadyShown = foresee.triggerParms["ascookie"]; /* name of the persistent/session cookie*/
foresee.ckLoyaltyCount = foresee.triggerParms["lfcookie"]; /* name of the loyalty count cookie*/
foresee.fullURL=null;
foresee.myPopUp=null;
foresee.detect = navigator.userAgent.toLowerCase();
foresee.version= navigator.appVersion.toLowerCase();
foresee.fireBug = (typeof(console) == "undefined") ? false : true;
foresee.fsr_aol= ((foresee.detect.indexOf("aol") >=0) || (foresee.detect.indexOf("america online browser") >=0)) ? 1 : 0;
foresee.fsr_opera = (foresee.detect.indexOf("opera") >=0) ? 1 : 0;
foresee.fsr_NS8=(foresee.detect.indexOf("netscape/8") >=0) ? 1 : 0;
foresee.fsr_ie5=(foresee.detect.indexOf("msie 5")>=0 && foresee.version.indexOf("win") != -1) ? 1 :0;
foresee.rNum=null;
foresee.newDt=null;
foresee.currTime=null;	/*in millisecs*/
foresee.OTCImg=null;
foresee.FSRImg=null;
foresee.dcQString="";
foresee.winOptions = "toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=1,height=1,top=4000,left=4000";
foresee.persistentExpires = new Date(); /*persistent cookie expiration*/
foresee.persistentExpires.setTime(foresee.persistentExpires.getTime() + (foresee.triggerParms["rw"]*60*1000));
foresee.triggerParms["dhtmlLeft"]=0;
foresee.triggerParms["dhtmlTop"]=0;

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
foresee.fsrShowConsole = function fsrShowConsole(msg){
	console.log(msg);
}
foresee.fsrAttachEvent = function fsrAttachEvent(obj, evt, fnc, useCapture){
	if (fnc == null || obj == null) return true;
	if (obj.addEventListener && document.addEventListener) {
		obj.addEventListener(evt,fnc,useCapture);	/*W3C DOM*/
	}
	else if (obj.attachEvent) {
		obj.attachEvent("on"+evt,fnc);	/*IE DOM Model*/
	}
	else {
		/**otherwise not supported by major browsers**/
		return false;
	}
	return true;
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
	var ckName="FSRCookie";
	if (arguments.length==4) {
		ckName = cookieName;
	}
	if (foresee.triggerParms["useOneCookie"] == 0 && arguments.length==2) {
		(foresee.triggerParms["npc"] == 1) ? foresee.ForeCStdSetCookie(parmName, parmValue , null, '/',foresee.triggerParms['domain']) : foresee.ForeCStdSetCookie(parmName, parmValue , foresee.persistentExpires ,'/',foresee.triggerParms['domain']);
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
		foresee.srDeleteCookie('ScoutRunningCheck');
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
	expDate.setTime(expDate.getTime() + (24*60*1000));
	if (val=="0"){
		foresee.fsrWriteCookie("lf", lf, "FSRAdmin", expDate);
		foresee.fsrWriteCookie("sp", sp, "FSRAdmin", expDate);	
	}
	else {
		foresee.fsrWriteCookie("dLF", lf, "FSRAdmin", expDate);
		foresee.fsrWriteCookie("spL", sp, "FSRAdmin", expDate);	
	}
}
foresee.setFSRSurveyCookie = function setFSRSurveyCookie() {
		foresee.fsrWriteCookie(foresee.ckAlreadyShown,'true');
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
		hParent = window.opener;
		if (hParent != null ){param = hParent.location.href;}	/**default page url**/
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
foresee.fsrShowSurvey = function fsrShowSurvey(){
	if(foresee.dcQString == "") { foresee.stdImgProc(); }
	else {
			foresee.newDt   = new Date();
			foresee.currTime= foresee.newDt.getTime(); /*in millisecs*/
			foresee.FSRImg = new Image();
			foresee.FSRImg.onerror = foresee.imgErrorProc;
			foresee.FSRImg.onload = foresee.imgOnloadProc;
			foresee.FSRImg.src = foresee.FSRImgURL + "?" + foresee.dcQString + "&uid="+ foresee.currTime;	/*for NE/FF Cache Fix*/
	}
}
foresee.imgOnloadProc = function imgOnloadProc() {
	if(foresee.FSRImg.width == 3) { foresee.stdImgProc(); }
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
foresee.fsrShowConsole = function fsrShowConsole(msg){
	console.log(msg);
}
foresee.fsr_showWindow = function fsr_showWindow() {   
	 if(foresee.myPopUp != null && !foresee.myPopUp.closed && foresee.fsr_aol==false && foresee.fsr_opera==false) {return;}
     var cpp3Str = ""; 
	 var cpp_3 = "Browser:"+ foresee.cppUrlPatch (foresee.detect) + ";" + foresee.triggerParms["captureTriggerVersion"];
	 cpp_3+=";dhtml";	
	 var pos1 = foresee.fullURL.indexOf("&cpp_3=");
	 var pos2 = foresee.fullURL.indexOf("&",pos1+1);
	 if (pos2==-1){
		 foresee.fullURL = foresee.fullURL.substring(0,pos1);
	 }else{
	     cpp3Str = foresee.fullURL.substring(pos2,foresee.fullURL.length);
	     foresee.fullURL = foresee.fullURL.substring(0,pos1);
	 }	 
	 foresee.fullURL+="&cpp_3="+cpp_3 + cpp3Str;
	 if(document.all) {
		if (foresee.triggerParms["dhtmlHighlight"]==1) document.all.fsrOverlayDiv.style.visibility = 'visible';
		document.all.FSRInviteWin.style.visibility = 'visible';
	 }			
	 else if(document.getElementById) {
		if (foresee.triggerParms["dhtmlHighlight"]==1) document.getElementById("fsrOverlayDiv").style.visibility = 'visible';
		document.getElementById("FSRInviteWin").style.visibility = 'visible';
	 }	 
}
foresee.fsr_hideWindow = function fsr_hideWindow() {
	if(document.all) {
		if (foresee.triggerParms["dhtmlHighlight"]==1) document.all.fsrOverlayDiv.style.visibility = 'hidden';
		document.all.FSRInviteWin.style.visibility = 'hidden';
	}	
	else if(document.getElementById) {
		if (foresee.triggerParms["dhtmlHighlight"]==1) document.getElementById("fsrOverlayDiv").style.visibility = 'hidden';
		document.getElementById("FSRInviteWin").style.visibility = 'hidden';
	}
}
foresee.Pop = function Pop(){
	var newfullURL=null;
	newfullURL = foresee.fullURL.replace(escape(arguments[0]), escape(arguments[1]));
	foresee.fullURL = newfullURL;
	newfullURL= foresee.fullURL.replace(arguments[2], arguments[3]);
	foresee.fullURL = newfullURL;
	foresee.myPopUp = window.open(foresee.fullURL, "ForeseeSurveyWindow",foresee.winOptions);
	foresee.fsr_hideWindow();	/*always hide div after survey is open otherwise it will be blocked in IE-GooglePopup blocker*/
	if (foresee.myPopUp!=null && !foresee.myPopUp.closed) {
		foresee.myPopUp.focus();
	}
}
foresee.stdImgProc = function stdImgProc() {
	if(foresee.triggerParms["compliant508"] == 1) {foresee.fsr_showWindow();}
	else { 
		setTimeout("foresee.fsr_showWindow();", foresee.triggerParms["dhtmlDelay"],"JavaScript");
	}
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
		var cookieValue = fsrReadCookie(foresee.triggerParms["patternType"].substring(pos+1));
		foresee.fullURL += "&pattern="+ escape(cookieValue);
	}
	else if (foresee.triggerParms["patternType"] != null && (foresee.triggerParms["patternType"].toUpperCase()) != null && foresee.triggerParms["patternType"].length >0) {
		foresee.fullURL += "&pattern="+ escape(foresee.triggerParms["patternType"]);
	}	
}
foresee.fsrSetDivPos = function fsrSetDivPos() {
	var xWidth;foresee.yWidth;
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
foresee.fsrCreateDIV = function fsrCreateDIV(type, divId, dLeft, dTop, dWidth, dHeight, dVisible, frameId, fWidth, fHeight, fScroll, frameSrc) {
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
	if (type==1) {/*when opening Invite*/
		foresee.fsrSetDivPos();
		dLeft = foresee.triggerParms["dhtmlLeft"];
		dTop = foresee.triggerParms["dhtmlTop"];
	}
	oDiv.style.left = dLeft +"px";
	oDiv.style.top = dTop +"px";
	oDiv.style.border = "0";
	oDiv.style.visibility = dVisible;
	oDiv.style.zIndex = foresee.triggerParms["dhtmlIndex"];
	oBody.appendChild(oDiv);
	var divEl  = document.getElementById(divId);
	var oFrame = document.createElement("iframe");
	oFrame.id  = frameId;
	oFrame.src = frameSrc;
	if (type==1) {/*when opening Invite*/
		foresee.fsrSetDivPos();
		oFrame.width=fWidth +"px";
		oFrame.height=fHeight +"px";
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
foresee.isAlreadyShown = function isAlreadyShown(){
	/*check if already shown cookie or Scout Tracker has already been dropped*/
	if (foresee.fsrReadCookie(foresee.ckAlreadyShown) != null || foresee.fsrReadCookie("ScoutRunningCheck") != null) return true;
	return false;
}
foresee.Poll = function Poll() {
	if(foresee.triggerParms["displayMode"] == 0 || foresee.isAlreadyShown() || !foresee.fsrIsCookieEnabled() ) {return;}
	foresee.fsrSetAdminParms();
	var stickyCounter = foresee.fsrReadCookie(foresee.ckLoyaltyCount); /*check counter cookie*/
	if (stickyCounter == null) stickyCounter = 1;
	else stickyCounter++;
	foresee.fsrWriteCookie(foresee.ckLoyaltyCount, stickyCounter);
	var excludeListFlag = false; 
	if (typeof(foresee.excludeList) != "undefined") {excludeListFlag = foresee.fsrIsOnList(foresee.excludeList);}
	if(excludeListFlag || foresee.isReferrerSponsoredLink()) {return;}
	foresee.rNum = Math.random()*100;
	/***calling client foresee.s here **/
	if (foresee.fsrSetClientFunc() == false) return;
	/***/
	if(stickyCounter >= foresee.triggerParms["lf"] && foresee.rNum <= foresee.triggerParms["sp"]) {
			foresee.fullURL = foresee.popupURL + "?" + "width=" + foresee.triggerParms["width"] + "&height=" + foresee.triggerParms["height"] +
				"&cid=" + foresee.specialEscape(escape(foresee.triggerParms["cid"]));
			if (foresee.triggerParms["sid"] != null && foresee.triggerParms["mid"] == null) {
				foresee.fsrSetFilter();
			}
			if (foresee.triggerParms["mid"] != null) 
				foresee.fullURL += "&mid=" + foresee.specialEscape(escape(foresee.triggerParms["mid"]));					
			if (foresee.triggerParms["omb"] != null) {
				foresee.fullURL += "&omb=" + escape(foresee.triggerParms["omb"]);
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
		    if (foresee.triggerParms["userURL"] == 1) {
				foresee.triggerParms["cpp_1"] = "userURL:"+ foresee.cppUrlPatch (window.location.href);
			}
			if (foresee.triggerParms["capturePageView"] == 1) {
				foresee.triggerParms["cpp_2"] = "PageView:"+ stickyCounter; /*customer parameter 2 - Page View*/
			}
		    foresee.triggerParms["cpp_3"] = "Browser:"+ foresee.cppUrlPatch (foresee.detect) + ";" + foresee.triggerParms["captureTriggerVersion"] +";normal";					
			
	        var customerParams = "";
			for(paramKey in foresee.triggerParms) {
				if(paramKey.substring(0,3) == "cpp"){
					foresee.fullURL += "&"+ paramKey + "=" + escape(foresee.triggerParms[paramKey]);
				}
			}
			foresee.setFSRSurveyCookie();

   			/*for AOL and Opera users - show DHTML  (by default) because their PopupBlocker behaves differently*/
			if (foresee.fsr_aol==false && foresee.fsr_opera==false) {
				if (foresee.triggerParms["displayMode"]!=3){ 
					foresee.myPopUp = window.open(foresee.fullURL, 'ForeseeSurveyWindow',foresee.winOptions);
					if(foresee.myPopUp != null && !foresee.myPopUp.closed) {
						foresee.myPopUp.focus();
					}
				}
  			}			
			if (!document.layers && foresee.triggerParms["displayMode"] !=2) {
				if (foresee.fsr_NS8) foresee.triggerParms["dhtmlHeight"] = foresee.triggerParms["dhtmlHeight"] + 15;
				/**create empty hidden div**/
				if (foresee.triggerParms["dhtmlHighlight"]==1) foresee.fsrShowDIV("fsrOverlayDiv", 0, 0, 100, 100, "hidden", 9999, "fixed", "wait");
				/**creating foresee invite div element using DOM**/ 
				if (!foresee.fsrCreateDIV("1", "FSRInviteWin", foresee.triggerParms["dhtmlLeft"], foresee.triggerParms["dhtmlTop"], 100, 100, "hidden", "cframe", foresee.triggerParms["dhtmlWidth"], foresee.triggerParms["dhtmlHeight"], "NO", foresee.triggerParms["dhtmlURL"]+ "?" +document.domain+"&"+foresee.triggerParms["domain"])) { foresee.fsrWriteCookie("FSRDivCreated", "false"); return;}
	 		    /*DC I verification*/
				if ((foresee.triggerParms["midexp"] ) != null) {
					foresee.dcQString = "ndc=1&midexp=" + foresee.triggerParms["midexp"] + "&mid=" + foresee.specialEscape(escape(foresee.triggerParms["mid"]));
					if(foresee.triggerParms["dcUniqueId"]!=null) { foresee.dcQString += "&dcUniqueId=" + foresee.specialEscape(escape(foresee.triggerParms["dcUniqueId"])); }
				}						
				/*Failover Check*/
				foresee.newDt   = new Date();
				foresee.currTime= foresee.newDt.getTime(); /*in millisecs*/
				foresee.OTCImg = new Image();
				foresee.OTCImg.onerror = foresee.otcErrorProc;
				foresee.OTCImg.onload = foresee.otcOnloadProc;
				foresee.OTCImg.src = foresee.OTCImgURL + "?protocol=" + window.location.protocol + "&uid="+ foresee.currTime;	/*for NE/FF Cache Fix*/
			}
 	}
}
foresee.openMultiVendorSurvey = function openMultiVendorSurvey(randNum) {
		foresee.closeTrackerWin();			/**Explicitly closing tracker if its open **/		
		/**Looping through MultiVendors**/
		var spVendor1 = foresee.triggerParms["sp"];
		for(var key in foresee.vendorLookupTable) {
			pos = foresee.vendorLookupTable[key].indexOf(foresee.triggerParms["fsrCkSeparator"]);
			vendorSP = foresee.vendorLookupTable[key].substring(0,pos);
			vendorURL= foresee.vendorLookupTable[key].substring(pos+2);
			if (randNum > spVendor1 && randNum <= vendorSP) {
				foresee.setFSRSurveyCookie();
				foresee.fsrCreateScript(vendorURL, "head");		/*appending dynamic vendor's survey code at the end of tag*/
				return;
			}
			spVendor1 = vendorSP;
		}
}
foresee.fsrSetAdminParms = function fsrSetAdminParms(){
	if (foresee.fsrReadCookie("lf","FSRAdmin") != null && foresee.fsrReadCookie("lf","FSRAdmin") != null) {
		foresee.triggerParms["lf"] = foresee.fsrReadCookie("lf","FSRAdmin");
		foresee.triggerParms["sp"] = foresee.fsrReadCookie("sp","FSRAdmin");
	}
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
			foresee.triggerParms["sp"] = lookupParams[0];
			foresee.triggerParms["mid"] = lookupParams[1];
			if (lookupParams.length == 3)	foresee.triggerParms["lf"] = lookupParams[2];
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
	for (foresee.i=0; i< anchorTags.length ; i++)
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
	foresee.fsrTagEventListeners();	//passing function reference as parameter to be executed
	/** add multivendor code here **/
	if (typeof(foresee.vendorLookupTable) != "undefined") {
		if (foresee.rNum >0 && foresee.rNum > foresee.triggerParms["sp"]) {
			foresee.openMultiVendorSurvey(foresee.rNum);
			return false;
		}
	}
	/** add flash detection code here **/
	if (foresee.triggerParms["flashDetect"]==1){
		if (foresee.fsrDetectFlash() == false) return false;
	}
	return true;
}
foresee.fsrDetectFlash = function fsrDetectFlash(){
	/** based on client requirement, return true to show survey or false to not show invite/tracker **
	 ** For IE Compatible browsers **/
	var obj = document.all.tags("OBJECT");
    for (var e=0; e<obj.length;e++){
        for (var d=0; d<obj[e].attributes.length;d++){
             if ((obj[e].attributes[d].name).toLowerCase() == "classid") {
				return false;
             }
        }
    }                                 
    /** For Mozilla based browsers **/
   	if (document.embeds && document.embeds.length > 0) {
		return false;
	}
	return true;
}
/********************************/
/**calling foresee survey code **/
/********************************/
try {
foresee.fsrSetTriggerParms();	/**used for multi-measure only, overwrite triggerParams**/
if (foresee.triggerParms["evtListener"] == 1) foresee.fsrAttachEvent(window, "load", foresee.Poll, false); else foresee.Poll();
} catch (e) {foresee.fsrExceptionHandler(foresee.triggerParms["captureTriggerVersion"],e);} 