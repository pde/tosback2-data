
  
function showDiv(div) {
if (document.getElementById(div).className != "hidden") {
	document.getElementById(div).className = "hidden";
	//document.getElementById(ul2).style.backgroundImage = "url(images/arrow_down.png)";
	} else {
	document.getElementById(div).className = "";
	//document.getElementById(ul2).style.backgroundImage = "url(images/arrow_right.png)";
	}
}

function setCookie(c_name,value,expiredays)
     {
           var exdate=new Date();
           exdate.setDate(exdate.getDate()+expiredays);
           document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
     }

if ((document.location.href.indexOf("LoginFormView") == -1) && 
	(document.location.href.indexOf("ForgotPassword1View") == -1) && 
	(document.location.href.indexOf("ChallengeQnView") == -1) && 
	(document.location.href.indexOf("ResetPasswordView") == -1) && 
	(document.location.href.indexOf("ChangePasswordView") == -1) && 
	(document.location.href.indexOf("ProhibitedCharacterErrorView") == -1) && 
	(document.location.href.indexOf("JABErrorView") == -1) &&
	(document.location.href.indexOf("Logon") == -1) &&
	(document.location.href.indexOf("CheetahMailAutoResponse") == -1))	{
		var pageURL = document.location.href;
		var pageURLMain = pageURL.split("krypto");
		var pageURLEnd = pageURL.split("ddkey");
		if (pageURLMain.length > 0 && pageURLMain[0] != 'undefined') {
			pageURL = pageURLMain[0];
			if (pageURLEnd.length > 1 && pageURLEnd[1] != 'undefined') {
				pageURL += "&ddkey" + pageURLEnd[1];
			}
		}
        setCookie('_last_URL', pageURL, null);
    }
 
function toggleShowTopCategories() {
	var toggleAnchor = document.getElementById("toggleSidebar");
	var sidebarOverflow = document.getElementById("sidebarOverflow");
	var showAllCategories = readCookie("showAllCategories");
	if (!showAllCategories) {
		showAllCategories = "false";
	}
	if ( showAllCategories == "true") {
		sidebarOverflow.style.display = "none";
		toggleAnchor.innerHTML = "Browse All";
		createCookie("showAllCategories", "false", 1);
	} else {
		sidebarOverflow.style.display = "block";
		toggleAnchor.innerHTML = "Show Top Categories";
		createCookie("showAllCategories", "true", 1);
	}
}
 

