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
	document.getElementById("minicart").className = document.getElementById("minicart").className.replace(/\bminicartShow\b/,'')
	document.getElementById("minicart").className += " minicartHide";
	toggleSelects('showSelects');
}

function ajaxAddToCart(formObject)
{
	// first stab at handling browsers that don't support AJAX
	if (!supportedBrowser)
	{
		formObject.submit();
	}
	else
	{
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
			updateCartItemDisplay(count,value);
			getOrderItemDetails();
		}
		else
		{
			window.location = getXmlValue(txt, 'rdir');
		}
	}
	else
	{
		alert("Unable to retrieve a response from the server.");
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
		Element.show('minicart');
		document.getElementById("minicart").className = document.getElementById("minicart").className.replace(/\bminicartHide\b/,'')
		document.getElementById("minicart").className += " minicartShow";
		toggleSelects("hideSelects");
		clearTimeout(hideCartTime);
		clearTimeout(toggleSelectsTime);
		var hideCartTime = setTimeout('hideCart()', 10000);
		var toggleSelectsTime = setTimeout('toggleSelects("showSelects")', 10000);
		// run any scripts that might be in the minicart html, mainly this ensures that omniture reporting works
		execJS($("minicart"));
	}
	else
	{
		alert("Unable to retrieve a response from the server.");
	}
}

function updateCartItemDisplay(itemCount,itemValue) {
	var n = $("cartItemCount");
	// this document node might not exist everywhere
	if (n) {
		var items = '';
		Element.addClassName(n.parentNode,'notEmpty');
		if (itemCount == 1) {
			items = "item";
		} else {
			items = 'items';
		}
		var newText = '<span class="sprite my-cart">My Cart</span>' + 
		'<div class="cart-info">' +
		'<span class="quantity">' + itemCount + ' ' + items + '</span>' + 
		'<span class="total">&#036;' + itemValue.replace( '$ ','') + '</span>' + 
		'</div><span class="sprite roundDownButton"></span>';
		n.innerHTML = newText;
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