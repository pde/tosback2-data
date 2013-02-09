// Purpose:
//  This file is included on all pages (legacy & new) and will provide a
//  collection of functions to be used throughout as well as auto run certain 
//  functions.
//  $Last Updated: 01/15/2013 $
// Ensure the document.domain

var docDomainParts = document.domain.split('.'),
	docDomainPartsLen = docDomainParts.length;
if (docDomainPartsLen > 2) {
	document.domain = docDomainParts[docDomainPartsLen - 2] + "." + docDomainParts[docDomainPartsLen - 1];
}
docDomainPartsLen = docDomainParts = null;


// Overlay configurations.
//  The video player is configured in playVideo() due to the requirement of
//  the Video ID.
overlayConfigs = {};
overlayConfigs.modal = { // Generic Modal
	'autoDimensions': true,
	'autoScale': false,
	'centerOnScroll': true,
	'enableEscapeButton': true,
	'height': 'auto',
	'hideOnOverlayClick': true,
	'margin': 0,
	'modal': false,
	'overlayColor': '#666',
	'overlayOpacity': 0.7,
	'padding': 0,
	'scrolling': 'no',
	"showCloseButton": false,
	"titleShow": false,
	'showNavArrows': false,
	'transitionIn': 'none',
	'transitionOut': 'none',
	'width': 'auto'
};
overlayConfigs.nonModal = { // Generic Non-Modal
	'autoDimensions': true,
	'enableEscapeButton': true,
	'height': 'auto',
	'hideOnOverlayClick': true,
	'margin': 0,
	'modal': false,
	'overlayShow': true,
	'overlayColor': 'transparent',
	'overlayOpacity': 0,
	'padding': 0,
	"showCloseButton": false,
	'showNavArrows': false,
	"titleShow": false,
	'transitionIn': 'none',
	'transitionOut': 'none',
	'width': 'auto'
};

// Quickview Overlay
overlayConfigs.quickview = $.extend(true, {}, overlayConfigs.modal, {
	'width': 710,
	'height': 520,
	'modal': false,
	'centerOnScroll': false,
	'overlayOpacity': 0,
	'type': 'iframe'
});

// Gallery Overlay
overlayConfigs.gallery = $.extend(true, {}, overlayConfigs.modal, {
	'width': 898,
	'height': 601,
	'type': 'iframe'
});

// Bopis 2 Overlay

var currentStore;
var newStore;
overlayConfigs.bopis = $.extend(true, {}, overlayConfigs.modal, {
	'padding':15,
	'width': 795,
	'height': 710,
	'type': 'iframe',
	'modal': false,
	'overlayOpacity': 0,
	'centerOnScroll': false,
	'showCloseButton':true,
	"onComplete": function() {
		currentStore = readCookie('THD-LOC-STORE');
		
	},
	"onClosed": function() {
		newStore = readCookie('THD-LOC-STORE');
		if ( newStore != currentStore ){
			
			window.location.reload();		
		}
		
	}
});

// Quickview Overlay
overlayConfigs.content = $.extend(true, {}, overlayConfigs.modal, {
	'autoDimensions':false,
	'width' : 766,
	'showCloseButton' : true,
	"onComplete": function(currentArray, currentIndex, currentOpts) {
		//alert('Complete!');

		//To prevent the weirdness, show the preloader and hide the fancybox wrap until loaded. qc-14889
		$.fancybox.showActivity();
		$('#fancybox-wrap').css({'visibility':'hidden'});

		setTimeout(function(){
			var $fbContent = $('#fancybox-content');

			//$fbContent.find('.row').addClass('clearfix');
			$fbContent.find('.pod').css({'height':'auto'});
			fixPodHeights();

			var $dctm_content_overlay = $('#dctm_content_overlay'),
				theHeight = $dctm_content_overlay.height()+'px';

			$dctm_content_overlay.parent().css({'height':'auto'});
			$('#fancybox-content').css({'height':'auto'});
			if(jQuery.fancybox) jQuery.fancybox.resize();

			//Hide the preloader and finally show the fancybox wrap. qc-14889
			$.fancybox.hideActivity();
			$('#fancybox-wrap').css({'visibility':'visible'});
			
		}, 1500);

		
		
	}
});

