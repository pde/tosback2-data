;(function($){
	
	
	
	$.fn.jcarousel = function(params){
		
		var params = $.extend({
		    stopAutoSlideAfterLoop: false,
		    minResizeWidth:1000,
		    autoResize: false,
		    hoverItem:false,
		    inSliding:false,
			direction: "horizontal",
			loop: false,
			dispItems: 1,
			nextBtn: "<span>Next</span>",
			prevBtn: "<span>Previous</span>",
			autoSlide: false,
			autoSlideInterval: 4000,
			delayAutoSlide: 4000,
			combinedClasses: false,
			effect: "slide",
			slideEasing: "swing",
			animSpeed: 2000,
			equalWidths: "true",
			itemMargin:42,
			start : 0,
			itemWidth:0,
			fadeWhenSliding: false,
			initialSlide: function() { return true; },
			beforeSlide: function() {},
			afterSlide:function() {},	
			onHoverItem:function() {}
		}, params);
		
		
		
		return this.each(function(){
			
			// Env object
			var self = $(this);
			
			
			var env = {
				$elts: {},
				params: params,
				launchOnLoad: []
			};
			
			// Carousel main container
			env.$elts.carousel = $(this).addClass("js");
			
			// Carousel content
			env.$elts.content = $(this).find("ul").css({position: "absolute", "top": 0});
			env.$elts.li = $("li", env.$elts.content);
			env.$elts.hover = false;
			env.$elts.hoverItem = '';
			
			// Content wrapper
			env.$elts.wrap = env.$elts.content.parent();
			
			// env.steps object
			env.steps = {
			    distance:1,
			    start:params.start,
				first: 0, // First step
				count: env.$elts.content.find(">*").length // Items count
				
			};
			
			env.$elts.li.each(function(i) {
			    $(this).attr("id", "carousel-" + i);
			});
			
			env.startedSlideTimer = false;
			
			var preLi = null;
			
			// First item
            var $firstItem = env.$elts.content.find(">*:eq(0)");
			// Width 1/1 : Get default item width
			var outerWidth = $firstItem.outerWidth();
			if(outerWidth == 0 && env.params.itemWidth > 0 ) {
			    //
		        env.itemWidth = env.params.itemWidth;
		        env.$elts.content.find(">*").css({width:env.itemWidth + 'px'});	        
		        
		    } else {
		   
		        env.itemWidth = parseInt(outerWidth) + parseInt(params.itemMargin);
		    }
            
            
			
			    
			if(params.loop) {
                preLi = env.$elts.li.slice(env.steps.count - params.dispItems - 1 + 1).clone();
                var appLi = env.$elts.li.slice(0, params.dispItems).clone();
                
                
                
                preLi.each(function() {
                    var id = $(this).attr("id");
                    $(this).attr("id", "copy-"+ id);
                    
                });
                
                
                
                appLi.each(function() {
                    var id = $(this).attr("id");
                    $(this).attr("id", "copy-"+ id);
                });
                
                
                env.$elts.content.prepend(preLi).append(appLi);
                
                
                
                env.$elts.li = $("li", env.$elts.content);
                
                
                env.steps.start += parseInt(params.dispItems);
                env.steps.first = env.steps.start;
                env.$elts.content.css("left", -(env.itemWidth * env.steps.first) + "px")
                
                env.steps.count = env.$elts.content.find(">*").length;
                
			    
			}
			  
		    	
			if(env.params.autoResize) {
			    resizeNow(env);
			    $(window).resize(function(){
		            resizeNow(env);
	            });
			}
			
			
			
			env.stopAutoSlideAfterLoop = false;
			

			env.functionQueueInterval = null;
			env.functionQueues = [];
			
			
			env.itemInSliding = false;
			
			
			if(env.params.hoverItem) {
			    
			    
			    env.$elts.li.hover(function(e){
                    env.params.onHoverItem('enterItem', $(this));
			    }, function(e) {
			        env.params.onHoverItem('leaveItem', $(this));
			    });
			    
			    env.$elts.content.hover(function(e) {
			    
			    
			        if(env.stopAutoSlideAfterLoop || !env.autoSlide) {
			            //console.log('hover in stopAutoSlideAfterLoop');
			            return;
			        }
			            
			            
			        clearTimeout($(this).data('leave'));
			         $(this).data('enter', setTimeout( function () {
			                
			                var func = wrapFunction(stopAutoSlide, this, [env]);
                            env.functionQueues.push(func);
                            processFuncQueue(env);
                            
                      }, 1000));
                      
			        
			    }, function(e) {
			        
			        if(env.stopAutoSlideAfterLoop || !env.autoSlide) {
			            //console.log('leave out stopAutoSlideAfterLoop');
			            return;
			        }
			            
			            
			        clearTimeout($(this).data('enter'));
                    
                    $(this).data('leave', setTimeout( function () {
                            
                            var func = wrapFunction(startAutoSlide, this, [env]);
                            env.functionQueues.push(func);
                            processFuncQueue(env);
                            
                      }, 1000));
                      

			    });
			    
			    
			}
			
			
			// Last visible step
			env.steps.last = env.steps.count - 1;
			
			// Next / Prev Buttons
			
			env.$elts.prevBtn = env.$elts.carousel.find(params.prevBtn);
			env.$elts.nextBtn = env.$elts.carousel.find(params.nextBtn);
			
			// Bind events on next / prev buttons
			initButtonsEvents(env, function(e){
			    env.steps.distance = 1;
				slide(e, this, env);
			});
			
			// On document+css load !
			$(function(){
				


				// Width 2/3 : Define content width
				if (params.direction == "vertical"){
					env.contentWidth = env.itemWidth;
				} else {
					if (params.equalWidths) {
						env.contentWidth = env.itemWidth * env.steps.count;
					} else {
						env.contentWidth = (function(){
											var totalWidth = 0;
											env.$elts.content.find(">*").each(function(){
												totalWidth += $(this).outerWidth();
											});
											
											return totalWidth;
										})();
					}
				}
				
				
				
				// Width 3/3 : Set content width to container
				
				env.$elts.content.width( env.contentWidth );
				
				// Height 1/2 : Get default item height
				env.itemHeight = $firstItem.outerHeight();
				
				// Height 2/2 : Set content height to container
				if (params.direction == "vertical"){
					env.$elts.content.css({height:env.itemHeight * env.steps.count + "px"});
					env.$elts.content.parent().css({height:env.itemHeight * env.params.dispItems + "px"});
				} else {
					//env.$elts.content.parent().css({height:env.itemHeight});
				}
				
				env.$elts.content.css("left", -(env.itemWidth * env.steps.first) + "px")
				
				/*
				if(params.loop && preLi != null) {
				    preLi.css({display:'inline'});
				    
				}
				*/
				
				// Update Next / Prev buttons state
				updateButtonsState(env);
				
				
				//Adjust image when browser is resized
	
				// Launch function added to "document ready" event
				$.each(env.launchOnLoad, function(i,fn){
					fn();
				});
				
				env.$elts.carousel.touchwipe({
		             direction:'h',
                     wipeLeft: function() { 
                        env.$elts.nextBtn.click();
                     },
                     wipeRight: function() { 
                        env.$elts.prevBtn.click();
                      },
                     preventDefaultEvents: true,
                     checkMoving:true
                });
                
                // should call back to caller to check if all banners are loaded.
				var initialSlideInterval = window.setInterval(function() {
				    if(env.params.initialSlide(self, env.steps.first, env.$elts.content, function(idx) {
				        navigateTo(idx, env);
				    },function(idx) {
				        env.params.autoSlide = false;
				        stopAutoSlide(env);
				    })) {
				        window.clearInterval(initialSlideInterval);
				        // Launch autoslide
				        if (env.params.autoSlide){
				            
					        window.setTimeout(function(){
					            if(!env.startedSlideTimer)
					                env.startedSlideTimer = true;
					                
					            env.autoSlideInterval = null;
						        startAutoSlide(env);
					        }, env.params.delayAutoSlide);
				        }
				    }
				}, 1000);
				
			});
			
			//bind event stop, start slider
			self.bind('notify.startAutoSlide', function(e){
			    //console.log('notify.startAutoSlide');
			    if (env.params.autoSlide){
			        window.setTimeout(function(){
			            //env.autoSlideInterval = null;
			            //console.log('perform startAutoSlide');
				        startAutoSlide(env);
			        }, 0);
		        }
			});
			
			self.bind('notify.stopAutoSlide', function(e){
			    //console.log('notify.stopAutoSlide');
			    if (env.params.autoSlide){ 
			        var autoSlideInterval = window.setInterval(function() {
			            if(env.startedSlideTimer) {
			                //console.log('perform stopAutoSlide');
			                window.clearInterval(autoSlideInterval);
			                stopAutoSlide(env);        
			            }
			        }, 0);
			        
			    }
			    
			});
			
			
			
			
		});
		
	};
	
	
	// Slide effect
	function wrapFunction (fn, context, params) {
        return function() {
            fn.apply(context, params);
        };
    }
    
    function processFuncQueue(env) {
        
        if(env.functionQueues.length > 0) {
            window.setTimeout(function(){
               while(env.functionQueues.length > 0) {
                    (env.functionQueues.shift())(); 
               }
           }, 0)
            
        }
    }
    
	function startAutoSlide(env) {
	
	    
	    if(env.params.hoverItem) {
	         env.params.onHoverItem('leaveItems', null);
	    }
	   
	    if(env.autoSlideInterval != null) {
	        stopAutoSlide(env);
	    }
	    
	    if(!env.params.autoSlide)
	        return;
	       
	    
	    env.autoSlideInterval = window.setInterval(function(){
            //console.log('1:' + env.autoSlideInterval);
            
            if(env.stopAutoSlideAfterLoop) {
                stopAutoSlide(env);
                return;
            }
            
            if(!env.itemInSliding) {
                env.$elts.nextBtn.click();    
            }
            
        }, env.params.autoSlideInterval);       


	}
	
	function stopAutoSlide(env) {
	
	    if(env.params.hoverItem) {
	        env.params.onHoverItem('enterItems', null);
	    }
	    window.clearInterval(env.autoSlideInterval);
        env.autoSlideInterval = null;
            
	}
	
	
	
	function navigateTo(idxTo, env) {
	    
	    env.slideInStop = true;
	    env.slideInStart = false;
	    stopAutoSlide(env);
	    
	    var $item = env.$elts.content.find(">*:eq("+env.steps.first+")");
	    
	    var idxForm = 0;
	    var itemId = $item.attr('id');
		var pos = itemId.lastIndexOf('-');
		
		
		var length = itemId.length;
		if(pos != -1) {
			idxForm = parseInt(itemId.substr(pos + 1, length - pos));
		}
		
		
		
		//console.log('idxForm:'+idxForm);
		//console.log('idxTo:'+idxTo);
		var distance = (idxTo - idxForm);
		env.steps.distance = distance;
		
		
		if(distance > 0) {
		    //console.log(env.steps.first + (env.params.dispItems*distance));
		    //env.$elts.nextBtn.data("firstStep", env.steps.first + (env.params.dispItems*distance));
		    slide(null, env.$elts.nextBtn, env);
		    
		} else if (distance < 0){
		    //console.log(env.steps.first + (env.params.dispItems*distance));
		    //env.$elts.prevBtn.data("firstStep", env.steps.first + (env.params.dispItems*distance));
		    slide(null, env.$elts.prevBtn, env);   
		}
		
	}
	
	function slide(e, btn, env){
	    
	    //console.log('env.steps.distance :'+env.steps.distance);
		var $btn = $(btn);
		var newFirstStep = $btn.data("firstStep");
		
		// save current li
		var currentItems = [];
		var nextItems = [];
		
		
		// Effect
		switch (env.params.effect){
			
			// No effect
			case "no":
			    env.params.beforeSlide(env.steps.first, newFirstStep, env.params.dispItems, env.$elts.content);
			    env.itemInSliding = true;
			    
				if (env.params.direction == "vertical"){
					env.$elts.content.css("top", -(env.itemHeight * newFirstStep) + "px");
				} else {
					env.$elts.content.css("left", -(env.itemWidth * newFirstStep) + "px");
				}
				env.params.afterSlide(newFirstStep, env.$elts.content);
				break;
			
			// Fade effect
			case "fade":
			    env.params.beforeSlide(env.steps.first, newFirstStep, env.params.dispItems, env.$elts.content);
			    env.itemInSliding = true;
			    
				if (env.params.direction == "vertical"){
					env.$elts.content.hide().css("top", -(env.itemHeight * newFirstStep) + "px").fadeIn(env.params.animSpeed, function() {
				        env.params.afterSlide(newFirstStep, env.$elts.content);
				    });
				} else {
					env.$elts.content.hide().css("left", -(env.itemWidth * newFirstStep) + "px").fadeIn(env.params.animSpeed, function() {
				        env.params.afterSlide(newFirstStep, env.$elts.content);
				    });
				}
				break;
			// Slide effect
			default:
			
			    var currentItemIdx = env.steps.first;
			    var nextItemIdx = newFirstStep;
			    
			    if(env.params.loop) {
			        var curr = 0;
			        if(newFirstStep <= env.steps.start - env.params.dispItems) {
                        currentItemIdx = newFirstStep = (env.steps.count + newFirstStep) - env.params.dispItems;
                        
                        if (env.params.direction == "vertical"){ 
                            env.$elts.content.css("top", -(env.itemHeight * newFirstStep) + "px");
                        } else {
                            env.$elts.content.css("left", -(env.itemWidth * newFirstStep) + "px");
                        }
                       
                        nextItemIdx = newFirstStep = newFirstStep - env.params.dispItems;
                        //console.log('newFirstStep:' + newFirstStep);
                        
                        
					} else if(newFirstStep >= env.steps.count - env.params.dispItems + 1) { // If last, then goto first
					    
					    
					    currentItemIdx = newFirstStep = (env.params.dispItems - (env.steps.count - newFirstStep));
					    
					    
					    
					    if (env.params.direction == "vertical"){ 
                            env.$elts.content.css("top", -(env.itemHeight * newFirstStep) + "px");
                        } else {
                            env.$elts.content.css("left", -(env.itemWidth * newFirstStep) + "px");
                        }
                        
                        
					    
						nextItemIdx = newFirstStep = newFirstStep + env.params.dispItems;
						//console.log('newFirstStep:' + newFirstStep);
				
                    }
                    
                    if(nextItemIdx + env.params.dispItems >= env.steps.count - env.params.dispItems + 1) {
                    
                        if(env.params.stopAutoSlideAfterLoop) {
			                if(!env.stopAutoSlideAfterLoop) {
			                   env.stopAutoSlideAfterLoop = true;
			                   stopAutoSlide(env);
			                }
			            }
			            
                    }
                    
                    
			    }
			    
			    if(env.steps.distance > 1) {
			        newFirstStep += (env.steps.distance - 1)*env.params.dispItems;
			        nextItemIdx = newFirstStep;
			    } else if (env.steps.distance < -1){
			        newFirstStep += (env.steps.distance + 1)*env.params.dispItems;
			        nextItemIdx = newFirstStep;
			    }
			    
			    
			    
			    
			    env.itemInSliding = true;
			    env.params.beforeSlide(currentItemIdx, nextItemIdx, env.params.dispItems, env.$elts.content);
			    
			    //console.log('currentItemIdx:' + currentItemIdx);
			    //console.log('nextItemIdx:' + nextItemIdx);
			    
			    if(env.params.fadeWhenSliding) {
			    
			        for(var i = currentItemIdx; i < currentItemIdx + env.params.dispItems; i++) {
	                    currentItems.push(env.$elts.li[i]);
	                }
			        for(var i = nextItemIdx; i < nextItemIdx + env.params.dispItems; i++) {
	                    nextItems.push(env.$elts.li[i]);
	                }
                }
			        
		        if (env.params.direction == "vertical"){
				    env.$elts.content.stop().animate({
					    top : -(env.itemHeight * newFirstStep) + "px"
				    }, env.params.animSpeed, env.params.slideEasing, function() {
				        env.params.afterSlide(newFirstStep, env.$elts.content);
				    } );
			    } else {
			        
			        if(env.params.fadeWhenSliding) { 
			            
			            if(jQuery.fxqueue('toutglobal').playing != undefined) {
			                jQuery.fxqueue('toutglobal').stop();   
			            }
			            
			            for(var i = 0; i < currentItems.length; i++) {
			                $(currentItems[i]).find('.tout_content').css({opacity:1, filter:''});
                            $(currentItems[i]).find('.tout_content').animate({opacity:0}, {
                                duration:env.params.animSpeed, 
                                easing:env.params.slideEasing, 
                                scope: 's01', 
                                queue: 'toutglobal'});
                        }
                        
                        
                        
                        env.$elts.content.stop().animate({
				            left : -(env.itemWidth * newFirstStep) + "px"
			            }, {
			                duration:env.params.animSpeed,
			                easing:env.params.slideEasing,
			                complete:function() {
		                        env.params.afterSlide(newFirstStep, env.$elts.content);
		                        env.itemInSliding = false;
		                    },
		                    step:function(now, fx) {
		                    },
		                    scope: 's01',
                            queue: 'toutglobal'
                            
			            });
    			        
    			        
                        for(var i = 0; i < nextItems.length; i++) {
                            $(nextItems[i]).find('.tout_content').css({opacity:0});
                            $(nextItems[i]).find('.tout_content').animate({opacity:1, filter:''}, {
                                duration:env.params.animSpeed, 
                                easing:env.params.slideEasing, 
                                scope: 's01', 
                                queue: 'toutglobal'});
                        }
                        
                        
                        
                        //jQuery.fxqueue('toutglobal').start();
			        
			        } else {
			            
			            var distance = nextItemIdx - currentItemIdx;
			            //console.log('currentItemIdx : '+currentItemIdx);
			            //console.log('nextItemIdx : '+nextItemIdx);
			            //console.log('distance : '+distance);
			            var skip = false;
			            var firstSkipItem = null;
			            if(distance > 1) {
			                
			                skip = true;
			                var currentItem = env.$elts.content.find(">*:eq("+currentItemIdx+")");
			                var nextItem = env.$elts.content.find(">*:eq("+nextItemIdx+")");
			                
			                firstSkipItem = currentItem.next();
			                nextItem.before(currentItem)
			                env.$elts.content.css("left", -(env.itemWidth * (nextItemIdx - 1)) + "px");
			                
			            } else if (distance < -1) {
			            
			                skip = true;
			                var currentItem = env.$elts.content.find(">*:eq("+currentItemIdx+")");
			                var nextItem = env.$elts.content.find(">*:eq("+nextItemIdx+")");
			                
			                firstSkipItem = currentItem.prev();
			                nextItem.after(currentItem)
			                env.$elts.content.css("left", -(env.itemWidth * (nextItemIdx + 1)) + "px");
			                
			            }
			            
			            
			            env.$elts.content.stop().animate({
				            left : -(env.itemWidth * newFirstStep) + "px"
			            }, {
			                duration:env.params.animSpeed,
			                easing:env.params.slideEasing,
			                complete:function() {
			                    if(skip) {
			                        if(distance > 1) { 
			                            firstSkipItem.before(currentItem);
			                        } else if (distance < -1) { 
			                            firstSkipItem.after(currentItem);
			                        } 
			                    }
		                        env.params.afterSlide(newFirstStep, env.$elts.content);
		                        env.itemInSliding = false;
		                    }
                            
			            });
			            
			            
			        }
			        

                    
			    }
			    
                    
				    
		        /*
		         env.$elts.content.stop().animate({
				        left : -(env.itemWidth * newFirstStep) + "px"
			        }, env.params.animSpeed, env.params.slideEasing, function() {
			        env.params.afterSlide(newFirstStep, env.$elts.content);
			    });
			    */
			   
			    
			    
				
		}
		
		env.steps.first = newFirstStep;
		updateButtonsState(env);
		
		// Stop autoslide
		/*
		if(e != null) {
		    if (!!e.clientX && env.autoSlideInterval){
			    window.clearInterval(env.autoSlideInterval);
		    }
		}
		*/
		
	};
	
	// Update all buttons state : disabled or not
	function updateButtonsState(env){
		
		env.$elts.prevBtn.data("firstStep", env.steps.first - env.params.dispItems);
		env.$elts.nextBtn.data("firstStep", env.steps.first + env.params.dispItems);
		
		
		
	};
	
	// Next / Prev buttons events only
	function initButtonsEvents(env, slideEvent){
		
		env.$elts.nextBtn.add(env.$elts.prevBtn).bind("click", slideEvent).removeClass("disabled");
		
	};
	
	
	//Adjust image size
	function resizeNow(env) {
               
		
		var browserwidth = $(window).width();
		browserwidth -= 3;
		
		if(browserwidth < env.params.minResizeWidth)
		    browserwidth = env.params.minResizeWidth;
		else if(browserwidth > 1280)
		    browserwidth = 1280;
		    
		var isiPad = navigator.userAgent.match(/iPad/i) != null;
        if(isiPad) {
            browserwidth = 1024;
        }
        
     
		env.$elts.li.css({'width':browserwidth+'px'});
		env.$elts.wrap.css({'width':browserwidth+'px'});
		var $parent = env.$elts.wrap.parent();
		
		
		window.setTimeout(function() {
		    
		    while($parent.attr('id') != 'homeBannerContainer') {
		        $parent.css({'width':browserwidth+'px'});
		        $parent = $parent.parent();
		    }
		    
		    $parent.css({'width':browserwidth+'px'});
			
		    env.itemWidth = browserwidth;

		    var totalWidth = 0;
		    env.$elts.content.find(">*").each(function(){
		        
                totalWidth += $(this).outerWidth();
            });
            
			
            env.$elts.content.css( {'width':totalWidth+'px', left:-(env.itemWidth * env.steps.first) + "px"} );
            
            
		}, 0);
		
											
		
	};
		
	

	
})(jQuery);