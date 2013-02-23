;(function ($) {
	function Slideshow(element, options) {
		this.element = element = $(element);
		element.data('slideshow', this);
		
		this.options = options = $.extend({}, $.fn.slideshow.defaults, options);
		
		if (typeof options.transition !== 'function') {
			options.transition = $.fn.slideshow.transitions[options.transition];
		}

		if (element.css('position') === 'static') {
			element.css('position', 'relative');
		}
		
		// Setup slides
		var slides = this.slides = element.find(options.slideSelector);
		
		element.css({
			height: Math.max.apply(null, slides.map(function () {
				return $(this).outerHeight();
			}).toArray()),
			overflow: 'hidden'
		});

		slides.css({
			position: 'absolute', left: 0, top: 0,
			zIndex: function (i) {
				return slides.length - i;
			}
		});

		slides.slice(1).hide();
		
		// Setup navigation
		var slideshow = this;
		
		$.each(['prev', 'next'], function (i, dir) {
			if (options[dir]) {
				$(options[dir]).bind('click', function (e) {
					e.preventDefault();
					this.blur();

					slideshow[dir]();
				});
			}
		});
		
		if (options.pager) {
			var pager = $(options.pager);
			
			for (var i = 0, l = slides.length; i < l; i++) {
				pager.append('<a href="#">' + (i + 1) + '</a>');
			}
			
			pager.delegate('a', 'click.slideshow', function (e) {
				e.preventDefault();
				this.blur();
				
				var index = $(this).index();
				
				setTimeout(function () {
					slideshow.show(index);
				}, 0);
			});
			
			element.bind('beforeChange.slideshow', function (e, index) {
				pager.find('a.active').removeClass('active');
				pager.find('a:eq(' + index + ')').addClass('active');
			});
		}

		if (options.pauseOnHover) {
			element.hover(
				$.proxy(function () {
					if (this.autoPlay) {
						this.stop();
						this.paused = true;
					}
				}, this),
				$.proxy(function () {
					if (this.paused) {
						this.start();
						this.paused = false;
					}
				}, this)
			);
		}

		// Start the slideshow
		this.show(options.startIndex, false);

		if (options.autoPlay) {
			this.start();
		}
	}

	Slideshow.prototype = {
		destroy: function () {
			this.stop();
			
			this.element.unbind('.slideshow');

			if (this.options.pager) {
				$(this.options.pager).empty().unbind('.slideshow');
			}
			
			this.element.removeData('slideshow');
		},

		show: function (index, transition) {
			var currentIndex = this.currentIndex,
				nextIndex = index % this.slides.length;

			if (nextIndex < 0) {
				nextIndex += this.slides.length;
			}

			if (nextIndex === currentIndex || this.animating) {
				return;
			}

			var current = this.slides.eq(currentIndex),
				next = this.slides.eq(nextIndex);

			if (typeof transition === 'undefined') {
				transition = this.options.transition;
			} else if (typeof transition !== 'function') {
				transition = $.fn.slideshow.transitions[transition];
			}

			this.element.triggerHandler('beforeChange', [nextIndex, currentIndex]);

			var cleanup = $.proxy(function () {
				if (cleanup.done) { return; }
				
				if ($.browser.msie) {
					$.each([current, next], function () { this.style && this.style.removeAttribute('filter'); });
				}

				current.hide().removeClass('slideshow-transition-out');
				next.removeClass('slideshow-transition-in');

				this.element.triggerHandler('afterChange', [nextIndex, currentIndex]);

				delete this.animating;
				cleanup.done = true;
			}, this);

			if (transition) {
				this.animating = true;
				
				current.stop(true, true).addClass('slideshow-transition-out');
				next.stop(true, true).addClass('slideshow-transition-in').show();

				transition({
					currentIndex: currentIndex,
					nextIndex: index,
					currentSlide: current,
					nextSlide: next,
					speed: this.options.speed
				}, cleanup);
			} else {
				current.hide();
				next.show();
				this.element.triggerHandler('afterChange', [nextIndex, currentIndex]);
			}

			this.currentIndex = nextIndex;

			if (this.autoPlay) {
				this.start();
			}
		},
		prev: function () {
			this.show(this.currentIndex - 1);
		},
		next: function () {
			this.show(this.currentIndex + 1);
		},

		start: function () {
			this.stop();
			this.autoPlay = true;
			this.timer = setTimeout($.proxy(this, 'next'), this.options.timeout);
		},
		stop: function () {
			this.autoPlay = false;
			this.paused = false;
			clearTimeout(this.timer);
		}
	};

	$.fn.slideshow = function (method) {
		var args = Array.prototype.slice.call(arguments, 1);
		
		if (typeof Slideshow.prototype[method] === 'function') {
			return this.each(function () {
				var slideshow = $(this).data('slideshow');
				slideshow[method].apply(slideshow, args);
			});
		} else if (typeof method === 'object' || !method) {
			return this.each(function () {
				new Slideshow(this, method);
			});
		} else {
			$.error('Method "' +  method + '" does not exist on jQuery.slideshow');
		}    
	};
	
	$.fn.slideshow.defaults = {
		slideSelector: '> *',
		transition: 'fade',
		speed: 400,
		timeout: 4000,
		pauseOnHover: false,
		autoPlay: false,
		startIndex: 0,
		pager: null,
		prev: null,
		next: null
	};
	
	$.fn.slideshow.transitions = {
		fade: function (e, next) {
			e.nextSlide.css('z-index', 0);
			e.currentSlide.css('z-index', 1).fadeOut(e.speed, next);
		},
		
		crossfade: function (e, next) {
			e.currentSlide.css('z-index', 1).fadeOut(e.speed, next);
			e.nextSlide.css('z-index', 0).fadeIn(e.speed, next);
		},

		slide: function (e, next) {
			var width = e.currentSlide.outerWidth();

			if (e.nextIndex > e.currentIndex) {
				// Move forward
				e.currentSlide.css('left', 0);
				e.nextSlide.css('left', width);
				e.currentSlide.add(e.nextSlide).animate({ left: '-=' + width }, e.speed, function () {
					e.currentSlide.css('left', 0);
					next();
				});
			} else {
				// Move backward
				e.currentSlide.css('left', 0);
				e.nextSlide.css('left', -width);
				e.currentSlide.add(e.nextSlide).animate({ left: '+=' + width }, e.speed, function () {
					e.currentSlide.css('left', 0);
					next();
				});
			}
		}
	};
})(jQuery);
