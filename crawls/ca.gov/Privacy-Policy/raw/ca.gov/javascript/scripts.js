/*

*/


// addLoadEvent by Simon Willison
// Adds a handler to an event without over-riding other handlers
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

/* http://www.dustindiaz.com/getelementsbyclass/ */
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var counterC = 0;
var navRoot;

initNavigation = function() {

	var useNavFolderMatch = true; // Use new folder matching method to highlight the current navigation tab?
	var disableNavFade = false; // Disable navigation fade effects?
	var ignoreNavMouseover = false;
	setTimeout(function(){ignoreNavMouseover = false;},500); // Prevent nav from opening on page load if mouse is already positioned over nav
	navRoot = document.getElementById("nav_list");

	// Touchscreens - If user taps outside of nav, close nav panels
	if (Modernizr.touch){
		document.body.addEventListener('touchstart', function(ev) {
			navRoot.className = "";
			closeAllPanels();
		}, false);
	}
	
	if (document.querySelectorAll) { // Does the browser support the querySelectorAll method?

		var arrCurrentURL=location.href.split("/");

		arrayNavLI = document.querySelectorAll("#nav_list > li");

		var reMainNav = "";
		if (typeof defaultMainList!="undefined")
			reMainNav = new RegExp("^" + defaultMainList + "$", "i"); // Regex for finding the index of the default main list item
		
		var navItemWidths = new Array();
		var navTotalWidth = 0;

		for (var i=0; i<arrayNavLI.length; i++) { // Loop over main list items
			var node = arrayNavLI[i];

			////// Highlight the default main nav item //////
			if (reMainNav) {
				if (node.firstChild.innerHTML.match(reMainNav)) { // Found default main nav item
					node.className += " highlighted_nav_item"; // add class to this li
				}
			} else if (useNavFolderMatch && node.childNodes[0] && node.childNodes[0].href) {
				arrNavLink = node.childNodes[0].href.split("/");
				if ((arrNavLink.length > 4) && (arrCurrentURL[3] == arrNavLink[3])) { // folder of current URL matches this nav link
					node.className += " highlighted_nav_item"; // add class to this li
				}
			}

			// Insert new span container to find nav widths
			levelOneLink = node.querySelector(".nav_level1_link");
			newSpanNode = document.createElement('span');
			newSpanNode.className = "find_width";
			tempContent = levelOneLink.innerHTML;
			levelOneLink.innerHTML = "";
			newSpanNode.innerHTML = tempContent;
			levelOneLink.appendChild(newSpanNode);
			//alert(node.querySelector(".find_width").offsetWidth);
			navItemWidths[i] = node.querySelector(".find_width").offsetWidth;
			navTotalWidth += navItemWidths[i];


			if (Modernizr.touch) {
				if (node.querySelector(".nav_panel")) {
					node.querySelector(".nav_level1_link").level1Link = node.querySelector(".nav_level1_link").href;
					node.querySelector(".nav_level1_link").removeAttribute("href");

					node.addEventListener('touchstart', function(ev) {
						// keeps tabpanel from closing when clicking inside of it
						ev.stopPropagation();
					},false);
				}


				node.querySelector(".nav_level1_link").addEventListener('touchstart', function(ev) {
					ev.stopPropagation();
					counterC++;

					//alert(this.querySelector(".nav_panel").className);
					var navigPanel = this.parentNode.querySelector(".nav_panel");

					if (navigPanel && navigPanel.className.match(/mo_display/)) {// is panel already open

						window.location = this.level1Link;
	
					} else {

						closeAllPanels(); // hide all other panels
						
						// show panel
						navRoot.className = "unhighlight_nav_item";
		
						if (!ignoreNavMouseover && navigPanel) { // does this nav item have a navpanel?
							if (!disableNavFade) {
								if (navigPanel.outTimerID) // are we fading after a mouseout?
									clearTimeout(navigPanel.outTimerID); // cancel it
								
								navigPanel.className += " mo_display";
								navigPanel.overOTimerID = setTimeout(function(){navigPanel.className += " mo_opacity";},10);
								
							} else {
								navigPanel.style.display = "block";
							}
						}
	
					}
				},false);

			} else {

				////// Apply onmouseover and onmouseout event handlers to each main list item //////
				node.onmouseover = function(e) {
					if (!e) var e = window.event;
	
					var reltg = (e.relatedTarget) ? e.relatedTarget : e.fromElement;
					while (reltg && reltg != this && reltg.nodeName != 'BODY')
						reltg = reltg.parentNode;
					if (reltg == this) return; // mouse was already inside li
					
					navRoot.className = "unhighlight_nav_item";
	
					var arrayNavPanel = getElementsByClass("nav_panel", this);
					if (!ignoreNavMouseover && (arrayNavPanel.length == 1)) { // does this nav item have a navpanel?
						if (!disableNavFade) {
							if (arrayNavPanel[0].outTimerID) // are we fading after a mouseout?
								clearTimeout(arrayNavPanel[0].outTimerID); // cancel it
	
							arrayNavPanel[0].overDTimerID = setTimeout(function(){arrayNavPanel[0].className += " mo_display";},100);
							arrayNavPanel[0].overOTimerID = setTimeout(function(){arrayNavPanel[0].className += " mo_opacity";},120);
							
						} else {
							arrayNavPanel[0].style.display = "block";
						}
					}
				}
				node.onmouseout = function(e) {
	
					if (!e) var e = window.event;
	
					// We're not sure if the mouse left the layer or entered a link within the layer.
					// Therefore we're going to check the relatedTarget/toElement of the event, ie. the element the mouse moved to.
					var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
	
					//We read out this element, and then we're going to move upwards through the DOM tree
					//until we either encounter the target of the event (ie. the LI), or the body element.
					//If we encounter the target the mouse moves towards a child element of the layer,
					//so the mouse has not actually left the layer. We stop the function.
					while (reltg && reltg != this && reltg.nodeName != 'BODY')
						reltg = reltg.parentNode;
					if (reltg == this) return; // mouse is still inside li
	
					navRoot.className = "";
	
					var arrayNavPanel = getElementsByClass("nav_panel", this);
					if (arrayNavPanel.length == 1) {
						if (!disableNavFade) {
							if (arrayNavPanel[0].overDTimerID) // pausing for a mouseover? cancel it.
								clearTimeout(arrayNavPanel[0].overDTimerID);
							if (arrayNavPanel[0].overOTimerID)
								clearTimeout(arrayNavPanel[0].overOTimerID);
	
							arrayNavPanel[0].outTimerID = setTimeout(function(){arrayNavPanel[0].className = arrayNavPanel[0].className.replace(/mo_display/g, "");},300);
							arrayNavPanel[0].className = arrayNavPanel[0].className.replace(/mo_opacity/g, "");
													
						} else {
							arrayNavPanel[0].style.display = "none";
						}
					}
				}
			}

		}

		// Calculate widths of each main nav item and insert stylesheet
		var dynStylesheet = document.createElement('style');
		dynStylesheet.type="text/css";
		dynStylesheet.media="only screen and (min-width: 600px)";
		var dynSSRules = "";

		tallyPreviousWidths = 0;
		for (var i=0; i<arrayNavLI.length; i++) { // Loop over main list items
			node = arrayNavLI[i];
			//node.style.width = (navItemWidths[i] / navTotalWidth) * 100 + "%";

			dynSSRules += " #nav_list > li:nth-child(" + (i+1) + ") {width:" + (navItemWidths[i] / navTotalWidth * 100) + "%}";

			// Add down-arrow image
			nodeNavPanel = node.querySelector(".nav_panel");
			if (nodeNavPanel) {
				newDivNode = document.createElement('div');
				newDivNode.setAttribute('class','nav_d_arrow_container');
				newDivNode.setAttribute('style','left:' + ((tallyPreviousWidths + navItemWidths[i]/2) / navTotalWidth * 100) + '%');
				nodeNavPanel.appendChild(newDivNode);
			}
			tallyPreviousWidths += navItemWidths[i];

		}
		document.getElementsByTagName('head')[0].appendChild(dynStylesheet);
		if (dynStylesheet.styleSheet) { // IE
			dynStylesheet.styleSheet.cssText = dynSSRules;
		} else { // proper browsers
			var dynSSTextNode = document.createTextNode(dynSSRules);
			dynStylesheet.appendChild(dynSSTextNode);
		}

	}

}

