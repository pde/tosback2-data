// JS Pass address params
var params = new Array();
function getParams(pDecode){
	var locationSearch = document.location.search.toString();
	locationSearch = (locationSearch.substring(0,1) == "?") ? locationSearch.substring(1) : locationSearch;
	var searchParamsArr = locationSearch.split("&");
	for (var i=0; i<searchParamsArr.length; i++)
	{
		var searchParamArr = searchParamsArr[i].split("=");
		for (var y=0; y<searchParamArr.length; y++)
		{
			if (y == 0)
			{
				params[searchParamArr[y]] = "";
			}
			else
			{
				if (searchParamArr[0] == 'useGenre')
				{
					params[searchParamArr[0]] = eval(searchParamArr[y]);
				}
				else
				{
					params[searchParamArr[0]] = searchParamArr[y];
					if (pDecode)
					{
						params[searchParamArr[0]] = decodeURIComponent(params[searchParamArr[0]]);
					}
				}
			}
		}
	}
}

function show_active_menu_item()
{
	var menu_item = document.getElementById("active_menu_item");
	
	if (null != menu_item)
	{
		menu_item.style.visibility = 'visible';
	}
}

function redirectPage(URL)
{
	var redirForm = document.createElement("form");
	redirForm.method = "GET";
	redirForm.action = URL;
	document.body.appendChild(redirForm);
	redirForm.submit();
}

var aLang	= Array();
aLang['en']	= "English";
aLang['es']	= "Español";
aLang['fr']	= "Français";
aLang['de']	= "Deutsch";
aLang['it']	= "Italiano";
aLang['nl']	= "Nederlands";
aLang['pl']	= "Polski";
aLang['tr']	= "Türkçe";
aLang['pt']	= "Português";
var sLocation	= document.location.toString(); 
sLocation	= sLocation.replace("http:\/\/","");
var params	= sLocation.split('.');

if ( params[0] == 'www' || (typeof aLang[params[0]] == "undefined") )
	params[0] = 'en';

if (aLang[params[0]])
{
	saveCookie('lng',params[0],365);
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return false;
}

function getCookieDomain()
{
	var hostDomain  = document.location.host;
	var domainParts = hostDomain.split('.');
	var dl          = domainParts.length;

	return (dl <= 2) ? '.' + hostDomain : '.' + (domainParts.slice(dl - 2)).join('.');
}

function saveCookie(name,value,days,domain,secure)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else
	{
		expires = "";
	}

	var domainStr = "";
	var secureStr = "";

	if (domain != null)
	{
		if (domain == true)
			domainStr = "domain=" + getCookieDomain() + "; ";
		else
			domainStr = "domain=" + domain + "; ";
	}

	if (secure != null && secure == true)
	{
		secureStr = "secure";
	}

	document.cookie = name + "=" + value + expires + "; " + domainStr + "path=/; " + secureStr;
}

function statsDownloadHit(urchinVar, hitValue)
{
	if (!hitValue)
		hitValue = 4;
	try
	{
		var pageTracker = _gat._getTracker(STATS_USER);
		pageTracker._initData();
		pageTracker._trackPageview(urchinVar);
	}
	catch(e)
	{
	}
	statsMakeHit(hitValue);
}

function statsMakeHit(statsEvent)
{
	var IMG = document.createElement("IMG");
	IMG.src = "http://wa.imesh.com/statistics/statistics.php?f=refstat&uid=0&e="+statsEvent+ ((appid) ? "&appid="+appid : "");
	IMG.style.width = "0px";
	IMG.style.height = "0px";
	IMG.style.display = "none";
	document.body.appendChild(IMG);
}


var headerImages = new Array();
headerImages[0] = "topHeader1.gif";
headerImages[1] = "topHeader2.gif";
headerImages[2] = "topHeader3.gif";
function setImageHeader()
{
	var rnd = Math.floor(Math.random()*(headerImages.length));
	var img = new Image();
	document.body.appendChild(img);
	img.style.display = "none";
	img.onload = function () {loadHeader(rnd);}
	img.src = "/images/music/" + headerImages[rnd];
}

function loadHeader(rnd)
{	
	var headerImage = document.getElementById('headerImage');
	headerImage.style.backgroundImage = "url('/images/music/" + headerImages[rnd] + "')";
	headerImage.style.backgroundRepeat = "no-repeat";
	headerImage.style.backgroundPosition = "top right";
}


function populateDropdownList(targetElement, dropdownElement, pClone)
{
	var newDropdown;
	
	if (pClone)
	{
		newDropdown = dropdownElement.cloneNode(true);
		var contlist = newDropdown.childNodes;
		for (var i=0;i<contlist.length;i++)
		{
			contlist[i].onmouseover = function() {this.style.backgroundColor="#2b6897";}
			contlist[i].onmouseout = function() {this.style.backgroundColor="transparent";}
			contlist[i].onclick = function() {this.style.backgroundColor="transparent";}
		}
	}
	else
	{
		newDropdown = dropdownElement;
	}
	
	var res = targetElement.appendChild(newDropdown);
	if (res)
	{
		targetElement.populated = true;
		res.style.display = "block";
	}
	if (document.getElementById("topLangController"))
	{
		if (document.getElementById("topLangController").className == "dropDownFlag")
			document.getElementById("topLangController").style.backgroundImage = "url('/images/music/flag" + (params[0].toUpperCase()) + ".gif')";
		else
			document.getElementById("topLangController").innerHTML = aLang[params[0]] + document.getElementById("topLangController").innerHTML.replace(/.*?\<IMG/i,"<img");
	}
}

