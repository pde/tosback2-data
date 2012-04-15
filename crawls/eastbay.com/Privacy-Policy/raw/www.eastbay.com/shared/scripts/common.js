function gotoFunction() {
	self.location = document.dropdown_form.dropdown_list.options[document.dropdown_form.dropdown_list.selectedIndex].value;
}
function reset() {
	document.dropdown_form.reset()
}

function URLEncode(clearString) {
	var output = '';
	var x = 0;
	clearString = clearString.toString();
	var regex = /(^[a-zA-Z0-9_.]*)/;
	while (x < clearString.length) {
		var match = regex.exec(clearString.substr(x));
		if (match != null && match.length > 1 && match[1] != '') {
			output += match[1];
			x += match[1].length;
		} else {
			if (clearString[x] == ' ')
				output += '+';
			else {
				var charCode = clearString.charCodeAt(x);
				var hexVal = charCode.toString(16);
				output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
			}
			x++;
		}
	}
	return output;
}

function keywordSubmit() {
	var search_form = null;
	
	var search_term = "";
	if ($("#reduce_input_text_height").length) {
		search_term = $("#reduce_input_text_height").val().trim();
		search_form = $("#reduce_input_text_height").parent("form").get(0);
	} else if ($("#key_word_search").length) {
		search_term = $("#key_word_search").val().trim();
		search_form = $("#key_word_search").parent("form").get(0);
	}
	
	var keyword = "";
	if (document.keywordSearch.keyword)
		keyword = document.keywordSearch.keyword.value;
	
	if (search_form != null &&
		keyword != 'Enter Keyword' &&
		search_term != "Enter Keyword/Product #" &&
		search_term != "Enter Item # or Keyword" && 
		search_term != "KEYWORD / PRODUCT #" &&
		search_term != "KEYWORD/PRODUCT#" &&
		search_term != "Enter Keyword/Product#" &&
		search_term != "Keyword / Product #" &&
		search_term != "keyword / product #") {
		search_form.submit();
	}
}
	
function keywordURLIISubmit(URLIIEnabled) {
	if (document.keywordSearch.keyword.value != 'Enter Keyword') {
		if (URLIIEnabled.toLowerCase() == 'true')	
			{ document.keywordSearch.keyword.value = URLEncode(document.keywordSearch.keyword.value); }
		document.keywordSearch.submit();
		}
}
function prodNumSubmit() {
	if (document.prodNumberSearch.txtItemSku.value != 'Enter Product #') {
	document.prodNumberSearch.submit();
	}
}
function teamSubmit() {
	if (document.teamSearch.tree_id.value != '') {
	document.teamSearch.submit();
	}
}

window.onloadListeners=new Array();
window.addOnLoadListener=function(listener){
	window.onloadListeners[window.onloadListeners.length]=listener;
}
window.onload=function(){
	for(var i=0;i<window.onloadListeners.length;i++){
		var func=window.onloadListeners[i];
		if(func) func.call();
	}
}
function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}
function addclass(obj, className)
{
	if(!obj.className) return;
	if (! containsclass(obj, className))
		obj.className += " " + className;
		
	debugMsg("added class " + obj.className);
}

function removeclass(obj, className)
{
	if(!obj.className) return;
	var clzs = obj.className.split(" ");
	var nc = "";
	for (var i = 0; i < clzs.length; i++)
	{
		if (className != clzs[i])
		{
			if (nc.length > 0) nc += " ";
			nc += clzs[i];
		}
	}
	obj.className = nc;
}
function containsclass(obj, className)
{
	if(!obj.className) return false;
	var clzs = obj.className.split(" ");
	for (var i = 0; i < clzs.length; i++)
	{
		if (className == clzs[i])
			return true;
	}		
	return false;
}

function openBMLWindow(url,height) {
        var iwidth=500, iheight=height;
        popUpWin =window.open(url,'NewWindow','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width='+(iwidth+15)+',height='+(iheight+40));
}

