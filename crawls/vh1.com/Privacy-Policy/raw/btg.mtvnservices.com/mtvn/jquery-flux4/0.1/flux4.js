;(function($, w) {
	
	var configured, conf, stub, loading, extant = {}, _guid = 0; waiting = $();
	var version = "0.1";

	var createConf = function() {

		if (w.MTVN && w.MTVN.conf && w.MTVN.conf.flux4) {
			$.extend(conf, w.MTVN.conf.flux4);
			configured = true;
		}
		
	}
	
	var loadCore = function() {
		var core =  (MTVN.conf.flux4.staging) ? 
					"http://widgets4.flux-staging.com/Core?includeJquery=false":
					"http://widgets4.flux.com/Core?includeJquery=false";
					
		loading = true;
		


		// flux needs an id on a script tag to figure out the UCID, so we add an empty one to the document
		stub = document.createElement("script");
		stub.setAttribute('id', conf.ucid);
		stub.setAttribute('widgets4Debug', "true");
		document.body.appendChild(stub)

		yepnope({
			load: core,
			complete: function () {
				loading = false;
				if (w.Flux4) {
					waiting.trigger("Flux4.coreLoad", [true]);
				} else {
					waiting.trigger("Flux4.coreLoad", [false]);
				}
			}
		});

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

			var opts = $.extend({"container": element}, conf.widgets[wName].opts)

			if (wContentUri) {
				opts.contentUri = wContentUri;
				opts.contentId = wContentUri;
			}
			
			if (extant[wGuid] != wName + "|" + wContentUri) {
				extant[wGuid] = wName + "|" + wContentUri;
				
				el.empty();
				
				w.Flux4.createWidget(conf.widgets[wName]["name"], opts, function(widget) {

					if  (conf.widgets[wName]["onLoad"]) {
							conf.widgets[wName]["onLoad"](widget);				
					}
					el.trigger("Flux4.widget.load", [widget, true, conf.widgets[wName]["name"], opts]);

				});
			} else {		
				el.trigger("Flux4.widget.load", [undefined, false, conf.widgets[wName]["name"], opts]);
			}
		} 
	}

	
	var init = function() {
	
		configured = false;
		loading = false;
		extant = {};
		waiting = $();
		
		conf = {}		

		if (stub) {
			stub.parentNode.removeChild(stub);
			stub = undefined;
		}
	}

	init();

	$.fn.flux4 = function(cmd) {
		var filtered;	

		if (cmd == "init") {
		
			init();
			return this;
		
		} else if (cmd == "debug") {
		
			return {
				configured: configured,
				extant: extant,
				waiting: waiting
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
						loadCore(filtered);
					}

					filtered.bind("Flux4.coreLoad", function(){

						loadElement(this);
					});
	
				} else {
	
					filtered.each(function() {
						loadElement(this);
					});
	
				}
			} 
		}
		
		return filtered;
	
	};

	
})(jQuery, window);

