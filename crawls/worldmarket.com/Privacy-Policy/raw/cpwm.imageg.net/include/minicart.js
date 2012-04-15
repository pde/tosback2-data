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
}

function ajaxAddToCart(formObject)
{
    /* debugging: alert('::: ajaxAddToCart :::'); */

	var oPix = document.childNodes ? 'px' : 0;
	var bMoz = (navigator.appName == 'Netscape');
	var bSaf = (navigator.userAgent.indexOf('Safari') > -1);

    //	if(bSaf)
    //	{
    //
    //    	var img = document.getElementById("minicartMozilla");
    //    	var xCoord  =  docjslib_getImageXfromLeft(img)-3;
    //     	document.getElementById("minicart8").style.left = xCoord +'px';
    //	}
    //	else if(bMoz)
    //	{
    //
    //    	var img = document.getElementById("minicartIE");
    //		 xCoord  =  docjslib_getImageXfromLeft(img)-3;
    //		 document.getElementById("minicart8").style.left = xCoord + oPix;
    //
    //	}
    //	else
    //	{
    //
    //    	var img = document.getElementById("minicartIE");
    //        xCoord  =  docjslib_getImageXfromLeft(img)-2;
    //	document.getElementById("minicart8").style.left = xCoord ;
    //	}

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
                if (notEmpty(elem.name) && notEmpty(elem.value))
                {
                    /* debugging: alert('elem.name = ' + elem.name + '\nelem.value = ' + elem.value); */
                    if (notEmpty(pars)) {
                        pars = pars + '&';
                    }
                    if (elem.name=='showProductInCart') {
                        pars = pars + 'showProductInCart=false';
                    } else {
                        pars = pars + elem.name + '=' + elem.value;
                    }
                }
			}
		}
		// make sure the carthandler knows its getting an async call.
        /* debugging: alert('::: ajaxAddToCart :::\n\npars = \n'+pars); */
		// var myAjax = new Ajax.Request( url, { method: 'get', parameters: pars, onComplete: handleStateChange });
        new Ajax.Request(url,
        {
            method: 'get',
            parameters: pars,
            onComplete: function(e)
            {
                /* debugging: alert('::: ajaxAddToCart - onComplete :::\n\ne.status = '+e.status); */
                scroll(0,0);
                if(e.status == 200)
                {
                    var txt = e.responseText;
                    if (txt.indexOf("AJAX_SUCCESS") > -1)
                    {
                        /* debugging: alert('::: ajaxAddToCart - onComplete :::\n\ntxt.indexOf("AJAX_SUCCESS") > -1'); */
                        updateCartItemDisplay(getXmlValue(txt, 'itemCount'));
                        getOrderItemDetails();
                    }
                    else if (notEmpty(getXmlValue(txt, 'rdir')))
                    {
                        /* debugging: alert('::: ajaxAddToCart - onComplete :::\n\ngetXmlValue(txt, \'rdir\') = ' + getXmlValue(txt, 'rdir')); */
                        window.location = getXmlValue(txt, 'rdir');
                    }
                }
                else
                {
                    alert("Unable to retrieve a response from the server.");
                }
            },
            onException: function(e, m)
            {
                /* if exception occurs just swallow it */
            },
            onError: function(e, m)
            {
                /* if error occurs just swallow it */
            }
        })
	}
}

function getOrderItemDetails()
{
    /* debugging: alert('::: getOrderItemDetails :::'); */
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
    /* debugging: alert('::: updateCart :::\nreq.status = ' + req + '\nreq.status = ' + req); */
	if(req.status == 200)
	{
        Element.update('minicart', req.responseText);
		Element.show('minicart');
		toggleSelects("hideSelects");
		clearTimeout('hideCart()');
		clearTimeout('toggleSelects("showSelects")');
		//setTimeout('hideCart()', 10000);
		//setTimeout('toggleSelects("showSelects")', 10000);
		// run any scripts that might be in the minicart html, mainly this ensures that omniture reporting works
		execJS($("minicart"));
	}
	else
	{
		alert("Unable to retrieve a response from the server.");
	}
}

function updateCartItemDisplay(itemCount)
{
    var n = $("cartItemCount");
    /* debugging: alert('::: updateCartItemDisplay :::\n\nitemCount = '+itemCount+'\n\nn = '+n); */
	// this document node might not exist everywhere
	if (n)
	{
		var newText = '';
		if (itemCount == 0 || itemCount > 1)
		{
			newText = '(' + itemCount + ')';
		}
		else
		{
			newText = '(' + itemCount + ')';
		}
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
function docjslib_getRealLeft(imgElem) {
	xPos = eval(imgElem).offsetLeft;
	tempEl = eval(imgElem).offsetParent;
  	while (tempEl != null) {
  		xPos += tempEl.offsetLeft;
  		tempEl = tempEl.offsetParent;
  	}
	return xPos;
}

function docjslib_getRealTop(imgElem) {
	yPos = eval(imgElem).offsetTop;
	tempEl = eval(imgElem).offsetParent;
	while (tempEl != null) {
  		yPos += tempEl.offsetTop;
  		tempEl = tempEl.offsetParent;
  	}
	return yPos;
}


function docjslib_getImageXfromLeft(imgID) {
	 var bMoz = (navigator.appName == 'Netscape');
	 var bSaf = (navigator.userAgent.indexOf('Safari') > -1);
  if(bSaf)
	{
	 
   // return docjslib_getRealLeft(imgID);
	}

  else if (bMoz)
	{
	  //return eval(imgID).x
	}
  else
	 {
	//  return docjslib_getRealLeft(imgID);
	 }
}
