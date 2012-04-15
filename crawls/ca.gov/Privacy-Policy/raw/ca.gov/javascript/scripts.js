// CA.gov

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


initNavigation = function() {

	var isThisHome = false;

	var ignoreNavMouseover = true;
	setTimeout(function(){ignoreNavMouseover = false;},500); // Prevent nav from opening on page load if mouse is already positioned over nav

	if (document.getElementById) { // Does the browser support the getElementById method?

		var wrkCurrentLocation = location.href;
		var arrCurrentURL=wrkCurrentLocation.split("/");

		var bodyElement = document.getElementsByTagName("BODY"); // if home page, skip fade
		if (bodyElement && bodyElement.length == 1) {
			if (bodyElement[0].className.match("body_home")) {
				isThisHome = true;
			}
		}

		navRoot = document.getElementById("nav_list"); // Get main list ul

		for (var i=0; i<navRoot.childNodes.length; i++) { // Loop over main list items
			var node = navRoot.childNodes[i];
			if (node.nodeName == "LI") {

				if (node.childNodes[0] && node.childNodes[0].href) {
					arrNavLink = node.childNodes[0].href.split("/");
					if ((arrNavLink.length > 4) && (arrCurrentURL[3] == arrNavLink[3])) { // folder of current URL matches this nav link
						node.className += " highlighted_nav_item"; // add class to this li
					}
				}

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
						if (!isThisHome) {
							if (arrayNavPanel[0].pauseTimerID) // are we pausing after a mouseout?
								clearTimeout (arrayNavPanel[0].pauseTimerID); // cancel it
	
							clearTimeout (arrayNavPanel[0].fadeTimerID); // if this panel is already fading, cancel it
							arrayNavPanel[0].style.zIndex = 2; // put this panel on top
							fadeElem(arrayNavPanel[0],0.25); // fade in
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
						if (!isThisHome) {
							arrayNavPanel[0].style.zIndex = 1;
							var temp = arrayNavPanel[0];
							clearTimeout (arrayNavPanel[0].fadeTimerID);
							arrayNavPanel[0].pauseTimerID = setTimeout(function(){fadeElem(temp,-0.25); temp = null;},160); // short pause, start fade out
						} else {
							arrayNavPanel[0].style.display = "none";
						}
					}
				}
			}
		}
	}
}

fadeElem = function (elemToFade,fadeRate) { // loops during fade
	if (typeof elemToFade.xOpacity=="undefined")
		elemToFade.xOpacity = 0;
	elemToFade.style.display = "block";
	elemToFade.xOpacity += fadeRate;
	//alert(elemToFade.xOpacity);
	fSetOpacity(elemToFade);
	elemToFade.fadeTimerID = null;
	if (elemToFade.xOpacity > 0 && elemToFade.xOpacity < .99) {
		elemToFade.fadeTimerID = setTimeout(function(){fadeElem(elemToFade,fadeRate); elemToFade = null;fadeRate=null},40); // short pause, recurse to continue fade.
	}
	return(0);
}

fSetOpacity = function (obj) {
	if (obj.xOpacity > .99) {
		obj.xOpacity = .99;
	}
	if (obj.xOpacity <= 0) {
		obj.xOpacity = 0;
		obj.style.display = "none";
	}
	//alert(obj.xOpacity);
	obj.style.opacity = obj.xOpacity; // the CSS3 method, for newer Mozilla, Safari, Opera
	obj.style.MozOpacity = obj.xOpacity; // older Mozilla
	obj.style.filter = "alpha(opacity=" + (obj.xOpacity * 100) + ")"; // for IE
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

function tabpanel_mouseover(panelnum) {
	var numberOfPanels = 5;
	for (counter=1; counter <= numberOfPanels; counter++) {
		document.getElementById("panel_" + counter).style.display = "none"; // hide all panels
		document.getElementById("tabpanel_img_" + counter).style.color = "#505050";
	}

	document.getElementById("panel_" + panelnum).style.display = "block"; // display this panel
	document.getElementById("tabpanel_img_" + panelnum).style.color = "#1f70a7";
}

addLoadEvent(initNavigation);

function selectSearch() { 
	document.getElementById("ca_form").search.value = document.getElementById("search_textfield").value;
	document.getElementById("ca_form").submit();
	return false;
}

function enableJavascriptCSS() {
	var bodyElement = document.getElementsByTagName("BODY");
	if (bodyElement && bodyElement.length == 1) {
		bodyElement[0].className = bodyElement[0].className.replace("javascript_off", "javascript_on");
	}

	//if (document.getElementById("panel_1"))
	//	document.getElementById("panel_1").style.position = "absolute"; // had to do this here instead of .css because of Chrome 3.0 bug

}

addLoadEvent(enableJavascriptCSS);



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

addLoadEvent(breadcrumbs);  // Add breadcrumbs to the page onload event handler

// End of breadcrumbs javascript

// Weather

function toggleWeatherDropdown() {
	weatherNode = document.getElementById("weather_dropdown");
	toggleImg = document.getElementById("weather_toggle_dropdown");
	if (weatherNode) {
		if (weatherNode.style.display == "block") {
			weatherNode.style.display = "none";
			if (toggleImg)
				toggleImg.src="/images/content/bullet_blue_disc_down.png";
		} else {
			weatherNode.style.display = "block";
			if (toggleImg)
				toggleImg.src="/images/content/bullet_blue_disc_up.png";
			//document.getElementById("weather_form").q.focus();
		}
	}
}
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