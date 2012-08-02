//********************************************************************
//*-------------------------------------------------------------------
//* Licensed Materials - Property of IBM
//*
//* WebSphere Commerce
//*
//* (c) Copyright International Business Machines Corporation. 2003
//*     All rights reserved.
//*
//* US Government Users Restricted Rights - Use, duplication or
//* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
//*
//*-------------------------------------------------------------------
//*

//////////////////////////////////////////////////////////
// Checks whether a string contains a double byte character
// target = the string to be checked
//
// Return true if target contains a double byte char; false otherwise
//////////////////////////////////////////////////////////
function containsDoubleByte (target) {
     var str = new String(target);
     var oneByteMax = 0x007F;

     for (var i=0; i < str.length; i++){
        chr = str.charCodeAt(i);
        if (chr > oneByteMax) {return true;}
     }
     return false;
}

//////////////////////////////////////////////////////////
// A simple function to validate an email address
// It does not allow double byte characters
// strEmail = the email address string to be validated
//
// Return true if the email address is valid; false otherwise
//////////////////////////////////////////////////////////
function isValidEmail(strEmail){
	// check if email contains dbcs chars
	if (containsDoubleByte(strEmail)){
		return false;
	}
	
	if(strEmail.length == 0) {
		return true;
	} else if (strEmail.length < 5) {
             return false;
       	}else{
           	if (strEmail.indexOf(" ") > 0){
                      	return false;
               	}else{
                  	if (strEmail.indexOf("@") < 1) {
                            	return false;
                     	}else{
                           	if (strEmail.lastIndexOf(".") < (strEmail.indexOf("@") + 2)){
                                     	return false;
                                }else{
                                        if (strEmail.lastIndexOf(".") >= strEmail.length-2){
                                        	return false;
                                        }
                              	}
                       	}
              	}
       	}
      	return true;
}



//////////////////////////////////////////////////////////
// This function will count the number of bytes
// represented in a UTF-8 string
//
// arg1 = the UTF-16 string
// arg2 = the maximum number of bytes allowed in your input field
// Return false is this input string is larger then arg2
// Otherwise return true...
//////////////////////////////////////////////////////////
function isValidUTF8length(UTF16String, maxlength) {
    if (utf8StringByteLength(UTF16String) > maxlength) return false;
    else return true;
}

//////////////////////////////////////////////////////////
// This function will count the number of bytes
// represented in a UTF-8 string
//
// arg1 = the UTF-16 string you want a byte count of...
// Return the integer number of bytes represented in a UTF-8 string
//////////////////////////////////////////////////////////
function utf8StringByteLength(UTF16String) {
  if (UTF16String === null) return 0;
  var str = String(UTF16String);
  var oneByteMax = 0x007F;
  var twoByteMax = 0x07FF;
  var byteSize = str.length;

  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    if (chr > oneByteMax) byteSize = byteSize + 1;
    if (chr > twoByteMax) byteSize = byteSize + 1;
  }  
  return byteSize;
}
function trimSpaces(stringValue) {
    // Checks the first occurance of spaces and removes them
    for(i = 0; i < stringValue.length; i++) {
        if(stringValue.charAt(i) != " ") {
            break;
        }
    }
    if(i > 0) {
        stringValue = stringValue.substring(i);
    }
    // Checks the last occurance of spaces and removes them
    strLength = stringValue.length - 1;
    for(i = strLength; i >= 0; i--) {
        if(stringValue.charAt(i) != " ") {
            break;
        }
    }
    if(i < strLength) {
        stringValue = stringValue.substring(0, i + 1);
    }
    // Returns the string after removing leading and trailing spaces.
    return stringValue;
}
function isPositiveNumber(digitInput){
   var reDigit = /^[+]?\d*$/;
	  if(! reDigit.test(digitInput))  return false;
		return true;
}


//////////////////////////////////////////////////////////
// This function will return the value of a cookie
//
// arg1 = cookie name
// Return the value of the cookie
//////////////////////////////////////////////////////////
function wc_getCookie(name) {
	var cookies = document.cookie.split(';');
	var value   = null;

	for ( var i=0; i < cookies.length; i++ ) {
		var cookie = cookies[i];

		while ( cookie.charAt(0) == ' ' ) {
			cookie = cookie.substring(1, cookie.length );
		}

		if ( cookie.indexOf(name+"=") == 0 ) {
			value = cookie.substring(name.length+1, cookie.length);
			value =	unescape(value);
		}
	}
	return value;
}

//////////////////////////////////////////////////////////
// This function will create a cookie
//
// arg1 = cookie name
// arg2 = cookie value
// arg3 = expire time
//////////////////////////////////////////////////////////
function wc_addCookie(c_name,value,expiredays){
	var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+ ";path=/"+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function checkCompareCookie(){

	var value = null;
	value = wc_getCookie( "COMPARE_" + GLOBAL_STORE_ID );
	
	if(value!=null && value.indexOf('=')>0){
		
		var productInfo = value.split('&');
	
		for(i=0;i<productInfo.length;i++){
			var partNumber = productInfo[i].split(':')[0].substring(productInfo[i].split(':')[0].indexOf('=')+1,productInfo[i].split(':')[0].length);
			var elementId = 'product' + partNumber;
			
			if(document.getElementById(elementId)!= null){
				document.getElementById(elementId).checked=true;				
			}
		}
	}
}
