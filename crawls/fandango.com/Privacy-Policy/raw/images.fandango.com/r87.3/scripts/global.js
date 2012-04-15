var scriptPath = "";
var mdbTimer = 1;

/* script versions to use */
var jQsitePlugins = "siteplugins.js";
var jQhint        = "jquery.hint.pack.js";
var jQeasing      = "jquery.easing.pack.js";
var jQhoverIntent = "jquery.hoverIntent.js";
var jQCarousel    = "jquery.jcarousel.pack.js";
var jQsimpleModal = "jquery.simplemodal.js";
var jQglowbox     = "jquery.glowbox.js";
var jQlivequery   = "livequery.js";
var siteScripts   = "scripts.js";
var sitePrintable = "printable.js";
var siteLogonPopup= "logonpopup.js";
var siteFAJAX     = "fandangoajax.js";
var siteQuickRate = "quickRate.js";
var siteTooltip   = "tooltip.js";
var siteUIFloat   = "ui.floating_layer.js";
var currentLocationHref = location.href;

// check for jquery 
if (typeof jQuery != 'undefined') {
	$(document).ready(function() {
	    /* set scriptPath */
	    scriptPath = getScriptURL();
	    
	    /* add specificity */
	    addBrowserClass();
		
		/* lazy script loading */
		$.ajaxSetup({ cache: true }); // make sure loading from cache
		$.getScript(scriptPath + siteScripts); // pre-load scripts
		$.getScript(scriptPath + sitePrintable); // pre-load printable
	
		activateMovieJump();	
		
		/* global login prompt - checks for ssoReq class so that it can go on anything */
		ssoRequired();
		
		/* L1 - 2012-02-03 - Removing this so users don't get logged out of facebook when they log out
		of fandango.  This will come back though.  I assure you. :)		
		$("a.fblogout").click(function(e) {
			e.preventDefault();
			if (window.FB) {
				FB.logout(function(response){
					location.href = $("a.fblogout").attr("href");
				});
			}
		});*/
		
		if (window.FB) {
			$("fb\\:name, name").click(function() {
				$(this).find("a.fb_link").attr("target", "_blank");
			});
		}
		
		/* initialize movie detail box */
	    if ($("#movieDetailBox").length > 0) {
	        enableMovieDetailBox();        
	    }	
	    
	    /* enable input box hints */
	    enableInputHints();
	    
	        /* site popups */
	    $("a").filter(".popup").click(function() {
			this.blur();
			popWin(this.href);
			return false;
	    });
	    
	    /* remove onkeypress */
	    $("#header #search_control .input_search").removeAttr("onkeypress");
	    
	    var locationSearchValue = "";
	    var globalSearchValue = "";
	    
	    // this is a hack to internet explorer since it fires before keyup
	    $("#header #search_control .input_search").keydown(function(e) {
	    	var keyCode = e.which | e.keyCode;
	    	if (keyCode == 13) {
	    		return false;	
	    	}    	
	    });
	    
	    $("#header #search_control #location_search .input_search").keyup(function(e) {    	
	    	var keyCode = e.which | e.keyCode;
	    	if (keyCode == 13 && locationSearchValue != "") {
	    		e.preventDefault();
	    		if ($(this).val() == locationSearchValue) {    			
	    			$(this).siblings("input").click();
	    		}
	    		locationSearchValue = $(this).val();
	    	} else {
	    		locationSearchValue = $(this).val();
	    		return true;
	    	}
	    });
	    
	    $("#header #search_control #global_search .input_search").keyup(function(e) {
	    	var keyCode = e.which | e.keyCode;
	    	if (keyCode == 13 && globalSearchValue != "") {
	    		e.preventDefault();    		
	    		if ($(this).val() == globalSearchValue) {    			
	    			$(this).siblings("input").click();
	    		}
	    		globalSearchValue = $(this).val();
	    	} else {
	    		globalSearchValue = $(this).val();
	    		return true;
	    	}
	    });
	
	    //For Countdown Ticker
		//if the pages are not Purchase Process Pages and 
		// it's either TSP, MLP:showtimes, TLP, Profile: My Theaters Page then
		// clear all countdown ticker cookies
		if(currentLocationHref.indexOf("https") == -1 && (currentLocationHref.indexOf("movietimes") > -1 || currentLocationHref.indexOf("theaterpage") > -1 || currentLocationHref.indexOf("mode=MyTheaters") > -1))
		{
			createCookie("InitTimer","",-1);
			createCookie("CurrentTimer","",-1);
			createCookie("RedirectLoc","",-1);
		}
		
		// add tooltips for restricted theaters
		if ($('.restricted').length > 0) {
			$('.restricted').tooltip();	
		}
		
		// account for IE7 stupidity on movieguides
		$.fn.extend({
			hasClasses: function (selectors) {
				var self = this;
				for (i in selectors) {
					if ($(self).hasClass(selectors[i])) 
						return true;
				}
				return false;
			}
		});

		if ($("body").hasClasses(['movieguide', 'landing', 'msie7'])) {
			$(".detail img").click(function() {
				$(this).parent().click();				
			});
		}
		
		// handle all wss clicks
		$(".wss").on("click", function() {	
			var wssCodes = $(this).attr("data-wss");
			if (typeof wssCodes != 'undefined') {
				ReportToWss(wssCodes);
			}
		});		
	});
}

