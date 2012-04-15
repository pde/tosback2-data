/*
* Class designed to hold client browser version.
*/
function BrowserObj(){
	var name = navigator.appName.toLowerCase();
	var info = navigator.appVersion.toLowerCase();
	var ver = parseInt(info);
	this.ns = (name.indexOf('netscape')!=-1) ? true : false;
	this.ie = (name.indexOf('microsoft internet explorer')!=-1) ? true : false;
	this.ns4 = (this.ns && parseInt(ver)==4) ? true : false;
	this.ns5 = (this.ns && parseInt(ver)==5) ? true : false;
	this.ie4 = (this.ie && info.indexOf('msie 4')!=-1) ? true : false;
	this.ie5 = (this.ie && info.indexOf('msie 5')!=-1) ? true : false;
	this.ie6 = (this.ie && info.indexOf('msie 6')!=-1) ? true : false;
	this.min = (ver>=4) ? true : false;
}
var browser = new BrowserObj();

/*
* Class designed to hold client platform version.
*/
function PlatformObj() {
	var info = navigator.appVersion.toLowerCase();
	this.win = (info.indexOf('windows')!=-1) ? true : false;
	this.mac = (info.indexOf('macintosh')!=-1) ? true : false;
}
var platform = new PlatformObj();

/*
* Function to return reference to page element.
* @strID - string value for the  id of the element.
*/
function getElmtRef(strID) {
	if (document.getElementById) {
		return document.getElementById(strID);
	} else if (document.all) {
		return document.all[strID];
	}
}

/*
* Function to cache images.
* If different directories or image types are needed, call the function multiple times.
* To caching rollover images, filename arguments must include the letter "B" at the end of the string.
* @strDir : relative or absolute path to directory with images
* @strExt : "gif" or "jpg"
* @arguments : remaining arguments are filenames of the images, excluding the "_off" and "_on"
*/
function cacheImages(strDir, strExt) {
	if (arguments.length < 3) return;
	for (var i=2; i<arguments.length; i++) {
		var n = arguments[i];
		if (n == undefined) {
			break;
		}
		if (n != undefined && n.charAt(n.length-1)=='B') {
			eval(n + "_off =  new Image");
			eval(n + "_off.src = \'" + strDir + n + "_off." + strExt + "\'");
			eval(n + "_on =  new Image");
			eval(n + "_on.src = \'" + strDir + n + "_on." + strExt + "\'");
		} else {
			eval(n + " = new Image");
			var imgName = n.toString();
			if (imgName.substring(0,4) == 'img_') {
				imgName = imgName.substring(4);
			}
			eval(n + ".src = \'"+ strDir + imgName + "." + strExt + "\'");
		}
	}
}

/*
* Function to open a new browser window.  Accepts the following parameters:
* @url : string of the url to request
* @name : the name to be associated with the new window
* @width : the width of the new window
* @height : the height of the new window
* @options : a string of the options to include in the new window
*/
function openWindow(url, name, width, height, options) {
	if (!name) name = "_default";
	if (!width) width = 640;
	if (!height) height = 420;
	if (!options) options = "scrollbars=yes,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes";
	var newWin = window.open( url, name, "width=" + width + ",height=" + height + "," + options );
	newWin.focus();
}

var priNavDefault = 'priJewelry';
var priNavActive = '';
var priNavIDs = new Array('priRings','priLeo','priDiamond','priGold','priJewelry','priWatches');

/*
* Function to handle rollovers of primary nav buttons.
*/
function onPrimaryNavBtn(strID) {
	// Hide active primary nav
	if (priNavActive != '') {
		setPrimaryNavBtnOff(priNavActive);
		setPrimarySubNavBtnOff(priNavActive);
	}

	// Hide divider if primary nav is last or second to last
	if ((strID == priNavIDs[priNavIDs.length-1]) || (strID == priNavIDs[priNavIDs.length-2])) {
		getElmtRef('priDivider').style.backgroundColor = "transparent";
	} else {
		getElmtRef('priDivider').style.backgroundColor = "#FFFFFF";
	}

	// Set active nav
	priNavActive = strID;

	// Show new primary nav
	setPrimaryNavBtnOn(priNavActive);
	setPrimarySubNavBtnOn(priNavActive);
}

