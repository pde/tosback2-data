/**************************
 Set the Global Nav Settings
 ***************************/
if(window.location.host != "www.att.com"){
	var customGlobalNavResources = {
			userInfo: "user_info.txt",
			segmentationMenu: "segmentation_menu.txt",
			menuJSON: "menu_json.txt"
	}
}

/**
 *	Tallest.
 *	Given a jQuery result set, this set of functions will return the:
 *	- tallest()		(biggest height)
 *	- shortest()	(smallest height)
 *	- widest()		(biggest width)
 *	- thinnest()	(smallest width)
 *	Add "Size" onto the end of those functions (eg: "tallestSize()") and it will
 *	return just the pixel size, not the element.
 *
 *	@author	nickf
 *	@date	2009-08-19
 *	@version 1.0 $Id: jquery.tallest.js 100 2009-08-19 00:40:09Z spadgos $
 */

jQuery(function($) {
	$.fn.tallest = function()       { return this._extremities({ 'aspect' : 'height', 'max' : true  })[0] };
	$.fn.tallestSize = function()   { return this._extremities({ 'aspect' : 'height', 'max' : true  })[1] };
	$.fn.shortest = function()      { return this._extremities({ 'aspect' : 'height', 'max' : false })[0] };
	$.fn.shortestSize = function()  { return this._extremities({ 'aspect' : 'height', 'max' : false })[1] };
	$.fn.widest = function()        { return this._extremities({ 'aspect' : 'width',  'max' : true  })[0] };
	$.fn.widestSize = function()    { return this._extremities({ 'aspect' : 'width',  'max' : true  })[1] };
	$.fn.thinnest = function()      { return this._extremities({ 'aspect' : 'width',  'max' : false })[0] };
	$.fn.thinnestSize = function()  { return this._extremities({ 'aspect' : 'width',  'max' : false })[1] };

	/**
	 *	Returns an array: the first item is the matched element, and the second item is the dimension
	 */
	$.fn._extremities = function(options) {
		var defaults = {
			aspect : 'height', // or 'width'
			max : true	// or false to find the min
		};
		options = $.extend(defaults, options);

		if (this.length < 2) {
			return [this, this[options.aspect]()];
		}
		var bestIndex = 0,
			bestSize = this.eq(0)[options.aspect](),
			thisSize
		;
		for (var i = 1; i < this.length; ++i) {
			thisSize = this.eq(i)[options.aspect]();
			if ((options.max && thisSize > bestSize) || (!options.max && thisSize < bestSize)) {
				bestSize = thisSize;
				bestIndex = i;
			}
		}
		return [ this.eq(bestIndex), bestSize ];
	};
});

/*
 * jQuery Easing v1.1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Uses the built in easing capabilities added in jQuery 1.1
 * to offer multiple easing options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery.extend(jQuery.easing, {
	easeinout: function(x, t, b, c, d) {
		if (t < d/2) return 2*c*t*t/(d*d) + b;
		var ts = t - d/2;
		return -2*c*ts*ts/(d*d) + 2*c*ts/d + c/2 + b;		
	}
});
/* Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * $LastChangedDate: 2007-07-21 19:45:56 -0400 (Sat, 21 Jul 2007) - Rev: 2447 - Version 2.1.1 */
(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&/6.0/.test(navigator.userAgent)){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n;},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild);});}return this;};})(jQuery);

