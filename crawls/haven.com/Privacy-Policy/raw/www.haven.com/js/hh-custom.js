/* ***
 * Haven Custom Code - in-house dev team
 * 
 * Created: 2010/05/03
 * 
 * Notes: created for Haven to perform custom tasks on pages without modifying agency (Nucleus) js files.
 * 
 *        For http optimisation purposes, Nucleus have combined the following scripts into this (on 24th Nov 2010): -
 *        - webabacus-tag.js
 *        - natsearch.js
 * 
 *        2011/01/04 - removed natsearch.js from this file, as /js/natsearch.js is already being included.
 *        2011/01/24 - added, as it appears /js/natsearch.js is actually no longer included in page!
 *
 * *** */


/* webabacus-tag.js ####################################################### */

/* WEBABACUS CLIENT INFO VERSION 3.01,
 * (c)2007 Foviance Ltd ALL RIGHTS RESERVED.
 * Version to be used as a JS include
 * See accompanying clientinfo-include-notes.txt for change history, or contact helpdesk@foviance.com
 */

/* Server that data will be sent to, e.g. "http://tag1.webabacus.com" */
var server = "http://www.haven.com";

/* Server that secure requests will be sent to, e.g. "https://tag1.webabacus.com" */
var secureserver = "https://www.haven.com";

/* Site Name*/
var site = "BH_Haven_2009";

/* No. of days that the cookie is valid for (default is 730 - two years)*/
var cookieLife = 730;

/* (Optional) Domain for the cookie (must start with and include at least two full stops
 * e.g. .webabacus.com or .webabacus.co.uk)*/
var cookieDomain = "";

/* (Optional) Name of the parameter in the query string which indicates a source value */
var sourceparamname = "wa_mkt";

/* (Optional) Boolean to determine installed flash version, with the results written into the custom fields. Note this uses the SWFObjects code - Copyright (c) 2007 Geoff Stearns*/
var checkFlash = true;

/* (Optional) List of document extensions that should be automatically tagged
 * separate with a common, e.g. "doc,pdf,zip".*/
var autoTagDocuments = "doc,pdf,zip,ppt,pps,wmv";

/* (Optional) Boolean to auto tag external links.*/
var autoTagExternalLinks = true;

/* (Optional) List of alternative domains which should be automatically tagged with the Visitor ID,
 * to allow cookie value hand-over (separate with a common, e.g. "www.webabacus.com,www.foviance.com").*/
var autoTagTrustedDomain = "";

/* WebAbacus reference to be passed to trusted domains (see 'autoTagTrustedDomain' above).*/
var WebAbacusRef = "webabacus_ref" ;

/* Boolean to control whether to set a third party cookie based on the 'server' variable above. Note the 'clientinfo.asp' file MUST present on the relevatn 'server'.*/
var ThirdPartyCookie = false;							

/* Boolean to control whether to disable first party cookies. Setting this to 'true' will prevent the WebAbacus tag code from setting a first party cookie. */
var DisableFirstPartyCookies = false;

/* Test Variable */
var testvar = "";

/* Booking Variable */
var HomePageBooking = 0;

/* Offer String Array */
var OfferURLArray = new Array(3);

/* Offertyperef Variable */
var Offertyperef;

/* Holidaytype Variable */
var Holidaytype;

/* Linkname Variable */
var Linkname= "";


/* Offertyperef Variable */
var lateOfferRef= "";

/* Holidaytype Variable */
var lateOfferType= "";