//PLUGIN THAT TAKES PARENT EL & CHILD EL TO MAKE EQUAL HEIGHT COLS
//USED IN FIXPODHEIGHTS
function _EqualColHeights(parentElement, childElement) {
	$(parentElement).each(function(index) {
		thisParentsChild = $(this).children(childElement);
		var numOfChildern = thisParentsChild.length;
		if (numOfChildern > 1) {
			childHeights = new Array();
			thisParentsChild.each(function(i) {
				ThisHeight = $(this).height();
				childHeights[i] = ThisHeight;
			});
			tallestChild = Math.max.apply(Math, childHeights); // find tallest height out of this row's array
			thisParentsChild.height(tallestChild); //give all this row's child pods the height of tallest pod
		}
	});
}


// Call on window.load by default. Can also be called any time to dynamically
// adjust the heights of all the pods.


	function fixPodHeights() {
	 $('.row').each(function(index) {
	  //first check to see if row has a rail
	  if ($(this).find('.rail').length > 0) {
	   var $rail = $(this).find('.rail'),
		$mainC = $(this).find('.mainContent'); 
		var railHeight = $rail.height(),
		mainContentHeight = $mainC.height(); 
		if($('div').hasClass('rail footerRail grid_6 alpha')){
		 $rail.css('min-height', mainContentHeight);
		}else{ if (railHeight > mainContentHeight) {
		$mainC.css('min-height', railHeight);
	   } else if (railHeight < mainContentHeight) {
		$rail.css('min-height', mainContentHeight);
	   }}
	  }
	 });

	_EqualColHeights(".row", ".pod");
	_EqualColHeights(".pod", ".pod");
	$('.rail .pod').attr('style', ''); //remove all inline styles of rail pods quickfix
}

function attachOverlays(context) {
	var $overlays = (context) ? $('.overlayTrigger', context) : $('.overlayTrigger');

	$overlays.each(function(i) {
		var $this = $(this),
			useConfig = '',
			theRel = ($this.attr('rel')) ? $this.attr('rel').toLowerCase() : '';

		switch (theRel) {
		case 'bopis':
			bopisHrefReplace(); //defect #15052
			useConfig = overlayConfigs.bopis;
			break;
		case 'quickview':
			useConfig = overlayConfigs.quickview;
			break;
		case 'gallery':
			useConfig = overlayConfigs.gallery;
			break;
		case 'modal':
			useConfig = overlayConfigs.modal;
			break;
		case 'content':
			useConfig = overlayConfigs.content;
			break;
		case 'custom':
			// Does not attach Fancybox
			$this.click(HD_lightbox);
			break;
			// All all new types above here otherwise you will mess up the default.
		case 'nonmodal':
			// fall through
		default:
			useConfig = overlayConfigs.nonModal;
			break;
		}

		if (useConfig) {
			$this.fancybox(useConfig);
		}
		$this.css({
			"visibility": "visible"
		});

	});
}

//A peformance hack for defect #15052 that takes the data-bopis attribute on the BOPIS button and makes 
//an href value so that bopis modal won't degrade if clicked prior to doc ready.


function bopisHrefReplace() {
	var hrefValue = $("a.bopis_button").attr("data-bopis");
	$("a.bopis_button").attr('href', hrefValue);
}



function attachQuickViewButtons() {
	$(".dynamic.product").live({
		mouseenter : function () {
			$(this).find('.quickview_button').removeClass('hide');
		},
		mouseleave : function () {
			$(this).find('.quickview_button').addClass('hide');
		}
	});
}

