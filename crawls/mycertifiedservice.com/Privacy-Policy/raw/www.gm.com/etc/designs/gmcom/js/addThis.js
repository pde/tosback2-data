var closeDelayTimer = null;
var openDelayTimer = null; 
	var tOut=null;
$(document).ready(function(){
	
	$( '.addthis_toolbox' ).css({ opacity: 0, zIndex:9999,'margin-top':'1px' }).hide();
	$( '.contentpage .add_this .addthis_toolbox, .contentpagetwocolumn .add_this .addthis_toolbox' ).css({left:82,top:-65});
	
	$( '.videoCaptionWrap .addthis_toolbox' ).css({ top: -63, left: -16});
	$( '.modelpage .addthis_toolbox' ).css({ top: -66, left: 83 });
	
	if( $( 'body' ).hasClass( 'visionpage') && $('html').hasClass('ie7') ){
		$( '.add_this .addthis_toolbox' ).css({ top:-66, left:76 });
	}
	$('.add_this #addThis_custom_link, #addThis_container #addThis_custom_link, .videoCaptionWrap a').live( 'mouseenter', function(){
		
		var $this = $( this );

		// prevent page multiple "add this" activation
		$this.next().clearQueue();
		$this.next().stop();
		
		//shift toolbox location for video containers
		if($this.parents("#video").length){
			if($('html').hasClass('ie8') || $('html').hasClass('ie9'))
				$this.next().css({ top: -61, left: -18 });
			else
				$this.next().css({ top: -61, left: -18 });
		}
		else if($this.parents(".modalPopOutContentGallery").length){
			if($('html').hasClass('ie8') || $('html').hasClass('ie9'))
				$this.next().css({ top:-22, left:-36 });
			else
				$this.next().css({ left:-36 });
		}
			
		$this.next().show().animate({ opacity: 1 }, 'fast' );	

		
	});
	
	
	
	$('.add_this, .videoCaptionWrap .addthis_toolbox, .contentpage .shadedContainerPop .addthis_toolbox, .contentpagetwocolumn .shadedContainerPop .addthis_toolbox, .videoCaptionWrap > div#addThis_container > a').live( 'mouseleave', function(){
		tOut=setTimeout(closeToolbox,100,$(this));
	});
	$('.addthis_toolbox').live( 'mouseenter', function(){
		console.log('called clear '+tOut);
		clearTimeout(tOut);
		addthis.toolbox(".addthis_toolbox");
	});
	function closeToolbox(t){

		$( '.add_this .addthis_toolbox, .videoCaptionWrap .addthis_toolbox' ).clearQueue();
		$( '.add_this .addthis_toolbox, .videoCaptionWrap .addthis_toolbox' ).stop();
		$( '.add_this .addthis_toolbox, .videoCaptionWrap .addthis_toolbox' ).animate({ opacity: 0 }, 'fast', function(){ $( this ).hide(); });

		$( '.shadedContainerPop .addthis_toolbox' ).clearQueue();
		$( '.shadedContainerPop .addthis_toolbox' ).stop();
		$( '.shadedContainerPop .addthis_toolbox' ).animate({ opacity: 0 }, 'fast', function(){ $( this ).hide(); });
	};
	
		
});