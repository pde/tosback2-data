// this script is dependent on the prototype library, more info on prototype is available at http://prototype.conio.net/

// used for executing javascript returned in the xmlHttpRequest content
function execJS(node)
{	
	var bSaf = (navigator.userAgent.indexOf('Safari') != -1);
	var bOpera = (navigator.userAgent.indexOf('Opera') != -1);
	var bMoz = (navigator.appName == 'Netscape');
	var st = node.getElementsByTagName('SCRIPT');
  	var strExec;
  	for(var i=0;i<st.length; i++) 
  	{     
    	if (bSaf) 
		{
      		strExec = st[i].innerHTML;
    	}
    	else if (bOpera) 
		{
      		strExec = st[i].text;
    	}
    	else if (bMoz) 
		{
      		strExec = st[i].textContent;
    	}
    	else 
		{
      		strExec = st[i].text;
    	}
		try 
		{
      		eval(strExec);
    	} 
		catch(e) 
		{
      		alert(e);
    	}
  	}
}
var showCart = 0;

//browser sniffing
var supportedBrowser = (navigator.userAgent.indexOf('MSIE 5.2') == -1);

function hideCart()
{
	Element.hide('minicart');
	toggleSelects('showSelects');
	
	var orderFormArrayBedding = document.getElementsByName("orderForm");
		
		if (orderFormArrayBedding.length > 0)
		{		
			var beddingPrice1 = document.getElementById("skuPriceDiv_0");
			var beddingPrice2 = document.getElementById("skuPriceDiv_1");
			var beddingPrice3 = document.getElementById("skuPriceDiv_2");
			var beddingPrice4 = document.getElementById("skuPriceDiv_3");
			var beddingPrice5 = document.getElementById("skuPriceDiv_4");
			var beddingPrice6 = document.getElementById("skuPriceDiv_5");
			var beddingPrice7 = document.getElementById("skuPriceDiv_6");
			var beddingPrice8 = document.getElementById("skuPriceDiv_7");
			var beddingPrice9 = document.getElementById("skuPriceDiv_8");
			var beddingPrice10 = document.getElementById("skuPriceDiv_9");
			var beddingPrice11 = document.getElementById("skuPriceDiv_10");
			var beddingPrice12 = document.getElementById("skuPriceDiv_11");
			var beddingPrice13 = document.getElementById("skuPriceDiv_12");
			var beddingPrice14 = document.getElementById("skuPriceDiv_13");
			var beddingPrice15 = document.getElementById("skuPriceDiv_14");
			
			var beddingSalePrice1 = document.getElementById("skuSalePriceDiv_0");
			var beddingSalePrice2 = document.getElementById("skuSalePriceDiv_1");
			var beddingSalePrice3 = document.getElementById("skuSalePriceDiv_2");
			var beddingSalePrice4 = document.getElementById("skuSalePriceDiv_3");
			var beddingSalePrice5 = document.getElementById("skuSalePriceDiv_4");
			var beddingSalePrice6 = document.getElementById("skuSalePriceDiv_5");
			var beddingSalePrice7 = document.getElementById("skuSalePriceDiv_6");
			var beddingSalePrice8 = document.getElementById("skuSalePriceDiv_7");
			var beddingSalePrice9 = document.getElementById("skuSalePriceDiv_8");
			var beddingSalePrice10 = document.getElementById("skuSalePriceDiv_9");
			var beddingSalePrice11 = document.getElementById("skuSalePriceDiv_10");
			var beddingSalePrice12 = document.getElementById("skuSalePriceDiv_11");
			var beddingSalePrice13 = document.getElementById("skuSalePriceDiv_12");
			var beddingSalePrice14 = document.getElementById("skuSalePriceDiv_13");
			var beddingSalePrice15 = document.getElementById("skuSalePriceDiv_14");
			
			var beddingItemTotal1 = document.getElementById("itemTotalDiv_0");
			var beddingItemTotal2 = document.getElementById("itemTotalDiv_1");
			var beddingItemTotal3 = document.getElementById("itemTotalDiv_2");
			var beddingItemTotal4 = document.getElementById("itemTotalDiv_3");
			var beddingItemTotal5 = document.getElementById("itemTotalDiv_4");
			var beddingItemTotal6 = document.getElementById("itemTotalDiv_5");
			var beddingItemTotal7 = document.getElementById("itemTotalDiv_6");
			var beddingItemTotal8 = document.getElementById("itemTotalDiv_7");
			var beddingItemTotal9 = document.getElementById("itemTotalDiv_8");
			var beddingItemTotal10 = document.getElementById("itemTotalDiv_9");
			var beddingItemTotal11 = document.getElementById("itemTotalDiv_10");
			var beddingItemTotal12 = document.getElementById("itemTotalDiv_11");
			var beddingItemTotal13 = document.getElementById("itemTotalDiv_12");
			var beddingItemTotal14 = document.getElementById("itemTotalDiv_13");
			var beddingItemTotal15 = document.getElementById("itemTotalDiv_14");
			
			if (document.getElementById("skuPriceDiv_0")) {beddingPrice1.className="";}	
			if (document.getElementById("skuPriceDiv_1")) {beddingPrice2.className="";}	
			if (document.getElementById("skuPriceDiv_2")) {beddingPrice3.className="";}	
			if (document.getElementById("skuPriceDiv_3")) {beddingPrice4.className="";}
			if (document.getElementById("skuPriceDiv_4")) {beddingPrice5.className="";}	
			if (document.getElementById("skuPriceDiv_5")) {beddingPrice6.className="";}		
			if (document.getElementById("skuPriceDiv_6")) {beddingPrice7.className="";}		
			if (document.getElementById("skuPriceDiv_7")) {beddingPrice8.className="";}	
			if (document.getElementById("skuPriceDiv_8")) {beddingPrice9.className="";}		
			if (document.getElementById("skuPriceDiv_9")) {beddingPrice10.className="";}
			if (document.getElementById("skuPriceDiv_10")) {beddingPrice11.className="";}		
			if (document.getElementById("skuPriceDiv_11")) {beddingPrice12.className="";}		
			if (document.getElementById("skuPriceDiv_12")) {beddingPrice13.className="";}	
			if (document.getElementById("skuPriceDiv_13")) {beddingPrice14.className="";}		
			if (document.getElementById("skuPriceDiv_14")) {beddingPrice15.className="";}
			
			if (document.getElementById("skuSalePriceDiv_0")) {beddingSalePrice1.className="";}	
			if (document.getElementById("skuSalePriceDiv_1")) {beddingSalePrice2.className="";}	
			if (document.getElementById("skuSalePriceDiv_2")) {beddingSalePrice3.className="";}	
			if (document.getElementById("skuSalePriceDiv_3")) {beddingSalePrice4.className="";}
			if (document.getElementById("skuSalePriceDiv_4")) {beddingSalePrice5.className="";}	
			if (document.getElementById("skuSalePriceDiv_5")) {beddingSalePrice6.className="";}		
			if (document.getElementById("skuSalePriceDiv_6")) {beddingSalePrice7.className="";}		
			if (document.getElementById("skuSalePriceDiv_7")) {beddingSalePrice8.className="";}	
			if (document.getElementById("skuSalePriceDiv_8")) {beddingSalePrice9.className="";}		
			if (document.getElementById("skuSalePriceDiv_9")) {beddingSalePrice10.className="";}
			if (document.getElementById("skuSalePriceDiv_10")) {beddingSalePrice11.className="";}		
			if (document.getElementById("skuSalePriceDiv_11")) {beddingSalePrice12.className="";}		
			if (document.getElementById("skuSalePriceDiv_12")) {beddingSalePrice13.className="";}	
			if (document.getElementById("skuSalePriceDiv_13")) {beddingSalePrice14.className="";}		
			if (document.getElementById("skuSalePriceDiv_14")) {beddingSalePrice15.className="";}
			
			if (document.getElementById("itemTotalDiv_0")) {beddingItemTotal1.className="";}	
			if (document.getElementById("itemTotalDiv_1")) {beddingItemTotal2.className="";}	
			if (document.getElementById("itemTotalDiv_2")) {beddingItemTotal3.className="";}	
			if (document.getElementById("itemTotalDiv_3")) {beddingItemTotal4.className="";}	
			if (document.getElementById("itemTotalDiv_4")) {beddingItemTotal5.className="";}	
			if (document.getElementById("itemTotalDiv_5")) {beddingItemTotal6.className="";}
			if (document.getElementById("itemTotalDiv_6")) {beddingItemTotal7.className="";}
			if (document.getElementById("itemTotalDiv_7")) {beddingItemTotal8.className="";}	
			if (document.getElementById("itemTotalDiv_8")) {beddingItemTotal9.className="";}
			if (document.getElementById("itemTotalDiv_9")) {beddingItemTotal10.className="";}
			if (document.getElementById("itemTotalDiv_10")) {beddingItemTotal11.className="";}
			if (document.getElementById("itemTotalDiv_11")) {beddingItemTotal12.className="";}
			if (document.getElementById("itemTotalDiv_12")) {beddingItemTotal13.className="";}	
			if (document.getElementById("itemTotalDiv_13")) {beddingItemTotal14.className="";}
			if (document.getElementById("itemTotalDiv_14")) {beddingItemTotal15.className="";}
		}
	
	if(document.getElementById('showCheckout'))
	{
		document.getElementById('showCheckout').style.visibility = 'visible';
		document.getElementById('showCheckout').style.display = 'block';
	}
	if((document.getElementById('selectSizeMinicart') && document.getElementById('selectSizeMinicart').style.visibility == 'hidden') || (!document.getElementById('selectSizeMinicart')))
	{
		var formName = '';
		if(document.orderForm)
		{
			formName = document.orderForm;
		}
		else if(document.cyo_form)
		{
			formName = document.cyo_form;
		}
		else if(document.color_form)
		{
			formName = document.color_form;
		}
		if(formName != '')
		{
			for(i = 0; i < formName.elements.length; i++)
			{
				if(formName.elements[i].type == "select-one")
				{
					formName.elements[i].selectedIndex = 0;
				}
			}
		}
		if(document.getElementById('showCartMessages'))
		{
			document.getElementById('showCartMessages').style.visibility = 'visible';
			document.getElementById('showCartMessages').style.display = 'block';
		}
		if(document.getElementById('showCartMessages2'))
		{
			document.getElementById('showCartMessages2').style.visibility = 'visible';
			document.getElementById('showCartMessages2').style.display = 'block';
		}
	}
	if(document.getElementById('showCheckout0'))
	{
		document.getElementById('showCheckout0').style.visibility = 'hidden';
		document.getElementById('showCheckout0').style.display = 'none';
	}
	if(document.getElementById('errorMessagingDiv'))
	{
		document.getElementById('errorMessagingDiv').style.visibility = 'hidden';
		document.getElementById('errorMessagingDiv').style.display = 'none';
	}
	if(document.getElementById('showCheckout2'))
	{
		document.getElementById('showCheckout2').style.visibility = 'visible';
		document.getElementById('showCheckout2').style.display = 'block';
	}
	if(document.getElementById('showCheckoutMono'))
	{
		if(hasMonoMsg && hasMonoMsg != undefined && hasMonoMsg == true){
			document.getElementById('showCheckoutMono').style.visibility = 'visible';
			document.getElementById('showCheckoutMono').style.display = 'block';
			hasMonoMsg = false;
		} else {
			document.getElementById('showCheckoutMono').style.visibility = 'visible';
			document.getElementById('showCheckoutMono').style.display = 'block';
			document.getElementById('showCustomMgs').style.visibility = 'hidden';
			document.getElementById('showCustomMgs').style.display = 'none';
		}
	}

	//location.reload();
}

