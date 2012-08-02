/*
 * ATM 通用接口 by mk-17290 20100408 
 * .atm : atm plugin/ActiveXObject实例 
 * .atmClientFlag : TradeManger客户端版本标识,-1:未安装; 0:<6.0版本; 1:6.0及以上版本; 2: firefox(6.0及以上版本) 3: for Chrome版本 
 * .isBrowserSupport : 浏览器支持情况 
 * .isPluginReady() : 检测firefox&chrome plugin是否安装并启用 
 * .isNeedUpdatePlugin() : 检测是否需要升级firefox&chrome插件 
 * .isClientReady() : 检测TradeManger客户端是否已安装 
 * .isReady() : 检测执行ATM客户端指令的条件是否已经具备 
 * .getClientFlag() : 返回ATM客户端安装状态标识atmClientFlag 
 * .downloadClient() : 打开客户端下载页面 param: cancelAction 可选，用户点取消后的动作 
 * .installPlugin() : 安装firefox&chrome plugin. param: cancelAction 可选，用户点取消后的动作
 * .updatePlugin() : 升级firefox&chrome plugin. param: cancelAction 可选，用户点取消后的动作 
 * .execCommand() : 通过atm plugin/ActiveXObject执行ATM客户端指令 
 * .sendClientMsg() : 通过atm plugin/ActiveXObject发消息 
 * .startATM() : 启动ATM客户端
 */

