/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var swfobject = function() {
	
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
		ON_READY_STATE_CHANGE = "onreadystatechange",
		
		win = window,
		doc = document,
		nav = navigator,
		
		plugin = false,
		domLoadFnArr = [main],
		regObjArr = [],
		objIdArr = [],
		listenersArr = [],
		storedAltContent,
		storedAltContentId,
		storedCallbackFn,
		storedCallbackObj,
		isDomLoaded = false,
		isExpressInstallActive = false,
		dynamicStylesheet,
		dynamicStylesheetMedia,
		autoHideShow = true,
	
	/* Centralized function for browser feature detection
		- User agent string detection is only used when no good alternative is possible
		- Is executed directly for optimal performance
	*/	
	ua = function() {
		var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
			u = nav.userAgent.toLowerCase(),
			p = nav.platform.toLowerCase(),
			windows = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u),
			webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
			ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
			playerVersion = [0,0,0],
			d = null;
		if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = nav.plugins[SHOCKWAVE_FLASH].description;
			if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				plugin = true;
				ie = false; // cascaded feature detection for Internet Explorer
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof win.ActiveXObject != UNDEF) {
			try {
				var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
				if (a) { // a will return null when ActiveX is disabled
					d = a.GetVariable("$version");
					if (d) {
						ie = true; // cascaded feature detection for Internet Explorer
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
			}
			catch(e) {}
		}
		return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac };
	}(),
	
	/* Cross-browser onDomLoad
		- Will fire an event as soon as the DOM of a web page is loaded
		- Internet Explorer workaround based on Diego Perini's solution: http://javascript.nwbox.com/IEContentLoaded/
		- Regular onload serves as fallback
	*/ 
	onDomLoad = function() {
		if (!ua.w3) { return; }
		if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically 
			callDomLoadFunctions();
		}
		if (!isDomLoaded) {
			if (typeof doc.addEventListener != UNDEF) {
				doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
			}		
			if (ua.ie && ua.win) {
				doc.attachEvent(ON_READY_STATE_CHANGE, function() {
					if (doc.readyState == "complete") {
						doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
						callDomLoadFunctions();
					}
				});
				if (win == top) { // if not inside an iframe
					(function(){
						if (isDomLoaded) { return; }
						try {
							doc.documentElement.doScroll("left");
						}
						catch(e) {
							setTimeout(arguments.callee, 0);
							return;
						}
						callDomLoadFunctions();
					})();
				}
			}
			if (ua.wk) {
				(function(){
					if (isDomLoaded) { return; }
					if (!/loaded|complete/.test(doc.readyState)) {
						setTimeout(arguments.callee, 0);
						return;
					}
					callDomLoadFunctions();
				})();
			}
			addLoadEvent(callDomLoadFunctions);
		}
	}();
	
	function callDomLoadFunctions() {
		if (isDomLoaded) { return; }
		try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
			var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
			t.parentNode.removeChild(t);
		}
		catch (e) { return; }
		isDomLoaded = true;
		var dl = domLoadFnArr.length;
		for (var i = 0; i < dl; i++) {
			domLoadFnArr[i]();
		}
	}
	
	function addDomLoadEvent(fn) {
		if (isDomLoaded) {
			fn();
		}
		else { 
			domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
		}
	}
	
	/* Cross-browser onload
		- Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
		- Will fire an event as soon as a web page including all of its assets are loaded 
	 */
	function addLoadEvent(fn) {
		if (typeof win.addEventListener != UNDEF) {
			win.addEventListener("load", fn, false);
		}
		else if (typeof doc.addEventListener != UNDEF) {
			doc.addEventListener("load", fn, false);
		}
		else if (typeof win.attachEvent != UNDEF) {
			addListener(win, "onload", fn);
		}
		else if (typeof win.onload == "function") {
			var fnOld = win.onload;
			win.onload = function() {
				fnOld();
				fn();
			};
		}
		else {
			win.onload = fn;
		}
	}
	
	/* Main function
		- Will preferably execute onDomLoad, otherwise onload (as a fallback)
	*/
	function main() { 
		if (plugin) {
			testPlayerVersion();
		}
		else {
			matchVersions();
		}
	}
	
	/* Detect the Flash Player version for non-Internet Explorer browsers
		- Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
		  a. Both release and build numbers can be detected
		  b. Avoid wrong descriptions by corrupt installers provided by Adobe
		  c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
		- Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
	*/
	function testPlayerVersion() {
		var b = doc.getElementsByTagName("body")[0];
		var o = createElement(OBJECT);
		o.setAttribute("type", FLASH_MIME_TYPE);
		var t = b.appendChild(o);
		if (t) {
			var counter = 0;
			(function(){
				if (typeof t.GetVariable != UNDEF) {
					var d = t.GetVariable("$version");
					if (d) {
						d = d.split(" ")[1].split(",");
						ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
				else if (counter < 10) {
					counter++;
					setTimeout(arguments.callee, 10);
					return;
				}
				b.removeChild(o);
				t = null;
				matchVersions();
			})();
		}
		else {
			matchVersions();
		}
	}
	
	/* Perform Flash Player and SWF version matching; static publishing only
	*/
	function matchVersions() {
		var rl = regObjArr.length;
		if (rl > 0) {
			for (var i = 0; i < rl; i++) { // for each registered object element
				var id = regObjArr[i].id;
				var cb = regObjArr[i].callbackFn;
				var cbObj = {success:false, id:id};
				if (ua.pv[0] > 0) {
					var obj = getElementById(id);
					if (obj) {
						if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
							setVisibility(id, true);
							if (cb) {
								cbObj.success = true;
								cbObj.ref = getObjectById(id);
								cb(cbObj);
							}
						}
						else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
							var att = {};
							att.data = regObjArr[i].expressInstall;
							att.width = obj.getAttribute("width") || "0";
							att.height = obj.getAttribute("height") || "0";
							if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
							if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
							// parse HTML object param element's name-value pairs
							var par = {};
							var p = obj.getElementsByTagName("param");
							var pl = p.length;
							for (var j = 0; j < pl; j++) {
								if (p[j].getAttribute("name").toLowerCase() != "movie") {
									par[p[j].getAttribute("name")] = p[j].getAttribute("value");
								}
							}
							showExpressInstall(att, par, id, cb);
						}
						else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display alternative content instead of SWF
							displayAltContent(obj);
							if (cb) { cb(cbObj); }
						}
					}
				}
				else {	// if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or alternative content)
					setVisibility(id, true);
					if (cb) {
						var o = getObjectById(id); // test whether there is an HTML object element or not
						if (o && typeof o.SetVariable != UNDEF) { 
							cbObj.success = true;
							cbObj.ref = o;
						}
						cb(cbObj);
					}
				}
			}
		}
	}
	
	function getObjectById(objectIdStr) {
		var r = null;
		var o = getElementById(objectIdStr);
		if (o && o.nodeName == "OBJECT") {
			if (typeof o.SetVariable != UNDEF) {
				r = o;
			}
			else {
				var n = o.getElementsByTagName(OBJECT)[0];
				if (n) {
					r = n;
				}
			}
		}
		return r;
	}
	
	/* Requirements for Adobe Express Install
		- only one instance can be active at a time
		- fp 6.0.65 or higher
		- Win/Mac OS only
		- no Webkit engines older than version 312
	*/
	function canExpressInstall() {
		return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
	}
	
	/* Show the Adobe Express Install dialog
		- Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
	*/
	function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
		isExpressInstallActive = true;
		storedCallbackFn = callbackFn || null;
		storedCallbackObj = {success:false, id:replaceElemIdStr};
		var obj = getElementById(replaceElemIdStr);
		if (obj) {
			if (obj.nodeName == "OBJECT") { // static publishing
				storedAltContent = abstractAltContent(obj);
				storedAltContentId = null;
			}
			else { // dynamic publishing
				storedAltContent = obj;
				storedAltContentId = replaceElemIdStr;
			}
			att.id = EXPRESS_INSTALL_ID;
			if (typeof att.width == UNDEF || (!/%$/.test(att.width) && parseInt(att.width, 10) < 310)) { att.width = "310"; }
			if (typeof att.height == UNDEF || (!/%$/.test(att.height) && parseInt(att.height, 10) < 137)) { att.height = "137"; }
			doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
			var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
				fv = "MMredirectURL=" + win.location.toString().replace(/&/g,"%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
			if (typeof par.flashvars != UNDEF) {
				par.flashvars += "&" + fv;
			}
			else {
				par.flashvars = fv;
			}
			// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
			// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			if (ua.ie && ua.win && obj.readyState != 4) {
				var newObj = createElement("div");
				replaceElemIdStr += "SWFObjectNew";
				newObj.setAttribute("id", replaceElemIdStr);
				obj.parentNode.insertBefore(newObj, obj); // insert placeholder div that will be replaced by the object element that loads expressinstall.swf
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						obj.parentNode.removeChild(obj);
					}
					else {
						setTimeout(arguments.callee, 10);
					}
				})();
			}
			createSWF(att, par, replaceElemIdStr);
		}
	}
	
	/* Functions to abstract and display alternative content
	*/
	function displayAltContent(obj) {
		if (ua.ie && ua.win && obj.readyState != 4) {
			// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
			// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			var el = createElement("div");
			obj.parentNode.insertBefore(el, obj); // insert placeholder div that will be replaced by the alternative content
			el.parentNode.replaceChild(abstractAltContent(obj), el);
			obj.style.display = "none";
			(function(){
				if (obj.readyState == 4) {
					obj.parentNode.removeChild(obj);
				}
				else {
					setTimeout(arguments.callee, 10);
				}
			})();
		}
		else {
			obj.parentNode.replaceChild(abstractAltContent(obj), obj);
		}
	} 

	function abstractAltContent(obj) {
		var ac = createElement("div");
		if (ua.win && ua.ie) {
			ac.innerHTML = obj.innerHTML;
		}
		else {
			var nestedObj = obj.getElementsByTagName(OBJECT)[0];
			if (nestedObj) {
				var c = nestedObj.childNodes;
				if (c) {
					var cl = c.length;
					for (var i = 0; i < cl; i++) {
						if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
							ac.appendChild(c[i].cloneNode(true));
						}
					}
				}
			}
		}
		return ac;
	}
	
	/* Cross-browser dynamic SWF creation
	*/
	function createSWF(attObj, parObj, id) {
		var r, el = getElementById(id);
		if (ua.wk && ua.wk < 312) { return r; }
		if (el) {
			if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
				attObj.id = id;
			}
			if (ua.ie && ua.win) { // Internet Explorer + the HTML object element + W3C DOM methods do not combine: fall back to outerHTML
				var att = "";
				for (var i in attObj) {
					if (attObj[i] != Object.prototype[i]) { // filter out prototype additions from other potential libraries
						if (i.toLowerCase() == "data") {
							parObj.movie = attObj[i];
						}
						else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							att += ' class="' + attObj[i] + '"';
						}
						else if (i.toLowerCase() != "classid") {
							att += ' ' + i + '="' + attObj[i] + '"';
						}
					}
				}
				var par = "";
				for (var j in parObj) {
					if (parObj[j] != Object.prototype[j]) { // filter out prototype additions from other potential libraries
						par += '<param name="' + j + '" value="' + parObj[j] + '" />';
					}
				}
				el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
				objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)
				r = getElementById(attObj.id);	
			}
			else { // well-behaving browsers
				var o = createElement(OBJECT);
				o.setAttribute("type", FLASH_MIME_TYPE);
				for (var m in attObj) {
					if (attObj[m] != Object.prototype[m]) { // filter out prototype additions from other potential libraries
						if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							o.setAttribute("class", attObj[m]);
						}
						else if (m.toLowerCase() != "classid") { // filter out IE specific attribute
							o.setAttribute(m, attObj[m]);
						}
					}
				}
				for (var n in parObj) {
					if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // filter out prototype additions from other potential libraries and IE specific param element
						createObjParam(o, n, parObj[n]);
					}
				}
				el.parentNode.replaceChild(o, el);
				r = o;
			}
		}
		return r;
	}
	
	function createObjParam(el, pName, pValue) {
		var p = createElement("param");
		p.setAttribute("name", pName);	
		p.setAttribute("value", pValue);
		el.appendChild(p);
	}
	
	/* Cross-browser SWF removal
		- Especially needed to safely and completely remove a SWF in Internet Explorer
	*/
	function removeSWF(id) {
		var obj = getElementById(id);
		if (obj && obj.nodeName == "OBJECT") {
			if (ua.ie && ua.win) {
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						removeObjectInIE(id);
					}
					else {
						setTimeout(arguments.callee, 10);
					}
				})();
			}
			else {
				obj.parentNode.removeChild(obj);
			}
		}
	}
	
	function removeObjectInIE(id) {
		var obj = getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null;
				}
			}
			obj.parentNode.removeChild(obj);
		}
	}
	
	/* Functions to optimize JavaScript compression
	*/
	function getElementById(id) {
		var el = null;
		try {
			el = doc.getElementById(id);
		}
		catch (e) {}
		return el;
	}
	
	function createElement(el) {
		return doc.createElement(el);
	}
	
	/* Updated attachEvent function for Internet Explorer
		- Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
	*/	
	function addListener(target, eventType, fn) {
		target.attachEvent(eventType, fn);
		listenersArr[listenersArr.length] = [target, eventType, fn];
	}
	
	/* Flash Player and SWF content version matching
	*/
	function hasPlayerVersion(rv) {
		var pv = ua.pv, v = rv.split(".");
		v[0] = parseInt(v[0], 10);
		v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
		v[2] = parseInt(v[2], 10) || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	}
	
	/* Cross-browser dynamic CSS creation
		- Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
	*/	
	function createCSS(sel, decl, media, newStyle) {
		if (ua.ie && ua.mac) { return; }
		var h = doc.getElementsByTagName("head")[0];
		if (!h) { return; } // to also support badly authored HTML pages that lack a head element
		var m = (media && typeof media == "string") ? media : "screen";
		if (newStyle) {
			dynamicStylesheet = null;
			dynamicStylesheetMedia = null;
		}
		if (!dynamicStylesheet || dynamicStylesheetMedia != m) { 
			// create dynamic stylesheet + get a global reference to it
			var s = createElement("style");
			s.setAttribute("type", "text/css");
			s.setAttribute("media", m);
			dynamicStylesheet = h.appendChild(s);
			if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
				dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
			}
			dynamicStylesheetMedia = m;
		}
		// add style rule
		if (ua.ie && ua.win) {
			if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
				dynamicStylesheet.addRule(sel, decl);
			}
		}
		else {
			if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
				dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
			}
		}
	}
	
	function setVisibility(id, isVisible) {
		if (!autoHideShow) { return; }
		var v = isVisible ? "visible" : "hidden";
		if (isDomLoaded && getElementById(id)) {
			getElementById(id).style.visibility = v;
		}
		else {
			createCSS("#" + id, "visibility:" + v);
		}
	}

	/* Filter to avoid XSS attacks
	*/
	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
	}
	
	/* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
	*/
	var cleanup = function() {
		if (ua.ie && ua.win) {
			window.attachEvent("onunload", function() {
				// remove listeners to avoid memory leaks
				var ll = listenersArr.length;
				for (var i = 0; i < ll; i++) {
					listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
				}
				// cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
				var il = objIdArr.length;
				for (var j = 0; j < il; j++) {
					removeSWF(objIdArr[j]);
				}
				// cleanup library's main closures to avoid memory leaks
				for (var k in ua) {
					ua[k] = null;
				}
				ua = null;
				for (var l in swfobject) {
					swfobject[l] = null;
				}
				swfobject = null;
			});
		}
	}();
	
	return {
		/* Public API
			- Reference: http://code.google.com/p/swfobject/wiki/documentation
		*/ 
		registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
			if (ua.w3 && objectIdStr && swfVersionStr) {
				var regObj = {};
				regObj.id = objectIdStr;
				regObj.swfVersion = swfVersionStr;
				regObj.expressInstall = xiSwfUrlStr;
				regObj.callbackFn = callbackFn;
				regObjArr[regObjArr.length] = regObj;
				setVisibility(objectIdStr, false);
			}
			else if (callbackFn) {
				callbackFn({success:false, id:objectIdStr});
			}
		},
		
		getObjectById: function(objectIdStr) {
			if (ua.w3) {
				return getObjectById(objectIdStr);
			}
		},
		
		embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
			var callbackObj = {success:false, id:replaceElemIdStr};
			if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
				setVisibility(replaceElemIdStr, false);
				addDomLoadEvent(function() {
					widthStr += ""; // auto-convert to string
					heightStr += "";
					var att = {};
					if (attObj && typeof attObj === OBJECT) {
						for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
							att[i] = attObj[i];
						}
					}
					att.data = swfUrlStr;
					att.width = widthStr;
					att.height = heightStr;
					var par = {}; 
					if (parObj && typeof parObj === OBJECT) {
						for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
							par[j] = parObj[j];
						}
					}
					if (flashvarsObj && typeof flashvarsObj === OBJECT) {
						for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
							if (typeof par.flashvars != UNDEF) {
								par.flashvars += "&" + k + "=" + flashvarsObj[k];
							}
							else {
								par.flashvars = k + "=" + flashvarsObj[k];
							}
						}
					}
					if (hasPlayerVersion(swfVersionStr)) { // create SWF
						var obj = createSWF(att, par, replaceElemIdStr);
						if (att.id == replaceElemIdStr) {
							setVisibility(replaceElemIdStr, true);
						}
						callbackObj.success = true;
						callbackObj.ref = obj;
					}
					else if (xiSwfUrlStr && canExpressInstall()) { // show Adobe Express Install
						att.data = xiSwfUrlStr;
						showExpressInstall(att, par, replaceElemIdStr, callbackFn);
						return;
					}
					else { // show alternative content
						setVisibility(replaceElemIdStr, true);
					}
					if (callbackFn) { callbackFn(callbackObj); }
				});
			}
			else if (callbackFn) { callbackFn(callbackObj);	}
		},
		
		switchOffAutoHideShow: function() {
			autoHideShow = false;
		},
		
		ua: ua,
		
		getFlashPlayerVersion: function() {
			return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
		},
		
		hasFlashPlayerVersion: hasPlayerVersion,
		
		createSWF: function(attObj, parObj, replaceElemIdStr) {
			if (ua.w3) {
				return createSWF(attObj, parObj, replaceElemIdStr);
			}
			else {
				return undefined;
			}
		},
		
		showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
			if (ua.w3 && canExpressInstall()) {
				showExpressInstall(att, par, replaceElemIdStr, callbackFn);
			}
		},
		
		removeSWF: function(objElemIdStr) {
			if (ua.w3) {
				removeSWF(objElemIdStr);
			}
		},
		
		createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
			if (ua.w3) {
				createCSS(selStr, declStr, mediaStr, newStyleBoolean);
			}
		},
		
		addDomLoadEvent: addDomLoadEvent,
		
		addLoadEvent: addLoadEvent,
		
		getQueryParamValue: function(param) {
			var q = doc.location.search || doc.location.hash;
			if (q) {
				if (/\?/.test(q)) { q = q.split("?")[1]; } // strip question mark
				if (param == null) {
					return urlEncodeIfNecessary(q);
				}
				var pairs = q.split("&");
				for (var i = 0; i < pairs.length; i++) {
					if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
						return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
					}
				}
			}
			return "";
		},
		
		// For internal usage only
		expressInstallCallback: function() {
			if (isExpressInstallActive) {
				var obj = getElementById(EXPRESS_INSTALL_ID);
				if (obj && storedAltContent) {
					obj.parentNode.replaceChild(storedAltContent, obj);
					if (storedAltContentId) {
						setVisibility(storedAltContentId, true);
						if (ua.ie && ua.win) { storedAltContent.style.display = "block"; }
					}
					if (storedCallbackFn) { storedCallbackFn(storedCallbackObj); }
				}
				isExpressInstallActive = false;
			} 
		}
	};
}();
;
/**
 * Sets a cookie in the user's browser
 * 
 * @param name of the cookie
 * @param value of the cookie
 * @param expiry_days from now, null for a session cookie
 */