function viewCartBannerLink() {
	registerConversionEvent("Shopping Cart","View Shopping Cart")
	cmCreateConversionEventTag("View Shopping Cart", 1, 'Shopping Cart', 0);
	return true;
}
$(document).ready(
	function() {
		$(".ViewCartBannerLink").click(viewCartBannerLink);
	}
);

/*****************************************************
	shipping/billing address functions
*****************************************************/

function isUSCountry(country) {
	return (country == "US" || isUSTerritory(country));
}

function isUSTerritory(country) {
 	var USTerrAbbr = "AS,GU,MP,PR,PW,VI,FM";
	return (USTerrAbbr.indexOf(country) >= 0);
}
function isUSContigState(state) {
 	var USStates = "AL,AR,AZ,CA,CO,CT,DE,FL,GA,IA,ID,IL,IN,KS,KY,LA,MA,MD,ME,MI,MN,MO,MS,MT,NC,ND,NE,NH,NJ,NM,NV,NY,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VA,VT,WA,WI,WV,WY";
	return (USStates.indexOf(state) >= 0);
}
function indexForDropdownValue(obj, value) {
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].value == value) return i;
	}
	return null;
}


function checkContigState(country,state, doCheck){
	if (doCheck == 1)
	{
		if (country.value != 'US')
			{ document.getElementById("LoyaltyShipMessage").style.display		= ""; }
		else if (country.value == 'US' && state.value == '')	
			{ document.getElementById("LoyaltyShipMessage").style.display		= "none"; }
		else if (country.value == 'US' && isUSContigState(state.value))	
			{ document.getElementById("LoyaltyShipMessage").style.display		= "none"; }
		else 
			{ document.getElementById("LoyaltyShipMessage").style.display		= "";}	
	}
}
		
function syncCountryStateValues(country, state, blnCountryChanged) {
	var intSelectedIndexValue = 0;
	var intChangedObjectValue = 0;
	
	if (blnCountryChanged) {
		intChangedObjectValue = country.value;
		intSelectedIndexValue = indexForDropdownValue(state, intChangedObjectValue);
	} else {
		if (state.value != "") {
		intChangedObjectValue = state.value;
		intSelectedIndexValue = indexForDropdownValue(country, intChangedObjectValue);
		}
	}
	
	if (isUSTerritory(intChangedObjectValue)) {
		if (blnCountryChanged)
			state.selectedIndex = intSelectedIndexValue;
		else
			country.selectedIndex = intSelectedIndexValue;
			
	} else {
		if (blnCountryChanged)
			state.selectedIndex = 0;
		else
			country.selectedIndex = indexForDropdownValue(country, 'US');
	}
}

function syncInternationalStates() {
	try {
		document.getElementById("usCountryState").style.display		= "none";
		document.getElementById("caCountryState").style.display		= "none";		
		document.getElementById("otherCountryState").style.display	= "none";	
		
		var country = document.getElementById("countrySelect").value;
		if (country == "CA") {
			document.getElementById("caCountryState").style.display = "";
		}
		else if (isUSCountry(country)) {
			document.getElementById("usCountryState").style.display = "";
		}
		else {
			document.getElementById("otherCountryState").style.display = "";
		}
	}
	catch (e) {
		document.getElementById("usCountryState").style.display = "";
	}
}

