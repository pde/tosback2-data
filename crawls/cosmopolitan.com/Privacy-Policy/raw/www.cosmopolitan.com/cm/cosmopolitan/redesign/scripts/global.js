$(document).ready(function() {
	// ----- back to top button
	$(".backtotopbutton").click(function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	})
	// ------ validate search form
	$("form[action='/search/']").submit(function(){
		$input = $("input[name=q]",this);
		var str = $.trim($input.val());
		if(str==null || str==''|| str=='search cosmo...'){
			alert("Please enter a valid search term");
			return false;
		}
	});
	 // ----- search box
	$("#HDM_site #aux_search").click(function(){
		if ($(this).val()=="search cosmo...") {
		$(this).val("");
		}
	})
	$("#HDM_site #aux_search").blur(function(){
		if ($(this).val()=="") {
		$(this).val("search cosmo...");
		}
	})
	// ----- stickymenu search box
	$(".stickymenu #aux_search, .stickymenu #headerSearch #aux_search").click(function(){
		if ($(this).val()=="search cosmo...") {
			$(this).val("");
		}
	})
	$(".stickymenu #aux_search").blur(function(){
		if ($(this).val()=="") {
			$(this).val("search cosmo...");
		}
	})

	$(document).scroll(function(){
		$(".tyntShIh").removeClass("tyntIhHover");		
	})
	
	function jqUpdateSize(){
		// Get the dimensions of the viewport
		var width = $(window).width();
		var height = $(window).height();
		
		if (width>959) {	// ----- jquery changes for desktop view
			// ----- contentWell width from tablet to desktop
			$('#contentWell').removeClass('g372');
			$('#contentWell').addClass('g744');
			var className = $('#contentWell').prev().attr('id');
			if (className == 'promoPlayerWrapper') {
				$('#contentWell').prepend($('#promoPlayerWrapper'));
			}
			
			// ----- make sure form is in mainnav (moved in tablet view)
			//$('.tier1 li .search').append($('#tabletHeaderSearch form'));
			//$('.tier1 li .search').find('form:nth-child(2)').remove(); // ----- appearing twice for some reason
			
			// ----- promoPlayerWrapper width from tablet to desktop
			$('#promoPlayerWrapper').addClass('g744');
			$('#promoPlayerWrapper').addClass('inside');
			
			// ----- ensure gallery ad is at top of right rail
			var galleryAdDiv = $("#pos_ams_cosmo_gallery")
			galleryAdDiv.find("span[id] script:contains('document.write')").remove(); // strip out tags that may document.write
			$('#pos_ams_cosmo_gallery').insertBefore($('#containerLatest'));
			
			// ----- make sure last 2 modules are here for portrait to landscape flip
			$('.dietFitnessToutArticle').appendTo($('#module_section_prefix_hairstyles_health .modContent'));
			$('#module_section_prefix_food').insertAfter($('#module_section_prefix_hairstyles_sex_love'));
			$('#module_section_prefix_hairstyles_health').insertAfter($('#module_section_prefix_food'));
			
			// ----- move moduleSexPostions back into contentWell from tablet to desktop
			className = $('#rightrail').next().attr('class');
			if (className == "desktop g744 inside") {
				$('#moduleSexPositions').insertAfter($('#module_section_prefix_hairstyles_health'));
			}
			
			// ----- move newsletter form from tablet to desktop
			className = $('#pos_ams_cos_620x200_footer').next().attr('id');
			if (className == "pos_ams_cos_newsl") {
				$('#pos_ams_cos_newsl').insertAfter($('#pos_ams_cosmopolitan_bot'));
			}
			
			// ----- move backtotopbutton from tablet to desktop
			className = $('#footercopyright').prev().attr('class');
			if (className == "backtotopbutton chvbtn") {
				$('#footercopyright').append($('.backtotopbutton'));
			}
			
			className = $('#evenmorelinks').prev().attr('id');
			if (className == "morelinks") {
				$('#morelinks').insertBefore('#pos_ams_cosmopolitan_bot');
			}
			
			// ----- move site services in footer from tablet to desktop
			className = $('.cosmopolitan_magazine').next().attr('class');
			if (className == "cosmo_site_service f2segment g186 nohed") {
				$('.cosmopolitan_magazine').append($('#cosmopolitan_site_service'));
				$('#cosmopolitan_site_service').removeClass('f2segment');
				$('#cosmopolitan_site_service').removeClass('g186');
				$('#cosmopolitan_site_service').removeClass('nohed');
			}
		} else if (width>479) {			// ----- jquery changes for tablet view
			
			// ----- change location of social flyouts from desktop to tablet
			$('#iconInstagram').attr('tooltipoffsetx','-250');
			$('#iconNewsletter').attr('tooltipoffsetx','-275');
			$('.stickymenu #iconInstagram').attr('tooltipoffsetx','-250');
			$('.stickymenu #iconNewsletter').attr('tooltipoffsetx','-275');
		
			// ----- search form in header for tablet in header
			//$('#mainnav ul.tier1 li div.search form').insertAfter($('#tabletHeaderSearch #closeButton'));
			$('#mainnav ul.tier1 li div.search form').clone().appendTo($('#tabletHeaderSearch'));
			$('#tabletHeaderSearch form').not(':first').remove(); // ----- appearing twice for some reason
			$('#tabletHeaderSearch form').clone().appendTo('.stickymenu #tabletHeaderSearch');
		
			// ----- contentWell width from desktop to tablet
			$('#contentWell').removeClass('g744');
			$('#contentWell').addClass('g372');
			
			// ----- promoPlayerWrapper width from desktop to tablet
			$('#promoPlayerWrapper').insertBefore('#contentWell');
			$('#promoPlayerWrapper').removeClass('g744');
			$('#promoPlayerWrapper').removeClass('inside');
			
			// ----- move diet/fitness to the bottom of the right rail on tablet
			$('.dietFitnessToutArticle').appendTo($('#moduleRRFeatured .modContent'));
			
			// ----- move moduleSexPositions after rightrail from desktop to tablet
			$('#moduleSexPositions').insertAfter('#rightrail');
			
			// ----- move food and diet/fitness tout from desktop to tablet
			//$('#contentWell2').addClass('g372');
			//$('#contentWell2').addClass('clearfix');
			//$('#contentWell2').append($('#module_section_prefix_food'));
			//$('#contentWell2').append($('#module_section_prefix_hairstyles_health'));
			
			// ----- move gallery ad into rightrail from desktop to tablet
			var galleryAdDiv = $("#pos_ams_cosmo_gallery")
			galleryAdDiv.find("span[id] script:contains('document.write')").remove(); // strip out tags that may document.write
			$('#pos_ams_cosmo_gallery').insertAfter($('#moduleRRFeatured .modContent .counter_2'));
			
			// ----- move pos_ams_cos_newsl after circ ad from desktop to tablet
			$('#pos_ams_cos_newsl').insertAfter($('#pos_ams_cos_620x200_footer'));
			
			// ----- move backtotopbutton after footercopyright from desktop to tablet
			$('.backtotopbutton').insertBefore('#footercopyright');
			
			// ----- move morelinks from desktop to tablet
			$('#morelinks').insertBefore('#evenmorelinks');
			
			// ----- move site services in footer from desktop to tablet
			$('#cosmopolitan_site_service').insertAfter($('.cosmopolitan_magazine'));
			$('#cosmopolitan_site_service').addClass('f2segment');
			$('#cosmopolitan_site_service').addClass('g186');
			$('#cosmopolitan_site_service').addClass('nohed');
		} else {			// ----- jquery changes for mobile view
		
			// ----- move nav button into mainheader
			$('#mobnavclick').prependTo('#mainheader');
		
			// ----- move sex positions after 2nd right rail story
			$('#moduleSexPositions').insertAfter("#moduleRRFeatured .modContent .counter_2");
			
			// ----- remove social connect flyouts
			$('.modContent .socialIcon').removeAttr('hsocial');
			
			// ----- move morelinks from desktop to mobile
			$('#morelinks').insertBefore('#evenmorelinks');
			
			// ----- move back to top button just below footer social connect
			$('.footerbottomstuff .backtotopbutton').insertBefore('#footercopyright');

			// ----- search form in header for mobile
			$('#mainnav ul.tier1 li div.search form').insertAfter($('#headerSearch #closeButton'));
			$('#headerSearch form').not(':first').remove(); // ----- appearing twice for some reason
			$('#headerSearch form').clone().appendTo('.stickymenu #headerSearch');
			
		}
	};
	$(document).ready(jqUpdateSize);    // When the page first loads
	$(window).resize(jqUpdateSize);     // When the browser changes size
	
	// ----- mobile: header search button
	$('#headerSearchButton, .stickymenu #headerSearchButton').click(function() {
		$('#headerSearch').toggle();
		$('.stickymenu #headerSearch').toggle();
		$('#mobnavclick').toggle();
		$('#headerSearchButton').toggle();
		$('.stickymenu #mobnavclick').toggle();
		$('.stickymenu #headerSearchButton').toggle();
		$('a.logo').toggle();
		return false;
	});
	
	// ----- mobile: header search close button
	$('#headerSearch #closeButton, .stickymenu #headerSearch #closeButton').click(function() {
		$('#headerSearch').hide();
		$('.stickymenu #headerSearch').hide();
		$('.stickymenu #headerSearch').hide();
		$('a.logo').show();
		$('#mobnavclick').show();
		$('#headerSearchButton').show();
	});
	
	// ----- tablet: header search button
	$('#tabletHeaderSearchButton, .stickymenu #tabletHeaderSearchButton').click(function() {
		$('#tabletHeaderSearch').toggle();
		if ($('#tabletHeaderSearchButton').hasClass('openButton')) {
			$('#tabletHeaderSearchButton').removeClass('openButton');
			$('#tabletHeaderSearchButton').css('background-position','-111px -40px');
			$('#tabletHeaderSearchButton').css('top','8px');
		} else {
			$('#tabletHeaderSearchButton').addClass('openButton');
			$('#tabletHeaderSearchButton').css('background-position','-176px -36px');
			$('#tabletHeaderSearchButton').css('top','4px');
		}
		return false;
	});
	// ----- tablet: header search button (stickymenu)
	$('.stickymenu #tabletHeaderSearchButton').click(function() {
		$('.stickymenu #tabletHeaderSearch').toggle();
		if ($('.stickymenu #tabletHeaderSearchButton').hasClass('openButton')) {
			$('.stickymenu #tabletHeaderSearchButton').removeClass('openButton');
			$('.stickymenu #tabletHeaderSearchButton').css('background-position','-111px -40px');
			$('.stickymenu #tabletHeaderSearchButton').css('top','8px');
		} else {
			$('.stickymenu #tabletHeaderSearchButton').addClass('openButton');
			$('.stickymenu #tabletHeaderSearchButton').css('background-position','-176px -36px');
			$('.stickymenu #tabletHeaderSearchButton').css('top','4px');
		}
		return false;
	});
	
	
	// ----- social icons click event on tablet should link through
	$('.socialIcon').click(function() {
		if ($('#contentWell').hasClass('g372')) {
			$(this).children('a')[0].click();
		}
	});
	
	// ----- to fix the "join free" and "sign in" loginArea links
	// ----- they should have old functionality of hdm-lib.js, but hdm-lib.resp.js is affecting them
	$("#loginArea").hover(function() {
		$("#loginArea .joinFree a").attr("href","/registration/");
		$("#loginArea .joinFree + li + li a").attr("href","/login/");
	});

	// CHG0058817 Detect og:image tag which include domain?, if not, add more cosmopolitan domain.
	if($("meta[property='og\\:image']")){
		var imgUrl = $("meta[property='og\\:image']").attr('content');
		
		//check url include document.domain
		// indexOf returns the position of the string in the other string. If not found, it will return -1:
		if( imgUrl.indexOf('http://') == -1 && imgUrl.indexOf('https://') == -1)
		{
			var newImgUrl = 'http://www.cosmopolitan.com' + imgUrl;
			$("meta[property='og\\:image']").attr('content', newImgUrl);
		}

	}

	function htmlentities(objs) {
		for(var i = 0; i < objs.length; i++) {
			if(objs[i].length > 0) {
				objs[i].css('visibility','hidden');
				objs[i].each(function() {
					var charOri = $(this).html(), charLimit = 55;
					if(charOri.length > charLimit) {
						var charShow = cutHtmlString(charOri, charLimit);
						$(this).html(charShow + '...').css('visibility','visible');	
					} else {
						$(this).css('visibility','visible');
					}
					
				});
			}
		}
	}

	var prev_article_link = $('.prev_article_link > a'),
		next_article_link = $('.next_article_link > a'),
		chars = [prev_article_link, next_article_link];

	htmlentities(chars);

});

