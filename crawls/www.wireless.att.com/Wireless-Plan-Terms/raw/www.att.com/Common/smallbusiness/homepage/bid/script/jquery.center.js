jQuery.fn.center = function (horizontal, vertical, meParent) {
	return this.each(function() {
		var me = jQuery(this);
		if(meParent === undefined) 
			meJParent = me.parent();
		else
			meJParent = jQuery(meParent);
		if(horizontal === undefined || horizontal != false)
			horizontal = true;
		if(vertical === undefined || vertical != false) 
			vertical = true;
		
		var meOffset = me.offset();
		
		var newPosX = meOffset.left;
		var newPosY = meOffset.top;
		
		var deltaX = 0;
		var deltaY = 0;
		if(meParent != window) {
			var meParentOffset = meJParent.offset();
			deltaX = meParentOffset.left;
			deltaY = meParentOffset.top;
		}
		
		if(horizontal) {
			newPosX = Math.floor((meJParent.width() / 2) - (me.width() / 2)) + deltaX;
		}
		if(vertical) {
			newPosY = Math.floor((meJParent.height() / 2) - (me.height() / 2)) + deltaY;
		}
		
		me.css('position', 'absolute');
		me.offset({ left: newPosX, top: newPosY });
	});
};
jQuery.fn.wcenter = function(h, v) {
	return this.each(function() {
		var me = jQuery(this);
		me.center(h, v, window);
	});
};