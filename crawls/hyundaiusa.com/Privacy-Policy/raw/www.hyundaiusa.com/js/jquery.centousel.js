/**
 * Centousel - A carousel UI that centers elements of various widths within the mask when they are in
 * their active state
 * @author Brian Fegan (AKQA)
 * 
 * The centousel's purpose is to allow the user to infinitely scroll through a list of items, where the  
 * widths of those items vary in length. However, each item must be divisible by the iColWidth for the 
 * centousel to function properly.
 * 
 * @methods
 * Initialize the plugin:
 * $('.centousel').centousel();
 * 
 * Update centousel to a specific start index:
 * $('.centousel').centousel('updateToIndex', index);
 * 
 * Stop centousel autorotate programmatically
 * $('.centousel').centousel('stopAutoRotate');
 * 
 * Start centousel autorotate programmatically
 * $('.centousel').centousel('startAutoRotate', [iAutoRotate]);
 */
/*global window, document, jQuery */
(function ($) {

	
	var oDefaults = {
			iColWidth		: 100,			// the base divisible width
			iAnimateSpeed	: 500,			// milliseconds used for animation
			iAutoRotate		: 0,			// milliseconds used for autorotation
			iLoadIndex		: 0,			// if we want to load the centousel to a specific index other than '0'
			fnBeforeAnimate	: null,			// callback for before the animation starts
			fnAfterAnimate	: null,			// callback for after the animation completes
			sColClass		: 'model',		// the base divisible className
			sEasing			: 'swing'		// default easing for animation
		},
		methods = {}, // contains publicly accessibly methods
		
		/* Plugin Private methods */
		
		/**
		 * This function gets called after the centousel position has been moved
		 * either by an animation or by a direct resetting of the left position
		 * 
		 * @param oCentousel	{Object}	the centousel we are working with
		 * @param iDirection	{Integer}	indicates the direction we just updated to
		 */
		updateCentouselComplete = function (oCentousel, iDirection) {
				
				$('#now_fix_1,#now_fix_2,#now_fix_3').click(function() {   
					$('.centousel li#adj .model').css('width',162);
		            $('.centousel li#adj').find('.model').eq(0).css('marginLeft',72);
	           });

			   
			var $cutItems,
				cutCt; 
		
			// direction animated is the RIGHT (iDirection === 1)
			// cut any where item's offset left + width is LT than 0
			if (iDirection > 0) {
				
				// we'll use a counter to minimize the DOM manipulation
				// going forward the counter starts at 0
				cutCt = 0;
				oCentousel.$currItems.each(function(){
					var $item			= $(this),
						iOffsetRight	= oCentousel.iCurrLeftPos + $item.position().left + $item.width();
					if (iOffsetRight < 0) {
						cutCt++;
					}
				});
				
				// use the counter to find the items to cut
				// reset the iCurrLeftPos for when we cut these items
				// move list and remove the $cutItems
				$cutItems				= oCentousel.$currItems.filter(':lt('+cutCt+')');
				oCentousel.iCurrLeftPos = oCentousel.iCurrLeftPos + getItemsWidth(oCentousel, $cutItems);
				oCentousel.$list.css('left',oCentousel.iCurrLeftPos+'px');
				$cutItems.remove();
				
			}
			
			// direction animated is the LEFT (iDirection === -1)
			// remove any items where its offsetLeft is GT than the mask width
			else {
				
				// we'll use a counter to minimize the DOM manipulation
				// going backward the counter starts at 1
				cutCt = 1;
				oCentousel.$currItems.each(function(){
					if ((oCentousel.iCurrLeftPos + $(this).position().left) > oCentousel.iMaskWidth) {
						cutCt++;
					}
				});
				
				// use the counter to find the items to cut
				oCentousel.$currItems.filter(':gt('+ (oCentousel.$currItems.length - cutCt) +')').remove();
				
			}
			
			// reset $currItems
			oCentousel.$currItems = oCentousel.$list.children();
			
			// we are done animating
			oCentousel.bAnimating = false;
			oCentousel.$centousel.removeClass('animating');
			
			// execute fnAfterAnimate
			if (oCentousel.fnAfterAnimate && typeof oCentousel.fnAfterAnimate === 'function') {
				oCentousel.fnAfterAnimate(oCentousel);
				
			}
			
		},
		
		/**
		 * Determines if the index we are working with is valid. Returns a valid index if it is not.
		 * 
		 * @param index		{Integer} the index we are checking against
		 * @param iNumItems	{Integer} the number of items in the set
		 * 
		 * @returns the adjusted index value
		 */
		getAdjustedIndex = function(index, iNumItems) {
			if (index >= iNumItems) {
				return (index - iNumItems);
			} else if (index < 0) {
				return (iNumItems + index)
			} else {
				return index;
			}
		},
		
		/**
		 * Checks to see if an item is present in the items we need to check against. If it is not present,
		 * we add it to the $newItems object passed in.
		 * 
		 * @param oCentousel	{Object} the centousel we are working with
		 * @param $checkItems	{Object} jquery object of items we are checking against
		 * @param index			{Integer} index of the current check
		 * @param $newItems		{Object} jquery object we are appending to and returning
		 * 
		 * @returns $newItems	{Object} jquery object that was passed in, with possible new items appended
		 */
		addNewItems = function(oCentousel, $checkItems, index, $newItems) {
			
			
			// check if this item is already present in our list in the direction we want to go
			var $item = $checkItems.filter('li[data-list-index='+index+']');
			
			// if its not present, append it to $newItems
			if (!$item.length) {
				if ($newItems) {
					$newItems = $newItems.add(oCentousel.$originalItems.eq(index).clone(true, true));
				} else {
					$newItems = oCentousel.$originalItems.eq(index).clone(true, true);
				}
			}
			
			return $newItems;
			
		},
		
		/**
		 * Returns a jquery object of the new items we need to add to the list
		 * 
		 * @param oCentousel	{Object} the centousel we are working with
		 * @param iDirection	{Integer} the direction we are moving (1 or -1)
		 * @param iSteps		{Integer} the number of steps we need to animate
		 * 
		 * @returns $newItems	{Object} jquery object of new items to append to the centousel list
		 */
		getNewItems = function(oCentousel, iDirection, iSteps) {
			
			var iActiveListIndex = oCentousel.$currItems.index(oCentousel.$activeItem),
				$checkItems,
				$newItems,
				i;
			
			// build out our array of indexes based on if we are going forward or backward
			if (iDirection > 0) {
				
				// create a list of items AFTER the activeItem in the current list
				$checkItems = oCentousel.$currItems.filter(':gt('+iActiveListIndex+')');
				
				// loop upwards through the steps adding new list items
				for (i=0; i<iSteps; i++) {
					$newItems = addNewItems(oCentousel, $checkItems, getAdjustedIndex((oCentousel.iCurrActiveIndex+1+i), oCentousel.iNumItems), $newItems);	
				}
				
			} else {
				
				// create a list of items BEFORE the activeItem in the current list
				$checkItems = oCentousel.$currItems.filter(':lt('+iActiveListIndex+')');
				
				// loop downwards through the steps adding new list items
				for (i=iSteps-1; i>=0; i--) {
					$newItems = addNewItems(oCentousel, $checkItems, getAdjustedIndex((oCentousel.iCurrActiveIndex-1-i), oCentousel.iNumItems), $newItems);
				}
				
			}			
			
			return $newItems;
			
		},
		
		/**
		 * This method kicks off a single instance of the centousel animation
		 * 
		 * @param oCentousel		{Object}	the centousel we are working with
		 * @param iDirection		{Integer}	direction we want to update towards
		 * @param iUpdateToIndex	{Integer}	an override that can be used to update to a specific index in the list
		 * @param bNoAnimate		{Boolean}	if true, we will immediate move list and NOT animate to new index
		 */
		updateCentousel = function (oCentousel, iDirection, iUpdateToIndex, bNoAnimate) {
			
			
			
			var $newItems,
				iNewLeft,
				iNewRight,
				iAdjustedIndex,
				ct = 1;
			
			// We are changing stuff, so prevent any further triggers
			oCentousel.bAnimating = true;
			oCentousel.$centousel.addClass('animating');
			
			// if a specific index was NOT passed in, set it based on iDirection
			if (iUpdateToIndex === undefined) {
				iUpdateToIndex = (iDirection > 0) ? (oCentousel.iCurrActiveIndex + 1) : (oCentousel.iCurrActiveIndex - 1);
			}
			
			// get the new items we need to insert to the list
			// based on how many steps is the current active item from the new active item
			$newItems = getNewItems(oCentousel, iDirection, Math.abs(iUpdateToIndex - oCentousel.iCurrActiveIndex));
			
			// if we are inserting tempItems
			if ($newItems) {
				
				// for when the direction to update is to the right
				// juut add the new items AFTER the existing items
				if (iDirection > 0) {
					oCentousel.$currItems.last().after($newItems);
				}
				
				// for when the direction to update is to the left
				// find the adjusted left pos of the instance since we are immediately inserting new items to the left
				// append the new element(s) and reset the left
				else {
					oCentousel.iCurrLeftPos = oCentousel.iCurrLeftPos - getItemsWidth(oCentousel, $newItems);
					oCentousel.$currItems.first().before($newItems);
					oCentousel.$list.css('left',oCentousel.iCurrLeftPos+'px');
				}
			
			}
			
			// set the new iCurrActiveIndex now that we've inserted any newitems
			oCentousel.iCurrActiveIndex = getAdjustedIndex(iUpdateToIndex, oCentousel.iNumItems);
			
			// set new $activeItem
			// NOTE: account for instances where we might have the item in the list in 2 places at this point
			if (iDirection > 0) {
				oCentousel.$activeItem = oCentousel.$list.find('li[data-list-index='+oCentousel.iCurrActiveIndex+']').last();
			} else {
				oCentousel.$activeItem = oCentousel.$list.find('li[data-list-index='+oCentousel.iCurrActiveIndex+']').first();
			}
			
			// find what iNewLeft needs to be for the list so the active item will be centered
			iNewLeft = getMidPointLeft(oCentousel, oCentousel.$activeItem);
			
			// IMPORTANT:
			// Lastly, its possible that there will be empty space to either side of the new $activeItem
			// So now we check if there is space, and if so, keep appending items until there is not.
			
			// for when the direction to update is to the RIGHT (iDirection === 1)
			if (iDirection > 0) {
				
				// find out where the right end of the list is 
				iNewRight = iNewLeft + getItemsWidth(oCentousel, oCentousel.$list);
				
				// while the end point of the list is less than the width of the mask
				// append another item at the end of the list and re-calculate
				while (iNewRight < oCentousel.iMaskWidth) {

					// find the next item index
					// get the next item to append
					iAdjustedIndex	= getAdjustedIndex( (oCentousel.iCurrActiveIndex + ct), oCentousel.iNumItems);
					$newItems		= oCentousel.$originalItems.eq(iAdjustedIndex).clone(true, true);
					
					// add the new items AFTER the existing items
					oCentousel.$list.append($newItems);
					
					// find the new right end point
					iNewRight = iNewLeft + getItemsWidth(oCentousel, oCentousel.$list); 
					
					// increment the counter
					ct++;
					
				}
				
			}
			
			// for when the direction to update is to the LEFT (iDirection === -1)
			else {
				
				// while the start point of the list is greater than the left position of the mask
				// prepend another item at the start of the list and re-calculate
				while (iNewLeft > 0) {
					
					// find the previous item's index
					// get the previous item to prepend
					iAdjustedIndex	= getAdjustedIndex( (oCentousel.iCurrActiveIndex - ct), oCentousel.iNumItems);
					$newItems		= oCentousel.$originalItems.eq(iAdjustedIndex).clone(true, true);
					
					// find the adjusted left pos of the instance since we are immediately
					// inserting new items to the left
					oCentousel.iCurrLeftPos = oCentousel.iCurrLeftPos - getItemsWidth(oCentousel, $newItems);
					
					// append the new element and reset the left
					oCentousel.$list.prepend($newItems);
					oCentousel.$list.css('left',oCentousel.iCurrLeftPos+'px');
					
					// find what left needs to be for the list so the active item is centered
					iNewLeft = getMidPointLeft(oCentousel, oCentousel.$activeItem);
					
					// increment the counter
					ct++;
					
				}
				
			}
			
			// set this list as the $currItems=====================================================================================================================
			oCentousel.$currItems = oCentousel.$list.children();
			
			// execute fnBeforeAnimate
			if (oCentousel.fnBeforeAnimate && typeof oCentousel.fnBeforeAnimate === 'function') {
				oCentousel.fnBeforeAnimate(oCentousel);
			}
			
			// update the active class to trigger CSS3 transitions as we are also animating the left position
			oCentousel.$activeItem.addClass('active').siblings().removeClass('active');
			
			// lets move the centousel
			if (bNoAnimate) {
				oCentousel.iCurrLeftPos = iNewLeft;
				oCentousel.$list.css('left', iNewLeft);
				updateCentouselComplete(oCentousel, iDirection);
			} else {
				oCentousel.$list.animate({
					left: iNewLeft
				}, oCentousel.iAnimateSpeed, oCentousel.sEasing, function () {
					oCentousel.iCurrLeftPos = iNewLeft;
					updateCentouselComplete(oCentousel, iDirection);
				});
			}

		},
		
		
		/**
		 * Event handler for when a user clicks a pagination button
		 */
		clickBtnPaginate = function () {
			
			var $anchor		= $(this),
				oCentousel	= $anchor.parents('.centousel').first().data('centousel');
			
			if ( !$anchor.hasClass('disabled') && !oCentousel.bAnimating ) {
				if (oCentousel.oRotateInterval !== undefined) {
					stopAutoRotate(oCentousel);
				}
				updateCentousel(oCentousel, (($anchor.hasClass('btnPrevious')) ? -1 : 1));
			}
			
			return false;
		},
		
		/**
		 * Takes in a specific index and updates the centousel to that index
		 * 
		 * @param oCentousel		{Object}	the centousel we are working with
		 * @param iUpdateToIndex	{Integer}	the start index of the next centousel items added
		 * @param iDirection		{Integer}	optional. the direction we want to animate
		 */
		updateToIndex = function(oCentousel, iUpdateToIndex, iDirection) {
			
			var iDirection;
			
			// if we have an oCentousel, a valid index and the centousel is not currently animating
			if ( oCentousel && !isNaN(parseInt(iUpdateToIndex, 10)) && !oCentousel.bAnimating ) {
				
				// clear the oRotateInterval if it exists
				if (oCentousel.oRotateInterval !== undefined) {
					stopAutoRotate(oCentousel);
				}
				
				// adjust the index
				iUpdateToIndex = getAdjustedIndex(iUpdateToIndex, oCentousel.iNumItems);
				
				// if we are NOT already on this item
				if (iUpdateToIndex !== oCentousel.iCurrActiveIndex) {
					
					// if the direction wasn't passed in, or its not passed in as 1 or -1
					// determine if we are animating forward or backward
					if (iDirection === undefined || (iDirection !== 1 && iDirection !== -1)) {
						if (iUpdateToIndex > oCentousel.iCurrActiveIndex) {
							iDirection = 1;
						} else  {
							iDirection = -1; 
						}
					}
					
					// update the centousel
					updateCentousel(oCentousel, iDirection, iUpdateToIndex);
		
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
		
		if ($.browser.msie && $.browser.version.substr(0,1)<=9){ 	
		 $('.active').next('li').css({ opacity: 0.1 });
		 $('.active').prev('li').css({ opacity: 0.1 });
		// $('.active').prev('li img').css({ opacity: 0.1 });
		 }
		 
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++		 
				}
			
			}
	
		},
		
		/**
		 * Determine the width of the items passed into this method. Finds the number of elements with the
		 * oCentousel.sColClass, and then multiplies that by the oCentousel.iColWidth
		 * 
		 * @param oCentousel	{Object} the centousel we are working with
		 * @param $item			{Object} the jquery element we are checking the width of
		 * 
		 * @returns {Integer} the width of the $item passed in
		 */
		getItemsWidth = function(oCentousel, $item) {
			return ($item.find('.'+oCentousel.sColClass).length * oCentousel.iColWidth);
		},
		
		/**
		 * Determines what the left of the centousel list should be so the midpoint
		 * of the item passed in is centered within the mask element.
		 * 
		 * @param oCentousel	{Object} the centousel we are working with
		 * @param $item			{Object} the jquery element we want to have centered in the mask
		 * 
		 * @returns	{Integer} what the left position of the current list should be to center the $item passed in
		 */
		getMidPointLeft = function(oCentousel, $item) {
			
			var itemWidth	= getItemsWidth(oCentousel, $item),
				midMaskLeft	= (oCentousel.iMaskWidth -  itemWidth) / 2, // where it needs to be in the mask
				offsetDiff	= oCentousel.iCurrLeftPos + $item.position().left; // how far left is it from list left
			
			// the new left is...
			// the current left PLUS...
			// the offset of the group from the mask's left offset MINUS the distance of the item from the list start 
			return (oCentousel.iCurrLeftPos + (midMaskLeft - offsetDiff));
			
		},
		
		/**
		 * A method to move stop the centousel autorotate
		 * @param oCentousel	{Object} the centousel we are working with 
		 */
		stopAutoRotate = function (oCentousel) {
			if (oCentousel) {
				oCentousel.oRotateInterval = window.clearInterval(oCentousel.oRotateInterval);
			}
		},
		
		/**
		 * Start or restart the centousel autorotate
		 * @param oCentousel	{Object}	the centousel we are working with
		 * @param iAutoRotate	{Integer}	the interval we use to start or restart the rotate
		 */
		startAutoRotate = function (oCentousel, iAutoRotate) {
			
			// if we're auto-rotating
			if (oCentousel && (iAutoRotate > 0 || oCentousel.iAutoRotate > 0)) {
				
				// reset the centousel iAutoRotate property in case its come in from the public method
				if (iAutoRotate > 0) {
					oCentousel.iAutoRotate = iAutoRotate;
				}
				
				// make sure we are not setting this if its already set
				stopAutoRotate(oCentousel);
				
				// set the new interval function
				oCentousel.oRotateInterval = window.setInterval(function () {
					updateCentousel(oCentousel, 1); // args=oCentousel, iDirection
				}, (oCentousel.iAutoRotate + oCentousel.iAnimateSpeed));
				
			}
			
		};
	
	/**
	 * A publicly accessible initialize method that gets called on an element or series of elements
	 * @param oOptions {Object} the options passed in to the plugin to extend into the plugin defaults
	 * @returns this {Object} the jquery collection passed in
	 */
	methods.init = function (oOptions) {
		
		// Loop through the jQuery objects passed in
		this.each(function () {
			
			var $centousel	= $(this),
				oCentousel	= $centousel.data('centousel'),
				$clone;
			
			// only do this if we have not initialized the plugin on this element yet
			if ( ! oCentousel ) {
							
				// Set up centousel object for each individual centousel targeted
				// Extend the defaults and options into this centousel instance
				oCentousel = {};
				$.extend(oCentousel, oDefaults, oOptions || {});
				
				oCentousel.$centousel		= $centousel;
				oCentousel.$mask			= oCentousel.$centousel.find('.mask');
				oCentousel.$list			= oCentousel.$mask.children();
				oCentousel.$originalItems	= oCentousel.$list.children();
				oCentousel.$currItems		= oCentousel.$originalItems;
				oCentousel.iNumItems		= oCentousel.$originalItems.length;
				oCentousel.iMaskWidth		= oCentousel.$mask.width();
								
				// set remaining necessary properties
				oCentousel.bAnimating		= false;
				oCentousel.iCurrActiveIndex	= oCentousel.iLoadIndex;
				oCentousel.iCurrLeftPos		= 0;
				
				// make sure necessary css is set
				oCentousel.$centousel.css('position','relative');
				oCentousel.$mask.css('position','relative');
				oCentousel.$list.css({
					'position'		: 'relative',
					'list-style'	: 'none',
					'margin'		: 0,
					'padding'		: 0
				});
				
				// add a list index to use as a selector
				oCentousel.$originalItems.each(function(i, ele){
					$(ele).attr('data-list-index', i);
				});
				
				// set the $activeItem
				oCentousel.$activeItem = oCentousel.$currItems.eq(oCentousel.iCurrActiveIndex); 
				
				
				//$(oCentousel.$currItems).next('li').css('border','solid 1px red');+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				
				
				// update the centousel to the iCurrActiveIndex
				updateCentousel(oCentousel, -1, oCentousel.iCurrActiveIndex, true); // true = bNoAnimate 
				
				
				
				// add previous and next buttons
				oCentousel.$btnPrevious	= $('<a />').attr({'class':'btnPrevious btnPaginate', 'href':'#'}).css('position','absolute').html('<span><img src="/images/suzan/lazy_left_arrow.png" alt="" /></span>').appendTo(oCentousel.$centousel);
				oCentousel.$btnNext		= $('<a />').attr({'class':'btnNext btnPaginate', 'href':'#'}).css('position','absolute').html('<span><img src="/images/suzan/lazy_right_arrow.png" alt="" /></span>').appendTo(oCentousel.$centousel);			
				
				// attach event to btnPaginate click
				$('.btnPaginate', oCentousel.$centousel).click(clickBtnPaginate);
				
				// if we're auto-rotating
				if (oCentousel.iAutoRotate > 0) {
					startAutoRotate(oCentousel, oCentousel.iAutoRotate);
				}
				
				// save this object for later use
				$centousel.data('centousel', oCentousel);
				
				
			}
			
		});
		
		return this;
			
	};
	
	/**
	 * A publicly accessible method to move the centousel to a specific index
	 * @param iUpdateToIndex	{Integer} the index we are updating the centousel to 
	 * @param iDirection		{Integer} optional. the direction we want to animate
	 * @returns this {Object} the jquery collection passed in
	 */
	methods.updateToIndex = function (iUpdateToIndex, iDirection) {
		updateToIndex(this.data('centousel'), iUpdateToIndex, iDirection);
		return this;
	};
	
	/**
	 * A publicly accessible method to move start or restart the centousel autorotate
	 * @param iAutoRotate	{Integer}	the interval we use to start or restart the rotate
	 * @returns this {Object} the jquery collection passed in 
	 */
	methods.startAutoRotate = function (iAutoRotate) {
		startAutoRotate(this.data('centousel'), iAutoRotate);
		return this;
	};
	
	/**
	 * A publicly accessible method to move stop the centousel autorotate
	 * @returns this {Object} the jquery collection passed in
	 */
	methods.stopAutoRotate = function () {
		stopAutoRotate(this.data('centousel'));
		return this;
	};
		
	/**
	 * Set up the jQuery plugin and chaining. If the argument passed in matches a method in this closure,
	 * call it. If not, call the init method. Pass in the options if they exist.
	 */ 
	$.fn.centousel = function (method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		}
		
		
				
	};
	
	
}

(jQuery));

