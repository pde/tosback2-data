/*	ALL JS 
	Copyright 2010 Adobe Systems Incorporated
	$Id $
*/
/*	REMEDIAL JAVASCRIPT $Revision: #1 $
	for more information visit "http://javascript.crockford.com/remedial.html"
	added support for "call" and "apply" methods
	added "isTag" method
*/

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

function isAlien(a) {
   return isObject(a) && typeof a.constructor != 'function';
}
function isArray(a) {
    return isObject(a) && a.constructor == Array;
}
function isBoolean(a) {
    return typeof a == 'boolean';
}
function isEmpty(o) {
    var i, v;
    if (isObject(o)) {
        for (i in o) {
            v = o[i];
            if (isUndefined(v) && isFunction(v)) {
                return false;
            }
        }
    }
    return true;
}
function isFunction(a) {
    return typeof a == 'function';
}
function isNull(a) {
    return typeof a == 'object' && !a;
}
function isNumber(a) {
    return typeof a == 'number' && isFinite(a);
}
function isObject(a) {
    return (a && typeof a == 'object') || isFunction(a);
}
function isString(a) {
    return typeof a == 'string';
}
function isTag(a) {
    return a.nodeType && a.nodeType ==1;
} 
function isUndefined(a) {
    return typeof a == 'undefined';
} 

/* Array Prototyping */
if (!isFunction(Function.apply)) {
	Function.method('apply', function (o, a) {
		var s = [];
		var r, call;
		
		if (!o) { o = window; }
		if (!a) { a = []; }
		
		for (var i = 0; i < a.length; i++) {
			s[i] = "a["+i+"]";
		}
		
		call = "o.__applyTemp__(" + s.join(",") + ");";
		
		o.__applyTemp__ = this;
		r = eval(call);
		o.__applyTemp__ = null;
		return r;
	});
}
if (!isFunction(Array.prototype.pop)) {
    Array.method('pop', function () {
        return this.splice(this.length - 1, 1)[0];
    });
}
if (!isFunction(Array.prototype.push)) {
    Array.method('push', function () {
        this.splice.apply(this,
            [this.length, 0].concat(Array.prototype.slice.apply(arguments)));
        return this.length;
    });
}
if (!isFunction(Array.prototype.shift)) {
    Array.method('shift', function () {
        return this.splice(0, 1)[0];
    });
}
if (!isFunction(Array.prototype.splice)) {
    Array.method('splice', function (s, d) {
        var max = Math.max,
            min = Math.min,
            a = [], // The return value array
            e,  // element
            i = max(arguments.length - 2, 0),   // insert count
            k = 0,
            l = this.length,
            n,  // new length
            v,  // delta
            x;  // shift count

        s = s || 0;
        if (s < 0) {
            s += l;
        }
        s = max(min(s, l), 0);  // start point
        d = max(min(isNumber(d) ? d : l, l - s), 0);    // delete count
        v = i - d;
        n = l + v;
        while (k < d) {
            e = this[s + k];
            if (!isUndefined(e)) {
                a[k] = e;
            }
            k += 1;
        }
        x = l - s - d;
        if (v < 0) {
            k = s + i;
            while (x) {
                this[k] = this[k - v];
                k += 1;
                x -= 1;
            }
            this.length = n;
        } else if (v > 0) {
            k = 1;
            while (x) {
                this[n - k] = this[l - k];
                k += 1;
                x -= 1;
            }
        }
        for (k = 0; k < i; ++k) {
            this[s + k] = arguments[k + 2];
        }
        return a;
    });
}
if (!isFunction(Array.prototype.unshift)) {
    Array.method('unshift', function () {
        this.splice.apply(this,
            [0, 0].concat(Array.prototype.slice.apply(arguments)));
        return this.length;
    });
}
if (!isFunction(Function.call)) {
	Function.method('call', function () {
		var o = arguments[0], s = [];
		
		for (var i=1, len=arguments.length; i<len; i++) {
			s.push("arguments["+i+"]");
		}
		
		o.__method = this;
		r = eval("o.__method("+s.join(",")+")");
		o.__method = null;
		return r;
	});
}
if(!isFunction(Array.copy)) {
	Array.method('copy', function () { return [].concat(this); });
}
if(!isFunction(Array.shuffle)) {
	Array.method('shuffle', function () {
		for(var i = this.length, n, x; 
		i; 
		n = parseInt( Math.random() * i, 0 ), /*create random whole number in array range, parseInt is about twice as fast as Math.floor*/
		x = this[--i], /*save current object and deincrement*/ 
		this[i] = this[n], /*make current object equal to the object at our random index*/ 
		this[n] = x) {} /*make random object equal to current saved object*/
		
		return this.copy(); //return a copy
	});
}
/*////////////////////////////////////////////////////////////////	
@author btapley
$Id: //depot/projects/dylan/releases/rc_12_4/docroot/lib/com.adobe/adobe.js#1 $

Class: adobe

Properties:
srcPath - string

////////////////////////////////////////////////////////////////*/
var adobe = (function() {
	var _scriptsSoFar,
	_libraryPath;
	
	var singl3ton = function() {
		_libraryPath = this.getMyPath();
		this.srcPath = _libraryPath;
	};
	singl3ton.prototype = {
/*////////////////////////////////////////////////////////////////	

Method: getMyPath

Returned Value:
The uri of this file

////////////////////////////////////////////////////////////////*/
		getMyPath: function() {
			var myPath = (_scriptsSoFar = document.getElementsByTagName("script"))[_scriptsSoFar.length - 1].getAttribute("src");
			
			
			return myPath.slice(0, myPath.lastIndexOf("/") + 1); 
		},
/*////////////////////////////////////////////////////////////////	

Method: setLibraryPath

Function: 
Specify the root path for dynamically loaded assets

Usage:
>	adobe.setLibraryPath("outside.app.com/lib/");
>	adobe.setLibraryPath(adobe.getMyPath() + "../../lib/");

Parameters:
myPath - String

Returned Value:
None

See also:
<Loader>

////////////////////////////////////////////////////////////////*/
		setLibraryPath: function(myPath) {
			 _libraryPath = myPath || this.getMyPath();
			 this.srcPath = _libraryPath; // backward compatible public property
		},
/*////////////////////////////////////////////////////////////////	

Method: getLibraryPath

Function: 
Get the root path for dynamically loaded assets

Returned Value:
String

////////////////////////////////////////////////////////////////*/
		getLibraryPath: function(myPath) {
			 return _libraryPath;
		},
/*////////////////////////////////////////////////////////////////	

Method: doJsCompress

Function: 
Append ".compressed" to end of all dynamically loaded assets

Returned Value:
None

////////////////////////////////////////////////////////////////*/
		doJsCompress: function() {
			this.jscompress = 1;
			this.jscompress_path="compressed";
		}
	};
	
	return new singl3ton();
	
})();
/*////////////////////////////////////////////////////////////////	
@author btapley
@author mhurdka

$Id: //depot/projects/dylan/releases/rc_12_4/docroot/lib/com.adobe/hostEnv.js#1 $

Method: hostEnv

Function: 
Simple host profile. Be warned, I've tried to avoid user-agent detection as much as possible but there is some here.

Properties:
name - hostname
isSecure - boolean for https protocal
appN - application name
appV - application version number
ua - user-agent id as string
plt - platform id as string
lang - browser langauge
hasActiveX - boolean for ActiveX support
ieV - like appV but more general eg. 5, 5.5, 6, 7
isSafari - boolean for apple web kit
kitV - webkit version number

////////////////////////////////////////////////////////////////*/

/*@cc_on; @*/
adobe.hostEnv = (function() {
	var ua = new String(navigator.userAgent.toLowerCase()), //using new to speed up the many method calls below
		appV = parseInt(navigator.appVersion, 0),
		isSafari = ua.indexOf('safari') != -1,
		kitV = 0;
		
	if(isSafari) {
		var wk = 'applewebkit/',
			kitpos = ua.indexOf(wk);
		
		if(kitpos > -1) {
			var kit = ua.substring(kitpos+wk.length);
			kit = kit.substring(0,kit.indexOf(" "));
			kitV = parseInt(kit, 0);
		}
	}

	if(ua.indexOf('opera/7') != -1 || ua.indexOf('opera 7') != -1) { appV = 7; }
	var ie6 = (ua.indexOf("6.0") > -1) ? true : false;
	
	var env = {
		"name":		window.location.hostname,
		"isSecure":	window.location.protocal == "https:",
		"appN":		navigator.appName.toLowerCase(),
		"appV":		appV,
		"ua":		ua, 
		"plt":		navigator.platform.toLowerCase(),
		"lang":		(navigator.language || navigator.userLanguage).substring(0,2),
		"ax":		typeof window.ActiveXObject != "undefined",
		"ie6":		ie6,
		"ieV":		(function() {
				/*@
					@if (@_jscript_version >= 5 && @_jscript_version < 5.5) { return 5; } @end;
					@if (@_jscript_version >= 5.5 && @_jscript_version < 5.6) { return 5.5; } @end;
					@if (@_jscript_version >= 5.6 && @_jscript_version < 5.7) { return 6; } @end;
					@if (@_jscript_version >= 5.7 && @_jscript_version < 5.8) { return 7; } @end;
				@*/
					return 0;
				})(),
		"isSafari": isSafari,
		"kitV":		kitV
	};
	
	return env;
})();
/*  Prototype JavaScript framework, version 1.6.0.2
 *  (c) 2005-2008 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {
  Version: '1.6.0.2',

  Browser: {
    IE:     !!(window.attachEvent && !window.opera),
    Opera:  !!window.opera,
    WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
  },

  BrowserFeatures: {
    XPath: !!document.evaluate,
    ElementExtensions: !!window.HTMLElement,
    SpecificElementExtensions:
      document.createElement('div').__proto__ &&
      document.createElement('div').__proto__ !==
        document.createElement('form').__proto__
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },
  K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;


/* Based on Alex Arnell's inheritance implementation. */
var Class = {
  create: function() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      var subclass = function() { };
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0; i < properties.length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;

    return klass;
  }
};

Class.Methods = {
  addMethods: function(source) {
    var ancestor   = this.superclass && this.superclass.prototype;
    var properties = Object.keys(source);

    if (!Object.keys({ toString: true }).length)
      properties.push("toString", "valueOf");

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames().first() == "$super") {
        var method = value, value = Object.extend((function(m) {
          return function() { return ancestor[m].apply(this, arguments) };
        })(property).wrap(method), {
          valueOf:  function() { return method },
          toString: function() { return method.toString() }
        });
      }
      this.prototype[property] = value;
    }

    return this;
  }
};

var Abstract = { };

Object.extend = function(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};

Object.extend(Object, {
  inspect: function(object) {
    try {
      if (Object.isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  },

  toJSON: function(object) {
    var type = typeof object;
    switch (type) {
      case 'undefined':
      case 'function':
      case 'unknown': return;
      case 'boolean': return object.toString();
    }

    if (object === null) return 'null';
    if (object.toJSON) return object.toJSON();
    if (Object.isElement(object)) return;

    var results = [];
    for (var property in object) {
      var value = Object.toJSON(object[property]);
      if (!Object.isUndefined(value))
        results.push(property.toJSON() + ': ' + value);
    }

    return '{' + results.join(', ') + '}';
  },

  toQueryString: function(object) {
    return $H(object).toQueryString();
  },

  toHTML: function(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  },

  keys: function(object) {
    var keys = [];
    for (var property in object)
      keys.push(property);
    return keys;
  },

  values: function(object) {
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
  },

  clone: function(object) {
    return Object.extend({ }, object);
  },

  isElement: function(object) {
    return object && object.nodeType == 1;
  },

  isArray: function(object) {
    return object != null && typeof object == "object" &&
      'splice' in object && 'join' in object;
  },

  isHash: function(object) {
    return object instanceof Hash;
  },

  isFunction: function(object) {
    return typeof object == "function";
  },

  isString: function(object) {
    return typeof object == "string";
  },

  isNumber: function(object) {
    return typeof object == "number";
  },

  isUndefined: function(object) {
    return typeof object == "undefined";
  }
});

Object.extend(Function.prototype, {
  argumentNames: function() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\((.*?)\)/)[1].split(",").invoke("strip");
    return names.length == 1 && !names[0] ? [] : names;
  },

  bind: function() {
    if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
    var __method = this, args = $A(arguments), object = args.shift();
    return function() {
      return __method.apply(object, args.concat($A(arguments)));
    }
  },

  bindAsEventListener: function() {
    var __method = this, args = $A(arguments), object = args.shift();
    return function(event) {
      return __method.apply(object, [event || window.event].concat(args));
    }
  },

  curry: function() {
    if (!arguments.length) return this;
    var __method = this, args = $A(arguments);
    return function() {
      return __method.apply(this, args.concat($A(arguments)));
    }
  },

  delay: function() {
    var __method = this, args = $A(arguments), timeout = args.shift() * 1000;
    return window.setTimeout(function() {
      return __method.apply(__method, args);
    }, timeout);
  },

  wrap: function(wrapper) {
    var __method = this;
    return function() {
      return wrapper.apply(this, [__method.bind(this)].concat($A(arguments)));
    }
  },

  methodize: function() {
    if (this._methodized) return this._methodized;
    var __method = this;
    return this._methodized = function() {
      return __method.apply(null, [this].concat($A(arguments)));
    };
  }
});

if(Object.isUndefined(Function.prototype.defer)) Function.prototype.defer = Function.prototype.delay.curry(0.01);

Date.prototype.toJSON = function() {
  return '"' + this.getUTCFullYear() + '-' +
    (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
    this.getUTCDate().toPaddedString(2) + 'T' +
    this.getUTCHours().toPaddedString(2) + ':' +
    this.getUTCMinutes().toPaddedString(2) + ':' +
    this.getUTCSeconds().toPaddedString(2) + 'Z"';
};

var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

/*--------------------------------------------------------------------------*/

var PeriodicalExecuter = Class.create({
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  execute: function() {
    this.callback(this);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
      } finally {
        this.currentlyExecuting = false;
      }
    }
  }
});
Object.extend(String, {
  interpret: function(value) {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(String.prototype, {
  gsub: function(pattern, replacement) {
    var result = '', source = this, match;
    replacement = arguments.callee.prepareReplacement(replacement);

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  },

  sub: function(pattern, replacement, count) {
    replacement = this.gsub.prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  },

  scan: function(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this);
  },

  truncate: function(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
  },

  strip: function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  },

  stripTags: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },

  stripScripts: function() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  },

  extractScripts: function() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  },

  evalScripts: function() {
    return this.extractScripts().map(function(script) { return eval(script) });
  },

  escapeHTML: function() {
    var self = arguments.callee;
    self.text.data = this;
    return self.div.innerHTML;
  },

  unescapeHTML: function() {
    var div = new Element('div');
    div.innerHTML = this.stripTags();
    return div.childNodes[0] ? (div.childNodes.length > 1 ?
      $A(div.childNodes).inject('', function(memo, node) { return memo+node.nodeValue }) :
      div.childNodes[0].nodeValue) : '';
  },

  toQueryParams: function(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return { };

    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift());
        var value = pair.length > 1 ? pair.join('=') : pair[0];
        if (value != undefined) value = decodeURIComponent(value);

        if (key in hash) {
          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        }
        else hash[key] = value;
      }
      return hash;
    });
  },

  toArray: function() {
    return this.split('');
  },

  succ: function() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  },

  times: function(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
  },

  camelize: function() {
    var parts = this.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = this.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
  },

  capitalize: function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  },

  underscore: function() {
    return this.gsub(/::/, '/').gsub(/([A-Z]+)([A-Z][a-z])/,'#{1}_#{2}').gsub(/([a-z\d])([A-Z])/,'#{1}_#{2}').gsub(/-/,'_').toLowerCase();
  },

  dasherize: function() {
    return this.gsub(/_/,'-');
  },

  inspect: function(useDoubleQuotes) {
    var escapedString = this.gsub(/[\x00-\x1f\\]/, function(match) {
      var character = String.specialChar[match[0]];
      return character ? character : '\\u00' + match[0].charCodeAt().toPaddedString(2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  },

  toJSON: function() {
    return this.inspect(true);
  },

  unfilterJSON: function(filter) {
    return this.sub(filter || Prototype.JSONFilter, '#{1}');
  },

  isJSON: function() {
    var str = this;
    if (str.blank()) return false;
    str = this.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
    return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
  },

  evalJSON: function(sanitize) {
    var json = this.unfilterJSON();
    try {
      if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) { }
    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
  },

  include: function(pattern) {
    return this.indexOf(pattern) > -1;
  },

  startsWith: function(pattern) {
    return this.indexOf(pattern) === 0;
  },

  endsWith: function(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
  },

  empty: function() {
    return this == '';
  },

  blank: function() {
    return /^\s*$/.test(this);
  },

  interpolate: function(object, pattern) {
    return new Template(this, pattern).evaluate(object);
  }
});

if (Prototype.Browser.WebKit || Prototype.Browser.IE) Object.extend(String.prototype, {
  escapeHTML: function() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },
  unescapeHTML: function() {
    return this.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
  }
});

String.prototype.gsub.prepareReplacement = function(replacement) {
  if (Object.isFunction(replacement)) return replacement;
  var template = new Template(replacement);
  return function(match) { return template.evaluate(match) };
};

String.prototype.parseQuery = String.prototype.toQueryParams;

Object.extend(String.prototype.escapeHTML, {
  div:  document.createElement('div'),
  text: document.createTextNode('')
});

with (String.prototype.escapeHTML) div.appendChild(text);

