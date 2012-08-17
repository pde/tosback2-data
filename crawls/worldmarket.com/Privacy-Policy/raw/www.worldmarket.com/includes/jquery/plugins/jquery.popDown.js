jQuery.fn.popDown = function(attr) {
	attr = attr || {};
	attr.navOverClass = attr.navOverClass || null;
	attr.navLink = attr.navLink || null;
	attr.closeDelay = attr.closeDelay || 300;
        attr.align = attr.align || null;

	jQuery(this).hoverIntent({over:function(event){
		// add the navOverClass if one has been provided
		if (attr.navLink) jQuery(this).find(".popDownNav").click(function(){location.href=attr.navLink});

		// add the navOverClass if one has been provided
		if (attr.navOverClass) jQuery(this).find(".popDownNav").addClass(attr.navOverClass);

		if (!jQuery.support.leadingWhitespace) jQuery(this).css("zIndex", 2999); // IE fix for z-index issue
		jQuery(this).find(".popDownLayer").css("zIndex", 2999);

		// move the popDownLayer to show up under the nav
		//jQuery(this).find(".popDownLayer").css("top", jQuery(this).outerHeight() + "px");

		// force the width to match the nav if align=both, for align=right/left, not implemented right now
		if (attr.align == null || attr.align == 'both') {
	            jQuery(this).find(".popDownLayer").css("width", jQuery(this).find(".popDownNav").innerWidth()+"px");
		}

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