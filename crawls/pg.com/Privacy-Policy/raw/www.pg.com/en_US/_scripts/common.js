
/* CONSTANTS */
var FLASH_VERSION_SUPPORTED = '10', FLASH_VIDEO_VERSION_SUPPORTED = '9', _swfTracker = function(value){};

/* UTILITIES */
var PGUtil = {
	basePath:  '/en_US/',
	isIE:  $.browser.msie,
	isIE6: $.browser.msie && (parseInt($.browser.version) === 6),
	isFF2: $.browser.mozilla && (parseFloat($.browser.version) < 1.9),
	hasFlash: typeof(swfobject) !== 'undefined' && swfobject.hasFlashPlayerVersion(FLASH_VERSION_SUPPORTED),
	trackPage: function (url) {
		try { pageTracker._trackPageview(url); } catch(err) {}	
		return;
	},
	trackEvent: function (category, action, label) {
		try { pageTracker._trackEvent(category, action, label); } catch(err) {}	
		return;
	},
	loadJS: function () {
		for (var i = 0; i < arguments.length; i++){
			$('<script />').attr({ 'type': 'text/javascript', 'src': arguments[i] }).appendTo('head');
		}
	},
	loadCSS: function () {
		for (var i = 0; i < arguments.length; i++){
			$('<link />').attr({ 'type': 'text/css', 'rel': 'stylesheet', 'href': arguments[i] }).appendTo('head');
		}
	},
	trigger: function (linkId) {
		$('#'+linkId).trigger('click');
	},
	embedFlash: function(containerId, swf, width, height, flashvars, params, attributes) {
		//allow overlay calls to get through (videos use Flash 9)
		var isVideoOverlay = containerId === 'overlay-video';
		if (!PGUtil.hasFlash && !isVideoOverlay) {
			return;
		}
		//check version (allows for overlay videos which use Flash 9)	
		var _version = isVideoOverlay ? FLASH_VIDEO_VERSION_SUPPORTED : FLASH_VERSION_SUPPORTED;			
		
		//jigger the size for brands landing grids
		if(containerId === 'brands-content') {
			height = 500 + (Math.ceil($('.brand-group li').length/4) * 36);
		}
		
		//check and set vars
		var	fvars = flashvars;
		var	fparams = params || {};
			fparams.wmode = 'transparent';
		var	fattrs = attributes || {};
		
		//prevent load flicker
		if (containerId === 'lead') {
			$('#lead').css({'width': width+'px','height': height+'px'})
		}
		
      	//build wrappers
		var flashId = 'flash-'+ Math.floor(Math.random()*100000);
		var flashContainer = $('<div class="flash_"></div>').append('<div id="'+ flashId + '" />');
	   	$('#'+containerId)
	   		.addClass('containsFlash_')
	   		.wrapInner('<div class="noflash_"></div>')
	   		.prepend(flashContainer);
       	//embed it
	   	swfobject.embedSWF(swf, flashId, width, height, _version, null, fvars, fparams, fattrs);
	},
	embedWorldwideMapFlash: function(containerId, swf, width, height, flashvars, params, attributes) {
		//load JS for ajax requests
		PGUtil.loadJS(PGUtil.basePath + '_scripts/lib/swfaddress.js');
		var regions = ['asia', 'ce_europe_mideast_africa', 'latin_america', 'north_america', 'western_europe'];
		var start = '';
		$.each(regions, function() {
			if($('body').hasClass(this)) {
				start = this;
			}
		});
		var fvars = flashvars;
			fvars.start =  start;
		this.embedFlash(containerId, swf, width, height, fvars, params, attributes);
	}
};

/*
 * ENABLE JS and FLASH FLAGS
 */
$('html').addClass('js-enabled');
if(PGUtil.hasFlash) {
	$('html').addClass('flash-enabled');
}