function CutString(string, limit) {
	this.tempDiv = document.createElement('div');
	this.tempDiv.id = "TempNodeForTest";
	this.tempDiv.innerHTML = string;
	this.charCount = 0;
	this.limit = limit;
}

CutString.prototype.cut = function() {
	var newDiv = document.createElement('div');
	this.searchEnd(this.tempDiv, newDiv);
	return newDiv.innerHTML;
};

CutString.prototype.searchEnd = function(parseDiv, newParent) {
	var ele;
	var newEle;
	for (var j = 0; j < parseDiv.childNodes.length; j++) {
		ele = parseDiv.childNodes[j];
		if (ele.nodeType != 3) {
			newEle = ele.cloneNode(true);
			newParent.appendChild(newEle);
			if (ele.childNodes.length === 0) continue;
			newEle.innerHTML = '';
			var res = this.searchEnd(ele, newEle);
			if (res) return res;
			else {
				continue;
			}
		}

		if (ele.nodeValue.length + this.charCount >= this.limit) {
			newEle = ele.cloneNode(true);
			newEle.nodeValue = ele.nodeValue.substr(0, this.limit - this.charCount);
			newParent.appendChild(newEle);
			return true;
		}
		newEle = ele.cloneNode(true);
		newParent.appendChild(newEle);
		this.charCount += ele.nodeValue.length;
	}
	return false;
};

function cutHtmlString($string, $limit) {
	var output = new CutString($string, $limit);
	return output.cut();
}