(function (window, $) {



	var _log = function(msg){
		var isDebug = ~document.location.search.indexOf("debug");
		if (isDebug && typeof console !== "undefined" && !!console.log) {
			if (typeof msg === "string") console.log("dcRefreshableAd: "+msg);
			else if (typeof msg === "object" && !!console.dir) console.dir(msg);
			else console.log(msg);			
		}
	};



  /**
   * jQuery UI widget for handling Double Click advertising
   *
   * version 1.1.0 - updated to support non-mlb implementations - Caleb
   *
   * Usage:
   *
   * // Instantiate the ad widget, and begin polling
   * $('#div').dcRefreshableAd({ size: '728x90', interval: 30 });
   *
   * Options:
   * - site {String} defaults to mlb/club.mlb, example: 'domain.com'
   * - size {String} Dimensions of the ad WIDTHxHEIGHT, example: '300x250'
   * - interval {Number} Seconds between ad refreshes/impressions
   * - max {Number} Maximum number of ad refreshes/impressions
   * - iframe {String} HTML for creating the <iframe> element
   * - customparams {object} a hash map of key/val pairs that gets parsed and appended to the ad URL
   *
   * Methods:
   * - refresh Loads a new ad into the widget
   * - start Starts refreshing the ad at the configured interval
   * - stop Stops refreshing the ad at the configured interval
   * - destroy Cleanup widget events and elements
   *
   * Events:
   * - dcrefreshableadrefresh fires when before the ad is refreshed
   * - dcrefreshableadload fires when the ad is loaded (iframe onload)
   * - dcrefreshableadstart fires when the start method 
   * - dcrefreshableadstop
   *
   * // Start and stop the poller
   * $('#div').dcRefreshableAd('start');
   * $('#div').dcRefreshableAd('stop');
   *
   * // Manually refresh the ad
   * $('#div').dcRefreshableAd('refresh');
   *
   * // Destroy the widget
   * $('#div').dcRefreshableAd('destroy');
   *
   */
  $.widget('bam.dcRefreshableAd', {

    options: {
      size:     '',
	  site:		'',
      interval: 0,
      max:      Infinity,
	  tile:		'',
	  pos:		'',
      iframe:   '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"/>',
      customparams: {}
    },

    /**
     * Create and customize necessary DOM elements, including an iframe
     * to contain refreshable advertising.
     * @private
     */
    _create: function () {

      // Do not instantiate ad if using secure protocol to avoid
      if (window.location.protocol === 'https:') {
        return;
      }

      var self = this,
          elem = this.element,
          opts = this.options,
          base = this.widgetBaseClass,
	      dims;

		  
		// "barf bag" hack for FF < 4 iframe refresh bug:
		// https://bugzilla.mozilla.org/show_bug.cgi?id=279048
		// https://bugzilla.mozilla.org/show_bug.cgi?id=363840 
		if ($.browser.mozilla) {
			opts.iframe += '<iframe src="#" style="display:none;"></iframe>';
		}		  
		  
		  
      if (opts.size) {
        dims = opts.size.split('x');
      } else {
        dims = [elem.width(), elem.height()];
        opts.size = dims.join('x');
      }
      
      if (dims.length !== 2) {
        throw '$.fn.dcRefreshableAd: Invalid size option. Example: "728x90"';
      }

      elem.addClass(base);

      this.refreshableElement = elem.is('iframe') ? elem : $(opts.iframe).appendTo(elem);

      this.refreshableElement
        .addClass(base + '-refreshable')
        .attr({
          width:  dims[0],
          height: dims[1]
        })
        .bind('load', function (evt) {
          self._handleRefresh(evt);
        });
		
      // Store position and tile values for generating URLs  	  
	  this.pos  = opts.pos || (window.dc_tiles[opts.size] = ~~+window.dc_tiles[opts.size] + 1);	  
	  this.tile = opts.tile || ++window.dc_numads;
	  
      // Track impressions (passed with dcrefreshableadload event)
      this.impressions = 0;

      this.refresh();

      if (opts.interval) {
        this.start();
      }
    },

    /**
     * Handle widget cleanup
     * @public
     */
    destroy: function () {

      this.stop();

      if (this.element !== this.refreshableElement) {
        this.refreshableElement.remove();
      }

      this.element.removeClass(this.widgetBaseClass);

      $.Widget.prototype.destroy.apply(this, arguments);
    },

    /**
     * Create a random number for the ord value
     * @private
     * @return {Number} a big random number
     */
    _randomizeOrdValue: function () {
      return Math.round(Math.random() * 10000000000000000);
    },

    /**
     * Generate the DoubleClick URL based on page and widget configuration
     * @private
     * @return {String} a valid DoubleClick ad URL
     */
    _generateUrl: function () {
	     var section   = window.section || 'empty',
          pageid    = window.page_id || window.pageid || 'empty',
          vkey      = window.bam && window.bam.vkey,
          contentid = window.content_id,
          keyval    = window.dc_keyVal,
          club      = window.club || 'mlb',
          lang      = window.dc_lang || 'en',
          domains   = window.c_domain || {},
          customparams = this.options.customparams,
          site = this.options.site || window.dc_site || (lang !== 'en' ? lang + '.' : '') + domains[club] + '.mlb',
          params    = [],
          key;
		  
      params.push(
        section,
        'pageid=' + pageid,
        'sz=' + this.options.size,
        'pos=' + this.pos
      );
      
      vkey      && params.push('vkey=' + vkey);
      contentid && params.push('contentid=' + contentid);
      keyval    && params.push(keyval);

      params.push(
        'tile=' + this.tile,
        'ord=' + ((this.options.syncOrd) ? window.ran_number : this._randomizeOrdValue())		
      );

      for(key in customparams){
        params.push(key + "=" + customparams[key]);
      }
	  
      var output = 'http://ad.doubleclick.net/adi/' + site + '/' + params.join(';');
      _log("generated URL: " + output);

      return output;
	  
    },

    /**
     * Refresh the ad by replacing the <iframe> URL
     * @public
     */
    refresh: function () {
      if (this.impressions >= this.options.max) {
        this.stop();
        return;
      }
      
      var url = this._generateUrl();

      // Trigger the refreshstart event
      this._trigger('refresh', null, { url: url });

      // Use location.replace so window.history is not affected
      this.refreshableElement[0].contentWindow.location.replace(url);
    },

    /**
     * Handle the onload event of the <iframe> element
     * @private
     * @param {Object} evt jQuery <iframe> onload event
     */
    _handleRefresh: function (evt) {
      this._trigger('load', evt, { impressions: ++this.impressions });
    },

    /**
     * Start periodically refreshing the ad at the configured interval
     * @public
     */
    start: function () {

      var self     = this,
          interval = this.options.interval;

      if (!this.timer && interval) {

        // Start interval
        this.timer = window.setInterval(function () {
          self.refresh();
        }, interval * 1000);

        // Trigger start event
        this._trigger('start');
      }
    },

    /**
     * Stop periodically refreshing the ad
     * @public
     */
    stop: function () {
      if (this.timer) {

        // Clear interval
        window.clearInterval(this.timer);
        this.timer = null;

        // Trigger stop event
        this._trigger('stop');
      }
    }

  });

})(window, jQuery);
