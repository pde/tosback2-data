var closeDelayTimer = null;
var openDelayTimer = null; 
$(document).ready(function(){
	$( '.add_this .addthis_toolbox' ).css({ opacity: 0, top: 0, left: $( 'a#addThis_custom_link' ).outerWidth() - 24 }).hide();
	if( $( '.videoCaptionWrap .addthis_toolbox' ).length > 0 ){
		$( '.videoCaptionWrap .addthis_toolbox' ).css({ top: -50, left: -25 }).hide();
	} else if( $( '.modelpage .addthis_toolbox' ).length > 0 ){
		$( '.modelpage .addthis_toolbox' ).css({ top: -50, left: 60 }).hide();
	} else if( $( 'body' ).hasClass( 'visionpage') && $.browser.msie && $.browser.version == 7 ){
		$( '.add_this .addthis_toolbox' ).css({ top: -45 }).hide();
	}
	$('.add_this #addThis_custom_link, .videoCaptionWrap a').live( 'mouseenter', function(){
		var $this = $( this );
		$( '.add_this .addthis_toolbox, .videoCaptionWrap .addthis_toolbox' ).clearQueue();
		$( '.add_this .addthis_toolbox, .videoCaptionWrap .addthis_toolbox' ).stop();
		$( '.add_this .addthis_toolbox, .videoCaptionWrap .addthis_toolbox' ).show().animate({ opacity: 1 }, 'slow' );
	});
	$('.add_this, .videoCaptionWrap .addthis_toolbox').live( 'mouseleave', function(){
		$( '.add_this .addthis_toolbox, .videoCaptionWrap .addthis_toolbox' ).clearQueue();
		$( '.add_this .addthis_toolbox, .videoCaptionWrap .addthis_toolbox' ).stop();
		$( '.add_this .addthis_toolbox, .videoCaptionWrap .addthis_toolbox' ).animate({ opacity: 0 }, 'slow', function(){ $( this ).hide(); });
	});
});