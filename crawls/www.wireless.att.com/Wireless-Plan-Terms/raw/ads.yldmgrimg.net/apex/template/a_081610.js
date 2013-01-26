/* Check to see if the flashAd_config is defined, if not, define it with defaults (?)
*   flashAd_config is an object that stores all the properties of the flash ad. Once the object has been created
*   with the appropriate properties, apt will consume it and create a flash ad based on that object's configuration. */
if (typeof adOps == "undefined") {var adOps = {};}
if (typeof adOps.util == "undefined") {adOps.util = {};}
adOps.apt = function(){
	/*TODO: set defaults here for apt*/ 
	};
adOps.apt.prototype = {
	/*   display will setup apt using the flashAd_config object  */
	display: function(obj){
		var o = (obj !== "undefined" && typeof obj === "object" /* and if it's a instance of flashAd_config?*/)? obj:flashAd_config;
		var param = (o.param_config === undefined)? { allowScriptAccess: 'never', loop: 'false', wmode: 'opaque', quality: 'high'}:o.param_config;
		var ad = o.ad_config;
		var allowScriptAccess = (param.allowScriptAccess !== undefined)?param.allowScriptAccess:"never";
		var loop = (param.loop !== undefined)?param.loop:"false";
		var wmode = (param.wmode !== undefined)?param.wmode:"opaque";
		var quality = (param.quality !== undefined)?param.quality:"high";
		var div = (ad.div !== undefined)?ad.div:"flashcontent";
		//Default content if there is no flash plugin installed
		document.getElementById(div).innerHTML = '<a href="'+ad.altURL+'" target="'+ad.target+'"><img src="'+ad.altimg+'" width="'+ad.width+'" height="'+ad.height+'" border="0" /></a>';
		// Instantiate a SWFObject and pass in the parameters needed to create the flash object
		var so = new deconcept.SWFObject(ad.swf, "yad", ad.width, ad.height, ad.flashver, null, quality, allowScriptAccess, loop, wmode);
		// Add flash vars for landing urls (and customizable assets)
		if (typeof(ad.flash_vars) === "object") {
			var j = 0;
			var flash_var_name = "";
			for (e in ad.flash_vars) {
				if (ad.flash_vars.hasOwnProperty(e)) {
					if (j%2 === 0) {flash_var_name = ad.flash_vars[e];}
					else {
						// replacing plus sign to %2B to prevent to turn to blank space.
						val = escape(ad.flash_vars[e]).replace(new RegExp("\\+", "g" ),"%2B");
					   	so.addVariable(flash_var_name, val);
					}
					j++; 
				}
			}
		}
		so.write(div);
	}
};
adOps.util = {
	buildElement: function(type, attr) {
		var elem = document.createElement(type);
		for (var i in attr) {
			if (attr.hasOwnProperty(i)) {
				elem.setAttribute(attr[i][0], attr[i][1]);
			}
		}
	return elem;
	}
};

var apt_ad = new adOps.apt();
apt_ad.display(flashAd_config);

