function mouseX(evt)
{
	if (!evt) evt = window.event; if (evt.pageX) return evt.pageX; else if (evt.clientX)return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft); else return 0;
}
function mouseY(evt)
{
	if (!evt) evt = window.event; if (evt.pageY) return evt.pageY; else if (evt.clientY)return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); else return 0;
}
function pageWidth()
{
	return window.innerWidth != null? window.innerWidth: document.body != null? document.body.clientWidth:null;
}
function pageHeight()
{
	return window.innerHeight != null? window.innerHeight: document.body != null? document.body.clientHeight:null;
}
function posLeft()
{	
	return typeof window.pageXOffset != 'undefined' ? window.pageXOffset:document.documentElement.scrollLeft? document.documentElement.scrollLeft:document.body.scrollLeft? document.body.scrollLeft:0;
}
function posTop()
{
	return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop?document.body.scrollTop:0;
}
function posRight()
{
	return posLeft()+pageWidth();
}
function posBottom()
{
	return posTop()+pageHeight();
}
function popupWindow(o,d)
{
	var obj = document.getElementById(o);
	if(d)
		obj.style.display = 'block';
	else
		obj.style.display = 'none';
}
function showDv(o,d)
{
	var obj = document.getElementById(o);
	if(d)
		obj.style.display = 'block';
	else
		obj.style.display = 'none';
}
function alltrim(str) {
	return str.replace(/^\s+|\s+$/g, '');
}
function isEmail(mailvalue) {
	if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(mailvalue))
	{	return (true);
	}
	return (false);
}
function IsNumeric(sText)
{
	var i = 0;
	var ValidChars = "0123456789";
	var IsNumber=true;
	var Char;
	for (i = 0; i < sText.length && IsNumber == true; i++) 
	{ 
		Char = sText.charAt(i); 
		if (ValidChars.indexOf(Char) == -1) 
		{
			IsNumber = false;
		}
	}
	return IsNumber;
}
function isEmpty(str)
{	
	var strTrim;
	if (alltrim(str) == "")
	{
		return true;
	}
	return false;
}
function GetRandom(fNumber)
{
    var ranNum= Math.floor(Math.random()*fNumber);
    return ranNum;
}
function isValidCreditCard(type, ccnum) {
   if (type == "VI") {
      // Visa: length 16, prefix 4, dashes optional.
      var re = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
   } else if (type == "MC") {
      // Mastercard: length 16, prefix 51-55, dashes optional.
      var re = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
   } else if (type == "DI") {
      // Discover: length 16, prefix 6011, dashes optional.
      var re = /^6011-?\d{4}-?\d{4}-?\d{4}$/;
   } else if (type == "AX") {
      // American Express: length 15, prefix 34 or 37.
      var re = /^3[4,7]\d{13}$/;
   } else if (type == "Diners") {
      // Diners: length 14, prefix 30, 36, or 38.
      var re = /^3[0,6,8]\d{12}$/;
   }
   if (type == "") return false;
   if (!re.test(ccnum)) return false;
   // Remove all dashes for the checksum checks to eliminate negative numbers
   ccnum = ccnum.split("-").join("");
   // Checksum ("Mod 10")
   // Add even digits in even length strings or odd digits in odd length strings.
   var checksum = 0;
   for (var i=(2-(ccnum.length % 2)); i<=ccnum.length; i+=2) {
      checksum += parseInt(ccnum.charAt(i-1));
   }
   // Analyze odd digits in even length strings or even digits in odd length strings.
   for (var i=(ccnum.length % 2) + 1; i<ccnum.length; i+=2) {
      var digit = parseInt(ccnum.charAt(i-1)) * 2;
      if (digit < 10) { checksum += digit; } else { checksum += (digit-9); }
   }
   if ((checksum % 10) == 0) return true; else return false;
}
function fnUpdQty(f)
{
	var curQty;
	curQty = document.getElementById("qty").value;
	if (isNaN(curQty))
	{
		curQty = 1;
	} else
	{
		curQty = parseInt(curQty);
	}
	if (f == '-')
	{
		if (curQty > 1)
		{
			document.getElementById("qty").value = curQty - 1;
		}
	} else
	{
		document.getElementById("qty").value = curQty + 1;
	}
	document.getElementById("dvQty").innerHTML = document.getElementById("qty").value;
}
function fnChangeTab(dvBox)
{
	if (document.getElementById("AddnContent"))
	{
		document.getElementById("AddnContent").style.display = 'none';
	}
	if (document.getElementById("AddnRecipes"))
	{
		document.getElementById("AddnRecipes").style.display = 'none';
	}
	if (document.getElementById("AddnNutrition"))
	{
		document.getElementById("AddnNutrition").style.display = 'none';
	}
	if (document.getElementById("AddnGuarantee"))
	{
		document.getElementById("AddnGuarantee").style.display = 'none';
	}
	if (document.getElementById(dvBox))
	{
		document.getElementById(dvBox).style.display = 'block';
	}
	if (document.getElementById("tab1") != null) {
		document.getElementById("tab1").style.color = '#48666e';
	}
	if (document.getElementById("tab2") != null) {
		document.getElementById("tab2").style.color = '#48666e';
	}
	if (document.getElementById("tab3") != null) {
		document.getElementById("tab3").style.color = '#48666e';
	}
	if (document.getElementById("tab4") != null) {
		document.getElementById("tab4").style.color = '#48666e';
	}
	switch(dvBox)
	{
	case "AddnContent":
		document.getElementById("tab1").style.color = '#fff';
		break;    
	case "AddnRecipes":
		document.getElementById("tab2").style.color = '#fff';
		break;
	case "AddnNutrition":
		document.getElementById("tab3").style.color = '#fff';
		break;
	case "AddnGuarantee":
		document.getElementById("tab4").style.color = '#fff';
		break;
	default:
	}
}
function fnGetAllHFMoment()
{
	myHFfmoment = window.open('/hfmoment.asp','hfmoment', 'width=530,height=600,toolbar=0,resizable=0,location=0,scrollbars=1,directories=0,menubar=0,status=0');
	myHFfmoment.focus();
}
function view(ival) {
    var myWin;
    myWin = window.open(ival, "view", "width=750, height=650,toolbar=no, resizable=0,scrollbars=yes,menubar=no,status=no");
	myWin.focus();
}
function fnAddCards(f,recID)
{
	var urlAddCrt = "/cart-item.asp?prc=addcrd&chkbx=" + f.checked + "&rid=" + recID;
	window.location.replace(urlAddCrt);
}
function CalcKeyCode(aChar) {
  var character = aChar.substring(0,1);
  var code = aChar.charCodeAt(0);
  return code;
}
function checkNumber(val, mxLen, nxtVal) {
	var strPass = val.value;
	var strLength = strPass.length;
	var lchar = val.value.charAt((strLength) - 1);
	var cCode = CalcKeyCode(lchar);
	if (cCode < 48 || cCode > 57 ) {
		var myNumber = val.value.substring(0, (strLength) - 1);
		val.value = myNumber;
	}
	if (val.value.length == mxLen)
	{
		document.getElementById(nxtVal).focus();
	}
	return false;
}
var ie = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);
// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
function ControlVersion()
{
	var version;
	var axo;
	var e;
	try {
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}
	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			version = "WIN 6,0,21,0";
			axo.AllowScriptAccess = "always";
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}
	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}
	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}
	if (!version)
	{
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	return version;
}
function GetSwfVer(){
	var flashVer = -1;
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;			
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
			var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}
