// Functions to generate a random client Id stored in a cookie
function getClientSessionId() {
	var clientSessionId = $.cookie('C_CLIENT_SESSION_ID');
	if (clientSessionId == null || clientSessionId == ''){
		var uuid = getUUID();
		$.cookie('C_CLIENT_SESSION_ID', uuid);
		return uuid;
	}else{
		return clientSessionId;
	}
}

function getUUID() {
	var nbr, randStr = "";
	do {randStr += (nbr = Math.random()).toString(16).substr(2);} while (randStr.length < 30);
	return [randStr.substr(0, 8), "-",randStr.substr(8, 4), "-4",randStr.substr(12, 3), "-",((nbr*4|0)+8).toString(16), randStr.substr(15, 3), "-",randStr.substr(18, 12)].join("");
}

// Mozilla's ECMA-262 version of Array.indexOf since some IE version don't have this out of the box.
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement /*, fromIndex */) {
		"use strict";
		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0)
			return -1;

		var n = 0;
		if (arguments.length > 0) {
			n = Number(arguments[1]);
			if (n !== n)
				n = 0;
			else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
		}

		if (n >= len)
			return -1;

		var k = n >= 0
          ? n
          : Math.max(len - Math.abs(n), 0);

		for (; k < len; k++) {
			if (k in t && t[k] === searchElement)
				return k;
		}
		return -1;
	};
}

if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array();
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
      {
        var val = this[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, this))
          res.push(val);
      }
    }

    return res;
  };
}

JsUtil = {};
JsUtil.array = {};
// Array comparison
JsUtil.array.compare = function(a,b) {
	if (a === b) {
		return true;
	}   
	else if (a.length != b.length) {
   		return false;
	}
	for (var i=0;i<a.length;i++) {
	 	if (a[i] != b[i]) {
     		return false;
 		}
	}
	return true;
}

JsUtil.array.startswith = function(a,b) {
	if(a === b)return true;
	if(a === undefined || b === undefined) return false;
	for (var i=0; (i < a.length) && (i < b.length); i++) {
	 	if (a[i] != b[i]) {
     		return false;
 		}
	}
	return true;
}

$.fn.sortElements = (function(){	 
    var sort = [].sort;
    return function(sortfunc, getSortable) {
        getSortable = getSortable || function(){ return $(this); };
		var last = null;
        return sort.call(this, sortfunc).each(function(i) {
			var node = getSortable && typeof(getSortable) === "function" ? getSortable.call(this) : $(this);
			var parent = node.parent();
			if (last) {
				last.after(node);
			} else {
				parent.prepend(node);
			}
			last = node;
        }); 
    };
})();

function makeOptions(options, displayAttribute, valueAttribute) {
	return $.map(options, function(o,i){ return $('<option value="'+o[valueAttribute]+'">'+o[displayAttribute]+'</option>').data('real_value',o)[0]; });
}








(function($) {

	function sameOrChild(n1, n2) {
		// http://www.quirksmode.org/blog/archives/2006/01/contains_for_mo.html
		return n1 === n2 || (typeof(n1.contains) !== 'undefined' ? n1.contains(n2) : !!(n1.compareDocumentPosition(n2) & 16));
	}

	function focusHandler(event) {
		event = $.event.fix(event || window.event), $this = $(this), isFocused = $this.data('focus.isFocused');
		if (!isFocused) {
			$this.data('focus.isFocused', true);
			event.type = 'focusin2';
			return $.event.handle.apply(this, [event]);
		}	
	}

	function blurHandler(event) {
		var args = [].slice.call(arguments, 1), $this = $(this);
		event = $.event.fix(event || window.event);

		window.setTimeout(function() {
			if (!sameOrChild($this.get(0), document.activeElement)) {
				$this.data('focus.isFocused', false);
				event.type = 'focusout2';
				return $.event.handle.apply($this.get(0), [event]);
			}
		}, 0);
	}

	function setupEvents(elem) {
		var $elem = $(elem), ref = $elem.data('focus.handlerReferences') || 0;
		if (ref == 0) {
			if (elem.addEventListener) {
				elem.addEventListener('focus', focusHandler, true);
				elem.addEventListener('blur', blurHandler, true);
			} else {
				// ie6 / 7 (this breaks all previous onfocusin/onfocusout events)
				elem.onfocusin  = focusHandler;
				elem.onfocusout = blurHandler;
			}
		}
		$elem.data('focus.handlerReferences', ref + 1)
		$elem.data('focus.isFocused', sameOrChild(elem, document.activeElement));
	}

	function teardownEvents(elem) {
		var $elem = $(elem), ref = $elem.data('focus.handlerReferences') || 0;
		if (ref == 1) {
			if (elem.removeEventListener) {
				elem.removeEventListener('focus', focusHandler, true);
				elem.removeEventListener('blur', blurHandler, true);
			}
			else {
				elem.onfocusin2  = null;
				elem.onfocusout2 = null;
			}
			$elem.removeData('focus.handlerReferences')
			$elem.removeData('focus.isFocused');
		}
		else {
			$elem.data('focus.handlerReferences', ref - 1);
		}
	}

	$.each(['focusin2', 'focusout2'], function(i, x) {
		$.event.special[x] = {
			setup: function() { setupEvents(this); },
			teardown: function() { teardownEvents(this); }
		};
	});

	$.fn.extend({
		focusin2: function(fn) {
			return fn ? this.bind('focusin2', fn) : this.trigger('focusin2');
		},
		focusout2: function(fn) {
			return fn ? this.bind('focusout2', fn) : this.trigger('focusout2');
		}
	});

	$.fn.extend({
		hoverFocus: function(fn,fn2) {
			return this.bind('mouseenter focusin2', fn).bind('mouseleave focusout2', fn2);
		}
	});

	$.fn.extend({
		isChildOf: function(filter_string) {
			if ($(this).is(filter_string)) {
				return true;
			}
			var parents = $(this).parents().get();
			for (j=0; j<parents.length; j++) {
				if ($(parents[j]).is(filter_string)) {
					return true;
				}
			}
			return false;
		}
	});
})(jQuery);