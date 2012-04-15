// argos object should already be declared


(function() {
	var _ecxreg = {};
	var _imageDir = argos.page.imageDir;
	var _globalJs = _imageDir + "global/js/";

	var _registered = (new function() {
		this.classes = _globalJs + "classes.js";
		this.utils = _globalJs + "utils.js";
		this.products = _globalJs + "products.js";
		this.promotions = _imageDir + "promotions/js/promotions.js";
	
		this.services = {
			datetime : _globalJs + "services.js",
			cron : _globalJs + "services.js",
			unique : _globalJs + "services.js",
			clock : _globalJs + "clock.js"
		}

		this.effects = {
			autoscroll : _globalJs + "autoscroll.js"
		}

		this.widgets = {
			Scroller : _globalJs + "scroller.js",
			Carousel : _globalJs + "carousel.js",
			TabbedArea : _globalJs + "tabbedArea.js",
			SlideShow : _globalJs + "slideShow.js",
			popup : _imageDir + "popup/popup.js",
			quickinfo : _imageDir + "quickinfo/quickinfo.js"
		}
	});

	var _debug = false;
	var _console = function(msg) {
		if(_debug) console.log(msg);
	}

	this.debug = _debug;


	this.check = function(what) {
		// Like the usual checks, this shouldn't be required
		// but is available if it makes you feel better.
		if(!this[what]) this[what] = {};
	}

	this.require = function(requirement) {
		return false; // Temporarily disabled due to hanging issues in IE9, experienced on page refresh.

		// Check to see if object exists. 
		// If not, and it's registered, try to load it.
		var registered = _registered;
		var loaded = this;
		var req = requirement.split(".");

		for(var i=0; i<req.length; ++i) {
			_console("Testing: " + req[i]);
			if(!loaded[req[i]]) {
				if(registered[req[i]] && registered[req[i]].constructor == (new String).constructor) {
					this.load(registered[req[i]]);
					continue;
				}
			}
			else {
				loaded = loaded[req[i]]; 
				_console("Already loaded: " + req[i]);
			}
			// Set up next level to have req[0].req[1] etc.
			if(registered[req[i]] && registered[req[i]].constructor == (new Object).constructor) {
				registered = registered[req[i]]; 
			}
		} 
	}

	this.load  = function(url) {
		// Retrieves requested package not already loaded.
		// (String) @requirement should be package object (e.g. utils or widgets.something)
		if(url && url.constructor == (new String).constructor) { 
			$.ajax({
				url : url,
				dataType : "script",
				cache : true,
				async : false,
				success : function() {
					_console("load success: " + this.url); 
				},
				error : function() { 
					_console("load error: " + this.url); 
				}
			});
		}
	}

	this.ecxreg = function(obj) {
		// Store values from ecxreg available only in template, for retrieval in JS.
		var value = (obj && obj.constructor === (new String()).constructor);
		if(!value) {
			for(var i in obj) {
				_ecxreg[String(i)] = obj[i];
			}
		}

		return value ? _ecxreg[obj] : _ecxreg;		
	}

	this.history = (new function() {
		var _history = this;
		var _window = null;

		this.init = function(func, location) {
			// Use location if you want to set an initial value rather than a default of blank (empty string);
			var qs = "?" + (location ? location : "");
			_history.action = func;
			$("body").append($("<iframe id=\"history\" height=\"1\" width=\"1\" frameborder=\"0\" style=\"visibility:hidden\" src=\"" + _globalJs + "history.html" + qs + "\"></iframe>"));
		}

		this.setWindow = function(win) {
			// This should be called automatically in history.html
			if(!_window) {
				_window = win;
			} 
		}

		this.add = function(location, args) {
			// Use args if you want to make argos.history.args available to your action function.
			_history.args = args || [];
			if(_window) {
				_window.location.href = _window.location.pathname + "?" + location;
				_history.args = []; // reset.
			}
		}
	});


	/*
	this.api = new (function() {
		var _api = this;
		this.register = function(where, what) {
			console.log("where: ", where);
			console.log("what: ", what);
			// TODO: Expose the var(what) under var(where) location.
		}
	});
	*/

	this.tracking = (new function(){
		this.set = function(element, linkName, properties, delay){
			// Disable links by using in click event as "return argos.tracking.set(blah...);"
			// Add extra delay for tagging to happen by specifying a delay (ms) time.
			var s = s_gi(s_account);
			for( var p in properties ) {
				s[p] = properties[p];
			}
			s.tl(element, "o", linkName);
			if(arguments.length > 3) {
				setTimeout(function() {
					if (element["href"]) {
						location.href = element.href;
					}
				}, delay);
			}

			return false;
		}
	});

}).call(argos);

