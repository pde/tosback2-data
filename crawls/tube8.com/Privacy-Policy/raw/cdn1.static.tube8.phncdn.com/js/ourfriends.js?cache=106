/**
*
* Our Friends FlipBook jQuery Plugin
* This method gives flipbook behavior to the images in the "Our Friends" videos.
* 
* NOTE: jQuery 1.7 suggest .on(), but some sites are not there yet, so sticking with .bind() .
*
*/
( function( $ ) {
		var settings = {
			namespace	: "flipbook",
			delay		: 600
		};
		var data = {
			inProgress	: false,
			timer		: false
		}
		var callbacks = {
			// Initializes plugin & all jQuery object elements:
			init : function( options ) {
				if( options ) {
					$.extend(settings, options);
				}
				return this.each( function() {
					var $this = $(this);
					$this.data("indexes."+settings.namespace, settings.indexes);
					$this.data("path."+settings.namespace, settings.path);
					$this.bind("mouseover."+settings.namespace, callbacks.mouseover);
					$this.bind("mouseout."+settings.namespace, callbacks.mouseout);
				});
			},
			destroy	: function() {
				this.each( function() {
					$(this).unbind("."+settings.namespace);
				});
			},
			mouseover	: function() {
				var $this	 = $(this);
				//$.fn.flipBook.inProgress = $this;
				data.inProgress = $this;
				$this.data("original."+settings.namespace, $this.attr("src"));
				callbacks.flip();
				return true;
			},
			mouseout	: function() {
				var $this = data.inProgress;
				if( !$this ) {
					return false;
				}
				clearInterval( data.timer );
				data.timer = false;
				$this.data("position."+settings.namespace, 0);
				$this.attr("src", $this.data("original."+settings.namespace) );
				$this = false;
				return true;
			},
			flip	: function() {
				var $this = data.inProgress;
				if( !$this ) {
					return false;
				}
				var path	 = $this.data("path."+settings.namespace);
				var indexes	 = $this.data("indexes."+settings.namespace);
				var max		 = indexes.length-1;
				var position = $this.data("position."+settings.namespace);
					position = position > 0 && position <= max ? position : 0;
				if( !path || !indexes || !max ) {
					return $this; // Die gracefully
				}
				$this.attr("src", path.replace("{index}",indexes[position]) );
				$this.data("position."+settings.namespace, ++position);
				if( !data.timer ) {
					data.timer = setInterval(callbacks.flip, settings.delay);
				}
				return $this;
			}
		};

	$.fn.flipBook = function( arg ) {
		if( callbacks[arg] ) {
			return callbacks[arg].apply(this);
		} else if( typeof arg === 'object' || !arg ) {
			return callbacks.init.apply(this, arguments);
		} else {
			return this;
		}
	};
} )( jQuery );