/*The following code loads the Flash Detector Object*/
if(typeof deconcept=="undefined") var deconcept=new Object()
if(typeof deconcept.util=="undefined") deconcept.util=new Object();
if(typeof deconcept.SWFObjectUtil=="undefined") deconcept.SWFObjectUtil=new Object();
deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){
	if(!document.getElementById) return;
	this.DETECT_KEY=_a?_a:"detectflash";
	this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params=new Object();
	this.variables=new Object();
	this.attributes=new Array();
	if(_1) this.setAttribute("swf",_1);
	if(id) this.setAttribute("id",id);
	if(w) this.setAttribute("width",w);
	if(h) this.setAttribute("height",h);
	if(_5) this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));
	this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();
	if(!window.opera&&document.all&&this.installedVer.major>7) deconcept.SWFObject.doPrepUnload=true;
	if(c) this.addParam("bgcolor",c);
	var q=_7?_7:"high";
	this.addParam("quality",q);
	this.setAttribute("useExpressInstall",false);
	this.setAttribute("doExpressInstall",false);
	var _c=(_8)?_8:window.location;
	this.setAttribute("xiRedirectUrl",_c);
	this.setAttribute("redirectUrl","");
	if(_9) this.setAttribute("redirectUrl",_9);
};
deconcept.SWFObject.prototype={
	useExpressInstall:function(_d){
		this.xiSWFPath=!_d?"expressinstall.swf":_d;
		this.setAttribute("useExpressInstall",true);
	},
	setAttribute:function(_e,_f){
		this.attributes[_e]=_f;
	},
	getAttribute:function(_10){
		return this.attributes[_10];
	},
	addParam:function(_11,_12){
		this.params[_11]=_12;
	},
	getParams:function(){
		return this.params;
	},
	addVariable:function(_13,_14){
		this.variables[_13]=_14;
	},
	getVariable:function(_15){
		return this.variables[_15];
	},
	getVariables:function(){
		return this.variables;
	},
	getVariablePairs:function(){
		var _16=new Array();
		var key;
		var _18=this.getVariables();
		for(key in _18){
			_16[_16.length]=key+"="+_18[key];
		}
		return _16;
	},
	getSWFHTML:function(){
		var _19="";
		if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
			if(this.getAttribute("doExpressInstall")){
				this.addVariable("MMplayerType","PlugIn");
				this.setAttribute("swf",this.xiSWFPath);
			}
			_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";
			_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";
			var _1a=this.getParams();
			for(var key in _1a){
				_19+=[key]+"=\""+_1a[key]+"\" ";
			}
			var _1c=this.getVariablePairs().join("&");
			if(_1c.length>0) {
				_19+="flashvars=\""+_1c+"\"";
			}
			_19+="/>";
		} else {
			if(this.getAttribute("doExpressInstall")){
				this.addVariable("MMplayerType","ActiveX");
				this.setAttribute("swf",this.xiSWFPath);
			}
			_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";
			_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";
			var _1d=this.getParams();
			for(var key in _1d){
				_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";
			}
			var _1f=this.getVariablePairs().join("&");
			if(_1f.length>0){
				_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";
			}
			_19+="</object>";
		}
		return _19;
	},
	write:function(_20){
		if(this.getAttribute("useExpressInstall")){
			var _21=new deconcept.PlayerVersion([6,0,65]);
			if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){
				this.setAttribute("doExpressInstall",true);
				this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));
				document.title=document.title.slice(0,47)+" - Flash Player Installation";
				this.addVariable("MMdoctitle",document.title);
			}
		}
		if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){
			var n=(typeof _20=="string")?document.getElementById(_20):_20;
			n.innerHTML=this.getSWFHTML();
			return true;
		} else {
			if(this.getAttribute("redirectUrl")!=""){
				document.location.replace(this.getAttribute("redirectUrl"));
			}
		}
		return false;
	}
};
deconcept.SWFObjectUtil.getPlayerVersion=function(){
	var _23=new deconcept.PlayerVersion([0,0,0]);
	if(navigator.plugins&&navigator.mimeTypes.length){
		var x=navigator.plugins["Shockwave Flash"];
		if(x&&x.description){
			_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));
		}
	} else {
		if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){
			var axo=1;
			var _26=3;
			while(axo){
				try{
					_26++;
					axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);
					_23=new deconcept.PlayerVersion([_26,0,0]);
				} catch(e) {
					axo=null;
				}
			}
		} else {
			try{
				var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			} catch(e) {
				try{
					var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
					_23=new deconcept.PlayerVersion([6,0,21]);
					axo.AllowScriptAccess="always";
				} catch(e) {
					if(_23.major==6) return _23;
				}
				try{
					axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				}catch(e){}
			}
			if(axo!=null){
				_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
			}
		}
	}
	return _23;
};
deconcept.PlayerVersion=function(_29){
	this.major=_29[0]!=null?parseInt(_29[0]):0;
	this.minor=_29[1]!=null?parseInt(_29[1]):0;
	this.rev=_29[2]!=null?parseInt(_29[2]):0;
};
deconcept.PlayerVersion.prototype.versionIsValid=function(fv){
	if(this.major<fv.major) return false;
	if(this.major>fv.major) return true;
	if(this.minor<fv.minor) return false; 
	if(this.minor>fv.minor) return true;
	if(this.rev<fv.rev) return false; 
	return true;
};
deconcept.util={
	getRequestParameter:function(_2b){
		var q=document.location.search||document.location.hash;
		if(_2b==null) return q;
		if(q){
			var _2d=q.substring(1).split("&");
			for(var i=0;i<_2d.length;i++){
				if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){
					return _2d[i].substring((_2d[i].indexOf("=")+1));
				}
			}
		}
		return "";
	}
};
deconcept.SWFObjectUtil.cleanupSWFs=function(){
	var _2f=document.getElementsByTagName("OBJECT");
	for(var i=_2f.length-1;i>=0;i--){
		_2f[i].style.display="none";
		for(var x in _2f[i]){
			if(typeof _2f[i][x]=="function"){
				_2f[i][x]=function(){};
			}
		}
	}
};
if(deconcept.SWFObject.doPrepUnload){
	if(!deconcept.unloadSet){
		deconcept.SWFObjectUtil.prepUnload=function(){
			__flash_unloadHandler=function(){};
			__flash_savedUnloadHandler=function(){};
			window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);
		};
		window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);
		deconcept.unloadSet=true;
	}
}
if(!document.getElementById&&document.all){
	document.getElementById=function(id){
		return document.all[id];
	};
}

function SetCookie(cookieName, cookieValue, nDays) {
	var today = new Date();
	var expire = new Date();
	if (nDays == null || nDays == 0) nDays = 1;
	expire.setTime(today.getTime() + 3600000 * 24 * nDays);
	if (!DisableFirstPartyCookies)
		document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString() + "; path=/" + (cookieDomain == "" ? "" : "; domain=" + cookieDomain);
}

function ReadCookie(cookieName) {
	var theCookie = "" + document.cookie;
	var ind = theCookie.indexOf(cookieName);
	if (ind == -1 || cookieName == "") return "";
	var ind1 = theCookie.indexOf(';', ind);
	if (ind1 == -1) ind1 = theCookie.length;
	return unescape(theCookie.substring(ind + cookieName.length + 1, ind1));
}

