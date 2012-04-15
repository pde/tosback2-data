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
