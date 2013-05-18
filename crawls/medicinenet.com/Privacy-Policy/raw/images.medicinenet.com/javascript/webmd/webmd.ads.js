/*! webmd.ads */

            /* Temporarily putting in WebMD.ads into the XSL as this is for TESTING ONLY. Once this would go out of the testing phase, we would make the fix/update to webmd.ads and pop it into scripts.js */

/**
 * @namespace
 */
webmd.ads = {

  /**
   * Contains ad server URL parameters
   * @type {Object}
   */
  params: {},

   /**
    * POS mapping that maps pos numbers to ad size. 
    * This mapping is used by the ad seed call code to create the correct size iframe based on ad pos values
    *
    * This is the end all be all holy gospel of ad pos values to size. 
    * If it's not on this list, it will not happen, as we do not use PB anymore to set ad size. We only use PB to set POS values
    */
    posSizeMapping : {
    101 : {
      height:90,
      width:728
    },
    102 : {
      height:90,
      width:728
    },
    111 : {
      height:240,
      width:120
    },
    112 : {
      height:600,
      width:120
    },
    113 : {
      height:600,
      width:160
    },
    121 : {
      height:250,
      width:300
    },
    131 : {
      height:600,
      width:300
    },
    132 : {
      height:600,
      width:300
    },
    133 : {
      height:600,
      width:300
    },
    404 : {
      height:250,
      width:300
    },
    700 : {
      height:198,
      width:300
    },
    701 : {
      height:199,
      width:145
    },
    901 : {
      height:1,
      width:1
    },
    5000 : {
      height:1,
      width:494
    },
    5001 : {
      height:1,
      width:494
    },
    5002 : {
      height:1,
      width:308
    },
    5003 : {
      height:1,
      width:308
    },
    0 : {
      height:0,
      width:0
    }
  },

  /**
   *
   */
  init: function() {

    var re = new RegExp('(.*/)(.*)');
    var paramsObj = {};

    // Find real ad modules
    $("*[id*='Ad_Iframe']").each ( function() {
      splitParams(this,paramsObj);
    });

    // Find interactive ad modules
    $.each(webmd.ads.refresh.defaults.src, function() {
      splitParams(this,paramsObj);
    });

    function splitParams(adframe, paramsObj) {
      var fullParams, paramsArray, i, nvSplit, name, value;
      var adsurl = $(adframe).attr("src");
      var m = re.exec(adsurl);
      if (m !== null) { fullParams  = m[2] === undefined ? "" : m[2]; }
      if (fullParams) {
        fullParams = fullParams.replace(/amp;/g,""); // Clean up messy &amp; parameters in the fullParams string
        paramsArray = fullParams.split('&');
        for (i=0; i<paramsArray.length; i++) {
          nvSplit = paramsArray[i].split('=');
          name = decodeURIComponent(nvSplit[0]);
          value = decodeURIComponent(nvSplit[1]);
          value = value.replace(/\//g,"%2f");
          // If the current param is not the pos value, or pos doesnt exist in the webmd.ads.params object
          if (name != "pos" || !(paramsObj[name])) {
            // set current param name-value pair
            paramsObj[name] = value;
          // If the current param is the pos value and pos already has a value in the webmd.ads.params object
          } else {
            // Add current pos value to comma-delimited list of pos values
            paramsObj[name] = paramsObj[name] + "," + value;
          }
        }
      }
      return true;
    }

    this.params = paramsObj;
  },

  /**
   * Throttled function to refresh all the ad modules on the calling page.  
   * 
   * Throttling the amount of calls (webmd.ads.refresh.throttling.maxCalls) that can be made in a given amount of time (webmd.ads.refresh.throttling.perSeconds) works by adding the current time to an array after removing the older calls.  If the length of the array is in the allowable range, make the call to refresh the ads, webmd.ads._refresh().
   *
   * This function will looks for the default parameters of the webmd.ads.refresh.defaults object or override the defaults with the passed object.
   * @example
   * // refreshes ads using default refresh values
   * webmd.ads.refresh();
   *
   * // refreshes only the custom ad module with id="myAdModule"
   * webmd.ads.refresh({selector: "#myAdModule"});
   *
   * //  adds the params &segm=0&foo=2 to the end of the src URL
   * webmd.ads.refresh({params: { segm: 0, foo: 2 }});
   *
   * var adObj = {params: { segm: 0, foo: 2 }, selector: "#myAdModule"};
   * webmd.ads.refresh(adObj);
   *
   * // change the global default params
   * webmd.ads.refresh.defaults.params = {segm:0, foo: 2};
   *
   * // change the global default selector(s) and then call refresh using the updated default values
   * webmd.ads.refresh.defaults.selector = "#myAdModule";
   *
   * @param     {object}    [options]       Refresh options
   * @param     {string}    [options.selector]  Comma-delimited list of jQuery selectors corresponding to ad modules to be updated
   * @param     {object}    [options.src]     Created iframe elements output by XSL for interactive ad modules; these tags are referenced by ID (e.g. webmd.ads.src.bannerAd_fmt). Attribute values for those tags can be accessed and manipulated via the JQuery $().attr() method
   * @param     {object}    [options.params]  Name/value pairs to be added to the ad src URL as query string parameters
   * @param     {Function}    [options.filter]  Receives the src string, manipulates it in some fashion, and then returns that result as a string to webmd.ads.refresh
   */
  refresh: function(options) {
    var self = this,
      currentTime = new Date().getTime(),
      oldestIndex = 0,
      queue = self.refresh.throttling.queue,
      maxTime = self.refresh.throttling.perSeconds * 1000;

    // run through array to find older calls
    $.each(queue, function(i,timeQueued){
      if (currentTime - timeQueued > maxTime) {
        return false;
      } else {
        oldestIndex++;
      }
    });

    // remove older call times
    queue.splice(oldestIndex);

    // add new call time
    queue.unshift(currentTime);

    if (queue.length <= self.refresh.throttling.maxCalls) {
      // make actual refresh call if allowed
      self._refresh(options);
    } else {
      // throw warning and remove oldest call to keep array small
      webmd.debug('WARNING!  Too many ad refresh calls being made');
      queue.pop();
    }

  },

  /**
   * Refresh all ad modules on the calling page
   *
   * @see     webmd.ads.refresh
   * @private
   */
  _refresh: function(options) {

    // Set default options, and let passed-in options override them
    var o = $.extend({}, webmd.ads.refresh.defaults, options);

    //  webmd.ads.segnum set elsewhere, if needed, or default to 0
    var transTileId = Math.round(99999999*Math.random());

    // Grab the top divs for all possible ad elements on the page
    $(o.selector).each( function() {

      var ad, src;

      // Remove all children of the original webmd iframe and possible expandable divs
      var adFrame = $(this).children("*[id*='Ad_Iframe']");
      $(this).find("*").not("*[id*='Ad_Iframe'],.ad_placeholder").remove();
      adFrame.empty();

      // Look for the existence of an ad element
      ad = $(this).find("[id]");

      // If no ad element is found in the current selector, it may be an interactive ad module
      if (!ad[0]) {

        // Look in the object to find any properties of the o.src object that match the current id
        var adTag = o.src[$(this).attr("id")];
        // Grab the src attribute of adTag iframe for manipulation
        src = $(adTag).attr("src");

        // If they're found, then it's an interactive ad module that needs an initial ad load
        if (src) {
          // Clean up messy &amp; parameters in the http query string
          src = src.replace(/amp;/g,"");

          src = replaceAdParam(src, "transactionID", transTileId);
          src = replaceAdParam(src, "tile", transTileId);
          // replace and/or add params & filter for initial ad load
          $.each(o.params, function(i, val) {
            // Replace the param value if it exists
            src = replaceAdParam(src, i, val);
            // Add the param if it's not already there
            if(src.indexOf(i + "=") < 0) {
              src = src + "&" + i + "=" + val;
            }
          });

          if ($.isFunction(o.filter)) {
            src = o.filter(src);
          }

          // Update the adTag iframe's src value
          $(adTag).attr("src",src);
          // Laboriously convert the entire tag to a string, because IE sucks at createElement for iframes
          adTag = '<iframe id="' + $(adTag).attr("id") + '" width="' + $(adTag).attr("width") + '" height="'  + $(adTag).attr("height") + '" src="' + $(adTag).attr("src") + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style=""></iframe>';
          // Append the tag to the placeholder div
          $(this).children("div.ad_placeholder").replaceWith(adTag);
          return;
        } else {
          // no ad found, and no Interactive ad module vars so remove ad frame
          $(this).parent().remove();
          return;
        }
      } else {

        src = ad.attr("src");
        // ad element was found, but it has no src. Danger, Will Robinson! Dump out of ad refresh
        if (!src) { return; }

        src = replaceAdParam(src, "transactionID", transTileId);
        src = replaceAdParam(src, "tile", transTileId);

        // replace and/or add params & filter
        $.each(o.params, function(i, val) {
          src = replaceAdParam(src, i, val);

          // Add the param if it's not already there
          if(src.indexOf(i + "=") < 0) {
            src = src + "&" + i + "=" + val;
          }
        });

        if ($.isFunction(o.filter)) {
          src = o.filter(src);
        }

        // clear the style tag on the iframe in case 3rd part people have added inline styles to it
        $(ad).attr('style', '');

        // Update the iframe
        if (ad[0].contentWindow) {
          // To avoid adding to the page history and messing up the back button,
          // use location.replace instead of changing the src of the iframe
          // Catch exceptions thrown by users with Ad Blocker extensions
          try { ad[0].contentWindow.location.replace(src); } catch(e) { webmd.debug(e) }
        } else {
          ad.attr({src: src});
        }
      }
    });

    /**
     * [replaceAdParam description]
     *
     * @inner
     * @param  {[type]} srcStr [description]
     * @param  {[type]} pName  [description]
     * @param  {[type]} pValue [description]
     * @return {[type]}        [description]
     */
    function replaceAdParam(srcStr, pName, pValue) {
      var paramRegEx = new RegExp("\\b" + pName + "=[^&#\"']*");
      srcStr = srcStr.replace(paramRegEx, pName + "=" + pValue);
      return srcStr;
    }
  }, 

  /**
   * Public function used be the ad modules to handle the ad seed call and write out ads
   * We first setup the proper ad based on the attributes provided in the passed in param. 
   * Then we go off and setup a deferred promise to listen to the ad seed call
   * Once that promise comes back, we check to see if there are any overrides to the default param
   * If there are, we use those, otherwise, we use the defaults and write out the ad
   *
   * @param   {object}  Contains the attributes of the ad to setup. Requires the following
   *                    - adLocation - "banner", "left", "right"
   *                    - adURL - The URL as the XSL processes it including all parameters 
   *                    - trans - The trans id as provided by runtime
   *                    - tile - The tile id as provided by runtime
   *                    - pos - The pos value provided by the PB module
   *
   * @public
   */
  handleAdSeedCall : function(ad) {

    var self = this;

    // check to make sure we have everything we need to handle the ad seed call
    // if we don't something was messed up with the XSL, so we get out before we write some weird looking iframe
    if ((typeof(ad) != 'object') || (!ad.adLocation) || (!ad.adURL) || (!ad.trans) || (!ad.tile) || (!ad.pos)) {
      webmd.debug('Ad Seed Call: The proper ad parameters were not provided. Will not create ad iframe');
      return;
    }

    // finish out entire ad property object
    
    // fill out iframe id and ad container
    ad.iframeId = ad.adLocation + 'Ad_Iframe';
    ad.iframeContainer = ad.adLocation + 'Ad_fmt';
    ad.iframeContainerWrapper = ad.adLocation + 'Ad_rdr';
    // grab width and height based on mapping and pos value that came from pb
    ad.width = webmd.object.get('width', self.posSizeMapping[ad.pos]) || 0;
    ad.height = webmd.object.get('height', self.posSizeMapping[ad.pos]) || 0;

    // create the webmd.ads object for the correct iframe
    webmd.ads.refresh.defaults.src[ad.iframeContainer] = document.createElement("iframe");
    
    // populate the attributes with the defaults as passed in by the PB module
    $(webmd.ads.refresh.defaults.src[ad.iframeContainer]).attr({
        src:ad.adURL,
        width:ad.width,
        height:ad.height,
        id:ad.iframeId,
        title:"Advertisement Frame",
        marginwidth:0,
        marginheight:0,
        style:"margin:0;",
        frameborder:0,
        scrolling:"no"
    });

    // if there is a seed call, wait till it's done and repopulate the attributes. If there isn't one, write ad with defaults
    if (webmd.ads.adSeedCallPromise) {
        webmd.ads.adSeedCallPromise.done(
            function(){  

                // override the default parameters from the ad seed call. 
                // If we didn't get a new pos from the seed call, just use the default one we had
                ad.pos = webmd.object.get('webmd.ads.pageConfig.adPosValues.' + ad.adLocation + '.pos') || ad.pos;
                ad.height = webmd.object.get('height', self.posSizeMapping[ad.pos]) || ad.height;
                ad.width = webmd.object.get('width', self.posSizeMapping[ad.pos]) || ad.width;

                $(webmd.ads.refresh.defaults.src[ad.iframeContainer]).attr({
                    width:ad.width,
                    height:ad.height
                });

                // pass in the ad object into private function so it creates a new instance of the object as we need that
                self._writeSeedCallAd(ad);
            }
        );
    }
    else {
        // pass in the ad object into private function so it creates a new instance of the object as we need that
        self._writeSeedCallAd(ad);
    }
  },

  /**
   * Private function used by the handleAdSeedCall function to actually write the ad out on the page
   *
   * @param   {object}  Contains the attributes of the ad to write. Requires the following
   *                    - iframeContainer - the name of the iframe container of the ad we want
   *                    - trans - The trans id as provided by runtime
   *                    - tile - The tile id as provided by runtime
   *                    - pos - The pos value provided by the PB module
   *
   * @private
   */ 
  _writeSeedCallAd : function(ad) {
    // refresh/create the ad with all parameters specified
    webmd.ads.refresh({selector:'#' + ad.iframeContainerWrapper + ' #' + ad.iframeContainer, params:{pos:ad.pos, transactionID:ad.trans, tile:ad.tile}});
    webmd.debug(webmd.ads.refresh.defaults.src[ad.iframeContainer]);
   }
               
   
};

$( function() {
  webmd.ads.init();
});

/**
 * Defaults for webmd.ads.refresh
 * 
 * @namespace 
 * @type    {Object}
 */
webmd.ads.refresh.defaults = {
  /**
   * Comma-delimited list of jQuery selectors corresponding to ad modules to be updated
   * @type    {String}
   * @default   #bannerAd_fmt, #leftAd_fmt, #rightAd_fmt, #slideshow_ad_300x250, #cw_btm_ad_300x250
   */
  selector: "#bannerAd_fmt, #leftAd_fmt, #rightAd_fmt, #slideshow_ad_300x250, #cw_btm_ad_300x250",

  /**
   * Created iframe elements output by XSL for interactive ad modules; these tags are referenced by ID (e.g. webmd.ads.src.bannerAd_fmt). Attribute values for those tags can be accessed and manipulated via the JQuery $().attr() method
   * @type    {Object}
   */
  src: {},

  /**
   * Name/value pairs to be added to the ad src URL as query string parameters
   * @type    {Object}
   */
  params: {}
};
/**
 * Throttling variables for webmd.ads.refresh
 * 
 * @namespace   
 * @type    {Object}
 */
webmd.ads.refresh.throttling = {
  /**
   * maximum amount of calls that can be made per a given time
   * @type    {Number}
   * @default   10
   */
  maxCalls: 10,

  /**
   * amount of seconds that a set amount of calls can be made before halting
   * @type    {Number}
   * @default   5
   */
  perSeconds: 5,

  /**
   * ad refresh queue
   * @type    {Array}
   */
  queue: []
};       
                    