// enable input box hints 
function enableInputHints() {
	$('input[title!=""]').hint();
}

// search drop down functionality
function activateMovieJump() {	
	var offsetH = parseInt($("#drop_down_shadow .topwrap").css("height"));
	
	$("ul#cmd div.activate").hover(function() {			
		$("#expand").css("top","-1px").css("left","-1px");
		if (window.RefreshPulldownAd) { RefreshPulldownAd(); }
		$("#location_search_field input.input_search").blur();		
	},function() {		
		$("#expand").css("top","-9999px").css("left","-9999px");
	});
	
	// moving over empty area 
	$("#movieDropDownEmpty").mouseover(function() {
		$("#expand").css("top","-9999px").css("left","-9999px");
	});
}

function positionGenericPopup() {
	if ($(".generic_dialog").length > 0) {
		var parentTag = $(".generic_dialog").parent().get(0).tagName.toLowerCase();
		if (parentTag != "form") {
			$(".generic_dialog").appendTo("form:first");
		}
	
		var scrollTop = $(window).scrollTop();
		$(".generic_dialog").css("top", scrollTop+200);
		$(".generic_dialog").show();
	}	
}

function closeGenericPopup(thisEl) {
	if ($.browser.msie) {
		$(thisEl).hide(); // can add .empty() to destroy contents if ajax
	} else {
		$(thisEl).fadeOut(); // can add .empty() to destroy contents if ajax	
	}		
}

/* clear field value function: removes the default value onfocus, and adds back if nothing entered */
function fieldClear(obj, defaultSearchTxt) {
        if(obj.Val) {
	        if (obj.value == '') { 
		        obj.value = obj.Val;
		        obj.Val = null;
		        obj.first = null;
	        } 
	        else {
		        obj.Val = null;
	        }
        } else if (!obj.first) { 
	        obj.Val = obj.value;
	        //if defaultSearchTxt param is null or text is equal to defaultSearchText then remove default value
	        if((!defaultSearchTxt) || 
	           ((defaultSearchTxt) && (obj.value.toLowerCase() == defaultSearchTxt.toLowerCase())))
	        {
	            obj.value = ''; 
	        }
	        obj.first = 'true';
        }
}

// Returns the content originally written to the given divId via function WriteToContainer.
function GetOriginalContainerContent(divId)
{
	if (CONTAINER_CONTENTS != null && divId != null)
	{
		return CONTAINER_CONTENTS[divId];
	}
	
	return null;
}

