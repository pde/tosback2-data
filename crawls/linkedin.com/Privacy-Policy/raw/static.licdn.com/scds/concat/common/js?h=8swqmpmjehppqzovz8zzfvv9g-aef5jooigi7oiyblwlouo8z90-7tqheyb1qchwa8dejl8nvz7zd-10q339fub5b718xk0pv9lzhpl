

/* 8swqmpmjehppqzovz8zzfvv9g */

window.track = window.track || {};

/**
 * Simple script fetching API for use with the tracking library
 * @author jbernardo
 *
 */
(function(track, window) {
  var FN_TYPE = typeof function(){};
  var load, head;

  head = document.getElementsByTagName('head')[0];
  track.load = load = {};

  load.script = function(url, callQueue) {
    var s = document.createElement('script');

    s.src = url;
    s.async = true;

    s.onreadystatechange = s.onload = function() {
      var i = 0, callback;

      if (!s.readyState || (s.readyState in {loaded: 1, complete: 1})) {
        // Clean up
        s.onload = s.onreadystatechange = null;
        head.removeChild(s);
        s = null;

        if (typeof(callQueue) === FN_TYPE) {
          callQueue();
        } else {
          // Invoke callQueue
          while (!!(callback = callQueue[i++])) {
            callback();
          }
        }
      }
    };

    head.appendChild(s);
  };

}(window.track, window));


/* aef5jooigi7oiyblwlouo8z90 */

window.track = window.track || {};

/**
 * User agent error tracking and reporting system. Provides method wrapping functionality to catch
 * any thrown errors as well as manual error pushing.
 *
 * Example 1 - Wrap a function by reference.
 *   myUtility.doSomething = track.errors.onMethod(function() {
 *     // Your code for myUtility.doSomething
 *   }, { code: 867, message: 'Error occurred in myUtility.doSomething' });
 *
 * Example 2 - Wrap a function by name.
 *   myUtility.doSomething = function() {
 *     // Your code for myUtility.doSomething
 *   };
 *
 *   track.errors.onMethodName('myUtility.doSomething', {
 *     code: 867,
 *     message: 'Error occurred in myUtility.doSomething'
 *   });
 *
 * Example 3 - Manually push your errors.
 *   myUtility.doSomething = function() {
 *     try {
 *       // Your code for myUtility.doSomething
 *     } catch (err) {
 *       track.errors.push({ code: 867, message: 'Error occurred in myUtility.doSomething' });
 *     }
 *   });
 *
 * @author jbernardo
 *
 */