function setPrimaryNavBtnOn(strID) {
	getElmtRef(strID + 'Link').style.color = "#666666";
	getElmtRef(strID).style.backgroundColor = "#FFFFFF";
}

function setPrimaryNavBtnOff(strID) {
	getElmtRef(strID + 'Link').style.color = "#FFFFFF";
	getElmtRef(strID).style.backgroundColor = "transparent";
}

function setPrimarySubNavBtnOn(strID) {
	getElmtRef(strID + 'Sub').style.display = "inline";
}

function setPrimarySubNavBtnOff(strID) {
	getElmtRef(strID + 'Sub').style.display = "none";
}


window.onload = function() {
	//if (document.globalSearchForm.elements["searchText"] != null) {
	if (getElmtRef("globalSearchText") != null) {
		getElmtRef("globalSearchText").onfocus = function() {
			//getElmtRef("globalSearchText").select();
			if (getElmtRef("globalSearchText").value == 'Search'){
				getElmtRef("globalSearchText").value = '';
			}
		}
		
		getElmtRef("globalSearchText").onblur = function() {
			if (getElmtRef("globalSearchText").value == ''){
				getElmtRef("globalSearchText").value = 'Search';
			}
		}
	}
}

/*
* Function to check whether the field array values are selected or not.
*/
function checkFieldArrayEmpty(field)
{
	for (i = 0; i < field.length; i++)
	{
		 if(field[i].checked == true)
		 return true;
	}
		alert("Pick at least one choice");
		return false;
}

//v1.0
//Copyright 2006 Adobe Systems, Inc. All rights reserved.
function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
  var str = '<object ';
  for (var i in objAttrs)
    str += i + '="' + objAttrs[i] + '" ';
  str += '>';
  for (var i in params)
    str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  str += '<embed ';
  for (var i in embedAttrs)
    str += i + '="' + embedAttrs[i] + '" ';
  str += ' ></embed></object>';

  document.write(str);
}

/*
* Function to embed flash in Internet Explorer 7.0.
*/

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "id":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

function hideSelects(){
	var selElems=document.getElementsByTagName('select');
	var numElems=selElems.length;
	for(i=0; i < numElems; i++) {
		selElems[i].style.visibility = "hidden";
	}
}
function unhideSelects(){
	var selElems=document.getElementsByTagName('select');
	var numElems=selElems.length;
	for(i=0; i < numElems; i++) {
		selElems[i].style.visibility = "visible";
	}
} 

