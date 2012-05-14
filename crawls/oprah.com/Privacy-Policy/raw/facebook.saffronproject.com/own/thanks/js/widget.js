$(document).ready(function() {

	$("a.video-link").mouseover( function(event) {
		$("#play-btn").css("backgroundPosition", "0 -87px");
	});
	
	$("a.video-link").mouseout( function(event) {
		$("#play-btn").css("backgroundPosition", "0 0");
	});
	
	$("a.video-link").click( function(event) {
		event.preventDefault();
		
		$("#video").html('<iframe width="290" height="176" src="http://www.youtube.com/embed/KkQGGVqG-Q4?rel=0&autoplay=1&showinfo=0&controls=0" frameborder="0" allowfullscreen></iframe>');
	});

});