/*
 * jixedbar - a jQuery fixed bar plugin.
 * http://code.google.com/p/jixedbar/
 * 
 * Version 0.0.5 (Development)
 * 
 * Copyright (c) 2009-2010 Ryan Yonzon, http://ryan.rawswift.com/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Last update - September 21, 2010
 * Updated - 03/13/2012 - updated for specific look and function 
 */

(function($) { // start jixedbar's anonymous function

	$.extend({
		
		// jixedbar plugin method
		jixedbar: new function(options) {
			var constants = { // constant variables, magic variables that'll make the bar stick on the bottom or the top portion of any browser
					constOverflow: "hidden",
					constBottom: "0px"
				};
			var defaults = { // default options
					showOnTop: false, // show bar on top, instead of default bottom
					transparent: false, // enable/disable bar's transparent effect
					opacity: 0.9, // default bar opacity
					opaqueSpeed: "fast", // default opacity speed effect
					slideSpeed: "fast", // default slide effect
					roundedCorners: true, // rounded corners only works on FF, Chrome, Latest Opera and Safari
					roundedButtons: true, // only works on FF, Chrome, Latest Opera and Safari
					menuFadeSpeed: 250, // menu fade effect
					tooltipFadeSpeed: "slow", // tooltip fade effect
					tooltipFadeOpacity: 0.8 // tooltip fade opacity effect
				};
			var options = $.extend(defaults, options); // merge defaults and options object
			
			/* IE6 detection method */
			//var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
			/* var ie7 = window.XMLHttpRequest; // simple way to detect IE7 (see variable below) */
			//var ie7 = (document.all && !window.opera && window.XMLHttpRequest); // ...but I guess this is a much more accurate method
			
			/* APL changed IE version check becuase it wasn't working correctly in IE9 */
			var ie6 = ($.browser.msie && parseInt($.browser.version, 10)==6 );
			var ie7 = ($.browser.msie && parseInt($.browser.version, 10)==7 );

			var button_active = false; // active button flag
			var active_button_name = ""; // name of current active button
			var element_obj; // reference to bar's element
		
			/** public methods **/
			
			// jixedbar constructor
			this.construct = function() {
				
				return this.each(function() {
					var obj = $(this); // reference to selected element
					var screen = jQuery(this); // reference to client screen size
					var fullScreen = screen.width(); // get screen width
					var centerScreen = (fullScreen/2) * (1); // get screen center
					var hideBar = false; // default bar hide/show status

					element_obj = obj; // set bar's element object for public method use					
					
					/*
					if ($(this).checkCookie("showmeebo=SPBMID")) { // check if cookie already exists
						if ($(this).readCookie("showmeebo=SPBMHID") == "true") {
							this.hideBar = true; // hide bar
						}
					} else { // else drop cookie
						$(this).createCookie("showmeebo=SPBMID", $(this).genRandID()); // set random ID and create cookie
						$(this).createCookie("showmeebo=SPBMHID", false); // set bar hide to false then create cookie
					}
					*/
					if ($(this).checkCookie("GoalPilot")) { // check if cookie already exists
						if ($(this).readCookieMulti("GoalPilot","SPBMHID") == "true") {
							this.hideBar = true; // hide bar
						}
					} else { // else drop cookie
						//$(this).createCookie("showmeebo=SPBMID", $(this).genRandID()); // set random ID and create cookie
						$(this).createCookieMulti("GoalPilot","SPBMHID", false); // set bar hide to false then create cookie
					}
					

					// set html and body style for jixedbar to work
					//if (($.browser.msie && ie6) || ($.browser.msie && ie7)) { // check if we have an IE client browser
					if (($.browser.msie && ie6) ) { // check if we have an IE client browser
		                $("html").css({"overflow" : "hidden", "height" : "100%"});
		                $("body").css({"margin": "0px", "overflow": "auto", "height": "100%"});
					} else { // else for FF, Chrome, Opera, Safari and other browser
						$("html").css({"height" : "100%"});
						$("body").css({"margin": "0px", "height": "100%"});
					}

					/* check what position method to use */
					//if (($.browser.msie && ie6) || ($.browser.msie && ie7)) { // for IE browsers
					if (($.browser.msie && ie6) ) { // for IE browsers
						pos = "absolute";
					} else { // else for other browsers
						pos = "fixed";
					}
					
					// create hide container and button
					if ($(".jx-bar-button-right", this).exists()) { // check if there are currently an item on the right side portion of the bar
						$("<ul />").attr("id", "jx-hid-con-id").insertBefore($(this).find(".jx-bar-button-right:first")); // insert hide/show button "before" the existing item and let the "float right" do its magic
					} else { // else just append it and it'll automatically set to the right side of the bar
						$("<ul />").attr("id", "jx-hid-con-id").appendTo(this);
					}
					
					if ($.browser.msie && ie6) {
						$("#jx-hid-con-id").css({"width": "1px", "float": "right"}); // fix hide container width to prevent float drop issue on IE6 (any width other than "auto" or none specified)
					} else if ($.browser.msie && ie7) {
						$("#jx-hid-con-id").css({"width": "40px", "float": "right"}); // fix hide container width to prevent float drop issue on IE7
					}
						
					/* check what position should be the arrow indicator will be */
					if (defaults.showOnTop) {
						hideIndicator = "jx-hide-top"; // on the top
					} else {
						hideIndicator = "jx-hide"; // on the bottom
					}
					
					// insert the hide button indicator and add appropriate CSS class
					$("#jx-hid-con-id").html('<li alt="Hide Toolbar"><a id="jx-hid-btn-id" class="' + hideIndicator + '"></a></li>');
					$("#jx-hid-con-id").addClass("jx-bar-button-right");
					
					// insert hide button separator and CSS class
					$("<span />").attr("id", "jx-hid-sep-id").insertAfter("#jx-hid-con-id");
					$("#jx-hid-sep-id").addClass("jx-hide-separator");
		
					// add click event on hide button
					$("#jx-hid-btn-id").parent().click(function() {
						$("#spbmad").fadeOut();
						$("#jx-menu-con-id").fadeOut();
						$(obj).slideToggle(defaults.slideSpeed, function() {							
							$(this).createCookieMulti("GoalPilot","SPBMHID", true); // set bar hide to true
							//if (!$(this).checkCookie("showmeebo=SPBMID")) { // check if cookie SPBMID exists, if not create one
							//	$(this).createCookie("showmeebo=SPBMID", $(this).genRandID()); // set random ID and drop cookie
							//}
							$("#jx-uhid-con-id").slideToggle(defaults.slideSpeed);
						});
						return false;
					});
					
					// initialize bar
					$(this).css({
						"overflow": constants["constOverflow"],
						"position": pos
					});
					
					// set location: top or bottom
					if (defaults.showOnTop) {
						$(this).css({
							"top": constants["constBottom"]
						});				
					} else {
						$(this).css({
							"bottom": constants["constBottom"]
						});
					}
					
					// add bar style (theme)
					$(this).addClass("jx-bar");
					
					//on the SparkPage pages IE 7 was displaying from the center.
					if (ie7)
					{
						$(this).css({"left": 0});
					}
					
					// rounded corner style (theme)
					if (defaults.roundedCorners) {
						if (defaults.showOnTop) {
							$(this).addClass("jx-bar-rounded-bl jx-bar-rounded-br");
						} else {
							$(this).addClass("jx-bar-rounded-tl jx-bar-rounded-tr");
						}
					}

					// button style (theme)
					$(this).addClass("jx-bar-button");
					
					// rounded button corner style (theme)
					if (defaults.roundedButtons) {
						$(this).addClass("jx-bar-button-rounded");
					}

					// calculate and adjust bar to the center
					marginLeft = centerScreen-($(this).width()/2);
					$(this).css({"margin-left": marginLeft});

					// fix image vertical alignment and border
					$("img", obj).css({
						"vertical-align": "bottom",
						"border": "#fff solid 0px" // no border
					});
					
					// check for alt attribute and set it as button text
					/*
					$(this).find("img").each(function() {
						if ($(this).attr("alt") != "") { // if image's ALT attribute is not empty then do the code below
							altName = "&nbsp;" + $(this).attr("alt"); // set button text using the image's ALT attribute
							$(this).parent().append(altName); // append it
						}
					});
					*/

					// check if transparency is enabled
					if (defaults.transparent) {
						$(this).fadeTo(defaults.opaqueSpeed, defaults.opacity); // do transparent effect
					}

					// create menu container first before creating the tooltip container, so tooltip will be on foreground
					$("<div />").attr("id", "jx-menu-con-id").appendTo("body");

					// add transparency effect on menu container if "transparent" is true
					if (defaults.transparent) {
						$("#jx-menu-con-id").fadeTo(defaults.opaqueSpeed, defaults.opacity);
					}
					
					/*
					 * create show/unhide container and button
					 */
					$("<div />").attr("id", "jx-uhid-con-id").appendTo("body"); // create div element and append in html body
					$("#jx-uhid-con-id").addClass("jx-show");
					$("#jx-uhid-con-id").css({
						"overflow": constants["constOverflow"],
						"position": pos,
						"margin-left": ($(this).offset().left + $(this).width()) - $("#jx-uhid-con-id").width() // calculate the show/unhide left margin/position
					});
					
					// set show/unhide location: top or bottom
					if (defaults.showOnTop) {
						$("#jx-uhid-con-id").css({
							"top": constants["constBottom"]
						});				
					} else {
						$("#jx-uhid-con-id").css({
							"bottom": constants["constBottom"]
						});				
					}
					
					// check if we need to add transparency to menu container
					if (defaults.transparent) {
						$("#jx-uhid-con-id").fadeTo(defaults.opaqueSpeed, defaults.opacity); 
					}

					// check if we need to hide the bar (based on cookie)
					if (this.hideBar) {
						$(this).css({
							"display": "none" // do not display the main bar
						});				
					}
					
					// check if we need to hide the show/unhide button (based on cookie)
					if (!this.hideBar) {
						$("#jx-uhid-con-id").css({
							"display": "none" // do not display the show/unhide button
						});
					}
					
					// create/append the show/unhide button item
					$("<ul />").attr("id", "jx-uhid-itm-id").appendTo($("#jx-uhid-con-id"));
					if (defaults.showOnTop) { // do we need to show this on top
						unhideIndicator = "jx-show-button-top";
					} else { // or on bottom (default)
						unhideIndicator = "jx-show-button";
					}
					// add the show/unhide item ("Show toolbar" button)
					$("#jx-uhid-itm-id").html('<li alt="Show Toolbar"><a id="jx-uhid-btn-id" class="' + unhideIndicator + '"></a></li>');

					// show/unhide container and button style
					if (defaults.roundedCorners) {
						if (defaults.showOnTop) { // rounded corner CSS for top positioned bar
							$("#jx-uhid-con-id").addClass("jx-bar-rounded-bl jx-bar-rounded-br");
						} else { // rounded corner CSS for bottom positioned bar
							$("#jx-uhid-con-id").addClass("jx-bar-rounded-tl jx-bar-rounded-tr");
						}
					}
					$("#jx-uhid-con-id").addClass("jx-bar-button"); // add CSS style on show/unhide button based on the current theme
					if (defaults.roundedButtons) { // additional CSS style for rounded buttons
						$("#jx-uhid-con-id").addClass("jx-bar-button-rounded");
					}
					
					// add click event on show/unhide button
					$("#jx-uhid-con-id").click(function() {
						$(this).slideToggle(defaults.slideSpeed, function() {
							$(this).createCookieMulti("GoalPilot","SPBMHID", false); // set bar hide to false
							//if (!$(this).checkCookie("showmeebo=SPBMID")) { // check if cookie JXID exists, if not create one
							//	$(this).createCookie("showmeebo=SPBMID", $(this).genRandID()); // set random ID and drop cookie
							//}
							$(obj).slideToggle(defaults.slideSpeed); // slide toggle effect
							if (active_button_name != "") { // check if we have an active button (menu button)
								$("#jx-menu-con-id").fadeIn(); // if we have then do fade in effect
							}

							// re-set unhide/show button position
							$("#jx-uhid-con-id").css({
								"margin-left": ($(obj).offset().left + $(obj).width()) - $("#jx-uhid-con-id").width() // calculate the show/unhide left margin/position
							});
							
							// re-set menu container position
							if (button_active) {
								$("#jx-menu-con-id").css({
									"margin-left": $("#" + active_button_name).parent().offset().left // calculate menu container position by setting its left margin
								});
							}
							
							$("#spbmad").fadeIn().css({"margin-left": obj.offset().left+6});
						});
						
						return false; // return false to prevent any unnecessary click action
					});

					// create tooltip container
					$("<div />").attr("id", "jx-ttip-con-id").appendTo("body"); // create div element and append in html body
					$("#jx-ttip-con-id").css({ // CSS for tooltip container (invisible to viewer(s))
						"height": "auto",
						"margin-left": "0px",
						"width": "100%", // use entire width
						"overflow": constants["constOverflow"],
						"position": pos
					});
					
					// set tooltip container: top or bottom
					if (defaults.showOnTop) { // show on top?
						$("#jx-ttip-con-id").css({
							"margin-top": $(this).height() + 6, // put spacing between tooltip container and fixed bar
							"top": constants["constBottom"]
						});
					} else { // else bottom
						$("#jx-ttip-con-id").css({
							"margin-bottom": $(this).height() + 6, // put spacing between tooltip container and fixed bar
							"bottom": constants["constBottom"]
						});
					}
					
					// prevent browser from showing tooltip; replace title tag with alt tag; comply with w3c standard
					$("li", obj).each(function() { // iterate through LI element
						var _title = $(this).attr("title");
						if (_title != "") {
							$(this).removeAttr("title"); // remove TITLE attribute
							$(this).attr("alt", _title); // add (replace with) ALT attribute
						}
					});
					
					// bar container hover in and out event handler
					$("li", obj).hover(
						function () { // hover in method event
							var elemID = $(this).attr("id"); // get ID (w/ or w/o ID, get it anyway)					
							var barTooltipID = elemID + "jx-ttip-id"; // set a tooltip ID
							var tooltipTitle = $(this).attr("title");
					
							if (tooltipTitle == "") { // if no 'title' attribute then try 'alt' attribute
								tooltipTitle = $(this).attr("alt"); // this prevents IE from showing its own tooltip
							}
							
							if (tooltipTitle != "") { // show a tooltip if it's not empty
								// create tooltip wrapper; fix IE6's float double-margin bug
								barTooltipWrapperID = barTooltipID + "_wrapper";
								$("<div />").attr("id", barTooltipWrapperID).appendTo("#jx-ttip-con-id");
								// create tooltip div element and put it inside the wrapper
								$("<div />").attr("id", barTooltipID).appendTo("#" + barTooltipWrapperID);
								
								// tooltip default style
								$("#" + barTooltipID).css({
									"float": "left"
								});
								
								// theme for tooltip (theme)
								if ((defaults.showOnTop) && !($.browser.msie && ie6)) { // IE6 workaround; Don't add tooltip pointer if IE6
									$("<div />").addClass("jx-tool-point-dir-up").appendTo("#" + barTooltipID);
								}
								$("<div />").html(tooltipTitle).addClass("jx-bar-button-tooltip").appendTo("#" + barTooltipID);
									
								if ((!defaults.showOnTop) && !($.browser.msie && ie6)) { // IE6 workaround; Don't add tooltip pointer if IE6							
									$("<div />").addClass("jx-tool-point-dir-down").appendTo("#" + barTooltipID);
								}
								
								// fix tooltip wrapper relative to the associated button
								lft_pad = parseInt($(this).css("padding-left"));
								$("#" + barTooltipWrapperID).css({
									"margin-left": ($(this).offset().left - ($("#" + barTooltipID).width() / 2)) + ($(this).width()/2) + lft_pad // calculate position (left margin)
								});
								
								/* check for active buttons; tooltip behavior */
								if ((($(this).find("a:first").attr("name") == "") || (button_active == false))) {
									$("#" + barTooltipID).fadeTo(defaults.tooltipFadeSpeed, defaults.tooltipFadeOpacity);
								} else if (active_button_name != $(this).find("a:first").attr("name")) {
									$("#" + barTooltipID).fadeTo(defaults.tooltipFadeSpeed, defaults.tooltipFadeOpacity);
								} else { // we got an active button here! (clicked state)
									$("#" + barTooltipID).css({ // prevent the tooltip from showing; if button if currently on-clicked state
										"display": "none"
									});
								}
								
							}
						}, 
						function () { // hover out method event
							var elemID = $(this).attr("id"); // get ID (whether there is an ID or none)					
							var barTooltipID = elemID + "jx-ttip-id"; // set a tooltip ID
							var barTooltipWrapperID = barTooltipID + "_wrapper";
							$("#" + barTooltipID).remove(); // remove tooltip element
							$("#" + barTooltipWrapperID).remove(); // remove tooltip's element DIV wrapper
						}
					);
					
					// show/unhide container hover in and out event handler
					$("li", $("#jx-uhid-con-id")).hover(
						function () { // in/over event
							var elemID = $(this).attr("id"); // get ID (w/ or w/o ID, get it anyway)					
							var barTooltipID = elemID + "jx-ttip-id"; // set a tooltip ID
							var tooltipTitle = $(this).attr("title");
							
							if (tooltipTitle == "") { // if no 'title' attribute then try 'alt' attribute
								tooltipTitle = $(this).attr("alt"); // this prevents IE from showing its own tooltip
							}
							
							if (tooltipTitle != "") { // show a tooltip if it is not empty
								// create tooltip wrapper; fix IE6's float double-margin bug
								barTooltipWrapperID = barTooltipID + "_wrapper";
								$("<div />").attr("id", barTooltipWrapperID).appendTo("#jx-ttip-con-id");
								// create tooltip div element and put it inside the wrapper
								$("<div />").attr("id", barTooltipID).appendTo("#" + barTooltipWrapperID);
								
								// tooltip default style
								$("#" + barTooltipID).css({
									"float": "left"
								});
								
								// theme for show/unhide tooltip
								if ((defaults.showOnTop) && !($.browser.msie && ie6)) {
									$("<div />").addClass("jx-tool-point-dir-up").appendTo("#" + barTooltipID);
								}

								$("<div />").html(tooltipTitle).addClass("jx-bar-button-tooltip").appendTo("#" + barTooltipID);
								
								if ((!defaults.showOnTop) && !($.browser.msie && ie6)) { 
									$("<div />").addClass("jx-tool-point-dir-down").appendTo("#" + barTooltipID);
								}
								
								// fix tooltip wrapper relative to the associated button
								ulft_pad = parseInt($(this).css("padding-left"));
								$("#" + barTooltipWrapperID).css({
									"margin-left": ($(this).offset().left - ($("#" + barTooltipID).width() / 2)) + ($(this).width()/2) + ulft_pad // calculate tooltip position
								});
								
								/* check for active buttons; tooltip behavior */
								if ((($(this).find("a:first").attr("name") == "") || (button_active == false))) {
									$("#" + barTooltipID).fadeTo(defaults.tooltipFadeSpeed, defaults.tooltipFadeOpacity);
								} else if (active_button_name != $(this).find("a:first").attr("name")) {
									$("#" + barTooltipID).fadeTo(defaults.tooltipFadeSpeed, defaults.tooltipFadeOpacity);
								} else {
									$("#" + barTooltipID).css({ // prevent the tooltip from showing; if button if currently on-clicked state
										"display": "none"
									});
								}
								
							}
						}, 
						function () { // out event
							var elemID = $(this).attr("id"); // get ID (whether there is an ID or none)
							var barTooltipID = elemID + "jx-ttip-id"; // set a tooltip ID
							var barTooltipWrapperID = barTooltipID + "_wrapper";
							$("#" + barTooltipID).remove(); // remove tooltip element
							$("#" + barTooltipWrapperID).remove(); // remove tooltip's element DIV wrapper
						}
					);

					// fix PNG transparency problem on IE6
					if ($.browser.msie && ie6) {
						$(this).find("li").each(function() {
							$(this).find("img").each(function() {
								imgPath = $(this).attr("src");
								altName = $(this).attr("alt");
								if (altName == "") { // workaround for IE6 bug: Menu item text does not show up on the popup menu
									altName = "&nbsp;&nbsp;" + $(this).attr("title");
								}
								srcText = $(this).parent().html();
								$(this).parent().html( // wrap with span element
									'<span style="cursor:pointer;display:inline-block;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + imgPath + '\');">' + srcText + '</span>&nbsp;' + altName
								);
							});
							$(this).find("img").each(function() {
								$(this).attr("style", "filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);"); // show image
							});
						});
					}
					
					// adjust bar on window resize event
					$(window).resize(
						function(){
							var screen = jQuery(this); // reference to client/viewers screen
							var screenWidth = screen.width(); // get current screen width
							var centerScreen = (screenWidth / 2) * (1); // get current screen center
							var marginLeft = centerScreen - ($(obj).width() / 2); // re-calculate and adjust bar's position
							$(obj).css({"margin-left": marginLeft}); // do it!
							
							// set unhide/show button
							$("#jx-uhid-con-id").css({
								"margin-left": ($(obj).offset().left + $(obj).width()) - $("#jx-uhid-con-id").width()
							});
							
							if (button_active) { // check if we have an active button
								$("#jx-menu-con-id").css({
									"margin-left": $("#" + active_button_name).parent().offset().left // fix menu position on resize
								});
							}

						}
					);
					
					/**
					 * Element click events
					 */
				
					// hide first level menu
					$("li", obj).find("ul.sp-bar-menu").each(function() {
						$(this).css({"display": "none"}); // hide it! but we're listening to any click event
					});

					// create menu ID
					i = 1;
					$("li", obj).find("ul.sp-bar-menu").each(function() {
						$(this).attr("id", "spbm-nav" + i);
						$(this).parent().find("a:first").attr("href", "#"); // replace href attribute
						$(this).parent().find("a:first").attr("name", "spbm-nav" + i); // replace href attribute				

						if (defaults.showOnTop) { // check what position to use
							buttonIndicator = "jx-arrow-down"; // top
						} else {
							buttonIndicator = "jx-arrow-up"; // bottom
						}

						/* IE6/IE7 arrow indicator float drop fix: user replaced insertAfter with insertBefore */
						if (($.browser.msie && ie6) || ($.browser.msie && ie7) || ($.browser.opera) ) {
							$("<div />").attr("class", buttonIndicator).insertBefore($(this).parent().find("a.sp-bar-level1")).css({"background-position": "top"}); // IE6 and IE7 fix background position
						} else { // else any other browser
							$("<div />").attr("class", buttonIndicator).insertAfter($(this).parent().find("a.sp-bar-level1")); // prevent Chrome from wrapping button text
						}
						
						// add click event (button)
						$(this).parent().find("a:first").click(function() {
							var elemID = $(this).attr("id"); // get ID (whether there is an ID or none)					
							var barTooltipID = elemID + "jx-ttip-id"; // set a tooltip ID
							var barTooltipWrapperID = barTooltipID + "_wrapper";
							
							$("#" + barTooltipID).remove(); // remove tooltip element
							$("#" + barTooltipWrapperID).remove(); // remove tooltip's element DIV wrapper

							if ((button_active) && (active_button_name == $(this).attr("name"))) { // is this an active button?
								if (defaults.showOnTop) { // check bar position
									buttonIndicator = "jx-arrow-down"; // top
								} else {
									buttonIndicator = "jx-arrow-up"; // bottom
								}
								$(this).parent().find("div").attr("class", buttonIndicator); // change button indicator
								
								$("#jx-menu-con-id").fadeOut(defaults.menuFadeSpeed); // remove/hide menu using fade effect
								$(this).parent().removeClass("jx-nav-menu-active"); // remove active state for this button (style)

								if (defaults.roundedButtons) { // remove additional CSS style if rounded corner button
									$(this).parent().removeClass("jx-nav-menu-active-rounded");
								}
								
								button_active = false; // remove button's active state
								active_button_name = "";
								
								$(this).blur(); // unfocus link/href
								
							} else {
								if (defaults.showOnTop) { // is bar's on the top position?
									buttonIndicator = "jx-arrow-up";
								} else {
									buttonIndicator = "jx-arrow-down";
								}
								$(this).parent().find("div").attr("class", buttonIndicator); // change button indicator
								
								$("#jx-menu-con-id").css({"display": "none"}); // hide menu container
								$("#jx-menu-con-id").html("<ul class='sp-bar-menu'>" + $(this).parent().find("ul.sp-bar-menu").html() + "</ul>");
								$("#jx-menu-con-id").css({
														"overflow": constants["constOverflow"],
														"position": pos, "margin-right": '5px', 
														"margin-left": $(this).parent().offset().left // calculate menu container position by setting its left margin
													});
								
								if ($.browser.msie && (ie6 || ie7) ) {	
									$("#jx-menu-con-id .sp-bar-ff").css({"width": '400px'});
									$("#jx-menu-con-id .sp-bar-fb").css({"width": '400px'});
								}
								
								//prevent the default status
								//$("#jx-menu-con-id a").each(function(){
								//	$(this).overrideAnchorTags();
								//});

								// set menu container location: top or bottom
								if (defaults.showOnTop) { // top
									$("#jx-menu-con-id").css({
										"top": constants["constBottom"],
										"margin-top": $(obj).height() + 0
									});
								} else { // bottom
									$("#jx-menu-con-id").css({
										"bottom": constants["constBottom"],
										"margin-bottom": $(obj).height() + 0
									});
								}
								
								$("#jx-menu-con-id").addClass("jx-nav-menu");

								if ($.browser.msie && ie6) {	
									$("#jx-menu-con-id ul li a").css({"width": "100%"}); // IE6 and IE7 right padding/margin fix
								}

								if (defaults.roundedButtons) { // additional CSS style for rounded corner button
									$("#jx-menu-con-id").addClass("jx-nav-menu-rounded");
								}
								
								$(this).parent().addClass("jx-nav-menu-active"); // add active state CSS style
								
								if (defaults.roundedButtons) {
									$(this).parent().addClass("jx-nav-menu-active-rounded");
								}
								
								if (active_button_name != "") { // remove/hide any active button (on-clicked state)
									$("a[name='" + active_button_name + "']").parent().removeClass("jx-nav-menu-active");
									$("a[name='" + active_button_name + "']").parent().removeClass("jx-nav-menu-active-rounded");
									
									if (defaults.showOnTop) { // change button indicator (depends on the current bar's position)
										buttonIndicator = "jx-arrow-down";
									} else {
										buttonIndicator = "jx-arrow-up";
									}
									$("a[name='" + active_button_name + "']").parent().find("div").attr("class", buttonIndicator);
								}
								
								button_active = true; // change button's active state
								active_button_name = $(this).attr("name"); // save button name for future reference (e.g. remove active state)
								
								$(this).blur(); // unfocus link/href
								
								$("#jx-menu-con-id").fadeIn(defaults.menuFadeSpeed); // show menu container and its item(s)
							}
							return false; // prevent normal click action
						});
						
						i = i + 1;
					});
					
					// nav items click event
					$("li", obj).click(function () {
						if ($("ul", this).exists()) {
							$(this).find("a:first").click();
							return false;
						} else if ($(this).parent().attr("id") == "jx-hid-con-id") {
							return false; // do nothing
						}
						
						if ($("a", this).exists()) { // check if there are A tag (href) to follow
							window.location = $(this).find("a:first").attr("href"); // emulate normal click event action (e.g. follow link)
						}
						return false;
					});
					

					/* add the sp bar ad display logic 
					   APL - 02/18/2012
					*/

					//place the ad content into a new container so it can be positioned on top
					//alert($.browser.msie +" - "+$.browser.version + " - " + pos + ie6 + ie7 );
					$("<div />").attr("id", "spbm-ad-con-id").appendTo("body");
					//$("<div />").html($('#spbmad-inline').html()).attr('id','spbmad').appendTo("#spbm-ad-con-id").css({position: pos, bottom: '0px', zIndex: '9998000', "margin-left": $("#spbmad-inline").offset().left-5});
					$("<div />").html($('#spbmad-inline').html()).attr('id','spbmad').appendTo("#spbm-ad-con-id").css({position: pos, bottom: '1px', zIndex: '9998000', "margin-left": obj.offset().left+6});

					//get tooltip from place holder title
					var tooltipTitle = $("#spbmad-inline", obj).attr("title");
					if (tooltipTitle == "") { // if no 'title' attribute then try 'alt' attribute
						tooltipTitle = $("#spbmad-inline", obj).attr("alt");
					}
					//save the title 
					$("#spbmad").data('title', tooltipTitle);

					//get the display type from the place holder type
					var adDispType = $("#spbmad-inline", obj).attr("type");
					$("#spbmad").data('type', adDispType);
					var iUrl = "";
					if (adDispType=="full")
					{
						iUrl = $('#btnNewWindow').attr('href');
						//add the overlay container
						$('<div />').attr("id", "spbm-overlay-id").addClass('spbm-overlay-bg').appendTo('#spbmad').css({position: pos, zIndex: '9999002', width: '100%', height: '100%', cursor: 'default'});
					}

					//remove the place holder div so there is no id conflicts
					$("#spbmad-inline", obj).remove();

					//add click event to main site div that will close any open window
					$("#site_center_w, #page_center_w, #pageSPARKPAGEBG").click(function() {
						//alert(active_button_name);
						//the click event of the active button should hide it
						if (active_button_name != "") {
							$("#" + active_button_name).click();
						}

						//if the ad is open close it
						if ($("#spbmad").data('addisp') == 'true')
						{
							$('#btnCloseAd').click();
						}
					});
					//add the click event to the overlay to remove the add
					if (adDispType=="full")
					{
						$("#spbm-overlay-id").click(function() {
							$('#btnCloseFull').click();
						});
					}

					//wireup ad hover state
					$("#spbmad").hover(
						function () { // hover in method event for ad
							$(this).css({cursor: 'pointer'});							
							var barTooltipID = "ad-ttip-id"; // set a tooltip ID
						
							if (tooltipTitle != "") { // show a tooltip if it's not empty
								// create tooltip wrapper; fix IE6's float double-margin bug
								barTooltipWrapperID = barTooltipID + "_wrapper";
								$("<div />").attr("id", barTooltipWrapperID).appendTo("#jx-ttip-con-id");
								// create tooltip div element and put it inside the wrapper
								$("<div />").attr("id", barTooltipID).appendTo("#" + barTooltipWrapperID);
								
								// tooltip default style
								$("#" + barTooltipID).css({
									"float": "left"
								});
								
								// theme for tooltip (theme)
								if ((defaults.showOnTop) && !($.browser.msie && ie6)) { // IE6 workaround; Don't add tooltip pointer if IE6
									$("<div />").addClass("jx-tool-point-dir-up").appendTo("#" + barTooltipID);
								}
								$("<div />").html(tooltipTitle).addClass("jx-bar-button-tooltip").appendTo("#" + barTooltipID);
									
								if ((!defaults.showOnTop) && !($.browser.msie && ie6)) { // IE6 workaround; Don't add tooltip pointer if IE6							
									$("<div />").addClass("jx-tool-point-dir-down").appendTo("#" + barTooltipID);
								}
								
								// fix tooltip wrapper relative to the spbmad-body div
								lft_pad = parseInt($("#spbmad-body").css("padding-left"));
								$("#" + barTooltipWrapperID).css({
									"margin-left": ($("#spbmad-body").offset().left - ($("#" + barTooltipID).width() / 2)) + ($("#spbmad-body").width()/2) + lft_pad // calculate position (left margin)
								});
								
								$("#" + barTooltipID).fadeTo(defaults.tooltipFadeSpeed, defaults.tooltipFadeOpacity);
							}

							if (!$("#spbmad").data('addisp') || $("#spbmad").data('addisp') != 'true') {
								//do image bounce
								$('#spbmad-img').stop(true, true).animate({ height: '100', paddingBottom: '20' }, 'fast', function() {
									$('#spbmad-img').animate({ paddingBottom: '0' }, 'fast', function() {
										$('#spbmad-img').animate({ paddingBottom: '5' }, 'fast', function() {
											
										});
									});
								});

								//animate the background and display ad image
								//$("#spbmad").stop(true, true).animate({ backgroundColor: '#ccc' }, '45000', 'linear', function() {
								//$("#spbmad").stop(true, true).animate({ width: $("#spbmad").width() }, '45000', 'linear', function() {
								$("<div />").attr("id",'spbmas-slide').appendTo('#spbmad').css({position: pos, zIndex: '9999001', width: '0px',  backgroundColor: '#ccc', bottom: '1px', "margin-left": obj.offset().left-6 });
								$("#spbmas-slide").stop(true, true).animate({ width: $("#spbmad").width() }, 1000, 'linear', function() {
									$("#" + barTooltipID).remove();
									$("#" + barTooltipID).remove(); // remove tooltip element
									
									//check the display type
									if (adDispType=="full")
									{
										//iframe display animation
										$('#spbmad-fullwin').addClass("jx-nav-menu-rounded");
										$('#spbmad-fullwin').css({position: pos, top: '15%', zIndex: '9999011', height: '60%', left: 0, width: '99%', "margin-left": '2px', "margin-right": '2px', cursor: 'default' });

										$("#spbm-overlay-id").fadeIn('5000', function() {
											//the fadein reset the filter in ie
											$("#spbm-overlay-id").css({filter: 'alpha(opacity=50)'});
											if ($("#frmAdWin").attr('src') == "")
											{
												$('#spbmad-fullwin iframe').attr('src',iUrl);
											}
											$("#spbmad-fullwin").fadeIn('5000', function() {
												$("#spbmad").data('addisp','true');
											});
										});
									}
									else {
										//large image animation
										$('#spbmad-imgfull').addClass("jx-nav-menu");
										$('#spbmad-imgfull').addClass("jx-nav-menu-rounded");
										$('#spbmad-imgfull').css({position: pos, bottom: '0px', zIndex: '9999010', "margin-bottom": $(obj).height() + 0, "margin-left": obj.offset().left-17 });
										
										if ($.browser.msie && (ie6 || ie7) ) 
										{
											$('#spbmad-imgfull').css({position: 'absolute', "margin-left": (marginLeft-20) });
										}
										$("#spbmad-imgfull").fadeIn('5000', function() {
											$('#spbmad-imgfull').css({backgroundColor: '#fff'});
											$("#spbmad").data('addisp','true');
										});
									}
								});
							}  //close check if add already displayed								
						}, 
						function () { // hover out method event for ad
							$(this).css({cursor: 'auto'});
							//alert( $("#spbmad").data('addisp'));
							if (!$("#spbmad").data('addisp') || $("#spbmad").data('addisp') != 'true')
							{
								//$(this).stop(true, false);
								$("#spbmas-slide").stop(true, false);
								var adSelector = "#spbmad-imgfull";
								if (adDispType=="full") {
									adSelector = "#spbm-overlay-id";
								}
								$(adSelector).css({display: 'none'})
								$(adSelector).stop(true, true);
								$(adSelector).fadeOut('fast');
								$("#spbmad").data('addisp','false');
								$("#spbmas-slide").remove();
							}
							$("#spbmad").css({backgroundColor: '#f9f9f9'});
							
							var barTooltipID = "ad-ttip-id"; // set a tooltip ID
							var barTooltipWrapperID = barTooltipID + "_wrapper";
							$("#" + barTooltipID).remove(); // remove tooltip element
							$("#" + barTooltipWrapperID).remove(); // remove tooltip's element DIV wrapper
							
						}
					);

					//close ad window click event
					$('#btnCloseAd').click(function() {
						$("#spbmas-slide").remove();
						$("#spbmad-imgfull").fadeOut('fast');
						$("#spbmad").data('addisp','false');
					});

					//close ad full window click event
					$('#btnCloseFull').click(function() {
						$("#spbmas-slide").remove();
						$("#spbmad-fullwin").fadeOut('fast', function() {
							$("#spbm-overlay-id").fadeOut('fast');
						});
						$("#spbmad").data('addisp','false');
					});

					//small image animation
					$('#spbmad-img').css({height: 0, position: pos, bottom: '0px', zIndex: '9999000'});
					$("#spbmad-img").show();
					$("#spbmad-placeholder").animate({ width: ($("#spbmad").width()+ 5) }, 'slow', function() {
						$('#spbmad-img').animate({ height: '100', paddingBottom: '20' }, 'slow', function() {
							$('#spbmad-img').animate({ paddingBottom: '0' }, 'fast', function() {
								$('#spbmad-img').animate({ paddingBottom: '5' }, 'fast')
							});
						});
					});

					//prevent the default status from displaying
					/*
					$("#spbm-ad-con-id a, #spbm-bar a.sp-bar-level1").each(function(){
						$(this).overrideAnchorTags();
					});
					*/
					$("#spbm-ad-con-id a").each(function(){
						$(this).overrideAnchorTags();
					});

					if (this.hideBar) {
						$("#spbmad").css({
							"display": "none" 
						});
					}

				});
				
			}; // end method construct
			
			/**
			 * additional public methods
			 */
			
			// get jixedbar's options (variables)
			this.getOptions = function() {
				return options;
			};
			
			// check if IE6
			this.isIE6 = function() {
				return ie6;  
			};

			// check if IE7
			this.isIE7 = function() {
				return ie7;
			};
			
			// check if there are active button
			this.hasActiveButton = function() {
				return button_active;
			};
			
			// return active button name
			this.getActiveButtonName = function() {
				return active_button_name;
			};
			
			// get tooltip container object
			this.getTooltipObject = function() {
				return $("#jx-ttip-con-id");
			};
			
			// create object container
			this.createObjectContainer = function(name) {
				name = typeof(name) != 'undefined' ? name : "jx-obj-con-id"; // default object container name
				// create custom object container
				$("<div />").attr("id", name).appendTo("body"); // create div element and append in html body
				$("#" + name).css({ // CSS for tooltip container (invisible to viewer(s))
					"height": "auto",
					"margin-left": "0px",
					"width": "100%", // use entire width
					"overflow": constants["constOverflow"],
					"position": pos
				});
				
				// set custom object container: top or bottom
				if (defaults.showOnTop) { // show on top?
					$("#" + name).css({
						"margin-top": $(element_obj).height() + 6, // put spacing between tooltip container and fixed bar
						"top": constants["constBottom"]
					});
				} else { // else bottom
					$("#" + name).css({
						"margin-bottom": $(element_obj).height() + 6, // put spacing between tooltip container and fixed bar
						"bottom": constants["constBottom"]
					});
				}
				return $("#" + name); // return object reference
			};
			
			
		} // end jixedbar plugin method

	}); // end jquery extend method
	
$.fn.extend({ // extend jQuery.fn object
    jixedbar: $.jixedbar.construct
});
	
})(jQuery); // end of anonymous function

