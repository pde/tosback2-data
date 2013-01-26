
		(function($){
		   var LightBoxObj = function(element, settings, callBacks)
		   {
			   var elem = $(element);
			   var obj = this;
			   var defaultSettings = {
					backDropId    : '',
					lightBoxId    : '',
					header  	  : '',
					footer        : '',
					close		  : ''
			   };
			   settings = $.extend({}, defaultSettings, settings || {});
			   
			   // Public method - can be called from client code
			   this.$lightBoxContent = $('#' + settings['lightBoxId']);
			   this.$backDropContent = $('#' + settings['backDropId']);
			   this.callBacks 		 = (typeof(callBacks)=== "undefined")?{}:callBacks;
			   this.sourceElement 	 = $(element);
			   this.showOverlay 	 = function()
			   {	
				   oWin = $(window);
				   if(this.callBacks['beforeOpen']){
					   this.callBacks['beforeOpen'].call(obj,this.sourceElement);
				   }
				   this.$backDropContent.show();
				   this.$lightBoxContent.show();
				   this.$lightBoxContent.css({'position':'absolute',
					   'top':Math.abs(((oWin.height() - this.$lightBoxContent.outerHeight())/ 2) + oWin.scrollTop()),
					   'left':Math.abs(((oWin.width() - this.$lightBoxContent.outerWidth())/2) + oWin.scrollLeft())
				   });
				   
				   //Adding code for click to chat , ModalFlag will be pushed as On when overlay is being viewed.
				   	if(typeof( $('#modalFlag')!= undefined)){
				   		if($('#modalFlag').val()!=undefined)
				   			{
				   				$('#modalFlag').val("On");
				   				sendDataOnClick();
				   			}
				   }
					   
			   };
			   this.closeOverlay = function()
			   {
				   if(this.callBacks['beforeClose']){
					   this.callBacks['beforeClose'].call(obj,this.sourceElement);
				   }
				   this.$lightBoxContent.hide();
				   this.$backDropContent.hide();
				   
				 //Adding code for click to chat , ModalFlag will be pushed as Off when overlay is  closed.
				
				   if(typeof( $('#modalFlag')!= undefined)){
					   if($('#modalFlag').val()!=undefined){
						$('#modalFlag').val("Off");  
                	   sendDataOnClick();}
				   }
					   
			   };
			   this.getContext = function()
			   {
				   
			   };
			   // Private method - can only be called from within this object			   
			   var init = function(obj)
			   {				   
					elem.click(function(e){
						
						e.preventDefault();
						obj.$lightBoxContent.data('srcURL',this.href);
						obj.showOverlay(elem);
					});
					
					if(settings['close'] == 'no'){
						obj.$lightBoxContent.find('.close').hide();
					}else{
						obj.$lightBoxContent.find('.close').click(function(){
							obj.closeOverlay();
						});
						
						obj.$backDropContent.click(function(){
							obj.closeOverlay();
						});
					}

					/*code to scroll the overlay with scroll of window*/
					$(window).scroll(function(){
						 oWin = $(window);
						 if(obj.$lightBoxContent.css('display')=="block"){
							 obj.$lightBoxContent.css({'position':'absolute',
								   'top':Math.abs(((oWin.height() - obj.$lightBoxContent.outerHeight())/ 2) + oWin.scrollTop()),
								   'left':Math.abs(((oWin.width() - obj.$lightBoxContent.outerWidth())/2) + oWin.scrollLeft())
							 });
						 }
					});
					for(var handler in callBacks){
					   handlerRef = callBacks[handler];
					   handlerSource = handler.replace("handle","");
					   obj.$lightBoxContent.find('.'+handlerSource).bind('click',{eventSourceObj:obj.sourceElement},handlerRef);
					}
			   };
			   init(obj);
		   };

		   $.fn.myplugin = function(options,callBacks)
		   {
			   return this.each(function()
			   {
				   var element = $(this);
				  
				   // Return early if this element already has a plugin instance
				   if (element.data('myplugin')) return;

				   // pass options to plugin constructor
				   var myplugin = new LightBoxObj(this, options,callBacks);

				   // Store plugin object in this element's data
				   element.data('myplugin', myplugin);
			   });
		   };
		   $.fn.showOverlay = function(){ $(this).data('myplugin').showOverlay(); };
		   $.fn.hideOverlay = function(){ $(this).data('myplugin').closeOverlay(); };
		})(jQuery);


		
