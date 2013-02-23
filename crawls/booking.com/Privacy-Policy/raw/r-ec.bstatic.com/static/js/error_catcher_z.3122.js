/* start of 'error_catcher_z.js' */
/* PPK's cookie scripts: http://www.quirksmode.org/js/cookies.html */
function createCookie(name,value,days) {
var expires = "";
if (days) {
var date = new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
expires = "; expires="+date.toGMTString();
}
document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
var c = ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
}
return null;
}
function eraseCookie(name) {
createCookie(name,"",-1);
}
function scriptsTrackingString() {
var page,
page_data,
str = '{', 
scripts_tracking = booking.env.scripts_tracking;
for ( page in scripts_tracking ) if( scripts_tracking.hasOwnProperty( page ) ) {
page_data = scripts_tracking[page];
str += '"' + page + '":{"loaded":' + !!page_data.loaded + ',"run":' + !!page_data.run + '},';
}
str = str.slice( 0, str.length - 1 ) + '}';
return '&scripts=' + encodeURIComponent( str ); 
}
var report_error;
function send_error_report() {
if (report_error && document.getElementById && document.getElementById('req_info')) {
report_error(document.getElementById('req_info').innerHTML);
report_error = null;
} else if (report_error) {
setTimeout(send_error_report, 100 );
}
}
window.onabort = function () {
document.ff_kill = true; 
};
function handleBeforeUnload () {
document.ff_kill = true;
}
if(window.addEventListener){
if(typeof window.onbeforeunload !== 'undefined'){
window.addEventListener('beforeunload', handleBeforeUnload, false);
}
}
window.onerror = function (msg, url, lno) {
// Cookie check
var cookie = readCookie('error_catcher');
if(typeof document.ff_kill !== 'undefined' && document.ff_kill === true && navigator.userAgent.search('Firefox') != -1 && msg === 'Error loading script') { return false; }
if (cookie == 'kill' || (typeof document.kill != "undefined" && document.kill === true)) return false;
if(typeof window.booking_error_count === 'undefined' || isNaN(window.booking_error_count) || isNaN(window.booking_error_previous)) {
window.booking_error_count = 0;
window.booking_error_previous = 0;
window.booking_error_sent = 0;
}
if(window.booking_error_sent > 5){
return;
}
window.booking_error_count++;
var ajax;
if (window.XMLHttpRequest) {
try {
ajax = new window.XMLHttpRequest(); // XMLHttpRequest (Mozilla, Opera, Safari, etc.)
} catch (e) {
ajax = false;
}
} else {
var msXML = new Array( // XMLHttpRequest (IE with ActiveX)
"Msxml2.XMLHTTP.5.0",
"Msxml2.XMLHTTP.4.0",
"Msxml2.XMLHTTP.3.0",
"Msxml2.XMLHTTP",
"Microsoft.XMLHTTP"
);
for (var i = 0; i < msXML.length; i++) { // We want to get the best we can
try {
ajax = new ActiveXObject(msXML[i]);
window.status = i;
break;
} catch (e) {
ajax = false;
}
}
}
if (ajax) {
report_error = function(info) {
var data = 'error=' + encodeURIComponent(msg) + '&pid=' + encodeURIComponent(booking.env.pageview_id);
if ( typeof msg === 'object') {
var other_msg = '';
if(msg.srcElement && msg.srcElement.src){
other_msg += 'scriptSrc=' + msg.srcElement.src;
} else {
other_msg += 'scriptSrc=inline';
}
data = 'error=' + encodeURIComponent(msg + ' :: ' + other_msg) + '&pid=' + encodeURIComponent(booking.env.pageview_id);
}
data += '&url=' + encodeURIComponent(url !== '' && typeof url !== 'undefined' ? url : location.href.split('?')[0]);
if( typeof PageLoadTimer !== 'undefined'){
var times = '&since=' + (+new Date()-PageLoadTimer.start) + '&ready=' + (PageLoadTimer.document_ready - PageLoadTimer.start ? PageLoadTimer.document_ready - PageLoadTimer.start : 0) + '&loaded=' + ( PageLoadTimer.window_load - PageLoadTimer.start ? PageLoadTimer.window_load - PageLoadTimer.start : 0) ; 
data += times;
}
if ( booking.env.enable_scripts_tracking ) {
data += scriptsTrackingString(); 
}
if(Number(lno)){
data += "&lno=" + Number(lno);
}
if (info) {
data += '&info=' + info;
}
data += '&aid=' + (booking ? booking.env.b_aid : '') + '&lang=' + ( booking ? booking.env.b_lang_for_url : '' );
data += '&errc=' + window.booking_error_count + '&errp=' + window.booking_error_previous;
data += '&stid=' + (booking ? booking.env.b_stid : '');
data += '&ref_action=' + (booking.env.b_action ? booking.env.b_action : '');
window.booking_error_previous = window.booking_error_count;
ajax.open('GET', '/js_errors?' + data, true);
ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
ajax.setRequestHeader('Content-length', 0);
ajax.setRequestHeader('Connection', 'close');
ajax.onreadystatechange = function () {
if (ajax.readyState == 4 && (ajax.status == 503 || ajax.responseText == 'shut up')) {
document.kill = true;
createCookie('error_catcher', 'kill', 30);
}
};
ajax.send();
window.booking_error_sent++;
}
send_error_report();
}
return false; // Don't suppress default browser onerror handler
};
/* end of 'error_catcher_z.js' */
