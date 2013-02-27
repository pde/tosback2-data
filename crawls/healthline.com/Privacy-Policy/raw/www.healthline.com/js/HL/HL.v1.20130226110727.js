/*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 *
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
window.console=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();
/**
 * Global namespace object container for all HL objects and modules.
 * @namespace
 */
var HL = (function () {
  var Resources,
      config = {
        useHttps : false,
        srcPathHL : '/js/HL/modules/{file}.v1.20130215104727.js',
        srcPathPartner : '/partner/{partner}/js/modules/{file}.v1.20130215104727.js'
      },
      windowLoaded = false,
      domLoaded = false;

  /**
	 * Manage resource loading into the page.
	 * @namespace Resources
	 * @memberOf HL
	 * @private
	 */
	Resources = (function () {
		var loadedMap = { fullpath : {}, relative : {}, yui : {} }, counter = 0, queue = { fullpath : [], relative : [], yui : [] },
				yui2Modules = { 'animation' : 1, 'autocomplete' : 1, 'base' : 1, 'button' : 1, 'calendar' : 1, 'carousel' : 1, 'charts' : 1,
                      'colorpicker' : 1, 'connection' : 1, 'cookie' : 1, 'containercore' : 1, 'container' : 1, 'datasource' : 1,
                      'datatable' : 1, 'dom' : 1, 'dragdrop' : 1, 'editor' : 1, 'element' : 1, 'event' : 1, 'event-mouseenter' : 1, 'fonts' : 1, 'get' : 1, 'grids' : 1,
                      'history' : 1, 'imageloader' : 1, 'imagecropper' : 1, 'json' : 1, 'layout' : 1, 'logger' : 1, 'menu' : 1,
                      'paginator' : 1, 'profiler' : 1, 'profileviewer' : 1, 'progressbar' : 1, 'resize' : 1, 'reset' : 1, 'selector' : 1,
                      'simpleeditor' : 1, 'slider' : 1, 'storage' : 1, 'swf' : 1, 'swfdetect' : 1, 'swfstore' : 1, 'stylesheet' : 1,
                      'tabview' : 1, 'treeview' : 1, 'uploader' : 1, 'yahoo' : 1, 'yuiloader' : 1, 'yuitest' : 1 },
				getModuleResourcePath,
        callbackStack = [],
        loaderCallbackCount = 0;

		/** @scope HL.Resources
		 * Resolve a filename to a relative URL for internal (HL or partner) scripts.
		 * @see HL#require
		 * @param {String} filename Filename of resource to resolve.
		 * @return {String} Relative URL of the filename.
		 */
		getModuleResourcePath = function (p) {
      var hlSrcPath = config.srcPathHL,
          partnerSrcPath = config.srcPathPartner;
			return (p = p.split('|')).length === 1 ? hlSrcPath.substitute({ file : p[0] }) : partnerSrcPath.substitute({ partner : p[0], file : p[1] });
		};

    popCallback = function(c) {
        var callback;
        if (c) { loaderCallbackCount--; }
        if (loaderCallbackCount > 0) { return; }
        while (callback = callbackStack.pop()) {
          callback.call(HL);
        }
      };
    /** @scope HL.Resources */
		return {
  		/**
			 * Queue a resource if it has not yet loaded.
			 * @param {String} resource
			 */
			addResource : function (res) {
				var map = loadedMap.relative, q = queue.relative;
        if (yui2Modules[res]) {
					q = queue.yui;
					map = loadedMap.yui;
				} else if (res.indexOf('http://') === 0 || res.indexOf('https://') === 0) {
					q = queue.fullpath;
					map = loadedMap.fullpath;
				} else if (res.indexOf('/') === -1) {
					res = getModuleResourcePath(res);
				}
				map[res] = map[res] || 0;
				if (map[res] === 0) { // enqueue if not in "isLoaded flag" map
					q.push(res);
				}
			},
			/**
			 * Load all resources in queue.
			 * @param {Function} callback
			 */
			loadResources : function (callback) {
        callbackStack.push(callback);
        loaderCallbackCount++;
				if (queue.fullpath.length === 0 && queue.relative.length === 0 && queue.yui.length === 0) {
          popCallback(true);
          return;
				}
    		var res, hlloader, yuiloader,
            base = config.useHttps ? 'https://ajax.googleapis.com/ajax/libs/yui/2.7/build/' : 'http://ajax.googleapis.com/ajax/libs/yui/2.7/build/',
            combine = false;
			  yuiloader = new YAHOO.util.YUILoader({
						require : queue.yui,
    		  	onSuccess : (queue.relative.length || queue.fullpath.length ? function() { hlloader.insert(); } : function () { popCallback(true); }),
            onFailure : (queue.relative.length || queue.fullpath.length ? function() { hlloader.insert(); } : function () { popCallback(true); }),
    		  	base : base,
            combine : combine,
            loadOptional : true,
            allowRollup : true
          });
        hlloader = new YAHOO.util.YUILoader({
            onSuccess : function () { popCallback(true); },
            onFailure : function () { popCallback(true); },
            scope : HL,
            base : ''
          });
    		while (res = queue.fullpath.shift()) {
    		  hlloader.addModule({
    		    name : 'module'+counter,
    		    type : 'js',
    		    fullpath : res
    		  });
					loadedMap.fullpath[res] = 1;
          hlloader.require('module'+counter++);
        }
				while (res = queue.relative.shift()) {
					hlloader.addModule({
						name : 'module'+counter,
						type : 'js',
						path : res
					});
					loadedMap.relative[res] = 1;
          hlloader.require('module'+counter++);
        }
    		yuiloader.insert();
				while (res = queue.yui.shift()) {
					loadedMap.yui[res] = 1;
				}
 			}
		};
	}());

  /** @scope HL */
  return {
    /**
     * Create namespace object(s) within the HL global object.
     * @param {Strings} namespace Namespace(s) to create
     * @return {Object} Reference to the last namespace object created
     * @example
     * // create HL.MyNamespace
     * HL.namespace("HL.MyNamespace")
     * @example
     * // create HL.util, HL.dom, and HL.ajax
     * HL.namespace("util", "dom", "ajax")
     */
    namespace : function () {
      var args = [].slice.call(arguments),
              parent = HL,
              i, j, parts;
      for (i = 0; i < args.length; i++) {
        parts = ('' + args[i]).split('.');
        for (j = (parts[0] === 'HL') ? 1 : 0; j < parts.length; j++) {
          parent = parent[parts[j]] = parent[parts[j]] || {};
        }
      }
      return parent;
    },
		/**
		 * Define a module.   The returned value from the callback is assigned to the namespace specified.
		 * @param {String} namespace
		 * @param {Function} callback
		 * @return {Object} Reference to {@link HL} object.
		 */
    module : function () {
      var args = [].slice.call(arguments),
              callback = typeof args[args.length - 1] === 'function' ? args.pop() : function() { return {}; },
              options = typeof args[args.length - 1] === 'object' ? args.pop() : {},
              module = (typeof args[args.length - 1] === 'string' ? args.pop() : '').split('.'),
							moduleName = module.pop(),
							nsString, namespace;
			nsString = module.length !== 0 ? module.join('.') : 'HL';
			namespace = HL.namespace(nsString);
			namespace[moduleName] = callback.call(namespace) || {};
			if (namespace[moduleName].prototype !== undefined) {
				// Re-link the constructor reference
				namespace[moduleName].prototype.constructor = namespace[moduleName];
			}
      var o = YAHOO.util.Lang.merge({ version : "1.0", build : "1" }, options);
      YAHOO.register(nsString, namespace[moduleName], o);
      return HL;
    },
		/**
		 * Load external scripts required by the application, then invoke the callback.
		 * A script resource may be a fully-qualified URL, relative URL, a YUI2 module name, or an internal (HL) script filename.
		 * Internal script filenames are resolved to relative URLs. A partner resource is indicated by prepending the partner name followed by a vertical bar (|).
		 * @param {Strings | Array[Strings]} resource Resource(s) to load. Can be a passed as separate parameters or as an array.
		 * @param {Function} callback Callback to invoke once resources have loaded into the page.
		 * @return {Object} Reference to {@link HL} object.
		 * @example
		 * // fully-qualified path, relative path, and YUI2 module
		 * HL.require("http://external.com/resource.js", "/js/relative.js", "autocomplete", callback);
		 * @example
		 * // resolves to "/js/HLResource.js" and "/partner/aol/js/AOLResource.js"
		 * HL.require(["HLResource", "aol|AOLResource"], callback);
		 */
    require : function () {
      var args = [].slice.call(arguments),
              callback = typeof args[args.length - 1] === 'function' ? args.pop() : function() { return {}; },
              options = typeof args[args.length - 1] === 'object' && !isArray(args[args.length - 1]) ? args.pop() : {};
      options = YAHOO.lang.merge({when:'ondomready'},options);

      var loadOptionsEnum = { 'onload' : 0, 'ondomready' : 1, 'now' : 2},
          loadResources = function(args) {
            var i;
            for (i = 0; i < args.length; i++) {
              Resources.addResource(args[i]);
            }
            Resources.loadResources(function() {
              callback.call(HL);
            });
          },
          sw = loadOptionsEnum[options.when] == 0 && windowLoaded ? 2 :
               (loadOptionsEnum[options.when] == 1 && domLoaded ? 2 : loadOptionsEnum[options.when]);

      switch (sw) {
        case 0:
            YAHOO.util.Event.on(window, 'load', function(e, a) { windowLoaded = true; loadResources(a);}, args);
            break;
        case 1:
            YAHOO.util.Event.onDOMReady(function(e) { domLoaded = true; loadResources(this); }, args, true);
            break;
        case 2:
            loadResources(args);
            break;
      }
			return HL;
    },
    config : function (o) {
      config = YAHOO.util.Lang.merge(config, o);
    }
  };
}());

