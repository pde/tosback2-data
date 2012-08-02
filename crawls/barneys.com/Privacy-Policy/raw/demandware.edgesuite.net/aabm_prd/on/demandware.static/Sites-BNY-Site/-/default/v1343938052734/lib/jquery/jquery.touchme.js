/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Demsond Liang
 * desmondliang.com
 * @version 1.0 (15th Setp 2010)
 */

/*
 * 
 * @param {Object} settings
 * isDetectHorizontalMovement: enable/disable horizontal touch movement. options: true(default)/false
 * isDetectVecticalMovement: enable/disable vertical touch movement. options: true(default)/false
 * isDetectDiagonalMovement: enable/disable diagonal movement. options: true/false(default)
 * 
 * wipeLeft: left wipe movement handler
 * wipeRight: right wipe movement handler 
 * wipeUp: up wipe movement handler
 * wipeDown: down wipe movement handler
 * wipeDownRight:down right wipe movement handler
 * wipeUpLeft: up left wipe movement handler
 * wipeUpRight: up right wipe movement handler
 * wipeDownLeft: down left wipe movement handler
 * 
 */
		
(function($) { 
   $.fn.touchme = function(settings) {
     var config = {
    		min_move_x: 20,
			min_move_y: 20,
 			wipeLeft: function(target) {},
 			wipeRight: function(target) {},
			wipeUp: function(target){},
			wipeDown: function(target){},
 			wipeDownRight: function(target) {},
 			wipeUpLeft: function(target) {},
			wipeUpRight: function(target){},
			wipeDownLeft: function(target){},
			gestureChange: function(event){},
			onGestureEnd:function(event){},
			inMotion:function(event){},		
			preventDefaultEvents: true
	 };
     
     if (settings) {
	 	$.extend(config, settings);
	 }else if(settings.wipeLeft){
	 	config.wipeLeft=settings.wipeLeft;
	 }else if(settings.wipeRight){
	 	config.wipeRight=settings.wipeRight;
	 }else if(settings.wipeUp){
	 	config.wipeUp=settings.wipeUp;		
	 }else if(settings.wipeDown){
	 	config.wipeDown=settings.wipeDown;	

	 }else if(settings.wipeDownRight){
	 	config.wipeDownRight=settings.wipeDownRight;
	 }else if(settings.wipeUpLeft){
	 	config.wipeUpLeft=settings.wipeUpLeft;
	 }else if(settings.wipeUpRight){
	 	config.wipeUpRight=settings.wipeUpRight;		
	 }else if(settings.wipeDownLeft){
	 	config.wipeDownLeft=settings.wipeDownLeft;	
		
	 }else if(settings.gestureChange){
	 	config.gestureChange=settings.gestureChange;	
		
	 }else if(settings.onGestureEnd){
	 	config.onGestureEnd=settings.onGestureEnd;	

	 }else if(settings.inMotion){
	 	config.inMotion=settings.inMotion;	
				
	 }else{
	 	/*assign default value to settings variable*/
		var settings={
				isDetectHorizontalMovement:true,
				isDetectDiagonalMovement: false,				 
				isDetectVecticalMovement:true
			}
	 }
	 

     this.each(function() {
    	 var startX;
		 var startY;
		 var isMoving = false;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startX = null;
    		 startY = null;
			 isMoving = false;
    	 }	
    	 
    	 function onTouchMove(e) {
		 	
    		 if(config.preventDefaultEvents) {
    			 e.preventDefault();
    		 }
    		 if(isMoving) {
			 	 config.inMotion(e);
				 
	    		 var x = e.touches[0].pageX;
	    		 var y = e.touches[0].pageY;
				 
				 var dx = startX - x;
	    		 var dy = startY - y;
				
				
				if(settings.isDetectDiagonalMovement==true){
					 if((Math.abs(dx) >= config.min_move_x) && (Math.abs(dy) >= config.min_move_y)) {
		    			cancelTouch();
			    			if((dy > 0)&&(dx>0)) {
			 					config.wipeUpLeft(e.target);
			    			}else if((dx<0)&&(dy<0)) {
								config.wipeDownRight(e.target);
			 					
			 				}else if((dx>0)&&(dy<0)) {
								config.wipeDownLeft(e.target);
								
							}else if((dx<0)&&(dy>0)) {
								config.wipeUpRight(e.target);
								
			    			}
						return;						
					}
		    	}
				
				 if(settings.isDetectHorizontalMovement==true){
					 if(Math.abs(dx) >= config.min_move_x) {
		    			cancelTouch();
						
			    			if(dx > 0) {
			    				config.wipeLeft(e.target);
			    			} else {
			    				config.wipeRight(e.target);
			    			}						
						}
	    		 }

				 if(settings.isDetectVecticalMovement==true){
					 if(Math.abs(dy) >= config.min_move_y) {
		    			cancelTouch();
						
			    			if(dy > 0) {
			    				config.wipeUp(e.target);
			    			} else {
			    				config.wipeDown(e.target);
			    			}						
						}
	    		 }

    		 }
    	 }
    	 
		 function onGestureChange(e){
		 	e.preventDefault();
			config.gestureChange(e);
		 }

		function onGestureEnd(e){
			config.onGestureEnd(e);
		}
		
		 
    	 function cancelTouch() {
    		 this.removeEventListener('gesturechange', onGestureChange);
			 isMoving = false;
    	 }
		 		 
    	 function onTouchStart(e)
    	 {
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
				 startY = e.touches[0].pageY;
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
    		 
			 }else if(e.touches.length==2){//gesture
			 
				 isMoving = true;
    			 this.addEventListener('gesturechange', onGestureChange, false);
				 this.addEventListener("gestureend", onGestureEnd, false);
			 }
    	 }    	 
    	
		
		 this.addEventListener('touchstart', onTouchStart, false);
		 
     });
 
     return this;
   };
 
 })(jQuery);
 

