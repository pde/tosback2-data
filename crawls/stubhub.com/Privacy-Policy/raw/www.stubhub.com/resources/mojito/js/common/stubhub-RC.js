//Generic
;(function($){
	$.stubhub =  {
		ajaxErrorPage:'/errorAjax.html?xhr=1',
		ajaxTimout:180000,
		livequeryTimout:5000,
		pauseLivequeries:function(timeout){
			window.setTimeout($.livequery.pause, timeout || $.stubhub.livequeryTimout);
		},
		playThenPauseLivequeries:function(timeout){
			$.livequery.play();
			$.stubhub.pauseLivequeries(timeout);
		},
		enableThrobber:false,
		helpBubbleBaseUrl:'/help/services/popUp?nodeDesc=',
		enableDebug:false,
		debug:{startTime:null,logTime:null},
		debugLevel:'normal', /*'normal'|'verbose'*/
		enableCustomConsole:false,
		defaultValidation: {},
		IE6hackToForcePanelRedraw:function(timer) {
			if($.browser && $.browser.msie && $.browser.version == '6.0') {
				if(timer) {
					var hackTimer = window.setTimeout(function () {
						if(hackTimer) {
							window.clearTimeout(hackTimer);
						}
						$("body").removeClass('idontevenexist');
					}, timer);
				} else {
					$("body").removeClass('idontevenexist');
				}
			}
		},
		IEhackToForceRedraw:function(timer) {
			if($.browser && $.browser.msie) {
				window.setTimeout(function () {$("body").addClass('')},timer);
			}
		},
		setBusy:function(){$("body").addClass('cursorBusy');$("button").addClass('cursorBusy');$("a").addClass('cursorBusy');},
		resetBusy:function(){$("body").removeClass('cursorBusy');$("button").removeClass('cursorBusy');$("a").removeClass('cursorBusy');},
		userAgent:null
	};
	if ($.browser) {
		$.stubhub.userAgent = ($.browser.msie)? 'msie' : ($.browser.mozilla)? 'mozilla' : ($.browser.opera)? 'opera' : ($.browser.safari)? 'safari' : null;
	};
	$.stubhub.debug.startTime = $.stubhub.debug.logTime = new Date();

	$.stubhub.initDebug = function(enableDebug,enableCustomConsole) {
		if (enableDebug) $.stubhub.enableDebug=true;
		if (enableCustomConsole) $.stubhub.enableCustomConsole=true;
		if ($.stubhub.enableDebug) {
			/* add a custom debug console if there's no native support */
			if($.stubhub.enableCustomConsole && $.stubhub.enableDebug && !window.console){
				window.console={
					init:function(){
						if (!console.$el) {
							var elWidth=$(window).width()-10,
								elHeight=$(window).height()*0.2;
							console.$el = $('<div id="debugConsole"></div>')
								.css('height',elHeight+'px')
								.css('width',elWidth+'px');
							$(function() {
								$('body').css('padding-top',elHeight+'px');
								$('body').append(console.$el);
							});
						}
					},
					log:function(text, that){
						$(function() {
							if (!console.$el) console.init();
							text = text.replace(/ /g,'&#160;').replace(/</g,'&lt;');
							console.$el.append('<div>'+text+'</div>');
						});
					},
					count:function(text){/*no implementation*/}
				};
			};
			$(function() {$.stubhub.showDebug('DOM Ready!');});
			if ($.stubhub.debugLevel === 'verbose' && $.stubhub.enableDebug && window.console && $.browser.mozilla){
				/* output bind information in firebug console window */
				$.fn.bind = function (bind) {
					return function () {
						console.count("jQuery bind count");
						console.log("jQuery bind %o", this);
						return bind.apply(this, arguments);
					};
				}($.fn.bind);
			}
		}
	}

	/* provide a custom function to output debug messages to the console window */
	$.stubhub.showDebug = function(text, that) {
		if($.stubhub.enableDebug && window.console) {
			var curTime = new Date(),
				h = curTime.getHours(),
				m = curTime.getMinutes(),
				s = curTime.getSeconds(),
				ms = curTime.getMilliseconds(),
				runTime = ((curTime - $.stubhub.debug.startTime)/1000).toFixed(3),
				deltaTime = ((curTime - $.stubhub.debug.logTime)/1000).toFixed(3),
				logText;
			$.stubhub.debug.logTime = curTime;
			h = (h<10)?"0"+h:h;
			m = (m<10)?"0"+m:m;
			s = (s<10)?"0"+s:s;
			ms = (ms<10)?"00"+ms:(ms<100)?"0"+ms:ms;
			runTime = (runTime<10)?" "+runTime:runTime;
			deltaTime = (deltaTime<10)?" "+deltaTime:deltaTime;
			logText = h+':'+m+':'+s+'.'+ms+' '+runTime+' '+deltaTime+' - '+text;
			if (that) {
				window.console.log(logText, that);
			}else{
				window.console.log(logText);
			}
		};
	};

	$.fn.moveOffScreen = function() {
		return this.each(function() {
			$(this).addClass('offscreen');
		});
	};
	$.fn.moveOnScreen = function() {
		return this.each(function() {
			$(this).removeClass('offscreen');
		});
	};

	/* enhancement of the existing insertAfter() function: it returns the original if the selector does not exist, so you can keep chaining */
	$.fn.insertAfter2 = function(selector) {
		return this.each(function() {
			($(selector).length==0)? $(this) : $(this).insertAfter(selector) ;
		});
	};

	$.fn.charcounter = function(options) {
		var defaults = {
			textid:'eventinfocount',
    			max:5000
		};
		var opts = jQuery.extend(defaults,options);
		var id = "#"+$(this).attr("id");
		return this.each(function() {
			$(this).keyup(function(){
				$('#'+opts.textid).html(opts.max-$(this).val().length);
				// restrict the length of the string to the "max"
				if ($(this).val().length > opts.max) {
				   this.value = $(this).val().substr(0, opts.max);
				   $('#'+opts.textid).html(0)
				}

			});
		});
	};

	/*
	 * roundedCorners plugin
	 * version 1.1 (19-Aug-2009)
	 * #### PREFERRED ALTERNATIVE: please use panel plugin below if possible ####
	 *
	 * This plugin places some extra markup around elements that need to have rounded corners.
	 * It's up to external style definitions to actually style that extra markup.
	 * The styling options for this markup are limitted, thus it is preferred to use the panel plugin in stead.
	 * Css "margin" and "clear" styles are moved from the original wrapper element to the new outermost wrapper element
	 *
	 * Main options (first option shown is the default):
	 * wrapperClass:'' (a space-delimited string of class names to add the new outermost wrapper element)
	 * wrapperId:'' (a string to add as the value of the id attribute of the new outermost wrapper element)
	 * replaceBorder:true|false (flag whether to remove any border styles from the original wrapper element)
	 * overrideCSSRadius:true|false (flag whether to ignore any available CSS3 radius styles - mainly needed for shaded backgrounds)
	 *
	 * example usage: $(".tabBody").roundedCorners({wrapperClass:'rc-panel2 rc-panel2-trblbr',overrideCSSRadius:true});
	 */
	$.fn.roundedCorners = function (options) {
		var opts = $.extend({
			wrapperClass:'',
			wrapperId:'',
			replaceBorder: true,
			overrideCSSRadius: true
		}, options || {} );
		var allWrapperClass = 'rc-all',
			wrapperId = (opts.wrapperId!=='')? 'id="'+opts.wrapperId+'" ' :'';
		opts.wrapperClass = [opts.wrapperClass, allWrapperClass].join(' ');
		return this.each ( function () {
			$this = $(this);
			var CSSRadius = ''+$this.css('border-radius-topleft')+$this.css('border-radius-topright')+$this.css('border-radius-bottomleft')+$this.css('border-radius-bottomright')
			               +$this.css('-moz-border-radius-topleft')+$this.css('-moz-border-radius-topright')+$this.css('-moz-border-radius-bottomleft')+$this.css('-moz-border-radius-bottomright')
			               +$this.css('-o-border-radius-topleft')+$this.css('-o-border-radius-topright')+$this.css('-o-border-radius-bottomleft')+$this.css('-o-border-radius-bottomright')
			               +$this.css('-webkit-border-radius-topleft')+$this.css('-webkit-border-radius-topright')+$this.css('-webkit-border-radius-bottomleft')+$this.css('-webkit-border-radius-bottomright');
			var hasCSSRadius = (CSSRadius.match('px') && CSSRadius!='0px0px0px0px') ? true:false;
			if (!hasCSSRadius || opts.overrideCSSRadius) {
				// store margin and clear style of 'this' because we need to move those settings to the rc wrapper element;
				thisMargin = {
					top:$this.css('margin-top'),
					right:$this.css('margin-right'),
					bottom:$this.css('margin-bottom'),
					left:$this.css('margin-left')
				};
				thisMargin.all = thisMargin.top + ' ' + thisMargin.right + ' ' + thisMargin.bottom + ' ' + thisMargin.left;
				thisClear = $this.css('clear');
				// remove margin and clear style on 'this'
				$this.css('margin','0');
				$this.css('clear','none');
				// remove border settings;
				if(opts.replaceBorder) $this.css('border','none');
				// remove offscreenOnLoad class. if present;
				$this.removeClass('offscreenOnLoad');
				/* add styling markup */
				/* final html structure:
				//<div [id="opts.wrapperId"] class="rc-all [opts.wrapperClass]" style="margin:...;clear:...;border:...;">
				//	<div class="rc-tl"></div>
				//	<div class="rc-tr"></div>
				// 	<div class="rc-b">
				//		<div class="bd">
				//			<!-- panel content goes here -->
				//		</div>
				//	</div>
				//	<div class="rc-bl"></div>
				//	<div class="rc-br"></div>
				//</div>
				*/
				// add div elements that contain classes which need to be styled externally;
				$this.wrap('<div ' + wrapperId + 'class="' + opts.wrapperClass + '" style="margin:'+thisMargin.all+';clear:'+thisClear+';"></div>')
					.after('<div class="rc-br"></div>')
					.after('<div class="rc-bl"></div>')
					.before('<div class="rc-tl"></div>')
					.before('<div class="rc-tr"></div>')
					.wrap('<div class="rc-b"><div class="bd"></div></div>');
			}
		});
	};


	/*
	 * panel plugin
	 * version 0.4 (05-Nov-2009)
	 * version 0.5 (11-Nov-2009)
	 * version 0.6 (04-Dec-2009)
	 * history:
	 *  - 0.4: total rewrite to prevent events bound to elements in the panel from getting lost at panel creation.
	 *  - 0.5: adding deletion of script elements and corresponding disableScriptDelete option to prevent that.
	 *  - 0.6: adding option panelClassOnEmpty to allow panel to remain hidden if there's no content.
	 *
	 * This plugin places some extra markup around elements that need to have a panel with rounded corners and gradient
	 * backgrounds. The outermost wrapper elements are optional and only added if corresponding class names are provided.
	 * It's up to external style definitions to actually style that extra markup.
	 *
	 * Main options (first option shown is the default):
	 * panelId:null|string (a string to add as the value of the id attribute of the new outermost wrapper element)
	 * panelClass:null|string (a space-delimited string of class names to add to the new outermost wrapper element)
	 * panelClassOnEmpty:"p-offscreen"|string (the name of a class to add to the outermost wrapper element when there's no content)
	 * bgFullClass:null|string (a space-delimited string of class names to add to the optional "full" background element)
	 * bgBottomClass:null|string (a space-delimited string of class names to add to the optional "bottom" background element)
	 * bgTopClass:null|string (a space-delimited string of class names to add to the optional "top" background element)
	 * contentClass:null|string (a space-delimited string of class names to add to the content wrapper element)
	 * tlSliceClass:null|string (a space-delimited string of class names to add to the top left slice element)
	 * trSliceClass:null|string (a space-delimited string of class names to add to the top right slice element)
	 * blSliceClass:null|string (a space-delimited string of class names to add to the bottom left slice element)
	 * brSliceClass:null|string (a space-delimited string of class names to add to the bottom right slice element)
	 * classToRemove:"p-offscreenOnLoad"|string (the name of a class on the panel source to be removed by the plugin - typical use is a class that hides the panel content until it is styled)
	 * disableCssHack:false|true (indicator whether an optional css-hack class should be disabled - typical implementation for the css class is a IE7-specific css hack to prevent issues with expandable content inside the panel)
	 * disableScriptDelete:false|true (indicator whether the default deletion of script elements should be disabled)
	 *
	 * example usage: $("#fooPanel").panel({bgFullClass:'p-bg-grblu'});
	 */
	$.fn.panel = function (options) {
		if(!this.length) return this;
		var opts = $.extend({
				panelId:null,
				panelClass:null,
				panelClassOnEmpty:"p-offscreen",
				bgFullClass:null,
				bgBottomClass:null,
				bgTopClass:null,
				contentClass:null,
				tlSliceClass:null,
				trSliceClass:null,
				blSliceClass:null,
				brSliceClass:null,
				classToRemove:"p-offscreenOnLoad",
				disableCssHack:false,
				disableScriptDelete:false
			}, options || {} ),
			cssHackClass = (opts.disableCssHack)? '' : 'p-css-hack',
			panelClass = ['p-wrapper', cssHackClass, opts.panelClass].join(' '),
			tlSliceClass = ['p-slice p-slice-tl', opts.tlSliceClass].join(' '),
			trSliceClass = ['p-slice p-slice-tr', opts.trSliceClass].join(' '),
			blSliceClass = ['p-slice p-slice-bl', opts.blSliceClass].join(' '),
			brSliceClass = ['p-slice p-slice-br', opts.brSliceClass].join(' '),
			contentClass = ['p-content', opts.contentClass].join(' '),
			wrapperId = (opts.panelId)? 'id="'+opts.panelId+'" ' : '';

		return this.each ( function () {
			var $this = $(this),
				panelClassOnEmpty = ($this.children().length)? '' : opts.panelClassOnEmpty;
			panelClass = [panelClass,panelClassOnEmpty].join(' ');

			/* unless disabled, remove script elements from panel to prevent double execution by jQuery (in head no less) */
			if (!opts.disableScriptDelete) $this.find('script').remove();

			/* add panel markup */
			/* final html structure of panel:
			//<div [id="opts.panelId"] class="p-wrapper [opts.panelClass] [opts.panelClassOnEmpty]">
			//[<div class="p-bg-full opts.bgFullClass">]
			//[<div class="p-bg-bottom opts.bgBottomClass">]
			//[<div class="p-bg-top opts.bgTopClass">]
			// <div class="p-slice-wrapper">
			//	<div class="p-slice p-slice-tr [opts.trSliceClass]">
			//		<div class="p-slice p-slice-tl [opts.tlSliceClass]"></div>
			// 		<div class="p-content [opts.contentClass]">
			//			<!-- panel content goes here -->
			//		</div>
			// 	</div>
			//	<div class="p-slice p-slice-br [opts.brSliceClass]">
			//		<div class="p-slice p-slice-bl [opts.blSliceClass]"></div>
			//	</div>
			// </div>
			//[</div>]
			//[</div>]
			//[</div>]
			//</div>
			*/
			/* remove classToRemove, and add wrapper element, wrapper class, and id if requested */
			$this.removeClass(opts.classToRemove)
				.wrap('<div '+wrapperId+'class="'+panelClass+'"></div>');
			/* add optional background wrappers */
			if(opts.bgFullClass) $this.wrap('<div class="p-bg-full '+opts.bgFullClass+'"></div>');
			if(opts.bgBottomClass) $this.wrap('<div class="p-bg-bottom '+opts.bgBottomClass+'"></div>');
			if(opts.bgTopClass) $this.wrap('<div class="p-bg-top '+opts.bgTopClass+'"></div>');
			/* add slice markup */
			$this.wrap('<div class="p-slice-wrapper"></div>')
				.after('<div class="'+brSliceClass+'"><div class="'+blSliceClass+'"></div></div>')
				.wrap('<div class="'+trSliceClass+'"></div>')
				.before('<div class="'+tlSliceClass+'"></div>')
				.wrap('<div class="'+contentClass+'"></div>');
		});
	};


	/* "global" overlay stack, used by the overlay plugin */
	$.stubhub.overlayStack = {
		value: [],
		add: function(elem) {
			this.value.push(elem);
		},
		remove: function(elem) {
			var pos;
			for(var i = 0; i < this.value.length; ++i) {
				if(this.value[i] == elem) {
					pos = i;
				}
			}

			this.value.splice(pos, 1);
		},
		closeAll: function() {
			for(var i = 0; i < this.value.length; ++i) {
				if($(this.value[i]).data('isDialogOpened') && this.value[i].closeOverlay) {
					this.value[i].closeOverlay();
				}
			}
			this.value = [];
		}
	};

	/* bubbleOverlay plugin
	 * this is a shortcut to the overlay plugin with predefined settings and minimal configuration
	 */
	$.fn.bubbleOverlay = function(options) {
		var defaults = {
			source:null,
			width:250,
			trigger:'mouseover',
			offsetX:0,
			offsetY:0,
			preventClickDefault:true,
			exclusive:false
		};
		var opts = $.extend(defaults, options || {});
		return this.each(function() {
			$(this).overlay({
				style:'callout',
				source:opts.source,
				align:'relative',
				preferedPosition:'above',
				offsetX:opts.offsetX,
				offsetY:opts.offsetY,
				overlayClass:'ov-bubble',
				showCloseIcon:false,
				openDelay:150,
				closeDelay:500,
				forcedCloseDelay:null,
				modal:false,
				width:opts.width,
				trigger:opts.trigger,
				preventClickDefault:opts.preventClickDefault,
				exclusive:opts.exclusive,
                openCondition:opts.openCondition
			});
		});
	}

	/* bubblehelpOverlay plugin
	 * this is a shortcut to the overlay plugin with predefined settings and minimal configuration
	 */
	$.fn.bubblehelpOverlay = function(options) {
		var defaults = {
			width:250,
			trigger:'mouseover',
			offsetX:-5,
			offsetY:0,
			preventClickDefault:true,
			exclusive:false
		};
		var opts = $.extend(defaults, options || {});
		return this.each(function() {
			$(this).overlay({
				style:'callout',
				align:'relative',
				preferedPosition:'above',
				offsetX:opts.offsetX,
				offsetY:opts.offsetY,
				overlayClass:'ov-bubblehelp',
				showCloseIcon:false,
				openDelay:150,
				closeDelay:500,
				forcedCloseDelay:null,
				modal:false,
				width:opts.width,
				trigger:opts.trigger,
				preventClickDefault:opts.preventClickDefault,
				exclusive:opts.exclusive,
                openCondition:opts.openCondition
			});
		});
	}


	/* overlay plugin
	 * version 1.1 (08-Jun-2010)
	 * history:
	 *  - 0.10: adding focusFirstTabbable option
	 *          (issue: jQuery's dialog() by default focusses on the first tabbable element in the content, which is not desirable in case of scrollable content)
	 *          (solution: add dummy link element at top of content and remove it after overlay has been opened)
	 *  - 0.11: adding openCondition option
	 *          (enhancement: allow to specify conditions whether an overlay should be opened or not)
	 *  - 0.12: fix bubble position issue due to focusFirstTabbable option
	 *  - 0.13: adding implementation of openDelay option
	 *  - 0.14: added simplistic implementation of forcedCloseDelay option
	 *  - 1.0:  upping the version because it is used extensively
	 *  - 1.1:  adding option to close overlay when user clicks anywhere outside it, fixing compatibility issue with jquery 1.4.2, adding draggable option
	 *
	 * This plugin enables overlays using the standard jQuery dialog() function.
	 * It places some extra markup around the element that invokes it to support border graphics,
	 * and it provides extra functionality to position the overlay.
	 * It's up to external style definitions to actually style that extra markup.
	 *
	 * Known limitations:
	 * 1) any events that were bound to the overlay content prior to the overlay creation will get lost.
	 *
	 * Main options (first option shown is the default):
	 *   modal:false|true
	 *   align:'centered'|'relative' (general positioning on the page: either centered or aligned with the trigger element. May need to add 'fixed' later for alert-type overlays)
	 *   style:'box'|'callout' (style 'callout' will have extra markup for callout spike)
	 *   source:null|string (in case the link trigger is not an <a> element, the overlay source - either a URL or div id selector (#myId) - can be passed in)
	 *   preferedPosition:'below'|'above' (prefered position with respect to trigger element - is ignored if align:'centered')
	 *   preferedAlignment:'left'|'right' (prefered alignment with respect to trigger element - is ignored if align:'centered')
	 *   offsetX:0 (horizontal offset)
	 *   offsetY:0 (vertical offset)
	 *   showCloseIcon:true|false (enable dialog() close icon)
	 *   openDelay:null|integer (time in milliseconds to leave mouse over trigger link before overlay shows)
	 *   closeDelay:null|integer (time in milliseconds to leave overlay visible after mouse moves away)
	 *   forcedCloseDelay:null|integer (time in milliseconds to close overlay regardless of user mouse movements)
	 *   closeSelector:null|jQuery-selector-expression (jQuery selector string for elements in the overlay that should trigger a close)
	 *   overlayClass:'ov-overlay'  (string that will be passed on as parameter dialogClass to dialog())
	 *   overlayId:null|string (string that will be passed on as id attribute to the overlay wrapper element; this can be used as target id when an Ajax request updates the overlay content)
	 *   width:500  (overall width of the styled overlay)
	 *   trigger:'click'|'mouseover'|'load' (event that triggers the overlay display)
	 *   preventClickDefault:true|false (prevent default click event for triggers other than 'click')
	 *   bgiframe:true|false (implement bgiframe plugin for IE6 fixes)
	 *   open:null|function(elem,orientation,opts)  (function to run right after open of dialog; it accepts the trigger element, the overlay orientation and all options)
	 *   close:null|function(elem,opts)  (function to run right before close of dialog; it accepts the trigger element and all options)
	 *   cache:true|false (cache ajax responses)
	 *   exclusive:true|false (close other overlays if exist)
	 *   focusFirstTabbable:false|true (place focus on the first tabbable element in the content area)
	 *   openCondition:null|function(elem)  (function to run right before open of overlay to allow test of conditions whether it's ok to open the overlay; it accepts the trigger element and is required to return either true or false)
	 *   closeOnClickOutside:false|true (close overlay when user clicks outside it)
	 *   draggable:false|true (make overlay draggable)
	 *
	 * example usage: bind to link with internal source and open on event trigger:
	 *  <div id="overlayContent">overlay content</div>
	 *	<a id="foo" href="#overlayContent">open modal centered overlay</a>
	 *	$('#foo').overlay({modal:true});
	 * example usage: bind to link with external source and open on event trigger:
	 *	<a id="foo" href="/myService/myContent?id=xxx">open modal centered overlay</a>
	 *	$('#foo').overlay({modal:true});
	 * example usage: bind to div and open immediately:
	 *	<div id="foo">overlay content</div>
	 *  $('#foo').overlay({source:'#foo',trigger:'load'});
	 */

	$.fn.overlay = function(options) {
		var defaults = {
			modal:false,
			align:'centered',
			style:'box',
			source:null,
			preferedPosition:'below',
			preferedAlignment:'left',
			offsetX:0,
			offsetY:0,
			showCloseIcon:true,
			openDelay:null,
			closeDelay:null,
			forcedCloseDelay:null,
			closeSelector:null,
			overlayClass:'ov-overlay',
			overlayId:null,
			width:500,
			trigger:'click',
			preventClickDefault:true,
			bgiframe:true,
			open:null,
			close:null,
			cache:true,
			exclusive:true,
			focusFirstTabbable:false,
			openCondition:null,
			closeOnClickOutside:false,
			draggable:false
		};

		var opts = $.extend(defaults, options || {}),
			closeControlClass = 'ov-closeControl',
			noCloseControlClass = 'ov-noCloseControl',
			wrapperIdAttr = (opts.exclusive)? ' id="ov-wrapper-id"' : '',
			dummyFocusEl = (opts.focusFirstTabbable)? '' : '<a id="dummyFocusEl" href="#" style="position:absolute">&#160;</a>';

		/* set some fixed settings for jQuery dialog() */
		opts.autoOpen=true;
		opts.closeOnEscape=false;
		opts.resizable=false;
		opts.minHeight=10;
		opts.position=['center','center'];

		/* initialize context-specific settings for jQuery dialog() */
		if (opts.showCloseIcon) {
			opts.dialogClass = [opts.overlayClass, closeControlClass].join(' ');
		} else {
			opts.dialogClass = [opts.overlayClass, noCloseControlClass].join(' ');
		}

		var el;
		this.each(function() {
			el = new bindOverlay(this, opts);
		});
		return el;

		function bindOverlay(elem, opts) {
			var $elem=$(elem);

			$.extend(this, {
				close: function() {
					if(elem.closeOverlay){
						elem.closeOverlay();
					}
				}
			});
			if (opts.trigger==='load') {
				openOverlay(elem);
				return false;
			};
			elem.openOverlayAfterTimeout = function() {
				elem.ovTimeout = setTimeout(function(){
					openOverlay(elem);
				}, opts.openDelay);
			};
			$elem.bind(opts.trigger+'.initoverlay', function(e) {
				elem.openOverlayAfterTimeout();
				return false;
			});
			if (opts.openDelay) {
				$elem.bind('mouseleave.initoverlay',function(){
					clearTimeout(elem.ovTimeout)
				});
			}
			if (opts.trigger !== 'click' && opts.preventClickDefault) {
				/* prevent default click event for non-click triggers like mouseover */
				$elem.bind('click', function(e) {
					e.preventDefault();
				});
			}
		}

		function openOverlay(elem) {
			if(opts.openCondition) {
                	var res = opts.openCondition(elem);
                if(jQuery.isFunction(res)) {
                    if(!res()) {
                        return false;
                    }
                } else {
                    if(!res) {
                        return false;
                    }
                }
            }
//            if (opts.openCondition && !opts.openCondition(elem)) {
//				/* abort if there's an open condition that is not met */
//				return false;
//			}
			var $elem=$(elem),
			    ovContentTarget,
			    $ovWrapper=$('<div'+wrapperIdAttr+' class="ov-wrapper"></div>'),
			    $ovContent=$('<div></div>'),
			    ovTimeout;

			if($elem.data('isDialogOpened')) {
				return false;
			} else {
				$elem.data('isDialogOpened', 'true');
			}

			if ( elem.jqdialog ) {
				if ( elem.jqdialog.dialog('isOpen') ) {
					/* dialog is already open, move it to top of stack in case it is hidden behind others */
					elem.jqdialog.dialog('moveToTop');
					return false;
				} else {
					elem.jqdialog.dialog('destroy');
				};
			};

			if(opts.exclusive) {
				$.stubhub.overlayStack.closeAll();
			}
			$.stubhub.overlayStack.add(elem);


			if (opts.source) {
				ovContentTarget = opts.source;
			} else {
				ovContentTarget = $elem.attr('href');
				ovContentTarget = ovContentTarget.replace(location.href.split('#')[0],'');
			}

			if(ovContentTarget.substr(0,1)==='#') {
				/* the content target is inside the current dom */
				var $ovContentTarget = $(ovContentTarget),
					$contentParent = $ovContentTarget.parent().get(0);
				$elem.data('overlay-content', $ovContentTarget);
				$elem.data('overlay-content-parent', $contentParent);

				$ovContentTarget.css('display','block').appendTo($ovContent);
				buildOverlay();
			} else {
				/* the content target is external and requires ajax request */
				$.ajax({
					url:ovContentTarget + ((ovContentTarget.indexOf("?")===-1)?"?xhr=1":"&xhr=1"),
					cache:opts.cache,
					success:function(html){
						$ovContent.append(html);
						buildOverlay();
					},
					error:function(){
						/* try to retrieve static ajax error page as fallback */
						$.ajax({
							url:$.stubhub.ajaxErrorPage,
							success:function(html){
								$ovContent.append(html);
								buildOverlay();
							},
							error:function(){
								return false;
							}
						});
					}
				});

			};

			if(opts.closeSelector) {
				$(opts.closeSelector).live('click', function(e) {
					//$(elem).data('overlay', $ovWrapper);
					elem.closeOverlay();
					e.preventDefault();
				});
			};
			if(opts.closeOnClickOutside) {
				$('body').bind('click.overlayclose',function(e){
					/* close the overlay if the click happened outside the overlay */
					if( !$(e.target).parents('.'+opts.overlayClass).length ){
						elem.closeOverlay();
						$('body').unbind('click.overlayclose');
					}
				});
			}

			function buildOverlay() {
				/* final html structure of overlay:
				// <div class="ov-wrapper">
				//	<div class="ov-slice ov-slice-tr">
				//		<div class="ov-slice ov-slice-tl"></div>
				// 		<div [id="opts.overlayId"] class="ov-content">
				// 			<!-- overlay content goes here -->
				// 		</div>
				// 	</div>
				//	<div class="ov-slice ov-slice-br">
				//		<div class="ov-slice ov-slice-bl"></div>
				//	</div>
				// </div>
				*/
				var wrapperId = (opts.overlayId)? 'id="'+opts.overlayId+'" ' : '',
					curActiveEl = document.activeElement;
				$ovWrapper = $ovWrapper.html('<div class="ov-slice ov-slice-tr"><div class="ov-slice ov-slice-tl"></div><div ' + wrapperId + 'class="ov-content">'
						+ dummyFocusEl + $ovContent.html()
						+ '</div></div><div class="ov-slice ov-slice-br"><div class="ov-slice ov-slice-bl"></div></div>');

				$elem.data('overlay', $ovWrapper);

				/* create the dialog but hide it offscreen, so that we can get the proper styled dimensions to be able to position it */
				elem.jqdialog = $ovWrapper.dialog({
					autoOpen: true,
					closeOnEscape: opts.closeOnEscape,
					draggable: opts.draggable,
					width: opts.width,
					minHeight: opts.minHeight,
					dialogClass: opts.dialogClass,
					resizable: opts.resizable,
					bgiframe: opts.bgiframe,
					modal: opts.modal,
					position: opts.position,
					close: function() {
						elem.closeOverlay();
					}
				}).moveOffScreen();

				/* clumsy workaround just for IE(7): copy the first h2 (h3 will be ignored and should/can be used for nested overlay titles) from the content to the element with class ui-dialog-title */
				if (opts.draggable) {
					var $h2 = $ovWrapper.find("h2").eq(0),
						$h2html = $h2.clone();
					$(".ui-dialog-title").append($h2html);
					if ($h2.length===1){
						$h2.remove();
					} else {
						$ovWrapper.find(".ov-content").addClass("ov-content-flushTop");
					}
				};

				if (opts.align === 'centered') {
                    var winWidth = numb($(window).width()),
					    winHeight = numb($(window).height()),
                        wrapperWidth = opts.width,
					    wrapperHeight = elem.jqdialog.outerHeight();
                    if (wrapperWidth > winWidth || wrapperHeight > winHeight) {
                        var horiz = (winWidth - wrapperWidth) / 2,
                            vert = (winHeight - wrapperHeight) / 2;

                        horiz = horiz > 0 ? horiz : 0;
                        vert = vert > 0 ? vert : 0;
                        elem.jqdialog.dialog('option', 'position', [horiz, vert]);
                    }
                    elem.jqdialog.moveOnScreen();
				} else {
					/*position has not yet been defined, so we need to determine relative position*/

					var wrapperWidth = opts.width,
					    wrapperHeight = elem.jqdialog.outerHeight(),
					    elemOffsetTop = $elem.offset().top,
					    elemOffsetLeft = $elem.offset().left,
					    elemOffsetRight = elemOffsetLeft + $elem.outerWidth(),
					    elemOffsetBottom = elemOffsetTop + $elem.outerHeight(),
					    scrollTop = numb($(document).scrollTop()),
					    scrollLeft = numb($(document).scrollLeft()),
					    winWidth = numb($(window).width()),
					    winHeight = numb($(window).height()),
					    availableSpace = new Object(),
					    orientation = opts.preferedPosition + '-' + opts.preferedAlignment + 'Aligned',
					    locX,
					    locY;

					/* determine the available space around the trigger element: */
					availableSpace.top = elemOffsetTop - scrollTop;
					availableSpace.bottom = winHeight - (elemOffsetBottom - scrollTop);
					availableSpace.left = elemOffsetLeft - scrollLeft;
					availableSpace.right = winWidth - (elemOffsetRight - scrollLeft);

					/* determine the overlay orientation with respect to the trigger element */
					orientation = decideOrientation(availableSpace, wrapperWidth, wrapperHeight, opts.preferedPosition, opts.preferedAlignment);


					if(opts.style == 'callout')	{
	    					switch(orientation) {
							case 'below-leftAligned':
								$ovWrapper.prepend('<div class="ov-spike ov-spike-tl"></div>');
								break;
							case 'below-rightAligned':
								$ovWrapper.prepend('<div class="ov-spike ov-spike-tr"></div>');
								break;
							case 'above-leftAligned':
								$ovWrapper.append('<div class="ov-spike ov-spike-bl"></div>');
								break;
							case 'above-rightAligned':
								$ovWrapper.append('<div class="ov-spike ov-spike-br"></div>');
								break;
	    					}
	    					/* since we added the spikes, recalculate height, but we need to set/unset formatting context because ov-spike-br is likely to float:right */
	    					elem.jqdialog.addClass('setFormattingContext');
	    					wrapperHeight = elem.jqdialog.outerHeight();
	    					elem.jqdialog.removeClass('setFormattingContext');
	    				};

					switch(orientation) {
						case 'below-leftAligned':
							locY = elemOffsetBottom + opts.offsetY;
							locX = elemOffsetLeft + opts.offsetX;
							break;
						case 'below-rightAligned':
							locY = elemOffsetBottom + opts.offsetY;
							locX = elemOffsetRight - wrapperWidth - opts.offsetX;
							break;
						case 'above-leftAligned':
							locY = elemOffsetTop - wrapperHeight - opts.offsetY;
							locX = elemOffsetLeft + opts.offsetX;
							break;
						case 'above-rightAligned':
							locY = elemOffsetTop - wrapperHeight - opts.offsetY;
							locX = elemOffsetRight - wrapperWidth - opts.offsetX;
							break;
					};

					opts.position=[locX - scrollLeft , locY - scrollTop];
					elem.jqdialog.dialog('option', 'position', opts.position);
					elem.jqdialog.moveOnScreen();

				};

				setTimeout(function(){
					$("#dummyFocusEl").remove();
					if (!opts.focusFirstTabbable && curActiveEl !== undefined) {
						curActiveEl.focus();
					}
				}, opts.openDelay)


				if(opts.open) {
					opts.open(elem,orientation,opts);
				}

				elem.clearTimeout = function() {
					clearTimeout(elem.jqdialog.ovTimeout);
				};

				elem.closeOverlayAfterTimeout = function(closeDelayDelta) {
					elem.jqdialog.ovTimeout = setTimeout(function(){
						/* make sure dialog still exists; it might have been closed elsewhere during timeout if opts.exclusive=true */
						if (elem.jqdialog) elem.jqdialog.dialog('close');
					}, opts.closeDelay + parseInt(0+closeDelayDelta));
				};

				if (opts.forcedCloseDelay) {
					elem.closeOverlayAfterTimeout(opts.forcedCloseDelay);
				}
				if (opts.closeDelay) {
					$elem.bind('mouseenter.overlay', elem.clearTimeout).bind('mouseleave.overlay', elem.closeOverlayAfterTimeout);
					$ovWrapper.bind('mouseenter.overlay', elem.clearTimeout).bind('mouseleave.overlay', elem.closeOverlayAfterTimeout);
				}

				elem.closeOverlay = function() {
					var $this = $(this);
					if(this.jqdialog.dialog('isOpen') && $this.data('overlay')) {
						var content = $this.data('overlay-content'),
							contentParent = $this.data('overlay-content-parent');
						if(content && contentParent) {
							content.css('display', 'none').appendTo(contentParent);
						}

						if (opts.close) {
							opts.close(elem,opts);
						};
						var box = $this.data('overlay');

						$.stubhub.overlayStack.remove(this);
						box.unbind('.overlay');
						box.dialog('destroy');
						box.remove();
						$this.unbind('.overlay');
						//elem.jqdialog = null;

						$this.removeData('isDialogOpened');
					}
				};
				$.stubhub.playThenPauseLivequeries();
				return false;

			}; /* end buildOverlay() */

			return false;
		} /* end openOverlay() */


		function numb(num) {
			return parseInt(num) || 0;
		}

		function decideOrientation(availableSpace, wrapperWidth, wrapperHeight, preferedPosition, preferedAlignment) {
			preferedPosition = preferedPosition || 'below';
			preferedAlignment = preferedAlignment || 'left';
			var dimension = {
				top: 'above',
				bottom: 'below',
				left: 'leftAligned',
				right: 'rightAligned'
			};

			var top = availableSpace.top,
				bottom = availableSpace.bottom,
				left = availableSpace.left,
				right = availableSpace.right,
				topStr = dimension.top,
				bottomStr = dimension.bottom,
				leftStr = dimension.left,
				rightStr = dimension.right;

			if(preferedPosition === 'above') {
				top = availableSpace.bottom;
				bottom = availableSpace.top;

				topStr = dimension.bottom;
				bottomStr = dimension.top;
			};
			if(preferedAlignment === 'right') {
				left = availableSpace.right;
				right = availableSpace.left;

				leftStr = dimension.right;
				rightStr = dimension.left;
			};
			var orientation = preferedPosition + '-' + preferedAlignment + 'Aligned';
			if(left > wrapperWidth) {
				orientation = preferedPosition + '-' + rightStr;
			}
			if(right > wrapperWidth) {
				orientation = preferedPosition + '-' + leftStr;
			}
			if(top > wrapperHeight) {
				orientation = topStr + '-' + preferedAlignment + 'Aligned';
				if(left > wrapperWidth) {
					orientation = topStr + '-' + rightStr;
				}
				if(right > wrapperWidth) {
					orientation = topStr + '-' + leftStr;
				}
			}
			if(bottom > wrapperHeight) {
				orientation = bottomStr + '-' + preferedAlignment + 'Aligned';
				if(left > wrapperWidth) {
					orientation = bottomStr + '-' + rightStr;
				}
				if(right > wrapperWidth) {
					orientation = bottomStr + '-' + leftStr;
				}
			}

			return orientation;
		} /* end decideOrientation() */
	} /* end $.fn.overlay */


	/* shTable plugin
	 * version 1.4 (12-April-2011)
	 * history:
	 *  - 0.3: adding showBorder option and scroll classes.
	 *  - 0.4: no change to the plugin by itself, but dataTable plugin has been extended with custom sort type "alphanumeric".
	 *  - 1.0: upping the version because it is used extensively
	 *  - 1.1: adding support for pagination, alternate row colors and rounded corners
	 *  - 1.2: adding support for fading and fixing some issues with the pagination module: clicking in between page totals or page numbers would put table in weird state.
	 *  - 1.3: adding support for dataTableAccessObject so that dataTable API can be accessed after creation of the table.
	 *  - 1.4: adding support for aaData Object of dataTable API
	 *
	 * This plugin adds markup to a table (for instance to allow for a custom-scroll style)
	 * and it provides short-cut uptions to the dataTable plugin for column sorting and pagination.
	 * This plugin uses the roundedCorners plugin for the rounded corners effect.
	 * It's up to external style definitions to actually style that extra markup.
	 *
	 * Main options (first option shown is the default):
	 *   scrollHeight:null|integer (an integer to indicate the scrollable (=maximum) height of the table)
	 *   showBorder:true|false (boolean whether to add extra border class, to allow styles to turn border display on/off)
	 *   useAlternateRowColors:false|true (boolean whether to add extra table class, to allow styles to color alternate rows differently)
	 *   roundedCorners:false|true (boolean whether to show rounded corners)
	 *   rcWrapperClass:"rc-panel5t"|string (css class to be passed in as wrapperClass option to roundedCorners plugin)
	 *   rcThSeparators:[]|aray of booleans (an aray of booleans, one true/false value for each table column, to indicate wether that column should have a th separator class - only relevant for roundedCorners:true)
	 *   tableWrapperId:null|string (a value to use for an id attribute on the wrapper div - only if scrollHeight is defined)
	 *   tableWrapperClass:null|string (a value to use for a class attribute on the wrapper div - only if scrollHeight is defined)
	 *   dataTableAaData:null|array of objects ('aaData', options fo the dataTable plugin),
	 *   dataTableAoColumns:null|array of objects ('aoColumns' options for the dataTable plugin),
	 *       (note: sort type option "sType" may have values "string", "html", "numeric", "date" or the custom "alphanumeric")
	 *   dataTableAaSorting:null|array of arrays ('aaSorting' option for the dataTable plugin)
	 *   dataTableAaSortingFixed:null|array of arrays ('aaSortingFixed' option for the dataTable plugin)
	 *   dataTableFnDrawCallback:null|function ('fnDrawCallback' option for the dataTable plugin)
	 *   dataTableAccessObject:null:{} (an object that will become a pointer to the dataTable object to expose the dataTable API)
	 *   paginate:false|true (boolean whether to add dataTable pagination)
	 *   pagination.nrOfRows:25|integer (nr of rows to show per page)
	 *   pagination.firstRow:0|integer (nr of first row to show)
	 *   pagination.nrOfPages:7|odd integer (nr of pages to show in the pagination module - this is a global setting)
	 *   pagination.allowNrOfRowsChange:true|false (boolean whether the user can modify the nr of rows displayed)
	 *   filter:false|true (boolean whether to allow filtering)
	 *   classToRemove:"offscreenOnLoad"|string (the name of a class on the table source to be removed by the plugin - typical use is a class that hides the table content until it is styled)
	 *   useFading:true|false (boolean whether the table rows should fade when the table is redrawn
	 *   fadeTime:200 (time in milliseconds between fade in and fade out of the table rows - only relevant when useFading=true)
	 *   fadeClass:"st-fade"|string (class name for the css style that implements the fade effect)
	 *
	 * example usage:
	 *	$('#fooTable').shTable({
	 *		scrollHeight:300,
	 *		dataTableAoColumns:[
	 *			{"bSortable":false},      <- disable sorting on first column
	 *			null,                        <- enable sorting on second column, without any options
	 *			{"bSortable":false},           <- disable sorting on third column
	 *			{"sType":"date","iDataSort":4}, <- enable sorting on fourth column, sort as date, and use the (hidden) fifth column to provide sort data (dates in js format)
	 *			{"bSortable":false},           <- disable sorting on fifth column
	 *			null                         <- enable sorting on sixth column, without any options
	 *		],
	 *		dataTableAaSorting:[[3,'asc']]  <- onload, sort on fourth column, in ascending order
	 *	});
	 */
	$.fn.shTable = function (options) {
		var opts = $.extend(true, {
				scrollHeight:null,
				showBorder:true,
				useAlternateRowColors:false,
				roundedCorners:false,
				rcWrapperClass:"rc-panel5t",
				rcThSeparators:[],
				tableWrapperId:null,
				tableWrapperClass:null,
				dataTableAaData:null,
				dataTableAoColumns:null,
				dataTableAaSorting:null,
				dataTableAaSortingFixed:null,
				dataTableFnDrawCallback:null,
				scrollHeight:800,
				paginate:false,
				pagination: {
					nrOfRows:75,
					firstRow:0,
					nrOfPages:7,
					allowNrOfRowsChange:true
				},
				filter:false,
				zeroRecordsMsg:"Currently, no ticket listings match your filter settings.",
				classToRemove:"offscreenOnLoad",
				useFading:true,
				fadeTime:200,
				fadeClass:"st-fade"
			}, options || {} ),
			borderOffClass = (opts.showBorder && !opts.roundedCorners)? '' : 'st-outerWrapperNoBorder',
			alternateRowsClass = 'st-alternateRows',
			roundedCornersClass = (opts.roundedCorners)? 'st-roundedCorners' : '',
			tableWrapperClass = ['st-outerWrapper', borderOffClass, roundedCornersClass, opts.tableWrapperClass].join(' '),
			tableWrapperIdAttr = opts.tableWrapperId? 'id="'+opts.tableWrapperId+'" ': '',
            dataTableAaData = opts.dataTableAaData ? {aaData:opts.dataTableAaData} : {},
			dataTableAoColumns = opts.dataTableAoColumns ? opts.dataTableAoColumns : [null],
			dataTableAaSorting = opts.dataTableAaSorting ? opts.dataTableAaSorting : [[0,'asc']];


		return this.each ( function () {
			var $this = $(this),
				$tableWrapper;
			$this.find("th:first-child").addClass("firstChild");
			$this.find("th:last-child").addClass("lastChild");
			$this.find("td:first-child").addClass("firstChild");
			$this.find("td:last-child").addClass("lastChild");
			opts.dataTable = false;
			if (opts.useAlternateRowColors) $this.addClass(alternateRowsClass);
			if (opts.dataTableAoColumns || opts.dataTableAaSorting || opts.paginate) {
				var $pagiformTarget, dt;
				$.fn.dataTableExt.oPagination.iFullNumbersShowPages = opts.pagination.nrOfPages;
				$.fn.dataTableExt.oPagination.sPage1of1 = "Page 1 of 1";
				dt = $this.dataTable($.extend({
							"bPaginate":opts.paginate,
							"bLengthChange":opts.pagination.allowNrOfRowsChange,
							"sPaginationType":"full_numbers_plus_go",
							"iDisplayLength":opts.pagination.nrOfRows,
							"iDisplayStart":opts.pagination.firstRow,
							"bFilter":opts.filter,
							"bSort":true,
							"bSortClasses":false,
							"bStateSave":false,
							"bInfo":false,
							"bAutoWidth":false,
							"aoColumns":dataTableAoColumns,
							//"aaSorting":dataTableAaSorting,
                            "aaSorting": [],
							"aaSortingFixed":opts.dataTableAaSortingFixed,
							"fnDrawCallback":opts.dataTableFnDrawCallback,
							"fnHeaderCallback":function(nHead, aasData, iStart, iEnd, aiDisplay){
								if (opts.useFading) {
									var $tbody = $(nHead).parent().siblings("tbody"),
										fadeClass = opts.fadeClass;
									$tbody.addClass(fadeClass);
									window.setTimeout(function(){$tbody.removeClass(fadeClass);},opts.fadeTime);
								}
							},
							"sDom":opts.paginate?'t<"pagi"<"pagimain"p><"paginr"l><"pagiform">>':'t',
							"oLanguage":{
								"sLengthMenu": "# per page: <span class='paginate_active'>25</span> <span class='divider'>|</span> <span class='paginate_button'>50</span> <span class='divider'>|</span> <span class='paginate_button'>100</span> <span class='hidden'>_MENU_</span>",
								"sZeroRecords": opts.zeroRecordsMsg,
								"oPaginate": {
									"sFirst":"&#160;",
									"sPrevious":"&#160;",
									"sNext":"&#160;",
									"sLast":"&#160;"
								}
							}
				}, dataTableAaData));
				// bind the dataTable plugin to the dataTableAccessObject so that it can be accessed for instance to force a redraw based on external filter settings;
				// note: need to use the original options object here, not opts!;
				if (options.dataTableAccessObject) options.dataTableAccessObject = $.extend(true,options.dataTableAccessObject,dt);
				opts.dataTable = true;
				$tableWrapper = $this.parents(".dataTables_wrapper");
				/* move the "Go" form to a different location */
				$pagiformTarget = $tableWrapper.find(".pagiform");
				$tableWrapper.find(".go").appendTo($pagiformTarget);
				/* bind the desired behavior to the "# per page" elements */
				$tableWrapper.find(".dataTables_length").find(".paginate_button, .paginate_active").bind("click",function(){
					var $this = $(this);
					if ($this.hasClass("paginate_button")) {
						var val = $this.text(),
							$select = $this.siblings("span.hidden").find("select");
						$this.siblings("span.paginate_active").removeClass("paginate_active").addClass("paginate_button");
						$this.removeClass("paginate_button").addClass("paginate_active");
						/* trigger the hidden option that corresponds with the clicked element */
						$select.find("option[value="+val+"]").attr("selected",true);
						$select.trigger("change");
					}
				});
			} else if (opts.useAlternateRowColors) {
				$this.find("tr:nth-child(even)").addClass("even");
				$this.find("tr:nth-child(odd)").addClass("odd");
			}
			if (opts.scrollHeight) {
				var scrollClass = ($this.find("tbody").height() > opts.scrollHeight)? 'st-scroll' : 'st-noScroll';
				/* add extra table markup to allow scroll ui */
				/* final html structure of scrollable table:
				//<div [id="opts.tableWrapperId"] class="st-outerWrapper [opts.tableWrapperClass] ?scrollClass?" style="max-height:[opts.scrollHeight]px;">
				//  <div class="st-innerWrapper" style="max-height:[opts.scrollHeight]px;">
				//    ....table....
				//  </div>
				//  <div class="st-bottom-padding">&#160;</div>
				//</div>
				*/
				$this.wrap('<div '+ tableWrapperIdAttr +'class="'+tableWrapperClass+' '+scrollClass+'" style="max-height:'+ opts.scrollHeight+'px;"></div>')
					.after('<div class="st-bottom-padding">&#160;</div>')
					.wrap('<div class="st-innerWrapper" style="max-height:'+ opts.scrollHeight+'px;"></div>');
			} else if (opts.tableWrapperId || opts.tableWrapperClass || opts.roundedCorners) {
				$this.wrap('<div '+ tableWrapperIdAttr +'class="'+tableWrapperClass+'"></div>')
					.wrap('<div class="st-innerWrapper"></div>');
			}
			if (opts.roundedCorners) {
				var i=0;
				$this.find("th").find("div").each(function(){
					if (opts.rcThSeparators.length===0 || opts.rcThSeparators.length>1 && opts.rcThSeparators[i]){
						$(this).prepend("<span class='th_separator'>&#160;</span>");
					}
					i+=1;
				});
				$this.parents(((opts.dataTable)?".dataTables_wrapper":"."+roundedCornersClass)).roundedCorners({wrapperClass:opts.rcWrapperClass});
			}
			$this.removeClass(opts.classToRemove);
		});
	}; /* end $.fn.shTable */


	/* throbber plugin
	 * version 0.4 (24-Feb-2010)
	 * history:
	 *  - 0.3: third rewrite: the throbber can be attached to a form only; the form will be extended with all throbber variables and functions for easy access and to prevent collision between multiple forms on a page.
	 *  - 0.4: no change to the throbber plugin itself; adding a $.stubhub.initThrobber function to initialize and enable the throbber.
	 *
	 * This plugin adds functionality to a form to start and stop a throbber (any div that informs the user that the form was submitted) and prevents duplicate form submission by disabling the submit button.
	 * The default class for the throbber is thr-throbber.
	 *
	 * Main options (first option shown is the default):
	 *   minThrobTime:1000|integer (time in milliseconds: the minimum time that the throbber will be shown - any ajax response display will be delayed until this time has passed)
	 *   maxThrobTime:60000|integer (time in milliseconds: the maximum time that the throbber will be shown - after this time the form button will be enabled again and an optional "expired" div will be shown, allowing the user to try again)
	 *   buttonSelector:'button'|jQuery-selector-expression (jQuery selector string for elements that identify form buttons)
	 *   throbDelayTime:50|integer (time in milliseconds: a delay time before throbber functionality is invoked to allow client-side validation to finish and prevent form submission in case of validation errors)
	 *   throbIntervalTime:100|integer (time in milliseconds: an iterval timer used in conjunction with minThrobTime, it's the interval time to check whether the minimum throbber time has passed)
	 *   throbClass:'thr-throbber'|string (a css class to place on the "processing" and "expired" divs),
	 *   throbProcessingClass:'thr-processing'|string (a css class to place on the "processing" div)
	 *   throbExpiredClass:'thr-expired'|string (a css class to place on the "expired" div)
	 *   hiddenClass:'hidden' (a non-throbber-specific css class to place on elements that need to be hidden),
	 *   setBusy:null|function (a custom function to run when the throbber is in a "busy" state: typically used to set a css class on body, button and a that changes the cursor icon),
	 *   resetBusy:null|function (a custom function to run when the throbber reverts from the "busy" state)
	 *
	 * example usage:
	 *   place the following "processing" (optional) and "expired" (optional) divs behind any form's button. Both divs are optional: in their absence, the button will be greyed out only.
	 *	 <div class="thr-throbber thr-processing dynjs">Hang on while we process your request...</div>
	 *	 <div class="thr-throbber thr-expired dynjs"><span class="icon-14 icon-flag">&#160;</span>There might be a problem processing your request. Please try again.</div>
	 * enable the throbber on any given page by calling the following in the jQuery onready function:
	 *   $.stubhub.initThrobber(true);
	 * optionally, options can be passed in to the initThrobber function, for instance:
	 *   $.stubhub.initThrobber(true,{throbDelayTime:0});
	 */
	$.fn.throbber = function (options) {
		if(!this.length || !$(this[0]).is('form')) return this;
		var opts = $.extend({}, $.fn.throbber.options, options);
		return this.each ( function () {
			var form = this,
				$form = $(form);
			$.extend(form,{
				minThrobTime: opts.minThrobTime,
				maxThrobTime: opts.maxThrobTime,
				throbDelayTime: opts.throbDelayTime,
				throbIntervalTime: opts.throbIntervalTime,
				throbClass: opts.throbClass,
				throbProcessingClass: opts.throbProcessingClass,
				throbExpiredClass: opts.throbExpiredClass,
				hiddenClass: opts.hiddenClass,
				setBusy: opts.setBusy,
				resetBusy: opts.resetBusy,
				$button: $form.find(opts.buttonSelector),
				$throbber: $form.find("."+opts.throbClass),
				startThrobber: function(){
					form.stopThrobber(true);
					opts.setBusy();
					form.$button.blur().addClass("disabled").attr("disabled","disabled");
					/* display throbber after a short delay to prevent flash in case of client-side validation failure */
					/* place both throbber show and hide in queue to ensure they appear in sequence */
					form.$throbber.each(function(){
						var $this = $(this);
						if ( $this.hasClass(form.throbProcessingClass) ) {
							$(this).queue(function(){
								var $this = $(this);
								window.setTimeout(function(){
									$this.removeClass(opts.hiddenClass);
									$this.dequeue();
									},form.throbDelayTime);
							});
						}
					});
					form.startMinThrobTimer();
				},
				stopThrobber: function(forceStop){
					if(form.minThrobTimePassed || forceStop) {
						opts.resetBusy();
						form.$button.removeClass("disabled").removeAttr("disabled");
						form.$throbber.each(function(){
							$(this).queue(function(){
								var $this = $(this);
								$this.addClass(opts.hiddenClass);
								$this.dequeue();
							});
						});
						form.resetThrobber();
						var $form = $(form);
						$form.unbind("."+$form.attr("id"));
					} else {
						form.startMinThrobInterval();
					}
				},
				startMinThrobTimer: function(){
					form.minThrobTimePassed = false;
					form.minThrobTimer = window.setTimeout(function () {
						if(form.minThrobTimer) {
							window.clearTimeout(form.minThrobTimer);
						}
						form.minThrobTimePassed = true;
						form.startMaxThrobTimer(form.minThrobTime);
					}, form.minThrobTime);
				},
				startMaxThrobTimer: function(deltaTime){
					form.maxThrobTimer = window.setTimeout(function () {
						if(form.maxThrobTimer) {
							window.clearTimeout(form.maxThrobTimer);
						}
						form.stopThrobber();
						form.expireThrobber();
					}, form.maxThrobTime - deltaTime);
				},
				startMinThrobInterval: function() {
					form.minThrobInterval = window.setInterval(function(){
						if(form.minThrobTimePassed) {
							form.stopThrobber();
							window.clearInterval(form.minThrobInterval);
						}
					},form.throbIntervalTime);
				},
				resetThrobber: function() {
					window.clearTimeout(form.minThrobTimer);
					window.clearTimeout(form.maxThrobTimer);
					window.clearInterval(form.minThrobInterval);
				},
				expireThrobber: function() {
					form.$throbber.each(function(){
						var $this = $(this);
						if ( $this.hasClass(form.throbExpiredClass) ) {
							$(this).queue(function(){
								var $this = $(this);
								$this.removeClass(opts.hiddenClass);
								$this.dequeue();
							});
						}
					});
				}
			});
			form.startThrobber();
		});
	};
	/* expose throbber options for easy application-wide modification */
	$.fn.throbber.options = {
			minThrobTime:1000,
			maxThrobTime:$.stubhub.ajaxTimout,
			buttonSelector:'button',
			throbDelayTime:50,
			throbIntervalTime:100,
			throbClass:'thr-throbber',
			throbProcessingClass:'thr-processing',
			throbExpiredClass:'thr-expired',
			hiddenClass:'hidden',
			setBusy:$.stubhub.setBusy,
			resetBusy:$.stubhub.resetBusy
	};

	/* provide an initialization function to bind the throbber to a form on form submission */
	$.stubhub.initThrobber = function(enableThrobber,options) {
		if (enableThrobber) $.stubhub.enableThrobber=true;
		if ($.stubhub.enableThrobber && $.livequery) {
			$("form").livequery("submit",function(){
				var form = this,
					$form = $(form),
					formId = $form.attr("id"),
					sendTS = new Date().getTime();
				/* set a form id if it does not yet exists */
				if (formId==="") {
					formId = sendTS;
					$form.attr("id",formId);
				}
				/* bind and start the throbber */
				$form.throbber(options);
				/* add a form identifier to the ajax request properties */
				$.ajaxSetup({formId:formId});
				/* stop the throbber in case of a completed ajax response */
				$form.bind("ajaxComplete."+formId, function(e, xhr, opts){
						if (opts.formId === formId) {
							form.stopThrobber();
						}
				});

			});
		};
	};
	/* end $.fn.throbber */

    /* styledUpload plugin
     * version 0.1 (20-Oct-2009)
     *
     * This plugin addes styles to file upload component,
     * it now only supports style the upload component to a button.
     * It's up to external style definitions to actually style that extra markup.
     *
     * Main options (first option shown is the default):
     *     btnClass:null|string (a value to use for a class attribute on the button)
     *     btnText:'Upload files'|string (a value to be displayed on the button)
     *     btnId:'uploadBtn'|string (a value to use for the id attribute of the button)
     *     wrapperClass:'uploadWrapper'|string (a value to use for a class attribute for the wrapper div, the upload component and the button are wrapped in the div)
     *     onChange:null|function (a function to be triggered when the value of the upload component is changed)
     */
    $.fn.styledUpload = function(options) {
        var opts = $.extend({
            btnClass: null,
            btnText: 'Upload files',
            btnId: 'uploadBtn',
            wrapperClass: 'uploadWrapper',
            onChange: null
		}, options || {} );

        return this.each(function() {
            styling(this);
        });

        function styling(elem) {
            var $upload = $(elem);
            if (!$upload.hasClass('isStyledUpload')) {
                $upload.css({
                    'font-size': '17px'
                }).wrap($('<div class="' + opts.wrapperClass + '"></div>'));
                var $wrapper = $upload.parent('div'), $btn = $('<button id="' + opts.btnId + '" class="' + opts.btnClass + '">' + opts.btnText + '</button>');

                $wrapper.prepend($btn);
                var btnWidth = $btn.outerWidth(), btnHeight = $btn.outerHeight(), uploadWidth = $upload.outerWidth(), wrapperHeight = $wrapper.outerHeight();

                $wrapper.css({
                    'overflow': 'hidden',
                    'height': btnHeight
                });

                $upload.css({
                    'zIndex': 1000,
                    'marginLeft': (0 - btnWidth - (uploadWidth - btnWidth)) + 'px',
                    'opacity': 0,
                    'cursor': 'pointer'
                }).bind('change', opts.onChange).addClass('isStyledUpload');

                $btn.css({
                    'float': 'left',
                    'cursor': 'pointer'
                }).bind('click', function() {
                    return false;
                });
            }
        }
    }; /* end $.fn.styledUpload */


	/* JAMES: Json autocomplete made extremely simple
	 * @author: sebastien rannou - http://www.aimxhaisse.com *
	 * Modified based on Revision: 1.0.0 beta http://plugins.jquery.com/project/james
	 */

	$.fn.james = function (url_to_call, options) {
	    var that = jQuery(this),
	        results_set = [],
	        current_hovered_rank = -1,
	        keyEvents = [
	            {keycode: 38, action: function () { keyEventKeyUp(); }},
	            {keycode: 40, action: function () { keyEventKeyDown(); }},
	            {keycode: 13, action: function () { keyEventEnter(); }},
	            {keycode: 27, action: function () { keyEventEsc(); }}
	        ],
	        ul_element = false,
	    	o = jQuery.extend({
	    		onKeystroke:function (data) {
	    		    return data;
	    		},
	    		onSelect:function (dom_value, json_obj) {
	    		    that.attr("value", results_set[current_hovered_rank].text);
	    		},
	    		beforeSubmit:function () {
	    		    return;
	    		},
	    		keydelay:300,
	    		minlength:3,
	    		method:"get",
	    		varname:"input_content",
	    		varprefix:"",
	    		varpostfix:"",
	    		params:"",
	    		dataType:"json",
	    		serviceType:"query",
	    		width:"", //added cchong
	    		valueHandler:function() {
	    			return jQuery.trim(that.attr("value")).toLowerCase();
	    		},
	    		submitOnSelect:false
	    	    },  options || {}),
	    	mouseDownOnSelect= false;
	    /*
	     * This method performs DOM initialization
	     * Creates a UL with an Unique ID and push it to DOM
	     * It's called only once
	     */
	    (function initDOM() {
	        var ul_id = false;
	        var ul_node = document.createElement("ul");

	        // Performs generation of an unique ID
	        var genUniqueId = function () {
	            var result = "ul_james_" + Math.round(Math.random() * 424242);

	            if (jQuery("#" + result).length > 0)
	            {
	                result = genUniqueId();
	            }
	            return result;
	        };

	        ul_id = genUniqueId();

	        jQuery(ul_node).attr("id", ul_id).addClass("ul_james");
	        /*append to body instead of locally because absolute positioning is relative to container*/
	        $('body').append(ul_node);
	        // Creating a shortcut
	        ul_element = jQuery("#" + ul_id);
	        ul_element.hide();

	        //add mouseDownOnSelect for onblur event
	        ul_element.mousedown(function() {
				mouseDownOnSelect = true;
			}).mouseup(function() {
				mouseDownOnSelect = false;
			});
	    })();

	    /*
		 * This method performs CSS initialization
	     * It sets position's <ul> (especially for IE6)
	     * And sets result's width to input's width
	     * Because offset can be changed, it's called each time
	     * the dom is modified
	     */
	    var initCSS = function initCSS() {
	        var input_offset = that.offset();
	        var width = o.width==""? that.outerWidth() : o.width; //added cchong
	        ul_element.css({
	                        top:        input_offset.top + that.outerHeight(),
	                        width:      width, //modified cchong
	                        left:       input_offset.left,
	                        position:   "absolute",
	                        zIndex: 	99999999 //added cchong
	                        });
	    }

	    /*
	     * This is used to avoid form to be submit
	     * when the user press Enter to make his choice
	     */
	    that.keydown(function (event) {
	        if (event.keyCode === 13 && current_hovered_rank >= 0) {
	            return false;
	        }
	    });
	    that.keypress(function (event) {
	        if (event.keyCode === 13 && current_hovered_rank >= 0) {
	        	return false;
	        }
	    });

	    //that.blur added by cchong
	    that.blur(function() {
			if (!mouseDownOnSelect) {
				cleanResults();
			}
	    });

	    /*
	     * This method performs Keyboard Events
	     * @TODO: Build actions for more key events (CTRL? ALT?)
	     * or recognize ASCII codes?
	     */
	    //Timer's ID of next AJAX call
	    var keyevent_current_timer = false;

	    that.keyup(function(event) {
	        var is_specific_action = false;
	        // Check if a specific action is linked to the keycode
	        for (var i = 0; keyEvents[i]; i++)
	        {
	            if (event.keyCode === keyEvents[i].keycode)
	            {
	                is_specific_action = true;
	                keyEvents[i].action();
	                break;
	            }
	        }
	        // If it's not a specific action
	        if (is_specific_action === false)
	        {
	            // Unset last timeout if it was defined
	            if (keyevent_current_timer !== false)
	            {
	                window.clearTimeout(keyevent_current_timer);
	                keyevent_current_timer = false;
	            }
	            // Set a now timeout with an AJAX call inside
	            keyevent_current_timer = window.setTimeout(function () {
	                ajaxUpdate();
	            }, o.keydelay);
	        }
		});

	    /*
	     * This method performs AJAX calls
	     */
	    var ajaxUpdate = function () {
	    	o.beforeSubmit();
	        var value_to_send = o.valueHandler(), url, data;
	        // Check length of input's value;
	        if (value_to_send.length > 0 && (o.minlength === false || value_to_send.length >= o.minlength)) {
	        	if (o.serviceType==="REST") {
	        		url = url_to_call + value_to_send;
	        		data = o.params;
	        	} else {
	        		url = url_to_call;
	        		data = o.varname + "=" + o.varprefix + value_to_send + o.varpostfix + "&" + o.params;
	        	};
	            $.ajax({
	                type:       o.method,
	                data:       data,
	                url:        url,
	                dataType:   o.dataType,
	                success:    function (data) {
	                    var arr = o.onKeystroke(data);
	                    results_set = [];
	                    current_hovered = 0;
	                    for (var i in arr) {
	                        if (arr[i] !== null) {
	                            if (typeof(arr[i].json) === "undefined") {
	                                results_set.push({text: arr[i], json: {}});
	                            } else {
	                                results_set.push({text: arr[i].text, json: arr[i].json});
	                            }
	                        }
	                    }
	                    updateDom();
	                },
	                error: function(){
	                	cleanResults();
	                }
	            });
	        } else {
	            cleanResults();
	        }
	    }

	    /*
	     * This method performs the display of the results set
	     * Basically called when an event has been made
	     */
	    var updateDom = function() {
	    	jQuery(ul_element).empty();
	    	var is_empty = true;

	        initCSS();
	        for (var i in results_set)
	        {
	            if (results_set[i] !== null)
	            {
	                var li_elem = document.createElement("li");
	                jQuery(li_elem).addClass("li_james");
	                if(i%2==1){
	                	jQuery(li_elem).addClass("li_james_odd");
	                }
	                if (i == (current_hovered_rank % results_set.length))
	                {
	                    jQuery(li_elem).addClass("li_james_hovered");
	                }
	                //em: added match highlighting;
	                var resultText=results_set[i].text;
	                var inputRegEx=new RegExp($.trim(that.attr("value")),"i");
	                resultText=resultText.replace(inputRegEx,'<span class="li_james_match">'+resultText.match(inputRegEx)+'</span>');

	                jQuery(li_elem).append(resultText);
	                jQuery(ul_element).append(li_elem);
	                bind_elem_mouse_hover(li_elem, i);
	                is_empty = false;
	            }
	        }
	        if (is_empty)
	        {
	            jQuery(ul_element).hide();
	        }
	        else
	        {
	            jQuery(ul_element).show();
	        }
	    }

	    /*
	     * This method performs the ability to
	     * select a result with mouse
	     */
	    var bind_elem_mouse_hover = function (elem, i) {
		   jQuery(elem).hover(function() {
	            jQuery(ul_element)
	            .find(".li_james_hovered")
	            .removeClass("li_james_hovered");
	            jQuery(elem).addClass("li_james_hovered");
	            current_hovered_rank = i;
		    }, function() {
	            jQuery(elem).removeClass("li_james_hovered");
	            current_hovered_rank = -1;
		    });
	       jQuery(elem).click(function() {
	 		  keyEventEnter();
	         });
	    }

	    /*
	     * This method clears results in DOM & JS
	     */
	    var cleanResults = function () {
	        jQuery(ul_element).empty();
	        jQuery(ul_element).hide();
	        results_set = [];
	        current_hovered_rank = -1;
	    }

	    /*
	     * Key event actions
	     */

	    // Moving up into results set
	    var keyEventKeyUp = function () {
	        if (current_hovered_rank > 0)
	        {
	            current_hovered_rank--;
	        }
	        else if (results_set.length)
	        {
	                current_hovered_rank = results_set.length - 1;
	        }
	        updateDom();
	    }

	    // Moving down into resuls set
	    var keyEventKeyDown = function () {
	        if (current_hovered_rank < (results_set.length - 1))
	        {
	            current_hovered_rank++;
	        }
	        else
	        {
	            current_hovered_rank = 0;
	        }
	        updateDom();
	    }

	    // Selecting a set (onSelect function is called there)
	    var keyEventEnter = function () {
	        if (results_set.length > 0 && current_hovered_rank !== -1) {
	           that.attr("value",
	                o.onSelect(results_set[current_hovered_rank].text,
	                           results_set[current_hovered_rank].json));
	           if (o.submitOnSelect) that.parents("form").submit();
	        }
	        cleanResults();
	        return false;
	    }

	    // Removing results set
	    var keyEventEsc = function () {
	        that.attr("value", "");
	        cleanResults();
	    }
	};
	/* End JAMES: Json autocomplete made extremely simple*/

	/* ======+====== Window Popup ======+====== */
	$.fn.popupWindow = function(url, name, options) {
		var defaults = {
				toolbar: false,
				location: false,
				status: false,
				menubar: false,
				height: 400,
				width: 600,
				offsetLeft:60,
				offsetTop:60,
				scrollbars: false,
				resizable: false
		};
		var opts = jQuery.extend(defaults,options);

		var p = "toolbar=" + (opts.toolbar?1:0);
		p += "," + "location=" + (opts.location?1:0);
		p += "," + "status=" + (opts.status?1:0);
		p += "," + "menubar=" + (opts.menubar?1:0);
		p += "," + "height=" + opts.height;
		p += "," + "width=" + opts.width;
		p += "," + "screenX=" + opts.offsetLeft;
		p += "," + "screenY=" + opts.offsetTop;
		p += "," + "scrollbars=" + (opts.scrollbars?1:0);
		p += "," + "resizable=" + (opts.resizable?1:0);

		var w = window.open(url, name, p);
        if (w)
            w.focus();
     }

	/* ======+====== Help overlay formatting ======+====== */
	$(function() {
		$.formatHelp = function() {
			var dds = $("#formatHelpLayer").find("dd");
			for(var i=0; i<dds.length; i++){
				var dd = dds[i];
				var c = $(dd).html();
				if(c.length <= 240) {
					continue;
				}
				var c1 = c.slice(0,240) + "..." + "<div><a id='seeMore" + i + "' href='javascript: void(0)' class='dd-link'>See more...</a></div>";
				var c2 = c + "<div><a id='seeLess" + i + "' href='javascript: void(0)' class='dd-link'>See less...</a></div>";
				$(dd).html(c1);
				$("dd #seeMore" + i).live("click", showContent(dd, c2));
				$("dd #seeLess" + i).live("click", showContent(dd, c1));
			}
		}

		function showContent(ref, content) {
			return function() {
				$(ref).html(content);
			};
		}
	});

	/* ======+====== Cookie Helper Functions ======+====== */
	var Default_Cookie_Format = {
		"COOKIELET_DELIMITER":"|",
		"NAME_VALUE_DELIMITER":"~^~"
	};

	var FormatMap = {
		"STUB_SESSION":Default_Cookie_Format,
		"STUB_BROWSE_SESS":Default_Cookie_Format,
		"STUB_BROWSE_INFO":Default_Cookie_Format,
		"STUB_PERSISTENT":Default_Cookie_Format
	}

	function getCookieletArray(val, format) {
		  var clts = {};
		  var a = val.split(format.COOKIELET_DELIMITER);
		  for(var i=0;i<a.length;i++) {
			  var idx = a[i].indexOf(format.NAME_VALUE_DELIMITER);
			  if(idx > 0) {
				  clts[a[i].substring(0,idx)] = a[i].substring(idx+format.NAME_VALUE_DELIMITER.length);
			  }
		  }
		  return clts;
	}

	$.readCookielet = function(cookie,cookielet) {
		  var cVal = $.cookie(cookie);
		  var format = FormatMap[cookie];
		  if(!cVal || !format) {
			  return "";
		  }
		  var clts = getCookieletArray(cVal, format);
		  return clts[cookielet] || "";
	}

	$.writeCookielet = function(cookie,cookielet,val, expires) {
		var cVal = $.cookie(cookie) || "";
		var format = FormatMap[cookie];
		var hostname = window.location.hostname;
		if(hostname.indexOf("www.") != -1){
			hostname = hostname.substring(3);
		}
		if(expires){
			var options = { path: '/', domain:hostname, expires:expires};
		}
		else{
			var options = { path: '/', domain:hostname};
		}

		if(format) {
			var clts = getCookieletArray(cVal, FormatMap[cookie]);
			clts[cookielet] = val;
			var str = "";
			for(var key in clts) {
				str += key + format.NAME_VALUE_DELIMITER + clts[key] + format.COOKIELET_DELIMITER;
			}
			str = str.substr(0, str.length - format.COOKIELET_DELIMITER.length);

			$.cookie(cookie,str,options);
		}
	}

	/* ======+====== FLASH Helper Function======+====== */
	/* Creates a new Flash object and sets in the div based on the class name*/
	$.genFlashObject = function(flashObj, className){
		var random = new Date().getTime();
		var MMPlayerType = ($.msie) ? "ActiveX" : "PlugIn";
		var defaults = {
			bgcolor:"#ffffff"
		};
		var opts = jQuery.extend(defaults, flashObj);
		var tag = new FlashTag(opts.URL, opts.Width,  opts.Height, 1);

		tag.setBgcolor(opts.bgcolor);
		tag.setId(opts.Id);
		tag.setFlashvars("random=" + random + opts.FlashVars + "&amp;MMplayerType="+MMPlayerType);
		$("div ." + className).html(tag.toString());
	}

	/* ======+====== OMNITURE Helper Function======+====== */
	/* CALLS OMNITURE .TL FUNCTION for tracking*/
	$.omnitureTags = function(trackEvent, trackVars, section){
		var s=s_gi(s_account);
		s.linkTrackVars= trackVars;
		s.linkTrackEvents=trackEvent;
		s.events=trackEvent;
		s.tl(this,'o',section);
	}
})(jQuery);


