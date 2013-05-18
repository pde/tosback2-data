var bridgeParentsLogo = jQuery('').attr('src','/images/bridge/parents-logo.gif'); 
var bridgeTeachersLogo = jQuery('').attr('src','/images/bridge/teachers-logo.gif'); 
var bridgeSign = jQuery('').attr('src','/images/bridge/sign.gif'); 
var bridgeYouAreLeaving = jQuery('').attr('src','/images/bridge/youareleaving.gif'); 

var cursorFix = false;
var bridgeActive = false;
var osName = '';

if (bridgeNoConflict(location.hostname, location.pathname) == true) {
	jQuery.noConflict();
};

jQuery(document).ready(function() {

	//----------------------------------
	//----------------------------------
	// November 3, 2011
	//----------------------------------
	// CF and JPW temporarily commented out both the EVENT TRACKING CLICK EVENTS (see bottom) and this instantiating GETTRACKER string assignment for SPONSOR TRACKING.
	// (We left in the generic, non-sponsor-bound GA event trackings.)
	// As soon as we have an actual sponsor, that requires actual Event Tracking, BE SURE TO UN-COMMENT EACH OF THESE LINES/BLOCKS.
	// And make sure that the GETTRACKER UA string (i.e., ua-4005001-4) is really and truly accurate against the proper online GA account.
	// ...For both Soup and Live.
	//
	// -- JPW and CF
	//----------------------------------
	//----------------------------------

	// First, get the global GA tracker variable ready
	if (typeof(_gat) == 'object')
	{ 
		//partnerPageTracker	= _gat._getTracker("UA-4005001-4");
	}
	currentUrl = window.location.href;



	if (typeof customBridgeOpacity == 'undefined' ) customBridgeOpacity = '.8';
	// Preload bridge images
	
	// jQuery.preloadImages('/images/bridge/parents-logo.gif', '/images/bridge/teachers-logo.gif', '/images/bridge/sign.gif', '/images/bridge/youareleaving.gif');
	
	var bridgeSponsorImages = new Array();
	
	jQuery('a').not('.not-bridge').each(function(i){
		if (jQuery(this).attr('class') == 'pbskids_bridge_sponsor') {
			// alert('Sponsor Image Preloaded');
			bridgeSponsorImages[i] = new Image();
			bridgeSponsorImages[i].src = jQuery(this).attr('rel');
			// jQuery.preloadImages(rel);
		}
	 });

						   
	jQuery('a, area').not('.not-bridge').click(function() {
		if ( (( bridgeURLs(this.hostname, this.pathname) == true ) && bridgeURLs(window.location.hostname, window.location.pathname) == false ) && (jQuery(this).attr('href').indexOf('javascript:') == -1) ) {
				var pathnameslash = '';
				if (this.pathname.substring(0, 1) != '/') { pathnameslash = '/'; };
				return (bridge((jQuery(this).attr('href')), jQuery(this).attr('title'), jQuery(this).attr('class'), jQuery(this).attr('rel'), jQuery(this).attr('rev')));
		};
	});	

});

function flashBridge(href, title) {
	if (bridgeURLs(window.location.hostname, window.location.pathname) == false) {
		bridge(href, title);
	} else {
		window.location.href = href;
	}
};

