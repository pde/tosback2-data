//You need an anonymous function to wrap around your function to avoid conflict  
(function($){
	$.fn.extend({

		imgHeight    : 0,
		imgWidth     : 0,
		ratio        : 0,
		time         : null,
		windowHeight : 0,
		windowWidth  : 0,

		backgroundFill: function( options ) {
 			var defaults = {
				imgKnownWidth  : 1920,  //The width of the image used to make sure the image is fully loaded
				imgKnownHeight : 1080,  //The height of the image used to make sure the image is fully loaded
				minWidth       : 980,   //The width when the image will stop scailing
				widthOnly      : false, //Ignore the height of the window
				fillWindow     : true   //This will prevent black bars where the window size and the image size will not fill when trying to maintain the aspect ratio of the image
			}
			var options =  $.extend( defaults, options );
 
			return this.each( function(){
				$bf = $( this );
				$bf.fullyLoaded = false;
				$bf.timer = setTimeout( 
					function(){
						$bf.backgroundResize( options, false );
					},
					100
				);
				$( window ).resize( function() {
					if( navigator.platform == 'iPad' ){
						//window.location.reload();
					} else {
						$bf.backgroundResize( options, false );
					}
				});
			});
		},

		backgroundResize: function( options, timeout ){
			var $this = this,
				push = 0,
				widthToSet = 0,
				$img = $this.children( 'img' );
			$this.windowHeight = $( window ).height();
			$this.windowWidth = $( window ).width();
			$this.imgWidth = $img.width();
			$this.imgHeight = $img.height();
			$this.ratio = $this.imgWidth / $this.imgHeight;
			if( navigator.platform == 'iPad' ){
				$this.windowHeight = $( 'body' ).height();
				$this.windowWidth = $( 'body' ).width();
			}
			$this.css({ height: $this.windowHeight, width: $this.windowWidth, position: 'fixed', overflow:'hidden' });
			//I cannot get the ratios to match so I have to remove that as a catch
			if( $this.imgHeight > 0 && $this.imgWidth > 0 && ( $this.ratio == options.imgKnownWidth / options.imgKnownHeight || $this.fullyLoaded )){
				$this.fullyLoaded = true;
				if( $( 'body' ).hasClass( 'modelpage' ) ){
					//if the screen is a widescreen move the background image down 100px
					//1366x768  = 1.7786
					if( /push=true/.test( window.location.search ) || true ){
						if( screen.width / screen.height > 1.75 ) push -= 100;
						if($.browser.msie ) push -= 50;
					}
					if( navigator.platform == 'iPad' ) push = 'auto';
					$( 'div#background img' ).css({ bottom: push });
				}
				widthToSet = $this.windowWidth < options.minWidth ? options.minWidth : $this.windowWidth;
				$this.setByWidth( options, widthToSet );
			} else {
				//reset some values
				$this.imgWidth = $img.width();
				$this.imgHeight = $img.height();
				$this.ratio = $this.imgWidth / $this.imgHeight;
			}
			if( timeout ){
				$this.timer = setTimeout( 
					function(){
						$this.backgroundResize( options, true );
					},
					100
				);
			}
		}, 

		setByWidth : function( options, override ){
			var $this = this,
				widthToSet = override ? override : $this.windowWidth;
			$img = $this.children( 'img' );
			$img.attr( 'width', widthToSet )
			$img.attr( 'height', widthToSet / $this.ratio );
			if( options.fillWindow && $this.windowHeight > widthToSet / $this.ratio ) $this.setByWidth( options, $this.windowHeight * $this.ratio );
		},

		setByHeight : function( options, override ){
			var $this = this,
				heightToSet = override ? override : $this.windowHeight;
			$img = $this.children( 'img' );
			$img.attr( 'height', heightToSet )
			$img.attr( 'width', heightToSet * $this.ratio );
			if( options.fillWindow && $this.windowWidth > heightToSet * $this.ratio ) $this.setByheight( options, heightToSet++ );
		}
	});
})(jQuery);