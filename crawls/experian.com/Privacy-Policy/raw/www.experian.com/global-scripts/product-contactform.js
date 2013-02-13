/* Used with jquery 1.3.2.min.js and jquery.simplemodal-1.2.3.min.js to handle contact form submit and jquery effects on product-detail template. */

$(document).ready(function() {
	if($('#productContactForm').length>0){
		initFormVersion1($('#productContactForm'));
	}

	else if($('#contactForm form').length>0){
		$('#contactForm form').each(function(){
			initFormVersion2($(this));
		});
	}
});


function initFormVersion1(jCurrentForm){ // legacy forms
	if (jCurrentForm.hasClass('enableValidation')){
		$('#submitButton').hover(function(){
			$(this).addClass('cursor');
		},function(){
			$(this).removeClass('cursor');
		});
		$('#submitButton').bind('click',function(){
			if(jCurrentForm.find("input[name=form-captcha-required]").val() == "Y"){
				if(jcap(jCurrentForm)){
					submitForm_v1(jCurrentForm);
				}
			}
			else{
				submitForm_v1(jCurrentForm);
			}	
		});
		if(jCurrentForm.find("input[name=form-captcha-required]").val() == "Y"){
			$.getScript("/global-scripts/jcap.js",function(){
				sjcap(jCurrentForm);
				startValidation(jCurrentForm); // starts form validation after sjcap()
			});
		}
		
		else{
			startValidation(jCurrentForm); // starts form validation
		}
	}
	
	var expFormName = document.getElementsByName('realname')[0].value;
	jCurrentForm.name = expFormName; // set contact form name attribute for SiteCat tracking
	$('input#LeadSource').val(document.URL); // Sets #LeadSource input value
	
	if(location.search.match(/send=yes$/g)){
		try{
			modalSubmitSuccess(); // Will try to call modalSubmitSuccess function.  This function can be implemented somewhere else.
		}
		catch(e){} 
		
		jCurrentForm.hide();
		$('#formConfirmation').modal();
		if (typeof s != 'undefined'){
			s.sendFormEvent('s', s.pageName, expFormName);
			// send success event for form
		}
	}
	populateForm = function(){
		jCurrentForm.find("#first_name_input").val(pageUrl.fname);		
		jCurrentForm.find("#last_name_input").val(pageUrl.lname);
		jCurrentForm.find("#company_input").val(pageUrl.company);
		jCurrentForm.find("#email_input").val(pageUrl.email);
	}
	populateForm();
}
		
function initFormVersion2(jCurrentForm){
	if (document.URL.indexOf('http://stg1')>=0 ){
		jCurrentForm.attr('action','http://stg1.experian.com/forms/submit.form');
	}
	
	if (jCurrentForm.hasClass('enableValidation')){
		jCurrentForm.find('.submitButton').hover(function(){
			$(this).addClass('cursor');
		},function(){
			$(this).removeClass('cursor');
		});
		jCurrentForm.find('.submitButton').bind('click',function(){
			if(jCurrentForm.find("input[name=form-captcha-required]").val() == "Y"){
				if(jcap(jCurrentForm)){
					submitForm_v2(jCurrentForm);
				}
			}
			else{
				submitForm_v2(jCurrentForm);
			}
			
		});
		if(jCurrentForm.find("input[name=form-captcha-required]").val() == "Y"){
			$.getScript("/global-scripts/jcap.js",function(){
				sjcap(jCurrentForm);
				startValidation(jCurrentForm); // starts form validation after sjcap()
			});
		}
		
		else{
			startValidation(jCurrentForm); // starts form validation
		}
	}
	
	var form_activity = "";
	jCurrentForm.find('.form_confirm_asset').bind('click',function(){
			form_activity += $(this).attr('href') + ' ';
			jCurrentForm.find('.form_activity').val(form_activity);
	});
	
	var expFormName = jCurrentForm.attr('name'); // set expFormName for SiteCat tracking
	jCurrentForm.find('input.form_page').val(document.URL); // Sets #form_page input value
	
	var urlParams = new UrlObj();
	if (urlParams.intcmp){
		jCurrentForm.find('input.form_s_data').val(urlParams.intcmp); 
	}
	
	if(location.search.match(/send=yes$/g)){
		try{
			modalSubmitSuccess(); // Will try to call modalSubmitSuccess function.  This function can be implemented somewhere else.
		}
		catch(e){}
		jCurrentForm.hide();
		jCurrentForm.find('.formConfirmation').modal();
		if (typeof s != 'undefined'){
			s.sendFormEvent('s', s.pageName, expFormName);
			// send success event for form
		}
	}
	populateForm = function(){
								jCurrentForm.find("#first_name_input").val(decodeURI (pageUrl.fname));                   
                                jCurrentForm.find("#last_name_input").val(decodeURI (pageUrl.lname));
                                jCurrentForm.find("#company_input").val(decodeURI (pageUrl.company));
                                jCurrentForm.find("#email_input").val(decodeURI (pageUrl.email)); 
				}
	populateForm();
		if ($("#last_name_input").attr("value") ==  "undefined") {
					$("#last_name_input").attr("value", "");
					}
					if ($("#first_name_input").attr("value") ==  "undefined") {
					$("#first_name_input").attr("value", "");
					}
					if ($("#company_input").attr("value") ==  "undefined") {
					$("#company_input").attr("value", "");
					}
					if ($("#email_input").attr("value") ==  "undefined") {
					$("#email_input").attr("value", "");
					}
}

