
/**
 * @provides Array.prototype
 * @polyfill old ie8
 */

/**
 * http://es5.github.com/#x15.4.4.19
 */
if (!Array.prototype.map) {
  Array.prototype.map = function(func, context) {
    if (typeof func != 'function') {
      throw new TypeError();
    }

    var ii;
    var len = this.length;
    var r   = new Array(len);
    for (ii = 0; ii < len; ++ii) {
      if (ii in this) {
        r[ii] = func.call(context, this[ii], ii, this);
      }
    }

    return r;
  };
}

/**
 * http://es5.github.com/#x15.4.4.18
 */
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(func, context) {
    this.map(func, context);
  };
}

/**
 * http://es5.github.com/#x15.4.4.20
 */
if (!Array.prototype.filter) {
  Array.prototype.filter = function(func, context) {
    if (typeof func != 'function') {
      throw new TypeError();
    }

    var ii, val, len = this.length, r = [];
    for (ii = 0; ii < len; ++ii) {
      if (ii in this) {
        // Specified, to prevent mutations in the original array.
        val = this[ii];
        if (func.call(context, val, ii, this)) {
          r.push(val);
        }
      }
    }

    return r;
  };
}

/**
 * http://es5.github.com/#x15.4.4.16
 */
if (!Array.prototype.every) {
  Array.prototype.every = function(func, context) {
    if (typeof func != 'function') {
      throw new TypeError();
    }
    var t = new Object(this);
    var len = t.length;
    for (var ii = 0; ii < len; ii++) {
      if (ii in t) {
        if (!func.call(context, t[ii], ii, t)) {
          return false;
        }
      }
    }
    return true;
  };
}

/**
 * http://es5.github.com/#x15.4.4.17
 */
if (!Array.prototype.some) {
  Array.prototype.some = function(func, context) {
    if (typeof func != 'function') {
      throw new TypeError();
    }
    var t = new Object(this);
    var len = t.length;
    for (var ii = 0; ii < len; ii++) {
      if (ii in t) {
        if (func.call(context, t[ii], ii, t)) {
          return true;
        }
      }
    }
    return false;
  };
}

/**
 * http://es5.github.com/#x15.4.4.14
 */
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(val, index) {
    var len = this.length;
    index |= 0;

    if (index < 0) {
      index += len;
    }

    for (; index < len; index++) {
      if (index in this && this[index] === val) {
        return index;
      }
    }
    return -1;
  };
}

/**
 * @provides String.prototype
 * @polyfill old ie8 ff3
 */

/**
 * Trims white space on either side of this string.
 *
 * http://es5.github.com/#x15.5.4.20
 */
if (!String.prototype.trim) {
  String.prototype.trim = function() {
    if (this == null) {
      throw new TypeError('String.prototype.trim called on null or undefined');
    }
    return String.prototype.replace.call(this, /^\s+|\s+$/g, '');
  };
}

/**
 * @provides String.prototype.split
 * @polyfill old ie8 ff3 ff4
 * @nolint
 */

