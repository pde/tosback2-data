
/*de.bild.mediaGallery:25425048.11*/

var de = de || {};
de.bild = de.bild || {};
de.bild.mediaGallery = (function($, SandBox) {
 var moduleList = [],
  settings = {
   'activeClass' : 'active',
   'adInterval' : 2,
   'preloadCount' : '2',
   'preload': true,
   'footerHeight' : 3
  };
 
 
 var eventController = null;
 
 $.subscribe( 'domNodeRemoved', function(){
        moduleList = SandBox.removeDeletedElements( moduleList );
    });
 
 function init( $collection ) {
  
        if(!eventController) {
            eventController = SandBox.getActionEvents('mediaGallery'); 
        } 
    
  $collection.each(function() {   
   var module = $(this);
   if( !module.hasClass('solo') && !SandBox.moduleIsInitialized(module) ) {
    moduleList.push( new MediaGallery( module ) );
   }      
  });  
        return true;  
 }
 
 
 
 /**
  * MediaGallery Contructor
  * @param $domElem - {jQuery Object} representing the MediaGallery
  * */
 function MediaGallery( $domElem ) {
  
  this.$container = $domElem;
  
  this.isFG = $domElem.hasClass('fg');
          
  this.$elementList = this.$container.find('ul');
  this.$activeElement = this.$elementList.find('.active');
  
  this.initialHeight = this.$container.height();
  
  this.$footer = $domElem.find('.reference');
  this.$credits = this.$footer.find('.credit');
  this.$pageNr = this.$footer.find('.index');
  
  this.currentIndex = 0;  
  this.listLength = 0;
  this.jsonUrl = this.$container.attr('data-json');
  this.startWithIndex = parseInt(this.$container.attr('data-start-index'));  
  
  this.$adContainer = this.$elementList.find('.ad');
  this.adIframe = this.$adContainer.find('iframe').get(0);
  this.adInterval = parseInt(this.$container.attr('data-ad-interval'));
  this.preloadCount = parseInt(this.$container.attr('data-preload-count'));
  
  this.adDisplayCounter = 0;
  this.adAvailable = false;
  this.displayingAd = false;
    
  this.clickDisable = false;
  
  this.jsonData = null;  
    
  this.setup();
  
 }
  
 
 MediaGallery.prototype = {
  
  
  /** 1. Get the JSON Data and Parse It
   *  2. If Startindex set, then load it
   *  3. Otherwise preload neighbours of current image
   *  */
  
  'setup': function() {
   
   var _this = this;
      
   /* Einzelbild? */
   if(this.jsonUrl === null || this.jsonUrl === undefined ) {
                 //console.warn('MediaGallery: data-json attribute missing.');
                 return false;
            }
   
   this.checkMandatoryAttributes();
               
   this.bindUiEvents();
       
   $.getJSON( this.jsonUrl )
   .done(function(response) {
    
    _this.jsonData = response;    
    _this.assignVariables( _this.jsonData );
            
    if( _this.startWithIndex ) {     
     _this.currentIndex = _this.startWithIndex;
    } 
    if(_this.isFG) {     
     _this.preloadNeighbours( _this.currentIndex, _this.preloadCount );
     _this.setIframeLoadHandler();
    }   
   })
   .fail(function(){
       console.warn('MediaGallery: Could not load or parse JSON for Gallery.');
   });
      
   SandBox.setModuleInitialized(this.$container);   
   this.setExpandableIfContentOverlong();
   
  },
  
   
  
  'checkMandatoryAttributes': function() {
   
   if( !this.adInterval || this.adInterval <= 1 ) {
       this.adInterval = settings.adInterval;
   }
   
  },
  
  /** 
   * Changes the gallery footer appearance, depending on total height.
   * Binds to image load events, because the height may change when images are fully loaded. 
   * 
   * */
  'setExpandableIfContentOverlong': function() {
      var _this = this;
      
      if(this.isSpecialCase()) {          
          this.$footer.addClass('na');
          return true;
      }
      
      var $imgTag = this.$activeElement.find('img');
      $imgTag.on('load', function() {
          _this.setExpandableIfContentOverlong();
      });
      if( this.$activeElement.outerHeight() + settings.footerHeight > this.initialHeight ) {
          this.$footer.removeClass('na');
      } else {
          this.$footer.addClass('na');
      }
      
  },
  
  'isSpecialCase': function(){
      
      return this.$activeElement.find('blockquote').length > 0;
      
  },
    
  
  'showAd': function() {   
   
   this.displayingAd = true;
   this.$activeElement.removeClass( settings.activeClass );
   this.$adContainer.addClass( settings.activeClass );
   
            this.$credits.html("&nbsp;");
            this.$pageNr.html("&nbsp;");
   
   this.adDisplayCounter = 0;
   this.clickDisable = false;
   this.$container.trigger('mediaGallery.showAd');
   
  },
  
  /** Refresh the url */
  'preloadAd': function() {
   
   this.adAvailable = undefined;
   this.adIframe.src = this.jsonData.addUrl;
   
  },
  
  /* TODO! Set on preload */
  'setIframeLoadHandler' : function() {
   
   var _this = this;
   var iframeDoc;
   
   $(_this.adIframe).on('load',function() {
    iframeDoc = (this.contentWindow || this.contentDocument);
    if(!!iframeDoc && iframeDoc.sas_noad === false) {
     _this.adAvailable = true;
    } else {
     _this.adAvailable = false;
    }  
   });
  },
  
  'hideAd': function() {
      
   this.$adContainer.removeClass( settings.activeClass );
   this.$activeElement.addClass( settings.activeClass );
   
   //this.adIframe.src ="";
   this.displayingAd = false;
   
   this.$container.trigger('mediaGallery.hideAd');
  },
  
  /** Bind to user interaction */  
  'bindUiEvents': function() {
      
   var _this = this;
      
   this.$container.find('.next').on(eventController.click, function(event) {    
    var imgIndex = (_this.currentIndex  < _this.listLength - 1) ? _this.currentIndex + 1 : 0;        
    _this.clickHandler(event, imgIndex);            
    return true;    
   });
   
   this.$container.find('.prev').on(eventController.click, function(event) {        
    var imgIndex = (_this.currentIndex  == 0) ? _this.listLength - 1 : _this.currentIndex - 1;    
    _this.clickHandler(event, imgIndex);            
    return true;    
   });
   
   this.$container.on('click.mediaGallery', '.photo', function(event) {
       
       /* Prevent default behavior, if the image isn't hyperlinked and trigger "next" */
       if( $(this).closest('a').attr('href').length <= 1 ) {           
           event.preventDefault();
                    event.stopPropagation();                                
                    _this.$container.find('.next').trigger(eventController.click);
       }
    
   });     
   
  },
  
  
  'assignVariables': function( jsonData ) {
   
   this.listLength = jsonData.elementList.length;   
   this.jsonData.elementList[this.currentIndex].loaded = true;
      
  },
  
  /** 1. Disable clicking
   *  2. If AdCounter reached the interval value, then display add, otherwise hide the add
   *  3. Show the image
   * @param event - click event
   * @param imgIndex - index of image, which will be displayed
   *  */
  'clickHandler': function( event, imgIndex ) {
   
   var _this = this;
   
   event.preventDefault();
   event.stopPropagation();
   
   if(_this.clickDisable) {
    return false;
   }   
   _this.clickDisable = true;
   
   if(this.isFG) {
       /* Preload Ad */
    if( _this.adDisplayCounter == (_this.adInterval - 1) ) {
     _this.preloadAd();
    }
    /* Show Ad, if AdInterval reached and there is actually an Ad to display */ 
    else if( _this.adDisplayCounter == _this.adInterval && ( _this.adAvailable || _this.adAvailable === undefined ) ) {
     _this.showAd();
     return false;
    } 
    /* No Ad available, reset the ad click counter */
    else if( _this.adDisplayCounter == _this.adInterval && !_this.adAvailable ) {     
     _this.adDisplayCounter = 0;
    }
    /* Hide Ad */
    else if( this.displayingAd ) {     
     _this.hideAd();
    }    
   }
   
   _this.showImageNr( imgIndex );
   
  },
  
  /** 1. Increment the AdCounter
   *  2. Load the next image
   *  3. Preload neighbour images
   *  */
  'showImageNr': function(imgIndex) {
      
   this.currentIndex = imgIndex;   
   this.getElement(imgIndex);
   
   if(this.isFG) {   
    this.adDisplayCounter++;    
    this.preloadNeighbours( imgIndex, this.preloadCount );
   }   
  },
  
  /**
   * Preloads the adjacent neighbours.
   * 
   * @param {Int} index - image index, e.g. 0 for the first one in the list
   * @param {Int} nr - Number of neighbours, that should be preloaded recursivly
   * 
   * */
  'preloadNeighbours': function( index, nr ) {
   if( nr <= 0) {
    return false;
   }
   
   /* preload left node */
   var leftIndex = (index === 0) ? leftIndex = this.listLength - 1 :  index - 1;   
   this.preloadContent( leftIndex );
   
   /* preload right node */
   var rightIndex = (index == this.listLength - 1) ? rightIndex = 0 :  index + 1;      
   this.preloadContent( rightIndex );   
         
   /* recursive call */
   this.preloadNeighbours( leftIndex, (nr - 1) );
   this.preloadNeighbours( rightIndex, (nr - 1) );
   
  },
  
  /** Preloads the corresponding image for the given index */
  'preloadContent': function( index ) {
      
   if( this.jsonData.elementList[index].loaded ) {
    return false;
   }
    
   var imgObj = new Image();
   imgObj.onload = function() {
    imgObj = "";
   };
   imgObj.src = this.jsonData.elementList[index].imgUrl;
   
  }, 
   
  
  'replaceContent': function( response ) {
   
   /* Required workaround for a proper <script> execution */   
   var $temp = $('<div></div>');
   $temp.get(0).innerHTML = response;
   
   this.$activeElement.replaceWith( $temp.html() );   
   this.$activeElement = this.$elementList.find('li').first().addClass('active');
   
   this.$credits.html( this.jsonData.elementList[this.currentIndex].credit );
   this.$pageNr.html( (this.currentIndex+1) + "&nbsp;/&nbsp;" + this.listLength );
      
  },
  
  
  'getElement': function( index ) {
   
   var _this = this;
   
   var url = this.jsonData.elementList[index].snipetUrl;
      
   $.ajax({
       dataType: 'text',
       url: url
   })
   .done(function(response) {
                    _this.replaceContent( response );
                    _this.setExpandableIfContentOverlong();
                    _this.clickDisable = false;
                })
   .fail(function() {
                    _this.clickDisable = false;
                });
   
    
   
  }
  
 }
  
 return {
  
  'init': function( $collection ) {
   return init($collection);
  },
  'getModuleList': function() {
   return moduleList;
  },
  'setCurrentIndex': function(fgallery, index) {
   fgallery.showImageNr(index);
  }
  
 }
 
 
})(jQuery, de.bild.globalSandBox);