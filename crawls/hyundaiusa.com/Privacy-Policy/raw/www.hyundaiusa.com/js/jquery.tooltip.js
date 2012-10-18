/**	
 * Tooltip
 * @author Brian Fegan (AKQA)
 * 
 * Looks for elements that have the "tooltip" class, and sets up stylized tooltip elements based on their "title" or
 * "data-tooltip-title" attributes. Or a specific HTML element nested within the trigger element can be specified by
 * class name, and then that element is used as the tooltip data.
 * 
 * @setup
 *	<a href="#" class="tooltip" title="Lorem ipsum dolor sit amet - Consectetur adipiscing elit. Fusce id quam eget risus consectetur sodales.">What Is This?</a>
 *	<span class="tooltip" data-tooltip-title="Lorem ipsum dolor sit amet - Consectetur adipiscing elit. Fusce id quam eget risus consectetur sodales.">What is This?</span>
 *	<div class="tooltip"><div class="[dataClass]">Lorem ipsum dolor sit amet - Consectetur adipiscing elit. Fusce id quam eget risus consectetur sodales.</div>What is This?</div>
 * 
 * @methods
 * Initialize the plugin, ele represents the scope to search within
 * $(ele).tooltip();
 * 
 * Unbind events bound to triggers previously set up within the ele scope
 * $(ele).tooltip('destroy');
 * 
 * Programmatically close an open tooltip window, where ele represents the trigger that opened it
 * $.tooltip('close', ele);
 */
