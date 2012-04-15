/****************************************************************************
* 																			*
* HW Javascript Core Library												*
* ---------------------------												*
* 																			*
* Author:			Leonard Martin (leonard.martin@heathwallace.com)		*
* Version:			0.1.0													*
* Updated:			30 September 2008										*
* 																			*
* **************************************************************************/


// create alias functions for getElementById, getElementsByClassName and querySelectorAll
// we will extend the results from these functions with the _proto object which contains extender methods for HW
function $(id) {return HW.ext(document.getElementById(id));}
function $$(c,o,t) {return HW.getElementsByClassName(c,o,t).each(HW.ext);}
function _$(c,s) {return HW.ext(HW.querySelector(c,s));}
function _$$(c,s) {return HW.querySelectorAll(c,s).each(HW.ext);}

// initialise the HW namespace
var HW = {
	/*
	--- CORE FUNCTIONS ---
	These functions are the basic building blocks and should not be removed
	----------------------
	*/
	ext:function (o) {if(o) {return HW.extendObject(o,HW._proto);}return null;},
	// browser flags
	isIE:false,
	isMacFF:false,
	// flag if DOM is ready to run code
	dom:{ready:false,timer:null,loaded:false},
	// array of functions to run on page load
	toRun:[],
	/*
	* log(a)
	* outputs to the Firebug console
	* a:	String, Number, Array, or Object to output
	* Returns:	Nothing
	*/
	log:function() {
		try{if(console&&console.log) {console.log.apply(console,arguments);}}catch(e){}
		return arguments;
	},
	/*
	* error(a)
	* outputs an error to the Firebug console or alerts to other browsers
	* a:	String, Number, Array, or Object to output
	* Returns:	Nothing
	*/
	error:function(a) {
		if(window.console) {console.error(a);}
		else {alert(a);}
	},
	/*
	* getElementsByClassName(cls,n,t)
	* gets an array of elements within certain parameters
	* cls:		String to match classname against
	* n:		Node to search within
	* t:		String - tag name to match against
	* Note: 	any of these inputs can be set as null to act as a wildcard
	* Returns:	Array of elements
	*/
	getElementsByClassName:function(cls,n,t) {
		var rtn = [];
		n=n===null?document:n;
		t=t===null?'*':t;
		var els = n.getElementsByTagName?n.getElementsByTagName(t):document.all;
		els = (!els||!els.length) && document.all?document.all:els;
		if(cls==null){return els;}
		for (var i=0,j=0; i<els.length;i++) {
			if(this.hasClass(els[i],cls)) {
				rtn[j++] = els[i];
			}
		}
		return rtn;
	},
	/*
	* querySelectorAll()
	* gets an array of elements within certain parameters
	* css:		CSS Selector to match
	* scope:	Node to search within
	* Returns:	Array of elements matching CSS selector
	*/
	querySelectorAll:function(css,scope) {
		scope = scope || document;
		if(document.querySelectorAll && false){return scope.querySelectorAll(css);}
		else {return HW.CssParser(css,scope);}
		return null;
	},
	/*
	* querySelector()
	* gets the first element matching a selector
	* css:		CSS Selector to match
	* scope:	Node to search within
	* Returns:	first element matching CSS selector
	*/
	querySelector:function(css,scope) {
		scope = scope || document;
		if(document.querySelector && false){return scope.querySelector(css);}
		else {
			var o = HW.CssParser(css,scope);
			return o.length?o[0]:null;
		}
	},
	/*
	* createNode(a)
	* creates a DOM node and appends it to a parent node
	* t:	String - tag name of element to be added
	* p:	Node to append new node into
	* c:	Optional - HTML content of element
	* opts:	Optional - additional attributes to be set
	* Returns:	New node
	*/
	createNode:function(t,p,c,opts) {
		var n = document.createElement(t);
		if(c) {n.innerHTML = c;}
		n = HW.extendObject(n,opts);
		HW.ext(n);
		try {
			return p.appendChild(n);
		}catch(e) {
			return n;
		}
	},
	/*
	* attachEvent(obj,evt,fnc)
	* attaches an event listener to an element
	* obj:	Object to which event listener is to be added
	* evt:	String - event type e.g. 'click', 'mouseover'
	* fnc:	Function to fire on event
	* def: allow default event to fire - set as false to override default
	* Returns:	object
	*/
	attachEvent:function(obj,evt,fnc,def) {
		if(def === false) {
			var _f = fnc;
			fnc = function(e){HW.preventDefault(e);_f(e);}
		}
		if(window.addEventListener) {obj.addEventListener(evt, fnc, false);}
		else if(window.attachEvent) {obj.attachEvent('on'+evt, fnc);}
		else if (obj.getElementById && evt=='load') {obj.onload = fnc;}
		return obj;
	},
	/*
	* detachEvent(obj,evt,fnc)
	* removes an event listener from an element
	* obj:	Object to which event listener is to be removed
	* evt:	String - event type e.g. 'click', 'mouseover'
	* fnc:	Function to remove
	* def: allow default event to fire - set as false to override default
	* Returns:	object
	*/
	detachEvent:function(obj,evt,fnc,def) {
		if(def === false) {
			var _f = fnc;
			fnc = function(e){HW.preventDefault(e);_f(e);}
		}
		if(window.removeEventListener) {obj.removeEventListener(evt, fnc, false);}
		else if(window.detachEvent) {obj.detachEvent('on'+evt, fnc);}
		return obj;
	},
	/*
	* preventDefault(e)
	* prevent the default action on event firing
	* e:	Event fired
	* Returns:	Nothing
	*/
	preventDefault:function(e) {
		e=e||window.event;
		if(e.preventDefault) {e.preventDefault();}
		else {e.returnValue = false;}
	},
	/*
	* cancelBubble(e)
	* prevent an event from bubbling up the DOM
	* e:	Event fired
	* Returns:	Nothing
	*/
	cancelBubble:function(e) {
		e=e||window.event;
		if(e.stopPropogation) {e.stopPropogation();}
		else {e.cancelBubble = true;}
	},
	/*
	* extendObject(d,s)
	* add the properties and methods from one object to another
	* d:	Object to which properties and methods should be added
	* s:	Object from which properties and methods should be added
	* Returns:	Object with new properties and methods
	*/
	extendObject:function(d,s) {
		d=d||{};
		for (var p in s) {d[p] = s[p];}
		return d;
	},
	/*
	* addClass(o,c)
	* add a class to an element
	* o:	Node to add class to
	* c:	String - class to add
	* Returns:	node
	*/
	addClass:function(o,c) {
		if (!this.hasClass(o,c)){
			if (o.className == "") {o.className = c;}
			else {o.className += " " + c;}
		}
		return o;
	},
	/*
	* hasClass(o,c)
	* test if an element has a class
	* o:	Node to check
	* c:	String - class to check for
	* Returns:	Boolean - true if element has class, false otherwise
	*/
	hasClass:function(o,c) {
		var p = new RegExp("(^| )" + c + "( |$)");
		if (p.test(o.className)) {return true;}
		return false;
	},
	/*
	* removeClass(o,c)
	* remove a class from an element
	* o:	Node to remove class from
	* c:	String - class to remove
	* Returns:	node
	*/
	removeClass:function(o,c) {
		var p = new RegExp("(^| )" + c + "( |$)");
		o.className = o.className.replace(p, "$1");
		o.className = o.className.replace(/ $/, "");
		return o;
	},
	/*
	* swapClass(o,c)
	* swap a class from an element
	* o:	Node to swap class on
	* c:	String - class to swap
	* Returns:	node
	*/
	swapClass:function(o,c) {
		HW.hasClass(o,c)?HW.removeClass(o,c):HW.addClass(o,c);
		return o;
	},
	/*
	* setFade(o,c)
	* set the alpha transparency of an element
	* o:	Node to set
	* n:	Number - value between 0-100 (0:transparent,100:opaque)
	* Returns:	Nothing
	*/
	setFade:function(o,n) {
		var agt = navigator.userAgent.toLowerCase();
		if((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1)) {
			if (n == 100) {o.style.filter = "";}
			else if (n < 0) {o.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=0);";}
			else {o.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+ Math.round(n) + ");";}
		}
		else {			
			o.style.MozOpacity = (Math.round(n) / 100);
			o.style.opacity = (Math.round(n) / 100);
		}
		o._alpha = n;
		return o;
	},
	/*
	* setStyle(o,s)
	* set the CSS style of an element
	* o:	Node to set
	* s:	Object containing style info (e.g. {margin:'1px',padding:'4px'})
	* Note: style object should be comma separated and have properties wrapped in single quotes. 
	* Styles should also be in camel casing - e.g. marginTop not margin-top
	* Returns:	Node
	*/
	setStyle:function(o,s) {
		if(o && o.style) {
			for(var i in s) {
				try{o.style[i] = s[i];}catch(e){}
			}
		}
		return o;
	},
	/*
	* empty(o)
	* removes the contents of an element
	* o:	Node to empty
	* Returns:	Node
	*/
	empty:function(o) {
		while(o.firstChild) {
			o.removeChild(o.firstChild);
		}
		return o;
	},
	/*
	* show(e[,t[,c[,time]]])
	* show an element
	* e			Object to show
	* t			Transition style - 'slide' or 'fade'
	* c			Function to call on completion
	* time		Number of milliseconds for transition to take
	* Returns:	Nothing
	*/
	show:function(e,t,c,time,ease) {
		// if time is not specified then fall back to default
		time = time?time:this.transitionTime;
		
		// if animation script is not included then don't use transitions
		if(!HW.Animate) {t = null;}
		if(e) {
			switch(t) {
				case 'slide':
					// get start and end heights
					var h1 = e.offsetHeight;
					var h2 = this.getTotalSize(e);
					// set initial styles
					var s = {display:'block',height:h1+'px',overflow:'hidden'};
					HW.setStyle(e,s);
					// define callback function
					var cb = function(){
						var s = {height:'',overflow:'',position:''};
						HW.setStyle(e,s);
						e.hidden = false;
						if(c){c();}
					};
					// create an instance of the animator class to handle the slide
					new HW.Animator(e,h1,h2,function(e,v){e.style.height=v+'px';},time,cb,ease);
					break;
				// if no transition style is set, or we don't have animate classes
				default:
					e.style.display = '';
					e.hidden = false;
					// if callback is defined, fire it
					if(c){c();}
					break;
			}
		}
		return e;
	},
	/*
	* hide(e[,t[,c[,time]]])
	* hide an element
	* e			Object to hide
	* t			Transition style - 'slide' or 'fade'
	* c			Function to call on completion
	* time		Number of milliseconds for transition to take
	* Returns:	Nothing
	*/
	hide:function(e,t,c,time,ease) {
		// if time is not specified then fall back to default
		time = time?time:this.transitionTime;
		
		// if animation script is not included then don't use transitions
		if(!HW.Animate) {t = null;}
		
		if(e) {
			switch(t) {
				case 'slide':
					// get start and end heights
					var h1 = e.offsetHeight;
					var h2 = 0;
					// set initial styles
					var s = {display:'block',height:h1+'px',overflow:'hidden'};
					HW.setStyle(e,s);
					// define callback function
					var cb = function(){
						var s = {display:'none',height:'',overflow:'',position:''};
						HW.setStyle(e,s);
						e.hidden = true;
						if(c){c();}
					};
					// create an instance of the animator class to handle the slide
					new HW.Animator(e,h1,h2,function(e,v){e.style.height=v+'px';},time,cb,ease);
					break;
				// if no transition style is set, or we don't have animate classes
				default:
					e.style.display = 'none';
					e.hidden = true;
					// if callback is defined, fire it
					if(c) {c();}
					break;
			}
		}
		return e;
	},
	/*
	* toggle(e[,t[,c[,time]]])
	* toggle an element on and off
	* e			Object to toggle
	* t			Transition style - 'slide' or 'fade'
	* c			Function to call on completion
	* time		Number of milliseconds for transition to take
	* Returns:	Nothing
	*/
	toggle:function(e,t,c,time,ease) {
		if(e) {
			// if item is hidden then show it, otherwise hide it
			if(e.hidden) {
				return this.show(e,t,c,time,ease);
			}
			else {
				return this.hide(e,t,c,time,ease);
			}
		}
	},
	/*
	* getTotalSize(e)
	* get the total possible size of an element when displayed
	* e			Object to measure
	* Returns:	Nothing
	*/
	getTotalSize:function(e) {
		// define the styles to measure element without making it visible
		var newStyle = {height:'',visibility:'hidden',display:'',position:'absolute'};
		// create a placeholder for the existing style
		var tmp = {};
		// give our elements the new style whilst storing the old values
		for(s in newStyle) {
			tmp[s] = e.style[s];
			e.style[s] = newStyle[s];
		}
		// get the height
		var h = e.offsetHeight;
		// reset the styles back to normal
		HW.setStyle(e,tmp);
		// return the height
		return h;
	},
	/*
	* fixIE6flicker()
	* allow caching of background images to avoid flicker on hover in IE versions
	* Returns:	Nothing
	*/
	fixIE6flicker:function() {
		var m = document.uniqueID && document.compatMode && !window.XMLHttpRequest && document.execCommand ; 
		try { 
			if(!!m) { 
				m("BackgroundImageCache", false, true);
			} 
		}
		catch(e) {};
	},
	/*
	* checkLoaded()
	* check if page has loaded
	* Returns:	Boolean - true if page is loaded, false otehrwise
	*/
	checkLoaded:function() {
		if(HW.dom.ready){return true;}
		if(document && document.getElementsByTagName && document.getElementById && document.body) {
			clearInterval(HW.dom.timer);
			HW.dom.timer = null;
			HW.dom.ready = true;
			return true;
		}
		else {return false}
	},
	/*
	* onload()
	* set a function to run on page load
	* f:		Function to call on page load
	* Returns:	nothing
	*/
	onload:function(f) {
		HW.toRun.push(f);
		if(HW.dom.loaded) {
			f();
		}
	},
	/*
	* load()
	* check if page has loaded, if it has, run code
	* Returns:	Nothing
	*/
	load:function() {
		if(HW.checkLoaded() && !HW.dom.loaded) {
			// mark the page as loaded
			HW.dom.loaded = true;
			// run anything set to run on load
			for(var i=0,j=HW.toRun.length;i<j;i++) {
				HW.toRun[i]();
			}
			if(HW.isIE) {HW.fixIE6flicker();}
		}
		else if(HW.dom.timer === null) {
			HW.dom.timer = setInterval(HW.load,10);
		}
	},
	/*
	* _proto is used to store methods which are bound onto objects with the "dollar functions"
	*/
	_proto:{
		addClass:function(c) {
			return HW.addClass(this,c);
		},
		removeClass:function(c) {
			return HW.removeClass(this,c);
		},
		swapClass:function(c) {
			return HW.swapClass(this,c);
		},
		hasClass:function(c) {
			return HW.hasClass(this,c);
		},
		createNode:function(t,h,p) {
			return HW.createNode(t,this,h,p);
		},
		extendObject:function(o) {
			return HW.extendObject(this,o);
		},
		setStyle:function(s) {
			return HW.setStyle(this,s);
		},
		setFade:function(n) {
			return HW.setFade(this,n);
		},
		show:function(t,c,time,ease) {
			return HW.show(this,t,c,time,ease);
		},
		hide:function(t,c,time,ease) {
			return HW.hide(this,t,c,time,ease);
		},
		toggle:function(t,c,time,ease) {
			return HW.toggle(this,t,c,time);
		},
		empty:function() {
			return HW.empty(this);
		},
		// attachEvent and detachEvent are reserved in the global scope so use bind and unbind instead for methods
		bind:function(e,f,c) {
			return HW.attachEvent(this,e,f,c);
		},
		unbind:function(e,f,c) {
			return HW.detachEvent(this,e,f,c);
		},
		fade:function(alpha,time,callback) {
			HW.Animate.fade(this,alpha,time,callback);
			return this;
		},
		move:function(to,time,callback,ease) {
			HW.Animate.move(this,to,time,callback,ease);
			return this;
		}
	}
	/*
	--- END CORE FUNCTIONS ---

	*/
};