/*function ajaxAddToCart(formObject)
{
	//alert("start ajax call");
	// first stab at handling browsers that don't support AJAX
	if (!supportedBrowser)
	{
		//alert("inside if");
		formObject.submit();
	}
	else
	{	//alert("inside else");
		var url="/cartHandler/index.jsp";
		var pars = "";
		for(var i=0;i < formObject.elements.length;i++)
		{
			var elem = formObject.elements[i];
			if (elem.type != 'checkbox' || (elem.type == 'checkbox' && elem.checked == true))
			{	
				pars = pars + elem.name + "=" + elem.value + "&";
			}
		}
		// make sure the carthandler knows its getting an async call.
		pars = pars + 'async=true'; 
		var myAjax = new Ajax.Request( url, { method: 'post', parameters: pars, onComplete: handleStateChange }); 
		
	}//alert("end ajax call");
}*/

function ajaxAddToCart(formObject,prodDisplay)
{
	// first stab at handling browsers that don't support AJAX
	if (!supportedBrowser)
	{
		formObject.submit();
	}
	else
	{
		var url = "";
		if(prodDisplay == "poloCustom" || prodDisplay == "poloCustomNoSize" || prodDisplay == "poloCustomFont" || prodDisplay == "poloolympic"  || prodDisplay == "poloCustomNoSizeFont" || prodDisplay == "poloCustomColor" || prodDisplay == "poloCustomColor2")
		{
			url = "/polo_customHandler/index.jsp";
		}
		else if(prodDisplay == "poloHomeCustom" || prodDisplay == "poloHomeCustom2")
		{
			url = "/cartHandler/entry.jsp";			
		}
		else if(prodDisplay == "poloCustomFlag" || prodDisplay == "poloCustomFlagOutfit")
		{
			url = "/polo_cyoFlagHandler/index.jsp";			
		}
		else if(prodDisplay == "polocrest" || prodDisplay == "poloBikiniOutfit")
		{
			url = "/cyoPreCartHandler/index.jsp";
		}
		else if(prodDisplay == "giftCertificate" || prodDisplay == "giftCard")
		{
			url = "/giftCertificates/customHandler.jsp?ajaxcall=true";
		}
		else if(prodDisplay == "flashPage")
		{	
			url = "/cartHandler/external.jsp";
		}
		else
		{
			url = "/cartHandler/index.jsp";
		}
		var pars = "";
		for(var i=0;i < formObject.elements.length;i++)
		{
			var elem = formObject.elements[i];
			if (elem.type != 'checkbox' || (elem.type == 'checkbox' && elem.checked == true))
			{	if((prodDisplay == "poloCustomColor" || prodDisplay == "poloCustomColor2"|| prodDisplay == "poloolympic") && elem.name == 'action' && elem.value == 'skuAddToCart') {
				url = "/cartHandler/index.jsp";
				
				}
				pars = pars + elem.name + "=" + encodeURIComponent(elem.value) + "&";
			}
		}
		// make sure the carthandler knows its getting an async call.
		pars = pars + 'async=true'; 
		
		
		var myAjax = new Ajax.Request( url, { method: 'post', parameters: pars, onComplete: handleStateChange }); 
		
	}
}


