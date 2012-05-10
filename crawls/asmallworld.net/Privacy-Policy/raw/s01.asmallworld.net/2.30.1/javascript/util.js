var friendPhoto = new Object();
var memberPhoto = new Object();


// Disable dotted outline around clicked links
// http://www.mikesmullin.com/2006/06/16/removing-the-dotted-outline-from-focused-links
window.onload = function() {
  
	//alert('disable dotted outlines.. ');
	
  // hide dotted :focus outlines when mouse is used 
  // but NOT when tab key is used if(document.getElementsByTagName)   
	var a = document.getElementsByTagName('A');
	if(typeof a != 'undefined'){
		for(var i = 0; i < a.length; i++){
			var l = a[i];
			
      if (!l.className.contains("ctx")) {
  			l.onmousedown = function(){
  				this.blur(); // most browsers     
          this.hideFocus = true; // ie     
          this.style.outline = 'none'; // mozilla
  			}
  			
  			l.onmouseout = l.onmouseup = function(){
  				this.blur(); // most browsers     
          this.hideFocus = false; // ie    
          if (!document.all) this.style.outline = null; // mozilla
  			}
			}
		}
	}	
  
}

function launchMemberConnectOverlay(friendId, successFunc, errorFunc, closeFunc) {

  var url = "/network/connect/" + friendId + "?";

  if (successFunc) {
    url += "successFunc=" + successFunc;
  }

  if (errorFunc) {
    if ( ! url.match(/\?$/) ) {
      url += "&";
    }
    url += "errorFunc=" + errorFunc;
  }
  overlay.load({ 
    name : 'dialog', 
		content : false,
    url : url,
    closeFunc: closeFunc,
    width : 584, 
    version : 'v4' 
  });
		
}

function makeCompatibleSelector(str) {
  var jQueryVersion = parseFloat(jQuery.fn.jquery.substring(0,3));
	if (str.indexOf("@") >= 0 && jQueryVersion > 1.2) {
	  str = str.replace(/@/, '');
  }
	return str;
}

function limitText(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
    limitField.value = limitField.value.substring(0, limitNum);
  } 
}

function isNonDigit(val) { return (/\D/).test(val); }

function setCityPref(value, days) {

  var domain = document.location.hostname.match(/([^.]*.[^.]*)$/)[1];
  if ( domain.indexOf(".") < 0 ) domain = ""
  else domain = '.' + document.location.hostname.match(/([^.]*.[^.]*)$/)[1];

  // if no days specified, make days equivalent to 100 years
  if ( !days ) {
   	days = 36500; 
  }
  var expireDate = new Date();
  expireDate.setTime(expireDate.getTime()+(days*24*60*60*1000));

  cookie = 'city_pref=' + value 
    + ( domain ? '; domain='  + domain : '' )
	+ '; expires=' + expireDate.toGMTString() 
	+ '; path=/';
  document.cookie = cookie;
}

function hideFirefoxScrollbars(stateX, stateY, scrollableEls) {
  if (navigator.platform.toLowerCase().indexOf("mac") >= 0 && YAHOO.env.ua.gecko && YAHOO.env.ua.gecko <= 1.8) {
    for (i = 0; i < scrollableEls.length; i++) {
      el = scrollableEls[i];
      if (stateX != null) {
        xScrollbarVisibility = (stateX) ? 'hidden' : 'auto';
        jQuery(el).css({ 'overflow-x' : xScrollbarVisibility });        
      }
      if (stateY != null) {
        yScrollbarVisibility = (stateY) ? 'hidden' : 'auto';
        jQuery(el).css({ 'overflow-y' : yScrollbarVisibility });        
      }
    }
  }
}

function hideDropdowns(state, overlay ) {
	if (YAHOO.env.ua.ie && YAHOO.env.ua.ie < 7) {
		if (overlay) {
			var selectEls = document.getElementsByTagName("select");
			for (i = 0; i < selectEls.length; i++) {
        el = selectEls[i];
        overlayDiv = document.getElementById("overlay-window");
        elParent = el.parentNode;
        while(elParent != overlayDiv && elParent.nodeName != 'BODY'){
          prev = elParent;
          elParent = elParent.parentNode;
          if(elParent == null){
            elParent = prev;
            break;
          }
        }
        if(elParent != overlayDiv){
          el.style.visibility = (state) ? "hidden" : "visible";  
        }            
      }
		}
		else{
			var selectEls = document.getElementsByTagName("select");
			for (i = 0; i < selectEls.length; i++) 
				selectEls[i].style.visibility = (state) ? "hidden" : "visible";
		}
	}
}