/*Create a WebAbacus Namespace*/
var WEBABACUS = function() {
	
	function cacheBuster(){
		return new Date().getTime();
	}

	function browserName(){
	    if (navigator.appName == 'Netscape') return "NS";
	    else {
	        if (navigator.appName == 'Microsoft Internet Explorer') return "IE";
	        else return "OT";
	    }
	}

    function detectJava() {
        return (navigator.javaEnabled()) ? 1 : 0;
    }

	//Values used for the cookies
    var clifems = cookieLife * 86400000;
    var cexp = new Date((new Date().getTime()) + clifems);
    function detectCookies() {
        var testValue = Math.floor(1000 * Math.random());
        SetCookie('AreCookiesEnabled', testValue);
        return (testValue == ReadCookie('AreCookiesEnabled')) ? 1 : 0;
    }
    
	
 function getCookie(name) {
        var dc = document.cookie;
        var cname = name + "=";
        var clen = dc.length;
        var cbegin = 0;
        while (cbegin < clen) {
            var vbegin = cbegin + cname.length;
            if (dc.substring(cbegin, vbegin) == cname) {
                var vend = dc.indexOf(";", vbegin);
                if (vend == -1) vend = clen;
                return unescape(dc.substring(vbegin, vend));
            }
            cbegin = dc.indexOf(" ", cbegin) + 1;
            if (cbegin == 0) break;
        }
        return null;
    }

	//Simulate a hash with two corrosponding arrays
	var keys = new Array();
    var values = new Array();
    function getQSParam(key) {
        var value = null;
        for (var i = 0; i < keys.length; i++)
        {
            if (keys[i] == key)
            {
                value = values[i];
                break;
            }
        }
        return value;
    }

    function parseQS() {
        var query = "";
        try {
            query = top.window.location.search.substring(1);
        } catch (e) {
        }
        var query1 = query.toLowerCase();
        var pairs = query1.split("&");

        for (var i = 0; i < pairs.length; i++)
        {
            var pos = pairs[i].indexOf('=');
            if (pos >= 0)
            {
                keys[keys.length] = pairs[i].substring(0, pos);
                values[values.length] = pairs[i].substring(pos + 1);
            }
        }
    }

    function wa_getTagID(oAtag) {

        if (typeof(oAtag.id) != "undefined" && oAtag.id != "")
            return "&tagId=" + oAtag.id;
        else
            return "";
    }

    function wa_getTagHref(tag) {
        if (typeof(tag.href) != "undefined" && tag.href != "")
            return tag.getAttribute("href");
        else
            return "-";
    }

	/*The charArray is used in generating random number for the webabacusID and the trioID*/
    var charArray = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    function gen_id(int2) {
        var key1 = "";
        var key2 = "";
        for (i = 0; i < int2; i++) {
            key1 += charArray[Math.floor(Math.random() * charArray.length)];
        }
        for (i = 0; i < key1.length; i++) {
            key2 += key1.charCodeAt(i).toString(16);
        }

        var curDate = new Date();
        var curMonth = curDate.getMonth() + 1;
        var curYear = curDate.getYear();
        var curDay = curDate.getDate();

        //Create Date, Time, and GMT offset String
        if (curDay < 10)
            curDay = "0" + curDay;
        if (curMonth < 10)
            curMonth = "0" + curMonth;
        if (curYear < 1000)
            curYear += 1900;

        var CreationDate = curYear.toString() + curMonth.toString() + curDay.toString();

        var curDateTime = new Date();
        var curHour = curDateTime.getHours() + curDateTime.getTimezoneOffset() / 60;
        if (curHour > 24)  curHour -= 24;
        if (curHour < 0) curHour += 24;
        var curMin = curDateTime.getMinutes();
        var curSec = curDateTime.getSeconds();
        var curTime = ((curHour < 10) ? "0" : "") + curHour + ((curMin < 10) ? "0" : "") + curMin + ((curSec < 10) ? "0" : "") + curSec;
        var CreationTime = curTime + "-" + (curDateTime.getTimezoneOffset() / 60);

        var CreatedAt = "d" + CreationDate + "_t" + CreationTime;

        //Create WebAbacus ID (ID) from two random strings, and the date/time/offset string
        var id = key1 + key2 + "-1-" + CreatedAt;
        return(id);
    }

	function getSite() {
	    var siteName = escape(site);
	    if (siteName == null || siteName == "") siteName = "-";
	    return siteName;
	}
	
	/* Computes the extension of the bug image on the server */
	function extension(){
		if(ThirdPartyCookie)
			return ".asp";
		else
			return".gif";
	}
	
	/*Returns the version of the tag code*/
	function civersion(){
		return "3.01";
	} 

	/*Returns the time at which the script was loaded */
    var timeAtLoad = new Date().getTime();
	function baseTime(){
		return timeAtLoad;
	}
	 
	/*Returns the timeZoneOffset*/
	function timeZoneOffset() {
		return new Date().getTimezoneOffset();
	}	
	
	/*Return the unique user ID*/
	function ID(){
		return webabacusID;
	}
	
	/*Returns an integer flag showing if this is a new user*/
	function isNewUser(){
		return newUser;
	}
	
	/*Returns the screen depth, when pet is 2*/
	function screenDepth(pet){
		return Math.pow(2, screen.colorDepth);
	}

	/*Returns the screen resolution when pet is 02*/
	function screenResolution(pet){
		return screen.width + "x"+ screen.height;
	}

	/*Compute the window resolution when pet is 02*/
	function windowResolution(pet){
	    var ww;
	    var wh;
	    if (browserName() == 'IE') {
	        if (document.documentElement && document.documentElement.clientWidth) {
	            ww = document.documentElement.clientWidth;
	            wh = document.documentElement.clientHeight;
	        }
	        else if (document.body) {
	            ww = document.body.clientWidth;
	            wh = document.body.clientHeight;
	        }
	    } else {
	        try {
	            ww = window.outerWidth;
	            wh = window.outerHeight;
	        } catch (e) {
	            ww = 0;
	            wh = 0;
	        }
	    }
	    return ( ww + "x" + wh);
	}

	/*Returns if java is enabled*/
	function javaEnabled(){
		return navigator.javaEnabled()? "Y" : "N";
	}

	/*Returns the js language when pet is 02*/
	function language(pet){
		return browserName() == "NS" ? navigator.language : navigator.browserLanguage;
	}

	/*Returns the server name when pet is 02 or null*/
	function serverName(pet){
		return document.domain;
	}
	
	/*Returns if the page request was for a secure site or not*/
	function isSecure(){
		return pageRes().substring(0,5)=="https";
	}
	
	/*Returns the page resource name when pet 02 or null*/
	function pageRes(pet){
		return (escape(document.URL) || "-");
	}

	/*Returns the page's referrer when pet is 02*/
	function referrer(pet){
		var ref = escape(document.referrer)
		if (ref==null || ref=="") ref="-";
		return ref
	}
	
	/*Returns the page's title when pet is 02*/
	function pageTitle(pet){
		var title = escape(document.title);
	    if (title == null || title == "") title = "-";
		return title;
	}

	/*Returns the file size when pet=02*/
	function fileSize(pet){
		try {
			return document.fileSize;
		} catch (e) {
			return "-";
		}
	}
	
	/*Returns the size of the images when pet=02*/
	function imagesSize(pet){
		var sizeCounter=0;
		try{
			for(i=0; i<document.images.length; i++){
				sizeCounter+=parseInt(document.images[i].fileSize);
			}
			return sizeCounter;
		} catch (e) {
			return "-";
		}
	}

	/*Generate a trioID*/
	function generateTrioID(){
    	var rn = "";
    	for (var i = 0; i < 4; i++) {
        	rn += charArray[Math.floor(Math.random() * charArray.length)];
    	}
		var tmp2 = new Date().getTime();
    	var tmp3 = Math.floor(tmp2 / 200000);
    	var tmp4 = Math.floor(tmp3 * 200000);
		return (rn + (Math.floor(tmp2 - tmp4)));
	}
	
	/*Returns the trioID, which is pre-compuated and pushe into the closure to ensure it does not change.
	 A PET value of anything other than 01, 02, 03 should result in a unique trioID*/
	var generatedTrioID = generateTrioID(); 
	function trioID(pet){
		if((pet==01) || (pet==02) || (pet==03)) return generatedTrioID;
		return generateTrioID();
	}

	function SRT(pet){
		if (pet==01) return (new Date().getTime()-baseTime());
		return 0;
	}

	function OET(pet){
		if (pet==02) return (new Date().getTime()-baseTime());
		return 0;
	}
	
	function UET(pet){
		if (pet==03) return (new Date().getTime()-baseTime());
		return 0;
	}

	/*Returns the marketing source of this visit, when pet=02*/
	function marketingSource(pet){
		var mktSrc = "-"
		if (getQSParam(sourceparamname)!=null){
			mrkSrc = escape(getQSParam(sourceparamname));
		} else if (optout != "1"){
			mktSrc = getCookie("wa_last_source");
		} 
		if (mktSrc==null || mktSrc=="") mrkSrc="-";
		return mktSrc;
	}
	
	/*Returns the date on which the marketing source was last changed*/
	function marketingSourceDate(pet){
		var mktSrcDate = "0"
		if (getQSParam(sourceparamname)!=null){
			mrkSrcDate = baseTime();
		} else if (optout != "1"){
			mktSrcDate = getCookie("wa_last_source_date");
		} 
		if (mktSrcDate==null || mktSrcDate=="") mrkSrc="0";
		return mktSrcDate;
	}

	/* Capture the values of the custom fields when pet=02*/
	function captureCustomFields(pet){
		var customfields = "";
	    if (typeof(wacustomvarnames) != "undefined") {
	        customfields = "";
	        for (i = 0; i < wacustomvarnames.length; i++) {
	            customfields = customfields + wacustomvarnames[i] + "~" + wacustomvarvalues[i];
	            if (i != wacustomvarnames.length - 1) customfields = customfields + "~";
	        }
	    }
		customfields += (typeof(wa_SiteName) != "undefined") ? "~wa_SiteName~" + wa_SiteName : "";
		customfields += (typeof(wa_UniqueUserID) != "undefined") ? "~wa_UniqueUserID~" + wa_UniqueUserID : "";
		customfields += (typeof(wa_UniquePageName) != "undefined") ? "~wa_UniquePageName~" + wa_UniquePageName : "";
		customfields += (typeof(wa_SiteBreadCrumb) != "undefined") ? "~wa_SiteBreadCrumb~" + wa_SiteBreadCrumb : "";
		customfields += (typeof(wa_ProductID) != "undefined") ? "~wa_ProductID~" + wa_ProductID : "";
		customfields += (typeof(wa_ProductValue) != "undefined") ? "~wa_ProductValue~" + wa_ProductValue : "";
		customfields += (typeof(wa_TotalTransactionValue) != "undefined") ? "~wa_TotalTransactionValue~" + wa_TotalTransactionValue : "";
		customfields += (typeof(wa_UniqueTransactionId) != "undefined") ? "~wa_UniqueTransactionId~" + wa_UniqueTransactionId : "";
		customfields += (typeof(wa_TransactionCurrency) != "undefined") ? "~wa_TransactionCurrency~" + wa_TransactionCurrency : "";
		customfields += (typeof(wa_SearchPhrase) != "undefined") ? "~wa_SearchPhrase~" + wa_SearchPhrase : "";
		customfields += (typeof(wa_SearchResultsReturned) != "undefined") ? "~wa_SearchResultsReturned~" + wa_SearchResultsReturned : "";

		if(checkFlash) {
			var version = deconcept.SWFObjectUtil.getPlayerVersion();
			if(customfields == "-")	customfields = "";
			customfields += "~fl~" + version['major'] +"."+ version['minor'] +"."+ version['rev'] + "~je~" + detectJava() + "~ce~" + detectCookies();
		}
	   	
		return customfields;
	}
	/*The following code, up untill return {...} is in effect the constructor. Shold be moved into a forma constructor at some
	poing in the future */
	
	parseQS();

    /*
	Check for and issue cookie. Set the webabacus id too
	webabacus id will be set to the value of  "webabacus_id" parameter by preference if it is included
	otherwise it will be got from the cookie
	otherwise it will be generated and written to the cookie
	*/
    var optout = getCookie("nocookie");
	var webabacusID;
	var idparm;
	var newUser;
    if (optout != "1") {
        idparm = getQSParam(WebAbacusRef);
        if (idparm == null || idparm == "") {
            webabacusID = getCookie("webabacus_id");
        } else {
            webabacusID = idparm;
        }
        if (webabacusID == null || webabacusID == "-1") {
            webabacusID = gen_id(5);
            newUser = "1" // New user (they've not been issued a cookie before)
        } else {
			newUser = "0"
        }
        if (!DisableFirstPartyCookies) document.cookie = "webabacus_id=" + escape(webabacusID) + "; expires=" + cexp.toUTCString() + "; path=/" + (cookieDomain == "" ? "" : "; domain=" + cookieDomain);

       	// Check that cookie has been set. If not set the webabacus id value to null.
        if (document.cookie.indexOf(escape(webabacusID)) < 0) {
            var webabacusID = '-';
            var newUser = '-';
        }
   	} else {
        webabacusID = "nocookie";
        newUser = "-1";
    }


	
    // The source (ie marketing source) if set is identified by a query param of name sourceparamname
    // if it is set, and we are using cookies, set the value in the cookie 
    var source = getQSParam(sourceparamname);
    if ((source != null) && (!DisableFirstPartyCookies) && (optout != -1)) {
		document.cookie ="wa_last_source=" +  escape(source) + "; expires=" + cexp.toUTCString() + "; path=/" + (cookieDomain == "" ? "" : "; domain=" + cookieDomain);
		document.cookie ="wa_last_source_date=" + baseTime() + "; expires=" + cexp.toUTCString() + "; path=/" + (cookieDomain == "" ? "" : "; domain=" + cookieDomain);
	}
	
    return {
		/*Here we define the public methods on our WEBABACUS object */

    	/*Writes out an alert messages into the page, rather than using the alert() browser method*/
        alert: function(text) {
            text = String(text).replace(/\n/g, "<br/>");
						var template = 	"<center><div id='WEBABACUS-msg' style='height:80px;width:40%;border:2px solid GREY;overflow: auto;'>" +
							"<div style='background-color:#FFFDBE;color:black;padding:5px;font-family:verdana;font-size:xx-small'>" +
							"<center><b>WebAbacus Tag code (v" +civersion()+ ")</b><br/><br/>%TEXT%" +
							"<br/><input type='button' value='Hide' onclick='document.getElementById(\"WEBABACUS-msg\").style.display=\"none\"' />" +
							"<input type='button' value='Stop' onclick='SetCookie(\"webabacus_debug\", false, 740);document.getElementById(\"WEBABACUS-msg\").style.display=\"none\"' />" +
							"</div></div></center>";
            var to_write = template.replace("%TEXT%", text);
            if (document.getElementById("WEBABACUS-msg-div")) { //If the 'WEBABACUS-msg-div' exists, just write our data into it.
                document.getElementById("WEBABACUS-msg-div").innerHTML = to_write;
            } else { //Else create the element before writing the data.
                var div = document.createElement("div");
                div.setAttribute("id", "WEBABACUS-msg-div");
                div.innerHTML = to_write;
				var pageBody = document.getElementsByTagName("body")[0];
				if(pageBody){
					pageBody.insertBefore(div, pageBody.firstChild); //write to the page if we can
				} else {
					alert(to_write); // if the DOM has not yet been parsed, use an alert box
				} 
				
            }
        },
		//Browser Agnostic addEvent method
        addEvent: function(elm, evType, fn, useCapture) {
			//Check to see what functions are defined, and use that to 
			//add the necessary event handler. 
            if (elm.addEventListener){
                elm.addEventListener(evType, fn, useCapture);
                return true;
            } else if (elm.attachEvent) {
                return elm.attachEvent('on' + evType, fn);
            } else {
                elm['on' + evType] = fn;
            }
        },
		/*Attach events to all links that trigger tag requests*/
        attachOnClickExternalLink: function() {
            var trackableSuffixes = autoTagDocuments.split(",");
            var tags = document.getElementsByTagName('a');
            var sDomain = document.domain;
            var isTD = (typeof(autoTagTrustedDomain) != "undefined");
			var debug_flag=(document.URL.indexOf('wa_debug=true') > -1) || (document.cookie.indexOf("webabacus_debug=true") > -1);
			
			//Add onclick events for left and right clicks that send a tag request logging the event
			var makeLinkSelfTagging = function(tag, eventType){
				WEBABACUS.addEvent(tag, "click", function() {
                    WEBABACUS.logclientdata('0', "/CustomEvent="+eventType+"&URL=" + wa_getTagHref(tag) + "&ClickType=Left" + wa_getTagID(tag));
					if (debug_flag)
						WEBABACUS.alert("CustomEvent="+eventType+"&URL=" + wa_getTagHref(tag) + "&ClickType=Left" + wa_getTagID(tag));

                }, false);
                WEBABACUS.addEvent(tag, "contextmenu", function() {
                    WEBABACUS.logclientdata('0', "/CustomEvent="+eventType+"&URL=" + wa_getTagHref(tag) + "&ClickType=Right" + wa_getTagID(tag));
					if (debug_flag)
						WEBABACUS.alert("CustomEvent="+eventType+"&URL=" + wa_getTagHref(tag) + "&ClickType=Right" + wa_getTagID(tag));
                }, false);
			}
			
			//for each link on the page
            for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
				if (!tags[tagIndex].getAttribute("href")){continue;} //skip this link if no href attribute is avaiable						
				var href = tags[tagIndex].getAttribute("href").toLowerCase();
                
				//check for trackable documents
				for (var j = 0; j < trackableSuffixes.length; j++) {
                    if ((href.indexOf("." + trackableSuffixes[j]) > 0) && (autoTagDocuments.length > 0)) {
						makeLinkSelfTagging(tags[tagIndex], "file");
						continue;
                    } 
			  	}
			
				//check for trackable external links
				
				if ((autoTagExternalLinks) && (href.indexOf("http://") != -1 || href.indexOf("https://") != -1)) {
					sDomainLink = href.match(/:\/\/(www\.)?([^\/:\?]+)/);
                    sDomainLink = sDomainLink[2] ? sDomainLink[2] : '';
                    if (sDomain.indexOf(sDomainLink) == -1) {
						makeLinkSelfTagging(tags[tagIndex], "extURL");
                        if (isTD) {
                        	if (autoTagTrustedDomain.indexOf(sDomainLink) > -1) {
								var tag_href=tags[tagIndex].getAttribute('href');
								tag_href += ((href.indexOf("?")>0) ? "&" : "?");
                                tag_href += WebAbacusRef + "=" + getCookie("webabacus_id");
								tags[tagIndex].setAttribute("href", tag_href);
	                        }
	                        continue;
                         }
	             	}
              	} else if ((autoTagExternalLinks) && (href.indexOf("mailto:") != -1)) {
                      makeLinkSelfTagging(tags[tagIndex], "email");
                      continue;
                }
             }

        },
        /*Log data to the server*/
		logclientdata: function(thispet, event) {
            var page_resource_function = pageRes
			var page_referrer_function = referrer
			
			//If a custom event has been called redefine the functions used for page resource and referrer
			if ((thispet == "0")&& (event!=null)) {
				page_resource_function = function(thispet){
					var page_resource
					if (isSecure()) {
	                    page_resource = escape('https://') + serverName() + escape(event.replace('https://', ''));
	                } else{
	                    page_resource = escape('http://') + serverName() + escape(event.replace('http://', ''));
					}
					return page_resource;
				}
                
				page_referrer_function = function(thispet){
					return escape(document.URL);
				}
            }
					
            // decide which tag request (secure vs non-secure) to use
            var base = ((isSecure()) ? secureserver : server) + "/clientinfo" + extension() + "?" + civersion() + "&" + cacheBuster() + "&";
           	var tag_request =   getSite() + "&" + 
								timeZoneOffset() + "&" + 
								ID() + "&" + 
								isNewUser() + "&" + 
								screenDepth(thispet) + "&" + 
								screenResolution(thispet) + "&" + 
								windowResolution(thispet) + "&" + 
								"-" + "&" + 
								javaEnabled() + "&" + 
								language(thispet) + "&" + 
								serverName(thispet) + "&" + 
								page_resource_function(thispet) + "&" + 
								page_referrer_function(thispet) + "&" + 
								pageTitle(thispet) + "&" + 
								fileSize(thispet) + "&" + 
								imagesSize(thispet) + "&" + 
								trioID(thispet) + "&" + 
								thispet + "&" + 
								SRT(thispet) + "&" + 
								OET(thispet) + "&" + 
								UET(thispet) + "&" + 
								marketingSource(thispet) + "&" + 
								marketingSourceDate(thispet) + "&" + 
								captureCustomFields(thispet)+ "&" +
								"-";

			/*Send the request*/
            var maxlen = 4000;
            if (tag_request.length > maxlen) tag_request = tag_request.substring(0, maxlen);
			
			if(document.URL.indexOf("file://") == -1){
				var request_bug = new Image();
				request_bug.src = base + tag_request ; //This line actually sends the http(s) request
			}
			
			var debug_flag=(document.URL.indexOf('wa_debug=true') > -1) || (document.cookie.indexOf("webabacus_debug=true") > -1);
            if ((thispet=="02")&& debug_flag) {
                WEBABACUS.alert("Base Details: " + base +"\nSite name (st): " + getSite() + "\nTime zone offset (tz): " + timeZoneOffset() + "\nWebabacus ID (id): " + ID() + "\nNew user flag (nu): " + isNewUser() + "\nVisitor Screen Colour Depth (sc): " + screenDepth(thispet) + "\nVisitor Screen resolution (sr): " + screenResolution(thispet) + "\nVisitor Window resolution (wr): " + windowResolution(thispet) + "\nJavascript version (js): " + "-" + "\nJava Enablement (je): " + javaEnabled() + "\nBrowser Language (lg): " + language(thispet) + "\nServer name (dn): " + serverName(thispet) + "\nResource (res): " + pageRes() + "\nReferrer (ref): " + referrer(thispet) + "\nPage Title (pt): " + pageTitle(thispet) + "\nFile Size: " + fileSize(thispet) + "\nImages Size: " + imagesSize(thispet)+ "\ntrioID: " + trioID(thispet) + "\nthispet: " + thispet + "\nSRT: " + SRT(thispet) + "\nOET: " + OET(thispet) + "\nUET: " + UET(thispet) + "\nMarketing Source: " + marketingSource(thispet) + "\nMarketing Source Date: " + marketingSourceDate(thispet) + "\ncustomfields: " + captureCustomFields(thispet) + "\nOffertyperef: " + Offertyperef + "\nHolidaytype: " + Holidaytype + "\nLinkname: " + Linkname + "\nlateOfferRef: " + lateOfferRef + "\nlateOfferType: " + lateOfferType + "\nHomePageBooking: " + HomePageBooking  + "\n\ncs(User Agent): " + navigator.userAgent);
                if (!DisableFirstPartyCookies)
					SetCookie('webabacus_debug',true,740);
            }

            if (document.URL.indexOf('wa_debug=false') > -1) {
				if (!DisableFirstPartyCookies)
					SetCookie('webabacus_debug',false,740);
            }
        }
    }
}();

