/*
 * In order for Colorbox lightboxes to appear correctly, ensure that the CSS styles found in bauxite components CDCXColorBoxStyle and CDCXColorBoxStyleX
 * have been included either in the widget or in the page that includes this floating bar javascript.
 */


/*
 *	Initialize top floating bar and its contents on page ready.
 */
$(document).ready(function () {initFloatingBar();});


/* 
 * Gigya Setup (for login purposes via social networks)
 */
$.ajaxSetup({
 cache: true
});

var baseUrl = '';
var disableRequestSsl = '';

if(window.console)console.log('protocol: ' + location.protocol);

if(location.protocol==='https:') {
	baseUrl = 'https://cdns.gigya.com/JS/socialize.js?apikey='; 
	disableRequestSsl = "false";
} else {
	baseUrl = 'http://cdn.gigya.com/JS/socialize.js?apikey='; 
	disableRequestSsl = "true";
}

if(window.console)console.log('baseUrl: ' + baseUrl);

var devKey = '2_YhN_U5XevCubeOb5G5SMglWOdQMQCWkeBhDiC7_jYCLOeKDWaLZH-xCxQxjfh-LC';
 
var productionKey = '2_sJkMN6EECuWAm9Bin0odLXZGrANQmyAtldKIPB8cVod35uFrzBuV6l688IBzWYyk';

var gigyaJS = '';
if(window.console)console.log("location.host: " + location.host);
if(location.host==='www.carsdirect.com' || location.host==='pricinginsider.carsdirect.com'){
	if(window.console)console.log("Production environment");
	gigyaJS = baseUrl+productionKey;
} else {
	if(window.console)console.log("Dev/staging environment");
	gigyaJS = baseUrl+devKey;
}

/*
 * Automotive services URL environment set up
 */
 var autoServicesJsUrl = '';
 if(location.host==='www.carsdirect.com' || location.host==='pricinginsider.carsdirect.com') {
	autoServicesJsUrl = '//new-car-services.internetbrands.com/services';
 } else {
	autoServicesJsUrl = 'http://stg-asvm1.internetbrands.com:8080/services';
 }

 
 /*
  * Prepare user profileGuid
  */
  var profileGuidVar = "";
	if(typeof $.cookie!='undefined') {
		profileGuidVar = $.cookie("profileGuid");
		if(window.console)console.log("profileGuid cookie: " + profileGuidVar);
		if(window.console)console.log(profileGuidVar);
	} else {
		$.getScript('//cdcssl.ibsrv.net/cdcx/js/jquery-cookies-plugin.js', function() {
			profileGuidVar = $.cookie("profileGuid");
			if(window.console)console.log("profileGuid cookie: " + profileGuidVar);
			if(window.console)console.log(profileGuidVar);
		});
	}



/*
 * Initialize top floating bar and its contents
 */
