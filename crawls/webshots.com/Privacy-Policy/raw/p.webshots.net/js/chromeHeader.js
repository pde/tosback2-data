/* begin scroller script */
var Scroller = { content: 'scroller', container: 'scroller-view', pause: 4000, lineHeight: 15, step: 1, rate: 150, spacing: 0 };

// this function and iframe usage is to accommodate Firefox high CPU bug
Scroller.load = function() {
	var content = document.getElementById(Scroller.content);
	var container = document.getElementById(Scroller.container);
	if (!container || !content) return;

	var iframe = document.createElement('iframe');
	iframe.scrolling = 'no';
	iframe.frameBorder = 0;
	iframe.style.width = '100%';
	iframe.style.height = Scroller.lineHeight + 'px';
	iframe.allowTransparency = true;
	container.appendChild(iframe);

	var doc = iframe.contentDocument || iframe.contentWindow.document;
	doc.open();
	doc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'
		+ '<html style="margin:0;padding:0;background:none;"><head>'
		+ '<meta http-equiv="content-type" content="text/html; charset=utf-8"><title>Scroller Frame</title>'
		+ '<base target="_parent">'
		+ '<link rel="stylesheet" type="text/css" href="//p.webshots.net/css/globalChrome.css">'
		+ '<script type="text/javascript" src="//p.webshots.net/js/chromeHeader.js"></script></head>'
		+ '<body id="scroll-frame" onload="Scroller.init()" style="margin:0;padding:0;">'
		+ '<div id="' + Scroller.container + '"></div><div id="' + Scroller.content + '">'
		+ content.innerHTML + '</div></body></html>');
	doc.close();
};

Scroller.init = function() {
	var content = document.getElementById(Scroller.content);
	var container = document.getElementById(Scroller.container);
	if (!content || !container) return;
	var ul = container.appendChild(content).getElementsByTagName('ul')[0];
	if (!ul) return;

	var height = ul.offsetHeight + Scroller.spacing;
	var clone = ul.cloneNode(true);
	clone.style.top = height + 'px';
	Scroller.pos = 0;
	Scroller.height = height;
	Scroller.content = ul.parentNode;
	ul.parentNode.insertBefore(clone, ul.nextSibling);
	setTimeout(Scroller.scroll, Scroller.pause);
};

Scroller.scroll = function() {
	var pos = Scroller.pos - Scroller.step;
	if (pos <= -Scroller.height) pos = 0;
	Scroller.content.style.top = pos + 'px';
	Scroller.pos = pos;
	setTimeout(Scroller.scroll, (pos % Scroller.lineHeight) ? Scroller.rate : Scroller.pause);
};
/* end scroller script */


function setFilm(e) {
	for (var el = e.srcElement || e.target; el && el.tagName != 'LI'; el = el.parentNode);
	if (el && el != el.parentNode.activeItem) {
		delClass(el.parentNode.activeItem, 'active');
		addClass(el, 'active');
		el.parentNode.activeItem = el;
	}
}

function setTab(e) {
	for (var el = e.srcElement || e.target; el && el.tagName != 'H4'; el = el.parentNode);
	if (el && el.parentNode != setTab.activeItem) {
		delClass(setTab.activeItem, 'active');
		addClass(el.parentNode, 'active');
		setTab.activeItem = el.parentNode;
	}
}
setTab.activeItem = null;