/*
* ONLOAD EVENTS
*/
$(document).ready(function() {

	/*
	 * FIX VIDEO TRACKING FOR IE
	 * 		(must add ID to video objects for tracking call to work properly)
	 */
	if(PGUtil.isIE && $('object[classid]').length) {
		$('object[classid]').each(function(i) {
			var $this = $(this);
			if (!$this.attr('id')) {
				$this.attr('id','embed_video_'+i)
			}
		});
	}

	/*
	 * LOAD SUPPORT FILES
	 */
	// initialize video.js
/*
	if($('video').length) {
		PGUtil.loadJS('http://vjs.zencdn.net/c/video.js');
	}
*/
	// initialize overlay
	if($('a[rel=overlay]').length) {
		PGUtil.loadJS(PGUtil.basePath + '_scripts/lib/jquery.blockUI.js', PGUtil.basePath + '_scripts/overlay.js');
	}
	// initialize mini-features
	if($('.mini-feature').length) {
		PGUtil.loadJS(PGUtil.basePath + '_scripts/mini-features.js');
	}
	// initialize news bubbles paging
	if($('#bubbles').length) {
		PGUtil.loadJS(PGUtil.basePath + '_scripts/news-bubbles.js');
	}
	// executive-list
	if($('.executive-list').length) {
		PGUtil.loadJS(PGUtil.basePath + '_scripts/lib/jquery.qtip.js');
	}
	//initialize qtip, content hover
	if($('.tip_container').length) {
		PGUtil.loadJS(PGUtil.basePath + '_scripts/lib/jquery.qtip.js', PGUtil.basePath + '_scripts/qtip.js');
	}
	
	/*
	* LINK EVENTS
	*/
	//open external URLs in new window
	$('a.ext, a.external, a.doc').live('click', function() {
		PGUtil.trackPage(this.href);
		var isPDF = $(this).attr('href').indexOf('.pdf') !== -1;
		if(PGUtil.isIE6 && isPDF) {
			return true;	
		}
		window.open(this.href);
		return false;
	});
	//track investor links
	$('a[href^="http://www.pginvestor.com"]').click(function() {
		PGUtil.trackPage(this.href);
		return true;
	});
	
	/*
	* COPY EVENT
	*/
	$(document).bind('copy', function(e) {
		PGUtil.trackEvent('content','copy',document.location.pathname)
    });
	

	
	
	//create zoom overlay images. used on the brand assets page.
	//zoom is a simple custom plugin. see jquery.zoom.js
	if($('.zoom img').length) {
		$('.zoom img').zoom();
	}

	//makes customized select boxes, used throughout the site
	$('.select').sSelect();
	if(PGUtil.isFF2) {
		$('.custom-select').css('display','block').siblings(':image').css({
			'margin-left':'0',
			'margin-top': '5px'
		});
	}

	
	//add onchange events for selects
	$('select.autosubmit').change(function() {
		$(this).parents('form').submit();
	});
	
	//enable tabs
	if($('.tab-panel-nav').length) {
		var $tablinks = $('.tab-panel-nav a');
		var $panels = $('.tab-panel');
		
		//size panels
		var _h = 0;
		//find tallest panel
		$panels.each(function() {
			_h = $(this).height() > _h ? $(this).height() : _h;
		});
		//set wrapper height
		$('.tab-panel-nav').parent().height(_h).css('position','relative');
		//set panels absolute
		$panels.css('position','absolute');
		
		//set initial state
		$tablinks.filter(':first').addClass('current');
		$panels.not(':first').hide();
		
		//add clicks
		$tablinks.click(function() {
			var $this = $(this);
			var targetId = $this.attr('href');
			$panels.fadeOut().filter(targetId).fadeIn();
			$tablinks.removeClass('current');
			$this.addClass('current');
			return false;
		});

	}
	
	/* initialize tooltips  (uses jquery.qtip.js file) */
	$('.tooltip, .tooltip_left')	
		.hover(function() {
			// force hover style for IE6
			$(this).css('border-bottom-style','solid')
		},function() {
			$(this).css('border-bottom-style','dashed')
		})
		.each(function() {
			//apply using each to have access to element through $(this)
			var isLeft = $(this).hasClass('.tooltip_left');
                        if ($.fn.qtip) {
                            $(this).qtip({
                                    content: $(this).parents('.vcard').html(),
                                    position: {
                                            corner: {
                                                    tooltip: isLeft ? 'rightMiddle' : 'leftMiddle',
                                                    target:  isLeft ? 'leftMiddle' : 'rightMiddle'
                                            }
                                    },
                                    hide: {
                                            fixed: true
                                    },
                                    style: { 
                                            width: 350,
                                            padding: 10,
                                            background: '#00AF3F',
                                            color: 'white',
                                            textAlign: 'left',
                                            border: {
                                                    width: 1,
                                                    radius: 1,
                                                    color: '#00AF3F'
                                            },
                                            tip: isLeft ? 'rightMiddle' : 'leftMiddle',
                                            name: 'dark'
                                    }						
                            });
                        }
		});

//end .ready
});
   
/*
 * DISCLAIMER
 */
$(function() {
	//hide text
	$('div.disclaimer > p.disclaimer-text').hide();
	//toggle first tab on and switch header class.
	$('div.disclaimer > .disclaimer-link').click(function() {
		$(this).next().slideToggle('fast');
	});
});

/*
 * EXPANDER
 */
$(function() {
	//set initial hide state
	$('div.expander > div').addClass('hide_');	
	$('div.expander > .expander-header').addClass('expanding_');
	//toggle first tab on and switch header class.
	$('div.expander > .expander-header').click(function() {
		$(this).next().slideToggle('fast');
		//if an expanding class is on, turn it off, if it's off turn it on.
		$(this).toggleClass('expanding_');
		$(this).toggleClass('expanded_');
		//tracking
		var isOpen = $(this).hasClass('expanded_');
		PGUtil.trackEvent('expander',isOpen ? 'open':'close', document.location.pathname);
  });

  //activate keyboard tabbing and keyboard 'enter/return' navigation on expander
  $('.expander-header').attr('tabindex',0).keyup(function(evt){
  	if (evt.keyCode == 13) $(this).click(); //if key = enter/return fire click, see code above
  });

});

/*
 * INVESTOR NEWS/EVENTS EXPANDER
 */
$(function() {
	$('#investor-relations .box-container:eq(1).section .featured').each(function(){
		$(this).find('p,h4,hr').not(':nth-child(1),:nth-child(2)').wrapAll('<div class="hidden_"></div>'); 
	});
	
	$('.hidden_').after('<a href="#" class="showmore">Show more...</a>').hide();
	$('.showmore').on('click', function(e){
		$(this).fadeOut(300,function(){
			$(this).prev('.hidden_').fadeIn();
		});
		e.preventDefault();
	});
	
});
