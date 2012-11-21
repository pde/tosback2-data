
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
