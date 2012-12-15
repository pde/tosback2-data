
/*de.bild.socialBar:27524120.6*/

var de = de || {};
de.bild = de.bild || {};
de.bild.socialBar = (function($, SandBox) {
  
 var settings = {     
         'topOffset': -9999,
            'alwaysVisible': true,
            'calculatePosByElement' : true,
            'topMinPosSelector': '#cover',
            'topMaxPosSelector': '.recommend',
            'topMaxPosFallbackElem': 'footer',
            'innerWrapper': '#innerWrapper',
            'minWindowWidth': 1431,
            'fixedTopMargin' : 40,
            'lightboxInnerContainer' : '.innerBox',
            'minTopOffset': 380
 };
 
 /**
  * Factory method. Initializes both DOM Objects representing the social bar.
  * 
  * */
 function init( $socialBarLeftAndMiddle ) {
     
     var $domNodeLeft = $socialBarLeftAndMiddle.filter('.flank');
     var $domNodeMiddle = $socialBarLeftAndMiddle.filter(':not(.flank)');
        
  if( !SandBox.moduleIsInitialized($domNodeLeft, $domNodeMiddle) ) {
      setupContributeForms( $('body') );
   return (new SocialBar( $domNodeLeft, $domNodeMiddle )).setup();
  }
   
        return false;  
 }
 
 
 
 
 
 
 function setupContributeForms( $context ) {       
        
        $context.on('submit', '.socialform', function(event){
            
            event.preventDefault();
            
            var $this = $(this);
            var params = $this.serialize();            
            var $innerBox = $this.closest(settings.lightboxInnerContainer);            
            
            $.ajax({
                'url' : $this.attr('action'),
                'dataType' : 'html',
                'data' : params,
                'type' : 'POST',
                'timeout' : 5000
            })
            .done(function(response) {
                
                $innerBox.html(response);                
                var $secondForm = $innerBox.find('#hint-confirm');              
                
                if($secondForm.length === 0) {
                    return false;
                }
                                                
                $secondForm.on('submit', function(e) {
                    e.preventDefault();
                    if($body.data('bildLightbox')) {
                        $body.data('bildLightbox').close();
                    }
                });                
                
            })
            .fail(function() {
                
                console.error('CForm-LB: Form Submit failed!');
                
                if($body.data('bildLightbox')) {
                    $body.data('bildLightbox').close();
                }
            });            
            
        });        
        
    }
 
 
 
 
 
 
 
 
 
 
 /**
  * socialBar "Class", without prototype
  * @param $domNodeLeft - {jQuery Object} representing the sliding socialBar on the left side
  * @param $domNodeMiddle - {jQuery Object} representing the middle socialBar which is fixed in article body 
  * */
 function SocialBar( $domNodeLeft, $domNodeMiddle ) {
  this.$slidingContainer = $domNodeLeft;
  this.$middleContainer = $domNodeMiddle;
   
  this.$window = $(window); 
  this.sliderWidth = this.$slidingContainer.width() + 1;
     
        this.isVisible = this.$window.width() > settings.minWindowWidth;
        this.minTopDistance = settings.minTopOffset;
        this.maxTopDistance = 0;
        this.currentTopDistance = 0;
        
        this.leftOffset = 0;
        this.$innerWrapper = $(settings.innerWrapper);
        
  this.positionFixed = false;
  this.currentPositionFixed = false; 
  this.scrollY = 0;
  
  this.$bottomElem = $(settings.topMaxPosSelector);
  
  /**
   * Setup Method. If fireplace Ad is available, removes the sliding social bar from DOM and sets the middle social bar fixed.
   * Otherwise sets all required listeners and positions the social bar correctly.
   * */
  this.setup = function() {
      
      if(this.hasFireplaceAd() || (jQuery.browser.msie && parseInt($.browser.version, 10) <= 8)) {
          
          this.$slidingContainer.remove();
          this.$middleContainer.css({
              'display':'block',
              'position':'relative',
              'top':'0'
          }).show();
              
                SandBox.setModuleInitialized(this.$middleContainer);
                
                return true;
          
      }
                  
            this.leftOffset = -this.sliderWidth;
            this.$slidingContainer.css('left', this.leftOffset+'px');
            
            this.$slidingContainer.show();
            
            this.setPositionValues();
                        
            this.bindUiEvents();
            
            SandBox.setModuleInitialized(this.$slidingContainer);     
            SandBox.setModuleInitialized(this.$middleContainer);
      
  };
  
  
  this.hasFireplaceAd = function(){
      if(window.hasFireplaceAd) {
          return true;
      }
      return false;
  };
  
  
  /**
   * Set initial minima, maxima position values for the sliding social bar 
   * 
   * */
  this.setPositionValues = function() {
            
            var _this = this;
                
            var $topElem = $(settings.topMinPosSelector);            
            
            if(this.$bottomElem.length === 0) {                
                this.$bottomElem = $(settings.topMaxPosFallbackElem);
            }
            
            //this.minTopDistance = $topElem.offset().top + $topElem.outerHeight(true);
            this.maxTopDistance = this.$bottomElem.offset().top - this.$slidingContainer.height();
            
            this.currentTopDistance = this.minTopDistance;
            
            /* Document may grow vertically on Window Load */
            $(window).load(function(){                  
                _this.maxTopDistance = _this.$bottomElem.offset().top - _this.$slidingContainer.height();  
            });            
            
        };
  
  
  this.switchSliderPositioning = function() {               
        
            if(!this.isVisible) {
                return false;
            }            
            
            /* Nothing changed */
            if(this.currentPositionFixed == this.positionFixed) {
                return false;
            }
                        
            this.repositionSlider();
      
  };
  
  /**   
   * Sets the correct CSS if slider position switches between fixed or absolute
   *  
   * */
  this.repositionSlider = function(){
      
      if(this.positionFixed) {
                this.leftOffset = this.$innerWrapper.offset().left - this.sliderWidth;
                this.$slidingContainer.css({
                    'position': 'fixed',
                    'left': this.leftOffset+'px',
                    'top': settings.fixedTopMargin+'px'
                });
                this.currentPositionFixed = true;
            } else {
                this.leftOffset = -this.sliderWidth;
                this.$slidingContainer.css({
                    'position': 'absolute',
                    'left': this.leftOffset+'px',
                    'top': this.currentTopDistance+'px'
                });
                this.currentPositionFixed = false;
            }
      
  };
  
  
  
  this.setupJumpToComments = function(){
      
      $(settings.innerWrapper).on('click', '.social-sharing .likes', function(event){
          event.preventDefault();
          var $targetBlock = $('section.board');
          if($targetBlock.length === 0) {
              $targetBlock = $(settings.topMaxPosSelector);
          }
          window.scrollTo(0, $targetBlock.offset().top);
      });
      
  };
  
  
  this.bindUiEvents = function() {
      
      var _this = this;
      
      this.setupJumpToComments();
      
  
            this.$window.on('resize.socialBar', function(){
                                
                /* window is smaller than minWindowwith and slidingbar is already hidden */
                if( _this.$window.width() < settings.minWindowWidth && !_this.isVisible ) {
                    return false;
                }
                
                /* hide or show the slider, depending on window width */
                if( _this.$window.width() < settings.minWindowWidth && _this.isVisible ) {
                    _this.$slidingContainer.hide();
                    _this.isVisible = false;
                } else if( !_this.isVisible ) {
                    _this.isVisible = true;
                    _this.$slidingContainer.show();
                    
                } else {
                    _this.repositionSlider();
                }
            });
            
            
            this.$window.scroll(function(){
                
                if( !_this.isVisible ) {
                    return false;
                }
                                    
                _this.scrollY =  $(this).scrollTop();
                /* Set position fixed */
                if( _this.scrollY > _this.minTopDistance ) {
                    _this.positionFixed = true;                   
                }
                /* Minima reached, remove fixed position */
                if( _this.scrollY < _this.minTopDistance ) {
                    _this.positionFixed = false;
                    _this.currentTopDistance =  _this.minTopDistance;                    
                }
                /* Maxima reached, remove fixed position */
                if( _this.scrollY >= _this.maxTopDistance ) {
                    _this.positionFixed = false;
                    _this.currentTopDistance =  _this.maxTopDistance;
                }
                                
                _this.switchSliderPositioning();
                    
            });
        };
  
  
 }
  
 
  
 return {
  
  'init': function( $domNode ) {
   return init($domNode);
  }
  
 }
 
 
})(jQuery, de.bild.globalSandBox);