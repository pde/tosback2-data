//**************************************************
// ShoppingCartUtils.js
// Author: Tong Lim 
// Version: 1.1
// Date: 6/21/2008
// Update: 10/30/2008
//***************************************************

/*
Example how to call it:
	ShoppingCart.AjaxRequest('/examples/myTest/Hello.jsp', showResult);  // the second param is a function
	ShoppingCart.AjaxRequest('/examples/myTest/Hello.jsp', "output");  // the second param is a string 
	ShoppingCart.addItemsToOrder(vObjArray);
	ShoppingCart.addItemsToOrderButton(vObjArray);
	var ajax = new AjaxReq(); 
*/

var ShoppingCart = new function() {
	this.mLOSGId = null;
	var redirect = false;
	
	// below are all private function
	function incJS(filename) {
		var head = document.getElementsByTagName('head')[0];
		script = document.createElement('script');
		script.src = filename;
		script.type = 'text/javascript';
		head.appendChild(script)
	} // end of incJS
	
	if (typeof commonFunc == 'undefined') { incJS("commonFunc.js"); }
	
	function getLOSGId () {
		return this.mLOSGId;
	}
	
	function cartError(pResponse) {
		overLayDiv_id = commonFunc.overLayDiv(false);
		commonFunc.getElementObj("prog").style.display = 'none';
		commonFunc.getElementObj("updateSideCart").style.display = "";
		var vReturnUrl = pResponse.returnUrl;
		var invalidCoupon = vReturnUrl.indexOf("UVCART101") == -1 ? false : true;
		var brokeCPP = vReturnUrl.indexOf("UVCART1030") == -1 ? false : true;

		if (invalidCoupon) {
			cartErrorMessage('coupon');
		} else if (brokeCPP) {
			cartErrorMessage('CPP');
		} else { 
			showPopup('cartError',true);
		}	
	} // end of cartError

	function cartResponse (pData) {
		if (pData != null) {
			var vResponse = pData.evalJSON(); //pData.parseJSON();
			var vReturnUrl = vResponse.returnUrl;
			//var decision = vReturnUrl.indexOf("Decision") == -1 ? false : true;
			var decision = vResponse.radioSelection == undefined ? false : true; 
			var error = vReturnUrl.indexOf("Error") == -1 ? false : true;
			var success = vReturnUrl.indexOf("Success") == -1 ? false : true;

			if (success) { 
				if (redirect) {
					commonFunc.setBrowBackButStatus();
					document.location.href = v_contextRoot + "/cart/index.jsp";
				} else {
					ShoppingCart.AjaxRequest(v_contextRoot + "/cart/sideCart/coupon.jsp","cartCoupon");
					ShoppingCart.AjaxRequest(v_contextRoot + "/shop/fragments/customize/crossProductPromo.jsp?q_usedOffer="+v_usedOffer,"cppInfo");
					ShoppingCart.AjaxRequest(vReturnUrl, "customizeRightColumn");
					performWebTrendTag();
					commonFunc.overLayDiv(false);
					if (IE6) hideSelectOption(false);
				}
			} else if (decision) {
				var vParam = vResponse.radioSelection;
				var vErrorCode = vReturnUrl.indexOf("UVCART1030") == -1 ? '' : 'UVCART1030';
				showPopUPCPP(vParam, vErrorCode);
			} else if (error) { 
				cartError(vResponse);
			}
		}
	} // end of cartResponse


	// below are public function
		
	this.AjaxRequest = function AjaxRequest (pURL, pParam) {
		var ajax1 = new AjaxReq();
		return ajax1.AjaxGet(pURL, pParam);
	}
	
	this.addItemsToOrder = function addItemsToOrder(pObjArray)  {
		redirect = false;
		DWRRequestManager.addItemsToOrder(pObjArray, getLOSGId(), cartResponse);
	}

	this.addItemsToOrderButton = function addItemsToOrder(pObjArray)  {
		redirect = true;
		DWRRequestManager.addItemsToOrder(pObjArray, getLOSGId(), cartResponse);
	}

} // end of ShoppingCart



function AjaxReq () {
	var funcOrStr = null;
	var XMLHttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    
    function xmlHttpShowResult(divId, pData) {
		//overLayDiv_id = commonFunc.overLayDiv(false);
        commonFunc.getElementObj(divId).innerHTML = pData;
    }
    
	function xmlHttpResponse() {
		if (XMLHttp.readyState == 4) {
			if (XMLHttp.status == 200) {
				if (funcOrStr != null)
					typeof funcOrStr == 'function' ? funcOrStr(XMLHttp.responseText) : xmlHttpShowResult(funcOrStr, XMLHttp.responseText);
			}
		}
	}

	// below are public function
	
	this.AjaxGet = function AjaxGet (URL, param2) {
        var v_async = false;
        funcOrStr = null;
		if (param2 != undefined) {
			funcOrStr = param2;
			v_async = true;
		}
		var v_newUrl = this.noCache(URL);
        XMLHttp.open("GET", v_newUrl, v_async);
		XMLHttp.onreadystatechange = xmlHttpResponse;
		XMLHttp.send(null);  
		if (v_async == false) {
			var ret_str = XMLHttp.responseText; 
			if (XMLHttp.status != 200) {
				ret_str = "";
			} 
			return ret_str;
		}
	} // end of AjaxRequest

	this.noCache = function noCache(url) {
		var v_NewUrl = url;
		var v_time = new Date().getTime();
		v_NewUrl += (url.indexOf('?') == -1) ? '?' : '&';
		v_NewUrl += 'nocache=' + v_time;
  		return v_NewUrl;
	}

} // end of AjaxReq function


