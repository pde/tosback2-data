/**
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/

/*
 * This module depends on 4 internal properties of jQuery Validate plugin to do its job:
 * $.validator.prototype.elements
 * $.validator.prototype.findLastActive
 * $.validator.defaults.onfocusin
 * $.validator.defaults.onfocusout
 * When there is a need to upgrade to new version (>1.7) of jQuery Validate, make sure to verify these internal
 * properties.
 */

// BEGIN scope for our module code
(function($) {

/**
 * ClientSideValidate function to be called by form developers to make a form
 * becomes client-validate ready.
 * Public method.
 *
 * @param {String}
 *            formSelector selector for a form
 * @param {Object}
 *            formOptions validation option for specified form (formSelector
 *            parameter)
 */
ClientSideValidate = function (formSelector, formOptions) {

	// Below block will be executed at the time the DOM becomes ready so $(formSelector).each(..) snippet below can run
	$(function() {
		// default validation options for jQuery Validate plugin following Client-side Validation module's specs
		var defaultOptions = ClientSideValidate.defaults;

		// Debug code
		//window.console && console.log("ClientSideValidate: defaultOptions:");
		//window.console && console.log(defaultOptions);
		//window.console && console.log("ClientSideValidate: formSelector:");
		//window.console && console.log(formSelector);
		//window.console && console.log("ClientSideValidate: formOptions:");
		//window.console && console.log(formOptions);

		// Loop over all forms match the current selector, this code requires DOM is in ready state
		$(formSelector).each(function() {
			// Debug code
			//window.console && console.log("ClientSideValidate: this (form):");
			//window.console && console.log(this);

			// Fixing DOM if the FORM contains TR or TD as direct child
			// (Use currentForm to keep current form because "this" FORM node
			// might be removed when fixing DOM)
			var currentForm = ClientSideValidate.fixDOM(this);

			var validateOptions = $.extend({}, defaultOptions, formOptions);

			// Handle ClientSideValidation-specific option: csValidateRemoveOnSubmitHandler
			if (validateOptions.csValidateRemoveOnSubmitHandler) {
				$(currentForm).attr('onsubmit', "return true;");
			}
			delete validateOptions.csValidateRemoveOnSubmitHandler;

			// Modify jQuery Validate to support duplicate names
			ClientSideValidate.jQueryValidateSupportDuplicateNames();
			// Modify jQuery Validate to detect which element is in focus when error message box will be displayed
			// ClientSideValidate.showErrorsOnFocusOnly will need this information
			ClientSideValidate.jQueryValidateSupportShowErrorsOnFocusOnly();
			// Call jQuery Validate plugin to make the form validate-ready
			$(currentForm).validate(validateOptions);
		});
	});
};


/**
 * Utility method to be used internally to fix legacy code and allow jQuery Validate works correctly.
 * Private method.
 *
 * @param formNode {Object} the FORM node to be fixed
 * @returns {Object} new FORM node if the fix happened or formNode if the fix was not needed
 */
ClientSideValidate.fixDOM = function (formNode) {
	// Fixing DOM (code was modified from sample code on
	// https://intranet/display/RAD/Dev+Notes, section "Legacy Code")
	// If FORM element contains at least a direct child element
	// which is TR or TD, jQuery Validate might display
	// the same error label multiple times for the same control. To
	// avoid this problem, we need to reorganize
	// tag orders so the FORM element will contain the TABLE
	// (instead of containing TR or TD)
	var tempForm = $(formNode);
	// only perform on empty/bad forms
	if (tempForm.html().length == 0) {
		// store the form's parent element
		var parentTable = tempForm.parent();
		// bubble up through the parents until we find the parent Table element
		while (parentTable[0].tagName != "TABLE") {
			parentTable = parentTable.parent();
		}
		// remove the old Form element from the DOM
		$(formNode).remove();
		// wrap the form around the table
		parentTable.wrap(tempForm);

		// replace value in formNode variable (which now becomes invalid) by the new Form
		formNode = $(parentTable.parent());
	}
	return formNode;
};

/**
 * WORKAROUND solution to overcome the limitation of jQuery Validate plugin at http://bugs.jquery.com/ticket/3269 to
 * support forms containing input controls with same name.
 *
 * Tested with jQuery Validate plugin version 1.7
 *
 */
ClientSideValidate.jQueryValidateSupportDuplicateNames = function () {
	if (ClientSideValidate.jQueryValidateSupportDuplicateNamesDone == null) {

		// Below code is modified from jquery.validate.js (version 1.7) to added the snippet "&& validator.checkable(this)"
		// so input text boxes with the same name still be counted
		$.validator.prototype.elements =  function() {
			var validator = this,
			rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
			return $([]).add(this.currentForm.elements)
			.filter(":input")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache && validator.checkable(this) || !validator.objectLength($(this).rules()) )
					return false;

				rulesCache[this.name] = true;
				return true;
			});
		};

		// Below code is modified from jquery.validate.js (version 1.7)
		// so erroneous input text boxes with the same name still be found correctly
		$.validator.prototype.findLastActive =  function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element === lastActive;
			}).length == 1 && lastActive;
		};

		ClientSideValidate.jQueryValidateSupportDuplicateNamesDone = true;
	}
};