/* 
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/**************************************************
              GLOBAL FUNCTIONS
***************************************************/
jQuery(function($){
	$.getScript = function(url, callback, cache){
		$.ajax({
				type: "GET",
				url: url,
				success: callback,
				dataType: "script",
				cache: cache
		});
	};
	
	/* iPhone/iPod */
	if( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) ){
		window.scrollTo(0,0);		
	}
	
	if(jQuery('.mod-accordion').length != 0){
		jQuery.getScript('/scripts/jquery.accordion.js', jQuery.fn.startAccordion, true);		
	}
	if($('.tooltips').length != 0){
		$.getScript('/scripts/jquery.poshytip.js', $.fn.tooltips, true);
	}
	if($('.sortable').length != 0){
		$.getScript('/scripts/jquery.tablesorter.min.js', $.fn.tablesort, true);
	}
	if($('.tabs').length != 0){
		$.getScript('/scripts/jquery.tabs.js', $.fn.tabs, true);
	}
	if($('.ajaxtabs').length != 0){
		$.getScript('/scripts/jquery.tabs.js', $.fn.ajaxtabs, true);
	}
	if($('.openModal, .modalHeader, .modalContent').length != 0){
		$.getScript('/scripts/jquery.colorbox.min.js', $.fn.modals, true);
	}	
	if($('form').length != 0){
		$.getScript('/scripts/jquery.uniform.min.js', $.fn.morphForms, true);
	}
	if($('#usmModule').length != 0){
		$.getScript('/scripts/jquery.usm.js', function(){}, true);
	}
	
	if($('.popUp, #footer a').length != 0) popUp();
	if($('.meterwrapper').length != 0) initMeters();
	if($('.stripe').length !=0) stripe();
	if($('.moreSupportLink').length != 0) $.fn.hoverSlider();
	
	$.fn.special();
	
	/* IE SPECIFIC */
	if ($.browser.msie && $.browser.version < 9) {	
		$('.errorMsg p:first-child').css({ 'color':'#fd0200', 'background':'url(//www.att.com/images/global/iconError46x43.png) top left no-repeat', 'padding':'14px 14px 15px 50px' });
		IEcorners();
	}
	
});

/*************************************
 Some things have to fire after 
 page has loaded due to dynamic content 
**************************************/
jQuery(window).load(function(){
	if(jQuery('.autoSize').length != 0){ setAutoHeight(); }
	if(jQuery('.toggle').length != 0){ toggle(); }
	if(jQuery('.toggleGroup').length != 0) { toggleGroup(); }
});

