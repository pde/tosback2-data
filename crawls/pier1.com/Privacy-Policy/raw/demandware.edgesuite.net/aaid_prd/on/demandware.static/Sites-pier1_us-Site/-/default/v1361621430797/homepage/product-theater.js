function ProductTheater(view, options) {
	this.view = $(view);
	this.preview = this.view.find('.preview');
	this.theater = this.view.find('.theater');
	this.previewSlideshow = this.preview.find('.slideshow');
	this.theaterSlideshow = this.theater.find('.slideshow');
	this.controls = this.theater.find('.instructions, .slideshow-prev, .slideshow-next');
	
	options = $.extend({ header: '#header', navigation: '#navigation' }, options);
	this.options = options;

	this.header = $(options.header);
	this.navigation = $(options.navigation);
	//this.header = this.header.add( $('<div class="product-theater-shadow" />').insertAfter(this.header.last()) );
	//this.header.addClass('product-theater-header');
	
	this.touchSupported = ('ontouchstart' in document.documentElement);
	this.closed = true;

	this.setupPreview();
	this.setupTheater();
	
	if (typeof this.options.afterChange === 'function') {
		$.each(['preview', 'theater'], $.proxy(function (i, slideshow) {
			this[slideshow + 'Slideshow'].on('afterChange', null, slideshow, $.proxy(function (e, newIndex, oldIndex) {
				this.options.afterChange(e.data, newIndex, oldIndex);
			}, this))
		}, this));
	}
	
	this.height = this.view.outerHeight();


}

function loadProductTiles(theater) {
	
	theater.find('ul.theater-tile li').each(function() {
		var pid = $(this).attr('class');
		var url = app.util.appendParamsToUrl(app.urls.productHitTile , {pid:pid});
		app.ajax.load({
			url: url,
			callback : function (data) {
				$('li.'+pid).html(data);
			}
		});
	});
}

