function popupTraysLib() {
	var myTimer;
	var isIE = jQuery.browser.msie;
	this.popupServiceMenu = function(event) {
		myTimer = setTimeout(function() {
			var numMenu = event.data.index;
			var isAnimating = false;
			var elemList = jQuery('.servicesPopupMenuWrapper');
			elemList.each(function(i){
				var thisElem = jQuery(this);
				if (thisElem.data('animating')) {
					myImgs = jQuery('.svcItem' + i).find('img');
					if (myImgs.length > 1) {
						myImgs.eq(0).show();
						myImgs.eq(1).hide();
					}
					thisElem.stop(true,true).hide().data('animating', false);
					isAnimating = true;
				}
			});
			var myElem = elemList.eq(numMenu).data('animating', true);
			myImgs = jQuery('.svcItem' + numMenu).find('img');
			if (myImgs.length > 1) {
				myImgs.eq(0).hide();
				myImgs.eq(1).show();
			}
			if (isAnimating) {
				myElem.show();
				if (isIE) {
					myElem.find('.shadowClassBB').show();
				}
			}
			else {
				myElem.fadeIn(500, function(){
					if (isIE) {
						myElem.find('.shadowClassBB').show();
					}
				});
			}
		}, 300);
	}
	this.hideServiceMenu = function(event) {
		clearTimeout(myTimer);
		var numMenu = event.data.index;
		var myEl = jQuery('.servicesPopupMenuWrapper').eq(numMenu);
		if (myEl.data('animating')){
			jQuery('.servicesPopupMenuWrapper').eq(numMenu).delay(500).queue(function(){
				if (isIE) {
					myEl.find('.shadowClassBB').hide();
				}
				myEl.dequeue();
			}).fadeOut(500, function(){
				myImgs = jQuery('.svcItem' + numMenu).find('img');
				if (myImgs.length > 1) {
					myImgs.eq(0).show();
					myImgs.eq(1).hide();
				}
				jQuery(this).data('animating', false);
			});
		}
	}
	this.setupMenus = function() {	
		jQuery('.serviceItem').each(function(index) {
			jQuery(this).addClass('svcItem' + index)
				.bind('mouseenter', {index:index}, popupTrays.popupServiceMenu)
				.bind('mouseleave', {index:index}, popupTrays.hideServiceMenu);
		});
		jQuery('.servicesPopupMenuWrapper').each(function(index) {
			jQuery(this).bind('mouseenter', {index:index}, popupTrays.popupServiceMenu)
				.bind('mouseleave', {index:index}, popupTrays.hideServiceMenu);
		});
		if (isIE) {
			jQuery('.shadowClassBB').hide();
		}
	}
}
var popupTrays = new popupTraysLib();
jQuery(document).ready(function() {
	popupTrays.setupMenus();
});	