function handleStateChange(req)
{
	scroll(0,0);

	if(req.status == 200)
	{
		var txt = req.responseText;
		if (txt.indexOf("AJAX_SUCCESS") > -1)
		{	
			var count = getXmlValue(txt,'itemCount');
			var value = getXmlValue(txt,'itemTotValue');
			var errTxt = getXmlValue(txt,'errorMessage');
			var hasCustomProdAddedStatus = getXmlValue(txt,'hasCustomProdAdded');
			updateCartItemDisplay(count,value);
			updateErrMsgDisplay(errTxt);
			getOrderItemDetails();			
			displayCustomMsg(hasCustomProdAddedStatus);
		}
		else
		{
			window.location = getXmlValue(txt, 'rdir');
		}
	}
	else
	{
		alert("Unable to retrieve a response from the server .");
	}
}

function getOrderItemDetails()
{
	// Append a timestamp to prevent caching of the response.
	var myAjax = new Ajax.Request( '/minicart/index.jsp', { method: 'get', parameters: 't=' + new Date().getTime(), onComplete: updateCart });
}

function toggleSelects(toggleMode)
{
	if (navigator.appVersion.indexOf("MSIE")!=-1)
	{
		var s = document.getElementsByTagName('select');
		if (toggleMode == "hideSelects")
		{
  			for (var i=0; i<s.length; i++) 
			{
    			s[i].style.visibility = "hidden";
  			}
		}
		else
		{
			for (var i=0; i<s.length; i++) 
			{
    			s[i].style.visibility = "visible";
  			}
		}
	}
}