function initFloatingBar() {
/* If template has remnants of old top header bar, remove. */
if($('#header_row1')!=null && $('#header_row1')!='undefined') {
	$('#header_row1').remove();
}

if(profileGuidVar=="") {
	if(typeof $.cookie!='undefined') {
		profileGuidVar = $.cookie("profileGuid");
		if(window.console)console.log("profileGuid cookie: " + profileGuidVar);
		if(window.console)console.log(profileGuidVar);
	} else {
		$.getScript('//cdcssl.ibsrv.net/cdcx/js/jquery-cookies-plugin.js', function() {
			profileGuidVar = $.cookie("profileGuid");
			if(window.console)console.log("profileGuid cookie: " + profileGuidVar);
			if(window.console)console.log(profileGuidVar);
		});
	}
}


/* 
 * Render stylesheet/CSS for top floating bar (w/ CDC Social styles)
 */
$('body').prepend('<style>' +
'* html div.top-line {' +
'   width: expression( document.body.clientWidth < 25 ? "24px" : "auto" ); /* sets max-width for IE */' +
'}' +
'.top-line{' + 
'	font: 12px Arial, Helvetica, sans-serif;' +
'	position:fixed;' + 
'	top:0;' + 
'	left:0;' + 
'	width:100%;' + 
'	min-width: 600px;' +
'	min-height:27px;' + 
'	height:27px;' +
'	background:#339;' + 
'	z-index: 99998;' + 
'}' + 
'* html div#header_row1 {' +
'   width: expression( document.body.clientWidth > 989 ? "990px" : "auto" ); /* sets max-width for IE */' +
'}' +
'.top-line #header_row1{' + 
'	width: 100%;' +
'	max-width:990px;' + 
'	margin:0 auto;' + 
'	overflow:visible !important;' + 
'}' + 
'.top-line .rowProps{float:right;}' + 
'.top-line .colProps{' + 
'	float:left;' + 
'	padding:0px 5px 0 9px;' + 
'}' + 
'.top-line #CDCSocial{' +
'	float: right;' + 
'}' +
'.top-line .topNav{' + 
'	height:26px;' + 
'	/*overflow:hidden;*/' + 
'	color:#fff;' + 
'	margin:0;' + 
'}' + 
'.top-line .clear{ width:100%;}' + 
'.top-line .clear:after{' + 
'	content:"";' + 
'	clear:both;' + 
'	display:block;' + 
'}' + 
'.top-line .linkList{' + 
'	padding: 0px;' + 
'	font-weight:bold;' + 
'}' + 
'.top-line .linkList ul{' + 
'	margin:0;' + 
'	padding:0;' + 
'	list-style:none;' + 
'}' + 
'.top-line .linkList ul li{' + 
'	float:left;' + 
'	padding: 4px 28px 4px 5px;' + 
'	position: relative;' +
'	line-height: 22px;' +
'}' + 
'#CDCSocial .linkList ul li{' + 
'	padding: 4px 5px 4px 10px;' +
'/*	padding: 4px 10px 4px 5px;*/' + 
'}' + 
'/*#CDCSocial .linkList ul li.tab:not(.lastLink) {' +
'	border-right: 1px solid gray;' + 
'}*/' +
'#CDCSocial .linkList ul li.divider {' +
'	border-right: 1px solid #CCC;' +
'	height: 10px;' +
'	width: 1px;' +
'	margin-top: 5px;' +
'	margin-right: 1px;' +
'	padding-left: 0px;' +
'	padding-right: 0px;' +
'}' +
'.top-line .linkList ul li.lastLink{' + 
'	padding-right:0px;' + 
'}' + 
'.top-line .linkList ul li a {' + 
'	color:#fff;' +
'}' +
'.top-line .linkList ul li a:link, .top-line .linkList ul li a:visited, .top-line .linkList ul li a:active {' + 
'	color:#fff;' + 
'	/*float:left;*/' + 
'	text-decoration:none;' +
'	/*margin-top: 1px;*/' +
'}' + 
'.top-line .linkList ul li a:hover{' + 
'	text-decoration:underline;' +
'}' + 
'.top-line .linkList ul li a.phoneLink:hover{' + 
'	text-decoration:none;' +
'}' + 
'.top-line .linkList ul li a img:hover{' + 
'	text-decoration:none;' +
'}' + 
'.top-line .phoneLink{' + 
'	background:url(//cdcssl.ibsrv.net/cdcx/images/topbar-icons-vert.png) no-repeat;' + 
'	padding:1px 0 1px 18px;' + 
'}' + 
'.top-line .liveLink{' + 
'	background:url(//cdcssl.ibsrv.net/cdcx/images/topbar-icons-vert.png) no-repeat 0 -16px;' + 
'	padding:0px 0 1px 21px;' + 
'	height: 12px;' +
'}' + 
'.top-line .helpLink{' + 
'	background:url(//cdcssl.ibsrv.net/cdcx/images/topbar-icons-vert.png) no-repeat 0 -31px;' + 
'	padding:1px 0 1px 18px;' + 
'	margin:0 0 0 -3px;' + 
'}' +
'.top-line .carNum {' +
'	display: inline;' +
'	margin: 0px 5px 0px 5px;' +
'	padding: 4px 4px 3px 4px;' +
'	line-height: 16px;' +
'	background: #F60;' +
'	border-radius: 3px;' +
'	-moz-border-radius: 3px;' +
'	color: white;' +
'	font-size: 10px;' +
'}' +
'.top-line .downArrow{' +
'	font-size:8px;' +
'	color:#E7E7E7;' +
'	line-height: 22px;' +
'}' +
'#CDCSocial .linkList a, #CDCSocial .linkList .tab {' +
'	cursor: pointer;' +
'	/*line-height: 22px;*/' +
'}' +
'#CDCSocial .linkList .welcomeUserInfo:hover a, #CDCSocial .linkList .myVehiclesTab:hover a {' +
'	*color: #339;' +
'}' +
'#CDCSocial .linkList .tab:not(.welcomeUserInfo) a, #CDCSocial .linkList .welcomeText a {' +
'	padding-top: 3px;' +
'}' +
'#CDCSocial .linkList .welcomeText {' +
'	padding-right: 2px;'+
'	line-height: 22px;' +
'}' +
'#CDCSocial .linkList .welcomeText a {' +
'	cursor: default;'+
'}' +
'#CDCSocial .linkList .welcomeText a:hover, #CDCSocial .linkList .recentVehiclesTab a.recentlyViewed:hover {' +
'	text-decoration: none;' +
'	cursor: default;' +
'}' +
'.top-line ul.dropdown li.hover {' +
'	background: #FFF;' +
'	color: #339;' +
'	border-radius: 5px 5px 0px 0px;' +
'	-moz-border-radius: 5px 5px 0px 0px;' +
'}' +
'.top-line ul.dropdown li.hover a {' +
'	color: #339;' +
'}' +
'.top-line .welcomeUserInfo span.userIconThumb {' +
'	float: left;' +
'	/*margin-top: 5px;*/' +
'}' +
'.top-line .welcomeUserInfo span.userIconThumb a {' +
'	padding-right: 0px;' +
'	text-decoration: none;' +
'}' +
'.top-line .welcomeUserInfo span.userIconThumb img {' +
'	width: 19px;' + 
'	height: 19px;' + 
'	vertical-align: middle;' +
'	border: 0px;' +
'	/*margin-top: -5px;*/' +
'	padding-bottom: 6px;' +
'}' +
'.top-line .welcomeUserInfo a {' +
'	padding-right: 4px;' + 
'}' +
'.top-line .welcomeUserInfo span.userName {' +
'	padding-left: 5px;' +
'	line-height: 21px;' +
'}' +
'.top-line .floatingUserInfo, .top-line .myVehicles, .top-line .recentVehicles {' +
'	display: none;' +
'	position: absolute;' +
'	top: 100%;' +
'	width: 240px;' +
'	padding: 10px;' +
'	background: white;' +
'	box-shadow: 0px 5px 7px -4px black;' +
'	border-radius: 5px 0px 5px 5px;' +
'	-moz-border-radius: 5px 0px 5px 5px;' +
'	line-height: normal;' +
'	right: 0px;' +
'	cursor: default;' +
'	margin-top: -5px;' +
'}' +
'.top-line .floatingUserInfo {' +
'	width: 150px;' +
'}' +
'.top-line .floatingUserInfo h1, .top-line .myVehicles h1, .top-line .recentVehicles h1 {' +
'	margin: 0px;' +
'	padding-bottom: 5px;' +
'	font-size: 12px;' +
'	font-weight: bold;' +
'	border-bottom: 1px solid #E7E7E7;' +
'	color: #333;'+
'}' +
'.top-line .floatingUserInfo ul, .top-line .myVehicles ul, .top-line .recentVehicles ul {' +
'	position: relative;' +
'	list-style: none;' +
'	margin: 0;' +
'	padding: 0;' +
'	line-height: normal;' +
'}' +
'.top-line #CDCSocial .linkList .floatingUserInfo ul li, .top-line #CDCSocial .linkList .myVehicles ul li, .top-line #CDCSocial .linkList .recentVehicles ul li {' +
'	position: relative;' +
'	/*display: block;*/' +
'	width: 100%;' +
'	margin: 10px 0px 0px 0px;' +
'	padding: 2px 0px 2px 0px;' +
'	font-size: 12px;' +
'	color: #369;' +
'	line-height: normal;' +
'	font-weight: bold;' +
'	border-image: initial;' +
'}' +
'.top-line .floatingUserInfo ul li span, .top-line .myVehicles ul li span, .top-line .recentVehicles ul li span {' +
'	position: absolute;' +
'	top: 2px;' +
'	left: 0px;' +
'	background: #F60;' +
'	color: white;' +
'	font-size: 10px;' +
'	padding: 2px;' +
'}' +
'.top-line #CDCSocial .linkList .myVehicles ul li.noVehicles, .top-line #CDCSocial .linkList .recentVehicles ul li.noVehicles {' +
'	color: #666666;' +
'	font-size: 11px;' +
'	font-weight: normal;' +
'}' +
'.top-line .myVehicles ul li span.used, .top-line .recentVehicles ul li span.used {' +
'	background: #1E2E52;' +
'}' +
'.top-line .linkList ul li .recentVehicles .launchSignIn {' + 
'	cursor: pointer;' +
'	float: none;' +
'}' +
'.top-line .floatingUserInfo ul li img, .top-line .myVehicles ul li img, .top-line .recentVehicles ul li img {' +
'	float: left;' +
'	margin-right: 5px;' +
'	width: 60px;' +
'	border: 1px solid #E7E7E7;' +
'}' +
'.top-line .floatingUserInfo ul li small, .top-line .myVehicles ul li small, .top-line .recentVehicles ul li small {' +
'	display: inline;' +
'	margin: 0px;' +
'	padding: 0px;' +
'	font-size: 10px;' +
'	font-weight: normal;' +
'}' +
'.top-line .floatingUserInfo .floatingUserInfoIcon {' +
'	float: left;' +
'	width: 40px;' +
'}' +
'.top-line .floatingUserInfo .floatingUserInfoIcon img {' +
'	width: 36px;' +
'	height: 36px;' +
'}' +
'.top-line .floatingUserInfo .floatingUserInfoLinks {' +
'	float: left;' +
'	width: 100px;' +
'	margin-left: 5px;' +
'}' +
'.top-line .floatingUserInfo .floatingUserInfoLinks a {' +
'	font-weight: normal;' +
'	font-size: 12px;' +
'}' +
'.top-line #CDCSocial .linkList .floatingUserInfo .floatingUserInfoLinks ul li {' +
'	margin-top: 0px;' +
'	padding-top: 0px;' +
'}' +
'.top-line .recentVehicles .signUpMsg {' +
'	position: relative;' +
'	float: left;' +
'	margin-top: 20px;' +
'	padding-top: 10px;' +
'	border-top: 1px solid silver;' +
'	color: #333;' +
'	font-weight: normal;' +
'}' +
'.top-line .recentVehicles .signUpMsg a {' +
'	color: #339;' +
'	cursor: pointer;' +
'}' +
'#CDCSocial .linkList .signIn {' +
'	line-height: 22px;' +
'	width: 100px;' +
'}' +
'#CDCSocial .linkList .signIn span{' +
'	float: left;' +
'}' +
'#CDCSocial .linkList .signIn #HeaderLoginConnections {' +
'	float: right;' +
'	display: inline;' +
'	padding-left: 5px;' +
'}' +
'#CDCSocial .linkList ul li .myVehicles .share {' + 
'	font-size:12px;' +
'	background:#F5F5F5;' +
'	text-align:center;' + 
'	font-weight:bold;' +
'	width: 93%;' +
'	margin-top: 0px;' +
'	padding: 4px 6px 4px 11px;' +
'}' +
'#CDCSocial .linkList ul li .myVehicles .viewAll {' + 
'	border: 1px solid #E7E7E7;' + 
'	background:#F5F5F5;' +
'	text-align:center;' +
'	font-weight:bold;' +
'	width: 93%;' +
'	font-size: 12px;' +
'	padding: 4px 5px 4px 10px;' +
'}' +
'#CDCSocial .linkList ul li .myVehicles .viewAll a{' +
'	text-align: center;' +
'	text-decoration: none;' + 
'	float: none;' +
'	color: #339;' +
'}' +
'#CDCSocial .linkList ul li .myVehicles .share {' + 
'	cursor: pointer;' +
'	color: #339;' +
'}' +
'.top-line .hide {' +
'	display: none;' +
'}' +
'</style>');


	/*
	 * Render CarsDirect info links in floating bar
	 */
	 var prepareHeaderHtml = '<div class="top-line">' + 
'		<div id="header_row1" class="clear topNav">' + 
'			<div class="colProps" id="CDCHelp">' + 
'				<div class="linkList">' + 
'					<ul>' + 
'						<li><a class="phoneLink">1-888-227-7347</a></li>' + 
'						<li><a class="liveLink" href=\"/Advisor/AdvisorMainFrame.html\" onclick=\"window.open(\'/Advisor/AdvisorMainFrame.html\',\'popup\',\'width=375,height=450,scrollbars=yes,resizable=yes,toolbar=no,status=no,left=50,top=0\');  return false;\">Live Chat</a></li>' + 
'						<li class="lastLink"><a class="helpLink" href=\"/help/buying\" target=\"_blank\">Help</a></li>' + 
'					</ul>' + 
'				</div>' + 
'			</div>' + 
'		</div>';
	$("body").prepend(prepareHeaderHtml);

	/* Initialize CDC Social portion of floating bar */
	initCdcSocial();

} //end initFloatingBar

