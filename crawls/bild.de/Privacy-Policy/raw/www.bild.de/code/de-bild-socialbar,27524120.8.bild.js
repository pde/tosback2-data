
/*de.bild.socialBar:27524120.8*/




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
			return (new SocialBar( $domNodeLeft, $domNodeMiddle )).setup();
		}
			
        return false;		
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
        this.innerWrapperTopOffset = this.$innerWrapper.offset().top;
        
		this.positionFixed = false;
		this.currentPositionFixed = false; 
		this.scrollY = 0;
		
		this.$topElem = $(settings.topMinPosSelector).closest('header');
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
            
            if(this.$bottomElem.length === 0) {                
                this.$bottomElem = $(settings.topMaxPosFallbackElem);
            }
            
            if(this.$topElem.length === 0) {
                this.minTopDistance = settings.topOffset;
            }else {
                this.minTopDistance = this.$topElem.offset().top + this.$topElem.outerHeight(true) - this.innerWrapperTopOffset;
            }            
            
            this.maxTopDistance = this.$bottomElem.offset().top - this.$slidingContainer.height() + this.innerWrapperTopOffset;
            
            this.currentTopDistance = this.minTopDistance;
            
            if(this.isVisible) {
                this.repositionSlider();
            }
            
            
            /* Document may grow vertically on Window Load */
            $(window).load(function(){
                _this.setPositionValues();
            });     
            
        };
		
		
		this.switchSliderPositioning = function() {		    		       
		      
            if(!this.isVisible) {
                return false;
            }            
            
            /* Nothing changed */
            if(this.currentPositionFixed === this.positionFixed) {
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
                
                _this.checkAndUpdateSliderPosition();
                    
            });

        };
        
        
        this.checkAndUpdateSliderPosition = function(){
            
            this.scrollY =  this.$window.scrollTop();

            /* Set position fixed */
            if( this.scrollY > this.minTopDistance - settings.fixedTopMargin + this.innerWrapperTopOffset ) {
                this.positionFixed = true;                   
            }
            /* Minima reached, remove fixed position */
            if( this.scrollY < this.minTopDistance - settings.fixedTopMargin + this.innerWrapperTopOffset ) {
                this.positionFixed = false;
                this.currentTopDistance =  this.minTopDistance;                
            }
            /* Maxima reached, remove fixed position */
            if( this.scrollY >= this.maxTopDistance - settings.fixedTopMargin + this.innerWrapperTopOffset ) {
                this.positionFixed = false;
                this.currentTopDistance = this.maxTopDistance;
            }
                            
            this.switchSliderPositioning();
        };
		
		
	}
		
	
		
	return {
		
		'init': function( $domNode ) {
			return init($domNode);
		}
		
	}
	
	

})(jQuery, de.bild.globalSandBox);
