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
    *
    *    TODO: add autoplay option
    */
    initialize: function(options) {
      this.height = options.height || 538;
      this.width = options.width || 936;
      this.playerReadyFault = 0;
      this.apiReadyFault = 0;
      this.playerId = options.playerId;
      this.embedCode = options.embedCode;
      this.onLoad = options.onLoad;
      this.loaded = false;
      this.Ooyala = window.tnfOoyala;
      this.player = document.getElementById(this.playerId);
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
      this.player.width = this.width;
      this.clearVideoRetryInterval();
      if (typeof this.onLoad === 'function' && !this.loaded) {
        this.onLoad.call(this);
        this.loaded = true;
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
    var scriptTag = document.createElement('script');
    scriptTag.src = "http://player.ooyala.com/player.js?hasModuleParams=1&playerBrandingId=db367c03b0de4bcf8bf82a54c001a356&playerContainerId=ooyala-video-"+options.playerId+"&callback=tnfOoyala.handlePlayerReadyStateChange&playerId="+options.playerId+"&wmode=transparent&width=" + options.width + "&height=" + options.height + "&embedCode=" + options.embedCode + "&autoplay="
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
      ratio = ratio || 0.5625;
      this.embedCode = $actionElm.attr("data-embed-code");
      this.$targetCont = $targetCont;
      this.heroCont = $(".hero", this.$targetCont);
      this.targetImage = $("img", this.$targetCont);
      this.targetContWidth = this.$targetCont.width();
      this.ratioHeight = Math.ceil(this.targetContWidth * ratio);
      this.playHeadTime = 0;
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
      var that = this,
          height = that.ratioHeight;
          playerCont = $('.player-container', that.$targetCont);
      if(insert) {
        that.heroCont.fadeOut('fast', function() {
          if (TNF.ipad){
            height = height + 35;
          }
         that.$targetCont.animate({height: height }, 1000, function() {
            that.handleVideo(insert);
            if (TNF.ipad){
              playerCont.animate({'padding-top': '35px' });
              $('a.video-interface-close', playerCont).css({"border-radius": '10px 10px 0 0'});
            }
          });
        });
      } else {
        that.$targetCont.animate({height: that.targetContHeight}, 1000, function() {
          that.heroCont.fadeIn('fast', function() {
              that.handleVideo();
              if (TNF.ipad){
                playerCont.animate({'padding-top': '0px' });
                $('a.video-interface-close', playerCont).css({"border-radius": '0 0 0 10px'});
              }
            });
          });
        }
    },

    handleVideo: function (insert) {
      var playerContainer = $(".player-container", this.$targetCont),
          player = null,
          that = this;
      if (this.videoInterface){
        player = $("#"+this.videoInterface.playerId);
      }
      if (insert) {
        if ($(player).length === 0){
          this.videoInterface = $.TNF.BRAND.videoInterface.factory({
            container: playerContainer,
            width: that.targetContWidth,
            height: that.ratioHeight,
            embedCode: that.embedCode,
            onLoad: function() {
              that.videoInterface.play();
            }
          });

          playerContainer.append('<a class="video-interface-close"></a>');
          $('a.video-interface-close', playerContainer).click(function(e) {
            e.preventDefault();
            playerContainer.trigger("close-event");
            playerContainer.fadeOut("fast");
          });

        } else {
          playerContainer.fadeIn("fast", function(){
            that.videoInterface.setPlayheadTime(that.playheadTime);
          }); 
        }
      } else {
        playerContainer.fadeOut("fast");
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
(function($) {

  /* The main Hero Gallery class.. it requires specific markup, so check the
   * specs to see what that markup should look like.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */

  var Gallery = Class.create({
    element: null,
    items: [],
    currentPage: 0,

    initialize: function(element) {
      this.element = element;

      this.shortClass = 'tall';
      if (this.element.hasClass('short') == true) {
        this.shortClass = 'short';
      }

      // remove any instances of HeroGallery on the element, then set it
      if (this.element.data('hero_gallery')) {
        this.element.data('hero_gallery').dispose();
      }
      this.element.data('hero_gallery', this);

      this.build();
      this.setupObservers();
      this.autoRotate();
    },

    autoRotate: function() {
      this.autoRotationPaused = false;
      this.autoRotateInterval = setInterval(function() {
        if(this.autoRotationPaused !== true) {
          this.nextPage();
        }
      }.bind(this), 7000);
    },

    stopAutoRotation: function() {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    },

    build: function() {
      // find all the items that we can page through
      var items = this.element.find('div.hero-gallery-item');

      // So that we can reliably interact with any gallery's API, we fire an
      // event once we've heard back from all HeroSpots (via an event each
      // fires) that they are all finished loading
      this.heroSpotLoadCountdown = items.length;
      this.element.bind('loaded_TNF_heroSpot', this.countDownHeroSpotLoaders.bind(this));

      this.items = [];
      items.each(function(i, element) {
        var type = $(element).data('type');

        // It shouldn't be possible to get undefined if the data is accurate,
        // but data is unlikely to be accurate on integration - opting to make
        // the implementation less brittle.
        var object = (type === 'standard' || type === undefined) ? $.TNF.BRAND.HeroGallery.Standard : $.TNF.BRAND.HeroGallery.Rotator;
        this.items.push(new object.Item($(element)));
      }.bind(this));

      // add in the markup we'll need for pagination
      this.paginatable = this.items.length > 1;
      if (this.paginatable) {
        this.element.append('\
               <a class="hero-gallery-arrow-left arrow-box-left ' + this.shortClass + '"><div class="arrow"></div></a>\
               <a class="hero-gallery-arrow-right arrow-box ' + this.shortClass + '"><div class="arrow"></div></a>');
        this.element.append('<div class="hero-gallery-paginator"><em></em>' + (new Array(this.items.length + 1).join('<a></a>')) + '</div>');
      }

      // find the elements we'll use for pagination
      this.prevButton = this.element.find('a.hero-gallery-arrow-left');
      this.nextButton = this.element.find('a.hero-gallery-arrow-right');
      this.paginator = this.element.find('div.hero-gallery-paginator');
      this.pageIndicator = this.element.find('div.hero-gallery-paginator em');
      this.scroller = this.element.find('div.hero-gallery-scroller');

      // get some widths
      this.width = this.element.width();
      this.itemWidth = this.element.find('div.hero-gallery-item').width();

      // size the scroller
      this.scroller.width(this.itemWidth * this.items.length);

      // center the paginator
      this.paginator.css('left', (this.width / 2) - (this.paginator.outerWidth() / 2));
    },

    setupObservers: function() {
      this.element.hover(
        // mouseenter
        function(e) {
          this.autoRotationPaused = true;
        }.bind(this),

        // mouseleave
        function(e) {
          this.autoRotationPaused = false;
        }.bind(this)
      );

      // clicking on the background
      this.element.click(function(e) {
        this.stopAutoRotation();
        try{
          var element = $(e.target);
          if (element.hasClass('hero-gallery-item') || element.hasClass('hero-gallery-content')) {
            $("body").trigger('hero_gallery_paged', {page: this.currentPage});
          }
        } catch (e) {}
      }.bind(this));

      // left and right pagination
      this.prevButton.click(this.prevPage.bind(this));
      this.nextButton.click(this.nextPage.bind(this));

      // page indicator pagination
      this.paginator.find('a').click(function(e) {
        this.jumpToPage($(e.target).prevAll('a').length);
      }.bind(this));

      $("body").bind('hero_gallery_popup_opened', function(e) {
        this.paginator.animate({opacity: 0}, 200, 'easeInOutSine', function() { this.paginator.hide(); }.bind(this));
      }.bind(this));

      $("body").bind('hero_gallery_popup_closed', function(e) {
        this.paginator.show();
        this.paginator.animate({opacity: 1}, 200, 'easeInOutSine');
      }.bind(this));

      // if the flyout opens or closes, we should move our paging arrow
      $("body").bind('hero_gallery_flyout_opened', function(e) {
        this.nextButton.animate({opacity: 0}, 200, 'easeInOutSine', function() { this.nextButton.hide(); }.bind(this));
        this.prevButton.animate({opacity: 0}, 200, 'easeInOutSine', function() { this.prevButton.hide(); }.bind(this));
        this.paginator.animate({opacity: 0}, 200, 'easeInOutSine', function() { this.paginator.hide(); }.bind(this));
      }.bind(this));

      $("body").bind('hero_gallery_flyout_closed', function(e) {
        this.nextButton.show();
        this.prevButton.show();
        this.paginator.show();
        this.nextButton.animate({opacity: 1}, 200, 'easeInOutSine');
        this.prevButton.animate({opacity: 1}, 200, 'easeInOutSine');
        this.paginator.animate({opacity: 1}, 200, 'easeInOutSine');
      }.bind(this));
    },

    countDownHeroSpotLoaders: function() {
      this.heroSpotLoadCountdown -= 1;

      if(this.heroSpotLoadCountdown < 1) {
        this.element.trigger('loaded_TNF_heroGallery');
        this.fullyLoaded = true;
      }
    },

    prevPage: function() {
      this.jumpToPage(this.currentPage - 1);
    },

    nextPage: function() {
      this.jumpToPage(this.currentPage + 1);
    },

    jumpToPage: function(page) {
      if (page > this.items.length - 1) page = 0;
      if (page < 0) page = this.items.length - 1;
      this.currentPage = page;

      // trigger an event so items can clean themselves up
      $(".hero-gallery").trigger('hero_gallery_paged', {page: page});

      // move the scroller and the page indicator
      this.scroller.animate({'left': -(page * this.itemWidth)}, 500, 'easeInOutSine');
      this.pageIndicator.animate({'left': (page * 19)}, 500, 'easeInOutSine');
    },

    dispose: function() {
      this.element.data('hero_gallery', null);

      this.prevButton.unbind('click').remove();
      this.nextButton.unbind('click').remove();
      this.paginator.remove();

      for (var item in this.items) {
        this.items[item].dispose();
      }

      this.element = null;
      delete(this); // no idea if this works
    }
  });

  var AbstractItemLogic = {

    videoInterfaceContainer: null,
    element: null,
    flyoutVisible: false,

    initialize: function(element) {
      this.element = element;
      this.id = this.element.attr('id').split('herospot-')[1]

      this.build();

      this.buildCtas();
      this.buildHotRegions();

      this.setupObservers();
      this.gallery = $(this.element).parent().parent('.hero-gallery');
      this.galleryHeight = this.gallery.outerHeight();
      this.videoInterfaceContainer = $('.hero-gallery-video-interface', this.gallery );
      this.embedCode = '';
    },

    // Adds a newly-initialized cta to collection of ctas
    //
    // Arguments:
    //  - index (optional) - Accepts index argument only to conform to iterator
    //                       callback expected signature.
    //  - element          - DOM element from which to build the cta.
    //
    addCta: function(index, el) {
      if (arguments.length == 1) { el = arguments[0]; }
      this.ctas.push(el);
      return el;
    },

    // Adds a newly-initialized HotRegion to collection of HotRegions
    //
    // Arguments:
    //  - index (optional) - Accepts index argument only to conform to iterator
    //                       callback expected signature.
    //  - element          - DOM element from which to build the HotRegion.
    //
    addHotRegion: function(index, el) {
      if (arguments.length == 1) { el = arguments[0]; }
      this.hotRegions.push(el);
      return el;
    },

    activateCtaRollover: function() {
      var ctas = $(this.element).find('.hero-cta a');

      ctas.bind('mouseover', this.handleCtaRollover);
      ctas.bind('mouseout', this.handleCtaRollout);
    },

    handleCtaRollover: function(event) {
      var anchor = $(event.target).parent(),
          color  = anchor.data('text-color-rollover');

      anchor.find('.hero-text').css('color', color);
    },

    handleCtaRollout: function(event) {
      var anchor = $(event.target).parent(),
          color  = anchor.data('text-color');

      anchor.find('.hero-text').css('color', color);
    },

    activateRollover: function() {
      if ((rolloverImageSrc = this.element.attr('data-rollover-image')) !== undefined) {
        // preload the image
        var rolloverImage = new Image();
            rolloverImage.src = rolloverImageSrc;

        this.rolloverImage = 'url(' + rolloverImageSrc + ')';
        this.defaultImage  = this.element.css('background-image');

        $(rolloverImage).load(this.setupRolloverObservers.bind(this));
      }
    },

    setupRolloverObservers: function() {
      this.element.bind('mouseover', this.revealRolloverImage.bind(this));
      this.element.bind('mouseout', this.restoreDefaultImage.bind(this));
    },

    revealRolloverImage: function(event) {
      this.element.css('background-image', this.rolloverImage);
    },

    restoreDefaultImage: function(event) {
      this.element.css('background-image', this.defaultImage);
    },

    showFlyoutIEBranch: function() {
      if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
        this.content.hide();
      } else {
        this.content.animate({'opacity': 0}, 200, 'easeInOutSine', function() {
          this.content.css('display', 'none');
        }.bind(this));
      }
    },

    hideFlyoutIEBranch: function() {
      if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
        this.content.show();
      } else {
        this.content.css('display', 'block');
        this.content.animate({'opacity': 1}, 200, 'easeInOutSine');
      }
    },

    hideVideo: function() {
      var self = this;
      self.videoInterface.pause();
      this.videoInterfaceContainer.fadeOut(function(){
        self.adjustVideoSpace();
      });
    },

    showVideo: function() {
      var self = this;

      this.videoInterfaceContainer.append('<a class="video-interface-close"></a>');
      $('a.video-interface-close', this.videoInterfaceContainer).click(function(e) {
        e.preventDefault();
        self.hideVideo();
        if (TNF.ipad){
          // don't like this 
          self.videoInterfaceContainer.animate({"padding-top": '0px'});
          $('a.video-interface-close').css({"border-radius": '0 0 0 10px'});
        }
      });
      if (TNF.ipad){
        this.videoInterfaceContainer.animate({"padding-top": '35px'});
        $('a.video-interface-close').css({"border-radius": '10px 10px 0 0'});
      }
      self.videoInterface.play();

    },

    unloadVideo: function() {
      $(this.videoInterfaceContainer).children().unbind();
      $(this.videoInterfaceContainer).empty();
    },

    loadVideo: function() {
      var self = this;
      this.videoInterfaceContainer.css({"z-index": 9120, 'display': 'block', "visibility": 'visible'});

      this.videoInterface = $.TNF.BRAND.videoInterface.factory({
        container: $(this.videoInterfaceContainer),
        width: 956,
        height: 538,
        embedCode: this.embedCode,
        onLoad: function() {
          self.showVideo();
        }
      });
    },

    adjustVideoSpace:function(insert) {
      var that = this,
          videoHeight = 538,
          playerCont = $('.player-container', that.gallery );

      if (TNF.ipad) {
        videoHeight = videoHeight + 35;
      }

      if (insert) {
        $(that.element).parent().fadeOut('fast', function() {
          that.gallery.animate({height: videoHeight}, 1000, function() {
            that.loadVideo();
            if (TNF.ipad) {
              playerCont.animate({'padding-top': '0px' });
              $('a.video-interface-close', playerCont).css({"border-radius": '0 0 0 10px'});
            }
          });
        });
      } else {
        that.gallery.animate({height: that.galleryHeight}, 1000, function() {
          contentBox = $(this).closest('.content-box');
          oldPosition = contentBox.css('position');

          contentBox.css({ position: 'relative' })
                    .css({ position: oldPosition });

          $(that.element).parent().fadeIn('fast', function() {
            that.unloadVideo();
            if (TNF.ipad) {
              playerCont.animate({'padding-top': '0px' });
              $('a.video-interface-close', playerCont).css({"border-radius": '0 0 0 10px'});
            }
          });
        });
      }
    },

    dispose: function() {
      this.element.find('a.arrow-box').unbind('click');
      this.element.find('a.hero-gallery-flyout-close').remove();

      for (var callout in this.callouts) {
        this.callouts[callout].dispose();
      }

      this.element = null;
      delete(this); // no idea if this works
    },

    // Find all the callouts and instantiate them
    //
    buildCallouts: function() {
      var callouts = this.element.find('div.hero-gallery-callout');
      this.callouts = [];
      callouts.each(this.addCallout.bind(this));
    },

    // Find all the HotRegions and instantiate them
    //
    buildHotRegions: function() {
      var hotRegions = this.element.find('.hot-region');
      this.hotRegions = [];
      hotRegions.each(this.addHotRegion.bind(this));
    },

    // Find all the ctas and instantiate them
    //
    buildCtas: function() {
      var ctas = this.element.find('.hero-cta');
      this.ctas = [];
      ctas.each(this.addCta.bind(this));
    }

  };

  var AbstractCalloutLogic = {
    element: null,
    showing: false,

    activateMarker: function() {
      this.markerIndicator.addClass('active');
      this.markerCircle.animate({top: 0, left: 0, width: this.markerSize, height: this.markerSize}, 200, 'easeInOutSine')
    },

    deactivateMarker: function() {
      this.markerIndicator.removeClass('active');
      this.markerCircle.animate({top: this.markerSize / 2, left: this.markerSize / 2, width: 0, height: 0}, 200, 'easeInOutSine')
    }
  };

  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.HeroGallery = Gallery;
  $.TNF.BRAND.HeroGallery.AbstractItemLogic = AbstractItemLogic;
  $.TNF.BRAND.HeroGallery.AbstractCalloutLogic = AbstractCalloutLogic;

}(jQuery));

(function($) {

  var Standard = {};

  //********************************************************//
  /* Hero Galleries contain many Items.  This is for them.  Items have specific
   * markup, so check specs to see what that markup should look like.
   *
   * Items can have flyouts, and any number of callouts.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */
  //********************************************************//

  Standard.Item = {

    build: function() {
      this.content = this.element.find('div.hero-gallery-item-content');

      // find the flyout
      this.flyout = this.element.find('div.hero-gallery-flyout-left, div.hero-gallery-flyout-right').first();
      if (this.flyout.length) {
        this.flyout.append('<a class="hero-gallery-flyout-close"></a>');

        this.flyoutWidth = parseInt(this.flyout.attr('data-width'));
        setTimeout(function() {
          this.flyout.css('background-image', 'url(' + this.flyout.attr('data-background') + ')');
        }.bind(this), 1000);
        this.flyoutSide = this.flyout.hasClass('hero-gallery-flyout-left') ? 'left' : 'right';
      }

      this.buildCallouts();
      this.element.trigger('loaded_TNF_heroSpot', this);
    },

    // Adds a newly-initialized callout to collection of callouts
    //
    // Arguments:
    //  - index (optional) - Accepts index argument only to conform to iterator
    //                       callback expected signature.
    //  - element          - DOM element from which to build the callout.
    //
    addCallout: function(index, el) {
      if (arguments.length == 1) { el = arguments[0]; }
      var callout = new Standard.Callout($(el));
      this.callouts.push(callout);
      return callout;
    },

    setupObservers: function() {
      this.activateRollover();
      this.activateCtaRollover();

      // make the call to action open the flyout
      $('.cta a.arrow-box, .hero-cta a.hero-arrow-box', this.element).click(function(e) {
        var element = $(e.currentTarget);
        if (element.data('embed-code')) {
          e.preventDefault();
          this.embedCode = element.data('embed-code');
          this.adjustVideoSpace(true);
        } else if (element.data('flyout-link')) {
          e.preventDefault();
          this.showFlyout();
        }
      }.bind(this));

      this.element.find('a.hero-gallery-flyout-close').click(function() {
        this.hideFlyout();
      }.bind(this));

      $("body").bind('hero_gallery_popup_opened', function() {
        if (this.flyoutVisible) this.hideFlyout();
      }.bind(this));

      // listen for pagination, so we can hide our flyout etc.
      $("body").bind('hero_gallery_paged', function() {
        if (this.flyoutVisible) this.hideFlyout(true);
      }.bind(this));
    },

    showFlyout: function() {
      if (!this.flyout) return;
      $("body").trigger({type: 'hero_gallery_flyout_opened', item: this});

      var animation = {};
      animation[this.flyoutSide] = 0;

      this.showFlyoutIEBranch();

      this.flyout.css(this.flyoutSide, -this.flyoutWidth).width(this.flyoutWidth).css('display', 'block');
      this.flyout.animate(animation, 200, 'easeInOutSine');
      this.flyoutVisible = true;
    },

    hideFlyout: function(instant) {
      if (!this.flyout) return;
      $("body").trigger({type: 'hero_gallery_flyout_closed', item: this, instant: instant});

      var animation = {};
      animation[this.flyoutSide] = -this.flyoutWidth;

      this.hideFlyoutIEBranch();

      this.flyout.animate(animation, 200, 'easeInOutSine', function() {
        this.flyout.hide();
      }.bind(this));

      this.flyoutVisible = false;
    }
  };

  Standard.Item = Class.create($.extend(Standard.Item, $.TNF.BRAND.HeroGallery.AbstractItemLogic));

  /* Items contain many Callouts.  Callouts are simply divs with some content,
   * a top and left, and the rest of the markup is built for you.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */

  Standard.Callout = {

    initialize: function(element) {
      this.element = element;

      // get the parent element and it's width/height for positioning popups
      this.parentElement = element.parent();
      this.containerWidth = this.parentElement.width();
      this.containerHeight = this.parentElement.height();

      this.build();
      this.setupObservers();
    },

    build: function() {
      this.position = this.element.position();

      // add the marker
      this.parentElement.append('<div class="hero-gallery-callout-marker"><em></em><a></a></div>');

      // add the popup
      this.parentElement.append('\
        <div class="hero-gallery-callout-popup">\
          <div class="hero-gallery-callout-popup-content"></div>\
          <a class="hero-gallery-callout-popup-close"></a>\
          <div class="hero-gallery-callout-popup-arrow"></div>\
        </div>');

      // find the marker and get it's width
      this.marker = this.parentElement.find('div.hero-gallery-callout-marker:last');
      this.markerCircle = this.marker.find('em');
      this.markerIndicator = this.marker.find('a');

      // find the popup
      this.popup = this.parentElement.find('div.hero-gallery-callout-popup:last');

      // get the size of the marker and where it's center is
      this.markerSize = this.marker.width();

      // position the marker
      this.marker
        .css('top', this.position['top'] - (this.markerSize / 2))
        .css('left', this.position['left'] - (this.markerSize / 2));

      // position the marker circle
      this.markerCircle
        .css('top', this.markerSize / 2)
        .css('left', this.markerSize / 2);

      // fill the popup and position it
      this.contentElement = this.element.clone().css('top', 0).css('left', 0).css('visibility', 'visible').css('position', 'static');
      this.popup.find('div.hero-gallery-callout-popup-content').append(this.contentElement);
      this.positionPopup();
    },

    setupObservers: function() {
      $("body").bind('hero_gallery_popup_opened', this.fadePopup.bind(this));
      $("body").bind('hero_gallery_flyout_opened', this.fadePopup.bind(this));
      $("body").bind('hero_gallery_paged', this.fadePopup.bind(this));

      this.markerIndicator.bind('mouseover', function() {
        this.markerCircle.animate({top: 0, left: 0, width: this.markerSize, height: this.markerSize}, 100, 'easeInOutSine')
      }.bind(this));

      this.markerIndicator.bind('mouseout', function() {
        if (this.showing) return;
        this.deactivateMarker();
      }.bind(this));

      this.markerIndicator.bind('click', this.showPopup.bind(this));
      this.popup.find('a.hero-gallery-callout-popup-close').click(this.fadePopup.bind(this));
    },

    positionPopup: function() {
      var popupWidth = this.popup.outerWidth(),
          popupHeight = this.popup.outerHeight();

      // find the top, and adjust if there isn't enough room
      var top = this.position['top'] - popupHeight - 30;
      var left = 0;
      if (top <= 10) {
        top = this.position['top'] + (this.markerSize / 2);

        // not enough room below, so move to the right
        if (top + popupHeight + 30 > this.containerHeight) {

          top = (this.containerHeight - popupHeight) / 2;
          if (top <= 10) top = 10;
          left = this.position['left'] + 30;

          // not enough room on the right, so move to the left
          if (left + popupWidth + 30 > this.containerWidth) {

            top = (this.containerHeight - popupHeight) / 2;
            if (top <= 10) top = 10;
            left = this.position['left'] - popupWidth - 30;

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

      // position the popup
      this.popup.css('top', top).css('left', left).css('display', 'none');
    },

    setArrowTop: function(top) {
      var arrowTop = (this.position['top'] - top) - 8;
      this.popup.find('div.hero-gallery-callout-popup-arrow').css('top', arrowTop);
    },

    positionPopupLeft: function(width) {
      var left = this.position['left'] - (width / 2);
      if (left <= 10) left = 10;
      if (left + width >= this.containerWidth - 10) left = this.containerWidth - width - 10;

      var arrowLeft = (this.position['left'] - left) - 8;
      if (arrowLeft < 6) arrowLeft = 6;
      this.popup.find('div.hero-gallery-callout-popup-arrow').css('left', arrowLeft);

      return left;
    },

    showPopup: function() {
      if (this.showing) {
        this.hidePopup();
        return;
      }

      $("body").trigger({type: 'hero_gallery_popup_opened', callout: this});
      this.activateMarker();

      this.popup.css('opacity', 0).css('display', 'block');
      this.popup.animate({opacity: 1}, 200, 'easeInOutSine');
      this.showing = true;
    },

    hidePopup: function() {
      $("body").trigger({type: 'hero_gallery_popup_closed', callout: this});

      this.deactivateMarker();
      this.popup.animate({opacity: 0}, 200, 'easeInOutSine', function() {
        this.popup.css('display', 'none');
      }.bind(this));
      this.showing = false;
    },

    fadePopup: function() {
      if (!this.showing) return;

      $("body").trigger({type: 'hero_gallery_popup_closed', callout: this});
      this.deactivateMarker();
      this.popup.animate({opacity: 0}, 200, 'easeInOutSine', function() {
        this.popup.css('display', 'none');
      }.bind(this));
      this.showing = false;
    },

    dispose: function() {
      this.marker.remove();
      this.popup.remove();

      this.element = null;
      delete(this); // no idea if this works
    }
  };

  Standard.Callout = Class.create($.TNF.BRAND.HeroGallery.AbstractCalloutLogic, Standard.Callout);

  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.HeroGallery.Standard = {Item: Standard.Item, Callout: Standard.Callout};

}(jQuery));
(function($) {

  var Rotator = {};

  //********************************************************//
  /* Hero Galleries contain many Items.  This is for them.  Items have specific
   * markup, so check specs to see what that markup should look like.
   *
   * Items can have flyouts, and any number of callouts.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */
  //********************************************************//

  Rotator.Item = {

    build: function() {
      this.images = $.parseJSON(this.element.attr('data-image-paths'));
      this.totalFrames = this.images.length;
      this.content = this.element.find('div.hero-gallery-item-content');

      // add the flyout
      this.flyout = this.element.find('div.hero-gallery-flyout-left, div.hero-gallery-flyout-right', this.element).first();
      this.flyoutClose = $('<a>', {'class': 'hero-gallery-flyout-close'}).appendTo(this.flyout);

      this.flyoutWidth = parseInt(this.flyout.attr('data-width')) || 660;
      this.flyoutSide = this.flyout.hasClass('hero-gallery-flyout-left') ? 'left' : 'right';

      var rotatorContainer = $('.hero-gallery-rotator-container', this.element);
      this.rotator = $('.hero-gallery-rotator', rotatorContainer);
      this.loader = $('.hero-gallery-rotator-loading', rotatorContainer);
      this.image = $('img', this.rotator);
      this.activeIndex = 0;

      // preloading calls through to finishLoading when it's complete
      this.preload();
    },

    setupObservers: function() {
      this.activateRollover();
      this.activateCtaRollover();

      // make the call to action open the flyout
      $('.cta a.arrow-box, .hero-cta a.hero-arrow-box', this.element).click(function(e) {
        var element = $(e.currentTarget);
        if (element.data('embed-code')) {
          e.preventDefault();
          this.embedCode = element.data('embed-code');
          this.adjustVideoSpace(true);
        } else if (element.data('flyout-link')) {
          e.preventDefault();
          this.showFlyout();
        }
      }.bind(this));

      this.element.find('a.hero-gallery-flyout-close').click(function() {
        this.hideFlyout();
      }.bind(this));

      this.element.bind('mousedown', function(e) {
        this.gallery.data('hero_gallery').stopAutoRotation();
        this.isTracking(e, true);
      }.bind(this));
      this.element.bind('mouseup', function(e) { this.isTracking(e, false); }.bind(this));
      this.element.bind('mousemove', function(e) { this.tracking(e); }.bind(this));
    },

    finishLoading: function() {
      this.stepDistance = 30;
      this.buildCallouts()
      this.loader.hide();
      this.element.trigger('loaded_TNF_heroSpot', this);
    },

    // Adds a newly-initialized callout to collection of callouts
    //
    // Arguments:
    //  - index (optional) - Accepts index argument only to conform to iterator
    //                       callback expected signature.
    //  - element          - DOM element from which to build the callout.
    //
    addCallout: function(index, el) {
      if (arguments.length == 1) { el = arguments[0]; }

      var center = this.image.width() / 2,
          element = $(el),
          rotator = new Rotator.Callout(element, center, this);

      element.css({top: '', left: '', visibility: 'visible', display: 'none'});

      this.callouts.push(rotator);

      return rotator;
    },

    isTracking: function(e, b) {
      if (b) e.preventDefault();
      this.mouseTracking = b;
      this.startingPageX = e.pageX;
    },

    tracking: function(e) {
      e.preventDefault();

      if (!this.mouseTracking) return;

      var moved = this.startingPageX - e.pageX;
      var direction = moved > 0 ? -1 : 1;
      if (Math.abs(moved) >= this.stepDistance) {
        this.startingPageX = e.pageX;
        this.activeIndex += direction;

        if (this.activeIndex >= this.images.length) {
          this.activeIndex = 0;
        } else if (this.activeIndex < 0) {
          this.activeIndex = this.images.length - 1;
        }

        this.image.attr('src', this.images[this.activeIndex]);

        for (var i = 0, length = this.callouts.length; i < length; i += 1) {
          this.callouts[i].position(this.activeIndex);
        }
      }
    },

    preload: function() {
      var loadedImages = 0;
      var imageErrors = 0;
      var imageQueue = [];

      for (var i = 1, length = this.images.length; i < length; i += 1) {
        var image = $(new Image());
        image.bind('load', (function(scope) {
          return function() {
            loadedImages += 1;
            imageQueue.push($(this));

            if (loadedImages === scope.images.length - 1) {
              scope.finishLoading();
              scope.cleanupImages(imageQueue);
            }
          };
        })(this));

        image.bind('error', (function(scope) {
          return function() {
            imageQueue.push($(this));
            imageErrors += 1;
            if (imageErrors === 2) {
              //TODO
            }
          };
        })(this));

        image.attr({src: this.images[i]});
      }
    },

    cleanupImages: function(images) {
      for (var i = 0, length = images.length; i < length; i += 1) {
        images[i].unbind();
        delete(images[i]);
      }
    },

    showFlyout: function(activeCallout) {

      if (this.activeCallout && this.activeCallout == activeCallout) {
        return false;
      } else if (this.activeCallout && this.activeCallout != activeCallout) {
        this.activeCallout.hide();
      }

      if (activeCallout) {
        this.activeCallout = activeCallout;
        activeCallout.show();
      }

      if (this.flyoutVisible) return;

      $("body").trigger({type: 'hero_gallery_flyout_opened', item: this});

      var animation = {};
      animation[this.flyoutSide] = -32;

      this.showFlyoutIEBranch();

      this.flyout.css(this.flyoutSide, -this.flyoutWidth).width(this.flyoutWidth).css('display', 'block');
      this.flyout.animate(animation, 200, 'easeInOutSine', function() {
        this.flyoutClose.fadeIn(200);
      }.bind(this));

      this.flyoutVisible = true;
    },

    hideFlyout: function(instant) {
      if (!this.flyoutVisible) return;

      if (this.activeCallout) {
        this.activeCallout.hide();
        this.activeCallout = false;
      }

      $("body").trigger({type: 'hero_gallery_flyout_closed', item: this, instant: instant});

      var animation = {};
      animation[this.flyoutSide] = -this.flyoutWidth - 32;

      this.content.css('display', 'block');

      this.hideFlyoutIEBranch();

      this.flyoutClose.hide();
      this.flyout.animate(animation, 200, 'easeInOutSine');

      this.flyoutVisible = false;
    }
  };

  Rotator.Item = Class.create($.extend(Rotator.Item, $.TNF.BRAND.HeroGallery.AbstractItemLogic));

  /* Items contain many Callouts.  Callouts are simply divs with some content,
   * a top and left, and the rest of the markup is built for you.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */

  Rotator.Callout = {

    initialize: function(element, center, item) {
      this.element = element;
      this.item = item;

      this.radius = Math.abs(center - parseInt(this.element.css('left'), 10));
      this.center = center;
      this.totalFrames = this.item.images.length;
      this.rotator = this.item.rotator;
      this.y = this.element.css('top');

      this.build();
      this.setupObservers();
    },

    build: function() {
      this.initialPosition = this.element.position();

      // add the marker
      this.rotator.append('<div class="hero-gallery-callout-marker"><em></em><a></a></div>');
      this.rotator.append('<div class="hero-gallery-callout-marker-interaction"></div>');

      // find the marker and get it's width
      this.marker = this.rotator.find('div.hero-gallery-callout-marker:last');
      this.markerCircle = this.marker.find('em');
      this.markerIndicator = this.marker.find('a');

      // get the size of the marker and where it's center is
      this.markerSize = this.marker.width();

      this.markerInteraction = this.rotator.find('div.hero-gallery-callout-marker-interaction:last')
          .css({zIndex: 30, top: this.initialPosition['top'] - (this.markerSize / 2)})
          .css({left: this.initialPosition['left'] - (this.markerSize / 2), width: 30, height: 30})
          .css({position: 'absolute'});

      // position the marker
      this.marker
        .css('top', this.initialPosition['top'] - (this.markerSize / 2))
        .css('left', this.initialPosition['left'] - (this.markerSize / 2));

      // position the marker circle
      this.markerCircle
        .css('top', this.markerSize / 2)
        .css('left', this.markerSize / 2);
    },

    setupObservers: function() {
      this.markerInteraction.bind('mouseover', function() {
        this.markerCircle.animate({top: 0, left: 0, width: this.markerSize, height: this.markerSize}, 100, 'easeInOutSine');
      }.bind(this));

      this.markerInteraction.bind('mouseout', function() {
        if (this.showing) return;
        this.deactivateMarker();
      }.bind(this));

      this.markerInteraction.bind('click', function() {
        this.item.showFlyout(this);
      }.bind(this));
    },

    show: function(instant) {
      this.showing = true;
      this.activateMarker();
      this.element.fadeIn();
    },

    hide: function(instant) {
      this.showing = false;
      this.deactivateMarker();
      this.element.fadeOut();
    },

    position: function(frameIndex) {
      var x = Math.floor(this.radius * Math.cos(2 * Math.PI * frameIndex / this.totalFrames));
      var y = Math.floor(this.radius * Math.sin(2 * Math.PI * frameIndex / this.totalFrames));
      var called;
      var callback = function() {
        var z = (y * -1) <= 0 ? 1 : 20;
        this.marker.css({zIndex: z});
      }.bind(this);

      if (y < 0) {
        callback();
        called = true;
      }

      this.markerInteraction.css({left: this.center + x - (this.markerSize / 2)});
      this.marker.stop(false, true).animate({left: this.center + x - (this.markerSize / 2)}, 100, (function(y) {
        return function () { if (!called) callback(); }
      })(y));
    }
  };

  Rotator.Callout = Class.create($.TNF.BRAND.HeroGallery.AbstractCalloutLogic, Rotator.Callout);

  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.HeroGallery.Rotator = {Item: Rotator.Item, Callout: Rotator.Callout};

}(jQuery));

(function($) {

  var heroGallery = $('.hero-gallery')

  if (heroGallery.length > 0) {
    new $.TNF.BRAND.HeroGallery(heroGallery);
  }

}(jQuery));

