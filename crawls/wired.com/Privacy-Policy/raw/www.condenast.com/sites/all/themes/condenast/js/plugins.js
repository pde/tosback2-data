window.log = function(){
	log.history = log.history || [];  
	log.history.push(arguments);
	arguments.callee = arguments.callee.caller;  
	// if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

		// key and at least value given, set cookie...
		if (arguments.length > 1 && String(value) !== "[object Object]") {
				options = jQuery.extend({}, options);

				if (value === null || value === undefined) {
						options.expires = -1;
				}

				if (typeof options.expires === 'number') {
						var days = options.expires, t = options.expires = new Date();
						t.setDate(t.getDate() + days);
				}

				value = String(value);

				return (document.cookie = [
						encodeURIComponent(key), '=',
						options.raw ? value : encodeURIComponent(value),
						options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
						options.path ? '; path=' + options.path : '',
						options.domain ? '; domain=' + options.domain : '',
						options.secure ? '; secure' : ''
				].join(''));
		}

		// key and possibly options given, get cookie...
		options = value || {};
		var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


/**
 * le ipad scrolling hack
 */

;(function($) 
{
	
	$.ipadscroller = function(element) 
	{

		var plugin = this;
		plugin.element = element;
		var element = plugin.element;
		plugin.startTouchY = plugin.currentTouchY = 0;
		plugin.contentStartOffsetY = plugin.contentOffsetY = 0;
		plugin.startTouchTime = 0;
		plugin.moveTouchTime = 0;
		plugin.deltaY = 0;
		plugin.deltaT = 0;

		var init = function()
		{
			plugin.animateTo(plugin.startTouchY);
			element.bind('touchstart', onTouchStart);
			element.bind('touchmove', onTouchMove);
			element.bind('touchend', onTouchEnd);
		}
		
		var onTouchStart = function(e)
		{
			plugin.stopMomentum();
			snapToBounds();
			var touch = e.originalEvent.touches[0];
			plugin.startTouchY = plugin.currentTouchY = touch.clientY;
			plugin.contentStartOffsetY = plugin.contentOffsetY;
			plugin.moveTouchTime = plugin.startTouchTime = new Date().getTime();
			plugin.deltaY = plugin.deltaT = 0;
		}

		var onTouchMove = function(e)
		{
			var touch = e.originalEvent.touches[0];
			if(isDragging(e)) 
			{
				plugin.moveTouchTime = new Date().getTime();
				var currentY = plugin.currentTouchY = touch.clientY;
				plugin.deltaY = currentY - plugin.startTouchY;
				var newY = plugin.deltaY + plugin.contentStartOffsetY;
				plugin.animateTo(newY);
			}
			else
			{
				plugin.deltaY = 0;
			}
		}

		var onTouchEnd = function(e)
		{
			if(isDragging())
			{
				if(shouldStartMomentum())
				{
					doMomentum();
				}
				else 
				{
					snapToBounds();
				}
			}
		}

		plugin.animateTo = function(offsetY)
		{
			plugin.contentOffsetY = offsetY;
			// plugin.element[0].style.webkitTransform = 'translate3d(0, ' + offsetY + 'px, 0)';
			plugin.element.css('top', offsetY+'px');
			// plugin.element.clearQueue().animate({'top':offsetY+'px'}, 500);
			// plugin.element[0].style.webkitTransform = 'translateY('+Math.round(offsetY)+'px)';

		}

		var snapToBounds = function()
		{
			if(plugin.contentOffsetY > 0)
			{
				plugin.animateTo(0); 
			}
			else if(plugin.contentOffsetY < -(element[0].scrollHeight - $(window).height()))
			{
				plugin.animateTo(-(element[0].scrollHeight - $(window).height()));
			}
		}


		var isDragging = function(e)
		{
			var posY = !!e ? e.originalEvent.touches[0].clientY : plugin.currentTouchY;
			return Math.abs(posY - plugin.startTouchY) > 1;
		}


		var shouldStartMomentum = function()
		{
			plugin.deltaT = new Date().getTime() - plugin.moveTouchTime;
			return plugin.deltaT < 30;
		}

		var doMomentum = function() 
		{
				console.log('deltaY: '+plugin.deltaY+', deltaT: '+plugin.deltaT);

				var velocity = plugin.deltaY / plugin.deltaT;


				// var acceleration = velocity < 0 ? 0.0005 : -0.0005;
				var displacement = velocity;
				var duration =  Math.abs(displacement /velocity) * 100;


				// var acceleration = plugin.deltaY / (plugin.deltaT * plugin.deltaT)
				// var displacement = plugin.deltaY  / acceleration;
				// var duration = - velocity * plugin.deltaT;
				// console.log(ve)
				

				// this.element.style.webkitTransition = ‘-webkit-transform ‘ + time + ‘ms cubic-bezier(0.33, 0.66, 0.66, 1)’;
				var newY = plugin.contentOffsetY + displacement;
				console.log('velocity: '+velocity+', displacement: '+displacement+', duration: '+duration);
				plugin.contentOffsetY = newY;
				plugin.element.clearQueue().animate({'top':newY+'px'}, duration, 'linear', snapToBounds);
				// this.element.style.webkitTransform = ‘translate3d(0, ‘ + newY + ‘px, 0)’;
		}


		plugin.stopMomentum = function() 
		{
				plugin.element.stop(true);
		}

		init();
	
	}
})(jQuery);





(function($){

$.fn.disableSelection = function() {
		return this.each(function() {           
				$(this).attr('unselectable', 'on')
							 .css({
									 '-moz-user-select':'none',
									 '-webkit-user-select':'none',
									 'user-select':'none'
							 })
							 .each(function() {
									 this.onselectstart = function() { return false; };
							 });
		});
};

})(jQuery);



//fgnass.github.com/spin.js#v1.2
(function(a,b,c){function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function m(a,b){for(var d in b)a[d]===c&&(a[d]=b[d]);return a}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1);return g}function h(a,b,c){c&&!c.parentNode&&h(a,c),a.insertBefore(b,c||null);return a}function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}var d=["webkit","Moz","ms","O"],e={},f;h(b.getElementsByTagName("head")[0],g("style"));var i=b.styleSheets[b.styleSheets.length-1],o=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},{lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:.25,fps:20})},p=o.prototype={spin:function(a){this.stop();var b=this,c=b.el=l(g(),{position:"relative"}),d,e;a&&(e=n(h(a,c,a.firstChild)),d=n(c),l(c,{left:(a.offsetWidth>>1)-d.x+e.x+"px",top:(a.offsetHeight>>1)-d.y+e.y+"px"})),c.setAttribute("aria-role","progressbar"),b.lines(c,b.opts);if(!f){var i=b.opts,j=0,k=i.fps,m=k/i.speed,o=(1-i.opacity)/(m*i.trail/100),p=m/i.lines;(function q(){j++;for(var a=i.lines;a;a--){var d=Math.max(1-(j+a*p)%m*o,i.opacity);b.opacity(c,i.lines-a,d,i)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))})()}return b},stop:function(){var a=this.el;a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c);return this}};p.lines=function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:"translate3d(0,0,0)",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},p.opacity=function(a,b,c){a.childNodes[b].style.opacity=c},function(){var a=l(g("group"),{behavior:"url(#default#VML)"}),b;if(!k(a,"transform")&&a.adj){for(b=4;b--;)i.addRule(["group","roundrect","fill","stroke"][b],"behavior:url(#default#VML)");p.lines=function(a,b){function k(a,d,i){h(f,h(l(e(),{rotation:360/b.lines*a+"deg",left:~~d}),h(l(g("roundrect",{arcsize:1}),{width:c,height:b.width,left:b.radius,top:-b.width>>1,filter:i}),g("fill",{color:b.color,opacity:b.opacity}),g("stroke",{opacity:0}))))}function e(){return l(g("group",{coordsize:d+" "+d,coordorigin:-c+" "+ -c}),{width:d,height:d})}var c=b.length+b.width,d=2*c,f=e(),i=~(b.length+b.radius+b.width)+"px",j;if(b.shadow)for(j=1;j<=b.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=b.lines;j++)k(j);return h(l(a,{margin:i+" 0 0 "+i,zoom:1}),f)},p.opacity=function(a,b,c,d){d=d.shadow&&d.lines||0,a.firstChild.childNodes[b+d].firstChild.firstChild.opacity=c}}else f=k(a,"animation")}(),a.Spinner=o})(window,document)
var spinOptions = { lines: 8, length: 6, width: 2, radius: 6, color: '#000', speed: 2.2, trail: 50, shadow: false }
spinOptions.small = $.extend({}, spinOptions, {radius: 4, length: 4});


/**
 * FEATURE JS
 */

