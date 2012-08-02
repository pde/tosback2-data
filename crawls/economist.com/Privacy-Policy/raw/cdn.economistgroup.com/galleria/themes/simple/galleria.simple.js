/**
 * @preserve Galleria Classic Theme 2011-02-14
 * http://galleria.aino.se
 *
 * Copyright (c) 2011, Aino
 * Licensed under the MIT license.
 */
 
/*global jQuery, Galleria */

(function($) {

Galleria.addTheme({
	name: 'simple',
	author: 'Redwire',
	css: 'galleria.simple.css',
	defaults: {
		// add your own default options here
		transition: 'slide',
		imagecrop: true,
		imageMargin: -1,
		showImagenav: true,
		thumbnails: false,
		showCounter: false,
		showInfo: false,
		transitionSpeed: 400,
		// custom theme-specific options should begin with underscore:
		_backgroundColour: 'black',
		_navCSS: ''
	},
	init: function(options) {

		/*
		The init function get's called when galleria is ready.
		You have access to all public methods and events in here
		this = gallery instance
		options = gallery options (including custom options)
		*/

		// set the container's background to the theme-specific _my_color option:
		this.$('container').css('background-color', options._backgroundColour);

		// apply arrow class to prev/next
		$('.galleria-image-nav').addClass(options._navCSS);

		// add some elements
		this.addElement('info-link','info-close');
		this.append({
			'info' : ['info-link','info-close']
		});
		
		// cache some stuff
		var info = this.$('info-link,info-close,info-text'),
			touch = Galleria.TOUCH,
			click = touch ? 'touchstart' : 'click';
		
		// show loader & counter with opacity
		this.$('loader,counter').show().css('opacity', 0.4);

		// some stuff for non-touch browsers
		if (! touch ) {
			this.addIdleState( this.get('image-nav-left'), { left:-50 });
			this.addIdleState( this.get('image-nav-right'), { right:-50 });
			this.addIdleState( this.get('counter'), { opacity:0 });
		}
		
		// toggle info
		if ( options._toggleInfo === true ) {
			info.bind( click, function() {
				info.toggle();
			});
		} else {
			info.show();
			this.$('info-link, info-close').hide();
		}
		
		// bind some stuff
		this.bind('thumbnail', function(e) {
			
			if (! touch ) {
				// fade thumbnails
				$(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
					$(this).not('.active').children().stop().fadeTo(100, 1);
				}, function() {
					$(this).not('.active').children().stop().fadeTo(400, 0.6);
				});
				
				if ( e.index === options.show ) {
					$(e.thumbTarget).css('opacity',1);
				}
			}
		});
		
		this.bind('loadstart', function(e) {
			if (!e.cached) {
				this.$('loader').show().fadeTo(200, 0.4);
			}
			
			this.$('info').toggle( this.hasInfo() );
			
			$(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
		});
		
		this.bind('loadfinish', function(e) {
			this.$('loader').fadeOut(200);
		});

	}

});

}(jQuery));