(function(){
	// set our browser flags
	var userAgent = navigator.userAgent.toLowerCase();
	HW.isIE  = (navigator.appVersion.indexOf("MSIE") != -1)?true:false;
	HW.isMacFF  = (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1)?true:false;
	
	if(HW.isIE) (function(){
		try {
			document.documentElement.doScroll("left");
		} catch(e) {
			setTimeout(arguments.callee,0);
			return;
		}
		HW.load();
	})();
	HW.attachEvent(document,'DOMContentLoaded',HW.load);
	HW.attachEvent(window,'load',HW.load);
})();

/*
--- CSS SELECTOR PARSER ---

=:based on code from
scalable Inman Flash Replacement (sIFR) version 3, Author: Mark Wubben, <http://novemberborn.net/>"

=:license
This software is licensed and provided under the CC-GNU LGPL.
See <http://creativecommons.org/licenses/LGPL/2.1/>    

*/

HW.CssParser = (function() {
	var B = /\s*,\s*/;
	var A = /\s*([\s>+~(),]|^|$)\s*/g;
	var L = /([\s>+~,]|[^(]\+|^)([#.:@])/g;
	var F = /(^|\))[^\s>+~]/g;
	var M = /(\)|^)/;
	var K = /[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;
	
	function Parser(css, scope) {
		scope = scope || document.documentElement;
		var selectors = css.split(B);
		var a = [];
		for (var i = 0; i < selectors.length; i++) {
			var o = [scope];
			var sel = Parser.clean(selectors[i]);
			for (var j = 0; j < sel.length;) {
				var prefix = sel[j++];
				var fragment = sel[j++];
				var paren = "";
				if (sel[j] == "(") {
					while (sel[j++] != ")" && j < sel.length) {
						paren += sel[j];
					}
					paren = paren.slice(0, -1);
				}
				o = Parser.get(o, prefix, fragment, paren);
			}
			a = a.concat(o);
		}
		return Parser.util.unique(a);
	}
	Parser.clean = function(selector) {
		// strip unnecessary whitespace
		var o = selector.replace(A, "$1")
		// place asterisks before #s
		o = o.replace(L, "$1*$2")
		// add spaces after closing brackets
		o = o.replace(F, function(s){return s.replace(M, "$1 ")});
		return o.match(K) || []
	}
	Parser.get = function(scope, prefix, fragment, paren) {
		return (Parser.selectors[prefix]) ? Parser.selectors[prefix](scope, fragment, paren) : []
	}
	Parser.util = {
		toArray: function(o) {
			var a = [];
			for (var i = 0; i < o.length; i++) {
				a.push(o[i])
			}
			return a;
		},
		unique: function(o) {
			var a = [];
			for(var i=0;i<o.length;i++) {
				if(!this.inArray(o[i],a)) {a.push(o[i]);}
			}
			return a;
		},
		inArray:function(o,a) {
			for(var j=0;j<a.length;j++) {
				if(a[j] == o) {return true;}
			}
			return false;
		}
	};
	Parser.dom = {
		isTag: function(O, N) {
			return (N == "*") || (N.toLowerCase() == O.nodeName.toLowerCase())
		},
		previousSiblingElement: function(o) {
			while ( o && o.nodeType != 1 ) {
				o = o.previousSibling
			}
			return o;
		},
		nextSiblingElement: function(o) {
			while ( o && o.nodeType != 1 ) {
				o = o.nextSibling;
			}
			return o;
		},
		hasClass: function(cls, o) {
			return (o.className || "").match("(^|\\s)" + cls + "(\\s|$)");
		},
		getByTag: function(tag, o) {
			return o.getElementsByTagName(tag);
		}
	};
	Parser.selectors = {
		"#": function(scope, id) {
			for(var i=0;i<scope.length;i++) {
				if (scope[i].getAttribute("id") == id) {
					return [scope[i]];
				}
			}
			return [];
		},
		" ": function(scope, tag) {
			var a = [];
			for(var i=0;i<scope.length;i++) {
				a = a.concat(Parser.util.toArray(Parser.dom.getByTag(tag,scope[i])));
			}
			return a
		},
		">": function(scope,child) {
			var a = [];
			for (var i=0;i<scope.length;i++) {
				var parent = scope[i];
				for (var j=0;j<parent.childNodes.length;j++) {
					var node = parent.childNodes[j];
					if (node.nodeType == 1 && Parser.dom.isTag(node, child)) {
						a.push(node);
					}
				}
			}
			return a;
		},
		".": function(scope,cls) {
			var a = [];
			for (var i=0;i<scope.length;i++) {
				var node = scope[i];
				if (Parser.dom.hasClass([cls], node)) {
					a.push(node);
				}
			}
			return a;
		},
		":": function(scope,pseudo,paren) {
			// we can define methods for particular pseudoclasses in the Parser.pseudoClasses object
			// none are currently defined
			return (Parser.pseudoClasses[pseudo]) ? Parser.pseudoClasses[psuedo](scope, paren) : []
		}
	};
	Parser.pseudoClasses = {};
	return Parser;
})();

/*
--- END CSS SELECTOR PARSER ---
*/

/****************************************************************************
* 																			*

* HW Javascript Ajax Module													*
* ---------------------------												*
* 																			*
* Author:			Leonard Martin (leonard.martin@heathwallace.com)		*
* 																			*
* **************************************************************************/

/*
--- AJAX FUNCTIONS ---
Requires:	Core
----------------------
*/

/*
* HW.Ajax(url,[callback[,vars[,method]]])
* make an inline request to a file
* url: 		String - the URL to which the request is made
* callback:	Function to call on completion of request
			This function is called with a single parameter a HW.Ajax.Response object
* vars:		String - variables to send to request in format; 'var1=val1&var2=val2&...'
* method:	String - 'GET' or 'POST'
* Returns:	Nothing
*/ 
HW.Ajax = function(url,callback,vars,method) {
	var obj = this;
	method = method?method:'GET';
	vars = vars?vars:null;
	// instantiate request object
	this.req = new HW.Ajax.Request(url,vars,method);
	// set callback function
	if(typeof(callback) == 'function') {this._passResponse = callback;}
	this.req.xmlHttp.onreadystatechange = function() {obj._handle();};
	// send request
	this.req._sendRequest();
};

HW.Ajax.prototype = {
	req:{},
	_handle:function() {
		if(this.req.xmlHttp.readyState == 4) {
			if(this.req.xmlHttp.status == 200) {
				var r = new HW.Ajax.Response(this.req.xmlHttp);
				this._passResponse(r);
			}
		}
	},
	_passResponse:function() {return;}
};

HW.Ajax.Request = function(href,vars,method) {
	this.createXmlHttpRequestObject();
	this.href = href;
	this.vars = vars;
	this.method = method;
};

HW.Ajax.Request.prototype = {
	xmlHttp:null,
	createXmlHttpRequestObject:function() {
		try {
			this.xmlHttp = new XMLHttpRequest();
		} catch(e) {
			var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
										"MSXML2.XMLHTTP.5.0",
										"MSXML2.XMLHTTP.4.0",
										"MSXML2.XMLHTTP.3.0",
										"MSXML2.XMLHTTP",
										"Microsoft.XMLHTTP");
			for (var i=0; i<XmlHttpVersions.length && !this.xmlHttp; i++) {
				try { 
					this.xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
				}  catch(e){}
			}
		}
	},
	_sendRequest:function(method,vars) {
		if(this.xmlHttp) {
			try {
				if (this.xmlHttp.readyState == 4 || this.xmlHttp.readyState == 0) {
					this.xmlHttp.open(this.method, this.href+(this.method=='GET'&&this.vars?'?'+this.vars:''), true);
					if(this.method == 'POST') {
						this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						this.xmlHttp.setRequestHeader("Content-length", this.vars.length);
						this.xmlHttp.setRequestHeader("Connection", "close");
					}
					this.xmlHttp.send(this.vars);
				}
				else {
					if(timeoutId != -1) clearTimeout(timeoutId);  
					var obj = this;
					timeoutId = setTimeout(function(){obj.sendRequest();}, 500);
				}
			} catch(e){}
		}
	}
};

/*
* Response Object
* This object is the parameter sent to the callback function
* It has three properties:
* xml:		If the resource accessed by the HTTP request returns content type 'text/xml' then this will contain the xml output otherwise null
* text:		If the resource returns any other content type then this will contain the response, otherwise an empty string
* contentType:	The content type returned e.g. 'text/xml', 'text/html', 'image/jpeg'
*/
HW.Ajax.Response = function(xml) {
	this.contentType = xml.getResponseHeader('Content-type')?xml.getResponseHeader('Content-type'):null;
	if(this.contentType.substr(0,4) == 'text') {
		this.xml = xml.responseXML?xml.responseXML:null;
		this.text = xml.responseText?xml.responseText:'';
	}
};
HW.Ajax.Response.prototype = {xml:null,text:null,contentType:null};

/*
--- END AJAX FUNCTIONS ---
*/


/****************************************************************************
* 																			*
* HW Javascript Animate Module												*
* ----------------------------												*
* 																			*
* Author:			Leonard Martin (leonard.martin@heathwallace.com)		*
* 																			*
* **************************************************************************/

/*
--- ANIMATION FUNCTIONS ---
Requires:	Core
---------------------------
*/

HW.Animate = {
	/*
	* fade(elm,to,time[,c])
	* fade an element in/out
	* elm:		Node - element to fade
	* to:		Number - final alpha value (0:transparent,100:opaque)
	* time:		Number - milliseconds to take over fade
	* c:		Function - callback function, fires when finished
	* Returns:	Nothing
	*/
	fade:function(elm,to,time,c) {
		// if the element has not been faded before, assume it is opaque
		if(!elm._alpha && elm._alpha !== 0) {elm._alpha = 100;}
		new HW.Animator(elm,elm._alpha,to,HW.setFade,time,c);
	},
	/*
	* move(elm,to,time[,c])
	* move an element to a new position
	* elm:		Node - element to move
	* to:		Object - position to move to in form {x:<value>,y:<value>}
	* time:		Number - milliseconds to take over move
	* c:		Function - callback function, fires when finished
	* Returns:	Nothing
	*/
	move:function(elm,to,time,c,e) {
		var p = {x:elm.offsetLeft,y:elm.offsetTop}
		var f = function(o,v) {
			var dx = p.x + (to.x - p.x)*v;
			var dy = p.y + (to.y - p.y)*v;
			HW.setStyle(o,{left:dx+'px',top:dy+'px'});
		}
		var a = new HW.Animator(elm,0,1,f,time,c,e);
	}
};

/*
* Animator(o,v0,v1,s[,t[,c]])
* change a property of an element smoothly over a period of time
* o:		Node - element to animate
* v0:		Number - initial value of property to change
* v1:		Number - final value of property to change
* s:		Function - function to use to set current property value, should take an object and a value as a parameter
* t:		Number - time to take over animation, in milliseconds - defaults to 500
* c:		Function - callback function, fires when finished
* Returns:	Nothing
*/
HW.Animator = function(o,v0,v1,s,t,c,ease) {
	if(o) {this.target = o;}
	this.setFunc = s;
	this.startValue = v0;
	this.endValue = v1;
	this.easing = !!ease;
	if(t) {this.time = t;}
	if(typeof(c) == 'function') {this.callback = c;}
	this.steps = Math.ceil(this.time/this.stepLength);
	this.stepLength = this.time/this.steps;
	this.animate();
};

HW.Animator.prototype = {
	stepLength:75,
	time:500,
	steps:20,
	easing:false,
	setFunc:function(){},
	callback:function(){},
	set:function(v) {
		this.setFunc(this.target,v);
	},
	animate:function() {
		var obj = this;
		var df = (this.endValue - this.startValue);
		if(df != 0) {
			// set timers to fire at intervals
			for(var i=1,j=this.steps;i<=j;i++) {
				(function(){
					var j=i;
					var k=i*df/obj.steps;
					if(obj.easing) {
						var s = Math.sin((i*Math.PI)/(2*obj.steps));
						var k = Math.pow(s,0.5)*df;
					}
					setTimeout(function(){
						obj.set(obj.startValue + k);
					},j*obj.stepLength);
				})();
			}
			// fire callback when loop has finished
			setTimeout(function(){obj.callback();},this.stepLength*this.steps);
		}
		else {
			this.callback();
		}
	}
};

/*
--- END ANIMATION FUNCTIONS ---
*/

/*
--- ADD SOME EXTRA METHODS TO OBJECTS ---
*/
Array.prototype.each = function(f) {
	if(typeof(f) == 'function') {
		var a = [];
		for(var i=0,j=this.length;i<j;i++) {
			a.push(f(this[i]));
		}
		return a;
	}
	return false;
}



HW.Flash = function() {
	try{
	this.init();
	this.fla = {};
	this.fla.codebase = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0';
	this.fla.quality = 'high';
	this.fla.pluginspage = 'http://www.macromedia.com/go/getflashplayer';
	this.fla.align = 'middle';
	this.fla.play = 'true';
	this.fla.loop = 'true'; 
	this.fla.scale = 'showall',
	this.fla.devicefont = 'false';
	this.fla.bgcolor = '#FFF'; 
	this.fla.menu = 'true';
	this.fla.allowFullScreen = 'true';
	this.fla.allowScriptAccess = 'sameDomain';
	this.fla.salign = '';
	this.fla.wmode = 'transparent';
	this.fla.flashvars = '';
	this.fla.src = null;
	this.fla.width = null;
	this.fla.height = null;
	this.fla.name = null;
	this.fla.id = null;
	}catch(e){
		HW.error(e);
	}
}

HW.Flash.prototype = {
	isIE:null,
	isWin:null,
	isOpera:null,
	hasRequiredVersion:false,
	init:function() {
		this.isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
		this.isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
		this.isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	},
	ControlVersion:function() {
		var version;
		var axo;
		var e;
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			version = axo.GetVariable("$version");
		} 
		catch (e) {
			
		}
		
		if (!version)
		{
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				version = "WIN 6,0,21,0";
				axo.AllowScriptAccess = "always";
				version = axo.GetVariable("$version");
	
			}
			catch (e) {
				
			}
		}
		if (!version)
		{
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = axo.GetVariable("$version");
			}
			catch (e) {
				
			}
		}
	
		if (!version)
		{
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = "WIN 3,0,18,0";
			}
			catch (e) {
				
			}
		}
	
		if (!version)
		{
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				version = "WIN 2,0,0,11";
			}
			catch (e) {
				version = -1;
			}
		}
		return version;
	},
	GetSwfVer:function() {
		// NS/Opera version >= 3 check for Flash plugin in plugin array
		var flashVer = -1;
		
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
				var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
				var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
				var descArray = flashDescription.split(" ");
				var tempArrayMajor = descArray[2].split(".");			
				var versionMajor = tempArrayMajor[0];
				
				var flashVer = versionMajor;
			}
		}
		// MSN/WebTV 2.6 supports Flash 4
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
		// WebTV 2.5 supports Flash 3
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
		// older WebTV supports Flash 2
		else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
		else if (this.isIE && this.isWin && !this.isOpera ) {
			flashVer = this.ControlVersion();
		}
		return flashVer;
	},
	DetectFlashVer:function(reqMajorVer, reqMinorVer, reqRevision) {
		versionStr = this.GetSwfVer();
		if (versionStr == -1 ) {
			return false;
		} else if (versionStr != 0) {
			if(this.isIE && this.isWin && !this.isOpera) {
				// Given "WIN 2,0,0,11"
				tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
				tempString        = tempArray[1];			// "2,0,0,11"
				versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
			} else {
				versionArray      = versionStr.split(".");
			}
			var versionMajor      = versionArray[0];
	
			if (versionMajor >= parseFloat(reqMajorVer)) {
				return true;
			}
			return false;
		}
	},
	AC_Generateobj:function(objAttrs, params, embedAttrs, targetElement,tohide) { 
		var str = '';
		if (this.isIE && this.isWin && !this.isOpera) {
			str += '<object ';
			for (var i in objAttrs) {
				str += i + '="' + objAttrs[i] + '" ';
			}
			str += '>';
			for (var i in params) {
				str += '<param name="' + i + '" value="' + params[i] + '" /> ';
			}
			str += '</object>';
		}
		else {
			str += '<embed ';
			for (var i in embedAttrs) {
				str += i + '="' + embedAttrs[i] + '" ';
			}
			str += '> </embed>';
		}
		if(targetElement && this.hasRequiredVersion) {
			targetElement.innerHTML = str;
			if(tohide) {
				var elms = $$(tohide,document.body,'div');
				for(var i=0,j=elms.length;i<j;i++) {
					HW.setStyle(elms[i],{display:'none'});
				}
			}
		}
	},
	AC_FL_RunContent:function(attrs,targetElement,tohide) {
		var ret = this.AC_GetArgs(attrs, "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
		this.AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs,targetElement,tohide);
	},
	AC_GetArgs:function(args, srcParamName, classid, mimeType) {
		var ret = new Object();
		ret.embedAttrs = new Object();
		ret.params = new Object();
		ret.objAttrs = new Object();
		for (var i=0; i < args.length; i=i+2){
			var currArg = args[i].toLowerCase();    
			
			switch (currArg) {	
				case "classid":
					break;
				case "pluginspage":
					ret.embedAttrs[args[i]] = args[i+1];
					break;
				case "src":
				case "movie":	
					for(var j=0;j<args[i+1].length;j=j+2) {
						if(args[i+1][j] && this.DetectFlashVer(args[i+1][j],0,0)) {
							ret.embedAttrs["src"] = args[i+1][j+1];
							ret.params[srcParamName] = args[i+1][j+1];
							this.hasRequiredVersion = true;
						}
					}				
					break;
				case "onafterupdate":
				case "onbeforeupdate":
				case "onblur":
				case "oncellchange":
				case "onclick":
				case "ondblclick":
				case "ondrag":
				case "ondragend":
				case "ondragenter":
				case "ondragleave":
				case "ondragover":
				case "ondrop":
				case "onfinish":
				case "onfocus":
				case "onhelp":
				case "onmousedown":
				case "onmouseup":
				case "onmouseover":
				case "onmousemove":
				case "onmouseout":
				case "onkeypress":
				case "onkeydown":
				case "onkeyup":
				case "onload":
				case "onlosecapture":
				case "onpropertychange":
				case "onreadystatechange":
				case "onrowsdelete":
				case "onrowenter":
				case "onrowexit":
				case "onrowsinserted":
				case "onstart":
				case "onscroll":
				case "onbeforeeditfocus":
				case "onactivate":
				case "onbeforedeactivate":
				case "ondeactivate":
				case "type":
				case "codebase":
				case "id":
					ret.objAttrs[args[i]] = args[i+1];
					break;
				case "width":
				case "height":
				case "align":
				case "vspace": 
				case "hspace":
				case "class":
				case "title":
				case "accesskey":
				case "name":
				case "tabindex":
				case "flashvars":
					ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
					break;
				default:
					ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
			}
		}
		ret.objAttrs["classid"] = classid;
		if (mimeType) {ret.embedAttrs["type"] = mimeType;}
		return ret;
	},
	load:function(target,tohide) {
		if(this.width === null) {HW.error('Flash movie width is not defined');}
		if(this.height === null) {HW.error('Flash movie height is not defined');}
		if(this.src === null) {HW.error('Flash movie source is not defined');}
		if(!$(target)) {HW.error('Target element (id="'+target+'") is not defined or does not exist');}
		var attrs = [];
		for(a in this.fla) {
			attrs.push(a);
			if(this[a]) {
				attrs.push(this[a]);
			}
			else {
				attrs.push(this.fla[a]);
			}
		}
		this.AC_FL_RunContent(attrs,$(target),tohide);
	}
}


