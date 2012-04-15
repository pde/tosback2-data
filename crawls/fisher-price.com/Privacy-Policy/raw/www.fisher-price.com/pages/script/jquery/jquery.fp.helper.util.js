(function ($) {
	$.preloadImages = function (ele, att) {
		if ($.isArray(ele)) {
			$.each(ele, function () {
				var image = document.createElement('img');
				image.src = this;
				$.preloadImages.images.push(image);
			});
		} else {
			ele.each(function () {
				var image = document.createElement('img');
				image.src = $(this).attr(att);
				$.preloadImages.images.push(image);
			});
		}
	};
	
	$.preloadImages.images = [];

	$.toggleArrayValue = function (value, array) {
		var index = $.inArray(value, array);
		
		if (index != -1) { 
			array.splice(index, 1);
		} else { 
			array.push(value);
		}
		
		return array;
	};

	$.replaceArrayValue = function (oldValue, newValue, array) {
		var index = $.inArray(oldValue, array);
		
		if (index != -1) {
			array[index] = newValue;
		} else {
			array.push(newValue);
		}
	}

	$.getUniqueScript = function (url, callback) {
		if ($.getUniqueScript.uniqueScripts.length < 1) {
			$('script').each(function () {
				var src = $(this).attr('src');
				if (typeof(src) != 'undefined') {
					$.getUniqueScript.uniqueScripts.push(src);
				}
			})
		}
		
		if ($.ajaxSettings.cache != true) {
			if ($.inArray(url, $.getUniqueScript.uniqueScripts) == -1) {
				$.getUniqueScript.uniqueScripts.push(url);
				return $.getScript(url, callback, true);
			} else {
				if (typeof(callback) != 'undefined') {
					callback();
				}
				return false;
			}
		} else {
			return $.getScript(url, callback, true);
		}
	};

	$.getUniqueScript.uniqueScripts = [];
	
	$.fn.createTabs = function (class_name) {
		var settings = {
			disabled: new Array(),
			selected: null
		};
		
		var $tabs = $('> ul a', this);
		var hash = (document.location.hash != '') ? document.location.hash : null;

		if (typeof(class_name) == 'undefined') {
			class_name = 'default';
		}
		
		if (hash != null) {
			var $panel = $(hash);
			if (!$panel.isEmpty()) {
				$tabs.map(function (i) {
					if ($(this).attr('href') == hash) {
						settings.selected = i;
					}
				});
			}
		}
			
		$tabs.each(function (i) {
			var $obj = $(this);
			var $panel = $($obj.attr('href'));
			
			if ($panel.isEmpty()) {
				settings.disabled.push(i);
			} else {
				if (settings.selected == null) {
					if ($obj.hasClass(class_name)) {
						settings.selected = i;
					}
				}
			}
		});
				
		if (settings.selected == null) {
			settings.selected = 0;
		}
			
		this.tabs(settings);
				
		$tabs.eq(settings.selected).click();
	};

	$.fn.toggleClickState = function (class_name) {
		if (typeof(class_name) == 'undefined') {
			class_name = 'click-active';
		}
	
		this.toggle(
			function () { $(this).addClass(class_name) },
			function () { $(this).removeClass(class_name) }
		);
	};
	
	$.fn.uniqueClickState = function (class_name) {
		if (typeof(class_name) == 'undefined') {
			class_name = 'click-active';
		}
	
		this.click(function () {
			var $this = $(this);
			
			if (!$this.hasClass(class_name)) {
				$this.siblings().removeClass(class_name);
				$this.addClass(class_name);
			}
		});
	};

	$.fn.addHoverState = function (class_name) { 
		if (typeof(class_name) == 'undefined') {
			class_name = 'hover-active';
		}	
	
		this.hover(
			function () { $(this).addClass(class_name) },
			function () { $(this).removeClass(class_name) }
		);
	};

	$.fn.matchHeight = function () {
		var maxHeight = (arguments.length > 0) ? arguments[0] : 0;
		
		this.each(function () {
			height = $(this).height();
			maxHeight = (height > maxHeight) ? height : maxHeight;
		});
		
		this.height(maxHeight);
		
		return this;
	};
	
	$.fn.shuffle = function() {
		return this.each(function(){
			var items = $(this).children();
			return (items.length) ? $(this).html($.shuffle(items)) : this;
		});
	};
	
	$.shuffle = function(arr) {
		for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		return arr;
	};
	
	$.fn.align = function (options) {
		var $obj, $parent, $reference, $html, settings;
		
		$html = $('html');
		settings = $.extend({}, $.fn.align.defaults, options);
		
		return $(this).each(function () {
			$obj = $(this);
			$parent = $obj.parent();
		
			if ($parent[0].tagName.toLowerCase() != 'body') {
				if ($parent.css('position') != 'relative') {
					$parent.css('position', 'relative');
				}
			} else {
				$parent = $(window);
			}
			
			if ($obj.css('position') != 'absolute') {
				$obj.css('position', 'absolute');
			}
		
			switch (settings.position.x) {
				case 'center':	$obj.css('left', (($parent.width() / 2) - ($obj.width() / 2)) + 'px');
								break;
				case 'left':	
				case 'right':	$obj.css(settings.position.x, 0);
								break;
				default:		$obj.css('left', settings.position.x + 'px');
								break;
			}
			
			switch (settings.position.y) {
				case 'center':	$obj.css('top', $html.scrollTop() + $parent.scrollTop() + (($parent.height() / 2) - ($obj.height() / 2)) + 'px');
								break;
				case 'top':		$obj.css('top', $html.scrollTop() + $parent.scrollTop() + 'px');
								break;
				case 'bottom':	$obj.css('bottom', $html.scrollTop() + $parent.scrollTop() + $parent.height() + 'px');
								break;
				default:		$obj.css('top',  $html.scrollTop() + $parent.scrollTop() + settings.position.y + 'px');
								break;
			}
		});	
	};
	
	$.fn.align.defaults = {
		position: {
			x: 'left',
			y: 'top'
		}
	};

	$.fn.smoothScroll = function () {
		var $obj = this;
		var hash, settings, target;
		var args = arguments;

		if ($obj.length > 0) {
			return $obj.each(function () {
				switch (args.length) {
					case 0:		hash = $obj.attr('href').replace('#', '');
								break;
					
					case 1:		if (typeof(args[0]) == 'object') {
									hash = $obj.attr('href').replace('#', '');
									settings = $.extend({}, arguments[0], $.fn.smoothScroll.defaults);	
								} else {
									hash = args[0];
									settings = $.extend({}, $.fn.smoothScroll.defaults);
								}
								break;
								
					default:	hash = args[0];
								settings = $.extend({}, args[1], $.fn.smoothScroll.defaults);
								break;
				}
				
				$obj.click(function (e) {
					e.preventDefault();
					$.smoothScroll(hash, settings);
				});
			});
		} else {
			return false;
		}
	};
	
	$.fn.isEmpty = function () {
		return !($.trim(this.html()) != '');
	};

	$.smoothScroll = function () {
		var hash, settings, target;

		switch (arguments.length) {
			case 1:		hash = arguments[0];
						settings = $.extend({}, $.fn.smoothScroll.defaults);
						break;
						
			default:	hash = arguments[0];
						settings = $.extend({}, arguments[1], $.fn.smoothScroll.defaults);
						break;
		}
		
		target = $('a[name=' + hash + ']').offset().top;
		
		$('html:not(:animated), body:not(:animated)').animate({ scrollTop: target }, settings.duration, settings.easing);
	};

	$.smoothScroll.defaults = {
		duration: 500,
		easing: 'swing'
	};
		
	$.deserialize = function (str) {
		var parameters = {}, hash;
		var hashes = str.split('&');
		
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			parameters[hash[0]] = hash[1];
		}
		
		return parameters;
	};

	$.getScript = function (url, callback, cache) {
		$.ajax({
			type: 'GET',
			url: url,
			success: callback,
			dataType: 'script',
			cache: cache
		});
	};
	
})(jQuery);

function si_tracking() {
	var now=new Date();
	var url='//track.searchignite.com/si/CM/Tracking/TransactionTracking.aspx?siclientid=5422&transactionamount=0&SICustTransType=23915&jscript=0&timecode='+now.getTime();
	var proto = location.protocol.toLowerCase(); if( proto == 'https:' ) { url = proto + url; } else { url = 'http:' + url; }
	var siimage=new Image();
	siimage.src=url;
}

function si_tracking2(partner) {
	var now=new Date();
	var url='//track.searchignite.com/si/CM/Tracking/TransactionTracking.aspx?siclientid=5422&transactionamount=0&SICustTransType=23914&jscript=0&x1='+escape(partner)+'&timecode='+now.getTime();
	var proto = location.protocol.toLowerCase(); if( proto == 'https:' ) { url = proto + url; } else { url = 'http:' + url; }
	var siimage=new Image();
	siimage.src=url;
}