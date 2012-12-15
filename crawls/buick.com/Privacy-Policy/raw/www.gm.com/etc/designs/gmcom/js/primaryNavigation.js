// fixes $ / mrm.$ jQuery conflict call between site and gmds app
var mrm = mrm || {}; mrm.$ = mrm.$ || jQuery;

// override if console unavailable.
if (typeof console == "undefined") {
	window.console = {
		log: function () {}
	};
}

function locationWrapper( url ){
	if ( $.browser.msie ) {
		var referLink = document.createElement('a');
		referLink.href = url;
		referLink.setAttribute("target", "_blank");
		document.body.appendChild(referLink);
		referLink.click();
	} else {
		//window.location = url;
		window.open(url);
	}
}


function addBodyClass(){
   navigator.userAgent.indexOf('Android')>-1?$('body').addClass('android mobile'):navigator.platform=='iPad'?$('body').addClass('ipad mobile'):navigator.platform=='iPhone'?$('body').addClass('iphone mobile'):donothing=true;

	if($('body').hasClass('iphone') || $('body').hasClass('ipad')){
		var uaVerString=navigator.userAgent.split('OS')[1];
		var os=parseInt(uaVerString.substring(0,4));

		if(os<5){
			$('body, html').addClass('ver4');
		}
		else{
			$('body').addClass('ver5');
		}
	}
	if(window.location.href.indexOf('/investors')>-1)
		$('body').addClass('investors-page');

	if(window.location.href.indexOf('/faqs')>-1)
		$('body').addClass('faq-page');
			
	if($('body').hasClass('mobile')){
		if(window.orientation==0 || window.orientation==180)
			$('html').addClass('portrait');
		else
			$('html').addClass('landscape');
			

	}
	
	// class for video gallery styles
	if ( $('div.flexVideoGallery').length > 0 ) { $('body').addClass('videoPage'); }
	
	// class for contact submit confirm
	if(window.location.href.indexOf('contactUsForm.extapp.html')>-1)
		$('body').addClass('submitted');
}

function getLocationFromUrl(targArray){
	isLoc=false;
	for(i in targArray){
		if(window.location.href.indexOf(targArray[i])>-1){
			isLoc=true;
			break;
		}
	}
	return isLoc;
}


var lastOrient,orientInterval,loc;


function orient() {
	var widthSize = $(window).width();
	if (widthSize < 1024 && widthSize > 768 ) {
	$("html").addClass("landscape").removeClass("portrait");
	orientation = 'landscape';
	 
	return false;
	}
	else if (widthSize<768) {
	$("html").addClass("portrait").removeClass("landscape");
	orientation = 'portrait';
	 
	return false;
	}
}
 

$(document).ready( function(){
	
	// resolve dropdown offsecreen
	if($('#primaryNavigation').innerWidth()<1274)
		$('#primaryNavigation ul li ul').css({left:0, right:'auto'});


 if($('body').hasClass('tabpage'))
	$('meta[name="viewport"]').replaceWith('<meta name="viewport" content="width=1200, initial-scale=0.92 maximum-scale=1.0" />');

	addBodyClass();
	lastOrient=window.orientation;
	

//add vignette to ipad and desktop non-flash brand pages
	if($('body').hasClass('ipad') && $('body').hasClass('brandpage')){
		$('body').append('<div id="vignette" ><img src="/etc/designs/gmcom/images/vignette.png"></div>');
	}
	
if(!($('html').hasClass('mac') && $('html').hasClass('safari'))){
	$( 'div#primaryNavigation > ul' ).fill({
		elements : 'li',
		fill     : 'li#blackFill'
	});
}

	$( 'li#vehicles, li#vision, li#company' ).primaryNavigationSlideDown();

	$( 'li#GMLogo' ).click( function(){
		location.href = "/content/gmcom/home.html";
	});

	$( 'li#contactUs, li#allGMSites' ).each( function(){
		if( typeof( Cufon ) == 'function' && Cufon.replace ){
			Cufon.replace( $( this ).children( 'h2' ).children( 'a' ), { fontFamily: 'gotham-bold', hover: true });
		}
	});

	$( '#primaryNavigation li form input' ).focus( function(){
		if( $( this ).attr( 'value' ) == 'SEARCH' )
			$( this ).attr( 'value', '' )
	}).blur( function(){
		if( $( this ).attr( 'value' ).length <= 0 )
			$( this ).attr( 'value', 'SEARCH' );
	});
	
	$('div#auxiliaryNavigation ul.right li').eq(7).addClass("last");
	
	orient();
	
	/* Call orientation function on orientation change */
	$(window).bind( 'resize', function(e){
		orient();
	});
	/****************/ 
	
});

 