;(function($) {

	$.features = function(el, options) {
		
		var defaults = {
			width: 1200,
			height: 546,
			margin: 4,
			overlay: '#topnav .overlay',
			cycle: 5000,
			json: '/sites/all/files/cache/brands.json'
		}
		
		var plugin = this;
		plugin.el = el;
		plugin.settings = {}
		plugin.players = {}
		plugin.data = {}
		
		var init = function() {

			plugin.settings = $.extend({}, defaults, options);
			plugin.container = plugin.el.find('.container');
			plugin.items = plugin.el.find('.item');
			plugin.len = plugin.items.length;
			plugin.index = 0;
			plugin.animating = false;
			plugin.timer = null;

			if (plugin.el.find('.item.brand.random').length > 0)
				plugin.randomBrandIndex = plugin.el.find('.item.brand.random').index();
			
			plugin.hideInactiveItems(true, 0);
			alignContent();
			
			loadJSON();
			bindEvents();
			buildItems();
		}
		
		// public
		
		plugin.setItem = function(index) {
			
			if (index == plugin.index || plugin.animating)
				return false;
			
			plugin.animating = true;
			
			var offset = Math.round(($(window).width() - getItemWidth()) / 2);
			var animateTo;
			if (index > plugin.len - 1)
			{
				var factor = $('#' + plugin.items.first().attr('id')).length;
				plugin.items.eq(factor).clone().addClass('clone').appendTo(plugin.container);
				plugin.items.eq(factor + 1).clone().addClass('clone').appendTo(plugin.container);
				animateTo = getContainerLeft() - getItemWidth();
				updateContainerWidth();
				index = 0;
			}
			else if (index < 0)
			{
				var factor = $('#' + plugin.items.last().attr('id')).length;
				plugin.items.eq(plugin.len - (factor + 1)).clone().addClass('clone').prependTo(plugin.container);
				plugin.items.eq(plugin.len - (factor + 2)).clone().addClass('clone').prependTo(plugin.container);
				plugin.container.css('left', getContainerLeft() - (2 * getItemWidth()));
				animateTo = getContainerLeft() + getItemWidth();
				index = plugin.len - 1;
			}
			else if (index == 0 && plugin.index > 0) {
				var factor = $('#' + plugin.items.last().attr('id')).length;
				plugin.items.eq(plugin.len - factor).clone().addClass('clone').prependTo(plugin.container);
				plugin.items.eq(plugin.len - (factor + 1)).clone().addClass('clone').prependTo(plugin.container);
				plugin.container.css('left', offset - ((plugin.index + 2) * getItemWidth()));
				animateTo = offset - (2 * getItemWidth());
			}
			else if (index == plugin.len - 1 && plugin.index < plugin.len - 1) {
				plugin.items.eq(0).clone().addClass('clone').appendTo(plugin.container);
				plugin.items.eq(1).clone().addClass('clone').appendTo(plugin.container);
				animateTo = getContainerLeft() + (getItemWidth() * (plugin.index - index));
			}
			else 
			{
				animateTo = offset - ((index + (plugin.index == 0 ? 1 : 0)) * getItemWidth());
			}
			
			plugin.index = index;
			updateContainerWidth();
			
			plugin.container.clearQueue().animate({left: Math.round(animateTo)}, 500, animationComplete);
			
			alignContent();
			plugin.hideInactiveItems();
			
			// update nav
			var dots = plugin.el.find('#feature-bar .dots');
			dots.find('a.selected').removeClass('selected');
			dots.find('a:eq(' + plugin.index +')').addClass('selected');
		}

		plugin.collapse = function() {
			plugin.el.animate({marginTop: -461});
			//plugin.el.find('.shadow').fadeOut();
			plugin.el.find('#feature-bar .dots').fadeOut();
			plugin.el.find('#feature-bar .arrows').fadeOut();
			plugin.el.find('#feature-bar .visibility .collapse').hide();
			plugin.el.find('#feature-bar .visibility .expand').show();
			
			$(plugin.settings.overlay).fadeOut();
			plugin.hideInactiveItems(true);

			if (!$('html').hasClass('ie7')) {
				$('#highlight, #post-content').slideUp();
				$('#main').animate({marginTop: -46});
				$('#brand-news').animate({paddingTop: 62});
			}
			else {
				$('#highlight, #post-content').hide();
				$('#main').css({marginTop: -69});
				$('#brand-news').css({paddingTop: 62});
				$('#features .container').css({height: 83, top: -465});
			}
		}
		
		plugin.expand = function() {
			plugin.el.animate({marginTop: 0});
			//plugin.el.find('.shadow').fadeIn();
			plugin.el.find('#feature-bar .dots').fadeIn();
			plugin.el.find('#feature-bar .arrows').fadeIn();
			plugin.el.find('#feature-bar .visibility .expand').hide();
			plugin.el.find('#feature-bar .visibility .collapse').show();
			
			$(plugin.settings.overlay).fadeIn();
			plugin.showActiveItem();
			
			if (!$('html').hasClass('ie7')) {
				$('#highlight, #post-content').slideDown();
				$('#main').animate({marginTop: 0});
				$('#brand-news').animate({paddingTop: 20});
			}
			else {
				$('#highlight, #post-content').show();
				$('#main').css({marginTop: 0});
				$('#brand-news').css({paddingTop: 20});
				$('#features .container').css({height: 546, top: 0});
			}
		}
		
		plugin.showActiveItem = function() {
			var item = plugin.items.eq(plugin.index);

			if (item.find('.video').hasClass('autoplay')) {
				
				$(item).oneTime(2000, function() {
					openVideo(plugin.index);
				});

				// set cookie, no more autoplay :(
				$.cookie('cn_autoplay', 'false', {path: '/'});
			}
			else {
				item.find('.content').fadeIn();

				var img = findImage(item);
				if (img) {

					if ($('html.ie7, html.ie8').length > 0) {
						img.show();
					}
					else {
						var animation = {opacity: 1}
						if (img.hasClass('bottom'))
							animation.bottom = 0;
								
						img.show().animate(animation);
					}
				 }
			 }
		}
		
		plugin.hideInactiveItems = function(all, duration) {

			var realIndex = plugin.index == 1 ? plugin.index - plugin.el.find('.clone').length : plugin.index;
			var items = getAllItems();
			items.each(function(i) {
				if (all || i != realIndex) {
					$(this).find('.content').fadeOut(duration);
					
					closeVideo(i);

					var img = findImage($(this));
					if (img) {
						if ($('html.ie7, html.ie8').length > 0) {
							img.hide();
						}
						else {

						var animation = {opacity: 0}
						if (img.hasClass('bottom'))
							animation.bottom = -20;
							
						img.animate(animation, duration);
					 }
					}
				 }
			});
		}
		
		// private
		
		var bindEvents = function() {
			

			plugin.el.find('#feature-bar .visibility a').click(visibilityClickHandler);
			plugin.el.find('#feature-bar .dots a').click(dotClickHandler);
			plugin.el.find('#feature-bar .arrows a').click(arrowClickHandler);
			plugin.el.find('.item.link').live('click', linkItemClickHandler);

			$(window).load(alignContent).resize(resizeHandler).resize();

			/*
			$(plugin.el).bind('swipeleft', function(e) {
				plugin.setItem(plugin.index + 1);
				console.log(e.pageX);
			});

			$(plugin.el).bind('swiperight', function(e) {
				plugin.setItem(plugin.index - 1);
			});
			

			// TOOOUCH
			
			if (window.Touch) {

				var xPos = 0;

				$(plugin.el).bind('touchstart', function(e) {
					xPos = e.pageX;

					e.preventDefault();
				});
				
				$(plugin.el).bind('touchmove', function(e) {
					
					var delta = xPos - e.pageX;

					if (delta > 200) {
						plugin.setItem(plugin.index + 1);
					}
					else if (delta < -200) {
						plugin.setItem(plugin.index - 1);
					}

					delta *= .1;

					var left = parseFloat(plugin.container.css('left').replace('px', ''));
					plugin.container.css('left', left - delta);

					e.preventDefault();
				});

				$(plugin.el).bind('touchend', function(e) {
					//console.log("touchend");
					
					var delta = xPos - e.pageX;

					if (delta > -200 && delta < 200)
						plugin.setItem(plugin.index);

					e.preventDefault();
				});
			}*/
		}
		
		var buildItems = function() {

			plugin.items.last().clone().addClass('clone').prependTo(plugin.container);
			plugin.container.css('left', getContainerPosition(1));
			alignContent();
			updateContainerWidth();
			
			plugin.el.find('.item').each(function(i) {
				var item = $(this);

				// spinner
				if (plugin.settings.spinOptions)
				{
					var spinner = new Spinner(plugin.settings.spinOptions).spin();
					$(spinner.el).addClass('spinner').css({position: 'absolute', top: plugin.settings.height / 2, left: plugin.settings.width / 2, zIndex: 1000});
					item.data('spinner', spinner).append(spinner.el);
				}

				// video
				if(item.find('.video').length > 0) 
				{
					var videoID = item.find('.video').attr('id');
					
					var player = new YT.Player("video_" + videoID, {
						width: '736',
						height: '414',
						videoId: videoID,
						playerVars: {
							autoplay: 0,
							autohide: 1,
							rel: 0,
							hd: 1,
							modestbranding: 0,
							wmode: 'opaque',
							controls: 1
						},
						events: {
							'onReady': playerReadyHandler,
							'onStateChange': playerStateChangeHandler
						}
					});

					plugin.players[videoID] = {player: player, ready: false, autostart: false};

					item.find('.video a.close').click(videoCloseClickHandler);
					item.find('.button a').click(playVideoBtnClickHandler);
				}

				// bg
				var bg = $(this).find('.background img')[0];
				$(bg).load(backgroundCompleteHandler);
				if(!!bg && (bg.complete || bg.readyState === 4))
				{
					initBg(item);
				}
			});
		}
		
		var initBg = function(item) {
			item.find('.background img').hide().removeClass('visuallyhidden').fadeIn('slow');
			item.data('spinner').stop();
			
			if (item.index() == plugin.index + 1) {
				plugin.showActiveItem();

				if (!item.find('.video').hasClass('autoplay'))
					startCycle();
			}
		}

		var backgroundCompleteHandler = function(e) {
			initBg($(this).parent().parent());
		}
		
		var alignContent = function() {
			plugin.items.each(function(i) {
				if($(this).hasClass('announcement')) {
					var content = $(this).find('.content');
					content.css({top: Math.round((plugin.settings.height - content.height()) / 2)});
					
					var img = $(this).find('.image');
					if (img.length > 0 && !img.hasClass('bottom'))
						img.css({top: Math.round((plugin.settings.height - img.height()) / 2)});
				}
			});
		}
		
		var animationComplete = function() {
			resetItems();
			updateBrandItem();
			plugin.showActiveItem();
			plugin.animating = false;
		}
		
		var resetItems = function() {
			
			plugin.container.find('.clone').remove();
			plugin.container.css({left: getContainerPosition()});
			
			if (plugin.index == plugin.len - 1)
			{
				plugin.items.first().clone().addClass('clone').appendTo(plugin.container);
			}
			else if (plugin.index == 0)
			{
				plugin.items.last().clone().addClass('clone').prependTo(plugin.container);
				plugin.container.css({left: getContainerPosition(1)});
			}
			
			updateContainerWidth();
		}
		
		var getItemWidth = function() {
			// browser width + margin
			return plugin.settings.width + plugin.settings.margin;
		}
		
		var findImage = function(item) {
			var img;
			if (item.hasClass('announcement'))
				img = item.find('.image');
			else if (item.hasClass('brand'))
				img = item.find('.logo');
			return img && img.length > 0 ? img : null;
		}
		
		var getAllItems = function() {
			return plugin.el.find('.container .item');
		}
		
		var getContainerLeft = function() {
			return Number(plugin.container.css('left').replace('px', ''));
		}
		
		var updateContainerWidth = function() {
			//console.log(getItemWidth());
			plugin.container.width(getItemWidth() * plugin.el.find('.item').length);
		}
		
		var getContainerPosition = function(extra) {
			var offset = Math.round((Math.max(974, $(window).width()) - getItemWidth()) / 2);
			return offset - Math.round((extra ? plugin.index + extra : plugin.index) * getItemWidth());
		}

		var openVideo = function(index) {

			var video = plugin.items.eq(index).find('.video').first();
			video.fadeIn();

			var data = plugin.players[video.attr('id')];
			if (data) {
				if(data.ready)
					data.player.playVideo();
				else
					data.autostart = true;
			}
		}

		var closeVideo = function(index, remove, stopCycle) {

			var item = plugin.items.eq(index);
			var video = item.find('.video').first();

			video.fadeOut(500, function(){
				if (remove) {
					delete plugin.players[video.attr('id')];
					video.remove();

					// for some reason, button click won't work if i dont do this lil manouver
					var content = item.find('.content');
					content.remove();
					item.prepend(content);

					plugin.showActiveItem();

					if (!stopCycle)
						startCycle();
				} 
			});

			var data = plugin.players[video.attr('id')];
			if (data)
			{
				try {
					data.player.seekTo(0);
					data.player.stopVideo();
				} catch(e) {}
			}
		}

		var startCycle = function() {
			stopCycle();
			plugin.timer = setTimeout(timerHandler, plugin.settings.cycle);
		}

		var stopCycle = function() {
			clearTimeout(plugin.timer);
		}

		var loadJSON = function() {
			$.ajax({
				url: plugin.settings.json + '?r=' + Math.random(),
				type: 'GET',
				dataType: 'json',
				success: function(response) {
					if (response.success) {
						plugin.data.updateBrand = true;
						plugin.data.currentBrand = 0;
						plugin.data.brands = shuffle(response.data);
					}
				}
			});
		}

		var updateBrandItem = function() {

			if (typeof plugin.randomBrandIndex === 'undefined')
				return false;

			if (plugin.index == plugin.randomBrandIndex)
				plugin.data.updateBrand = true;
			
			var itemDelta = plugin.index - plugin.randomBrandIndex;

			if (itemDelta < 0)
				itemDelta *= -1;

			var doUpdate = plugin.items.length < 4 ? itemDelta == 1 : itemDelta > 1;

			if (doUpdate && plugin.data.updateBrand) {

				var brand = plugin.data.brands[plugin.data.currentBrand];
				if ($('#' + brand.nid).length > 0) {
					plugin.data.currentBrand++;
					if (plugin.data.currentBrand > plugin.data.brands.length - 1)
						plugin.data.currentBrand = 0;
					var brand = plugin.data.brands[plugin.data.currentBrand];
				}

				var item = plugin.items.eq(plugin.randomBrandIndex);

				item.removeClass('left').removeClass('right').removeClass('middle').removeClass('black').removeClass('grey').addClass(brand.layout).attr('id', brand.nid);
				item.find('h3').text(brand.title);
				item.find('a').attr('href', brand.url);
				item.find('.background img').attr('src', brand.image);
				item.find('.logo img').attr(brand.logo);

				alignContent();
				
				plugin.data.updateBrand = false;
				plugin.data.currentBrand++;
			
				if (plugin.data.currentBrand > plugin.data.brands.length - 1)
					plugin.data.currentBrand = 0;
			}
		}
		
		// events
		
		var visibilityClickHandler = function(e) {

			if ($(this).hasClass('collapse'))
				plugin.collapse();
			else if ($(this).hasClass('expand'))
				plugin.expand();

			stopCycle();
			
			e.stopPropagation();
			return false;
		}
		
		var dotClickHandler = function(e) {
			plugin.setItem($(this).index());

			stopCycle();

			e.stopPropagation();
			return false;
		}
		
		var arrowClickHandler = function(e) {
			if ($(this).hasClass('prev'))
				plugin.setItem(plugin.index - 1);
			else if ($(this).hasClass('next'))
				plugin.setItem(plugin.index + 1);

			stopCycle();

			e.stopPropagation();
			return false;
		}

		var linkItemClickHandler = function(e) {
			var link = $(this).find('.button a');
			window.open(link.attr('href'), link.attr('target'));
			return false;
		}
		
		var resizeHandler = function(e) {
			var w = $(window).width();
			plugin.el.width(w);
			updateContainerWidth();
			plugin.container.css({left: getContainerPosition(plugin.index == 0 ? 1 : 0)});
		}

		var playerReadyHandler = function(e) {
			var player = e.target;
			var data = plugin.players[player.getVideoData().video_id];
			data.ready = true;

			if (data && data.autostart)
				player.playVideo();
		}

		var playerStateChangeHandler = function(e) {
			if (e.data == YT.PlayerState.ENDED) {
				var video = plugin.items.eq(plugin.index).find('.video').first();
				closeVideo(plugin.index, video.hasClass('autoplay'));
			}
		}

		var playVideoBtnClickHandler = function(e) {
			openVideo(plugin.index);
			e.stopPropagation();
			return false;
		}

		var videoCloseClickHandler = function(e) {
			var video = plugin.items.eq(plugin.index).find('.video').first();
			closeVideo(plugin.index, video.hasClass('autoplay'), true);
			e.stopPropagation();
			return false;
		}

		var timerHandler = function() {
			plugin.setItem(plugin.index + 1);
			startCycle();
		}
	
		if (plugin.el.find('.video').length > 0 ) {
			var tag = document.createElement('script');
			tag.async = true;
			tag.src = "http://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			init();
		}

		window.onYouTubePlayerAPIReady = function() {
			init();
		}; //.bind(plugin);

	}

})(jQuery);

/**
 * MEDIA PARTNER WORK API JS
 */

