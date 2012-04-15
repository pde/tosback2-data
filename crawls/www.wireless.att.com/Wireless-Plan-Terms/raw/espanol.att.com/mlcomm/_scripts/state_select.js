// JavaScript Document

 


function renderStateSelectMenu() {   
	//DO NOT CHANGE THE ORDER OF THIS LIST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  WHEN ADDING A NEW STATE, PLEASE BE AWARE THAT THE STATES POPULATE HORIZONTALLY ACROSS THE SCREEN
	var allStates  = { 'alabama':'Alabama',
									'kansas':'Kansas',
									'northcarolina':'Carolina del Norte',
									'arkansas' : 'Arkansas',
									'kentucky':'Kentucky',
									'ohio':'Ohio',
									'california' : 'California',
									'louisiana':'Louisiana',
									'oklahoma':'Oklahoma',
									'connecticut':'Connecticut',
									'michigan':'Michigan',
									'southcarolina':'Carolina del Sur',
									'florida': 'Florida',
									'missouri': 'Missouri',
									'tennessee':'Tennessee',
									'georgia':'Georgia',
									'mississippi':'Mississippi',
									'texas':'Texas',
									'illinois':'Illinois',
									'nevada':'Nevada',
									'wisconsin':'Wisconisn',
									'indiana':'Indiana'}
									
									
    	   
	$.each(allStates, function(index, value) {  
	   if(($('#state-display').text() != index)) {$('#state-display').text('')}
      $('#ssmenu').append('<li id="'+ index + '"></li>');
    });
 
	//EXPLORE
	if($('#chooseState').is('.home')) { 
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/index.html?id=' + index  + '" title="Portada" class="initCap">' + value + '</a>');
    }); 
	 }
	if($('#chooseState').is('.explorar')) {
		alert('home');
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/index.html?id=' + index  + '" title="Portada" class="initCap">' + value + '</a>');
    }); 
	 }
	
	//COMPRAR
	else if($('#chooseState').is('.comprar')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/index.html?id=' + index  + '" title="Portada" class="initCap">' + value + '</a>');
    }); 
	 }
	
	//ORDER FORM
	else if($('#chooseState').is('.order_form')) {
			
	var findProductQuery = location.href;
	checkProductQuery = findProductQuery.indexOf('prod='); 
	 product = findProductQuery.substring(checkProductQuery + 5);
	 
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/order_form.html?id=' + index  + '&prod=' + product + '" title="Ordena Ahora" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.thank_you')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/thank_you.html?id=' + index  + '" title="Ordena Ahora" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 //INTERNET
	else if($('#chooseState').is('.internet_home')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_internet/index.html?id=' + index  + '" title="High Speed Internet" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.hs_internet')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_internet/high_speed_internet.html?id=' + index  + '" title="High Speed Internet" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.dsl_direct')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_internet/dsl_direct.html?id=' + index  + '" title="High Speed Internet" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.dsl_direct_compare')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_internet/dsl_direct_compare.html?id=' + index  + '" title="High Speed Internet" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.wifi')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_internet/wifi.html?id=' + index  + '" title="Wi-Fi" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.wifi_access')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_internet/wifi_access.html?id=' + index  + '" title="Wi-Fi" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.wifi_product_info')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_internet/wifi_product_info.html?id=' + index  + '" title="Wi-Fi" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.mcafee')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_internet/mcafee.html?id=' + index  + '" title="McAfee" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 //ADVANCED TV
	else if($('#chooseState').is('.advanced_tv_home')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_advanced_tv/index.html?id=' + index  + '" title="AT&amp;T Advanced TV" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.directv')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_advanced_tv/directv.html?id=' + index  + '" title="High Speed Internet" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 //U-VERSE
	else if($('#chooseState').is('.uverse_home')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/index.html?id=' + index  + '" title="U-verse" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_compare')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_compare.html?id=' + index  + '" title="U-verse Products" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_offers')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_offers/index.html?id=' + index  + '" title="U-verse Ofertas" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_dvr')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_offers/total_home_dvr.html?id=' + index  + '" title="U-verse Total Home DVR" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_bundles')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_offers/uverse_bundles.html?id=' + index  + '" title="U-verse Paquetes" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_services')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_services/index.html?id=' + index  + '" title="U-verse &Uacute;nicos" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_apps')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_services/apps.html?id=' + index  + '" title="U-verse &Uacute;nicos" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_remote_access')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_services/remote_access.html?id=' + index  + '" title="U-verse &Uacute;nicos" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_remote')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_services/remote.html?id=' + index  + '" title="U-verse &Uacute;nicos" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_tv')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_tv/index.html?id=' + index  + '" title="U-verse TV" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_voice')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_voice/index.html?id=' + index  + '" title="U-verse Voice" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_voice_info')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_voice/voice_information.html?id=' + index  + '" title="U-verse Voice" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_voice_international')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_voice/voice_international.html?id=' + index  + '" title="U-verse Voice" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_internet')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_internet/index.html?id=' + index  + '" title="U-verse Internet" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_gateway')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_internet/gateway.html?id=' + index  + '" title="U-verse Internet" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_receptor')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_internet/receptor.html?id=' + index  + '" title="U-verse Internet" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_help')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_help/index.html?id=' + index  + '" title="U-verse Ayuda" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_account')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_help/account_help.html?id=' + index  + '" title="U-verse Ayuda" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_guides')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_help/uverse_guides.html?id=' + index  + '" title="U-verse Ayuda" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_faqs')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_help/faqs.html?id=' + index  + '" title="U-verse Ayuda" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_definitions')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_help/tech_definitions.html?id=' + index  + '" title="U-verse Ayuda" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_smart_controls')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_help/smart_controls.html?id=' + index  + '" title="U-verse Ayuda" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_10digit')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_help/ten_digit_dialing.html?id=' + index  + '" title="U-verse Ayuda" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.uverse_battery')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_help/battery_information.html?id=' + index  + '" title="U-verse Ayuda" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_receptor')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_tv/receptor.html?id=' + index  + '" title="U-verse TV" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.uverse_wireless')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_uverse/uverse_wireless/index.html?id=' + index  + '" title="U-verse Wireless Receptor" class="initCap">' + value + '</a>');
    }); 
	 } 
	
	 
	 
	 
	 
	 //HOME PHONE
	else if($('#chooseState').is('.phone_landing')) { 
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/index.html?id=' + index  + '" title="AT&amp;T Phone Service" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.home_phone')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/home_phone.html?id=' + index  + '" title="Home Phone Service" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.long_distance')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/long_distance.html?id=' + index  + '" title="AT&amp;T Long Distance Service" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.nationwide_calling_advantage')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/nationwide_calling_advantage.html?id=' + index  + '" title="AT&amp;T Unlimited Nationwide Calling One" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.nationwide_calling_one')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/nationwide_calling_one.html?id=' + index  + '" title="AT&amp;T ONE RATE  Nationwide 5&cent; Advantage" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.worldwide_value_calling')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/worldwide_value_calling.html?id=' + index  + '" title="AT&amp;T Worldwide Value CallingS" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.worldwide_occasional_calling')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/worldwide_occasional_calling.html?id=' + index  + '" title="AT&amp;T  Worldwide Occasional Calling " class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.alternate_billed_calls')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/alternate_billed_calls.html?id=' + index  + '" title="FAQS - Llamadas con cargos alternos (ABS) " class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.calling_card_charges')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/calling_card_charges.html?id=' + index  + '" title="FAQS - Cargos con Tarjeta Telef&oacute;nica de AT&amp;T Long Distance" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.dialing_guide')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/dialing_guide.html?id=' + index  + '" title="FAQS - Gu&iacute;a de Llamadas Internacional de AT&amp;T Long Distance" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.home_phone_faqs')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_home_phone/home_phone_faqs.html?id=' + index  + '" title="FAQS - El servicio de larga distancia" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 
	 //BUNDLES
	else if($('#chooseState').is('.bundles_home')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/residential_customers/att_bundles/index.html?id=' + index  + '" title="AT&amp;T Paquetes" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 
	 //DISCLAIMERS 
	else if($('#chooseState').is('.legal_home')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/legal_terms/index.html?id=' + index  + '" title="AT&amp;T Legal Terms" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.disclaimers_tv')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/legal_terms/disclaimers/att_advanced_tv.html?id=' + index  + '" title="AT&amp;T Offer Details - Advanced TV" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.disclaimers_home_phone')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/legal_terms/disclaimers/att_home_phone.html?id=' + index  + '" title="AT&amp;T Offer Details - Home Phone" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.disclaimers_internet')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/legal_terms/disclaimers/att_internet.html?id=' + index  + '" title="AT&amp;T Offer Details - Internet" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.disclaimers_uverse')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/legal_terms/disclaimers/att_uverse.html?id=' + index  + '" title="AT&amp;T Offer Details - U-verse" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 
	 //NOTICIAS
	else if($('#chooseState').is('.newsroom')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/newsroom/index.html?id=' + index  + '" title="Noticias" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.conectada')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/conectada/index.html?id=' + index  + '" title="La Casa Conectada" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.social_media')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/newsroom/social_media.html?id=' + index  + '" title="Redes sociales" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.news_archive')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/newsroom/news_archive.html?id=' + index  + '" title="Comunicados" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.news_release')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/newsroom/news_archive.html?id=' + index  + '" title="Comunicados" class="initCap">' + value + '</a>');
    }); 
	 } 
	else if($('#chooseState').is('.media_kits')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/newsroom/media_kits/index.html?id=' + index  + '" title="Paquetes para Medios" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.gallery_videos')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/newsroom/social_media.html?id=' + index  + '" title="Galer&iacute;a de Videos" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.more_information')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/newsroom/more_information.html?id=' + index  + '" title="M&aacute;s Informaci&oacute;n" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.gallery_images')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/newsroom/social_media.html.html?id=' + index  + '" title="&Aacute;lbum de Im&aacute;genes" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.useful_information')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/newsroom/useful_information.html?id=' + index  + '" title="Informaci&oacute;n de inter&eacute;s" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 
	 
	 
	 //AYUDA
	else if($('#chooseState').is('.help')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/index.html?id=' + index  + '" title="Ayuda" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.help_faqs')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/faqs/index.html?id=' + index  + '" title="FAQS - Facturaci&iacute;n" class="initCap">' + value + '</a>');
    });  
	 }
	else if($('#chooseState').is('.help_billing')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/faqs/billing.html?id=' + index  + '" title="FAQS - Facturaci&iacute;n" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.help_dsl')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/dsl.html?id=' + index  + '" title="FAQS - Gu&iacute;a de instalaci&oacute;n de internet de alta velocidad" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.help_dsl2wire')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/faqs/dsl2wire.html?id=' + index  + '" title="FAQS - Gu&iacute;a de instalaci&oacute;n de internet de alta velocidad" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.help_dslnowire')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/faqs/dslnowire.html?id=' + index  + '" title="FAQS - Gu&iacute;a de instalaci&oacute;n de internet de alta velocidad" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.help_home_tech')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/home_technology.html?id=' + index  + '" title="Technolog&iacute;a en Casa" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.help_area_codes')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/faqs/area_codes.html?id=' + index  + '" title="FAQS - C&oacute;digos de &Aacute;rea Telef&oacute;nicos " class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.help_contact_us')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/contact_us.html?id=' + index  + '" title="Cont&aacute;ctanos" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.move_att')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/att_move/index.html?id=' + index  + '" title="Move AT&amp;T" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.move_packing_tips')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/att_move/packing_tips.html?id=' + index  + '" title="Move AT&amp;T" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.move_moving_tips')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/att_move/moving_tips.html?id=' + index  + '" title="Move AT&amp;T" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.safety_game')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/internet_safety/just_for_kids/index.html?id=' + index  + '" title="Internet Seguro" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.company_faqs')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/help/faqs/compnay_faqs.html?id=' + index  + '" title="Preguntas frecuentes sobre la compa&ntilde;&iacute;a" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 
	 
	 //ACERCA DE
	else if($('#chooseState').is('.aboutus')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/about_att/index.html?id=' + index  + '" title="Cerca de AT&amp;T" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.community')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/about_att/community.html?id=' + index  + '" title="AT&amp;T - Comunidad" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.diversity')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/about_att/diversity.html?id=' + index  + '" title="AT&amp;T - Diversidad" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.volunteerism')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/about_att/volunteerism.html?id=' + index  + '" title="AT&amp;T - Diversidad" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.awards')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/about_att/awards.html?id=' + index  + '" title="AT&amp;T - Diversidad" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.corporate_info')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/about_att/corporate_information.html?id=' + index  + '" title="AT&amp;T - Informaci&oacute;n  Corporativa" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.neutrality')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/about_att/net_neutrality.html?id=' + index  + '" title="AT&amp;T - Broadband Informaci&oacute;n" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 
	 //PRIVACY POLICY
	else if($('#chooseState').is('.privacy_policy')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/privacy_policy/index.html?id=' + index  + '" title="Pol&iacute;tica de Privacidad" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.privacy_faqs')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/privacy_policy/privacy_faqs.html?id=' + index  + '" title="FAQS - Pol&iacute;tica de Privacidad" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.privacy_full')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/privacy_policy/privacy_full.html?id=' + index  + '" title="Pol&iacute;tica de Privacidad de AT&amp;T" class="initCap">' + value + '</a>');
    }); 
	 }
	else if($('#chooseState').is('.privacy_tos')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/privacy_policy/privacy_terms_of_use.html?id=' + index  + '" title="Pol&iacute;tica de Privacidad de AT&amp;T" class="initCap">' + value + '</a>');
    }); 
	 }
	 
	 
	 //SPECIAL PROMOS
	else if($('#chooseState').is('.juanes')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/juanes/index.html?id=' + index  + '" title="Juanes P.A.R.C.E." class="initCap">' + value + '</a>');
    }); 
	 }
	 
	
	 //CPNI
	else if($('#chooseState').is('.cpni')) {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/cpni.html?id=' + index  + '" title="cpni" class="initCap">' + value + '</a>');
    }); 
	 }
	  
	  
	 
	else {
	 $.each(allStates, function(index, value) {  
      $('#ssmenu li#' + index).html('<a href="/index.html?id=' + index  + '" title="Portada" class="initCap">' + value + '</a>');
    }); 
	 }
 


}