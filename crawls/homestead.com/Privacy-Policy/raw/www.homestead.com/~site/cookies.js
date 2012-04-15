function Split(string, delimiter) {
var elements = new Array();
var numElements = 0;
var token;
var index = 0;
var nextIndex = -1;
index = string.indexOf(delimiter);
while (string != "") {
if (string.charAt(0) == delimiter) {
elements[numElements++] = "";
string = string.substring(1);
} else {
nextIndex = string.indexOf(delimiter);
if (nextIndex == -1) {
elements[numElements++] = string;
string = "";
} else {
elements[numElements++] = string.substring(0, nextIndex)
string = string.substring(nextIndex + 1)
}
}
}
return elements;
}
function GetCookie(key) {
var i;
var cookies = Split(document.cookie, ";");
for (i = 0; i < cookies.length; i++) {
if (cookies[i].substring(0, 1) == " ") cookies[i] = cookies[i].substring(1, cookies[i].length);
// Make the cookies case insensitive, like ASP
if (unescape(cookies[i].substring(0, key.length + 1).toUpperCase()) == key.toUpperCase() + "=") {
return unescape(cookies[i].substring(cookies[i].indexOf("=") + 1, cookies[i].length));
}
}
if (key == "BASEUSERSURL") {
return "/";
}
return null;
}
function SetCookie(key, value) {
SetCookieFull( key.toString().toUpperCase(), value, '', '/');
}
function ClearCookie(key) {
ClearCookieFull(key.toString().toUpperCase(), '/');
}
// this deletes the cookie when called
function ClearCookieFull(key, path, domain) 
{
document.cookie = key + "=0" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
// Sets the cookie with the given expiration date (in days).
// If the bOverRide flag is true, override the existing cookie (if the cookie already exists).
// If it is false, and the cookie already exists, don't ovverride the existing cookie.
// If the cookie doesn't exist in either case, set a new one.
function SetExpiresCookie(key, value, daysTillExpiration, bOverRide, domain)
{
//if don't override and the cookie exists - don't do anything
if(!bOverRide && GetCookie(key)) {
return;
} else {
//if the cookies doesn't exist - want to set regardless of bOverRide
SetCookieFull(key.toString().toUpperCase(), value, daysTillExpiration, '/', domain, false);
}
}
// only the first 2 parameters are required, the cookie key, the cookie
// value. Cookie time is in milliseconds, so the below daysTillExpiration will make the 
// number you pass in the setCookie function call the number of days the cookie
// lasts, if you want it to be hours or minutes, just get rid of 24 and 60.
// Generally you don't need to worry about domain, path or secure for most applications
// so unless you need that, leave those parameters blank in the function call.
function SetCookieFull(key, value, daysTillExpiration, path, domain, secure) 
{
if (daysTillExpiration && !isNaN(daysTillExpiration))
{
// Get the current date
var currentDate = new Date();
// Add the number of days
var expireTime = currentDate.getTime() + ( 1000 * 60 * 60 * 24 * daysTillExpiration);
var expireDate = new Date(expireTime);	
}
else
{
daysTillExpiration = false;
}
document.cookie = key + "=" + escape(value) +
((daysTillExpiration) ? ";expires=" + expireDate.toGMTString() : "") + 
((path) ? ";path=" + path : "") + 
((domain) ? ";domain=" + domain : "") +
((secure) ? ";secure" : "");
}
// Get and Set Cookie
// This function tests to see if the cookie is there, and if it is not, it sets it
// has an expiration date (in days)
function GetAndSetCookie(key, value, daysTillExpiration)
{
SetExpiresCookie(key, value, daysTillExpiration, false);
}
// A port of CEarCodeUtils::GetDomainForCookie
// Gets the domain for the cookie given a server name. If there are 
// more than 2 portions between the periods in the server name, we use 
// the last 2 for top level domains (eg. '.com') and last 3 for second 
// level domains (eg. '.co.uk'). See the below two examples:
// eg. 1: for 'www.blah.homestead.com' we set the cookie for domain='.homestead.com'
// eg. 2: for 'www.blah.intuit.co.uk' we set the cookie for domain='.intuit.co.uk'
// Example of usage: GetDomainForCookie(document.domain)
function GetDomainForCookie(domain) {
var domainTokens = domain.split('.');
var size = domainTokens.length;
if (size > 2) {
// Assume for now, it is top level domain
var domainName = domainTokens[size-2] + "." + domainTokens[size-1];
// Any supported second level domains will be filled in at build time from the corresponding partner def
var secondLevelDomainsString = "co.uk|me.uk|org.uk";
// Gets the supported second level domain names to an array
var secondLevelDomains = Split(secondLevelDomainsString, "|");
// Iterate through the supported second level doamin name and if the last 
// two tokens in the incoming server name matches any, return last 3 tokens 
// as domain name for the cookie.
// e.g. For Domains ending in 'co.uk' need cookies set at the full 'domain.co.uk'
var i = 0;
while (i < secondLevelDomains.length)
{
if (secondLevelDomains[i].toLowerCase() == domainName.toLowerCase())
{
domainName = domainTokens[size-3] + "." + domainName;
break;
}
++i;
}
return "." + domainName;
}
return "";
}
// A function to add an ABTest Name-Value pair to the ABTestValues cookie.
// If there is already a value for a particular test name, it will knock out the old value and replace it with the new.
// Upon signup, we will record these ABTest values.
//
// The format for this cookie is "TESTNAME1;TESTVALUE1|TESTNAME2;TESTVALUE2|TESTNAME3;TESTVALUE3" etc.
function SetABTestValue(testName, testValue)
{
// Make sure we have a valid testName and testValue before we do anything.
if (!testName || testName.length == 0 || !testValue || testValue.length == 0)
{
return;
}
// Some constants
var ABTestCookieName = "ABTESTVALUES";
var betweenTestsDelimiter = "|";
var betweenNameAndValueDelimiter = ";";
// The array from which we will construct our new cookie.
var resultingABTestValuesArray = new Array();
var ABTestValuesString = GetCookie(ABTestCookieName);
if (ABTestValuesString && ABTestValuesString.length != 0)
{
var ABTestValuesArray = Split(ABTestValuesString, betweenTestsDelimiter);
// we'll just pull them off the old array one by one, adding them to the new array if the testName doesn't match the testName that we are adding.
while (ABTestValuesArray.length > 0)
{
var ABTestNameValuesString = ABTestValuesArray.shift();
var delimiterPosition = ABTestNameValuesString.search(betweenNameAndValueDelimiter);
if (delimiterPosition > 0 && ABTestNameValuesString.substr(0, delimiterPosition) != testName)
{
resultingABTestValuesArray.push(ABTestNameValuesString);
}
}
}
// Now push on the new test name and value.
resultingABTestValuesArray.push(testName + betweenNameAndValueDelimiter + testValue);
SetExpiresCookie(ABTestCookieName, resultingABTestValuesArray.join(betweenTestsDelimiter), 90, true);
}

