//You need an anonymous function to wrap around your function to avoid conflict  
(function($){
	$.fn.extend({

		//pass the options variable to the function
		contentFit : function(options) {
 
 
			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				upperWidth  : 1280,
				lowerWidth  : 980,
				margin      : 75,
				left        : 460,
				right       : 433,
				border      : 7,
				leftColumn  : 'flexLeftContent',
				rightColumn : null
			}

			var options =  $.extend(defaults, options);
 
			return this.each( function(){
				var $this = $( this );
				if( options.rightColumn ){
					$( '.' + options.rightColumn ).css({ width: 433 });
				}
				$this.contentResize( options );
				$this.timer = setTimeout( 
					function(){
						$this.contentResize( options );
					},
					100
				);
				$( window ).resize( function() {
					$this.contentResize( options );
				});
			});
		},

		contentResize : function( options, timeout ){
			var $this = this,
				margin = 0,
				left = 0,
				windowWidth = $( window ).width();
			switch( true ){
				case windowWidth <= options.lowerWidth:
					margin = options.lowerWidth / options.upperWidth * options.margin;
					left = options.lowerWidth / options.upperWidth * options.left;
					break;
				case windowWidth >= options.upperWidth:
					margin = options.margin;
					left = options.left;
					break;
				default:
					margin = windowWidth / options.upperWidth * options.margin;
					left = windowWidth / options.upperWidth * options.left;
			}
			$this.find( '.' + options.leftColumn ).css({ marginLeft: margin - options.border, marginRight: margin, width: left });
			$this.css({ width: margin * 3 + left + options.right });
		}
	}); 
})(jQuery);