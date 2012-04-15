/*
 * cmcustom.js 
 * $Id: cmcustom-MASTER.txt 133931 2009-09-08 11:11:57Z wbird $
 * $Revision: 133931 $
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 * 09/08/10	WBIRD	- initial cmcustom created
 */
  
var virtual_cat;

/*Creates a custom tag for Forsee integration*/
function cmCreateForseeTag(respondentID, surveyName) {
	cmMakeTag(["tid","7","li","100003","ps1",respondentID,"ps2",surveyName]);
}

function cmCreateProductviewTag(productID, productName, categoryID, attributes, cm_vc) {
	if (virtual_cat){
		cm_vc=virtual_cat;
	}
	cmMakeTag(["tid","5","pi",c1(cm_ClientID) ? c1(cm_ClientID) : "Product: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, attributes, customerCountry) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cy",customerCountry,"cmAttributes",attributes]);
}

function myNormalizeURL(url, isHref) {

    var newURL = url;
// begin optimost URL normalization
    if (cmIndexOfParameter("oplink=", url) != -1) {
        var newURL = cmExtractParameter("oplink=",url);
    }
// end optimost URL normalization
// begin decoding of over-encoded qsp & and = in cm_re/sp params
   if (cmIndexOfParameter("cm_re", url) != -1) {
	newURL = newURL.replace("%3f","?");
	newURL = newURL.replace("%3d","=");
	newURL = newURL.replace("%26","&");
   }
   if (cmIndexOfParameter("cm_sp", url) != -1) {
	newURL = newURL.replace("%3f","?");
	newURL = newURL.replace("%3d","=");
	newURL = newURL.replace("%26","&");
   }
// end decoding of over-encoded qsp & and = in cm_re/sp params
    if (isHref) {
	    var blackList = [ "krypto=" 
                        , "wstypcd=" 
                        , "virtual_cat=" 
                        , "originalItemNumber=" 
                        , "strfnbr=" 
                        , "Now=" 
                        , "Status=" 
                        , "giftaddr=" 
                        , "sarfnbr=" 
                        , "url=" 
                        , "keyword=" 
                        , "cmReg="
		                ];
	    var paramString;
	    var paramIndex = newURL.indexOf("?");
	    var params;
	    var keepParams = new Array();
	    var goodParam;
	
	    if (paramIndex > 0) {
		paramString = newURL.substring(paramIndex+1);
		newURL = newURL.substring(0, paramIndex);
		params = paramString.split("&");
	
		for(var i=0; i<params.length; i++) {
			goodParam = true;
			for(var j=0; j<blackList.length; j++) {
				if (params[i].indexOf(blackList[j]) == 0) {
					goodParam = false;
				}
			}
			if(goodParam == true) {
				keepParams[keepParams.length] = params[i];
			}
		}
		
		newURL += "?" + keepParams.join("&");
	
	    }
	 
	    if (defaultNormalize != null) {
	        newURL = defaultNormalize(newURL, isHref);
	    }
	}	
    return newURL;
}