function syncStateAndZipOnSubmitAction() {
	try {
		var country = document.getElementById("countrySelect").value;
		
		// canada
		if (country == "CA") {
			if (document.getElementById("caCountryState").style.display == "none") {
				syncInternationalStates();
				return false;
			}
			document.getElementById("zip_int").value = document.getElementById("zip_int_canada").value;
			document.getElementById("state_int").value = document.getElementById("state_int_canada").value;
			document.getElementById("zip_dom").value = "";
			document.getElementById("state_dom").selectedIndex = 0;
		}
		// us & us territories
		else if (isUSCountry(country)) {
			if (document.getElementById("usCountryState").style.display == "none") {
				syncInternationalStates();
				return false;
			}
			document.getElementById("zip_int").value = "";
			document.getElementById("state_int").value = "";
		}
		// all other countries
		else {
			if (document.getElementById("otherCountryState").style.display == "none") {
				syncInternationalStates();
				return false;
			}
			document.getElementById("zip_int").value = document.getElementById("zip_int_non_canada").value;
			document.getElementById("state_int").value = document.getElementById("countrySelect").value;
			document.getElementById("zip_dom").value = "";	
			document.getElementById("state_dom").selectedIndex = 0;
		}
	}
	catch (e) {}
	return true;
}

function getFocusSearchURL(fobj, fieldDelim, valDelim)
{
   var str = "";
   var valueArr = null;
   var val = "";
   var cmd = "";
   
   if (!fieldDelim) 
   	fieldDelim = "&";

   if (!valDelim) 
   	valDelim = "=";
     
   for(var i = 0;i < fobj.elements.length;i++)
   {
       switch(fobj.elements[i].type)
       {
           case "text":
           case "password":
           case "textarea":
           case "hidden":
                str += fobj.elements[i].name + valDelim + escapeFormValue(fobj.elements[i].value) + fieldDelim;
                 break;

           case "radio":
		   case "checkbox":
       			if (fobj.elements[i].checked)
               		str += fobj.elements[i].name + valDelim + escapeFormValue(fobj.elements[i].value) + fieldDelim;
		        break;

           case "select-one":
                str += fobj.elements[i].name + valDelim + escapeFormValue(fobj.elements[i].options[fobj.elements[i].selectedIndex].value) + fieldDelim;
                break;

           case "select-multiple":
           		for (var j = 0; j < fobj.elements[i].options.length; j++)
           			if (fobj.elements[i].options[j].selected)
	               		str += fobj.elements[i].name + valDelim + escapeFormValue(fobj.elements[i].options[j].value) + fieldDelim;
		        break;
       }
   }
   str = str.substr(0,(str.length - 1));
   return str;
}

function escapeFormValue(val){
 	return	escape(val).replace('&', '%26').replace('=', '%3D')
}

// Function to detect enter button hit in the quantity box of productdetail.
// We don't want the form to submit.
function checkEnter(e)
    {
    	var key = window.event ? e.keyCode : e.which;
    	
    	if (key == 13)
        {
           return false;
        }
    }

//Enter-listener
if (document.layers)
  document.captureEvents(Event.KEYDOWN);
  document.onkeydown =
    function (evt) { 
      var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
      if (keyCode == 13)   //13 = the code for pressing ENTER
 
      {
         if (document.form) {
		 document.form.submit();
 	}
      }
    }


function viewBannerEvent(eventID, keep_days){
	var bannerid = readCookie('CHOSEN_BANNER_ID');
	if (bannerid == null)
	{
		createCookie("CHOSEN_BANNER_ID", eventID, keep_days);
		$(document).ready(function() {
			cmCreateConversionEventTag(eventID, 1, 'A/B Global Banner', 0);
		});
	}
	else if (bannerid != eventID)
	{
		eraseCookie("CHOSEN_BANNER");
		eraseCookie("CHOSEN_BANNER_ID");
	}
	
}

/*
 * BEGIN: Email/Mobile Signup functions
 */

$(document).ready(function() {
	$("#email_signup_form").keydown(function(event) {
		if (event.keyCode == 13) {
			var co_cd = $("#co_cd").val();
			openSignupemail('email', co_cd);
		}
	});
	$("#mobile_signup_form").keydown(function(event) {
		if (event.keyCode == 13) {
			var co_cd = $("#co_cd").val();
			openSignupemail('mobile', co_cd);
		}
	});
});


