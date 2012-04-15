/* PID */


//local code
	pid=location.href;
		checkDev = pid.indexOf('=');
		localCSS = pid.indexOf('localcss');
		checkStage = pid.indexOf('www.stage.att.com');
		checkLocal = pid.indexOf('fhdev');
	 		//alert(checkDev);
		if (checkDev == '-1') {
			first=pid.indexOf('_');
			pid=pid.substr(first+1);
			pid=pid.split('_');
			pid=pid[0];	
		//alert(pid);
		
		} else {
			pid=pid.split('=');
			pid=pid[1]; 
			checkAnc = pid.indexOf('#');
			if (checkAnc != '-1') {
				pid=pid.split('#');
				pid=pid[0];
				}
			checkAnd = pid.indexOf('&');
			if (checkAnd != '-1') {
				pid=pid.split('&');
				pid=pid[0];
				}
				
			pid = pid.toLowerCase();
		}
	//	alert(pid);
	
		
  jQuery(document).ready(function() {
	  jQuery('a[href*=".doc"]').attr('target', '_blank');
	  jQuery('a[href*=".ppt"]').attr('target', '_blank');
	  jQuery('a[href*=".pdf"]').attr('target', '_blank');
	  jQuery('a[href*=".xls"]').attr('target', '_blank');
	  jQuery('a[href*=".txt"]').attr('target', '_blank');
  
  
 
	  if ( jQuery.browser.msie ) {
		  jQuery('#content-container').append('<div class="ie-top-shadow"></div>');
		  jQuery('#content-container').after('<div class="ie-bottom-shadow"></div>');
		  jQuery('body').append('<div class="ie-corner-shadow-left"></div><div class="ie-corner-shadow-right"></div>');
	  } 
});


/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);
