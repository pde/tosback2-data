/*
Script: commons.js
version: v1.0.9
*/
var timeoutCheck = 0;
var startVideoPlayer = false;		// Flag to indicate if video player should be activated on page load

PROFANITY_SERVICE_URL = "/webapp/wcs/stores/servlet/BackendProxy?";

function urlEncodeCharacter(c){
	return '%' + c.charCodeAt(0).toString(16).toUpperCase();
}

function urlDecodeCharacter(str, c){
	return String.fromCharCode(parseInt(c, 16));
}
/*encodes / decodes all URL special characters.
  We use encodeURIComponent() over escape() because: encodeURIComponent encodes all UTF-8 characters while escape encodes ISO Latin characters.
  The need for extra character encoding is because encodeURIComponent() does not encode chars such as: ! . ~ * ' ( )
*/
function urlEncode( s ){
	return encodeURIComponent( s ).replace( /\%20/g, '+' ).replace( /\s/g, '+' ).replace( /[\.!'()*~]/g, urlEncodeCharacter );
}

function urlDecode( s ){
	return decodeURIComponent(s.replace( /\+/g, '%20' )).replace( /\%([0-9a-f]{2})/g, urlDecodeCharacter);
}

/* Displays TDD phone number when "click here" link in the footer is clicked */
function showTDD(){
	document.getElementById('tdd').innerHTML='1-800-544-3316';
	document.getElementById('tdd').style.textDecoration = 'none';

}

function open_window(url, specs, name){
	if (name == null || name == "")
	{
		name = "win";
	}
      var new_win = window.open(url, name, specs);
	new_win.focus();
}

function getCopyright() {
	//set date variable
	currentDate = new Date();
	//Y2K fix for some browsers - using getFullYear instead of getYear
	theYear = currentDate.getFullYear();

	var theText = new String("");

	theText = theText + '<table width="95%" align="center">';
	theText = theText + ' <tr>';
	theText = theText + ' <td align="center">';
	theText = theText + ' <font size="-1">';
	theText = theText + ' &copy; 1995 -&nbsp;' + theYear + '&nbsp;QVC, Inc. All rights reserved.';
	theText = theText + ' &nbsp;All trademarks, service marks and logos are owned by or registered to QVC, Inc., QDirect Ventures, Inc., ER Marks, Inc. or Diamonique Corporation.';
	theText = theText + ' &nbsp;All other product or brand names are trademarks of their respective owners.</font>';
	theText = theText + ' </td>';
	theText = theText + ' </tr>';
	theText = theText + ' <tr>';
	theText = theText + ' <td width="100%" align="center">';
	theText = theText + ' <font size="-1"> URL: http://www.qvc.com</font>';
	theText = theText + ' </td>';
	theText = theText + ' </tr>';
	theText = theText + '</table>';

	if ($('copyrightDiv')) {
		$('copyrightDiv').set('html', theText);
	}

}

/**
      This function is used to create a cookie when a customer clicked on AddtoWishList button
*/

function createAddtoWistListCookie(partNumber, productClassCode){
      var cmProd= partNumber + "~" + productClassCode;
      Cookie.write('cmAddToWL', cmProd, {path:'/'});
}

function pdfCheck(target) {
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	if(isiPad){return true;}/*Ignore iPad*/
	var isInstalled = false;
	var url = $(target).get('href');
	if (window.ActiveXObject) {
	    var control = null;
	    try {
	        // AcroPDF.PDF is used by version 7 and later
	        control = new ActiveXObject('AcroPDF.PDF');
	       	isInstalled = true;
	    } catch (e) {
	        // Do nothing
	    }
	    if (!control) {
	        try {
	            // PDF.PdfCtrl is used by version 6 and earlier
	            control = new ActiveXObject('PDF.PdfCtrl');
	            isInstalled = true;
	        } catch (e) {

	        }
	    }
	} else {
	    // Check navigator.plugins for "Adobe Acrobat" or "Adobe PDF Plug-in"*
		var str = "";
		for (var i=0; i<navigator.plugins.length; i++) {
			str = navigator.plugins[i].description + ",  ";
			if (/Adobe Acrobat/.test(str) || /Adobe PDF Plug\-In/.test(str)) {
				isInstalled = true;
				break;
			}
		}
	}
	if (!isInstalled) {
		//really only doing this because smoothbox doesn't have a callback structure built into it
		var callback = function() {
			var link = $('pdfFileLink');
			if (link) {
				link.set('href', url);
			}
			else if (timeoutCheck < 10) {
				timeoutCheck++;
				setTimeout(callback, 1000);
			}
		}
		timeoutCheck = 0;
		TB_show('','/wcsstore/US/content/html/popups/popupAdobeNotice.html?height=500&width=400', false);
		setTimeout(callback, 1000);
		return false;
	}
	return true;
}
/**
	This function is used to trim white space from an input string both left and right side
*/
function trimAll(sString) {

	var trimmedStr = '';
	if (sString != null ){
		trimmedStr = sString.replace(/^\s+|\s+$/g, '') ;
	}
	return trimmedStr;
}

/**
	 This function will remove all spaces from a string
*/
function removeSpaces(sString)  {
	return sString.replace(/\s+/g,'');
}


/**
	This function is used to check user input for profianity
*/
function checkProfanity(formName, aCallback, aFailureCallback) {
	try
	{
		var done = false;
		var retVal = true;
		var handleResponse = function(aXMLObj) {
			//Defect: 14612: A null check on the "req.response.xml.documentElement" to return true if the socket is down.
			var doc = req.response.xml.documentElement;
			if (!req.response || !req.response.xml || doc == null) {
				aCallback.call();
				return true;
			}

			if (doc.getElementsByTagName('anyType') != null)
			{
				var badwords = doc.getElementsByTagName('anyType');
				var message = "The following words are considered profane and need to be removed or corrected: ";
				if (badwords.length > 0) {
					for (var i=0; i<badwords.length; i++) {
						message += badwords[i].childNodes[0].nodeValue;
						if (i < badwords.length - 1) {
							message += ", ";
						}
					}
					displayMessage('error', null, message);
					if(typeof aFailureCallback == 'function'){
						aFailureCallback.call();
					}
				}
				else {
					aCallback.call();
				}
			}
		};

		var countryCode = "US";
		var str = "";
		$$('#' + formName + ' input[type=text]').each( function (item, idx) {
			str += item.get('value') + " ";
		});

		if (trimAll(str).length > 0) {
			// the mooTools request object doesn't support a timeout value :(
			 var req = new TimedRequest({
				 url: PROFANITY_SERVICE_URL,
				 method: "get",
				 async: "true",
				 headers: {
			 		'Content-type': 'text/xml'
				 },
				 timeout: 8000,
				 onSuccess: function(res) { return handleResponse(res); },
				 onFailure: function(res) { return handleResponse(res); }
			 });

			req.send("country=" + countryCode + "&transaction=QVCProfanityFilter&method=GET&message=" + str);
		}
		else {
			aCallback.call();
			return true;
		}
	}
	catch(err)
	{
		//Handle errors here
	}
}
/**
	This function is used to validate an input email format: xxxxx@xx.xxx
	1. One and only one "@" is required and can't be at the beginning and the end.
	2. The following characters are considered illegal,               ( ) < > , ; : \ " . [ ]
	3. Space is not allowed in the middle
	4. More than one  "." are allowed (not required) but can't be at the beginning and the end, can't be right before and after "@".
*/
function validateEmailFormat(inputEmailValue){

	if (inputEmailValue == null || trimAll(inputEmailValue) == "" ){
		return false;
	}

	 var emailPat=/^(.+)@(.+)$/;
	 var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
	 var validChars="\[^\\s" + specialChars + "\]";
	 var quotedUser="(\"[^\"]*\")";
	 var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
	 var atom=validChars + '+';
	 var word="(" + atom + "|" + quotedUser + ")";
	 var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
	 var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
	 var matchArray=inputEmailValue.match(emailPat);
	 if (matchArray == null) {
		 return false;
	 }
	 var user=matchArray[1];
	 var domain=matchArray[2];
	 if (user.match(userPat) == null) {
		 return false;
	 }
	 var IPArray = domain.match(ipDomainPat);
	 if (IPArray != null) {
		 for (var i = 1; i <= 4; i++) {
			if (IPArray[i] > 255) {
			   return false;
			}
		 }
		 return true;
	 }
	 var domainArray=domain.match(domainPat);
	 if (domainArray == null) {
		 return false;
	 }
	 var atomPat=new RegExp(atom,"g");
	 var domArr=domain.match(atomPat);
	 var len=domArr.length;
	 if ((domArr[domArr.length-1].length < 2) ||
		 (domArr[domArr.length-1].length > 3)) {
		 return false;
	 }
	 if (len < 2) {
		 return false;
	 }
	 return true;

/*	var retValue = true;
	retValue = (inputEmailValue.indexOf("@") == inputEmailValue.lastIndexOf("@")) && (inputEmailValue.indexOf("@") > 0)
							&& (inputEmailValue.indexOf("@") < inputEmailValue.length - 1) ;
	if (retValue){
		retValue = (inputEmailValue.lastIndexOf(".") > inputEmailValue.indexOf("@")  )
								&& (inputEmailValue.lastIndexOf(".") < inputEmailValue.length - 1
								&& inputEmailValue.charAt(inputEmailValue.indexOf("@") + 1) != '.' ) ;
	}
	if (retValue){
		retValue = !((new RegExp(/(\s)/)).test(trimAll(inputEmailValue)));
	}
	return retValue;
*/
}

/**
	This function is used to validate an input phone number
	1. 10 digits only
	2. (3 digits) 3 digits - 4 digits
	3. 3 digits - 3 digits - 4 digits
	4. 3 digits . 3 digits . 4 digits
	5. 3 digits , 3 digits , 4 digits
	6. First digit can't be 0
	7. all "-" are optional and space is allowed
*/
function validatePhoneNumber(phoneNumber){

	var inputPhoneNumber;

	if (phoneNumber == null){
		return false;
	}else {
		inputPhoneNumber = phoneNumber.replace(/\s+/g, '');
	}

	if ( (new RegExp(/^[1-9]\d{9}$/)).test(inputPhoneNumber) ||
			(new RegExp(/^\([1-9]\d{2}\)\d{3}\-{0,1}\d{4}$/)).test(inputPhoneNumber) ||
			(new RegExp(/^[1-9]\d{2}\-{0,1}\d{3}\-{0,1}\d{4}$/)).test(inputPhoneNumber) ||
			(new RegExp(/^[1-9]\d{2}\.{0,1}\d{3}\.{0,1}\d{4}$/)).test(inputPhoneNumber) ||
			(new RegExp(/^[1-9]\d{2}\,{0,1}\d{3}\,{0,1}\d{4}$/)).test(inputPhoneNumber) ){

		return true;

	}

	return false;

}

/**
	This function is used to validate an Zip/Postal code
	Contains only 5 digits
*/
function validateZipPostalCodeInput(zipPostalCode){

      if (zipPostalCode == null){
            return false;
      }
       /* defect 11151 */
        if(zipPostalCode.length==6)
        {
           var tempZipcode=zipPostalCode.substring(0,3)+ " " +zipPostalCode.substring(3,zipPostalCode.length);
           var reZipPostalCode = new RegExp(/^[a-zA-Z][0-9][a-zA-Z]\s?[0-9][a-zA-Z][0-9]$/);
           zipPostalCode=tempZipcode;

        }else{
            var reZipPostalCode = new RegExp(/^\d{5}$/);
        }
        /* end of defect 11151 */
      return (reZipPostalCode.test(zipPostalCode));
   }

/**
	This function is used to validate an Zip/Postal code
	Contains only 5 digits - 4 digits, such as 12345-6789 or 9 digits
*/
function validateExtendZipPostalCodeInput(zipPostalCode){

	var retVal;

	if (zipPostalCode == null){
		return false;
	}

	var reZipPostalCode = new RegExp(/^\d{5}-\d{4}$/);
	retVal = reZipPostalCode.test(zipPostalCode);

	if (!retVal){
		reZipPostalCode = new RegExp(/^\d{9}$/);
		retVal = reZipPostalCode.test(zipPostalCode);
	}

	return retVal;;

}

/**
	This function is used to validate an canadian Zip/Postal code
	Contains only 6 digits
*/
function validateCanadianZipPostalCodeInput(zipPostalCode){

	if (zipPostalCode == null){
		return false;
	}

	var reZipPostalCode = new RegExp(/^[a-zA-Z][0-9][a-zA-Z]\s?[0-9][a-zA-Z][0-9]$/);
	return (reZipPostalCode.test(zipPostalCode));

}

/**
	This function is used to validate credit card security code
	Contains only 3 digits
*/
function validateCreditCardSecurityCodeInput(creditCardSecurityCode){


	if (creditCardSecurityCode == null){
		return false;
	}

	var reCreditCardSecurityCode = new RegExp(/^\d{3}$/);

	return (reCreditCardSecurityCode.test(creditCardSecurityCode));

}

/**
	This function is used to validate QVC Gift card
	Contains at least 1 digits
*/
function validateQVCGiftCardNoInput(QVCGiftCardNo){


	if (QVCGiftCardNo == null){
		return false;
	}

	var reQVCGiftCardNo = new RegExp(/^\d+$/);

	return (reQVCGiftCardNo.test(QVCGiftCardNo));

}
 
/**
	This function is used to validate QVC Gift card security code
	Contains at least 1 digits
*/
function validateQVCGiftCardSecurityCodeInput(QVCGiftCardSecurityCode){


	if (QVCGiftCardSecurityCode == null){
		return false;
	}

	var reQVCGiftCardSecurityCode = new RegExp(/^\d+$/);

	return (reQVCGiftCardSecurityCode.test(QVCGiftCardSecurityCode));

}


/**
	This function is used to validate an credit card number(after striping white space)
	1. Luhn algorithm number checker
*/
function validateCreditCardNO(creditCardNO){
	  var number1=creditCardNO.replace(/\s/g, '') ;
	  var number=number1.replace(/-/g, '');
	  if ( !(new RegExp(/^\d+$/)).test(number) ){
		  return false;
	  }

	  // Strip any non-digits (useful for credit card numbers with spaces and hyphens)
	  /*var number=creditCardNO.replace(/\D/g, '');*/

	  // Set the string length and parity
	  var number_length=number.length;
	  var parity=number_length % 2;

	  // Loop through each digit and do the maths
	  var total=0;
	  for (i=0; i < number_length; i++) {
		var digit=number.charAt(i);
		// Multiply alternate digits by two
		if (i % 2 == parity) {
		  digit=digit * 2;
		  // If the sum is two digits, add them together (in effect)
		  if (digit > 9) {
			digit=digit - 9;
		  }
		}
		// Total up the digits
		total = total + parseInt(digit);
	  }

	  // If the total mod 10 equals 0, the number is valid
	  if (total % 10 == 0) {
		return true;
	  } else {
		return false;
	  }

}

/**
	This function is used to validate a PIN format
	Contain only 5 didigs
*/
function validatePinInput(pinNumber){

	if (pinNumber == null ){
		return false;
	}

	return (new RegExp(/^\d{4}$/)).test(pinNumber);
}

/**
	This function is used to validate a QVC Customer Number input format
	Contain only didigs
*/
function validateMemberNumberInput(memberNumber){

	if ( memberNumber == null ){
		return false;
	}
	return (new RegExp(/^\d+$/)).test(memberNumber);
}

/**
	This function is used to validate a birthday input
	Valid birth date format: mm/dd and has to be a valid calendar date.
*/
function validateBirthdayDate(birthday){

	if ( birthday == null ) {
		return false;
	}

	birthdate = birthday.replace(/\s+/g, '');

	if ( !(new RegExp(/^\d{1,2}\/\d{1,2}$/)).test(birthdate) ){
		return false;
	}

	var date = birthdate.split('/');

	if ( date[0] < 1 || date[0] > 12) {
		return false;
    }

	if (date[1] < 1 || date[1] > 31) {
		return false;
	}

	if ((date[0] == 4 || date[0] == 6 || date[0] == 9 || date[0]== 11) &&
		(date[1]== 31)) {
		return false;
	}

	if ( date[0] == 2) {
		if ( date[1]>29 ) {
			return false;
		}
	}
	return true;
}

/**
	This function is used to validate an order number input
	Contain only 10 didigs
*/
function validateOrderNumberInput(orderNumber){

	if (orderNumber == null || trimAll(orderNumber) == "" ){
		return false;
	}

	return (new RegExp(/^\d{10}$/)).test(trimAll(orderNumber));

	return true;
}

/**
	This function is used to validate an item number input
	Contain 3-7 chars either start with First char alpha, the rest numeric
	or first char slash, the next alpha, the rest numeric.
*/
function validateItemNumberInput(itemNumber){

	if (itemNumber == null || trimAll(itemNumber) == "" ){
		return false;
	}

	return ((new RegExp(/^\w\d{2,6}$/)).test(trimAll(itemNumber)) || (new RegExp(/^\\\w\d{1,5}$/)).test(trimAll(itemNumber)));

	return true;
}

/**
	This function is used to validate an nickname input
	Contain only 10 didigs
*/
function validateNickNameInput(nickName){

    nickName = trimAll(nickName);

	if (nickName == null || nickName == "" || nickName.length > 25){
		return false;
	}

	var re =new RegExp(/(^[A-Za-z0-9]+)([A-Za-z0-9\s\&_-]*)([A-Za-z0-9]+$)/);

	if (nickName.match(re)){
		return true;
	}
	else
	{
		return false;
	}
}


/**
	This function checks if a given tag(tags) has a class
*/
function hasClassByTag(tagName,givenClassName) {

	var tags=document.getElementsByTagName(tagName);

	for(i=0;i<tags.length;i++){
		if ( tags[i].className.match(new RegExp('(\\s|^)'+givenClassName+'(\\s|$)')) ){
			return true;
		}
	}

	return false;
}

/**
	This function adds a class to the tag(s) of the same tag name
*/
function addClassByTag(tagName,givenClassName) {

	var tags=document.getElementsByTagName(tagName);
	for(i=0;i<tags.length;i++){
		if ( ! tags[i].className.match(new RegExp('(\\s|^)'+givenClassName+'(\\s|$)')) ){
			tags[i].className += " "+givenClassName;
		}
	}
}

/**
	This function removes a class from the tag(s) with the same tag name
*/
function removeClassByTag(tagName,givenClassName) {

	var tags=document.getElementsByTagName(tagName);
	var reg = new RegExp('(\\s|^)'+givenClassName+'(\\s|$)');

	for(i=0;i<tags.length;i++){
		if ( tags[i].className.match(new RegExp('(\\s|^)'+givenClassName+'(\\s|$)')) ){
			tags[i].className=tags[i].className.replace(reg,' ');
		}
	}

}

/**
	This function checks if a tag with the input ID has a class
*/
function hasClassByID(IDName,givenClassName) {

	 return ((document.getElementById(IDName)).className).match(new RegExp('(\\s|^)'+givenClassName+'(\\s|$)')) ;
}

/**
	This function adds a class to the tag with the input ID
*/
function addClassByID(IDName,givenClassName) {

	if ( ! hasClassByID(IDName,givenClassName) ){
		(document.getElementById(IDName)).className += " "+givenClassName;
	}

}

/**
	This function removes a class from the elements with the input tag ID
*/
function removeClassByID(IDName,givenClassName) {

	var reg = new RegExp('(\\s|^)'+givenClassName+'(\\s|$)');
	if (  hasClassByID(IDName,givenClassName) ){
		(document.getElementById(IDName)).className=(document.getElementById(IDName)).className.replace(reg,' ');
	}

}

/**
	This function adds a class to an element
*/
function addClassName(el, sClassName) {
	if ( !hasClassName(el,sClassName) ){
		el.className += " "+sClassName;
	}
}

/**
	This function removes a class from an element
*/
function removeClassName(el, sClassName) {
	var reg = new RegExp('(\\s|^)'+sClassName+'(\\s|$)');
	if (  hasClassName(el,sClassName) ){
		el.className=el.className.replace(reg,' ');
	}
}

/**
	This function checks if an element has a class
*/
function hasClassName(el, sClassName) {
	return (el.className).match(new RegExp('(\\s|^)'+sClassName+'(\\s|$)')) ;
}

/**
	This function removes the class name from a tag by their group identifier
	and adds its own class name to that tag
*/
function highlightTab(tagName,tabGroupID,giveClassName) {

	var tags=document.getElementsByTagName(tagName);
	var allClasses;

	for(i=0;i<tags.length;i++){
		allClasses = tags[i].className.split(" ");
		for(t=0;t<allClasses.length;t++){
			if ( allClasses[t].indexOf(	tabGroupID ) >= 0 ){
				removeClassByTag(tagName,allClasses[t]);
			}
		}
	}

	addClassByTag(tagName, giveClassName);
}

/**
	This function removes the class name from a tag by their group identifier
	and adds its own class name to that tag
*/
function highlightMoreInfoTab(tagName,tabGroupID,giveClassName,updateDiv,path,useFrame) {
	if (useFrame) {
		if ($('communityFrame')) {
			$('communityFrame').src = path;
		}
		else {
			var frame = new Element('iframe', {
				'src': path,
				'id': 'communityFrame',
				'styles': {
					'width': '100%',
					'height': '275px',
					'border': '0px solid #FFFFFF'
				}
			});
			frame.inject($(updateDiv));
		}
	}
	else {
		if (updateDiv && trimAll(updateDiv.innerHTML) == '') {
		  var params = {
				method: 'get',
				update: $(updateDiv),
				url: path,
				evalScripts: true,
				// Defect 8638, insert javscript file and css in the fetched html content dynamically except mootools.js
				onSuccess: function(a,b,c,d){
					// extract javascript and css file, and insert them into headsection dynamically
					var fullText = this.response.text;
					var scripts = [];
					var csses = [];
					fullText.replace(/<script[^>]*src="([^>]*)"[^>]*>[\s]*<\/script>/gi, function(m){
						if(!/mootools/i.test(arguments[1]) && /\.js\s*$/i.test(arguments[1])) {
							scripts.push(arguments[1]);
						}
						return m;
					});
					fullText.replace(/<link[^>]*href="([^>]*)"[^>]*[\s]\/>/gi, function(m){
						if(/\.css\s*$/i.test(arguments[1])) {
							csses.push(arguments[1]);
						}
						return m;
					});
					var headNode = document.getElementsByTagName('head')[0];
					for(var i = 0; i < csses.length; i++) {
						var cssNode = document.createElement('link');
						//cssNode.style = 'text/css';
						cssNode.rel = 'stylesheet';
						cssNode.href = csses[i];
						cssNode.media = 'screen';
						headNode.appendChild(cssNode);
					}
					for(var i = 0; i < scripts.length; i++) {
						var scriptNode = document.createElement('script');
						scriptNode.type = 'text/javascript';
						scriptNode.src = scripts[i];
						headNode.appendChild(scriptNode);
					}
				}
				// End defect 8638
			};
			new Request.HTML(params).send();
		}
	}

	var tags=document.getElementsByTagName(tagName);
	var allClasses;

	for(i=0;i<tags.length;i++){
		allClasses = tags[i].className.split(" ");
		for(t=0;t<allClasses.length;t++){
			if ( allClasses[t].indexOf(	tabGroupID ) >= 0 ){
				removeClassByTag(tagName,allClasses[t]);
			}
		}
	}

	addClassByTag(tagName, giveClassName);
}

/**
	Returns all elements in the current page which has the input class name
*/
function getElementsByClass( searchClass ) {

	var classElements = new Array();
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");

	var allHTMLElements = document.getElementsByTagName("*");

	for (i=0; i<allHTMLElements.length; i++) {
		if (pattern.test(allHTMLElements[i].className) ) {
			classElements.push(allHTMLElements[i])
		}
	}
	return classElements;

}

/**
This function is used to validate required fields
*/

function validateRequiredTextField(eleID){
	var requiredField = document.getElementById(eleID);

	if ((requiredField != null) && (trimAll(requiredField.value) != null) && (trimAll(requiredField.value) != "")){
		return true;
	}
	else {
		return false;
	}
}


/**
This function is used to validate a nick name input
1.	nickName input can't be empty
2.	Call validateNickNameInput to validate nick name input format if nickname does not start with "CHECKOUTFLOW"
*/
function validateAddressNickName(isFocusSetFlag){

	var retValue = true;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_Required_Valid_Address_Nickname = ERR_REQUIRED_VALID_ADDRESS_NICKNAME_NEW;

	var txtAddressNickname = document.getElementById("txtAddressNickname");

	if (txtAddressNickname != null) {
		var trimmedNickName = trimAll(txtAddressNickname.value);
		if (trimmedNickName == "") {
			// Continue nickname check
			if (!isFocusSetFlag){
				txtAddressNickname.focus();
				isFocusSetFlag = true;
			}
			//change of the error tag by Rajib
			displayMessage('error',"errnickName",valPageError,valMessage_Required_Valid_Address_Nickname,"lblAddressNickname","txtAddressNickname");
			retValue = false;
		} else if (trimmedNickName.length > 12 && trimmedNickName.substring(0,12) == "CHECKOUTFLOW") {
			// do nothing
		} else {
			// Ignore nickname checking for CHECKOUTFLOW nicknames
		 	if (!validateNickNameInput(trimmedNickName)) {
				if (!isFocusSetFlag){
					txtAddressNickname.focus();
					isFocusSetFlag = true;
				}
				//change of the error tag by Rajib
				displayMessage('error',"errnickName",valPageError,valMessage_Required_Valid_Address_Nickname,"lblAddressNickname","txtAddressNickname");
				retValue = false;
		 	}
		}
	}

	return retValue;
}


/**
This function is used to validate Email input
1.	Email input can't be empty
2.	Call validateEmailFormat to validate email input format
*/
function validateEmail(isFocusSetFlag){
	var retValue = true;
	/* begin Defect 7048 fix */
	var valPageError = ERR_REQUIRED_VALID_EMAILPIN_NEW;
	/* End defect 7048 fix */
	var valMessage_Required = ERR_REQIRED_VALID_EMAIL;
	var valMessage_InvalidEmail = ERR_REQIRED_INVALID_EMAIL;

	var txtEmailAddress = document.getElementById("txtEmailAddress");

	if (txtEmailAddress != null && trimAll(txtEmailAddress.value) == ""){
		if (!isFocusSetFlag){
			txtEmailAddress.focus();
			isFocusSetFlag = true;
		}
		/* begin Defect 7048 fix */
		displayMessage('error',"",valPageError,"","lblEmailAddress","txtEmailAddress");
		/* End defect 7048 fix */
		retValue = false;
	}
	else if (txtEmailAddress != null && !validateEmailFormat(txtEmailAddress.value)){
		if (!isFocusSetFlag){
			txtEmailAddress.focus();
			isFocusSetFlag = true;
		}
		displayMessage('error',"errEmailAddress",valPageError,valMessage_InvalidEmail,"lblEmailAddress","txtEmailAddress");
		retValue = false;
	}

	return retValue;
}

/**
This function is used to validate Name input (first name and last name)
1.	First name can't be empty
2.	Last name can't be empty
*/
function validateName(isFocusSetFlag){
	var retValue = true;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_Required_FirstName = ERR_REQUIRED_VALID_FIRSTNAME;
	var valMessage_Required_LastName = ERR_REQUIRED_VALID_LASTNAME;

	//movw to res bundle
	var valMessage_Invalid_FirstName = "First Name is not valid";
	var valMessage_Invalid_LastName = "Last Name is not valid";


	var txtFirstName = document.getElementById("txtFirstName");
	var txtLastName = document.getElementById("txtLastName");

	var regexp_InvalidChars = "[&]";
	var re = new RegExp(regexp_InvalidChars);


	if (txtFirstName != null && trimAll(txtFirstName.value) == ""){
		if (!isFocusSetFlag){
			txtFirstName.focus();
			isFocusSetFlag = true;
		}
		//change by Rajib
		displayMessage('error',"errfirstName",valPageError,valMessage_Required_FirstName,"lblFirstName","txtFirstName");
		retValue = false;
	}else{

		/* now & can be added part of the name
		if (txtFirstName.value.match(re)) {

			if (!isFocusSetFlag){
				txtFirstName.focus();
				isFocusSetFlag = true;
			}
			displayMessage('error',"errfirstName",valPageError,valMessage_Invalid_FirstName,"lblFirstName","txtFirstName");
			retValue = false;
		}
		*/

	}

	if (txtLastName != null && trimAll(txtLastName.value) == ""){
		if (!isFocusSetFlag){
			txtLastName.focus();
			isFocusSetFlag = true;
		}
		//chnage by Rajib
		displayMessage('error',"errlastName",valPageError,valMessage_Required_LastName,"lblLastName","txtLastName");
		retValue = false;
	}else{
		/*
		if (txtLastName.value.match(re)) {
			if (!isFocusSetFlag){
				txtLastName.focus();
				isFocusSetFlag = true;
			}
			displayMessage('error',"errlastName",valPageError,valMessage_Invalid_LastName,"lblLastName","txtLastName");
			retValue = false;
		}
		*/

	}

	return retValue;
}

function validateShipToName(isFocusSetFlag){
	var retValue = true;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_Required_ShipToName = ERR_REQUIRED_VALID_SHIPTONAME;
	//move to res bundle
	var valMessage_Invalid_ShipToName = "Ship-To Name is not valid";

	var txtShipToName = document.getElementById("txtShipToName");
	var txtFirstName = document.getElementById("txtFirstName");
	var txtLastName = document.getElementById("txtLastName");
	var regexp_InvalidChars = "[&]";
	var re = new RegExp(regexp_InvalidChars);


	if (txtShipToName == null || trimAll(txtShipToName.value) == ""){
		if (!isFocusSetFlag){
			txtShipToName.focus();
			isFocusSetFlag = true;
		}
		//change by Rajib
		displayMessage('error',"errshipToName",valPageError,valMessage_Required_ShipToName,"lblShipToName","txtShipToName");
		retValue = false;
	}else if(txtShipToName.length<=1) {
		displayMessage('error',"errshipToName",valPageError,valMessage_Required_ShipToName,"lblShipToName","txtShipToName");
		retValue = false;
	}

	if(retValue) {
		if(txtShipToName.value.lastIndexOf(" ")!=-1) {
			txtFirstName.value = txtShipToName.value.substring(0, txtShipToName.value.lastIndexOf(" "));
			txtLastName.value = txtShipToName.value.substring(txtShipToName.value.lastIndexOf(" "), txtShipToName.value.length);
		}else {
			txtFirstName.value = txtShipToName.value.substring(0, txtShipToName.value.length-1);
			txtLastName.value = txtShipToName.value.substring(txtShipToName.value.length-1, txtShipToName.value.length);
		}
	}

	return retValue;
}

/**
This function is used to validate Name input (first name and last name)
1. Address 1 can't be empty
*/
function validateAddressInput(isFocusSetFlag){
	var retValue = true;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_Required_Address = ERR_REQUIRED_VALID_ADDRESS;

	var txtAddress1 = document.getElementById("txtAddress1");

	if (txtAddress1 != null && trimAll(txtAddress1.value) == "" ){
		if (!isFocusSetFlag){
			txtAddress1.focus();
			isFocusSetFlag = true;
		}
		displayMessage('error',"erraddress1",valPageError,valMessage_Required_Address,"lblAddress1","txtAddress1");
		retValue = false;
	}

	return retValue;
}

/**
This function is used to validate ZIP/POSAL Code input,
Call validateZipPostalCodeInput
*/
function validateZIPPostalCode(isFocusSetFlag, countryCode){

	var retValue = true;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_InvalidZipPostalCode = ERR_REQUIRED_VALID_ZIPPOSTALCODE;

	var txtZipPostalCode = document.getElementById("txtZipPostalCode");
	var validateFlag = true;

	if ( !countryCode ){
		countryCode = "none";
	}

	if ( txtZipPostalCode != null ){
		if ( countryCode == "us" || countryCode == "none" ){
			validateFlag = (validateZipPostalCodeInput(trimAll(txtZipPostalCode.value)) || validateExtendZipPostalCodeInput(trimAll(txtZipPostalCode.value)));
		} else if ( countryCode == "canada" || countryCode == "none" ){
			if ( countryCode != "none" || !validateFlag ){
				validateFlag = (validateCanadianZipPostalCodeInput(trimAll(txtZipPostalCode.value)));

				// Defect #5586 - Remove space from canadian postal for it to pass QVC postal validation
				txtZipPostalCode.value = removeSpaces(txtZipPostalCode.value);
			}
		}

		if ( !validateFlag ){
			if (!isFocusSetFlag){
				txtZipPostalCode.focus();
				isFocusSetFlag = true;
			}
			displayMessage('error',"errzipCode",valPageError,valMessage_InvalidZipPostalCode,"lblZipPostalCode","txtZipPostalCode");
			retValue = false;
		}
	}

	return retValue;
}

/**
This function is used to validate address related input
1.	call validateName
2.  call validateAddressInput
*/
function validateAddress(isFocusSetFlag){
	var retValue = true;

	retValue = validateName(isFocusSetFlag);

	if (retValue){
		retValue = validateAddressInput(isFocusSetFlag);
	}else {
		isFocusSetFlag = true;
		validateAddressInput(isFocusSetFlag);
	}

	return retValue;

}
function validateShipToAddress(isFocusSetFlag){
	var retValue = true;

	retValue = validateShipToName(isFocusSetFlag);

	if (retValue){
		retValue = validateAddressInput(isFocusSetFlag);
	}else {
		isFocusSetFlag = true;
		validateAddressInput(isFocusSetFlag);
	}

	return retValue;

}

/**
This function is used to validate Order Number input,
Call validateOrderNumberInput
*/
function validateOrderNumber(isFocusSetFlag){

	var retValue = true;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_InvalidOrderNumber = ERR_REQUIRED_VALID_ORDERNUMBER;

	var txtByOrderNumber = document.getElementById("txtByOrderNumber");

	if (txtByOrderNumber != null && (!validateOrderNumberInput(txtByOrderNumber.value)) ){
		if (!isFocusSetFlag){
			txtByOrderNumber.focus();
			isFocusSetFlag = true;
		}
		displayMessage('error',"errOrderStatusByOrderNumber",valPageError,valMessage_InvalidOrderNumber,"lblByOrderNumber","txtByOrderNumber");
		retValue = false;
	}

	return retValue;

}

/**
This function is used to validate Item Number input,
call validateItemNumberInput
*/
function validateItemNumber(isFocusSetFlag){

	var retValue = true;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_InvalidItemNumber = ERR_REQUIRED_VALID_ITEMNUMBER;

	var txtByItemNumber = document.getElementById("txtByItemNumber");

	if (txtByItemNumber != null && (!validateItemNumberInput(txtByItemNumber.value)) ){
		if (!isFocusSetFlag){
			txtByItemNumber.focus();
			isFocusSetFlag = true;
		}
		displayMessage('error',"errOrderStatusByItemNumber",valPageError,valMessage_InvalidItemNumber,"lblByItemNumber","txtByItemNumber");
		retValue = false;
	}

	return retValue;

}

function validateEmailAFriend(){

	var retValue = true;
	var isFocusSetFlag = false;
	var valPageError = ERRCONSOLEMESSAGE;
	var valMessage_InvalidEmail = ERR_REQIRED_VALID_EMAIL;
	var valMessage_InvalidFirstName = ERR_REQUIRED_VALID_SENDERFIRSTNAME;
	var valMessage_InvalidLastName = ERR_REQUIRED_VALID_SENDERLASTNAME;
	var valMessage_InvalidMessage = ERR_REQUIRED_VALID_EMAILMESSAGE;

	resetLabelInput();

	var txtRecipientEmail = document.getElementById("txtRecipientEmail");

	if (txtRecipientEmail != null && !validateEmailFormat(txtRecipientEmail.value)){
		if (!isFocusSetFlag){
			txtRecipientEmail.focus();
			isFocusSetFlag = true;
		}
		displayMessage('error',"errRecipientEmail",valPageError,valMessage_InvalidEmail,"lblRecipientEmail","txtRecipientEmail");
		retValue = false;
	}

	if (!retValue){
		isFocusSetFlag = true;
	}

	var txtSenderEmail = document.getElementById("txtSenderEmail");

	if (txtSenderEmail != null && !validateEmailFormat(txtSenderEmail.value)){
		if (!isFocusSetFlag){
			txtSenderEmail.focus();
			isFocusSetFlag = true;
		}
		displayMessage('error',"errSenderEmail",valPageError,valMessage_InvalidEmail,"lblSenderEmail","txtSenderEmail");
		retValue = false;
	}

	if (!retValue){
		isFocusSetFlag = true;
	}

	var txtSenderFirstName = document.getElementById("txtSenderFirstName");
	
	if (txtSenderFirstName != null && trimAll(txtSenderFirstName.value) == "" ){
		if (!isFocusSetFlag){
			txtSenderFirstName.focus();
			isFocusSetFlag = true;
		}
		displayMessage('error',"errSenderFirstName",valPageError,valMessage_InvalidFirstName,"lblSenderFirstName","txtSenderFirstName");
		retValue = false;
	}

		if (!retValue){
		isFocusSetFlag = true;
	}

	var txtSenderLastName = document.getElementById("txtSenderLastName");
	
	if (txtSenderLastName != null && trimAll(txtSenderLastName.value) == "" ){
		if (!isFocusSetFlag){
			txtSenderLastName.focus();
			isFocusSetFlag = true;
		}
		displayMessage('error',"errSenderLastName",valPageError,valMessage_InvalidLastName,"lblSenderLastName","txtSenderLastName");
		retValue = false;
	}

	var taShortMessage = document.getElementById("taShortMessage");
	
	if (taShortMessage != null && trimAll(taShortMessage.value) == "" ){
		if (!isFocusSetFlag){
			taShortMessage.focus();
			isFocusSetFlag = true;
		}
		displayMessage('error',"errShortMessage",valPageError,valMessage_InvalidMessage,"lblShortMessage","taShortMessage");
		retValue = false;
	}

	if (retValue){
		$('divEmailToAFriend').setStyle('display','none');
		if($('divEmailToAFriendThankYou') != null)	// Added to fix JS error
			$('divEmailToAFriendThankYou').setStyle('display','block');
	}

	return retValue;
}

/**
This function is used to vlidate security code input, only and at least one digit
*/
function validateSecurityCodeInput(securityCode){
	if (securityCode == null){
		return false;
	}

	var reSecurityCode = new RegExp(/^\d+$/);

	return (securityCode.test(reSecurityCode));
}

function validateInitialLetter(initialLetter){

	if (initialLetter == null || trimAll(initialLetter) == "" ) {
		return false;
	}

	var reInitialLetter = new RegExp(/^[a-zA-Z]{1}$/);
	return (reInitialLetter.test(initialLetter));

}

/*
The followings functions are invoked only by the functions inside this js file, not by
HTML files.
*/
function resetLabelInput(){

	if (  document.getElementById("errConsole") != null ){
		document.getElementById("errConsole").style.display = "none";
	}
	var curElements =  document.getElementsByTagName("input");
 	for (i=0; i<curElements.length; i++) {
		if ( curElements[i].className.match(new RegExp(" ?inputError")) ){
			curElements[i].className = curElements[i].className.replace(/ ?inputError/g, "");
		}
	}
	curElements =  document.getElementsByTagName("select");
 	for (i=0; i<curElements.length; i++) {
		if ( curElements[i].className.match(new RegExp(" ?inputError")) ){
			curElements[i].className = curElements[i].className.replace(/ ?inputError/g, "");
		}
	}
	curElements =  document.getElementsByTagName("textarea");
 	for (i=0; i<curElements.length; i++) {
		if ( curElements[i].className.match(new RegExp(" ?inputError")) ){
			curElements[i].className = curElements[i].className.replace(/ ?inputError/g, "");
		}
	}
	curElements =  document.getElementsByTagName("label");
 	for (i=0; i<curElements.length; i++) {
		if ( curElements[i].className.match(new RegExp(" ?labelError")) ){
			curElements[i].className = curElements[i].className.replace(/ ?labelError/g, "");
		}

	}
	curElements = document.getElementsByTagName("p");
	for (i=0; i<curElements.length; i++) {
		if (curElements[i].className == "err"){
			curElements[i].style.display = "none";
		}
	}
}


function displayMessage(msgType,errorID, msgTitle,msgText,inputLabel,inputMessage) {
		switch (msgType) {
		case 'info':
		break
		case 'warning':
		break
		case 'error':
			var errConsole = document.getElementById("errConsole");
			var errElement = document.getElementById(errorID);
			var errLabel = document.getElementById(inputLabel);
			var errInput = document.getElementById(inputMessage);
			if ( errConsole != null ){
				errConsole.innerHTML = msgTitle;
				errConsole.style.display = "block";
			}
			if ( errElement != null ){
				errElement.innerHTML = msgText;
				errElement.style.display = "block";
			}
			if ( errLabel != null && (!(errLabel.className.match("labelError"))) ) {
					errLabel.className += " labelError";
			}
			if ( errInput != null && (!(errLabel.className.match("inputError"))) ){
					errInput.className += " inputError";
			}
			/*if ( errInput.type == "select-one" ){
				errInput.style.backgroundColor = "#f00";
			}
			else {
				errInput.style.border = "1px solid #f00";
			}*/
		break
		case 'help':
		break
		default:
		break
	}
}
function displayMessageNew(msgType,errorID, msgTitle,msgText,inputLabel,inputMessage) {
		switch (msgType) {
		case 'info':
		break
		case 'warning':
		break
		case 'error':
			var errConsole = document.getElementById("errConsole");
			var errElement = document.getElementById(errorID);
			var errLabel = document.getElementById(inputLabel);
			var errInput = document.getElementById(inputMessage);
			if ( errConsole != null ){
				errConsole.innerHTML = msgTitle;
				if(msgTitle == null){
				errConsole.style.display = "none";
				}else{
				errConsole.style.display = "block";
				}
			}
			if ( errElement != null ){
				errElement.innerHTML = msgText;
				errElement.style.display = "block";
			}
			if ( errLabel != null && (!(errLabel.className.match("labelError"))) ) {
					errLabel.className += " labelError";
			}
			if ( errInput != null && (!(errLabel.className.match("inputError"))) ){
					errInput.className += " inputError";
			}
			/*if ( errInput.type == "select-one" ){
				errInput.style.backgroundColor = "#f00";
			}
			else {
				errInput.style.border = "1px solid #f00";
			}*/
		break
		case 'help':
		break
		default:
		break
	}
}

function displayMessageWithOutStyle(msgType,errorID, msgTitle,msgText,inputLabel,inputMessage) {
		switch (msgType) {
		case 'info':
		break
		case 'warning':
		break
		case 'error':
			var errConsole = document.getElementById("errConsole");
			var errElement = document.getElementById(errorID);
			var errLabel = document.getElementById(inputLabel);
			var errInput = document.getElementById(inputMessage);
			if ( errConsole != null ){
				errConsole.innerHTML = msgTitle;
				errConsole.style.display = "block";
			}
			if ( errElement != null ){
				errElement.innerHTML = msgText;
				errElement.style.display = "block";
			}

			/*if ( errInput.type == "select-one" ){
				errInput.style.backgroundColor = "#f00";
			}
			else {
				errInput.style.border = "1px solid #f00";
			}*/
		break
		case 'help':
		break
		default:
		break
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Below functions - Added By Rajib
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



	/**
	 *	Get the query variable
	*	from the query string
	*/
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return null;
	}


	/**
	*  Returns true if character c is a digit (0 .. 9).
	**/
	function isDigit (c){
		return ((c >= "0") && (c <= "9"))
	}

	/**
	*  Returns true if character c is an alphabet  (a .. z or A .. Z).
	**/
	function isAlphabet (c){
		return (((c >= "a") && (c <= "z"))||((c >= "A") && (c <= "Z")))
	}


	/**
	*  Trim - non numeric and non alphabet character from the string
	**/
	function trimNonNumeric(obj) {
      var newStr="";
      var str=obj.value;
      var len = str.length;
        for ( var i =0 ; i < len; i++ ) {
          var c = str.charAt(i);
          if (isDigit(c)||isAlphabet(c)){
            newStr=newStr+c;
          }
      }
      obj.value= newStr.trim();
     }

// holds a map of the query string
var query_params = {};

// parses the query string into a Javascript variable
if (window.location.search) {
	_temp_ = window.location.search;
	if (window.location.search.charAt(0) == '?') {
		_temp_ = _temp_.substring(1);
	}
	_temp_ = _temp_.split('&');
	for(i=0;i<_temp_.length;i++) {
		qp = _temp_[i].split('=');
		query_params[qp[0]] = qp[1];
	}
}

/* Default values for user attributes */
var defaultFirstPurchaseDate = "0";
var defaultLastPurchaseDate = "0";
var defaultMerchPreference = "NA";
var defaultMBS = "0";
var defaultCustType = "NV";
var defaultCustSeg = "NULL";
var uattrSeparator = "|";

/* As part of the CT/MBS enhancement, obtain the user attributes to used in the registration tag
   Cookie will contain first purchase date, last purchase date, and merch performance as pipe delimited list */
function getUserAttrCookie()  {
	var userAttr = Cookie.read("uattr");
	if (userAttr == null || userAttr.length == 0)  {
		userAttr = defaultCustType + uattrSeparator
				 + defaultMBS + uattrSeparator
				 + defaultCustSeg + uattrSeparator
				 + defaultFirstPurchaseDate + uattrSeparator
				 + defaultLastPurchaseDate + uattrSeparator
				 + defaultMerchPreference;
	}
	return userAttr;
}


/* For the CT/MBS enhancement, obtain the CT attribute used in registration and page view tagging
   Look into javacode (constants) for meaning of cookie and value */
function getCTCoreMetricAttribute()  {

	var ct = defaultCustType;
	var userAttr = getUserAttrCookie();
	var attributes = userAttr.split(uattrSeparator);
	if (attributes.length >= 6) {
		ct = attributes[0];
	}
	return ct;

}

/* For the CT/MBS enhancement, form the MB attribute used in registration and page view tagging
   Look into javacode (constants) for meaning of cookie and value */
function getMBCoreMetricAttribute()  {

	var mb = defaultMBS;
	var userAttr = getUserAttrCookie();
	var attributes = userAttr.split(uattrSeparator);
	if (attributes.length >= 6) {
		mb = attributes[1];
	}

	return mb;
}

/* For the CT/MBS enhancement, form the CS attribute used in registration and page view tagging
   Look into javacode (constants) for meaning of cookie and value */
function getCSCoreMetricAttribute()  {

	var cs = defaultCustSeg;
	var userAttr = getUserAttrCookie();
	var attributes = userAttr.split(uattrSeparator);
	if (attributes.length >= 6) {
		cs = attributes[2];
	}

	return cs;
}

/* Obtain the first purchase date for the user logged into the site.  Index 0 of the uattr cookie */
function getUserFirstPurchaseDate()  {
	var firstPurchaseDate = defaultFirstPurchaseDate;
	var userAttr = getUserAttrCookie();
	var attributes = userAttr.split(uattrSeparator);
	if (attributes.length >= 6) {
		firstPurchaseDate = attributes[3];
	}
	return firstPurchaseDate;
}

/* Obtain the last purchase date for the user logged into the site.  Index 1 of the uattr cookie */
function getUserLastPurchaseDate()  {
	var lastPurchaseDate = defaultLastPurchaseDate;
	var userAttr = getUserAttrCookie();
	var attributes = userAttr.split(uattrSeparator);
	if (attributes.length >= 6) {
		lastPurchaseDate = attributes[4];
	}
	return lastPurchaseDate;
}

/* Obtain the merch preference for the user logged into the site.  Index 2 of the uattr cookie */
function getUserMerchPreference()  {
	var merchPreference = defaultMerchPreference;
	var userAttr = getUserAttrCookie();
	var attributes = userAttr.split(uattrSeparator);
	if (attributes.length >= 6) {
		merchPreference = attributes[5];
	}
	return merchPreference;
}


/*******************************************
/* 	For Coremetrics
/*******************************************/
var tags = {};

function clearTags() {
	tags = {};
}

function addTag(name, tag) {
	if(!tags[name]) {
		tags[name] = [];
	}
	tags[name].push(tag);
}

function makeCoremetricsCalls(){
	makeCoremetricsTagCalls(tags);
}

function makeCoremetricsTagCalls(tags) {
	if (tags) {
		// determine if page view should not be called
		ignorePageView = false;
		if (tags['product'] && tags['product'].length > 0) {
			for (i=0; i<tags['product'].length; i++) {
				if (tags['product'][i]) {
					productTag = tags['product'][i].split();
					if (productTag && productTag[4] == "Y") {
						ignorePageView = true;
						break;
					}
				}
			}
		}

		if (tags['page'] && !ignorePageView) {
			if (tags['page'][0]) {
				try { eval(tags['page'][0]); } catch(e) { /*alert('exception:'+e);*/ }
			}
		}

		if (tags['product'] && tags['product'].length > 0) {
			for (i=0; i<tags['product'].length; i++) {
				if (tags['product'][i]) {
					try { eval(tags['product'][i]); } catch(e) { /*alert('exception:'+e);*/ }
				}
			}
		}

		if (Cookie.read('cmReg')) {
			regTemp = Cookie.read('cmReg');
			if (regTemp != null && regTemp.length > 0) {
				//Start fix defect 9654
				if(new RegExp(/^0\d+$/).test(trimAll(regTemp))){
					Cookie.dispose('cmReg',{path:"/"});
					var customerID = regTemp;
					var memberID= regTemp;

					// Take defaults if CT and/or MB cookie not present; They should be there thou
					var ct = getCTCoreMetricAttribute();
					var mb = getMBCoreMetricAttribute();
					var cs = getCSCoreMetricAttribute();

					// Obtain the user attributes firstPurchaseDate, lastPurchaseDate, and Merch Performance
					var firstPurchaseDate = getUserFirstPurchaseDate();
					var lastPurchaseDate = getUserLastPurchaseDate();
					var merchPreference = getUserMerchPreference();

					// First 3 attributes are set in community section of site (start date, nickname, total community posts)
					var attributes = "-_--_--_-" + ct + "-_-" + mb + "-_-" + firstPurchaseDate + "-_-" + lastPurchaseDate + "-_-" + merchPreference + "-_-" + cs;
					cmCreateRegistrationTag(customerID,memberID,'','','','','',attributes);
				}
				//End fix defect 9654
			}
		}

		if (tags['registration'] && tags['registration'].length > 0 && tags['registration'][0]) {
			try { eval(tags['registration'][0]); } catch(e) { /*alert('exception:'+e);*/ }
		}

		if (tags['shop5'] && tags['shop5'].length > 0) {
			for (i=0; i<tags['shop5'].length; i++) {
				try { eval(tags['shop5'][i]); } catch(e) { /*alert('exception:'+e);*/ }
				cmDisplayShop5s();
			}

		}

		if (tags['shop9'] && tags['shop9'].length > 0) {
			for (i=0; i<tags['shop9'].length; i++) {
				try { eval(tags['shop9'][i]); } catch(e) { /*alert('exception:'+e);*/ }
			}
			cmDisplayShop9s();
		}

		if (tags['order'] && tags['order'].length > 0) {
			for (i=0; i<tags['order'].length; i++) {
				try { eval(tags['order'][i]); } catch(e) { /*alert('exception:'+e);*/ }
			}
		}

		if (tags['conversion'] && tags['conversion'].length > 0) {
			for (i=0; i<tags['conversion'].length; i++) {
				try { eval(tags['conversion'][i]); } catch(e) { /*alert('exception:'+e);*/ }
			}
		}
	}
}

/********************************************************
// if a shopping category is added to any URL on the site
// then that shopping category will be added to a cookie
// with all of the shopping categories associated to their
// partNumbers
// example value: ABC123-PROM_DEF456-TSV_GHI789-PROM
// where ABC123, DEF456, and GHI789 are part numbers
// and PROM and TSV are shopping categories
**********************************************************/
if (query_params.sc) { // shopping category added to the query string (see query_params above)
	var cookie_val = ""; // new cookie value
	var sc_splits = query_params.sc.split('-');
	var sc_partNum = (sc_splits.length > 0) ? sc_splits[0] : null;
	var sc_shopCat = (sc_splits.length > 1) ? sc_splits[1] : sc_partNum;
	var old_cookie_val = Cookie.read('sc'); // old cookie value
	// if the old cookie exists then deconstruct and rebuild it
	if (old_cookie_val) {
		//cookie_val = query_params.sc;
		oc_splits = old_cookie_val.split('_');
		for (i=0;i<oc_splits.length;i++) {
			if (oc_splits[i].length == 0) {
				continue;
			}
			if (cookie_val.length > 0 && i > 0) {
				cookie_val += "_";
			}
			oc_sc_split = oc_splits[i].split('-');

			// if the part number does not exist in the shopping category passed in
			// then tack on the pairing related to other part numbers
			if (query_params.sc.indexOf(oc_sc_split[0]) == -1) {
				cookie_val += oc_splits[i];
			} else { // otherwise use the new query string parameter
				cookie_val += query_params.sc;
			}
		}
	} else { // no cookie present
		cookie_val = query_params.sc;
	}
	if (cookie_val.indexOf(query_params.sc) == -1) {
		if (cookie_val.length > 0) {
			cookie_val += "_";
		}
		cookie_val += query_params.sc;
	}
	// set the new cookie
	Cookie.write('sc',cookie_val, {path: '/'});
}

/*******************************************
/* 	end of Coremetrics section
/*******************************************/

function validateInitialLetter(initialLetter){

	if (initialLetter == null || trimAll(initialLetter) == "" ) {
		return false;
	}

	var reInitialLetter = new RegExp(/^[a-zA-Z]{1}$/);
	return (reInitialLetter.test(initialLetter));

}

function callShipCalc(ZipCode, GroupNumber, ItemIdn, waitlistSW, displayFunc)
{
	// Defect 7909 - Lets support US and Canadian zipcodes.
	// 		EDD service: For US zipcodes only supports 5 digits, For Canadian zipcodes the service allows either a space or no space (i.e. 'K1A 0G9', 'K1A0G9')
    if (! validateCanadianZipPostalCodeInput(ZipCode))  {
		ZipCode = ZipCode.toString().substr(0,5);
	}

	var myAjax = new TimedRequest({
					url:"/webapp/wcs/stores/servlet/BackendProxy?transaction=getEDDinJSON&method=GET&productId="+GroupNumber +"&colorCode=000&itemId="+ItemIdn +"&sizeCode=000&waitlistSW="+waitlistSW +"&personalizedFlag=N&shipToZipCode="+ZipCode,
                    method: 'get',
					async: true,
                    onComplete:function(output){processShipCalcDetails(output, displayFunc);},
                    timeout: 8000,
                    onFailure:function(output){}
                }).send( );
}


function processShipCalcDetails(myJSON, displayFunc) {
	var shipCalcData = JSON.decode(myJSON);
	var retObj = { error: false, data: [] };

	//00000 is the success code
	if (shipCalcData && shipCalcData.status == "00000"){
		retObj.data = shipCalcData;
	}
	else if(shipCalcData && shipCalcData.status == "11027"){
		retObj.error = "Unfortunately, this item cannot be sent to the entered postal code. This may be due to a shipping restriction or lack of service in that area. You may enter another zip code. You may also contact Customer Service at 1-888-345-5788, and a representative can provide more details or alternatives. Please enter another ZipCode.";
	}
	else if (shipCalcData && shipCalcData.status == "10015") {
		retObj.error = "Unfortunately, the zip code you have entered appears to be invalid. Please enter another zip code. You may also contact Customer Service at 1-888-345-5788, and a representative can provide more details or alternatives.";
	}
	else if (shipCalcData && shipCalcData.status == "404") {
		retObj.error = "Unfortunately, an error occurred while estimating the delivery date. We apologize for any inconvenience this may cause. Please contact Customer Service at 1-888-345-5788, and a representative can assist you.";
	}
	else {
		//handle other status codes...
		//placeholder error message
		retObj.error = "Unfortunately, an error occurred while estimating the delivery date. We apologize for any inconvenience this may cause. Please contact Customer Service at 1-888-345-5788, and a representative can assist you.";
	}

	//call the display function
	displayFunc(retObj);
}

window.addEvent('domready', function(){
	var _7DayExpiration={path: '/', domain: '.qvc.com', duration: 7}; // stores cookie for 7 days
	var _sessionExpiration={path: '/', domain: '.qvc.com'};
	// sample url:  http://www.qvc.com/webapp/wcs/stores/servlet/ProductDisplay?langId=-1&storeId=10251&catalogId=10151&partNumber=A50790&ref=CJ
	var expiration = "";
	var refParamName = "ref";
	var strHref = window.location.href;
  //----------------------------------------------------------
  if (strHref.indexOf("?") > -1 ){
    strHref = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var params = strHref.split("&");
    for ( var x = 0; x < params.length; x++ ){
      if (params[x].indexOf(refParamName.toLowerCase() + "=") > -1 ){
        var aParam = params[x].split("=");
        if(trimAll(aParam[1]).length > 0){
      		expiration = (  (is7DayPixelPartner(aParam[1])) ? _7DayExpiration : _sessionExpiration  );
      		Cookie.write('IQVCREF',aParam[1].toUpperCase(), expiration);
        	break;
        }
      }
    }
  }
});


//some tracking pixel partners require IQVCREF cookie to be set for 7 days. Verify if given ref partner falls into that category:
function is7DayPixelPartner(val){
	var _7DayPixelPartners = new RegExp('^(GPA|CJ)$', 'i'); //irght now there are only two: GPA-GoogleClicks; CJ-CommissionJunction
	return _7DayPixelPartners.test(val);
}

function renderedHTMLContent(containerID, returnParam, qpText, actionVal)
{
	try
	{
		//http://wchlqh2100.qvcdev.qvc.net/Electronics.category.0103.html?refine=1001300&cm_re=MH-_-%28Electronics%29-_-%28Electronics%29&cm_sp=MH-_-%28Electronics%29-_-%28Electronics%29
		var locationPathname = location.pathname;
		var locationPathnameSplitArr = locationPathname.split(".");
		var locationPathnameMetaText = locationPathnameSplitArr[0].substring(1,locationPathnameSplitArr[0].length);
		var locationPathnameCategoryID = locationPathnameSplitArr[2];

		var pageIDVal;
		var activeVideoHeading;
		var activeVideoURL;
		var activeVideoIndex;

		var doc_arrOfDivs = document.getElementsByTagName('div');
		// declare regex
		var patternStr= '^eSpot[0-9a-zA-Z]+[\-]' + containerID + '$';
		var re_eSpot = new RegExp(patternStr);
		// loop through the form elements
		for(i = 0; i < doc_arrOfDivs.length; i++)
		{
			// execute regular expression against each element id
			var m = re_eSpot.test(doc_arrOfDivs[i].id);
			if (m)
			{
				var hyphenIndex = doc_arrOfDivs[i].id.indexOf('-',0);
				var firstPattern = doc_arrOfDivs[i].id.substring(0,hyphenIndex);
				pageIDVal = firstPattern.substring(5, firstPattern.length);

				var identifier = qpVals('identifier');			//'identifier' is the category code in QP.

				if (identifier !='')
					pageIDVal = identifier;

				var doc_arrOfLi = doc_arrOfDivs[i].getElementsByTagName('li');

				// declare regex
				var re_activeVideo = new RegExp(/^activeVideo$/);

				// loop through the form elements
				for(j = 0; j < doc_arrOfLi.length; j++)
				{
					cleanWhitespace(doc_arrOfLi[j]);
					//---------------------------------------------------------------Active Video------------------------------------------------------------------------------
					// execute regular expression against each element id
					var m = re_activeVideo.test(doc_arrOfLi[j].className);
					if (m)
					{
						//element id matches regex
						activeVideoHeading = doc_arrOfLi[j].childNodes[0].childNodes[0].innerHTML;
						activeVideoURL = doc_arrOfLi[j].childNodes[0].childNodes[0].href;
						activeVideoIndex = doc_arrOfLi[j].childNodes[0].className.charAt(doc_arrOfLi[j].childNodes[0].className.length-1);;
					}
					//---------------------------------------------------------------------------------------------------------------------------------------------------------------
				}
			}
		}

		switch(returnParam)
		{
			case 'pageID':
				if (actionVal == 'alert')
					alert(pageIDVal);
				else
					return pageIDVal;								//renderedHTMLContent('2','pageIDVal','');
				break;
			case 'activeVideoHeading':
				if (actionVal == 'alert')
					alert(activeVideoHeading.replace(/<BR>/g, ' '));
				else
					return activeVideoHeading;						//renderedHTMLContent('2','activeVideoHeading','');
				break;
			case 'activeVideoURL':
				if (actionVal == 'alert')
					alert(activeVideoURL);

				else
					return activeVideoURL;							//renderedHTMLContent('2','activeVideoURL','');
				break;
			case 'activeVideoIndex':
				if (actionVal == 'alert')
					alert(activeVideoIndex);

				else
					return activeVideoIndex;							//renderedHTMLContent('2','activeVideoURL','');
				break;
			case 'locationPathnameMetaText':
				if (actionVal == 'alert')
					alert(locationPathnameMetaText);
				else
					return locationPathnameMetaText;				//renderedHTMLContent('','locationPathnameMetaText','');
				break;
			case 'locationPathnameCategoryID':
				if (actionVal = 'alert')
					alert(locationPathnameCategoryID);
				else
					return locationPathnameCategoryID;				//renderedHTMLContent('','locationPathnameCategoryID','');
				break;
			case 'metaNameInPageTitle':
				if (actionVal == 'alert')
				{
					cleanWhitespace($('divPageTitle'));
					alert($('divPageTitle').childNodes[0].innerHTML.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," "));
				}
				else
					cleanWhitespace($('divPageTitle'));
					return $('divPageTitle').childNodes[0].innerHTML.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ");	//renderedHTMLContent('','metaNameInPageTitle','');
				break;
			case 'QP':
				if (qpText != '')
					if (actionVal == 'alert')
						alert(qpVals( qpText ));
					else
						return qpVals( qpText );					//renderedHTMLContent('','QP','refine');	//Gets Query Params
				else
					return '';
				break;
			default:
				return '';
		}
	}
	catch(err)
	{
	}
}

var notWhitespace = /\S/;

//Remove white space in HTML.
function cleanWhitespace(node)
{
	try
	{
		for (var x = 0; x < node.childNodes.length; x++)
		{
			var childNode = node.childNodes[x];
			if ((childNode.nodeType == 3)&&(!notWhitespace.test(childNode.nodeValue)))
			{
				if (childNode.isElementContentWhitespace)
				{
					// that is, if it's a whitespace text node
					node.removeChild(node.childNodes[x]);
					x--;
				}
			}

			if (childNode.nodeType == 1)
			{
				// elements can have text child nodes of their own
				cleanWhitespace(childNode);
			}
		}
	}
	catch (err)
	{
	}
}

//HTML Encode content-*Disabled
function encodeHtmlText(htmlContent)
{
	try
	{
		var encodedHtml = htmlContent;
		/*encodedHtml = escape(htmlContent);
		encodedHtml = encodedHtml.replace(/\//g,"%2F");
		encodedHtml = encodedHtml.replace(/\?/g,"%3F");
		encodedHtml = encodedHtml.replace(/=/g,"%3D");
		encodedHtml = encodedHtml.replace(/&/g,"%26");
		encodedHtml = encodedHtml.replace(/@/g,"%40");*/
		return encodedHtml;
	}
	catch(err)
	{}
}

// Get URL query parameters
function qpVals( name )
{
	try
	{
		var locationHref = location.href;
		var locationProtocol = location.protocol;
		var locationHost = location.host;
		var locationPathname = location.pathname;
		var locationSearch = location.search;

		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
			return "";
		else
			return results[1];
	}
	catch(err)
	{}
}

function tagVideoCoremetrics(videoIndex)
{
	try
	{
		var containerIndex = '2';		//eSpot 2
		var videoPath = '';

		if (videoIndex == '')			// If passed as a param, use that or else calculate
			videoPath = encodeHtmlText(renderedHTMLContent(containerIndex, 'activeVideoURL', '', '') + "&cm_re=PROMOTIONSVIDEO-_-" + renderedHTMLContent(containerIndex, 'activeVideoIndex', '', '') + ":" + renderedHTMLContent('2', 'activeVideoHeading', '', '') + "&cm_sp=VIDEO-_-META-_-PLAY");
		else
			videoPath = encodeHtmlText(renderedHTMLContent(containerIndex, 'activeVideoURL', '', '') + "&cm_re=PROMOTIONSVIDEO-_-" + videoIndex + ":" + renderedHTMLContent('2', 'activeVideoHeading', '', '') + "&cm_sp=VIDEO-_-META-_-PLAY");

		var videoName = encodeHtmlText(renderedHTMLContent(containerIndex, 'activeVideoHeading', '', ''));
		var CM_PageID = encodeHtmlText(renderedHTMLContent(containerIndex, 'metaNameInPageTitle', '', ''));
		cmCreateManualLinkClickTag(videoPath, videoName, CM_PageID);		//Link click tag

		var vidPageId = encodeHtmlText(renderedHTMLContent(containerIndex, 'metaNameInPageTitle', '', '') + ' VIDEO > ' + renderedHTMLContent('2', 'activeVideoHeading', '', ''));
		var videoCM_CatID = encodeHtmlText(renderedHTMLContent(containerIndex, 'pageID', '', ''));
		cmCreateManualPageviewTag(vidPageId, videoCM_CatID);				//Page view tag
	}
	catch(err)
	{}
}

function getMemberIdFromCookie()
{
	try
	{
		var caValue;
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ')
			{
				c = c.substring(1,c.length);
			}
			if (c.indexOf('WC_USERACTIVITY_') == 0)
			{
				caValue = c.substring((c.indexOf('=') + 1),c.length);
				if(caValue.indexOf(',') != -1)
				{
					caValue = caValue.split(",",1);
				}
				else
				{
					caValue = caValue.split("%2c",1);
				}
				return unescape(caValue).replace(/^\s+|\s+$/g,"");
			}
		}
		return "";
	}
	catch (err)
	{
		return "";
	}
}

//------------------------------------------------------------------------------------------------------------------
// ImageLoadFailed - Hide image if it fails to load
// imageContainer - div that contains image (<div>)
// image - the actual image (<img>)
// eventName - 'onerror' or 'onload' - Both events will call routine but for IE only onerror will determine if image
//				will show while the presence of naturalHeight will be used for FireFox.
//------------------------------------------------------------------------------------------------------------------
function ImageLoadFailed(imageContainer, image, eventName)
{
	var divReminderInfoImage = document.getElementById(imageContainer);				// Obtain container where image resides
	var reminderImg = document.getElementById (image);								// Obtain image element
	if (reminderImg.naturalHeight === undefined) {			// IE - Does not support naturalHeight
		if (eventName == 'onerror')  {
			divReminderInfoImage.style.display = "None";
		}
	}
	else  {													// Firefox
		if (reminderImg.naturalHeight == 0 && reminderImg.naturalWidth == 0)  {
			divReminderInfoImage.style.display = "None";
		}
	}
}

// To get the URL Paramter.
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null ){
    return "";
  }
  else{
    return results[1];
  }
}

function forceLogoff() {
    var xmlHttpReq = false;
    var self = this;
    // Mozilla/Safari
    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    self.xmlHttpReq.open('GET', '/webapp/wcs/stores/servlet/Logoff', true);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'text/html');
    self.xmlHttpReq.send();
}