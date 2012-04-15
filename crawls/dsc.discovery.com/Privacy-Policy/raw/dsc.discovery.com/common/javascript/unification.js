/**
 * @fileOverview    UNIFICATION JS : condense various global functions into one external script file
 *                  Init Date: Fri, 29 May 2009 14:34:00 EST.
 *                  Build Date: $Id: unification.js,v 1.19.2.2 2012/03/06 16:23:28 dhogge Exp $
 *                  Copyright (C) Discovery.com 2009. All Rights Reserved.
 * @author          various FEDs
 */

/**
 *  SET NAMESPACE, DEBUG LOGGING, PAGE SCOPED VARIABLES
 */
// Initialize DIT object + assign to global namespace
var DIT = {};
window.DIT = DIT;

// DIT.debug.log(data);
DIT.debug = (function () {
        return {
                log: function (s) {
                        if (window.console) { console.log(s); }     /* firefox */ 
                }
        };
}());

// variables in scope w/ parent page
var urlData = {protocol: window.location.protocol, hostname: window.location.hostname, pathname: window.location.pathname, query: window.location.search, hash: window.location.hash, fullyQualified: window.location.href, refer: document.referrer},
    testingDomainAlias = new Array("dev","test","stg","newprod"),
    hostContainsTestSub = false,
    hostnameSplit = (urlData.hostname).split("."),
    pathnameSplit = (urlData.pathname).split("/"),
    referSplit = (urlData.refer).split("/"),
    dciLinkPattern = /.discovery.com/gi,
    protocolPattern = /^http/,
    homepagePattern = /\.(\w+)\/$/,
    pageNumberString = new String(Math.random()),
    pageRandomNumber = (pageNumberString.substring(2, 11)).replace(/0/g, "1");

for (var i = 0; i < testingDomainAlias.length; i++) { if (hostnameSplit[1] == testingDomainAlias[i]) { hostContainsTestSub = true; break; } }



/**
 *  AD OPERATIONS CREATIVE OBJECTS / METHODS
 */
var containerAds = new Object;
containerAds = {
        alter: function(containerId, height, overflow) {
                document.getElementById(containerId).style.overflow = overflow;
                document.getElementById(containerId).style.height = height + "px";
                window.scrollBy(0, 0);
        }
};



/**
 *  COOKIE FUNCTIONS
 */
 function setCookie(name, value, expires, path, domain, secure) {
	var curCookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "/") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
	document.cookie = curCookie;
}

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) { begin = dc.indexOf(prefix); if (begin != 0) return null;	}
	else { begin += 2; }
	
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) { end = dc.length; }
	
	return unescape(dc.substring(begin + prefix.length, end));
}

function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie = name + "=" +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}


/**
 *  SWF COOKIE FUNCTIONS
 */
function getIP() { var ip = '<!--#echo var="REMOTE_ADDR"-->'; return ip; }

function swfGetCookie(flashId, flashVarName, cookieName) { document.getElementById(flashId).SetVariable(flashVarName, readCookie(cookieName)); }

function createCookie(name,value,days) {
	if (days) { var date = new Date(); date.setTime(date.getTime()+(days*24*60*60*1000)); var expires = "; expires="+date.toGMTString(); }
	else { var expires = ""; }
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "="; var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') { c = c.substring(1,c.length); }
		if (c.indexOf(nameEQ) == 0) { return c.substring(nameEQ.length,c.length); }
	}
	return null;
}

function eraseCookie(name) { createCookie(name,"",-1); }

var lcID;
function msgAlert(strOutput) { alert(strOutput); }
function getMain_lcID() { lcID = Math.random(); return lcID; }
function rsMain_lcID() { return lcID; }
function getLocation() { return document.location; }



/**
 *  DATA ENCRYPTION FUNCTIONS
 */
/*
- HEX + BASE64: set page level variables
*/
var END_OF_INPUT = -1;

/*
- BASE64: set variables
- BASE64: basic functions: set base64 string, read string forward, read string in reverse, convert a number to a string
*/
var base64Chars = new Array(
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        '0','1','2','3','4','5','6','7','8','9',
        '+','/'
    ),
    reverseBase64Chars = new Array();
    
for (var i=0; i < base64Chars.length; i++) { reverseBase64Chars[base64Chars[i]] = i; }

var base64Str;	var base64Count;

function setBase64Str(str) {
	base64Str = str;
	base64Count = 0;
}

function readBase64() {
	if (!base64Str) { return END_OF_INPUT; }
	if (base64Count >= base64Str.length) { return END_OF_INPUT; }
	var c = base64Str.charCodeAt(base64Count) & 0xff;
	base64Count++;
	return c;
}

function readReverseBase64(){   
	if (!base64Str) return END_OF_INPUT;
	while (true){	  
		if (base64Count >= base64Str.length) return END_OF_INPUT;
		var nextCharacter = base64Str.charAt(base64Count);
		base64Count++;
		if (reverseBase64Chars[nextCharacter]) {
			return reverseBase64Chars[nextCharacter];
		}
		if (nextCharacter == 'A') return 0;
	}
	return END_OF_INPUT;
}

