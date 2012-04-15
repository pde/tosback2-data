jQuery.extend({
	// Requires two params
	// CSS query for single elements only
	// callback function to run when element is created
	/*
	 * @param query as jQuery selector
	 * @param callBack as function
	 * @param fieldLabel as DOM reference
	 * @return nothing is returned
	 */	
	onElementReady: function(query, callBack) {
	var delayValue = 100;
	var timeoutValue = 5000;
	// cancel if element not found after timeoutValue
	var defaultAction = setTimeout(
		function() {
			if ($(query)[0] === undefined) {
				clearInterval(elementPoll);
				clearTimeout(defaultAction);			
			}
		}
	, timeoutValue);
	// poll element and execute callback if found
	var elementPoll = setInterval(
		function() {
			//console.log("runnning...");
			if ($(query)[0] !== undefined) {
				clearInterval(elementPoll);
				callBack();
			}
		}
		, delayValue);
	}
});

// initialise namespace
if (!argos) var argos = {};

argos.page = {
	trolleyState: {
		userRecognised: "false",
		quantity: "0",
		price: "0.00"
	},
	// cookie get and set
	setCookie : function(name,value,days) {
		var expires = "";
		
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		
		document.cookie = name+"="+value+expires+"; path=/";
	},
	
	getCookie : function(name) {
		var cookie = null;
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) {
				cookie = c.substring(nameEQ.length,c.length);
			}
		}
		return cookie;
	},

	removeCookie : function(name) {
		argos.page.setCookie(name,"",-1);
	},
	
	saveTrolley : function(basket) {
		// get defensive
		var basketRef = basket || {quantity : "0", total : "0"};
		
		//save trolley info
		//0 - set expiry to session
		argos.page.setCookie("quantity",basketRef.quantity,0);
		argos.page.setCookie("total",basketRef.total,0);
	},
	
	initializeTrolley : function(input){
		argos.page.trolleyState = input;
	},
	
	displayPersistentTrolley : function() {
		// future proof
		// Unicode : pound "\u00A3", euro "\u20AC"
		var currency = "\u00A3";
		// get defensive
		if (!document.getElementById || !document.getElementById("trolleyitems") || !document.getElementById("trolleyprice")) return;
		//display nothing if elements do not exist
		var trolleyQuantity = argos.page.getCookie("quantity") || "0";
		var trolleyTotal = argos.page.getCookie("total") || "0";

		var state = argos.page.trolleyState;
		if(state!=null && state.userRecognised=='true'){
			if(state.quantity && state.price){
				trolleyQuantity = state.quantity;
				trolleyTotal = state.price;
			}
		}
		
		//populate header	
		document.getElementById("trolleyitems").innerHTML=trolleyQuantity+" Items = ";	
		document.getElementById("trolleyprice").innerHTML=currency+trolleyTotal;	
	},
	
	//reset display of default form field text	
	resetField : function(fieldName,value) {
		//Get reference
		var field = document.getElementById(fieldName);
		var defaultValue = value;
		//get defensive
		if (!field) return;
		//Clear search field
		$(field).bind("focus click", function() {
			// clear only if pre-filled text
			if (field.value == defaultValue) {
				field.value="";
				}
			});
		//Re-populate with default value
		//field.onblur = function() {field.value = field.defaultValue;};
		
	},
	
	setEVar47 : function(promoBannerTag, clickObj) {
		//Promo Banner tagging		
		//Kitchen:1
		
		if(promoBannerTag && promoBannerTag != ""){			
			var s=s_gi(s_account); 
			s.linkTrackVars="eVar47"; 
			s.eVar47= promoBannerTag;
			s.tl(clickObj,'o',promoBannerTag);
			s.linkTrackVars="";
			s.eVar47="";
		}
		
		return true;
	},
	
	setEVar44 : function(productInTabTag,partNumber, clickObj) {		
		if(productInTabTag && productInTabTag != "" && partNumber && partNumber !="" ){
			var s=s_gi(s_account); 
			s.linkTrackVars="products,eVar44"; 
			s.products = ";"+partNumber;
			s.eVar44=productInTabTag; 
			s.tl(clickObj,'o', productInTabTag);
			s.linkTrackVars="";
			s.eVar44="";			
		}
		
		return true;
	},
	
		
	//PPK's find element position
	/**
	 * Return the absolute position of a DOM element relative to the page
	 * @param {Object} elem the DOM element
	 * @return the position object in the JSON format of {x: <x coordinate>, y: <y coordinate>}
	 */
	getPosition : function(obj) {
		var pos = {x: 0, y: 0};
		if (obj.offsetParent) {
			while (obj.offsetParent) {
				pos.x += obj.offsetLeft;
				pos.y += obj.offsetTop;
				obj = obj.offsetParent;
			}
		} else { 
			if (obj.x) pos.x += obj.x;
			if (obj.y) 	pos.y += obj.y;
		}
		
		return pos;
	}, 
	
	/**
	 * Position a DOM element relative to the page.
	 * @param {Object} elem the DOM element to be posistioned
	 * @param {Object} pos the position object in JSON format of {x: <x coordinate>, y: <y coordinate>}
	 */
	setPosition : function(elem, pos) {
		if (elem && pos && pos.x) {
			elem.style.left = pos.x + "px";			
		}
		
		if (elem && pos && pos.y) {
			elem.style.top = pos.y + "px";		
		}
	},	

	// sets to http if not encrypted page
	isSecurePage : function() {
		return window.location.protocol == "https:";
	}
	
};


// deprecated namespaces
if (typeof Argos !== "object") { var Argos = {}; }
Argos.Page = argos.page;
