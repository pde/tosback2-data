(function ($) {

	var
	$nav,
	$subnav,
	c_expanded = 'nav-expanded',
	c_init = 'nav-init',
	c_open = 'nav-open',
	c_hover = 'active',

	init = function() {

		$nav = $('#bn-nav-global-trigger');
		$subnav = $nav.find('#bn-nav-global');

		events();

		$nav.addClass(c_init);

		// Trigger the `nav.init` event.
		$(window).trigger('nav.init');

	},

	events = function () {

		var duration = 250;

		$subnav.find('.nav').hoverIntent(function() {
			var $item = $(this);

			$item.addClass(c_hover);

			$item.find('.nav-panel').css({
				 display: 'block'
			 });
		},function() {
			var $item = $(this);
			$item.removeClass(c_hover);

			$item.find('.nav-panel').css({ display: 'none' });

		});

		// Check if nav is in expanded mode.
		if ($nav.hasClass(c_expanded)) {
			// If in expanded mode, do not bind the top-level events.
			return;
		}

		$nav.click(function(e) {
			open();
		}).hoverIntent(function() {
			open();
		}, function() {
			close();
		});
	},

	close = function() {
		$nav.removeClass(c_open);
		$subnav.css({ display: 'none' });
		// Trigger the `nav.close` event.
		$(window).trigger('nav.close');
	},

	open = function() {
		$nav.addClass(c_open);
		$subnav.css({
			 display: 'block'
		 });
		// Trigger the `nav.open` event.
		$(window).trigger('nav.open');
	},

	toggle = function() {
		if ($nav.hasClass(c_open)) {
			return close();
		}
		open();
	};


	$(function() {
		init();
	});

	return {};

}(jQuery));