function closeAllPanels() {
	var arrayPanel = document.getElementById("nav_list").querySelectorAll(".mo_display, .mo_opacity");
	for (var counterA = 0; counterA < arrayPanel.length; counterA++) {
		arrayPanel[counterA].className = arrayPanel[counterA].className.replace(/mo_opacity/g, "");
		//arrayPanel[counterA].outTimerID = setTimeout(function(){arrayPanel[counterA].className = arrayPanel[counterA].className.replace(/mo_display/g, "");},200);
		arrayPanel[counterA].outTimerID = setTimeout(removeDisplay,200,arrayPanel[counterA]);
	}
}
function removeDisplay(obj) {
	obj.className = obj.className.replace(/mo_display/g, "");
}


// Set header background photo, depending on time of day
function headerPhoto() {
	var currentDate = new Date();
	var currentHour = currentDate.getHours();
	//currentHour = 15;

	var datSunrise = 3;
	var datDay = 9;
	var datSunset = 15;
	var datNight = 21;
	
	if (currentHour >= datSunrise && currentHour < datDay) {
		styleBG = "#000 url(/images/template2012/header_sunrise_hiker.jpg) no-repeat 50% 30%";
		styleHomeBGPos = "40% 40%";
	} else if (currentHour >= datDay && currentHour < datSunset) {
		styleBG = "#000 url(/images/template2012/header_day_yosemite.jpg) no-repeat 40% 40%";
		styleHomeBGPos = "40% 40%";
	} else if (currentHour >= datSunset && currentHour < datNight) {
		styleBG = "#000 url(/images/template2012/header_sunset_pigeon_point.jpg) no-repeat 50% 40%";
		styleHomeBGPos = "70% 20%";
	} else {
		styleBG = "#000 url(/images/template2012/header_night_indian_cove.jpg) no-repeat 50% 35%";
		styleHomeBGPos = "70% 20%";
	}

	var headerTags = document.getElementsByTagName("header");
	if (headerTags) {
		headerTags[0].style.background = styleBG;
		headerTags[0].style.backgroundSize = "cover";
		if (getElementsByClass("home").length) {
			headerTags[0].style.backgroundPosition = styleHomeBGPos;
		}
	}
}


