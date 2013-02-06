/**
 * spInterface - jQuery.plugin for static HTML5 projects usage
 * $().spInterface((string) functionName, (JSON) options)
 */
// Uses AMD (e.g. "requirejs") or browser globals to create a jQuery plugin.

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([ 'jquery' ], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($) { // jQuery plugin code goes here

	var methods = {

		/**
		 * resizeIFrame: Method to resize an iFrame to a specific width and
		 * height. its possible to define a "duration" "easing" effect has do be
		 * implemented in the future.
		 * 
		 * @param {object}
		 *            options A JSON obect that includes the following
		 *            parameters (selector, width, height, duration, easing) -
		 *            see below.
		 * @return {boolean} Returns true if method runs fine or false if an
		 *         error occurs.
		 */

		resizeIFrame : function(options) {

			// extend default parameters if needed
			var settings = $.extend({
				selector : '', // (string) CSS-Selector || (object)
								// window.frame || (object) jQuery-Object
				width : '100%', // (string) neue Breite
				height : '100px', // (string) neue Höhe
				duration : 0, // (number) Animationsgeschwindigkeit in ms
				easing : false
			// (not yet implemented) Animationseffekte

			}, options);

			try {

				// validation of the selector
				if ($(settings.selector).is('iframe')) {

					$(settings.selector).stop().animate({
						height : settings.height,
						width : settings.width
					}, settings.duration);

				}

				// Important: if this method runs as implemented and without
				// errors,
				// return a value that equals Boolean(true) to let the internal
				// interface respond correctly.
				return true;

			} catch (e) {
				console.error('INTERFACE-ERROR: resizeIFrame: ', e);

				// Important: if this method has an error
				// the internal interface needs a return value that equals
				// Boolean(false) to respond correctly.
				return false;
			}

		},

        /**
        * reCountPage: Method to fire Countpixel on Sponsite.
        * @param countIVW 		//true|false count ivw or not
        * @param params 		// NetMind Countparams e.g. {sp.aid:1, sp.channel: 18}
        * @param newParamsOnly	// Use only given Params . Works not whith empty params!
       */
		reCountPage : function(options) {
			// extend default parameters if needed
			var settings = $.extend({
				countIVW : false, // IVW auch zaehlen?
				newParamsOnly : false, // Count only given Params
				params : null
			// neue/geaenderte Params fuer NetMind
			}, options);

			try {

				console.log("SPON - interface: reCountPage");

				if (settings.params) {
					if (settings.newParamsOnly)
						spNmAjax(settings.params);
					else {
						spNmReloadMergeParams(settings.params);
					}
				} else
					spNmReload();
				if (settings.countIVW)
					spIvwReload();

				// Important: if this method runs as implemented and without
				// errors,
				// return a value that equals Boolean(true) to let the internal
				// interface respond correctly.
				return true;

			} catch (e) {
				console.error('INTERFACE-ERROR: reCountPage: ', e);

				// Important: if this method has an error
				// the internal interface needs a return value that equals
				// Boolean(false) to respond correctly.
				return false;
			}

		},

        /**
	        * getBrowserDetector: return global "spBowserDetector" from main javascript.
	        * @return spBowserDetector
	       */
		getBrowserDetector : function() {
			if (spUA != null)
				return spUA;
			var dd = $().spBowserDetector();
			if (dd != null)
				return dd;
			return null;
		}

	};

	$.fn.spInterface = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			console.error('Method ' + method
					+ ' does not exist on jQuery.spInterface');

			// Important: if this method does not exist
			// the internal interface needs a return value that equals
			// Boolean(false) to respond correctly.
			return false;

		}
	};

}));

if (typeof console == "undefined") {
    this.console = {log: function() {}};
}