/*Executes as soon as the JS engine parses the script*/
WEBABACUS.logclientdata("01");

/*Executes once the page has been loaded, and rendered*/
WEBABACUS.addEvent(window, "load", function() {
            		WEBABACUS.attachOnClickExternalLink();
            		WEBABACUS.logclientdata('02');
        		}, false);

/*Executes when the user triggers the "unload" event. Which happens whenever the user leaves the page,
i.e. by going to another page or by closing the window. However it will only execute if the page finsihed loading
before the user leaves the page*/
WEBABACUS.addEvent(window, "unload", function() {
            		WEBABACUS.logclientdata('03');
        		}, false);
        		
/*Executes once the page has been loaded, and rendered*/
WEBABACUS.addEvent(window, "open", function() {
			WEBABACUS.highlightspanel();
			WEBABACUS.logclientdata('0');
}, false);









/* natsearch.js ########################################################### */
// 2011/01/04 - removed, as /js/natsearch.js is also being included in page.
// 2011/01/24 - added, as it appears /js/natsearch.js is actually no longer included in page!
// haven natural traffic switcher by arena quantum /////////
// checks domain on common content to show correct script //
var Host = (("https:" == document.location.protocol) ? "https:" : "http:"); // is current connection secure?
var siteName = document.domain; // get current domain
siteName = siteName.split("."); // split domain at full-stops
siteName = siteName[1]; // get value between first and second full stops

