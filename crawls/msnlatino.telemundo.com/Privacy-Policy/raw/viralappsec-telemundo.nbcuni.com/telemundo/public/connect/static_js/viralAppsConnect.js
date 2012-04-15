/* extend jquery to parse html template */
		//to parse the html templates
		jQuery.fn.parseTemplate = function(str,data)
		{    
		    var _tmplCache = {}
		    var err = "";
		    try {
		        var func = _tmplCache[str];
		        if (!func) {
		            var strFunc =
		            "var p=[],print=function(){p.push.apply(p,arguments);};" +
		                        "with(obj){p.push('" +
		            //                        str
		            //                  .replace(/[\r\t\n]/g, " ")
		            //                  .split("<#").join("\t")
		            //                  .replace(/((^|#>)[^\t]*)'/g, "jQuery1\r")
		            //                  .replace(/\t=(.*?)#>/g, "',$1,'")
		            //                  .split("\t").join("');")
		            //                  .split("#>").join("p.push('")
		            //                  .split("\r").join("\\'") + "');}return p.join('');";
		
		            str.replace(/[\r\t\n]/g, " ")
		               .replace(/'(?=[^#]*#>)/g, "\t")
		               .split("'").join("\\'")
		               .split("\t").join("'")
		               .replace(/<#=(.+?)#>/g, "',$1,'")
		               .split("<#").join("');")
		               .split("#>").join("p.push('")
		               + "');}return p.join('');";
		
		            //alert(strFunc);
		            func = new Function("obj", strFunc);
		            _tmplCache[str] = func;
		        }
		        return func(data);
		    } catch (e) { err = e.message; }
		    return "< # ERROR: " + err.toString() + " # >";
		}
		

/*
 * jQuery UI 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
;jQuery.ui || (function($) {

var _remove = jQuery.fn.remove,
	isFF2 = jQuery.browser.mozilla && (parseFloat(jQuery.browser.version) < 1.9);

//Helper functions and ui object
jQuery.ui = {
	version: "1.7.2",

	// jQuery.ui.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function(module, option, set) {
			var proto = jQuery.ui[module].prototype;
			for(var i in set) {
				proto.plugins[i] = proto.plugins[i] || [];
				proto.plugins[i].push([option, set[i]]);
			}
		},
		call: function(instance, name, args) {
			var set = instance.plugins[name];
			if(!set || !instance.element[0].parentNode) { return; }

			for (var i = 0; i < set.length; i++) {
				if (instance.options[set[i][0]]) {
					set[i][1].apply(instance.element, args);
				}
			}
		}
	},

	contains: function(a, b) {
		return document.compareDocumentPosition
			? a.compareDocumentPosition(b) & 16
			: a !== b && a.contains(b);
	},

	hasScroll: function(el, a) {

		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if (jQuery(el).css('overflow') == 'hidden') { return false; }

		var scroll = (a && a == 'left') ? 'scrollLeft' : 'scrollTop',
			has = false;

		if (el[scroll] > 0) { return true; }

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[scroll] = 1;
		has = (el[scroll] > 0);
		el[scroll] = 0;
		return has;
	},

	isOverAxis: function(x, reference, size) {
		//Determines when x coordinate is over "b" element axis
		return (x > reference) && (x < (reference + size));
	},

	isOver: function(y, x, top, left, height, width) {
		//Determines when x, y coordinates is over "b" element
		return jQuery.ui.isOverAxis(y, top, height) && jQuery.ui.isOverAxis(x, left, width);
	},

	keyCode: {
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
};

// WAI-ARIA normalization
if (isFF2) {
	var attr = jQuery.attr,
		removeAttr = jQuery.fn.removeAttr,
		ariaNS = "http://www.w3.org/2005/07/aaa",
		ariaState = /^aria-/,
		ariaRole = /^wairole:/;

	jQuery.attr = function(elem, name, value) {
		var set = value !== undefined;

		return (name == 'role'
			? (set
				? attr.call(this, elem, name, "wairole:" + value)
				: (attr.apply(this, arguments) || "").replace(ariaRole, ""))
			: (ariaState.test(name)
				? (set
					? elem.setAttributeNS(ariaNS,
						name.replace(ariaState, "aaa:"), value)
					: attr.call(this, elem, name.replace(ariaState, "aaa:")))
				: attr.apply(this, arguments)));
	};

	jQuery.fn.removeAttr = function(name) {
		return (ariaState.test(name)
			? this.each(function() {
				this.removeAttributeNS(ariaNS, name.replace(ariaState, ""));
			}) : removeAttr.call(this, name));
	};
}

//jQuery plugins
jQuery.fn.extend({
	remove: function() {
		// Safari has a native remove event which actually removes DOM elements,
		// so we have to use triggerHandler instead of trigger (#3037).
		jQuery("*", this).add(this).each(function() {
			jQuery(this).triggerHandler("remove");
		});
		return _remove.apply(this, arguments );
	},

	enableSelection: function() {
		return this
			.attr('unselectable', 'off')
			.css('MozUserSelect', '')
			.unbind('selectstart.ui');
	},

	disableSelection: function() {
		return this
			.attr('unselectable', 'on')
			.css('MozUserSelect', 'none')
			.bind('selectstart.ui', function() { return false; });
	},

	scrollParent: function() {
		var scrollParent;
		if((jQuery.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test(jQuery.curCSS(this,'position',1)) && (/(auto|scroll)/).test(jQuery.curCSS(this,'overflow',1)+jQuery.curCSS(this,'overflow-y',1)+jQuery.curCSS(this,'overflow-x',1));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test(jQuery.curCSS(this,'overflow',1)+jQuery.curCSS(this,'overflow-y',1)+jQuery.curCSS(this,'overflow-x',1));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? jQuery(document) : scrollParent;
	}
});


//Additional selectors
jQuery.extend(jQuery.expr[':'], {
	data: function(elem, i, match) {
		return !!jQuery.data(elem, match[3]);
	},

	focusable: function(element) {
		var nodeName = element.nodeName.toLowerCase(),
			tabIndex = jQuery.attr(element, 'tabindex');
		return (/input|select|textarea|button|object/.test(nodeName)
			? !element.disabled
			: 'a' == nodeName || 'area' == nodeName
				? element.href || !isNaN(tabIndex)
				: !isNaN(tabIndex))
			// the element and all of its ancestors must be visible
			// the browser may report that the area is hidden
			&& !jQuery(element)['area' == nodeName ? 'parents' : 'closest'](':hidden').length;
	},

	tabbable: function(element) {
		var tabIndex = jQuery.attr(element, 'tabindex');
		return (isNaN(tabIndex) || tabIndex >= 0) && jQuery(element).is(':focusable');
	}
});


// jQuery.widget is a factory to create jQuery plugins
// taking some boilerplate code out of the plugin code
function getter(namespace, plugin, method, args) {
	function getMethods(type) {
		var methods = jQuery[namespace][plugin][type] || [];
		return (typeof methods == 'string' ? methods.split(/,?\s+/) : methods);
	}

	var methods = getMethods('getter');
	if (args.length == 1 && typeof args[0] == 'string') {
		methods = methods.concat(getMethods('getterSetter'));
	}
	return (jQuery.inArray(method, methods) != -1);
}

jQuery.widget = function(name, prototype) {
	var namespace = name.split(".")[0];
	name = name.split(".")[1];

	// create plugin method
	jQuery.fn[name] = function(options) {
		var isMethodCall = (typeof options == 'string'),
			args = Array.prototype.slice.call(arguments, 1);

		// prevent calls to internal methods
		if (isMethodCall && options.substring(0, 1) == '_') {
			return this;
		}

		// handle getter methods
		if (isMethodCall && getter(namespace, name, options, args)) {
			var instance = jQuery.data(this[0], name);
			return (instance ? instance[options].apply(instance, args)
				: undefined);
		}

		// handle initialization and non-getter methods
		return this.each(function() {
			var instance = jQuery.data(this, name);

			// constructor
			(!instance && !isMethodCall &&
				jQuery.data(this, name, new jQuery[namespace][name](this, options))._init());

			// method call
			(instance && isMethodCall && jQuery.isFunction(instance[options]) &&
				instance[options].apply(instance, args));
		});
	};

	// create widget constructor
	jQuery[namespace] = jQuery[namespace] || {};
	jQuery[namespace][name] = function(element, options) {
		var self = this;

		this.namespace = namespace;
		this.widgetName = name;
		this.widgetEventPrefix = jQuery[namespace][name].eventPrefix || name;
		this.widgetBaseClass = namespace + '-' + name;

		this.options = jQuery.extend({},
			jQuery.widget.defaults,
			jQuery[namespace][name].defaults,
			jQuery.metadata && jQuery.metadata.get(element)[name],
			options);

		this.element = jQuery(element)
			.bind('setData.' + name, function(event, key, value) {
				if (event.target == element) {
					return self._setData(key, value);
				}
			})
			.bind('getData.' + name, function(event, key) {
				if (event.target == element) {
					return self._getData(key);
				}
			})
			.bind('remove', function() {
				return self.destroy();
			});
	};

	// add widget prototype
	jQuery[namespace][name].prototype = jQuery.extend({}, jQuery.widget.prototype, prototype);

	// TODO: merge getter and getterSetter properties from widget prototype
	// and plugin prototype
	jQuery[namespace][name].getterSetter = 'option';
};

jQuery.widget.prototype = {
	_init: function() {},
	destroy: function() {
		this.element.removeData(this.widgetName)
			.removeClass(this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled')
			.removeAttr('aria-disabled');
	},

	option: function(key, value) {
		var options = key,
			self = this;

		if (typeof key == "string") {
			if (value === undefined) {
				return this._getData(key);
			}
			options = {};
			options[key] = value;
		}

		jQuery.each(options, function(key, value) {
			self._setData(key, value);
		});
	},
	_getData: function(key) {
		return this.options[key];
	},
	_setData: function(key, value) {
		this.options[key] = value;

		if (key == 'disabled') {
			this.element
				[value ? 'addClass' : 'removeClass'](
					this.widgetBaseClass + '-disabled' + ' ' +
					this.namespace + '-state-disabled')
				.attr("aria-disabled", value);
		}
	},

	enable: function() {
		this._setData('disabled', false);
	},
	disable: function() {
		this._setData('disabled', true);
	},

	_trigger: function(type, event, data) {
		var callback = this.options[type],
			eventName = (type == this.widgetEventPrefix
				? type : this.widgetEventPrefix + type);

		event = jQuery.Event(event);
		event.type = eventName;

		// copy original event properties over to the new event
		// this would happen if we could call jQuery.event.fix instead of jQuery.Event
		// but we don't have a way to force an event to be fixed multiple times
		if (event.originalEvent) {
			for (var i = jQuery.event.props.length, prop; i;) {
				prop = jQuery.event.props[--i];
				event[prop] = event.originalEvent[prop];
			}
		}

		this.element.trigger(event, data);

		return !(jQuery.isFunction(callback) && callback.call(this.element[0], event, data) === false
			|| event.isDefaultPrevented());
	}
};

jQuery.widget.defaults = {
	disabled: false
};


/** Mouse Interaction Plugin **/

jQuery.ui.mouse = {
	_mouseInit: function() {
		var self = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return self._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if(self._preventClickEvent) {
					self._preventClickEvent = false;
					event.stopImmediatePropagation();
					return false;
				}
			});

		// Prevent text selection in IE
		if (jQuery.browser.msie) {
			this._mouseUnselectable = this.element.attr('unselectable');
			this.element.attr('unselectable', 'on');
		}

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);

		// Restore text selection in IE
		(jQuery.browser.msie
			&& this.element.attr('unselectable', this._mouseUnselectable));
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		// TODO: figure out why we have to use originalEvent
		event.originalEvent = event.originalEvent || {};
		if (event.originalEvent.mouseHandled) { return; }

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var self = this,
			btnIsLeft = (event.which == 1),
			elIsCancel = (typeof this.options.cancel == "string" ? jQuery(event.target).parents().add(event.target).filter(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				self.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return self._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return self._mouseUp(event);
		};
		jQuery(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		// preventDefault() is used to prevent the selection of text here -
		// however, in Safari, this causes select boxes not to be selectable
		// anymore, so this fix is needed
		(jQuery.browser.safari || event.preventDefault());

		event.originalEvent.mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if (jQuery.browser.msie && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		jQuery(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;
			this._preventClickEvent = (event.target == this._mouseDownEvent.target);
			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
};

jQuery.ui.mouse.defaults = {
	cancel: null,
	distance: 1,
	delay: 0
};

})(jQuery);

/*
 * jQuery UI Dialog 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 *	ui.resizable.js
 */
(function(jQuery) {

var setDataSwitch = {
		dragStart: "start.draggable",
		drag: "drag.draggable",
		dragStop: "stop.draggable",
		maxHeight: "maxHeight.resizable",
		minHeight: "minHeight.resizable",
		maxWidth: "maxWidth.resizable",
		minWidth: "minWidth.resizable",
		resizeStart: "start.resizable",
		resize: "drag.resizable",
		resizeStop: "stop.resizable"
	},
	
	uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' +
		'ui-widget-content ' +
		'ui-corner-all ';

jQuery.widget("ui.dialog", {

	_init: function() {
		this.originalTitle = this.element.attr('title');

		var self = this,
			options = this.options,

			title = options.title || this.originalTitle || '&nbsp;',
			titleId = jQuery.ui.dialog.getTitleId(this.element),

			uiDialog = (this.uiDialog = jQuery('<div/>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
					position: 'absolute',
					overflow: 'hidden',
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				// setting outline to 0 prevents a border on focus in Mozilla
				.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
					(options.closeOnEscape && event.keyCode
						&& event.keyCode == jQuery.ui.keyCode.ESCAPE && self.close(event));
				})
				.attr({
					role: 'dialog',
					'aria-labelledby': titleId
				})
				.mousedown(function(event) {
					self.moveToTop(false, event);
				}),

			uiDialogContent = this.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ' +
					'ui-widget-content')
				.appendTo(uiDialog),

			uiDialogTitlebar = (this.uiDialogTitlebar = jQuery('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'ui-corner-all ' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog),

			uiDialogTitlebarClose = jQuery('<a href="#"/>')
				.addClass(
					'ui-dialog-titlebar-close ' +
					'ui-corner-all'
				)
				.attr('role', 'button')
				.hover(
					function() {
						uiDialogTitlebarClose.addClass('ui-state-hover');
					},
					function() {
						uiDialogTitlebarClose.removeClass('ui-state-hover');
					}
				)
				.focus(function() {
					uiDialogTitlebarClose.addClass('ui-state-focus');
				})
				.blur(function() {
					uiDialogTitlebarClose.removeClass('ui-state-focus');
				})
				.mousedown(function(ev) {
					ev.stopPropagation();
				})
				.click(function(event) {
					self.close(event);
					return false;
				})
				.appendTo(uiDialogTitlebar),

			uiDialogTitlebarCloseText = (this.uiDialogTitlebarCloseText = jQuery('<span/>'))
				.addClass(
					'ui-icon ' +
					'ui-icon-closethick'
				)
				.text(options.closeText)
				.appendTo(uiDialogTitlebarClose),

			uiDialogTitle = jQuery('<span/>')
				.addClass('ui-dialog-title')
				.attr('id', titleId)
				.html(title)
				.prependTo(uiDialogTitlebar);

		uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

		(options.draggable && jQuery.fn.draggable && this._makeDraggable());
		(options.resizable && jQuery.fn.resizable && this._makeResizable());

		this._createButtons(options.buttons);
		this._isOpen = false;

		(options.bgiframe && jQuery.fn.bgiframe && uiDialog.bgiframe());
		(options.autoOpen && this.open());
		
	},

	destroy: function() {
		(this.overlay && this.overlay.destroy());
		this.uiDialog.hide();
		this.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content ui-widget-content')
			.hide().appendTo('body');
		this.uiDialog.remove();

		(this.originalTitle && this.element.attr('title', this.originalTitle));
	},

	close: function(event) {
		var self = this;
		
		if (false === self._trigger('beforeclose', event)) {
			return;
		}

		(self.overlay && self.overlay.destroy());
		self.uiDialog.unbind('keypress.ui-dialog');

		(self.options.hide
			? self.uiDialog.hide(self.options.hide, function() {
				self._trigger('close', event);
			})
			: self.uiDialog.hide() && self._trigger('close', event));

		jQuery.ui.dialog.overlay.resize();

		self._isOpen = false;
		
		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		if (self.options.modal) {
			var maxZ = 0;
			jQuery('.ui-dialog').each(function() {
				if (this != self.uiDialog[0]) {
					maxZ = Math.max(maxZ, jQuery(this).css('z-index'));
				}
			});
			jQuery.ui.dialog.maxZ = maxZ;
		}
	},

	isOpen: function() {
		return this._isOpen;
	},

	// the force parameter allows us to move modal dialogs to their correct
	// position on open
	moveToTop: function(force, event) {

		if ((this.options.modal && !force)
			|| (!this.options.stack && !this.options.modal)) {
			return this._trigger('focus', event);
		}
		
		if (this.options.zIndex > jQuery.ui.dialog.maxZ) {
			jQuery.ui.dialog.maxZ = this.options.zIndex;
		}
		(this.overlay && this.overlay.jQueryel.css('z-index', jQuery.ui.dialog.overlay.maxZ = ++jQuery.ui.dialog.maxZ));

		//Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
		//  http://ui.jquery.com/bugs/ticket/3193
		var saveScroll = { scrollTop: this.element.attr('scrollTop'), scrollLeft: this.element.attr('scrollLeft') };
		this.uiDialog.css('z-index', ++jQuery.ui.dialog.maxZ);
		this.element.attr(saveScroll);
		this._trigger('focus', event);
	},

	open: function() {
		if (this._isOpen) { return; }

		var options = this.options,
			uiDialog = this.uiDialog;

		this.overlay = options.modal ? new jQuery.ui.dialog.overlay(this) : null;
		(uiDialog.next().length && uiDialog.appendTo('body'));
		this._size();
		this._position(options.position);
		uiDialog.show(options.show);
		this.moveToTop(true);

		// prevent tabbing out of modal dialogs
		(options.modal && uiDialog.bind('keypress.ui-dialog', function(event) {
			if (event.keyCode != jQuery.ui.keyCode.TAB) {
				return;
			}

			var tabbables = jQuery(':tabbable', this),
				first = tabbables.filter(':first')[0],
				last  = tabbables.filter(':last')[0];

			if (event.target == last && !event.shiftKey) {
				setTimeout(function() {
					first.focus();
				}, 1);
			} else if (event.target == first && event.shiftKey) {
				setTimeout(function() {
					last.focus();
				}, 1);
			}
		}));

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		jQuery([])
			.add(uiDialog.find('.ui-dialog-content :tabbable:first'))
			.add(uiDialog.find('.ui-dialog-buttonpane :tabbable:first'))
			.add(uiDialog)
			.filter(':first')
			.focus();

		this._trigger('open');
		this._isOpen = true;
	},

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			uiDialogButtonPane = jQuery('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-widget-content ' +
					'ui-helper-clearfix'
				);

		// if we already have a button pane, remove it
		this.uiDialog.find('.ui-dialog-buttonpane').remove();

		(typeof buttons == 'object' && buttons !== null &&
			jQuery.each(buttons, function() { return !(hasButtons = true); }));
		if (hasButtons) {
			jQuery.each(buttons, function(name, fn) {
				jQuery('<button type="button"></button>')
					.addClass(
						'ui-state-default ' +
						'ui-corner-all'
					)
					.text(name)
					.click(function() { fn.apply(self.element[0], arguments); })
					.hover(
						function() {
							jQuery(this).addClass('ui-state-hover');
						},
						function() {
							jQuery(this).removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						jQuery(this).addClass('ui-state-focus');

					})
					.blur(function() {
						jQuery(this).removeClass('ui-state-focus');
					})
					.appendTo(uiDialogButtonPane);
			});
			uiDialogButtonPane.appendTo(this.uiDialog);
		}
	},

	_makeDraggable: function() {
		var self = this,
			options = this.options,
			heightBeforeDrag;

		this.uiDialog.draggable({
			cancel: '.ui-dialog-content',
			handle: '.ui-dialog-titlebar',
			containment: 'document',
			start: function() {
				heightBeforeDrag = options.height;
				jQuery(this).height(jQuery(this).height()).addClass("ui-dialog-dragging");
				(options.dragStart && options.dragStart.apply(self.element[0], arguments));
			},
			drag: function() {
				(options.drag && options.drag.apply(self.element[0], arguments));
			},
			stop: function() {
				jQuery(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
				(options.dragStop && options.dragStop.apply(self.element[0], arguments));
				jQuery.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function(handles) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var self = this,
			options = this.options,
			resizeHandles = typeof handles == 'string'
				? handles
				: 'n,e,s,w,se,sw,ne,nw';

		this.uiDialog.resizable({
			cancel: '.ui-dialog-content',
			alsoResize: this.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: options.minHeight,
			start: function() {
				jQuery(this).addClass("ui-dialog-resizing");
				(options.resizeStart && options.resizeStart.apply(self.element[0], arguments));
			},
			resize: function() {
				(options.resize && options.resize.apply(self.element[0], arguments));
			},
			handles: resizeHandles,
			stop: function() {
				jQuery(this).removeClass("ui-dialog-resizing");
				options.height = jQuery(this).height();
				options.width = jQuery(this).width();
				(options.resizeStop && options.resizeStop.apply(self.element[0], arguments));
				jQuery.ui.dialog.overlay.resize();
			}
		})
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
	},

	_position: function(pos) {
		var wnd = jQuery(window), doc = jQuery(document),
			pTop = doc.scrollTop(), pLeft = doc.scrollLeft(),
			minTop = pTop;

		if (jQuery.inArray(pos, ['center','top','right','bottom','left']) >= 0) {
			pos = [
				pos == 'right' || pos == 'left' ? pos : 'center',
				pos == 'top' || pos == 'bottom' ? pos : 'middle'
			];
		}
		if (pos.constructor != Array) {
			pos = ['center', 'middle'];
		}
		if (pos[0].constructor == Number) {
			pLeft += pos[0];
		} else {
			switch (pos[0]) {
				case 'left':
					pLeft += 0;
					break;
				case 'right':
					pLeft += wnd.width() - this.uiDialog.outerWidth();
					break;
				default:
				case 'center':
					pLeft += (wnd.width() - this.uiDialog.outerWidth()) / 2;
			}
		}
		if (pos[1].constructor == Number) {
			pTop += pos[1];
		} else {
			switch (pos[1]) {
				case 'top':
					pTop += 0;
					break;
				case 'bottom':
					pTop += wnd.height() - this.uiDialog.outerHeight();
					break;
				default:
				case 'middle':
					pTop += (wnd.height() - this.uiDialog.outerHeight()) / 2;
			}
		}

		// prevent the dialog from being too high (make sure the titlebar
		// is accessible)
		pTop = Math.max(pTop, minTop);
		this.uiDialog.css({top: pTop, left: pLeft});
	},

	_setData: function(key, value){
		(setDataSwitch[key] && this.uiDialog.data(setDataSwitch[key], value));
		switch (key) {
			case "buttons":
				this._createButtons(value);
				break;
			case "closeText":
				this.uiDialogTitlebarCloseText.text(value);
				break;
			case "dialogClass":
				this.uiDialog
					.removeClass(this.options.dialogClass)
					.addClass(uiDialogClasses + value);
				break;
			case "draggable":
				(value
					? this._makeDraggable()
					: this.uiDialog.draggable('destroy'));
				break;
			case "height":
				this.uiDialog.height(value);
				break;
			case "position":
				this._position(value);
				break;
			case "resizable":
				var uiDialog = this.uiDialog,
					isResizable = this.uiDialog.is(':data(resizable)');

				// currently resizable, becoming non-resizable
				(isResizable && !value && uiDialog.resizable('destroy'));

				// currently resizable, changing handles
				(isResizable && typeof value == 'string' &&
					uiDialog.resizable('option', 'handles', value));

				// currently non-resizable, becoming resizable
				(isResizable || this._makeResizable(value));
				break;
			case "title":
				jQuery(".ui-dialog-title", this.uiDialogTitlebar).html(value || '&nbsp;');
				break;
			case "width":
				this.uiDialog.width(value);
				break;
		}

		jQuery.widget.prototype._setData.apply(this, arguments);
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var options = this.options;

		// reset content sizing
		this.element.css({
			height: 0,
			minHeight: 0,
			width: 'auto'
		});

		// reset wrapper sizing
		// determine the height of all the non-content elements
		var nonContentHeight = this.uiDialog.css({
				height: 'auto',
				width: options.width
			})
			.height();

		this.element
			.css({
				minHeight: Math.max(options.minHeight - nonContentHeight, 0),
				height: options.height == 'auto'
					? 'auto'
					: Math.max(options.height - nonContentHeight, 0)
			});
	}
});

jQuery.extend(jQuery.ui.dialog, {
	version: "1.7.2",
	defaults: {
		autoOpen: true,
		bgiframe: false,
		buttons: {},
		closeOnEscape: true,
		closeText: 'close',
		dialogClass: '',
		draggable: true,
		hide: null,
		height: 'auto',
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 150,
		modal: false,
		position: 'center',
		resizable: true,
		show: null,
		stack: true,
		title: '',
		width: 300,
		zIndex: 1000
	},

	getter: 'isOpen',

	uuid: 0,
	maxZ: 0,

	getTitleId: function(jQueryel) {
		return 'ui-dialog-title-' + (jQueryel.attr('id') || ++this.uuid);
	},

	overlay: function(dialog) {
		this.jQueryel = jQuery.ui.dialog.overlay.create(dialog);
	}
});

jQuery.extend(jQuery.ui.dialog.overlay, {
	instances: [],
	maxZ: 0,
	events: jQuery.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function(event) { return event + '.dialog-overlay'; }).join(' '),
	create: function(dialog) {
		if (this.instances.length === 0) {
			// prevent use of anchors and inputs
			// we use a setTimeout in case the overlay is created from an
			// event that we're going to be cancelling (see #2804)
			setTimeout(function() {
				// handle jQuery(el).dialog().dialog('close') (see #4065)
				if (jQuery.ui.dialog.overlay.instances.length) {
					jQuery(document).bind(jQuery.ui.dialog.overlay.events, function(event) {
						var dialogZ = jQuery(event.target).parents('.ui-dialog').css('zIndex') || 0;
						return (dialogZ > jQuery.ui.dialog.overlay.maxZ);
					});
				}
			}, 1);

			// allow closing by pressing the escape key
			jQuery(document).bind('keydown.dialog-overlay', function(event) {
				(dialog.options.closeOnEscape && event.keyCode
						&& event.keyCode == jQuery.ui.keyCode.ESCAPE && dialog.close(event));
			});

			// handle window resize
			jQuery(window).bind('resize.dialog-overlay', jQuery.ui.dialog.overlay.resize);
		}

		var jQueryel = jQuery('<div></div>').appendTo(document.body)
			.addClass('ui-widget-overlay').css({
				width: this.width(),
				height: this.height()
			});

		(dialog.options.bgiframe && jQuery.fn.bgiframe && jQueryel.bgiframe());

		this.instances.push(jQueryel);
		return jQueryel;
	},

	destroy: function(jQueryel) {
		this.instances.splice(jQuery.inArray(this.instances, jQueryel), 1);

		if (this.instances.length === 0) {
			jQuery([document, window]).unbind('.dialog-overlay');
		}

		jQueryel.remove();
		
		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		var maxZ = 0;
		jQuery.each(this.instances, function() {
			maxZ = Math.max(maxZ, this.css('z-index'));
		});
		this.maxZ = maxZ;
	},

	height: function() {
		// handle IE 6
		if (jQuery.browser.msie && jQuery.browser.version < 7) {
			var scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
			var offsetHeight = Math.max(
				document.documentElement.offsetHeight,
				document.body.offsetHeight
			);

			if (scrollHeight < offsetHeight) {
				return jQuery(window).height() + 'px';
			} else {
				return scrollHeight + 'px';
			}
		// handle "good" browsers
		} else {
			return jQuery(document).height() + 'px';
		}
	},

	width: function() {
		// handle IE 6
		if (jQuery.browser.msie && jQuery.browser.version < 7) {
			var scrollWidth = Math.max(
				document.documentElement.scrollWidth,
				document.body.scrollWidth
			);
			var offsetWidth = Math.max(
				document.documentElement.offsetWidth,
				document.body.offsetWidth
			);

			if (scrollWidth < offsetWidth) {
				return jQuery(window).width() + 'px';
			} else {
				return scrollWidth + 'px';
			}
		// handle "good" browsers
		} else {
			return jQuery(document).width() + 'px';
		}
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var jQueryoverlays = jQuery([]);
		jQuery.each(jQuery.ui.dialog.overlay.instances, function() {
			jQueryoverlays = jQueryoverlays.add(this);
		});

		jQueryoverlays.css({
			width: 0,
			height: 0
		}).css({
			width: jQuery.ui.dialog.overlay.width(),
			height: jQuery.ui.dialog.overlay.height()
		});
	}
});

jQuery.extend(jQuery.ui.dialog.overlay.prototype, {
	destroy: function() {
		jQuery.ui.dialog.overlay.destroy(this.jQueryel);
	}
});

})(jQuery);
		
var baseURL = "notset"
var ajaxURL = "notset";
var userParams = new Object();
var fbbaseURL = "notset"
var fbajaxURL = "notset";
var isPageLoad=true;
var queryParams = new Object();
var apiKey = "";
var ajaxBusyTag = "";
var userStatus = "";
var ClientId = "";
var ClientIdImg = "";
var user= new Object();
var connectURL = "";
var connectPlatform ="";
var platform = "facebook";
var recaptchaPublicKey = "";
var user= new Object();
var flagCommentId="";
var previousErrorMsgId = "";
var commentTextGlobal = "";
var frameLoginSrc="";
var totalSplits=0;
var currentSplit=0;   
var isSplitComment="N";
var splitCommenttext="";
var profanityResponseCnt=0;
var isProfanityWord = "false";
var isSpamWord = "false";
var commentSplitLimit=1000;
var siteLoginEnabled="";
var splitsCompleted=0;
var commentTextResult=new Array();
function connect_init() {
       if(clientParams.showName=="blastr"){
         $("#fbc_commentsLink").css("marginRight","102px");
       }
	if (!validateLaunchTime()) {
		return;
	}
	// init our globals
	// clearly hardcoding this is pretty sad_face. Although this version has the
	// fbcClientId set
	// within the script tag in the header, we could just make this dynamic off
	// of the domain name
	//getFBClientIdFromDomainName();
	get_required_url();
	// Make sure we're not conflicting anywhere. I've tested and verified that
	// if there's already
	// a noConflict() call to an existing jQuery implementation that this jQuery
	// reference will not
	// interfere with it. However, it would probably be smarter to just change
	// this file slightly if
	// a client is already using jQuery and has setup a noConflict function
	if (typeof jQuery == '' || typeof jQuery == 'undefined') {
		jQuery = jQuery.noConflict();
	}	
	// Make sure this is the executed before any render calls can be fired to
	// avoid any race conditions
	processAuthenticationParams();	
	if (readCookie('redirectToLogin') == "true" && getLoggedInState() == 'N')
	{
		if (typeof ssoSignIn == "function")
		{
			ssoSignIn();
		}
	}
	if (apiKey == null || apiKey == '') {
		getAppParams();
	}	
    redirectUser();
    if (loggedInContainerSite || (readCookie("snas") != 'undefined' && readCookie("snas") != undefined && readCookie("snas") != '' && getLoggedInState() == 'Y')) {
    	platform = "snas";
    }
    var twitterLoginStatus = readCookie("isUserLoggedIn");
    if(twitterLoginStatus == "true" && getFacebookLogInState() == "N"){
         platform = "twitter";
      	twiterconnect_init();
    }
	if (getFBconnectedState() == "Y")
	{
		platform = "facebook"; 
    }
	//validateTitle();
    fbc_init();  
    //addViewCount();

}
function connect_onload_functions(){
/* facebook_onload_functions are defined in clientParams
 * Read the onload functions defined and call them
 */
 if (facebook_onload_function){
 	return;
 }
 facebook_onload_function = 1;
 var loadFunction = '';
 for (var i=0; i < clientParams.onLoginReadyFunctions.functions.length; i++){
 	loadFunction = eval(clientParams.onLoginReadyFunctions.functions[i].name+"()");
 	loadFunction;
 }

}

function get_required_url(){
	var fullDomainArray = new Array();
	fullDomainArray = String(window.location).split("/");
	fbconnectURL = fullDomainArray[0] + "//" + fullDomainArray[2];
	//fbcClientId - defined in custom js
	baseURL = viralappsURL + "public/fbconnect/" + fbcClientId + "/";
	ajaxURL = baseURL + "index.php";
	ajaxBusyTag = '<div style="width:100%;height:350px;padding-top:230px;padding-left:45%;"><img src="' + baseURL + 'img/ajax-loader.gif?v=5" ></div>';
}

function stripHTML(s){
	var str = '';
	var re1 = /<\S[^><]*>/g;	
	var re2 = /<\S[^><]*/g;
	str = s.replace(re1, "");
	str = str.replace(re2, "");
	return str;
}

function redirect(link) {
	if (link != ''){
		window.location = link;
	}
}

//this method is useful when we enable merge to snas
function isNewUser() {
	//the same copy which is used in processAuhtenticationParams
	//copied here to avoid the Ajax call done in processAuthenticationParams
	userParams = new Object();
	var userCookies = document.cookie.split(';');
	for ( var i = 0; i < userCookies.length; i++) {
		if (userCookies[i].indexOf(apiKey) != -1 || (userCookies[i].indexOf('sn_nbc') != -1 && siteLoginEnabled == 'Y') || userCookies[i].indexOf('isUserLoggedIn') != -1) {
			var attribute = userCookies[i].split('=');
			var name = attribute[0];

			var value = attribute[1];
			userParams[name] = value;
		}
	}	
	if (ajaxURL == 'notset'){
		get_required_url();
	}
	var fullURL = ajaxURL + "?controller=Ajax";
	var date = new Date();
	var clientParamsArray=new Array("showName");
	var queryParams = {
			"requestedController" :"Account",
			"requestedMethod" :"isNewUser",
			"loggedIn" :getLoggedInState(),
			"showName" :clientParams.showName
		};		
	
	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
	}
	
	jQuery.ajax(
		{
			type :"GET",
			url :fullURL,
			data :queryParams,
			dataType :"jsonp",
			success : function(data)
			{
				if (data.isNewUser) {
					popUpMergeBox();
				} else {
					getUserProfile();
					connect_onload_functions();
				}
			},
			error : function(request, textStatus, thrownError)
			{
				//alert('An error has occured ' + textStatus);
			}
		});

}

function validateTitle() {
	if (typeof clientParams.content == 'undefined') {
		return '';
	}
	if (typeof clientParams.content.id == 'undefined') {
		return '';
	}
	var titleLength = clientParams.content.id.length;
	var contentTitle = clientParams.content.id;
	var pageURL = document.location.href;
	if (titleLength > 90) {
		if (ajaxURL == 'notset'){
			get_required_url();
		}
		var fullURL = ajaxURL + "?controller=Ajax";
		var date = new Date();
		var queryParams =
			{
				"requestedController" :"Mail",
				"requestedMethod" :"reportTitleIssue",
				"loggedIn" :getLoggedInState(),
				"showName" :clientParams.showName,
				"pageURL"  :pageURL,
				"titleLength" :titleLength,
				"contentTitle" :contentTitle
			};
		
		jQuery.ajax(
			{
				type :"GET",
				url :fullURL,
				data :queryParams,
				dataType :"jsonp",
				success : function(data)
				{		
					//alert(data.sendMailResponse);			
				},
				error : function(request, textStatus, thrownError)
				{
					//alert('An error has occured ' + textStatus);
				}
			});		
	}
}

function validateLaunchTime(){
	return true;
	var currentDate = new Date();
	var cookieName = "user_has_enabled_cookie_set";
	var cookieValue = getCookieValue(cookieName);
	var returnValue = false;
	if (cookieValue == 'Y'){
		//alert ("User has cookie set");		
		returnValue = true;
	}else{	
	  //alert ("User does not have launch enabled cookie set");
	 //alert(currentDate.toGMTString());
	 //alert(launchTime.toGMTString());
	 var utcLaunchTime = Date.UTC(launchTime.getYear(),launchTime.getMonth(),launchTime.getDate(),launchTime.getHours(),launchTime.getMinutes(),launchTime.getSeconds()) ;
	 var utcCurrentDate = Date.UTC(currentDate.getYear(),currentDate.getMonth(),currentDate.getDate(),currentDate.getHours(),currentDate.getMinutes(),currentDate.getSeconds()) ;
	 //alert('Launch time is '+utcLaunchTime);
	 //alert('Current time is '+utcCurrentDate);
	  if(utcCurrentDate  >= (utcLaunchTime + 1*40*60*1000)){
		  returnValue = true;
	  }else{		 
		switch (getTimeZone(currentDate)){
		case "EST":
			//alert("EST")
			if(isWinningUser()){
				createCookie(cookieName,'Y','');
				returnValue = true;
			}
			break;		 
		case "PST":
			//alert("PST")
			if(isWinningUser() && (utcCurrentDate >= (utcLaunchTime + 3*60*60*1000))){
				createCookie(cookieName,'Y','');
				returnValue = true;
			}
			break;
		case "CST":
			//alert("CST")
			if(isWinningUser() && (utcCurrentDate >= (utcLaunchTime + 1*60*60*1000))){
				createCookie(cookieName,'Y','');
				returnValue = true;
			}
			break;
		case "MST":
			//alert("MST")
			if(isWinningUser && (utcCurrentDate >= (utcLaunchTime+ 1*60*60*1000))){
				createCookie(cookieName,'Y','');
				returnValue = true;
			} 		
		
		}
	  }
	}
	//alert (returnValue);
	return returnValue;
}

function getCookieValue(cookieName){
	var userCookies = document.cookie.split(';');
	for ( var i = 0; i < userCookies.length; i++) {
		if (userCookies[i].indexOf(cookieName) != -1 ) {
			var attribute = userCookies[i].split('=');
			return attribute[1];			
		}
	}
}

function getTimeZone(dateValue){
	var offset = (dateValue.getTimezoneOffset()/ 60) +  getDayLightSavings();
	if (offset == 5){
		return "EST";
	}else if(offset == 6){
		return "CST";
	}else if(offset == 7){
		return "MST";
	}else if(offset == 8){
		return "PST";
	}else{
		return "";
	}

}

function getDayLightSavings(){ 
	var gmt = new Date;
	var lsm = new Date;
	var lso = new Date;
	lsm.setMonth(2); // March
	lsm.setDate(31);
	var day = lsm.getDay();// day of week of 31st
	lsm.setDate(31-day); // last Sunday
	lso.setMonth(9); // October
	lso.setDate(31);
	day = lso.getDay();
	lso.setDate(31-day);
	if (gmt < lsm || gmt >= lso) 
		return 0
	else
		return 1;
}

function isWinningUser(){
	var randomNumber = Math.floor(Math.random()*100);
    var winningNumber = 10;
    var returnValue = false;
	if(winningNumber == randomNumber){
		returnValue = true;
	}else{
		returnValue = false;
	}
	//alert('Winning User statust' +returnValue);
	return returnValue;
	
}

function isContentTitleBlackListed() {
	if (typeof clientParams.content == 'undefined') {
		return '';
	}
	if (typeof clientParams.content.id == 'undefined') {
		return '';
	}
	var currentTitle = clientParams.content.id;
	var blackListedTitles = new Array("gallery_2189","gallery_1159");
	
	for (var i in blackListedTitles) {
		if (currentTitle.indexOf(blackListedTitles[i]) != -1) {
			return true;
		}
	}
}

function executeCallbackfunctions(functionArr) {  
	 var loadFunction = '';
	 for (var i=0; i < functionArr.length; i++){
	 	loadFunction = eval(functionArr[i]+"()");
	 	loadFunction;
	 }
}

function closeButton() {
	document.getElementById('balloon').style.display = 'none';
	createCookie("disable_bubble_message",1,1);
}

function flagComment(commentId,commentText) {
  flagCommentId = commentId;
  isCommentingAnnon = 'Y';
  if (getLoggedInState() == 'Y') {
		isCommentingAnnon = 'N';
  }
  var dialogContent = '<div><div class="flag_improper">Flag as Inappropriate</div><span class="reason_text">Reason</span><br>'
                      +'<textarea id="report_Comment" style="width:268px;margin-left:0px;" rows=5 cols=25></textarea><span id="report_Comment_id" class="report_Comment_id_errormsg">'+clientParams.messages.commentTextFlag+'</span><div class="fbc_form_multi_buttons"><button class="fbc_cancel_btn" type="button" onclick="cancelFlagForm();"></button><button class="fbc_submitflag_btn" type="button" onclick="closeReportComment('+commentId+',\''+commentText+'\');return false;"></button></div></div>';
  jQuery("#fbc_messages_id").html(dialogContent);
  jQuery("#fbc_messages_id").dialogCustom({autoOpen: false, modal: true,draggable: false, resizable: false,	commentId :commentId,isCommentingAnnon :isCommentingAnnon
});
  jQuery("#fbc_messages_id").dialogCustom('open');
}

function closeReportComment(commentId,commentText){
  //jQuery("#fbc_messages_id").dialogCustom('close');  
  var userReportComment = jQuery('#report_Comment').val();  
  userReportComment = trim(stripHTML(userReportComment));
  if(userReportComment ==""){
	  //alert("Please enter a valid comment");
	  jQuery('#report_Comment').val("");
	  jQuery('#report_Comment').focus();
	  inlineErrorMsg('report_Comment','report_Comment_id');
	  return false;
  }
  jQuery("#fbc_messages_id").dialogCustom('close');
  reportComment(commentId,commentText,userReportComment);
}

function cancelFlagForm() {
jQuery("#fbc_messages_id").dialogCustom('close');  
jQuery('#report_Comment').val("");
}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else {
		var expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
	if (jQuery.trim( name ) == 'snas' || jQuery.trim( name ) == 'sn_nbc_b'){
		document.cookie = name + "=" + value + expires + "; path=/";
	}
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for ( var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function clearAuthenticationCookies() {
	var userCookies = document.cookie.split(';');
	for ( var i = 0; i < userCookies.length; i++) {
		if (userCookies[i].indexOf(apiKey) != -1 || userCookies[i].indexOf("udata") != -1 || userCookies[i].indexOf("sn_nbc") != -1 || userCookies[i].indexOf("snas") != -1  || userCookies[i].indexOf("isUserLoggedIn") != -1 || userCookies[i].indexOf(clientParams.showName) != -1 || userCookies[i].indexOf("fbsr_") != -1) {
			var attribute = userCookies[i].split('=');
			var name = attribute[0];
			if (name != "snas_noinfo")
			{
			eraseCookie(name);
		}
		}

	}
}
function redirectUser(){
	if(window.location.href.indexOf("oauth_token")!=-1){
		window.opener.displayProfileContent();
		window.close();
	}
}


function eraseCookie(name) {
	createCookie(name, "", -1);
}

function trim(str) {
	/*
	 * var l = 0; var r = s.length - 1; while (l < s.length && s[l] == ' ') { l++; }
	 * while (r > l && s[r] == ' ') { r -= 1; } return s.substring(l, r + 1);
	 */
	return jQuery.trim(str);
}


 function refreshCommentsSection() {
 	return;
	 if(commentPageNumber==1&& commentSectionIsFriends=='N'&& trim(jQuery("#fbc_userComment").val())=='' && refreshComments == 1)
	 {
	   	renderComments('1', 'N');
	 }	
 } 

function getBrowserType(){
	jQuery.each(jQuery.browser, function(i, val) {
      if (val == true){
      	browserType = i;
      }
    });	
    if (browserType == 'msie' && jQuery.browser.version == '6.0'){
    	browserVersion = 'msie6';
    }
    if (browserType == 'mozilla') { 
    	browsername = navigator.userAgent.split(" ");  
    	strLength = browsername.length;
    	for (var i = 0; i < strLength; i++) {
    		if (browsername[i].indexOf('firefox') != -1 || browsername[i].indexOf('Firefox') != -1) {
		    	currentBrowser = browsername[i];
		    	currBrowserArr = currentBrowser.split("/");
	    	}
    	}
    	if (typeof currBrowserArr[1] != 'undefined') {
    		mozillaVersion = currBrowserArr[1].substr(0,3);
    	}
    }
}

function replaceSpecialChar(postedBy){
  //if(isNameValidation == 'Y' || isNameValidation == 'y'){
    var postedBy = postedBy.replace(/[^a-zA-Z0-9[\s]]/g,specialCharReplace);    
  //}
  return postedBy;
}

function isAlphaNumeric(val) {
	if (typeof val != "undefined" && val != '' && val != null) {
		if (val.match(/[^a-zA-Z0-9\f\n\r\t\v\u00A0\u2028\u2029\s]/g))
		{
			return false;
		}
	}
}

/*
 * This function is a cross-browser solution to loading JS files dynamically. In
 * our case, we're loading jQuery and then want to call noConflict to avoid any
 * namespace collisions
 * 
 */
function include_js(file, callback) {
	var html_doc = document.getElementsByTagName('head')[0];
	js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', file);
	html_doc.appendChild(js);
	js.onreadystatechange = function() {
		if (js.readyState == 'complete' || js.readyState == 'loaded') {
			callback();
		}
	}
	js.onload = function() {
		callback();
	}
	return false;
}


/*
 * Do a page refresh after login state changes. This is the easiest but not the
 * only way to pick up changes. If you have a small amount of Facebook-specific
 * content on a large page, then you could change it in Javascript without
 * refresh.
 */
function processAuthenticationParams() {
	userParams = new Object();
       user = {}; 
	var attribute = '';
	var name = '';
	var value  = '';
	var userCookies = document.cookie.split(';');
	for ( var i = 0; i < userCookies.length; i++) {
		if ((userCookies[i].indexOf(apiKey) != -1 && apiKey != "" && apiKey != "undefined" ) || (userCookies[i].indexOf('sn_nbc') != -1 && siteLoginEnabled == 'Y')  || userCookies[i].indexOf('snas') != -1 ||( userCookies[i].indexOf(clientParams.showName) != -1 && clientParams.showName !="")|| userCookies[i].indexOf('isUserLoggedIn') != -1 || (userCookies[i].indexOf(clientParams.pageName) != -1 && clientParams.pageName !="" && clientParams.pageName !="default" )) {
                    if(userCookies[i].indexOf("fbsr_"+apiKey) != -1){
                     name = "signed_request";
						attribute = userCookies[i].split('=');
						value = attribute[1];
                    }else{
			attribute = userCookies[i].split('=');
			name = attribute[0];
			value = attribute[1];
                    }
//alert(name+value);
			if (jQuery.trim( name ) == "snas"){
				if (value != "exp"){
			userParams[name] = value;
				}
			} else {
				userParams[name] = value;
//alert(userParams[name] + name);
			}
		} else if (userCookies[i].indexOf("udata") != -1 ){	
		    attribute = userCookies[i].split('=');
		    name = jQuery.trim(attribute[0]);
//alert(name);
		    value = attribute[1];
                  userParams[name] = value; 
			switch (name){
				case "udata_uid":
				  user["externalPlatformId"] = value;
				  break;
				case "udata_name":
				  user["name"] = value;
				  break;
				case "udata_first_name":
				  user["loggedInUserName"] = value;
				  break;
				case "udata_pic_square":
				  user["profilePic"] = value;
				  break;
			}
		}
	}

}

function checkFornonAscii(val){
 if(typeof val !='undefined' && val != ''){
   if (val.match(/[^\x00-\x7f\xa1\xbf-\xff]/)) {
       return true;
	}else{
       return false;
    }

 }
}
function splitCommentSave(uid){
isSplitComment = "Y";
if(parentCommentId == ""){
commentText = jQuery("#fbc_userComment").val();
}else{
var commentText = jQuery("#fbc_ReplyuserComment").val();
}
var chunkCnt = Math.ceil(commentText.length/commentSplitLimit);
commentTextResult =  new Array();
for (i=0;i<chunkCnt;i++)
{
startElement = i*commentSplitLimit;
commentTextResult[i]= commentText.slice(startElement ,startElement+commentSplitLimit);
}
totalSplits = commentTextResult.length;
for (i=0;i<commentTextResult.length;i++)
{
splitCommenttext = commentTextResult[i];
currentSplit = i;
eval(splitcommentCallback+"('"+uid+"')");
}


}
var splitcommentCallback="";
function connectSaveComments(callBackFunc) {
	splitcommentCallback = callBackFunc;
	$('#comment_submit_button').attr('disabled', true);
    if(parentCommentId == ""){
        var commentText = jQuery("#fbc_userComment").val();
        commentText = trim(stripHTML(commentText));
	    if(checkFornonAscii(commentText )){
          if(getLoggedInState() == 'Y'){
            inlineErrorMsg('fbc_userComment','fbc_loggedUserComment_errormsg','userComment_post_label','Por favor ingrese su comentario');                   
          }else{
            inlineErrorMsg('fbc_userComment','fbc_userComment_errormsg','userComment_post_label','Por favor ingrese su comentario');
            }
            jQuery("#fbc_userComment").val("");
            jQuery("#fbc_userComment").focus();
            return false;
         }
		if (typeof commentText  == "undefined" || commentText  == "" || commentText == null) {
        //alert('Please Enter the Comment Text');
          if(getLoggedInState() == 'Y'){
            inlineErrorMsg('fbc_userComment','fbc_loggedUserComment_errormsg','userComment_post_label');                   
          }else{
            inlineErrorMsg('fbc_userComment','fbc_userComment_errormsg','userComment_post_label');
            }
            jQuery("#fbc_userComment").val("");
            jQuery("#fbc_userComment").focus();
            return false;
        }else if(trim(stripHTML(commentText)).length>5000){
		  if(getLoggedInState() == 'Y'){
            inlineErrorMsg('fbc_userComment','fbc_loggedUserCommentLimit_errormsg','userComment_post_label');                   
          }else{
            inlineErrorMsg('fbc_userComment','fbc_userCommentLimit_errormsg','userComment_post_label');
            }
			return false;
		} else{
            if(getLoggedInState() == 'Y'){
              resetinlineErrorMsg('fbc_userComment','fbc_loggedUserComment_errormsg','userComment_post_label');
              resetinlineErrorMsg('fbc_userComment','fbc_loggedUserCommentLimit_errormsg','userComment_post_label');                   
			  }else{
                resetinlineErrorMsg('fbc_userComment','fbc_userComment_errormsg','userComment_post_label');
                resetinlineErrorMsg('fbc_userComment','fbc_userCommentLimit_errormsg','userComment_post_label'); 
			  }
        }
    }else{
    	var commentText = jQuery("#fbc_ReplyuserComment").val();
    	commentText = trim(stripHTML(commentText));
		if (typeof commentText  == "undefined" || commentText  == "" || commentText == null ) {
    		inlineErrorMsg('fbc_ReplyuserComment','fbc_ReplyuserComment_errormsg','ReplyCommentLabel');
    		jQuery("#fbc_ReplyuserComment").val("");
        	jQuery("#fbc_ReplyuserComment").focus();
        	return false;
    	}else{
    		resetinlineErrorMsg('fbc_ReplyuserComment','fbc_ReplyuserComment_errormsg','ReplyCommentLabel');
    	}
    }
  	var postedBy = jQuery("#fbc_postedBy").val(); 
    var profileName = user.loggedInUserName;
  	if(parentCommentId != "" ){
        postedBy = jQuery("#fbc_ReplypostedBy").val();
        if (typeof postedBy != "undefined" && postedBy != "" && postedBy != null ) {
        	profileName = trim(postedBy) ;
		}
	 	if ((typeof profileName == "undefined" || profileName == "" || profileName == null) && getLoggedInState() == 'N'  ) {
	 		if (clientParams.showName == "telemundo" || clientParams.showName == "cdn") {
	 			profileName = "Guest";
	 			postedBy = "Guest";
	 		} else {
	        	inlineErrorMsg('fbc_ReplypostedBy','fbc_ReplypostedBy_errormsg','fbc_replyPostedby_label',clientParams.messages.nameEntry);
	    	    jQuery("#fbc_ReplypostedBy").val("");        
	     	    jQuery("#fbc_ReplypostedBy").focus();
	     	    return false;
     	    }
        } else {
			if(trim(postedBy) == '' && getLoggedInState() == 'N' && isAlphaNumeric(postedBy) == false){
            	if(isAlphaNumeric(postedBy) == false || checkFornonAscii(commentText )){ 
                	inlineErrorMsg('fbc_ReplypostedBy','fbc_ReplypostedBy_errormsg','fbc_replyPostedby_label',clientParams.messages.invalidName);
            	}else{
                	inlineErrorMsg('fbc_ReplypostedBy','fbc_ReplypostedBy_errormsg','fbc_replyPostedby_label');
                }
                jQuery("#fbc_ReplypostedBy").val("");        
                jQuery("#fbc_ReplypostedBy").focus();
                return false;
			}else{
            	resetinlineErrorMsg('fbc_ReplypostedBy','fbc_ReplypostedBy_errormsg','fbc_replyPostedby_label');
			}
       }
	}else{ 
    	if (typeof postedBy != "undefined" && postedBy != "" && postedBy != null ) {
    		profileName = trim(postedBy) ;
		}
    	if ((typeof profileName == "undefined" || profileName == "" || profileName == null) && getLoggedInState() == 'N'  ) {
    		//alert('Please Enter the UserName');
	 		if (clientParams.showName == "telemundo" || clientParams.showName == "cdn") {
	 			profileName = "Guest";
	 			postedBy = "Guest";
	 		} else {
	    		inlineErrorMsg('fbc_postedBy','fbc_postedBy_errorMsg','fbc_postedBy_label',clientParams.messages.nameEntry);
	    		jQuery("#fbc_postedBy").val("");        
	     		jQuery("#fbc_postedBy").focus();
	     		return false;
     		}
     	}else{
      		if (isAlphaNumeric(profileName) == false || checkFornonAscii(commentText )){
      			inlineErrorMsg('fbc_postedBy','fbc_postedBy_errorMsg','fbc_postedBy_label',clientParams.messages.invalidName);
    			jQuery("#fbc_postedBy").val("");        
     			jQuery("#fbc_postedBy").focus();
     			return false;
       		}else{
          		resetinlineErrorMsg('fbc_postedBy','fbc_postedBy_errorMsg','fbc_postedBy_label');
       		}
     	} 
  	}
    var postedUserEmailID = jQuery("#fbc_postedUserEmailId").val();
	if(parentCommentId != ""){
	    postedUserEmailID = jQuery("#fbc_ReplypostedUserEmailId").val();
	}
	if (clientParams.showName != "telemundo" && clientParams.showName != "cdn") {
	    if(getLoggedInState() == 'N'){
	    	if (emailCheck(postedUserEmailID)==false  || checkFornonAscii(postedUserEmailID)){
	        	if(parentCommentId == ""){
	                if(postedUserEmailID == ""){
	               	 inlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg2','fbc_topCommentsContainer_emailLabel',clientParams.messages.emailEntry);
	                 }else{
	                     inlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg2','fbc_topCommentsContainer_emailLabel',clientParams.messages.invalidEmail);
	                 } 
	            	jQuery("#fbc_postedUserEmailId").val("");
	              jQuery("#fbc_postedUserEmailId").focus();
	            }else{
	               if(postedUserEmailID == ""){
	                   inlineErrorMsg('fbc_ReplypostedUserEmailId','fbc_ReplypostedUserEmailId_errormsg','fbc_ReplypostedUserEmail_label',clientParams.messages.emailEntry);
	               }else{
	                   inlineErrorMsg('fbc_ReplypostedUserEmailId','fbc_ReplypostedUserEmailId_errormsg','fbc_ReplypostedUserEmail_label',clientParams.messages.invalidEmail);
	               }
	            	jQuery("#fbc_ReplypostedUserEmailId").val("");
	                jQuery("#fbc_ReplypostedUserEmailId").focus();
	            } 
				return false;
			}else{
			  resetinlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg2','fbc_topCommentsContainer_emailLabel');
			  resetinlineErrorMsg('fbc_ReplypostedUserEmailId','fbc_ReplypostedUserEmailId_errormsg','fbc_ReplypostedUserEmail_label');
			}
		}
	}
    if(parentCommentId == ""){
    	var captchaText = jQuery("#recaptcha_response_field").val();
    	if(captchaText ==""){
    		inlineErrorMsg('recaptcha_response_field','fbc_captcha_errorMsg','recaptchaTxtlabel');
    		jQuery("#recaptcha_response_field").val("");
    		jQuery("#recaptcha_response_field").focus();
    		return false;
    	}else{
    		resetinlineErrorMsg('recaptcha_response_field','fbc_captcha_errorMsg','recaptchaTxtlabel');
    	} 
    }else{
    	var captchaText = jQuery("#recaptcha_response_field_reply").val()
    	if(captchaText ==""){
        	inlineErrorMsg('recaptcha_response_field_reply','fbc_reply_captcha_errorMsg','replyrecaptchaTxtlabel');
        	jQuery("#recaptcha_response_field_reply").val("");
        	jQuery("#recaptcha_response_field_reply").focus();
        	return false;
        }else{
        	resetinlineErrorMsg('recaptcha_response_field_reply','fbc_reply_captcha_errorMsg','replyrecaptchaTxtlabel');
        }
    }
	kickappsParentCommentId = parentCommentId;
    commentCallBackFunction  = callBackFunc;
    var twitterLoginStatus = readCookie("isUserLoggedIn");
   	if (getLoggedInState() == 'Y'){
		captchaCallback(commentText)
	} else {
		commentTextGlobal = commentText;
		nameValidateCallback(postedBy);
	}	
}

function inlineErrorMsg(formElementId,errorMsgId,labelId,errorText){
 $('#comment_submit_button').attr('disabled', false);
 if(previousErrorMsgId){
    jQuery("#"+previousErrorMsgId).css({display: "none"});
  }
 if (typeof errorText != 'undefined') {
   jQuery("#"+errorMsgId).html(errorText);
 }        

  previousErrorMsgId = errorMsgId;
 jQuery("#"+formElementId).css({border: "2px solid #B51959"});
 jQuery("#"+errorMsgId).css({display: "block",color: "#B51959"});
 jQuery("#"+labelId).css({color: "#B51959"});
}

function resetinlineErrorMsg(formElementId,errorMsgId,labelId){
 jQuery("#"+formElementId).css({border: "1px solid #9D9D9D"});
 jQuery("#"+errorMsgId).css({display: "none"});
 jQuery("#"+labelId).css({color: "#606060"});
}

function captchaCallback(comment){
	if(isProfanityCheckEnabled == 'Y'){
           if(comment.length>commentSplitLimit){
              splitCommentProfanityCheck(comment);
           }else{  
		profanityCheck(comment); 
           }

	}else{
           evaluvateSaveCallback(comment);
	}
}
function evaluvateSaveCallback(comment){
if(comment.length>commentSplitLimit){
              splitCommentSave(kickappsParentCommentId);
           }else{  
  	     eval(commentCallBackFunction +"('"+kickappsParentCommentId+"')");
           }

}
function nameValidateCallback(comment){
	if(isProfanityCheckEnabled == 'Y'){
		profanityCheckName(comment); 
	}else{
           evaluvateSaveCallback(comment);
	}
}
function splitCommentProfanityCheck(comment)
{
profanityCommentSplitLimit=1000;
var chunkCnt = Math.ceil(comment.length/profanityCommentSplitLimit);
totalSplits = chunkCnt;
commentTextResult =  new Array();
for (i=0;i<chunkCnt;i++) {
startElement = i*profanityCommentSplitLimit;
commentTextResult[i]= comment.slice(startElement ,startElement+profanityCommentSplitLimit);
}
for (i=0;i<commentTextResult.length;i++) {
   if(isProfanityWord == "true" || isSpamWord == "true"){
		break;
    } 
    var request = "http://clientapps.kickapps.com/nbc_prof/widgets/comments/profanity_secure_js.php?checkspam=1&texttocheck=" + escape(commentTextResult[i])+ "&callback=validateText";
    aObj = new JSONscriptRequest(request);
    aObj.buildScriptTag();
    aObj.addScriptTag();

}


}
function validateText(json){
profanityResponseCnt = profanityResponseCnt+1;
	if(json.spam_is_spam==1){
        isSpamWord = "true";
		var errMessage = "Por favor ingrese su comentario";
		if(parentCommentId == ""){  
			if(getLoggedInState() == 'Y'){
				inlineErrorMsg('fbc_userComment','fbc_userCommentLoggedSpam_errormsg2','userComment_post_label',errMessage);
			} else{
				inlineErrorMsg('fbc_userComment','fbc_userCommentSpam_errormsg2','userComment_post_label',errMessage);
			}
		}else{
			inlineErrorMsg('fbc_ReplyuserComment','fbc_ReplyuserCommentSpam_errormsg2','ReplyCommentLabel',errMessage);
		}
		return false;
	} else if(json.result==0){
          if(profanityResponseCnt == totalSplits && isProfanityWord != "true" && isSpamWord != "true"){
             splitCommentSave();   
          } 
	} else {
    	if(json.result==4){
        	//alert("Your comment contains HTML, which is not allowed.");
        } else {
            isProfanityWord = "true";
			jQuery("#fbc_userComment"+kickappsParentCommentId).val("");
            //alert(clientParams.messages.profanityMessage); 
            if(parentCommentId == ""){  
              if(getLoggedInState() == 'Y'){
			  inlineErrorMsg('fbc_userComment','fbc_userCommentLogged_errormsg2','userComment_post_label');
			  } else{
			  inlineErrorMsg('fbc_userComment','fbc_userComment_errormsg2','userComment_post_label');
			  }
             }else{
              inlineErrorMsg('fbc_ReplyuserComment','fbc_ReplyuserComment_errormsg2','ReplyCommentLabel');
             }
    	}
		return false;
    }
}


function profanityCheck(comment) {
   	var request = "http://clientapps.kickapps.com/nbc_prof/widgets/comments/profanity_secure_js.php?checkspam=1&texttocheck=" + escape(comment)+ "&callback=checkedText";
	aObj = new JSONscriptRequest(request);
    aObj.buildScriptTag();
    aObj.addScriptTag();
}

function checkedText(json){
	if(json.spam_is_spam==1){
		var errMessage = "Por favor ingrese su comentario";
		if(parentCommentId == ""){  
		if(getLoggedInState() == 'Y'){
				inlineErrorMsg('fbc_userComment','fbc_userCommentLoggedSpam_errormsg2','userComment_post_label',errMessage);
			} else{
				inlineErrorMsg('fbc_userComment','fbc_userCommentSpam_errormsg2','userComment_post_label',errMessage);
			}
		}else{
			inlineErrorMsg('fbc_ReplyuserComment','fbc_ReplyuserCommentSpam_errormsg2','ReplyCommentLabel',errMessage);
		}
		return false;
	} else if(json.result==0){
		if(getLoggedInState() == 'Y'){
			  resetinlineErrorMsg('fbc_userComment','fbc_userCommentLogged_errormsg2','userComment_post_label');
			  } else{
			  resetinlineErrorMsg('fbc_userComment','fbc_userComment_errormsg2','userComment_post_label');
			  }
    resetinlineErrorMsg('fbc_ReplyuserComment','fbc_ReplyuserComment_errormsg2','ReplyCommentLabel');
		eval(commentCallBackFunction +"('"+kickappsParentCommentId+"')");
		//alert("Your comment does not contain profanity");
	} else {
    	if(json.result==4){
        	//alert("Your comment contains HTML, which is not allowed.");
        } else {
			jQuery("#fbc_userComment"+kickappsParentCommentId).val("");
            //alert(clientParams.messages.profanityMessage); 
            if(parentCommentId == ""){  
              if(getLoggedInState() == 'Y'){
			  inlineErrorMsg('fbc_userComment','fbc_userCommentLogged_errormsg2','userComment_post_label');
			  } else{
			  inlineErrorMsg('fbc_userComment','fbc_userComment_errormsg2','userComment_post_label');
			  }
             }else{
              inlineErrorMsg('fbc_ReplyuserComment','fbc_ReplyuserComment_errormsg2','ReplyCommentLabel');
             }
    	}
		return false;
    }
}

function profanityCheckName(comment) {
   	var request = "http://clientapps.kickapps.com/nbc_prof/widgets/comments/profanity_secure_js.php?texttocheck=" + escape(comment)+ "&callback=checkedTextName";
	aObj = new JSONscriptRequest(request);
    aObj.buildScriptTag();
    aObj.addScriptTag();
}

function checkedTextName(json){
	if(json.result==0){
			resetinlineErrorMsg('fbc_postedBy','fbc_postedBy_errorMsg','fbc_postedBy_label',clientParams.messages.profanityMessageForName);
			captchaCallback(commentTextGlobal);
			//eval(commentCallBackFunction +"('"+kickappsParentCommentId+"')");
		//alert("Your comment does not contain profanity");
	} else {
    	if(json.result==4){
        	//alert("Your comment contains HTML, which is not allowed.");
        } else {
			 if(parentCommentId == ""){  
			jQuery("#fbc_postedBy").val("");
            inlineErrorMsg('fbc_postedBy','fbc_postedBy_errorMsg','fbc_postedBy_label',clientParams.messages.profanityMessageForName);
		     }else{
            jQuery("#fbc_ReplypostedBy").val("");
			inlineErrorMsg('fbc_ReplypostedBy','fbc_ReplypostedBy_errormsg','fbc_replyPostedby_label',clientParams.messages.profanityMessageForName); 
			 }
		  }
		return false;
    }
}

function appendJSObjects(target, source,clientParamsArray) {
	if (source != null) {
		for ( var name in source) {
			if (typeof(source[name]) == 'object') {
				for ( var tempName in source[name]) {
					if(target[tempName]==undefined){
						if (typeof(source[name][tempName]) != 'object') {
							if(clientParamsArray != '' && typeof clientParamsArray != 'undefined'){
			                  if(jQuery.inArray(tempName, clientParamsArray) != -1){
			                    target[tempName] = source[name][tempName];
			                  }                 
               				}				
						}
					}				
				}
			} else if (target[name]==undefined){
				target[name] = source[name];
			}
		}
	}
	return target;
}

function loopparams(source) {
	if (source != null) {
		for ( var name in source) {
			alert(name+": "+source[name]);
		}
	}
}
function appendUserParamObjects(target, source) {
	if (source != null) {
		for ( var name in source) {
			if ((name.indexOf(apiKey + '_expires') != -1)
					|| (name.indexOf(apiKey + '_session_key') != -1)
					|| (name.indexOf(apiKey + '_ss') != -1)
					|| (name.indexOf(apiKey + '_user') != -1)
					|| (name.indexOf(apiKey) != -1)
					|| (name.indexOf('fbsetting_' + apiKey) != -1)
					|| (name.indexOf('sn_nbc') != -1 && siteLoginEnabled == "Y")
					|| (name.indexOf('snas') != -1)|| name.indexOf(clientParams.showName) != -1 || name.indexOf('isUserLoggedIn') != -1 || name.indexOf('signed_request') != -1) {
				if (target[name] == undefined) {
					if (typeof(source[name]) != 'object'){
						target[name] = source[name];
					}
				}
			}
		}
	}
	return target;
}
function showRecaptcha() {
	var showCaptcha = false;
	if(captchaEnabled == 'Y'){
		if(getLoggedInState() == 'Y'){
			if (captchaForPlatformUsers == 'Y'){
				var showCaptcha = true;
			}
		}else{
			var showCaptcha = true;
		}
	}
	if (showCaptcha){     
	 Recaptcha.create(recaptchaPublicKey, "recaptcha_widget", {
	        theme: 'custom',
	        tabindex: 0
	        //callback: Recaptcha.focus_response_field
	  });
		jQuery("#recaptchaDiv").css( {
			display :"block"
		});
	}
}

/*function validateCaptcha()
{
	challengeField = jQuery("#recaptcha_challenge_field").val();
	responseField = jQuery("#recaptcha_response_field").val();
	var queryParams = "challenge="+challengeField+"response="+responseField;
	var fullURL = "http://api-verify.recaptcha.net/verify";
jQuery.ajaxSetup({
        beforeSend: function(xhr) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        xhr.setRequestHeader("Content-length", queryParams.length);
        xhr.setRequestHeader("Connection", "close");
}}); 
     jQuery.ajax(
		{      
                     url :fullURL,
                     type: "POST", 
			data :queryParams,
			dataType :"text",
			success : function(data)
			{
                }
	});
  
}
*/
function validateCaptcha(comment) {
	challengeField = jQuery("#recaptcha_challenge_field").val();
	responseField = jQuery("#recaptcha_response_field").val();
	var queryParams = {
        "requestedController" :"Captcha",
       	"requestedMethod" :"recaptchavalidation",
		"challenge" :challengeField,
		"response" :responseField
	};
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";

      jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" : "validateCaptchaCallBack",
		"success" : function(data) {
    	  if(data.result){
    		  captchaCallback(comment);
          Recaptcha.reload();     	 
          jQuery("#recaptchaTxtlabel").addClass('captcha_success');
    		  jQuery("#recaptchaTxtlabel").html("Enter the words above:");
    	  }else{    		  
    		  jQuery("#recaptchaTxtlabel").addClass('captcha_error');
    		  jQuery("#recaptchaTxtlabel").html(clientParams.messages.captchaError);
    		  Recaptcha.reload();
    	  }
			},
			error : function(request, textStatus, thrownError) {		
			}
	});
}

function emailCheck(str) {

    var at="@"
    var dot="."
    var lat=str.indexOf(at)
    var lstr=str.length
    var ldot=str.indexOf(dot)
    if (str.indexOf(at)==-1){
       //alert("Please enter a valid email address")
      	//jQuery("#fbc_errorMsg").html('Please enter a valid email address');
      	//jQuery("#fbc_errorMsg").css({display:"block"});
      	/*var fbConnectedState = getFBconnectedState();
        dialogContent = 'Please enter a valid email address';
		openModal(dialogContent,fbConnectedState);*/		
		   //inlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg','fbc_topCommentsContainer_emailLabel');
       return false;
    }

    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
       //alert("Invalid E-mail ID")
       //inlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg2','fbc_topCommentsContainer_emailLabel');
       return false;
    }

    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
        //alert("Invalid E-mail ID")
        //inlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg2','fbc_topCommentsContainer_emailLabel');
        return false;
    }

     if (str.indexOf(at,(lat+1))!=-1){
        //alert("Invalid E-mail ID")
        //inlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg2','fbc_topCommentsContainer_emailLabel');
        return false;
     }

     if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
        //alert("Invalid E-mail ID")
        //inlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg2','fbc_topCommentsContainer_emailLabel');
        return false;
     }

     if (str.indexOf(dot,(lat+2))==-1){
        //alert("Invalid E-mail ID")
        //inlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg2','fbc_topCommentsContainer_emailLabel');
        return false;
     }
    
     if (str.indexOf(" ")!=-1){
        //alert("Invalid E-mail ID")
        //inlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg2','fbc_topCommentsContainer_emailLabel');
        return false;
     }
     resetinlineErrorMsg('fbc_postedUserEmailId','fbc_postedUserEmailId_errormsg','fbc_topCommentsContainer_emailLabel');
     return true;          
  }

function renderMainSection() {
	jQuery('#display_comments').html(ajaxBusyTag);
	if (apiKey == null || apiKey == '')
	{
		functionToCallbacks.getAppParams.push("renderMainSection");
		return '';
	}
	if (!userProfileLoaded) {
		functionToCallbacks.getUserProfile.push("renderMainSection");
		return '';
	}
	var twitterLoginStatus = readCookie("isUserLoggedIn");
    platform = "facebook"; 
    processAuthenticationParams();
    if (loggedInContainerSite || (readCookie("snas") != 'undefined' && readCookie("snas") != undefined && readCookie("snas") != '' && getLoggedInState() == 'Y')) {
    	platform = "snas";
    }
	if(twitterLoginStatus == "true" && getFacebookLogInState() == "N"){
         platform = "twitter";
    }
	if (getFBconnectedState() == "Y")
	{
		platform = "facebook"; 
    }

	PageNumber = 1;
	filterByFriends = 'N';
	commentPageNumber = PageNumber;
    commentSectionIsFriends = filterByFriends;
	jQuery("#commentCategory").val(filterByFriends);
	if (ajaxURL == 'notset'){
		get_required_url();
	}
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";
	var userid = getLoggedInUserId();
	var timeStamp = new Date().getTime();
	var clientParamsArray=new Array("contentTitle","id","CommentsPerPage","isReplyEnabled","sortOldestFirst");
	var queryParams = {
			"requestedController" :"Comment",
			"requestedMethod" :"getPollComments",
			"PageNumber" :PageNumber,
			"loggedIn" :getLoggedInState(),
			"filterByFriends" :filterByFriends,
			"overrideCache" : timeStamp,
            "CreateBlogPost": 'Y',
            "platform":platform,
            "showName": clientParams.showName
	};
	
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
	}
	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
	jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" : "getPollCommentsCallbackForrenderMainSection",
		"success" : function(data) {	
       		if ( typeof data.totalCommentCount == 'undefined' || data.totalCommentCount == '' || data.totalCommentCount == null) 	{
					data.totalCommentCount = 0;
				}	
				if ( typeof data.allCommentsCount == 'undefined' || data.allCommentsCount == '' || data.allCommentsCount == null) 	{
					data.allCommentsCount = data.totalCommentCount;
				}		
                //createCookie("isUserLoggedIn", data.loggedIn, 1);
                if (getLoggedInState() == 'Y') {
                  jQuery('#login_button').css({display:"none"});
                }
				totalCommentCount = data.totalCommentCount;
				if(clientParams.showName=="cdn"){
				htmlContent = '(<span id="'+clientParams.content.contentTitle+'_comments_total">'+data.allCommentsCount+'</span>) Comentarios';
				}else{
				htmlContent = '(<span id="'+clientParams.content.contentTitle+'_comments_total">'+data.allCommentsCount+'</span>) Comments';
				}
				
				jQuery('#'+clientParams.content.id+'_Comments').html(htmlContent);				
				jQuery('#'+clientParams.content.id+'_comments_total').html(data.allCommentsCount);
        jQuery('#fbc_totalCommentsCount').html(data.allCommentsCount);
				jQuery('#fbc_toggleCommentsLink').css({display:"block"});
				responseHandler(data,'Comments');
				if (userid != '') {
					eval(data.script);
				}
				//setInterval("refreshCommentsSection()",30000);
			    if(getLoggedInState() == "N" && captchaEnabled == "Y"){			    
                                     showRecaptcha();  
			    }
                          if (getFBconnectedState() == "Y") {
                              //isAdminUser();
                           }
				refreshXFBML();
			},
			error : function(request, textStatus, thrownError) {		
			}
	});
}

