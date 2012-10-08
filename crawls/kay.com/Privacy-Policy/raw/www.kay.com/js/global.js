/*
 * Updated array prototype with indexOf function.
 */
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
	     for (var i = (start || 0), j = this.length; i < j; i++) {
	         if (this[i] === obj) { return i; }
	     }
	     return -1;
	};
}

function mountingDetailsPopup() {
	var popupwin = window.open("Setting fees","","width=300,height=150,scrollbars=0,resizable=0");
	var html = "<meta http-equiv='content-type' content='text/html; charset=UTF-8'><p>A setting fee is assessed based on the "+
		"size of the diamond and the metal type used to secure the diamond in the mounting.</p>";
	popupwin.document.open();
	popupwin.document.write(html);
	popupwin.document.close();
}

/*
* Class designed to hold client browser version.
*/
function BrowserObj(){
	var name = navigator.appName.toLowerCase();
	var info = navigator.appVersion.toLowerCase();
	var ver = parseInt(info);
	this.ns = (name.indexOf('netscape')!=-1) ? true : false;
	this.chrome = (navigator.userAgent.indexOf('Chrome') > -1) ? true : false;
	this.safari = (navigator.userAgent.indexOf('Safari') > -1) ? true : false;
	this.ie = (name.indexOf('microsoft internet explorer')!=-1) ? true : false;
	this.ff2 = (navigator.userAgent.indexOf('Firefox/2') > -1) ? true : false;
	this.ns4 = (this.ns && parseInt(ver)==4) ? true : false;
	this.ns5 = (this.ns && parseInt(ver)==5) ? true : false;
	this.ie4 = (this.ie && info.indexOf('msie 4')!=-1) ? true : false;
	this.ie5 = (this.ie && info.indexOf('msie 5')!=-1) ? true : false;
	this.ie6 = (this.ie && info.indexOf('msie 6')!=-1) ? true : false;
	this.ie7 = (this.ie && info.indexOf('msie 7')!=-1) ? true : false;
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

/*
* Function to open a new browser window centered on the screen.  Accepts the following parameters:
* @url : string of the url to request
* @name : the name to be associated with the new window
* @width : the width of the new window
* @height : the height of the new window
* @options : a string of the options to include in the new window
*/
function openWindowCentered(url, name, width, height, options) {

	var screenWidth  = screen.availWidth;
	var screenHeight = screen.availHeight;

	if (!name) name = "_default";
	if (!width) width = 640;
	if (!height) height = 420;
	var popW = width;
	var popH = height;
	var leftPos = (screenWidth-popW)/2;
	var topPos = (screenHeight-popH)/2;
	if (!options) options = "scrollbars=yes,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes";
	var newWin = window.open( url, name, "width=" + width + ",height=" + height + "," + ",top=" + topPos + ",left=" + leftPos + options );
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
			if (getElmtRef("globalSearchText").value == 'search'){
				getElmtRef("globalSearchText").value = '';
			}
		}
		
		getElmtRef("globalSearchText").onblur = function() {
			if (getElmtRef("globalSearchText").value == ''){
				getElmtRef("globalSearchText").value = 'search';
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

/*
* Function to redirect the location of a popup's parent window.  Accepts the following parameters:
* @url : string of the url to request
* @closeWindow : boolean to close popup after redirecting parent
*/
function redirect(url, closeWindow){
	if (opener && !opener.closed){
		opener.location.href = url;
		if(closeWindow){
			window.close();
		}
 	}else{
 		window.location.href = url;
 	}
}

function fixIE() {
    $('#productDetails').css('zoom', '1');
    $('#marketing').css('zoom', '1');
    $('#productDetails').css('visibility', 'visible');
    $('#marketing').css('visibility', 'visible');
}

function fixIE7(identifier) {
	//alert("fixIE7");
	$(identifier).css('zoom', '1');
	//$(identifier).css('visibility', 'visible');
}

//This function appends the cookie parameter information in the end of all R2net URLs
function getR2netRedirectUrl(url) {
	var appendChar = "";
	var endstr = url.length-1;
	var questionstr = url.lastIndexOf ("?");
	var ampstr = url.lastIndexOf ("&");

	if(questionstr == endstr || ampstr == endstr){
		//question or amperstand is the last character
		appendChar = "";
	}else if(questionstr == -1 ){
		//no question in the url
		appendChar = "?";
	}else{
		appendChar = "&";
	}
	var R2netUrl = url + appendChar + 'Nic=' + GetCookie('Nic');
	document.location.href = R2netUrl;
}

//Cookie functions
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

// Get URL parameter value by name using JavaScript
// Courtesy of http://www.netlobo.com/url_query_string_javascript.html
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null ) {
    return "";
  }
  else {
	var result = decodeURIComponent(results[1]);  // Prevent encoded characters in parameter value, such as %20
	result = result.replace(/%20/g, " "); // Just in case
    return result;
  }
}

function redirectToStoreLocator(address) {
	var fasControllerSearch = new Date().getTime();
	window.location.href = "http://" + document.domain + "/webapp/wcs/stores/servlet/StoreLocatorView?langId=-1&storeId=10101&catalogId=10001&userInput=" + address + "&address=" + address + "&statesDisplay=1&cSearch=" + fasControllerSearch;
	//findStores(0);
} 

// Find A Store modal
function findStores(selectedSuggestion, radius, subSequentSearch) {
	var fasControllerSearch = new Date().getTime();
	var address = $('#input_location').val();
	var latlng;
	var response = new Object();
	var userInput = gup("userInput");
	var storeLocatorPage = false;
	
	// Get address from find a store in store locator view.
	if(address == undefined || address == "" || address == "Enter a location" || address == null) {
		address = $("input[name=input_location_results_view]").val();
	}
	
	// On store locator page?
	if (gup("landing") == "" && window.location.href.indexOf('StoreLocatorView') != -1) {
		fasController.storeSearch = new Date().getTime();
		// Do not show loading spinner if on suggestions page
		if (gup("suggestions") != "true") {
			showLoading();
		}
	}
	
	// Use selected suggestion if clicked
	if (selectedSuggestion >= 0) {
		address = storeMap.suggestions[selectedSuggestion];
		userInput = "";
	} else if ((address == "Enter a location" || address == "" || address == null) && userInput != "") {
		// Entering store locator page with no exact match for location.  Display suggestions.
		storeLocatorPage = true;
		address = userInput;
	}
	
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
		//console.log("FINE: Geocoder status: " + status);
		if (status == google.maps.GeocoderStatus.OK) {
			var duplicate = false;			
			if (results.length == 1) {
				response.latlng = results[0].geometry.location;
				response.lat = response.latlng.lat();
				response.lng = response.latlng.lng();
				//console.log("FINER: Result: " + results[0].formatted_address);
			} else if (results.length == 0) {
				// Display error, no results found
				alert("The address search you entered returned zero city or state locations.");
			} else if (results.length > 1) {
				// Handle case where Google returns multiple results for a single city/state when it should return exact match, such as Dayton, WI
				var formattedAddress;
				for (var i = 0; i < results.length; i++) {
					if (formattedAddress == results[i].formatted_address) {
						duplicate = true;
						response.latlng = results[0].geometry.location;
						response.lat = response.latlng.lat();
						response.lng = response.latlng.lng();
					}
					formattedAddress = results[i].formatted_address;
				}
				if (!storeLocatorPage) {
					// Looked up user input and no exact match for location. Redirect to store locator page and display suggestions.
					userInput = address;
				}
			} else if (!storeLocatorPage) {
				// Looked up user input and no exact match for location. Redirect to store locator page and display suggestions.
				userInput = address;
			}
			
			// If not on store locator detail page
			if (gup("landing") != "" || window.location.href.indexOf('StoreLocatorView') == -1) {
				if (userInput == "" || duplicate) {
					// Exact location match. Redirect to store locator page and display results.
					window.location.href = "http://" + document.domain + "/webapp/wcs/stores/servlet/StoreLocatorView?langId=-1&storeId=10101&catalogId=10001&latitude=" + response.lat + "&longitude=" + response.lng + "&address=" + address + "&cSearch=" + fasControllerSearch;
				} else {
					// Pass user input to store locator page to display suggestions.
					window.location.href = "http://" + document.domain + "/webapp/wcs/stores/servlet/StoreLocatorView?langId=-1&storeId=10101&catalogId=10001&userInput=" + userInput + "&address=" + address  + "&suggestions=true&cSearch=" + fasControllerSearch;
				}
			} else {
				// Already on store locator detail page
				storeMap.stlocPageSearch = true;
				// Filter by locality type to fix issue for certain city/state returning multiple results
				// Exclude non-locality types from count, to determine if we truly have multiple valid locations returned
				// The only valid results are cities and states, not points of interest, etc.
				var validResults = 0;
				var isInvalidCityState = false;
				var cityState;
				var selectedLat;
				var selectedLng;
				var stateLat;
				var stateLang;
				for (i in results) {
					var cityName;
					var stateName;
					var resultCityState;
					var resultLat;
					var resultLng;
					for (j in results[i].address_components) {						
						for (k in results[i].address_components[j].types) {
							if (results[i].address_components[j].types[k] == "locality" || results[i].address_components[j].types[k] == "administrative_area_level_3") { // city
								cityName = results[i].address_components[j].long_name;
							} else if (results[i].address_components[j].types[k] == "administrative_area_level_1") { // state
								stateName = results[i].address_components[j].long_name;
							}
						}
					}
					
					// if city and state both are undefined in suggestions meaning its not a valid city or state. 
					if(cityName == undefined && stateName == undefined) {
						isInvalidCityState = true;
					} else {
						isInvalidCityState = false;
					}
					
					// If state is selected in suggestions, get the lat and lang of the selected state. 
					if(cityName == undefined && stateName != undefined) {
						if (results[i].geometry != null && results[i].geometry.location != null) {
							stateLat = results[i].geometry.location.lat();
							stateLang = results[i].geometry.location.lng();
						}
					}
					
					resultCityState = cityName + stateName;
					if (results[i].geometry != null && results[i].geometry.location != null) {
						resultLat = results[i].geometry.location.lat();
						resultLng = results[i].geometry.location.lng();
					}
					// Valid result?
					if (resultCityState != cityState && !isInvalidCityState) { // Only count city once in case it appears multiple times in results
						cityState = resultCityState;
						selectedLat = resultLat;
						selectedLng = resultLng;
						validResults++;
					}
				}
				
				if (validResults == 1 || userInput == "" || storeMap.stateSuggestion) {
					
					if (validResults == 1) {
						// User clicked city in suggestions.  Use latitude longitude from selected suggestion.
						// Refresh store list
						storeLocatorJS.submitFindAStore(selectedLat, selectedLng, radius, address);
						
						// Refresh map
						storeMap.latitude = selectedLat;
						storeMap.longitude = selectedLng;
						initialize(new google.maps.LatLng(selectedLat, selectedLng), 0);
					} else {	
						// User clicked State in suggestions.Use latitude longitude from selected suggestion.
						// Refresh store list
						storeLocatorJS.submitFindAStore(stateLat, stateLang, radius, address);
					
						// Refresh map
						storeMap.latitude = stateLat;
						storeMap.longitude = stateLang;
						initialize(new google.maps.LatLng(stateLat, stateLang), 0);						
					}
				} else {
					// User has arrived on store locator page with no exact location match. Display suggestions.
					hideLoading();
					$("#auto-complete").hide();
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
						
						// Add city state combo to suggestions list, or just state if the suggestion does not have a city
						// This fixes issue during state search if state name is also a city
						if (city != undefined && city != "undefined") {
							var suggestion = city + ", " + state;
							// Do not add suggestion if it already exists in list
							if (suggestions.indexOf(suggestion) == -1) {
								suggestions.push(suggestion);
							}
						} else {
							suggestions.push(state);
							storeMap.stateSuggestion = true;
						}
						city = undefined;						
					}
					
					storeMap.suggestions = suggestions;
					
					// Prevent displaying auto suggestions when click on state in states display page.
					 var statesDisplay = window.location.href.indexOf("statesDisplay");
					 // Display auto suggestions for subsequent search.
					 if(statesDisplay > 0 && (subSequentSearch == undefined)){
						if(storeMap.suggestions.length > 0) {
							if(storeMap.suggestions[0] == undefined) {
								storeLocatorJS.submitFindAStore(response.lat, response.lng, radius, address);
								// Refresh map
								storeMap.latitude = response.lat;
								storeMap.longitude = response.lng;
								initialize(new google.maps.LatLng(response.lat, response.lng), 0);		
							} else {
								findStores(0);
							}
						}
					 } else {
						 showSuggestions($("#input_location").val());
					 }

				}
			}
		} else {
			// Geocoding error
			alert("A problem occurred retrieving the location for your search.");
		}
	});
	
	// To set a store locator view link to a storeLink hidden field for sending link in an email.  
	setTimeout(function(){
		var link = "http://" + document.domain + "/webapp/wcs/stores/servlet/StoreLocatorView?langId=-1&storeId=10101&catalogId=10001&latitude=" + response.lat + "&longitude=" + response.lng + "&address=" + address + "&cSearch=" + fasControllerSearch;
		var storeLinkVal = document.getElementById("storeLink");
		if(storeLinkVal != null && storeLinkVal != "undefined") {
			document.getElementById("storeLink").value = link;
		}		
	},5000);							
	
	
	return response;
}