/*global window, jQuery */
(function ($) {
	
	var oDefaults	= {
			animateReveal: false,	// animate the tooltip reveal 
			dataClass: null,		// if passed in, plugin uses this class to populate tooltip data, and not title or data-tooltip-title attributes
			delay: 1000,			// delay in milliseconds to hide the tooltip				
			easing: 'swing',		// the easing method of the display animation
			fnCallback: null,		// callback function called when tooltip reveals
			fnSetTimer: null,		// a set timer callback that can be used to mix timeout functions outside of the plugin
			fnClearTimer: null,		// a clear timer callback that can be used to mix timeout functions outside of the plugin
			reposition: true,		// check for page limits and reposition depending on window size and mouse position
			titleDelimiter: null,	// used to break up the tooltip content to add a title (i.e. ' - ') for different styling.
			tooltipOffset: 22,		// number of pixels tooltip is offset from its trigger element
			tooltipActive: true,	// if true, hovering over the tooltip window is the same as hovering over its trigger
			width: 300,				// default width for the tooltip window
			zIndex: 100				// default z-index
		},
		methods = {}, // contains publicly accessibly methods
		oSettings,
		oTimer,
		sTipData,
		$body,
		$tooltip,
		$window	= $(window),
		
		/**
		 * Adds the tooltip markup to the body of the document
		 */
		appendTooltipMarkup = function() {
			$tooltip = $('<div />').attr('id','tooltip').css({
				'display'		: 'block',
				'visibility'	: 'hidden',
				'position'		: 'absolute',
				'z-index'		: oSettings.zIndex,
				'width'			: oSettings.width
			}).bind('mouseenter', clearPluginTimeout).bind('mouseleave', fireHideTooltip);
			$body.append($tooltip);
		},
		
		/**
		 * For when user mouseleaves the actual tooltip window. Get the trigger that launched it
		 * and call hideToolTip on it.
		 */
		fireHideTooltip = function() {
			$trigger = $tooltip.data('$trigger');
			hideToolTip.call($trigger.get(0));			
		},
		
		/**
		 * For when user mouseenters the actual tooltip window. Clear the timeout that will
		 * hide the tooltip window.
		 */
		clearPluginTimeout = function() {			
			if (oSettings.fnSetTimer && oSettings.fnClearTimer) {
				oSettings.fnClearTimer();
			} else {
				window.clearTimeout(oTimer);
			}
		},
		
		/**
		 * Retrieves the x,y for the tooltip based on the trigger and the available window size
		 * @param $trigger {HTMLElement} the html element that triggers the tooltip reveal
		 * @return pos {Object} object containing the x/y coords to display the tooltip at
		 */
		getToolTipPos = function($trigger) {
			
			var triggerWidth	= $trigger.outerWidth(),
				triggerHeight	= $trigger.outerHeight(),
				tipWidth		= $tooltip.outerWidth(),
				tipHeight		= $tooltip.outerHeight(),
				offset			= $trigger.offset(),
				pos				= {},
				winScrollLeft	= $window.scrollLeft(),
				winScrollTop	= $window.scrollTop(),
				winWidth		= $window.width() + winScrollLeft,
				winHeight		= $window.height() + winScrollTop;
			
			// get default pos
			pos.x = offset.left + triggerWidth + oSettings.tooltipOffset;
			pos.y = offset.top + triggerHeight + oSettings.tooltipOffset;
			
			// check if window size can fit default positions, otherwise reset
			if (oSettings.reposition) {
				pos.x = ((pos.x + tipWidth) > winWidth) ? (pos.x - oSettings.tooltipOffset - triggerWidth - tipWidth) : pos.x;
				pos.y = ((pos.y + tipHeight) > winHeight) ? (pos.y - oSettings.tooltipOffset - triggerHeight - tipHeight) : pos.y;
			}
			return pos;
			
		},
		
		/**
		 * Event handler for showing the custom tooltip on mouseenter
		 */
		showToolTip = function() {
			
			var $trigger = $(this),
				sHtml,
				delimiterIndex,
				pos,
				newPos;
			
			// clear hide tooltip timeouts
			clearPluginTimeout();
			
			// get the tooltip text here since it may have already been reset but possibly not yet hidden
			// if the trigger has a nested data element, and not a title or data-tooltip-title attribute
			if (oSettings.dataClass) {
				sTipData = $.trim($trigger.find('.'+oSettings.dataClass).html());
			}
			
			// if the trigger has a title attribute 
			else if ($trigger.attr('title') && $trigger.attr('title').length) {
				sTipData = $trigger.attr('title');
				$trigger.attr('title', '');
			}
			
			// if the trigger has a data-tooltip-title attribute
			else if ($trigger.attr('data-tooltip-title') && $trigger.attr('data-tooltip-title').length) {
				sTipData = $trigger.attr('data-tooltip-title');
			}
			
			// else there is no data for this trigger
			else {
				sTipData = '';
			}
			
			// if the tip we want to show is NOT currently being displayed
			if ( ! $trigger.hasClass('activeTip') ) {
					
				// if no tip text, just hide and empty the tooltip element
				if ( sTipData.length === 0 ) {
					$tooltip.css('visibility','hidden').empty();
					return;
				}
				
				// remove activeTip class from all triggers (not just within this scope), add it to this particular trigger
				$('.tooltip', $body).removeClass('activeTip');
				$trigger.addClass('activeTip');
				
				$tooltip.data('$trigger', $trigger);
				
				// if this instance is using a title delimiter
				if (oSettings.dataClass) {
					sHtml = '<div class="'+oSettings.dataClass+'">'+sTipData+'</div>';
				} else if (oSettings.titleDelimiter) {
					delimiterIndex = sTipData.indexOf(oSettings.titleDelimiter);
					sHtml = (delimiterIndex !== -1) ? '<h3>'+sTipData.substring(0,delimiterIndex)+'</h3>'+'<p>'+sTipData.substring(delimiterIndex+(oSettings.titleDelimiter.length))+'</p>' : '<p>'+sTipData+'</p>';
				} else {
					sHtml = '<p>'+sTipData+'</p>';
				}
				
				// populate the tooltip
				$tooltip.html(sHtml);
				
				// get the position to display the tooltip properly
				pos = getToolTipPos($trigger);
				
				// if callback is defined, execute it before tooltip reveals
				if (oSettings.fnCallback && typeof oSettings.fnCallback === 'function') {
					newPos = oSettings.fnCallback($tooltip, pos, $trigger);
					if (newPos) {
						pos = newPos;
					}
				}
				
				// show the tooltip
				if (oSettings.animateReveal) {
					$tooltip.css({
						'top'			: Number(pos.y + oSettings.tooltipOffset) + 'px',
						'left'			: pos.x + 'px',
						'visibility'	: 'visible'
					}).animate({
						'top'	: pos.y + 'px'
					}, 100, oSettings.easing);
				
				} else {

					$tooltip.css({
						'top'			: pos.y +20+ 'px',
						'left'			: pos.x + 'px',
						'visibility'	: 'visible'
					});
					var wow =($('#tooltip').css('left'));
                    if(wow == 397.5){
						($('#tooltip').css(0));
						}
				} if ( $trigger.hasClass('ladj') ) {
					 	
						$tooltip.css({
						'top'			: pos.y +20+ 'px',
						'left'			: pos.x +-80+ 'px',
						'visibility'	: 'visible'						
					});
				   }
				   if ( $trigger.hasClass('radj') ) {
					 	
						$tooltip.css({
						'top'			: pos.y +20+ 'px',
						'left'			: pos.x +60+ 'px',
						'visibility'	: 'visible'
					});
				   }
			} 
		},
		
		/**
		 * Event handler on mouseleave to hide the tool tip
		 */
		hideToolTip = function() {
			
			var $trigger	= $(this),
				callbackFn	= function(){	
					$trigger.removeClass('activeTip');
					$tooltip.css('visibility','hidden').empty();
				};
			
			// if this trigger is the currently active tooltip 
			if ( $trigger.hasClass('activeTip') ) {
				
				// if this trigger has a title attribute, reset it
				if (!oSettings.dataClass && $trigger.filter('[title]').length) {
					$trigger.attr('title',sTipData);
				}
				
				// set timeout to hide tooltip
				if (oSettings.fnSetTimer && oSettings.fnClearTimer) {
					oSettings.fnSetTimer(callbackFn, oSettings.delay);
				} else {
					oTimer = window.setTimeout(callbackFn, oSettings.delay);
				}
				
			}
			
		},
		
		/**
		 * Event handler to cancel click event for triggers that are anchors
		 * @param e {Object} event object
		 */
		cancelClickEvent = function(e) {
			e.preventDefault(); // return false cancels bubble which we may want
		};
	
	/**
	 * A publicly accessible destroy method that gets called on an element or series of elements.
	 * Unbinds all event handlers to the triggers based on the scope passed in.
	 * @returns this {Object} the jquery collection passed in
	 */
	methods.destroy = function () {
		$('.tooltip', this).unbind('mouseenter.tooltip mouseleave.tooltip click.tooltip');
		return this;
	};
	
	/**
	 * A publicly accessible close method that immediately hides the tooltip
	 * @param $trigger {Object} jquery object representing the trigger that last opened the tooltip window
	 */
	methods.close = function ($trigger) {
		var tempDelay = oSettings.delay;
		oSettings.delay = 0;
		hideToolTip.call($trigger);
		oSettings.delay = tempDelay;
	};
		
	/**
	 * A publicly accessible initialize method that gets called on an element or series of elements.
	 * Sets up the tooltip element if it does not exist. Adds event handlers to the triggers based
	 * on the scope passed in.
	 * @param oOptions {Object} the options passed in to the plugin to extend into the plugin defaults
	 * @returns this {Object} the jquery collection passed in
	 */
	methods.init = function (oOptions) {
		
		// merge our passed in options and defaults
		oSettings = $.extend({}, oDefaults, oOptions || {});
		
		// delay can't be less than 250 if hovering over the tooltip window
		// keeps the tooltip displaying as well. otherwise the trigger mouseleave fires too soon
		if (oSettings.tooltipActive && oSettings.delay < 250) {
			oSettings.delay = 250;
		}
		
		// set body, scope, tooltip and triggers
		$body		= $('body');
		$tooltip	= $('#tooltip');
			
		// append initial tooltip markup if it does not exist
		if ($tooltip.length === 0) {
			appendTooltipMarkup();
		}
		
		// unbind any tooltip events that may already exist for triggers within the current scope
		methods.destroy.call(this);
		
		// set up events on all the tooltip trigger elements in this scope
		$('.tooltip', this).bind('mouseenter.tooltip', showToolTip).bind('mouseleave.tooltip', hideToolTip).bind('click.tooltip', cancelClickEvent);

		// make this plugin chainable by returning the object passed in
		return this;
		
	};
	
	/**
	 * Set up the jQuery plugin and chaining. If the argument passed in matches a method in this closure,
	 * call it. If not, call the init method. Pass in the options if they exist.
	 */ 
	$.tooltip = $.fn.tooltip = function (method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		}		
	};
	
}(jQuery));