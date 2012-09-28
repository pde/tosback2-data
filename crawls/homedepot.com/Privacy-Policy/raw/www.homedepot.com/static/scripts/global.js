// Purpose:
//  This file is included on all pages (legacy & new) and will provide a
//  collection of functions to be used throughout as well as auto run certain 
//  functions.

//  $Last Updated: 08/09/2011 12:27:52  $

// Ensure the document.domain
var docDomainParts = document.domain.split('.'), docDomainPartsLen = docDomainParts.length;
if (docDomainPartsLen > 2) {
	document.domain = docDomainParts[docDomainPartsLen-2]+"."+docDomainParts[docDomainPartsLen-1];
}
docDomainPartsLen = docDomainParts = null;


// Overlay configurations.
//  The video player is configured in playVideo() due to the requirement of
//  the Video ID.
overlayConfigs = {};
overlayConfigs.modal = { // Generic Modal
	'autoDimensions':true,
	'autoScale' : false,
	'centerOnScroll': true,
	'enableEscapeButton': true,
	'height':'auto',
	'hideOnOverlayClick': true,
	'margin':0,
	'modal':false,
	'overlayColor': '#666',
	'overlayOpacity': 0.7,
	'padding':0,
	'scrolling' : 'no',
	"showCloseButton":false,
	"titleShow":false,
	'showNavArrows': false,
	'transitionIn' : 'none',
	'transitionOut' : 'none',
	'width':'auto'
};
overlayConfigs.nonModal = { // Generic Non-Modal
	'autoDimensions':true,
	'enableEscapeButton': true,
	'height':'auto',
	'hideOnOverlayClick': true,
	'margin':0,
	'modal':false,
	'overlayShow': true,
	'overlayColor': 'transparent',
	'overlayOpacity': 0,
	'padding':0,
	"showCloseButton":false,
	'showNavArrows': false,
	"titleShow":false,
	'transitionIn' : 'none',
	'transitionOut' : 'none',
	'width':'auto'
};

// Quickview Overlay
overlayConfigs.quickview = $.extend(true, {}, overlayConfigs.modal, {
	'width' : 622,
	'height' : 500,
	'type' : 'iframe'
});

overlayConfigs.gallery = $.extend(true, {}, overlayConfigs.modal, {
	'width':898,
	'height':601,

	'type':'iframe'
});

// Quickview Overlay
overlayConfigs.content = $.extend(true, {}, overlayConfigs.modal, {
	'autoDimensions':false,
	'width' : 766,
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
			$('#fancybox-content').css({'height':'auto'})
			if(jQuery.fancybox) jQuery.fancybox.resize();

			//Hide the preloader and finally show the fancybox wrap. qc-14889
			$.fancybox.hideActivity();
			$('#fancybox-wrap').css({'visibility':'visible'});
			
		}, 1500);

		
		
	}
});