//	LazyLoadJS
//		Custom Lib to LazyLoad scripts without blocking. Respects order added.
//		Based on http://www.stevesouders.com/blog/2009/04/27/loading-scripts-without-blocking/
//	Usage:
//		Anytime you need a script to be lazyloaded, simply call
//		LazyLoadJS.add('path/to/file');
//		In the foot of the page, a call to LazyLoadJS.load() will be called and
//		all files added will be called.
//	Debugging:
//		Call LazyLoadJS.debug() to see the list of files in console.log() as
//		well as weather or not load() was called.
LazyLoadJS = (function() {
	var files = [],
		loadCalled = false;

	function _add(file) {
		files.push(file);
	}

	function _load() {
		loadCalled = true;
		for (var i = 0, l = files.length; i < l; i++) {
			document.write("<scr" + "ipt src=" + "\"" + files[i] + "\" type=\"text/javascript\"" + "></sc" + "ript>" + "\n");
		}
	}

	function _debug() {
		try {
			console.log("files:\n", files.join("\n"));
			console.log("loadCalled:", loadCalled);
		} catch (e) {

		}
	}

	return {
		"add": function(file) {
			_add(file);
		},
		"load": function() {
			_load();
		},
		"debug": function() {
			_debug();
		}
	};
})();

//  This function takes the shop all departments menu on the homepage
//	and auto expands it


function expandSAD() {
	$('body.homepage .switches').addClass('expanded');
};

function stripedTables() {
	$('table.tablePod tr:even').addClass('even');
};

//dynamic product ratings display
function dynamicRatings(){
	var obj = $('.reviews .stars');
	$(obj).each(function (i){
			var avgRating = $(this).attr('rel');
			var RatingNumber = avgRating * 20;
			if(avgRating == 'noRating' || RatingNumber == "0.0"){
					$(this).parent().css('background-position','0px -62px');
					$(this).width('0px');
			} else{
				$(this).css('width', RatingNumber+"%" );
			}
	});
}

$(window).load(function() {
	fixPodHeights();
	attachOverlays();
	attachQuickViewButtons();
	stripedTables();
	dynamicRatings();
	//cartConfModal();
	// Add the fancybox close catcher
	$('.fbClose a').live('click', function() {
		$.fancybox.close();
		return false;
	});
	//Cart Modal Trigger.
	$("body").delegate(".overlayCartTrigger", "click", function(event){
    event.preventDefault();    
	var setCartUrl = $(this).attr('href')+'&addToCartConfirmation=true';
    var cartModelURL = $.extend({}, CartModelConfig);
    	cartModelURL.href = setCartUrl;
	$.fancybox(cartModelURL);
	});

});

/* FED Cookie Generic Cookie handling code */

function fed_CreateCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function fed_ReadCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function fed_EraseCookie(name) {
	fed_CreateCookie(name, "", -1);
}


/*
	Replicate the HD_lightbox functionality
	QC# 13990 & 11801
*/
function HD_lightbox() {
	var galleryOutput = '<div id="gallery_wrapper" class="clearfix"><a class="close_btn" href="#">CLOSE X</a><div id="galleryPlaceHolder">{{GALERY_HERE}}</div></div>',
		ieWidthFix, galleryOverlayConfig, theLink;

	theLink = $(this).attr('href');
	$.ajax({
		url: theLink,
		async: false,
		success: function(newHTML) {
			var newHTML = newHTML.replace(/[\n\t\r]/g, '').match(/<body>(.*)<\/body>/)[1],
				matches;
			galleryOutput = galleryOutput.replace('{{GALERY_HERE}}', newHTML);
			//if ($.browser.msie) {
			//matches = newHTML.match(/width="(\d+).*"/))[1];
			//if (matches) {
			//ieWidthFix = matches+'px';
			//}
			//}
		}
	});

	galleryOverlayConfig = $.extend(true, {}, overlayConfigs.modal, {
		'onComplete': function() {
			$('.close_btn', '#fancybox-wrap').click(function() {
				$.fancybox.close();
				return false;
			});
		},
		'padding': 0,
		'autoScale': false,
		'transitionIn': 'none',
		'transitionOut': 'none',
		'scrolling': 'no',
		'showCloseButton': false,
		'overlayOpacity': .70,
		'overlayColor': '#666'
	});

	//if ($.browser.msie) {
	//galleryOverlayConfig = $.extend(true, {}, galleryOverlayConfig,{
	//'width':ieWidthFix
	//});
	//}
	$.fancybox(galleryOutput, galleryOverlayConfig);
	return false;
}



