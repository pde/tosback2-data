// Date last modified =  09242009
// Modified by =  RA

var lpMTagConfig = {
        "lpServer" : "sales.liveperson.net",
        "lpNumber" : "37457093",
        "lpProtocol" : (document.location.toString().indexOf("https:")==0) ? "https" : "http",
		"lpTagLoaded" : false,
		"lpTagSrv" : "r1.liveperson.net",
		"pageStartTime" : (new Date()).getTime() //pageStartTime is set with a timestamp as soon as the page starts loading
	}

function lpAddMonitorTag(src){if(!lpMTagConfig.lpTagLoaded){if(typeof(src)=='undefined'||typeof(src)=='object'){if(lpMTagConfig.lpMTagSrc){src=lpMTagConfig.lpMTagSrc;}else{if(lpMTagConfig.lpTagSrv&&lpMTagConfig.lpProtocol=='http'){src=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpTagSrv+'/hcp/html/mTag.js';}else{src='/hcp/html/mTag.js';}}}if(src.indexOf("http")!=0){src=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpServer+src+"?site="+lpMTagConfig.lpNumber;}else{if(src.indexOf("site=")<0){if(src.indexOf("?")<0){src=src+"?";}else{src=src+"&";}src=src+"site="+lpMTagConfig.lpNumber;}}var s=document.createElement("script");s.setAttribute("type","text/javascript");s.setAttribute("charset","iso-8859-1");s.setAttribute("src",src);document.getElementsByTagName("head").item(0).appendChild(s);}}

/*
The code below send a PAGEVAR to LP with the time [in seconds] it took the page to load. Code is executed in the onload event
*/
lpMTagConfig.calculateSentPageTime = function () {
	var t = (new Date()).getTime() - lpMTagConfig.pageStartTime;
	lpAddVars('page','pageLoadTime', Math.round(t/1000)+" sec");
};

if (window.attachEvent)window.attachEvent("onload",lpMTagConfig.calculateSentPageTime);
else window.addEventListener("load",lpMTagConfig.calculateSentPageTime,false);

//Load mtag.js inline if this is a Confermation Page else load it on page load event
if (window.attachEvent)window.attachEvent("onload",lpAddMonitorTag);
else window.addEventListener("load",lpAddMonitorTag,false);

//Variables Arrays - By Scope
if (typeof(lpMTagConfig.pageVar)=="undefined") lpMTagConfig.pageVar = new Array();
if (typeof(lpMTagConfig.sessionVar)=="undefined") lpMTagConfig.sessionVar = new Array();
if (typeof(lpMTagConfig.visitorVar)=="undefined") lpMTagConfig.visitorVar = new Array();
//Extra actions to be taken once the code executes
if (typeof(lpMTagConfig.onLoadCode)=="undefined") lpMTagConfig.onLoadCode = new Array();
//Dynamic Buttons Array
if(typeof(lpMTagConfig.dynButton)=="undefined") lpMTagConfig.dynButton=new Array();

// Function that sends variables to LP - By Scope
function lpAddVars(scope,name,value) {
	if (name.indexOf('OrderTotal')!=-1 || name.indexOf('OrderNumber')!=-1){
		if  (value=='' || value==0) return; // pass 0 value to all but OrderTotal
		else lpMTagConfig.sendCookies = false
	}
	
	value=lpTrimSpaces(value.toString());
	switch (scope){
		case "page": lpMTagConfig.pageVar[lpMTagConfig.pageVar.length] = escape(name)+"="+escape(value); break;
		case "session": lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = escape(name)+"="+escape(value); break;
		case "visitor": lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length] = escape(name)+"="+escape(value); break;
	}	
}
// Preventing long cookie transfer for IE based browsers.
function onloadEMT() { 
	var LPcookieLengthTest=document.cookie;
	if (lpMTag.lpBrowser == "IE" && LPcookieLengthTest.length>1000){
		lpMTagConfig.sendCookies=false;
	}
}

