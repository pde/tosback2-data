if (typeof JSON !== 'object') {
    JSON = {};
}

if(typeof(console) == 'undefined'){
	console = {};
}

if(typeof(console.log) != 'function') {
	console.log = function() {};
}

if(typeof(console.error) != 'function') {
	console.error = function() {};
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

                j = eval('(' + text + ')');

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
(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(prop){var _super=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}function Class(){if(!initializing&&this.init)this.init.apply(this,arguments);}Class.prototype=prototype;Class.prototype.constructor=Class;Class.extend=arguments.callee;return Class;};})();(function(window){'use strict';var Porthole={trace:function(s){if(window['console']!==undefined && window.console['log']!==undefined){window.console.log('Porthole: '+s);}},error:function(s){if(window['console']!==undefined && window.console['error']!==undefined){window.console.error('Porthole: '+s);}}};Porthole.WindowProxy=function(){};Porthole.WindowProxy.prototype={post:function(data,targetOrigin){},addEventListener:function(f){},removeEventListener:function(f){}};Porthole.WindowProxyBase=Class.extend({init:function(targetWindowName){if(targetWindowName===undefined){targetWindowName='';}this.targetWindowName=targetWindowName;this.origin=window.location.protocol+'//'+window.location.host;this.eventListeners=[];},getTargetWindowName:function(){return this.targetWindowName;},getOrigin:function(){return this.origin;},getTargetWindow:function(){return Porthole.WindowProxy.getTargetWindow(this.targetWindowName);},post:function(data,targetOrigin){if(targetOrigin===undefined){targetOrigin='*';}this.dispatchMessage({'data':data,'sourceOrigin':this.getOrigin(),'targetOrigin':targetOrigin,'sourceWindowName':window.name,'targetWindowName':this.getTargetWindowName()});},addEventListener:function(f){this.eventListeners.push(f);return f;},removeEventListener:function(f){var index;try{index=this.eventListeners.indexOf(f);this.eventListeners.splice(index,1);}catch(e){this.eventListeners=[];}},dispatchEvent:function(event){var i;for(i=0;i<this.eventListeners.length;i++){try{this.eventListeners[i](event);}catch(e){}}}});Porthole.WindowProxyLegacy=Porthole.WindowProxyBase.extend({init:function(proxyIFrameUrl,targetWindowName){this._super(targetWindowName);if(proxyIFrameUrl!==null){this.proxyIFrameName=this.targetWindowName+'ProxyIFrame';this.proxyIFrameLocation=proxyIFrameUrl;this.proxyIFrameElement=this.createIFrameProxy();}else{this.proxyIFrameElement=null;throw new Error("proxyIFrameUrl can't be null");}},createIFrameProxy:function(){var iframe=document.createElement('iframe');iframe.setAttribute('id',this.proxyIFrameName);iframe.setAttribute('name',this.proxyIFrameName);iframe.setAttribute('src',this.proxyIFrameLocation);iframe.setAttribute('frameBorder','1');iframe.setAttribute('scrolling','auto');iframe.setAttribute('width',30);iframe.setAttribute('height',30);iframe.setAttribute('style','position: absolute; left: -100px; top:0px;');if(iframe.style.setAttribute){iframe.style.setAttribute('cssText','position: absolute; left: -100px; top:0px;');}document.body.appendChild(iframe);return iframe;},dispatchMessage:function(message){var encode=window.encodeURIComponent;if(this.proxyIFrameElement){var src=this.proxyIFrameLocation+'#'+encode(Porthole.WindowProxy.serialize(message));this.proxyIFrameElement.setAttribute('src',src);this.proxyIFrameElement.height=this.proxyIFrameElement.height>50?50:100;}}});Porthole.WindowProxyHTML5=Porthole.WindowProxyBase.extend({init:function(proxyIFrameUrl,targetWindowName){this._super(targetWindowName);this.eventListenerCallback=null;},dispatchMessage:function(message){this.getTargetWindow().postMessage(Porthole.WindowProxy.serialize(message),message.targetOrigin);},addEventListener:function(f){if(this.eventListeners.length===0){var self=this;this.eventListenerCallback=function(event){self.eventListener(self,event);};if(window.addEventListener){window.addEventListener('message',this.eventListenerCallback,false);}else if(window.attachEvent){window.attachEvent("onmessage",this.eventListenerCallback);}}return this._super(f);},removeEventListener:function(f){this._super(f);if(this.eventListeners.length===0){if(window.addEventListener){window.removeEventListener('message',this.eventListenerCallback);}else if(window.attachEvent){window.detachEvent("onmessage",this.eventListenerCallback);}this.eventListenerCallback=null;}},eventListener:function(self,nativeEvent){var data=Porthole.WindowProxy.unserialize(nativeEvent.data);if(data&&(self.targetWindowName==''||data.sourceWindowName==self.targetWindowName)){self.dispatchEvent(new Porthole.MessageEvent(data.data,nativeEvent.origin,self));}}});if(typeof window.postMessage==='undefined'){Porthole.trace('Using legacy browser support');Porthole.WindowProxy=Porthole.WindowProxyLegacy.extend({});}else{Porthole.trace('Using built-in browser support');Porthole.WindowProxy=Porthole.WindowProxyHTML5.extend({});}Porthole.WindowProxy.serialize=function(obj){if(typeof JSON==='undefined'){throw new Error('Porthole serialization depends on JSON!');}return JSON.stringify(obj);};Porthole.WindowProxy.unserialize=function(text){if(typeof JSON==='undefined'){throw new Error('Porthole unserialization dependens on JSON!');}try{var json=JSON.parse(text);}catch(e){return false;}return json;};Porthole.WindowProxy.getTargetWindow=function(targetWindowName){if(targetWindowName===''){return top;}else if(targetWindowName==='top'||targetWindowName==='parent'){return window[targetWindowName];}return parent.frames[targetWindowName];};Porthole.MessageEvent=function MessageEvent(data,origin,source){this.data=data;this.origin=origin;this.source=source;};Porthole.WindowProxyDispatcher={forwardMessageEvent:function(e){var message,decode=window.decodeURIComponent,targetWindow,windowProxy;if(document.location.hash.length>0){message=Porthole.WindowProxy.unserialize(decode(document.location.hash.substr(1)));targetWindow=Porthole.WindowProxy.getTargetWindow(message.targetWindowName);windowProxy=Porthole.WindowProxyDispatcher.findWindowProxyObjectInWindow(targetWindow,message.sourceWindowName);if(windowProxy){if(windowProxy.origin===message.targetOrigin||message.targetOrigin==='*'){windowProxy.dispatchEvent(new Porthole.MessageEvent(message.data,message.sourceOrigin,windowProxy));}else{Porthole.error('Target origin '+windowProxy.origin+' does not match desired target of '+message.targetOrigin);}}else{Porthole.error('Could not find window proxy object on the target window');}}},findWindowProxyObjectInWindow:function(w,sourceWindowName){var i;if(w.RuntimeObject){w=w.RuntimeObject();}if(w){for(i in w){if(w.hasOwnProperty(i)){try{if(w[i]!==null&&typeof w[i]==='object'&&w[i]instanceof w.window.Porthole.WindowProxy&&w[i].getTargetWindowName()===sourceWindowName){return w[i];}}catch(e){}}}}return null;},start:function(){if(window.addEventListener){window.addEventListener('resize',Porthole.WindowProxyDispatcher.forwardMessageEvent,false);}else if(window.attachEvent&&window.postMessage!=='undefined'){window.attachEvent('onresize',Porthole.WindowProxyDispatcher.forwardMessageEvent);}else if(document.body.attachEvent){window.attachEvent('onresize',Porthole.WindowProxyDispatcher.forwardMessageEvent);}else{Porthole.error('Cannot attach resize event');}}};if(typeof window.exports!=='undefined'){window.exports.Porthole=Porthole;}else{window.Porthole=Porthole;}})(this);
var LIFP = {
    
    events : {
      login: 'login',
      register: 'register'
    },
    query: function(q) {
      return (typeof(dojo) != 'undefined') ? dojo.query(q):jQuery(q);
    },
    
    mixin: function(a, b) {
      return (typeof(dojo) != 'undefined') ? dojo.mixin(a,b):jQuery.extend(a,b);
    },
    
    addClass: function(o, c) {
      return (typeof(dojo) != 'undefined') ? dojo.addClass(o, c):jQuery(o).addClass(c);
    },
    
    init : function(args) {
      
      var basePathObj = this.query("meta[name='lifp_basePath']")[0];
      var basePath = (basePathObj)? basePathObj.content:null;
      
      this.conf = {
        basePath : (basePath)? basePath:'https://id.wsj.com/access'
          
      };
      
      this.cookieCheck = 1;
      
      this.mixin(this.conf, args);
      
      var s = this.query("meta[name='lifp_signature']");
      if(s.length > 0) {
        this.signatureID = s[0].content;
      } 
      
      if(!this.signatureID) {
        this.signatureID = this.getUrlParam('sig');
        if(!this.signatureID) {
          console.error("No Signature ID identified on META tags");
          return;
        }
      }
      
      var p = this.getUrlParam('lifp');
      if(p) {
        this.createIFrame(p);
      }
      
      //CHECKS FOR SEAMLESS USER AND DISPLAYS POPUP
      this.seamless();
      
      if(typeof(dojo) != 'undefined') {
        //Connect login widgets
        dojo.query("[data-widget='LIFP.login']").connect('onclick', function(event){
          dojo.stopEvent(event);
          var msg = event.target.getAttribute('data-msg');
          LIFP.login(msg);
        });
        
        //Connect forgot password widgets
        dojo.query("[data-widget='LIFP.forgotpassword']").connect('onclick', function(event){
          dojo.stopEvent(event);
          var msg = event.target.getAttribute('data-msg');
          LIFP.forgotPassword(msg);
        });
        
      //Connect forgot password widgets
        dojo.query("[data-widget='LIFP.forgotusername']").connect('onclick', function(event){
          dojo.stopEvent(event);
          var msg = event.target.getAttribute('data-msg');
          LIFP.forgotUsername(msg);
        });
        
        
        //Connect free registration widgets
        dojo.query("[data-widget='LIFP.freeregistration']").connect('onclick', function(event){
          dojo.stopEvent(event);
          var msg = event.target.getAttribute('data-msg');
          LIFP.freeRegistration(msg);
        });
      } else if(jQuery) {
      //Connect login widgets
        jQuery("[data-widget='LIFP.login']").click(function(event){
          event.preventDefault();
          var msg = jQuery(this).attr('data-msg');
          LIFP.login(msg);
        });
        
        //Connect forgot password widgets
        jQuery("[data-widget='LIFP.forgotpassword']").click(function(event){
          event.preventDefault();
          var msg = jQuery(this).attr('data-msg');
          LIFP.forgotPassword(msg);
        });
        
      //Connect forgot password widgets
        jQuery("[data-widget='LIFP.forgotusername']").click(function(event){
          event.preventDefault();
          var msg = jQuery(this).attr('data-msg');
          LIFP.forgotUsername(msg);
        });
        
        //Connect free registration widgets
        jQuery("[data-widget='LIFP.freeregistration']").click(function(event){
          event.preventDefault();
          var msg = jQuery(this).attr('data-msg');
          LIFP.freeRegistration(msg);
        });
      }
      
      // Check for query attributes for calling entry points (login, forgot password or register)
      //TODO
    },
    
    addCacheBuster: function(url) {
      if(/#/.test(url)) {
        if(/\?/.test(url)) {
          url = url.replace('#', '&cb=logged' + Math.random() + '#');
        } else {
          url = url.replace('#', '?cb=logged' + Math.random() + '#');
        }
      } else {
        if(/\?/.test(url)) {
          url += '&cb=logged' + Math.random();
        } else {
          url += '?cb=logged' + Math.random();
        }
      }
      return url;
    },
    
    onMessage : function(msg) {
      if(msg.data.action) {
        if(msg.data.action == 'resize') {
          var width = (msg.data.width) ? msg.data.width:null;
          var height = (msg.data.height) ? msg.data.height:null;
          LIFP.resizeIFrame(width, height);
        } else if(msg.data.action == 'reload') {
          if(LIFP.pageReloadDisabled) {
            console.log('Page Reload is Disabled');
            LIFP.closeScrim();
            return;
          }
          try {
            var url = document.location.href;
            url = LIFP.addCacheBuster(url);
            document.location.href = url;
          } catch(e) {
            document.location.reload(true);
          }
        } else if(msg.data.action == 'close') {
          LIFP.closeScrim();
        } else if(msg.data.action == 'closeButtonText') {
          LIFP.changeCloseLabel(msg.data.label);
        } else if(msg.data.action == 'callback') {
          var eventName = msg.data.event;
          var content = msg.data.content;
          for(var i = LIFP.callbacks[eventName].length - 1; i >= 0; i--) {
            LIFP.callbacks[eventName][i].call(content);
          }
        }else if(msg.data.action == 'load') {
          var url = msg.data.url;
          if(url) {
            document.location.href = url;
          }
        } else if(msg.data.action == 'setCookie') {
          this.setCookie(msg.data.name, msg.data.value, msg.data.exdays);
        }
      }
    },
    
    subscribe: function(eventName, fn) {
      if(!typeof(fn) == 'function') {
        console.log('Can not subscribe an object that is not a function');
        return;
      }
      if(!LIFP.callbacks) {
        LIFP.callbacks = new Array();
      }
      if(!LIFP.callbacks[eventName]) {
        LIFP.callbacks[eventName] = new Array();
      }
      LIFP.callbacks[eventName].push(fn);
    },
    
    disablePageReload: function() {
      LIFP.pageReloadDisabled = true;
    },
    
    enablePageReload: function() {
      LIFP.pageReloadDisabled = false;
    },
    
    changeCloseLabel : function(label) {
      if(typeof(dojo) != 'undefined') {
        dojo.byId('closeButton').innerHTML = label;
      } else if(jQuery) {
        jQuery('#closeButton').html(label);
      }
        
    },
    
    createIFrame: function(page, msg) {
      if(msg && msg != '') {
        msg = encodeURIComponent(msg);
      } else {
        msg = null;
      }
      var url = this.conf.basePath + '/' + this.signatureID + '/latest/' + page;
      if(this.isMobile.any()) {
        if(msg) {
          document.location.href = url + '_mobile.html?msg=' + msg ;
        } else {
          document.location.href = url + '_mobile.html' ;
        }
      } else if((typeof(dojo) != 'undefined' && dojo.isIE == 7) || (typeof(jQuery) != 'undefined' && typeof(jQuery.browser) != 'undefined' && jQuery.browser.msie && jQuery.browser.version == '7.0')) {
        if(msg) {
          document.location.href = url + '_standalone.html?msg=' + msg ;
        } else {
          document.location.href = url + '_standalone.html';
        }
      } else {
        if(this.iframeContainer) {
          if(typeof(dojo) != 'undefined') {
            dojo.removeClass(this.iframeContainer, 'hidden');
          } else {
            jQuery(this.iframeContainer).removeClass('hidden');
          }
        } else {
          if(msg) {
            var htmlContent = '<div id="overlayDiv" class="login_scrim_wrapper" style="opacity: 1; "><div id="login_inner" class="login_scrim_inner"><div id="module" class="login_scrim_module"><div id="iframe_headerStrap" class="headerStrap"><a href="javascript:LIFP.closeScrim();" class="closeBtn iframeOverlayCloseBtn" id="closeButton">close</a></div><iframe id="lifp_iframe"  name="lifp_iframe" scrolling="no" frameborder="0" marginwidth="0" marginheight="0" hspace="0" vspace="0" border="0" style="height: 460px; width: 678px; " src="' + url + '.html?msg=' + msg + '" class="login_scrim_framed" allowtransparency="true"></iframe></div></div></div>';
          } else {
            var htmlContent = '<div id="overlayDiv" class="login_scrim_wrapper" style="opacity: 1; "><div id="login_inner" class="login_scrim_inner"><div id="module" class="login_scrim_module"><div id="iframe_headerStrap" class="headerStrap"><a href="javascript:LIFP.closeScrim();" class="closeBtn iframeOverlayCloseBtn" id="closeButton">close</a></div><iframe id="lifp_iframe"  name="lifp_iframe" scrolling="no" frameborder="0" marginwidth="0" marginheight="0" hspace="0" vspace="0" border="0" style="height: 460px; width: 678px; " src="' + url + '.html' + '" class="login_scrim_framed" allowtransparency="true"></iframe></div></div></div>';
          }
          if(typeof(dojo) != 'undefined') {
            this.iframeContainer = dojo.create('div', {innerHTML: htmlContent, "class":"login_overlay", id : "getGreyBckgroundCSSDiv" }, document.body);
            this.iframe = dojo.byId('lifp_iframe');
          } else {
            this.iframeContainer = jQuery("<div/>", {html: htmlContent, "class":"login_overlay", id : "getGreyBckgroundCSSDiv" }).appendTo('body')[0];
            this.iframe = jQuery('#lifp_iframe')[0];
          }
        }
        if(!this.windowProxy) {
          this.windowProxy = new Porthole.WindowProxy(this.conf.proxyURL, 'lifp_iframe');
          this.windowProxy.addEventListener(this.onMessage);
        }
      }
    },
    
    closeScrim: function() {
      this.addClass(this.iframeContainer, 'hidden');
      document.body.removeChild(this.iframeContainer);
      this.iframeContainer = null;
      this.iframe = null;
      return;
    },
    
    hideIFrameContainer: function() {
      this.addClass(this.iframeContainer, 'hidden');
    },
    
    resizeIFrame: function(width, height) {
      if(this.iframe) {
        if(width) {
          this.iframe.style.width = width + "px";
        }
        
        if(height) {
          this.iframe.style.height = height + "px";
        }
      }
    },
    
    getUrlParam : function(name) {
      var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href); 
      return (results !== null) ? results[1] : 0;
    },
    
    isMobile: {
        Android: function() {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        any: function() {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Windows());
        }
    },
    
    // Check for special characters on login scrim fields.
    
    login : function(msg) {
      this.createIFrame('login', msg);
    },
    
    forgotPassword : function(msg) {
      this.createIFrame('password_forgot', msg);
    },
    
    forgotUsername : function(msg) {
      this.createIFrame('username_forgot', msg);
    },
    
    freeRegistration: function(msg) {
      this.createIFrame('register', msg);
    },
    
    //SEAMLESS USER DJ
    
    seamless : function(){
      //check if seamless functionality is active
      if(LIFP.getCookie("djmcn_login") != "true") {
        return;
      }
      
      if(typeof(djcs) === 'undefined' || !djcs.UserInfo || typeof djcs.UserInfo.getGroup != 'function' || typeof djcs.UserInfo.getUuid != 'function') {
        console.log('djcs JS library not found');
        return;
      }
      
      //Check if the user is in dj nw and if logged in user is not seamless
      if( (LIFP.getCookie("djmcn")==="true" && djcs.UserInfo.getGroup()!=="DJN") || (LIFP.getCookie("djmcn")==="true" && djcs.UserInfo.getUuid()===null) ){
        if(LIFP.getCookie("seamless_login_displayed") != "true") {
          LIFP.createIFrame('seamless');
          LIFP.setCookie("seamless_login_displayed", "true");
        }
      }
    },
    
    getCookie: function(name){
        var cookiestring=RegExp(""+name+"[^;]+").exec(document.cookie);
        return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+/,"").replace("=","") : "");
    },
    
    setCookie : function(name,value,exdays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        var a = location.hostname.split('.');
        a.splice(0,1);
        var cookieDomain = "." + a.join('.'); 
        c_value+=";domain="+cookieDomain+";path=/"
        document.cookie=name + "=" + c_value;
    }
    
};

//Self initialization
LIFP.init();