function setSkin(skin) {
	if (skin) {
		setCookie('skin', skin);
		setCookie('color', {
			classic: 'blue',
			teal: 'teal',
			jungle: 'green',
			blackfriday: 'black',
			eggplant: 'eggplant',
			sage: 'sage',
			pumpkin: 'orange',
			blazing: 'red',
			valentine: 'pink'
		}[skin]);
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

// this code is temporary
function toggleIntro() {
	if (getCookie('block_intro')) $('intro').style.display = 'none';
}

function showUser() {
	var username = "";
	if (SignedUp) {
		var start = AllCookies.indexOf("G_x1{:t}") + 8;
		var end = AllCookies.indexOf("{:n}", start);
		if (start >= 0)
			username = AllCookies.substring(start, end);
	}
	document.write('<a href="http://community.webshots.com/myphotos">' + username + '</a>');
}

function showUserPhoto(e) {
	var img = e.srcElement || e.target, html;
	if (!img || img.tagName != 'IMG') return;
	var a = img.parentNode;
	var userPhoto = hasClass(img, 'user-photo');
	if (a && a.tagName == 'A' && (userPhoto || hasClass(a, 'user-photo-s'))) {
		html = '<a href="' + a.href + '" target="_parent"><img alt="' + img.alt + '" title="" src="' + img.src + '" style="display: block; padding: 3px; background: #fff; border: 1px solid #c1c7c7;"></a>';
	} else if (userPhoto) {
		html = '<img alt="' + img.alt + '" title="" src="' + img.src + '" style="display: block; padding: 3px; background: #fff; border: 1px solid #c1c7c7;">';
	} else return;
	var info = new PopupInfo;
	info.html = html;
	info.origin = 'element';
	info.position = 'center';
	info.showDelay = 100;
	info.fadeInDuration = 250;
	info.fadeOutDuration = 250;
	info.keepInView = false;
	showUserPhoto.popup.create(img, e, info);
}
if (window == top) showUserPhoto.popup = new Popup;

function prolog() {
	addClass(document.body, 'js');
}

function epilog() {
}

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

function init() {

	
	addEvent(window, 'load', Scroller.load)

	if (!window.makeFocusBox || !makeFocusBox.set) {
		addEvent($('user'), 'focus', function(e) {
			var el = e.srcElement || e.target;
			el.value = '';
			delEvent(el, e.type, arguments.callee);
		});
	
		var pwInput = $('pass');
		if (pwInput && pwInput.type == 'text') { // remove this condition after slimmed down header is deployed
			addEvent($('pass'), 'focus', function(e) {
				var el = e.srcElement || e.target;
				var div = document.createElement('div');
				div.innerHTML = '<input type="password" name="password" id="' + el.id + '">';
				var input = div.firstChild;
				el.parentNode.replaceChild(input, el);
				setTimeout(function() { input.focus() }, 1);
				delEvent(el, e.type, arguments.callee);
			});
		}
	}

	/*var opts = $('page-options');
	if (opts) {
		for (var skins = opts.getElementsByTagName('A'), i = skins.length; i--;) {
			if (hasClass(document.body, skins[i].id)) {
				setSkin(skins[i].id);
				break;
			}
		}
		addEvent(opts, 'click', function(e) {
			for (var el = e.srcElement || e.target; el && el.tagName != 'A'; el = el.parentNode);
			if (el) {
				setSkin(el.id);
				e.returnValue = false;
				if (e.preventDefault) e.preventDefault();
			}
		});
		// this form has to go now that inputs are anchors
		if (opts.tagName == 'FORM') opts.action = '';
	}*/

	// handler for "don't show me this again" intro button
	addEvent($('close-btn'), 'click', function(e) {
		setCookie('block_intro', '1');
		var intro = $('intro');
		intro.parentNode.removeChild(intro);
	});

	addEvent($('clear-btn'), 'click', function() {
		delCookie('webshotsHistory_topic');
		var hist = $('history');
		if (hist) {
			var p = document.createElement('p');
			p.innerHTML = '(no history yet)';
			hist.parentNode.replaceChild(p, hist);
		}
	});

	addEvent($('open-btn'), 'click', function(e) {
		var frm = (e.srcElement || e.target).form;
		setClass(frm, 'drop', !hasClass(frm, 'drop'));
	});

	addEvent($('search-menu'), 'mouseover', function() {
		addClass($('search-form'), 'drop');
	});

	addEvent($('search-menu'), 'mouseout', function() {
		delClass($('search-form'), 'drop');
	});
/*
	addEvent($('clear-recent'), 'click', function() {
		delCookie('webshotsHistory_search');
		// remove history heading, history list, and clear history button
		var menu = $('search-menu');
		for (var nodes = ['div', 'ul', 'div'], i = nodes.length; i--;) {
			menu.removeChild(menu.getElementsByTagName(nodes[i])[0]);
		}
	});*/

	addEvent($('advanced-search'), 'click', function(e) {
		var query = $('query').value;
		if (query) (e.srcElement || e.target).href += '?query=' + encodeURIComponent(query);
	});

	addEvent($('member-search'), 'click', function(e) {
		var query = $('query').value;
		if (query) (e.srcElement || e.target).href = 'http://community.webshots.com/scripts/misc.fcgi?action=userSearch&amp;username=' + encodeURIComponent(query);
	});

	var nodes, i;

	for (nodes = $('facebook-share1', 'facebook-share2'), i = nodes.length; i--;) {
		addEvent(nodes[i], 'click', function(e) {
			void(window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(location.href)+'&t='+encodeURIComponent(document.title), 'sharer','toolbar=0,status=0,width=626,height=436'));
			//return false;
			haltEvent(e);
		});
	}

	var nodes, i;

	for (nodes = $('delicious-share1', 'delicious-share2'), i = nodes.length; i--;) {
		addEvent(nodes[i], 'click', function(e) {
			void(window.open('http://del.icio.us/post?v=4&partner=wshots&noui&jump=close&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title),'delicious','toolbar=no,width=700,height=400'));
			haltEvent(e);
		});
	}
/*
	// remove this after 'alerts' project is released.
	if (location.href == 'http://www.webshots.com/myaccount?action=viewOptions') {
		var el = $('content').firstChild.getElementsByTagName('A');
		for (var i = el.length; i--;) {
			var tag = el[i];
			if (tag.href == 'http://www.webshots.com/html/mobile_camera.html') {
				tag.href = 'http://www.webshots.com/html/mobile.html';
			}
		}
	}*/

	/*var el = $('channels');
	if (el) {
		for (var items = el.getElementsByTagName('li'), i = items.length, li; i--;) {
			li = items[i];
			if (hasClass(li, 'active')) {
				li.parentNode.activeItem = li;
			}
		}
		addEvent(el, 'mouseover', setFilm);
	}*/

	/*el = $('footer');
	if (el) {
		var ul = el.getElementsByTagName('ul')[0];
		setTab.activeItem = ul.getElementsByTagName('li')[0];
		addEvent(ul, 'click', setTab);
	}

	var sites = $('cnet-sites');
	if (sites) {
		addEvent(sites.form, 'submit', function(e) {
			if (sites.selectedIndex > 0) location.href = sites.value;
			haltEvent(e);
		});
	}*/

	addEvent(document, 'mouseover', showUserPhoto);
}