function getAppParams() {
	if (ajaxURL == 'notset'){
		get_required_url();
	}
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";
	var date = new Date();
	var queryParams = {
			"requestedController" :"Account",
			"requestedMethod" :"getAppParams",
			"showName" :clientParams.showName,
			"loggedIn" :getLoggedInState()
		};
	
	jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" : "getAppParamsCallback",
		"success" : function(data) {	
				apiKey = data.apiKeyVal;
//alert("apikey"+apiKey);
				templateIds = data.templateIds;
				displayedCommentCount = data.displayedCommentCount;
				mergeToSnasEnabled = data.mergeToSnasEnabled;
				allowAnonPosting = data.allowAnonPosting;
				enablesnasidentity = data.enable_snas_identity;
                           if (typeof data.captchaEnabled != "undefined" ) {
			       	captchaEnabled = data.captchaEnabled;
                           }
                           if (typeof data.captchaForPlatformUsers != "undefined" ) {
       				captchaForPlatformUsers = data.captchaForPlatformUsers;
                           }
                          if (typeof data.anonymousUserReporting != "undefined" ) {
  				anonymousUserReporting = data.anonymousUserReporting;
                          }
                         if (typeof data.isProfanityCheckEnabled != "undefined" ) {
                           isProfanityCheckEnabled = data.isProfanityCheckEnabled;
                         }
                if (typeof data.recaptchaPublicKey != "undefined" ) {
				recaptchaPublicKey = data.recaptchaPublicKey;
				}
				if (typeof data.siteLoginEnabled != "undefined" ) {
				siteLoginEnabled = data.siteLoginEnabled;
				}
				executeCallbackfunctions(functionToCallbacks.getAppParams);
				functionToCallbacks.getAppParams = [];
				//isNameValidation = data.isNameValidation;
                    // processAuthenticationParams();
               //	getUserProfile();
 //if (!facebook_onload_function ) {
		//connect_onload_functions();
	//}
     
			},
			error : function(request, textStatus, thrownError) {		
			}
	});
}