/****************************************************************************
* 																			*
* HW Javascript Showhide Module												*
* -----------------------------												*
* 																			*
* Author:			Leonard Martin (leonard.martin@heathwallace.com)		*
* Version:			0.1.0													*
* Updated:			29 May 2008												*
* 																			*
* **************************************************************************/

/*
--- SHOWHIDE FUNCTIONS ---
Requires:	Core
Optional:	Animate
CSS:		None
--------------------------
*/

HW.ShowHide = {
	// first set the classes for automagical showing and hiding
	
	// hide elements on load
	hideClass:'jvsHide',
	
	// link triggers and targets together
	// links should be made by appending a number to the end of this class - e.g. jvsShowHideItem01, jvsShowHideItem02
	itemClass:'jvsShowHideItem',
	
	// make an item a trigger
	triggerClass:'jvsShowHideTrigger',
	
	// make an item a target
	targetClass:'jvsShowHideTarget',
	
	// set the trigger to either show or hide
	// if the trigger is a link, then omitting these classes will cause the trigger to toggle its targets on and off
	showTrigger:'jvsShowTrigger',
	hideTrigger:'jvsHideTrigger',
	
	// set the transition style
	slideClass:'jvsSlide',
	fadeClass:'jvsFade',
	
	// if selecting one item from a group should hide all of the others
	// append a number to this class to form groups - e.g. jvsHideAll01, jvsHideAll02
	hideAllClass:'jvsHideAll',
	
	// time for transitions to take, in milliseconds
	transitionTime:250,
	
	/*
	* init()
	* set up automagical hiding and showing using classes defined above
	* Returns:	Nothing
	*/
	init:function() {
		// hide anything set to hide on load
		var h = $$(this.hideClass,document.body,null);
		for(var i=0,j=h.length;i<j;i++) {
			// call hide with only one parameter to hide without transition
			HW.hide(h[i]);
		}
		// find trigger elements and attach events to them
		this.attachTriggers();
	},
	/*
	* attachTriggers()
	* find trigger elements and attach events to them
	* Returns:	Nothing
	*/
	attachTriggers:function() {
		var obj = this;
		// get all the trigger elements
		var triggers = $$(this.triggerClass,document.body,null);
		for(var i=0;i<triggers.length;i++) {
			// different trigger types will respond to different events, so sort by tag type
			// add event listeners
			if(triggers[i].tagName == 'A') {
				HW.attachEvent(triggers[i],'click',function(e){HW.preventDefault(e);obj.fireTrigger(e);});
			}
			else if(triggers[i].tagName == 'INPUT' && (triggers[i].type == 'radio' || triggers[i].type == 'checkbox')) {
				HW.attachEvent(triggers[i],'click',function(e){obj.fireTrigger(e);});
			}
			else if(triggers[i].tagName == 'SELECT') {
				HW.attachEvent(triggers[i],'change',function(e){obj.fireTrigger(e);});
			}
			// we need to apply a 1ms timeout to make sure IE has time to catch up so wrap everything in a closure to ensure we are using the right 'i'
			(function(){
				var k=i;
				// fire each trigger so that show/hide state corresponds with trigger state on page load
				setTimeout(function(){obj.fireTrigger(triggers[k],true);},1);
			})()
		}
	},
	/*
	* fireTriggers(e[,onload[,closed]])
	* fires a trigger element when interacted with, or on page load
	* e			Event if responding to user interaction
	*			Object if firing on page load
	* onload	Boolean (optional) set as true on page load, omitted on user interaction
	* closed	Boolean (optional) set as true if this is the recursive call after a hideAll method
	* Returns:	Nothing
	*/
	fireTrigger:function(e,onload,closed) {
		// set up regexps for groupings
		var reg = new RegExp("(^|\\w*)"+this.itemClass+"(\\d*|([\\w* ]))");
		var reg2 = new RegExp("(^|\\w*)"+this.hideAllClass+"(\\d*|([\\w* ]))");
		
		var trg;
		
		// fix events cross browser
		e=e||window.event;
		trg = e.srcElement||e.target;
		
		// if running on page load, get the element
		if(!trg && (onload || closed)) {
			trg = e;
		}
		
		// establish the transition style to use
		// if running on page load, suppress transitions
		var trans;
		if(HW.hasClass(trg,this.slideClass) && !onload) {
			trans = 'slide';
		}
		if(HW.hasClass(trg,this.fadeClass) && !onload) {
			trans = 'fade';
		}
		// need to behave differently dependent on trigger type so sort accordingly
		switch(trg.tagName) {
			case 'A':
				// links do not change state so don't need to check on page load
				if(!onload) {
					// find targets with matching class name
					var cls = reg.exec(trg.className)[0];
					var targets = $$(cls,document.body,null);
					
					// if part of a hideall group, hide others
					if(reg2.exec(trg.className) && !closed) {
						this.hideAll(reg2.exec(trg.className)[0],cls,trans,trg,onload);
						return;
					}
					
					// loop through the targets and show/hide accordingly
					for(var i=0,j=targets.length;i<j;i++) {
						// only act if the element is a target element
						// i.e. don't hide yourself
						if(HW.hasClass(targets[i],this.targetClass)) {
							if(HW.hasClass(trg,this.showTrigger)) {
								HW.show(targets[i],trans,null,this.transitionTime);
							}
							else if(HW.hasClass(trg,this.hideTrigger)) {
								HW.hide(targets[i],trans,null,this.transitionTime);
							}
							else {
								HW.toggle(targets[i],trans,null,this.transitionTime);
							}
						}
					}
				}
				break;
			case 'INPUT':
				// find targets with matching class name
				var cls = reg.exec(trg.className)[0];
				var targets = $$(cls,document.body,null);
				
				// only act on radio buttons and checkboxes which are checked
				if(trg.type == 'radio') {
					//if(trg.checked) {alert(trg.checked);}
					if(trg.checked) {
						// if part of a hideall group, hide other elements
						if(reg2.exec(trg.className) && !closed) {
							this.hideAll(reg2.exec(trg.className)[0],cls,trans,trg,onload);
							return;
						}
						
						// loop through the targets and show/hide accordingly
						for(var i=0,j=targets.length;i<j;i++) {
							// only act if the element is a target element
							// i.e. don't hide yourself
							if(HW.hasClass(targets[i],this.targetClass)) {
								if(HW.hasClass(trg,this.hideTrigger)) {
									HW.hide(targets[i],trans,null,this.transitionTime);
								}
								else if(HW.hasClass(trg,this.showTrigger)) {
									HW.show(targets[i],trans,null,this.transitionTime);
								}
								else {
									HW.toggle(targets[i],trans,null,this.transitionTime);
								}
							}
						}
					}
				}
				else if(trg.type == 'checkbox') {
					// loop through the targets and show/hide accordingly
					for(var i=0,j=targets.length;i<j;i++) {
						// only act if the element is a target element
						// i.e. don't hide yourself
						if(HW.hasClass(targets[i],this.targetClass)) {
							if(!trg.checked) {
								if(HW.hasClass(trg,this.hideTrigger)) {
									HW.show(targets[i],trans,null,this.transitionTime);
								}
								else {
									HW.hide(targets[i],trans,null,this.transitionTime);
								}
							}
							else {
								if(HW.hasClass(trg,this.hideTrigger)) {
									HW.hide(targets[i],trans,null,this.transitionTime);
								}
								else {
									HW.show(targets[i],trans,null,this.transitionTime);
								}
							}
						}
					}
				}
				break;
			case 'SELECT':
				// get the option selected
				var elm = trg.options[trg.selectedIndex];
				
				// find targets with matching class name
				var cls = reg.exec(elm.className)[0];
				var targets = $$(cls,document.body,null);
				
				// if part of a hideall group, hide other elements
				if(reg2.exec(elm.className) && !closed) {
					this.hideAll(reg2.exec(elm.className)[0],cls,trans,trg,onload);
					return;
				}
				
				// loop through the targets and show/hide accordingly
				for(var i=0,j=targets.length;i<j;i++) {
					// only act if the element is a target element
					// i.e. don't hide yourself
					if(HW.hasClass(targets[i],this.targetClass)) {
						if(HW.hasClass(elm,this.hideTrigger)) {
							HW.hide(targets[i],trans,null,this.transitionTime);
						}
						else if(HW.hasClass(elm,this.showTrigger)) {
							HW.show(targets[i],trans,null,this.transitionTime);
						}							
						else {
							HW.toggle(targets[i],trans,null,this.transitionTime);
						}
					}
				}
				break;
		}
	},
	/*
	* hideAll(c,s,t,trg,onload)
	* hide all target elements with a particular class
	* c			Class of elements to hide
	* s			Class of any elements to keep open
	* t			Transition style to use
	* trg		Object we're acting on
	* onload	Boolean value is true if we're running code on page load
	* Returns:	Nothing
	*/
	hideAll:function(c,s,t,trg,onload) {
		var obj = this;
		// get all the matching elements
		var elms = $$(c,document.body,null);
		// reset the counters so we know everything is hidden before we continue
		this.elmsToHide = 0;
		this.elmsHidden = 0;
		// need to loop twice to make sure we're done counting the items we need to hide before we hide them
		for(var i=0,j=elms.length;i<j;i++) {
			// if it doesn't have the class we want to keep, and is a target element then hide it
			if(!HW.hasClass(elms[i],s) && HW.hasClass(elms[i],this.targetClass)) {
				this.elmsToHide++;
			}
		}
		// once we are done counting we can hide the elements
		for(var i=0,j=elms.length;i<j;i++) {
			// hide it
			if(!HW.hasClass(elms[i],s) && HW.hasClass(elms[i],this.targetClass)) {
				// hide the element calling our checking function as a callback
				HW.hide(elms[i],t,function(){obj.checkAllHidden(trg,onload);},this.transitionTime);
			}
		}
	},
	/*
	* checkAllHidden(trg,onload)
	* checks if all the elements to hide are hidden before we continue
	* trg		Object trigger being acted on
	* onload	Boolean flag to track if code is being run on page load
	* Returns:	Nothing
	*/
	checkAllHidden:function(trg,onload) {
		// this function is called as a callback on hide so if it's being called it means an item has just been hidden so count it
		this.elmsHidden++;
		// if they're all hidden
		if(this.elmsHidden == this.elmsToHide) {
			// then fire our trigger again with a third parameter of true to show that it's the response to a hideall
			this.fireTrigger(trg,onload,true);
		}
	}
};
// set up the auto triggers
HW.onload(function(){HW.ShowHide.init();});

