////////////// Start of CookieHelper //////////////////////////////////////
/* ####################### start set cookie  ####################### */

function setNoEscapeCookie(name, value, expires, path, domain, secure) {

  var thisCookie = name + "=" + value +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "; path=/") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = thisCookie;
}


function setCookie(name, value, expires, path, domain, secure) {


  var thisCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = thisCookie;
}
/* ####################### start show cookie ####################### */

function showCookie(){

alert(unescape(document.cookie));
}
/* ####################### start get cookie value ####################### */

function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
/* ####################### end get cookie value ####################### */

}
/* ####################### start get cookie (name) ####################### */

function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 
  }
  return null;
}
/* ####################### end get cookie (name) ####################### */

/* ####################### start delete cookie ####################### */
function DeleteCookie (name,path,domain) {
  if (GetCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}
/* ####################### end of delete cookie ####################### */


/* ####################### start setSubCookieAndCookie ####################### */
function setSubCookieAndCookie(cookieName, subCookieName, subCookieValue)
{
	var cookieValue = GetCookie(cookieName);
	if (cookieValue == null) {
		cookieValue = "";
	}
	if(cookieValue.length ==0) {
		cookieValue = subCookieName + '=' + subCookieValue;
	}
	else {
		var posStart = cookieValue.indexOf(subCookieName + '=');
		var posEnd = cookieValue.indexOf('&', posStart+1);
		if (posEnd == -1) {
			posEnd = cookieValue.length;
		}
		if (posStart >= 0 && posEnd > 0) {
			cookieValue = cookieValue.substring(0, posStart) +
			subCookieName + '=' + subCookieValue +
			cookieValue.substring(posEnd, cookieValue.length);
			}
		else {
			if (cookieValue.length > 0){
				cookieValue = cookieValue + '&' + subCookieName + '=' + subCookieValue;
				}
			}
		
	}
	setNoEscapeCookie(cookieName, cookieValue);
}

function myCustomAlert()
{
	alert("myCustomAlert");
}
/* ####################### end setSubCookieAndCookie ####################### */

/* ####################### start GetSubCookie ####################### */
function GetSubCookieValue(cookieName, subCookieName)
{
	var cookieValue = GetCookie(cookieName);
	if (cookieValue != null)
	{
		if (cookieValue.length > 0)
		{
			var arrSubCookies = cookieValue.split('&');
			for(var i = 0; i < arrSubCookies.length; i++)
			{
				if (arrSubCookies[i].indexOf(subCookieName) == 0)
				{
					return arrSubCookies[i].substring(subCookieName.length+1,arrSubCookies[i].length);
				}
			}
		}
	}
	return null;	
}
/* ####################### end GetSubCookie ####################### */
/* ####################### cookie functions for microsite integration ####################### */


function SetVendorCookie(vendorName)
{
    var cookieValue = GetSubCookieValue('Basket', 'Indy.Basket.BasketCount');
    
    if (cookieValue != null && cookieValue != "")
    {
	   Set_CookieForVendor(vendorName + ".Basket.BasketCount",cookieValue,30);
	}
    else
    {
	    DeleteCookie_Vendor(vendorName + '.Basket.BasketCount');
	}
	
    cookieValue = Get_CookieForVendor('LastViewedProducts');
    if (cookieValue != null && cookieValue != "")
    {
	   Set_CookieForVendor(vendorName + ".LastViewedProducts",cookieValue,30);
	}
    else
    {
	    DeleteCookie_Vendor(vendorName + '.LastViewedProducts');
	}
	
	cookieValue = GetSubCookieValue('User','Indy.FirstName');
    if (cookieValue != null)
    {
       setSubCookieAndCookieForVendor(vendorName + '.User', vendorName + '.FirstName', GetSubCookieValue('User','Indy.FirstName'));
       setSubCookieAndCookieForVendor(vendorName + '.User',vendorName + '.HasAdsCard',GetSubCookieValue('User','Indy.HasAdsCard'));
       setSubCookieAndCookieForVendor(vendorName + '.User',vendorName + '.HasPreApprovedOffer',GetSubCookieValue('User','Indy.HasPreApprovedOffer'));
       setSubCookieAndCookieForVendor(vendorName + '.User',vendorName + '.CreditInfoString',GetSubCookieValue('User','Indy.CreditInfoString'));
       setSubCookieAndCookieForVendor(vendorName + '.User',vendorName + '.PreApprovedCardType',GetSubCookieValue('User','Indy.PreApprovedCardType'));
       setSubCookieAndCookieForVendor(vendorName + '.User',vendorName + '.PreApprovedOfferDeclined',GetSubCookieValue('User','Indy.PreApprovedOfferDeclined'));        
       setSubCookieAndCookieForVendor(vendorName + '.User',vendorName + '.MasterId',GetSubCookieValue('User','Indy.MasterId'));        
       setSubCookieAndCookieForVendor(vendorName + '.User',vendorName + '.ShoppersClubMember',GetSubCookieValue('User','Indy.ShoppersClubMember'));        
	}
    else
    {
         DeleteCookie_Vendor(vendorName + '.PreApprovedCardType');
         DeleteCookie_Vendor(vendorName + '.FirstName');
         DeleteCookie_Vendor(vendorName + '.HasAdsCard');
         DeleteCookie_Vendor(vendorName + '.HasPreApprovedOffer');
         DeleteCookie_Vendor(vendorName + '.CreditInfoString');
         DeleteCookie_Vendor(vendorName + '.PreApprovedOfferDeclined');
         DeleteCookie_Vendor(vendorName + '.User');     
	}
}
function Get_CookieForVendor(cookiename) 
	{
 var cookiestring=""+document.cookie;
 var index1=cookiestring.indexOf(cookiename);
 if (index1==-1 || cookiename=="") return ""; 
 var index2=cookiestring.indexOf(';',index1);
 if (index2==-1) index2=cookiestring.length; 
 return unescape(cookiestring.substring(index1+cookiename.length+1,index2));
	}

function Set_CookieForVendor(name,value,durataion){
var domainName = getDomain();
if(domainName)
    cookiestring=name+"="+value+";EXPIRES="+getexpirydate(durataion)+";DOMAIN="+ domainName + ";path=/";
else
    cookiestring=name+"="+value+";EXPIRES="+getexpirydate(durataion)+";path=/";
    
//cookiestring=name+"="+value+";EXPIRES="+getexpirydate(durataion)+ ";path=/";
document.cookie=cookiestring;
}
function DeleteCookie_Vendor( name )
{
    var domainName = getDomain();
    if(domainName)
        document.cookie = name + "=;path=/;DOMAIN=" + domainName + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    else
        document.cookie = name + "=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function getexpirydate( nodays){
var UTCstring;
if (nodays == 0)
	return 0;
Today = new Date();
nomilli=Date.parse(Today);
Today.setTime(nomilli+nodays*24*60*60*1000);
UTCstring = Today.toUTCString();
return UTCstring;
}

function getDomain()
{
    var domainname = document.location.hostname;
    if(domainname == "localhost")
        return null;
    var dotIndex = domainname.indexOf(".");
    return domainname.substring(dotIndex, domainname.length);
}
        
function setSubCookieAndCookieForVendor(cookieName, subCookieName, subCookieValue)
{
	var cookieValue = GetCookie(cookieName);
	if (cookieValue == null) {
		cookieValue = "";
	}
	if(cookieValue.length ==0) {
		cookieValue = subCookieName + '=' + subCookieValue;
	}
	else {
		var posStart = cookieValue.indexOf(subCookieName + '=');
		var posEnd = cookieValue.indexOf('&', posStart+1);
		if (posEnd == -1) {
			posEnd = cookieValue.length;
		}
		if (posStart >= 0 && posEnd > 0) {
			cookieValue = cookieValue.substring(0, posStart) +
			subCookieName + '=' + subCookieValue +
			cookieValue.substring(posEnd, cookieValue.length);
			}
		else {
			if (cookieValue.length > 0){
				cookieValue = cookieValue + '&' + subCookieName + '=' + subCookieValue;
				}
			}
		
	}
	Set_CookieForVendor(cookieName, cookieValue,30);
	
}
/* ####################### cookie functions for Art Select ####################### */

/*Required to clean 1.1 version cookie for basket count*/
DeleteCookie ('Indy.Basket.BasketCount','/');

/*************************Get Decode Values from Cookie **************************/
function GetDecodedCookieValue(name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return decode(getCookieVal (j));
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 
  }
  return null;
}