var Template = Class.create({
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    if (Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, function(match) {
      if (object == null) return '';

      var before = match[1] || '';
      if (before == '\\') return match[2];

      var ctx = object, expr = match[3];
      var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].gsub('\\\\]', ']') : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = {
  each: function(iterator, context) {
    var index = 0;
    iterator = iterator.bind(context);
    try {
      this._each(function(value) {
        iterator(value, index++);
      });
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  },

  eachSlice: function(number, iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var index = -number, slices = [], array = this.toArray();
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.collect(iterator, context);
  },

  all: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator(value, index);
      if (!result) throw $break;
    });
    return result;
  },

  any: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator(value, index))
        throw $break;
    });
    return result;
  },

  collect: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var results = [];
    this.each(function(value, index) {
      results.push(iterator(value, index));
    });
    return results;
  },

  detect: function(iterator, context) {
    iterator = iterator.bind(context);
    var result;
    this.each(function(value, index) {
      if (iterator(value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  },

  findAll: function(iterator, context) {
    iterator = iterator.bind(context);
    var results = [];
    this.each(function(value, index) {
      if (iterator(value, index))
        results.push(value);
    });
    return results;
  },

  grep: function(filter, iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var results = [];

    if (Object.isString(filter))
      filter = new RegExp(filter);

    this.each(function(value, index) {
      if (filter.match(value))
        results.push(iterator(value, index));
    });
    return results;
  },

  include: function(object) {
    if (Object.isFunction(this.indexOf))
      if (this.indexOf(object) != -1) return true;

    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  },

  inGroupsOf: function(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  },

  inject: function(memo, iterator, context) {
    iterator = iterator.bind(context);
    this.each(function(value, index) {
      memo = iterator(memo, value, index);
    });
    return memo;
  },

  invoke: function(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  },

  max: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator(value, index);
      if (result == null || value >= result)
        result = value;
    });
    return result;
  },

  min: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator(value, index);
      if (result == null || value < result)
        result = value;
    });
    return result;
  },

  partition: function(iterator, context) {
    iterator = iterator ? iterator.bind(context) : Prototype.K;
    var trues = [], falses = [];
    this.each(function(value, index) {
      (iterator(value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  },

  pluck: function(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
  },

  reject: function(iterator, context) {
    iterator = iterator.bind(context);
    var results = [];
    this.each(function(value, index) {
      if (!iterator(value, index))
        results.push(value);
    });
    return results;
  },

  sortBy: function(iterator, context) {
    iterator = iterator.bind(context);
    return this.map(function(value, index) {
      return {value: value, criteria: iterator(value, index)};
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  },

  toArray: function() {
    return this.map();
  },

  zip: function() {
    var iterator = Prototype.K, args = $A(arguments);
    if (Object.isFunction(args.last()))
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  },

  size: function() {
    return this.toArray().length;
  },

  inspect: function() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }
};

Object.extend(Enumerable, {
  map:     Enumerable.collect,
  find:    Enumerable.detect,
  select:  Enumerable.findAll,
  filter:  Enumerable.findAll,
  member:  Enumerable.include,
  entries: Enumerable.toArray,
  every:   Enumerable.all,
  some:    Enumerable.any
});
function $A(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}

if (Prototype.Browser.WebKit) {
  $A = function(iterable) {
    if (!iterable) return [];
    if (!(Object.isFunction(iterable) && iterable == '[object NodeList]') &&
        iterable.toArray) return iterable.toArray();
    var length = iterable.length || 0, results = new Array(length);
    while (length--) results[length] = iterable[length];
    return results;
  };
}

Array.from = $A;

Object.extend(Array.prototype, Enumerable);

if (!Array.prototype._reverse) Array.prototype._reverse = Array.prototype.reverse;

Object.extend(Array.prototype, {
  _each: function(iterator) {
    for (var i = 0, length = this.length; i < length; i++)
      iterator(this[i]);
  },

  clear: function() {
    this.length = 0;
    return this;
  },

  first: function() {
    return this[0];
  },

  last: function() {
    return this[this.length - 1];
  },

  compact: function() {
    return this.select(function(value) {
      return value != null;
    });
  },

  flatten: function() {
    return this.inject([], function(array, value) {
      return array.concat(Object.isArray(value) ?
        value.flatten() : [value]);
    });
  },

  without: function() {
    var values = $A(arguments);
    return this.select(function(value) {
      return !values.include(value);
    });
  },

  reverse: function(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  },

  reduce: function() {
    return this.length > 1 ? this : this[0];
  },

  uniq: function(sorted) {
    return this.inject([], function(array, value, index) {
      if (0 == index || (sorted ? array.last() != value : !array.include(value)))
        array.push(value);
      return array;
    });
  },

  intersect: function(array) {
    return this.uniq().findAll(function(item) {
      return array.detect(function(value) { return item === value });
    });
  },

  clone: function() {
    return [].concat(this);
  },

  size: function() {
    return this.length;
  },

  inspect: function() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  },

  toJSON: function() {
    var results = [];
    this.each(function(object) {
      var value = Object.toJSON(object);
      if (!Object.isUndefined(value)) results.push(value);
    });
    return '[' + results.join(', ') + ']';
  }
});

// use native browser JS 1.6 implementation if available
if (Object.isFunction(Array.prototype.forEach))
  Array.prototype._each = Array.prototype.forEach;

if (!Array.prototype.indexOf) Array.prototype.indexOf = function(item, i) {
  i || (i = 0);
  var length = this.length;
  if (i < 0) i = length + i;
  for (; i < length; i++)
    if (this[i] === item) return i;
  return -1;
};

if (!Array.prototype.lastIndexOf) Array.prototype.lastIndexOf = function(item, i) {
  i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
  var n = this.slice(0, i).reverse().indexOf(item);
  return (n < 0) ? n : i - n - 1;
};

Array.prototype.toArray = Array.prototype.clone;

function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

if (Prototype.Browser.Opera){
  Array.prototype.concat = function() {
    var array = [];
    for (var i = 0, length = this.length; i < length; i++) array.push(this[i]);
    for (var i = 0, length = arguments.length; i < length; i++) {
      if (Object.isArray(arguments[i])) {
        for (var j = 0, arrayLength = arguments[i].length; j < arrayLength; j++)
          array.push(arguments[i][j]);
      } else {
        array.push(arguments[i]);
      }
    }
    return array;
  };
}
Object.extend(Number.prototype, {
  toColorPart: function() {
    return this.toPaddedString(2, 16);
  },

  succ: function() {
    return this + 1;
  },

  times: function(iterator) {
    $R(0, this, true).each(iterator);
    return this;
  },

  toPaddedString: function(length, radix) {
    var string = this.toString(radix || 10);
    return '0'.times(length - string.length) + string;
  },

  toJSON: function() {
    return isFinite(this) ? this.toString() : 'null';
  }
});

$w('abs round ceil floor').each(function(method){
  Number.prototype[method] = Math[method].methodize();
});
function $H(object) {
  return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {

  function toQueryPair(key, value) {
    if (Object.isUndefined(value)) return key;
    return key + '=' + encodeURIComponent(String.interpret(value));
  }

  return {
    initialize: function(object) {
      this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
    },

    _each: function(iterator) {
      for (var key in this._object) {
        var value = this._object[key], pair = [key, value];
        pair.key = key;
        pair.value = value;
        iterator(pair);
      }
    },

    set: function(key, value) {
      return this._object[key] = value;
    },

    get: function(key) {
      return this._object[key];
    },

    unset: function(key) {
      var value = this._object[key];
      delete this._object[key];
      return value;
    },

    toObject: function() {
      return Object.clone(this._object);
    },

    keys: function() {
      return this.pluck('key');
    },

    values: function() {
      return this.pluck('value');
    },

    index: function(value) {
      var match = this.detect(function(pair) {
        return pair.value === value;
      });
      return match && match.key;
    },

    merge: function(object) {
      return this.clone().update(object);
    },

    update: function(object) {
      return new Hash(object).inject(this, function(result, pair) {
        result.set(pair.key, pair.value);
        return result;
      });
    },

    toQueryString: function() {
      return this.map(function(pair) {
        var key = encodeURIComponent(pair.key), values = pair.value;

        if (values && typeof values == 'object') {
          if (Object.isArray(values))
            return values.map(toQueryPair.curry(key)).join('&');
        }
        return toQueryPair(key, values);
      }).join('&');
    },

    inspect: function() {
      return '#<Hash:{' + this.map(function(pair) {
        return pair.map(Object.inspect).join(': ');
      }).join(', ') + '}>';
    },

    toJSON: function() {
      return Object.toJSON(this.toObject());
    },

    clone: function() {
      return new Hash(this);
    }
  }
})());

Hash.prototype.toTemplateReplacements = Hash.prototype.toObject;
Hash.from = $H;
var ObjectRange = Class.create(Enumerable, {
  initialize: function(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  },

  _each: function(iterator) {
    var value = this.start;
    while (this.include(value)) {
      iterator(value);
      value = value.succ();
    }
  },

  include: function(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }
});

var $R = function(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
};

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});

Ajax.Base = Class.create({
  initialize: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    Object.extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (Object.isString(this.options.parameters))
      this.options.parameters = this.options.parameters.toQueryParams();
    else if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});

Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.clone(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      // simulate other verbs over post
      params['_method'] = this.method;
      this.method = 'post';
    }

    this.parameters = params;

    if (params = Object.toQueryString(params)) {
      // when GET, append parameters to URL
      if (this.method == 'get')
        this.url += (this.url.include('?') ? '&' : '?') + params;
      else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent))
        params += '&_=';
    }

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    // user-defined headers
    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300);
  },

  getStatus: function() {
    try {
      return this.transport.status || 0;
    } catch (e) { return 0 }
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      // avoid memory leak in MSIE: clean up
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null }
  },

  evalResponse: function() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

Ajax.Response = Class.create({
  initialize: function(request){
    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    if((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON   = this._getHeaderJSON();
    }

    if(readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status:      0,
  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  },

  getResponseHeader: function(name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;
    json = decodeURIComponent(escape(json));
    try {
      return json.evalJSON(this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(this.getHeader('Content-type') || '').include('application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return this.responseText.evalJSON(options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = Object.clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});
function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (Object.isString(element))
    element = document.getElementById(element);
  return Element.extend(element);
}

if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, $(parentElement) || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(Element.extend(query.snapshotItem(i)));
    return results;
  };
}

/*--------------------------------------------------------------------------*/

if (!window.Node) var Node = { };

if (!Node.ELEMENT_NODE) {
  // DOM level 2 ECMAScript Language Binding
  Object.extend(Node, {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  });
}

(function() {
  var element = this.Element;
  this.Element = function(tagName, attributes) {
    attributes = attributes || { };
    tagName = tagName.toLowerCase();
    var cache = Element.cache;
    if (Prototype.Browser.IE && attributes.name) {
      tagName = '<' + tagName + ' name="' + attributes.name + '">';
      delete attributes.name;
      return Element.writeAttribute(document.createElement(tagName), attributes);
    }
    if (!cache[tagName]) cache[tagName] = Element.extend(document.createElement(tagName));
    return Element.writeAttribute(cache[tagName].cloneNode(false), attributes);
  };
  Object.extend(this.Element, element || { });
}).call(window);

Element.cache = { };

Element.Methods = {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function(element) {
    element = $(element);
    Element[Element.visible(element) ? 'hide' : 'show'](element);
    return element;
  },

  hide: function(element) {
    $(element).style.display = 'none';
    return element;
  },

  show: function(element) {
    $(element).style.display = '';
    return element;
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  },

  update: function(element, content) {
    element = $(element);
    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) return element.update().insert(content);
    content = Object.toHTML(content);
    element.innerHTML = content.stripScripts();
    content.evalScripts.bind(content).defer();
    return element;
  },

  replace: function(element, content) {
    element = $(element);
    if (content && content.toElement) content = content.toElement();
    else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }
    element.parentNode.replaceChild(content, element);
    return element;
  },

  insert: function(element, insertions) {
    element = $(element);

    if (Object.isString(insertions) || Object.isNumber(insertions) ||
        Object.isElement(insertions) || (insertions && (insertions.toElement || insertions.toHTML)))
          insertions = {bottom:insertions};

    var content, insert, tagName, childNodes;

    for (var position in insertions) {
      content  = insertions[position];
      position = position.toLowerCase();
      insert = Element._insertionTranslations[position];

      if (content && content.toElement) content = content.toElement();
      if (Object.isElement(content)) {
        insert(element, content);
        continue;
      }

      content = Object.toHTML(content);

      tagName = ((position == 'before' || position == 'after')
        ? element.parentNode : element).tagName.toUpperCase();

      childNodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts());

      if (position == 'top' || position == 'after') childNodes.reverse();
      childNodes.each(insert.curry(element));

      content.evalScripts.bind(content).defer();
    }

    return element;
  },

  wrap: function(element, wrapper, attributes) {
    element = $(element);
    if (Object.isElement(wrapper))
      $(wrapper).writeAttribute(attributes || { });
    else if (Object.isString(wrapper)) wrapper = new Element(wrapper, attributes);
    else wrapper = new Element('div', wrapper);
    if (element.parentNode)
      element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
    return wrapper;
  },

  inspect: function(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();
    $H({'id': 'id', 'className': 'class'}).each(function(pair) {
      var property = pair.first(), attribute = pair.last();
      var value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    });
    return result + '>';
  },

  recursivelyCollect: function(element, property) {
    element = $(element);
    var elements = [];
    while (element = element[property])
      if (element.nodeType == 1)
        elements.push(Element.extend(element));
    return elements;
  },

  ancestors: function(element) {
    return $(element).recursivelyCollect('parentNode');
  },

  descendants: function(element) {
    return $(element).select("*");
  },

  firstDescendant: function(element) {
    element = $(element).firstChild;
    while (element && element.nodeType != 1) element = element.nextSibling;
    return $(element);
  },

  immediateDescendants: function(element) {
    if (!(element = $(element).firstChild)) return [];
    while (element && element.nodeType != 1) element = element.nextSibling;
    if (element) return [element].concat($(element).nextSiblings());
    return [];
  },

  previousSiblings: function(element) {
    return $(element).recursivelyCollect('previousSibling');
  },

  nextSiblings: function(element) {
    return $(element).recursivelyCollect('nextSibling');
  },

  siblings: function(element) {
    element = $(element);
    return element.previousSiblings().reverse().concat(element.nextSiblings());
  },

  match: function(element, selector) {
    if (Object.isString(selector))
      selector = new Selector(selector);
    return selector.match($(element));
  },

  up: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(element.parentNode);
    var ancestors = element.ancestors();
    return Object.isNumber(expression) ? ancestors[expression] :
      Selector.findElement(ancestors, expression, index);
  },

  down: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return element.firstDescendant();
    return Object.isNumber(expression) ? element.descendants()[expression] :
      element.select(expression)[index || 0];
  },

  previous: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.previousElementSibling(element));
    var previousSiblings = element.previousSiblings();
    return Object.isNumber(expression) ? previousSiblings[expression] :
      Selector.findElement(previousSiblings, expression, index);
  },

  next: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.nextElementSibling(element));
    var nextSiblings = element.nextSiblings();
    return Object.isNumber(expression) ? nextSiblings[expression] :
      Selector.findElement(nextSiblings, expression, index);
  },

  select: function() {
    var args = $A(arguments), element = $(args.shift());
    return Selector.findChildElements(element, args);
  },

  adjacent: function() {
    var args = $A(arguments), element = $(args.shift());
    return Selector.findChildElements(element.parentNode, args).without(element);
  },

  identify: function(element) {
    element = $(element);
    var id = element.readAttribute('id'), self = arguments.callee;
    if (id) return id;
    do { id = 'anonymous_element_' + self.counter++ } while ($(id));
    element.writeAttribute('id', id);
    return id;
  },

  readAttribute: function(element, name) {
    element = $(element);
    if (Prototype.Browser.IE) {
      var t = Element._attributeTranslations.read;
      if (t.values[name]) return t.values[name](element, name);
      if (t.names[name]) name = t.names[name];
      if (name.include(':')) {
        return (!element.attributes || !element.attributes[name]) ? null :
         element.attributes[name].value;
      }
    }
    return element.getAttribute(name);
  },

  writeAttribute: function(element, name, value) {
    element = $(element);
    var attributes = { }, t = Element._attributeTranslations.write;

    if (typeof name == 'object') attributes = name;
    else attributes[name] = Object.isUndefined(value) ? true : value;

    for (var attr in attributes) {
      name = t.names[attr] || attr;
      value = attributes[attr];
      if (t.values[attr]) name = t.values[attr](element, value);
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }
    return element;
  },

  getHeight: function(element) {
    return $(element).getDimensions().height;
  },

  getWidth: function(element) {
    return $(element).getDimensions().width;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className ||
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    if (!element.hasClassName(className))
      element.className += (element.className ? ' ' : '') + className;
    return element;
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    element.className = element.className.replace(
      new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').strip();
    return element;
  },

  toggleClassName: function(element, className) {
    if (!(element = $(element))) return;
    return element[element.hasClassName(className) ?
      'removeClassName' : 'addClassName'](className);
  },

  // removes whitespace-only text node children
  cleanWhitespace: function(element) {
    element = $(element);
    var node = element.firstChild;
    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  },

  empty: function(element) {
    return $(element).innerHTML.blank();
  },

  descendantOf: function(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    var originalAncestor = ancestor;

    if (element.compareDocumentPosition)
      return (element.compareDocumentPosition(ancestor) & 8) === 8;

    if (element.sourceIndex && !Prototype.Browser.Opera) {
      var e = element.sourceIndex, a = ancestor.sourceIndex,
       nextAncestor = ancestor.nextSibling;
      if (!nextAncestor) {
        do { ancestor = ancestor.parentNode; }
        while (!(nextAncestor = ancestor.nextSibling) && ancestor.parentNode);
      }
      if (nextAncestor && nextAncestor.sourceIndex)
       return (e > a && e < nextAncestor.sourceIndex);
    }

    while (element = element.parentNode)
      if (element == originalAncestor) return true;
    return false;
  },

  scrollTo: function(element) {
    element = $(element);
    var pos = element.cumulativeOffset();
    window.scrollTo(pos[0], pos[1]);
    return element;
  },

  getStyle: function(element, style) {
    element = $(element);
    style = style == 'float' ? 'cssFloat' : style.camelize();
    var value = element.style[style];
    if (!value) {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }
    if (style == 'opacity') return value ? parseFloat(value) : 1.0;
    return value == 'auto' ? null : value;
  },

  getOpacity: function(element) {
    return $(element).getStyle('opacity');
  },

  setStyle: function(element, styles) {
    element = $(element);
    var elementStyle = element.style, match;
    if (Object.isString(styles)) {
      element.style.cssText += ';' + styles;
      return styles.include('opacity') ?
        element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
    }
    for (var property in styles)
      if (property == 'opacity') element.setOpacity(styles[property]);
      else
        elementStyle[(property == 'float' || property == 'cssFloat') ?
          (Object.isUndefined(elementStyle.styleFloat) ? 'cssFloat' : 'styleFloat') :
            property] = styles[property];

    return element;
  },

  setOpacity: function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;
    return element;
  },

  getDimensions: function(element) {
    element = $(element);
    var display = $(element).getStyle('display');
    if (display != 'none' && display != null) // Safari bug
      return {width: element.offsetWidth, height: element.offsetHeight};

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    var originalDisplay = els.display;
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = 'block';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = originalDisplay;
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      // Opera returns the offset relative to the positioning context, when an
      // element is position relative but top and left have not been defined
      if (window.opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
    return element;
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
    return element;
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return element;
    element._overflow = Element.getStyle(element, 'overflow') || 'auto';
    if (element._overflow !== 'hidden')
      element.style.overflow = 'hidden';
    return element;
  },

  undoClipping: function(element) {
    element = $(element);
    if (!element._overflow) return element;
    element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
    element._overflow = null;
    return element;
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (element.tagName == 'BODY') break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  absolutize: function(element) {
    element = $(element);
    if (element.getStyle('position') == 'absolute') return;
    // Position.prepare(); // To be done manually by Scripty when it needs it.

    var offsets = element.positionedOffset();
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.width  = width + 'px';
    element.style.height = height + 'px';
    return element;
  },

  relativize: function(element) {
    element = $(element);
    if (element.getStyle('position') == 'relative') return;
    // Position.prepare(); // To be done manually by Scripty when it needs it.

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
    return element;
  },

  cumulativeScrollOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  getOffsetParent: function(element) {
    if (element.offsetParent) return $(element.offsetParent);
    if (element == document.body) return $(element);

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return $(element);

    return $(document.body);
  },

  viewportOffset: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      // Safari fix
      if (element.offsetParent == document.body &&
        Element.getStyle(element, 'position') == 'absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (!Prototype.Browser.Opera || element.tagName == 'BODY') {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);

    return Element._returnOffset(valueL, valueT);
  },

  clonePosition: function(element, source) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || { });

    // find page position of source
    source = $(source);
    var p = source.viewportOffset();

    // find coordinate system to use
    element = $(element);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(element, 'position') == 'absolute') {
      parent = element.getOffsetParent();
      delta = parent.viewportOffset();
    }

    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    // set position
    if (options.setLeft)   element.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)    element.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if (options.setWidth)  element.style.width = source.offsetWidth + 'px';
    if (options.setHeight) element.style.height = source.offsetHeight + 'px';
    return element;
  }
};

Element.Methods.identify.counter = 1;

Object.extend(Element.Methods, {
  getElementsBySelector: Element.Methods.select,
  childElements: Element.Methods.immediateDescendants
});

Element._attributeTranslations = {
  write: {
    names: {
      className: 'class',
      htmlFor:   'for'
    },
    values: { }
  }
};

if (Prototype.Browser.Opera) {
  Element.Methods.getStyle = Element.Methods.getStyle.wrap(
    function(proceed, element, style) {
      switch (style) {
        case 'left': case 'top': case 'right': case 'bottom':
          if (proceed(element, 'position') === 'static') return null;
        case 'height': case 'width':
          // returns '0px' for hidden elements; we want it to return null
          if (!Element.visible(element)) return null;

          // returns the border-box dimensions rather than the content-box
          // dimensions, so we subtract padding and borders from the value
          var dim = parseInt(proceed(element, style), 10);

          if (dim !== element['offset' + style.capitalize()])
            return dim + 'px';

          var properties;
          if (style === 'height') {
            properties = ['border-top-width', 'padding-top',
             'padding-bottom', 'border-bottom-width'];
          }
          else {
            properties = ['border-left-width', 'padding-left',
             'padding-right', 'border-right-width'];
          }
          return properties.inject(dim, function(memo, property) {
            var val = proceed(element, property);
            return val === null ? memo : memo - parseInt(val, 10);
          }) + 'px';
        default: return proceed(element, style);
      }
    }
  );

  Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(
    function(proceed, element, attribute) {
      if (attribute === 'title') return element.title;
      return proceed(element, attribute);
    }
  );
}

else if (Prototype.Browser.IE) {
  // IE doesn't report offsets correctly for static elements, so we change them
  // to "relative" to get the values, then change them back.
  Element.Methods.getOffsetParent = Element.Methods.getOffsetParent.wrap(
    function(proceed, element) {
      element = $(element);
      var position = element.getStyle('position');
      if (position !== 'static') return proceed(element);
      element.setStyle({ position: 'relative' });
      var value = proceed(element);
      element.setStyle({ position: position });
      return value;
    }
  );

  $w('positionedOffset viewportOffset').each(function(method) {
    Element.Methods[method] = Element.Methods[method].wrap(
      function(proceed, element) {
        element = $(element);
        var position = element.getStyle('position');
        if (position !== 'static') return proceed(element);
        // Trigger hasLayout on the offset parent so that IE6 reports
        // accurate offsetTop and offsetLeft values for position: fixed.
        var offsetParent = element.getOffsetParent();
        if (offsetParent && offsetParent.getStyle('position') === 'fixed')
          offsetParent.setStyle({ zoom: 1 });
        element.setStyle({ position: 'relative' });
        var value = proceed(element);
        element.setStyle({ position: position });
        return value;
      }
    );
  });

  Element.Methods.getStyle = function(element, style) {
    element = $(element);
    style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();
    var value = element.style[style];
    if (!value && element.currentStyle) value = element.currentStyle[style];

    if (style == 'opacity') {
      if (value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
        if (value[1]) return parseFloat(value[1]) / 100;
      return 1.0;
    }

    if (value == 'auto') {
      if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none'))
        return element['offset' + style.capitalize()] + 'px';
      return null;
    }
    return value;
  };

  Element.Methods.setOpacity = function(element, value) {
    function stripAlpha(filter){
      return filter.replace(/alpha\([^\)]*\)/gi,'');
    }
    element = $(element);
    var currentStyle = element.currentStyle;
    if ((currentStyle && !currentStyle.hasLayout) ||
      (!currentStyle && element.style.zoom == 'normal'))
        element.style.zoom = 1;

    var filter = element.getStyle('filter'), style = element.style;
    if (value == 1 || value === '') {
      (filter = stripAlpha(filter)) ?
        style.filter = filter : style.removeAttribute('filter');
      return element;
    } else if (value < 0.00001) value = 0;
    style.filter = stripAlpha(filter) +
      'alpha(opacity=' + (value * 100) + ')';
    return element;
  };

  Element._attributeTranslations = {
    read: {
      names: {
        'class': 'className',
        'for':   'htmlFor'
      },
      values: {
        _getAttr: function(element, attribute) {
          return element.getAttribute(attribute, 2);
        },
        _getAttrNode: function(element, attribute) {
          var node = element.getAttributeNode(attribute);
          return node ? node.value : "";
        },
        _getEv: function(element, attribute) {
          attribute = element.getAttribute(attribute);
          return attribute ? attribute.toString().slice(23, -2) : null;
        },
        _flag: function(element, attribute) {
          return $(element).hasAttribute(attribute) ? attribute : null;
        },
        style: function(element) {
          return element.style.cssText.toLowerCase();
        },
        title: function(element) {
          return element.title;
        }
      }
    }
  };

  Element._attributeTranslations.write = {
    names: Object.extend({
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    }, Element._attributeTranslations.read.names),
    values: {
      checked: function(element, value) {
        element.checked = !!value;
      },

      style: function(element, value) {
        element.style.cssText = value ? value : '';
      }
    }
  };

  Element._attributeTranslations.has = {};

  $w('colSpan rowSpan vAlign dateTime accessKey tabIndex ' +
      'encType maxLength readOnly longDesc').each(function(attr) {
    Element._attributeTranslations.write.names[attr.toLowerCase()] = attr;
    Element._attributeTranslations.has[attr.toLowerCase()] = attr;
  });

  (function(v) {
    Object.extend(v, {
      href:        v._getAttr,
      src:         v._getAttr,
      type:        v._getAttr,
      action:      v._getAttrNode,
      disabled:    v._flag,
      checked:     v._flag,
      readonly:    v._flag,
      multiple:    v._flag,
      onload:      v._getEv,
      onunload:    v._getEv,
      onclick:     v._getEv,
      ondblclick:  v._getEv,
      onmousedown: v._getEv,
      onmouseup:   v._getEv,
      onmouseover: v._getEv,
      onmousemove: v._getEv,
      onmouseout:  v._getEv,
      onfocus:     v._getEv,
      onblur:      v._getEv,
      onkeypress:  v._getEv,
      onkeydown:   v._getEv,
      onkeyup:     v._getEv,
      onsubmit:    v._getEv,
      onreset:     v._getEv,
      onselect:    v._getEv,
      onchange:    v._getEv
    });
  })(Element._attributeTranslations.read.values);
}

