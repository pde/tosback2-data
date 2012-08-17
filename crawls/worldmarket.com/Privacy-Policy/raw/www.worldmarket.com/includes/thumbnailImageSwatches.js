/**
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/
/**
 * Script to support Thumbnail Swatches
 */

window.MarketLive = window.MarketLive || {};
window.MarketLive.ThumbnailSwatches = window.MarketLive.ThumbnailSwatches || {};

(function($, ns) {
	ns.createTooltip2 = function (elem, tooltip, nearElem) {
		if (!nearElem) nearElem = elem;
		tooltip.hide();
		// add arrow to tooltip window for IE6-IE7
		if ($.browser.msie && /msie [67]\./i.test(navigator.userAgent))
		  tooltip.append('<div class="thumbSwatchTooltipPointerDown"><div class="thumbSwatchTooltipPointerDownInner"></div></div>');
		// add event to element to show/hide tooltip
		$(elem).unbind('mouseenter.tooltip').bind('mouseenter.tooltip', function(){
			// set tooltip location
			var offset = $(elem).position();
			var posLeft = offset.left;
			var posTop = offset.top - tooltip.innerHeight() - 10;
			tooltip.css("position","absolute");
			tooltip.css("left", posLeft + 20);
			tooltip.css("top", posTop);

			$.browser.msie && /msie 6\.0/i.test(navigator.userAgent) && tooltip.bgiframe && tooltip.bgiframe();
			// show window
			tooltip.show();
		}).unbind('mouseleave.tooltip').bind('mouseleave.tooltip', function(){
			// hide window
			tooltip.hide();
		}).click(function(evt){
			evt.preventDefault();
		});
		return tooltip;
	};

	ns.addThumbnailSwatchBehaviors = function (context) {

		$('.thumbSwatchMaxSwatches .swatchUnSelected, .thumbSwatchMaxSwatches .swatchSelected, .thumbSwatchMaxSwatches .swatchHover, .thumbSwatchTooltip .swatchUnSelected, .thumbSwatchTooltip .swatchSelected, .thumbSwatchTooltip .swatchHover', context).each(function(){
			var src = $(this).attr('src'), alt = $(this).attr('alt'), href = $(this).closest('a').attr('href'), parent = $(this).parents().has('.thumbcontainer').first(), img = parent.find('.thumbcontainer img').first();
			var allSwatches = parent.find('.swatchUnSelected, .swatchSelected, .swatchHover');
			var swatch = allSwatches.filter(function(){return ($(this).attr('src') ==  src) && ($(this).attr('alt') ==  alt) && ($(this).closest('a').attr('href') == href);});

			// event handlers for swatches
			swatch.unbind('mouseenter.sw').bind('mouseenter.sw', function(){
				var previewDisabled = swatch[0].getAttribute( "data-previewDisabled");
				if (previewDisabled != 'true') {
					img.data('lastSrc', img.attr('src'));
					img.attr('src', href);
				}
				if (!swatch.hasClass('swatchSelected')) {
					swatch.removeClass('swatchUnSelected swatchSelected swatchHover').addClass('swatchHover');
				}
			}).unbind('mouseleave.sw').bind('mouseleave.sw', function(){
				var previewDisabled = swatch[0].getAttribute( "data-previewDisabled");
				if (previewDisabled != 'true') {
					if (img.data('lastSrc')) {
						img.attr('src', img.data('lastSrc'));
						img.removeData('lastSrc');
					}
				}
				if (!swatch.hasClass('swatchSelected')) {
					swatch.removeClass('swatchUnSelected swatchSelected swatchHover').addClass('swatchUnSelected');
				}
			}).unbind('click.sw').bind('click.sw', function(evt){
				evt.preventDefault();
				img.removeData('lastSrc');
				img.attr('src', href);
				if (!swatch.hasClass('swatchSelected')) {
					allSwatches.removeClass('swatchSelected').addClass('swatchUnSelected');
					swatch.removeClass('swatchUnSelected swatchSelected swatchHover').addClass('swatchSelected');
				}
			}).each(function(){
				if ($(this).hasClass('swatchSelected') && (href != img.attr('src'))) img.attr('src', href);
			});

			// preloading images when mouseenter
			parent.unbind('mouseenter.sw3').bind('mouseenter.sw3', function(){
				if (!$(this).data('loaded')) {
					var imgs = $(this).find('.swatchUnSelected, .swatchSelected, .swatchHover'), hidden = null;
					if ($('div.thumbSwatchPreloader').length > 0) {
						hidden = $('div.thumbSwatchPreloader');
					} else {
						hidden = $('<div class="thumbSwatchPreloader" style="display:none"/>');
						$('body').append(hidden);
					}
					imgs.each(function(){
						var url = $(this).closest('a').attr('href');
						if (url) {
							$('<img/>', {'src': url}).appendTo(hidden);
						}
					});
					$(this).data('loaded', 'true');
				}
			});
		});

		// create tooltips for "view all" links
		$('.thumbSwatchViewAll a').each(function(){
			var elem = $(this), tooltip = elem.parents().has('.thumbSwatchTooltip').first().find('.thumbSwatchTooltip');
			ns.createTooltip2(elem, tooltip, elem.parent());
		});
	};

	$(document).ready(function() {

		if (!$(window).data('swatches')) {
			$(window).data('swatches', 'true');
		} else return;

		ns.addThumbnailSwatchBehaviors(document);

	});

})(jQuery, window.MarketLive.ThumbnailSwatches);
