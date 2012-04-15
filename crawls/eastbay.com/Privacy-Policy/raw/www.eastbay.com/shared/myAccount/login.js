var login_action = "";
var login_object = null;
var login_callback = null;
var login_registerAction = "";
var login_coremetricsEventId = "";
var login_CoremetricsCategoryId = "";
var localCoreMetricsDo = 'false';
var localdontRunBV = '';
var local_login_template_path = '';
var globalSiteWidth = 966;

function initializeLoginRequired() {
	$(this).click(openLoginDialog);
}

function openLoginDialog() {
	closeLoginDialog();
	
	login_object = this;
	login_registerAction = "";
	if (this.tagName == "INPUT") {
		login_action = "submit";
	}
	else {
		login_action = "link";
	}

	openLoginDialog_common(this);
	
	return false;
}
//
function openLoginDialogForID(id, action, registerAction, 
							  callback, direction, coremetricsEventId, 
							  CoremetricsCategoryId, coreMetricsDo, dontRunBV ) {
	closeLoginDialog();
	
	login_coremetricsEventId = coremetricsEventId;
	login_CoremetricsCategoryId = CoremetricsCategoryId;
	localCoreMetricsDo = coreMetricsDo;
	localdontRunBV = dontRunBV;
	
	
	login_object = $("#" + id).get(0);
	login_registerAction = "";
	if (action != null)
		login_action = action;
	else
		login_action = "";

	if (registerAction != null)
		login_registerAction = registerAction;
		
	if (callback != null)
		login_callback = callback;
		
	openLoginDialog_common(login_object, direction, coremetricsEventId, CoremetricsCategoryId, coreMetricsDo);
}

function openLoginDialog_common(sender, direction, coremetricsEventId, CoremetricsCategoryId, coreMetricsDo) {
	closeLoginDialog();
	
	
	if (localdontRunBV)
		{
			local_login_template_path = login_template_path + '&dontRunBV=' + localdontRunBV; 
		}
	loginReady();	
	
	var html = '<div id="login_container"></div>';
	var html_shadow = '<div id="login_container_shadow"><div><div></div></div></div>';
	var bodyWidth = $("body").width();
	var pageRightBorder = bodyWidth - ((bodyWidth - globalSiteWidth) / 2);
	
	$("body").prepend(html);
	$("body").prepend(html_shadow);
	
	var targetOffset = $(sender).offset();
	var button_width = $(sender).width();
	var button_height = $(sender).height();
	
	var width = $("#login_container").width();
	var height = $("#login_container").height();

	var left = targetOffset.left;

	if ((left + width) > bodyWidth || (left + width) > pageRightBorder) {
		left = left + button_width - width;
	} else if (left < 1) {
		left = 1;
	}
	
	var top = targetOffset.top;
	//top -= height + 10;
	top += button_height;
	
	if (direction == "bottomleft") {
		top = top - button_height - height;
	}
	
	$("#login_container").css({left: left, top: top});
	$("#login_container_shadow").css({left: left + 6, top: top + 6, opacity: 0.5});
	$("#login_container").load(local_login_template_path, function(responseText, textStatus, XMLHttpRequest) {
		
		if (textStatus != "success") {
			$("body").html(responseText);
			//closeLoginDialog();
		}
	});
	
	$('#login_container').click(function(e) {
		e.stopPropagation();
	});
	$(document).click(closeLoginDialog);		
}

