var modals = modals ? modals : {};
modals.orderLineItem = { autoOpen: false, draggable: false, height: 420, width: 520, modal: true, resizable: false, show: 'fade' };

$(window).load(function() {

	// country/state dropdowns
	$('.address-wrap').countryStateSelect();
	

	// fix checkboxes for commerce form submits
	linkCheckbox($('#AddressForm #primaryOption'), $('#AddressForm input[name=primary]'));
	
	// billing shipping address form in the checkout flow
	$('#RegAddrForm_Billing_country').change(function(){
		$('.address-copy').toggle(shippingCountries.indexOf($(this).val()) > -1);
	})
	$("input#same").click(function(){ 
        $('.address-wrap:eq(1) input[type!=hidden], .address-wrap:eq(1) select').each(function(i,o){
	    	$(o).val($("input#same").is(':checked') ? $('.address-wrap:eq(0) input[type!=hidden], .address-wrap:eq(0) select').eq(i).val() : '').change();
	    });
        var validator = $("#RegisterAddressForm").validate();
        validator.resetForm();
        if($('#Shipping_nickName').val() == ''){        	
        	validator.showErrors({"Shipping_nickName":  messages.ERR_INVALID_SHIPPINGNICKNAME});
        }
        if($('#Shipping_nickName').val() == $('#WC_AddressForm_FormInput_Billing_nickName_In_AddressForm_1').val()){
        	validator.showErrors({"Shipping_nickName": messages.ERR_ENTER_UNIQUE_NICKNAME});
        }
        
        /* Calling placeholders to re-gain original state - Defect CIS100068682 */
        $('input[placeholder], textarea[placeholder]').placeholder();
        /* Calling correctPlaceholder()to re-gain original state for unsupported browsers - Defect CIS100068682 */
        if (! isPlaceholderSupported()) {
    		correctPlaceholder();
    	}
        
    }); 
	
	/* Calling placeholders to re-gain original state - Defect CIS100068682 */
	$("#Shipping_nickName").change(function(){
		console.log('inside');
		$('input[placeholder], textarea[placeholder]').placeholder();
		 /* Calling correctPlaceholder()to re-gain original state for unsupported browsers - Defect CIS100068682 */
		if (! isPlaceholderSupported()) {
    		correctPlaceholder();
    	}
	});


	// sign in page remember me checkbox
		$('#LogonForm').submit(function() {
			if ($('#option1').is(':checked')) {
				$.cookie('rememberedLogonId', $('#logonId').val(), { expires: 14, path:'/' });
			} else {
				$.cookie('rememberedLogonId', null);
			}
		});
		if ($('#LogonForm #errorlogon').val() == 'True'){
			var n = $('#logonId').val();
			$('#logonId').val(n);
		}else{
			var n = $.cookie('rememberedLogonId');
			$('#logonId').val(n);
			$("#option1").prop('checked', n != null);	
		}
		
	
	
	$('#checkOutOption').change(function(){
		if($(this).is(':checked')) {
			$('#primaryOption').removeAttr('disabled').parent().removeClass('disabled');	
		} else {	
			$('#primaryOption').attr('checked',false).attr('disabled','disabled').parent().addClass('disabled');	
		}
	}).change();

	
	function addressRequired(element) {
		return element.form['address1'].value != ''
			|| element.form['address2'].value != ''
			|| element.form['city'].value != ''
			|| element.form['zipCode'].value != ''
	}


	var $email_field = $('#ProfileUpdateForm_email1');
	$email_field.data('old_value', $email_field.val());
	
	$('#LinkMembershipForm').validate({
		rules: {
			membershipNumber: {required:true, 'costcoMembership':true}
		},
		messages: {
			membershipNumber: {'costcoMembership':messages.ERR_INVALID_MEMBERSHIP_NO}
		}
	});
	
//		PROFILE UPDATE FORM
	$('#ProfileUpdateForm').validate({
		onfocusout: false,
		rules: {
			email1 : { required : true, email : true },
			address1 : { required : addressRequired },
			city : { required : addressRequired },
			zipCode : { required : addressRequired, 'postalcode' : true },
			userField2 : 'costcoMembership'
	   	},
	   	messages: {
	   		email1: {required : messages.ERR_REQUIRED_EMAIL_MY, email : messages.ERR_INVALID_EMAIL },
	   		address1: messages.ERR_INVALID_STREETADDRESS,
	   		city: messages.ERR_INVALID_CITY,
	   		zipCode: messages.ERR_ENTER_ZIPCODE,
	   		userField2: messages.ERR_INVALID_MEMBERSHIP_NO
	   	},
		submitHandler: function(form) {
	   		var btns = {};
	   		btns[messages.JS_DIALOG_OK] = function() { $(this).dialog('close'); form.submit(); };
	   		btns[messages.JS_DIALOG_CANCEL] = function() { $(this).dialog('close');  };
   			if($email_field.val() != $email_field.data('old_value')) {
   				$('<div>'+messages.CHANGE_EMAIL_MSG+'</div>')
   				.dialog({ title: '', 
   					modal : true,
   					resizable : false,
   					draggable : false, show: 'fade',
   					height: 300, 
   					width: 400,
   					buttons: btns
   			    });
   				$('div.ui-dialog').find('button').addClass('costco-button').addClass('submit');
   				$('div.ui-dialog').find('.ui-button-text').wrap('<span class="s1"></span>');
   				$('div.ui-dialog').find('.ui-button-text').addClass('s2').removeClass('ui-button-text');
   			} else {
   				form.submit();
   			}
	   	}
	});

	
	/* Add / Update Payment Method */
	// when the user changes the card type, clear the number and expiration date [[BR-609]]
	$('#PaymentMethodForm #cardType').change(function() {
		toggleCCFields();
		invalidateCardType();
	});
	toggleCCFields();

	$('.order-line-item').each(function() {
		var lineItem = this;
		var modalOptions = modals.orderLineItem;
		modalOptions['title'] = $('.modal-title', lineItem).html();
		var modal = $('.modal-window', lineItem).dialog(modalOptions);
		$('.modal-link', lineItem).click(function(){
			modal.dialog('open');
			return false;
		});
	});
	
	$('.fsa-order-status tr.summary-line').click(function(event) {
		var orderClass = $(this).find('input[name=fsa-order-class]').val();
		$(this).toggleClass('open-arrow');
		$('.'+orderClass).toggle(); 
	});
});