function ntos(n){
	n = n.toString(16);
	if (n.length == 1) { n = "0" + n; }
	n = "%" + n;
	return unescape(n);
}

/*
- BASE64: encode data :: onblur="encodeBase64(document.form[0].element[0].value);"
*/
function encodeBase64(str) {
	setBase64Str(str);
	var result = '';
	var inBuffer = new Array(3);
	var lineCount = 0;
	var done = false;
	while (!done && (inBuffer[0] = readBase64()) != END_OF_INPUT) {
		inBuffer[1] = readBase64();
		inBuffer[2] = readBase64();
		result += (base64Chars[ inBuffer[0] >> 2 ]);
		if (inBuffer[1] != END_OF_INPUT) {
			result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30) | (inBuffer[1] >> 4) ]);
			if (inBuffer[2] != END_OF_INPUT) {
				result += (base64Chars [((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6) ]);
				result += (base64Chars [inBuffer[2] & 0x3F]);
			} else {
				result += (base64Chars [((inBuffer[1] << 2) & 0x3c)]);
				result += ('=');
				done = true;
			}
		} else {
			result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30)]);
			result += ('=');
			result += ('=');
			done = true;
		}
		lineCount += 4;
		if (lineCount >= 76) {
			result += ('\n');
			lineCount = 0;
		}
	}
	return result;
}

/*
- BASE64: decrypt data data :: onblur="decodeBase64(document.form[0].element[0].value);"
*/
function decodeBase64(str) {
	setBase64Str(str);
	var result = "";
	var inBuffer = new Array(4);
	var done = false;
	while (!done && (inBuffer[0] = readReverseBase64()) != END_OF_INPUT && (inBuffer[1] = readReverseBase64()) != END_OF_INPUT) {
		inBuffer[2] = readReverseBase64();
		inBuffer[3] = readReverseBase64();
		result += ntos((((inBuffer[0] << 2) & 0xff)| inBuffer[1] >> 4));
		if (inBuffer[2] != END_OF_INPUT) {
			result +=  ntos((((inBuffer[1] << 4) & 0xff)| inBuffer[2] >> 2));
			if (inBuffer[3] != END_OF_INPUT) {
				result +=  ntos((((inBuffer[2] << 6)  & 0xff) | inBuffer[3]));
			} else {
				done = true;
			}
		} else {
			done = true;
		}
	}
	return result;
}

/*
- HEX: set page level variables
- HEX: basic functions: set hex string, read string
*/
var digitArray = new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');

function toHex(n){
	var result = '';
	var start = true;
	for (var i=32; i>0;) {
		i-=4;
		var digit = (n>>i) & 0xf;
		if (!start || digit != 0)	{
			start = false;
			result += digitArray[digit];
		}
	}
	return (result==''?'0':result);
}

function pad(str, len, pad) {
	var result = str;
	for (var i=str.length; i<len; i++) {
		result = pad + result;
	}
	return result;
}


/*
- HEX: encode data :: onblur="encodeHex(document.form[0].element[0].value);"
*/
function encodeHex(str){
    var result = "";
    for (var i=0; i<str.length; i++) {
        result += pad(toHex(str.charCodeAt(i)&0xff),2,'0');
    }
    return result;
}

/*
- HEX: decrypt data data :: onblur="decodeHex(document.form[0].element[0].value);"
*/
function decodeHex(str){
	str = str.replace(new RegExp("s/[^0-9a-zA-Z]//g"));
	var result = "";
	var nextchar = "";
	for (var i=0; i<str.length; i++) {
		nextchar += str.charAt(i);
		if (nextchar.length == 2) {
			result += ntos(eval('0x'+nextchar));
			nextchar = "";
		}
	}
	return result;  
}



/**
 *  DIV STYLE
 */
/**
 *    @description    stylize div container
 *    @param          [string]       s     div id [ "name" = identifer ]
 *    @param          [string]       w     width [ "-1" = N/A | "#" = positive integer ]
 *    @param          [string]       h     height [ "-1" = N/A | "#" = positive integer ]
 *    @param          [string]       d     display [ "0" = N/A | "none" | "block" ] displays container
 *    @param          [string]       v     visibility [ "0" = N/A | "visible" | "hidden" ] visibility of container
 *    @param          [string]       o     overflow [ "0" = N/A | "visible" | "hidden" ]  clips container
 *    @param          [string]       p     position	[ "0" = N/A | "absolute" | "relative" ] placement of container
 *    @param          [string]       t     top [ "#" = integer ]
 *    @param          [string]       l     left [ "#" = integer ]
 */
function divStyle(s, w, h, d, v, o, p, t, l) {
	if (w != -1) { var containerWidth = w + "px"; document.getElementById(s).style.width = containerWidth; }
	if (h != -1) { var containerHeight = h + "px"; document.getElementById(s).style.height = containerHeight; }
	if (d != 0) { document.getElementById(s).style.display = d; }
	if (v != 0) { document.getElementById(s).style.visibility = v; }
	if (o != 0) { document.getElementById(s).style.overflow = o; }
	if (p != 0) { document.getElementById(s).style.position = p; }
	if (t) { var containerTop = t + "px"; document.getElementById(s).style.top = containerTop; }
	if (l) { var containerLeft = l + "px"; document.getElementById(s).style.left = containerLeft; }
}



