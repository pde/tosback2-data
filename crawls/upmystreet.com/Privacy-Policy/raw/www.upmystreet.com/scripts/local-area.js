/*
var ImageCarousel = function()
{
	var getMoreElementsUrl;
	var getPhotoDetailsUrl;
	var currentPage;
	
	return {
		bootstrap : function()
		{
			ImageCarousel.getThumbnails(1);
		},

		bootstrapLinkToThisPage : function()
		{
			$('link_to_page').observe('click', function(event) {
				if (pageTracker != undefined)
					pageTracker._trackPageview('internal/local/pictures/linktopage');
				$('page_link').toggle();
				$('page_link_input').select();
			});
		},
		
		updateImage : function(imageId)
		{
			$('main_photo').update('<img src="http://photos.upmystreet.com/static/loading.jpg" width="640" height="480" />');
			
			var url = ImageCarousel.getPhotoDetailsUrl+'?id='+imageId;
			new Ajax.Request(url, {
				method: 'get',
				onSuccess: function(transport) {
					var imageData = transport.responseText.evalJSON();

					var image = new Image();
					image.src = imageData.imageFilename;
					
					function performUpdate(imageData, mapviewer)
					{
						if (pageTracker != undefined)
							pageTracker._trackPageview('local/pictures/clickthumbnail');
						
						var latlng = new MMLatLon(imageData.imageLat, imageData.imageLng);

						mapviewer.removeAllOverlays();
						mapviewer.goToPosition(latlng);
						
						var icon = new MMIcon('http://www.upmystreet.com/images/map/pins/standard.png');
						icon.iconSize = new MMDimensions(26, 26);
						icon.iconAnchor = new MMPoint(13, 13);
						icon.infoBoxAnchor = new MMPoint(13, 13);
						var marker = mapviewer.createMarker(latlng, {'icon':icon});					
	
						$('main_photo').update(imageData.imageElement);
						$('main_photo_heading').update(imageData.imageName);
						$('photo_metadata').update(imageData.metadataHtml);
						$('photo_copyright').update(imageData.copyrightHtml);		
						$('main_photo_submitted').update(imageData.imageSubmitter);
						$('page_link_input').value = imageData.imagePageUrl;
						$('page_link').hide();			

						/*
						var commentsDiv = $$('#jsKitComments div.js-kit-comments')[0];
						commentsDiv.update(
							new Element('div', {
								'class': 'js-kit-comments',
								'backwards': 'yes',
								'paginate': '10', 
								'uniq': imageData.uniq,
								'permalink': imageData.imagePageUrl
							}).update('Loading comments... Please wait...')
						);
						* /
						//Utility.includeScript("http://js-kit.com/comments.js");
					}

					if (image.onload == undefined)
						image.onload = function() {
							performUpdate(imageData, mapviewer);
						}
					else
						performUpdate(imageData, mapviewer);
				}
			})
		},
		
		getThumbnails : function(page)
		{
			var url = ImageCarousel.getMoreElementsUrl+'?page='+page;
			
			new Ajax.Request(url, {
				method: 'get',
				onSuccess: function(transport) {
					
					var imageList = $('image_list');
					
					imageList.update(transport.responseText);
					
					ImageCarousel.currentPage = page;
					
					if (ImageCarousel.currentPage == 1)
						ImageCarousel.disableLeftScroll();
					else
						ImageCarousel.enableLeftScroll();
					
					ImageCarousel.enableRightScroll();
					
					// add 'onclick' handler to each of the thumbnails
					$$('img[id^="thumbnail-photo-"]').each(function(image) {
						Event.observe(image, 'click', function(clickedImage) {
							imageId = clickedImage.findElement().id.replace('thumbnail-photo-', '');
							ImageCarousel.updateImage(imageId);
						});
						if (AdvertsAutoRefresh != null)
							Event.observe(image, 'click', AdvertsAutoRefresh.refreshAllAdverts);	
						                                                        						
					});
				}
			});
		},
		
		scrollLeft : function()
		{
			if (pageTracker != undefined)
				pageTracker._trackPageview('internal/local/pictures/leftarrow');
			ImageCarousel.getThumbnails(ImageCarousel.currentPage-1);
			AdvertsAutoRefresh.refreshAllAdverts();			
		},
		
		scrollRight : function()
		{
			if (pageTracker != undefined)
				pageTracker._trackPageview('internal/local/pictures/rightarrow');
			ImageCarousel.getThumbnails(ImageCarousel.currentPage+1);
			AdvertsAutoRefresh.refreshAllAdverts();
		},		
		
		enableLeftScroll : function()
		{
			Event.observe($('image_carousel_left'), 'click', ImageCarousel.scrollLeft);
			$('image_carousel_left').removeClassName('disabled');
		},
		
		enableRightScroll : function()
		{
			Event.observe($('image_carousel_right'), 'click', ImageCarousel.scrollRight);
			Event.observe($('image_carousel_more'), 'click', ImageCarousel.scrollRight);
		},
		
		disableLeftScroll : function()
		{
			Event.stopObserving($('image_carousel_left'), 'click', ImageCarousel.scrollLeft);
			$('image_carousel_left').addClassName('disabled');			
		},
		
		disableRightScroll : function()
		{
			Event.stopObserving($('image_carousel_right'), 'click', ImageCarousel.scrollRight);
			Event.stopObserving($('image_carousel_more'), 'click', ImageCarousel.scrollRight);			
		}
				
	}
}();
*/
var LocalAreaSchoolsResultsForm = function() {

	return {
		bootStrap : function() {
			$('#refine-sort-order-top').change( LocalAreaSchoolsResultsForm.submitForm);
			$('#refine-sort-order-bottom').change( LocalAreaSchoolsResultsForm.submitForm);
		},
		
		submitForm : function(event) {
			url = $("select option:selected").val();
			if (url) window.location = url; 
		}
	}
}();