function isArray(o) {
  return {}.toString.call(o) === '[object Array]';
}

if (Array.invert === undefined) {
  Array.invert = function (a) {
    var iA = {}, i = a.length - 1;
    for (;i>=0;i--) {
      iA[a[i]] = i;
    }
    return iA;
  };
}

/** @class
 * @name String
 */
if (String.prototype.trim === undefined) {
  /**
   * Remove leading and trailing whitespace.
   * @memberOf String.prototype
   * @return {String} String with leading and trailing whitespace removed.
   * @example
   * "   foo   ".trim(); // returns "foo"
   */
  String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g, '');
	};
}

if (String.prototype.substitute === undefined) {
  /**
   * Substitute string value(s) into a string template.
   * A variable inside a string template is denoted by the variable name wrapped in curly braces.
   * @memberOf String.prototype
   * @param {Object} replacement Object containing variable/value pairs to substitute into the string template.
   * @return {String} String with variables replaced by the supplied values.
   * @example
   * var template = "&lt;div&gt;{num}: {output}&lt;/div&gt;";
   * template.substitute({ num : "1", output : "Apple" }); // returns "&lt;div&gt;1: Apple&lt;/div&gt;"
   * template.substitute({ num : "10", output : "Jackfruit" }); // returns "&lt;div&gt;10: Jackfruit&lt;/div&gt;"
   */
  String.prototype.substitute = function(o) {
    var i, str = this;
    for (i in o) {
      if (!o.hasOwnProperty(i)) {
	  		continue;
	  	}
      str = str.replace(new RegExp('{' + i + '}', 'g'), o[i]);
    }
    return str;
  };
}