;(function($) {

	$.partnerWork = function(options) {
		var defaults = {
			groupId: null,
			filterContainer: '#filters',
			searchForm: '#search form',
			searchResultContainer: '#search-results',
			searchMessage: '#search-message',
			caseContainer: '#cases .items',
			loadMoreBtn: '#load-more',
			pageSize: 10,
			filters: [
				'media',
				'category', 
				'capability', 
				'site'
			],
			urls: {
				base: 'http://pm.condenastdigital.com', //'http://www.condenastdigital.com',
				groups: '/xml/groups.xml', //'/cs/customsolutions/get_groups.php', // == filters
				programs: '/xml/programs.xml', //'/cs/customsolutions/get_programs.php',
				program: '/xml/program.xml' //'/cs/customsolutions/get_program.php'
			}
		}
		
		var plugin = this;
		plugin.settings = {}
		plugin.spinners = {};
		plugin.data = {}
		plugin.spinOptions = spinOptions;
		
		var init = function() {
			plugin.settings = $.extend({}, defaults, options);

			if (!plugin.settings.groupId)
				throw new Error("Partner Work -- No GroupID provided.");
			else
				console.log("Partner Work GroupID: " + plugin.settings.groupId);
			
			addSpinners();
			//$(plugin.spinners.main.el).parent().show();
			GlobalSpinner.show();
			plugin.data.filtered = null;

			load(plugin.settings.urls.groups + '?group_id=' + plugin.settings.groupId, initFilters);
			load(plugin.settings.urls.programs += '?group_id=' + plugin.settings.groupId, initCases);

			bindEvents();
		}
		
		var addSpinners = function() {
			
			// load more
			plugin.spinners.loadMore = new Spinner(spinOptions.small).spin();
			$(plugin.spinners.loadMore.el).addClass('spinner').hide();
			$(defaults.loadMoreBtn).parent().append(plugin.spinners.loadMore.el);

			//main
			//plugin.spinners.main = new Spinner(spinOptions.large).spin();


			//var spinnerOverlay = $('<div/>').attr('id', 'spinnerOverlay').css({position:'absolute', top:'50%', left:'50%'});
			//$('#cases').css({position:"relative"}).css('min-height', '186px');
			//$('#cases').append(spinnerOverlay);
			//$(spinnerOverlay).append(plugin.spinners.main.el);
			//$(plugin.spinners.main.el).addClass('spinner');
			//$(plugin.spinners.main.el).parent().hide();
		}


		// public

		plugin.loadMore = function() {
			var itemNum = $(plugin.settings.caseContainer + ' .item').length;
			renderCases(itemNum);
		}

		plugin.updateFilters = function() {
			plugin.data.filtered = null;
			$(plugin.settings.filters).each(function(i){
				var filterName = this;
				var select = $(plugin.settings.filterContainer + ' #filter-' + filterName);
				if (select.val() != -1)
					plugin.data.filtered = plugin.data.filterMap[filterName][select.val()];
			});

			// if (filtered != null) {
			//   $(plugin.settings.caseContainer + ' .item').each(function(i) {
			//     if(filtered.indexOf($(this).attr('id')) > -1)
			//     {
			//       $(this).show();
			//     }
			//     else
			//       $(this).hide();
			//   });
			// }
			// else
			//   $(plugin.settings.caseContainer + ' .item').show();

		}

		plugin.search = function(query) {
			$(plugin.settings.searchResultContainer).empty();
			q = query.toLowerCase();
			var count = 0;
			$(plugin.data.cases).each(function(i){
				if (String(this.clientName).toLowerCase().match(q) || String(this.displayName).toLowerCase().match(q) || String(this.projectName).toLowerCase().match(q)) {
					var item = tplGridItem('search-' + this.id, this.clientName, this.displayName, plugin.settings.urls.base + this.thumbLocation);
					$(plugin.settings.searchResultContainer).append(item);
					$(item).find("a").bind('click', openItem);

					count++;
				}
			});

			$(plugin.settings.caseContainer).parent().hide();
			$(plugin.settings.filterContainer).hide();
			$(plugin.settings.searchResultContainer).show();

			var message = $(plugin.settings.searchMessage);
			message.find('.query').text(query);
			message.find('.count').text(count);
			message.show();
		}

		plugin.clearSearch = function() {
			$(plugin.settings.caseContainer).parent().show();
			$(plugin.settings.filterContainer).show();
			$(plugin.settings.searchResultContainer).hide();
			$(plugin.settings.searchMessage).hide();
			$(plugin.settings.searchForm + ' input').val('');
		}

		// private


		function createXMLHttpRequest() 
		{
			 try { return new XMLHttpRequest(); } catch(e) {}
			 try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
			 alert("XMLHttpRequest not supported");
			 return null;
		 }
			 
		var load = function(url, callback) {
				url = plugin.settings.urls.base + url;
				var yql = 'http://query.yahooapis.com/v1/public/yql';
				var xdrurl = yql+'?q=SELECT * FROM xml WHERE url = "' + url + '"&format=json';
				if($.browser.msie && window.XDomainRequest)
				{
						var xdr = new XDomainRequest();
						xdr.ontimeout = function() { console.log("timed out."); };
						xdr.onprogress = function() { /* */ };
						xdr.onload = function() 
						{
								console.log("WIN!");
								console.log(xdr.responseText);
								callback(jQuery.parseJSON(xdr.responseText));
						};
						xdr.onerror = function()
						{
							console.log("error");
						};
						xdr.open('get', xdrurl);
						xdr.send();
				}
				else if($.browser.msie)
				{
					$.getJSON(xdrurl+"&callback=?",
						function(data){
								callback(data);
						});
				}
				else
				{
					jQuery.support.cors = true;
					$.ajax({
						url: yql,
						crossDomain: true,
						data: 'q=SELECT * FROM xml WHERE url = "' + url + '"&format=json',
						type: 'GET',
						dataType: 'json',
						success: callback,
						error: function(jqXHR, textStatus, errorThrown) {console.log(jqXHR+", "+textStatus+", "+errorThrown);}
					});
				}
		}

		var bindEvents = function() {
			$(plugin.settings.loadMoreBtn).bind('click', loadMoreBtnClickHandler);
			$(plugin.settings.filterContainer + ' select').bind('change', filterSelectChangeHandler);
			$(plugin.settings.searchForm).bind('submit', searchSubmitHandler);
			$(plugin.settings.searchMessage + ' a').bind('click', searchClearClickHandler);
			 $(window).resize(resizeHandler);
		}

		var initFilters = function(data) {

			var filterData = data.query.results.submenus;
			plugin.data.filterMap = {};
			$(plugin.settings.filters).each(function(i){
				
				var filterName = this;
				var select = $(plugin.settings.filterContainer + ' #filter-' + filterName);
				plugin.data.filterMap[filterName] = {};

				$(filterData[filterName].item).each(function(i){
					plugin.data.filterMap[filterName][this.category_id] = this.relatedProjects.split(',');
					select.append($('<option />').attr('value', this.category_id).text(this.name));
				});

				select.find('.loading').remove();
			});

			$('#filters').find('select').each(function()
			{
				$(this).dropkick({
					theme: 'white',
					change: filterSelectChangeHandler
				});
			});
		
		}

		var initCases = function(data) {
			plugin.data.cases = data.query.results.wall.plane;
			// console.log(plugin.data.cases);
			renderCases(0);
			// var urlstr = $(location).attr('HREF');
			var urlstr = window.location.href ? window.location.href : window.location;
			if(urlstr.lastIndexOf('/case/') != -1)
			{
				id = urlstr.substr(urlstr.lastIndexOf('/case/') + 6);
				if(id.lastIndexOf('/') != -1)
				{
					id = id.substr(0, id.lastIndexOf('/'));
				}
				if(id != '%2A' && id != '*')
				{
					loadProject(id);
				}
			}
		}

		var renderCases = function(offset) {

			//$(plugin.spinners.main.el).parent().hide();
			GlobalSpinner.hide();      
			var container = $(plugin.settings.caseContainer);
			if(offset == 0)
			{
				container.empty();
				
			}
			actual = 0;
			// var len = Math.min(plugin.settings.pageSize + offset, !!plugin.data.filtered ? plugin.data.filtered.length : plugin.data.cases.length);
			for (var i = offset; i < plugin.data.cases.length; i++) {
				var data = plugin.data.cases[i];
				if (!!data && (actual < plugin.settings.pageSize + offset) && (plugin.data.filtered == null || $.inArray(data.id, plugin.data.filtered) != -1)) {
					
						actual++;
						var item = tplGridItem(data.id, data.clientName, data.projectName, plugin.settings.urls.base + data.thumbLocation);
					 container.append(item);
					 $(item).css('opacity', 0);
					 $(item).delay((i - offset) * 250).fadeTo('normal', 1);

					 $(item).bind('click', openItem);
				}
			}
			plugin.updateFilters();
			$(plugin.spinners.loadMore.el).hide();
			//$(defaults.loadMoreBtn).show();
			// console.log(plugin.data.cases);
			// console.log(plugin.data.filtered);
			// console.log((!!plugin.data.filtered ? plugin.data.filtered.length : plugin.data.cases.length));
			if((!!plugin.data.filtered ? plugin.data.filtered.length : plugin.data.cases.length) - offset > plugin.settings.pageSize) 
				$(plugin.settings.loadMoreBtn).show();
			else
				$(plugin.settings.loadMoreBtn).hide();
		}
		 
		 
		var loadProject = function(id) {
			load(plugin.settings.urls.program + '?showcase_id=' + id, renderProject);
		} 


		var renderProject = function(data) {
			var project = data.query.results.project;
			console.log(project);
			//$(plugin.spinners.main.el).parent().hide();
			GlobalSpinner.hide(); 
			$('body').css({width:$(window).width(), position:'fixed', overflow:'hidden', height:$(window).height()});
			var overlay = $('<div/>').attr('id', 'caseoverlay').css({width: $(window).width(), height: $(window).height()});
			$('body').append(overlay);

			$(document).unbind('keyup');
			$(document).bind('keyup', keyHandler);
			
			var top = $('<div/>').attr('id', 'top');
			var content = $('<div/>').attr('id', 'content');
			var controls = $('<div/>').attr('id', 'controls');

			var tip = $('<div>').attr('id', "tip").text('For more information: ').append($('<a href="mailto:archive@condenast.com">archive@condenast.com</a>'));
			var logo = $('<div>').addClass("logo").append($('<div>').addClass('inner'));
			var corner = $('<div>').addClass("corner");
			var info = $('<div>').attr('id', "info");
			var toggle = $('<div>').attr('id', "toggle");
			toggle.append($('<div>').attr('id', "inner").click(doToggle));
			info.append(toggle);
			var info_inner = $('<div>').attr('id', "inner");
			// var pname = project.projectname.indexOf(project.clientname+", ") == 0 ? project.projectname.substr(project.clientname.length + 3) : project.projectname;
			var pname = project.projectname;
			var cname = Object.prototype.toString.apply(project.clientname) === '[object Array]' ? project.clientname.join(", ") : project.clientname;
			info_inner.append($('<h2/>').text(pname));
			info_inner.append($('<h3/>').text(cname));
			info.append(info_inner);
			info.append($('<div>').attr('id', 'separator'));
			var body = $('<div>').attr('id', "body");
			body.addClass('cf');
			var close = $('<a href="#" class="close"></a>').click(closeCase);
			var prev = $('<a href="#" id="prev-slide"></a>').addClass('inactive').click(prevSlide);

			var next = $('<a href="#" id="next-slide"></a>').click(nextSlide);
			var num = $('<div/>').attr('id', 'pagi');
			var wrapper = $('<div/>').css({position:'absolute', top:'50%'});
			

			top.append(corner);
			top.append(logo);
			top.append(close);
			//top.append(tip);
			wrapper.append(prev);
			wrapper.append(num);
			wrapper.append(next);
			controls.append(wrapper);

			
			var slides = $('<ul/>').attr('id', 'slides');
			
			
			// var carrier = $('<div/>').addClass('clearfix').css({width:'810px'});;
			var left = $('<div/>').css({float: 'left', width:'450px'});
			var right = $('<div/>').css({float: 'left', width:'250px', 'padding-left':'28px'});
			
			left.append($('<p/>').text(project.objective));
			left.append($('<p/>').text(project.solution));
			
			var caparr, catarr;

			for(var i in project.tags)
			{
					var tag = project.tags[i];
					if(tag.name == "capability" || tag.name == "category")
					{
						if(!!tag.content)
						{
							console.log(tag.content);  
							var arr;
							if(tag.content.indexOf(", ") != -1)
							{
								arr = tag.content.split(", ");
							}
							else
							{
								arr = [tag.content];
							}
							if(tag.name == "category")
							{
								catarr = arr;
							}
							else if(tag.name == "capability")
							{
								caparr = arr;
							}
						}
					}
				}

			// if(!!project.categories && project.categories.indexOf(", ") != -1)
			if(!!catarr)
			{
				right.append($('<h4/>').text("Category"));
				var catp = $('<div/>');
				// var catarr = project.categories.split(", ");
				for(var i = 0; i < catarr.length; i++)
				{
					var categ = $('<span/>').addClass("regularButtonTiny");
					categ.append($('<span/>').text(catarr[i]));
					catp.append(categ);
				}
				right.append(catp);
			}
			
			if(!!caparr)
			{
				right.append($('<h4/>').text("Capabilities"));
				var capp = $('<div/>');
				// var caparr = project.capabilities.split(", ");
				for(var i = 0; i < caparr.length; i++)
				{
					var cape = $('<span/>').addClass("regularButtonTiny");
					cape.append($('<span/>').text(caparr[i]));
					capp.append(cape);
				}
				right.append(capp);
			}
			
			// right.append($('<p/>').text(project.capabilities));
			body.append(left);
			body.append(right);

			var cursors = $('<div>').attr('id', "cursors");
			cursors.text("Tip: You can also use arrow keys to navigate");
			// body.append(cursors);
			info.append(body);

			$(project.slides.slide).each(function(i) {
				
				var li = $('<li/>');
				if(this.type == 'image')
				{
					var img = $('<img/>').attr('src',plugin.settings.urls.base + this.imglocation);
					img.load(adjustSlideImg)
					li.append(img);
					var caption = $('<div/>').addClass('caption').text(this.description);
					// this.full_description = "bananas";
					if(!!this.full_description)
					{
						caption.append($('<p>').text(this.full_description));
					}
					li.append(caption);
					slides.append(li);
				}
				else if(this.type == 'hero')
				{
					var img = $('<img/>').attr('src',plugin.settings.urls.base + this.imglocation);
					img.load(adjustImage);
					li.addClass('selected first');
					li.append(img);
					slides.prepend(li);
				}
				else if(this.type == 'video')
				{

					li.addClass("video");

					// default video size
					var videoWidth = 640;
					var videoHeight = 480;
					var videoBgColor = '#fff';

					var assetTag = $.trim(this.asset_tag).toLowerCase();
					if (assetTag) {
						li.addClass(assetTag);

						// desktop video size
						if (assetTag == 'desktop') {
							videoWidth = 672;
							videoHeight = 380;
							videoBgColor = '#000';
						}
					}

					var container = $('<div/>').addClass('videoContainer');//.attr('id', 'videoContainer');

					var wrap = $('<div/>').css({position:'relative', top:'50%'});
					wrap.append(container);
					var caption = $('<div/>').addClass('caption').text(this.description);
					if(!!this.full_description)
					{
						caption.append($('<p>').text(this.full_description));
					}
					wrap.append(caption);
					li.append(wrap);

					var params = [
						{name: 'bgcolor', value: videoBgColor},
						{name: 'width', value: videoWidth},
						{name: 'height', value: videoHeight},
						{name: 'playerID', value: this.brightcove_id},
						{name: 'playerKey', value: 'AQ~~,AAAAAFiRLbQ~,NEfaHYpPAaWCXaZ9S5E-ZA3UMLNCtDwI'},
						{name: 'isVid', value: true},
						{name: 'isUI', value: true},
						{name: 'dynamicStreaming', value: true},
						{name: 'wmode', value: 'transparent'},
						{name: '@videoPlayer', value: this.brightcove_id}
					];

					var object = $('<object />').attr('id', 'experience'+this.brightcove_id).addClass('BrightcoveExperience');
					
					$(params).each(function(i){
						var param = $('<param />').attr(this);
						object.append(param);
					});
					slides.append(li);
					// brightcove.createExperiences();

					//   var object = $('<object />').attr('id', 'experience'+this.brightcove_id).addClass('BrightcoveExperience');
					
					// $(params).each(function(i){
					//   var param = $('<param />').attr(this);
					//   object.append(param);
					// });

					$('body').append(object);

					brightcove.createExperiences();
					$('body #experience'+this.brightcove_id).appendTo(container);

					if (assetTag && assetTag == 'desktop')
						container.append($('<div/>').addClass('glare'));//.attr('id', 'glare'));
				}
			});
			num.text("1/"+slides.find("li").length);
			content.append(slides);
			overlay.append(content);
			overlay.append(info);
			overlay.append(controls);
			overlay.append(top);

			var th = -$('#caseoverlay #info').outerHeight() + 120;
			$('#caseoverlay #info').css({bottom:th});

			content.detectFlicks({
				axis: 'y',
				threshold: 60,
				flickEvent: flicked});
		}
				
		// events

		var adjustImage = function()
		{
				img = $('#caseoverlay #slides li.first img');
				if(img)
				{
					img.css({width:'auto', height:'auto', top:'0', left:'0'});
					
					var w = img.outerWidth();
					var h = img.outerHeight();
					var scale = Math.max(($(window).width() / w), ($(window).height() / h));
					var divX = Math.min(0, Math.floor(($(window).width() - scale * w) / 2));
					var divY = Math.min(0, Math.floor(($(window).height() - scale * h) / 2));
					img.css({width: Math.ceil(scale * w)+'px', height:Math.ceil(scale * h)+'px', 'margin-left':divX+'px', top:'0px'});
				}
		}

		var adjustSlideImg =function()
		{
			adjustSlide($(this).parent());
		}

		var resizeHandler = function()
		{
			var overlay = $('#caseoverlay');
			if(!!overlay)
			{
				console.log(overlay);
				overlay.css({width: $(window).width(), height: $(window).height()});
				adjustSlides();
				adjustImage();
				var index = $('#caseoverlay #slides li.selected').index();
				console.log(index);
				if(index != -1)
				{
					$('#caseoverlay #slides').css({top: - $('#caseoverlay #slides li:eq(' + (index) + ')').position().top});
				}
				
				$('body').css({width:$(window).width(), height:$(window).height()});
			}
		}

		var adjustSlides = function()
		{
			$('#caseoverlay #slides li').each(function(i) 
			{
				if(!$(this).hasClass("video") && !$(this).hasClass("first"))
				{
					adjustSlide(this);
				}
			});
		}

		var adjustSlide = function(slide)
		{
				var img = $(slide).find('img');
				var cap = $(slide).find('.caption');
				img.css({width:'auto', height:'auto', top:'0'});
				var maxWidth = Math.min($(window).width(), 946);// 640;
				var maxHeight = Math.round($(window).height() - (cap.outerHeight() + 45 + 70));  
				var w = img.outerWidth();
				var h = img.outerHeight();
				var ratio = w / h;  
				var width = maxWidth;
				var height = maxHeight;

			if (maxWidth >= maxHeight * ratio)
						width = height * ratio;
				else
						height = width / ratio;

				width = Math.round(width);
				height = Math.round(height);
				var left = Math.round((maxWidth - width) / 2);
				var top =  70 + Math.round(((maxHeight) - height) / 2);

				img.css({width: width, height: height, top: top});
				cap.css({top:(top+height), width:maxWidth})
		}

		var keyHandler = function(event)
		{
			if (event.keyCode == 40)
			{
				//console.log ( "KEY PRESS 40 NEXT" );
				nextSlide();
				event.preventDefault();
			}
			else if (event.keyCode == 38) 
			{
				//console.log ( "KEY PRESS 38 PREV" );
				prevSlide();
				event.preventDefault();
			}

		}

		var doToggle = function()
		{
			var index = $('#caseoverlay #slides li.selected').index();
			var target = '0px';
			if($(this).hasClass('open'))
			{
				$(this).removeClass('open');
				target = index == 0 ? -$('#caseoverlay #info').outerHeight() + 120 : -$('#caseoverlay #info').outerHeight();
			}
			else
			{
				$(this).addClass('open'); 
				target = /*index == 0 ?*/ 0/* : -$('#caseoverlay #info').outerHeight() + 120*/;
			}
			$('#caseoverlay #info').stop(true).animate({bottom:target}, 400);
			if(index != 0 && !$(this).hasClass('open'))
			{
				$(this).stop(true).animate({top:'-26px'}, 400);
			}
			else
			{
				$(this).stop(true).animate({top:'-4px'}, 400);
			}
		}

		var adjustInfo = function(slide)
		{
			var index = $('#caseoverlay #slides li.selected').index();
			var target = '0px';
			var toggle = $('#caseoverlay #info #toggle #inner');
			if(slide && toggle.hasClass('open'))
			{
				toggle.removeClass('open'); 
			}
			if(!toggle.hasClass('open'))
			{
				
				target = index == 0 ? -$('#caseoverlay #info').outerHeight() + 120 : -$('#caseoverlay #info').outerHeight();
			}
			else
			{
				target =/* index == 0 ?*/ 0 /*: -$('#caseoverlay #info').outerHeight() + 120*/;
			}
			$('#caseoverlay #info').stop(true).animate({bottom:target}, 400);
			if(index != 0 && !toggle.hasClass('open'))
			{
				toggle.stop(true).animate({top:'-26px'}, 400);
			}
			else
			{
				toggle.stop(true).animate({top:'-4px'}, 400);
			}
		}

		var flicked = function(d)
		{
			//alert('flick detected: ' + d.direction);
			nextSlide();
		}

		
		var closeCase = function() {
			$('#caseoverlay').remove();
			$(document).unbind('keyup');
			$('body').css({width:'auto', position:'static', height:'auto', overflow:'auto'});
			return false;
		}
		
		var prevSlide = function() {
			
			var index = $('#caseoverlay #slides li.selected').index();
			
			if(index > 0) 
			{
				if($('#caseoverlay #slides li.selected').hasClass('video'))
				{
					var oeid = $('#caseoverlay #slides li.selected').find('.BrightcoveExperience').first().attr("id");

					try { 
						brightcove.getExperience(oeid).getModule(APIModules.VIDEO_PLAYER).stop();
					} catch( err ) {
						// handle error
					}
				}
				$('#caseoverlay #slides li.selected').removeClass('selected');
				$('#caseoverlay #slides li:eq(' + (index - 1) + ')').addClass('selected');
				$('#caseoverlay #slides').stop(true).animate({top: - $('#caseoverlay #slides li:eq(' + (index - 1) + ')').position().top}, 800);
				if($('#caseoverlay #slides li:eq(' + (index - 1) + ')').hasClass('video'))
				{
					var eid = $('#caseoverlay #slides li:eq(' + (index - 1) + ')').find('.BrightcoveExperience').first().attr("id");
					try { 
						brightcove.getExperience(eid).getModule(APIModules.VIDEO_PLAYER).play();
					} catch (err) {
						
					}
				}
				$('#caseoverlay #controls #pagi').text((index)+"/"+$('#caseoverlay #slides li').length);
				adjustControls($('#caseoverlay #slides li.selected').index(), $('#caseoverlay #slides li').length - 1);
				adjustInfo(true);
			}
			return false;
		}
		
		var adjustControls = function(index, max)
		{
			if(index == 0)
			{
				$('#caseoverlay #controls #prev-slide').addClass('inactive');
				if(max > 0)
				{
					$('#caseoverlay #controls #next-slide').removeClass('inactive');
				}
				else
				{
					$('#caseoverlay #controls #next-slide').addClass('inactive');
				}
			}
			else if(index == max)
			{
				$('#caseoverlay #controls #prev-slide').removeClass('inactive');
				$('#caseoverlay #controls #next-slide').addClass('inactive'); 
			}
			else
			{
				$('#caseoverlay #controls #prev-slide').removeClass('inactive');
				$('#caseoverlay #controls #next-slide').removeClass('inactive');
			}
		}


		var nextSlide = function() {
			
			var index = $('#caseoverlay #slides li.selected').index();

			if(index < $('#caseoverlay #slides li').length - 1) 
			{
				if($('#caseoverlay #slides li.selected').hasClass('video'))
				{
					var oeid = $('#caseoverlay #slides li.selected').find('.BrightcoveExperience').first().attr("id");
					try {
						brightcove.getExperience(oeid).getModule(APIModules.VIDEO_PLAYER).stop();
					} catch (err) {

					}
				}
				$('#caseoverlay #slides li.selected').removeClass('selected');
				$('#caseoverlay #slides li:eq(' + (index + 1) + ')').addClass('selected')
				$('#caseoverlay #slides').stop(true).animate({top: - $('#caseoverlay #slides li:eq(' + (index + 1) + ')').position().top}, 800);
				if($('#caseoverlay #slides li:eq(' + (index + 1) + ')').hasClass('video'))
				{
					var eid = $('#caseoverlay #slides li:eq(' + (index + 1) + ')').find('.BrightcoveExperience').first().attr("id");
					try {
						brightcove.getExperience(eid).getModule(APIModules.VIDEO_PLAYER).play();
					} catch (err) {
					}
				}
				$('#caseoverlay #controls #pagi').text((index + 2)+"/"+$('#caseoverlay #slides li').length);
				// $('#caseoverlay #slides').css("top", - $('#caseoverlay #slides li:eq(' + (index + 1) + ')').position().top);
				adjustControls(index + 1, $('#caseoverlay #slides li').length - 1);
				adjustInfo(true);
			}
			return false;
		}


		var openItem = function(e)
		{
			//$(plugin.spinners.main.el).parent().show();
			GlobalSpinner.show();
			e.stopPropagation();
			e.preventDefault();
			
			loadProject( $(this).attr( 'id' ) );
			//var targetURL = $(this).attr('href').replace("search-", "");
			//loadProject( targetURL.substr(targetURL.lastIndexOf('/') + 1) );
		}

		var loadMoreBtnClickHandler = function(e) {
			$(plugin.spinners.loadMore.el).show();
			$(defaults.loadMoreBtn).hide();
			plugin.loadMore();
			e.stopPropagation();
			return false;
		}

		var filterSelectChangeHandler = function(value, label) {

			var selected = this;
			//$(plugin.spinners.main.el).parent().show();
			// GlobalSpinner.show();
			// $(plugin.spinners.main.el).addClass('spinner').show();
			// $(plugin.settings.filterContainer + ' select').each(function(i){
			//   if (selected != this || $(selected).val() == -1)
			//   {
			//     $(this).find('option:eq(0)').attr('selected', 'selected');
			//   }
					
			// });
			// plugin.updateFilters();

			/*TODO put the filtering back in. set groupID to value & reload contents
				reset the other selects
			*/
			plugin.settings.groupId = value;
			// load(plugin.settings.urls.programs += '?group_id=' + plugin.settings.groupId, initCases);

			// var fname = this.attr('id');
			var fname = this.attr('id').replace("filter-", "");
			// console.log(fname);
			// console.log(value);
			// console.log(plugin.data.filterMap);
			plugin.data.filtered = plugin.data.filterMap[fname][value];
				renderCases(0);
		}

		// var initCases = function(data) {
		//   plugin.data.cases = data.query.results.wall.plane;
		//   renderCases(0);
		// }

		var searchSubmitHandler = function(e) {
			var query = $(plugin.settings.searchForm + " input").val();
			plugin.search(query);
			e.stopPropagation();
			return false;
		}

		var searchClearClickHandler = function(e) {
			plugin.clearSearch();
			e.stopPropagation();
			return false;
		}

		// "template functions"

		var tplGridItem = function(id, client, title, thumb) {
			return $('<div class="item"/>').attr({id: id})
				.append($('<a href="our-work/case/' + id +'" />')
					.append($('<div class="thumb"/>').append($('<img/>').attr({src: thumb})))
					.append($('<div class="client"/>').text(client))
					.append($('<div class="title"/>').text(title))
				);
		}
	
		init();  
	}

})(jQuery);

