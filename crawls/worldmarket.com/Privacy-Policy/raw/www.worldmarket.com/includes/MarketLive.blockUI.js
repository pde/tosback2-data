/**
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/

/**
 * JavaScript API to block UI and unblock UI. The API includes 3 methods:
 *
 * - MarketLive.blockUI(options)
 * - MarketLive.unblockUI(options)
 * - MarketLive.blockUIWhen(triggerSelector, eventType, options)
 *
 * Note: waiting message (i.e. JavaScript variable MarketLive.blockUI.defaults.message) should be set to an appropriate
 * value depending on user language.
 */

window.MarketLive = window.MarketLive || {};

(function($, ns){

	/**
	 * Method MarketLive.blockUI(options) is used to block UI.
	 *
	 * @param options (Object, optional) options for $.blockUI() method. Accepted options are
	 * - message: Waiting message
	 * - css: CSS for the message
	 * - overlayCSS: CSS for the overlay
	 * More options can be found at http://jquery.malsup.com/block/#options
	 */
	ns.blockUI = function (options) {
		var myoptions = $.extend({}, ns.blockUI.defaults, options);  // avoid changing input parameter
		$.blockUI(myoptions);
	};

	/**
	 * Default options for methods MarketLive.blockUI(options), MarketLive.unblockUI(options),
	 * MarketLive.blockUIWhen(selector, event, options).
	 * Note: message option should support I18N
	 */
	ns.blockUI.defaults = {
		message: null,
		overlayCSS: { backgroundColor: '#fff', opacity: 0.4}
	};

	/**
	 * Method MarketLive.unblockUI(options) is used to unblock UI.
	 *
	 * @param options (Object, optional) options for $.unblockUI() method
	 * Options can be found at http://jquery.malsup.com/block/#options
	 */
	ns.unblockUI = function (options) {
		var myoptions = $.extend({}, ns.blockUI.defaults, options);  // avoid changing input parameter
		$.unblockUI(myoptions);
	};

	/**
	 * Method MarketLive.blockUIWhen(triggerSelector, eventType, options) is used
	 * to block UI when a specified event is triggered on a specified elements.
	 * This method supports jQuery Validate plugin so it will not block UI
	 * when the selected form is invalid.
	 *
	 * @param triggerSelector (String, required) jQuery selector for trigger object(s) to bind event to
	 * @param eventType (String, required) event type for triggering $.blockUI() call
	 * @param options (Object, optional) options for $.blockUI() method
	 */
	ns.blockUIWhen = function (triggerSelector, eventType, options) {
		$(document).ready(function(){
			$(triggerSelector).each(function(){

				// Forms using JavaScript onsubmit handler for validating
				if ($(this).is('form') && eventType.toLowerCase() == "submit" && this.onsubmit != null) {
					// Some forms return false in inline code of onsubmit=".." to prevent submission
					// like onsubmit="return validateProductSelection(noQtyMsg, noOptionsMsg, this, 1);"
					// we will hijack the handler to support BlockUI
					var oldSubmit = this.onsubmit;
					this.onsubmit = function() {
						var result = oldSubmit.apply(this, arguments);
						if (result !== false) { // only "returns false" preventing submission
							// we will block UI when the validate code not return false (form is allowed to submit)
							ns.blockUI(options);
						}
						return result;
					};
				} else {
					$(this).bind(eventType, function() {
						// Forms with jQuery Validate
						var validator = $.data(this, 'validator');
						if ($(this).is('form') && validator) {
							// Automatically unblock when form becomes invalid
							$(this).bind('invalid-form', function(){
								ns.unblockUI(options);
							});
							// Block only only when the form is valid
							if (validator.numberOfInvalids && validator.numberOfInvalids() == 0) {
								ns.blockUI(options);
							}
						} else {
							// Forms without JavaScript valication
							ns.blockUI(options);
						}
					});
				}
			});
		});
	};
})(jQuery, window.MarketLive);