function toggleCCFields() {
	var ccc = $('#PaymentMethodForm #cardType').val() == 'Costco Credit Card';
	$('#PaymentMethodForm .date-selects').toggleClass("disabled", ccc);
	$('#PaymentMethodForm .date-selects select').prop("disabled", ccc);
}

$.fn.countryStateSelect = function(options) {	
	return this.each(function(){
		
		var $type = $('*[name=addressType]', $(this).closest(':has(*[name=addressType])')).first(typeChange),
		$country = $(".country_select",this).first().change(countryChange),
		$state = $(".state_select",this).first(),
		state_default = $('input[name=state_old]',this).val(),
		country_default = $('input[name=country_old]',this).val() != '' ? $('input[name=country_old]',this).val() : wcs.locale.split('_')[1];
		
		function typeChange() {
			$(makeOptions(getCountries($type.val()), 'displayName', 'code')).appendTo($country.html(''));
			$country.val(country_default);
			countryChange();
		};
		function countryChange() {
			var state_list = $country.find('option:selected').data('real_value').states;
			$(makeOptions(state_list, 'displayName', 'code')).appendTo($state.html(''));
			$state.val(state_default);
			$state.find('option').addClass("form-dropDownSelectionForceBlack")
		};
	
		typeChange();
	
	});
};

