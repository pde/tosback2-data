//*******************************************************
//* Shared utilities for executing AJAX calls
//* 
//* There should be nothing related to a specific page's
//* functionality here.  Please include that javascript in
//* your own .js file.
//*******************************************************

// It is assumed that AJAX is supported in the web browser being used
var httpRequestSupported = true;

// Browser user is running
var browser = navigator.appName;

// Version of the browser user is running
var b_version=navigator.appVersion


///////////////////////////////////////////////////////////
// Returns true if AJAX requests are supported by the 
// clients web browser.  Else false.
// On a true result, the object returned is an 
// Active-X XMLHTTP object.
//
// In Internet Explorer, you create an http object using 
// new ActiveXObject("Msxml2.XMLHTTP") or 
// new ActiveXObject("Microsoft.XMLHTTP") 
// depending on the version of MSXML installed. 
//
// In Mozilla and Safari (Gecko engine) you use 
// new XMLHttpRequest()
//
// IceBrowser is not supported in this code
//
// @return boolean
///////////////////////////////////////////////////////////
function isHttpRequestSupported() {

	if (window.XMLHttpRequest) {   
		// Test if the Gecko engine is running.  Gecko supports AJAX
		httpRequest = new XMLHttpRequest(); 
		if (httpRequest.overrideMimeType) { 
			httpRequest.overrideMimeType('text/xml'); 
		} 
	} else if (window.ActiveXObject) { 
		// Test if an IE engine is running
		try { 
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP"); 
		} catch (e) { 
			try { 
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); 
			} catch (e) {} 
		} 
	} 
	
	if (!httpRequest) { 
		httpRequestSupported = false;
	} 
	

	return httpRequest;
}


///////////////////////////////////////////////////////////
// Makes a HTTP request back to the server given a URL
// using GET.
//
// callbackFunction is a string value containing the name
// of a method to call when the HTTP request is completed.
//
// The resulting output of the HTTP request is passed in
// as a variable to the callback function.  

// The callback function formats the response to be displayed 
// in a web browser.
//
// if returnData is specified, the response is retruned
// in xml
//
// @param url
// @param callbackFunction
// @param returnData
///////////////////////////////////////////////////////////
function makeHttpRequest(url, callbackFunction, returnData , retVal) 
{ 
	
	var httpRequest = false; 
	

	if (!httpRequestSupported) {
		return;  
	}
	

	httpRequest = isHttpRequestSupported();
	
	if (!httpRequest) { 
		httpRequestSupported = false;
		return false; 
	} 
	
	var splitURL = url.split("?")
	var urlWithOutParms = splitURL[0];
	var parms = splitURL[1];
	
	httpRequest.open('POST', urlWithOutParms, true);    
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", parms.length);
	httpRequest.setRequestHeader("Connection", "close");   
	httpRequest.onreadystatechange = function() { 
		if (httpRequest.readyState == 4) {       
			if (httpRequest.status == 200) { 
				if (returnData) { 
					eval(callbackFunction + '(httpRequest.responseXML,retVal)'); 
				} else { 
					eval(callbackFunction + '(httpRequest.responseText,retVal)'); 
				} 
			} else { 
				eval(callbackFunction + '("")'); 
			} 
		} 
	} 
	
	httpRequest.send(parms); 
	
} // end function