/* ======+====== Library defaults and 3rd-party plugin extensions ======+====== */
;(function($){
	/* intercept every raw ajax response and filter out any full page responses: those are displayed as full page */
	$.ajaxSetup({
		dataFilter:function(data,type){
			/* assumption is that all full-page responses have a doctype declaration... */
			var htmlPattern = new RegExp("<!DOCTYPE", "im");
			if(htmlPattern.test(data)) {
				/* overlay content is full html: open as full page. Blank current page to prevent empty overlay artifacts */
				$("body").css("display","none");
				location.href = this.url;
				return false;
			} else {
				return data;
			}
		},
		beforeSend:function(xhr){
			/* functionality related to throbber implementation: */
			if (this.type !== "post") {
				this.formId=null;
			}
		},
		timeout:$.stubhub.ajaxTimout
	});

	/* Extend the dataTable sort type functionality with new sort option "sType":"alphanumeric".
	 * This sort algorithm is a hybrid between numeric sort and string sort: whenever numbers are encountered at the beginning or end of a string, they are sorted as numbers, not strings.
	 * A sample ascending sort result will hopefully illustrate this algorithm:
	 *   -76 | -45 | 32 | 63 | 63A | 63G | 1,770.45 | 2432 | A45 | A120 | A 121 | A523 | B12 | Box 20
	 */
	if ($.fn.dataTableExt) {
		function isNumeric(a) {
			var validChars = "0123456789.",
				match = true,
				x;
			a = a.replace(/^-/,"");
			for (i = 0; i < a.length && match == true; i++) {
				x = a.charAt(i);
				if (validChars.indexOf(x) == -1) {
					match = false;
				};
			};
			return match;
		};
		function sharesNumberAtEnd(a,b) {
			var validChars = "0123456789",
				x = a.replace(/\d*$/,""),
				y = b.replace(/\d*$/,""),
				index=0;
			if (x!=="" && x===y) {
				index = x.length;
			};
			return index;
		};
		function sharesNumberAtBeginning(a,b) {
			var validChars = "0123456789",
				x = a.match(/^\d*/,"").toString(),
				y = b.match(/^\d*/,"").toString(),
				index=0;
			if (x!=="" && x===y) {
				index = x.length;
			};
			return index;
		};
		function hasNumberAtBeginning(a,b) {
			var validChars = "0123456789",
				x = a.match(/^\d*/,"").toString(),
				y = b.match(/^\d*/,"").toString(),
				match = false;
			if (x!=="" && y!=="") {
				match = true;
			};
			return match;
		};
		$.fn.dataTableExt.oSort['alphanumeric-asc'] = function(a,b) {
			var i,x,y;
			/* normalize input */
			a = a.toLowerCase().replace(/[ ,]/,"");
			b = b.toLowerCase().replace(/[ ,]/,"");
			if (isNumeric(a) && isNumeric(b)) {
				x = a == "-" ? 0 : a;
				y = b == "-" ? 0 : b;
				return x - y;
			} else if (sharesNumberAtEnd(a,b)) {
				i = sharesNumberAtEnd(a,b);
				x = a.substr(i);
				y = b.substr(i);
				return x - y;
			} else if (sharesNumberAtBeginning(a,b)) {
				i = sharesNumberAtBeginning(a,b);
				x = a.substr(i);
				y = b.substr(i);
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			} else if (hasNumberAtBeginning(a,b)) {
				x = a.match(/^\d*/,"");
				y = b.match(/^\d*/,"");
				return x - y;
			} else {
				return ((a < b) ? -1 : ((a > b) ? 1 : 0));
			}
		};
		$.fn.dataTableExt.oSort['alphanumeric-desc'] = function(a,b) {
			var i,x,y;
			/* normalize input */
			a = a.toLowerCase().replace(/[ ,]/,"");
			b = b.toLowerCase().replace(/[ ,]/,"");
			if (isNumeric(a) && isNumeric(b)) {
				x = a == "-" ? 0 : a;
				y = b == "-" ? 0 : b;
				return y - x;
			} else if (sharesNumberAtEnd(a,b)) {
				i = sharesNumberAtEnd(a,b);
				x = a.substr(i);
				y = b.substr(i);
				return y - x;
			} else if (sharesNumberAtBeginning(a,b)) {
				i = sharesNumberAtBeginning(a,b);
				x = a.substr(i);
				y = b.substr(i);
				return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			} else if (hasNumberAtBeginning(a,b)) {
				x = a.match(/^\d*/,"");
				y = b.match(/^\d*/,"");
				return y - x;
			} else {
				return ((a < b) ? 1 : ((a > b) ? -1 : 0));
			}
		};
		/*
		* html sorting(ignore html tags)
		*/
		$.fn.dataTableExt.oSort['html-asc'] = function(a,b) {
			var x = a.replace( /<.*?>/g, "" ).toLowerCase();
			var y = b.replace( /<.*?>/g, "" ).toLowerCase();
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		};
		$.fn.dataTableExt.oSort['html-desc'] = function(a,b) {
			var x = a.replace( /<.*?>/g, "" ).toLowerCase();
			var y = b.replace( /<.*?>/g, "" ).toLowerCase();
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		};
	};


	/* Extend the dataTable plugin with a custom pagination module "full_numbers_plus_go" (which includes a "Go" input).
	 * NOTE: This requires jquery.dataTables-1.6.0 or higher.
	 */
	if ($.fn.dataTableExt && $.fn.dataTableExt.oStdClasses) { //
		var oDtClasses = $.fn.dataTableExt.oStdClasses || {};
		oDtClasses.sPageButtonStaticDisabled = "paginate_disabled";
		oDtClasses.sPageFirst = "button_first";
		oDtClasses.sPagePrevious = "button_previous";
		oDtClasses.sPageNext = "button_next";
		oDtClasses.sPageLast = "button_last";
		oDtClasses.sPageNrList = "paginate_pageNrs";
		oDtClasses.sPageNrDivider = "paginate_divider";
		oDtClasses.sPage1of1 = "page1of1";
		oDtClasses.sPageGo = "go";
		oDtClasses.sHidden = "hidden";

		$.fn.dataTableExt.fnCallbackDraw = function(fnCallbackDraw, oSettings){
			fnCallbackDraw( oSettings );
			/* position the table at the top of the visible area */
			$(window).scrollTop($("#"+oSettings.sTableId+"_wrapper").offset().top - 10);
		};
		$.fn.dataTableExt.oPagination.full_numbers_plus_go = {
			"fnInit": function ( oSettings, nPaging, fnCallbackDraw ){
				var nFirst = document.createElement( 'span' ),
					nPrevious = document.createElement( 'span' ),
					nList = document.createElement( 'span' ),
					nNext = document.createElement( 'span' ),
					nLast = document.createElement( 'span' ),
					nPage1of1 = document.createElement( 'div' ),
					nGo = document.createElement( 'div' );

				nFirst.innerHTML = oSettings.oLanguage.oPaginate.sFirst;
				nPrevious.innerHTML = oSettings.oLanguage.oPaginate.sPrevious;
				nNext.innerHTML = oSettings.oLanguage.oPaginate.sNext;
				nLast.innerHTML = oSettings.oLanguage.oPaginate.sLast;
				nPage1of1.innerHTML = $.fn.dataTableExt.oPagination.sPage1of1;

				var oClasses = oSettings.oClasses || oDtClasses;
				nFirst.className = oClasses.sPageButton+" "+oClasses.sPageFirst;
				nPrevious.className = oClasses.sPageButton+" "+oClasses.sPagePrevious;
				nNext.className= oClasses.sPageButton+" "+oClasses.sPageNext;
				nLast.className = oClasses.sPageButton+" "+oClasses.sPageLast;
				nList.className = oClasses.sPageNrList;
				nPage1of1.className = oClasses.sPage1of1+" "+oClasses.sHidden;
				nGo.className = oClasses.sPageGo;

				nPaging.appendChild( nFirst );
				nPaging.appendChild( nPrevious );
				nPaging.appendChild( nList );
				nPaging.appendChild( nNext );
				nPaging.appendChild( nLast );
				nPaging.appendChild( nPage1of1 );
				nPaging.appendChild( nGo );

				$(nFirst).click( function () {
					if(!$(this).hasClass(oClasses.sPageButtonStaticDisabled)){
						oSettings.oApi._fnPageChange( oSettings, "first" );
						$.fn.dataTableExt.fnCallbackDraw(fnCallbackDraw, oSettings );
					};
				} );

				$(nPrevious).click( function() {
					if(!$(this).hasClass(oClasses.sPageButtonStaticDisabled)){
						oSettings.oApi._fnPageChange( oSettings, "previous" );
						$.fn.dataTableExt.fnCallbackDraw(fnCallbackDraw, oSettings );
					};
				} );

				$(nNext).click( function() {
					if(!$(this).hasClass(oClasses.sPageButtonStaticDisabled)){
						oSettings.oApi._fnPageChange( oSettings, "next" );
						$.fn.dataTableExt.fnCallbackDraw(fnCallbackDraw, oSettings );
					};
				} );

				$(nLast).click( function() {
					if(!$(this).hasClass(oClasses.sPageButtonStaticDisabled)){
						oSettings.oApi._fnPageChange( oSettings, "last" );
						$.fn.dataTableExt.fnCallbackDraw(fnCallbackDraw, oSettings );
					};
				} );

				/* Take the brutal approach to cancelling text selection */
				$('span', nPaging)
					.bind( 'mousedown', function () { return false; } )
					.bind( 'selectstart', function () { return false; } );

				/* ID the first elements only */
				if ( oSettings.sTableId !== '' && typeof oSettings.aanFeatures.p == "undefined" ){
					nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
					nFirst.setAttribute( 'id', oSettings.sTableId+'_first' );
					nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
					nNext.setAttribute( 'id', oSettings.sTableId+'_next' );
					nLast.setAttribute( 'id', oSettings.sTableId+'_last' );
					nPage1of1.setAttribute( 'id', oSettings.sTableId+'_page1of1' )
					nGo.setAttribute( 'id', oSettings.sTableId+'_go' )
				}
			},

			"fnUpdate": function ( oSettings, fnCallbackDraw ){
				if ( !oSettings.aanFeatures.p || isNaN(oSettings._iDisplayStart)){
					return;
				}
				var iPageCount = $.fn.dataTableExt.oPagination.iFullNumbersShowPages,
					iPageCountHalf = Math.floor(iPageCount / 2),
					iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength),
					iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1,
					sList = "",
					sGo = "",
					iStartButton, iEndButton, i, iLen,
					oClasses = oSettings.oClasses || oDtClasses;

				/* Pages calculation */
				if (iPages < iPageCount){
					iStartButton = 1;
					iEndButton = iPages;
				}else{
					if (iCurrentPage <= iPageCountHalf){
						iStartButton = 1;
						iEndButton = iPageCount;
					}else{
						if (iCurrentPage >= (iPages - iPageCountHalf)){
							iStartButton = iPages - iPageCount + 1;
							iEndButton = iPages;
						}else{
							iStartButton = iCurrentPage - Math.ceil(iPageCount / 2) + 1;
							iEndButton = iStartButton + iPageCount - 1;
						}
					}
				}

				/* Build the dynamic list */
				for ( i=iStartButton ; i<=iEndButton ; i++ ){
					var dividerClass = (i!==iEndButton)? " " + oClasses.sPageNrDivider:"";
					if ( iCurrentPage != i ){
						sList += '<span class="'+oClasses.sPageButton+dividerClass+'">'+i+'</span>';
					}else{
						sList += '<span class="'+oClasses.sPageButtonActive+dividerClass+'">'+i+'</span>';
					}
				}
				/* Build the go input */
				sGo = '<input type="text" size="3" autocomplete="off"/><div class="nrPages">of '+iPages+'</div><button>Go</button>';

				/* Loop over each instance of the pager */
				var an = oSettings.aanFeatures.p;
				var anButtons, $anStatic, nPaginateList, nPaginateGo;
				var fnClick = function() {
					/* Use the information in the element to jump to the required page */
					var iTarget = (this.innerHTML * 1) - 1;
					oSettings._iDisplayStart = iTarget * oSettings._iDisplayLength;
					$.fn.dataTableExt.fnCallbackDraw(fnCallbackDraw, oSettings );
					return false;
				};
				var fnClickGo = function() {
					var $input = $(this).siblings('input'),
						iTarget = ($input.val() * 1);
					if (parseInt(iTarget)+''!=='NaN'){
						iTarget=(iTarget>iPages)?iPages:(iTarget<1)?1:iTarget;
						if (iTarget!==iCurrentPage){
							oSettings._iDisplayStart = (iTarget - 1) * oSettings._iDisplayLength;
							$.fn.dataTableExt.fnCallbackDraw(fnCallbackDraw, oSettings );
						} else {
							$input.val("");
						}
					} else {
						$input.val("");
					}
					return false;
				};
				var fnFalse = function () { return false; };

				for ( i=0, iLen=an.length ; i<iLen ; i++ ){
					if ( an[i].childNodes.length === 0 ){
						continue;
					}

					/* Build up the dynamic list first - html and listeners */
					nPaginateList = an[i].childNodes[2];
					nPaginateList.innerHTML = sList;
					$('span', nPaginateList).click( fnClick ).bind( 'mousedown', fnFalse )
						.bind( 'selectstart', fnFalse );

					nPaginateGo = document.getElementById(oSettings.sTableId+'_go');
					nPaginateGo.innerHTML = sGo;
					$('button', nPaginateGo).click( fnClickGo ).bind( 'mousedown', fnFalse )
						.bind( 'selectstart', fnFalse );


					/* Update the permanent buttons' classes */
					anButtons = an[i].getElementsByTagName('span');
					$anStatic = [
						$(anButtons[0]), $(anButtons[1]),
						$(anButtons[anButtons.length-2]), $(anButtons[anButtons.length-1])
					];
					$(anButtons).removeClass(oClasses.sHidden);
					$('#'+oSettings.sTableId+'_go').removeClass(oClasses.sHidden);
					$('#'+oSettings.sTableId+'_page1of1').addClass(oClasses.sHidden);
					$anStatic[0].removeClass( oClasses.sPageButton+" "+oClasses.sPageButtonActive+" "+oClasses.sPageButtonStaticDisabled );
					$anStatic[1].removeClass( oClasses.sPageButton+" "+oClasses.sPageButtonActive+" "+oClasses.sPageButtonStaticDisabled );
					$anStatic[2].removeClass( oClasses.sPageButton+" "+oClasses.sPageButtonActive+" "+oClasses.sPageButtonStaticDisabled );
					$anStatic[3].removeClass( oClasses.sPageButton+" "+oClasses.sPageButtonActive+" "+oClasses.sPageButtonStaticDisabled );
					if ( iCurrentPage == 1 ){
						$anStatic[0].addClass(oClasses.sPageButtonStaticDisabled+" "+oClasses.sPageFirst+"_disabled");
						$anStatic[1].addClass(oClasses.sPageButtonStaticDisabled+" "+oClasses.sPagePrevious+"_disabled");
					}else{
						$anStatic[0].removeClass(oClasses.sPageFirst+"_disabled");
						$anStatic[1].removeClass(oClasses.sPagePrevious+"_disabled");
						$anStatic[0].addClass(oClasses.sPageButton);
						$anStatic[1].addClass(oClasses.sPageButton);
					}

					if ( iCurrentPage == iPages || oSettings._iDisplayLength == -1 ){
						$anStatic[2].addClass(oClasses.sPageButtonStaticDisabled+" "+oClasses.sPageNext+"_disabled");
						$anStatic[3].addClass(oClasses.sPageButtonStaticDisabled+" "+oClasses.sPageLast+"_disabled");
					}else{
						$anStatic[2].removeClass(oClasses.sPageNext+"_disabled");
						$anStatic[3].removeClass(oClasses.sPageLast+"_disabled");
						$anStatic[2].addClass(oClasses.sPageButton);
						$anStatic[3].addClass(oClasses.sPageButton);
					}
				}
				/* hide the pagination buttons and Go input if there's only one page */
				if (iPages===1) {
					$(anButtons).addClass(oClasses.sHidden);
					$('#'+oSettings.sTableId+'_go').addClass(oClasses.sHidden);
					$('#'+oSettings.sTableId+'_page1of1').removeClass(oClasses.sHidden);
				}
			}
		};
	};

	/* add additional validation methods to jQuery.validate plugin */
	if ($.validator) {
		$.validator.addMethod("phoneUS", function(phone_number, element) {
			phone_number = phone_number.replace(/\s+/g, "");
			return this.optional(element) || phone_number.length > 9 &&
				phone_number.match(/^((00)?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})(-?|\.?)[2-9]\d{2}(-?|\.?)\d{4}$/);
		}, "Please specify a valid phone number");
		$.validator.addMethod("emailStub", function(email_stub, element) {
			return this.optional(element) ||
				email_stub.match(/[a-z0-9!##\$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!##$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
		}, "Please specify a valid email.");
	};

	/* tabs defaults */
	$.extend($.ui.tabs, {
		defaults: {
			ajaxOptions: null,
			cache: true,
			cookie: null,
			collapsible: false,
			disabled: [],
			event: 'click',
			fx: null, /*{opacity: 'toggle'},*/
			idPrefix: 'ui-tabs-',
			panelTemplate: '<div></div>',
			spinner: '',/*'<em>Loading&#8230;</em>',*/
			tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>',
			select:function(){$.stubhub.playThenPauseLivequeries()}
		}
	});
})(jQuery);


