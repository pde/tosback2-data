FormWrapper = function(formElement) {
	this.formElement = formElement;
	this.form = $(formElement);
	this.validateResult = null;
	this.forceBulrValidate = false;
	this.needValidateBeforeSubmit = true;
	this.fieldValidateEvents = new Array();
	this.handleAllErrorSource = new Array();
	this.formValidateEvents = new Array();
	
	this.validateActivedFieldMap = new Object();
	this.triggerValidateSource = null;
	this.currentSource = null;
	this.handleSubmit = null;
};
FormWrapper.prototype = {
	handleValidationResponse : function(response, triggerValidateSource) {
	    var thisObj = this;
	    thisObj.validateResult = eval("(" + response + ")");
		var errorMessageMap = thisObj.validateResult.errorMap;

		thisObj.triggerValidateSource = triggerValidateSource;

		if (thisObj.triggerValidateSource != null) {
			var sourceValidateName = thisObj.triggerValidateSource
					.attr("validationName");
			if (errorMessageMap[sourceValidateName] != null && errorMessageMap[sourceValidateName].length > 0) {
				thisObj.validateActivedFieldMap[sourceValidateName] = {
					field : triggerValidateSource,
					errorMessage : errorMessageMap[sourceValidateName]
				};
				thisObj.notifyEvents(thisObj.fieldValidateEvents, false);
			} else {
				thisObj.validateActivedFieldMap[sourceValidateName] = null;
				thisObj.notifyEvents(thisObj.fieldValidateEvents, true);
			}
		}else{
			
			var allFieldsToValidate = this.form.find("input[validationName][needvalidation!='false']");
			allFieldsToValidate.each(function(){
				
				thisObj.currentSource = $(this);
				var sourceValidateName = $(this).attr("validationName");
				
				if (errorMessageMap[sourceValidateName] != null && errorMessageMap[sourceValidateName].length > 0) {
					
					thisObj.notifyEvents(thisObj.handleAllErrorSource, false);
				} else {
					
					thisObj.notifyEvents(thisObj.handleAllErrorSource, true);
				}
				
			});
			thisObj.notifyEvents(thisObj.formValidateEvents);
		}
		
	},
	
	init : function() {
		this.bindingEmptyValue();
		this.bindingAutoTab();
		this.bindingEnterSubmit();
		this.bindingNumberOnly();
	},
	bindingDynmicValidation : function(){
		
		this.bindingValidation();
	},

	submitForm : function() {
		if (this.needValidateBeforeSubmit) {
			this.validateForm(false);
			if (this.validateResult != null) {
				if (this.validateResult.errorSet.length > 0)
					return;
			}
		}
		this.handleSubmit(this);
	},
	bindingEmptyValue : function() {
		this.form.find("input[emptyValue]").each(function() {
			var field = $(this);
			var defaultValue = field.attr("emptyValue");

			var emptyValueField = $("<input type='text' isEmptyField='true'/>");
			emptyValueField.attr("class", field.attr("class"));
			emptyValueField.attr("style", field.attr("style"));
			emptyValueField.val(defaultValue);

			field.before(emptyValueField);

			if (field.val() == null || field.val() == "") {
				field.hide();
				emptyValueField.css("display", "inline");
			} else if (field.val() == defaultValue) {
				field.val("");
				field.hide();
				emptyValueField.css("display", "inline");
			} else {
				emptyValueField.hide();
			}

			emptyValueField.focus(function() {
				emptyValueField.hide();
				field.show();
				field.focus();
			});

			field.blur(function() {
				var thisField = $(this);
				if (thisField.val() == null || thisField.val() == "") {
					thisField.hide();
					emptyValueField.css("display", "inline");
				} else if (thisField.val() == defaultValue) {
					thisField.val("");
					thisField.hide();
					emptyValueField.css("display", "inline");
				}else{
					emptyValueField.hide();
					thisField.show();
				}
			});
		});
	},
	bindingAutoTab : function() {
		var thisWrapper = this;
		this.form.find("input[autoTabIndex]").each(
				function() {
					var field = $(this);
					var next = Number(field.attr("autoTabIndex")) + 1;
					var nextField = thisWrapper.form.find("input[autoTabIndex="
							+ next + "]");
					if (nextField.size() > 0) {
						var pattern = new RegExp('[^0-9]+', 'g');
						field.keyup(function(event) {
							
							var val = $(this).val();
							val = val.replace(pattern, '');
							$(this).val(val);
							if (field.val().length == (Number(field
									.attr("maxlength")))) {
								
								field.change();
								nextField.focus();
							}
						});
					}
				});
	},
	bindingEnterSubmit : function() {
		var thisWrapper = this;
		this.form.find("input[enterSubmit='true']").each(function() {
			$(this).keydown(function(event) {
				if (event.keyCode == 13) {
					thisWrapper.validateForm(false,$(this));
					thisWrapper.submitForm();
				}
			});
		});
	},
	bindingNumberOnly : function() {
		var pattern = new RegExp('[^0-9]+', 'g');
		this.form.find("input[numberOnly=true]").each(function() {
			
			$(this).keyup(function() {
			
			// PLACING THIS IN THE BLUR BINDING....
			// was forcing validation after each
			// keypress and reseting the value 
			// forcing the inputs cursor over to
			// the end of the field
				//	var val = $(this).val();
				//	val = val.replace(pattern, '');
				//	$(this).val(val);
				//	alert('hunting down the auto-tab thats doign this.... ');
			});
			$(this).blur(function (){
				$(this).val($(this).val().replace(pattern, ''));
			});
		});

	},
	bindingValidation : function() {
		var formWapper = this;
		this.form.find("input[validationName]").each(function() {
			formWapper.bindingValidation_eachElement(this);
		});
	},
	bindingValidation_eachElement : function(field) {
		var formWapper = this;
//		$(field).data("firstActive", true);
//		$(field).blur(function() {
//			if (formWapper.forceBulrValidate) {
//				formWapper.validateForm(true, $(this));
//				return;
//			}
//			if ($(this).data("firstActive") &&
//					$(this).attr("needvalidation") != "false") {
//
//					formWapper.validateForm(true, $(this));
//					$(this).data("firstActive", false)
//				
//			}
//		});
		$(field).change(function() {
//			if (formWapper.forceBulrValidate)
//				return;
//			if (!$(this).data("firstActive") && 
//					$(this).attr("needvalidation") != "false") {
				
				formWapper.validateForm(true, $(this));
//			}
		});
	},
	validateAll : function() {
		this.validateForm(false);
		return this.isValidate();
	},
	validateForm : function(async, triggerValidateSource) {
		var formWapper = this;
		var fieldsToValidate = "";
		var commonsValidationForm = $("#commonsValidationForm");
		var validationFields = $("#validationFields");

		validationFields.empty();

		var allFieldsToValidate = this.form.find("input[validationName][needvalidation!='false']");
		allFieldsToValidate.each(function() {
			fieldsToValidate += $(this).attr("validationName") + ",";
			var inputStr = "<input type='hidden' name='"
				+ $(this).attr("validationName") + "'/>";
			var input = $(inputStr);
			input.val($(this).val());
			validationFields.append(input);
		});

		commonsValidationForm.find("input[name='fieldsToValidate']").val(
				fieldsToValidate);
		var options = {
			type : "POST",
			async : async,
			beforeSubmit : function(formData, jqForm) {
			},
			success : function(data) {
				formWapper
						.handleValidationResponse(data, triggerValidateSource);
			}
		};
		commonsValidationForm.ajaxSubmit(options);
	},
	
	notifyEvents : function(events, reslut) {
		for ( var index in events) {
			events[index](this, reslut);
		}
	},
	getAllErrorMessage : function() {
		var result = new Array();
		var errorSet = this.validateResult.errorSet;
		for ( var index in errorSet) {
			result.push(errorSet[index]);
		}
		return result;
	},
	getTriggerSourceErrorMessage : function() {
		var result = new Array();
		var validateionName = this.triggerValidateSource.attr("validationName");
		if (this.validateActivedFieldMap[validateionName] != null) {
			var eachErrorMessage = this.validateActivedFieldMap[validateionName].errorMessage;
			for ( var errorIndex in eachErrorMessage) {
				result.push(eachErrorMessage[errorIndex]);
			}
		}
		return result;
	},
	getActivedErrorMessages : function() {
		var result = new Array();
		for ( var index in this.validateActivedFieldMap) {
			if (this.validateActivedFieldMap[index] != null) {
				var eachErrorMessage = this.validateActivedFieldMap[index].errorMessage;
				for ( var errorIndex in eachErrorMessage) {
					result.push(eachErrorMessage[errorIndex]);
				}
			}
		}
		return result;
	},
	isValidate : function() {
		if (this.validateResult != null
				&& this.validateResult.errorSet.length == 0)
			return true;
		else
			return false;
	}
};