function setCookie(name, value, expiry_days)
{
	expiry_str = '';
	path_str = '; path=/';
	domain_str = '; domain=clubpenguin.com';
	if(expiry_days) {
		var d = new Date();
		d.setDate(d.getDate() + expiry_days);
		expiry_str = ';expires=' + d.toGMTString();
	}
	
	document.cookie = name + '=' + escape(value) + expiry_str + path_str + domain_str;
}

/**
 * Gets the value of the cookie from the user's browser
 * 
 * @param name of the cookie
 * @return value of the cookie, null if the cookie isn't found
 */
function getCookie(name)
{
	var s = document.cookie.indexOf(name + "=");
	if(s == -1) {
		return null;
	}
	s += name.length + 1;
	var e = document.cookie.indexOf(";", s);
	if(e == -1) {
		e = document.cookie.length;
	}
	return unescape(document.cookie.substring(s, e));
}

/* 
The following checks for and records if a visitor is new or is a return visitor -- for A/B testing T&T
*/

if (!getCookie ('cpvisitor')) { 
	setCookie('cpvisitorsession', 'true', ''); 
	setCookie ('cpvisitor', 'new', 2400); 
} else { 
	if (!getCookie ('cpvisitorsession')) { 
		if ((getCookie ('cpvisitor')) == 'new') {
			setCookie ('cpvisitor', 'new', -1); 
			setCookie ('cpvisitor', 'return', 2400); 
		}			
	}
}