function openEmailSignUp(email, co_cd) {
	var url = "";
	switch (co_cd) {
		case "56":
			url = "http://afl.p0.com/afl_emailclub.jsp";
			break;
		case "20":
			if (email.trim() == "" || email == "Enter Your Email Address") {
				url = "http://champs.p0.com/champs_emailclub1.jsp";
			}
			else {
				url = "http://champs.p0.com/champs_emailclub2.jsp?e=" + email;
			}
			break;
		case "21":
			if (email.trim() == "" || email == "Enter Your Email Address") {
				url = "http://footlocker.p0.com/footlocker_emailclub.jsp";
			}
			else {
				url = "http://footlocker.p0.com/footlocker_emailclub.jsp?e=" + email;
			}
			break;		
		case "23":
			url = "http://ladyfootlocker.p0.com/ladyfootlocker_emailclub.jsp";
			break;	
		case "34":
			if (email.trim() == "" || email == "Enter Your Email Address" ) {
				url = "http://footaction.p0.com/footaction_emailclub1.jsp";
			}
			else {
				url = "http://footaction.p0.com/footaction_emailclub2.jsp?e=" + email;
			}			
			break;	
		case "30":
			url = "http://ryka.p0.com/ryka_emailclub.jsp";
			break;		
		case "36":
			if (email.trim() == "" || email == "Email Address" ) {
				url = "http://sparq.p0.com/sparq_emailclub1.jsp";
			}
			else {
				url = "http://sparq.p0.com/sparq_emailclub2.jsp?e=" + email;
			}
			break;		
		case "35":
			url = "http://espn.p0.com/espnshop_emailclub.jsp";
			break;		
		case "04":
			if (email.trim() == "" || email == "Enter Your Email Address" ) {
				url = "http://finalscore.p0.com/finalscore_emailclub1.jsp";
			}
			else {
				url = "http://finalscore.p0.com/finalscore_emailclub2.jsp?e=" + email;
			}
			break;		
		case "01":
			if (email.trim() == "" || email == "Enter Your Email Address") {
				url = "http://eastbay.p0.com/eastbay_emailclub1.jsp";
			}
			else {
				url = "http://eastbay.p0.com/eastbay_emailclub2.jsp?e=" + email;
			}			
			break;
		case "61":
			if (email.trim() == "" || email == "EMAIL SIGN UP") {
				url = "http://ccs.p0.com/ccs_emailclub.jsp";
			}
			else {
				url = "http://ccs.p0.com/ccs_emailclub2.jsp?e=" + email;
			}			
			break;
	}

	var popupWin = window.open(url,'SignupEmail','height=550,width=640,fullscreen=no,menubar=no,location=no,resizable=yes,scrollbars=yes,titlebar=yes,toolbar=no');
}

/* eastbay email/phone signup functions */

function dofocus(obj){
	if (document.getElementById(obj).value == 'Enter' || document.getElementById(obj).value == 'Mobile' || document.getElementById(obj).value == 'Number')
	{
		document.getElementById(obj).value = '';
	} 
	else
	{	return false; }	
}
function validateMobile(obj,len,next_field){
	if (isNaN(document.getElementById(obj).value) == true)
	{
		document.getElementById(obj).value = ''; 
		alert('The Mobile number should be numeric');
		document.getElementById(obj).focus();
	}
	else if (document.getElementById(obj).value.length == len)
	{
		if (document.getElementById(next_field) != null)
			document.getElementById(next_field).focus();
	}
	else if (document.getElementById(obj).value.length > len)
	{
		document.getElementById(obj).value = ''; 
		alert('This number should be ' + len + ' long');
		document.getElementById(obj).focus();
	}
}

