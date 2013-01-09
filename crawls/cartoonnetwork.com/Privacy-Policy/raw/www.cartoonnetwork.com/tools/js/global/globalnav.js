
jQuery.noConflict();

var _gn = new GlobalNav();

jQuery(document).ready(function() {

	//////////////////////////////////////////////////////////////////////////
	// Mobile check
	
		var uaCheck = navigator.userAgent.toLowerCase();
		var isAndroid = uaCheck.indexOf("android") > -1;
		var isATab = uaCheck.indexOf("mobile") > -1;
		
		if (isAndroid == true && isATab == true) {
			var isAndroidCheck = true;	
		}
			
//		if ((navigator.userAgent.match(/iPhone/i)) || isAndroidCheck ){

/****** Disable mobile web  (rknopf:10/19/2012) NOTE: Let Jake know when reenabled for testing with SMAMP!


		if ((navigator.userAgent.match(/iPhone/i)) ) {
			
				  var mMobilePref = readCookie("mobile_pref");
				 if ((mMobilePref != null) && (mMobilePref != '')) {
					if (mMobilePref = "full") { 
					 } else if (mMobilePref = "mobile") {
						location.replace("http://www.cartoonnetwork.com/m");
						
					}
						
				} else {

						location.replace("http://www.cartoonnetwork.com/m");
				}

		}
 ******/

		
	/////////////////////////////////////////////////////////////////////////
	//  Auto Update the Copyright Year, hardcode year is currently stuck  at 2011.
		var d				= new Date();
		var legalcopy		= jQuery("#legalWrapper .legalSub").html() + " ";
		if(legalcopy != "" && legalcopy.length > 10){
			var newlegalcopy		= legalcopy.replace(/2011+/g, d.getFullYear()).replace(/2012+/g, d.getFullYear());
			jQuery("#legalWrapper .legalSub").html(newlegalcopy);
		}
		
		

	
	/////////////////////////////////////////////////////////////////////////
	// move the allshows tray to the footer after page load
	
		if (jQuery('.footer_rule').length > 0) {
			jQuery('.footer_rule').before(jQuery('div.gnbutton').removeClass("hiddenbox"));
			jQuery('.footer_rule').before(jQuery('#gnallshows'));
			jQuery('.footer_rule').css('display', 'none');
	
		} else if (jQuery('.footerBox').length > 0) {
			jQuery('.footerBox').prepend(jQuery('div.gnbutton').removeClass("hiddenbox"));
			jQuery('.footerBox').prepend(jQuery('#gnallshows'));
	
		}

		var docWidth = jQuery(document).width();
		var footerWidth = jQuery('div.footer').width();
		var containerWidth = jQuery('#container').width();
		var gnbuttonWidth = jQuery('div.gnbutton').width();
		
		if (footerWidth < docWidth) { 
			jQuery('#seoShell div:first').attr('id', 'idAddedFooter');
			jQuery('#seoShell').after(jQuery('#seoShell div:first'));
			if (containerWidth < docWidth) { 
				jQuery('#container').after(jQuery('#idAddedFooter'));
			}
		}


	/////////////////////////////////////////////////////////////////////////
	// adjust the global nav is there's no ad served on the page

		if (jQuery(".ad728Wrapper").length == 0) {
			jQuery("#navWrapper").css("margin-top", "0px");
		}


	//////////////////////////////////////////////////////////////////////////
	// rollover animation for the four main nav buttons
	// only apply if the user is not on a mobile device

		if(!isATab) {

			/*  easing functions used for the rollovers  */
			jQuery.extend( jQuery.easing, {
				def: 'easeOutQuad',
				easeOutQuad: function (x, t, b, c, d) {
					return -c *(t/=d)*(t-2) + b;
				},
				easeInOutQuad: function (x, t, b, c, d) {
					if ((t/=d/2) < 1) return c/2*t*t + b;
					return -c/2 * ((--t)*(t-2) - 1) + b;
				}
			});

			/*  add the hover listeners for the main nav icons  */
			jQuery('.gn_wrapper')
				.mouseenter(function(){
					var thisIcon = jQuery(".gn_icon", this);								// grab a reference to the icon
					jQuery(".active", this).stop(true, true).fadeIn(150, 'easeOutQuad');	// fade in the grey background
					thisIcon.stop(true).animate({top:"-7px"}, 150, 'easeOutQuad');			// animate the icon up
					thisIcon.animate({top: "1px"}, 200, 'easeInOutQuad');					// and then back down
				})
				.mouseleave(function(){
					jQuery(".active", this).fadeOut(200, 'easeOutQuad');					// fade out the grey background
				})
		}


	/////////////////////////////////////////////////////////////////////////
	// nav slider functionality
	
	
	// grab the URL for the icons XML file
	if (window.location.hostname.indexOf('staging') > -1) {
		navdataUrl = "/cnservice/cartoonsvc/content/xml/getContentById.do?contentId=111880&depth=5&filterContentId=112446" + previewFormat;
	} else if (window.location.hostname.indexOf('fusionfall') > -1) {
		navdataUrl = "http://fusionfall.cartoonnetwork.com/cntools/includes/cmagen/navigation.xml";
	} else if (window.location.hostname.indexOf('pre-prod') > -1) {
		navdataUrl = "/tools/includes/cmagen/navigation.xml";
	} else {
		navdataUrl = "http://www.cartoonnetwork.com/tools/includes/cmagen/navigation.xml";
	}
	
	// load the icons XML
	jQuery.ajax({
		type: "GET",
		url: navdataUrl,
		dataType: "xml",
		error: function (request, error) {
			if (window.location.hostname.indexOf('blog') > -1) {
				jQuery(".navhide").find('li').each(function(){
					_gn.hiddenIcons.push(jQuery(this).html());
				});

				_gn.setInitialIcons();
			}
		},
		success: function(data) {

	
			jQuery(data).find('PropertyMaster').each(function() {		// go through each node and grab the pieces we need

				var gnLinkText = jQuery(this).find('Title').text();
				var clickMapName = gnLinkText.replace(/\s/g,'_');
				clickMapName = "?atclk_gn=picker_" + clickMapName.replace('\'','');
				var gnLinkURL = jQuery(this).find('CanonicalTag:first').text();
				if (window.location.hostname.indexOf('staging') > -1) {
					gnLinkURL = gnLinkURL.replace(/www/,'staging');
				}
				var gnIcon = jQuery(this).find('brandPickerImage:first').find('srcUrl').text();

				// build the html string and add it to the array of icons
				var htmlString = '<a href="' + gnLinkURL + clickMapName + '"><img src="http://i.cdn.turner.com/v5cache/CARTOON/site/' + gnIcon + '" width="65" height="50" alt="' + gnLinkText + '" border="0"></a>';
				_gn.hiddenIcons.push(htmlString);
			});

			_gn.setInitialIcons();

		}
	});

});

