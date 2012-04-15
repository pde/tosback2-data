function $() {
	var list = [];

	for (var i = 0, len = arguments.length, el; i < len; i++) {
		el = arguments[i];
		if (typeof(el) == 'string') el = document.getElementById(el);
		if (len == 1) return el;
		list.push(el);
	}

	return list;
}

Function.prototype.bind = function() {
	var fn = this, args = Array.prototype.slice.call(arguments);
	return function() {
		return fn.apply(args.shift(), Array.prototype.slice.call(arguments).concat(args));
	};
};

String.prototype.escapeRegex = function() {
	return this.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, '\\$1');
};

String.prototype.sprintf = function() {
	var i = 0, args = arguments;
	return this.replace(/%s/g, function() { return args[i++] });
};

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
};

Array.icmp = function(_a, _b) {
	var a = _a.toUpperCase();
	var b = _b.toUpperCase();
	return (a < b) ? -1 : (a > b) ? 1 : 0;
};
Array.prototype.isort = function() {
	this.sort(Array.icmp);
};

Array.prototype.ifind = function(str) {
	for (var i = 0, l = this.length, s = str.toUpperCase(); i < l; i++) {
		if (this[i].toUpperCase() == s) return i;
	}
	return -1;
};

function htmlEncode(str) {
	return str.replace(/[&<>"']/g, function(c) { return htmlEncode.map[c]; });
}
htmlEncode.map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'};

function preload() {
	var list = [];

	for (var i = 0, len = arguments.length, img; i < len; i++) {
		img = document.createElement('img');
		img.src = arguments[i];
		if (len == 1) return img;
		list.push(img);
	}

	return list;
}

function mergeObjects() {
	var ret = {};
	for (var i = arguments.length, o, p; i--;) {
		o = arguments[i];
		if (typeof o == 'object') {
			for (p in o) ret[p] = o[p];
		}
	}
	return ret;
}

function getElementsByClassName(name, nodes) {
	var ret = [];
	if (!nodes) {
		nodes = document.getElementsByTagName('*');
	} else if (typeof nodes == 'string') {
		var parentEl = $(nodes);
		if (!parentEl) return ret;
		nodes = parentEl.getElementsByTagName('*');
	}
	for (var i = 0, l = nodes.length; i < l; i++) {
		if (hasClass(nodes[i], name)) ret.push(nodes[i]);
	}
	return ret;
}

function selectAll(obj) {
	if (obj.createTextRange) {
		obj.createTextRange().select();
	} else if (obj.selectionStart) {
		obj.focus();
		try {obj.setSelectionRange(0, obj.value.length);} 
		catch (ex) {}
	}
}

function setCaretPos(obj, pos) {
	if (obj.createTextRange) {
		var range = obj.createTextRange();
		range.move('character', pos);
		range.select();
	} else if (obj.selectionStart) {
		obj.focus();
		obj.setSelectionRange(pos, pos);
	}
}


/* COOKIE FUNCTIONS */
function setCookie(name, value, hours) {
	if (!hours) hours = 1000000; // 100+ years
	var dt = new Date();
	dt.setTime(dt.getTime() + (hours * 3600 * 1000));
	document.cookie = name + '=' + escape(value)
		+ '; expires=' + dt.toGMTString() + '; domain=.webshots.com; path=/;';
}

function getCookie(name) {
	for (var cookies = document.cookie.split('; '), i = cookies.length, pair; i--;) {
		pair = cookies[i].split('=');
		if (pair[0] == name) {
			return unescape(pair[1]);
		}
	}
	return null;
}

function delCookie(name) {
	setCookie(name, '', -1);
}
/* END OF COOKIE FUNCTIONS */


/* EVENT FUNCTIONS */
function addEvent(el, evt, handler) {
	if (!el) return;
	if (el.addEventListener) {
		el.addEventListener(evt, handler, false);
	} else if (el.attachEvent) {
		el.detachEvent('on' + evt, handler);
		el.attachEvent('on' + evt, handler);
	} else {
		var oldevent = el['on' + evt];
		if (typeof oldevent != 'function') {
			el['on' + evt] = handler;
		} else {
			el['on' + evt] = function(e) {
				oldevent(e);
				handler(e);
			};
		}
	}
	if (findEvent(el, evt, handler) == -1 && evt != 'unload') {
		addEvent.events.push([el, evt, handler]);
	}
}
addEvent.events = [];

function delEvent(el, evt, handler, flush) {
	if (!el) return;
	if (!flush) {
		var i = findEvent(el, evt, handler);
		if (i != -1) addEvent.events.splice(i, 1);
	}
	if (el.removeEventListener) {
		el.removeEventListener(evt, handler, false);
	} else if (el.detachEvent) {
		el.detachEvent('on' + evt, handler);
	} else {
		el['on' + evt] = null;
	}
}

function flushEvents() {
	for (var events = addEvent.events, i = events.length, e; i--;) {
		e = events[i];
		delEvent(e[0], e[1], e[2], true);
	}
	addEvent.events = [];
}

function haltEvent(evt) {
	if (evt) {
		evt.returnValue = false;
		if (evt.preventDefault) evt.preventDefault();
	}
	return false;
}

function findEvent(el, evt, handler) {
	for (var events = addEvent.events, i = events.length, e; i--;) {
		e = events[i];
		if (e[0] == el && e[1] == evt && e[2] == handler) {
			return i;
		}
	}
	return -1;
}

addEvent(window, 'unload', flushEvents);
/* END OF EVENT FUNCTIONS */


/* CLASS SETTING FUNCTIONS */
function hasClass(el, sName) {
	return !!(el && el.className && (' ' + el.className.replace(/\s+/g, ' ') + ' ').indexOf(' ' + sName + ' ') >= 0);
}

function addClass(el, sName) {
	if (el && !hasClass(el, sName)) {
		el.className += el.className ? ' ' + sName : sName;
	}
}

function delClass(el, sName) {
	if (el && hasClass(el, sName)) {
		var re = delClass.cache[sName];
		if (!re) {
			re = new RegExp('^(?:' + sName + '(?:\\s+|$))+|\\s+' + sName + '\\s*(?=\\s|$)', 'g');
			delClass.cache[sName] = re;
		}
		el.className = el.className.replace(re, '');
	}
}
delClass.cache = {};

function setClass(el, sName, bSet) {
	return bSet ? addClass(el, sName) : delClass(el, sName);
}

function toggleClass(el, sName) {
	var bSet = !hasClass(el, sName);
	setClass(el, sName, bSet);
	return bSet;
}
/* END OF CLASS SETTING FUNCTIONS */


/* SLIDER ANIMATION */
function b1(t) { return t * t * t; }
function b2(t) { return 3 * t * t * (1 - t); }
function b3(t) { return 3 * t * (1 - t) * (1 - t); }
function b4(t) { return (1 - t) * (1 - t) * (1 - t); }

function getBezierPos(percent, points) {
	return points[0] * b1(percent) + points[1] * b2(percent) + points[2] * b3(percent) + points[3] * b4(percent);
}

function slide(item, step, duration, points, dir) {
	var el = item.parentNode;
	if (el.slider) {
		if (el.slider.dir == dir) return;
		clearTimeout(el.slider.timer);
	} else {
		var collapsed = hasClass(el, 'collapsed');
		if ((collapsed && dir < 0) || (!collapsed && dir > 0)) return;
	}
	el.slider = { height: el.offsetHeight, percent: 0, step: step, rate: duration / (1 / (step / 100)), points: points, dir: dir };
	slideStep(el);
}

function slideStep(el) {
	var info = el.slider;
	info.percent += info.step;
	if (info.percent < 100) {
		var pos = -Math.floor(getBezierPos(info.percent / 100, info.points) * info.height);
		el.style.marginTop = ((info.dir > 0) ? -info.height - pos : pos) + 'px';
		info.timer = setTimeout(function() { slideStep(el) }, info.rate);
	} else {
		el.style.marginTop = (info.dir > 0) ? '0px' : -info.height + 'px';
	}
}

// new slider code (tentative -- do not use yet)
function _slide(node, opts) {
	var el = (typeof node == 'string') ? $(node) : node;
	if (!el) return;

	opts = opts || {};
	var inf = {
		store: opts.store || el,
		inside: opts.inside || false,
		horz: opts.horz || false,
		step: opts.step || 3,
		duration: opts.duration || 1000,
		points: opts.points || [1, 1, 1, 0],
		percent: 0
	};
	inf.expand = opts.expand !== void(0) ? opts.expand : (el.slide ? !el.slide.expand : !el.offsetHeight);
	if (el.slide) {
		if (el.slide.expand == inf.expand) return;
		clearTimeout(el.slide.timer);
	} else {
		if ((inf.horz && (inf.expand ? el.offsetWidth : !el.offsetWidth))
			|| (!inf.horz && (inf.expand ? el.offsetHeight : !el.offsetHeight))) return;
		var divHTML = '<div style="position: static !important; position: relative; margin: 0 !important; padding: 0 !important; border: none !important; overflow: hidden !important;">';
		if (inf.inside) {
			el.innerHTML = divHTML + el.innerHTML + '</div>';
		} else {
			var div = document.createElement('div');
			div.innerHTML = divHTML + '</div>';
			el.parentNode.insertBefore(div.firstChild, el).appendChild(el);
		}
	}
	inf.div = inf.inside ? el.firstChild : el.parentNode;
	inf.rate = inf.duration / (100 / inf.step);
	inf.size = inf.horz ? 'width' : 'height';
	inf.scrollSize = inf.horz ? 'scrollWidth' : 'scrollHeight';
	if (hasClass(el, 'collapsed')) {
		delClass(el, 'collapsed');
		inf.div.style[inf.size] = '0';
	}
	inf.pos = inf.div[inf.scrollSize];
	el.slide = inf;
	_slideStep(el);
}

function _slideStep(el) {
	var inf = el.slide;
	var div = inf.div;
	var expand = inf.expand;
	if (inf.percent < 100) {
		inf.percent += inf.step;
		var pct = inf.percent / 100;
		var pts = inf.points;
		var pos = Math.floor(inf.pos * (pts[0] * (pct * pct * pct) + pts[1] * (3 * pct * pct * (1 - pct))
			+ pts[2] * (3 * pct * (1 - pct) * (1 - pct)) + pts[3] * ((1 - pct) * (1 - pct) * (1 - pct))));
		div.style[inf.size] = (expand ? pos : inf.pos - pos) + 'px';
		inf.timer = setTimeout(function() { _slideStep(el) }, inf.rate);
	} else {
		div.style[inf.size] = expand ? 'auto' : '0';
	}
}
/* END OF SLIDER ANIMATION */


/* MESSAGE FUNCTIONS */
function setMessage(msg, el, type) {
	type = type || 'msg';
	if (!el || hasClass(el.parentNode, type)) return;

	var msgbox = el.msgbox;
	if (!msgbox) {
		msgbox = el.parentNode.insertBefore(document.createElement('div'), el.nextSibling);
		el.msgbox = msgbox;
		setMessage.messages.push(el);
	}
	addClass(msgbox, type);
	addClass(el.parentNode, type);
	var p = msgbox.appendChild(document.createElement('p'));
	p.className = type;
	p.innerHTML = msg;
}
setMessage.messages = [];

function unsetMessage(el) {
	if (el.msgbox) {
		var container = el.parentNode;
		for (var types = el.msgbox.className.split(' '), j = types.length; j--; delClass(container, types[j]));
		container.removeChild(el.msgbox);
		el.msgbox = null;
	}
	for (var messages = setMessage.messages, i = messages.length; i--;) {
		if (messages[i] == el) messages.splice(i, 1);
	}
}

function unsetAllMessages() {
	for (var messages = setMessage.messages, i = messages.length, container, el; i--;) {
		el = messages[i];
		container = el.parentNode;
		for (var types = el.msgbox.className.split(' '), j = types.length; j--; delClass(container, types[j]));
		container.removeChild(el.msgbox);
		el.msgbox = null;
	}
	setMessage.messages = [];
}

function setError(msg, el) {
	setMessage(msg, el, 'error');
}

function setWarning(msg, el) {
	setMessage(msg, el, 'warn');
}
/* END OF MESSAGE FUNCTIONS */


/* XMLHTTP functions */
var XHR = {};

/*@cc_on
@if (@_jscript_version >= 5)
try {
	XHR.create = new ActiveXObject('Msxml2.XMLHTTP');
	XHR.create = function() { return new ActiveXObject('Msxml2.XMLHTTP') };
} catch(e) { try {
	XHR.create = new ActiveXObject('Microsoft.XMLHTTP');
	XHR.create = function() { return new ActiveXObject('Microsoft.XMLHTTP') };
} @else @*/{ try {
	XHR.create = new XMLHttpRequest;
	XHR.create = function() { return new XMLHttpRequest };
}/*@end @*/ catch(e) {
	XHR.create = function() {
		alert('Your browser does not support XMLHTTP.');
		return null;
	};
}}

XHR.open = function(url, data, handler) {
	var xhr = XHR.create();
	xhr.onreadystatechange = handler;
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Method', 'POST ' + url + ' HTTP/1.1');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(data);
	return xhr;
};

XHR.connection = function(url, params, callback, args) {
	var me = this;

	function handler() {
		var xhr = me.xhr;
		if (!xhr || xhr.readyState != 4) return;

		if (callback) {
			if (xhr.status == 200) {
				if (typeof callback.success == 'function') {
					callback.success(xhr, args);
				}
			} else if (typeof callback.failure == 'function') {
				callback.failure(xhr, args);
			}
		}
		me = me.xhr = null;
	}

	this.xhr = XHR.open(url, params || '', handler);
};

XHR.connect = function(url, params, callback, args) {
	return new XHR.connection(url, params, callback, args);
};
/* END OF XMLHTTP functions */


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


/* TRACKING FUNCTIONS */
addEvent(document, 'click', function(e) {
	for (var a = e.srcElement || e.target; a && a.tagName != 'A'; a = a.parentNode);
	if (a && a.rel && /(?:^|\s)track(?:static)?:([^\s]+)/.test(a.rel)) {
		var img = document.createElement('img');
		img.className = 'tracking';
		img.src = '//community.webshots.com/misc/empty?' + RegExp.$1 + '&' + Math.random();
		document.body.appendChild(img).parentNode.removeChild(img);
	}
});

function wsCount(tag) {
	if (!tag || Math.floor(50 * Math.random())) return;
	document.write('<img height="1" width="1" alt="counter" class="tracker-image" src="'
		+ (wsCount.counter || '/counter.gif') + '?tag=' + tag + '&amp;'
		+ Math.floor(10000000 * Math.random()) + '">');
}

function dwCount(url) {
	var ref = unescape(document.referrer);
	var to = (ref.indexOf('?') > 0) ? ref.indexOf('?') : ref.length;
	document.write('<img height="1" width="1" alt="counter" class="tracker-image" src="' + url
		+ '&amp;ts=' + new Date().getTime()
		+ '&amp;xref=' + escape(ref.substring(0, to))
		+ '&amp;xrq=' + escape(ref.substring(to + 1, ref.length)) + '">');
}
/* END OF TRACKING FUNCTIONS */


function serializeForm(frm) {
	var args = [];
	for (var inputs = frm.elements, i = 0, l = inputs.length, input, ename; i < l; i++) {
		input = inputs[i];
		if (input.name && !input.disabled) {
			ename = encodeURIComponent(input.name);
			if (input.type == 'select-multiple') {
				for (var ii = 0, ll = input.length; ii < ll; ii++) {
					if (input[ii].selected) args.push(ename + '=' + encodeURIComponent(input[ii].value));
				}
			} else if ((input.type != 'radio' && input.type != 'checkbox') || input.checked) {
				args.push(ename + '=' + encodeURIComponent(input.value));
			}
		}
	}
	return args.join('&');
}


if (document.documentElement) document.documentElement.className += ' js';

/* IE6 background flicker fix */
/*@cc_on try { document.execCommand('BackgroundImageCache', false, true); } catch(e) {} @*/

function rubicsResponse(obj) {
	document.write(obj.rubics.response.bodyText);
}


/* FOCUS BOX */
function makeFocusBox(input) {
	makeFocusBox.set = true; // remove this line after swap code removed from chromeHeader.js
	input = $(input);
	if (input) {
		if (input.type == 'text') {
			makeFocusBox.handleText(input);
		} else if (input.type == 'password') {
			makeFocusBox.handlePass(input);
		}
	}
}

makeFocusBox.handleText = function(input) {
	addEvent(input, 'focus', function(e) {
		input.value = '';
		delEvent(input, e.type, arguments.callee);
	});
};

(function() {
	var input = document.createElement('input');
	input.type = 'password';
	try { input.type = 'text'; } catch(e) {}
	if (input.type == 'text') {
		makeFocusBox.handlePass = function(input) {
			input.type = 'text';
			addEvent(input, 'focus', function() {
				input.value = '';
				input.type = 'password';
				delEvent(input, 'focus', arguments.callee);
				setTimeout(function() { input.focus(); }, 1);
			});
		};
	} else { // IE
		makeFocusBox.handlePass = function(passInput) {
			var div = document.createElement('div');
			div.appendChild(passInput.cloneNode(true));
			div.innerHTML = div.innerHTML.replace(/(\sTYPE\s*=\s*("?))PASSWORD\2(?=[\s>])/i, '$1text$2');
			var textInput = div.firstChild;
			textInput.value = passInput.defaultValue;
			passInput.parentNode.replaceChild(textInput, passInput);
			addEvent(textInput, 'focus', function() {
				passInput.value = '';
				textInput.parentNode.replaceChild(passInput, textInput);
				setTimeout(function() { passInput.focus(); }, 1);
			});
		};
	}
})()
/* END FOCUS BOX */


/* SPONSORED DROPDOWN MENU TOOLTIP */
var createSponsorTooltip = isPremium() ? function() {} :
function(vMenu, iIndex, sLogoUrl, sRedirectUrl, sImpressionUrl, sDescription, oOffset) {
	var elMenu = $(vMenu);
	if (!elMenu) return;
	var elItem = elMenu.getElementsByTagName('li')[iIndex];
	if (!elItem) return;

	var elLink = document.createElement('a');
	if (sRedirectUrl && sRedirectUrl != '#') {
		elLink.target = '_blank';
	}
	elLink.href = sRedirectUrl;

	var elLogo = elLink.appendChild(document.createElement('img'));
	elLogo.title = '';
	elLogo.alt = sDescription;
	elLogo.src = sLogoUrl;
	elLogo.style.display = 'block';
	elLink.style.position = 'absolute';
	elLink.style.zIndex = 30000;
	oOffset = oOffset || {};
	var nOffsetX = oOffset.offsetX || 0;
	var nOffsetY = oOffset.offsetY || 0;
	var nTimer = null;

	function showTooltip() {
		document.body.insertBefore(elLink, document.body.firstChild);
		for (var x = 0, y = 0, el = elItem; el; el = el.offsetParent) {
			x += el.offsetLeft;
			y += el.offsetTop;
		}
		if (x < 0) {
			nTimer = setTimeout(showTooltip, 25);
		}

		elLink.style.top = (y + (elItem.offsetHeight / 2) - (elLink.offsetHeight / 2)) + nOffsetY + 'px';
		elLink.style.left = (x + elItem.offsetWidth) + nOffsetX + 'px';

		if (!elLink.tracked) {
			elLink.tracked = true;
			var elTrackingImage = document.createElement('img');
			elTrackingImage.className = 'tracker-image';
			elTrackingImage.src = sImpressionUrl;
			document.body.insertBefore(elTrackingImage, document.body.firstChild).parentNode.removeChild(elTrackingImage);
		}
	}

	function hideTooltip() {
		clearTimeout(nTimer);
		elLink.style.top = '-9999px';
		elLink.style.left = '-9999px';
		delClass(elMenu, 'hover');
	}

	addEvent(elMenu, 'mouseover', showTooltip);
	addEvent(elMenu, 'mouseout', function(e) {
		var elRelatedTarget = e.relatedTarget || e.toElement;
		if (elRelatedTarget == elLink || elRelatedTarget == elLogo) {
			addClass(elMenu, 'hover');
		} else {
			hideTooltip();
		}
	});
	addEvent(elLink, 'mouseout', function(e) {
		var elRelatedTarget = e.relatedTarget || e.toElement;
		for (var el = elRelatedTarget; el && el != elMenu; el = el.parentNode);
		if (!el) {
			hideTooltip();
		}
	});
}

/**
 * Monitors document clicks for rel="external" on anchors to open the resource
 * in a new window/tab
 */
addEvent(document, 'click', function(e) {
	for (var el = e.target || e.srcElement; el; el = el.parentNode) {
		if (el.tagName == 'A') {
			if (el.rel && (' ' + el.rel.replace(/\s+/g, ' ') + ' ').indexOf(' external ') >= 0) {
				el.target = '_blank';
			}
			break;
		}
	}
});