function openSignupemail(type, co_cd) {
	var delim = '?';
    var seperator = '=';
	var apmSand = '&';
	if (type == 'email')
	{ 
		var v = document.getElementById("email").value;
		openEmailSignUp(v, co_cd);
	}
	else if (type == 'mobile')	
	{
		var v = document.getElementById("Mobile_Number_1").value;
		var w = document.getElementById("Mobile_Number_2").value;
		var x = document.getElementById("Mobile_Number_3").value;
		var u = "";
		switch (co_cd) {
			case "01":
				u = 'http://ww2.eastbay.com/2008/ebs112707a/ebs030308a.html' + delim + 'Mobile_Number_1' + seperator + v + apmSand + 'Mobile_Number_2' + seperator + w + apmSand + 'Mobile_Number_3' + seperator + x ;
				break;
			case "20":
				u = 'http://ww2.champssports.com/2008/ch061108a/ch061108a_mobile.html?Mobile_Number_1=' + v + '&Mobile_Number_2=' + w + '&Mobile_Number_3=' + x;
				break;
			case "21":
				if (v.trim() == "" || v == "Enter" || w.trim() =="" || w == "Mobile" || x.trim() == "" || x == "Number") 
				{
					u = 'http://ww2.footlocker.com/2008/fl081408a/fl081408a_mobile.html'
				}
				else {
					u = 'http://ww2.footlocker.com/2008/fl081408a/fl081408a_mobile.html' + delim + 'Mobile_Number_1' + seperator + v + apmSand + 'Mobile_Number_2' + seperator + w + apmSand + 'Mobile_Number_3' + seperator + x ;
				}
				break;
			case "35":
				u = 'http://ww2.espnshop.com/2008/espn010408b/';
				break;
		}
		//alert(u);
		popupWin = window.open(u,'SignupMobile','height=550,width=640,fullscreen=no,menubar=no,location=no,resizable=yes,scrollbars=yes,titlebar=yes,toolbar=no');		
	}
}

/*
function openEBSignupemail(type) {
	var delim = '?';
    var seperator = '=';
	var apmSand = '&';
	if (type == 'email')
	{ 
		var v = document.email_signup_form.email.value;
		openEmailSignUp(v, '01'); // hardcoded eastbay company code
	}
	else if (type == 'mobile')	
	{
		var v = document.email_signup_form.enter.value;
		var w = document.email_signup_form.mobile.value;
		var x = document.email_signup_form.number.value;
		var u = 'http://ww2.eastbay.com/2008/ebs112707a/ebs030308a.html' + delim + 'Mobile_Number_1' + seperator + v + apmSand + 'Mobile_Number_2' + seperator + w + apmSand + 'Mobile_Number_3' + seperator + x ;
		popupWin = window.open(u,'SignupMobile','height=550,width=640,fullscreen=no,menubar=no,location=no,resizable=yes,scrollbars=yes,titlebar=yes,toolbar=no');		
	}
}

function openMobileSignUp() {
	var Mobile_Number_1 = document.getElementById("Mobile_Number_1").value;
	var Mobile_Number_2 = document.getElementById("Mobile_Number_2").value;
	var Mobile_Number_3 = document.getElementById("Mobile_Number_3").value;
	var url = 'http://ww2.champssports.com/2008/ch061108a/ch061108a_mobile.html?Mobile_Number_1=' + Mobile_Number_1 + '&Mobile_Number_2=' + Mobile_Number_2 + '&Mobile_Number_3=' + Mobile_Number_3;
	popupWin = window.open(url,'SignupMobile','height=550,width=640,fullscreen=no,menubar=no,location=no,resizable=yes,scrollbars=yes,titlebar=yes,toolbar=no');		
}
*/

/*
 * END: Email/Mobile Signup functions
 */

function openSponsor(url)
{
	window.open(url, 'Sponsor', 'toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=yes,width=1000,height=1000');
}

function openPopUpWindow(url, width, height) {
	if (!width) width = 640;
	if (!height) height = 430;
	var popupWin = window.open(url,'','height=' + height + ',width=' + width + ',fullscreen=no,menubar=no,location=no,resizable=yes,scrollbars=yes,titlebar=yes,toolbar=no');
}