(function () {
  /*!
   * Cross-Browser Split 1.1.1
   * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
   * Available under the MIT License
   * ECMAScript compliant, uniform cross-browser split method
   */

  /**
   * Splits a string into an array of strings using a regex or string separator. Matches of the
   * separator are not included in the result array. However, if `separator` is a regex that contains
   * capturing groups, backreferences are spliced into the result each time `separator` is matched.
   * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
   * cross-browser.
   * @param {String} str String to split.
   * @param {RegExp|String} separator Regex or string to use for separating the string.
   * @param {Number} [limit] Maximum number of items to include in the result array.
   * @returns {Array} Array of substrings.
   * @example
   *
   * // Basic use
   * split('a b c d', ' ');
   * // -> ['a', 'b', 'c', 'd']
   *
   * // With limit
   * split('a b c d', ' ', 2);
   * // -> ['a', 'b']
   *
   * // Backreferences in result array
   * split('..word1 word2..', /([a-z]+)(\d+)/i);
   * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
   */

  var undef;
  var nativeSplit = String.prototype.split;
  // NPCG: nonparticipating capturing group
  var compliantExecNpcg = /()??/.exec("")[1] === undef;

  String.prototype.split = function(separator, limit) {
      var str = this;

      // If `separator` is not a regex, use `nativeSplit`
      if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
          return nativeSplit.call(str, separator, limit);
      }
      var output = [],
          flags = (separator.ignoreCase ? "i" : "") +
                  (separator.multiline  ? "m" : "") +
                  (separator.extended   ? "x" : "") + // Proposed for ES6
                  (separator.sticky     ? "y" : ""), // Firefox 3+
          lastLastIndex = 0,
          // Make `global` and avoid `lastIndex` issues by working with a copy
          separator = new RegExp(separator.source, flags + "g"),
          separator2, match, lastIndex, lastLength;
      str += ""; // Type-convert
      if (!compliantExecNpcg) {
          // Doesn't need flags gy, but they don't hurt
          separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
      }
      /* Values for `limit`, per the spec:
       * If undefined: 4294967295 // Math.pow(2, 32) - 1
       * If 0, Infinity, or NaN: 0
       * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
       * If negative number: 4294967296 - Math.floor(Math.abs(limit))
       * If other: Type-convert, then use the above rules
       */
      limit = limit === undef ?
          -1 >>> 0 : // Math.pow(2, 32) - 1
          limit >>> 0; // ToUint32(limit)
      while (match = separator.exec(str)) {
          // `separator.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
              output.push(str.slice(lastLastIndex, match.index));
              // Fix browsers whose `exec` methods don't consistently return `undefined` for
              // nonparticipating capturing groups
              if (!compliantExecNpcg && match.length > 1) {
                  match[0].replace(separator2, function () {
                      for (var i = 1; i < arguments.length - 2; i++) {
                          if (arguments[i] === undef) {
                              match[i] = undef;
                          }
                      }
                  });
              }
              if (match.length > 1 && match.index < str.length) {
                  Array.prototype.push.apply(output, match.slice(1));
              }
              lastLength = match[0].length;
              lastLastIndex = lastIndex;
              if (output.length >= limit) {
                  break;
              }
          }
          if (separator.lastIndex === match.index) {
              separator.lastIndex++; // Avoid an infinite loop
          }
      }
      if (lastLastIndex === str.length) {
          if (lastLength || !separator.test("")) {
              output.push("");
          }
      } else {
          output.push(str.slice(lastLastIndex));
      }
      return output.length > limit ? output.slice(0, limit) : output;
  };
})();


/**
 * @provides JSON
 * @polyfill old ff3 ie8
 */

/*
    http://www.JSON.org/json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jshint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = (eval)('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/**
 * @provides Function.prototype
 * @polyfill old ie8 ff3 webkit
 */

/**
 * A simulated implementation of Function.prototype.bind that is mostly ES5-
 * compliant. The [[Call]], [[Construct]], and [[HasInstance]] internal
 * properties differ, which means that the simulated implementation produces
 * different stack traces and behaves differently when used as a constructor.
 *
 * http://es5.github.com/#x15.3.4.5
 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function(context /*, args... */) {
    if (typeof this != 'function') {
      throw new TypeError('Bind must be called on a function');
    }
    var target = this;
    var appliedArguments = Array.prototype.slice.call(arguments, 1);
    function bound() {
      return target.apply(
        context,
        appliedArguments.concat(Array.prototype.slice.call(arguments)));
    }
    bound.displayName = 'bound:' + (target.displayName || target.name || '(?)');
    bound.toString = function toString() {
      return 'bound: ' + target;
    };
    return bound;
  };
}

/**
 * @provides Array
 * @polyfill old ie8 ff3
 */

/**
 * Returns true if the given value is an array.
 *
 * http://es5.github.com/#x15.4.3.2
 */
