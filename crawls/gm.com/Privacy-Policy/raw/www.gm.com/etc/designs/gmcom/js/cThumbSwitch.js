function bgImgGet( alt ){
	var bgImg = '';
	$( "#leftContent > .mid > .list > .thumbnailImage" ).each( function(){
		if( $( this ).find( 'img' ).attr( 'alt' ) == alt ) bgImg = $( this ).find( 'div' ).attr( 'rel' );
	});
	if( bgImg.length == 0 ){
		bgImg = $( "#leftContent > .mid > .list > .thumbnailImage > div" ).eq( 0 ).attr( 'rel' );
	}
	return bgImg;
}

/*
function stretchVignette(){
	var windowHeight  = $( window ).height(),
		imageoffset   = parseInt( $( 'div#thumbSwitchBckgndImage' ).css( 'paddingTop' )),
		contentHeight = $( 'div#leftContent').height();
	console.log( 'windowHeight', windowHeight );
	console.log( 'imageoffset', imageoffset );
	console.log( 'contentHeight', contentHeight );
	//$( 'div#leftContent').css({ paddingBottom: windowHeight - ( imageoffset + contentHeight + 16 )});
}
*/

$(document).ready (function()  {
	if( typeof( $.address.value ) == 'function' ){
		var value = $.address.value(),
			addressRegEx = /\/(.*)/,
			result = null;
		//if deep link is set change the inital image selected
		if( addressRegEx.test( value )){
			result = addressRegEx.exec( value );
		}
		//set up the listner for the adress change
		$.address.change( function(){
			var value = $.address.value(),
				addressRegEx = /\/(.*)/,
				result = null;
			if( addressRegEx.test( value )){
				result = addressRegEx.exec( value );
				appendVal = parseInt( result[1] );
				//remove overlay and border
				if( !$( "#leftContent > .mid > .list" ).hasClass( 'newStyle' )){
					$( "#leftContent > .mid > .list > .thumbnailImage > div" ).each( function(){
						$( this ).removeClass( 'active' ).find( "div" ).hide();
					});
					//add border and overlay
					$( "#leftContent > .mid > .list > .thumbnailImage > div" ).each( function(){
						if( $( this ).find( 'img' ).attr( 'alt' ) == result[1] ){
							$( this ).addClass( 'active' ).find( "div" ).show();
						}
					});
					$( "div#background > img" ).attr( 'src', bgImgGet( result[1] ));
				} else {
					$( "div#background > img" ).attr( 'src', bgImgGet( result[1] ));
				}
			}
		});
	}
	//set the inital background image
	if( $( "div#background > img" ).length <=0 ) $( "div#background" ).append( '<img/>' );
	$( "div#background > img" ).attr( 'src', bgImgGet( result[1] ));


	$( "#leftContent > .mid > .list > .thumbnailImage > div" ).click ( function(){
		if( typeof( $.address.value ) == 'function' ){
			$.address.value( $( this ).find( 'img' ).attr( 'alt' ));
		}
		//return false;
	});
	

/*
	//stretch the content pain to fill the height
	stretchVignette();
	$( window ).resize( function(){
		stretchVignette();
	});
*/
});

