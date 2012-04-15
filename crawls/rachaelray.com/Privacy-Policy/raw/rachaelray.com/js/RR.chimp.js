/**
 * @namespace
 * The top-level namespace for rachaelray.com
 */
var RR = RR || {};

/**
 * 
 */
RR.chimp = (function () {
	
	    // dependencies
  var utils = RR.utils,
	    
	    // private attributes
	    url = "http://rachaelray.us2.list-manage2.com/subscribe",
			keys = {
				 u: "e844b8b57585065e39eb27e0a",
				id: "b70bbd2b33"
			},
			subs = {
				bml: "group[1][1]",  // Budget Meals
				wnr: "group[1][2]",  // What's New at rachaelray.com
				wru: "group[1][4]",  // Weekly Recipe Round-Up
				cso: "group[1][8]"   // Special Offers
			},
		  
			// private methods
			buildUrl = function () {
				var arg, args = utils.arg2array(arguments),
						fields = {},
						myKeys = jQuery.param(keys);	
						
				for (arg in args) {
					if (args.hasOwnProperty(arg)) {
            fields[subs[args[arg]]] = 'true';
					}
				}
				fields = jQuery.param(fields);
				return [url, [myKeys, fields].join('&')].join('?');
			},
			
			getSignup = function (signups) {
				var formUrl = buildUrl.apply(this, arguments);
				RR.popWindow(formUrl, 'chimp', {width:640,height:680});
				return false;
			};
	// end var
	
	// reveal the public api
	return {
		getSignup: getSignup
	};
})();