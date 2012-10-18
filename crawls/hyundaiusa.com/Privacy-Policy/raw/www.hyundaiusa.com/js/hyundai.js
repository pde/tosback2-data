/*
Namespace: Hyundai
	Hyundai Global Hyundai class

File: Hyundai.js

About: Version
	1.0

Description:
	Global Framework Class

Requires:
	- jQuery 1.4.2+ <jquery.js> <http://jquery.com>
	
Last Modified:
	- $Date: 2011-12-22 11:46:31 -0500 (Thu, 22 Dec 2011) $
	- $Revision: 59 $
	- $LastChangedBy: brian.fegan $

*/

/**
 *	Class: Hyundai
 *		This is the parent class for the Hyundai project
 */
window.Hyundai = (function(self){
	
	// a flag to keep track if the Hyundai class has been initialized
	var initialized = false,
	
		/**
		 * The initialize method that kicks off all Hyundai functionality
		 */
		_initialize = function() {
		
			// called after page load
			if (initialized) {
				return;
			}
			
			// Set body element now that its available
			Hyundai.$body = $('body');
			
			// initialize relevant parent subclasses
			self.Centousel.initialize();
			
			initialized = true;
		
		};
	
	// jQuery representations of element references available for use throughout the Hyundai object
	self.$document			= $(document);
	self.$window			= $(window);
	self.$html				= $('html');
	self.$body				= null;
	
	/**
	 * Sets up the centered carousel interface
	 */
	self.Centousel = (function(){
		
		var	initialized = false,
		
			config = {
				$families: null,
				$tab: null,
				hasTransition: false,
				transitionDuration: 1500,
				slideDuration: 500
			},
			
			/**
			 * Callback function before tooltip window reveals.
			 * @param $tooltip	{Object} jquery object of the tooltip window
			 * @param pos 		{Object} contains the x/y coords that the tooltip will reveal at
			 * @param $trigger	{Object} jquery object of the trigger element causing the tooltip to reveal
			 * 
			 * @returns newPos	{Object} new x/y coords to have the tooltip reveal at
			 */
			_tooltipCallback = function($tooltip, pos, $trigger) {
			
				var offset	= $trigger.offset(),
					tWidth	= $tooltip.outerWidth(),
					minX	= config.$families.offset().left,
					maxX	= minX + config.$families.width(),
					newPos	= {};
				
				// center the tooltip window above the trigger element
				newPos.x = offset.left - ((tWidth - $trigger.outerWidth()+26) / 2);
				newPos.y = offset.top - $tooltip.outerHeight();
				
				// check to see if the x position is outside the bounds of the carousel
				if (newPos.x < minX) {
					newPos.x = minX;
				} else if ((newPos.x + tWidth) > maxX) {
					newPos.x = maxX - tWidth;
				}
				
				// add tooltip arrow
				$('<div class="tooltipArrow" />').appendTo($tooltip);
				
				// add close button
				$('<a href="#" class="btnClose"><span>close</span></a>').click(function(){
					$.tooltip('close', $trigger);
					return false;
				}).prependTo($tooltip);
				
				return newPos;
				
			},
			
			/**
			 * Callback function for when a carousel animation starts
			 * @param oCentousel {Object} object of data associated with this centousel
			 */
			_fnBeforeAnimate = function(oCentousel) {
			
				var $prevActive = config.$families.find('li.active'); 
			
				// highlight the proper tab
				config.$tab.eq(oCentousel.iCurrActiveIndex).addClass('active').siblings().removeClass('active');
				
				//destroy any current tooltips on the active list item
				$prevActive.tooltip('destroy');
				
				// if this browser doesn't support CSS3 transitions && 
				// the new active item is not the same as the current active item
				// fade out the current active list item, and fade in the new active item using jquery
				if ( config.hasTransition === false && parseInt($prevActive.attr('data-list-index'), 10) !== oCentousel.iCurrActiveIndex) {
					$prevActive.animate({'opacity': 0.1}, config.transitionDuration);
					oCentousel.$activeItem.animate({'opacity': 1}, config.transitionDuration);
				}
			
			},
			
			/**
			 * Callback function for when a carousel animation completes
			 * @param oCentousel {Object} object of data associated with this centousel
			 */
			_fnAfterAnimate = function(oCentousel) {
				
				// set up the click states on the list items of the centousel 
				config.$families.find('li').unbind().bind('click', function(){
					
					var $clickLi		= $(this), 
						iUpdateToIndex	= parseInt($clickLi.attr('data-list-index'), 10),	
						iDirection		= 1;
						
					// if the offsetLeft of the item clicked is less than the offsetLeft of the active item
					if ($clickLi.offset().left < config.$families.find('li.active').offset().left) {
						iDirection = -1;
					}
					
					// update the centousel active item
					config.$families.centousel('updateToIndex', iUpdateToIndex, iDirection);
					
					return false;
					
				});
				
				// set up tooltips on the active list item
				config.$families.find('li.active').tooltip({
					delay			: 250,
					fnCallback		: _tooltipCallback,
					dataClass		: 'tooltipData',
					reposition		: false
				});
				
			},
			
			/**
			 * Sets up the UI for the main site navigation
			 */
			_initialize = function() {
				
				// only allow initialize on first page load
				if (initialized) {
					return;
				}
				
				// get the families and tab elements
				config.$families	= $('#families');
				config.$tab			= $('.tab');
				
				// if this browser supports CSS3 transitions 
				if (self.Util.getSupportedProp('transition')) {
					
					// set our internal flag
					config.hasTransition = true;
					
					// add classes that add our transition properties AND use the quickTransition class
					// so those properties don't animate when the page first loads
					config.$families.addClass('quickTransition hasTransition');
					
					// after the same transition duration in the CSS, remove the quickTransition class
					window.setTimeout(function(){
						config.$families.removeClass('quickTransition');
					}, config.transitionDuration);
					
				}
				
				// it does not support transitions, so we are not specifying an opacity of 1
				// in the CSS for active items. instead, we immediately make the active item fully visibile here
				// and use the centousel callbacks to handle the fades using jquery instead of css3
				else {
					config.$families.find('.active').css('opacity',1);
				}
				
				// set up the centered infinite carousel
				config.$families.centousel({
					iColWidth		: 192,
					iAnimateSpeed	: config.slideDuration,
					fnAfterAnimate	: _fnAfterAnimate,
					fnBeforeAnimate	: _fnBeforeAnimate
				});
				
				// set up tab click handler
				config.$tab.click(function(){
					config.$families.centousel('updateToIndex', config.$tab.index($(this)));
					return false;
				});
				
				initialized = true;
				
			};
		
		/**
		 * Protected methods for the self.Centousel subclass.
		 */
		return {
			initialize: _initialize
		};
		
	})();
	
	/**
	 * Sets up utility functionality
	 * Available as "Hyundai.Util" as its exposed in the return block for Hyundai
	 */
	self.Util = (function(){

        /**
    	 * Determines the right style property to use based on the user's browser. Takes in a css 
    	 * property, and returns the JavaScript style property associated with it for user's browser.
    	 * @param prop {String} the css property we want to check against 
    	 */
		var  _getSupportedProp = function(prop){
        	
				var root	= document.documentElement, //reference root element of document
					vendors	= ['','Moz','Webkit','ms','O'], // vendor prefixes, along with '' for spec
					prop	= _toCamelCaseString(prop),
					vProp,
					i;
				
				// check against the vendor list
				for (i=0; i<vendors.length; i++){
					vProp = (vendors[i] !== '') ? vendors[i] + prop : prop.charAt(0).toLowerCase() + prop.substr(1);
					if (typeof root.style[vProp] === 'string'){ 
						root = null;
						return vProp;
					}
				}
				
				// clean up memory
				root = null;
				
			},
			
			/**
			 * Takes in a string, and a join delimiter, removes hyphens and camel-cases it
			 * @param str		{String}	the string we want to convert
			 * @param joinStr	{String}	the string we want to join on
			 * @param lcase		{Boolean}	if we want to lowercase the first character
			 */
			_toCamelCaseString = function(str, joinStr, lcase) {
				var stringArr = str.split('-');
				for (var i=0, len=stringArr.length; i<len; i++) {
					stringArr[i] = stringArr[i].charAt(0).toUpperCase() + stringArr[i].substr(1).toLowerCase();
				}
				str = stringArr.join(((joinStr) ? joinStr : ''));
				if (lcase) {
					str = str.charAt(0).toLowerCase() + str.substr(1);
				}
				return str;
			};

		/**
		 * Protected methods for the self.Util subclass, which we will make public as Hyundai.Util
		 */
		return {
			getSupportedProp	: _getSupportedProp,
			toCamelCaseString	: _toCamelCaseString
		};
			
	})();
	
	/**
	 * Hyundai Public Variables & Methods:
	 * Instead of returning the entire Hyundai class as self so all of its methods and/or subclasses
	 * are publicly available, we only expose what we want to expose.
	 */ 
	return {
		initialize			: _initialize,
		Util				: self.Util,
		$document			: self.$document,
		$window				: self.$window,
		$html				: self.$html,
		$body				: self.$body
	};
	
})(window.Hyundai || {});

// Initialize functionality
$(document).ready(Hyundai.initialize);