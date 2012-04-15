/* 
 * Define $j as a substitution for the plain ole $ object we're used to in jquery.
 * We're doing this because there are still old parts of webshots using prototype js.
 */
var $j = jQuery.noConflict();


/*---------- slideSwitch: WHAT DOES THIS DO?
 * ========================================================================
 * This function takes a list (defined by the class .rotator) and turns its 
 * contained objects into a javascript slideshow. The length of the slideshow 
 * is determined in the call for the function. 
 * 
 * =========================================================================================
 * NOTE: This is NOT to be used for slideshows that are hundreds of images long. 
 * That would be a huge drag on the page. Please use this only for marketing campaigns and 
 * smaller slideshows. A more dynamic, ajax-based slideshow will be coming in the future for 
 * larger uses.
 * =========================================================================================
 * 
 *  EXAMPLE JS CALL: 
 *  		    setInterval("slideSwitch('.rotator')", 5000 );
 *  Where the number 5000 defines the pause, in milliseconds, between slides.
 *
 * EXAMPLE HTML: 
 * 	<div class="rotator">
 * 		<a href="http://www.webshots.com/page/landingpage?t=newWayToShare" class="promoSlide active"><img src="//p.webshots.net/images/advertising/2011/July/animotoTeaser3/ModuleHomepage-325x275.gif" /></a>
 *		<a href="http://www.webshots.com/r/PremiumCollections/animalantics/HP" class="promoSlide "><img src="//p.webshots.net/images/marketing/2011/WS/July/HomepageModule325x275.jpg" /></a>
 *	</div>
*/
function slideSwitch(containerId) {
	// Get the active slide object
    var activeSlide = $j('.rotator').find("a.active");

    // if there isn't an active slide, assign it to the last one in the list
    if ( activeSlide.length == 0 ) activeSlide = $j(containerId).find('a:last');
    
    // assign the value of the next slide after the activeSlide object to the variable nextSlide.
    var nextSlide =  activeSlide.next().length ? activeSlide.next() : $j(containerId).find('a:first');
    
    // add the class last-active to the activeSlide object
    activeSlide.addClass('last-active');
    
    // alter opacity animations for nextSlide and activeSlide objects. 
    nextSlide.css({opacity: 0.0}).addClass('active').animate({opacity: 1.0}, 1000, function() {
            activeSlide.removeClass('active last-active');
    });
}

/*---------- footerSitesMenu: WHAT DOES THIS DO?
 * ========================================================================
 * This function takes a dropdown select list (defined by the id AGISitesMenu) and on clicking the
 * adjacent button (#AGISitesMenuGoBtn), takes the user to that external AGI site.
 * 
 * =========================================================================================
 * NOTE: This is ONLY for use in the FOOTER -- putting it in a separate js file for security
 * and code beautification reasons.
 * =========================================================================================
 * 
 *  EXAMPLE JS CALL: 
 *  		    footerSitesMenu();
*/
function footerSitesMenu(){
	//controls the "external sites" select dropdown in the universal footer
	$j('#AGISitesMenuGoBtn').click(function(){
		window.location=document.getElementById('AGISitesMenu').options[document.getElementById('AGISitesMenu').selectedIndex].value;return false;
	});
}

function toolTips(e){
	if ($j(this).is(':visible')){
		$j(this).find('.toolTip').hide();
		} else {
		$j(this).find('.toolTip').show();
	}
}