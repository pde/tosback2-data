// Bootstrap, general utility file.
// Loads 3rd party scripts asynchronously. Supports callback functions
window.BC || (window.BC = {});
BC.asyncLoader = {
    _TIMEOUT_CHECK_TIME : 10,
    _queue : [],
    type: 'asyncLoader',
    enqueue : function(object) {
        if (object.queue) {
            
            // Queue up object to be loaded after DOM ready
            this._queue.push(object);
        }
        else {
            
            // Execute the code immediately.
            this.executeTag(object);
        }
    },
    dequeue : function() {
        var object = BC.asyncLoader._queue.shift();
        BC.asyncLoader.executeTag(object);
    },
    executeTag : function(object) {
        
        // If there's standalone code to execute, do it first.
        if (object.handler) {
            object.handler();
        }
        else {
          var baseElement = document.getElementById(object.id);
          var src = object.src;
          
          // Set the onload callback, if provided.
          if (object.callback) {
              baseElement.onload = object.callback;
          }
          
          // Add params to the src URL, if provided.
          if (object.params) {
              var hasParam = src.indexOf('?') != -1;
              
              // Append params to the src URL, if applicable.
              for (var i = 0; i < object.params.length; i++) {
                  var param = object.params[i];
                  src += (hasParam ? '&' : '?') + param.name + '=' + encodeURIComponent(param.value);
                  hasParam = true;
              }
          }
          baseElement.setAttribute('src', src);
        }
    },
    checkQueue : function() {
        
        // Method used to start the watcher, and also to check the queue
        while(BC.asyncLoader._queue.length > 0) {
            BC.asyncLoader.dequeue();
        }
        
        setTimeout(BC.asyncLoader.checkQueue, BC.asyncLoader._TIMEOUT_CHECK_TIME);
    }
};

// Adds javascript error handler, so any errors are appended to the body
// for selenium tests.
if (!(/\bdev=/).test(window.location.search)) {
    window.onerror = function(msg) {
       BC.asyncLoader.enqueue({
           queue: true,
           handler: function() {
               var old_msg = document.body.getAttribute("jserror");
               old_msg = old_msg ? old_msg + " ; " : "";
               document.body.setAttribute("jserror", old_msg + msg);
           }
       });
       return false;
    };
}

// Queue up any publish events before pubsub has loaded.
BC.queue = [];
window.$ || (window.$ = {});
if (!$.publish) {
    $.publish = function() {
        BC.queue.unshift(arguments);
    }
}

// Adds classes to the <body> depending on OS, browser and browserVersion.
(function() {
    function getOs(nav) {
        var platform = nav.platform || '',
            match, os;
        
        match = platform.match(/win|mac|ipad|iphone/i);
        os = match ? match[0].toLowerCase() : '';

        return os;
    }

    function getBrowserName(nav) {
        var userAgent = nav.userAgent,
            vendor = nav.vendor || '',
            browserName = '';

        if (/firefox/i.test(userAgent)) {
            browserName = 'ff';
        }
        if (/msie/i.test(userAgent)) {
            browserName = 'ie';
        }
        if (/apple/i.test(vendor)) {
            browserName = 'sfr';
        }
        if (/google/i.test(vendor)) {
            browserName = 'crm';
        }

        return browserName;
    }

    function getVersion(nav) {
        var userAgent = nav.userAgent,
            storedName,
            version = '',
            browserName = getBrowserName(nav),
            regexpMap = { ff:  / Firefox\/(\d+\.\d+)/i,
                          ie:  / MSIE (\d+\.\d+);/i,
                          sfr: / Version\/(\d+\.\d+)(\.\d)? /i, 
                          crm: / Chrome\/(\d+\.\d+)\./i },
            versionRegex = regexpMap[browserName];

        if (versionRegex) {
            storedName = userAgent.match(versionRegex);
            version = storedName && storedName[1];
        }

        return version.replace(/\./, '');
    }

    var nav = window.navigator,
        html = document.documentElement,
        os = getOs(nav),
        browserName = getBrowserName(nav),
        version = getVersion(nav);

    html.className = html.className.replace(/no-js/, os + ' ' + browserName + ' ' + browserName + version);
})();