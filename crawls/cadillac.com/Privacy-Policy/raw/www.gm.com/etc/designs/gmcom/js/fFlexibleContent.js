$( document ).ready( function(){  
	/* Column Resizing */
	if( $( 'body' ).hasClass( 'peoplepage' )){
		$( 'body.peoplepage > div#content > div.shadedContainer' ).contentFit({ leftColumn : 'flexLeftContent' });
	} else if( $( 'body' ).hasClass( 'visionconfigpage') && !$('html').hasClass('ipad') ){
		if( $( 'div.cq-colctrl-lt0-c0' ).length > 0 ){
			$( 'div.contentFit' ).contentFit({ leftColumn : 'cq-colctrl-lt0-c0', rightColumn: 'cq-colctrl-lt0-c1' });
		} else if( $( 'div.cq-colctrl-lt1-c0' ).length > 0 ){
			$( 'div.contentFit' ).contentFit({ leftColumn : 'cq-colctrl-lt1-c0', rightColumn: 'cq-colctrl-lt1-c1' });
		} else {
			console.log( 'neithor' );
		}
	} else if( $( 'body#article' ).length > 0 || $( 'body.contentpagetwocolumn' ).length ){
		$( 'div.contentFit' ).contentFit({ leftColumn : 'flexLeftContent' });
	} else if( $( 'body' ).hasClass( 'contentpage' )){
		switch( $( 'body' ).attr( 'id' )){
			case 'gm_sustainability':
			case 'creation':
			case 'acceleration':
			case 'emotion':
			case 'revolution':
			case 'globalization':
			case 'innovation_challenges':
			case 'rebirth':
			case 'focus_areas':
			case 'diversity':
			case 'employee_resource_groups':
			case 'awards_and_conferences':
			case 'supporting_our_troops':
			case 'Martin_Luther_King_Jr':
			case 'GM_and_the_LGBT':
			case 'designing_for_physically_challenged':
			case 'building_bridgeswiththeindialeagueofamerica':
			case 'gm_foundation':
			case 'message_from_the_president':
			case 'safe_kids_usa_partnership':
			case 'united_way_partnership':
			case 'buick_achievers_partnership':
			case 'education':
			case 'health_human_services':
			case 'environment_energy':
			case 'community_development':
			case 'gm_foundation_press_releases':
				$( 'body.contentpage > div#content > div.shadedContainer' ).contentFit({ leftColumn : 'cq-colctrl-lt1-c0' });
		}
	}
	/* Font Resizing */
	var $resizerColumn = $( '.cq-colctrl-lt1-c0' );
	if( $( 'body' ).hasClass( 'visionconfigpage' )){
		if( $( 'div.cq-colctrl-lt0-c0' ).length > 0 ){
			$resizerColumn = $( '.cq-colctrl-lt0-c0' );
		} else if( $( 'div.cq-colctrl-lt1-c0' ).length > 0 ){
			$resizerColumn = $( '.cq-colctrl-lt1-c0' );
		}


	} else if( $( 'body#copyrightTrademark, body#user_guidelines' ).length > 0 ){
		$resizerColumn = $( 'div.par.parsys' );
	} else if( $( 'body#article' ).length > 0 || $( 'body.peoplepage' ).length > 0 ){
		$resizerColumn = $( 'div.flexLeftContent' );
	} else if( $( 'body#privacyStatement' ).length > 0 ){
		$resizerColumn = $( 'body#privacyStatement > div#content > div.shadedContainer' );
	} else if( $( 'body' ).hasClass( 'contentpagetwocolumn' )){
		$resizerColumn = $( 'body.contentpagetwocolumn div.flexLeftContent' );
	}
	$( '.enlargeText' ).click( function(){
		//prevent the cta text from sizing
		$( '.genBtn' ).css({ 'fontSize' : $( '.genBtn' ).css( 'fontSize' )});

		$resizerColumn.css({ fontSize: 18, lineHeight: '1.7em' });

		// do not resize video and image captions
		$resizerColumn.find('.captionBody').css({fontSize:12,lineHeight:'auto'});

		mrm.js.setArrowListHeight();
		mrm.js.setArrowListHeight();
		Cufon.refresh();
		return false;
	});
	$( '.resetText' ).click( function(){
		$resizerColumn.css({ fontSize: 12 });
		mrm.js.setArrowListHeight();
		mrm.js.setArrowListHeight();
		Cufon.refresh();
		return false;
	});
});