/**
 *  DOCUMENT OBJECT MODULE (DOM) FUNCTIONS
 */
/**
 *    @description    returns attribute value of "content" from any META tag
 *    @param          [string]       attributeNameValue     attribute value of "name"
 */
function getMetaTagsData(attributeNameValue) {
        var metas = document.getElementsByTagName("meta"),
            attributeContentValue = "";
        
        for (var i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute("name") == attributeNameValue) {
                        attributeContentValue = metas[i].getAttribute("content");
                        break;
                }
        }
        
        return attributeContentValue;
}

/**
 *    @description    returns content of META tag named "launchDate" in YYYYMMDD format
 */
function getMetaLaunchDate() {
        var pageHREFSplit = (window.location.href).split("/"),
            rootDirectory = pageHREFSplit[3],
            metaTagValue = getMetaTagsData("launchDate"),
            metaDateValue = metaTagValue.split("/");
        
        return metaDateValue[2] + metaDateValue[0] + metaDateValue[1];
}

/**
 *    @description    returns page asset type gained from lookup against META tag named "type" + "category"
 */
function getMetaPageType() {
        var metaTypeValue = getMetaTagsData("type"),
            metaCategoryValue = getMetaTagsData("category"),
            legacyPageTemplate = metaTypeValue + "/" + metaCategoryValue,
            legacyTemplates = new Array(
                ["framework/article", "Article"],
                ["framework/flashembed", "Interactives"],
                ["framework/flashembed-fullwidth", "Interactives"],
                ["framework/flashembed-xhtml", "Interactives"],
                ["framework/open", "Interactives"],
                ["framework/indices", "Topic"],
                ["framework/knowledge-site-lite", "Topic"],
                ["framework/photogallery", "Interactives"],
                ["framework_APL/homepage", "Homepage"],
                ["framework_APL/petplanet", "Topic"],
                ["framework_APL/screeningroom", "Video Hub Legacy"],
                ["framework_APL/screeningroom-feature", "Video Hub Legacy"],
                ["framework_DHC/center", "Topic"],
                ["framework_DHC/homepage", "Homepage"],
                ["framework_DSC/homepage", "Homepage"],
                ["framework_DSC/news-index", "News"],
                ["framework_DSC/news-subject", "News"],
                ["framework_DSC/news-article", "News"],
                ["framework_IDS/homepage", "Homepage"],
                ["framework_MIL/homepage", "Homepage"],
                ["framework_SCI/homepage", "Homepage"],
                ["framework_TLC/homepage", "Homepage"],
                ["framework_TUR/collection", "Topic"],
                ["framework_TUR/homepage", "Homepage"],
                ["news/brief", "News"],
                ["splash/marketing", "Marketing"],
                ["sweepstakes/doorway", "Sweepstakes"],
                ["sweepstakes/form", "Sweepstakes"],
                ["tests_CME/exam", "Interactives"],
                ["utilities/about", "About"],
                ["video/inpageplayer", "Video Hub Legacy"],
                ["video/gallery", "Video Hub Legacy"]
            ),
            legacyAssetType = "";
        
        for (var i = 0; i < legacyTemplates.length; i++) {
                if (legacyPageTemplate == legacyTemplates[i][0]) {
                        legacyAssetType = legacyTemplates[i][1];
                        break;
                }
        }
        
        return legacyAssetType;
}



/**
 *  IFRAME RELOAD
 */
/**
 * @description     trigger the iframe windows to refresh
 */
function interactiveReload () {
        if ("" != pageLevelInteractiveRuleSet) { /* aditure will handle ad refresh */ }
        else {
            if (window.adbanner) { window.adbanner.location.reload(); }
            if (window.adtile) { window.adtile.location.reload(); }
            if (window.adtower) { window.adtower.location.reload(); }
        }
}

/**
 * @description     ad refresh function for Story Maker templates / rotate_count controls how often an ad should be refreshed
 */
var nav_click_count = 0,
    rotate_count = 1;
    
function onShowNewFocus(id, oldFocus, newFocus) {
	nav_click_count++;
	if (nav_click_count == rotate_count) { nav_click_count = 0; interactiveReload(); OmniView("Ad_Refresh"); }
}



/**
 *  IMAGE ROLLOVER FUNCTIONS
 */
/**
 * @description    establish objects and match case to array
 * @param  {string}    imageId    the id of the img element
 */
function imageHoverHandler(imageId) {
        var currentImage = document.getElementById(imageId);
        currentImage.src = currentImage.src.replace(/(\.[a-z0-9]+)$/i,'-on$1');
}

/**
 * @description    establish objects and match case to array
 * @param  {string}    imageId    the id of the img element
 */
function imageNormalizeHandler(imageId) {
        var currentImage = document.getElementById(imageId);
        currentImage.src = currentImage.src.replace(/-on(\.[a-z0-9]+)$/i,'$1');
}



/**
 *  NORMALIZE XHTML DATA FUNCTION
 */
