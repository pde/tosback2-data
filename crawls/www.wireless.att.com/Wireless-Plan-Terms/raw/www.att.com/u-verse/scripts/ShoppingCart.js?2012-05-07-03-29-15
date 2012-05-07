//**************************************************
// ShoppingCartUtils.js
// Author: Tong Lim 
// Version: 1.3.1
// Date: 6/21/2008
// Update: 10/30/2009
//***************************************************

/*
Example how to call it:
	ShoppingCart.AjaxRequest('/examples/myTest/Hello.jsp', showResult);  // the second param is a function
	ShoppingCart.AjaxRequest('/examples/myTest/Hello.jsp', "output");  // the second param is a string 
	ShoppingCart.addItemsToOrder(vObjArray);
	ShoppingCart.addItemsToOrderButton(vObjArray);
	ShoppingCart.addItemsToOrderIDM(vObjArray);
	var ajax = new AjaxReq(); 
*/

var ShoppingCart = new function() {
	this.mLOSGId = null;
	var redirect = false;
	var cartURL = "/cart/index.jsp";
	this.uxSellOffered = false;
	
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
	
	this.redirectToCart = function redirectToCart() {
		commonFunc.setBrowBackButStatus();
		document.location.href = v_contextRoot + cartURL; 
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
					ShoppingCart.redirectToCart();
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

	
	function cartResponseIDM (pData) { 
		if (pData != null) {
			
			var vResponse = pData.evalJSON(); 
			var vReturnUrl = vResponse.returnUrl;
			var vremovalCouponIds = vResponse.removalCouponIds;
			
			var decision = vResponse.radioSelection == undefined ? false : true; 
			var error = vReturnUrl.indexOf("Error") == -1 ? false : true;
			var success = vReturnUrl.indexOf("Success") == -1 ? false : true;
			var hasContractOffer = vResponse.hasContractOffer;
			var showETFPopup = vResponse.showETFPopup;
			setTimeOutPopup();
			setTimeOutWarning();
			if (success) { 
				if (redirect) {
					if (hasContractOffer) {			
						showIDMModal('ContractOffer',1,'d');
						if (showETFPopup) {
							showProcessBar(false);
							showPopupByUrl(v_contextRoot + '/shop/modal/earlyTerminationFee.jsp', 'Ensuring Your Long-Term Savings', true);						
							setTimeout(function(){$('doNotAcceptBtn').focus();},500);
							//showPopupByUrl('/u-verse/shop/modal/earlyTerminationFee.jsp', '<onl:resourceBundle key="uverse.etf.ensuring" />', true);				
						}
					} else {
						if (vReturnUrl == v_contextRoot + '/cart/sideCart/sideCartSuccess.jsp') {
							if (showETFPopup) {
								showProcessBar(false);
								showPopupByUrl(v_contextRoot + '/shop/modal/earlyTerminationFee.jsp', 'Ensuring Your Long-Term Savings', true);						
								//showPopupByUrl(v_contextRoot + '/shop/modal/earlyTerminationFee.jsp', '<onl:resourceBundle key="uverse.etf.ensuring" />', true);				
								setTimeout(function(){$('doNotAcceptBtn').focus();},500);
							} else {
								ShoppingCart.redirectToCart();
							}
						} else {
							refreshDomino(pData);
						}
						
					}
				} else {
				
					//Check for UXSell offers
					closeIDMPopup();
					//refreshHub();
					//setTimeout("refreshHub();", 1000);
						
					var p1 = 'up';
					var p2 = showModal.curServ;
					var p3 = 'systemEnforce';
					var p4 = 'enforcedUXSell';
					// This is an intentionally global-scoped variable, so you can detect in the calling method.
					vAvailableUXOfferStr = ShoppingCart.AjaxRequest(v_contextRoot + "/shop/fragments/customize/getAvailableUXOffer.jsp?sellType="+p1+"&targetType="+p2+"&actionType="+p3+"&limit=1&checkCompatibilityRules=true");
					vAvailableUXOfferStr = commonFunc.Trim(vAvailableUXOfferStr);

					if (vAvailableUXOfferStr != '') {
						refreshHub();
						showProcessBar(false);
						ShoppingCart.reviewForCheckoutReturn.uxOfferId = vAvailableUXOfferStr;
						vAvailableUXOfferDesc = ShoppingCart.AjaxRequest(v_contextRoot + "/shop/fragments/customize/getAvailableUXOfferDescription.jsp");
						vAvailableUXOfferDesc = commonFunc.Trim(vAvailableUXOfferDesc);
						var p4Desc = p4+'Desc';
						document.getElementById(p4Desc).innerHTML = vAvailableUXOfferDesc;
						processUXSellOffer(vAvailableUXOfferStr,'modal');
						showPopup(p4, true, true); 
						wtUXSellOffered();
					} else {
						closePopup();
						ShoppingCart.updateVOIPDataIDM();
						
						if (~location.href.indexOf('/u-verse/cart/port-in-retrieve-cart.jsp')) {
							location.href = '/u-verse/shop/customize.jsp';
						} else {
							performWebTrendTag();
							showProcessBar(false);
							refreshDomino(pData);
						}
					}
					showProcessBar(false);
				}
					
			} else {
				showProcessBar(false);
				if (decision) {
					var vParam = vResponse.radioSelection;
					var vErrorCode = vReturnUrl.indexOf("UVCART1030") == -1 ? '' : 'UVCART1030';
					//showPopUPCPP(vParam, vErrorCode);
					webTrendTag('Uverse_XPPBoltOn_BreakRmPg',1,'System');
					showPopup('BrokeCPP',true,true);
				} else if (error) {
					var formExceptionStr = vResponse.formExceptions;
					var invalidCoupon = vReturnUrl.indexOf("UVCART101") == -1 ? false : true;
					var invalidCouponUV11004 = vReturnUrl.indexOf("UV11004") == -1 ? false : true;
					var invalidCouponUV11002 = vReturnUrl.indexOf("UV11002") == -1 ? false : true;
					var invalidCouponUV11005 = vReturnUrl.indexOf("UV11005") == -1 ? false : true;
					var brokeCPP = vReturnUrl.indexOf("UVCART1030") == -1 ? false : true;
					var invalidCoupon = vReturnUrl.indexOf("UVCART101") == -1 ? false : true;
					if (invalidCoupon) {
						var couponErrorsDiv = 'couponErrors';
						vCouponErrorPopup =    ShoppingCart.AjaxRequest(v_contextRoot + "/cart/sideCart/removeCouponsFromCart.jsp?q_couponErrorCode="+vremovalCouponIds);
						vCouponErrorPopup = commonFunc.Trim(vCouponErrorPopup);
						document.getElementById(couponErrorsDiv).innerHTML = vCouponErrorPopup;
						document.getElementById(couponErrorsDiv).outerHTML = vCouponErrorPopup;
						showPopup(couponErrorsDiv,  true, true);
					} else if (invalidCouponUV11004) {
						var couponErrorsDiv = 'couponErrors';
						vCouponErrorPopup = ShoppingCart.AjaxRequest(v_contextRoot + "/cart/sideCart/removeCouponsFromCart.jsp?q_couponErrorCode="+vremovalCouponIds);
						vCouponErrorPopup = commonFunc.Trim(vCouponErrorPopup);
						document.getElementById(couponErrorsDiv).innerHTML = vCouponErrorPopup;
						document.getElementById(couponErrorsDiv).outerHTML = vCouponErrorPopup;
						showPopup(couponErrorsDiv,  true, true);
						//showFormPopup('<onl:resourceBundle key="uverse.shoppingCart.couponReqs" />', 500, true, false)
						//showPopupByUrl('/u-verse/shop/modal/earlyTerminationFee.jsp', '<onl:resourceBundle key="uverse.etf.ensuring" />', true);				
						//showPopup('invalidCouponUV11004',true);
					} else if (invalidCouponUV11002) {
						var couponErrorsDiv = 'couponErrors';
						vCouponErrorPopup =    ShoppingCart.AjaxRequest(v_contextRoot + "/cart/sideCart/removeCouponsFromCart.jsp?q_couponErrorCode="+vremovalCouponIds);
						vCouponErrorPopup = commonFunc.Trim(vCouponErrorPopup);
						document.getElementById(couponErrorsDiv).innerHTML = vCouponErrorPopup;
						document.getElementById(couponErrorsDiv).outerHTML = vCouponErrorPopup;
						showPopup(couponErrorsDiv,  true, true);
					} else if (brokeCPP) {	
						showPopup('BrokeCPP',true,true);
					} else if (invalidCouponUV11005) {
						var str = formExceptionStr.toString(); 
						str = str.substr(9);
						showPopupByStr(str, "Cart Error", true);
					} else {
						var errorFuncName = 'handle'+vResponse.formExceptions[0];
						errorFuncName = errorFuncName.replace(/:.+/,'');
						if (eval("typeof "+errorFuncName+" == 'function'")) {
							lastAction = 'reviewCheckout';
							eval(errorFuncName+"();");
						} else {
							showPopup('cartError',true);
						}
					}
				}
			}
		}
	} // end of cartResponseIDM

	function refreshDomino (pData) {
		var vResponse = pData.evalJSON(); 
		var vReturnUrl = vResponse.returnUrl;
		var success = vReturnUrl.indexOf("Success") == -1 ? false : true;

		if (success) {
			refreshHub();
			showProcessBar(false);
		}
		hoverTooltip.enableTooltips('useToolTip','/media/en_US/images/img/bubble_AA000NEQ.png','/media/en_US/images/img/bubble_AA000NEQ.png','238','72', 95, -75);

	}

	// below are public function
		
	this.AjaxRequest = function AjaxRequest (pURL, pParam) {
		var ajax1 = new AjaxReq();
		return ajax1.AjaxGet(pURL, pParam);
	}
	
	this.ajaxRefreshBody = function ajaxRefreshBody(pURL) {
		ShoppingCart.AjaxRequest(pURL,
			function(respHtml) {
				var body = document.getElementsByTagName('body')[0];
				var refreshedPage = respHtml.split(/<body.*>/gmi)[1];
				refreshedPage = respHtml.split(/<\/body>/gmi)[0];
				body.innerHTML = refreshedPage;
			}
		);
	}
	
	this.addItemsToOrder = function addItemsToOrder(pObjArray, reverseEngineer)  {
		reverseEngineer = (reverseEngineer != null) ? reverseEngineer : false;
		redirect = false;
		DWRRequestManager.addItemsToOrder(pObjArray, getLOSGId(), reverseEngineer, cartResponse);
	}

	this.addItemsToOrderButton = function addItemsToOrder(pObjArray, reverseEngineer)  {
		reverseEngineer = (reverseEngineer != null) ? reverseEngineer : false;
		redirect = true;
		DWRRequestManager.addItemsToOrder(pObjArray, getLOSGId(), reverseEngineer, cartResponse);
	}

	this.addItemsToOrderIDM = function addItemsToOrderIDM(pObjArray, reverseEngineer)  {
		reverseEngineer = (reverseEngineer != null) ? reverseEngineer : false;
		redirect = false;
		showProcessBar();
		DWRRequestManager.addItemsToOrder(pObjArray, getLOSGId(), reverseEngineer, cartResponseIDM);
	}
	
	this.updateVOIPDataIDM = function updateVoipDataIDM(pObjArray)  {
		pObjArray = pObjArray||this.updateVOIPDataIDM.phoneLinesList||[];
		if (typeof(pObjArray) == 'object' && pObjArray.length) DWRRequestManager.updateVoipData(pObjArray, refreshHub);
		this.updateVOIPDataIDM.phoneLinesList = [];
	}
	
// *** Existing Method ***
	this.reviewForCheckout = function reviewForCheckout(pObjArray,supressOffer) {
		ShoppingCart.reviewForCheckoutReturn.userAddArray = pObjArray;
		
		// option #1: String[] .........
		var pUXConfigArray = ['cross','iptv','user'];
		//  actionType=user
		//  limit=0
		//  checkCompatibilityRules=true
		// option #2: Map<String> .........
		if (supressOffer) {
				ShoppingCart.reviewForCheckoutReturn();
		} else {
		    DWRRequestManager.reviewUXQuery(pUXConfigArray, ShoppingCart.reviewForCheckoutReturn);
		}
	}
	
// *** new callback method, after reviewForCheckout'S DWR call comes returns ***********
	this.reviewForCheckoutReturn = function (pDWRuxReturnData) {
		pRACuxOfferId = pDWRuxReturnData;
		
		// console.log("[ShoppingCart.js] {281} NEEDS SOMETHING! pDWRuxReturnData: ", pDWRuxReturnData);
		
		if (!pRACuxOfferId) {
				DWRRequestManager.reviewForCheckout(ShoppingCart.reviewForCheckoutReturn.userAddArray, getLOSGId(), false, cartResponseIDM);
				showProcessBar();
				redirect =  ( ! ShoppingCart.uxSellOffered);
				ShoppingCart.uxSellOffered = false;
		} else {
			
			ShoppingCart.reviewForCheckoutReturn.uxOfferId = pRACuxOfferId;
			
			showProcessBar(false);
			redirect = false;
			
			vAvailableUXOfferDesc = ShoppingCart.AjaxRequest(v_contextRoot + "/shop/fragments/customize/getAvailableUXOfferDescription.jsp");
			vAvailableUXOfferDesc = commonFunc.Trim(vAvailableUXOfferDesc);
			p4Desc = "hubUXSellDesc";

			
			vAvailableUXOfferLongDesc = ShoppingCart.AjaxRequest(v_contextRoot + "/shop/fragments/customize/getAvailableUXOfferLongDescription.jsp");
			vAvailableUXOfferLongDesc = commonFunc.Trim(vAvailableUXOfferLongDesc);
			p5Desc = "hubUXSellLongDesc";
			
			document.getElementById(p4Desc).innerHTML = vAvailableUXOfferDesc;
			document.getElementById(p5Desc).innerHTML = vAvailableUXOfferLongDesc;

			// console.log("[ShoppingCart.js] {307}showPopup('hubUXSell',true,true); ");

			showPopup('hubUXSell',true,true);
			wtUXSellOffered();
		}
	}
	
	this.removeLOSGFromOrder = function removeLOSGFromOrder(pObjArray, reverseEngineer) {
		reverseEngineer = (reverseEngineer != null) ? reverseEngineer : false;
		showProcessBar();
		DWRRequestManager.removeLOSGFromOrder(pObjArray, reverseEngineer, refreshDomino);
	}
	
	this.savePackageToken = function savePackageToken(pTokenStr, reverseEngineer, callBackFunc) {
		showProcessBar();
		DWRRequestManager.savePackageToken(pTokenStr, reverseEngineer, callBackFunc);
	}
	
	this.applyUXOffers = function applyUXOffers(pObjArray) {
		var uxOffers = [];
		//uxOffers[] = pObjArray;
		//alert('inside DWR with uxOffersArray ' + pObjArray); 
		DWRRequestManager.applyUXOffers(pObjArray, refreshDomino);  
		showProcessBar();
	}

} // end of ShoppingCart



function AjaxReq () {
	var funcOrStr = null;
	var XMLHttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    
    function xmlHttpShowResult(divId, pData) {
        var vObj = commonFunc.getElementObj(divId);
		if (vObj != null) vObj.innerHTML = pData;
    }
    
	function xmlHttpResponse() {
		if (XMLHttp.readyState == 4) {
			if (XMLHttp.status == 200) {
				if (funcOrStr != null)
					typeof funcOrStr == 'function' ? funcOrStr(XMLHttp.responseText) : xmlHttpShowResult(funcOrStr, XMLHttp.responseText);
			}
		}
	}
	
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
			if (ret_str.indexOf("404") != -1) {
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

function wtUXSellOffered(){
	uxOfferId = ShoppingCart.reviewForCheckoutReturn.uxOfferId;
	uxOfferSellCode = ShoppingCart.AjaxRequest(v_contextRoot + "/shop/fragments/customize/getAvailableUXOfferReportingName.jsp");
	uxOfferSellCode = commonFunc.Trim(uxOfferSellCode);
	uxOfferDescription = ShoppingCart.AjaxRequest(v_contextRoot + "/shop/fragments/customize/getAvailableUXOfferDescription.jsp");
	uxOfferDescription = commonFunc.Trim(uxOfferDescription);
	uxOfferSellType = ShoppingCart.AjaxRequest(v_contextRoot + "/shop/fragments/customize/getAvailableUXOfferSellType.jsp");
	uxOfferSellType = commonFunc.Trim(uxOfferSellType);
	uxOfferActionType = ShoppingCart.AjaxRequest(v_contextRoot + "/shop/fragments/customize/getAvailableUXOfferActionType.jsp");
	uxOfferActionType = commonFunc.Trim(uxOfferActionType);
	
	// alert("uxOfferSellType: "+uxOfferSellType+" uxOfferActionType: "+uxOfferActionType+ " uxOfferSellCode: "+uxOfferSellCode+" uxOfferId: "+uxOfferId+ " uxOfferDescription: "+uxOfferDescription );
	// console.log("ShoppingCart.js [397]  wtUXSellOffered() uxOfferSellType:%o   uxOfferActionType:%o    uxOfferSellCode:%o    uxOfferId:%o    uxOfferDescription:%o   ", uxOfferSellType, uxOfferActionType, uxOfferSellCode, uxOfferId, uxOfferDescription  );

	
	if (uxOfferSellType == 'cross') {
		if (uxOfferActionType == 'systemEnforce') {
			webTrendTag('Uverse_UXSell_Popup',1,'System','wtUverse_SysEnforced_CrossSells_Offered',uxOfferDescription+"~"+uxOfferSellCode);
			//dcsMultiTrack("DCSext.wtUverse_SysEnforced_CrossSells_Offered",uxOfferDescription+"~"+uxOfferSellCode);
		} else {
			// example:  webTrendTag(event, status, type, paramName1, paramValue1, paramName2, paramValue2, paramName3, paramValue3) 
			webTrendTag('wtUverse_CrossSells_Offered',0,'System','wtUverse_CrossSells_Offered',uxOfferDescription+"~"+uxOfferSellCode);
			// webTrendTag('Uverse_UXSell_Popup',1,'System','wtUverse_CrossSells_Offered',uxOfferDescription+"~"+uxOfferSellCode);
			//dcsMultiTrack("DCSext.wtUverse_CrossSells_Offered",uxOfferDescription+"~"+uxOfferSellCode);
		}
	}
	if (uxOfferSellType == 'up') {
		if (uxOfferActionType == 'systemEnforce') {
			webTrendTag('Uverse_UXSell_Popup',1,'System','wtUverse_SysEnforced_upSells_Offered',uxOfferDescription+"~"+uxOfferSellCode);
			//dcsMultiTrack("DCSext.wtUverse_SysEnforced_upSells_Offered",uxOfferDescription+"~"+uxOfferSellCode);
		} else {
			webTrendTag('Uverse_UXSell_Popup',1,'System','wtUverse_upSells_Offered',uxOfferDescription+"~"+uxOfferSellCode);
			//dcsMultiTrack("DCSext.wtUverse_upSells_Offered",uxOfferDescription+"~"+uxOfferSellCode);
		}
	}
}
