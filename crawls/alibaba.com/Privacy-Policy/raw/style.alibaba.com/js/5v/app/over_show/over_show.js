/**
 * AE Widget Module - overShow
 * Copyright (c) 2011 Alibaba.Com, Inc.
 * MIT Licensed
 * @module AE.widget.overShow
 */

AE.define('app.OverShow', function (exports) {
	var YL = YAHOO.lang,
		YUD = YAHOO.util.Dom,
		YUE = YAHOO.util.Event,
		get = YUD.get;
		
	/** 
		 AE Widget Module - overShow <br />
		 适用场景：需要遮挡表单元素，内容区块有关闭按钮，需要显示前后自定义事件<br />
		 <a href="http://style.aliui.com/js/5v/app/over_show/demo/demo.html" target="_blank">点击查看demo</a><br />
		※ 控件使用请注意：	<br />
		- 为了解决IE6表单控件穿出问题，maskIframe样式为必须。<br />
		- 为了解决IE HTTPS下IFRAME报错，空白页（globalImgServer + "/js/blank.html"）为必须。<br />
		- config.targetId的z-index为必须，iframe和content的z-index值将参照其自动设定
		 @class AE.widget.overShow
	 */
	function OverShow() {
		var _self = this;
		
		var defConfig = {
			/** 
				激活目标元素
				@property config.targetId {String/Dom}
				@dafault "clickShowTargetId"
			*/
		  targetId: "overShowTargetId",
			/** 
				可选触发元素 targetEl比targetId优先级更高
				@property config.targetEl {String/Dom}
				@dafault null
			*/
		  targetEl: null,
			/** 
				相对于该元素定位
				@property config.positionId {String/Dom}
				@dafault false
			*/
		  positionId: false,
			/** 
				激活显示内容元素
				@property config.contentId {String/Dom}
				@dafault "overShowContentId"
			*/
		  contentId: "overShowContentId",
			/** 
				显示延迟时间
				@property config.showDelayTime {int}
				@dafault 200
			*/
		  showDelayTime: 200,
			/** 
				隐藏延迟时间
				@property config.showDelayTime {int}
				@dafault 200
			*/
		  hiddenDelayTime: 200,
			/** 
				相对坐标
				@property config.excursion {array}
				@dafault [0, 0]
			*/
		  excursion: [0, 0],
			/** 
				是否需要遮罩
				@property config.needMask {Boolean}
				@default false
			*/
		  needMask: false,
			/** 
				需要相对config.excursion定位
				@property config.needXY {Boolean}
				@default true
			*/
		  needXY: true,
			/** 
				关闭按钮的className 必须置于content元素内
				@property config.closeBtnClass {String}
				@default "close-button"
			*/
		  closeBtnClass: "close-button",
			/** 
				遮罩样式名称(遮挡 IE6 表单控件) <br />
				.maskIframe{position:absolute;z-index:1;width:1px;height:1px;top:0px;left:0px;border:0px;background:#fff;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;}
				@property config.maskIframeClassName {String}
				@default "maskIframe"
			*/
			maskIframeClassName : "maskIframe",
			/** 
				遮罩IFRAME路径(为了解决IE HTTPS下IFRAME报错)
				@property config.iframeMaskSrc {String}
				@default globalImgServer + "/js/blank.html"
			*/
			iframeMaskSrc : globalImgServer + "/js/blank.html"
		};
		var config;
		var isInited = false;
		var dTarget, dPosition, dContent, iframeMask;
		var delayTimer = false;
		var canClose = true,
			contentShowed = false,
			holded = false;
		_self.hold = function () {
			holded = true;
		};
		_self.setFree = function () {
			holded = false;
		};
		/** 
		 * 立即显示后自定义事件
		 * @event afterShow
		 * @param dTarget {string/dom} 返回目标元素
		 * @public
		*/
		_self.afterShow = new YAHOO.util.CustomEvent("afterShow", _self);
		/** 
		 * 延迟显示后自定义事件
		 * @event afterShowDelay
		 * @param dTarget {string/dom} 返回目标元素
		 * @public
		*/
		_self.afterShowDelay = new YAHOO.util.CustomEvent("afterShowDelay", _self);
		/** 
		 * 立即隐藏后自定义事件
		 * @event afterHidden
		 * @public
		*/
		_self.afterHidden = new YAHOO.util.CustomEvent("afterHidden", _self);
		/** 
		 * 延迟隐藏后自定义事件
		 * @event afterHiddenDelay
		 * @public
		*/
		_self.afterHiddenDelay = new YAHOO.util.CustomEvent("afterHiddenDelay", _self);
		/**
			初始化
			@method init
			@param oConfig {Object} 初始化参数配置，参见config属性
			@return this {Object}
		*/
		_self.init = function (oConfig) {
			if (isInited) return false;
			config = YL.merge(defConfig, oConfig);
			// 公有化config
			_self.config = config;
			if (!config.targetEl) {
				dTarget = get(config.targetId);
			} else {
				dTarget = config.targetEl;
			}
			dPosition = config.positionId ? get(config.positionId) : false;
			dContent = get(config.contentId);
			YUE.on(dTarget, "mouseover", _self.showDelay);
			YUE.on(dTarget, "mouseout", _self.hiddenDelay);
			YUE.on(dContent, "mouseout", _self.hiddenDelay);
			YUE.on(dTarget, "mouseover", function () {
				canClose = false;
			});
			YUE.on(dContent, "mouseover", function () {
				canClose = false;
			});
			YUE.on(dTarget, "mouseout", function () {
				canClose = true;
			});
			YUE.on(dContent, "mouseout", function () {
				canClose = true;
			});
			if (config.needMask) {
				iframeMask = document.createElement("iframe");
				iframeMask.className = config.maskIframeClassName;
				iframeMask.style.display = "none";
				if (YAHOO.env.ua.ie === 6 && location.protocol == "https:") {
					iframeMask.src = config.iframeMaskSrc;
				}
				iframeMask.style.zIndex = YUD.getStyle(dContent, 'zIndex') - 1;
				iframeMask.style.top = "0px";
				iframeMask.style.left = "0px";
				iframeMask.frameBorder = 0;
				dContent.parentNode.appendChild(iframeMask);
			}
			var closeBtns = YUD.getElementsByClassName(config.closeBtnClass, "*", dContent);
			if (closeBtns) {
				YUE.on(closeBtns, "click", function () {
					canClose = true;
					_self.hiddenDirectly();
				});
			}
			return _self;
		};
		_self._onDContentMouseOver = function (e) {
			if (!dTarget || dTarget == undefined) {
				return;
			}
			_self.afterShowDelay.fire(dTarget);
			if (delayTimer) {
				clearTimeout(delayTimer);
			}
			delayTimer = setTimeout(function () {
				_self.showDirectly();
			}, config.showDelayTime);
		};
		/**
			延迟显示
			@method showDelay
			@public
		*/
		_self.showDelay = function (e) {
			//当内容显示出来的时候再绑定mouseover事件
			YUE.on(dContent, "mouseover", _self._onDContentMouseOver);
			if (dTarget != this) {
				canClose = true;
				_self.hiddenDirectly();
			}
			dTarget = this;
			_self.afterShowDelay.fire(dTarget);
			if (delayTimer) {
				clearTimeout(delayTimer);
			}
			delayTimer = setTimeout(function () {
				_self.showDirectly();
			}, config.showDelayTime);
		};
		/**
			直接显示
			@method showDirectly
			@public
		*/
		_self.showDirectly = function () {
			if (contentShowed || holded) {
				return;
			}
			dContent.style.visibility = 'hidden';
			dContent.style.display = "";
			if (config.needXY) {
				var xy = YUD.getXY(dPosition || dTarget);
				parsePos(dTarget, config.excursion);
				xy[0] += config.excursion[0];
				xy[1] += config.excursion[1];
			}
			dContent.style.visibility = 'visible';
			dContent.style.display = '';
			if (config.needXY) {
				YUD.setXY(dContent, xy);
			}
			// Star 注释,此语句在某些情况下使用会有问题
			//YUD.setStyle(dContent,'opacity',1);
			_self.afterShow.fire(dTarget);
			contentShowed = true;
			if (config.needMask) {
				iframeMask.style.display = "";
				iframeMask.style.width = dContent.offsetWidth + "px";
				iframeMask.style.height = dContent.offsetHeight + "px";
				if (config.needXY) {
					YUD.setXY(iframeMask, xy);
				}
				iframeMask.style.visibility = "visible";
			}
		};
		/**
			延迟隐藏
			@method hiddenDelay
			@public
		*/
		_self.hiddenDelay = function (e) {
			_self.afterHiddenDelay.fire();
			if (holded == true) {
				return;
			}
			// Star 注释,此语句会使作用于同一个DOM的事件失效
			//YUE.stopEvent(e);
			if (delayTimer) {
				clearTimeout(delayTimer);
			}
			delayTimer = setTimeout(_self.hiddenDirectly, config.hiddenDelayTime);
		};
		/**
			直接隐藏
			@method hiddenDirectly
			@public
		*/
		_self.hiddenDirectly = function () {
			contentShowed = false;
			if(dContent.style.display == "none")return;
			//当内容消失的时候，取消mouseover的绑定，从此可以批量进行overshow的初始化
			YUE.removeListener(dContent, 'mouseover', _self._onDContentMouseOver);
			if (!canClose) {
				return false;
			}
			_self.afterHidden.fire();
			if (dContent) {
				dContent.style.display = "none";
			}
			if (config.needMask) {
				iframeMask.style.display = "none";
			}
		};
		
		/**
			获取内容dom
			@method getContent
			@return {DOM}
			@public
		*/
		_self.getContent = function(){
			return dContent || null;
		};
		/**
			计算坐标
			@method parsePos
			@param dTarget {string / dom} 相对元素
			@param aPos {array} 相对值
			@private
			@return aPos {Array}
		*/
		var parsePos = function (dTarget, aPos) {
				if (typeof (aPos[0]) == 'string') {
					if (aPos[0] == 'auto') {
						(isContentOverflow()) ? aPos[0] = 'right' : aPos[0] = 'left';
					}
					switch (aPos[0]) {
					case 'center':
						aPos[0] = parseInt(dPosition ? (dPosition.offsetWidth - dContent.offsetWidth) / 2 : (dTarget.offsetWidth - dContent.offsetWidth) / 2);
						break;
					case 'right':
						aPos[0] = ((dPosition ? dPosition.offsetWidth : dTarget.offsetWidth) - dContent.offsetWidth);
						break;
					default:
						aPos[0] = 0;
					}
				}
				if (typeof (aPos[1]) == 'string') {
					switch (aPos[1]) {
					case 'center':
						aPos[1] = parseInt(dPosition ? (dPosition.offsetHeight - dContent.offsetHeight) / 2 : (dTarget.offsetHeight - dContent.offsetHeight) / 2);
						break;
					case 'bottom':
						aPos[1] = dPosition ? dPosition.offsetHeight : dTarget.offsetHeight;
						break;
					default:
						aPos[1] = 0;
					}
				}
				return aPos;
			};
		/**
			判断是否超出边界
			@method isContentOverflow
			@private
			@return flag {boolean}
		*/
		var isContentOverflow = function () {
				return document.body.offsetWidth < (YUD.getX(dPosition || dTarget) + dContent.offsetWidth);
			};
	}

	exports.create = function (config) {
		var instance = new OverShow();
		instance.init(config);
		return instance;
	};

	exports.ctor = OverShow;

}).use(function (OverShow) {
	AE.namespace('widget').overShow = OverShow.ctor;
});