/* BEGIN FUNCTIONS */
(function($){
	
	/* VERTICAL ALIGN RANDOM HEIGHT ELEMENTS (IMG) */
	$.fn.vAlign = function(){
		return this.each(function(i){
			var ah = $(this).height();
			var ph = $(this).parent().height();
			var mh = Math.ceil((ph-ah) / 2);
			$(this).css('margin-top', mh);
		});
	};
	
	/* CENTER FLOATED ELEMENTS (by default floated elements left align) */
	$.fn.cAlign = function(){
		return this.each(function(i){
			$(this).wrapInner('<span style="background:yellow"></span>');
			var aw = $(this).children().width();
			var pw = $(this).width();
			var mw = Math.ceil((pw-aw) / 2);
			$(this).css({'margin-left':mw});			
		});
	};
	
	/* FORM TRANSFORMATION */
	$.fn.morphForms = function(){
		$(".styled_forms input, .styled_forms textarea, .styled_forms select").uniform();		
	};

	/* SERVICE MARK, TRADEMARK MOD */
	$.fn.special = function(){
		$("sup").each(function(){
			if($(this).html() == "TM"){
				$(this).addClass('tm')
			}		
			if($(this).html() == "SM"){
				$(this).addClass('sm')
			}
		});
		$('.copyright span').text(new Date().getFullYear());
		$('.logos img').vAlign();	
				
	};

	/* START ACCORDION */
	$.fn.startAccordion = function(){
		if( $('.accContent div').html() != 0){
			$('.mod-accordion').accordion({header: 'h4', event:'mouseover', autoHeight:false, animated:'slide'});		
			$.fn.mod_accordion();		
		}
		else{
			$(window).load(function(){
				$('.mod-accordion').accordion({header: 'h4', event:'mouseover', autoHeight:false, animated:'slide'});	
				$.fn.mod_accordion();
			});
		}			
	};

	/* MOD ACCORDION*/
	$.fn.mod_accordion = function(){
		var accContentH = $('.accContent').tallestSize();
		var accQty = $('.mod-accordion h4').length;
		var headerH = $('.mod-accordion h4').tallestSize();
		var accordionH = accContentH + (accQty * headerH);
	
		$('.accContent').css({"height" : accContentH});
		$('.ui-accordion').css({"height" : accordionH})
		
		$('.mod-accordion h4:first').addClass('first');
		$('.accContent:last-child').addClass('last');
		
		$('.mod-accordion h4 a')
			.mouseover(function(){ $(this).parent().removeClass('bottom-round');})
			.focus(function(){ $(this).parent().trigger('mouseover');})
			.blur(function(){ $(this).parent().trigger('mouseout');})
			.click(function(){ $(this).parent().trigger('mouseover');
			return false;		
		});	
	};

	/* TABLE SORT */
	$.fn.tablesort = function(){
		if($('.sortable')){
			$(".nosort").click(function(){return false;});			
		}
	};
	
	/* TAB WITH STATIC CONTENT*/
	$.fn.tabs = function(){
		var defaultTab = 1;
		var initTab = defaultTab;
		var numTabs = parseInt($('.tabs li').size());
		var searchString = window.location.search.substring(1);
	    	var params = searchString.split("&");
		for (var i=0;i<params.length;i++) {
			var val = params[i].split("=");
			if (val[0] == 'tab') {
				initTab = unescape(val[1]);
				break;
			}
		}
		if (isNaN(initTab)) {
			initTab = defaultTab;
		} else {
			if (initTab > numTabs) {
				initTab = numTabs;
			} else if (initTab < 1) {
				initTab = 1;
			}
		}
		var initTabZeroIndex = initTab - 1;

		$("ul.tabs").tabs("div.tabcontent", {effect: 'fade', initialIndex: initTabZeroIndex});

		//$("ul.tabs").tabs("div.tabcontent", {effect: 'fade'});
	};
	
	/* TABS WITH AJAX CONTENT */
	$.fn.ajaxtabs = function(){
		$("ul.ajaxtabs").tabs("div.tabcontent", {effect: 'ajax'}); 
	};
		
	/* TOOLTIPS*/
	$.fn.tooltips = function(){
		$(".tooltips").focus(function(){
			$(this).mouseover();
		});
		$(".tooltips").blur(function(){
			$(this).mouseout();
		});		
		
		$(".tooltips").each(function(){	
		
			var hrefTemp = jQuery(this).attr('href');
			var anchorIndexId = hrefTemp.indexOf("#");
			var aHref = hrefTemp.slice(anchorIndexId ,hrefTemp.length);
			
			$(this).poshytip({
				content: jQuery(aHref).html(),				  
				className: 'tip-white',
				showTimeout: 0.2,
				alignTo: 'target',
				alignX: 'center',
				offsetX: 10,
				allowTipHover: false,
				bgImageFrameSize: 6,
				backgroundGradient: '//www.att.com/images/global/tooltip/tip-white/backgroundwhite.gif',
				fade: true,
				slide: false
			});						  	
		});
	};
	
	/* MODALS */
	$.fn.modals = function(){
		if($('.modalHeader, .modalContent').length != 0){
			$('html').css({'background':'white'});
			$('body').css({
				'background':'white',
				'margin':'0',
				'padding':'0',
				'text-align':'left'
			});
		}
	};
	
	$.fn.hoverSlider = function(){
		$('.moreSupportLink').each(function(){
			$(this).hoverIntent({over:hoverSlideOVER, timeout:300, out:hoverSlideOUT});
		});		
		$('.moreSupportLink li a').each(function(){
			$(this).focus(function(){
				$(this).next().slideToggle(400);
				$('a:first', $(this).next()).focus();
			});
		});
		$('.supportLinkContainer a').each(function(){
			$(this).focus(function(){
				$('.moreSupportLink li > div').slideUp(400);
			});
		});
		$(document).keydown(function(event){
			if(event.keyCode == "27"){
				jQuery(".moreSupportLink li > div").slideUp(400);
			}
		});
	};
			
})(jQuery);