function updateCart(req)
{
	if(req.status == 200)
	{
		Element.update('minicart', req.responseText);
		
		var orderFormArrayBedding = document.getElementsByName("orderForm");
		
		if (orderFormArrayBedding.length > 0)
		{
			var beddingPrice1 = document.getElementById("skuPriceDiv_0");
			var beddingPrice2 = document.getElementById("skuPriceDiv_1");
			var beddingPrice3 = document.getElementById("skuPriceDiv_2");
			var beddingPrice4 = document.getElementById("skuPriceDiv_3");
			var beddingPrice5 = document.getElementById("skuPriceDiv_4");
			var beddingPrice6 = document.getElementById("skuPriceDiv_5");
			var beddingPrice7 = document.getElementById("skuPriceDiv_6");
			var beddingPrice8 = document.getElementById("skuPriceDiv_7");
			var beddingPrice9 = document.getElementById("skuPriceDiv_8");
			var beddingPrice10 = document.getElementById("skuPriceDiv_9");
			var beddingPrice11 = document.getElementById("skuPriceDiv_10");
			var beddingPrice12 = document.getElementById("skuPriceDiv_11");
			var beddingPrice13 = document.getElementById("skuPriceDiv_12");
			var beddingPrice14 = document.getElementById("skuPriceDiv_13");
			var beddingPrice15 = document.getElementById("skuPriceDiv_14");
			
			var beddingSalePrice1 = document.getElementById("skuSalePriceDiv_0");
			var beddingSalePrice2 = document.getElementById("skuSalePriceDiv_1");
			var beddingSalePrice3 = document.getElementById("skuSalePriceDiv_2");
			var beddingSalePrice4 = document.getElementById("skuSalePriceDiv_3");
			var beddingSalePrice5 = document.getElementById("skuSalePriceDiv_4");
			var beddingSalePrice6 = document.getElementById("skuSalePriceDiv_5");
			var beddingSalePrice7 = document.getElementById("skuSalePriceDiv_6");
			var beddingSalePrice8 = document.getElementById("skuSalePriceDiv_7");
			var beddingSalePrice9 = document.getElementById("skuSalePriceDiv_8");
			var beddingSalePrice10 = document.getElementById("skuSalePriceDiv_9");
			var beddingSalePrice11 = document.getElementById("skuSalePriceDiv_10");
			var beddingSalePrice12 = document.getElementById("skuSalePriceDiv_11");
			var beddingSalePrice13 = document.getElementById("skuSalePriceDiv_12");
			var beddingSalePrice14 = document.getElementById("skuSalePriceDiv_13");
			var beddingSalePrice15 = document.getElementById("skuSalePriceDiv_14");
			
			var beddingItemTotal1 = document.getElementById("itemTotalDiv_0");
			var beddingItemTotal2 = document.getElementById("itemTotalDiv_1");
			var beddingItemTotal3 = document.getElementById("itemTotalDiv_2");
			var beddingItemTotal4 = document.getElementById("itemTotalDiv_3");
			var beddingItemTotal5 = document.getElementById("itemTotalDiv_4");
			var beddingItemTotal6 = document.getElementById("itemTotalDiv_5");
			var beddingItemTotal7 = document.getElementById("itemTotalDiv_6");
			var beddingItemTotal8 = document.getElementById("itemTotalDiv_7");
			var beddingItemTotal9 = document.getElementById("itemTotalDiv_8");
			var beddingItemTotal10 = document.getElementById("itemTotalDiv_9");
			var beddingItemTotal11 = document.getElementById("itemTotalDiv_10");
			var beddingItemTotal12 = document.getElementById("itemTotalDiv_11");
			var beddingItemTotal13 = document.getElementById("itemTotalDiv_12");
			var beddingItemTotal14 = document.getElementById("itemTotalDiv_13");
			var beddingItemTotal15 = document.getElementById("itemTotalDiv_14");
			
			if (document.getElementById("skuPriceDiv_0")) {beddingPrice1.className="";}	
			if (document.getElementById("skuPriceDiv_1")) {beddingPrice2.className="";}	
			if (document.getElementById("skuPriceDiv_2")) {beddingPrice3.className="";}	
			if (document.getElementById("skuPriceDiv_3")) {beddingPrice4.className="";}
			if (document.getElementById("skuPriceDiv_4")) {beddingPrice5.className="";}	
			if (document.getElementById("skuPriceDiv_5")) {beddingPrice6.className="";}		
			if (document.getElementById("skuPriceDiv_6")) {beddingPrice7.className="";}		
			if (document.getElementById("skuPriceDiv_7")) {beddingPrice8.className="";}	
			if (document.getElementById("skuPriceDiv_8")) {beddingPrice9.className="";}		
			if (document.getElementById("skuPriceDiv_9")) {beddingPrice10.className="";}
			if (document.getElementById("skuPriceDiv_10")) {beddingPrice11.className="";}		
			if (document.getElementById("skuPriceDiv_11")) {beddingPrice12.className="";}		
			if (document.getElementById("skuPriceDiv_12")) {beddingPrice13.className="";}	
			if (document.getElementById("skuPriceDiv_13")) {beddingPrice14.className="";}		
			if (document.getElementById("skuPriceDiv_14")) {beddingPrice15.className="";}
			
			if (document.getElementById("skuSalePriceDiv_0")) {beddingSalePrice1.className="";}	
			if (document.getElementById("skuSalePriceDiv_1")) {beddingSalePrice2.className="";}	
			if (document.getElementById("skuSalePriceDiv_2")) {beddingSalePrice3.className="";}	
			if (document.getElementById("skuSalePriceDiv_3")) {beddingSalePrice4.className="";}
			if (document.getElementById("skuSalePriceDiv_4")) {beddingSalePrice5.className="";}	
			if (document.getElementById("skuSalePriceDiv_5")) {beddingSalePrice6.className="";}		
			if (document.getElementById("skuSalePriceDiv_6")) {beddingSalePrice7.className="";}		
			if (document.getElementById("skuSalePriceDiv_7")) {beddingSalePrice8.className="";}	
			if (document.getElementById("skuSalePriceDiv_8")) {beddingSalePrice9.className="";}		
			if (document.getElementById("skuSalePriceDiv_9")) {beddingSalePrice10.className="";}
			if (document.getElementById("skuSalePriceDiv_10")) {beddingSalePrice11.className="";}		
			if (document.getElementById("skuSalePriceDiv_11")) {beddingSalePrice12.className="";}		
			if (document.getElementById("skuSalePriceDiv_12")) {beddingSalePrice13.className="";}	
			if (document.getElementById("skuSalePriceDiv_13")) {beddingSalePrice14.className="";}		
			if (document.getElementById("skuSalePriceDiv_14")) {beddingSalePrice15.className="";}
			
			if (document.getElementById("itemTotalDiv_0")) {beddingItemTotal1.className="";}	
			if (document.getElementById("itemTotalDiv_1")) {beddingItemTotal2.className="";}	
			if (document.getElementById("itemTotalDiv_2")) {beddingItemTotal3.className="";}	
			if (document.getElementById("itemTotalDiv_3")) {beddingItemTotal4.className="";}	
			if (document.getElementById("itemTotalDiv_4")) {beddingItemTotal5.className="";}	
			if (document.getElementById("itemTotalDiv_5")) {beddingItemTotal6.className="";}
			if (document.getElementById("itemTotalDiv_6")) {beddingItemTotal7.className="";}
			if (document.getElementById("itemTotalDiv_7")) {beddingItemTotal8.className="";}	
			if (document.getElementById("itemTotalDiv_8")) {beddingItemTotal9.className="";}
			if (document.getElementById("itemTotalDiv_9")) {beddingItemTotal10.className="";}
			if (document.getElementById("itemTotalDiv_10")) {beddingItemTotal11.className="";}
			if (document.getElementById("itemTotalDiv_11")) {beddingItemTotal12.className="";}
			if (document.getElementById("itemTotalDiv_12")) {beddingItemTotal13.className="";}	
			if (document.getElementById("itemTotalDiv_13")) {beddingItemTotal14.className="";}
			if (document.getElementById("itemTotalDiv_14")) {beddingItemTotal15.className="";}
		}

		Element.show('minicart');
		toggleSelects("hideSelects");
		clearTimeout('hideCart()');
		//clearTimeout('toggleSelects("showSelects")');
		setTimeout('hideCart()', miniCartTimeOut);
		//setTimeout('toggleSelects("showSelects")', 10000);
		// run any scripts that might be in the minicart html, mainly this ensures that omniture reporting works

		execJS($("minicart"));
	}
	else
	{
		alert("Unable to retrieve a response from the server    .");
	}
}