/* 
The following checks for and records the OAST source code present in a URL clicked on from a creative asset on an external site
*/

var qsParm = new Array();
function qs() {
var query = window.location.search.substring(1);
var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
	var pos = parms[i].indexOf('=');
		if (pos > 0) {
		var key = parms[i].substring(0,pos);
		var val = parms[i].substring(pos+1);
		qsParm[key] = val;
		}
	}
} 

qsParm['oast'] = null;
qs();

if (qsParm['oast'] != null) {
	if (getCookie ('oast')) { 
		setCookie ('oast', '', -1);
		setCookie ('oast', qsParm['oast'], 2400);
	} else {
		setCookie ('oast', qsParm['oast'], 2400);
	}
}

if(typeof jsAPI === 'undefined') {
	jsAPI = {};
}

jsAPI.showHTMLElements = function() {
	$('#membershipOptionsPrimary, #membershipOptions_real, #membershipOptions_other, #membershipOptionsSecondary, #membershipOptions_ca').css({"visibility":"visible"});
} 


jsAPI.mboxBackground = function() {
	try{
		$('#content').css({
			'background' : '#417DC5'
		});
		
		var IE7 =  ($.browser.msie  && parseInt($.browser.version) == 7);
		if (IE7){
			if ($('#membershipOptionsPrimary').length > 0){
				$('#membershipOptionsPrimary').css({
					'background' : 'url(/images/pricing_bg_ca_ie7.png) 0 0 no-repeat',
					'height':'135px',
					'margin': '8px 0 0 -14px'
				});	
			}
		} else{
			if ($('#membershipOptionsPrimary').length > 0){
				$('#membershipOptionsPrimary').css({
					'background' : 'url(/images/pricing_bg_ca_b.png) 0 0 no-repeat',
					'height':'135px',
					'margin': '8px 0 0 -14px'
				});	
			}
		}
		
		if ($('#membershipOptions_other').length > 0){
			$('#membershipOptions_other').css({
				'background' : 'url(/images/pricing_bg_ca_b.png) 0 0 no-repeat'
			});	
		}
		
		if ($('#membershipOptions_ca').length > 0){
			$('#membershipOptions_ca').css({
				'background' : 'url(/images/pricing_bg_ca_a.png) 0 0 no-repeat',
				'height':'154px',
				'margin-left': '-15px'
			});
		}
		
		if ($('#membershipOptions_real').length > 0){
			$('#membershipOptions_real').css({
				'background' : 'url(/images/pricing_bg_ca_b.png) 0 0 no-repeat',
				'height':'135px',
				'margin-left': '-15px'
			});	
		}		

		
		if ($('#content .padd').length > 2) {
			//euro style template with no padding
			$('#membershipOptions_other').css({
				'height':'135px',
				'margin': '8px 0 20px 15px'
			});	
		} else {
			//ar style template with padding already in place
			if (!$($('#membershipOptions_other').parent()).hasClass('padd')){
				$('#membershipOptions_other').css({
					'height':'135px',
					'margin': '8px 0 20px 15px'
				});	
			} else {
				$('#membershipOptions_other').css({
					'height':'135px',
					'margin': '8px 0 20px -15px'
				});	
			}
		}
	
		if ($('#content .padd').length > 1) {
			$($('#content .padd')[0]).css({
				'background' : '#fefde1',
				'border-bottom' : '3px solid #013A69'
			});
			var lastPad = $($('#content .padd')[($('#content .padd').length-1)]);
			if (lastPad.find('object').length == 0) {
				//last pad container doesn't contains flash
				lastPad.css({
					'background' : '#fff',
					'border-top' : '3px solid #013A69',
					'margin-top' : '25px'
				});
			} else {
				//last pad container contains both flash and purchase image
				if (lastPad.find('#membershipOptionsSecondary').length > 0) {
					$('#membershipOptionsSecondary').wrap('<div class="temporary-div" />');
					$('#content .padd').css({
						'padding-bottom':0
					});
				}
				
			}
		}

	}catch(e){}
}

	;