/*
--- END SHOWHIDE FUNCTIONS ---
*/
HW.ShowHide.Flash = {}
HW.ShowHide.Flash.show = function(css,trans) {
	_$(css).show(trans);
}
HW.ShowHide.Flash.hide = function(css,trans) {
	_$(css).hide(trans);
}
HW.ShowHide.Flash.toggle = function(css,trans) {
	_$(css).toggle(trans);
}



HW.onload(function() {
			try{	   
				   
	var csTrigger = $('country_select_trigger');
	if(csTrigger) {
		new HW.Ajax(csTrigger.href.split('#')[0],function(r){HW.Header.buildDropDown(r.text);},null);
	}
	new HW.ClearDefault('inputSearch');
			}
			catch(e)
			{
			}
});
		
HW.Header = {
	buildDropDown:function(text) {
		var dd = $('country_selector');
		if(dd) {
			// if the link requested has a hash value then pick out the right node
			if($('country_select_trigger').href.split('#')[1] !== null) {
				var idToLoad = $('country_select_trigger').href.split('#')[1];
				// first check the id doesn't exist in the current page, if it does then temporarily rename
				if($(idToLoad)) {
					$(idToLoad).id += '_tmpID';
				}
			}
			// create a placeholder for the imported content
			var div = HW.createNode('div',document.body);
			// find the body element
			var reg = new RegExp("<body[ a-zA-Z0-9=;:\-_\"]*>([\\w\\W]+)</body>");
			div.innerHTML = reg.exec(text)[1];
			HW.setStyle(div,{display:'none'});
			var c;
			if(idToLoad) {
				// get the node with id matching our hash value
				c = $($('country_select_trigger').href.split('#')[1]);
			}
			// if we have founbd a particular element, use it, else use the whole page
			var content = c?c.innerHTML:div.innerHTML;
			// remove placeholder
			document.body.removeChild(div);
			// reset the elements we changed id of earlier
			if($(idToLoad+'_tmpID')) {
				$(idToLoad+'_tmpID').id = idToLoad;
			}
			
			dd.innerHTML = content;
			
			HW.DropDown.add('dropDownLink','dropDownParent','dropDownContent','dropDownOpen');
		}
	}
}