/* Need for HOVERSLIDE */
function hoverSlideOVER(){
	jQuery("#" + jQuery(this).attr('rel')).slideDown(400);
}
function hoverSlideOUT(){
	jQuery("#" + jQuery(this).attr('rel')).slideUp(400);
}

/* ROUNDED CORNERS */
function IEcorners(){
	jQuery('div.box').each(function(){
		if(jQuery(this).hasClass('errorMsg')){
			jQuery(this).prepend('<div class="topRound red"><div></div></div>').append('<div class="bottomRound red"><div></div></div>');			
		}
		else if(jQuery(this).hasClass('msg')){
			jQuery(this).prepend('<div class="topRound yellow"><div></div></div>').append('<div class="bottomRound yellow"><div></div></div>');			
		}			
		else{
			jQuery(this).prepend('<div class="topRound"><div></div></div>').append('<div class="bottomRound"><div></div></div>');			
		}
	});
	jQuery('div.section-title, .top-round').each(function(){
		jQuery(this).prepend('<div class="topRound"><div></div></div>')
	});
	jQuery('div.tabcontent').each(function(){
		jQuery(this).prepend('<div class="topRound-right" style="top:-15px; right:-15px"></div>').append('<div class="bottomRound" style="left:-1px"><div style="right:-2px"></div></div>');
	});
	
}	

/* TABLE STRIPING */
function stripe(){
	jQuery('.stripe tbody tr:nth-child(even)').addClass("even"); 
	jQuery('.stripe tbody tr:nth-child(odd)').addClass("odd"); 
}
	
	
/* USAGE METERS */
function initMeters(){	
	jQuery('.meterwrapper').each(function(){
						
		var minutesUsed = jQuery(this).find('.minutes-used').html();
		var totalMinutes = jQuery(this).find('.total-minutes').html();
		var minutesPercent = (minutesUsed/totalMinutes) * 100;
		var percentVal = "width:" + minutesPercent + "%";
						
		if(minutesPercent < 6 && minutesPercent > 0){
			jQuery(this).find('.meter-value').attr('style','width:18px');
		}
		else if(minutesPercent == 0 || isNaN(minutesPercent)){
			jQuery(this).find('.meter-value').attr('style','visibility:hidden');		
		}
		else if(minutesPercent > 100){
			jQuery(this).find('.meter-value').attr('style','width:100%');
		}
		else{
			jQuery(this).find('.meter-value').attr('style',percentVal);			
		}
		
		/* IE fix */
		var pixVal = (jQuery(this).find('.meter-value').width() - 8) + "px";
		if(jQuery.browser.msie && jQuery.browser.version < 9){
			jQuery(this).find('.meter-value').html('<div></div>');	
			jQuery(this).find('.meter-value').children().css('width',pixVal);
		}
	});
}

/* HOVER SLIDE */
function hoverSlide(){
	jQuery(".moreSupportLink").each(function(){
		jQuery(this).mouseenter(function(){
			jQuery(".moreSupportLink li > div").slideUp(400);
			jQuery("#" + jQuery(this).attr('rel')).slideDown(400);
		});
		jQuery(this).mouseleave(function(){
			jQuery(".moreSupportLink li > div").slideUp(400);
		});
	});
	jQuery(".moreSupportLink li a").each(function(){
		jQuery(this).focus(function(){
			jQuery(this).parent().parent().mouseenter();
		});			
	});
}

/* POPUP */
function popUp(){
	jQuery('.popUp, #footer a').click(function(){
		window.open(this.href);
		return false;
	});
}


/* AUTO HEIGHT CONTAINERS */
function sortDesc(a,b){
	return b - a;
}

function setAutoHeight(){
	jQuery('.autoSize').each(function(){
		var rowH = [], maxH, promo = jQuery(this).find('.promo, .hGroup');
		promo.each(function(){
			rowH.push(jQuery(this).height());
			maxH = rowH.sort(sortDesc)[0] + 'px';
		});
		promo.css({'height':maxH});
	});
}