if(typeof CP === 'undefined') {
	CP = {};
}

if(!CP.utils) {
	CP.utils = {};
}

CP.utils.Modal = function(options) {
	// options that can overwritten
	this.options = {
		overlayOpacity: 0.8,
		overlayClickClose: true,
		showClose: true,
		contentCloseDelegate: null,
		centerOnResize: true,
		transitionDuration: 250,
		onOpenComplete: function(){},
		onCloseComplete: function(){},
		onOpenStart: function(){},
		onCloseStart: function(){}
	};
	jQuery.extend(true, this.options, options);

	// states
	this.isOpen = false;
	this.isLoading = false;

	//Due to conflicts with Panels only run this on the homepage at this time.  -- Added to backlog for permanent fix.
	if (location.pathname.match(/(\/|\/fr|\/es|\/de|\/pt)(\/index.php)?/)) {
	  this.inject();
	  this.attach();
	}
};
/**
 * This the modal-xxx divs this callback creates conflicts with Panels IPE

 ** Thanks whover just commented this out instead of actually fixing the issue.
 */
CP.utils.Modal.prototype.inject = function(){
	 //create and embed required elements
	 this.overlay = jQuery('<div id="modal-overlay"></div>').appendTo('body');
	 this.loading = jQuery('<div id="modal-loading"></div>').appendTo('body');
	 this.modal = jQuery('<div id="modal-window"></div>').appendTo('body');
	 // optional - close button
	 if(this.options.showClose){
	  	this.closeButton = jQuery('<a id="modal-close" href="#">close</a>').appendTo(this.modal);
	 }
	 this.modalContent = jQuery('<div id="modal-content"></div>').appendTo(this.modal);
	 // set overlay opacity to value in options
	 this.overlay.css('opacity', this.options.overlayOpacity);
	 this.body = jQuery('body');
};
CP.utils.Modal.prototype.attach = function(){
	var self = this;
	// overlay and loading resize handler
	jQuery(window).resize(function(){
		self.positionOverlay();
		self.centerElement(self.loading);
	});

	// optional - content triggered close event
	if(this.options.contentCloseDelegate != null){
		this.modalContent.delegate(this.options.contentCloseDelegate, 'click', function(e){
			e.preventDefault();
			self.close();
		});
	}
	// optional - hide on overlay click
	this.overlay.click(function(e){
		e.stopPropagation();

		if(self.options.overlayClickClose){
			self.close();
		}
	});

	// optional - close button
	if(this.options.showClose){
		// hide on close button click
		this.closeButton.click(function(e){
			e.preventDefault();
			self.close();
		});
	}
	// optional - window resize handler
	if(this.options.centerOnResize){
		jQuery(window).resize(function(){
			self.centerElement(self.modal);
		});
	}
};
CP.utils.Modal.prototype.centerElement = function(element){
	// usefull dimensions
	var elementWidth = element.width();

	var elementHeight = element.height();
	var windowWidth = jQuery(window).width();
	var windowHeight = jQuery(window).height();
	var scrollTop = jQuery(window).scrollTop();
	// calculate center
	var left = (windowWidth / 2) - (elementWidth / 2);
	var top = scrollTop + ((windowHeight / 2) - (elementHeight / 2));
	// bounding
	if(top < 0 ) top = 0;
	if(left < 0) left = 0;
	// set position
	element.css({
		top: top,
		left: left
	});
}
CP.utils.Modal.prototype.positionOverlay = function(){
	// ie6 alternate overlay size other browsers use css
	if(jQuery.browser.msie && jQuery.browser.version === '6.0'){
		this.overlay.css('height', jQuery(document).height());
	}
};
CP.utils.Modal.prototype.positionModal = function(){
	this.centerElement(this.modal);
};
CP.utils.Modal.prototype.showLoading = function(){
	if(this.isOpen){
		// already open just show loading indicator
		this.modal.fadeOut(this.options.transitionDuration);
		this.loading.fadeIn(this.options.transitionDuration);
	}else{
		// not open yet
		this.overlay.fadeIn(this.options.transitionDuration);
		this.positionOverlay();
		this.loading.fadeIn(this.options.transitionDuration);
		this.centerElement(this.loading);
	}
	this.isLoading = true;
};
CP.utils.Modal.prototype.open = function(modalContent, openCallback, closeCallback){
	var self = this;
	if(!this.isOpen){
		if(this.isLoading){
			// modal is already in loading state just open content
			this.loading.hide();
			this.modalContent.append(modalContent);
			this.modal.fadeIn(this.options.transitionDuration, function() {
				// callbacks
				self.options.onOpenComplete();

				if(closeCallback) self.activeCloseCallback = closeCallback;
			});
			this.options.onOpenStart();
			if(openCallback) openCallback();
			this.centerElement(this.modal);
			// update state
			this.isOpen = true;
			this.isLoading = false;
			if (self.closeButton) {
				self.closeButton.show();
			}
			this.body.addClass('modal-active');
		} else{
			// fresh modal nothing is open yet
			this.overlay.fadeIn(self.options.transitionDuration, function(){
				self.modalContent.append(modalContent);
				self.modal.fadeIn(self.options.transitionDuration, function() {
					// callbacks
					self.options.onOpenComplete();

					if(closeCallback) self.activeCloseCallback = closeCallback;
				});
				self.options.onOpenStart();
				if (self.closeButton) {
					self.closeButton.show();
				}
				if(openCallback) openCallback();
				self.centerElement(self.modal);
				// update state
				self.isOpen = true;
				self.isLoading = false;
				self.body.addClass('modal-active');
			});
			this.positionOverlay();
		}
	}else{
		// window already open just refresh content
		this.modal.css({visibility: 'hidden'}); ////to support interapp linking, instead of //this.modal.hide();
		this.modalContent.empty();
		this.modalContent.append(modalContent);
		this.options.onOpenStart();
		this.modal.css({visibility: 'visible'}); //to support interapp linking, instead of //this.modal.show();
		this.centerElement(this.modal);
		// update state
		this.isOpen = true;
		this.isLoading = false;
		this.body.addClass('modal-active');
		// callbacks
		this.options.onOpenComplete();
		if(openCallback) openCallback();
		if(closeCallback) this.activeCloseCallback = closeCallback;
	}
};
CP.utils.Modal.prototype.close = function(callback){
	if(this.isOpen){
		var self = this;

		//If you are in IE, find all embedded objects and replace them with divs. fadeout doesn't play too nice them
		if(jQuery.browser.msie) {
			var embeddedObjects = self.modalContent.find('object'); //Pro, Swfobject 2.x only uses object element!

			embeddedObjects.each(function(index, embObj) {
				embeddedObjects.replaceWith('<div id="' + embeddedObjects.attr('id') + '" />');
			});
		}

		// callback
		this.options.onCloseStart();

		// hide everything
		this.modal.fadeOut(this.options.transitionDuration, function(){
			self.modalContent.empty();
			self.loading.hide();
			self.overlay.hide();
			if (self.closeButton) {
				self.closeButton.hide();
			}

			// update state
			self.isLoading = false;
			self.isOpen = false;

			// remove class to body to signify closed modal
			self.body.removeClass('modal-active');

			// callbacks
			self.options.onCloseComplete();
			if(callback) callback();
			if(self.activeCloseCallback) {
				self.activeCloseCallback();
				self.activeCloseCallback = null;
			}
		});
	}
};
;
if (typeof CP === 'undefined') {
	var CP = {};
}