if(siteName == 'haven') { // write haven script to the browser
document.write(unescape("%3Cscript src='" + Host + "//secure.img-cdn.mediaplex.com/0/13791/arenaq_haven_holidays_naturaltraffic.js' type='text/javascript'%3E%3C/script%3E"));
}
else if(siteName == 'caravancamping') { // write touring script to the browser
document.write(unescape("%3Cscript src='" + Host + "//secure.img-cdn.mediaplex.com/0/13792/arenaq_haven_touring_naturaltraffic.js' type='text/javascript'%3E%3C/script%3E"));	
}
else { // if current domain neither haven nor caravancamping do nothing...
}









/* haven custom code ###################################################### */

/* Haven Custom Code - in-house dev team
 * 2010/05/03
 * 
 */

// when the DOM is ready...
$(document).ready(function() {

	// handle phone number image to display between call-centre working times
	handleCallCenterStrapline();
	
	// only display phone number logo image on homepage
	//displayCallCentreStraplineOnHomepage();
	
	// promotion page overrides
	promotionPageOverrides();
	
	// temp (until backend is fixed) - touring special offers search validation
	touringOffersSearchValidate();

});  // end of document.ready().




function promotionPageOverrides() {
	var pageUrl = document.location.href;
	var promoDate;
	
	// Promotion: Mushroom - replace email signup submit button
	if($("#P_Mushroom").length > 0) {
		$("#P_Mushroom #newsletterBox .signupSubmitBtn input").attr({
			src: "/Images/NonTridion/competition-entry.gif"
		});
	}

	// 2011/06/03 - wislam :: set booking panel arrival date for various holiday seasonal pages
	if(pageUrl.indexOf("/holidays/seasonal/") != -1) {
		setBookingPanelDefaultDate("summer", "2011/07/22");
		setBookingPanelDefaultDate("august-bank-holiday", "2011/08/26");
		setBookingPanelDefaultDate("october_half_term", "2011/10/21");
		setBookingPanelDefaultDate("easterholiday", "2012/03/30");
		setBookingPanelDefaultDate("may-half-term", "2012/06/01");
		setBookingPanelDefaultDate("spring", "2012/03/16");
	}
	
	// 2011/06/24 - wislam :: set booking panel arrival date for promotional pages
	if(pageUrl.indexOf("/promotions/") != -1) {
		setBookingPanelDefaultDate("vouchercodes", "2011/08/01");
		setBookingPanelDefaultDate("moneysupermarket", "2011/07/25");
		setBookingPanelDefaultDate("2012", "2012/03/16");
	}
	
	// 2011/02/10 - wislam :: apply to various holiday pages
	if(pageUrl.indexOf("holidays") && 
		(pageUrl.indexOf("easter") != -1 || 
		 pageUrl.indexOf("summer") != -1 || 
		 pageUrl.indexOf("spring") != -1 || 
		 pageUrl.indexOf("autumn") != -1 || 
		 pageUrl.indexOf("bank") != -1 || 
		 pageUrl.indexOf("half-term") != -1 || 
		 pageUrl.indexOf("half_term") != -1) ) {
		
		// fix park drop-down...
		$("#header #siteNavContainer .headerParkDd").css("display","none");
		// fix h2 linking and background...
		$("#pageContent .home-article h2 a[href='#']").css({ "background-image":"url('/Images/Blue_LandingPageButton_NoChevron_2010.jpg')", "cursor":"default" });
	}
	
}


