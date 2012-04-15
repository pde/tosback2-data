var myHref=document.location.href;
var ref=document.referrer;
if(ciEnabled !=false){
//CI Tracking for www.walgreens.com
//var cicookienameCpn="ciTrackerCpn";
//var cicookienameSrc="ciTrackerSrc";
var cpnLabel="cpncode=";
var srcLabel="srccode=";
var cpnStr, srcStr;

if (myHref.indexOf(cpnLabel)>-1&&(myHref.indexOf(srcLabel)>-1)) {
	myHrefSplit=myHref.split("?");
	quer=myHrefSplit[1];
	querSplit=quer.split("&");
	for (var i=0; i<querSplit.length; i++) {
		if (querSplit[i].indexOf(cpnLabel)>-1) {
			cpnStr=querSplit[i].substring(8);
		}
		if (querSplit[i].indexOf(srcLabel)>-1) {
			srcStr=querSplit[i].substring(8);
		}
	}
	bakeCookie(cicookienameCpn,cpnStr);
	bakeCookie(cicookienameSrc,srcStr);
}
}
if(siEnabled !=false){
//SI Tracking for www.walgreens.com
var a=new Array("walgreens.com","google.com","msn.com","yahoo.com");
var b="sitrackingid=";
//var sicookiename="siTracker";
var siValue="sitrackingid";
for(var i=0;i<a.length;i++){
	if (ref.indexOf(a[i])>-1&&(myHref.indexOf(b)>-1)) {
	//alert("this is add cookie");
		bakeCookie(sicookiename,siValue);
		break;
	}else{
		var existingCookie =getCookie(sicookiename);
		if (existingCookie!=null) {
			var isExpiredCookie =isExpired(existingCookie);
			if(isExpiredCookie!=null){
			break;
			}else{
				//If cookie is expired add new cookie
				bakeCookie(sicookiename,siValue);
			}
		 }else{
			break;
		}
	}
}
}
function isExpired(existingCookieAge){
	var currentdate = new Date (); 
	if(existingCookieAge > currentdate.getTime()){
	return true;
	}else{
	return null;
	}
}

// * return string containing value of specified cookie or null if cookie does not exist
function getCookie(name) {
  var dc = document.cookie;
   var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

function setCookie(name,value,expires,path) { 
	var cookieString = name + "=" +escape(value)+((expires) ? "; expires=" + expires: "") +
      ((path) ? "; path=" + path : "") ;
	//alert(cookieString);
	document.cookie = cookieString; 

}
//setting the cookie
function bakeCookie(name,value)
{
	//cookie expires 30 days
	var expdate = new Date (); 
	expdate.setTime(expdate.getTime() + (cookieAge)); 
	var path ="/";
	var expires=expdate;
	setCookie(name,value,expires,path);
}
