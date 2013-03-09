avast.navContent = "";
$(document).ready(function(){
	var tabs = avast.tabs;
	var navigation = avast.navigation;
	var gaTracking = avast.gaTracking;
	
	if(!avast.disableTooltip) $('#content-holder').tooltip();
	if(!avast.disableTabs) tabs.init("#tabs");
	if(!avast.disableLanguageSelector) $('.region').languageSelector();
	if(!avast.disableNavigation) navigation.init({navContent:avast.navContent});
	if(!avast.disableGaTracking) gaTracking.init();
    if(!avast.disableSlideTop) $('#content-holder').slideTop();
    if(!avast.disableToggleSlide) $('#content-holder').toggleSlide();
	if(!avast.disableTestimonials) $('#testimonial').testimonials();
    // Init hadd
    var avastHadd = avast.hadd;
    if(!avast.disableHadd && typeof avastHadd.init != 'undefined') avastHadd.init();

	/*
	 * Bind sharebox events
	 */
	$('#btnShareboxFooter').bind('mouseover click', function(){
		if( $('#blockShareboxFooter').length > 0 ){
			avast.sharebox.add(
				$(this),
				'#blockShareboxFooter',
				{
					title : $('body').find('h1').text(),
					ref : document.location.href,
					msg : $('body').find('h2').text(),
					effect : 'fade',
					xPos : 'left',
					yPos : 'top',
					yFix : 10,
					xFix : 0
				}
			);
			return false;
		}
	});

	/*
 	* change nav url on Mac
 	*/
	var os = avast.getOS();
	if (os === 'MacOS'){
		var navItem = $('.navlevel-0 li').eq(1).find('a');
		var itemHref = navItem.attr('href');
		var newUrl = (itemHref) ? itemHref.replace(/free-antivirus-download/, "free-antivirus-mac") : '';
		if(newUrl) {
			navItem.attr('href', newUrl);
		}
	}

	/*
	 * Initialization of Awards slider
	 */
    var frames = $('#awards .frame').children().length;
    if(!avast.disableSlider && frames > 3) avast.slider.init("awards","#awards-slides",
        {
            auto: false,
            pager: false,
            infiniteLoop: true,
            moveSlides: 1,
            minSlides: 1,
            maxSlides: 3,
            slideWidth: 299,
            slideMargin: 0,
            controls: true,
            nextSelector: ".ra",
            prevSelector: ".la",
            onSliderLoad: function(){
                // IE Fix :  Set clones hidden in css and show them when all bxslider is ready to show
                $('.bx-clone').css('visibility', 'visible');
            }
         });

    /*
     * Initialization of Products slider
     */
    var productFrames = $('#other .frame').children().length;
    if(!avast.disableSlider && productFrames > 2) avast.slider.init("awards","#other .slider-slides",
        {
            auto: false,
            pager: false,
            infiniteLoop: true,
            moveSlides: 1,
            minSlides: 1,
            maxSlides: 2,
            slideWidth: 449,
            slideMargin: 0,
            controls: true,
            nextSelector: ".ra",
            prevSelector: ".la",
            onSliderLoad: function(){
                // IE Fix :  Set clones hidden in css and show them when all bxslider is ready to show
                $('.bx-clone').css('visibility', 'visible');
            }
         });
});