/**
 * @description         Gets the XHTML of a DOM element and converts it and its children into re-useable XML data. 
 * @param    {string}    object     The id of an XHTML DOM object.
 * @param    {boolean}   [encode]   An optional flag that sets the return data to be encoded using encodeURIComponent. The defualt is true, the data will be encoded by default.
 * @return   {string}               returns the XHTML data as re-useable XML data in the form of a string.
 */
function normalizeXHTMLData(object, encode) {	
        /** It is an option to pass normalizeXHTMLData() a string indicating an id attribute as the object param in function*/
        if (typeof object == "string") {
                object = document.getElementById(object)
        }
        
        var open = "";
        var content = "";
        var close = "";
        
        /** get the type of tag from the DOM nodeName property and set it as the tag name */
        var tagname = object.nodeName.toLowerCase();
        
        /** boolean value that defines if the DOM object sent in has children nodes or not */
        var emptytag = (object.nodeName.match(/area|base|basefont|br|col|frame|hr|img|input|isindex|link|meta|param/i)) ? true : false; 
        
        /** write the open tag */
        open = "<" + tagname;
        for (var i = 0; i < object.attributes.length; i++) {
                if (object.attributes[i].specified && "null" != object.attributes[i].value) {
                        open += " " + object.attributes[i].name.toLowerCase() + "=\"" + object.attributes[i].value + "\"";
                }
        }
        open += (emptytag) ? " />" : ">";
        
        /** write the content tags */
        if (!emptytag) {
                for (var i = 0; i < object.childNodes.length; i++) {
                        var node = object.childNodes[i];
                        if (3 == node.nodeType) {
                                content += node.data;
                        } else if (1 == node.nodeType) {
                                content += normalizeXHTMLData(object.childNodes[i], false);
                        } else {
                                content += " ";
                        }
                }
                /** write the close tag */
                close = "</" + tagname + ">";
        }
        
        /** URI encode the return data if desired, the default is true*/
        return ("undefined" == typeof(encode) || true == encode) ? encodeURIComponent(open + content + close) : open + content + close;
}



/**
 *  PULLDOWN
 */
/**
 * @description     auto goto url via pulldown (onchange="navigateTo(this, 'current|new');")
 */
function navigateTo(s, type) { 
	var url = s.options[s.selectedIndex].value;
	if ((type) && (type == "new")) { window.open(url); }
	else { window.top.location.href = url; }
	return false;
}



/**
 *  QUERY STRING FUNCTION
 */
/*
- pulls name/value pairs from query string in a url
- pass the function ( [param name] and [position]* )     * = optional
*/
function getParam(paramName,pos) {
	var startPos = (pos) ? pos : 0;
	var url,paramBegin,paramEnd,valueBegin,paramValue;
	url = window.location.search;
	paramBegin = url.indexOf(paramName,startPos);

	if (paramBegin == -1) { return false; }
	paramEnd = paramBegin + paramName.length;
	param = url.substring(paramBegin,paramEnd);
	
	var valBegin = url.indexOf("=",paramEnd);
	var nextParam = url.indexOf("&",paramEnd);
	var valLen = (nextParam == -1) ? (url.length-(valBegin)) : (nextParam-valBegin);
	var valEnd = (nextParam == -1) ? valBegin+valLen : nextParam;

    valueBegin = paramEnd + 1;
    paramValue = url.substring(valueBegin, valEnd);

	if ((nextParam != -1) && (valBegin > nextParam)) { return getParam(param,paramEnd); }
	else {
		 for (i = 0; i < paramValue.length; i++) {
			 paramValue = paramValue.replace("+", " ");
			 paramValue = paramValue.replace("%20", " ");
			 paramValue = paramValue.replace("%26", "&");
			 paramValue = paramValue.replace("%27", "'");
			 paramValue = paramValue.replace("%28", "(");
			 paramValue = paramValue.replace("%29", ")");
		}
    	return paramValue;
	}
}



/**
 *  SOCIAL NETWORKING FUNCTIONS
 */
/**
 *    @object       socialSharing
 *    @method       toggleme            Used to swap element id's for Share Menu Items
 *    @method       stafPing            use a image to ping apps server with send to a friend form data
 *    @method       resetForm           clears send to a friend form data and resets messaging when panel is closed
 *    @method       closeEmail          closes email panel
 *    @method       emailPanel          opens email panel, resets charater count, confirmation message and submit button
 */
