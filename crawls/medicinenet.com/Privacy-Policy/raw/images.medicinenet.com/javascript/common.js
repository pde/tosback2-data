/*
 * xLazyLoader 1.0 - Plugin for jQuery
 * 
 * Load js, css and  images
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Depends:
 *   jquery.js
 *
 *  Copyright (c) 2008 Oleg Slobodskoi (jimdo.com)
 */

;(function($){

	$.xLazyLoader =  function ( method, options ) {
		if (typeof method == 'object') {
			options = method;
			method = 'load';
		};
		
		xLazyLoader[method]( options );
	};
	
	var xLazyLoader = new function ()
	{

		
		var head = document.getElementsByTagName("head")[0];
		
		
		this.load = function ( options )
		{
			//Defaults
			var d = {
				js: [],
				css: [],
				image: [],
				name: null,
				load: function(){}
			};
			$.extend(d, options);
			
			var self = this,
				ready = false,
				loaded = {
					js: [],
					css: [],
					image: []
				}
			;
			
			each('js', d.js);
			each('css', d.css);
			each('image', d.image);
			
			function each (type, urls)
			{
				if ( $.isArray(urls) && urls.length>0 )
					$.each( urls, function(i, url){
						load(type, url);
					});
				else if (typeof urls == 'string')
					load(type, urls);
			};

			function load (type, url)
			{
 				self[type](url, function() { 
					$.isArray(d[type]) ? loaded[type].push(url) : loaded[type] = url;
					d.js.length == loaded.js.length 
					&& d.css.length == loaded.css.length 
					&& d.image.length == loaded.image.length
					&& d.load.apply(loaded, []);
                    return;
				}, d.name ?'lazy-loaded-'+ d.name : 'lazy-loaded-'+new Date().getTime());
			};
			
		};
		
		this.js = function (src, callback, name)
		{
			if ($('script[src*="'+src+'"]').length>0) {
				callback();
				return;
			};

            var script = document.createElement('script');
            script.setAttribute("type","text/javascript");
            script.setAttribute("src", src);
            script.setAttribute('id', name);

			if ($.browser.msie)
				script.onreadystatechange = function ()	{
					 /loaded|complete/.test(script.readyState) && callback();
				}
			else
				//FF, Safari, Opera
				script.onload = callback;

			head.appendChild(script);
		};
		
		this.css = function (href, callback, name)
		{

			if ($('link[href*="'+href+'"]').length>0) {
				callback();
				return;
			};
			

			var link = $('<link rel="stylesheet" type="text/css" media="all" href="'+href+'" id="'+name+'"></link>')[0];

			if ($.browser.msie)
				link.onreadystatechange = function ()	{
                    /loaded|complete/.test(link.readyState) && callback();
				}
			else if ($.browser.opera)
				link.onload = callback;
			else
				//FF, Safari, Chrome
				(function(){
					try {
						link.sheet.cssRule;
					} catch(e){
						setTimeout(arguments.callee, 20);
						return;
					};
					callback();
				})();
			head.appendChild(link);
		};
		
		this.image = function (src, callback)
		{
			var img = new Image();
			img.onload = callback;
			img.src = src;
		};
	
		this.disable = function ( name )
		{	
			$('#lazy-loaded-'+name, head).attr('disabled', 'disabled');
		};

		this.enable = function ( name )
		{	
			$('#lazy-loaded-'+name, head).removeAttr('disabled');
		};
		
		
		this.destroy = function ( name )
		{
			$('#lazy-loaded-'+name, head).remove();	
		};
		
		
		



	};



})(jQuery);		


/* END xLazyLoader */

function popupWarning() {
    var a = window.open('/script/main/popup_privacy.asp', 'privacy_window', 'width=325,height=175,resizable=no,toolbar=no,left=10,top=10');
    if (a) { a.focus() }
}

function OODomainCookieWrite(sDomain, sCookieName, sCookieValue, sExpireDate) {
    //alert('cookie=' + sCookieValue);
    //alert('date=' + sExpireDate);
    if (sExpireDate != null && sExpireDate!='')
        document.cookie = escape(sCookieName) + '=' + escape(sCookieValue) + '; expires=' + (sExpireDate) + '; domain='+ sDomain +'; path=/';    
    else
        document.cookie = escape(sCookieName) + '=' + escape(sCookieValue) + '; domain=' + sDomain + '; path=/';

    //alert(OODomainCookieRead(sCookieName));
}
function OODomainCookieRead(cookieName) {
    var exp = new RegExp(escape(cookieName) + "=([^;]+)");
    if (exp.test(document.cookie + ";")) {
        exp.exec(document.cookie + ";");
        return unescape(RegExp.$1);
    }
    else return false;
}

//ToolTip Script
this.tooltip = function(){	
	/* CONFIG */		
		xOffset = 10;
		yOffset = 20;		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result		
	/* END CONFIG */		
	$("a.tooltip").hover(function(e){											  
		this.t = this.title;
		this.title = "";									  
		$("body").append("<p id='tooltip'>"+ this.t +"</p>");
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.css('opacity','0.8')
			.fadeIn("fast");
    },
	function(){
		this.title = this.t;		
		$("#tooltip").remove();
    });	
	$("a.tooltip").mousemove(function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
};

$(document).ready(function() {

	//Image Preview
	tooltip();

});