function renderTotalCommentsWithToggle() {
	var displayOnLoad = 'false';
	var htmlContent = '';
	if (typeof clientParams.comments != "undefined" && typeof clientParams.comments.showOnLoad != "undefined") {
		displayOnLoad = clientParams.comments.showOnLoad;
	}
	
	switch (displayOnLoad) {
		case 'true':
			jQuery('#display_comments').css({display:"block"});
			htmlContent += '<a id="fbc_toggleCommentsLink" class="fbc_arrow_right fbc_open" onclick="toggleComments();return false;" href="#">Comments (<span id="fbc_totalCommentsCount"></span>)</a>';		
			break;
		case 'false':
			jQuery('#display_comments').css({display:"none"});
			htmlContent += '<a id="fbc_toggleCommentsLink" class="fbc_arrow_right" onclick="toggleComments();return false;" href="#">Comments (<span id="fbc_totalCommentsCount"></span>)</a>';
			break;
		default:
			jQuery('#display_comments').css({display:"none"});
			htmlContent += '<a id="fbc_toggleCommentsLink" class="fbc_arrow_right" onclick="toggleComments();return false;" href="#">Comments (<span id="fbc_totalCommentsCount"></span>)</a>';
			break;
	}

	
	jQuery('#fbc_commentsLink').html(htmlContent);
}

