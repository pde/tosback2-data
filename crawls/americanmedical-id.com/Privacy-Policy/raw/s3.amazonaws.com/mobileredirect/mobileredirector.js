
function setCookie(c_name,value)
{
	var exdate=new Date();
	exdate.setTime(exdate.getTime() + (1800 * 1000));
	document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString();
}

function getCookie(c_name)
{
	if (document.cookie.length>0) {
	  c_start=document.cookie.indexOf(c_name + "=");
	  if (c_start!=-1) {
	    c_start=c_start + c_name.length+1;
	    c_end=document.cookie.indexOf(";",c_start);
	    if (c_end==-1) c_end=document.cookie.length;
	    return unescape(document.cookie.substring(c_start,c_end));
	  }
	}
	return "";
}

var mobileIndicators = [
  "Smartphone",
  "IEMobile",
  "WindowsCE",
  "Palm",
  "hiptop",
  "amoi",
  "AvantGo",
  "Alcatel-",
  "AnexTek",
  "AU-MIC",
  "AUDIOVOX-",
  "BlackBerry",
  "Blazer",
  "CDM-",
  "Dopod-",
  "Ericsson",
  "Hitachi-",
  "HPiPAQ-",
  "HTC-",
  "Droid",
  "Android",
  "iPhone",
  "iPod",
  "KDDI",
  "LG",
  "MM-",
  "MO01",
  "MOT-",
  "Motorola",
  "N515i",
  "N525i",
  "NEC-",
  "Nokia",
  "NOKIA",
  "OpenWeb",
  "Operamini",
  "Opera mini",
  "OPWV",
  "Panasonic",
  "Pantec",
  "PG-",
  "PLS",
  "PM-",
  "PN-",
  "portalmmm",
  "QCI-",
  "RL-",
  "SAGEM",
  "Samsung",
  "SAMSUNG",
  "SCH",
  "SCP-",
  "SEC-",
  "Sendo",
  "SGH-",
  "SHARP-",
  "SIE-",
  "SonyEricsson",
  "SPH",
  "SPV",
  "UP.Browser",
  "UP.Link",
  "V60t",
  "VI600",
  "VK530",
  "VM4050",
  "Vodafone",
  "ZTE",
  "802SH"
 ];

function mobileQueryString(ji) {
  hu = window.location.search.substring(1);
  gy = hu.split("&");
  for (i = 0; i < gy.length; i++) {
      ft = gy[i].split("=");
      if (ft[0] == ji) {
          return ft[1];
      }
  }
  return (false);
}

var fromMobileCookie = getCookie("fromMobileSite");
if (fromMobileCookie != 'true') {

	var fromMobile = mobileQueryString("fromMobileSite");
	if ((fromMobile == 'false') || (fromMobile == '')) {
	
	  var isMobile = false;
	  var agent = navigator.userAgent.toLowerCase();
		for (var i = 0; i < mobileIndicators.length; i++){ 
	    var indicator = mobileIndicators[i].toLowerCase();
	    if (agent.indexOf(indicator) > -1) {
	        isMobile = true;
	    }
	  }
	  if (isMobile) {
	    if (location.host.indexOf(website) != -1) {
	        var host = "http://" + mobilesite + location.pathname + location.search;
	        location.replace(host);
	    }
	  }
	
	} else {
	  setCookie('fromMobileSite', 'true');
	}

}