/**
 * AJAX CONTENT
 */

;(function($) {

	$.ajaxContent = function(options) {
		
		var defaults = {
			filterContainer: '#filters',
			itemContainer: '#press-releases ul',
			searchForm: '#search form',
			searchMessage: '#search-message',
			searchResultContainer: '#search-results ul',
			loadMoreBtn: '#load-more',
			ajaxUrl: '/press_room/ajax',
			prefix: '',
			isFFM: false
		}
		
		var plugin = this;
		plugin.settings = {}
		plugin.data = {}
		plugin.spinners = {};
		
		var init = function() {
			plugin.settings = $.extend({}, defaults, options);
			plugin.data.page = 0;

			bindEvents();
			addSpinners();
		}
		
		// public

		plugin.loadMore = function() {
			plugin.data.page++;

			var data = getFilterData();
			data.p = plugin.data.page;

			// console.log(data);

			load('load_more', data, loadMoreComplete);

			$(plugin.settings.loadMoreBtn).hide();
			$(plugin.spinners.loadMore.el).show();
		}

		plugin.updateFilters = function() {
			
			plugin.data.page = 0;
			var data = getFilterData();
	
			load('update_filters', data, updateFiltersComplete);

			$(plugin.settings.loadMoreBtn).hide();
			GlobalSpinner.show();
		}

		plugin.search = function(query) {
			load('search', {q: query}, searchComplete);
			$(plugin.spinners.search.el).show();
			$(plugin.settings.searchForm + ' .icon').hide();

			$(plugin.settings.filterContainer).hide();
			$(plugin.settings.itemContainer).parent().hide();
		}

		plugin.clearSearch = function() {
			$(plugin.settings.searchResultContainer).parent().hide();
			$(plugin.settings.searchMessage).hide();
			$(plugin.settings.searchForm + ' input').val('');

			$(plugin.settings.filterContainer).show();
			$(plugin.settings.itemContainer).parent().show();
		}

		// private

		var bindEvents = function() {
			$(plugin.settings.loadMoreBtn).bind('click', loadMoreBtnClickHandler);
			$(plugin.settings.searchForm).bind('submit', searchFormSubmitHandler);
			$(plugin.settings.searchMessage + ' a').bind('click', searchMessageClearClickHandler);

			$('.white_dk_special').dropkick({
				theme: 'white',
				change: filterSelectChangeHandler
			});
		}

		var addSpinners = function() {
			
			// load more
			plugin.spinners.loadMore = new Spinner(plugin.settings.spinOptions).spin();
			$(plugin.spinners.loadMore.el).addClass('spinner').hide();
			$(plugin.settings.loadMoreBtn).parent().append(plugin.spinners.loadMore.el);

			// search
			plugin.spinners.search = new Spinner(plugin.settings.spinOptions.small).spin();
			$(plugin.spinners.search.el).addClass('spinner').hide();
			$(plugin.settings.searchForm).append(plugin.spinners.search.el);
		}

		var load = function(operation, data, callback) {

			data.o = plugin.settings.prefix + operation;
			data.ffm = plugin.settings.isFFM;

			$.ajax({
				url: plugin.settings.ajaxUrl,
				type: 'POST',
				dataType: 'json',
				data: data,
				success: function(data) {
					if (data.success)
						callback.apply(this, [data.response]);
					else
						console.log("Error: " + data.message);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("Error: " + textStatus);
				}
			});
		}

		var loadMoreComplete = function(data) {
			
			$(plugin.spinners.loadMore.el).hide();

			$(data.output).each(function(i) {
				$(plugin.settings.itemContainer).append(this);
				$(this).hide().delay(150 * (i + 1)).fadeIn();
			});

			if(!data.last_page)
				$(plugin.settings.loadMoreBtn).delay(($(data.output).length + 1) * 150).fadeIn(0);
		}

		var updateFiltersComplete = function(data) {
			$(plugin.settings.itemContainer).hide().empty().append(data.output).fadeIn();
			
			if(!data.last_page)
				$(plugin.settings.loadMoreBtn).fadeIn();

			GlobalSpinner.hide();
		}

		var searchComplete = function(data) {
			$(plugin.settings.searchResultContainer).empty().append(data.output || '&nbsp;').parent().show();

			var message = $(plugin.settings.searchMessage);
			message.find('.query').text(data.query);
			message.find('.count').text(data.count);
			message.show();

			$(plugin.spinners.search.el).hide();
			$(plugin.settings.searchForm + ' .icon').show();
		}

		var getFilterData = function() {
			
			var brand = $(plugin.settings.filterContainer + ' select#brand').val();
			var year = $(plugin.settings.filterContainer + ' select#year').val();
			var month = $(plugin.settings.filterContainer + ' select#month').val();
			var data = {};

			if (brand != -1)
				data.b = brand;
			
			if (year != -1)
				data.y = year;

			if (month != -1)
				data.m = month;

			return data;
		}
				
		// events

		var loadMoreBtnClickHandler = function(e) {
			plugin.loadMore();
			e.stopPropagation();
			return false;
		}

		var filterSelectChangeHandler = function(value, label) {
			plugin.updateFilters();
			return false;
		}

		var searchFormSubmitHandler = function(e) {
			plugin.search($(this).find('input').val());
			e.stopPropagation();
			return false;
		}
	
		var searchMessageClearClickHandler = function(e) {
			plugin.clearSearch();
			e.stopPropagation();
			return false;
		}

		init();  
	}
})(jQuery);


