(function($){
	$.fn.extend({

		//pass the options variable to the function
		modal : function(options) {

			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				attr         : 'rel',
				height       : 0,
				opacity      : 70,
				width        : 300,
				top          : 120,
				fixed        : true,
				hideOrRemove : 'remove'
			}

			var options =  $.extend(defaults, options);

			return this.each(function() {
				var $this = $( this );
				if( $( $this.attr( options.attr )).length > 0 ){
					$( $this.attr( options.attr )).hide();
				}
				$this.click( function(e){
					$this.showModal( options );
					e.preventDefault();
				});
			});
		},

		showModal : function( options ){
			var $this = $( this ),
				$body = $( 'body' ),
				$content = '',
				width = 0,
				height = 0;
				
			if( $( 'div.shadedContainerPop' ).length > 0) {
				$( 'div.modalOffClick,div.shadedContainerPop' ).show();
				if ($('body').is('#contactUs')) { 
					$('#contactUs div.shadedContainerPop #help-me-find-form').show();
					$('#contactUs div.shadedContainerPop #general-form').hide();
				}
				return;
			} else if( $( 'div.modalOffClick' ).length > 0 ) {
				return;
			}
			
			$body.append( '<div class="modalOffClick"></div>' );
			if( $( $this.attr( options.attr )).length > 0 ){
				if( options.hideOrRemove == 'hide' ){
					$content = $( $this.attr( options.attr )).eq( 0 ).detach().show();
				} else {
					$content = $( $this.attr( options.attr )).eq( 0 ).clone().show();
				}
			}
			$body.append(
				'<div class="shadedContainerPop" >' +
					'<div id="upperRow">' +
						'<div class="upperLeft opacity' + options.opacity + '"></div>' +
						'<div class="upperRight opacity' + options.opacity + '"></div>' +
						'<div class="upperMid opacity' + options.opacity + '"></div>' +
					'</div>' +
					'<div class="midRow">' +
						'<div class="midLeft opacity' + options.opacity + '">' +
							'<div class="midRight opacity' + options.opacity + '">' +
								'<div class="midMid opacity' + options.opacity + '">' +
									'<div class="wrapActionContainer">' +
										'<div class="actionContainer">' +
											'<a href="#" class="button">' +
												'<span class="genBtn">Close</span>' + 
											 '</a>' + 
											 '</div>' +
									 '</div>' +
									'<div class="clearfix"></div> ' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="lowerRow">' +
						'<div class="lowerLeft opacity' + options.opacity + '"></div>' +
						'<div class="lowerRight opacity' + options.opacity + '"></div>' +
						'<div class="lowerMid opacity' + options.opacity + '"></div>' +
					'</div>' +
				'</div>'
			);
			$( "div.shadedContainerPop div.midMid" ).children( ":last-child" ).before( $content );
			
			$( "div.shadedContainerPop" ).css({ width: options.width });
			height = Math.max( options.height, $( "div.shadedContainerPop" ).outerHeight( true ));
			width  = Math.max( options.width,  $( "div.shadedContainerPop" ).outerWidth(  true ));
			var newLeft = Math.max( $( window ).width()  / 2 -  width  / 2, 0 );
			if( navigator.platform == 'iPad' && $( 'body' ).hasClass( 'tabpage' )){
				newLeft = 200;
			}
			if (options.fixed) {
				$( "div.shadedContainerPop" ).css({ 
					left: newLeft,
					top:  Math.max( $( window ).height() / 2 -  height / 2, 0 ),
					position: "fixed"
				});
			}
			else {
				$( "div.shadedContainerPop" ).css({ 
					left: newLeft,
					top:  options.top,
					position: "absolute"
				});
			}

			$( "div.wrapActionContainer div.actionContainer" ).click( function( e ){
				e.preventDefault();
				if( options.hideOrRemove == 'hide' ){
					$( "div.modalOffClick,div.shadedContainerPop" ).hide();
				} else {
					//this causes an issue with the tracking
					if( !$( 'body' ).hasClass( 'visionconfigpage' )){
						if( $( 'object#bcplayer' ).length > 0 ){
							swfobject.removeSWF("bcplayer");
						}
						$( "div.modalOffClick,div.shadedContainerPop" ).remove();
					}
				}
			});
																														// ie7,8 throw errors on container close
			if( typeof( Cufon ) == 'function' && Cufon.replace && (!$('html').hasClass('ie7') && !$('html').hasClass('ie8')) ){
				Cufon.replace( 'div.shadedContainerPop h3:visible, div.shadedContainerPop div.actionContainer', {
					fontFamily: 'gotham-bold',
					hover: true
				});
			}

			// move to a callback function specific to the contact us page.
			/*
			if ($('body').is('#contactUs')) { 
				$('#contactUs div.shadedContainerPop #help-me-find-form').show(); // show the child div - this is hidden in the css
				$('select.select').bind('change', function(e) {
					// select change handler - IE7 fix
					//$(this).parent().checkBox('toggle');
				});
			}
			*/						
			
		}
	});
})(jQuery);