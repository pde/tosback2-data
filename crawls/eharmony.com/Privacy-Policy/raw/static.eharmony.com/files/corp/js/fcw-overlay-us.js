// if jQuery is included
if(typeof(jQuery) === 'function') {

	var fcwOverlay = {
		createOverlay:function() {
			//append overlay scripts and styles
			$("head").append('<link rel="stylesheet" type="text/css" href="http://static.eharmony.com/files/corp/css/fcw-overlay.css" />');
		
			//Append overlay markup
			$("body").append('<div id="fcwOverlayUS" class="fcwoverlay" style="display: none;"><div class="spacer"></div><div class="close_btn"></div></div>');
			
			//pop overlay
			$.blockUI({ 
				message: $('#fcwOverlayUS'), 
				showOverlay: false,
				centerY: false,
				css: { 
					margin: '0px',
					padding: '0px',
					top:  '40px', 
					left: ($(window).width() - 134)/2 + 'px',
					width: '549px', 
					backgroundColor: 'transparent',
					border: 'none',
					cursor: 'default'
				}
			});
			
			//close with X
			$('.fcwoverlay .close_btn').click( $.unblockUI );
								
			//cancel click/submit
			return false;
		} // End createOverlay function (  )
	}; // End fcwOverlay namespace

/*==================================================
jQuery DOM ready
--------------------------------------------------*/
	$(document).ready( function() {
		if( typeof(suppressFCoverlay) == 'undefined' || suppressFCoverlay == false ) {
			// If there's a reg form on this page
			if( $("form[name=registrationForm]").length ) {
				// pop the overlay
				fcwOverlay.createOverlay();
			} // End if
		} // End if
	}); // End (on ready)
} // End if ( jQuery exists )