/* ####################### start GetSubCookie ####################### */
function GetDecodedSubCookieValue(cookieName, subCookieName)
{
	var cookieValue = GetCookie(cookieName);
	if (cookieValue != null)
	{
		if (cookieValue.length > 0)
		{
			var arrSubCookies = cookieValue.split('&');
			for(var i = 0; i < arrSubCookies.length; i++)
			{
				if (arrSubCookies[i].indexOf(subCookieName) == 0)
				{
					return decode(arrSubCookies[i].substring(subCookieName.length+1,arrSubCookies[i].length));
				}
			}
		}
	}
	return null;	
}

function CopyOmnitureVisitorIdCookie(sendVisitorIdUrl, cookieName)
{
    if (window == top)
     {
        // do nothing if on https page
        var protocol = parent.location.protocol;
        if (typeof (protocol) == "undefined" || protocol == null || protocol.indexOf("https") != -1) 
        {
            return;
        }

        // prepare pixel only if visitor cookie is not present
        var visitorCookie = GetCookie(cookieName);
        if (typeof (visitorCookie) == "undefined" || visitorCookie == null) 
        {
            document.write("<img src='" + sendVisitorIdUrl + "' style='display:none' />");
        }
    }
}
//////////////// End of CookieHelper //////////////////////////////////////
////////////// Start of Base64EncodingHelper //////////////////////////////
//New decoder
function decode(mystring) 
{
	b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	pad="000000";
	pads = mystring.match(/=+/) ? mystring.match(/=+/)[0].length : 0;
	mystring=mystring.replace(/=/g,"A");
	out="";
	for (var i = 0; i<mystring.length; i+=4) 
	{
		temp=((b64.indexOf(mystring.charAt(i))<<18) + (b64.indexOf(mystring.charAt(i+1))<<12) + (b64.indexOf(mystring.charAt(i+2))<<6) + (b64.indexOf(mystring.charAt(i+3)))).toString(16);
		out+=(pad.substring(0,6-temp.length)+temp).replace(/../g,"%$&");
	}
	out=unescape(out.substring(0,out.length-pads*3).replace(/%00/g,""));
	return out
} 