function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}
function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		for (var i in params)
  			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '></object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }
    document.write(str);
}
function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}
function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    
    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
      case "id":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
}
function chkZipCountry(eleZip, eleCountry) {
    var tmpZip = document.getElementById(eleZip).value;
    var tmpCountry = document.getElementById(eleCountry).value;
    var errMsg = "";
    switch (tmpCountry) {
        case "USA":
            if ((tmpZip.length > 5) || (tmpZip.length < 5) || (IsNumeric(tmpZip) == false)) { errMsg = "5 digit maximum allowed for zip codes for US and 6 digit for CA."; }
            break;
        case "CANADA":
            var temp = tmpZip.replace(" ", "");
            if ((temp.length > 6) || (temp.length < 6)) { errMsg = "5 digit maximum allowed for zip codes for US and 6 digit for CA."; }
            break;
    }
    return errMsg;
}
getViewportWidth = function() {
  var width = 0;
  if( document.documentElement && document.documentElement.clientWidth ) {
	width = document.documentElement.clientWidth;
  }
  else if( document.body && document.body.clientWidth ) {
	width = document.body.clientWidth;
  }
  else if( window.innerWidth ) {
	width = window.innerWidth - 18;
  }
  return width;
}
getViewportHeight = function() {
  var height = 0;
  if( document.documentElement && document.documentElement.clientHeight ) {
	height = document.documentElement.clientHeight;
  }
  else if( document.body && document.body.clientHeight ) {
	height = document.body.clientHeight;
  }
  else if( window.innerHeight ) {
	height = window.innerHeight - 18;
  }
  return height;
}
getViewportScrollY = function() {
  var scrollY = 0;
  if( document.documentElement && document.documentElement.scrollTop ) {
	scrollY = document.documentElement.scrollTop;
  }
  else if( document.body && document.body.scrollTop ) {
	scrollY = document.body.scrollTop;
  }
  else if( window.pageYOffset ) {
	scrollY = window.pageYOffset;
  }
  else if( window.scrollY ) {
	scrollY = window.scrollY;
  }
  return scrollY;
}
function reShowVeil() {
	if (document.getElementById('veil'))
	{
		if(document.getElementById('veil').style.display == 'block') loadVeil();
	}
}
function hideVeil() {
	var veil = document.getElementById('veil');
	if(veil.style.display == 'block') veil.style.display = 'none';
	var a;
	if(!document.getElementById('dvPPalpopup')) {
		a = document.createElement('DIV');
		a.id = 'dvPPalpopup';
		document.body.appendChild(a);
	}
	a = document.getElementById('dvPPalpopup');
	a.style.display = 'none';
}
function loadVeil() {
	var veil = document.getElementById('veil');
	//veil.style.height = (document.body.offsetHeight > document.body.scrollHeight ? document.body.offsetHeight : document.body.scrollHeight)+'px';
	//veil.style.width = 	(isIE ? document.body.clientWidth : document.width)+'px';
	veil.style.filter = 'alpha(opacity=50)';
	veil.style.top = 0;
	veil.style.left = 0;
	veil.style.display = 'block';
}
function viewWindow(CartID) {
	var a;
	var imgHTML;
	var divWidth;
	var divHeight;
	if(!document.getElementById('dvPPalpopup')) {
		a = document.createElement('DIV');
		a.id = 'dvPPalpopup';
		document.body.appendChild(a);
	}
	a = document.getElementById('dvPPalpopup');
	loadVeil();
	divWidth = 320;
	divHeight = 340;
	var setX = ( getViewportWidth() - divWidth ) / 2;
	var setY = ( getViewportHeight() - divHeight ) / 2;
	if( setX < 0 ) setX = 0;
	if( setY < 0 ) setY = 0;
	imgHTML = '';
	imgHTML = imgHTML + '<h3>Important Notice</h3><p>If you are shipping to more than one recipient, you will only be required to enter one recipient address on the PayPal site. You will be returned to Hickory Farms to complete the rest of the shipping details.</p><a href="/paypalcheckout.asp?cartid=' + CartID + '&amp;express=Y">Continue to PayPal</a><a href="javascript:hideVeil()">Back to Cart</a>';
	a.innerHTML = imgHTML;
	a.style.left = "30%";
	a.style.top = getViewportScrollY() + setY + "px";
	a.style.display = 'block';
}
var timeout	= 500;
var closetimer = 0;
var ddmenuitem = 0;
var ddsubmenuitem = 0;
function hideDropDowns() {
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}
function showDropDown(tab) {
	mcancelclosetime();
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
	if (document.getElementById('dropdown' + tab))
	{
		ddmenuitem = document.getElementById('dropdown' + tab);
		ddmenuitem.style.visibility = 'visible';
	}
}
function mclosetime()
{
	closetimer = window.setTimeout(mclose, timeout);
}
function mcancelclosetime()
{
	if(closetimer)
	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}