function addressTypeChange(element){
	// Testing if canadian 
	if (wcs.locale == 'en_CA' || wcs.locale == 'fr_CA'){
		var billingselected = (element.value == 'B');
		var countryoption = $('#_country');
		// US billing addresses are valid for costco.ca
		if ( billingselected == true ){
			if (countryoption.find('option[value=US]').length == 0){
				countryoption.append($('<option></option>').val('US').html('United States'));
			}
			countryoption.find('option[value=US]').show();
		}else{
			// Hide US country for costco.ca and reset the country drop down
			//countryoption.find('option[value=US]').remove();
			
				countryoption.find('option[value=US]').remove();
				var canadianoption = countryoption.find('option[value=CA]');
				if (!canadianoption.attr('selected')){
				canadianoption.attr('selected',true);
				//$('.country_select').trigger('change').hide().show();
			}
			
		}
	}
	countryoption.hide();
	countryoption.show();
}
//Defect CIS100069063: Show US country for Billing Address in costco.ca 
$.fn.showOption = function() {
    this.each(function() {
     var opt = $(this).find('option').show();
    $(this).replaceWith(opt)
        
        });     
}
//Defect CIS100069063: Hide US country for Billing Address in costco.ca 
$.fn.hideOption = function() {
        this.each(function() {
        	$(this).wrap('<span>').hide()
        });
}

function deleteWishList(vURL){
	$("<div>"+messages.WISHLIST_DELETE_CONFIRMATION_MESSAGE+"</div>")
	.dialog({ title: messages.WISHLIST_DELETE_CONFIRMATION_TITLE, 
		modal : true, 
		resizable : false,
		draggable : false, show: 'fade',
		buttons: [
		    {	text:messages.JS_DIALOG_OK,
		    	click: function() { $(this).dialog('close').remove(); window.location.href = vURL; }},
		    {	text:messages.BUTTON_CANCEL,
		    	click: function() { $(this).dialog('close').remove(); return false; }}
 		]
    });
	var buttons = $('div.ui-dialog').find('button');
	for(var i=0; i<buttons.length; i++){
		if (i % 2==0){
			$(buttons[i]).addClass('costco-button submit');
		}else{
			$(buttons[i]).addClass('costco-button button');
		}
	}
	$('div.ui-dialog').find('.ui-button-text').wrap('<span class="s1"></span>');
	$('div.ui-dialog').find('.ui-button-text').addClass('s2').removeClass('ui-button-text');
}

function removeCreditCard(form,xcreditCardId) {
	$("<div>"+messages.DELETE_PAY_METHOD_CONFIRM+"</div>")
	.dialog({ title: messages.DELETE_PAY_METHOD_COFIRM_TITLE, 
		modal : true, 
		resizable : false,
		draggable : false, show: 'fade',
		buttons: [
		    {text:messages.JS_DIALOG_OK, click: function() { 
				form.action = "PaymentMethodUpdateCmd?taskType=DELETE&xcreditCardId="+xcreditCardId;
		 		form.submit();
		 	}},
		    {text:messages.JS_DIALOG_CANCEL, click: function() {
		 		$(this).dialog('close').remove(); 
		 	}}
 		]
    });
	var buttons = $('div.ui-dialog').find('button');
	for(var i=0; i<buttons.length; i++){
		if (i % 2==0){
			$(buttons[i]).addClass('costco-button submit');
		}else{
			$(buttons[i]).addClass('costco-button button');
		}
	}
	$('div.ui-dialog').find('.ui-button-text').wrap('<span class="s1"></span>');
	$('div.ui-dialog').find('.ui-button-text').addClass('s2').removeClass('ui-button-text');
}

