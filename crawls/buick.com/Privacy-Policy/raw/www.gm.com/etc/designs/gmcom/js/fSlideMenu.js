$(document).ready(function() {
	function offsetSet(){
		var windowWidth = $(window).width();
		switch( true ){
			case windowWidth >= 1024:
				return -200;
			case windowWidth > 980 && 1024 > windowWidth:
				return ( windowWidth - 980 ) / 44 * 35 - 186;
			default:
				return -200;
		}
	}
	
	
	var isAnimateOut = false;		//set the variable to false to show that the slide menu is "in"
	
	if($('body').hasClass('mobile')){
		 $("#slideMenuTag").click(function(){
			if ( !isAnimateOut ) {
				$( "#slideMenu" ).stop(true, false).animate({
					marginLeft: 0
				}, 'slow', 'swing', function(){
					isAnimateOut = true;
					$( "#slideMenu" ).show(function () {
						$(this).css ( 'margin-left', '0px' )
					});
				});
				//$("#topMenuImage").html('<img src="/etc/designs/gmcom/images/labelOut.jpg"/>');
				$("div.slidermenu-arrow-top").removeClass().addClass("slidermenu-arrow-top-mo");
				$("div.slidermenu-arrow-btm").removeClass().addClass("slidermenu-arrow-btm-mo");
			
			}
			else {
				$( "#slideMenu" ).animate({
					marginLeft: offsetSet()
				}, 'slow', 'swing', function(){
				//$("#topMenuImage").html('<img src="/etc/designs/gmcom/images/labelIn.jpg"/>');
				$("div.slidermenu-arrow-top-mo").removeClass().addClass("slidermenu-arrow-top");
				$("div.slidermenu-arrow-btm-mo").removeClass().addClass("slidermenu-arrow-btm");
	
					$("#openCloseIdentifier").hide();
					isAnimateOut = false;
				});
			}
		});
	}
	else{
		$("#slideMenuTag").hover(function(){		//calls the hover function for the sliderTag id
				if ( !isAnimateOut ) {
				$( "#slideMenu" ).stop(true, false).animate({
					marginLeft: 0
				}, 'slow', 'swing', function(){
					isAnimateOut = true;
					$( "#slideMenu" ).show(function () {
						$(this).css ( 'margin-left', '0px' )
					});
				});
				//$("#topMenuImage").html('<img src="/etc/designs/gmcom/images/labelOut.jpg"/>');
				$("div.slidermenu-arrow-top").removeClass().addClass("slidermenu-arrow-top-mo");
				$("div.slidermenu-arrow-btm").removeClass().addClass("slidermenu-arrow-btm-mo");
			
			}
		},function(){
					if ( isAnimateOut ) {
				$( "#slideMenu" ).animate({
					marginLeft: offsetSet()
				}, 'slow', 'swing', function(){
				//$("#topMenuImage").html('<img src="/etc/designs/gmcom/images/labelIn.jpg"/>');
				$("div.slidermenu-arrow-top-mo").removeClass().addClass("slidermenu-arrow-top");
				$("div.slidermenu-arrow-btm-mo").removeClass().addClass("slidermenu-arrow-btm");
	
					$("#openCloseIdentifier").hide();
					isAnimateOut = false;
				});
			}
		});
	}
	
	$( window ).resize( function() {
		if(!isAnimateOut){
			$( "#slideMenu" ).css({ marginLeft: offsetSet() });
			}
	})

	$( "#slideMenu" ).css({ marginLeft: offsetSet() });
});
