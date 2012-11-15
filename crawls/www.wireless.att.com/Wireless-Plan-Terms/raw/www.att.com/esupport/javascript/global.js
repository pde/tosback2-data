

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

/**
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
	
	if($.support.boxModel == false){
		$("body").css({"background":"red"});
		alert('This page is no longer in Standards Mode which may result in the page layout to be compromised');
	}
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

	if($('.tooltips').length != 0 && !$.browser.opera){
		$.getScript('/esupport/javascript/jquery-combined.js', $.fn.tooltips, true);
	}
	if($('.mod-accordion').length != 0 && !$.browser.opera){
		$.getScript('/esupport/javascript/jquery.accordion.js', startAccordion, true);
		mod_accordion();
	}
	if($('.sortable').length != 0){
		$.getScript('/esupport/javascript/jquery.tablesorter.min.js', tablesort, true);
	}
	if($('.tabs').length != 0){
		$.getScript('/esupport/javascript/jquery.tabs.js', tabs, true);
	}
	if($('.ajaxtabs').length != 0){
		$.getScript('/esupport/javascript/jquery.tabs.js', ajaxtabs, true);
	}
   /*Committed changes For PROD12-2676 
    /javascript/jquery.uniform.js has already been included in /javascript/jquery.combined.js
     if it doesn't work then please revert the change */
	
	//if($('form').length != 0){
		//$.getScript('/esupport/javascript/jquery.uniform.js', morphForms, true);
	//}
	
	if($('.toggle').length != 0) toggle();
	if($('.toggleAll').length != 0) toggleAll();
	//if($('.popUp, #footer a').length != 0) popUp();	Removed as the same thing is called in /scripts/global.js which triggers the event twice.
	if($('.autoSize').length != 0) setAutoHeight();
	if($('.meterwrapper').length != 0) initMeters();
	if($('.stripe').length !=0) stripe();
	if($('.table').length != 0) {
		jQuery('.table th:last-child').addClass('right');
		jQuery('.table td:last-child').addClass('right');	
	}

	special();
	
	/* IE SPECIFIC */
	if ($.browser.msie && $.browser.version < 9) {  
//		$('.errorMsg p:first-child').css({ 'color':'#fd0200', 'background':'url(//www.att.com/images/global/iconError46x43.png) top left no-repeat', 'padding':'14px 14px 15px 60px' }); 
		//IEcorners(); 
	}
});

function IEcorners(){ 
	jQuery('div.box').each(function(){ 
		if(jQuery(this).hasClass('errorMsg')){ 
			jQuery(this).prepend('<div class="topRound red"><div></div></div>').append('<div class="bottomRound red"><div></div></div>');
			} 
			else if(jQuery(this).hasClass('msg')){ 
				jQuery(this).prepend('<div class="topRound yellow"><div></div></div>').append('<div class="bottomRound yellow"><div></div></div>'); 
			} 
			else{ jQuery(this).prepend('<div class="topRound"><div></div></div>').append('<div class="bottomRound"><div></div></div>'); 
			} 
		}); 
		jQuery('div.section-title, .top-round').each(function(){ 
			jQuery(this).prepend('<div class="topRound"><div></div></div>') 
		}); 
		jQuery('div.tabcontent').each(function(){ 
			jQuery(this).prepend('<div class="topRound-right" style="top:-15px; right:-15px"></div>').append('<div class="bottomRound" style="left:-1px"><div style="right:-2px"></div></div>'); 
		});  
}

function morphForms(){
	 //jQuery(".styled_forms input, .styled_forms textarea, .styled_forms select").uniform();
}

function special(){
	jQuery("sup").each(function(){
		if(jQuery(this).html() == "TM"){
			jQuery(this).addClass('tm')
		}		
		if(jQuery(this).html() == "SM"){
			jQuery(this).addClass('sm')
		}
	});	
}

function startAccordion(){
	jQuery('.mod-accordion').accordion({header: 'h4', event:'mouseover', autoHeight:false, animated:'easeslide'});	
}

function mod_accordion(){
	var accContentH = jQuery('.accContent').tallestSize();
	var accQty = jQuery('.mod-accordion h4').length;
	var headerH = jQuery('.mod-accordion h4').tallestSize();
	var accordionH = accContentH + (accQty * headerH);

	jQuery('.accContent').css({"height" : accContentH});
	jQuery('.ui-accordion').css({"height" : accordionH})
	
	jQuery('.mod-accordion h4:first').addClass('first');
	jQuery('.accContent:last-child').addClass('last');
	
	jQuery('.mod-accordion h4 a')
		.mouseover(function(){ jQuery(this).parent().removeClass('bottom-round');})
		.focus(function(){ jQuery(this).parent().trigger('mouseover');})
		.blur(function(){ jQuery(this).parent().trigger('mouseout');})
		.click(function(){ jQuery(this).parent().trigger('mouseover');
		return false;		
	});	
}