function handleCallCenterStrapline() {
	/* *** BEGIN header strapline - phone number image - show/hide between certain hours *** */
	
	// configurable params...
	var wi_showStartTime = 9;
	var wi_showEndTime = 21;
	var wi_imgLogoOriginal    = isTouringWebsite()? "/touring-camping/images/Touring-Camping-logo-2011-home.jpg" : "/images/nontridion/logo2011.gif";
	var wi_imgLogoPhoneNumber = "phone-number";		// call centre image MUST contain this phrase



	var wi_useUserTime = false;

	// get user's computer date / time...
	var wi_userDate = new Date();
	var wi_userTimeHour = wi_userDate.getHours();

	// get server date / time... (screen-scraped from mark-up comment)
	var wi_docHTML  = $("html").html();
	var wi_serverDateTime = "";
	var wi_serverTime = "00:00:00";
	var wi_serverTimeHour = "00";

	wi_serverDateTime = wi_docHTML.substr(wi_docHTML.indexOf("<!-- node"), wi_docHTML.length);
	var wi_locBegin = wi_serverDateTime.indexOf("<!-- [");
	var wi_locEnd   = wi_serverDateTime.indexOf("] -->");
	wi_serverDateTime = wi_serverDateTime.substr(wi_locBegin+6, (wi_locEnd-wi_locBegin)-6);

	wi_serverTime = wi_serverDateTime.substr(wi_serverDateTime.indexOf(":")+1, 8);
	wi_serverTimeHour = wi_serverDateTime.substr(wi_serverDateTime.indexOf(":")+1, 2);

	// perform basic validation of screen-scraped server time
	if(!isNaN(wi_serverTimeHour) && wi_serverTimeHour != "") {
		wi_serverTimeHour = parseInt(wi_serverTimeHour, 10);
		// is it really a date-time hour?
		if(wi_serverTimeHour == null || isNaN(wi_serverTimeHour) || wi_serverTimeHour < 0 || wi_serverTimeHour > 23)
			wi_useUserTime = true;
	}
	else {
		wi_useUserTime = true;
	}

	// check if phone number image is still in correct location and exists on the page
	if($("#header #logo").length > 0 && $("#header #logo img").length > 0 && $("#header #logo img")[0].src.indexOf(wi_imgLogoPhoneNumber) != -1) {
		// use server time or user's computer time
		if(wi_useUserTime) {
			if(!(wi_userTimeHour >= wi_showStartTime && wi_userTimeHour < wi_showEndTime))
				$("#header #logo img")[0].src = wi_imgLogoOriginal;
		} else {
			if(!(wi_serverTimeHour >= wi_showStartTime && wi_serverTimeHour < wi_showEndTime))
				$("#header #logo img")[0].src = wi_imgLogoOriginal;
		}
	}

	/*alert("\twislam debug info...\n\n" + 
		"screen-scraped    :: [" + wi_docHTML.length + " bytes]\n" + 
		"Server date/time  :: [" + wi_serverDateTime + "]\n" + 
		"Server time(hour) :: [" + wi_serverTimeHour + "]\n" + 
		"User   time(hour) :: [" + wi_userTimeHour + "]\n" + 
		"use user pc time  :: [" + wi_useUserTime + "]\n" + 
		"is touring site?  :: [" + isTouringWebsite() + "]\n" + 
		"display phone img :: [" + ((wi_serverTimeHour >= 9 && wi_serverTimeHour < 21) || (wi_userTimeHour >= 9 && wi_userTimeHour < 21)) + "]"
	);*/

	/* *** END header strapline - phone number image *** */

}


