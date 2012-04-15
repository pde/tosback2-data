$( document ).ready( function(){
$tipText = $( '.rollOverDetails' ).children( '.tipText' ).hide();
	var initListener = navigator.platform == 'iPad' ? 'click' : 'mouseenter';
	var finlListener = navigator.platform == 'iPad' ? 'click' : 'mouseleave';
	var action = $( 'body' ).hasClass( 'tabpage' ) ? 'live' : 'bind';
	switch( true ){
		case $( 'body' ).hasClass( 'browsebybrand_flash' ):
		case $( 'body' ).hasClass( 'tabpage' ):
			target = 'div.rollOverDetails';
			break;
		default:
			target = 'div.rollOverDetails.modalTrigger';
	}
	var toEval = "" + 
		"$( '" + target + "' )." + action + "( '" + initListener + "', function(){" +
			"if( $( 'div.shadedContainerToolTip' ).length <= 0 ){" +
				"$shadedContainerToolTip = $(" +
					"'<div class=\"shadedContainerToolTip\" >' + " +
						"'<div id=\"upperRow\">' + " +
							"'<div class=\"upperLeft opacity90\"></div>' + " +
							"'<div class=\"upperRight opacity90\"></div>' + " +
							"'<div class=\"upperMid opacity90\"></div>' + " +
						"'</div>' + " +
						"'<div class=\"midRow\">' + " +
							"'<div class=\"midLeft opacity90\">' + " +
								"'<div class=\"midRight opacity90\">' + " +
									"'<div class=\"midMid opacity90\">' + " +
										"'<div class=\"clearfix\"></div> ' + " +
									"'</div>' + " +
								"'</div>' + " +
							"'</div>' + " +
						"'</div>' + " +
						"'<div class=\"lowerRow\">' + " +
							"'<div class=\"lowerLeft opacity90\"></div>' + " +
							"'<div class=\"lowerRight opacity90\"></div>' + " +
							"'<div class=\"lowerMid opacity90\"></div>' + " +
						"'</div>' + " +
					"'</div>' " +
				"); " +
				"$shadedContainerToolTip.find( 'div.midMid' ).prepend( $tipText.html() ); " +
				"$( 'body' ).prepend( $shadedContainerToolTip.hide()); " +
				"if( navigator.platform == 'iPad' ){" +
				"$shadedContainerToolTip.appendTo($('.parbase.disclaimer'));"+
					"$shadedContainerToolTip.css({ bottom : 'auto',position:'absolute',marginTop:'-400px'});" +
				"}" +
				"$shadedContainerToolTip.fadeIn().bind( '" + finlListener + "', function (){ " +
					"$( this ).fadeOut( function(){ " +
						"$( this ).remove(); " +
					"}); " +
				"}); " +
			"} " +
		"}); ";
	eval( toEval );
});