function stripe(){
	jQuery('.stripe tbody tr:nth-child(even)').addClass("even"); 
	jQuery('.stripe tbody tr:nth-child(odd)').addClass("odd"); 
}

function tablesort(){
	if(jQuery('.sortable')){
		jQuery(".nosort").click(function(){return false;});
		jQuery(".sortable").tablesorter( {sortList: [[1,0]]} ); //, widgets: ['zebra']
	}
}

function tabs(){
	jQuery("ul.tabs").tabs("div.tab-group > div");
}
function ajaxtabs(){ 
	jQuery("ul.ajaxtabs").tabs("div.tab-group > div", {effect: 'ajax'}); 
}

function tooltips(){
	jQuery(".tooltips").focus(function(){
		jQuery(this).mouseover();
	});
	jQuery(".tooltips").blur(function(){
		jQuery(this).mouseout();
	});
	jQuery(".tooltips").each(function() {
									  
		jQuery(this).poshytip({
			content: jQuery(jQuery(this).attr('href')).html(),				  
			className: 'tip-white',
			showTimeout: 0.2,
			alignTo: 'target',
			alignX: 'center',
			offsetX: 10,
			allowTipHover: true,
			bgImageFrameSize: 6,
			backgroundGradient: '/esupport/images/tooltip/tip-white/backgroundwhite.gif',
		/*	showOn: 'focus', */
			fade: true,
			slide: false
		});							  	
	}); 
}

function modals(){
	jQuery.fn.nyroModal.settings.endShowContent = function(elts, settings) {
		jQuery.getScript('scripts/jquery.uniform.js',morphForms,true);
		//elts.content.uniform();
	};
	jQuery('.openModal').nyroModal({});	
}


var curvyCornersVerbose = false;
var curvyCornersNoAutoScan = true;
var csettings = {
	  tl: { radius: 10 },
	  tr: { radius: 10 },
	  bl: { radius: 10 },
	  br: { radius: 10 },
	  antiAlias: true
}

function curvycorners() {
	jQuery(window).delay(20).show(0, function() {							  
		curvyCorners.init();
	});
}