if (String.prototype.capitalize === undefined) {
  /**
   * Capitalize the first letter of a string.
   * @memberOf String.prototype
   * @return {String} String with the first letter capitalized.
   */
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
}

HL.ui = {};

/*
HL.ui.Popup = (function() {
  var $E = YAHOO.util.Event, $D = YAHOO.util.Dom;
  var popups = [], activePopup;

  function register(anchor, popup)  {
    var hash = popup ? '#'+popup.id : anchor.hash;
    popup = popup ? popup : document.getElementById(hash.substring(1));
    popups[hash] = popups[hash] || {
      anchor : anchor,
      popup : popup,
      callback : undefined
    };
    return popups[hash];
  }
  
  function open(hash) {
    $D.removeClass(popups[hash].popup, 'hidden');
    if (callback) callback.call(popups[hash]);
  }
  
  function close(hash) {
    $D.addClass(popups[hash].popup, 'hidden');
  }
  
  $E.addListener(document, 'click', function(e) {
    var target = $E.getTarget(e);
    while (target) {
      if (activePopup && target == popups[activePopup].popup) return;
      if (target.tagName == 'A' && $D.getAttribute(target, 'rel') == 'close' && activePopup == target.hash) {
        close(activePopup);
        activePopup = undefined;
        $E.preventDefault(e);
        $E.stopPropagation(e);
        return;
      }
      if (target.tagName == 'A' && $D.getAttribute(target, 'rel') == 'popup') break;
      target = target.parentNode; 
    }
    register(target);
    activePopup = target.hash;
    open(activePopup);
    $E.preventDefault(e);
    $E.stopPropagation(e);
  });
  
  return function(hash, callback) {
    if (callback) popups[hash].callback = callback;
    return popups[hash];  
  }
}());*/

