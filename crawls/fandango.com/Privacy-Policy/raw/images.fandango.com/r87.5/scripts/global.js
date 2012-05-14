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

// location object
var FandangoGeoLoc = {
	"USER_AGENT": navigator.userAgent,
	"TEST_WIN": "",
	"TEST_SAFARI": "",
	"TEST_CHROME": "",		
	"IS_SAFARI_WIN": null,
	"ZIP_COOKIE": getCookie("zip"),
	"SEARCH_VALUE": getCookie("searchvalue"),
	"LATITUDE": "",
	"LONGITUDE":"",
	"ALLOWED_LIST": ['movietimes','moviesintheaters','moviescomingsoon','moviereleasedates','theaterpage'],
	"IS_ALLOWED" : false
};

// check for jquery 
if (typeof jQuery !== 'undefined') {
	$(document).ready(function() {
	    // set scriptPath 
	    scriptPath = getScriptURL();
	    
		// add specificity 
	    addBrowserClass();
		
		// does user have location set?		
		$.each(FandangoGeoLoc.ALLOWED_LIST, function(index, value) { 			
			if (location.href.toLowerCase().indexOf(value) >= 0) {
				FandangoGeoLoc.IS_ALLOWED = true;
			} 			
		});
		if (FandangoGeoLoc.IS_ALLOWED) {
			setUserLocation();
		}		
		
		// lazy script loading 
		$.ajaxSetup({ cache: true }); // make sure loading from cache
		$.getScript(scriptPath + siteScripts); // pre-load scripts
		$.getScript(scriptPath + sitePrintable); // pre-load printable
	
		activateMovieJump();	
		
		// global login prompt - checks for ssoReq class so that it can go on anything 
		ssoRequired();
		
		if (window.FB) {
			$("fb\\:name, name").click(function() {
				$(this).find("a.fb_link").attr("target", "_blank");
			});
		}
		
		// initialize movie detail box 
	    if ($("#movieDetailBox").length > 0) {
	        enableMovieDetailBox();        
	    }	
	    
	    // enable input box hints 
	    enableInputHints();
	    
	    // site popups 
	    $("a").filter(".popup").click(function() {
			this.blur();
			popWin(this.href);
			return false;
	    });
	    
	    // remove onkeypress
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
		$(document).on("click",".wss",function() {	
			var wssCodes = $(this).attr("data-wss");
			if (typeof wssCodes != 'undefined') {
				ReportToWss(wssCodes);
			}
		});		
	});
}

/**  
 * Enable hints on inputs and textareas.
 */
function enableInputHints() {
	$("input[title!=''],textarea[title!='']").hint();
}

/**  
 * Enable movie drop down functionality. 
 */
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

/**  
 * Position generic pop-ups. ??
 */
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

/**  
 * Close generic pop-ups. ??
 * 
 * @param {elem} thisEl This is the element that should be hidden.
 */
function closeGenericPopup(thisEl) {
	if ($.browser.msie) {
		$(thisEl).hide(); // can add .empty() to destroy contents if ajax
	} else {
		$(thisEl).fadeOut(); // can add .empty() to destroy contents if ajax	
	}		
}

/**  
 * Clear field value function: removes the default value onfocus, and adds back if nothing entered.
 *
 * @param {object} obj This is the object that should have the behavior.
 * @param {string} defaultSearchTxt This is the default string that should appear.
 */
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

/**  
 * Returns the content originally written to the given divId via function WriteToContainer.
 *
 * @param {string} divId This is the id of the container.
 */
function GetOriginalContainerContent(divId) {
	if (CONTAINER_CONTENTS != null && divId != null)
	{
		return CONTAINER_CONTENTS[divId];
	}
	
	return null;
}

/**  
 * Refresh all advertisments on a page.
 */
