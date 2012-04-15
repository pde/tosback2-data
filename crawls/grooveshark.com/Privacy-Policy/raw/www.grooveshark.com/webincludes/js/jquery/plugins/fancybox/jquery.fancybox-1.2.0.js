/*
 * FancyBox - simple jQuery plugin for fancy image zooming
 * Examples and documentation at: http://fancy.klade.lv/
 * Version: 1.2.0 (27/02/2009)
 * Copyright (c) 2009 Janis Skarnelis
 * Licensed under the MIT License: http://en.wikipedia.org/wiki/MIT_License
 * Requires: jQuery v1.3+
*/
;(function($) {

	$.fn.fixPNG = function() {
		return this.each(function () {
			var image = $(this).css('backgroundImage');

			if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
				image = RegExp.$1;
				$(this).css({
					'backgroundImage': 'none',
					'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=" + ($(this).css('backgroundRepeat') == 'no-repeat' ? 'crop' : 'scale') + ", src='" + image + "')"
				}).each(function () {
					var position = $(this).css('position');
					if (position != 'absolute' && position != 'relative')
						$(this).css('position', 'relative');
				});
			}
		});
	};

	var elem, opts, busy = false, imagePreloader = new Image, loadingTimer, loadingFrame = 1, imageRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i;
	var isIE = ($.browser.msie && parseInt($.browser.version.substr(0,1)) < 8);

	$.fn.fancybox = function(settings) {
		settings	= $.extend({}, $.fn.fancybox.defaults, settings);

		var matchedGroup = this;

		function _initialize() {
			elem = this;
			opts = settings;

			_start();

			return false;
		};

		function _start() {
			if (busy) return;

			if ($.isFunction(opts.callbackOnStart)) {
				opts.callbackOnStart();
			}

			opts.itemArray		= [];
			opts.itemCurrent	= 0;

			if (settings.itemArray.length > 0) {
				opts.itemArray = settings.itemArray;

			} else {
				var item = {};

				for (var i = 0; i < matchedGroup.length; i++) {
					item = {href: matchedGroup[i].href, title: matchedGroup[i].title};

					if ($(matchedGroup[i]).children("img:first").length) {
						item.orig = $(matchedGroup[i]).children("img:first");
					}

					opts.itemArray.push( item );
				}
			}

			while ( opts.itemArray[ opts.itemCurrent ].href != elem.href ) {
				opts.itemCurrent++;
			}

			if (opts.overlayShow) {
				if (isIE) {
					$('embed, object, select').css('visibility', 'hidden');
				}

				$("#fancy_overlay").css('opacity', opts.overlayOpacity).show();
			}

			_change_item();
		};

		function _change_item() {
			$("#fancy_right, #fancy_left, #fancy_close, #fancy_title").hide();

			var href = opts.itemArray[ opts.itemCurrent ].href;

			if (href.match(/#/)) {
				var target = window.location.href.split('#')[0]; target = href.replace(target, '');

				_set_content('<div id="fancy_div">' + $(target).html() + '</div>', opts.frameWidth, opts.frameHeight);

			} else if (href.match(imageRegExp)) {
				imagePreloader = new Image; imagePreloader.src = href;

				if (imagePreloader.complete) {
					_proceed_image();

				} else {
					$.fn.fancybox.showLoading();

					$(imagePreloader).unbind().bind('load', function() {
						$(".fancy_loading").hide();
						_proceed_image();
					});
				}

			} else if ( href.match("iframe")) {
				_set_content('<iframe id="fancy_frame" onload="$.fn.fancybox.showIframe()" name="fancy_iframe' + Math.round(Math.random()*1000) + '" frameborder="0" hspace="0" src="' + href + '"></iframe>', opts.frameWidth, opts.frameHeight);

			} else {
				$.get(href, function(data) {
					_set_content( '<div id="fancy_ajax">' + data + '</div>', opts.frameWidth, opts.frameHeight );
				});
			}
		};

		function _proceed_image() {
			if (opts.imageScale) {
				var w = $.fn.fancybox.getViewport();

				var r = Math.min(Math.min(w[0] - 36, imagePreloader.width) / imagePreloader.width, Math.min(w[1] - 60, imagePreloader.height) / imagePreloader.height);

				var width = Math.round(r * imagePreloader.width);
				var height = Math.round(r * imagePreloader.height);

			} else {
				var width = imagePreloader.width;
				var height = imagePreloader.height;
			}

			_set_content('<img alt="" id="fancy_img" src="' + imagePreloader.src + '" />', width, height);

			_preload_neighbor_images();
		};

		function _preload_neighbor_images() {
			if ( (opts.itemArray.length -1) > opts.itemCurrent ) {
				var href = opts.itemArray[opts.itemCurrent + 1].href;

				if (href.match(imageRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}

			if ( opts.itemCurrent > 0 ) {
				var href = opts.itemArray[opts.itemCurrent -1].href;

				if (href.match(imageRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}
		};

		function _set_content(value, width, height) {
			var w = $.fn.fancybox.getViewport();

			var itemLeft	= (width + 36)	> w[0] ? w[2] : (w[2] + Math.round((w[0] - width - 36) / 2));
			var itemTop		= (height + 50)	> w[1] ? w[3] : (w[3] + Math.round((w[1] - height - 50) / 2));

			var itemOpts = {
				'left':		itemLeft,
				'top':		itemTop,
				'width':	width + 'px',
				'height':	height + 'px'
			};

			if ($("#fancy_outer").is(":visible")) {
				if (width == $("#fancy_content").width() && height == $("#fancy_content").height()) {
					$("#fancy_content").fadeOut("fast", function() {
						$("#fancy_content").empty().append($(value)).fadeIn("fast", function() {
							_finish();
						});
					});

				} else {
				
					$("#fancy_content").fadeOut("fast", function() {
						$("#fancy_content").empty();
						$("#fancy_outer").animate(itemOpts, opts.zoomSpeedChange, opts.easingChange, function() {
							$("#fancy_content").append($(value)).fadeIn("fast", function() {
								_finish();
							});
						});
					});
				}

			} else {

				if (opts.zoomSpeedIn > 0 && opts.itemArray[opts.itemCurrent].orig !== undefined) {
					$("#fancy_content").empty().append($(value));

					var orig_item	= opts.itemArray[opts.itemCurrent].orig;
					var orig_pos	= $.fn.fancybox.getPosition(orig_item);
					
					$("#fancy_outer").css({
						'left':		(orig_pos.left - 18) + 'px',
						'top':		(orig_pos.top  - 18) + 'px',
						'width':	$(orig_item).width(),
						'height':	$(orig_item).height()
					});

					busy = true;

					if (opts.zoomOpacity) {
						itemOpts.opacity = 'show';
					}

					$("#fancy_outer").animate(itemOpts, opts.zoomSpeedIn, opts.easingIn, function() {
						_finish();
					});

				} else {

					$("#fancy_content").empty().append($(value));

					busy = true;

					$("#fancy_outer").css(itemOpts).fadeIn("normal", function() {
						_finish();
					});
				}
			}
		};

		function _set_navigation() {
			if ( opts.itemCurrent != 0 ) {
				$("#fancy_left, #fancy_left_ico").unbind().bind("click", function(e) {
					e.stopPropagation();

					opts.itemCurrent--;
					_change_item();

					return false;
				});
				
				$("#fancy_left").show();
			}

			if ( opts.itemCurrent != ( opts.itemArray.length -1 ) ) {
				$("#fancy_right, #fancy_right_ico").unbind().bind("click", function(e) {
					e.stopPropagation();

					opts.itemCurrent++;
					_change_item();

					return false;
				});

				$("#fancy_right").show();
			}
		};

		function _finish() {
			_set_navigation();

			$(document).keydown(function(e) {
				if (e.keyCode == 27) {
					$.fn.fancybox.close();
					$(document).unbind("keydown");

				} else if(e.keyCode == 37 && opts.itemCurrent != 0) {
					opts.itemCurrent--;
					_change_item();
					$(document).unbind("keydown");

				} else if(e.keyCode == 39 && opts.itemCurrent != (opts.itemArray.length - 1)) {
 					opts.itemCurrent++;
					_change_item();
					$(document).unbind("keydown");
				}
			});

			if (opts.centerOnScroll) {
				$(window).bind("resize scroll", $.fn.fancybox.scrollBox);
			} else {
				$("div#fancy_outer").css("position", "absolute");
			}

			if (opts.hideOnContentClick) {
				$("#fancy_wrap").click($.fn.fancybox.close);
			} else {
				$("#fancy_wrap").unbind();
			}

			$("#fancy_close").show();

			if (opts.itemArray[ opts.itemCurrent ].title !== undefined && opts.itemArray[ opts.itemCurrent ].title.length > 0) {
				$('#fancy_title div').html(opts.itemArray[ opts.itemCurrent ].title);
				$('#fancy_title').show();
			}

			if (opts.overlayShow && isIE) {
				$('#fancy_content').find('embed, object, select').css('visibility', 'visible');
			}

			busy = false;
		};

		return this.unbind('click').click(_initialize);
	};

	$.fn.fancybox.scrollBox = function() {
		var pos = $.fn.fancybox.getViewport();

		$("#fancy_outer").css('left', (($("#fancy_outer").width()	+ 36) > pos[0] ? pos[2] : pos[2] + Math.round((pos[0] - $("#fancy_outer").width()	- 36)	/ 2)));
		$("#fancy_outer").css('top',  (($("#fancy_outer").height()	+ 50) > pos[1] ? pos[3] : pos[3] + Math.round((pos[1] - $("#fancy_outer").height()	- 50)	/ 2)));
	};

	$.fn.fancybox.getNumeric = function(el, prop) {
		return parseInt($.curCSS(el.jquery?el[0]:el,prop,true))||0;
	};

	$.fn.fancybox.getPosition = function(el) {
		var pos = el.offset();

		pos.top	+= $.fn.fancybox.getNumeric(el, 'paddingTop');
		pos.top	+= $.fn.fancybox.getNumeric(el, 'borderTopWidth');

		pos.left += $.fn.fancybox.getNumeric(el, 'paddingLeft');
		pos.left += $.fn.fancybox.getNumeric(el, 'borderLeftWidth');

		return pos;
	};

	$.fn.fancybox.showIframe = function() {
		$(".fancy_loading").hide();
		$("#fancy_frame").show();
	};

	$.fn.fancybox.getViewport = function() {
		return [$(window).width(), $(window).height(), $(document).scrollLeft(), $(document).scrollTop() ];
	};

	$.fn.fancybox.animateLoading = function() {
		if (!$("#fancy_loading").is(':visible')){
			clearInterval(loadingTimer);
			return;
		}

		$("#fancy_loading > div").css('top', (loadingFrame * -40) + 'px');

		loadingFrame = (loadingFrame + 1) % 12;
	};

	$.fn.fancybox.showLoading = function() {
		clearInterval(loadingTimer);

		var pos = $.fn.fancybox.getViewport();

		$("#fancy_loading").css({'left': ((pos[0] - 40) / 2 + pos[2]), 'top': ((pos[1] - 40) / 2 + pos[3])}).show();
		$("#fancy_loading").bind('click', $.fn.fancybox.close);

		loadingTimer = setInterval($.fn.fancybox.animateLoading, 66);
	};

	$.fn.fancybox.close = function() {
		$(imagePreloader).unbind();

		$("#fancy_close, .fancy_loading, #fancy_left, #fancy_right, #fancy_title").hide();

		__cleanup = function() {
			$("#fancy_overlay, #fancy_outer").hide();

			if (isIE) {
				$('embed, object, select').css('visibility', 'visible');
			}
			
			if ($.isFunction(opts.callbackOnClose)) {
				opts.callbackOnClose();
			}
			
			busy = false;
		};

		if ($("#fancy_outer").is(":visible") !== false) {
			busy = true;

			if (opts.zoomSpeedOut > 0 && opts.itemArray[opts.itemCurrent].orig !== undefined) {
				var orig_item	= opts.itemArray[opts.itemCurrent].orig;
				var orig_pos	= $.fn.fancybox.getPosition(orig_item);

				var itemOpts = {
					'left':		(orig_pos.left - 18) + 'px',
					'top': 		(orig_pos.top  - 18) + 'px',
					'width':	$(orig_item).width(),
					'height':	$(orig_item).height()
				};

				if (opts.zoomOpacity) {
					itemOpts.opacity = 'hide';
				}

				$("#fancy_outer").animate(itemOpts, opts.zoomSpeedOut, opts.easingOut, __cleanup);

			} else {
				$("#fancy_outer").stop().fadeOut("fast", __cleanup);
			}

		} else {
			__cleanup();
		}

		return false;
	};

	$.fn.fancybox.build = function() {
		var html = '';

		html += '<div id="fancy_overlay"></div>';

		html += '<div id="fancy_wrap">';

		html += '<div class="fancy_loading" id="fancy_loading"><div></div></div>';

		html += '<div id="fancy_outer">';

		html += '<div id="fancy_inner">';

		html += '<div id="fancy_close"></div>';

		html +=  '<div id="fancy_bg"><div class="fancy_bg fancy_bg_n"></div><div class="fancy_bg fancy_bg_ne"></div><div class="fancy_bg fancy_bg_e"></div><div class="fancy_bg fancy_bg_se"></div><div class="fancy_bg fancy_bg_s"></div><div class="fancy_bg fancy_bg_sw"></div><div class="fancy_bg fancy_bg_w"></div><div class="fancy_bg fancy_bg_nw"></div></div>';

		html +=  '<a href="javascript:;" id="fancy_left"><span class="fancy_ico" id="fancy_left_ico"></span></a><a href="javascript:;" id="fancy_right"><span class="fancy_ico" id="fancy_right_ico"></span></a>';

		html += '<div id="fancy_content"></div>';

		html +=  '<div id="fancy_title"></div>';

		html += '</div>';

		html += '</div>';

		html += '</div>';

		$(html).appendTo("body");

		$('<table cellspacing="0" cellpadding="0" border="0"><tr><td class="fancy_title" id="fancy_title_left"></td><td class="fancy_title" id="fancy_title_main"><div></div></td><td class="fancy_title" id="fancy_title_right"></td></tr></table>').appendTo('#fancy_title');

		if (isIE) {
			$("#fancy_inner").prepend('<iframe class="fancy_bigIframe" scrolling="no" frameborder="0"></iframe>');
			$("#fancy_close, .fancy_bg, .fancy_title, .fancy_ico").fixPNG();
		}

		$("#fancy_overlay, #fancy_bigIframe, #fancy_loading, #fancy_close").bind("click", $.fn.fancybox.close);
	};

	$.fn.fancybox.defaults = {
		imageScale			:	true,
		zoomOpacity			:	false,
		zoomSpeedIn			:	0,
		zoomSpeedOut		:	0,
		zoomSpeedChange		:	300,
		easingIn			:	'swing',
		easingOut			:	'swing',
		easingChange		:	'swing',
		frameWidth			:	425,
		frameHeight			:	355,
		overlayShow			:	true,
		overlayOpacity		:	0.3,
		hideOnContentClick	:	true,
		centerOnScroll		:	true,
		itemArray			:	[],
		callbackOnStart		:	null,
		callbackOnClose		:	null
	};

	$(document).ready(function() {
		$.fn.fancybox.build();
	});

})(jQuery);