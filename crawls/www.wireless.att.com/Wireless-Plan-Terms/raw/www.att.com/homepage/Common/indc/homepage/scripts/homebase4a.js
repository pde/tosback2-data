var doc = document, ua = navigator, loginShadow, offset, originalText;	

/* expire unused cookies for login.jsp PROD12-878 and PROD12-934 */
function expireCookies() {	
 // setCookie(name,value,expires,path,domain,secure )
	setCookie("DL3K","","-1","/",".www.att.com","");
	setCookie("DL3K","","-1","/",".www.wireless.att.com","");
	setCookie("DTAB","","-1","/",".att.com","");
	//setCookie("fsr.s","","-1","/",".att.com",""); - requested removal PROD12-1283
	setCookie("stickySite","","-1","/",".att.com","");
	setCookie("svariants","","-1","/",".att.com","");
}

/* Caps lock detection */
function capsLock(e) {
   var s = String.fromCharCode( e.which ), caps = jQuery('.capsLock');
   if ( s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey ) {
   	caps.show();
   }else {
   	caps.hide();
   }
}

function isValidEmail(emailAddress) {
	return (/^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(emailAddress));
}

// This function replaces removeSpaces(string) and removeHyphens(string) for #numWireless input
// For Wireless Number, return only digits.
function cleanString(str) {
	return str.replace(/[^\d]/g, "");
}

function removeSpaces(string) {
    return string.split(' ').join('');
}

function removeHyphens(string) {
    var str = string.split('-').join('');
    if (str != "" && str.length>0) {            
        if(isNaN(str)){                
            return string;
        }else{
            return str;
        }
    } else {
        return "";
    }
}

function setCookie( name, value, expires, path, domain, secure ){
    if ( expires ){
        expires = expires * 1000 * 60 * 60 * 24;
    }

	var today = new Date(), expires_date = new Date( today.getTime() + (expires) ), cookie;
    
	cookie = name + "=" + escape(( value )) +
    ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
    ( ( path ) ? ";path=" + path : "" ) + 
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
	document.cookie = cookie;
}

function getCookie(name) {
    var dc = document.cookie, cname = name + "=", clen = dc.length, cbegin = 0, vbegin, vend;
    while (cbegin < clen) {
		vbegin = cbegin + cname.length;
		if (dc.substring(cbegin, vbegin) == cname) {
			vend = dc.indexOf (";", vbegin);
			if (vend == -1) vend = clen;
				return unescape(dc.substring(vbegin, vend));
		}
		cbegin = dc.indexOf(" ", cbegin) + 1;
		if (cbegin== 0) break;
	}
	return null;
}

function submitOnEnter(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
    	jQuery(this).parents('form:first').submit();

    }
}
 
// onSubmit validation for login form
// ----------------
function doSubmit() {
	var wrapFirst = jQuery("#divWireless span.textInput-wrapper:first"), spanFirst = jQuery("#divWireless span.textInput-wrapper span:first"), 
	msgFirst = jQuery("#divWireless .formErrorMessage:first"), noteFirst = jQuery("#divWireless .userInputNote:first"), 
	wrapLast = jQuery("#divWireless span.textInput-wrapper:last"), spanLast = jQuery("#divWireless span.textInput-wrapper span:last"), 
	msgLast = jQuery("#divWireless .formErrorMessage:last p"), errorMsg = jQuery("#divWireless .formErrorMessage:last"), isWTN, isEmail, isValid,
	userInput = jQuery("#numWireless"), passInput = jQuery("#passWireless"),digitCheck = userInput.val().match(/[0-9]/g);

	if ( userInput.val() == "" ){
		jQuery(".userInputNote").hide();
		jQuery("#unError").show();
		loginShadow.show();
		return false;
	}else if(passInput.val() == ""){
		jQuery(".passInputNote").hide();
		jQuery("#passError").show();
		loginShadow.show();
		return false;
	}else if(/@/.test(userInput.val())) {
		isEmail = true;
	}else if (digitCheck != null && digitCheck.length == 10) {
		isWTN = true;
		userInput.val(cleanString(userInput.val()));
	}else if (/^[a-zA-Z0-9@\.\-_]{1,}$/.test(userInput.val())){
		isValid = true;
	} else {
		isValid = false;
	}

	if (isWTN == true && userInput.val().length != 10) { // test for valid WTN
		jQuery("#numWireless").focus();
		wrapFirst.addClass("error");
		spanFirst.addClass("error");
		msgFirst.show();
		noteFirst.hide();

		loginShadow.show();
		return false;
	} else if (isEmail == true && !(isValidEmail(userInput.val()))) { //test for email address
		jQuery("#numWireless").focus();
		wrapFirst.addClass("error");
		spanFirst.addClass("error");
		msgFirst.show();
		noteFirst.hide();

		loginShadow.show();
		return false;
	} else if (isValid == false){
		jQuery("#numWireless").focus();
		wrapFirst.addClass("error");
		spanFirst.addClass("error");
		msgFirst.show();
		noteFirst.hide();

		loginShadow.show();
		return false;
	} else if (passInput.val() == '' || passInput.val().length < 4) {
		// check whether password is less than 4 characters
		jQuery("#passWireless").focus();
		wrapLast.addClass("error");
		spanLast.addClass("error");
		msgLast.text("Password must be a minimum of 4 characters.");
		errorMsg.show();

		loginShadow.show();
		return false;
	} else {
		remMe();
		//click tracking tag
		dcsMultiTrack('DCS.dcsuri','/commonLogin/','DCS.dcssip','cprodmasx.att.com','DCS.dcsref',location.href,'DCSext.wtLinkName','Login from homepage','DCSext.wtLinkLoc','Link Farm','DCSext.wtNoHit','1','WT.svl','','DCSext.pid','');
		document.Wireless.submit();
	}	
}

