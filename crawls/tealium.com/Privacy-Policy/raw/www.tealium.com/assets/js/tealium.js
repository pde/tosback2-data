
/**
* --------------------------------------------------------------------
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/*

*/

/**
 * --------------------------------------------------------------------
 * jQuery-Plugin "pngFix"
 * Version: 1.2, 09.03.2009
 * by Andreas Eberhard, andreas.eberhard@gmail.com
 *                      http://jquery.andreaseberhard.de/
 *
 * Copyright © 2007 Andreas Eberhard
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Changelog:
 *    09.03.2009 Version 1.2
 *    - Update for jQuery 1.3.x, removed @ from selectors
 *    11.09.2007 Version 1.1
 *    - removed noConflict
 *    - added png-support for input type=image
 *    - 01.08.2007 CSS background-image support extension added by Scott Jehl, scott@filamentgroup.com, http://www.filamentgroup.com
 *    31.05.2007 initial Version 1.0
 * --------------------------------------------------------------------
 * @example $(function(){$(document).pngFix();});
 * @desc Fixes all PNG's in the document on document.ready
 *
 * jQuery(function(){jQuery(document).pngFix();});
 * @desc Fixes all PNG's in the document on document.ready when using noConflict
 *
 * @example $(function(){$('div.examples').pngFix();});
 * @desc Fixes all PNG's within div with class examples
 *
 * @example $(function(){$('div.examples').pngFix( { blankgif:'ext.gif' } );});
 * @desc Fixes all PNG's within div with class examples, provides blank gif for input with png
 * --------------------------------------------------------------------
 */

(function($) {

jQuery.fn.pngFix = function(settings) {

	// Settings
	settings = jQuery.extend({
		blankgif: 'blank.gif'
	}, settings);

	var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
	var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);

	if (jQuery.browser.msie && (ie55 || ie6)) {

		//fix images with png-source
		jQuery(this).find("img[src$=.png]").each(function() {

			jQuery(this).attr('width',jQuery(this).width());
			jQuery(this).attr('height',jQuery(this).height());

			var prevStyle = '';
			var strNewHTML = '';
			var imgId = (jQuery(this).attr('id')) ? 'id="' + jQuery(this).attr('id') + '" ' : '';
			var imgClass = (jQuery(this).attr('class')) ? 'class="' + jQuery(this).attr('class') + '" ' : '';
			var imgTitle = (jQuery(this).attr('title')) ? 'title="' + jQuery(this).attr('title') + '" ' : '';
			var imgAlt = (jQuery(this).attr('alt')) ? 'alt="' + jQuery(this).attr('alt') + '" ' : '';
			var imgAlign = (jQuery(this).attr('align')) ? 'float:' + jQuery(this).attr('align') + ';' : '';
			var imgHand = (jQuery(this).parent().attr('href')) ? 'cursor:hand;' : '';
			if (this.style.border) {
				prevStyle += 'border:'+this.style.border+';';
				this.style.border = '';
			}
			if (this.style.padding) {
				prevStyle += 'padding:'+this.style.padding+';';
				this.style.padding = '';
			}
			if (this.style.margin) {
				prevStyle += 'margin:'+this.style.margin+';';
				this.style.margin = '';
			}
			var imgStyle = (this.style.cssText);

			strNewHTML += '<span '+imgId+imgClass+imgTitle+imgAlt;
			strNewHTML += 'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;
			strNewHTML += 'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;';
			strNewHTML += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + jQuery(this).attr('src') + '\', sizingMethod=\'scale\');';
			strNewHTML += imgStyle+'"></span>';
			if (prevStyle != ''){
				strNewHTML = '<span style="position:relative;display:inline-block;'+prevStyle+imgHand+'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;'+'">' + strNewHTML + '</span>';
			}

			jQuery(this).hide();
			jQuery(this).after(strNewHTML);

		});

		// fix css background pngs
		jQuery(this).find("*").each(function(){
			var bgIMG = jQuery(this).css('background-image');
			if(bgIMG.indexOf(".png")!=-1){
				var iebg = bgIMG.split('url("')[1].split('")')[0];
				jQuery(this).css('background-image', 'none');
				jQuery(this).get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + iebg + "',sizingMethod='scale')";
			}
		});
		
		//fix input with png-source
		jQuery(this).find("input[src$=.png]").each(function() {
			var bgIMG = jQuery(this).attr('src');
			jQuery(this).get(0).runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + bgIMG + '\', sizingMethod=\'scale\');';
   		jQuery(this).attr('src', settings.blankgif)
		});
	
	}
	
	return jQuery;

};

})(jQuery);







