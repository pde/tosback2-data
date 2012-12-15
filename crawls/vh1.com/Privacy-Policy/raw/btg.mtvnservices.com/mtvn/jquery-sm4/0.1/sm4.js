;(function($, w) {
	// do not redefine if the plugin is already there
	if ($.fn.sm4)
		return false
	
	var configured, conf, stub, loading, debugMode = false, extant = {}, _guid = 1, waiting = $();
	var version = "0.1";

	function log () {
		if (!debugMode)
			return false;
			
		if (typeof console == 'undefined') {
			return false;
		}

		console.log( Array.prototype.slice.call(arguments) );

	}

	// check to see if jQuery greater than 1.4.3, return and log error if not
	if ($().jquery < "1.4.4") {
		return log("Social Media 4 jQuery Plugin requires jQuery version 1.4.4 or higher");
	}

	// check to see if we are in debug mode


	var setDebugMode = function(url) {
		var test, qs, i;
		if (test = url) {
			qs = test.split("&")
			for (i = 0; i < qs.length; i ++) {
				if (qs[i] == "enableWidgetsDebug=true") {
					debugMode = true;
					return debugMode

				}
			}
		}
		debugMode = false
		return debugMode

	};
	
	setDebugMode(document.location.search.substr(1)) 

	var createConf = function() {
		if (w.MTVN && w.MTVN.conf && w.MTVN.conf.sm4) {
			conf = $.extend({}, w.MTVN.conf.sm4);
			configured = true;
		}		
	}
	
	var loadCore = function() {

	
		if(!w.yepnope) {
			return false
		}

		var core =  (MTVN.conf.sm4.staging) ? 
					"http://widgets4.flux-staging.com/Core?includeJquery=false":
					"http://widgets4.flux.com/Core?includeJquery=false";

		if (debugMode) {
			core = core + "&enableWidgetsDebug=true";
		}
					
		loading = true;


		// Social Media Core.js needs an id on a script tag to figure out the UCID, so we add an empty one to the document
		stub = document.createElement("script");
		stub.setAttribute('id', conf.ucid);
		stub.setAttribute('widgets4Debug', "true");
		document.body.appendChild(stub)

		var retries = 3;
		
		var load = function() {
			yepnope({
				load: core,
				complete: function () {
					if (w.Flux4) {
						waiting.trigger("sm4.coreLoad", [true]);
						loading = false;
						waiting = $();
					} else {
						if (retries > 0) {
							retries--;
							load();
						} else {
							waiting.trigger("sm4.coreLoad", [false]);
							loading = false;
							waiting = $();
						}
					}
				}
			});		
		}
		
		load();


	}

	var loadElement = function(element) {

		var el = $(element);

		if (!el.data("_guid")) {
			el.data("_guid", _guid++)
		}
		
		var wGuid = el.data("_guid");
		var wName = el.data("widget")
		var wContentUri = el.data("contenturi");
		
		if (conf.widgets[wName]) {

			var opts = $.extend({}, conf.widgets[wName].opts)

			if (wContentUri) {
				opts.contentUri = wContentUri;
				opts.contentId = wContentUri;
			}
			
			if (extant[wGuid] != wName + "|" + wContentUri) {
				extant[wGuid] = wName + "|" + wContentUri;

				el.empty();
				
				log("creating: " + conf.widgets[wName]["name"] + " with opts: ");
				if (typeof JSON == 'undefined') {
					log(opts);
				} else {
					log(JSON.stringify(opts, null, 2));
				}
				
				opts["container"] = element;
				
				w.Flux4.createWidget(conf.widgets[wName]["name"], opts, function(widget) {

					log(conf.widgets[wName]["name"] + " success");
					
					if  (conf.widgets[wName]["onLoad"]) {
							conf.widgets[wName]["onLoad"](widget);				
					}
					el.trigger("sm4.widget.load", [widget, true, conf.widgets[wName]["name"], opts]);

				});
			} else {		

				log(conf.widgets[wName]["name"] + " fail");

				el.trigger("sm4.widget.load", [undefined, false, conf.widgets[wName]["name"], opts]);
			}
		} 
	}

	
	var reset = function() {

		configured = false;
		loading = false;
		
		if (stub) {
			stub.parentNode.removeChild(stub);
			stub = undefined;
		}
		
	}

	$.fn.sm4 = function(cmd) {
	
		
		var filtered;	

		if (cmd == "reset") {

			reset();
			return this;
		
		} else if (cmd == "debug") {
		
			return {
				configured: configured,
				version: version,
				setDebugMode: setDebugMode
				
			}
			
		} else {
			if (configured !== true) {
				createConf();
			}
		
			if (!conf.ucid) {
				return this
			}
			
			
			filtered = this.filter(function() {
				if (conf.widgets[$(this).data("widget")]) {
					return true;
				} else {
					return false;
				}
			});

			waiting = waiting.add(filtered);

			if (filtered.length) {
			
				if (!window.Flux4) {
					
					if (!loading) {
						filtered.bind("sm4.coreLoad", function(){
							loadElement(this);
						});
						
						loadCore();
					} else {
						filtered.bind("sm4.coreLoad", function(){
							loadElement(this);
						});
					
					}


	
				} else {
	
					filtered.each(function() {
						loadElement(this);
					});
	
				}
			} 
		}
		
		return filtered;
	
	};

	
})(window["jQuery"] || window["Zepto"], window);