function touringOffersSearchValidate() {
	var pageUrl = document.location.href;
	var defaultDateText = "Arrival Date";
	var debug = (typeof console != 'undefined' && typeof console.debug == 'function')? true : false;
	
	if(pageUrl.indexOf("touring") == -1 || pageUrl.indexOf("offer") == -1 || 
	   ($("form[action*='special_offers_main.aspx']").length < 1 && $("form[action*='searchresults.aspx']").length < 1)) {
		//if(debug) console.debug("wislam :: not Touring and not Offers page, no action.");
		return;
	}
	
	// TODO: merge main and results into one...
	//if(debug) console.debug("wislam :: attaching to form submit().");
	$("#SpecialOffers form, #SpecialOffersResult form").submit(function() {
		// main
		if($("input#Searchbox_txtDate").length == 1 && $("input#Searchbox_txtDate").val() != "Arrival Date" && $("input#Searchbox_txtDate").val() != "dd/mm/yyyy" && $("input#Searchbox_txtDate").val() != "") {
			//if(debug) console.debug("wislam :: offers -> main -> date search performed.");
			if(!isDate($("input#Searchbox_txtDate").val())) {
				alert("Date must be in the format: dd/mm/yyyy\ne.g. 23/07/2011");
				return false;
			}
		}
		// results
		if($("input#Searchresults_txtDate").length == 1 && $("input#Searchresults_txtDate").val() != "Arrival Date" && $("input#Searchresults_txtDate").val() != "dd/mm/yyyy" && $("input#Searchresults_txtDate").val() != "") {
			//if(debug) console.debug("wislam :: offers -> results -> date search performed.");
			if(!isDate($("input#Searchresults_txtDate").val())) {
				alert("Date must be in the format: dd/mm/yyyy\ne.g. 23/07/2011");
				return false;
			}
		}
	});
	
}


