// Temporary reassign window in global scope (For later encapsulation/packaging purpose.)
var Global = this;


/**
 * JetBlue Global Namespace.
 * @namespace
 */

var JB = JB || {
	v: "0.1"
};


/**
 * Configuration Namespace.
 * Global configuration settings.
 * @namespace
 */

JB.Config = {
	debug: false,
	jsPath: "/js/", // Paths must end with trailing slash
	api: {
		webFares: "/partials/featured-fares.html" // Web Fares Search/Browse URL
	}
};


/**
 * Session Info Namespace.
 * Stores and sets values for current session user.
 * @namespace
 */

JB.Session = {
	calendar: {
		today: new Date(),
		todayString: $.datepicker.formatDate('D, M dd, yy',  new Date()),
		endDate: new Date(scheduleExtDate.year, scheduleExtDate.month, scheduleExtDate.day)
	},
	pageDimensions: {
		isSet: false
	},
	tooltip: {
		isBuilt: false
	}	
};


/**
 * Models Namespace.
 * Collection of AJAX requests defined as models.
 * @namespace
 */

JB.Model = {};


/**
 * JB Base Class.
 * @requires Requires (Class) Simple Inheritance Library.
 */

JB.Class = Class.extend({
	config: {
		jsPath: JB.Config.jsPath,
		jsExtension: ".js?v=1.3"
	},
	require: {"jQuery": "vendor/jquery-1.6.2.min"}, // Filenames with no file extension
	depender: function(options){
		var self = this;
		var libs = [];
		for(key in this.require){
			this.depender.test = function(){
				if(typeof eval(key) !== "undefined") return true;
				else return false;
			};
			if(!this.depender.test()){
				this.depender.tested = this.depender.test();
				var lib = this.config.jsPath + this.require[key] + this.config.jsExtension;
				libs.push(lib);
			}
		}
		if(!!!(libs.length)){
			options.complete();
			return;
		}
		// yepnope.errorTimeout = 4000; // Default 10,000 milliseconds
		yepnope({
			test: this.depender.tested,
			nope: libs,
			callback: function(testResult, key){
				options.callback(testResult, key);
			},
			complete: function(){
				options.complete();
			}
		});
	},
	init: function(){
		var self = this;
		this.depender({
			callback: function(testResult, key){
				//if(JB.Config.debug){ if(window.console) console.log("callback", testResult, key); };
			},
			complete: function(){
				self._build();
			}
		});
		JB.Class.Instances.push(this);
	}
});


/**
 * JB Class Instances.
 * Collection of all of the JetBlue Class Instances.
 * @namespace
 */

JB.Class.Instances = [];


/**
 * Functions Namespace.
 * Collection of custom resuable loose functions.
 * @namespace
 */

JB.Fn = {};


/**
 * Functions Namespace.
 * Collection of custom resuable jQuery environment independant plugins.
 * For ©JetBlue Use only.
 * @namespace
 */

JB.Helper = {};
JB.Helper = jQuery.fn; // Routes JB.Helper to jQuery fn as plugins.


/**
 * Hooks Namespace.
 * @namespace
 */

JB.Hook = {};


/**
 * Pages Namespace.
 * @namespace
 */

JB.Page = {};