/**
 * ABOUT US LIVING WALL JS
 */

;(function($) {

	$.livingWall = function(el, options) {
		
		var defaults = {
			interval: 5000,
			ajaxUrl: '/about_us/ajax'
		}
		
		var plugin = this;
		plugin.el = el;
		plugin.settings = {}
		plugin.data = {}
		
		var init = function() {
			plugin.settings = $.extend({}, defaults, options);
			loadBrands();
		}
		
		// public

		// private
				
		var loadBrands = function() {
			$.ajax({
				url: plugin.settings.ajaxUrl,
				type: 'POST',
				dataType: 'json',
				data: 'o=living_wall',
				success: function(data) {
					if (data.success) {
						plugin.data.brands = data.response.brands;
						preloadImages();
						startTimer();
					}
					else
						console.log("Error: " + data.message);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("Error: " + textStatus);
				}
			});
		}

		var preloadImages = function() {
			$(plugin.data.brands).each(function(i){
				$('<img/>').attr('src', this.image_medium);
				$('<img/>').attr('src', this.image_small);
			});
		}

		var startTimer = function() {
			plugin.data.t = setTimeout(update, plugin.settings.interval);
		}

		var update = function() {
			plugin.data.brands = shuffle(plugin.data.brands);
			plugin.el.find('.brand').each(function(i){
				var brand = plugin.data.brands[i];

				$(this).delay(i * 200).fadeOut(500, function() {
					var image = i == 2 ? brand.image_medium : brand.image_small;
					$(this).find('img').first().attr('src', image);
					$(this).find('span > img').first().attr('src', brand.logo_small);
					$(this).fadeIn(500);
				});

			})
			startTimer();
		}

		var shuffle = function(array) {
			var tmp, current, top = array.length;
			if(top) while(--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}
			return array;
		}

		// events

		init();  
	}

})(jQuery);

/**
 * DropKick
 *
 * Highly customizable <select> lists
 * https://github.com/JamieLottering/DropKick
 *
 * &copy; 2011 Jamie Lottering <http://github.com/JamieLottering>
 *                        <http://twitter.com/JamieLottering>
 *
 */
 (function ($, window, document) {

	var ie6 = false;

	// Help prevent flashes of unstyled content
	if ($.browser.msie && $.browser.version.substr(0, 1) < 7) {
		ie6 = true;
	} else {
		document.documentElement.className = document.documentElement.className + ' dk_fouc';
	}
	
	var
		// Public methods exposed to $.fn.dropkick()
		methods = {},

		// Cache every <select> element that gets dropkicked
		lists   = [],

		// Convenience keys for keyboard navigation
		keyMap = {
			'left'  : 37,
			'up'    : 38,
			'right' : 39,
			'down'  : 40,
			'enter' : 13
		},

		// HTML template for the dropdowns
		dropdownTemplate = [
			'<div class="dk_container" id="dk_container_{{ id }}" tabindex="{{ tabindex }}">',
				'<a class="dk_toggle">',
					'<span class="dk_label">{{ label }}</span>',
				'</a>',
				'<div class="dk_options">',
					'<ul class="dk_options_inner">',
					'</ul>',
				'</div>',
			'</div>'
		].join(''),

		// HTML template for dropdown options
		optionTemplate = '<li class="{{ current }}"><a data-dk-dropdown-value="{{ value }}">{{ text }}</a></li>',

		// Some nice default values
		defaults = {
			startSpeed : 1000,  // I recommend a high value here, I feel it makes the changes less noticeable to the user
			theme  : false,
			change : false
		},

		// Make sure we only bind keydown on the document once
		keysBound = false
	;

	// Called by using $('foo').dropkick();
	methods.init = function (settings) {
		settings = $.extend({}, defaults, settings);

		return this.each(function () {
			var
				// The current <select> element
				$select = $(this),

				// Store a reference to the originally selected <option> element
				$original = $select.find(':selected').first(),

				// Save all of the <option> elements
				$options = $select.find('option'),

				// We store lots of great stuff using jQuery data
				data = $select.data('dropkick') || {},

				// This gets applied to the 'dk_container' element
				id = $select.attr('id') || $select.attr('name'),

				// This gets updated to be equal to the longest <option> element
				width  = settings.width || $select.outerWidth(),

				// Check if we have a tabindex set or not
				tabindex  = $select.attr('tabindex') ? $select.attr('tabindex') : '',

				// The completed dk_container element
				$dk = false,

				theme
			;

			// Dont do anything if we've already setup dropkick on this element
			if (data.id) {
				return $select;
			} else {
				data.settings  = settings;
				data.tabindex  = tabindex;
				data.id        = id;
				data.$original = $original;
				data.$select   = $select;
				data.value     = _notBlank($select.val()) || _notBlank($original.attr('value'));
				data.label     = $original.text();
				data.options   = $options;
			}

			// Build the dropdown HTML
			$dk = _build(dropdownTemplate, data);

			// Make the dropdown fixed width if desired
			$dk.find('.dk_toggle').css({
				'width' : width + 'px'
			});

			// Hide the <select> list and place our new one in front of it
			$select.before($dk);

			// Update the reference to $dk
			$dk = $('#dk_container_' + id).fadeIn(settings.startSpeed);

			// Save the current theme
			theme = settings.theme ? settings.theme : 'default';
			$dk.addClass('dk_theme_' + theme);
			data.theme = theme;

			// Save the updated $dk reference into our data object
			data.$dk = $dk;

			// Save the dropkick data onto the <select> element
			$select.data('dropkick', data);

			// Do the same for the dropdown, but add a few helpers
			$dk.data('dropkick', data);

			lists[lists.length] = $select;

			// Fix identified in issue #11.
			if(!$.browser.msie) {
				// Focus events
				$dk.bind('focus.dropkick', function (e) {
					$dk.addClass('dk_focus');
				}).bind('blur.dropkick', function (e) {
					$dk.removeClass('dk_open dk_focus');
				});
			} else {
				$('body').click(function(event) {
					if(!$(event.target).parents('.dk_container').length) {
						_closeDropdown($dk);
					}
				});
			}

			setTimeout(function () {
				$select.hide();
			}, 0);
		});
	};

	// Allows dynamic theme changes
	methods.theme = function (newTheme) {
		var
			$select   = $(this),
			list      = $select.data('dropkick'),
			$dk       = list.$dk,
			oldtheme  = 'dk_theme_' + list.theme
		;

		$dk.removeClass(oldtheme).addClass('dk_theme_' + newTheme);

		list.theme = newTheme;
	};

	// Reset all <selects and dropdowns in our lists array
	methods.reset = function () {
		for (var i = 0, l = lists.length; i < l; i++) {
			var
				listData  = lists[i].data('dropkick'),
				$dk       = listData.$dk,
				$current  = $dk.find('li').first()
			;

			$dk.find('.dk_label').text(listData.label);
			$dk.find('.dk_options_inner').animate({ scrollTop: 0 }, 0);

			_setCurrent($current, $dk);
			_updateFields($current, $dk, true);
		}
	};

	// Close dropdown when clicking outside
	methods.close = function() {
		if(!!($(this).data('dropkick')))
		{
			_closeDropdown($(this).data('dropkick').$dk);
		}
	}
	
	$('html').click(function(e) {
		$.each($('select'), function(index, value) {
			$(value).dropkick('close');
		});
	});

	// Expose the plugin
	$.fn.dropkick = function (method) {
		if (!ie6) {
			if (methods[method]) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else if (typeof method === 'object' || ! method) {
				return methods.init.apply(this, arguments);
			}
		}
	};

	// private
	function _handleKeyBoardNav(e, $dk) {
		var
			code     = e.keyCode,
			data     = $dk.data('dropkick'),
			options  = $dk.find('.dk_options'),
			open     = $dk.hasClass('dk_open'),
			current  = $dk.find('.dk_option_current'),
			first    = options.find('li').first(),
			last     = options.find('li').last(),
			next,
			prev
		;

		switch (code) {
			case keyMap.enter:
				if (open) {
					_updateFields(current.find('a'), $dk);
					_closeDropdown($dk);
				} else {
					_openDropdown($dk);
				}
				e.preventDefault();
			break;

			case keyMap.up:
				prev = current.prev('li');
				if (open) {
					if (prev.length) {
						_setCurrent(prev, $dk);
					} else {
						_setCurrent(last, $dk);
					}
				} else {
					_openDropdown($dk);
				}
				e.preventDefault();
			break;

			case keyMap.down:
				if (open) {
					next = current.next('li').first();
					if (next.length) {
						_setCurrent(next, $dk);
					} else {
						_setCurrent(first, $dk);
					}
				} else {
					_openDropdown($dk);
				}
				e.preventDefault();
			break;

			default:
			break;
		}
	}

	// Update the <select> value, and the dropdown label
	function _updateFields(option, $dk, reset) {
		var value, label, data;

		value = option.attr('data-dk-dropdown-value');
		label = option.text();
		data  = $dk.data('dropkick');

		$select = data.$select;
		$select.val(value);

		$dk.find('.dk_label').text(label);

		reset = reset || false;

		if (data.settings.change && !reset) {
			data.settings.change.call($select, value, label);
		}
	}

	// Set the currently selected option
	function _setCurrent($current, $dk) {
		$dk.find('.dk_option_current').removeClass('dk_option_current');
		$current.addClass('dk_option_current');

		_setScrollPos($dk, $current);
	}

	function _setScrollPos($dk, anchor) {
		var height = anchor.prevAll('li').outerHeight() * anchor.prevAll('li').length;
		$dk.find('.dk_options_inner').animate({ scrollTop: height + 'px' }, 0);
	}

	// Close a dropdown
	function _closeDropdown($dk) {
		$dk.removeClass('dk_open');
	}

	// Open a dropdown
	function _openDropdown($dk) {
		var data = $dk.data('dropkick');
		$dk.find('.dk_options').css({ top : $dk.find('.dk_toggle').outerHeight() - 1 });
		$dk.toggleClass('dk_open');

	}

	/**
	 * Turn the dropdownTemplate into a jQuery object and fill in the variables.
	 */
	function _build (tpl, view) {
		var
			// Template for the dropdown
			template  = tpl,
			// Holder of the dropdowns options
			options   = [],
			$dk
		;

		template = template.replace('{{ id }}', view.id);
		template = template.replace('{{ label }}', view.label);
		template = template.replace('{{ tabindex }}', view.tabindex);

		if (view.options && view.options.length) {
			for (var i = 0, l = view.options.length; i < l; i++) {
				var
					$option   = $(view.options[i]),
					current   = 'dk_option_current',
					oTemplate = optionTemplate
				;

				oTemplate = oTemplate.replace('{{ value }}', $option.val());
				oTemplate = oTemplate.replace('{{ current }}', (_notBlank($option.val()) === view.value) ? current : '');
				oTemplate = oTemplate.replace('{{ text }}', $option.text());

				options[options.length] = oTemplate;
			}
		}

		$dk = $(template);
		$dk.find('.dk_options_inner').html(options.join(''));

		return $dk;
	}

	function _notBlank(text) {
		return ($.trim(text).length > 0) ? text : false;
	}

	$(function () {

		// Handle click events on the dropdown toggler
		$('.dk_toggle').live('click', function (e) {
			var $dk  = $(this).parents('.dk_container').first();

			_openDropdown($dk);

			if ("ontouchstart" in window) {
				$dk.addClass('dk_touch');
				$dk.find('.dk_options_inner').addClass('scrollable vertical');
			}

			e.preventDefault();
			return false;
		});

		// Handle click events on individual dropdown options
		$('.dk_options a').live(($.browser.msie ? 'mousedown' : 'click'), function (e) {
			var
				$option = $(this),
				$dk     = $option.parents('.dk_container').first(),
				data    = $dk.data('dropkick')
			;
		
			_closeDropdown($dk);
			_updateFields($option, $dk);
			_setCurrent($option.parent(), $dk);
		
			e.preventDefault();
			return false;
		});

		// Setup keyboard nav
		$(document).bind('keydown.dk_nav', function (e) {
			var
				// Look for an open dropdown...
				$open    = $('.dk_container.dk_open'),

				// Look for a focused dropdown
				$focused = $('.dk_container.dk_focus'),

				// Will be either $open, $focused, or null
				$dk = null
			;

			// If we have an open dropdown, key events should get sent to that one
			if ($open.length) {
				$dk = $open;
			} else if ($focused.length && !$open.length) {
				// But if we have no open dropdowns, use the focused dropdown instead
				$dk = $focused;
			}

			if ($dk) {
				_handleKeyBoardNav(e, $dk);
			}
		});
	});
})(jQuery, window, document);


