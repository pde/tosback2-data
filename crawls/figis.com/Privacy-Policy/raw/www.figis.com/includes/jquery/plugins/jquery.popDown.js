jQuery.fn.popDown = function(attr) {
	attr = attr || {};
	attr.navOverClass = attr.navOverClass || null;
	attr.navLink = attr.navLink || null;
	attr.closeDelay = attr.closeDelay || 300;

	jQuery(this).hoverIntent({over:function(event){
		// add the navOverClass if one has been provided
		if (attr.navLink) jQuery(this).find(".popDownNav").click(function(){location.href=attr.navLink});

		// add the navOverClass if one has been provided
		if (attr.navOverClass) jQuery(this).find(".popDownNav").addClass(attr.navOverClass);

		if (!jQuery.support.leadingWhitespace) jQuery(this).css("zIndex", 2999); // IE fix for z-index issue 
		jQuery(this).find(".popDownLayer").css("zIndex", 2999);
		
		// move the popDownLayer to show up under the nav
		// jQuery(this).find(".popDownLayer").css("top", jQuery(this).outerHeight(true) -1 + "px");
		
		// force the width to match the nav
		jQuery(this).find(".popDownLayer").width(jQuery(this).find(".popDownNav").width());

		jQuery(this).find(".popDownLayer").bgiframe();

		// show the popDownLayer
		jQuery(this).find(".popDownLayer").show();
	}, out:function(event){
		// remove the navOverClass if one has been provided
		if (attr.navOverClass) jQuery(this).find(".popDownNav").removeClass(attr.navOverClass);

		if (!jQuery.support.leadingWhitespace) jQuery(this).css("zIndex", 1); // IE fix for z-index issue
		jQuery(this).find(".popDownLayer").css("zIndex", 1);

		// hide popDownLayer
		jQuery(this).find(".popDownLayer").hide();
	}, timeout:attr.closeDelay});
}