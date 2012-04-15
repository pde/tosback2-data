/*
 * GMX Functions
 *
 */

var _gmxFunctionsTimestamp = new Date().getTime();

function gmx_faq(nav) {
  faq = window.open("http://faq.gmx.de/" + nav ,"faq", "toolbar=yes,resizable=yes,width=700,height=500,scrollbars=yes");
  if(window.faq) {
    window.faq.focus();
  }
}

function faq(client,nav) {
  switch(client) {
    case 'gmx':
      faq_popup = window.open("http://faq.gmx.de/search/go.php?t=" + nav ,"faq", "toolbar=yes,resizable=yes,width=700,height=500,scrollbars=yes");
    break;
    case 'gmx2':
      faq_popup = window.open("http://hilfe.gmx.net/classic/content/resources/" + nav ,"faq", "toolbar=no,resizable=yes,width=700,height=500,scrollbars=yes");
    break;
    case '1u1':
      faq_popup = window.open("http://hilfe-center.1und1.de/access/gesamt/fragen_zur_nutzung_der_leistungen_z_b_domain_e_mail/11_mediacenter?t=" + nav ,"faq", "toolbar=yes,resizable=yes,width=895,height=500,scrollbars=yes");
    break;
  }
  if(window.faq_popup) {
    window.faq_popup.focus();
  }
}

function gmx_mediacenter(url) {
  mcpopup = window.open(url,'mc' + _gmxFunctionsTimestamp,'width=800,height=600,resizable=yes,status=yes');
  if(window.mcpopup) {
    window.mcpopup.focus();
    return true;
  }
  return false;
}

function gmx_organizer() {
	var organizerWindow = window.open('', 'GMXOrganizer', 'width=1024,height=768,resizable=yes,scrollbars=yes,status=no');
	organizerWindow.document.write('<html><head><title>GMX Organizer</title></head></html>');
	organizerWindow.blur();
	window.focus();
}

function gmx_edcards(url) {
  ecpopup = window.open(url,'ec','width=660,height=400,resizable=yes,status=no');
  if(window.ecpopup) {
    window.ecpopup.focus();
  }
}