function renderContentsCommentCount() {
	var contentIdsList = clientParams.contentIdsArray.join(",");
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";
	var clientParamsArray=new Array("contentTitle","id","CommentsPerPage","showName");
	var queryParams =
		{
			"requestedController" :"Comment",
			"loggedIn" :getLoggedInState(),
			"requestedMethod" :"renderContentsCommentCount",
			"contentIdsList" : contentIdsList 
		};
		
	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
	}
	
	jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" : "renderContentsCommentCountCallback",
		"success" : function(data) {	
				var fieldName = '';
				var countVal = '';
				for (var name in data) {
					var htmlContent = '';
					if (typeof data[name].COMMENTS != 'undefined') {
						countVal = data[name].COMMENTS; 
					} else {
						countVal = data[name];
					}
					//htmlContent = '<a href="#" onclick="return false;" class="CommentCount">(<span id="'+name+'_comments_total">'+countVal+'</span>) Comments</a>';
					if(clientParams.showName=="cdn"){
						htmlContent = '(<span id="'+name+'_comments_total">'+countVal+'</span>) Comentarios';
					}else{
					htmlContent = '(<span id="'+name+'_comments_total">'+countVal+'</span>) Comments';
					}
					
					//jQuery('#'+).html(htmlContent);
                                  if(typeof document.getElementById(name+'_Comments') != 'undefined'){
                                      document.getElementById(name+'_Comments').innerHTML = htmlContent ;
                                  }
				}
			},
			error : function(request, textStatus, thrownError) {		
			}
	});			
}



