//Calls the drawFont php widget and replaces the text of the selector with an image based on the text
(function($){
	var SCRIPT_BASE = '/_widgets/fonts/drawFont.php';
	var settings;
	//var query_base;
	var safari_waited=false;
	var mapping ={
		font: 'f',
		size: 's',
		color: 'c',
		bgcolor: 'bg',
		lineSpacing: 'ls',
		textTransform: 'case',
		letterSpacing: 'k',
		padding: 'p',
		rotation: 'r',
		type: 'type'
	};
	$.fn.drawFont = function(options){
		settings = $.extend({}, $.fn.drawFont.defaults, options);
		var self=this;
		var call_draw = function(){$.fn.drawFont._drawIt(self);};
		//need to do this because onload in safari is broken
		if(!$.browser.safari || safari_waited){
			call_draw();
		}
		else{
			setTimeout(function(){call_draw();},settings.safariTimeout);
		}

		
	};
	//function to do the replacement
	$.fn.drawFont._drawIt = function(self){
		safari_waited=true;
		self.each(function(){
			if(settings.useCSSValues){ //if this option is false, we take the values from the options parameters
				var font=$(this).css('font-family').split(/\s*,/)[0];
				if(font!==''){settings.font=font;}
				settings.color=$.fn.drawFont.toHexColor($(this).css('color'));
				var bgcolor=$(this).css('background-color');
				if(!(bgcolor==='transparent' || bgcolor.match(/rgba/))){
					settings.bgcolor=$.fn.drawFont.toHexColor(bgcolor);
				}
				else{
					settings.bgcolor=null;
				}
				var sz=parseInt($(this).css('font-size'));
				if(!isNaN(sz)){
					settings.size=sz;
				}
				settings.textTransform=$(this).css('text-transform');
				var ls=parseInt($(this).css('letter-spacing'));
				if(!isNaN(ls)){
					settings.letterSpacing=ls;
				}
				
			}
			
			if($(this).html()!=''){
				var qs=settings.drawFontBase+'?'+$.fn.drawFont.createQuery($(this).html());
				if(settings.fixIEPNG && $.browser.msie && $.browser.version<7){
					//this turns on the filter for IE6

					$(this).html('<img src="'+settings.blankImageForIE+'" alt="'+$(this).html()+'" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + qs + '\', sizingMethod=\'image\')"/>');

				}
				else{
					$(this).html('<img src="'+qs+'" alt="'+$(this).html()+'"/>');
				}
				$(this).css('visibility','visible');
			}

		});
	};
	$.fn.drawFont.createQuery = function(message){
		var query_base='';
		for(var j in settings){
			if(settings[j]!==null){
				if(mapping[j]!==undefined){
					query_base+=mapping[j]+'='+escape(settings[j])+'&';
				}
			}
		}
		if($.browser.msie && $.browser.version<7){ //for some reason you need to replace ampersands with %26, and that seems to work
			message=message.replace(/&(amp;)?/,'%26');
		}
		return 't='+escape(message.replace(/<\/?[^>]+>/gi, ''))+'&'+query_base;
	};
	$.fn.drawFont.toHexColor = function(color){ //crude function to parse out rgb() values to hex
		if(color.match(/^#/)){
			return color.replace(/^#/,'').toUpperCase();
		}
		else if(color.match(/^rgb\(/i)){
			var rgbvals = /rgb\((.+),(.+),(.+)\)/i.exec(color); 
			for(var i=1;i<rgbvals.length;i++){
				var n=parseInt(rgbvals[i]).toString(16);
				if(n.length===1){
					n='0'+n;
				}
				rgbvals[i]=n;
			}
			return (rgbvals[1]+rgbvals[2]+rgbvals[3]).toUpperCase();
			
		}
		return color;
	};
	$.fn.drawFont.defaults = {
		drawFontBase: SCRIPT_BASE,
		fixIEPNG: true, //automatically adds the filter to IE6 to fix transparency 
		blankImageForIE: '/_images/blank.gif', //above needs an image to work
		useCSSValues: true, //setting this to true will read all the values out of css, rather than what was passed
		safariTimeout: 0,  //this shouldn't need to be changed, but, if safari consistently does not display properly, up this value
							//above not needed when called with window.load rather than document.ready (only needed for safari)
		font: 'din-regular',
		size: 12,
		color: '000',
		bgcolor: null,
		lineSpacing: null,
		textTransform: 'none',
		letterSpacing: null,
		padding: null,
		rotation: null,
		type: 'png'
	};
})(jQuery);