/* BOPIS 2 SUPPORT! NEED TO THINK THIS THROUGH!  */
//////////////////////////////////////////////////////////////////////////////////////////
// This is the start of what should be in a lib.js file.
// This is a standalone js lib for basic catch all functions.
// The functions here should not rely on any functions that are not in this file.
// No jQuery, Prototype, Dojo, MooTools, etc.
//
// For now, we are designating the functions as FED controled with a prefix of "f_" 
//
/*
 * bool f_isOnlyNumChars( val [, (bool) allowExtras] )
 *
 * Tests if val consists of only numeric characters.
 * +   An optional 2nd param allows dash(-), comma(,) and decimal(.)
 * +   Any non-false value will allow the extras. Leave out completely to avoid extras
 * +   This does not test that the number is a real number.
 * Ex:
 *    f_isOnlyNumChars("67.09") = false
 *    f_isOnlyNumChars("67.09", 1) = true
 *    f_isOnlyNumChars("-67.09") = false
 *    f_isOnlyNumChars("-67.09", 1) = true
 *    f_isOnlyNumChars("67.09", "no") = true (2nd is a non-false)
 *    f_isOnlyNumChars("ah2j", 1) = false
 *    f_isOnlyNumChars("ah2j") = false
 *    f_isOnlyNumChars("ahja") = false
 *    f_isOnlyNumChars("-.-,", 1) = false
 *    f_isOnlyNumChars("0x89f") = false (Real HEX Number, but not all num characters)
 *    f_isOnlyNumChars("0x89f", 1) = false (Real HEX Number, but not all num characters)
 *
 * Author: John Jimenez (johnajimenez_at_gmail_dot_com)
 */

function f_isOnlyNumChars(val, allowExtras) {
	if (allowExtras) {
		val = val.replace(/[-\.,]/g, '')
	}
	return Boolean(!(val.replace(/\d/g, '')));
}

/*
 * bool f_isNumeric( val )
 *
 * Tests if val is a number.
 * Ex:
 *    f_isNumeric("67.09") = true
 *    f_isNumeric("-67.09") = true
 *    f_isNumeric("ahja") = false
 *    f_isNumeric("ah2j") = false
 *    f_isNumeric("0x89f") = true (Real HEX Number)
 *    f_isNumeric("10e3") = true (Real SN Number)
 *
 * Author: John Jimenez (johnajimenez_at_gmail_dot_com)
 */

function f_isNumeric(val) {
	return Boolean(((val - 0) == val) && (val.length > 0));
}

/*
 * bool f_isAlpha( val [, (bool) allowSpaces] )
 *
 * Tests if val consists of only alphabetic characters.
 * +   An optional 2nd param allows spaces, tabs, and new lines characters
 * +   Any non-false value will allow spaces. Leave out completely to avoid extras
 * Ex:
 *    f_isAlpha("Sample") = true
 *    f_isAlpha("I Pass", 1) = true
 *    f_isAlpha("I pass", "no") = true (2nd is a non-false)
 *    f_isAlpha("Sam-ple") = false
 *    f_isAlpha("I fail") = false
 *    f_isAlpha("ah2j") = false
 *
 * Author: John Jimenez (johnajimenez_at_gmail_dot_com)
 */

function f_isAlpha(val, allowSpaces) {
	if (allowSpaces) {
		val = val.replace(/\s/g, '')
	}
	return Boolean(!(val.replace(/[a-z]/ig, '')));
}

/*
 * obj f_getUrlParamsObj ( inStr )
 *
 * Returns an object with properties set to the values based on a url paramater formated string.
 * Ex:
 *   f_getUrlParamsObj('?bob=val1&name2=val3') = {"bob":"val2", "name2":"val3"} *
 *
 * Notes: Automatically unescapes characters
 *
 * Author: John Jimenez (johnajimenez_at_gmail_dot_com)
 */