function submitForm_v1 (jCurrentForm){	
	finalValidation(jCurrentForm);
	if($(".notvalid").length<1){
		var firstNameValue = $('input[name="First Name"]').val(); // Get first name
		var lastNameValue = $('input[name="Last Name"]').val(); // Get last name
		$('input[name="realname"]').val(firstNameValue + " " + lastNameValue); // Set realname value
		
		if ($('input[name="Email"][type!="hidden"]').length > 0){
			var emailValue = $('input[name="Email"][type!="hidden"]').val(); // Get email
			$('input[name="email"][type="hidden"]').val(emailValue); // Set email value
		}
		else if ($('input[name="Email Address"][type!="hidden"]').length > 0){				
			var emailValue = $('input[name="Email Address"][type!="hidden"]').val(); // Get email from legacy forms where email field has a name of 'Email Address'
			$('input[name="email"][type="hidden"]').val(emailValue); // Set email value for legacy forms
		}
		if(location.search.match(/^\?cat1?2?=/g)){ // checks for cat1 or cat2 req params before appending send param
			$("#formRedirect")[0].value = document.URL.split("#")[0] + "&send=yes"; // redirects page to display confirmation message
		}
		else {
			$("#formRedirect")[0].value = document.URL.split("#")[0] + "?send=yes"; // redirects page to display confirmation message
		}
		if(typeof expProductGrp != "undefined" ){
			jCurrentForm.append('<input type="hidden" name="product_group" value="'+expProductGrp+'">');
			}
			else if(typeof expProductGrp == null ){
			return false;
			}
			if (typeof expBUSegment != "undefined"){
			jCurrentForm.append('<input type="hidden" name="business_segment" value="'+expBUSegment+'">');
			}
			else if(typeof expBUSegment == null){
			return false;
			}
			if (typeof expBUPartner != "undefined"){
			jCurrentForm.append('<input type="hidden" name="business_unit" value="'+expBUPartner+'">');
			}
			else if(typeof expBUPartner == null){
			return false;
			}
			if(typeof expChannel != "undefined"){
			jCurrentForm.append('<input type="hidden" name="channel" value="'+expChannel+'">');
			}
			else if(typeof expChannel == null){
			return false;
			}
		$(jCurrentForm).submit(); // submits form
	}
}