(function($) {

	CP.metrics = function(options) {
		var hostName = window.location.hostname, swid, prefix;
		this.initOptions();
		$.extend(true, this.options, options);

		if (this.options.ABTESTID === "-1"){
			ABId = getCookie('abTestId');
		}
		if (ABId && ABId !== "null") {
			this.options.ABTESTID = ABId;
		}

		if (this.options.ABTESTID === '-1' || this.options.ABTESTID === "null") {
			//Generate a GUID
			ABId = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); return v.toString(16); });
			this.options.ABTESTID = ABId;
			try {
				setCookie('abTestId', ABId, 365);
			} catch (e) {
			}
		}
		if (this.options.TRANSID === '-1') {
			transid = getCookie('playspanTRANSID');
		}

		if (transid && transid !== "null") {
			this.options.TRANSID = transid;
		}
				
		//If we still have '-1' or "null" assign unique identifier
		if (this.options.TRANSID === '-1' || this.options.TRANSID === "null") {
			this.options.REF = document.referrer;

			//Generate a GUID 
			transid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); return v.toString(16); });
			this.options.TRANSID = transid;
			try {
				setCookie('playspanTRANSID', transid);
			} catch (e) {
			}
		}
		
		if (this.options.BROWSERID === '-1') {
			browserid = getCookie('cpBROWSERID');
		}

		if (browserid && browserid !== "null") {
			this.options.BROWSERID = browserid;
		}
		
		//If we still have '-1' or "null" assign unique identifier
		if (this.options.BROWSERID === '-1' || this.options.BROWSERID === "null") {
			//Generate a GUID 
			browserid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); return v.toString(16); });
			this.options.BROWSERID = browserid;
			try {
				setCookie('cpBROWSERID', browserid, 365);
			} catch (e) {
			}
		}
		
		if (this.options.SWID === '-1') {
			swid = getCookie('playspanSWID');
		}

		if (swid && swid !== "null") {
			this.options.SWID = swid;
		}
		if (!this.options.CONTEXT_PREFIX) {
			prefix = getCookie('contextVariant') || 'purchase_funnel_';
			this.setContextVariant(prefix);
		}

		if (hostName.indexOf("stage") >= 0 || hostName.indexOf("sandbox") >= 0 || hostName.indexOf("qa") >= 0 || hostName.indexOf("dev") >= 0) {
			this.options.API_APP_NAME = "qa_" + this.options.API_APP_NAME;
		}
		if (document.documentElement.lang) {
			this.options.APP_LOCALE = document.documentElement.lang.toLowerCase().substr(0, 2);
		}

		switch (this.options.APP_LOCALE) {
			case "en":
				this.options.APP_LOCALE += "_US";
				break;
			case "pt":
				this.options.APP_LOCALE += "_BR";
				break;
			case "fr":
				this.options.APP_LOCALE += "_FR";
				break;
			case "es":
				this.options.APP_LOCALE += "_ES";
				break;
			case "de":
				this.options.APP_LOCALE += "_DE";
				break;
		}
	};

	CP.metrics.prototype.setSWID = function(swid) {
		if (swid && swid !== "null") {
			this.options.SWID = swid;
			try {
				setCookie('playspanSWID', swid);
			} catch (e) {
			}
		}
	};
	
	CP.metrics.prototype.getTRANSID = function() {
		if (transid && transid !== "null") {
			return transid;
		}
	};

	CP.metrics.prototype.setContextVariant = function(variant) {
		this.options.CONTEXT_PREFIX = variant;
		try {
			setCookie('contextVariant', variant);
		} catch (e) {
		}
	};

	CP.metrics.prototype.logTimingEvent = function(location, moreData) {
		var tag = this.options.TAG, network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE, context = this.options.CONTEXT, transid = this.options.TRANSID, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'context' : context,
			'location' : location,
			'timestamp_ms' : (new Date()).getTime(),
			'transaction_id' : transid
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}

		this.logEvent(data);
	};
	CP.metrics.prototype.logError = function(moreData) {
		var tag = 'error', network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'browser_width' : $(window).width(),
			'browser_height' : $(window).height() 
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}
		this.logEvent(data);
	};

	CP.metrics.prototype.pageView = function(moreData) {
		var tag = 'pageview', network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE
		var url = window.location.pathname, transid = this.options.TRANSID, browserid = this.options.BROWSERID, abId = this.options.ABTESTID, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'transaction_id' : transid,
			'browser_id' : browserid,
			'location' : url,
			'browser_width' : $(window).width(),
			'browser_height' : $(window).height(),
			'abTestId' : ABId 
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}
		this.logEvent(data);
	};
	
	CP.metrics.prototype.clickedLink = function(moreData) {
		//Only log this if referrer is not *.clubpenguin.com
		var referrerUrl = "";
		//$transid = getCookie('playspanTRANSID');
		if (this.options.REF) {
			 referrerUrl =  this.options.REF;
		}
		
		var tag = 'clicked_link', network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE
		var trackingCodeCMP = this.getQueryParam('cmp'), trackingCodeOAST = this.getQueryParam('oast'); 
		var trackingCode = "";
		//only one or the other will be set cmp = emails, oast = banners etc
		if (trackingCodeCMP) {
			trackingCode += trackingCodeCMP;
		}
		if (trackingCodeOAST) {
			trackingCode += trackingCodeOAST;
		}
		var trackUrl = window.location.href, isNewUser = (getCookie('cpvisitor') == "new" ? 1 : 0 );
		var transid = this.options.TRANSID, browserid = this.options.BROWSERID, ABId = this.options.ABTESTID, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'transaction_id' : transid,
			'browser_id' : browserid,
			'abTestId' : ABId,
			'track_url' : trackUrl,
			'referrer_url' : referrerUrl,
			'is_new_url' : isNewUser,
			'tracking_code' : trackingCode,  
			'ref_id' : "" //do not know what this is referring to.
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}
		this.logEvent(data);

	};
	
	CP.metrics.prototype.log = function(tag, moreData) {
		var transid = this.options.TRANSID;
		var network = this.options.NETWORK, viewNetwork = this.options.VIEW_NETWORK, appLocale = this.options.APP_LOCALE, data = {
			'tag' : tag,
			'network' : network,
			'view_network' : viewNetwork,
			'lang' : appLocale,
			'app_locale' : appLocale,
			'browser_width' : $(window).width(),
			'browser_height' : $(window).height(),
			'transaction_id' : transid
		};
		if (moreData) {
			$.extend(true, data, moreData);
		}
		this.logEvent(data);
	};

	CP.metrics.prototype.logEvent = function(data) {
		var pic, url = window.location.protocol + "//log.data.disney.com/cp?app=" + this.options.API_APP_NAME + "&user_id=" + this.options.SWID;
		for ( var key in data) {
			if (data.hasOwnProperty(key)) {
				url += "&" + key + "=" + data[key];
			}
		}
		if (this.callbackImage) {
			pic = this.callbackImage;
		} else {
			pic = new Image();
		}
		pic.src = url;
	};

	CP.metrics.prototype.stepTime = function(funnelName, stepName, moreData) {
		this.options.TAG = 'step_timing';
		try {
			var existingFunnel = getCookie('playspanFunnelName');
			if (!this.options.CONTEXT) {
				this.options.CONTEXT = existingFunnel;
				if (!this.options.CONTEXT) {
					funnelName = this.options.CONTEXT_PREFIX + funnelName;
					setCookie('playspanFunnelName', funnelName);
					this.options.CONTEXT = funnelName;
				}
			}

			this.logTimingEvent(stepName, moreData);
			if (stepName === 'end') {
				this.reset();
			}
		} catch (e) {
		}
	};

	CP.metrics.prototype.reset = function() {
		this.initOptions();
		setCookie('playspanFunnelName', '');
		setCookie('contextVariant', '');
	};

	CP.metrics.prototype.initOptions = function() {
		this.options = {
			API_APP_NAME : 'clubpenguin',
			SWID : '-1',
			ABTESTID : '-1',
			TRANSID : '-1',
			BROWSERID : '-1',
			CONTEXT : '',
			APP_LOCALE : 'en_US',
			LOCALE : 'en_US',
			NETWORK : 'c',
			VIEW_NETWORK : 'cp',
			REASON : '',
			TAG : '',
			CONTEXT_PREFIX : ''
		};
	};

	CP.metrics.prototype.track = function(pagename) {
		try {
			cto.pageName = pagename;
			cto.track();
			return true;
		} catch (e) {
			return false;
		}
	};
	
	CP.metrics.prototype.getQueryParam = function(param) {
		//escape any regex dilimeters	
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		//find the param in the query string
	    var result =  window.location.search.match(
	        new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
	    );
	    
	    //If found return value else return false;
	    return result ? result[3] : false;
	}


})(window.jQuery);

