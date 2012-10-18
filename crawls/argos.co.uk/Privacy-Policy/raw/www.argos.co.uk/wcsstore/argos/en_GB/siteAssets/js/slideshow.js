
argos.classes.Slideshow = function(options) {
	// Horizontal or vertical rotation of items.
	// Uses jQuery

	// PRIVATE VARIABLES (slideShow)
	var _slideshow = this;
	var _html = "";
	var _container = null;
	var _controller = null;
	var _current = 1;
	var _slides = new Array();
	var _automated = false;
	var _component = null;
	var _content = null;
	var _automateId = null;
	var _updating = false;
	var _pause = null;
	var _pauseTimer = null;
	var _urlsReceived = 0;

	var _classes = {	
		Button : argos.classes.Button,
		Element : argos.classes.Element
	}
	
	var _helpers = {
		getType : argos.utils.getType
	}

	// EXTERNALLY CONFIGURABLE OPTIONS.
	var _options = _updateOptions.call(new Object({
		"automate" : true,
		"buttons" : false,
		"cssSelectedClass" : "selected",
		"cssSlideClass" : "slide",
		"cssSlidesClass" : "slides",
		"cssSlideshowClass" : "slideshow",
		"delay" : 0, // Number of milliseconds to wait before restarting animation after mouseout of automated slideshow.
		"done" : function() {}, // Function to allow other actions only after creation (useful for post-manipulating slides).
		"duration" : 750, // Effect duration
		"effect" : "fade", // or several others (see _update function)
		"interval" : 5000, // Slide cycle time
		"replaceContent" : true, // Replaces anything in the target element with slideshow component.
		"supportIE6HoverOnButtons" : true,
		"target" : null, // jQuery selecter or DOM node of container element.
		"text" : new Array(),// or null - Empty Array is default and slideshow will attempt to find some text. Passing the null value will tell the slideshow to use slide numbers.
		"uniqueId" : null, // (backwards compat) was #id of target element (still works) now used as unique slide id prefix if multiple slideshows required.
		"urls" : new Array(),
		"wrapperSlide" : "<div></div>",
		"wrapperSlides" : "<div></div>",
		"wrapperSlideshow" : "<div></div>"
	}), options);


	// PRIVATE FUNCTIONS (slideShow)
	(function _init() {
		var error = false;
		var id = _options.uniqueId;
		var urls = _options.urls;
		var slide;

		_container = _options.target ? $(_options.target) : $("#" + id);

		if (_container.length <= 0) {
			alert("Error: Unable to find element with \n\n'" + (_options.target ? "target value " + _options.target : "id " + id) + "'");
			error = true;
		}

		if (urls.length <= 0 && !error) {
			alert("Error: Not enough content URLs specified.");
			error = true;
		}

		// Only create slideshow if container exists and we have one or more url.
		if (!error) {
			_component = $(_options.wrapperSlideshow);
			_content = $(_options.wrapperSlides);
			_pause = _createPauseButton();
			_controller = _createController();
			_content.addClass(_options.cssSlidesClass);
			_content.css("position", "relative");
			_component.addClass(_options.cssSlideshowClass);
			_component.append(_content);
			_component.append(_controller.$node);

			// Empty container or turn original content into first slide.
			if(_options.replaceContent) {
				_container.empty();
			}
			else {
				_content.prepend(_createSlide(0));
				_updateSlideWithElement(0, _container.children().not("script"));
			}
			_container.append(_component);
			_createSlidesFromUrls(urls);
		}
	}).call(this);

	function _updateOptions(customisations) {
		// Update options with new values.
		for ( var c in customisations) {
			this[c] = customisations[c];
		}
		return this;
	}
	
	function _createSlidesFromUrls(urls) {
		if(_helpers.getType(urls) == "String") {
			urls = new Array(urls); // Turn single into array for same processing.
		}
		for(var i=0; i<urls.length; ++i) {
			$.ajax({
				url : urls[i],
				complete : function() {
					_urlsReceived++;
					if(_urlsReceived == urls.length) {
						_createSlidesFromHtml();
					}
				},
				success : function(html) {
					_html += html;
				}
			});
		}
	}

	function _createSlide(num) {
		var slide = $(_options.wrapperSlide);
		slide.attr("id", (_options.uniqueId ? _options.uniqueId + "_" : "slide_") + num)
				.addClass(_options.cssSlideClass).css( {
					"left" : "0px",
					"position" : "absolute",
					"top" : "0px"
				}).hover( function() {
					if (_automated)
						window.clearTimeout(_pauseTimer);
						_clickPause();
				}, function() {
					_pauseTimer = window.setTimeout(function() {
						_clickPause();
					}, _options.delay);
				});
		_slides.push(slide);
		return slide;
	}
	
	function _createSlidesFromHtml() {
		var html = /^<[a-zA-Z]+\b\s*.*>$/mig;
		if(html.test(_html)) {
			$(_html).filter(function(index){ return this.nodeType == 1; }).each(function(i) {
				if(this.tagName.toLowerCase() != "script") {
					i = _options.replaceContent ? i : i + 1;
					_content.prepend(_createSlide(i));
					_updateSlideWithElement(i, this);
				}
				else {
					_content.prepend(this);
				}
			});
		}
		
		if(_slides.length <= 1) {
			_removeController();
			for(var i=0; i<_slides.length; ++i) {
				_slides[i].unbind();
			}
		}
		
		if(_slides[0]) {
			_slides[0].show();
		}
		
		if(_options.automate) {
			_slideshow.play();
		}
		
		// Post creation function call.
		_options.done();
	}
	
	function _updateSlideWithElement(slide, element) {
		_slides[slide].empty();
		_slides[slide].append(element);
		_controller.$node.append(_createNavigationButton(slide).$node);

		_slides[slide].find("img").each( function() {
			// Adjust dimensions but try to do it when images loaded.
			var img = $(this);
			img.load(_adjustDimensions);
			if (this.complete) {
				_adjustDimensions();
				_slides[slide].hide();
			}
		});
	}
	
	function _adjustDimensions() {
		var cH, cW, mH, mW, sH, sW;

		// Get maximum dimensions.
		for ( var i = 0; i < _slides.length; ++i) {
			cH = _content.height();
			cW = _content.width();
			sH = _slides[i].height();
			sW = _slides[i].width();

			mH = (cH < sH) ? sH : cH;
			mW = (cW < sW) ? sW : cW;
		}

		// Set dimensions to detected maximum.
		_content.height(mH);
		_content.width(mW);
		_content.css("overflow", "hidden");
	}

	function _createController() {
		// Create the controller and initialise states/values.
		var controller = new _classes.Element("<div class=\"controller\"></div>");
		controller.property("buttons", new Array());
		controller.property("selected", 0);
		controller.$node.append(_pause.$node);
		if(!_options.buttons) {
			// Safari 5.1 still showing after controller.hide()
			controller.$node.css({
				display : "none",
				visibility : "hidden" 
			});
		} 
		return controller;
	}
	
	function _removeController() {
		_controller.$node.remove();
		_controller = null;
	}
	
	function _createPauseButton() {
		return new _classes.Button({
			cssClass : "control pause",
			text : "Pause",
			events : {
				click : function() {
					var t = $(this);
					if (t.text() == "Pause") {
						_stopAutomation();
						t.text("Play");
					} else {
						_slideshow.play();
						t.text("Pause");
					}
					t.toggleClass("play");
					t.blur();
				}
			}
		});
	}
	
	function _clickPause() {
		// Workaround to fix bug where mouseover pauses by calling _pause.$node.click()
		// but if button is display:none this doesn't work. 
		if(_pause.$node.css("display") == "none") {
			_pause.$node.css({
				"display" : "block",
				"left" : "-10000px",
				"position" : "absolute",
				"z-index" : "-1"
			});
		}
		_pause.$node.click();
	}

	function _createNavigationButton(num) {
		// Create buttons for slide items and append to controller.
		var button = new _classes.Button({
			cssClass : "navigation" + (num < 1 ? " " + _options.cssSelectedClass : "" ) + (num == _slides.length + 1 ? " buttonLast" : ""),
			text : _getTextForButton(num),
			events : {
				click : function(e) {
					e.preventDefault();
					if (_options["automate"] && _automated) {
						// Stop animation. Restart after delay.
						_clickPause();
					}
					_update(this.Element.property("slideNumber"));
					$(this).blur();
				}
			}
		});
		
		button.property("slideNumber", num);
		
		// compensation for lack of :hover support in IE6
		if (_options.supportIE6HoverOnButtons && jQuery.browser.msie && Math.floor(jQuery.browser.version) <= 6) {
			button.$node.bind("mouseover mouseout", function() {
				$(this).toggleClass("button_hover")
			});
			button.$node.bind("mouseover mouseout", function() {
				$(this).toggleClass("button_hover")
			});
		}		
		
		_controller.property("buttons").push(button);
		return button;
	}

	function _getTextForButton(num) {
		// Try to determine some text, from within the slide, that can be used
		// as button text. Text can be specified directly by Array _options.text, 
		// or can be assigned numbering with the _options.text = null setting.
		var slide = _slides[num];
		var text, el;

		// Should we just use assigned numbering.
		if(_options.text == null) {
			text = num;
		}

		// See if button text has been set in the options.
		if(text == undefined && _helpers.getType(_options.text) == "Array" && _options.text.length > num) {
			text = _options.text[num];
		} 

		// See if there's a Header element to use...
		if (text == undefined && (el = slide.find("h1,h2,h3,h4,h5,h6")) && el.length > 0)
			text = el.text();

		// Or maybe there's a link...
		if (text == undefined && (el = slide.find("a")) && el.length > 0)
			text = (el.text() != "") ? el.text() : el.attr("title");

		// Or maybe there's an image Alt attribute.
		if (text == undefined && (el = slide.find("img")) && el.length > 0)
			text = el.attr("alt");

		// add more as appropriate...

		// Last-ditch attempt to find something.
		if (text == undefined)
			text = slide.text();

		return (text) ? text : "default";
	}

	function _update(num) {
		// Fade current item out. Selected item fade in. Set _current variable to keep track.
		var selected = _controller.property("selected");
		var buttons = _controller.property("buttons");

		if(!_updating) {
			_updating = true;
			buttons[selected].$node.removeClass(_options.cssSelectedClass);
			buttons[num].$node.addClass(_options.cssSelectedClass);

			// Handle effect based on option setting.
			switch(_options.effect.toLowerCase()) {
				case "fade" : _transitionFade(_slides[selected], _slides[num]);
					break;
				case "rollup" : _transitionRoll(_slides[selected], _slides[num], "up");
					break;
				case "rolldown" : _transitionRoll(_slides[selected], _slides[num], "down");
					break;
				case "rollleft" : _transitionRoll(_slides[selected], _slides[num], "left");
					break;
				case "rollright" : _transitionRoll(_slides[selected], _slides[num], "right");
					break;
				case "shrinkcentre" : _transitionShrink(_slides[selected], _slides[num], "centre");
					break;
				case "shrinktopleft" : _transitionShrink(_slides[selected], _slides[num], "topleft");
					break;
				case "shrinktopright" : _transitionShrink(_slides[selected], _slides[num], "topright");
					break;
				case "shrinkbottomleft" : _transitionShrink(_slides[selected], _slides[num], "bottomleft");
					break;
				case "shrinkbottomright" : _transitionShrink(_slides[selected], _slides[num], "bottomright");
					break;
				case "swipeup" : _transitionSwipe(_slides[selected], _slides[num], "up");
					break;
				case "swipedown" : _transitionSwipe(_slides[selected], _slides[num], "down");
					break;
				case "swipeleft" : _transitionSwipe(_slides[selected], _slides[num], "left");
					break;
				case "swiperight" : _transitionSwipe(_slides[selected], _slides[num], "right");
					break;
				case "swipeleft" : _transitionSwipe(_slides[selected], _slides[num], "left");
					break;
				default : _transitionSwitch(_slides[selected], _slides[num]);
			}

			_controller.property("selected", num);
		}

		return false;
	}

	function _transitionFade(current, next) {
		// Fade out/Fade in
		current.fadeOut(_options.duration);
		next.fadeIn(_options.duration, function() { _updating = false; });
	}

	function _transitionSwitch(current, next) {
		// Blunt switch from one to another.
		current.hide();		
		next.show();
		_updating = false;
	}

	function _transitionShrink(current, next, orientation) {
		var css = {};
		var animation = {};
		var currentTrc = current.find(".temporaryRollContainer");
		var nextTrc = next.find(".temporaryRollContainer");
		var trcAnimation = {};
		var reset = {"height":"auto", "left":"auto", "position":"absolute", "top":"auto", "width":"auto"};

		switch(orientation) {
			case "topleft" : 
				css = {"height":"inherit", "left":"0px", "top":"0px", "width":"inherit"};
				animation = {"height":"-=100%", "width":"-=100%"};
				break;
			case "topright" : 
				css = {"height":"inherit", "left":"auto", "right":"0px", "width":"inherit"};
				animation = {"height":"-=100%", "width":"-=100%"};
				break;
			case "bottomleft" : 
				css = {"bottom":"0px", "height":"inherit", "left":"0px", "top":"auto", "width":"inherit"};
				animation = {"height":"-=100%", "width":"-=100%"};
				break;
			case "bottomright" : 
				css = {"bottom":"0px", "height":"inherit", "left":"auto", "right":"0px", "top":"auto", "width":"inherit"};
				animation = {"height":"-=100%", "width":"-=100%"};
				break; 
			default : 
				css = {"height":"inherit", "left":"0px", "top":"0px", "width":"inherit"};
				animation = {"height":"-=100%", "left":"+=50%", "top":"+=50%", "width":"-=100%"};
				trcAnimation = {"left":"-=50%", "top":"-=50%"};
		}

		// add temporary container if doesn't exist.
		if(currentTrc.length < 1) {
			current.contents().wrapAll("<div class=\"temporaryRollContainer\"></div>");
			currentTrc = current.find(".temporaryRollContainer");
		}

		// reset and preparation
		currentTrc.css(reset);
		nextTrc.css(reset);
		current.css(css);
		next.css(css);
		next.show();

		// animation
		if(trcAnimation.left)
			currentTrc.animate(trcAnimation, _options.duration);
 
		current.animate(animation, {
			duration : _options.duration, 
			easing : "linear",
			complete : function() {
				current.hide();
				_updating = false;
			}
		});
	}

	function _transitionRoll(current, next, direction) {
		var css = {};
		var animation = {};
		var currentTrc = current.find(".temporaryRollContainer");
		var nextTrc = next.find(".temporaryRollContainer");
		var trcAnimation = {};

		switch(direction) {
			case "up" : 
				css = {"height":"auto"};
				animation = {"height":"-=100%"};
				break;
			case "right" : 
				css = {"left":"0px"};
				trcAnimation = {"left":"-=100%"};
				animation = {"left":"+=100%"};
				break;
			case "down" : 
				css = {"top":"0px"};
				trcAnimation = {"top":"-=100%"};
				animation = {"top":"+=100%"}; 
				break;
			default : 
				css = {"width":"auto"};
				animation = {"width":"-=100%"};
		}

		// right and down need this. doesn't affect up and left.
		if((direction == "right" || direction == "down") && currentTrc.length < 1) {
			current.contents().wrapAll("<div class=\"temporaryRollContainer\"></div>");
			currentTrc = current.find(".temporaryRollContainer");
		}

		// reset and preparation
		currentTrc.css({"left":"0px", "position":"absolute", "top":"0px"});
		nextTrc.css({"left":"0px", "position":"absolute", "top":"0px"});
		next.css(css);
		next.show();

		// animation
		if(direction == "right" || direction == "down") {
			current.css({"height":"inherit", "overflow":"hidden", "width":"inherit"});
			currentTrc.animate(trcAnimation, _options.duration);
		}
 
		current.animate(animation, {
			duration : _options.duration, 
			easing : "linear",
			complete : function() {
				current.hide();
				_updating = false;
			}
		});
	}

	function _transitionRollUp(current, next) {
		next.css("z-index", 1);
		current.css("z-index", 2);
		next.show();
		current.slideUp(_options.duration, function() {
			_updating = false;
		});
	}

	function _transitionRollLeft(current, next) {
		next.css({"width":"auto", "z-index":1});
		current.css("z-index", 2);
		next.show();
		current.animate({
				width: '-=100%'
			},{
			duration : _options.duration, 
			easing : "linear",
			complete : function() {
				current.hide();
				_updating = false;
			}
		});
	}

	function _transitionSwipe(current, next, direction) {
		var css = {};
		var animation = {};
		switch(direction) {
			case "up" : 
				css = {"top":"0px"};
				animation = {"top":"-=100%"};
				break;
			case "right" : 
				css = {"left":"0px"};
				animation = {"left":"+=100%"};
				break;
			case "down" : 
				css = {"top":"0px"};
				animation = {"top":"+=100%"}; 
				break;
			default : 
				css = {"left":"0px"};
				animation = {"left":"-=100%"};
		}
		next.css(css);
		next.css("z-index", 1);
		current.css("z-index", 2);
		next.show();
		current.animate(animation, {
			duration : _options.duration, 
			easing : "linear",
			complete : function() {
				current.hide();
				_updating = false;
			}
		});
	}

	function _stopAutomation() {
		window.clearInterval(_automateId);
		_automateId = null;
		_automated = false;
	}

	// PUBLIC FUNCTIONS (slideShow)
	this.forward = function() {
		var current = _controller.property("selected");
		if (!_updating) {
			if (current < _controller.property("buttons").length - 1) {
				current++;
			} else {
				current = 0;
			}
			_update(current);
		}
	}

	this.back = function() {
		// not currently enabled.
	}

	this.play = function() {
		// Automate the forward/backward movements.
		var options = _options;
		var interval = options.interval > options.duration ? options.interval : options.duration + 100;
		var direction = options.reverse ? _slideshow.back : _slideshow.forward;
		if (_controller && !isNaN(interval) && interval > 1) {
			_automated = true;
			_automateId = window.setInterval(direction, interval);
		}
	}

}