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
		document.body.appendChild(referLink);
		referLink.click();
	} else {
		window.location = url;
	}
}


function updateOnOrientationChange(){

//	lastOrient=thisOrient;


//$( 'meta[name="viewport"]' ).attr( 'content', 'width = device-width, initial-scale = 1');
//	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
//		
//    var viewportmeta = document.querySelector('meta[name="viewport"]');
//    if (viewportmeta) {
//        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
//        document.body.addEventListener('gesturestart', function () {
//            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
//        }, false);
//    }
//	}
//}

	switch( window.orientation ){
		case 0:
		case 180:
			$('html').removeClass('landscape').addClass('portrait');
			switch( navigator.platform ){
				case 'iPad':
					if(getLocationFromUrl(['/investors']))
					$( 'meta[name="viewport"]' ).attr( 'content', 'width = 1030, height=1000, initial-scale=1, minimum-scale = .5, maximum-scale = 1' );
					else
					$( 'meta[name="viewport"]' ).attr( 'content', 'width = 980, initial-scale = .78, minimum-scale = .5, maximum-scale = 3' );

					break;
				case 'iPhone':
					$( 'meta[name="viewport"]' ).attr( 'content', 'width = 980, initial-scale = 1, minimum-scale = .5, maximum-scale = 3' );
					break;
			}
			break;
		default:
			$('html').removeClass('portrait').addClass('landscape');
			switch( true ){
				case $( 'body' ).hasClass( 'homepage' ):
					$( 'meta[name="viewport"]' ).attr( 'content', 'width = 1024, initial-scale = 1, minimum-scale = .5, maximum-scale = 3' );
					break;
				default:
					if(getLocationFromUrl(['/investors.html']) && navigator.platform=='iPad')
					$( 'meta[name="viewport"]' ).attr( 'content', 'width = 1030, minimum-scale = .5, maximum-scale = 1' );
					else
					$( 'meta[name="viewport"]' ).attr( 'content', 'width = device-width, initial-scale = 1, minimum-scale = .5, maximum-scale = 3' );
			}
	}
	if(lastOrient != window.orientation){
		lastOrient=window.orientation;
		window.location.reload();
	}
}
function addBodyClass(){
   navigator.userAgent.indexOf('Android')>-1?$('body').addClass('android mobile'):navigator.platform=='iPad'?$('body').addClass('ipad mobile'):navigator.platform=='iPhone'?$('body').addClass('iphone mobile'):donothing=true;

	if($('body').hasClass('iphone') || $('body').hasClass('ipad')){
		var uaVerString=navigator.userAgent.split('OS')[1];
		var os=parseInt(uaVerString.substring(0,4));
		if(os<5){
			$('body').addClass('ver4');
		}
	}
	if(window.location.href.indexOf('/investors')>-1)
		$('body').addClass('investors-page');
			
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

function setOrientInterval(){
//		orientInterval=setInterval(function(){if(window.orientation!=lastOrient){updateOnOrientationChange()};},500);
}

function orient() {
	var widthSize = $(window).width();
	console.log(widthSize);
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
	
	addBodyClass();
	
	lastOrient=window.orientation;
	updateOnOrientationChange();

//add vignette to ipad and desktop non-flash brand pages
	if($('body').hasClass('ipad') && $('body').hasClass('brandpage')){
		$('body').append('<div id="vignette" ><img src="/etc/designs/gmcom/images/vignette.png"></div>');
	}
	
	if( navigator.platform == 'iPad' || navigator.platform == 'iPhone' ){
	//	setOrientInterval();
		// $( 'body' ).resize( function(){ updateOnOrientationChange(); });

		// window.ongesturestart=function(event){// enables pinch-close after rotating from landscape
		// 	if(window.orientation==0 || window.orientation==180){
		// 		if(getLocationFromUrl(['/investors.html']))
		// 			$( 'meta[name="viewport"]' ).attr( 'content', 'width = 1030, height=1000, initial-scale=1, minimum-scale = .4, maximum-scale = 1' );
		// 		if(getLocationFromUrl(['brand_landing_pages']))
		// 			$( 'meta[name="viewport"]' ).attr( 'content', 'width = 980, initial-scale = .78, minimum-scale = .4, maximum-scale = 3' );
		// 	}
		// 		updateOnOrientationChange();
		// }
	}
	$( 'div#primaryNavigation > ul' ).fill({
		elements : 'li',
		fill     : 'li#blackFill'
	});

	//$( 'div#primaryNavigation > ul' ).css({ width : 980 });
	//alert( "$( 'div#primaryNavigation > ul' ).width() " + $( 'div#primaryNavigation > ul' ).width() );

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

 