function openCanadaWindow(url) {
	popupWin = window.open (url, 'canada', 'height=430, width=740, fullscreen=no, menubar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes, toolbar=no');
}
function openCountryWin (url) {
	popupWin = window.open(url, 'fullwindow','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=300,height=175');
}
function openInternationalWindow(url) {
	popupWin = window.open (url, 'International', 'height=430, width=740, fullscreen=no, menubar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes, toolbar=no');
}
function openGiftWrapWindow(url) {
	popupWin = window.open(url,'giftwrap','height=530,width=790,fullscreen=no,menubar=no,location=no,resizable=yes,scrollbars=yes,titlebar=yes,toolbar=no');
}
function openCVVWindow(url) {
	popupWin = window.open(url,'CVV','height=600,width=550,fullscreen=no,menubar=no,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no');
}

/* utility functions */
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.
{
   var arVersion = navigator.appVersion.split("MSIE")
   var version = parseFloat(arVersion[1])
   if ((version >= 5.5) && (document.body.filters)) 
   {
      for(var i=0; i<document.images.length; i++)
      {
         var img = document.images[i]
         var imgName = img.src.toUpperCase()
         if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
         {
			// ignore png images inside the store locator
			var parentEls = $(img).parents("#locator");
			if (parentEls.length == 0) {
				var imgID = (img.id) ? "id='" + img.id + "' " : ""
				var imgClass = (img.className) ? "class='" + img.className + "' " : ""
				var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
				var imgStyle = "display:inline-block;" + img.style.cssText 
				if (img.align == "left") imgStyle = "float:left;" + imgStyle
				if (img.align == "right") imgStyle = "float:right;" + imgStyle
				if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
				var strNewHTML = "<span " + imgID + imgClass + imgTitle
				+ " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
				+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
				+ "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>" 
				img.outerHTML = strNewHTML
				i = i-1
			}
         }
      }
   }    
}

function getViewpointTop() {
	return window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
}
function getViewpointHeight() {
	return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
}
function getViewpointLeft() {
	return window.pageXOffset || document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft;
}

function initMenu(showfirst) {
	var title;
	var imgid;
     //$("#menu ul").hide();
	if (showfirst == undefined || showfirst) {
		$("#menu ul:first").show();
		title = $("#menu li a").attr("title")
		imgid = "#" + title;
		$(imgid).attr({ 
					src: down_pic,
					title: "open_arrow" 
					});
	}
	$("#menu li a").click(function() {
		$(this).next().toggle();
		title = $(this).attr("title");
		if ($.trim(title) != "") {
			imgid = "#" + title;
			if ($(imgid).attr("title") == "open_arrow") {
				$(imgid).attr({ 
							src: right_pic,
							title: "close_arrow"
							});
			}
			else {
				$(imgid).attr({ 
							src: down_pic,
							title: "open_arrow"
							});
			}
		}
     });  
}

function continueShoppingLink(){
	var theLink = readCookie('CONTSHOPBTN');
	location.href = theLink;
}
// The following snippet of code get the windows width for open popup windows (VIP Privacy Policy and TOU).
$(document).ready(function() {
	docWidth = $(window).width();
	if (!docWidth)
		docWidth = $(document).width();
	if (!docWidth)
		docWidth = 1000;
});