function setMagazineMenuWidth(msgState) {
	if (window.Core.Client.os == "Mac") {
		if (window.Core.Client.browser == "Firefox" && window.Core.Client.version > 2) {
			padVal = 20;
		} else { 
			padVal = 14;
		}
		switch (msgState) {
			case "msg-few" : padVal -= 3; break;
			case "msg-tens" :
			case "msg-hundreds" : padVal -= 2; break;
			case "msg-thousands" : padVal -= 1; break;
		}
		magMenuItem = YAHOO.util.Dom.getElementsByClassName('nav-asw-magazine', 'li')[0];
		magMenuItem.style.paddingLeft = padVal + 'px';
		magMenuItem.style.paddingRight = padVal + 'px';
	}
}

function toggleOnlineIcon(id) {
	var onlineIcon = document.getElementById("online-icon-" + id);	
	if ( $defined(onlineIcon) ) {
		if ( !onlineIcon.style.left || !onlineIcon.style.left.contains("em") )
			onlineIcon.style.left = "-999em";
		else
			onlineIcon.style.left = "2px";
	}
}

function toggleOffscreen(el) {
  if (jQuery(el).hasClass("offscreen")) 
    jQuery(el).removeClass("offscreen");
  else
    jQuery(el).addClass("offscreen");    
}

function toggleContent(behavior, altContent, altLink, orgContent) {
  
  var altContentObj = ($type(altContent) == "string" && altContent.charAt(0) == "#") ? jQuery(altContent)[0] : altContent;

  if (orgContent != null && behavior == "replace" && $type(orgContent) != "array"  ) {
    var orgContentObj = ($type(orgContent) == "string" && orgContent.charAt(0) == "#") ? jQuery(orgContent)[0] : orgContent;
  }
  if (this != null && altLink != null) {
    var altLinkObj = ($type(altLink) == "string" && altLink.charAt(0) == "#") ? jQuery(altLink)[0] : altLink;
    jQuery(altLinkObj).toggle();
    jQuery(this).toggle();
  }
  
  if (behavior == "replace") {
    if ($type(orgContent) == "array") {
      for (i = 0; i < orgContent.length; i++) {
        orgContentObj = jQuery(orgContent[i])[0];
        if (jQuery(orgContent[i]).css("display") == "block" ) {
          jQuery(orgContentObj).toggle();
        }
      }
    } else {
      jQuery(orgContentObj).toggle();
    }  
  }  
  jQuery(altContentObj).toggle();
}

function createScript(scriptURL, scriptID) {
	
	var h = document.getElementsByTagName('head').item(0);
	var js = document.createElement("script");
	
	js.setAttribute("language", "javascript");
	js.setAttribute("type", "text/javascript");
	
	if (scriptID != null) js.setAttribute("id", scriptID);
	js.setAttribute("src", scriptURL);
	h.appendChild(js);
	
}

function FLEACheck(adID) {
	
	// Make sure we include the FLEA stuff
	if (!document.getElementById("flea-js"))
		createScript(static_server + "/javascript/flea/library.js", "flea-js");
	
	// Write out the div to hold it all
	document.write('<div id="' + adID + '"></div>');
	
}