HW.DropDown = {
	elements:[],
	add:function(linkClass,parentClass,contentClass,openClass) {
		var dds = HW.getElementsByClassName(linkClass,document.body,'a');
		for(var i=0;i<dds.length;i++) {
			var dd = new HW.DropDown.Element(dds[i],parentClass,contentClass,openClass);
		}
		var obj = this;
		HW.attachEvent(document,'click',function(e){obj.closeAll(e,parentClass);});
	},
	closeAll:function(e,pClass) {
		e=e||window.event;
		var trg = e.target||e.srcElement;
		var inDD = false;
		while(trg) {
			if(HW.hasClass(trg,pClass)) {
				inDD = trg;
			}
			trg = trg.parentNode;
		}
		for(var i=0;i<this.elements.length;i++) {
			if(inDD != this.elements[i].parent) {
				this.elements[i].close();
			}
		}
	}
}

HW.DropDown.Element = function(a,parentClass,contentClass,openClass) {
	this.parentClass = parentClass;
	this.contentClass = contentClass;
	this.openClass = openClass;
	var obj = this;
	a.onclick = function() {
		obj.toggle();
		this.blur();
		return false;
	}
	while(a.parentNode) {
		if(HW.hasClass(a.parentNode,this.parentClass)) {
			this.parent = a.parentNode;
		}
		a = a.parentNode;
	}
	if(this.parent) {
		this.trgs = HW.getElementsByClassName(HW.DropDown.contentClass,this.parent,'div');
		if(HW.isIE) {this.ieSelectHack();}
		for(var i=0;i<this.trgs.length;i++) {
			HW.hide(this.trgs[i]);
		}
		HW.DropDown.elements.push(this);
	}
}

