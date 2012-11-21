$(function() {		/* lazy images */
		var b, e, lazyLoad;
		b = $(window);
		e = $('.lazyImage');
		lazyLoad = function () {
			e = $('.lazyImage');
			$.each(e, function () {
				var c = $(this),
					a, d;
				a = c.offset();
				d = c.data();
				if (!d.loaded && a.top <= b.height() + b.scrollTop()) {
					a = new Image, $.extend(a, d), a.onload = function () {
						c.prepend(this);
						$(this).fadeIn();
						$(this).css('display', 'block');
						c.removeClass('lazyImage')
					}, c.data('loaded', !0), e = $('.lazyImage')
				}
			})
		};
		lazyLoad();
		b.scroll(lazyLoad);
		b.resize(lazyLoad);
		window.lazyLoad = lazyLoad;
});