function setFields(){
	var colamCookie = cookieStringToMap(getCookie("colam_ctn"));
	if ( colamCookie["rme"] == "Y" ){
		jQuery("#numWireless").val(colamCookie["uid"]);
		jQuery("#rem").attr('checked','checked')
	}
}

function cookieStringToMap(keyValueString){
	if(!keyValueString){return {}}
	var kvAray = keyValueString.split(";"); 
	var kvMap = {};  
	while(kvAray.length > 0){ 
		var kvPair = kvAray.shift().split("="); 
		if(!!kvPair[0]){kvMap[kvPair[0]] = kvPair.length - 1 ? kvPair[1] : ""} 
	}
	return kvMap;
}

function mapToCookieString(keyValueMap){
	if(!keyValueMap){return ""}
	var kvAray = [];
	for(key in keyValueMap){kvAray.push(key + "=" + keyValueMap[key])} 
	return kvAray.join(";");   
}

function remMe() {
	var colamCookie = cookieStringToMap(getCookie("colam_ctn")), uid = jQuery("#numWireless").val();
	colamCookie["uid"] = uid;
	colamCookie["rme"] = (jQuery('#rem').is(':checked') == true) ? "Y" : "N";
	setCookie("colam_ctn",mapToCookieString(colamCookie),"365","/",".att.com");
}
function uidBlur(error,numChars,uid,uidError,loginShadow) {
	if (error) {
		jQuery("#fsID").children("span.textInput-wrapper").addClass("error");
		jQuery("#fsID").find("span.textInput-wrapper span").addClass("error");
		uidError.show();
	} else {
		jQuery("#fsID").children("span.textInput-wrapper").removeClass("error");
		jQuery("#fsID").find("span.textInput-wrapper span").removeClass("error");
		uidError.hide();
		if (!numChars) uid.val(originalText);
	}
	loginShadow.show();
}
function uidFocus(uid,uidError,bubble) {
	if (uid.val() == "User ID" || uid.val() == "Identificacion de usuario") { originalText = uid.val(); uid.val(""); }
	if (uidError.is(":visible")) {
		bubble.addClass("unError");	
	} else {
		bubble.removeClass("unError");
	}
	bubble.show();
}
function pwdBlur(error,numChars,pwd,pwdWrapper,pwdNoteWrapper,pwdError,loginShadow) {
	if (error) {
		pwdWrapper.children("span.textInput-wrapper").addClass("error");
		pwdWrapper.find("span.textInput-wrapper span").addClass("error");
		jQuery("#passError p").text("Password must be a minimum of 4 characters.");
		pwdError.show();
	} else {
		pwdWrapper.children("span.textInput-wrapper").removeClass("error");
		pwdWrapper.find("span.textInput-wrapper span").removeClass("error");
		pwdError.hide();
		if (!numChars) { pwdWrapper.hide();pwdNoteWrapper.show(); }
	}
	pwdNoteWrapper.children("span.textInput-wrapper").removeClass("focus");
	pwdNoteWrapper.find("span.textInput-wrapper span").removeClass("focus");
	loginShadow.show();
}
function pwdFocus(pwd,pwdWrapper,pwdNoteWrapper) {
	pwdNoteWrapper.hide();
	pwdWrapper.show();
	pwd.focus();
}

