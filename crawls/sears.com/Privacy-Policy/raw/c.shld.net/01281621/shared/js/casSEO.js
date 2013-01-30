//TODO: need to look at why any of this code is separated from akamaiCookie.js
//bad practice to set global vars thre are access them here.

var isCookieCreated = false,
	cookieHeader = "";

function isInternational() {
	var data, flag = false;

	//TODO: should this also eliminate kenmore, craftsman?
	//TODO: what about puerto rico, which isn't getting a body class in some (all) cases?
	//TODO: shouldn't this whole thing be moved and replaced with a call isI18NConvReq() in NewUtility.js
	if ($('body').is('.kmart')) {
		return false; // only applies to Kmart
	}

	if (typeof intShipFlgSwitch !== 'undefined' && intShipFlgSwitch === 'TRUE') {
		data = FED.Util.getCountryData();
		if (data && typeof data.countryCode !== 'undefined' && data.countryCode !== 'US') {
			flag = true;
		}
	}
	return flag;
}

function createIframe(d) {
	var iframe = d.body.appendChild(d.createElement('iframe'));
	iframe.id = "casSeoIframe";
	document.getElementById('casSeoIframe').onload = checkLogin;
	doc = iframe.contentWindow.document;
	doc.open().write('');
	doc.close(); //iframe onload event happens

	iframe.frameborder = "0";
	iframe.width = "0px";
	iframe.height = "0px";
	iframe.src = $('input[name=casUrl]').val();
}
function trackProfileVars()
{
	if(typeof s != 'undefined' && typeof setUserProfieVars != 'undefined')
	{
	setUserProfieVars();
	s.tl();
	}
	//tracked=1;

}
function checkLogin() {
	username = "";
	cartTotalItems = "";
	cartTotalPrice = "";
	sywrM = "";
	sywrP = "";
	sywrT = "";
	if ($.cookie('s_r') === 's_r_Y') {
		var storeId = $('input[name=storeId]').val(),
			attributeIdVal = $('body').attr('id');

		if (storeId == '10153' || storeId == '10151' || storeId == '10156' || storeId == '10165') {
			if ((["subcategory ", "keysearch", "product", "compare"].indexOf(attributeIdVal) >= 0) && (storeId == '10153' || storeId == '10151')) {
				location.href = location.href;
			} else {
				readAkamaiCookie();  //in akamaiCookie.js
				if (isCookieCreated) {
					if (cookieHeader[1] !== null) {
						username = cookieHeader[1];
					}
					if (cookieHeader[2] !== null) {
						cartTotalItems = cookieHeader[2];
					}
					if (cookieHeader[3] !== null) {
						cartTotalPrice = cookieHeader[3];
					}
					if (cookieHeader[5] !== null) {
						sywrM = cookieHeader[5];
					}
					if (cookieHeader[6] !== null) {
						sywrP = cookieHeader[6];
					}
					if (cookieHeader[7] !== null) {
						sywrT = cookieHeader[7];
					}

					createSignInHTML(username, cartTotalItems, cartTotalPrice, sywrM, sywrP, sywrT);
				}

				if (typeof sywrEpsAkCookieProd === 'function') {
					sywrEpsAkCookieProd();
				}
				if (storeId == '10153' || storeId == '10151') {
					// spu repainting
					$('#loc_shcModal-closer').click();
					onLogin();
				}
			}
		} else if (storeId == '10154' || storeId == '10155') {
			repaintOtherStores(storeId);
		}
	}
}

