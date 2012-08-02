/* Used with jquery 1.3.2.min.js and jquery.simplemodal-1.2.3.min.js to handle contact form submit and jquery effects on product-detail template. */




$(document).ready(function() {
	if($('#contactForm form').length>0){
		$('#contactForm form').each(function(){
			initAjaxForm($(this));			
		});
	}
	
	// legacy forms require these additional hidden fields
	$("#productContactForm").prepend("<input type=\"hidden\" name=\"page\" value=\"" + document.URL + "\"></input><input type=\"hidden\" name=\"recipient_email\" value=\"8O9EH7YrwArpFgUuB7bxggJPiiljwIBNK7fhC9pQm1c=\"></input>");
	
	//if(document.URL.match(/[local|stg1|www].experian.com/)){ 
	if(document.location.hostname == 'www.experian.com' || document.location.hostname == 'stg1.experian.com'){
		trackExternalCampaigns();
		trackInternalCampaigns();
	}	
}); 


function initAjaxForm(jCurrentForm){
	var postToUrl;
	var expFormName = jCurrentForm.attr('name'); // set expFormName for SiteCat tracking
	
	postToUrl = "/forms/submit.form";
	
	if (jCurrentForm.hasClass('enableValidation')){
		jCurrentForm.find('.submitButton').hover(function(){
			$(this).addClass('cursor');
		},function(){
			$(this).removeClass('cursor');
		});
		jCurrentForm.find('.submitButton').bind('click',function(){
			if(jCurrentForm.find("input[name=form-captcha-required]").val() == "Y"){
				if(jcap(jCurrentForm)){
					submitAjaxForm(jCurrentForm, postToUrl, expFormName);
				}
			} 
			else{
				submitAjaxForm(jCurrentForm, postToUrl, expFormName);
			}
		});
		
		// legacy forms with #productContactForm
		jCurrentForm.find('#submitButton').hover(function(){
			$(this).addClass('cursor');
		},function(){
			$(this).removeClass('cursor');
		});
		jCurrentForm.find('#submitButton').bind('click',function(){
			if(jCurrentForm.find("input[name=form-captcha-required]").val() == "Y"){
				if(jcap(jCurrentForm)){
					submitAjaxForm(jCurrentForm, postToUrl, expFormName);
				}
			} 
			else{
				submitAjaxForm(jCurrentForm, postToUrl, expFormName);
			}
		});
		// legacy forms end
		
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
	
	jCurrentForm.find('input.form_page').val(document.URL); // Sets #form_page input value
	
	var urlParams = new UrlObj(); 
	if (urlParams.intcmp){
		jCurrentForm.find('input.form_s_data').val(urlParams.intcmp); 
	}
	if (urlParams.wtsrch){
		jCurrentForm.find('input.form_s_data').val('CAMPAIGN_'+urlParams.wtsrch);
	}
	
	$('<li class="loadingwheel" style="display:none"></li>').appendTo(jCurrentForm.find(".submitButton").parent("ul")); // append loading wheel to page
	
	populateForm = function(){
		jCurrentForm.find("#first_name_input").val(pageUrl.fname);		
		jCurrentForm.find("#last_name_input").val(pageUrl.lname);
		jCurrentForm.find("#company_input").val(pageUrl.company);
		jCurrentForm.find("#email_input").val(pageUrl.email);
	}
	
	populateForm();
} 

function submitAjaxForm (jCurrentForm, postToUrl, expFormName){	  
	finalValidation(jCurrentForm);
	var redirecturl = document.URL.split("#")[0];
	redirecturl= redirecturl.replace(/(\&|\?)?(fname|lname|company|email)=[^\&]*/gi,''); // strip out populateform params from redirect
	postform = function(){
			jCurrentForm.find(".submitButton").hide();
			jCurrentForm.find(".loadingwheel").show(); 
			
			var firstNameValue = jCurrentForm.find('input[name="first_name"]').val(); // Get first name
			var lastNameValue = jCurrentForm.find('input[name="last_name"]').val(); // Get last name
			jCurrentForm.find('input[name="realname"]').val(firstNameValue + " " + lastNameValue); // Set realname value
			jCurrentForm.find('input[name="redirect"]').val(redirecturl); // sets required redirect param
			jCurrentForm.find('#StreetAddress__label').attr('for','street_address'); // correct for legacy form
			jCurrentForm.find('#StreetAddress_input').attr('name','street_address'); // correct for legacy form
			jCurrentForm.append('<input type="hidden" name="enc" value="&#153;">'); // forces IE to submit form as UTF8
			
			// Append campaign values for experian.com
			//if(document.URL.match(/[local|stg1|www].experian.com/)){ 
			 if(document.location.hostname == 'www.experian.com' || 
			 document.location.hostname == 'stg1.experian.com') {
			 var externalcampaigns = readCampaignsFromCookies('extrnl_cmpcd_');
			 var internalcampaigns = readCampaignsFromCookies('intrnl_cmpcd_');			 
			 	jCurrentForm.append('<input type="hidden" name="extrnl_campaign">');
				jCurrentForm.append('<input type="hidden" name="intrnl_campaign">');
				jCurrentForm.find('input[name="extrnl_campaign"]').val(externalcampaigns);
				jCurrentForm.find('input[name="intrnl_campaign"]').val(internalcampaigns);				
			}
			
			//construct leadData object
			var leadData = new Object();
			leadData.firstName = firstNameValue; 
			leadData.lastName = lastNameValue;
			leadData.email = jCurrentForm.find('input[name="email"]').val(); 
			leadData.phone = jCurrentForm.find('input[name="phone"]').val();

			$.ajax({
			  type: 'POST', 
			  url: postToUrl,
			  data: jCurrentForm.serialize(),
			  contentType: "application/x-www-form-urlencoded; charset=utf-8",
			  success: function(data){
				$.modal.impl.close();
				
				if (typeof s != 'undefined'){
					s.sendFormEvent('s', s.pageName, expFormName);
					// send success event for form
					s.events = "";
				}
				
				if(jCurrentForm.find('input[type="hidden"][name="tt"]').val() == 'yes'){
					// not implemented for consumer
				}
				
				else if(jCurrentForm.find('input[type="hidden"][name="tt"]').val() == 'yes-enterprise'){
					//try{
					//	mboxDefineExperianBus(jCurrentForm.find('.formConfirmation').attr('id'),pageUrl.pageId+'_modal_form-success');
					//	mboxUpdateExperianBus(pageUrl.pageId+'_modal_form-success');
				//	} 
				//	catch(e){}
				}
				
				try{
					modalSubmitSuccess(data, leadData); // Will try to call modalSubmitSuccess function.  This function can be implemented somewhere else.
				}
				catch(e){} 
				
				if(jCurrentForm.find('.formConfirmation').length>0){ // display form confirmation modal if it exists
					jCurrentForm.find('.formConfirmation').modal({
						onShow:function(dialog){
							dialog.container.width(450);
							dialog.container.height(350);
							$(window).trigger('resize.simplemodal'); // required for ie6 to resize modal
						}
					});
				}
				
				// legacy forms with #productContactForm
				else if(jCurrentForm.next('#formConfirmation').length>0){ // display form confirmation modal if it exists
					jCurrentForm.next('#formConfirmation').modal({
						onShow:function(dialog){
							dialog.container.width(450);
							dialog.container.height(350);
							$(window).trigger('resize.simplemodal'); // required for ie6 to resize modal
						}
					});
				}
				// legacy forms end
				
				$(':input',jCurrentForm).not(':button, :submit, :reset, :hidden, :radio').val('').removeAttr('checked').removeAttr('selected');
				jCurrentForm.find(".loadingwheel").hide();
				jCurrentForm.find(".submitButton").show();
			  },
			  error: function(data){
				//window.alert("We're sorry there was a problem submitting your form.  Please try again.");
				jCurrentForm.find(".loadingwheel").hide();
				jCurrentForm.find(".submitButton").show();
			  } 
			});
		}
	
	if(jCurrentForm.find(".notvalid").length<1){
		if(jCurrentForm.find(".formsummary").length > 0){
			displayFormSummary(jCurrentForm);
		}
		else{
			postform();
		}
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
			if(labelText.search(/\*$/) < 0){
				$(this).text(labelText + " *"); 
			}
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
				setValues(jCurrentForm,jThis,fieldName,testType); // set values at blur
			});	
		}
		else if ($('.productTextArea[name='+fieldName+']').length > 0){
			jThis = jCurrentForm.find('.productTextArea[name='+fieldName+']');
			jThis.bind('keyup',function(){
				setValueAsActive(jThis,fieldName); // set values at keyup
			});
				
			jThis.bind('blur',function(){
				setValues(jCurrentForm,jThis,fieldName,testType); // set values at blur
			});	
		}
		
		else if ($('.productRadioInput[name='+fieldName+']').length > 0){
			jThis = jCurrentForm.find('.productRadioInput[name='+fieldName+']');
				
			jThis.bind('click',function(){
				setValues(jCurrentForm,jThis,fieldName,testType); // set values at blur
			});	
		}
		
		else if ($('.productCheckInput[name='+fieldName+']').length > 0){
			jThis = jCurrentForm.find('.productCheckInput[name='+fieldName+']');
				
			jThis.bind('click',function(){
				setValues(jCurrentForm,jThis,fieldName,testType); // set values at blur
			});	
		}
		
		else if ($('.productSelectField[name='+fieldName+']').length > 0){	
			jThis = jCurrentForm.find('.productSelectField[name='+fieldName+']');						
			jThis.bind('click',function(){	
				setValues(jCurrentForm,jThis,fieldName,testType); // set values at blur
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
				setValues(jCurrentForm,jThis,fieldName,"testValue");
			}
			else if ($('.productTextArea[name='+fieldName+']').length > 0){
				jThis = jCurrentForm.find('.productTextArea[name='+fieldName+']');
				setValues(jCurrentForm,jThis,fieldName,"testValue");
			}
			else if ($('.productRadioInput[name='+fieldName+']').length > 0){
				jThis = jCurrentForm.find('.productRadioInput[name='+fieldName+']');
				setValues(jCurrentForm,jThis,fieldName,"testValue");
			}
			else if ($('.productCheckInput[name='+fieldName+']').length > 0){
				jThis = jCurrentForm.find('.productCheckInput[name='+fieldName+']');
				setValues(jCurrentForm,jThis,fieldName,"testValue");
			}
			else if ($('.productSelectField[name='+fieldName+']').length > 0){
				jThis = jCurrentForm.find('.productSelectField[name='+fieldName+']');
				setValues(jCurrentForm,jThis,fieldName,"testValue");
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

function setValues(jCurrentForm,jThis,req,testType){
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
	var thisLabel = jCurrentForm.find(".productLabelGroup label[for="+req+"]").parents(".productLabelGroup");

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
	
	if(fieldClass.indexOf("productTextArea")>-1){
		if(fieldValue.length < 2048){
			testClass="valid";
		}
		else{
			testClass="notvalid";
		}
	}
	
	else if(fieldClass.indexOf("productCheckInput")>-1){ // check input values are usually very descriptive
		if(fieldValue.length < 2048){
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
	
	else if(fieldClass=="productSelectField include"){
		if(fieldValue.length > 0){
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

function displayFormSummary(jCurrentForm){
	var formfields = jCurrentForm.serializeArray();
	var submitBtn = jCurrentForm.find('.formsummarySubmitBtn');
	var clearBtn = jCurrentForm.find('.formsummaryClearBtn');
	var formSummaryContainer = jCurrentForm.find(".formsummary");
	var formDetailsContainer = jCurrentForm.find(".formsummaryDetails");
	var labeltxt,formfieldindex,nextfield;
	
    jQuery.each(formfields, function(i, field){	
		if(field.value != "" && jCurrentForm.find("[type!=hidden][name="+ field.name +"]").length > 0){
			formfieldindex = "formfield_"+i;
			if(field.name != formfields[i-1].name){
				labeltxt = jCurrentForm.find("label[class^='productFormLabel'][for="+ field.name +"]").text().split("*")[0];
				formDetailsContainer.append('<li id="'+ formfieldindex +'" class="form_summary_fieldrow">' + '<span class="form_summary_labeltext">' + labeltxt + '</span>' + '<span class="form_summary_fieldvalue">' + field.value + '</span>' + '</li>');
				nextfield = i+1;
				while(typeof formfields[nextfield] != 'undefined' && formfields[i].name == formfields[nextfield].name){
					$("#"+formfieldindex).append('<span class="form_summary_fieldvalue">' + formfields[nextfield].value + '</span>');
					++nextfield;
				}
			} 
		}
	});

	formSummaryContainer.modal({
		onShow:function(dialog){
			dialog.container.width(450);
			$(window).trigger('resize.simplemodal'); // required for ie6 to resize modal
		},
		onClose:function(){
			$.modal.impl.close();
			jCurrentForm.find(".formsummaryDetails").empty();
		}
	}); 
	 
	submitBtn.hover(function(){
		submitBtn.addClass('cursor');
	},function(){
		submitBtn.removeClass('cursor');
	});
		
	submitBtn.bind('click',function(){
		$.modal.impl.close();
		postform();
	}); 
	
	clearBtn.hover(function(){
		clearBtn.addClass('cursor');
	},function(){
		clearBtn.removeClass('cursor');
	});
		
	clearBtn.bind('click',function(){
		$.modal.impl.close();
		jCurrentForm.find(".formsummaryDetails").empty();
	});
}



function setCookie( name, value, date)
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

//var expires = 1 * 1000 * 60 * 60 * 24;
var expires = 30 * 1000 * 60 * 60 * 24;

var expires_date = new Date( today.getTime() + (expires) );
var path = "/";

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path= /"  : "" );
}



function getCookie(name) {

var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}



function checkCookie(cookie_val,cookie_type) { 
 
 //alert('in check cookie' + cookie_val);
 
 var ext_cookie_name='extrnl_cmpcd_';  
 var int_cookie_name='intrnl_cmpcd_'; 
 
 var  prefix_cookie_name = '';
 
 if(cookie_type == 'E')  {
 prefix_cookie_name = ext_cookie_name;
 } else {
 prefix_cookie_name=int_cookie_name;
 }
 
 var cookie_name=null; 
 var ext_cookie_val = null;
 var current_cookie_pos = 0;
 var curr_cookie_pos = 0;
 
 //Loop Exterior cookie
 for(i=1;i<100;i++) { 
 cookie_name = prefix_cookie_name + i;  
 //alert('cookie_name in the loop:' + cookie_name);
 ext_cookie_val = getCookie(cookie_name);
 if(ext_cookie_val == null) {
	curr_cookie_pos = i;
	//alert('current cookie pos:' + curr_cookie_pos);
	break;
 }
} 
 
 //write cookie with curr postion
 //Increment cookie position  
 //alert('cookie pos:' + curr_cookie_pos);
 cookie_name= prefix_cookie_name + curr_cookie_pos;  
 //alert('cookie name to write:' + cookie_name);
 // alert('cookie val:' + cookie_val);
 setCookie(cookie_name,cookie_val,new Date());
 // alert('Done');
}

function trackExternalCampaigns() {
if(pageUrl.cmpid != null) {	
	//alert('External Campaign value CMPID:' + pageUrl.cmpid);
	checkCookie(pageUrl.cmpid,'E');
} 

if (pageUrl.wtsrch != null) {	
	//alert('External Campaign value WT.srch:' + pageUrl.wtsrch);
	checkCookie(pageUrl.wtsrch,'E');
}

}

function trackInternalCampaigns() {
if(pageUrl.intcmp != null) {	
	//alert('Internal Campaign value:' + pageUrl.intcmp);
	checkCookie(pageUrl.intcmp,'I');
}

}

function readCampaignsFromCookies(prefix_cookie_name) {
//alert(prefix_cookie_name);
var cookie_name;
var all_cookie_values;
var cookie_value;
	for(i=100;i>0;i--) { 
	 cookie_name = prefix_cookie_name + i;  	 
	 cookie_value = getCookie(cookie_name);
		 if(cookie_value != null) {		
			if(all_cookie_values !=null) {
				all_cookie_values = all_cookie_values + ", " + cookie_value;
			} else {
				all_cookie_values = cookie_value;
			}
		}
	}
//alert('Cookie values:' + all_cookie_values);
return all_cookie_values;	
} 
