/*
	CartoonMSIB()

	required on page 
		requires jquery
	
	Optional
		<script language="javascript" type="text/javascript" src="/tools/js/LoginModule.js"></script>
		var cartoonMSIB_pid = "cn.pidname";

*/

function CartoonMSIB(){
	
}

CartoonMSIB.checkForStage = function (){

	var	s = "www";
	var dmArr = new Array();
	dmArr[0] = "staging.cartoonnetwork.com";
	dmArr[1] = "gcstage.cartoonnetwork.com";
	dmArr[2] = "bgcstage.cartoonnetwork.com";
	dmArr[3] = "swgcstage.cartoonnetwork.com";
	dmArr[4] = " ";
	
	for(var i=0; i <= dmArr.length-1; i++){
		if(document.URL.indexOf(dmArr[i]) > -1){
			s = "staging"; 
		}
	}
	
	return s;
}

CartoonMSIB.cartoonMSIBEnvironment 		= CartoonMSIB.checkForStage();

CartoonMSIB.displayName = "";
CartoonMSIB.avatarPath 	= "";
CartoonMSIB.pid 		= typeof(cartoonMSIB_pid) != "undefined" ? cartoonMSIB_pid : "cn.general";

	/*
	 * Decorator
	 *
	 * selects a random character image for the login and registration modal
	 *
	*/
	
CartoonMSIB.decoImgs = new Array('ben10','at','rs');
CartoonMSIB.decoMem = Math.floor((Math.random()*3));
CartoonMSIB.decoRegPath = 'url(/accounts/tools/img/' + CartoonMSIB.decoImgs[CartoonMSIB.decoMem] + '.reg.png)';
CartoonMSIB.decoLoginPath = 'url(/accounts/tools/img/' + CartoonMSIB.decoImgs[CartoonMSIB.decoMem] + '.login.png)';


CartoonMSIB.isLoggedIn = function (){
	
	var isAccountPage = (document.URL.indexOf("cartoonnetwork.com/accounts") > -1) ? true : false;
	var validLogin = false;	
	//var isAuthorized = true;
	
	if(isAccountPage){
		validLogin = (CartoonMSIB.doCookieCheck("TEGid") && CartoonMSIB.doCookieCheck("authid") && CartoonMSIB.doCookieCheck("authpass") && CartoonMSIB.doCookieCheck("dname")) ? true : false;
	}else{
		validLogin = (CartoonMSIB.doCookieCheck("TEGid") && CartoonMSIB.doCookieCheck("authid") && CartoonMSIB.doCookieCheck("dname")) ? true : false;
	}
	if(validLogin){
		CartoonMSIB.displayName = CartoonMSIB.readCookie("dname");
		CartoonMSIB.avatarPath = CartoonMSIB.readCookie("davatar");
		return true;
	}else{
		
		return false;
	}
}

CartoonMSIB.resizeRegWindow	= function(the_div) {
	var	wHeight;
	var wWidth;
	var wReg						= document.getElementById(the_div);
	var wBackground					= document.getElementById("login_fade");

	if (typeof window.innerWidth == 'number') {
		//Non-IE
		wWidth = window.innerWidth;
		wHeight = window.innerHeight;
	} else if (document.documentElement && document.documentElement.clientWidth) {
		//IE 6+ in 'standards compliant mode'
		wWidth = document.documentElement.clientWidth;
		wHeight = document.documentElement.clientHeight;
	}
	
	// set the background fade height
	wBackground.style.height		= wHeight > document.body.parentNode.scrollHeight ? wHeight +"px" :  document.body.parentNode.scrollHeight +"px";

	// set scrolling offset
	jQuery(window).scroll(function(){
		wReg.style.top    = window.pageYOffset != undefined ? String(window.pageYOffset+50) + "px" : (document.documentElement.scrollTop+50) + "px";
	});
}


