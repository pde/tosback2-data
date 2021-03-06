/**
 * JB.Helper.beautifier is jQuery plugin that beautifies form elements.
 * @return {Object} this
 */

JB.Helper.beautifier = function(){
	this.each(function(i, el){
		var $el = $(el);
		var nodeName = el.nodeName.toLowerCase();
		switch(nodeName){
			case "select":
				$el = $(el).parents("[class*=dropdown]");
				$el.select = $el.children("select");
				$el.selected = $el.find(".dd-num");
				$el.title = $el.find(".dd-text");
				$el.list = $el.find("ol");
				$el.bind("click", function(e){
					$el.offclick(function(e){
						$el.removeClass("active");
					});
					if($(this).hasClass("disabled")) return;
					$(this).toggleClass("active");
					if(e.target.parentNode !== $el.list[0]) return;
					var value = $(e.target).text();
					$el.selected.text(value);
					$el.select[0].selectedIndex = $el.select.find("option").index($el.select.find("option[value=" + value + "]")); // IE7 Workaround
					$el.select.val(value).trigger("change");
				});
			break;

			case "input":
				var nodeType = $el.attr("type");
				switch(nodeType){
					case "radio":
						$el = $el.parent();
						$el.radio = $el.children("input[type=radio]");
						$el.name = $el.radio.attr("name");
						$el.attr("rel", $el.name);
						if($el.radio[0].checked) $el.addClass("active");
						$el.toggle = function(){
							$("[rel=" + $el.name + "]").removeClass("active");
							$el.addClass("active");
							$el.radio[0].checked = "checked";
						};
						$el.bind("click change", function(e){
							if($(this).hasClass("active")) return;
							$el.toggle();
							$el.radio.trigger("change");
						});
					break;
				}
			break;
			
			// this is for simple dropdowns
			case "div": case "li":
				$el.click(function(e){
					$el.offclick(function(e){
						$el.removeClass("active");
					});
					$(this).toggleClass("active");
				});
			break;
		}
	});
	return this;
};


/**
 * JB.Helper.enhance is jQuery plugin that beautifies form elements.
 * @return {Object} this
 */