if (!Array.isArray) {
  Array.isArray = function(object) {
    return Object.prototype.toString.call(object) == '[object Array]';
  };
}

/**
 * @provides console
 * @polyfill old ie8 ff3
 */

/**
 * Mock implementation of console replacing methods with an empty function.
 * In production we strip all calls to console.<X>.
 */
var console;
if (!console) {
  (function() {
    function empty() {}
    console = {
      log : empty,
      info : empty,
      warn : empty,
      debug : empty,
      dir : empty,
      error : empty
    };
  })();
}

/**
 * @provides Date
 * @polyfill old ie8
 */

/**
 * Returns a number representing the current UTC time.
 *
 * http://es5.github.com/#x15.9.4.4
 */
if (!Date.now) {
  Date.now = function() {
    return new Date().getTime();
  };
}

/**
 * @provides Object
 * @requires __DEV__
 * @polyfill old ie8 ff3
 */

/**
 * Creates a new object with the specified prototype object.
 *
 * http://es5.github.com/#x15.2.3.5
 */
if (!Object.create) {
  Object.create = function(proto) {
    if (__DEV__) {
      if (arguments.length > 1) {
        throw new Error(
          'Object.create implementation supports only the first parameter');
      }
    }
    var type = typeof proto;
    if (type != 'object' && type != 'function') {
      throw new TypeError('Object prototype may only be a Object or null');
    }
    var F = new Function();
    F.prototype = proto;
    return new F();
  };
}

/**
 * Returns an array of the given object's own enumerable properties.
 *
 * http://es5.github.com/#x15.2.3.14
 */
if (!Object.keys) {
  Object.keys = function(object) {
    var type = typeof object;
    if (type != 'object' && type != 'function' || object === null) {
      throw new TypeError('Object.keys called on non-object');
    }

    var keys = [];
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }

    // JScript in IE8 and below mistakenly skips over built-in properties.
    // https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute
    var hasDontEnumBug = !({toString: true}).propertyIsEnumerable('toString');
    var dontEnumProperties = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'prototypeIsEnumerable',
      'constructor'
    ];
    if (hasDontEnumBug) {
      for (var ii = 0; ii < dontEnumProperties.length; ii++) {
        var property = dontEnumProperties[ii];
        if (Object.prototype.hasOwnProperty.call(object, property)) {
          keys.push(property);
        }
      }
    }

    return keys;
  };
}


/**
 * Attempts to mutate frozen objects will be caught in modern browsers in
 * __DEV__.
 */
if (!Object.freeze) {
  Object.freeze = function(o) { };
}

/**
 * @provides __DEV__
 * @polyfill
 */

// Evade static analysis so that __DEV__ is not replaced below.
self['__DEV__'] = self['__DEV__'] || 0;

if (__DEV__) {
  if (self.__BOOTSTRAPPED__) {
    throw new Error(
      'The JavaScript bootstrapping environment can be included only once. ' +
      'Fix the page including it multiple times.'
    );
  }
  self.__BOOTSTRAPPED__ = true;
}

/**
 * @provides JSON-shield
 * @requires JSON
 * @polyfill
 */

/**
 * Added protection for some common (ab)uses of this function, applied on top
 * of the native implementation if possible.
 *
 * With the standard implementation,
 *   eval(JSON.stringify('\u2028'))
 * crashes (\u2028 is a newline in JS but not escaped in JSON), and
 *   location = 'javascript:alert(' + JSON.stringify(s) + ')';
 * is an XSS hole.
 */

// feature detection is better than a flag
if (JSON.stringify(["\u2028\u2029"]) === '["\u2028\u2029"]') {
  JSON.stringify = function(stringify){
    // no new RegExp and new function per each call
    var u2028 = /\u2028/g,
        u2029 = /\u2029/g;
    // the new version of stringify
    return function (any, replacer, space) {
      var json = stringify.call(this, any, replacer, space);
      if (json) {
        if (-1 < json.indexOf('\u2028')) {
          json = json.replace(u2028, '\\u2028');
        }
        if (-1 < json.indexOf('\u2029')) {
          json = json.replace(u2029, '\\u2029');
        }
      }
      return json;
    };
  }(JSON.stringify);
}