HL.ui.tooltip = (function() {
  var $E = YAHOO.util.Event, $D = YAHOO.util.Dom;

  function parseData(el, data) {
    var symbols = function(str) {
      var o = { top: '0', bottom: '100%', left: '0', right: '100%', center: '50%' };
      return o[str] || str;
    },
        o = data.split(';'),
        my = o[0].split(' '),
        at = o[1].split(' ');
    return {
      my : [symbols(my[0]), symbols(my[1])],
      at : [symbols(at[0]), symbols(at[1])]
    }
  }

  function getPixelOffset(o, i) {
    return i.slice(-1) == '%' ? parseInt(i)/100 * o : parseInt(i);
  }

  function getTotalWidth(o) {
    return o.offsetWidth + parseInt($D.getStyle(o, 'paddingLeft')) + parseInt($D.getStyle(o, 'paddingRight'));
  }

  function getTotalHeight(o) {
    return o.offsetHeight + parseInt($D.getStyle(o, 'paddingTop')) + parseInt($D.getStyle(o, 'paddingBottom'));
  }

  function injectTooltip(el, data) {
    /*var html = '<div class="ui-tooltip">' + View.buildTooltip($D.getAttribute(el, 'title')) + '</div>';*/
    var div = document.createElement('div');
    div.className = 'ui-tooltip';
    div.innerHTML = View.buildTooltip($D.getAttribute(el, 'title'));
    var ttEl = $D.insertAfter(div, el),
        x = $D.getX(el) + getPixelOffset(getTotalWidth(el), data['at'][0]) - getPixelOffset(getTotalWidth(ttEl), data['my'][0]),
        y = $D.getY(el) + getPixelOffset(getTotalHeight(el), data['at'][1]) - getPixelOffset(getTotalHeight(ttEl), data['my'][1]);
    $D.setXY(ttEl, [x, y]);
    return ttEl;
  }

  var View = {
    buildTooltip : function(content) {
      return content + '<span class="ui-tooltip-arrow-border"></span><span class="ui-tooltip-arrow"></span>';
    }
  };

  HL.require('event-mouseenter', function() {
    $E = YAHOO.util.Event; $D = YAHOO.util.Dom;
    $D.getElementsBy(
        function(el) { return $D.getAttribute(el, 'rel') == 'tooltip'; }, 'a', document,
        function(el) {
          $E.on(el, 'mouseenter', function(e) {
            var ttEl = $D.getNextSiblingBy(this,
                function(el) {
                  return (el.tagName == 'DIV' && el.className.indexOf('ui-tooltip') != -1) ||
                         (el.tagName == 'A' && $D.getAttribute(el, 'rel') == 'tooltip'); }),
                data = parseData(this, $D.getAttribute(this, 'data-tooltip'));
            if (!ttEl || ttEl.tagName != 'DIV' || ttEl.className.indexOf('ui-tooltip') == -1) {
              ttEl = injectTooltip(this, data);
              $D.setAttribute(this, 'title', '');
            }
            $D.removeClass(ttEl, 'hidden');
          });
          $E.on(el, 'mouseleave', function(e) {
            $D.addClass($D.getNextSiblingBy(this, function(el) { return el.tagName == 'DIV' && el.className.indexOf('ui-tooltip') != -1; }), 'hidden');
          });
        });
  });


  return {
    View : function(o) {
      View = YAHOO.lang.merge(View, o);
    }
  };
}());