var CAGOVLocation = {
	xml_location_feed_path: "/geolocation/location_get_details.asp", // path to the xml feed
	objLocation: new Object(),
	
	tempLat: 0,
	tempLng: 0,
	tempInputType: null,
	tempXMLLocation: null,
	xml_params: null,
	locationCookieExpiration: "",

	initLocation:function() {

		// content for the popup
		document.getElementById("loc_container").innerHTML='\n'
			+ '		<div class="loc_close loc_clickable" onclick="CAGOVLocation.closePopup()"><img src="/images/geolocation/close_button.png" alt="close" /></div>\n'
			+ '		<div><h1>Set Your Location</h1></div>\n'
			+ '		<div><h2>You only have to submit it once. We can save it.</h2></div>\n'
			+ '		<div class="loc_addspace">Please submit your location so we can provide you with relevant information.</div>\n'
			+ '		<div id="loc_cont_geo_result" class="loc_addspace">Attempting geolocation <img class="loc_setlocationbutton" src="/images/geolocation/loading.gif" alt="" /></div>\n'
			+ '		<div class="loc_addspace">\n'
			+ '			<form action="#" onsubmit="return CAGOVLocation.submitZip()">\n'
			+ '				<div>Enter your zip code: <input type="text" name="zip" id="loc_input_zip" size="8" /><span> <input class="loc_setlocationbutton" type="image" src="/images/geolocation/set_location.png" alt="Set Location" /></span></div>\n'
			+ '			</form>\n'
			+ '		</div>\n'
			+ '		<div>\n'
			+ '			<form action="#">\n'
			+ '				<div><input type="checkbox" name="remember" id="loc_input_remember" checked="checked" onchange="CAGOVLocation.changeExpiration()" /> Remember my location</div>\n'
			+ '			</form>\n'
			+ '		</div>\n';

		// read cookies
		this.objLocation.cty = getCookie("location_cty");
		this.objLocation.lat = getCookie("location_lat");
		this.objLocation.lng = getCookie("location_lng");
		this.objLocation.zip = getCookie("location_zip");
		
		// if any location data is missing, use Sacramento as default
		if (!this.objLocation.cty || !this.objLocation.zip || !this.objLocation.lat || !this.objLocation.lng) {
			this.objLocation.cty = "Sacramento";
			this.objLocation.zip = "95814";
			this.objLocation.lat = "38.581667";
			this.objLocation.lng = "-121.495908";
		}
		this.changeExpiration(); // set cookie expiration date
	},

	setLocation:function() {
		// display popup
		document.getElementById("loc_container").style.display = "block";
		// try using geolocation
		this.getGeoloc();
	},
	
	getGeoloc:function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					// there is a 5 second delay on desktop Firefox before getting to this point, due to getCurrentPosition
					CAGOVLocation.tempLat = position.coords.latitude;
					CAGOVLocation.tempLng = position.coords.longitude;
					CAGOVLocation.getCity();
				},
				function(error) {
					/*
					switch(error.code) 
					{
						case error.TIMEOUT:
							alert ('Timeout');
							break;
						case error.POSITION_UNAVAILABLE:
							alert ('Position unavailable');
							break;
						case error.PERMISSION_DENIED:
							alert ('Permission denied');
							break;
						case error.UNKNOWN_ERROR:
							alert ('Unknown error');
							break;
					}
					*/
					this.geolocFailed();
				}
			);
		} else {
			// browser does not support geolocation
			this.geolocFailed();
		}
	
	},
	
	getCity:function() {
		this.xml_params = "?lat=" + this.tempLat + "&lng=" + this.tempLng;
		this.tempInputType = "geo";
		this.getXML();
	},
	
	geolocFailed:function() {
		document.getElementById("loc_cont_geo_result").innerHTML="Geolocation failed.";
	},
	
	closePopup:function() {
		document.getElementById("loc_container").style.display = "none";
	},
	
	//use XMLHttpRequest to get the raw xml
	getXML:function() {
		if (document.getElementById) { // Make sure browser supports getElementById

			//call the right constructor for the browser being used
			var xhr = false;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					try {
						xhr = new ActiveXObject("Microsoft.XMLHTTP");
					} catch(e) {
						// not supported
						return false;
					}
				}
			} else {
				// not supported
				return false;
			}
	
			//prepare the xmlhttprequest object
			xhr.open("GET",this.xml_location_feed_path + this.xml_params,true);
			//xhr.setRequestHeader("Cache-Control", "no-cache"); // get a fresh copy from the server
			//xhr.setRequestHeader("Pragma", "no-cache"); // for backward compatibility
	
			// This function runs when the readyState property of the XHR object changes
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) // indicates that the response is available
				{
					if (xhr.status == 200 || xhr.status == 304) // we received a successful response
					{
						if (xhr.responseText != null) { // make sure we didn't get an empty response
							CAGOVLocation.tempXMLLocation = xhr.responseXML;
							CAGOVLocation.processXML();
						}
					}
				}
			}
	
			//send the request
			xhr.send(null);
		}
	},
	
	//process the received xml
	processXML:function() {
		var objTempLocation = new this.XML2Object();
		//document.domain = "ca.gov";
		//alert(objTempLocation.cty);
		if (!objTempLocation.cty || objTempLocation.error > 0) {
			this.closePopup();
		} else {
			this.objLocation = objTempLocation;
			//alert(this.objLocation.cty);
			if (this.tempInputType=="zip") {
				// save cookies & close popup
				this.saveGeo();
			} else {
				// used geolocation
				document.getElementById("loc_cont_geo_result").innerHTML="You appear to be located in: " + this.objLocation.cty + " <span onclick='CAGOVLocation.saveGeo()'><img class='loc_setlocationbutton' src='/images/geolocation/set_location.png' alt='Set Location' /></span>";
			}
		}
	},
	
	XML2Object:function() {
		var chanElement = CAGOVLocation.tempXMLLocation.getElementsByTagName("location")[0]; // location element
		// now set all of the object properties that take simple strings as their values
		var properties = new Array("lat", "lng", "zip", "cty", "error");
		var tmpElement = null;
		for (var i = 0; i < properties.length; i++) {
			tmpElement = chanElement.getElementsByTagName(properties[i])[0];
			if (tmpElement != null)
				eval("this." + properties[i] + "=tmpElement.getAttribute('data')");
		}
		//alert(this.cty);
	},
	
	submitZip:function() {
		frmZip = document.getElementById("loc_input_zip").value;
		if (frmZip) {
			this.xml_params = "?zip=" + frmZip;
			this.tempInputType = "zip";
			this.getXML();
		}
		return false;
	},
	
	saveGeo:function() {
		// save cookies
		document.cookie = "location_cty=" + escape(this.objLocation.cty) + ";expires=" + this.locationCookieExpiration + ";path=/;domain=ca.gov";
		document.cookie = "location_lat=" + this.objLocation.lat + ";expires=" + this.locationCookieExpiration + ";path=/;domain=ca.gov";
		document.cookie = "location_lng=" + this.objLocation.lng + ";expires=" + this.locationCookieExpiration + ";path=/;domain=ca.gov";
		document.cookie = "location_zip=" + this.objLocation.zip + ";expires=" + this.locationCookieExpiration + ";path=/;domain=ca.gov";
	
		// close popup
		document.getElementById("loc_container").style.display = "none";
	
		// update weather
		CAGOVWeather.getWeatherXML();
	},
	
	changeExpiration:function() {
		if (document.getElementById("loc_input_remember").checked) {
			var expDate = new Date();
			expDate.setTime(expDate.getTime() + (1000 * 60 * 60 * 24 * 365 * 5)); // expire in 5 years
			this.locationCookieExpiration = expDate.toUTCString();
		} else {
			this.locationCookieExpiration = ""; // session cookies
		}
	}

}

