function gothamMedium( target, timeout ){
	if( typeof( Cufon ) == 'function' && Cufon.replace ){
		Cufon.replace( target, { 
				fontFamily: 'gotham-medium',
				hover: true
			}
		);
	}
	if( timeout && $( target ).length == 0 ){
		setTimeout( 
			function(){
				gothamMedium( target, timeout );
			},
			100
		);
	}
}

// Jesse's Cufon replace js
$(document).ready( function(){
	$( '.gotham-bold, body#allGMSites div.continent_branding + a + div.text.parbase.section' ).each( function(){
		if( $( this ).parents( 'a' ).length > 0 ){
			Cufon.replace( $( this ).parents( 'a' ), {
				fontFamily: 'gotham-bold',
				hover: true
			});
		} else {
			Cufon.replace( $( this ), {
				fontFamily: 'gotham-bold',
				hover: true
			});
		}
	});

	Cufon.replace('.gotham-book', {
		fontFamily: 'gotham-book',
		hover: true
	});

	Cufon.replace('.gotham-light', {
		fontFamily: 'gotham-light',
		hover: true
	});

	Cufon.replace('.gotham-medium', {
		fontFamily: 'gotham-medium',
		hover: true
	});
});