// End www.quirksmode.org material


	function State(abbr, name)
	{
	    this.abbr = abbr;
	    this.name = name;
	}

    var stateProvinceArray = new Array();
	stateProvinceArray[0] = new State("AL","Alabama");
	stateProvinceArray[1] = new State("AK","Alaska");
	stateProvinceArray[2] = new State("AS-","American Samoa"); //not included
	stateProvinceArray[3] = new State("AZ","Arizona");
	stateProvinceArray[4] = new State("AR","Arkansas");
	stateProvinceArray[5] = new State("AA","Military America");  
	stateProvinceArray[6] = new State("AE","Military Africa/Canada/Europe/Middle East");  //not included
	stateProvinceArray[7] = new State("AP","Military Pacific");  //not included
	stateProvinceArray[8] = new State("CA","California");
	stateProvinceArray[9] = new State("CO","Colorado");
	stateProvinceArray[10] = new State("CT","Connecticut");
	stateProvinceArray[11] = new State("DE","Delaware");
	stateProvinceArray[12] = new State("DC","District of Columbia");
	stateProvinceArray[13] = new State("FL","Florida");
	stateProvinceArray[14] = new State("GA","Georgia");
	stateProvinceArray[15] = new State("GU-","Guam");  //not included
	stateProvinceArray[16] = new State("HI","Hawaii");
	stateProvinceArray[17] = new State("ID","Idaho");
	stateProvinceArray[18] = new State("IL","Illinois");
	stateProvinceArray[19] = new State("IN","Indiana");
	stateProvinceArray[20] = new State("IA","Iowa");
	stateProvinceArray[21] = new State("KS","Kansas");
	stateProvinceArray[22] = new State("KY","Kentucky");
	stateProvinceArray[23] = new State("LA","Louisiana");
	stateProvinceArray[24] = new State("ME","Maine");
	stateProvinceArray[25] = new State("MD","Maryland");
	stateProvinceArray[26] = new State("MA","Massachusetts");
	stateProvinceArray[27] = new State("MI","Michigan");
	stateProvinceArray[28] = new State("MN","Minnesota");
	stateProvinceArray[29] = new State("MS","Mississippi");
	stateProvinceArray[30] = new State("MO","Missouri");
	stateProvinceArray[31] = new State("MT","Montana");
	stateProvinceArray[32] = new State("NE","Nebraska");
	stateProvinceArray[33] = new State("NV","Nevada");
	stateProvinceArray[34] = new State("NH","New Hampshire");
	stateProvinceArray[35] = new State("NJ","New Jersey");
	stateProvinceArray[36] = new State("NM","New Mexico");
	stateProvinceArray[37] = new State("NY","New York");
	stateProvinceArray[38] = new State("NC","North Carolina");
	stateProvinceArray[39] = new State("ND","North Dakota");
	stateProvinceArray[40] = new State("MP-","Northern Mariana Islands"); //not included
	stateProvinceArray[41] = new State("OH","Ohio");
	stateProvinceArray[42] = new State("OK","Oklahoma");
	stateProvinceArray[43] = new State("OR","Oregon");
	stateProvinceArray[44] = new State("PW","Palau");
	stateProvinceArray[45] = new State("PA","Pennsylvania");
	stateProvinceArray[46] = new State("RI","Rhode Island");
	stateProvinceArray[47] = new State("SC","South Carolina");
	stateProvinceArray[48] = new State("SD","South Dakota");
	stateProvinceArray[49] = new State("TN","Tennessee");
	stateProvinceArray[50] = new State("TX","Texas");
	stateProvinceArray[51] = new State("VI","U.S. Virgin Islands");
	stateProvinceArray[52] = new State("UT","Utah");
	stateProvinceArray[53] = new State("VT","Vermont");
	stateProvinceArray[54] = new State("VA","Virginia");
	stateProvinceArray[55] = new State("WA","Washington");
	stateProvinceArray[56] = new State("WV","West Virginia");
	stateProvinceArray[57] = new State("WI","Wisconsin");
	stateProvinceArray[58] = new State("WY","Wyoming");

	stateProvinceArray[59] = new State("QC","Quebec");
	stateProvinceArray[60] = new State("BC","British Columbia");
	stateProvinceArray[61] = new State("AB","Alberta");
	stateProvinceArray[62] = new State("MB","Manitoba");
	stateProvinceArray[63] = new State("SK","Saskatchewan");
	stateProvinceArray[64] = new State("NS","Nova Scotia");
	stateProvinceArray[65] = new State("NB","New Brunswick");
	stateProvinceArray[66] = new State("NL","Newfoundland and Labrador");
	stateProvinceArray[67] = new State("PE","Prince Edward Island");
	stateProvinceArray[68] = new State("NT","Northwest Territories");
	stateProvinceArray[69] = new State("YK","Yukon");
	stateProvinceArray[70] = new State("NU","Nunavut");
	stateProvinceArray[71] = new State("ON","Ontario");

	function displayState(abv)
	{
		displayStateForElement(abv, 'displayStateName');
	}
	
	function getState(abv)
	{
		abv = abv.toUpperCase();
		var displayValue = '';
		for (var i=0; i<stateProvinceArray.length; i++){
			if(abv == stateProvinceArray[i].abbr ){
				displayValue = stateProvinceArray[i].name;
			}
		}
		return displayValue;
	}
	
	function displayStateForElement(abv, elementID)
	{
		var stateDiv = document.getElementById(elementID);
		abv = abv.toUpperCase();
		var displayValue = '';
		for (var i=0; i<stateProvinceArray.length; i++){
			if(abv == stateProvinceArray[i].abbr ){
				displayValue = stateProvinceArray[i].name;
			}
		}
		if(displayValue == ''){
			displayValue ='Invalid state/province abbreviation';
		}
		stateDiv.innerHTML = ' - '+displayValue;
	}
	
	function isValidCanadianProvince(abbr)
	{
		abbr = abbr.toUpperCase();
		if(abbr == 'QC' || abbr == 'BC' || abbr == 'AB' || abbr == 'MB' || abbr == 'SK' || abbr == 'NS' || abbr == 'NB' || abbr == 'NL' || abbr == 'PE' || abbr == 'NT' || abbr == 'YK' || abbr == 'NU' || abbr == 'ON')
			return true;
		else
			return false;		
	}
	
	function isValidState(abv)
	{
		abv = abv.toUpperCase();
		var stateDiv = document.getElementById('displayStateName');
		var displayValue = '';
		for (var i=0; i<stateProvinceArray.length; i++)
		{
			if(abv == stateProvinceArray[i].abbr )
			{
				displayValue = stateProvinceArray[i].name;
			}
		}
		
		if(displayValue == '')
		{
			return false;
		}

		return true;
	}

