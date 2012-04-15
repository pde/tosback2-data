$( document ).ready( function(){
	$DFCText = $( 'div.DFC' ).children( '.DFCText' ).hide();
	$shadedContainerDFC = $(
		'<div class="shadedContainerDFC" >' +
			'<div id="upperRow">' +
				'<div class="upperLeft opacity90"></div>' +
				'<div class="upperRight opacity90"></div>' +
				'<div class="upperMid opacity90"></div>' +
			'</div>' +
			'<div class="midRow">' +
				'<div class="midLeft opacity90">' +
					'<div class="midRight opacity90">' +
						'<div class="midMid opacity90">' +
							'<div class="clearfix"></div> ' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="lowerRow">' +
				'<div class="lowerLeft opacity90"></div>' +
				'<div class="lowerRight opacity90"></div>' +
				'<div class="lowerMid opacity90"></div>' +
			'</div>' +
		'</div>'
	);
	if( $( 'body' ).hasClass( 'destinationfreight' )){
		$( 'span.rollOverText' ).hide();
		$( 'div.DFCText div.actionContainer' ).hide();
		$shadedContainerDFC.find( 'div.midMid' ).children( ':last-child' ).before( $DFCText.clone().show() );
		$( 'body' ).prepend( $shadedContainerDFC );
		//activate the scroll pane
		if( navigator.platform == 'iPad' ){
		} else {
			$shadedContainerDFC.find('.scrollPane').jScrollPane({ verticalDragMinHeight: 27, verticalDragMaxHeight: 27, verticalGutter: 10 });
		}
	} else {
		$( 'a.DFC, div.DFC, body#browseByBrand div.shadedContainerToolTip a, body#browseByType div.shadedContainerToolTip a, body.modelpage div.shadedContainerToolTip a' ).live( 'click', function( e ){
			e.preventDefault();
			if( $( 'div.shadedContainerDFC' ).length <= 0 ){
				$shadedContainerDFCAltered = $shadedContainerDFC.clone();
				$shadedContainerDFCAltered.find( 'div.midMid' ).children( ':last-child' ).before( $DFCText.clone().show() );
				$( 'body' ).prepend( $shadedContainerDFCAltered.hide());
				$shadedContainerDFCAltered.fadeIn()
				//activate the scroll pane
				if( navigator.platform == 'iPad' ){
					$shadedContainerDFCAltered.appendTo($('.dfc_div'));
					$shadedContainerDFCAltered.css({ bottom : 'auto',position:'absolute',marginTop:'-600px'});
				} else {
					$shadedContainerDFCAltered.find('.scrollPane').jScrollPane({ verticalDragMinHeight: 27, verticalDragMaxHeight: 27, verticalGutter: 10 });
				}
				if( typeof( Cufon ) == 'function' && Cufon.replace ){
					Cufon.replace( 'div.shadedContainerDFC .gotham-bold-dynamic', { fontFamily: 'gotham-bold', hover: true });
				}
				$shadedContainerDFCAltered.find( 'div.actionContainer' ).click( function ( e ){
					e.preventDefault();
					$shadedContainerDFCAltered.fadeOut( function(){
						$shadedContainerDFCAltered.remove();
					});
				});
			}
		});
	}
});