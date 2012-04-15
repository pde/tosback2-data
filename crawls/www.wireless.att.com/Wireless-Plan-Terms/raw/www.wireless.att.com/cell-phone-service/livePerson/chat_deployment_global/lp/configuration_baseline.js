/* 
Begin Configuration Script
This should be called AFTER the section-specific configuration scripts
*/
var lpNumber;
if (typeof(lpNumber)=="undefined") {
	lpNumber = "76226072"; 
}

var lpServerName;
if (typeof(lpServerName)=="undefined") {
	lpServerName = "sales.liveperson.net";
}

var tagVars;
var lpUASexistingTagVars=null;
if (typeof(tagVars)=="undefined") {
	tagVars = ""; 
} else {
	lpUASexistingTagVars = tagVars;
}

var lpUASlanguage;
if (typeof(lpUASlanguage)=="undefined") {
	lpUASlanguage="english";
}

var lpUASimagesFolder;
if (typeof(lpUASimagesFolder)=="undefined")
	lpUASimagesFolder = lpUASunit + "-" + lpUASlanguage;
if (lpUASimagesFolder.indexOf("((shared))")==0)
	lpUASimagesFolder = lpUASimagesFolder.substring("((shared))".length);

var lpUASbuttonImagesFolder;
if (typeof(lpUASbuttonImagesFolder)=="undefined")
	lpUASbuttonImagesFolder = lpUASimagesFolder +"/button";
if (typeof(lpUASbuttonType)!="undefined")
	lpUASbuttonImagesFolder += "-" + lpUASbuttonType;

var lpUASInvitationImagesFolder;
if (typeof(lpUASInvitationImagesFolder)=="undefined")
	lpUASInvitationImagesFolder = lpUASimagesFolder +"/invitation";

var lpUASimageURL;
if (typeof(lpUASimageURL)=="undefined" && typeof(lpUASimagesPath)!="undefined")
	lpUASimageURL = lpUASimagesPath + "/" + lpUASInvitationImagesFolder;

var lpPosX = lpUASinvitePositionX;
var lpPosY = lpUASinvitePositionY;

if (typeof(lpUASunit)!="undefined")
	tagVars = tagVars + '&PAGEVAR!unit=' + escape(lpUASunit);

if (typeof(lpUASlanguage)!="undefined")
	tagVars = tagVars + '&SESSIONVAR!language=' + escape(lpUASlanguage);

if (typeof(lpUASwebsite)!="undefined")
	tagVars = tagVars + '&PAGEVAR!UASwebsite=' + escape(lpUASwebsite);

if (typeof(lpUASwebsite)!="undefined" && typeof(lpUASunit)!="undefined")
	tagVars = tagVars + '&PAGEVAR!UASwebsiteUnit=' + escape(lpUASwebsite+":"+lpUASunit);

if (typeof(lpUAScontext)!="undefined")
	tagVars = tagVars + '&PAGEVAR!UAScontext=' + escape(lpUAScontext);

var lpUAScontext;
if (typeof(lpUAScontext)=="undefined") {
	lpUAScontext = document.title;
}

var lpCustomImageURL;
if (typeof(lpCustomImageURL)=="undefined")
	lpCustomImageURL = lpUASimageURL + "/";

if (typeof(lpUASinvitationTitle)!="undefined") {
	lpCustomInvitationTitle = lpUASinvitationTitle;
} else {
	lpCustomInvitationTitle="Invitation popup window for live chat with a representative";
}

if (typeof(lpUASinvitationCloseTitle)!="undefined") {
	lpCustomInvitationCloseTitle = lpUASinvitationCloseTitle;
} else {
	lpUASinvitationCloseTitle="Close chat invitation";
}

if (typeof(lpUASbuttonTitle)=="undefined") {
	lpUASbuttonTitle = "Live Chat";
}

if (typeof(lpSaveRejectStatus)=="undefined") {
	lpSaveRejectStatus = true;
}

if (typeof(lpRejectStateTimeout)=="undefined") {
	lpRejectStateTimeout = 300;
}
function lpdbButtonAction() {}

// Variable to be populated in function that triggers the click action
function lpUASaction(lpUASvarName, lpUASvarValue){
var lpUASimgAction = new Image();
lpUASimgAction.src="https://sales.liveperson.net/hc/76226072/cmd/url/?site=76226072&page=https://sales.liveperson.net/hcp/width/img30.gif&SESSIONVAR!" + lpUASvarName + "=" + lpUASvarValue;
}

// Variable to be populated in function that triggers the click action
function LPFillOrderXML(Category, ProductName, Quantity, TotalPrice) {
var xml = "";
xml = "<item";
if (Category != null && Category!="") xml += "%20category=\"" + escape(Category) + "\"";
if (ProductName != null && ProductName!="") xml += "%20name=\"" + escape(ProductName) + "\"";
if (Quantity != null && Quantity!="") xml += "%20quantity=\"" + escape(Quantity) + "\"";
	if (TotalPrice != null && TotalPrice!="")
		 xml += "%20price=\"" + escape(TotalPrice) + "\"";
xml += "%20/>";
return xml;
}
/* 
End Configuration Script
*/