// Refresh all of the ads on the page.
function RefreshAds()
{
	var divContentArray = [];
	var divIdArray = [];

	// Iterate through the elements that carry this class so we can
	// grab the current values of them and 
	$(".AdUnit").each(function(i)
	{
	    // Grab the content so we can manipulate it.
	    //
	    // First try grabbing from the original markup written to the container.
	    var divContent = (GetOriginalContainerContent == null ? null : GetOriginalContainerContent(this.id));
	    // If not found then grab the current markup.
	    if (divContent == null || divContent == "")
	    {
	    	divContent = $(this).html();
	    }
	    else
	    {
	    	//alert("Found original markup. " + this.id);
	    }
	    
	    divContent = ReplaceAdRandomNumber(divContent, GenerateRandomNumber());

	    // Check to make sure that the content has actually changed...just in case
	    // we picked up an item that has the "AdUnit" class but is not really an
	    // ad unit.
	    if (divContent != $(this).html())
	    {
	    	// 2008-05-30 jmock: Some ads misbehave and write outside of their container IFRAME.
	    	// When this happens the container DIV will have more than 1 child.
	    	// We have seen problems with refreshing this type of ad so we will skip these, 
	    	// for example, FireFox spikes the CPU, becomes unresponsive, and just hangs... very bad.
	    	if ($(this).children().length <= 1)
	    	{
			divIdArray[i] = this.id;
			divContentArray[i] = divContent;

			this.innerHTML = "";
		}
	    }
	});

	// Iterate through the ids that we have and write in the new iframe content
	for (i=0;i<divContentArray.length;i++)
	{
		try
		{
			if (divIdArray[i] != null && divContentArray[i] != null)
			{
				var elem = document.getElementById(divIdArray[i]);
				if (elem != null)
				{
					elem.innerHTML = divContentArray[i];
				}
			}
	    	}
	    	catch (e)
	    	{
	    	}
	}
}