function fnSltShipTo(f)
{
	if (document.getElementById('dvShipToRecip') && document.getElementById('txtShipTo'))
	{
		if (f.value == "NEW")
		{
			document.getElementById('dvShipToRecip').style.display = 'block';
			document.getElementById('txtShipTo').value = '';
		} else {
			document.getElementById('dvShipToRecip').style.display = 'none';
			document.getElementById('txtShipTo').value = f.value;
		}
	}
}
function hideProdInfoVeil(sku) {
	var veil = document.getElementById('veil');
	if(veil.style.display == 'block') veil.style.display = 'none';
	if (document.getElementById('itmInfo_'+sku))
	{
		document.getElementById('itmInfo_'+sku).style.visibility = 'hidden';
	}
	if (document.getElementById('itmInfo'))
	{
		document.getElementById('itmInfo').style.display = 'none';
	}
}
function loadcatVeil() {
	var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false; var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
	var veil = document.getElementById('veil');
	veil.style.height = (document.body.offsetHeight > document.body.scrollHeight ? document.body.offsetHeight : document.body.scrollHeight)+'px';
	veil.style.width = 	(isIE ? document.body.clientWidth : document.width)+'px';
	veil.style.filter = 'alpha(opacity=30)';
	veil.style.top = 0;
	veil.style.left = 0;
	veil.style.display = 'block';
}
function showProdInfo(sku,cartopt,result)
{
	var a;
	var msgHTML;
	var divWidth = 520;
	var divHeight = 285;
	var x;	
	var setX = ( getViewportWidth() - divWidth ) / 2;
	var setY = ( getViewportHeight() - divHeight ) / 2;
	if( setX < 0 ) setX = 0;
	if( setY < 0 ) setY = 0;
	if(!document.getElementById('itmInfo')) {
		a = document.createElement('DIV');
		a.id = 'itmInfo';
		a.setAttribute("class","itmInfo");
		document.body.appendChild(a);
		a = document.getElementById('itmInfo');
		loadcatVeil();
		a.style.left = setX + "px";
		a.style.top = getViewportScrollY() + setY + "px";
		a.style.display = 'block';
	} else {
		loadcatVeil();
		if (document.getElementById('itmInfo_'+sku))
		{
			a = document.getElementById('itmInfo_'+sku);
			a.style.visibility = 'visible';
		} else {
			a = document.getElementById('itmInfo');
			a.style.left = setX + "px";
			a.style.top = getViewportScrollY() + setY + "px";
			a.style.display = 'block';
		}
	}
	msgHTML = "<a href=\"javascript:hideProdInfoVeil('"+sku+"');\" class=\"close\"><img src=\"/grafx/btn_close.gif\" height=\"13\" width=\"43\" alt=\"Close Window\"></a><div id=\"itmDisplay_"+sku+"\" class=\"itmDisplay\"></div>";
	a.innerHTML = msgHTML;
	xmlhttp = new GetXmlHttpObject();
	xmlhttp.open('GET','/ajaxed/prod-info.asp?sku='+sku+'&opt='+cartopt+'&result='+result,true);
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById('itmDisplay_'+sku).innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.send(null);
}
function toggletabs(name)
{
	if (name == 'desc')
	{
		document.getElementById('tabdesc').setAttribute("class","TabbedPanelsTab TabbedPanelsTabSelected");
		document.getElementById('tabcontents').setAttribute("class","TabbedPanelsTab");
		document.getElementById('tabship').setAttribute("class","TabbedPanelsTab");
		document.getElementById('blockdesc').setAttribute("class","TabbedPanelsContent cells TabbedPanelsContentVisible");
		document.getElementById('blockcontents').setAttribute("class","TabbedPanelsContent cells");
		document.getElementById('blockship').setAttribute("class","TabbedPanelsContent cells");
		document.getElementById('blockdesc').style.display = 'block';
		document.getElementById('blockcontents').style.display = 'none';
		document.getElementById('blockship').style.display = 'none';
	} else {
		if (name == 'contents')
		{
			document.getElementById('tabdesc').setAttribute("class","TabbedPanelsTab");
			document.getElementById('tabcontents').setAttribute("class","TabbedPanelsTab TabbedPanelsTabSelected");
			document.getElementById('tabship').setAttribute("class","TabbedPanelsTab");
			document.getElementById('blockdesc').setAttribute("class","TabbedPanelsContent cells");
			document.getElementById('blockcontents').setAttribute("class","TabbedPanelsContent cells TabbedPanelsContentVisible");
			document.getElementById('blockship').setAttribute("class","TabbedPanelsContent cells");
			document.getElementById('blockdesc').style.display = 'none';
			document.getElementById('blockcontents').style.display = 'block';
			document.getElementById('blockship').style.display = 'none';
		} else {
			document.getElementById('tabdesc').setAttribute("class","TabbedPanelsTab");
			document.getElementById('tabcontents').setAttribute("class","TabbedPanelsTab");
			document.getElementById('tabship').setAttribute("class","TabbedPanelsTab TabbedPanelsTabSelected");
			document.getElementById('blockdesc').setAttribute("class","TabbedPanelsContent cells");
			document.getElementById('blockcontents').setAttribute("class","TabbedPanelsContent cells");
			document.getElementById('blockship').setAttribute("class","TabbedPanelsContent cells TabbedPanelsContentVisible");
			document.getElementById('blockdesc').style.display = 'none';
			document.getElementById('blockcontents').style.display = 'none';
			document.getElementById('blockship').style.display = 'block';
		}
	}
}
var viewtimeout	= 2000;
var viewclosetimer = 0;
function viewclosetime()
{
	viewclosetimer = window.setTimeout("hideView()", viewtimeout);
}
function showView(num)
{
	hideView();
	if (document.getElementById('view_'+num))
	{
		document.getElementById('view_'+num).style.visibility = 'visible';
	}
	viewclosetime();
}
function hideView()
{
	for (i = 0; i < 100; i++) 
	{ 
		if (document.getElementById('view_'+i))
		{
			document.getElementById('view_'+i).style.visibility = 'hidden';
		}
	}
}
var last_ship_selected_type = "";
function UpdateShipMethod(f, shipTo,ship_type_row)
{
	var addresstype = '';
	var state = '';
	var country = '';
	var shipmethod = '';
	var futuredate = "";
	if(!ship_type_row){
		ship_type_row = 1;
	}
	//64_B and 64C_B are the pseudo standard type for select a date version of standard shipping
	//it is not a valid ship type and must be reset to the valid standard code
	if (document.getElementById('fod_'+shipTo)){
		if (f == '64S'){
			
			document.getElementById('fod_'+shipTo).style.display = 'block';
			futuredate = document.getElementById("input_DeliveryDate_" + shipTo).value;
			if(document.getElementById("input_DeliveryDate_" + shipTo)){
				if(document.getElementById("input_DeliveryDate_" + shipTo).value == ""){
					if(document.getElementById('input_DeliveryDateMM_'+shipTo)){
						document.getElementById('input_DeliveryDateMM_'+shipTo).value = 'MM';
					}
					if(document.getElementById('input_DeliveryDateDD_'+shipTo)){
						document.getElementById('input_DeliveryDateDD_'+shipTo).value = 'DD';
					}
					if(document.getElementById('input_DeliveryDateYY_'+shipTo)){
						document.getElementById('input_DeliveryDateYY_'+shipTo).value = 'YY';
					}
				}
			}
		} else {
			document.getElementById('fod_'+shipTo).style.display = 'none';
			if(document.getElementById("input_DeliveryDate_" + shipTo)){
				document.getElementById("input_DeliveryDate_" + shipTo).value = "";
			}
			if(document.getElementById('input_DeliveryDateMM_'+shipTo)){
				document.getElementById('input_DeliveryDateMM_'+shipTo).value = '';
			}
			if(document.getElementById('input_DeliveryDateDD_'+shipTo)){
				document.getElementById('input_DeliveryDateDD_'+shipTo).value = '';
			}
			if(document.getElementById('input_DeliveryDateYY_'+shipTo)){
				document.getElementById('input_DeliveryDateYY_'+shipTo).value = '';
			}
		}
	}
	if (document.getElementById('txtLocType_'+shipTo)){
		addresstype = document.getElementById('txtLocType_'+shipTo).value;
		state = document.getElementById('txtState_'+shipTo).options[document.getElementById('txtState_'+shipTo).selectedIndex];
		country = document.getElementById('txtCountry_'+shipTo).options[document.getElementById('txtCountry_'+shipTo).selectedIndex];
	}
	xmlhttp = new GetXmlHttpObject();
	xmlhttp.open('POST','/ajaxed/changeshipmethod.asp?method='+f+'&nick='+escape(shipTo)+'&state='+state+'&country='+country+'&type='+addresstype + "&futuredate=" + futuredate,true);
	//alert("&futuredate=" + futuredate);
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				//clear last selected options
				for(i=1;i<=8;i++){
					if (document.getElementById('ship_type_' + shipTo + "_" + i)){
						document.getElementById('ship_type_' + shipTo+ "_" + i).style.backgroundColor = '#ffffff';
					}
					if (document.getElementById('ship_type_cost_' + shipTo+ "_" + i)){
						document.getElementById('ship_type_cost_' + shipTo+ "_" + i).style.backgroundColor = '#ffffff';
					}
					if (document.getElementById('ship_type_estdelivery_' + shipTo+ "_" + i)){
						document.getElementById('ship_type_estdelivery_' + shipTo+ "_" + i).style.backgroundColor = '#ffffff';
					}
				}
				var successMsg = eval(xmlhttp.responseText);
				var totalShip = 0;
				if (document.getElementById('shipdollars_' + shipTo))
				{
					totalShip = document.getElementById('shipdollars_' + shipTo).value;
				}
				var nickShip = 0;
				if (document.getElementById('ship_'+shipTo))
				{
					nickShip = document.getElementById('ship_'+shipTo).value;
				}
				totalShip = (parseFloat(totalShip) - parseFloat(nickShip)) + parseFloat(successMsg[0]);
				var subtotal = '0';
				if (document.getElementById('subtotal'))
				{
					subtotal = document.getElementById('subtotal').innerHTML;
				}
				subtotal = subtotal.replace('$','');
				subtotal = subtotal.replace(',','');
				var discount = '0';
				if (document.getElementById('discount'))
				{
					discount = document.getElementById('discount').innerHTML;
				}
				discount = discount.replace('$','');
				discount = discount.replace(',','');
				discount = discount.replace('-','');
				discount = discount.replace(' ','');
				var curtotal = parseFloat(subtotal) - parseFloat(discount) + parseFloat(totalShip);
				if (document.getElementById('shipdollars_' + shipTo)){
					document.getElementById('shipdollars_' + shipTo).value = parseFloat(totalShip).toFixed(2);
				}
				if (document.getElementById('ship_'+shipTo)){
					document.getElementById('ship_'+shipTo).value = parseFloat(successMsg[0]).toFixed(2);
				}
				if (document.getElementById('shippingtotal')){
					document.getElementById('shippingtotal').innerHTML = '$' + parseFloat(totalShip).toFixed(2);
				}
				if (document.getElementById('FinalTotal')){
					document.getElementById('FinalTotal').innerHTML = '$' + parseFloat(curtotal).toFixed(2);
				}
				if (document.getElementById('txtShipMethod_' + shipTo) && document.getElementById('shipmethodname_' + shipTo)){
					document.getElementById('shipmethodname_' + shipTo).innerHTML = successMsg[1];
				}
				if (document.getElementById('ItmShipTotal_' + shipTo)){
					document.getElementById('ItmShipTotal_' + shipTo).innerHTML = '$' + parseFloat(successMsg[0]).toFixed(2);
				}
				if (document.getElementById('shipmethoddesc_' + shipTo)){
					document.getElementById('shipmethoddesc_' + shipTo).innerHTML = successMsg[2];
					document.getElementById('shipmethoddesc_' + shipTo).style.display = 'block';
				}
				if (document.getElementById('ship_type_' + shipTo + '_' + ship_type_row)){
					document.getElementById('ship_type_' + shipTo + '_' + ship_type_row).style.backgroundColor = '#f8f1e3';
				}
				if (document.getElementById('ship_type_cost_' + shipTo + '_' + ship_type_row)){
					document.getElementById('ship_type_cost_' + shipTo + '_' + ship_type_row).style.backgroundColor = '#f8f1e3';
				}
				if (document.getElementById('ship_type_estdelivery_' + shipTo + '_' + ship_type_row)){
					document.getElementById('ship_type_estdelivery_' + shipTo + '_' + ship_type_row).style.backgroundColor = '#f8f1e3';
				}
				last_ship_selected_type = shipTo + "_" + ship_type_row;
			}
		}
	}
	xmlhttp.send(null);
}
function ViewShipMethodReview(f, shipTo,ship_type_row)
{
	var addresstype = '';
	var state = '';
	var country = '';
	var shipmethod = '';
	if(!ship_type_row){
		ship_type_row = 1;
	}
	//64_B and 64C_B are the pseudo standard type for select a date version of standard shipping
	//it is not a valid ship type and must be reset to the valid standard code
	if (document.getElementById('fod_'+shipTo)){
		if (f == '64S'){
			
			document.getElementById('fod_'+shipTo).style.display = 'block';
			if(document.getElementById("input_DeliveryDate_" + shipTo)){
				if(document.getElementById("input_DeliveryDate_" + shipTo).value == ""){
					if(document.getElementById('input_DeliveryDateMM_'+shipTo)){
						document.getElementById('input_DeliveryDateMM_'+shipTo).value = 'MM';
					}
					if(document.getElementById('input_DeliveryDateDD_'+shipTo)){
						document.getElementById('input_DeliveryDateDD_'+shipTo).value = 'DD';
					}
					if(document.getElementById('input_DeliveryDateYY_'+shipTo)){
						document.getElementById('input_DeliveryDateYY_'+shipTo).value = 'YY';
					}
				}
			}
		} else {
			document.getElementById('fod_'+shipTo).style.display = 'none';
			if(document.getElementById("input_DeliveryDate_" + shipTo)){
				document.getElementById("input_DeliveryDate_" + shipTo).value = "";
			}
			if(document.getElementById('input_DeliveryDateMM_'+shipTo)){
				document.getElementById('input_DeliveryDateMM_'+shipTo).value = '';
			}
			if(document.getElementById('input_DeliveryDateDD_'+shipTo)){
				document.getElementById('input_DeliveryDateDD_'+shipTo).value = '';
			}
			if(document.getElementById('input_DeliveryDateYY_'+shipTo)){
				document.getElementById('input_DeliveryDateYY_'+shipTo).value = '';
			}
		}
	}
	if (document.getElementById('txtLocType_'+shipTo)){
		addresstype = document.getElementById('txtLocType_'+shipTo).value;
		state = document.getElementById('txtState_'+shipTo).options[document.getElementById('txtState_'+shipTo).selectedIndex];
		country = document.getElementById('txtCountry_'+shipTo).options[document.getElementById('txtCountry_'+shipTo).selectedIndex];
	}
	xmlhttp = new GetXmlHttpObject();
	xmlhttp.open('POST','/ajaxed/getshipmethod.asp?method='+f+'&nick='+escape(shipTo)+'&state='+state+'&country='+country+'&type='+addresstype,true);
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				//clear last selected options
				for(i=1;i<=8;i++){
					if (document.getElementById('ship_type_' + shipTo + "_" + i)){
						document.getElementById('ship_type_' + shipTo+ "_" + i).style.backgroundColor = '#ffffff';
					}
					if (document.getElementById('ship_type_cost_' + shipTo+ "_" + i)){
						document.getElementById('ship_type_cost_' + shipTo+ "_" + i).style.backgroundColor = '#ffffff';
					}
					if (document.getElementById('ship_type_estdelivery_' + shipTo+ "_" + i)){
						document.getElementById('ship_type_estdelivery_' + shipTo+ "_" + i).style.backgroundColor = '#ffffff';
					}
				}
				var successMsg = eval(xmlhttp.responseText);
				var totalShip = 0;
				if (document.getElementById('shipdollars'))
				{
					totalShip = document.getElementById('shipdollars').value;
				}
				var nickShip = 0;
				if (document.getElementById('ship_'+shipTo))
				{
					nickShip = document.getElementById('ship_'+shipTo).value;
				}
				totalShip = (parseFloat(totalShip) - parseFloat(nickShip)) + parseFloat(successMsg[0]);
				var subtotal = '0';
				if (document.getElementById('subtotal'))
				{
					subtotal = document.getElementById('subtotal').innerHTML;
				}
				subtotal = subtotal.replace('$','');
				subtotal = subtotal.replace(',','');
				var discount = '0';
				if (document.getElementById('discount'))
				{
					discount = document.getElementById('discount').innerHTML;
				}
				discount = discount.replace('$','');
				discount = discount.replace(',','');
				discount = discount.replace('-','');
				discount = discount.replace(' ','');
				var curtotal = parseFloat(subtotal) - parseFloat(discount) + parseFloat(totalShip);
				if (document.getElementById('shipdollars')){
					document.getElementById('shipdollars').value = parseFloat(totalShip).toFixed(2);
				}
				if (document.getElementById('ship_'+shipTo)){
					document.getElementById('ship_'+shipTo).value = parseFloat(successMsg[0]).toFixed(2);
				}
				if (document.getElementById('shippingtotal')){
					document.getElementById('shippingtotal').innerHTML = '$' + parseFloat(totalShip).toFixed(2);
				}
				if (document.getElementById('FinalTotal')){
					document.getElementById('FinalTotal').innerHTML = '$' + parseFloat(curtotal).toFixed(2);
				}
				if (document.getElementById('txtShipMethod_' + shipTo) && document.getElementById('shipmethodname_' + shipTo)){
					document.getElementById('shipmethodname_' + shipTo).innerHTML = successMsg[1];
				}
				if (document.getElementById('ItmShipTotal_' + shipTo)){
					document.getElementById('ItmShipTotal_' + shipTo).innerHTML = '$' + parseFloat(successMsg[0]).toFixed(2);
				}
				if (document.getElementById('shipmethoddesc_' + shipTo)){
					document.getElementById('shipmethoddesc_' + shipTo).innerHTML = successMsg[2];
					document.getElementById('shipmethoddesc_' + shipTo).style.display = 'block';
				}
				if (document.getElementById('ship_type_' + shipTo + '_' + ship_type_row)){
					document.getElementById('ship_type_' + shipTo + '_' + ship_type_row).style.backgroundColor = '#f8f1e3';
				}
				if (document.getElementById('ship_type_cost_' + shipTo + '_' + ship_type_row)){
					document.getElementById('ship_type_cost_' + shipTo + '_' + ship_type_row).style.backgroundColor = '#f8f1e3';
				}
				if (document.getElementById('ship_type_estdelivery_' + shipTo + '_' + ship_type_row)){
					document.getElementById('ship_type_estdelivery_' + shipTo + '_' + ship_type_row).style.backgroundColor = '#f8f1e3';
				}
				last_ship_selected_type = shipTo + "_" + ship_type_row;
			}
		}
	}
	xmlhttp.send(null);
}
function topnavOn(inBlock,inCat)
{
	inBlock.src = '/grafx/pf/topnav-'+inCat+'_roll.gif';
}
function topnavOff(inBlock,inCat)
{
	inBlock.src = '/grafx/pf/topnav-'+inCat+'.gif';
}
function topnav2On(inBlock,inCat)
{
	inBlock.src = '/grafx/pf/topnav2-'+inCat+'_roll.gif';
}
function topnav2Off(inBlock,inCat)
{
	inBlock.src = '/grafx/pf/topnav2-'+inCat+'.gif';
}
function addGiftList(sku,cartID) {
	var a;
	if(!document.getElementById('gift_list')) {
		a = document.createElement('DIV');
		a.id = 'gift_list';
		document.body.appendChild(a);
	}
	a = document.getElementById('gift_list');
	loadVeil();
	if (document.getElementById('Sku'))
	{
		sku = document.getElementById('Sku').value;
		qty = document.getElementById('qty').value;
	}
	xmlhttp = new GetXmlHttpObject();
	xmlhttp.open('GET','/products-addgiftlist.asp?sku='+sku+'&cartid='+cartID+'&qty='+qty,true);
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				a.innerHTML = xmlhttp.responseText;
				var divWidth = 230;
				var divHeight = 280;
				var setX = ( getViewportWidth() - divWidth ) / 2;
				var setY = ( getViewportHeight() - divHeight ) / 2;
				if( setX < 0 ) setX = 0;
				if( setY < 0 ) setY = 0;
				a.style.left = setX + "px";
				a.style.top = getViewportScrollY() + setY + "px";
				a.style.display = 'block';
				return false;
			}
		}
	}
	xmlhttp.send(null);
}
function submitGiftList(f) {
	var params = getParams(f);
	params = params.replace(/%2C/, "___");
	var xmlhttp = GetXmlHttpObject();	
	xmlhttp.open('POST','/products-addgiftlist-process.asp',true);	
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");		
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var a = document.getElementById('gift_list');
				a.innerHTML = "<p class='txtCenter'><br>Successfully Added!<br><br><br><a href=\"javascript:goGiftlist()\">Go to Gift List</a><br><br><br><a href=\"javascript:closeWin()\">Continue Shopping</a></p>";
			}
		}
	}
	xmlhttp.send(params);	
}
function goGiftlist() {
	window.location.href = '/mygiftlist.asp';
}
function getParams(frm) {
  var getstr = "";
  for (i=0; i<frm.elements.length; i++) {
	 if (frm.elements[i].tagName == "INPUT") {
		if (frm.elements[i].type == "text" || frm.elements[i].type == "hidden" || frm.elements[i].type == "textarea") {
		   getstr += frm.elements[i].name + "=" + encodeURIComponent(frm.elements[i].value) + "&";
		}
		if (frm.elements[i].type == "checkbox") {
		   if (frm.elements[i].checked) {
			  getstr += frm.elements[i].name + "=" + encodeURIComponent(frm.elements[i].value) + "&";
		   } else {
			  getstr += frm.elements[i].name + "=&";
		   }
		}
		if (frm.elements[i].type == "radio") {
		   if (frm.elements[i].checked) {
			  getstr += frm.elements[i].name + "=" + encodeURIComponent(frm.elements[i].value) + "&";
		   }
		}
	 }   
	 if (frm.elements[i].tagName == "SELECT") {
		var sel = frm.elements[i];
		getstr += sel.name + "=" + sel.options[sel.selectedIndex].value + "&";
	 }         
  }
  return getstr;
}
function closeWin() {
	if(document.getElementById('win_warning')) document.getElementById('win_warning').style.display = 'none';
	if(document.getElementById('gift_list')) document.getElementById('gift_list').style.display = 'none';
	document.getElementById('veil').style.width = '1px';
	document.getElementById('veil').style.height = '1px';
	document.getElementById('veil').style.display = 'none';
}
function borderError(nfield)
{
	nfield.style.border = '1px solid #872434';
}
function borderOk(nfield)
{
	nfield.style.border = '1px solid #7f9db9';
}
function custid_help(){
	ch = document.getElementById("custid_help");
	if(ch.style.display == "none"){
		loadVeil();
		ch.style.display = "block";
		ch.scrollIntoView(true);
	}else{
		document.getElementById("veil").style.display = "none";
		ch.style.display = "none";
	}
}