/**
 * Element/selector checker - check if element/selector exists
 */
jQuery.fn.exists = function(){return jQuery(this).length>0;};

/**
 * Create a cookie
 */
jQuery.fn.createCookie = function(cookie_name, value) {
	//var expiry_date = new Date(2037, 01, 01); // virtually, never expire!
	var expiry_date=new Date();
	//expiry_date.setDate(expiry_date.getDate() + 5); //exipre in 5 days
	//document.cookie = cookie_name + "=" + escape(value) + "; expires=" + expiry_date.toUTCString();
	//document.cookie = cookie_name + "=" + value + "; expires=" + expiry_date.toUTCString();
	document.cookie = cookie_name + "=" + value + ";";
};

/**
 * Check cookie
 */
jQuery.fn.checkCookie = function(cookie_name) {
	if (document.cookie.length > 0) {
  		cookie_start = document.cookie.indexOf(cookie_name + "=");
		if (cookie_start != -1) {
			//cookie_start = cookie_start + cookie_name.length + 1;
			//cookie_end = document.cookie.indexOf(";", cookie_start);
			//if (cookie_end == -1) {
			//	cookie_end = document.cookie.length;
				return true;
			//}
		}
  	}
	return false;
};

/**
 * Extract cookie value
 */
jQuery.fn.extractCookieValue = function(value) {
	  if ((endOfCookie = document.cookie.indexOf(";", value)) == -1) {
	     endOfCookie = document.cookie.length;
	  }
	  //return unescape(document.cookie.substring(value, endOfCookie));
	  return document.cookie.substring(value, endOfCookie);
};

