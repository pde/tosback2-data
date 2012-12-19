// extend jQuery selectors with ':req' to make finding required fields easy
$.extend($.expr[":"], {
	req: function(a) { 
		if(a.form && $.hasData(a.form) && $.data(a.form,'validator') && $.data(a.form,'validator').settings.rules[a.name]){
			var valid = $.data(a.form,'validator').settings.rules[a.name].required;
			if (typeof valid === 'function'){
				return valid(a);
			}else{
				return valid == true;
			}
		} else {
			return false;
		}
	}
});


$(document).ready(function(){

	var regexes = {
			COSTCO_CREDIT_CARD : /^7\d{15}$/,
			COSTCO_MEMBER_NUMBER : /^\d{12,16}$/,
			GENERIC_CVV : /^\d{3}$/,
			AMEX_CVV : /^\d{4}$/,
			HTML_TAG : /<(\"[^\"]*\"|'[^']*'|[^'\">])*>/
	}
	
	
	if(typeof(messages) == 'undefined') {
	//	debug.log('messages object does\'nt exist. client side debugging is disabled.');
		return false;
	}
	
	// custom validation rule for checking Html tag CC Name field
	$.validator.addMethod("checkSpecialchar", function( value, element ) {
			// CC name shouldn't have any html tag
			return this.optional(element) || !regexes.HTML_TAG.test(value);
		}, messages.ERR_INVALID_CC_NAME);
	
	// custom validation rule for costco membership numbers
	$.validator.addMethod("costcoMembership", function( value, element ) {
			// costco membership numbers are 12 digits
			return this.optional(element) || regexes.COSTCO_MEMBER_NUMBER.test(value);
		}, messages.ERR_INVALID_MEMBERSHIP);

	// custom validation rule for credit cards to also accept '**** ####' and costco credit cards
	$.validator.addMethod("customcc", function( value, element ) {
		//value = value.replace(/\s/g,"").replace(/-/g,"");
		return this.optional(element) || regexes.COSTCO_CREDIT_CARD.test(value) || /^\*{11}\s?\d{4}$/.test(value)|| /^\*{12}\s?\d{4}$/.test(value) || $.validator.methods.creditcard.call($.data(element.form,'validator'), value, element);
	}, messages.ERR_INVALID_CREDITCARD);
	
	$.validator.addMethod("ccTypeCheck", function( value, element ) {
		//value = value.replace(/\s/g,"").replace(/-/g,"");
		 var cc = (value + '').replace(/\s/g, ''); //remove space
		 // rempve spaces 
		 var cardType;
		 if ($('#payMethodId').val() != null) {
			 cardType = $('#payMethodId').val().split(' ').join('');
		 } else if ($('#cardType').val()!= null) {
			 cardType = $('#cardType').val().split(' ').join('');
		 }
		 var returnVal = false;
		
		 if(this.optional(element)){
			 return this.optional(element);
		 }
		 
		if (cardType == getCardType(cc) || 'DefaultPayment' == getCardType(cc) ){
			returnVal = true;
		}
		else if (cc.indexOf('*') != -1){
			//This is just a safety net to catch a * in the payment type to indicate there is 
			//a default payment.  If it is falsely entered the payment gateway will catch and throw an error.
			returnVal = true;
		}
		else {
			returnVal = false;
		}
		return returnVal; 
	}, messages.ERR_INVALID_CREDITCARDTYPE);
	// custom validation  - rule for credit card month and year handles when billMeLater is checked
	$.validator.addMethod("customccexpiration", function( value, element ) {
		var billMeLater = $('#PaymentForm input:radio[name=billMeLater]:checked').val() == 'yes'
		if (billMeLater == true){
			return this.optional(element) || true;
		}else{
			if (/[^0-9]+/.test(value)){
				return this.optional(element) || false;
			}else{
				return this.optional(element) || true;
			}
		}
	}, messages.ERR_EXPYR_REQ);
	
	// custom validation rule for cvv codes
	$.validator.addMethod("cvv", function( value, element ) {
		var ptype = $(element.form['payMethodId']).val();
		return this.optional(element) || (ptype == 'AMEX' && regexes.AMEX_CVV.test(value)) || (ptype != 'AMEX' && regexes.GENERIC_CVV.test(value));
	}, messages.ERR_INVALID_CVV);

	// custom validation rule for cvv codes
	$.validator.addMethod("multiemail", function( value, element ) {
		var a = value.split(',');
		var flag = true;
		for(var i=0; i<a.length; i++) {
			flag = flag && /^\s*((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?\s*$/i.test(a[i])
		}
		return this.optional(element) || flag;
	}, messages.ERR_INVALID_EMAIL);
	
	
	// custom validation rule for cvv codes
	$.validator.addMethod("singleemail", function( value, element ) {
		
		var flag = true;		
		flag = flag && /^\s*((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?\s*$/.test(value)
		
		return this.optional(element) || flag;
	}, messages.ERR_INVALID_EMAIL);
	
	// custom validation rule for phone numbers
	$.validator.addMethod("phone", function( value, element ) {
			// costco phone numbers are 10 digits with optional .-() and space
			return this.optional(element) || /^\(?\d{3}\)?[ -.]?\d{3}[ -.]?\d{4}$/.test(value);
		}, messages.ERR_INVALID_PHONE1);

	// custom validation rule for cash cards
	// 16 digit numeric number with a 5-8 digit numeric PIN 
	// 19 digit numeric number and a 4 digit numeric PIN

	$.validator.addMethod("cashcard", function( value, element ) {
			// costco membership numbers are 12 digits
			return this.optional(element) || /^\d{16}(\d{3})?$/.test(value);
		}, messages.ERR_INVALID_CASHCARD);
	
	// custom validation rule for cash card pins
	$.validator.addMethod("cashcardpin", function( value, element ) {
			// costco pins are 12 digits
			return this.optional(element) || /^\d{4,8}$/.test(value);
		}, messages.ERR_INVALID_CASHCARD_PIN);
	
	// US and Canadian postal codes
	$.validator.addMethod("postalcode", function( value, element ) {
		return this.optional(element) || /^(\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1}[- ]?\d{1}[A-Za-z]{1}\d{1})$/.test($.trim(value));
	}, messages.ERR_ENTER_ZIPCODE);
	
	// US or Canadian postal codes
	$.validator.addMethod("countryspecificpostalcode", function( value, element, params ) {
		if (params.prefix){
			canadaSelector = '#' + params.prefix + '_country option[value=CA]';
		}else{
			canadaSelector = '#_country option[value=CA]';
		}
		if ($(canadaSelector).attr('selected')){
			return this.optional(element) || /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1}[- ]?\d{1}[A-Za-z]{1}\d{1}$/.test($.trim(value));
		}else{
			return this.optional(element) || /^(\d{5}(-\d{4})?$)$/.test($.trim(value));
		}
	}, messages.ERR_ENTER_ZIPCODE);
	
	$.validator.addMethod("addressTypeSelectStateProvince", function( value, element ) {
		if(value == 'NO_STATE_TYPE_SELECTED'){
			return false;
		}else{
			return true;
		}
	}, messages.ERR_INVALID_STATE);
	
	$.validator.addMethod("addressTypeSelect", function( value, element ) {
		if(value == 'NO_ADDRESS_TYPE_SELECTED'){
			return false;
		}else{
			return true;
		}
	}, messages.ERR_MYACCOUNT_ADDRESS_TYPE_SELECTION_INVALID);
	
	// custom validation for expiry month
	$.validator.addMethod("expirymonth", function( value, element ) {
		var ptype = $(element.form['cardType']).val();
		var expMonth = $(element.form['expiration_month']).val();
		if (ptype == 'Costco Credit Card'){
			return true;
		}else{
			if(expMonth == '00'){
				return false;
			}else{
				return true;
			}
			
		}
		
	}, messages.ERR_EXPMON_REQ);
	
	// custom validation for email to friend
	$.validator.addMethod("max10CSV", function( value, element ) {
		var a = value.split(',').length <= 10;
		return a;
		
	}, messages.ERR_EMAIL_TO_FRIEND_MAX_EMAIL);
	
	// custom validation for expiry year
	$.validator.addMethod("expiryyear", function( value, element ) {
		var ptype = $(element.form['cardType']).val();
		var expYr = $(element.form['expiration_year']).val();
		if (ptype == 'Costco Credit Card'){
			return true;
		}else{
			if(expYr == ' '){
				return false;
			}else{
				return true;
			}
			
		}
	}, messages.ERR_EXPYR_REQ);

	// set error placement rule to match our form field markup
	// and remove server side messages when we resubmit a form
	$.validator.setDefaults({
		errorPlacement: function(error, element) {
				var p = element.parent("div");
				error.width(p.outerWidth()).appendTo( p );
			},
		invalidHandler: function(form, validator) {
			    // invalidate placeholders to fix layout issues in older browsers
				$('input[placeholder], textarea[placeholder]').placeholder();
				// clear existing server messages on form resubmit
				$('.error_msg, .success, .server-error').remove();
			},
		errorClass : "validationError"
//		submitHandler: function(form) {
			// invalidate placeholders to fix layout issues in older browsers
		//	$('input[placeholder], textarea[placeholder]', $(form)).placeholder();
		 //  	form.submit();
	//	}
	});
	
	//IE7 fix for resolving the correct position when zooming
	function ZoomCorrection (position){
		if ($.browser.msie && parseInt($.browser.version,10) == 7){
			var b = document.body.getBoundingClientRect(); 
			var zoomfactor = (b.right - b.left)/document.body.clientWidth;
			var result = position / zoomfactor;
			return result;
		}else{
			return position;
		}
	}

	// form validation rules and messages
	$('form.validate').each(function(i,e) {
		switch(e.id) {
			case 'email_product_form' :
				$(e).validate({
					rules : {
						recipients : { 'required' : true, 'multiemail' : true, 'max10CSV' : true },
						senderName : 'required',
						senderEmail : { 'required' : true, 'singleemail' : true }
					}
				});
				break;
			case 'CatalogSearchForm' :
				$(e).validate({
					rules : {keyword : 'required'},
					wrapper: 'div',
					messages: {keyword : messages.ERR_SEARCHTERM_REQ},
					errorPlacement: function(error, element) {
						var marginAdjustment = ZoomCorrection($('#SimpleSearchForm_SearchTerm').position().left) - 228;
						error.appendTo(element.parent()).css('margin-left', marginAdjustment).hide().slideDown('normal', function(){
							$(this).delay(1500).slideUp('normal', function(){
							$(this).remove();
							})
						})
					}
				});
				break;
			case 'InkSearchForm' :
				$(e).validate({
					rules : { keyword : 'required' }
				});
				break;
			case 'EmailSignupForm' :
				$(e).validate({
					rules : { emailaddress : { required:true, email:true} }
				});
				break;
			case 'add_to_wishlist_form' :
				$(e).validate({
					rules : { 
						listIdName : 'required'
					},
					messages : {
						// TODO
					}
				});
				break;
			case 'WishListDetailForm' :
				$(e).validate({
					rules : { 
						listIdName : 'required'
					},
					messages : {
						// TODO
					}
				});
				break
			case 'PaymentMethodForm' : 
				$(e).validate({
					rules : { 
						cardType : 'required',
						number : { required:true, customcc:true,ccTypeCheck:true },
						expMonth : { required:true, expirymonth:true },
						expYear : { required:true, expiryyear:true },
						name : { required:true, checkSpecialchar:true }
					},
					messages : {
						cardType: messages.ERR_CARDTYPE_REQ,
						number: {required:messages.ERR_CCNUM_REQ, customcc:messages.ERR_INVALID_CREDITCARD,ccTypeCheck:messages.ERR_INVALID_CREDITCARDTYPE},
						expMonth: {required:messages.ERR_EXPMON_REQ, expirymonth:messages.ERR_EXPMON_REQ},
						expYear: {required:messages.ERR_EXPYR_REQ, expiryyear:messages.ERR_EXPYR_REQ},
						name: {required:messages.ERR_NAME_REQ,checkSpecialchar:messages.ERR_INVALID_CC_NAME}
					}
				});
				break;
			case 'MembershipRenewalForm' :
				$(e).validate({
					rules: {
						membershipNumber: 'required',
						firstName: 'required',
						lastName: 'required',
						email: 'required',
						price: 'required'
					},
					messages: {
						membershipNumber: messages.ERR_INVALID_MEMBERSHIP_NO,
						firstName: messages.ERR_INVALID_FIRSTNAME,
						lastName: messages.ERR_INVALID_LASTNAME,
						email: messages.ERR_INVALID_EMAIL,
						price: messages.ERR_INVALID_MEMBERSHIP_FEE
					}
				});
				break;
			default : 
			//	debug.log('should add client side validation to #' + e.id + ', but no validation rules have been set up.');
				break;
		}
	});
	

//	MEMBERSHIP APPLICATION FORM
	$('#MembershipAddForm').validate({
		rules: {
			email: {required:true, email:true},
			Billing_firstName: 'required',
			Billing_lastName: 'required',
			Billing_organizationName: 'required',
			Billing_address1: 'required',
			Billing_city: 'required',
			Billing_zipCode: {required: true, 'countryspecificpostalcode':{required:true,prefix:'MembershipAddForm_Billing'}},
			Billing_phone1: {required:true, phone:true},
			Billing_country:'required',
			Billing_state: {'addressTypeSelectStateProvince':true},
			Business_firstName: 'required',
			Business_lastName: 'required',
			Business_organizationName: 'required',
			Business_address1: 'required',
			Business_city: 'required',
			Business_zipCode: {required: true, 'countryspecificpostalcode':{required:true,prefix:'MembershipAddForm_Business'}},
			Business_phone1: {required:true, phone:true},
			Business_country: 'required',
			Business_state: {'addressTypeSelectStateProvince':true},
			secondaryFirstName: {required: function(){
									return $('#MembershipAddForm INPUT[name=secondaryLastName]').val() != ''
								}},
			secondaryLastName:  {required: function(){
									return $('#MembershipAddForm INPUT[name=secondaryFirstName]').val() != ''
								}}
		},
		messages: {
		    email1: {required:messages.ERR_REQUIRED_EMAIL_MY, email:messages.ERR_INVALID_EMAIL},
			Billing_firstName: messages.ERR_INVALID_FIRSTNAME,
			Billing_lastName: messages.ERR_INVALID_LASTNAME,
			Billing_organizationName: messages.JS_VALID_REQUIRED,
			Billing_address1: messages.JS_VALID_REQUIRED,
			Billing_city: messages.JS_VALID_REQUIRED,
			Billing_zipCode: {required:messages.ERR_ENTER_ZIPCODE, countryspecificpostalcode:messages.ERR_ENTER_ZIPCODE},
			Billing_phone1: {required:messages.JS_VALID_REQUIRED, phone:messages.ERR_INVALID_PHONE1},
		    Billing_country: messages.ERR_INVALID_COUNTRY,			
			Billing_state: messages.JS_VALID_REQUIRED,
			Business_firstName: messages.ERR_INVALID_FIRSTNAME,
			Business_lastName: messages.ERR_INVALID_LASTNAME,
			Business_organizationName: messages.JS_VALID_REQUIRED,
			Business_address1: messages.JS_VALID_REQUIRED,
			Business_city: messages.JS_VALID_REQUIRED,
			Business_zipCode: {required:messages.ERR_ENTER_ZIPCODE, countryspecificpostalcode:messages.ERR_ENTER_ZIPCODE},
			Business_phone1: {required:messages.JS_VALID_REQUIRED, phone:messages.ERR_INVALID_PHONE1},
		    Business_country: messages.ERR_INVALID_COUNTRY,
			Business_state: messages.JS_VALID_REQUIRED,
			secondaryFirstName: messages.JS_VALID_REQUIRED,
			secondaryLastName: messages.JS_VALID_REQUIRED
		}
	});
	
// 	HEADER SEARCH FORM
// TODO	
	$('input[placeholder],textarea[placeholder]').placeholder();
	
//	LOGON FORM //modified
	$('#LogonForm').validate({
	rules: {
		logonId: {required:true, email:true},
		logonPassword: 'required'
	   },
	messages: {
		logonId: {email:messages.ERR_INVALID_EMAIL}
	   }
	});

//	RESET PASSWORD FORM //modified
	$('#ResetPasswordForm').validate({
	rules: {
		logonId: {required:true, email:true}
	   },
	messages: {
		logonId: {email:messages.ERR_INVALID_EMAIL}
	   }
	});

//	REGISTER FORM
	$('#RegisterForm').validate({
		rules: {
			email1: {required:true, email:true},
			logonPassword: 'required',
			logonPasswordVerify: {required:true, equalTo: '#RegisterForm input[name="logonPassword"]'},
			userField2: 'costcoMembership'
		},
		messages: {
		    email1: {required:messages.ERR_REQUIRED_EMAIL_MY, email:messages.ERR_INVALID_EMAIL},
			logonPassword: messages.ERR_REQUIRED_PASSWORD_MY,
			logonPasswordVerify: {equalTo:messages.ERR_REQUIRED_PASSWORD_MATCH},
			userField2: messages.ERR_INVALID_MEMBERSHIP_NO
		}
	});

//	COMMUNICATION FORM
	$('#CommunicationForm').validate({
		rules: {
			email: {
				required: function(element) {
					return $("#CommunicationForm input[name='demographicField5Flag']")[0].checked;
				},
				email: true
			}
		},
		messages: {
		}
	});
	
	$('#CommunicationForm input[name=email]').keyup(function(){
		$('#CommunicationForm input[name=demographicField5Flag]').attr('checked', $('#CommunicationForm input[name=email]').val() != "");
	});

//	CHANGE PASSWORD FORM
	$('#ChangePasswordForm').validate({
	rules: {
		logonPasswordOld: 'required',
		logonPassword: 'required',
// TODO	    logonPasswordVerify: { equalTo : logonPassword }
    logonPasswordVerify: 'required'
	   },
	messages: {
	   }
	});
//	$('#change_password_form #new_password').keyup(function(e){checkPasswordStrength(e.target.value)});
//	$('#RegisterForm input[name=logonPassword]').keyup(function(e){checkPasswordStrength(e.target.value)});	
	
	
	$('#header_emailSignup').validate({
		rules : { emailSignUp : { required:true, email:true} },
		messages : { emailSignUp : messages.ERR_INVALID_EMAIL },
		submitHandler: function(form) {
			emailSubmit(form);
		//	return false;
		}
	});
	$('#footer_emailSignup').validate({
		rules : { emailSignUp : { required:true, email:true} },
		messages : { emailSignUp : messages.ERR_INVALID_EMAIL },
		submitHandler: function(form) {
			emailSubmit(form);
		//	return false;
		}
	});	
	$('#EmailSignupForm').validate({
		rules : { emailSignUp : { required:true, email:true} },
		messages : { emailSignUp : "" },
		submitHandler: function(form) {
			emailSubmit(form);
		}
	});

	var CASH_CARD_FORM_SELECTOR = '#CashCardBalanceCheckForm';
	$(CASH_CARD_FORM_SELECTOR).validate({
		onfocusout:false,
		rules : { 
			cash_account: { required:true, cashcard:true },
			cash_pin: { required:true, cashcardpin:true } 
		},
		messages: {
			cash_account: {required:"", cashcard:messages.ERR_INVALID_COSTCOCASH_INFORMATION},
			cash_pin:{required:"", cashcardpin:messages.ERR_INVALID_COSTCOCASH_INFORMATION}
		},
		errorPlacement: function(error, element){
			if( error.text() != "" && $('.CashCardBalanceCheck label.validationError').length == 0){
				error.appendTo('.CashCardBalanceCheck .messages');
			}
		}
	});
	
//	$(CASH_CARD_FORM_SELECTOR).submit(function(){
//		if($(CASH_CARD_FORM_SELECTOR).valid()){
//			$('.CashCardBalanceCheck .messages').toggle();
//			$('.spinner').toggle();
//		}
//	});
	
function addressRequired(element) {
	return element.form['address1'].value != ''
		|| element.form['address2'].value != ''
		|| element.form['city'].value != ''
		|| element.form['zipCode'].value != ''
}
	

	// generic cancel button for all forms
	$('.js-cancel-button').click(function(){
		history.go(-1);
	});
	// cancel button for add wish list
	$('.js-cancel-button-add-wish-list').click(function(){
		window.location.href = $("#add_to_wishlist_form input[name='wishListAddCancel']").val();
	});
	// cancel button for password reset. 
	$('.js-cancel-button-password-reset').click(function(){
			document.location.href=document.getElementById('cancelURL').value;
			//history.go(-1);
	});
	
//	$('#PaymentMethodForm').validate({
//		rules: {
//			cardType: 'required',
//			cardNumber: 'required',
//			expMonth : { required:true, expirymonth:true },
//			expYear : { required:true, expiryyear:true },
//			nameOnCard: 'required'
//		},
//		messages: {
//			cardType: messages.ERR_MYACCOUNT_ADDRESSBOOK_EDIT_MISSING_INFORMATION,
//			expMonth: {required:messages.ERR_EXPMON_REQ, expirymonth:messages.ERR_EXPMON_REQ},
//			expYear: {required:messages.ERR_EXPYR_REQ, expiryyear:messages.ERR_EXPYR_REQ}
//		}
//	});

	// ADDRESS UPDATE FORM
	$('#AddressForm').validate({

		rules: {
			nickName: 'required',
			firstName: 'required',
			lastName: 'required',
		    address1: 'required',
		    city: 'required',
		    country: 'required',
		    state: {'addressTypeSelectStateProvince':true},
		    addressType: {'addressTypeSelect':true}, 
		    zipCode: {required:true, 'countryspecificpostalcode':true},
		    phone1: {required:true, 'phone':true},
		    email1: {required: function(e) { 
		    		 return $(e.form['addressType']).val() == 'B'; }, 
		    		'email':true }
		},
		messages: {
			    nickName: messages.ERR_INVALID_NICKNAME,
				firstName: messages.ERR_INVALID_FIRSTNAME,
				lastName: messages.ERR_INVALID_LASTNAME,
			    address1: messages.ERR_INVALID_STREETADDRESS,
			    city: messages.ERR_INVALID_CITY,
			    country: messages.ERR_INVALID_COUNTRY,
			    state: messages.ERR_INVALID_STATE,
			    addressType: messages.ERR_MYACCOUNT_ADDRESS_TYPE_SELECTION_INVALID,
			    zipCode: {required:messages.ERR_ENTER_ZIPCODE, countryspecificpostalcode:messages.ERR_ENTER_ZIPCODE},
			    phone1: messages.ERR_INVALID_PHONE1,
			    email1: {required:messages.ERR_REQUIRED_EMAIL_MY,email:messages.ERR_NEW_MEMBERSHIP_INVALID_EMAIL}
		   }
		});
	
	// ADDING SHIPPING BILLING
	$('#RegisterAddressForm').validate({

		rules: {
		Billing_nickName: 'required',
		Billing_firstName: 'required',
		Billing_lastName: 'required',
		Billing_address1: 'required',
		Billing_city: 'required',
		Billing_state: {'addressTypeSelectStateProvince':true},
		Billing_zipCode: {required: true, 'countryspecificpostalcode':{required:true,prefix:'RegAddrForm_Billing'}},
		Billing_phone1: {required:true, 'phone':true},
		Billing_email1: {required:true, 'email':true},
		Shipping_nickName: 'required',
		Shipping_firstName: 'required',
		Shipping_lastName: 'required',
		Shipping_address1: 'required',
		Shipping_city: 'required',
		Shipping_state: {'addressTypeSelectStateProvince':true},
		Shipping_zipCode: {required:true, 'countryspecificpostalcode':{required:true,prefix:'RegAddrForm_Shipping'}},
		Shipping_phone1: {required:true, 'phone':true},
		Shipping_email1: {'email':true}
		   },
		messages: {
			   Billing_nickName: messages.ERR_INVALID_BILLINGNICKNAME,
			   Billing_firstName: messages.ERR_INVALID_FIRSTNAME,
			   Billing_lastName: messages.ERR_INVALID_LASTNAME,
			   Billing_address1: messages.ERR_INVALID_STREETADDRESS,
			   Billing_city: messages.ERR_INVALID_CITY,
			   Billing_state: messages.ERR_INVALID_STATE,
			   Billing_zipCode: {required:messages.ERR_ENTER_ZIPCODE, countryspecificpostalcode:messages.ERR_ENTER_ZIPCODE},
			   Billing_phone1: messages.ERR_INVALID_PHONE1,
			   Billing_email1: {required:messages.ERR_REQUIRED_EMAIL_MY, email:messages.ERR_INVALID_EMAIL},

			   Shipping_nickName: messages.ERR_INVALID_SHIPPINGNICKNAME,
			   Shipping_firstName: messages.ERR_INVALID_FIRSTNAME,
			   Shipping_lastName: messages.ERR_INVALID_LASTNAME,
			   Shipping_address1: messages.ERR_INVALID_STREETADDRESS,
			   Shipping_city: messages.ERR_INVALID_CITY,
			   Shipping_state: messages.ERR_INVALID_STATE,
			   Shipping_zipCode: {required:messages.ERR_ENTER_ZIPCODE, countryspecificpostalcode:messages.ERR_ENTER_ZIPCODE},
			   Shipping_phone1: messages.ERR_INVALID_PHONE1,
			   Shipping_email1: {email:messages.ERR_INVALID_EMAIL}
		   },//Changes for Defect CIS100068252 Start
		   invalidHandler: function(form, validator) {
			    // invalidate placeholders to fix layout issues in older browsers
				$('input[placeholder], textarea[placeholder]').placeholder();
				// clear existing server messages on form resubmit
				$('.error_msg, .success, .server-error').remove();
				correctAlignment();
			}//Changes for Defect CIS100068252 End
		});
	// ADDED SHIPPING BILLING
	
	var country = "United States";
	$('#AddressForm select[name=addressType]').change(function(){
		var $c = $('#AddressForm select[name=country]');
		if($(this).val() == 2) {
			$('<span class="countryField">'+country+'</span>').insertAfter($c.hide());
		} else {
			$('#AddressForm .countryField').hide();
			$c.show();
		}
	});
	$('#EmailWishlistForm').validate({
		rules: {
			recipient: {'multiemail':true,'required':true},
			senderName: 'required'
		},
		submitHandler: function(form) {
//Per Business comment #CIS100058050 			
//			$('<div>'+messages.WISHLIST_EMAIL_CONFIRM_SEND+'</div>')
//			.dialog({ title: '', 
//				modal : true,
//				resizable : false,
//				draggable : false, show: 'fade',
//				height: 200, 
//				width: 400,
//				buttons: { 'OK': function() { $(this).dialog('close'); form.submit(); }, 'Cancel' : function() { $(this).dialog('close');  }}
//			});
			form.submit();
   		}
	});

	$('#AddToWishlistForm').validate({
		rules: {
		},
		messages: {
		}
	});

// mark required fields
	$('form input:req, form textarea:req').parent().find('label:first-child').append('<span class="asterisk">*</span>');
	$('#AddressForm input[name=email1]').parent().find('span').remove();
	if($('#AddressForm select[name=addressType]').val() == 'B'){
		$('#AddressForm input[name=email1]').parent().find('label:first').append('<span class="asterisk">*</span>');
	}
});



/* ADDRESS STUFF */
$(window).load(function(){
	// find all country / state select pairs and hook them up
	//loadStatesUI('AddressForm','')
});

//Reload the state field to be input or select depending on the data
function loadStatesUI(form, paramPrefix) {
	form = $('#'+form)[0];
	var currentState = form[paramPrefix + "state"].value;
 var currentCountryCode = form[paramPrefix + "country"].value;
 var stateDivObj = document.getElementById(paramPrefix + "stateDiv");
	while(stateDivObj.hasChildNodes()) {
		stateDivObj.removeChild(stateDivObj.firstChild);
	}

 if (countries[currentCountryCode].states) {
     // switch to state list
     stateDivObj.appendChild(createStateWithOptions(paramPrefix, currentCountryCode, currentState));
 } else {
     // switch to state text input
     stateDivObj.appendChild(createState(paramPrefix, currentState));
 }
}

//Create an input element to represent the state
function createState(paramPrefix, currentState)
{
		var stateInput = document.createElement("input");
		stateInput.setAttribute("id", paramPrefix + "state");
		stateInput.setAttribute("name", paramPrefix + "state");
		stateInput.setAttribute("className", "logon input");
		stateInput.setAttribute("size", "35");
		stateInput.setAttribute("maxlength", "40");
		//stateInput.setAttribute("value", currentState);
		return stateInput
}

//Create an select element to represent the state and load it with the corresponding states
//as defined in the database
function createStateWithOptions(paramPrefix, currentCountryCode, currentState)
{
		var stateSelect = document.createElement("select");
		stateSelect.setAttribute("id", paramPrefix + "state");
		stateSelect.setAttribute("name", paramPrefix + "state");
		stateSelect.setAttribute("className", "logon select");
		
 // clear old options
 stateSelect.options.length = 0;
 
 // add all states
 for (state_code in countries[currentCountryCode].states) {
     // add a state
     aOption = document.createElement("option");
	stateSelect.options[stateSelect.length] = aOption;
     //stateSelect.options.add(aOption);
     aOption.text = countries[currentCountryCode].states[state_code];
     aOption.value = state_code;

     if (state_code == currentState || countries[currentCountryCode].states[state_code] == currentState) {
         aOption.selected = true;
     }
 }
 
 return stateSelect;
}