CartoonMSIB.loadMSIB = function (the_div, the_page){

	document.getElementById("login_fade").style.display 	= "block";
	document.getElementById(the_div).childNodes[0].setAttribute("src", the_page);
	document.getElementById(the_div).style.display 			= "block";
	document.getElementById(the_div).style.top    			= window.pageYOffset != undefined ? String(window.pageYOffset+50) + "px" : (document.documentElement.scrollTop+50) + "px";
	
	CartoonMSIB.resizeRegWindow(the_div);
	if (jQuery(document.getElementById(the_div)).attr('id')== "msib_login") {
		jQuery(document.getElementById(the_div)).css('background-image',CartoonMSIB.decoLoginPath);
	} else {
		jQuery(document.getElementById(the_div)).css('background-image',CartoonMSIB.decoRegPath);
	}
}


CartoonMSIB.switchMSIBView = function (the_view){
	var mURLArray			= new Array();//new page, new div, close old div
	mURLArray['login']		= new Array("login.html", "msib_login", "msib_register");
	mURLArray['register']	= new Array("register.html", "msib_register", "msib_login");
	
	var switchURL		= "http://" + CartoonMSIB.cartoonMSIBEnvironment + ".cartoonnetwork.com/accounts/" +mURLArray[the_view][0]+ "?pid=" +CartoonMSIB.pid;
	document.getElementById(mURLArray[the_view][2]).childNodes[0].setAttribute("src", "");
	document.getElementById(mURLArray[the_view][2]).style.display = "none";
	CartoonMSIB.loadMSIB(mURLArray[the_view][1], switchURL);
}

CartoonMSIB.closeMSIB = function (){

	document.getElementById("login_fade").style.display = "none";
	var msib_login = document.getElementById("msib_login");
	var msib_register = document.getElementById("msib_register");
	var msib_auth = document.getElementById("msib_auth");
	
	if(msib_login.style.display == "block"){
		msib_login.childNodes[0].setAttribute("src", "");
		msib_login.style.display = "none";
	}else if(msib_auth.style.display == "block"){
		msib_auth.childNodes[0].setAttribute("src", "");
		msib_auth.style.display = "none";
	}else if(msib_register.style.display == "block"){
		msib_register.childNodes[0].setAttribute("src", "");
		msib_register.style.display = "none";
	}
	
	
	if(typeof(LoginModule) == "function"){
		LoginModule.showLoginWindow({visible: false});
		LoginModule.doCartoonLogIn(); 	
	}
}

CartoonMSIB.setAvatarPath = function (p_imgURL){

	CartoonMSIB.setCookie('davatar', p_imgURL, 604800, 'cartoonnetwork.com');
}

CartoonMSIB.logOut = function (){

	CartoonMSIB.deleteCookie("encodeName");
	CartoonMSIB.deleteCookie("authid");
	CartoonMSIB.deleteCookie("authpass");
	CartoonMSIB.deleteCookie("displayname");
	CartoonMSIB.deleteCookie("LiSESSIONID");
	CartoonMSIB.deleteCookie("dname");
	CartoonMSIB.deleteCookie("davatar");
	CartoonMSIB.deleteCookie("username");
		
}

CartoonMSIB.isAuthorized = function(socialArray, pid, tid, authid, authpass){
	
	var status	= false;

	MSIB.ajax({
		type: "POST",
		url: "/cn/msapi/service.auth",
		data: "serviceCode=" +pid+ "&tid=" +tid+ "&authid=" +authid+ "&authpass=" +authpass,
		async: false,
		success: function(data) {
			if(jQuery.inArray(pid, socialArray)  >= 0){
				// if social TBD
			}else{
				// set only non-social pid & authz cookie
				CartoonMSIB.setCookie("pid",data.serviceCode,604800); 
				CartoonMSIB.setCookie("authz",data.authz,604800); 	
			}
			status	= true;
		},
		error: function(request, status, thrown) {
			status	= false;
	    },
		failure: function(errors, prerequisites) {
			status	= false;
		}				
	});		

	return status;
}

/************************************************
	Check Auth Function called by LoginModule.js (line 80 approx)
************************************************/