// accordion
(function($)
{
	$.accordion = function(element, o)
	{

		// check the hash
		var searchFor  = window.location.hash.replace('#','');
		
		// compare the hash to the list
		// find the item with the same hash
		// move the item to the top of the list
		// expand the item as in the accordion element

		return element.each(function(){
				var defaults = {
							item_class: '.unit-item',
							header_class: '.unit-header',
							content_class: '.unit-content',
							close_class: '.unit-close',
							speed: 500,
							anchors: false,
							scrollTop: true,
							offset: 11
				};
				var root = $(this);
				root.settings = $.extend({}, defaults, o );

				if (!$(element).hasClass('contacts'))
					tidy();

				// $.browser.msie

				var topArray = [];
				root.find(defaults.item_class).each( function() {
						if ( $(this).attr('id') == searchFor && $(this).attr('id') != '' ){
						console.log ( "searchFor: " + searchFor + "$(this).attr('id'): " + $(this).attr('id') );
							$(this).remove().prependTo( root.children(0) );
						}
						$(this).css( 'display', 'block');
						if ( $(this).hasClass('collapsible') ){
								$(this).find(defaults.content_class).hide();
								$(this).find(defaults.content_class).height($(this).find(defaults.content_class).height());
								$(this).find(defaults.close_class).css ( "cursor", "pointer" );
								$(this).find(defaults.header_class).css ( "cursor", "pointer" );
								$(this).find(defaults.close_class).click(function(e){
										set($(this).parent().index());
										return false;
								});

								$(this).find(defaults.header_class).click(function(e){
										set($(this).parent().index());
										return false;
								});
						} else {
								$(this).find(defaults.content_class).slideDown(defaults.speed, function(){} );
						}

						if ( $(this).attr('id') == searchFor && $(this).attr('id') != '' ){
							set(0);
						}
				});

				if ( root.settings.collapsed == false ) {
						if ( root.find(defaults.item_class+'.collapsible').length > 0 ) {
								set( root.find(defaults.item_class+'.collapsible').index() );
						} else {
								set( 0 );
						}
				}

				if ( root.find(defaults.item_class+'.noncollapsible').length > 0 ) {
						root.find(defaults.item_class+'.noncollapsible').css( 'display','block' );
				}

				root.css( "display", "block" );

				function set(index) {

						if ( root.settings.fading ) {
							root.find(defaults.item_class + ':eq(' + index + ')').find(defaults.content_class).find('.bio').hide();
							root.find(defaults.item_class + ':eq(' + index + ')').find(defaults.content_class).find('.bio').fadeOut();
						}
						var selected = root.find(defaults.item_class + '.selected');
						if ( selected.hasClass('collapsible') ){

								selected.find(defaults.content_class).find('.bio').hide();
								selected.find(defaults.content_class).slideUp(defaults.speed, function() {
										$(this).parent().removeClass('selected');
								});
								root.find(defaults.close_class).removeClass('selected');
								//root.find(defaults.item_class).removeClass('selected');
								//selected.find('hr').first().removeClass('selected').find(defaults.content_class).slideUp(defaults.speed);
								//root.find(defaults.item_class).find('hr').first().removeClass('selected');
						}
						var top = 0;

						if(selected.index() != index) {
							var item = root.find(defaults.item_class + ':eq(' + index + ')');
							//item.find('hr').first().addClass('selected');
							item.find(defaults.close_class).addClass('selected');
							item.addClass('selected').find(defaults.content_class).slideDown(defaults.speed, function(){
									$(this).find('.bio').fadeIn();

									$(this).find("#lastupdate").each ( function() {
											var dataRollover = new $.dataRollover($(this));
									});
									$(this).find('#sources').each ( function() {
											var dataRollover = new $.dataRollover($(this));
									});
									if(defaults.callback) defaults.callback.call();
							});
					}
					
					var iterator = 0
					root.find(defaults.item_class).each( function() {
							if ( $(this).hasClass('collapsible') ){  
								topArray[ iterator ] = $(this).offset().top;
								iterator++;
							}
					});
					var topIndex = root.find(defaults.item_class).length - iterator;

					var newTop = 0;
					if ( index == topIndex ) {
						newTop = topArray[0];
					} else {
						if ( root.find(defaults.header_class).height() > 50 ) { 
							newTop = topArray[0] + ((root.find(defaults.header_class).height() + root.settings.offset) * (index) );
						} else {
							newTop = topArray[0] + ((root.find(defaults.header_class).height() + 1) * ( index - topIndex ));
						}
					}
					

					if ( root.settings.scrollTop ) {
						// console.log ( 'root.settings.scrollTop: ' + root.settings.scrollTop + ' newTop: ' + newTop );
						//$('body').css ('scrollTop', newTop );
							$('body, html').clearQueue();
							$('body, html').animate({
								scrollTop: newTop
							}, 200 );
					}
				}

				function tidy() {

					var skip = ['demographics', 'metrics', 'distribution', 'opportunities-by-device'];


					root.find(defaults.content_class + ' .row').each(function(i) {

						var unitId = $(this).parents('.unit-item').attr('id');
						
						if (jQuery.inArray(unitId, skip) == -1) {
							var rowWidth = 740; //$(this).width();
							var colWidth = 0;
							$(this).find('.col').each(function(i) {
								colWidth += $(this).width();
							});

							var diff = rowWidth - colWidth;
							if (diff > 0) {
								var lastCol = $(this).find('.col:last-child');
								lastCol.width(lastCol.width() + diff);
							}
						}
				});


			}
		});
	}
})(jQuery);


// accordion
(function($)
{
	$.specialAccordion = function(element, o)
	{
			var plugin = this;
			var defaults = {
					item_class: '.unit-item',
					header_class: '.unit-header',
					content_class: '.unit-content',
					close_class: '.unit-close',
					speed: 500,
					anchors: false,
					scrollTop: true
			};
			var settings = $.extend({}, defaults, o );
			var topArray = [];
			var iterator = 0;
			var currentHash = '';

			var init = function() {

					element.each(function(){
							element.find(defaults.item_class).each( function() {
									$(this).css( 'display', 'block');
									topArray[ iterator ] = $(this).offset().top;
									iterator++;
									$(this).find(defaults.content_class).height($(this).find(defaults.content_class).height());
									$(this).find(defaults.close_class).css ( "cursor", "pointer" );
									$(this).find(defaults.header_class).css ( "cursor", "pointer" );

									$(this).find(defaults.close_class).click(function(e){
											set($(this).parent().index(), true);
											return false;
									});

									$(this).find(defaults.header_class).click(function(e){
											set($(this).parent().index(), true);
											return false;
									});

									if ( $(this).hasClass('collapsible') ){
											$(this).find(defaults.content_class).hide();
									} else {
											$(this).find(defaults.content_class).slideDown(defaults.speed, function(){} );
									}

									//$(this).css( "display", "block" );
							});
					});

							
					if ( !settings.collapsed ) {
							if ( element.find(defaults.item_class+'.collapsible').length > 0 ) {
									set( element.find(defaults.item_class+'.collapsible').index() );
							} else {
									set( 0 );
							}
					}

					plugin.setByHash();
			}

			var set = function(index, close, noScrollFromNav) {
						if ( settings.fading ) {
								element.find(defaults.item_class + ':eq(' + index + ')').find(defaults.content_class).find('.bio').hide();
						}

						var selected = element.find(defaults.item_class + '.selected');

						var top = 0;

						if( selected.index() != index ) {

								selected.find(defaults.content_class).find('.bio').hide();
								selected.find(defaults.content_class).slideUp(defaults.speed, function() {
										$(this).parent().removeClass('selected');
								});
								element.find(defaults.close_class).removeClass('selected');

								var item = element.find(defaults.item_class + ':eq(' + index + ')');
								//item.find('hr').first().addClass('selected');
								item.find(defaults.close_class).addClass('selected');
								if ( noScrollFromNav ) {
										speed = 0;
								} else {
										speed = defaults.speed;
								}
								item.addClass('selected').find(defaults.content_class).slideDown(speed, function(){
										$(this).find('.bio').fadeIn();
										if(defaults.callback) defaults.callback.call();
								});

								if ( settings.scrollTop ) {
										if ( !noScrollFromNav ) {
												$('body, html').clearQueue();
												$('body, html').animate({
													scrollTop: topArray[index]
												}, 500 );
										}
								}
						}

						if ( close && ( selected.index() == index )) {

								selected.find(defaults.content_class).find('.bio').hide();
								selected.find(defaults.content_class).slideUp(defaults.speed, function() {
										$(this).parent().removeClass('selected');
								});
								element.find(defaults.close_class).removeClass('selected');
						}
			}

			var tidy = function() {
				element.find(defaults.content_class + ' .row').each(function(i) {
					var rowWidth = $(this).width();
					var colWidth = 0;
					$(this).find('.col').each(function(i) {
						colWidth += $(this).width();
					});

					var diff = rowWidth - colWidth;
					if (diff > 0) {
						var lastCol = $(this).find('.col:last-child');
						lastCol.width(lastCol.width() + diff);
					}
				});
			}
				
			plugin.setByHash = function() {
				var found = false;
				currentHash = window.location.hash;
				element.find(defaults.item_class).each( function() {
						var hash = window.location.hash.replace("#",'');
						if ( $(this).attr('id') == hash ) {
								set( $(this).index(), false, true );
								window.location = window.location.hash;
								found = true;
						}
				});
				if ( !found ) {
						element.find(defaults.item_class).each( function() {
								var hash = window.location.hash;
								var hashArr = window.location.hash.replace("#",'').split('-');
								if ( $(this).attr('id') == hashArr[0] ) {
										set( $(this).index(), false, true );
										window.location = window.location.hash;
										//found = true;
								}
						});
				}
			}

			init();

			tidy();

			element.css( "display", "block" );
	}

})(jQuery);


