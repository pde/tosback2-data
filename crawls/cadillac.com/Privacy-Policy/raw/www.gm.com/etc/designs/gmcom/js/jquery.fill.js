//You need an anonymous function to wrap around your function to avoid conflict  
(function($){
	$.fn.extend({

		fillWidth   : 0,
		timer       : null,
		eleWidth    : 0,
		windowWidth : 0,

		//pass the options variable to the function
		fill: function(options) {
 
 
			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				elements : 'li',   //selector of elemants whoes width will be used to get the width of the fill element
				fill     : '#fill' //selector of element that will actualy be doing the filling
			}

			var options =  $.extend(defaults, options);
 
			return this.each(function() {
				$ulFill = $( this );
				$ulFill.fillResize( options, false );
				$ulFill.timer = setTimeout( 
					function(){
						$ulFill.fillResize( options, false );
					},
					100
				);
				$( window ).resize( function() {
					$ulFill.fillResize( options, false );
				});
			});
		},

		fillResize: function( options, timeout ){
			
			$this = this;
			$this.windowWidth = $( window ).width();
			$this.eleWidth = 0;
			$this.children( options.elements ).each( function(){
				$element = $( this );
				if( $element.attr( 'id' ) != $this.children( options.fill ).attr( 'id' ) && !/Overlay/.test( $element.attr( 'id' ))){
					$this.eleWidth = $this.eleWidth + $element.outerWidth( true );
				}
			});
			if( $this.windowWidth != $this.eleWidth + $this.fillWidth ){
				if( $this.windowWidth > $this.eleWidth ){
					$this.fillWidth = $this.windowWidth - $this.eleWidth
					if( navigator.platform != 'iPhone' ){
						$this.css({ width: 'auto' });
					} else {
						$this.css({ width: 980 });
					}
					$this.children( options.fill ).css({ width: $this.fillWidth + 'px' }).show();
					
				} else {
					if(navigator.platform!=='iPad')
					$this.css({ width: ( $this.eleWidth ) + 'px' });
					$this.fillWidth = 0;
					$this.children( options.fill ).hide();
				}
			}
			if( timeout ){
				$ulFill.timer = setTimeout( 
					function(){
						$ulFill.fillResize( options, true );
					},
					100
				);
			}
		}
	});
})(jQuery);