function validatePaymentForm(form)
	{
			
	//	validator_reset(); 
	//Element.extend is not a function
	//https://localhost/wcsstore/JABAssetStore/static/scripts/validator.js  --> Line 152
			
		form.cc_brand.value = cc_types[form.policyId.value];	
		
		/**********************************************************************************
		* Perform client validation of the Credit Card fields
		**********************************************************************************/
		form.policyId.validations.validate();        
		form.account.validations.validate();
		form.expire_year.validations.validate();  
		form.cc_cvc.validations.validate();     
		

		if (!(form.cc_brand.value == '' || form.cc_cvc.value == '')) {
			if (!isValidCVVCode(form.cc_brand.value, form.cc_cvc.value.length))
			{
				add_error('pay_cc','<p>Security code is invalid!</p>');
			}
		}
	

		/**********************************************************************************
		* Display any errors which exist otherwise submit the form
		**********************************************************************************/
		if (validation_display_errors('') == true) 
		{
			form.submit();
		}
	}
	
	function maskKeyPress(objEvent, reValidChars) {
    var iKeyCode,
    strKey;
    var strUserAgent = navigator.userAgent.toLowerCase();
    var isIE = strUserAgent.indexOf("msie") > -1;
    var reKeyboardChars = /[\x00\x08\x09\x0D]/; // HOME, END, ARROWS, DELETE, BACKSPACE, TAB, and ENTER
    if (isIE) {
        iKeyCode = objEvent.keyCode;
    } else {
        iKeyCode = objEvent.which;
    }

    strKey = String.fromCharCode(iKeyCode);

    if (!reValidChars.test(strKey) && !reKeyboardChars.test(strKey)) {
        return false;
    }
}

//Purpose : This function is a combination of handle Enter Key functionality and mask Keys.
//If the user entered key is 'Enter' then  handleEnterKey function is called else  maskKeyPress function is called.
function handleEnterKeyAndMaskKeyset(field, event, functionName, reValidChars) {
    var keyCode = event.keyCode ? event.keyCode: event.which ? event.which: event.charCode;
    //If the user entered key is 'Enter' i.e keycode=13 then call handleEnterKeyFunction else call the maskKeyPress function
    if (keyCode == 13) {
        return handleEnterKey(field, event, functionName);
    } else {
        return maskKeyPress(event, reValidChars);
    }
}

	// This function is used to check if the CVV count is valid for a given CC type 
	// e.g. "AMEX" is 4, "Discover" is 3, "MASTER" is 3 and "VISA" is 3 
	///////////////////////////////////////////////////////////////////////////////
	function isValidCVVCode(ccType, cvvCount) {
		if ((ccType == "AMEX" && cvvCount == 4) || ((ccType == "Discover" || ccType == "Master Card" || ccType == "VISA") && (cvvCount == 3)) ) {
			return true;
		} else {
			return false;
		}
	}
	
	function getCookie(c_name)
	{
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=");
		  if (c_start!=-1)
		    {
		    c_start=c_start + c_name.length+1;
		    c_end=document.cookie.indexOf(";",c_start);
		    if (c_end==-1) c_end=document.cookie.length;
		    return unescape(document.cookie.substring(c_start,c_end));
		    }
		  }
		return "";
	}			
	
	var isintluser=getCookie('isIntl_cookie').toUpperCase();
	var is_intluser=false;	
	if (isintluser!=null && isintluser!="" && isintluser == "TRUE") {
		is_intluser=true;
	}

	
	var guest_user = false;
	var loggedin_user = false;
	var dc_user = false;
	function checkWCXCookie()
	{
		wcxAuthState=getCookie('WCX_AUTHSTATE');
		if (wcxAuthState!=null && wcxAuthState!="")
		{					
			return wcxAuthState;
		} else {
			directConnect=getCookie('directConnect');
			isValidStore=getCookie('isValidStore');
			if ((directConnect!=null && directConnect!="") && (isValidStore!=null && isValidStore!=""))
			{
				return 2;
			} else {
				return 0;
			}
		}
	}
	var chkWCXcookie = checkWCXCookie();
	if(chkWCXcookie == 0) {
		guest_user = true;
		loggedin_user = false;
		dc_user = false;
	}
	if(chkWCXcookie == 1) {
		loggedin_user = true;
		guest_user = false;
		dc_user = false;
	}
	if(chkWCXcookie == 2) {
		dc_user = true;
		loggedin_user = false;
		guest_user = false;
	}