/**
 * Set default date of booking panel (if it exists on page).
 * 
 * pageFileName: any part of the page file name
 * date        : string with format of "yyyy/mm/dd", e.g. 2012/03/16
 * 
 * author : wislam <waheed.islam@haven.com>
 * created: 2011/08/09
 * *** */
function setBookingPanelDefaultDate(pageFileName, date) {
	var pageUrl = document.location.href;
	var bookingPanelId = "#tbl-book";
	var bookingPanelDateField = "input[name*='txtDate']";
	
	if(pageUrl.indexOf(pageFileName) != -1 && $(bookingPanelId + " " + bookingPanelDateField).length > 0) {
		promoDate = new Date(date + " 19:00");
		if(new Date() < promoDate && typeof promoDate.format == "function") {
			$("form[action*='" + pageFileName + "']" + " " + bookingPanelId + " " + bookingPanelDateField).val(promoDate.format("dd/MM/yyyy"));
		}
	}
}


/**
 * Very primitive and basic date validation to verify string is a date - only to help customers.
 * 
 * date: string with length of at least 6 chars and maximum of 10 chars, and with at least 1 forward-slash (/).
 * 
 * Note: currently this function is only used by touringOffersSearchValidate(), 
 *       and .NET / SQL will correctly search for dates such as 9/7/11
 *       thus, min length only has to be 6 chars.
 * 
 * author : wislam <waheed.islam@haven.com>
 * created: 2011/03/17
 * *** */
function isDate(date) {
	
	if(typeof date == "undefined" || date == null || !(date.length >= 6) || !(date.length <= 10) || date.indexOf("/") == -1) {
		return false;
	}
	
	return true;
}


/**
 * Due to Touring being intigrated under haven.com, determine whether it's the Touring website.
 * Returns true if identified as Touring & Camping website.
 * 
 * Currently only uses the page url (/touring-camping/) to determine.
 * 
 * author : wislam <waheed.islam@haven.com>
 * created: 2011/08/03
 * *** */
function isTouringWebsite() {
	var pageUrl = document.location.href;
	
	// currently, only 1 unique thing determines whether it's Touring - URL!
	if(pageUrl.indexOf("/touring%2Dcamping/") != -1 || pageUrl.indexOf("/touring-camping/") != -1) return true;
	else return false;
}


/**
 * wabasesite - custom WebAbacus to identify if Haven / Touring.
 * 
 * Not declared as function, and not called using jQuery, in case older browsers.
 * Thus, this should execute as soon as script is loaded...
 * 
 * *** */
var wabasesite = "haven";
if(isTouringWebsite()) { wabasesite = "touring"; }
var wacustomvarnames = new Array("wabasesite");
var wacustomvarvalues = new Array(wabasesite);

