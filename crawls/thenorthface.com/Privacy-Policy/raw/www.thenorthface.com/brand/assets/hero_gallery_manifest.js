/* From object.js (reset to local variable so that the prototype methods added to Object don't collide with other libraries) ------------------------------ */

var object = {
  getType: function(o) {
    switch(o) {
      case null: return 'Null';
      case (void 0): return 'Undefined';
    }
    var type = typeof o;
    switch(type) {
      case 'boolean': return 'Boolean';
      case 'number':  return 'Number';
      case 'string':  return 'String';
    }
    return 'Object';
  },

  keys: function(object) {
    if (this.getType(object) !== 'Object') { alert('type error'); }
    var results = [];
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        results.push(property);
      }
    }
    return results;
  },

  isFunction: function(object) {
    return Object.prototype.toString.call(object) === '[object Function]';
  },

  isUndefined: function(object) {
    return typeof object === "undefined";
  },

  extend: function(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }
};

/* From array.js ------------------------------ */
function $A(iterable) {
  if (!iterable) return [];
  // Safari <2.0.4 crashes when accessing property of a node list with property accessor.
  // It nevertheless works fine with `in` operator, which is why we use it here
  if ('toArray' in Object(iterable)) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
};

/* From function.js ------------------------------ */
Function.prototype.argumentNames = function() {
  var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
    .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
    .replace(/\s+/g, '').split(',');
  return names.length == 1 && !names[0] ? [] : names;
};

// patched with inline helpers from function.js
Function.prototype.bind = function(context) {
  if (arguments.length < 2 && object.isUndefined(arguments[0])) return this;
  var __method = this,
    args = Array.prototype.slice.call(arguments, 1);
  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }
  function merge(array, args) {
    array = Array.prototype.slice.call(array, 0);
    return update(array, args);
  }
  return function() {
    var a = merge(args, arguments);
    return __method.apply(context, a);
  }
};

// patched with inline helper from function.js
Function.prototype.wrap = function(wrapper) {
  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }
  var __method = this;
  return function() {
    var a = update([__method.bind(this)], arguments);
    return wrapper.apply(this, a);
  }
};

