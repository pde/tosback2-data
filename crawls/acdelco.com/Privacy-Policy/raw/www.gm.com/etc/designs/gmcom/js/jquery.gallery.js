function onYouTubePlayerReady( playerId ){
	ytplayer = document.getElementById( playerId );
	$( ytplayer ).parent().parent().attr( 'ytplayer', playerId ); 
}

//You need an anonymous function to wrap around your function to avoid conflict  
(function($){  

	//Attach this new method to jQuery  
	$.fn.extend({   

		timer    : null,

		//pass the options variable to the function  
		gallery: function( options ) {  

			//Set the default values, use comma to separate the settings, example:  
			var defaults = {
				height              : null,
				heightEnlarged      : null,
				width               : null,
				widthEnlarged       : null,
				autoAdvance         : true, //does the gallery automaticlly advance to the next item in the gallery
				animSpeed           : 500, //Slide transition speed
				pauseTime           : 30000, // Time between transitions
				startSlide          : 1, //Set starting Slide (1 index)
				directionNav        : true, //Next & Prev
				directionNavHide    : true, //Only show on hover

				controlNav          : true, //1,2,3...
				controlNavCount     : 5, //how many item to show in the control nav upper max

				enlarge             : false, //does the gallery elarge in a modal popup
				enlargeAttribute    : 'enlarge', //Attribute on the ul that is a selector fo the enlarged gallery.

				headerAttribute     : 'rel', //Attribute on the ul that has the header. Eithor a selector for an element or the text to use.

				captionAttribute    : 'title', //Attribute on the gallery item that has the caption. Eithor a selector for an element or the text to use.

				youTubeStart        : true, //If the gallery item is a youtube video start the video when it comes up.
				youTubePauseAdvance : true, //If youtube video is paused and in gallery of length greater than 1 advance to next item automaticly
				youTubeEndAdvance   : true, //If youtube video ends and in gallery of length greater than 1 advance to next item automaticly

				nameAppend          : 'Clone' //texdt to add to an element identified by id when it is cloned
			}

			var options = $.extend( defaults, options );  

			return this.each( function(){
				var $ulData = $( this );
				//add class to ul
				$ulData.before( '<div class=galleryWraper />' );
				var $ulWrap = $ulData.prev();
				$ulWrap.append( $ulData.hide().clone().attr( 'id', $ulData.attr( 'id' ) + options.nameAppend ).addClass( 'gallery' ).show());
				var $ul = $ulWrap.children( 'ul' );

				//set height and width outer element
				if( !isNaN( options.width ) && !isNaN( options.height )){
					$ul.css({
						height: options.height,
						width: options.width
					});
				}

				//set the height and width of child elements
				$ul.children().each( function(){
					$li = $( this );
					if( !isNaN( options.width ) && !isNaN( options.height )){
						$li.css({
							height: options.height,
							width: options.width
						});
					}
					$li.css({
						opacity: 0
					}).hide();
					$li.children().each( function(){
						$gallery = $( this );
						$gallery.css({
							height: '100%',
							width: '100%'
						});

						//since we are already looping through each item this is a great place to set up the captions
						if( options.captionAttribute && $gallery.attr( options.captionAttribute ).length > 0 && $gallery.attr( options.captionAttribute )){
							if( $( $gallery.attr( options.captionAttribute )).length > 0 ){
								$caption = $( $gallery.attr( options.captionAttribute )).hide().clone().attr( 'id', $gallery.attr( options.captionAttribute ) + options.nameAppend ).show();
							} else if( $gallery.attr( options.captionAttribute ).length > 0 ){
								$caption = $( "<div class='caption' >" + $gallery.attr( options.captionAttribute ) + "</div>" )
							}
							if( $caption.html().length > 103 ){
								$gallery.after(
									'<div class="captionBody">' +
										'<div class="captionCont">' + $caption.html() + '</div>' +
									'</div>' +
									'<div class="capLeftCorn">' +
										'<div class="capRightCorn">' +
											'<div class="capMiddle" />' +
										'</div>' +
									'</div>'
								);
								$gallery.siblings( 'div.captionBody, div.capLeftCorn' ).css({ width : $gallery.parent().width() - 4 });
							}
						}
						$gallery.attr( 'title', '' );
					});
				});

				//Using headerAttribute to build header
				if( options.headerAttribute && $ul.attr( options.headerAttribute ).length > 0 ){
					if( $( $ul.attr( options.headerAttribute )).length > 0 ){
						$( $ul.attr( options.headerAttribute )).hide();
						if( $( $ul.attr( options.headerAttribute )).text() > 0 ){
							$ul.before( $( $ul.attr( options.headerAttribute )).clone().attr( 'id', $gallery.attr( options.captionAttribute ) + options.nameAppend ).show());
						}
					} else if( $ul.attr( options.headerAttribute ).length > 0 ){
						$ul.before( "<h2 class='header' >" + $ul.attr( options.headerAttribute ) + "</h2>" );
					}
				}
				//Create the enlarge links
				if( options.enlarge ){
					$ul.after( '<a href="javascript:void(0);" class=enlargeLink>Enlarge Image</a>' )
					$ul.siblings( '.enlargeLink' ).click( function(){
						$ul.showModalGallery( options );
					});
					
					if( $ul.attr( options.enlargeAttribute ) && $ul.attr( options.enlargeAttribute ).length > 0 && $( $ul.attr( options.enlargeAttribute )).length > 0 ){
						$( $ul.attr( options.enlargeAttribute )).hide();
					}
				}
				//add cufon to the fonts
				if( typeof( Cufon ) == 'function' && Cufon.replace ){
					$ul.applyCufon( 'div.galleryWraper span.gotham-book-dynamic-gallery:visible' );
					//Cufon.replace( $ul.find( '.gotham-bold-dynamic-gallery' ), { fontFamily: 'gotham-bold',   hover: true });
					//Cufon.replace( $ul.find( '.gotham-book-dynamic-gallery' ), { fontFamily: 'gotham-book',   hover: true });
				}
				// Add transistions only if there is more than one gallery item
				if( $ul.children().length > 1 ){
					$firstChild = $ul.children( ':first-child' ).clone().addClass( 'clone');
					$lastChild  = $ul.children( ':last-child'  ).clone().addClass( 'clone');

					$ul.append( $firstChild ).prepend( $lastChild );
					$ul.children().each( function( i ){
						$( this ).css({ zIndex: $ul.children().length - i });
					});
					//Set the first visibal slide
					if( options.startSlide && $ul.children().length - 2 >= options.startSlide ){
						$ul.children().eq( options.startSlide ).addClass( 'active' ).show();
					} else {
						$ul.children().eq( 1 ).addClass( 'active' ).show();//if startSlide invalid start at slide 1 
					}
					$( 'li.active' ).css({ opacity: 1 });

					//Start the video if the side is a video or starts the auto advancing
					if( options.youTubeStart && ( $ul.children( '.active' ).children( ':first-child' ).is( 'object' ) || !$ul.children( '.active' ).children( ':first-child' ).is( 'img' ))){
						$ul.startPlayBack( options );
					} else if( options.autoAdvance ){
						$ul.timer = setTimeout( 
							function(){ 
								$ul.transitionNext( options );
							},
							options.pauseTime
						);
					}
					//Create the next and prev arrow nav
					if( options.directionNav ){
						$ul.after( '<div id=' + $ul.attr( 'id' ) + ' class=galleryNext >Next</div>' );
						$ul.after( '<div id=' + $ul.attr( 'id' ) + ' class=galleryPrev >Prev</div>' );
						$ul.prevNav = $ul.next();
						$ul.nextNav = $ul.prevNav.next();
						//must push down the nav by the height of the header and the wraper's padding-top
						$ul.prevNav.css({
							top: ( $ul.outerHeight() / 2 - $ul.prevNav.outerHeight() / 2 ) + $ul.prev().outerHeight( true ) + parseInt( $ul.parent().css( 'paddingTop' )),
							zIndex: $ul.children().length + 1
						}).click( function(){
							if( $( $ul.children( '.active' )).queue() == 0 ){
								$ul.advancePrev( options );
							}
						});
						$ul.nextNav.css({
							left: ( $ul.outerWidth() - $ul.nextNav.outerWidth()),
							top: ( $ul.outerHeight() / 2 - $ul.nextNav.outerHeight() / 2 ) + $ul.prev().outerHeight( true ) + parseInt( $ul.parent().css( 'paddingTop' )),
							zIndex: $ul.children().length + 1
						}).click( function(){
							if( $( $ul.children( '.active' )).queue() == 0 ){
								$ul.advanceNext( options );
							}
						});
					}
					//Make the next and prev arrow nav only show when hovering the
					if( options.directionNavHide && $ul.prevNav && $ul.nextNav ){
						$ul.prevNav.hide();
						$ul.nextNav.hide();
						$ul.parent().hover(
							function(){
								$ul.prevNav.show();
								$ul.nextNav.show();
							},
							function(){
								$ul.prevNav.hide();
								$ul.nextNav.hide();
							}
						);
					}
					//Create the number nav below the gallery
					if( options.controlNav ){
						$ul.pagination( options, 0 );
					}
				} else { //Only one item in the gallery
					$ul.children().show();
					$ul.children().each( function(){
						$( this ).addClass( 'active' ).css({ opacity: 1 });
						//If the only item is a video start it
						if( options.youTubeStart && ( $( this ).children( ':first-child' ).is( 'object' ) || !$( this ).children( ':first-child' ).is( 'img' ))){
							$ul.startPlayBack( options );
						}
					});
				}
			});
		},

		applyCufon: function( target ){
			var $this = this,
				$target = $( target ).eq( 0 );
			if( $target.is( ':visible' )){
				Cufon.replace( $( 'div.galleryWraper' ).find( '.gotham-bold-dynamic-gallery:visible' ), { fontFamily: 'gotham-bold',   hover: true });
				Cufon.replace( $( 'div.galleryWraper' ).find( '.gotham-book-dynamic-gallery:visible' ), { fontFamily: 'gotham-book',   hover: true });
			} else {
				setTimeout( 
					function(){
						$this.applyCufon( target );
					},
					250
				);
			}
		},

		startPlayBack: function( options ){
			var $this = this;
			if( $( 'ul#' + this.attr( 'id' )).attr( 'ytplayer' )){
				this.ytplayer = document.getElementById( $( 'ul#' + this.attr( 'id' )).attr( 'ytplayer' ));
			}
			if( this.ytplayer && !$( this.ytplayer ).parent().is( ':visible' )){
				this.ytplayer = null;
				$( 'ul#' + this.attr( 'id' )).attr( 'ytplayer', null );
			}
			if( this.ytplayer && $( this.ytplayer ).parent().is( ':visible' ) && !$( this.ytplayer ).parent().hasClass( 'clone' )){
				try {
					this.ytplayer.playVideo();
					this.monitorState( options );
				} catch (e){
					//do nothing
				}
			} else {
				this.timer = setTimeout( 
					function(){ 
						$this.startPlayBack( options );
					},
					100
				);
			}
		},

		monitorState: function( options ){
			var $this = this;
			this.ytplayer = document.getElementById( $( 'ul#' + this.attr( 'id' )).attr( 'ytplayer' ));

			if( this.ytplayer ){
				var state = this.ytplayer.getPlayerState();
				if( options.autoAdvance && (( state == 0 && options.youTubeEndAdvance ) || ( state == 2 && options.youTubePauseAdvance ))){
					if( $( this.ytplayer ).parent().parent().children().length > 1 ){
						$( 'ul#' + this.attr( 'id' )).attr( 'ytplayer', null );
						this.timer = setTimeout( 
							function(){ 
								$this.transitionNext( options );
							},
							options.pauseTime
						);
					}
				} else {
					this.timer = setTimeout( 
						function(){ 
							$this.monitorState( options );
						},
						1000
					);
				}
			}
		},

		transitionNext: function( options, position ){
			var $this = this,
				$active = $( this.children( '.active' )),
				$next = null;

			if( position ){
				$next = $this.children().eq( position );
			} else {
				$next = $active.next();
			}

			$active.animate(
				{
					opacity: 0
				},
				options.animSpeed,
				function(){
					$active.hide().removeClass( 'active' );
				}
			);
			$next.show().animate(
				{
					opacity: 1
				},
				options.animSpeed,
				function(){
					if( $next.hasClass( 'clone' )){
						$next.parent().children().eq( 1 ).addClass( 'active' ).css({ opacity: 1 }).show();
						$next.hide().css({ opacity: 0 });

					} else {
						$next.addClass( 'active' );
					}
					//add the cufon to the caption
					$ul.applyCufon( 'div.galleryWraper span.gotham-book-dynamic-gallery:visible' );
					if( options.controlNav ){
						var loop = 0;
						$this.children().each( function(){
							if( $( this ).hasClass( 'active' )){
								$this.pagination( options, loop );
							}
							loop++;
						});
					}
				}
			);
			if( options.youTubeStart && $next.children().eq( 0 ).is( 'object' )){
				this.startPlayBack( options );
			} else if( options.autoAdvance ){
				this.timer = setTimeout( 
					function(){ 
						$this.transitionNext( options, null );
					},
					options.pauseTime
				);
			}
		},

		advanceNext: function( options, position ){
			if( options ){
				$( 'ul#' + this.attr( 'id' )).attr( 'ytplayer', null );
				clearTimeout( this.timer );
				this.transitionNext( options, position );
			}
		},

		transitionPrev: function( options ){
			var $this = this;
				$active = $( this.children( '.active' )),
				$prev = $active.prev();

			$active.animate(
				{
					opacity: 0
				},
				options.animSpeed,
				function(){
					$active.hide().removeClass( 'active' );
				}
			);
			$prev.show().animate(
				{
					opacity: 1
				},
				options.animSpeed,
				function(){
					if( $prev.hasClass( 'clone' )){
						$prev.parent().children().eq( $prev.parent().children().length - 2 ).addClass( 'active' ).css({ opacity: 1 }).show();
						$prev.hide().css({ opacity: 1 });
					} else {
						$prev.addClass( 'active' );
					}
					//add the cufon to the caption
					$ul.applyCufon( 'div.galleryWraper span.gotham-book-dynamic-gallery:visible' );
					if( options.controlNav ){
						var loop = 0;
						$this.children().each( function(){
							if( $( this ).hasClass( 'active' )){
								$this.pagination( options, loop );
							}
							loop++;
						});
					}
				}
			);
			if( options.youTubeStart && $prev.children().eq( 0 ).is( 'object' )){
				this.startPlayBack( options );
			} else if( options.autoAdvance ){
				this.timer = setTimeout( 
					function(){ 
						$this.transitionNext( options ); //keeps the transitions going from first to last
					},
					options.pauseTime
				);
			}
		},

		advancePrev: function( options ){
			if( options ){
				clearTimeout( this.timer );
				this.transitionPrev( options );
			}
		},

		showModalGallery : function( options ){
			var pat = '(^\\w*)' + options.nameAppend
				regex = new RegExp( pat ),
				result = regex.exec( $( this ).attr( 'id' )),
				id = result[1],
				$ul = $( '#' + id ),
				$body = $( 'body' ),
				$this = this,
				position = 1,
				loop = 0;
			if( $( this ).attr( options.enlargeAttribute ) && $( this ).attr( options.enlargeAttribute ).length > 0 && $( $( this ).attr( options.enlargeAttribute )).length > 0 ){
				$ul = $( $( this ).attr( options.enlargeAttribute ));
			}
			$this.children( 'li' ).each( function(){
				if( $( this ).is( '.active' )) position = loop;
				loop ++;
			});
			$body.append( '<div class="modalOffClick"></div>' );
			$body.append(
				'<div class="shadedContainerPop" >' +
					'<div id="upperRow">' +
						'<div class="upperLeft opacity70"></div>' +
						'<div class="upperRight opacity70"></div>' +
						'<div class="upperMid opacity70"></div>' +
					'</div>' +
					'<div class="midRow">' +
						'<div class="midLeft opacity70">' +
							'<div class="midRight opacity70">' +
								'<div class="midMid opacity70">' +
									'<div class="actionContainer">' +
										'<a href="javascript:void(0);" class="button gotham-bold-dynamic-gallery">' +
											'<span class="genBtn ">Close</span>' + 
										 '</a>' + 
									 '</div>' +
									'<div class="clearfix"></div> ' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="lowerRow">' +
						'<div class="lowerLeft opacity70"></div>' +
						'<div class="lowerRight opacity70"></div>' +
						'<div class="lowerMid opacity70"></div>' +
					'</div>' +
				'</div>'
			);
			$( "div.shadedContainerPop div.midMid" ).children( ":last-child" ).before( $ul.clone() );
			$( "div.shadedContainerPop" ).css({ height: options.heightEnlarged + 140, width: options.widthEnlarged + 60 });
			$( "div.shadedContainerPop" ).css({ 
				left: Math.max( 0, $( window ).width() / 2 - $( "div.shadedContainerPop" ).outerWidth( true ) / 2 ),
				top: Math.max( 0, $( window ).height() / 2 - $( "div.shadedContainerPop" ).outerHeight( true ) / 2 )
			});
			var modalOptions = {
				width      : options.widthEnlarged,
				height     : options.heightEnlarged,
				enlarge    : false,
				nameAppend : 'Modal',
				startSlide : position
			}
			modalOptions = $.extend( {}, options, modalOptions );
			$( 'div.shadedContainerPop ul' ).gallery( modalOptions );
			$( 'div.shadedContainerPop div.galleryWraper' ).css({ 
				height        : options.heightEnlarged + $( 'div.shadedContainerPop div.galleryWraper .header' ).outerHeight( true ),
				marginLeft    : 27,
				paddingTop    : 93 - $( 'div.shadedContainerPop div.galleryWraper .header' ).outerHeight( true ),
				paddingBottom : 33,
				width         : modalOptions.width
			});
			$( 'div.shadedContainerPop div.galleryWraper .header' ).before( '<a href="#" class=printLink>Print</a>' );
			//<!-- AddThis Button BEGIN -->
			$( 'div.shadedContainerPop div.galleryWraper .header' ).before(
				'<div id="addThis_container" class="gotham-medium-dynamic-gallery">' +
					'<a href="#" id="addThis_custom_link" class="addThisGallery">Add This:</a>' +
					'<div class="addthis_toolbox">' +
						'<a class="addthis_button_facebook"><span></span></a>' +
						'<a class="addthis_button_twitter"><span></span></a>' +
						'<a class="addthis_button_blogger"><span></span></a><br />' +
						'<a class="addthis_button_google"><span></span></a>' +
						'<a class="addthis_button_myspace"><span></span></a>' +
						'<a class="addthis_button_tumblr"><span></span></a>' +
					'</div>' +
				'</div>'
			);
			$( '#addThis_container .addthis_toolbox' ).css({ opacity: 0, top: 0, left: $( 'a#addThis_custom_link:visible' ).outerWidth() - 50 }).hide();
			//<!-- AddThis Button End -->
			$( 'div.shadedContainerPop div.galleryWraper ul li .enlargeLink' ).remove();
			if( !$( 'body' ).hasClass( 'visionconfigpage' )){
				//this causes an issue with the tracking
				$( "div.actionContainer a" ).click( function(){
					$( "div.modalOffClick,div.shadedContainerPop" ).remove();
				});
			}
			if( typeof( Cufon ) == 'function' && Cufon.replace ){
				Cufon.replace( $( 'div.shadedContainerPop .gotham-bold-dynamic-gallery'   ), { fontFamily: 'gotham-bold',   hover: true });
				Cufon.replace( $( 'div.shadedContainerPop .gotham-medium-dynamic-gallery' ), { fontFamily: 'gotham-medium', hover: true });
			}
		},

		pagination : function( options, position ){

			var $ul = this,
				$controlNav = null,
				start = $ul.children().length - 2 <= options.controlNavCount ? 1 : Math.max( 1, position - 2 ),
				end = Math.min( options.controlNavCount, $ul.children().length - 2 ) + start - 1,
				length = $ul.children().length - 2;
			end = end > length ? length : end
			start = Math.max( 1, start > end - ( options.controlNavCount - 1 ) ? end - ( options.controlNavCount - 1 ) : start );
			if( position == 0 ){
				if( options.startSlide && $ul.children().length - 2 >= options.startSlide ){
					position = options.startSlide;
				} else {
					position = 1;
				}
			}
			if( $ul.siblings( '.controlNav' ).length <= 0 ){
				$controlNav = $( "<div class='controlNav'></div>" ).appendTo( $ul.parent() );
			} else {
				$controlNav = $ul.siblings( '.controlNav' );
			}
			$controlNav.html( '' );
			for( var i = start; i <= end; i++ ){
				switch( true ){
					case i == start && i == position://no arrow highlight first item active
						$controlNav.append( "<a class='controlNavItemPrev' href='javascript:void(0);' >&laquo;</a>" );
						$controlNav.append( "<a class='controlNavItem active' href='javascript:void(0);' >" + i + "</a>" );
						break;
					case i == start && end <= options.controlNavCount://arrow highlight first item not active
						$controlNav.append( "<a class='controlNavItemPrev highlight' href='javascript:void(0);' >&laquo;</a>" );
						$controlNav.append( "<a class='controlNavItem' href='javascript:void(0);' >" + i + "</a>" );
						break;
					case i == start && end > options.controlNavCount://arrow highlight first ellips
						$controlNav.append( "<a class='controlNavItemPrev highlight' href='javascript:void(0);' >&laquo;</a>" );
						$controlNav.append( "<span>&hellip;</span>" );
						break;
					case i != end && i == position://middle item active
						$controlNav.append( "<a class='controlNavItem active' href='javascript:void(0);' >" + i + "</a>" );
						break;
					case i == end && i == position://no arrow highlight last item active
						$controlNav.append( "<a class='controlNavItem active' href='javascript:void(0);' >" + i + "</a>" );
						$controlNav.append( "<a class='controlNavItemNext' href='javascript:void(0);' >&raquo;</a>" );
						break;
					case i == end && end == length://arrow highlight last not active
						$controlNav.append( "<a class='controlNavItem' href='javascript:void(0);' >" + i + "</a>" );
						$controlNav.append( "<a class='controlNavItemNext highlight' href='javascript:void(0);' >&raquo;</a>" );
						break;
					case i == end && end < length://arrow highlight last ellips
						$controlNav.append( "<span>&hellip;</span>" );
						$controlNav.append( "<a class='controlNavItemNext highlight' href='javascript:void(0);' >&raquo;</a>" );
						break;
					default://middle item not active
						$controlNav.append( "<a class='controlNavItem' href='javascript:void(0);' >" + i + "</a>" );
				}
			}
			$controlNav.children( '.controlNavItem' ).click( function(){
				if( !$( this ).is( '.active' ) && !isNaN( $( this ).text() * 1 ))
					$ul.advanceNext( options, $( this ).text() );
			});
			$controlNav.children( '.controlNavItemPrev' ).click( function(){
				if( $( $ul.children( '.active' )).queue() == 0 ){
					$ul.advancePrev( options );
				}
			});
			$controlNav.children( '.controlNavItemNext' ).click( function(){
				if( $( $ul.children( '.active' )).queue() == 0 ){
					$ul.advanceNext( options );
				}
			});
		}
	});
})(jQuery);