else if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1) ? 0.999999 :
      (value === '') ? '' : (value < 0.00001) ? 0 : value;
    return element;
  };
}

else if (Prototype.Browser.WebKit) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;

    if (value == 1)
      if(element.tagName == 'IMG' && element.width) {
        element.width++; element.width--;
      } else try {
        var n = document.createTextNode(' ');
        element.appendChild(n);
        element.removeChild(n);
      } catch (e) { }

    return element;
  };

  // Safari returns margins on body which is incorrect if the child is absolutely
  // positioned.  For performance reasons, redefine Element#cumulativeOffset for
  // KHTML/WebKit only.
  Element.Methods.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return Element._returnOffset(valueL, valueT);
  };
}

if (Prototype.Browser.IE || Prototype.Browser.Opera) {
  // IE and Opera are missing .innerHTML support for TABLE-related and SELECT elements
  Element.Methods.update = function(element, content) {
    element = $(element);

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) return element.update().insert(content);

    content = Object.toHTML(content);
    var tagName = element.tagName.toUpperCase();

    if (tagName in Element._insertionTranslations.tags) {
      $A(element.childNodes).each(function(node) { element.removeChild(node) });
      Element._getContentFromAnonymousElement(tagName, content.stripScripts())
        .each(function(node) { element.appendChild(node) });
    }
    else element.innerHTML = content.stripScripts();

    content.evalScripts.bind(content).defer();
    return element;
  };
}

if ('outerHTML' in document.createElement('div')) {
  Element.Methods.replace = function(element, content) {
    element = $(element);

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

    if (Element._insertionTranslations.tags[tagName]) {
      var nextSibling = element.next();
      var fragments = Element._getContentFromAnonymousElement(tagName, content.stripScripts());
      parent.removeChild(element);
      if (nextSibling)
        fragments.each(function(node) { parent.insertBefore(node, nextSibling) });
      else
        fragments.each(function(node) { parent.appendChild(node) });
    }
    else element.outerHTML = content.stripScripts();

    content.evalScripts.bind(content).defer();
    return element;
  };
}

Element._returnOffset = function(l, t) {
  var result = [l, t];
  result.left = l;
  result.top = t;
  return result;
};

Element._getContentFromAnonymousElement = function(tagName, html) {
  var div = new Element('div'), t = Element._insertionTranslations.tags[tagName];
  if (t) {
    div.innerHTML = t[0] + html + t[1];
    t[2].times(function() { div = div.firstChild });
  } else div.innerHTML = html;
  return $A(div.childNodes);
};

Element._insertionTranslations = {
  before: function(element, node) {
    element.parentNode.insertBefore(node, element);
  },
  top: function(element, node) {
    element.insertBefore(node, element.firstChild);
  },
  bottom: function(element, node) {
    element.appendChild(node);
  },
  after: function(element, node) {
    element.parentNode.insertBefore(node, element.nextSibling);
  },
  tags: {
    TABLE:  ['<table>',                '</table>',                   1],
    TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
    TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
    TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
    SELECT: ['<select>',               '</select>',                  1]
  }
};

(function() {
  Object.extend(this.tags, {
    THEAD: this.tags.TBODY,
    TFOOT: this.tags.TBODY,
    TH:    this.tags.TD
  });
}).call(Element._insertionTranslations);

Element.Methods.Simulated = {
  hasAttribute: function(element, attribute) {
    attribute = Element._attributeTranslations.has[attribute] || attribute;
    var node = $(element).getAttributeNode(attribute);
    return node && node.specified;
  }
};

Element.Methods.ByTag = { };

Object.extend(Element, Element.Methods);

if (!Prototype.BrowserFeatures.ElementExtensions &&
    document.createElement('div').__proto__) {
  window.HTMLElement = { };
  window.HTMLElement.prototype = document.createElement('div').__proto__;
  Prototype.BrowserFeatures.ElementExtensions = true;
}

Element.extend = (function() {
  if (Prototype.BrowserFeatures.SpecificElementExtensions)
    return Prototype.K;

  var Methods = { }, ByTag = Element.Methods.ByTag;

  var extend = Object.extend(function(element) {
    if (!element || element._extendedByPrototype ||
        element.nodeType != 1 || element == window) return element;

    var methods = Object.clone(Methods),
      tagName = element.tagName, property, value;

    // extend methods for specific tags
    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    for (property in methods) {
      value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }

    element._extendedByPrototype = Prototype.emptyFunction;
    return element;

  }, {
    refresh: function() {
      // extend methods for all tags (Safari doesn't need this)
      if (!Prototype.BrowserFeatures.ElementExtensions) {
        Object.extend(Methods, Element.Methods);
        Object.extend(Methods, Element.Methods.Simulated);
      }
    }
  });

  extend.refresh();
  return extend;
})();

Element.hasAttribute = function(element, attribute) {
  if (element.hasAttribute) return element.hasAttribute(attribute);
  return Element.Methods.Simulated.hasAttribute(element, attribute);
};

Element.addMethods = function(methods) {
  var F = Prototype.BrowserFeatures, T = Element.Methods.ByTag;

  if (!methods) {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      "FORM":     Object.clone(Form.Methods),
      "INPUT":    Object.clone(Form.Element.Methods),
      "SELECT":   Object.clone(Form.Element.Methods),
      "TEXTAREA": Object.clone(Form.Element.Methods)
    });
  }

  if (arguments.length == 2) {
    var tagName = methods;
    methods = arguments[1];
  }

  if (!tagName) Object.extend(Element.Methods, methods || { });
  else {
    if (Object.isArray(tagName)) tagName.each(extend);
    else extend(tagName);
  }

  function extend(tagName) {
    tagName = tagName.toUpperCase();
    if (!Element.Methods.ByTag[tagName])
      Element.Methods.ByTag[tagName] = { };
    Object.extend(Element.Methods.ByTag[tagName], methods);
  }

  function copy(methods, destination, onlyIfAbsent) {
    onlyIfAbsent = onlyIfAbsent || false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    var klass;
    var trans = {
      "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
      "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
      "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
      "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "IFrame"
    };
    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName.capitalize() + 'Element';
    if (window[klass]) return window[klass];

    window[klass] = { };
    window[klass].prototype = document.createElement(tagName).__proto__;
    return window[klass];
  }

  if (F.ElementExtensions) {
    copy(Element.Methods, HTMLElement.prototype);
    copy(Element.Methods.Simulated, HTMLElement.prototype, true);
  }

  if (F.SpecificElementExtensions) {
    for (var tag in Element.Methods.ByTag) {
      var klass = findDOMClass(tag);
      if (Object.isUndefined(klass)) continue;
      copy(T[tag], klass.prototype);
    }
  }

  Object.extend(Element, Element.Methods);
  delete Element.ByTag;

  if (Element.extend.refresh) Element.extend.refresh();
  Element.cache = { };
};

document.viewport = {
  getDimensions: function() {
    var dimensions = { };
    var B = Prototype.Browser;
    $w('width height').each(function(d) {
      var D = d.capitalize();
      dimensions[d] = (B.WebKit && !document.evaluate) ? self['inner' + D] :
        (B.Opera) ? document.body['client' + D] : document.documentElement['client' + D];
    });
    return dimensions;
  },

  getWidth: function() {
    return this.getDimensions().width;
  },

  getHeight: function() {
    return this.getDimensions().height;
  },

  getScrollOffsets: function() {
    return Element._returnOffset(
      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
  }
};
/* Portions of the Selector class are derived from Jack Slocum’s DomQuery,
 * part of YUI-Ext version 0.40, distributed under the terms of an MIT-style
 * license.  Please see http://www.yui-ext.com/ for more information. */

var Selector = Class.create({
  initialize: function(expression) {
    this.expression = expression.strip();
    this.compileMatcher();
  },

  shouldUseXPath: function() {
    if (!Prototype.BrowserFeatures.XPath) return false;

    var e = this.expression;

    // Safari 3 chokes on :*-of-type and :empty
    if (Prototype.Browser.WebKit &&
     (e.include("-of-type") || e.include(":empty")))
      return false;

    // XPath can't do namespaced attributes, nor can it read
    // the "checked" property from DOM nodes
    if ((/(\[[\w-]*?:|:checked)/).test(this.expression))
      return false;

    return true;
  },

  compileMatcher: function() {
    if (this.shouldUseXPath())
      return this.compileXPathMatcher();

    var e = this.expression, ps = Selector.patterns, h = Selector.handlers,
        c = Selector.criteria, le, p, m;

    if (Selector._cache[e]) {
      this.matcher = Selector._cache[e];
      return;
    }

    this.matcher = ["this.matcher = function(root) {",
                    "var r = root, h = Selector.handlers, c = false, n;"];

    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i in ps) {
        p = ps[i];
        if (m = e.match(p)) {
          this.matcher.push(Object.isFunction(c[i]) ? c[i](m) :
    	      new Template(c[i]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.matcher.push("return h.unique(n);\n}");
    eval(this.matcher.join('\n'));
    Selector._cache[this.expression] = this.matcher;
  },

  compileXPathMatcher: function() {
    var e = this.expression, ps = Selector.patterns,
        x = Selector.xpath, le, m;

    if (Selector._cache[e]) {
      this.xpath = Selector._cache[e]; return;
    }

    this.matcher = ['.//*'];
    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i in ps) {
        if (m = e.match(ps[i])) {
          this.matcher.push(Object.isFunction(x[i]) ? x[i](m) :
            new Template(x[i]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.xpath = this.matcher.join('');
    Selector._cache[this.expression] = this.xpath;
  },

  findElements: function(root) {
    root = root || document;
    if (this.xpath) return document._getElementsByXPath(this.xpath, root);
    return this.matcher(root);
  },

  match: function(element) {
    this.tokens = [];

    var e = this.expression, ps = Selector.patterns, as = Selector.assertions;
    var le, p, m;

    while (e && le !== e && (/\S/).test(e)) {
      le = e;
      for (var i in ps) {
        p = ps[i];
        if (m = e.match(p)) {
          // use the Selector.assertions methods unless the selector
          // is too complex.
          if (as[i]) {
            this.tokens.push([i, Object.clone(m)]);
            e = e.replace(m[0], '');
          } else {
            // reluctantly do a document-wide search
            // and look for a match in the array
            return this.findElements(document).include(element);
          }
        }
      }
    }

    var match = true, name, matches;
    for (var i = 0, token; token = this.tokens[i]; i++) {
      name = token[0], matches = token[1];
      if (!Selector.assertions[name](element, matches)) {
        match = false; break;
      }
    }

    return match;
  },

  toString: function() {
    return this.expression;
  },

  inspect: function() {
    return "#<Selector:" + this.expression.inspect() + ">";
  }
});

Object.extend(Selector, {
  _cache: { },

  xpath: {
    descendant:   "//*",
    child:        "/*",
    adjacent:     "/following-sibling::*[1]",
    laterSibling: '/following-sibling::*',
    tagName:      function(m) {
      if (m[1] == '*') return '';
      return "[local-name()='" + m[1].toLowerCase() +
             "' or local-name()='" + m[1].toUpperCase() + "']";
    },
    className:    "[contains(concat(' ', @class, ' '), ' #{1} ')]",
    id:           "[@id='#{1}']",
    attrPresence: function(m) {
      m[1] = m[1].toLowerCase();
      return new Template("[@#{1}]").evaluate(m);
    },
    attr: function(m) {
      m[1] = m[1].toLowerCase();
      m[3] = m[5] || m[6];
      return new Template(Selector.xpath.operators[m[2]]).evaluate(m);
    },
    pseudo: function(m) {
      var h = Selector.xpath.pseudos[m[1]];
      if (!h) return '';
      if (Object.isFunction(h)) return h(m);
      return new Template(Selector.xpath.pseudos[m[1]]).evaluate(m);
    },
    operators: {
      '=':  "[@#{1}='#{3}']",
      '!=': "[@#{1}!='#{3}']",
      '^=': "[starts-with(@#{1}, '#{3}')]",
      '$=': "[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']",
      '*=': "[contains(@#{1}, '#{3}')]",
      '~=': "[contains(concat(' ', @#{1}, ' '), ' #{3} ')]",
      '|=': "[contains(concat('-', @#{1}, '-'), '-#{3}-')]"
    },
    pseudos: {
      'first-child': '[not(preceding-sibling::*)]',
      'last-child':  '[not(following-sibling::*)]',
      'only-child':  '[not(preceding-sibling::* or following-sibling::*)]',
      'empty':       "[count(*) = 0 and (count(text()) = 0 or translate(text(), ' \t\r\n', '') = '')]",
      'checked':     "[@checked]",
      'disabled':    "[@disabled]",
      'enabled':     "[not(@disabled)]",
      'not': function(m) {
        var e = m[6], p = Selector.patterns,
            x = Selector.xpath, le, v;

        var exclusion = [];
        while (e && le != e && (/\S/).test(e)) {
          le = e;
          for (var i in p) {
            if (m = e.match(p[i])) {
              v = Object.isFunction(x[i]) ? x[i](m) : new Template(x[i]).evaluate(m);
              exclusion.push("(" + v.substring(1, v.length - 1) + ")");
              e = e.replace(m[0], '');
              break;
            }
          }
        }
        return "[not(" + exclusion.join(" and ") + ")]";
      },
      'nth-child':      function(m) {
        return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ", m);
      },
      'nth-last-child': function(m) {
        return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ", m);
      },
      'nth-of-type':    function(m) {
        return Selector.xpath.pseudos.nth("position() ", m);
      },
      'nth-last-of-type': function(m) {
        return Selector.xpath.pseudos.nth("(last() + 1 - position()) ", m);
      },
      'first-of-type':  function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-of-type'](m);
      },
      'last-of-type':   function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-last-of-type'](m);
      },
      'only-of-type':   function(m) {
        var p = Selector.xpath.pseudos; return p['first-of-type'](m) + p['last-of-type'](m);
      },
      nth: function(fragment, m) {
        var mm, formula = m[6], predicate;
        if (formula == 'even') formula = '2n+0';
        if (formula == 'odd')  formula = '2n+1';
        if (mm = formula.match(/^(\d+)$/)) // digit only
          return '[' + fragment + "= " + mm[1] + ']';
        if (mm = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
          if (mm[1] == "-") mm[1] = -1;
          var a = mm[1] ? Number(mm[1]) : 1;
          var b = mm[2] ? Number(mm[2]) : 0;
          predicate = "[((#{fragment} - #{b}) mod #{a} = 0) and " +
          "((#{fragment} - #{b}) div #{a} >= 0)]";
          return new Template(predicate).evaluate({
            fragment: fragment, a: a, b: b });
        }
      }
    }
  },

  criteria: {
    tagName:      'n = h.tagName(n, r, "#{1}", c);      c = false;',
    className:    'n = h.className(n, r, "#{1}", c);    c = false;',
    id:           'n = h.id(n, r, "#{1}", c);           c = false;',
    attrPresence: 'n = h.attrPresence(n, r, "#{1}", c); c = false;',
    attr: function(m) {
      m[3] = (m[5] || m[6]);
      return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}", c); c = false;').evaluate(m);
    },
    pseudo: function(m) {
      if (m[6]) m[6] = m[6].replace(/"/g, '\\"');
      return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(m);
    },
    descendant:   'c = "descendant";',
    child:        'c = "child";',
    adjacent:     'c = "adjacent";',
    laterSibling: 'c = "laterSibling";'
  },

  patterns: {
    // combinators must be listed first
    // (and descendant needs to be last combinator)
    laterSibling: /^\s*~\s*/,
    child:        /^\s*>\s*/,
    adjacent:     /^\s*\+\s*/,
    descendant:   /^\s/,

    // selectors follow
    tagName:      /^\s*(\*|[\w\-]+)(\b|$)?/,
    id:           /^#([\w\-\*]+)(\b|$)/,
    className:    /^\.([\w\-\*]+)(\b|$)/,
    pseudo:
/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/,
    attrPresence: /^\[([\w]+)\]/,
    attr:         /\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/
  },

  // for Selector.match and Element#match
  assertions: {
    tagName: function(element, matches) {
      return matches[1].toUpperCase() == element.tagName.toUpperCase();
    },

    className: function(element, matches) {
      return Element.hasClassName(element, matches[1]);
    },

    id: function(element, matches) {
      return element.id === matches[1];
    },

    attrPresence: function(element, matches) {
      return Element.hasAttribute(element, matches[1]);
    },

    attr: function(element, matches) {
      var nodeValue = Element.readAttribute(element, matches[1]);
      return nodeValue && Selector.operators[matches[2]](nodeValue, matches[5] || matches[6]);
    }
  },

  handlers: {
    // UTILITY FUNCTIONS
    // joins two collections
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        a.push(node);
      return a;
    },

    // marks an array of nodes for counting
    mark: function(nodes) {
      var _true = Prototype.emptyFunction;
      for (var i = 0, node; node = nodes[i]; i++)
        node._countedByPrototype = _true;
      return nodes;
    },

    unmark: function(nodes) {
      for (var i = 0, node; node = nodes[i]; i++)
        node._countedByPrototype = undefined;
      return nodes;
    },

    // mark each child node with its position (for nth calls)
    // "ofType" flag indicates whether we're indexing for nth-of-type
    // rather than nth-child
    index: function(parentNode, reverse, ofType) {
      parentNode._countedByPrototype = Prototype.emptyFunction;
      if (reverse) {
        for (var nodes = parentNode.childNodes, i = nodes.length - 1, j = 1; i >= 0; i--) {
          var node = nodes[i];
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
        }
      } else {
        for (var i = 0, j = 1, nodes = parentNode.childNodes; node = nodes[i]; i++)
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
      }
    },

    // filters out duplicates and extends all nodes
    unique: function(nodes) {
      if (nodes.length == 0) return nodes;
      var results = [], n;
      for (var i = 0, l = nodes.length; i < l; i++)
        if (!(n = nodes[i])._countedByPrototype) {
          n._countedByPrototype = Prototype.emptyFunction;
          results.push(Element.extend(n));
        }
      return Selector.handlers.unmark(results);
    },

    // COMBINATOR FUNCTIONS
    descendant: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, node.getElementsByTagName('*'));
      return results;
    },

    child: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        for (var j = 0, child; child = node.childNodes[j]; j++)
          if (child.nodeType == 1 && child.tagName != '!') results.push(child);
      }
      return results;
    },

    adjacent: function(nodes) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        var next = this.nextElementSibling(node);
        if (next) results.push(next);
      }
      return results;
    },

    laterSibling: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, Element.nextSiblings(node));
      return results;
    },

    nextElementSibling: function(node) {
      while (node = node.nextSibling)
	      if (node.nodeType == 1) return node;
      return null;
    },

    previousElementSibling: function(node) {
      while (node = node.previousSibling)
        if (node.nodeType == 1) return node;
      return null;
    },

    // TOKEN FUNCTIONS
    tagName: function(nodes, root, tagName, combinator) {
      var uTagName = tagName.toUpperCase();
      var results = [], h = Selector.handlers;
      if (nodes) {
        if (combinator) {
          // fastlane for ordinary descendant combinators
          if (combinator == "descendant") {
            for (var i = 0, node; node = nodes[i]; i++)
              h.concat(results, node.getElementsByTagName(tagName));
            return results;
          } else nodes = this[combinator](nodes);
          if (tagName == "*") return nodes;
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.tagName.toUpperCase() === uTagName) results.push(node);
        return results;
      } else return root.getElementsByTagName(tagName);
    },

    id: function(nodes, root, id, combinator) {
      var targetNode = $(id), h = Selector.handlers;
      if (!targetNode) return [];
      if (!nodes && root == document) return [targetNode];
      if (nodes) {
        if (combinator) {
          if (combinator == 'child') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (targetNode.parentNode == node) return [targetNode];
          } else if (combinator == 'descendant') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Element.descendantOf(targetNode, node)) return [targetNode];
          } else if (combinator == 'adjacent') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Selector.handlers.previousElementSibling(targetNode) == node)
                return [targetNode];
          } else nodes = h[combinator](nodes);
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node == targetNode) return [targetNode];
        return [];
      }
      return (targetNode && Element.descendantOf(targetNode, root)) ? [targetNode] : [];
    },

    className: function(nodes, root, className, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      return Selector.handlers.byClassName(nodes, root, className);
    },

    byClassName: function(nodes, root, className) {
      if (!nodes) nodes = Selector.handlers.descendant([root]);
      var needle = ' ' + className + ' ';
      for (var i = 0, results = [], node, nodeClassName; node = nodes[i]; i++) {
        nodeClassName = node.className;
        if (nodeClassName.length == 0) continue;
        if (nodeClassName == className || (' ' + nodeClassName + ' ').include(needle))
          results.push(node);
      }
      return results;
    },

    attrPresence: function(nodes, root, attr, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var results = [];
      for (var i = 0, node; node = nodes[i]; i++)
        if (Element.hasAttribute(node, attr)) results.push(node);
      return results;
    },

    attr: function(nodes, root, attr, value, operator, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var handler = Selector.operators[operator], results = [];
      for (var i = 0, node; node = nodes[i]; i++) {
        var nodeValue = Element.readAttribute(node, attr);
        if (nodeValue === null) continue;
        if (handler(nodeValue, value)) results.push(node);
      }
      return results;
    },

    pseudo: function(nodes, name, value, root, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      if (!nodes) nodes = root.getElementsByTagName("*");
      return Selector.pseudos[name](nodes, value, root);
    }
  },

  pseudos: {
    'first-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.previousElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'last-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.nextElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'only-child': function(nodes, value, root) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!h.previousElementSibling(node) && !h.nextElementSibling(node))
          results.push(node);
      return results;
    },
    'nth-child':        function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root);
    },
    'nth-last-child':   function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true);
    },
    'nth-of-type':      function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, false, true);
    },
    'nth-last-of-type': function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true, true);
    },
    'first-of-type':    function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, false, true);
    },
    'last-of-type':     function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, true, true);
    },
    'only-of-type':     function(nodes, formula, root) {
      var p = Selector.pseudos;
      return p['last-of-type'](p['first-of-type'](nodes, formula, root), formula, root);
    },

    // handles the an+b logic
    getIndices: function(a, b, total) {
      if (a == 0) return b > 0 ? [b] : [];
      return $R(1, total).inject([], function(memo, i) {
        if (0 == (i - b) % a && (i - b) / a >= 0) memo.push(i);
        return memo;
      });
    },

    // handles nth(-last)-child, nth(-last)-of-type, and (first|last)-of-type
    nth: function(nodes, formula, root, reverse, ofType) {
      if (nodes.length == 0) return [];
      if (formula == 'even') formula = '2n+0';
      if (formula == 'odd')  formula = '2n+1';
      var h = Selector.handlers, results = [], indexed = [], m;
      h.mark(nodes);
      for (var i = 0, node; node = nodes[i]; i++) {
        if (!node.parentNode._countedByPrototype) {
          h.index(node.parentNode, reverse, ofType);
          indexed.push(node.parentNode);
        }
      }
      if (formula.match(/^\d+$/)) { // just a number
        formula = Number(formula);
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.nodeIndex == formula) results.push(node);
      } else if (m = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
        if (m[1] == "-") m[1] = -1;
        var a = m[1] ? Number(m[1]) : 1;
        var b = m[2] ? Number(m[2]) : 0;
        var indices = Selector.pseudos.getIndices(a, b, nodes.length);
        for (var i = 0, node, l = indices.length; node = nodes[i]; i++) {
          for (var j = 0; j < l; j++)
            if (node.nodeIndex == indices[j]) results.push(node);
        }
      }
      h.unmark(nodes);
      h.unmark(indexed);
      return results;
    },

    'empty': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        // IE treats comments as element nodes
        if (node.tagName == '!' || (node.firstChild && !node.innerHTML.match(/^\s*$/))) continue;
        results.push(node);
      }
      return results;
    },

    'not': function(nodes, selector, root) {
      var h = Selector.handlers, selectorType, m;
      var exclusions = new Selector(selector).findElements(root);
      h.mark(exclusions);
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node._countedByPrototype) results.push(node);
      h.unmark(exclusions);
      return results;
    },

    'enabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node.disabled) results.push(node);
      return results;
    },

    'disabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.disabled) results.push(node);
      return results;
    },

    'checked': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.checked) results.push(node);
      return results;
    }
  },

  operators: {
    '=':  function(nv, v) { return nv == v; },
    '!=': function(nv, v) { return nv != v; },
    '^=': function(nv, v) { return nv.startsWith(v); },
    '$=': function(nv, v) { return nv.endsWith(v); },
    '*=': function(nv, v) { return nv.include(v); },
    '~=': function(nv, v) { return (' ' + nv + ' ').include(' ' + v + ' '); },
    '|=': function(nv, v) { return ('-' + nv.toUpperCase() + '-').include('-' + v.toUpperCase() + '-'); }
  },

  split: function(expression) {
    var expressions = [];
    expression.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/, function(m) {
      expressions.push(m[1].strip());
    });
    return expressions;
  },

  matchElements: function(elements, expression) {
    var matches = $$(expression), h = Selector.handlers;
    h.mark(matches);
    for (var i = 0, results = [], element; element = elements[i]; i++)
      if (element._countedByPrototype) results.push(element);
    h.unmark(matches);
    return results;
  },

  findElement: function(elements, expression, index) {
    if (Object.isNumber(expression)) {
      index = expression; expression = false;
    }
    return Selector.matchElements(elements, expression || '*')[index || 0];
  },

  findChildElements: function(element, expressions) {
    expressions = Selector.split(expressions.join(','));
    var results = [], h = Selector.handlers;
    for (var i = 0, l = expressions.length, selector; i < l; i++) {
      selector = new Selector(expressions[i].strip());
      h.concat(results, selector.findElements(element));
    }
    return (l > 1) ? h.unique(results) : results;
  }
});