FormWrapper.binding = function(form) {
	if ($(form).data("wrapper") == null) {
		var formWarpper = new FormWrapper(form);
		$(form).data("wrapper", formWarpper);
		formWarpper.init();
	}
};

FormWrapper.fieldValidateEvents = function(wrapper) {
	var errorMessage = wrapper.getActivedErrorMessages();
	var errorMessage2 = wrapper.getTriggerSourceErrorMessage();
	var errorMessageDiv = $("errorMessage");
	var errorMessage2Div = $("errorMessage2");

	errorMessageDiv.empty();
	errorMessage2Div.empty();

	errorMessageDiv.append("<p>actived : </p>");
	for ( var i in errorMessage) {
		errorMessageDiv.append("<p>" + errorMessage[i] + "</p>");
	}

	errorMessage2Div.append("<p>tigger message: </p>");
	for ( var i in errorMessage2) {
		errorMessage2Div.append("<p>" + errorMessage2[i] + "</p>");
	}
};


FormWrapper.formValidateEvents = function(wrapper) {
	var errorMessage3 = wrapper.getAllErrorMessage();
	var errorMessage3Div = $("errorMessage3");

	errorMessage3Div.empty();

	errorMessage3Div.append("<p>all message: </p>");
	for ( var i in errorMessage3) {
		errorMessage3Div.append("<p>" + errorMessage3[i] + "</p>");
	}

};

$(function() {
	$("form").each(function() {
		FormWrapper.binding(this);
			// var wrapper = $(this).data("wrapper");
			// wrapper.fieldValidateEvents.push(FormWrapper.fieldValidateEvents);
			// wrapper.formValidateEvents.push(FormWrapper.formValidateEvents);
		});
	$("a").click(function() {
		if ($(this).hasClass("disabled")) {
			return false;
		}
	});
});