function initCdcSocial() {
	/*
	 * Check if user is logged in via Gigya
	 */
	if(typeof gigya != 'undefined') {
		gigya.services.socialize.getUserInfo({callback:getUserCdcSocial});
	} else {
		$.getScript(gigyaJS, function() {
			gigya.services.socialize.getUserInfo({callback:getUserCdcSocial});
		});
	}

	function getUserCdcSocial(response) {
		if(window.console)console.log(response);
		if(window.console)console.log(response.errorCode);
		if(response.errorCode==0 && response.user.UID!="") { //user is logged in
			var getUserProfileParams = {
				'signature':response.UIDSignature,
				'timestamp':response.signatureTimestamp,
				'socialGuid':response.UID
			};
			if(window.console)console.log(getUserProfileParams);
			if(typeof IBCDAjax!='undefined') {
				IBCDAjax.getUrl(autoServicesJsUrl+'/social/v1/getUserProfile', prepareCdcSocialHeader, getUserProfileParams);
			} else {
				$.getScript('//cdcssl.ibsrv.net/js/ibcdajax.js', function() {
					IBCDAjax.getUrl(autoServicesJsUrl+'/social/v1/getUserProfile', prepareCdcSocialHeader, getUserProfileParams);
				});
			}
		} else {
			prepareCdcSocialHeader();
		}
	}
	
	
	/*
	 * Prepare header state; determined by whether user is logged in or not
	 */
	window.isUserLoggedIn = false; 
	var socialGuidVar = "";
	function prepareCdcSocialHeader(response) {
		if(window.console)console.log(response);

		/*
		* Prepare CDC Social HTML for floating bar header
		*/
		var prepareCdcSocialHeaderHtml = '';
		prepareCdcSocialHeaderHtml = prepareCdcSocialHeaderHtml + 
'		<div class="colProps" id="CDCSocial">' + 
'				<div class="linkList">' + 
'					<ul class="dropdown">';
		if(response!='undefined' && response!=null && response.success==true) {
			socialGuidVar = response.socialGuid;
			profileGuidVar = response.profileGuid;
			
			if(profileGuidVar !== $.cookie('profileGuid')) {
				$.cookie('profileGuid', profileGuidVar, {expires: 30, path: '/'});
				$.cookie('socialGuid', socialGuidVar, {expires: 30, path: '/'});
				window.location.reload();

				//TODO: REMOVE THIS ALERT BEFORE LAUNCH.
				//alert("ProfileGuid in cookies ("+$.cookie('profileGuid')+") does not match profileGuid associated with this gigya account ("+profileGuidVar+")");
				if(window.console)console.log("ProfileGuid in cookies ("+$.cookie('profileGuid')+") does not match profileGuid associated with this gigya account ("+profileGuidVar+")");
				//END TODO: REMOVE THIS ALERT BEFORE LAUNCH
			}
			
			if(window.console)console.log("response success is true! - user found");
			isUserLoggedIn = true;
			var userIcon = response.thumbnailURL;
			var photoURL = response.photoURL;
			if(window.console)console.log("userIcon: " + userIcon + ", photoURL: " + photoURL);
			if((userIcon=="" || userIcon==null) && photoURL!=null && photoURL!="") { //if userIcon from thumbnail does not exist, use photoURL
				userIcon = response.photoURL;
			} 
			if(userIcon=="" || userIcon==null) { //If userIcon still does not exist.
				if(window.console)console.log("No user icon found; use default");
				userIcon = "//cdcssl.ibsrv.net/cdcx/images/default-avatar.jpg";
			}
			prepareCdcSocialHeaderHtml = prepareCdcSocialHeaderHtml +
'						<li class="signIn tab hide"><span><a class="launchSignIn">Sign In</a></span>' +
'							<div id="HeaderLoginConnections"></div>' +
'						</li>' + 
'						<li class="welcomeText"><a>Welcome, </a></li>' +
'						<li class="welcomeUserInfo tab">' +
'						<span class="userIconThumb"><a href="/user/' + socialGuidVar + '/my-vehicles"><img src="' + userIcon + '"/></a></span>' +
'						<a href="/user/' + socialGuidVar + '/my-vehicles"><span class="userName">' + response.firstName + '</span></a>' +
'						<span class="downArrow">&#x25BC;</span>' +
'							<div class="floatingUserInfo sub_menu">' +
'								<div class="floatingUserInfoIcon">' +
'									<img src="' + userIcon + '"/>' +
'								</div>' +
'							<div class="floatingUserInfoLinks">' +
'								<ul>' +
'									<li>' +
'										<a href="/user/' + socialGuidVar + '/saved-searches">Saved Searches</a>' +
'									</li>' +
'									<li>' +
'										<a href="/user/' + socialGuidVar + '">Profile</a>' +
'									</li>' +
'									<li>' +
'										<a class="logout">Log Out</a>' +
'									</li>' +
'								</ul>' +
'							</div>' +
'							</div>' +
'						</li>' + 
'						<li class="divider"></li>' +
'						<li class="myVehiclesTab tab"><a href="/user/' + socialGuidVar + '/my-vehicles">My Vehicles</a><span class="showNum"></span><span class="downArrow">&#x25BC;</span>' +
'							<div class="myVehicles sub_menu">' +
'								<h1>Recently Saved</h1>' +
'								<ul>' +
'								<li class="share hide">' +
'									Share With Your Friends' +
'								</li>' +
'							<li class="savedVehicles"></li>' +
'							<li class="viewAll hide">' +
'								<a href="/user/' + socialGuidVar + '/my-vehicles">View All &raquo;</a>' +
'							</li>' +
'								</ul>' +
'							</div>' +
'						</li>' +
'						<li class="divider"></li>';
		} else {
			if(window.console)console.log("response success is false! - user not found");
			prepareCdcSocialHeaderHtml = prepareCdcSocialHeaderHtml + 
'						<li class="signIn tab"><span><a class="launchSignIn">Sign In</a></span>' +
'							<div id="HeaderLoginConnections"></div>' +
'						</li>' + 
'						<li class="divider"></li>' +
'						<li class="welcomeUserInfo tab hide">' +
'						</li>' + 
'						<li class="myVehiclesTab tab hide">' +
'						</li>';
						//IE7 CSS FIX
						$('body').prepend('<style>' +
						'.top-line #CDCSocial .linkList {' +
						'   *width:260px;' +
						'}'+
						'#CDCSocial .linkList .dropdown .signIn #HeaderLoginConnections {' +
						'   *float: left;' +
						'}' +
						'</style>');
						//END IE7 CSS FIX
		}
		
		//Prepare Recently Viewed Vehicles HTML
		var oldProfileGuid = "";
		/*
		if($('.recentVehiclesTab')!=null && $('.recentVehiclesTab')!=undefined && $('.recentVehiclesTab')!="") {
			oldProfileGuid = $('.recentVehiclesTab').val();
		}
		*/
		var recentlyViewedVehiclesHtml = '';
			if(window.console)console.log("profileGuid to get recent vehicles: " + profileGuidVar);
			if(window.console)console.log("initialProfileGuid: " + $("input[name='recentlyViewedInitialProfileGuid']").val());
			
			//If user has just logged in, check if user had any previous recently viewed vehicles
			if($("input[name='recentlyViewedInitialProfileGuid']") && 
				$("input[name='recentlyViewedInitialProfileGuid']").val()!="" && 
				$("input[name='recentlyViewedInitialProfileGuid']").val()!=null &&
				$("input[name='recentlyViewedInitialProfileGuid']").val()!=profileGuidVar &&
				socialGuidVar!="" &&
				profileGuidVar!="") {
				
				//transfer recently viewed vehicles to logged in user's profileGuid
				oldProfileGuid = $("input[name='recentlyViewedInitialProfileGuid']").val();
						$.ajax(
								{
								url: autoServicesJsUrl+'/social/v1/saveRecentVehicles',
								data: {
									'profileGuid' : profileGuidVar,
									'profileGuidOld': oldProfileGuid,
									'socialGuid': socialGuidVar
								},
								beforeSend: function () {
									if(window.console)console.log("Transferring recently viewed vehicles to logged in user's profileGuid.");
								},
								type: "GET",
								success: function(successResponse) {
									if(window.console)console.log("Response from transferring recently viewed vehicles' profileGuid");
									if(window.console)console.log(successResponse);
								},
								dataType: "jsonp",
								complete: function (successResponse) {
									retrieveRecentlyViewedVehicles(profileGuidVar, socialGuidVar)
								}
							}
						);				
				
				} else {
				//No transfer of vehicles necessary
					retrieveRecentlyViewedVehicles(profileGuidVar, socialGuidVar);
				}
		

	/*
	 * Retrieve a user's recently viewed vehicles
	 */
	function retrieveRecentlyViewedVehicles(profileGuid, socialGuid) {
		$.ajax(
			{
				url: autoServicesJsUrl+'/social/v1/getRecentVehicles',
				data: {
					'profileGuid' : profileGuid
				},
				beforeSend: function () {
					if(window.console)console.log("About to retrieve recently viewed vehicles.");
				},
				type: "GET",
				success: function(successResponse) {
					recentlyViewedVehiclesHtml = renderRecentlyViewedVehicles(successResponse.socialRecentVehicle, successResponse.profileGuid, socialGuid, "");
				},
				dataType: "jsonp",
				complete: function () {
					prepareCdcSocialHeaderHtml = prepareCdcSocialHeaderHtml + recentlyViewedVehiclesHtml;
					prepareCdcSocialHeaderHtml = prepareCdcSocialHeaderHtml +
						'</ul>' + 
						'</div>' + 
						'</div>'; //end prepareCdcSocialHeaderHtml var
					renderCdcSocialHtml(prepareCdcSocialHeaderHtml);
				}
			}
		);
	} //end retrieveRecentlyViewedVehicles
		
		
	/*
	 * Rendering a user's recently viewed vehicles
	 */
	function renderRecentlyViewedVehicles(vehicles, profileGuid, socialGuid, oldProfileGuid) {
		if(window.console)console.log("recentlyViewedVehicles:");
		if(window.console)console.log(vehicles);
		var recentlyViewedVehiclesHtml = "";
		var numVehicles = 0;
		if(vehicles!=null && vehicles!=undefined) {
			if(vehicles.length > 5) { 
				numVehicles = 5; 
			} else {
				numVehicles = vehicles.length;
			}
		}
		recentlyViewedVehiclesHtml = recentlyViewedVehiclesHtml + 
						'<li class="lastLink recentVehiclesTab tab">' +
							'<a class="recentlyViewed">Recently Viewed</a><span class="carNum showNum">' + numVehicles + '</span><span class="downArrow">&#x25BC;</span>' + 
							'<div class="recentVehicles sub_menu">' +
								'<h1>Recently Viewed</h1>' +
								'<ul>';
		if(numVehicles>0) {
			var newOrUsedStr;
			var newOrUsedClass;
			var vehicle;
			var href = "";
			for(var i = 0; i < 5 && i < vehicles.length; i++) {
				href = "";
				vehicle = vehicles[i];
				
					if(vehicle.newOrUsed=="U" || vehicle.newOrUsed=="u") {
						newOrUsedStr = "Used";
						newOrUsedClass = "used";
					} else {
						newOrUsedStr = "New";
						newOrUsedClass = "new";						
					}

					if(vehicle.socialSavedVehiclePageId==3) { //used listing
						href = "/used_cars/vehicle-detail/ul" + vehicle.usedListingId + "/" + vehicle.make.toLowerCase().replace(" ","-") + "/" + vehicle.model.toLowerCase().replace(" ","-");
					} else {
						if(vehicle.socialSavedVehiclePageId==2) { //research page
							if(vehicle.year == null || vehicle.year == "") {
									if(vehicle.newOrUsed=="U" || vehicle.newOrUsed=="u") {
										vehicle.linkToResearchYear = true;
									} else {
										vehicle.linkToResearchYear = false;
									}
								}
								//if(vehicle.linkToResearchYear){
									href += "/" + vehicle.year;
								//}
								href += "/" + vehicle.make.toLowerCase().replace(" ","-");
								href += "/" + vehicle.model.toLowerCase().replace(" ","-");
								if (vehicle.acode!=null && vehicle.acode!=""){
									href += "?acode=" + vehicle.acode;
								}
						} else if(vehicle.socialSavedVehiclePageId==1) { //options page
							var zipcode;
							if(typeof $.cookie!='undefined') {
								zipcode = $.cookie("zipcode");
							} else {
								$.getScript('//cdcssl.ibsrv.net/cdcx/js/jquery-cookies-plugin.js', function() {
									zipcode = $.cookie("zipcode");
								});
							}
							if(window.console)console.log("zipcode: " + zipcode);
							if(zipcode==undefined || zipcode==null) zipcode = '90245';
					        if (vehicle.acode!=null && vehicle.acode!="") {
								href = "/build/options?zipcode="+zipcode+"&acode="+vehicle.acode+"&restore=false";
							}		
						} else {
							href = "/";
						}
					}				
				
				if(window.console)console.log("href: " + href);
				recentlyViewedVehiclesHtml = recentlyViewedVehiclesHtml + 
											'<li>' +
											'<span class="' + newOrUsedClass + '">' + newOrUsedStr + '</span>' +
												'<a href="' + href + '">' + 								
												'<img src="' + vehicle.thumbnail + '" alt="' + newOrUsedStr + '" onerror="this.src=\'//cdcssl.ibsrv.net/usedcars/images/no_photo_available.png\';">' +
												vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model + '<br>' +
												'<small>' + vehicle.trim + '</small>' +
												'</a>' +													
											'</li>';
			}
		} else { //no recently viewed vehicles
			recentlyViewedVehiclesHtml = recentlyViewedVehiclesHtml + 
				'<li class="noVehicles">You have no recently viewed vehicles.</li>';
		}
			
		recentlyViewedVehiclesHtml = recentlyViewedVehiclesHtml + 
				'</ul>';

		var recentlyViewedInitialProfileGuid = "";
		if(socialGuid=="" || socialGuid==null || socialGuid==undefined) {
			recentlyViewedVehiclesHtml = recentlyViewedVehiclesHtml + 			
								'<div class="signUpMsg">' +
								'<a class="launchSignIn"><strong>Sign up with CarsDirect</strong></a> to share your vehicles with your friends.' +
								'</div>';
			recentlyViewedInitialProfileGuid = profileGuid;
		}
			
		recentlyViewedVehiclesHtml = recentlyViewedVehiclesHtml +
						'<input type="hidden" name="recentlyViewedInitialProfileGuid" value="' + recentlyViewedInitialProfileGuid +  '"/>' +		
						'</div>' +
					'</li>';			
			
		return recentlyViewedVehiclesHtml;
	} //end renderRecentlyViewedVehicles

	
		/*
	 * Render CDC Social HTML
	 */
	function renderCdcSocialHtml(prepareCdcSocialHeaderHtml) { 
	//check if CDC Social header already there; replace if yes, append to header if no.
	if($("#CDCSocial")!=null && $("#CDCSocial")!='undefined' && $("#CDCSocial").length>0) {
		if(window.console)console.log("#CDCSocial exists; replace");
		$("#CDCSocial").replaceWith(prepareCdcSocialHeaderHtml);
	} else {
		if(window.console)console.log("#CDCSocial does not exist; append");
		$("#header_row1").append(prepareCdcSocialHeaderHtml);	
	}
	
	
	//If user is not logged in, load Gigya login plugin
	if(isUserLoggedIn==false) {
		if(window.console)console.log("User is not logged in");
		loadGigyaLoginUI();
	} else {
	//If user is logged in, load user's saved vehicles in My Vehicles tab
		var getSavedVehiclesParams = {
			'socialGuid':response.socialGuid,
			'profileGuid':response.profileGuid
		};
		if(window.console)console.log(getSavedVehiclesParams);
		if(typeof IBCDAjax!='undefined') {
			IBCDAjax.getUrl(autoServicesJsUrl+'/social/v1/getSavedVehicles', renderSavedVehicles, getSavedVehiclesParams);
		} else {
			$.getScript('//cdcssl.ibsrv.net/js/ibcdajax.js', function() {
				IBCDAjax.getUrl(autoServicesJsUrl+'/social/v1/getSavedVehicles', renderSavedVehicles, getSavedVehiclesParams);
			});
		}
	}


	
	/*
	 * Retrieving a user's saved vehicles
	 */
	window.photoCount = 0;
	function renderSavedVehicles(response) {
		var prepareMyVehiclesHtml = "";
		var savedVehiclesPhotos = [];
		var carNum = 0;
		if(window.console)console.log(response);
		if(response.success) {
			carNum = response.savedVehicles.length;
		}
		if(carNum > 0) {
				var newOrUsedClass = "";
				var newOrUsedStr = "";
				var photoServiceUrl =  "";
				var href = "";
				var usedPhotoUrl = "";
				
				for(var vehicle = 0; vehicle < 5 && vehicle < response.savedVehicles.length; vehicle++) {
					href = "";
					if(response.savedVehicles[vehicle].socialSavedVehiclePageId==3) { //used listing
						var usedListingId = String(response.savedVehicles[vehicle].usedListingId);
						if(window.console)console.log("usedListingId: " + usedListingId);
						newOrUsedStr = "Used";
						newOrUsedClass = "used";
						photoServiceUrl = autoServicesJsUrl+"/social/v1/getULMainPhotoAndPhotoCount";
						usedPhotoUrl = "//cdcssl.ibsrv.net/ucimages/"+usedListingId.substring(0,3)+"/"+usedListingId.substring(3,6)+"/"+usedListingId.substring(6)+"/thumbnail.jpg";
						href = "/used_cars/vehicle-detail/ul" + usedListingId + "/" + response.savedVehicles[vehicle].make.toLowerCase().replace(" ","-") + "/" + response.savedVehicles[vehicle].model.toLowerCase().replace(" ","-");
					} else {
						photoServiceUrl = autoServicesJsUrl+"/newcar/v1/getModelPhotos";
						if(response.savedVehicles[vehicle].socialSavedVehiclePageId==2) { //research page
							if(response.savedVehicles[vehicle].linkToResearchYear == null) {
									if(response.savedVehicles[vehicle].newOrUsed=="U") {
										response.savedVehicles[vehicle].linkToResearchYear = true;
									} else {
										response.savedVehicles[vehicle].linkToResearchYear = false;
									}
								}
								if(response.savedVehicles[vehicle].linkToResearchYear){
									href += "/" + response.savedVehicles[vehicle].year;
								}
								href += "/" + response.savedVehicles[vehicle].make.toLowerCase().replace(" ","-");
								href += "/" + response.savedVehicles[vehicle].model.toLowerCase().replace(" ","-");
								if (response.savedVehicles[vehicle].acode!=null && response.savedVehicles[vehicle].acode!=""){
									href += "?acode=" + response.savedVehicles[vehicle].acode;
								}
						} else if(response.savedVehicles[vehicle].socialSavedVehiclePageId==1) { //options page
							var zipcode;
							if(typeof $.cookie!='undefined') {
								zipcode = $.cookie("zipcode");
							} else {
								$.getScript('//cdcssl.ibsrv.net/cdcx/js/jquery-cookies-plugin.js', function() {
									zipcode = $.cookie("zipcode");
								});
							}
							if(window.console)console.log("zipcode: " + zipcode);
							if(zipcode==undefined || zipcode==null) zipcode = '90245';
					        if (response.savedVehicles[vehicle].encodedConfigStateString!=null && response.savedVehicles[vehicle].encodedConfigStateString!=""){
								href = "/build/options?zipcode="+zipcode+"&acode="+response.savedVehicles[vehicle].acode+"&restore=false&encodedConfigStateStr="+response.savedVehicles[vehicle].encodedConfigStateString;
							} else if (response.savedVehicles[vehicle].acode!=null && response.savedVehicles[vehicle].acode!="") {
								href = "/build/options?zipcode="+zipcode+"&acode="+response.savedVehicles[vehicle].acode+"&restore=false";
							}		
						}
					}
					
					if(response.savedVehicles[vehicle].newOrUsed=="U") {
						newOrUsedStr = "Used";
						newOrUsedClass = "used";
					} else {
						newOrUsedStr = "New";
						newOrUsedClass = "new";
					}
					
					if(response.savedVehicles[vehicle].socialSavedVehiclePageId==3) {
						savedVehiclesPhotos[vehicle] = usedPhotoUrl;			
						photoCount++;
					} else {	
						(function(vehicle) {
							$.ajax(
								{
								url: photoServiceUrl,
								data: {
									'makeNameOrCode' : response.savedVehicles[vehicle].make,
									'modelNameOrCode' : response.savedVehicles[vehicle].model,
									'listingId' : response.savedVehicles[vehicle].usedListingId
								},
								beforeSend: function () {
									if(window.console)console.log("entered Ajax");
								},
								type: "GET",
								success: function(successResponse) {
									if(window.console)console.log("successResponse of " + response.savedVehicles[vehicle].socialSavedVehiclePageId + " " + response.savedVehicles[vehicle].make + " " + response.savedVehicles[vehicle].model + " " + response.savedVehicles[vehicle].year);
									if(window.console)console.log(successResponse);
									savedVehiclesPhotos[vehicle] = getPhotos(successResponse, response.savedVehicles[vehicle].socialSavedVehiclePageId, response.savedVehicles[vehicle].make, response.savedVehicles[vehicle].model, response.savedVehicles[vehicle].year)['mainPhoto'];
									if(photoCount == 5 || photoCount == response.savedVehicles.length) { //once we've retrieved 5 photos, populate vehicle photos in DOM.
										populateVehiclePhotos($(".myVehicles .vehicle"), savedVehiclesPhotos);
									}
								},
								dataType: "jsonp"
							}
						);
						})(vehicle);
					}	
									

					prepareMyVehiclesHtml = prepareMyVehiclesHtml + 
					'<li class="vehicle">' +
						'<span class="' + newOrUsedClass + '">' + newOrUsedStr + '</span>' +
						'<a href="' + href + '">' +
						'<img src="//cdcssl.ibsrv.net/usedcars/images/no_photo_available.png" alt="' + newOrUsedStr + '" onerror="this.src=\'//cdcssl.ibsrv.net/usedcars/images/no_photo_available.png\';">' +
						response.savedVehicles[vehicle].year + ' ' + response.savedVehicles[vehicle].make + ' ' + response.savedVehicles[vehicle].model + '<br>' +
						'<small>' + response.savedVehicles[vehicle].trimDisplayName + '</small>' +
						'</a>' + 
					'</li>';
					
					}
				
					$(".myVehiclesTab .viewAll").removeClass("hide");
					$(".myVehiclesTab .share").removeClass("hide");
			} else {
				//TODO: if no saved vehicles - do... something.
				prepareMyVehiclesHtml = prepareMyVehiclesHtml + 
					'<li class="noVehicles">' +
						'You have no saved vehicles.' +
					'</li>';
			}
			$(".myVehiclesTab span.showNum").addClass("carNum");
			$(".myVehiclesTab span.carNum").text(carNum);
			$(".myVehicles .savedVehicles").replaceWith(prepareMyVehiclesHtml);
		} //end renderSavedVehicleResponse

	
	
	
	//The following code snippets need to be included with the insertion of prepareHeaderHtml into the DOM
	//otherwise the JS will not work.

	/*
	* Expand and contract "My Vehicles" and "Recently Viewed" dropdowns on-hover
	*/
	$(".dropdown li.tab:not(.signIn)").hover(function(){
		$("div",this).show();
		$(this).addClass("hover");
	}, function(){  
		$("div",this).hide();
		$(this).removeClass("hover");
	});


	/*
	* Launch "Sign In/Registration" lightbox
	*/
	$(".launchSignIn").click(function () {
		if($.colorbox=='undefined' || $.colorbox==null) {
			loadColorboxJs();
		}
		$.colorbox({transition:'none', innerWidth: "660px", innerHeight: "340px", iframe:true, opacity:0.7, href:"/user/login?currentPage=header&parentUrl="+encodeURIComponent(top.location.href)+"&disable_request_ssl="+disableRequestSsl, hideLoadingOverlay:true});	
	});
	
	
	/*
	 * Launch "Share" lightbox
	 */
	$(".share").click(function () {
		var addShareLink = "/user/gigya-share-ui?socialGuid="+socialGuidVar + "&parentUrl="+encodeURIComponent(top.location.href)+"&disable_request_ssl="+disableRequestSsl; //we use global var socialGuidVar
		if($.colorbox=='undefined' || $.colorbox==null) {
			loadColorboxJs();
		}
		$.colorbox({transition:'none', innerWidth: "516px", innerHeight: "320px", iframe:true, opacity:0.7, href:addShareLink, hideLoadingOverlay:true});
	});

	
	/*
	 * User logout action; calls Gigya logout method & our userLogout fn
	 */
	$(".logout").click(function () {
		if(typeof gigya != 'undefined') {
			gigya.services.socialize.logout({callback:userLogout});
		} else {
			$.getScript(gigyaJS, function() {
				gigya.services.socialize.logout({callback:userLogout});
			}); 
		}
	});
	
	} //end renderCdcSocialHtml

} //end prepareCdcSocialHeader	



	/*
	* Send user to Registration/More Info page after sign in/log in
	*/
	function userPostLogin(eventObj) {
		if(window.console)console.log(eventObj);
		if(eventObj.source=="showLoginUI") {
		if($.colorbox=='undefined' || $.colorbox==null) {
			loadColorboxJs();
		}
		var userObj = eventObj.user;
        var userPostLoginUrlParams = "";
        for(var field in userObj) {
			userPostLoginUrlParams = userPostLoginUrlParams + "&" + field + "=" + userObj[field];
        }
        if(window.console)console.log("userPostLoginUrlParams: " + userPostLoginUrlParams);
		$.colorbox({transition:'none', innerWidth: "660px", innerHeight: "340px", iframe:true, opacity:0.7, href:"/user/registration-more-info?"+userPostLoginUrlParams+"&currentPage=header&parentUrl="+encodeURIComponent(top.location.href)+"&disable_request_ssl="+disableRequestSsl, hideLoadingOverlay:true});	
		}
	}//end userPostLogin


	/*
	* Inject Gigya Login UI plugin
	*/
	function loadGigyaLoginUI() {
		var gigyaParams = {
			containerID: "HeaderLoginConnections", 
			cid:'', 
			width: 50, 
			height: 20,
			showEditLink: false, // show 'Edit' link
			enabledProviders: "facebook, twitter",
			//redirectURL: "/user/registration-more-info", //change to -- location.protocol + "//" + location.host + "/user/registration-more-info" -- when live 
			showTermsLink: false, hideGigyaLink: true // remove 'Terms' and 'Gigya' links
		};
		if(typeof gigya != 'undefined') {
			gigya.services.socialize.showLoginUI({}, gigyaParams);
			//If user logged in via Gigya login widget, send user to Registration/More Info page in lightbox
			gigya.services.socialize.addEventHandlers({
				onLogin: userPostLogin
			}); 		
		} else {
			$.getScript(gigyaJS, function() {
				gigya.services.socialize.showLoginUI({}, gigyaParams);
				//If user logged in via Gigya login widget, send user to Registration/More Info page in lightbox
				gigya.services.socialize.addEventHandlers({
					onLogin: userPostLogin
				}); 		
			});
		}	//end Gigya Login plugin code
	} //end loadGigyaLoginUI
	
	
	/*
	 * User logout function
	 */
	function userLogout(response) {
		if(window.console)console.log(response);
		if(response.errorCode == 0) {
			isUserLoggedIn = false;
			profileGuidVar = "";
			socialGuidVar = "";
			if(typeof $.cookie!='undefined') {
				$.cookie("profileGuid", null, {path:"/"});
				$.cookie("socialGuid", null, {path:"/"});
				window.location.reload();
				//initCdcSocial();
			} else {
				$.getScript('//cdcssl.ibsrv.net/cdcx/js/jquery-cookies-plugin.js', function() {
					$.cookie("profileGuid", null, {path:"/"});
					$.cookie("socialGuid", null, {path:"/"});
					window.location.reload();
					//initCdcSocial();
				});
			}
			/*
			$(".welcomeUserInfo").addClass("hide");
			$(".myVehiclesTab").addClass("hide");
			loadGigyaLoginUI();
			$(".signIn").removeClass("hide");
			*/
		} else {
			alert("Error logging out user");
		}
	 } //end userLogout
 

}//end initCdcSocial