//The Trim function returns a text value with the leading and trailing spaces removed
function lpTrimSpaces(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
// Immediate Data submission function
function lpSendData(varscope,varname,varvalue){
if(typeof(lpMTag)!="undefined" && typeof(lpMTag.lpSendData)!="undefined")
  lpMTag.lpSendData(varscope.toUpperCase() +"VAR!"+ varname + "=" + varvalue, true);
}

// This need to be add to afterStartPage will work
lpMTagConfig.ifVisitorCode = [];

// The unit variable purpose is to route the chat or call to the designated skill. <LOB> should be replaced with the skill name, i.e. : sales
try{
	if (typeof(lpUnit)=="undefined")	var lpUnit='kmart';
	if (typeof(lpLanguage)=="undefined")	var lpLanguage='english';
	if(typeof(lpAddVars)!="undefined"){	
		lpAddVars("page","unit",lpUnit);
		lpAddVars("session","language",lpLanguage);
	}
	lpMTagConfig.defaultInvite ='chat'+'-' + lpUnit +'-' + lpLanguage;
	}catch(e){}

lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = onloadEMT;


/*##########################  Begin Custom Variables To Pass To LivePerson  ####################################*/
try {
	if (document.getElementById("subCategoryDisplayURL")) {
		lpAddVars('page','subCategoryDisplayURL',document.getElementById("subCategoryDisplayURL").value);
	}
}catch(e){}

try {
	if (document.getElementById("shipStock")) {
		lpAddVars('page','shipStock',document.getElementById("shipStock").value);
	}
}catch(e){}

try {
	if (document.getElementById("vcsVertical")) {
		lpAddVars('page','vcsVertical',document.getElementById("vcsVertical").value);
	}
}catch(e){}

if (typeof(omCat)!="undefined") {
	lpAddVars('page','omCat',omCat);
}

if (typeof(omVrt)=="undefined") {
	var omVrt = "general";
}

if (typeof(omVrt)!="undefined") {
	lpAddVars('page','omVrt',omVrt);
}

if (typeof(omSubCat)!="undefined") {
	lpAddVars('page','omSubCat',omSubCat);
}

if (typeof(lpOrderTotal)!="undefined") {
	lpAddVars('page','OrderTotal',lpOrderTotal);
	lpAddVars('page',lpUnit + '_OrderTotal',lpOrderTotal);
}

// Added this for JIRA ecom-108441

if (typeof(lpAppliancesTotal)!="undefined" && lpAppliancesTotal != "" && lpAppliancesTotal > 0) {
		lpAddVars('page','kmart_appliances_orderTotal',lpAppliancesTotal);
	}
	if (typeof(lpAutomotiveTotal)!="undefined" && lpAutomotiveTotal != "" && lpAutomotiveTotal > 0) {
		lpAddVars('page','kmart_automotive_orderTotal',lpAutomotiveTotal);
	}
	if (typeof(lpElectronicsTotal)!="undefined" && lpElectronicsTotal != "" && lpElectronicsTotal > 0) {
		lpAddVars('page','kmart_electronics_orderTotal',lpElectronicsTotal);
	}
	if (typeof(lpLawnandGardenTotal)!="undefined" && lpLawnandGardenTotal != "" && lpLawnandGardenTotal > 0) {
		lpAddVars('page','kmart_lawngarden_orderTotal',lpLawnandGardenTotal);
	}
	if (typeof(lpFitnessTotal)!="undefined" && lpFitnessTotal != "" && lpFitnessTotal > 0) {
		lpAddVars('page','kmart_fitness_orderTotal',lpFitnessTotal);
	}
	if (typeof(lpToolsTotal)!="undefined" && lpToolsTotal != "" && lpToolsTotal > 0) {
		lpAddVars('page','kmart_tools_orderTotal',lpToolsTotal);
	}
	if (typeof(lpHomeTotal)!="undefined" && lpHomeTotal != "" && lpHomeTotal > 0) {
		lpAddVars('page','kmart_home_orderTotal',lpHomeTotal);
	}
	if (typeof(lpGeneralTotal)!="undefined" && lpGeneralTotal != "" && lpGeneralTotal > 0) {
		lpAddVars('page','kmart_general_orderTotal',lpGeneralTotal);
	}	


// End fix for jira ecom-108441


//Added as a new feature for ESOC-15277
//Pool
try {
if(omPrefix=='Product Summary' && typeof isPool != "undefined" && isPool == 1)

{ lpAddVars('page','POOL ',isPool ); } 
else if(omPrefix=='Product Summary' && typeof isPool != "undefined" && isPool == 0) 

{ lpAddVars('page','POOL ',isPool ); } 
}catch(e){}
//END ESOC-15277


if (typeof(lpOrderNumber)!="undefined") {
	lpAddVars('page','OrderNumber',lpOrderNumber);
	lpAddVars('page',lpUnit + '_OrderNumber',lpOrderNumber);
}
/*##########################  End Custom Variables To Pass To LivePerson  ####################################*/



/*##########################  Begin Dynamic Button Code  ####################################*/
if(typeof(lpMTagConfig.dynButton)!="undefined") {
	if(document.getElementById("lpOrderNowChat")){
		lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {"name":lpUnit+"-chat-ordernow-sales-english","pid":"lpOrderNowChat","afterStartPage":true,"ovr":"lpMTagConfig.omniInteg"};
	}
	
	if(document.getElementById("lpOrderNowVoice")){
		lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {"name":lpUnit+"-voice-ordernow-sales-english","pid":"lpOrderNowVoice","afterStartPage":true,"ovr":"lpMTagConfig.omniInteg"};
	}

	if(document.getElementById("lpVoiceBTC")) {
		lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {"name":lpUnit+"-voice-personalshopper-btc-english","pid":"lpVoiceBTC","afterStartPage":true,"ovr":"lpMTagConfig.omniInteg"};
	}

	if(document.getElementById("lpChatBTC")) {
		lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {"name":lpUnit+"-chat-personalshopper-btc-english","pid":"lpChatBTC","afterStartPage":true,"ovr":"lpMTagConfig.omniInteg"};
	}

	if(document.getElementById("csClickChat")) {
        lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {"name":lpUnit+"-chat-cshome-service-english","pid":"csClickChat","afterStartPage":true,"ovr":"lpMTagConfig.omniInteg"};
    }

	if(document.getElementById("csClickTalk")) {
        lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {"name":lpUnit+"-voice-cshome-service-english","pid":"csClickTalk","afterStartPage":true,"ovr":"lpMTagConfig.omniInteg"};
    }
}
/*##########################  Begin Dynamic Button Code  ####################################*/



/*##########################  Begin Omniture Tracking Code  ####################################*/
if(typeof(lpMTagConfig.omniInteg)=='undefined') {lpMTagConfig.omniInteg = new Object();}
lpMTagConfig.omniInteg.dbClicked = function (objName, status, mcChannel) {
	try {
		var objRef = eval(objName);	
		var mcBut = false;
		if (typeof(mcChannel)!='undefined') {
			mcBut = true;
		}
		
		var sendStatus = '';
		var sendChannel = '';	
		var bName = '';
		if (mcBut) {
			if (mcChannel == 1) { //CHAT
				sendChannel = 'chat';
				sendStatus = status.chat.name;
			}
			else {
				sendChannel = 'voice';
				sendStatus = status.voice.name;
			}
			bName= objRef.butConfig.buttonName;		
		}
		else {
			bName= objRef.buttonName;	
			sendStatus = status;
		}
		
		if (sendStatus == 'online') {
			if (mcBut) {
				lpMTagConfig.notifySears(bName, sendChannel);
			}
			else {
				lpMTagConfig.notifySears(bName);
			}
		}
	}
	catch (e) {}
	return true;
};

lpMTagConfig.notifySears = function (bName, channel) {
	try{
		//Omniture tracking call - ButtonClicked
		var lpImg = new Image();
		var src = "//searscom.112.2O7.net/b/ss/searscom/1/H.9--NS/0?v36=" + bName + "-" + omCat;
		if (typeof(channel) != 'undefined') {
			src += '&channel=' + channel;
		}
		lpImg.src= src;
	} catch(e){}
}
/*##########################  End Omniture Tracking Code  ####################################*/