$(document).ready(function(){
		
	$("button.btn").live('click',function(){
		window.parent.location = $(this).attr("value");
		return false;
	});
		
	function highlightNav()	{
		var pathname 	= $(location).attr('pathname');
		if(stristr(pathname,'/products/'))				{$('#nav-products .trigger').addClass("active");}
		else if(stristr(pathname,'/business/'))			{$('#nav-business-case .trigger').addClass("active");}	
		else if(stristr(pathname,'/company/'))			{$('#nav-company .trigger').addClass("active");}	
		else if(stristr(pathname,'/contact/'))			{$('#nav-contact .trigger').addClass("active");}
		else {}
	
	}
	
	function highlightSubNav()	{
		var pathname 	= $(location).attr('pathname');
		var subLinks	= $('.page .navigation ul li a').length
		
		$(".page .navigation ul li a").each(function(){
   			if(stristr(pathname,$(this).attr("href")))				{
   				$(this).parent("li").addClass("active");}
		});
	}

	function stristr (haystack, needle, bool) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +   bugfxied by: Onno Marsman
   	 	// *     example 1: stristr('Kevin van Zonneveld', 'Van');
   	 	// *     returns 1: 'van Zonneveld'
   	 	// *     example 2: stristr('Kevin van Zonneveld', 'VAN', true);
   	 	// *     returns 2: 'Kevin '
    	var pos = 0;

    	haystack += '';
    	pos = haystack.toLowerCase().indexOf((needle + '').toLowerCase());
    	if (pos == -1) {
    	    return false;
    	} else {
    	    if (bool) {
        	    return haystack.substr(0, pos);
        	} else {
        	    return haystack.slice(pos);
        	}
    	}
	}
		
	
	function loadSocialMediaButtons()	{
	
		if($('.social').length==0)	{return false;}
		else {$('.social').html('<ul class="actions inline"><li><a href="http://www.facebook.com/tealium" target="_blank"><img src="/assets/img/facebook.png" height="24" width="24"></li><li><a href="http://www.linkedin.com/company/tealium" target="_blank"><img src="/assets/img/linkedin.png" height="24" width="24"></a></li><li><a href="http://twitter.com/tealium/" target="_blank"><img src="/assets/img/twitter.png" height="24" width="24"></a></li><li><a href="http://feeds2.feedburner.com/VisitorInsights" target="_blank"><img src="/assets/img/rss.png" height="24" width="24"></a></li></ul>');}

		setTimeout (
			function() {
				$('.social').fadeIn();
 		 	}, 1500
 		 );
	}

	function showMenu()	{
		if($(this).hasClass('last'))	{return;}
		$(this).addClass("highlight");
		$(this).children("ul.children").fadeIn(100);
	}
	
	function hideMenu()	{
		if($(this).hasClass('last'))	{return;}
		$(this).children("ul.children").fadeOut(100);
		$(this).removeClass("highlight");
	}
		
	var config = {    
		sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)    
		interval: 100, // number = milliseconds for onMouseOver polling interval    
		over: showMenu, // function = onMouseOver callback (REQUIRED)    
		timeout: 100, // number = milliseconds delay before onMouseOut    
		out: hideMenu // function = onMouseOut callback (REQUIRED)    
	};

	$(".menu .parent").hoverIntent(config);
	
	highlightNav();
	highlightSubNav();
	loadSocialMediaButtons();


});
