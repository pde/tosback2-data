(function($){
	$.fn.extend({
		flexVideoGallery: function(options) {
			var defaults = {
			}
			var options =  $.extend(defaults, options);
			return this.each(function() {
				var $this = $( this ),
					emptyItemsArray = new Array();
				$this.parents( '.shadedContainer' ).css({ width: 980 });
				$( '.videoWraper .upperMid' ).append( '<div class="verticalLine top"></div>' );
				$( '.videoWraper .lowerMid' ).append( '<div class="verticalLine bottom"></div>' );
				$this.find( '#video .videoWraper .videoCaptionWrap' ).after( '<div id="thumbnailWrap"></div>' );
				$( '<div class="galleryItem"><h2>Gallery</h2></div>' ).appendTo( '.flexVideoGallery #video #thumbnailWrap' );
				//loop through the flexVideoItems to add thumbnails to thumbnail area
				$this.children( '.flexVideoItem' ).each( function(){
					if( $( this ).find( '.thumbnail' ).text().length > 0 ){
						$( '<div/>').addClass( 'galleryItem' ).click( function(){
							$this.thumbnailClick( options, $( this ).index() - 1 );
						}).append(
							$( '<div/>').addClass( 'thumbnail' ).css({ backgroundImage : 'url( "' + $( this ).find( '.thumbnail' ).text() + '" )' })
							.append( $( '<div/>').addClass( 'play' ))
						).append(
							$( '<div/>').addClass( 'text' ).html( $( this ).find( '.title' ).text() + '<br/>' +  $( this ).find( '.time' ).text())
						).append(
							$( '<div/>').addClass( 'clearfix' )
						).appendTo( '.flexVideoGallery #video #thumbnailWrap' );
					} else {
						emptyItemsArray[emptyItemsArray.length] = $( this ).index();
					}
					if( $( this ).index() == 0 ){
						$( '.flexVideoGallery #video #thumbnailWrap .galleryItem:eq(0) .thumbnail' ).addClass( 'playing' );
					}
				});
				//remove items that are not formed correctly
				for( n in emptyItemsArray.sort( $this.sortReverse ) ){
					$this.children( '.flexVideoItem' ).eq( emptyItemsArray[n] ).remove();
				}
				//height adjustment so border spans the entire height of the container
				var videoTitleHeight = $('.videoTitle').height();
				//height of video player will always be 388 pixels
				var bcHeight = 388;
				var thumbWrapHeight = $('#thumbnailWrap').height();
				var heightDifference = thumbWrapHeight - ( 388 + videoTitleHeight );
//				$this.find( '.videoCaptionWrap' ).css({height : heightDifference}); jeez, that was dumb 
			});
		},

		thumbnailClick: function( options, clicked ){
			var $this = this;
			//update the playing state of the thumbnails
			$( '.flexVideoGallery #video #thumbnailWrap .galleryItem .thumbnail' ).removeClass( 'playing' ).eq( clicked ).addClass( 'playing' );
			//update the title
			$this.find( '.videoTitle h2' ).text( $this.children( '.flexVideoItem' ).eq( clicked ).find( '.title' ).text() );
			//update the caption
			$this.find( '.videoCaptionWrap .videoCaption' ).text( $this.children( '.flexVideoItem' ).eq( clicked ).find( '.caption' ).text() );
			//update the ctas
			$this.find( '.videoCaptionWrap .actionContainer' ).remove();
			if( $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta1first' ).text().length > 0 ||
				$this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta1second' ).text().length > 0 ){
				var ctaHTML = '<div class="actionContainer">'
					+ '<a target="_blank" href="' + $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta1url' ).text() + '" class="button">'
					+ '<span class="genBtn gotham-bold">';
				if( $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta1first' ).text().length > 0 ){
					ctaHTML = ctaHTML + '<span class="highlightLinkColor">'
					+ $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta1first' ).text()
					+ '</span> ';
				}
				if( $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta1second' ).text().length > 0 ){
					ctaHTML = ctaHTML + $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta1second' ).text();
				}
				ctaHTML = ctaHTML + '</span></a></div>'
				$this.find( '.videoCaptionWrap' ).append( ctaHTML );
			}
			if( $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta2first' ).text().length > 0 ||
				$this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta2second' ).text().length > 0 ){
				var ctaHTML = '<div class="actionContainer">'
					+ '<a target="_blank" href="' + $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta2url' ).text() + '" class="button">'
					+ '<span class="genBtn gotham-bold">';
				if( $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta2first' ).text().length > 0 ){
					ctaHTML = ctaHTML + '<span class="highlightLinkColor">'
					+ $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta2first' ).text()
					+ '</span> ';
				}
				if( $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta2second' ).text().length > 0 ){
					ctaHTML = ctaHTML + $this.children( '.flexVideoItem' ).eq( clicked ).find( '.cta2second' ).text();
				}
				ctaHTML = ctaHTML + '</span></a></div>'
				$this.find( '.videoCaptionWrap' ).append( ctaHTML );
			}
			//update the video
			setVideo( $this.children( '.flexVideoItem' ).eq( clicked ).find( '.videoId' ).text());
			//refresh cufon
			if( typeof( Cufon ) == 'function' && Cufon.replace ){
				Cufon.replace( $this.find( '.videoCaptionWrap .actionContainer a' ), { fontFamily: 'gotham-bold', hover: true });
			}
		},

		sortReverse: function( a, b ){
			if( a == b ) return 0;
			return a < b ? 1 : -1;
		}
	});
})(jQuery);