if (Prototype.Browser.IE) {
  Object.extend(Selector.handlers, {
    // IE returns comment nodes on getElementsByTagName("*").
    // Filter them out.
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        if (node.tagName !== "!") a.push(node);
      return a;
    },

    // IE improperly serializes _countedByPrototype in (inner|outer)HTML.
    unmark: function(nodes) {
      for (var i = 0, node; node = nodes[i]; i++)
        node.removeAttribute('_countedByPrototype');
      return nodes;
    }
  });
}

function $$() {
  return Selector.findChildElements(document, $A(arguments));
}
var Form = {
  reset: function(form) {
    $(form).reset();
    return form;
  },

  serializeElements: function(elements, options) {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    var key, value, submitted = false, submit = options.submit;

    var data = elements.inject({ }, function(result, element) {
      if (!element.disabled && element.name) {
        key = element.name; value = $(element).getValue();
        if (value != null && (element.type != 'submit' || (!submitted &&
            submit !== false && (!submit || key == submit) && (submitted = true)))) {
          if (key in result) {
            // a key is already present; construct an array of values
            if (!Object.isArray(result[key])) result[key] = [result[key]];
            result[key].push(value);
          }
          else result[key] = value;
        }
      }
      return result;
    });

    return options.hash ? data : Object.toQueryString(data);
  }
};

Form.Methods = {
  serialize: function(form, options) {
    return Form.serializeElements(Form.getElements(form), options);
  },

  getElements: function(form) {
    return $A($(form).getElementsByTagName('*')).inject([],
      function(elements, child) {
        if (Form.Element.Serializers[child.tagName.toLowerCase()])
          elements.push(Element.extend(child));
        return elements;
      }
    );
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: function(form) {
    var elements = $(form).getElements().findAll(function(element) {
      return 'hidden' != element.type && !element.disabled;
    });
    var firstByIndex = elements.findAll(function(element) {
      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
    }).sortBy(function(element) { return element.tabIndex }).first();

    return firstByIndex ? firstByIndex : elements.find(function(element) {
      return ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    form.findFirstElement().activate();
    return form;
  },

  request: function(form, options) {
    form = $(form), options = Object.clone(options || { });

    var params = options.parameters, action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/

Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {
  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = { };
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: function(element, value) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    try {
      element.focus();
      if (element.select && (element.tagName.toLowerCase() != 'input' ||
          !['button', 'reset', 'submit'].include(element.type)))
        element.select();
    } catch (e) { }
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.blur();
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;
var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = {
  input: function(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element, value);
      default:
        return Form.Element.Serializers.textarea(element, value);
    }
  },

  inputSelector: function(element, value) {
    if (Object.isUndefined(value)) return element.checked ? element.value : null;
    else element.checked = !!value;
  },

  textarea: function(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  },

  select: function(element, index) {
    if (Object.isUndefined(index))
      return this[element.type == 'select-one' ?
        'selectOne' : 'selectMany'](element);
    else {
      var opt, value, single = !Object.isArray(index);
      for (var i = 0, length = element.length; i < length; i++) {
        opt = element.options[i];
        value = this.optionValue(opt);
        if (single) {
          if (value == index) {
            opt.selected = true;
            return;
          }
        }
        else opt.selected = index.include(value);
      }
    }
  },

  selectOne: function(element) {
    var index = element.selectedIndex;
    return index >= 0 ? this.optionValue(element.options[index]) : null;
  },

  selectMany: function(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(this.optionValue(opt));
    }
    return values;
  },

  optionValue: function(opt) {
    // extend element because hasAttribute may not be native
    return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
  }
};

/*--------------------------------------------------------------------------*/

Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  },

  execute: function() {
    var value = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(value) ?
        this.lastValue != value : String(this.lastValue) != String(value)) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
if (!window.Event) var Event = { };

Object.extend(Event, {
  KEY_BACKSPACE: 8,
  KEY_TAB:       9,
  KEY_RETURN:   13,
  KEY_ESC:      27,
  KEY_LEFT:     37,
  KEY_UP:       38,
  KEY_RIGHT:    39,
  KEY_DOWN:     40,
  KEY_DELETE:   46,
  KEY_HOME:     36,
  KEY_END:      35,
  KEY_PAGEUP:   33,
  KEY_PAGEDOWN: 34,
  KEY_INSERT:   45,

  cache: { },

  relatedTarget: function(event) {
    var element;
    switch(event.type) {
      case 'mouseover': element = event.fromElement; break;
      case 'mouseout':  element = event.toElement;   break;
      default: return null;
    }
    return Element.extend(element);
  }
});

Event.Methods = (function() {
  var isButton;

  if (Prototype.Browser.IE) {
    var buttonMap = { 0: 1, 1: 4, 2: 2 };
    isButton = function(event, code) {
      return event.button == buttonMap[code];
    };

  } else if (Prototype.Browser.WebKit) {
    isButton = function(event, code) {
      switch (code) {
        case 0: return event.which == 1 && !event.metaKey;
        case 1: return event.which == 1 && event.metaKey;
        default: return false;
      }
    };

  } else {
    isButton = function(event, code) {
      return event.which ? (event.which === code + 1) : (event.button === code);
    };
  }

  return {
    isLeftClick:   function(event) { return isButton(event, 0) },
    isMiddleClick: function(event) { return isButton(event, 1) },
    isRightClick:  function(event) { return isButton(event, 2) },

    element: function(event) {
      var node = Event.extend(event).target;
      return Element.extend(node.nodeType == Node.TEXT_NODE ? node.parentNode : node);
    },

    findElement: function(event, expression) {
      var element = Event.element(event);
      if (!expression) return element;
      var elements = [element].concat(element.ancestors());
      return Selector.findElement(elements, expression, 0);
    },

    pointer: function(event) {
      return {
        x: event.pageX || (event.clientX +
          (document.documentElement.scrollLeft || document.body.scrollLeft)),
        y: event.pageY || (event.clientY +
          (document.documentElement.scrollTop || document.body.scrollTop))
      };
    },

    pointerX: function(event) { return Event.pointer(event).x },
    pointerY: function(event) { return Event.pointer(event).y },

    stop: function(event) {
      Event.extend(event);
      event.preventDefault();
      event.stopPropagation();
      event.stopped = true;
    }
  };
})();

Event.extend = (function() {
  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (Prototype.Browser.IE) {
    Object.extend(methods, {
      stopPropagation: function() { this.cancelBubble = true },
      preventDefault:  function() { this.returnValue = false },
      inspect: function() { return "[object Event]" }
    });

    return function(event) {
      if (!event) return false;
      if (event._extendedByPrototype) return event;

      event._extendedByPrototype = Prototype.emptyFunction;
      var pointer = Event.pointer(event);
      Object.extend(event, {
        target: event.srcElement,
        relatedTarget: Event.relatedTarget(event),
        pageX:  pointer.x,
        pageY:  pointer.y
      });
      return Object.extend(event, methods);
    };

  } else {
    Event.prototype = Event.prototype || document.createEvent("HTMLEvents").__proto__;
    Object.extend(Event.prototype, methods);
    return Prototype.K;
  }
})();

Object.extend(Event, (function() {
  var cache = Event.cache;

  function getEventID(element) {
    if (element._prototypeEventID) return element._prototypeEventID[0];
    arguments.callee.id = arguments.callee.id || 1;
    return element._prototypeEventID = [++arguments.callee.id];
  }

  function getDOMEventName(eventName) {
    if (eventName && eventName.include(':')) return "dataavailable";
    return eventName;
  }

  function getCacheForID(id) {
    return cache[id] = cache[id] || { };
  }

  function getWrappersForEventName(id, eventName) {
    var c = getCacheForID(id);
    return c[eventName] = c[eventName] || [];
  }

  function createWrapper(element, eventName, handler) {
    var id = getEventID(element);
    var c = getWrappersForEventName(id, eventName);
    if (c.pluck("handler").include(handler)) return false;

    var wrapper = function(event) {
      if (!Event || !Event.extend ||
        (event.eventName && event.eventName != eventName))
          return false;

      Event.extend(event);
      handler.call(element, event);
    };

    wrapper.handler = handler;
    c.push(wrapper);
    return wrapper;
  }

  function findWrapper(id, eventName, handler) {
    var c = getWrappersForEventName(id, eventName);
    return c.find(function(wrapper) { return wrapper.handler == handler });
  }

  function destroyWrapper(id, eventName, handler) {
    var c = getCacheForID(id);
    if (!c[eventName]) return false;
    c[eventName] = c[eventName].without(findWrapper(id, eventName, handler));
  }

  function destroyCache() {
    for (var id in cache)
      for (var eventName in cache[id])
        cache[id][eventName] = null;
  }

  if (window.attachEvent) {
    window.attachEvent("onunload", destroyCache);
  }

  return {
    observe: function(element, eventName, handler) {
      element = $(element);
      var name = getDOMEventName(eventName);

      var wrapper = createWrapper(element, eventName, handler);
      if (!wrapper) return element;

      if (element.addEventListener) {
        element.addEventListener(name, wrapper, false);
      } else {
        element.attachEvent("on" + name, wrapper);
      }

      return element;
    },

    stopObserving: function(element, eventName, handler) {
      element = $(element);
      var id = getEventID(element), name = getDOMEventName(eventName);

      if (!handler && eventName) {
        getWrappersForEventName(id, eventName).each(function(wrapper) {
          element.stopObserving(eventName, wrapper.handler);
        });
        return element;

      } else if (!eventName) {
        Object.keys(getCacheForID(id)).each(function(eventName) {
          element.stopObserving(eventName);
        });
        return element;
      }

      var wrapper = findWrapper(id, eventName, handler);
      if (!wrapper) return element;

      if (element.removeEventListener) {
        element.removeEventListener(name, wrapper, false);
      } else {
        element.detachEvent("on" + name, wrapper);
      }

      destroyWrapper(id, eventName, handler);

      return element;
    },

    fire: function(element, eventName, memo) {
      element = $(element);
      if (element == document && document.createEvent && !element.dispatchEvent)
        element = document.documentElement;

      var event;
      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent("dataavailable", true, true);
      } else {
        event = document.createEventObject();
        event.eventType = "ondataavailable";
      }

      event.eventName = eventName;
      event.memo = memo || { };

      if (document.createEvent) {
        element.dispatchEvent(event);
      } else {
        element.fireEvent(event.eventType, event);
      }

      return Event.extend(event);
    }
  };
})());

Object.extend(Event, Event.Methods);

Element.addMethods({
  fire:          Event.fire,
  observe:       Event.observe,
  stopObserving: Event.stopObserving
});

Object.extend(document, {
  fire:          Element.Methods.fire.methodize(),
  observe:       Element.Methods.observe.methodize(),
  stopObserving: Element.Methods.stopObserving.methodize(),
  loaded:        false
});

(function() {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards and John Resig. */

  var timer;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (timer) window.clearInterval(timer);
    document.fire("dom:loaded");
    document.loaded = true;
  }

  if (document.addEventListener) {
    if (Prototype.Browser.WebKit) {
      timer = window.setInterval(function() {
        if (/loaded|complete/.test(document.readyState))
          fireContentLoadedEvent();
      }, 0);

      Event.observe(window, "load", fireContentLoadedEvent);

    } else {
      document.addEventListener("DOMContentLoaded",
        fireContentLoadedEvent, false);
    }

  } else {
    document.write("<script id=__onDOMContentLoaded defer src=//:><\/script>");
    $("__onDOMContentLoaded").onreadystatechange = function() {
      if (this.readyState == "complete") {
        this.onreadystatechange = null;
        fireContentLoadedEvent();
      }
    };
  }
})();
/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
  Before: function(element, content) {
    return Element.insert(element, {before:content});
  },

  Top: function(element, content) {
    return Element.insert(element, {top:content});
  },

  Bottom: function(element, content) {
    return Element.insert(element, {bottom:content});
  },

  After: function(element, content) {
    return Element.insert(element, {after:content});
  }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

