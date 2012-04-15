/* DORA - External Application JavaScript */

/* : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : variables [ global ] */
// set basic variables to be used in functions below and in javascript w/in page
var personCookieValue = getCookie("ORA_Person");
var userCookieValue = getCookie("ORA_User");
var contextCookieValue = getCookie("ORA_Context");
var loggedIn, preAuthenticated = false;

// evaluate global variables and reassign values if applicapable
if (personCookieValue && userCookieValue && contextCookieValue) {
	loggedIn = true;
	personCookieValue = decodeURIComponent(personCookieValue);
	userCookieValue = decodeBase64(decodeURIComponent(userCookieValue)); userCookieArray = userCookieValue.split("||");
	contextCookieValue = decodeURIComponent(contextCookieValue);
}
if (loggedIn && thisPageContext == contextCookieValue) { preAuthenticated = true; }

/* : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : functions [ swf object ] */
// since security contains special characters, flash munges strings (w/ special characters) passed to it via the swf object model
// therefore it must get ontained from a call w/in the flash movie
// var thisPageContext, established in <script> node outside, preceeding, this file
function getContextForORA() { return thisPageContext; }
function getUserForORA() { return userCookieValue; }

// finds swf object in DOM by passing function a flash movie id
// enabling javascript to execute functions w/in that specified swf object
function getSWFObject(swfObjectId) {
	if (navigator.appName.indexOf("Microsoft") != -1) { /* IE */ return window[swfObjectId]; }
	else if (document[swfObjectId].length != undefined) { /* firefox */ return document[swfObjectId][0]; }
	else { /* safari */ return document[swfObjectId]; }
}

// allows flash movie to manage cookies via javascript
// set + delete (daysUntilExpiration = 0)
// ORA cookies: 0 = ORA_Person (person security hash), 1 = ORA_User (person data), 2 = ORA_Context (page security hash)
function manageCookiesForORA(nameArray, valueArray, daysUntilExpiration, path, domain) {
	var expires = new Date();
	expires.setTime(expires.getTime()+(daysUntilExpiration*24*60*60*1000));
	if (!daysUntilExpiration) { expires = null; }
	for (var i = 0; i < nameArray.length; i++) { setCookie(nameArray[i], encodeURIComponent(valueArray[i]), expires, path, domain); }
}

/* : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : functions [ page ] */
// properly format my discovery link and go to it
function bounceToDORAUI(action) {
	var loggedInString = (loggedIn) ? "true" : "false";
	var DORALoginURL = baseDORAURL + "?context=" + encodeURIComponent(thisPageContext) + "&loggedin=" + loggedInString + "&network=" + networkAbbreviation.toUpperCase() + "&oncomplete=" + escape(window.location.href) + "&type=" + action;
	window.location.href = DORALoginURL;
}

/* END DORA - External Application JavaScript */


/* DORA2- External Application JavaScript */
function register(code)
{
	var url = getDoraHostName() + "/registration/front.html?a=register&c="
		+ code + "&oc=" + window.location;
		
	window.location = url;
	
}

function update(code) 
{
	var url = getDoraHostName() + "/registration/front.html?a=update&c="
		+ code + "&ut=" + userCookieValue + "&oc=" + window.location;
		
	window.location = url;
}

function login(code)
{
	var url = getDoraHostName() + "/registration/front.html?a=login&c="
		+ code + "&oc=" + window.location;
		
	window.location = url;

}

function getDoraHostName() 
{
	var sLocation = window.location.toString();
	if(sLocation.indexOf(".dev") != -1) {
		return "https://ora.dev.discovery.com";
	}
	if(sLocation.indexOf(".stage") != -1) {
		return "https://ora.dev.discovery.com";
	}
	
	return "https://ora.discovery.com";
	
}
/* END DORA2- External Application JavaScript */

