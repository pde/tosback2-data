if (typeof OverlayWidget == "undefined") {
	var OverlayWidget = Base.extend({
		constructor: null,

		create: function(selector, settings) {
			$(selector).widgetState(settings).widgetClass(OverlayWidget);
		},

		/* Uncomment this if you are going to implement the restore from state mechanism for this widget */
		/* restoreState: function(state, selector) {}, */
		getWidgetClassName: function() {
			return "OverlayWidget";
		},

		lazyload: function(selector, event) {
			var jQ = $(selector);
			var s = jQ.widgetState();
			this.createBackground(selector);
			this.createOverlay(selector);
			this.assignEvents(selector);
		},

		assignEvents: function(selector) {
			var jQ = $(selector);
			var s = jQ.widgetState();
			var self = this;
			var bg = $(s.bg);
			var ov = $(s.ov);
			/* Bind all events */
			$(".close", ov).hover(
					function() {
						$(this).addClass("close-mouseover");
					},
					function() {
						$(this).removeClass("close-mouseover");
						$(".quicklook-button", this).hide();
					}
			);
			$(".close", ov).click(function(e) {
				self.hide(selector);
			});
			if (s.closeOnBackgroundClick) {
				bg.click( function(e) {
					if(e.target == bg.get(0)) {
						self.hide(selector);
					}							
				});
			}

		},

		createBackground: function(selector) {
			/* Open the 'full screen' div to catch clicks/add opacity/support dragging */
			var jQ=$(selector);
			var s = jQ.widgetState();
			var x = s.cssSelector;
			if (s.captureClicks) $("body").append('<div class="OverlayScreen ' + $(selector).widgetId() + '-screen"><!-- --></div>');

			if (x) {
				if (x.charAt(0) == "#") {
					$("body").append('<div id="' + x.substring(1,x.length) + '"><div class="OverlayBackground ' + $(selector).widgetId() + '-bg"><!-- --></div></div>');
				} else {
					$("body").append('<div class="' + s.cssSelector + '"><div class="OverlayBackground ' + $(selector).widgetId() + '-bg"><!-- --></div></div>');
				}
			} else {
				$("body").append('<div class="' + $(selector).widgetId() + '-bg"><!-- --></div>');
			}
			s.bg = "." + $(selector).widgetId() + "-bg";
			s.screen = ".OverlayScreen";
			if (s.captureClicks) {
				$(s.screen).css("opacity", "0.0").add(s.bg).css("width", document.body.clientWidth).css("height", $(document).height());
			} else {
				$(s.bg).css("width", 0).css("height", 0);
			}
		},

		createOverlay: function(selector) {
			var jQ = $(selector);
			var s = jQ.widgetState();
			/* Open the content div 'above' the page and at the correct coordinates */
			$(s.bg).append('<div class="Overlay"><iframe src="about:blank" scrolling="no" frameborder="0" width="100%"></iframe><div class="handle"><div class="close"></div></div><div class="overlay-body"></div><div class="overlay-loading"><!-- --></div></div>');
			s.ov = s.bg + " .Overlay";
			s.ovbody = s.bg + " .Overlay .overlay-body";
			s.ovloading = s.bg + " .overlay-loading";
			var ov = $(s.ov);
			ov.css("position", "absolute");

			var options = {};
			// Safari has an issue with select dropdown boxes inside of draggable areas, so we need to explicitly
			// disable dragging on the body of the overlay in Safari only 
			if($.browser.safari) {
				$.extend(options, { cancel:'.overlay-body'});
			}
			if (s.dragByBody) {
				ov.draggable(options);
			}
			if (s.dragByHandle) {
				$.extend(options, { handle:'.handle'});
				ov.draggable(options);
			}
		},

		getBody: function(selector, source) {
			var s = $(selector).widgetState();
			var b = $(s.ovbody);
			if (source.sourceURL) {
				/* Loading a path, but using a widget's state */
				b.widgetAjax(selector, "path:" + source.sourceURL, null, null, null, function() {
					$(s.ovloading).hide();
					var ov =$(s.ov);
					$("iframe", ov).attr("height",ov.height() + "px");
				});
			} else if (source.sourceSelector) {
				b.html("").append($(source.sourceSelector).html());
			}
		},

		hideAll: function() {
			$(".Overlay-stub").each(function(){
				OverlayWidget.hide(this);
			});	
		},

		hide: function(selector) {
			var jQ = $(selector);
			var s = jQ.widgetState();
			if (jQ[0].inProgress) return;
			if (!s.ov) return;
			var ov = $(s.ov);
			if (s.effectOnHide) {
				$(s.ov)
				.hide(s.effectOnHide, {}, s.effectOnHideSpeed, function() {$(s.bg).hide();$(s.screen).hide();});
				$(s.ovbody).empty();
			} else {
				$(s.ov).hide();
				$(s.ovbody).empty();
				$(s.bg).hide();
				$(s.screen).hide();
			}
		},

		setShowEffect: function(selector, effect, options, speed) {
			var s = $(selector).widgetState();
			s.effectOnShow = effect;
			s.effectOnShowOptions = options;
			s.effectOnShowSpeed = speed;
		},

		setHideEffect: function(selector, effect, options, speed) {
			var s = $(selector).widgetState();
			s.effectOnHide = effect;
			s.effectOnHideOptions = options;
			s.effectOnHideSpeed = speed;
		},

		show: function(selector, event, source, x, y) {
			var jQ = $(selector);
			var s = jQ.widgetState();
			if (jQ[0].inProgress) return;
			jQ[0].inProgress = true;
			if (!s.created) {
				this.lazyload(selector, event);
				s.created = true;
			}

			$(s.bg).show();
			$(s.screen).show();
			$("iframe", ov).show();
			var ov = $(s.ov);
			var ovl = $(s.ovloading);
			ov.show();
			ovl.show();
			this.getBody(selector, source);

			if (!x) {
				/* Calculate the middle of the viewable area */
				x = document.body.parentNode.clientWidth / 2;
			}
			if (!y) {
				y = document.body.parentNode.clientHeight /2;
			}

			var ovx = x - (ov.width() / 2);
			var ovy = y - (ov.height() / 2);


			if (!s.allowOffScreenOverlay) {
				/* Ensure that the overlay renders onscreen */
				var st = $(window).scrollTop();
				var sl = $(window).scrollLeft();
				if (ovx < sl) {
					ovx = s.onScreenPadding + sl;
				} else if (ovx + ov.width() > $(window).width()) {
					ovx = $(window).width() - ov.width() - s.onScreenPadding + sl;
				}

				if (ovy < st) {
					ovy = s.onScreenPadding + st;
				} else if (ovy + ov.height() > ($(window).height() + st)) {
					ovy = $(window).height() - ov.height() - s.onScreenPadding + st;
				}
			}
			ov.css("top", ovy + "px").css("left", ovx + "px");
			if (s.effectOnShow) {
				ov.show(s.effectOnShow, {}, s.effectOnShowSpeed, function() {
					jQ[0].inProgress = false;
					if (source.sourceSelector) {
						ovl.hide();
					}
				});
			} else {
				ov.show();
				jQ[0].inProgress = false;
				ovl.hide();
			}
		}
	});
}