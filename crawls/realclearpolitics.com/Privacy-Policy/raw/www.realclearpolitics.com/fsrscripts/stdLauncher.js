/************ don't modify below this line *********
 *************  Version: Standard 5.1 **************
 ****** Copyright 2001-2008 ForeseeResults, Inc****/
var popupURL = "//www.foreseeresults.com/survey/display";
var FSRImgURL= "//www.foreseeresults.com/survey/FSRImg";
var CSURL= "//www.foreseeresults.com/survey/processCPP";
var OTCImgURL = "//controller.foreseeresults.com/fsrSurvey/OTCImg";
var ckAlreadyShown = triggerParms["ascookie"]; /* name of the persistent/session cookie*/
var ckLoyaltyCount = triggerParms["lfcookie"]; /* name of the loyalty count cookie*/
var fullURL=null;
var myPopUp=null;
var fsr_mac=null;
var fsr_aol=null;
var fsr_opera=null;
var fsr_NS8=null;	/*used in Invite Page to show Note for Netscape 8 browsers only*/
var fsr_ie=0;
var flash_version= 4;	/*supports flash version 4 and above in IE only*/
var canFlashPlay=0;
var dcQString="";
var cpp_3 = "";
var winOptions = "toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=1,height=1,top=4000,left=4000";
var persistentExpires = new Date(); /*persistent cookie expiration*/
persistentExpires.setTime(persistentExpires.getTime() + (triggerParms["rw"]*60*1000));

var detect = navigator.userAgent.toLowerCase();
var version= navigator.appVersion.toLowerCase();