/**
 * Read cookie
 */
jQuery.fn.readCookie = function(cookie_name) {
	  var numOfCookies = document.cookie.length;
	  var nameOfCookie = cookie_name + "=";
	  var cookieLen = nameOfCookie.length;
	  var x = 0;
	  while (x <= numOfCookies) {
	        var y = (x + cookieLen);
	        if (document.cookie.substring(x, y) == nameOfCookie)
	           return (this.extractCookieValue(y));
	           x = document.cookie.indexOf(" ", x) + 1;
	           if (x == 0){
	              break;
	           }
	  }
	  //return (null);
	  return "";
};

/**
 * Read cookie Multi - reads a cookie saved as key value pair
 */
jQuery.fn.readCookieMulti = function(cookie_name, key) {
	  var rval = null;
	  //get the serialized cookie value
	  var srlzCookVal = this.readCookie(cookie_name);
	  //split the values and fins the key
	  var valuePairs = srlzCookVal.split("&");
	  for (var vp in valuePairs) {
		  var vnp = valuePairs[vp].split("=");
		  if (vnp[0] == key)
		  {
			  rval = vnp[1];
		  }
	  }

	  return rval;
};

/**
 * Create a cookie multi - saves a cookie in key value pair format
 */
jQuery.fn.createCookieMulti = function(cookie_name, key, value) {
	  var rval = null;
	  //get the serialized cookie value
	  var foundKey = false;
	  var valuePairs = [];
	  var srlzCookVal = this.readCookie(cookie_name);
	  if (srlzCookVal!="")
		  {
		  //split the values and fins the key
		  valuePairs = srlzCookVal.split("&");
		  var cnt = 0;
		  for (var vp in valuePairs) {
			  var vnp = valuePairs[vp].split("=");
			  if (vnp[0] == key)
			  {
				  valuePairs[vp] = key + "=" + value;
				  foundKey = true;
			  }
			  cnt++;
		  }
	  }
	  if (!foundKey)
	  {
			valuePairs.push(key + "=" + value);
	  }
	  var cookieValue = valuePairs.join("&");
	  this.createCookie(cookie_name, cookieValue);

};


