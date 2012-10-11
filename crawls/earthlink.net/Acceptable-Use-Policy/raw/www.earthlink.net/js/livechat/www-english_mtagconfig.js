// Date last modified = 20081203
// Modified by =Eyal Gross
var lpMTagConfig = {
        'lpServer' : "sales.liveperson.net",
        'lpNumber' : "43518785",
        'lpProtocol' : (document.location.toString().indexOf("https:")==0) ? "https" : "http",
		'sendCookies' : true
	}
function onloadEMT() {
	//  Preventing long cookie transfer for IE based browsers.
	var LPcookieLengthTest=document.cookie;
	if (lpMTag.lpBrowser == 'IE' && LPcookieLengthTest.length>1900){
		lpMTagConfig.sendCookies=false;
	}
}
function lpAddMonitorTag(src){if(typeof(src)=='undefined'||typeof(src)=='object'){src=lpMTagConfig.lpMTagSrc?lpMTagConfig.lpMTagSrc:'/hcp/html/mTag.js';}if(src.indexOf('http')!=0){src=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpServer+src+'?site='+lpMTagConfig.lpNumber;}else{if(src.indexOf('site=')<0){if(src.indexOf('?')<0)src=src+'?';else src=src+'&';src=src+'site='+lpMTagConfig.lpNumber;}};var s=document.createElement('script');s.setAttribute('type','text/javascript');s.setAttribute('charset','iso-8859-1');s.setAttribute('src',src);document.getElementsByTagName('head').item(0).appendChild(s);}

if (window.attachEvent) window.attachEvent('onload',lpAddMonitorTag);
else window.addEventListener("load",lpAddMonitorTag,false);

//Dynamic Buttons Array
if(typeof(lpMTagConfig.dynButton)=="undefined") lpMTagConfig.dynButton=new Array();

//Variables Arrays - By Scope
if (typeof(lpMTagConfig.pageVar)=='undefined') lpMTagConfig.pageVar = new Array();
if (typeof(lpMTagConfig.sessionVar)=='undefined') lpMTagConfig.sessionVar = new Array();
if (typeof(lpMTagConfig.visitorVar)=='undefined') lpMTagConfig.visitorVar = new Array();

// Function that sends variables to LP - By Scope
function lpAddVars(scope,name,value) 	{
	if (value != 0 && value != "")  //This is optional, depends if client wants to pass 0 or blank values
	{
	value=lpTrimSpaces(value.toString());
	switch (scope){
		case "page": 
			lpMTagConfig.pageVar[lpMTagConfig.pageVar.length] = escape(name)+"="+escape(value);
			break;
		case "session": 
			lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = escape(name)+"="+escape(value);
			break;
		case "visitor": 
			lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length] = escape(name)+"="+escape(value);
			break;
		}
	}
}

//Visitor activity indicator
//lpMTagConfig.enableActivityMon =<true/false>; //By default true
//lpMTagConfig.inactivityPeriod=<Inactivity Period in Sec>; //By default 120
//lpMTagConfig.actPollingInterval =<value in sec>; // By default 3 sec


//Prevent Invitation shown off page
lpMTagConfig.lpInvitePreventOffpage = true; // <true/false>  Can be change to false.

// Variables submission using lpGetVariables
/*
function lpGetVariables() {
var udes = new Array();
udes['<Scope:page/session/visitor>'] = new Array();
udes['<Scope:page/session/visitor>'][<counter>] = '<Variable Name>=<Variable Value>'; //First counter =0 
return udes;
}
*/

// Immediate Data submission function
function lpSendData(varname,varvalue,varscope){
if(typeof(lpMTag)!='undefined' && typeof(lpMTag.lpSendData)!='undefined')
  lpMTag.lpSendData('&'+varscope+'VAR!'+ varname + '=' + varvalue, true);
}

//The Trim function returns a text value with the leading and trailing spaces removed
function lpTrimSpaces(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

//Omit a specific cookie from the list of cookies that is being sent to LP with the monitor
/*
lpMTagConfig.GetPageCookies = function () {
var cookies = document.cookie;
if ((typeof(cookies) == "undefined") || (cookies == null)) {
            cookies = "";
}
cookies = cookies.replace(/COOKIENAME=[a-zA-Z0-9\-!]*;?/,"");
return cookies;
};
*/
// The unit variable purpose is to route the chat or call to the designated skill. <LOB> should be replaced with the skill name, i.e. : sales
try{
	if (typeof(lpUnit)=='undefined')	var lpUnit='www';
	if(typeof(lpAddVars)!="undefined")	lpAddVars('page','unit',lpUnit);
	if (typeof(lpLanguage)=='undefined')	var lpLanguage='english';
	if(typeof(lpAddVars)!="undefined")	lpAddVars('session','language',lpLanguage);
	lpMTagConfig.defaultInvite = "chat-" + lpUnit + "-" + lpLanguage;
	}catch(e){}
	
if (typeof(lpMTagConfig.db1)=='undefined') {
    lpMTagConfig.db1 = new Object(); // needed if does not already exist
}
lpMTagConfig.db1.dbStart = function (objName) {
	objRef = eval(objName);
	if (objRef==null) return true;
	objRef.buttonName = objRef.origButtonName;
	objRef.roomName = objRef.origButtonName;
	//save the button name, we need to delete the object it references later
            lpMTagConfig.lastBtName = objName;
                        
            objRef = eval(objName);
            if (objRef == null) return true;
            try {
                        objRef.imgDefaultName = objRef.imgDefaultName + '?d=' + (new Date()).getTime();
            }
            catch (e) {
                        if (lpConnLib.DebugDisplay) lpMTagDebug.Display('DynBut override failed setting default Image name' ,'ERROR');
            };
            
	return true;
}
//overriding online action
lpMTagConfig.db1.onlineAction = function (objName) {
      objRef = eval(objName);
	  var chatWinURL = objRef.getActionURL("Available");
	  chatWinURL = chatWinURL.replace(/forceOffline/,"SESSIONVAR%21OnlineClickOverride");
      window.open(chatWinURL,'Chat'+lpMTagConfig.lpNumber,'width=472,height=320,status=0,resizable=0,menubar=no,scrollbars=no,location=no');
	  //client online-function  I took from old code.
	  var s=s_gi(OmServer);s.linkTrackVars='prop3,prop6';s.prop3='WWW Live Sales Chat';
	  s.prop6=s.pageName;s.tl(this,'o','External.Other');hideDiv('live_chat_component');
};
lpMTagConfig.inviteChatStart = function (objName) {
    var inviteObj = eval(objName);
    if (inviteObj==null) {
        return true;
    }
	
	var aref = document.getElementById(inviteObj.aRefCloseID);
	if (aref!=null) {
		aref.href = 'javascript:;';
	}
	aref = document.getElementById(inviteObj.aRefNeedHelpID);
	if (aref!=null) {
		aref.href = 'javascript:;';
	}
	
	return true;
}