function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	{
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
		try
	    {
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
	    }
		catch (e)
	    {
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	    }
	}
	return xmlHttp;
}
function ajfindPos(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}
function ajxEmailFriend(dvName, e, target) {  
	if (document.getElementById('dvLogGiftList'))
	{
		document.getElementById('dvLogGiftList').style.display = 'none';
	}
	document.getElementById('dvEmailFriend').style.display = 'none';
	document.getElementById(dvName).style.display = 'block';
	document.getElementById("EmailResponse").style.display = 'none';
	document.getElementById("EmailForm").style.display = 'block';
	var coords = ajfindPos(document.getElementById(target));
	document.getElementById(dvName).style.left = coords[0] - 260 + 'px';
	document.getElementById(dvName).style.top = coords[1] + 'px';
}
function ajxFrmEmailFriend(f)
{
	var formValid = true;
	if (chkElement("txtFriendEmail", "lblFriendEmail") == false)
	{
		formValid = false;
	}
	if (chkElement("txtYourEmail", "lblYourEmail") == false)
	{
		formValid = false;
	}
	if (formValid == false)
	{
		document.getElementById("required").style.color	= "red";
		document.getElementById("required").innerHTML = "Please enter required field";
	} else
	{
		if (!isEmail(alltrim(document.getElementById("txtFriendEmail").value)))
		{
			document.getElementById("required").style.color	= "red";
			document.getElementById("required").innerHTML = "Your email is invalid.";
			setFieldRed("txtFriendEmail", "lblFriendEmail");
			formValid = false;
		}
		if (!isEmail(alltrim(document.getElementById("txtYourEmail").value)))
		{
			document.getElementById("required").style.color	= "red";
			document.getElementById("required").innerHTML = "Your email is invalid.";
			setFieldRed("txtYourEmail", "lblYourEmail");
			formValid = false;
		}
	}
	if (formValid == false) { return formValid; }
	xmlHttp=GetXmlHttpObject();
	if (xmlHttp==null)
	{
		alert ("Your browser does not support AJAX!");
		return false;
	} 
	var sku = alltrim(document.getElementById("txtSku").value);
	var fname = alltrim(document.getElementById("txtFriendName").value);
	var femail = alltrim(document.getElementById("txtFriendEmail").value);
	var yname = alltrim(document.getElementById("txtYourName").value);
	var yemail = alltrim(document.getElementById("txtYourEmail").value);
	var msg = alltrim(document.getElementById("txtMessage").value);
	var url = "/ajaxed/product-emailfriend.asp?prc=emailfriend&sku="+sku+"&fname="+fname+"&femail="+femail+"&yname="+yname+"&yemail="+yemail+"&msg="+msg+"&sid="+Math.random();
	xmlHttp.onreadystatechange=stateEmailFriend;
	xmlHttp.open("POST",url,true);
	xmlHttp.send(null);
	return false;
}
function stateEmailFriend() 
{ 
	if (xmlHttp.readyState==4)
	{ 
		document.getElementById("EmailResponse").style.display = 'block';
		document.getElementById("EmailForm").style.display = 'none';
	}
}
function stateUpdateShipMethod() 
{ 
	if (xmlHttp.readyState==4)
	{ 
		return false;
	}
}
function ajxUpdateShipMethod(iShpCode, iRecID)
{
	xmlHttp=GetXmlHttpObject();
	if (xmlHttp==null)
	{
		alert ("Your browser does not support AJAX!");
		return false;
	} 
	var url = "/ajaxed/checkout-shippingupdate.asp?prc=updShip&recid=" + iRecID + "&shpmethod=" + iShpCode +"&sid="+Math.random();
	xmlHttp.onreadystatechange=stateUpdateShipMethod;
	xmlHttp.open("POST",url,true);
	xmlHttp.send(null);
	return false;
}
var WindowTimeout;
function HideDropdown3()
{
	document.getElementById('dropdown3_wrapper').style.display = 'none';
	if (document.getElementById('veil')){
		document.getElementById('veil').style.display = "none";
	}
	if(document.getElementById("pgkeyword")){
		window.location.href=window.location.href + "?q=" + document.getElementById("pgkeyword").value;	
	}else{
		window.location.href=window.location.href;
	}
}
function closeCartWindow()
{
	WindowTimeout = setTimeout("HideDropdown3();",45000);
}
function clearCartWindowTimeout()
{
	clearTimeout(WindowTimeout);
}
function cartRedirect()
{
	window.location = "/cart.asp";
}
function ajxAddtoCart(result,inqty)
{
	xmlhttpATC=GetXmlHttpObject();
	if (xmlhttpATC==null)
	{
		alert ("Your browser does not support AJAX!");
		return false;
	}
	var prc = document.getElementById("prc").value;
	var sku = document.getElementById("Sku").value;
	if(typeof(inqty) == "undefined"){
		var qty = document.getElementById("qty").value;
	}else{
		var qty = inqty;
	}
	var txtShipTo = "";//document.getElementById("txtShipTo").value;
	var sltShipTo = "";//document.getElementById("sltShipTo").value;
	var chkItem1 = "";
	if (document.getElementById("chkItem1"))
	{
		if (document.getElementById("chkItem1").checked == true)
		{
			chkItem1 = document.getElementById("chkItem1").value;
		}
	}
	var chkItem2 = "";
	if (document.getElementById("chkItem2"))
	{
		if (document.getElementById("chkItem2").checked == true)
		{
			chkItem2 = document.getElementById("chkItem2").value;
		}
	}
	var chkItem3 = "";
	if (document.getElementById("chkItem3"))
	{
		if (document.getElementById("chkItem3").checked == true)
		{
			chkItem3 = document.getElementById("chkItem3").value;
		}
	}
	rnumber=Math.floor(Math.random()*1001);
	var url = "/ajaxed/product-addtocart.asp?prc=" + prc + "&sku=" + sku + "&qty=" + qty + "&txtShipTo=" + txtShipTo + "&sltShipTo=" + sltShipTo + "&chkItem1=" + chkItem1 + "&chkItem2=" + chkItem2 + "&chkItem3=" + chkItem3 + "&result=" + result+ "&rnum=" + rnumber;
	//alert(url);
	xmlhttpATC.open("POST",url,true);
	xmlhttpATC.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttpATC.setRequestHeader("Content-length", 0);
	xmlhttpATC.onreadystatechange = function() {
		if(xmlhttpATC.readyState == 4) {
			if(xmlhttpATC.status == 200) {
				loadVeil();
				var optionArray = new Array();
				optionArray = eval(xmlhttpATC.responseText);
				if (document.getElementById('CartUpdated'))
				{
					document.getElementById('CartUpdated').innerHTML = optionArray[0];
				}
				if (document.getElementById('cartnum'))
				{
					document.getElementById('cartnum').innerHTML = optionArray[1];
				}
				if (document.getElementById('dropdown3_wrapper'))
				{
					document.getElementById('dropdown3_wrapper').style.display = "block";
				}
				//trigger omniture tracking for cart adds
				trigger_omniture("cart_add",sku);
				
				closeCartWindow();
			}
		}
	}
	xmlhttpATC.send('');
	if (result == 'refresh')
	{
		cartRedirect();
	}
	return false;
}
function trigger_omniture(action,sku){
	rnumber=Math.floor(Math.random()*1001);//helps prevent caching issues
	furl = "/ajaxed/trigger_omniture.asp?omni_action=" + action + "&sku=" + sku + "&rnum=" + rnumber;
	//alert(furl);
	document.getElementById("omniture_frame").src = furl;
}