// Locates the random ad unit number, i.e. "ord=" param value, from the given ad markup and replaces 
// it with the given alternate random number.
//
function ReplaceAdRandomNumber(adMarkup, altRandNum)
{
	if (adMarkup == null || altRandNum == null)
	{
		return adMarkup;
	}

	// Use RegEx to find and replace the random number param.
	var regExPattern = /(ord=)[^"'\?;]+(["'\?;])/gi;
	
	return adMarkup.replace(regExPattern, "$1" + altRandNum + "$2");
}

// Generate a random number used to replace the one in the ad
// to ensure that we will have a new ad.
function GenerateRandomNumber()
{
	var rnd = "0";
	var today = new Date();
	rnd += today.getHours();
	rnd += "0";
	rnd += today.getMinutes();
	rnd += today.getSeconds();
	rnd += rnd;

	return rnd;
}

// Parses out the WSS LID and LPOS from the given elem param and calls the WSS _hbLink function.
// This function parses the LID and LPOS from a WSS link name of the form "&lid=[LID]&lpos=[LPOS]"
// Param elem can be either a DOM element or a string. If a DOM element, the name attribute is 
// used as the WSS link name.
//
function ReportToWss(elem) {	
	if (elem != null)
	{
		var linkName = (elem + "");
	
		// Not a string so assume it's a DOM element.
		if (typeof(elem) != "string")
		{
			linkName = $(elem).attr("name");
		}
		
		// Parse the link name into an associative array.
		var nameValueArray = ToNameValueArray(linkName);
		if (nameValueArray != null)
		{
			var lid = nameValueArray["lid"];
			var lpos = nameValueArray["lpos"];
			
			if (lid != null && lid.length > 0)
			{
				if (lpos == null || lpos.length <= 0)
				{
					lpos = lid;
				}
				
				try
				{
					_hbLink(lid, lpos);
				}
				catch (e)
				{
				    // do nothing.
				}
			}
		}
	}
}

// Converts the given urlCommandStr to an associative array.
//
function ToNameValueArray(urlCommandStr)
{
	var nameValueArray = new Array();
	if (urlCommandStr != null && typeof(urlCommandStr) == "string")
	{
		var ampersandSplit = urlCommandStr.split("&");
		if (ampersandSplit != null && ampersandSplit.length > 0)
		{
			for (var i = 0; i < ampersandSplit.length; i ++)
			{
				var equalsSplit = ampersandSplit[i].split("=");
				
				if (equalsSplit != null && equalsSplit.length > 1)
				{
					nameValueArray[equalsSplit[0]] = equalsSplit[1];
				}
			}
		}
	}
	return nameValueArray;
}
    
/* Load javascript dynamically, or when the user runs a feature that requires a script. 
   if (myfunction) {  }
   else { $import('http://www.example.com/myfile.js'); }
*/
 
function $import(src) {
  var scriptElem = document.createElement('script');
  scriptElem.setAttribute('src',src);
  scriptElem.setAttribute('type','text/javascript');
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

// import with a random query parameter to avoid caching
function $importNoCache(src) {
  var ms = new Date().getTime().toString();
  var seed = "?" + ms; 
  $import(src + seed);
}  

/*
	parseUri 1.2.1
	(c) 2007 Steven Levithan <stevenlevithan.com>
	MIT License
*/
function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

/**
 * getScriptURL
 * - used to determine the base script path. uses global.js as the base 
 */
function getScriptURL() {
	var u = parseUri($("script[src$='global.js']").attr("src"));
	var v = '//' + u.host + ":" + u.port + u.directory;	
	return v;
}

/**
 * addBrowserClass
 * - dynamically inject browser type into body tag for css specificity 
 * - maybe implemented on the server side eventually 
 */
function addBrowserClass() {
	if ($.browser.safari) { $("body").addClass("safari"); }
	if ($.browser.msie && $.browser.version.substr(0,3)=="6.0") { $("body").addClass("msie6"); }
	if ($.browser.msie && $.browser.version.substr(0,3)=="7.0") { $("body").addClass("msie7"); }
	if ($.browser.msie && $.browser.version.substr(0,3)=="8.0") { $("body").addClass("msie8"); }
	if ($.browser.mozilla) { $("body").addClass("ff"); } 
	if ($.browser.mozilla && $.browser.version.substr(0,3)=="1.8") { $("body").addClass("ff2"); } 
	if ($.browser.mozilla && $.browser.version.substr(0,5)=="1.9.0") { $("body").addClass("ff3"); } 
	if ($.browser.mozilla && $.browser.version.substr(0,5)=="1.9.1") { $("body").addClass("ff35"); } 
	if ($.browser.mozilla && $.browser.version.substr(0,5)=="1.9.2") { $("body").addClass("ff36"); } 
	if ($.browser.mozilla && $.browser.version.substr(0,5)=="2.0") { $("body").addClass("ff4"); } 
	if ($.browser.opera) { $("body").addClass("opera");}
}

function popWin(url) {
	var w = 380;
	var h = 420;
	var centerW = (window.screen.width - w) / 2; 
	var centerH = (window.screen.height - h) / 2;
	var newWindow = window.open(url, 'Fandango', 'resizable=0,scrollbars=no,width=' + w + ',height=' + h + ',left=' + centerW + ',top=' + centerH);
	if (newWindow != null)
	{
		newWindow.focus();
	}
}
function defaultPopup(url, windowName) {
	var w = 990;
	var h = 560;
	var centerW = (window.screen.width - w) / 2; 
	var centerH = (window.screen.height - h) / 2;
	
	if (windowName == null)
	{
		windowName = 'Fandango';
	}
	
	var newWindow = window.open(url, windowName, 'resizable=yes,scrollbars=yes,width=' + w + ',height=' + h + ',left=' + centerW + ',top=' + centerH);
	if (newWindow != null)
	{
		newWindow.focus();
	}
}

function customPopup(url, windowName, width, height) {    
	var centerW = (window.screen.width - width) / 2; 
	var centerH = (window.screen.height - height) / 2;
	
	if (windowName == null)
	{
		windowName = 'Fandango';
	}
	
	var newWindow = window.open(url, windowName, 'resizable=yes,scrollbars=yes,width=' + width + ',height=' + height + ',left=' + centerW + ',top=' + centerH);
	if (newWindow != null)
	{
		newWindow.focus();
	}
}

function largePopup(url) {
    defaultPopup(url, 'PurchaseFooterPopup');
}


// Used by functions WriteToContainer and GetContainerContent as a map of "Container IDs" to "Container Contents".
var CONTAINER_CONTENTS = [];

// Function used by the ad unit control to write an iframe into a div
// Makes attempts to write to a container div a specified number of times if the div isn't immmediately avaiable
function WriteToContainer(divId, content, count)
{
    var divObj = document.getElementById(divId);
    var MAX_TRYS = 10;
    var TRY_INTERVAL = 500;
    
    if (count == null)
    {
        count = 0;
    }    
  
    if (divObj)
    {
        divObj.innerHTML = content;
        
        // 2008-05-30 jmock: Store the container contents into the associative array.
        if (CONTAINER_CONTENTS != null)
        {
            CONTAINER_CONTENTS[divId] = content;
        }
    }
    else
    {       
        //keep trying every 1/2 sec until it works, or until we reach the count limit
        if (count <= MAX_TRYS )
        {
            count++;
            
            //esc double quotes
            content = content.replace(/"/g,'\\"');
            window.setTimeout('WriteToContainer("' + divId + '","' + content + '",' + count + ');', TRY_INTERVAL);
        }
    }
}

/**
 * enableMovieDetailBox 
 * - handles the at home/in theaters landing pages rollover behavior
 */
function enableMovieDetailBox() {
	var hideDelay = 500;
	var hideDelayTimer = null; 
	var beingShown = false;
	var shown = false;
	var mdb = $("#movieDetailBox");
	var layerTitle = '';
	var hoveredTitle = ' ';
	$(mdb).appendTo("body"); // only needed if rendered within the page
	
	var config = {    
    	over: showBox, // function = onMouseOver callback (REQUIRED)    
    	timeout: 100, // number = milliseconds delay before onMouseOut    
    	out: hideBox // function = onMouseOut callback (REQUIRED)    
	};
	
	function showBox() {
		// determine what is hovered		
		if ($(this).attr("id") == "movieDetailBox") {						
			if (hideDelayTimer) clearTimeout(hideDelayTimer); // clear timer if present
			beingShown = false; 
			shown = true;						
		} else if ($(this).hasClass("image")) {			
			if (hoveredTitle != layerTitle) { // if the poster's title does not equal the layer's title				
				beingShown = false;
				shown = false; 										
			} else if ($("#movieDetailBox").css("display") == "none") { // if the titles match but the pop-up is not displayed 																												
					shown = false;			
					beingShown = false;			 				
			} 		
		}
		
		hoveredTitle = $(this).siblings(".title").children("a").text(); // get current hovered item 				
		layerTitle = mdb.children("div:has(h3)").children("h3").children("a").text(); // get current layer title										
		
		if (hideDelayTimer) clearTimeout(hideDelayTimer); // clear timer if present		
		
		if (shown || beingShown) {					
			return; // don't trigger the pop-up again
		} else {
			beingShown = true;
			populateMovieDetailPopup(this); // function to populate the data in the pop-up			   
	    	mdb.css("left","-9999em").show();  // temporarily show the item to get the height  	    	
	    	var mdbHeight = $("#movieDetailBoxContent").height(); //get height
	    	mdb.hide();
	    	var locOffset = $(this).offset();
	    	if ($('body').hasClass('theaters'))
	    	    mdb.css({ "opacity": 1, "left": locOffset.left - 20, "top": locOffset.top - mdbHeight-55 });
            else
	    	    mdb.css("left", locOffset.left-82).css("top", locOffset.top-mdbHeight);
	    	beingShown = false;
			
	    	if ($.browser.msie) { // since ie doesn't support opacity animation  	    		
	    		mdb.show(0, function() {
	    			beingShown = false;
					shown = true;
	    		});	   		
    		} else {
	    		mdb.fadeIn("fast", function() {
					beingShown = false;
					shown = true;				
				});	 		
	    	}
    		    							
		}
	}
	
	function hideBox() {
		if (hideDelayTimer) clearTimeout(hideDelayTimer);
		
		hideDelayTimer = setTimeout(function() {
			hideDelayTimer = null;
			//hoveredTitle = "";
			//layerTitle = "";									
			mdb.hide(0, function() { shown = false; });
		}, hideDelay);		
		return false;	
	}

	$("#movieDetailBox, .resultsList .film_info .image").hoverIntent(config);
	$("#movieDetailBox, .theaters .showtimes a.image").hoverIntent(config);
}

/**
 * populateMovieDetailPopup
 * - AJAX function to retrieve the info for the pop-up 
 */
function populateMovieDetailPopup(thisEl) {
	// placeholder to grab the textarea which holds the simulated returned markup
	var popDetails = $(thisEl).siblings("textarea").text(); // grab markup from hidden textarea
	$("#movieDetailBoxContent").html(popDetails); // populate the pop-up   	
	$("a").filter(".popup").click(function() {
		this.blur();
		popWin(this.href);
		return false;
    });
	// TBD AJAX load
	// $("#movieDetailBoxContent").load("movieDetailPopup.html");	
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if(results == null)
	return "";
	else
	return decodeURIComponent(results[1].replace(/\+/g, " "));
}

// For deleting cookies for Countdown Ticker 
function createCookie(name,value,mins,c_domain) {
	if (mins) {
		var date = new Date();
		date.setTime(date.getTime()+(mins*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+";path=/;domain="+c_domain;
}

// generic set a cookie function
function setCookie(name,val,expires,path,domain,secure) {
	// set time, it's in milliseconds
	var today = new Date();	
	today.setTime( today.getTime() );
	
	if (!path) {
		path = "/";
	}
	
	if (!domain) { 
		domain = "fandango.com"
	}
	
	if (expires) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date(today.getTime() + (expires));

	document.cookie = name + "=" +escape( val ) +
	( ( expires ) ? ";expires=" + expires_date.toUTCString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}

// this fixes an issue with the old method, ambiguous values
// with this test document.cookie.indexOf( name + "=" );
function getCookie(check_name) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

// this deletes the cookie when called
function deleteCookie(name, path, domain) {
	if (getCookie(name)) { document.cookie = name + "=" +
		( ( path ) ? ";path=" + path : "") +
		( ( domain ) ? ";domain=" + domain : "" ) +
		";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
}

var ssoReveal = function(thisEl){
	if ($("#ssoModal").length != 1) { $("body").append("<div id='ssoModal' class='reveal-modal smedium'><a class='close-reveal-modal'>&#215;</a></div>"); }
	$("#ssoModal .header").empty().remove(); // clear header just in case
	$("#ssoModal iframe").empty().remove();	
	var selectedAction = $(thisEl).attr("data-user-action");	
	var selectedIframe = $(thisEl).attr("data-sso-frame");
	
	if (selectedIframe == undefined) {
		selectedIframe = socialCfg.SSO_URL;
	}

	if (selectedAction != null) {
		$("<div class='header'>Please sign in to "+selectedAction+"</div>").prependTo("#ssoModal"); 
	}
	
	// change iframe href
	$("#ssoModal").append("<iframe frameBorder='0' scrolling='no' src='"+selectedIframe+"' />"); 
	$('#ssoModal').reveal({
		 animation: 'fadeAndPop',                   //fade, fadeAndPop, none
		 animationspeed: 300,                       //how fast animtions are
		 closeonbackgroundclick: true,              //if you click background will modal close?
		 dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
	});	
}; 

// global login prompt - checks for ssoReq class so that it can go on anything 
function ssoRequired() {	
	$(".ssoReq[data-sso-frame]").live("click",function(e) {		
		e.preventDefault();
				
		ssoReveal(this);			
	});
}

function externalModalClose() {
	$(".close-reveal-modal").click();
}
