/**
 * @fileoverview The javascript that runs the common-image.jsp widget.

 @author: $Author: bfattori $
 @version: $Revision: 1.5 $
 */
if (typeof ImageWidget == "undefined")
{
	/**
	 * @class Handles the execution for {@link com.fry.ocpsdk.widget.common.ImageWidget}
	 *        objects within the DOM.
	 */
	var ImageWidget = BaseWidget.extend({

		/**
		 * Returns the state of the image widget. If an ImageWidget was not initialized with
		 * the <tt>create()</tt> method, check for elementData.  If the elementData is defined,
		 * assign it to the ImageWidget's <tt>widgetState</tt> and return that.
		 * @return {Object} The ImageWidget's widgetState.
		 */
		getState: function(selector)
		{
			var jQ = $(selector);
			var s = jQ.widgetState();
			if (!s.layers && jQ.elementData())
			{
				jQ.widgetState(jQ.elementData()).widgetClass(ImageWidget);
				s = jQ.widgetState();
			}
			return s;
		},

		/**
		 * Convenience method for working with a two layer image background.
		 * Retrieves the background layer, or returns an empty string if no background
		 * was supplied.
		 *
		 * @param selector {String} The CSS selector for the element
		 * @return {String} The source of the background layer
		 */
		getBackgroundSrc: function(selector)
		{
			var s = this.getState(selector);
			var layers = s.layers.split(",");
			return (layers.length == 2 ? layers[0] : "");
		},

		/**
		 * Convenience method for working with a two layer image foreground.
		 * Retrieves the foreground layer.
		 *
		 * @param selector {String} The CSS selector for the element
		 * @return {String} The source of the foreground layer
		 */
		getImageSrc: function(selector)
		{
			var s = this.getState(selector);
			var layers = s.layers.split(",");
			return (layers.length == 2 ? layers[1] : layers[0]);
		},

		/**
		 * Get the src for the layer number specified.
		 *
		 * @param selector {String} The CSS selector for the element
		 * @return {String} The image source for the layer specified
		 */
		getLayerSrc: function(selector, layer)
		{
			var s = this.getState(selector);
			return s.layers.split(",")[layer];
		},

		/**
		 * Set a layer's src based on the layer number.
		 *
		 * @param selector {String} The CSS selector for the element
		 * @param layer {number} The layer number to set
		 * @param newImage {String} The name of the new image (without the path)
		 */
		setLayerSrc: function(selector, layer, newImage)
		{

			if (newImage.indexOf(".") != -1)
			{
				// Remove any extension information
				newImage = newImage.substring(0, newImage.indexOf("."));
			}

			var s = this.getState(selector);
			//var oldSrc = $(selector).widgetChild("img").attr("src");
			var oldSrc = $("#currentImageSrc").val();
			if (oldSrc == ''){
				oldSrc = $(selector).widgetChild("img").attr("src");
			}
			//alert("Oldsrc " + oldSrc);
			var layerSrc = s.layers.split(",")[layer];
			//alert("layerSrc " + layerSrc + "newImage " + newImage);
			var newSrc = oldSrc.replace(new RegExp("&src=ThingsRemembered/" + layerSrc), "&src=ThingsRemembered/" + newImage);
			//alert("newSrc" + newSrc);
			// Replace the layer in the stored layers
			var stack = s.layers.split(",");
			stack[layer] = newImage;
			s.layers = stack.join(",");

			// Swap the layer's image
			$(selector).widgetChild("img").attr("src", newSrc);
		},

		/**
		 * Set a layer's src based on the image src in the layer.  The
		 * old image should exist in one of the layers of the image.  As
		 * long as it does, it will be replaced with the new image.  With this
		 * method you don't need to know what layer the image source is specified
		 * for, only the source itself.
		 *
		 * @param selector {String} The CSS selector for the element
		 * @param oldImage {String} The name of the old image (without the path)
		 * @param newImage {String} The name of the new image (without the path)
		 */
		setImageSrc: function(selector, oldImage, newImage)
		{

			// Figure out which layer is the old image
			var s = this.getState(selector);
			var layers = s.layers.split(",");
			for (var i in layers)
			{
				//alert("Old " + oldImage + "New " + newImage + "layers " + layers[i]);
				if (oldImage == layers[i])
				{
					this.setLayerSrc(selector, parseInt(i), newImage);
					break;
				}
			}
		},

		/**
		 * Set the size of the image.
		 *
		 * @param selector {String} The CSS selector for the element
		 * @param width {Number} The new width of the image, in pixels
		 * @param height {Number} The new height of the image, in pixels
		 */
		setImageSize: function(selector, width, height)
		{
			// This works for simple one-layer Scene7 urls only!
			var img = $("img", selector);
			var src = img.attr("src")
					.replace(/wid=[0-9]+/g, "wid=" + width)
					.replace(/hei=[0-9]+/g, "hei=" + height)
					.replace(/size=[0-9,\.]+/g, "size=" + width + "," + height);
			img.attr("width", width).attr("height", height).attr("src", src);
		},

		/**
		 * Get the widget class name.  Every widget in the DOM has an associated
		 * widget class.  Access the class with the <tt>widgetClass()</tt> method.
		 *
		 * @return {String} The string "ImageWidget"
		 */
		getWidgetClassName: function()
		{
			return "ImageWidget";
		}
	});
}
