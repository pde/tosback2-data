
//ClickTale settings

/*ClickTaleFetchFromWithCookies.set("ASP.NET_SessionId","jj5flb552lihpsey1ef23hib");
ClickTaleFetchFrom = ClickTaleFetchFromWithCookies.constructFetchFromUrl();



//only for QA
ClickTaleFetchFrom = document.location.href;
ClickTaleFetchFrom+="#CTFetchUserAgent=VisitorUserAgent";
*/

//only for QA
//ClickTaleUploadPage("<!DOCTYPE html>","</html>");

//

//link for dmz - to fix player sync bug 
//http://dmz05.app.clicktale.com/Player.aspx?PID=69&UID=1798279823&SID=43782797

//for validation
//window.ClickTaleSettings = { XHRWrapper: { Enable: true, MaxResponseSize: 1000000} };

function SafeClickTaleField(Field,Value) {
    if (typeof ClickTaleField == 'function') {
        ClickTaleField(Field,Value);
    }
}

//define SafeClickTaleExec
function SafeClickTaleExec(code) {
    if (typeof ClickTaleExec == 'function') {
        ClickTaleExec(code);
    }
}

//define SafeClickTaleExec
	function SafeClickTaleTag(tag) {
    if (typeof ClickTaleTag == 'function') {
        ClickTaleTag(tag);
    }
	}

var ClickTaleTagBuffer = [];
function BufferedClickTaleTag(tag) {
    if (typeof ClickTaleTag == "function") {
        ClickTaleTag(tag);
    } else {
        ClickTaleTagBuffer.push(tag);
    }
}
setTimeout(function () {
    if (typeof ClickTaleTag == "function") {
        for (var i = 0; i < ClickTaleTagBuffer.length; i++) {
            ClickTaleTag(ClickTaleTagBuffer[i]);
        }
    } else {
        setTimeout(arguments.callee, 100);
    }
}, 100);


function CTIsPlayback() {
   var CTIsPlayback=true;
try
{
   if(!parent || !parent.WebPlayer) // if there is no WebPlayer or if the above frame is not accessible
      CTIsPlayback= false;
} catch(e) { CTIsPlayback=false; }

	return CTIsPlayback;
}


//for register2.aspx
if (CTIsPlayback()==true)
{
	(function() {
		if(typeof CookieNullRedirect == 'function')
		{
			var x = CookieNullRedirect;
			CookieNullRedirect = function(a,b) {
			
			if (typeof ClickTaleContext == 'object') {
			try {
				ClickTaleContext.getRecordingContextAsync("1", function (context) {
				if(context.location.search(/register2.aspx/i) != -1)
				{
					if(a=="FunnelCookie")
					{
						 if (context.fields.FunnelCookie == null || context.fields.FunnelCookie == "") {
							location.href = b
					}
						
					}
				}
				
				
			});
		}
			catch (e) { }
		}
			
		
		}
	}
	})();
	
	
	(function() {
		if(typeof GetCookieValueByKey == 'function')
		{
			var x = GetCookieValueByKey;
			GetCookieValueByKey = function(a,e) {
			if (typeof ClickTaleContext == 'object') {
			try {
				ClickTaleContext.getRecordingContextAsync("1", function (context) {
				if(context.location.search(/register2.aspx/i) != -1)
				{
					if(a=="FunnelCookie")
					{
						var b = context.fields.FunnelCookie;
						if (b == null || b == "") {
							return false
						}
						var c = b.split("&");
						var d = "";
						for (x in c) {
							var f = c[x].split("=");
							if (f[0] == e) {
								d = f[1]
							}
						}
						if (d == "") {
							return false
						}
						return d
					}
						
				}
				
			});
		}
			catch (e) { }
		}
			
		
		}
	}
	})();
	
	
	
}



function getMaleFemaleSelection(MaleInputId,FemaleInputId)
{
	if(jQuery("#"+MaleInputId+"").attr("checked")==true)
		return "M";
	
	if(jQuery("#"+FemaleInputId+"").attr("checked")==true)
		return "F";
}

/**********Validation .net validators****************/

function ClickTale_createConstFunction(val) {
    return function() {return val;};
}