function getNumericAttributeValue(type) {
  var val = (jQuery(this).attr(type)) ? jQuery(this).attr(type) : eval("this.offset" + type);
  if ($type(val) == "string") val = parseInt(val.replace(/['"]/gi, ''));
  return val;
}

function getLineHeight(){ 
  var val = jQuery(this).css("line-height");
  if (val == "normal") return getFontSize.call(this) + 2;
  else return getPixelValue(val); 
}
function getPaddingTop(){ return getPixelValue(jQuery(this).css("padding-top")); }
function getPaddingBottom(){ return getPixelValue(jQuery(this).css("padding-bottom")); }
function getPaddingLeft(){ return getPixelValue(jQuery(this).css("padding-left")); }
function getPaddingRight(){ return getPixelValue(jQuery(this).css("padding-right")); }
function getBorderTop(){ return getPixelValue(jQuery(this).css("border-top-width")); }
function getBorderBottom(){ return getPixelValue(jQuery(this).css("border-bottom-width")); }
function getBorderLeft(){ return getPixelValue(jQuery(this).css("border-left-width")); }
function getBorderRight(){ return getPixelValue(jQuery(this).css("border-right-width")); }
function getFontSize(){ return getPixelValue(jQuery(this).css("font-size")); }

function getHorizonatalBorder() {
  var borderLeft = getBorderLeft.call(this);
  var borderRight = getBorderRight.call(this);
  return borderLeft + borderRight;
}

function getVerticalBorder() {
  var borderTop = getBorderTop.call(this);
  var borderBottom = getBorderBottom.call(this);
  return borderTop + borderBottom;
}

function getHorizonatalPadding() {
  var padLeft = getPaddingLeft.call(this);
  var padRight = getPaddingRight.call(this);
  return padLeft + padRight;
}

function getVerticalPadding() {
  var padTop = getPaddingTop.call(this);
  var padBtm = getPaddingBottom.call(this);
  return padTop + padBtm;
}

function getTotalLineHeight() {
  var lineHeight = getLineHeight.call(this);
  var padVert = getVerticalPadding.call(this);
  return lineHeight + padVert;
}

function getPixelValue(val) {
  if (val.contains("px")) val = val.substr( 0, val.length-2);
  return parseInt(val);  
}

function truncateList(containerClass) {

  // only apply this hack for Firefox, everyone else uses text-overflow:ellipsis
  if (YAHOO.env.ua.gecko) {	
    var truncateContainerWidth = truncateContainerHeight = paddingTop = null;
    // iterate through all the matching classes
    jQuery(containerClass).each( function() {
      try {
        // get widths of container and text div to be truncated
        // assumes there is a truncate-container class within each element being iterated over
        // this container should have an element with nested-class 
        truncateContainer = jQuery(this).find(".truncate-container")[0];
        containerWidth = truncateContainer.offsetWidth-getHorizonatalPadding.call(truncateContainer);
        truncateText = jQuery(truncateContainer).find(".truncate-text .overflow-text")[0];
        truncateTextWidth = truncateText.offsetWidth + getHorizonatalPadding.call(truncateText);

        // text content flows beyond container
        if (truncateTextWidth > containerWidth) {
          jQuery(truncateContainer).addClass("ellipsis");
          // position the ellipsis background depending on line height, font size, padding, etc
          var positionDelta = YAHOO.util.Dom.getXY(truncateText)[1] - YAHOO.util.Dom.getXY(truncateContainer)[1];
          jQuery(truncateContainer).css({
            "background-position": "right " + (getFontSize.call(truncateText) + getPaddingTop.call(truncateText) + positionDelta - 2) + "px"
          });
        }
      }catch(e) {
        return
      }
    });
  }
}

function replaceWithDefaultPhoto(el, context) {
  if (context == "events") {
    replaceHTML = '<div class="default-photo"><div class="default-photo-title">Photo Not Available</div></div>';
	  jQuery(el).replaceWith(replaceHTML);
  }

  if (context == "profile-photo-large") {
	  jQuery(el).attr("src", static_server + "/images/profile/portrait_default_large.gif");
  }
  
  if ( (context == "profile-photo") || (context == "profile-photo-medium") ) {
	  jQuery(el).attr("src", static_server + "/images/profile/portrait_default_medium.gif");
  }
  
  if (context == "profile-photo-small") {
	  jQuery(el).attr("src", static_server + "/images/profile/portrait_default_small.gif");
  } 
}




function replaceImageSource(img) {
  if (img) {
    if (jQuery(img).attr("url") != "") {
      jQuery(img).attr("src", jQuery(img).attr("url"));
      jQuery(img).attr("url", "");
    }
  }
}

// check out the description for each() and the html functions produced by the call to each()
// at http://elzr.com/posts/hyperscript
function each(a, f) { for(var i=0, l=a.length; i<l; i++) f(a[i]) };
each('a big blockquote br b center code div em form h1 h2 h3 h4 h5 h6 hr img iframe input i li ol option pre p script select small span strong style sub sup table tbody td textarea tr ul u'.split(' '),
    function(label){
        window[label]=function(){
            var tag=document.createElement(label);
            each(arguments, function(arg){ 
                if(arg.nodeType)                                         tag.appendChild(arg);
                else if(typeof arg=='string' || typeof arg=='number')    tag.innerHTML+=arg;
                else for(var attr in arg){
                        if(attr=='style') for(var sty in arg[attr]) tag[attr][sty]=arg[attr][sty];
                        else tag[attr]=arg[attr];
                };
            });
            return tag;
        };
});

function json2string(strObject) {
 var c, i, l, s = '', v, p;

 switch (typeof strObject) {
 case 'object':
  if (strObject) {
   if (strObject.length && typeof strObject.length == 'number') {
    for (i = 0; i < strObject.length; ++i) {
     v = json2string(strObject[i]);
     if (s) {
      s += ',';
     }
     s += v;
    }
    return '[' + s + ']';
   } else if (typeof strObject.toString != 'undefined') {
    for (i in strObject) {
     v = strObject[i];
     if (typeof v != 'undefined' && typeof v != 'function') {
      v = json2string(v);
      if (s) {
       s += ',';
      }
      s += json2string(i) + ':' + v;
     }
    }
    return '{' + s + '}';
   }
  }
  return 'null';
 case 'number':
  return isFinite(strObject) ? String(strObject) : 'null';
 case 'string':
  l = strObject.length;
  s = '"';
  for (i = 0; i < l; i += 1) {
   c = strObject.charAt(i);
   if (c >= ' ') {
    if (c == '\\' || c == '"') {
     s += '\\';
    }
    s += c;
   } else {
    switch (c) {
     case '\b':
      s += '\\b';
      break;
     case '\f':
      s += '\\f';
      break;
     case '\n':
      s += '\\n';
      break;
     case '\r':
      s += '\\r';
      break;
     case '\t':
      s += '\\t';
      break;
     default:
      c = c.charCodeAt();
      s += '\\u00' + Math.floor(c / 16).toString(16) +
       (c % 16).toString(16);
    }
   }
  }
  return s + '"';
 case 'boolean':
  return String(strObject);
 default:
  return 'null';
 }
}

function isEmptyObject(object) {
  if (!isType(object, 'object')) { return false; }
  for (var p in object) { return false; }
  return true;
}

// Credt: Alexandre Gomes http://www.alexandre-gomes.com/?p=115
function getScrollBarWidth () {
	var inner = document.createElement('p');
	inner.style.width = '100%';
	inner.style.height = '200px';
	
	var outer = document.createElement('div');
	outer.style.position = 'absolute';
	outer.style.top = '0px';
	outer.style.left = '0px';
	outer.style.visibility = 'hidden';
	outer.style.width = '200px';
	outer.style.height = '150px';
	outer.style.overflow = 'hidden';
	outer.appendChild (inner);
	
	document.body.appendChild (outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;
	
	document.body.removeChild (outer);
	
	return (w1 - w2);
};

function getViewportDimensions(){
	var viewportwidth;
	var viewportheight;
	
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerWidth, viewportheight = window.innerHeight
	}
	
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	
	else 
		if (typeof document.documentElement != 'undefined' &&
		typeof document.documentElement.clientWidth !=
		'undefined' &&
		document.documentElement.clientWidth != 0) {
			viewportwidth = document.documentElement.clientWidth, viewportheight = document.documentElement.clientHeight
		}
		
		// older versions of IE
		
		else {
			viewportwidth = document.getElementsByTagName('body')[0].clientWidth, viewportheight = document.getElementsByTagName('body')[0].clientHeight
		}
	return Array(viewportwidth, viewportheight);
}

function findPos(obj) {
  // Credit for this function: http://www.quirksmode.org/js/findpos.html
  // Visit the URL for a complete tutorial on this function
  var curleft = curtop = 0;
  if (obj.offsetParent) {
	 curleft = obj.offsetLeft
	 curtop = obj.offsetTop
	 curwidth = obj.offsetWidth;
	 curheight = obj.offsetHeight;
	 while (obj = obj.offsetParent) {
		curleft += obj.offsetLeft
		curtop += obj.offsetTop
	 }
  }
  return [curleft,curtop,curwidth,curheight];
}

function clipValues(obj,which) {
  var clipStr = obj.style.clip.replace(/,/gi, "");
  clipStr = clipStr.replace(/pt/gi, "px");
  clipStr = clipStr.replace(/ /gi, "");
  var clipv = clipStr.split("rect(")[1].split(")")[0].split("px")
  if (which=="t") return parseInt(clipv[0])
  if (which=="r") return parseInt(clipv[1])
  if (which=="b") return parseInt(clipv[2])
  if (which=="l") return parseInt(clipv[3])
}

function getAbsolutePosition(element) {
  var r = { x: element.offsetLeft, y: element.offsetTop };
  /*
  if (element.offsetParent && !(YAHOO.env.ua.ie && YAHOO.env.ua.ie < 7) ) {
    var tmp = getAbsolutePosition(element.offsetParent);
    r.x += tmp.x;
    r.y += tmp.y;
  }
  */
  return r;
}

/**
 * Retrieve the coordinates of the given event relative to the center
 * of the widget.
 *
 * @param event
 *   A mouse-related DOM event.
 * @param reference
 *   A DOM element whose position we want to transform the mouse coordinates to.
 * @return
 *    A hash containing keys 'x' and 'y'.
 */
function getRelativeCoordinates(event, reference) {
  var x, y;
  event = event || window.event;
  var el = event.target || event.srcElement;

  if (!window.opera && typeof event.offsetX != 'undefined') {
    // Use offset coordinates and find common offsetParent
    var pos = { x: event.offsetX, y: event.offsetY };

    // Send the coordinates upwards through the offsetParent chain.
    var e = el;
    while (e) {
      e.mouseX = pos.x;
      e.mouseY = pos.y;
      pos.x += e.offsetLeft;
      pos.y += e.offsetTop;
      e = e.offsetParent;
    }

    // Look for the coordinates starting from the reference element.
    var e = reference;
    var offset = { x: 0, y: 0 }
    while (e) {
      if (typeof e.mouseX != 'undefined') {
        x = e.mouseX - offset.x;
        y = e.mouseY - offset.y;
        break;
      }
      offset.x += e.offsetLeft;
      offset.y += e.offsetTop;
      e = e.offsetParent;
    }

    // Reset stored coordinates
    e = el;
    while (e) {
      e.mouseX = undefined;
      e.mouseY = undefined;
      e = e.offsetParent;
    }
  }
  else {
    // Use absolute coordinates
    var pos = getAbsolutePosition(reference);
    x = event.pageX  - pos.x;
    y = event.pageY - pos.y;
  }
  // Subtract distance to middle
  return { x: x, y: y };
}

function findMousePos(e) {
	// Credit for this function:  http://www.quirksmode.org/js/events_properties.html#position
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
  return [posx,posy];
}

function pop_window(url, w, h, opener_win){
	if (w == null) w = 450;
	if (h == null) h = 500;	
	var timestamp = new Date().getMilliseconds();
	newwindow = window.open(url,'ASW_popup_' + timestamp,'toolbar=0,menubar=no,location=0,directories=no,resizable=yes,width=' + w + ',height=' + h + ',scrollbars=yes');
	if (opener_win != null) newwindow.window.opener_win = opener_win;
	if (window.focus) {
		newwindow.focus();
	}
}


/**
 *  The Core Object and namespace for attaching additional Framework, Toolkit, and Business Objects, Functions, etc.
 *  @namespace Core
 *  @class Core
 *  @dependencies DOM must be ready
 */


/**
 *  W3C DOM Level 2 standard node types; for older browsers and IE
 */
if (null == document.ELEMENT_NODE) {
	document.ELEMENT_NODE                   = 1;
	document.ATTRIBUTE_NODE                 = 2;
	document.TEXT_NODE                      = 3;
	document.CDATA_SECTION_NODE             = 4;
	document.ENTITY_REFERENCE_NODE          = 5;
	document.ENTITY_NODE                    = 6;
	document.PROCESSING_INSTRUCTION_NODE    = 7;
	document.COMMENT_NODE                   = 8;
	document.DOCUMENT_NODE                  = 9;
	document.DOCUMENT_TYPE_NODE             = 10;
	document.DOCUMENT_FRAGMENT_NODE         = 11;
	document.NOTATION_NODE                  = 12;
}


/**
 *  manages commonwealth variables: version, browser, debug state, namespace
 */
window.Core = function() {

	//	Private namespace

	var debugLevel = 0;
	
	
	//	Public namespace

	return {
		/**
		 *	JavaScript Framework version
		 */
		VERSION: '1.0',

		
		/**
		 *	Each HTML page on your site should have the same ID on the body tag, put that hear to speed up some DOM searches
		 */
		HTML_BODY_ID: 'body',


		/**
		 *	Object namespace placeholder for attaching page specific business logic 
		 */
		Biz: {},


		/**
		 *	Object namespace placeholder for attaching global constants; inner Function to create Client Singleton
		 */
		Constants: {},


		/**
		 *	Object namespace for attaching client detection logic
		 */
		Client: function() {
		
			// Private namespace
			
			var versionSearchString = '';
		
		
			/**
			 *	data to identify browsers
			 */
			var dataBrowser = [
				{string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"},
				{string: navigator["vendor"], subString: "Apple", identity: "Safari"},
				{prop: window["opera"], identity: "Opera"},
				{string: navigator["vendor"], subString: "iCab", identity: "iCab"},
				{string: navigator["vendor"], subString: "KDE", identity: "Konqueror"},
				{string: navigator["vendor"], subString: "Camino", identity: "Camino"},
				{string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
				{string: navigator.userAgent, subString: "Netscape", identity: "Netscape"}, // for newer Netscapes (6+)
				{string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE"},
				{string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv"},
				{string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla"} // for older Netscapes (4-)
			];

			
			/**
			 *	data to identify OS
			 */
			var dataOS = [
				{string: navigator.platform, subString: "Win", identity: "Windows"},
				{string: navigator.platform, subString: "Mac", identity: "Mac"},
				{string: navigator.platform, subString: "Linux", identity: "Linux"}
			];
			

			/**
			 *	Perform browser search on navigator
			 *	@param	data {Array} Collection of browser detection Objects
			 */
			var searchString = function (data) {
				// iterate on the dataBrowser set; order is important or will match wrong versions
				for (var i=0; i<data.length; i++) {
					var dataString = data[i]["string"],
						dataProp = data[i]["prop"];
					
					versionSearchString = data[i]["versionSearch"] || data[i]["identity"];
						
					if (dataString) {
						if (dataString.indexOf(data[i]["subString"]) != -1) {return data[i]["identity"];}
					}
					else if (dataProp) {
						return data[i]["identity"];
					}
				}
			};

			
			/**
			 *	Perform browser version search on versionSearch or identity of the browser data Object
			 *	@param	dataString {Array} Collection of browser detection Objects
			 */
			var searchVersion = function (dataString) {
				var index = dataString.indexOf(versionSearchString);
				return (-1 == index)? null: parseFloat(dataString.substring(index + versionSearchString.length + 1));
			};
			
			
			//	Public namespace

			return {


				/**
				 *  The browser String as determined by searchString
				 *  @property browser
				 *  @type String
				 */
				browser: searchString(dataBrowser) || 'An unknown browser',


				/**
				 *  The version String as determined by searchVersion; must be called after searchString on dataBrowser
				 *  @property browser
				 *  @type String
				 */
				version: searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || 'an unknown version',


				/**
				 *  The OS String as determined by searchString
				 *  @property browser
				 *  @type String
				 */
				os: searchString(dataOS) || 'an unknown OS',
			
			
				/**
				 *	Creates a cookie with @ name set to value that expires in n days
				 *	@param	name {String}						The name of the cookie
				 *	@param	value {String}						The value of the cookie
				 *	@param	days {String}						OPTIONAL: The number of days before cookie expires, otherwise expires at end of session
				 */
				createCookie: function(name, value, days) {
					var expires=null;
					if (days) {
						var date = new Date();
						date.setTime(date.getTime()+(days*24*60*60*1000));
						expires = "; expires="+date.toGMTString();
					}
					else {expires = "";}
					document.cookie = name+"="+value+expires+"; path=/";
				},


				/**
				 *	Expires the cookie
				 *	@param	name {String}						The name of the cookie
				 */
				eraseCookie: function(name) {
					this.createCookie(name, '', -1);
				},
				
				
				/**
				 * X-browser method to find the BODY tag; lazy definition to improve repeat performance
				 *
				 * @method getBody
				 * @return {HTMLElement} the BODY tag
				 * @static
				 */
				getBody: function() {
					var bd = window.document.body || window.document.childNodes[0].childNodes[1] || window.document.getElementsByTagName("body")[0] || window.document;
					Mint.Client.getBody = function() {return bd;}
					return Mint.Client.getBody();
				},
				
				
				/**
				 * X-browser method to find the scroll offset; lazy definition to improve repeat performance
				 *
				 * @method getScrollOffset
				 * @return {Object} the scroll offset object {x, y}
				 * @static
				 */
				getScrollOffset: function() {
					var de = document.documentElement, db = Mint.Client.getBody();
					
					if (de && (de.scrollTop || de.scrollLeft)) { // compliant browser
						Mint.Client.getScrollOffset = function() {return {x: dd.scrollLeft, y: dd.scrollTop};}
					} 
					else if (db) { // IE
						Mint.Client.getScrollOffset = function() {return {x: db.scrollLeft, y: db.scrollTop};}
					} 
					else { // default, so calls to this method won't fail
						Mint.Client.getScrollOffset = function() {return {x: 0, y: 0};}
					}
					
					return Mint.Client.getScrollOffset();
				},


				/**
				 *	Returns true if the browser variable is Explorer
				 */
				isIE: function() {
					return this.browser == 	"Explorer";
				},


				/**
				 *	Returns true if the browser variable is Opera
				 */
				isOpera: function() {
					return this.browser == 	"Opera";
				},


				/**
				 *	Retrieves the value of a cookie
				 *	@param	name {String}						The name of the cookie
				 *	@return	{String}							Value of the cookie or null
				 */
				readCookie: function(name) {
					var nameEQ = name + "=";
					var ca = document.cookie.split(';');
					for(var i=0;i < ca.length;i++) {
						var c = ca[i];
						while (c.charAt(0)==' ') {c = c.substring(1,c.length);}
						if (c.indexOf(nameEQ) == 0) {return c.substring(nameEQ.length,c.length);}
					}
					return null;
				}
			};
		}(),


		/**
		 *	Object namespace placeholder for attaching debug constants and functions
		 */
        Debug: {
			ALL: 0,
			ERROR: 1,
			DEBUG: 2,
			PRODUCTION: 5
		},


		/**
		 * Object namespace placeholder for attaching page specific widgets
		 */
        Model: {},


		/**
		 *	Object namespace placeholder for attaching page specific widgets
		 */
        Widget: {},


		/**
		 *	Object namespace placeholder for attaching page specific utility Objects and Functions
		 */
		Util: {},
		
		
		/**
		 *  Placeholder function, used whenever an empty anonymous function is required 
		 */
		emptyFunction: function() {},


		/**
		 * Executes fn on each element in the set
		 *
		 * @method batch
		 * @param set {array} the collection to iterate on
		 * @param fn {function} the function to execute on each member of the collection
		 * @param {arguments} any number of arguments to pass into fn
		 * @public
		 */
		batch: function(set, fn) {
			if (! set.length) {return;}
			var args = Array.prototype.slice.apply(arguments, [2]);
			args.unshift(null, null);

			// iterate on the items, executing the function, and stoping when function returns true or touched all childnodes
			for (var i = 0, j = set.length; i < j; i++) {
				args[0] = set[i];
				args[1] = i;
				var rs = fn.apply(this, args);
				if (rs) {
					return rs; // allows the batch function to return a found result
				}
			}
		},


		/**
		 * Extends the prototype of the subclass with that of the superclass and apply additional methods
		 *
		 * @method extend
		 * @param subc {object} subclass
		 * @param superc {object} superclass
		 * @param overrides {object} class member overrides
		 * @static
		 */
		extend: function(subc, superc, overrides) {
			if (! superc || ! subc) {
				throw new Error('Core.extend failed, please check that all dependencies are included.');
			}

			var F = function() {};
			F.prototype = superc.prototype;
			subc.prototype = new F();
			subc.prototype.constructor = subc;
			subc.prototype.parent = superc.prototype;

			if (overrides) {
				for (var i in overrides) {
					subc.prototype[i] = overrides[i];
				}
			}
		},


		/**
		 *  returns an image object with src, useful for image caching
		 *  @param  src {String}                    The location of the image
		 *  @return {Image}                         A Javascript Image Object of the src
		 */
		getImage: function(src) {
			var img = new Image();
			img.src = src;
			return img;
		},

		
		/**
		 *	Returns the debug level of the application
		 *	@return	{Integer} the debug level
		 */
		getDebugLevel: function() {return debugLevel;},

		
		/**
		 *	Sets the debug level of the application
		 *	@param	lvl {Integer} the debug level
		 */
		setDebugLevel: function(lvl) {debugLevel = lvl;}
	};
}();


/* Section: Type Detection Functions */

/**
Function: $defined
	Returns true if the passed in value/Object is defined, that means it is not null or undefined.

Arguments:
	o - the Object to inspect.
	
Returns:
	{boolean}
*/

function $defined(o){
	return (o != undefined && o != null);
};


/**
Function: $type
	Returns the type of Object that matches the element passed in.

Arguments:
	obj - the Object to inspect.
	
Example:
	>var myString = 'hello';
	>$type(myString); //returns "string"

Returns:
	'element' - if o is a DOM element node
	'textnode' - if o is a DOM text node
	'whitespace' - if o is a DOM whitespace node
	'arguments' - if o is an arguments object
	'array' - if o is an object
	'object' - if o is an object
	'string' - if o is a string
	'number' - if o is a number
	'boolean' - if o is a boolean
	'function' - if o is a function
	'regexp' - if o is a regular expression
	'date' - if o is a Date
	'class' - if o is a Class. (created with new Class, or the extend of another class).
	'collection' - if o is a native htmlelements collection, such as childNodes, getElementsByTagName .. etc.
	null - if the object is not defined or none of the above.
*/

function $type(o){
	if (! $defined(o)) {return null;}
	if (o.htmlElement) {return 'element';}
	
	var type = typeof o;
	
	if (type == 'object' && o.nodeName) {
		switch (o.nodeType) {
			case 1: return 'element';
			case 3: return (/\S/).test(o.nodeValue) ? 'textnode' : 'whitespace';
		}
	}
	
	if (type == 'object' || type == 'function') {
		switch (o.constructor) {
			case Array: return 'array';
			case RegExp: return 'regexp';
			//case Class: return 'class'; not using the Class object
			case Date: return 'date';
			// add additional Object types that you care about here
		}
		
		if (typeof o.length == 'number') {
			if (o.item) {return 'collection';}
			if (o.callee) {return 'arguments';}
		}
	}
	
	return type;
};


/**
Function: isType
	Returns true if the Object has the same type as supplied.

Arguments:
	o - the Object to inspect.
	type - the String name for type
	
Returns:
	{boolean}
*/

function isType(o, type) {
	return type == $type(o);
}

YAHOO.lang.augmentObject(String.prototype, {

	/**
	 * Capitolize the first letter of every word; ucfirst, ensures that all non-first letters are lower-case
	 *
	 * @method capitalize
	 * @param ucfirst {boolean} OPTIONAL: when truthy, converts non-first letters to lower-case
	 * @return {string} the converted string
	 * @static
	 */
	capitalize: function(ucfirst) {
		var words = this.split(/\b/g),
			rs = [];

		Core.batch(words, function(w, i) {
			if (w.trim()) {
				rs[i] = w.charAt(0).toUpperCase() + (ucfirst? w.substring(1).toLowerCase(): w.substring(1));
			}
		});

		return rs.join(' ');
	},

		/**
		 * Checks if a string contains any of the strings in the arguement set
		 *
		 * @method contains
		 * @param argument {string} as many strings you want to test
		 * @return {boolean} true, if string contains any of the arguements
		 * @static
		 */
		contains: function() {
			var hasValue = false;
			var el = this.toString();
			Core.batch(arguments, function(arg) {
				hasValue = -1 < el.indexOf(arg); // terminates iteration if this becomes true
				return hasValue;
			});

			return hasValue;
		},

	/**
	 * Removes the rx pattern from the string
	 *
	 * @method remove
	 * @param rx {regex} a regex to find characters to remove
	 * @public
	 */
	remove: function(rx) {
		return this.replace(rx, '');
	},

	/**
	 * Remove all non-alpha characters;space ok
	 *
	 * @method stripNonAlpha
	 * @public
	 */
	stripNonAlpha: function() {
		return this.remove(/[^A-Za-z ]+/g);
	},

	/**
	 * Remove all non-alpha-numeric characters; space ok
	 *
	 * @method stripNonAlphaNumeric
	 * @public
	 */
	stripNonAlphaNumeric: function() {
		return this.remove(/[^A-Za-z0-9 ]+/g);
	},

	/**
	 * Removes non-numeric characters, except minus and decimal
	 *
	 * @method stripNonNumeric
	 * @public
	 */
	stripNonNumeric: function() {
		return this.remove(/[^0-9\-\.]/g);
	},

	/**
	 * Remove all characters that are 0-9
	 *
	 * @method stripNumeric
	 * @public
	 */
	stripNumeric: function() {
		return this.remove(/[0-9]/g);
	},

	/**
	 * HTML script tags from the string
	 *
	 * @method stripScripts
	 * @public
	 */
	stripScripts: function() {
		return this.remove(new RegExp("(?:)((\n|\r|.)*?)(?:<\/script>)", "img"));
	},

	/**
	 * HTML tags from the string
	 *
	 * @method stripTags
	 * @public
	 */
	stripTags: function() {
		return this.remove(/<\/?[^>]+>/gi);
	},

	/**
	 * Replaces the white spaces at the front and end of the string
	 * OPTIMIZED: http://blog.stevenlevithan.com/archives/faster-trim-javascript
	 *
	 * @method trim
	 * @public
	 */
	trim: function() {
		return this.remove(/^\s\s*/).remove(/\s\s*$/);
	}
});