function f_getUrlParamsObj(inStr) {
	var p, n, tmpOP, retObj = false;
	if (inStr) {
		retObj = {};
		// First remove the leading '?' if needed.
		inStr = inStr.replace(/^\?/, '');

		// Explode the string into "name=val" portions.
		p = inStr.split('&');
		tmpOP = "{";
		for (var i = 0; i < p.length; i++) {
			if (i > 0) {
				tmpOP += ', ';
			}
			n = p[i].split('=');
			tmpOP += '"' + n[0] + '":"' + unescape(n[1]).replace(/\\/g, '\\\\').replace(/\"/g, "\\\"").replace(/\'/g, "\\'") + '"';
		}
		tmpOP += '}'
		 try{
	            retObj = eval("(" + tmpOP + ")");
	        }
	        catch(err){
	            return false;
	        }
	}
	return retObj;
}

/*
 * str f_makeUrlParamsFromObj ( inObj )
 *
 * Returns string
 * Ex:
 *   f_getUrlParamsObj({"bob":"val2", "name2":"val3"}) = 'bob=val1&name2=val3'
 *
 * Notes: Automatically escapes characters
 *
 * Author: John Jimenez (johnajimenez_at_gmail_dot_com)
 */

function f_makeUrlParamsFromObj(inObj) {

	var retStr = false;

	if (inObj) {
		retStr = '';
		for (var i in inObj) {
			if (inObj.hasOwnProperty(i)) {
				if (retStr) {
					retStr += '&';
				}
				retStr += escape(i) + '=' + escape(inObj[i]);
			}
		}
	}
	return retStr;
}

// This is for the EMAIL input in the footer, carried over form 5.6
function popup() {
    var url = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/THDEmailSignUpAddCmd?langId=-1&storeId=10051&catalogId=10053&URL=EmailSignUpView&subscrType=' + document.emailsub.subscrType.value + '&emailInput=' + document.emailsub.emailInput.value + '&formName=emailsub';
    var winWidth = 350;
    var winHeight = 150;
    var winY, winX = 0;
    if (screen.width > winWidth && screen.height > winHeight) {
        winX = (screen.width - winWidth) / 2;
        winY = (screen.height - winHeight) / 2;
    }
    var winOptions = 'location=0,scrollbars=0,menubar=0,toolbar=0,status=0,resizable=1,directories=0,width=' + winWidth + ',height=' + winHeight + ',top=' + winY + ',left=' + winX;
    var windowToOpen = window.open(url, "windowToOpen", winOptions);
    window.top.name = 'opener';
    if (windowToOpen) {
        windowToOpen.focus();
    }
    document.emailsub.emailInput.value = '';
}

//----------appending value to citi card link-----------------//
function  appendValueToCitiLink() {

	var citiValue = getTHDTotalCartAmount().substr(1);
	if(citiValue==''){
	citiValue='0.00'
	}
	citiValue = citiValue.split(',').join('');
    var ctLinks = document.links;
	for (var ct=0; ct<ctLinks.length; ct++) {								  
        if (ctLinks[ct].href.indexOf('www.citicards.com/cards/acq/Apply.do')!=-1) {        
           ctLinks[ct].href = ctLinks[ct].href + "&SALE_AMT=" +citiValue;
        }
    }             
}

/*
	New, Safe Logging Code, JNH 11-28-2012

	Usage: THD.log('Message', variable);

	To turn logging on or off just set THD.isLogging
*/
var THD = (THD || {});

THD.isLogging = false;

THD.log = (function () {
	// Based on code from: https://github.com/cpatik/console.log-wrapper/blob/master/consolelog.js
	// Tell IE9 to use its built-in console
	if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log === 'object') {
		if (Array.prototype.forEach) {
			['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function (method) {
				console[method] = this.call(console[method], console);
			}, Function.prototype.bind);
		}
	}

	// Modern browsers
	if (typeof console !== 'undefined' && typeof console.log === 'function') {
		return function () {
			if (THD.isLogging) {
				// Single argument, which is a string
				if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
					console.log((Array.prototype.slice.call(arguments)).toString());
				} else {
					console.log(Array.prototype.slice.call(arguments));
				}
			}
		};
	}

	// Check IE8 - Originally used !Function.prototype.bind && as well, but prevented logging in IE9 with 7 compat
	if (typeof console !== 'undefined' && typeof console.log === 'object') {
		return function () {
			if (THD.isLogging) {
				Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
			}
		};
	}

	// return an empty function
	return (function() {});
}());

//---------CART CONFORMATION MODAL-------------------//