function initMeters(){	
	jQuery('.meterwrapper').each(function(){
						
		var minutesUsed = jQuery(this).find('.minutes-used').html();
		var totalMinutes = jQuery(this).find('.total-minutes').html();
		var minutesPercent = (minutesUsed/totalMinutes) * 100;
		var percentVal = "width:" + minutesPercent + "%";
						
		if(minutesPercent == 0 || isNaN(minutesPercent)){
			jQuery(this).find('.meter-value').attr('style','width:0');		
		}
		else if(minutesPercent < 5){
			jQuery(this).find('.meter-value').attr('style','width:5%');												
		}
		
		else if(minutesPercent > 100){
			jQuery(this).find('.meter-value').attr('style','width:100%');
		}
		else{
			jQuery(this).find('.meter-value').attr('style',percentVal);
		}
	});
}
/**********
Utilities
**********/
// toggle sections on a page; links have plus or minus background images.
function toggle(){
	jQuery('.collapse').each(function(){
		var a = jQuery(this), label = a.attr('title').split('|');							 
		a.text(label[1]);
		if ( a.hasClass('off-page') ){
			a.removeClass('off-page');
		}
		else if ( a.parent().hasClass('off-page') ) {
			a.parent().removeClass('off-page');
		}
		a.toggle(
			function(){
				jQuery(a.attr('href')).slideUp('fast');
				a.text(label[0]);
				a.removeClass('collapse');
				a.addClass('expand');
			}, 
			function(){
				jQuery(a.attr('href')).slideDown('fast');
				a.text(label[1]);
				a.removeClass('expand');
				a.addClass('collapse');
			}
		);							 
	});
	
	jQuery('.collapse').each(function(){
		var a = jQuery(this), label = a.attr('title').split('|');							 
		a.text(label[1]);
		if ( a.hasClass('off-page' ) ){
			a.removeClass('off-page');
		}
		else if ( a.parent().hasClass('off-page') ) {
			a.parent().removeClass('off-page');
		}
		a.toggle(
			function(){
				jQuery(a.attr('href')).slideUp('fast');
				a.text(label[0]);
				a.removeClass('collapse');
				a.addClass('expand');
			}, 
			function(){
				jQuery(a.attr('href')).slideDown('fast');
				a.text(label[1]);
				a.removeClass('expand');
				a.addClass('collapse');
			}
		);							 
	});
	
	jQuery('.collapseImg').each(function(){
		var a = jQuery(this), label = a.attr('title').split('|'), id = a.attr('href');
		a.html('<img src="/esupport/images/fttx/iconCollapse.png" width="20px" height="20px"/>');
		if ( a.hasClass('off-page') ){
			a.removeClass('off-page');
		}
		else if ( a.parent().hasClass('off-page') ) {
			a.parent().removeClass('off-page');
		}
		a.toggle(
			function(){
				jQuery(id).slideUp('fast');
				a.html('<img src="//www.att.com/images/global/iconExpand.png" width="20px" height="22px"/>');
				a.attr({ 'alt' : label[1], 'title' : label[1] });
			}, 
			function(){
				jQuery(id).slideDown('fast');
				a.html('<img src="/esupport/images/fttx/iconCollapse.png" width="20px" height="20px"/>');
				a.attr({ 'alt' : label[0], 'title' : label[0] });
			}
		);							 
	});
	
	jQuery('.expand').each(function(){
		var a = jQuery(this), label = a.attr('title').split('|'), id = a.attr('href');
		jQuery(id).hide();
		a.text(label[0]);
		if ( a.hasClass('off-page') ){
			a.removeClass('off-page');
		}
		else if ( a.parent().hasClass('off-page') ) {
			a.parent().removeClass('off-page');
		}
		a.toggle(
			function(){
				jQuery(id).slideDown('fast');
				a.text(label[1]);
				a.removeClass('expand');
				a.addClass('collapse');
			}, 
			function(){
				jQuery(id).slideUp('fast');
				a.text(label[0]);
				a.removeClass('collapse');
				a.addClass('expand');
			}
		);							 
	});
	
	jQuery('.expandImg').each(function(){
		var a = jQuery(this), label = a.attr('title').split('|'), id = a.attr('href');
		jQuery(id).hide();
		a.html('<img src="//www.att.com/images/global/iconExpand.png" width="20px" height="22px" alt="Show Details" title="Show Details" />');
		if ( a.hasClass('off-page') ){
			a.removeClass('off-page');
		}
		else if ( a.parent().hasClass('off-page') ) {
			a.parent().removeClass('off-page');
		}
		a.toggle(
			function(){
				jQuery(id).slideDown('fast');
				a.html('<img src="/esupport/images/fttx/iconCollapse.png" width="20px" height="22px" />');
				a.attr({ 'alt' : label[1], 'title' : label[1] });
			},
			function(){
				jQuery(id).slideUp('fast');
				a.html('<img src="//www.att.com/images/global/iconExpand.png" width="20px" height="20px" />');
				a.attr({ 'alt' : label[0], 'title' : label[0] });
			} 
			
		);							 
	});
}

// Toggles all groups within a container
function toggleAll(){
	jQuery('.toggleAll .collapse').click(function(){
		ta = jQuery(this), label = ta.attr('title').split('|');							 
		ta.text(label[1]);
		if ( ta.hasClass('off-page') ){
			ta.removeClass('off-page');
		}
		else if ( ta.parent().hasClass('off-page') ) {
			ta.parent().removeClass('off-page');
		}
		ta.toggle(
			function(){
				ta.text(label[0]);
				ta.removeClass('collapse');
				ta.addClass('expand');
				ta.nextAll().find('.collapse').trigger('click');
			}, 
			function(){
				ta.text(label[1]);
				ta.removeClass('expand');
				ta.addClass('collapse');
				ta.nextAll().find('.expand').trigger('click');
			}
		);
		//ta.nextAll().find('.collapse').trigger('click');
	});
	
	jQuery('.toggleAll .expand').click(function(){
		ta = jQuery(this), label = ta.attr('title').split('|');
		ta.text(label[0]);
		if ( ta.hasClass('off-page') ){
			ta.removeClass('off-page');
		}
		else if ( ta.parent().hasClass('off-page') ) {
			ta.parent().removeClass('off-page');
		}
		ta.toggle(
			function(){
				ta.text(label[1]);
				ta.removeClass('expand');
				ta.addClass('collapse');
				ta.nextAll().find('.expand').trigger('click');
			}, 
			function(){
				ta.text(label[0]);
				ta.removeClass('collapse');
				ta.addClass('expand');
				ta.nextAll().find('.expand').trigger('click');
			}
		);
		//ta.nextAll().find('.expand').trigger('click');
	});
}

// creates pop up windows - add class="popUp" to anchor tag or by default, sets links in footer to pop up
//Removed as the same thing is called in /scripts/global.js which triggers the event twice.
/*function popUp(){
	jQuery('.popUp, #footer a').click(function(){
		window.open(this.href);
		return false;
	});
}*/

// sets heights of all promos in a row to same height
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