var socialSharing = new Object;
socialSharing = {
    toggleme: function(utilityButton, container) {
            var itemCount = 2,
                utilityId = "active-utility-toggle",
                swapElement;
                
            for (var i = 1; i <= itemCount; i++) {
                    if (document.getElementById("share-menu-" + i + "-open")) {
                            var activeButton = document.getElementById(utilityId),
                                activeMenu = document.getElementById("share-menu-"+i+"-open");
                                
                            swapElement = document.getElementById("share-menu-"+i+"-open").id;
                            activeMenu.setAttribute("id", "share-menu-"+i);
                            activeButton.className = activeButton.className.replace("-open", "");
                            activeButton.setAttribute("id", "");
                            utilityButton.className = utilityButton.className.replace("-open", "");
                            utilityButton.style.display = "";
                    }
            }
            
            if ((container + "-open") != swapElement) {
                    document.getElementById(container).setAttribute("id", container+"-open");
                    utilityButton.setAttribute("id", utilityId);
                    utilityButton.className = utilityButton.className+"-open";	
            }
    },
    
    /**
     * @param  {object}    formObject                   the entire form object
     * @param  {string}    pingImage                    the id of the ping img element
     * @param  {string}    submitButtonId               the id of the submit img element
     * @param  {string}    displayMessageToElementId    the id of the message display div element
     * @param  {string}    reset-email                    the id of the form reset button
     */
    stafPing: function(formObject, pingImage, submitButtonId, displayMessageToElementId) {
            if ("" != formObject.toName.value && "" != formObject.toAddress.value && "" != formObject.fromName.value && "" != formObject.fromAddress.value) {
                    var stafPingImage = new Image(1,1);
                    stafPingImage.src = "http://appsnew.discovery.com/webapps/staf/staf.jsp?subject=" + formObject.subject.value + "&header1=" + formObject.header1.value + "&header2=&header3=&format=standard&thanksFile=" + encodeURIComponent(formObject.thanksFile.value) + "&refPage=" + encodeURIComponent(formObject.refPage.value) + "&toName=" + formObject.toName.value + "&toAddress=" + formObject.toAddress.value + "&fromName=" + formObject.fromName.value + "&fromAddress=" + formObject.fromAddress.value + "&userMessage=" + encodeURIComponent(formObject.userMessage.value);
                    
                    document.getElementById(submitButtonId).style.display = "none";
                    document.getElementById(displayMessageToElementId).innerHTML = "<strong>Message Sent!</strong>";
                    document.getElementById(pingImage).src = stafPingImage.src;
                    document.getElementById("reset-email").style.display = "block";
            } else {
                    alert("Please provide your friend's name, their email address, your name and your email address.");
            }
            return false;
    },
    
    /**
     * @param  {object}    field                      the id of the img element
     * @param  {string}    maxCharacters              the id of the img element
     * @param  {string}    displayCountToElementId    the id of the img element
     */
    countCharacters: function(formObject, pingImage, submitButtonId, displayMessageToElementId) {
            var currentCount = field.value.length,
                characterLeft = maxCharacters - currentCount;
            
            document.getElementById(displayCountToElementId).value = "characters left = " + characterLeft;
            
            if (field.value.length > maxCharacters){ field.value = field.value.substring(0, maxCharacters); }
            else { displayCountToElementId.value = maxCharacters - field.value.length; }
    },
    
    resetForm: function() {
            document.getElementById("toName").value = "";
            document.getElementById("toAddress").value = "";
            document.getElementById("fromName").value = "";
            document.getElementById("fromAddress").value = "";
            document.getElementById("userMessage").value = "";
            document.getElementById("character-count").value = "characters left = 100";
            document.getElementById("post-email-message").innerHTML = "";
            document.getElementById("reset-email-over").style.display = "none";
            document.getElementById("post-email").style.display = "block";
    },
    
    closeEmail: function() {
            document.getElementById("email-overlay").style.display = "none";
    },
    
    emailPanel: function() {
            document.getElementById("email-overlay").style.display = "block";
            document.getElementById("character-count").value = "characters left = 100";
            document.getElementById("post-email-message").innerHTML = "";
    }
};



/**
 *  SCALE ECOMMERCE IMAGES FUNCTIONS
 */
/**
 * @description         writes the scaled images to the dom
 * @param    {array}    ecommerceImageArray     array of images passed to function from page.
 */
function placeEcommImagesToPage(ecommerceImageArray) {
        for (var i = 0; i < ecommerceImageArray.length; i++) {
                ecommImage = new Image(); ecommImage.src = ecommerceImageArray[i][0];
                var image = document.createElement("img"); image.setAttribute("src", ecommImage.src); image.setAttribute("width", scaleEcommImageToSize(ecommImage, "width")); image.setAttribute("height", scaleEcommImageToSize(ecommImage, "height")); image.setAttribute("alt", ecommerceImageArray[i][1]);
                document.getElementById(ecommerceImageArray[i][2]).appendChild(image);
        }
}

/**
 * @description         scales images to size
 * @param    {object}    image          image object.
 * @param    {string}    dimension      which dimension to return.
 * @return   {string}                   returns the scaled dimension requested.
 */
function scaleEcommImageToSize(image, dimension) {
        var maxWidth = 80;
        var maxHeight = 95;
        var scale = 0;
        var scaledWidth = 0;
        var scaledHeight = 0;
        
        if ((image.width >= maxWidth) && (image.height >= maxHeight)) {
                if ((image.width - maxWidth) >= (image.height - maxHeight)) {
                        scaledWidth = maxWidth;
                        scale = scaledWidth / image.width;
                        scaledHeight = image.height * Math.floor(scale);
                } else {
                        scaledHeight = maxHeight;
                        scale = scaledHeight / image.height;
                        scaledWidth = image.width * Math.floor(scale);
                }
        }
                
        if ("width" == dimension) { return scaledWidth; } else { return scaledHeight; }
}


