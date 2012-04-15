/**
 * @author Tony Herford
 * 
 * This plugin creates a 360 view from a list of images. 
 * Also, the image list can be changed out at run time using
 * the replaceImages call.
 * 
 */

(function($) {
	// private variables and functions
	var pluginName = 'image360';
	
	// for logging to the firebug console, put in 1 line so it can easily remove for production
	function log($message) { if (window.console && window.console.log) window.console.log($message); };

	/**
	 * private function to setup images with in the selector container
	 * @param {Object} element
	 */
	function _setupImages(element)
	{
		element.children().not(':first').css({
			opacity: 0,
			position:'absolute',
			top:'0px',
			left:'0px'
		});	
		return element.children().length;
	}
	
	/**
	 * private function to replace the image list
	 * @param {Object} element
	 * @param {Object} imageList
	 * @param {Object} currImage
	 */
	function _replaceImages(element, imageList, currImage)
	{
		var data = element.data(pluginName);

		data.paused = true;
		
		element.children().addClass('old');
		
		$.each(imageList, function(index, value)
		{
			element.append($('<div/>').append($("<img />").attr({src:value})));
		});
		element.children('div:not(.old)').css({
			opacity: 0,
			position:'absolute',
			top:'0px',
			left:'0px'
		});
		
		element.children('div:not(.old):eq(' + currImage + ')').animate({opacity:1}, data.options.replaceImagesTransitionSpeed, function()
		{
			element.children('.old').remove();
			data.paused = false;
		});
		
		return element.children('div:not(.old)').length;	
	}
	
	/**
	 * Methods object with all the function 
	 */
	var methods = 
	{
		/**
		 * init function get's things rolling
		 * @param {Object} passedInOptions
		 */
		init : function(passedInOptions) {
			// merge default options and passed in options (overwrite the default)
			var options = $.extend(true, {}, $.fn.image360.options, passedInOptions);
			
			return this.each(function() {

				var $this = $(this);
				var data = $this.data(pluginName);
				
				// If the plugin hasn't been initialized yet
				if (!data) {

					/*
					 * Do more setup stuff here
					 */
					$(this).data(pluginName, {
						target : $this,
						currentImage : 0,
						imageCount:imgCount,
						paused:false,
						timer:null,
						options:options
					});
					data = $this.data(pluginName);
				}
				
				var imgCount
				if(options.imageList)
				{
				 	imgCount = _replaceImages($this, options.imageList, 0);
				}else
				{
					imgCount = _setupImages($this);
				}
				
				if(options.autoPlay)
				{
					$this.image360('play');
				}
				
				if (data.options.mouseWheel) 
				{
					$this.bind('mousewheel', function(event, delta)
					{
						var dir = delta > 0 ? 'Up' : 'Down', vel = Math.abs(delta);
						if (dir == 'Up') 
						{
							$this.image360('previous', {
								animation: false
							});
						}
						else 
						{
							$this.image360('next', {
								animation: false
							});
						}
						return false;
					});
				}
						
				data.imageCount = imgCount;
			});
		},
		
		/**
		 * Replace the images function to change out the image list
		 * @param {Object} args
		 */
		replaceImages : function(args)
		{
			return this.each(function() {

				var $this = $(this);
				var data = $this.data(pluginName);
				
				data.imageCount = _replaceImages($this, args.imageList, data.currentImage);
			});
		},
		
		/**
		 * Next image function
		 */
		next : function(passedInOptions) {
			return this.each(function() 
			{
				var $this = $(this);
				var data = $this.data(pluginName);
				
				var animationSpeed = passedInOptions && passedInOptions.animation == false ? 20 : data.options.transitionSpeed;

				$this.children(':eq(' + data.currentImage + ')').animate({opacity: 0}, animationSpeed);
				data.currentImage++;
				if(data.currentImage >= data.imageCount) data.currentImage = 0;
				$this.children(':eq(' + data.currentImage + ')').animate({opacity: 1}, animationSpeed);
			});
		},
		
		/**
		 * Previous image function
		 */
		previous : function(passedInOptions) 
		{
			return this.each(function() {

				var $this = $(this);
				var data = $this.data(pluginName);

				var animationSpeed = passedInOptions && passedInOptions.animation == false ? 20 : data.options.transitionSpeed;
				
				$this.children(':eq(' + data.currentImage + ')').animate({opacity:0}, animationSpeed);
				data.currentImage--
				if(data.currentImage < 0) data.currentImage = data.imageCount-1;
				$this.children(':eq(' + data.currentImage + ')').animate({opacity:1}, animationSpeed);
			});
		},
		
		/**
		 * Play to auto play the image list
		 */
		play : function() 
		{
			return this.each(function() {
				var $this = $(this);
				var data = $this.data(pluginName);
				
				function goNext()
				{
					if(!data.paused && $this.is(":visible"))
						$this.image360('next');
				}
				data.timer = setInterval(goNext, 1000/data.options.fps);
			});
		},
		
		/**
		 * Stops the play of the image list
		 */
		stop : function() 
		{
			var $this = $(this);
			var data = $this.data(pluginName);
			
			clearInterval(data.timer);
		}
	};

	/**
	 * Plugin function
	 * @param {Object} method
	 */
	$.fn.image360 = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
		}
	};
	
	/**
	 * Default option
	 */
	$.fn.image360.options = {
		fps : 2, 							/* Frame per second for autoPlay */
		autoPlay: false,					/* Automaticly play when attached to element */
		imageList : null,					/* List of images to load.  This will override the image in the div */
		transitionSpeed:10,					/* Transition Speed can have the images fade from one to the next */
		replaceImagesTransitionSpeed:400,	/* Transition Speed from one set of image to the next */
		mouseWheel:true						/* Allow mouse wheel to be used to flip through the images */
	};

})(jQuery);