function createRequestObject() {
  var ro = null;
  if (window.XMLHttpRequest) {
    ro = new XMLHttpRequest();
  }
  if (!ro && window.ActiveXObject) {
    try {
      ro = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
    }
    try {
      ro = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {
    }
  }
  return ro;
}


/*                        */
/*    B:Benchmark Test    */
/*                        */
function TryCatch() {
  var startTime = new Date();
  for( var i = 0; i <= 4000; i++ ) {
    try { throw new Error("Error"); } catch (e) { }
  }
  var endTime = new Date();
  return (endTime - startTime);
}

function LayerMovement() {
  var layer1 = document.createElement('div');
  layer1.setAttribute('style','position: absolute; left:0px; top:0px; width: 5px; height: 5px;',0);
  var startTime = new Date();
  for( var i = 0; i <= 8000; i++ ) {
    layer1.style.x = i + 'px';
    layer1.style.y = i + 'px';
  }
  var endTime = new Date();
  return (endTime - startTime);
}

function RandomNumbers() {
  var startTime = new Date();
  for( var i = 0; i <= 50000; i++ ) {
    var a = Math.random()
  }
  var endTime = new Date();
  return (endTime - startTime);
}

function MathEngine() {
  var startTime = new Date();
  for( var i = 0; i <= 5000; i++ ) {
    var a = Math.abs(-2.54);
    var a = Math.acos(2);
    var a = Math.asin(2);
    var a = Math.atan(2);
    var a = Math.atan2(2,3,4);
    var a = Math.ceil(2.54);
    var a = Math.cos(2);
    var a = Math.exp(2);
    var a = Math.floor(2.54);
    var a = Math.log(2)
    var a = Math.max(2,3,4);
    var a = Math.min(2,3,4);
    var a = Math.pow(2);
    var a = Math.random;
    var a = Math.round(2.54);
    var a = Math.sin(2);
    var a = Math.sqrt(2);
    var a = Math.tan(2);
  }
  var endTime = new Date();
  return (endTime - startTime);
}

function DOMSpeed() {
  var startTime = new Date();
  var dom_test = document.createElement("div");
  dom_test.setAttribute('style','display:none;',0)
  for( var i = 0; i <= 1000; i++ ) {
    dom_test.innerHTML = "Testing... ("+i+"/1000)";
  }
  var endTime = new Date();
  return (endTime - startTime);
}

function ArrayFuncs() {
  var startTime = new Date();
  var arr = new Array();
  for( var i = 0; i <= 150; i++ ) {
    arr.push(i);
    arr.sort();
    arr.reverse();
  }
  var endTime = new Date();
  return (endTime - startTime);
}

function StringFuncs() {
  var startTime = new Date();
  var str = "hello";
  for( var i = 0; i <= 1000; i++ ) {
    str += i
    str.toLowerCase;
    str.toUpperCase;
    str = str.slice(str.length/2,str.length) + str.slice(0,str.length/2);
  }
  var endTime = new Date();
  return (endTime - startTime);
}

function AjaxObject() {
  this.createRequestObject = function() {
    var ro;
    var browser = navigator.appName;
    if ( browser == "Microsoft Internet Explorer") {
      try {
        ro = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {
        ro = new XMLHttpRequest();
      }
    }
    else {
      ro = new XMLHttpRequest();
    }
    return ro;
  }
  this.sndReq = function(action, url) {
    this.http.open(action,url);
    this.http.onreadystatechange = this.handleResponse;
    this.http.send(null);
  }
  this.handleResponse = function() {
    if ( me.http.readyState == 4) {}
  }
  var me = this;
  this.http = this.createRequestObject();
}

function AjaxDeclaration() {
  var startTime = new Date();
  for( var i = 0; i <= 1000; i++ ) {
    var ao_featured = new AjaxObject();
  }
  var endTime = new Date();
  return (endTime - startTime);
}

function fibonacci_count(n){
  return Math.round(Math.pow((Math.sqrt(5) + 1) / 2, Math.abs(n)) / Math.sqrt(5)) * (n < 0 && n % 2 ? -1 : 1);
};

function Fibonacci() {
  var startTime = new Date();
  var arr = new Array();
  for( var i = 1476; i > -1476; i=i-1 ) {
    arr.push( fibonacci_count(i) );
  }
  var endTime = new Date();

  return (endTime - startTime);
}

function startBenchmarkTest() {

  var trycatch = TryCatch();
  var layer = LayerMovement();
  var random = RandomNumbers();
  var math = MathEngine();
  var dom = DOMSpeed();
  var array = ArrayFuncs();
  var string = StringFuncs();
  var ajax = AjaxDeclaration();
  var fibonacci = Fibonacci();

  var benchmarkSpeed = 0;

  benchmarkSpeed = benchmarkSpeed + trycatch;
  benchmarkSpeed = benchmarkSpeed + layer;
  benchmarkSpeed = benchmarkSpeed + random;
  benchmarkSpeed = benchmarkSpeed + math;
  benchmarkSpeed = benchmarkSpeed + dom;
  benchmarkSpeed = benchmarkSpeed + array;
  benchmarkSpeed = benchmarkSpeed + string;
  benchmarkSpeed = benchmarkSpeed + ajax;
  benchmarkSpeed = benchmarkSpeed + fibonacci;

  // more details: summary:xx1-xx2-xx2 etc
  // benchmarkSpeed = benchmarkSpeed +':'+ trycatch +'-'+ layer +'-'+ random +'-'+ math +'-'+ dom +'-'+ array +'-'+ string +'-'+ ajax +'-'+ fibonacci;

  return benchmarkSpeed;
}
/*    E:Benchmark Test    */

function getBrowserType() {
  var uA = navigator.userAgent;
  var browserType;

  if (uA.indexOf("Opera") > -1) { browserType = "Opera"; }
  else if (uA.indexOf("Safari") > -1) { browserType = "Safari"; }
  else if (uA.indexOf("Konqueror") > -1) { browserType = "Konqueror"; }
  else if (uA.indexOf("Gecko") > -1) { browserType = "Mozilla"; if(uA.substr(uA.indexOf("Gecko") +23, 1) == 2) { browserType = "Firefox2"; } else if(uA.indexOf("Firefox") > -1) { browserType = "Firefox1"; } }
  else if (uA.indexOf("MSIE") > -1) { browserType = "MSIE"; if(uA.substr(uA.indexOf("MSIE") +5, 1) == 6) { browserType = "MSIE6"; } else if(uA.substr(uA.indexOf("MSIE") +5, 1) == 7) { browserType = "MSIE7"; } }
  return browserType;
}

function setValueByID(id,value) {
  element = document.getElementById(id);
  element.value = value;
}

/* http://www.sitepoint.com/blogs/2004/05/26/closures-and-executing-javascript-on-page-load/ */
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function getCookie(name) {
  var i=0;
  var suche = name+"=";
  while( i < document.cookie.length ){
    if( document.cookie.substring(i, i+suche.length)==suche ) {
      var ende = document.cookie.indexOf(";", i+suche.length);
      ende = (ende>-1) ? ende : document.cookie.length;
      var cook = document.cookie.substring( i+suche.length, ende );
      return unescape(cook);
    }
    i++;
  }
  return null;
}

function setCookie_GBenchmark(browserType, JavaScript, ConnectionSpeed, ConnectionSpeed2, BenchmarkSpeed) {
  // set cookie => benchVersion|browserType|jsEnabled|kilobits/s|bytes/s|bench/ms
  var expires = new Date();
  var expiresDays = 4; /* days */
  expires.setTime(expires.getTime() + (expiresDays*24*60*60*1000));
  var expiresDate = expires.toGMTString();
  document.cookie="GBenchmark=v0.2|"+ browserType +"|true|"+ ConnectionSpeed +"|"+ ConnectionSpeed2 +"|"+ BenchmarkSpeed +"; expires="+expiresDate+"; path=/de/cgi/g.fcgi/misc/mailclient/performance/; domain=.gmx.net;";
}

function setCookie_fm07_setLaunchSettings(autostart, showReminder, initialSpeedTestOK) {
  // set cookie => version|autostart|showReminder|initialSpeedTestOK
  var expires = new Date();
  var expiresDays = 4; /* days */
  expires.setTime(expires.getTime() + (expiresDays*24*60*60*1000));
  var expiresDate = expires.toGMTString();
  document.cookie="fm07_setLaunchSettings=v0.1|"+ autostart +"|"+ showReminder +"|"+ initialSpeedTestOK +"; expires="+expiresDate+"; path=/; domain=.gmx.net;";
}

function decodeAmp(somestring)  {
  var decoded = somestring.replace(/&amp;/g, "&");
  return decoded;
}



/* NedStat Hilfsfunktionen - Linkhandling */
function goOn(newLocation) {
	window.location.href = newLocation;
}
/* NedStat Hilfsfunktionen - Formularhandling */
function submitOn(newLocation) {
	newLocation.submit();
}

/*
 * document ready
 *
 */

try {
	if (jQuery) { // geht natuerlich nur wenn jQuery vorhanden ist

		/* Link um zum Inhalt zuspringen */
		$(document).ready(function() {

			// wenn kein Link vorhanden, fuegen wir einen hinzu
			if ( ! $("div#nav-skip").is("div") ) {
				$("body").prepend('<div id="nav-skip"><a href="'+document.location.href.replace(/[<>'"]/g,'')+'#content-start" accesskey="s">Zum Inhalt</a></div>');

			}
			/* Nedstat */
			// src geaendert und geladen
			$("#onclickSiteStatPixel").load(function(msg){
				return true;
			});
			// "Sitestat" OnClick Zaehler
			$.fn.siteStatOnClick = function(pixelSection, trackParams, event) {
				// Click Event verhindern
				if (event)
					event.preventDefault();
				// Pixel src setzen
				pixelsrc = "//wa.ui-portal.de/" + pixelSection + "/s?" + $(this).attr("id").slice(("sitestat.").length) + trackParams + "&amp;ns_type=clickout&ns_action=view";

				$(pixel).attr("src", pixelsrc);

				if ($(this).is("a")) {
			 		newLocation  = $(this).attr("href");
					window.setTimeout("goOn(newLocation)", 2000);
				}
				else if (($(this).is("input") || $(this).is("button")) && ($(this).attr("type") == "submit" || $(this).attr("type") == "image")) {
					$(this).parents("form").append("<input type=\"hidden\" value=\"1\" name=\"" + $(this).attr("name") + "\" \/>");
					formElement = $(this).parents("form");
					window.setTimeout("submitOn(formElement)", 2000);
				}
				return false;
			};
			if ($("img#sitestat")) {
				var ns_pixelUrl = $("#sitestat").attr("src");
			}

		});

	}
} catch(jQueryError) {
// geht nicht
}







