var objMyImage = null;
var ova = new Array();
var ovaCtr = 0;
//Global Modal box object.
var overlayModalBox;

//Moves content into MasterPage popup container and activated Modal Popup
function DisplayModalBox(htmlContent,width,height,headingTxt,useCustomStyles,hideFooter)
{
	if (hideFooter)
	{
		$(".modalFooter").hide();
	}
	if (useCustomStyles)//Just replace the popup body
	{
		
		$(".modal").html(htmlContent);
	}
	else  //Replace all the popup content
	{
		$("#overlay_content").html(htmlContent);
	}
	overlayModalBox = new OverlayAd('overlayModalBox',
		document.getElementById("overlay_screencover"),
		document.getElementById("overlay_help_container"),
		document.getElementById("overlay_help_image"),
		"Help", -1, width, height, false, oldIEBrowser, false);
	
	$(".modal").css("width", width);
	//$(".modal").css("height", height);
	if (headingTxt)
	{
		$("#modalHeadingText").html(headingTxt);
	}
	
	initOpacity('overlay_screencover', BASE_URL + 'images/overlaybox/screencover');
	overlayModalBox.activateAd();
	if (oldIEBrowser) IEPngFix();
}

//Close box opened by DisplayModalBox();
function CloseModalPopup()
{
	overlayModalBox.closeOverlay();
}


/* 
 * Cross-browser event handling, by Scott Andrew
 */
function addEvent(element, eventType, lamdaFunction, useCapture) {
   if (element.addEventListener) {
      element.addEventListener(eventType, lamdaFunction, useCapture);
      return true;
   }
   else if (element.attachEvent) {
      var r = element.attachEvent('on' + eventType, lamdaFunction);
      return r;
   }
   else {
      return false;
   }
}