JB.Helper.enhance = function(options){
	var self = this;
	this.options = {
		classNamePrefix: "jb"
	};
	$.extend(this.options, options);
	this.each(function(i, el){
		var $el = $(el);
		var nodeName = el.nodeName.toLowerCase();
		switch(nodeName){
			case "select":
				// Generate Markup
				var classNamePrefix = self.options.classNamePrefix + "-select";
				$el.select = $el.hide();
				$el.select.options = $el.select.find("option");
				$el.select.options.selected = $el.select.options.filter("[selected]");
				$el.wrapper = $el.select.wrap("<div class='" + classNamePrefix + "'></div>").parent().addClass($el.select[0].name);
				var list = "";
				for(var i = 0; i < $el.select.options.length; i++){
					if(!!$el.select.options.eq(i).attr("selected")) var className = " class='selected'";
					else var className = "";
					list += "<li" + className + " title='" + $el.select.options[i].value + "'><span>" + $el.select.options.eq(i).text() + "</span></li>";
				}
				$el.dropdown = $("<div class='" + classNamePrefix + "-dropdown'><ul>" + list + "</ul></div>").prependTo($el.wrapper);
				$el.dropdown.list = $el.dropdown.find("li");
				$el.title = $("<span class='" + classNamePrefix + "-title'>" + $el.select.options.selected.text() + "</span>").prependTo($el.wrapper);

				// Multi Select Logic
				$el.select.multiple = $el.select.attr("multiple");
				if(($el.select.multiple == "multiple")){
					$el.select.size = $el.select.attr("size");
					$el.dropdown.list.toggle(function(e){
						var $li = $(this);
						$li.addClass("selected");
						$el.select.options.filter("[value='" + $li.attr("title") + "']").attr("selected", "selected");
						$el.select.trigger("change");
					}, function(e){
						var $li = $(this);
						$li.removeClass("selected");
						$el.select.options.filter("[value='" + $li.attr("title") + "']").removeAttr("selected");
						$el.select.trigger("change");
					});
					$el.select.options.filter("[selected]").each(function(i, el){
						$el.dropdown.list.filter("[title='" + $(el).attr("value") + "']").trigger("click");
					});
					$el.wrapper.removeClass(classNamePrefix).addClass(classNamePrefix + "-multi-select").addClass(classNamePrefix + "-size-" + $el.select.size);
					return;
				}

				// Interaction Logic
				// Show/Hide Dropdown Click Event Handler
				$el.title.click(function(e){
					$el.wrapper.addClass(classNamePrefix + "-active").offclick(function(){
						$el.wrapper.removeClass(classNamePrefix + "-active");
					});
				});

				// List Options Select Event Handler
				$el.dropdown.click(function(e){
					var nodeName = e.target.nodeName.toLowerCase();
					if(nodeName == "span") var $li = $(e.target).parent();
					else if(nodeName == "li") var $li = $(e.target);
					else return;
					var value = $li.attr("title");
					$el.title.text($li.text());
					$el.select[0].value = value;
					$el.select.options.selected.removeAttr("selected");
					$el.select.options.filter("[value='" + value + "']").attr("selected", "selected");
					$el.dropdown.list.filter("[class='selected']").removeClass("selected");
					$el.dropdown.list.filter("[title='" + value + "']").addClass("selected");
					$el.wrapper.removeClass(classNamePrefix + "-active");
					$el.select.trigger("change");
				});
			break;

			case "input":
				var nodeType = $el.attr("type");
				switch(nodeType){
					case "checkbox":
						// Generate Markup
						var classNamePrefix = self.options.classNamePrefix + "-checkbox";
						$el.checkbox = $el.hide();
						$el.wrapper = $el.checkbox.wrap("<span class='" + classNamePrefix + "'></span>").parent().addClass($el.checkbox[0].name);

						// Toggle Event Handler
						$el.wrapper.toggle(function(e){
							$el.wrapper.addClass(classNamePrefix + "-active");
							$el.checkbox.attr("checked", "checked");
							$el.checkbox.trigger("change");
						}, function(e){
							$el.wrapper.removeClass(classNamePrefix + "-active");
							$el.checkbox.removeAttr("checked");
							$el.checkbox.trigger("change");
						});

						if($el.checkbox[0].checked) $el.wrapper.trigger("click");
					break;
				}
			break;
		}
	});
};


/**
 * JB.Helper.offclick
 * Off target element click event trigger handler
 */

JB.Helper.offclick = function(callback, forceClose){
	this.each(function(i, el){
		var $el = $(el);
		if(!!($el.data("offclick"))) return;
		$el.offTargetTrigger = function(e){
			if(forceClose){ if($.isFunction(callback)) callback(e); }
			e.stopPropagation();
			var isOffTarget = !(!!($(e.target).parents("[class='" + $el.attr("class") + "']").length) || (e.target == $el[0]));
			if(!isOffTarget) return;
			if($.isFunction(callback)) callback(e);
			$(document).unbind("click", $el.offTargetTrigger);
			$el.removeData("offclick");
		};
		$(document).bind("click", $el.offTargetTrigger);
		$el.data("offclick", true);
	});
};


/**
 * JB.Helper.onFocusClear
 * Clears form inputs of default value.
 */

JB.Helper.onFocusClear = function(){
	this.each(function(i, el){
		var $el = $(el);
		$el.placeholder = $el.attr("placeholder");
		$el.addClass("placeholder");
		if(!!($el.placeholder))	this.defaultValue = $el.placeholder;
		$el.focusin(function(e){
			if(this.value === this.defaultValue) this.value = "";
			$el.removeClass("placeholder");
		}).focusout(function(e){
			if(!!!(this.value)){
				this.value = this.defaultValue;
				$el.addClass("placeholder");
			}
		}).trigger("focusout");
	});
};


/**
 * JB.Helper.tooltipOpen
 * Shows tooltip on hover
 * @param {Object} this accepts a serializedArray
 */

