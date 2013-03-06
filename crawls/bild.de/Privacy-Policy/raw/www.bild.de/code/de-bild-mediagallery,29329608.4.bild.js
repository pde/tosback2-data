
/*de.bild.mediaGallery:29329608.4*/

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
                if(module.hasClass('fg')) {
                    var galleryModule = new MediaGallery(module);
                    moduleList.push(galleryModule);
                    galleryModule.setup();
                } else {
                    var galleryModule = new SimpleGallery(module);
                    moduleList.push(galleryModule);
                    galleryModule.setup();
                }
            }
        });
        return true;
    }
    /**
     * SimpleGallery Contructor
     * @param $domElem - {jQuery Object} representing the SimpleGallery, e.g. KTG
     * */
    function SimpleGallery( $domElem ) {
        if(!$domElem) {
            return false;
        }
        this.$container = $domElem;
        this.$elementList = this.$container.find('ul');
        this.$activeElement = this.$elementList.find('.active');
        this.initialHeight = this.$container.height();
        this.$footer = $domElem.find('.reference');
        this.$credits = this.$footer.find('.credit');
        this.$pageNr = this.$footer.find('.index');
        this.$headline = $domElem.siblings('.premium-icon').first();
        this.currentIndex = 0;
        this.listLength = 0;
        this.jsonUrl = this.$container.attr('data-json');
        this.startWithIndex = parseInt(this.$container.attr('data-start-index'), 10);
        this.clickDisable = false;
 
        this.jsonData = null;
 
    }
    
    
    
    SimpleGallery.prototype = {
                
        /** 1. Get the JSON Data and Parse It
         *  2. If Startindex set, then load it
         *  3. Otherwise preload neighbours of current image
         *  */
        
        'setup': function() {
            
            var _this = this;
                        
            /* Einzelbild? */
            if(this.jsonUrl === null || this.jsonUrl === undefined ) {
                 return false;
            }
            
            SandBox.setModuleInitialized(this.$container);
            
                            
            $.getJSON( this.jsonUrl )
            .done(function(response) {
                
                _this.jsonData = response;
                _this.assignVariables( _this.jsonData );
                
                _this.bindUiEvents();
                                                
                if( _this.startWithIndex ) {
                    _this.currentIndex = _this.startWithIndex;
                    _this.showImageNr(_this.currentIndex);
                } else {
                    _this.showIconIfPremium();
                }
            })
            .fail(function(){
                console.warn('SimpleGallery: Could not load or parse JSON for Gallery.');
            });
           
            this.setExpandableIfContentOverlong();
            
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
                
        
        
        /** Bind to user interaction */
        'bindUiEvents': function() {
                        
            var _this = this;
                        
            this.$container.find('.next').on(eventController.click, function(event) {
                var imgIndex = (_this.currentIndex  < _this.listLength - 1) ? _this.currentIndex + 1 : 0;
                _this.clickHandler(event, imgIndex);
                return true;
            });
            
            this.$container.find('.prev').on(eventController.click, function(event) {
                var imgIndex = (_this.currentIndex  === 0) ? _this.listLength - 1 : _this.currentIndex - 1;
                _this.clickHandler(event, imgIndex);
                return true;
            });
            
            
            
        },
        
        
        'assignVariables': function( jsonData ) {
            
            this.listLength = jsonData.elementList.length;
            this.jsonData.elementList[this.currentIndex].loaded = true;
                        
        },
        
        /** 1. Disable clicking
         *  2. Show the image
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
            
            _this.showImageNr( imgIndex );
            
        },
        'showIconIfPremium': function(){
            if(!this.$headline.length) {
                return false;
            }
            var $premiumDistinction = this.$activeElement.find('.js-pa');
            if(!$premiumDistinction.length) {
                return false;
            }
            var premiumClass = $premiumDistinction.attr('data-premiumClasses');
            if(premiumClass !== "" && premiumClass !== "hide") {
                this.$headline.addClass(premiumClass).removeClass("hide");
            } else {
                this.$headline.addClass("hide");
            }
        },
        
        
        'showImageNr': function(imgIndex) {
                        
            this.currentIndex = imgIndex;
            this.getElement(imgIndex);
           
        },
               
            
        
        'replaceContent': function( response ) {
            
            /* Required workaround for a proper <script> execution */
            var $temp = $('<div></div>');
            $temp.get(0).innerHTML = response;
            
            this.$activeElement.replaceWith( $temp.html() );
            this.$activeElement = this.$elementList.find('li').first().addClass( settings.activeClass );
            
            this.$credits.html( this.jsonData.elementList[this.currentIndex].credit );
            this.$pageNr.html( (this.currentIndex+1) + "&nbsp;/&nbsp;" + this.listLength );
            this.showIconIfPremium();
                        
        },
        
        
        'getElement': function( index ) {
            
            var _this = this;
            
            var url = this.jsonData.elementList[index].snipetUrl;
                        
            $.ajax({
                dataType: 'html',
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
        
    };
    
    
    
    /** Prototypal inheritance */
    MediaGallery.prototype = new SimpleGallery();
    MediaGallery.prototype.constructor = MediaGallery;
    
    
    
    /**
     * MediaGallery Contructor
     * @param $domElem - {jQuery Object} representing the MediaGallery
     * */
    function MediaGallery( $domElem ) {
        
        /* Call super constructor */
        SimpleGallery.call(this, $domElem);
        
        this.isFG = $domElem.hasClass('fg');
        this.$adContainer = this.$elementList.find('.ad');
        this.adIframe = this.$adContainer.find('iframe').get(0);
        this.adInterval = parseInt(this.$container.attr('data-ad-interval'), 10);
        this.preloadCount = parseInt(this.$container.attr('data-preload-count'), 10);
        
        this.adDisplayCounter = 0;
        this.adAvailable = false;
        this.displayingAd = false;
        
    }
        
    
    MediaGallery.prototype.setup = function() {
            
        var _this = this;
                    
        /* Einzelbild? */
        if(this.jsonUrl === null || this.jsonUrl === undefined ) {
             return false;
        }
        
        SandBox.setModuleInitialized(this.$container);
        
        this.checkMandatoryAttributes();
                        
        $.getJSON( this.jsonUrl )
        .done(function(response) {
            
            _this.jsonData = response;
            _this.assignVariables( _this.jsonData );
            
            _this.bindUiEvents();
                                            
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
                    
        
        this.setExpandableIfContentOverlong();
        
    };
    
        
    
    MediaGallery.prototype.checkMandatoryAttributes= function() {
        
        if( !this.adInterval || this.adInterval <= 1 ) {
            this.adInterval = settings.adInterval;
        }
        
    };
    
            
    
    MediaGallery.prototype.showAd = function() {
        
        this.displayingAd = true;
        this.$activeElement.removeClass( settings.activeClass );
        this.$adContainer.addClass( settings.activeClass );
        
        this.$credits.html("&nbsp;");
        this.$pageNr.html("&nbsp;");
        
        this.adDisplayCounter = 0;
        this.clickDisable = false;
        this.$container.trigger('mediaGallery.showAd');
    };
    
    /** Refresh the url */
    MediaGallery.prototype.preloadAd = function() {
        
        this.adAvailable = undefined;
        this.adIframe.src = this.jsonData.addUrl;
        
    };
    
    /* TODO! Set on preload */
    MediaGallery.prototype.setIframeLoadHandler = function() {
        
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
    };
    
    MediaGallery.prototype.hideAd = function() {
                    
        this.$adContainer.removeClass( settings.activeClass );
        this.$activeElement.addClass( settings.activeClass );
        
        //this.adIframe.src ="";
        this.displayingAd = false;
        
        this.$container.trigger('mediaGallery.hideAd');
    };
    
    /** Bind to user interaction */
    MediaGallery.prototype.bindUiEvents = function() {
                    
        var _this = this;
                    
        this.$container.find('.next').on(eventController.click, function(event) {
            var imgIndex = (_this.currentIndex  < _this.listLength - 1) ? _this.currentIndex + 1 : 0;
            _this.clickHandler(event, imgIndex);
            return true;
        });
        
        this.$container.find('.prev').on(eventController.click, function(event) {
            var imgIndex = (_this.currentIndex  === 0) ? _this.listLength - 1 : _this.currentIndex - 1;
            _this.clickHandler(event, imgIndex);
            return true;
        });
        
        /*this.$container.on('click.mediaGallery', 'li a', function(event) {
            
           
            if( $(this).attr('href') == '#' ) {
                event.preventDefault();
                event.stopPropagation();
                _this.$container.find('.next').trigger(eventController.click);
            }
            
        });*/

this.$container.on('click.mediaGallery', '.photo', function(event) {
       
       /* Prevent default behavior, if the image isn't hyperlinked and trigger "next" */
       if( $(this).closest('a').attr('href').length <= 1 ) {           
           event.preventDefault();
                    event.stopPropagation();                                
                    _this.$container.find('.next').trigger(eventController.click);
       }
    
   });
        
    };
    
    
    /** 1. Disable clicking
     *  2. If AdCounter reached the interval value, then display add, otherwise hide the add
     *  3. Show the image
     * @param event - click event
     * @param imgIndex - index of image, which will be displayed
     *  */
    MediaGallery.prototype.clickHandler = function( event, imgIndex ) {
        
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
        
    };
    
    /** 1. Increment the AdCounter
     *  2. Load the next image
     *  3. Preload neighbour images
     *  */
    MediaGallery.prototype.showImageNr = function(imgIndex) {
                    
        this.currentIndex = imgIndex;
        this.getElement(imgIndex);
        
        if(this.isFG) {
            this.adDisplayCounter++;
            this.preloadNeighbours( imgIndex, this.preloadCount );
        }
    };
    
    /**
     * Preloads the adjacent neighbours.
     *
     * @param {Int} index - image index, e.g. 0 for the first one in the list
     * @param {Int} nr - Number of neighbours, that should be preloaded recursivly
     *
     * */
    MediaGallery.prototype.preloadNeighbours = function( index, nr ) {
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
        
    };
    
    /** Preloads the corresponding image for the given index */
    MediaGallery.prototype.preloadContent = function( index ) {
                    
        if( this.jsonData.elementList[index].loaded ) {
            return false;
        }
            
        var imgObj = new Image();
        imgObj.onload = function() {
            imgObj = "";
        };
        imgObj.src = this.jsonData.elementList[index].imgUrl;
        
    };
   
        
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
        
    };
    
    
})(jQuery, de.bild.globalSandBox);