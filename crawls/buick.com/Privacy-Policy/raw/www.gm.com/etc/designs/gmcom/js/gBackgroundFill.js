function backgroundLoaded(){
	$background = $( "div#background" )
	if( $background.find( 'img' ).length > 0 && $background.find( 'img' ).is( ':visible' )){
		$background.backgroundFill({
			imgKnownWidth  : 1024,  //The width of the image used to make sure the image is fully loaded
			imgKnownHeight : 768  //The height of the image used to make sure the image is fully loaded
		});
	} else {
		setTimeout( 
			function(){
				backgroundLoaded();
			},
			250
		);
	}
}

$( document ).ready( function(){
	if(!$("body").hasClass("iphone"))
		backgroundLoaded();

	if($('.subsection_image_link_container').length){
		//alert($('.subsection_image_link_container').find('li').eq(0).html());
		$('.subsection_image_link_container').find('li').eq(0).css('marginLeft','0px');
	}else{
		//alert("M existe");
	}
});

$(window).load(function() {
    $("#saturn_vehicles,#hummer_vehicles").find('.tabs').find("li").live('click',function(){		
		fullscreen();
	});
	$("#saturn_vehicles,#hummer_vehicles").find(".bottomTabContainerNext").live('click',function(){
		fullscreen();
	});
	$("#saturn_vehicles,#hummer_vehicles").find(".bottomTabContainerPrev").live('click',function(){
		fullscreen();
	});
	function fullscreen(){
		$("#saturn_vehicles,#hummer_vehicles").find("div#background").find('img').css({width:'100%',height:'100%'});
	}
	fullscreen();
});