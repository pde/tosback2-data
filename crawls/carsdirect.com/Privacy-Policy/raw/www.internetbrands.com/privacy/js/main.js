function hideFormText() {
	var _inputs = document.getElementsByTagName('input');
	var _txt = document.getElementsByTagName('textarea');
	var _value = [];
	
	if (_inputs) {
		for(var i=0; i<_inputs.length; i++) {
			if (_inputs[i].type == 'text' || _inputs[i].type == 'password') {
				
				_inputs[i].index = i;
				_value[i] = _inputs[i].value;
				
				_inputs[i].onfocus = function(){
					if (this.value == _value[this.index])
						this.value = '';
				}
				_inputs[i].onblur = function(){
					if (this.value == '')
						this.value = _value[this.index];
				}
			}
		}
	}
	if (_txt) {
		for(var i=0; i<_txt.length; i++) {
			_txt[i].index = i;
			_value['txt'+i] = _txt[i].value;
			
			_txt[i].onfocus = function(){
				if (this.value == _value['txt'+this.index])
					this.value = '';
			}
			_txt[i].onblur = function(){
				if (this.value == '')
					this.value = _value['txt'+this.index];
			}
		}
	}
}
if (window.addEventListener)
	window.addEventListener("load", hideFormText, false);
else if (window.attachEvent)
	window.attachEvent("onload", hideFormText);

(function() {

	// Create Privacy Policy namespace if it doesn't exist. PP for privacy policy.
	var PP = (typeof PP == "object") ? PP : {};

	PP.validateForm = function () {
		
		var clearAllErrors = function() {
			$('.required_error').hide();
			$('.required_field_error').removeClass();
		}

		var setError = function(el,message) {
			$(el).siblings('.required_error').html(message);
			$(el).siblings('.required_error').show();
			$(el).addClass('required_field_error');
		}

		var clearError = function(el) {
			$(el).siblings('.required_error').hide();
			$(el).removeClass('required_field_error');
		}

		var checkValue = function(el,length_limit) {
			if($(el).val().length === 0 || $(el).val() === "0") {
				setError(el,'required');
				return false;
			}
			else if(length_limit !== null) {
				if($(el).val().length > length_limit) {
					setError(el,length_limit+' character limit');
					return false;
				} else {
					clearError(el);
					return true;
				}
			}
			else {
				clearError(el);
				return true;
			}
		}

		this.validateSingleField = function(el,length_limit) {
			checkValue(el,length_limit);
		}

		this.validateAll = function() {
			var errorCount = 0;
			clearAllErrors();
			for(i=0;i<this.settings.fields.length;i++) {
				if(!checkValue($('#'+this.settings.fields[i].id), this.settings.fields[i].length_limit)) errorCount++;
			}
			if(errorCount === 0) return true;
			return false;
		}

	}

	$(document).ready(function() {
		var privacyContactForm = new PP.validateForm();

		privacyContactForm.settings = {fields : [
								{id: "privacyContactForm_region", length_limit: null},
								{id: "privacyContactForm_firstName", length_limit: null},
								{id: "privacyContactForm_lastName", length_limit: null},
								{id: "privacyContactForm_email", length_limit: null},
								{id: "privacyContactForm_website", length_limit: 40},
								{id: "privacyContactForm_subject", length_limit: null},
								{id: "privacyContactForm_comments", length_limit: 300}]
							 }

		$('#privacyContactForm_submit').click(function() {
			if(privacyContactForm.validateAll()) $('#privacyContactForm').submit();
			else return false;
		});

		$('.privacyform_input').blur(function() {			
			var char_limit = ($(this).attr('data-char-limit') === undefined ? null : $(this).attr('data-char-limit'));
			privacyContactForm.validateSingleField(this,char_limit);
		});
	});

})(jQuery);