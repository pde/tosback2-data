(function($){
	$.fn.extend({
		slider : function( options ){
			var defaults = {

				stops      : 7, //the number of stops on the slider
				width      : 650,
				offset     : 25,
				step       : 100,
				leftColumn : 200, //sets the upper limit to the left column
				minWidth   : 980,
				fillChar   : '_'
			}
			var options =  $.extend( defaults, options );

			return this.each( function() {
				var $this = $( this );
				var $sliderData = $( this ).children( 'ul' );
				$this.hide();
				$this.before( "<div id=sliderContainer />" );
				var $sliderContainer = $( 'div#sliderContainer' );
				$sliderContainer.append( '<ul id=sliderContent/>' );
				var newPosition = options.offset;

				$sliderContainer. append(
					'<div class="shadedContainer sliderBackground">' +
						'<div class="upperRow">' +
							'<div class="upperLeft opacity70"></div>' +
							'<div class="upperRight opacity70"></div>' +
							'<div class="upperMid opacity70"></div>' +
						'</div>' +
						'<div class="midRow">' +
							'<div class="midLeft opacity70">' +
								'<div class="midRight opacity70">' +
									'<div class="midMid opacity70">' +
										'<div class="clearfix"></div>' +
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

				//create the slider
				$( '<h2 id=sliderTitle />' ).text( $sliderData.children( 'li:eq(0)' ).find( 'span.colorText' ).text()).prependTo( 'div.shadedContainer div.midMid' );
				$( 'h2#sliderTitle' ).after( $( '<div id=slideTrack />' ).css({ width: options.width }));;
				//add the stops
				for( var i = 0; i < options.stops; i++ ){
					$( 'div#slideTrack' ).append( $( '<div id=slideStop' + ( options.step * i + options.offset ) + ' class=stop />' ).css({ left: ( options.step * i + options.offset )}));
				}
				//click handler to slideTrack
				$( 'div#slideTrack' ).click( {}, function( e ){
					$sliderData.addressUpdate( options, e.pageX - options.leftColumn );
				});

				//create labels bellow slider
				$( 'div#slideTrack' ).after( '<ul id=stopLabels />' );
				$sliderData.children( 'li' ).each( function(){
					//when creating the label we need to strip away any spechial characters
					$( this ).attr( 'title', $( this ).attr( 'title' ).replace( /\s/g, options.fillChar ).replace( /[\W]/g, '' ));
					$( '<li/>' ).html( $( this ).children( 'p.sliderText' ).html()).attr( 'title', $( this ).attr( 'title' )).appendTo( 'ul#stopLabels' );
				});

				//place the ctas in the slider
				$( 'div.midMid' ).children( ':last-child' ).before( $this.children( 'div#sliderCTAWraper' ).clone());
				//apply Cufon to the ctas in the slider
				if( typeof( Cufon ) == 'function' && Cufon.replace ){
					$( 'div#sliderCTAWraper .gotham-bold-dynamic:visible' ).each( function(){
						if( $( this ).parents( 'a' ).length > 0 ){
							Cufon.replace( $( this ).parents( 'a' ), { fontFamily: 'gotham-bold', hover: true });
						} else {
							Cufon.replace( $( this ), { fontFamily: 'gotham-bold', hover: true });
						}
					});
				}

				//if jQuery address is included and a valus is set update the values accodingly
				if( typeof( $.address.value ) == 'function' ){
					var value = $.address.value(),
						addressRegEx = /\/(.*)/,
						pat = new RegExp ( options.fillChar, 'g' ),
						result = null;
					if( addressRegEx.test( value )){
						result = addressRegEx.exec( value );
						//newTitle = result[1].replace( pat, ' ' );
						newTitle = result[1];
					}
					//bind a function to address change
					$.address.change( function(){
						var value = $.address.value(),
							addressRegEx = /\/(.*)/,
							pat = new RegExp ( options.fillChar, 'g' ),
							result = null;
						if( addressRegEx.test( value )){
							result = addressRegEx.exec( value );
							//newTitle = result[1].replace( pat, ' ' );
							//alert( newTitle );
							newTitle = result[1];
							$sliderData.moveSlider( options, $sliderData.titlePosition( options, newTitle ));
						}
					});
				}
				$sliderData.moveSlider( options, $sliderData.titlePosition( options, newTitle ));

				//adjust the width of the left column
				$sliderData.leftColumnResize( options, false );
				$sliderData.timer = setTimeout(
					function(){
						$sliderData.leftColumnResize( options, true );
					},
					100
				);
				$( window ).resize( function() {
					$sliderData.leftColumnResize( options, false );
				});
			});
		},

		addressUpdate : function( options, offset ){
			position = 0
			switch( true ){
				case offset <= options.step * 1 + options.offset - options.step / 2:
					position = 0;
					break;
				case offset <= options.step * 2 + options.offset - options.step / 2:
					position = 1;
					break;
				case offset <= options.step * 3 + options.offset - options.step / 2:
					position = 2;
					break;
				case offset <= options.step * 4 + options.offset - options.step / 2:
					position = 3;
					break;
				case offset <= options.step * 5 + options.offset - options.step / 2:
					position = 4;
					break;
				case offset <= options.step * 6 + options.offset - options.step / 2:
					position = 5;
					break;
				case offset <= options.step * 7 + options.offset - options.step / 2:
				default:
					position = 6;
					break;
			}

			if( typeof( $.address.value ) == 'function' && $( 'div#background img:last-child' ).queue().length <= 0){
				$.address.value( this.children( ':eq(' + position + ')').attr( 'title' ).replace( /\s/g, options.fillChar ));
			}
		},

		moveSlider : function( options, position ){
			
			
			if( $( 'div#background img' ).queue().length <= 0 ){
				var $this = this;
				var $newContent = this.children( ':eq(' + ( position - options.offset ) / options.step + ')').clone().css({ opacity: 0 });
				//remove active state
				$( 'div#slideTrack' ).children().each( function(){ $( this ).removeClass( 'active' )});
				$( 'ul#stopLabels' ).children().each( function(){ $( this ).removeClass( 'active' )});
				//add active state
				$( 'div#slideStop' + position ).addClass( 'active' );
				$( 'ul#stopLabels' ).children( ':eq(' + ( position - options.offset ) / options.step + ')').addClass( 'active' );

				$( 'div#background' ).append( $newContent.children( 'img:eq(0)' ).css({ opacity: 0 }).attr( 'height', null ).attr( 'width', null ));
				if( $( 'div#background' ).children( 'img' ).length > 1 ){
					$( 'div#background img:eq(0)' ).animate({ opacity: 0 }, 'slow', function(){ $( this ).remove()});
				}
				$( 'div#background img:last-child' ).animate({ opacity: 1 }, 'slow', function(){
					if( $( this ).siblings().length > 0 ){
						$( this ).siblings().remove();
					}
				});
	
				//add new item to content area
				$newContent.children( 'p:eq(0)' ).remove();
				$( 'div#sliderContainer ul#sliderContent' ).append( $newContent );
				if( $( 'div#sliderContainer ul#sliderContent' ).children( 'li' ).length > 1 ){
					$( 'div#sliderContainer ul#sliderContent li:eq(0)' ).animate({ opacity: 0 }, 'slow', function(){ $( this ).remove()});
				}
				$( 'div#sliderContainer ul#sliderContent li:last-child' ).animate({ opacity: 1 }, 'slow', function(){
					if( $( this ).siblings().length > 0 ){
						$( this ).siblings().remove();
					}
					if( typeof( Cufon ) == 'function' && Cufon.replace ){
						//Cufon.replace( 'ul#sliderContent .gotham-bold-dynamic' , { fontFamily: 'gotham-bold', hover: true });
						$( 'ul#sliderContent .gotham-bold-dynamic' ).each( function(){
							if( $( this ).parents( 'a' ).length > 0 ){
								Cufon.replace( $( this ).parents( 'a' ), { fontFamily: 'gotham-bold', hover: true });
							} else {
								Cufon.replace( $( this ), { fontFamily: 'gotham-bold', hover: true });
							}
						});
					}
				});

				//if tab does not exist create it
				if( $( 'div#sliderTab' ).length <= 0 ){
					$( '<div id=sliderTab />' ).mousedown( function(){
						$( this ).parent().mousemove( {}, function( e ){
							var newLeft = e.pageX < parseInt( $( 'div#slideTrack' ).parent().css( 'paddingLeft' )) ? parseInt( $( 'div#slideTrack' ).parent().css( 'paddingLeft' )) : e.pageX;
							newLeft = newLeft > parseInt( $( 'div#slideTrack' ).parent().css( 'paddingLeft' )) + options.width ? parseInt( $( 'div#slideTrack' ).parent().css( 'paddingLeft' )) + options.width : newLeft;
							$( this ).children( 'div#sliderTab' ).css({ left: newLeft - 7 });
						});
						$( 'div#sliderTab' ).parent().mouseup( {}, function( e ){
							$( this ).unbind( 'mousemove' );
							$this.addressUpdate( options, e.pageX - parseInt( $( 'div#slideTrack' ).parent().css( 'paddingLeft' )));
							document.onselectstart = function(){ return true; }
							$( this ).unbind( 'mouseup' );
						});
						document.onselectstart = function(){ return false; }
						return false;
					}).insertAfter( 'div#slideTrack' );
				}
				$( 'div#sliderTab' ).css({ left: $this.leftColumn + position - 7 });

				//refresh the addThis code
				if( $( 'div#sliderContainer div#addThis_container' ).length > 0 ){

					var uri=window.location.href.split("/");

					var host=window.location.host,
						template=uri[3],
						page=uri[4].split("#")[0],
						id=$('body').attr("id").split("_");


					$.ajaxSetup.cache = true;
					$.getScript('http://s7.addthis.com/js/250/addthis_widget.js#username=gmcom');

					var	pillarTitle=$('li.active').attr('title'),
						facebookBase="https://www.facebook.com/login.php?next=http%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttp%253A%252F%252F"+host+"%252F"+template+"%252F"+page+"%2523%252F",
						twitterBase="https://twitter.com/intent/session?related=&return_to=%2Fintent%2Ftweet%3Ftext%3DGeneral%2BMotors%2B%257C%2B"+id[0]+"%2B%2526%2B"+id[1]+"%2B%257C%2BGM.com%26url%3Dhttp%253A%252F%252F"+host+"%252F"+template+"%252F"+page+"%2523%252F";


					var	facebookAppendix="&display=popup",
						twitterAppendix1="%26related%3D&shortened_url=http%3A%2F%2F"+host+"%2F"+template+"%2F"+page+"%23%2F",
						twitterAppendix2="&text=General+Motors+%7C+"+id[0]+"+%26+"+id[1]+"+%7C+GM.com&url=http%3A%2F%2F"+host+"%2F"+template+"%2F"+page+"%23%2F";


					$('a.addthis_button_facebook').attr('href', facebookBase+pillarTitle+facebookAppendix).attr('target', '_blank');
					$('a.addthis_button_twitter').attr('href', twitterBase+pillarTitle+twitterAppendix1+pillarTitle+twitterAppendix2+pillarTitle).attr('target', '_blank');

				}

			}
			backgroundLoaded();
		
		},

		titlePosition : function( options, title ){
			var $this = this,
				loop = 0,
				newPosition = options.offset;
			$this.children( 'li' ).each( function(){
				if( $( this ).attr( 'title' ) == title ){
					newPosition = options.offset + options.step * loop;
				}
				loop++;
			});
			return newPosition;
		},

		leftColumnResize : function( options, timer ){
			var $this = this,
				windowWidth = $( window ).width(),
				stop = /\d*$/.exec( $( 'div#slideTrack' ).children( '.active' ).attr( 'id' ));
			//div.sliderBackground div.midMid
			//div.sliderBackground
			//div#sliderContainer ul#sliderContent
			switch( true ){
				case windowWidth >= options.width + options.offset * 2 + options.leftColumn * 2:
					$this.leftColumn = options.leftColumn;
					break;
				case options.minWidth >= windowWidth:
					$this.leftColumn = ( options.minWidth - ( options.width + options.offset * 2 )) / 2;
					break;
				default:
					$this.leftColumn = ( windowWidth - ( options.width + options.offset * 2 )) / 2;
			}
			//adjust items
			$( 'div.sliderBackground div.midMid' ).css({ paddingLeft: $this.leftColumn });
			$( 'div.sliderBackground' ).css({ width: options.width + options.offset * 2 + $this.leftColumn });
			$( 'ul#sliderContent' ).css({ left: $this.leftColumn });
			$( 'div#sliderTab' ).css({ left: $this.leftColumn + parseInt( stop[0] ) - 7 });
		}
	});
})(jQuery);

$(document).ready(function(){

});