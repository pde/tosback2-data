
/*de.bild.slider:23283906.16*/

    var de = de || {};
    de.bild = de.bild || {};
/**
* @dependencies ['jquery', 'de.bild.utils']
*/
    de.bild.slider = (function($){
       
        var settings = {
            'slideContainer' : 'ul',        // Tag des Parentcontainers
            'scrollSpeed' : 25,
            'scrollDistance' : 5, 
            'speedTo' : 400, 
            'slideDelay' : 250,                   // Wie schnell? Kleinere Nummer = Schneller
            'scrollingClass' : 'scrolling', // Welche Klasse bekommt der Container beim Scrollen?
            'activeClass' : 'active',        // zeigt die Navigationspfeilen etc an
            'idPrefix' : 'slider-',
            'frameWidth' :  147,  // setting the width of each frame to 148
            'frameWidthHeadlines' : 208
        },
        sliders = [];
        function getLeftPos($elem){
            return parseInt($elem.css('left'));
        };  
        function destroy(){
            for (var i=0,j=sliders.length;i<j;i++) {
                sliders[i].destroy();
            }
            return sliders;
        };
        function init($collection) {     
            if ($collection.length) {
                $collection.each(function() {   
                    // if the slider has already been processed.. leave it alone!
                    if ($(this).data('slider-name') && $(this).data('slider-name') !== 'undefined') {
                        return true;
                    }       
                    sliders.push(new Slider(this));
                });   
            }  
            return true;
        };
       
       function Slider(elem){
            var _this = this, len, loaded = 0, $imgs;
            this.$slider = $(elem);  
            
            // get the name
            // assign the name and id
            this.name = (elem.id) ? elem.id : settings.idPrefix + new Date().getTime();
            this.$slider.data('slider-name', this.name).attr('id', this.name);
           
            this.$naviButtons = this.$slider.find('div.prev, div.next');
            // we preventdefault on the a tags to stop quick clickers
             this.$naviButtons.find('a').click(function(e){
                    e.preventDefault(); 
             });
            this.$slideContainer = this.$slider.find(settings.slideContainer);
            this.$container = this.$slider.find('div.atWrapper');
            // get widths and offsets
            this.frameMargin = parseInt(this.$slideContainer.find('li:first-child').css('margin-right'));
            this.indent = parseInt(this.$container.css('padding-left'));
            //this.containerWidth = this.$container.outerWidth(true);
            // store important values (left value and width of all elements)
            this.$slideContainer.x = 0;
            this.$slideContainer.width = 0;
            // store individual widths in an array
            this.frameWidths = [];
          // after settings.slideDelay of mousedown the slider will autoSlide
            this.startMouseDown = 0;
            // -1 = next, 1 = prev
            this.direction = -1;
            
            // the slider is moving in general
            this.sliding = false;
            // the slider is moving while the mouse is down
            this.autoSlide = false;
            // the slider is snapping into place
            this.snapping = false;
            $imgs = this.$slideContainer.find('li img.photo');
            len = $imgs.length;
            /* here we have to kickstart sliders that are loaded via ajax, that is after the window has loaded */
            if (de.bild.utils.windowhasLoaded() === true) {
                $imgs.each(function(){
                    this.onload = function(){
                        loaded = loaded + 1;
                        if (loaded >= len) {
                            _this.setup();
                        }
                    };
                });  
            } else { 
                this.setup();
            }
            return this;
       };
       
       Slider.prototype = {
            'setup' : function(){
       var _this = this, w, 
                /* temp while we have to set the widths with JS 
                at-headlines has bigger images than the others
                */
                frameWidth = (this.$slider.find('div.at-headlines').length > 0) ? settings.frameWidthHeadlines : settings.frameWidth;
                this.$slideContainer.children('li').each(function(){
                    /* temp fix so that we don't have to define the width in JS */
                    //w = this.offsetWidth + _this.frameMargin;
                    w = frameWidth + _this.frameMargin;
                    _this.$slideContainer.width += w;
                    _this.frameWidths.push(w); 
                });
                // this is essentially the number of children
                this.frameWidthsLen = this.frameWidths.length;
                // double the children for smooth repeat
                this.$slideContainer.css({
                    'width' : (this.$slideContainer.width*2)  + this.indent + 'px',
                    'left' : this.indent + 'px'
                });
                this.$slideContainer.append(this.$slideContainer.html());
             // Navigation buttons
             this.$naviButtons.mousedown(function(e){
                    e.preventDefault(); 
                    if ($(this).hasClass('next')) {
                        _this.direction = -1;
                    } else {
                        _this.direction = 1;
                    }
                    // allow click when no motion is detected
                    if (_this.sliding === false) {
                        _this.startMouseDown = new Date().getTime(); 
                        _this.start();     
                    } 
             })
       .mouseup(function(e){    
                    e.preventDefault(); 
                    // trigger a snap lock when the last one is finished
                    if (_this.snapping === false) {
                        _this.stop(true);
                    } 
       })
                .mouseout(function(e){
                    e.preventDefault(); 
                    // trigger a snap lock when the last one is finished
                    if (_this.snapping === false) {
                        _this.stop(true);
                    } 
                });
      },
            'snap' : function(){
                this.snapping=true;
                this.reset();
                this.$slideContainer.x = getLeftPos(this.$slideContainer);
                // because we have doubled the number of lis we have to check if we are at the 2nd set or the first
                // for the 2nd set we add the width of the 1st to the tmpLeft value
                var offsetX = (-this.$slideContainer.x >= this.$slideContainer.width) ? this.$slideContainer.width : 0,
                tmpLeft = -this.indent,
                i;
                for (i=0;i<this.frameWidthsLen;i++) {
                    tmpLeft += this.frameWidths[i];
                    // if direction is previous and the width addtion is greater or equal to current x position
                    // we add a pixel in the direction of the sliding to catch clicks < settings.slideDelay
                    if (tmpLeft+offsetX >= -this.$slideContainer.x - this.direction){
                        if (this.direction === 1) {
                            this.slideTo(-tmpLeft+this.frameWidths[i]-offsetX);        
                        } else {
                            this.slideTo(-tmpLeft-offsetX);
                        }
                        break;
                    } 
                }
                this.stop();
            },
            'reset' : function(){
                // check the left position of the slider while it's sliding
                if (this.sliding) {
                    this.$slideContainer.x = getLeftPos(this.$slideContainer);
                    // if direction is previous and the left value is greater than the start position
                    // bring the whole slider back to the middle point
                    if (this.direction === 1 && this.$slideContainer.x >= this.indent){
                        this.$slideContainer.css({
                            'left' : -1 * (this.$slideContainer.width - this.indent) + 'px'
                        });
                        return true;
                    // if direction is next and the left value is less than the start position
                    // bring the whole slider back to the start point
                    } else if (this.direction === -1 && this.$slideContainer.x <= (-1 * (this.$slideContainer.width - this.indent))) {
                        this.$slideContainer.css({
                            'left' : this.indent + 'px'
                        });
                        return true;
                    }
                }
                return false;
            },
            'start' : function(){
                // don't start another slide during a snap
                if (this.snapping === true) return false;
                var now, _this;
                // check if we need to reset at the start or end position of the slider
                this.reset();
                // check mousedown duration and start slide after delay
                now = new Date().getTime();     
                if (now - this.startMouseDown >= settings.slideDelay) {
                    this.autoSlide = true;
                }
                // a sliding action has been initiated   
                this.sliding = true;
                _this = this;
                if (this.slideTimeout) {
                  clearTimeout(this.slideTimeout);  
                } 
                this.slideTimeout = setTimeout(function(){
                    _this.slide('+=' + settings.scrollDistance * _this.direction);  
                },settings.scrollSpeed);
            },
            'stop' : function(snap){           
                // the snap request always comes from a stopping event (mouseout or mouseup)
                // we only want to snap if the thing is sliding
                if (snap === true && this.sliding === true && this.snapping===false) {
                    this.snap();
                    return;
                }
                // shut everything down
                this.sliding = false;
                this.autoSlide = false;
                if (this.slideTimeout) {
                  clearTimeout(this.slideTimeout);  
                } 
            },
            'slide' : function(x){
                // slide while autoSlide is true
                if (this.autoSlide) {
                    this.$slideContainer.css({
                     'left':x
                    });
                }
                // keep the loop going
                this.start();  
            },
            'slideTo' : function(x){
                var _this = this;
                // not good from a js perspective
                // makes the UX more responsive by allowing a second click a few ms before the end of a snap
                setTimeout(function(){
                    _this.snapping = false;
                },settings.speedTo/2);
                // animate to a point (used for a snap)
                this.$slideContainer.stop().animate({
                        'left':x
                    },settings.speedTo);
            },
      'destroy' : function(){
                this.$naviButtons.unbind('mousedown')
       .unbind('mouseout')
       .unbind('mouseup')
       .find('a')
       .unbind('click');
      } 
       };
       
        return {
           'init' : function($collection){
               if (!$collection) return false;
               return init($collection);
           },
           // kills all slider events
           'destroy' : function(){
               return destroy();
           },
           //returns all sliders
           'sliders' : function(){
               return sliders;
           }
        };
        
       
    }(jQuery)); 