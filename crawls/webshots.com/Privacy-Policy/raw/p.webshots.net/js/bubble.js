// popup.js - version 1.06 - 2007/02/21 - (Copyright 2005 - 2007 USEGET.COM)

// default settings (construct/modify to customize individual popups)
function PopupInfo() {
	this.html = '';             // text/html content
	this.css = '';              // stylesheet url/path
	this.lifetime = 0;          // auto-hide after duration [ms] (0 = infinite)
	this.opacity = 100;         // opacity percentage level (0 - 100 [opaque])
	this.showDelay = 500;       // delay in showing popup [ms]
	this.hideDelay = 0;         // delay in hiding popup [ms] (neg. = infinite)
	this.fadeInInterval = 50;   // delay between fade-in steps [ms]
	this.fadeInDuration = 0;    // fade-in duration [ms]
	this.fadeOutInterval = 50;  // delay between fade-out steps [ms]
	this.fadeOutDuration = 0;   // fade-out duration [ms]
	this.keepInView = false;    // auto-adjust to remain within viewport
	this.track = false;         // track mouse around
	this.refresh = 50;          // refresh rate [ms] (0 = none)
	this.zIndex = 5000;         // z-index level
	this.offset = [0,0];        // offset from origin [dx,dy]
	this.classPrefix = null;    // class prefix on popup body reflecting position
	this.position = 'any';      // position relative to origin
	this.origin = 'cursor';     // position anchor / reference point:
	                            //   cursor | element | viewport
}

