$(document).ready(function(){
	
	var displayFlyout;
	var flyoutId;

	/*
	*  The functions below were added to remedy the opacity and a:hover issue in IE8.
	* IE8 has a bug where it will not display the a:hover CSS when opacity is set.
	*/
	
	$('.innerCat').children('a').mouseenter(function(){
		$(this).css('font-weight','bold');	
	});	

	$('.innerCat').children('a').mouseleave(function(){
                $(this).css('font-weight','normal');
    });
	

	function openFlyout(nav){
		$(nav).show();
	}
	
	function closeFlyout(nav){

                displayFlyout = setTimeout(function(){
                                $(nav).hide();
                        },500);
        }


	$('.categoryImg').mouseenter(function() {
		$('.mensFlyout').hide();
		clearTimeout(displayFlyout);
		flyoutId = "#"+$(this).next('.mensFlyout').attr('id');
		if(flyoutId != '#undefined'){
			openFlyout(flyoutId);
		}

	});

	/*
	* In order for the mouseover/hover to work in IE, background has to be defined so the event will be triggered upon mouse over
	* on the white space.
	*/

	$('.mensFlyout').mouseover(function(){
                clearTimeout(displayFlyout);
        });


        $('.mensFlyout').mouseleave(function(){
                flyoutId = "#" + $(this).attr('id');
                if(flyoutId != '#undefined'){
                        closeFlyout(flyoutId);
                }
        });

	$('.categoryImg').mouseleave(function() {
		
                flyoutId = "#"+$(this).next('.mensFlyout').attr('id');

		if(flyoutId != '#undefined'){
                        closeFlyout(flyoutId);
                }

        });


	//$('#tier2_23761').mouseleave(function(){
		//flyoutId = "#"+$(this).next('.mensFlyout').attr('id');	
		//console.debug(flyoutId);
		//closeFlyout(flyoutId);
		//$(this).next('.mensFlyout').hide();
		//this line is added to handle IE as it treats div under <dl> differently
                //$(this).children('.mensFlyout').hide();
	//});

});
