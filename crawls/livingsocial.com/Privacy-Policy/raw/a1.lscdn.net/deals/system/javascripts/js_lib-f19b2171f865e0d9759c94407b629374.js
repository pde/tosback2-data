/**
* A simple, small functional object to reduce duplication in our code.
* If adding to this object, please try to keep the code small, as it
* will be loaded pre DOM.
*
* TODO: Add support for iteration over objects!
*/
var $f = {
  foldl : function(a, init, f) {
    if (!a) { return []; }

    var result = init;
    $f.foreach(a, function(v, i) {
      result = f(result, v, i);
    });
    return result;
  },
  map : function(a, f) {
    if (!a) { return []; }

    var result = [];
    $f.foreach(a, function(v) {
      result.push(f(v));
    });
    return result;
  },
  filter : function(a, f) {
    if (!a) { return []; }

    return $f.foldl(a, [], function(init, v) {
      return f(v) ? $f.append(init, v) : init;
    });
  },
  foreach : function(a, f) {
    if (!a) { return []; }

    for (var i=0; i < a.length; i++) {
      f(a[i], i);
    }
    return a;
  },
  append : function(a, v) {
    if (!a) { return []; }

    a.push(v);
    return a;
  }
};;/*
* LSNamespace
*
* Namespaces a value to the specified object depth
*
*   @keyString        =>  String representing . object access to a given depth
*   @value            =>  Value to be set at the given depth
*
* Usage :
*
*                     LSNamespace("LS.foo.bar", {get : function() { return "foo" } } );
*                     window.LS = {
*                       _class: "LS",
*                       foo: {
*                         _class: "foo",
*                         bar: {
*                           get : function() { return "foo"; }
*                         }
*                       }
*                     }
*/
function LSNamespace(keyString, value) {
  var allKeys     = keyString.split("."),
      key         = allKeys.slice(allKeys.length -1),
      objectKeys  = allKeys.slice(0, allKeys.length -1);

  function namespaceObjectKeys() {
    return $f.foldl(objectKeys, window, function(init, v) {
      var o = init[v];
      if (typeof(o) == "undefined" || o == null) {
        init[v] = {"_class" : v};
      } else if (typeof(init[v]) !== "object") {
        throw "[LSNamespace] The " + init + "[" + v + "] namespace is already in use for something over than an object";
      }
      return init[v];
    });
  }

  function setFinalKey(finalObject, finalKey) {
    var finalValue = finalObject[finalKey];
    if(typeof(finalValue) !== "undefined" && finalValue != null) {
      throw("[LSNamespace] The final key has already been set to : " + finalValue)
    } else { finalObject[key] = value; return finalObject; }
  }

  return setFinalKey(namespaceObjectKeys(), key);
};/**
 * Based on the jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

 (function() {
  LSNamespace("LS.cookie", function(key, value, options) {
    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = options || {};

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '; path=/',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
  })
 })();
;var ObjectExtensions = {
  nativeMerge : function(o1, o2) {
    for (var prop in o2) {
      if(o2.hasOwnProperty(prop)) {
        var value = o2[prop];

        if (o1.hasOwnProperty(prop)) {
          // both objects have the same property
          if(typeof(value) === "object" && typeof(o1[prop]) == "object") {
            // if both objects have values which are objects, copy them to a new objects
            o1[prop] = ObjectExtensions.merge(o1[prop], value);
          } else if (value !== "" && value !== null) {
            // if both objects have the same property, the second object's value is used unless it is null
            o1[prop] = value;
          }
        } else {
          if(typeof(value) === "object") {
            // if object value is an object, copy the object
            o1[prop] = ObjectExtensions.nativeMerge(new Object(), value);
          } else {
            o1[prop] = value;
          }
        }
      }
    }
    return o1;
  },
  merge : function(o1, o2) {
    return ObjectExtensions.nativeMerge(ObjectExtensions.nativeMerge(new Object(), o1), o2);
  },
  toQueryString : function(obj) {
    var params = [];
    for(var key in obj) {
      var value = obj[key];
      if((value !== null) && (typeof(value) !== "undefined")) { params.push(encodeURIComponent(key + "=" + String(value))); }
    }
    return params.join("&");
  }
};;(function() {
  LSNamespace("LS.queryString", function() {
    function parseURL() {
      var   urlParams = {},
          e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
          q = window.location.search.substring(1);

      while (e = r.exec(q)) { urlParams[d(e[1])] = d(e[2]); }
      return urlParams;
    }
    return parseURL();
  }());
})();;if (!window.JSON) {
  var JSON;JSON||(JSON={});
(function(){function k(a){return a<10?"0"+a:a}function o(a){p.lastIndex=0;return p.test(a)?'"'+a.replace(p,function(a){var c=r[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function l(a,j){var c,d,h,m,g=e,f,b=j[a];b&&typeof b==="object"&&typeof b.toJSON==="function"&&(b=b.toJSON(a));typeof i==="function"&&(b=i.call(j,a,b));switch(typeof b){case "string":return o(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if(!b)return"null";
e+=n;f=[];if(Object.prototype.toString.apply(b)==="[object Array]"){m=b.length;for(c=0;c<m;c+=1)f[c]=l(c,b)||"null";h=f.length===0?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if(i&&typeof i==="object"){m=i.length;for(c=0;c<m;c+=1)typeof i[c]==="string"&&(d=i[c],(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h))}else for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h);h=f.length===0?"{}":e?"{\n"+e+f.join(",\n"+e)+"\n"+g+"}":"{"+f.join(",")+
"}";e=g;return h}}if(typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+k(this.getUTCMonth()+1)+"-"+k(this.getUTCDate())+"T"+k(this.getUTCHours())+":"+k(this.getUTCMinutes())+":"+k(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,n,r={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,j,c){var d;n=e="";if(typeof c==="number")for(d=0;d<c;d+=1)n+=" ";else typeof c==="string"&&(n=c);if((i=j)&&typeof j!=="function"&&(typeof j!=="object"||typeof j.length!=="number"))throw Error("JSON.stringify");return l("",
{"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,e){function c(a,d){var g,f,b=a[d];if(b&&typeof b==="object")for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=c(b,g),f!==void 0?b[g]=f:delete b[g]);return e.call(a,d,b)}var d,a=String(a);q.lastIndex=0;q.test(a)&&(a=a.replace(q,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return d=eval("("+a+")"),typeof e==="function"?c({"":d},""):d;throw new SyntaxError("JSON.parse");}})();
}
;/*
* LSEventQueue
*
* Provides a convenience global event queue
*
* Usage :
*
*   .push
*
*   @eventType        => (String)             (required)  : The event key
*   @eventString      => (String)             (required)  : An event string
*   @optionalData     => (JavaScript object)  (optional)  : Object containing additional event data
*
*   Examples:
*                     LS.eventQueue.push("eventType", "eventString", {meta : "data"}).push("eventType", "eventString2");
*                       => LSEventQueue for chaining pushes
*
*   .get
*
*     @eventType      => (String)             (required)  : The event key
*     @eventString    => (String)             (optional)  : An event string
*
*     Examples:
*                     LS.eventQueue.get("eventType")
*                       =>  [
*                             {event : "eventString", meta : "data", type : "eventType"},
*                             {event : "eventString2", meta : "data", type : "eventType"}
*                           ]
*
*                     LS.eventQueue.get("eventType", "eventString2")
*                       =>  [
*                             {event : "eventString2", meta : "data", type : "eventType"}
*                           ]
*
*     Notes:
*                     * .get does not remove the events from the queue; use .pop to remove the retrieved events from the
*                       queue in addition to retrieving them.
*
*   .pop
*
*     Notes:
*                     * Functions identically to .get except that it will remove the found events from the queue in
*                       addition to returning them.
*/
(function() {
  window.LSEventQueue = function(){
    var events = {};

    function removeEventType(t) {
      delete(events[t]);
    }

    function removeEventEntry(t, s) {
      events[t] = $f.filter(events[t], function(v) { return (v.event !== s); });
    }

    function withCleanup(result, remove, remover) {
      return remove ? function() { remover(); return result; }() : result;
    }

    function get(t, s, remove) {
      var stringSupplied  = (typeof(s) !== "undefined" && s != null),
          eventsForType   = events[t] || [],
          result          = null;

      if (eventsForType && stringSupplied) {
        result = $f.filter(eventsForType, function(v) { return (v.event === s); });
        return withCleanup(result, remove, function() { removeEventEntry(t, s); });
      } else if (eventsForType) {
        return withCleanup(eventsForType, remove, function() { removeEventType(t); });
      } else {
        return [];
      }
    }

    function push(t, s, add) {
      add = add || {};
      var eventsForType = events[t],
          data          = ObjectExtensions.merge({"type" : t, "event" : s}, add);

      events[t] = eventsForType ? $f.append(eventsForType, data) : [data];
      return result;
    }

    var result = {
      push      : push,
      get       : function(t, s) { return get(t, s, false); },
      pop       : function(t, s) { return get(t, s, true); },
      reset     : function()     { events = {}; },
      events    : function()     { return events; },
      "_class"  : "LSEventQueue"
    };
    return result;
  };
  LSNamespace("LS.eventQueue", LSEventQueue());
})();;