function submitForm_v2 (jCurrentForm){	
	finalValidation(jCurrentForm);
	var redirecturl = document.URL.split("#")[0];
	redirecturl= redirecturl.replace(/(\&|\?)?(fname|lname|company|email)=[^\&]*/gi,''); 
	if(jCurrentForm.find(".notvalid").length<1){
		var firstNameValue = jCurrentForm.find('input[name="first_name"]').val(); // Get first name
		var lastNameValue = jCurrentForm.find('input[name="last_name"]').val(); // Get last name
		jCurrentForm.find('input[name="realname"]').val(firstNameValue + " " + lastNameValue); // Set realname value
		var formredirect = jCurrentForm.find(".form_redirect")[0];

		if(location.search.match(/^\?cat1?2?=/g)){ // checks for cat1 or cat2 req params before appending send param
			formredirect.value = redirecturl + "&send=yes";  // redirects page to display confirmation message
		}
		else {
			formredirect.value = redirecturl + "?send=yes"; // redirects page to display confirmation message
		}
		if(typeof expProductGrp != "undefined" ){
			jCurrentForm.append('<input type="hidden" name="product_group" value="'+expProductGrp+'">');
			}
			else if(typeof expProductGrp == null ){
			return false;
			}
			if (typeof expBUSegment != "undefined"){
			jCurrentForm.append('<input type="hidden" name="business_segment" value="'+expBUSegment+'">');
			}
			else if(typeof expBUSegment == null){
			return false;
			}
			if (typeof expBUPartner != "undefined"){
			jCurrentForm.append('<input type="hidden" name="business_unit" value="'+expBUPartner+'">');
			}
			else if(typeof expBUPartner == null){
			return false;
			}
			if(typeof expChannel != "undefined"){
			jCurrentForm.append('<input type="hidden" name="channel" value="'+expChannel+'">');
			}
			else if(typeof expChannel == null){
			return false;
			}
		jCurrentForm.submit(); // submits form
				
		return false;
	}
}

// form validation functions begin
function startValidation(jCurrentForm){	
	jCurrentForm.find('.productFormLabel').each(function(){
		var fieldName = $(this).attr('for');
		var jThis;
		var testType;
		
		if($(this).hasClass('productFormLabelRequired')){
			var labelText = $(this).text();
			$(this).text(labelText + " *");
			testType="testValue";
		}
		
		else{
			testType="testLength";
		}
		
		if($('.productTextField[name='+fieldName+']').length > 0){
			jThis = jCurrentForm.find('.productTextField[name='+fieldName+']');
			jThis.bind('keyup',function(){
				setValueAsActive(jThis,fieldName); // set values at keyup
			});
			jThis.bind('blur',function(){
				setValues(jThis,fieldName,testType); // set values at blur
			});	
		}
		else if ($('.productTextArea[name='+fieldName+']').length > 0){
			jThis = jCurrentForm.find('.productTextArea[name='+fieldName+']');
			jThis.bind('keyup',function(){
				setValueAsActive(jThis,fieldName); // set values at keyup
			});
				
			jThis.bind('blur',function(){
				setValues(jThis,fieldName,testType); // set values at blur
			});	
		}
		
		else if ($('.productRadioInput[name='+fieldName+']').length > 0){
			jThis = jCurrentForm.find('.productRadioInput[name='+fieldName+']');
				
			jThis.bind('click',function(){
				setValues(jThis,fieldName,testType); // set values at blur
			});	
		}
		
		else if ($('.productCheckInput[name='+fieldName+']').length > 0){
			jThis = jCurrentForm.find('.productCheckInput[name='+fieldName+']');
				
			jThis.bind('click',function(){
				setValues(jThis,fieldName,testType); // set values at blur
			});	
		}
	});
}

function finalValidation(jCurrentForm){
	jCurrentForm.find('.productFormLabel').each(function(){
		if($(this).hasClass('productFormLabelRequired')){
			var fieldName = $(this).attr('for');
			var jThis;
			
			if($('.productTextField[name='+fieldName+']').length > 0){
				jThis = jCurrentForm.find('.productTextField[name='+fieldName+']');
				setValues(jThis,fieldName,"testValue");
			}
			else if ($('.productTextArea[name='+fieldName+']').length > 0){
				jThis = jCurrentForm.find('.productTextArea[name='+fieldName+']');
				setValues(jThis,fieldName,"testValue");
			}
			else if ($('.productRadioInput[name='+fieldName+']').length > 0){
				jThis = jCurrentForm.find('.productRadioInput[name='+fieldName+']');
				setValues(jThis,fieldName,"testValue");
			}
			else if ($('.productCheckInput[name='+fieldName+']').length > 0){
				jThis = jCurrentForm.find('.productCheckInput[name='+fieldName+']');
				setValues(jThis,fieldName,"testValue");
			}
		}	
	});
}

