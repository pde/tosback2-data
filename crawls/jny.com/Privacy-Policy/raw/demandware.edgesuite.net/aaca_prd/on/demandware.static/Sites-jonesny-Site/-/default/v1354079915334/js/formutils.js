/**
 * Removes an initial value when input field is focused and set initial value when field keep blank.
 * If the element has a class 'realValue' this functionality won't be enabled.
 *
 * Constructor fields:
 * -------------------
 * element  the element to observe
 */
var initialInputValueHandler = Class.create({
	initialize: function(element) {
		try {
			if (element && !element.hasClassName('realValue')) {
				this.inputField = element;
				this.inputField.initialInputValueHandler = this;
				this.initialValue = this.inputField.value;
				this.inputField.observe('focus', this.focusHandler);
				this.inputField.observe('blur', this.blurHandler);
				this.inputField.form.initialInputValueHandler = this;
				
				//IE workaround to set form event
				var temp = this.inputField.parentNode;
				while (temp.tagName != 'FORM') {
					temp = temp.parentNode;
				}
				$(temp).observe('submit', function(event){
				  	var bindObj = this.initialInputValueHandler;
					if (bindObj.inputField != null && bindObj.initialValue != null
							&& bindObj.inputField.value == bindObj.initialValue) {
						bindObj.inputField.value = '';
						}
					 });
				
				// does not work in IE
	/*			if (this.inputField.form.observe) {
					this.inputField.form.observe('submit', this.submitHandler);
				}*/
			}
		} catch(err){} // ie fix
	},

	focusHandler: function() {
		var bindObj = this.initialInputValueHandler;
		if (bindObj.inputField != null && bindObj.initialValue != null
				&& bindObj.inputField.value == bindObj.initialValue) {
			bindObj.inputField.value = '';
		}
	},
	
	blurHandler: function() {
		var bindObj = this.initialInputValueHandler;
		if (bindObj.inputField != null && bindObj.initialValue != null
				&& bindObj.inputField.value == '') {
			bindObj.inputField.value = bindObj.initialValue;
		}
	},
	
	submitHandler: function() {
		var bindObj = this.initialInputValueHandler;
		if (bindObj.inputField != null && bindObj.initialValue != null
				&& bindObj.inputField.value == bindObj.initialValue) {
			bindObj.inputField.value = '';
		}
	}
});

/**
 * Helps a form that will be submitted by a <input type="image" .../> element using GET method
 * to produce a cachable request. (without clicking coordinates)
 * Currently the name of the button will not be attached to the request.
 *
 * Constructor fields:
 * -------------------
 * form  the form to extend
 */
var cachedSubmit = Class.create({
	submitButton : null,
	
	initialize: function(form) {
		if (form && form.method == 'get') {
			this.form = form;
			var inputImages = form.getInputs('image');
			for (var i = 0; i < inputImages.length; i++) {
				var button = inputImages[i];
				button.cachedSubmitHandler = this;
				if (this.submitButton == null) {
					this.submitButton = new Element('input', {type: 'submit'});
					this.submitButton.hide();
					button.insert({after: this.submitButton});
				}
				button.onclick = this.clickHandler;
			}
		}
	},
	
	clickHandler: function() {
		if (this.disabled == false) {
			var bindObj = this.cachedSubmitHandler;
		    bindObj.submitButton.click();
		}
		return false;
	}
});

/**
 * Removes the password value from the input element, if radio button for no password is selected.
 * Sets radio button for 'have password', if a password is entered
 *
 * Constructor fields:
 * -------------------
 * inputEl  the password input element
 * pwdEl  the 'have password' radio button element
 * noPwdEl  the 'no password' radio button element
 */
var passwordHandler = Class.create({
	initialize: function(inputEl, pwdEl, noPwdEl) {
		if (inputEl && pwdEl && noPwdEl) {
			this.inputField = inputEl;
			this.inputField.passwordHandler = this;
			this.pwdBtt = pwdEl;
			this.pwdBtt.passwordHandler = this;
			this.noPwdBtt = noPwdEl;
			this.noPwdBtt.passwordHandler = this;
			this.inputField.observe('keydown', this.inputHandler);
			this.noPwdBtt.observe('click', this.clickHandler);
		}
	}, 
	
	clickHandler: function() {
		var bindObj = this.passwordHandler;
		if (bindObj.inputField != null) {
			bindObj.inputField.value = '';
		}
	}, 
	
	inputHandler: function() {
		var bindObj = this.passwordHandler;
		if (bindObj.pwdBtt != null) {
			bindObj.pwdBtt.checked = 'true';
		}
	}
});

/**
 * Attaches form fields of the specified class with a radio button. Typing in text
 * in the form fields selects the radio button.
 */
var attachFieldsWithRadioButtons = Class.create({
	initialize: function(fieldClass, radioButton) {
		if (radioButton != null) {
			this.radioButton = radioButton;
			var fields = $$('input.' + fieldClass);
			for (var i = 0; i < fields.length; i++) {
				fields[i].afwrb = this;
				fields[i].onkeydown = function() {
					if (!this.afwrb.radioButton.checked) {
						if(this.value != '') {
							this.afwrb.radioButton.checked = true;
						}
					}
				}
			}
		}
	}
});

if("observe" in document) {
	document.observe('dom:loaded', function() {
		var iivhFields = $$('.initialInputField');
		for (var i = 0; i < iivhFields.length; i++) {
			new initialInputValueHandler(iivhFields[i]);
		}
		
		new cachedSubmit($('SimpleSearchForm'));
		
		new passwordHandler($('pwdValueInput'), $('havepassword'), $('nopassword'));
	});
}