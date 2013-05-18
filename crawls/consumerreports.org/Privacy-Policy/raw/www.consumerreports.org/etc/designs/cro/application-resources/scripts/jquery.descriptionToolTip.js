(function(jQuery){
	jQuery.fn.descriptionToolTip = function (opt) {
		settings = jQuery.extend({
			'left':15,
			'top':40
		}, opt);
		return this.each(function () {
			var elem = jQuery(this),
			tLeft = settings.left,
			tTop = settings.top;
			elem.bind('mouseenter', function () {
				elem.find('.number-tested').css({'left': (elem.position().left+elem.width()/2-tLeft) + "px",'top':(elem.position().top+elem.height()-tTop) + "px", 'display':'block'});
			});
			elem.bind('mouseleave', function () {
				elem.find('.number-tested').css('display', 'none');
			});
		});
	};
})(jQuery);