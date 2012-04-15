/////////////////////////////////////////////////
//                                             //
//  KANA Response Live Chat Functions          //
//  Version $Revision: 1.3.2.2 $                    //
//                                             //
//  Copyright (c) 2004 - KANA Inc.    		   //
//  All Rights Reserved.  Patent Pending.      //
//                                             //
/////////////////////////////////////////////////

// Default values
//var gIChannel = "Default";
var gServerName = "chatweb.footlocker.com";
var gAttachedData = "sampleAttachedDataValue";
var gEnterOnQueuePage = false;

var gPrefillValues = {};


var gAgentOnlyValues = {};

 
//======================================================================
// Uncomment and set gAfterLaunchURL to the url of the page you want
// to display after launching live help chat
//======================================================================
//var gAfterLaunchURL="http://www.kana.com";
var HBUsePageContents = false;

// Flag to turn on/off Dynamic Start Page functionality.
var gUseDynamicStartPage = true; 
var gDSPLauncherPageName = "responseLiveLauncher.html";


var gChatWindowProperties = "width=" + gChatWindowWidth + ",height=" + gChatWindowHeight + ",menubar=no,location=no,directories=no,status=no,toolbar=no,scrollbars=auto,resizable=no,screenX=10,screenY=10,left=10,top=10";
var gHTTP = "http://";
var gHTTPS = "https://";

var gChatLaunchMode = "COBROWSE_ESCALATION";

function startChat(iChannel, serverName, attachedData, prefillValues, agentOnlyValues, enterOnQueuePage)
{
	gChatLaunchMode  = "CHAT_ONLY";
	launchChat(iChannel, serverName, attachedData, prefillValues, agentOnlyValues, enterOnQueuePage);
}

function startChatAndCobrowse(iChannel, serverName, attachedData, prefillValues, agentOnlyValues, enterOnQueuePage)
{
	gChatLaunchMode  = "COBROWSE";
	launchChat(iChannel, serverName, attachedData, prefillValues, agentOnlyValues, enterOnQueuePage);
}

function startChatWithEscalation(iChannel, serverName, attachedData, prefillValues, agentOnlyValues, enterOnQueuePage)
{
	gChatLaunchMode  = "COBROWSE_ESCALATION";
	launchChat(iChannel, serverName, attachedData, prefillValues, agentOnlyValues, enterOnQueuePage);
}

function launchChat(iChannel, serverName, attachedData, prefillValues, agentOnlyValues, enterOnQueuePage)
{
	if (alreadyChatting())
	{
		alert("You are already in a session.");
		var win = getChatWindow();
		if (null != win && !win.closed)
		{
			win.focus();
		}
		return;
	}

	gIChannel = iChannel || gIChannel;
	gServerName = serverName || gServerName;
	gAttachedData = attachedData || gAttachedData;
	gEnterOnQueuePage = enterOnQueuePage || gEnterOnQueuePage;
	gPrefillValues = prefillValues || gPrefillValues;
	gAgentOnlyValues = agentOnlyValues || gAgentOnlyValues;

	openInitialWindow();
}

function openInitialWindow()
{
	var newWin = window.open(gChatHelper, getChatWindowName(), getWinProperties());
	setChatWindow(newWin);
}

function finishLaunchingChat()
{
	var chatWin = getChatWindow();

	if (alreadyConavigating())
	{
		handleRecursiveLaunch(gIChannel, gServerName, chatWin);
		return;
	}

	if (browserDoesNotSupportDOM2() || isIEonMac())
	{
		handleUnsupportedBrowser(gIChannel, gServerName, chatWin);
		return;
	}

	if (!areCookiesEnabled())
	{
		handleDisabledCookies(gIChannel, gServerName, chatWin);
		return;
	}

	if(window.location.protocol == "https:")
		createAndSubmitForm();
	else
		checkSSLEnabledAndSubmit(gIChannel, gServerName);
}

function createAndSubmitForm()
{
	var chatWin = getChatWindow();
	var launchChatForm = createForm(gServerName, chatWin);

	addFormField(launchChatForm, chatWin, "CHAT_WINDOW_WIDTH", gChatWindowWidth);
	addFormField(launchChatForm, chatWin, "CHAT_WINDOW_PROPERTIES", gChatWindowProperties);
	addFormField(launchChatForm, chatWin, "ICHANNEL_ID", gIChannel);
	addFormField(launchChatForm, chatWin, "ATTACHED_DATA", gAttachedData);
	addFormField(launchChatForm, chatWin, "ENTER_ON_QUEUE_PAGE", gEnterOnQueuePage);
	addFormField(launchChatForm, chatWin, "CHAT_LAUNCH_MODE", gChatLaunchMode);
	addFormField(launchChatForm, chatWin, "AGENT_VISIBLE_DATA", createAgentVisibleDataString(gAgentOnlyValues));
	addFormField(launchChatForm, chatWin, "REFERRER_URL", window.location.href);
	if(typeof(gUseDynamicStartPage) != 'undefined' && gUseDynamicStartPage)
		addFormField(launchChatForm, chatWin, "DSP_LAUNCHER_PAGE_NAME", gDSPLauncherPageName);

	for (var prefillItem in gPrefillValues)
	{
		addFormField(launchChatForm, chatWin, prefillItem, gPrefillValues[prefillItem]);
	}

	launchChatForm.submit();
}

