function backgroundLoaded(){
	$background = $( "div#background" )
	if( $background.find( 'img' ).length > 0 && $background.find( 'img' ).is( ':visible' )){
		$background.backgroundFill();
	} else {
		setTimeout( 
			function(){
				backgroundLoaded();
			},
			250
		);
	}
}
$( document ).ready( function(){
	backgroundLoaded();
});