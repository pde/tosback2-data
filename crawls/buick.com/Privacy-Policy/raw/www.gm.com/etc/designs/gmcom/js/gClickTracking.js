/**
* Code to handle the tracking of click elements
*/

String.prototype.trim = function() {
	return this.replace( /^\s*|\s*$/g, "" );
}

$(document).ready (function() {
	
	
	if (typeof uri == 'undefined') { return; };
	
	// GLOBALS ++++++++++++++++++++++++++++++++++++++++++++++++++++

	//primary navigation
	$( 'div#primaryNavigation ul li ul a, div#primaryNavigation ul li h2 a' ).live( 'click', function(){
		var options = {
			pagenameg : pageTrackJSON[0].vars.pageName,
			linkname  : $.trim( $( this ).text()).replace( /\&/g, '').replace( /\s+|\//g, '-' )
		}
		fireMetrics( 'globalnav', options );
	});

	//footer navigation
	$( 'div#auxiliaryNavigation ul li a' ).live( 'click', function(){
		var options = {
			pagenameg : pageTrackJSON[0].vars.pageName,
			linkname  : $.trim( $( this ).text()).replace( /\&/g, '').replace( /\s+|\//g, '-' )
		}
		fireMetrics( 'globalfooter', options );
	});

	// global print CTA
	$('div.aa_print span.printCTA a, div.pageTopActions a.linkPrint').live( 'click', function(){
		options = {}
		if( uri == '/content/gmcom/home/article' )
			options = { 'article_name' : $( 'div.flexLeftContent h3:eq(0)' ).text() }
		fireMetrics( 'print', options );
	});

	//tool bar faq
	$('div.faq_question ul li a').live( 'click', function(){
		fireMetrics( 'content_links_faq', { 'destination_name' : $(this).text() });
	});
	
	//leftnav slide menu
	$( 'div#slideMenuContent a' ).live( 'click', function(){
		var options = {
			pagename : pageTrackJSON[0].vars.pageName,
			linkname : $.trim( $( this ).text()).replace( /\&/g, '').replace( /\s+|\//g, '-' )
		}
		fireMetrics( 'leftnav', options );
	});

	//-------------------------------------------------------------
	//menu bar on home page
	if( uri == "/content/gmcom/home" ){
		$( 'body.homepage ul.brandDropOptions li a' ).live( 'click', function(){
			//console.log( $( this ).text());
			switch( $( this ).text()){
				case 'CADILLAC':
				case 'CHEVROLET':
				case 'BUICK':
				case 'GMC':
					fireMetrics( 'LEARN_MORE_' + $( this ).text());
					break;
				default:
					fireMetrics( 'CHOOSE_BRAND_' + $( this ).text());

			}
		});
		$( 'body.homepage ul.feedWrapper li.brandFeed a' ).live( 'click', function(){
			if( $( this ).hasClass( 'slideLeft'  )) fireMetrics( 'NEWS_LEFT_ARROW_GM'  );
			if( $( this ).hasClass( 'slideRight' )) fireMetrics( 'NEWS_RIGHT_ARROW_GM' );
		});
		$( 'body.homepage ul.feedWrapper li.brandFeed div.slideHolder ul.gmFeed li div.actionContainer a.button' ).live( 'click', function(){
			fireMetrics( 'LEARN_MORE_GM' );
		});
		$( 'body.homepage ul.feedWrapper li.brandFeed div.slideHolder ul.gmFeed li p a' ).live( 'click', function(){
			var destination_name = $( this ).text() == 'Read more' ? 'focus areas' : $( this ).text();
			var href = $( this ).attr( 'href' ),
				pat = /article.(\w*)\.html?/,
				test = pat.test( href ),
				result = pat.exec( href );
			if( test ){
				fireMetrics( 'content_link_exit', { 'destination_name' : result[1] });
			} else {
				fireMetrics( 'content_link_exit', { 'destination_name' : destination_name });
			}
			
		});
		$( 'body.homepage div.social a' ).live( 'click', function(){
			if( $( this ).hasClass( 'twitterBtn'  )) fireMetrics( 'HOME_SOCIAL_TWITTER_GM' );
			if( $( this ).hasClass( 'facebookBtn' )) fireMetrics( 'HOME_SOCIAL_FACEBOOK_GM' );
			if( $( this ).hasClass( 'youtubeBtn'  )) fireMetrics( 'HOME_SOCIAL_YOUTUBE_GM' );
		});
	}

	//-------------------------------------------------------------
	//brand landing pages
	$( 'body.brandpage div#thumbSwitchBckgndImage div.top div.logo a' ).click( function(){
		fireMetrics( 'GOTO_' + $( 'body' ).attr( 'id' ).toUpperCase() +'_LOGO' );
	});
	$( 'body.brandpage div#thumbSwitchBckgndImage div.bottom ul.textLinks li.textItems a' ).click( function(){
		fireMetrics( 'BRAND_SEE_MORE_' + $( 'body' ).attr( 'id' ).toUpperCase(), { 'link_name' : $( this ).text()});
	});
	//-------------------------------------------------------------
	//browse by
	if( uri == '/content/gmcom/home/vehicles/browseByBrand' ||
		uri == '/content/gmcom/home/vehicles/browseByType'
	){
		//checkboxes
		$( 'ul[class*="col0"]' ).find( 'input' ).live( 'click', function(){
			if( fireTracking ){
				var type = '';
				switch( $( this ).parent().attr( 'class' )){
					case 'type':
						type = 'vehicle_type';
						break;
					case 'hp':
						type = 'horsepower';
						break;
					case 'cargo':
						type = 'capacity';
						break;
					default:
						type = $( this ).parent().attr( 'class' );
				}
				fireMetrics( type, { value : $( this ).val() });
			}
		});
		//price slider
		//putting the fire metrrics call in the plugin
		//reset button
		$( '.updateButtonContainer' ).live( 'click', function(){
			fireMetrics( 'reset' );
		});
		//links in the bottom row of the filter for non flash
		$( '.bottomRow a' ).live( 'click', function(){
			var name = "";
			switch( $( this ).text() ){
				case 'GM Fleet & Commercial':
					name = 'GM Fleet and Commercial';
					break;
				default:
					name = 'GM Certified Pre-owned';
			}
			fireMetrics( 'locate_other_dealers', { destination_name : name });
		});
		//the images I couldent get the jQuery live function to work
		function vehicleResultsImageClick(){
			$( 'ul#vehicleResults li a' ).click( function(){
				fireMetrics( 'baseball_card', { value : $( this ).attr( 'title' )});
			});
		}
		function vehicleResultsImageClickTimer(){
			if( $( 'ul#vehicleResults li a' ).length > 0 ){
				vehicleResultsImageClick();
			} else {
				setTimeout( function(){ vehicleResultsImageClickTimer()}, 100 );
			}
		}
		vehicleResultsImageClickTimer();
	}
	//-------------------------------------------------------------
	// baseball_cards
	options = {}
	if( typeof( brand ) != 'undefined' && typeof( model ) != 'undefined' ){
		options = { brand : brand.replace( '_', '-' ), model : model.replace( '_', '-' ) }; 
	}
	$('.modelpage div#thumb.otherImage').live('click', function() {
		if ($(this).find('img:first-child').css('display') == 'none') {
			fireMetrics('baseball_card_interior_image', options);
		} else {
			fireMetrics('baseball_card_exterior_image', options);
		}
	});
	$('.modelpage .buttonAdjust240 .callToAction .actionContainer a').live('click', function() {
		fireMetrics( 'exit_brand_site', options );
	});
	$( '.buildYourOwnCTA a' ).live( 'click', function(){
		fireMetrics( 'exit_build_your_own', options) ;
	});
	$( '.compareToCompetitionCTA a' ).live( 'click', function(){
		fireMetrics( 'exit_compare', options );
	});
	$( '.currentOffersCTA a' ).live( 'click', function(){
		fireMetrics( 'exit_current_offers', options );
	});

	$( '.selectAnotherCTA a' ).live( 'click', function(){
		fireMetrics( 'see_another_vehicle', options );
	});
	$( '#liveChat').live( 'click', function(){
		fireMetrics( 'click_to_chat', options);
	});
	
	//vision(innovation) pages
	if( uri.indexOf( "/content/gmcom/home/vision" ) != -1 ){
		// visionconfigpage content links
		$( 'body.visionconfigpage .cq-colctrl-lt1-c0 .text a, body.peoplepage .flexLeftContent .text a' ).live( 'click', function(){
			fireMetrics( 'content_links', { 'destination_name' : $( this ).text() });
		});
		// visionconfigpage gallery
		$( 'div.shadedContainerPop div.actionContainer a').live( 'click', function(){
			fireMetrics( 'video_close_button' );
			$( "div.modalOffClick,div.shadedContainerPop" ).remove();
		});
		//video link
		$('body.visionconfigpage div.galleryWraper li a, body.peoplepage div.galleryWraper li a').live('click', function(){
			fireMetrics( 'VIDEO_HOMEPAGE_PLAY' );
		});
		//promotile
		$( '.flex_promo_tile a' ).live( 'click', function(){
			var chkAlt = $(this).find( 'img' ).attr( 'alt' );
			if (chkAlt){
				fireMetrics( 'promo_tile', { 'destination_name' : $( this ).find( 'img' ).attr( 'alt' ) });
			}else {
				fireMetrics( 'promo_tile', { 'destination_name' : $( this ).attr('href') });
			}
		});
		// visionconfigpage relatedResources
		$('.visionconfigpage .relatedResources a, body.peoplepage .relatedResources a').live('click', function() {
			var href = $( this ).attr( 'href' ),
				pat = /http:\/\/(www)?\.?(\w*)\./,
				test = pat.test( href ),
				result = pat.exec( href );
			if( test ){
				fireMetrics( 'related_resources_exit', { destination_name : $( this ).text() });
			} else {
				fireMetrics( 'related_resources_exit', { destination_name : $( this ).text() });
			}
		});
		
		//gallery 
		if( $( 'ul.slideshow').length > 0 ){
			if( !$( 'body' ).hasClass( 'contentpagetwocolumn' )){
				//console.log( 'in diversity tracking' );		//fire the up gallery initaly
				/*$( 'ul.slideshow li.active' ).each( function(){
					fireMetrics( 'image_gallery_image', { image_name : $( this ).find( 'img' ).attr( 'alt' )});
				});*/
				//previous click
				$( 'div.galleryPrev' ).live( 'click', function(){
					fireMetrics( 'image_gallery_prev_arrow' );
					fireMetrics( 'image_gallery_image', { image_name : $( this ).parents( '.galleryWraper' ).find( 'ul.slideshow li.active' ).next().find( 'img' ).attr( 'alt' )});
				});
				//next click
				$( 'div.galleryNext' ).live( 'click', function(){
					fireMetrics( 'image_gallery_next_arrow' );
					fireMetrics( 'image_gallery_image', { image_name : $( this ).parents( '.galleryWraper' ).find( 'ul.slideshow li.active' ).next().find( 'img' ).attr( 'alt' )});
				});
				//number click
				$( 'div.controlNav a' ).live( 'click', function(){
					var text = $( this ).text();
					text = $( this ).index() == 0 ? "left-arrow" : text;
					text = $( this ).index() == $( this ).parent().children().length - 1 ? "right-arrow" : text;
					fireMetrics( 'image_gallery_number', { number_clicked : text });
					fireMetrics( 'image_gallery_image', { image_name : $( this ).parents( '.galleryWraper' ).find( 'ul.slideshow li.active' ).next().find( 'img' ).attr( 'alt' )});
				});
			}
		}
		$( 'ul#stopLabels li a' ).live( 'click', function(){
			fireMetrics( 'placement_links', { 'placement_number' : $( this ).parent().index()});
		});
		$( 'ul#sliderContent li a.button' ).live( 'click', function(){
			var text1 = $( this ).text();
			if (text1.toLowerCase().indexOf( 'read' ) >= 0){
				fireMetrics( 'read_article');
			}else{
				fireMetrics( 'learn_more');
			}
		});
		$( 'div#sliderCTAWraper a' ).live( 'click', function(){
			fireMetrics( 'slider_cta', { link_name : $( this ).text()});
		});
		$( '.cq-colctrl-lt0-c0 .actionContainer a, .cq-colctrl-lt1-c0 .actionContainer a' ).live( 'click', function(){
			fireMetrics( 'related_resources_exit', { 'destination_name' : $( this ).text() });
		});
				
	}

	//-------------------------------------------------------------
	//diversity_links0
	//$( 'div.flexLeftContent a' ).live( 'click', function(){
	//	fireMetrics( 'exit', { 'destination_name' : $( this ).text() });
	//});
	//-------------------------------------------------------------
	//diversity
	if( uri.indexOf( '/content/gmcom/home/company/aboutGM/diversity' ) >= 0 ){
		if( !$( 'body' ).hasClass( 'contentpagetwocolumn' )){
			//console.log( 'in diversity tracking' );
			$( 'div#promoTileMedium a' ).live( 'click', function(){
				fireMetrics( 'diversity_promotile', { 'destination_name' : $( this ).find( 'img' ).attr( 'alt' ) });
			});
			$( 'div.cq-colctrl-lt1-c0 div.text a' ).live( 'click', function(){
				//console.log( "content link" );
				var destination_name = $( this ).text() == 'Read more' ? 'focus areas' : $( this ).text();
				var href = $( this ).attr( 'href' ),
					pat = /http:\/\/(www)?\.?(\w*)\./,
					test = pat.test( href ),
					result = pat.exec( href );
				if( test ){
					//console.log( 'diversity_exit' );
					fireMetrics( 'diversity_exit', { 'destination_name' : destination_name });
				} else {
					//console.log( 'diversity_internal' );
					fireMetrics( 'diversity_internal', { 'destination_name' : destination_name });
				}
			});
			$( 'div.shadedContainerPop div.wrapActionContainer a.actionContainer' ).live( 'click', function(){
				fireMetrics( 'video_close_button' );
			});
			$( 'a.button' ).live( 'click', function(){
				//alert( '->' + $( this ).text() + '<-' );
				switch( true ){
					case $( this ).attr( 'href' ).indexOf( 'diversity.html' ) >= 0 && $( this ).text().trim() != 'Back':
						fireMetrics( 'diversity_menu' );
						break;
					case $( this ).attr( 'href' ).indexOf( 'diversity.html' ) >= 0 && $( this ).text().trim() == 'Back':
						fireMetrics( 'back_button' );
						break;
					case $( this ).parents( '.wrapActionContainer' ).length > 0:
						fireMetrics( 'video_close_button' );
						break;
					case $( this ).attr( 'href' ).indexOf( 'careers' ) >= 0:
					case $( this ).attr( 'href' ).indexOf( 'facesofgm' ) >= 0:
					default:
						fireMetrics( 'diversity_exit', { destination_name : $( this ).text()});
						break;
				}
			});
			//related resources
			$( 'div.relatedResources a' ).live( 'click', function(){
				var href = $( this ).attr( 'href' ),
					pat = /http:\/\/(www)?\.?(\w*)\./,
					test = pat.test( href ),
					result = pat.exec( href );
				if( test ){
					fireMetrics( 'related_resources_exit', { related_resource_name : result[2] });
				} else {
					fireMetrics( 'related_resources', { related_resource_name : $( this ).text() });
				}
			});
		}
	}
	//gallery
	if( uri.indexOf( '/content/gmcom/home/company/aboutGM/diversity' ) >= 0 && $( 'ul.slideshow').length > 0 ){
		if( !$( 'body' ).hasClass( 'contentpagetwocolumn' )){
			//console.log( 'in diversity tracking' );		//fire the up gallery initaly
			$( 'ul.slideshow li.active' ).each( function(){
				fireMetrics( 'image_gallery_image', { image_name : $( this ).find( 'img' ).attr( 'alt' )});
			});
			//prev click
			$( 'div.galleryPrev' ).live( 'click', function(){
				fireMetrics( 'image_gallery_prev_arrow' );
				fireMetrics( 'image_gallery_image', { image_name : $( this ).parents( '.galleryWraper' ).find( 'ul.slideshow li.active' ).next().find( 'img' ).attr( 'alt' )});
			});
			//next click
			$( 'div.galleryNext' ).live( 'click', function(){
				fireMetrics( 'image_gallery_next_arrow' );
				fireMetrics( 'image_gallery_image', { image_name : $( this ).parents( '.galleryWraper' ).find( 'ul.slideshow li.active' ).next().find( 'img' ).attr( 'alt' )});
			});
			//number click
			$( 'div.controlNav a' ).live( 'click', function(){
				var text = $( this ).text();
				text = $( this ).index() == 0 ? "left-arrow" : text;
				text = $( this ).index() == $( this ).parent().children().length - 1 ? "right-arrow" : text;
				fireMetrics( 'image_gallery_number', { number_clicked : text });
				fireMetrics( 'image_gallery_image', { image_name : $( this ).parents( '.galleryWraper' ).find( 'ul.slideshow li.active' ).next().find( 'img' ).attr( 'alt' )});
			});
		}
	}
	
	//-------------------------------------------------------------
	// board_of_directors0
	if (uri == "/content/gmcom/home/company/aboutGM/board_of_directors0") {
		// tracking for text links
		$('.parsys.cta a[href="/content/dam/gmcom/COMPANY/About_GM/Board_of_Directors/pdfs/Audit.pdf"]').live('click', function() {
			fireMetrics('download_audit');
		});
		$('.parsys.cta a[href="/content/dam/gmcom/COMPANY/About_GM/Board_of_Directors/pdfs/Executive%20Compensation.pdf"]').live('click', function() {
			fireMetrics('download_executive_compensation');
		});
		$('.parsys.cta a[href="/content/dam/gmcom/COMPANY/About_GM/Board_of_Directors/pdfs/Public%20Policy.pdf"]').live('click', function() {
			fireMetrics('download_public_policy');
		});
		$('.parsys.cta a[href="/content/dam/gmcom/COMPANY/About_GM/Board_of_Directors/pdfs/Directors%20and%20Corporate%20Governance.pdf"]').live('click', function() {
			fireMetrics('download_corporate_governance');
		});
		$('.parsys.cta a[href="/content/dam/gmcom/COMPANY/About_GM/Board_of_Directors/pdfs/Finance%20%26%20Risk%20Policy.pdf"]').live('click', function() {
			fireMetrics('download_fianace_risk_policy');
		});
	} // END board_of_directors0
	
	//-------------------------------------------------------------
	// gm_sustainability
	if( uri == "/content/gmcom/home/company/aboutGM/corporate_responsiblity/gm_sustainability" ){
		$( 'a.button' ).live( 'click', function(){
			fireMetrics( 'exit' );
		});
	}

	//-------------------------------------------------------------
	// dealerLocator
	if (uri == "/content/gmcom/home/vehicles/dealerLocator") {
		
		// initial set
		$('div.dealerSearchRefined select#searchRadius').live('change', function() {
			fireMetrics( 'mileage_radius', { 'radius_selected' : $( this ).children( ':selected' ).val() });
		});
		$('div.dealerSearchRefined ul#brandSelection input.ui-helper-hidden-accessible').live('change', function() {
			fireMetrics( 'specific_brand_dealers', { 'brand_name_selected' : $( this ).val() });
		});
		$('div.dealerSearchRefined ul#dl_servicelist input.ui-helper-hidden-accessible').live('change', function() {
			fireMetrics( 'dealer_type', { 'dealer_type_selected' : $( this ).siblings( 'label' ).text() });
		});
		
		// results set
		$('div#criterial_filter_area select#searchRadius').live('change', function() {
			fireMetrics( 'results_mileage_radius', { 'radius_selected' : $( this ).children( ':selected' ).val() });
		});
		$('div#criterial_filter_area ul#brandSelection input.ui-helper-hidden-accessible').live('change', function() {
			fireMetrics( 'results_specific_brand_dealers', { 'brand_name_selected' : $( this ).val() });
		});
		$('div#criterial_filter_area ul#dl_servicelist input.ui-helper-hidden-accessible').live('change', function() {
			fireMetrics('results_dealer_type', { 'dealer_type_selected' : $( this ).siblings( 'label' ).text() });
		});
		$('select#sortOption').live('change', function() {
			fireMetrics('results_dealer_sort_by', { 'sort_by_results' : $( this ).children( ':selected' ).val() });
		});
		//To prevent the firing of this twice I am adding the listner to the footer one. Both dropdowns cahnge when you change the other.
		$('div#dl_footer_paging_id select#dealersPerPageOption').live('change', function() {
			fireMetrics('results_dealer_view', { 'view_per_page_results' : $( this ).children( ':selected' ).val() });
		});
		
		$( 'ul#mds-cmp-dealer_list div.ctaContainer a.dlImgButton.btnImg_SI').live( 'click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /www\.(\w*)\.com/,
				result = pat.exec( href );
			fireMetrics( 'results_dealer_search_inventory', { 'brand' : result[1] });
		});
		$( 'ul#mds-cmp-dealer_list div.ctaContainer a.dlImgButton.btnImg_RAQ').live( 'click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /www\.(\w*)\.com/,
				result = pat.exec( href );
			fireMetrics( 'results_dealer_request_a_quote', { 'brand' : result[1] });
		});
		
		$('ul.dl_search_result_list  ul.dealer-links li a').live('click', function() {
			fireMetrics( 'results_dealer_dealer_website', { 'dealer_name' : $( this ).parents( 'form' ).find( '#dealerName' ).text() });
		});
		
		$('p.btn_nba_1 a').live('click', function() {
			fireMetrics('map_page');
		});
		
		$( 'div#dealer_tmp a.dlImgButton.btnImg_SI').live( 'click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /www\.(\w*)\.com/,
				result = pat.exec( href );
			fireMetrics( 'map_dealer_search_inventory', { 'brand' : result[1] });
		});
		$( 'div#dealer_tmp a.dlImgButton.btnImg_RAQ').live( 'click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /www\.(\w*)\.com/,
				result = pat.exec( href );
			fireMetrics( 'map_dealer_request_a_quote', { 'brand' : result[1] });
		});
		$('div#dealer_tmp ul.dealer-links li a').live('click', function() {
			fireMetrics( 'map_dealer_dealer_website', { 'dealer_name' : $( this ).parents( 'form' ).find( '#dealerName' ).text() });
		});

		//promo Tiles
		$( '.promoTile a' ).live( 'click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /www\.(\w*)\.com/,
				result = pat.exec( href );
			fireMetrics( 'locate_other_dealers', { 'destination_name' : result[1] });
		});

	} // END dealerLocator
	
	//-------------------------------------------------------------
	// contactUs
	if (uri == "/content/gmcom/home/toolbar/contactUs") {
		$('body#contactUs div.shadedContainer div.contact-us-brand-section a').live('click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /www\.(\w*)\./,
				result = pat.exec( href );
			fireMetrics('contact_us_exit', { 'destination_name' : result[1] });
		});
		$( 'body#contactUs div.cq-colctrl-lt1-c1 div.cta_shaded_container a' ).live('click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /www\.(\w*)\./,
				result = pat.exec( href );
			if( result && result[1].length > 0 ){
				fireMetrics('contact_us_exit', { 'destination_name' : result[1] });
			}
		});
	} // END contactUs
	
	//-------------------------------------------------------------
	// contactUsForm
	if (uri == "/content/gmcom/home/toolbar/contactUsForm") {
		$('body#contactUsForm a.help-me-decide-submit-button').live('click', function() {
			var options = {},
				exit = false,
				pat = /www/;
			if( contactUsJSON[$('span.ui-radio-state-checked').prev().val()] ){
				switch( typeof( contactUsJSON[$('span.ui-radio-state-checked').prev().val()] )){
					case 'string':
						exit = pat.test( contactUsJSON[$('span.ui-radio-state-checked').prev().val()] );
						options = { 'destination_name' : contactUsJSON[$('span.ui-radio-state-checked').prev().val()] }
						break;
					case 'object':
						exit = true;
						options = { 'destination_name' : contactUsJSON[$('span.ui-radio-state-checked').prev().val()].selects[$('span.ui-radio-state-checked').parent().next().find( 'select :selected').val()] }
						break;
					default:
						options = { 'destination_name' : 'other questions' }
				}
			} else {
				options = { 'destination_name' : 'other questions' }
			}
			if( exit ){
				fireMetrics('contact_us_form_submit', options );
			} else {
				fireMetrics('contact_us_form_submit', options );
			}
		});
		$( 'body#contactUsForm div.submitButtonContainer div#submitButton a' ).live( 'click', function(){
			fireMetrics('contact_us_form_submit', { 'destination_name' : '' } );
		});
	} // END contactUsForm
	
	//-------------------------------------------------------------
	// global sites
	if( uri == "/content/gmcom/home/toolbar/allGMSites" ){
		$( 'ul.global-sites-brand-list a' ).live( 'click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /www\.(\w*)\./,
				result = pat.exec( href );
			fireMetrics('content_link_exit', { 'country' : 'United States', 'destination_name' : result[1] });
		});
		$( 'div.global-sites-menu-block-mask a' ).live( 'click', function(){
			fireMetrics('content_link_exit', { 'destination_name' : $( this ).text() });
		});
		$( 'ul.global-sites-menu-block-country li.global-sites-menu-item-active' ).live( 'click', function(){
			fireMetrics('content_link', { 'text_link_name' : $( this ).text() });
			
		});
		$( 'ul.global-sites-menu-block-continent li.global-sites-menu-item-active' ).live( 'click', function(){
			fireMetrics('content_link', { 'text_link_name' : $( this ).text() });
			
		});
		$( 'div.branding_call_to_action a' ).live( 'click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /www/,
				exit = pat.test( href );
			if( exit ){
				fireMetrics( 'global_exit', { 'destination_name' : $( this ).parents( 'div.midMid:eq(0)' ).find( 'h3' ).text() });
			} else {
				fireMetrics( 'global_internal', { 'destination_name' : $( this ).parents( 'div.midMid:eq(0)' ).find( 'h3' ).text() });
			}
		});
	}
    //--------------------------------------------------------------
	//Alt Global sites
	if( uri == "/content/gmcom/home/toolbar/allGMSites1" ){
		
		$( 'div.global-sites-menu-block-mask a' ).live( 'click', function(){
			fireMetrics('content_link_exit', { 'destination_name' : $( this ).text() });
		});
		$( 'ul.global-sites-menu-block-country li.global-sites-menu-item-active' ).live( 'click', function(){
			fireMetrics('content_link', { 'text_link_name' : $( this ).text() });
			
		});
		$( 'ul.global-sites-menu-block-continent li.global-sites-menu-item-active' ).live( 'click', function(){
			fireMetrics('content_link', { 'text_link_name' : $( this ).text() });
			
		});
	}
	//-------------------------------------------------------------
	// Privacy
	if( uri == "/content/gmcom/home/toolbar/privacyStatement" ){
		$( 'a + .parbase a' ).live( 'click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /https?:\/\/(www)?\.?(\w*)\./,
				test = pat.test( href ),
				result = pat.exec( href );
			if( test ){
				fireMetrics( 'exit', { destination_name : result[2] });
			} else {
				fireMetrics( 'links', { link_name : $( this ).text() });
			}
		});
	}

	//Below this point only tracking blocks that have been made generic ie not page specfic but work for a template or some other item used on all pages of a given type or style.
	//-------------------------------------------------------------
	//Tile page
	if( $( 'body' ).hasClass( 'tile' )){
		$( '.mini_shaded_container a' ).live( 'click', function(){
			fireMetrics( 'internal', { tile_name : $( this ).parents( '.mini_shaded_container' ).find( 'h3' ).text()});
		});
	}
	//-------------------------------------------------------------
	//Bottom Tab Container
	if( $( 'body' ).hasClass( 'tabpage' )){
		//Tabs
		$( 'ul.tabs li' ).live( 'click', function(){
			var page = 'tab_page',
				value = $( 'ul#bottomTabContainerData > li' ).eq( $( this ).index() ).attr( 'title' );
			fireMetrics( page, { name : value });
		});
		//Arrows
		$( '.bottomTabContainerNext' ).live('click', function(){
			var page = 'tab_page';
			if( $( '.btActive:eq(0)' ).hasClass( 'first' ) && $( '.btActive:eq(1)' ).hasClass( 'last' )){
				value = $( 'ul#bottomTabContainerData > li' ).eq( $( 'ul.tabs li.first' ).index() ).attr( 'title' );
			} else {
				value = $( 'ul#bottomTabContainerData > li' ).eq( $( 'ul.tabs li:eq(0).btActive' ).next().index() ).attr( 'title' );
			}
			fireMetrics( page, { name : value });
		});
		$( '.bottomTabContainerPrev' ).live('click', function(){
			var page = 'tab_page';
			if( $( '.btActive:eq(0)' ).hasClass( 'first' ) && $( '.btActive:eq(1)' ).hasClass( 'last' )){
				value = $( 'ul#bottomTabContainerData > li' ).eq( $( 'ul.tabs li.last' ).index() ).attr( 'title' );
			} else {
				value = $( 'ul#bottomTabContainerData > li' ).eq( $( 'ul.tabs li:eq(1).btActive' ).prev().index() ).attr( 'title' );
			}
			fireMetrics( page, { name : value });
		});
		//links whether thay are cta looking buttons or traditional links
		$( 'ul.content li a:not(.modalPopOutTarget)' ).live( 'click', function(){
			if($(this).parents('div').is('[class*="subsection_image_link"]')){
				//the if statement was added to avoid the double firing of the brand_logos in the owner center
			}else{
				var href = $( this ).attr( 'href' ),
					pat = /^http/,
					test = pat.test( href ),
					page = test ? 'exit' : 'internal';
				if( ($('body').attr('id')=='owner_advantages') && ($(this).text().toLowerCase().indexOf( 'learn' ) >= 0)){
					//if the CTA button has Learn More and belongs to the owner_advantages page do nothing
					//the tracking for the CTA button with Learn More is @owner_advantages
				}else{
					fireMetrics( page, { link_text : $( this ).text() });
				}
			}
		});
		//links that trigger modals
		$( 'ul.content li a.modalPopOutTarget' ).live( 'click', function(){
			fireMetrics( 'modal', { link_text : $( this ).text() });
		});
	}

	//-------------------------------------------------------------
	//archive
	if( $( 'body' ).hasClass( 'newsarchivepage' )){
		//Dropdowns
		$( 'select' ).change( function(){
			var id = '',
				selection = $( this ).val();
			switch( $( this ).attr( 'id' )){
				case 'filtersSelect1':
					id = 'filter';
					break;
				case 'view-by-select-1':
					id = 'view';
					break;
			}
			fireMetrics( id, { selection : selection });
		});
		//Pagination
		$( 'div.controlNav a' ).live( 'click', function(){
			var text = $( this ).text();
				text = $( this ).index() == 0 ? "left-arrow" : text;
				text = $( this ).index() == $( this ).parent().children().length - 1 ? "right-arrow" : text;
			fireMetrics( 'number', { number : text });
		});
		//Article
		$( '.article a' ).click( function(){
			var additional = $( this ).parent().hasClass( 'callToAction' ) ? ' Read More' : ''
			fireMetrics( 'internal', { name : $( this ).parents( '.article' ).find( 'h3 a' ).text() + additional });
		});
	}
	
	//-------------------------------------------------------------
	
	//owner_advantages
	if( uri.indexOf( "/content/gmcom/home/vehicles/owner_advantages" ) != -1 ){
		$( 'div.callToAction div.actionContainer a' ).live( 'click', function(){
			var href = $( this ).attr( 'href' );
			var altTxt = $(this).text();
			if (altTxt.toLowerCase().indexOf( 'learn' ) >= 0){
				if( href ){
					fireMetrics( 'learn_more', { 'link_text' : href });
				} else {
					fireMetrics( 'learn_more', { 'link_text' : 'learn_more' });
				}
			}
		});
		//for the brand logos
		$( 'div.subsection_image_link a' ).live('click', function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'brand_logo', { 'brand' : href });
			} else {
				fireMetrics( 'brand_logo', { 'brand' : 'brand_logo' });
			}
		});
		
		$( 'div#bottomTabContainer ul.tabs li' ).live( 'click', function(){
			 	//var altVal =$(this).find('cufon').attr('alt'); 
				var attrTitle = $( 'ul#bottomTabContainerData > li' ).eq( $( this ).index() ).attr( 'title' );
						fireMetrics( 'exit', {link_text: attrTitle});
		});
	}
		
	//----------------------------------------------------------------
	// Investors pages
	
	// Investor Home
	if( uri.indexOf( "/investors" ) != -1 && $('body#investors').length ){		
		// Map
		$( 'div.investorMap div a' ).click( function(){
			var href = $( this ).attr( 'href' );
			//pat = /(^.*?)\.html/,
			if ( href ){
				var pat = /(.*\/company\/investors\/)(.*?)(~[^~].*)(\.html)/;
				var test = pat.test( href );
				if( test ){
					var result = pat.exec( href );
					fireMetrics( 'map_link', { 'destination_name' : result[2] });
				}else{
					fireMetrics( 'map_link', { 'destination_name' : href });
				}
			} else {
				fireMetrics( 'map_link', { 'destination_name' : 'Map Link' });
			}
		});
		//Stock Financial info button
		$( 'div.stockFinancialButton div a.button' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'stocks_financial_info', { 'destination_name' : href });
			} else {
				fireMetrics( 'stocks_financial_info', { 'destination_name' : 'Stock Financial Info' });
			}
		});
		$( 'a[href*="/investors/corporate-strategy.html"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'read_corp_strategy', { 'destination_name' : href });
			} else {
				fireMetrics( 'read_corp_strategy', { 'destination_name' : 'Corp Strategy' });
			}
		});
		$( 'a[href*="/investors/corporate-governance.html"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'corp_govern', { 'destination_name' : href });
			} else {
				fireMetrics( 'corp_govern', { 'destination_name' : 'Corp Governance' });
			}
		});
		$( 'a[href*="/investors/earning-releases.html"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'all_earnings_releases', { 'destination_name' : href });
			} else {
				fireMetrics( 'all_earnings_releases', { 'destination_name' : 'all_earnings_releases' });
			}
		});
		$( 'a[href*="/investors/announcements-events.html"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'all_announcements_events', { 'destination_name' : href });
			} else {
				fireMetrics( 'all_announcements_events', { 'destination_name' : 'all_announcements_events' });
			}
		});
		$( 'a[href*="/investors/latest-news.html"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'all_investor_news', { 'destination_name' : href });
			} else {
				fireMetrics( 'all_investor_news', { 'destination_name' : 'all_investor_news' });
			}
		});
		$( 'div#promoTileLarge img' ).click( function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'promo_tile_1', { 'destination_name' : href });
			} else {
				fireMetrics( 'promo_tile_1', { 'destination_name' : 'Promo Tile' });
			}
		});
		$( 'a[href*="/investors/stockholder-information.html"] span.title_wrapper' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'stockholder_info', { 'destination_name' : href });
			} else {
				fireMetrics( 'stockholder_info', { 'destination_name' : 'stockholder_info' });
			}
		});
		$( 'a[href*="/investors/stockholder-information.html"] img' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'stockholder_info_image', { 'destination_name' : href });
			} else {
				fireMetrics( 'stockholder_info_image', { 'destination_name' : 'stockholder_info_image' });
			}
		});	
		$( 'a[href*="/investors/sec-filings.html"] span.title_wrapper' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'sec_filings', { 'destination_name' : href });
			} else {
				fireMetrics( 'sec_filings', { 'destination_name' : 'sec_filings' });
			}
		});
		$( 'a[href*="/investors/sec-filings.html"] img' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'sec_filings_image', { 'destination_name' : href });
			} else {
				fireMetrics( 'sec_filings_image', { 'destination_name' : 'sec_filings_image' });
			}
		});
		$( 'a[href*="/investors/sales-production.html"] span.title_wrapper' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'sales_and_production', { 'destination_name' : href });
			} else {
				fireMetrics( 'sales_and_production', { 'destination_name' : 'sales_and_production' });
			}
		});
		$( 'a[href*="/investors/sales-production.html"] img' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'sales_and_production_image', { 'destination_name' : href });
			} else {
				fireMetrics( 'sales_and_production_image', { 'destination_name' : 'sales_and_production_image' });
			}
		});	
		$( 'a[href*="/investors/FAQs.html"] span.title_wrapper' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'faqs', { 'destination_name' : href });
			} else {
				fireMetrics( 'faqs', { 'destination_name' : 'faqs' });
			}
		});
		$( 'a[href*="/investors/FAQs.html"] img' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'faqs_image', { 'destination_name' : href });
			} else {
				fireMetrics( 'faqs_image', { 'destination_name' : 'faqs_image' });
			}
		});	
		$( 'a[href*="/investors/contacts.html"] span.title_wrapper' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'contacts', { 'destination_name' : href });
			} else {
				fireMetrics( 'contacts', { 'destination_name' : 'contacts' });
			}
		});
		$( 'a[href*="/investors/contacts.html"] img' ).live('click', function(){
			var href = $( this ).parent().attr( 'href' );
			if( href ){
				fireMetrics( 'contacts_image', { 'destination_name' : href });
			} else {
				fireMetrics( 'contacts_image', { 'destination_name' : 'contacts_image' });
			}
		});
		//Brands
		$( 'div.subsection_image_link a[href*="cadillac.com"]' ).click( function(){
			fireMetrics('GOTO_CADILLAC_LOGO');
		});
		$( 'div.subsection_image_link a[href*="buick.com"]' ).click( function(){
			fireMetrics('GOTO_BUICK_LOGO');
		});
		$( 'div.subsection_image_link a[href*="gmc.com"]' ).click( function(){
			fireMetrics('GOTO_GMC_LOGO');
		});
		$( 'div.subsection_image_link a[href*="chevrolet.com"]' ).click( function(){
			fireMetrics('GOTO_CHEVY_LOGO');
		});
		$( 'div.subsection_image_link a[href*="opel.com"]' ).click( function(){
			fireMetrics('GOTO_OPEL_LOGO');
		});
		$( 'div.subsection_image_link a[href*="vauxhall.co.uk"]' ).click( function(){
			fireMetrics('GOTO_VAUXHALL_LOGO');
		});
		$( 'div.subsection_image_link a[href*="holden.com.au"]' ).click( function(){
			fireMetrics('GOTO_HOLDEN_LOGO');
		});
		$( 'div a.modalPopOutTarget' ).live('click', function(){
			fireMetrics('sign_up');
		});
		$( 'div.wrapActionContainer div.actionContainer a.button' ).live('click', function(){
			fireMetrics('sign_up_close');
		});
		$( 'input[name=submit]' ).live('click', function(){
			fireMetrics('sign_up_submit');
		});
		// Social links
		$( 'a[href*="www.facebook.com/generalmotors"]' ).click( function(){
			fireMetrics('BRAND_SOCIAL_FACEBOOK');
		});
		$( 'a[href*="twitter.com/GM"]' ).click( function(){
			fireMetrics('BRAND_SOCIAL_TWITTER');
		});
		$( 'a[href*="www.youtube.com/user/gmblogs"]' ).click( function(){
			fireMetrics('BRAND_SOCIAL_YOUTUBE');
		});
		//articles under earning releases
		$( 'li p.articleTitleBlurb a[href*="/investors/earning-releases"]' ).click( function(){
			var href = $( this ).attr( 'href' );		
			if( href ){
				var pat = /(.*\/investors\/earning-releases)(.*?)(~[^~].*)(\.html)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'all_earnings_releases_feed', { 'destination_name' : result[2] });
				} else{
					fireMetrics( 'all_earnings_releases_feed', { 'destination_name' : href });
				}
			} else {
				fireMetrics( 'all_earnings_releases_feed', { 'destination_name' : 'all_earnings_releases_feed' });
			}
		});
		//articles under announcements-events
		$( 'li p.articleTitleBlurb a[href*="/investors/announcements-events"]' ).click( function(){
			var href = $( this ).attr( 'href' );	
			if( href ){
				var pat = /(.*\/investors\/announcements-events)(.*?)(~[^~].*)(\.html)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'all_announcements_events_feed', { 'destination_name' : result[2] });
				} else{
					fireMetrics( 'all_announcements_events_feed', { 'destination_name' : href });
				}
			} else {
				fireMetrics( 'all_announcements_events_feed', { 'destination_name' : 'all_announcements_events_feed' });
			}
		});
		//articles under latest news
		$( 'li p.articleTitleBlurb a[href*="/investors/latest-news"]' ).click( function(){
			var href = $( this ).attr( 'href' );	
			if( href ){
				var pat = /(.*\/investors\/latest-news)(.*?)(~[^~].*)(\.html)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'all_investor_news_feed', { 'destination_name' : result[2] });
				} else{
					fireMetrics( 'all_investor_news_feed', { 'destination_name' : href });
				}
			} else {
				fireMetrics( 'all_investor_news_feed', { 'destination_name' : 'all_investor_news_feed' });
			}
		});
	}
	// End Investor Home
	
	// Investor Corporate Strategy
	if( uri.indexOf( "/investors/corporate-strategy" ) != -1 ){		
		$( 'a[href*="/investors/corporate-strategy.print.html"]' ).click( function(){
			fireMetrics('print');
		});
		$( 'div.galleryPrev' ).click( function(){
			fireMetrics('gallery_prev_arrow');
		});
		$( 'div.galleryNext' ).click( function(){
			fireMetrics('gallery_next_arrow');
		});
		$( 'div.controlNav a.controlNavItem' ).click( function(){
			var hrefHTML = $( this ).html();
			if( hrefHTML ){
				fireMetrics( 'gallery_number', { 'number_clicked' : hrefHTML });
			} else {
				fireMetrics( 'gallery_number', { 'number_clicked' : '1' });
			}
		});
		$( 'div.galleryWraper ul li.active img' ).click( function(){
			fireMetrics('gallery_image');
		});
		$( 'div.relatedResources ul li a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'related_resources_investors', { 'related_resource_name' : href });
			} else {
				fireMetrics( 'related_resources_investors', { 'related_resource_name' : 'related_resources_investors' });
			}
		});
		$( 'a[href*="/investors.html"]' ).click( function(){
			fireMetrics('investor_menu');
		});
		$( 'a[href*="/investors/corporate-governance.html"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'corporate_governance', { 'destination_name' : href });
			} else {
				fireMetrics( 'corporate_governance', { 'destination_name' : 'corporate_governance' });
			}
		});
	}
	// End Investor Corporate Strategy
	
	// Investor Corporate Governance
	if( uri.indexOf( "/investors/corporate-governance" ) != -1 ){		
		$( 'a[href*=".pdf"]' ).click( function(){
			var href = $( this ).attr( 'href' ),
			pat = /\/(\w*)\.pdf/,
			test = pat.test( href ),
			result = pat.exec( href );
			if( test ){
				fireMetrics( 'pdf_internal', { 'pdf_name' : result[1] });
			} else {
				fireMetrics( 'pdf_internal', { 'pdf_name' : 'pdf_internal' });
			}
		});
		$( 'a[href*="/investors/corporate-governance.print.html"]' ).click( function(){
			fireMetrics('print');
		});
		$( 'div.galleryPrev' ).click( function(){
			fireMetrics('gallery_prev_arrow');
		});
		$( 'div.galleryNext' ).click( function(){
			fireMetrics('gallery_next_arrow');
		});
		$( 'div.controlNav a.controlNavItem' ).click( function(){
			var hrefHTML = $( this ).html();
			if( hrefHTML ){
				fireMetrics( 'gallery_number', { 'number_clicked' : hrefHTML });
			} else {
				fireMetrics( 'gallery_number', { 'number_clicked' : '1' });
			}
		});
		$( 'div.galleryWraper ul li.active img' ).click( function(){
			fireMetrics('gallery_image');
		});
		$( 'div.relatedResources ul li a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'officers_board', { 'officers_board_link' : href });
			} else {
				fireMetrics( 'officers_board', { 'officers_board_link' : 'officers_board' });
			}
		});
		$( 'a[href*="/investors.html"]' ).click( function(){
			fireMetrics('investor_menu');
		});
		$( 'a[href*="/investors/corporate-strategy.html"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'corporate_strategy', { 'destination_name' : href });
			} else {
				fireMetrics( 'corporate_strategy', { 'destination_name' : 'corporate_strategy' });
			}
		});
	}
	// End Investor Corporate Governance
	
	// Investor Earnings Releases
	if( uri.indexOf( "/investors/earning-releases" ) != -1 ){		
		$( 'a[href*="/investors/earning-releases.print.html"]' ).click( function(){
			fireMetrics('print');
		});
		$( 'div.galleryPrev' ).click( function(){
			fireMetrics('gallery_prev_arrow');
		});
		$( 'div.galleryNext' ).click( function(){
			fireMetrics('gallery_next_arrow');
		});
		$( 'div.controlNav a.controlNavItem' ).click( function(){
			var hrefHTML = $( this ).html();
			if( hrefHTML ){
				fireMetrics( 'gallery_number', { 'number_clicked' : hrefHTML });
			} else {
				fireMetrics( 'gallery_number', { 'number_clicked' : '1' });
			}
		});
		$( 'div.galleryWraper ul li.active img' ).click( function(){
			fireMetrics('gallery_image');
		});
		$( 'div.relatedResources ul li select' ).live( 'change', function(){
			var href = $( this ).attr( 'href' );
			if( href ){
					fireMetrics( 'historical_release_quarter', { 'officers_board_link' : href });
				}
			else {
				fireMetrics( 'historical_release_quarter', { 'officers_board_link' : 'historical_release_quarter' });
			}
		});
		$( 'div.relatedResources ul li[class^="Q"] a' ).click( function(){
			var href = $( this ).attr('href');
			if( href ){
				var link_text = $("select").val() + " " + ($( this ).text());
				fireMetrics( 'historical_release_stories', { 'historical_release_stories_link' : link_text });
			} else {
				fireMetrics( 'historical_release_stories', { 'historical_release_stories_link' : 'historical_release_stories' });
			}
		});
		$( 'div.relatedResources div.contentContainer ul li a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				var pat = /(.*\/dam\/Media\/)(.*)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'additional_materials', { 'additional_materials_link' : result[2] });
				}else{
					fireMetrics( 'additional_materials', { 'additional_materials_link' : href });
				}
			} else {
				fireMetrics( 'additional_materials', { 'additional_materials_link' : 'additional_materials' });
			}
		});
		$( 'a[href*="/investors.html"]' ).click( function(){
			fireMetrics('investor_menu');
		});
		$( 'a[href*="/investors/announcements-events.html"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'announcements_events', { 'destination_name' : href });
			} else {
				fireMetrics( 'announcements_events', { 'destination_name' : 'announcements_events' });
			}
		});
	}
	// End Investor Earnings Releases
	
	// Investor Announcements and Events
	if( uri.indexOf( "/investors/announcements-events" ) != -1 ){	
		$( 'select#filtersSelect2' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'upcoming_events', { 'event' : label });
			} else {
				fireMetrics( 'upcoming_events', { 'event' : 'upcoming_events' });
			}
		});
		$( 'select#filter-by-q-select' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'quarter', { 'quarter' : label });
			} else {
				fireMetrics( 'quarter', { 'quarter' : 'quarter' });
			}
		});
		$( 'select#filter-by-year-select' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'year', { 'year' : label });
			} else {
				fireMetrics( 'year', { 'year' : 'year' });
			}
		});
		$( 'div.article h3 a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				var pat = /(.*\/investors\/announcements-events\/)(.*?)(~[^~].*)(\.html)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'events', { 'event_link' : result[2] });
				} else{
					fireMetrics( 'events', { 'event_link' : href });
				}
			} else {
				fireMetrics( 'events', { 'event_link' : 'events' });
			}
		});
		$( 'div.callToAction a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				var pat = /(.*\/investors\/announcements-events\/)(.*?)(~[^~].*)(\.html)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'events', { 'event_link' : result[2] });
				} else{
					fireMetrics( 'events', { 'event_link' : href });
				}
			} else {
				fireMetrics( 'events', { 'event_link' : 'events' });
			}
		});
	}
	// End Investor Announcements and Events
	
	// Investor News
	if( uri.indexOf( "/investors/latest-news" ) != -1 ){	
		$( 'select#filtersSelect2' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'articles', { 'event' : label });
			} else {
				fireMetrics( 'articles', { 'event' : 'upcoming_events' });
			}
		});
		$( 'select#filter-by-q-select' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'quarter', { 'quarter' : label });
			} else {
				fireMetrics( 'quarter', { 'quarter' : 'quarter' });
			}
		});
		$( 'select#filter-by-year-select' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'year', { 'year' : label });
			} else {
				fireMetrics( 'year', { 'year' : 'year' });
			}
		});
		$( 'div.article h3 a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				var pat = /(.*\/investors\/latest-news\/)(.*?)(~[^~].*)(\.html)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'events', { 'event_link' : result[2] });
				} else{
					fireMetrics( 'events', { 'event_link' : href });
				}
			} else {
				fireMetrics( 'events', { 'event_link' : 'events' });
			}
		});
		
		$( 'div.callToAction a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				var pat = /(.*\/investors\/latest-news\/)(.*?)(~[^~].*)(\.html)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'events', { 'event_link' : result[2] });
				} else{
					fireMetrics( 'events', { 'event_link' : href });
				}
			} else {
				fireMetrics( 'events', { 'event_link' : 'events' });
			}
		});
	}
	// End Investor News
	
	//International-salesproduction
    if( uri.indexOf( "/investors/international_salesproduction" ) != -1 ){	
		$( 'select#filtersSelect2' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'country', { 'country' : label });
			} else {
				fireMetrics( 'country', { 'country' : 'country' });
			}
		});
		$( 'select#filter-by-q-select' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'quarter', { 'quarter' : label });
			} else {
				fireMetrics( 'quarter', { 'quarter' : 'quarter' });
			}
		});
		$( 'select#filter-by-year-select' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'year', { 'year' : label });
			} else {
				fireMetrics( 'year', { 'year' : 'year' });
			}
		});
		$( 'div.article h3 a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				var pat = /(.*\/investors\/international_salesproduction\/)(.*?)(~[^~].*)(\.html)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'article', { 'link' : result[2] });
				} else{
					fireMetrics( 'article', { 'link' : href });
				}
			} else {
				fireMetrics( 'article', { 'link' : 'article' });
			}
		});
		
		$( 'div.callToAction a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				var pat = /(.*\/investors\/international_salesproduction\/)(.*?)(~[^~].*)(\.html)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'read_more_article', { 'read_more_link' : result[2] });
				} else{
					fireMetrics( 'read_more_article', { 'read_more_link' : href });
				}
			} else {
				fireMetrics( 'read_more_article', { 'read_more_link' : 'read_more_article' });
			}
		});
	}
	// Investor FAQ
	if( uri.indexOf( "/investors/FAQs" ) != -1 ){
		$( 'body#FAQs div.faq_link li a' ).click( function(){
			fireMetrics( 'all_faq');
		});
	}
	if( uri.indexOf( "/investors/FAQs/General_Investor_Information" ) != -1 ){
		$( 'div.faq_link li a' ).click( function(){
			fireMetrics( 'general_investor_information');
		});
	}
	if( uri.indexOf( "/investors/FAQs/Stockholder_Information" ) != -1 ){
		$( 'div.faq_link li a' ).click( function(){
			fireMetrics( 'stockholder_information');
		});
	}
	if( uri.indexOf( "/investors/FAQs/Financial_Reporting" ) != -1 ){
		$( 'div.faq_link li a' ).click( function(){
			fireMetrics( 'financial_reporting');
		});
	}
	if( uri.indexOf( "/investors/FAQs/Warrants" ) != -1 ){
		$( 'div.faq_link li a' ).click( function(){
			fireMetrics( 'warrants');
		});
	}
	// End Investor FAQ
	
	// Investor Stocks and financial information
	if( uri.indexOf( "/investors/stock-financial" ) != -1 ){
		$( 'a[href*="/investors/stock-financial.html"]' ).click( function(){
			fireMetrics('stock_info_invest_calc');
		});
		$( 'a[href*="/investors/fundamentals.html"]' ).click( function(){
			fireMetrics('fundamentals');
		});
		$( 'a[href*="/investors/analyst-coverage.html"]' ).click( function(){
			fireMetrics('analyst_coverage');
		});	
		$( 'button#calculate' ).click( function(){
			fireMetrics('calculate_button');
		});
	}
	// End Investor Stocks and financial information
	
	// Investors Stockholder Information
	if( uri.indexOf( "/investors/stockholder-information" ) != -1 ){
		$( 'a[href*="print.html"]' ).click( function(){
			fireMetrics('print');
		});
		$( 'div.promoPopup' ).click( function(){
			fireMetrics('promo_tile');
		});
//		$( 'div.annualReports ul.content li[class^="year_"] a' ).click( function(){
//			var href = $( this ).attr( 'href' );
//			if( href ){
//				var pat = /(.*\/COMPANY\/Investors\/)(.*)(\.pdf)/;
//				var testResult = pat.test( href );
//				if (testResult){
//					var result = pat.exec( href );
//					fireMetrics( 'annual_report', { 'annual_report_link_name' : result[2] });
//				}else{
//					fireMetrics( 'annual_report', { 'annual_report_link_name' : href });
//				}
//			}
//			else {
//				fireMetrics( 'annual_report', { 'annual_report_link_name' : 'annual_report' });
//			}
//		});
		$( 'div.relatedResources ul li a' ).click(function(){
			if($(this).parents('li').is('[class^="year_"]')){
				var href = $( this ).attr('href');
				if( href ){
					var pat = /(.*\/COMPANY\/Investors\/)(.*)(\.pdf)/;
					var testResult = pat.test( href );
					if (testResult){
						var result = pat.exec( href );
						fireMetrics( 'annual_report', { 'annual_report_link_name' : result[2] });
					}else{
						fireMetrics( 'annual_report', { 'annual_report_link_name' : href });
					}
				}
				else {
					fireMetrics( 'annual_report', { 'annual_report_link_name' : 'annual_report' });
				}

			}else{
				var href = $( this ).attr('href');
				if( href ){
					var pat = /(.*\/company\/investors\/)(.*?)(~[^~].*)(\.html)/;
					var testResult = pat.test( href );
					if (testResult){
						var result = pat.exec( href );
						fireMetrics( 'related_resources_investors', { 'related_resources_link_name' : result[2] });
					}else{
						fireMetrics( 'related_resources_investors', { 'related_resources_link_name' : href });
					}
				}
				else {
					fireMetrics( 'related_resources_investors', { 'related_resources_link_name' : 'related_resources_investors' });
				}
				
				
				
			}
//				if( href ){
//					fireMetrics( 'related_resources_investors', { 'related_resources_link_name' : href });
//				} else {
//				fireMetrics( 'related_resources_investors', { 'related_resources_link_name' : 'related_resources_investors' });
//				}
//			
		});
		$( 'a[href*="/investors.html"]' ).click( function(){
			fireMetrics('investor_menu');
		});
		$( 'a.button.externalLink' ).click( function(){
			fireMetrics('interactive_report');
		});
	}
	// End Investors Stockholder Information
	
	// Investors SEC
	if( uri.indexOf( "/investors/sec-filings" ) != -1 ){
		$( 'a[href*="/investors.html"]' ).click( function(){
			fireMetrics('investors_menu');
		});
		// Thomson IFrame tracking events
		$('input.ccbnButton').click( function() {
			fireMetrics('form', { 'name_of_form' : 'Search' });
		});
		$( 'a[href*="excel.gif"]' ).click( function(){
			var href = $( this ).html();
			if( href ){
				fireMetrics( 'excel_download', { 'name_of_excel_document' : href });
			} else {
				fireMetrics( 'excel_download', { 'name_of_excel_document' : 'excel_download' });
			}
		});
		$( 'a[href*="pdf.gif"]' ).click( function(){
			var href = $( this ).html();
			if( href ){
				fireMetrics( 'pdf_download', { 'name_of_pdf_document' : href });
			} else {
				fireMetrics( 'pdf_download', { 'name_of_pdf_document' : 'pdf_download' });
			}
		});
		$( 'a[href*="xbrl.gif"]' ).click( function(){
			var href = $( this ).html();
			if( href ){
				fireMetrics( 'library_list', { 'name_of_library_list' : href });
			} else {
				fireMetrics( 'library_list', { 'name_of_library_list' : 'library_list' });
			}
		});
	}
	// End Investors SEC
	
	// Investors Sales and Production
	if( uri.indexOf( "/investors/sales-production" ) != -1 ){
		$( 'a[href*="/investors/sales-production.print.html"]' ).click( function(){
			fireMetrics('print');
		});
		$( 'div.flex_promo_tile' ).click( function(){
			fireMetrics('promo_tile');
		});
		$( 'div.galleryPrev' ).click( function(){
			fireMetrics('gallery_prev_arrow');
		});
		$( 'div.galleryNext' ).click( function(){
			fireMetrics('gallery_next_arrow');
		});
		$( 'div.controlNav a.controlNavItem' ).click( function(){
			var hrefHTML = $( this ).html();
			if( hrefHTML ){
				fireMetrics( 'gallery_number', { 'number_clicked' : hrefHTML });
			} else {
				fireMetrics( 'gallery_number', { 'number_clicked' : '1' });
			}
		});
		$( 'li.dropdown select:eq(0)' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'historical_release_month', { 'month' : label });
			} else {
				fireMetrics( 'historical_release_month', { 'month' : 'historical_release_month' });
			}
		});
		$( 'li.dropdown select:eq(1)' ).live( 'change', function(){
			var label = $( this ).find("option:selected").text();
			if( label ){
				fireMetrics( 'historical_release_year', { 'year' : label });
			} else {
				fireMetrics( 'historical_release_year', { 'year' : 'historical_release_year' });
			}
		});
		$( 'select#filter-by-year-select' ).live( 'change', function(){
			fireMetrics('year');
		});
		$( 'div.relatedResources ul li[class^="M"] a' ).click( function(){
			var href = $(this).attr('href');
			var link_text = $("select:eq(0) option:selected").text() + " " + $("select:eq(1) option:selected").text() + " " + $(this).text();
			if (href){
				fireMetrics( 'historical_release_stories', { 'story_link' : link_text });
			}else{
				fireMetrics( 'historical_release_stories', { 'story_link' : 'historical_release_stories' });
			}
		});
		$( 'div.relatedResources div.contentContainer ul li.pdf a' ).click( function(){
			var label = $( this ).text();
			if( label ){
				fireMetrics( 'additional_materials', { 'additional_menu_story_link_name' : label });
			} else {
				fireMetrics( 'additional_materials', { 'additional_menu_story_link_name' : 'additional_materials' });
			}
		});
		$( 'a[href*="/investors.html"]' ).click( function(){
			fireMetrics('investor_menu');
		});
		$('div.flexLeftContent div.body a').click(function(){
			var href =$(this).text();
			if ( href ){
				fireMetrics( 'text_link_story', {'text_link_name' : href });
			}else{
				fireMetrics( 'text_link_story', {'text_link_name' : 'text_link_story' });
			}
		});
	}
	// End Investors Sales and Production
	
	// Investors Contacts
	if( uri.indexOf( "/investors/contacts" ) != -1 ){
		$( 'a[href*="/investors/contacts.print.html"]' ).click( function(){
			fireMetrics('print');
		});
		$( 'div#promoTileLarge a' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'promo_tile', { 'promo_tile_link_name' : href });
			} else {
				fireMetrics( 'promo_tile', { 'promo_tile_link_name' : 'promo_tile' });
			}
		});
		$( 'div.text p a[href*="COMPANY/Investors"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				var pat = /(.*\/COMPANY\/Investors\/)(.*)(\.pdf)/;
				var testResult = pat.test( href );
				if (testResult){
					var result = pat.exec( href );
					fireMetrics( 'request_materials_publications', { 'request_materials_publications_name' : result[2] });
				}else{
					fireMetrics( 'request_materials_publications', { 'request_materials_publications_name' : href });
				}
			} else {
				fireMetrics( 'request_materials_publications', { 'request_materials_publications_name' : 'request_materials' });
			}
		});
		$( 'a.modalPopOutTarget' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'request_materials', { 'request_materials_link_name' : href });
			} else {
				fireMetrics( 'request_materials', { 'request_materials_link_name' : 'request_materials' });
			}
		});
		$( 'a[href*="www-us.computershare.com/investor"]' ).click( function(){
			var href = $( this ).attr( 'href' );
			if( href ){
				fireMetrics( 'computershare_website', { 'interactive_link' : href });
			} else {
				fireMetrics( 'computershare_website', { 'interactive_link' : 'computershare_website' });
			}
		});
		$( 'a[href*="mailto:stockholder.services"]' ).click( function(){
			fireMetrics('email_stockholder');
		});
		$( 'a[href*="mailto:GM@IRNavigator.com"]' ).click( function(){
			fireMetrics('email_investor');
		});
		$( 'a[href*="/investors.html"]' ).click( function(){
			fireMetrics('investor_menu');
		});
	}
	// End Investors Contacts
	
	// End Investors pages

	
	//-------------------------------------------------------------
	//contentpagetwocolumn
	if( $( 'body' ).hasClass( 'contentpagetwocolumn' )){
		//console.log( 'inside contentpagetwocolumn tracking' );
		$( 'div#promoTileMedium a' ).live( 'click', function(){
			fireMetrics( 'promotile', { 'destination_name' : $( this ).find( 'img' ).attr( 'alt' ) });
		});
		$( 'div.flexLeftContent div.text a' ).live( 'click', function(){
			var $this = $( this ),
				destination_name = $( this ).text(),
				destination_name = destination_name.toString().trim();
				href = $( this ).attr( 'href' ),
				pat = /http:\/\/(www)?\.?(\w*)\./,
				pat2 = /(\w*)\.pdf$/i,
				test = pat.test( href ),
				test2 = pat2.test( href ),
				result = pat.exec( href );
				result2 = pat2.exec( href );
			destination_name =  $( 'div.flexLeftContent div.text a:contains(' + destination_name + ')').length > 1 ? destination_name + ' ' + $( this ).index( 'div.flexLeftContent div.text a:contains(' + destination_name + ')' ) : destination_name;
			if( test ){
				fireMetrics( 'exit', { 'destination_name' : destination_name });
			} else {
				if( test2 ){
					fireMetrics( 'pdf_internal', { 'pdf_name' : result2[1] });
				} else {
					fireMetrics( 'internal', { 'destination_name' : destination_name });
				}
			}
		});
		$( 'a.button' ).live( 'click', function(){
			//alert( '->' + $( this ).text() + '<-' );
			switch( true ){
				case $( this ).parents( '.wrapActionContainer' ).length > 0:
					fireMetrics( 'video_close_button' );
					break;
				default:
					var destination_name = $( this ).text();
					var href = $( this ).attr( 'href' ),
						pat = /http:\/\/(www)?\.?(\w*)\./,
						test = pat.test( href ),
						result = pat.exec( href );
					if( test ){
						fireMetrics( 'exit', { 'destination_name' : destination_name });
					} else {
						fireMetrics( 'internal', { 'destination_name' : destination_name });
					}
					//fireMetrics( 'exit', { destination_name : $( this ).text()});
					break;
			}
		});
		//related resources
		$( 'div.relatedResources a' ).live( 'click', function(){
			var href = $( this ).attr( 'href' ),
				pat = /http:\/\/(www)?\.?(\w*)\./,
				test = pat.test( href ),
				result = pat.exec( href );
			if( test ){
				fireMetrics( 'related_resources_exit', { related_resource_name : result[2] });
			} else {
				fireMetrics( 'related_resources', { related_resource_name : $( this ).text() });
			}
		});
		if( $( 'ul.slideshow').length > 0 ){
			//fire the up gallery initaly
			$( 'ul.slideshow li.active' ).each( function(){
				fireMetrics( 'gallery_image', { image_name : $( this ).find( 'img' ).attr( 'alt' )});
			});
			//prev click
			$( 'div.galleryPrev' ).live( 'click', function(){
				fireMetrics( 'gallery_prev_arrow' );
				fireMetrics( 'gallery_image', { image_name : $( this ).parents( '.galleryWraper' ).find( 'ul.slideshow li.active' ).next().find( 'img' ).attr( 'alt' )});
			});
			//next click
			$( 'div.galleryNext' ).live( 'click', function(){
				fireMetrics( 'gallery_next_arrow' );
				fireMetrics( 'gallery_image', { image_name : $( this ).parents( '.galleryWraper' ).find( 'ul.slideshow li.active' ).next().find( 'img' ).attr( 'alt' )});
			});
			//number click
			$( 'div.controlNav a' ).live( 'click', function(){
				var text = $( this ).text();
				text = $( this ).index() == 0 ? "left-arrow" : text;
				text = $( this ).index() == $( this ).parent().children().length - 1 ? "right-arrow" : text;
				fireMetrics( 'gallery_number', { number_clicked : text });
				fireMetrics( 'gallery_image', { image_name : $( this ).parents( '.galleryWraper' ).find( 'ul.slideshow li.active' ).next().find( 'img' ).attr( 'alt' )});
			});
		}
	}
});