/* from common.js*/
/*$().ready(function(){
	
	//displays and hides flyouts from catalog landing pages
	//on rollover of category titles
    $(".spot_link").each(function(){
        var idArray = $(this).attr('id').split('_');
        var n = idArray[1];
        var targetId = 'spot_' + n + '_flyout';
        $(this).hover(function(){
			
            $('#' + targetId).css('display', 'block');
        }, function(){
            $('#' + targetId).css('display', 'none');
        })
    });
});*/
/*from buyOutfit.js*/
$().ready(function(){
    $('.listing').children('select').each(function(){
        $(this).change(function(){
            var parent = $(this).parent();
            var sibling = parent.children(':checkbox');
            sibling.attr('checked', 'checked');
        });
        
    });
});

function cleardropDownErrors(obj){
	if(!obj.get(0).checked){ $(':select', obj.parent()).blur().data('seenFocus', false); }
}

/* image preloader */
function preloadImages(images) {
    if (document.images) {
        var i = 0;
        var imageArray = new Array();
        imageArray = images.split(',');
        var imageObj = new Image();
        for(i=0; i<=imageArray.length-1; i++) {
            imageObj.src=imageArray[i];
        }
    }
}

function clearText(obj, defaultValue)
{
	if(obj.value == defaultValue)
		obj.value = '';
}

var prohibited_char_pattern = new Array("<","&lt;","&amp;lt;","%3C","<%","&lt;%","&amp;lt;%","<SCRIPT","&lt;SCRIPT","&amp;lt;SCRIPT","<IMG","&lt;IMG","&amp;lt;IMG","alert","javascript","background-image");
function hasInvalidEntryChar(value)
{
	for(var i=0; i<prohibited_char_pattern.length; i++)
	{
		var regex = new RegExp(prohibited_char_pattern[i]);
		if(regex.test(value))
			return true;
	}
	return false
}

// SC tracking pixel adding js code
function addAddToCartSCTracking(){
	SC_Sku.addToCart(sc_add_item_ProductId,"1012~"+sc_add_item_ProductId+"~131~"+sc_add_item_ProdName+"~1113~"+sc_add_item_CategoryId+"~1112~"+sc_add_item_CategoryName,sc_add_item_qty,parseFloat(sc_add_item_Price.replace(/[^0-9/.]+/g,'')));
}

//Google Dymanic remarketing pixel tracking on add to cart event
function trackAddToCart() {
	   var img = document.createElement("img");
	   img.src = "//googleads.g.doubleclick.net/pagead/viewthroughconversion/1060418747/?value=0&label=TlQ-CMGwxgIQu-nS-QM&guid=ON&script=0&data=prodid%3D" + pr_page_id + "%3Bpagetype%3Dcart";
	}