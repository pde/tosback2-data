// configurable ajax request object
function AbstractAjaxRequest(config) {
  config              = config          || {};
  var DEFAULT_RETRIES = config.retries  || 1;

  function receiveAjaxSuccess(json, success, failure) {
    try {
      success(JSON.parse(json));
    } catch (e) {
      if (failure) { failure({"parse error" : "JSON Parsing Error : (" + e + ") in " + String(json)}); }
    }
  }

  function receiveAjaxFailure(jqXHR, textStatus, errorThrown, url, data, headers, cb) {
    if(cb) {
      cb(customJSONError(jqXHR, textStatus, errorThrown, url, data, headers));
    } else {
      if($.logger) { $.logger.error("[AjaxRequest][Error] : " + textStatus); }
    }
  }

  function customJSONError(jqXHR, textStatus, errorThrown, url, data, headers) {
    var railsResponse = (jqXHR.responseText.indexOf("Rails") > -1),
        responseText  = railsResponse ? jqXHR.responseText.split("<body>")[1] : responseText;
    return {
      readyState    : jqXHR.readyState,
      statusCode    : jqXHR.status,
      responseText  : String(responseText, status).substr(0,600),
      textStatus    : textStatus,
      error         : errorThrown,
      url           : url,
      data          : data,
      headers       : headers,
      userAgent     : window.navigator.userAgent
    };
  }

  function request(tp, url, data, headers, cb, fail) {
    var contentType     = config.contentType      || "application/json",
        httpAccept      = config.httpAccept       || "application/json, text/javascript, */*; q=0.01",
        dataTransformer = config.dataTransformer  || JSON.stringify;


    headers = ObjectExtensions.merge({"X-CSRF-Token" : config.token, "Content-Type" : contentType}, headers || {});
    $.ajax({
      type:         tp,
      contentType:  contentType,
      url:          url,
      data:         dataTransformer(data),
      async:        true,
      cache:        false,
      success:      function(r)       { receiveAjaxSuccess(r, cb, fail); },
      error:        function(j, s, e) { receiveAjaxFailure(j, s, e, url, data, headers, fail); },
      headers :     headers
    });
  }

  var methods = {
    doWithRetry : function(tp, url, data, headers, cb, fail, times) {
      if(times > 1) {
        request(tp, url, data, headers, cb, function() {
          methods.doWithRetry(tp, url, data, headers, cb, fail, times -1);
        });
      } else { request(tp, url, data, headers, cb, fail); }
    },
    get : function(url, cb, fail, retries)         { methods.doWithRetry("GET",    url, null, null, cb, fail, retries || DEFAULT_RETRIES); },
    put : function(url, data, cb, fail, retries)   { methods.doWithRetry("PUT",    url, data, null, cb, fail, retries || DEFAULT_RETRIES); },
    post : function(url, data, cb, fail, retries)  { methods.doWithRetry("POST",   url, data, null, cb, fail, retries || DEFAULT_RETRIES); },
    del : function(url, cb, fail, retries)         { methods.doWithRetry("DELETE", url, null, null, cb, fail, retries || DEFAULT_RETRIES); }
  };
  return methods;
};

(function( $ ){
  function CrossLogger() {
    if (!window.BackupLogger) window.BackupLogger = [];
    var consoleLogger = window.console;

    var arrayLogger = {
      write   : function(prefix, msg) { BackupLogger.push("[" + prefix + "]" + " : " + msg); },
      log     : function(msg)         { arrayLogger.write("LOG",     msg); },
      info    : function(msg)         { arrayLogger.write("INFO",    msg); },
      warn    : function(msg)         { arrayLogger.write("WARNING", msg); },
      error   : function(msg)         { arrayLogger.write("ERROR",   msg); }
    };

    function propagate(method, message) {
      $.each([consoleLogger, arrayLogger], function(i, logger) {
        if (logger) logger[method](message);
      });
      return masterLogger;
    }

    var masterLogger = {
      log : function(s)     { return propagate("log", s);   },
      error : function(s)   { return propagate("error", s); },
      warning : function(s) { return propagate("warn", s);  },
      warn : function(s)    { return propagate("warn", s);  },
      info : function(s)    { return propagate("info", s);  },
      "alert" : function()  { alert(BackupLogger); }
    };
    return masterLogger;
  }
  $.logger = CrossLogger();
})( jQuery );
/*
* LSJournal
*
* Creates a tracking object which allows POSTs to the Journal Service
*
* Init Config :
*   @bucketId         =>  bucketId
*   @entityId         =>  entityId
*   @variationId      =>  variationId
*   @serviceRoot      =>  http route to scala services root
*   @userId           =>  userId
*
* Create :            var lsJournal = LSJournal.init({
*                         entityId    : "test",                                             (string)  => Required journal key
*                         variationId : 0,                                                  (string)  => Required journal key
*                         bucketId    : "landingPages",                                     (string)  => Required journal key
*                         userId      : "foo@example.com",                                  (string)  => Required journal key
*                         serviceRoot : "http://lsdev.co/services/journal/v1",  (string)  => Protocol qualified uri to journal service api
*                         testing     : true                                                (bool)    => Determines whether or not a mock tracker is used
*                       });
* Usage :
*
*                     lsJournal.trackEvent/s([eventIds])
*
*                     lsJournal.trackEvent("foo", {"date", "2012/4/23"})
*
* Notes :
*
*                     * When calling trackEvent, an optional object can be passed in which will be merged into the journal data
*                     * When running in test mode, ajax data will be logged to the console if the console is present
*
*/