/*
 * Get vehicle photos - JavaScript version from our original Groovy version
 */
function getPhotos(response, savedVehiclePageId, make, model, year) {
	var returnObject = {};
	if(response.success) {
		var photos;
		if(savedVehiclePageId!=3) {
		if((year != null) && (year != "")) {
			photos = response.mapOfYearToTrimRestResponses[year];
			//if(window.console)console.log(photos);
		} else {
			photos = response.trimRestResponses;
		}
		if(window.console)console.log("photos of " + make + " " + model);
		if(window.console)console.log(photos);

		var exteriorShotUids = ["101", "109", "106", "1300", "105", "102", "112", "113", "1303", "1304", 
			"1301", "1302", "513", "1305", "510", "1306", "608", "1307", "1309", "1310"];
		var interiorShotUids = ["301","312","104","304","302","314","313","1350","1351","1352","630"];        

		var exteriorPhotos = [];
		var interiorPhotos = [];
           
		for(var i = 0; i < photos.length; i++){
			var style = photos[i];
			if(window.console)console.log("style: ");
			if(window.console)console.log(style);
			for(var j = 0; j < style['photoRestResponse'].length; j++) {
				var photo = style['photoRestResponse'][j];
				if($.inArray(photo['shotUID'], exteriorShotUids) > -1) {
					exteriorPhotos.push(photo);
				}
				if($.inArray(photo['shotUID'], interiorShotUids) > -1) {
					interiorPhotos.push(photo);
				}
			}
		}
	       
		if (exteriorPhotos.length > 0) {
			if(window.console)console.log("exteriorPhotos:");
			if(window.console)console.log(exteriorPhotos);
			returnObject['mainPhoto'] = "//cdcssl.ibsrv.net/autodata/images/?IMG=" + exteriorPhotos[0]['imageName'] + ".JPG&width=60";
		} else if (interiorPhotos.size > 0) {
			if(window.console)console.log("interiorPhotos:");
			if(window.console)console.log(interiorPhotos);
			returnObject['mainPhoto'] = "//cdcssl.ibsrv.net/autodata/images/?IMG=" + interiorPhotos[0]['imageName'] + ".JPG&width=60";
		} else {
			returnObject['mainPhoto'] = null;
		}
		} else { //usedListing photo
			if(response.mainPhotoUrl!="" && response.mainPhotoUrl!=null) {
			returnObject['mainPhoto'] = response.mainPhotoUrl;
			} else {
			returnObject['mainPhoto'] = null;
			}
		}
	} else {
		returnObject['mainPhoto'] = null;
	}
	returnObject['make'] = make;
	returnObject['model'] = model;
	if(window.console)console.log("returnObject of " + make + " " + model);
	if(window.console)console.log(returnObject);
	photoCount++;
	return returnObject;
} //end getPhotos


	//populate vehicle photos fn
	function populateVehiclePhotos(target, photos) {
		var imageUrl;
		if(window.console)console.log("photos: ");
		if(window.console)console.log(photos);
		target.each(function (i) {
			if(photos[i]!=null) {
				imageUrl = photos[i];
			} else {
				imageUrl = "//cdcssl.ibsrv.net/usedcars/images/no_photo_available.png";
			}
			$(this).find("img").attr("src",imageUrl);
			});
	}