// Bopis 2 Overlay
overlayConfigs.bopis = $.extend(true, {}, overlayConfigs.modal, {
	"onComplete": function(currentArray, currentIndex, currentOpts) {
		active_BOPISFBConfig = currentOpts;

		// Re-attach the FB for needed links
		attachOverlays('#bopis2 .modal_overlay');

		// Add the show / hide store info toggle.
		$('#bopis2 .store_info_toggle').click(function(e) {
			e.preventDefault();
			mom = $(this).parent();
			if (mom.hasClass('single')) {
				mom.removeClass('single').addClass('double');
				$(this).text('Hide Store Info');
			} else {
				$(this).text('Show Store Info');
				mom.addClass('single').removeClass('double');
			}
			$('#bopis2 .bopis_store.double').not(mom).addClass('single').removeClass('double').find('.store_info_toggle').text('Show Store Info');
			if(jQuery.fancybox) jQuery.fancybox.resize();
		});

		// Toggle between Multi-store input and single store.
		$('#bopis2 .multistore_toggle').toggle(function() { /* first click, need to show multistore */
				$('#bopis2 .bopis_store.double').addClass('single').removeClass('double');
				$('#bopis_one_store').hide();
				$('#bopis_multi_store').show();
				$(this).text("Don't Split the Order");
				if(jQuery.fancybox) jQuery.fancybox.resize();
			}, function() { /* Second click, need to show single Store */
				$('#bopis2 .bopis_store.double').addClass('single').removeClass('double');
				$('#bopis_multi_store').hide();
				$('#bopis_one_store').show();
				$(this).text("Split this order among multiple stores");
				if(jQuery.fancybox) jQuery.fancybox.resize();
			}
		);


		// ZipCode Search
		$('#bopis2 #bopis_middle form').submit(function (e){

			var curParams, $zipCodetxt, myURL, new_zip, new_url;

			e.preventDefault();

			// Grab the URL of the current BOPiS FB. 
			myURL = active_BOPISFBConfig.href.split('?',2);

			// Kill the function if we do not have a URL.
			if (!myURL) {
				$('#bopis_error').text('Failed to grab URL for current BOPiS Page!');
				return;
			}

			// Get the new zipcode, validate, and reload
			$zipCodetxt = $('#tb_zipcode');
			new_zip = $zipCodetxt.val();

			if (f_isOnlyNumChars(new_zip) && new_zip.length == 5) {

				// Now, get the URL params of the current page, alter them and reload the page.
				curParams = f_getUrlParamsObj(myURL[1]);

				if (curParams) {
					curParams.mode = 'zipcode';
					curParams.searchSessionId = '';
					curParams.searchOriginId = '';
					curParams.zipcode = new_zip;
					new_url = myURL[0]+"?"+f_makeUrlParamsFromObj(curParams);

					if(jQuery.fancybox) {
						active_BOPISFBConfig.href=new_url;
						$.fancybox(active_BOPISFBConfig);
					}
				} else {
					$('#bopis_error').text("Failed to get FancyBox parameters.");
				}
			} else {
				$('#bopis_error').text("You must enter a valid zip code.");
			}
		})
		// /Zip Code Search

		// Add the close functionality
		$('#bopis2 .close').click(function() {
			if(jQuery.fancybox) { $.fancybox.close() }
		});

		// Unbind the MouseWheel
		$("#fancybox-wrap").unbind('mousewheel.fb');
	}
});
//PLUGIN THAT TAKES PARENT EL & CHILD EL TO MAKE EQUAL HEIGHT COLS
//USED IN FIXPODHEIGHTS
function _EqualColHeights(parentElement,childElement){
     $(parentElement).each(function(index){
  		thisParentsChild = $(this).children(childElement);
          	var numOfChildern = thisParentsChild.length;
			if(numOfChildern > 1){
               childHeights = new Array(); 
                    thisParentsChild.each(function(i){
                         ThisHeight = $(this).height(); 
                         childHeights[i]=ThisHeight;
                    });
               tallestChild = Math.max.apply(Math, childHeights); // find tallest height out of this row's array
               thisParentsChild.height(tallestChild); //give all this row's child pods the height of tallest pod
          }
     });
};


// Call on window.load by default. Can also be called any time to dynamically
// adjust the heights of all the pods.
function fixPodHeights(){
	$('.row').each(function(index){
          //first check to see if row has a rail
          if($(this).find('.rail').length > 0){
               var $rail = $(this).find('.rail'),
                   $mainC = $(this).find('.mainContent');
               var railHeight = $rail.height(),
                   mainContentHeight = $mainC.height();
               if(railHeight > mainContentHeight){
				   $mainC.css('min-height',railHeight); 
                              //$mainC.height(railHeight);               
               }else if(railHeight < mainContentHeight){
				   				$rail.css('min-height',mainContentHeight);
                                //$rail.height(mainContentHeight);
               }

          };
     });

     _EqualColHeights(".row",".pod");
     _EqualColHeights(".pod",".pod");
     $('.rail .pod').attr('style','');//remove all inline styles of rail pods quickfix
};

function attachOverlays(context) {
	var $overlays = (context)?$('.overlayTrigger',context):$('.overlayTrigger');

	$overlays.each(function(i){
		var $this = $(this), useConfig='',
		theRel = ($this.attr('rel'))?$this.attr('rel').toLowerCase():'';

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
			case 'custom': // Does not attach Fancybox
				$this.click(HD_lightbox);
				break;
			// All all new types above here otherwise you will mess up the default.
			case 'nonmodal': // fall through
			default:
				useConfig = overlayConfigs.nonModal;
				break;
		}

		if (useConfig) {
			$this.fancybox(useConfig);
		}
		$this.css({"visibility":"visible"});

	});
}

//A peformance hack for defect #15052 that takes the data-bopis attribute on the BOPIS button and makes 
//an href value so that bopis modal won't degrade if clicked prior to doc ready.
function bopisHrefReplace(){
	var hrefValue = $("a.bopis_button").attr("data-bopis");
	$("a.bopis_button").attr('href', hrefValue);
}



