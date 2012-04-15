function getHTTPRequest() {
	var xmlhttp = false;
	try {
	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	try {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} catch (E) {
	xmlhttp = false;
	}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function iecompattest(){
	return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function showLoading(){
	var ns6 = document.getElementById&&!document.all;
	var loadingDiv = document.getElementById("loadingDiv");
	loadingDiv.style.top=ns6? window.pageYOffset*1+150+"px" : iecompattest().scrollTop*1+150+"px";
	loadingDiv.style.visibility = "visible";
}

function phonePreview(sku)	{
	var ns6=document.getElementById&&!document.all
	var xmlhttp = getHTTPRequest();
	var loadingDiv = document.getElementById("loadingDiv");
	xmlhttp.open("GET","/cell-phone-service/go-phones/phoneDetailsAJAX.jsp?q_sku=" + sku);
	xmlhttp.onreadystatechange = function()
	{
	if (xmlhttp.readyState == 4) {
		var phonePreview = document.getElementById("goPhonePreviewDiv");
		phonePreview.innerHTML = xmlhttp.responseText;
		// if the session expired, the AJAX div will try to load the expired session page. Test and redirect if so
		if (document.getElementById("expiredSession")) {
			window.location.href = "/cell-phone-service/get-started/expired-session.jsp";
			}
		else {
			loadingDiv.style.visibility = "hidden";
			phonePreview.style.top=ns6? window.pageYOffset*1+150+"px" : iecompattest().scrollTop*1+150+"px"
			phonePreview.style.visibility = "visible";
			}
		}
	}
	xmlhttp.send(null);
}
function showPlanDetails(sku)	{
	var ns6=document.getElementById&&!document.all
	var xmlhttp = getHTTPRequest();
	var loadingDiv = document.getElementById("loadingDiv");
	xmlhttp.open("GET","/cell-phone-service/go-phones/planDetailsAJAX.jsp?q_sku=" + sku);
	xmlhttp.onreadystatechange = function()
	{
	if (xmlhttp.readyState == 4) {
		var planPreview = document.getElementById("goPhonePreviewDiv");
		planPreview.innerHTML = xmlhttp.responseText;
		// if the session expired, the AJAX div will try to load the expired session page. Test and redirect if so
		if (document.getElementById("expiredSession")) {
			window.location.href = "/cell-phone-service/get-started/expired-session.jsp";
			}
		else {
			loadingDiv.style.visibility = "hidden";
			planPreview.style.top=ns6? window.pageYOffset*1+150+"px" : iecompattest().scrollTop*1+150+"px"
			planPreview.style.visibility = "visible";
			}
		}
	}
	xmlhttp.send(null);
}
function showAccDetails(sku)	{
	var ns6=document.getElementById&&!document.all
	var xmlhttp = getHTTPRequest();
	var loadingDiv = document.getElementById("loadingDiv");
	xmlhttp.open("GET","/cell-phone-service/go-phones/accDetailsAJAX.jsp?q_sku=" + sku);
	xmlhttp.onreadystatechange = function()
	{
	if (xmlhttp.readyState == 4) {
		var accPreview = document.getElementById("goPhonePreviewDiv");
		accPreview.innerHTML = xmlhttp.responseText;
		// if the session expired, the AJAX div will try to load the expired session page. Test and redirect if so
		if (document.getElementById("expiredSession")) {
			window.location.href = "/cell-phone-service/get-started/expired-session.jsp";
			}
		else {
			loadingDiv.style.visibility = "hidden";
			accPreview.style.top=ns6? window.pageYOffset*1+150+"px" : iecompattest().scrollTop*1+150+"px"
			accPreview.style.visibility = "visible";
			}
		}
	}
	xmlhttp.send(null);
}


// these functions are for the OLAM form on the gophone landing page
// if you need to use them make sure to include /global/scripts/cookieUtils.js

function makeDate() {
	var now = new Date();
	now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
	return now;
}
	

function setCTN(formName, fieldName) {
	callGetCookie(formName, fieldName);
}
	
function callSetCookie(formName, fieldName, cookieName) {
   if (document.forms[formName].rememberCtn.checked == true) {
	   cookieUtils.setImportantCookie(cookieName, document.forms[formName].elements[fieldName].value+"Y", makeDate(),"/",".wireless.att.com");
   } else {
	   cookieUtils.setImportantCookie(cookieName, document.forms[formName].elements[fieldName].value+"N", makeDate(),"/",".wireless.att.com");
   }
}

function callGetCookie(formName, fieldName) {
   var colamCtnCookie = cookieUtils.getCookie("colam_ctn");
   if ((colamCtnCookie!=null)&&(colamCtnCookie.length>=10)){
		var colamCtnFromCookie =colamCtnCookie.substring(0,10);
		var rememberMeChecked = 'N';
		if ((colamCtnCookie!=null)&&(colamCtnCookie.length>=11)){
		   rememberMeChecked = colamCtnCookie.substring(10,11);
		}
		if (rememberMeChecked == 'Y'){
		   document.forms[formName].elements[fieldName].value=colamCtnFromCookie;
		   document.forms[formName].rememberCtn.checked=true;
		}else{
		   document.forms[formName].rememberCtn.checked=false;
		}
   }
   if ((colamCtnCookie!=null)&&(colamCtnCookie.length<10)){
		document.forms[formName].rememberCtn.checked=false;
   }
   if (colamCtnCookie==null){
		document.forms[formName].rememberCtn.checked=false;
   }
}
