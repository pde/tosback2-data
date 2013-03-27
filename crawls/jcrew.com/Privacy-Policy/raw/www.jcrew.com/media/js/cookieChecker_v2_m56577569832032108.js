var popPath = "/include/";
var thisCookie="emailPopUnder";

function cookieChecker(cook) {
	var isPresent = getCookie(cook);
	if(isPresent != null) {
		document.images;
	} else {
		Set_Cookie(cook,"yes",30);
		TheNewWin =window.open(popPath+"popup_signup.jsp",'ThePop','toolbar=no, scrollbars=yes,menubar=no,resize=no,width=855,height=480'); 
		if(TheNewWin) TheNewWin.blur();
		window.focus();
	}
}

var bypass='false';
if(window.location.href.toLowerCase().indexOf('nopopup')>-1){	
	var locationCheck = window.location.href.split('/');
	var curUrl=locationCheck[locationCheck.length-1];
	var curVarIndx=curUrl.toLowerCase().indexOf('nopopup')+8;
	bypass = curUrl.substring(curVarIndx,(curUrl.indexOf('&',curVarIndx)>-1)?curUrl.indexOf('&',curVarIndx):curUrl.length);	
}
//if (bypass != "true") {cookieChecker(thisCookie);}
if (window.location.href.indexOf('index.jsp')>-1 && bypass.toLowerCase() != "true") {cookieChecker(thisCookie);}