function repaintOtherStores(storeId) {
	var loginText = '',
		signIn = '',
		Register = '',
		myProfile = '',
		logOff = '',
		MyprofileURL = $('input[name=MyprofileURL]').val(),
		LogoffURL = $('input[name=LogoffURL]').val(),
		LogonFormURL = $('input[name=LogonFormURL]').val(),
		AccountViewURL = $('input[name=AccountViewURL]').val(),
		loginHeaderMsg = '',
		userNameCookieValue = $.cookie("s_u"),
		usrId = $('input[name=userId]').val(),
		usrType = $('input[name=userType]').val();

	if (storeId == '10155') {
		loginHeaderMsg = 'Welcome to your Garage of Knowledge';
	} else if (storeId == '10154') {
		loginHeaderMsg = 'Welcome to Kenmore.com ';
	}

	if (!!userNameCookieValue && userNameCookieValue !== "s_u") {
		if (storeId != "10154") {
			myProfile = "<a onclick=\"trackClickAction(this, 'Profile', 'Profile');\" href=" + MyprofileURL + "> [My Profile]</a></span>";
			logOff = "<a onclick=\"trackClickAction(this, 'Logout', 'Logout');\" href=" + LogoffURL + "> [Log out]</a>";
		} else {
			logOff = "<a onclick=\"trackClickAction(this, 'Logout', 'Logout');\" href=" + LogoffURL + ">| Log out</a>";
		}
		loginText = "<span id=\"checkForLogin\">" + userNameCookieValue + ", " + loginHeaderMsg + myProfile + logOff;

		if (storeId == "10154") {
			$('.userStatus span#checkForLogin').html(loginText);
		}
		else
		{
		$('div#checkForLoginDiv').html(loginText);
		}
	}
	else if (usrId != undefined && usrId !== '-1002' && usrType === 'R') {
		//Making an Ajax call to fetch the display Name. Added a new parameter akamaiFlow to the call.
		//TODO: is this supposed to be passing storeId?? strId is not defined.
		//guessing why we see this call being made with '?storeId=undefined' in some cases
		var tempUrl = "/shc/s/GetMiniCartLoginAjax?storeId=" + strId + "&shcapiBypassSSO=true" + "&akamaiFlow=false";

		$.getJSON(tempUrl, function (data) {
			if (data.login !== null) {
				userNameCookieValue = data.login;
			}
			if (storeId != "10154") {
				myProfile = " <a onclick=\"trackClickAction(this, 'Profile', 'Profile');\" href=" + MyprofileURL + "> [My Profile]</a></span>";
				logOff = "<a onclick=\"trackClickAction(this, 'Logout', 'Logout');\" href=" + LogoffURL + "> [Log out]</a>";
			} else {
				logOff = "<a onclick=\"trackClickAction(this, 'Logout', 'Logout');\" href=" + LogoffURL + ">| Log out</a>";
			}
			loginText = "<span id=\"checkForLogin\">" + userNameCookieValue + ", " + loginHeaderMsg + myProfile + logOff;

			$.cookie("s_u", userNameCookieValue, {
				path: '/'
			});
			$('#checkForLoginDiv').html(loginText);
		});
	}
	else {
		signIn = "Welcome, <a onclick=\"trackClickAction(this, 'Sign In', 'Sign In');\" href=\"javascript:fnShowLoginModal('LOGIN','" + LogonFormURL + "&screenName=LOGIN');\">sign in </a>";
		Register = "<a onclick=\"trackClickAction(this, 'Register', 'Register');\" href=\"javascript:fnShowLoginModal('REG','" + LogonFormURL + "&screenName=REG');\">register </a></span>";
		if (storeId != "10154") {
			myProfile = "<a onclick=\"trackClickAction(this, 'Profile', 'Profile');\" href=\"javascript:fnShowLoginModal('PROFILE','" + AccountViewURL + "&screenName=PROFILE');\">[My Profile]</a>";
		}
		loginText = "<span id=\"checkForLogin\">" + signIn + "or " + Register + myProfile;

		$('checkForLoginDiv').html(loginText);
	}
}

$(function() {
	if (!isInternational()) {
		if ($.cookie('s_sd') !== 's_sd' && $('input[name=secureReq]').val() !== 'Y') {
			createIframe(document);
			if ($('#preCASAssertionVal').val() === 'ON') {
				$.cookie('s_sd', 's_sd');
			}
setTimeout("trackProfileVars()",2500);
		}
	}
});