CAGOVWeather = {
	xml_weather_feed_path: "/javascript/weather/weather_xml.asp",
	objWeather: new Object(),

	tempXMLWeather: null,

	initWeather:function() {
		// get weather cookies
		this.objWeather.condition = getCookie("weather_cond");
		this.objWeather.temp_f = getCookie("weather_temp");
		this.objWeather.icon = getCookie("weather_icon");
	
		if (!this.objWeather.condition || !this.objWeather.temp_f || !this.objWeather.icon) {
			this.getWeatherXML(); // weather data is missing, so get it
		} else {
			this.displayWeather();
		}
	},

	getWeatherXML:function() {
		if (document.getElementById) { // Make sure browser supports getElementById
			//call the right constructor for the browser being used
			var xhr = false;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					try {
						xhr = new ActiveXObject("Microsoft.XMLHTTP");
					} catch(e) {
						// not supported
						return false;
					}
				}
			} else {
				// not supported
				return false;
			}
	
			//prepare the xmlhttprequest object
			xhr.open("GET",this.xml_weather_feed_path + "?q=" + CAGOVLocation.objLocation.zip,true);
			//xhr.setRequestHeader("Cache-Control", "no-cache"); // get a fresh copy from the server
			//xhr.setRequestHeader("Pragma", "no-cache"); // for backward compatibility
	
			// This function runs when the readyState property of the XHR object changes
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) // indicates that the response is available
				{
					if (xhr.status == 200 || xhr.status == 304) // we received a successful response
					{
						if (xhr.responseText != null) { // make sure we didn't get an empty response
							CAGOVWeather.tempXMLWeather = xhr.responseXML;
							CAGOVWeather.processWeatherXML();
						}
					}
				}
			}
	
			//send the request
			xhr.send(null);
		}
	},

	//process the received xml
	processWeatherXML:function() {
		this.objWeather = new this.XML2WeatherObject(this.tempXMLWeather);
		//document.domain = "ca.gov";
		if (this.objWeather.condition) {
			var expDate = new Date();
			expDate.setTime(expDate.getTime() + (1000 * 60 * 30)); // expire in 30 minutes
			var weatherCookieExpiration = expDate.toUTCString();
			document.cookie = "weather_cond=" + escape(this.objWeather.condition) + ";expires=" + weatherCookieExpiration + ";path=/;domain=ca.gov";
			document.cookie = "weather_temp=" + escape(this.objWeather.temp_f) + ";expires=" + weatherCookieExpiration + ";path=/;domain=ca.gov";
			document.cookie = "weather_icon=" + escape(this.objWeather.icon) + ";expires=" + weatherCookieExpiration + ";path=/;domain=ca.gov";
	
			this.displayWeather();
		}
	},
	
	displayWeather:function() {
		document.getElementById("weather_container").innerHTML = '<a href="/weather/"><img src="/images/common/weather/' + this.objWeather.condition.replace(" ","_") + '.png" alt="' + this.objWeather.condition + '" title="' + this.objWeather.condition + '" class="weather_icon" /></a>'
		+ ' <span class="weather_temp_city">' + this.objWeather.temp_f + '&deg; <span onclick="CAGOVLocation.setLocation()">' + CAGOVLocation.objLocation.cty + '</span></span><br />'
		+ '<div onclick="CAGOVLocation.setLocation()" class="weather_set_location loc_clickable">Set Location</div>';
	},
	
	XML2WeatherObject:function() {
		var chanElement = CAGOVWeather.tempXMLWeather.getElementsByTagName("current_conditions")[0]; // current conditions element
		// now set all of the object properties that take simple strings as their values
		var properties = new Array("condition", "temp_f", "icon");
		var tmpElement = null;
		for (var i = 0; i < properties.length; i++) {
			tmpElement = chanElement.getElementsByTagName(properties[i])[0];
			if (tmpElement != null)
				eval("this." + properties[i] + "=tmpElement.getAttribute('data')");
		}
	}

}