/**
 * An implementation for jQuery Validate's errorPlacement callback method. It will display
 * the error message in a dialog which is styled using CSS only.
 * Code was modified from the method errorPlacement ("Applying the Validation", https://intranet/display/RAD/Dev+Notes).
 * Private method.
 *
 */
ClientSideValidate.errorPlacementUsingCSS = function (error, element) {
    error.insertBefore(element);
    var arrow = '<div class="csvalidation_errmessagearrow">';
    for(var i = 10; i > 0; i--) {
        arrow += ('<div class="line'+i+'"><!-- --></div>');
    }
    arrow += '</div>';
    error.append(arrow);
    error.addClass('csvalidation_errmessage');
    error.css('position', 'absolute');
    error.offset({left: 0, top: 0});
    element.data('errormessagebox', error);
    error.addClass('csvalidation_forcehide');
};

/**
 * A utility method to support the below method showErrorsOnFocusOnly(). It will replace jQuery Validate attributes
 * $.validator.defaults.onfocusin and $.validator.defaults.onfocusout by new functions to detect which
 * element is active at the time validation happens so an error message will be displayed for the current active element.
 * ClientSideValidate.onfocuselement will contain information about the active element and this will be used by
 * ClientSideValidate.showErrorsOnFocusOnly() function.
 */
ClientSideValidate.jQueryValidateSupportShowErrorsOnFocusOnly = function () {
	if (ClientSideValidate.jQueryValidateSupportShowErrorsOnFocusOnlyDone == null) {

		var originalonfocusin = $.validator.defaults.onfocusin;
		$.validator.defaults.onfocusin =  function(element) {
			//window.console && console.log("ClientSideValidate: onfocusin");
			ClientSideValidate.onfocuselement = element;
			originalonfocusin.call(this, element);

		};

		var originalonfocusout = $.validator.defaults.onfocusout;
		$.validator.defaults.onfocusout =  function(element) {
			//window.console && console.log("ClientSideValidate: onfocusout");
			ClientSideValidate.onfocuselement = null;
			originalonfocusout.call(this, element);
		};

		ClientSideValidate.jQueryValidateSupportShowErrorsOnFocusOnlyDone = true;
	}
};

/**
 * This method will move the message box for the current input field to right place.
 * The reason for this moving is because on some browsers the offset is not correct
 * when elements are not visible. So we will place the message box whenever it is needed to shown.
 */
ClientSideValidate.moveMessageBox = function (element) {
	var error = $(element).data('errormessagebox');
	if (error != null) {
		if($.browser.safari) {
			// CSVD-4: Safari: $(element).offset() returns wrong offset when Safari zoom level is different to 100%
			// a working solution is to use $(element).position()
			var position = $(element).position();
			error.css("position","absolute");
			var posLeft = position.left;
			var posTop = position.top - error.height();
			error.css("left", posLeft);
			error.css("top", posTop);
			//window.console && console.log("ClientSideValidate: move css left:" + posLeft + "; css top:" + (posTop) + "; text:" + error.text());
		} else {
			var offset = $(element).offset();
			var posLeft = offset.left;
			var posTop = offset.top - error.innerHeight();
			error.offset({left: posLeft, top: posTop});
			//window.console && console.log("ClientSideValidate: move offset left:" + posLeft + "; offset top:" + (posTop) + "; text:" + error.text());
		}

		// support IE6's comboboxes and fix issue old bgiframe detects IE9 as IE6
		$.browser.msie && /msie 6\.0/i.test(navigator.userAgent) && error.bgiframe && error.bgiframe({width: 165});
	}

};