function ClickTale_setValidatorsValuesInPlayback(elId, vals) {
    var validators = jQuery("#" + elId)[0].Validators;
    var l = validators.length;
    var i;
    var values = [];
    for(i = 0; i<l; i++) {
        validators[i].evaluationfunction = ClickTale_createConstFunction(vals[i]);
        validators[i].isvalid = vals[i];
    }
}

function ClickTale_generateCodeValidationSycForClickTaleExec(elId) {
    var validators = jQuery("#" + elId)[0].Validators;
    var l = validators.length;
    var i;
    var values = [];
    for(i = 0; i<l; i++) {
        values.push(validators[i].evaluationfunction(validators[i]).toString());
    }
    
    var code = 'ClickTale_setValidatorsValuesInPlayback("'+elId+'",['+values.join(',')+'])';
	return code;
}

/**********end Validation*****************/

/***************Validation sanofi-diabetes************/
//runs all input validations - the validation function of the input are in the attr class
	function ClickTale_Validate_Offer_Form(input,trigger)
	{
		var classAttr = input.attr("class");
		var classes = classAttr ? classAttr.split(' ') : [];
		var result ;
		jQuery.each(classes, function(idx, c) {
        c = jQuery.trim(c);
        
		var validateMethod = validator.getMethod(c);
		if (typeof (validateMethod) != "undefined" && !jQuery(input).is(':hidden')) {
			{
				result = validateMethod(input, validator.getSingleRange(c));
				if(c.match(/text_min/))
				{
					c ="text_min";
				}
				
				if(c.match(/text_max/))
				{
					c="text_max";
				}
				result.Message=result.Message.replace("'","\\'");
				SafeClickTaleExec("validator.methods."+c+" = function(input) {return { IsValid:"+result.IsValid+", Message:\'"+result.Message+"\'};};");
				
			}
		}
        })
		
		if(trigger!="undefined" && trigger!="")
		{
			var code = "jQuery('#"+input.attr("id")+"')."+trigger+"()";
			SafeClickTaleExec(code);
		}
		
		return result;
	}
	