// SUBNAV CUSTOM
(function($){
	$.subnav = function( element, o ) {
		var subnav = this;

		// fix brand landing/news menu classes
		if($('body.brands-brand').length > 0) {
			if ($('body.brands-brand.news', 'body.fairchild').length > 0) {
				$('#menu-block > ul.menu > li.first').removeClass('active-trail').find('a').removeClass('active-trail');
			}
			else {
				$('#menu-block > ul.menu > li.first').addClass('active-trail').addClass('active').find('a').addClass('active-trail').addClass('active');
			}
		}

		// fix press-release/news item active item
		if($('body.press-room-press-release, body.brand-feed-item').length > 0) {
			$('#menu-block > ul.menu > li:eq(1)').addClass('active-trail').addClass('active')
		}


		$('#menu-block .menu').css('display', 'block');
		$( "#menu-block > ul.menu > li.expanded" ).each( function(){
				var defaults = {
						item_class: 'ul.menu',
						header_class: 'li.expanded',
						content_class: 'ul.menu',
						speed: 500
				};

				$(this).find( defaults.content_class ).addClass("selected");

				$(this).append("<div class='carat caratExpand'></div>");
				
				$(this).find('.caratExpand').click(function(e){
						set( $(this).parent(), $(this).parent().index() );
						return false;
				});

				if ( !$(this).hasClass('active-trail') ){
						$(this).find( defaults.content_class ).removeClass('selected').slideUp(0);
						$(this).find( '.carat' ).removeClass( 'caratExpand' ).addClass( 'caratCollapse' );
						$(this).removeClass( 'expanded' ).addClass( 'collapsed' );
				}
				
				// ffm press-release active item
				if($('body.ffm-press-release').length > 0) {
					$('#menu-block .press-releases-contacts').parent().addClass('active');
					$('#menu-block .press-releases-contacts').parent().parent().addClass('selected').show().parent().addClass('active-trail expanded').removeClass('collapsed').find('a').addClass('active-trail');
				}

				function set( scope, index ) {
						scope.find( defaults.content_class ).each( function() {
								$(this).height( $(this).height() );
						});
						if( scope.find( defaults.content_class + '.selected')[0] == undefined ) {
								scope.find( '.carat' ).removeClass( 'caratCollapse' ).addClass( 'caratExpand' );
								scope.removeClass( 'collapsed' ).addClass( 'expanded' );
								scope.find( defaults.content_class ).each( function() {
									$(this).find( '.collapsed.active-trail' ).removeClass( 'collapsed' ).addClass( 'expanded' );
								});
								scope.find( defaults.content_class ).addClass('selected').slideDown( defaults.speed );
						} else {
								scope.find( defaults.content_class ).removeClass('selected').slideUp(defaults.speed, function(){
									$(this).parent().find( '.carat' ).removeClass( 'caratExpand' ).addClass( 'caratCollapse' );
									$(this).parent().removeClass( 'expanded' ).addClass( 'collapsed' );
								});
						}
				}
		});
	};

	$.collage = function(element) {
		var left = 0;
		if (element.find('.item').length == 1 && element.find('#magazine').length == 1) {
			left = 25;
		}
		else {
			var margin = {
				'seven-inch': -22,
				'tablet': -60,
				'magazine': -60
			};

			var maxWidth = 0;
			element.find('.item').each(function(i) {
				var item = $(this);
				var itemWidth = item.position().left + item.width();

				if (typeof margin[item.attr('id')] !== 'undefined')
					itemWidth += margin[item.attr('id')];

				maxWidth = Math.max(maxWidth, itemWidth);
			});

			left = Math.round((element.width() - maxWidth) / 2);
		}
		element.css({'left': left}).removeClass('invisible');
	}

})(jQuery);

/**
 * miniFeatures
 */
;(function($) {

	$.miniFeatures = function(el, options) {
		
		var defaults = {
			width: 441,
			margin: 0,
			rolloverHide: false
		}
		
		var plugin = this;
		settings = {}
		plugin.el = el;
		
		var init = function() {
			settings = $.extend({}, defaults, options);
	 
			plugin.container = plugin.el.find('.items');
			plugin.items = plugin.el.find('.item');
			plugin.len = plugin.items.length;
			plugin.index = 0;
			plugin.animating = false;

			plugin.videoPlayerCreated = [];
			plugin.currentVideo = null;
			plugin.videoPlayerReady = false;
 
			bindEvents();
			updateNav();

			if ( checkVideoByIndex( plugin.index ) ) {
					plugin.currentVideo = getVideoPlayer( 0 );
			}

		}

		// public
		plugin.setItem = function(index) {

				if (index == plugin.index || plugin.animating) return false;
						
				plugin.animating = true;

				var offset = Math.round( 0 );
				var animateTo;
				if (index > plugin.len - 1)
				{
					var factor = plugin.items.last().length;
					plugin.items.eq(factor).clone().addClass('clone').appendTo(plugin.container);
					animateTo = getContainerLeft() - getItemWidth() + 9;
					updateContainerWidth();
					index = 0;
				}
				else if (index < 0)
				{
					var factor = plugin.items.length;
					plugin.items.eq(plugin.len - (factor + 1)).clone().addClass('clone').prependTo(plugin.container);
					plugin.container.css('left', getContainerLeft() - ( getItemWidth() - 2 ) );
					animateTo = getContainerLeft() + getItemWidth() - 4;
					index = plugin.len - 1;
				}
				else if (index == 0 && plugin.index > 0) 
				{
					var factor = plugin.items.length;
					plugin.items.eq(plugin.len - factor).clone().addClass('clone').prependTo(plugin.container);
					plugin.items.eq(plugin.len - (factor + 1)).clone().addClass('clone').prependTo(plugin.container);
					plugin.container.css('left', offset - ((plugin.index + 2) * (getItemWidth()-2)));
					animateTo = offset - (2 * getItemWidth());
				}
				else if (index == plugin.len - 1 && plugin.index < plugin.len - 1) {
					plugin.items.eq(0).clone().addClass('clone').appendTo(plugin.container);
					animateTo = getContainerLeft() + (getItemWidth() * (plugin.index - index));
				}
				else 
				{
					animateTo = offset - ((index ) * getItemWidth());
				}

				plugin.index = index;
				updateContainerWidth();
				updateNav();
				plugin.container.clearQueue().animate({left: Math.round(animateTo)}, 500, animationComplete);
		}

		// private
		var updateContainerWidth = function() {
			plugin.container.width(getItemWidth() * plugin.el.find('.item').length);
		}

		var getContainerLeft = function() {
			return Number(plugin.container.css('left').replace('px', ''));
		}

		var getItemWidth = function() {
			// browser width + margin
			return settings.width + settings.margin;
		}

		var animationComplete = function() {
			resetItems();
			plugin.animating = false;
		}
		
		var resetItems = function() {
			
			plugin.container.find('.clone').remove();
			plugin.container.css({left: getContainerPosition()});

			if (plugin.index == plugin.len - 1)
			{
				plugin.items.first().clone().addClass('clone').appendTo(plugin.container);
			}
			else if (plugin.index == 0)
			{
				//plugin.items.last().clone().addClass('clone').prependTo(plugin.container);
				//plugin.container.css({left: getContainerPosition(1)});
			}
			
			updateContainerWidth();
		}

		var getContainerPosition = function(extra) {
			var offset = Math.round(0);
			return offset - Math.round((extra ? plugin.index + extra : plugin.index) * getItemWidth());
		}

		var updateNav = function() {
			var dot = plugin.el.find('.bottom .dot:eq(' + plugin.index +')');
			var dots = plugin.el.find('.bottom .dot');
			dots.find('a').removeClass( 'selected' );
			dot.find('a').addClass('selected');
		}

		var getItemWidth = function() {        
			return settings.itemWidth;
		}

		var bindEvents = function() {
			plugin.el.find('.bottom .dot').click(dotClickHandler);
			plugin.el.find('.top .arrows a').click(arrowClickHandler);
			if ( settings.rolloverHide ) {
				plugin.el.find('.items .item').each(function(index)
				{
					$(this).find('.description').css({bottom: -$(this).innerHeight()});
					$(this).hover(function()
					{
						$(this).find('.description').show().animate({bottom: "0px"});
					}, function()
					{
						$(this).find('.description').hide().css({bottom: -$(this).innerHeight()});
					});
				});
			}
			$(document).keydown( keyboardHandler );
		}
		
		var dotClickHandler = function(e) {
			plugin.setItem($(this).index());
			e.stopPropagation();
			return false;
		}
		
		var arrowClickHandler = function(e) {
				if ($(this).hasClass('prev')) {
						plugin.setItem(plugin.index - 1);
				} else if ($(this).hasClass('next')) {
						plugin.setItem(plugin.index + 1);
				}
				e.stopPropagation();
				return false;
		}

		var keyboardHandler = function(e) {    
				// keyboard click
				if (e.keyCode == 37) {
						plugin.setItem(plugin.index - 1);
						return false;
				}
				if (e.keyCode == 39) {
						plugin.setItem(plugin.index + 1);
						return false;
				}
		}

		// YouTube Video control
		var checkVideoByIndex = function( index ) {
				var item = plugin.el.find('.item:eq(' + index +')');
				if ( item.find(".video").length > 0 ) {
						return true;
				} else {
						return false;
				}
		}

		var getVideoPlayer = function( index ) {
				if ( plugin.videoPlayerCreated[index] == null ) {
						plugin.videoPlayerCreated[index] = getNewPlayerByID( plugin.el.find('.item:eq(' + index +')').find('.video').attr( 'id' ) );
				} else {
						plugin.videoPlayerCreated[index].playVideo();
				}
				return plugin.videoPlayerCreated[index];
		}

		var getNewPlayerByID = function( videoID ) {
				var player = new YT.Player( videoID, {
					width: '726',
					height: '484',
					videoId: videoID,
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					},
					playerVars: {
						autoplay: 0,
						autohide: 1,
						rel: 0,
						hd: 1,
						modestbranding: 0,
						wmode: 'opaque'
					}
				});
				return player;
		}

		var onPlayerReady = function(evt) {
				evt.target.playVideo();
		}

		var onPlayerStateChange = function(evt) {
				if (evt.data == YT.PlayerState.PLAYING && !done) {
						done = true;
				}
		}

		// add the API jsut in case
		if ( plugin.el.find('.video').length > 0 ) {
				var tag = document.createElement('script');
				tag.async = true;
				tag.src = "http://www.youtube.com/player_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				var done = false;
		} else {
				init();
		}

		window.onYouTubePlayerAPIReady = function () {
				init();
		}; //.bind(plugin);

	}

})(jQuery);

(function($) {
		$.dataRollover = function( element, o ) {
			var left;
			var spanWidth;
			if ( $.browser.mozilla ) {
				spanWidth = element.find('span').width() + parseFloat( element.find('span').css('padding-left').replace('px', '')) + 1;
			} else {
				spanWidth = element.find('span').width() + parseFloat( element.find('span').css('padding-left').replace('px', '')) + parseFloat( element.find('span').css('padding-right').replace('px', ''));
			}
			left = Math.round(( spanWidth - (element.width() ) ) / -2);
			element.find( 'span' ).css( 'left', left );
			//console.log ( "left: " + element.find('span').css('padding-left').replace('px', '') );
		};
})(jQuery);


(function($) {
		
		$.metricsConfigure = function( element ) {
			var plugin = this;
			plugin.el = element;
			plugin.el.find('li').each( function(){
				var digitsWidth = $(this).find( '.digits' ).width();
				var newWidth = digitsWidth + $(this).find( '.subscript' ).width();
				$(this).find( '.digits' ).width( digitsWidth );
				$(this).find( '.digiContain' ).height( 60 );
				$(this).find( '.digiContain' ).width( newWidth );
				$(this).find( '.digiContain' ).css( 'left', (186 - newWidth) /2 );
				$(this).find( '.subscript' ).css( 'left', digitsWidth );
			});
		};

})(jQuery);