/* ======+====== Default Initializations ======+====== */

(function($) {
	$(function() {
		$.stubhub.initDebug($.stubhub.enableDebug,$.stubhub.enableCustomConsole);
		$.stubhub.initThrobber($.stubhub.enableThrobber);
		/* remove all non-js fallback elements */
		$('.nonjsFallback').remove();
		/* prefetch css background images, using special classes named "pf-xxx" */
		var _dc='<div class="',_ed='"></div>',_edc=_ed+_dc;
		$(_dc+'offScreen" id="dummyDivs">'+_dc+'p-slice'+_edc+'pf-obs'+_edc+'pf-obhs'+_edc+'pf-os'+_edc+'pf-obg'+_ed+'</div>').appendTo('body').remove();

		/* Tab initialization */
		$('ul.tabs li a').removeAttr('target');

		/* ## TODO: remove dependency on livequery ## */
		if ($.livequery) {
			$(".helpBubble").livequery( function() {
				// wrap help icon with <a> element;
				$(this).removeClass('helpBubble').wrap('<a id="tempId" href="'+ $.stubhub.helpBubbleBaseUrl + this.id +'" class="nodecoration" target="_blank"></a>');
				$("#tempId").removeAttr('id').bubblehelpOverlay();
			});
			/*
			 * generic action implementation
			 * example: <div id="actionInstruction" sh:action="update" sh:source="fooDiv" sh:target="barDiv" xmlns:sh="http://www.stubhub.com/NS/wp">
			 */
			$("#actionInstruction").livequery(function(){
				var $this = $(this),
					action = $this.attr('sh:action'),
					actionIsPerformed = false;
				if (action === 'update') {
					var source = '#' + $this.attr('sh:source'),
						target = '#' + $this.attr('sh:target');
					if (source!=='#' && target!=='#') {
						$(target).empty().append($(source));
					};
					actionIsPerformed = true;
				}
				if (actionIsPerformed) {
					$("#actionInstruction").remove();
				}
			});
			$.stubhub.pauseLivequeries();
		};
		$('body').ajaxStop(function() {
			if(typeof(TeaLeaf) !== 'undefined'){
				TeaLeaf.Client.tlProcessNode(document.body, false);
			}
			$.stubhub.playThenPauseLivequeries();
		});

	});
})(jQuery);