function updateCartItemDisplay(itemCount,itemValue)
{
	var n = $("cartQtyId");
	// this document node might not exist everywhere
	if (n)
	{
		var newText = '';
		newText = itemCount;
		n.innerHTML = newText;
	}
}

function updateErrMsgDisplay(errTxt)
{
	//var n = $("errMessageDivMinicart");
	var n = document.getElementById('errMessageDivMinicart');
	var n2 = document.getElementById('errMessageDivMinicart2');
	if (n)
	{
		var newText = '';
		newText = errTxt;
		n.innerHTML = newText;
		n.style.display = 'block';
		n.style.visibility = 'visible';
	}
	if (n2)
	{
		var newText = '';
		newText = errTxt;
		n2.innerHTML = newText;
		n2.style.display = 'block';
		n2.style.visibility = 'visible';
	}
}

//returns the value of an xml node "nodeName" within "inText"
function getXmlValue(inText, nodeName)
{
	var ret = '';
	var n = '<' + nodeName + '>';
	var n2 = '</' + nodeName + '>';
	var f = inText.indexOf(n);
	if (f > -1)
	{
		ret = inText.substring(f + n.length, inText.indexOf(n2));
	}
	return ret;
}
function displayCustomMsg(hasCustomProdAddedStatus)
{
	if(document.getElementById('showCustomMgs'))
	{	
		var msgDiv = document.getElementById('showCustomMgs');
		if(hasCustomProdAddedStatus == 'yes')
		{
			msgDiv.style.display = 'block';
			msgDiv.style.visibility = 'visible';
		}
		else
		{		
			msgDiv.style.display = 'none';
			msgDiv.style.visibility = 'hidden';
		}

	}
}