JB.Helper.tooltip = function(options){
	// Default settings in case the developer didn't pass in arguments
	var defaults = {
		xPosNudge: 0, 		//integer, negative or positive number, nudges the css left property of the tooltip, 
		yPosNudge: 0,		//integer, negative or positive number, nudges the css top property of the tooltip, 
		dataHolder: null 	//string, if the data is located in a different element than '.tooltip-data'
	};
	// Modifies any default properties with custom properties that were passed into this carousel method as an arguement object
	var options = $.extend(defaults, options);
	tooltip = $("<div id=\"tooltip\"><div class=\"tooltipChromeMiddleRight\"><div class=\"tooltipChromeMiddleLeft\"><div class=\"tooltipChromeMiddle\"><div class=\"tooltipContentArea\"></div></div></div></div></div>");
	tooltip.prepend('<div class="tooltipChromeTopRight"><div class="tooltipChromeTopLeft"><div class="tooltipChromeTop">&nbsp;</div></div></div>');
	tooltip.append('<div class="tooltipChromeBottomRight"><div class="tooltipChromeBottomLeft"><div class="tooltipChromeBottom">&nbsp;</div></div></div>');
	tooltip.append('<div class="tooltipChromeArrow">&nbsp;</div>');
	$("body").append(tooltip);
	
	// Set tooltip isBuild property to true
	JB.Session.tooltip.isBuilt = true;
	this.each(function(){
		jQuery(this).bind("mouseover mouseout", function(e){
			var target = jQuery(this),
				tooltip = jQuery('#tooltip'),
				tooltipContentArea = jQuery('#tooltip').find('div.tooltipContentArea');
			if(e.type == 'mouseover'){
				// Check in page dimensions have been calculated
				if(!JB.Session.pageDimensions.isSet) JB.Fn.getAllPageDimensions();
				// Clone dimensions object in Amp
				var dimensions = JB.Session.pageDimensions;
				// Add class semi-mirroring the tooltip trigger
				tooltip.addClass(target.attr('id'));	
				// Find data to inject into tooltip
				var tooltipData;
				if (!!options.dataHolder){
					tooltipData = target.siblings(options.dataHolder).html();
				} else {
				 	tooltipData = target.siblings('.tooltip-data').html();
				}
				// Inject data into tooltip content area
				tooltipContentArea.html(tooltipData);
				// Calculate anchor dimensions
				var anchorTop	 = target.offset().top,
					anchorLeft	 = target.offset().left,
					anchorHeight = target.outerHeight(true),
					anchorWidth	 = target.outerWidth(true),
				// Retrieve browser window dimensions	
					windowWidth	  = dimensions.windowHeight, 
					windowHeight  = dimensions.windowWidth,
				// Create variables for tooltip xy coordinates and calculate tooltip content's dimensions	
					tooltipLeft = 0,
					tooltipTop = 0,
					tooltipWidth = tooltip.width(),
					tooltipHeight = tooltip.height();
				var leftBound = jQuery("body").offset(),
					rightBound = jQuery("body").width();
				tooltipLeft = anchorLeft + (anchorWidth / 2) - (tooltipWidth / 2) + (options.xPosNudge);
				var arrowPos = tooltipWidth / 2;
				tooltipTop = anchorTop - tooltipHeight - 3 + (options.yPosNudge); 
				arrowPos = arrowPos /* - 13 */; //Offset by half of the arrow width
				//Check to make sure the tooltip will appear in the window's current viewport.
				if (tooltipLeft < leftBound) {
					var tooltipOffset = (Math.abs(tooltipLeft) - leftBound) + 20; //Add 20 to give it some breathing room at the left edge of the window
					tooltipLeft = tooltipLeft + tooltipOffset  + (options.xPosNudge);
					arrowPos = arrowPos - tooltipOffset;
				} else if ((tooltipLeft + tooltipWidth) > rightBound) {
					var tooltipOffset = (rightBound - (tooltipLeft + tooltipWidth)) - 20; //Subtract 20 to give it some breathing room at the right edge of the window
					
					tooltipLeft = tooltipLeft + tooltipOffset  + (options.xPosNudge);
					arrowPos = arrowPos - tooltipOffset;
				}
				// set the tooltip's position based on the above calculations
				tooltip.css({
					top:   tooltipTop,
					left:  tooltipLeft
				});
			} else if(e.type == 'mouseout'){
				tooltip.attr('style', '');
			}
		})
	})
};