/* ======+====== offers ======+====== */
(function($){
	$(function() {
		var offerPageTypes = ["BrowseCategory", "BrowseEvent", "BrowseGenre", "BrowseGenreLeaf", "BrowseTicketDetail", "HomePage", "PostPurchasePage", "SearchResult"];
		if(typeof(pageType) !== 'undefined'){
			$.each(offerPageTypes, function(i){
				if(pageType==offerPageTypes[i]){
					  $.ajax({
						    type: "POST",
							//url: "http://d-sfa-515969.corp.ebay.com/debug/offer/offer.asp",
							url: "/content/getPromoContent",
							data:"pageType="+pageType,
						    dataType: "html",
						    success: processPromoContent,
						    error: function(){ }
					    });
				}
			});
		}

	  function processPromoContent(response) {
		// set up the possible non-offer responses from backend
		var noOfferResponse = ["<blocks>","<blocks/>","No Promo Content"];
		var thereIsAnOffer = true;
		// determine if there is an actual offer based on the response from back end
		$.each(noOfferResponse,function(i) { thereIsAnOffer = response.indexOf(noOfferResponse[i])>=0?false:thereIsAnOffer ; })
		// put the html response in the header div
		if(thereIsAnOffer) {
			$("#offer_content").html( response )
		}
		//else { $("#offer_container").html(" this was the NoPromo response: " + response )  }
	  }
	});
})(jQuery);

