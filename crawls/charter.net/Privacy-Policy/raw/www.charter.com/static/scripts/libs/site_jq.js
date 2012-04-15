//SITE JQ
var showActive, hideActive;
$(document).ready(function(){
	
	$.fn.autotab = function(options) {
		var defaults = {
			format: 'all',			// text, numeric, alphanumeric, all
			maxlength: 2147483647,	// Defaults to maxlength value
			uppercase: false,		// Converts a string to UPPERCASE
			lowercase: false,		// Converts a string to lowecase
			nospace: false,			// Remove spaces in the user input
			target: null,			// Where to auto tab to
			previous: null			// Backwards auto tab when all data is backspaced
		};

		$.extend(defaults, options);

		var check_element = function(name) {
			var val = null;
			var check_id = $('#' + name)[0];
			var check_name = $('input[name=' + name + ']')[0];

			if(check_id != undefined)
				val = $(check_id);
			else if(check_name != undefined)
				val = $(check_name);

			return val;
		};

		var key = function(e) {
			if(!e)
				e = window.event;

			return e.keyCode;
		};

		// Sets targets to element based on the name or ID passed
		if(typeof defaults.target == 'string')
			defaults.target = check_element(defaults.target);

		if(typeof defaults.previous == 'string')
			defaults.previous = check_element(defaults.previous);

		var maxlength = $(this).attr('maxlength');

		// Each f field has a maximum character limit of 2147483647

		// defaults.maxlength has not changed and maxlength was specified
		if(defaults.maxlength == 2147483647 && maxlength != 2147483647)
			defaults.maxlength = maxlength;
		// defaults.maxlength overrides maxlength
		else if(defaults.maxlength > 0)
			$(this).attr('maxlength', defaults.maxlength)
		// defaults.maxlength and maxlength have not been specified
		// A target cannot be used since there is no defined maxlength
		else
			defaults.target = null;

		// IE does not recognize the backspace key
		// with keypress in a blank input box
		if($.browser.msie)
		{
			this.bind("keydown",function(e) {
				if(key(e) == 8)
				{
					var val = this.value;

					if(val.length == 0 && defaults.previous)
						defaults.previous.focus();
				}
			});
		}

		return this.bind("keypress", function(e) {
			if(key(e) == 8)
			{
				var val = this.value;

				if(val.length == 0 && defaults.previous)
					defaults.previous.focus();
			}
		}).bind("keyup", function(e) {
			var val = this.value;

			switch(defaults.format)
			{
				case 'text':
					var pattern = new RegExp('[0-9]+', 'g');
					var val = val.replace(pattern, '');
					break;

				case 'alpha':
					var pattern = new RegExp('[^a-zA-Z]+', 'g');
					var val = val.replace(pattern, '');
					break;

				case 'number':
				case 'numeric':
					var pattern = new RegExp('[^0-9]+', 'g');
					var val = val.replace(pattern, '');
					break;

				case 'alphanumeric':
					var pattern = new RegExp('[^0-9a-zA-Z]+', 'g');
					var val = val.replace(pattern, '');
					break;

				case 'all':
				default:
					break;
			}

			if(defaults.nospace)
			{
				pattern = new RegExp('[ ]+', 'g');
				val = val.replace(pattern, '');
			}

			if(defaults.uppercase)
				val = val.toUpperCase();

			if(defaults.lowercase)
				val = val.toLowerCase();

			this.value = val;

			/**
			 * Do not auto tab when the following keys are pressed
			 * 8:	Backspace
			 * 9:	Tab
			 * 16:	Shift
			 * 17:	Ctrl
			 * 18:	Alt
			 * 19:	Pause Break
			 * 20:	Caps Lock
			 * 27:	Esc
			 * 33:	Page Up
			 * 34:	Page Down
			 * 35:	End
			 * 36:	Home
			 * 37:	Left Arrow
			 * 38:	Up Arrow
			 * 39:	Right Arrow
			 * 40:	Down Arroww
			 * 45:	Insert
			 * 46:	Delete
			 * 144:	Num Lock
			 * 145:	Scroll Lock
			 */
			var keys = [8, 9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];
			var string = keys.toString();

			if(string.indexOf(key(e)) == -1 && val.length == defaults.maxlength && defaults.target) {
				defaults.target.val().length > 0 ? this.blur() : null;
				defaults.target.focus();
			}
		});
	};

	$.fn.clearDefaultValue = function() {
		return $(this).bind("focus", function() {
			if( this.value == this.defaultValue ) {
				this.value = "";
			}
		}).bind("blur", function() {
			if( !this.value.length ) {
				this.value = this.defaultValue;
			}
		});
	};
	
	showActive = function(e) {
		//	var el = $(e);
		var el = e.currentTarget;
		
		$(el).addClass("active");
		if($(el).hasClass("nav-tv")) {
			$(el).addClass("ieactive");
		};		
	};
	
	hideActive = function(e) {
		//	var el = $(e);
		var el = e.currentTarget;
		
		$(el).removeClass("active");
		if($(el).hasClass("nav-tv")) {
			$(el).removeClass("ieactive");
		};
	};
		
	$(".main-nav>li").hoverIntent(showActive, hideActive);
	
	$("span.cart").hover(showActive, hideActive);
	$("li.account-find").hover(showActive, hideActive);
	
	$("span.cart, li.account-find").hover(function() {
		$('.site-search-form input').blur().text('Search');
	});
	$(document).click(function(e) {
		$('span.cart, li.account-find .active').removeClass('active');
	});
	
/*------------------------------------------------------------------------------------------CLIENT-SIDE VALIDATION */

	$.fn.validatePhoneFields = function() {
		var errClass = "invalid-error";
		var fs = $(this).find("fieldset.phone-fields");
		var inpFields = fs.find("input");
		var errMsg = fs.find(".error-message");
		
		//determine full phone number by joining all segment fields
		var fullPhoneNum = inpFields.map(function(){ return $(this).val() }).get().join("");
		
		inpFields.each(function(){
			//numeric strict typing is done in auto-tab plugin settings
			//check each segment for completion, if there's any input at all, create error	
			$(this).val().length < $(this).attr("maxlength") && fullPhoneNum.length > 0 ? $(this).addClass(errClass) : $(this).removeClass(errClass);
		});
		
		inpFields.hasClass(errClass) ? errMsg.show("fast") : errMsg.hide("fast");

		//set fieldset to active if user had inputted data
		fullPhoneNum.length > 0 ? fs.addClass("active") : fs.removeClass("active");
		
		return !inpFields.hasClass(errClass) && fs.hasClass("active");
	};
	
	$.fn.validateAddressFields = function() {
		var errClass = "invalid-error";
		var fs = $(this).find("fieldset.address-fields");
		var inpFields = fs.find("input");
		var errMsg = fs.find(".error-message");

		var zipField = fs.find("[name='zip_code']");
		var zipFieldDefault = zipField.map(function(){ return this.defaultValue }).get().join("");
		//numeric strict typing is done in auto-tab plugin settings
		zipField.val().length < zipField.attr("maxlength") && zipField.val().length > 0 && zipField.val() != zipFieldDefault ? zipField.addClass(errClass) : zipField.removeClass(errClass);
		
		var addressField = fs.find("[name='street_address']");
		var addressFieldDefault = addressField.map(function(){ return this.defaultValue }).get().join("");
		//regex match for at least one number and one letter and length of at least 3 in street address
		var addressRegEx = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z\s\#\.\&\-\'\/]{3,}$/;
				
		addressField.val().length > 0 && addressField.val() != addressFieldDefault && addressField.val().match( addressRegEx ) == null ? addressField.addClass(errClass) : addressField.removeClass(errClass);
		
		inpFields.hasClass(errClass) ? errMsg.show("fast") : errMsg.hide("fast");
		
		//set fieldset to active if user had inputted data
		zipField.val() != zipFieldDefault && addressField.val() != addressFieldDefault ? fs.addClass("active") : fs.removeClass("active");
		
		return !inpFields.hasClass(errClass) && fs.hasClass("active");
	};

	$.fn.validateLoginFields = function() {
		var errClass = "invalid-error";
		var fs = $(this).find("fieldset.login-fields");
		var inpFields = fs.find("input");
		var errMsg = fs.find(".error-message");
		
		var usernameField = fs.find("[name='zip_code']");
		

		var placeholderField = fs.find(".placeholder-field");
		var passwordField = fs.find(".password-field")
		var placeholderFieldDefault = placeholderField.map(function(){ return this.defaultValue }).get().join("");
		console.log(placeholderFieldDefault);
		passwordField.map(function(){
			if( $(this).val().length == 0) {
				console.log($(this).val().length + " showing");

				$(this).hide();
				$(this).siblings(".placeholder-field").show().val(placeholderFieldDefault);
			}
			return true;
		});
		
		var zipField = fs.find("[name='zip_code']");
		var zipFieldDefault = zipField.map(function(){ return this.defaultValue }).get().join("");
		
		//numeric strict typing is done in auto-tab plugin settings
		zipField.val().length < zipField.attr("maxlength") && zipField.val().length > 0 && zipField.val() != zipFieldDefault ? zipField.addClass(errClass) : zipField.removeClass(errClass);

		//if username and password are filled out but no zip entered
		usernameField.val().length > 0  && passwordField.val().length > 0 && 
		
		inpFields.hasClass(errClass) ? errMsg.show("fast") : errMsg.hide("fast");

		return !inpFields.hasClass(errClass);
	};
	
	$.fn.validateMyAccountLoginFields = function() {
		var errClass = "invalid-error";
		var inpFields = $(this).is("form") ? fs.find("input") : $(this).map(function(){ return this.form }).find("input");
		var fs = $(this).is("form") ? $(this).find("span.login-fields") : $(this).map(function(){ return this.form }).find("span.login-fields");
		var errMsg = $(this).is("form") ? $(this).find(".error-message") : $(this).map(function(){ return this.form }).find(".error-message");

		if( $(this).is("input") ) {
			
			$(this).val().length == 0 ? $(this).addClass(errClass) : $(this).removeClass(errClass);
			
			inpFields.hasClass(errClass) ? errMsg.show("fast") : errMsg.hide("fast");
		}
		
		if( $(this).is("form") ) {			
			var usernameField = fs.find("[name='my-account-login-username']");		
			var passwordField = fs.find("[name='my-account-login-password']");		
			var zipField = fs.find("[name='my-account-login-zip-code']");
		
			//numeric strict typing is done in auto-tab plugin settings
			zipField.val().length < zipField.attr("maxlength") && zipField.val().length > 0 && zipField.val() != zipFieldDefault ? zipField.addClass(errClass) : zipField.removeClass(errClass);

			//if username and password are filled out but no zip entered
			usernameField.val().length == 0 ? usernameField.addClass(errClass) : usernameField.removeClass(errClass);  
			passwordField.val().length == 0 ? passwordField.addClass(errClass) : passwordField.removeClass(errClass);
			zipField.val().length == 0 ? zipField.addClass(errClass) : zipField.removeClass(errClass);
		
			inpFields.hasClass(errClass) ? errMsg.show("fast") : errMsg.hide("fast");
		}
		
		return !inpFields.hasClass(errClass);

	};


/*------------------------------------------------------------------------------------------TOOLTIPS */
	$(".buyflow-tooltip-trigger, .help-tooltip-trigger, .storefront-tooltip-trigger").hoverIntent( function(){ $(this).triggerToolTip(); }, function(){ $(this).toolTipTriggerOff(); } ).bind("click", function(){ return false; });

	$(".buyflow-tooltip, .help-tooltip").each( function(){
		$(this).css({ 
			top: "-" + $(this).height() + "px",
			left: "-" + $(this).width() + "px"
		});
	}).bind("mouseout", function( e ){
		//console.log("tooltip mouseout");
		//if( $(e.currentTarget).find("*").index(e.relatedTarget) < 0 ) {
		if( !$.contains( e.currentTarget, e.relatedTarget ) ) {
			$(this).hideToolTip().removeClass("engaged");
		}
	}).bind("mouseover", function( e ){
		//console.log("tooltip mouseover");
		$(this).addClass("engaged");
	});
	
	//any click from an <a> inside a tooltip, closes the tooltip
	$(".buyflow-tooltip .tooltip-body a, .help-tooltip .tooltip-body a").bind( "click", function(){
		$(this).parents(".buyflow-tooltip").hideToolTip();
		$(this).parents(".help-tooltip").hideToolTip();
		return false;
	} );
	
	$.fn.triggerToolTip = function() {
		clearTimeout( $(this).rollOffTimer );
		var flag = $(this).attr("href").substr($(this).attr("href").indexOf("#")+1);
		$("#buyflow-tooltip-" + flag).show().css({
			top: ($(this).offset().top - 40) + "px",
			left: ($(this).offset().left + $(this).width() + 10) + "px"
		});
		$("#help-tooltip-" + flag).show().css({
			top: ($(this).offset().top - 20) + "px",
			left: ($(this).offset().left + $(this).width()) + "px"
		});
		return this;
	};
	
	$.fn.hideToolTip = function() {
		//determine if the trigger or the tooltip is the caller
		var ttip = $(this).hasClass("buyflow-tooltip-trigger") ? $("#buyflow-tooltip-" + $(this).attr("href").substr($(this).attr("href").indexOf("#")+1)) : $(this);
		ttip = $(this).hasClass("help-tooltip-trigger") ? $("#help-tooltip-" + $(this).attr("href").substr($(this).attr("href").indexOf("#")+1)) : ttip;
		ttip.hide("fast",function(){
			if(FormUtil!==null){
				FormUtil.showSelecterOnIE6();
			}
		}).css({ 
			top: "-" + $(this).height() + "px",
			left: "-" + $(this).width() + "px"
		});

		return this;
	};
	
	$.fn.toolTipTriggerOff = function() {
		//console.log(this);
		var flag = $(this).attr("href").substr($(this).attr("href").indexOf("#")+1);
		var b_ttip = $("#buyflow-tooltip-" + flag);
		var buyflowRollOffTimer = window.setTimeout( function() { b_ttip.hasClass("engaged") ? b_ttip.show() : b_ttip.hideToolTip(); }, 400 );
		var h_ttip = $("#help-tooltip-" + flag);
		var helpRollOffTimer = window.setTimeout( function() { h_ttip.hasClass("engaged") ? h_ttip.show() : h_ttip.hideToolTip(); }, 400 );		
		return this;
	};
	
	/*------------------------------------------------------------------------------------------PROMOTIONAL MODULE CLICKABILITY */

	$(".special-content:not('.special-content-carousel'), .product-module-content1").bind("click", function(e){ 
		e.stopPropagation();
		document.location = $("a.module-link", e.currentTarget).attr("href");
	});
	/*------------------------------------------------------------------------------------------CSS ADVANCED SELECTOR SUPPORT FOR IE6 */

	/* BEGIN CODE WARRANTY. 
	ISSUE DATE: 11/16/2010
	ISSUED BY: JASON GRIER, CREATIVE LIFT
	TYPE: MODIFY/DISABLE CODE
	COMMENT: FOR BLACK FRIDAY PROMOTION

	!!!WARNING: TO REMOVE OR COMMENT THE FOLLOWING 30 LINES WILL CAUSE SERIOUS
	DAMAGE TO MISSION-CRITICAL FEATURES OF THE USER INTERFACE. DO NOT REMOVE,
	ALTER OR COMMENT THE FOLLOWING 30 LINES IN ANY WAY WITHOUT FIRST CONSULTING
	CREATIVE LIFT. */ 

	function setIE6Styles() { 
		jQuery.each(jQuery.browser, function(i, val) {
			if(i=='msie') {
				$('.service-options-area .package-subnavigation a:first-child span').css({'background' : 'none'});
				$('.service-options-area .package-subnavigation a:last-child').css({'background-position' : 'right -57px'});
				$('.service-options-area .package-subnavigation a.package-subnavigation-active+a span').css({'background-position' : '0 -29px'});
				$('.service-options-area .package-subnavigation a:last-child').css({'width': '155px', 'color': '#9B2E2E'});
				$('.service-options-area .package-subnavigation a.package-subnavigation-active:last-child').css({'width': '155px', 'color': '#9B2E2E', 'background-position': 'right'});
				$('div.storefront_promo, .service-options-area .package-subnavigation a:last-child').click(function () {
					setIE6Styles();
					if($('div.bundle-options bundle-listing').length < 3) {
						$('div#storefrontBundles').css({'margin-bottom': '20px'});
					}
				});
			}
		});
	}
	
	$('div.storefront_promo div.product-module-content1').unbind();
	$('div.storefront_promo, div.storefront_promo *, div.product-module-content1').click(function () {
		storeFront.updateTabId(100005);
		callOmniOnTabs('Black Friday Deals');
		setIE6Styles();
		if($('div.bundle-options bundle-listing').length < 3) {
			$('div#storefrontBundles').css({'margin-bottom': '20px'});
		}
		return false;
	});
	
	/* END CODE WARRANTY */

	/*------------------------------------------------------------------------------------------BUYFLOW HEIGHT ADJUST */	
	// $('div#buyflow-body-content').height($('div.buyflow-sidebar').height()+25);
	$('div.buyflow-sidebar li').click(function () {
		// $('div#buyflow-body-content').height($('div.buyflow-sidebar').height()+25);
	});
	
/*****************************************************************
*	PSUEDO ACCORDION :: allows more than one tab to remain open 
******************************************************************/
	function psuedoAccordion() {
		$('.psuedoAccordion h5').click(function() {
			$(this).next().stop().toggle('medium');
			//	$(this).addClass('active');
			return false;
		}).next().stop().hide();
	}



	psuedoAccordion();
	setIE6Styles();
});

$(document).ready(function(){
//	alert($('input:text[name=/synchronoss/charteratg/serviceability/controller/ServiceabilityFormHandler.zipCode]').size());
	$('input:text[name=/synchronoss/charteratg/serviceability/controller/ServiceabilityFormHandler.zipCode]').unbind();	
});