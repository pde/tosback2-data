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

		//Hide label input
		hideLabel.init();
});


var hideLabel = (function() {
	var config = {
		label: 'Enter Search Here',
		element: 'input[type="text"]'
	};

	return {
		init: function(opts) {
			var value = '', label = config.label, 
				element = $(config.element + '[value="'+ label +'"]');

			element.focus(function() {
				value = $(this).val();
				if(value === label) {
					$(this).val('');
				}
			});

			element.blur(function() {
				value = $(this).val();
				if(value === '') {
					$(this).val(label);
				}
			});
		}
	}
}());