// This should be moved to script.aculo.us; notice the deprecated methods
// further below, that map to the newer Element methods.
var Position = {
  // set to true if needed, warning: firefox performance problems
  // NOT neeeded for page scrolling, only if draggable contained in
  // scrollable elements
  includeScrollOffsets: false,

  // must be called before calling withinIncludingScrolloffset, every time the
  // page is scrolled
  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  // caches x/y coordinate pair to use with overlap
  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  // within must be called directly before
  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },

  // Deprecation layer -- use newer Element methods now (1.5.2).

  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: function(element) {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: function(element) {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: function(source, target, options) {
    options = options || { };
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
  function iter(name) {
    return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
  function(element, className) {
    className = className.toString().strip();
    var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
  } : function(element, className) {
    className = className.toString().strip();
    var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
    if (!classNames && !className) return elements;

    var nodes = $(element).getElementsByTagName('*');
    className = ' ' + className + ' ';

    for (var i = 0, child, cn; child = nodes[i]; i++) {
      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
          (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
        elements.push(Element.extend(child));
    }
    return elements;
  };

  return function(className, parentElement) {
    return $(parentElement || document.body).getElementsByClassName(className);
  };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/

Element.addMethods();
/*------------------------------------------------------------------------------

GLOBAL $Revision: #1 $
Copyright 2006 Adobe Systems Incorporated

------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------	

Function: getSearchQuery
Get a window search parameter or a hash of all parameters

Parameters:
id(optional) - string

Returned Value:
String or Hash

------------------------------------------------------------------------------*/
var getSearchParams = (function() {
	var _loadedParams = null;
	return function(id) {
		var params = _loadedParams || (_loadedParams = window.location.search.toQueryParams());
		return (id) ? params[id] : params;
	}
})();

/*------------------------------------------------------------------------------	

Function: Open Window
Simple Popup Window

Parameters:
uri - string
width - number (of pixels)
height - number (of pixels)
options - string
name - string

------------------------------------------------------------------------------*/
function OpenWindow( url, width, height, opt , name ) {
	window.open( url, (name || "OutsideWindow"), "width="+(width || 714)+",height="+(height || 536)+","+(opt ||  "scrollbars=yes,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes")).focus();
}

/*------------------------------------------------------------------------------	

Function: Select Form Action
Simple processing of form dropdown options

Parameters:
formID - ID of form to be processed
dropdownID - ID of <select> tag to be processed

------------------------------------------------------------------------------*/
function selectFormAction (formID,dropdownID) { 
	var selectedLink = document[formID][dropdownID].options[document[formID][dropdownID].selectedIndex].value;
	if (selectedLink != '#') {
		window.location=document[formID][dropdownID].options[document[formID][dropdownID].selectedIndex].value;
	} else if (selectedLink == '#') {
		document[formID][dropdownID].selectedIndex = 0;
	}
}

/*------------------------------------------------------------------------------	

Function: checkCache
adds a fake query to prompt IE to re-check it's cache 

Parameters:
path - uri as string

Returned Value:
uri string with query parameter

------------------------------------------------------------------------------*/
function checkCache(path) {
	return path+"?"+adobe.Math.Randomize.toId()+"=1";
}

/*------------------------------------------------------------------------------

Class: OneShotEventRegister
Abstract FIFO event register that expires after a single event. Allows subsequent calls to be optionally executed or passed to an overflow method.

Parameters:
element - element reference
eventname - string
overflow(optional) - boolean
overflower(optional) - function

Returned Value:
Object

------------------------------------------------------------------------------*/

var OneShotEventRegister = Class.create({
	initialize: function(element, eventname, overflow, overflower) {
		this.expired = false;
		this.queue = [];
		this.overflow = !!overflow;
		this.overflower = overflower;
		Event.observe(element, eventname, this.expire.bindAsEventListener(this));
	},
/*------------------------------------------------------------------------------

	Method: expire
	Execute and remove all queued functions
	
	Returned Value:
	None
	
------------------------------------------------------------------------------*/
	expire: function() {
		var i;
		while(i=this.queue.shift()) {
			i();
		}
		this.expired = true;
	},
/*------------------------------------------------------------------------------

	Method: register
	Add function to queue or if overflow enabled pass thru function
	
	Returned Value:
	Boolean
	
------------------------------------------------------------------------------*/
	register: function(func) {
		if(!this.expired) {
			this.queue.push(func);
		} else if(this.overflower) {
			this.overflower(func)
		} else if(this.overflow) {
			func();
		} else {
			return false;
		}
		return true;
	}
});

/*------------------------------------------------------------------------------

Function: registerOnLoad
Execute a specified callback when the root document is loaded.

Parameters:
func - function object reference

Returned Value:
None

------------------------------------------------------------------------------*/
var registerOnLoadFunc = (
registerOnLoad = (function() {
	var _exec = new OneShotEventRegister(window, "load", true);
	return function(func) { 
		_exec.register(func); 
	}
})());


/*------------------------------------------------------------------------------

Function: registerOnReady
Execute a specified callback when the root document is ready.

Parameters:
func - function object reference

Returned Value:
None

------------------------------------------------------------------------------*/

var registerOnReady = (function() {
	var _exec = new OneShotEventRegister(document, "dom:loaded", true, registerOnLoad);
	return function(func) {
		_exec.register(func);
	}
})();


(((com={}).adobe = {}).www = {
	"is": true,
	isSecure: adobe.hostEnv.isSecure
});

adobe.util = adobe.util || {};
/*------------------------------------------------------------------------------

@author btapley

Class: Cookie

------------------------------------------------------------------------------*/
adobe.Cookie = new (Class.create({
/*------------------------------------------------------------------------------
	
	Method: set
	
	Parameters:
	name - string
	value - string
	duration - number (of days)
	path - string
	domain - string
	secure - boolean
		
------------------------------------------------------------------------------*/
	set: function(name, value, duration, path, domain, secure){
		var cookie = [];
		cookie.push(name+"="+escape(value));
		if(duration) {
			var date = new Date();
			date.setTime(date.getTime() + (duration*86400000));
			cookie.push("expires=" + date.toGMTString());
		}
		if(path) {
			cookie.push("path=" + path || "/");	
		}
		if(domain) {
			cookie.push("domain=" + domain);
		}
		if(secure) {
			cookie.push("secure");
		}
		window.document.cookie = cookie.join(";");
	},
/*------------------------------------------------------------------------------
	
	Method: get
	
	Parameters:
	name - string
		
------------------------------------------------------------------------------*/
	get: function(name){
		var result, test, rexp = new RegExp(name + "=(.*)");
		window.document.cookie.split(";").detect(function(cookie){
			if((test = cookie.match(rexp))) {
				result = unescape(decodeURI(test[1]));
			} 
			return test;
		});
		return result;
	},
/*------------------------------------------------------------------------------

	Method: remove
	
	Parameters:
	name - string
	path(optional) - string
	
------------------------------------------------------------------------------*/
	remove: function(name, path){
		this.set(name, '', -1, path);
	}
}))();

/*------------------------------------------------------------------------------

@author btapley

Class: StateManager

Properties:
ns - namespace string

------------------------------------------------------------------------------*/
adobe.StateManager = (function() {
	var loadedUri;
	var loadedCookies = {};
	var cookiesDays = {};
	var cookies = adobe.Cookie;
	
	function getUri() {
		return loadedUri || (loadedUri = window.location.search.toQueryParams());	
	}
	
	function getUriId(id) {
		return getUri()[id];	
	}
	
	function getSaveDays(ns) {
		return cookiesDays[ns] || 0;
	}
	
	function setSaveDays(ns, days) {
		cookiesDays[ns] = days;
		return;
	}
	
	function getSave(ns) {
		return loadedCookies[ns] || (loadedCookies[ns] = (cookies.get(ns) || "").toQueryParams());
	}
	
	function clearSave(ns, id) {
		var save = getSave(ns);
		delete save[id];
		var val = $H(save).toQueryString();				
		return val ? cookies.set(ns, val, getSaveDays(ns)) : cookies.remove(ns);
	}
	
	function setSave(ns, id, val) {
		var itemsToSave;
		
		if(val instanceof Array) { //since Array is also an Object, order is important here
			itemsToSave = (val).join(",");
		} else if(typeof val == 'object') {
			itemsToSave = $H(val).inject([], function(arr, state) {
				var value = state.value || 0;  //use numbers instead of booleans if present
				if(value && typeof value == 'boolean') {
					value = 1; //use numbers instead of booleans if present
				}
				arr.push(state.key + ":" + value);
				return arr;
			}).join(",");
		} else if(typeof val == 'string') {
			itemsToSave = val;
		} else if(typeof val == 'boolean') {
			itemsToSave = val ? "1" : "0";
		} else if(typeof val == 'number' && isFinite(val)) {
			itemsToSave = val.toString();
		}
		
		if(!itemsToSave) { return clearSave(ns, id); }
		
		getSave(ns)[id] = itemsToSave;
				
		cookies.set(ns, $H(getSave(ns)).toQueryString(), getSaveDays(ns));
		return;
	}
	
	var c0nstruct0r = function(nam3spac3, days2save) {
		this.ns = nam3spac3;
		setSaveDays(nam3spac3, days2save || 0);
		return this;
	};
	
	c0nstruct0r.prototype = {
/*------------------------------------------------------------------------------

		Method: setCookieParam
		
		Parameters:
		id - string
		state - object, array, boolean, number, string
		
------------------------------------------------------------------------------*/		
		setCookieParam: function(id, state) {
			setSave(this.ns, id, state); //lazy loader and assignment
			return;
		},
/*------------------------------------------------------------------------------

		Method: getCookieParam
		
		Parameters:
		id - string
		
		Returns:
		object, array, boolean, number, string
		
------------------------------------------------------------------------------*/		
		getCookieParam: function(id) {
			return getSave(this.ns)[id];
		},
/*------------------------------------------------------------------------------
		
		Method: removeCookieParam
		
		Parameters:
		id - string
		
		Returns:
		Nothing
		
------------------------------------------------------------------------------*/
		removeCookieParam: function(id) {
			return clearSave(this.ns, id);
		},
/*------------------------------------------------------------------------------
		
		Method: getQueryParam
		
		Parameters:
		id - string
		
		Returns:
		object, array, boolean, number, string
		
------------------------------------------------------------------------------*/
		getQueryParam: function(id) {
			return (id) ? getUriId(id) : getUri();
		}
	};
	return c0nstruct0r;
})();
/*////////////////////////////////////////////////////////////////		

@author btapley

Class: Console

A Simple logging module that wraps the native browser implementations of a 'console' and also provides a custom DOM version for browsers without a native implementation.

////////////////////////////////////////////////////////////////*/
adobe.Console = (function() {
	
	var face = "",
	log_renderer = false;
	
	var display = (function() { //Safari likes to crash if window.console.log is not called directly so
		if((face = window.console)) {
			log_renderer = true;
			return function(msg) {
				msg = msg.toString();
				window.console.log(msg);
			};
		
		} else if((face = window.opera)) {
			log_renderer = true;
			return window.opera.postError;
		
		} else {
			face = {};
			var lineNumber = 0,
				overflowmode = false;
			
			var messageBlock = document.createElement("DIV");
			var consoleBlock = messageBlock.cloneNode(false);
			
			messageBlock.style.borderTop = "1px solid #CCCCCC";
			messageBlock.style.padding = "1px 10px";
			messageBlock.style.backgroundColor = "#FFFFFF";
									
			consoleBlock.style.font = "10px/14px courier, monospace";
			consoleBlock.style.position = "absolute";
			consoleBlock.style.left = "0";
			consoleBlock.style.bottom = "0";
			consoleBlock.style.width = "100%";
			consoleBlock.style.zIndex = "1000";
			
			function setOverflowMode() {
				overflowmode = true;
				consoleBlock.style.overflowY = "auto";
				consoleBlock.style.height = "140px";
			}

			function attachLog() {
				if(lineNumber > 10) { setOverflowMode(); }				
				window.document.getElementsByTagName("BODY")[0].appendChild(consoleBlock);
				Event.stopObserving(window, "load", attachLog);
			}
			
			var windowready = false;
			
			Event.observe(window, "load", function() {
				windowready = true;		       
			});
			
			return function(value) {
				if(!log_renderer) {
					if(windowready) {
						attachLog();
					} else {
						registerOnLoad(attachLog);	
					}
					log_renderer = true;
				}
				lineNumber++;
				if(!overflowmode && lineNumber > 10) { setOverflowMode(); }
				var out = messageBlock.cloneNode(false);
				out.appendChild(document.createTextNode(lineNumber.toString() +" "+ value));
				return consoleBlock.appendChild(out);
			};
		}
	})();
	
	var time = face.time;
	var timeEnd = face.timeEnd;
	
	if(!face.time) {
		var timers = {};
		function _time (id) {
			timers[id] = new Date().getTime();
			return;
		}
		
		function _timeEnd (id) {
			var end = new Date().getTime();
			var start = timers[id];
			return display(id + ": " + (end - start - offset) + "ms");
		}
		
		time = _time;
		timeEnd = _timeEnd;
		
		var offset = new Date().getTime();
		var test = {time: new Date().getTime()};
		offset = test.time - offset;
		
	}

	return {
/*////////////////////////////////////////////////////////////////

		Method: log
	
>		adobe.Console.log("hello world");
		
		Print a value
		
		Returns: Nothing

////////////////////////////////////////////////////////////////*/
		"log":		display,
/*////////////////////////////////////////////////////////////////

		Method: time
		
>		adobe.Console.time("myTimerID");
		
		Parameters:
		timerId - string
		
////////////////////////////////////////////////////////////////*/
		"time":		time,
/*////////////////////////////////////////////////////////////////
			
		Method: timeEnd

>		adobe.Console.timeEnd("myTimerID");

		Parameters:
		timerId - string
			
////////////////////////////////////////////////////////////////*/
		"timeEnd":	timeEnd
	};
})();
/*
ELEMENT
@author btapley

Class: Element
*/
adobe.Element = (function() {
	
	function createElem(doc, name, attributes) {
		var element = doc.createElement(name);
		if(attributes) {
			setAttrs(element, attributes);
		}
		return element;
	}
	
	function getOwnerDoc(element) {
		return element.ownerDocument || element.document;
	}
	
	//ATTRIBUTE CROSS BROWSER FIXES
	var fixNames = {};
	
	var testDiv = window.document.createElement("div");
	
	if(typeof testDiv.attributes["class"] != "undefined") { //IE variance, fragile?
		fixNames["class"] = "className";
		fixNames["for"] = "htmlFor";
	}
	
	var reqCssText = (function () { //use CSS text if needed for getting the style attribute 
			var s = testDiv.getAttribute("style");
			return isObject(s) && (typeof s.cssText != "undefined");
	})();
	
	testDiv = ''; //this is garbage now
	
	//Attribute Handling
	
	var STYLE_NVPAIRS_PATTERN = /[#\w][\w\s\(\)\-,]+/g;
	
	function createSpaceDelimitedPattern(s) { 
		return new RegExp("(^|\\s)" + s + "(\\s|$)");
	}
	
	function createLiteralObjectKeyPattern(s) { 
		return new RegExp("(^|\\s)" + s + "(\\s|:|$)");
	}
	
	function getAttr(el, attribute) {
		var name = fixNames[attribute] || attribute,
			empty = "";
		
		if(!el.getAttribute) {return empty;}
		
		var s = el.getAttribute(name);
		
		if(name != "style") {
			return s || empty;
		} 
		
		//Cross Browser Style Support
		if(isString(s) || isNull(s)) {
			return s || empty;
		} else if(isObject(s)) {
			return s.cssText || empty;
		}
		return empty;
	}
	
	function setAttrs(element, attributes) {
		for(var attr in attributes) {
			setAttr(element, attr, attributes[attr]);
		}
	}
	
	function setAttr(element, attribute, value) {
		var name = fixNames[attribute] || attribute;
		if(!value) {
			element.removeAttribute(name);
		} else if (name=="style" && reqCssText) {
			element.getAttribute("style").cssText = value;
		} else {
			element.setAttribute(name, value);
		}
	}

	function hasAttr(element, attribute, property) {
		var s = getAttr(element, attribute);
		
		if(!s) { return false; }
		
		if(!property) { 
			return (s) ? true : false;
		}
		
		if(attribute == "style") {
			return createLiteralObjectKeyPattern(property).test(s);
		}
		
		return createSpaceDelimitedPattern(property).test(s);
	}
	
	function getAttrParam(element, attribute, options) { //options: marker, keyname, delimiter
		var s = getAttr(element, attribute),
			r=""; //result
		
		
		if(options) { //do special marker parsing
			var m = options.marker,
			k = createSpaceDelimitedPattern(options.keyname),
			d = options.delimiter || " ", //space delimited attributes are default
			sm;
			
			var marked = s.split(m), //split on marker	
			l = marked.length; //create length index
			
			if(m && l<2) { //did a split happen?
				
				return r; //result undefined	//should this just return the default array or hash?
			}	
			
			if(k) { //have keyname, return an array of attributes after this marker, stop if we encounter another marker
				r = [];
				do {
					i = marked[l-1];
					if(i.search(k) !== 0) { continue; }
					sm = i.split(d); //split on delimiter
					if(!sm[sm.length-1]) { sm.pop(); } //clean up trailing whitespace
					sm.shift(); //remove keyname
					r = r.concat(sm); //flatten array and add to result
				
				} while(--l);
			
			} else { //no keyname, return hash of all marker matches
				r = {};
				do {
					i = marked[l-1];
					if(!i) { continue; }
					sm = i.split(d); //split on delimiter
					if(!sm[sm.length-1]) { sm.pop(); } //clean up trailing whitespace			
					var name = sm.shift(); //remove and save name
					var hi = r[name]; //find hash id
					r[name] = (hi) ? hi.concat(sm) : sm; //set result to new property, if exists flatten array and add result 
				
				} while(--l);
				
			}
							
		} else if(attribute == "style") { //create a hash
						
			var pairs = s.match(STYLE_NVPAIRS_PATTERN);
				
			r = {};
			
			for(var i = 0, n; i < pairs.length; i++) {
				var v = pairs[i];
				if(i%2 === 0) { //key
					n = v;
				} else { //value
					r[n] = v;
				}
			}
			
		} else { //list values
			r = s.split(d);
			if(!r[r.length-1]) { r.pop(); }//clean up trailing whitespace
		}
		
		return r;
	}
	
	function removeAttrParam (element, attribute, parameter) {
		var m = createSpaceDelimitedPattern(parameter);
			
		return setAttr(element, attribute, getAttr(element, attribute).replace(m, function(s,$1,$2) {
			if(!$1) { return ""; }
			if(!$2) { return ""; }
			return " ";
		}));
	}
	
	function setAttrParam(element, attribute, parameter) {
		if(hasAttr(element, attribute, parameter)) { return; }
		var attr = getAttr(element, attribute);
		return setAttr(element, attribute, attr + ((attr) ? " " : "") + parameter);		
	}

	var singl3ton = {
/*
		Method: create
		
		Parameters:
		name - string
		attributes - object as hash
*/
		create: function(name, attributes) {
			return createElem(window.document, name, attributes);
		},
		/*
			Method: createRemote
			
			Parameters:
			doc - Document object reference
			name - string
			attributes - object as hash
		*/
		createRemote: function(doc, name, attributes) {
			return createElem(doc, name, attributes);
		},
		/*
			Method: getOwnerDocument
			
			Parameters:
			element - Node reference
		*/
		getOwnerDocument: getOwnerDoc,
		/*
			Method: setAttributes
			
			Parameters:
			element - Node reference
			attributes - object as hash
			
		*/
		setAttributes: setAttrs,
/*
		Method: getAttribute
		
		Parameters:
		element - Node reference
		attribute - string
*/
		getAttribute: getAttr,
/*
		Method: hasAttribute
		
		Parameters:
		element - Node reference
		attribute - string
		parameter (optional) - string
*/
		hasAttribute: hasAttr,
/*
		Method: replaceAttributeParam
		
		Parameters:
		element - Node reference
		attribute - string
		currentValue - string
		replacement - string
*/
		replaceAttributeParam: function(element, attribute, currentvalue, replacement) {
			removeAttrParam(element, attribute, currentvalue);
			return setAttrParam(element, attribute, replacement);
		},
/*
		Method: setAttributeParam
		
		Parameters:
		element - Node reference
		attribute - string
		parameter - string
*/
		setAttributeParam: setAttrParam,
/*
		Method: removeAttributeParam
		
		Parameters:
		element - Node reference
		attribute - string
		parameter - string
*/
		removeAttributeParam: removeAttrParam,
/*
		Method: getAttributeParams
		
		Parameters:
		element - Node reference
		attribute - string
		options - marker, keyname, delimiter
*/
		getAttributeParams: getAttrParam,
/*
		Method: getElementsByClassName
		
		Parameters:
		root - Node reference
		tag - string
		classname - string
*/
		getElementsByClassName: function(root, tag, css) {
			root = root || document;
			var result = [], 
				tags, 
				a11 = root.all;
			
			if(!tag || tag == "*") {
				tags = a11 || root.getElementsByTagName(tag) || [];
			} else if(!!root.getElementsByTagName) {
				tags = root.getElementsByTagName(tag);
			} else if(a11) {
				tags = a11.tags(tag);
			} else {
				return result;	
			}
			
			var i = tags.length-1, t;
			
			if(i < 0) { return result; }
			
			do {
				t = tags[i];
				if(hasAttr(t, "class", css)) {
					result.push(t);							   
				}
			} while (i--);
			
			return result;
		},
/*
		Method: resolveId
		
		Parameters:
		element - Noode reference
*/
		resolveId: function(element) {
			if(!element) { return; }
			var id = element.id;
			if(!id) {
				id = element.uniqueID;
				if(!id) {
					var doc = getOwnerDoc(element);
					var mthd = adobe.Math.Randomize.toId;
					id = mthd();
					while(doc.getElementById(id)) { 
						id = mthd();
					}
				}
				return (element.id = id);
			}
			return id;
		},
/*
		Method: insertAbove
		
		Parameters:
		node - Node reference
		insertion -  Node reference
*/
		insertAbove: function(node, insertion) {
			return node.parentNode.insertBefore(insertion, node);
		},
/*
		Method: insertBelow
		
		Parameters:
		node - Node reference
		insertion -  Node reference
*/
		insertBelow: function (node, insertion) {
			return node.parentNode.insertBefore(insertion, node.nextSibling);
		}
	};
	
/*		OUTSIDE
		@author btapley
		http://webdev.macromedia.com/wiki/index.php/Outside
		
		Class: Outside
		
		Properties:
		insideElement - current innermost element
		outsideElement - current Outermost element
		
		Usage:
>		var myOutside = adobe.Element.Outside(elementReference);
>		myOutside.setOutside(1, {"class": "myFirstOutsideStyle"});
>		myOutside.setOutside(2, {"class": "mySecondOutsideStyle"});
> 		myOutside.render();
		
*/
	singl3ton.Outside = function(element, outsides) {
		this.insideElement = 
		this.outsideElement = 
		$(element) || createElem(document, "div");
		
		this.outsideElements = outsides || [];
	};
	
	singl3ton.Outside.prototype = {
		removeOutside: function(){
			this.outsideElements.clear();
			return this.render();
		},
		setOutside: function(index, attributes) {
			index--;
			var outside = (this.outsideElements[index] = this.outsideElements[index] || createElem(document, "div"));
			setAttrs(outside, attributes);
			return;
		},
		render: function() {		
			var outsideSum = this.outsideElements.length-1,
				currentElement = this.outsideElement || this.insideElement,
				newElement = this.outsideElements[outsideSum] || this.insideElement,
				renderElements = [];
			if(outsideSum >= 0) {
				do {
					if(!this.outsideElements[outsideSum]) { continue; }
					renderElements.push("(this.outsideElements["+outsideSum+"])");
				} while(outsideSum--);
				
				renderElements.push("(this.insideElement.cloneNode(true))");
				eval(renderElements.join(".appendChild"));
				renderElements.clear(); //make garbage
			}
			if(currentElement.parentNode) {
				currentElement.parentNode.replaceChild(newElement, currentElement);
			}
			return (this.outsideElement = newElement);
		}
	
	};

	return singl3ton;
})();
/*////////////////////////////////////////////////////////////////

@author btapley

Class: ContentTemplate

Properties:
code - string

Usage:
>	var myTemplate = adobe.ContentTemplate("<p>#NAME#<\/p>");
>	myTemplate.injectData({NAME: "Rocky"});

////////////////////////////////////////////////////////////////*/

adobe.ContentTemplate = (function() {
	var C0nstruct0r = function(code) {
		this.code = new String(escape(code) || "");
	};
	
	C0nstruct0r.prototype = {
/*////////////////////////////////////////////////////////////////

		Method: injectData
		
		Parameters:
		hash - object as hash
		token (optional) - string (default is '#')
		
////////////////////////////////////////////////////////////////*/
		injectData:function(hash, token) {
			token = escape(token || "#");
			var result = $H(hash).collect(function(i) {
				return "(/"+token+i.key+token+"/g,'"+escape(i.value)+"')";
			});
			result.unshift("this.code");
			return unescape(eval(result.join(".replace")));
		}
	};
	
	return C0nstruct0r;
})();
/*////////////////////////////////////////////////////////////////	

@author btapley

Class: Math

////////////////////////////////////////////////////////////////*/

adobe.Math = {};

/*////////////////////////////////////////////////////////////////	

@author btapley

Class: Randomize

////////////////////////////////////////////////////////////////*/
adobe.Math.Randomize = (function() {
	var rand = Math.random;
	var alphabet = new String("abcdefghijklmnopqrstuvwxyz");
	
	function numRng(n1,n2) {
		var lo = Math.min(n1, n2), hi = Math.max(n1, n2);
		return ( parseInt( rand() * hi, 0 )%( hi-lo+1 ) )+lo;
	}
	
	function alpha() {
		var i = numRng( 0, alphabet.length-1);
		return alphabet.charAt(i);
	}
	
	function digit(maxnumber) {
		return parseInt( rand()*( Math.pow( 10, maxnumber || 1 ) ), 0 );
	}
	
	return {
/*////////////////////////////////////////////////////////////////

		Method: toDigitLimit
		
		Parameters:
		maxnumber - maximum number of digits
		
////////////////////////////////////////////////////////////////*/
		toDigitLimit: digit,
/*////////////////////////////////////////////////////////////////

		Method: inNumberRange
		
		Parameters:
		n1 - number
		n2 - number
		
		Returns:
		Number between n1 and n2 parameters

////////////////////////////////////////////////////////////////*/
		inNumberRange: numRng,
/*////////////////////////////////////////////////////////////////
		
		Method: toAlpha
		
		Returns:
		letter as string
		
////////////////////////////////////////////////////////////////*/
		toAlpha: alpha,
/*////////////////////////////////////////////////////////////////
		
		Method: inAlphaRange
		
		Parameters:
		a1 - letter as string
		a2 - letter as string
		
		Returns:
		letter between a1 and a2 parameters as a string
		
////////////////////////////////////////////////////////////////*/
		inAlphaRange: function(a1, a2) {
			var i = numRng( alphabet.indexOf(a1), alphabet.indexOf(a2) );
			return alphabet.charAt(i);
		},
/*////////////////////////////////////////////////////////////////
		
		Method: inAlphaRange
		
		Parameters:
		a1 - letter as string
		a2 - letter as string
		
		Returns:
		Alphanumeric string
		
////////////////////////////////////////////////////////////////*/
		toId: function(num) {
			return alpha()+digit( num || 3 );
		}
	};
})();
/*	ASSET LOADER $Revision: #1 $
	Work in progress
	@author btapley
*/

/*	
	Class: Loader 
	Load assets into the document, prevent overlapping assets form being written more than once.
	
	Example:
>	adobe.Loader.requireAsset("/path/to/my/file.js");
>	adobe.Loader.requireAsset("_/library_path/to/my/file.css");
>	adobe.Loader.requireAsset("/path/to/my/file_print.css", { media: "print" });
*/

adobe.Loader = (function() {	
	var ATTR_TOKEN = "#ATTR#",
		STATUS_NONE = 0,
		STATUS_DONE = 1,
		STATUS_ERROR = 2,
		SRC_PATH_TRIG = "_/",
		PATH_CAPTURE = /(^.+\.)(\w+)(\?[^$]*$|$)/,
		SCRIPT_TAG = "<script #ATTR#><\/script>",
		LINK_TAG = "<link #ATTR# \/>",
		jscompress = !!adobe.jscompress,
		compress_path = adobe.jscompress_path,
		renderStatus = {},
		assets = {
			JS: [ SCRIPT_TAG, "src", {
				type:"text/javascript"
			}],
			CSS: [ LINK_TAG, "href", {
				type:"text/css",
				rel:"stylesheet"
			}]
		},
		renderAsset = function(path, user_attributes) {	
			var explode = path.match(PATH_CAPTURE), //break apart the path argument
				ext = explode[2], //file extension
				q = explode[3]; //query
			
			if(!ext) { return; } //didn't find a suitable file extension?
				
			var type = ext.toUpperCase(), //declare file type
				data = assets[type]; //declare data point
				
			if(!data) { return; } //is asset type defined in here?
				
			/* compression hack here. Still implementing server compression */
			if(type == "JS" && jscompress) {
				path = explode[1] + compress_path + "." + ext + q;
			}
				
			var out = {},
				attrs = [],
				attrN = "",
				code = data[0],
				pathAtt = data[1],
				reqAtt = data[2];
				
			for(attrN in reqAtt) { //copy required attributes 
				out[attrN] = reqAtt[attrN];
			}
			
			out[pathAtt] = path; //set path attribute
			
			if(user_attributes) { //copy user-defined attributes
				for(attrN in user_attributes) {
					out[attrN] = user_attributes[attrN];
				}
			}
			
			for(attrN in out) { //create attribute text eg. name="value"
				attrV = out[attrN];				
				attrs.push((attrV) ? (attrN + '="' + attrV + '"') : attrN);
			}
			
			return code.replace(ATTR_TOKEN, attrs.join(" "));
		};
	
	return {
		/*
			Function: requireAsset
			
			Parameters:
			path - location string (Paths beginning with "_/" will be relative to the library location)
			user_attributes - object instance (optional)
			
			Returns:
			Integer indicating render status (0=None, 1=Done, 2=Error)
		*/
		
		requireAsset : function(path, user_attributes) {
			if(!path) { return STATUS_NONE; } //insurance from bad calls
			
			if(path.indexOf(SRC_PATH_TRIG) === 0) { //did we request a library relative path?
				path = path.replace(SRC_PATH_TRIG, adobe.getLibraryPath()); //replace the trigger with the path
			}
			
			var currentStatus = (renderStatus[path] || STATUS_NONE); //declare status?
			
			if(currentStatus > STATUS_NONE) { return currentStatus; } //this path was already written, terminally failed, or in progress?
								
			var txt = renderAsset(path, user_attributes);
			
			if(!txt) { 
				return (renderStatus[path] = STATUS_ERROR);
			} else {
				renderStatus[path] = currentStatus = STATUS_DONE; //new request, log it before writing to prevent recursion
			}
			
			document.write(txt);
			
			return currentStatus;
		}
	};
})();
/*	IE SUBSTITUTION CSS
*/

if(adobe.hostEnv.ieV == 6) { //rememdy IE 6 broken background image cache
	try { 
		document.execCommand("BackgroundImageCache", false, true); 
	} catch(err) {}
}

adobe.SelectFix = (function() {
	var Construct0r = function() { };
	Construct0r.prototype = {
		doFix: function() {
			for(var i = 0, n; (n = document.getElementsByTagName("select")[i]); i++) {
				n.style.visibility = "hidden";
			}
		},
		undoFix: function() {
			for(var i = 0, n; (n = document.getElementsByTagName("select")[i]); i++) {
				n.style.visibility = "visible";
			}
		}
	};
	return new Construct0r();
})();
/*
	Class: htc
	Utility functions to support Microsoft's HTC technology
*/
adobe.htc = (function() {
	var htcRegistry = {};
	
	function htcGetArgs(str) {
		return str.split(",");
	}
	function htcGetProps(str) {
		return str.split(" ");
	}
	
	function normalize_obj_arg (obj) {
		if(!obj) {
			return [];
		} else if(isArray(obj)) { 
			return obj; 
		} else if(isTag(obj)) {
			return [obj]	
		} else {
			return [];
		}
	}
	
	function $getFirstChild (node,name) {
		var result = [];
		if(!node) { return result; }
		if(name) { 
			result.push(node.children.tags(name)[0]);
		} else {
			for(var n, i = 0; (n = node.children[i]); i++) {
				if(n.nodeType == 1) {
					result.push(n)
					break;
				}
			}
		}
		return result;
	}
	
	function $getDirectChild (node,name) {
		var r = (name) ? node.children.tags(name) : node.children;
		var result = [];
		for(var i=0; i < r.length; i++) {
			result.push(r[i]);	
		}
		return result;
	}
	
	function $addStyleToNode(el,args) {
		args = htcGetArgs(args); //styles, runtime		
		var styleObject = (args[1]) ? "runtimeStyle" : "style";
		var pairs = htcGetProps(args[0]);
		for(var i=0; i < pairs.length; i++) {
			el[styleObject][pairs[i]] = pairs[++i];
		}
	}
	
	function $next (node,name) {
		var result = [],
		next = node.nextSibling;
		if(name && next.nodeName == name) {
			result.push(next);
		} else if(next) {
			result.push(next);
		}
		return result;
	}
	
	var Construct0r = function() { }
	Construct0r.prototype={
/*-----------------------------------------------------------------------------------
			
		Method: bind2
		
		Parse and Execute a method string, then register the id
		
		Parameters:
		id - element ID
		method_str - string to parse and execute using special syntax
			
-----------------------------------------------------------------------------------*/
		bind2: function(id, method_str) {
			if(!htcRegistry[id]) {
				this.exe(id, method_str.substring(1,method_str.length-1));
				htcRegistry[id] = 1;
			}
		},
/*-----------------------------------------------------------------------------------
			
		Method: exe
		
		Break apart the method str
		
		Usage:
>		$getFirstChild >$addClassToNode[p1-first-child]
		
		"$" - refer to a method
		">" - pass the result into the next method
		"[" - open arguments for method
		"," - separate arguments
		"]" - close arguments
		
		Parameters:
		id - element ID
		method_str - string to parse and execute using special syntax
			
-----------------------------------------------------------------------------------*/
		exe: function(id, method_str) {
			var _i = document.getElementById(id),
				excs = method_str.split("$");
				excs.shift();
			
			for(var i=0; i < excs.length; i++) {
				var exc = excs[i];
				
				var z, c, a="";
				
				//arguments
				z = exc.indexOf("[");
				if(z > -1) {
					c = exc.indexOf("]");
					a = exc.substring(z+1,c);
				} else {
					z = exc.indexOf(" ");
				}
				
				var excName = exc.substring(0, z);
				var f = this[excName];
				if(!f) continue;
				
				var _o = f(_i, a);
				
				//pass thru
				if(exc.charAt(exc.length-1) == ">") {
					_i = _o; //set input to output
				}
			}
		},
/*-----------------------------------------------------------------------------------
			
		Method: addClassToNode
		
		Usage:
>		$addClassToNode[myClassName]
			
-----------------------------------------------------------------------------------*/
		addClassToNode: function(el,style){
			var e = normalize_obj_arg(el);
			var i = e.length-1;
			
			if(i<0) { 
				return e;
			}
			
			do {
				adobe.Element.setAttributeParam(e[i], "class", style);	
			} while (i--);
			
			return e;
		},
/*-----------------------------------------------------------------------------------
			
		Method: addStyleToNode
		
		Usage:
>		$addStyleToNode[fontWeight bold backgroundColor red]
>		$addStyleToNode[fontWeight bold backgroundColor red,runtime]
					
-----------------------------------------------------------------------------------*/
		addStyleToNode: function(el,args){
			var e = normalize_obj_arg(el);
			var i = e.length-1;
			
			if(i<0) { 
				return e;
			}
			
			do {
				$addStyleToNode(e[i], args);
			} while (i--);
			
			return e;
		},
/*-----------------------------------------------------------------------------------
			
		Method: getAdjacent
		
		Usage:
>		$getAdjacent
			
-----------------------------------------------------------------------------------*/
		getAdjacent: function(nodelist) {
			return $A(nodelist).findAll(function(node) {
				return node.previousSibling;
			});
		},
/*-----------------------------------------------------------------------------------
			
		Method: getDirectChild
		
		Usage:
>		$getDirectChild
>		$getDirectChild[UL]
			
-----------------------------------------------------------------------------------*/
		getDirectChild: function(node,name) {
			var e = normalize_obj_arg(node);
			var _i, _o = []; //input and output
					
			for(var i=0, l = e.length; i < l; i++) {
				_i = $getDirectChild(e[i], name); //recursive method defined above
				if(!!_i.length) { _o = _o.concat(_i); }
			}
			
			return _o;
		},
/*-----------------------------------------------------------------------------------
			
		Method: getFirstChild
		
		Usage:
>		$getFirstChild
>		$getFirstChild[UL]
			
-----------------------------------------------------------------------------------*/
		getFirstChild: function(node, name) {
			var e = normalize_obj_arg(node);
			var _i, _o = []; //input and output
					
			for(var i=0, l = e.length; i < l; i++) {
				_i = $getFirstChild(e[i], name); //recursive method defined above
				if(!!_i.length) { _o = _o.concat(_i); }
			}
			
			return _o;
		},
/*-----------------------------------------------------------------------------------
			
		Method: getLastChild
		
		Usage:
>		$getLastChild
>		$getLastChild[UL]
			
-----------------------------------------------------------------------------------*/
		getLastChild: function(node, name){
			if(name) { 
				var c = node.children.tags(name);
				return c[c.length];
			}
			for(var n, i = node.children.length-1; (n = node.children[i]); i--) {
				if(n.nodeType == 1) {
					return n;
				}
			}
			return;
		},
/*-----------------------------------------------------------------------------------
			
		Method: next
		
		Usage:
>		$next
>		$next[UL]
			
-----------------------------------------------------------------------------------*/
		next: function(node, name) {
			var e = normalize_obj_arg(node);
			var _i, _o = []; //input and output
					
			for(var i=0, l = e.length; i < l; i++) {
				_i = $next(e[i], name); //recursive method defined above
				if(!!_i.length) { _o = _o.concat(_i); }
			}
			
			return _o;
		},
/*-----------------------------------------------------------------------------------
			
		Method: addTextToNode
		
		Usage:
>		$addTextToNode[ /]
>		$addTextToNode[ /,after]
>		$addTextToNode[ /,after,fontWeight normal]
			
-----------------------------------------------------------------------------------*/
		addTextToNode: function(n,a) {
			var e = normalize_obj_arg(n),
			args = htcGetArgs(a); //content,position,style
			
			
			for(var i=0; i<e.length;i++) {
				addText(e[i]);	
			}
			
			
			function addText(node) {
				var insert, 
				text = document.createTextNode(args[0].toString()),
				style = args[2];
				
				if(style) {
					insert = document.createElement('span');
					$addStyleToNode(insert, style+',runtime');
					insert.appendChild(text);
				} else {
					insert = text;
				}
				switch(args[1]) {
					case "before": node.insertBefore(insert, node.firstChild); break;
					case "after": node.appendChild(insert); break;
				}		
			}
			
			return e;
			
		}
	};

	return new Construct0r();
})();
/*	
	Module initialization via Dreamwmeaver template propeties
	@author btapley
	$Id: //depot/projects/dylan/releases/rc_12_4/docroot/lib/com.adobe/Dwt.js#1 $
*/
/*
	Class: Dwt
	
	Example:
>	adobe.Dwt.require("dropdown","pod","fma");
*/
adobe.Dwt = (function() {	
	
	var render = adobe.Loader.requireAsset,
		var_props = {},
		yui = false;
	
	var Dwt = {
		/*
			Method: require
			Require assets and initializations for specified modules
			
			Returned Value:
			None
			
			Parameters:
			Any number of symbolic arguments
			* accordion
			* carousel
			* drawer
			* dropdown
			* fma
			* form
			* map
			* pod
			* sifr
			* swf
			* tab
			* table
			* tree
			* user
			* wysiwyg
		*/
		require:function() {
			for(var i = 0; i < arguments.length; i++) {
				switch(arguments[i]) {
					case "yui":
						yui = true;
						break;
					case "accordion":						
						if(!yui) { render("_/../yui/_all_yui.js"); }
						render("_/../yui/extensions/accordion/accordion.js");
						render("_/../yui/extensions/accordion/accordion.css", { media:"screen" });
						break;
					case "carousel":						
						if(!yui) { render("_/../yui/_all_yui.js"); }
						render("_/../yui/extensions/carousel/carousel.js");
						render("_/../yui/extensions/carousel/carousel.css", { media:"screen" });
						break;
					case "drawer":
						render("_/module/drawer.js");
						break;
					case "dropdown": 
						render("_/module/dropdown/dropdown.css");
						if((adobe.hostEnv.ieV && adobe.hostEnv.ieV < 7) || (adobe.hostEnv.ieV && adobe.hostEnv.ie6)) {
							Event.observe(window, "load", function() {
								var dropdowns = $$(".d-dropdown");
								var i = dropdowns.length-1;
								if(i < 0) {return;}
								do{
									Event.observe(dropdowns[i], "mouseover", adobe.SelectFix.doFix);
									Event.observe(dropdowns[i], "mouseout", adobe.SelectFix.undoFix);
								} while(i--);
							});
						}
						break;
					case "fma": 
						render("_/module/Fma.js"); 
						break;
					case "form": 
						render("_/remedy/button-value.js");
						render("_/module/InputTitleOverlay.js");
						break;
					case "here":
						render("_/module/Here.js");
						Event.observe(window,"load",function() {
							adobe.Here.bindSelector(".dyn-here");			     
						});
						break;
					case "map": 
						render("_/module/map.css");
						break;
					case "modal":
						Object.extend(adobe, {
							use: JSAN.use,
							addRepository: JSAN.addRepository,
							setLoaded: function(module, file) {
								JSAN.loaded[file] = module;
							}
						});
						
						adobe.addRepository("/ubi/template/identity");
						adobe.use("adobe.Modal");
						adobe.Loader.requireAsset("/ubi/template/identity/adobe/Pane/screen.css");
						
						Event.observe(window, "load", function() {			       
							var modallinks = $$("a[rel=modal]");
							modallinks.invoke("modalize");
							modallinks.invoke("observe","click", function(event) {
								var url = window.location.host + window.location.pathname;
								var s=s_gi(window.s_accountName);
								s.linkTrackVars='prop42';
								s.prop42="Modal: " + url + ":" + this.path();
								s.tl(true, 'o', url + ': Modal');
							});
						});
						break;
					case "peek":
						render("_/module/PeekPane.js");
						Event.observe(window, "load", function() {
							init_PeekPanes();      
						});
						break;
					case "rel": 
						render("_/Rel.js");
						break;
					case "sifr":
						render("_/sIFR2.0.2/sifr.js");
						render("_/sIFR2.0.2/sIFR-print.css", { media:"print" });
						break;
					case "swf":
						render("_/swfobject.js");
						render("_/swfobject.addon.js");
						break;
					case "tab": 
						render("_/module/tabnav.js");
						registerOnLoad(function() {
							adobe.tabs.renderDomSubscribers();			  
						});
						break;
					case "table": 
						render("_/module/table.js");
						registerOnReady(function() {
							adobe.Element.Table.stripe$$('.stripe', 1, 0.92);
						});
						break;
					case "tooltip":
						render("_/module/tooltip.js");
						Event.observe(window, "load", function() {
							init_Tooltips();      
						});
						break;
					case "tree": 
						render("_/module/Tree.js");
						registerOnReady(function() {
							adobe.gui.Tree.renderDomSubscribers();			  
						});
						break;
					case "user": 
						render("_/module/InputTitleOverlay.js");
						break;
					case "wysiwyg": 
						render("_/module/wysiwyg.js");
						break;
				}
			}
		},
		/*
			Method: setProperty
			Make a custom property available to other scripts
			
			Returned Value:
			None
		*/
		setProperty: function(name, value) {
			var_props[name] = value;
		}
	};
	/*
		Method: getProperty
		Get a user-defined property or native property
		
		Returned Value:
		Property value string or empty string
	*/
	Dwt.getProperty = function(name) {
		return var_props[name] || Dwt[name] || "";
	};
	
	return Dwt;
})();
var JSAN=function(){JSAN.addRepository(arguments)};JSAN.VERSION=0.1;JSAN.globalScope=self;JSAN.includePath=[".","lib"];JSAN.errorLevel="none";JSAN.errorMessage="";JSAN.loaded={};JSAN.use=function(){var B=JSAN.require(arguments[0]);if(!B){return null}var A=JSAN._parseUseArgs.apply(JSAN,arguments).importList;JSAN.exporter(B,A);return B};JSAN.require=function(pkg){var path=JSAN._convertPackageToPath(pkg);if(JSAN.loaded[path]){return JSAN.loaded[path]}try{var classdef=eval(pkg);if(typeof classdef!="undefined"){return classdef}}catch(e){}for(var i=0;i<JSAN.includePath.length;i++){var js;try{var url=JSAN._convertPathToUrl(path,JSAN.includePath[i]);js=JSAN._loadJSFromUrl(url)}catch(e){if(i==JSAN.includePath.length-1){throw e}}if(js!=null){var classdef=JSAN._createScript(js,pkg);JSAN.loaded[path]=classdef;return classdef}}return false};JSAN.exporter=function(){JSAN._exportItems.apply(JSAN,arguments)};JSAN.addRepository=function(){var A=JSAN._flatten(arguments);for(var B=A.length-1;B>=0;B--){JSAN.includePath.unshift(A[B])}return JSAN};JSAN._flatten=function(A){var C=new Array();for(var B=0;B<A.length;B++){if(typeof A[B]=="object"){C=JSAN._flatten(A[B],C)}else{C.push(A[B])}}return C};JSAN._findMyPath=function(){if(document){var A=document.getElementsByTagName("script");for(var D=0;D<A.length;D++){var F=A[D].getAttribute("src");if(F){var E=F.match(/^(.*?)\/?JSAN.js/);if(E&&E[1]){var C=E[1];for(var B=0;B<JSAN.includePath.length;B++){if(JSAN.includePath[B]==C){return }}JSAN.addRepository(C)}}}}};JSAN._findMyPath();JSAN._convertPathToUrl=function(B,A){return A.concat("/"+B)};JSAN._convertPackageToPath=function(A){var B=A.replace(/\./g,"/");B=B.concat(".js");return B};JSAN._parseUseArgs=function(){var B=arguments[0];var A=[];for(var C=1;C<arguments.length;C++){A.push(arguments[C])}return{pkg:B,importList:A}};JSAN._loadJSFromUrl=function(A){return new JSAN.Request().getText(A)};JSAN._findExportInList=function(C,B){if(C==null){return false}for(var A=0;A<C.length;A++){if(C[A]==B){return true}}return false};JSAN._findExportInTag=function(A,C){if(A==null){return[]}for(var B in A){if(B==C){return A[B]}}return[]};JSAN._exportItems=function(I,A){var E=new Array();var D=I.EXPORT;var F=I.EXPORT_OK;var G=I.EXPORT_TAGS;if(A.length>0){A=JSAN._flatten(A);for(var C=0;C<A.length;C++){var B=A[C];if(JSAN._findExportInList(D,B)||JSAN._findExportInList(F,B)){E.push(B);continue}var H=JSAN._findExportInTag(G,B);for(var C=0;C<H.length;C++){E.push(H[C])}}}else{E=D}JSAN._exportList(I,E)};JSAN._exportList=function(D,B){if(typeof (B)!="object"){return null}for(var C=0;C<B.length;C++){var A=B[C];if(JSAN.globalScope[A]==null){JSAN.globalScope[A]=D[A]}}};JSAN._makeNamespace=function(js,pkg){var spaces=pkg.split(".");var parent=JSAN.globalScope;eval(js);var classdef=eval(pkg);for(var i=0;i<spaces.length;i++){var name=spaces[i];if(i==spaces.length-1){if(typeof parent[name]=="undefined"){parent[name]=classdef;if(typeof classdef.prototype!="undefined"){parent[name].prototype=classdef.prototype}}}else{if(parent[name]==undefined){parent[name]={}}}parent=parent[name]}return classdef};JSAN._handleError=function(A,B){if(!B){B=JSAN.errorLevel}JSAN.errorMessage=A;switch(B){case"none":break;case"warn":alert(A);break;case"die":default:throw new Error(A);break}};JSAN._createScript=function(C,A){try{return JSAN._makeNamespace(C,A)}catch(B){JSAN._handleError("Could not create namespace["+A+"]: "+B)}return null};JSAN.prototype={use:function(){JSAN.use.apply(JSAN,arguments)}};JSAN.Request=function(A){if(JSAN.globalScope.XMLHttpRequest){this._req=new XMLHttpRequest()}else{this._req=new ActiveXObject("Microsoft.XMLHTTP")}};JSAN.Request.prototype={_req:null,getText:function(A){this._req.open("GET",A,false);try{this._req.send(null);if(this._req.status==200||this._req.status==0){return this._req.responseText}}catch(B){JSAN._handleError("File not found: "+A);return null}JSAN._handleError("File not found: "+A);return null}};
/*  
	Animator.js 1.1.9
	
	This library is released under the BSD license:

	Copyright (c) 2006, Bernard Sumption. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:
	
	Redistributions of source code must retain the above copyright notice, this
	list of conditions and the following disclaimer. Redistributions in binary
	form must reproduce the above copyright notice, this list of conditions and
	the following disclaimer in the documentation and/or other materials
	provided with the distribution. Neither the name BernieCode nor
	the names of its contributors may be used to endorse or promote products
	derived from this software without specific prior written permission. 
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR
	ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
	DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
	SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
	CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
	LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
	OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
	DAMAGE.

*/
function Animator(A){this.setOptions(A);var B=this;this.timerDelegate=function(){B.onTimerEvent()};this.subjects=[];this.target=0;this.state=0;this.lastTime=null}Animator.prototype={setOptions:function(A){this.options=Animator.applyDefaults({interval:20,duration:400,onComplete:function(){},onStep:function(){},transition:Animator.tx.easeInOut},A)},seekTo:function(A){this.seekFromTo(this.state,A)},seekFromTo:function(B,A){this.target=Math.max(0,Math.min(1,A));this.state=Math.max(0,Math.min(1,B));this.lastTime=new Date().getTime();if(!this.intervalId){this.intervalId=window.setInterval(this.timerDelegate,this.options.interval)}},jumpTo:function(A){this.target=this.state=Math.max(0,Math.min(1,A));this.propagate()},toggle:function(){this.seekTo(1-this.target)},addSubject:function(A){this.subjects[this.subjects.length]=A;return this},clearSubjects:function(){this.subjects=[]},propagate:function(){var B=this.options.transition(this.state);for(var A=0;A<this.subjects.length;A++){if(this.subjects[A].setState){this.subjects[A].setState(B)}else{this.subjects[A](B)}}},onTimerEvent:function(){var C=new Date().getTime();var A=C-this.lastTime;this.lastTime=C;var B=(A/this.options.duration)*(this.state<this.target?1:-1);if(Math.abs(B)>=Math.abs(this.state-this.target)){this.state=this.target}else{this.state+=B}try{this.propagate()}finally{this.options.onStep.call(this);if(this.target==this.state){window.clearInterval(this.intervalId);this.intervalId=null;this.options.onComplete.call(this)}}},play:function(){this.seekFromTo(0,1)},reverse:function(){this.seekFromTo(1,0)},inspect:function(){var B="#<Animator:\n";for(var A=0;A<this.subjects.length;A++){B+=this.subjects[A].inspect()}B+=">";return B}};Animator.applyDefaults=function(C,B){B=B||{};var D,A={};for(D in C){A[D]=B[D]!==undefined?B[D]:C[D]}return A};Animator.makeArray=function(C){if(C==null){return[]}if(!C.length){return[C]}var A=[];for(var B=0;B<C.length;B++){A[B]=C[B]}return A};Animator.camelize=function(C){var E=C.split("-");if(E.length==1){return E[0]}var B=C.indexOf("-")==0?E[0].charAt(0).toUpperCase()+E[0].substring(1):E[0];for(var D=1,A=E.length;D<A;D++){var F=E[D];B+=F.charAt(0).toUpperCase()+F.substring(1)}return B};Animator.apply=function(C,B,A){if(B instanceof Array){return new Animator(A).addSubject(new CSSStyleSubject(C,B[0],B[1]))}return new Animator(A).addSubject(new CSSStyleSubject(C,B))};Animator.makeEaseIn=function(A){return function(B){return Math.pow(B,A*2)}};Animator.makeEaseOut=function(A){return function(B){return 1-Math.pow(1-B,A*2)}};Animator.makeElastic=function(A){return function(B){B=Animator.tx.easeInOut(B);return((1-Math.cos(B*Math.PI*A))*(1-B))+B}};Animator.makeADSR=function(D,B,C,A){if(A==null){A=0.5}return function(E){if(E<D){return E/D}if(E<B){return 1-((E-D)/(B-D)*(1-A))}if(E<C){return A}return A*(1-((E-C)/(1-C)))}};Animator.makeBounce=function(A){var B=Animator.makeElastic(A);return function(C){C=B(C);return C<=1?C:2-C}};Animator.tx={easeInOut:function(A){return((-Math.cos(A*Math.PI)/2)+0.5)},linear:function(A){return A},easeIn:Animator.makeEaseIn(1.5),easeOut:Animator.makeEaseOut(1.5),strongEaseIn:Animator.makeEaseIn(2.5),strongEaseOut:Animator.makeEaseOut(2.5),elastic:Animator.makeElastic(1),veryElastic:Animator.makeElastic(3),bouncy:Animator.makeBounce(1),veryBouncy:Animator.makeBounce(3)};function NumericalStyleSubject(B,C,E,D,A){this.els=Animator.makeArray(B);if(C=="opacity"&&window.ActiveXObject){this.property="filter"}else{this.property=Animator.camelize(C)}this.from=parseFloat(E);this.to=parseFloat(D);this.units=A!=null?A:"px"}NumericalStyleSubject.prototype={setState:function(E){var D=this.getStyle(E);var A=(this.property=="opacity"&&E==0)?"hidden":"";var B=0;for(var C=0;C<this.els.length;C++){try{this.els[C].style[this.property]=D}catch(F){if(this.property!="fontWeight"){throw F}}if(B++>20){return }}},getStyle:function(A){A=this.from+((this.to-this.from)*A);if(this.property=="filter"){return"alpha(opacity="+Math.round(A*100)+")"}if(this.property=="opacity"){return A}return Math.round(A)+this.units},inspect:function(){return"\t"+this.property+"("+this.from+this.units+" to "+this.to+this.units+")\n"}};function ColorStyleSubject(A,B,D,C){this.els=Animator.makeArray(A);this.property=Animator.camelize(B);this.to=this.expandColor(C);this.from=this.expandColor(D);this.origFrom=D;this.origTo=C}ColorStyleSubject.prototype={expandColor:function(B){var C,E,D,A;C=ColorStyleSubject.parseColor(B);if(C){E=parseInt(C.slice(1,3),16);D=parseInt(C.slice(3,5),16);A=parseInt(C.slice(5,7),16);return[E,D,A]}if(window.DEBUG){alert("Invalid colour: '"+B+"'")}},getValueForState:function(A,B){return Math.round(this.from[A]+((this.to[A]-this.from[A])*B))},setState:function(C){var A="#"+ColorStyleSubject.toColorPart(this.getValueForState(0,C))+ColorStyleSubject.toColorPart(this.getValueForState(1,C))+ColorStyleSubject.toColorPart(this.getValueForState(2,C));for(var B=0;B<this.els.length;B++){this.els[B].style[this.property]=A}},inspect:function(){return"\t"+this.property+"("+this.origFrom+" to "+this.origTo+")\n"}};ColorStyleSubject.parseColor=function(D){var A="#",C;if(C=ColorStyleSubject.parseColor.rgbRe.exec(D)){var B;for(var E=1;E<=3;E++){B=Math.max(0,Math.min(255,parseInt(C[E])));A+=ColorStyleSubject.toColorPart(B)}return A}if(C=ColorStyleSubject.parseColor.hexRe.exec(D)){if(C[1].length==3){for(var E=0;E<3;E++){A+=C[1].charAt(E)+C[1].charAt(E)}return A}return"#"+C[1]}return false};ColorStyleSubject.toColorPart=function(A){if(A>255){A=255}var B=A.toString(16);if(A<16){return"0"+B}return B};ColorStyleSubject.parseColor.rgbRe=/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;ColorStyleSubject.parseColor.hexRe=/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function DiscreteStyleSubject(B,C,E,D,A){this.els=Animator.makeArray(B);this.property=Animator.camelize(C);this.from=E;this.to=D;this.threshold=A||0.5}DiscreteStyleSubject.prototype={setState:function(C){var A=0;for(var B=0;B<this.els.length;B++){this.els[B].style[this.property]=C<=this.threshold?this.from:this.to}},inspect:function(){return"\t"+this.property+"("+this.from+" to "+this.to+" @ "+this.threshold+")\n"}};function CSSStyleSubject(D,M,J){D=Animator.makeArray(D);this.subjects=[];if(D.length==0){return }var A,N,B;if(J){B=this.parseStyle(M,D[0]);N=this.parseStyle(J,D[0])}else{N=this.parseStyle(M,D[0]);B={};for(A in N){B[A]=CSSStyleSubject.getStyle(D[0],A)}}var A;for(A in B){if(B[A]==N[A]){delete B[A];delete N[A]}}var A,H,E,I,L,K;for(A in B){var G=String(B[A]);var C=String(N[A]);if(N[A]==null){if(window.DEBUG){alert("No to style provided for '"+A+'"')}continue}if(L=ColorStyleSubject.parseColor(G)){K=ColorStyleSubject.parseColor(C);I=ColorStyleSubject}else{if(G.match(CSSStyleSubject.numericalRe)&&C.match(CSSStyleSubject.numericalRe)){L=parseFloat(G);K=parseFloat(C);I=NumericalStyleSubject;E=CSSStyleSubject.numericalRe.exec(G);var F=CSSStyleSubject.numericalRe.exec(C);if(E[1]!=null){H=E[1]}else{if(F[1]!=null){H=F[1]}else{H=F}}}else{if(G.match(CSSStyleSubject.discreteRe)&&C.match(CSSStyleSubject.discreteRe)){L=G;K=C;I=DiscreteStyleSubject;H=0}else{if(window.DEBUG){alert("Unrecognised format for value of "+A+": '"+B[A]+"'")}continue}}}this.subjects[this.subjects.length]=new I(D,A,L,K,H)}}CSSStyleSubject.prototype={parseStyle:function(B,C){var G={};if(B.indexOf(":")!=-1){var I=B.split(";");for(var E=0;E<I.length;E++){var D=CSSStyleSubject.ruleRe.exec(I[E]);if(D){G[D[1]]=D[2]}}}else{var A,H,F;F=C.className;C.className=B;for(var E=0;E<CSSStyleSubject.cssProperties.length;E++){A=CSSStyleSubject.cssProperties[E];H=CSSStyleSubject.getStyle(C,A);if(H!=null){G[A]=H}}C.className=F}return G},setState:function(B){for(var A=0;A<this.subjects.length;A++){this.subjects[A].setState(B)}},inspect:function(){var B="";for(var A=0;A<this.subjects.length;A++){B+=this.subjects[A].inspect()}return B}};CSSStyleSubject.getStyle=function(B,C){var A;if(document.defaultView&&document.defaultView.getComputedStyle){A=document.defaultView.getComputedStyle(B,"").getPropertyValue(C);if(A){return A}}C=Animator.camelize(C);if(B.currentStyle){A=B.currentStyle[C]}return A||B.style[C]};CSSStyleSubject.ruleRe=/^\s*([a-zA-Z\-]+)\s*:\s*(\S(.+\S)?)\s*$/;CSSStyleSubject.numericalRe=/^-?\d+(?:\.\d+)?(%|[a-zA-Z]{2})?$/;CSSStyleSubject.discreteRe=/^\w+$/;CSSStyleSubject.cssProperties=["azimuth","background","background-attachment","background-color","background-image","background-position","background-repeat","border-collapse","border-color","border-spacing","border-style","border-top","border-top-color","border-right-color","border-bottom-color","border-left-color","border-top-style","border-right-style","border-bottom-style","border-left-style","border-top-width","border-right-width","border-bottom-width","border-left-width","border-width","bottom","clear","clip","color","content","cursor","direction","display","elevation","empty-cells","css-float","font","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","height","left","letter-spacing","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-top","margin-right","margin-bottom","margin-left","max-height","max-width","min-height","min-width","orphans","outline","outline-color","outline-style","outline-width","overflow","padding","padding-top","padding-right","padding-bottom","padding-left","pause","position","right","size","table-layout","text-align","text-decoration","text-indent","text-shadow","text-transform","top","vertical-align","visibility","white-space","width","word-spacing","z-index","opacity","outline-offset","overflow-x","overflow-y"];function AnimatorChain(C,A){this.animators=C;this.setOptions(A);for(var B=0;B<this.animators.length;B++){this.listenTo(this.animators[B])}this.forwards=false;this.current=0}AnimatorChain.prototype={setOptions:function(A){this.options=Animator.applyDefaults({resetOnPlay:true},A)},play:function(){this.forwards=true;this.current=-1;if(this.options.resetOnPlay){for(var A=0;A<this.animators.length;A++){this.animators[A].jumpTo(0)}}this.advance()},reverse:function(){this.forwards=false;this.current=this.animators.length;if(this.options.resetOnPlay){for(var A=0;A<this.animators.length;A++){this.animators[A].jumpTo(1)}}this.advance()},toggle:function(){if(this.forwards){this.seekTo(0)}else{this.seekTo(1)}},listenTo:function(A){var B=A.options.onComplete;var C=this;A.options.onComplete=function(){if(B){B.call(A)}C.advance()}},advance:function(){if(this.forwards){if(this.animators[this.current+1]==null){return }this.current++;this.animators[this.current].play()}else{if(this.animators[this.current-1]==null){return }this.current--;this.animators[this.current].reverse()}},seekTo:function(A){if(A<=0){this.forwards=false;this.animators[this.current].seekTo(0)}else{this.forwards=true;this.animators[this.current].seekTo(1)}}};function Accordion(J){this.setOptions(J);var B=this.options.initialSection,G;if(this.options.rememberance){G=document.location.hash.substring(1)}this.rememberanceTexts=[];this.ans=[];var F=this;for(var C=0;C<this.options.sections.length;C++){var A=this.options.sections[C];var D=new Animator(this.options.animatorOptions);var I=this.options.from+(this.options.shift*C);var H=this.options.to+(this.options.shift*C);D.addSubject(new NumericalStyleSubject(A,this.options.property,I,H,this.options.units));D.jumpTo(0);var E=this.options.getActivator(A);E.index=C;E.onclick=function(){F.show(this.index)};this.ans[this.ans.length]=D;this.rememberanceTexts[C]=E.innerHTML.replace(/\s/g,"");if(this.rememberanceTexts[C]===G){B=C}}this.show(B)}Accordion.prototype={setOptions:function(A){this.options=Object.extend({sections:null,getActivator:function(B){return document.getElementById(B.getAttribute("activator"))},shift:0,initialSection:0,rememberance:true,animatorOptions:{}},A||{})},show:function(B){for(var A=0;A<this.ans.length;A++){this.ans[A].seekTo(A>B?1:0)}if(this.options.rememberance){document.location.hash=this.rememberanceTexts[B]}}};

/*	GLOBAL NAV AND FOOTER JS (Older template usage)
	$Id: //depot/projects/dylan/releases/rc_12_4/docroot/js/globalnav.js#2 $
*/

var hideEvidon = false;

Event.observe(window, 'load', function() {
	if ($('SiteHeader')) {
		var wp = $('WelcomePanel');
		var screenName = $('screenName');
		if(screenName) {
			var screenNameValue = adobe.Cookie.get("SCREENNAME"),
			authenticAdobeId = adobe.Cookie.get('AUID'),
			WCDServerGUID = adobe.Cookie.get('WCDServer'),
			rememberMe = adobe.Cookie.get('RMID');
			
			if(screenNameValue) {
				screenName.innerHTML = screenNameValue;
			}
			
			if ((screenNameValue) && ((authenticAdobeId) || (rememberMe) || (WCDServerGUID))) {
				$('shWelcome').show();
				$('shSignInBlock').hide();
			}
			else {
				$('shWelcome').hide();
				$('shSignInBlock').show();
			}
		}
		
		if ($('search-input')) {
			adobe.InputTitleOverlay.init("search-input");
		}	
	}	
	
	if ($('SiteFooter')) {
		var rp = $('RegionPanel');
		var countryCode = adobe.Cookie.get("international");
		if (countryCode) {
			$('sfRegionSet').show();
			$('sfRegion').hide();
		}
	}
	
	if (($('SiteHeader')) && ($('SiteFooter'))) {
		Event.observe(document, 'click', function(event) {
			var el = event.element();
			var elid = el.id;
					
			if (elid == "shProducts" || elid == "shSolutions" || elid == "shLearning" || elid == "shHelp" || elid == "shDownloads" || elid == "shStore" || elid == "shCompany") {
				$(elid).addClassName('SiteHeaderBarItemActive');
			}
			else if (elid == "shWelcome" || elid == "screenName") {
				var wpHeight = $('WelcomePanel').getHeight();
				$('WelcomePanelShadow').style.height = (wpHeight + 2) + 'px';
				$('WelcomePanelShadow', 'WelcomePanel').invoke('toggle');
				if ($('SiteFooter')) {
					$('RegionPanel').hide();
				}
				Event.stop(event);
			}
			else if ((el == wp) || (el.descendantOf(wp))) {
				if (!el.descendantOf(wp)) {
					Event.stop(event);
				}
			}
			else if (elid == "sfRegion" || elid == "sfRegionChange" || elid == "sfRegionClose") {
				$('RegionPanel').toggle();
				if ($('SiteHeader')) {
					$('WelcomePanel', 'WelcomePanelShadow').invoke('hide');
				}
				Event.stop(event);
			}
			else if ((el == rp) || (el.descendantOf(rp))) {
				if (!el.descendantOf(rp)) {
					Event.stop(event);
				}
			}
			else {
				if ($('SiteHeader')) {
					$('WelcomePanel', 'WelcomePanelShadow').invoke('hide');
				}
				if ($('SiteFooter')) {
					$('RegionPanel').hide();
				}
			}
		});
	}

	if ($('shStore')) {
		Event.observe('shStore', 'mouseover', function() { 
			$('WelcomePanel', 'WelcomePanelShadow').invoke('hide');
			if ($('SiteFooter')) {
				$('RegionPanel').hide();
			}
		});
	}
	
	if ($('shProducts')) {
		Event.observe('shProducts', 'mouseover', function() { 
			$('WelcomePanel', 'WelcomePanelShadow').invoke('hide');
			if ($('SiteFooter')) {
				$('RegionPanel').hide();
			}
		});
	}
	
	if ($('shSolutions')) {
		Event.observe('shSolutions', 'mouseover', function() { 
			$('WelcomePanel', 'WelcomePanelShadow').invoke('hide');
			if ($('SiteFooter') != null) {
				$('RegionPanel').hide();
			}
		});
	}
	
	if ($('shInfo')) {
		Event.observe('shInfo', 'mouseover', function() { 
			var ipHeight = $('InfoPanel').getHeight();
			$('InfoPanelShadow').style.height = (ipHeight + 2) + 'px';
			$('InfoPanelShadow', 'InfoPanel').invoke('show');
			if ($('SiteFooter')) {
				$('RegionPanel').hide();
			}
		});
		Event.observe('shInfo', 'mouseout', function() { 
			$('InfoPanelShadow', 'InfoPanel').invoke('hide');
		});
	}
	
	if ($('shProducts1')) {
		Event.observe('shProducts1', 'mouseover', function() { 
			$('shProducts1').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shProducts1', 'mouseout', function() { 
			$('shProducts1').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shProducts2')) {
		Event.observe('shProducts2', 'mouseover', function() { 
			$('shProducts2').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shProducts2', 'mouseout', function() { 
			$('shProducts2').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shProducts3')) {
		Event.observe('shProducts3', 'mouseover', function() { 
			$('shProducts3').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shProducts3', 'mouseout', function() { 
			$('shProducts3').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shProducts4')) {
		Event.observe('shProducts4', 'mouseover', function() { 
			$('shProducts4').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shProducts4', 'mouseout', function() { 
			$('shProducts4').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shProducts5')) {
		Event.observe('shProducts5', 'mouseover', function() { 
			$('shProducts5').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shProducts5', 'mouseout', function() { 
			$('shProducts5').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shProducts6')) {
		Event.observe('shProducts6', 'mouseover', function() { 
			$('shProducts6').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shProducts6', 'mouseout', function() { 
			$('shProducts6').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shProducts7')) {
		Event.observe('shProducts7', 'mouseover', function() { 
			$('shProducts7').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shProducts7', 'mouseout', function() { 
			$('shProducts7').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shProducts9')) {
		Event.observe('shProducts9', 'mouseover', function() { 
			$('shProducts9').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shProducts9', 'mouseout', function() { 
			$('shProducts9').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shSolutions1')) {
		Event.observe('shSolutions1', 'mouseover', function() { 
			$('shSolutions1').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shSolutions1', 'mouseout', function() { 
			$('shSolutions1').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shSolutions2')) {
		Event.observe('shSolutions2', 'mouseover', function() { 
			$('shSolutions2').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shSolutions2', 'mouseout', function() { 
			$('shSolutions2').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shSolutions3')) {
		Event.observe('shSolutions3', 'mouseover', function() { 
			$('shSolutions3').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shSolutions3', 'mouseout', function() { 
			$('shSolutions3').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shSolutions4')) {
		Event.observe('shSolutions4', 'mouseover', function() { 
			$('shSolutions4').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shSolutions4', 'mouseout', function() { 
			$('shSolutions4').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shSolutions5')) {
		Event.observe('shSolutions5', 'mouseover', function() { 
			$('shSolutions5').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shSolutions5', 'mouseout', function() { 
			$('shSolutions5').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shSolutions7')) {
		Event.observe('shSolutions7', 'mouseover', function() { 
			$('shSolutions7').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shSolutions7', 'mouseout', function() { 
			$('shSolutions7').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shStore1')) {
		Event.observe('shStore1', 'mouseover', function() { 
			$('shStore1').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shStore1', 'mouseout', function() { 
			$('shStore1').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shStore2')) {
		Event.observe('shStore2', 'mouseover', function() { 
			$('shStore2').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shStore2', 'mouseout', function() { 
			$('shStore2').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shStore3')) {
		Event.observe('shStore3', 'mouseover', function() { 
			$('shStore3').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shStore3', 'mouseout', function() { 
			$('shStore3').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shStore4')) {
		Event.observe('shStore4', 'mouseover', function() { 
			$('shStore4').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shStore4', 'mouseout', function() { 
			$('shStore4').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shStore5')) {
		Event.observe('shStore5', 'mouseover', function() { 
			$('shStore5').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shStore5', 'mouseout', function() { 
			$('shStore5').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shMyAccount')) {
		Event.observe('shMyAccount', 'mouseover', function() { 
			$('shMyAccount').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shMyAccount', 'mouseout', function() { 
			$('shMyAccount').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shMyOrders2')) {
		Event.observe('shMyOrders2', 'mouseover', function() { 
			$('shMyOrders2').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shMyOrders2', 'mouseout', function() { 
			$('shMyOrders2').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shMyInformation')) {
		Event.observe('shMyInformation', 'mouseover', function() { 
			$('shMyInformation').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shMyInformation', 'mouseout', function() { 
			$('shMyInformation').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shMyPreferences')) {
		Event.observe('shMyPreferences', 'mouseover', function() { 
			$('shMyPreferences').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shMyPreferences', 'mouseout', function() { 
			$('shMyPreferences').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	if ($('shSignOut')) {
		Event.observe('shSignOut', 'mouseover', function() { 
			$('shSignOut').addClassName('SiteHeaderPanelLinkHover');
		});
		Event.observe('shSignOut', 'mouseout', function() { 
			$('shSignOut').removeClassName('SiteHeaderPanelLinkHover');
		});
	}
	
	/* Evidon ad icon JS */
	if (($('_bapw-link') != null) && (hideEvidon != true)) {
		$('_bapw-link').show();

		(function () {
			var adobe_host = window.location.hostname;
			if ((adobe_host == "www.adobe.com") || (adobe_host == "adobe.com") || (adobe_host == "get.adobe.com") || (adobe_host == "kb2.adobe.com") || (adobe_host == "community.adobe.com") || (adobe_host == "helpx.adobe.com")) {
				page_id = "86";
			} else {
				page_id = "126";
			}
			
			var d = document,
				pixel,
				URL_SCHEME = (d.location.protocol == 'https:' ? 'https' : 'http'),
				CDN_URL = (URL_SCHEME == 'https' ? 'https://info.evidon.com/c/betrad/pub/' : 'http://cdn.betrad.com/pub/');
		
			d.getElementById('_bapw-link').onclick = function () {
				var link = this;
		
				function appendScript(url, callback) {
					var head = d.getElementsByTagName('head')[0] || d.documentElement,
						loaded = false,
						script = d.createElement('script');
		
					function onload() {
						script.onload = script.onreadystatechange = null;
						head.removeChild(script);
		
						callback();
					}
		
					script.src = url;
					script.onreadystatechange = function () {
						if (!loaded && (this.readyState == 'loaded' || this.readyState == 'complete')) {
							loaded = true;
							onload();
						}
					};
					script.onload = onload;
		
					head.insertBefore(script, head.firstChild);
				}
		
				this.onclick = 'return false';
		
				appendScript(URL_SCHEME+'://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js', function () {
					appendScript(CDN_URL+'pub1.js', function () {
						BAPW.i(link, { pid: page_id, ocid: 414 }, false);
					});
				});
		
				return false;
			};
		
			pixel = d.createElement('img');
			pixel.src = URL_SCHEME+'://l.betrad.com/pub/p.gif?pid='+page_id+'&ocid='+'414'+'&ii=1&r='+Math.random();
			pixel.height = '1';
			pixel.width = '1';
			pixel.className = 'SiteFooterEvidonPixel';
			d.body.appendChild(pixel);
		}());
	}
});

if (!window.XMLHttpRequest) {
	Event.observe(window, 'load', function() {
		if ($$('div.SiteHeaderDropdownLink')) {
			$$('div.SiteHeaderDropdownLink').each( function(e) {
				Event.observe(e, 'mouseenter', function() {
					Element.addClassName(e, 'hover');
					$$('select').each( function(st) {
						st.setStyle({visibility: 'hidden'});
					});
				});
				Event.observe(e, 'mouseleave', function() {
					Element.removeClassName(e, 'hover');
					$$('select').each( function(st) {
						st.setStyle({visibility: 'visible'});
					});
				});
			});
		}
	});
}

function changeRegion(regioncode) {
	if (regioncode.startsWith('be_')) {
		adobe.Cookie.set('international', regioncode, 365, '/', '.adobe.com');
		adobe.Cookie.set('storeregion', 'be', 365, '/', '.adobe.com');
	}
	else if (regioncode.startsWith('ca')) {
		adobe.Cookie.set('international', regioncode, 365, '/', '.adobe.com');
		adobe.Cookie.set('storeregion', 'ca', 365, '/', '.adobe.com');
	}
	else if (regioncode.startsWith('eeur')) {
		adobe.Cookie.set('international', regioncode, 365, '/', '.adobe.com');
		adobe.Cookie.set('storeregion', 'eu', 365, '/', '.adobe.com');
	}
	else if (regioncode.startsWith('hk_')) {
		adobe.Cookie.set('international', regioncode, 365, '/', '.adobe.com');
		adobe.Cookie.set('storeregion', 'cn', 365, '/', '.adobe.com');
	}
	else if (regioncode.startsWith('lu_')) {
		adobe.Cookie.set('international', regioncode, 365, '/', '.adobe.com');
		adobe.Cookie.set('storeregion', 'lu', 365, '/', '.adobe.com');
	}
	else if (regioncode.startsWith('uk')) {
		adobe.Cookie.set('international', regioncode, 365, '/', '.adobe.com');
		adobe.Cookie.set('storeregion', 'gb', 365, '/', '.adobe.com');
	}
	else {
		adobe.Cookie.set('international', regioncode, 365, '/', '.adobe.com');
		adobe.Cookie.set('storeregion', regioncode, 365, '/', '.adobe.com');
	}
	
	var currURL = window.location.pathname;
	var currPath = currURL;
	var geoArray = ["africa","ap","at","au","be_en","be_fr","be_nl","bg","br","ca","ca_fr","ch_de","ch_fr","ch_it","cn","cz","de","dk","eeurope","ee","es","fi","fr","hk_en","hk_zh","hr","hu","ie","il_en","in","it","jp","kr","la","lt","lu_de","lu_en","lu_fr","lv","mena_en","mena_fr","mx","nl","no","nz","pl","pt","ro","rs","ru","si","se","sea","sk","tr","tw","ua","uk"];

	geoArray.each(function(item) {
		if (currURL.startsWith('/'+item+'/')) {
			currPath = currURL.replace('/'+item+'/','/');
			throw $break;
		}
	});
	
	if ((currPath.startsWith('/cfusion')) && (regioncode == 'us')) {
		newURL = "/";
		homeURL = "/";
	}
	else if ((currPath.startsWith('/cfusion')) && (regioncode != 'us')) {
		newURL = "/" + regioncode + "/";
		homeURL = "/" + regioncode + "/";
	}
	else if (regioncode != 'us') {
		newURL = "/" + regioncode + currPath;
		homeURL = "/" + regioncode + "/";
	} 
	else {
		newURL = currPath;
		homeURL = "/";
	}
	
	new Ajax.Request(newURL, {
		method: 'get',
		onSuccess: function(response) {
			window.location = newURL;
		},
		onFailure: function(response) {
			window.location = homeURL;
		}
	});
}

/* 	DEVICE_DETECTION2.JS
	$Id: //depot/projects/dylan/releases/rc_12_4/ubi/template/identity/device_detection2.js#1 $

	This library is designed to give you three pieces of information:

	a. info.device -- the name/ID of the specific device: e.g. "Motorola Droid"
	b. info.os -- the name/ID of the operating system, e.g. "Android"
	c. info.category -- what class of device this is (mobile, tablet, desktop, appliance, etc.)
*/

/* version 0.9
   4/16/2010 - ABE
   added winOSFamily to desktopDeviceCategory
   changed categories sequence to detect desktops first -- and will set deviceCategory=unknownDeviceCategory.id if no match can be found.
*/

/* TODO: incorporate all known desktop OS's  --> good resource is http://www.geekpedia.com/code47_Detect-operating-system-from-user-agent-string.html */
/*
        'Windows 3.11' => 'Win16',
        'Windows 95' => '(Windows 95)|(Win95)|(Windows_95)',
        'Windows 98' => '(Windows 98)|(Win98)',
        'Windows 2000' => '(Windows NT 5.0)|(Windows 2000)',
        'Windows XP' => '(Windows NT 5.1)|(Windows XP)',
        'Windows Server 2003' => '(Windows NT 5.2)',
        'Windows Vista' => '(Windows NT 6.0)',
        'Windows 7' => '(Windows NT 7.0)',
        'Windows NT 4.0' => '(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)',
        'Windows ME' => 'Windows ME',
        'Open BSD' => 'OpenBSD',
        'Sun OS' => 'SunOS',
        'Linux' => '(Linux)|(X11)',
        'Mac OS' => '(Mac_PowerPC)|(Macintosh)',
        'QNX' => 'QNX',
        'BeOS' => 'BeOS',
        'OS/2' => 'OS/2',
*/

/* Copyright (c) 2010 Adobe Systems Incorporated. * All rights reserved. * Permission is hereby granted, free of charge, to any person obtaining * a copy of this software and associated documentation files (the "Software"), * to deal in the Software without restriction, including without limitation * the rights to use, copy, modify, merge, publish, distribute, sublicense, * and/or sell copies of the Software, and to permit persons to whom the * Software is furnished to do so, subject to the following conditions: * The above copyright notice and this permission notice shall be included in * all copies or substantial portions of the Software. * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE * SOFTWARE. */

//	var droidDeviceProfile = {id:"Motorola Droid",frag:/droid build/};
//	var nexusDeviceProfile =  {id:"Google Nexus One",frag:/nexus one build/i};
//	var palmPreDeviceProfile = {id:"Palm Pre", frag:/525.27.1 pre/i};

	var droidDeviceProfile = {id:"Motorola Droid",frag:/droid build/};
	var nexusDeviceProfile =  {id:"Google Nexus One",frag:/Android 2/i};
	var palmPreDeviceProfile = {id:"Palm Pre", frag:/525.27.1 pre/i};
	var genericAndroid2DeviceProfile = {id:"Generic Android 2 device", frag:/Android 2/i}; 
	var genericAndroid1DeviceProfile = {id:"Generic Android 1 device", frag:/Android 1/i}; 
	var genericWebOSDeviceProfile = {id:"genericWebOS Device", frag:/webos/i}; 	
	
	var win311DeviceProfile = {id:"Windows 3.11",frag:/win16/i};
	var win95ADeviceProfile = {id:"Windows 95",frag:/windows 95/i};
	var win95BDeviceProfile = {id:"Windows 95",frag:/win95/i};
	var win95CDeviceProfile = {id:"Windows 95",frag:/win_95/i};
	var win2000ADeviceProfile = {id:"Windows 2000",frag:/windows 2000/i};
	var win2000BDeviceProfile = {id:"Windows 2000",frag:/windows nt 5.0/i};

	var winServer2003DeviceProfile = {id:"Windows Server 2003",frag:/windows nt 5.2/i};
	
	var winNT40ADeviceProfile = {id:"Windows NT 4.0",frag:/windows nt 4.0/i};
	var winNT40BDeviceProfile = {id:"Windows NT 4.0",frag:/winnt/i};
	var winNT40CDeviceProfile = {id:"Windows NT 4.0",frag:/windows nt/i}; // need to make sure this gets processed last as it would otherwise prevent correct id
	// of windows 2000 for example or replace with regular expression that is more strict.

	var winmeDeviceProfile = {id:"Windows ME",frag:/windows me/i};

	var openBSDDeviceProfile = {id:"OpenBSD",frag:/openbsd/i};
	var sunOSDeviceProfile = {id:"Sun OS",frag:/sunos/i};
	var linuxADeviceProfile = {id:"Linux",frag:/linux/i};
	var linuxBDeviceProfile = {id:"Linux",frag:/x11/i};
	var QNXDeviceProfile = {id:"QNX",frag:/qnx/i};
	var beosDeviceProfile = {id:"BeOS",frag:/beos/i};
	var os2DeviceProfile = {id:"OS2",frag:/OS\/2/i};

	var winxpDeviceProfile = {id:"Windows XP",frag:/windows xp/i};
	var winxp2DeviceProfile = {id:"Windows XP",frag:/windows nt 5.1/i};
	var win7ADeviceProfile = {id:"Windows 7",frag:/windows nt 6.1/i};
	var win7BDeviceProfile = {id:"Windows 7",frag:/windows nt 7.01/i};
	var winvistaDeviceProfile = {id:"Windows Vista",frag:/windows nt 6.0/i};
	
	var macosx106DeviceProfile =  {id:"Snow Leopard",frag:/mac os x 10.6/i};
	var macosx105DeviceProfile =  {id:"Leopard",frag:/mac os x 10.5/i};
	var macosA = {id:"Mac OS",frag:/mac_powerpc/i};
	var macosB = {id:"Mac OS",frag:/macintosh/i};

/* OPERATING SYSTEMS */
	
	var androidOSFamily = {id:"Android OS",frag:/android /i,devices:[droidDeviceProfile,nexusDeviceProfile,genericAndroid1DeviceProfile,genericAndroid2DeviceProfile]};
		
	var webOSFamily = {id:"webOS",frag:/webOS\/1.3.5/i,devices:[palmPreDeviceProfile, genericWebOSDeviceProfile]};
	
	var macOSFamily = {id:"Mac OS",frag:/mac os/i,devices:[macosx105DeviceProfile,macosx106DeviceProfile,macosA, macosB]};

	var winOSFamily = {id:"Windows",frag:/windows/i,devices:[winxpDeviceProfile,winxp2DeviceProfile,win7ADeviceProfile,win7BDeviceProfile,winvistaDeviceProfile,win311DeviceProfile,win95ADeviceProfile,win95BDeviceProfile,win95CDeviceProfile,winServer2003DeviceProfile,winNT40ADeviceProfile,winNT40BDeviceProfile,winNT40CDeviceProfile,winmeDeviceProfile]};

	var linuxOSFamily = {id:"Linux",frag:/linux/i,devices:[openBSDDeviceProfile,sunOSDeviceProfile,linuxADeviceProfile, linuxBDeviceProfile, QNXDeviceProfile,beosDeviceProfile,os2DeviceProfile]};

/* CATEGORIES */

	var desktopDeviceCategory = {id:"Desktop",osFamilies:[macOSFamily,winOSFamily,linuxOSFamily]};
	
	var mobileDeviceCategory = {id:"Mobile",osFamilies:[androidOSFamily,webOSFamily]};
	
	var unknownDeviceCategory = {id:"Unidentified Platform"};
	
	var categories = [mobileDeviceCategory,desktopDeviceCategory /*,mobileDeviceCategory*/];

/*
	function StringBuffer() {
		this.__strings__ = new Array;
	}
	
	StringBuffer.prototype.append = function (str) {
		this.__strings__.push(str);
	};
	
	StringBuffer.prototype.toString = function () {
		return this.__strings__.join("");
	};


	function isdefined( variable)
	{
		return (typeof(window[variable]) == "undefined")?  false: true;
	}

	function displayOrientation() {
		var err = "";
		try {
			var c = context;
	
	
			if(isDefined(context)) {
				if(isDefined(context.getResources())) {
					if(isDefined(context.getResources().getConfiguration())) {
						var orientation= context.getResources().getConfiguration();
						if(isdefined(orientation)) {
							
							document.write("orientation: "+orientation);
						} else {
							err = "no orientation";
						}
					} else {
						err = "no configuration";
					}
				} else {
					err = "no resources";
				} 
			} else {
				err = "no context";
			}
			mylog("err: "+err);
		} catch (e) {
		  mylog("no display orientation data available");
  		  return;
		}


	}
	
	function mylog(s) {
		document.write('<div style="color:grey">'+s+'</div>');
	}

	function dumpDeviceInfo() {
		var buf;
// 	document.write('<div style="color:white">checkpoint dump1</div>');
		try {
			var Build = android.os.Build;
			if(isdefined(Build)) {
// 	document.write('<div style="color:white">checkpoint dump2</div>');
				buf = new StringBuffer();
				buf.append("VERSION.RELEASE {"+Build.VERSION.RELEASE+"}");
				buf.append("\nVERSION.INCREMENTAL {"+Build.VERSION.INCREMENTAL
				+"}");
				buf.append("\nVERSION.SDK {"+Build.VERSION.SDK+"}");
				buf.append("\nBOARD {"+Build.BOARD+"}");
				buf.append("\nBRAND {"+Build.BRAND+"}");
				buf.append("\nDEVICE {"+Build.DEVICE+"}");
				buf.append("\nFINGERPRINT {"+Build.FINGERPRINT+"}");
				buf.append("\nHOST {"+Build.HOST+"}");
				buf.append("\nID {"+Build.ID+"}");
				
				mylog("build:"+buf);
			}
		} catch(e) {
//			document.write('<div style="color:white">checkpoint dump3</div>');
			mylog("no device info available");
			return;
		}
	}
	
*/

	function identifyDevice(d,ua) {
//		document.write('<div style="color:white">'+d.frag+' =? '+ua+'</div>');
  		if (ua.search(d.frag) > -1) {
//			document.write('<div style="color:white">MATCH!</div>');
		  	return {device:d.id};
		} else
		  return null;
	}

	function identifyOS(os,ua) {
		var deviceInfo=null;
		var olen = os.devices.length;
		for(var k=0;k<olen;k++) {
			deviceInfo = identifyDevice(os.devices[k],ua);
			if(deviceInfo!=null) break;
		}
		if(deviceInfo!=null) deviceInfo.os = os.id;
		return deviceInfo;
	}

	function identifyCategory(cat,ua) {
		var osInfo=null;
		var jlen = cat.osFamilies.length;
		for(var j=0;j<jlen;j++) {
			osInfo = identifyOS(cat.osFamilies[j],ua);
			if(osInfo!=null) break;
		}
		if(osInfo!=null) osInfo.category = cat.id;
		return osInfo;
	}

	function identifyCategories(cats,ua) {
		var categoryInfo=null;
		var clen = cats.length;
		for(var i=0;i<clen;i++) {
			categoryInfo = identifyCategory(cats[i],ua);
			if(categoryInfo!=null) break;
		}
		
		if(!categoryInfo) categoryInfo = {};
		if(!categoryInfo.device) categoryInfo.device='unknown';
		if(!categoryInfo.os) categoryInfo.os = 'unknown';
		if(!categoryInfo.category) categoryInfo.category = unknownDeviceCategory.id;
		return categoryInfo;
	}
	
	
	// external method
	// returns an object that should contain
	//		category (such as 'Desktop' or 'Mobile'
	//		os			(such as 'Windows', 'Mac OS', 'Android', etc.
	//		device		(such as 'Windows XP','Android', etc.
	
	// TBD:
	//		osversion
	//		carrier
	//		deviceregion
	
	function getCategoriesInfo() {
		return identifyCategories(categories, navigator.userAgent.toLowerCase());
	}
	
	function displayCategoriesInfo() {
		alert('isDesktop:'+isDesktop()  + ', os:' + info.os + ', device:' + info.device);
	} 
	
	function isDroid() {
		return (info.device==droidDeviceProfile.id);
	}
	
	function isNexus() {
		return(info.device==nexusDeviceProfile.id);
	}
	
	function isDesktop() {
		return(info.category==desktopDeviceCategory.id);
	}
	
	function isLinuxDesktop() {
		return(info.os==linuxOSFamily.id);
	}
		
	
	function isWinDesktop() {
		return(info.os==winOSFamily.id);
	}
	
	function isMacDesktop() {
		return(info.os==macOSFamily.id);
	}
	
	function simulateDroid() {
		info.device = droidDeviceProfile.id;
		info.category = mobileDeviceCategory.id;
		info.os = androidOSFamily.id;
	} 

var info = getCategoriesInfo();
if(isDesktop() != true ) { 
	adobe.Loader.requireAsset("/ubi/template/identity/adobe/screen/gnavMobileFix.css", { media: "screen" });
}
