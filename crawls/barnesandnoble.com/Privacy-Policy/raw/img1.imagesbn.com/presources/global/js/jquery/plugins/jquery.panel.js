/**
 * @file
 * @author              Filipe Araujo
 * @version             1.0
 */

(function($) {
	var

		plugin = 'panel',
		pluginApi = 'panel',
		timer,
		pluginFunc = function(el, options) {

			var pane = el.children('[data-bn-fn="wgt-pane"]'),

			close = function(e){
				clearTimeout(timer);
				if(options.animate){
					e.data.el.children('[data-bn-fn="wgt-pane"]').hide('fast');
				}
				el.removeClass('active');
			},

			leave = function(){
				el.trigger('close.bn.widgets.panel');
			},

			enter = function(){
				timer = setTimeout(function(){
					el.trigger('open.bn.widgets.panel');
				}, options.delay*1000);
			},

			open = function(e){
				if(options.animate){
					e.data.el.children('[data-bn-fn="wgt-pane"]').show("medium");
				}
				e.data.el.toggleClass('active', true);
			};

			el.hover(enter, leave)
				.bind('open.bn.widgets.panel', {el:el}, open)
				.bind('close.bn.widgets.panel', {el:el}, close);

			return {
				close : close,
				open : open
			};
		};

	$.options = $.options || {};

	$.options[plugin] = {
		version: '0.1',

		defaults: {
			api: true,
			delay : 0,
			animate : false
		}
	};

	$.fn[pluginApi] = function(options) {

		var api = $(this).data(plugin);

		/* depreciate this - jquery 1.2.5 fix */
		if (api && $().jquery !== "1.2.5") {
			return api;
		}

		options = $.extend({}, $.options[plugin].defaults, options || {});


		this.each(function() {
			$(this).data(plugin, api = new pluginFunc($(this), options));
		});

		return options.api ? api : this;
	};
})(jQuery);

$(function(){
	$('#nav-global [data-bn-fn="wgt-panel"]').panel( {
		delay : .2
	});
	$('#global-header-usernav [data-bn-fn="wgt-panel"]').panel();
});