if (window.WS) {
	var _WS = window.WS;
}
var WS = {};

WS.Constants = {
	defaultProfileUrl: '//p.webshots.net/images/icon/icon_noProfilePhoto3.jpg'
};

WS.IE = /*@cc_on @_jscript || @*/ false;
WS.ltIE7 = WS.IE && !window.XMLHttpRequest;
WS.gtIE6 = WS.IE && !WS.ltIE7;

WS.Util = {
	activateStylesheet: function(sTitle) {
		var sGroupPrefix = sTitle.slice(0, sTitle.indexOf(':') + 1);
		for (var oLinks = document.getElementsByTagName('link'), i = oLinks.length, oLink, bMatch; i--;) {
			oLink = oLinks[i];
			if (oLink.title && oLink.title.indexOf(sGroupPrefix) == 0) {
				bMatch = oLink.title == sTitle;
				oLink.rel = bMatch ? 'stylesheet' : 'alternate stylesheet';
				oLink.disabled = bMatch; // strange initialization bug in Opera/Safari
				oLink.disabled = !bMatch;
			}
		}
	},
	setFocusHandler: function(oElem, oTarget) {
		oTarget = oTarget || oElem;
		function handleFocus(e) {
			setClass(oTarget, 'focus', e.type == 'focus');
		}
		addEvent(oElem, 'focus', handleFocus);
		addEvent(oElem, 'blur', handleFocus);
	},
	toggleClass: function(oElem, sClassName) {
		var bSet = !hasClass(oElem, sClassName);
		setClass(oElem, sClassName, bSet);
		return bSet;
	},
	getProps: function(o) {
		var oProps = {};
		for (var i = 1, iLen = arguments.length, sProp; i < iLen; i++) {
			sProp = arguments[i];
			if (sProp in o) {
				oProps[sProp] = o[sProp];
			}
		}
		return oProps;
	},
	setProps: function(o, oProps) {
		for (var i in oProps) {
			o[i] = oProps[i];
		}
	}
};
WS.Util.setText = 'textContent' in document.documentElement
	? function(oElem, sText) { return oElem.textContent = sText; }
	: function(oElem, sText) { return oElem.innerText = sText || ''; };

