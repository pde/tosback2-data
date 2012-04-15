jQuery.noConflict();
var docRef = 'default';
var locURL = '';
var popIMG = '';
var popALT = '';
var popTITLE = '';

if(document.referrer.indexOf('co.uk') != -1){
docRef='UK';
locURL = 'http://www.ralphlauren.co.uk/home/index.jsp?ab=RLUS_UKINTERSTITIAL_SHOPUK';
popIMG = '/graphics/media/polo/Interstitial_01.jpg';
popALT = 'Shop RALPHLAUREN.CO.UK';
popTITLE = 'Shop RALPHLAUREN.CO.UK';
}
else if (document.referrer.indexOf('.fr') != -1){
docRef='FR';
locURL = 'http://www.ralphlauren.fr/home/index.jsp?ab=global_interstitial_france';
popIMG = '/graphics/media/polo/interstitial_frFR.jpg';
popALT = 'Shop RALPHLAUREN.FR';
popTITLE = 'Shop RALPHLAUREN.FR';
}
else if (document.referrer.indexOf('.be') != -1){
docRef='BE';
locURL = 'http://www.ralphlauren.fr/home/index.jsp?ab=global_interstitial_belgium';
popIMG = '/graphics/media/polo/interstitial_frFR.jpg';
popALT = 'Shop RALPHLAUREN.FR';
popTITLE = 'Shop RALPHLAUREN.FR';
}
else if (document.referrer.indexOf('.lu') != -1){
docRef='LU';
locURL = 'http://www.ralphlauren.fr/home/index.jsp?ab=global_interstitial_luxembourg';
popIMG = '/graphics/media/polo/interstitial_frFR.jpg';
popALT = 'Shop RALPHLAUREN.FR';
popTITLE = 'Shop RALPHLAUREN.FR';
}
else if (document.referrer.indexOf('.nl') != -1){
docRef='NL';
locURL = 'http://www.ralphlauren.fr/home/index.jsp?ab=global_interstitial_netherlands&locale=en_FR';
popIMG = '/graphics/media/polo/interstitial_enFR.jpg';
popALT = 'Shop RALPHLAUREN.FR';
popTITLE = 'Shop RALPHLAUREN.FR';
}
 
else if (document.referrer.indexOf('.de/') != -1){
docRef='DE';
locURL = 'http://www.ralphlauren.de/home/index.jsp?ab=global_interstitial_germany';
popIMG = '/graphics/media/polo/interstitial_deDE.jpg';
popALT = 'Shop RALPHLAUREN.DE';
popTITLE = 'Shop RALPHLAUREN.DE';
}
else if (document.referrer.indexOf('.at/') != -1){
docRef='AT';
locURL = 'http://www.ralphlauren.de/home/index.jsp?ab=global_interstitial_austria';
popIMG = '/graphics/media/polo/interstitial_deDE.jpg';
popALT = 'Shop RALPHLAUREN.DE';
popTITLE = 'Shop RALPHLAUREN.DE';
}

if(docRef != 'default'){
	(function($){
		$(document).ready(function(){
			$('#ukLightbox map area:first').attr('href', locURL);
			$('#ukLightbox map area:first').attr('alt', popALT);
			$('#ukLightbox map area:first').attr('title', popTITLE);
			$('#ukLightbox img').attr('src', popIMG);
			$('a#hidden_link').fancybox({
				'width'		: 320,
				'height'	: 280,
				'transitionIn': 'fade',
				'overlayShow' : true,
				'overlayColor'     : '#999999',
				'overlayOpacity'    : 0.8,
				'scrolling'	  : 'no'
			}).click();
			

		});
	})(jQuery);
}