function OverlayAd(_id, _cover, _container, _overlayAd, _cookieId, _cookieHideDays, _adWidth, _adHeight, _hideFlash, _hideDropDown, _allowScroll, _isModal){
	this.id = _id;
	this.cover = _cover;
	this.container = _container;
	this.overlayAd = _overlayAd;
	this.cookieId = _cookieId;
	this.cookieHideDays = _cookieHideDays
	this.adWidth = _adWidth;
	this.adHeight = _adHeight;
	this.hideFlash = _hideFlash;
	this.hideDropDown = _hideDropDown;
	
	if (_allowScroll == undefined) {
	    this.allowScroll = false;
	}
	else {
	    this.allowScroll = _allowScroll;
	}
	
	if(_isModal == undefined) {
		this.isModal = true;
	}
	else {
		this.isModal = _isModal;
	}

	var arr = new Array(_id, false);
	ova[ovaCtr] = arr;
	ovaCtr++;

	this.init = function(_cover, _ad) {	 
	    if(!_cover) _cover = true;
	    if(!_ad) _ad = true;
	    if(_cover) this.addEvent(this.cover, 'click', this.onCloseOverlay, false);
	    if(_ad) this.addEvent(this.overlayAd, 'click', this.adClicked, false);
	}
	
	this.addEvent = function(element, eventType, lamdaFunction, useCapture) {
		if (element.addEventListener) {
			element.addEventListener(eventType, lamdaFunction, useCapture);
			return true;
		} else if (element.attachEvent) {
			var r = element.attachEvent('on' + eventType, lamdaFunction);
			return r;
		} else {
			return false;
		}
	}

	this.closeOverlay = function() {
	    this.cover.style.display = 'none';
	    this.container.style.display = 'none';
	    if (this.hideFlash) this.toggleFlash('visible');
	    if (this.hideDropDown) this.toggleDropDown('visible');

	    for (var i = 0; i < ova.length; i++) {
	        if (this.id == ova[i][0]) {
	            ova[i][1] = false;
	            break;
	        }
	    }
	}

	this.onCloseOverlay = function() {
	    for (var j = 0; j < ova.length; j++) {
	        if (ova[j][1] == true) {
	            eval(ova[j][0] + '.closeOverlay();');
	        }
	    }
	}
	
	this.adClicked = function(){
		
	}

	this.openOverlay = function(){
		this.cover.style.display = 'block';
		this.container.style.display = 'block';
	}
	
	this.resized = function() {
		this.setPosition();
	}

	this.activateAd = function() {
	    var cookie = this.readCookie(this.cookieId);
	    if (cookie == null) {
	        if (this.hideFlash) this.toggleFlash('hide');
	        if (this.hideDropDown) this.toggleDropDown('hide');
	        this.openOverlay();
	        this.createCookie(this.cookieId, this.cookieId, this.cookieHideDays);
	        this.setPosition();
	        
	        for (var i=0; i < ova.length; i++) {
	            if (this.id == ova[i][0]) {
	                ova[i][1] = true;
	                break;
	            }
	        }
	    	return (true); //ad displayed
	    }
		else
		{
			return(false);
		}
	}
	
	this.setPosition = function() {
		var arrayPageSize = this.getPageSize();
		pageWidth = arrayPageSize[0];
		pageHeight = arrayPageSize[1];
		windowWidth = arrayPageSize[2];
		windowHeight = arrayPageSize[3];
		offsetHeight = arrayPageSize[4];
		offsetWidth = arrayPageSize[5];
		
		if(this.isModal) {
			this.container.style.left = (((windowWidth - this.adWidth)/2) + offsetWidth )+'px';
			this.container.style.top = (((windowHeight - this.adHeight)/2) + offsetHeight) +'px';
		}
		
		this.cover.style.width = pageWidth + 'px';
		this.cover.style.height = pageHeight + 'px';
	}
	
	/* 
	 * Cookie functions
	*/
	this.createCookie = function(name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = '; expires=' + date.toGMTString();
		}
		document.cookie = name + '=' + value + expires + '; path=/';
	}
	
	this.readCookie = function(name) {
		var cookieCrumbs = document.cookie.split(';');
		var nameToFind = name + '=';
		for (var i = 0; i < cookieCrumbs.length; i++) {
			var crumb = cookieCrumbs[i];
			while (crumb.charAt(0) == ' ') {
				crumb = crumb.substring(1, crumb.length); /* delete spaces */
			}
			if (crumb.indexOf(nameToFind) == 0) {
				return crumb.substring(nameToFind.length, crumb.length);
			}
		}
		return null;
	}
	
	this.eraseCookie = function(name) {
		createCookie(name, '', -1);
	}
	
	//
	// getPageSize()
	// Returns array with page width, height and window width, height
	// Core code from - quirksmode.org
	// Edit for Firefox by pHaez
	//
	this.getPageSize = function(){
		var xScroll, yScroll;
		
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll = document.body.scrollWidth;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}
		
		var windowWidth, windowHeight;
		if (self.innerHeight) {	// all except Explorer
			windowWidth = self.innerWidth;
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}	
		
		// for small pages with total height less then height of the viewport
		if(yScroll < windowHeight){
			pageHeight = windowHeight;
		} else { 
			pageHeight = yScroll;
		}
	
		// for small pages with total width less then width of the viewport
		if(xScroll < windowWidth){	
			pageWidth = windowWidth;
		} else {
			pageWidth = xScroll;
		}
		
		var offsetHeight = 0;
		var offsetWidth = 0;
		
		try {
			if(document.documentElement) {
				if(document.documentElement.scrollTop) offsetHeight = document.documentElement.scrollTop;
				if(document.documentElement.scrollLeft) offsetWidth = document.documentElement.scrollLeft;
			}
			else if(document.body) {
				if(document.body.scrollTop) offsetWidth = document.body.scrollTop;
				if(document.body.scrollLeft) offsetWidth = document.body.scrollLeft;
			}
		}
		catch(er) {
		}
	
		arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight,offsetHeight,offsetWidth) 
		return arrayPageSize;
	}
	
	this.toggleFlash = function(state) {
		var objects = document.getElementsByTagName("object");
		for (var i = 0; i < objects.length; i++) {
			objects[i].style.visibility = (state == "hide") ? 'hidden' : 'visible';
		}
		var embeds = document.getElementsByTagName("embed");
		for (var i = 0; i < embeds.length; i++) {
			embeds[i].style.visibility = (state == "hide") ? 'hidden' : 'visible';
		}
	}
	
	this.toggleDropDown = function(state) {
		var objects = document.getElementsByTagName("select");
		for (var i = 0; i < objects.length; i++) {
			objects[i].style.visibility = (state == "hide") ? 'hidden' : 'visible';
		}
	}
	
	this.GetHttpRequest = function () {
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest()
		}
		else if (window.ActiveXObject) {
			return new ActiveXObject('Microsoft.XMLHTTP')
		}
		return null;
	}
}

// Add Events
addEvent(window, 'load', initOverlayAd, false);
if (!this.isModal) 
{
	addEvent(window, 'resize', onWindowResized, false);
	addEvent(window, 'scroll', onWindowScroll, false);
}

function closeOverlayAdWindow(obj, url){
	obj.closeOverlay();
	if (url)window.location = url;
}

function onWindowResized() {
    try {
        for (var j = 0; j < ova.length; j++) {
            if (ova[j][1] == true) {
                eval(ova[j][0] + '.setPosition();');
            }
        }
    }
    catch (er) {
    }
}

function onWindowScroll() {
    try {
        for (var j = 0; j < ova.length; j++) {
            var s = eval(ova[j][0] + '.allowScroll;');
            if (ova[j][1] == true && s == true) {
                eval(ova[j][0] + '.setPosition();');
            }
        }
    }
    catch (er) {
    }
}

function initOpacity(element, image) {
	objMyImage = new OpacityObject(element, image);
	objMyImage.setBackground();
}

function initOverlayAd() {
	if (window.localOverlayBoxInit) localOverlayBoxInit(); 
}