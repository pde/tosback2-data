/*
* $Id: trackingTags_v1.1.js 114847 2012-11-01 15:39:13Z utzc $
*/

//  CONFIGURE HOST BASED ON ENVIRONMENT
var NYTD = NYTD || {};
NYTD.Analytics = NYTD.Analytics || {};
NYTD.Analytics.JSFileLoaded = NYTD.Analytics.JSFileLoaded || {};


if ( !NYTD.Analytics.JSFileLoaded['trackingTags_v1.1.js'] ) {

/* BEGIN ANALYTICS TRACKING */

    NYTD.Analytics.JSFileLoaded['trackingTags_v1.1.js'] = 1;

NYTD.Hosts = NYTD.Hosts ||  (function(){
  var host, scripts = document.getElementsByTagName("script");

  for (var i = 0, script; script = scripts[i]; i++) {
    host = script.src &&
/^(.+\.nytimes.com)\/js\/app\/analytics\/trackingTags_v1\.1\.js/.test(script.src) ? RegExp.$1 :'';
    if (host) { break };
  };

  return {
    imageHost: host,
    jsHost: host,
    cssHost: host
  }
})();


// START WEBTRENDS JS TAG
var gtrackevents=false;
var gdcsid="dcsym57yw10000s1s8g0boozt_9t1x";
var gfpcdom=".nytimes.com";
var gdomain="wt.o.nytimes.com";
var js_host = NYTD.Hosts.jsHost + "/js/app/analytics/";


// Include WebTrends wtid.js
var wt_initObj = { enabled:true, fpc:"WT_FPC", domain:gdomain, dcsid:gdcsid };
if (wt_initObj.enabled&&(document.cookie.indexOf(wt_initObj.fpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
var wtid_js_host="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+wt_initObj.domain+"/"+wt_initObj.dcsid+"/"
var wtidjs = document.createElement('script');
wtidjs.setAttribute('type', 'text/javascript');
wtidjs.setAttribute('src', wtid_js_host+'wtid.js');
document.getElementsByTagName('head').item(0).appendChild(wtidjs);
}

var wtInc = document.createElement('script');
wtInc.setAttribute('language', 'javascript');
wtInc.setAttribute('type', 'text/javascript');
wtInc.setAttribute('src', js_host+'controller_v1.1.js');
document.getElementsByTagName('head').item(0).appendChild(wtInc);
// END WEBTRENDS JS TAG

// START REVENUE SCIENCE PIXELLING CODE
var customRevSci = document.createElement('script');
customRevSci.setAttribute('language', 'javascript');
customRevSci.setAttribute('type', 'text/javascript');
customRevSci.setAttribute('src', js_host+'revenuescience_all.js');
document.getElementsByTagName('head').item(0).appendChild(customRevSci);
// END REVENUE SCIENCE PIXELLING CODE

// Duped in common.js
(function(){
  if (NYTD.require) {
    return;
  }
  
  var windowLoaded = false;
  var document_scripts;
  
  if (window.addEventListener) {
    window.addEventListener ("load", function(){ windowLoaded = true }, false);
  } else if (window.attachEvent) {
    window.attachEvent ("onload", function(){ windowLoaded = true });
  }
  
  function scriptLoaded(src) {
    document_scripts = document_scripts || {};
    
    if (document_scripts[src]) { return true; }
    else {
      var script_tags= document.getElementsByTagName("script");
      for (var i = 0, script; script = script_tags[i]; i++) {
        if(script.src) { document_scripts[script.src] = 1; }
      };
      if (document_scripts[src]) { return true; }
      else { return false; }
    }
    
  }

  NYTD.require = function(file, callback) {
    
    if (windowLoaded) { throw('Cannot require file, document is already loaded'); }  

    // If matches root relative url (single slash, not protocol-agnostic double slash)
    var url = /^\/[^\/]/.test(file) ?  NYTD.Hosts.jsHost + file : file;
    var force = arguments[arguments.length - 1] === true;
    var needsCallbackScriptTag;
    
    if (force || !scriptLoaded(url)) { 
      document.write('<script src="' + url + '" type="text/javascript" charset="utf-8" onerror="throw(\'NYTD.require: An error occured: \' + this.src)"><\/script>');
      document_scripts[url] = 1;
      needsCallbackScriptTag = true;
    }

    if (typeof callback == 'function') {

      if (document.addEventListener && !navigator.userAgent.match(/MSIE/)) {
        if (needsCallbackScriptTag) { 
          document.write('<script type="text/javascript" charset="utf-8">(' + callback.toString() + ')();<\/script>');
        }
        else {
          window.setTimeout(function(){
            callback()
          }, 0)
        }
      }
      else {
        NYTD.require.callbacks = NYTD.require.callbacks || [];
        NYTD.require.callbacks.push(callback);
        NYTD.require.callbacks.count = (++NYTD.require.callbacks.count) || 0;
        document.write("<script id=__onAfterRequire" + NYTD.require.callbacks.count + " src=//:><\/script>");
        document.getElementById("__onAfterRequire" + NYTD.require.callbacks.count).onreadystatechange = function() {
          if (this.readyState == "complete") {
            this.onreadystatechange = null;
            (NYTD.require.callbacks.pop())();
            this.parentNode.removeChild(this);
          }
        };
      }

    }

  };
})();

// comScore beacon
NYTD.require((window.location.protocol == 'https:' ? 'https://sb' : 'http://b') +
'.scorecardresearch.com/c2/3005403/cs.js', function () {
  //Vendor code
  function udm_(a){var b="comScore=",c=document,d=c.cookie,e="",f="indexOf",g="substring",h="length",i=2048,j,k="&ns_",l="&",m,n,o,p,q=window,r=q.encodeURIComponent||escape;if(d[f](b)+1)for(o=0,n=d.split(";"),p=n[h];o<p;o++)m=n[o][f](b),m+1&&(e=l+unescape(n[o][g](m+b[h])));a+=k+"_t="+ +(new Date)+k+"c="+(c.characterSet||c.defaultCharset||"")+"&c8="+r(c.title)+e+"&c7="+r(c.URL)+"&c9="+r(c.referrer),a[h]>i&&a[f](l)>0&&(j=a[g](0,i-8).lastIndexOf(l),a=(a[g](0,j)+k+"cut="+r(a[g](j+1)))[g](0,i)),c.images?(m=new Image,q.ns_p||(ns_p=m),m.src=a):c.write("<","p","><",'img src="',a,'" height="1" width="1" alt="*"',"><","/p",">")}
  udm_('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?c1=2&c2=3005403');
});

// Nielsen tagging
(function () {
  var d = new Image(1, 1);
  d.onerror = d.onload = function () {
    d.onerror = d.onload = null;
  };
  d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-nytimes&cg=0&cc=1&si=",
           escape(window.location.href), "&rp=", escape(document.referrer),
           "&ts=compact&rnd=", (new Date()).getTime()].join('');
})();

// Charbeat beacon

var _sf_async_config = {
    uid: 16698,
    domain: "nytimes.com",
    pingServer: "pnytimes.chartbeat.net",
    path:window.location.pathname,
    title: window.TimesPeople && TimesPeople.Page && TimesPeople.Page.getTitle() || document.title.replace('- NYTimes.com', '')
};

try {
  _sf_async_config.sections = [document.getElementsByName('CG')[0].content, document.getElementsByName('SCG')[0].content].join(",");
} catch(e){}

try {
  _sf_async_config.authors = (document.getElementsByName('byl')[0] || document.getElementsByName('CLMST')[0]).content.replace('By ', '').toLowerCase().replace(/\b[a-z]/g, function(){return arguments[0].toUpperCase();});
} catch(e){}

 (function() {
    function loadChartbeat() {
        window._sf_endpt = (new Date()).getTime();
        var e = document.createElement('script');
        e.setAttribute('language', 'javascript');
        e.setAttribute('type', 'text/javascript');
        e.setAttribute('src',
        (("https:" == document.location.protocol) ? "https://a248.e.akamai.net/chartbeat.download.akamai.com/102508/" : "http://static.chartbeat.com/") + "js/chartbeat.js");
        document.body.appendChild(e);
    }
    
    if (window.addEventListener) {
      window.addEventListener('load', loadChartbeat, false);
    } else if (window.attachEvent) {
      window.attachEvent('onload', loadChartbeat);
    } 

})();

// UPTracker
var NYTD = NYTD || {};
if (! NYTD.Hosts) NYTD.Hosts = {};
if (! NYTD.Hosts.jsHost) NYTD.Hosts.jsHost = "http://js.nyt.com";
NYTD.UPTracker = (function () {
    
    // default configuration
  var config = {
    baseUrl: '//up.nytimes.com/?',
    defaultArguments: 'd=0//&c=1'
  };

  var url;
  
  function init (params) {

    if (params.baseUrl) {
      config.baseUrl = params.baseUrl;
    }
    if (params.eventType) {
      config.eventType = params.eventType;
    }
    if (params.data) {
      config.data = params.data;
    }
    if (params.userID) {
      config.userID = params.userID;
    }
    
    config.url = params.url || window.location.href;
  };
  
  function createUrl() {
  
      // begin with baseUrl
    url = config.baseUrl + config.defaultArguments;
    
      // append eventType
    if (config.eventType) {
      url += '&e=' + config.eventType;
    }

      // add user id if we have one
    if (config.userID) {
      url += '&ui=' + config.userID;
    }
    
      // url encode and append url
    url += '&u=' + encodeURIComponent(config.url);
    
      // url encode and append referrer
    url += '&r=' + encodeURIComponent(document.referrer);

      // if we have meta data, encode and append it
    if (config.data) {
      try {
        JSON.stringify({world:'peace'});
        appendAndSend();        
      } catch (e) {  // if no JSON, inlcude json2-min
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src  = "//www.nytimes.com/js/app/lib/json/json2-min.js";
        script.onload = function () { 
          appendAndSend(); 
        };
        script.onreadystatechange = function () {
          if (this.readyState == 'loaded' || this.readyState == 'complete') {
            appendAndSend();  
          }
        };
        
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    } else {
      send();
    }
  }; 

  function appendAndSend() {
    var jsonData = JSON.stringify(config.data);
    if (jsonData) {
      url += '&p=' + encodeURIComponent(jsonData);
    }
    send ();
  }
  
  function send() {
    if (url) {
        var img = document.createElement('img');
        img.setAttribute('border', 0);
        img.setAttribute('height', 0);
        img.setAttribute('width', 0);
        img.setAttribute('src', url);
        document.body.appendChild(img);
    } else {
      return false;
    }
  };

  return {
    track: function (params) {
      var params = params || {};
      init(params);
      createUrl();
    },
    check: function (){
                  var imageTags = document.getElementsByTagName('img');
            var UPTcalled = false;
                  var pattern = /up\.nytimes\.com\//;
            for (var i=0; i < imageTags.length; i++){
                          if ( pattern.test(imageTags[i].src)){
                            UPTcalled = true;
          break;
                          }
                  }
                  if (!UPTcalled) {
                          NYTD.UPTracker.track(); // set generic UPT call if not available on page load
                  }
          }
  };
})();

if (window.addEventListener) {
  window.addEventListener('load', NYTD.UPTracker.check, false);

} else if (window.attachEvent) {
  window.attachEvent('onload', NYTD.UPTracker.check);
}

NYTD.EventTracker = (function () {
    'use strict';
    var lastEventTime = 0;
    var nextCallbackNum = 0;
    var wtMetaExcludes = {
        'wt.z_nyts': 1,
        'wt.z_nytd': 1,
        'wt.z_ref': 1,
        'wt.z_rmid': 1
    };

    var buildUrl = function (url, params) {
        var key;
        var qs = '';
        for (key in params) if (params.hasOwnProperty(key)) {
            qs += (qs ? '&' : '') + key + '=' + encodeURIComponent(params[key]);
        }
        if (qs.length > 0) {
            return url + '?' + qs;
        } else {
            return url;
        }
    };

    var copyObject = function (obj) {
        var key;
        var objCopy = {};
        for (key in obj) if (obj.hasOwnProperty(key)) {
            objCopy[key] = obj[key];
        }
        return objCopy;
    };

    var extractMetaTags = function (obj) {
        var name, nameLower, content, i;
        var tags = document.getElementsByTagName('meta');
        obj = obj || {};
        for (i = 0; i < tags.length; i += 1) {
            name = tags[i].getAttribute('name');
            content = tags[i].getAttribute('content');
            if (typeof name === 'string' && typeof content === 'string') {
                nameLower = name.toLowerCase();
                if (nameLower.substr(0, 3) === 'wt.' && 
                    !wtMetaExcludes[nameLower]) {
                    obj[name] = content;
                }
            }
        }
        return obj;
    };

    return function () {
        var trackNow;
        var that = this;
        var datumId = null;
        var firedFirstEvent = false;
        var scripts = [];
        var queue = [];

        if (this instanceof NYTD.EventTracker === false) {
            return new NYTD.EventTracker();
        }

        trackNow = function (evt, options) {
            var scriptElem, oldScriptElem;
            var callbackNum = nextCallbackNum;

            nextCallbackNum += 1;

            NYTD.EventTracker['cb' + callbackNum] = function (result) {
                var i;
                delete NYTD.EventTracker['cb' + callbackNum];
                if (result.status && result.status === 'OK') {
                    if (!datumId && options.buffer) {
                        datumId = result.datumId;
                        for (i = 0; i < queue.length; i += 1) {
                            trackNow(queue[i].evt, queue[i].options);
                        }
                    }
                    if (options.callback) {
                        options.callback(null, result);
                    }
                } else {
                    if (options.callback) {
                        options.callback(new Error('Event tracking failed'), 
                            result);
                    }
                }
            };

            evt = copyObject(evt);
            if (!options.buffer) {
                evt.instant = '1';
            }
            evt.callback = 'NYTD.EventTracker.cb' + callbackNum;
            if (datumId && options.buffer) {
                evt.datumId = datumId;
            }

            if (options.sendMeta) {
                extractMetaTags(evt);
            }

            scriptElem = document.createElement('script');
            scriptElem.src = buildUrl((document.location.protocol || 'http:') +
                '//et.nytimes.com/', evt);
            document.body.appendChild(scriptElem);

            scripts.push(scriptElem);
            if (scripts.length > 5) {
                oldScriptElem = scripts.shift();
                document.body.removeChild(oldScriptElem);
            }
        };

        this.track = function (evt, options) {
            options = options || {};
            if (!options.background) {
                lastEventTime = (new Date()).valueOf();
            }
            if (!options.buffer) {
                trackNow(evt, options);
            } else if (datumId || !firedFirstEvent) {
                firedFirstEvent = true;
                trackNow(evt, options);
            } else {
                queue.push({
                    evt: copyObject(evt),
                    options: copyObject(options)
                });
            }
        };

        this.hasTrackedEventRecently = function () {
            return ((new Date()).valueOf() - lastEventTime) < 960000;
        };

        this.getDatumId = function () {
            return datumId;
        };
    };
})();

NYTD.createPageEventTracker = function () {
    'use strict';
    var tracker = new NYTD.EventTracker();
    var startTime = (new Date()).valueOf();
    var setUpdateTimeout = function () {
        setTimeout(function () {
            if (!tracker.getDatumId()) {
                setUpdateTimeout();
                return;
            } else if (!tracker.hasTrackedEventRecently()) {
                return;
            }
            tracker.track({
                subject: 'page',
                url: document.location.href,
                referrer: document.referrer,
                totalTime: (new Date()).valueOf() - startTime
            }, {
                background: true,
                buffer: true,
                callback: setUpdateTimeout
            });
        }, 15000);
    };
    tracker.track({
        subject: 'page',
        url: document.location.href,
        referrer: document.referrer,
        totalTime: 0
    }, {
        sendMeta: true,
        buffer: true,
        callback: setUpdateTimeout
    });

    return tracker;
};

/* END ANALYTICS TRACKING */
/* NOTE: ALL NEW CODE NEEDS TO BE ADDED ABOVE THIS LINE */
}