function attachQuickViewButtons() {
	$(".dynamic.product").hover(function(){
		$(this).find('.quickview_button').toggleClass('hide');
	})
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
LazyLoadJS = (function(){
	var files = [],
	    loadCalled = false;

	function _add(file) { files.push(file); }

	function _load() {
		loadCalled = true;
		for (var i=0,l=files.length; i<l; i++) {
			document.write("<scr" + "ipt src=" + "\"" + files[i] + "\" type=\"text/javascript\"" + "></sc" + "ript>" + "\n");
		}
	}

	function _debug() {
		try {
			console.log("files:\n", files.join("\n"));
			console.log("loadCalled:", loadCalled);
		} catch(e){
			
		}
	}

	return {
		"add" : function(file){ _add(file); },
		"load" : function(){ _load(); }, 
		"debug" : function(){ _debug(); }
	}
})();

//   	This function takes the shop all departments menu on the homepage
//	and auto expands it
function expandSAD (){
	$('body.homepage .switches').addClass('expanded');
};

function stripedTables (){
	$('table.tablePod tr:even').addClass('even');
};


$(window).load(function(){
	fixPodHeights();
	attachOverlays();
	attachQuickViewButtons();
	stripedTables();
	//expandSAD();

	// Add the fancybox close catcher
	$('.fbClose a').live('click', function(){ $.fancybox.close(); return false; });

});


/* FED Cookie Generic Cookie handling code */
function fed_CreateCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function fed_ReadCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function fed_EraseCookie(name) {
	fed_CreateCookie(name,"",-1);
}


/*
	Replicate the HD_lightbox functionality
	QC# 13990 & 11801
*/
function HD_lightbox() {
	var galleryOutput = '<div id="gallery_wrapper" class="clearfix"><a class="close_btn" href="#">CLOSE X</a><div id="galleryPlaceHolder">{{GALERY_HERE}}</div></div>',
	    ieWidthFix,
		galleryOverlayConfig, theLink;

	theLink = $(this).attr('href');
	$.ajax({
		url: theLink,
		async:false,
		success: function(newHTML){
			var newHTML = newHTML.replace(/[\n\t\r]/g,'').match(/<body>(.*)<\/body>/)[1],
			    matches;
			galleryOutput = galleryOutput.replace('{{GALERY_HERE}}',newHTML);
			//if ($.browser.msie) {
				//matches = newHTML.match(/width="(\d+).*"/))[1];
				//if (matches) {
					//ieWidthFix = matches+'px';
				//}
				
			//}
		}
	});

	galleryOverlayConfig = $.extend(true, {}, overlayConfigs.modal,{
		'onComplete': function() {
			$('.close_btn','#fancybox-wrap').click(function(){
				$.fancybox.close();
				return false;
			});
		},
		'padding':0,
		'autoScale':false,
		'transitionIn':'none',
		'transitionOut':'none',
		'scrolling':'no',
		'showCloseButton':false,
		'overlayOpacity':.70,
		'overlayColor' : '#666'
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
	if (allowExtras) { val = val.replace(/[-\.,]/g, '') }
	return Boolean(!(val.replace(/\d/g,'')));
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
function f_isNumeric(val) {return Boolean(((val-0)==val)&&(val.length>0));}

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
	if (allowSpaces) { val = val.replace(/\s/g, '') }
	return Boolean(!(val.replace(/[a-z]/ig,'')));
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
function f_getUrlParamsObj( inStr ) {
	var p, n, tmpOP, retObj = false;
	if (inStr) {
		retObj = {};
		// First remove the leading '?' if needed.
		inStr = inStr.replace(/^\?/,'');

		// Explode the string into "name=val" portions.
		p = inStr.split('&');
		tmpOP = "{";
		for (var i=0; i<p.length; i++) {
			if (i>0) { tmpOP += ', '; }
			n = p[i].split('=');
			tmpOP += '"'+n[0]+'":"'+unescape(n[1]).replace(/\\/g,'\\\\').replace(/\"/g,"\\\"").replace(/\'/g,"\\'")+'"';
		}
		tmpOP += '}'
		retObj = eval("("+tmpOP+")");
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
function f_makeUrlParamsFromObj( inObj ) {

	var retStr = false;

	if (inObj) {
		retStr = '';
		for (var i in inObj) {
			if (inObj.hasOwnProperty(i)) {
				if (retStr) { retStr+='&'; }
				retStr += escape(i)+'='+escape(inObj[i])
			}
		}
	}
	return retStr;
}

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
};
