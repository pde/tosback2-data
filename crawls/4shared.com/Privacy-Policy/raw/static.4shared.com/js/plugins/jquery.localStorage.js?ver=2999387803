/*!
 * jQuery LocalStorage Plugin
 *
 * Copyright 2011, James Brooks
 * Version, 1.0
 */
(function($) {
	var supportsLS = true;
	var lS = null;

	if(typeof localStorage === 'undefined' || typeof JSON === 'undefined') {
		supportsLS = false;
	}else{
		lS = window.localStorage;
	}

	this.supportsLS = function() {
		return supportsLS;
	};

	this.setItem = function(key, value, lifeTime) {
		if(!supportsLS) return false;

		var __time = new Date();
		/* Allow unlimited lifetime */
		lifeTime = (lifeTime === undefined ? -1 : lifeTime);

		lS.setItem(key, JSON.stringify(value));
		lS.setItem('meta_ct_' + key, __time.getTime());
		lS.setItem('meta_lt_' + key, lifeTime);

		return true;
	};

	this.getItem = function(key) {
		if(!supportsLS) return false;

		if(lS.getItem(key) === null) return false;

		var __time = new Date();
		/* Will we never expire? */
		if(JSON.parse(lS.getItem('meta_lt_' + key)) == -1) {
			return JSON.parse(lS.getItem(key));
		}else{
			/* Store has expiry date. Did we expire? */
			if(__time.getTime() - lS.getItem('meta_ct_' + key) > lS.getItem('meta_lt_' + key)) {
				/* Remove item from storage */
				lS.removeItem(key);
				lS.removeItem('meta_ct_' + key);
				lS.removeItem('meta_lt_' + key);
				return false;
			}

			return JSON.parse(lS.getItem(key));
		}
		return true;
	};

	/* Removes a specific item */
	this.removeItem = function(key) {
		if(supportsLS && lS.getItem(key) === null) return false;

		return supportsLS && lS.removeItem(key);
	};

	/* Completely removes all localStorage data */
	this.clearAll = function() {
		return supportsLS && lS.clear();
	};

	jQuery.localStorage = this;
	
})(jQuery);