function gotoRegistration() {
	//alert(login_coremetricsEventId); alert(login_CoremetricsCategoryId);
	if (login_coremetricsEventId != '' && login_CoremetricsCategoryId != '' && localCoreMetricsDo == 'true')
	{
		if (login_coremetricsEventId == 'Global Header' &&  login_CoremetricsCategoryId == 'Log In')	
			{
				cmCreateConversionEventTag('Global Header Log In', 1, 'Create an Account', 0);
				createCookie('NewRegistrant', 'Global Header Log In|Create an Account');
			}
		else if (login_coremetricsEventId == 'Registered Message' &&  login_CoremetricsCategoryId == 'Log In')
			{
				// cmCreateConversionEventTag('Registered Message Log In', 1, 'Create an Account', 0);
				createCookie('NewRegistrant', 'Registered Message Log In|Create an Account');
			}
		else if (login_coremetricsEventId.search('Loyalty Message') != -1 &&  login_CoremetricsCategoryId == 'Log In')	
			{
				cmCreateConversionEventTag('Loyalty Message Log In - ' + window.parent.currentloyaltylevel, 1, 'Create an Account', 0);
				createCookie('NewRegistrant', 'Loyalty Message Log In - '+ window.parent.currentloyaltylevel + '|Create an Account');
			}
		else if (login_coremetricsEventId.search('Loyalty PDP') != -1 &&  login_CoremetricsCategoryId == 'Log In')	
			{
				// cmCreateConversionEventTag('Loyalty PDP Log In', 1, 'Create an Account', 0);
				createCookie('NewRegistrant', 'Loyalty PDP Log In - ' + window.parent.level + '|Create an Account');
			}
		else if (login_coremetricsEventId.search('Loyalty Renewal ') != -1 &&  login_CoremetricsCategoryId == 'Log In')	
			{
				//loyalty renewal pdp login dialog box in topnav
				createCookie('NewRegistrant', 'Loyalty Renewal PDP Log In - ' + window.parent.level + '|Create an Account');
			}
			
	}
	// alert('login_registerAction - ' + login_registerAction);
	// alert('register_url - ' + register_url);
	
	if (login_registerAction != "")
		window.parent.location = login_registerAction;
	else
		window.parent.location = register_url;
}

function closeLoginDialog() {
	$("#login_container_shadow").remove();
	$("#login_container").remove();
}

// Continue with the previous action
function closeAndPerformAction() {
	closeLoginDialog();
	// alert(login_action); return;
	
	if (login_coremetricsEventId != '' && login_CoremetricsCategoryId != '' && localCoreMetricsDo == 'true')
		{	cmCreateConversionEventTag(login_coremetricsEventId, 2, login_CoremetricsCategoryId, 0);  }
		
	if (login_callback != null)
	{
		login_callback();
		login_callback = null;
		return;
	}
	
	if (login_action == "") return;
	
	if (login_action == "submit") {
		$(login_object).parents("form").submit();
	}
	else {
		var action = $(login_object).attr("href");
		if (action != null)
			window.location = $(login_object).attr("href");
	}
}

function loginReady() {
	
	if (login_coremetricsEventId != '' && login_CoremetricsCategoryId != ''  && localCoreMetricsDo == 'true')
		{	cmCreateConversionEventTag(login_coremetricsEventId, 1, login_CoremetricsCategoryId, 0); }
		
	return;
}

function bv_openLoginDialogForID(action, callback) {
	closeLoginDialog();
	if (callback != null)
		login_callback = callback;
	var login_template = login_template_path;
	var sku = $("#pdp_selectedSKU").val();
	var model_nbr = $("#the_model_nbr").val();
	login_template = login_template + '&action=' + action + '&model_nbr=' + model_nbr + '&sku=' + sku + '&' + bv_querystring;
	var html = '<div id="login_container"></div>';
	var html_shadow = '<div id="login_container_shadow"><div><div></div></div></div>';
	
	$("body").prepend(html);
	$("body").prepend(html_shadow);
	
	if (action == "bazaarvoiceReviews") {
		var targetOffset = $("#BVSubmissionURL").offset();
		var button_width = $("#BVSubmissionURL").width();
		var button_height = $("#BVSubmissionURL").height();
	}
	else if (action == "bazaarvoiceAskQuestion") {
		var targetOffset = $("#BVQuestionAnswer").offset();
		var button_width = $("#BVQuestionAnswer").width();
		var button_height = $("#BVQuestionAnswer").height();
	}
	/*else if (action == "bazaarvoiceAnswerQuestion") {
		var targetOffset = $("#BVAnswerQuestionURL").offset();
		var button_width = $("#BVAnswerQuestionURL").width();
		var button_height = $("#BVAnswerQuestionURL").height();
	}*/
	
	var width = $("#login_container").width();
	var height = $("#login_container").height();

	var left = targetOffset.left;
	var top = targetOffset.top;

	left -= (width - button_width) / 2;
	//top -= height + 10;
	top += button_height;
	
	$("#login_container").css({left: left, top: top});
	$("#login_container_shadow").css({left: left + 6, top: top + 6, opacity: 0.5});
	$("#login_container").load(login_template, function(responseText, textStatus, XMLHttpRequest) {
		
		if (textStatus != "success") {
			$("body").html(responseText);
			//closeLoginDialog();
		}
	});
	
	$('#login_container').click(function(e) {
		e.stopPropagation();
	});
	$(document).click(closeLoginDialog);		
}
