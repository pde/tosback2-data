jQuery.noConflict();
var gnStPt = 0;
var gnLength;
// MANAGE COOKIES
var COOKIE_NAME = "my_carousel_position";
var cookiedomain = "cartoonnetwork.com";

function getGNStartPoint() {
    startVal = 0;
    var cookieVal = readCookie(COOKIE_NAME);
    if ((cookieVal != null) && (cookieVal != '')) {
        startVal = parseInt(cookieVal);
		deleteCookie(COOKIE_NAME);
    }
	if ((startVal >= gnLength) || startVal == "NaN") {
		startVal = 0;
	}
    gnStPt = startVal;
}

function resetGNStartPoint() {
    var cookieVal = readCookie(COOKIE_NAME);
    if(cookieVal != null){
       deleteCookie(COOKIE_NAME);
    }
	setCookie(COOKIE_NAME, gnStPt);
}

var navArray = new Array();

function doTrayNav() {
	navArray.sort(function(a,b){
		var show1 = a.linktext.toLowerCase();
		var show2 = b.linktext.toLowerCase();
		if (show1 < show2) {
			return -1;
		}
		if (show1 > show2) {
			return 1;
		}
		return 0;
	});

	var linksPerColumn = Math.ceil(navArray.length / 4);
	for (i = 1; i <= navArray.length; i++) {
		if (i <= linksPerColumn) {
			parentDiv = 1;
		} else if (i > linksPerColumn && i <= (linksPerColumn * 2)) {
			parentDiv = 2;
		} else if (i > (linksPerColumn * 2) && i <= (linksPerColumn * 3)) {
			parentDiv = 3;
		} else {
			parentDiv = 4;
		}
		jQuery('<div></div>').appendTo('div.traycolumn:nth-child(' + parentDiv + ')');
		jQuery('<a></a>').attr('href',navArray[i-1].linkurl).html(navArray[i-1].linktext).appendTo('div.gntray .traycolumn div:last');
	}
}