HW.DropDown.Element.prototype = {
	opened:false,
	trgs:[],
	trans:null,
	toggle:function() {
		if(this.opened) {
			this.close();
		}
		else {
			this.open();
		}
	},
	open:function() {
		for(var i=0;i<this.trgs.length;i++) {
			this.trgs[i].style.display = 'block';
		}
		this.opened = true;
		HW.addClass(this.parent,this.openClass);
	},
	close:function() {
		for(var i=0;i<this.trgs.length;i++) {
			this.trgs[i].style.display = 'none';
		}
		this.opened = false;
		HW.removeClass(this.parent,this.openClass);
	},
	ieSelectHack:function() {
		var tmp = [];
		for(var i=0;i<this.trgs.length;i++) {
			this.trgs[i].style.visibility = 'hidden';
			this.trgs[i].style.display = 'block';
			var w = this.trgs[i].offsetWidth;
			var h = this.trgs[i].offsetHeight;
			this.trgs[i].style.display = 'none';
			this.trgs[i].style.visibility = 'visible';
			var iframe = document.createElement('iframe');
			iframe.src = '#';
			iframe.width = w+'px';
			iframe.height = h+'px';
			iframe.frameBorder = '0';
			HW.addClass(iframe,this.contentClass);
			HW.setFade(iframe,0);
			this.trgs[i].parentNode.insertBefore(iframe,this.trgs[i]);
			tmp.push(this.trgs[i]);
			tmp.push(iframe);
		}
		this.trgs = tmp;
	}
}

HW.ClearDefault = function(cls) {
	if(cls) {
		var inputs = $$(cls,document.body,'input');
		for(var i=0;i<inputs.length;i++) {
			var elm = this;
			(function(){
				var obj = inputs[i];
				inputs[i] = HW.extendObject(inputs[i],elm.Element);
				HW.attachEvent(inputs[i],'focus',function() {obj.focusHandler()});
				HW.attachEvent(inputs[i],'blur',function() {obj.blurHandler()});
			})()
		}
	}
}

HW.ClearDefault.prototype = {
	expClass:'clearField',
	Element:{
		focusHandler:function() {
			if (this.value == this.defaultValue) {this.value = '';}
			HW.removeClass(this,'clearField');
		},
		blurHandler:function() {
			if (this.value == "") {
				this.value= this.defaultValue;
				HW.addClass(this,'clearField');
			}
		}
	}
}