/* ################################################################################# */
/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept == "undefined") var deconcept = new Object();
if(typeof deconcept.util == "undefined") deconcept.util = new Object();
if(typeof deconcept.SWFObjectUtil == "undefined") deconcept.SWFObjectUtil = new Object();
deconcept.SWFObject = function(swf, id, w, h, ver, c, quality, xiRedirectUrl, redirectUrl, detectKey) {
	if (!document.getElementById) { return; }
	this.DETECT_KEY = detectKey ? detectKey : 'detectflash';
	this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params = new Object();
	this.variables = new Object();
	this.attributes = new Array();
	if(swf) { this.setAttribute('swf', swf); }
	if(id) { this.setAttribute('id', id); }
	if(w) { this.setAttribute('width', w); }
	if(h) { this.setAttribute('height', h); }
	if(ver) { this.setAttribute('version', new deconcept.PlayerVersion(ver.toString().split("."))); }
	this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
	if (!window.opera && document.all && this.installedVer.major > 7) {
		// only add the onunload cleanup if the Flash Player version supports External Interface and we are in IE
		deconcept.SWFObject.doPrepUnload = true;
	}
	if(c) { this.addParam('bgcolor', c); }
	var q = quality ? quality : 'high';
	this.addParam('quality', q);
	this.setAttribute('useExpressInstall', false);
	this.setAttribute('doExpressInstall', false);
	var xir = (xiRedirectUrl) ? xiRedirectUrl : window.location;
	this.setAttribute('xiRedirectUrl', xir);
	this.setAttribute('redirectUrl', '');
	if(redirectUrl) { this.setAttribute('redirectUrl', redirectUrl); }
}
deconcept.SWFObject.prototype = {
	useExpressInstall: function(path) {
		this.xiSWFPath = !path ? "expressinstall.swf" : path;
		this.setAttribute('useExpressInstall', true);
	},
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name];
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name];
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = new Array();
		var key;
		var variables = this.getVariables();
		for(key in variables){
			variablePairs[variablePairs.length] = key +"="+ variables[key];
		}
		return variablePairs;
	},
	getSWFHTML: function() {
		var swfNode = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { // netscape plugin architecture
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "PlugIn");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ this.getAttribute('style') +'"';
			swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
			var params = this.getParams();
			 for(var key in params){ swfNode += [key] +'="'+ params[key] +'" '; }
			var pairs = this.getVariablePairs().join("&");
			 if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
			swfNode += '/>';
		} else { // PC IE
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "ActiveX");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ this.getAttribute('style') +'">';
			swfNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />';
			var params = this.getParams();
			for(var key in params) {
			 swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
			}
			var pairs = this.getVariablePairs().join("&");
			if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
			swfNode += "</object>";
		}
		return swfNode;
	},
	write: function(elementId){
		if(this.getAttribute('useExpressInstall')) {
			// check to see if we need to do an express install
			var expressInstallReqVer = new deconcept.PlayerVersion([6,0,65]);
			if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
				this.setAttribute('doExpressInstall', true);
				this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
				document.title = document.title.slice(0, 47) + " - Flash Player Installation";
				this.addVariable("MMdoctitle", document.title);
			}
		}
		if(this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))){
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
			n.innerHTML = this.getSWFHTML();
			return true;
		}else{
			if(this.getAttribute('redirectUrl') != "") {
				document.location.replace(this.getAttribute('redirectUrl'));
			}
		}
		return false;
	}
}

/* ---- detection functions ---- */
deconcept.SWFObjectUtil.getPlayerVersion = function(){
	var PlayerVersion = new deconcept.PlayerVersion([0,0,0]);
	if(navigator.plugins && navigator.mimeTypes.length){
		var x = navigator.plugins["Shockwave Flash"];
		if(x && x.description) {
			PlayerVersion = new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	}else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0){ // if Windows CE
		var axo = 1;
		var counter = 3;
		while(axo) {
			try {
				counter++;
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+ counter);
//				document.write("player v: "+ counter);
				PlayerVersion = new deconcept.PlayerVersion([counter,0,0]);
			} catch (e) {
				axo = null;
			}
		}
	} else { // Win IE (non mobile)
		// do minor version lookup in IE, but avoid fp6 crashing issues
		// see http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
		try{
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}catch(e){
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				PlayerVersion = new deconcept.PlayerVersion([6,0,21]);
				axo.AllowScriptAccess = "always"; // error if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this code)
			} catch(e) {
				if (PlayerVersion.major == 6) {
					return PlayerVersion;
				}
			}
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			} catch(e) {}
		}
		if (axo != null) {
			PlayerVersion = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
		}
	}
	return PlayerVersion;
}
deconcept.PlayerVersion = function(arrVersion){
	this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
	this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0;
}
deconcept.PlayerVersion.prototype.versionIsValid = function(fv){
	if(this.major < fv.major) return false;
	if(this.major > fv.major) return true;
	if(this.minor < fv.minor) return false;
	if(this.minor > fv.minor) return true;
	if(this.rev < fv.rev) return false;
	return true;
}
/* ---- get value of query string param ---- */
deconcept.util = {
	getRequestParameter: function(param) {
		var q = document.location.search || document.location.hash;
		if (param == null) { return q; }
		if(q) {
			var pairs = q.substring(1).split("&");
			for (var i=0; i < pairs.length; i++) {
				if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
					return pairs[i].substring((pairs[i].indexOf("=")+1));
				}
			}
		}
		return "";
	}
}
/* fix for video streaming bug */
deconcept.SWFObjectUtil.cleanupSWFs = function() {
	var objects = document.getElementsByTagName("OBJECT");
	for (var i = objects.length - 1; i >= 0; i--) {
		objects[i].style.display = 'none';
		for (var x in objects[i]) {
			if (typeof objects[i][x] == 'function') {
				objects[i][x] = function(){};
			}
		}
	}
}
// fixes bug in some fp9 versions see http://blog.deconcept.com/2006/07/28/swfobject-143-released/
if (deconcept.SWFObject.doPrepUnload) {
	if (!deconcept.unloadSet) {
		deconcept.SWFObjectUtil.prepUnload = function() {
			__flash_unloadHandler = function(){};
			__flash_savedUnloadHandler = function(){};
			window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs);
		}
		window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
		deconcept.unloadSet = true;
	}
}
/* add document.getElementById if needed (mobile IE < 5) */
if (!document.getElementById && document.all) { document.getElementById = function(id) { return document.all[id]; }}

