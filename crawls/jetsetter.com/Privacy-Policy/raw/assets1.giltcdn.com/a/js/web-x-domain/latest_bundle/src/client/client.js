// x_domain.client v1.0.5

var Gilt;
if (!Gilt) {
  Gilt = {};
}

Gilt.xDomainClient = (function (frameDomain) {

      // Temporary (?) ugly-ass fix for ensuring everyone uses the same prod domain
  if (frameDomain && frameDomain === '//giltconvoy.com/') {
    frameDomain = '//www.giltconvoy.com/';
  }

      // And make sure stage and prod are secure if user hasn't specified
  if (frameDomain && frameDomain.indexOf('//') === 0) {
    frameDomain = 'https:' + frameDomain;
  }

  var

    /**
     * The DOM id for the iframe
     * @const FRAME_ID
     * @private
     */
    FRAME_ID = 'commons-frame',

    /**
     * The domain for the iframe
     * @const FRAME_DOMAIN
     * @private
     */
    FRAME_DOMAIN = frameDomain ? frameDomain : 'http://localhost:7810/',

    /**
     * Reference to the frame's content window for all methods to use
     * @property frame
     * @private
     */
    frame = null,

    /**
     * Whether or not the iframe is ready
     * @property ready
     * @private
     */
    ready = false,

    /**
     * Whether or not the init method is running and we are waiting for the iframe
     * @property initStarted
     * @private
     */
    initStarted = false,

    /**
     * A list of post requests waiting to be flushed when the iframe is ready
     * @property postQueue
     * @private
     */
    postQueue = [],

    /**
     * An object of post requests including their callbacks, stored by post handle
     * @property callbacks
     * @private
     */
    callbacks = {},

    /**
     * Creates the iframe and sets up the load event
     * @method init
     * @private
     */
    init = function () {
      initStarted = true;
      createFrame();
    },

    /**
     * When the communication channel is set up, marks ready
     * and flushes the queue.
     * @method afterReady
     * @private
     */
    afterReady = function () {
      if (!ready) {
        ready = true;
        frame = document.getElementById(FRAME_ID);
        if (frame) {
          frame = frame.contentWindow;
          flushPostQueue();
        }
      }
    },

    /**
     * Generates a unique handle to use for a client post request
     * @method generateHandle
     * @private
     * @return  {String} A unique handle to use as a key for storage
     */
    generateHandle = function () {
      return 'h' + new Date().getTime() + parseInt(Math.random()*100000000000, 10);
    },

    /**
     * Creates an iframe and appends it to the document body
     * @method createFrame
     * @private
     * @return  {DOMElement} The newly created iframe
     */
    createFrame = function () {
      var iframe = document.createElement('iframe');

      iframe.id = FRAME_ID;
      iframe.src = FRAME_DOMAIN + 'xdomain/frame';
      iframe.width = 1;
      iframe.height = 1;

      document.getElementsByTagName('body')[0].appendChild(iframe);

      return iframe;
    },

    /**
     * Fires off post calls for everything in the queue
     * @method flushPostQueue
     * @private
     */
    flushPostQueue = function () {
      var i;

      for (i = 0; i < postQueue.length; i += 1) {
        makePost(postQueue[i]);
      }
    },

    /**
     * Pushes a data object into the queue of posts to be made
     * @method queuePost
     * @private
     * @param   {Object} postData The object of data to be posted
     */
    queuePost = function (postData) {
      postQueue.push(postData);
    },

    /**
     * Directly posts a message to the frame given a data object
     * @method makePost
     * @private
     * @param   {Object} postData The object of data to be posted
     */
    makePost = function (postData) {
      var handle = generateHandle();
      postData.handle = handle;
      callbacks[handle] = postData.callback;
      delete postData.callback; // JSON doesn't do functions, so we store in the callbacks object and remove before posting.
      frame.postMessage(JSON.stringify(postData), FRAME_DOMAIN);
    },

    /**
     * Takes params, transforms to a data object to be posted, and queues or makes the post
     * to the Convoy iframe. Fires your callback when the iframe is finished.
     * @method post
     * @public as post
     * @param  {String}   app      The commons application targeted by the post
     * @param  {String}   method   The method to be invoked in the commons app requested
     * @param  {Array}    params   The params to be sent to the method, or empty, defaults to []
     * @param  {Function} callback The callback to run after the post completes
     */
    post = function (app, method, params, callback) {
      if (!window.postMessage) {
        return;
      }

          // Argument shifting so that params is not required
      if (typeof params === 'function') {
        callback = params;
        params = [];
      }

          // If there's only one param, make sure it's an array anyway
      if (Object.prototype.toString.call(params) !== '[object Array]') {
        params = [params];
      }

      var postData = {
        app : app,
        method : method,
        params : params || [],
        callback : callback // Stores the callback temporarily, but can't pass to iframe. See removal and comment in makePost().
      };

      if (!ready && !initStarted) {
        init();
        queuePost(postData);
      } else if (!ready && initStarted) {
        queuePost(postData);
      } else {
        makePost(postData);
      }
    },

    /**
     * Normalizes listening to a window message event
     * @method listen
     * @private
     * @param   {Function} fn The function to execute when a window message comes in
     */
    listen = function (fn) {
      if (!window.postMessage) {
        return;
      }

      if (window.addEventListener) {
        window.addEventListener('message', fn, false);
      } else if (window.attachEvent) {
        window.attachEvent('onmessage', fn);
      }
    };

        // Kicks off listening, branches for the two message formats we could receive
    listen(function (event) {
      var obj = {};

      if (typeof event.data !== 'undefined') {
        try {
          obj = JSON.parse(event.data);
        } catch (e) {
          // TODO: fix this, we have different message formats
        }
      }

      if (obj.handle && typeof callbacks[obj.handle] === 'function') {
        callbacks[obj.handle](obj.response);
      } else if (obj.ready && obj.ready === true) {
        afterReady();
      }
    });

  return {
    post : post
  };
}(Gilt ? (Gilt.configXDomainFrameDomain || '') : ''));