/* splitView plugin
 * version 0.3 (03-Feb-2010)
 * history:
 *  - 0.3: replace .html() implementation with .wrap() to preserve event handlers that were bound to html elements inside the view panes.
 *
 * This plugin enables split view functionality using the common jquery functions.
 * It provides a splitView functionality, ie: it divides the page/area into 2 sections viz: selectorPane and detailsPane.
 * selectorPane is the area that has a list of clickable items. It is scrollable.
 * When any item in selectorPane is cliked, the corresponding data for that item is displayed in the detailsPane.
 * The content for both the panes are present inside 2 divs which are hidden in the page.
 *
 * Known limitations:
 * 1) any events that are bound to the left pane prior to the splitView implementation will be lost (due to .html() implementation) and need to be re-bound.
 *
 * Options:
 * selectorPaneTarget: The id for the div that contains the data for selectorPane.
 * detailsPaneTarget: The id for the div that contains the data for detailsPane.
 * selectorPaneClass: Specifies the overall styling of the panes. Eg: orange border panels, etc.
 * selectorPaneClass: The external styling to be applied to the selectorPane.
 * detailsPaneClass: The external styling to be applied to the detailsPane.
 * splitViewWidth: The width of the entire splitView block.
 * selectorPaneWidth: The width of the selectorPane. Width of details pane is the difference between splitView and selectorPane widths.
 * scrollableClass: Class name for each item in the selectorPane.
 * scrollableActive: Class name for each item when it is selected or clicked.
 * scrollableHover: Class name for hover on each item in the selectorPane.
 * defaultSelected: This is the number (index) of item that should be selected by default when the page loads.
 * scrollSpeed: The speed with which the selectorPane scrolls.
 * nextEventSelector: This is the selector, that will scroll to the next block in the Selector pane displaying its corresponding content.
 *
 */