/*
 * CDC's custom Colorbox JS -- call this fn if Colorbox has not yet been loaded
 */
function loadColorboxJs() {
(function ($, window) {

  var
  // ColorBox Default Settings. 
  // See http://colorpowered.com/colorbox for details.
  defaults = {
transition: "elastic",
speed: 250,
width: false,
initialWidth: "600",
deltaWidth: false,
innerWidth: false,
maxWidth: false,
height: false,
initialHeight: "450",
deltaHeight: false,
innerHeight: false,
maxHeight: false,
scalePhotos: true,
scrolling: false,
inline: false,
html: false,
iframe: false,
photo: false,
href: false,
title: false,
rel: false,
opacity: 0.7,
preloading: true,
current: "image {current} of {total}",
previous: "previous",
next: "next",
close: "close",
open: false,
loop: true,
slideshow: false,
slideshowAuto: true,
slideshowSpeed: 2500,
slideshowStart: "start slideshow",
slideshowStop: "stop slideshow",
onOpen: false,
onLoad: false,
onComplete: false,
onCleanup: false,
onClosed: false,
overlayClose: true, 
escKey: true,
arrowKey: true,
hideLoadingOverlay: true,
stylesheetComponent: "CDCXColorBoxStyle"
  },

  // Abstracting the HTML and event identifiers for easy rebranding
  colorbox = 'colorbox',
  prefix = 'cbox',

  // Events 
  event_open = prefix + '_open',
  event_load = prefix + '_load',
  event_complete = prefix + '_complete',
  event_cleanup = prefix + '_cleanup',
  event_closed = prefix + '_closed',

  // Special Handling for IE
  isIE = $.browser.msie && !$.support.opacity, // feature detection alone gave a false positive on at least one phone browser and on some development versions of Chrome.
  isIE6 = isIE && $.browser.version < 7,
  event_ie6 = prefix + '_IE6',
  
  // Cached jQuery Object Variables
  $overlay,
  $box,
  $wrap,
  $content,
  $topBorder,
  $leftBorder,
  $rightBorder,
  $bottomBorder,
  $related,
  $window,
  $loaded,
  $loadingBay,
  $loadingOverlay,
  $title,
  $current,
  $slideshow,
  $next,
  $prev,
  $close,
  
  // Variables for cached values or use across multiple functions
  interfaceHeight,
  interfaceWidth,
  loadedHeight,
  loadedWidth,
  element,
  bookmark,
  index,
  settings,
  open,
  active,
  
  publicMethod,
  boxElement = prefix + 'Element';

  // ****************
  // HELPER FUNCTIONS
  // ****************

  // jQuery object generator to reduce code size
  function $div(id, css) {
    id = id ? ' id="' + prefix + id + '"' : '';
    css = css ? ' style="' + css + '"' : '';
    return $('<div' + id + css + '/>');
  }

  // Convert % values to pixels
  function setSize(size, dimension) {
    dimension = dimension === 'x' ? $window.width() : $window.height();
    return (typeof size === 'string') ? Math.round((size.match(/%/) ? (dimension / 100) * parseInt(size, 10) : parseInt(size, 10))) : size;
  }

  // Checks an href to see if it is a photo.
  // There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.
  function isImage(url) {
    url = $.isFunction(url) ? url.call(element) : url;
    return settings.photo || url.match(/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i);
  }

  // Assigns functions results to their respective settings. This allows functions to be used to set ColorBox options.
  function process() {
    for (var i in settings) {
      if ($.isFunction(settings[i]) && i.substring(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
        settings[i] = settings[i].call(element);
      }
    }
    settings.rel = settings.rel || element.rel || 'nofollow';
    settings.href = settings.href || $(element).attr('href');
    settings.title = settings.title || element.title;
  }

  function launch(elem) {

    element = elem;

    settings = $.extend({}, $(element).data(colorbox));

    process(); // Convert functions to their returned values.

    var $style = $().add($box).add($containingDiv);
    
    $style.removeClass($box.data("stylesheetComponent"));
    $box.data("stylesheetComponent",settings.stylesheetComponent);
    $style.addClass($box.data("stylesheetComponent"));
    
    if (settings.rel !== 'nofollow') {
      $related = $('.' + boxElement).filter(function () {
        var relRelated = $(this).data(colorbox).rel || this.rel;
        return (relRelated === settings.rel);
      });
      index = $related.index(element);

      // Check direct calls to ColorBox.
      if (index === -1) {
        $related = $related.add(element);
        index = $related.length - 1;
      }
    } else {
      $related = $(element);
      index = 0;
    }

    if (!open) {
      open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.

      bookmark = element;

      try {
        bookmark.blur(); // Remove the focus from the calling element.
      }catch (e) {}

      $.event.trigger(event_open);
      if (settings.onOpen) {
        settings.onOpen.call(element);
      }

      // +settings.opacity avoids a problem in IE when using non-zero-prefixed-string-values, like '.5'
      $overlay.css({"opacity": +settings.opacity, "cursor": settings.overlayClose ? "pointer" : "auto"}).show();

      // Opens inital empty ColorBox prior to content being loaded.
      settings.w = setSize(settings.initialWidth, 'x');
      settings.h = setSize(settings.initialHeight, 'y');
      publicMethod.position(0);

      if (isIE6) {
        $window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
          $overlay.css({width: $window.width(), height: $window.height(), top: $window.scrollTop(), left: $window.scrollLeft()});
        }).trigger('scroll.' + event_ie6);
      }
    }

    $current.add($prev).add($next).add($slideshow).add($title).hide();

    $close.html(settings.close).show();

    publicMethod.slideshow();

    publicMethod.load();
  }

  // ****************
  // PUBLIC FUNCTIONS
  // Usage format: $.fn.colorbox.close();
  // Usage from within an iframe: parent.$.fn.colorbox.close();
  // ****************

  publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
    var $this = this;

    if (!$this[0] && $this.selector) { // if a selector was given and it didn't match any elements, go ahead and exit.
      return $this;
    }

    options = options || {};

    if (callback) {
      options.onComplete = callback;
    }

    if (!$this[0] || $this.selector === undefined) { // detects $.colorbox() and $.fn.colorbox()
      $this = $('<a/>');
      options.open = true; // assume an immediate open
    }

    $this.each(function () {
      $(this).data(colorbox, $.extend({}, $(this).data(colorbox) || defaults, options)).addClass(boxElement);
    });

    if (options.open) {
      launch($this[0]);
    }

    return $this;
  };

  // Initialize ColorBox: store common calculations, preload the interface graphics, append the html.
  // This preps colorbox for a speedy open when clicked, and lightens the burdon on the browser by only
  // having to run once, instead of each time colorbox is opened.
  publicMethod.init = function () {
    // Create & Append jQuery Objects
    $window = $(window);
    $box = $div().attr({id: colorbox, 'class': isIE ? prefix + 'IE ' : ''});
    $overlay = $div("Overlay", isIE6 ? 'position:absolute' : '').hide();

    $wrap = $div("Wrapper");
    $content = $div("Content").append(
    $loaded = $div("LoadedContent", 'width:0; height:0'),
    $loadingOverlay = $div("LoadingOverlay").add($div("LoadingGraphic")),
    $title = $div("Title"),
    $current = $div("Current"),
    $next = $div("Next"),
    $prev = $div("Previous"),
    $slideshow = $div("Slideshow"),
    $close = $div("Close")
    );
    $wrap.append( // The 3x3 Grid that makes up ColorBox
    $div().append(
    $div("TopLeft"),
    $topBorder = $div("TopCenter"),
    $div("TopRight")
    ),
    $div().append(
    $leftBorder = $div("MiddleLeft"),
    $content,
    $rightBorder = $div("MiddleRight")
    ),
    $div().append(
    $div("BottomLeft"),
    $bottomBorder = $div("BottomCenter"),
    $div("BottomRight")
    )
    ).children().children().css({'float': 'left'});

    $loadingBay = $div(false, 'position:absolute; width:9999px; visibility:hidden; display:none');

    $containingDiv = $('<div />');
    $containingDiv.append($overlay, $box.append($wrap, $loadingBay));
    $('body').prepend($containingDiv);

    $content.children()
    .hover(function () {
      $(this).addClass('hover');
    }, function () {
      $(this).removeClass('hover');
    }).addClass('hover');

    // Cache values needed for size calculations
    interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
    interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
    loadedHeight = $loaded.outerHeight(true);
    loadedWidth = $loaded.outerWidth(true);

    // Setting padding to remove the need to do size conversions during the animation step.
    $box.css({"padding-bottom": interfaceHeight, "padding-right": interfaceWidth}).hide();

    // Setup button events.
    $next.click(publicMethod.next);
    $prev.click(publicMethod.prev);
    $close.click(publicMethod.close);

    // Adding the 'hover' class allowed the browser to load the hover-state
    // background graphics. The class can now can be removed.
    $content.children().removeClass('hover');

    $('.' + boxElement).live('click', function (e) {
      // checks to see if it was a non-left mouse-click and for clicks modified with ctrl, shift, or alt.
      if ((e.button !== 0 && typeof e.button !== 'undefined') || e.ctrlKey || e.shiftKey || e.altKey) {
        return true;
      } else {
        launch(this); 
        return false;
      }
    });

    //Appending text to LoadingOverlay.
    $("#cboxLoadingOverlay").append("<div class='loading-text' width='100%' style='text-align:center;margin-top:64%;font-weight:lighter;color:black;font-size:12px;'>Loading...</div>"); 


    $overlay.click(function () {
      if (settings.overlayClose) {
        publicMethod.close();
      }
    });

    // Set Navigation Key Bindings
    $(document).bind("keydown", function (e) {
      if (open && settings.escKey && e.keyCode === 27) {
        e.preventDefault();
        publicMethod.close();
      }
      if (open && settings.arrowKey && !active && $related[1]) {
        if (e.keyCode === 37 && (index || settings.loop)) {
          e.preventDefault();
          $prev.click();
        } else if (e.keyCode === 39 && (index < $related.length - 1 || settings.loop)) {
          e.preventDefault();
          $next.click();
        }
      }
    });
  };

  publicMethod.remove = function () {
    $box.add($overlay).remove();
    $('.' + boxElement).die('click').removeData(colorbox).removeClass(boxElement);
  };

  publicMethod.position = function (speed, loadedCallback) {
    var
    animate_speed,
    // keeps the top and left positions within the browser's viewport.
    posTop = Math.max($window.height() - settings.h - loadedHeight - interfaceHeight, 0) / 2 + $window.scrollTop(),
    posLeft = Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2 + $window.scrollLeft();
    
    // setting the speed to 0 to reduce the delay between same-sized content.
    animate_speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed;
    
    // this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
    // but it has to be shrank down around the size of div#colorbox when it's done.  If not,
    // it can invoke an obscure IE bug when using iframes.
    $wrap[0].style.width = $wrap[0].style.height = "9999px";
    
    function modalDimensions(that) {
      // loading overlay height has to be explicitly set for IE6.
      $topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
      $loadingOverlay[0].style.height = $loadingOverlay[1].style.height = $content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
    }

    $box.dequeue().animate({width: settings.w + loadedWidth, height: settings.h + loadedHeight, top: posTop, left: posLeft}, {
duration: animate_speed,
complete: function () {
        modalDimensions(this);

        active = false;

        // shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
        $wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
        $wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";

        if (loadedCallback) {
          loadedCallback();
        }
      },
step: function () {
        modalDimensions(this);
      }
    });
  };

  publicMethod.resize = function (options) {
    if (open) {
      options = options || {};
      
      if (options.width) {
        settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
      }
      if (options.innerWidth) {
        settings.w = setSize(options.innerWidth, 'x');
      }
      if (options.deltaWidth) {
        settings.w += options.deltaWidth;
      }
      
      if (options.height) {
        settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
      }
      if (options.innerHeight) {
        settings.h = setSize(options.innerHeight, 'y');
      }
      if (options.deltaHeight) {
        settings.h += options.deltaHeight;
      }
      if (!options.innerHeight && !options.deltaHeight && !options.height) {        
        var $child = $loaded.wrapInner("<div style='overflow:auto'></div>").children(); // temporary wrapper to get an accurate estimate of just how high the total content should be.
        settings.h = $child.height();
        $child.replaceWith($child.children()); // ditch the temporary wrapper div used in height calculation
      }

      $loaded.css({width: settings.w});
      $loaded.css({height: settings.h});

      publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
    }
  };

  publicMethod.prep = function (object) {
    if (!open) {
      return;
    }

    var photo,
    speed = settings.transition === "none" ? 0 : settings.speed;

    $window.unbind('resize.' + prefix);
    $loaded.remove();
    $loaded = $div('LoadedContent').html(object);

    function getWidth() {
      settings.w = settings.w || $loaded.width();
      settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
      return settings.w;
    }
    function getHeight() {
      settings.h = settings.h || $loaded.height();
      settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
      return settings.h;
    }

    $loaded.hide()
    .appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
    .css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
    .css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
    .prependTo($content);

    $loadingBay.hide();

    $('#' + prefix + 'Photo').css({cssFloat: 'none'});// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.

    // Hides SELECT elements in IE6 because they would otherwise sit on top of the overlay.
    if (isIE6) {
      $('select').not($box.find('select')).filter(function () {
        return this.style.visibility !== 'hidden';
      }).css({'visibility': 'hidden'}).one(event_cleanup, function () {
        this.style.visibility = 'inherit';
      });
    }

    function setPosition(s) {
      var prev, prevSrc, next, nextSrc, total = $related.length, loop = settings.loop;
      publicMethod.position(s, function () {
        function defilter() {
          if (isIE) {
            //IE adds a filter when ColorBox fades in and out that can cause problems if the loaded content contains transparent pngs.
            $box[0].style.removeAttribute("filter");
          }
        }

        if (!open) {
          return;
        }

        if (isIE) {
          //This fadeIn helps the bicubic resampling to kick-in.
          if (photo) {
            $loaded.fadeIn(100);
          }
        }

        //Waited until the iframe is added to the DOM & it is visible before setting the src.
        //This increases compatability with pages using DOM dependent JavaScript.
        if (settings.iframe) {
          $("<iframe frameborder=0" + (settings.scrolling ? "" : " scrolling='no'") + (isIE ? " allowtransparency='true'" : '') + "/>")
          .attr({src: settings.href, name: new Date().getTime()})
          .appendTo($loaded);
        }

        $loaded.show();

        $title.show().html(settings.title);

        if (total > 1) { // handle grouping
          $current.html(settings.current.replace(/\{current\}/, index + 1).replace(/\{total\}/, total)).show();

          $next[(loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
          $prev[(loop || index) ? "show" : "hide"]().html(settings.previous);
          
          prev = index ? $related[index - 1] : $related[total - 1];
          next = index < total - 1 ? $related[index + 1] : $related[0];
          
          if (settings.slideshow) {
            $slideshow.show();
            if (index === total - 1 && !loop && $box.is('.' + prefix + 'Slideshow_on')) {
              $slideshow.click();
            }
          }

          // Preloads images within a rel group
          if (settings.preloading) {
            nextSrc = $(next).data(colorbox).href || next.href;
            prevSrc = $(prev).data(colorbox).href || prev.href;
            
            if (isImage(nextSrc)) {
              $('<img/>')[0].src = nextSrc;
            }

            if (isImage(prevSrc)) {
              $('<img/>')[0].src = prevSrc;
            }
          }
        }

        if(settings.hideLoadingOverlay){
          $loadingOverlay.hide();
        }

        if (settings.transition === 'fade') {
          $box.fadeTo(speed, 1, function () {
            defilter();
          });
        } else {
          defilter();
        }

        $window.bind('resize.' + prefix, function () {
          publicMethod.position(0);
        });

        $.event.trigger(event_complete);
        if (settings.onComplete) {
          settings.onComplete.call(element);
        }
      });
    }

    if (settings.transition === 'fade') {
      $box.fadeTo(speed, 0, function () {
        setPosition(0);
      });
    } else {
      setPosition(speed);
    }
  };

  publicMethod.load = function () {
    var href, img, setResize, prep = publicMethod.prep;

    active = true;

    element = $related[index];

    settings = $.extend({}, $(element).data(colorbox));

    //convert functions to static values
    process();

    $.event.trigger(event_load);
    if (settings.onLoad) {
      settings.onLoad.call(element);
    }

    settings.h = settings.height ?
    setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
    settings.innerHeight && setSize(settings.innerHeight, 'y');

    settings.w = settings.width ?
    setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
    settings.innerWidth && setSize(settings.innerWidth, 'x');

    // Sets the minimum dimensions for use in image scaling
    settings.mw = settings.w;
    settings.mh = settings.h;

    // Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
    // If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
    if (settings.maxWidth) {
      settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
      settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
    }
    if (settings.maxHeight) {
      settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
      settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
    }

    href = settings.href;

    $loadingOverlay.show();

    if (settings.inline) {
      // Inserts an empty placeholder where inline content is being pulled from.
      // An event is bound to put inline content back when ColorBox closes or loads new content.
      $div('InlineTemp').hide().insertBefore($(href)[0]).bind(event_load + ' ' + event_cleanup, function () {
        $(this).replaceWith($loaded.children());
      });
      prep($(href));
    } else if (settings.iframe) {
      // IFrame element won't be added to the DOM until it is ready to be displayed,
      // to avoid problems with DOM-ready JS that might be trying to run in that iframe.
      prep(" ");
    } else if (settings.html) {
      prep(settings.html);
    } else if (isImage(href)) {
      img = new Image();
      img.onload = function () {
        var percent;

        img.onload = null;
        img.id = prefix + 'Photo';
        $(img).css({margin: 'auto', border: 'none', display: 'block', cssFloat: 'left'});

        if (settings.scalePhotos) {
          setResize = function () {
            img.height -= img.height * percent;
            img.width -= img.width * percent; 
          };
          if (settings.mw && img.width > settings.mw) {
            percent = (img.width - settings.mw) / img.width;
            setResize();
          }
          if (settings.mh && img.height > settings.mh) {
            percent = (img.height - settings.mh) / img.height;
            setResize();
          }
        }

        if (settings.h) {
          img.style.marginTop = Math.max(settings.h - img.height, 0) / 2 + 'px';
        }

        setTimeout(function () { // Chrome will sometimes report a 0 by 0 size if there isn't pause in execution
          prep(img);
        }, 1);

        if ($related[1] && (index < $related.length - 1 || settings.loop)) {
          $(img).css({cursor: 'pointer'}).click(publicMethod.next);
        }

        if (isIE) {
          img.style.msInterpolationMode = 'bicubic';
        }
      };
      img.src = href;
    } else {
      $div().appendTo($loadingBay).load(href, function (data, status, xhr) {
        prep(status === 'error' ? 'Request unsuccessful: ' + xhr.statusText : this);
      });
    }
  };

  // Navigates to the next page/image in a set.
  publicMethod.next = function () {
    if (!active) {
      index = index < $related.length - 1 ? index + 1 : 0;
      publicMethod.load();
    }
  };

  publicMethod.prev = function () {
    if (!active) {
      index = index ? index - 1 : $related.length - 1;
      publicMethod.load();
    }
  };

  publicMethod.slideshow = function () {
    var stop, timeOut, className = prefix + 'Slideshow_';

    $slideshow.bind(event_closed, function () {
      $slideshow.unbind();
      clearTimeout(timeOut);
      $box.removeClass(className + "off " + className + "on");
    });

    function start() {
      $slideshow
      .text(settings.slideshowStop)
      .bind(event_complete, function () {
        timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
      })
      .bind(event_load, function () {
        clearTimeout(timeOut);  
      }).one("click", function () {
        stop();
      });
      $box.removeClass(className + "off").addClass(className + "on");
    }

    stop = function () {
      clearTimeout(timeOut);
      $slideshow
      .text(settings.slideshowStart)
      .unbind(event_complete + ' ' + event_load)
      .one("click", function () {
        start();
        timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
      });
      $box.removeClass(className + "on").addClass(className + "off");
    };

    if (settings.slideshow && $related[1]) {
      if (settings.slideshowAuto) {
        start();
      } else {
        stop();
      }
    }
  };

  // Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
  publicMethod.close = function () {
    if (open) {
      open = false;
      
      $.event.trigger(event_cleanup);
      
      if (settings.onCleanup) {
        settings.onCleanup.call(element);
      }
      
      $window.unbind('.' + prefix + ' .' + event_ie6);
      
      $overlay.fadeTo('fast', 0);
      
      $box.stop().fadeTo('fast', 0, function () {
        $box.find('iframe').attr('src', 'about:blank'); // change the location of the iframe to avoid a problem in IE with flash objects not clearing.
        
        $loaded.remove();
        
        $box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
        
        try {
          bookmark.focus();
        } catch (e) {
          // do nothing 
        }
        
        setTimeout(function () {
          $.event.trigger(event_closed);
          if (settings.onClosed) {
            settings.onClosed.call(element);
          }
        }, 1);
      });
    }
  };

  // A method for fetching the current element ColorBox is referencing.
  // returns a jQuery object.
  publicMethod.element = function () {
    return $(element);
  };

  publicMethod.settings = defaults;

  // Initializes ColorBox when the DOM has loaded
  $(publicMethod.init);

}(jQuery, this)); 
} //end loadColorboxJS