$( 'document' ).ready( function(){
	$( 'div.faqquestion.expandBoxOpen' ).faqToggle();

	$( 'a.expAll' ).click( function(){
		$expand = $( this );
		if( /Expand All/.test( $expand.text())){
			$( 'div.boxHolder div.faqquestion ul' ).each( function(){
				if( $( this ).is( '.qaBox' )){
					if( $( this ).children( 'a' ).is( '.plus' )){
						$( this ).children( 'a' ).trigger( 'click' );
						$( 'div.faqquestion' ).addClass( 'expandBoxOpen' );
						$expand.text( 'Collapse All -' );
					}
				};
			});
		} else {
			$( 'div.faqquestion.expandBoxOpen ul' ).each( function(){
				if( $( this ).is( '.qaBox' )){
					if( $( this ).children( 'a' ).is( '.minus' )){
						$( this ).children( 'a' ).trigger( 'click' );
						$( 'div.faqquestion' ).removeClass( 'expandBoxOpen' );
					}
				};
			});
		}
		return false;
	});
	
	
	$('a.linkPrint').text("Print Top FAQs");
});