function getCookie(cookie_name) {
	var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
	if (results)
		return (unescape(results[2]));
	else
		return null;
}


// breadcrumbs
// This function populates the breadcrumb section of the page.
function breadcrumbs()
{
	if ((document.getElementById) && document.getElementById('breadcrumb_dynamic')) { // Make sure browser supports getElementById and breadcrumb_dynamic exists
		var wrkLocation = location.href;
		var wrkLength = wrkLocation.indexOf("#");  // Find the begining of any anchor reference
		if(wrkLength != -1){
			var wrkLocation = wrkLocation.substr(0,wrkLength);  // Extract the anchor reference
		}	
		var wrkLength = wrkLocation.indexOf("?");  // Find the begining of the query string
		if(wrkLength != -1){
			var wrkLocation = wrkLocation.substr(0,wrkLength);  // Extract the query string
		}	
 
		var arrURL=wrkLocation.split("/"); // Array containing the current location, split at the slashes
		var output='<a href="/index.asp">Home</a>'; // The string which will be output to the browser, starts with a link to the home page
		var path = ''; // Link for the crumbs

		// If last item is blank or index.* or default.*, remove it
		if (arrURL[arrURL.length-1] == '' || arrURL[arrURL.length-1].match(/^index\.|^default\./i) ) {
			arrURL.length--;
		}

		if (arrURL.length > 3) {
			for (counter = 3;counter < arrURL.length-1;counter++) {  // Loop to display the links
				if(path.length == 0){  // always start links with '/' 
					path = '/';
				}
				path += arrURL[counter] + '/';  // always end links to folder with '/' 
				output += ' <img src="/images/content/breadcrumb_divider.png" alt="" /> <a href="' + path + '">' + arrURL[counter].replace(/_/g,' ') + '</a>';
			}

			// Display the name of the current page in bold
			output += ' <img src="/images/content/breadcrumb_divider.png" alt="" /> <strong>' + arrURL[arrURL.length-1].replace(/_/g,' ').replace(/\.\w{3,5}$/,'') + '</strong>';
		}

		document.getElementById('breadcrumb_dynamic').innerHTML = output;  // Display the breadcrumbs
	}
}