/* TOGGLE GROUP OF ELEMENTS */
function toggleGroup(){
	jQuery('.toggleGroup').click(function(){
		var insideTxt = jQuery(this).text().toLowerCase();
		
		if(insideTxt == 'expand all' || insideTxt == 'maximizar todos'){
			var whichGroup = jQuery(this).attr('href').split('#');
			
			if(jQuery(this).text().toLowerCase() == 'expand all'){
				jQuery(this).text('Collapse All');
			} else if(jQuery(this).text().toLowerCase() == 'maximizar todos'){
				jQuery(this).text('Minimizar todos');
			}
			
			jQuery('.toggle', '#'+whichGroup[1] ).each(function() {
				var showWhat = jQuery(this).attr('href').split('#');
				jQuery(this).removeClass('expandImg').addClass('collapseImg');
				jQuery('#' + showWhat[1]).removeClass('zeroHeight').slideDown();
				jQuery(this).siblings('.flipper').fadeOut();
			});
		} else if(insideTxt == 'collapse all' || insideTxt == 'minimizar todos'){
			var whichGroup = jQuery(this).attr('href').split('#');

			if(jQuery(this).text().toLowerCase() == 'collapse all'){
				jQuery(this).text('Expand All');
			} else if(jQuery(this).text().toLowerCase() == 'minimizar todos'){
				jQuery(this).text('Maximizar todos');
			}
			
			jQuery('.toggle', '#'+whichGroup[1] ).each(function() {
				var showWhat = jQuery(this).attr('href').split('#');
				jQuery(this).removeClass('collapseImg').addClass('expandImg');
				jQuery('#' + showWhat[1]).addClass('zeroHeight').slideUp();
				jQuery(this).siblings('.flipper').fadeIn();
			});
		}
		return false;
	});
}
	
/* TOGGLE SINGLE ELEMENT */
function toggle(){
	jQuery('.toggle').each(function(){
		var toggleWhat = jQuery(this).attr('href').split('#');
		jQuery('#' + toggleWhat[1]).css({'position':'relative', 'zoom':'1'});
		if(jQuery(this).is('.expandImg')){
			//if link has the + img, collapse the content on load
			jQuery('#' + toggleWhat[1]).addClass('zeroHeight').slideUp();
			jQuery(this).siblings('.flipper').show();
		}
		if(jQuery(this).is('.collapseImg')){
			jQuery('#' + toggleWhat[1]).removeClass('zeroHeight').slideDown();
			jQuery(this).siblings('.flipper').hide();
		}
	});
	
	jQuery('.toggle').click(function(){
		var toggleWhat = jQuery(this).attr('href').split('#');
		if (jQuery(this).hasClass('collapseImg')) {
			// if link has the - image, expand the content
			jQuery(this).removeClass('collapseImg').addClass('expandImg');
			jQuery('#' + toggleWhat[1]).slideToggle('medium').addClass('zeroHeight');
			jQuery(this).siblings('.flipper').fadeIn();
		}
		else if (jQuery(this).hasClass('expandImg')) {
			jQuery(this).removeClass('expandImg').addClass('collapseImg');
			jQuery('#' + toggleWhat[1]).removeClass('zeroHeight').slideToggle('medium');
			jQuery(this).siblings('.flipper').fadeOut();
		}
		
		/* Manual toggle functionality code starts here */
			jQuery('.toggleCheck').each(function(){				
				var collapse = 0, expand = 0, count = 0, me = jQuery(this), toggleText = me.siblings('p').children('a'), findToggle = me.find('.toggle');
				
				findToggle.each(function(){
					var me2 = jQuery(this);				
					if (me2.hasClass('toggle')){
						count += 1;
					}
					if (me2.hasClass('collapseImg')){
						collapse += 1;
					}
					if (me2.hasClass('expandImg')){
						expand += 1;
					}
				});
				
				if(collapse == count){					
					toggleText.text('Collapse All');					
				}else if(expand == count){
					toggleText.text('Expand All');
				}					
			});
			
		/* Manual toggle functionality code ends here */
		
		return false;
	});
}