function deleteAddress(vURL){	
	$("<div>"+messages.ADDRESSBOOK_MESSAGE1+"</div>")
	.dialog({ title: messages.WISHLIST_DELETE_CONFIRMATION_TITLE, 
		modal : true, 
		resizable : false,
		draggable : false, show: 'fade',
		buttons: [
		    {	text:messages.JS_DIALOG_OK,
		    	click: function() { $(this).dialog('close').remove(); window.location.href = vURL; }},
		    {	text:messages.BUTTON_CANCEL,
		    	click: function() { $(this).dialog('close').remove(); return false; }}
 		]
    });
	var buttons = $('div.ui-dialog').find('button');
	for(var i=0; i<buttons.length; i++){
		if (i % 2==0){
			$(buttons[i]).addClass('costco-button submit');
		}else{
			$(buttons[i]).addClass('costco-button button');
		}
	}
	$('div.ui-dialog').find('.ui-button-text').wrap('<span class="s1"></span>');
	$('div.ui-dialog').find('.ui-button-text').addClass('s2').removeClass('ui-button-text');
}

// helper functions
function getCountries(type) {
	switch(type) {
		case 'B' : return countries.filter(function(a) { return billingCountries.indexOf(a.code) > -1; });
		case 'S' : return countries.filter(function(a) { return shippingCountries.indexOf(a.code) > -1; });
		default : return countries;
	}
}

function invalidateCardType() {
	$('#card_number').val('')
	// val('') dosnt work on dropdowns in IE
	$('#name').val('')
	$('#expiration_month, #expiration_year').find('option:first').attr('selected', 'selected');
}

function pagesizeChange(selectElement,value) {
	if (value != undefined){
		$('#pageSize').val(value);
	}else{
		$('#pageSize').val($(selectElement).val());
	}
	$('#AddressBookForm').submit();
}
function pageNumberChange(param) {
	document.AddressBookForm.currentPage.value = param;
	$('#AddressBookForm').submit();
}
function sortChange() {
	$('#AddressBookForm').submit();
}

function linkCheckbox($cb, $input) {
	$cb.change(function(){ $input.val($(this).is(':checked') ? '1' : '0'); })
}

function getCardType(cc){
	if ((/^(34|37)/).test(cc) && cc.length == 15) {
	    return 'AMEX'; //AMEX begins with 34 or 37, and length is 15.
	} else if ((/^(51|52|53|54|55)/).test(cc) && cc.length == 16) {
	    return 'MasterCard'; //MasterCard beigins with 51-55, and length is 16.
	} else if ((/^(4)/).test(cc) && (cc.length == 13 || cc.length == 16)) {
	    return 'VISA'; //VISA begins with 4, and length is 13 or 16.
	} else if ((/^(6011|65)/).test(cc) && cc.length == 16) {
	    return 'Discover'; //Discover begins with 6011, and length is 16.
	} else if ((/^(7111|7003)/).test(cc) && cc.length == 16) {
	    return 'CostcoCreditCard';  //Costco Credit Card begins with 7, and length is 15.
	} else if ((/^(\*)/).test(cc)) {
	    return 'DefaultPayment';  //This is a default payment 
	}
	return '?'; //unknow type
}

//Changes for Defect CIS100068252 Start

//setting the offset of the label as that of the input
function correctPlaceholder(){
	var input = $('.PLACEHOLDER-INPUT');
	var label = $('.PLACEHOLDER-LABEL');
	var topPos;
	for(i=0;i<input.length;i++)	{
		topPos = $(input[i]).offset();
		$(label[i]).offset(topPos);
	}
}
//Function to check whether the placeholder attribute is supported in the browser or not
function isPlaceholderSupported() {
      var input = document.createElement("input");
      return ('placeholder' in input);
}
//correcting the alignment of the place holders on unsupported browsers
function correctAlignment(){
	  var placeholdersupport = isPlaceholderSupported(); 
    if (placeholdersupport == false) {
	 	$("input[type='text']").focus(function(){
	 		interval = setInterval(correctPlaceholder,100);
	 		});
		$("input[type='text']").blur(function(){
			clearInterval(interval);
			});
		}
}
//Changes for Defect CIS100068252 End
