ServiceAbility = function() {
	this.localizeDisplay = null;
};

ServiceAbility.prototype = {
	customerTabChangeNewcustomer : function(status,localizedMethod){
		var thisInstance = this;	
		if(status=="UNLOCALIZED"){
			thisInstance.changeShowStateCSS('newcustomer', true);
		}else if(status=="LOCALIZED_EXISTINGUSER"){
			thisInstance.changeShowStateCSS('localized', true);
		}else if(status=="LOCALIZED_UNEXISTINGUSER"){
			thisInstance.changeShowStateCSS('localized', true,
					null, "localized-welcome-area",localizedMethod);			
		}else if(status=="LOGGED_IN"){
			return;
		}
	},
	customerTabChangeExistingcustomer : function(status,localizedMethod){
		var thisInstance = this;	
		if(status=="UNLOCALIZED"){
			thisInstance.changeShowStateCSS('existingcustomer', true);
		}else if(status=="LOCALIZED_EXISTINGUSER"){
			//	$('#customerArea-login-form-sbumit').addClass('current-customer-btn').text('LOG OUT');
			thisInstance.changeShowStateCSS('existingcustomer', true);
		}else if(status=="LOCALIZED_UNEXISTINGUSER"){
			//	$('#customerArea-login-form-sbumit').addClass('current-customer-btn').text('LOG IN');
			thisInstance.changeShowStateCSS('existingcustomer', true);
		}else if(status=="LOGGED_IN"){
			thisInstance.changeShowStateCSS('logged-in', true);
		}
	},
	initServiceAbility : function() {
		var thisInstance = this;		
		$("a[name='openExistingModal']")
				.click(
						function() {
							if($(".customer-module").hasClass("logged-in")){
								return;
							}else{
								FormUtil.popupModalWindow('serviceability/popup/modalLogin1.jsp');
							}
						});
	},
	submitAddressOrPhoneOrHashForm : function(formWrapper, formId) {
		var form = null;
		if (formWrapper == null) {
			form = $("#" + formId);
		} else {
			form = formWrapper.form;
		}
		var findDealOptions = {
			type : "POST",
			async : false,
			success : function(data) {
				serviceAbility.processAddressOrPhoneOrHashReturnCode(data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				serviceAbility.handleError();
			}
		};
		form.ajaxSubmit(findDealOptions);
	},
	handleError : function() {
		// window.location.href = ctx + "browse/serviceabilityNotFound.jsp";
	},
	handleServiceabilityNotFount : function() {
		window.location.href = ctx + "browse/serviceabilityNotFound.jsp";
	},	
	
	lookingToChangeServices :function(){
		FormUtil.popupModalWindow('serviceability/popup/modalLoginorshop.jsp');
	},
	
	loginToYourAccount : function(){
		FormUtil.popupModalWindow('serviceability/popup/modalLogin.jsp');
	},
	
	markUserAsMoving : function(fromPage){
		var options = {
				type : "POST",
				async : false,
				success : function(data) {
					if(flashFunction!=null && flashFunction.offerId!=null){
						flashFunction.orderNowSubmit();
					}else{
						var url = ctx + "storefront/index.jsp";
						if(fromPage!=null && fromPage.length>0){
							url += "?fromPage=" + fromPage;
						}					
						window.location.href = url;
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
				}
			};
			$("#form-existingservice").ajaxSubmit(options);
	},
	
	continueShopping : function(fromPage){	
		var url = ctx + "storefront/index.jsp";
		var params = {};
		if(fromPage!=null && fromPage.length>0){
			params.fromPage = fromPage;
		}
		if(flashFunction!=null && flashFunction.offerId!=null){
			params.offerId = flashFunction.offerId;
		}
		if($(params).size()>0){
			url += "?"+ $.param(params);
		}
		window.location.href = url;
	},
	
	processAddressOrPhoneOrHashReturnCode : function(data) {
		var thisInstance = this;
		var returnCode = $.trim($(data).find("#returnCode").text());
		if (returnCode != null && returnCode != "") {
			switch (returnCode) {
			case '0':
				this.handleServiceabilityNotFount();
				break;
			case '1':
				if($("#campaignId").text().length>0){
					window.location.href=$("#campaignId").text();
					break;
				}
				var isExistingUser = $.trim($(data).find("#isExistingUser").text());
				if ("true" == isExistingUser) {
					FormUtil.popupModalWindow("serviceability/popup/modalExistingService.jsp");
					break;
				} 
				if(flashFunction!=null && flashFunction.offerId!=null){
					flashFunction.orderNowSubmit();
					break;
				}
				var processReturnCodeSuccessURL = $("#processReturnCodeSuccessURL").val();
				if(processReturnCodeSuccessURL != null && processReturnCodeSuccessURL.length>0 ){
					window.location.href = processReturnCodeSuccessURL;
					break;
				}
				window.location.href = ctx + "storefront/index.jsp";
				break;
			case '2':
				$(".site-modal-overlay").css("display", "block");
				$(".modal-display-area").html(
						$(data).find("#MultiModal").html());
				$("a.site-modal-close").click(function() {
					FormUtil.closePopUp();
				});	
			
				break;
			default:
				alert("default:returnCode=" + returnCode);
			}
		}
	},
	popupModalLocalizeWindow : function(status){
		if (status == "UNLOCALIZED") {
			FormUtil.popupModalWindow("serviceability/popup/modalLocalize.jsp");
			//window.location.href = 'https://connect.charter.com/BundleBuilder4/';
		}else
			window.location.href = ctx + "storefront/index.jsp";
	//window.location.href = 'https://connect.charter.com/BundleBuilder4/';
	
	//	if(status=="UNLOCALIZED"){
	//		FormUtil.popupModalWindow("serviceability/popup/modalLocalize.jsp");
	//	}else{
	//		window.location.href = ctx + "storefront/index.jsp";
	//	}
	},
	changeCssStateCell : function(existCss, addCss, extraExistCss) {
		var node = $("." + existCss);
		node.removeClass();
		node.addClass(existCss+" "+addCss);
		//node.addClass(addCss);
		if (extraExistCss != null) {
			node.addClass(extraExistCss);
		}
	},
	changeShowStateCSS : function(moduleAddCss, changeServicesModule,
			extraModuleCss, areaExistCss, areaAddCss) {
		var thisInstance = this;
		thisInstance.changeCssStateCell("customer-module", moduleAddCss,
				extraModuleCss);
		if (changeServicesModule) {
			if(moduleAddCss=="localized"){
				//	$('#customerArea-login-form-sbumit').addClass('current-customer-btn').text('LOG OUT');
				thisInstance.changeCssStateCell("services-module", "newcustomer",
						extraModuleCss);
			}else{
				thisInstance.changeCssStateCell("services-module", moduleAddCss,
						extraModuleCss);
			}
		}
		if (areaExistCss != null && areaAddCss != null) {
			thisInstance.changeCssStateCell(areaExistCss, areaAddCss);
		}
	},
	changeLocalizeDisplay : function(module, area, displayId) {
		var thisInstance = this;
		thisInstance.changeShowStateCSS(module, true, null, "localize-area",
				area)
		$("#" + displayId).text("false");
	},
	submitAccountForm : function() {
		var findDealOptions = {
			type : "POST",
			async : false,
			success : function(data) {
				var returnCode = $.trim($(data).find("#returnCode").text());
				if (returnCode == 0) {
					var passField = $("#customerPasswordField");
					passField.val("");
					passField.hide();
					passField.prev("input[isEmptyField=true]").css("display", "inline");
					var errorMessage = $.trim($(data).find("#errorMessage")
							.text());
					handleError.showLocalizeValidateErrorMessage(errorMessage);
				} else {
					$("#errorMessage").html("");
					window.location.href = ctx + "storefront/index.jsp";
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				serviceAbility.handleError();
			}
		};
		$("#customerArea-login-form").ajaxSubmit(findDealOptions);
	},

	submitPopLoginForm : function() {
		var findDealOptions = {
			type : "POST",
			async : false,
			success : function(data) {
				var returnCode = $.trim($(data).find("#returnCode").text());
				if (returnCode == 0) {		
					var passField = $("#popPasswordField");
					passField.val("");
					passField.blur();
					var errorMessage = $(data).find("#errorMessage").text();
					var errorMessageDiv = $("#modalLoginErrorMessage");
					errorMessageDiv.empty();
					errorMessageDiv.hide();
					errorMessageDiv.append("<p class='error-message' style='display: block;'>"+errorMessage+"</p>");
					errorMessageDiv.show("slow");
					$("#modal-login #errorMessage").html($(data).find("#errorMessage").text());
				} else if(flashFunction!=null && flashFunction.offerId!=null){
					//flashFunction.orderNowSubmit();
					window.location.href = ctx + "storefront/index.jsp";
				}else{
					window.location.href = ctx + "storefront/index.jsp";
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				serviceAbility.handleError();
			}
		};
		$("#modal-login-form").ajaxSubmit(findDealOptions);
	},
	checkNoSelectingMultiAddress : function(selectNode){
		var addressHash = selectNode.val();
		if(addressHash != null && addressHash.length > 0){
			$("#addressHashSubmitButton").removeClass("disabled");
			$("#addressHashSubmitButton").click(function(){
				serviceAbility.submitAddressOrPhoneOrHashForm(null,'form-hash');
			});
		}
	},
	submitLocalizeForms : function() {
		var phoneWrapper = $("#localize-form-phone").data("wrapper");
		var addressWrapper = $("#localize-form-address").data("wrapper");
		serviceAbility.cleanError(phoneWrapper);
		serviceAbility.cleanError(addressWrapper);
		if(isFormEmpty("#localize-form-phone") 
				&& isFormEmpty("#localize-form-address") ){
			$("#all-form-empty").show();
		}else{
			$("#all-form-empty").hide();
			if(!isFormEmpty("#localize-form-phone")){
				if (phoneWrapper.validateAll()){
					serviceAbility.submitAddressOrPhoneOrHashForm(phoneWrapper);
				}
			}else if(!isFormEmpty("#localize-form-address")){
				if (addressWrapper.validateAll()) {
					serviceAbility.submitAddressOrPhoneOrHashForm(addressWrapper);
				}
			}
		}
	},
	logout : function(logoutSuccess) {
		var findDealOptions = {
			type : "POST",
			async : false,
			success : function(data) {
				logoutSuccess(data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				serviceAbility.handleError();
			}
		};
		$("#customerArea-logout-form").ajaxSubmit(findDealOptions);
	},
	logoutSuccess : function(data) {
		/*
		$("#errorMessage").html("");
		var welcomeMessage = $(data).find("#profileMessage").html();
		$(".logged-in-welcome").html(welcomeMessage);
		serviceAbility.changeShowStateCSS('existingcustomer', true);
		*/
		window.location.href = ctx;
	},
	storefrontLogoutSuccess : function(data) {
		$("#errorMessage").html("");
		this.localizeDisplay = null;
		window.location.href = ctx;
		//serviceAbility.changeShowStateCSS('newcustomer', false, "site");
	},
	onloadModalLocalize : function() {
		var thisObj = this;
		FormWrapper.binding($("#localize-form-phone"));
		FormWrapper.binding($("#localize-form-address"));
		var phoneWrapper = $("#localize-form-phone").data("wrapper");
		var addressWrapper = $("#localize-form-address").data("wrapper");
		phoneWrapper.formValidateEvents.push(function(wrapper) {
			if(!isFormEmpty("#localize-form-phone") && !addressWrapper.isValidate()){
				FormUtil.defaultHandleError(wrapper);
			}
		});
		addressWrapper.formValidateEvents.push(function(wrapper) {
			if(!phoneWrapper.isValidate() && !isFormEmpty("#localize-form-address")){
				 FormUtil.defaultHandleError(wrapper);
			}
		});
		phoneWrapper.handleAllErrorSource.push(function(wrapper, result){
			if(!addressWrapper.isValidate() && !isFormEmpty("#localize-form-phone")){
				thisObj.handleErrorSource(wrapper, result);
			}
		});
		addressWrapper.handleAllErrorSource.push(function(wrapper, result){
			if(!phoneWrapper.isValidate() && !isFormEmpty("#localize-form-address")){
				thisObj.handleErrorSource(wrapper, result);
			}
		});
	},
	
	handleErrorSource : function(wrapper, result){
		var source = wrapper.currentSource;
		if (!result) {
			source.addClass("invalid-error");
		} else {
			source.removeClass("invalid-error");
		}
	},
	cleanError : function(wrapper){
		  var wform = wrapper.form;
		  wform.find(".errorMessage").empty();
		  wform.find("input[validationName]").removeClass("invalid-error");
	},
	onloadCustomArea : function() {
		serviceAbility.wrapperForm("#form-address", "#form-address-sbumit");
		$("#form-address").data("wrapper").handleSubmit = serviceAbility.submitAddressOrPhoneOrHashForm;

		serviceAbility.wrapperForm("#form-phone", "#form-phone-sbumit");
		$("#form-phone").data("wrapper").handleSubmit = serviceAbility.submitAddressOrPhoneOrHashForm;

		serviceAbility.wrapperForm("#customerArea-login-form",
				"#customerArea-login-form-sbumit");
		$("#customerArea-login-form").data("wrapper").handleSubmit = serviceAbility.submitAccountForm;
	},
	onloadModalLogin : function(){
		$("form").each(function() {
			FormWrapper.binding(this);
		});
		var modalLoginFormWrapper = $("#modal-login-form").data("wrapper");
		//modalLoginFormWrapper.bindingDynmicValidation();
		if(modalLoginFormWrapper!=null){
			modalLoginFormWrapper.formValidateEvents.push(FormUtil.defaultHandleError);
			modalLoginFormWrapper.handleAllErrorSource.push(FormUtil.defaultHandleAllErrorSource);
			modalLoginFormWrapper.fieldValidateEvents.push(FormUtil.defaultHandleErrorSource);		
			$("#modal-login-form").data("wrapper").handleSubmit = serviceAbility.submitPopLoginForm;
		}
	},
	
	changeSubmitButtonStatus : function(buttonId, errorMessage) {
		if (errorMessage.length == 0) {
			$(buttonId).removeClass("disabled");
		} else {
			if (!$(buttonId).hasClass("disabled"))
				$(buttonId).addClass("disabled");
		}
	},
	
	urlLocalizeByAddress : function(address1,address2,zipCode){
		$("#form-address-address1").val(address1);
		$("#form-address-address2").val(address2);
		$("#form-address-zipcode").val(zipCode);
		var addressWrapper = $("#form-address").data("wrapper");
		addressWrapper.formValidateEvents.push(function(wrapper){
			if(!wrapper.isValidate()){
				$("#campaignId").remove();
				hideOverlapLoaderBar();
			}
		});
		addressWrapper.submitForm();
		addressWrapper.formValidateEvents.pop();
	},
	
	urlLocalizeByPhone :function(number1,number2,number3){
		$("#form-phone-number1").val(number1);
		$("#form-phone-number2").val(number2);
		$("#form-phone-number3").val(number3);
		var phoneWrapper = $("#form-phone").data("wrapper");
		phoneWrapper.formValidateEvents.push(function(wrapper){
			if(!wrapper.isValidate()){
				$("#campaignId").remove();
				hideOverlapLoaderBar();
			}
		});
		phoneWrapper.submitForm();
		phoneWrapper.formValidateEvents.pop();
	},
		
	validatePhone : function(event){
		 if(event.length!=1)
		 	event = event.charAt(event.length-1);
		 var   pattern   =   /\d+\.?\d*|\.\d+/; 
       	 if(event.length!=0 && !event.match(pattern)) {
       	 	handleError.showLocalizeValidateErrorMessage("please input it just as number.");      	 	
       	 	$('#form-phone-number3').blur();
       	 }
	},
	
	wrapperForm : function(formId, submitButton) {
		var thisObj = this;
		var formWrapper = $(formId).data("wrapper");
		formWrapper.bindingDynmicValidation();
		formWrapper.formValidateEvents.push(function(wrapper) {
			
			if (wrapper.triggerValidateSource != null)
				return;
			var errorSet = wrapper.validateResult.errorSet;
			errorSet = unique(errorSet);
			var errorMessage = "";
			for ( var i = 0; i < errorSet.length; i++) {
				if(i != errorSet.length -1) 
					errorMessage += errorSet[i] + '<br>';
				else
					errorMessage += errorSet[i];
			}
			if(errorMessage != "")
				handleError.showLocalizeValidateErrorMessage(errorMessage);
		});
		//formWrapper.handleAllErrorSource.push(FormUtil.defaultHandleAllErrorSource);
		formWrapper.fieldValidateEvents.push(function(wrapper, result) {
			var source = wrapper.triggerValidateSource;
			if (result) {
				source.removeClass("invalid-error");
				handleError.closeErrorMesagesModal();
			} else {
				var errorMessage = wrapper.getTriggerSourceErrorMessage();
				if (!isEmptyError(errorMessage[0])&&!isUserNameEmptyError(errorMessage[0])&&!isPasswordEmptyError(errorMessage[0])) {
					if (!source.hasClass("invalid-error"))
						source.addClass("invalid-error");
					handleError.showLocalizeValidateErrorMessage(errorMessage[0]);
				}
			}
		});
		$(formId).find("input").focus(function() {
			handleError.closeErrorMesagesModal();
		});
	}
};

var serviceAbility = new ServiceAbility();

$(function() {
	serviceAbility.initServiceAbility();
	var resizeTimer = null;
	window.onresize = function(){  
		if(resizeTimer) 
			 clearTimeout(resizeTimer);  
		resizeTimer = setTimeout("resizeWindow()",1);  
		   
     }  
});
function resizeWindow(){
	var localizeDiv =$("#customer-module-div");
	handleError.resizeErrorMessage(localizeDiv);
}

function enableSubmitButton(buttonId) {
	$(buttonId).removeClass("disabled");
}

function disableSubmitButton(buttonId) {
	if (!$(buttonId).hasClass("disabled"))
		$(buttonId).addClass("disabled");
}

function isFormEmpty(formId){
	var allInputFiled= $(formId).find("input[validationName]");
	var isEmpty = true;
	allInputFiled.each(function(){
			if($(this).val().length >0 ){
				isEmpty = false;
			}
	});
	return isEmpty;
	
}

function isHasEmptyField(formId){
	var allInputFiled= $(formId).find("input[validationName]");
	var isHasEmpty = false;
	allInputFiled.each(function(){
			if($(this).val() =="" || $(this).val().length <= 0 ){
				isHasEmpty = true;
			}
	});
	return isHasEmpty;
}

function isEmptyError(errorMessage) {
	return /.*Please provide a value*/.test(errorMessage);
}

function isUserNameEmptyError(errorMessage) {
	return /.*Please enter your Username*/.test(errorMessage);
}

function isPasswordEmptyError(errorMessage) {
	return /.*Please enter your Password*/.test(errorMessage);
}

