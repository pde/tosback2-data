
var rhapPlayer;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
For information on how to use this file, please see our
SDK under "Developers Guide" at http://webservices.rhapsody.com/
* * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var RhapsodySimple = {
Version: '0.4',
environment: 'http://comcast.rhapsody.com',
DEBUG_LEVEL: 3, /* 1: alerts and throws error, 2: throws only, 3: alerts only */
instances: 0,
load: function(){
if(typeof rhapsodySimple != 'undefined') SimpleRhapsodyUtility.alertRhapsodyErrors("Rhapsody Simple may be included more than once on the page.");
rhapsodySimple = new Object();
/* Not currently requireing prototype.js
if((typeof Prototype=='undefined') ||
parseFloat( (Prototype.Version.split(".")[0] + "." + Prototype.Version.split(".")[1]) ) < 1.4)
alert("Rhapsody Simple requires v1.4.0 or higher of the Prototype JavaScript framework"); */
}
}
var RhapsodyUser = {
hasRhapX: function(){
return this.detectObject('RhapsodyPlayerEngine.RhapsodyPlayerEngineCtrl','Rhapsody ActiveX', 'rhp', 'application/rhapsody-plugin', 'RealNetworks Rhapsody');
},
SIMPLE__openPlayerPosition: screen.width - 290,
detectObject: function(ClassID, desc, ext, mime, name ){
if (this.UserAgent.isIE()){
if (this.IEDetectObject(ClassID, name)) return true;
else return false;
}
if(navigator.plugins){
if(this.NavDetectObject(desc, ext, mime, name)) return true;
else return false;
}
return false;
},
IEDetectObject: function(ClassID, name){
var result = true;
// Internet explorer on windows
if (this.UserAgent.isIE() && this.UserAgent.isWin()){
document.write('<SCRIPT LANGUAGE=VBScript\> \n');
document.write('on error resume next \n');
document.write('result = IsObject(CreateObject("' + ClassID + '")) \n');
document.writeln(' If (err) then');
document.writeln(' result = False');
document.writeln(' End If');
document.write('</SCRIPT\> \n');
}
return result;
},
NavDetectObject: function(desc, ext, mime, name){
var numPlugins = 0;
if(navigator.plugins) navigator.plugins.refresh();
numPlugins = navigator.plugins.length;
if (numPlugins == 0) return false;
for (var i=0; i < numPlugins; i++){
currentPlugin = navigator.plugins[i];
if (currentPlugin.name == name || currentPlugin.description == desc) return true;
// The number of mime-types associated with this plugin
numTypes = currentPlugin.length
// Write the mime-types
for (j = 0; j < numTypes; j++){
if (currentPlugin[j].type == mime || currentPlugin[j].suffixes == ext ) return true;
}
}
return false;
},
UserAgent: {
isIE: function(){
return (navigator.userAgent.toLowerCase().indexOf("msie") != -1);
},
isNav: function(){
var agt = navigator.userAgent.toLowerCase();
alert(agt);
return ((agt.indexOf('mozilla')!=-1) && ((agt.indexOf('spoofer')==-1) && (agt.indexOf('compatible') == -1)) && (agt.indexOf('opera')==-1));
},
isWin: function(){
var agt = navigator.userAgent.toLowerCase();
return ((agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1));
},
isMac: function(){
var agt = navigator.userAgent.toLowerCase();
return (agt.indexOf("macintosh") != -1);
},
major: function(){
return navigator.appVersion;
}
}
}
/* * * * RhapsodyPlayer * * * * * * * * * * * * * * *
A Static Object for launching the
RhapWeb Player Remotely
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var RhapsodyPlayer = {
PCODE: null,
OCODE: null,
CPATH: null,
CJ_PID: null,
PLAYERNAME: null,
test: function(msg){
alert(msg);
},
queueTrack: function(prId){
SIMPLE__throwContent( "queue", prId, "track" );
},
queueAlbum: function(prId){
SIMPLE__throwContent( "queue", prId, "album" );
},
queuePlaylist: function(prId){
SIMPLE__throwContent( "queue", prId, "playlist" );
},
playTrack: function(prId){
this.playRhapsody( { id:prId, type:'track' } );
},
playAlbum: function(prId){
this.playRhapsody( { id:prId, type:'album' } );
},
/** playRadio() IS DEPRECATED. PLEASE USE playChannel() INSTEAD. **/
playRadio: function(prId){
this.playRhapsody( { id:prId, type:'radio' } );
},
/** playArtistRadio() IS DEPRECATED. PLEASE USE playArtistChannel() INSTEAD. **/
playArtistRadio: function(prId){
this.playRhapsody( { id:prId, type:'artistradio' } );
},
playChannel: function(prId){
this.playRhapsody( { id:prId, type:'radio' } );
},
playArtistChannel: function(prId){
this.playRhapsody( { id:prId, type:'artistradio' } );
},
playPlaylist:function(prId){
this.playRhapsody( { id:prId, type:'playlist' } );
},
queueRcid: function(prId){
if( SimpleRhapsodyUtility.isArray(prId) ){
prId = this._createTrackListString( prId );
}
SIMPLE__throwContent( "queue", prId, "" );
},
playRcid: function(prId){
var prObj = new Object();
if( SimpleRhapsodyUtility.isArray( prId ) ) prObj = { id: prId, type: 'track' };
else prObj = this.createPlayRhapsodyObjectFromRcid( prId );
this.playRhapsody(prObj);
},
setTrackingCodes: function(pcode,ocode,cpath){
this.PCODE = pcode;
this.OCODE = ocode;
this.CPATH = cpath;
},
setCommissionJunctionPID: function( cj_pid ){
this.CJ_PID = cj_pid;
this.PCODE = "cj";
this.OCODE = "affiliate";
this.CPATH = "aff";
},
setPlayerName: function( name ) {
this.PLAYERNAME = name;
},
playRhapsody: function(prObj){
var playRhapsodyValid = this.isValidPlayRhapsody(prObj);
if(playRhapsodyValid && playRhapsodyValid != "valid"){
SimpleRhapsodyUtility.alertRhapsodyErrors(playRhapsodyValid);
} else {
if( SimpleRhapsodyUtility.isArray(prObj.id) ){
prObj.id = this._createTrackListString( prObj.id );
} else if( typeof prObj.id == 'string' ){
prObj.id = this._stripMoniker( prObj.id );
}
SIMPLE__openPlayer(prObj.id, prObj.type);
}
},
isValidPlayRhapsody: function(prObj){
var isValid = false;
var ERRORS = new Array(
"No Object passed to playRhapsody function",
"The playRhapsody function requires an id and a type property\n(simplified functions often require only an id)",
"The playRhapsody id property should be a Number, an RCID string, or an Array of numbers (when type='track').",
"The playRhapsody type property should be a String",
"The playRhapsody type property should have one of the following values:",
"The playRhapsody rcid string property should start with one of the following monikers:"
)
var playRhapsodyErrors = new Array();
var validRhapsodyType;
var validRcidMoniker;
if( prObj ){
if( !prObj.id || !prObj.type ){
playRhapsodyErrors.push(ERRORS[1]);
} else if( ( typeof prObj.id != "number" ) && ( typeof prObj.id != "string" ) && ( !SimpleRhapsodyUtility.isArray(prObj.id ) && ( prObj.type == 'track' ) ) ){
playRhapsodyErrors.push(ERRORS[2]);
} else if( ( typeof prObj.id == "string" ) && ( ( validRcidMoniker = this.isValidRcidMoniker( prObj.id ) ) != "valid" ) ){
playRhapsodyErrors.push(ERRORS[5] + validRcidMoniker);
} else if( typeof prObj.type != "string" ){
playRhapsodyErrors.push(ERRORS[3]);
} else if( ( validPlayRhapsodyType = this.isValidPlayRhapsodyType( prObj.type ) ) != "valid" ){
playRhapsodyErrors.push(ERRORS[4] + validPlayRhapsodyType);
} else return "valid";
} else playRhapsodyErrors.push(ERRORS[0]);
return playRhapsodyErrors;
},
createPlayRhapsodyObjectFromRcid: function( prId ){
var prObj = new Object();
if( this._getMonikerPrefix( prId ) == 'alb') prObj.type = 'album';
else if( this._getMonikerPrefix( prId ) == 'art') prObj.type = 'artistradio';
else if( this._getMonikerPrefix( prId ) == 'sta') prObj.type = 'radio';
else if( this._getMonikerPrefix( prId ) == 'ply') prObj.type = 'playlist';
else if( this._getMonikerPrefix( prId ) == 'mp') prObj.type = 'mp';
else prObj.type = 'track';
prObj.id = prId;
return prObj;
},
isValidPlayRhapsodyType: function( type ){
var validTypes = [ 'track', 'album', 'radio', 'playlist', 'artistradio', 'mp' ];
var validTypeString = "";
for( var i=0; i<validTypes.length; i++ ){
if( type == validTypes[ i ] ) return "valid";
else validTypeString += "\n" + validTypes[ i ];
}
return validTypeString;
},
_stripMoniker: function( idString ){
return idString; // return idString.split( ".")[1];
},
_stripMonikers: function( idArray ){
var strippedIdArray = new Array();
for( var i=0; i<idArray.length; i++ ){
strippedIdArray.push( this._stripMoniker( idArray[i] ) );
}
return strippedIdArray;
},
_rcidMonikers: [ 'tra.', 'alb.', 'sta.', 'ply.', 'art.', 'mp.' ],
isValidRcidMoniker: function( rcidMoniker ){
// this cound be just a plain id so check and return valid if it is
if ((""+rcidMoniker).search(/^[0-9]/) > -1) return "valid";
var validRcidMonikers = this._rcidMonikers;
var validRcidMonikerString = "";
for( var i=0; i<validRcidMonikers.length; i++ ){
if( rcidMoniker.toLowerCase().indexOf( validRcidMonikers[ i ] ) > -1 ) return "valid";
else validRcidMonikerString += "\n" + validRcidMonikers[ i ];
}
return validRcidMonikerString;
},
_getMonikerPrefix: function( rcid ){
if( this.isValidRcidMoniker( rcid ) == 'valid' ) return ( "" + rcid ).split( "." )[0].toLowerCase();
},
_getTypeStringByMoniker: function( rcid ){
var moniker = this._getMonikerPrefix( rcid );
switch( moniker ) {
case 'tra': return "track";
case 'alb': return "album";
case 'ply': return "playlist";
case 'sta': return "radio";
case 'art': return "artistradio";
case 'mp': return "user playlist";
default: return "";
}
},
_createTrackListString: function( prIdArray ){
var trackListString = "";
var skippedCounter = 0;
for( var i=0; i<prIdArray.length; i++ ){
if( typeof prIdArray[i] == "number" ){
trackListString += prIdArray[i] + "+";
} else if( ( typeof prIdArray[i] == "string" ) && ( this.isValidRcidMoniker( prIdArray[i] ) == 'valid' ) ){
trackListString += this._stripMoniker( prIdArray[i] ) + "+";
}else skippedCounter++;
}
if( skippedCounter > 0 ) SimpleRhapsodyUtility.alertRhapsodyErrors( skippedCounter + " non-number or invalid moniker string array items were dropped from the Tracklist array." );
return trackListString;
}
}
/* * * * SimpleRhapsodyUtility * * * * * * * * * * * * * * * * *
A Static Object for encapsulating
commonly used Utilities
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var SimpleRhapsodyUtility = {
alertRhapsodyErrors: function(errors){
var errorString = "";
if( SimpleRhapsodyUtility.isArray( errors ) ){
for( var i=0; i<errors.length; i++ ){
errorString += errors[ i ] + "\n";
}
}
else if( typeof errors == 'string' ) errorString = errors;
if(RhapsodySimple.DEBUG_LEVEL == 1 || RhapsodySimple.DEBUG_LEVEL == 3) alert(errorString);
if(RhapsodySimple.DEBUG_LEVEL < 3) throw(errorString);
return false;
},
addLoadEvent: function(func){
var oldonload = window.onload;
if (typeof window.onload != 'function') {
window.onload = func;
} else {
window.onload = function() {
oldonload();
func();
}
}
},
isArray: function(arr){
if( ( typeof arr == 'object' ) && ( typeof arr.pop != 'undefined' ) ) return true;
else return false;
}
}
SimpleTracking = {
reportPlayAdd: function( action, type, rcid ){
var type = ( type == '' )?RhapsodyPlayer._getTypeStringByMoniker( rcid ):type;
RhapsodyTracking.sendLinkEvent( {
eVar17: 'Audio Req : ' + action + " : " + type,
prop18: 'E: Audio Req : ' + action + " : " + type
}, {
type: 'custom',
linkName: 'Audio Play Request',
events: 'event1'
} );
}
}
var SimplePopUpBlockHandler = {
tripped: false,
stallTilPageLoad: false,
tryAgainFunction: null,
popUpBlockerDialogBox: null,
message: "A pop-up blocker has interfered with our ability to deliver the content you\'ve requested.",
messageSupplemental: "\nIf you continue to have problems, please restart your browser and try again. ",
alertUser: function( blockedFunction ){
var alertMessage = this.message;
if( !this.tripped ){
try{
if( this.stallTilPageLoad ) SimpleRhapsodyUtility.addLoadEvent( function(){ SimplePopUpBlockHandler.buildAlertDiv( blockedFunction ); } );
else this.buildAlertDiv( blockedFunction );
} catch(e) {
alertMessage += this.messageSupplemental;
alert( alertMessage );
this.tripped = true;
}
}
},
destroyDialogBox: function(){
this.popUpBlockerDialogBox.toggleMeddlesomeElements( true );
this.popUpBlockerDialogBox.destroy();
this.popUpBlockerDialogBox = null;
this.tripped = false;
this.stallTilPageLoad = false;
},
buildAlertDiv: function(blockedFunction){
var alertDiv = document.createElement( "DIV" );
this.tryAgainFunction = function(){
blockedFunction();
this.destroyDialogBox();
return false;
}
alertDiv.setAttribute("id", "popUpBlockHolder");
this.popUpBlockerDialogBox = new DialogBox();
with( this.popUpBlockerDialogBox ){
setWidth( 433 );
setMask( true );
centerInPage();
toggleMeddlesomeElements();
getHoldingElement().appendChild(alertDiv);
RhapsodyUtility.addEvent( window, 'scroll', function(e){ centerInPage(); });
}
alertDiv.innerHTML =
'<b class="xtop">' +
'<b class="xb1"><\/b>' +
'<b class="xb2"><\/b>' +
'<b class="xb3"><\/b>' +
'<b class="xb4"><\/b>' +
'<\/b>' +
'<h2 class="boxHeader">Pop-Up Blocker Detected<\/h2>' +
'<div class="popUpBlockMessage">' +
'<p>' + this.message + ' Click \'View Content\' to spawn the blocked window.<\/p>' +
'<div style="text-align: center; padding-top: 15px;">' +
'<div style="width: 10px; height: 23px; float: right; font-size: 0.1em;">&nbsp;<\/div>' +
'<div class="whiteButtonRight" style="width: 7px; height: 23px; float: right; font-size: 0.1em;" onClick="SimplePopUpBlockHandler.destroyDialogBox(); return false;">&nbsp;<\/div>' +
'<div class="whiteButton" style="float: right; line-height: 23px; width: 40px;">' +
'<a href="#" title="Cancel" onClick="SimplePopUpBlockHandler.destroyDialogBox(); return false;" class="boldWhiteLink"><b>Cancel<\/b><\/a>' +
'<\/div>' +
'<div class="whiteButtonLeft" style="width: 7px; height: 23px; float: right; font-size: 0.1em;" onClick="SimplePopUpBlockHandler.destroyDialogBox(); return false;">&nbsp;<\/div>' +
'<div style="width: 10px; height: 23px; float: right; font-size: 0.1em;">&nbsp;<\/div>' +
'<div class="whiteButtonRight" style="width: 7px; height: 23px; float: right; font-size: 0.1em;" onClick="window.location=\'' + RhapsodySimple.environment + '/-popuphelp\'">&nbsp;<\/div>' +
'<div class="whiteButton" style="float: right; line-height: 23px; width: 40px;">' +
'<a href="' + RhapsodySimple.environment + '/-popuphelp" title="Help" class="boldWhiteLink"><b>Help<\/b><\/a>' +
'<\/div>' +
'<div class="whiteButtonLeft" style="width: 7px; height: 23px; float: right; font-size: 0.1em;" onClick="window.location=\'' + RhapsodySimple.environment + '/-popuphelp\'">&nbsp;<\/div>' +
'<div style="width: 10px; height: 23px; float: right; font-size: 0.1em;">&nbsp;<\/div>' +
'<div class="whiteButtonRight" style="width: 7px; height: 23px; float: right; font-size: 0.1em;" onClick="SimplePopUpBlockHandler.tryAgainFunction(); return false;">&nbsp;<\/div>' +
'<div class="whiteButton" style="float: right; line-height: 23px; width: 80px;">' +
'<a href="#" title="View Content" onClick="SimplePopUpBlockHandler.tryAgainFunction(); return false;" class="boldWhiteLink"><b>View Content<\/b><\/a>' +
'<\/div>' +
'<div class="whiteButtonLeft" style="width: 7px; height: 23px; float: right; font-size: 0.1em;" onClick="SimplePopUpBlockHandler.tryAgainFunction(); return false;">&nbsp;<\/div>' +
'<\/div>' +
'<\/div>';
this.tripped = true;
}
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Free floating Utilties DEPRECATED
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function playTrack(prId){
RhapsodyPlayer.playRhapsody( { id:prId, type:'track' } );
}
function playAlbum(prId){
RhapsodyPlayer.playRhapsody( { id:prId, type:'album' } );
}
function playRadio(prId){
RhapsodyPlayer.playRhapsody( { id:prId, type:'radio' } );
}
function playPlaylist(prId){
RhapsodyPlayer.playRhapsody( { id:prId, type:'playlist' } );
}
function playRhapsody(prObj){
RhapsodyPlayer.playRhapsody(prObj);
}
var HEARTBEATFREQUENCY = 500;
var SIMPLEJS_MAX_TRACKS = 15;
var SIMPLE_iframeFullAllRcids = "";
var SIMPLE_iframeRcidsForLater = "";
function SIMPLE__triggerRcidsForLaterMsie( type ) {
if( SIMPLE_iframeRcidsForLater && SIMPLE_iframeRcidsForLater.length > 0 ) {
setTimeout( "SIMPLE__writeSimpleJsIframe( 'queue', '" + SIMPLE_iframeRcidsForLater + "', '" + type + "' );", 1500 );
}
else {
SIMPLE_clearMsieIframe();
}
}
function SIMPLE__writeSimpleJsIframe( action, rcid, type ) {
var theIframe = document.getElementById("launchRhapsodyPlayerIFrame");
if( !theIframe ) { setTimeout( "SIMPLE__writeSimpleJsIframe('" + action + "','" + rcid + "','" + type + "')", 50 ); return; }
SIMPLE_iframeFullAllRcids = rcid;
var theRcidArray = SimpleRhapsodyUtility.isArray(rcid) ? rcid : (""+rcid).split("+");
if( theRcidArray.length > SIMPLEJS_MAX_TRACKS ) {
var newRcidArray = theRcidArray.slice(0,SIMPLEJS_MAX_TRACKS);
rcid = newRcidArray.join("+");
SIMPLE_iframeRcidsForLater = theRcidArray.slice(SIMPLEJS_MAX_TRACKS).join("+");
}
else {
SIMPLE_iframeRcidsForLater = "";
}
if( (type=="radio" || type=="channel") && RhapsodyPlayer._getMonikerPrefix(rcid)=="" ) { rcid = "sta." + rcid; }
if( (type=="artistradio" || type=="artradio") && RhapsodyPlayer._getMonikerPrefix(rcid)=="" ) { rcid = "art." + rcid; }
var theHtml =
"<html>\n" +
"<head>\n" +
" <scr"+"ipt>\n" +
" function doLaunch() {\n" +
" var THECONTROL;\n" +
" try {\n" +
" THECONTROL = new ActiveXObject(\"RhapsodyPlayerEngine.RhapsodyPlayerEngineCtrl.1\");\n" +
" if( THECONTROL ) {\n" +
" var rawHeartbeat = THECONTROL.getUserData(\"RhapPlayerHeartbeat\");\n" +
" if( rawHeartbeat ) {\n" +
" var rightNow = new Date().valueOf();\n" +
" var heartbeatTime = rawHeartbeat - 0.0;\n" +
" \n" +
" if( rightNow-heartbeatTime < " + (HEARTBEATFREQUENCY*2) + " ) {\n" +
" var theEvent = (new Date()).valueOf() + '|||" + action +"|||" + rcid + "';\n" +
" THECONTROL.setUserData( \"SimpleJsEvent\", theEvent, false );\n" +
" parent.SIMPLE__triggerRcidsForLaterMsie('" + type + "');\n" +
// " alert('sent event to player... ' + theEvent);\n" +
" return;\n" +
" }\n" +
" }\n" +
" }\n" +
" } catch(e) { }\n" +
// " alert(\"Throwing window...\");\n" +
" parent.SIMPLE__actuallyOpenPlayerWindowMsie( \""+type+"\", \"\", false, \"\", \"\", \"\", \"\");\n" +
" };\n" +
"\n" +
" </scr"+"ipt>\n" +
"</head>\n" +
"<body onLoad=\"doLaunch();\">\n" +
"</body>\n" +
"\n" +
"</html>";
var theDoc = theIframe.contentDocument;
if( !theDoc ) { theDoc = theIframe.contentWindow.document; }
theDoc.open();
theDoc.write(theHtml);
theDoc.close();
}
function SIMPLE_clearMsieIframe() {
var theIframe = document.getElementById("launchRhapsodyPlayerIFrame");
if( !theIframe ) { setTimeout("SIMPLE__actuallyOpenPlayerWindowMsie()",50); return; }
var theDoc = theIframe.contentDocument;
if( !theDoc ) { theDoc = theIframe.contentWindow.document; }
theDoc.open();
theDoc.write( "<html><head></head><body onLoad=\"\"></body></html>" );
theDoc.close();
var theIframeDiv = document.getElementById("launchRhapsodyPlayerIFrameDiv");
if( theIframeDiv ) { theIframeDiv.innerHTML = ""; }
}
function SIMPLE__actuallyOpenPlayerWindowMsie( type, title, remote, page, pageRegion, guid, origin ) {
SIMPLE_clearMsieIframe();
SIMPLE_iframeRcidsForLater = "";
SIMPLE__openPlayerWindow( SIMPLE_iframeFullAllRcids, type, title, remote, page, pageRegion, guid, origin );
}
function SIMPLE__hasRhapXPluginFirefox() {
var desc = 'Rhapsody ActiveX';
var ext = 'rhp';
var mime = 'application/rhapsody-plugin';
var name = 'RealNetworks Rhapsody';
var numPlugins = 0;
if( navigator.plugins ) navigator.plugins.refresh();
numPlugins = navigator.plugins.length;
if( numPlugins==0 ) return false;
for( var i=0 ; i<numPlugins ; i++ ) {
currentPlugin = navigator.plugins[i];
if (currentPlugin.name == name || currentPlugin.description == desc) return true;
// The number of mime-types associated with this plugin
numTypes = currentPlugin.length
// Write the mime-types
for (j = 0; j < numTypes; j++)
{
if (currentPlugin[j].type == mime || currentPlugin[j].suffixes == ext ) return true;
}
}
return false;
}
function SIMPLE__attemptPlayEventFirefox( action, rcid, type ) {
var THECONTROL = document.getElementById("RhapXControl");
/** Ok, so, in Safari even if the plugin is actually available, it takes a few hundred
millis before the methods themselves are available... So if this fails, we'll just keep
trying until it works... **/
var rawHeartbeat = 0;
try { rawHeartbeat = THECONTROL.getUserData("RhapPlayerHeartbeat"); }
catch(e) { setTimeout( "SIMPLE__attemptPlayEventFirefox('"+action+"','"+rcid+"','"+type+"')", 100 ); return; }
if( rawHeartbeat ) {
var rightNow = new Date().valueOf();
var heartbeatTime = rawHeartbeat - 0.0;
if( rightNow-heartbeatTime < (HEARTBEATFREQUENCY*2) ) {
var theRcidArray = SimpleRhapsodyUtility.isArray(rcid) ? rcid : (""+rcid).split("+");
if( theRcidArray.length > SIMPLEJS_MAX_TRACKS ) {
var newRcidArray = theRcidArray.slice(0,SIMPLEJS_MAX_TRACKS);
rcid = newRcidArray.join("+");
var rcidsForLater = theRcidArray.slice(SIMPLEJS_MAX_TRACKS).join("+");
setTimeout( "SIMPLE__attemptPlayEventFirefox('queue','"+rcidsForLater+"','"+type+"')", 1000 );
}
if( (type=="radio" || type=="channel") && RhapsodyPlayer._getMonikerPrefix(rcid)=="" ) { rcid = "sta." + rcid; }
if( (type=="artistradio" || type=="artradio") && RhapsodyPlayer._getMonikerPrefix(rcid)=="" ) { rcid = "art." + rcid; }
var theEvent = (new Date()).valueOf() + '|||' + action + '|||' + rcid;
THECONTROL.setUserData( "SimpleJsEvent", theEvent, false );
if( navigator.userAgent.toLowerCase().indexOf("safari")>=0 ) {
document.getElementById('rhapXLoaderFirefox').innerHTML = " ";
}
return;
}
}
document.getElementById('rhapXLoaderFirefox').innerHTML = " ";
SIMPLE__openPlayerWindow( rcid, type, "", false, "", "", "", "" );
}
if( !window.ActiveXObject ) {
document.write("<div id='rhapXLoaderFirefox' style='position:absolute; visibility:hidden; height:1px; width:1px;'></div>");
function onIdle() { }
function onError( errorCode ) { }
function getStateName( state ) { }
function onPlayStateChanged( oldState, newState ) { }
function onAuthenticateDone( result ) { }
function onTrackOpened( trackId ) { }
function onTrackClosed( trackId ) { }
function onBufferingProgress( percentage ) { }
function onDownloadProgress( percentage ) { }
function onPositionChanged( currentPosition ) { }
function onDurationChanged( currentDuration ) { }
function onXmlMessageDone( xml, errorCode ) { }
function onServerError( errorCode ) { }
function onLoginStateChanged(oldState, newState, status) { }
function onXmlMessageDone(xml,errorCode) { }
function onMetadataReceived( trackId ) { }
document.write("<scr"+"ipt event=\"onIdle()\" for=\"RhapXControl\">onIdle();</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onError( errorCode )\" for=\"RhapXControl\">onError( errorCode );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"getStateName( state )\" for=\"RhapXControl\">getStateName( state );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onPlayStateChanged( oldState, newState )\" for=\"RhapXControl\">onPlayStateChanged( oldState, newState );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onAuthenticateDone( result )\" for=\"RhapXControl\">onAuthenticateDone( result );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onTrackOpened( trackId )\" for=\"RhapXControl\">onTrackOpened( trackId );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onTrackClosed( trackId )\" for=\"RhapXControl\">onTrackClosed( trackId );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onBufferingProgress( percentage )\" for=\"RhapXControl\">onBufferingProgress( percentage );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onDownloadProgress( percentage )\" for=\"RhapXControl\">onDownloadProgress( percentage );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onPositionChanged( currentPosition )\" for=\"RhapXControl\">onPositionChanged( currentPosition );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onDurationChanged( currentDuration )\" for=\"RhapXControl\">onDurationChanged( currentDuration );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onXmlMessageDone( xml, errorCode )\" for=\"RhapXControl\">onXmlMessageDone( xml, errorCode );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onServerError( errorCode )\" for=\"RhapXControl\">onServerError( errorCode );</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onLoginStateChanged(oldState, newState, status)\" for=\"RhapXControl\">onLoginStateChanged(oldState, newState, status);</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onXmlMessageDone(xml,errorCode)\" for=\"RhapXControl\">onXmlMessageDone(xml,errorCode);</scr"+"ipt>");
document.write("<scr"+"ipt event=\"onMetadataReceived( trackId )\" for=\"RhapXControl\">onMetadataReceived( trackId );</scr"+"ipt>");
}
if( window.ActiveXObject ) {
document.write("<div id='launchRhapsodyPlayerIFrameDiv' style='position:absolute; z-index:0; width:1px; height:1px; visibility:hidden;'></div>\n");
}
function SIMPLE__throwContent( action, rcid, type ) {
if( window.ActiveXObject ) {
var theIframe = document.getElementById("launchRhapsodyPlayerIFrame");
if( !theIframe ) {
var theIframeDiv = document.getElementById("launchRhapsodyPlayerIFrameDiv");
theIframeDiv.innerHTML +=
"<iframe style='position:absolute; z-index:0; width:1px; height:1px; visibility:hidden;' "
+ " id='launchRhapsodyPlayerIFrame' "
+ " src=''"
+ " ></iframe>";
}
SIMPLE__writeSimpleJsIframe( action, rcid, type );
}
else {
if( SIMPLE__hasRhapXPluginFirefox() ) {
var theDiv = document.getElementById("rhapXLoaderFirefox");
if( theDiv.innerHTML.length < 5 ) {
theDiv.innerHTML =
'<object id="RhapXControl" width=0 height=0 type="application/rhapsody-plugin">' +
' <param name="consolelog" value="0xF0033"/>' +
' <param name="filelog" value="0xFFFFFFFF"/>' +
' <param name="filelogpath" value="c:\\rhapxlog.txt"/>' +
'</object>';
}
if( document.getElementById("RhapXControl") ) {
SIMPLE__attemptPlayEventFirefox( action, rcid, type );
}
else {
setTimeout( "SIMPLE__throwContent('"+action+"','"+rcid+"','"+type+"')", 100 );
}
}
else {
SIMPLE__openPlayerWindow( rcid, type, "", false, "", "", "", "" );
}
}
try{
SimpleTracking.reportPlayAdd( action, type, rcid );
} catch( e ){}
}
/* Below this comment are Functions copied from global.js */
function SIMPLE__openPlayer(id,type,title,page,pageRegion,guid,origin) {
SIMPLE__throwContent( "play", id, type );
}
function SIMPLE__openPlayerWindow(id, type, title, remote, page, pageRegion, guid, origin) {
try {
if (!rhapPlayer || rhapPlayer.closed) {
openThis(id, type, title, remote, page, pageRegion, guid, origin)
} else {
rhapPlayer.getMetaData(type,id,title,remote);
rhapPlayer.location.setParameter('page',page);
rhapPlayer.focus();
}
} catch (e) {
openThis(id, type, title, remote, page, pageRegion, guid, origin);
}
}
function openThis(id, type, title, remote, page, pageRegion, guid, origin){
var playerLocation = RhapsodySimple.environment+'/player';
var successfulOpen = false;
wname="rhapPlayer";
width=270;
height=570;
var trackingParameters = "";
if( RhapsodyPlayer.OCODE ) { trackingParameters += "&ocode="+escape(RhapsodyPlayer.OCODE); }
if( RhapsodyPlayer.PCODE ) { trackingParameters += "&pcode="+escape(RhapsodyPlayer.PCODE); }
if( RhapsodyPlayer.CPATH ) { trackingParameters += "&cpath="+escape(RhapsodyPlayer.CPATH); }
if( RhapsodyPlayer.PLAYERNAME ) { trackingParameters += "&playername="+escape(RhapsodyPlayer.PLAYERNAME); }
if (title) {
playerLocation += "?type=" + type + "&id="+id +"&title="+title +"&remote="+remote + "&page=" + page + "&pageregion=" + pageRegion + "&guid=" + guid + "&from=" + origin + trackingParameters;
} else {
playerLocation += "?type=" + type + "&id="+id +"&remote="+remote + "&page=" + page + "&pageregion=" + pageRegion + "&guid=" + guid + "&from=" + origin + trackingParameters;
}
if( RhapsodyPlayer.CJ_PID ) {
playerLocation = "http://www.qksrv.net/click-" + RhapsodyPlayer.CJ_PID + "-10436574?url=" + escape(playerLocation);
}
var openFunction=function(){
rhapPlayer = window.open( playerLocation,wname,"width="+width+",height="+height+",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,top=20,left="+RhapsodyUser.SIMPLE__openPlayerPosition+"" );
if((rhapPlayer!=null) && (typeof rhapPlayer!="undefined")){
if (!rhapPlayer.opener) rhapPlayer.opener = self;
rhapPlayer.focus();
return true;
}
}
successfulOpen=openFunction();
if(!successfulOpen){
SimplePopUpBlockHandler.alertUser( openFunction );
}
}