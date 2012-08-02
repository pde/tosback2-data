//alert('hi');

jQuery(document).ready(function() {
	
//				jQuery('body').append('<div id="myoverlay" style="display:none;"></div>');
		jQuery('body').append('<div id="TB_window"><div id="TB_closeAjaxWindow" onclick="closelightbox();">X</div><iframe width="625" height="550" id="videoviewer" name="videoviewer" frameborder="0" border="0" scrolling="No" margin="0"></iframe></div><div id="myoverlay" style="display:none;"></div>');
			jQuery('.topLeftTabs').css('z-index','999');
	
	myurl = location.href;
			checkPopup = myurl.indexOf('#video');
//			alert('1: ' + checkPopup);			
			
jQuery('a.lightboxme').click(function(e) {		
						e.preventDefault();		
						jQuery('.topLeftTabs').css('z-index','99');
						jQuery(this).addClass('active');
						videoID = jQuery(this).attr('href').split('=');
						videoID = videoID[1];
						videodesc = jQuery(this).children('.videodesc').text() + '&nbsp;';
						newLink = '/Common/multimedia/youtubepopup.html';
						newLink += '?videoid=' + escape( videoID );
						//newLink += '&mediadesc=' + escape( '&nbsp;' );
						newLink += '&mediatitle=' + escape( jQuery(this).attr('title') );
						newLink += '&mediadesc=' + escape( videodesc );
						jQuery('#videoviewer').attr('src',newLink);

						jQuery('#TB_window').show();	
						jQuery('#myoverlay').show();
					});
					
			jQuery('#TB_closeAjaxWindow').click(function() {
				jQuery('#TB_window').hide();
				jQuery('#myoverlay').hide();	
				jQuery('#videoviewer').attr('src','');
				return false;
			});
			jQuery('#myoverlay').click(function() {
				jQuery('#TB_window').hide();
				jQuery('#myoverlay').hide();	
				jQuery('#videoviewer').attr('src','');
				return false;
			});
			
			/* open lightbox by URL */
			
			  if ( checkPopup > 0 ) {
			
      checkPopup = myurl.substring( (checkPopup+6) );
//			alert('2: ' + checkPopup);
				mylink = '#' + checkPopup;
				jQuery( mylink ).addClass('active');
				newLink = jQuery( mylink ).attr('href').split('=');
				videoID = videoID[1];
				videodesc = jQuery(this).children('.videodesc').text() + '&nbsp;';
				newLink = '/Common/multimedia/youtubepopup.html';
				newLink += '?videoid=' + escape( videoID );
				//newLink += '&mediadesc=' + escape( '&nbsp;' );
				newLink += '&mediatitle=' + escape( jQuery(this).attr('title') );
				newLink += '&mediadesc=' + escape( videodesc );
				jQuery('#videoviewer').attr('src',newLink);
				jQuery('#TB_window').show();	
				jQuery('#myoverlay').show();
//			alert('show divs');
				return false;
   } else {
	 }
});