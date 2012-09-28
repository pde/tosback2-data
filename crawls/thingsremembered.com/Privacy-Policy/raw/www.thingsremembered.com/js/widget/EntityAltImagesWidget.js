if (typeof EntityAltImagesWidget == "undefined")
{
	var EntityAltImagesWidget = Base.extend({
		constructor: null,

		create: function(selector, settings)
		{
			var jQ = $(selector);
			jQ.widgetState(settings).widgetClass(EntityAltImagesWidget);

			$(".button", jQ).assignMouseEvents();

			var self = this;
			$(".image-item", jQ).hover(
					function() {
						var parts = this.elementData;

						if (parts.productId)
						{
							self.overProduct(selector, parts.productId);
							jQ.widgetTrigger("ensembleproducthover", [parts.productId]);
						}
					},	function() {});

			$(".image-item", jQ).click(function()
					{
				self.updateImage(selector, $(this), 0);
				$('.flash-hide').show();
				$('#flashContentWrap').hide();
				$('.alternate-images .image-list .video-item').removeClass('active');
				return false;
					});

			$(".video-item", jQ).click(function()
					{
				$('.flash-hide').hide();
				$('#flashContentWrap').show();
				$('.alternate-images .image-list li').removeClass('active');
				$('.alternate-images .image-list .video-item').addClass('active');
				return false;
					});

			$(".navigate-previous", jQ).click(function()
					{
				self.updateImage(selector, $(".image-item.active", jQ), -1);
				return false;
					});

			$(".navigate-next", jQ).click(function()
					{
				self.updateImage(selector, $(".image-item.active", jQ), 1);
				return false;
					});

		},

		updateImage: function(/** String */selector, /** String */altSelector, /** String */dir)
		{

			var jQ = $(selector);
			var s = jQ.widgetState();

			if (dir == 0) {
				$(".image-item", jQ).removeClass("active");
				$(altSelector).addClass("active");
			} else {
				var items = $(".image-item", jQ).not(".navigation");
				var idx = items.index($(altSelector)[0]);
				var newIdx = idx + dir;
				newIdx = (newIdx < 0 ? items.length - 1 : (newIdx > items.length - 1 ? 0 : newIdx));

				$(".image-item", jQ).removeClass("active");
				$(altSelector).addClass("active");
			}

			var data = $(altSelector).elementData();
			jQ.widgetTrigger("updateimage", [data.altImage]);

			EventTracker.track("AltImage", s.entityType.properCase(), s.entityName, data.altImage);

			if (data.productId) {
				// This is an ensemble and they clicked a product (0 if it's the ensemble)
				jQ.widgetTrigger("ensembleproductselected", [data.productId]);
			}
		},

		overProduct: function(/** String */selector, /** Number */productId)
		{
			var jQ = $(selector);
			$(".image-item", jQ).removeClass("mouseover");
			$(".image-item.e-prod" + productId, jQ).addClass("mouseover");
		},

		selectProduct: function(/** String */selector, /** Number */productId)
		{
			var jQ = $(selector);
			var alt = $(" .e-prod" + productId, jQ);
			var fileURL = alt.entityData("altImage");

			jQ.widgetTrigger("updateimage", [fileURL]);
		},

		getWidgetClassName: function()
		{
			return "EntityAltImagesWidget";
		}
	});
}