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

function submitCheetahEmail(){
	if (isValidEmail(document.EmailSignup.email.value)){
		document.EmailSignup.submit();
	}else{
		alert('The email address format is invalid.  Please enter a valid email address.');
	}
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
		return false;
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

//////////////////////////////////////////////////////////
//This function will return the value of a cookie
//
//arg1 = cookie name
//Return the value of the cookie
//////////////////////////////////////////////////////////
function getCookie(name) {

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


function appendWishListParamsTo(id, isEncoded)
{
	var paramString = "";
		//extract information
		var attrNameObj = document.getElementsByName("attrName");
		if(attrNameObj != null) attrNameObj = attrNameObj[0];
		var attrName = "";
		if (attrNameObj != null) attrName = attrNameObj.value;
		
		var attrValueObj = document.getElementsByName("attrValue");
		if(attrValueObj != null) attrValueObj = attrValueObj[0];
		var attrValue = "";
		if (attrValueObj != null) attrValue = attrValueObj.value;
		
		if(attrName != "" && attrValue != "")
				paramString += "&attrName="+ attrName + "&attrValue=" + attrValue;
		
		var valueList = document.getElementsByName("attrValue");		
		if (valueList != null) valueList = valueList[0];
		
		var field2 = "";
		if(valueList != null) field2 = valueList.options[valueList.selectedIndex].text;
		if(field2 != "") paramString += "&field2=" + field2;
		
		var link = document.getElementById(id);
		if(link != null)
		{
			//if not logged in, encode parameters before combining
			if(isEncoded) 
				link.href = link.href + encodeURIComponent(paramString);
			else 
				link.href = link.href + paramString;
		}
		return;
}

function appendPIPWishListParamsTo(id, isEncoded, form,skuedsize)
{
	var paramString = "";
		//extract information
		
		if(skuedsize == true){
			
			var attrNameObj = document.getElementsByName("attrName");
			if(attrNameObj != null) attrNameObj = attrNameObj[0];
			var attrName = "";
			if (attrNameObj != null) attrName = attrNameObj.value;
			
			var attrValueObj = document.getElementsByName("attrValue");
			if(attrValueObj != null) attrValueObj = attrValueObj[0];
			var attrValue = "";
			if (attrValueObj != null) attrValue = attrValueObj.value;
			
			if(attrName != "" && attrValue != "")
					paramString += "&attrName="+ attrName + "&attrValue=" + attrValue;
			
			var valueList = document.getElementsByName("attrValue");		
			if (valueList != null) valueList = valueList[0];
			
			var field2 = "";
			if(valueList != null) field2 = valueList.options[valueList.selectedIndex].text;
			if(field2 != "") paramString += "&field2=" + field2;
			
		}else{
		
			if (form.field2){
				field2 = form.field2.value;
			}
			if (field2 ==""){
				if (form.attrValue){
					field2 = form.attrValue.value;
				}
			}
			if(field2 != "") paramString += "&field2=" + field2;
			
		}
		
		var link = document.getElementById(id);
		if(link != null)
		{
			//if not logged in, encode parameters before combining
			if(isEncoded) 
				link.href = link.href + encodeURIComponent(paramString);
			else 
				link.href = link.href + paramString;
		}
		return;
}