(function(track, window) {
  // TODO Add batching mechanism if traffic is high
  var FN_TYPE = typeof function(){};
  var vars, callQueue;

  // Set up evironment variables
  function bootstrap(name) {
    var i, head, node, nodes, ret;

    ret = {reportUrl: null, libUrl: null, originTreeId: null};

    head = document.getElementsByTagName('head')[0];
    nodes = head.getElementsByTagName('meta');

    // NodeList, backwards iteration
    for (i = nodes.length-1; i >= 0; --i) {
      node = nodes[i];

      if (name === node.name) {
        ret.libUrl = node.content;
        if (!ret.libUrl) { return; }
        head.removeChild(node);
      } else if ('lnkd-track-error' === node.name) {
        ret.reportUrl = node.content;
        if (!ret.reportUrl) { return; }
        head.removeChild(node);
      } else if ('treeID' === node.name) {
        ret.originTreeId = node.content;
      } else if ('appName' === node.name) {
        ret.appName = node.content;
      }
    }

    // Nowhere to report to, no point
    if (!ret.reportUrl) { return; }
    return ret;
  }

  // Get the current pageKey
  function pagekey() {
    var nodes, node, i;

    if (!vars.pageKey) {
      // Attempt to read it off the <body> tag
      if (document.body.id && (document.body.id.indexOf('pagekey') === 0)) {
        vars.pageKey = document.body.id.substring(8);
      } else {
        // Not on the body tag, try any <meta> tags
        nodes = document.getElementsByTagName('head')[0].getElementsByTagName('meta');

        for (i = nodes.length-1; i >= 0; --i) {
          node = nodes[i];

          if ('pageKey' === node.name) {
            vars.pageKey = node.content;
            break;
          }
        }
      }
    }

    return vars.pageKey;
  }

  vars = bootstrap(window.JSON ? 'lnkd-track-lib' : 'lnkd-track-json-lib');
  if (!vars) { return; }

  if (!track.xhr) {
    // Need these to continue
    if (!track.load || !vars.libUrl) { return; }
    callQueue = [];
  }

  track.errors = {};

  /**
   * Wraps a method and pushes an error report when errors are thrown.
   * @param {Function} method function to wrap.
   * @param {Object} err the error object containing the standard error fields which will be
   *                     pushed when an error occurs. If the message field is left blank then the
   *                     thrown Error's message will be used instead.
   * @return {Function} the wrapped method which should replace the old method provided as an
   *                    argument to this call.
   *
   */
  track.errors.onMethod = function(method, err) {
    return function() {
      try {
        method.apply(window, arguments);
      } catch (e) {
        err.message = err.message || e.message;
        track.errors.push(err);
      }
    };
  };

  /**
   * Wraps a method by name and pushes an error report when errors are thrown. Method must be
   * accessible from the global namespace.
   * @param {String} methodName the fully qualified namespace of the method to replace, relative
   *                            to the global (window) object.
   * @param {Object} err the error object containing the standard error fields which will be
   *                     pushed when an error occurs. If the message field is left blank then the
   *                     thrown Error's message will be used instead.
   *
   */
  track.errors.onMethodName = function(methodName, err) {
    var obj = window, i, len, parts, part;

    parts = methodName.split('.');
    part = parts[0];
    len = parts.length;

    for (i = 0; i < len-1; i++) {
      part = parts[i];
      obj = obj[part];
    }

    if (FN_TYPE !== (typeof obj[part])) {
      return;
    }

    obj[part] = track.errors.onMethod(obj[part], err);
  };

  /**
   * Pushes the given error object as a JSON string to the configured endpoint.
   * @param {Object} err the error object containing the standard error fields which will be
   *                     pushed. If the message field is left blank then the thrown Error's
   *                     message will be used instead.
   *
   */
  track.errors.push = function(err) {
    // Check if we need to load the lib dependency
    if (vars.libUrl) {
      // Load it
      track.load.script(vars.libUrl, callQueue);
      vars.libUrl = null;
      delete vars.libUrl;
    }

    // Check if we need to defer this call for when the lib is loaded
    if (!track.xhr) {
      callQueue.push(function() {
        track.errors.push(err);
      });

      return;
    } else if (callQueue) {
      // Clean up
      callQueue = null;
    }

    // Dependencies already loaded, report the error
    track.xhr.post({
      url: vars.reportUrl,
      data: new UserAgentError(err)
    });
  };

  // Standard error object (originTreeId will be populated)
  function UserAgentError(err) {
    this.code = err.code + '';
    this.message = err.message;
    this.unique = err.unique;
    this.originTreeId = vars.originTreeId;
    this.appName = vars.appName;
    this.pageKey = pagekey();
  }

}(window.track, window));


/* 7tqheyb1qchwa8dejl8nvz7zd */


/**
 * Various error codes for UA tracking
 * @author jbernardo
 *
 */
(function(track) {
  if (!track || !track.errors) { return; }

  track.errors.codes = {
    FZ_CACHE_MISS: 601,
    FZ_EMPTY_NODE: 602,
    FZ_DUST_RENDER: 603,
    FZ_DUST_CHUNK: 604,
    FZ_DUST_MISSING_TL: 605,
    FZ_RENDER: 606,
    FZ_XHR_BAD_STATUS: 607,
    FZ_XHR_BAD_CONTENT_TYPE: 608,
    FZ_JSON_PARSE: 609,
    CTRL_INIT: 701
  };

}(window.track));


/* 10q339fub5b718xk0pv9lzhpl */


/**
 * Initialization for user agent error tracking
 * @author jbernardo
 *
 */
(function(track, window) {
  if (!track || !track.errors) {
    return;
  }

  track.errors.bootstrap = function() {
    if (window.fs && track.errors) {
      window.fs.on('error', function(e) {
        var unique;

        if (window.JSON) {
          unique = { id: e.id };

          if (e.xhr) {
            unique.xhr = e.xhr;
          }

          try {
            e.unique = window.JSON.stringify(unique);
          } catch (err) {}
        }

        track.errors.push(e);
      });
    }
  };

  track.errors.bootstrap();

}(window.track, window));