function createLangDropdown()
{
	var firefox = document.getElementById && !document.all;
	if (!firefox)
	{
		try {document.execCommand("BackgroundImageCache", false, true);}catch(e){}
	}
	var langDiv = document.createElement("DIV");
	langDiv.id = "langContent";
	langDiv.style.paddingTop = "5px";
	langDiv.style.paddingBottom = "5px";
	flagsCount = 0;
	for (var i in aLang)
	{
		var currLangCont = document.createElement("DIV");
		var currFlagLink = document.createElement("A");
		var currTextLink = document.createElement("A");
		
		currLangCont.onmouseover = function() {this.style.backgroundColor="#2b6897";}
		currLangCont.onmouseout = function() {this.style.backgroundColor="transparent";}
		currLangCont.onclick = function() {this.style.backgroundColor="transparent";}
		
		var currLang = document.createElement("TABLE");
		currLang.cellPadding = "0";
		currLang.cellSpacing = "0";
		currLang.border = "0";
		var currLangText = document.createElement("SPAN");
		
		var oRow = currLang.insertRow(-1);
		var oCell = oRow.insertCell(-1);
		oCell.style.paddingTop = "2px";
		var currLangFlag = document.createElement("SPAN");
		currLangFlag.className = "langFlag";
		currLangFlag.style.width="29px";
		currLangFlag.style.display = "block";
		currLangFlag.style.backgroundPosition = "7px -"+(17*flagsCount)+"px";
		currFlagLink.style.color="transparent";
		
		currLangText.innerHTML = aLang[i];
		
		if (i == params[0])
		{
			currTextLink.className = "langBarSelectedText"
			currLangFlag.style.cursor = "default";
		}
		else
		{
			currFlagLink.href = "http:\/\/" + (i == "en" ? "www" : i) + ".imesh.com";
			currTextLink.href = "http:\/\/" + (i == "en" ? "www" : i) + ".imesh.com";
			
			currTextLink.className = "langBarText"
		}
		currFlagLink.appendChild(currLangFlag);
		currTextLink.appendChild(currLangText);
		currTextLink.style.width = "100px";
		currTextLink.style.display = "block";
		oCell.appendChild(currFlagLink);
		oCell = oRow.insertCell(-1);
		oCell.appendChild(currTextLink);
		
		currLangCont.appendChild(currLang);
		langDiv.appendChild(currLangCont);		
		flagsCount++;
	}
	
	document.body.appendChild(langDiv);	
	langDiv.style.display = "none";
}

var DDSPEED = 10;
var DDTIMER = 15;

function handleDropdown(controllerId, dropdownId, pDir, mid)
{
	var dControlerObj = document.getElementById(controllerId);
	var dropdownObj = document.getElementById(dropdownId);

	var startingDelay = (mid ? 500 : 0);

	if (!dropdownObj.populated)
		return;	

	clearInterval(dropdownObj.timer);
	clearTimeout(dControlerObj.timer);
	if (pDir == 1)
	{
		if (dropdownObj.style.height != '' && dropdownObj.style.display != 'none')
			openDropdown(controllerId, dropdownId, pDir);
		else
			dControlerObj.timer = setTimeout(function() {openDropdown(controllerId, dropdownId, pDir)},startingDelay);
	}
	else
	{
		dControlerObj.timer = setTimeout(function(){hideDropdown(dropdownObj)},550);
	}
}

function openDropdown(controllerId, dropdownId, pDir)
{
	var dControlerObj = document.getElementById(controllerId);
	var dropdownObj = document.getElementById(dropdownId);
	
	dropdownObj.style.display = 'block';
	if(dropdownObj.maxh && dropdownObj.maxh <= dropdownObj.offsetHeight)
	{
		return;
	}
	else if (!dropdownObj.maxh)
	{
		dropdownObj.style.height = 'auto';
		dropdownObj.maxh = dropdownObj.offsetHeight;
		dropdownObj.style.height = '2px';
	}
	dropdownObj.timer = setInterval(function(){showDropdown(dropdownObj,1)},DDTIMER);
}

function hideDropdown(dropdownObj)
{
	dropdownObj.timer = setInterval(function(){showDropdown(dropdownObj,-1)},DDTIMER);
}

function cancelHide(controllerId, dropdownId)
{
	var dControlerObj = document.getElementById(controllerId);
	var dropdownObj = document.getElementById(dropdownId);
	
	clearTimeout(dControlerObj.timer);
	clearInterval(dropdownObj.timer);
	if (dropdownObj.offsetHeight < dropdownObj.maxh)
	{
		dropdownObj.timer = setInterval(function(){showDropdown(dropdownObj,1)},DDTIMER);
	}
}

function showDropdown(obj, pDir)
{
	var currh = obj.offsetHeight;
	var dist;
	
	if (pDir == 1)
	{
		if ((currh + DDSPEED) > obj.maxh)
		{
			clearInterval(obj.timer);
			obj.style.height = obj.maxh;
			return;
		}
		else
			obj.style.height = (currh + DDSPEED) + 'px';
	}
	else
	{
		if ((currh - DDSPEED) < 2)
		{
			clearInterval(obj.timer);
			obj.style.display = "none";
			return;
		}
		else
			obj.style.height = (currh - DDSPEED) + 'px';
	}
}


/******/
//v1.7
// Flash Player Version Detection
// Detect Client Browser type
// Copyright 2005-2007 Adobe Systems Incorporated.  All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

		// is the major.revision >= requested major.revision AND the minor version >= requested minor
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
/******/