function renderContentsViewCount() {
	var contentIdsList = clientParams.contentIdsArray.join(",");
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";
	var clientParamsArray=new Array("contentTitle","id","CommentsPerPage","showName");
	var queryParams =
		{
			"requestedController" :"Comment",
			"loggedIn" :getLoggedInState(),
			"requestedMethod" :"retrieveViewCount",
			"contentIdsList" : contentIdsList 
		};
		
	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
	}
	
	jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" : "renderContentsCommentCountCallback",
		"success" : function(data) {	
				var fieldName = '';

				for (var name in data) {					
					var countVal = 0;
					if (typeof data[name].VIEWS != 'undefined') {
						countVal = data[name].VIEWS; 
					} else {
						countVal = data[name];
					}
					jQuery('#'+trim(name)+'_Views').html(countVal);
					if(parseInt(countVal)>=parseInt(clientParams.comments.viewCountThreshold)){
                      $('#'+trim(name)+'_viewsCountHolder').removeClass('post_views_purple').addClass('post_views_pink');
					  $('#'+trim(name)+'_viewsCountHolder').html(countVal+'<span class="posting_views_pink_bg">Views</span>');
					}
				}
			},
			error : function(request, textStatus, thrownError) {		
			}
	});			
}








function fillCommentCount() {
	var contentIdsList = clientParams.contentIdsArray.join(",");
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";
	var clientParamsArray=new Array("contentTitle","id","CommentsPerPage","showName");
	var queryParams =
		{
			"requestedController" :"Comment",
			"loggedIn" :getLoggedInState(),
			"requestedMethod" :"retrieveCommentAndViewCount",
			"contentIdsList" : contentIdsList 
		};
		
	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
	}
	
	jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" : "fillCommentCountCallback",
		"success" : function(data) {	
				var fieldName = '';

				for (var name in data) {					
					var countVal = 0;
					if (typeof data[name].COMMENTS != 'undefined') {
						countVal = data[name].COMMENTS; 
					} else {
						countVal = data[name];
					}
					jQuery('#'+trim(name)+'_comments_total').html(countVal);
					if(parseInt(countVal)>=parseInt(clientParams.comments.commentCountThreshold)){
                      $('#'+trim(name)+'_commentCountHolder').removeClass('comment_icon_purple').addClass('comment_icon_pink');
					}

					if (typeof data[name].VIEWS != 'undefined') {
					countVal = data[name].VIEWS; 
					jQuery('#'+trim(name)+'_Views').html(countVal);
					if(parseInt(countVal)>=parseInt(clientParams.comments.viewCountThreshold)){
                      $('#'+trim(name)+'_viewsCountHolder').removeClass('post_views_purple').addClass('post_views_pink');
					  $('#'+trim(name)+'_viewsCountHolder').html(countVal+'<span class="posting_views_pink_bg">Views</span>');
					}
					}
				}
			},
			error : function(request, textStatus, thrownError) {		
			}
	});			
}

