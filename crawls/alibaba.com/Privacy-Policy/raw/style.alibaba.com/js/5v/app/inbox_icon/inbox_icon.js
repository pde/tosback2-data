// #import app/webenaliint/webenaliint.js

;(function () {
	function InboxIcon() {
		var _self = this;
		var oConfig = {
			getDataUrl: 'http://message.alibaba.com/topmsg/count_unread.do',
			// the js where it contain the message data
			inboxUrl: 'http://message.alibaba.com/feedback/default.htm?routeto=inbox',
			// inbox url
			bulkUrl: 'http://message.alibaba.com/feedback/default.htm?routeto=spam',
			// bulk url [NOT USED]
			atmUrl: 'http://trademanager.alibaba.com/',
			//trade manager url
			/*
			inboxIcon: {
				elementId: 'inboxIcon',
				styleDisplay: 'none',
				linkEnable: false
			},
			*/
			inboxNum: {
				elementId: 'inboxNum',
				styleDisplay: 'none',
				linkEnable: false
			},
			welcomeBox: {
				elementId: 'log-info'
			}
		};
		//var objInboxIcon = oConfig.inboxIcon;
		var objInboxNum = oConfig.inboxNum;
		var objWelcomeBox = oConfig.welcomeBox;
		var messageData = {
			inbox: -1,
			// init inbox amount
			bulk: -1,
			// init bulk amount [NOT USED]
			dataReady: true // init data ready status
		};
		var statusReady = {
			isUserStatusReady: false,
			// user's status
			isUserLogin: false,
			// user login status
			isNeedCheckMessage: false,
			// need check message status
			memberSeq: '' // member seq number from cookies
		};
		var separator = ' ';
		var sysLanguage = navigator.browserLanguage ? navigator.browserLanguage : navigator.language;
		var defConfig, msgConfig;
		_self.userStatusMgr = function () {
			var _user = this;
			var userStatus = {
				isNew: false,
				isLoggedIn: false,
				formChina: false,
				firstIn: false,
				firstName: '',
				serviceType: '',
				memberSeq: ''
			};
			var clearSignInInfo = function () {
					userStatus.isNew = true;
					userStatus.isLoggedIn = false;
					userStatus.formChina = false;
					userStatus.firstIn = false;
					userStatus.firstName = '';
					userStatus.serviceType = '';
					userStatus.memberSeq = '';
					//statusReady infomation update
					statusReady.isUserLogin = false;
				};
			var doInitUserStatus = function () {
					try {
						var isLoginCookie = AE.util.getCookie('xman_us_t');
						var userCookie = AE.util.getCookie('xman_us_f');
						if (isLoginCookie && isLoginCookie.indexOf('sign=y') !== -1) {
							userStatus.isLoggedIn = true;
							statusReady.isUserLogin = true;
						}
						var userReg = /x_user=([^&]+)/;
						if (userCookie && userReg.test(userCookie)) {
							userCookie.match(userReg);
							userCookie = RegExp.$1;
							userCookie = userCookie.split('|');
							if (userCookie.length < 5) {
								clearSignInInfo();
							} else {
								userStatus.firstName = userCookie[1];
								userStatus.serviceType = userCookie[3];
								userStatus.memberSeq = userCookie[4];
							}
						} else {
							clearSignInInfo();
						}
						if (_user.hasLoggedIn()) {
							if (_user.getServiceType() == 'cgs' || _user.getServiceType() == 'hkgs' || _user.getServiceType() == 'gs' || _user.getServiceType() == 'cfm' || _user.getServiceType() == 'twgs') {
								userStatus.fromChina = true;
							} else {
								userStatus.fromChina = false;
							}
						} else {
							if (_user.getServiceType() == 'cgs' || _user.getServiceType() == 'hkgs' || _user.getServiceType() == 'gs' || _user.getServiceType() == 'cfm' || _user.getServiceType() == 'twgs') {
								userStatus.fromChina = true;
							} else if (_user.getServiceType()) {
								userStatus.fromChina = false;
							} else {
								if (sysLanguage.toLowerCase() == 'zh-cn') {
									userStatus.fromChina = true;
								} else {
									userStatus.fromChina = false;
								}
							}
						}
						if (AE.util.getCookie('ali_intl_firstIn').isEmpty()) {
							userStatus.firstIn = true;
							AE.util.setCookie('ali_intl_firstIn', 'n', true);
						}
						statusReady.isUserStatusReady = true;
						return true;
					} catch (e) {
						statusReady.isUserStatusReady = false;
						return false;
					}
				};
			_user.hasLoggedIn = function () {
				return userStatus.isLoggedIn;
			};
			_user.getFirstName = function () {
				return userStatus.firstName;
			};
			_user.getServiceType = function () {
				return userStatus.serviceType;
			};
			_user.isChinaUser = function () {
				return userStatus.fromChina;
			};
			_user.isFirstIn = function () {
				return userStatus.firstIn;
			};
			_user.getMemberSeq = function () {
				return userStatus.memberSeq;
			};
			_user.isNewUser = function () {
				return userStatus.isNew;
			}
			var switchByUserStatus = function () {
					//if _user.isNewUser() == true then _user.getFirstName() == ''
					//so there is no use for determine _user.isNewUser()
					if (!_user.isFirstIn()) {
						if (YAHOO.lang.trim(_user.getFirstName()).length > 0) {
							//no matter whether user has logged in
							statusReady.isNeedCheckMessage = true;
							statusReady.memberSeq = _user.getMemberSeq();
						} else {
							if (_user.isNewUser()) {
								//if there is no user infomation
								//put function to program queue, delay execution 0
								setTimeout(function () {
									if (get(objWelcomeBox.elementId) && !YUD.hasClass(objWelcomeBox.elementId, 'AE:noLoginMsg')) {
										var hasInstalled = checkInstallEnaliint();
										if (hasInstalled == '-1') {
											get(objWelcomeBox.elementId).innerHTML += ' Chat online free with <a href="' + defConfig.atmUrl + '" style="font-weight:bold;text-decoration:underline;" rel="nofollow">TradeManager</a>';
										}
									}
								}, 0);
							}
						}
					} else {
						//_user.isChinaUser() && !_user.isNewUser()
						if (!_user.isNewUser() && YAHOO.lang.trim(_user.getFirstName()).length > 0) {
							//put function to program queue, delay execution 0
							setTimeout(function () {
								if (get(objWelcomeBox.elementId) && !YUD.hasClass(objWelcomeBox.elementId, 'AE:noLoginMsg')) {
									if (statusReady.isUserLogin) {
										if ( !! defConfig.businessRole && defConfig.businessRole == 'BusinessRole[buyer]') {
											get(objWelcomeBox.elementId).innerHTML = '<a href="http://sh.vip.alibaba.com/product/buyoffer/post_buying_lead.htm" rel="nofollow" style="font-weight:bold;text-decoration:underline;">Post your Buying Leads free</a>' + separator + get(objWelcomeBox.elementId).innerHTML;
										} else {
											get(objWelcomeBox.elementId).innerHTML = '<a href="http://sh.vip.alibaba.com/product/post_product.htm" rel="nofollow" style="font-weight:bold;text-decoration:underline;">Display your Products free</a>' + separator + get(objWelcomeBox.elementId).innerHTML;
										}
									} else {
										get(objWelcomeBox.elementId).innerHTML += separator + 'Chat online free with <a href="' + defConfig.atmUrl + '" rel="nofollow" style="font-weight:bold;text-decoration:underline;">TradeManager</a>';
									}
								}
							}, 0);
						}
					}
				};
			_user.init = function () {
				if (doInitUserStatus()) {
					switchByUserStatus();
				}
			}
		};
		this.afterGetMessageEvent = new YAHOO.util.CustomEvent("afterGetMessage", this, false, YAHOO.util.CustomEvent.FLAT);
		_self.unreadMessageMgr = function () {
			var _msg = this;
			_msg.getCurrentData = function () {
				try {
					if (typeof (top_msgdata) === 'object') {
						msgConfig.inbox = top_msgdata.inbox;
						msgConfig.bulk = top_msgdata.bulk;
						_self.afterGetMessageEvent.fire();
					} else {
						msgConfig.dataReady = false;
					}
				} catch (e) {
					msgConfig.dataReady = false;
					return;
				}
			};
			_msg.doGetMessage = function () {
				var random = new Date();
				var thisUrl = defConfig.getDataUrl + '?returnParams=top_msgdata&t=' + random;
				YAHOO.util.Get.script(thisUrl, {
					onSuccess: goNext
				});
			}
		};
		_self.containerMgr = function () {
			var _ctn = this;
			_ctn.checkMessage = function () {
				//there is no use to detemine statusReady.isNeedCheckMessage, because statusReady.isNeedCheckMessage must be true
				//show objInboxNum
				if (msgConfig.inbox > 0) {
					//alert(objInboxNum.styleDisplay);
					objInboxNum.styleDisplay = '';
					if (statusReady.isUserLogin) {
						var inboxNumShow = (msgConfig.inbox > 999) ? '999+' : msgConfig.inbox;
						if (objInboxNum.linkEnable) {
							get(objInboxNum.elementId).innerHTML = '(<a href="' + defConfig.inboxUrl + '" rel="nofollow" class="num">' + inboxNumShow + '</a>)';
						} else {
							get(objInboxNum.elementId).innerHTML = '(<span class="num">' + inboxNumShow + '</span>)';
						}
					} else {
						if (objInboxNum.linkEnable) {
							get(objInboxNum.elementId).innerHTML = '( <a href="' + defConfig.inboxUrl + '" class="num" rel="nofollow"><img src="' + globalImgServer + '/images/eng/style/icon/no_read.gif" border="0" /></a> )';
						} else {
							get(objInboxNum.elementId).innerHTML = '( <img src="' + globalImgServer + '/images/eng/style/icon/no_read.gif" border="0" /> )';
						}
					}
				}
				//show log info
				setTimeout(function () {
					if (get(objWelcomeBox.elementId) && !YUD.hasClass(objWelcomeBox.elementId, 'AE:noLoginMsg')) {
						//check whether user has installed TM 2009
						var hasInstalled = checkInstallEnaliint();
						//user havn't installed TM 2009
						if (hasInstalled == '-1') {
							//alert("Not Installed TradeManager Soft!");
							if (statusReady.isUserLogin) {
								if (msgConfig.inbox > 0) {
									//alert("Old User Login and Has Message");
									var inboxNumShow = (msgConfig.inbox > 999) ? '999+' : msgConfig.inbox;
									get(objWelcomeBox.elementId).innerHTML = '<a href="' + defConfig.inboxUrl + '" rel="nofollow" style="font-weight:bold;text-decoration:underline;">You have ' + inboxNumShow + ' new messages</a>' + separator + get(objWelcomeBox.elementId).innerHTML;
								} else {
									//alert("Old User no Login Has new Message!");
									get(objWelcomeBox.elementId).innerHTML = 'Chat online free with <a href="' + defConfig.atmUrl + '" style="font-weight:bold;text-decoration:underline;" rel="nofollow">TradeManager</a>' + separator + get(objWelcomeBox.elementId).innerHTML;
								}
							} else {
								//alert("not login and / not install / older");
								get(objWelcomeBox.elementId).innerHTML += separator + 'Chat online free with <a href="' + defConfig.atmUrl + '" style="font-weight:bold;text-decoration:underline;" rel="nofollow">TradeManager</a>';
							}
						}
						//user havs installed TM 2009
						else {
							//alert("New User Install TradeManager!");
							if (statusReady.isUserLogin) {
								if (msgConfig.inbox > 0) {
									//alert("Old User Login and Has Message");
									var inboxNumShow = (msgConfig.inbox > 999) ? '999+' : msgConfig.inbox;
									get(objWelcomeBox.elementId).innerHTML = '<a href="' + defConfig.inboxUrl + '" style="font-weight:bold;text-decoration:underline;" rel="nofollow">You have ' + inboxNumShow + ' new messages</a>' + separator + get(objWelcomeBox.elementId).innerHTML;
								} else {
									//business role buyer / seller / both
									if ( !! defConfig.businessRole && defConfig.businessRole == 'BusinessRole[buyer]') {
										//alert("Old User Login and Message None,Is Buyer");
										get(objWelcomeBox.elementId).innerHTML = '<a href="http://us.my.alibaba.com/product/buyoffer/post_buying_lead.htm" style="font-weight:bold;text-decoration:underline;" rel="nofollow">Post your Buying Leads free</a>' + separator + get(objWelcomeBox.elementId).innerHTML;
									} else {
										//alert("Old User Login and Not Message ,Is Not Buyer");
										get(objWelcomeBox.elementId).innerHTML = '<a href="http://us.my.alibaba.com/product/post_product.htm" style="font-weight:bold;text-decoration:underline;" rel="nofollow">Display your Products free</a>' + separator + get(objWelcomeBox.elementId).innerHTML;
									}
								}
							} else {
								if (msgConfig.inbox > 0) {
									//alert("Old User Login Out and Has Message");
									get(objWelcomeBox.elementId).innerHTML += separator + '<a href="' + defConfig.inboxUrl + '" style="font-weight:bold;text-decoration:underline;" rel="nofollow">You have new messages</a>';
								} else {
									//alert("Old User Login Out and Message None");
									get(objWelcomeBox.elementId).innerHTML += separator + '<a href="http://us.my.alibaba.com/user/join.biz?cd=0" rel="nofollow">Join Free</a>';
								}
							}
						}
					}
				}, 0);
			};
			_ctn.setDataToCtn = function () {
				if (get(defConfig.targetCtn) && get(defConfig.targetCtn).getElementsByTagName('strong')[0]) {
					dataCtn = get(defConfig.targetCtn).getElementsByTagName('strong')[0];
					dataCtn.innerHTML = msgConfig.inbox;
				}
				//YUD.setStyle(objInboxIcon.elementId, 'display', objInboxIcon.styleDisplay);
				YUD.setStyle(objInboxNum.elementId, 'display', objInboxNum.styleDisplay);
			};
			_ctn.init = function () {
				_ctn.checkMessage();
				if (msgConfig.dataReady) {
					_ctn.setDataToCtn();
				}
			}
		};
		var userStatus = new _self.userStatusMgr();
		var unreadMsg = new _self.unreadMessageMgr();
		var linkCtn = new _self.containerMgr();
		var goNext = function () {
				unreadMsg.getCurrentData();
				linkCtn.init();
			};
		_self.init = function (config, mConfig) {
			defConfig = YL.merge(oConfig, config || {});
			msgConfig = YL.merge(messageData, mConfig || {});
			userStatus.init();
			//if _user.isNewUser() == true then statusReady.isNeedCheckMessage == false
			//so there is no use for determine _user.isNewUser()
			if (statusReady.isNeedCheckMessage) {
				// if user is not from China, HongKong, Taiwan, Macao do get message data
				unreadMsg.doGetMessage(mConfig);
			}
		};
	}

	AE.namespace('run').inboxIcon = InboxIcon;
}());