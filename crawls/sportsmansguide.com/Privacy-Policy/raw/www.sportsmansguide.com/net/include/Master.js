// JScript File

function setSearchValuesFromQueryString(doc, queryStringKeyword, queryStringRefer) {
    var queryStringKeywordValue = null;
    var queryStringReferValue = null;

    if (Request.QueryString(queryStringKeyword).Count > 0) {
        queryStringKeywordValue = Request.QueryString(queryStringKeyword).Item(1);
    }
    if (Request.QueryString(queryStringRefer).Count > 0) {
        queryStringReferValue = Request.QueryString(queryStringRefer).Item(1);
    }
    
    if ((queryStringKeywordValue != null) & (queryStringKeywordValue != "")) {
        var textObject;
        var textObjectFound = false;
        for (var i = 0; i < doc.forms[0].elements.length; i++) {
            var objectId = doc.forms[0].elements[i].id;
          
           // added check for null 05/21/2007
           if ((queryStringReferValue != null))  
           {
            if (queryStringReferValue.indexOf("OAC") > 0) {
                // Any Catalog requested
                if (objectId.indexOf("ui_k_ac") > 0) {
                    textObject = doc.forms[0].elements[i];
                    textObjectFound = true;
                }
            } else {
                // Keyword Search requested
                if (objectId.indexOf("ui_k_kw") > 0) {
                    textObject = doc.forms[0].elements[i];
                    textObjectFound = true;
                }
            }
            
            if (textObjectFound) {
                break; // text field found, exit for loop
            }
           }
        }
        //alert(buttonObject.id + ";button found=" + buttonObjectFound.toString());

        if (textObjectFound) {
            // populate search value in search header
            textObject.value = queryStringKeywordValue;
            return false;       
//            event.returnValue=false;
//            event.cancel = true;
        }
    }
            
}

function windowLocationEmailDealSignup(objButton, url) {
    var emailAddress = objButton.form.ctl00_cphMain_txtEmailAddress.value;
    var qsEmailAddress = "&emailaddress=" + emailAddress;
    var qsEmailAddressVer = "&emailaddress_ver=" + emailAddress;
    
    url += qsEmailAddress + qsEmailAddressVer;
    //alert(url);
    window.parent.location.href = url;
    
    return false;
}

// refocus when a dropdown selected index changes
function selectedIndexChangeRefocus(callingObject, callingObjectId, focusId) {
    if (document.all || document.getElementById) {
        // find respective button
        var callingObjectUniqueId = callingObject.id;
        var focusUniqueId = callingObjectUniqueId.replace(callingObjectId, focusId);
        
        // iterate page controls
        var focusObject;
        var focusObjectFound = true;
        focusObject = document.getElementById(focusUniqueId);

        if (focusObjectFound) {
            // focus on the next field
            focusObject.focus();
        }
    }
    
    return false;
}

// Be sure .NET 2.0 variables loaded in browser before allowing submit
// This prevents "Validation of ViewState Mac failed" exception.
// See http://forums.asp.net/thread/1593735.aspx
function ensureDotNetVariablesExist()
{
    return !(document.getElementById("__EVENTVALIDATION")==null);
} 

	function clearValueYourEmail(oObject) {
		sfield = oObject.value
		sfield = sfield.replace(/^\s*|\s*$/g,"");
		
		if (sfield.toLowerCase() == "your e-mail") 
			{
				oObject.value = '';
			}
		}
		
		function clearValueKeyword(oObject) {
		sfield = oObject.value
		sfield = sfield.replace(/^\s*|\s*$/g,"");
		
		if (sfield.toLowerCase() == "enter keyword" || sfield.toLowerCase() == "enter keyword or item number" || sfield.toLowerCase() == "search within the club store") 
			{
				oObject.value = '';
			}
		}
		
		function clearValueAnyCatalog(oObject) {
		sfield = oObject.value
		sfield = sfield.replace(/^\s*|\s*$/g,"");
		
		if (sfield.toLowerCase() == "enter a stock number") 
			{
				oObject.value = '';
			}
		}
		
		function clearSearchHeaderValue(oObject) {
			sfield = oObject.value
			sfield = sfield.replace(/^\s*|\s*$/g,"");
			
            if (oObject.id.indexOf("ui_k_kw") >= 0)
            {
			    if (sfield.toLowerCase() == "enter keyword") 
			    {
				    oObject.value = "";
			    }
			}	

            if (oObject.id.indexOf("ui_k_ac") >= 0)
            {
			    if (sfield.toLowerCase() == "enter a stock number") 
			    {
				    oObject.value = "";
			    }
			}
		}

		function clearSectionEmailAddressValue(oObject) {
			sfield = oObject.value
			
            if (oObject.id.indexOf("txtEmailAddress") > 0)
            {
			    if (sfield.toLowerCase() == "your e-mail") 
			    {
				    oObject.value = "";
			    }
			}
		}
		
        function ensureDotNetVariablesExist()
        {
            return !(document.getElementById("__PREVIOUSPAGE")==null);
        }
        
        function getTop(obj)
        {
            var T= 0;
            while(obj)
            {
                T+= obj.offsetTop;
                obj= obj.offsetParent;
            }
            return T;   
        }
        
        function getLeft(obj)
        {
            var L= 0;
            while(obj)
            {
                L+= obj.offsetLeft;
                obj= obj.offsetParent;
            }
            return L;   
        }
    
    	function checkValue(sfieldId) {
			var searchVal;
            var searchFld = document.getElementById(sfieldId);
            if (searchFld != null)
            {
                searchVal = searchFld.value;
                if (sfieldId.indexOf("txtKeyword") >= 0 && (searchVal == "Enter keyword" || searchVal == ""))
                {
				    alert("Please enter a keyword into the search box to find items that relate to that word.");
				    return false;
                }
                if (sfieldId.indexOf("txtStockNumber") >=0 && (searchVal == "Enter a stock number" || searchVal == ""))
                {
 				    alert("Please enter a stock number into the search box to view the item information.");
				    return false;                   
                }
            }
		}

		function clearValue(oObject) {
			sfield = oObject.value
			sfield = sfield.replace(/^\s*|\s*$/g,"");
			
            if (oObject.id.indexOf("txtKeyword") > 0)
            {
			    if (sfield == "Enter keyword") 
			    {
				    oObject.value = "";
			    }
			}	

            if (oObject.id.indexOf("txtStockNumber") > 0)
            {
			    if (sfield == "Enter a stock number") 
			    {
				    oObject.value = "";
			    }
			}
		}