window.jQuery(document).ready(function() {
	window.metrics = new CP.metrics();
	window.metrics.clickedLink();
	window.metrics.pageView();
});
;
if(typeof CP === 'undefined') {
	CP = {};
}

if (typeof CP.global === 'undefined') {
	CP.global = {};
}

CP.global.runningVars = {
	rssURL: "http://www.clubpenguin.com/xml/blog-feed.php",
	hasFlash: true,
	blogInterval : null,
	blogDelay : 4000,
	currentBlog : 0,
	modal : null
};

(function($){

	CP.common = function(options) {
		this.options = {
		};
		$.extend(true, this.options, options);
		this.load();
	};

	CP.common.prototype.initListeners = function() {

		//language select dropdown
		$('#langdropdown a.top-level').click(function(e) {
			$(this).addClass('active');
			$('#languages').css('display', 'block');
			return false;
		});
		$('#langdropdown').mouseleave(function(){
			$('a.top-level').removeClass('active');
			$('#languages').hide();
		});


		//footer language select
		$('#language-select a.top-level').click(function(e) {
			$(this).addClass('active');
			$('#bottom-languages').css('display', 'block');
			return false;
		});
		$('#language-select').mouseleave(function(){
			$('a.top-level').removeClass('active');
			$('#bottom-languages').hide();
		});

	};

	CP.common.prototype.load = function() {
		CP.global.runningVars.hasFlash = swfobject.hasFlashPlayerVersion("9");
		this.initListeners();
		if ($('.blogscroll').length > 0) {
			this.autoRotateBlogTitles();
		}
		this.styleMobileFoooter();
		if (window.location.href.indexOf('/de/') > 0 && $('#bucket-fire').length > 0 && $('#bucket-puffle').length > 0) {
			$('#bucket-fire').show();
			$('#bucket-puffle').hide();
		}
		else
		{
			$('#bucket-fire').hide();
			$('#bucket-puffle').show();
		}
		//this.initModal();
	};

	CP.common.prototype.initModal = function() {
		CP.global.runningVars.modal = new CP.utils.Modal({
			showClose: false,
			contentCloseDelegate: '.modal-close',
			onOpenComplete: function() {},
			onCloseComplete: function() {},
			onCloseStart: function() {},
			onOpenStart: function() {}
		});
	};

	CP.common.prototype.showModal = function(htmlFile, wrapId, openCallback, closeCallback) {
		$('#modal-content').load(htmlFile + ' #' + wrapId, function(){
			//open modal
			if (!closeCallback) closeCallback= null;
			if (!openCallback) openCallback= null;
			CP.global.runningVars.modal.open('', openCallback, closeCallback);
		});
	};

	CP.common.prototype.closeModal = function() {
		CP.global.runningVars.modal.close();
	}

	CP.common.prototype.showBlogTitle = function(index) {
		var self = this;
		if ($('#nav ul.blogscroll').length > 0) {
			$('#nav ul.blogscroll li.active').fadeOut(200, function(){
				$(this).removeClass('active');
				$($('#nav ul.blogscroll li')[index]).fadeIn(200, function(){
					$(this).addClass('active');
				});
			});
		}
	};

	CP.common.prototype.autoRotateBlogTitles = function() {
		var self = this;
		CP.global.runningVars.blogInterval = setInterval(function(){
			self.showBlogTitle(CP.global.runningVars.currentBlog);
			CP.global.runningVars.currentBlog = ((CP.global.runningVars.currentBlog+1) % 3);
		}, CP.global.runningVars.blogDelay);
	};

	CP.common.prototype.styleMobileFoooter = function() {
		/* legacy footer */
		$("#submit").hide();

		$("#page-changer select").change(function() {
			window.location = $("#page-changer select option:selected").val();
		});

		$.fn.extend({
			customStyle : function(options) {
				return this.each(function() {
					var currentSelected = $("option:first");
					$(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">'+currentSelected.text()+'</span></span>').css({position:'absolute', opacity:0,fontSize:$(this).next().css('font-size')});
					var selectBoxSpan = $(this).next();
					var selectBoxWidth = parseInt($(this).width()) - 40;
					var selectBoxSpanInner = selectBoxSpan.find(':first-child');
					// //selectBoxSpan.css({display:'inline-block'});
					// selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
					// var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
					//$(this).height(selectBoxHeight).change(function(){
					//	selectBoxSpanInner.text($(this).val()).parent().addClass('changed');
					//});
			  	});
			}
		});

		$(function(){
			$('select.styled').customStyle();
		});
	}


	Drupal.behaviors.append_parameter = {
	    attach: function (context, settings) {
	      if (window.location.href.indexOf('nochrome=1') >= 0) {
	      	if (!getCookie('nochrome')) {
	      		setCookie('nochrome','1');
	      	}
	        $('a').each(function() {
	          var href = this.href;
	          // don't append if already have nochrome var, propagate it
	          if (href.indexOf("nochrome=1") < 0){
	            if (href.indexOf('?') != -1) {
	              href = href + '&nochrome=1';
	            } else {
	              href = href + '?nochrome=1';
	            }
	          }
	          $(this).attr('href', href);
	        });
	      }



	      //product section
	      //snippet to parse url parameter
	      $.myUrlParam = function(name){
	        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	        return results?results[1]:null;
	      }

	      $('a[href*="products"]').each(function() {
	        var href = this.href;
	        // don't append if already have country code var
	        if (href.indexOf("country=") >= 0){
	          return;
	        }
	        if (href.indexOf('?') != -1) {
	          href = href + '&country=' + $.myUrlParam('country');
	        }
	        else {
	          href = href + '?country=' + $.myUrlParam('country');
	        }
	        $(this).attr('href', href);
	      });

	    }
	  };
})(window.jQuery);

window.jQuery(document).ready(function(){
	window.common = new CP.common();
});;
/**
 * @todo
 */

(function($) {
  /**
   * @todo
   */
  Drupal.behaviors.club_penguin = {
    attach: function (context) {


      //checkbox checked state class for ie 8
      $('.form-checkbox').click(function(){
        $(this).siblings('label').toggleClass('checked');
      })

      //ios 5.1
     if (navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)) {
        $('label[for^="edit-terms-of-use"]').unbind('touchstart');
        $('label[for^="edit-terms-of-use"]').bind('touchstart', function(e){
          $(this).toggleClass('checked');
          var forid = $(this).attr("for");
          var checkbox = $('input#'+forid);
          checkbox.attr("checked", !checkbox.attr("checked"));
        });
      }

      // Generic non-according collapsing/expanding view (unformatted list)
      $('.view-id-help_topics.view-display-id-block .item-list', context).each(function(i) {
        var row = $(this);

        // Hide the body to start with
        //$('.item-list ul', row).hide();

        if (!row.hasClass('accordion')) {
          $('h3', row).click(function(e) {
            //$('ul', $(this).parents('item-list')).slideToggle();
            $(this).parents('.item-list').siblings().removeClass('open');
            $(this).parents('.item-list').toggleClass('open');

            return false;
          });
        }

        row.addClass('accordion');
      });

      //snippet to parse url parameter
      $.myUrlParam = function(name){
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results?results[1]:null;
      }

      // accordion for news & media q & a listing auto open
      $('.view-id-company.view-display-id-block_2 .item-list', context).each(function(i) {
        var row = $(this);
        if (!row.hasClass('accordion')) {
          $('.views-field-title-field', row).click(function(e) {
            $(this).parents('li').siblings().removeClass('open');
            $(this).parents('li').toggleClass('open');
            return false;
          });
        }
        row.addClass('accordion');
        $('.views-row-' + $.myUrlParam('expand')).addClass('open');
        //console.log($('.views-row-' + $.myUrlParam('expand')));

      });

      // Generic non-according collapsing/expanding view (unformatted list)
      $('.view-id-top_questions.view-display-id-block .item-list', context).each(function(i) {
        var row = $(this);

        // Hide the body to start with
        //$('li .views-field-nothing-1', row).hide();

        if (!row.hasClass('accordion')) {
          $('.views-field-title-field', row).click(function(e) {
            //$('.views-field-nothing-1', $(this).parents('li')).slideToggle();
            $(this).parents('li').siblings().removeClass('open');
            $(this).parents('li').toggleClass('open');
            return false;
          });
        }

        row.addClass('accordion');
      });

      // for finder search auto complete
      $('#autocomplete li').live("click", function(){
        $('#edit-find').click();
      });
      $("#edit-search").keyup(function(event){
        if(event.keyCode == 13){
          $("#edit-find").click();
        }
      });

      // reloads page and set location cookie
      $('#country_override').change(function() {
        //remove current option country code and add new country code along with default class
        var countryclasspre = $("#country_override-button .ui-selectmenu-status").text();
        var countryclasspost = $("option:contains(" + countryclasspre + ")").val().toLowerCase().replace(/ /g, '-');
        $('#country_override-button .ui-selectmenu-status').removeClass().addClass('ui-selectmenu-status ' + countryclasspost + ' country-icon');
        // cookie replaced by url parameter
        //$.cookie("CP_OVERRIDE_LOCATION_BY_USER", $('#country_override').val(), { path: '/' });
        location.replace("?country=" + $('#country_override').val());

      })

      //only if country button exist
      if ($('#country_override-button .ui-selectmenu-status').length){
        // grab value from original select menu and add to jquiery select menu option
        $('#country_override-menu li a').each(function(){
          var countryclasspre = $(this).text();
          var countryclasspost = $("option:contains(" + countryclasspre + ")").val().toLowerCase().replace(/ /g, '-');
          $(this).addClass(countryclasspost + ' country-icon');
        })

        // does the same but for currently selected option
          $('#country_override-button .ui-selectmenu-status').ready(function(){
          var countryclasspre = $('#country_override-button .ui-selectmenu-status').text();
          var countryclasspost = $("option:contains(" + countryclasspre + ")").val().toLowerCase().replace(/ /g, '-');
          $('#country_override-button .ui-selectmenu-status').addClass(countryclasspost + ' country-icon');
          $('a.' + countryclasspost + '.country-icon').addClass('hide-country');
        })
      }
    }
  };
})(jQuery);;
(function($) {

  Drupal.behaviors.club_penguin_qt = {
    attach: function(context, settings) {
      // for fun-stuff
      // Handle the next click
      $('#quicktabs-community_landing_top .next', context).click( function() {
        // Find the current tab.
        var id = parseInt($('#quicktabs-community_landing_top .item-list li.active a').attr('id').replace(/\D/g, ''));

        // Calculate the next tab id.
        id = (id + 1) % 4;

        // Send the click event.
        $('#quicktabs-tab-community_landing_top-' + id).click();
      });


      // Handle the previous click
      $('#quicktabs-community_landing_top .previous', context).click( function() {
        // Find the current tab.
        var id = parseInt($('#quicktabs-community_landing_top .item-list li.active a').attr('id').replace(/\D/g, ''));

        // Calculate the previous tab id.
        if (id == 0) {
          id = 3;
        }
        else {
          id = id - 1;
        }

        // Send the click event.
        $('#quicktabs-tab-community_landing_top-' + id).click();
      });

      // for products
      // Handle the next click
      $('#quicktabs-products_landing_quicktab .next', context).click( function() {

        // Find the current tab.
        var id = parseInt($('#quicktabs-products_landing_quicktab .item-list li.active a').attr('id').replace(/\D/g, ''));
        // Calculate the next tab id.
        id = (id + 1) % 4;

        // Send the click event.
        $('#quicktabs-tab-products_landing_quicktab-' + id).click();
      });


      // Handle the previous click
      $('#quicktabs-products_landing_quicktab .previous', context).click( function() {
        // Find the current tab.
        var id = parseInt($('#quicktabs-products_landing_quicktab .item-list li.active a').attr('id').replace(/\D/g, ''));

        // Calculate the previous tab id.
        if (id == 0) {
          id = 3;
        }
        else {
          id = id - 1;
        }

        // Send the click event.
        $('#quicktabs-tab-products_landing_quicktab-' + id).click();
      });

      // transfer click to a tag from li
      $('.quicktabs-tabs li', context).click( function() {
        $(this).find("a").click();
      });


    }
  };

})(jQuery);;
/*jshint eqnull:true */
/*!
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (value === null) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}

		return null;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};

})(jQuery, document);
;
String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, "");
};

if(typeof CP === 'undefined') {
	CP = {};
}
CP.runningVars = {
	layoutDirty : true,
	isTouchDevice : false,
	cleanWidth : 0,
	firstLoad: true,
	langDir: ""
};

(function($){

	CP.agegate = function(isGated, cutoffYear, langDir) {
		CP.runningVars.cutoffYear = cutoffYear;
		CP.runningVars.isGated = isGated;
		CP.runningVars.langDir = langDir;
		$.extend(true, this.options, {});
		this.load();
	};


	CP.agegate.prototype.initListeners = function() {
		var self = this;
		var htmltext = "";
		var hideContinue = false;

		//determine external links
		$('a').each(function(i, link){
			var isExternal = (link.href.indexOf('clubpenguin.com') < 0 &&
							link.href.indexOf('clubpenguin.de') < 0 &&
							link.href.indexOf('localhost') < 0 &&
							link.href.indexOf('javascript:') < 0 &&
							link.href.length > 0 &&
							link.href.indexOf('204.') < 0 );
			if (isExternal) {
				$(link).addClass('agegated-link');
				$(link).attr('target', '_blank');
			}

		});

		//agegate -- Gated Link Pressed
		$('.agegated-link').mousedown(function(){
			var clickedLink = this;
			CP.runningVars.pendingUrl = $(this).attr("href");
			CP.runningVars.interstitialText = $(this).attr("rel");
			if (typeof CP.runningVars.interstitialText == 'undefined') {
				CP.runningVars.interstitialText = false;
			}

			CP.runningVars.visitorAge = getCookie ('cpvisitor-yob') || null;
			if (!CP.runningVars.isGated || (CP.runningVars.visitorAge != null && parseInt(CP.runningVars.visitorAge) <= CP.runningVars.cutoffYear)) {
				//show interstitial
				self.showAgegate(function(){
					$('#agegate .question').hide();
					$('#agegate .sorry').hide();
					if (CP.runningVars.interstitialText) {
						htmltext = CP.runningVars.interstitialText.split("|");
						if (htmltext.length >= 2) {
							$('#agegate h3.interstitial').html(htmltext[0]);
							$('#agegate #interstitial').html(htmltext[1]);
							//custom text for cancel button
							if (htmltext.length >= 3) {
								$('#agegate #cancel').html(htmltext[2]);
							}
							//custom text for ok button
							if (htmltext.length >= 4) {
								if (htmltext[3] == 'hide') {
									hideContinue = true;
								} else {
									$('#agegate #continue').html(htmltext[3]);
								}
							}
						}
					}

					try {
						var clickedLinkUrl = clickedLink.href.split('/');
						if (clickedLinkUrl.length > 2) {
							clickedLinkUrl = clickedLinkUrl[0] + '/' + clickedLinkUrl[1] + '/' + clickedLinkUrl [2];
						} else {
							clickedLinkUrl	 = clickedLinkUrl[0];
						}
					}catch(e){clickedLinkUrl = ""};
					var newText = $('#interstitial').text().replace('%1', clickedLinkUrl);
					$('#interstitial').text(newText);

					$('#agegate .interstitial').show();
					$('#agegate #cancel').show();
					if (hideContinue) {
						$('#agegate #continue').hide();
					} else {
						$('#agegate #continue').show();
					}
					$('#agegate #submit').hide();
				});
				return false;
			} else {
				//show age gate question
				self.showAgegate(function(){
					$('#agegate .question').show();
					$('#agegate .sorry').hide();
					$('#agegate .interstitial').hide();
					$('#agegate #cancel').hide();
					$('#agegate #continue').hide();
					$('#agegate #submit').show();
				});
				return false;
			}
		}).click(function(){return false});

		/*$('.interstitial-link').mousedown(function(){
			CP.runningVars.visitorAge = getCookie ('cpvisitor-yob') || null;
			if (CP.runningVars.visitorAge != null && parseInt(CP.runningVars.visitorAge) < '1999') {
				window.location.href = $(this).text();

			} else if (CP.runningVars.visitorAge != null && parseInt(CP.runningVars.visitorAge) > '1999') {

				self.showAgegate(function(){
					$('#agegate #result').show();
						$('#selected-values,#selectboxes').hide();
						$('#agegate #back').show();
						$('#agegate #submit').hide();
				});
				return false;
			} else {
				//open lightbox
				CP.runningVars.pendingUrl = $(this).text();
				self.showAgegate();
				return false;
			}
		}).click(function(){return false});*/


		// Date select boxes
		$('#agegate .selected-value').live('click', function(e) {
			var index = $('.selected-value').index(this);

			$($('#selectboxes > div')[index]).toggle();
			if ($($('#selectboxes > div')[index]).is(':visible')){
				$(this).css({'background-position':'-4px -42px'});
			} else {
				$(this).css({'background-position':'top center'});

			}
		});


		$('#agegate .selected-value').live('mouseover', function(e) {
			var index = $('.selected-value').index(this);
			var delay = 1500;
			if (index == 2) {
				delay = 3000;
			}
			if ($($('#selectboxes > div')[index]).is(':visible')){
				$($('#selectboxes > div')[index]).find('ul').animate({'scrollTop': 0 + 'px'},delay);

			}
		});


		$('#agegate .selected-value').live('mouseout', function(e) {
			var index = $('.selected-value').index(this);
			if ($($('#selectboxes > div')[index]).is(':visible')){
				$($('#selectboxes > div')[index]).find('ul').stop();
			}
		});

		$('#agegate #selectboxes ul li').live('click', function(){
			var selected = ($(this).text());
			var sel = '#selected-' + $(this).parent().attr('id');
			var sel2 = '#' + $(this).parent().attr('id') + '-container';
			$(sel).html(selected);
			$(sel).css({'background-position':'top center'});

			$(sel2).toggle();
		});

		$('#agegate .hotspot').live('mouseover', function(){
			var index = $('.hotspot').index(this);
			var delay = 2000;
			if (index == 2) {
				delay = 6000;
			}
			var scrollVal = $($('#selectboxes > div')[index]).find('ul').scrollTop();
			var ul = $($('#selectboxes > div')[index]).find('ul li');
			var height = (ul.length * 20);
			$($('#selectboxes > div')[index]).find('ul').animate({'scrollTop': height + 'px'},delay);
		})

		$('#agegate .hotspot').live('mouseout', function(){
			var index = $('.hotspot').index(this);
			$($('#selectboxes > div')[index]).find('ul').stop();
		});

		// Age gate -- submit date
		$('#agegate #submit').live('click', function(){
			var month = $('#agegate #selected-month').text();
			var day = $('#agegate #selected-day').text()
			var year = $('#agegate #selected-year').text()
			if ($("ul#month li:contains("+month+")").length ==  0 || $("ul#day li:contains("+day+")").length == 0 || $("ul#year li:contains("+year+")").length == 0) {
				$('#agegate h3').css({'color':'#f00'});
			} else {
				$('#agegate h3').css({'color':'#fff'});
				//write cookie
				setCookie('cpvisitor-yob', year, null);
				if (parseInt(year) < parseInt(CP.runningVars.cutoffYear)) {
					$('#agegate .question').fadeOut(200, function(){
						if (CP.runningVars.interstitialText) {
							htmltext = CP.runningVars.interstitialText.split("|");
							if (htmltext.length >= 2) {
								$('#agegate h3.interstitial').html(htmltext[0]);
								$('#agegate #interstitial').html(htmltext[1]);
							}
							//custom text for cancel button
							if (htmltext.length >= 3) {
								$('#agegate #cancel').html(htmltext[2]);
							}
							//custom text for ok button
							if (htmltext.length >= 4) {
								$('#agegate #continue').html(htmltext[3]);
							}
						}
						$('#agegate .interstitial').fadeIn(200);
						$('#agegate #submit').hide();
						$('#agegate #cancel').show();
						$('#agegate #continue').show();
					});

				} else {
					$('#agegate .question').fadeOut(200, function(){
						$('#agegate .sorry').fadeIn(200);
						$('#agegate #submit').hide();
						$('#agegate #cancel').show();
					});
				}
			}
		});

		// Age gate -- insterstitial answers
		$('#agegate #continue').live('click', function(){
			window.location.href = CP.runningVars.pendingUrl;
		});

		$('#agegate #cancel').live('click', function(){
			CP.runningVars.modal.close();
		});
	};

	CP.agegate.prototype.initModal = function() {
		$("#modal-overlay").remove();
		$("#modal-loading").remove();
		$("#modal-window").remove();

		CP.runningVars.modal = new CP.utils.Modal({
			showClose: true,
			contentCloseDelegate: '.modal-close',
			onOpenComplete: function() {},
			onCloseComplete: function() {},
			onCloseStart: function() {},
			onOpenStart: function() {}
		});
	};

	CP.agegate.prototype.showAgegate = function(openCallback, closeCallback) {
	  var url = window.location.protocol + "//" +  window.location.host + CP.runningVars.langDir + "/geoip/agegate-overlay";
		$('#modal-content').load(url + ' #agegate-wrap', function(){
		  //open modal
		  if (!closeCallback) closeCallback= null;
			if (!openCallback) openCallback= null;
			CP.runningVars.modal.open('', openCallback, closeCallback);
	  });
	};

	CP.agegate.prototype.load = function() {
		var self = this;
		CP.runningVars.visitorAge = getCookie('cpvisitor-yob') || null;
		this.initListeners();
		this.initModal();

		if (window.PIE) {
		       $('.base a.button, .menu li a').each(function() {
			    PIE.detach(this);
	            PIE.attach(this);
	        });
	    }
		try{
			imgSizer.collate();
		}catch(e){}
		CP.runningVars.firstLoad = false;
	};

})(window.jQuery);

