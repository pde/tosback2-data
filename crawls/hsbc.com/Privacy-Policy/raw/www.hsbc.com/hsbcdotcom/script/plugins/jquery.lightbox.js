/**
 * @projectDescription: jQuery plugin for creating a lightbox with an overlay
 * @version: 1.4
 */
 
(function($){
	$.lightbox = function(opts){
		opts = $.extend(true,{
			content: '',
			classes: {
				overlay: 'overlay',
				lightbox: 'lightbox',
				close: 'close'
			},
			windowTop: false,
			closeContent: '',
			remove: true,
			addTabFocusElement: true
		}, opts);
		
		var $overlay = $('<div class="' + opts.classes.overlay + '" />')
      		.appendTo(document.body)
      		.css({height:$(document).height(), width:$(document).width()})
      		.click(function(){
    			close();
    		});
    		
    	$(window).resize(function(){
    		$overlay.css({height:$(document).height(), width:$(document).width()});
    	});

    	var $lightbox = $(
      		'<div class="' + opts.classes.lightbox + '">' +
        		'<div class="lightboxInner1">' +
        			'<div class="lightboxInner2">' +
          				opts.content +
          			'</div>' +
        		'</div>' +
      		'</div>'    
    	)
    	.appendTo(document.body)
    	.bind('closelightbox', function(){close();})
    	.bind('resizelightbox', function(e, width, height){
    		$lightbox.width(width);
    		$lightbox.height(height);
    		setPosition();
    		$lightbox.trigger('onresizelightbox');
    	});
    	
    	if (opts.addTabFocusElement){
    		$('<span class="tabbableElement" tabindex="1"></span>').prependTo($lightbox).focus(); 
    	}
    	$lightbox.trigger('onopenlightbox').find('.' + opts.classes.close).click(function(e){
    		e.preventDefault();
    		close();
    	});
    
    	$('<a href="#" class="' + opts.classes.close + '">' + opts.closeContent + '</a>')
       		.prependTo($lightbox)
       		.click(function(e){
         		e.preventDefault();
         		close();     
    		});

    	setPosition();
    	/**
    	 * Set the top and left positions of the lightbox
    	 */
    	function setPosition(){
	    	$lightbox.css({
	       		top: getTop(),
	       		left:($(window).width()-$lightbox.width())/2
	    	});
	    }
	    /**
	     * Get the top value based on lightbox and window height
	     * @returns top {int}
	     */
	    function getTop(){
	    	var top = $(window).scrollTop() + 20;
	    	if($lightbox.height() < $(window).height()){
	    		if(!opts.windowTop){
	      			top += ($(window).height()-$lightbox.height())/2;
	      		}
	    	}
	    	return top;
	    }
		/**
		 * Triggers 'oncloselightbox' and removes $overlay and $lightbox
		 */
    	function close(){
    		$lightbox.trigger('oncloselightbox');
      		if(opts.remove){
      			$overlay.remove();
      			$lightbox.remove();
      		}
      		else{
      			$overlay.hide();
      			$lightbox.hide();
      		}
    	}
		return $lightbox;
	}
})(jQuery);