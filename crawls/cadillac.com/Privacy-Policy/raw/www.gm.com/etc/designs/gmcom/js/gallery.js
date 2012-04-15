function galleryModalVideo(){
	var $target = $( 'ul.slideshow a' ),
		options = { height: 618, width: 630 },
		flag = true;
	$target.each( function(){
		var $this = $( this );
		if( $this.parents( 'ul#bottomTabContainerData' ).length <= 0 ){
			$this.modal( options );
			flag = false;
		}
	});
	if( flag ){
		setTimeout( 
			function(){
				galleryModalVideo( $target, options );
			},
			250
		);
	}
}

$(document).ready( function(){
	if( $( 'ul.slideshow' ).length > 0 ){
		if( $( 'body' ).hasClass( 'tabpage' ) ){
			$( 'ul.slideshow' ).gallery({
				width               : 315,   // Override the default CSS width
				height              : 240,   // Override the default CSS height
				enlarge             : false,  //does the gallery elarge in a modal popup
				autoAdvance         : false, //do not auto advance
				animSpeed           : 1000,  //Slide transition speed
				pauseTime           : 10000, // Time between transitions
				youTubeStart        : false, //If the gallery item is a youtube video start the video when it comes up.
				youTubePauseAdvance : false, //If youtube video is paused and in gallery of length greater than 1 advance to next item automaticly
				youTubeEndAdvance   : false  //If youtube video ends and in gallery of length greater than 1 advance to next item automaticly 
			});
		} else {
			$( 'ul.slideshow' ).gallery({
				width               : 433,   // Override the default CSS width
				height              : 325,   // Override the default CSS height
				heightEnlarged      : 465,
				widthEnlarged       : 615,
				enlarge             : false,  //does the gallery elarge in a modal popup
				autoAdvance         : false, //do not auto advance
				animSpeed           : 1000,  //Slide transition speed
				pauseTime           : 10000, // Time between transitions
				youTubeStart        : false, //If the gallery item is a youtube video start the video when it comes up.
				youTubePauseAdvance : false, //If youtube video is paused and in gallery of length greater than 1 advance to next item automaticly
				youTubeEndAdvance   : false  //If youtube video ends and in gallery of length greater than 1 advance to next item automaticly 
			});
			if( $( '#videogalleryvideo_gallery_crx' ).length > 0 ){
				galleryModalVideo();
			}
		}
	}
});