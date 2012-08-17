/*
Quick View Enhancement Function
*/

(function( $ ){

  var methods = {
	/**
		Function name: attachButton
		Purpose: Attach image button for product thumbnail, used for quick view enhancement
		params:
			parentNode: parent div element
			dialogTitle: title for dialog
			divID: ID for elements
			onButton: showed when mouse over on the image
			offButton: showed when mouse out of the image
			url: url to call when button clicked
			width: width of Quickview enhancement modal box
			height: height of Quickview enhancement modal box
			showInCenter: show in center or not
	*/
    attachButton : function (parentNode, dialogTitle, divID, onButton, offButton, url, width, height, showInCenter) {
		var divObj = $("div:first", parentNode);
		//show quick view image button
		divObj.show();
		//add mouse enter handler to swap image
		divObj.unbind("mouseenter").bind("mouseenter",function(){
			var obj = $(this);
			if (!obj.attr('classAttr'))
				obj.attr('classAttr',obj.attr('class'));
			var className = obj.attr('classAttr');	
			obj.removeClass(className + '_off');
			obj.addClass(className);
		});
		//add mouse leave handle to swap image
		divObj.unbind("mouseleave").bind("mouseleave",function(){
			var obj = $(this);
			if (!obj.attr('classAttr'))
				obj.attr('classAttr',obj.attr('class'));
			var className = obj.attr('classAttr');	
			obj.removeClass(className);
			obj.addClass(className + '_off');
		});
		//add click handler to open quick view modal box
		divObj.unbind("click").bind("click", function(){
			var obj = $(this);
			obj.ml_popup(dialogTitle, "", url, "iframe", width, height, (screen.height > 600) && showInCenter);
		});
	},
	/**
		Function name: detachButton
		Purpose: Detach image button from product thumbnail
		params:
			parentNode: parent div element
	*/
    detachButton : function(parentNode){
		var divObj = $("div:first", parentNode);
		//hide quick view image button
		divObj.hide();
	},

    showGlobalBasket : function(navLink, globalCartMenuCloseDelay){
		// add the navOverClass if one has been provided
		if (navLink) $(this).find(".popDownNav").click(function() {location.href = navLink;});

		// add the navOverClass if one has been provided
		$(this).find(".popDownNav").addClass("globalCartNavOver");

		if (!$.support.leadingWhitespace) $(this).css("zIndex", 2999); // IE fix for z-index issue
		$(this).find(".popDownLayer").css("zIndex", 2999);

		// move the popDownLayer to show up under the nav
		$(this).find(".popDownLayer").css("top", $(this).outerHeight(true) -1 + "px");

		// force the width to match the nav
		$(this).find(".popDownLayer").width($(this).find(".popDownNav").width());

		$(this).find(".popDownLayer").bgiframe();

		// show the popDownLayer
		$(this).find(".popDownLayer").show();

		// clear timeout if a previous setTimeout called
		var timeoutID = $(this).data('timeoutID') ;
		if (timeoutID) window.clearTimeout(timeoutID);

		// call setTimeout() to close the global basket after "globalCartMenuCloseDelay" miliseconds
		var timeoutID = window.setTimeout("jQuery('#" + $(this).attr('id') + "').qve('closeGlobalBasket')", globalCartMenuCloseDelay);
		$(this).data('timeoutID', timeoutID);
	},

    closeGlobalBasket : function(){
		// remove the navOverClass if one has been provided
		$(this).find(".popDownNav").removeClass("globalCartNavOver");

		if (!$.support.leadingWhitespace) $(this).css("zIndex", 1); // IE fix for z-index issue
		$(this).find(".popDownLayer").css("zIndex", 1);

		// hide popDownLayer
		$(this).find(".popDownLayer").hide();
	}
  };

  $.fn.qve = function( method ) {

    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.qve' );
    }

  };

})( jQuery );


//Attach mouseenter and mouseleave for quick view thumbnail
jQuery(document).ready(function() {
	jQuery("div .qveThumbnail").unbind("mouseenter").bind("mouseenter", function(){
		var obj = jQuery(this);
		obj.qve("attachButton", this, obj.attr("dialogTitle"), obj.attr("catPK"), obj.attr("buttonOn"), obj.attr("buttonOff"), obj.attr("url"), obj.attr("windowWidth"), obj.attr("windowHeight"),(obj.attr("showInCenter")!=null));
	});
	jQuery("div .qveThumbnail").unbind("mouseleave").bind("mouseleave", function(){
		jQuery(this).qve("detachButton", this);
	});
});