CartModelConfig = {
	//'href':setCartUrl,
	'autoDimensions': true,
	'autoScale': false,
    'padding':0, 
    'margin':0,        
    'type': 'ajax',
    'width': 640,
    'height':595,
    'overlayOpacity': 0.7,
    'showCloseButton':true,
    'centerOnScroll':false,
    'transitionIn': 'none',
	'transitionOut': 'none',
    'overlayColor': '#000',
    'onStart' :  function(){
    	$('#fancybox-wrap').addClass('atcModalFb');
    	if($('#fancybox-wrap').is(':visible')){
    		isFBAopen = true;
    	}else{
    		isFBAopen = false;
    	}
    },
    'onComplete'	:	function() {
    	if(isFBAopen==false){
    		atcCertonaRePos = setInterval(waitForATCCertona, 500)
    	}	    	
	}
}

var atcCertonaRePos;
var atcCertonTimer = 0
function waitForATCCertona(){
	atcCertonTimer++;
	if($('#atcmodal_rr').is(':visible')){
		$.fancybox.center();
		clearInterval(atcCertonaRePos)
	}
	if(atcCertonTimer==6){
		clearInterval(atcCertonaRePos)
	}
}

/* functions for form validations start */
var thdValidate = {};

//has at least one number returns true 1, otherwise false 0
thdValidate.hasNumber = function(a) {
	var b;
	a = /\d/.test(a);
	if (a === true){ b = 1; }else{b = 0;}
	return b;
};
//has at least one letter returns true 1, otherwise false 0
thdValidate.hasAlpha = function(a) {
	var b;
	a = /[a-zA-Z]/g.test(a);
	if (a === true){ b = 1; }else{ b = 0; }
	return b;
};
// test for valid zip code format. true 1 is 5 numbers, false 0 is not
thdValidate.testZipCode = function(a) {
	var b;
	a = a.trimMe();
	if (isNaN(a) === false && a.length === 5){ b = 1; }else{ b = 0; }
	return b;
};
// test for valid name returns true 1, otherwise false 0
thdValidate.testName = function(a) {
	a = a.trimMe();
	var b = a.match(/\d/);
	if (b === null && a.length > 0){ b = 1; }else{ b = 0; }
	return b;
};
// test for valid Address returns true 1, otherwise false 0
thdValidate.testAddress = function(a) {
	var b;
	a = a.trimMe();
	if (thdValidate.hasNumber(a) === 1 && thdValidate.hasAlpha(a) === 1 && a.length>3){ b = 1; }else{ b = 0; }
	return b;
};
// test phone returns returns true 1, otherwise false 0
// Sm = 3 digits, Med = 4 digits, Lg = 10-15 digits in one field
thdValidate.testPhoneSm = function(a) {
	var b;
	a = a.trimMe();
	if (isNaN(a) === false && a.length === 3){ b = 1; }else{ b = 0; }
	return b;
};
thdValidate.testPhoneMed = function(a) {
	var b;
	a = a.trimMe();
	if (isNaN(a) === false && a.length === 4){ b = 1; }else{ b = 0; }
	return b;
};
thdValidate.testPhoneLg = function(a) {
	var b;
	a = a.trimMe();
	//remove hypens
	a = a.replace(/-/g,'');
	if (isNaN(a) === false && a.length >= 10 && a.length <= 15 ){ b = 1; }else{ b = 0; }
	return b;
};
thdValidate.testEmail = function(a) { 
	var b;
	a = /\S+@\S+\.\S+/.test(a);
	if (a === true) { b = 1; }else{ b = 0; }
	return b;
};
//trim method that actually works in IE and mobile, or use this one replace(/^\s+|\s+$/g, "");  ?
String.prototype.trimMe = function () {
	var regEx = /(^[\s\xA0]+|[\s\xA0]+$)/g,
		a = this.replace(regEx, '');
	return a;
};
// toTitleCase method - since js does not have one...
String.prototype.toTitleCase = function () {
	var A = this.toLowerCase().split(' '), B = [];
	for (var i = 0; A[i] !== undefined; i++) {
		B[B.length] = A[i].substr(0, 1).toUpperCase() + A[i].substr(1);
	}
	return B.join(' ');
};
// remove Spec Char
String.prototype.removeSpec = function () {
	var regEx = /[^A-Za-z0-9 ]/g,
		a = this.replace(regEx,'');
	return a;
};
/* functions for form validations end */

