/*
 *	Initializes 'HEARST' global object along with a library of some common properties and methods
 */

if (typeof HEARST == 'undefined' || !HEARST) {
	var HEARST = {
		// TODO namespace and require can be the same function
		namespace: function() {
			var a = arguments,
				o = null,
				i, j, names;
			for (i=0; i<a.length; i++) {
				names = a[i].split('.');
				o = HEARST;
		
				for (j=(names[0] == 'HEARST') ? 1 : 0; j<names.length; j++) {
					o[names[j]] = o[names[j]] || {};
					o = o[names[j]];
				}
			};
			return o;
		},

		require: function() {
			var namespace = [],
				lastArg = arguments[arguments.length - 1],
				error = lastArg.constructor === Error && lastArg,
				o, i, j;

			for (i=0; i<arguments.length; i++) {
				o = this;
				if (typeof arguments[i] === 'string') {
					namespace = arguments[i].split('.');
					j = (window[namespace[0]] === o) ? 1 : 0;
					for ( ; j<namespace.length; j++) {
						if (o[namespace[j]]) {
							o = o[namespace[j]];
						} else {
							error.message = ['HEARST.', namespace.join('.'), ' is inaccessible. HEARST.', namespace.splice(0,j+1).join('.'), ' is not loaded.'].join('');
							return error;
						}
					}
				}
			}
			return true;
		}
	};
}

HEARST.utils = HEARST.utils || {
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
		createCookie(name,"",-1);
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
};

HEARST.ria = HEARST.ria || function() {
	var swfDefault = {
			expressInstall: '/cm/shared/assets/build/4/flash/expressInstall/expressInstall.swf',
			version: '9.0.45.0',
			vars: {},
			params: {
				menu: false,
				quality: 'best',
				scale: 'noscale',
				salign: 'tl',
				wmode: 'transparent',
				bgcolor: '',
				base: ''
			},
			attrs: {}
		};

	function $unique() {
		var $u = $('<div id="flash_id' + Math.floor(Math.random()*10e6) + '"></div>');
		return $u;
	}

	return {
		flash: function(o) {
			var swf = o.swf,
				$container = o.$container,
				$objectContainer = $unique(),
				$noFlash = $('.no_flash');

			swf = HEARST.utils.update(swf, swfDefault);

			swf.id = $objectContainer.attr('id');
			$container
				.empty()
				.append($objectContainer);

			swf.width = $container.width();
			swf.height = $container.height() || 10; // A height is required for embedSWF to work

			swf.attrs.id = swf.id; // Necessary provision made for swfaddress to work properly
			
			swfobject.embedSWF(swf.url, swf.id, swf.width, swf.height, swf.version, swf.expressInstall, swf.vars, swf.params, swf.attrs);
			
			return o;
		}
	}
}( );

/**
 * templateReplace method used for HTML templating using JS strings
 * "fields" denoted as {{ field_name }} can be replaced using this method
 * TODO make this method more clear/readable.
 **/
String.prototype.templateReplace = function(o,p) {
    var a, b;
    return this.replace(/\{\{\s([^{}]*)\s\}\}/g,
        function (a, b) {
            var r = o[b];
            if (typeof r === 'string' || typeof r === 'number') {
                return r;
            } else if (typeof p === 'object' && p[b]) {
                return p[b];
            } else {
                return a;
            }
        }
    );
};

/**
 * ord variable for ad scripts ---COMENTED OUT NOT NEEDED, IN XS SCRIPT
 */
//window.ord=Math.floor(Math.random()*10e15);

/**
 * IE background-image flicker
 */
try { document.execCommand("BackgroundImageCache", false, true); }
catch(e) {};