function bridge(linkhref, linktitle, linkclass, linkrel, linkrev) {	

	// Make arguments optional
	if (typeof linkclass == 'undefined' ) linkclass = 'default';
	if (typeof linkrel == 'undefined' ) linkrel = 'default';
	if (typeof linkrev == 'undefined' ) linkrev = 'default';
	// Split linkhref into hostname and pathname
	var linkhrefSplit = linkhref.split('//');
	if (linkhrefSplit.length > 1) {
		linkhrefSplit = linkhrefSplit[1].split('/');
		// alert(linkhrefSplit.length);
		var hostname = linkhrefSplit[0];
		var pathnamestring = '';
		for (var i=1;i<linkhrefSplit.length;i++) {
			pathnamestring += '/' + linkhrefSplit[i];
		}
		pathname = pathnamestring;
		// var pathname = linkhrefSplit[1];
		if (typeof pathname == 'undefined') { pathname = '' };
	} else {
		pathname = linkhrefSplit[0];
		var windowhref = window.location.href;
		windowhref = windowhref.split('//');
		windowhref = windowhref[1].split('/');
		hostname = windowhref[0];
	}
	
	if ( bridgeActive == false ) {
				
		var documentWidth = jQuery(window).width();
		var documentHeight = jQuery(document).height();
						  
		// Configuration Variables . All sizes are pixels
		bridgeHeight = 210;
		if( (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPhone/i)) ) {
			bridgeWidth = documentWidth * 0.9;
		} else {
			bridgeWidth = 370;			
		}
		bridgeBorder = 10;
		bridgePadding = 15;
						 
		// Attach bridge event to all links not going to pbskids.org or soup.pbskids.org
		
		bridgeActive = true;
	
		if (pathname.substring(0,1) == '/') { bridgeLinkPathname = pathname; }
		else { bridgeLinkPathname = '/' + pathname; }
		
		// If link has a linktitle attribute, use it for bridge link
		if ( linktitle ) {
			bridgeLinkTitle = linktitle;
		}
		// If not, use the URL itself
		else {
			bridgeLinkTitle = hostname + bridgeLinkPathname;
			// If url is longer than 50 characters, cut the URL short and append '...'
			if ( bridgeLinkTitle != bridgeLinkTitle.substring(0, 20) ) {
				bridgeLinkTitle = bridgeLinkTitle.substring(0, 20) + '&hellip;';
			}
		}
		bridgeLink = linkhref;
		
		// Accesses function from bridge.urls.js where templates are specified
		bridgeTemplate = bridgeURLTemplates(hostname, pathname, linkclass);

	
		// A/B Testing
		// var coinFlip = Math.floor(Math.random()*2);
		var coinFlip = 0;
		var testSegment;
		coinFlip == 0 ? testSegment = 'alpha' : testSegment = 'beta';
		
		// Turn all bridge templates to default except sponsor

		if (testSegment == 'beta' && bridgeTemplate != 'sponsor') {
			bridgeTemplate = 'default';
		}
		
		// alert(hostname + ' ' + pathname);


		
		if ( bridgeTemplate == 'parentsSection' ) {
			bridgeLinkTitle = 'the Parents&nbsp;and&nbsp;Teachers&nbsp;section';	
		}
		
		bridgeBackground = '#b3ce34';
		bridgeTitleBackground = '#b3ce34 url(/images/bridge/youareleaving.gif) no-repeat 50% 50%';
		bridgeX = 'bridge-x.gif';
		bridgeLinkColor = '#516F00';
		bridgeTextColor = '#ffffff';		
		
		if (navigator.appVersion.indexOf("Mac") != (-1) ) { osName="MacOS"; }
		cursorFix = bridgeCursorFix(window.location.hostname, window.location.pathname);
		
		jQuery('object, embed').each(function(){
			var windowMode = jQuery(this).attr('wmode');
			if (typeof windowMode == 'undefined') {
				windowMode = jQuery('object').find("param[name='wmode']").attr('value');
			}
			if( (windowMode != 'transparent' && windowMode != 'Transparent' && windowMode != 'opaque' && windowMode != 'Opaque') || (osName == 'MacOS' && cursorFix == true)) {
				this.style.visibility = 'hidden';
			};
		});
		
		// Create bridge overlay elements
		if ( bridgeTemplate == 'parents' || bridgeTemplate == 'parentsSection' ) {
			
			jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge"><div id="bridgeInner"><h3>You are now leaving PBS KIDS</h3><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></p><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeSignLink"><img src="/images/bridge/sign.gif" id="sign" width="213" height="92" alt="" /><img src="/images/bridge/parents-logo.gif" id="parentsLogo" width="159" height="27" alt="PBS Parents" /></a></p><a href="" id="close" title="Back to PBS KIDS"><img src="/images/bridge/back-arrow.gif" width="55" height="67" alt="Back" /></a></div></div>');
			
			jQuery('#bridge h3').css({
				'background' : bridgeTitleBackground,
				'border' : '0',
				'height' : '100px',
				'left' : (bridgeWidth - 280) / 2 + 'px',
				'margin' : '0',
				'padding' : '0',
				'position' : 'relative',
				'text-indent' : '-3000px',
				'width' : '280px'
			});
			
			jQuery('#bridgeInner a.bridgeLink').css({
				'color' : bridgeLinkColor,
				'display' : 'block',
				'font-family' : 'Arial, Verdana, sans-serif',
				'font-size' : '14px',
				'margin' : '0 20px 0 34px',
				'padding' : '0 0 100px 0',
				'text-align' : 'center',
				'width' : '300px'
			});
			
			jQuery('#bridgeInner a.bridgeSignLink').css({
				'bottom' : '0',
				'display' : 'block',
				'height' : '92px',
				'left' : '10px',
				'margin' : '0 80px',
				'outline' : 'none',
				'position' : 'absolute',
				'width' : '213px'
			});
			
			jQuery('#parentsLogo').css({
				'left' : '20px',
				'position' : 'absolute',
				'top' : '18px'
			});
			
		} else if ( bridgeTemplate == 'teachers' ) {
			
			jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge"><div id="bridgeInner"><h3>You are now leaving PBS KIDS</h3><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></p><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeSignLink"><img src="/images/bridge/sign.gif" id="sign" width="213" height="92" alt="" /><img src="/images/bridge/teachers-logo.gif" id="teachersLogo" width="138" height="33" alt="PBS Teachers" /></a></p><a href="" id="close" title="Back to PBS KIDS"><img src="/images/bridge/back-arrow.gif" width="55" height="67" alt="Back" /></a></div></div>');
			
			jQuery('#bridge h3').css({
				'background' : bridgeTitleBackground,
				'border' : '0',
				'height' : '100px',
				'left' : (bridgeWidth - 280) / 2 + 'px',
				'margin' : '0',
				'padding' : '0',
				'position' : 'relative',
				'text-indent' : '-3000px',
				'width' : '280px'
			});
			
			jQuery('#bridgeInner a.bridgeLink').css({
				'color' : bridgeLinkColor,
				'display' : 'block',
				'font-family' : 'Arial, Verdana, sans-serif',
				'font-size' : '14px',
				'margin' : '0 20px 0 34px',
				'padding' : '0 0 100px 0',
				'text-align' : 'center',
				'width' : '300px'
			});
			
			jQuery('#bridgeInner a.bridgeSignLink').css({
				'bottom' : '0',
				'display' : 'block',
				'height' : '92px',
				'left' : '10px',
				'margin' : '0 80px',
				'outline' : 'none',
				'position' : 'absolute',
				'width' : '213px'
			});
				
			jQuery('#teachersLogo').css({
				'left' : '30px',
				'position' : 'absolute',
				'top' : '14px'
			});
			
		} else if ( bridgeTemplate == 'sponsor' ) {
				
			bridgeWidth = bridgeWidth + 100;
			
			jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge"><div id="bridgeInner"><h3>You are now leaving PBS KIDS</h3><p id="bridgeSponsorText"><a href="' + bridgeLink + '" class="bridgeImageLink"><img src="' + linkrel + '" /></a><span id="bridgeInvisibleBlock"></span>' + linkrev + '</p><p class="sponsorTextLink"><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></p><p id="bridgeClear"><!-- --></p><a href="" id="close" title="Back to PBS KIDS"><img src="/images/bridge/back-arrow.gif" width="55" height="67" alt="Back" /></a></div></div>');
				
			jQuery('#bridgeInvisibleBlock').css({
				// 'border' : '1px solid red',
				'clear' : 'left',
				'display' : 'inline',
				'float' : 'left',
				'height' : '82px',
				'margin' : '0 0 0 -' + (jQuery('#bridgeSponsorText img').width() + 13) + 'px',
				'width' : jQuery('#bridgeSponsorText img').width() + 'px'
			});
				
			jQuery('#bridge h3').css({
				'background' : bridgeTitleBackground,
				'border' : '0',
				'height' : '100px',
				'left' : (bridgeWidth - 280) / 2 + 'px',
				'margin' : '0',
				'padding' : '0',
				'position' : 'relative',
				'text-indent' : '-3000px',
				'width' : '280px'
			});
				
			jQuery('#bridgeInner p.sponsorTextLink').css({
				// 'border' : '1px solid orange',
				'margin' : '0',
				'padding' : '10px 20px 13px ' + (jQuery('#bridgeSponsorText img').width() + 26) + 'px',
				'text-align' : 'center'
			});
				
			jQuery('#bridgeInner a.bridgeLink').css({
				'color' : bridgeLinkColor,
				'font-family' : 'Arial, Verdana, sans-serif',
				'font-size' : '14px'
			});
			
			jQuery('#bridgeSponsorText').css({
				'color' : bridgeTextColor,
				'font-size' : '12px',
				'margin' : '0',
				'padding' : '0 13px 0 ' + (jQuery('#bridgeSponsorText img').width() + 26) + 'px',
				'text-align' : 'left'
			});
			
			jQuery('#bridgeSponsorText img').css({
				'float' : 'left',
				'margin' : '0 0 0 -' + (jQuery('#bridgeSponsorText img').width() + 13) + 'px'
			});
				
			jQuery('#bridgeClear').css({
				// 'display' : 'none',
				// 'border' : '1px solid purple',
				'clear' : 'left',
				// 'float' : 'left',
				'height' : '0',
				'line-height' : '0',
				'margin' : '0',
				'padding' : '0'
			});
		
		} else if ( bridgeTemplate == 'pk-sponsor' ) {


					/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
					/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
					/* PK-SPONSOR
					/* First drafted by: Jon White
					/* Dependencies: /includes/pk-sponsor/pk-sponsor/*
					/* Original date: 09-21-2011
					/* Last modified: 10-06-2011
					/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
					/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
					
					// Line up variables...
					var usableHeadlineText			= $("#value-bridgeHeadlineText").text();
					var usableHeadlineColor			= $("#value-bridgeHeadlineColor").text();
					var usableBodyText				= $("#value-bridgeBodyText").html();
					var usableFeatureImage			= $("#value-bridgeFeatureImage").text();
					var usableFeatureAlt			= $("#value-bridgeFeatureAlt").text();
					var usableJumpBaseColor			= $("#value-bridgeJumpBaseColor").text();
					var usableJumpTextColor			= $("#value-bridgeJumpTextColor").text();
					var usableBridgeTrackingPixel	= $("#value-trackingPixelB").text();
			
					// Construct the bridge...
					//partnerPageTracker._trackEvent("Partner Bridge","Open Bridge",currentUrl);

					bridgeWidth = 637;
					usableBodyText = usableBodyText.replace(/\n/g,"<br>"); // Credit: http://stackoverflow.com/questions/2919337/jquery-convert-line-breaks-to-br-nl2br-equivalent
					bridgeBackground = '#ffffff';

					jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge" class="pk-sponsor-bridge"><div id="bridgeInner"></div></div>');

					jQuery('#bridgeInner')
						.append('<span class="advanceToDestination"><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink" style="background-color: ' + usableJumpBaseColor + '">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></span>')
						.append('<span class="backToPbsKids"><a href="#" id="close" title="Back to PBS KIDS">Back to PBS KIDS</a></span>')
						.append('<span class="closeWindow"><a href="#" id="secondaryClose" title="Close Window">Close Window</a></span>')
						.append('<img src="' + usableBridgeTrackingPixel + '" alt="" class="bridge-tracking" />')
						.append('<img src="' + usableFeatureImage + '" alt="' + usableFeatureAlt + '" class="bridge-feature" />')
						.append('<div class="bridge-prose" />');

					if(usableJumpTextColor == "#ffffff") {
						jQuery('.advanceToDestination a').addClass('bridgeLink-white');
					}
					
					jQuery('.bridge-prose')
						.append('<h1 style="color: ' + usableHeadlineColor + '">' + usableHeadlineText + '</h1>')
						.append('<div class="essay">' + usableBodyText + '</div>');

					
					jQuery('#bridgeInner').css({
						'height' : '336px'
					});
		

		} else {
			jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge"><div id="bridgeInner"><h3>You are now leaving PBS KIDS</h3><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></p><a href="" id="close" title="Back to PBS KIDS"><img src="/images/bridge/back-arrow.gif" width="55" height="67" alt="Back" /></a></div></div>');
				
			jQuery('#bridge h3').css({
				'background' : bridgeTitleBackground,
				'border' : '0',
				'height' : '100px',
				'left' : (bridgeWidth - 280) / 2 + 'px',
				'margin' : '0',
				//'padding' : '55px 0 20px 0',
				'padding' : '0',
				'position' : 'relative',
				'text-indent' : '-3000px',
				'width' : '280px'
			});
				
			jQuery('#bridge #bridgeInner a.bridgeLink').css({
				'color' : bridgeLinkColor,
				'cursor' : 'pointer',
				'display' : 'block',
				'font-family' : 'Arial, Verdana, sans-serif',
				'font-size' : '14px',
				'font-weight' : 'normal',
				'margin' : '0 20px 0 100px',
				'padding' : '0 0 20px 0',
				'text-align' : 'left',
				'text-decoration' : 'underline'
				//'width' : '200px'// this used to be commented...
			});
				
		}
			
		// All Styles necessary to get height
		
		jQuery('#bridgeInner p').css({
			'margin' : '0 0 1em 0'
		});
			
		jQuery('#bridgeInner a.bridgeLink').css({
			'cursor' : 'pointer',
			'font-weight' : 'normal',
			'text-decoration' : 'underline'
		});
			
		jQuery('a img').css({ 'border' : '0' });
				
		jQuery('#bridgeContainer').css({
			'background-color' : '#000000',
			'position' : 'absolute',
			'height' : documentHeight,
			// 'width' : '100%',
			'width' : documentWidth,
			'top' : '0',
			'left' : '0',
			'opacity' : '0',
			'text-align' : 'left',
			'z-index' : '10000'
		});			
			
		jQuery('#bridgeInner').css({
			'font-size' : '16px',
			'padding' : '1px',
			'line-height' : '1.4',
			'text-align' : 'left'
		});
			
		jQuery('#bridge').css({
			'background' : bridgeBackground,
			'font-family' : 'arial, verdana, sans-serif',
			'padding' : '1px',
			'position' : 'absolute',
			'width': (bridgeWidth - 2) + 'px',
			'left' : (documentWidth / 2) - (bridgeWidth / 2) + 'px',
			'opacity' : '0',
			'z-index' : '10002'
		});

		if (bridgeTemplate !== 'pk-sponsor') {
			jQuery('#close').css({
				'bottom' : '0',
				'display' : 'block',
				'height' : '67px',
				'left' : '15px',
				'outline' : 'none',
				'position' : 'absolute',
				'width' : '55px'
			});
		}

			
		// All post-height styles
			
		bridgeHeight = jQuery('#bridgeInner').height();
		// alert(bridgeHeight);
			
		jQuery('#bridgeOutline').css({
			'background' : '#ffffff',
			'position' : 'absolute',
			'width': (bridgeWidth * 1) + (bridgeBorder * 2) + 'px',
			'height' : (bridgeHeight + 2 * 1) + (bridgeBorder * 2) + 'px',
			'top' : (jQuery(window).height() / 2) - (bridgeHeight / 2) - (bridgeBorder * 1) + jQuery(window).scrollTop() + 'px',
			'left' : (documentWidth / 2) - (bridgeWidth / 2) - (bridgeBorder * 1) + 'px',
			'opacity' : '0',
			'z-index' : '10001'
		});
		
		jQuery('#bridge').css({
			'height' : bridgeHeight + 'px',
			'top' : (jQuery(window).height() / 2) - (bridgeHeight / 2) + jQuery(window).scrollTop() + 'px'
		});
			
		// Bridge behaviors
		
		if (typeof GA_obj !== 'undefined') {

			jQuery('.bridgeLink').click(function(){
				/*
				if (bridgeTemplate == 'pk-sponsor') {
					partnerPageTracker._trackEvent("Partner Bridge","Visit Partner",currentUrl);
				}
				*/
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'continue', 'textlink');
			});
			
			jQuery('.bridgeSignLink').click(function(){
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'continue', 'sign');
			});
			
			jQuery('.bridgeImageLink').click(function(){
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'continue', 'imagelink');
			});

		};
			
		jQuery('#bridgeContainer').animate({'opacity' : customBridgeOpacity}, 'fast', function() {
			jQuery('#bridgeOutline').animate({'opacity' : '1'}, 'fast');															   
			jQuery('#bridge').animate({'opacity' : '1'}, 'fast');
		});
			
		jQuery('#bridgeContainer').click(function() {
			if (typeof GA_obj !== 'undefined') {
				/*
				if (bridgeTemplate == 'pk-sponsor') {
					partnerPageTracker._trackEvent("Partner Bridge","Close Bridge",currentUrl);
				}
				*/
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'close', 'outside');
			}
			closeBridge();
		});

		jQuery('#close,#secondaryClose').click(function() {
			if (typeof GA_obj !== 'undefined') {
				/*
				if (bridgeTemplate == 'pk-sponsor') {
					partnerPageTracker._trackEvent("Partner Bridge","Close Bridge",currentUrl);
				}
				*/
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'close', 'arrow');
			}
			closeBridge();
			return false;
		});
		
		jQuery(document).keyup(function(event){
			if (event.keyCode == 27) {
				if (typeof GA_obj !== 'undefined') {
					/*
					if (bridgeTemplate == 'pk-sponsor') {
						partnerPageTracker._trackEvent("Partner Bridge","Close Bridge",currentUrl);
					}
					*/
					GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'close', 'escape');
				}
				closeBridge();
			}
		});
		
		function windowScrolled() {
			jQuery('#bridgeOutline').css({
				'top' : (jQuery(window).height() / 2) - (bridgeHeight / 2) - (bridgeBorder * 1) + jQuery(window).scrollTop() + 'px',
				'left' : (jQuery(window).width() / 2) - (bridgeWidth / 2) - (bridgeBorder * 1) + 'px'
			});
			jQuery('#bridge').css({
				'top' : (jQuery(window).height() / 2) - (bridgeHeight / 2) + jQuery(window).scrollTop() + 'px',
				'left' : (jQuery(window).width() / 2) - (bridgeWidth / 2) + 'px'
			});
		}
		
		function windowResized() {
			jQuery('#bridgeContainer').css({
				'height' : jQuery(document).height(),
				'width' : jQuery(window).width()
			});
			windowScrolled();
		}
		
		// Reposition bridge on scroll
		jQuery(window).bind("scroll", windowScrolled);
		
		// Resize container on resize event
		jQuery(window).bind("resize", windowResized);
	
		return false;
			
	} else {
		return false;
	};
	
	return true;

};

function closeBridge() {
	jQuery('#bridgeOutline').animate({'opacity' : '0'}, 'fast');
	jQuery('#bridge').animate({'opacity' : '0'}, 'fast', function() {
		jQuery('#bridgeContainer').animate({'opacity' : '0'}, 'fast', function() {
			jQuery('#bridge').remove();
			jQuery('#bridgeOutline').remove();
			jQuery('#bridgeContainer').remove();
			jQuery('object, embed').each(function(){this.style.visibility = 'visible';});
		});
	});
	jQuery(document).unbind('keyup');
	jQuery(window).unbind('scroll');
	jQuery(window).unbind('resize');
	bridgeActive = false;
};
