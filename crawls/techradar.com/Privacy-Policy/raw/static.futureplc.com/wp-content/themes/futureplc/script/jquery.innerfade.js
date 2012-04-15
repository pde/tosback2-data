/* =========================================================

// jquery.innerfade.js

// Datum: 2007-01-29
// Firma: Medienfreunde Hofmann & Baldes GbR
// Autor: Torsten Baldes
// Mail: t.baldes@medienfreunde.com
// Web: http://medienfreunde.com

// based on the work of Matt Oakes http://portfolio.gizone.co.uk/applications/slideshow/

// ========================================================= */


(function(jQuery) {

jQuery.fn.innerfade = function(options) {

	this.each(function(){

		var settings = {
			animationtype: 'fade',
			speed: 'normal',
			timeout: 2000,
			type: 'sequence',
			containerheight: 'auto',
			runningclass: 'innerfade'
		};

		if(options)
			jQuery.extend(settings, options);

		var elements = jQuery(this).children();

		if (elements.length > 1) {

			jQuery(this).css('position', 'relative');

			jQuery(this).css('height', settings.containerheight);
			jQuery(this).addClass(settings.runningclass);

			for ( var i = 0; i < elements.length; i++ ) {
				jQuery(elements[i]).css('z-index', String(elements.length-i)).css('position', 'absolute');
				jQuery(elements[i]).hide();
			};

			if ( settings.type == 'sequence' ) {
				setTimeout(function(){
					jQuery.innerfade.next(elements, settings, 1, 0);
				}, settings.timeout);
				jQuery(elements[0]).show();
			} else if ( settings.type == 'random' ) {
				setTimeout(function(){
					do { current = Math.floor ( Math.random ( ) * ( elements.length ) ); } while ( current == 0 )
					jQuery.innerfade.next(elements, settings, current, 0);
				}, settings.timeout);
				jQuery(elements[0]).show();
			}	else {
				alert('type must either be \'sequence\' or \'random\'');
			}

		}

	});
};


jQuery.innerfade = function() {}
jQuery.innerfade.next = function (elements, settings, current, last) {

	if ( settings.animationtype == 'slide' ) {
		jQuery(elements[last]).slideUp(settings.speed, jQuery(elements[current]).slideDown(settings.speed));
	} else if ( settings.animationtype == 'fade' ) {
		jQuery(elements[last]).fadeOut(settings.speed);
		jQuery(elements[current]).fadeIn(settings.speed);
	} else {
		alert('animationtype must either be \'slide\' or \'fade\'');
	};

	if ( settings.type == 'sequence' ) {
		if ( ( current + 1 ) < elements.length ) {
			current = current + 1;
			last = current - 1;
		} else {
			current = 0;
			last = elements.length - 1;
		};
	}	else if ( settings.type == 'random' ) {
		last = current;
		while (	current == last ) {
			current = Math.floor ( Math.random ( ) * ( elements.length ) );
		};
	}	else {
		alert('type must either be \'sequence\' or \'random\'');
	};
	setTimeout((function(){jQuery.innerfade.next(elements, settings, current, last);}), settings.timeout);
};
})(jQuery);
