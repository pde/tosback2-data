/*
	LoginModule()

	required on page 
	<script language="javascript" type="text/javascript" src="/tools/js/global/CartoonMSIB.js"></script>
	
	<div id="cnLogInUI"></div> or <div id="loggedInOut"></div>
	<div id="myAvatar"></div>
	
	Optional vars
	var cartoonMSIB_pid = "cn.pidname";

*/

function LoginModule () {
	
}

LoginModule.checkForStage = function (){

	var	s = "www";
	var dmArr = new Array();
	dmArr[0] = "staging.cartoonnetwork.com";
	dmArr[1] = "gcstage.cartoonnetwork.com";
	dmArr[2] = "bgcstage.cartoonnetwork.com";
	dmArr[3] = "swgcstage.cartoonnetwork.com";
	dmArr[4] = "mixitstaging.cartoonnetwork.com";
	
	for(var i=0; i <= dmArr.length-1; i++){
		if(document.URL.indexOf(dmArr[i]) > -1){
			s = "staging"; 
		}
	}
	
	return s;
}

LoginModule.formatPlayerName	= function(dname){
	var maxlength		= 10;
	var format			= "";
	dname				= dname.split(" ");
	for(d=0; d < dname.length; d++){
		if(dname[d].length > maxlength){
			dname[d]	= dname[d].substr(0,maxlength) + "...";
		}
		format	+= dname[d] + "<br /> ";
	}
	return format;
}

LoginModule.getQueryData = function(){

	var vals = location.search.substring(1, location.search.length).split("&");
	var val;
	var i = vals.length;
	var result = {};

	while(i--)
	{
		val = vals[i].split("=");
		result[val[0]] = val[1];
	}
	
	return result;
}


LoginModule.loginModuleEnvironment 		= LoginModule.checkForStage(); 
LoginModule.params 						= LoginModule.getQueryData();

LoginModule.MSIBpid 					= typeof(cartoonMSIB_pid) != "undefined" ? cartoonMSIB_pid : "cn.general";
LoginModule.userDisplayName 			= "";
LoginModule.userPublic 					= true;
LoginModule.isLoggedIn 					= false;