/* From class.js ------------------------------ */
/* Based on Alex Arnell's inheritance implementation. */
/* Refer to Prototype's web site for a [tutorial on classes and inheritance (http://prototypejs.org/learn/class-inheritance). */
var Class = (function() {

  // Some versions of JScript fail to enumerate over properties, names of which
  // correspond to non-enumerable properties in the prototype chain
  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      // check actual property name, so that it works with augmented Object.prototype
      if (p === 'toString') return false;
    }
    return true;
  })();

  function extend( destination, source ) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }

  function subclass() {}
  function create() {
    var parent = null, properties = $A(arguments);
    if (object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0, length = properties.length; i < length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = function() {};

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype,
        properties = object.keys(source);

    // IE6 doesn't enumerate `toString` and `valueOf` (among other built-in `Object.prototype`) properties,
    // Force copy if they're not Object.prototype ones.
    // Do not copy other Object.prototype.* for performance reasons
    if (IS_DONTENUM_BUGGY) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i],
          value = source[property];
      if (ancestor && object.isFunction(value) &&
          value.argumentNames()[0] == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = method.valueOf.bind(method);
        value.toString = method.toString.bind(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    extend: extend,
    Methods: {
      addMethods: addMethods
    }
  };
})();
(function() {

  $.TNF || ($.TNF = {
    BRAND: {}
  });

}).call(this);
(function($) {

  var VideoInterface = Class.create({
    API_READY_FAULT_TOLERANCE: 15,

    /* options:
    *    embedCode: string,
    *    onLoad: function
    *    autoplay: (boolean) play when loading is complete (default: false)
    */
    initialize: function(options) {
      this.height           = options.height || 538;
      this.width            = options.width || 936;
      this.playerReadyFault = 0;
      this.apiReadyFault    = 0;
      this.playerId         = options.playerId;
      this.embedCode        = options.embedCode;
      this.onLoad           = options.onLoad;
      this.autoplay         = options.autoplay;
      this.loaded           = false;
      this.Ooyala           = window.tnfOoyala;
      this.player           = document.getElementById(this.playerId);
      this.load();
    },


    load: function(callback) {
      if (typeof callback === 'function') {
        this.loaded = false;
        this.onLoad = callback;
      }
      this.commitVideoUpdate() || this.retryVideoUpdate();
    },

    pause: function() {
      try {
        this.player.pauseMovie();
      } catch (e) {
        this.player = document.getElementById(this.playerId);
      }
    },

    play: function() {
      if($.TNF.BRAND.Utils.iosDevice() !== true) {
        this.player.playMovie();
      }
    },
    setPlayheadTime: function(time){
      this.playerReady(function(){
        this.player.setPlayheadTime(time);
      }.bind(this));

    },
    getPlayheadTime: function(){
      if(this.player && this.Ooyala.mobile === false){
        return this.player.getPlayheadTime();
      } else {
        return 0;
      }
    },
    retryVideoUpdate: function() {
      this.updateVideoInterval = setInterval(function() {
        this.commitVideoUpdate() || this.abandonVideoUpdateTimeout();

        this.apiReadyFault += 0.5;
      }.bind(this), 500);
    },

    commitVideoUpdate: function() {
      this.player = document.getElementById(this.playerId);
      if (this.player === null || this.Ooyala.apiReady[this.playerId] !== true ) {
        return false;
      }

      $(this.player).parent().css({height: this.height, width: this.width});

      this.player.height = this.height;
      this.player.width  = this.width;

      this.clearVideoRetryInterval();

      if (typeof this.onLoad === 'function' && !this.loaded) {
        this.onLoad.call(this);
        this.loaded = true;
      }

      if (this.autoplay) {
        this.play();
      }

      $(document).trigger({type: 'tnf:brand:video_finished_loading', embedCode: this.embedCode});
    },

    clearVideoRetryInterval: function() {
      clearInterval(this.updateVideoInterval);
      this.apiReadyFault = 0;
    },

    abandonVideoUpdateTimeout: function() {
      if (this.apiReadyFault >= this.API_READY_FAULT_TOLERANCE) {
        this.clearVideoRetryInterval();
        $(document).trigger('tnf:brand:ooyala:apiNeverLoaded');
      }
    },

    playerReady: function(callback, retryCount){
      if (!this.Ooyala.apiReady[this.playerId]){
        if (!retryCount) retryCount = 0;
        if (retryCount === this.API_READY_FAULT_TOLERANCE){
            return false;
        } else {
          retryCount += 1;
          setTimeout(function(){
            this.playerReady(callback, retryCount);
          }.bind(this), 500);
          return false;
        }
      }
      if (typeof callback === 'function'){
        callback();
      }
    }

  });

  $.TNF.BRAND.videoInterface = VideoInterface;

  /* options:
  *    container: $element,
  *    width: int,
  *    height: int,
  *    embedCode: string,
  *    onLoad: function
  */
  VideoInterface.factory = function(options) {
    // usage: this.videoInterface = $.TNF.BRAND.VideoInterface.factory(options);
    // iframe building
    // TODO: Calculate width & height if they are not provided

    options.playerId = 'player'+ new Date().getTime();

    var scriptTag  = document.createElement('script');
    scriptTag.src  = "http://player.ooyala.com/player.js?hasModuleParams=1&playerBrandingId=db367c03b0de4bcf8bf82a54c001a356&playerContainerId=ooyala-video-"+options.playerId+"&callback=tnfOoyala.handlePlayerReadyStateChange&playerId="+options.playerId+"&wmode=transparent&width=" + options.width + "&height=" + options.height + "&embedCode=" + options.embedCode + "&autoplay="

    options.container.append('<div id="ooyala-video-'+options.playerId+'" class="ooyala-player"></div>');
    options.container.append(scriptTag);

    return new VideoInterface(options);
  };

  window.tnfOoyala = (function(window) {
    return {
      apiReady: {},
      mobile: false,

      handlePlayerReadyStateChange: function (playerId, eventName, eventArgs) {

        if(eventName === 'playerEmbedded') {
          $('#'+playerId)[0].setModuleParams({"vfc-buy-ui":{"region":"US"}});

        } else if(eventName === 'apiReady') {

          tnfOoyala.apiReady[playerId] = true;

          if( $('#'+playerId+'_MobileContainer').length > 0 ){
            tnfOoyala.mobile = true;
          } 

          $(document).trigger('tnf:ooyala:event:' + eventName, playerId, eventArgs);
        }
      }
    };
  })(window);

}(jQuery));
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $.TNF.BRAND.LightboxVideoPlayer = (function() {
    var EMPTY_LIGHTBOX_ID, LIGHTBOX_HEIGHT, LIGHTBOX_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH;

    LIGHTBOX_WIDTH = 956;

    LIGHTBOX_HEIGHT = 538;

    PLAYER_WIDTH = 936;

    PLAYER_HEIGHT = 518;

    EMPTY_LIGHTBOX_ID = 'colorbox-empty-content';

    LightboxVideoPlayer.setup = function() {
      var videoLightboxNodes,
        _this = this;
      videoLightboxNodes = $('[data-embed-code].lightbox');
      if (!(videoLightboxNodes.length > 0)) {
        return;
      }
      this._ensureEmptyLightboxNodeAvailable();
      return videoLightboxNodes.each(function(index, element) {
        return new _this($(element));
      });
    };

    LightboxVideoPlayer._ensureEmptyLightboxNodeAvailable = function() {
      $('body').append("<div id='" + EMPTY_LIGHTBOX_ID + "'></div>");
      return this.emptyLightboxNode = $("#" + EMPTY_LIGHTBOX_ID);
    };

    function LightboxVideoPlayer(element) {
      this.element = element;
      this._releaseVideoInterface = __bind(this._releaseVideoInterface, this);
      this._buildVideoInterface = __bind(this._buildVideoInterface, this);
      this._applyBrandLightbox = __bind(this._applyBrandLightbox, this);
      this.embedCode = this.element.attr('data-embed-code');
      this._enableLightbox();
    }

    LightboxVideoPlayer.prototype._enableLightbox = function() {
      return this.element.colorbox({
        href: "#" + EMPTY_LIGHTBOX_ID,
        innerWidth: "" + LIGHTBOX_WIDTH + "px",
        innerHeight: "" + LIGHTBOX_HEIGHT + "px",
        onLoad: this._applyBrandLightbox,
        onClosed: this._releaseVideoInterface,
        onComplete: this._buildVideoInterface,
        inline: true
      });
    };

    LightboxVideoPlayer.prototype._applyBrandLightbox = function() {
      return $('#colorbox').addClass('brand');
    };

    LightboxVideoPlayer.prototype._buildVideoInterface = function() {
      return this.videoInterface = $.TNF.BRAND.videoInterface.factory({
        embedCode: this.embedCode,
        container: this.constructor.emptyLightboxNode,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        autoplay: true
      });
    };

    LightboxVideoPlayer.prototype._releaseVideoInterface = function() {
      var player;
      player = $('.OoyalaVideoPlayer')[0];
      if (player && typeof player.pauseMovie === 'function') {
        player.pauseMovie();
      }
      this.videoInterface.pause();
      $('#colorbox').removeClass('brand');
      return $('.ooyala-player').css({
        'height': '1px',
        'width': '1px',
        'overflow': 'hidden'
      });
    };

    return LightboxVideoPlayer;

  })();

}).call(this);
(function($){
  var VideoGallery = Class.create({

    initialize: function(el, options) {
      this.setUrl();
      this.options = $.extend({}, this.defaultOptions, options);
      this.videoAutoPlayQueued = false;
      this.element = el;
      this.$element = $(el);
      this.videoGallery = this.options.data.video_gallery;

      this.generateJQuerySelectors();

      this.setupObservers();

      this.selectChannel(0);
      this.currentVideoIndex = 0;

      this.evaluatePageHash();

      this.initialized = false;
    },

    setUrl: function(str) {
      this.oldUrl = window.location.hash;
    },

    defaultOptions: {
      data: {},
      selectors: {
        paginator: '.paginator',
        tabsListItems: '.tabs li',
        tabLinks: '.tabs li a',
        hero: '#video_gallery_hero',
        videoInterfaceContainers: '.video-interface',
        breadCrumbs: '.crumbs',
        pageTitle: '.page-title h1'
      }
    },

    buildScrollControls: function() {
      this.$hero.append('\
             <a class="video-gallery-arrow-left arrow-box-left"><div class="arrow"></div></a>\
             <a class="video-gallery-arrow-right arrow-box"><div class="arrow"></div></a>');
      this.scrollControls = {
        next: '.video-gallery-arrow-right',
        prev: '.video-gallery-arrow-left'
      }
    },

    updateScrollControls: function() {
      if (typeof this.scrollControls === 'undefined') { this.buildScrollControls(); }

      var nextIndex = this.currentVideoIndex + 1,
          prevIndex = this.currentVideoIndex - 1,
          nextVideo = this.video(nextIndex),
          prevVideo = this.video(prevIndex),
          nextEmbedCode = (typeof nextVideo === 'undefined') ? null : nextVideo.embed_code,
          prevEmbedCode = (typeof prevVideo === 'undefined') ? null : prevVideo.embed_code,
          nextLink = $(this.scrollControls.next),
          prevLink = $(this.scrollControls.prev);

      if (prevIndex < 0) {
        prevLink.removeClass('enabled');
        this.hidePrevLink();
      } else {
        prevLink.addClass('enabled');
        this.showPrevLink();
      }

      if (nextIndex >= this.channel().videos.length) {
        nextLink.removeClass('enabled');
        this.hideNextLink();
      } else {
        nextLink.addClass('enabled');
        this.showNextLink();
      }

      prevLink.attr('data-embed-code', prevEmbedCode);
      nextLink.attr('data-embed-code', nextEmbedCode);
      prevLink.attr('data-video-index', prevIndex);
      nextLink.attr('data-video-index', nextIndex);
    },

    showPrevLink: function() {
      var prevLink = $(this.scrollControls.prev);
      if (prevLink.hasClass('enabled')) { prevLink.show(); }
    },

    showNextLink: function() {
      var nextLink = $(this.scrollControls.next);
      if (nextLink.hasClass('enabled')) { nextLink.show(); }
    },

    hidePrevLink: function() {
      $(this.scrollControls.prev).hide();
    },

    hideNextLink: function() {
      $(this.scrollControls.next).hide();
    },

    showControls: function() {
      this.showNextLink();
      this.showPrevLink();
    },

    hideControls: function() {
      this.hideNextLink();
      this.hidePrevLink();
    },

    video: function(index) {
      if (typeof index === 'undefined') { index = this.currentVideoIndex; }
      return this.channel().videos[index];
    },

    channel: function(index) {
      if (typeof index === 'undefined') { index = this.currentChannelIndex; }
      return this.videoGallery.video_channels[index];
    },

    setupObservers: function() {
      var self = this;

      this.$hero.hover(function() {
        self.showControls();
      }, function() {
        self.hideControls();
      });

      $('a[data-embed-code]').live('click', function(e) {
        e.preventDefault();
        $el = $(e.currentTarget);

        // first thing: pause the video before removing or changing it.
        var player = $('.OoyalaVideoPlayer')[0];
        if ( player && typeof player.pauseMovie === 'function'){
          player.pauseMovie();
        }

        self.previousVideoIndex = self.currentVideoIndex;
        self.currentVideoIndex = parseInt($el.attr('data-video-index'));
        self.updateURL();

        if ($el.attr('data-video-autoplay') === 'true') {
          $(document).trigger({type:'tnf:brand:queue_video_autoplay'});
        }
      });

      $(window).bind('hashchange', function(e) {
        var hash = window.location.hash;
        if (hash.indexOf('#/video/') === 0) {
          self.evaluatePageHash();
        }
      });

      if ('onhashchange' in window) {
      } else {
        setInterval(function() {
          if (window.location.hash !== self.oldUrl) {
            self.setUrl();
            $(window).trigger('hashchange');
          }
        }, 100);
      }

      $(document).bind('tnf:brand:queue_video_autoplay', function() {
        if ($.TNF.BRAND.Utils.iosDevice() !== true) {
          self.videoAutoPlayQueued = true;
        }
      });

      $('body').bind('tnf:brand:load_video', function(e) {

        var incomingPlayer, incomingCSS, outgoingPlayer;

        if (typeof self.previousVideoIndex === 'undefined' || self.previousVideoIndex === self.currentVideoIndex) {
          incomingPlayer = self.$videoInterfaceContainers;
          outgoingPlayer = null;
        } else if (self.previousVideoIndex < self.currentVideoIndex) {
          $(self.$videoInterfaceContainers.selector).after('<div class="video-interface" style="z-index: 7;"></div>');
          incomingPlayer = $(self.$videoInterfaceContainers.selector).last();
          outgoingPlayer = $(self.$videoInterfaceContainers.selector).first();
          incomingCSS = {'left': 956, 'z-index': 9};
        } else {
          $(self.$videoInterfaceContainers.selector).before('<div class="video-interface" style="z-index: 7;"></div>');
          incomingPlayer = $(self.$videoInterfaceContainers.selector).first();
          outgoingPlayer = $(self.$videoInterfaceContainers.selector).last();
          incomingCSS = {'left': -956, 'z-index': 9};
        }

        self.videoInterface = $.TNF.BRAND.videoInterface.factory({
          width: 956,
          height: 538,
          container: incomingPlayer,
          embedCode: e.embedCode,
          onLoad: function() {

            if (incomingCSS && self.initialized) {
              incomingPlayer.css(incomingCSS);
            }

            incomingPlayer.animate({ left: 0 }, 500, 'easeInOutSine', function() {
              $(this).css('z-index', '8');
              if (outgoingPlayer !== null) {
                outgoingPlayer.remove();
              }

              if ( e.autoPlay === true || self.videoAutoPlayQueued ) {
                self.videoInterface.play();
                self.videoAutoPlayQueued = false;
              }
            });

            self.initialized = true;
          }
        });

      });

      this.$tabLinks.click(function(e) {
        e.preventDefault();

        // This is dangerously coupled with the markup
        // TODO: Split up their unholy marriage.
        var index = $(e.currentTarget).parent().index();
        this.selectChannel(index);
      }.bind(this));

      $(document).bind('tnf:brand:video_finished_loading', function() {
        this.updateBreadcrumbs();
        this.updatePageTitle();
        // this.updateURL();
      }.bind(this));
    },

    evaluatePageHash: function() {
      var hash = window.location.hash;
      if (hash.indexOf('#/video/') === 0) {
        var channelMatch = hash.match(/\/channel\/([\d]+)/),
            video;

        if (channelMatch !== null) {
          var channels = this.videoGallery.video_channels,
              channel;

          for (var n = 0; n < channels.length; n++) {
            channel = channels[n];
            if (channel.id === parseInt(channelMatch[1]) && channel != this.channel()) {
              this.selectChannel(n);
              break;
            }
          }
        }

        var videos = this.channel().videos;

        for (var n = 0; n < videos.length; n++) {
          video = videos[n];
          if (window.location.hash.indexOf('#/video/' + video.id + '/') === 0) {

            var grid = this.options.paginatorOptions.selectors.itemsContainer,
                embedCode = video.embed_code,
                videoLoadOptions = {type: 'tnf:brand:load_video', embedCode: embedCode, autoPlay: false};

            if (this.currentVideoIndex !== n) {
              // TODO:
              // This branch of logic needs to be refactored, but is currently needed to handle two cases:
              // 1. User clicks a video anchor & click event handles setting previousVideoIndex, etc.
              // 2. User clicks back / forward browser buttons (necessitating that we handle indexes here)
              this.previousVideoIndex = this.currentVideoIndex;
              this.currentVideoIndex = n;
            }
            this.updateScrollControls();

            $('body').trigger(videoLoadOptions);

            var paginator = this.$paginator.data('tnf:brand:paginator'),
                pageNumber = paginator.getPageFromIndex(n);
            paginator.loadPage(pageNumber);

            $('a[data-embed-code]', grid).removeClass('active');
            $('a[data-embed-code="' + embedCode + '"]', grid).addClass('active');

            this.updateInterface();
            break;
          }
        }
      }
    },

    updateInterface: function() {
      this.updateScrollControls();
      this.updateBreadcrumbs();
      this.updatePageTitle();
    },

    selectChannel: function(index) {
      this.currentChannelIndex = index;
      this.$tabsListItems.removeClass('active');
      this.$tabsListItems.eq(index).addClass('active');
      var videos = this.videoGallery.video_channels[index].videos;
      this.callPaginator(videos);
    },

    updateBreadcrumbs: function() {
      if (! (this.$breadCrumbs && this.$breadCrumbs.length) ) { return; }

      var $currentVideoAnchor = $('a.current-video', this.$breadCrumbs);
      var video = this.video();

      this.$breadCrumbs.find('a').removeClass('title');
      var currentVideoMarkup = '<a title="' + video.title + '" class="title current-video">' + video.short_title + '</a>';

      if ($currentVideoAnchor.length === 0) {
        this.$breadCrumbs.append('/ ' + currentVideoMarkup);
      } else {
        $currentVideoAnchor.replaceWith(currentVideoMarkup);
      }
    },

    updatePageTitle: function() {
      if (! (this.$pageTitle && this.$pageTitle.length) ) { return; }

      var video = this.video();
      this.$pageTitle.text(video.short_title);
    },

    updateURL: function(autoplay) {
      var video = this.video(),
          channel = this.channel();

      this.setUrl();
      window.location.hash = '/video/' + video.id + '/channel/' + channel.id;
    },

    generateJQuerySelectors: function() {
      for (var key in this.options.selectors) {
        this['$' + key] = $(this.options.selectors[key]);
      }
    },

    callPaginator: function(collection) {
      var newCollection = { collection: collection };
      var paginatorOptions = $.extend({}, this.options.paginatorOptions, newCollection);
      this.$paginator.tnfBrandPaginator(paginatorOptions);
    }

  });


  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.VideoGallery = VideoGallery;

  // make it a jQuery plugin
  $.fn.tnfBrandVideoGallerize = function(options){
    return this.each(function(){
      (new VideoGallery(this, options));
    });
  };
})(jQuery);
(function($) {

  var InlineVideoExpander = Class.create({
    videoInterface: null,
    initialize: function($actionElm, $targetCont, ratio) {
    /*
      $actionElm: the link or element that click event is attached to
      $targetCont: the element the video is getting injected into.
      ratio: what the video ratio should be. for 16:9 this should be 0.5625
    */

      var that = this;
      // if not set, default to 16:9
      ratio                 = ratio || 0.5625;
      this.embedCode        = $actionElm.attr("data-embed-code");

      if (typeof this.embedCode === 'undefined' || this.embedCode === '') return;

      this.$targetCont      = $targetCont;
      this.heroCont         = $(".hero", this.$targetCont);
      this.targetImage      = $("img", this.$targetCont);
      this.targetContWidth  = this.$targetCont.width();
      this.targetContHeight = this.$targetCont.height();
      this.ratioHeight      = Math.ceil(this.targetContWidth * ratio);
      this.playerContainer  = $('.player-container', this.$targetCont);
      this.playHeadTime     = 0;

      $actionElm.bind('click', function(e) {
        e.preventDefault();
        // requery when the user has clicked
        that.targetContHeight = that.heroCont.outerHeight();
        that.$targetCont.height(that.targetContHeight);
        that.adjustVideoSpace(true);
      });

      $(this.$targetCont).bind("close-event", function(){
        if (that.videoInterface){
          that.videoInterface.pause();
          window.tnfOoyala.apiReady[that.videoInterface.playerId] = false;
          that.playheadTime = that.videoInterface.getPlayheadTime();
        }
        that.adjustVideoSpace();
      });
    },

    adjustVideoSpace:function(insert) {
      var that = this;

      if(insert) {
        that.insertVideo();
      } else {
        that.removeVideo();
      }

    },

    insertVideo: function() {
      var that = this,
          height = that.ratioHeight;

      that.heroCont.fadeOut('slow');

      that.$targetCont.animate({ height: height}, 1000, function() {
        that.handleVideo(true);
        that.adjustForIpadInsert(that);
      });
    },

    adjustForIpadInsert: function(that) {
      if (TNF.ipad){
        that.playerContainer.animate({'padding-top': '35px' });
        $('a.video-interface-close', that.playerContainer).css({"border-radius": '10px 10px 0 0'});
      }
    },

    removeVideo: function() {
      var that = this;

      that.playerContainer.fadeOut('slow');

      $(that.$targetCont).animate({ height: that.targetContHeight }, 1000, function() {
        that.handleVideo();
        that.heroCont.fadeIn('slow');
        that.adjustForIpadRemove(that);
      });
    },

    adjustForIpadRemove: function(that) {
      if (TNF.ipad){
        that.playerContainer.animate({'padding-top': '0px' });
        $('a.video-interface-close', that.playerContainer).css({"border-radius": '0 0 0 10px'});
      }
    },

    handleVideo: function (insert) {
      var player = null,
          that   = this;

      if (this.videoInterface){
        player = $("#"+this.videoInterface.playerId);
      }

      if (insert) {

        if ($(player).length === 0){

          this.videoInterface = $.TNF.BRAND.videoInterface.factory({
            container: this.playerContainer,
            width: that.targetContWidth,
            height: that.ratioHeight,
            embedCode: that.embedCode,
            onLoad: function() {
              that.videoInterface.play();
            }

          });

          that.playerContainer.append('<a class="video-interface-close"></a>');

          $('a.video-interface-close', that.playerContainer).click(function(e) {
            e.preventDefault();
            that.$targetCont.trigger("close-event");
          }).bind(this);

        } else {

          that.playerContainer.fadeIn("fast", function(){
            that.videoInterface.setPlayheadTime(that.playheadTime);
          }); 

        }

      } else {

        that.playerContainer.fadeOut("fast");
      }
    }
  });

  $.TNF.BRAND.InlineVideoExpander = InlineVideoExpander;


  $.fn.tnfInlineVideoExpanderer = function($targetCont, ratio) {
    return this.each(function () {
      new InlineVideoExpander($(this), $targetCont, ratio);
    });
  };

}(jQuery));
(function() {
  var AutoRotator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  AutoRotator = (function() {

    AutoRotator.prototype.timerDuration = 7000;

    function AutoRotator(options) {
      this.stop = __bind(this.stop, this);
      this.resume = __bind(this.resume, this);
      this.pause = __bind(this.pause, this);
      this.rotate = __bind(this.rotate, this);      this.rotatable = options.rotatable;
      this.controlElement = options.controlElement;
      if (typeof this.rotatable.rotate !== 'function') {
        throw 'AutoRotator expects an object that responds to #rotate';
      }
      this.bindEvents();
      this.start();
    }

    AutoRotator.prototype.bindEvents = function() {
      this.controlElement.bind('mouseover', this.pause);
      this.controlElement.bind('mouseout', this.resume);
      return this.controlElement.bind('click', this.stop);
    };

    AutoRotator.prototype.start = function() {
      this.timer = setInterval(this.rotate, this.timerDuration);
      return this.resume();
    };

    AutoRotator.prototype.rotate = function() {
      if (!this.paused) {
        return this.rotatable.rotate();
      }
    };

    AutoRotator.prototype.pause = function() {
      return this.paused = true;
    };

    AutoRotator.prototype.resume = function() {
      return this.paused = false;
    };

    AutoRotator.prototype.stop = function() {
      clearInterval(this.timer);
      return this.timer = null;
    };

    return AutoRotator;

  })();

  $.TNF.BRAND.AutoRotator = AutoRotator;

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $.TNF.BRAND.Gallery = (function() {
    var DATA_ATTR, FLYOUT_CLOSED_EVENT, FLYOUT_OPENED_EVENT, ITEM_LOADED_EVENT, ITEM_SELECTOR, POPUP_CLOSED_EVENT, POPUP_OPENED_EVENT;

    DATA_ATTR = 'hero_gallery';

    ITEM_SELECTOR = 'div.hero-gallery-item, .gallery-item';

    ITEM_LOADED_EVENT = 'loaded_TNF_heroSpot';

    POPUP_OPENED_EVENT = 'hero_gallery_popup_opened';

    POPUP_CLOSED_EVENT = 'hero_gallery_popup_closed';

    FLYOUT_OPENED_EVENT = 'hero_gallery_flyout_opened';

    FLYOUT_CLOSED_EVENT = 'hero_gallery_flyout_closed';

    function Gallery(element) {
      this.element = element;
      this._countDownHeroSpotLoaders = __bind(this._countDownHeroSpotLoaders, this);
      this._buildItem = __bind(this._buildItem, this);
      this.width = __bind(this.width, this);
      this._setup();
    }

    Gallery.prototype.rotate = function() {
      return this.paginator.next();
    };

    Gallery.prototype.append = function(content) {
      return this.element.append(content);
    };

    Gallery.prototype.width = function() {
      return this.element.width();
    };

    Gallery.prototype.jumpToPage = function(page) {
      return this.paginator.jumpToPage(page);
    };

    Gallery.prototype.currentItem = function() {
      return this.items[this.paginator.currentPage];
    };

    Gallery.prototype.isBusy = function() {
      return this.viewport.isBusy();
    };

    Gallery.prototype.release = function() {
      var item, _i, _len, _ref, _results;
      this.autoRotator.stop();
      this.element.data(DATA_ATTR, null);
      this.ui.release();
      this.element = null;
      _ref = this.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(item.dispose());
      }
      return _results;
    };

    Gallery.prototype.dispose = function() {
      if (typeof console !== "undefined" && console !== null) {
        console.warn('Gallery#dispose is deprecated. Use #release instead');
      }
      return this.release();
    };

    Gallery.prototype._setup = function() {
      this.body = $('body');
      this._setDataAttribute();
      this._buildItems();
      this._buildPaginator();
      this._buildViewPort();
      this._buildUI();
      this._setupObservers();
      return this._setDimensions();
    };

    Gallery.prototype._setDataAttribute = function() {
      if (this.element.data(DATA_ATTR)) {
        this.element.data(DATA_ATTR).dispose();
      }
      return this.element.data(DATA_ATTR, this);
    };

    Gallery.prototype._buildItem = function(index, element) {
      if (arguments.length === 1) {
        element = index;
      }
      return this.items.push($.TNF.BRAND.Gallery.ItemFactory(element));
    };

    Gallery.prototype._buildUI = function() {
      var itemWidth, secondaryViewport, viewportElement;
      if (this.element.hasClass('linked-carousel')) {
        viewportElement = $('.hero-gallery-mini-scroller');
        itemWidth = viewportElement.find('.linked-carousel-mini-item').width();
        secondaryViewport = new $.TNF.BRAND.Gallery.Viewport(viewportElement, itemWidth);
        return new $.TNF.BRAND.LinkedCarousel(this.viewport, secondaryViewport);
      } else if (this.paginator != null) {
        if (this.element.hasClass('gallery')) {
          this.ui = new $.TNF.BRAND.Gallery.UI(this.paginator);
          return this.append(this.ui.elements());
        } else {
          this.ui = new $.TNF.BRAND.HeroGallery.UI(this.paginator);
          this.append(this.ui.elements());
          return this.ui.centerPageIndicator();
        }
      }
    };

    Gallery.prototype._buildViewPort = function() {
      var itemWidth, viewportElement;
      itemWidth = this.element.find(ITEM_SELECTOR).width();
      viewportElement = this.element.find('div.hero-gallery-scroller, .gallery-viewport');
      if (viewportElement.length === 0) {
        this.element.wrapInner($('<div class="gallery-viewport"></div>'));
        viewportElement = this.element.find('.gallery-viewport');
      }
      this.viewport = new $.TNF.BRAND.Gallery.Viewport(viewportElement, itemWidth);
      return this.viewport.setWidth(itemWidth * this.items.length);
    };

    Gallery.prototype._buildPaginator = function() {
      if (this.items.length > 1) {
        return this.paginator = new $.TNF.BRAND.Paginator(this);
      }
    };

    Gallery.prototype._buildItems = function() {
      var items;
      items = this.element.find(ITEM_SELECTOR);
      this.heroSpotLoadCountdown = items.length;
      this.element.bind('loaded_TNF_heroSpot', this._countDownHeroSpotLoaders);
      this.items = [];
      return items.each(this._buildItem);
    };

    Gallery.prototype._countDownHeroSpotLoaders = function() {
      this.heroSpotLoadCountdown -= 1;
      if (this.heroSpotLoadCountdown < 1) {
        this.element.trigger('loaded_TNF_heroGallery');
        return this.fullyLoaded = true;
      }
    };

    Gallery.prototype._setupObservers = function() {
      this.element.bind('click', this.focus);
      if (this.ui) {
        this.body.bind(POPUP_OPENED_EVENT, this.ui.hide);
        this.body.bind(FLYOUT_OPENED_EVENT, this.ui.hide);
        this.body.bind(POPUP_CLOSED_EVENT, this.ui.show);
        return this.body.bind(FLYOUT_CLOSED_EVENT, this.ui.show);
      }
    };

    Gallery.prototype._setDimensions = function() {
      var itemWidth, items, uiElement;
      if (!this.element.hasClass('gallery')) {
        return;
      }
      items = this.element.find(ITEM_SELECTOR);
      itemWidth = items.width();
      this.viewport.setWidth(this.items.length * itemWidth);
      uiElement = this.element.find('.gallery-ui');
      return uiElement.css({
        left: (this.width() / 2) - (uiElement.width() / 2)
      });
    };

    return Gallery;

  })();

}).call(this);
(function() {

  $.TNF.BRAND.Gallery.ItemFactory = function(element) {
    var object, type;
    type = $(element).data('type');
    if (type === 'standard' || type === 'carousel' || type === void 0) {
      object = $.TNF.BRAND.Gallery.Standard;
    } else {
      object = $.TNF.BRAND.Gallery.Rotator;
    }
    return new object.Item($(element));
  };

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $.TNF.BRAND.Gallery.Viewport = (function() {

    Viewport.prototype.itemMargin = 4;

    function Viewport(el, itemWidth) {
      this.el = el;
      this.itemWidth = itemWidth;
      this.jumpToPage = __bind(this.jumpToPage, this);
      this._bindEvents();
    }

    Viewport.prototype.setWidth = function(width) {
      return this.el.width(width);
    };

    Viewport.prototype.prepend = function(elements) {
      return this.el.prepend(elements);
    };

    Viewport.prototype.append = function(elements) {
      return this.el.append(elements);
    };

    Viewport.prototype.jumpToPage = function(event, data) {
      var page;
      if (this.el.is(':animated')) {
        return false;
      }
      if (arguments.length === 1) {
        page = event.page;
      } else {
        page = data.page;
      }
      return this.el.animate({
        left: -(page * this.itemWidth)
      }, 500, 'easeInOutSine');
    };

    Viewport.prototype.isBusy = function() {
      return this.el.is(':animated');
    };

    Viewport.prototype._bindEvents = function() {
      return $('body').bind('hero_gallery_paged', this.jumpToPage);
    };

    return Viewport;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.HeroGallery = (function(_super) {

    __extends(HeroGallery, _super);

    function HeroGallery() {
      this.focus = __bind(this.focus, this);
      HeroGallery.__super__.constructor.apply(this, arguments);
    }

    HeroGallery.prototype.stopAutoRotation = function() {
      var _ref;
      return (_ref = this.autoRotator) != null ? _ref.stop() : void 0;
    };

    HeroGallery.prototype.focus = function(e) {
      var element;
      try {
        element = $(e.target);
        if (element.hasClass('hero-gallery-item') || element.hasClass('hero-gallery-content')) {
          return this.body.trigger('hero_gallery_paged', {
            page: this.paginator.currentPage
          });
        }
      } catch (e) {

      }
    };

    HeroGallery.prototype._setupAutoRotator = function() {
      if (this.items.length > 1) {
        return this.autoRotator = new $.TNF.BRAND.AutoRotator({
          rotatable: this,
          controlElement: this.element
        });
      }
    };

    HeroGallery.prototype._setup = function() {
      HeroGallery.__super__._setup.apply(this, arguments);
      return this._setupAutoRotator();
    };

    return HeroGallery;

  })($.TNF.BRAND.Gallery);

}).call(this);
(function() {

  $.TNF.BRAND.Gallery.Button = (function() {
    var SHORT, TALL;

    SHORT = 'short';

    TALL = 'tall';

    function Button(responder) {
      this.responder = responder;
      this.className = this.responder.element.hasClass(SHORT) ? SHORT : TALL;
    }

    Button.prototype.show = function() {
      this.element.show();
      return this.element.animate({
        opacity: 1
      }, 200, 'easeInOutSine');
    };

    Button.prototype.hide = function() {
      var _this = this;
      return this.element.animate({
        opacity: 0
      }, 200, 'easeInOutSine', function() {
        return _this.element.hide();
      });
    };

    Button.prototype.render = function() {
      return this.element;
    };

    Button.prototype.release = function() {
      return this.element.remove();
    };

    return Button;

  })();

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.Gallery.NextButton = (function(_super) {

    __extends(NextButton, _super);

    function NextButton() {
      NextButton.__super__.constructor.apply(this, arguments);
      this.element = $("<a class='next'></a>");
    }

    NextButton.prototype.render = function() {
      this.element.bind('click', this.responder.next);
      return NextButton.__super__.render.apply(this, arguments);
    };

    return NextButton;

  })($.TNF.BRAND.Gallery.Button);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.Gallery.PrevButton = (function(_super) {

    __extends(PrevButton, _super);

    function PrevButton() {
      PrevButton.__super__.constructor.apply(this, arguments);
      this.element = $("<a class='prev'></a>");
    }

    PrevButton.prototype.render = function() {
      this.element.bind('click', this.responder.previous);
      return PrevButton.__super__.render.apply(this, arguments);
    };

    return PrevButton;

  })($.TNF.BRAND.Gallery.Button);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $.TNF.BRAND.Gallery.PageIndicator = (function() {

    function PageIndicator(responder) {
      var item, _i, _ref;
      this.responder = responder;
      this.showPageAtIndex = __bind(this.showPageAtIndex, this);
      this.jumpToPage = __bind(this.jumpToPage, this);
      this.pageCount = this.responder.itemCount();
      $('body').bind('hero_gallery_paged', this.showPageAtIndex);
      this.currentPageElement = $('<em></em>');
      this.el = $("<div class='hero-gallery-paginator'></div>");
      this.el.append(this.currentPageElement);
      for (item = _i = 1, _ref = this.pageCount; 1 <= _ref ? _i <= _ref : _i >= _ref; item = 1 <= _ref ? ++_i : --_i) {
        this.el.append($('<a></a>'));
      }
    }

    PageIndicator.prototype.jumpToPage = function(event) {
      var targetPageIndex;
      targetPageIndex = $(event.target).prevAll('a').length;
      this.showPageAtIndex({
        page: targetPageIndex
      });
      return this.responder.jumpToPage(targetPageIndex);
    };

    PageIndicator.prototype.showPageAtIndex = function(event, data) {
      var index;
      if (arguments.length === 1) {
        index = event.page;
      } else {
        index = data.page;
      }
      return this.currentPageElement.animate({
        left: index * 19
      }, 500, 'easeInOutSine');
    };

    PageIndicator.prototype.show = function() {
      this.el.show();
      return this.el.animate({
        opacity: 1
      }, 200, 'easeInOutSine');
    };

    PageIndicator.prototype.hide = function() {
      var _this = this;
      return this.el.animate({
        opacity: 0
      }, 200, 'easeInOutSine', function() {
        return _this.el.hide();
      });
    };

    PageIndicator.prototype.render = function() {
      this.el.find('a').bind('click', this.jumpToPage);
      return this.el;
    };

    PageIndicator.prototype.center = function() {
      return this.el.css('left', (this.responder.width() / 2) - (this.el.outerWidth() / 2));
    };

    PageIndicator.prototype.release = function() {
      return this.el.release();
    };

    return PageIndicator;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $.TNF.BRAND.Gallery.UI = (function() {

    function UI(paginator) {
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);      this.nextButton = new $.TNF.BRAND.Gallery.NextButton(paginator);
      this.prevButton = new $.TNF.BRAND.Gallery.PrevButton(paginator);
      this.pageIndicator = new $.TNF.BRAND.Gallery.PageIndicator(paginator);
    }

    UI.prototype.show = function() {
      this.nextButton.show();
      this.prevButton.show();
      return this.pageIndicator.show();
    };

    UI.prototype.hide = function() {
      this.nextButton.hide();
      this.prevButton.hide();
      return this.pageIndicator.hide();
    };

    UI.prototype.elements = function() {
      var uiElements;
      uiElements = this.prevButton.render().add(this.pageIndicator.render().add(this.nextButton.render()));
      return $('<div class="gallery-ui"></div>').append(uiElements);
    };

    UI.prototype.release = function() {
      this.nextButton.release();
      this.prevButton.release();
      return this.pageIndicator.release();
    };

    UI.prototype.centerPageIndicator = function() {
      return this.pageIndicator.center();
    };

    return UI;

  })();

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.HeroGallery.NextButton = (function(_super) {

    __extends(NextButton, _super);

    function NextButton() {
      NextButton.__super__.constructor.apply(this, arguments);
      this.element = $("<a class='hero-gallery-arrow-right arrow-box " + this.className + "'><div class='arrow'></div></a>");
    }

    NextButton.prototype.render = function() {
      this.element.bind('click', this.responder.next);
      return NextButton.__super__.render.apply(this, arguments);
    };

    return NextButton;

  })($.TNF.BRAND.Gallery.Button);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.HeroGallery.PrevButton = (function(_super) {

    __extends(PrevButton, _super);

    function PrevButton() {
      PrevButton.__super__.constructor.apply(this, arguments);
      this.element = $("<a class='hero-gallery-arrow-left arrow-box-left " + this.className + "'><div class='arrow'></div></a>");
    }

    PrevButton.prototype.render = function() {
      this.element.bind('click', this.responder.previous);
      return PrevButton.__super__.render.apply(this, arguments);
    };

    return PrevButton;

  })($.TNF.BRAND.Gallery.Button);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.HeroGallery.UI = (function(_super) {

    __extends(UI, _super);

    function UI(paginator) {
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.nextButton = new $.TNF.BRAND.HeroGallery.NextButton(paginator);
      this.prevButton = new $.TNF.BRAND.HeroGallery.PrevButton(paginator);
      this.pageIndicator = new $.TNF.BRAND.Gallery.PageIndicator(paginator);
    }

    UI.prototype.elements = function() {
      return this.nextButton.render().add(this.prevButton.render().add(this.pageIndicator.render()));
    };

    return UI;

  })($.TNF.BRAND.Gallery.UI);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.LinkedGallery = (function(_super) {

    __extends(LinkedGallery, _super);

    function LinkedGallery() {
      this._buildItem = __bind(this._buildItem, this);
      LinkedGallery.__super__.constructor.apply(this, arguments);
    }

    LinkedGallery.prototype._buildUI = function() {
      var itemWidth, secondaryViewport, viewportElement;
      viewportElement = $('.hero-gallery-mini-scroller');
      itemWidth = viewportElement.find('.linked-carousel-mini-item').width();
      secondaryViewport = new $.TNF.BRAND.Gallery.Viewport(viewportElement, itemWidth);
      return new $.TNF.BRAND.LinkedCarousel(this.viewport, secondaryViewport);
    };

    LinkedGallery.prototype._buildItem = function(index, element) {
      if (arguments.length === 1) {
        element = index;
      }
      return this.items.push(new $.TNF.BRAND.Gallery.Standard.Item($(element)));
    };

    return LinkedGallery;

  })($.TNF.BRAND.Gallery);

}).call(this);
(function() {

  $.TNF.BRAND.GalleryFactory = (function() {

    function GalleryFactory(element) {
      if (!(element.length > 0)) {
        return;
      }
      if (element.hasClass('tabbed-hero-gallery')) {
        return;
      }
      if (element.hasClass('gallery')) {
        new $.TNF.BRAND.Gallery(element);
      } else if (element.hasClass('linked-carousel')) {
        new $.TNF.BRAND.LinkedGallery(element);
      } else {
        new $.TNF.BRAND.HeroGallery(element);
      }
    }

    return GalleryFactory;

  })();

}).call(this);

$.TNF.BRAND.Gallery.Standard = {};

(function() {

  $.TNF.BRAND.Gallery.Callout = (function() {

    function Callout() {}

    Callout.prototype.element = null;

    Callout.prototype.showing = false;

    Callout.prototype.activateMarker = function() {
      this.markerIndicator.addClass('active');
      return this.markerCircle.animate({
        top: 0,
        left: 0,
        width: this.markerSize,
        height: this.markerSize
      }, 200, 'easeInOutSine');
    };

    Callout.prototype.deactivateMarker = function() {
      this.markerIndicator.removeClass('active');
      return this.markerCircle.animate({
        top: this.markerSize / 2,
        left: this.markerSize / 2,
        width: 0,
        height: 0
      }, 200, 'easeInOutSine');
    };

    return Callout;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.Gallery.Standard.Callout = (function(_super) {

    __extends(Callout, _super);

    function Callout(element) {
      this.element = element;
      this.fadePopup = __bind(this.fadePopup, this);
      this.showPopup = __bind(this.showPopup, this);
      this.body = $('body');
      this.parentElement = this.element.parent();
      this.containerWidth = this.parentElement.width();
      this.containerHeight = this.parentElement.height();
      this.build();
      this.setupObservers();
    }

    Callout.prototype.build = function() {
      this.position = this.element.position();
      this.parentElement.append('<div class="hero-gallery-callout-marker"><em></em><a></a></div>');
      this.parentElement.append("<div class=\"hero-gallery-callout-popup\">\n  <div class=\"hero-gallery-callout-popup-content\"></div>\n  <a class=\"hero-gallery-callout-popup-close\"></a>\n  <div class=\"hero-gallery-callout-popup-arrow\"></div>\n</div>");
      this.marker = this.parentElement.find('div.hero-gallery-callout-marker:last');
      this.markerCircle = this.marker.find('em');
      this.markerIndicator = this.marker.find('a');
      this.popup = this.parentElement.find('div.hero-gallery-callout-popup:last');
      this.markerSize = this.marker.width();
      this.marker.css('top', this.position['top'] - (this.markerSize / 2)).css('left', this.position['left'] - (this.markerSize / 2));
      this.markerCircle.css('top', this.markerSize / 2).css('left', this.markerSize / 2);
      this.contentElement = this.element.clone().css('top', 0).css('left', 0).css('visibility', 'visible').css('position', 'static');
      this.popup.find('div.hero-gallery-callout-popup-content').append(this.contentElement);
      return this.positionPopup();
    };

    Callout.prototype.setupObservers = function() {
      var _this = this;
      this.body.bind('hero_gallery_popup_opened', this.fadePopup);
      this.body.bind('hero_gallery_flyout_opened', this.fadePopup);
      this.body.bind('hero_gallery_paged', this.fadePopup);
      this.markerIndicator.bind('mouseover', function() {
        return _this.markerCircle.animate({
          top: 0,
          left: 0,
          width: _this.markerSize,
          height: _this.markerSize
        }, 100, 'easeInOutSine');
      });
      this.markerIndicator.bind('mouseout', function() {
        if (_this.showing) {
          return;
        }
        return _this.deactivateMarker();
      });
      this.markerIndicator.bind('click', this.showPopup);
      return this.popup.find('a.hero-gallery-callout-popup-close').click(this.fadePopup);
    };

    Callout.prototype.positionPopup = function() {
      var left, markerSpacing, popupHeight, popupWidth, threshold, top;
      popupWidth = this.popup.outerWidth();
      popupHeight = this.popup.outerHeight();
      markerSpacing = this.markerSize / 2;
      threshold = 10;
      left = 0;
      top = 0;
      if (this.element.parents('.linked-carousel').length > 0) {
        top = this.position['top'] - (popupHeight / 2);
        left = this.position['left'] - popupWidth;
        if (left < threshold) {
          left = this.position['left'];
        }
        if (top <= threshold) {
          top = threshold;
        }
      } else {
        top = this.position['top'] - popupHeight - markerSpacing;
        if (top <= threshold) {
          top = this.position['top'] + markerSpacing;
          if (top + popupHeight + markerSpacing > this.containerHeight) {
            top = (this.containerHeight - popupHeight) / 2;
            if (top <= threshold) {
              top = threshold;
            }
            left = this.position['left'] + markerSpacing;
            if (left + popupWidth + markerSpacing > this.containerWidth) {
              top = (this.containerHeight - popupHeight) / 2;
              if (top <= threshold) {
                top = threshold;
              }
              left = this.position['left'] - popupWidth - markerSpacing;
              this.popup.addClass('hero-gallery-callout-popup-left');
              this.setArrowTop(top);
            } else {
              this.popup.addClass('hero-gallery-callout-popup-right');
              this.setArrowTop(top);
            }
          } else {
            left = this.positionPopupLeft(popupWidth);
            this.popup.addClass('hero-gallery-callout-popup-bottom');
          }
        } else {
          left = this.positionPopupLeft(popupWidth);
          this.popup.addClass('hero-gallery-callout-popup-top');
        }
      }
      return this.popup.css('top', top).css('left', left).css('display', 'none');
    };

    Callout.prototype.setArrowTop = function(top) {
      var arrowTop;
      arrowTop = (this.position['top'] - top) - 8;
      return this.popup.find('div.hero-gallery-callout-popup-arrow').css('top', arrowTop);
    };

    Callout.prototype.positionPopupLeft = function(width) {
      var arrowLeft, left;
      left = this.position['left'] - (width / 2);
      if (left <= 10) {
        left = 10;
      }
      if (left + width >= this.containerWidth - 10) {
        left = this.containerWidth - width - 10;
      }
      arrowLeft = (this.position['left'] - left) - 8;
      if (arrowLeft < 6) {
        arrowLeft = 6;
      }
      this.popup.find('div.hero-gallery-callout-popup-arrow').css('left', arrowLeft);
      return left;
    };

    Callout.prototype.showPopup = function() {
      if (this.showing) {
        this.hidePopup();
        return;
      }
      this.body.trigger({
        type: 'hero_gallery_popup_opened',
        callout: this
      });
      this.activateMarker();
      this.popup.css('opacity', 0).css('display', 'block');
      this.popup.animate({
        opacity: 1
      }, 200, 'easeInOutSine');
      return this.showing = true;
    };

    Callout.prototype.hidePopup = function() {
      var _this = this;
      this.body.trigger({
        type: 'hero_gallery_popup_closed',
        callout: this
      });
      this.deactivateMarker();
      this.popup.animate({
        opacity: 0
      }, 200, 'easeInOutSine', function() {
        return _this.popup.css('display', 'none');
      });
      return this.showing = false;
    };

    Callout.prototype.fadePopup = function() {
      var _this = this;
      if (!this.showing) {
        return;
      }
      this.body.trigger({
        type: 'hero_gallery_popup_closed',
        callout: this
      });
      this.deactivateMarker();
      this.popup.animate({
        opacity: 0
      }, 200, 'easeInOutSine', function() {
        return _this.popup.css('display', 'none');
      });
      return this.showing = false;
    };

    Callout.prototype.dispose = function() {
      this.marker.remove();
      this.popup.remove();
      return this.element = null;
    };

    return Callout;

  })($.TNF.BRAND.Gallery.Callout);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.Gallery.Standard.CalloutWhite = (function(_super) {

    __extends(CalloutWhite, _super);

    function CalloutWhite(element) {
      this.element = element;
      this.fadePopup = __bind(this.fadePopup, this);
      this.showPopup = __bind(this.showPopup, this);
      this.body = $('body');
      this.closestContainerWithHeight = this.element.closest('.hero');
      this.parentElement = this.element.parent();
      this.containerWidth = this.closestContainerWithHeight.width();
      this.containerHeight = this.closestContainerWithHeight.height();
      this.build();
      this.setupObservers();
    }

    CalloutWhite.prototype.build = function() {
      this.position = this.element.position();
      this.parentElement.append('<div class="hero-gallery-callout-marker callout-white"><em></em><a></a></div>');
      this.parentElement.append("<div class=\"hero-gallery-callout-popup callout-white\">\n  <div class=\"hero-gallery-callout-popup-content callout-white\"></div>\n</div>");
      this.marker = this.parentElement.find('div.hero-gallery-callout-marker:last');
      this.markerCircle = this.marker.find('em');
      this.markerIndicator = this.marker.find('a');
      this.popup = this.parentElement.find('div.hero-gallery-callout-popup:last');
      this.markerSize = this.marker.width();
      this.marker.css('top', this.position['top'] - (this.markerSize / 2)).css('left', this.position['left'] - (this.markerSize / 2));
      this.markerCircle.css('top', this.markerSize / 2).css('left', this.markerSize / 2);
      this.contentElement = this.element.clone().css('top', 0).css('left', 0).css('visibility', 'visible').css('position', 'static');
      this.popup.find('div.hero-gallery-callout-popup-content').append(this.contentElement);
      return this.positionPopup();
    };

    CalloutWhite.prototype.setupObservers = function() {
      var _this = this;
      this.body.bind('hero_gallery_popup_opened', this.fadePopup);
      this.body.bind('hero_gallery_flyout_opened', this.fadePopup);
      this.body.bind('hero_gallery_paged', this.fadePopup);
      this.markerIndicator.bind('mouseover', function() {
        return _this.markerCircle.animate({
          top: 0,
          left: 0,
          width: _this.markerSize,
          height: _this.markerSize
        }, 100, 'easeInOutSine');
      });
      this.markerIndicator.bind('mouseout', function() {
        if (_this.showing) {
          return;
        }
        return _this.deactivateMarker();
      });
      return this.markerIndicator.bind('click', this.showPopup);
    };

    CalloutWhite.prototype.positionPopup = function() {
      var left, markerSpacing, popupHeight, popupWidth, threshold, top;
      popupWidth = this.popup.outerWidth();
      popupHeight = this.popup.outerHeight();
      markerSpacing = this.markerSize / 2;
      threshold = 10;
      left = 0;
      top = 0;
      if (this.position['top'] < (this.containerHeight / 2)) {
        top = this.position['top'];
      } else {
        top = this.position['top'] - popupHeight;
      }
      if (this.position['left'] < (this.containerWidth / 2)) {
        if (this.position['left'] < (popupWidth + threshold)) {
          left = this.position['left'];
        } else {
          left = this.position['left'] - popupWidth;
        }
      } else {
        if (this.position['left'] > (this.containerWidth - popupWidth - threshold)) {
          left = this.position['left'] - popupWidth;
        } else {
          left = this.position['left'];
        }
      }
      return this.popup.css('top', top).css('left', left).css('display', 'none');
    };

    CalloutWhite.prototype.showPopup = function() {
      if (this.showing) {
        this.hidePopup();
        return;
      }
      this.body.trigger({
        type: 'hero_gallery_popup_opened',
        callout: this
      });
      this.activateMarker();
      this.popup.css('opacity', 0).css('display', 'block');
      this.popup.animate({
        opacity: 1
      }, 200, 'easeInOutSine');
      return this.showing = true;
    };

    CalloutWhite.prototype.hidePopup = function() {
      var _this = this;
      this.body.trigger({
        type: 'hero_gallery_popup_closed',
        callout: this
      });
      this.deactivateMarker();
      this.popup.animate({
        opacity: 0
      }, 200, 'easeInOutSine', function() {
        return _this.popup.css('display', 'none');
      });
      return this.showing = false;
    };

    CalloutWhite.prototype.fadePopup = function() {
      var _this = this;
      if (!this.showing) {
        return;
      }
      this.body.trigger({
        type: 'hero_gallery_popup_closed',
        callout: this
      });
      this.deactivateMarker();
      this.popup.animate({
        opacity: 0
      }, 200, 'easeInOutSine', function() {
        return _this.popup.css('display', 'none');
      });
      return this.showing = false;
    };

    CalloutWhite.prototype.dispose = function() {
      this.marker.remove();
      this.popup.remove();
      return this.element = null;
    };

    return CalloutWhite;

  })($.TNF.BRAND.Gallery.Callout);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $.TNF.BRAND.Gallery.Item = (function() {

    Item.prototype.videoInterfaceContainer = null;

    Item.prototype.element = null;

    Item.prototype.flyoutVisible = false;

    function Item(element) {
      this.element = element;
      this.adjustVideoSpace = __bind(this.adjustVideoSpace, this);
      this.showVideo = __bind(this.showVideo, this);
      this.restoreDefaultImage = __bind(this.restoreDefaultImage, this);
      this.revealRolloverImage = __bind(this.revealRolloverImage, this);
      this.setupRolloverObservers = __bind(this.setupRolloverObservers, this);
      this.handleCtaRollout = __bind(this.handleCtaRollout, this);
      this.handleCtaRollover = __bind(this.handleCtaRollover, this);
      this.addHotRegion = __bind(this.addHotRegion, this);
      this.addCta = __bind(this.addCta, this);
      if (!this.element.hasClass('gallery-item')) {
        this.id = this.element.attr('id').split('herospot-')[1];
      }
      this.build();
      this.buildCtas();
      this.buildHotRegions();
      this.setupObservers();
      this.gallery = $(this.element).parent().parent('.hero-gallery');
      this.galleryHeight = this.gallery.outerHeight();
      this.videoInterfaceContainer = $('.hero-gallery-video-interface', this.gallery);
      this.embedCode = '';
    }

    Item.prototype.addCta = function(index, el) {
      if (arguments.length === 1) {
        el = arguments[0];
      }
      this.ctas.push(el);
      return el;
    };

    Item.prototype.addHotRegion = function(index, el) {
      if (arguments.length === 1) {
        el = arguments[0];
      }
      this.hotRegions.push(el);
      return el;
    };

    Item.prototype.activateCtaRollover = function() {
      var ctas;
      ctas = $(this.element).find('.hero-cta a');
      ctas.bind('mouseover', this.handleCtaRollover);
      return ctas.bind('mouseout', this.handleCtaRollout);
    };

    Item.prototype.handleCtaRollover = function(event) {
      var anchor, color;
      anchor = $(event.target).parent();
      color = anchor.data('text-color-rollover');
      return anchor.find('.hero-text').css('color', color);
    };

    Item.prototype.handleCtaRollout = function(event) {
      var anchor, color;
      anchor = $(event.target).parent();
      color = anchor.data('text-color');
      return anchor.find('.hero-text').css('color', color);
    };

    Item.prototype.activateRollover = function() {
      var rolloverImage, rolloverImageSrc;
      rolloverImageSrc = this.element.attr('data-rollover-image');
      if (rolloverImageSrc != null) {
        rolloverImage = new Image();
        rolloverImage.src = rolloverImageSrc;
        this.rolloverImage = "url(" + rolloverImageSrc + ")";
        this.defaultImage = this.element.css('background-image');
        return $(rolloverImage).load(this.setupRolloverObservers);
      }
    };

    Item.prototype.setupRolloverObservers = function() {
      this.element.bind('mouseover', this.revealRolloverImage);
      return this.element.bind('mouseout', this.restoreDefaultImage);
    };

    Item.prototype.revealRolloverImage = function(event) {
      return this.element.css('background-image', this.rolloverImage);
    };

    Item.prototype.restoreDefaultImage = function(event) {
      return this.element.css('background-image', this.defaultImage);
    };

    Item.prototype.showFlyoutIEBranch = function() {
      var _this = this;
      if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
        return this.content.hide();
      } else {
        return this.content.animate({
          'opacity': 0
        }, 200, 'easeInOutSine', function() {
          return _this.content.css('display', 'none');
        });
      }
    };

    Item.prototype.hideFlyoutIEBranch = function() {
      if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
        return this.content.show();
      } else {
        this.content.css('display', 'block');
        return this.content.animate({
          'opacity': 1
        }, 200, 'easeInOutSine');
      }
    };

    Item.prototype.hideVideo = function() {
      this.videoInterface.pause();
      return this.videoInterfaceContainer.fadeOut(this.adjustVideoSpace);
    };

    Item.prototype.showVideo = function() {
      var _this = this;
      this.videoInterfaceContainer.append('<a class="video-interface-close"></a>');
      $('a.video-interface-close', this.videoInterfaceContainer).click(function(e) {
        e.preventDefault();
        _this.hideVideo();
        if (TNF.ipad) {
          _this.videoInterfaceContainer.animate({
            "padding-top": '0px'
          });
          return $('a.video-interface-close').css({
            "border-radius": '0 0 0 10px'
          });
        }
      });
      if (TNF.ipad) {
        this.videoInterfaceContainer.animate({
          "padding-top": '35px'
        });
        $('a.video-interface-close').css({
          "border-radius": '10px 10px 0 0'
        });
      }
      return this.videoInterface.play();
    };

    Item.prototype.unloadVideo = function() {
      $(this.videoInterfaceContainer).children().unbind();
      return $(this.videoInterfaceContainer).empty();
    };

    Item.prototype.loadVideo = function() {
      this.videoInterfaceContainer.css({
        zIndex: 9120,
        display: 'block',
        visibility: 'visible'
      });
      return this.videoInterface = $.TNF.BRAND.videoInterface.factory({
        container: $(this.videoInterfaceContainer),
        width: 956,
        height: 538,
        embedCode: this.embedCode,
        onLoad: this.showVideo
      });
    };

    Item.prototype.adjustVideoSpace = function(insert) {
      var playerCont, videoHeight,
        _this = this;
      videoHeight = 538;
      playerCont = $('.player-container', this.gallery);
      if (TNF.ipad) {
        videoHeight = videoHeight + 35;
      }
      if (insert) {
        return $(this.element).parent().fadeOut('fast', function() {
          return _this.gallery.animate({
            height: videoHeight
          }, 1000, function() {
            _this.loadVideo();
            if (TNF.ipad) {
              playerCont.animate({
                paddingTop: '0px'
              });
              return $('a.video-interface-close', playerCont).css({
                "border-radius": '0 0 0 10px'
              });
            }
          });
        });
      } else {
        return this.gallery.animate({
          height: this.galleryHeight
        }, 1000, function() {
          var contentBox, oldPosition;
          contentBox = _this.gallery.closest('.content-box');
          oldPosition = contentBox.css('position');
          contentBox.css({
            position: 'relative'
          });
          contentBox.css({
            position: oldPosition
          });
          return $(_this.element).parent().fadeIn('fast', function() {
            _this.unloadVideo();
            if (TNF.ipad) {
              playerCont.animate({
                'padding-top': '0px'
              });
              return $('a.video-interface-close', playerCont).css({
                "border-radius": '0 0 0 10px'
              });
            }
          });
        });
      }
    };

    Item.prototype.dispose = function() {
      var callout, _i, _len, _ref;
      this.element.find('a.arrow-box').unbind('click');
      this.element.find('a.hero-gallery-flyout-close').remove();
      _ref = this.callouts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callout = _ref[_i];
        this.callouts[callout].dispose();
      }
      return this.element = null;
    };

    Item.prototype.buildCallouts = function() {
      var callouts;
      callouts = this.element.find('div.hero-gallery-callout');
      this.callouts = [];
      return callouts.each(this.addCallout);
    };

    Item.prototype.buildHotRegions = function() {
      var hotRegions;
      hotRegions = this.element.find('.hot-region');
      this.hotRegions = [];
      return hotRegions.each(this.addHotRegion);
    };

    Item.prototype.buildCtas = function() {
      var ctas;
      ctas = this.element.find('.hero-cta');
      this.ctas = [];
      return ctas.each(this.addCta);
    };

    return Item;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.Gallery.Standard.Item = (function(_super) {

    __extends(Item, _super);

    function Item() {
      this.handleCtaClick = __bind(this.handleCtaClick, this);
      this.addCallout = __bind(this.addCallout, this);
      Item.__super__.constructor.apply(this, arguments);
    }

    Item.prototype.build = function() {
      this.content = this.element.find('div.hero-gallery-item-content');
      this.flyout = new $.TNF.BRAND.Gallery.Flyout(this, this.element.find('div.hero-gallery-flyout-left, div.hero-gallery-flyout-right').first());
      this.buildCallouts();
      return this.element.trigger('loaded_TNF_heroSpot', this);
    };

    Item.prototype.addCallout = function(index, el) {
      var callout;
      if (arguments.length === 1) {
        el = arguments[0];
      }
      if ($(el).hasClass('callout-white')) {
        callout = new $.TNF.BRAND.Gallery.Standard.CalloutWhite($(el));
      } else {
        callout = new $.TNF.BRAND.Gallery.Standard.Callout($(el));
      }
      this.callouts.push(callout);
      return callout;
    };

    Item.prototype.setupObservers = function() {
      this.activateRollover();
      this.activateCtaRollover();
      return $('.hot-region, .cta a.arrow-box, .hero-cta a.hero-arrow-box', this.element).click(this.handleCtaClick);
    };

    Item.prototype.handleCtaClick = function(e) {
      var element;
      element = $(e.currentTarget);
      if (element.data('embed-code')) {
        e.preventDefault();
        this.embedCode = element.data('embed-code');
        return this.adjustVideoSpace(true);
      } else if (element.data('flyout-link')) {
        e.preventDefault();
        return this.flyout.show();
      }
    };

    return Item;

  })($.TNF.BRAND.Gallery.Item);

}).call(this);

$.TNF.BRAND.Gallery.Rotator = {};

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.Gallery.Rotator.Callout = (function(_super) {

    __extends(Callout, _super);

    function Callout(element, center, item) {
      this.element = element;
      this.item = item;
      this.radius = Math.abs(center - parseInt(this.element.css('left'), 10));
      this.center = center;
      this.totalFrames = this.item.images.length;
      this.rotator = this.item.rotator;
      this.y = this.element.css('top');
      this.build();
      this.setupObservers();
    }

    Callout.prototype.build = function() {
      this.initialPosition = this.element.position();
      this.rotator.append('<div class="hero-gallery-callout-marker"><em></em><a></a></div>');
      this.rotator.append('<div class="hero-gallery-callout-marker-interaction"></div>');
      this.marker = this.rotator.find('div.hero-gallery-callout-marker:last');
      this.markerCircle = this.marker.find('em');
      this.markerIndicator = this.marker.find('a');
      this.markerSize = this.marker.width();
      this.markerInteraction = this.rotator.find('div.hero-gallery-callout-marker-interaction:last').css({
        zIndex: 30,
        top: this.initialPosition['top'] - (this.markerSize / 2)
      }).css({
        left: this.initialPosition['left'] - (this.markerSize / 2),
        width: 30,
        height: 30
      }).css({
        position: 'absolute'
      });
      this.marker.css('top', this.initialPosition['top'] - (this.markerSize / 2)).css('left', this.initialPosition['left'] - (this.markerSize / 2));
      return this.markerCircle.css('top', this.markerSize / 2).css('left', this.markerSize / 2);
    };

    Callout.prototype.setupObservers = function() {
      var _this = this;
      this.markerInteraction.bind('mouseover', function() {
        return _this.markerCircle.animate({
          top: 0,
          left: 0,
          width: _this.markerSize,
          height: _this.markerSize
        }, 100, 'easeInOutSine');
      });
      this.markerInteraction.bind('mouseout', function() {
        if (_this.showing) {
          return;
        }
        return _this.deactivateMarker();
      });
      return this.markerInteraction.bind('click', function() {
        return _this.item.showFlyout(_this);
      });
    };

    Callout.prototype.show = function(instant) {
      this.showing = true;
      this.activateMarker();
      return this.element.fadeIn();
    };

    Callout.prototype.hide = function(instant) {
      this.showing = false;
      this.deactivateMarker();
      return this.element.fadeOut();
    };

    Callout.prototype.position = function(frameIndex) {
      var callback, called, x, y,
        _this = this;
      x = Math.floor(this.radius * Math.cos(2 * Math.PI * frameIndex / this.totalFrames));
      y = Math.floor(this.radius * Math.sin(2 * Math.PI * frameIndex / this.totalFrames));
      callback = function() {
        var z, _ref;
        z = (_ref = (y * -1) <= 0) != null ? _ref : {
          1: 20
        };
        return _this.marker.css({
          zIndex: z
        });
      };
      if (y < 0) {
        callback();
        called = true;
      }
      this.markerInteraction.css({
        left: this.center + x - (this.markerSize / 2)
      });
      return this.marker.stop(false, true).animate({
        left: this.center + x - (this.markerSize / 2)
      }, 100, function() {
        if (!called) {
          return callback();
        }
      });
    };

    return Callout;

  })($.TNF.BRAND.Gallery.Callout);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $.TNF.BRAND.Gallery.Rotator.Item = (function(_super) {

    __extends(Item, _super);

    function Item() {
      this.hideFlyout = __bind(this.hideFlyout, this);
      this.handleImageLoadError = __bind(this.handleImageLoadError, this);
      this.loadImage = __bind(this.loadImage, this);
      this.tracking = __bind(this.tracking, this);
      this.isTracking = __bind(this.isTracking, this);
      this.addCallout = __bind(this.addCallout, this);
      this.handleArrowBoxClick = __bind(this.handleArrowBoxClick, this);
      Item.__super__.constructor.apply(this, arguments);
    }

    Item.prototype.build = function() {
      var rotatorContainer, _ref;
      this.images = $.parseJSON(this.element.attr('data-image-paths'));
      this.totalFrames = this.images.length;
      this.content = this.element.find('div.hero-gallery-item-content');
      this.flyout = this.element.find('div.hero-gallery-flyout-left, div.hero-gallery-flyout-right', this.element).first();
      this.flyoutClose = $('<a>', {
        'class': 'hero-gallery-flyout-close'
      }).appendTo(this.flyout);
      this.flyoutWidth = parseInt(this.flyout.attr('data-width')) || 660;
      this.flyoutSide = (_ref = this.flyout.hasClass('hero-gallery-flyout-left')) != null ? _ref : {
        'left': 'right'
      };
      rotatorContainer = $('.hero-gallery-rotator-container', this.element);
      this.rotator = $('.hero-gallery-rotator', rotatorContainer);
      this.loader = $('.hero-gallery-rotator-loading', rotatorContainer);
      this.image = $('img', this.rotator);
      this.activeIndex = 0;
      return this.preload();
    };

    Item.prototype.setupObservers = function() {
      var _this = this;
      this.activateRollover();
      this.activateCtaRollover();
      $('.cta a.arrow-box, .hero-cta a.hero-arrow-box', this.element).bind('click', this.handleArrowBoxClick);
      this.element.find('a.hero-gallery-flyout-close').bind('click', this.hideFlyout);
      this.element.bind('mousedown', function(e) {
        _this.gallery.data('hero_gallery').stopAutoRotation();
        return _this.isTracking(e, true);
      });
      this.element.bind('mouseup', function(e) {
        return _this.isTracking(e, false);
      });
      return this.element.bind('mousemove', function(e) {
        return _this.tracking(e);
      });
    };

    Item.prototype.handleArrowBoxClick = function(e) {
      var element;
      element = $(e.currentTarget);
      if (element.data('embed-code')) {
        e.preventDefault();
        this.embedCode = element.data('embed-code');
        return this.adjustVideoSpace(true);
      } else if (element.data('flyout-link')) {
        e.preventDefault();
        return this.showFlyout();
      }
    };

    Item.prototype.finishLoading = function() {
      this.stepDistance = 30;
      this.buildCallouts();
      this.loader.hide();
      return this.element.trigger('loaded_TNF_heroSpot', this);
    };

    Item.prototype.addCallout = function(index, el) {
      var center, element, rotator;
      if (arguments.length === 1) {
        el = arguments[0];
      }
      center = this.image.width() / 2;
      element = $(el);
      rotator = new Rotator.Callout(element, center, this);
      element.css({
        top: '',
        left: '',
        visibility: 'visible',
        display: 'none'
      });
      this.callouts.push(rotator);
      return rotator;
    };

    Item.prototype.isTracking = function(e, b) {
      if (b) {
        e.preventDefault();
      }
      this.mouseTracking = b;
      return this.startingPageX = e.pageX;
    };

    Item.prototype.tracking = function(e) {
      var callout, direction, moved, _i, _len, _ref, _ref1, _results;
      e.preventDefault();
      if (!this.mouseTracking) {
        return;
      }
      moved = this.startingPageX - e.pageX;
      direction = (_ref = moved > 0) != null ? _ref : -{
        1: 1
      };
      if (Math.abs(moved) >= this.stepDistance) {
        this.startingPageX = e.pageX;
        this.activeIndex += direction;
        if (this.activeIndex >= this.images.length) {
          this.activeIndex = 0;
        } else if (this.activeIndex < 0) {
          this.activeIndex = this.images.length - 1;
        }
        this.image.attr('src', this.images[this.activeIndex]);
        _ref1 = this.callouts;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          callout = _ref1[_i];
          _results.push(callout.position(this.activeIndex));
        }
        return _results;
      }
    };

    Item.prototype.preload = function() {
      var image, _i, _len, _ref, _results,
        _this = this;
      this.loadedImages = 0;
      this.imageErrors = 0;
      this.imageQueue = [];
      _ref = this.images;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        image = _ref[_i];
        _results.push((function(image) {
          image = $(new Image());
          image.bind('load', _this.loadImage);
          image.bind('error', _this.handleImageLoadError);
          return image.attr({
            src: _this.images[_i]
          });
        })(image));
      }
      return _results;
    };

    Item.prototype.loadImage = function(image) {
      this.loadedImages += 1;
      this.imageQueue.push($(image));
      if (loadedImages === this.images.length - 1) {
        this.finishLoading();
        return this.cleanupImages();
      }
    };

    Item.prototype.handleImageLoadError = function(image) {
      this.imageQueue.push($(image));
      return this.imageErrors += 1;
    };

    Item.prototype.cleanupImages = function() {
      var image, _i, _len, _ref, _results;
      _ref = this.imageQueue;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        image = _ref[_i];
        _results.push((function(image) {
          return image.unbind();
        })(image));
      }
      return _results;
    };

    Item.prototype.showFlyout = function(activeCallout) {
      var animation,
        _this = this;
      if (this.activeCallout && this.activeCallout === activeCallout) {
        return false;
      } else if (this.activeCallout && this.activeCallout !== activeCallout) {
        this.activeCallout.hide();
      }
      if (activeCallout) {
        this.activeCallout = activeCallout;
        activeCallout.show();
      }
      if (this.flyoutVisible) {
        return;
      }
      $("body").trigger({
        type: 'hero_gallery_flyout_opened',
        item: this
      });
      animation = {};
      animation[this.flyoutSide] = -32;
      this.showFlyoutIEBranch();
      this.flyout.css(this.flyoutSide, -this.flyoutWidth).width(this.flyoutWidth).css('display', 'block');
      this.flyout.animate(animation, 200, 'easeInOutSine', function() {
        return _this.flyoutClose.fadeIn(200);
      });
      return this.flyoutVisible = true;
    };

    Item.prototype.hideFlyout = function(instant) {
      var animation;
      if (!this.flyoutVisible) {
        return;
      }
      if (this.activeCallout) {
        this.activeCallout.hide();
        this.activeCallout = false;
      }
      $("body").trigger({
        type: 'hero_gallery_flyout_closed',
        item: this,
        instant: instant
      });
      animation = {};
      animation[this.flyoutSide] = -this.flyoutWidth - 32;
      this.content.css('display', 'block');
      this.hideFlyoutIEBranch();
      this.flyoutClose.hide();
      this.flyout.animate(animation, 200, 'easeInOutSine');
      return this.flyoutVisible = false;
    };

    return Item;

  })($.TNF.BRAND.Gallery.Item);

}).call(this);
(function() {
  var Flyout,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Flyout = (function() {

    function Flyout(element, item) {
      this.element = element;
      this.item = item;
      this.hide = __bind(this.hide, this);
      this.setBackgroundImage = __bind(this.setBackgroundImage, this);
      if (this.element.length > 0) {
        this.setup();
      }
    }

    Flyout.prototype.setup = function() {
      this.body = $('body');
      this.element.append('<a class="hero-gallery-flyout-close"></a>');
      this.closeButton = this.element.find('.hero-gallery-flyout-close');
      this.width = parseInt(this.element.attr('data-width'));
      setTimeout(this.setBackgroundImage, 1000);
      if (this.element.hasClass('hero-gallery-flyout-left')) {
        this.side = 'left';
      } else {
        this.side = 'right';
      }
      return this.setupObservers();
    };

    Flyout.prototype.setupObservers = function() {
      var _this = this;
      this.closeButton.bind('click', this.hide);
      this.body.bind('hero_gallery_popup_opened', this.hide);
      return this.body.bind('hero_gallery_paged', function() {
        return _this.hide(true);
      });
    };

    Flyout.prototype.setBackgroundImage = function() {
      return this.element.css('background-image', "url(" + (this.element.attr('data-background')) + ")");
    };

    Flyout.prototype.hide = function(instant) {
      var animationOptions,
        _this = this;
      if (!this.visible) {
        return;
      }
      this.body.trigger({
        type: 'hero_gallery_flyout_closed',
        item: this,
        instant: instant
      });
      animationOptions = {};
      animationOptions[this.side] = -this.width;
      this.element.animate(animationOptions, 200, 'easeInOutSine', function() {
        return _this.element.hide();
      });
      return this.visible = false;
    };

    Flyout.prototype.show = function() {
      var animationOptions;
      this.body.trigger({
        type: 'hero_gallery_flyout_opened',
        item: this.item
      });
      animationOptions = {};
      animationOptions[this.side] = 0;
      this.element.css(this.side, -this.width);
      this.element.width(this.width).css('display', 'block');
      this.element.animate(animationOptions, 200, 'easeInOutSine');
      return this.visible = true;
    };

    return Flyout;

  })();

  $.TNF.BRAND.Gallery.Flyout = Flyout;

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $.TNF.BRAND.Paginator = (function() {

    function Paginator(responder) {
      this.responder = responder;
      this.next = __bind(this.next, this);
      this.previous = __bind(this.previous, this);
      this.items = this.responder.items;
      this.element = this.responder.element;
      this.width = this.responder.width;
      this.currentPage = 0;
    }

    Paginator.prototype.itemCount = function() {
      return this.items.length;
    };

    Paginator.prototype.previous = function() {
      return this.jumpToPage(this.currentPage - 1);
    };

    Paginator.prototype.next = function() {
      return this.jumpToPage(this.currentPage + 1);
    };

    Paginator.prototype.jumpToPage = function(page) {
      if (this.responder.isBusy()) {
        return;
      }
      if (page === this.currentPage) {
        return;
      }
      if (page > this.itemCount() - 1) {
        page = 0;
      }
      if (page < 0) {
        page = this.itemCount() - 1;
      }
      this.currentPage = page;
      return this.element.trigger('hero_gallery_paged', {
        page: page
      });
    };

    return Paginator;

  })();

}).call(this);

(function($) {
  var gallery = $('.hero-gallery, .gallery').first();
  new $.TNF.BRAND.GalleryFactory($(gallery));
}(jQuery));