ProductTheater.prototype = {
	setupPreview: function () {
		var self = this;
		
		this.previewSlideshow.on('beforeChange', function (e, newIndex) {
			var theaterLinks = $(this).find('a[href="#product-theater"]');
			
			$(this)
				.find('> li:eq(' + newIndex + ') a[href="#product-theater"]')
				.map(function () {
					return theaterLinks.index(this);
				})
				.each(function (i, index) {
					self.lazyLoad(index);
				});
		});

		this.previewSlideshow.slideshow($.extend({
			transition: 'slide',
			prev: '.preview .slideshow-prev',
			next: '.preview .slideshow-next'
		}, this.options.previewSlideshowOptions));
	
		//this.previewSlideshow.find('> li').find('a').andSelf().append('<div class="header-shadow" />');

		this.preview.on('click', '.slideshow a[href="#product-theater"]', $.proxy(this, 'showTheater'));
	},
	setupTheater: function () {
		var theaterSlideshow = this.theaterSlideshow,
			slideshowContent = this.theater.find('.content-wrap');

		theaterSlideshow
			.on('beforeChange', $.proxy(function (e, newIndex, oldIndex) {
				this.lazyLoad(newIndex);
				this.lazyLoad(newIndex + 1);
				this.lazyLoad(newIndex - 1);
			}, this))
			.on('afterChange', function (e, newIndex, oldIndex) {
				var newContent = slideshowContent.find('.content:eq(' + newIndex + ')'),
					oldContent = slideshowContent.find('.content:eq(' + oldIndex + ')');
				
				slideshowContent.stop(true).animate({ height: newContent.outerHeight(true) }, 275);
					
				oldContent.stop(true, true).css({ position: 'absolute', left: 0, top: 0, zIndex: 10 }).fadeOut(275);
				newContent.css({ position: '' }).show();
				loadProductTiles(newContent);
			})
			.slideshow({
				transition: 'slide',
				prev: '.theater .slideshow-prev',
				next: '.theater .slideshow-next'
			});
			
		
		this.theater
			.on('click', '.slideshow > li > img, a.close', $.proxy(this, 'hideTheater'))
			.on('mousemove', '.slideshow', $.proxy(this, 'showControls'))
			.on('mouseenter', '.instructions, .slideshow-prev, .slideshow-next', Infinity, $.proxy(this, 'showControls'))
			.on('mouseenter click', '.header', $.proxy(this, 'showHeader'))
			.on('click', '.search', $.proxy(this, 'showSearch'));
	},
	
	lazyLoad: function (index) {
		// Lazy load any content that's included in a <script type="text/html"> element
		var slides = this.theaterSlideshow.find('> li');

		index %= slides.length;
		if (index < 0) { index += slides.length; }
		
		slides.eq(index)
			.add(this.theater.find('.content-wrap .content:eq(' + index + ')'))
			.find('script[type="text/html"]')
			.replaceWith(function (i, html) {
				return html.replace(/<div class="overlay">/, '$&<div class="bottom"></div>');
			});
	},
	
	showTheater: function (e) {
		e.preventDefault();
		
		this.closed = false;

		this.previewSlideshow.slideshow('stop');
		
		$('body').addClass('product-theater-active');
		
		var index = this.preview.find('a[href="#product-theater"]').index(e.currentTarget);
		this.theaterSlideshow.slideshow('show', index, false);

		var contentHeight = this.theater.find('.content').hide().eq(index).show().outerHeight(true);
		if(contentHeight !== 0){
			this.theater.find('.content-wrap').css('height', contentHeight);
		}else{
			this.theater.find('.content-wrap').css('height', 'auto');
		}
		this.preview.fadeOut(275);
		this.view.stop(true).animate({ height: this.theater.outerHeight() }, 400, $.proxy(function () {
			this.view.css('height', 'auto');
		}, this));
		
		this.hideHeader();
		
		$(this.options.hide).hide();
		this.showControls(null, 0);
		
		if (typeof this.options.onOpen === 'function') {
			this.options.onOpen();
		}
				
	},
	hideTheater: function (e) {
		e.preventDefault();
		
		this.closed = true;
		
		var currentIndex = this.theaterSlideshow.data('slideshow').currentIndex,
			previewIndex = this.previewSlideshow.find('a[href="#product-theater"]:eq(' + currentIndex + ')').closest('li').index();
			
		this.previewSlideshow.slideshow('show', previewIndex, false);
		
		this.preview.fadeIn(400, $.proxy(function () {
			// this.controls.hide();
			$('body').removeClass('product-theater-active');
		}, this));
		this.view.stop(true).animate({ height: this.height }, 400);
		this.showHeader();

		$(this.options.hide).show();
		
		this.previewSlideshow.slideshow('start');
		
		if (typeof this.options.onClose === 'function') {
			this.options.onClose();
		}
	},
	
	showHeader: function (e) {
		clearTimeout(this.headerTimer);
		this.theater.add(this.header).off('.showHeader');
		$('.sticky-header').addClass('active');
		this.header.stop(true).animate({ top: 0 }, 350);
		this.navigation.stop(true).animate({ top: 80 }, 350);
		
		// Only register event handlers to hide header if this was triggered via an event handler
		if (e) {
			this.theater.on('mouseover.showHeader', $.proxy(function () {
				this.headerTimer = setTimeout($.proxy(this, 'hideHeader'), 450);
			}, this));
		
			this.header.on('mouseenter.showHeader', $.proxy(function () {
				clearTimeout(this.headerTimer);
			}, this));
		
			this.theater.on('touchstart.showHeader', $.proxy(function (e) {
				this.hideHeader();

				if ($(e.target).is('.theater .slideshow > li > img')) {
					e.preventDefault();
				}
			}, this));
		}
	},
	hideHeader: function () {
		clearTimeout(this.headerTimer);
		this.theater.add(this.header).off('.showHeader');

		if (this.closed) { return; }
		
		this.header.stop(true).animate({ top: -137 }, 350);
		this.navigation.stop(true).animate({ top: -58 }, 350);
		$('.sticky-header').removeClass('active');
	},
	
	showControls: function (e, speed) {
		if (this.touchSupported) { return; }
		
		var delay = (e && e.data) || (typeof e === 'number' && e) || 4000;

		if (typeof speed === 'undefined') {
			speed = 300;
		}
		
		clearTimeout(this.controlsTimer);
		this.controls.fadeIn(speed);
		
		if (delay !== Infinity) {
			this.controlsTimer = setTimeout($.proxy(this, 'hideControls'), delay);
		}
	},
	hideControls: function () {
		clearTimeout(this.controlsTimer);
		this.controls.fadeOut(300);
	},
	
	showSearch: function () {
		if (this.closed) { return; }
		
		if (typeof this.options.showSearch === 'function') {
			this.options.showSearch();
		}
		
		this.showHeader(true);
	}
};
