var ObjectExtensions = {
  nativeMerge : function(o1, o2) {
    for (var prop in o2) {
      if(o2.hasOwnProperty(prop)) {
        var value = o2[prop];

        if (o1.hasOwnProperty(prop)) {
          // both objects have the same property
          if(typeof(value) === "object" && typeof(o1[prop]) === "object") {
            // if both objects have values which are objects, copy them to a new objects
            o1[prop] = ObjectExtensions.merge(o1[prop], value);
          } else if (value !== "" && value !== null) {
            // if both objects have the same property, the second object's value is used unless it is null
            o1[prop] = value;
          }
        } else {
          if(typeof(value) === "object" && value !== null) {
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
};;// configurable ajax request object
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
;/*
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
    var logger = window.console || {log:function(){}};
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

      ajaxRequest.post(url, [data], function(r) { });
    }

    var result = {
      trackEvent  : function(eventId, opt) { trackEvent(eventId, opt); return result; },
      trackEvents : function(eventIds) { $.each(eventIds, function(i,v) { result.trackEvent(v); }); return result; }
    };
    return result;
  },

  init : function(config) {
    config            = config || LSJournal.defaultConfig;
    var ajaxRequest   = AbstractAjaxRequest(),
        lsJournal     = LSJournal.Tracker(config, ajaxRequest),
        mockTracker   = LSJournal.MockTracker(config);

    return config.testing ? mockTracker : lsJournal;
  }
};
;