var lpMTagConfig = {
'lpServer' : 'sales.liveperson.net',
'lpNumber' : '37343836',
'lpProtocol' : (document.location.toString().indexOf('https:')==0) ? 'https' : 'http',
'lpTagLoaded' : false,
'lpTagSrv' : 'sr2.liveperson.net',
'pageStartTime' : (new Date()).getTime(), //pageStartTime is set with a timestamp as soon as the page starts loading
'defaultUnit' : 'payroll-service'	
};
lpMTagConfig.deploymentConfigPath = lpMTagConfig.lpTagSrv+'/visitor/addons/deploy.asp';
lpMTagConfig.lpLoadScripts = function(){
lpAddMonitorTag(lpMTagConfig.lpProtocol + '://' + lpMTagConfig.deploymentConfigPath + '?site=' + lpMTagConfig.lpNumber + '&d_id=' + lpMTagConfig.deploymentID);
}
function lpAddMonitorTag(src) { 
if (!lpMTagConfig.lpTagLoaded) {if (typeof(src) == 'undefined' || typeof(src) == 'object') {if (lpMTagConfig.lpMTagSrc) {src = lpMTagConfig.lpMTagSrc;}else {if (lpMTagConfig.lpTagSrv) {src = lpMTagConfig.lpProtocol + '://' +lpMTagConfig.lpTagSrv + '/hcp/html/mTag.js';}else {src = '/hcp/html/mTag.js';};};};if (src.indexOf('http') != 0) {src = lpMTagConfig.lpProtocol + '://' + lpMTagConfig.lpServer + src + '?site=' + lpMTagConfig.lpNumber;} else {if (src.indexOf('site=') < 0) {if (src.indexOf('?') < 0) {src = src + '?';} else{src = src + '&';} src = src + 'site=' + lpMTagConfig.lpNumber; };};var s = document.createElement('script');s.setAttribute('type', 'text/javascript');s.setAttribute('charset', 'iso-8859-1');s.setAttribute('src', src);document.getElementsByTagName('head').item(0).appendChild(s);}
}
lpMTagConfig.calculateSentPageTime = function () {
var t = (new Date()).getTime() - lpMTagConfig.pageStartTime;
lpAddVars('page','pageLoadTime', Math.round(t/1000)+' sec');
};
//Variables Arrays - By Scope
if (typeof(lpMTagConfig.pageVar)=='undefined') { lpMTagConfig.pageVar = new Array(); }
if (typeof(lpMTagConfig.sessionVar)=='undefined') { lpMTagConfig.sessionVar = new Array(); }
if (typeof(lpMTagConfig.visitorVar)=='undefined') { lpMTagConfig.visitorVar = new Array(); }
//Extra actions to be taken once the code executes
if (typeof(lpMTagConfig.onLoadCode)=='undefined') { lpMTagConfig.onLoadCode = new Array(); }
//Dynamic Buttons Array
if(typeof(lpMTagConfig.dynButton)=='undefined') { lpMTagConfig.dynButton = new Array(); }
// This need to be add to afterStartPage will work
if(typeof(lpMTagConfig.ifVisitorCode)=='undefined') {lpMTagConfig.ifVisitorCode = new Array(); }
// Function that sends variables to LP - By Scope
function lpAddVars(scope,name,value) {
if (name.indexOf('OrderTotal')!=-1 || name.indexOf('OrderNumber')!=-1){
if (value=='') return; // pass 0 value to all but OrderTotal
else lpMTagConfig.sendCookies = false
}	
value=lpTrimSpaces(value.toString());
//Remove cut long variables names and values. Trims suffix of the variable name above the 25th character onwards
if (name.length>50) { 
name=name.substr(0,50);
}
if (value.length>50) { // Trims suffix of the variable value above the 50th character onwards
value=value.substr(0,50);
}
if (FindAndUpdateVariables(scope,name,value)==false)
{
switch (scope){
case 'page': lpMTagConfig.pageVar[lpMTagConfig.pageVar.length] = escape(name)+'='+escape(value); break;
case 'session': lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = escape(name)+'='+escape(value); break;
case 'visitor': lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length] = escape(name)+'='+escape(value); break;
}
}
}
//Find live person variables and overwrite with latest value
function FindAndUpdateVariables(scope,name,value) {
var lpVariables;
switch(scope) {
case 'page': 
{
lpVariables = lpMTagConfig.pageVar;
break;
}
case 'session': 
{
lpVariables = lpMTagConfig.sessionVar;
break;
}
case 'visitor': 
{
lpVariables = pMTagConfig.visitorVar;
break;
}
}
for (i=0;i<lpVariables.length;i++)
{
if (lpVariables[i].indexOf(escape(name)+'=')>-1)
{
lpVariables[i] = escape(name)+'='+escape(value);
return true;
}
}
return false;
}
// Preventing long cookie transfer for IE based browsers.
function onloadEMT() { 
var LPcookieLengthTest=document.cookie;
if (lpMTag.lpBrowser == 'IE' && LPcookieLengthTest.length>1000){
lpMTagConfig.sendCookies=false;
}
}
//The Trim function returns a text value with the leading and trailing spaces removed
function lpTrimSpaces(stringToTrim) {
return stringToTrim.replace(/^\s+|\s+$/g,'');
}
// Immediate Data submission function
function lpSendData(varscope,varname,varvalue) {
if(typeof(lpMTag)!='undefined' && typeof(lpMTag.lpSendData)!='undefined')
lpMTag.lpSendData(varscope.toUpperCase() +'VAR!'+ varname + '=' + varvalue, true);
}
// Disable chat link
function disableChatLink(e) {
// cancels the event
e.preventDefault();
return false;
}
// The unit variable purpose is to route the chat or call to the designated skill. <LOB> should be replaced with the skill name, i.e. : sales
try{
if (typeof(lpUnit)=='undefined') { var lpUnit=lpMTagConfig.defaultUnit; }
lpMTagConfig.deploymentID=lpUnit;
if(typeof(lpAddVars)!='undefined') { 
lpAddVars('page','unit',lpUnit); 
lpAddVars('session','language',lpLanguage); 
}
lpMTagConfig.defaultInvite='chat'+'-'+lpUnit;
}catch(e){}
lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = onloadEMT;
//Scan dynButton and removes buttons which doesnt have Div on the page
lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = function () {
if(typeof(lpMTagConfig.dynButton)!='undefined') {
for (i=0;i<lpMTagConfig.dynButton.length;i++){
if (typeof(lpMTagConfig.dynButton[i].pid)!='undefined' && document.getElementById(lpMTagConfig.dynButton[i].pid) == null) {
lpMTagConfig.dynButton.splice(i,1);
i--;
}
}
}
};
//The folowing functions will be load after the page will finish loading
lpMTagConfig.onLoadAll = function () {
lpMTagConfig.calculateSentPageTime();
lpMTagConfig.lpLoadScripts();
};
if (window.attachEvent) { 
window.attachEvent('onload',lpMTagConfig.onLoadAll); 
} else {
window.addEventListener('load',lpMTagConfig.onLoadAll,false);
}
// LP Button Code
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-'+lpLanguage,'pid':'lpButton','afterStartPage': true, "ovr":"lpMTagConfig.db1"};
if(typeof(lpMTagConfig.db1)=="undefined"){
lpMTagConfig.db1 = new Object();
}
var dynButton;
lpMTagConfig.db1.dbStateChange = function (btname, state)
{
try{
// Set the dynamic button object
dynButton = eval(btname);
if (state=='online' || state=='busy'){
var icon = "/~site/images/project/home/project_chat_green_10x10.png";
var tooltip = "Chat with one of our Web Advisors<br />now.";
if (state == 'busy') {
icon = "/~site/images/project/home/project_chat_orange_10x10.png";
tooltip = "Chat with one of our Web Advisors<br />as soon as one's available.";
}
$("#lis_header_chat_link").show();
$("#helpMenuChatLink").unbind('click', disableChatLink);
$("#helpMenuChatLink").removeClass('disabledChat');
$("#helpMenuChatId").removeClass('disabledChat');
$("#chatStatus").attr("src", icon);
$(".lis_header_help_chat_tooltip").html(tooltip);
$(".lis_header_help").animate({ width: '160px' }, 400);
$("#lis_header_help_chat_id").fadeIn(400);
$("#lis_header_chat_divider").fadeIn(400);
} else {
$("#lis_header_chat_link").hide();
$("#helpMenuChatLink").bind('click', disableChatLink);
$("#helpMenuChatLink").addClass('disabledChat');
$("#helpMenuChatId").addClass('disabledChat');
$(".lis_header_help").animate({ width: '112px' }, 400);
$("#lis_header_help_chat_id").fadeOut(400);
$("#lis_header_chat_divider").fadeOut(400);
}
}
catch(e){}
return true;
}
$(document).ready(function() {
$("#lis_header_help_chat_id").hover(
function () {
$(".lis_header_help_chat_tooltip").show();
},
function () {
$(".lis_header_help_chat_tooltip").hide();
}
);
});
function newChatWindow() {
dynButton.openChatWin(dynButton.AVAILIABLE);
}