function renderContentsCommentAndRatingCount() {
	var contentIdsList = clientParams.contentIdsArray.join(",");
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";
	var clientParamsArray=new Array("contentTitle","id","CommentsPerPage","showName");
	var queryParams =
		{
			"requestedController" :"Comment",
			"loggedIn" :getLoggedInState(),
			"requestedMethod" :"renderMediaStats",
			"contentIdsList" : contentIdsList 
		};
		
	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
	}
	
	jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" : "renderContentsCommentCountCallback",
		"success" : function(data) {	
				var fieldName = '';
				var countVal = '';
				for (var name in data) {
					var htmlContent = '';var ratingDetails= new Object();
					if (typeof data[name].COMMENTS != 'undefined') {
						countVal = data[name].COMMENTS; 
					} else {
						countVal = data[name];
					}
					//htmlContent = '<a href="#" onclick="return false;" class="CommentCount">(<span id="'+name+'_comments_total">'+countVal+'</span>) Comments</a>';
					htmlContent = 'Comments (<span id="'+name+'_comments_total">'+countVal+'</span>)';
					//jQuery('#'+).html(htmlContent);
                                  if(typeof document.getElementById(name+'_Comments') != 'undefined'){
                                      document.getElementById(name+'_Comments').innerHTML = htmlContent ;
                                  }
                                 ratingTemplate = getMultipleStarRatingTemplate();
                                 ratingDetails.ratingInfo=data[name].RATINGS.ratingInfo;
                                 ratingDetails.contentId=data[name].RATINGS.ratingInfo.contentId;
                                 getBrowserType();
                                 ratingDetails.pageName = clientParams.pageName;
                             if (readCookie("isUserLoggedIn") == "true"){
                                  ratingDetails.twitterLoggedInstate = "Y";
                                }else{
                                 ratingDetails.twitterLoggedInstate = "N";  
                               } 
                                ratingDetails.fbcLoggedInstate = getFBconnectedState();          
                                 ratingDetails.userId = getLoggedInUserId();
                                 ratingDetails.browserType = browserType;
                                 ratingDetails.browserVersion = browserVersion;
    			            ratingDetails.mozillaVersion = mozillaVersion;
                                 ratingDetails.fbconnected = getFBconnectedState();
                                 ratingDetails.connectedPlatform = platform;
                                ratingDetails.loggedIn = (getLoggedInState() == "Y") ? 1 : 0;
                                ratingDetails.loggedInContainerSite = loggedInContainerSite;
                                ratingDetails.imgURL = baseURL + 'img/';
                               showName =  clientParams.showName;
                               ratingDetails.showName = showName.toLowerCase().replace(".",""); 
                              if (typeof user == "undefined" || typeof user.loggedInUserName == "undefined" || user.loggedInUserName == null) {
                            	ratingDetails.loggedInUserName = readCookie("udataDetails_first_name");
                           	       ratingDetails.loggedInUser_pic = readCookie("udata_pic_square");
                            	ratingDetails.loggedInUserId = readCookie("udata_uid");
                             } else {
                            	ratingDetails.loggedInUserName = user.loggedInUserName;
                                 	ratingDetails.loggedInUser_pic = user.profilePic;
                                  ratingDetails.loggedInUserId   = user.externalPlatformId;  	 
                              }
                                  ratingDetails.clientSiteId = fbcClientId; 
                                 ratingDetails.contentType ="emedia"; 
                                 ratingDetails.contentUrl = name;
                		      var ratingData = jQuery(name+'_ratingarea').parseTemplate(ratingTemplate,ratingDetails);
                                 document.getElementById(name+'_ratingarea').innerHTML = ratingData;
				}
			},
			error : function(request, textStatus, thrownError) {		
			}
	});			
}



function renderComments(PageNumber, filterByFriends) {	
	processAuthenticationParams();
	jQuery('#fbc_contentContainer').html(ajaxBusyTag);
	commentPageNumber = PageNumber;
    commentSectionIsFriends = filterByFriends;
	jQuery("#commentCategory").val(filterByFriends);
	if (ajaxURL == 'notset'){
		get_required_url();
	}
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";
	var userid = getLoggedInUserId();
	var timeStamp = new Date().getTime();
	var clientParamsArray=new Array("contentTitle","id","CommentsPerPage","showName","isReplyEnabled","sortOldestFirst");
	var queryParams =
		{
			"requestedController" :"Comment",
			"requestedMethod" :"getPollComments",
			"PageNumber" :PageNumber,
			"loggedIn" :getLoggedInState(),
			"filterByFriends" :filterByFriends,
			"overrideCache" : timeStamp,
            "platform":platform,
            "showName" :clientParams.showName 
		};				
		
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
	}
	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
	jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" : "getPollCommentsCallbackForrenderMainSection",
		"success" : function(data) {	

				if ( typeof data.totalCommentCount == 'undefined' || data.totalCommentCount == '' || data.totalCommentCount == null) 	{
					data.totalCommentCount = 0;
				}		
				totalCommentCount = data.totalCommentCount;
				//alert(data.totalCommentCount);
				if(clientParams.showName=="cdn"){
                htmlContent = '(<span id="'+clientParams.content.contentTitle+'_comments_total">'+totalCommentCount+'</span>) Comentarios';
				}else{
				htmlContent = '(<span id="'+clientParams.content.contentTitle+'_comments_total">'+totalCommentCount+'</span>) Comments';
				}
				
				jQuery('#'+clientParams.content.id+'_Comments').html(htmlContent);				
				jQuery('#'+clientParams.content.id+'_comments_total').html(data.allCommentsCount);
				jQuery('#fbc_totalCommentsCount').html(data.allCommentsCount);
				jQuery('#fbc_toggleCommentsLink').css({display:"block"});
				responseHandler(data,'Comments');
				if (userid != '') {
					eval(data.script);
				}
                           if(getLoggedInState() == "N" && captchaEnabled == "Y"){			    
                                     showRecaptcha();  
         			}
         			//setInterval("refreshCommentsSection()",30000);
				refreshXFBML();
			},
			error : function(request, textStatus, thrownError) {		
			}
	});

}

function reportComment(commentId,commentText,userReportComment) {
	var cookieName = "flag_anonymous"+commentId;
	var flag_set = readCookie(cookieName);
	if((getLoggedInState() != 'Y' && flag_set != 1) || getLoggedInState() == 'Y' ){
		if((getLoggedInState() != 'Y' && flag_set != 1)){
			createCookie(cookieName,1,1);
		}
		var username ='';
		username = document.getElementById("connectedUserName"+commentId).innerHTML;
		/*var userid = '';
		userid = getLoggedInUserId();
		if (userid != null && userid != '') {*/
			var fullURL = ajaxURL + "?controller=Ajax";
			var clientParamsArray=new Array("contentTitle","id","CommentsPerPage","showName");
			var queryParams = {
					"requestedController" :"Comment",
					"requestedMethod" :"reportthisComment",
					"loggedIn" :getLoggedInState(),
					"commentID" :commentId,
					"reportedBy":username,
					"message":userReportComment,
          			"commentText":commentText
				};		
				
			if (typeof clientParams.feed.comments.contentType != "undefined" && clientParams.feed.comments.contentType != "" && clientParams.feed.comments.contentType != null){
				var mediaName = clientParams.feed.comments.contentType;
				queryParams['mediaName'] = mediaName;
			}
			if (userParams != null) {
				queryParams = appendUserParamObjects(queryParams, userParams);
			}
			if (clientParams != null) {
				queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
			}

			jQuery.ajax(
				{
					type :"GET",
					url :fullURL,
					data :queryParams,
					dataType :"jsonp",
					success : function(data)
					{						
						setOmnitureFeature('commentFlagged',escape(clientParams.content.contentTitle));
						alert(clientParams.messages.flagMessage);
					},
					error : function(request, textStatus, thrownError)
					{
					}
				});

	}else{
		alert(clientParams.messages.flagMessage);
	}
	
	//}
	
}

function deleteComment(commentId,mediaId) {
	var userid = '';
	var commentText = jQuery("#"+commentId).text();
	commentText = commentText.replace('Reply','');
	commentText = jQuery.trim(commentText);
	//var commentText = jQuery("#"+commentId).text().replace('Reply','').trim();
	if (commentText.length > 1000)
	{
		commentText = commentText.substr(0, 1000);
	}
	var pageURL = '';
	if (typeof clientParams.feed != 'undefined' && typeof clientParams.feed.comments != 'undefined' && typeof clientParams.feed.comments.contentURL != 'undefined'){
		pageURL = clientParams.feed.comments.contentURL;
	}
	//userid = getLoggedInUserId();
	// No reason to proceed if the user isn't auth'd
	userid = readCookie("udata_uid");
	var answer=confirm ("Are you sure you want to delete this comment?");
    if (userid != null && userid != '' && getLoggedInState()=="Y" && answer == true) {
		var fullURL = ajaxURL + "?controller=Ajax";
		var clientParamsArray=new Array("contentTitle","id","CommentsPerPage","showName");
		var queryParams =
			{
				"requestedController" :"Comment",
				"requestedMethod" :"deleteComment",
				"commentID" :commentId,
                "mediaId" : mediaId,
				"commentText" : commentText,
				"pageURL" : pageURL
			};
          
		if (userParams != null) {
			queryParams = appendUserParamObjects(queryParams, userParams);
		}

		if (clientParams != null) {
			queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
		}

		jQuery.ajax(
			{
				type :"GET",
				url :fullURL,
				data :queryParams,
				dataType :"jsonp",
				success : function(data)
				{   
					if (data.error != ''){
						alert(data.error);
					} else {
						//alert('The comment has been deleted'+"#CommentContentDiv"+commentId+viralappsURL+'public/fbconnect/syfy/img/comment_delete.jpg');
                                         jQuery("#CommentContentDiv"+commentId).html('');   
                                         html = '';
                                         html = html+'<img id="deleteCloseDivId" onclick="closeDeleteCommentdialog()" src="'+viralappsURL+'public/fbconnect/syfy/img/close_dialog.png" />';  
                                         jQuery("#deleteCommentDivId").html(html); 
                                         jQuery('#deleteCommentDivId').css({display:"block"});
                                         setTimeout("closeDeleteCommentdialog()",6000);
						//responseHandler(data,'Comments');
					}
				},

				error : function(request, textStatus, thrownError)
				{
				}
			});
	}
}
function addViewCount() {
              var directURL = '';
		directURL = ajaxURL;
		directURL = directURL.replace(directUrlId,"");
		var fullURL = directURL + "?controller=Ajax&callback=?";
		var clientParamsArray=new Array("contentTitle","id","CommentsPerPage","showName");
		var queryParams =
			{
				"requestedController" :"Comment",
				"requestedMethod" :"addViewCount"		
			};
          
		if (userParams != null) {
			queryParams = appendUserParamObjects(queryParams, userParams);
		}

		if (clientParams != null) {
			queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
		}

		jQuery.ajax(
			{
				type :"GET",
				url :fullURL,
				data :queryParams,
				dataType :"jsonp",
				success : function(data)
				{   

				},

				error : function(request, textStatus, thrownError)
				{
				}
			});
}

function closeDeleteCommentdialog(){
jQuery('#deleteCommentDivId').css({display:"none"});

}

function closeSaveCommentdialog(){
jQuery('#saveCommentDivId').css({display:"none"});

}

