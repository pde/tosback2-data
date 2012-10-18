// Global JS Classes to be used across the site.
argos.classes = new (function() {
	var _classes = this;
	var _ie6OrLess = jQuery.browser.msie && Math.floor(jQuery.browser.version) <= 6; // For use in IE6 fixes (note: delete related code when dropping support for IE6)
	
	// External helpers
	var _helpers = {
		cleanHtml : argos.utils.cleanHtml,
		getCookie : argos.cookie.get,
		getType : argos.utils.getType,
		getUrlPathAndData : argos.url.getPathAndData,
		hasPosition : argos.utils.hasPosition,
		uniqueStr : argos.utils.generateUniqueStr,
		verticallyClipContent : argos.utils.verticallyClipContent,
		objectWithDefaults : argos.utils.objectWithDefaults
	}
	
	// Private
	function _register(what, expose) {
		// constructor.name is non-standard, apply workaround for browsers that don't support.
		if(what.prototype.constructor.name == undefined) {
			what.prototype.constructor["name"] = what.toString().replace(/function\s+([\w]+)[\W]+[\w\W]*/mig, "$1");
		}
		if(arguments.length > 1 ? expose : true) { // Complicated but Bool expose is default true.
			_classes[what.prototype.constructor.name] = what;
		}
	}
	
	function _inherit(what) {
		return _helpers.getType(what) == "String" ? (new this[what](null)) : (new what(null));
	}
	
	// Public
	this.Error = {
		"Component" : ArgosComponentError,
		"Configuration" : ArgosConfigurationError,
		"Element" : ArgosElementError
	};

	this.register = _register;
	this.inherit = _inherit;
	
	// Classes...

	/* ELEMENT (Creates an extended Object with access to jQuery/HTML element)
	 **************************************************************************/
	_register(Element);
	function Element(htmlOrDomElement) {
		// Used by classes to inherit jQueryElement and HTML.extended functionality.
		// See tv.js and scroller.js for working examples.
		var _htmlOrDomElement = htmlOrDomElement;
		var _properties = {};
		var type = _helpers.getType(htmlOrDomElement);
		var html = /^<[a-zA-Z]+\b\s*.*>$/mig; // TODO is the as good as can be?

		// Avoid errors when simply inheriting prototype (e.g. MyClass.prototype = new Element())
		if(htmlOrDomElement !== null && type == "Node" || (type == "String" && html.test(htmlOrDomElement))) {
			this.$node = $(htmlOrDomElement);
			this.node = this.$node.get(0);
			this.node.Element = this;
			this.$node.addClass(this.constructor.name);
		}
		this.property = function(prop, value) {
			if(arguments.length > 1) {
				_properties[prop] = value;
			}
			return _properties[prop];
		}
		this.properties = function() {	
			var properties = new Array();
			for(var property in _properties) {
				properties.push(property);
			}
			return properties;
		}
		
		this.getElementCreator = function() {
			return _htmlOrDomElement;
		}
		
		this.setElementCreator = function(creator) {
			_htmlOrDomElement = creator;
			return this;
		}
 	}
	Element.prototype.constructor = Element;
	Element.prototype.setStatus = function(status) {
		// Passing  empty (or undefined) to .remove causes delete all classes.
		var current = this.property("status");
		this.exists();
		this.$node.removeClass(current ? current : "none");
		this.$node.addClass(status);
		this.property("status", status);
	}
	Element.prototype.resetInlineStyle = function() {
		this.exists();
		this.$node.attr("style", "");
	}
	Element.prototype.exists = function() {
		if(this.$node) return true;
		throw new ArgosElementError("DOM Element ... " + this.getElementCreator() + " ... does not exist.");
	}

	/* BUTTON (standard reusable button)
	 **********************************/
	_register(Button);
	function Button(props) {
		var properties = arguments.length > 0 ? props : {}; // For inheritance purposes.
		var disabledClass = properties.cssClass + (properties.cssClassDisabled ? properties.cssClassDisabled : properties.cssClass + "Disabled"); // doing this way to compensate for IE6 lack of multiple class support.
		var title = properties["title"] ? "title=\"" + properties.title + "\"" : "";
		
		Element.call(this, "<button class=\"" + properties.cssClass + "\"" + title + " type=\"button\"><span>" + properties.text + "</span></button>");
			
		// Apply events.
		for(var event in properties.events) {
			this.$node.bind(event, properties.events[event]);
		}
		
		// Work out disabled status.
		this.property("disabledClass", disabledClass);
		if(properties.disabled) {
			this.property("disabled", true);
			this.$node.addClass(disabledClass);
		}
		
		// Compensation for lack of :hover support in IE6
		if(properties.supportIE6HoverOnButtons && jQuery.browser.msie && Math.floor(jQuery.browser.version) <= 6) {
			this.$node.bind("mouseover mouseout", function() { $(this).toggleClass(properties.cssClass + "Hover"); });
		}
	}
	Button.prototype.constructor = Button;
	Button.prototype.clickable = function(enable) {
		var disabledClass = this.property("disabledClass");
		if(enable) {
			this.property("disabled", false);
			this.$node.removeClass(disabledClass);
		}
		else {
			this.property("disabled", true);
			this.$node.addClass(disabledClass);
		}
	}
	
	/* ACTIVATEE (standard reusable activatee object)
	 ************************************************/
	_register(Activatee);
	function Activatee(config) {
		Element.call(this, (arguments.length > 0 && arguments[0] === null ? null : "<div></div>"));
		// Externally configurable options.
		var _config = _updateConfig.call(new Object({
			closeButtonText : "close",
			showHideDuration : 0,
			id : _helpers.uniqueStr(this.constructor.name + "_")
		}), config);
		
		var _constants = {
			CSS_CLOSED : "closed",
			CSS_OPEN : "open"
		};
		
		// Initialise object.
		// This will be true if called by _inherit (where we wouldn't want to append a node).
		if(config !== null && this.$node) {
			this.$node.attr("id", _config["id"]);
			this.$node.hide();
			this.$node.addClass(_constants["CSS_CLOSED"]);
			$(document.body).append(this.$node);
		}
	
		this.property("constants", _constants);
		this.property("config", _config);
		
		function _updateConfig(customisations) {
			for(var c in customisations) {
				this[c] = customisations[c];
			}
			return this;
		}
	}
	Activatee.prototype = _inherit(Element);
	Activatee.prototype.constructor = Activatee;
	Activatee.prototype.loadingElement = function() {
		var $ale = this.property("ajaxLoadingElement");
		if(!$ale) {
			// Not found as property so see if element exists.
			$ale = $("body > .ajaxLoadingFrame");
			if($ale.length < 1) {
				// Not created so do that now.
				$ale = $("<div class=\"ajaxLoadingFrame\"></div>").css("display", "none");
				$(document.body).append($ale);
			}
			$ale = $ale.clone().css("display", "block");
			this.property("ajaxLoadingElement", $ale);
		}
		return $ale;
	}
	Activatee.prototype.loading = function(bool) {
		if(bool) {
			this.$node.append(this.loadingElement());
		}
		else {
			this.loadingElement().remove();
		}
	}
	Activatee.prototype.empty = function() {
		this.$node.empty();
	}
	Activatee.prototype.setContent = function (content) {
		this.$node.prepend(content);
	}
	Activatee.prototype.modifyContent = function() {
		this.addButton();
	}
	Activatee.prototype.addButton = function(options) {
		var activatee = this;
		var opts = options ? options : {};
		var config = {
			cssClass : opts["cssClass"] ? opts.cssClass : "close",
			text : opts["text"] ? opts.text : activatee.property("config").closeButtonText,
			events : opts["events"] ? opts.events : {
				click : function() { 
					activatee.close();
				}
			}
		};		
		this.$node.append(new _classes.Button(config).$node);
	}
	Activatee.prototype.show = function (options) {
		var activatee = this;
		var opts = options ? options : {};
		var config = this.property("config");
		var speed = config ? config.showHideDuration : 0;
		var config = {
			effect : opts["effect"] ? opts.effect : "show",
			speed : opts["speed"] ? opts.speed : speed,
			callback : function() {
				if(opts["callback"]) opts.callback.call(activatee);
			}
		};
		this.animate(config);
	}
	Activatee.prototype.open = function(options) {
		this.show(options);
		this.setStatus(this.property("constants").CSS_OPEN);
	}
	Activatee.prototype.hide = function (options) {
		var activatee = this;
		var opts = options ? options : {};
		var speed = activatee.property("config").showHideDuration;
		var config = {
			effect : opts["effect"] ? opts.effect : "hide",
			speed : opts["speed"] ? opts.speed : speed,
			callback : function() {
				if(opts["callback"]) opts.callback.call(activatee);
				activatee.setStatus(activatee.property("constants").CSS_CLOSED);	
			}
		};	
		activatee.animate(config);
	}
	Activatee.prototype.close = function(options) {
		var open = this.property("constants").CSS_OPEN;
		var ajax = this.property("ajax");
		if(ajax) ajax.abort();
		this.hide(options);
		this.setStatus(open);
		this.empty();
	}
	Activatee.prototype.position = function() {
		this.positionCentred();
		this.positionToFit();
	}
	Activatee.prototype.positionCentred = function() {
		// Tries to put the activatee vertically and horizontally central to viewport.
		var $w = $(window);
		var $d = $(document);
		var $p = this.$node;
		var viewportHeight = $w.height();
		var viewportWidth = $w.width();
		var scrollTop = $d.scrollTop();
		var scrollLeft = $d.scrollLeft();
		var height = $p.height();
		var width = $p.width();
		var x = Math.floor(((viewportWidth - width) / 2) + scrollLeft);
		var y = Math.floor(((viewportHeight - height) / 2) + scrollTop);
		this.positionAt(scrollLeft <= x ? x : scrollLeft, scrollTop <= y ? y : scrollTop);
	}
	Activatee.prototype.positionAt = function (x, y) {
		// Straight forward, set x and y properties.
		if(!_helpers.hasPosition(this.$node)) {
			this.$node.css("position", "absolute");
		}
		this.$node.css({
			"left" : x + "px",
			"top" : y + "px"
		});
		return this.$node; // allow jQuery style chaining.
	}
	Activatee.prototype.positionToFit = function(axis, bounds) {
		// If x and y position means activatee falls outside of the viewport, this tries to nudge it back in.
		// @axis String('x'||'y'): restricts adjustment to that axis only.
		var $w = $(window);
		var $d = $(document);
		var viewportHeight = $w.height();
		var viewportWidth = $w.width();
		var scrollTop = $d.scrollTop();
		var scrollLeft = $d.scrollLeft();
		var offset = this.offset();
		var left = offset.left;
		var top = offset.top;
		var height = this.$node.outerHeight();
		var width = this.$node.outerWidth();

		if(!_helpers.hasPosition(this.$node)) {
			this.$node.css("position", "absolute");
		}

		//edge case if the node is smaller than the bounds, but taken care of later in this function
		if(bounds){
			//ensure activee doesn't go too far left - set by bounds.
			if(bounds.left && (left <= bounds.left)){
				left = bounds.left;
			} 
			//also ensure activee doesn't go too far right
			if(bounds.right && (left + this.$node.width() > bounds.right)){
				left = bounds.right - this.$node.width();
			}
			//ensure activee doesn't go too far up - set by bounds.
			if(bounds.top && (top <= bounds.top)){
				top = bounds.top;
			} 
			//also ensure activee doesn't go too far down
			if(bounds.down && (top + this.$node.height() > bounds.down)){
				top = bounds.top - this.$node.height();
			}
		}

		if(((left - scrollLeft) + width > viewportWidth && axis != 'y')) {
			left += (viewportWidth - ((left - scrollLeft) + width));
			this.$node.css("left", left + "px");
		}else if(bounds && bounds.left){
			this.$node.css("left", left + "px");			
		}

		if((top - scrollTop) + height > viewportHeight && axis != 'x') {
			top += (viewportHeight - ((top - scrollTop) + height));
			this.$node.css("top", top + "px");
		}else if(bounds && bounds.top){
			this.$node.css("top", top + "px");			
		}
		
		// If too big for viewport, left or top align will always be default.
		if(left <= scrollLeft && axis != 'y') {
			this.$node.css("left", scrollLeft + "px");
		}
		
		if(top <= scrollTop && axis != 'x') {
			this.$node.css("top", scrollTop + "px");
		}
	}	
	Activatee.prototype.positionReverse = function(axis) {
		// if current x = 0 and activatee is 100px wide, this makes x = -100px (so right border is now where left was). 
		// Same for y axis.
		var pos = this.$node.position();
		var height = this.$node.height();
		var width = this.$node.width();
		switch(axis) {
			case "x" : pos.x -= width;
				break;
			case "y" : pos.y -= height;
				break;
			default : pos.x -= width;
					  pos.y -= height;
		}
		this.$node.css({"left" : pos.x + "px", "top" : pos.y + "px"});
	}
	Activatee.prototype.positionNear = function ($target, adjustments) {
		// Positions activatee according to $target offset values, with optional adjustments.		
		var offset = $target.offset();
		var hOffset = adjustments && adjustments["hOffset"] ? adjustments.hOffset : 0;
		var vOffset = adjustments && adjustments["vOffset"] ? adjustments.vOffset : 0;
		
		if(!_helpers.hasPosition(this.$node)) {
			this.$node.css("position", "absolute");
		}
		
		this.$node.css({
			"left" : offset.left + hOffset + "px", 
			"top" : offset.top + vOffset + "px"
		});
	}
	Activatee.prototype.positionReset = function() {
		this.$node.css({
			left : "auto",
			top : "auto"
		});
	}
	Activatee.prototype.animate = function(options) {
		this.$node.stop();
		this.$node[options.effect](options.speed, options.callback);
	}
	Activatee.prototype.offset = function() {
		// jQuery offset won't work if element is display:none.
		var display = this.$node.css("display");
		var visibility = this.$node.css("visibility");
		var zIndex = this.$node.css("zIndex");
		var offset;
		
		// Set the conditions to get some values from jQuery offset without showing element.
		this.$node.css({
			display : "block",
			visibility : "hidden",
			zIndex : "-1"
		});
		
		// Now we can get the offset value.
		offset = this.$node.offset();
		
		// Reset to original condition.
		this.$node.css({
			display : display,
			visibility : visibility,
			zIndex : zIndex
		});	
		
		return offset;
	}
	Activatee.prototype.abort = function() {
		var ajax = this.property("ajax");
		if(ajax && ajax.abort) {
			ajax.abort();
		}
	}

	/* ACIVATOR (opens an Activatee)
	 *******************************/
	_register(Activator);
	function Activator(activator, activatee) {
		Element.call(this, activator);
		if(this.$node) {
			this.property("location", _helpers.getUrlPathAndData(this.$node.attr("href"))); 
			this.property("activatee", activatee);
			this.$node.bind("click.activator", function(e) { 
				var activator = this.Element;
				var activatee = activator.property("activatee");
				e.preventDefault();
				activatee.abort();
				activatee.empty();
				activatee.loading(true);
				activatee.position(e);
				activatee.open();
				activator.intent();
			});
		}
	}
	Activator.prototype = _inherit(Element);
	Activator.prototype.constructor = Activator;
	Activator.prototype.intent = function(e) {
		var activatee = this.property("activatee");
		var location = this.property("location");
		var dataType = this.property("ajaxDataType");
		activatee.property("ajax", $.ajax({
			url : location.path,
			data : location.data + "&rt=async",
			dataType : (dataType ? dataType : "html"),
			success : function(response) { 
				var html = (dataType == "json" ? response.html : response);
				activatee.loading(false);
				activatee.setContent(html);
				activatee.addButton();
			}
		}));
	}
	
	/* LIGHTBOX ACTIVATEE
	 *********************/
	_register(LightboxActivatee);
	function LightboxActivatee(options) {
		Activatee.call(this, options);
		if(this.node) {
			this.property("overlay", new LightboxOverlay(this));
		}
	}
	LightboxActivatee.prototype = _inherit(Activatee);
	LightboxActivatee.prototype.constructor = LightboxActivatee;
	LightboxActivatee.prototype.open = function() {
		this.property("overlay").open();
		Activatee.prototype.open.call(this);
	}
	LightboxActivatee.prototype.close = function() {
		this.property("overlay").close();
		Activatee.prototype.close.call(this);
	}
	
	/* LIGHTBOX OVERLAY
	 *******************/	
	_register(LightboxOverlay);
	function LightboxOverlay(activatee) {
		Element.call(this, arguments.length > 0 && arguments[0] === null ? null : "<div class=\"overlay\"></div>");
		var _self = this;
		this.property("frame", _ie6OrLess ? $("<iframe class=\"overlay\" frameborder=\"0\" src=\"javascript:location.href='about:blank';\"></iframe>") : null);
		if(this.$node) {
			this.property("activatee", activatee).$node.before(this.node);
			this.$node.hide();
			this.$node.bind("click", function() {
				_self.close();
				_self.property("activatee").close();
			});
			this.$node.show = function() {
				var frame = _self.property("frame");
				$(_self.node).show();
				if(frame) {
					frame.attr("style", _self.$node.attr("style"));
					_self.$node.before(frame);
					frame.show();
				}
			};
		}
	}
	LightboxOverlay.prototype.open = function() {
		this.$node.css({
				height: $(document.body).height() + "px",
				left: "0px",
				position: "absolute",
				top: "0px",
				width: "100%"
			});
		this.$node.show();
	}
	LightboxOverlay.prototype.close = function() {
		var frame = this.property("frame");
		this.$node.hide();
		if(frame) {
			frame.remove();
		}
	}
	
	/* LIGHTBOX ACTIVATOR
	 *********************/
	_register(LightboxActivator);
	function LightboxActivator(activator, activatee) {
		Activator.apply(this, arguments);
		// Specify AJAX dataType using property method.
		// e.g. this.property("ajaxDataType", "json");
	}
	LightboxActivator.prototype = _inherit(Activator);
	LightboxActivator.prototype.constructor = LightboxActivator;
	
	/* ADD TO TROLLEY ACTIVATOR
	 ***************************/
	_register(AddToTrolleyActivator);
	function AddToTrolleyActivator(activator, activatee) {
		LightboxActivator.apply(this, arguments);
		var location = "";
		if(this.node) {
			this.property("location", {
				path : "/webapp/wcs/stores/servlet/AddToTrolleyAjax",
				data : ""
			});
			this.property("addSpecialOffer", this.$node.attr("name") == "addSpecialOffer");
			this.property("ajaxDataType", "json");
		}
	}
	AddToTrolleyActivator.prototype = _inherit(LightboxActivator);
	AddToTrolleyActivator.prototype.constructor = AddToTrolleyActivator;
	AddToTrolleyActivator._findPartNumbers = function() {
		var partNumbers = "";
		var promoSelector;
		var param = "&partNumber=";
		var qty = $("#productQuantity").val();
		var $body = argos.page.elements["body"];
		var tagName = this.$node.attr("name") != "addSpecialOffer" ? this.node.tagName.toLowerCase() : null; //null trips the default
		switch(tagName) {
			case "a" : 
				partNumbers += param + this.$node.parents(".product").find(".partnum").text().replace("/", "");
				break;
			case "input" :
				partNumbers += param + this.$node.parents("form").find("input[name='partNumber']").attr("value") + "&quantity=" + qty;
				break;
			default :
				// Set a selector based on the promo type
				var spo = this.$node.parents("form").find(".SPOPromotion").length ? true : false;
				if (spo) {
					// Text only promotion
					promoSelector = $("input[name=promotionProduct]:checked");
				}
				else {
					// Thumbnail promotion
					promoSelector = $("input[name=promotionProduct]:not(:disabled)");
				}
				
				this.$node.parents("form").find(promoSelector).each( function () {
					param = "&promotionProduct=";
					partNumbers += param + $(this).val();
				});
		}
		return partNumbers;
	}
	AddToTrolleyActivator.prototype.intent = function() {
		var activatee = this.property("activatee");
		this.property("location").data = "storeId=" + argos.app.storeId + "&langId=" + argos.app.langId + this.constructor._findPartNumbers.call(this);

		Activator.prototype.intent.call(this);
		activatee.property("ajax").done(function() {
			activatee.modifyContent();
		})
	}
	
	/* ADD TO TROLLEY ACTIVATEE
	 ***************************/
	_register(AddToTrolleyActivatee);
	function AddToTrolleyActivatee(options) {
		LightboxActivatee.call(this, options);
	}
	AddToTrolleyActivatee.prototype = _inherit(LightboxActivatee);
	AddToTrolleyActivatee.prototype.constructor = AddToTrolleyActivatee;
	AddToTrolleyActivatee.prototype.modifyContent = function() {
		var activatee = this;
		$(".continue", this.node).each(function() {
			$(this).click(function(e) {
				e.preventDefault();
				activatee.close();
				argos.tracking.pdp.pdpAddToTrolley.call();
			})
		});
	}
	AddToTrolleyActivatee.prototype.close = function() {
		var user = new User();
		var counts = user.getTrolleyCounts();
		var count = counts.length > 1 ? counts[1] : "0";
		$(".QvtActivator").each(function() {
			this.Element.setCount(count);
		});
		LightboxActivatee.prototype.close.call(this);
	}

	/* ALERT ACTIVATEE
	 ******************/
	_register(AlertActivatee);
	function AlertActivatee(options) {
		LightboxActivatee.call(this, options);	
	}
	AlertActivatee.prototype = _inherit(LightboxActivatee);
	AlertActivatee.prototype.constructor = AlertActivatee;
	AlertActivatee.prototype.open = function(message) {
		var html = "";
		html +=	"<div class=\"header\"></div>";
		html +=	"<div class=\"content\">" + message + "</div>";
		this.$node.append(html);
		LightboxActivatee.prototype.positionCentred.call(this);
		LightboxActivatee.prototype.addButton.call(this);
		LightboxActivatee.prototype.open.call(this);		
	}

	/* CHECK STOCK ACTIVATOR
	 ************************/
	_register(CheckStockActivator);
	function CheckStockActivator(activator, activatee) {
		LightboxActivator.apply(this, arguments);
	}
	CheckStockActivator.prototype = _inherit(LightboxActivator);
	CheckStockActivator.prototype.constructor = CheckStockActivator;
	CheckStockActivator.prototype.intent = function(e) {
		var activatee = this.property("activatee");
		var location = this.property("location" , this.getLocation());
		var action = argos.url.getParameter(location.data, "actionType");
		activatee.property("ajax", $.ajax({
			url : location.path,
			data : location.data + "&rt=async",
			dataType : "json",
			type : (action ? action : "post"),
			success : function(json) { 
				activatee.setContent(json.html);
				activatee.modifyContent();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
		    	var html = "";
				html +=	"<p>Request: " + XMLHttpRequest + "</p>";
		    	html +=	"<p>Status: " + textStatus + "</p>";
		    	html +=	"<p>Error: " + errorThrown + "</p>";
				activatee.setContent(html);
			},
			complete : function() {
				activatee.loading(false);
				activatee.addButton();
				activatee.position();
			}
		}));
	}
	CheckStockActivator.prototype.getLocation = function() {
		var data, location, locationView;
		var $node = this.$node;
		var tagName = this.node.tagName.toLowerCase();
		var activatorId = this.$node.attr("id");
		var params = "";
		switch (tagName) {
			case "a" : 
				if (activatorId == "emailOutOfStock" || activatorId == "emailMe") {
					params = "&actionType=get&viewTaskName=ISALTMAjaxResponseView";
				}
				location = this.$node.attr("href");
				location += params;
				break;
			case "input" : 
				if( activatorId == "pdpCheckStockGo") {
					data = $("#pdpForm, #pdpStockCheck").serialize();
				}
				else {
					data = this.$node.parents("form").serialize();
				}
				data += "&viewTaskName=ISALTMAjaxResponseView";
				data += "&actionType=post";
				locationView = "ISALTMStockAvailability";
				if (activatorId === "emailMeSubmit") {
					locationView = "ISALTMOutOfStockEmail";
				}
				location = "/webapp/wcs/stores/servlet/" + locationView + "?" + data;
				break;
			case "span" : 
				data = this.$node.parents("form").serialize();
				data += "&viewTaskName=ISALTMAjaxResponseView";
				data += "&actionType=get";
				location = "/webapp/wcs/stores/servlet/ISALTMOutOfStockEmail?" + data;
				break;
			default :; // Does Nothing
		}		
		return _helpers.getUrlPathAndData(location);
	}
	
	/* CHECK STOCK ACTIVATEE
	 ************************/
	_register(CheckStockActivatee);
	function CheckStockActivatee(options) {
		LightboxActivatee.call(this, options);
	}
	CheckStockActivatee.prototype = _inherit(LightboxActivatee);
	CheckStockActivatee.prototype.constructor = CheckStockActivatee;
	CheckStockActivatee.prototype.modifyContent = function() {
		//Check and change the location of the heading text if on stock results
		var isResults = $(".resultsTable").length ? true : false;
		if (isResults) {
			var header = $("h2", this.node);
			var heading = header.text();
			$("th.productName").append("<p>" + heading +"</p>");
			header.remove();
		}
		
		// Setup activators for buyreserve buttons and further check stock
		$(".buyOrReserve", this.node).each(function() {
			new argos.classes.AddToTrolleyActivator(this, new argos.classes.AddToTrolleyActivatee());
		});
		$("#checkStock, .checkOtherStores, .backToStockCheck, #emailMeSubmit, #showOtherNearbyStoresWithStock, #oosAtTenNearestStoresLink, .emailOutOfStock", this.node).each(function() {
			new argos.classes.CheckStockActivator(this, argos.page.elements.checkStockActivatee);
		});
		argos.utils.disableCheckBoxes($("form#stockAvailabilityForm input.checkbox"), 2);
		argos.utils.clearInputValue("#postCodeLightBox");
		
		// Deal with back button action for different views
		$(".back", this.node).bind('click', function () {
			var storeResults = $(".storeList");
			
			// Possibly add switch here on the whereFrom value - not enough different actions yet
			var whereFrom = $("input[name=whereFrom]").attr("value");
			
			// If user arrived from townList or StockResults - perform another stock lookup on 'back'
			if (storeResults.length > 0 && whereFrom === "fromTownList" || whereFrom === "stockResults") {
				$("#pdpCheckStockGo").click();
			} else {
				$(".close").click();
			}
		});
		
		// Tool tip functionality which displays store information on hover
		var activateLink = $(".storeLink a");
		if (activateLink.length) {
			argos.messages.addToHtml($("[class*='storeInformation']"));
			var activatee = new argos.classes.MessageActivatee({id:"storeDetialsActivatee"});
			var activator = new argos.classes.MessageActivator(activateLink.get(0), activatee);
			//console.log(activatee , activator);
		}
		
		argos.tracking.pdp.stockCheck.call(this.node);
		argos.tracking.pdp.stockAvailability.call(this.node);		
	}
	
	/* DELAY ACIVATOR (opens an Activatee)
	 *************************************/
	_register(DelayActivator);
	function DelayActivator(activator, activatee) {
		Activator.apply(this, arguments);
		var _activator = this;
		var _activatee = activatee;
		var _constants = {
			SENSITIVITY_TIME : 300, // If cursor is not still over within this time, nothing happens
			SENSITIVITY_PROP : "sensitivity"
		}
		
		if(this.$node) {				
			this.property("constants", _constants);
			
			// We'll need to disable but might want to keep.
			this.property("title", this.$node.attr("title"));
			this.$node.attr("title", "");
				
			// Add events.
			this.$node.bind({
				"mouseenter" : function(e) { _activator.intent.call(this.Element, e); }, 
				"mouseleave" : function(e) { _activator.relent.call(_activator, e); }
			}, true);
		}
	}
	DelayActivator.prototype = _inherit(Activator);
	DelayActivator.prototype.constructor = DelayActivator;
	DelayActivator.prototype.intent = function(event) {
		var activator = this;
		var args = arguments;
		var activatee = this.property("activatee");
		var constants = this.property("constants");
		clearTimeout(this.property(constants["SENSITIVITY_PROP"]));
		activatee.property("active", true);
		this.property(constants["SENSITIVITY_PROP"], setTimeout(function() {
				if(activatee) {
					activatee.property("activator", activator);
					activatee.open.apply(activatee, args);
				}
			}, constants["SENSITIVITY_TIME"])
		);
	}
	DelayActivator.prototype.relent = function() {
		var activatee = this.property("activatee");
		clearTimeout(this.property(this.property("constants").SENSITIVITY_PROP));
		if(activatee) {
			activatee.$node.stop(true, true);
			activatee.close();
		}
	}

	/* DELAY ACIVATEE (Type of activatee linked to an DelayActivator)
	 ************************************************************/
	_register(DelayActivatee);
	function DelayActivatee(config) {
		Activatee.call(this, config);
		var _constants = _helpers.objectWithDefaults(config, {
			CLOSED_CLASS : "closed",
			CSS_ACTIVE : "_active",
			OPEN_CLASS : "open", 
			TIME_DELAY_CLOSE : 300,
			TIME_OPEN_LIMIT : 5000
		});

		if(this.$node) {
			this.$node.bind({
				"mouseenter" : function(e) { this.Element.property("active", true); }, 
				"mouseleave" : function(e) { this.Element.close.call(this.Element, e); }
			});
		}
		
		this.property("constants", _constants);
	}
	DelayActivatee.prototype = _inherit(Activatee);
	DelayActivatee.prototype.constructor = DelayActivatee;
	DelayActivatee.prototype.addButton = function() {
		// Override Activatee functionality
	}
	DelayActivatee.prototype.position = function(event) {
		this.positionAt(event.pageX, event.pageY);
	}
	DelayActivatee.prototype.close = function() {
		var self = this;
		var constants = this.property("constants");

		// clear any timer first
		clearTimeout(this.property("timeout"));
		
		// We've moved out of the activator or activatee.
		this.property("active", false);
		
		// Only do this if the tooltip is open.
		if(this.property("status") == constants["OPEN_CLASS"]) {
			this.property("timeout", setTimeout(function() {
					// Makes sure we haven't moved back over the activator or activatee.
					if(!self.property("active")) {
						self.property("active", false);
						self.$node.hide();
						self.setStatus(constants["CLOSED_CLASS"]);
						self.positionReset();
					}
				}, constants["TIME_DELAY_CLOSE"])
			);
		}
	}
	DelayActivatee.prototype.setStatus = function(status) {
		var activator = this.property("activator");
		var constants = this.property("constants");
		Activatee.prototype.setStatus.call(this, status);
		if(status == constants["OPEN_CLASS"]) { 
			activator.$node.addClass(activator.constructor.name + constants["CSS_ACTIVE"]);
			this.$node.addClass(this.constructor.name + constants["CSS_ACTIVE"]);
		}
		else {
			activator.$node.removeClass(activator.constructor.name + constants["CSS_ACTIVE"]);
			this.$node.removeClass(this.constructor.name + constants["CSS_ACTIVE"]);
		}
	}
	DelayActivatee.prototype.open = function(event, options) {
		var self = this;
		var constants = this.property("constants");
		if(self.property("status") != constants["OPEN_CLASS"]) {
			if(self.property("config").timeout) {
				// Make sure previous timer is cleared, then set another limit.
				clearTimeout(self.property("timeout"));
				self.property("timeout", setTimeout(function() {
						self.close.call(self);
					}, constants["TIME_OPEN_LIMIT"])
				);
			}
			self.position(event);
			self.setStatus(constants["OPEN_CLASS"]);
			self.show(options);
		}
	}
	
	/* MENU (Handler for linking Activator/Activatee navigation)
	 ***********************************************************/
	_register(Menu);
	function Menu($primary, $secondary, identifier) {
		var _menu = this;
		var _activatees = {};
		var _activators = {};
		var _overlay;
		var _open = null;
		
		if($primary.length > 0 && $secondary.length > 0) {

			// Build MenuActivatees
			$secondary.find("[id^='" + identifier + "']").each(function(i) {
				if(this.nodeType == 1 && this.id.indexOf(identifier) >= 0) {
					_activatees[this.id] = new MenuActivatee(this, _menu);
					if(i < 1) {
						_overlay = new MenuOverlay(_activatees[this.id], _menu);
					}
				}
			});
			
			// Build MenuItems
			$primary.find("[class*='" + identifier + "']").each(function() {
				var id = this.className.replace(RegExp(".*(" + identifier + "[\\w]+).*", "ig"), "$1");
				if(_activatees[id]) {
					_activators[id] = new MenuActivator(this, _activatees[id], _menu);
				}
			});
		}
		
		this.activatees = function(id) { return id ? _activatees[id] : _activatees; }
		this.activators = function(id) { return id ? _activators[id] : _activators; }
		this.setOpen = function(open) { _open = open; }
		this.getOpen = function() { return _open; }
		this.overlay = function() { return _overlay; }
		this.element = function() { return $primary; }
	}
	Menu.prototype.closeAll = function() {
		var activatees = this.activatees();
		for(var i in activatees) {
			if(activatees.hasOwnProperty(i) && activatees[i].close) {
				DelayActivatee.prototype.close.call(activatees[i]);
			}
		}
	}
	
	/* MENU OVERLAY
	 ***************/	
	_register(MenuOverlay, false);
	function MenuOverlay(activatee, menu) {
		LightboxOverlay.call(this, activatee);
		this.property("menu", menu);
		this.$node.unbind("click");
		this.$node.bind("click", function() {
			this.Element.close();
		});
	}
	MenuOverlay.prototype = _inherit(LightboxOverlay);
	MenuOverlay.prototype.constructor = MenuOverlay;
	MenuOverlay.prototype.open = function() {
		this.property("menu").element().addClass("MenuWithOverlay");
		LightboxOverlay.prototype.open.call(this);
	}
	MenuOverlay.prototype.close = function() {
		var menu = this.property("menu");	
		menu.closeAll();
		LightboxOverlay.prototype.close.call(this);
	}
	
	/* MENU ACTIVATEE
	 *****************/
	_register(MenuActivatee, false);
	function MenuActivatee(content, menu) {
		DelayActivatee.call(this);
		this.property("menu", menu);		
		if(this.$node) {
			this.$node.append(content);
		}
	}
	MenuActivatee.prototype = _inherit(DelayActivatee);
	MenuActivatee.prototype.constructor = MenuActivatee;
	MenuActivatee.prototype.position = function(e) {
		var activator = this.property("activator");
		var bounds = {};
		var menuContainer = activator.$node.parent('#primary').parent();
		var w = $(window);

		if(menuContainer){			
			//calculating boundary uses offset causes issue in chrome 21 and below
			bounds.left = Math.floor((w.width() - menuContainer.width()) / 2);
			bounds.right = Math.floor((w.width() - menuContainer.width()) / 2) + menuContainer.width() + w.scrollLeft();
		}
		
		this.positionNear(activator.$node, {
			hOffset : -((this.$node.width() - activator.$node.width()) / 2),
			vOffset : activator.$node.outerHeight()
			});

		this.positionToFit('x', bounds);
	}
	MenuActivatee.prototype.empty = function() {
		// Override
	}
	MenuActivatee.prototype.open = function() {
		var menu = this.property("menu");
		var alreadyOpen = menu.getOpen();
		if(alreadyOpen) {
			alreadyOpen.close();
		}
		menu.setOpen(this);
		menu.overlay().open();
		DelayActivatee.prototype.open.call(this);
	}
	MenuActivatee.prototype.close = function() {
		var menu = this.property("menu");
        menu.element().removeClass("MenuWithOverlay");
		menu.setOpen(null);
		LightboxOverlay.prototype.close.call(menu.overlay());
		DelayActivatee.prototype.close.call(this);
	}

	/* MENU ACTIVATOR
	 *****************/
	_register(MenuActivator, false);
	function MenuActivator(node, activatee, menu) {
		DelayActivator.call(this, node, activatee);
		var activator = this;
		this.property("menu", menu);

		if(this.$node) {				
			// Clear inherited events that are overwritten.			
			this.$node.unbind("click.activator");
			this.$node.unbind("mouseenter");
			
			// Add click support (for non-hover devices).
			this.$node.bind("touchstart", function(e) { 
				var href = (this.tagName.toLowerCase == "a" ? this.Element.node.href : this.Element.$node.find("a").attr("href"));
				var activatee = this.Element.property("activatee");
				var menu = this.Element.property("menu");
				e.preventDefault();
				
				// Clear all hover events on Activator and Activatee elements
				// Note: Safari on iPad fires mouseover, mouseenter, click, and mouseout with you touch a link.
				activatee.$node.unbind(); 
				this.Element.$node.unbind("mouseover");
				this.Element.$node.unbind("mouseenter");
				this.Element.$node.unbind("mouseout");

				// If already active (open), user must want to follow the link.
				if(activatee.$node.hasClass("MenuActivatee" +  activatee.property("constants").CSS_ACTIVE)) {
					if(href) {
						location.href = href;
					}
				}
				else {
					this.Element.intent.call(this.Element, e);
				}
			});

			// Add custom hover support.
			this.$node.bind("mouseenter", function(e) { 
				this.Element.$node.unbind("touchstart");
				this.Element.intent.call(this.Element, e); 
			});
		}
	}
	MenuActivator.prototype = _inherit(DelayActivator);
	MenuActivator.prototype.constructor = MenuActivator;
	
	/* QVT ACTIVATEE (Quick View Trolley)
	 ************************************/
	_register(QvtActivatee);
	function QvtActivatee(config, user) {
		DelayActivatee.call(this, config);
		if(arguments.length > 1) {
			this.property("user", user);
			this.update(user);
			this.empty();
		}
	}
	QvtActivatee.prototype = _inherit(DelayActivatee);
	QvtActivatee.prototype.constructor = QvtActivatee;
	QvtActivatee._message = function(msg) {
		var message = "";
		/* Disabled message due to CR issue.
		for(var i=0; i<msg.length; ++i) {
			message += "<span>" + msg[i] + "</span>\n";
		}
		message = message.replace(/\+/g, " ") // Manually replacing + symbols replacing spaces (added by BE).
		message = message.replace(/(.*?)(&pound;)(.*)/g, "$1<abbr lang=\"en\" title=\"GBP\" class=\"currency\">$2</abbr>$3");
		*/
		return message;
	}
	QvtActivatee._product = function(str) {
		var split = str.split("|");
		var images = "images/";
		return split.length > 2 ? {
			number : split[0],
			title : split[1].replace(/\+/g, " "), // Manually replacing + symbols until encoding confirmed.
			quantity : split[3],
			image : split[2] ? argos.app.fileDir + images + split[2] : argos.app.siteAssetsDir + images + "emptyProduct.gif"
		} : new Array();
	}
	QvtActivatee._productLink = function(a, b) {
		return "<a href=\"/static/Product/partNumber/" + a + ".htm\">" + b + "</a>";
	};
	QvtActivatee.prototype.update = function(user) {
		var link = this.constructor._productLink;
		var config = this.property("config");
		var displayLimit = config["displayLimit"] ? Number(config["displayLimit"]) : 5;
		var items = user.getTrolleyItems();
		var counts = user.getTrolleyCounts();
		var message = this.constructor._message(user.getTrolleyMessage());
		var productCount = counts.length > 0 ? Number(counts[0]) : 0;
		var itemCount = counts.length > 1 ? Number(counts[1]) : 0;
		var cls = "progressive";
		var tag = "a";
		var p, html;
		if(items.length < 1) {
			cls = "";
			link = function(a, b) { return b; };
			items = ["|Your trolley is currently empty||"];
			tag = "span";
		}

		html = "<div class=\"trolleyProducts\">";
		items.reverse();
		for(var i=0; i<items.length; ++i) {
			p = this.constructor._product(items[i]);
			if(i<displayLimit) {
				html += "<dl class=\"product\">";
				html += "	<dd class=\"title\">";
				html += link(p.number, p.title);
				html += "	</dd>";
				html += "	<dd class=\"quantity\">" + p.quantity + "</dd>"; 
				html += "	<dd class=\"image\">";
				html += link(p.number, "<img src=\"" + p.image + "\" />");
				html += "	</dd>"; 
				html += "</dl>";
			}
		}
		if(counts[0] > displayLimit) {
			html += "<" + tag + " class=\"trolleyLink more\">"; // Href injected via setLink().
			html += "+ " + (productCount - displayLimit) + " more product" + ((productCount - displayLimit) > 1 ? "s" : "");
			html += "</" + tag + ">"; 
		}
		html += "	<div class=\"footer\">";
		html += "		<p class=\"message\">" + message + "</p>";
		html += "		<" + tag + " class=\"button " + cls + " trolleyLink\">Go to trolley</" + tag + ">"; // Href injected via setLink().
		html += "	</div>";
		html += "</div>";
		this.property("itemCount", itemCount);
		this.property("productCount", productCount);
		this.empty();
		this.setContent(html)
	}
	QvtActivatee.prototype.position = function() {
		var config = this.property("config");
		var x = config["left"] ? config["left"] : 0;
		var y = config["top"] ? config["top"] : 0;
		this.positionAt(x, y);
		this.positionToFit('x');
	}
	QvtActivatee.prototype.open = function(e) {
		DelayActivatee.prototype.open.call(this, e, {
			effect : "slideDown",
			speed : 500
		});
	}
	QvtActivatee.prototype.getItemCount = function() {
		return this.property("itemCount");
	}
	QvtActivatee.prototype.setLink = function(href) {
		this.$node.find(".trolleyLink").attr("href", href);
	}
	
	/* QVT ACTIVATOR (Quick View Trolley)
	 ************************************/
	_register(QvtActivator);
	function QvtActivator(activator, activatee) {
		DelayActivator.apply(this, arguments);
		if(this.$node) {
			this.property("link", this.node.tagName.toLowerCase() == "a" ? this.$node.attr("href") : this.$node.find("a").attr("href"));
			this.$node.unbind("click.activator");
			this.$node.click(function(e) { e.preventDefault(); });
			this.setCount();
		}
	}
	QvtActivator.prototype = _inherit(DelayActivator);
	QvtActivator.prototype.constructor = QvtActivator;
	QvtActivator.prototype.intent = function() {
		var activatee = this.property("activatee");
		if(!activatee.property("active")) {
			activatee.property("active", true);
			activatee.update(activatee.property("user"));
			activatee.setLink(this.property("link"));
			DelayActivator.prototype.intent.call(this);
		}
	}
	QvtActivator.prototype.setCount = function(count) {
		var activatee = this.property("activatee");
		var count = count ? count : (activatee ? activatee.getItemCount() : 0);
		if(this.$node) {
			this.$node.find(".count").text(Number(count) ? count : 0);
		}
	}
	
	/* RECOGNITION CONTROLLER
	 *************************/
	_register(RecognitionController);
	function RecognitionController(config) {
		Element.call(this, config.container ? $(config.container).get(0) : null);
		var _controller = this;
		var _activeClass = this.constructor.name + "_active";
		var _activatee;
		this.property("config", config);
		try {
			if(this.exists()) {
				_activatee = new _classes.RecognitionActivatee(config["activateeId"] ? {id:config.activateeId} : {});
				_activatee.position = function() {
					this.positionNear(_controller.$node, {
						vOffset : 40,
						hOffset : 0
					});
				}
				
				_activatee.close = function() {
					RecognitionActivatee.prototype.close.call(this);
					_controller.$node.removeClass(_activeClass);
				};
				
				_activatee.addLoginFormHandler = function() {
					RecognitionActivatee.prototype.addLoginFormHandler.call(this);
					this.property("ajax").done(function() {
						_controller.update();
					});
				}
				
				this.update();
				/**
				if(config["activators"]) {
					// Find and initialise activators.
					$(config.activators, this.node).each(function() {
						var activator = new _classes.RecognitionActivator(this, _activatee);
						activator.intent = function(e) {
							_controller.$node.addClass(_activeClass);
							RecognitionActivator.prototype.intent.call(this, e);
						}
					});
				}
				**/
			}
		}
		catch(e) {
			if(e instanceof ArgosElementError) {
				//console.log("ArgosElementError inside Recognition controller: " + config.container + " does not exist");
			}
		}
	}
	RecognitionController.prototype = _inherit(Element);
	RecognitionController.prototype.constructor = RecognitionController;
	RecognitionController.prototype.update = function() {
		this.setName();
		this.setStatus(argos.page.user.getState().toLowerCase());
	}
	RecognitionController.prototype.setName = function() {
		// show name etc.
		var config = this.property("config");
		var max = config["maxNameSize"] || 20;
		var $salutation = $(config.salutation, this.node);
		var $name = $(".name", $salutation);
		if($name.length > 0) {
			$name.text(argos.utils.clipString(argos.page.user.getName(), max, true));
		}
	}
	
	/* RECOGNITION ACTIVATEE
	 ************************/
	_register(RecognitionActivatee);
	function RecognitionActivatee(config) {
		LightboxActivatee.call(this, config);
	}
	RecognitionActivatee.prototype = _inherit(LightboxActivatee);
	RecognitionActivatee.prototype.constructor = RecognitionActivatee;
	RecognitionActivatee.prototype.open = function() {
		LightboxActivatee.prototype.open.call(this);
		this.property("overlay").$node.addClass("RecognitionOverlay");
	}
	RecognitionActivatee.prototype.modifyContent = function() {
		this.addLoginFormToggle();
		this.addLoginFormHandler();
//		argos.tracking.qvc.applyForgottenPassword.call(this.node);
//		argos.tracking.qvc.applyContinue.call(this.node);
	}
	RecognitionActivatee.prototype.addLoginFormHandler = function() {
		var activatee = this;
		var $form = $("form", activatee.node);
		$("input[name='gethelp']", activatee.node).bind("click", function() {
			var input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", "gethelp");
			input.setAttribute("value", "true");
			$form.append(input);
		});
		$form.bind("submit", function() {
			var url = $form.attr("action") + "?" + $form.serialize();
			// Currently no FE validation so disabling this line.
			//var submit = argos.validation.signInOrJoinForm($form);
			var submit = true;
			if(submit) {
				activatee.property("activatee", activatee);
				activatee.property("location", _helpers.getUrlPathAndData(url));
				activatee.empty();
				activatee.loading(true);
				argos.tracking.qvc.captureSubmit.call(this.node, url);
				RecognitionActivator.prototype.intent.call(activatee);
				submit = false;
			}
			return submit;
		});
	}
	RecognitionActivatee.prototype.addLoginFormToggle = function(context) {
		var context = arguments.length > 0 ? context : this.node;
		var $input = $("input[type='radio']", context);
		$input.bind("click", function() {
			var $elements = $("input[type='password'], .link, .radio .label span, .radio .label .prompt", context);
			if(this.checked && this.value != "registeruser") {
				$elements.show();
			}
			else {
				$elements.hide();
			}
		});
	}
	
	/* RECOGNITION ACTIVATOR
	 ************************/
	_register(RecognitionActivator);
	function RecognitionActivator(activator, activatee) {
		Activator.apply(this, arguments);
		if(this.$node) {
			if(this.node.href) {
				this.property("location", _helpers.getUrlPathAndData(this.$node.attr("href")));
			}	
		}
	}
	RecognitionActivator.prototype = _inherit(Activator);
	RecognitionActivator.prototype.constructor = RecognitionActivator;
	RecognitionActivator.prototype.intent = function() {
		var activatee = this.property("activatee");
		var location = this.property("location");
		var action = argos.url.getParameter(location.data, "edit");
		activatee.property("ajax", $.ajax({
			url : location.path,
			data : location.data + "&rt=async",
			dataType : "jsonp",
			success : function(response) {
				var html = response.html.replace(/\n|\t|\r/gim, "");
				var $content = html.length > 0 ? $(response.html) : null;
				if(response.success && response.path) {
					// Successful trip.
					activatee.close();
					argos.tracking.qvc.captureEmail.call(activatee, location.data);
					if(action == "loginuser") {
						argos.tracking.qvc.captureSuccessfulLogin.call(activatee);
					}
					if(window.location.pathname.indexOf("ArgosLogoff") >= 0 && response.path.indexOf("ArgosRegisterUser") < 0) {
						// Redirecting to Logoff page after logging in, results in Logout action.
						// When registering from signed out page, make sure not to redirect to home.
						window.location.href = window.location.protocol + "//" + window.location.hostname;
					}
					else {
						window.location.href = response.path;
					}
				}
				else {
					// Error or first request.
					activatee.loading(false);
					activatee.setContent($content);
					activatee.modifyContent();
					activatee.addButton();
				}
			}
		}));
	}

	/* MANDATORY LOGIN ACTIVATOR
	 ****************************/
	_register(MandatoryLoginActivator);
	function MandatoryLoginActivator(config) {
		RecognitionActivator.call(this, config["activator"], config["activatee"]);
		if(this.$node) {
			this.property("activatee", config["activatee"]);
			this.property("user", config["user"]);
		}
	}
	MandatoryLoginActivator.prototype = _inherit(RecognitionActivator);
	MandatoryLoginActivator.prototype.constructor = MandatoryLoginActivator;
	MandatoryLoginActivator.prototype.intent = function() {
		var location = {
			path: "/webapp/wcs/stores/servlet/AccessMyAccount",
			data: "storeId=" + argos.app.storeId + "&langId=" + argos.app.langId + "&edit=mandatorylogin&returnURL=" + escape(window.location.href)
		}
		
		if(this.validate()) {
			this.property("location", location);
			RecognitionActivator.prototype.intent.call(this);
		}
		else {
			this.relent();
		}

		// TODO: REMOVE ONCE THE ABOVE CODE ENABLED.
		//this.relent();
	}
	MandatoryLoginActivator.prototype.validate = function() {
		var validate = false;
		if(this.property("user").getState() != "LOGGEDIN") {
			validate = true;
		}
		return validate;
	}
	MandatoryLoginActivator.prototype.relent = function() {
		this.$node.unbind("click.activator");
		this.property("activatee").close();
		this.$node.click();
	}
	
	/* MANDATORY LOGIN ACTIVATEE
	 ****************************/
	_register(MandatoryLoginActivatee);
	function MandatoryLoginActivatee(config) {
		RecognitionActivatee.call(this, config);
	}
	MandatoryLoginActivatee.prototype = _inherit(RecognitionActivatee);
	MandatoryLoginActivatee.prototype.constructor = MandatoryLoginActivatee;
	MandatoryLoginActivatee.prototype.open = function() {
		LightboxActivatee.prototype.open.call(this);
		this.property("overlay").$node.addClass("MandatoryLoginOverlay");
	}
	
	/* MESSAGE ACTIVATEE
	 ********************/
	_register(MessageActivatee);
	function MessageActivatee(config) {
		DelayActivatee.call(this, config);
	}
	MessageActivatee.prototype = _inherit(DelayActivatee);
	MessageActivatee.prototype.constructor = MessageActivatee;
	MessageActivatee.prototype.position = function() {
		this.positionNear(this.property("activator").$node);
		this.positionToFit();
	}
	MessageActivatee.prototype.setContent = function(content) {
		var title = content["title"];
		var text = content["text"];
		if(title) this.$node.append("<h4>" + title + "</h4>");
		if(text) this.$node.append(text);
	}
	
	/* MESSAGE ACTIVATOR
	 ********************/
	_register(MessageActivator);
	function MessageActivator(activator, activatee) {
		DelayActivator.apply(this, arguments);
		this.property("message", arguments.length > 1 ? (function(a) {
			var cls = a.className.replace(/.*(messageActivator_[\w]+)\s*.*/, "$1");
			var message = {};
			var id;
			if(cls.indexOf("messageActivator_") >= 0) {
				id = cls.replace("messageActivator_", "");
				// Get from argos.messages
				message = argos.messages[id];
				
				if(!message) {
					// Not on argos.message so search argos.messages.html.
					message = argos.messages.getFromHtml([id], false);
				}
			}
			else {
				if(a.firstChild) {
					// Get from argos.messages.html using Activator text value.
					message = argos.messages.getFromHtml(a.firstChild.nodeValue);
				}
			}
			return message;
		}).call(this, activator) : {});
	}
	MessageActivator.prototype = _inherit(DelayActivator);
	MessageActivator.prototype.constructor = MessageActivator;
	MessageActivator.prototype.intent = function(event) {
		var activatee = this.property("activatee");
		activatee.$node.empty();
		activatee.setContent(this.getMessage());
		DelayActivator.prototype.intent.call(this, event);
	}
	MessageActivator.prototype.setMessage = function(message) {
		var msg;
		if(_helpers.getType(message) == "String") {			
			msg = argos.messages.getFromHtml(message);
			if(!msg) {
				msg = argos.messages[message];
			}
		}
		this.property("message", msg || message);
	}
	MessageActivator.prototype.getMessage = function() {
		var activator = this;
		var activatee = this.property("activatee");
		var message = this.property("message");
		var name;
		if(!message["text"] && message["title"] == "") {
			// If nothing exists, maybe we can get it from an AJAX'd href.
			if(this.node.href) {
				name = this.node.href.replace(/.*?message=([\w_]*).*/, "$1");
				activatee.property("ajax", $.ajax({
					url : this.node.href,
					beforeSend : function() {
						activatee.loading(true);
					},
					success : function(html) {
						// This works with existing mark-up at time of writing.
						var $message = $(html).find(".simplemessage");
						$message.find(".back").remove();
						activatee.loading(false);
						activatee.setContent(activator.property("message", { 
							title : null,
							text : $message.length > 0 ? $message.html() : html
						}));
					}
				}));
			}
			else {
				// Give up.
				message = {};
			}
		}
		return message;
	}
	
	/* HOTSPOT CONTROLLER
	 *********************/
	_register(HotspotController);
	function HotspotController(target, areas) {
		var _activatee = new HotspotActivatee({timeout:5000});
		var _messages = new Array();
		
		this.activatee = function() {
			return _activatee;
		}
		
		if(arguments.length > 1) {	
			(function (){
				var $target = target.search(/[#\.\s]/) >= 0 ? $(target) : $("#" + target);
				var $parent = $target.parent();
				var id;

				if($target.length > 0 && $parent.length > 0) {
					if($parent.length > 0) {
						try {	
							id = $parent.attr("id") || _helpers.uniqueStr();
							switch($target.get(0).tagName.toLowerCase()) {
								case "img" :
									id += "_map";
									$parent.after(this.createHotspotMap(id, areas));
									$target.attr("usemap", "#" + id);
									break;
								case "some other tag??" : ; // nothing until coded.
									break;
								default : 
									// others...
									if(!_helpers.hasPosition($target)) {
										$target.css("position", "relative");
									}
									$target.append(this.createHotspotElements(areas));
							}  
						}
						catch(e) {
							if(e instanceof _classes.Error.Configuration) {
								alert("Hotspot Configuration Error: \n" + e.message);
							}
							else {
								alert("Hotspot Error: \n" + e.name + "\n" + e.message);
							}
						}
					}			
				}
				else {
					alert("Error! Could not create Hotspot from specified target " + target);
				}
			}).apply(this, arguments);
		}
	}
	HotspotController.prototype.createHotspotElements = function(areas) {
		var $collection = $(); //new Collection();
		var hotspot;
		for(var i=0; i<areas.length; ++i) {
			hotspot = this.createElementHotspot(areas[i]);
			$collection = $collection.add(hotspot.node);
		}
		return $collection;
	}
	HotspotController.prototype.createElementHotspot = function(config) {
		var span = document.createElement("span");
		var hotspot = new HotspotActivator(span, this.activatee());
		var coords = config.coords ? config.coords.split(",") : new Array();
		
		// Custom background image
		if(config["image"]) {
			hotspot.$node.css("background-image", "url(" + config.image + ")");
		}
		
		// Add any link functionality.
		if(config["href"]) {
			hotspot.$node.hover(function() {
					window.status = config.href;
				},function() {
					window.status = "";
			});
			hotspot.$node.click(function(){
				location.href = config.href;
			});
		}
		
		// Set x, y, height, and width
		if(coords) {
			switch(coords.length) {
				case 4 : hotspot.$node.css("height", coords[3] + "px"); // fall through
				case 3 : hotspot.$node.css("width", coords[2] + "px"); // fall through
				case 2 : hotspot.$node.css("left", coords[1] + "px"); // fall through
				case 1 : hotspot.$node.css("top", coords[0] + "px");
					break;
				default : throw new _classes.Error.Configuration("Incorrect number of coordinates supplied.\ncoords value = " + coords);
			}
		}
		
		hotspot.setMessage(config.message);
		return hotspot;
	}
	HotspotController.prototype.createHotspotMap = function(id, areas) {
		var map = document.createElement("map");
		var hotspot;
		map.setAttribute("id", id);
		for(var i=0; i<areas.length; ++i) {
			hotspot = this.createAreaHotspot(areas[i]);
			map.appendChild(hotspot.node);
		}
		return map;
	}
	HotspotController.prototype.createAreaHotspot = function(props) {
		var area = document.createElement("area");
		var hotspot = new HotspotActivator(area, this.activatee());
		var shape = this.getAreaShape(props["coords"]);
		area.setAttribute("coords", props.coords);
		area.setAttribute("href", props.href);
		area.setAttribute("shape", shape);
		hotspot.setMessage(props.message);
		return hotspot;
	}
	HotspotController.prototype.getAreaShape = function(coords) {
		var shape;
		if(coords) {
			switch(coords.match(/,/g).length) {
				case 0 : // fall through.
				case 1 : shape = null; // needs to be >= 2
					throw new _classes.Error.Configuration("Cannot determine correct shape from provided coordinates: " + coords);
					break;
				case 2 : shape = "circle";
					break;
				case 3 : shape = "rect";
					break;
				default : shape = "poly"			
			}
		}
		return shape;
	}
	
	/* HOTSPOT ACTIVATOR
	 ********************/
	_register(HotspotActivator);
	function HotspotActivator(activator, activatee) {
		MessageActivator.call(this, activator, activatee);
		if(this.$node) {
			this.$node.unbind();
			this.$node.click(function() {
				var activator = this.Element;
				var activatee = this.Element.property("activatee");
				if(activatee.$node.hasClass(activatee.property("constants").OPEN_CLASS)) {
					activatee.close();
				}
				else {
					activator.intent();
				}
			});
		}
	}
	HotspotActivator.prototype = _inherit(MessageActivator);
	HotspotActivator.prototype.constructor = HotspotActivator;
	HotspotActivator.prototype.getMessage = function() {
		var message = this.property("message");
		if(_helpers.getType(message) == "String") {
			// Probably PARTNUMBER_xxx added to the productQueue (coming 
			// from AJAX request) so not available at instantiation.
			this.setMessage(message);
			message = this.property("message");
			if(_helpers.getType(message) == "String" && message.indexOf("PARTNUMBER_") >= 0) {
				// Product message is still not available so display error message.
				message = this.property("message", { text: "Product cannot be found" });
			}
		}
		return message;
	}
	HotspotActivator.prototype.setMessage = function(message) {
		MessageActivator.prototype.setMessage.call(this, message);
		var msg = this.property("message");
		if(_helpers.getType(msg) == "String" && msg.indexOf("PARTNUMBER_") >= 0) {
			// Add it to the queue.
			argos.messages.productQueue.add(msg.replace("PARTNUMBER_", ""));
		}
		this.property("message", msg);
	}
	
	/* HOTSPOT ACTIVATEE
	 ********************/
	_register(HotspotActivatee);
	function HotspotActivatee(config) {
		MessageActivatee.call(this, config);
	}
	HotspotActivatee.prototype = _inherit(MessageActivatee);
	HotspotActivatee.prototype.constructor = HotspotActivatee;	
	HotspotActivatee.prototype.position = function(event) {
		if(this.property("activator").node.tagName.toLowerCase() == "area") {
			DelayActivatee.prototype.position.call(this, event);
			this.positionToFit();
		}
		else {
			MessageActivatee.prototype.position.call(this);
		}
	}
	HotspotActivatee.prototype.setContent = function(content) {
		var cls = this.constructor.name + "_clickable";
		var $link = content["text"] ? $("a", content["text"]) : $();
		var href = $link.attr("href");
		this.$node.removeClass(cls);
		this.$node.unbind("click.href");
		this.$node.unbind("mouseover.href");
		this.$node.unbind("mouseout.href");
		if($link.length > 0) {
			this.$node.addClass(cls);
			this.$node.bind({
				"click.href": function() {
					window.location.href = href;
				},
				"mouseover.href": function() {
					window.status = href;
				},
				"mouseout.href": function() {
					window.status = "";
				}
			});
		}
		MessageActivatee.prototype.setContent.call(this, content);
	}

	/* USER
	 *******/
	_register(User);
	function User() {
		this.cookies = {
			persistentSession : "UserPersistentSessionCookie",
			personalisation : "PersonalizationCookie"
		}
	}
	User._convertToArray = function(re) {
		var section = this.replace(re, "$1");
		return section.length > 0 && section != this ? section.split(",") : new Array();
	}
	User.prototype.getPersonalisation = function() {
		var convertToArray = this.constructor._convertToArray;
		var cookie = argos.cookie.get(this.cookies.personalisation);
		var value = unescape(cookie);
		var date = value.replace(/.*?\{rv:\[.*?\],?(\d*)\}.*/, "$1");
		var personalisation = cookie ? {
			ti : convertToArray.call(value, /.*?\{ti:\[(.*?),?\],?\d*,?\d*\}.*/),
			tic : convertToArray.call(value, /.*?\{ti:\[.*?\],?([,\d]*)\}.*/),
			tim : convertToArray.call(value, /.*?\{tim:\[(.*?),?\]\}.*/),
			rv : {
				products : convertToArray.call(value, /.*?\{rv:\[(.*?)\],?\d*\}.*/),
				updated : (value > 1 ? new Date(value).getTime() : new Date().getTime()) // Initial value == 0
			}
			}:{
			// if cookie doesn't exist.
			ti : new Array(),
			tic : [0,0],
			tim : new Array(),
			rv : {
				products : new Array(),
				updated : (new Date).getTime()
			}
		};
		return personalisation;
	}
	User.prototype.setPersonalisation = function(personalisation) {
		argos.cookie.set(this.cookies.personalisation, escape(this.convertPersonalisationToString(personalisation)), argos.ecxreg("RVI_COOKIE_EXPIRY"));
	}
	User.prototype.convertPersonalisationToString = function(personalisation) {
		// Cannot do anything elegant here because BE Devs haven't formatted very well.
		// Needs to be very hardcoded rather than looping through objects and properties.
		var ti = "{ti:[" + personalisation["ti"] + "]," + personalisation["tic"].toString() + "}";
		var tim = "{tim:[" + personalisation["tim"] + "]}";
		var rv = "{rv:[" + personalisation["rv"].products  + "]," + personalisation["rv"].updated + "}";
		return ti + tim + rv;
	}	
	User.prototype.getPersistentSession = function() {
		// Note: cookie is not giving reliable/useful results for cssClass value so handling inside here.
		var cookie = argos.cookie.get(this.cookies.persistentSession);
		var value = (cookie ? unescape(cookie) : ";;;;;;").split(";");
		var persistentSession = {
			id : value[0],
			name : value[1],
			state : value[2] ? value[2] : "UNKNOWN",
			cssClass : value[2].toLowerCase(),
			giftList : value[4],
			sessionId : value[5],
			remember : value[6] == "REMEMBER_NO" ? false : true
		}
		return persistentSession;
	}
	User.prototype.getName = function() {
		var persistentSession = this.getPersistentSession();
		var state = persistentSession["state"];
		// Backend add &nbsp; if user adds spaces to name value. Need to unescape and replace so they don't affect visual.
		return (state == "RECOGNISED" || state == "LOGGEDIN") ? unescape(persistentSession["name"]).replace(/&nbsp;/g, " ") : "";
	}
	User.prototype.getTrolleyItems = function() {
		return this.getPersonalisation()["ti"];
	}
	User.prototype.getTrolleyCounts = function() {
		// Return Array [totalProducts, totalItems]
		return this.getPersonalisation()["tic"];
	}
	User.prototype.getTrolleyMessage = function() {
		return this.getPersonalisation()["tim"];
	}
	User.prototype.getRecentlyViewed = function() {
		return this.getPersonalisation()["rv"];
	}
	User.prototype.setRecentlyViewed = function(pn) {
		var personalisation = this.getPersonalisation();
		if(personalisation.rv.products.length >= argos.ecxreg("RVI_MAX_PRODUCTS_LISTER")) {
			personalisation.rv.products.pop();
		}
		personalisation.rv.products.unshift(pn);
		personalisation.rv.updated = new Date().getTime();
		this.setPersonalisation(personalisation);
	}
	User.prototype.getState = function() {
		return this.getPersistentSession()["state"];
	}
	User.prototype.limitSession = function() {
		var timeoutDelay = 3600000; // 60 minutes
		var timeoutActiveUser = window.setTimeout(function() {
			window.location = "/webapp/wcs/stores/servlet/ArgosLogoff?langId=" + argos.app.langId + "&storeId=" + argos.app.storeId + "&timeoutActiveUser=yes";
		}, timeoutDelay);
	}
	
	
	/* RVI CONTROLLER (Recently Viewed Items)
	 ****************************************/
	_register(RviController);
	function RviController(node, user, config) {
		Element.call(this, node ? node : null);
		var _user = user;
		var _link = "/webapp/wcs/stores/servlet/RecentlyViewed?storeId=" + argos.app.storeId + "&amp;langId=" + argos.app.langId;
		this.getUser = function() { return _user; }
		if(this.$node) {
			this.property("config", config);
			this.property("title", this.$node.find(config["titleElement"]));
			this.property("showAllActivator", $("<a class=\"button all\" href=\"" + _link + "\">See all</a>"));
			this.property("products", {});
		}
	}
	RviController.prototype = _inherit(Element);
	RviController.prototype.constructor = RviController;
	RviController.prototype.loadingElement = Activatee.prototype.loadingElement;
	RviController.prototype.loading = Activatee.prototype.loading;
	RviController.prototype.removeActivator = function(product, number) {
		var rvi = this;
		var partNumber = $(".partnum", product).text();
		var $product = $(product);
		return new Button({
			cssClass : "button remove remove_" + String(number),
			text : "remove",
			title : "Remove " + partNumber + " from recently viewed items",
			events : {
				click : function() {
					rvi.remove(partNumber);
					rvi.list(partNumber);
					rvi.update();
					argos.tracking.rvi.captureRemove();
				},
				mouseenter : function() {
					$product.addClass("hover");
				},
				mouseleave : function() {
					$product.removeClass("hover");
				}
			}
		});
	}
	RviController.prototype.add = function(product) {
		var user = this.getUser();
		var rv = user.getRecentlyViewed();
		if(rv.products.toString().indexOf(product) < 0) {
			this.getUser().setRecentlyViewed(product);
		}
	}
	RviController.prototype.remove = function(number) {
		var user = this.getUser();
		var personalisation = user.getPersonalisation();
		var products = new Array();
		for(var i=0; i<personalisation["rv"].products.length; ++i) {
			if(personalisation["rv"].products[i] != number) {
				products.push(personalisation["rv"].products[i]);
			}
		}
		personalisation["rv"].products = products;
		user.setPersonalisation(personalisation);
	}
	RviController.prototype.display = function() {
		var config = this.property("config");
		var $products = this.list();
		var product;
		if($products.length > 0) {
			this.$node.show();
			// Add products and remove buttons.
			for(var i=0; (i<config["displayLimit"] && i<$products.length); ++i) {
				product = $products.get(i);
				this.$node.append(product);
				this.$node.append(this.removeActivator(product, i + 1).node);
			}
			// Add "show all" button (if necessary)
			if($products.length > config["displayLimit"]) {
				this.$node.append(this.property("showAllActivator"));
			}
		}
		this.loading(false);
	}
	RviController.prototype.fetch = function() {
		var rvi = this;
		var config = this.property("config");
		var rv = this.getUser().getRecentlyViewed();
		var products = rv.products.length > 0 ? ("&partNumbers=" + rv.products.toString().replace(/,/mg, "&partNumbers=")) : "";
		return $.ajax({
			url : "/webapp/wcs/stores/servlet/MultiProductSummary",
			dataType : "html",
			data : "storeId=" + argos.app.storeId + "&langId=" + argos.app.langId + products,
			success : function(products) {
				$(products).filter(".product").each(function() {
					rvi.list($(".partnum", this).text().replace("/", ""), this);
				});
			}
		});
	}
	RviController.prototype.update = function() {
		var config = this.property("config");
		var $title = this.property("title");
		this.loading(true);
		this.property("showAllActivator").detach();
		$title.detach();
		this.$node.empty();
		$title.appendTo(this.$node);
		this.display();
	}
	RviController.prototype.list = function(id, product) {
		var products = this.property("products");
		var $list = new Collection();
		var type;
		if(arguments.length > 0) {
			if(product) {
				// Add
				products[String(id)] = product;
			}
			else {
				// Remove
				delete products[String(id)];
			}
			this.property("products", products);
		}
		for(var i in products) {
			if(products.hasOwnProperty(i)) {
				$list = $list.add(products[i]);
			}
		}
		return $list;
	}
	
	/* QVP ACTIVATOR (Quick Product Information)
	 *******************************************/
	_register(QvpActivator);
	function QvpActivator(config) {
		Activator.call(this, new _classes.Button({
			cssClass : "button",
			text : "Quick view"
		}).node, config["activatee"]);
		var $product = $(config["product"]);
		var url = $product.find(".image a").attr("href");
		var $container = $(config["container"]);
		if(this.$node) {
			this.property("activatee", config["activatee"]);
			if($container.length > 0) {
				$container.append(this.node);
				this.property("url", url.replace("Product", "QuickView"));
			}
		}
	}
	QvpActivator.prototype = _inherit(Activator);
	QvpActivator.prototype.constructor = QvpActivator;
	QvpActivator.prototype.intent = function() {
		var activatee = this.property("activatee");
		var url = this.property("url");
		activatee.property("ajax", $.ajax({
			url : url,
			success : function(html) {
				activatee.loading(false);
				activatee.setContent(html);
				activatee.addButton();
			}
		}));
	}
	
	/* QVP ACTIVATEE (Quick Product Information)
	 *******************************************/
	_register(QvpActivatee);
	function QvpActivatee(config) {
		Activatee.apply(this, arguments);
	}
	QvpActivatee.prototype = _inherit(Activatee);
	QvpActivatee.prototype.constructor = QvpActivatee;	
	QvpActivatee.prototype.setContent = function(content) {
		var activatee = this;
		var $image = $(".image img", content);
		var load = function() { 
			activatee.modifyContent(); 
			activatee.position();
			activatee.$node.css("visibility", "visible");
		}
		this.$node.css("visibility", "hidden");
		if($image.length > 0) {
			// Continue content addition on image load.
			$image.bind("load", load);
			$image.bind("error", function() {
				// In case we cannot get the image.
				$image.css({"display":"block", "height":(($image.attr("height") > 0) ? $image.attr("height") : 200) + "px" });
				$image.trigger("load");
			});
			if($.browser.opera) {
				// Opera is one browser that doesn't fire load event when image is cached.
				$image.attr("src", $image.attr("src") + "?" + _helpers.uniqueStr());
			}
		}
		else {
			// No image will be found if an error occurred.
			load();
		}
		RecognitionActivatee.prototype.setContent.call(this, content);
	}
	QvpActivatee.prototype.modifyContent = function() {
		var $details = $(".qvpproduct", this.node);
		var $image = $(".image", this.node);
		var $information = $(".information", this.node);
		var availableHeight, $clippedInformation;
		// 1. Clean HTML before we run any height calculations.
		$information.html(_helpers.cleanHtml($information));
		// 2. Calculate available height.
		availableHeight = $image.outerHeight() - ($details.outerHeight(true) - $information.innerHeight());
		// 3. Clip the full details.
		$clippedInformation = _helpers.verticallyClipContent($information.children(), availableHeight);
		$information.empty().append($clippedInformation);
	}
	QvpActivatee.prototype.product = function() {
		var more = $(".more", this.node);
		var title = $(".qvpproduct .title", this.node).text();
		return {
			number : more.length > 0 ? more.attr("href").replace(/^.*partNumber\/(\d*)\.htm$/, "$1") : "",
			pdp : more.attr("href"),
			shortDescription : title, // currently shares title value.
			title : title
		};	
	}

	/* PRODUCT QUEUE
	 ****************/
	_register(ProductQueue);
	function ProductQueue() {
		var _queue = new Array();
		
		this.add = function() {
			// Pass one or more products e.g. add(product[, product, ...]);
			var products = Array.apply(products, arguments);
			for(var i=0; i<products.length; ++i) {
				// Avoid duplications.
				if(_queue.toString().indexOf(String(products[i])) < 0) {
					_queue.push(products[i]);
				}
			}
		}
		this.remove = function() {
			// Pass one or more products to remove e.g. remove(product[, product, ...]);
			var products = Array.apply(products, arguments);
			var product;
			while(products.length > 0) {
				product = products.shift();
				if(_queue.toString().indexOf(String(product)) > 0) {
				  for(var i=0; i<_queue.length; ++i) {
				      if(Number(_queue[i]) == Number(product)) {
				          _queue.splice(i,1);
				          break;
				      }
				  }
				}
			}
		}	
		this.empty = function() {
			_queue = new Array();
		}
		this.queue = function() {
			return _queue;
		}
	}
	ProductQueue.prototype.get = function() {
		// Specify handler functions by using the return value e.g. myQueue.get().done(mySuccessFunction);
		var url = "/webapp/wcs/stores/servlet/MultiProductSummary";
		var data = "storeId=" + argos.app.storeId + "&langId=" + argos.app.langId;
		var queue = this.queue();
		var xhr = null;
		this.empty();
		if(queue.length > 0) {
			data += queue.toString().replace(/(\d{7}),?/g,"&partNumbers=$1");
			xhr = $.ajax({
				url : url,
				data : data
			});
		}
		return xhr;
	}
	ProductQueue.prototype.isEmpty = function() {
		return this.queue().length < 1;
	}
		
	/* PRODUCT
	 **********/
	_register(Product);
	function Product(htmlOrNode) {
		// Build Product object from html or passed DOM node.
		// Most useful for heavy product manipulation and where 
		// we want to avoid repeated to jQuery lookups. 
		_classes.Element.call(this, htmlOrNode);
		var id;
		var $title;
	
		if(this.$node) {
			id = this.$node.attr("id");
			$title = this.$node.find(".title");
			
			if(!id) {
				id = _helpers.uniqueStr("product_");
				this.$node.attr("id", id);
			}
			this.property("title", $title);
			this.property("number", this.$node.find(".number"));
			this.property("price", this.$node.find(".price"));
			this.property("image", this.$node.find(".image"));
			this.property("customerrating", this.$node.find(".customerrating"));
			this.property("location", this.$node.find("a", $title).attr("href"));
			this.property("id", id);
			this.$node.addClass(this.$node.attr("class"));
		}
	}
	Product.prototype = _inherit(Element);
	Product.prototype.constructor = Product;
	
	/* EXPANDER (simple show/hide extra content)
	 * 
	 * Example:
	 *	new _classes.Expander({
	 *		container : $("#myContainer").get(0),
	 *		openText : "More",
	 *		closeText : "Less",
	 *		hidden : $("#myContainer .extraContent")
	 *	});
	 *******************************************/
	_register(Expander);
	function Expander(config) {
		Element.call(this, config["container"]);
		var _expander = this;
		var _button = new Button({
			cssClass : "button",
			text : config["openText"],
			events : {
				click : function() {
					_expander.toggle();
				}
			}
		});
		
		this.getButton = function() { return _button; }
		if(this.node && config["hidden"].length > 0) {
			this.$node.append(_button.node);
			this.property("config", config);
			this.toggle();
		}
	}
	Expander.prototype = _inherit(Element);
	Expander.prototype.constructor = Expander;
	Expander.prototype.getHiddenHeight = function() {
		var $hidden = this.property("config")["hidden"];
		var height = 0;
		$hidden.each(function(i) {
			if(i>0) {
				height += $(this).outerHeight(true);
			}
		});
		return height;
	}
	Expander.prototype.open = function() {
		var config = this.property("config");
		config["hidden"].slideDown();
		this.getButton().$node.text(config["closeText"]);
		this.setStatus("open");
	}
	Expander.prototype.close = function() {
		var config = this.property("config");
		config["hidden"].slideUp();
		this.getButton().$node.text(config["openText"]);
		this.setStatus("closed");
	}
	Expander.prototype.toggle = function() {
		if(this.property("status") == "closed") {
			this.open();
		}
		else {
			this.close();
		}
	}	

	/* COLLECTION (jQuery Collection allowing for old version)
	 **********************************************************/
	_register(Collection);
	function Collection() {
		// Previously created to compensate for .length issues with < jQuery 1.4.
		// Can now all var blah = new Collection(); assigments with var blah = $()
		// because we're using jQuery 1.7.2 + 
		// (OLD CODE) 
		//return jQuery.extend(this, (this.jquery < 1.4) ? $() : $().slice(1));
		return jQuery.extend(this, $());
	}
	Collection.prototype.reverse = function() {
		// This won't exist if you use jQuery collection.add because that returns a new jQuery object.
		var $reversed =  new _classes.Collection();
		for(var i=this.length; i>=0; --i) {
			$reversed = $reversed.add(this.eq(i));
		}
		return $reversed;
	} 

	/* POLLING FUNCTION
	 *******************/
	_register(Ping);
	function Ping(config) {
		// Allows you to setup a function to run when finally done.
		var _delay = config["delay"] ? config.delay : 500;
		var _limit = config["limit"] ? config.limit : 60000; // 1000 = 1 second.
		var _whenReadyTries = 0;
		var _config = config ? config : {};

		function _whenReady() {
			var repeat = _config["onEach"] ? _config.onEach.apply(this, _config["argumentsOnEach"]) : false;
			if(!repeat || (_limit && _whenReadyTries++ * _delay > _limit)) {
				// Fires when limit is reached.

				if(_config["onEnd"]) {
					_config.onEnd.apply(this, _config["argumentsOnEnd"]);
				} 
			}
			else {
				// Fires onEach ping.
				window.setTimeout(_whenReady, _delay);
			}
		}
	}
	

	/* CUSTOM ERRORS
	 ****************/
	function ArgosComponentError(message) {
		this.name = "ArgosComponentError";
		this.message = message || "An error has occurred inside an Argos component";
	}
	ArgosComponentError.prototype = new Error();
	ArgosComponentError.prototype.constructor = ArgosComponentError;
	
	function ArgosElementError(message) {
		this.name = "ArgosElementError";
		this.message = message || "An error has occurred relating to an Argos element";
	}
	ArgosElementError.prototype = new Error();
	ArgosElementError.prototype.constructor = ArgosElementError;
	
	function ArgosConfigurationError(message) {
		this.name = "ArgosConfigurationError";
		this.message = message || "An error has occurred relating to an Argos configuration";
	}
	ArgosConfigurationError.prototype = new Error();
	ArgosConfigurationError.prototype.constructor = ArgosConfigurationError;
	
});
	
	
