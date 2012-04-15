var W3C = (!document.all && document.getElementById);
var IE = (document.all);
var ns4 = (document.layers);
var version = navigator.appVersion;
var IE6 = (version.indexOf("MSIE 6.0") != -1) ? true : false;
var v_debug = false;


function showPopupByFullUrl(url,  title, pWidth, pHeight, scroll) {
	try {
		setDomain();
		var url = url;
		var vWidth = 745;
		var vHeight = 520;
		var vScroll = 'no';
		if (pWidth != undefined) vWidth = pWidth;
		if (pHeight != undefined) vHeight = pHeight;
		if ((scroll != undefined) && (scroll == 'scroll')) vScroll = 'yes';
		var mainPopupBody = getElementObj('baseDivId');
		mainPopupBody.style.visibility="visible";
		setDomain();
		getElementObjLink("baseDivId").innerHTML = " ";
		mainPopupBody.innerHTML = '<iframe src="' + url + '" id="ifm2" frameborder="0" width="' + vWidth + '" height="' + vHeight + '" scrolling="' + vScroll + '"style="z-index:-1; left: 0px; top: 0px;"></iframe>';
		var mainPopupDiv = getElementObj('mainPopupDiv2');
		mainPopupDiv.style.width = (vWidth) + 'px';
		mainPopupDiv.style.height = (vHeight + 80) + 'px'; 
		getElementObj("mainPopUpTitle2").innerHTML = title;
		overLayDiv_id = overLayDiv(true);		
		divPopUp('mainPopupDiv2',true);
		var mainPopupDiv = getElementObj("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'visible') mainPopupDiv.style.zIndex = '';
		hideSelectOption(true);
	} catch(e) {
		// do nothing
	}
}  // end of showPopupByFullUrl

function changePopupByFullUrl(url,  title, pWidth, pHeight, scroll) {
	try {
		setDomain();
		divPopUpLink('mainPopupDiv2',false);
		getElementObjLink('mainPopupButton2').innerHTML = " ";
		visibleElementLink("popCloseButton2", true);
		var url = url;
		var vWidth = 745;
		var vHeight = 520;
		var vScroll = 'no';
		if (pWidth != undefined) vWidth = pWidth;
		if (pHeight != undefined) vHeight = pHeight;
		if ((scroll != undefined) && (scroll == 'scroll')) vScroll = 'yes';		
		var mainPopupDiv = getElementObjLink('mainPopupDiv2');
		mainPopupDiv.style.width = (vWidth + 45) + 'px';
		mainPopupDiv.style.height = (vHeight + 80) + 'px';
		setDomain();
		getElementObjLink("mainPopUpTitle2").innerHTML = title;
		divPopUpLink('mainPopupDiv2',true);
		var mainPopupBody = getElementObjLink('baseDivId');
		mainPopupBody.style.visibility="visible";
		mainPopupBody.innerHTML = '<iframe src="' + url + '" id="ifm2" frameborder="0" width="' + vWidth + '" height="' + vHeight + '" scrolling="' + vScroll + '"style="z-index:-1; left: 0px; top: 0px; "></iframe>';
		var mainPopupDiv = getElementObjLink("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'visible') mainPopupDiv.style.zIndex = '';
		hideSelectOption(true);
	} catch(e) {
		// do nothing
	}
}  // end of showPopupByFullUrl

function hideSelectOption(p) {
	try {
		// for IE6
		var version=navigator.appVersion;
		if (version.indexOf("MSIE 6.0") != -1){ 
			var select_array = document.getElementsByTagName("select");
			for (i=0; i<select_array.length; i++) {
				if (p) {
					visibleElement(select_array[i], false);
				} else {
					visibleElement(select_array[i], true);
				}
			}
		}
	} catch(e) {
		// do nothing
	}
}


function getElementObj(param) {	
	try {		
		if (typeof param == 'object') {
			return param;
		}
		else {
			if (document.getElementById) { // W3C - Explorer 5+ and Netscape 6+
				return  document.getElementById(param);
			}
			else if (document.all) { // Explorer 4
				return document.all[param];
			}
			else if (document.layers) {  // NS4
				return document.layers[param];
			}
		}
	} catch(e) {
		displayError(arguments.callee.toString());
	}
}  // end of getElementObj


function overLayDiv(param) {
	try {
		var winW = 1, winH = 1;
		var v_filter = 0; v_opacity = 0;
		var v_name = "overlayDiv";
		var obj;

		obj = this.getElementObj(v_name);		
		if (obj == null) {
			divElement = document.createElement("div");
			divElement.setAttribute('id', v_name);
			divElement.setAttribute('style', "z-index:50;");
			document.getElementsByTagName('body')[0].appendChild(divElement);
			obj = this.getElementObj(v_name);
		}

		if (param == true) {
			if (IE) {
				winW = document.body.scrollWidth;
				winH = document.body.scrollHeight ;
				var iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
				if (winH < iebody.clientHeight) winH = iebody.clientHeight;
				v_filter ="alpha(opacity=50)";
				v_opacity = "50";
			} else {
				winW = document.width;
				winH = document.height;
				if (winH < window.innerHeight) winH = window.innerHeight;
				v_filter ="alpha(opacity=.5)";
				v_opacity = ".5";
			}
			// winW = screen.width; // fix for overlay when user resizes window
			obj.style.filter = v_filter;
			obj.style.opacity = v_opacity;
		}
		
		obj.style.position = "absolute";
		obj.style.top = "0px";
		obj.style.left = "0px";
		obj.style.height = winH + "px";
		obj.style.width = winW + "px";
		obj.style.backgroundColor = "black";		
		return(v_name);
	} catch(e) {
		displayError(arguments.callee.toString());
	}
}
	
function divPopUp(id, visible) {
	try 
	{				
		visibleElement(id, visible);
		if (visible)
		{
			centerDiv(id);			
		}
	} catch(e) {
		displayError(arguments.callee.toString());
	}
} // end of divPopUp

function visibleElement(p1, status) {
	try {
		var obj = getElementObj(p1);
		
		if (obj != undefined) {
			if (status == true) {
				obj.style.visibility = "";
			} else if (status == false) {
				obj.style.visibility = "hidden";
			}
		}
	} catch(e) {
		displayError(arguments.callee.toString());
	}
}

function centerDiv(param) {
	try {
		var dsocLeft=0, dsocTop=0;
		obj = this.getElementObj(param);
		if (IE) {
			var iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
			winH = parseInt(iebody.clientHeight / 2);
			winW = parseInt(iebody.clientWidth / 2);
			dsocLeft = iebody.scrollLeft;
			dsocTop = iebody.scrollTop;
		} else {
			winH = parseInt(window.innerHeight / 2);
			winW = parseInt(window.innerWidth / 2);
			dsocLeft = window.pageXOffset;
			dsocTop = window.pageYOffset; 
		}
		var top = dsocTop + winH - parseInt(obj.offsetHeight / 2); 
		var left = dsocLeft + winW - parseInt(obj.offsetWidth / 2);
		
		if (top < 0) top = 10;
		if (left < 0) left = 10;
		
		obj.style.top = top + "px";
		obj.style.left = left + "px";
	} catch(e) {
		displayError(arguments.callee.toString());
	}
} 

function closePopup(divId) {

	try {
		if(document.getElementById("ifm2") != null
				&& document.getElementById("ifm2").contentWindow.document.getElementById("storeLocatorPage")!=null) {
			var isStoreLocatorPage =document.getElementById("ifm2").contentWindow.document.getElementById("storeLocatorPage").value;
			if(isStoreLocatorPage=="yes")
			{
				DWRRequestManager.resetValuesOfSession(sessionCallBack);	
				isStoreLocatorPage="No";
			}
		}
	} catch(e) {
		// do nothing
	}

	try {
		var mainPopupDiv = getElementObj("mainPopupDiv");
		if (divId == undefined) 
		{
			overLayDiv_id = overLayDiv(false);
			divPopUp('mainPopupDiv',false);
			getElementObj("mainPopupBody").innerHTML = " ";
			visibleElement("popCloseButton", true);
			getElementObj("mainPopupButton").innerHTML = " ";
		}
		else if (divId == '2') 
		{				
			if (mainPopupDiv.style.visibility == 'hidden') 
			{
				overLayDiv_id = overLayDiv(false);
			} 
			else 
			{
				mainPopupDiv.style.zIndex = '100';
			}
			divPopUp('mainPopupDiv2',false);
			getElementObj("baseDivId").innerHTML = " ";
			visibleElement("popCloseButton2", true);
			getElementObj("mainPopupButton2").innerHTML = " ";
			//window.location.href = window.location.href;
		}
		else
		{
			overLayDiv_id = overLayDiv(false);
			divPopUp(divId,false);
		}

		if (IE6) 
		{
			if (mainPopupDiv.style.visibility == 'hidden') 
			{
				hideSelectOption(false);
			}
		}
	} catch(e) {
		// do nothing
	}
} // end of closePopup

function getElementObjLink(param)
{
	try 
	{		
		if (typeof param == 'object') 
		{
			return param;
		}
		else 
		{
			if (top.document.getElementById) 
			{ 
				// W3C - Explorer 5+ and Netscape 6+
				return  top.document.getElementById(param);
			}
			else if (top.document.all) 
			{ // Explorer 4
				return top.document.all[param];
			}
			else if (top.document.layers) 
			{  // NS4
				return top.document.layers[param];
			}
		}
	} 
	catch(e) 
	{
		displayError(arguments.callee.toString());
	}
}  // end of getElementObjLink


function closePopupLink(param) 
{
	setDomain();
	try {
		var mainPopupDiv = getElementObjLink("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'hidden')
		{
			overLayDiv_id = overLayDivLink(false);
		}
		else
		{
			mainPopupDiv.style.zIndex = '100';
		}
		divPopUpLink('mainPopupDiv2',false);
		getElementObjLink("baseDivId").style.visibility = "hidden";
	} catch (e) {
	}
	window.parent.location.href="/cell-phone-service/cart/";
}

function showOlamLogin(param) 
{
	setDomain();
	try {
		var mainPopupDiv = getElementObjLink("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'hidden')
		{
			overLayDiv_id = overLayDivLink(false);
		}
		else
		{
			mainPopupDiv.style.zIndex = '100';
		}
		divPopUpLink('mainPopupDiv2',false);
		getElementObjLink("baseDivId").style.visibility = "hidden";
	} catch (e) {
	}
	window.parent.location.href=param;
}

function cancelPopupLink(param) 
{
	setDomain();
	try {
		var mainPopupDiv = getElementObjLink("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'hidden')
		{
			overLayDiv_id = overLayDivLink(false);
		}
		else
		{
			mainPopupDiv.style.zIndex = '100';
		}
		divPopUpLink('mainPopupDiv2',false);
		getElementObjLink("baseDivId").style.visibility = "hidden";
		visibleElementLink("popCloseButton2", true);
		getElementObjLink("mainPopupButton2").innerHTML = " ";
	} catch (e) {
		if(param) {
			window.parent.location.href=param;
		}
	}
}


function overLayDivLink(param)
{
	try 
	{
		var winW = 1, winH = 1;
		var v_filter = 0; v_opacity = 0;
		var v_name = "overlayDiv";
		var obj;

		obj = getElementObjLink(v_name);		
		if (obj == null) {
			divElement = document.createElement("div");
			divElement.setAttribute('id', v_name);
			divElement.setAttribute('style', "z-index:50;");
			document.getElementsByTagName('body')[0].appendChild(divElement);
			obj = this.getElementObjLink(v_name);
		}

		if (param == true) {
			if (IE) {
				winW = document.body.scrollWidth;
				winH = document.body.scrollHeight ;
				var iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
				if (winH < iebody.clientHeight) winH = iebody.clientHeight;
				v_filter ="alpha(opacity=50)";
				v_opacity = "50";
			} else {
				winW = document.width;
				winH = document.height;
				if (winH < window.innerHeight) winH = window.innerHeight;
				v_filter ="alpha(opacity=.5)";
				v_opacity = ".5";
			}
			// winW = screen.width; // fix for overlay when user resizes window
			obj.style.filter = v_filter;
			obj.style.opacity = v_opacity;
		}
		
		obj.style.position = "absolute";
		obj.style.top = "0px";
		obj.style.left = "0px";
		obj.style.height = winH + "px";
		obj.style.width = winW + "px";
		obj.style.backgroundColor = "black";		
		return(v_name);
	} catch(e) {
		displayError(arguments.callee.toString());
	}
}

function hideSelectOptionLink(p) {
	try {
		// for IE6
		var version=navigator.appVersion;
		if (version.indexOf("MSIE 6.0") != -1){ 
			var select_array = document.getElementsByTagName("select");
			for (i=0; i<select_array.length; i++) {
				if (p) {
					visibleElement(select_array[i], false);
				} else {
					visibleElement(select_array[i], true);
				}
			}
		}
	} catch(e) {
		// do nothing
	}
}

function visibleElementLink(p1, status) 
{	
	try 
	{
		var obj = getElementObjLink(p1);
		
		if (obj != undefined) {
			if (status == true) {
				obj.style.visibility = "";
			} else if (status == false) {
				obj.style.visibility = "hidden";
			}
		}
	} catch(e) {
		displayError(arguments.callee.toString());
	}
}

	
function divPopUpLink(id, visible) {
	try 
	{				
		visibleElementLink(id, visible);
		if (visible)
		{
			if(this.getElementObj(id))
			{
				centerDiv(id);
			}
			else if (this.getElementObjLink(id))
			{
				centerDivLink(id);
			}
		}
	} catch(e) {
		displayError(arguments.callee.toString());
	}
} // end of divPopUp


function centerDivLink(param) {
	try {
		var dsocLeft=0, dsocTop=0;
		obj = this.getElementObjLink(param);
		if (IE) {
			var iebody = (parent.document.compatMode && parent.document.compatMode != "BackCompat") ? parent.document.documentElement : parent.document.body;
			winH = parseInt(iebody.clientHeight / 2);
			winW = parseInt(iebody.clientWidth / 2);
			dsocLeft = iebody.scrollLeft;
			dsocTop = iebody.scrollTop;
		} else {
			winH = parseInt(window.parent.innerHeight / 2);
			winW = parseInt(window.parent.innerWidth / 2);
			dsocLeft = window.parent.pageXOffset;
			dsocTop = window.parent.pageYOffset; 
		}
		var top = dsocTop + winH - parseInt(obj.offsetHeight / 2); 
		var left = dsocLeft + winW - parseInt(obj.offsetWidth / 2);
		
		if (top < 0) top = 10;
		if (left < 0) left = 10;
		
		obj.style.top = top + "px";
		obj.style.left = left + "px";
	} catch(e) {
		displayError(arguments.callee.toString());
	}
}

function showStartShopping(param) 
{
	setDomain();
	try {
		var mainPopupDiv = getElementObjLink("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'hidden')
		{
			overLayDiv_id = overLayDivLink(false);
		}
		else
		{
			mainPopupDiv.style.zIndex = '100';
		}
		divPopUpLink('mainPopupDiv2',false);
		getElementObjLink("baseDivId").style.visibility = "hidden";
	} catch (e) {
	}
	window.parent.location.href=param;
}

function showFindAStoreModule(param) 
{
	setDomain();
	try {
		var mainPopupDiv = getElementObjLink("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'hidden')
		{
			overLayDiv_id = overLayDivLink(false);
		}
		else
		{
			mainPopupDiv.style.zIndex = '100';
		}
		divPopUpLink('mainPopupDiv2',false);
		getElementObjLink("baseDivId").style.visibility = "hidden";
	} catch (e) {
	}
	window.parent.location.href=param;
}

function sessionCallBack(results) 
{ 
	//alert("session-->"+results);	 
}

function closePopupLinkResetValues(param,flag) 
{
	setDomain();
	var constantYes = "YES";
	setDomain();
	try {
		if(constantYes == flag.toUpperCase())
		{
			DWRRequestManager.resetValuesOfSession(sessionCallBack);
		}
		var mainPopupDiv = getElementObjLink("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'hidden')
		{
			overLayDiv_id = overLayDivLink(false);
		}
		else
		{
			mainPopupDiv.style.zIndex = '100';
		}
		divPopUpLink('mainPopupDiv2',false);
		getElementObjLink("baseDivId").style.visibility = "hidden";
	} catch (e) {
	}
	window.parent.location.href="/cell-phone-service/cart/";
}

function getFunctionName(str) {
	var ownName = str;
    ownName = ownName.substr('function '.length);        // trim off "function "
    ownName = ownName.substr(0, ownName.indexOf('('));   // trim off everything after the function name
	return ownName;
}

function displayError(str) {
	if (v_debug) alert("error occur in " + getFunctionName(str));
}

function setDomain() {
	try {
		var attDomain = 'att.com';
		var thisDomain = document.domain;
		var parentDomain = '';
		try {
			parentDomain = parent.document.domain;
		} catch (e) {
			// do nothing
		}

		if (thisDomain != parentDomain && thisDomain.indexOf(attDomain) != -1) {
			 document.domain = attDomain;
		}
	}
	catch (e) {
		// do nothing
	}
}
