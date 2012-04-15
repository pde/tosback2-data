if (typeof HEARST == 'undefined' || !HEARST) {

	var HEARST = {

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

//////////////////////////////////////////////
// ord variable for ad scripts              //
//////////////////////////////////////////////
//comment out ORD becuase it is in the refreshad's script already which is calling sending flase returns.
//window.ord=Math.floor(Math.random()*10e15);

// IE background-image flicker
try { document.execCommand("BackgroundImageCache", false, true); }
catch(e) {};