LoginModule.checkLogin = function (){

	if(CartoonMSIB.isLoggedIn()){
		
		if(CartoonMSIB.checkAuthorization() == false){ //checks authorization
			setTimeout("CartoonMSIB.isLoggedIn()",2000);
		}
		
		LoginModule.isLoggedIn = true;
		
		LoginModule.userDisplayName = CartoonMSIB.displayName;
		
		LoginModule.doWriteAvatar();
		LoginModule.doWriteLoggedInGreeting();
		
		setTimeout("LoginModule.onCartoonLogIn_Complete()",2000);
		setTimeout("LoginModule.onReady()",2000);
		var lmcffrto = setTimeout("LoginModule.checkForFriendRequests()",2000);

	}else{
		LoginModule.onCartoonLoggedOut();
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

LoginModule.doCartoonLogIn = function (){

	if(CartoonMSIB.isLoggedIn()){
		LoginModule.isLoggedIn = true;
		
		LoginModule.userDisplayName = CartoonMSIB.displayName;
		
		LoginModule.doWriteAvatar();
		LoginModule.doWriteLoggedInGreeting();
		
		if(LoginModule.fwdToProfile()){
			window.location.href = LoginModule.getProfileURL(CartoonMSIB.displayName);
		}else if(LoginModule.params._dest != null && document.URL.indexOf("cartoonnetwork.com/forums") > -1){
			window.location.href = "http://www.cartoonnetwork.com/forums" + unescape(LoginModule.params._dest);
		}else if(LoginModule.doReload()){
			window.location.reload();
		} 
		
		LoginModule.onCartoonLogIn_Complete();
		LoginModule.onReady();
		LoginModule.checkForFriendRequests()
	}else{
		LoginModule.onCartoonLoggedOut();
	}
}

LoginModule.fwdToProfile = function (){

	if((document.URL.indexOf("/Profiles/index.html") > -1) || (document.URL.indexOf("/profiles/whatarebadges.html") > -1)){
		return true;
	}else{
		return false;
	}
}

LoginModule.doGotoProfile = function (p_ScreenName){
		
	window.location.href = LoginModule.getProfileURL(p_ScreenName);	
}

LoginModule.getProfileURL = function (p_ScreenName){
	p_ScreenName = decodeURI(p_ScreenName);
	p_ScreenName = p_ScreenName.replace(/\s+/g,'-');

	var str = "http://" + LoginModule.loginModuleEnvironment + ".cartoonnetwork.com/profiles/" + p_ScreenName;

	return str;
}

LoginModule.doReload = function (){

	var	b = true;
	var sArr = new Array();

	//pages that do not need to reload
	sArr[0] = "gcstage.cartoonnetwork.com";
	sArr[1] = "bgcstage.cartoonnetwork.com";
	sArr[2] = "swgcstage.cartoonnetwork.com";
	sArr[3] = "/games/";
	sArr[4] = "starwarsgamecreator.cartoonnetwork";
	sArr[5] = "ben10gamecreator.cartoonnetwork";
	sArr[6] = "batmangamecreator.cartoonnetwork";
	sArr[7] = "cartoonnetwork.com/video/";
	sArr[8] = "/video/";

	//exception games that do need to reload
	var gArr = new Array();
	gArr[0] = "/exonaut";
	gArr[1] = "/tko";
//	gArr[2] = "/conqueror-of-all-worlds";

	for(var i=0; i <= sArr.length-1; i++){
		if(document.URL.indexOf(sArr[i]) > -1){

			b = false; 
			
			// do reload games index page
			if (sArr[i] == "/games/") {
				if (document.location.pathname == "/games/" || document.location.pathname ==  "/games/index.html") {
					b = true;
				}
			}
			
			// do reload games with an exception
			if(i==3){
				for(var n=0; n <= gArr.length-1; n++){
					if(document.URL.indexOf(gArr[n]) > -1){
						b = LoginModule.doDelayReload(gArr[n]);
					}
				}
			}
		}
	}
	
	return b;
}

LoginModule.doDelayReload = function (p_location){

	var doImmediateReload = false;
	
	// reload these games after an interval
	switch(p_location){
//		case "/conqueror-of-all-worlds":
//			var t=setTimeout("LoginModule.reloadURL()",5000);
//			doImmediateReload = false;
//		break;
		default:
			doImmediateReload = true;
		break;
	}
		
	return doImmediateReload;
}

LoginModule.reloadURL = function (){
	window.location.reload();
}

LoginModule.doWriteLoggedInGreeting = function (){
	var formatted_dname			= LoginModule.formatPlayerName(CartoonMSIB.displayName);
	
	if(document.getElementById("cnLogInUI")){
		if (window.location.hostname.indexOf('blog') < 0) {
			document.getElementById("cnLogInUI").innerHTML = '<div class="lmtop"><div class="img"><a id="myAvatar" href="javascript:adbpGnav(\'screenname\'); location.href=\'' + LoginModule.getProfileURL(CartoonMSIB.displayName) + '\';"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="50" height="50" alt="" border="0" /></a></div><div class="uname"><a href="javascript:adbpGnav(\'screenname\'); location.href=\'' + LoginModule.getProfileURL(CartoonMSIB.displayName) + '\';">' + formatted_dname.toUpperCase() + '</a></div><div class="btns"><div class="wrapper"><div class="friendicator" onclick="adbpGnav(\'friendrequest\'); location.href=\'http://' + LoginModule.loginModuleEnvironment + '.cartoonnetwork.com/my-requests\';"><span></span></div></div><div class="log"><span>( </span><a href="javascript:LoginModule.onCartoonLogOut(); adbpGnav(\'logout\');">Log out</a><span> )</span></div></div><div class="clr"></div></div><div class="lmbtm"><div class="img"><img src="http://i.cdn.turner.com/toon/tools/img/global/nav/login/badges.png" width="33" height="31" alt="" /></div><div class="bar"><div class="fill">&nbsp;</div><div class="text"><span class="white"></span><span class="grey"> of </span><span class="white"></span></div></div><div class="clr"></div></div>';
		} else {
			document.getElementById("cnLogInUI").innerHTML = '<div class="lmtop"><div class="img"><a id="myAvatar" href="javascript:adbpGnav(\'screenname\'); location.href=\'' + LoginModule.getProfileURL(CartoonMSIB.displayName) + '\';"><img src="http://i.cdn.turner.com/toon/tools/img/pixel.gif" width="50" height="50" alt="" border="0" /></a></div><div class="uname"><a href="javascript:adbpGnav(\'screenname\'); location.href=\'' + LoginModule.getProfileURL(CartoonMSIB.displayName) + '\';">' + formatted_dname.toUpperCase() + '</a></div><div class="btns"><div class="wrapper"><div class="friendicator" onclick="adbpGnav(\'friendrequest\'); location.href=\'http://' + LoginModule.loginModuleEnvironment + '.cartoonnetwork.com/my-requests\';"><span></span></div></div><div class="log"><span>( </span><a href="javascript:LoginModule.onCartoonLogOut(); adbpGnav(\'logout\');">Log out</a><span> )</span></div></div>';
		}
		LoginModule.doWriteAvatar();
		

	}
		
	if(document.getElementById("loggedInOut")){ 	
		if (window.location.hostname.indexOf('blog') < 0) {
			document.getElementById("loggedInOut").innerHTML = "<a href='" + LoginModule.getProfileURL(CartoonMSIB.displayName) + "'><div id='myAvatar' style='margin-right: 5px;'><img src='http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i2/pixel.gif' border='0' width='40' height='40'></div></a><span class='loggedInText'>" + formatted_dname.toUpperCase() + "<br /><a href='" + LoginModule.getProfileURL(CartoonMSIB.displayName) + "'>YOUR PROFILE</a> <span class='gnPipe'>|</span> <a href='javascript:LoginModule.onCartoonLogOut();'>LOG OUT</a></span>";
		} else {
			document.getElementById("loggedInOut").innerHTML = "<a href='" + LoginModule.getProfileURL(CartoonMSIB.displayName) + "'><div id='myAvatar' style='margin-right: 5px;'><img src='http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i2/pixel.gif' border='0' width='40' height='40'></div></a><span class='loggedInText'>" + formatted_dname.toUpperCase() + "<br /><a href='" + LoginModule.getProfileURL(CartoonMSIB.displayName) + "'>YOUR PROFILE</a> <span class='gnPipe'>|</span> <a href='javascript:LoginModule.onCartoonLogOut();'>LOG OUT</a></span>";
		}
		LoginModule.doWriteAvatar();
	}
	
}

LoginModule.doWriteAvatar = function (){

	if(document.getElementById("myAvatar")){ 
		document.getElementById("myAvatar").innerHTML = "<img src='http://i.cdn.turner.com/v5cache/CARTOON/site/"+CartoonMSIB.avatarPath+"' border='0' width='50' height='50'>";
	}
}

LoginModule.doUpdateAvatar = function (p_imgURL){

	CartoonMSIB.setAvatarPath(p_imgURL);	
	LoginModule.doWriteAvatar()
}

LoginModule.onCartoonLoggedOut = function (p_imgURL){
	
	CartoonMSIB.logOut();
	
	LoginModule.isLoggedIn = false;
	
	if(document.getElementById("cnLogInUI")){ 
		document.getElementById("cnLogInUI").innerHTML = '<div class="lmtop"><div class="img"><a id="myAvatar" href="javascript:LoginModule.showLoginWindow({visible: true}, \'login\'); adbpGnav(\'login\');"><img width="50" height="50" border="0" src="http://www.cartoonnetwork.com/tools/img/global/profile_generic.jpg" class="navatar"></a></div><div class="logintext"><span>JOIN NOW IT\'S FREE!</span><br /><a href="javascript:LoginModule.showLoginWindow({visible: true}, \'reg\'); adbpGnav(\'signup\');">SIGN UP</a><span class="gnPipe">&nbsp;|&nbsp;</span><a href="javascript:LoginModule.showLoginWindow({visible: true}, \'login\'); adbpGnav(\'login\');">LOG IN</a></div><div class="clr"></div></div><div class="lmbtm"><div class="img"><img src="http://i.cdn.turner.com/toon/tools/img/global/nav/login/badges.png" width="33" height="31" alt="" /></div><div class="bar"><span class="white">0</span><span class="grey"> of </span><span class="white">???</span></div></div>';
		LoginModule.getTotalBadges();
	}
	
	if(document.getElementById("loggedInOut")){ 
		document.getElementById("loggedInOut").innerHTML = '<div style="text-align: center; padding-top: 5px; padding-left: 33px;"><span class="loggedInText">Join now -- it\'s FREE!</span><br /><a href="javascript:LoginModule.showLoginWindow({visible: true}, \'reg\');">SIGN UP</a></span><span class="gnPipe">&nbsp;|&nbsp;</span><a href="javascript:LoginModule.showLoginWindow({visible: true}, \'login\');">LOG IN</a></div>';
	}

	LoginModule.onReady();
}

LoginModule.onCartoonLoginCancel = function (){

	LoginModule.showLoginWindow({visible: false});
	LoginModule.onCartoonLoginCancel_Complete();
}

LoginModule.onShowPrivacyPolicy = function (){

	window.open("http://" + LoginModule.loginModuleEnvironment + ".cartoonnetwork.com/legal/privacy.html");
}

LoginModule.showLoginWindow = function (oParams, p_menuView) {

	if(oParams.visible){
		LoginModule.onShowLoginWindow();

		var loginView = p_menuView == "reg" ? "msib_register" : "msib_login";
		var loginPath = p_menuView == "reg" ? "http://" + LoginModule.loginModuleEnvironment + ".cartoonnetwork.com/accounts/register.html?pid="+LoginModule.MSIBpid :  "http://" + LoginModule.loginModuleEnvironment + ".cartoonnetwork.com/accounts/login.html?pid="+LoginModule.MSIBpid;

		CartoonMSIB.loadMSIB(loginView, loginPath);	
	}else{
		LoginModule.onHideLoginWindow();
	}
}


//Module functions that control elements on the site /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

LoginModule.onCartoonLogOut = function (){

	if(typeof(HOGAchievementModule) == "function"){ 
		HOGAchievementModule.AchievementModule_onCartoonLogOut();
	} 

	CartoonMSIB.logOut();	

	window.location.reload();
}

LoginModule.onReady = function () {

	if(typeof(VideoAchievementModule) == "function"){ 
		VideoAchievementModule.AchievementModule_onCartoonLogIn_Complete(); 
	} 

	if(typeof(HOGAchievementModule) == "function"){ 
		HOGAchievementModule.AchievementModule_onCartoonLogIn_Complete(); 
	} 
}

LoginModule.onCartoonLogIn_Complete = function (){

	if(typeof(AchievementModule) == "function"){ 
		AchievementModule.AchievementModule_onCartoonLogIn_Complete(); 
	} 

	if(typeof(LoginModuleComm) == "function"){ 
		LoginModuleComm.sendLoginData(LoginModule.userDisplayName); 
	} 
	
	if(typeof(TopScoresModule) == "function"){ 
		TopScoresModule.TopScoresModule_onCartoonLogIn_Complete();
	} 
	
	if(typeof(TDAModuleComm) == "function"){
		TDAModuleComm.talktoSwf(LoginModule.userDisplayName);
	}
	
}

LoginModule.onCartoonReg = function (p_ScreenName){
	jQuery('<div></div>').html('reg happened').css('color','#ffffff').prependTo('body');
}

LoginModule.onCartoonRegCancel = function (){
	alert("testing cancel 1");
	if(typeof(LoginModuleComm) == "function"){ 
	alert("testing cancel 1a");
		LoginModuleComm.sendCancel(); 
	}

	LoginModule.onHideLoginWindow();
}

LoginModule.onCartoonLoginCancel_Complete = function (){
	alert("testing cancel 2");

	if(typeof(LoginModuleComm) == "function"){ 
	alert("testing cancel 2a");
		LoginModuleComm.sendCancel(); 
	} 

	LoginModule.onHideLoginWindow(); 

	if(typeof(VideoAchievementModule) == "function"){ 
		VideoAchievementModule.AchievementModule_onCartoonLogInCancel_Complete(); 
	}
}

LoginModule.onShowLoginWindow = function () {

	if(typeof(AchievementModule) == "function"){ 
		AchievementModule.AchievementModule_onShowLoginWindow(); 
	}

	if(typeof(VideoAchievementModule) == "function"){ 
		VideoAchievementModule.AchievementModule_onShowLoginWindow(); 
	}
	
	if(document.getElementById('displayBlock')){
		document.getElementById('displayBlock').style.visibility = "hidden";
	}

	if(document.getElementById('unityPlayer')){
		document.getElementById('unityPlayer').style.visibility = "hidden";
	}
}

LoginModule.onHideLoginWindow = function () {

	if(typeof(AchievementModule) == "function"){ 
		AchievementModule.AchievementModule_onHideLoginWindow(); 
	}

	if(typeof(VideoAchievementModule) == "function"){ 
		VideoAchievementModule.AchievementModule_onHideLoginWindow(); 
	}
	
	if(document.getElementById('displayBlock')){
		document.getElementById('displayBlock').style.visibility = "visible";
	}

	if(document.getElementById('unityPlayer')){
		document.getElementById('unityPlayer').style.visibility = "visible";
	}
}

LoginModule.onAlert = function (p_val) {

	alert(p_val); 
}

LoginModule.checkForFriendRequests = function() {

	var toonGNlib							= new toon_lib;
	toonGNlib.base_url 						= window.location.hostname;
	toonGNlib.init(window.location); 
	var GNauthid							= CartoonMSIB.readCookie("authid");
	var	GNtid								= CartoonMSIB.readCookie("TEGid");

	toonGNlib.friend_requests({msib_id : GNtid, authid : GNauthid, with_data: "false", with_dna: false },function(data){ 
	
		var count = 0;
		for(var x in data.relations){
			if(x != undefined && x != "undefined"){
				count++;
			}
		}
		
		if (count > 0) {
			jQuery('body .ad728Wrapper .ad728inner .login-module .lmtop .btns .wrapper .friendicator').css('display','block');
			jQuery('body .ad728Wrapper .ad728inner .login-module .lmtop .btns .wrapper .friendicator span').html(count);
		}
		
	});
	
	toonGNlib.profile_w_badges({msib_id : GNtid, width_data : 'false'},function(data){
		badgesEarned 	= data.total_badges;
		badgesMax 		= data.badges_possible;
		if (badgesEarned > 2) { 
			percentage 		=  Math.round((badgesEarned / badgesMax) * 197) + "px";
		} else {
			percentage = 1;
		}
		jQuery('body .ad728Wrapper .ad728inner .login-module .lmbtm .bar .fill').attr('style','width: ' + percentage);
		jQuery('body .ad728Wrapper .ad728inner .login-module .lmbtm .bar .text span.white:eq(0)').html(badgesEarned);
		jQuery('body .ad728Wrapper .ad728inner .login-module .lmbtm .bar .text span.white:eq(1)').html(badgesMax);
	});
}

LoginModule.getTotalBadges = function() {

	var toonLOlib 		= new toon_lib;
	toonLOlib.base_url 	= window.location.hostname;
	toonLOlib.init(window.location);
	toonLOlib.rest_badges_count({},function(data){
		jQuery('body .ad728Wrapper .ad728inner .login-module .lmbtm .bar span.white:eq(1)').html(data.count);
	});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