function getLoggedInState(){
	//check whether user logged into snas
	if (loggedInContainerSite) {
		return 'Y';
	}
	//check whether user logged into twitter
    if (readCookie("isUserLoggedIn") == "true"){
        return 'Y';
    }
    //check whether user or sn_nbc cookies are set
	for ( var name in userParams) {		
			//alert(name + '  ' + userParams[name]);
		if (name.indexOf('user') != -1 || (name.indexOf('sn_nbc') != -1 && siteLoginEnabled == 'Y') || name.indexOf('signed_request') != -1) {
			if (userParams[name] != '' && userParams[name] != 'undefined'){
				return 'Y';
			}
		} else if (jQuery.trim( name ) == 'snas') {
			if (userParams[name] != '' && userParams[name] != 'undefined' && userParams[name] != 'exp')
			{
				return 'Y';
		}
	}
	}
	
	return 'N';
}
function rateContent(contentId, ratingIndex) {
	var timeStamp = new Date().getTime();
	var fullURL = ajaxURL + "?controller=Rating&method=saveRating";
	var queryParams = {
			"contentId" :contentId,
			"contentTitle" :clientParams.content.contentTitle,
            "id" :clientParams.content.id,
			"ratingIndex" :ratingIndex,
			"loggedIn" :getLoggedInState(),
			"returnCurrentRating" :1,
			"showName" :clientParams.showName,
			"overrideCache" : timeStamp
		};
	queryParams = jQuery.extend(queryParams, userParams);
	
	var userid = getLoggedInUserId();

	jQuery.ajax(
		{
			type :"GET",
			url :fullURL,
			data :queryParams,
			dataType :"jsonp",
			success : function(data)
			{
				jQuery('#current_average_rating_' + contentId).text(data.currentRating.AVGRATING);				
				if (data.success) {
					var ratingCount = ++data.currentRating.COMMENTRATINGCOUNT;
					jQuery('#ratingCount').html(ratingCount);
					//if (userid != ''){
						jQuery('#thanksForRating').css({display:"block"});
						jQuery('#shareRating').css({display:"block"});
					//}
				} else {
					jQuery('#thanksForRating').css({display:"none"});
					jQuery('#shareRating').css({display:"none"});
					jQuery('#ratingFailed').css({display:"block"});
				}
				refreshXFBML();
			},
			error : function(request, textStatus, thrownError)
			{
			}
		});

}

/**
 * Demonstration of using a 'rating module' from the viral apps team. This
 * requests the interface to be returned and assigned to our placement area
 * <div>. The contentId here expects a SNAS contentId to have already been
 * created however, this integration point with the content on page can be
 * handled in any manner (pass the video URL and we create a contentId for you
 * etc)
 */
function renderFBCVideoRating() {
	contentType = 'Rating';;
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";
	var timeStamp = new Date().getTime();
	var queryParams = {
			"contentTitle" :clientParams.content.contentTitle,
            "id" :clientParams.content.id,
			"requestedController" :"Rating",
			"loggedIn" :getLoggedInState(),
			"requestedMethod" :"getFBCVideoRatingInterface",
			"showName" :clientParams.showName,
			"overrideCache" : timeStamp,
            "platform":platform,
            "CreateBlogPost":"Y" 
		};
	queryParams = jQuery.extend(queryParams, userParams);
	
	jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" :"getFBCVideoRatingCallback",
		"success" : function(data) {
                           if (readCookie("isUserLoggedIn") == "true"){
                               data.twitterLoggedInstate = "Y";
                           }else{
                               data.twitterLoggedInstate = "N";  
                           } 
                          data.fbcLoggedInstate = getFBconnectedState();          
 
				responseHandler(data,'Rating');
			},
			error : function(request, textStatus, thrownError) {		
			}
	});		

}



function renderAnnonVideoRating() {
	contentType = 'Rating';;
	var fullURL = ajaxURL + "?controller=Ajax&callback=?";
	var timeStamp = new Date().getTime();
	var queryParams = {
			"contentTitle" :clientParams.content.contentTitle,
            "id" :clientParams.content.id,
			"requestedController" :"Rating",
            "isKickappsAnnonRatingEnabled":"Y",    
 			"loggedIn" :getLoggedInState(),
			"requestedMethod" :"getFBCVideoRatingInterface",
			"showName" :clientParams.showName,
			"overrideCache" : timeStamp,
            "platform":platform,
            "CreateBlogPost":"Y" 
		};
	queryParams = jQuery.extend(queryParams, userParams);
	
	jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" :"getFBCVideoRatingCallback",
		"success" : function(data) {
                           if (readCookie("isUserLoggedIn") == "true"){
                               data.twitterLoggedInstate = "Y";
                           }else{
                               data.twitterLoggedInstate = "N";  
                           } 
                          data.fbcLoggedInstate = getFBconnectedState();          
 
				responseHandler(data,'Rating');
			},
			error : function(request, textStatus, thrownError) {		
			}
	});		

}

/* This method will send the request
 * to authenticate the user Account in Snas
 */

function authenticateUser() {
	var user_email = jQuery('#merge_email').val();
	var user_password = jQuery('#merge_password').val();
	//connect_onload_functions();
	//return false;
	var fullURL = ajaxURL + "?controller=Ajax";
	var clientParamsArray=new Array("showName");
	var queryParams = {
			"requestedController" :"Account",
			"requestedMethod" :"authenticateUser",
			"user_email" :user_email,
			"loggedIn" :getLoggedInState(),
			"user_password" :user_password,
			"showName" :clientParams.showName
		};
      
	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams,clientParamsArray);
	}
	jQuery.ajax(
		{
			type :"GET",
			url :fullURL,
			data :queryParams,
			dataType :"jsonp",
			success : function(data)
			{
				if (data.error == 'no error'){
					refreshComments = 1;
					facebook_onload_function = 0;
					connect_onload_functions();
				} else {
					//alert(data.error);
					jQuery('#fbc_snasFailedErrMsg').show();
				}
			},
			error : function(request, textStatus, thrownError)
			{
			}
		});

}

function changeRating(elm,contentId) {
/* this function is used to change the rating
 * when user hovers over the stars
 */
 	if (disableRatingHover) {
 		return false;
 	}
	thisIndex = jQuery("div.rating ul li a").index(elm);
	jQuery("div.rating ul li:lt(" + (thisIndex + 1) + ")").addClass("active");
	jQuery("div.rating ul li:gt(" + thisIndex + ")").removeClass("active");
}

function resetRating(contentId) {
/* this function will reset the ratings to original ratings
 * based on the value stored in setRatingValue
 */
 	if (disableRatingHover) {
 		return false;
 	}
 	jQuery("div.rating ul li").removeClass("active").slice(0,fbc_page['modules']['ratings']['current_item']['rating']).addClass("icon_rating_def");

}

function isAdminUser(){
var fullURL = ajaxURL + "?controller=Ajax&callback=?";
             var queryParams = {
			"requestedController" :"Admin",
			"requestedMethod" :"checkIsAdminUser",
			"loggedIn" :getLoggedInState(),
			"showName" :clientParams.showName,
                     "platform":platform
		};
      
	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
jQuery.jsonp({
		"url" : fullURL,
		"cache":false,
		"pageCache" : "false",
		"data" : queryParams,
		"callback" :"isAdminUserCallback",
		"success" : function(data) {
                   if(data.isUserAdmin){
                      jQuery('#manageCommentsSpan').css({display:"block"});  
					  jQuery('iframe#kickappsLoginFrame').attr('src', data.frameLoginSrc);
					  jQuery('iframe#kickappsLoginFrame').css({display:"none"}); 
                   } 
              },
			error : function(request, textStatus, thrownError)
			{
			}
		});

}
function responseHandler(data,contentType) {
/* this function will handle the response from AJAX
 * this will return JSON or draw html
 */
 if (notDrawingHTML) {
 	return data;
 }
 getBrowserType();
 data.pageName = clientParams.pageName;
 data.userId = getLoggedInUserId();
 data.browserType = browserType;
 data.browserVersion = browserVersion;
 data.mozillaVersion = mozillaVersion;
 data.fbconnected = getFBconnectedState();
 data.connectedPlatform = platform;
 data.loggedIn = (getLoggedInState() == "Y") ? 1 : 0;
 data.loggedInContainerSite = loggedInContainerSite;
 data.imgURL = baseURL + 'img/';
 showName =  clientParams.showName;
 data.showName = showName.toLowerCase().replace(".",""); 
 //alert(data.loggedIn);
 //user = "undefined";
 if (typeof user == "undefined" || typeof user.loggedInUserName == "undefined" || user.loggedInUserName == null || typeof user.profilePic == "undefined" || user.profilePic == null) {
	data.loggedInUserName = readCookie("udata_first_name");
	data.loggedInUser_pic = readCookie("udata_pic_square");
	data.loggedInUserId = readCookie("udata_uid");
 } else {
	data.loggedInUserName = user.loggedInUserName;
	data.loggedInUser_pic = user.profilePic;
  data.loggedInUserId   = user.externalPlatformId;  	 
 }
 data.clientSiteId = fbcClientId; 
 if ((typeof data.loggedInUserName == "undefined" || data.loggedInUserName == null) && data.loggedIn == 1 ) {
              for (var i=0; i < clientParams.onLoginReadyFunctions.functions.length; i++){
 	         loadFunction = clientParams.onLoginReadyFunctions.functions[i].name;
                if(loadFunction == "renderHeaderSection") {
                   functionToCallbacks.getUserProfile.push("renderHeaderSection");
 		     return '';
                }
              }
	}
 switch (contentType){
 	case "Comments":
		displayComments(data);
 		break;
 	case "Rating":
 		var ratingTemplate = '';
 		disableRatingHover = 0;
 		if (data.ratingInfo.COMMENTRATINGCOUNT === null) {
 			data.ratingInfo.COMMENTRATINGCOUNT = 0;
 		}
 		if (data.pageName == 'video' && fbcClientId == "usa") {
 			ratingTemplate = getVideoStarRatingTemplate();
 		} else {
 			ratingTemplate = getStarRatingTemplate();
 		}
 		var ratingData = jQuery("#rating_area").parseTemplate(ratingTemplate,data);
 		jQuery("#rating_area").html(ratingData);
		if (clientParams.showName.toLowerCase() == 'syfy.com') {
			jQuery("#fbc_mainContainerBG").removeClass('fbc_mainContainerBG'+browserType);
			jQuery("#fbc_mainContainerBG").addClass('fbc_mainContainerBG');
			jQuery("#fbc_featured_video_rating").addClass('fbc_featured_video_ratingsyfy');
			jQuery("#fbc_innercontentLeft_id").removeClass('fbc_innercontentLeft');
			jQuery("#fbc_innercontentLeft_id").addClass('fbc_innercontentLeftsyfy');
			if (typeof clientParams.pageName != 'undefined' && clientParams.pageName == 'default') {
				if (browserVersion == 'msie6') {
					jQuery("#fbc_mainContainerBG").addClass('fbc_mainContainerBGmsie6syfydefault');
					jQuery("#fbc_featured_video_rating").css({margin:"8px 0 0 0 ! important"});
				} else {
					jQuery("#fbc_mainContainerBG").addClass('fbc_mainContainerBGsyfydefault');
				}
				jQuery("#rating_area").css({width:"132px"});
				if (browserType == 'msie') {
					jQuery("#rating_area").css({width:"685px", background:"#ffffff"});
				}
			}
		} 		
		if (clientParams.showName.toLowerCase() == 'visionsfortomorrow.net') {
			jQuery("#fbc_mainContainerBG").removeClass('fbc_mainContainerBG'+browserType);
			jQuery("#fbc_mainContainerBG").addClass('fbc_mainContainerBGvision'+browserType);
			jQuery("#fbc_innercontentLeft_id").removeClass('fbc_innercontentLeft');
			jQuery("#fbc_innercontentLeft_id").addClass('fbc_innercontentLeftvisions');
		} 	
		if (typeof clientParams.showName != 'undefined' && (clientParams.showName.toLowerCase() == 'dvice.com' || clientParams.showName.toLowerCase() == 'scifiwire.com' || clientParams.showName.toLowerCase() == 'fidgit.com')) {
			if (browserVersion == 'msie6') {
				jQuery("#fbc_mainContainerBG").removeClass('fbc_mainContainerBG'+browserType);
				jQuery("#fbc_mainContainerBG").addClass('fbc_mainContainerBGmsie6');
			}
		}
 		refreshXFBML();
		break;
 	case "Poll":
 		break;
 	case "LoginHeader":
 		var headerTemplate = getLoginHeaderTemplate();
 		var headerData = jQuery("#header_section").parseTemplate(headerTemplate,data);
 		jQuery("#header_section").html(headerData);
 		refreshXFBML();
		break;
 	case "LikeIt":
 		var likingTemplate = '';
 		if (data.ratingInfo.COMMENTRATINGCOUNT === null) {
 			data.ratingInfo.COMMENTRATINGCOUNT = 0;
 		}
 		
 		likingTemplate = getLikeItTemplate();
 		var likingData = jQuery("#likeIt").parseTemplate(likingTemplate,data);
 		jQuery("#likeIt").html(likingData);
 		refreshXFBML();
 		break;
 }
}

function popUpMergeBox(){
	jQuery('#fbc_mergeBoxFormContent').hide();
	jQuery('#fbc_snasFailedErrMsg').hide();
	jQuery('#fbc_mergeBoxMessageContent').show();
	jQuery('#fbc_popUpMergeBox').show();
	refreshComments = 0;
}

function popUpMergeForm(){
	jQuery('#fbc_mergeBoxMessageContent').hide();
	jQuery('#fbc_mergeBoxFormContent').show();
}

function popupLogin(e) {
  refreshComments = 0;
  //getting height and width of the message box
  var height = jQuery('#fbc_loginPopup').height();
  var width = jQuery('#fbc_loginPopup').width();
  //calculating offset for displaying popup message
  leftVal=e.pageX-(width/2)+"px";
  topVal=e.pageY-(height/2)+"px";
  //show the popup message and hide with fading effect
  jQuery('#fbc_loginPopup').css({left:"350px",top:"10px"}).show();
}

function closePopup(elementId){
	jQuery("#"+elementId).hide();
	refreshComments = 1;
}

function toggleComments() {
	switch(jQuery('#display_comments').css('display')) {
		case 'none':
			jQuery('#display_comments').css({display:"block"});
			jQuery('#fbc_toggleCommentsLink').addClass('fbc_open');
			
		if (clientParams.showName.toLowerCase() == 'fidgit.com') {
		if (browserType == 'msie' ) {			
			jQuery("#fbc_toggleCommentsLink").removeClass("fbc_arrow_rightmsiefidgit");
			jQuery('#fbc_toggleCommentsLink').removeClass('fbc_open');
			jQuery("#fbc_toggleCommentsLink").addClass("fbc_arrow_rightmsiefidgitfbc_open");			
		 }
		}
		if (clientParams.showName.toLowerCase() == 'dvice.com') {
		if (browserType == 'msie' ) {			
			jQuery("#fbc_toggleCommentsLink").removeClass("fbc_arrow_rightmsiedvice");
			jQuery('#fbc_toggleCommentsLink').removeClass('fbc_open');
			jQuery("#fbc_toggleCommentsLink").addClass("fbc_arrow_rightmsiedvicefbc_open");			
		 }
		}
		if (clientParams.showName.toLowerCase() == 'scifiwire.com') {
		if (browserType == 'msie' ) {			
			jQuery("#fbc_toggleCommentsLink").removeClass("fbc_arrow_rightmsiewire");
			jQuery('#fbc_toggleCommentsLink').removeClass('fbc_open');
			jQuery("#fbc_toggleCommentsLink").addClass("fbc_arrow_rightmsiewirefbc_open");			
		 }
		}
		if (clientParams.showName.toLowerCase() == 'caprican') {
		if (browserType == 'msie' ) {			
			jQuery("#fbc_toggleCommentsLink").removeClass("fbc_arrow_rightmsiecaprican");
			jQuery('#fbc_toggleCommentsLink').removeClass('fbc_open');
			jQuery("#fbc_toggleCommentsLink").addClass("fbc_arrow_rightmsiecapricanfbc_open");			
		 }
		}
			break;
		case 'block':
			jQuery('#display_comments').css({display:"none"});
			jQuery('#fbc_toggleCommentsLink').removeClass('fbc_open');

		if (clientParams.showName.toLowerCase() == 'fidgit.com') {
		if (browserType == 'msie' ) {
			jQuery("#fbc_toggleCommentsLink").removeClass("fbc_arrow_rightmsiefidgitfbc_open");
			jQuery("#fbc_toggleCommentsLink").addClass("fbc_arrow_rightmsiefidgit");			
		 }
		}
		if (clientParams.showName.toLowerCase() == 'dvice.com') {
		if (browserType == 'msie' ) {
			jQuery("#fbc_toggleCommentsLink").removeClass("fbc_arrow_rightmsiedvicefbc_open");
			jQuery("#fbc_toggleCommentsLink").addClass("fbc_arrow_rightmsiedvice");			
		 }
		}
		if (clientParams.showName.toLowerCase() == 'scifiwire.com') {
		if (browserType == 'msie' ) {
			jQuery("#fbc_toggleCommentsLink").removeClass("fbc_arrow_rightmsiewirefbc_open");
			jQuery("#fbc_toggleCommentsLink").addClass("fbc_arrow_rightmsiewire");			
		 }
		}
		if (clientParams.showName.toLowerCase() == 'caprican') {
		if (browserType == 'msie' ) {
			jQuery("#fbc_toggleCommentsLink").removeClass("fbc_arrow_rightmsiecapricanfbc_open");
			jQuery("#fbc_toggleCommentsLink").addClass("fbc_arrow_rightmsiecaprican");			
		 }
		}
			break;
		default:
			jQuery('#display_comments').css({display:"none"});
			jQuery('#fbc_toggleCommentsLink').removeClass('fbc_open');
			break;
	}
}