function Popup(globalCSS, globalTarget) {
	var mouse = {x: 0, y: 0};
	var timers = {show: null, hide: null, fade: null};
	var opacity = 0;
	var state = 0;
	var adjusted = false;
	var iframe = null;
	var shim = null;
	var info = null;
	var src = null;
	var me = this;

	function load() {
		delEvent(window, 'load', load);

		if (!iframe) {
			iframe = document.createElement('iframe');
			iframe.style.position = 'absolute';
			iframe.style.zIndex = -1;
			iframe.scrolling = 'no';
			iframe.frameBorder = 0;
			iframe.allowTransparency = true;
			/*@cc_on
			@if (@_jscript)
				if (!window.XMLHttpRequest) {
					shim = document.body.appendChild(iframe.cloneNode(false));
				}
			@end @*/
			hide();
			document.body.appendChild(iframe);
		}

		var doc = iframe.contentDocument;
		if (!doc) {
			doc = iframe.contentWindow;
			if (doc && doc.document) {
				doc = doc.document;
			} else {
				setTimeout(load, 100);
				return;
			}
		}

		var links = '';
		if (globalCSS) {
			var css = (typeof globalCSS == 'string') ? [globalCSS] : globalCSS;
			for (var i = 0, l = css.length; i < l; i++) {
				links += '<link rel="stylesheet" type="text/css" href="' + css[i] + '">';
			}
		}

		doc.open();
		doc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'
			+ '<html style="margin:0;padding:0;"><head>'
			+ '<meta http-equiv="content-type" content="text/html; charset=utf-8"><title>Popup Frame</title>'
			+ (globalTarget ? '<base target="' + globalTarget + '">' : '')
			+ links + '</head>'
			+ '<body style="display:table-cell;display:inline-table;margin:0;padding:0;"></body></html>');
		doc.close();

		me.create = create;
		me.destroy = hide;
		me.doc = doc;
	}

	function create(el, evt, inf, force) {
		if (el == src && !force) return iframe;
		if (evt) track(evt);
		hide();
		src = el;
		info = inf;
		if (inf.hideDelay >= 0) addEvent(el, 'mouseout', hide);
		addEvent(el, 'mousemove', track);
		timers.show = setTimeout(show, inf.showDelay);
		return iframe;
	}

	function show() {
		var doc = iframe.contentDocument || iframe.contentWindow.document;
		if (info.css) {
			var lnk = doc.createElement('link');
			lnk.rel = 'stylesheet';
			lnk.type = 'text/css';
			lnk.href = info.css;
			doc.getElementsByTagName('head')[0].appendChild(lnk);
		}
		doc.body.className = '';
		doc.body.innerHTML = info.html;
		iframe.style.zIndex = info.zIndex;
		delEvent(src, 'mouseout', hide);
		addEvent(src, 'mouseover', fadeIn);
		addEvent(iframe, 'mouseover', fadeIn);
		if (info.hideDelay >= 0) {
			addEvent(src, 'mouseout', preHide);
			addEvent(iframe, 'mouseout', preHide);
		}
		if (!info.track) delEvent(src, 'mousemove', track);
		if (info.lifetime) timers.life = setTimeout(hide, info.lifetime);
		fadeIn();
		adjust();
	}

	function hide() {
		for (var i in timers) {
			clearTimeout(timers[i]);
		}

		if (src) {
			delEvent(src, 'mousemove', track);
			delEvent(src, 'mouseover', fadeIn);
			delEvent(src, 'mouseout', preHide);
			delEvent(iframe, 'mouseover', fadeIn);
			delEvent(iframe, 'mouseout', preHide);
			src = null;
		}

		if (iframe) {
			iframe.style.visibility = 'hidden';
			iframe.style.top = '0px';
			iframe.style.left = '-9000px'; // NS8 junk
			iframe.style.width = '1px';
			iframe.style.height = '1px';
			if (shim) shim.mergeAttributes(iframe);
		}

		if (me.doc && me.doc.body) {
			me.doc.body.innerHTML = '';
		}

		info = null;
		state = 0;
		adjusted = false;
		me.readjust = true;
	}

	function preHide(e) {
		clearTimeout(timers.hide);
		for (var el = e.srcElement || e.target; el && el != src; el = el.parentNode);
		state &= el ? ~1 : ~2;
		if (!state) {
			timers.hide = setTimeout(info.fadeOutDuration ? fadeOut : hide, info.hideDelay || 1);
		}
	}

	function fade(step, endOpacity, interval, callback) {
		clearTimeout(timers.fade);
		setOpacity(opacity + step);
		if (opacity != endOpacity) {
			timers.fade = setTimeout(function() { fade(step, endOpacity, interval, callback) }, interval);
		} else if (callback) {
			callback();
		}
	}

	function fadeIn(e) {
		if (e) {
			for (var el = e.srcElement || e.target; el && el != src; el = el.parentNode);
			state |= el ? 1 : 2;
			clearTimeout(timers.hide);
		} else {
			setOpacity(0);
		}
		var nsteps = info.fadeInDuration / info.fadeInInterval || 1;
		fade(Math.ceil(info.opacity / nsteps), info.opacity, info.fadeInInterval);
	}

	function fadeOut() {
		var nsteps = info.fadeOutDuration / info.fadeOutInterval || 1;
		fade(-Math.ceil(info.opacity / nsteps), 0, info.fadeOutInterval, hide);
	}

	function setOpacity(level) {
		if (level < 0) {
			opacity = 0;
		} else if (level > info.opacity) {
			opacity = info.opacity;
		} else {
			opacity = level;
		}
		iframe.style.opacity = opacity / 100;
		iframe.style.MozOpacity = opacity / 100;
		iframe.style.KHTMLOpacity = opacity / 100;
		iframe.style.filter = 'alpha(opacity=' + opacity + ')';
	}

	function adjust() {
		if ((adjusted && !me.readjust) || !src || !info) return;

		var rate = info.refresh;
		var popup = (iframe.contentDocument || iframe.contentWindow.document).body;

		var size = getSize(popup);
		var cx = size.cx;
		var cy = size.cy;
		if (!cx || !cy) {
			timers.show = setTimeout(adjust, rate ? rate : 100);
			return;
		}

		size = getFrameSize();
		var cxFrame = size.cx;
		var cyFrame = size.cy;

		var pos = getScrollPos();
		var scrollX = pos.x;
		var scrollY = pos.y;
		var dx = info.offset[0];
		var dy = info.offset[1];

		var x = mouse.x;
		var y = mouse.y;
		var cxOrigin = 0;
		var cyOrigin = 0;
		if (info.origin == 'element') {
			var el = src;
			for (x = 0, y = 0; el; el = el.offsetParent) {
				x += el.offsetLeft;
				y += el.offsetTop;
			}
			size = getSize(src);
			cxOrigin = size.cx;
			cyOrigin = size.cy;
		} else if (info.origin == 'viewport') {
			x = scrollX;
			y = scrollY;
			cxOrigin = cxFrame;
			cyOrigin = cyFrame;
		} else { // ensure a slight offset from cursor
			dx = dx || -2;
			dy = dy || -2;
		}

		var positions;
		switch (info.position) {
			case 'any': positions = ['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right']; break;
			case 'vertical': positions = ['top', 'bottom']; break;
			case 'horizontal': positions = ['left', 'right']; break;
			default: positions = info.position.split(/\s+/);
		}

		var vp = info.origin == 'viewport';
		var centerX = scrollX + (cxFrame / 2);
		var centerY = scrollY + (cyFrame / 2);
		var posinfo = {x: 0, y: 0, baseX: x, baseY: y, baseDX: dx, baseDY: dy, radius: Number.MAX_VALUE};
		for (var i = 0, l = positions.length, normX, normY, radius; i < l; i++) {
			x = posinfo.baseX;
			y = posinfo.baseY;
			dx = posinfo.baseDX;
			dy = posinfo.baseDY;

			switch (positions[i]) {
				case 'top': if (!vp) y -= cy; x += (cxOrigin / 2) - (cx / 2); break;
				case 'right': if (vp) x -= cx; x += cxOrigin; y += (cyOrigin / 2) - (cy / 2); dx *= -1; break;
				case 'bottom': if (vp) y -= cy; x += (cxOrigin / 2) - (cx / 2); y += cyOrigin; dy *= -1; break;
				case 'left': if (!vp) x -= cx; y += (cyOrigin / 2) - (cy / 2); break;
				case 'top-left': if (!vp) { x -= cx; y -= cy; } break;
				case 'top-right': if (vp) x -= cx; else y -= cy; x += cxOrigin; dx *= -1; break;
				case 'bottom-left': if (vp) y -= cy; else x -= cx; y += cyOrigin; dy *= -1; break;
				case 'bottom-right': if (vp) { x -= cx; y -= cy; } x += cxOrigin; y += cyOrigin; dx *= -1; dy *= -1; break;
				case 'center': x += (cxOrigin / 2) - (cx / 2); y += (cyOrigin / 2) - (cy / 2); break;
				default: continue;
			}

			normX = x + (cx / 2) + dx - centerX;
			normY = y + (cy / 2) + dy - centerY;
			radius = Math.sqrt((normX * normX) + (normY * normY));
			if (radius < posinfo.radius) {
				posinfo.x = x;
				posinfo.y = y;
				posinfo.dx = dx;
				posinfo.dy = dy;
				posinfo.radius = radius;
				posinfo.position = positions[i];
			}
		}
		x = Math.floor(posinfo.x);
		y = Math.floor(posinfo.y);
		dx = Math.floor(posinfo.dx);
		dy = Math.floor(posinfo.dy);

		if (info.classPrefix != null) {
			var cls = popup.className;
			if (!new RegExp('\\b' + info.classPrefix + posinfo.position + '\\b').test(cls)) {
				cls = cls.replace(new RegExp('\\s*\\b' + info.classPrefix + '\\S+', 'g'), '');
				popup.className = cls + ' ' + info.classPrefix + posinfo.position;
			}
		}

		if (info.keepInView) {
			var maxX = scrollX + cxFrame;
			var maxY = scrollY + cyFrame;
			if ((x + cx) > maxX) x = maxX - cx;
			if ((y + cy) > maxY) y = maxY - cy;
			if (x < scrollX) x = scrollX;
			if (y < scrollY) y = scrollY;
			if ((x + dx) >= scrollX && (x + dx + cx) <= maxX) x += dx;
			if ((y + dy) >= scrollY && (y + dy + cy) <= maxY) y += dy;
		} else {
			x += dx;
			y += dy;
		}

		iframe.style.top = y + 'px';
		iframe.style.left = x + 'px';
		iframe.style.width = cx + 'px';
		iframe.style.height = cy + 'px';
		if (iframe.style.visibility == 'hidden') {
			if (mouse.x >= x && mouse.y >= y && mouse.x <= (x + cx) && mouse.y <= (y + cy)) {
				state |= 2; // for browsers with broken event model
			}
			iframe.style.visibility = 'visible';
		}

		if (shim) {
			shim.mergeAttributes(iframe);
			shim.allowTransparency = false;
			shim.style.filter = 'alpha(opacity=0)';
		}

		adjusted = true;
		if (rate) timers.show = setTimeout(adjust, rate);
	}

	function track(e) {
		if (typeof(e.pageX) == 'number') {
			mouse = {x: e.pageX, y: e.pageY};
		} else {
			var pos = getScrollPos();
			mouse = {x: e.clientX + pos.x, y: e.clientY + pos.y};
		}
	}

	function getScrollPos() {
		var body = document.body;
		var html = document.documentElement;
		var x = (body && body.scrollLeft) || 0;
		var y = (body && body.scrollTop) || 0;
		if (html && typeof(html.scrollTop) == 'number') {
			x = Math.max(x, html.scrollLeft);
			y = Math.max(y, html.scrollTop);
		} else if (typeof(window.pageYOffset) == 'number') {
			x = window.pageXOffset;
			y = window.pageYOffset;
		}
		return {x: x, y: y};
	}

	function getFrameSize() {
		var cx = 0;
		var cy = 0;
		var body = document.body;
		var html = document.documentElement;
		if (!window.opera && html && html.clientWidth && html.clientHeight) {
			cx = html.clientWidth;
			cy = html.clientHeight;
		} else if (body && body.clientWidth && body.clientHeight) {
			cx = body.clientWidth;
			cy = body.clientHeight;
		} else if (window.innerWidth) {
			cx = window.innerWidth - 17;
			cy = window.innerHeight - 17;
		}
		return {cx: cx, cy: cy};
	}

	function getSize(el) {
		return {
			cx: Math.max(el.offsetWidth || 0, el.scrollWidth || 0),
			cy: Math.max(el.offsetHeight || 0, el.scrollHeight || 0)
		};
	}

	function addEvent(el, evt, handler) {
		if (el.addEventListener) {
			el.addEventListener(evt, handler, false);
		} else if (el.attachEvent) {
			el.detachEvent('on' + evt, handler);
			el.attachEvent('on' + evt, handler);
		}
	}

	function delEvent(el, evt, handler) {
		if (el.removeEventListener) {
			el.removeEventListener(evt, handler, false);
		} else if (el.detachEvent) {
			el.detachEvent('on' + evt, handler);
		}
	}

	this.load = load;
	this.readjust = true;
	this.create = function() {};
	this.destroy = function() {};
	this.doc = null;

	addEvent(window, 'load', load);
}