WS.Effects = {
	TweenMethods: {
/*
  Easing Equations v1.5
  May 1, 2003
  (c) 2003 Robert Penner, all rights reserved.
*/
		linearTween: function (t, b, c, d) {
			return c*t/d + b;
		},
		easeInQuad: function (t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function (t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInCubic: function (t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		easeOutCubic: function (t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOutCubic: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		easeInQuart: function (t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		easeOutQuart: function (t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOutQuart: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		easeInQuint: function (t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOutQuint: function (t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOutQuint: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		easeInSine: function (t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOutSine: function (t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOutSine: function (t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeInExpo: function (t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function (t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function (t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOutCirc: function (t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOutCirc: function (t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		easeInElastic: function (t, b, c, d, a, p) {
			if (t==0) return b;
			if ((t/=d)==1) return b+c;
			if (!p) p=d*.3;
			if (a === undefined) a = 0;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOutElastic: function (t, b, c, d, a, p) {
			if (t==0) return b;
			if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a === undefined) a = 0;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		easeInOutElastic: function (t, b, c, d, a, p) {
			if (t==0) return b;
			if ((t/=d/2)==2) return b+c;
			if (!p) p=d*(.3*1.5);
			if (a === undefined) a = 0;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		easeInBack: function (t, b, c, d, s) {
			if (s === undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOutBack: function (t, b, c, d, s) {
			if (s === undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOutBack: function (t, b, c, d, s) {
			if (s === undefined) s = 1.70158;
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		easeInBounce: function (t, b, c, d) {
			return c - WS.Effects.TweenMethods.easeOutBounce (d-t, 0, c, d) + b;
		},
		easeOutBounce: function (t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOutBounce: function (t, b, c, d) {
			if (t < d/2) return WS.Effects.TweenMethods.easeInBounce (t*2, 0, c, d) * .5 + b;
			return WS.Effects.TweenMethods.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	},
	tween: function tween(vElem, sProperty, oArgs) {
		var bOpacity = (sProperty == 'opacity');
		oArgs = mergeObjects(oArgs, {tween: 'easeOutExpo', begin: 0, end: 0, fps: 50, duration: 500, unit: bOpacity ? '' : 'px'});
		var oElem = $(vElem);
		var oStyle = oElem.style;
		var fnTween = WS.Effects.TweenMethods[oArgs.tween];
		var nBegin = +oArgs.begin;
		var nEnd = +oArgs.end;
		var nChange = nEnd - nBegin;
		var nInterval = 1000 / +oArgs.fps;
		var nDuration = +oArgs.duration;
		var sUnit = oArgs.unit;
		var nFrames = 0;
		var nMaxFrames = nDuration / nInterval;

		function ease() {
			var nVal = fnTween(++nFrames, nBegin, nChange, nMaxFrames);
			if (bOpacity) {
				WS.Util.setOpacity(oElem, nVal);
			} else {
				oStyle[sProperty] = nVal + sUnit;
			}
			if (nFrames >= nMaxFrames) {
				clearInterval(oElem.tweenTimer);
				oStyle[sProperty] = nEnd + sUnit;
				if (typeof oArgs.oncomplete == 'function') {
					oArgs.oncomplete.call(oElem);
				}
			}
		}
		if (typeof oArgs.onstart == 'function') {
			oArgs.onstart.call(oElem);
		}
		if ('tweenTimer' in oElem) { // avoid silly strict warning in FF
			clearInterval(oElem.tweenTimer);
		}
		oElem.tweenTimer = setInterval(ease, nInterval);
	}
}

WS.Plugins = {};
WS.Plugins.ColorOptions = {
	init: function() {
		var oColors = $('ab-colors');
		// handle keyboard navigation
		for (var oLinks = oColors.getElementsByTagName('a'), i = oLinks.length; i--;) {
			if (oLinks[i].title.indexOf('color:') == 0) {
				WS.Util.setFocusHandler(oLinks[i], oColors);
			}
		}
		addEvent(oColors, 'click', function(e) {
			var oElem = e.srcElement || e.target;
			if (oElem.tagName == 'A' && oElem.title.indexOf('color: ') == 0) {
				haltEvent(e);
				WS.Util.activateStylesheet(oElem.title);
				var sColor = oElem.title.slice(7);
				setCookie('color', sColor);
				setSkin({
					blue: 'classic',
					teal: 'teal',
					green: 'jungle',
					black: 'blackfriday',
					eggplant: 'eggplant',
					sage: 'sage',
					orange: 'pumpkin',
					red: 'blazing',
					pink: 'valentine'
				}[sColor]); // for backward compatibility with old skins
			}
		});
		addEvent(oColors, 'mouseout', function(e) {
			for (var oElem = e.relatedTarget || e.toElement; oElem; oElem = oElem.parentNode);
			if (!oElem) {
				delClass(oColors, 'focus');
			}
		});
	}
};

WS.Plugins.Search = {
	init: function() {
		try {
			if (getElementById("ab-query")) {
				$('ab-query').focus();
			}
		} catch(err){
			/* #ab-query doesn't exist on the page */
		}
	}
};

if ('opacity' in document.documentElement.style) {
	WS.Util.setOpacity = function(oElem, nOpacity) {
		oElem.style.opacity = nOpacity;
	};
} else {
	WS.Util.setOpacity = function(oElem, nOpacity) {
		if (!oElem.currentStyle.hasLayout) {
			oElem.style.zoom = 1;
		}
		if (oElem.filters && oElem.filters.alpha) {
			oElem.filters.alpha.opacity = nOpacity * 100;
		} else {
			oElem.style.filter += ' alpha(opacity=' + (nOpacity * 100) + ')';
		}
	};
}

WS.Util.dimPage = function(bDim, oArgs) {
	oArgs = mergeObjects(oArgs, {color: '#000', opacity: .5, zIndex: 30200, className: 'div-overlay'});
	var oElem = WS.Util.dimPage.node;
	if (!oElem) {
		oElem = document.createElement('div');
		oElem.className = oArgs.className;
		oElem.style.position = WS.ltIE7 ? 'absolute' : 'fixed';
		oElem.style.width = oElem.style.height = '100%';
		oElem.style.zIndex = oArgs.zIndex;
		WS.Util.dimPage.node = oElem;
	}
	oElem.style.top = oElem.style.left = '-9999px';
	if (bDim) {
		if (WS.ltIE7) {
			oElem.style.width = Math.max(document.documentElement.clientWidth, document.body.clientWidth) + 'px';
			oElem.style.height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) + 'px';
		}
		document.body.insertBefore(oElem, document.body.firstChild);
		WS.Util.setOpacity(oElem, oArgs.opacity);
		oElem.style.background = oArgs.color;
		oElem.style.top = oElem.style.left = 0;
	} else if (oElem.parentNode) {
		oElem.parentNode.removeChild(oElem);
	}
	setClass(document.documentElement, 'dim', bDim);
	return +oElem.style.zIndex;
};

WS.Plugins.Login = {
	openPopup: function(bOpen) {
		var oForm = $('loginForm');
		oForm.style.zIndex = WS.Util.dimPage(bOpen) + 100;
		if (bOpen) {
			oForm.reset();
			oForm.lastParent = oForm.parentNode;
			oForm.lastSibling = oForm.nextSibling;
			document.body.insertBefore(oForm, document.body.firstChild.nextSibling);
			document.documentElement.style.position = 'relative'; // caret fix for FF
			$('login-user').focus();
		} else if (oForm.lastParent) {
			oForm.lastParent.insertBefore(oForm, oForm.lastSibling);
			WS.Util.setText(WS.Plugins.Login.innerMsgBox, '');
			WS.Plugins.Login.outerMsgBox.style.display = 'none';
		}
		setClass(oForm, 'open', bOpen);
	},
	showMessage: function(sText) {
		WS.Util.setText(WS.Plugins.Login.innerMsgBox, sText);
		WS.Plugins.Login.outerMsgBox.style.display = '';
	},
	handleLogin: function(oXHR) {
		var oResponse = eval('(' + oXHR.responseText + ')');
		var oRC = $("reqConfOn");
		var bRC = oRC && oRC.value == "true";
		if (oResponse.c < 0) {
			WS.Plugins.Login.showMessage("Oops!  We don't recognize that member name or password.");
		} else if (bRC && oResponse.cu) {
			location.href = oResponse.cu;
		} else {
			if ($("action") != null && $("action").value == "confirmEmail") {
				location.href = "/";
			} else {
				var done = $('ab-login-done').value;
				if (done) {
					location.href = done;
				} else {
					location.reload(true);
				}
			}
		}
	},
	handleError: function() {
		WS.Plugins.Login.showMessage('There was an internal error.  Please try again later.');
	},
	init: function() {
		var oForm = $('loginForm');

		addEvent($('openLogin'), 'click', function(e) {
			haltEvent(e);
			WS.Plugins.Login.openPopup(true);
		});
		addEvent($('closeLogin'), 'click', function() {
			WS.Plugins.Login.openPopup(false);
		});

		var oDiv = document.createElement('div');
		oDiv.innerHTML = '<div class="ab-status"><p><strong></strong></p></div>';
		oDiv = oDiv.firstChild;
		oDiv.style.display = 'none';
		var oLegend = oForm.getElementsByTagName('legend')[0];
		this.outerMsgBox = oLegend.parentNode.insertBefore(oDiv, oLegend.nextSibling);
		this.innerMsgBox = this.outerMsgBox.getElementsByTagName('strong')[0];

		addEvent(oForm, 'submit', function(e) {
			haltEvent(e);
			XHR.connect(oForm.attributes.action.value, serializeForm(oForm) + '&action=lb', {success: WS.Plugins.Login.handleLogin, failure: WS.Plugins.Login.handleError});
		});
	}
};

WS.Plugins.Navigation = {
	init: function() {
		// handle keyboard navigation
		for (var aNodes = getElementsByClassName('drop'), i = aNodes.length, j, aLinks, fnHandler; i--;) {
			for (aLinks = aNodes[i].getElementsByTagName('a'), j = aLinks.length; j--;) {
				WS.Util.setFocusHandler(aLinks[j], aNodes[i]);
			}
		}
	}
};

WS.init = function() {
	addEvent($('ab-sites-form'), 'submit', function(e) {
		haltEvent(e);
		var oSelect = (e.srcElement || e.target).url;
		if (oSelect.selectedIndex > 0) {
			location.href = oSelect.value;
		}
	});
	var oFeedback = getElementsByClassName('feedback')[0];
	if (oFeedback) {
		addEvent(oFeedback.getElementsByTagName('a')[0], 'click', function(e) {
			haltEvent(e);
			var nWidth = 800, nHeight = 600;
			window.open((e.srcElement || e.target).href, 'hp1feedback', 'left=' + ((screen.availWidth - nWidth) / 2) + ',top=' + ((screen.availHeight - nHeight) / 2) + ',width=' + nWidth + ',height=' + nHeight + ',toolbar=0,resizable=1,scrollbars=1');
		});
	}
};

WS.Plugins.Carousel = {
	create: function(vContainer, oArgs) {
		var oContainer = $(vContainer);
		var oList = oContainer.getElementsByTagName('ul')[0];

		oArgs = mergeObjects(oArgs, {
			leftButton: oContainer.getElementsByTagName('button')[0],
			rightButton: oContainer.getElementsByTagName('button')[1]
		});

		var nTimer;
		var oLButton = oArgs.leftButton;
		var oRButton = oArgs.rightButton;
		var nCurPage = 0;
		var nStep = -425;

		function setScrollState() {
			setClass(oLButton, 'inactive', nCurPage <= 0);
			setClass(oRButton, 'inactive', nCurPage >= nTotalPages);
		}

		function scrollStep(nPage) {
			WS.Effects.tween(oList, 'left', {begin: nCurPage * nStep, end: nPage * nStep});
			nCurPage = nPage;
			setScrollState();
		}

		function scrollItems(bLeft) {
			if ((bLeft && nCurPage > 0) || (!bLeft && nCurPage < nTotalPages)) {
				scrollStep(bLeft ? nCurPage - 1 : nCurPage + 1);
			} else {
				stopScrolling();
			}
		}

		function stopScrolling() {
			clearInterval(nTimer);
			delEvent(document, 'mouseup', stopScrolling);
		}

		function refresh() {
			oList.style.left = '';

			var oItem = document.createElement('li');
			oItem.style.width = oItem.style.height = oItem.style.margin = oItem.style.padding = oItem.style.border = '0';
			oList.style.width = '30000px';

			var nWidth = oList.appendChild(oItem).offsetLeft;
			oList.removeChild(oItem);
			oList.style.width = nWidth + 'px';

			nCurPage = 0;
			nTotalPages = Math.abs(Math.max(0, nWidth - oList.parentNode.offsetWidth) / nStep);
			setScrollState();
		}

		refresh();
		this.refresh = refresh;

		function handleScrollButton(e) {
			var bLeft = ((e.srcElement || e.target) == oLButton);
			scrollItems(bLeft);
			addEvent(document, 'mouseup', stopScrolling);
			clearInterval(nTimer);
			nTimer = setInterval(function() { scrollItems(bLeft); }, 2000);
		}
		addEvent(oLButton, 'mousedown', handleScrollButton);
		addEvent(oRButton, 'mousedown', handleScrollButton);

		return this;
	}
};

WS.Plugins.Gadget = {
	init: function(oData) {
		var setText = WS.Util.setText;
		var oCategories = {};
		oCategories[oData.id] = oData;

		var oActiveCategory = oData;

		var oCategory = $('category');
		var oCarousel = getElementsByClassName('carousel', $('featured').getElementsByTagName('div'))[0];
		var oCarouselList = oCarousel.getElementsByTagName('ul')[0];
		var oCarouselWidget = WS.Plugins.Carousel.create(oCarousel);
		var oTitle = getElementsByClassName('media-title')[0];
		var oCaption = getElementsByClassName('media-description')[0];
		var oRss = getElementsByClassName('rss', $('featured').getElementsByTagName('p'))[0].getElementsByTagName('a')[0];
		var oMedia = getElementsByClassName('media')[0];
		var oGalleryItem = getElementsByClassName('gallery-item', oMedia.getElementsByTagName('*'))[0];
		var oAuthor = getElementsByClassName('media-author')[0];
		var oAuthorName = oAuthor.getElementsByTagName('cite')[0];
		var oAuthorHome = oAuthor.getElementsByTagName('a')[0];
		var oAuthorImage = oAuthor.getElementsByTagName('img')[0];
		var oMediaLinks = getElementsByClassName('media-info')[0].getElementsByTagName('a');
		var oShare = getElementsByClassName('email', oMediaLinks)[0];
		var oDownload = getElementsByClassName('download', oMediaLinks)[0];
		var oComment = getElementsByClassName('comment', oMediaLinks)[0];
		var oMore = getElementsByClassName('more-featured')[0].getElementsByTagName('a')[0];
		var oBrowseCategory = getElementsByClassName('browse-featured')[0].getElementsByTagName('h3')[0].getElementsByTagName('em')[0];
		var oLastSelectedItem = oCarouselList.getElementsByTagName('li')[0];

		var nMaxWidth = 521;
		var nMaxHeight = 346;
		var oSWFO = new SWFObject('http://p.webshots.com/abhome/flash/SimpleMediaPlayerAlt.swf', 'smp', nMaxWidth, nMaxHeight, '9', '#000000');
		oSWFO.addParam('wmode', 'opaque');
		oSWFO.addParam('quality', 'best');
		oSWFO.addParam('allowScriptAccess', 'always');
		oSWFO.addVariable('play', 'true');
		oSWFO.addVariable('loop', 'false');
		oSWFO.write(oMedia);

		function loadMedia(sMediaUrl, sClickUrl, sPreviewUrl) {
			try {
				if (sMediaUrl) {
					(window.smp || document.smp).loadMedia(sMediaUrl, sClickUrl, sPreviewUrl);
				}
			} catch(e) {
				setTimeout(function() { loadMedia(sMediaUrl, sClickUrl, sPreviewUrl); }, 100);
			}
		}

		function setItemData(oElem, sProperty, sData, oContainer) {
			if (oContainer) {
				oContainer.style.display = sData ? '' : 'none';
			}
			if (sProperty) {
				oElem[sProperty] = sData || '';
			} else {
				setText(oElem, sData || '');
			}
		}

		function updateSelection(nListIndex) {
			var oData = oActiveCategory.homepageGadgetItems[nListIndex].homepageGadgetItem;
			setItemData(oTitle, '', oData.title);
			setItemData(oCaption, '', oData.caption);
			setItemData(oRss, 'href', oData.rssUrl, oRss.parentNode);
			setItemData(oAuthorHome, 'href', oData.userUrl);
			setItemData(oAuthorName, '', oData.userName, oAuthorHome.parentNode);
			setItemData(oAuthorImage, 'src', oData.userImageUrl || WS.Constants.defaultProfileUrl);
			setItemData(oAuthorImage, 'alt', 'Profile photo of ' + oData.userName);
			setItemData(oShare, 'href', oData.shareUrl, oShare.parentNode);
			setItemData(oDownload, 'href', oData.downloadUrl, oDownload.parentNode);
			setItemData(oComment, 'href', WS.ltIE7 ? oData.commentUrl.replace(/#comment-form$/, '#comment') : oData.commentUrl, oComment.parentNode);
			setItemData(oMore, 'href', oData.moreUrl, oMore.parentNode);

			setTimeout(function() { loadMedia(oData.mediaUrl, oData.clickUrl, oData.mediaPreviewUrl); }, 1);
		}

		function updateItems() {
			setText(oBrowseCategory, oCategory[oCategory.selectedIndex].text);
			var oImage, aItems = oActiveCategory.homepageGadgetItems;
			var bShowMore = !!(oActiveCategory.lastItemUrl && oActiveCategory.lastItemImageUrl);

			oCarouselList.innerHTML = new Array(aItems.length + (bShowMore ? 2 : 1)).join('<li><span class="gallery-item"><span><a href=""><img alt="" src=""></a></span></span></li>');
			var oListItems = oCarouselList.getElementsByTagName('li');
			oLastSelectedItem = oListItems[0];
			oLastSelectedItem.className = 'active';

			for (var aImages = oCarouselList.getElementsByTagName('img'), i = 0, l = aItems.length, oItem; i < l; i++) {
				oItem = aItems[i].homepageGadgetItem;
				oImage = aImages[i];
				if (+oItem.mediaThumbWidth && +oItem.mediaThumbHeight) {
					oImage.width = oItem.mediaThumbWidth;
					oImage.height = oItem.mediaThumbHeight;
				}
				oImage.alt = 'Preview of ' + (oItem.title || 'image with no title');
				oImage.src = oItem.mediaThumbUrl;
				oImage.parentNode.href = oItem.clickUrl;
			}

			// add last item "click here to see all"
			if (bShowMore) {
				oImage = aImages[i];
				if (+oActiveCategory.lastItemImageWidth && +oActiveCategory.lastItemImageHeight) {
					oImage.width = oActiveCategory.lastItemImageWidth;
					oImage.height = oActiveCategory.lastItemImageHeight;
				}
				oListItems[i].className = 'last-item';
				oImage.alt = 'More featured media:  click here to see all';
				oImage.src = oActiveCategory.lastItemImageUrl;
				oImage.parentNode.href = oActiveCategory.lastItemUrl;
			}

			// add stripe to first few Pro Shots thumbnails
			if (oActiveCategory.id == 'pro') {
				for (var i = 0, l = Math.min(3, aItems.length), oNew; i < l; i++) {
					oNew = oListItems[i].appendChild(document.createElement('em'));
					oNew.className = 'new';
					setText(oNew, 'New!');
				}
			}

			oCarouselWidget.refresh();
		}

		function updateGadget(oCategory) {
			oActiveCategory = oCategory;
			updateSelection(0);
			updateItems();
		}

		function handleGadget(oXHR) {
			var oCategory = eval('(' + oXHR.responseText + ')').homepageGadgetData;
			oCategories[oCategory.id] = oCategory; // cache data
			updateGadget(oCategory);
		}

		function changeCategory(oSelect) {
			var oCategory = oCategories[oSelect.value]; // check cache
			if (oCategory) {
				updateGadget(oCategory);
			} else { // not cached - fetch from server
				XHR.connect(oSelect.form.attributes.action.value, serializeForm(oSelect.form) + '&xh=1', {success: handleGadget});
			}
		}
		addEvent($('featured-categories'), 'submit', function(e) {
			haltEvent(e);
			changeCategory((e.srcElement || e.target).i);
		});
		WS.Plugins.CustomSelect.onchange = changeCategory;

		addEvent(oCarousel, 'click', function(e) {
			for (var oElem = e.srcElement || e.target; oElem && oElem.tagName != 'LI'; oElem = oElem.parentNode);
			if (oElem && !hasClass(oElem, 'last-item')) {
				haltEvent(e);
				for (var nListIndex = 0, oNode = oElem.previousSibling; oNode; oNode = oNode.previousSibling) {
					if (oNode.nodeType == 1 && oNode.tagName == 'LI') {
						nListIndex++;
					}
				}
				updateSelection(nListIndex);

				if (oLastSelectedItem != oElem) {
					delClass(oLastSelectedItem, 'active');
					oLastSelectedItem = oElem;
					addClass(oElem, 'active');
				}
			}
		});

		this.changeCategory = changeCategory;
		updateSelection(0);
	}
};

WS.Plugins.CustomSelect = {
	init: function(vSelect, oArgs) {
		oArgs = oArgs || {};
		var me = this;
		var oSelect = $(vSelect);
		oSelect.selectedIndex = 0;
		var nLastIndex = -1;
		var oContainer = document.createElement('div');
		var oWidgetBar = oContainer.appendChild(document.createElement('p'));
		var oWidgetText = oWidgetBar.appendChild(document.createElement('strong'));
		var oList = oContainer.appendChild(document.createElement('ul'));

		if (oArgs.id) {
			oContainer.id = oArgs.id;
		}
		oContainer.className = 'custom-select';

		function updateWidget() {
			delClass(oContainer, 'focus');
			if (nLastIndex != oSelect.selectedIndex) {
				nLastIndex = oSelect.selectedIndex;
				WS.Util.setText(oWidgetText, oSelect[nLastIndex].text);
				if (me.onchange) {
					me.onchange(oSelect);
				}
			}
		}
		addEvent(oSelect, 'change', updateWidget);

		addEvent(oWidgetBar, 'click', function() {
			if (WS.Util.toggleClass(oContainer, 'focus')) {
				setTimeout(function() {
					addEvent(document, 'click', function(e) {
						delEvent(document, 'click', arguments.callee);
						for (var oElem = e.srcElement || e.target; oElem && oElem != oContainer; oElem = oElem.parentNode);
						if (!oElem) {
							updateWidget();
						}
					});
				}, 1);
			}
			oSelect.focus();
		});

		function handleClick(e, nSelectedIndex) {
			oSelect.selectedIndex = nSelectedIndex;
			updateWidget();
			oSelect.focus();
		}
		for (var i = 0, l = oSelect.length, oItem; i < l; i++) {
			oItem = oList.appendChild(document.createElement('li'));
			oItem.className = 'hvr';
			oItem.selectedIndex = i;
			WS.Util.setText(oItem, oSelect[i].text);
			addEvent(oItem, 'click', function(nSelectedIndex) {
				return function(e) {
					handleClick(e, nSelectedIndex);
				};
			}(i));
		}

		updateWidget();
		addEvent(oContainer, 'mousedown', haltEvent);
		addEvent(oContainer, 'selectstart', haltEvent);
		oWidgetText.style.MozUserSelect = oList.style.MozUserSelect = 'none';
		oSelect.style.position = 'absolute';
		oSelect.style.left = '-9999px';
		oSelect.parentNode.insertBefore(oContainer, oSelect);
	}
};

WS.Plugins.Lightbox = {
	create: function(vContent, oArgs) {
		oArgs = mergeObjects(oArgs,
			{
				// default arguments
				container: document.documentElement,  // lightbox container
				background: '#000',  // background to set on overlay
				opacity: .5,      // opacity of overlay
				zIndex: 32000,    // z-index of overlay
				className: 'lightbox-overlay',  // class name to attach to overlay
				openers: [],    // array of ids or elements that spawn lightbox
				closers: [],    // array of ids or elements that close lightbox
				autoOpen: -1,   // automatically open lightbox after this many milliseconds [-1 = never]
				onopen: null,   // callback function when lightbox is opened
				onclose: null,  // callback function when lightbox is closed
				anchored: true  // ensure that top-left corner of content is within container's viewing area
			}
		);
		var elContent = $(vContent);
		var elContainer = $(oArgs.container);
		if (!elContent || !elContainer) {
			return;
		}

		// save original styles
		var oOrigContentStyles = WS.Util.getProps(elContent.style, 'position', 'top', 'left', 'zIndex');
		var oOrigContainerStyles = WS.Util.getProps(elContainer.style, 'zoom');

		var elOverlay = document.createElement('div');
		elOverlay.className = oArgs.className;

		var oStyle = elOverlay.style;
		oStyle.width = oStyle.height = 'auto';
		oStyle.top = oStyle.left = oStyle.right = oStyle.bottom = '0';
		if (WS.ltIE7 || elContainer != document.documentElement) {
			oStyle.position = 'absolute';
			if (WS.ltIE7) {
				oStyle.width = oStyle.height = '100%';
				oStyle.bottom = oStyle.right = 'auto';
			}
		} else {
			oStyle.position = 'fixed';
		}
		oStyle.zIndex = oArgs.zIndex;

		this.open = function(e) {
			haltEvent(e);
			addClass(elContainer, 'lightbox');
			if (WS.ltIE7) {
				oStyle.width = elContainer.scrollWidth + 'px';
				oStyle.height = elContainer.scrollHeight + 'px';
			}
			oStyle.background = oArgs.background;
			elContent.origParentNode = elContent.parentNode;
			elContent.origNextSibling = elContent.nextSibling;

			var iScrollTop = elContainer.scrollTop;
			var iScrollLeft = elContainer.scrollLeft;

			if (elContainer == document.documentElement) {
				iScrollTop = Math.max(iScrollTop, document.body.scrollTop);
				iScrollLeft = Math.max(iScrollLeft, document.body.scrollLeft);
				document.body.insertBefore(elOverlay, document.body.firstChild);
			} else {
				elContainer.insertBefore(elOverlay, elContainer.firstChild);
			}
			WS.Util.setOpacity(elOverlay, oArgs.opacity);
			elOverlay.parentNode.insertBefore(elContent, elOverlay.nextSibling);
			elContent.style.position = 'absolute';

			if (elContainer.currentStyle && !elContainer.currentStyle.hasLayout) {
				elContainer.style.zoom = 1;
			}
			var iPosX = iScrollLeft + (elContainer.clientWidth / 2) - (elContent.offsetWidth / 2);
			var iPosY = iScrollTop + (elContainer.clientHeight / 2) - (elContent.offsetHeight / 2);
			if (oArgs.anchored) {
				iPosX = Math.max(iScrollLeft, iPosX);
				iPosY = Math.max(iScrollTop, iPosY);
			}

			elContent.style.top = iPosY + 'px';
			elContent.style.left = iPosX + 'px';
			elContent.style.zIndex = oArgs.zIndex + 100;

			if (typeof oArgs.onopen == 'function') {
				oArgs.onopen.call(elContent);
			}
		};

		this.close = function(e) {
			haltEvent(e);
			if (elOverlay.parentNode) {
				elOverlay.parentNode.removeChild(elOverlay);

				// restore original styles
				WS.Util.setProps(elContent.style, oOrigContentStyles);
				WS.Util.setProps(elContainer.style, oOrigContainerStyles);

				elContent.origParentNode.insertBefore(elContent, elContent.origNextSibling);
			}
			delClass(elContainer, 'lightbox');
			if (typeof oArgs.onclose == 'function') {
				oArgs.onclose.call(elContent);
			}
		};

		for (var i = oArgs.openers.length; i--;) {
			addEvent($(oArgs.openers[i]), 'click', this.open);
		}
		for (var i = oArgs.closers.length; i--;) {
			addEvent($(oArgs.closers[i]), 'click', this.close);
		}
		if (oArgs.autoOpen >= 0) {
			setTimeout(this.open, oArgs.autoOpen);
		}
	}
};

WS.Plugins.TabView = {
	activate: function(e) {
		for (var el = e.target || e.srcElement; el; el = el.parentNode) {
			if (el.tagName == 'A') {
				for (var elTab = el.parentNode; elTab; elTab = elTab.parentNode) {
					if (elTab.tagName == 'LI') {
						haltEvent(e);
						if (elTab != this.activeTab) {
							if (this.activeTab) { // avoid silly strict warning in FF
								delClass(this.activeTab, 'active');
								delClass(this.activeSection, 'active');
							}
							this.activeTab = elTab;
							this.activeSection = $(el.hash.slice(1));
							addClass(this.activeTab, 'active');
							addClass(this.activeSection, 'active');
						}
						return;
					}
				}
			}
		}
	},
	create: function(vTabNav, vActiveTab) {
		var elNav = $(vTabNav);
		WS.Plugins.TabView.activate.call(
			elNav,
			{target: vActiveTab ? $(vActiveTab) : elNav.getElementsByTagName('a')[0]}
		);
		addEvent(elNav, 'click', function(e) { WS.Plugins.TabView.activate.call(elNav, e); });
	}
};

WS.Plugins.ListScroller = function(vList, oArgs) {
	oArgs = mergeObjects(oArgs, {step: 2, interval: 100, pause: 4000, target: null});

	var oList = $(vList);
	var oItems = oList.getElementsByTagName('li');
	oList.appendChild(oItems[0].cloneNode(true));

	var oTarget = $(oArgs.target);
	if (oTarget) {
		oTarget.appendChild(oList);
	}

	oList.style.position = 'relative';
	oList.style.overflow = 'hidden';
	oList.style.zoom = 1;
	oList.style.height = oItems[0].offsetHeight + 'px';
	for (var i = oItems.length; i--;) {
		oItems[i].style.position = 'relative';
	}

	var nTimer, nMarginTop = 0;
	function scroll(nIndex) {
		clearInterval(nTimer);
		setTimeout(function() {
			if ((nIndex + 1) >= oItems.length) {
				nIndex = 0;
				nMarginTop = 0;
				oItems[0].style.marginTop = '0px';
			}
			nTimer = setInterval(function() { scrollTo(nIndex + 1); }, oArgs.interval);
		}, oArgs.pause);
	}

	function scrollTo(nIndex) {
		for (var i = oItems.length, nMaxHeight = 0, nHeight; i--;) {
			nHeight = oItems[i].offsetHeight;
			if (nHeight > nMaxHeight) {
				nMaxHeight = nHeight;
			}
		}
		oList.style.height = nMaxHeight + 'px';
		if (oItems[nIndex].offsetTop > 0) {
			nMarginTop -= oArgs.step;
			oItems[0].style.marginTop = nMarginTop + 'px';
		} else {
			scroll(nIndex);
		}
	}
	scroll(0);
};

WS.Plugins.UserPhoto = {
	init: function() {
		if (self == top && typeof Popup != 'undefined') {
			WS.Plugins.UserPhoto.popup = new Popup;
			addEvent(document, 'mouseover', WS.Plugins.UserPhoto.show);
		}
	},
	show: function(e) {
		var oElem = e.srcElement || e.target;
		if (oElem.tagName != 'IMG') {
			return;
		}
		var oParent = oElem.parentNode;
		var bProfilePhoto = hasClass(oElem, 'user-photo');
		var bProfileLink = oParent && hasClass(oParent, 'user-photo-s');

		if (bProfilePhoto || bProfileLink) {
			var oContainer = document.createElement('div');
			var oImage = oContainer.appendChild(document.createElement('img'));
			oImage.alt = oElem.alt;
			oImage.src = oElem.src;
			oImage.style.display = 'block';
			oImage.style.padding = '3px';
			oImage.style.background = '#fff';
			oImage.style.border = '1px solid #c1c7c7';

			if (bProfileLink) {
				for (; oParent && oParent.tagName != 'A'; oParent = oParent.parentNode);
				if (oParent) {
					var oLink = document.createElement('a');
					oLink.href = oParent.href;
					oLink.target = '_parent';
					oContainer.appendChild(oLink).appendChild(oImage);
				}
			}

			var oInfo = new PopupInfo;
			oInfo.html = oContainer.innerHTML;
			oInfo.origin = 'element';
			oInfo.position = 'center';
			oInfo.showDelay = 100;
			oInfo.fadeInDuration = 250;
			oInfo.fadeOutDuration = 250;
			oInfo.keepInView = false;
			oInfo.zIndex = 32767;
			WS.Plugins.UserPhoto.popup.create(oElem, e, oInfo);
		}
	}
};
WS.Plugins.UserPhoto.init();


/* OLD CODE TO MAINTAIN BACKWARD COMPATIBILITY */
function setSkin(skin) {
	if (skin) {
		setCookie('skin', skin);
	} else {
		skin = getCookie('skin');
	}
	if (skin && setSkin.skin != skin) {
		delClass(document.body, setSkin.skin);
		setSkin.skin = skin;
		addClass(document.body, skin);
	}
}
setSkin.skin = null;

if (typeof window.isPremium == 'undefined') {
	window.isPremium = function() {
		var C = unescape(document.cookie);
		if (C.indexOf("G_x20{:t}*pre") == -1) return false;
		var S = C.indexOf("G_x21{:t}") + 9;
		if (S <= 9) return false;
		var Y = C.substring(S, S+4);
		var M = C.substring(S+5, S+7);
		var D = C.substring(S+8, S+10);
		var Exp = new Date(Y,M-1,D,23,59,59,0);
		var Now = new Date();
		var Days = Math.floor((Now.getTime() - Exp.getTime())/(1000*60*60*24));
		return (Days <= 0);
	};
}