function MM_CheckFlashVersion(reqVerStr,msg){
  with(navigator){
    var isIE  = (appVersion.indexOf("MSIE") != -1 && userAgent.indexOf("Opera") == -1);
    var isWin = (appVersion.toLowerCase().indexOf("win") != -1);
    if (!isIE || !isWin){  
      var flashVer = -1;
      if (plugins && plugins.length > 0){
        var desc = plugins["Shockwave Flash"] ? plugins["Shockwave Flash"].description : "";
        desc = plugins["Shockwave Flash 2.0"] ? plugins["Shockwave Flash 2.0"].description : desc;
        if (desc == "") flashVer = -1;
        else{
          var descArr = desc.split(" ");
          var tempArrMajor = descArr[2].split(".");
          var verMajor = tempArrMajor[0];
          var tempArrMinor = (descArr[3] != "") ? descArr[3].split("r") : descArr[4].split("r");
          var verMinor = (tempArrMinor[1] > 0) ? tempArrMinor[1] : 0;
          flashVer =  parseFloat(verMajor + "." + verMinor);
        }
      }
      // WebTV has Flash Player 4 or lower -- too low for video
      else if (userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 4.0;

      var verArr = reqVerStr.split(",");
      var reqVer = parseFloat(verArr[0] + "." + verArr[2]);
  
      if (flashVer < reqVer){
        if (confirm(msg))
          window.location = "https://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash";
      }
    }
  } 
}

// Get URL parameter value by name using JavaScript
// Courtesy of http://www.netlobo.com/url_query_string_javascript.html
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// Find A Store modal
function findStores(selectedSuggestion) {
var address = $('#input_location').val();
var latlng;
var response = new Object();
var userInput = gup("userInput");
var storeLocatorPage = false;
// Use selected suggestion if clicked
if (selectedSuggestion >= 0) {
address = storeMap.suggestions[selectedSuggestion];
userInput = "";
} else if ((address == "Enter a location" || address == "" || address == null) && userInput != "") {
// Entering store locator page with no exact match for location. Display suggestions.
storeLocatorPage = true;
address = userInput;
}
geocoder = new google.maps.Geocoder();
geocoder.geocode({'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
if (results.length == 1) {
response.latlng = results[0].geometry.location;
response.lat = response.latlng.lat();
response.lng = response.latlng.lng();
} else if (results.length == 0) {
// TODO Display error, no results found
} else if (!storeLocatorPage) {
// Looked up user input and no exact match for location. Redirect to store locator page and display suggestions.
userInput = address;
}
// If not on store locator detail page
if (gup("landing") != "" || window.location.href.indexOf('StoreLocatorView') == -1) {
if (userInput == "") {
// Exact location match. Redirect to store locator page and display results.
window.location.href = "/webapp/wcs/stores/servlet/StoreLocatorView?langId=-1&storeId=10101&catalogId=10001&latitude=" + response.lat + "&longitude=" + response.lng;
} else {
// Pass user input to store locator page to display suggestions.
window.location.href = "/webapp/wcs/stores/servlet/StoreLocatorView?langId=-1&storeId=10101&catalogId=10001&userInput=" + userInput;
}
} else {
// Already on store locator page
if (userInput == "") {
// Refresh store list
storeLocatorJS.submitFindAStore(response.lat, response.lng);
// Refresh map
storeMap.latitude = response.lat;
storeMap.longitude = response.lng;
initialize(new google.maps.LatLng(response.lat, response.lng), 0);
} else {
// User is already on store locator page but no exact location match. Display suggestions.
var city;
var state;
var suggestions = new Array();
for (i in results) {
for (j in results[i].address_components) {
for (k in results[i].address_components[j].types) {
if (results[i].address_components[j].types[k] == "locality") {
city = results[i].address_components[j].long_name;
} else if (results[i].address_components[j].types[k] == "administrative_area_level_1") {
state = results[i].address_components[j].long_name;
}
}
}
// Add city state combo to suggestions list
suggestions.push(city + ", " + state);
}
storeMap.suggestions = suggestions;
showSuggestions($("#input_location").val());
}
}
}
});
return response;
}

// This function appends the cookie parameter information in the end of all R2net URLs
function getR2netRedirectUrl(url) {
var R2netUrl = url + 'Nic=' + GetCookie('Nic');
document.location.href = R2netUrl;
}

// Cookie functions
function getCookieVal (offset) {
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie (name) {
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen) {
var j = i + alen;
if (document.cookie.substring(i, j) == arg)
return getCookieVal (j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break;
}
return null;
}
function SetCookie (name, value) {
var argv = SetCookie.arguments;
var argc = SetCookie.arguments.length;
var defaultexp = new Date ();
defaultexp.setTime (defaultexp.getTime() + (24 * 60 * 60 * 1000 * 31));
var expires = (argc > 2) ? argv[2] : defaultexp;
var path = (argc > 3) ? argv[3] : "/";
var domain = (argc > 4) ? argv[4] : null;
var secure = (argc > 5) ? argv[5] : false;
document.cookie = name + "=" + escape (value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
}
function DeleteCookie (name) {
var exp = new Date();
exp.setTime (exp.getTime() - 1);
var cval = GetCookie (name);
SetCookie(name, null);
document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
function DeleteAllCookies() {
if ( !document.cookie ) return false;
var a = document.cookie.split ('; ');
for (i=0; i<a.length; i++) {
p = a[i].indexOf('=');
if ( p>0 ) {
var key = a[i].slice (0, p);
DeleteCookie (key);
}
}
return true;
}
function ExpireCookie (name) {
var exp = new Date();
exp.setTime (exp.getTime() - 1);
var cval = GetCookie (name);
SetCookie(name, GetCookie(name));
document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
function ExpireAllCookies() {
if ( !document.cookie ) return false;
var a = document.cookie.split ('; ');
for (i=0; i<a.length; i++) {
p = a[i].indexOf('=');
if ( p>0 ) {
var key = a[i].slice (0, p);
ExpireCookie (key);
}
}
return true;
}   