CartoonMSIB.checkAuthorization = function(){
	var auth_status		= false;
	var socialArray		= new Array("cn.fusionfallsocial", "cn.exonautsocial", "cn.formulacartoonsocial");
	
	if(CartoonMSIB.pid != "cn.general" && CartoonMSIB.isLoggedIn()){
		if(CartoonMSIB.doCookieCheck("authz")){	
		var cstr = CartoonMSIB.readCookie("authz");
		//alert("calling check auth funct" +cstr);
		
			if(cstr.indexOf(CartoonMSIB.pid) > -1){
				auth_status = true;	
			}else{	
				// authorizied check starts here	
				var pid				= CartoonMSIB.pid;
				var authid			= CartoonMSIB.readCookie("authid");
				var	tid				= CartoonMSIB.readCookie("TEGid");
				var	authpass		= CartoonMSIB.readCookie("authpass");
				var social_pid		= pid+"social";
				
				// auth check non-social
				auth_status	= CartoonMSIB.isAuthorized(socialArray, pid, tid, authid, authpass);
				//alert("social = " + social_pid + " and auth status = " +auth_status);
	
				if(auth_status == true){
					if(jQuery.inArray(social_pid, socialArray)  >= 0){
						auth_status	= CartoonMSIB.isAuthorized(socialArray, social_pid, tid, authid, authpass, auth_status);
						if(auth_status == false){
							CartoonMSIB.loadMSIB("msib_auth", "http://" + CartoonMSIB.cartoonMSIBEnvironment + ".cartoonnetwork.com/accounts/login.html?pid=" +pid+ "&step=auth");
						}
					}
				}else{
					// Logged in but not authorized
					CartoonMSIB.loadMSIB("msib_auth", "http://" + CartoonMSIB.cartoonMSIBEnvironment + ".cartoonnetwork.com/accounts/login.html?pid=" +pid+ "&step=auth");
				}
				// authorizied check ends here
			}
		}
	}
	return auth_status;
}




/* Cookie code -------------------------------------------------------------------------------------------------------------------------------- */
CartoonMSIB.doCookieCheck = function (p_cookie) {
	var arrCookie = document.cookie.split("; ");
	for (var i=0; i < arrCookie.length; i++){
		var arrCrumb = arrCookie[i].split("=");
		if (p_cookie == arrCrumb[0]){
			return true;
		}
	}
	return false;
}

CartoonMSIB.readCookie = function(cookieName) {
	var theCookie=""+document.cookie;
	var ind=theCookie.indexOf(cookieName);
	if (ind==-1 || cookieName=="") return ""; 
	var ind1=theCookie.indexOf(';',ind);
	if (ind1==-1) ind1=theCookie.length; 
	return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}

CartoonMSIB.setCookie = function(name,value,seconds,domain) {
	var expires = '';
	if (domain == null) {
		domain = CartoonMSIB.cookieDomain();
	}
	if (seconds != 0) {
		var date = new Date();
		date.setTime(date.getTime() + seconds*1000);
		expires = '; expires=' + date.toGMTString();
	}
	document.cookie = name + '=' + decodeURI(value) + expires + '; path=/; domain=.' + domain; 
}

CartoonMSIB.getCookies = function() {
	var hash = new Array;
	if (document.cookie != null) {
		var a = document.cookie.split('; ');
		for (var i=0; i < a.length; i++) {
			var nv = a[i].split('=');
			if (nv[1] != null) {
				hash[nv[0]] = unescape(nv[1]);
			}
		}
	}
	return hash;
}

CartoonMSIB.deleteCookie = function(name) {
	CartoonMSIB.setCookie(name, 'x', -1);
}

CartoonMSIB.cookieDomain = function() {
	var d;
	var parts = window.location.hostname.split('.');
	if (parts[parts.length-1].length == 2) {
		d = parts[parts.length-3] + '.' +
		parts[parts.length-2] + '.' +
		parts[parts.length-1];
	}else {
		d = parts[parts.length-2] + '.' +
		parts[parts.length-1];
	}
	return d;
}
/* end Cookie code --------------------------------------------------------------------------------------------------------------------------- */

