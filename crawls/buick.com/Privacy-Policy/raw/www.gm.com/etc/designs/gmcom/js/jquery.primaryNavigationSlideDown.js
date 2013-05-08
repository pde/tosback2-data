//set the fx interval in ms
var pat = /interval=(\d*)/,
	results = pat.exec( window.location.search );
jQuery.fx.interval = results && results.length > 1 && parseInt( results[1] ) > 0 ? parseInt( results[1] ) : 25;
(function($){
	$.fn.extend({
		count   : 0,
		leftOff : 0,
		timer   : null,
		tndsoh  : 0,
		tnsdow  : 0,
		primaryNavigationSlideDown : function() {
			return this.each( function(){
				var $this = $( this ), //jQuerry the selected object
					$ul = $this.children( 'ul' ), //the list that holds the menu items
					$li = $( $ul.children( 'li:eq(0)' )),//this assumes all list item are the same size and width
					$activate = null, //Item to add active class to
					$hover = null, //Item to add hover to
					$slide = null; //Item to slide down 
				$ul.tnsdoh = $li.height() + parseInt( $li.css( 'marginTop' )) + parseInt( $li.css( 'paddingTop' )) + parseInt( $li.css( 'marginBottom' )) + parseInt( $li.css( 'paddingBottom' ));//the outer function were not correct values when they are hidden this workaround solves this problem
				if( typeof( Cufon ) == 'function' && Cufon.replace ){
					Cufon.replace( $this.children( 'h2' ).children( 'a' ), { fontFamily: 'gotham-bold', hover: true });
					//Cufon.replace( $this, { fontFamily: 'gotham-bold', hover: true });
				}
				$this.slideDownReposition( false );
				$this.timer = setTimeout( 
					function(){
						$this.slideDownReposition( true );
					},
					100
				);
				$( window ).resize( function() {
					$this.slideDownReposition( false );
				});

				$activate = $ul.parent().hasClass( 'active' ) ? null : $ul.parent();
				$.PRINAVTOUT;
				$hover = $ul.parent();
				$slide = $hover.children( 'ul' );
				$slide.css({ top: 45 });
				$hover.hover( 
					function(){
						if( typeof( Cufon ) == 'function' && Cufon.replace && $activate ){
							Cufon.replace( $this.children( 'h2' ).children( 'a' ), { fontFamily: 'gotham-bold', color: '#00B1E9', hover: true });
						}
						if( $activate ) $activate.addClass( 'active' );
						if(( true || /animate=true/.test( window.location.search )) && ( uri != '/content/gmcom/home' )){
							$slide.clearQueue();
							$slide.stop();
							// if($('html').hasClass('ie'))
							// 	$slide.show();
							// else
							$slide.show().animate({ height: $ul.tnsdoh }, 500 );
						} else {
							$slide.show().animate({ height: $ul.tnsdoh }, 500 );
						}
					},
					function(){
						if( typeof( Cufon ) == 'function' && Cufon.replace && $activate ){
							Cufon.replace( $this.children( 'h2' ).children( 'a' ), { fontFamily: 'gotham-bold', color: '#FFF', hover: true });
						}
						if( $activate ) $activate.removeClass( 'active' );
						if(( true || /animate=true/.test( window.location.search )) && ( uri != '/content/gmcom/home' )){
							$slide.clearQueue();
							$slide.stop();
							$slide.animate({ height: 0 }, 200, function(){
								$( this ).hide();
							});
						} else {
							$.PRINAVTOUT=setTimeout(function(){
								$slide.animate({ height: 0 }, 200, function(){
									$( this ).hide();
								});

							},100);
						}
					}
				);
				$( 'div#primaryNavigation ul li ul li' ).hover(
					function(){
						$( this ).addClass( 'active' );
						clearTimeout($.PRINAVTOUT);
					},
					function(){
						$( this ).removeClass( 'active' );;
					}
				);
			});
		},

		slideDownReposition : function( timeout ){
			var $this = $( this );
			$ul = $this.children( 'ul' ); //the list that holds the menu items
			$this.prevAll().each( function(){//get the position of th left edge of this
				$ul.leftOff = $ul.leftOff + $( this ).outerWidth() + parseInt( $( this ).css( 'marginLeft' )) + parseInt( $( this ).css( 'marginRight' ));
			});
			$li = $( $ul.children( 'li' )[0] );//this assumes all list item are the same size and width
			$ul.count = $ul.children( 'li' ).length;//howmany item are in the list 
			$ul.tnsdoh = $li.height() + parseInt( $li.css( 'marginTop' )) + parseInt( $li.css( 'paddingTop' )) + parseInt( $li.css( 'marginBottom' )) + parseInt( $li.css( 'paddingBottom' ));//the outer function were not correct values when they are hidden this workaround solves this problem
			$ul.tnsdow = $li.width() + parseInt( $li.css( 'marginLeft' )) + parseInt( $li.css( 'paddingLeft' )) + parseInt( $li.css( 'marginRight' )) + parseInt( $li.css( 'paddingRight' ));
			if( $( window ).width() - $ul.leftOff - $ul.tnsdow * $ul.count > 0 ){
				$ul.css({ left : $ul.leftOff });
			} else if( $( window ).width() - $ul.tnsdow * $ul.count > 0 ){
				$ul.css({ right: 0 });
			} else {
				$ul.css({ left : 0 });
			}
			$ul.css({ 
				height   : 0, 
				width    : $ul.tnsdow * $ul.count,
				overflow : 'hidden'
			});
		}
	});
})(jQuery);