/**
 * In case of IE, we need to draw shadow area and round corner borders.
 * We created a dummy element to inform that error pane is now visible.
 * We used htc 'oncontentready' event to inform that.
 *
 * @param validator the validator object
 * @param element the input element which has error message to be displayed
 */
ClientSideValidate.drawIERoundCornerAndShadow = function (validator, element) {
	if ($.browser.msie){
		// For IE9+, CSS3 does everything already
		if (document.body.style.BoxShadow === undefined && document.body.style.boxShadow === undefined) {
			var errorMessageDiv = $("div.csvalidation_error[htmlfor='" + validator.idOrName(element) + "']");
			if (errorMessageDiv.parent().find("div.csvalidation_error_visible").length == 0){
				// drawing shadow at first time running
				for(var i = 1; i <= 2; i++){
					var errorVisibledInformDiv = $("<div class='csvalidation_error_visible' style='display:none'></div>");
					errorMessageDiv.parent().append(errorVisibledInformDiv);
				}
			}
		}
	}
};

/**
 * An implementation for jQuery Validate plugin showErrors option callback handler which will show errors
 * for only the input which is in focus only.
 */
ClientSideValidate.showErrorsOnFocusOnly = function (errorMap, errorList) {

	// Run default handler first
	this.defaultShowErrors();

	// Our customization code (modified from https://intranet/display/RAD/Dev+Notes)
	var validator = this;
	var errorfields = $(validator.currentForm).find('input.csvalidation_error, select.csvalidation_error');
	errorfields.each(function(){

		// move message box to right place
        // Useful when user zoomed using keyboard and released, when onkeyup happening
		// showErrorsOnFocusOnly will be called and so moveMessageBox to relocate the message box
		ClientSideValidate.moveMessageBox(this);

		var csvFocusHandler = $(this).data('csvFocusHandler');
		if (csvFocusHandler != null) {
			$(this).unbind('focus', csvFocusHandler);
		}
		csvFocusHandler = function (){
			//window.console && console.log("ClientSideValidate: onFocus");

			// show error message
			$("div.csvalidation_error[htmlfor='" + validator.idOrName(this) + "']").parent().removeClass('csvalidation_forcehide');

			// move message box to right place
			ClientSideValidate.moveMessageBox(this);

			// For IE, round corners and shadow must be drawn by HTC code
			ClientSideValidate.drawIERoundCornerAndShadow(validator, this);

		};
		$(this).focus(csvFocusHandler);
		$(this).data('csvFocusHandler', csvFocusHandler);

		var csvBlurHandler = $(this).data('csvBlurHandler');
		if (csvBlurHandler != null) {
			$(this).unbind('blur', csvBlurHandler);
		}
		csvBlurHandler = function (){
			//window.console && console.log("ClientSideValidate: onBlur");
			$("div.csvalidation_error[htmlfor='" + validator.idOrName(this) + "']").parent().addClass('csvalidation_forcehide');
		};
		$(this).blur(csvBlurHandler);
		$(this).data('csvBlurHandler', csvFocusHandler);

	});

	// When the active field has an error (because keyup event handler calling element() method),
	// no error message is display for the active field because no call to focusInvalid() made.
	// An example is when typing in a required field, the field is highlighted in red but no message is displayed
	// (wrong behavior). Below code will find out this case and fix it
	if (this.size() && ClientSideValidate.onfocuselement) {
		var visibleMessageNum = 0;
		$("div.csvalidation_error").each(function(){
			if (!$(this).parent().hasClass('csvalidation_forcehide')) {
				visibleMessageNum ++;
			}
		});
		if (visibleMessageNum == 0) {
			try {
				$(ClientSideValidate.onfocuselement)
				.filter(":visible")
				.focus()
				// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
				.trigger("focusin");
			} catch(e) {
				// ignore IE throwing errors when focusing hidden elements
			}
		}
	}
};


/**
 * Default validation options for jQuery Validate following Client-side Validation module specs.
 */
ClientSideValidate.defaults = {
		errorElement: "div",
		wrapper: "div",
		errorClass: "csvalidation_error",
		errorPlacement : ClientSideValidate.errorPlacementUsingCSS,
		showErrors: ClientSideValidate.showErrorsOnFocusOnly
};

// END scope for our module code
})(jQuery);