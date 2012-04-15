AE.webUser = new function() {
	var _self = this;
	var defConfig = {
		signoutURL:'http://us.my.alibaba.com/user/sign/sign_out.htm',
		signinURL:'https://login.alibaba.com',
		joinWithCD0URL:'http://us.my.alibaba.com/user/join/join_step1.htm',
		joinFro:''
	};
	var sysLanguage = navigator.browserLanguage?navigator.browserLanguage:navigator.language;
	var config;
	var isLoggedIn = false, firstName = '', lastName = '', country = '', serviceType = '', memberSeq = '';
	var fromChina = false, firstIn = false, openAlertWindow = false;
	_self.create = function(oConfig) {
		config = TB.applyIf(oConfig|| {}, defConfig);
		
		//http://b2b-doc.alibaba-inc.com/pages/viewpage.action?pageId=53162143
		var isLoginCookie = AE.bom.getCookie('xman_us_t');
		var userCookie = AE.bom.getCookie('xman_us_f');
		
		if(isLoginCookie && isLoginCookie.indexOf('sign=y') !== -1) {
			isLoggedIn = true;
		}
	
		var userReg = /x_user=([^&]+)/;
		if(userCookie && userReg.test(userCookie)) {
			userCookie.match(userReg);
			userCookie = RegExp.$1;
			userCookie = userCookie.split('|');
			
			if(userCookie.length < 5){
				_self.clearSignInInfo();
			}else{
				country = userCookie[0];
				firstName = userCookie[1].replace(/</g, "&lt;").replace(/>/g, "&gt;");
				lastName = userCookie[2].replace(/</g, "&lt;").replace(/>/g, "&gt;");
				serviceType = userCookie[3];
				memberSeq = userCookie[4];
			}
		} else {
			_self.clearSignInInfo();
		}

		if(_self.hasLoggedIn()) {
			if(_self.getServiceType()=='cgs' || _self.getServiceType()=='hkgs' || _self.getServiceType()=='gs') {
				fromChina =  true;
			} else {
				fromChina =  false;
			}
		} else {
			if(sysLanguage.toLowerCase() == 'zh-cn') {
				fromChina =  true;
			} else {
				fromChina =  false;
			}
		}

		//if user is new here
		if(AE.bom.getCookie('ali_intl_firstIn').isEmpty()) {
			firstIn = true;
			AE.bom.setCookie('ali_intl_firstIn','n',true);
		}

	};
	_self.isFirstIn = function() {
		return firstIn;
	}
	_self.clearSignInInfo = function() {
		isLoggedIn = false;
		country = '';
		firstName = '';
		lastName = '';
		serviceType = '';

	};
	_self.setUri = function (obj) {
		config = TB.applyIf(obj|| {}, defConfig);
	};
	_self.isChinaUser = function () {
		return fromChina;
	}
	_self.writeWelcomeInfo = function (welId) {
		dWel = get(welId);
		if(!dWel) {
			return false;
		}
		if( location.href.indexOf("aliexpress.com") != -1 ) {
			var siteName = "AliExpress.com";
		} else {
			var siteName = "Alibaba.com";
		};

		if(_self.isFirstIn()) {
			//uv3
			//never access alibaba or has no cookies
			dWel.innerHTML = 'Welcome to '+siteName+'! <span id="log-info"><a href="'+config.joinWithCD0URL+'" rel="nofollow">Join Free</a> | <a href="'+config.signinURL+'" rel="nofollow">Sign In</a></span>';
		} else {
			//uv2
			//user who had logged in: hasLoggedIn == true ; getFirstName != isEmpty
			if(_self.hasLoggedIn()&&!_self.getFirstName().trim().isEmpty()) {
				dWel.innerHTML =  'Welcome '+ _self.getFirstName() +', <span id="log-info"> | <a href="'+config.signoutURL+'" rel="nofollow">Sign Out</a></span>';
			} else if(!_self.getFirstName().trim().isEmpty()) {
				dWel.innerHTML = 'Welcome ' + _self.getFirstName() +', <a href="'+config.signinURL+'" rel="nofollow">Sign In</a> (Not <a href="'+config.signinURL+'" style="font-weight:bold;text-decoration:underline;" rel="nofollow">you</a>?) | <span id="log-info"></span>';
			} else {
				dWel.innerHTML = 'Welcome to '+siteName+'! <span id="log-info"><a href="'+config.joinWithCD0URL+'" rel="nofollow">Join Free</a> | <a href="'+config.signinURL+'" rel="nofollow">Sign In</a></span>';
			}
		}
		//add tradeManager
		//dWel.innerHTML += '| <img src="'+globalImgServer+'/images/eng/style/icon/alitalk_16.gif" style="margin-top:-8px;+margin-top:0;" align="absmiddle" border="0" alt="" /> <a href="http://trademanager.alibaba.com" rel="nofollow">TradeManager</a> '
	}
	_self.hasLoggedIn = function () {
		return isLoggedIn;
	};
	_self.getFirstName   = function () {

		return (firstName.length > 20) ? firstName.substr(0, 20) : firstName;
	};
	_self.getLastName  = function () {
		return lastName;
	};
	_self.getCountry  = function () {
		return country;
	};
	_self.getServiceType  = function () {
		return serviceType;
	};
	_self.signin = function( sReturnUrl ) {
		var sTarget = '';

		if(top.location.href != self.location.href) {
			(sReturnUrl == null)? sReturnUrl = escape(extractUrl(self.location.href)) : sReturnUrl = escape(sReturnUrl);
			sTarget	= '_top';
		} else {
			(sReturnUrl == null)? sReturnUrl = escape(location.href) : sReturnUrl = escape(sReturnUrl);
			sTarget	= '_self';
		};

		var url = config.signinURL + "?Done=" + sReturnUrl;
		window.open( url, sTarget);
	};
	
	var openFirstInWindowHandle = function() {
		if (openAlertWindow) {
			//var tmpWin = window.open('http://page.china.alibaba.com/shtml/static/alicn_wl.html?iframe_delete=true','_blank','width=468,height=250');
			//tmpWin.focus();
		}
	}
	_self.firstInOpenWin = function() {
		if(_self.isFirstIn()) {
			openAlertWindow = true;
		}
		YUE.on(document,'click', function() {
			openAlertWindow = false;
		});
		YUE.on(get('SearchTextIdx'),'keydown', function() {
			openAlertWindow = false;
		});
		YUE.on(window,'unload',openFirstInWindowHandle);
	}
	
};

function signin() {
	AE.webUser.signin();
}