function initPage() {
//	if (document.querySelector(".content_right_column")) {
//		document.getElementById("img_ribbon").style.backgroundImage = "/images/template2012/ribbon_home_two_column.png";
//	}

	initNavigation();
	headerPhoto();
	CAGOVLocation.initLocation();
	CAGOVWeather.initWeather();
	breadcrumbs();
}
addLoadEvent(initPage);



/*
(C) www.dhtmlgoodies.com, September 2005

This is a script from www.dhtmlgoodies.com. You will find this and a lot of other scripts at our website.	

Terms of use:
You are free to use this script as long as the copyright message is kept intact. However, you may not
redistribute, sell or repost it without our permission.

Thank you!

www.dhtmlgoodies.com
Alf Magne Kalleland

*/	
function showHideAnswer()
{
	var numericID = this.id.replace(/[^\d]/g,'');
	var obj = document.getElementById('a' + numericID);
	if(obj.style.display=='block'){
		obj.style.display='none';
	}else{
		obj.style.display='block';
	}		
}

function initShowHideContent()
{
	var divs = document.getElementsByTagName('DIV');
	for(var no=0;no<divs.length;no++){
		if(divs[no].className=='exec'){
			divs[no].onclick = showHideAnswer;
		}	
		
	}	
}

addLoadEvent(initShowHideContent);