function createForm(serverName, win)
{
	var launchChatForm = win.document.createElement("form");
	launchChatForm.method = "post";
	launchChatForm.target = "_self";
	launchChatForm.action = gHTTPS + serverName + "/CONAV/CHAT/ChatPreLaunch";
	win.document.body.appendChild(launchChatForm);
	return launchChatForm;
}

var DATA_SEPARATOR = "_HB_";
function createAgentVisibleDataString(agentOnlyValues)
{
	var agentVisibleData = "";
	for (agentItem in agentOnlyValues)
	{
		if(isNonEmptyString(agentVisibleData))
			agentVisibleData += DATA_SEPARATOR;

		agentVisibleData += agentItem + DATA_SEPARATOR + agentOnlyValues[agentItem];
	}
	return agentVisibleData;
}

function addFormField(launchChatForm, win, name, value)
{
	if(!isNonEmptyString(name) || !isNonEmptyString(value))
		return;
	var elementObj = win.document.createElement("input");
	elementObj.type = "hidden";
	elementObj.name = name;
	elementObj.value = value;
	launchChatForm.appendChild(elementObj);
}

function alreadyChatting()
{
	var theCookieString = document.cookie;
	return (checkChatWindowExists() || (isNonEmptyString(theCookieString) && theCookieString.indexOf("hbuidv23=") > -1));
}

function checkChatWindowExists()
{
	var win = getChatWindow();
	return (null != win && !win.closed);
}

function alreadyConavigating()
{
	return (typeof(isHipboneSharedWindow) != "undefined");
}

function handleRecursiveLaunch(iChannel, serverName, win)
{
	win.location.href = gHTTPS + serverName + "/CONAV/chat/errorpages/recursiveConav.jsp?ICHANNEL_ID=" + iChannel;
}

function browserDoesNotSupportDOM2()
{
	return (null == document.getElementById);
}

function handleUnsupportedBrowser(iChannel, serverName, win)
{
	win.location.href = gHTTPS + serverName + "/CONAV/CHAT/ChatPreLaunch?ICHANNEL_ID=" + iChannel;
}

function areCookiesEnabled()
{
	var time = (new Date()).getTime();
	setTestCookie(time);
	if (theCookieIsSet(time))
	{
		removeTestCookie(time);
		return true;
	}
	return false;
}

function setTestCookie(value)
{
	document.cookie = "hbcookietest=" + value;
}

function theCookieIsSet(value)
{
	var theCookieString = document.cookie;
	return (isNonEmptyString(theCookieString) && theCookieString.indexOf(value) > -1);
}

function removeTestCookie(value)
{
	document.cookie = "hbcookietest=" + value + "; expires=Fri, 02-Jan-1970 00:00:00 GMT";
}

function handleDisabledCookies(iChannel, serverName, win)
{
	win.location.href = gHTTP + serverName + "/CONAV/chat/errorpages/cookiesDisabled.jsp?ICHANNEL_ID=" + iChannel;
}

function checkSSLEnabledAndSubmit(iChannel, serverName)
{
	createAndSubmitForm();
	var testImg = new Image(1,1);
	testImg.onerror = function() { handleChatNoSSL(iChannel, serverName); }
	testImg.src = gHTTPS + serverName + "/CONAV/HTD/Default/shared/images/blank.gif?time=" + (new Date()).getTime();
}

function handleChatNoSSL(iChannel, serverName)
{
	var link = gHTTP + serverName + "/CONAV/chat/errorpages/sslDisabled.jsp?ICHANNEL_ID=" + iChannel;
	window.open(link, getChatWindowName(), getWinProperties());
	getChatWindow().close();
}

var gChatLaunchWindow = null;
function setChatWindow(chatWin)
{
	window.gChatLaunchWindow = chatWin;
}

function getChatWindow()
{
	return window.gChatLaunchWindow;
}

function getChatWindowName()
{
	return "_blank";
}

function getWinProperties()
{
	return gChatWindowProperties;
}

function isIE()
{
    return (navigator.userAgent.toLowerCase().indexOf("msie")!=-1);
}

function isMac()
{
	return (navigator.userAgent.toLowerCase().indexOf("mac")!=-1);
}

function isIEonMac()
{
    return (isIE() && isMac())
}

function isNonEmptyString(str)
{
	if(null == str || str == "")
		return false;
	return true;
}

function goToAfterLaunchUrl()
{
    if(typeof(window.gAfterLaunchURL) == "undefined")
		return;

	window.location.href = window.gAfterLaunchURL;
}
