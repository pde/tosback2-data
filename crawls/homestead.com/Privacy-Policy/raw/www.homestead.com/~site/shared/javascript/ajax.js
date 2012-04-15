/************************************************************************************************
ajax.js
Methods for communicating with the server via a dll using XML messages.
Requires ~site/shared/javascript/error.js.
************************************************************************************************/
// Constant that controls whether synchronous or asynchronous communication is used.
// Asynch communication, while technically preferable (browser won't lock if there is a communication
// error), doesn't play nice with Mozilla when the calling context is getting destroyed (e.g. when the 
// user closes the browser window).
// This variable is not an exception in the obfuscator, so if this is used inside the OE, this must be 
// added to the user-exceptions.txt
var USE_ASYNCH_REQUESTS = true;
// constants used for sending multipart MIME forms
var CRLF = "\r\n";
var BASIC_FORM_TYPE = "application/x-www-form-urlencoded";
var MULTIPART_BOUNDARY = "---------------------------7d030f358a0e84";
var MULTIPART_SEPARATOR = "--" + MULTIPART_BOUNDARY;
var MULTIPART_TERMINATOR = MULTIPART_SEPARATOR + "--";
var MULTIPART_FORM_TYPE = "multipart/form-data; boundary=" + MULTIPART_BOUNDARY;
var MULTIPART_CONTENT_HEADER = "Content-Disposition: form-data; name=";
// Sends a XMLHttpRequest POST
//
// @param strDllPathAndQuery Arguments to pass to dll, with the path to the dll prepended
// @param request Data to POST to the server.
// @param fnResponseCallback(XMLHttpRequest, fnResultCallback) Called when response is available.
// @param fnResultCallback(XMLHttpRequest) Passed to fnResponseCallback. (Usually called if the result was a 200 Success.)
//
function sendPostRequest(strDllPathAndQuery, request, fnResponseCallback, fnResultCallback, bMultiFormType)
{
// If bMultiFormType variable is not passed in, we default it to true.
if (bMultiFormType === undefined)
{
bMultiFormType = true;
}
var xmlhttp = createRequest();
xmlhttp.open("POST", strDllPathAndQuery, USE_ASYNCH_REQUESTS);
xmlhttp.setRequestHeader("Content-Type", (bMultiFormType) ? MULTIPART_FORM_TYPE : BASIC_FORM_TYPE);
xmlhttp.setRequestHeader("Content-Length", request.length);
if (USE_ASYNCH_REQUESTS)
{
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4)
{
fnResponseCallback(xmlhttp, fnResultCallback);
}
};
}
// send request to server. fnCallback will be called upon response.
xmlhttp.send(request);
if (!USE_ASYNCH_REQUESTS)
{
// synchronous request: the response is already available, so call the callback immediately
fnResponseCallback(xmlhttp, fnResultCallback);
}
}
// Sends a simple XMLHttpRequest
//
// @param strDllPathAndQuery Arguments to pass to a dll, with the path to the dll prepended
// @param fnCallback(XMLHttpRequest) Called when response is available.
//
function sendGetRequest(strDllPathAndQuery, fnCallback)
{
var xmlhttp = createRequest();
xmlhttp.open("GET", strDllPathAndQuery, USE_ASYNCH_REQUESTS);
if (USE_ASYNCH_REQUESTS)
{
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4)
{
fnCallback(xmlhttp);
}
};
}
// send request to server. fnCallback will be called upon response.
xmlhttp.send("");
if (!USE_ASYNCH_REQUESTS)
{
// synchronous request: the response is already available, so call the callback immediately
fnCallback(xmlhttp);
}
}
// Creates an XMLHttpRequest object. This can be used to hit any entry point.
function createRequest()
{
var xmlhttp=null;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
// JScript gives us Conditional compilation, we can cope with old IE versions.
// and security blocked creation of the objects.
try {
xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
try {
xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
} catch (E) {
xmlhttp = false;
}
}
@end @*/
if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
xmlhttp = new XMLHttpRequest();
}
site_assert(xmlhttp, "createRequest: unable to create XMLHttpRequest object for this browser.");
return xmlhttp;
}