$(document).ready(function() {

		if ( $("#menu-block").length > 0 ) 
				var subnav = new $.subnav( $('#menu-block') );

		if ( $(".unit").length > 0 ) {
			if ( $(".executiveteam").length > 0 ) {
					var accordion = new $.accordion($('.unit'), {fading: true, collapsed: false, offset:13} );
			} else if ( $(".careers").length > 0 ) {
					var accordion = new $.accordion($('.unit'), {fading: true, collapsed: true} );
			} else if ( $(".terms-and-conditions").length > 0 ) {
				var privacyAccordion = new $.specialAccordion($('.unit'), {scrollTop: true, collapsed: true, anchors: true, offset: 2} );
				$(".top").find( 'a' ).click( function() {
						window.location = $(this).attr( 'href' );
						privacyAccordion.setByHash();
				});
			} else if ( $(".awards").length > 0 ) {
				var accordion = new $.accordion($('.unit'), {fading: true, collapsed: true, offset:12.2} );
			} else if ( $(".user-agreement").length > 0 ) { 
				var accordion = new $.specialAccordion($('.unit'), {scrollTop: true, collapsed: true, anchors: true} );
			} else {
				var accordion = new $.accordion($('.unit'));
			}
		}

		$("#container").find("#lastupdate").each ( function() {
				var dataRollover = new $.dataRollover($(this));
		});
		$("#container").find('#sources').each ( function() {
				var dataRollover = new $.dataRollover($(this));
		});

		if ($("#collage").length > 0)
			var collage = new $.collage( $('#collage') );

		if ($(".mediakit .buttons").length > 0)
				var features = new $.features($('.mediakit .buttons'), {spinOptions: spinOptions});

		if ($("#features").length > 0)
				var features = new $.features($('#features'), {spinOptions: spinOptions});

		if ($(".brands-brand-product-licensing #product-licensing #slideshow, .global-product-licensing #slideshow, .global-generic-page #slideshow").length > 0) {
				var miniFeatures = new $.miniFeatures($('#slideshow'), {maskWidth:356, itemWidth: 356, rolloverHide: false});
		}

		if ($(".about-social-responsibility #social-responsiblity #featured").length > 0) {
				var miniFeatures = new $.miniFeatures($('.about-social-responsibility #social-responsiblity #featured'), {maskWidth:441, itemWidth: 443, rolloverHide: false});
		}

		if ($(".life-at-conde-nast #life-at-conde-nast #slideshow ").length > 0) {
				var miniFeatures = new $.miniFeatures($('.life-at-conde-nast #life-at-conde-nast #slideshow '), {maskWidth:736, itemWidth: 736, rolloverHide: true});
		}

		if ($("body.media-partners-company-our-work").length > 0)
				var work = new $.partnerWork({groupId: $("#group_id").val()});

		if ($("body.press-room-press-releases-contac").length > 0)
			var pressReleases = new $.ajaxContent({spinOptions: spinOptions, isFFM: $('body').hasClass('fairchild')});

		if ($("body.press-room-events").length > 0)
			var events = new $.ajaxContent({itemContainer: '#events ul', prefix: 'events_', spinOptions: spinOptions, isFFM: $('body').hasClass('fairchild')});

		if ($("body.about-us-landing").length > 0)
				var livingWall = new $.livingWall($('#brands'));
		
		if ($("#metrics").length > 0)
				var metricsConfigure = new $.metricsConfigure($('#metrics'));

});

jQuery.fn.adjustChildHeights = function()
{
	$(this).each(function(i)
	{
		var maxHeight = 0;
		$(this).children().each(function(j)
		{
			if($(this).height() > maxHeight)
			{
				maxHeight = $(this).height();
			}
		});
		if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'height': maxHeight}); }
		$(this).children().css({'min-height': maxHeight});
	});
	return this;
};


/*!
 * jQuery Transit - CSS3 transitions and transformations
 * Copyright(c) 2011 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(d){function j(a){var b=["Moz","Webkit","O","ms"],c=a.charAt(0).toUpperCase()+a.substr(1);if(a in k.style)return a;for(a=0;a<b.length;++a){var d=b[a]+c;if(d in k.style)return d}}function i(a){"string"===typeof a&&this.parse(a);return this}function q(a,b,c){!0===b?a.queue(c):b?a.queue(b,c):c()}function m(a){var b=[];d.each(a,function(a){a=d.camelCase(a);a=d.transit.propertyMap[a]||a;a=s(a);-1===d.inArray(a,b)&&b.push(a)});return b}function r(a,b,c,p){a=m(a);d.cssEase[c]&&(c=d.cssEase[c]);
var f=""+n(b)+" "+c;0<parseInt(p,10)&&(f+=" "+n(p));var h=[];d.each(a,function(a,b){h.push(b+" "+f)});return h.join(", ")}function e(a,b){b||(d.cssNumber[a]=!0);d.transit.propertyMap[a]=h.transform;d.cssHooks[a]={get:function(b){return(d(b).css("transform")||new i).get(a)},set:function(b,h){var f=d(b).css("transform")||new i;f.setFromString(a,h);d(b).css({transform:f})}}}function s(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function g(a,b){return"string"===typeof a&&!a.match(/^[\-0-9\.]+$/)?
a:""+a+b}function n(a){d.fx.speeds[a]&&(a=d.fx.speeds[a]);return g(a,"ms")}d.transit={version:"0.1.2+",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!0};var k=document.createElement("div"),t=-1<navigator.userAgent.toLowerCase().indexOf("chrome"),h={transition:j("transition"),transitionDelay:j("transitionDelay"),transform:j("transform"),
transformOrigin:j("transformOrigin")};d.extend(d.support,h);var o=h.transitionEnd={MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"}[h.transition]||null,k=null;d.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)"};d.cssHooks.transform={get:function(a){return d(a).data("transform")},set:function(a,b){var c=b;c instanceof i||(c=new i(c));a.style[h.transform]="WebkitTransform"===
h.transform&&!t?c.toString(!0):c.toString();d(a).data("transform",c)}};d.cssHooks.transformOrigin={get:function(a){return a.style[h.transformOrigin]},set:function(a,b){a.style[h.transformOrigin]=b}};e("scale");e("translate");e("rotate");e("rotateX");e("rotateY");e("rotate3d");e("perspective");e("skewX");e("skewY");e("x",!0);e("y",!0);i.prototype={setFromString:function(a,b){var c="string"===typeof b?b.split(","):b.constructor===Array?b:[b];c.unshift(a);i.prototype.set.apply(this,c)},set:function(a){var b=
Array.prototype.slice.apply(arguments,[1]);this.setter[a]?this.setter[a].apply(this,b):this[a]=b.join(",")},get:function(a){return this.getter[a]?this.getter[a].apply(this):this[a]||0},setter:{rotate:function(a){this.rotate=g(a,"deg")},rotateX:function(a){this.rotateX=g(a,"deg")},rotateY:function(a){this.rotateY=g(a,"deg")},scale:function(a,b){void 0===b&&(b=a);this.scale=a+","+b},skewX:function(a){this.skewX=g(a,"deg")},skewY:function(a){this.skewY=g(a,"deg")},perspective:function(a){this.perspective=
g(a,"px")},x:function(a){this.set("translate",a,null)},y:function(a){this.set("translate",null,a)},translate:function(a,b){if(void 0===this._translateX)this._translateX=0;if(void 0===this._translateY)this._translateY=0;if(null!==a)this._translateX=g(a,"px");if(null!==b)this._translateY=g(b,"px");this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var a=(this.scale||"1,1").split(",");a[0]&&
(a[0]=parseFloat(a[0]));a[1]&&(a[1]=parseFloat(a[1]));return a[0]===a[1]?a[0]:a},rotate3d:function(){for(var a=(this.rotate3d||"0,0,0,0deg").split(","),b=0;3>=b;++b)a[b]&&(a[b]=parseFloat(a[b]));a[3]&&(a[3]=g(a[3],"deg"));return a}},parse:function(a){var b=this;a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(a,d,f){b.setFromString(d,f)})},toString:function(a){var b=[],c;for(c in this)this.hasOwnProperty(c)&&"_"!==c[0]&&(a&&"scale"===c?b.push(c+"3d("+this[c]+",1)"):a&&"translate"===c?b.push(c+"3d("+
this[c]+",0)"):b.push(c+"("+this[c]+")"));return b.join(" ")}};d.fn.transition=d.fn.transit=function(a,b,c,e){var f=this,g=0,i=!0;"function"===typeof b&&(e=b,b=void 0);"function"===typeof c&&(e=c,c=void 0);if("undefined"!==typeof a.easing)c=a.easing,delete a.easing;if("undefined"!==typeof a.duration)b=a.duration,delete a.duration;if("undefined"!==typeof a.complete)e=a.complete,delete a.complete;if("undefined"!==typeof a.queue)i=a.queue,delete a.queue;if(a.delay)g=a.delay,delete a.delay;if("undefined"===
typeof b)b=d.fx.speeds._default;if("undefined"===typeof c)c=d.cssEase._default;var b=n(b),j=r(a,b,c,g),l=d.transit.enabled&&h.transition?parseInt(b,10)+parseInt(g,10):0;if(0===l)return q(f,i,function(b){f.css(a);e&&e();b()}),f;var k={},m=function(b){var c=!1,g=function(){c&&f.unbind(o,g);0<l&&f.each(function(){this.style[h.transition]=k[this]||null});"function"===typeof e&&e.apply(f);"function"===typeof b&&b()};0<l&&o&&d.transit.useTransitionEnd?(c=!0,f.bind(o,g)):window.setTimeout(g,l);f.each(function(){0<
l&&(this.style[h.transition]=j);d(this).css(a)})};q(f,i,function(a){var b=0;"MozTransition"===h.transition&&25>b&&(b=25);window.setTimeout(function(){m(a)},b)});return this};d.transit.getTransitionValue=r})(jQuery);


/*
		jQuery plugin to detect flicks on elements
		Steve Gough 4/12/2010
*/


(function($) {
		$.fn.detectFlicks = function(options) {
				
				//for reference only
				var LeftToRight = 'left2right',
						RightToLeft = 'right2left',
						UpToDown = 'up2down',
						DownToUp = 'down2up';
				
				var flickController = {
						direction: '',
						isFlick: false
				};

				var defaults = {
						threshold: 15,
						axis: 'x',
						flickEvent: function() { return true; }
				};

				var options = $.extend(defaults, options);

				flickController.touchStart = function(e) {
						var $el = $(e.target);
						// this is where the touch was first detected
						this.isFlick = false;
						this.startX = event.targetTouches[0].clientX;
						this.startY = event.targetTouches[0].clientY;
						if (options.axis == 'y') {
								$el.bind('touchmove', flickController.touchMoveY);
						}
						else {
								$el.bind('touchmove', flickController.touchMoveX);
						}

						$el.bind('touchend', flickController.touchEnd);
				};

				flickController.touchMoveX = function(e) {

						event.preventDefault(); //no scrolling
						this.movedX = event.targetTouches[0].clientX;
						if (Math.abs(Math.abs(this.movedX) - Math.abs(this.startX)) > options.threshold) {
								this.isFlick = true;
								if (this.movedX > this.startX) {
										flickController.direction = LeftToRight;
								}
								else {
										flickController.direction = RightToLeft;
								}
						}
				};

				flickController.touchMoveY = function(e) {

						event.preventDefault(); //no scrolling
						this.movedY = event.targetTouches[0].clientY;
						if (Math.abs(Math.abs(this.movedY) - Math.abs(this.startY)) > options.threshold) {
								this.isFlick = true;
								if (this.movedY > this.startY) {
										flickController.direction = UpToDown;
								}
								else {
										flickController.direction = DownToUp;
								}
						}
				};

				// Evaluate the custom code if a flick was detected
				flickController.touchEnd = function(e) {
						var $el = $(e.target);
						if (this.isFlick) {
								options.flickEvent({ direction: flickController.direction });
						}
						$el.unbind('touchmove touchend');
				};

				obj = $(this);
				obj.bind('touchstart', flickController.touchStart);

				return flickController;
		};
})(jQuery);

/**
 * jQuery.timers - Timer abstractions for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/10/16
 *
 * @author Blair Mitchelmore
 * @version 1.2
 *
 **/

jQuery.fn.extend({
	everyTime: function(interval, label, fn, times) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, times);
		});
	},
	oneTime: function(interval, label, fn) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, 1);
		});
	},
	stopTime: function(label, fn) {
		return this.each(function() {
			jQuery.timer.remove(this, label, fn);
		});
	}
});

jQuery.extend({
	timer: {
		global: [],
		guid: 1,
		dataKey: "jQuery.timer",
		regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
		powers: {
			// Yeah this is major overkill...
			'ms': 1,
			'cs': 10,
			'ds': 100,
			's': 1000,
			'das': 10000,
			'hs': 100000,
			'ks': 1000000
		},
		timeParse: function(value) {
			if (value == undefined || value == null)
				return null;
			var result = this.regex.exec(jQuery.trim(value.toString()));
			if (result[2]) {
				var num = parseFloat(result[1]);
				var mult = this.powers[result[2]] || 1;
				return num * mult;
			} else {
				return value;
			}
		},
		add: function(element, interval, label, fn, times) {
			var counter = 0;
			
			if (jQuery.isFunction(label)) {
				if (!times) 
					times = fn;
				fn = label;
				label = interval;
			}
			
			interval = jQuery.timer.timeParse(interval);

			if (typeof interval != 'number' || isNaN(interval) || interval < 0)
				return;

			if (typeof times != 'number' || isNaN(times) || times < 0) 
				times = 0;
			
			times = times || 0;
			
			var timers = jQuery.data(element, this.dataKey) || jQuery.data(element, this.dataKey, {});
			
			if (!timers[label])
				timers[label] = {};
			
			fn.timerID = fn.timerID || this.guid++;
			
			var handler = function() {
				if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
					jQuery.timer.remove(element, label, fn);
			};
			
			handler.timerID = fn.timerID;
			
			if (!timers[label][fn.timerID])
				timers[label][fn.timerID] = window.setInterval(handler,interval);
			
			this.global.push( element );
			
		},
		remove: function(element, label, fn) {
			var timers = jQuery.data(element, this.dataKey), ret;
			
			if ( timers ) {
				
				if (!label) {
					for ( label in timers )
						this.remove(element, label, fn);
				} else if ( timers[label] ) {
					if ( fn ) {
						if ( fn.timerID ) {
							window.clearInterval(timers[label][fn.timerID]);
							delete timers[label][fn.timerID];
						}
					} else {
						for ( var fn in timers[label] ) {
							window.clearInterval(timers[label][fn]);
							delete timers[label][fn];
						}
					}
					
					for ( ret in timers[label] ) break;
					if ( !ret ) {
						ret = null;
						delete timers[label];
					}
				}
				
				for ( ret in timers ) break;
				if ( !ret ) 
					jQuery.removeData(element, this.dataKey);
			}
		}
	}
});

var shuffle = function(array) {
	var tmp, current, top = array.length;
	if(top) while(--top) {
		current = Math.floor(Math.random() * (top + 1));
		tmp = array[current];
		array[current] = array[top];
		array[top] = tmp;
	}
	return array;
}

jQuery(window).bind("unload", function() {
	jQuery.each(jQuery.timer.global, function(index, item) {
		jQuery.timer.remove(item);
	});
});