/***************End Validation sanofi-diabetes************/

	
jQuery(document).ready(function () {


	if(document.location.pathname.search(/eh-calorie-counter.aspx/i) != -1)
	{
		jQuery(".startMCC img").click(function(){
	
		var genderSelection= getMaleFemaleSelection("chkMale","chkFemale");
			SafeClickTaleTag("2-a "+ genderSelection);
			ClickTaleRegisterFormSubmit(jQuery("#Form1")[0]);
		})
		
		
	}
	
	if(document.location.pathname.search(/my-calorie-counter.aspx/i) != -1)
	{
		
		jQuery(".startMCC img").click(function(){
	
			var genderSelection= getMaleFemaleSelection("chkMale","chkFemale");
			SafeClickTaleTag("4-a "+ genderSelection);
			ClickTaleRegisterFormSubmit(jQuery("#Form1")[0]);
		})
		
		
	}
	

		
	/***************************eh-calorie-counter-2.aspx && my-calorie-counter-2**********************************/
	
if(document.location.pathname.search(/eh-calorie-counter-2/i) != -1 || document.location.pathname.search(/my-calorie-counter-2/i)!=-1)
{

	
	jQuery("#ctl01_ctl00_ibSubmit").click(function(){
	
		/**validate all inputs in form**/
		var code;
		
		//CurrentWeight
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_tbCurrentWeight');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_tbCurrentWeight').change()";
		SafeClickTaleExec(code);
		
		//TargetWeight
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_tbTargetWeight');
		SafeClickTaleExec(code);
		
		 code ="jQuery('#ctl01_ctl00_tbTargetWeight').change()";
		SafeClickTaleExec(code);
		
		//BillingFName
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingFName');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingFName').change()";
		SafeClickTaleExec(code);
		
		//BillingLName
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingLName');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingLName').change()";
		SafeClickTaleExec(code);
		
		//Email
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtEmail');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtEmail').change()";
		SafeClickTaleExec(code);
		
		//ConfirmEmail
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtConfirmEmail');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtConfirmEmail').change()";
		SafeClickTaleExec(code);
		
		//ScreenName
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtScreenName');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtScreenName').change()";
		SafeClickTaleExec(code);
		
		//Password
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtPassword');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPassword').change()";
		SafeClickTaleExec(code);
		
		//PasswordConfirm
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtPasswordConfirm');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPasswordConfirm').change()";
		SafeClickTaleExec(code);
		
		//BirthDate
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_tbValue');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_tbValue').change();";
		SafeClickTaleExec(code);
		
		//BirthDate_ddMonth
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddMonth');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddMonth').change();";
		SafeClickTaleExec(code);
		
		
		//BirthDate_ddDay
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddDay').change()";
		SafeClickTaleExec(code);
		
		
		//BillingZip
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingZip');
		SafeClickTaleExec(code);
		
		code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingZip').change()";
		SafeClickTaleExec(code);
		
		//gender
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_rblGender_0');
		SafeClickTaleExec(code);
		
		SafeClickTaleExec("ValidatorValidate(jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_rblGender_0')[0].Validators[0], '', null);");
		
		
		code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_rblGender_1');
		SafeClickTaleExec(code);
		
		SafeClickTaleExec("ValidatorValidate(jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_rblGender_1')[0].Validators[0], '', null);");
		
		
		
		if(!DOBIsSelected($('.month :selected').val(), $('.day :selected').val(), $('.year :selected').val()))
		{
			SafeClickTaleExec("DisplayRequiredDOBError();");
			SafeClickTaleExec("DisplayGenericError();");
		}
		else
		if(Page_IsValid==false )
		{
			SafeClickTaleExec("DisplayGenericError();");
		}
		
		
		
		/**end validation**/
		
		
		var genderSelection= getMaleFemaleSelection("ctl01_ctl00_ctlFunnelRegister_ctl00_rblGender_0","ctl01_ctl00_ctlFunnelRegister_ctl00_rblGender_1");
		if(Page_IsValid==true)
		{
			if(document.location.pathname.search(/eh-calorie-counter-2/i)!=-1)
			{
					SafeClickTaleTag("1-b "+ genderSelection);
			}
			else
			{
				SafeClickTaleTag("4-b "+ genderSelection); // my-calorie-counter-2
			}
		
	
		}
			
	
	})
	
	
	
	jQuery("#ctl01_ctl00_ddlHeightInchesPrimary").blur(function(){
		var code ="jQuery('#ctl01_ctl00_ddlHeightInchesPrimary').blur()";
		SafeClickTaleExec(code);
		
	})
	
	
	jQuery("#ctl01_ctl00_ddlHeightInchesSecondary").blur(function(){
		var code ="jQuery('#ctl01_ctl00_ddlHeightInchesSecondary').blur()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_tbCurrentWeight").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_tbCurrentWeight');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_tbCurrentWeight').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_tbCurrentWeight").blur(function(){
	
		var code ="jQuery('#ctl01_ctl00_tbCurrentWeight').blur()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_tbCurrentWeight").change(function(){
		var code ="jQuery('#ctl01_ctl00_tbCurrentWeight').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_tbTargetWeight").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_tbTargetWeight');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_tbTargetWeight').change()";
		SafeClickTaleExec(code);
	})
	
	
	jQuery("#ctl01_ctl00_tbTargetWeight").blur(function(){
		var code ="jQuery('#ctl01_ctl00_tbTargetWeight').blur()";
		SafeClickTaleExec(code);
	})
	
	
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingFName").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingFName');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingFName').change()";
		SafeClickTaleExec(code);
	})
	
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingLName").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingLName');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingLName').change()";
		SafeClickTaleExec(code);
	})
	
	
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingFName").blur(function(){
		//var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingFName').blur()";
		var code ="document.getElementById('ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingFName').onblur()";
		SafeClickTaleExec(code);
		
		
	})
	
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtEmail").focus(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtEmail').focus()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtEmail").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtEmail');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtEmail').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtEmail").blur(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtEmail').blur()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtConfirmEmail").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtConfirmEmail');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtConfirmEmail').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtConfirmEmail").blur(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtConfirmEmail').blur()";
		SafeClickTaleExec(code);
	})
	
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtConfirmEmail").focus(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtConfirmEmail').focus()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtScreenName").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtScreenName');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtScreenName').change()";
			SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtScreenName").blur(function(){
		
		
		//var code = "checkScreennameAvailability = function() {return '+(val ? 'true' : 'false')+';};'";
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtScreenName').blur()";
			SafeClickTaleExec(code);
			
		
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtScreenName").focus(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtScreenName').focus()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPassword").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtPassword');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPassword').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPassword").blur(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPassword').blur()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPassword").focus(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPassword').focus()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPasswordConfirm").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtPasswordConfirm');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPasswordConfirm').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPasswordConfirm").blur(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPasswordConfirm').blur()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPasswordConfirm").focus(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtPasswordConfirm').focus()";
		SafeClickTaleExec(code);
	})
	
	
	
	
	//this is hidden text box that put the full birthady value
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_tbValue").change(function(){
		
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_tbValue');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_tbValue').change()";
		SafeClickTaleExec(code);
	})
	
	//changes gender status to checked
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddMonth").click(function(){
	
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddMonth').click()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddMonth").change(function(){
	
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddMonth');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddMonth').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddDay").change(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddDay').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddYear").change(function(){
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_uc_BirthDate_ddYear').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_ddlBillingCountry").change(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_ddlBillingCountry').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingZip").change(function(){
		var code = ClickTale_generateCodeValidationSycForClickTaleExec('ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingZip');
		SafeClickTaleExec(code);
		
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingZip').change()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingZip").focus(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingZip').focus()";
		SafeClickTaleExec(code);
	})
	
	jQuery("#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingZip").blur(function(){
		var code ="jQuery('#ctl01_ctl00_ctlFunnelRegister_ctl00_txtBillingZip').blur()";
		SafeClickTaleExec(code);
	})
	
	//check boxes
	jQuery("#condition_form .pad_conditions input[type=checkbox]").bind("click",function(){
	  var index = jQuery("#condition_form .pad_conditions input[type=checkbox]").index(this);
	  SafeClickTaleExec("jQuery('#condition_form .pad_conditions input[type=checkbox]').eq("+index+").trigger('click')");
	 });

	jQuery("input[name=mccNewsletter]").click(function(){
		var code ="jQuery('input[name=mccNewsletter]').click()";
		SafeClickTaleExec(code);
	})
 
	//CTA button
	/*jQuery(".btnReg").click(function(){
		var code ="jQuery('.btnReg').click()";
		SafeClickTaleExec(code);
	})*/
}
	/***************************end eh-calorie-counter-2.aspx**********************************/
	
	
	if(document.location.pathname.search(/register2.aspx/i) != -1)
	{
		SafeClickTaleField("FunnelCookie",$.cookie("FunnelCookie"))
		
		jQuery("#ctl01_ctl00_ibSubmit").click(function(){
			
			ClickTaleRegisterFormSubmit(jQuery("#Form1")[0]);
		})
		
	}
	
	
	if(document.location.pathname.search(/newsletters-just-for-you/i) != -1)
	{
		jQuery("#ctl01_ctl00_ibSubmit").click(function(){
				
				ClickTaleRegisterFormSubmit(jQuery("#Form1")[0]);
			})
	}
	
	
	if(document.location.pathname.search(/sanofi-diabetes/i) != -1)
	{
	
		
		//email address
	
		
		//all the textboxes in the page - blur
		 jQuery(".formSection .left input[type=textbox]").bind("blur",function(){
		 // var index = jQuery(".formSection .left input[type=textbox]").index(this);
		  
		  ClickTale_Validate_Offer_Form(jQuery(this),"blur");
		 
		 });
		
		//all the textboxes in the page - change
		 jQuery(".formSection .left input[type=textbox]").bind("change",function(){
		  var index = jQuery(".formSection .left input[type=textbox]").index(this);
		  SafeClickTaleExec("jQuery('.formSection .left input[type=textbox]').eq("+index+").trigger('change')");
		 });
		 
		 //all the radio buttons in the page - blur
		 jQuery(".formSection input[type=radio]").bind("blur",function(){
		   
		   ClickTale_Validate_Offer_Form(jQuery(this),"blur");
		 });
		 
		 //all the radio buttons in the page - change
		 jQuery(".formSection input[type=radio]").bind("click",function(){
		  var index = jQuery(".formSection input[type=radio]").index(this);
		  SafeClickTaleExec("jQuery('.formSection input[type=radio]').eq("+index+").trigger('click')");
		 });
		 
		  //all the checkbox buttons in the page - click
		 jQuery(".formSection input[type=checkbox]").bind("click",function(){
		   ClickTale_Validate_Offer_Form(jQuery(this),"click");
		   
		 });
		 
		//gender select box
		jQuery("#q874").blur(function(){
		  ClickTale_Validate_Offer_Form(jQuery(this),"blur");
		})
		
		//gender select box
		jQuery("#q874").change(function(){
		 var code = "jQuery('#q874').change()";
		 SafeClickTaleExec(code);
		})
		
		
		//birthdate
		
		jQuery("#omqid_875_DateM").change(function(){
		 SafeClickTaleExec("jQuery('#omqid_875__DateD option').length="+jQuery('#omqid_875__DateD option').length);
		 SafeClickTaleExec("jQuery('#omqid_875_DateM').change()");
		 ClickTale_Validate_Offer_Form(jQuery('div#q875.date_my'),"blur");
		 
		
		})
		
		jQuery("#omqid_875_DateD").change(function(){
		 SafeClickTaleExec("jQuery('#omqid_875_DateD').change()");
		 ClickTale_Validate_Offer_Form(jQuery('div#q875.date_my'),"blur");
		
		})
		
		jQuery("#omqid_875_DateY").change(function(){
		 SafeClickTaleExec("jQuery('#omqid_875__DateD option').length="+jQuery('#omqid_875__DateD option').length);
		 SafeClickTaleExec("jQuery('#omqid_875_DateY').change()");
		 ClickTale_Validate_Offer_Form(jQuery('div#q875.date_my'),"blur")
		
		})
		
		
		
		//the select boxes in the botton of the page
		jQuery(".question select").bind('change',function(){
		 var index = jQuery(".question select").index(this);
		 SafeClickTaleExec("jQuery('.question select').eq("+index+").trigger('change')");
		})
		
		
		//submit button
		 jQuery("#btnOMSubmit").click(function(){
			/*********validation***********/
			
			//all textbox
			jQuery(".formSection .left input[type=textbox]").each(function(index){
			 ClickTale_Validate_Offer_Form(jQuery(this),"blur");
			 SafeClickTaleExec("jQuery('.formSection .left input[type=textbox]').eq("+index+").trigger('change')");
			});
			
			

			//all radio buttons
			jQuery(".formSection input[type=radio]").each(function(index){
			 ClickTale_Validate_Offer_Form(jQuery(this),"blur");
			});
			
			//all checkbox
			jQuery(".formSection input[type=checkbox]").each(function(){
				var result= ClickTale_Validate_Offer_Form(jQuery(this),"");
				if(result!="undefind" && result!=null)
				{
					if(result.IsValid==false)
					{
						SafeClickTaleExec("showError(jQuery('#"+this.id+"'), '"+result.Message+"')");
					}
				}
			})
			
		
			////gender select box
   		ClickTale_Validate_Offer_Form(jQuery("#q874"),"blur");
		SafeClickTaleExec("jQuery('#q874').change();");
		
		//birth date
		 SafeClickTaleExec("jQuery('#omqid_875__DateD option').length="+jQuery('#omqid_875__DateD option').length);
		 SafeClickTaleExec("jQuery('#omqid_875_DateM').change()");
		 ClickTale_Validate_Offer_Form(jQuery('div#q875.date_my'),"blur");
		
		
		 SafeClickTaleExec("jQuery('#omqid_875_DateD').change()");
		 ClickTale_Validate_Offer_Form(jQuery('div#q875.date_my'),"blur");
		 
		 SafeClickTaleExec("jQuery('#omqid_875__DateD option').length="+jQuery('#omqid_875__DateD option').length);
		 SafeClickTaleExec("jQuery('#omqid_875_DateY').change()");
		 ClickTale_Validate_Offer_Form(jQuery('div#q875.date_my'),"blur");
		
			/*********validation***********/
		
		var IsValid=validateOffer();
		if (IsValid==1 || IsValid==true)
		{
		 ClickTaleRegisterFormSubmit(jQuery("#OfferForm")[0]);
		}
		
			
		 })
		 
		 
	}
	
	if(document.location.pathname.search(/recommended-groups/i) != -1)
	{
		jQuery("#ctl01_ibSubmit").click(function(){
		
			ClickTaleRegisterFormSubmit(jQuery("#Form1")[0]);
		})
	}
	
})