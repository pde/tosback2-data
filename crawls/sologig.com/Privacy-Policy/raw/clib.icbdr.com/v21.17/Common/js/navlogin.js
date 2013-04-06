var sLoginHref;

var QuickLogin = {
	showLoginPopup: function (){
		$("#loginnavwrapper").attr("style", "visibility: visible;");
		$("#HPLogIn .connector").attr("style", "visibility: visible;");
		$("#loginnav").addClass("selected");
	},

	hideLoginPopup: function (){
		$("#loginnavwrapper").attr("style", "visibility: hidden;");
		$("#HPLogIn .connector").attr("style", "visibility: hidden;");
		$("#loginnav").removeClass("selected");
	},

	hideEmailWater: function (id) {
		document.getElementById(id).className = document.getElementById(id).className.replace('EmailWater', 'HideWater');
	},

	hidePasswordWater: function (id) {
		document.getElementById(id).className = document.getElementById(id).className.replace('PassWater', 'HideWater');
	},

	showEmailWater: function (id) {
		if(document.getElementById(id).value.length == 0){
			document.getElementById(id).className = document.getElementById(id).className.replace('HideWater', 'EmailWater');
			if(document.getElementById(id).className.indexOf("EmailWater") == -1 ){
				document.getElementById(id).className = document.getElementById(id).className + 'EmailWater';
			}
		}
	},

	showPasswordWater: function (id) {
		if(document.getElementById(id).value.length == 0){
			document.getElementById(id).className = document.getElementById(id).className.replace('HideWater', 'PassWater');
			if(document.getElementById(id).className.indexOf("PassWater") == -1 ){
				document.getElementById(id).className = document.getElementById(id).className + 'PassWater';
			}
		}
	},

	handleNavLoginResponse: function (success, responseText) {
		var div, divKnown, hyperlink, welcome;
		CB.e("navAuthorizing").style.display = "none";
		if (success) {
			if (responseText == "SITEDOWN") {
				CB.e("navSiteDownDiv").style.display = "block";
			} else if (responseText == "CQADD" || responseText == "CQASK") {
				window.location.replace(sLoginHref);
			} else if (responseText == "FAILURE") {
				CB.e("navLoginFailureDiv").style.display = "block";
			} else {
				if (location.pathname.toLowerCase().indexOf("logout.aspx") == -1) {
					location.reload(true);
				}
				if (typeof (CB.AJAX.Login) !== "undefined") {
					CB.AJAX.Login.onLoginSuccess();
					if (typeof (CB.AJAX.Login.Prefix) !== "undefined") {
						CB.e(CB.AJAX.Login.Prefix + 'hdn_auth').value = "True";
					}
				}

				renderLoginSucess(responseText.split("SUCCESS;")[1]);
			}
		} else {
			CB.e("navSiteDownDiv").style.display = "block";
		}
	},

	attemptLogin: function (prefix) {
		var data = "UserEmail=" + CB.e(prefix + 'loginEmail').value;

		data += "&UserPassword=" + CB.e('navLoginPW').value;
		if (CB.e('loginnav_rememberme').checked === true) {
			data += "&RememberUser=True";
		}
		else {
			data += "&RememberUser=False";
		}
		if (CB.e(prefix + "loginEmail").value.length > 0 && CB.e("navLoginPW").value.length > 0) {
			CB.AJAX.submitCallback(data, "Login.aspx", QuickLogin.handleNavLoginResponse, true);
			CB.e("navLoginPW").value = "";
			CB.e("navLoginPW").className = "PassWater";
			CB.e("navLoginFailureDiv").style.display = "none";
			CB.e("navSiteDownDiv").style.display = "none";
			CB.e("navAuthorizing").style.display = "block";
		} else {
			CB.e("navSiteDownDiv").style.display = "none";
			CB.e("navAuthorizing").style.display = "none";
			CB.e("navLoginFailureDiv").style.display = "block";
		}
	},

	initQuickLogin: function (){
		sLoginHref = jQuery("#loginnav a").attr("href");
		if (location.pathname.toLowerCase().indexOf("login.aspx") == -1 && location.pathname.toLowerCase().indexOf("logout.aspx") == -1) {
			jQuery("#loginnav a").attr("href", "#");
			jQuery("#loginnav a").click(function () {
				if (jQuery("#loginnav").hasClass("selected")) {
					QuickLogin.hideLoginPopup();
				} else {
					QuickLogin.showLoginPopup();
				}
			});
			
			jQuery("#loginnav .close").click(function () {
				QuickLogin.hideLoginPopup();
			});
		}
	}
};
jQuery(document).ready(function () {
    QuickLogin.initQuickLogin();
});

//$("#loginnav").bind('ready',QuickLogin.initQuickLogin());