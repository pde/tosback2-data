

$(document).ready(function(){
	//initiallze modals by iterating through all modal triggers
	onModalShow = function( h ) {
		//hide all modals
		$(".site-modal-normal:visible,.site-modal-buyflow:visible").jqmHide();
		//show selected modal
		h.w.show().find("input").each(function(){
			$(this).val(this.defaultValue);
			$(this).hasClass("placeholder-field") ? $(this).show() : null;
			$(this).hasClass("password-field") ? $(this).hide() : null;
		});
	};
	/*
	$("a[href^='#modal-']").each( function(){
		$( $(this).attr("href") ).jqm( { onShow: onModalShow } );
		$( $(this).attr("href") ).jqmAddTrigger( $(this) );
	});
	*/
	
	$(".modal-body .localize-form-phone input[name='modal-phone-number-segment1']").autotab({ target: 'modal-phone-number-segment2', maxlength: 3, format: 'numeric' });
	$(".modal-body .localize-form-phone input[name='modal-phone-number-segment2']").autotab({ target: 'modal-phone-number-segment3', maxlength: 3, format: 'numeric', previous: 'modal-phone-number-segment1' });
	$(".modal-body .localize-form-phone input[name='modal-phone-number-segment3']").autotab({ target: 'modal-phone-number-segment1',format: 'numeric', maxlength: 4, previous: 'modal-phone-number-segment2' });
	$(".modal-body fieldset.address-fields input[name='zip_code']").autotab({ format: 'numeric', maxlength: 5, previous: 'street_address' });
	$(".modal-body fieldset.login-fields input[name='zip_code']").autotab({ format: 'numeric', maxlength: 5, previous: 'user_password' });


/*------------------------------------------------------------------------------------------CLIENT-SIDE VALIDATION OF LOCALIZATION MODAL */

	//on blur of each phone field validate the field and check that length matches maxlength attribute
	
	$("#modal-localize-form input").each(function(){
		$(this).bind("blur", function(){
			$(this.form).validatePhoneFields() || $(this.form).validateAddressFields() ? $("#modal-localize-submit").removeClass("disabled") : $("#modal-localize-submit").addClass("disabled");
		});
	});
	
	
	$("#modal-localize-form").bind("keyup", function(e){
		//listen for user to press enter so the form can be submitted
		if(e.keyCode == 13 ) { $(this).submit(); }
	}).bind("submit", function(){
		//submit form if no inputs have "invalid-error" class and one fieldset is active
		if( $(this).validatePhoneFields() || $(this).validateAddressFields() ) {
			return true;
		} else {
			return false;
		}
		
	});
	$("#modal-localize-submit").bind("click", function(e){
		e.preventDefault();
		$(this).hasClass("disabled") ? null : $(this).parents("form").eq(0).submit();
		return false;
	});

/*------------------------------------------------------------------------------------------CLIENT-SIDE VALIDATION OF LOGIN MODAL */

	$("#modal-login-form input").each(function(){
		$(this).bind("blur", function(){
			$(this.form).validateLoginFields() ? $("#modal-login-submit").removeClass("disabled") : $("#modal-login-submit").addClass("disabled");
		});
	});

	$("#modal-login-form input.placeholder-field").bind("focus", function(){
		$(this).hide();
		$(this).siblings(".password-field").show().focus();
	});

});