/**
 * Generate random ID
 */
jQuery.fn.genRandID = function() {
	var id = "";
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for(var i=0; i < 24; i++) {
		id += str.charAt(Math.floor(Math.random() * str.length));
	}
    return id;
};

/**
 * remove status display from a tags
 */
jQuery.fn.overrideAnchorTags = function() {
	$aItem = this;
	var ahref = $aItem.attr('href');
	if (ahref && ahref != "" && ahref != "#")
	{
		$aItem.click(function() {
			
			var carr = ahref.split('javascript:');
			if (carr.lenght > 1 )
			{
				eval(carr[1]);
			}
			else {
				var atarget = $aItem.attr('target');
				if (atarget && atarget != "") {
					window.open(ahref,atarget);
				}
				else {
					window.location = ahref;
				}
			}

			//if this is the ad new window link close the ad
			//alert($(this).attr('id'));
			if ($(this).attr('id') == "btnNewWindow")
			{
				$('#btnCloseFull').click();
			}
			
			return false; // prevent normal click action
		});
	}
	$aItem.hover(function() {$(this).css({cursor: 'pointer', "text-decoration": 'underline'});return true;},function(){$(this).css({cursor: 'auto', "text-decoration": 'none'});return true;});
	$aItem.removeAttr('href');
};


// end jixedbar jquery plugin