function setModalPopOut( options, count ){
	if( $( '.modalPopOutTarget' ).length >= count ){
		$( '.modalPopOutTarget' ).modal( options );
	} else {
		setTimeout( 
			function(){
				setModalPopOut( options, count );
			},
			250
		);
	}
}

$(document).ready (function() {
	// tab page
	if( $( '.modalPopOutTarget' ).length > 0 && $( 'body' ).hasClass( 'tabpage' )){
		$.address.change( function(){
			setModalPopOut( { opacity: 95, width: 560 }, 2 );
		});
	} else if( $( '.modalPopOutTarget' ).length > 0 && ( $( 'body' ).attr( 'id' ) == "contacts") ){
		$( '.modalPopOutTarget' ).modal( { hideOrRemove : 'hide' });
	} else if( $( '.modalPopOutTarget' ).length > 0 && $('body').is('#contactUs')){ // contact us formpage
		//$( '.modalPopOutTarget' ).modal({ opacity: 90, width: 700, fixed:  false , hideOrRemove: 'hide'});
	} else if( $( '.modalPopOutTarget' ).length > 0){
		$( '.modalPopOutTarget' ).modal();
	}
});