function GlobalNav() {

	var self = this;
	self.icons_shown = 12;
	self.loadedIcons = [];
	self.hiddenIcons = [];

	// deactivate the button listeners so that you can't click the arrows repeatedly
	this.removeButtonListeners = function() {
		jQuery("#sliderPrev").unbind("click", self.gnPrevClick);
		jQuery("#sliderNext").unbind("click", self.gnNextClick);
	}

	this.addButtonListeners = function() {
		jQuery("#sliderPrev").bind("click", self.gnPrevClick);
		jQuery("#sliderNext").bind("click", self.gnNextClick);
	}


	// when the page first loads, set the initial icons for the slider
	this.setInitialIcons = function() {
		for (var i = 0; i < self.icons_shown*2; i++) {		// add the first 24 icons to the end of the slider
			var currentIcon = self.hiddenIcons.shift();
			self.loadedIcons.push(currentIcon);
		}
		for (var i = 0; i < self.icons_shown; i++) {			// add the last 12 icons to the front of the slider
			var currentIcon = self.hiddenIcons.pop();
			self.loadedIcons.unshift(currentIcon);
		}

		self.updateSliderHTML();
	}

	// update the HTML inside of the div that contains the sliding icons
	this.updateSliderHTML = function () {
		jQuery('#navSlider_iconContainer ul').empty();		// empty the container

		for (var i = 0; i < self.loadedIcons.length; i++) {
			jQuery('<li></li>').html(self.loadedIcons[i]).appendTo('#navSlider_iconContainer ul');  // add each loaded icon
		}

		//////////  tooltip functionality  //////////

			if(!(navigator.userAgent.toLowerCase().indexOf("mobile") > -1)){		// don't apply if it's a mobile device
				var tooltip = jQuery("#tooltip");
				var containerWidth = jQuery("body").width();
				var viewPortWidth = jQuery("#navSlider_viewPort").width();
				if (containerWidth < viewPortWidth) containerWidth = viewPortWidth;
				var tooltipWidth;
				var viewPortBottom;

				jQuery("#navSlider ul li").mouseenter(function(e){
						viewPortBottom = jQuery("#navSlider_viewPort").offset().top + jQuery("#navSlider_viewPort").height();  // get the page coordinates of the viewport
						tooltip.css("top", (viewPortBottom-4)+"px");
						tooltip.html(jQuery("img", this).attr("alt")).stop(true, true).delay(100).fadeTo(200, 1);  // change the tooltip's text and fade it in
						tooltipWidth = tooltip.outerWidth();
					}).mousemove(function(e){
						if (e.pageX > containerWidth/2) {
							tooltip.css("left", (e.pageX-tooltipWidth+10)+"px");		// follow the mouse, position the tooltip to the right
						} else {														// for the left half and to the left for the right half
							tooltip.css("left", (e.pageX-10)+"px");
						};
					}).mouseleave(function(e){
						tooltip.stop(true, true).fadeTo(200, 0.01);
					});
			}
			
		////////// end of tooltip functionality  //////////

		jQuery('#navSlider_iconContainer').css('left', "-853px");		// set the position back to its original point
		self.addButtonListeners();
	}


	this.gnPrevClick = function() {
		self.removeButtonListeners();
		jQuery('#navSlider_iconContainer').animate({ left: '+=853' }, 550, self.updatePrev );  // slide the icon container to the right
	}

	this.gnNextClick = function() {
		self.removeButtonListeners();
		jQuery('#navSlider_iconContainer').animate({ left: '-=853' }, 550, self.updateNext );  // slide the icon container to the left
	}


	this.updatePrev = function() {
		for (var i = 0; i < self.icons_shown; i++) {	
			var sendToHidden = self.loadedIcons.pop();  		// grab 12 icons from end of loadedIcons and add to front of hiddenIcons
			self.hiddenIcons.unshift(sendToHidden);
			var sendToLoaded = self.hiddenIcons.pop();  		// then grab 12 icons from end of hiddenIcons and add to front of loadedIcons
			self.loadedIcons.unshift(sendToLoaded);
		}
		self.updateSliderHTML();
	}

	this.updateNext = function() {
		for (var i = 0; i < self.icons_shown; i++) {	
			var sendToHidden = self.loadedIcons.shift();  		// grab 12 icons from front of loadedIcons and add to end of hiddenIcons
			self.hiddenIcons.push(sendToHidden);
			var sendToLoaded = self.hiddenIcons.shift();  		// then grab 12 icons from front of hiddenIcons and add to end of loadedIcons
			self.loadedIcons.push(sendToLoaded);
		}
		self.updateSliderHTML();
	}

}


/////////////////////////////////////////////////////////////////////////
// global switch class function

function switchClass(targetElement,className) {
	if (className.indexOf('.') <= -1) {
		dotClass = "." + className;
	}
	if (jQuery(targetElement).is(dotClass)) {
		jQuery(targetElement).removeClass(className);
	} else {
		jQuery(targetElement).addClass(className);
	}
}