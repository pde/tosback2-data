$(document).ready(function() {
    // Back to top functionality
	$(".jumpUp").on('click', 'a',function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
	
	// Terms of use - second column of links
	var increment=1,start=15;
    $(".kmTermsUse ul.secList").children().each(function(i) {
        $(this).prepend('<tag>'+(start+i*increment).toString()+'.</tag>');
    });
	
	// Call by Phone popup functionality
	$("#CScallUsPop").on('click', function() {
		$("#backgroundPopup").css({"opacity": "0.8"}).fadeIn("slow");
		$("#popupContact").fadeIn("slow").centerOnScreen();
	});
				
	$(".popupContactClose, #backgroundPopup").on('click', function(){
		$("#backgroundPopup, #popupContact").fadeOut("slow");
	});
	
	$(document).keypress(function(e) {
		if (e.keyCode == 27) {
			$("#backgroundPopup, #popupContact").fadeOut("slow");
		}
	});

	// FAQ show/hide/viewAll/hideAll functionality on Buy Online. Pick Up in Store page
	$('a.top, #questions div.answers').hide();
	$('#questions').find('a').not('.plainLink').toggle( function() {
		$(this).addClass('selected');
		$(this).parent().next('div.answers').slideDown('fast');
	},function(){
		$(this).removeClass('selected');
		$(this).parent().next('div.answers').slideUp('fast');
	});
	
	$('a.viewAll').toggle(function() {
		$('#questions').find('a').not('.plainLink').click();
		$('a.top').show();
		$(this).text('Hide all FAQ answers');
	},function(){
		$('#questions').find('a').not('.plainLink').click();
		$('a.top').hide();
		$(this).text('View all FAQ answers');
	});
	
    var results = new RegExp('[\\?&]id=([^&#]*)').exec(window.location.href);
	if(results != null)	{
		id = '#'+results[1];
		new_id="a"+id;
		$(new_id).addClass('selected');
		$(new_id).parent().next('div.answers').show();
		var position = $(new_id).position();
		scroll(0,position.top);
	}	
});