var LSJournal = {
  defaultConfig : {
    bucketId    : "landingPages",
    entityId    : "default",
    variationId : "default",
    userId      : "9999-9999-9999-9999",
    testing     : true
  },
  log : function(s) {
    var logger = (window.$ ? ($.logger ? $.logger : null) : null) || window.console || function() {};
    logger.log(s);
  },

  JournalData : function(config, eventId, optionalObject) {
    var bucketId    = config.bucketId || "landingPages",
        mergedData  = ObjectExtensions.merge({
          bucketId    : bucketId,
          entityId    : config.entityId,
          eventId     : config.eventId,
          variationId : config.variationId,
          userId      : config.userId
        }, optionalObject);
    mergedData.eventId = eventId;
    return mergedData;
  },

  JournalURI : function(config) {
    return (config.serviceRoot + "/store");
  },

  MockTracker : function(config) {
    var mockBase = "[LSJournal--TESTING--] ";

    var result = {
      trackEvent  : function(eventId, opt) {
        LSJournal.log(mockBase + "trackEvent :" + eventId + " to " + LSJournal.JournalURI(config) + " config : " + JSON.stringify(LSJournal.JournalData(config, eventId, opt))); return result;
      },
      trackEvents : function(eventIds) { $.each(eventIds, function(i,v) { result.trackEvent(v); }); }
    };
    return result;
  },

  Tracker : function(config, ajaxRequest) {
    function trackEvent(eventId, optionalObject) {
      var url       = LSJournal.JournalURI(config),
          data      = LSJournal.JournalData(config, eventId, optionalObject);

      ajaxRequest.post(url, [data], function(r) { LSJournal.log("[LSJournal] journal event successfully tracked to " + url + " with " + JSON.stringify([data])); });
    }

    var result = {
      trackEvent  : function(eventId, opt) { trackEvent(eventId, opt); return result; },
      trackEvents : function(eventIds) { $.each(eventIds, function(i,v) { result.trackEvent(v); }); return result; }
    };
    return result;
  },

  init : function(config) {
    config            = config || LSJournal.defaultConfig;
    var ajaxRequest   = LS.ajaxRequests.json,
        lsJournal     = LSJournal.Tracker(config, ajaxRequest),
        mockTracker   = LSJournal.MockTracker(config);

    return config.testing ? mockTracker : lsJournal;
  }
};
/*
* Initialize any jquery-driven application-wide features here
*/
$(function() {
  LSNamespace("LS.ajaxRequests.json", AbstractAjaxRequest());
  LSNamespace("LS.uri", LSUri());
  LSNamespace("LS.tracking.journal", LSJournal.init(ObjectExtensions.merge(LSJournal.defaultConfig, {
    serviceRoot : "/services/journal/v1",
    testing     : (LS.environment !== "production"),
    userId      : LS.viewer.id || "9999-9999-9999-9999",
    entityId    : "deals"
  })));

  FireLSSubscriberTrackingEvents();
});

// Temporary metric tracking hack -- remove once sufficient metrics have been collected
function FireLSSubscriberTrackingEvents() {
  $f.foreach(LS.eventQueue.pop("LSJournal", "skippedRoadblockForSubscriberCookie"), function(v) {
    LS.tracking.journal.trackEvent("skippedRoadblockForSubscriberCookie");
  });
}
/*
* LSUri
*
* Provides an interface for accessing erb rendered tlds
*
* Dependencies:
*
* In order for this library to work, the following object
* structure must exist:
*
* window.LS = {
*   uris : {
*     tlds : {
*       tldName : "tldValue"
*     }
*   }
* }
*
*
* Usage:
*
*   Examples:
*                     LS.uri.get("deals")
*                      => "lsdev.co"
*
*                     LS.uri.get("deals")
*                      => "http://lsdev.co"
*/
(function() {
  function UnwrappedURI(tld,k) {
    return tld[k] || null;
  }
  function WrappedURI(unwrapped, prot) {
    return prot ? (prot + unwrapped) : unwrapped;
  }

  window.LSUri = function(){
    var uris = window.LS ? LS.uris  : {},
        tlds = uris.tlds            || {},
        prot = uris.protocol        || window.location.protocol + "//";

    function get(k, options) {
      options           = options || {};
      var protocol      = (options.protocol === true) ? prot : null,
          unwrappedURI  = UnwrappedURI(tlds, k);

      return unwrappedURI ? WrappedURI(unwrappedURI, protocol) : null;
    }

    var result = {
      get       : get,
      "_class"  : "LSUri"
    };
    return result;
  };
})();