function RefreshAds() {
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

/**  
 * Locates the random ad unit number, i.e. "ord=" param value, from the given ad markup and replaces it with the given alternate random number.
 *
 * @param {string} adMarkup This is ad markup.
 * @param {number} altRandNum This is a random number.
 * @return {string} This is adMarkup.
 */
function ReplaceAdRandomNumber(adMarkup, altRandNum) {
	if (adMarkup == null || altRandNum == null)	{
		return adMarkup;
	}

	// Use RegEx to find and replace the random number param.
	var regExPattern = /(ord=)[^"'\?;]+(["'\?;])/gi;
	
	return adMarkup.replace(regExPattern, "$1" + altRandNum + "$2");
}

/**  
 * Generate a random number used to replace the one in the ad to ensure that we will have a new ad.
 *
 * @return {number} Random number returned.
 */
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

/**  
 * Parses out the WSS LID and LPOS from the given elem param and calls the WSS _hbLink function. This function parses the LID and LPOS from a WSS link name of the form "&lid=[LID]&lpos=[LPOS]"
 *
 * @param {object} elem This is a either a DOM element or a string. If a DOM element, the name attribute is used as the WSS link name.
 */
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

/**  
 * Converts the given urlCommandStr to an associative array.
 *
 * @param {string} urlCommandStr This is the url command string.
 * @return This is the associative array.
 */
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
    
/**
 * Determine and return a protocol agnostic base script path. Uses global.js as the base. 
 *
 * @return {string} This is the base url. 
 */
function getScriptURL() {
	var u = parseUri($("script[src$='global.js']").attr("src"));
	var v = '//' + u.host + ":" + u.port + u.directory;	
	return v;
}

/**
 * Dynamically inject browser type into body tag for css specificity. Deprecate soon since we have Modernizr.
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

/**
 * Create a centered generic 380x420 sized pop-up window.
 *
 * @param {string} url This is a url to load into the pop-up window.
 */
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

/**
 * Create a centered custom-named 990x560 sized pop-up window.
 *
 * @param {string} url This is a url to load into the pop-up window.
 * @param {string} opt_windowName This is the specific name of the window. Defaults to 'Fandango' if null.
 */
function defaultPopup(url, opt_windowName) {
	var w = 990;
	var h = 560;
	var centerW = (window.screen.width - w) / 2; 
	var centerH = (window.screen.height - h) / 2;
	
	if (opt_windowName == null)
	{
		opt_windowName = 'Fandango';
	}
	
	var newWindow = window.open(url, opt_windowName, 'resizable=yes,scrollbars=yes,width=' + w + ',height=' + h + ',left=' + centerW + ',top=' + centerH);
	if (newWindow != null)
	{
		newWindow.focus();
	}
}

/**
 * Create a centered custom-named and/or custom-sized pop-up window.
 *
 * @param {string} url This is a url to load into the pop-up window.
 * @param {string} opt_windowName This is the specific name of the window. Defaults to 'Fandango' if null.
 * @param {number} width This is the width of the pop-up.
 * @param {number} height This is the height of the pop-up.
 */
function customPopup(url, opt_windowName, width, height) {    
	var centerW = (window.screen.width - width) / 2; 
	var centerH = (window.screen.height - height) / 2;
	
	if (opt_windowName == null)
	{
		opt_windowName = 'Fandango';
	}
	
	var newWindow = window.open(url, opt_windowName, 'resizable=yes,scrollbars=yes,width=' + width + ',height=' + height + ',left=' + centerW + ',top=' + centerH);
	if (newWindow != null)
	{
		newWindow.focus();
	}
}

/**
 * Create a "large" (default-sized) pop-up window named "PurchaseFooterPopup". Why does this exist?!
 *
 * @param {string} url This is a url to load into the pop-up window.
 */
function largePopup(url) {
    defaultPopup(url, 'PurchaseFooterPopup');
}

// Used by functions WriteToContainer and GetContainerContent as a map of "Container IDs" to "Container Contents".
var CONTAINER_CONTENTS = [];

/**
 * Function used by the ad unit control to write an iframe into a div.
 * Makes attempts to write to a container div a specified number of times if the div isn't immmediately avaiable.
 *
 * @param {string} divId This is the id of the container we wish to write into.
 * @param {string} content This is the content that is passed into the container.
 * @param {number} opt_count This is a specific counter to start at.
 */
function WriteToContainer(divId, content, opt_count)
{
    var divObj = document.getElementById(divId);
    var MAX_TRYS = 10;
    var TRY_INTERVAL = 500;
    
    if (opt_count == null)
    {
        opt_count = 0;
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
        if (opt_count <= MAX_TRYS )
        {
            opt_count++;
            
            //esc double quotes
            content = content.replace(/"/g,'\\"');
            window.setTimeout('WriteToContainer("' + divId + '","' + content + '",' + opt_count + ');', TRY_INTERVAL);
        }
    }
}

/**
 * Enable rollover behavior for the Browse movies landing pages.
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
			if ($('#container').hasClass('on-my_movies'))
			{
				 mdb.css("left", locOffset.left - 62).css("top", locOffset.top-mdbHeight);
			}
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
 * AJAX function to retrieve the info for the pop-up. It looks for the hidden sibling textarea which contains the markup to load into the movie pop-up.
 *
 * @param {elem} thisEl This is the element that spawns the event.
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

/**  
 * Returns a specific querystring parameter for a given URL. Defaults to "window.location.href" if no URL set.
 *
 * @param {string} name This is name of the querystring parameter we want.
 * @param {string} opt_url This is a specified URL.
 * @return {string || number} This returns the parameter or 0 (no results).
 */
var urlParam = function(name,opt_url){
    if (theURL === ("" || null || undefined)) {
        theURL = window.location.href;
    } 
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(opt_url);
    if (!results) { 
        return 0; 
    }
    return results[1] || 0;
}

/**  
 * Returns a specific querystring parameter for the current window URL.
 *
 * @param {string} name This is name of the querystring parameter we want.
 * @return {string || number} This returns the parameter or "" (no results).
 */
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

/**  
 * Generic function to set a cookie.  
 *
 * @param {string} name This is the name of the cookie
 * @param {string} val
 * @param {string} expires
 * @param {string} path This is a specified cookie path. Defaults to root "/"
 * @param {string} domain This is the cookie domain. Defaults to fandango.com
 * @param {string} secure
 */
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

/**  
 * Generic function to get a cookie.  
 *
 * @param {string} name This is the name of the cookie to retrieve
 */
function getCookie(name) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ ) {
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );

		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == name )
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

/**  
 * Generic function to delete a cookie.  
 *
 * @param {string} name This is the name of the cookie to retrieve.
 * @param {string} path This is the specific path of the cookie.
 * @param {string} domain This is the domain the cookie belongs to.
 */
function deleteCookie(name, path, domain) {
	if (getCookie(name)) { document.cookie = name + "=" +
		( ( path ) ? ";path=" + path : "") +
		( ( domain ) ? ";domain=" + domain : "" ) +
		";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
}

/**  
 * Enable the Single Sign-On modal   
 *
 * @param {elem} thisEl This is element that triggered the event. Used to retrieve data-attributes.
 * @param {boolean} opt_fbOnly This determines if we should load the specially sized FB only modal.
 */
var ssoReveal = function(thisEl, opt_fbOnly){	
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
	fbAttribute = "";
	if(opt_fbOnly)
	{
		fbAttribute = "fb-only = 'true'";
	}
	// change iframe href
	$("#ssoModal").append("<iframe frameBorder='0' scrolling='no' " + fbAttribute + " src='"+selectedIframe+"' />"); 

	$('#ssoModal').reveal({
		 animation: 'fadeAndPop',                   //fade, fadeAndPop, none
		 animationspeed: 300,                       //how fast animtions are
		 closeonbackgroundclick: true,              //if you click background will modal close?
		 dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
	});	
	if(opt_fbOnly)
	{
		$("#ssoModal iframe").css("min-height", "90px");	
		$("#ssoModal iframe").css("height", "90px");
	}
}; 

/**  
 * Checks to see if the ssoReq class exists (with data-sso-frame attribute) then enables SSO functionality.
 */
function ssoRequired() {	
	$(".ssoReq[data-sso-frame]").live("click",function(e) {	
		e.preventDefault();
		fbOnly = false;
        if($(this).attr("fb-only") == "true")
		{
			fbOnly = true;
			
		}
		ssoReveal(this, fbOnly);			
	});
}

/**  
 * Generic function to close any reveal modal.
 */
function externalModalClose() {
	$(".close-reveal-modal").click();
}

// Geolocation
FandangoGeoLoc.TEST_WIN = /Windows/.test(FandangoGeoLoc.USER_AGENT); 
FandangoGeoLoc.TEST_SAFARI = /Safari/.test(FandangoGeoLoc.USER_AGENT); 
FandangoGeoLoc.TEST_CHROME = /Chrome/.test(FandangoGeoLoc.USER_AGENT); 
// Check for Safari Win until Safari bug fixed
if (FandangoGeoLoc.TEST_WIN === true && FandangoGeoLoc.TEST_SAFARI === true && FandangoGeoLoc.TEST_CHROME === false) {
	FandangoGeoLoc.IS_SAFARI_WIN = true;
} else {
	FandangoGeoLoc.IS_SAFARI_WIN = false;
}

/**  
 * Check to see if a user has a location (searchvalue) set. 
 * If true then do nothing. 
 * If false then geolocate the user, set a cookie, and populate the global location search box.
 */
var setUserLocation = function() {	
	if (FandangoGeoLoc.SEARCH_VALUE === null) {		
		if (Modernizr.geolocation && FandangoGeoLoc.IS_SAFARI_WIN === false) {						
			locate();
		} else { 						
			$.getScript(scriptPath+"js-webshim/minified/polyfiller.js", function(){								
				$.webshims.setOptions({
					basePath: scriptPath+"js-webshim/minified/shims/",
					waitReady: false
				});
				$.webshims.polyfill('geolocation');	
				$(function() {
					$.webshims.ready('geolocation', function() {						
						locate();
					});
				});
								
			});			
		}
	} else {
		populateGlobalLocation(FandangoGeoLoc.SEARCH_VALUE); // You got cookie cookie!		
	}
	
	/**  
	 * Return messaging if there is a problem returning a location.
	 * 
	 * @param {error} e This is the error returned.
	 */
	function errorHandler(e) {
		if (e === 1) { // PERMISSION_DENIED
			if (window.console) window.console.log('Cannot find your location. Permission Denied.');				
		} else if (e === 2) { //POSITION_UNAVAILABLE
			if (window.console) window.console.log('Cannot find your location. Position Unavailable.');				
		} else if (e === 3) { //TIMEOUT
			if (window.console) window.console.log('Cannot find your location. Timed out.');				
		}
	}
	
	function locate() {	
		$(document).ready(function() {
			navigator.geolocation.getCurrentPosition(function (position) {
				var coordinates = position.coords;																			
				theLat = coordinates.latitude;
				theLong = coordinates.longitude;
				FandangoGeoLoc.LATITUDE = coordinates.latitude;
				FandangoGeoLoc.LONGITUDE = coordinates.longitude;
				if (typeof google === 'object' && typeof google.maps === 'object')  {
					geocodeZip();
				} else {
					loadGMaps();
				}				
			}, errorHandler, {timeout:10000});				
		});
	}
	
	// take position and get some zip
	function loadGMaps() {
		// return zip		
		function loadScript() {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=geocodeZip";
			document.body.appendChild(script);			
		}
		loadScript();
	}		
};

/**  
 * Return and set a zipcode cookie based on latitude and longitude  
 */
function geocodeZip() {
	var geocoder;
	var latlng = new google.maps.LatLng(FandangoGeoLoc.LATITUDE,FandangoGeoLoc.LONGITUDE);
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( {'latLng': latlng}, function(results, status) {			
		if (status == google.maps.GeocoderStatus.OK) {				
			var address = results[0].address_components;
			var zipcode = address[address.length - 1].long_name;
			FandangoGeoLoc.ZIP_COOKIE = zipcode;			
			setCookie("zip",zipcode,1000);			
			setCookie("searchvalue",zipcode,1000);	
			// update input box
			populateGlobalLocation(zipcode);	
			$(document).notification({
				title: "We think you're near ZIP Code "+getCookie("searchvalue"),
				text: "If that's not correct, change it at the top of the page."					
			});
		}
	});
}

/**  
 * Populate the global location box  
 *
 * @param {string} zipcode This value will be placed into the global location search input.
 * @see $("#location_search .input_search")
 */
function populateGlobalLocation(zipcode) {
	$("#location_search .input_search").val(zipcode);	
}
  

/**  
 * Parses URI  
 *
 * @author (c) 2007 Steven Levithan <stevenlevithan.com>
 * @param {string} zipcode This value will be placed into the global location search input.
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