/**
 * @provides Function.prototype-shield
 * @requires __DEV__ Function.prototype
 * @polyfill
 */

/**
 * Fixes toString on bound functions in dev. Now when you call toString on a
 * bound function, you get the result of toStringing the bound function instead
 * of Function.prototype.bind.toString() itself (which always says
 * [native code])
 */
if (__DEV__) {
  (function(bind) {
    Function.prototype.bind = function() {
      var bound = bind.apply(this, arguments);
      bound.toString = bind.call(this.toString, this);
      return bound;
    };
  })(Function.prototype.bind);
}

/**
 * This is a very basic typechecker that does primitives as well as boxed
 * versions of the primitives.
 *
 * @provides TypeChecker
 * @typechecks
 * @polyfill
 */


/*globals __DEV__*/
/*TC*/
var __t = (function() {
  var toString = Object.prototype.toString;
  var handler;

  function getType(value) {
    var type;
    var subType;
    if (value === undefined) {
      type = 'undefined';
    } else if (value === null) {
      type = 'null';
    } else {
      type = typeof value;
      if (type === 'object') {
        if (typeof HTMLElement === 'object'
              ? value instanceof HTMLElement
              : value.nodeType === 1 &&
                typeof value.nodeName === 'string') {
          // If it's an HTMLElement, extract the subtype
           type = 'DOMElement';
           subType = value.nodeName.toUpperCase();
        } else {
          // else, check if it is actually an array
          type = toString.call(value).slice(8, -1);
          switch (type) {
            case 'Array':
              if (value.length) {
                subType = getType(value[0]);
              }
              // fall through
            case 'Object':
            case 'RegExp':
            case 'Date':
              type = type.toLowerCase();
              break;
          }
        }
      }
    }
    return subType
      ? type + '<' + subType + '>'
      : type;
  }

  function matches(expected, actual) {
    // Allow nullable types
    if (/null|undefined/.test(actual) && /\?$/.test(expected)) {
      return true;
    }

    // Normalize in order to match using the longest applicable selector
    expected = expected.replace(/>*$|\?|$/, '<');
    actual = actual.replace(/>*$|$/, '<');
    var len = Math.min(expected.length, actual.length);

    return expected.substring(0, len) === actual.substring(0, len);
  }

  function __t(/*args*/) {
    var args = Array.prototype.slice.call(arguments);
    var i = args.length;
    while (i--) {
      var expected = args[i][1];
      var actual = getType(args[i][0]);
      var name = args[i][2] || 'return value';

      if (!matches(expected, actual)) {
        var error = new TypeError('Type Mismatch for ' + name + ': expected ' +
          expected + ', actual ' + actual);
        if (handler) {
          try {
            throw error;
          } catch (e) {
            // Pop to the frame calling the checked function, or to the
            // checked function
            e.framesToPop = args[i][2] ? 2 : 1;
            handler(e);
          }
        } else {
          throw error;
        }
      }
    }

    // Always return the first value checked
    return args[0][0];
  }
  __t.setHandler = function(fn) {
    handler = fn;
  };
  return __t;
})();
/*/TC*/

/**
 * @provides Object-shield
 * @requires __DEV__ Object
 * @polyfill
 */

/**
 * Our Object.create polyfill does not support property descriptors, so we
 * cauterize the API for consistency.
 */
if (__DEV__) {
  if (!Object.create.__fb) {
    Object.create = function(original) {
      function create(proto) {
        if (arguments.length > 1) {
          throw new Error(
            'Object.create implementation supports only the first parameter');
        }
        return original.call(this, proto);
      }
      create.__fb = true;
      return create;
    }(Object.create);
  }
}
