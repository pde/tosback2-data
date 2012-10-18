var browser = new BrowserDetect(); 
var localSwitch = true;
//var localSwitch= false;

//var gJSFile = "javascript/Layer_414.js";
var gJSFile = window.location.protocol + "//ipinvite.iperceptions.com/Invitations/Javascripts/Layer_414.js";

function BrowserDetect() {
   ua = navigator.userAgent.toLowerCase(); this._string = navigator.userAgent.toLowerCase();
   this.isOpera= (ua.indexOf('opera') != -1);  this.isGecko= (ua.indexOf('gecko') != -1 && ua.indexOf('safari') == -1);
   this.isIE= (ua.indexOf('msie') != -1 && !this.isOpera && (ua.indexOf('webtv') == -1) ); 
   this.isMozilla= (this.isGecko && ua.indexOf('gecko/') + 14 == ua.length);
   this.isFirefox= (ua.indexOf('firefox') != -1); }

function lScript(file) {
	var script = document.createElement('script');
	script.type = 'text/javascript'; script.src = file;	
	if (typeof(script.onreadystatechange) == 'undefined') 
	    script.onload = function() { this.onload = null; }; 
	else  
	    script.onreadystatechange = function() { if (this.readyState != 'loaded' && this.readyState != 'complete') return; this.onreadystatechange = null;  }; 
	
	document.getElementsByTagName('head')[0].appendChild(script);
}

function CC(name,value,days) {
	if (days) { var expDate = new Date(); expDate.setTime(expDate.getTime()+(days*24*60*60*1000)); var expires = "; expires="+expDate.toUTCString(); }	
	else var expires = ""; document.cookie = name+"="+value+expires+"; path=/";
}

function RC(NameOfCookie) {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(NameOfCookie+"=");
        if (begin != -1) {
            begin += NameOfCookie.length+1; end = document.cookie.indexOf(";", begin);          
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end)); 
        }
    }
    return null;
}
	
function EC(name) { CC(name,"",-1); }

function Exec() {
	var sCName = "IPERCEPTIONS_414"; var sCVal = "IPERCEPTIONS_414_COOKIE";
	var sCValRet; var tCVName="IPERCEPTIONS_TEST"; var tCVVal="IPERCEPTIONS_TEST_COOKIE"; var tCVValRet;
	CC(tCVName,tCVVal,1);
	tCVValRet = RC(tCVName); 			
	sCValRet = RC(sCName);
	EC(tCVName);
	var rndNum= Math.floor ((Math.random()*1000));

    //Dec. 15th 2009 - rate: 5/75
    //Jan. 13th 2010 - rate 10%
    //Jan. 25th 2010 - rate 14%
	//May 21, 2010: 10%
	//June 1, 2010: 20%
	//June 14, 2010: 5%
	//Dec 13, 2010: 15%
	//Jan 24, 2011: 24%
	//Feb 07, 2011: 15%
	//Feb 03, 2012: 7.5%
    //Feb 10, 2012: 2%
    
	if (rndNum < 75 && tCVValRet != null && sCValRet == null) {
    		CC(sCName, sCVal, 90); lScript(gJSFile);
	}
}

if (localSwitch) {
    //var GJS = "http://ipinvite.iperceptions.com/Invitations/Javascripts/Layer_Global.js";
    var GJS = window.location.protocol + "//ipinvite.iperceptions.com/Invitations/Javascripts/Layer_Global_aicollect_2012.js"; 
	lScript(GJS);
}	
	