/* add some aliases for ease of use/backwards compatibility */
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject; // for legacy support
var SWFObject = deconcept.SWFObject;
/* ################################################################################# */


/* ################################################################################# */
/*
    http://www.JSON.org/json2.js
    2010-03-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
/* ################################################################################# */


/**
 *  WINDOW CONTROLS
 */
/**
 * @description     check object properties if they are a string type
 * @param  {string}  url
 * @param  {string}  name
 * @param  {string}  width  
 * @param  {string}  height  
 * @param  {string}  scroll
 * @param  {string}  resize
 */
function windowOpen(url, name, width, height, scroll, resize) {
        if (scroll == "") { scroll = "0"; }
        if (resize == "") { resize = "0"; }
        var options = "width=" + width + ",height=" + height + ",status=0,toolbar=0,menubar=0,location=0,scrollbars=" + scroll + ",resizable=" + resize;

        window.open(url,name,options);
        /* self.focus(); */
        return false;
}

/**
 * @description    Link from popup to parent browser
 * @param  {string}  url
 */
function toParent(url) {
        opener.location.href = url; 
        window.close();
}


/* ################################################################################# */
/**
 *    @description    ADITURE
 *    @version        1.3
 *    @usage          aditure.trigger("{mandatory|'empty'}", "{interactive|game|puzzle|...}", {exclusion:""});
 *    @usage          param[0]:required / param[1]:optional / param[2]:optional
 */
var OARuleStyles = new Array(["interactive","30s-NextClick"],["game","30s-NextClick"],["puzzle","30s-NextClick"],["quiz","EveryClick"],["slideshow","EveryClick"],["timeline","EveryClick"],["default","30s-NextClick"]),
    OARuleSet = "",
    pageLevelInteractiveRuleSet = "",
	OATimerTime = 0;
    OATimerStatus = "begin",
    OATriggerAction = "",
	previousClickDatetime = 0,
	OAEveryClickInterval = 1500,
    doAditureEvents = false,
    networkAccounts = new Array(["animal","disccapl"],["dhd","disccdhd"],["dsc","disccdsc"],["health","discchlt"],["fittv","disccfit"],["investigation","disccids"],["kids","discckid"],["military","disccmil"],["news","disccnews"],["planetgreen","discdpg"],["science","disccsci"],["tlc","discctlc"],["turbo","disccturbo"]),
    globalAccount = "disccglobal",
    omnitureDevFlag = hostContainsTestSub,
    showDebugConsole = false,
    fiftyPercent = false,
    debugObject = {adRefreshCounter:0};


/**
 *    @description    tracking methods for onclick events
 *    @usage          aditure.trigger("{mandatory|'empty'}", "{interactive|game|puzzle|...}", {exclusion:""});
 *    ......          param[0]:required / param[1]:optional / param[2]:optional
 */
