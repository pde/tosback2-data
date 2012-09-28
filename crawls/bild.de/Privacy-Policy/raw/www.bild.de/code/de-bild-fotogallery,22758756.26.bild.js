
/*de.bild.fotoGallery:22758756.26*/

var de = de || {};
de.bild = de.bild || {};
de.bild.fotoGallery = (function($){
        
      var settings = {
       // default interval between ads
       // after every 3 images
          'adInterval' : 3,
        // at what point do we trigger the reload?
        // 1 = frame before ad
        // 2 = two frame before ad and so on
          'frameBeforeAdToReload' : 1,
          // fotogallery id
          'idPrefix' : 'bild-fotogallery-'
      },
        // should we save the current item index
        saveStatus = false,   
        galleries = [],
        // elem pointer to current gallery
        activeGallery = null;
    /**
     * refreshAd: refreshes the source of the ad iframe
     * @param {$object} $ad - ad  jquery object (parent of iframe and usually li)
     * @name refreshAd
     * @function
     * @private
     */
    function refreshAd($ad){
      if ($ad.length === 0) return false;
      var $adIframe = $ad.find('iframe');
      if ($adIframe.length) {
        setTimeout(function(){
          $adIframe[0].src = $adIframe.attr('src');
        }, 10);
      } else {
        if ($ad.attr('title') !== null && $ad.attr('title') !== 'undefined') {
        var url = $ad.attr('title');
          if (url.length) {
            $.ajax({
              url: url,
              dataType : 'html',
              cache : true
            })
            .done(function(response){
              if (response.length > 0) {
                $ad.removeAttr('title'); 
                $ad.find('div:first').replaceWith(response);
              } else {
                skip();
              }
            })
            .fail(function(){
              skip(); 
            });
            // if conditions for ajax are passed return true
            return true;
          } 
        }
        // one or more of the conditions didn't pass
        skip(); 
      } 
      return false;
    };  
    /**
     * getNextImage: calculates the next image depending on the direction
     * @param {Number} currentItem - where we are now
     * @param {Number} itemCount - how many frames are in the gallery
     * @param {String} dir - 'next' or 'prev'
     * @returns {Number} 
     * @name getNextImage
     * @function
     * @private
     */
    function getNextImage(currentItem, itemCount, dir){
        var index = 0;
        if (dir === 'next') {
            index = (currentItem === itemCount-1) ? 0 : currentItem+1;
        } else {
            index = (currentItem <= 0) ? itemCount-1 : currentItem-1;
        }   
        return index;
    };      
        
    /**
     * getGallery: returns a gallery by name
     * @param {String} id - name of gallery
     * @returns {object} FotoGallery 
     * @name getGallery
     * @function
     * @private
     */    
    function getGallery(_name){
        for (var i=0,j=galleries.length;i<j;i++) {
            if (galleries[i].name === _name) {
                return galleries[i];
            }
        }
        return null;
    };
    /**
     * removes all events from the galleries
     * @name destroy
     * @function
     * @private
     */ 
    function destroy(){
        for (var i=0,j=galleries.length;i<j;i++) {
            galleries[i].destroy();
        }   
        return galleries;
    };
    /**
     * skips to next image when a ad fails
     * because ads are loaded in advance, we flag it
     * @name skip
     * @param {Bool} skipnow - skip straight away or delay for the werbung?
     * @returns {Number} index of the item being skipped
     * @function
     * @private
     */ 
    function skip(skipnow){
        if (activeGallery) {
            if (true === skipnow) {
              var n = getNextImage(activeGallery.currentItem, activeGallery.itemCount, activeGallery.$gallery.data('direction'));
              activeGallery.skipTo(n);
              return activeGallery.currentItem;
            } else {
              activeGallery.skipNextAd = true;
              return activeGallery.currentAd;
            }
        }
        return 0;
    };
    /**
     * skips to next image
     * @name loadImage
     * @param {$Object} $img 
     * @returns {Number} 1 for loaded, 0 for error
     * @function
     * @private
     */ 
    function loadImage($item){
        if ($item && $item.length) {
            var $img = $item.find('img.photo'),
            imgSrc = $img.attr('longdesc');
            if (imgSrc !== null && imgSrc !== 'undefined') {
              $img[0].src = imgSrc;
              $item.data('loaded', true);
              $item.removeAttr('longdesc');
              return 1;   
            }
        }
        return 0; 
    };
    /**
     * init
     * @name init
     * @function
     * @private
     */ 
    function init($collection) {     
        if ($collection.length) {
            $collection.each(function() {
                // if the fotogallery has already been processed.. leave it alone!
                if ($(this).data('fg-name') && $(this).data('fg-name') !== 'undefined') {
                    return true;
                }
                galleries.push(new FotoGallery(this)); 
                
            });
            return true;   
        }  
        return false;
    };
    /**
     * Gallery constructor
     */
    
      function FotoGallery(elem){  
          // main gallery element
          this.$gallery = $(elem);
          this.name = (elem.id) ? elem.id : settings.idPrefix + new Date().getTime();
          // assign the name
          this.$gallery.data('fg-name', this.name);
          // assign the id
          this.$gallery.attr('id', this.name);
          // frames   
          this.$items = this.$gallery.find('li').not('.ad');
          
          // ad li
          this.$ads = this.$gallery.find('li.ad');
          // tracking els
          this.$trackingels = this.$gallery.find('li > span.hidden');
          this.$trackingels.css({
            'visibility' : 'hidden',
            'position' : 'absolute',
            'left' : '-9999px'
          });
          this.adsPresent = this.$ads.length ? true : false;
          this.adsLn = this.$ads.length;
          // get interval if specified in the element
          this.adInterval = this.$gallery.attr('data-ad-interval') || (function(){ 
               if (~elem.className.indexOf('data-ad-interval')) {
                  return parseInt(elem.className.match(/data\-ad\-interval\d+/)[0].replace(/data\-ad\-interval/, '')); 
               }
               return settings.adInterval;
              })();
        
          // skip next ad when the loading fails - set by skip()
          this.skipNextAd = false;
          // is the ad visible?
          this.adVisible = false;
          // can the user click on the arrow?
          // this is to stop over-clicking            
          this.canClick = true;
          // how many frames?
          this.itemCount = this.$items.length;
          // track the click count so we know when to show the ad
          this.clickCount = 0;
          
          // save the general direction in which we are clicking
          // we need this to track changes of direction
          this.direction = 'next';
          
          // first image should be rendered by the server
          this.itemsLoaded = 1;
          // which item is being shown?
          this.currentItem = this.$items.index(this.$items.filter('.active')) || 0;            
          // which ad is being shown?
          this.currentAd = 0;
          // are all the images loaded?
          this.allLoaded = false;
          // is the gallery in a lightbox
          this.inLightBox = (this.$gallery.parents('div.lightbox').length) ? true : false;
          this.setup();
          activeGallery = this;
          return this;
      
      };
       
        FotoGallery.prototype = {
            
            'setup' : function(){
                // set click events
                de.lib.live(this.$gallery, 'li a:not(.engage)', 'click', this.handler, {'_this':this});
                this.$imgElTitle = this.$gallery.find('div.imgElTitle').first();
                if (this.$imgElTitle.length) {
                    var _this = this;
                    this.$imgElTitle.find('a.enlarge').css('visibility','visible');
                    this.$imgElTitle.click(function(){
                        
                        var $this = $(this),
                        id = $this.closest('div.photoGallery').attr('id');
                        if (id) {
                            activeGallery = getGallery(id);
                        }
    
                    }).find('a.enlarge').click(function(e){
                        e.preventDefault();
                        var $this = $(this),
                        id = $this.closest('div.photoGallery').attr('id');
                        if (id) {
                            activeGallery = getGallery(id);
                        }
                        de.bild.community.ShowLightbox(this.href, 'GET', '', '', $this);
                    });
                    // only skip to the relevant foto when lightbox triggered by this element
                    saveStatus = true;
                } 
                // first one is always loaded!
                this.$items.eq(0).data('loaded', true);
                // if cookie information is available and the gallery is inside a lightbox
                if (this.inLightBox && saveStatus === true && activeGallery !== null && activeGallery !== 'undefined') {
                    this.preload(activeGallery.currentItem); 
                    this.skipTo(activeGallery.currentItem);
                } else {
                   this.preload(0);
                }
          
                return this;
            },
            //load image
            'load' : function(imgIndex){
                  var $img = this.$items.eq(imgIndex);
                  if ($img.length && !$img.data('loaded')) {
                      loadImage($img);
                      this.itemsLoaded++;
                  }
                  return this;
            },
            // preload next and previous images
            'preload' : function(imgIndex,dir){
                if (this.itemsLoaded >= this.itemCount) {
                    this.allLoaded = true;
                } else {
                  // double check if current item is loaded
                  this.load(imgIndex);
                  var nextIndex = getNextImage(imgIndex, this.itemCount, 'next'),
                  prevIndex = getNextImage(imgIndex, this.itemCount, 'prev');
                  // then get next  images for both directions
                  this.load(nextIndex);
                  this.load(prevIndex);
                  // and the one after that
                  if (dir === 'next') {
                    this.load(nextIndex+1);
                  } else {
                    this.load(prevIndex-1);
                  }
                }
                return this;
            },
            
            // deferred object ensures each step is carried out one after the other
            'showImage' : function(dir){
                var nextImage = getNextImage(this.currentItem, this.itemCount, dir),
                _this = this;
                 // load another set of images
                if (_this.allLoaded === false)  {
                  setTimeout(function(){
                     _this.preload(nextImage,dir);
                  },50);
                }
                   
                $.Deferred(function(dfd) {
                        dfd.pipe(function() {
 
                              // no fade for modile devices
                              // internet explorer still can't handle the fade
                              if (de.bild.utils.isMobile() || ($.browser.msie && $.browser.version <= 9))  {
                                _this.$items.eq(nextImage).css({
                                    'display' : 'block'
                                });
                                _this.$items.eq(_this.currentItem).css({
                                    'display' : 'none'
                                });
                                return nextImage;  
                              } else {
                                  // because of the layering, we need to tweak fade speeds for each direction
                                  var fadeinspeed = (dir === 'prev') ? 200 : 250,
                                  fadeoutspeed = (dir === 'prev') ? 250 : 200;
                                  // show next frame 
                                  _this.$items.eq(nextImage).fadeIn(fadeinspeed);
                                  // hide current
                                  return _this.$items.eq(_this.currentItem).fadeOut(fadeoutspeed, function(){
                                      _this.$items.removeClass('active');
                                  }); 
                              }
                        })
                        .pipe(function() { 
                             // set new current
                            _this.currentItem = nextImage;
                            // save direction
                            _this.direction = dir;
                            _this.$gallery.data('direction',dir);
                            // set as active
                            _this.$items.eq(_this.currentItem).addClass('active');
                            //tracking
                            _this.trackme(dir);
                        })
                }).resolve();
                return this;
            },
            // skips to nth image
            'skipTo' : function(n){
                 // set new current
                var $item = this.$items.eq(n);
                if ($item.length && !$item.hasClass('ad')) {
                    this.currentItem = n;
                    // save direction
                    this.$gallery.data('direction',this.direction);
                    // set as active
                    this.$items.css({
                        'display' : 'none'
                    }).removeClass('active');
                    
                    $item.css({
                        'display' : 'block'
                    }).addClass('active');
                } 
            },
           // click event handler
           // this === item clicked on
           // therefore we have to pass scope in data object
           'handler' : function(e){
                   var $this = $(this);                
                
                    if ($this.attr('href').length <= 1) {
                        e.preventDefault();
                        // have we allowed clicking?   
                        if (e.data._this.canClick === true) {
                            e.data._this.canClick = false;
                            // set active gallery 
                            activeGallery = e.data._this;
                                 
                            var dir = $this.hasClass('prev') || $this.parent().hasClass('prev') ? 'prev' : 'next';
        
                            if (e.data._this.adsPresent) {
                              if (e.data._this.adVisible) {
                                  e.data._this.toggleAd('off', dir);
                                  return;
                              }
                              
                              e.data._this.clickCount++;
                              // refresh ad one click before
                              var loadAdFrame = e.data._this.clickCount-e.data._this.adInterval;
                              if (loadAdFrame === (settings.frameBeforeAdToReload * -1)) {
                                  e.data._this.preloadAd();    
                              }
                              if (e.data._this.clickCount % e.data._this.adInterval === 0) {  
                                  e.data._this.toggleAd('on', dir);  
                                  e.data._this.clickCount = 0;        
                                  return;
                              }
                            }                   
                            $.when(e.data._this.showImage(dir))
                                .done(function(){   
                                     setTimeout(function(){
                                        e.data._this.canClick = true;
                                     },250);
                            }); 
                        }
                       
                    // if not a hash, we assume it's a normal url
                    // and then treat it as such
                    } else {
                        return true;
                    }
                    return this;
           },
           'preloadAd' : function() {
                var index = 0;
                if (this.currentAd >= 0 && this.currentAd <= this.adsLn-1) {
                  index = this.currentAd;
                } 
                var $ad = this.$ads.eq(index);
                refreshAd($ad); 
                return this;
           },
           'trackme' : function(dir){
                //tracking
                var $trackme = this.$items.eq(this.currentItem).find('span.'+dir);
                if ($trackme.length) {
                  setTimeout(function(){
                    $trackme.trigger('click');
                  },100);
                }
           },
            // show and hide the ad frame
            'toggleAd' : function(status, dir){
                var _this = this,
                index = 0;
                if (this.currentAd >= 0 && this.currentAd <= this.adsLn-1) {
                     index = this.currentAd;
                } else {
                    this.currentAd = 0;
                }
                if (this.skipNextAd === true) {
                    this.skipTo(getNextImage(this.currentItem, this.itemCount, dir));
                    this.skipNextAd = false;
                    this.adVisible = false;
                    this.currentAd++; 
                } else {
                  var $ad = _this.$ads.eq(index);
                  if (status === 'on') {
                      $ad.css({
                          'display' : 'block'
                      }).addClass('active');
                      
                      this.$items.css({
                          'display' : 'none'
                      }).removeClass('active');
        
                      this.adVisible = true;
                      this.$imgElTitle.find('a:not(.close)').hide();
                      // save direction
                      this.direction = dir;
                      
                  } else {
                      // if we were going forwards/backwards and want to keep going forwards/backwards
                      // a change of direction will return to the previous image
                      if ((_this.direction=== 'next' && dir === 'next') || (this.direction=== 'prev' && dir === 'prev')) {   
                          this.currentItem = getNextImage(this.currentItem, this.itemCount, dir);
                      }
                      $ad.css({
                          'display' : 'none'
                      }).removeClass('active');
                      
                      this.$items.eq(this.currentItem).css({
                          'display' : 'block'
                      }).addClass('active');
                      this.trackme(dir);
                      this.adVisible = false; 
                      this.currentAd++; 
                      this.$imgElTitle.find('a:not(.close)').show();
                  }
                }
                setTimeout(function(){
                  _this.canClick = true;
                },250);  
                return this;
            },
            
            'destroy' : function(){
                this.$gallery.undelegate('a', 'click', this.clickHandler);
                galleries = [];
                return this;
            }
            
        };
    
   // oeffentliches Interface
   // optional name for your gallery to identify it
    return {
       'init' : function($collection){
           if (!$collection) return false;
           return init($collection);
       },
       // kills all gallery events
       'destroy' : function(){
           return destroy();
       },
       //returns specific gallery
       'getGallery' : function(name){
           return getGallery(name);
       },
       //next/prev Bild auto-show
       // public to skip werbung
       'skip' : function(skipnow){
           skipnow = skipnow || false; 
           return skip(skipnow);
       },
       //returns all galleries
       'getCollection' : function(){
           return galleries;
       },
       'activeGallery' : function() {
        return activeGallery;
       }
    };
    
   
}(jQuery));