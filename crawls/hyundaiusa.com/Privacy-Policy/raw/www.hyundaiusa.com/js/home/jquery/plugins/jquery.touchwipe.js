/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.0 (15th July 2010)
 */
(function($) { 
   $.fn.touchwipe = function(settings) {
     var config = {
            direction: 'h',
            min_move_y: 20,
    		min_move_x: 20,
 			wipeLeft: function() {  },
 			wipeRight: function() {  },
 			wipeTop: function() {  },
 			wipeBottom: function() {  },
			preventDefaultEvents: true,
			checkMoving: false,
			checkMinMove: false,
			e: {}
	 };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
    	 var startX, startY;
		 var isMoving = false;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startX = null;
    		 startY = null;
    		 isMoving = false;
    	 }
    	 
    	 function onTouchMove(e) {
    	     config.e = e;
    		 if(config.preventDefaultEvents) {
    			 e.preventDefault();
    		 }
    		 
    		 if (config.checkMoving) {
    		    if (!isMoving) {
    		        return;
    		    }
    		 }
    		 
    		 //if(isMoving ) {
    		    if (config.direction == 'h') {
    		    
                    var x = e.touches[0].pageX;
                    var dx = startX - x;
                    
                    if(Math.abs(dx) >= config.min_move_x || !config.checkMinMove) {
                        cancelTouch();
                        if(dx > 0) {
                            config.wipeLeft();
                        }
                        else {
                            config.wipeRight();
                        }
                    }
                    startX = x;
	    		 
	    		 
    		    } else {
    		        var y = e.touches[0].pageY;
                    var dy = startY - y;
                    if(Math.abs(dy) >= config.min_move_y || !config.checkMinMove) {
                        cancelTouch();
                        if(dy > 0) {
                            config.wipeTop();
                        }
                        else {
                            config.wipeBottom();
                        }
                    }
                    startY = y;
                    
                    
    		    }
	    		 
    		 //}
    	 }
    	 
    	 function onTouchStart(e)
    	 {
    	     config.e = e;
    		 if (e.touches.length == 1) {
    		    if (config.direction == 'h') {
    		        startX = e.touches[0].pageX;
    		    } else {
    		        startY = e.touches[0].pageY;
    		    }
    			 isMoving = true;
    			 
    		 }
    	 }
    	 
    	 function prevent(e){
            e.cancelable && e.preventDefault();
            return false;
        }

         if(this.addEventListener) {
            this.addEventListener('touchstart', onTouchStart, false);
            this.addEventListener('touchmove', onTouchMove, false);
         } else if (this.attachEvent) {
            this.attachEvent('touchstart', onTouchMove);
            this.attachEvent('touchmove', onTouchMove);
         }
         
     });
 
     return this;
   };
 
 })(jQuery);