function comments_disclose() {
	switch(jQuery('#fbc_comments-form').css('display')) {
	
	case 'block':
		jQuery('#fbc_contentContainer').css({display:"none"});
		jQuery('#fbc_comments-form').css({display:"none"});
		jQuery('#fbc_pagination_holder_id').css({display:"none"});
        jQuery('#fbc_messages_id').css({display:"none"});
		jQuery('#comments_display').attr('src',baseURL + "img/ArwNext.gif");
		break;
	
	case 'none':
		jQuery('#fbc_comments-form').css({display:"block"});
		var commentCount =  jQuery('#allcommentsDivHeaderCount').html();
		if(commentCount == '0'){
		jQuery('#fbc_messages_id').css({display:"block"});
		jQuery('#fbc_contentContainer').css({display:"none"});
	    jQuery('#fbc_pagination_holder_id').css({display:"none"});
		}else{
		 jQuery('#fbc_contentContainer').css({display:"block"});
     jQuery('#fbc_pagination_holder_id').css({display:"block"});
		}
		jQuery('#comments_display').attr('src',baseURL + "img/ArrowDown.gif");
		break; 
		
	default:
		jQuery('#fbc_contentContainer').css({display:"block"});
		jQuery('#fbc_comments-form').css({display:"block"});
		jQuery('#fbc_pagination_holder_id').css({display:"block"});
		break;
	}
}

function handleSiteLogin() {
	var domainName = document.domain;
	if (domainName.indexOf("syfy") != -1) {
		window.location.href = "http://www.syfy.com/members/ssologin/?redirectUrl="+window.location;
	}
}

function handleSiteRegistration() {
	var domainName = document.domain;
	if (domainName.indexOf("syfy") != -1) {
		window.location.href = "http://www.syfy.com/members/";
	}
}

function handleSSOLogout() {
	userParams = new Object();
	clearAuthenticationCookies();
	var url = window.location;
	var domainArray = new Array();
	var callback = "";
	fullDomainArray = String(window.location).split("/");
	for (i = 3; i < fullDomainArray.length; i++) {
		if (fullDomainArray[i].indexOf('#') != -1) {
			tempArray = fullDomainArray[i].split('#');
			fullDomainArray[i] = tempArray[0];
		}
		callback += "/" + fullDomainArray[i];
	}
	//clearSiteCookies();	
	clearServerSideCookies(false);
	window.location.reload();
}

function handleSSOLogoutRedirect() {
	userParams = new Object();
	clearAuthenticationCookies();
	clearServerSideCookies(false);
	handleSiteLogin();
}

function clearSiteCookies() {
	var fullURL = '';
	var queryParams = {};
	fullURL = "http://www.syfy.com/members/ssologout.php";
	jQuery.ajax( {
		type :"GET",
		url :fullURL,
		data :queryParams,
		dataType :"jsonp",
		success : function(data) {
		},
		error : function(request, textStatus, thrownError) {
		}
	});
}

function trigger_facebook_onload_function(){
	processAuthenticationParams();
	getUserProfile();	
	facebook_onload_function = 0;
	connect_onload_functions();
}

function reloadFBComponents(){
	renderMainSection();
	renderFBCVideoRating();
}

function isPopBlocked(){
 var fullDomainArray = new Array();
 fullDomainArray = String(window.location).split("/");
 var popup_window = window.open('','','width=0,height=0,left=0,top=0,scrollbars=no');
 if(popup_window){
    var popUpsBlocked = false;
    popup_window.close(); 
 } else {
    var popUpsBlocked = true;
    alert(fullDomainArray[2]+" has detected pop windows are blocked.Please disable pop up blocking for "+fullDomainArray[2]+" and refresh the page(F5).");
    return false;
 }
}

function dialogClose(){
jQuery('#dialog').dialog('destroy');
}

function doClick(buttonName,e) {
	//the purpose of this function is to allow the enter key to 
	//point to the correct button to click.
	var key;

    if(window.event)
    	key = window.event.keyCode;     //IE
	else
    	key = e.which;     //firefox

    if (key == 13) {
    	//Get the button the user wants to have clicked
		var btn = document.getElementById(buttonName);
        if (btn != null) { //If we find the button click it
        	btn.click();
		}
	}
}


/*
 * jQuery JSONP Core Plugin 1.0.6 (2009-07-15)
 * 
 * http://code.google.com/p/jquery-jsonp/
 *
 * Copyright (c) 2009 Julian Aubourg
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
(function(jQuery){
	
	// ###################### UTILITIES ##
	// Test a value is neither undefined nor null
	var defined = function(v) {
		return v!==undefined && v!==null;
	},
	
	// Head element (for faster use)
	head = jQuery("head"),
	// Page cache
	pageCache = {},
	
	// ###################### DEFAULT OPTIONS ##
	xOptionsDefaults = {
		//beforeSend: undefined,
		//cache: false,
		callback: "C",
		//callbackParameter: undefined,
		//complete: undefined,
		//data: ""
		//dataFilter: undefined,
		//error: undefined,
		//pageCache: false,
		//success: undefined,
		//timeout: 0,		
		url: location.href
	},

	// ###################### MAIN FUNCTION ##
	jsonp = function(xOptions) {
		
		// Build data with default
		xOptions = jQuery.extend({},xOptionsDefaults,xOptions);
		
		var beforeSendCallback = xOptions.beforeSend;

		// Call beforeSend if provided
		// (early abort if false returned)
		if (defined(beforeSendCallback)) {
			var aborted = 0;
			xOptions.abort = function() { aborted = 1; };
			if (beforeSendCallback(xOptions,xOptions)===false || aborted) return xOptions;
		}
		
		// Control entries & data type
		// + declare variables
		var
		empty="",
		amp="&",
		qMark="?",
		success = "success",
		error = "error",
		
		successCallback = xOptions.success,
		completeCallback = xOptions.complete,
		errorCallback = xOptions.error,
		
		dataFilter = xOptions.dataFilter,
		
		callbackParameter = xOptions.callbackParameter,
		
		successCallbackName = xOptions.callback,

		cacheFlag = xOptions.cache,
		pageCacheFlag = xOptions.pageCache,
		
		url = xOptions.url,
		data = xOptions.data,
		
		timeout = xOptions.timeout,
		
		// Keep current thread running
		later = function(functor) { setTimeout(functor,1); },
		
		// Various variable
		splitUrl,splitData,i,j;

		// Control entries
		url = defined(url)?url:empty;
		data = defined(data)?((typeof data)=="string"?data:jQuery.param(data)):empty;
		
		// Add callback parameter if provided as option
		defined(callbackParameter)
			&& (data += (data==empty?empty:amp)+escape(callbackParameter)+"=?");
		
		// Add anticache parameter if needed
		!cacheFlag && !pageCacheFlag
			&& (data += (data==empty?empty:amp)+"_"+(new Date()).getTime()+"=");
		
		// Search for ? in url
		splitUrl = url.split(qMark);
		// Also in parameters if provided
		// (and merge array)
		if (data!=empty) {
			splitData = data.split(qMark);
			j = splitUrl.length-1;
			j && (splitUrl[j] += amp + splitData.shift());
			splitUrl = splitUrl.concat(splitData);
		}
		// If more than 2 ? replace the last one by the callback
		i = splitUrl.length-2;
		i && (splitUrl[i] += successCallbackName + splitUrl.pop());
		
		// Build the final url
		var finalUrl = splitUrl.join(qMark),
		
		// Utility function
		notifySuccess = function(json) {
			// Apply the data filter if provided
			defined(dataFilter) && (json = dataFilter(json));
			// Call success then complete
			defined(successCallback) && successCallback(json,success);
			defined(completeCallback) && completeCallback(xOptions,success);				
		},
	    notifyError = function(type) {
			// Call error then complete
			defined(errorCallback) && errorCallback(xOptions,type);
			defined(completeCallback) && completeCallback(xOptions,type);
	    },
	    
	    // Get from pageCache
	    pageCached = pageCache[finalUrl];
		
		// Check page cache
		if (pageCacheFlag && defined(pageCached)) {
			later(function() {
				// If an error was cached
				if (defined(pageCached.e)) notifyError(error);
				else notifySuccess(pageCached.s);
			});
			return xOptions;
		}
		
		// Create an iframe & add it to the document
		var frame = jQuery("<iframe />").appendTo(head),
		
		// Get the iframe's window and document objects
		tmp = frame[0],
		window = tmp.contentWindow || tmp.contentDocument,
		document = window.document,
		
		// Flag to know if the request has been treated
		done = 0,
		
		// Declaration of cleanup function
		cleanUp,
		
		// Error function
		errorFunction = function (_,type) {
			// If pure error (not timeout), cache if needed
			pageCacheFlag && !defined(type) && (pageCache[finalUrl] = {e: 1}); 
			// Cleanup
			cleanUp();
			// Call error then complete
			notifyError(defined(type)?type:error);
		},
		
		// Cleaning function
		removeVariable = function(varName) {
			window[varName] = undefined;
			try { delete window[varName]; } catch(_) {}
		},
		
		// Error callback name
		errorCallbackName = successCallbackName=="E"?"X":"E";
		
		// Control if we actually retrieved the document
		if(!defined(document)) {
			document = window;
		    window = document.getParentNode();
		}
		
		// We have to open the document before
		// declaring variables in the iframe's window
		// Don't ask me why, I have no clue
		document.open();
		
		// Install callbacks
		
		window[successCallbackName] = function(json) {
			// Set as treated
			done = 1;
			pageCacheFlag && (pageCache[finalUrl] = {s: json});
			// Give hand back to frame
			// To finish gracefully
			later(function(){
				// Cleanup
				cleanUp();
				// Call success then complete
				notifySuccess(json);
			});
		};
		
		window[errorCallbackName] = function(state) {
			// If not treated, mark
			// then give hand back to iframe
			// for it to finish gracefully
			(!state || state=="complete") && !done++ && later(errorFunction);
		};
		
		// Clean up function (declaration)
		xOptions.abort = cleanUp = function() {
			removeVariable(errorCallbackName);
			removeVariable(successCallbackName);
			document.open()
			document.write(empty);
			document.close();
			frame.remove();
		};
		
		// Write to the iframe (sends the request)
		// We let the hand to current code to avoid
		// pre-emptive callbacks
		
		// We also install the timeout here to avoid
		// timeout before the code has been dumped to the frame
		// (in case of insanely short timeout values)
		later(function() {
			// Write to the document
			document.write([
				'<html><head><script src="',
				finalUrl,'" onload="',
				errorCallbackName,'()" onreadystatechange="',
				errorCallbackName,'(this.readyState)"></script></head><body onload="',
				errorCallbackName,'()"></body></html>'
			].join(empty)
			);
			// Close (makes some browsers happier)
			document.close();
			// If a timeout is needed, install it
			timeout>0 && setTimeout(function(){
					!done && errorFunction(empty,"timeout");
			},timeout);
		});
		
		return xOptions;
	}
	
	// ###################### SETUP FUNCTION ##
	jsonp.setup = function(xOptions) {
		jQuery.extend(xOptionsDefaults,xOptions);
	};

	// ###################### INSTALL in jQuery ##
	jQuery.jsonp = jsonp;
	
})(jQuery);




jQuery.fn.pngFix = function(settings) {

	// Settings
	settings = jQuery.extend({
		blankgif: 'blank.gif'
	}, settings);

	var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
	var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);

	if (jQuery.browser.msie && (ie55 || ie6)) {

		//fix images with png-source
		jQuery(this).find("img[src$=.png]").each(function() {

			jQuery(this).attr('width',jQuery(this).width());
			jQuery(this).attr('height',jQuery(this).height());

			var prevStyle = '';
			var strNewHTML = '';
			var imgId = (jQuery(this).attr('id')) ? 'id="' + jQuery(this).attr('id') + '" ' : '';
			var imgClass = (jQuery(this).attr('class')) ? 'class="' + jQuery(this).attr('class') + '" ' : '';
			var imgTitle = (jQuery(this).attr('title')) ? 'title="' + jQuery(this).attr('title') + '" ' : '';
			var imgAlt = (jQuery(this).attr('alt')) ? 'alt="' + jQuery(this).attr('alt') + '" ' : '';
			var imgAlign = (jQuery(this).attr('align')) ? 'float:' + jQuery(this).attr('align') + ';' : '';
			var imgHand = (jQuery(this).parent().attr('href')) ? 'cursor:hand;' : '';
			if (this.style.border) {
				prevStyle += 'border:'+this.style.border+';';
				this.style.border = '';
			}
			if (this.style.padding) {
				prevStyle += 'padding:'+this.style.padding+';';
				this.style.padding = '';
			}
			if (this.style.margin) {
				prevStyle += 'margin:'+this.style.margin+';';
				this.style.margin = '';
			}
			var imgStyle = (this.style.cssText);

			strNewHTML += '<span '+imgId+imgClass+imgTitle+imgAlt;
			strNewHTML += 'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;
			strNewHTML += 'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;';
			strNewHTML += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + jQuery(this).attr('src') + '\', sizingMethod=\'scale\');';
			strNewHTML += imgStyle+'"></span>';
			if (prevStyle != ''){
				strNewHTML = '<span style="position:relative;display:inline-block;'+prevStyle+imgHand+'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;'+'">' + strNewHTML + '</span>';
			}

			jQuery(this).hide();
			jQuery(this).after(strNewHTML);

		});

		// fix css background pngs
		jQuery(this).find("*").each(function(){
			var bgIMG = jQuery(this).css('background-image');
			if(bgIMG.indexOf(".png")!=-1){
				var iebg = bgIMG.split('url("')[1].split('")')[0];
				jQuery(this).css('background-image', 'none');
				jQuery(this).get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + iebg + "',sizingMethod='scale')";
			}
		});
		
		//fix input with png-source
		jQuery(this).find("input[src$=.png]").each(function() {
			var bgIMG = jQuery(this).attr('src');
			jQuery(this).get(0).runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + bgIMG + '\', sizingMethod=\'scale\');';
   		jQuery(this).attr('src', settings.blankgif)
		});
	
	}
};