jQuery(document).ready(function() { 
 	offset = {	msie: {zIndex: "-1", top:-27,left:0,height:2,width:2}, modern: {zIndex: "0", top:-20,left:0,height:0,width:-2} };
 	var uid = jQuery("#numWireless"),
 		pwd = jQuery("#passWireless"),
 		pwdWrapper = jQuery("#passInputWrapper"),
 		pwdNote = jQuery("#passInputNote"),
 		pwdNoteWrapper = jQuery("#passInputNoteWrapper"),
 		uidError = jQuery("#unError"),
 		pwdError = jQuery("#passError"),
 		bubble = jQuery("#bubble"),
 		submit = jQuery('#Wireless');

 	var loginSectionDiv = document.getElementById("loginSection");
	loginShadow = new GlobalNav.shadow(loginSectionDiv, "shadowClass", offset, loginSectionDiv.parentNode);
	setTimeout("loginShadow.show()", 2000);
	
	jQuery.fn.uniformCallBack = function(){ 
		setTimeout("loginShadow.show()", 2000);
	}
	
	setFields();

	jQuery('.servicesPopupMenuWrapper').each(function(index) {		
		currentMenu = document.getElementById('menu' + index);
		currentMenuShadow = new GlobalNav.shadow(currentMenu, "shadowClassBB", offset, currentMenu.parentNode);
		currentMenuShadow.show();			
	});

    if((ua.userAgent.match(/iPhone/i)) || (ua.userAgent.match(/iPod/i))){
        document.title = "AT&T";
    }

	/**
	 * user id input box event handing
	 */
	uid.blur(function() {
		var numChars, inError = uidError.is(":visible") ? 0 : 1, clean;

		clean = uid.val().replace(/#/g, "");
		uid.val(clean);
		numChars = uid.val().length;

		bubble.hide();
		// show userInputNote if field not in error
		if (inError) {
			if (numChars < 4 && numChars != 0) { uidBlur(1,numChars,uid,uidError,loginShadow); }
			else if (numChars >= 4) { uidBlur(0,numChars,uid,uidError,loginShadow); }
			else if (numChars == 0) { uidBlur(0,numChars,uid,uidError,loginShadow); }
		} else {
			if (numChars < 4 && numChars != 0) { uidBlur(1,numChars,uid,uidError,loginShadow); }
			else if (numChars >= 4) { uidBlur(0,numChars,uid,uidError,loginShadow); }
			else if (numChars == 0) { uidBlur(0,numChars,uid,uidError,loginShadow); }
		}
	});
	uid.focus(function() { uidFocus(uid,uidError,bubble); });
	uid.hover(function() {
			if (uidError.is(":visible")){
				bubble.addClass("unError");	
			}else {
				bubble.removeClass("unError");
			}
			bubble.show();
		}, function(){
			if (uid.val() == "User ID") {
				bubble.hide();
			}
		}
	);

	/**
	 * password input box event handing
	 */
	pwd.blur(function() {
		var numChars = pwd.val().length, inError = pwdError.is(":visible") ? 0 : 1;
		if (inError) {
			if (numChars < 4 && numChars != 0) { pwdBlur(1,numChars,pwd,pwdWrapper,pwdNoteWrapper,pwdError,loginShadow); }
			else if (numChars >= 4) { pwdBlur(0,numChars,pwd,pwdWrapper,pwdNoteWrapper,pwdError,loginShadow); }
			else if (numChars == 0) { pwdBlur(0,numChars,pwd,pwdWrapper,pwdNoteWrapper,pwdError,loginShadow); }
		} else {
			if (numChars < 4 && numChars != 0) { pwdBlur(1,numChars,pwd,pwdWrapper,pwdNoteWrapper,pwdError,loginShadow); }
			else if (numChars >= 4) { pwdBlur(0,numChars,pwd,pwdWrapper,pwdNoteWrapper,pwdError,loginShadow); }
			else if (numChars == 0) { pwdBlur(0,numChars,pwd,pwdWrapper,pwdNoteWrapper,pwdError,loginShadow); }
		}
	});
	pwdNote.focus(function() { pwdFocus(pwd,pwdWrapper,pwdNoteWrapper); });
	
	if( jQuery('.capsLock') != 0 ) {
        jQuery('.capsLock').hide();
        jQuery('#passWireless, #numWireless').keypress(function(e){capsLock(e); submitOnEnter(e);});
    }
	
	document.Wireless.action = "https://www.att.com/olam/loginAction.olamexecute";
	
	jQuery('.btnGo').click(doSubmit);
	submit.submit(doSubmit);
}); // END jQuery(document).ready