jQuery(document).ready(function() {

	/////////////////////////////////////////////////////////////////////////
	//  Auto Update the Copyright Year, hardcode year is currently stuck  at 2011.
		var d				= new Date();
		var legalcopy		= jQuery("#legalWrapper .legalSub").html() + " ";
		if(legalcopy != "" && legalcopy.length > 10){
			var newlegalcopy		= legalcopy.replace(/2011+/g, d.getFullYear());
			jQuery("#legalWrapper .legalSub").html(newlegalcopy);
		}
	/////////////////////////////////////////////////////////////////////////
	// move the alllshows tray to the footer after page load
	
		if (jQuery('.footer_rule').length > 0) {
			jQuery('.footer_rule').before(jQuery('div.gnbutton'));
			jQuery('.footer_rule').before(jQuery('#gnallshows'));
			jQuery('.footer_rule').css('display', 'none');
	
		} else if (jQuery('.footerBox').length > 0) {
			jQuery('.footerBox').prepend(jQuery('div.gnbutton'));
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


//		jQuery('#gnallshows').prependTo("div.footer");
//		jQuery('div.gnbutton').prependTo("div.footer");
	
	/////////////////////////////////////////////////////////////////////////

	
	

	if (window.location.hostname.indexOf('staging') > -1) {
		navdataUrl = "/cnservice/cartoonsvc/content/xml/getContentById.do?contentId=111880&depth=5&filterContentId=112446" + previewFormat;
	} else if (window.location.hostname.indexOf('fusionfall') > -1) {
		navdataUrl = "http://fusionfall.cartoonnetwork.com/cntools/includes/cmagen/navigation.xml";
	} else if (window.location.hostname.indexOf('pre-prod') > -1) {
		navdataUrl = "/tools/includes/cmagen/navigation.xml";
	} else {
		navdataUrl = "http://www.cartoonnetwork.com/tools/includes/cmagen/navigation.xml";
	}
	
	
	getGNStartPoint();
	jQuery.ajax({
		// get the collections XML
		type: "GET",
		url: navdataUrl,
		dataType: "xml",
		error: function (request, error) {
			// do this on AJAX error
		},
		success: function(data) {
			var i = 1;
			jQuery('<div></div>').addClass('navhide').appendTo('body');
			gnLength = jQuery(data).find('PropertyMaster').length;
			jQuery(data).find('PropertyMaster').each(function() {
				var gnLinkText = jQuery(this).find('Title').text();
				var clickMapName = gnLinkText.replace(/\s/g,'-');
				clickMapName = "?atclk_gn=link_shw_" + clickMapName.replace('\'','');
				var gnLinkURL = jQuery(this).find('CanonicalTag:first').text();
				if (window.location.hostname.indexOf('staging') > -1) {
					gnLinkURL = gnLinkURL.replace(/www/,'staging');
				}
//				var gnLinkURL = jQuery(this).find('brandPickerImage:first').find('srcUrl').text();
				var gnIcon = jQuery(this).find('brandPickerImage:first').find('srcUrl').text();
				// populate sortable array that will be used to generate the all shows tray menu
				navArray[i-1] = {linktext:gnLinkText,linkurl:gnLinkURL};

				// add the new carousel icon to the carousel 
				var clickString = clickMapName;
//				htmlString = '<a href="' + gnLinkURL + '"><img src="http://i.cdn.turner.com/v5cache/CARTOON/site/' + gnIcon + '" width="65" height="50" alt="' + gnLinkText + '" title="' + gnLinkText + '" border="0"></a>';
				var htmlString = '<a href="' + gnLinkURL + clickString + '"><img src="http://i.cdn.turner.com/v5cache/CARTOON/site/' + gnIcon + '" width="65" height="50" alt="' + gnLinkText + '" title="' + gnLinkText + '" border="0"></a>';
				jQuery('<li></li>').html(htmlString).appendTo('div.navhide');

				if (i == jQuery(data).find('PropertyMaster').length) {
					//doTrayNav();
					jQuery('img[title]').tooltip({ position: 'bottom right', offset:[-8,-33], tipClass: 'tooltip' });
					jQuery('.navWrapper .floater .navcarousel .outer .inner').css('width',690);
				}
				i++;
			});
			for (i = 0; i < 10; i++) {
				var poppedOn = 	jQuery('.navhide li:first').detach();
				poppedOn.appendTo('.navWrapper .floater .navcarousel .outer .inner ul');
			}
		}
	});


	// init hovers and buttons
	jQuery('#gnSearchBtn').hover(
		function(){
			jQuery(this).attr({src:'http://www.cartoonnetwork.com/tools/img/globalnav/go_on.gif'});
		},
		function(){
			jQuery(this).attr({src:'http://www.cartoonnetwork.com/tools/img/globalnav/go_off.gif'});
		}
	);

    jQuery('#deleteCookie').click(function(){
		delCookie(COOKIE_NAME);
		return false;
    });

});

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



var prevMngr = 0;
var prevLmt = 0;
var nextMngr = 0;
var nextLmt = 0;
function popPrev() {
	clearInterval (nextMngr);
	if (prevLmt < 10) {
		var poppedOff = jQuery('.navWrapper .floater .navcarousel .outer .inner ul li:last').detach();
		var poppedOn = 	jQuery('.navhide li:last').detach();
		poppedOff.prependTo('.navhide');
		poppedOn.prependTo('.navWrapper .floater .navcarousel .outer .inner ul');
		prevLmt += 1;
	} else {
		clearInterval (prevMngr);
		prevLmt = 0;
	}
}
function popNext() {
	clearInterval (prevMngr);
	if (nextLmt < 10) {
		var poppedOff = jQuery('.navWrapper .floater .navcarousel .outer .inner ul li:first').detach();
		var poppedOn = 	jQuery('.navhide li:first').detach();
		poppedOff.appendTo('.navhide');
		poppedOn.appendTo('.navWrapper .floater .navcarousel .outer .inner ul');
		nextLmt += 1;
	} else {
		clearInterval (nextMngr);
		nextLmt = 0;
	}
}
function gnPrev() {
	clearInterval (nextMngr);
	clearInterval (prevMngr);
	prevMngr = setInterval("popPrev()",50);
}

function gnNext() {
	clearInterval (nextMngr);
	clearInterval (prevMngr);
	nextMngr = setInterval("popNext()",50);
}

/******* Disabled by Brendellya 1/17/2012
jQuery(document).ready(function() {
		jQuery.ajax({
		// get the collections XML
		type: "GET",
		url: "/tools/includes/navigation_topsearch.xml",
		dataType: "xml",
		error: function (request, error) {
			// do this on AJAX error
		},
		success: function(data) {
			var count = 0;
			jQuery(data).find('ListItem').each(function() {
				if (count < 6) {
					if (count < 3) {
					jQuery('#mn_topsearches_listL').append('<li><a href="'+ jQuery(this).find('url').text()+'">'+ jQuery(this).find('text').text() +'</a></li>')
					} else {
					jQuery('#mn_topsearches_listR').append('<li><a href="'+ jQuery(this).find('url').text()+'">'+ jQuery(this).find('text').text() +'</a></li>')
					}
				}
				count++;
			});
	
		}
		});
});
****************/


function mnShowSearch() {
		jQuery('#mn_searchbox').show();
}

function mnHideSearch() {
		jQuery('#mn_searchbox').hide();
}