function linkToStoreLoc(address, storeKey) {
	var response = new Object();
	var lat;
	var lng;
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results.length == 1) {
				response.latlng = results[0].geometry.location;
				lat = response.latlng.lat();
				lng = response.latlng.lng();
				
				window.location.href = "http://" + document.domain + "/webapp/wcs/stores/servlet/StoreLocatorView?langId=-1&storeId=10101&catalogId=10001&latitude=" + lat + "&longitude=" + lng + "&address=" + address + "&key=" + storeKey;
			}
		}
	});
}

/* SWFObject v2.1 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;try{y=new ActiveXObject(p+".7")}catch(t){try{y=new ActiveXObject(p+".6");AC=[6,0,21];y.AllowScriptAccess="always"}catch(t){if(AC[0]==6){AB=true}}if(!AB){try{y=new ActiveXObject(p)}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");if(x){x=x.split(" ")[1].split(",");AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}}();var L=function(){if(!h.w3cdom){return }f(H);if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");J=C("__ie_ondomload");if(J){I(J,"onreadystatechange",S)}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()}},10)}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)}R(E)}();function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);E()}}function E(){if(e){return }if(h.ie&&h.win){var v=a("span");try{var u=K.getElementsByTagName("body")[0].appendChild(v);u.parentNode.removeChild(u)}catch(w){return }}e=true;if(Z){clearInterval(Z);Z=null}var q=o.length;for(var r=0;r<q;r++){o[r]()}}function f(q){if(e){q()}else{o[o.length]=q}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)}else{if(typeof j.attachEvent!=b){I(j,"onload",r)}else{if(typeof j.onload=="function"){var q=j.onload;j.onload=function(){q();r()}}else{j.onload=r}}}}}function H(){var t=N.length;for(var q=0;q<t;q++){var u=N[q].id;if(h.pv[0]>0){var r=C(u);if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)}W(u,true)}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])}else{O(r)}}}}else{W(u,true)}}}function Y(t){var q=t.getElementsByTagName(Q)[0];if(q){var w=a("embed"),y=q.attributes;if(y){var v=y.length;for(var u=0;u<v;u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)}}}var x=q.childNodes;if(x){var z=x.length;for(var r=0;r<z;r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))}}}t.parentNode.replaceChild(w,t)}}function k(w){A=true;var u=C(w.id);if(u){if(w.altContentId){var y=C(w.altContentId);if(y){M=y;l=w.altContentId}}else{M=G(u)}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"}K.title=K.title.slice(0,47)+" - Flash Player Installation";var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;if(h.ie&&h.win&&u.readyState!=4){var t=a("div");x+="SWFObjectNew";t.setAttribute("id",x);u.parentNode.insertBefore(t,u);u.style.display="none";var v=function(){u.parentNode.removeChild(u)};I(j,"onload",v)}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");t.parentNode.insertBefore(r,t);r.parentNode.replaceChild(G(t),r);t.style.display="none";var q=function(){t.parentNode.removeChild(t)};I(j,"onload",q)}else{t.parentNode.replaceChild(G(t),t)}}function G(v){var u=a("div");if(h.win&&h.ie){u.innerHTML=v.innerHTML}else{var r=v.getElementsByTagName(Q)[0];if(r){var w=r.childNodes;if(w){var q=w.length;for(var t=0;t<q;t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))}}}}}return u}function U(AG,AE,t){var q,v=C(t);if(v){if(typeof AG.id==b){AG.id=t}if(h.ie&&h.win){var AF="";for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'}}}}}var AD="";for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";i[i.length]=AG.id;q=C(AG.id)}else{if(h.webkit&&h.webkit<312){var AC=a("embed");AC.setAttribute("type",P);for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])}}}v.parentNode.replaceChild(AC,v);q=AC}else{var u=a(Q);u.setAttribute("type",P);for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])}}v.parentNode.replaceChild(u,v);q=u}}}return q}function F(t,q,r){var u=a("param");u.setAttribute("name",q);u.setAttribute("value",r);t.appendChild(u)}function X(r){var q=C(r);if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)}else{j.attachEvent("onload",function(){B(r)})}}else{q.parentNode.removeChild(q)}}}function B(t){var r=C(t);if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null}}r.parentNode.removeChild(r)}}function C(t){var q=null;try{q=K.getElementById(t)}catch(r){}return q}function a(q){return K.createElement(q)}function I(t,q,r){t.attachEvent(q,r);d[d.length]=[t,q,r]}function c(t){var r=h.pv,q=t.split(".");q[0]=parseInt(q[0],10);q[1]=parseInt(q[1],10)||0;q[2]=parseInt(q[2],10)||0;return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false}function V(v,r){if(h.ie&&h.mac){return }var u=K.getElementsByTagName("head")[0],t=a("style");t.setAttribute("type","text/css");t.setAttribute("media","screen");if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))}u.appendChild(t);if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];if(typeof q.addRule==Q){q.addRule(v,r)}}}function W(t,q){var r=q?"visible":"hidden";if(e&&C(t)){C(t).style.visibility=r}else{V("#"+t,"visibility:"+r)}}function g(s){var r=/[\\\"<>\.;]/;var q=r.exec(s)!=null;return q?encodeURIComponent(s):s}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;for(var v=0;v<w;v++){d[v][0].detachEvent(d[v][1],d[v][2])}var t=i.length;for(var u=0;u<t;u++){X(i[u])}for(var r in h){h[r]=null}h=null;for(var q in swfobject){swfobject[q]=null}swfobject=null})}}();return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return }var r={};r.id=u;r.swfVersion=q;r.expressInstall=t?t:false;N[N.length]=r;W(u,false)},getObjectById:function(v){var q=null;if(h.w3cdom){var t=C(v);if(t){var u=t.getElementsByTagName(Q)[0];if(!u||(u&&typeof t.SetVariable!=b)){q=t}else{if(typeof u.SetVariable!=b){q=u}}}}return q},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return }AB+="";AD+="";if(c(q)){W(AE,false);var AA={};if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]}}}AA.data=x;AA.width=AB;AA.height=AD;var y={};if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]}else{y.flashvars=t+"="+r[t]}}}}f(function(){U(AA,y,AE);if(AA.id==AE){W(AE,true)}})}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;W(AE,false);f(function(){var AF={};AF.id=AF.altContentId=AE;AF.width=AB;AF.height=AD;AF.expressInstall=w;k(AF)})}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)}else{return undefined}},removeSWF:function(q){if(h.w3cdom){X(q)}},createCSS:function(r,q){if(h.w3cdom){V(r,q)}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;if(v==null){return g(u)}if(u){var t=u.substring(1).split("&");for(var r=0;r<t.length;r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A&&M){var q=C(m);if(q){q.parentNode.replaceChild(M,q);if(l){W(l,true);if(h.ie&&h.win){M.style.display="block"}}M=null;l=null;A=false}}}}}();
