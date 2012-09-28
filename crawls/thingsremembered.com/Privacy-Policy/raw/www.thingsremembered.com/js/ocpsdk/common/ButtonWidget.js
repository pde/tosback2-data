/**
 * @fileoverview The javascript that runs the common-button.jsp widget.
*/
if (typeof ButtonWidget == "undefined")
{
	/**
	 * @class Handles the execution for {@link com.fry.ocpsdk.widget.common.ButtonWidget}
	 *        objects within the DOM.
	 */
	var ButtonWidget = BaseWidget.extend({

		/**
		 * Initialize a DOM element to represent a ButtonWidget.  When a DOM element
		 * is made into a button, the element will be assigned an <tt>enabled</tt> method.
		 * This method is a quick way to either set, or access, the enabled state of the
		 * button.  Setting the enabled state to <tt>false</tt> will assign the <tt>disabled</tt>
		 * CSS class to the parent container.  You can apply this style via the descendent
		 * selector:
		 * <pre>
		 *    .someWidget .common-button #myButton { color: black; }
		 *    .someWidget .disabled .common-button #myButton { color: gray; }
		 * </pre>
		 * Working with the enabled method is as simple as:
		 * <pre>
		 *    $("#myButton").enabled(true);   // Sets the button to the enabled state
		 *    if ($("#myButton").enabled()) {
		 *       // The button is enabled, do something
		 *       ...
		 *    }
		 * </pre>
		 * A button will also be assigned a hover state where it's parent container will have
		 * the <tt>mouseover</tt> CSS class when the mouse is over the button.  The class will
		 * be absent when the mouse is <i>not over</i> the button.
		 * <p/>
		 *
		 * @param widget {String} The unique selector for a button, or a jQuery object representing
		 *                        the DOM element of the button.
		 * @param settings {Object} The widget state
		 */
		create: function(widget, settings) {
			var jQ = this.base(widget, settings);
			var s = jQ.widgetState();

			// Convert the click function string into a function
			var fn = s.clickFunction;
			if (fn) {
				jQ.widgetData({ clickFunction:
						eval("(function(){ var f=" + fn + "; return f;})()")
				});
				delete s.clickFunction;
			}

			jQ.click(function() {
					if (this.enabled())
					{
						var f = $(this).widgetData().clickFunction;
						if (f) {
							f();
						}
					}
				})
				.mousedown(function() {
					if (this.enabled()) {
						$(this).parent(".Button.widget-root").addClass("mousedown");
						if ($(this).parent(".Button.widget-root").hasClass("mouseover")) {
							this.mOver = true;
							$(this).parent(".Button.widget-root").removeClass("mouseover");
						}
					}
				})
				.mouseup(function() {
					$(this).parent(".Button.widget-root").removeClass("mousedown");
					if (this.mOver) {
						this.mOver = false;
						$(this).parent(".Button.widget-root").addClass("mouseover");
					}
				});

			jQ.widgetElement().enabled = function(state) {
				// Adds a function that either sets or gets the enabled state of the button object
				if (state != null)
				{
					if (state)
					{
						ButtonWidget.enable($(this));
					}
					else
					{
						ButtonWidget.disable($(this));
					}

					return true;
				}
				else
				{
					return ButtonWidget.isEnabled($(this));
				}
			};

			jQ.widgetElement().selected = function(state) {
				// Adds a function that either sets or gets the selected state of the button object
				if (state != null)
				{
					if (state)
					{
						ButtonWidget.select($(this));
					}
					else
					{
						ButtonWidget.unselect($(this));
					}

					return true;
				}
				else
				{
					return ButtonWidget.isSelected($(this));
				}
			};

			return jQ;
		},

		/**
		 * Determine if a button is enabled.
		 *
		 * @param selector {String} The CSS selector for the element
		 * @return {Boolean} <tt>true</tt> if the button is enabled
		 */
		isEnabled: function(selector) {
			return !$(selector).parent(".Button.widget-root").is(".disabled");
		},

		/**
		 * Set the button to the enabled state.  Removes the <tt>disabled</tt> CSS
		 * class from the parent container.
		 *
		 * @param selector {String} The CSS selector for the element
		 */
		enable: function(selector) {
			$(selector).parent(".Button.widget-root").removeClass("disabled");
		},

		/**
		 * Set the button to the disabled state.  Applies the <tt>disabled</tt> CSS
		 * class to the parent container.
		 *
		 * @param selector {String} The CSS selector for the element
		 */
		disable: function(selector) {
			$(selector).parent(".Button.widget-root").addClass("disabled").removeClass("mouseover").removeClass("mousedown");
		},

		/**
		 * Determine if a button is selected.
		 *
		 * @param selector {String} The CSS selector for the element
		 * @return {Boolean} <tt>true</tt> if the button is selected
		 */
		isSelected: function(selector) {
			return $(selector).parent(".Button.widget-root").is(".selected");
		},

		/**
		 * Set the button to the selected state.  Applies the <tt>selected</tt> CSS
		 * class to the parent container.
		 *
		 * @param selector {String} The CSS selector for the element
		 */
		select: function(selector) {
			$(selector).parent(".Button.widget-root").addClass("selected");
		},

		/**
		 * Set the button to the default state.  Removes the <tt>selected</tt> CSS
		 * class from the parent container.
		 *
		 * @param selector {String} The CSS selector for the element
		 */
		unselect: function(selector) {
			$(selector).parent(".Button.widget-root").removeClass("selected");
		}
		
	});
}

// Initialize all common buttons with hover
// states if they don't already have it
$(document).ready(function() {
	$(".common-button").each(function() {
		if (!$(this).get(0).hoverState)
		{
			$(this).hover(
				function() {
					if (!$(this).parent(".Button.widget-root").is(".disabled"))
					{
						$(this).parent(".Button.widget-root").addClass("mouseover");
					}
				},
				function() {
					$(this).parent(".Button.widget-root").removeClass("mouseover");
				}
			).get(0).hoverState = true;
		}
	});
});