function setValueAsActive(jThis,req){	
	if (jThis.parents('.productInputGroup').hasClass('activeField')){
		jThis.parents('.productInputGroup').removeClass('activeField');
	}
	if (jThis.parents('.productInputGroup').hasClass('notvalid')){
		jThis.parents('.productInputGroup').removeClass('notvalid');
	}			
	if (jThis.parents('.productInputGroup').hasClass('valid')){
		jThis.parents('.productInputGroup').removeClass('valid');
	}

	var thisLabel = $(".productLabelGroup label[for="+req+"]").parents(".productLabelGroup");
	if (thisLabel.hasClass("labelnotvalid")){
		thisLabel.removeClass("labelnotvalid");
	}
	
	jThis.parents('.productInputGroup').addClass('activeField');
	
	return;
}

function setValues(jThis,req,testType){
	var fieldValue = jThis.val();
	var fieldClass = jThis.attr("class");
	var testClass = testLength(req,fieldValue,fieldClass);

	if(testType=="testValue" && testClass=="valid"){
		var testClass = testValue(req,fieldValue,fieldClass);
	}
	
	if (jThis.parents('.productInputGroup').hasClass('activeField')){
		jThis.parents('.productInputGroup').removeClass('activeField');
	}
	if (jThis.parents('.productInputGroup').hasClass('notvalid')){
		jThis.parents('.productInputGroup').removeClass('notvalid');
	}			
	if (jThis.parents('.productInputGroup').hasClass('valid')){
		jThis.parents('.productInputGroup').removeClass('valid');
	}
	
	// set input validation class
	jThis.parents('.productInputGroup').addClass(testClass);
	
	// set label validation class
	var thisLabel = $(".productLabelGroup label[for="+req+"]").parents(".productLabelGroup");
	if(thisLabel.hasClass("labelnotvalid")){
		thisLabel.removeClass("labelnotvalid");
	}
	
	if(testClass == "notvalid"){
	thisLabel.addClass("labelnotvalid");
	}
	
	return;
}

function testLength(fieldName,fieldValue,fieldClass){
	var state="state";
	var country="country";
	var phone="phone";
	var best_contact_time="best_contact_time";
	var email='Email';
	var email2='Email Address'; // covers legacy forms that use Email Address
	var email3='email';
	var testClass;
	
	if(fieldClass=="productTextArea"){
		if(fieldValue.length < 1024){
			testClass="valid";
		}
		else{
			testClass="notvalid";
		}
	}
	
	else{
		switch(fieldName){
			case state:
				if(fieldValue.length < 64){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break; 
			
			case country:
				if(fieldValue.length < 100){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break; 	
			
			case phone:
				if(fieldValue.length < 50){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break;

			case best_contact_time:
				if(fieldValue.length < 100){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break;		
		
			case email://form v1
			case email2://form v1
			case email3:
				if(fieldValue.length < 128){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break; 	
		
			default:
				if(fieldValue.length < 128){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break;
		}
	}
	return testClass;
}

function testValue(fieldName,fieldValue,fieldClass){
	var email='Email';
	var email2='Email Address'; // covers legacy forms that use Email Address
	var email3='email';
	var emailTest = /\b[\w._%+-]+@(?:[\w-]+\.)+[\w]{2,4}\b/;
	//var textTest = /^[^\s](.+)?(\s+)?(.+)?(\s+)?$/;
	var textTest = /^[^\s]/;
	var testClass;
	
	if(fieldClass=="productRadioInput"){
		if($("input:radio:checked[name="+fieldName+"]").length > 0){
			testClass="valid";
		}
		else{
			testClass="notvalid";
		}
	}
	
	else if(fieldClass=="productCheckInput"){
		if($("input:checkbox:checked[name="+fieldName+"]").length > 0){
			testClass="valid";
		}
		else{
			testClass="notvalid";
		}
	}
	
	else{
		switch(fieldName){
			case email://form v1
				if(emailTest.test(fieldValue)){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break;
				
			case email2://form v1
				if(emailTest.test(fieldValue)){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break;
			
			case email3://form v2
				if(emailTest.test(fieldValue)){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break;	
			
			default:
				if(textTest.test(fieldValue)){
					testClass="valid";
				}
				else {
					testClass="notvalid";
				}
				break;
		}	
	}
	return testClass;
}
// form validation functions end