(function($) {
	$.fn.splitView = function(options) {
		var defaults = {
			selectorPaneTarget: '',
			detailsPaneTarget:'',
			splitViewPaneClass: 'p-border-org-2px',
			selectorPaneClass: 'sv-leftPane',
			detailsPaneClass: 'sv-rightPane',
			splitViewWidth: 950,
			selectorPaneWidth: 282,
			disabledSelector: 'disabledSelector',
			selectorClass: 'sv-selector',
			selectorActive: 'sv-selector-active',
			selectorHover: 'sv-selector-hover',
			defaultSelected: 1,
			scrollSpeed: 600,
			nextEventSelector: '',
			leftPaneClass: 'leftPane',
			rightPaneClass: 'rightPane',
			showOrdinal: true,
			beforeChangePane: function(){},
			callback: function() {}
		};
		var opts = $.extend($.fn,defaults, options || {} ,{
			hideItems:function(itm){
			var i=0;
			var elem=$(this);
			$.each(itm, function(index,value,elem){
				var selectVal =value;
				var itemCount=1;
				$(elem).find('div.scrollable').each(function (){
					if(selectVal == itemCount){
						$(this).hide();
					}
					itemCount++;
				});

				$(elem).find('div.rightPane').each(function()	{
					var rightPaneOrdinal = $(this).find('div.ordinal').html();
					if(selectVal == rightPaneOrdinal){
						$(this).removeClass('rightPane').addClass('barcodeRightPaneHide').hide();
					}

				});
			});
			// Function to get the Min value in Array
			Array.min = function( array ){
			return Math.min.apply( Math, array );
			};
			// Usage
			var firstItem = 1,firstOneActive=1;
			/*if(Array.min(itm)==firstItem){
				firstOneActive=1;
			}*/


			reloadOrdinal($(this),firstOneActive);
			},
			restore:function(){
				$('div.scrollable').show();
				$('div.barcodeRightPaneHide').each(function () {
					$(this).removeClass('barcodeRightPaneHide').addClass('rightPane');
				});
				firstOneActive=1;
				reloadOrdinal($(this),firstOneActive);

			},
			getCountOfShowItems:function(){
				var elem=$(this);
				var itemCount=0;
				$(elem).find('div.scrollable').each(function (){
					if(!$(this).is(":hidden")){
						itemCount++;
					}
				});
				return itemCount;
			}
		});

		return this.each(function() {
			createSplitView($(this));
		});
		function reloadOrdinal(el,firstOneActive){
			var loadCount=1;
			$(el).find('div.scrollable:visible').each(function (){
				if(loadCount == firstOneActive){
					$(this).addClass("scrollable-active");
				}else{
					$(this).removeClass("scrollable-active");
				}
				//$(this).find('div.ordinal').html(loadCount);
				loadCount++;
			});
			loadCount=1;
			$(el).find('div.rightPane').each(function()	{
				if(loadCount == firstOneActive){
					$(this).addClass("scrollable-active");
					$(this).show();
				}else{
					$(this).removeClass("scrollable-active");
					$(this).hide();
				}
				//$(this).find('div.ordinal').html(loadCount);
				loadCount++;
			});
		}
		function createSplitView($elem) {

			/*--- Creating selector elements ---*/
			$(opts.detailsPaneTarget).appendTo($elem);
			var uniqueId = new Date().getTime();
				svSelectorPaneWrapper = '<div class="sv-leftPane ' + opts.selectorPaneClass + '"><div class="rc-content sv-selectors">' + $(opts.selectorPaneTarget).html() + '<div class="sv-blankDiv"></div></div></div>',
				$svWrapper =  $(opts.detailsPaneTarget).removeAttr("id").removeAttr("class")
					.wrap('<div id="sv-wrapper-'+uniqueId+'" class="sv-wrapper"></div>')
					.wrap('<div class="sv-rightPane ' + opts.detailsPaneClass + ' "></div>')
					.wrap('<div class="p-wrapper ' + opts.splitViewPaneClass +'"></div>')
					.wrap('<div class="p-slice-wrapper"></div>')
					.after('<div class="p-slice p-slice-br"><div class="p-slice p-slice-bl"></div></div>')
					.wrap('<div class="p-slice p-slice-tr"></div>')
					.before('<div class="p-slice p-slice-tl"></div>')
					.wrap('<div class="p-content setFormattingContext sv-details"></div>');

			$("#sv-wrapper-"+uniqueId).prepend(svSelectorPaneWrapper);

			/* Removing the extra data from page */
			$(opts.selectorPaneTarget).remove();

			/*--- Creating the scrollable objects in selector pane ---*/
			var $svSelectorPane = $elem.find('div.sv-selectors'),
				$svDetailsPane = $elem.find('div.sv-details').contents(),
				detailsPaneHeight = $svDetailsPane.children(0).height(),
				$svSelectorPaneChildren = $svSelectorPane.children(),
				defaultSelectedIndex = $svSelectorPaneChildren.eq(opts.defaultSelected - 1);

			/*--- Assigning the class to selector pane objects ---*/
			$svSelectorPaneChildren.addClass(opts.selectorClass);

			/* Creating ordinals */
			if(opts.showOrdinal === true)	{
				var ordinalCount = 1;
				$svSelectorPane.find('div.' + opts.leftPaneClass).each(function()	{
					$(this).prepend('<div class="ordinal">' + ordinalCount +'</div>');
					ordinalCount++;
				});

				ordinalCount = 1;
				$svDetailsPane.find('div.' + opts.rightPaneClass).each(function()	{
					$(this).prepend('<div class="ordinal">' + ordinalCount +'</div>');
					ordinalCount++;
				});
			}

			var $selectorEl = $elem.find('div.' + opts.selectorClass),
				deltaHeight = $svSelectorPane.find('div.' + opts.selectorClass + ':nth-child(1)').height() + $svSelectorPane.find('div.' + opts.selectorClass + ':nth-child(2)').height();

			 /*--- Dimensions of splitview ---*/
		   $svSelectorPane.height(detailsPaneHeight + 20).parent().width(opts.selectorPaneWidth);

		   /* This is done to show the selctors properly in IE 7*/
		   $svSelectorPaneChildren.width(opts.selectorPaneWidth - 17);
		   $('div.sv-rightPane').width(opts.splitViewWidth - opts.selectorPaneWidth - 2); //minus 2 for the borders of left pane.
		   $svDetailsPane.height(detailsPaneHeight);





			$elem.find('div.sv-leftPane div.sv-blankDiv').height($svSelectorPane.height() - deltaHeight + 20); /*since we add 20px above */
			$('div.sv-leftPane div.sv-blankDiv').removeClass(opts.selectorClass);




			/*--- Assigning the split view properties on page load ---*/
			//$svSelectorPaneChildren.eq(opts.defaultSelected - 1).addClass(opts.selectorActive);
			//$svDetailsPane.children().hide();
			//$svDetailsPane.children().eq(opts.defaultSelected - 1).show();

			bindDataFromPanes($svSelectorPaneChildren.eq(opts.defaultSelected - 1));

			var heightToScroll;

			/*--- Adding the click and scroll functionality ---*/
			$selectorEl.click(function(){
				var $this = $(this),
					activeSelectorIndex = $elem.find(' div.' + opts.selectorClass).index($('div.scrollable-active')),
					clickedSelectorIndex = $elem.find(' div.' + opts.selectorClass).index($this);

				if(!$this.hasClass(opts.selectorActive) && !$this.hasClass(opts.disabledSelector) && !$this.hasClass('sv-blankDiv') )	{

					if(activeSelectorIndex < clickedSelectorIndex)	{
						heightToScroll = $this.parents('div.sv-leftPane').find('div.scrollable-active').height();
					}
					else	{
						heightToScroll = $this.prev('div.scrollable').height();
					}

					bindDataFromPanes($this);
				}
			});


			/* Adding the hover effect */
			$selectorEl.hover(function()	{
				var $this = $(this);
				if(!$this.hasClass(opts.selectorActive) && !$this.hasClass(opts.disabledSelector))	{
					$this.addClass(opts.selectorHover);
				}
			}, function()	{
				var $this = $(this);
				if(!$this.hasClass(opts.selectorActive))	{
					$this.removeClass(opts.selectorHover);
				}
			});

			/*--- Binding the contents from Selector and Display panes ---*/
			function bindDataFromPanes($current) {
				opts.beforeChangePane();
				var $svDetailsPaneChildren = $svDetailsPane.children();

				$('#svDetailsPaneTempId').removeAttr('id');

				$selectorEl.removeClass(opts.selectorActive).removeClass(opts.selectorHover);
				selectorPaneScroll($current);
				/* Displaying the corresponding content in the right section */
				var svIndex = $elem.find(' div.' + opts.selectorClass).index($current);
				$svDetailsPaneChildren.hide();
				$svDetailsPaneChildren.eq(svIndex).attr('id','svDetailsPaneTempId').show();

			};


			/*--- For scrolling ---*/
			function selectorPaneScroll($current)	{
				var st = $current.position().top +  $svSelectorPane.scrollTop() - heightToScroll;

				$current.addClass(opts.selectorActive);

				$svSelectorPane.animate({
					scrollTop: st
				}, opts.scrollSpeed);
				//$('input:first',$current).focus();
				opts.callback($current);
			};

			/*--- For next event selector -----*/
			if(opts.nextEventSelector)	{
				$(opts.nextEventSelector).click(function(o)	{
					var $nextSelector = $('div.scrollable-active').next('div.' + opts.selectorClass);
					var isVisiable=false;
					var ocount= $nextSelector.find('div.ordinal').html();
					while(!isVisiable && ocount!=null){
						if($nextSelector.is(":hidden")){
							$nextSelector=$nextSelector.next('div.' + opts.selectorClass);
							ocount= $nextSelector.find('div.ordinal').html();
						}else{
							isVisiable=true;
						}

					}
					if(ocount!=null){
						o.preventDefault();
						bindDataFromPanes($nextSelector);
					}

				});
			}

			$.stubhub.playThenPauseLivequeries();

		}


	}
})(jQuery);
/* SplitView function ends here */

