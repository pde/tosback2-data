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

// clear field value function: removes the default value onfocus, and adds back if nothing entered
function fieldClear(obj) {
  if(obj.Val) {
    if (obj.value == '') {
      obj.value = obj.Val;
      obj.Val = null;
      obj.first = null;
    }
    else {
      obj.Val = null;
    }
  } else if (!obj.first) {
    obj.Val = obj.value;
    obj.value = '';
    obj.first = 'true';
  }
}

function trimMe(field) {
  var value = field.value ;
  value = value.replace(/^\s+|\s+$/g,"");
  field.value = value;
}

// function to convert the field to lower case
function convertToLowerCase(field){
  var value = field.value;
  value = value.toLowerCase();
  field.value = value;
}

//function to convert the field to upper case
function convertToUpperCase(field){
  var value = field.value;
  value = value.toUpperCase();
  field.value = value;
}

var busy = false;
function Add2ShopCart(form){
      if (!busy) {
              busy = true;
              form.action="/webapp/wcs/stores/servlet/OrderItemAdd";
              //form.catEntryId.value = catEntryId;
              //form.quantity.value = catEntryQuantity;
              form.URL.value='OrderCalculate?updatePrices=1&calculationUsageId=-1&dummaryparam=1&URL=OrderItemDisplay';
              form.submit();
       }
}
// This javascript function is used by the 'Add to Wish List' button to set appropriate values before the form is submitted
// Quantity is hard-coded to value = 1, since adding to wish list does not require a valid quantity.
function Add2WishList(form)
{
  var inputsArr = form.getElementsByTagName("input");
  var i, inputID;

  for(i in inputsArr)
  {
    inputID = inputsArr[i].id;
    if ( inputID != null && inputID.indexOf("quantity") != -1 ) { inputsArr[i].value = 1; }
  }

       if (!busy) {
              busy = true;
              form.action="/webapp/wcs/stores/servlet/InterestItemAdd";
             // form.catEntryId.value = catEntryId;
              form.URL.value='InterestItemDisplay';
              form.submit();
       }
}

// This javascript display the value of the 'keyName' stored in 'cookieName'. If value is null then display "0".
// This script is used to display Items for cookie CVMINICART & balancePoints for CVREWRDPOINTS cookies
function displayIntegerValue(cookieName, keyName)
{
  //alert("IN displayCartItems method");
  var str = "0";
  str = getUserCookieValue(cookieName, keyName);
  if(str == null)
    str = "0";
  document.write(str);
}

/**
 * Updates number of products in cart, using value stored in cookie
 * @param {string} n Name of store and user specific cookie
 * @param {string} k Name of key within cookie
 * @param {string}id ID of dom element to insert quantity
 * @return {undefined}
 */
function displayMiniCartQty(n,k,id){
  var elm = document.getElementById(id), qty = getUserCookieValue(n,k);
  if(typeof elm != 'undefined'){
    elm.innerHTML = qty ? qty : "0";
  }
}

// This javascript display the value of the 'keyName' stored in 'cookieName'. If value is null then display "0.00".
// If value is integer then it appends the .00 after the integer value.
// This script is used to display Items amount total for cookie CVMINICART & balanceAmount for CVREWRDPOINTS cookies
function displayAmountValue(cookieName, keyName)
{
  //alert("IN displayCartItems method");
  var str = "0.00";
  str = getUserCookieValue(cookieName, keyName);
  if (str != null)
  {
    var iDotIndex = str.indexOf(".");
    if (str.length - iDotIndex > 3)
      str = str.substring(0, iDotIndex + 3);
    else if (iDotIndex != -1 && str.length - iDotIndex == 2)
      str = str + "0";
    else if (iDotIndex == -1)
      str = str + ".00";
  }
  else
  {
    str = "0.00";
  }

  document.write(str);
}

function getUserCookieValue(cookieName, keyName)
{
 //alert("in getUserCookieValue");
 var cookieValue = getCookie(cookieName);
 //alert("cookieValue="+cookieValue);
  if ( cookieValue == null )
   return null;
 var  nameDelimiter = "@" ;
 var pairDelimiter = "~~~" ;
 var matchPattern = keyName + pairDelimiter + '(.*?)(' + nameDelimiter +')';
 //alert("match partern = "+matchPattern);
 var results = cookieValue.match ( matchPattern);
 //alert("resutls="+results);
  if ( results )
    return ( unescape ( results[1] ) );
  else
    return null;
}

function getCookie ( cookieName )
{
  var results = document.cookie.match ( cookieName + '=(.*?)(;|$)' );
  if ( results )
    return ( unescape ( results[1] ) );
  else
    return null;
}

// Checks whether inputStr has a valid value.
function isEmpty(inputStr)
{
  if (inputStr == null) {
    return true;
  } else {
    return !inputStr.match(/[^\s]/);
  }
}



// Added by Greg Landers - 8/31/2011 for popping video on a product detail page in a shadow box.
//document.write('<script type="text/javascript" language="javascript" src="../../shadowbox-3.0.3/shadowbox.js"></scr'+'ipt>');
//document.write('<link rel="stylesheet" href="//media.basspro.com/shadowbox-3.0.3/shadowbox.css" type="text/css" />');
