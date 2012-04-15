/* $(.rMenu).rickyMenu()
 * $(.rMenu).rickyMenu({align:"right", open:"hover", padding: "5px 20px", borderWidth: 5, borderColor: "#505050", right: "-25" })
 * $(.rMenu).rickyMenu("close")
 */

(function ($) {
	var defaultOptions = {
		align: "left", // left, right
		open: "click", // click, hover
		left: null,
		right: null,
		labelShadow: true,
		openerBubble: true,
		contentsBubble: true,
		openerBorderWidth: 1,
		openerPaddingTop: 10,
		openerPaddingRight: 10,
		openerPaddingBottom: 10,
		openerPaddingLeft: 14,
		contentsBorderWidth: 1,
		borderColor: "#96BBE3",
		radius: 4
	};
	
	$.fn.rickyMenu = function (options) {
		if (options === "close") {
			if (this.length > 0) {
				hideMenu(null, this);
			}
			else {
				hideAllMenus();
			}
			return;
		}
		
		var opts = $.extend({}, defaultOptions, options);
		
		if (opts.bubble != null) {
			opts.openerBubble = opts.contentsBubble = opts.bubble;
		}
		
		if (opts.padding) {
			var arrPadding = opts.padding.split(" ");
			if (arrPadding.length > 0) {
				if (arrPadding.length === 1) {
					arrPadding[1] = arrPadding[2] = arrPadding[3] = arrPadding[0];
				}
				else if (arrPadding.length === 2) {
					arrPadding[2] = arrPadding[0];
					arrPadding[3] = arrPadding[1];
				}
				else if (arrPadding.length === 3) {
					arrPadding[3] = arrPadding[1];
				}
				opts.openerPaddingTop = parseInt(arrPadding[0]) || 0;
				opts.openerPaddingRight = parseInt(arrPadding[1]) || 0;
				opts.openerPaddingBottom = parseInt(arrPadding[2]) || 0;
				opts.openerPaddingLeft = parseInt(arrPadding[3]) || 0;
			}
		}
		
		if (opts.borderWidth) {
			opts.openerBorderWidth = opts.contentsBorderWidth = parseInt(opts.borderWidth) || 0;
		}
		
		if (!opts.openerBubble) {
			opts.openerBorderWidth = opts.openerPaddingTop = opts.openerPaddingRight = opts.openerPaddingBottom = opts.openerPaddingLeft = 0;
		}
		
		if (!opts.contentsBubble) {
			opts.contentsBorderWidth = 0;
		}
		
		if (opts.labelShadow) {
			this.prepend('<div class="rLabelShadow"/>');
		}
		
		if (opts.left) opts.left = parseInt(opts.left) || 0;
		if (opts.right) opts.right = parseInt(opts.right) || 0;
		
		if (opts.open === "click") {
			this.addClass("rClickMenu").children(".rMenuOpener").mousedown(toggleMenu);
		}
		else if (opts.open === "hover") {
			this.bind("mouseenter.rickyMouseenter", showMenu).bind("mouseleave.rickyMouseleave", hideMenu);
		}
		
		this.data("opts", opts);
	};
	
	function toggleMenu(e) {
		var $menu = $(e.target).closest(".rClickMenu");

		if ($menu.hasClass("rActiveMenu")) {
			hideMenu(e, $menu);
		}
		else {
			if ($menu.length === 1) {
				showMenu(e, $menu);
			}
		}
	}
	
	function showMenu(e, $menu) {
		if (!$menu) $menu = $(this);
		// Check the inactive class
		if ($menu.length > 0 && !$menu.hasClass("inactive")) {
			opts = $menu.data("opts");
			applyCss($menu, opts);
				
			if (opts.open === "click") {
				$(document).bind("mousedown.rickyBlur", blurFn);
			}
			
			if (opts.onOpen) opts.onOpen($menu);
		}
	}
	
	function hideMenu(e, $menu) {
		if (!$menu) $menu = $(this);
		if ($menu.length > 0 && $menu.hasClass("rActiveMenu")) {
			var opts = $menu.data("opts");
			if (opts.open === "click" && $(".rActiveMenu.rClickMenu").length === 1) {
				$(document).unbind("mousedown.rickyBlur");
			}
			if (opts.onBeforeClose) opts.onBeforeClose($menu);
			$menu.removeClass("rActiveMenu");
			removeCss($menu, opts);
			
			if (opts.onClose) opts.onClose($menu);
		}
	}
	
	function hideAllMenus() {
		$(".rActiveMenu").each(function() {
			var $this = $(this);
			hideMenu(null, $this);
		});
	}
	
	function blurFn(e) {
		var $clickMenus = $(".rActiveMenu.rClickMenu");
		var $closeClickMenus = (e.target == document ? $clickMenus : $clickMenus.filter(function(){return $(this).has(e.target).length === 0}));
		
		$closeClickMenus.each(function() {
			hideMenu(e, $(this));
		});
	}
	
	function applyCss($menu, opts) {
		var $menuOpener = $menu.children(".rMenuOpener").first();
		var $menuContents = $menu.children(".rMenuContents").first();
		var $labelShadow = $menu.children(".rLabelShadow").first();
		
		if (opts.align === "right") $menuContents.addClass("rRightMenuContents");
		
		var menuPaddingTop = (parseInt($menu.css("paddingTop")) || 0);
		var menuPaddingRight = (parseInt($menu.css("paddingRight")) || 0);
		var menuPaddingLeft = (parseInt($menu.css("paddingLeft")) || 0);
		var menuOpenerWidth = $menuOpener.width();
		var menuOpenerHeight = $menuOpener.height();
		var menuOpenerBorderTop = (parseInt($menuOpener.css("borderTopWidth")) || 0);
		var menuOpenerBorderRight = (parseInt($menuOpener.css("borderRightWidth")) || 0);
		var menuOpenerBorderBottom = (parseInt($menuOpener.css("borderBottomWidth")) || 0);
		var menuOpenerBorderLeft = (parseInt($menuOpener.css("borderLeftWidth")) || 0);
		var menuOpenerPaddingTop = (parseInt($menuOpener.css("paddingTop")) || 0);
		var menuOpenerPaddingRight = (parseInt($menuOpener.css("paddingRight")) || 0);
		var menuOpenerPaddingBottom = (parseInt($menuOpener.css("paddingBottom")) || 0);
		var menuOpenerPaddingLeft = (parseInt($menuOpener.css("paddingLeft")) || 0);
		var menuContentsWidth = $menuContents.width();
		var menuContentsInnerWidth = $menuContents.innerWidth();
		var menuContentsPaddingHorizontal = menuContentsInnerWidth - menuContentsWidth;
		
		// set display but remove visibility in order to get position-related css
		$menuContents.css({visibility:"hidden"}).show();
		var menuContentsLeft = (opts.left || parseInt($menuContents.css("left")) || 0);
		var menuContentsRight = (opts.right || parseInt($menuContents.css("right")) || 0);
		$menuContents.css({visibility:"visible", display:""});
		
		var openerMarginTop = (-opts.openerPaddingTop - opts.openerBorderWidth + menuOpenerBorderTop + menuOpenerPaddingTop);
		var openerMarginCss = openerMarginTop + "px " +
							(-opts.openerPaddingRight - opts.openerBorderWidth + menuOpenerBorderRight + menuOpenerPaddingRight) + "px " +
							(-opts.openerPaddingBottom + menuOpenerBorderBottom + menuOpenerPaddingBottom) + "px " +
							(-opts.openerPaddingLeft - opts.openerBorderWidth + menuOpenerBorderLeft + menuOpenerPaddingLeft) + "px";

		var openerCss = {
			margin: openerMarginCss,
			padding: opts.openerPaddingTop + "px " + opts.openerPaddingRight + "px " + opts.openerPaddingBottom + "px " + opts.openerPaddingLeft + "px",
			borderWidth: opts.openerBorderWidth + "px",
			borderStyle: "solid",
			borderColor: opts.borderColor,
			borderBottomWidth: 0
		};
		
		// IE7 seems to have issues with negative margins, using top css to compensate
		if ($.browser.msie && $.browser.version == "7.0") {
			openerCss.top = openerMarginTop + "px";
		}
		
		var labelCss = {
			margin: openerMarginCss,
			width: menuOpenerWidth + opts.openerPaddingLeft + opts.openerPaddingRight + (2 * opts.openerBorderWidth) + "px",
			height: menuOpenerHeight + opts.openerPaddingTop + opts.openerPaddingBottom + "px"
		}
		
		var contentsCss = {
			top: menuOpenerHeight + menuPaddingTop + "px",
			width: Math.max(menuOpenerWidth + opts.openerPaddingLeft + opts.openerPaddingRight - menuContentsPaddingHorizontal, menuContentsWidth) + "px",
			marginTop: opts.openerPaddingBottom - opts.contentsBorderWidth + menuOpenerBorderTop + menuOpenerPaddingTop + "px",
			borderWidth: opts.contentsBorderWidth + "px",
			borderStyle: "solid",
			borderColor: opts.borderColor
		};
		
		if (opts.align === "right") {
			contentsCss.marginRight = -opts.openerPaddingRight - opts.openerBorderWidth + menuOpenerBorderRight + menuOpenerPaddingRight + "px";
			contentsCss.right = menuPaddingRight + menuContentsRight + "px";
			
			var topleft = Math.max(0, Math.min(menuContentsInnerWidth - menuOpenerWidth - opts.openerPaddingLeft - opts.openerPaddingRight, defaultOptions.radius));
			
			contentsCss.webkitBorderTopLeftRadius = topleft;
			contentsCss.MozBorderRadiusTopleft = topleft;
			contentsCss.borderTopLeftRadius = topleft;
			
			if (menuContentsRight < 0) {
				var topRight = Math.min(defaultOptions.radius, Math.abs(menuContentsRight));
				contentsCss.webkitBorderTopRightRadius = topRight;
				contentsCss.MozBorderRadiusTopright = topRight;
				contentsCss.borderTopRightRadius = topRight;
			}
		}
		else {
			contentsCss.marginLeft = -opts.openerPaddingLeft - opts.openerBorderWidth + menuOpenerBorderLeft + menuOpenerPaddingLeft + "px";
			contentsCss.left = menuPaddingLeft + menuContentsLeft + "px";
			
			var topRight = Math.max(0, Math.min(menuContentsInnerWidth - menuOpenerWidth - opts.openerPaddingLeft - opts.openerPaddingRight, defaultOptions.radius));
			
			contentsCss.webkitBorderTopRightRadius = topRight;
			contentsCss.MozBorderRadiusTopright = topRight;
			contentsCss.borderTopRightRadius = topRight;
			
			if (menuContentsLeft < 0) {
				var topleft = Math.min(defaultOptions.radius, Math.abs(menuContentsLeft));
				contentsCss.webkitBorderTopLeftRadius = topleft;
				contentsCss.MozBorderRadiusTopleft = topleft;
				contentsCss.borderTopLeftRadius = topleft;
			}
		}
		
		if (opts.labelShadow) saveCss($labelShadow, labelCss);
		saveCss($menuOpener, openerCss);
		saveCss($menuContents, contentsCss);
		
		if (opts.labelShadow) $labelShadow.css(labelCss);
		$menuOpener.css(openerCss);
		$menuContents.css(contentsCss);
		
		
		$menu.addClass("rActiveMenu");
	}
	
	function removeCss($menu, opts) {
		if (opts.labelShadow) restoreCss($menu.children(".rLabelShadow").first());
		restoreCss($menu.children(".rMenuOpener").first());
		restoreCss($menu.children(".rMenuContents").first());
	}
	
	function saveCss($node, newCss) {
		var oldCss = {};
		for (var i in newCss) {
			oldCss[i] = $node[0].style[i];
		}
		$node.data("oldCss", oldCss);
	}
	
	function restoreCss($node) {
		var oldCss = $node.data("oldCss");
		if (oldCss) $node.css(oldCss);
		$node.removeData("oldCss");
	}
})(jQuery);