/*
See the session manager before modifying this function
*/
function registerConversionEvent(categoryID,eventID) {
	var cmConversionCookie = readCookie("CM_EVENT");
	//alert("Raw Cookie:" + cmConversionCookie);
	if(cmConversionCookie == null) {
		cmConversionTags = new Array();
	} else {
		cmConversionTags = eval('(' + unescape(cmConversionCookie) + ')');
	}
	//alert("reg: START" + cmConversionTags.toString() );
	found = false;
	if(cmConversionTags instanceof Array) {
		for(i=0;i<cmConversionTags.length;i++) {
			if(cmConversionTags[i] == categoryID + "~" + eventID) {
				found = true;
				break;
			}
		}
		if(!found) {
			cmConversionTags.push(categoryID + "~" + eventID);
		}
		for(i=0;i<cmConversionTags.length;i++) {
			cmConversionTags[i]=  "\"" + cmConversionTags[i] + "\"";
		}
		createCookie("CM_EVENT",escape("[" + cmConversionTags.toString() + "]"));
	}
	//alert("reg: END" + cmConversionTags.toString() );
}
/*
See the session manager before modifying this function
*/
function completeConversionEvent(categoryID,eventID,deleteEvent) {
	var cmConversionCookie = readCookie("CM_EVENT");
	if(typeof(deleteEvent) == "undefined") {
		deleteEvent = true;
	}
	//alert("CompleteEvent: START" + cmConversionTags.toString() );
	if(cmConversionCookie == null) {
		cmConversionTags = new Array();
	} else {
		cmConversionTags = eval('(' + unescape(cmConversionCookie) + ')');
	}
	found = false;
	finishArray = new Array();
	if(cmConversionTags instanceof Array) {
		for(i=0;i<cmConversionTags.length;i++) {
			if(cmConversionTags[i] == (categoryID + "~" + eventID)) {
				found = true;
				if(!deleteEvent) {
					finishArray.push("\"" + cmConversionTags[i] + "\"");
				}
			} else {
				finishArray.push("\"" + cmConversionTags[i] + "\"");
			}
		}
		//alert("CompleteEvent: END" + finishArray.toString() );
		createCookie("CM_EVENT",escape("[" + finishArray.toString() + "]"));
	}
	
	return found;
}

// coremetrics
function runCMConversionEventTag (data) {
	cmCreateConversionEventTag(data.conversionEvent, 1, data.conversionCategory, 0);
	registerConversionEvent(data.conversionCategory, data.conversionEvent);
}

/***
	Method:  add2cartJS()
	Input Attributes:  
	.	data . a JSON object representing the request details
		o	sku . the Product SKU to be added to cart
		o	size . the Product Size to be added to cart
		o	qty . the requested Quantity to be added to cart
		o	cm . (optional) the CoreMetrics Shop5 action tag . will default to .JSATC. 
		o	cm_pageId . (required) the CoreMetrics Page ID for Add To Cart Page View
		o	cm_categoryId . (required) the CoreMetrics Category ID for Add To Cart Page View 
	.	callback . the callback function will receive two arguments:  data . a JSON object defining the Add to Cart response; status . the status of the AJAX call
 ***/
function add2cartJS(data, callback) {
	try {
		if (!data.cm)
    			data.cm = 'JSATC';

		if (data.cm_pageId && data.cm_categoryId)
			cmCreatePageviewTag(data.cm_pageId, data.cm_categoryId);

		$.post(
			"/catalog/addToCartJSON.cfm"
		, 	data
		,	callback
		,	"json"
		);
	}
	catch (ex) {
		return ex;
	}

	return null;
}

/***
  This JavaScript Class provides methods:
      init(url) - initializes the client sessions by making an AJAX call to the server which is expected to return a JSON object that exposes relevant session properties
      initWith(callback) - pushes a callback method to be executed after the session is initialized
      onInit(data) - callback method after the AJAX call has been successfully completd
***/
function ClientSessionManager() {

        var callbacks = [];
        var session = {};

        this.init = function(sessionUrl) {
                $.getJSON(sessionUrl, {}, this.onInit);
        }

        this.onInit = function(data) {
        	session = data;
                for (var i=0,j=callbacks.length; i<j; i++) {
                        try {
                                callbacks[i](session);
                        }
                        catch(e) {
                                // alert(e);
                        }
                }
        };

        this.initWith = function(callback) {
                callbacks[callbacks.length] = callback;
        };
        
        this.getCustomerGreeting = function() {
        	return session.profile.greeting;
        }

        this.getCartSummary = function() {
        	var cart_summary = {};
        	cart_summary.item_count = session.cart.item_count;
        	cart_summary.sub_total = session.cart.sub_total;
        	return cart_summary;
        }
}