//Old decoder
var base64 = [ 
       'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',   //  0 to  7 
       'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',   //  8 to 15 
       'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',   // 16 to 23 
       'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',   // 24 to 31 
       'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',   // 32 to 39 
       'o', 'p', 'q', 'r', 's', 't', 'u', 'v',   // 40 to 47 
       'w', 'x', 'y', 'z', '0', '1', '2', '3',   // 48 to 55 
       '4', '5', '6', '7', '8', '9', '+', '/' ]; // 56 to 63 

function charFromCharCode (charCode) { 
    return unescape('%' + charCode.toString(16)); 
} 

function reverseBase64 () { 
  var r = new Object(); 
  for (var i = 0; i < 64; i++) { 
    r[base64[i]] = i; 
  } 
  return r; 
} 

var reversedBase64 = reverseBase64(); 

function unicodelessDecode (encStr) { 
    var charCodes = new Array(); 
    var decStr = ""; 

    /* charCodes contains the index values into the base64 array 
       for each character in the encoded string */ 
    for (var i = 0; i < encStr.length; i++) 
        charCodes[i] = reversedBase64[encStr.charAt(i)]; 

    for (var i = 0; i < encStr.length; i += 4) { 
        /* bits24 is 4 groups of 6-bit character indexes */ 
        var bits24  = ( charCodes [i]     & 0xFF  ) <<  18; 
            bits24 |= ( charCodes [i + 1] & 0xFF  ) <<  12; 
            bits24 |= ( charCodes [i + 2] & 0xFF  ) <<   6; 
            bits24 |= ( charCodes [i + 3] & 0xFF  ) <<   0; 

        /* grab the character for the first 8 bits by masking off the 
           last 16 bits and then shifting right */ 
        decStr     += charFromCharCode((bits24 & 0xFF0000) >> 16); 

        /* if the next characer is a pad character, there won't be a charCode 
           for it; so charCodes[] will return false and the character won't 
           be decoded. */ 

        /* grab the character for the second 8 bits by masking off the 
           last 8 bits and then shifting right */ 
        if (charCodes[i + 2])  // check for padding character = 
            decStr += charFromCharCode((bits24 &   0xFF00) >>  8); 


        /* grab the character for the last 8 bits */ 
        if (charCodes[i + 3])  // check for padding character = 
            decStr += charFromCharCode((bits24 &     0xFF) >>  0); 
   } 
   return decStr; 
} 
//////////////// End of Base64EncodingHelper //////////////////////////////
////////////// Start of HeaderCookieHelper ////////////////////////////////
	
	//Function Name:CardInfoMessageEx  Created By:Simon Huang Created Date: 06/09/2006
	//Purpose: This function is used to show the pre-approve image link at header next my promotions;
    //          If user has been pre-approved, the pre-approve image and link will show up, otherwise, not show this link and image	            
	function CardInfoMessageEx(userCookie,cookieStringCreditInfo, cookieStringPreApprovedOfferDeclined, ccLinkID, ccImageID)
	{	
	
		var cookieValueCreditInfo  = GetUserSubCookieValue(userCookie, cookieStringCreditInfo);
		var cookieValuePreApprovedOfferDeclined  = GetUserSubCookieValue(userCookie, cookieStringPreApprovedOfferDeclined);

		//alert(cookieValueCreditInfo);
		var ccLink = document.getElementById(ccLinkID);
		var ccImage  = document.getElementById(ccImageID);		
		
		
		
		if(ccLink == null || ccImage == null)
		{
			return;
			
		}
		
		var urlBase = "https://secureimages.plussizetech.com/images/site_images/mastersite/";
				
		var imagePre = urlBase + "77_preapproved_chkbx.gif";
			
		
		if (cookieValueCreditInfo != null && cookieValueCreditInfo.length > 0)
		{
			
            var offerDeclined = false;
		    if (cookieValuePreApprovedOfferDeclined != null)
		    {
		        if (cookieValuePreApprovedOfferDeclined == "true")
		        {
		            offerDeclined = true;
		        }
		    }

			var  startIndex= 0;
			
			var endIndex = cookieValueCreditInfo.indexOf(';');
			
			//Credit Indicator is the first value and Offerseen is the 4th value in the cookie.
			//Please see the UserInfo Class to see the exact order.
			var creditIndicator  =  cookieValueCreditInfo.substring(startIndex, endIndex);
			//alert(creditIndicator);
				
			if (creditIndicator.toUpperCase() == "P")
			{
			    //alert("p");
			    if (!offerDeclined)
			    {
				    ccLink.style.display="inline";
				    ccImage.style.display="inline";
				    ccLink.href = "/Account/Acct_PreQualifiedOffer_common.aspx";
				    ccImage.src = imagePre;
				}
				
			}
			else// hidden this link and image
			{
				//alert("O");
				ccLink.style.display="none";
				ccImage.style.display="none";
			}

		}
		else
		{
		    //alert("sd");
			ccLink.style.display="none";
			ccImage.style.display="none";
		}
	}
	//This function has one more hyperlink to handle for Special size
	function CardInfoMessageNew(userCookie, cookieStringCreditInfo, cookieStringPreApprovedCardType, ccLinkID, ccImageID)
	{	
	
		var cookieValueCreditInfo  = GetUserSubCookieValue(userCookie, cookieStringCreditInfo);
		var cookieValuePreApprovedCardType = GetCookieValueFor(cookieStringPreApprovedCardType);
		
		cookieValuePreApprovedCardType = cookieValuePreApprovedCardType.substring(0, 4);
		
		var ccLink = document.getElementById(ccLinkID);
		var ccImage  = document.getElementById(ccImageID);		
		
		var urlBase;
		
		if(window.location.protocol.indexOf("s")>0)
		{
		    urlBase = "https://secureimages.plussizetech.com/images/site_images/mastersite/";
		}
		else
		{
		    urlBase = "http://images.plussizetech.com/images/site_images/mastersite/";
		}
			
		var imageOTB = urlBase + "77_footer_otb-328.gif";
		var imagePre;
		var imageStandard = urlBase + "77_footer_apply-328.gif";
		
		if (cookieValuePreApprovedCardType != null && cookieValuePreApprovedCardType.length > 0)
		{
		    if (cookieValuePreApprovedCardType == "plcc")
		    {
		        imagePre = urlBase + "77_footer_pre_plcc-328.gif"
		    }
		    else if (cookieValuePreApprovedCardType == "cobr")
		    {
		        imagePre = urlBase + "77_footer_pre_cobrnd-328.gif"
		    }
		    else
		    {
		        imagePre = imageStandard;
		    }
		}
		else
		{
		    imagePre = imageStandard;
		}
		
			
		//alert(cookieValueCreditInfo);
		if (cookieValueCreditInfo != null && cookieValueCreditInfo.length > 0)
		{
			
			var  startIndex= 0;
			
			var endIndex = cookieValueCreditInfo.indexOf(';');
			
			//Credit Indicator is the first value and Offerseen is the 4th value in the cookie.
			//Please see the UserInfo Class to see the exact order.
			var creditIndicator  =  cookieValueCreditInfo.substring(startIndex, endIndex);
			
			if (creditIndicator.toUpperCase() == "A")
			{
				ccLink.href = "/Account/Acct_CreditCards.aspx?MEC=OS07_005_06_06_01";
				//ccLink1.href ="/Account/Acct_CreditCards.aspx";
				ccImage.src = imageOTB;
			}
			else if (creditIndicator.toUpperCase() == "P" )
			{
				
				if (cookieValuePreApprovedCardType != null && cookieValuePreApprovedCardType.length > 0)
		        {
		            if (cookieValuePreApprovedCardType == "plcc")
		            {
		                ccLink.href = "/Account/Acct_PreQualifiedOffer_plcc.aspx?MEC=OS07_004_06_06_01";
		            }
		            else if (cookieValuePreApprovedCardType == "cobr")
		            {
		                ccLink.href = "/Account/Acct_PreQualifiedOffer_cobrnd.aspx?MEC=OS07_006_06_06_01";
		            }
		            else
		            {
		                ccLink.href = "/Account/Apply_CreditCard.aspx?MEC=OS07_003_06_06_01";
		            }
		        }
		        else
		        {
		            ccLink.href = "/Account/Apply_CreditCard.aspx?MEC=OS07_003_06_06_01";
		        }
				ccImage.src = imagePre;
				
			}
			else if(creditIndicator.toUpperCase()=="R")
			{
				ccLink.href = "/Account/Acct_PreQualifiedOffer_common.aspx";
				//ccLink1.href = "/Account/Acct_PreQualifiedOfferDetails.aspx";
				ccImage.src = imagePre;

			}
			else
			{
				ccLink.href = "/Account/Apply_CreditCard.aspx?MEC=OS07_003_06_06_01";
				//ccLink1.href = "/Account/Apply_CreditCard.aspx";
				ccImage.src = imageStandard;
			}

		}
		else
		{
			if(ccLink!=null)
			{
			    ccLink.href = "/Account/Apply_CreditCard.aspx?MEC=OS07_003_06_06_01";
			    //ccLink1.href = "/Account/Apply_CreditCard.aspx";
			    ccImage.src = imageStandard;
			}
		}
	}
	function CardInfoMessage(userCookie, cookieStringCreditInfo, ccLinkID, ccImageID)
	{	
	
		var cookieValueCreditInfo  = GetUserSubCookieValue(userCookie, cookieStringCreditInfo);
		
		var ccLink = document.getElementById(ccLinkID);
		var ccImage  = document.getElementById(ccImageID);		
		
		
		
		if(ccLink == null || ccImage == null)
		{
			return;
			
		}
		
		var urlBase = "https://secureimages.plussizetech.com/images/site_images/womanwithin/";
			
		
				
		var imageOTB = urlBase + "footer_z2_credit_openToBuy.gif";

		var imagePre = urlBase + "77_preapproved_chkbx.gif";
		
		var imageStandard = urlBase + "footer_z2_credit_standard.gif";
		
			
		
		if (cookieValueCreditInfo != null && cookieValueCreditInfo.length > 0)
		{
			
			var  startIndex= 0;
			
			var endIndex = cookieValueCreditInfo.indexOf(';');
			
			//Credit Indicator is the first value and Offerseen is the 4th value in the cookie.
			//Please see the UserInfo Class to see the exact order.
			var creditIndicator  =  cookieValueCreditInfo.substring(startIndex, endIndex);
			
			if (creditIndicator.toUpperCase() == "A")
			{
				ccLink.href = "/Account/Acct_CreditCards.aspx";
				ccImage.src = imageOTB;
			}
			else if (creditIndicator.toUpperCase() == "P")
			{
				
				ccLink.href = "/Account/Acct_PreQualifiedOffer_common.aspx";
				ccImage.src = imagePre;
				
			}
			else
			{
				
				ccLink.href = "/Account/Apply_CreditCard.aspx";
				ccImage.src = imageStandard;
			}

		}
		else
		{
			ccLink.href = "/Account/Apply_CreditCard.aspx";
			ccImage.src = imageStandard;
		}
	}
	
	//link to different pages
	function CardInfoLink(userCookie, cookieStringCreditInfo, cookieStringHasCard, cookieStringPreApprovedOfferDeclined, ccLinkID)
	{	
		var cookieValueCreditInfo  = GetUserSubCookieValue(userCookie, cookieStringCreditInfo);
		var cookieValueHasCard  = GetUserSubCookieValue(userCookie, cookieStringHasCard);
		var cookieValuePreApprovedOfferDeclined  = GetUserSubCookieValue(userCookie, cookieStringPreApprovedOfferDeclined);

		
		
		var ccLink = document.getElementById(ccLinkID);
		
		
		if(ccLink == null)
		{
			return;
			
		}		
				
		if (cookieValueCreditInfo != null && cookieValueCreditInfo.length > 0 && cookieValueHasCard != null && cookieValueHasCard.length > 0)
		{
			
            var offerDeclined = false;
		    if (cookieValuePreApprovedOfferDeclined != null)
		    {
		        if (cookieValuePreApprovedOfferDeclined == "true")
		        {
		            offerDeclined = true;
		        }
		    }

			var  startIndex= 0;
			
			var endIndex = cookieValueCreditInfo.indexOf(';');
			
			//Credit Indicator is the first value and Offerseen is the 4th value in the cookie.
			//Please see the UserInfo Class to see the exact order.
			var creditIndicator  =  cookieValueCreditInfo.substring(startIndex, endIndex);
			var hasotherCard = false;
			
			if(cookieValueHasCard.toUpperCase() == "TRUE")
			{
				hasotherCard = true;
			}					
			
			if (creditIndicator.toUpperCase() == "A")
			{
				ccLink.href = "/Account/Acct_CreditCards.aspx";
				
			}
			else if (creditIndicator.toUpperCase() == "P")
			{
				if (!offerDeclined)
				    ccLink.href = "/Account/Acct_PreQualifiedOffer_common.aspx";
				
				
			}
			else if(hasotherCard)
			{
				
				ccLink.href = "/Account/Acct_CreditCards.aspx";
				
			}
			else
			{
				
				ccLink.href = "/Account/Apply_CreditCard.aspx";
				
			}

		}
		else
		{
			ccLink.href = "/Account/Apply_CreditCard.aspx";
			
		}
	}
	
	
	function YourCreditCardLink(userCookie, cookieStringCreditInfo, cookieStringHasAdsCard, cookieStringPreApprovedOfferDeclined, ccLinkID)
	{	
	    var cookieValueCreditInfo  = GetUserSubCookieValue(userCookie, cookieStringCreditInfo);
		var cookieValueHasAdsCard  = GetUserSubCookieValue(userCookie, cookieStringHasAdsCard);
		var cookieValuePreApprovedOfferDeclined  = GetUserSubCookieValue(userCookie, cookieStringPreApprovedOfferDeclined);
		
		var ccLink = document.getElementById(ccLinkID);
		
		
		if(ccLink == null)
		{
			return;
		}		
				
		if (cookieValueCreditInfo != null && cookieValueCreditInfo.length > 0 && cookieValueHasAdsCard != null && cookieValueHasAdsCard.length > 0)
		{
		    var offerDeclined = false;
		    if (cookieValuePreApprovedOfferDeclined != null)
		    {
		        if (cookieValuePreApprovedOfferDeclined == "true")
		        {
		            offerDeclined = true;
		        }
		    }
			
			var  startIndex= 0;
			
			var endIndex = cookieValueCreditInfo.indexOf(';');
			
			//Credit Indicator is the first value and Offerseen is the 4th value in the cookie.
			//Please see the UserInfo Class to see the exact order.
			var creditIndicator  =  cookieValueCreditInfo.substring(startIndex, endIndex);
			var hasotherCard = false;
			
			if(cookieValueHasAdsCard.toUpperCase() == "TRUE")
			{
				hasotherCard = true;
			}					
			
			// Check if the user has approved brand card
			var hasApprovedBrandCard = false;
			if (creditIndicator.toUpperCase() == "A")
			{
			    hasApprovedBrandCard = true;
			}
			
			// Check if the user is preapproved
			var preApproved = false;
			if (creditIndicator.toUpperCase() == "P")
			{
			    preApproved = true;
			}
			
			if((hasotherCard || hasApprovedBrandCard) && !offerDeclined && !preApproved)
			{
			    ccLink.style.display="inline";
			}
		}
	}
	
	function WelcomeMessageInterface(userCookieName, cookieStringFirstName, nameLabel,welcomeLabel, disconnectHyperLink, wishListSpan)
	{
		var cookieValueFirstName  = GetUserSubCookieValue(userCookieName,cookieStringFirstName);
		
		
		var _disconnectHyperLink = document.getElementById(disconnectHyperLink);
		var _nameLabel = document.getElementById(nameLabel);
		var _welcomeLabel = document.getElementById(welcomeLabel);
		
		var _wishListSpan = null;
		
		
		if(wishListSpan != null && wishListSpan.length > 0)
		{
			_wishListSpan = document.getElementById(wishListSpan);
			
		}
		
		if(	_welcomeLabel == null || _nameLabel == null || _disconnectHyperLink == null)
		{
			return;
		}
		
		if (cookieValueFirstName != null && cookieValueFirstName.length > 0)
		{
			
			var temp = new String(cookieValueFirstName);
			
			cookieValueFirstName = temp.toLowerCase();
			
			
			_welcomeLabel.innerHTML = "Welcome back, " + " <span class='capitalize'>" + cookieValueFirstName + "</span>! ";
			
			_disconnectHyperLink.innerHTML = " Not <span class='capitalize'>" + cookieValueFirstName + "</span>?";
			
			if(_wishListSpan != null)
			{
				_wishListSpan.innerHTML = "&nbsp;|&nbsp;&nbsp;<a href='/account/acct_wishlist.aspx'>Wish List</a>";
				
				
			}
		
		    _nameLabel.innerHTML = "";
		}
		else
		{
			_nameLabel.innerHTML = "First time visitor? Create a <a href=/account/Acct_CreateProfile.aspx?ReturnUrl=%2fAccount%2fAcct_Main.aspx>New Account</a>";
			_nameLabel.style.fontWeight ='normal';

			_welcomeLabel.innerHTML = "Welcome. <a href=/account/acct_login.aspx?ReturnUrl=%2fAccount%2fAcct_Main.aspx>Log In</a>  " ;
					
			_disconnectHyperLink.innerHTML = "";
			
			if(_wishListSpan != null)
			{
				_wishListSpan.innerHTML = "";				
				
			}
		}
	}
	
	
	function ProductMessageInterface(cookieStringProduct, viewProductLinkID, dividerID)
	{	
		var cookieValueProduct  = GetCookieValueFor(cookieStringProduct);		
		var viewProductLink = document.getElementById(viewProductLinkID);	
		var divider = document.getElementById(dividerID);
		
		if(viewProductLink != null)
		{
			if (cookieValueProduct != null && cookieValueProduct.length > 0)
			{
				
				viewProductLink.style.display  = "";
				if(divider !=  null)
				{
					divider.style.display  = "";
				}
			
			}
			else
			{
				viewProductLink.style.display  = "none";				
				if(divider !=  null)
				{
					divider.style.display  = "none";
				}
				
			}
		}	
		
	}
	
	
	function GetCookieValueFor(CookieNameString)
	{
		var cookieContents = this.document.cookie; 
		var startIndex = cookieContents.indexOf(CookieNameString + '=');
		var cookieValue = "";
		
		if (startIndex != -1)
		{
			startIndex += CookieNameString.length + 1;
			
			var endIndex = cookieContents.indexOf(';', startIndex);
			if (endIndex == -1)
				endIndex = cookieContents.length;
		
			cookieValue = decode(cookieContents.substring(startIndex, endIndex)).replace(/%0/g, '');
		
			if (cookieValue.substring(0,3) == '%$&')
				cookieValue = unicodelessDecode(cookieContents.substring(startIndex, endIndex)).replace(/%0/g, '');
		}
		
		return cookieValue;
	}
	
	function GetUserSubCookieValue(userCookie, subcookieName)
	{
	    var rawCookieValue =  GetSubCookieValue(userCookie, subcookieName);
	    var cookieValue = rawCookieValue;
	    
	     if(rawCookieValue != null)
	    {
	        cookieValue = decode(rawCookieValue).replace(/%0/g, '');		
	        
	        if (cookieValue.substring(0,3) == '%$&')
				cookieValue = unicodelessDecode(rawCookieValue).replace(/%0/g, '');
		
	    }
	    
	    //alert(cookieValue);
	    return cookieValue;
	}
	
	function GetMPID()
	{
	    var rawCookieValue =  GetSubCookieValue("OM", "MPID");
	    var cookieValue = rawCookieValue;	    
	     if(rawCookieValue != null)
	    {
	        cookieValue = decode(rawCookieValue).replace(/%0/g, '');			        
	        if (cookieValue.substring(0,3) == '%$&')
				cookieValue = unicodelessDecode(rawCookieValue).replace(/%0/g, '');		
	    }
	    return cookieValue;   
	}
////////////// End of HeaderCookieHelper  ////////////////////////////////
//////////////////////////////////Start of AssignEnterKey///////////////////////////////////////////
function AssignEnterKey(element, evt)
{
	if (evt.keyCode == 13)
	{
		evt.cancelBubble = true;
		evt.returnValue = false;
		if (!document.all)
		{
			document.getElementById(element).click();
		}
		else
		{
			document.all(element).click();
		}
	}
}

function DisableEnterKey(evt)
{
	if (evt.keyCode == 13)
	{
		evt.cancelBubble = true;
		evt.returnValue = false;
	}
}
//////////////////////////////////End of AssignEnterKey////////////////////////////////////////////

jQuery(document).ready(function () {
    /**** Disable copy and paste *****/
    jQuery('input.disablecopypaste').bind('copy paste', function (e) {
        e.preventDefault();
    });
});
