(function($) {
    $.fn.jScroll = function(options) {
        var opts = $.extend({}, $.fn.jScroll.defaults, options);
        return this.each(function() {
			var $element = $(this);
			var $window = $(window);
			var locator = new location($element);
			$window.scroll(function() {
				$element
					.stop()
					.animate(locator.getMargin($window), opts.speed);
			});
        });

        function location($element){
			this.min = $element.offset().top;
			this.originalMargin = parseInt($element.css("margin-top"), 10) || 0;
			
			this.getMargin = function ($window){
				var max = $element.parent().height() - $element.outerHeight();
				var margin = this.originalMargin;
				if ($window.scrollTop() >= this.min)
					margin = margin + opts.top + $window.scrollTop() - this.min; 
				if (margin > max)
					margin = max;
				return ({"marginTop" : margin + 'px'});
			}
		}	   
    };
    $.fn.jScroll.defaults = {
        speed	:	"1",
		top		:	10
    };

})(jQuery);

$(document).ready(function(){
	$(".scrollable-layer").each(function(){
		$(this).jScroll({top : 100});
	})
})