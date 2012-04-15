// JavaScript Document
$(document).ready( function(){
	$( '.promoSlideshow' ).gallery({
		width               : 436,   // Override the default CSS width
		height              : 130,   // Override the default CSS height
		enlarge             : false,  //does the gallery elarge in a modal popup
		autoAdvance         : false, //do not auto advance
		animSpeed           : 1000,  //Slide transition speed
		headerAttribute     : null,
		captionAttribute    : null
	});
});