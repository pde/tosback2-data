HEARST.tempUtils = {

	// TO DO jQuery may already do this -- remove if so
	addParameter: function(url, parameter, value) {
		var delimiter = (/\?/.test(url)) ? '&' : '?',
			i;

		if (!url || !parameter || encodeURIComponent(parameter) !== parameter) {
			return;
		} else if (value) {
			parameter += '=' + encodeURIComponent(value);
		}
		
		return url + delimiter + parameter;
	},

	beget: function(object) {
		var F = function() {};
		F.prototype = object;
		return new F();
	},
	
	cacheBust: function(url) {
		var n = Math.floor(Math.random()*10e6);
		if (url) {
			return this.addParameter(url, 'cachebust', n);
		} else {
			return n;
		}
	},

	writeCookie: function(name,value,days) {
		var date;
		var expires;
		if (days) {
			date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toGMTString();
		}
		else var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
	},

	readCookie: function(name)  {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	eatCookie: function(name) {
		this.writeCookie(name,"",-1);
	},

	getQueryVariable: function(variable) {
		var query = window.location.search.substring(1),
			vars = query.split("&"),
			i, pair;

		for (i=0; i<vars.length; i++) {
			pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
	},

	ha: function(url) {
		return this.addParameter(url, 'ha', 1);
	},

	isArray: function(value) {
		return value &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			typeof value.splice === 'function' &&
			!(value.propertyIsEnumberable('length'));
	},

	// update needs an update - BC
	update: function(current, old) {
		if (typeof current === 'object' && typeof old === 'object') {
			for (var i in old) {
				if (typeof current[i] === typeof old[i]) {
					if (typeof current[i] === 'object') {
						this.update(current[i], old[i]);
					} else {
						current[i] = current[i] || old[i];
					}
				} else if (current[i] && old[i] instanceof Array) {
					current[i] = [].concat(current[i]);
				} else {
					current[i] = old[i];
				}
			}

			return current;
		}
	},

	windowOpen: function(url,name,args) {
		var name = name || '',
			args = args || '';
		if (url) {
			var w = window.open(url,name,args);
			w.focus();
			return false;
		} else {
			return;
		}
	}
}