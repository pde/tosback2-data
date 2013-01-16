// these variables are used to pass user information to boldchat. 
var btUserInfo = {
'btVisitorId': "HomesteadUserID",
'btVisitorName': "FirstName",
'btVisitorInfo': "VisitorInfo",
'btVisitorEmail': "VisitorEmail",
'btVisitorPhone': "VisitorPhone",
};
var btConfig = {
'btAccountId': '506535311544236990',
'btServer' : 'cbi.boldchat.com/aid/506535311544236990/bc.cbhs',
'btProtocol' : (document.location.toString().indexOf('https:') == 0) ? 'https' : 'http',
'btWebsiteId' : '4064716462580392540',
'btSalesChatDeptId': '564166938410397993',
'btSalesChatWindowId': '3934026869890156837',
'btSupportChatDeptId': '1762764728823611529',
'btSupportChatWindowId': '29975975407634819',
'btInviteId': '3544351281928803554',
'btTagLoaded' : false,
'btChatAvailable' : false,
'btLiveChatUrl' : "livechat.boldchat.com/aid/506535311544236990/bc.chat",
'btVisitorId': '',
'btVisitorName': '',
'btVisitorInfo': '',
'btVisitorEmail': '',
'btVisitorPhone': ''
};
// method to load boldchat js on to page and after loading running our logic
btConfig.btLoadScripts = function () {
if (!btConfig.btTagLoaded) { 
// need to figure out if this is sales or support chat.
// rdid= department id
// cwdid = chat window id
var btUrl = btConfig.btProtocol + '://' + btConfig.btServer + '?wdid=' + btConfig.btWebsiteId + '&rdid=' + btConfig.btSupportChatDeptId;
var btJSElement = document.createElement('script');
btJSElement.setAttribute('type', 'text/javascript');
btJSElement.setAttribute('charset', 'iso-8859-1');
btJSElement.setAttribute('src', btUrl);
btJSElement.onload = btJSElement.onreadystatechange = function(){
// bt_chatAvailable is in scope from boldchat js is loaded.
btConfig.setupChat(bt_chatAvailable);
}
document.getElementsByTagName('head').item(0).appendChild(btJSElement);
}
};
btConfig.onLoadAll = function() {
//The folowing functions will be load after the page will finish loading
btConfig.btLoadScripts();
};
if (window.attachEvent) { 
window.attachEvent('onload',btConfig.onLoadAll); 
} else {
window.addEventListener('load',btConfig.onLoadAll,false);
}
// method to get the fully formed url for livechat.
btConfig.getLiveChatUrl = function(){
var liveChatUrl = this.btProtocol + "://" + this.btLiveChatUrl;
// add homestead ids
liveChatUrl += "?cwdid=" + this.btSupportChatWindowId + "&wdid=" + this.btWebsiteId + "&rdid=" + this.btSupportChatDeptId;
// add user information.
liveChatUrl = this.addUserInfoToUrl(liveChatUrl);
return liveChatUrl;
};
btConfig.addUserInfoToUrl = function(url){
/*
boldchat provides the following five params to send info to them
when chat loads.
*/
url += "&vr=" + this.btVisitorId;
url += "&vn=" + this.btVisitorName;
//url += "&vi=" + this.btVisitorInfo;
// also add client browser, os info.
url += "&vi=" + this.btVisitorInfo + " Client='" + window.navigator.userAgent + "'";
//url += "&vi=" + this.btVisitorInfo + " Browser='" + $.browser + "'," + "OS='" + $.client.os +"'";
url += "&ve=" + this.btVisitorEmail;
url += "&vp=" + this.btVisitorPhone;
return url;
};
btConfig.isChatAvailable = function(){
return this.btChatAvailable;
};
// method to set values to boldchat variables
// we will ignore any variables we don't know about.
btConfig.addVars = function(name, value) {
value = trimSpaces(value.toString());
switch(name){
case btUserInfo.btVisitorId:
{
this.btVisitorId = value;
break;
}
case btUserInfo.btVisitorName: 
{
this.btVisitorName = value;
break;	
}
case btUserInfo.btVisitorInfo:
{
this.btVisitorInfo = value;
break;
}
case btUserInfo.btVisitorEmail:
{
this.btVisitorEmail = value;
break;
}
case btUserInfo.btVisitorPhone:
{
this.btVisitorPhone = value;
break;
}	
}
};
// Keeping LP method for now. 
// TODO: Clean out this method.
function lpAddVars(scope,name,value) {
return;
}
btConfig.setupChat = function(chatAvailable){
try {
// set the dynamic button object
var chat = "Unavailable";
var phone = "Unavailable";
$("#spinnerId").hide();
$("#contactUsChat").show();
if(chatAvailable){
chat = "Available";
if(showContact && !retainPhone){// if waiting time is within threshold, show contactUs
$("#contactUsPhone").show();
phone = "Available";
} else if(!retainPhone) {
$("#contactUsPhone").hide();
}
var icon = "images/icon/chat_green_10x10.png";
var tooltip = "Chat with one of our Web Advisors<br />now";
$("#lis_header_chat_link").show();
$("#helpMenuChatLink").unbind('click', disableChatLink);
$("#helpMenuChatLink").removeClass('disabledChat');
$("#helpMenuChatId").removeClass('disabledChat');
$("#chatStatus").attr("src", icon);
$(".lis_header_help_chat_tooltip").html(tooltip);
$(".lis_header_help").animate({ width: '160px' }, 400);
$("#lis_header_help_chat_id").fadeIn(400);
$('div#contactUsChat p.unavailable').removeClass("unavailable").addClass("available").text("Available now");
$("#lis_header_chat_divider").fadeIn(400);
} else {
if(!retainPhone){
$("#contactUsPhone").show();
phone = "Available";
}	
$("#lis_header_chat_link").hide();
$("#helpMenuChatLink").bind('click', disableChatLink);
$("#helpMenuChatLink").addClass('disabledChat');
$("#helpMenuChatId").addClass('disabledChat');
$(".lis_header_help").animate({ width: '112px' }, 400);
$("#lis_header_help_chat_id").fadeOut(400);
$('div#contactUsChat p.available').removeClass("available").addClass("unavailable").text("Currently unavailable");
$("#lis_header_chat_divider").fadeOut(400);
retainPhone = true;
}
HSTrackNoComment('ContactUsChat-' + chat +' ContactUsPhone-' + phone);	
}
catch(e){}
return true;
};
function trimSpaces(stringToTrim){
return stringToTrim.replace(/^\s+|\s+$/g,'');
}
// Disable chat link
function disableChatLink(e) {
// cancels the event
e.preventDefault();
return false;
}
function newChatWindow() {
var href = btConfig.getLiveChatUrl();
window.open((window.pageViewer && pageViewer.link || function(link){return link;})(href + (href.indexOf('?')>=0 ? '&' : '?') + 'url=' + escape(document.location.href)), '', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=480');
}
function btAddVars(name, value){
btConfig.addVars(name, value);
}
// Set up on-mouse-over tooltip for "Chat" link in help bar 
$(document).ready(function() {
//Omniture tracking for chat Unavailable, phone unavailable, and phone available case
try{
if(!chatAvailable && !phoneAvailable ){	
HSTrackNoComment('ContactUsChat-' + unavailable +' ContactUsPhone-' + unavailable);	
}else if(!chatAvailable && phoneAvailable ){
HSTrackNoComment('ContactUsChat-' + unavailable +' ContactUsPhone-' + available);
}
}catch(e){}
$("#lis_header_help_chat_id").hover(
function () {
$(".lis_header_help_chat_tooltip").show();
},
function () {
$(".lis_header_help_chat_tooltip").hide();
}
);
});
