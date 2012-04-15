$(document).ready(function(){
	$('#tert-accordian-navigation').accordion({
		alwaysOpen: false, 
		autoheight: false,
		active: '.selected', 
		header: '.head', 
		navigation: false, 
		event: 'click', 
		animated: 'easeslide'
	});
	
});