window.jQuery(document).ready(function(){
    var isGated;
    var cutoffYear;

    //Check if we've already looked up the agegate info?
    isGated = getCookie ('cpvisitor-agig') || 'lookup';
    cutoffYear = getCookie ('cpvisitor-agcoy') || 'lookup';

    if (isGated == 'lookup') {
      var request = jQuery.ajax({
        type: "POST",
        url: window.location.protocol + "//" +  window.location.host + "/geoip/agegate",
        data: '{}',
        async: false,
        success: function(result) {
          isGated = result.required;
          cutoffYear = result.cutoffYear;
        }
      });
      if (isGated == 'lookup') {
        //default to not showing agegate if ajax call failed.
        isGated = false;
        cutoffYear = 2000;
      } else {
        //only set the cookies if the values were actually determined
        setCookie('cpvisitor-agcoy', cutoffYear, null);
        setCookie('cpvisitor-agig', isGated, null);
      }
    }

    var lang = document.documentElement.lang
    var langDir = "";
    switch (lang) {
      case "de": langDir = "/de"; break;
      case "es": langDir = "/es"; break;
      case "fr": langDir = "/fr"; break;
      case "pt": langDir = "/pt"; break;
      case "en":
      default : langDir = ""; break;
    }

    if (isGated == "false") isGated = false;
    if (isGated == "true") isGated = true;
    cutoffYear = parseInt(cutoffYear);
    var agegate = new CP.agegate(isGated, cutoffYear, langDir);
});
;