/* Code for prefill text: Added 16th Dec
 * This plugin will generate suggestive text for the text inputs.
 * It will insert the value from the 'prefill' attr of the element into its 'value' attribute.
 * */

(function($) {
	$.fn.prefillText = function(options) {
		var defaults = {
			prefillClass: 'prefill',
			callback: function() {}
		};
		var opts = $.extend(defaults, options || {});

		return this.each(function() {
			insertPrefillText($(this));
		});

		function insertPrefillText($elem)	{

			var elemVal = $elem.val(),
				prefillValue = $elem.attr('prefill');

			if(elemVal === '' || elemVal === prefillValue) {
				$elem.val(prefillValue).addClass(opts.prefillClass);
			}

			/* Binding the element for various interactions */
			$elem.focus(function()	{
				var $this = $(this);
				if($this.val()=== prefillValue)	{
					$this.val('').removeClass(opts.prefillClass);
				};
				/* trigger click since focus prevents bubbling up of the original click event */
				$this.trigger("click");
			}).blur(function()	{
				var $this = $(this);
				if($this.val() === '')	{
					$this.val(prefillValue).addClass(opts.prefillClass);
				}
				else{
					$this.removeClass(opts.prefillClass);
				}
			}).change(function()	{
				$(this).removeClass(opts.prefillClass);
			});
		}

	}
})(jQuery);