var aditure = new Object;
aditure = {
        trigger: function(actionName, passedInteractiveType, exclude) {
				if ("undefined" != typeof (interactiveTypeOverride)) { interactiveType = interactiveTypeOverride; }
				else if ("undefined" != typeof (passedInteractiveType)) { interactiveType = passedInteractiveType; }
				else { interactiveType = "default"; }
                
                OATriggerAction = actionName;
                
                for (var i = 0; i < OARuleStyles.length; i++) {
                        if (interactiveType == OARuleStyles[i][0]) { OARuleSet = OARuleStyles[i][1]; break; }
                }
                
                switch (OARuleSet) {
                        case "30s-NextClick" :
                                aditure.ruleNextClick();
                                break;
                        case "EveryClick" :
                                aditure.ruleEveryClick();
                                break;
                        default : break;
                }
                
                if (showDebugConsole) { debugDiv.style.background = "#C66"; }
				if (doAditureEvents) { aditure.fireEvents(); }
        },
        
       	ruleNextClick: function() {
                if ("mandatory" == OATriggerAction) {
                        if ("active" == OATimerStatus) { OATimerTime = 0; OATimerStatus = "complete"; }
                        doAditureEvents = true;
                }
                else {
                        if ("active" != OATimerStatus) {
                                doAditureEvents = true;
                                OATimerTime = 30;
                                OATimerStatus = "active";
                                aditure.timer(30);
                        }
                        else { doAditureEvents = false; }
                }
        },
        
       	ruleEveryClick: function() {
                var currentDate = new Date(),
                    thisClickDatetime = (currentDate.getSeconds() * 1000) + currentDate.getMilliseconds();
                    
                if ((thisClickDatetime - previousClickDatetime) >  OAEveryClickInterval) { OATimerTime = 0; doAditureEvents = true; }
                else { doAditureEvents = false; }
                
                previousClickDatetime = thisClickDatetime;
		},
        
        fireEvents: function() {
				if (showDebugConsole) {
                        debugObject.adRefreshCounter++;
                        debugDiv.style.background = "#363";
                        debugDiv.innerHTML = "<h1>Refreshing!</h1>";
                }
                
                interactivePageViewEvent.trigger();
                aditure.adrefresh();
				    if (fiftyPercent) {
					   COMSCORE.beacon({
						  c1: 2,
						  c2: 6036284,
						  c3: "",
						  c4: "",
						  c5: "",
						  c6: "",
						  c7: "comscorekw=pageview_candidate",
						  c15: ""
					   });
					   aditure.fireNeilson();
                }
		},
        
        timer: function(seconds) {
                if (0 < OATimerTime) { setTimeout(function() { seconds--; OATimerTime = seconds; aditure.timer(seconds); if (showDebugConsole) { aditure.updateDebugConsole() } }, 1000); }
                else { OATimerTime = 0; OATimerStatus = "complete"; }
		},
        
        network: function() {
                for (var i = 0; i < networkAccounts.length; i++) {
                        if (hostnameSplit[0] == networkAccounts[i][0]) { return i; break; }
                }
        },
        
        adrefresh: function() {
                var leaderboard = document.getElementById("ad-container-leaderboard"),
                    rectangle = document.getElementById("ad-container-rectangle"),
                    skyscraper = document.getElementById("ad-container-skyscraper");
                if (leaderboard) { leaderboard.src = leaderboard.src; }   if (window.adbanner) { window.adbanner.location.reload(); }
                if (rectangle) { rectangle.src = rectangle.src; }   if (window.adtile) { window.adtile.location.reload(); }
                if (skyscraper) { skyscraper.src = skyscraper.src; }   if (window.adtower) { window.adtower.location.reload(); }
        },
        
		renderDebugConsole: function() {
			debugObject.adRefreshCounter=0;
			showDebugConsole=true;
			debugDiv=document.createElement("div");
			debugDiv.style.padding='10px';
			debugDiv.style.textAlign='left';
			debugDiv.style.font='13px Arial';
			debugDiv.style.color="#fff";
			debugDiv.style.opacity=.95;
			debugDiv.id="monkey";
			debugDiv.style.position='fixed';
			debugDiv.style.width='300px';
			debugDiv.style.height='200px';
			debugDiv.style.bottom='0px';
			debugDiv.style.right='0px';
			debugDiv.style.background='#666';
			debugDiv.innerHTML="<h2>Aditure Debug</h2>";
			document.getElementsByTagName("body")[0].appendChild(debugDiv);
		},
        
		updateDebugConsole: function() {
			debugDiv.style.background='#666';
			debugDiv.innerHTML="<h2>Aditure Debug</h2>";
			debugDiv.innerHTML+="<p>Interactive Type: " + interactiveType+"</p>";
			debugDiv.innerHTML+="<p>Rule Set: " + OARuleSet+"</p>";
			debugDiv.innerHTML+="<p>Refresh Counter: " + debugObject.adRefreshCounter + "</p>";
			if (OATimerTime!=0) {
				debugDiv.innerHTML+="<h3><strong>t -<span style='color:#F99; background:#333'>" + OATimerTime+"</span></strong> seconds + click until refresh</h3>";
			} else {
				debugDiv.innerHTML+="<h3 style='color:#6C6'>Next Click Will Trigger AdRefresh + Omniture</h3>";
			}	
		},
		
		fireNeilson: function() {
			var d = new Image(1, 1); 
			d.onerror = d.onload = function () {d.onerror = d.onload = null;}; 
			d.src = ["http://secure-us.imrworldwide.com/cgi-bin/m?ci=us-204250h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
		}
};


/**
 *    @description    set listener for debugger console if flagged in query string
 */
if (-1 != (document.location.search).indexOf("debug=true")) {
        window.addEventListener('load', aditure.renderDebugConsole, false);
}
/* ################################################################################# */

DIT.utilities = {
        loadScript:function(uri, callback) {
                var head = document.getElementsByTagName("head")[0],
                    script = document.createElement("script"); 
                script.src = uri;
                head.appendChild(script);
                script.onload = script.onreadystatechange = function () {
                    if (!script.readyState || "loaded" == script.readyState || "complete" == script.readyState) {
                            if (typeof callback == "function") { callback(); }
                    }
                };
        }
}

/**
 *    @description    generic blank function for legacy interactives which require this func inserted into the page via the oas ad server where DFP will no londer serve this code
 */
function passOASEntitlement(){}
