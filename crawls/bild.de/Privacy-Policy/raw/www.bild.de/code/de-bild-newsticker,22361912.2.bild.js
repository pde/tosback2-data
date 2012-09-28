
/*de.bild.newsTicker:22361912.2*/

var de = de || {};
de.bild = de.bild || {};
de.bild.newsTicker = (function($){
    
    var settings = {
        'klappButtonSelector' : 'a.ntarrow',
        'ntClass5z' : 'message-ticker',
        'ntClass3z' : 'nticker',
        'ntClass1z' : 'show-news',
        'klappDelay' : 1000,
        'rotateDelay' : 5000,
        'visibleLis' : 3,
        'canRotate' : false,     
        'activeClass' : 'nticker-active',
        'hideClass' : 'hide'
    },
    
    newstickers = [];
    function destroy(){
        for (var i=0,j=newstickers.length;i<j;i++) {
            newstickers[i].destroy();
        }  
        return newstickers;
    };
        
    function init($collection) {     
        if ($collection.length) {
            $collection.each(function() {  
                if ($(this).hasClass(settings.ntClass1z)){
                   newstickers.push(new NewsTickerShowNews(this));
                }else {
                    newstickers.push(new NewsTicker(this))
                }       
            });   
        }  
        return true;
    };
    
    /**
     * There are two types of News Ticker, that behave differently.
     */
    function NewsTicker(elem){
        this.$newsticker = $(elem);
          
        if (this.$newsticker.hasClass(settings.ntClass5z)) {
            this.visibleLis = 5;
        } else if (this.$newsticker.closest('div.ls11-3').length > 0){
            this.visibleLis = 4;
        } else {
            this.visibleLis = 3;
        }
    
        
        this.$lis = this.$newsticker.find('ul').not('.ressort').children('li');
        this.lisCount = this.$lis.length;
        this.$openCloseButton = this.$newsticker.find(settings.klappButtonSelector);
        
        // wie viel muessen wir in die Liste durchrotieren?
        // die gesamte Anzahl der Elemente geteilt durch die erlaubte Anzahl der Elemente minus 1, weil die erste Drei sind schon angezeigt
        this.rotateLimit = ~~(this.lisCount/this.visibleLis);
        // wir sind schon am Anfang, das zaehlt als eine Rotation
        this.rotateCount = 1;
        // die setTimeoutvariables
        this.klappMich = null;
        this.rotateDelay = settings.rotateDelay;
        this.canRotate = settings.canrotate;
        this.rotating = false;
        this.rotateTimeout = null;
        this.startpoint = 0;
        this.endpoint = this.visibleLis;
        // rotation erforderlich? Default ueberschreiben
        // Daten-Attributen: wir breiten uns darauf vor
        var dataAttr = this.$newsticker.attr('data-bild-delay') || (function(){ 
           if (~elem.className.indexOf('ntrotation')) return elem.className.match(/ntrotation\d+/)[0].replace(/ntrotation/, '')*1000; 
        })();
        if (dataAttr) {
            this.rotateDelay = dataAttr;
            this.canRotate = true; 
        }
        this.setup();
        return this;
    };
    
    NewsTicker.prototype = {
        'setup' : function(){
            var _this = this;
            this.$newsticker.mouseover(function(){
                clearTimeout(_this.klappMich);
                _this.stopRotate();
            })
            .mouseout(function(){
                if (_this.$newsticker.hasClass(settings.activeClass)) {
                    _this.klappMich = setTimeout(function(){
                        _this.close();
                        _this.startRotate();
                    },settings.klappDelay);
                } else {
                    _this.startRotate();
                } 
            });
            
            this.$openCloseButton.click(function(e){
                e.preventDefault();
                _this.$newsticker.hasClass(settings.activeClass) ? _this.close() : _this.open();
            }); 
            
            this.canRotate && this.startRotate();
            return this;
        },
        'rotate' :function(){
            if (!this.rotating) return;
            var _this = this;
            this.rotateTimeout = setTimeout(function(){
                // only do the animation if in viewport
                if (de.bild.utils.inViewport(_this.$newsticker) !== 0) {
                    _this.showNext();
                }
                _this.rotating = false;
                _this.startRotate();
            },settings.rotateDelay); 
            return this;
        },
        
        'startRotate' : function(){
            if (this.canRotate === true) {
                if (this.rotating) return;
                this.rotating = true;
                // trigger setTimeout
                this.rotate();
            }
            return this;
        },
        'stopRotate' : function(){
            this.rotating = false;
            if (this.rotateTimeout) clearTimeout(this.rotateTimeout);
            return this;
        },
        
        'showNext' : function(){
            if (this.$newsticker.hasClass(settings.activeClass)) {
                this.stopRotate();
                return;
            }
            this.hideLis();                
            // hier schuetzen wir uns vor einer ungenauen Anzahl von Elementen, bzw eine Liste, die sich nicht sauber durch options.visibleLis teilen lässt
            if (this.rotateCount === this.rotateLimit) {
                this.startpoint = this.rotateCount = 0;
                this.endpoint = this.visibleLis;
            } else {
                this.startpoint+=this.visibleLis;
                this.endpoint+=this.visibleLis;
                
            }
            this.$lis.slice(this.startpoint,this.endpoint).removeClass(settings.hideClass);
            this.rotateCount++;
            return this;
        },
        'open' : function(){
            this.stopRotate();
            this.showLis();
            this.$newsticker.addClass(settings.activeClass);
            this.$openCloseButton.html(de.bild.settings.lang.shut);
            return this;
        },  
        'close' : function(){
            this.hideLis();
            this.$lis.slice(this.startpoint,this.endpoint).removeClass(settings.hideClass);
            this.$newsticker.removeClass(settings.activeClass);
            this.$openCloseButton.html(de.bild.settings.lang.more);
            return this;
        },
        'showLis' : function(){
            this.rotateCount = 1;
            this.startpoint = 0;
            this.endpoint = this.visibleLis;
            this.$lis.removeClass(settings.hideClass);
            return this;
        },
        'hideLis' : function(){
            this.$lis.addClass(settings.hideClass);
            return this;
        },   
        'destroy' : function(){
            this.$newsticker.unbind('mouseover')
            .unbind('mouseout');
            this.$openCloseButton.unbind('click');
            clearTimeout(this.klappMich);
            return this;
        }
    };
    function NewsTickerShowNews(elem){
        this.$newsticker = $(elem);
        
        var $ntUl = this.$newsticker.children('ul').first();
        
        this.$ntUlKids = $ntUl.children('li');
        
        this.size = this.$ntUlKids.size();
        
        
        this.tickerTimer = null;
        
        // Zeit auslesen
        this.time = this.$newsticker.attr('class').match(/ntrotation\d+/);
        
        this.setup();
        return this;
        
    };
    
    NewsTickerShowNews.prototype = {
        'setup' : function(){   
            var _this = this;   
            if(this.time) {
                this.time = this.time.toString();
                this.time = this.time.charAt(this.time.length - 1) * 1000;
                this.tickerTimer = setInterval(function(){
                        _this.next();
                    }, _this.time);
            } else {
                this.time = 0
            }
            // Alle bis auf erstes Verstecken
            this.$ntUlKids.hide().first().show();
    
    
            // Vorherige News Button
           this.$newsticker.children('a').click(function(e) {
                _this.stop();  
                if ($(this).hasClass('prev')) {
                    _this.prev();
                } else {
                    _this.next();
                }
                e.preventDefault();
            });
            
    
            
            // Rotation nur, wenn Mauszeiger nicht über dem Newsticker
            this.$newsticker.hover(
                function() {
                    _this.stop();
                },
                function() {
                    if (_this.time > 0) {
                        _this.start();
                    }
                }
            );
            return this;
    
        },
        'start' : function(){
            var _this = this;
            this.tickerTimer = setTimeout(function(){
                _this.rotate();
            }, this.time);  
        },
        'stop' : function(){
            if (this.tickerTimer) clearTimeout(this.tickerTimer);
        },
        'rotate' : function(){
            this.stop();
            this.next();
            this.start();
        },
        'next' : function(){
            // only do the animation if in viewport
            if (de.bild.utils.inViewport(this.$newsticker) === 0) {
                return this;
            } 
            var liIndex = this.$ntUlKids.filter('li:visible').index();
            (liIndex < this.size - 1) ? this.$ntUlKids.eq(liIndex).hide().end().eq(liIndex + 1).show() : this.$ntUlKids.last().hide().end().first().show();
            return this;
        },
        'prev' : function(){
             var liIndex = this.$ntUlKids.filter('li:visible').index();
             (liIndex > 0) ? this.$ntUlKids.eq(liIndex).hide().end().eq(liIndex - 1).show() : this.$ntUlKids.first().hide().end().last().show(); 
             return this;
        },
        'destroy' : function(){
            this.$newsticker.children('a').unbind('click');
            this.$newsticker.unbind('hover');
            this.stop();
            return this;
        }
    };
    // oeffentliches Interface
    return {
       'init' : function($collection){
           if (!$collection) return false;
           return init($collection);
       },
       // kills all gallery events
       'destroy' : function(){
           return destroy();
       },
       //returns all galleries
       'newstickers' : function(){
           return newstickers;
       }
    };
    
})(jQuery);