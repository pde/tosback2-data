(function( $ ){


	$.fn.followMe = function(o) {
		o = $.extend({
			showAt: 0.3,
			pageWidth: 960,
			position: "left",
			ontopofcontent: false
		}, o || {});
		o.ontopofcontent = !!o.ontopofcontent;
		o.position = ("left"||"right") ? o.position : "left";
		o.pageWidth = parseInt(o.pageWidth);
		o.hasscrolled = false;
		o.isresized = false;
		$(window).resize(function () { o.isresized = o.hasscrolled = true; })
		$(window).scroll(function () { o.hasscrolled = true; });

		var floatElement = this;
		var checking = false;

		floatElement.css({position:"fixed", zIndex:9999}).appendTo($('.header'));

		setInterval(function() {
			if (checking) return;
			checking = true;
			var winHeight = $(window).height();
			var winWidth = $(window).width();
			
			var vertTrigger = 0;
			switch (true) {
				case (parseFloat(o.showAt)===o.showAt): // numeric - use as multiplier of window height 
					vertTrigger = winHeight * o.showAt;
					break;
				case (o.showAt.substr(o.showAt.length-2, 2)==="px"): // pixel offset 
					vertTrigger = parseInt(o.showAt);
					break;
				case (o.showAt.substr(o.showAt.length-1, 1)==="%"): // % offset of window height
					vertTrigger = parseInt(o.showAt)/100 * winHeight;
					break;
			}
			if ( o.hasscrolled ) {
				if (vertTrigger < $(window).scrollTop()) {
					!floatElement.is(":visible") && floatElement.show(); 
				} else {
					floatElement.is(":visible") && floatElement.hide(); 
				}	
				o.hasscrolled = false;
			}

			if ( o.isresized ) {

				floatElement.each(function () {
					var myWidth = $(this).width();
					var myPosMargin = parseInt($(this).css("margin"+((o.position=="right")?"Right":"Left")));
					if (winWidth<o.pageWidth+2*(myWidth+myPosMargin)) {
						if (!o.ontopofcontent) {
//							$(this).hide();
							$(this).css(o.position,-2*myWidth+"px");
						} else {
							$(this).css(o.position,-myPosMargin+"px");
						}
					} else {
						$(this).css(o.position,(winWidth-o.pageWidth)/2-(myWidth)+"px");
					}					
				});
				o.isresized = false;
			}

			checking = false;

		}, 200);

		o.isresized = true;

		return this;
	
	};


})( jQuery );