(function() {
	function ctor() {
		var _self = this,
			cfg = {
				// 用于Firefox插件升级,如此处设置的更新版本是1.0.0.1
				// 则程序会用1.0.0.1和当前插件版本比对,如果大于当前版本,会提示用户升级
				// 修改此值前请先将插件布署到服务器
				updateVersion: '1.0.0.1',
				// Firefox&Chrome plugin下载安装地址
				pluginDownloadUrl: 'http://download.wangwang.1688.com/aliim/AliIM6_ATM/bin/TMnpSetup.exe',
				// ATM客户端(WW)下载页面
				clientDownloadUrl: 'http://trademanager.alibaba.com/'
			},
			pluginMime = navigator.mimeTypes["application/atm-plugin"],
			isIE = function() {
				return navigator.appName == "Microsoft Internet Explorer";
			},
			isFirefox = function(ver) {
				var _match = navigator.userAgent.match(/Firefox\/(\d*)\..*/i);
				if (_match) {
					_self.firefoxVer = parseFloat(_match[1]);
				} else {
					_self.firefoxVer = "";
				}
				return !!_match && parseFloat(_match[1]) >= (ver || 1.5);
			},
			isMac = function() {
				return (navigator.platform.indexOf("Mac") > -1);
			},
			isChrome = function() {
				return (window.navigator.userAgent.indexOf("Chrome") !== -1);
			},
			isOpera = function() {
				return (window.navigator.userAgent.indexOf("opera") !== -1);
			},
			isSafari = function() {
				return (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1);
			},
			// 获取atm plugin/ActiveXObject实例并检测客户端版本
			getAtm = function() {
				if (arguments.callee.counter == 1) {
					return;
				}
				if (isMac()) {
					var mimetype = navigator.mimeTypes["application/ww-plugin"];
					if (mimetype) {
						var plugin = document.createElement("embed");
						plugin.setAttribute('type', 'application/ww-plugin');
						plugin.style.visibility = "hidden";
						plugin.style.width = 0;
						plugin.style.height = 0;
						document.body.appendChild(plugin);
						_self.atm = plugin;
						if (plugin.isMacWWInstalled()) {
							_self.atmClientFlag = 3;
						}
						plugin.parentNode.removeChild(plugin);
					}
				} else {
					if (isIE()) {
						try {
							// ATM 客户端6.0及以上版本
							_self.atm = new ActiveXObject("aliimx.atmx");
							_self.atm.GetWangWangVersion();
							_self.atmClientFlag = 1;
						} catch (e) {
							try {
								// ATM 客户端6.0以下版本
								_self.atm = new ActiveXObject("TradeManagerSetup.Install.1");
								_self.atmClientFlag = 0;
							} catch (ex) {}
						}
					} else if (isFirefox() || isChrome()) {
						if (document.getElementById("chk_atm") == null) {
							var dDiv = document.createElement('DIV');
							dDiv.style.height = '1px';
							dDiv.style.width = '1px';
							dDiv.style.overflow = 'hidden';
							dDiv.innerHTML = "<embed id=\"chk_atm\" name=\"chk_atm\" type=\"application/atm-plugin\" width=1 height=1 hidden=\"true\" >";
							document.body.appendChild(dDiv);
							_self.atm = document.getElementById("chk_atm");
							if (!_self.isNeedUpdatePlugin()) {
								// 判断客户端是否安装,国际站判断2(Trade Manger)即可,可传递不同参数, 0:wangwang; 1:aliim; 2:trademanger
								try {
									if (_self.atm.isInstalled(2) == 1) {
										_self.atmClientFlag = 2;
									}
								} catch (e) {}
							}
						}
					}
				}
				arguments.callee.counter = 1;
			},
			buildQuery = function(query) {
				if (query !== undefined && query !== '') {
					if (query.substring(0, 1) != '&') {
						return '&' + query;
					}
					return query;
				}
				return '';
			};
		this.atm = null;
		this.atmClientFlag = -1;
		this.firstClick = true; // lazy alert
		if (isMac()) {
			this.isBrowserSupport = isFirefox() || isChrome() || isOpera() || isSafari();
		} else {
			this.isBrowserSupport = isIE() || isFirefox() || isChrome();
		}
		this.isPluginReady = function() {
			if (isMac()) {
				return true;
			}
			if (isFirefox() || isChrome()) {
				return (!!pluginMime && !!pluginMime.enabledPlugin);
			}
			return true;
		};
		this.isNeedUpdatePlugin = function() {
			if (isFirefox()) {
				try {
					return this.isPluginReady()
							&& (parseInt(pluginMime.enabledPlugin.version.replace(/\./g, ''), 10) < parseInt(
								cfg.updateVersion.replace(/\./g, ''), 10));
				} catch (e) {
					return false;
				}
			} else if (isChrome()) {
				try {
					return this.atm
							&& (parseInt(this.atm.NPWWVersion().replace(/\./g, ''), 10) < parseInt(cfg.updateVersion
										.replace(/\./g, ''), 10));
				} catch (e) {
					return false;
				}
			}
		};
		this.isClientReady = function() {
			if (this.isPluginReady()) {
				getAtm();
				return this.atmClientFlag != -1;
			}
			return false;
		};
		this.isReady = function() {
			var CALLEE = arguments.callee;
			if (CALLEE.isPass === undefined) {
				CALLEE.isPass = this.isBrowserSupport && this.isClientReady();
			}
			return CALLEE.isPass;
		};
		this.getClientFlag = function() {
			if (this.isClientReady()) {
				return this.atmClientFlag;
			}
			return -1;
		};
		this.downloadClient = function(cancelAction) {
			if (confirm('you must first install TradeManager.\nClick the Confirm button to download it.')) {
				window.open(cfg.clientDownloadUrl);
			} else if (typeof cancelAction == 'function') {
				cancelAction.call(this);
			}
		};
		this._installPlugin = function() {
			if (isFirefox()) {
				if (isMac() && window.InstallTrigger) {
					// 参见:https://developer.mozilla.org/en/Installing_Extensions_and_Themes_From_Web_Pages
					InstallTrigger.install({
						'Alibaba TradeManager plug-in': {
							URL: cfg.pluginDownloadUrl,
							toString: function() {
								return cfg.pluginDownloadUrl;
							}
						}
					});
				} else {
					window.open(cfg.pluginDownloadUrl);
				}
			} else if (isChrome()) {
				window.open(cfg.pluginDownloadUrl);
			}
		};
		this.installPlugin = function(cancelAction) {
			if (this.firstClick && (isFirefox() || isChrome())
					&& confirm('You need the TradeManager plug-in.\nClick the Confirm button to install it.')) {
				this._installPlugin();
			} else if (typeof cancelAction == 'function') {
				cancelAction.call(this);
			}
			this.firstClick = false;
		};
		this.updatePlugin = function(cancelAction) {
			if ((isFirefox() || isChrome())
					&& confirm('You need update the TradeManager plug-in.\nClick the Confirm button to update it.')) {
				this._installPlugin();
			} else if (typeof cancelAction == 'function') {
				cancelAction.call(this);
			}
		};
		this.execCommand = function(cmd) {
			if (!this.isReady()) {
				return false;
			}
			switch (this.atmClientFlag) {
				case 0:
					window.location = cmd;
					break;
				case 1:
					this.atm.ExecCmd(cmd);
					break;
				case 2:
					this.atm.SendCommand(cmd, 2);
					break;
				case 3:
					window.location = cmd;
					break;
			}
		};
		this.sendClientMsg = function(fromSite, fromUid, toSite, toUid, imstatus, extraQuery) {
			if (!this.isReady()) {
				return false;
			}
			if (fromSite === '') {
				fromSite = toSite;
			}
			switch (this.atmClientFlag) {
				case 0:
					this.execCommand('TradeManager:SendIM_Encrypted?' + toUid);
					break;
				case 1:
					if (imstatus == 4) {
						this.execCommand('aliim:smssendmsg?uid=' + fromSite + fromUid + '&touid=' + toUid + '&suid='
								+ fromUid + '&encrypt=true');
					} else {
						this.execCommand('aliim:sendmsg?uid=' + fromSite + fromUid + '&touid=' + toUid + '&siteid='
								+ toSite + '&status=' + imstatus + buildQuery(extraQuery));
					}
					break;
				case 2:
					this.execCommand('aliim:sendmsg?uid=' + fromSite + fromUid + '&touid=' + toUid + '&siteid='
							+ toSite + '&status=' + imstatus + buildQuery(extraQuery));
					break;
				case 3:
					this.execCommand('aliim:sendmsg?uid=' + fromSite + fromUid + '&touid=' + encodeURIComponent(toUid)
							+ '&siteid=' + toSite + '&status=' + imstatus + buildQuery(extraQuery));
			}
		};
		this.addContact = function(fromSite, fromUid, toSite, toUid, query) {
			if (!this.isReady()) {
				return false;
			}
			if (this.atmClientFlag === 0) {
				this.execCommand('Trademanager:AddContact?uid=' + toUid + '&checkcrm=true');
				setTimeout(function() {
					window.close();
				}, "500");
			} else if (this.atmClientFlag == 1 || this.atmClientFlag == 2 || this.atmClientFlag == 3) {
				this.execCommand('aliim:addcontact?uid=' + fromSite + fromUid + '&touid=' + toSite + toUid
						+ buildQuery(query));
				setTimeout(function() {
					window.close();
				}, "500");
			}
		};
		this.startATM = function(siteid, uid, query) {
			if (!this.isReady()) {
				return false;
			}
			if (this.atmClientFlag === 0) {
				this.execCommand('TradeManager:');
			} else if (this.atmClientFlag == 1 || this.atmClientFlag == 2) {
				this.execCommand('aliim:login?uid=' + uid + '&autologin=0&weblogin=1' + buildQuery(query));
			}
		};
	}
	
	window.ATMAPI = new ctor();
	
	/*
	 * 以下代码为兼容现有网站应用, 不建议在新程序中使用。
	 */
	window.checkInstallEnaliint = function() {
		return ATMAPI.getClientFlag();
	};
	
	window.sendClientMsg = function() {
		return ATMAPI.sendClientMsg.apply(ATMAPI, arguments);
	};
	
	window.addContact = function() {
		return ATMAPI.addContact.apply(ATMAPI, arguments);
	};
	
	window.startWW = function() {
		return ATMAPI.startWW.apply(ATMAPI, arguments);
	};
	
	window.checkIE = function() {
		return navigator.appName == "Microsoft Internet Explorer";
	};
	
	window.checkIEorFirefox = function() {
		return ATMAPI.isBrowserSupport;
	};
	
	window.checkFirefoxIsBigThan15 = function() {
		var _match = navigator.userAgent.match(/Firefox\/(\d*)\..*/i);
		return _match && parseFloat(_match[1]) >= 1.5;
	};
}());