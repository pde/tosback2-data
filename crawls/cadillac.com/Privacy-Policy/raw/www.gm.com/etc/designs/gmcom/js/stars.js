function phoneEnter( labels ){
	$( 'label#salesLead_communicationDetails_phoneNumber1_phoneNumberType_mandatory' ).text( labels.phone + ' *' );
}

function phoneClear( labels ){
	$( 'label#salesLead_communicationDetails_phoneNumber1_phoneNumberType_mandatory' ).text( labels.phone );
}

function addressEnter( labels ){
	$( 'label#submitRequest_contact_details_address_street'     ).text( labels.addrss1 + ' *' );
	$( 'label#submitRequest_contact_details_address_city'       ).text( labels.cityname + ' *' );
	$( 'label#submitRequest_contact_details_address_state'     ).text( labels.state + ' *' );
	$( 'label#submitRequest_contact_details_address_postalCode' ).text( labels.postalcode + ' *' );
}

function addressClear( labels ){
	$( 'label#submitRequest_contact_details_address_street'     ).text( labels.addrss1 );
	$( 'label#submitRequest_contact_details_address_city'       ).text( labels.cityname );
	$( 'label#submitRequest_contact_details_address_state'     ).text( labels.state );
	$( 'label#submitRequest_contact_details_address_postalCode' ).text( labels.postalcode );
}

$( document ).ready( function(){
	if( $( 'div.mds-cmp-contact_form' ).length > 0 ){
		var labels = {
				phone      : $( 'label#salesLead_communicationDetails_phoneNumber1_phoneNumberType_mandatory' ).text(),
				addrss1    : $( 'label#submitRequest_contact_details_address_street' ).text(),
				cityname   : $( 'label#submitRequest_contact_details_address_city' ).text(),
				state	   : $( 'label#submitRequest_contact_details_address_state' ).text(),
				postalcode : $( 'label#submitRequest_contact_details_address_postalCode' ).text()
		}
		$( 'input#tel-area, input#tel-number' ).each( function(){
			$( this ).keyup( function(){
				if(( $( 'input#tel-area' ).val().length > 0 || $( 'input#tel-number' ).val().length > 0 ) && !/\*/.test( $( 'label#salesLead_communicationDetails_phoneNumber1_phoneNumberType_mandatory' ).text())){
					phoneEnter( labels );
				} else if( $( 'input#tel-area' ).val().length == 0 && $( 'input#tel-number' ).val().length == 0 ){
					phoneClear( labels );
				}
			});
		});
		$( 'input#address_1' ).keyup( function(){
			if( $( this ).val().length > 0 && !/\*/.test( $( 'label#submitRequest_contact_details_address_street' ).text())){
				addressEnter( labels );
			} else if( $( this ).val().length == 0 ){
				addressClear( labels );
			}
		});
		$( 'div#resetButton' ).click( function(){
			phoneClear( labels );
			addressClear( labels );
		});
	}
});