/* FOR MSIE BASED BROWSERS ONLY - detect Flash Plugin & Version*/
if (detect && detect.indexOf("msie")>=0 && (version.indexOf("win") != -1) && triggerParms["flashDetect"] == 1) {
fsr_ie=1;
document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
document.write('on error resume next \n');
document.write('canFlashPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & flash_version)))\n');
document.write('</SCR' + 'IPT\> \n');
}
function ForeCStdGetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return ForeCStdGetCookieVal (j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) {
			break;
		}
	}
	return null;
}
function fsr_showWindow() {   
	 
	 if(myPopUp != null && !myPopUp.closed && fsr_aol==false && fsr_opera==false) {return;}	 	 	 
       	 var cpp3Str = ""; 
	 cpp_3 = "Browser:"+ cppUrlPatch (detect) + ";" + triggerParms["captureTriggerVersion"];
	 cpp_3+=";dhtml";	
	 var pos1 = fullURL.indexOf("&cpp_3=");
	 var pos2 = fullURL.indexOf("&",pos1+1);
	 if (pos2==-1){
		 fullURL = fullURL.substring(0,pos1);
	 }else{
	     cpp3Str = fullURL.substring(pos2,fullURL.length);
	     fullURL = fullURL.substring(0,pos1);
	 }	 
	 fullURL+="&cpp_3="+cpp_3 + cpp3Str;
	 	 
	
	if(document.all && document.all.fsr_window.filters) {
	    eval("document.all.fsr_window").filters.revealTrans.transition = 23 ;
	    eval("document.all.fsr_window").filters.revealTrans.Apply();
	    eval("document.all.fsr_window").style.visibility = 'visible';
	    eval("document.all.fsr_window").filters.revealTrans.Play();
	}
	else if(document.all) {document.all.fsr_window.style.visibility = 'visible';}	
	else if(document.getElementById) {document.getElementById("fsr_window").style.visibility = 'visible';}	
}
function fsr_hideWindow() {
	if(document.all && document.all.fsr_window.filters) {
		eval("document.all.fsr_window").filters.revealTrans.transition = 23;
		eval("document.all.fsr_window").filters.revealTrans.Apply();
		eval("document.all.fsr_window").style.visibility = 'hidden';
		eval("document.all.fsr_window").filters.revealTrans.Play();
	}
	else if(document.all) {document.all.fsr_window.style.visibility = 'hidden';}	
	else if(document.getElementById) {document.getElementById("fsr_window").style.visibility = 'hidden';}
}
function ForeCStdSetCookie (name, value) {
	var argv = ForeCStdSetCookie.arguments;
	var argc = ForeCStdSetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape (value) +
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	((path == null) ? "" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}
function ForeCStdGetCookieVal(offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}
function specialEscape(str) {
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
function Pop(){
	myPopUp = window.open(fullURL, "survey",winOptions);
	if (  myPopUp!=null && !myPopUp.closed) {
		if (triggerParms["pu"] == 1){self.focus();
		} else { myPopUp.focus(); }
	}
}
function getURLParameters(paramName) {
	var sURL = window.document.URL.toString();		
	if (sURL.indexOf("?") > 0)
	{
		var arrParams = sURL.split("?");			
		var arrURLParams = arrParams[1].split("&");		
		for (var i=0;i<arrURLParams.length;i++)
		{
		    var sParam =  arrURLParams[i].split("=");
		    if (paramName.toLowerCase()==sParam[0].toLowerCase()){
		       	return unescape(sParam[1]);
		    }
		}
	}
	else
	{
		return "";
	}
}
function currentLocationExcluded() {	
	var parentURLPath = window.location.pathname;/*location path*/
	for(key in excludeList) {
		if(parentURLPath.indexOf(excludeList[key]) != -1) {
			return true;
		}
	}
	return false;
}
var newDt;
var currTime;	/*in millisecs*/
var OTCImg;
var FSRImg;
var surveyProcessCont = 1;
function stdImgProc() {
	if(triggerParms["compliant508"] == 1) { fsr_showWindow();}
	else { 
		setTimeout("fsr_showWindow();", triggerParms["inviteDelay"],"JavaScript");
	}
}
function fsrShowSurvey(){
	if(dcQString == "") { stdImgProc(); }
	else {
			newDt   = new Date();
			currTime= newDt.getTime(); /*in millisecs*/
			FSRImg = new Image();
			FSRImg.src = null;
			FSRImg.onerror = imgErrorProc;
			FSRImg.onload = imgOnloadProc;
			FSRImg.src = FSRImgURL + "?" + dcQString + "&uid="+ currTime;	/*for NE/FF Cache Fix*/
	}
}
function imgOnloadProc() {
	if(surveyProcessCont == 1 && FSRImg.width == 3) { stdImgProc(); }
  	return true;
}
function imgErrorProc() {
	surveyProcessCont = 0;
	return true;
}
function otcOnloadProc() {    
	if(surveyProcessCont == 1 && OTCImg.width == 3) { fsrShowSurvey(); }
	else { surveyProcessCont = 0; }
  	return true;
}
function otcErrorProc() {
	fsrShowSurvey();
	return true;
}
function setVisualSciencesId(theURL)
{
	var VisualSciencesId = ForeCStdGetCookie("v1st");
	if(VisualSciencesId != null && VisualSciencesId != "")
	{
		triggerParms["cpp_4"] = "VisualSciencesId:" + escape(VisualSciencesId);	
	}
}
function setOmnitureId(theURL)
{
	var OmnitureId = ForeCStdGetCookie("s_foreSeeId");
	if(OmnitureId != null && OmnitureId != "")
	{
		triggerParms["cpp_0"] = "OmnitureId:" + escape(OmnitureId);	
	}
}
function checkFlashParms(tagName){
	tagName = tagName.toLowerCase();
	for(key in flashTagList) {
		if(tagName.indexOf(flashTagList[key]) != -1) {
			return true;
		}
	}
	return false;
}
function fsr_detectFlash(){
	if (fsr_ie){
	    /** For IE Compatible browsers **/
	    var obj = document.all.tags("OBJECT");
	    for (var e=0; e<obj.length;e++){
	       for (var d=0; d<obj[e].attributes.length;d++){
		  if ((obj[e].attributes[d].name).toLowerCase() == "classid") {
			if (checkFlashParms(obj[e].attributes[d].value)){
			   return true;
			}
			else {
			   return false;
			}
		  }
	       }
	    }
	}					    
	else{
	    /** For Netscape Compatible browsers **/
	    for (var e=0; e<document.embeds.length;e++){
		if (checkFlashParms(document.embeds[e].src)) {
		   return true;
		}
		
	    }
	}
	return false;
}
function isValidFlash(){
   if (triggerParms["flashDetect"]==1){
        if (fsr_detectFlash()){
		var fsr_opera75 = (detect.indexOf("opera 7.54u1") >=0) ? 1 : 0;
		var fsr_NS = ((detect.indexOf("netscape") >=0) || (detect.indexOf("firefox") >=0)) ? 1 : 0;
		if (fsr_NS)
			flash_version=7;	/*Netscape Mozilla supports flash player 7 and above*/
		if (fsr_mac)
			flash_version=8;	/*Mac Browsers supports flash player 8 and above*/

		/** FOR MOZILLA BASED BROWSERS - detect flash plugin & version **/
		var plugin=(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"]?navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin:0);
		if (plugin && parseInt(plugin.description.substring(plugin.description.indexOf(".")-1))>=flash_version) 
		{ canFlashPlay=1; }

		if ((plugin ==0 || plugin==null) && !canFlashPlay){
			triggerParms["displayMode"]=1;
   		}
		else {
			/** Skip dhtml invite for the following browsers:
			 ** For Opera ver 7.5 and below and 
			 ** All Netscape Browsers with flash ver < 7
			 ** Mac Browsers with flash 7 and below
			 ** Reason: possible bug in browser or with flash player using wmode
			 **
			 ** Show Flash for all other browsers with flash >=4
			 ** Supports IE5+,AOL7+,AOLExplorer,MAC,OPERA8+,FF,NS7+
			 **/
			if ((fsr_NS && canFlashPlay) || (!fsr_opera75 && canFlashPlay)){
				if (triggerParms["displayMode"] != 2){
					return true;
				}
			}
			triggerParms["displayMode"]=2;
		}
	}
   }
   if (triggerParms["displayMode"] >0){
   	triggerParms["inviteDelay"]= 1000;	/*overwrite invite timeout to 1 sec*/
	return true;
   }
   return false;
}
function isAlreadyShown(){
	/*check if we already have shown survey or OE Scout Tracker has been closed*/
	if (ForeCStdGetCookie(ckAlreadyShown) != null || (ForeCStdGetCookie("ScoutRunningCheck") !=null && ForeCStdGetCookie("ScoutRunningCheck") == "ScoutClosed"))
		return true;
	return false;
}
function Poll() { 
	if(triggerParms["displayMode"] == 0) {
		return;
	}
	if(currentLocationExcluded()) {
		return;
	}
	var stickyCounter = ForeCStdGetCookie(ckLoyaltyCount); /*check counter cookie*/
	var pageCount;
	var randNum = Math.random();
	randNum *= 100;
	if (stickyCounter == null) {
		pageCount = 1; 
        	ForeCStdSetCookie(ckLoyaltyCount, pageCount, null,'/',triggerParms["domain"]);
		stickyCounter = ForeCStdGetCookie(ckLoyaltyCount);
	}
	if (stickyCounter != null) {
		pageCount = stickyCounter;
		if(pageCount >= triggerParms["lf"]) {
			if(!isAlreadyShown()) {
				if (triggerParms["rso"] == 1 && triggerParms["aro"] == 1) {
					triggerParms["sp"] = 100.0; /*Update Sample percentage*/
				}
				if(randNum <= triggerParms["sp"]) {
				        fsr_aol= ((detect.indexOf("aol") >=0) || (detect.indexOf("america online browser") >=0)) ? 1 : 0;
					fsr_opera = (detect.indexOf("opera") >=0) ? 1 : 0;
					fsr_mac= (navigator.platform.indexOf("Win32") >= 0) ? 0 : 1;
					fsr_NS8=(detect.indexOf("netscape/8") >=0) ? 1 : 0;
				        fsr_browser="fsr_nn6";
				        if(document.all || document.getElementById){ 
				       		fsr_browser = "fsr_ie";
					}
					if(document.layers) {
						fsr_browser = "fsr_nn";
					}	
					fullURL = popupURL + "?" + "width=" + triggerParms["width"] + "&height=" + triggerParms["height"] +
						"&cid=" + specialEscape(escape(triggerParms["cid"]));
					if (triggerParms["mid"] != null) 
						fullURL += "&mid=" + specialEscape(escape(triggerParms["mid"]));					
					if (triggerParms["omb"] != null) {
						fullURL += "&omb=" + escape(triggerParms["omb"]);
					}
					if ((triggerParms["cmetrics"] ) != null) {
						fullURL += "&cmetrics=" + escape(triggerParms["cmetrics"]);
					}
					if (triggerParms["olpu"] == 1) {
						fullURL += "&olpu=1";
					}
					if ((triggerParms["dcUniqueId"]) != null) {
						fullURL += "&dcUniqueId=" + escape(triggerParms["dcUniqueId"]);
					}
					if (triggerParms["rso"] == 1) {
						fullURL += "&rso=1&rct=" + triggerParms["rct"] + "&rds=" + triggerParms["rds"] + "&mrd=" + triggerParms["mrd"] + "&rws=" + triggerParms["rw"];
					}
					if ((triggerParms["midexp"] ) != null) {
						fullURL += "&ndc=1&fsexp=5256000&midexp=" + triggerParms["midexp"];
					}
				        if (triggerParms["userURL"] == 1) {
						triggerParms["cpp_1"] = "userURL:"+ cppUrlPatch (window.location.href);
					}
					if (triggerParms["capturePageView"] == 1) {
						triggerParms["cpp_2"] = "PageView:"+ pageCount; /*customer parameter 2 - Page View*/
					}
				        triggerParms["cpp_3"] = "Browser:"+ cppUrlPatch (detect) + ";" + triggerParms["captureTriggerVersion"] +";normal";					
					
					if (triggerParms["visualScienceId"] == 1) {
						setVisualSciencesId(fullURL);
					}
					if (triggerParms["omnitureId"] == 1) {
						setOmnitureId(fullURL);
					}
				        var customerParams = "";
					for(paramKey in triggerParms) {
						if(paramKey.substring(0,3) == "cpp"){
							fullURL += "&"+ paramKey + "=" + escape(triggerParms[paramKey]);
						}
					}
					if (triggerParms["rso"] != 1) {
						if(triggerParms["npc"] == 1) {
							ForeCStdSetCookie(ckAlreadyShown, 'true',null,'/',triggerParms["domain"]);
						} else {
							ForeCStdSetCookie(ckAlreadyShown, 'true', persistentExpires,'/',triggerParms["domain"]);
						}
					}
					
					if (triggerParms["sid"] != null && triggerParms["mid"] == null) {fsrSetFilter();}
						
        				/*for AOL and Opera users - show DHTML  (by default) because their PopupBlocker behaves differently*/
	   				if (fsr_aol==false && fsr_opera==false) {
	   					if (triggerParms["displayMode"]==1 || triggerParms["displayMode"]==2){ 
							myPopUp = window.open(fullURL, 'survey',winOptions);
						}
	   				}		

					/** detect flash with valid browser and player version**/
					if (fsr_browser != "fsr_nn" && isValidFlash() && triggerParms["displayMode"] !=2) {
						if (fsr_NS8) triggerParms["dhtmlHeight"] = triggerParms["dhtmlHeight"] + 15;
						document.write("<div id=\"fsr_window\" style=\"width:" + triggerParms["dhtmlWidth"] + "px; height:" + triggerParms["dhtmlHeight"] + "px; position:absolute; left:" + triggerParms["dhtmlLeft"]+"px; top:"+ triggerParms["dhtmlTop"]
                                                                                                 + "px; z-index:"+triggerParms["dhtmlIndex"]+"; border:0; overflow:hidden; visibility:hidden; filter:revealTrans(Duration=0.5, Transition=23);\">"
                                                                                                 + "<iframe id=\"cframe\" src="+"\""+ triggerParms["dhtmlURL"]+"\" FrameBorder=0 Scrolling=NO width="+triggerParms["dhtmlWidth"]+" height="+triggerParms["dhtmlHeight"]+"></iframe></div>");

					              /*DC I/II verification*/
						if (triggerParms["rso"] == 1) {
							dcQString = "rso=1&rct=" + triggerParms["rct"] + "&rds=" + triggerParms["rds"] + "&mrd=" + triggerParms["mrd"] + "&rws=" + triggerParms["rw"];
							if(triggerParms["dcUniqueId"]!=null) { dcQString += "&dcUniqueId=" + specialEscape(escape(triggerParms["dcUniqueId"])); }
						}
						if ((triggerParms["midexp"] ) != null) {
							dcQString = "ndc=1&midexp=" + triggerParms["midexp"] + "&mid=" + specialEscape(escape(triggerParms["mid"]));
							if(triggerParms["dcUniqueId"]!=null) { dcQString += "&dcUniqueId=" + specialEscape(escape(triggerParms["dcUniqueId"])); }
						}						

						/*Failover Check*/
						surveyProcessCont = 1;		
						newDt   = new Date();
						currTime= newDt.getTime(); /*in millisecs*/
						OTCImg = new Image();
						OTCImg.src = null;
						OTCImg.onerror = otcErrorProc;
						OTCImg.onload = otcOnloadProc;
						OTCImg.src = OTCImgURL + "?protocol=" + window.location.protocol + "&uid="+ currTime;	/*for NE/FF Cache Fix*/
					}
					
					if(myPopUp != null && !myPopUp.closed) {
						if (triggerParms["pu"] == 1){ self.focus(); }
						else { myPopUp.focus();}
					}
				}	
			}
		}			
		pageCount++;
        ForeCStdSetCookie(ckLoyaltyCount, pageCount, null,'/',triggerParms["domain"]);		
 	}
}
function isGoogleSponsoredLink(pageURL, sParam) {
	if (pageURL.toLowerCase().indexOf(sParam.toLowerCase()) >=0){
		return true;
	}
	return false;
}
function fsrSetFilter() {
	fullURL += "&sid=" + triggerParms["sid"];
	if (triggerParms["patternType"] != null && (triggerParms["patternType"].toUpperCase()).indexOf("URL") != -1) {
		fullURL += "&pattern="+ cppUrlPatch (window.location.href);
	}
	else if (triggerParms["patternType"] != null && (triggerParms["patternType"].toUpperCase()).indexOf("CK=") != -1) {
		var pos = triggerParms["patternType"].indexOf("=");
		var cookieValue = ForeCStdGetCookie(triggerParms["patternType"].substring(pos+1));
		fullURL += "&sid=" + triggerParms["sid"] + "&pattern="+ cppUrlPatch(cookieValue);
	}
	else if (triggerParms["patternType"] != null && (triggerParms["patternType"].toUpperCase()) != null && triggerParms["patternType"].length >0) {
		fullURL += "&sid=" + triggerParms["sid"] + "&pattern="+ escape(triggerParms["patternType"]);
	}	
}