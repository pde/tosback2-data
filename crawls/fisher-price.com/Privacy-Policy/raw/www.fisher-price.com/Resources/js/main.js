// Namespacing for Mattel

var com = com || {};
com.mattel = com.mattel || {};
com.mattel.main = com.mattel.main || {};
com.mattel.main = function () {
	function bindEvents() {
		var localInfo = "/" + $('#locale').val();
		// Top navigation hover menus:
		$('.nav_bottom li').hover(function () {
			var currentObj = $(this);
			var refToAnchorTag = $(currentObj).children("a.navLinks");
			var refToSpan = $(currentObj).children("span:first");
			var refToUl = $(currentObj).children("ul:first");
			$('li.nav_bottom').removeClass('hover-active');
			$('li.nav_bottom a').removeClass('active');
			$(currentObj).addClass('hover-active');
			$(refToAnchorTag).addClass('active');
			$(refToSpan).css('display', 'block');
			if ($.browser.msie) {
				if ($.browser.version == 7.0) {
					$(refToSpan).css('display', 'inline-block');
				}
			}
		}, function () {
			var currentObj = $(this);
			var refToAnchorTag = $(currentObj).children("a.navLinks");
			var refToSpan = $(currentObj).children("span:first");
			var refToUl = $(currentObj).children("ul:first");
			$(currentObj).removeClass('hover-active');
			$(refToAnchorTag).removeClass('active');
			$(refToSpan).css('display', 'none');
			if ($(refToAnchorTag).hasClass('activePage')) {
				$(refToSpan).css('display', 'block');
			};
		});

		// Hide Babygear and Babytoys for US
		if (localInfo.toLocaleLowerCase().indexOf("en_us") != -1) {
			$('.nav_bottom li.productTab ul li[id="nav_Babygear"]').hide();
			$('.nav_bottom li.productTab ul li[id="nav_Baby Toys"]').hide();
		}

		/* brand sub nav strats here */
		$(".nav-links li a").hover(function () {
			$(".nav-links li a").removeClass('active');
			$(this).addClass('active');
		}, function () {
			$(this).removeClass('active');
		});

		$('.select-all').live('click', function (event) {
			toggleChecked(true);
			event.preventDefault();
		});

		$('.deselect-all').live('click', function (event) {
			toggleChecked(false);
			event.preventDefault();
		});

		//	Larger thumbnail preview in Landing_page_FINAL
		$("#landing-right-carousel div.items a").hover(function () {
			var obj_link = $(this);
			$('#landing-right-carousel').css({ 'z-index': '100' });
			//$(this).addClass("hover");
			$(this).find('img').stop()
							.attr('src', obj_link.attr('img-hover'))
							.animate({
								marginTop: '-5px',
								marginLeft: '-5px',
								width: '68px',
								height: '68px'
							}, 150);
		}, function () {
			var obj_link = $(this);
			$('#landing-right-carousel').css({ 'z-index': '0' });
			//$(this).removeClass("hover");
			$(this).find('img').stop()
							.attr('src', obj_link.attr('img-default'))
							.animate({
								marginTop: '0',
								marginLeft: '0',
								width: '58px',
								height: '58px'
							}, 150);
		});

		/* Horizontal Scrollbar - bottom - in product_detail_basic starts */
		$('a#show-hide').live('click', function (event) {
			//Stop default anchor event
			event.preventDefault();
			var tranSpeed = 200;
			//Alternate 'down' & 'up' classes and also chage the text 'Hide caption'/'Show caption'
			if ($(this).is('.down')) {
				//Remove the down class
				$(this).removeClass('down').addClass('up').text($('.showCaptionText').text());
				//Add the up class
				//  $(this).addClass('up');
				//Description block to slide up
				$('p.details-text').slideUp(tranSpeed);
				//Chage the link text
				//  $(this).text('Show caption');
			}
			else {
				//Remove the up class
				$(this).removeClass('up').addClass('down').text($('.hideCaptionText').text());
				//Add the up class
				// $(this).addClass('down').;
				//Description block to slide down
				$('p.details-text').slideDown(tranSpeed);
				//Chage the link text
				//  $(this).text('Hide caption');
			}
		});

		// Products - Babygear - your pregnancy - fun pregnancy tools - Bug ID: 1540481
		$('.FunPregnancyFlash').live('click', function (event) {
			event.preventDefault();

			//Get the url to call
			var top_val = '15%';
			var left_val = '25%';

			var popupurl = $(this).attr("rel");
			var xmlcheck = $(this).attr("flashvar-input");
			if (xmlcheck == 'nonxml') {
				embedObj = flashObjectString(490, 426, popupurl);

			}
			else {
				embedObj = flashObjectString(490, 600, popupurl);

			}
			$('.lightbox-demo.fun-pregnancy .modal-area-content').html(embedObj);
			$('.displayFindRetailerOverlay').jOverlay({ center: false, color: '#000', opacity: 0.7, css: { position: 'absolute', top: top_val, left: left_val} });
			$(document).scrollTop(0);
		});

		// JOL 4 tabs
		$(".openPlayStage").live("click", function () {
			var api = $(".playTime-guide-content .tabs").data("tabs");
			api.click(0);
			$(document).scrollTop(0);
		});

		$(".openTips-toys").live("click", function () {
			var api = $(".playTime-guide-content .tabs").data("tabs");
			api.click(1);
			$(document).scrollTop(0);
		});


		$(".openPlay-learn").live("click", function () {
			var api = $(".playTime-guide-content .tabs").data("tabs");
			api.click(2);
			$(document).scrollTop(0);
		});

		$(".openHelp").live("click", function () {
			var api = $(".playTime-guide-content .tabs").data("tabs");
			api.click(3);
			$(document).scrollTop(0);
		});

		$("#playStage-carousel p.image").live("click", function () {
			var api = $(".playTime-guide-content .tabs").data("tabs");
			var getImageType = $(this).attr('toyType');
			api.click(1);
			setTimeout(function () {
				window.location.hash = "#" + getImageType;
			}, 200);
		});

		$('#search-results-sort,li.option_sample,li.option_sample1,li.option_sample2,li.option_sample3,li.option_sample4').live('mouseover mouseout', function (event) {
			if (event.type == 'mouseover') {
				$(this).addClass("hover-active");
			} else {
				$(this).removeClass("hover-active");
			}
		});
		/*your photo code starts here */
		$('#checklist-filter-drop-down li ').live('click', function () {
			var textContent = $(this).text();
			var monthValue = $(this).attr('monthVal');
			$('#viewAll').html(textContent);
			$("#viewAll").attr("bigMonthVal", monthValue);
			$('#viewAll').html(textContent);
			var class_attr = $(this).attr('class');
			if (class_attr === "view-all-review") {
				$('.dropdown-review').show();
			}
			else if (class_attr === "product-view-all") {
				$('.dropdown-review').show();
			}
			else {
				$('.dropdown-review').hide();
				$('div.' + class_attr).show();
			}
		});

		$('#year-filter-drop-down li').live('click', function () {
			var textContent = $(this).text();
			$('#year-selected').html(textContent);
			$("#viewAll").attr("yearVal", textContent);
		});
		/*go button */
		$('#update-thomas-friends-photos').live('click', function () {

			var yearValue = $("#year-selected").text();
			var monthValue = $("#viewAll").attr('bigmonthval');
			var pageIndexVal = 1;
			data = "year=" + yearValue + "&month=" + monthValue + "&pageindex=" + pageIndexVal;
			ajaxURL = localInfo + "/PhotoUpload/ThomasPhotoSerchResult" + "?" + data;
			targetId = "#your-photo-frames";
			//triggerAjaxCall(ajaxURL, targetId);
			$(targetId).html('').addClass('loading');
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				targetId: targetId
			});

		});
		/*go button ends here */

		/*pagination starts her */
		$('#pagination-results-thomas a').live('click', function () {
			var yearValue = $("#year-selected").text();
			var monthValue = $("#viewAll").attr('bigmonthval');
			var pageIndexVal;
			if (($(this).hasClass("pagination-thomas-checklist-previous")) || ($(this).hasClass("pagination-thomas-list-next"))) {
				pageIndexVal = $(this).attr('pageindex');
			}
			else if ($(this).hasClass("pageIndex-thomas")) {
				pageIndexVal = parseInt($(this).attr('pageindex')) + 1;
			}
			if ($(this).hasClass("active")) {
				pageIndexVal = parseInt($(this).attr('pageindex')) + 1;
			}
			data = "year=" + yearValue + "&month=" + monthValue + "&pageindex=" + pageIndexVal;
			ajaxURL = localInfo + "/PhotoUpload/ThomasPhotoSerchResult" + "?" + data;
			targetId = "#your-photo-frames";
			//triggerAjaxCall(ajaxURL, targetId);
			$(targetId).html('').addClass('loading');
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				targetId: targetId
			});

		});
		/*pagination ends her */
		/* your photo code ends here */

		//        $("img.small-title-image").live("click", function () {
		//            var getBigImgURLPhoto = $(this).attr('enlargedImageUrl');

		//            $("img.big-title-image").attr("src", getBigImgURLPhoto);
		//        }).filter(":first").click();

		$(".gallery-scrollable img").live("click", function () {
			getBigImgURL = $(this).attr('getbigimgurl');
			$(".gallaryImage-big img").attr("src", getBigImgURL);
			getCaption = $(this).attr('imgCaption');
			$('p.image-desc').html(getCaption);
			return true;
		});

		var childCount = 2;
		var addAnotherChild = 2;
		$(".addChild").live("click", function () {
			if ($(this).attr('addChildCount') != undefined && addAnotherChild == childCount) {
				childCount = $(this).attr('addChildCount');
				addAnotherChild = childCount;
			};
			childCount++;
			if (childCount < 11) {
				$("#child" + childCount).show();
			};
			if (childCount == 10) {
				$(".addChild").hide();
			};
		});

		$("#chkSignUp").live("click", function () {
			if ($(this).is(':checked')) {
				$("#signUpFC").show();
			} else {
				$("#signUpFC").hide();
			}
		});

		// Rating code
		var votes;
		var itemval = $("#ItemId").html();
		if ($('.ratingValue').html() != "0") {
			$(".online-rating .craft-rate").html("");
			//Activity Rated Message
			$(".online-rating .craft-rate-mouseover").html($(".rated-message").html());
			$(".inner-page-right .craft-rate").html("");
			//Games Rated Message
			$(".inner-page-right .craft-rate-mouseover").html($(".rated-message").html());
			$(".popup-rating-games .craft-rate").html("");
			//Games Rated Message
			$(".popup-rating-games .craft-rate-mouseover").html($(".rated-message").html());
			$(".online-right-content-craft .craft-rate").html("");
			//Crafts Rated Message
			$(".online-right-content-craft .craft-rate-mouseover").html($(".rated-message").html());
			$(".video-lightbox .sub-heading").hide();
			//Video Rated Message 
			$(".video-lightbox .small").html($(".rated-message").html());
		};
		$("#post_rating a .rating").live("mouseover", function () {
			var currentObj = $(this);
			currentObj.prevAll().removeClass("empty-rating").addClass("full-rating");
			currentObj.removeClass("empty-rating").addClass("full-rating");
			$(".product-rating a").attr("title", (currentObj.prevAll().length + 1));
			return true;
		});


		$("#post_rating a").live("mouseout", function () {
			$(this).children().removeClass("full-rating").addClass("empty-rating");
			return true;
		});

		$("#post_rating a .rating").live("click", function () {
			var currentObj = $(this);
			currentObj.unbind();
			currentObj.siblings().unbind();
			currentObj.parent().unbind();
			var ratingValue = currentObj.prevAll().length + 1;
			var scale = currentObj.siblings().length + 1;
			RateItem(scale, ratingValue);
			return true;
		});

		$("#RatingDisplay").live("mouseover", function () {
			var ratingVal = $(this).find(".ratingValue").html();
			if (ratingVal > 0) {
				$(this).unbind();
			}
			else {
				$(this).hide();
				$(".product-rating").show();
			}
			return true;
		});

		/////

		/* STYLE | thumbnail scroller issue on product detail page - Bug ID: 1571241.
		TODO: Make generic
		*/

		//Get the count of carousel items in product detail carousel
		var product_detail_carousel_items_count = $(".product-detail-scrollable div.items").children().length;

		var dora_gym_product_detail_carousel_items_count = $(".dora-gym-product-detail-scrollable div.items").children().length;
		if (product_detail_carousel_items_count > 5) {

			/* BUG ID: 1571241 - STYLE | thumbnail scroller issue on product detail page - No circular. As last item reached, disable next button & 
			as first item is reached, disable prev button */

			//Show Prev, Next images if products are more than 5 - Bug ID: 1571241
			$('a.product-detail-bottom-prev, a.product-detail-bottom-next').css('display', 'block');

			$(".product-detail-scrollable").scrollable({
				circular: false,
				keyboard: false,
				next: '.product-detail-bottom-next',
				prev: '.product-detail-bottom-prev',
				displaySlideQty: 5, // Number of tiles to be shown at a time in a carousel
				size: 5,
				initialIndex: 0, onBeforeSeek: function () {
				}, onSeek: function (event, index) {

					//Access to the API 
					var api = $(".product-detail-scrollable").data("scrollable");

					//Call the function to disable the 'next' button
					disableNextButtonClass(api);
				}
			});

		}
		else if (product_detail_carousel_items_count < 1) {

			/*
			if there are no items in the product detail carousel, then hide the white rectangular carousel background image. Also hide
			the caption background (transparent white background). - Defect ID: 8528421. It is applicable to both en_US & other international countries.
			*/
			$("#product-detail-carousel, .product-opacity-bg").css("background", "none");
		}


		//Preventing click event of anchor of the small images in the carousel
		$('.product-detail-scrollable .items a, .thomas-track-layout-vertical-left-scrollable .items a').live('click', function (event) {
			event.preventDefault();
		});


		//Opening a popup on carousel item click/change the big image
		$(".product-detail-scrollable .items img, .demo-hover, .tvcom-hover, .threesixtydegree-hover").live("click", function () {

			//Get the type of image/tvcom/video
			var popup_content_type = $(this).parent().attr("rel");

			// see if same thumb is being clicked, if content is demo/tvcom/threesixty again open the popup
			if ($(this).hasClass("active") && popup_content_type == 'image') { return; }

			// calclulate large image's URL based on the thumbnail URL (flickr specific)
			var url = $(this).parent().attr("href");

			//Get the description for big image
			var desc = $(this).parent().attr("title");

			if (popup_content_type == 'demo' || popup_content_type == 'tvcom' || popup_content_type == 'threesixty') {

				//open the popup - loader will be shown
				$("#product-detail-dialog-modal").jOverlay({ color: '#8c8c8c', opacity: 0.9 });

				//Content to write in POPup
				var embedObj = '';

				//Get the file type to be played in POPup
				var media_type = $(this).parent().attr("med-type");

				switch (media_type) {

					case 'swf':
						embedObj = '<object width="640" height="480" id="flaMovie" codebase="http://macromedia.com/cabs/swflash.cab#version=8,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
									   '<param value="' + url + '" name="movie">' +
									   '<param value="medium" name="quality">' +
									   '<param value="transparent" name="wmode">' +
									   '<embed width="640" height="480" type="application/x-shockwave-flash" allowscriptaccess="always" wmode="transparent"' +
									   ' src="' + url + '">' +
									   '</object>';

						break;

					case 'flv':
					case 'mp4':

						var index_pos = url.indexOf("?");

						if (index_pos > 0) {
							var _url = url.substring(index_pos + 1);
							url = "http://www.fisher-price.com/img/demo/us/video_shell.swf?" + _url;
						}

						embedObj = '<object ' +
                                   'height="525" ' +
                                   'width="640" ' +
                                   'id="flaMovie" ' +
                                   'codebase="http://macromedia.com/cabs/swflash.cab#version=9,0,0,0" ' +
                                'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
                                    '<param name="allowFullScreen" value="true">' +
                                    '<param name="movie" value="' + url + '">' +
                                    '<param value="medium" name="quality">' +
                                    '<param value="transparent" name="wmode">' +
                                '<embed ' +
                                    'width="640" ' +
                                    'height="525" ' +
                                    'type="application/x-shockwave-flash" ' +
                                    'wmode="transparent" ' +
                                    'src="' + url + '">' +
                            '</object>';

						break;

					case 'asp_url':

						embedObj = '<iframe name="inlineframe" src="' + url + '" frameborder="0" scrolling="no" width="640" height="525" ></iframe>';

						break;
				}
				//My Changes start here!!!!!!!!!Putting content into the video's lightbox!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

				var name = document.title;      //Pull the title off the page to add to header of jOverlay pane
				//Discover if the Video to be played is a TV Ad or product Demo
				if (popup_content_type == "tvcom") {
					name = name + " TV Ad"
				}
				else {
					name = name + " Demo"
				}


				//If there is no caption on the landing image, grab the first sentence of the description
				var caption = $("a[rel=image]").first().attr("title");
				//When landing Image has no caption to use, do the following:
				if (caption.length < 1) {
					var tempCaption = $("span[itemprop=description]").text();
					var captionArray = new Array();
					captionArray = tempCaption.split(/[!.]+/);
					caption = captionArray[0];
				}

				//Provides the html for the four share icons
				var shareButtons = '<div class="social-links-embed afterFix">' +
                                            '<ul>' +
                                                '<li>Share:</li>' +
                                                '<li id="the-embed-btn" class="share-embed share-text-btns">Embed</li>' +
                                                '<li id="the-email-btn" class="share-email share-text-btns">Email</li>' +
                                                '<li class="share-facebook"><a target="_blank" rel="popup" href="#">' +
                                                    '<img src="/resources/images/fb-icon.png" alt="Facebook Icon" title="Facebook Icon" /></a></li>' +
                                                '<li class="share-twitter"><a target="_blank" rel="popup" href="#">' +
                                                    '<img src="/resources/images/twitter-icon.png" alt="Twitter Icon" title="Twitter Icon" /></a></li>' +
                                            '</ul>' +
                                    '</div>';


				//Organizes the different elements into how they will be presented in the popUp
				var theHtmlObj = '<h4 class="lightbox-product-title">' + name + '</h4>' + embedObj +
                                 '<div id="the-display"></div>' +
                                 '<div class="caption">' + caption + '</div>' +
                                 shareButtons;

				//Write the content in POPup
				$("#dvd-flash").html(theHtmlObj);

				//Need to wrap the embedded video object in a textarea with the appropriate styles
				//Provides the code for embedding a video on your own site when the embed button is clicked
				var embedObjString = '<textarea readonly="yes">' + embedObj + '</textarea>';

				//Get an image to use for the thumbnail in the shared link
				var image = $(".items a[rel=image]").first().attr("href");

				//update facebook, twitter,email,embed links
				$(".share-facebook a").attr('href', 'http://www.facebook.com/sharer/sharer.php?u=' + document.URL);

				$(".share-twitter a").attr('href', 'https://twitter.com/intent/tweet?source=webclient&text=Fisher-Price Video' + url);

				$(".share-facebook-2 a").attr('href', 'http://www.facebook.com/sharer/sharer.php?u=' + document.URL);

				$(".share-twitter-2 a").attr('href', 'https://twitter.com/intent/tweet?source=webclient&text=Fisher-Price Video' + url);

				// -- The Share button triggers --
				$(".share-embed").click(function () { shareBtns("embed", "email"); });
				$(".share-email").click(function () { shareBtns("email", "embed"); });

				// -- The Share button function --
				function shareBtns(box, unbox) {
					if (box == "email" && unbox == "embed") {   //email share button clicked
						$('<div id="email-box" class="share-box" style="display: none;">' +
                            '<div class="share-box-inner">' +
                                '<div class="email-content">' + url + '</div>' +
                                '<div class="copied"></div>' +
                                '<div class="copy-button image-replacement">Copy Link</div>' +
                                '<div class="close-button image-replacement">Close</div>' +
                            '</div>' +
                        '</div>').appendTo("#the-display");
					}
					else {  //embed share button clicked
						$('<div style="display: none;" class="share-box" id="embed-box">' +
                            '<div class="share-box-inner">' +
                                '<div class="instructions">Embed video code:</div>' +
                                '<div class="embed-content">' + embedObjString + '</div>' +
                                '<div class="copied"></div>' +
                                '<div class="copy-button">Copy</div>' +
                                '<div class="close-button image-replacement">Close</div>' +
                            '</div>' +
                          '</div>').appendTo("#the-display");
					}

					//clear "content copied"
					$("#" + box + "-box .copied").html("");

					$("#" + box + "-box .copy-button").zclip({
						path: "/Resources/images/ZeroClipboard.swf",
						copy: $("." + box + "-content").text(),
						afterCopy: function () {
							$("#" + box + "-box .copied").html("Content Copied");
							$("#" + box + "-box").addClass("copied-content");
							$("#" + unbox + "-box .copied").html("");
							$("#" + unbox + "-box").removeClass("copied-content");
						}
					});
				};

				// -- The Copy button function --
				function copyBtn(copied, uncopied) {
					var value = $("." + copied + "-content").text();

					// for IE only
					if (window.clipboardData) {
						window.clipboardData.setData("text", value);
						$("#" + copied + "-box .copied").html("Content Copied");
						$("#" + uncopied + "-box .copied").html("");
					}
				};

				// -- The Copy button triggers --
				$("#embed-box .copy-button").click(function (event) { copyBtn("embed", "email"); });
				$("#email-box .copy-button").click(function (event) { copyBtn("email", "embed"); });

				// -- The Close button trigger --
				$(".share-box .close-button").live('click', function () {
					var tranSpeed = 200;
					$(this).parents(".share-box").stop(true, true).slideUp(tranSpeed);
					$(this).parents(".share-box").find(".copied").html("");
				});


				//My Changes end Here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}

			else if (popup_content_type == 'demo_mobile' || popup_content_type == 'tvcom_mobile') {
				//for ios video can not load is swf player. this sets the video to open in a new tab.
				newVideoTab = window.open(url, '_newtab');
				newVideoTab.focus();
			}
			else {
				//Change the image in the carousel top big image

				// get handle to element that wraps the image and make it semi-transparent
				var wrap = $("#tool").fadeTo("medium", 0.5);

				// the large image from www.flickr.com
				var img = new Image();

				// call this function after it's loaded
				img.onload = function () {

					// make wrapper fully visible
					wrap.fadeTo("fast", 1);

					// change the image
					wrap.find("img").attr("src", url);

					//If description is present show the description panel else hide it
					if (desc.length > 0) {
						//Show the blocks for displaying description
						$('div.details').css('display', 'block');
						$('div.product-opacity-bg').css('display', 'block');

						//Change the description
						$("#tool .details-text").text(desc);
					}
					else {
						//Hide the blocks as there is no description
						$('div.details').css('display', 'none');
						$('div.product-opacity-bg').css('display', 'none');
					}

				};

				// begin loading the image from path
				img.src = url;
			}

			// activate item
			$(".product-detail-scrollable .items img").removeClass("active");

			$(this).addClass("active");

			// when page loads simulate a "click" on the first image
		}).filter(":first").click();

		////


		//dora-gym carousal js
		$('.dora-gym-scrollable').scrollable({ size: 3, circular: true });

		if (dora_gym_product_detail_carousel_items_count > 3) {

			/* BUG ID: 1571241 - STYLE | thumbnail scroller issue on product detail page - No circular. As last item reached, disable next button & 
			as first item is reached, disable prev button */

			//Show Prev, Next images if products are more than 5 - Bug ID: 1571241
			// alert(dora_gym_product_detail_carousel_items_count);
			$('a.dora-gym-product-detail-bottom-prev, a.dora-gym-product-detail-bottom-next').css('display', 'block');

			$(".dora-gym-product-detail-scrollable").scrollable({
				circular: false,
				keyboard: false,
				next: '.dora-gym-product-detail-bottom-next',
				prev: '.dora-gym-product-detail-bottom-prev',
				displaySlideQty: 3, // Number of tiles to be shown at a time in a carousel
				size: 3,
				initialIndex: 0, onBeforeSeek: function () {
				}, onSeek: function (event, index) {

					//Access to the API 
					var api = $(".dora-gym-product-detail-scrollable").data("scrollable");

					//Call the function to disable the 'next' button
					disableNextButtonClass(api);
				}
			});

		}
		else if (dora_gym_product_detail_carousel_items_count < 1) {

			/*
			if there are no items in the product detail carousel, then hide the white rectangular carousel background image. Also hide
			the caption background (transparent white background). - Defect ID: 8528421. It is applicable to both en_US & other international countries.
			*/
			$("#dora-gym-product-detail-carousel, .dora-gym-product-opacity-bg").css("background", "none");
		}


		//Preventing click event of anchor of the small images in the carousel
		$('.dora-gym-product-detail-scrollable .items a, .thomas-track-layout-vertical-left-scrollable .items a').live('click', function (event) {
			event.preventDefault();
		});


		//Opening a popup on carousel item click/change the big image
		$(".dora-gym-product-detail-scrollable .items img").live("click", function () {

			//Get the type of image/tvcom/video
			var popup_content_type = $(this).parent().attr("rel");

			// see if same thumb is being clicked, if content is demo/tvcom/threesixty again open the popup
			if ($(this).hasClass("active") && popup_content_type == 'image') { return; }

			// calclulate large image's URL based on the thumbnail URL (flickr specific)
			var url = $(this).parent().attr("href");

			//Get the description for big image
			var desc = $(this).parent().attr("title");

			if (popup_content_type == 'demo' || popup_content_type == 'tvcom' || popup_content_type == 'threesixty') {

				//open the popup - loader will be shown
				$("#product-detail-dialog-modal").jOverlay({ color: '#8c8c8c', opacity: 0.9 });

				//Content to write in POPup
				var embedObj = '';

				//Get the file type to be played in POPup
				var media_type = $(this).parent().attr("med-type");

				switch (media_type) {

					case 'swf':
						embedObj = '<object width="640" height="480" id="flaMovie" codebase="http://macromedia.com/cabs/swflash.cab#version=8,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
									   '<param value="' + url + '" name="movie">' +
									   '<param value="medium" name="quality">' +
									   '<param value="transparent" name="wmode">' +
									   '<embed width="640" height="480" type="application/x-shockwave-flash" allowscriptaccess="always" wmode="transparent"' +
									   ' src="' + url + '">' +
									   '</object>';

						break;

					case 'flv':
					case 'mp4':

						var index_pos = url.indexOf("?");

						if (index_pos > 0) {
							var _url = url.substring(index_pos + 1);
							url = "http://www.fisher-price.com/img/demo/us/video_shell.swf?" + _url;
						}

						embedObj = '<object ' +
                                   'height="525" ' +
                                   'width="640" ' +
                                   'id="flaMovie" ' +
                                   'codebase="http://macromedia.com/cabs/swflash.cab#version=9,0,0,0" ' +
                                'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
                                    '<param name="allowFullScreen" value="true">' +
                                    '<param name="movie" value="' + url + '">' +
                                    '<param value="medium" name="quality">' +
                                    '<param value="transparent" name="wmode">' +
                                '<embed ' +
                                    'width="640" ' +
                                    'height="525" ' +
                                    'type="application/x-shockwave-flash" ' +
                                    'wmode="transparent" ' +
                                    'src="' + url + '">' +
                            '</object>';

						break;

					case 'asp_url':

						embedObj = '<iframe name="inlineframe" src="' + url + '" frameborder="0" scrolling="no" width="640" height="525" ></iframe>';

						break;
				}

				//Write the content in POPup				
				$("#dvd-flash").html(embedObj);
			}
			else {
				//Change the image in the carousel top big image

				// get handle to element that wraps the image and make it semi-transparent
				var wrap = $("#tool").fadeTo("medium", 0.5);

				// the large image from www.flickr.com
				var img = new Image();

				// call this function after it's loaded
				img.onload = function () {

					// make wrapper fully visible
					wrap.fadeTo("fast", 1);

					// change the image
					wrap.find("img").attr("src", url);

					//If description is present show the description panel else hide it
					if (desc.length > 0) {
						//Show the blocks for displaying description
						$('div.details').css('display', 'block');
						$('div.product-opacity-bg').css('display', 'block');

						//Change the description
						$("#tool .details-text").text(desc);
					}
					else {
						//Hide the blocks as there is no description
						$('div.details').css('display', 'none');
						$('div.product-opacity-bg').css('display', 'none');
					}

				};

				// begin loading the image from path
				img.src = url;
			}

			// activate item
			$(".dora-gym-product-detail-scrollable .items img").removeClass("active");

			$(this).addClass("active");

			// when page loads simulate a "click" on the first image
		}).filter(":first").click();

		////
		//Awards Pop Up Overlay in Product Detail
		$('a#btn-award-winner').live('click', function (event) {
			event.preventDefault();
			$('div.displayAwardsOverlay').jOverlay({ color: '#8c8c8c', opacity: 0.9 });
			$('div.displayAwardsOverlay').css("position", "fixed");
			$('div.displayAwardsOverlay').css("top", "0");
		});

		//Safety Info Pop Up Overlay in Product Detail
		$('a#safety-info').live('click', function (event) {
			event.preventDefault();
			$('div.displaySafteyLinkOverlay').jOverlay({ color: '#8c8c8c', opacity: 0.9 });
		});

		//Craft Detail page Carousel imageclick event Popup
		$('#craft-carousel .items a img, .right-bottom-scrollable .items a img, #birthday-landing-carousel .items a img, #bithday-right-carousel .items a img').live('click', function (event) {
			event.preventDefault();

			var big_img_url = $(this).attr('big-image');
			var img_description = $(this).attr('image-desc');
			$("body").prepend('<div id="wait-curtain"><div class="transp50"></div><img src="/Resources/Images/ajax-loader.gif" width="220" height="19" border="0"/></div>');
			var ni = new Image();
			ni.src = big_img_url;
			$('.big-image-dialog div.modal-area-content p').html(img_description);
			$('.big-image-dialog div.modal-area-content img').attr('src', big_img_url)
            .one("load", function () {

            	var time_interval = window.setTimeout(function () {
            		if (ni.width > 0) {
            			var loadedWidth = ni.width + $('.big-image-dialog .lightbox-content').outerWidth();
            			$('.big-image-dialog').css('width', loadedWidth).jOverlay({ color: '#8c8c8c', opacity: 0.9 });
            			$('#wait-curtain').remove();
            			clearTimeout(time_interval);
            		}
            	}, 2);
            })
            .each(function () {
            	if (this.complete || (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6))
            		$(this).trigger("load");
            });

		});

		/* If user clicks on overlay, overlay gets closed & if required scrollbar appears */
		$('#jOverlay').live('click', function () {
			//Set the scrollbar for the window
			$("body").css("overflow", "auto");
		});

		$('#outing li').live("click", function () {
			getURI = $(this).attr('uri');
			targetId = "#outingContent";
			ajaxURL = localInfo + "/Filter/GetOutingComponent?componentUri=" + getURI;
			//triggerAjaxCall(ajaxURL, targetId);
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				targetId: targetId
			});
			$(targetId).html('').addClass('loading');
		});

		// play gallary page code: updating the carousal based on the year and month seclected:

		$("#selectAnotheAlbum a.getYear").live("click", function () {
			$("#selectAnotheAlbum a.getYear").removeClass('selected');
			$(this).addClass('selected');
			targetId = ".gallery-carousel-content";
			ajaxURL = localInfo + "/PhotoUpload/globalPhotoSerchResult";
			collectGallryDataList(ajaxURL, targetId);
			return false;
		});


		$("#selectAnotheAlbum a.getMonth").live("click", function () {
			$("#selectAnotheAlbum a.getMonth").removeClass('selected');
			$(this).addClass('selected');
			targetId = ".gallery-carousel-content";
			ajaxURL = localInfo + "/PhotoUpload/globalPhotoSerchResult";
			collectGallryDataList(ajaxURL, targetId);
			return false;
		});

		// JOL playtimeguide activities
		$(".playtime-guide-activities a").live("click", function () {
			getURI = $(this).attr('uri');
			targetId = ".play-LearnTabContent .tab-column-left"
			ajaxURL = localInfo + "/Filter/GetPlayAndLearnActivityComponent?componentUri=" + getURI;
			//triggerAjaxCall(ajaxURL, targetId, 'playTimeGuide');
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				targetId: targetId,
				onSuccessCallback: function () { return "playTimeGuide" }
			});
			$(targetId).html('').addClass('loading');
		});

		//Floodlight Tag on button clicks for BuyNow and Find a Retailer buttons
		$("a.trackFL").live("click", function () {
			var flAttributes = $(this).attr("fltag").split('|');
			var tag = {
				sku: flAttributes[0],
				source: flAttributes[1],
				type: flAttributes[2],
				cat: flAttributes[3]
			};
			var tag_url = "http://fls.doubleclick.net/activityi;src=" + tag.source + ";type=" + tag.type + ";cat=" + tag.cat + ";u7=" + tag.sku + ";ord=" + Math.floor(Math.random() * 999999) + "?";
			$(this).append('<iframe src="' + tag_url + '" width="1" height="1" frameborder="0" style="display:none"></iframe>');
		});

		//Function to track the analytics on click.
		$("a").live("click", function () {
			isTracking = $(this).attr('track');
			if (isTracking !== undefined) {
				getTrackValue = $(this).attr('track');
				getTrackValue = getTrackValue.split('|');

				if (typeof (getTrackValue[2]) != "undefined") {
					if ($("#homeGAtrack").length > 0 && getTrackValue[2].indexOf("/") != -1) {
						getTrackValue[2] = getTrackValue[2].split("/")[0];
					}
					else {
						if (getTrackValue[2].indexOf("/") != -1) {
							getTrackValue[2] = getTrackValue[2].split("/")[1];
						}
					}
				}

				// Fix the Campaign and Channel - Try to use tracker XML parameters (from tracker.mattel.com) as possible
				trackCampain = (getTrackValue[1].indexOf(" ") < 0) ? "CAMPAIGN." + getTrackValue[1].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[1] + "\'";
				trackChannel = (getTrackValue[2].indexOf(" ") < 0) ? "CHANNEL." + getTrackValue[2].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[2] + "\'";
				trackContentType = (getTrackValue[3].indexOf(" ") < 0) ? "CONTENTTYPE." + getTrackValue[3].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[3] + "\'";
				trackAction = (getTrackValue[4].indexOf(" ") < 0) ? "ACTION." + getTrackValue[4].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[4] + "\'";

				var scriptCall = 'Tracker.track(' + '{name:\'' + getTrackValue[0] +
							'\',campaign:' + trackCampain +
							',channel:' + trackChannel +
							',contenttype:' + trackContentType +
							',action:' + trackAction + '})';
				if (typeof (Tracker) != "undefined") {
					eval(scriptCall);
				}

			};
		});

		//Pop up Close icon click event
		$('#popup-close, .popup-close-button, .thomas-popup-close').live('click', function (event) {
			//Stop default anchor event
			event.preventDefault();
			//For Demos/Tv Ads stop the video to fix the FireFox bug of audio continuing to play in background
			var myVideoPlayer = document.getElementById("flaMovie");
			if (myVideoPlayer != null) {
				//myVideoPlayer.sendEvent("STOP");
				//myVideoPlayer.sendEvent("PLAY", "false");
				//alert('Close clicked!');
			}
			//Call the function to hide the popup 
			$.closeOverlay();

			$('.displayComponentOverlay, .displayHomeVideoOverlay').html('');
		});

		//Preventing click event of anchor of the small images in the photo carousel
		$('.share-your-photo-scrollable .items a').live('click', function (event) {
			event.preventDefault();
		});

		//Opening a carousel in popup on item click the small image - photo carousel
		$(".share-your-photo-scrollable .items img ").live("click", function () {

			//Get the anchor index of the image clicked in the carousel     
			var clicked_image_div_index = $(this).parent().index();

			//Call the function to generate the carousel in popup
			shareYourPhotoPopUp(clicked_image_div_index);
		});

		// custom checkbox
		$('.cCheckbox').live('click', function (e) {
			if (e.target.type !== 'checkbox' && !($(':checkbox', this).is(':disabled'))) {
				$(':checkbox', this).trigger('click');
				$(this).toggleClass('checked');
			}
		});

		// article search
		$('#articleSearchBtn').live("click", function () {
			getpageType = $("#articleSearchPageType").val();
			getInputValue = $("#searchArticle").val();

			if ($(this).parents('.fpbaby-articles-advice').length > 0) {
				window.location = localInfo + "/baby/fpbaby/articles/articlesearchresult.html?filterKey=" + getInputValue + "&pageName=" + getpageType;
			} else {
				window.location = localInfo + "/articlesearchresult.html?filterKey=" + getInputValue + "&pageName=" + getpageType;
			}
		});

		//var N = 0;
		$('#artSearchPrevious, #artSearchNext').live("click", function () {
			N = parseInt($("#pageSize").val()) * (parseInt($(this).attr('pageIndex')) - 1);
			targetId = "#articleSearchResults"
			ajaxURL = localInfo + "/search/GetEndecaArticles?N=" + N + "&Ntk=Articles&Ntx=mode+matchallany&articlePageIndex=" + $(this).attr('pageIndex') + "&filterKey=" + $('#searchTerm').val() + "&pageName=" + $('#articleSearchPageType').val();
			//triggerAjaxCall(ajaxURL, targetId);
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				targetId: targetId
			});
			$(targetId).html('').addClass('loading');
			return false;
		});

		$('#artSearchPreviousQA, #artSearchNextQA').live("click", function () {
			N = parseInt($("#pageSizeQA").val()) * (parseInt($(this).attr('pageIndex')) - 1);
			targetId = "#articleSearchResultsQA"
			ajaxURL = localInfo + "/search/GetEndecaAdvice?N=" + N + "&Ntk=Articles&Ntx=mode+matchallany&advicePageIndex=" + $(this).attr('pageIndex') + "&filterKey=" + $('#searchTerm').val() + "&pageName=" + $('#articleSearchPageType').val();
			//triggerAjaxCall(ajaxURL, targetId);
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				targetId: targetId
			});
			$(targetId).html('').addClass('loading');
			return false;
		});

		$('#searchArticle').keyup(function (event) {
			if (event.which === 13) {
				$('#articleSearchBtn').trigger("click");
			};
		});

		$(document).keydown(function (event) {
			if (event.keyCode == 27) {
				$.closeOverlay();
				$('.displayComponentOverlay, .displayHomeVideoOverlay').html('');
			}
		});

		/* Hero World - Meet the Heroes  */
		$('a.meet-heroes-link').live("click", function (event) {
			event.preventDefault();
		});

		$("img.meet-heroes").live("click", function () {

			var url = $(this).parent().attr("href");

			var embedObj = '<object width="671" height="252" id="flaMovie" codebase="http://macromedia.com/cabs/swflash.cab#version=8,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
					'<param value="' + url + '" name="movie">' +
					'<param value="medium" name="quality">' +
					'<param value="transparent" name="wmode">' +
					'<embed width="671" height="252" type="application/x-shockwave-flash" allowscriptaccess="always" wmode="transparent"' +
					' src="' + url + '">' +
					'</object>';
			$("#meet-heroes-flash").html(embedObj);

		}).filter(":first").click();

		//Thomas & Friends Track Layout carousel item click/change the big image
		$(".thomas-track-layout-vertical-left-scrollable .items img").live("click", function () {

			//get pdf path
			var pdf_path = $(this).parent().attr("rel");

			// see if same thumb is being clicked, if content is demo/tvcom/threesixty again open the popup
			if ($(this).hasClass("active")) { return; }

			// calclulate large image's URL based on the thumbnail URL (flickr specific)
			var url = $(this).parent().attr("href");

			//Change the image in the carousel top big image

			// get handle to element that wraps the image and make it semi-transparent
			var wrap = $("#tool").fadeTo("medium", 0.5);

			// the large image from www.flickr.com
			var img = new Image();

			// call this function after it's loaded
			img.onload = function () {

				// make wrapper fully visible
				wrap.fadeTo("fast", 1);

				// change the image
				wrap.find("img").attr("src", url);
			};

			// begin loading the image from path
			img.src = url;

			//set the pdf path for the image
			$('a.print-layout').attr('href', pdf_path);

			// activate item
			$(".thomas-track-layout-vertical-left-scrollable .items img").removeClass("active");

			$(this).addClass("active");

			// when page loads simulate a "click" on the first image
		}).filter(":first").click();

		$('a.promoColor').live('click', function (event) {
			event.preventDefault();
			getPopURL = $(this).attr('href');
			optionString = ('width=800, height=1000 ,toolbar=no, location=no, directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes');
			window.open(getPopURL, 'popup', optionString);
			return false;
		});

		$('a.promoESPN').live('click', function (event) {
			event.preventDefault();
			getPopURL = $(this).attr('href');
			optionString = ('width=700, height=450 ,toolbar=no, location=no, directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes');
			mainWin = window.open(getPopURL, 'popup', optionString);
			return false;
		});

		$("li.product-checklist-have").live('click', function () {
			///en_US/TridionPage/CreateLightBox?modelId=tcm%3A111-2345-8&ParamView=_ThomasLogin
			var currentObj = $(this);
			ajaxURL = localInfo + "/CheckList/IsUserLoggedInAjax";
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				onSuccessCallback: function () { return "checkListPageHaveIt" },
				currentObj: currentObj
			});

		});
		$("li.product-checklist-have a").live('click', function (event) {
			event.preventDefault();
		});
		$('a.nav-yourchecklist').live('click', function (event) {
			event.preventDefault();
			getHrefLink = $(this).attr('href');
			ajaxURL = localInfo + "/CheckList/IsUserLoggedInAjax";
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				onSuccessCallback: function () { return "checkListPage" },
				hrefLink: getHrefLink
			});
		});

		$("div.products-i-have .remove").live('click', function (event) {
			event.preventDefault();
			var currentObj = $(this);
			ajaxURL = localInfo + "/CheckList/IsUserLoggedInAjax";
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				onSuccessCallback: function () { return "checkListHaveItSection" },
				currentObj: currentObj
			});
		});

		$("div.products-i-need .remove").live('click', function (event) {
			event.preventDefault();
			var currentObj = $(this);
			ajaxURL = localInfo + "/CheckList/IsUserLoggedInAjax";
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				onSuccessCallback: function () { return "checkListNeedItSection" },
				currentObj: currentObj
			});
		});


		$("div.products-want-ajax .have-it").live('click', function (event) {
			event.preventDefault();
			var currentObj = $(this);
			ajaxURL = localInfo + "/CheckList/IsUserLoggedInAjax";
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				onSuccessCallback: function () { return "checkListHaveItSection" },
				currentObj: currentObj
			});
		});

		$('a.email-selection').live('click', function (event) {
			event.preventDefault();
			var currentObj = $(this);
			getFilterOption = $('#search-results-sort .product-filter-by').text();
			getRel = $(currentObj).attr('rel');
			ajaxURL = localInfo + "/CheckList/IsUserLoggedInAjax";
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				onSuccessCallback: function () { return "emailCheckList" },
				currentObj: currentObj,
				hrefLink: getRel,
				getFilterOption: getFilterOption
			});
		});

		$('a.pageNumber').live('click', function (event) {
			var currentObj = $(this);
			pageIndex = $(currentObj).attr('pageIndex');
			if ($(currentObj).hasClass('tabsNext')) {
				pageIndex = parseInt(pageIndex) + 1;
			} else if ($(currentObj).hasClass('tabsPrev')) {
				pageIndex = parseInt(pageIndex) - 1;
			} else {
				pageIndex = parseInt(pageIndex);
			}
			tabNo = $(currentObj).attr('tab');
			ajaxURL = localInfo + "/RTBVideoBlog/GetPaginationForBrands?pageIndex=" + pageIndex + "&tabNo=" + tabNo;
			targetId = "#tab" + tabNo + "Pane";
			$(targetId).html('').addClass('loading');
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				targetId: targetId
			});
		});

		$('.landing-prev,.landing-next,.brand-prev,.brand-next').click(function (event) {
			api.stop();
		});

	}; // bind event ends

	/* Following function returns Object string for Flash with width, height & swf path */
	function flashObjectString(_width, _height, _path) {
		var obj_str = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="' + _width + '" height="' + _height + '">' +
                    '<param name="movie" value="' + _path + '"/>' +
                    '<param name="quality" value="high" />' +
                    '<param name="bgcolor" value="#cccccc" />' +
                    '<param name="play" value="true" />' +
                    '<param name="loop" value="false" />' +
                    '<param name="wmode" value="transparent" />' +
                    '<param name="scale" value="showall" />' +
                    '<param name="menu" value="false" />' +
                    '<param name="devicefont" value="false" />' +
                    '<param name="salign" value="" />' +
                    '<param name="allowScriptAccess" value="sameDomain" />' +
                        '<!--[if !IE]>-->' +
                        '<object type="application/x-shockwave-flash" data="' + _path + '" width="' + _width + '" height="' + _height + '">' +
                        '<param name="movie" value="' + _path + '"/>' +
                        '<param name="quality" value="high" />' +
                        '<param name="bgcolor" value="#cccccc" />' +
                        '<param name="play" value="true" />' +
                        '<param name="loop" value="false" />' +
                        '<param name="wmode" value="transparent" />' +
                        '<param name="scale" value="showall" />' +
                        '<param name="menu" value="false" />' +
                        '<param name="devicefont" value="false" />' +
                        '<param name="salign" value="" />' +
                        '<param name="allowScriptAccess" value="sameDomain" />' +
                        '<!--<![endif]-->' +
                    '<a href="http://www.adobe.com/go/getflash"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a>' +
                    '<!--[if !IE]>-->' +
                '</object>' +
                '<!--<![endif]-->' +
            '</object>';

		return obj_str;
	};

	function shareYourPhotoPopUp(clicked_image_div_index) {

		//Call the overlay plug-in to show the carousel
		$('.displayOverlay').jOverlay({ color: '#8c8c8c', opacity: 0.9 });

		//Get the api reference for that popup carousel
		var api = $(".share-your-photo-popup-scrollable").data("scrollable");

		//Move the carousel to the respective items
		api.seekTo(clicked_image_div_index, '5000')

		return false;
	};

	function updatePageUI(data) {
		$(".rightTop").html($(data).find('.rightTopAjax').html());
		if ($(data).find('.playTipTopRight img').length === 0) {
			$('.playTipActivitiesSec').css('top', '0px');
		}

		if ($(data).find('.rightTopAjax .ratingValue').html() != "0") {
			$(".rightTop .craft-rate").html("");
			$(".rightTop .craft-rate-mouseover").html($(".rated-message").html());
		};
		$('.out-of').html($('.out-of-text').html());
		$('.votes-voted').html($('.votes-text').html());

		$('span.text').wrapInner('<span />');
		if ($.browser.msie && (parseInt($.browser.version, 10) == 7)) {
			$('span.text span').each(function () {
				getCharacterCount = $(this).html().length;
				if (getCharacterCount <= parseInt(14)) {
					$(this).css('padding-top', '8px')
				} else {
					$(this).css('padding-top', '2px')
				}
			});
		}
		var settingsonline_right_content_heading = {
			tl: { radius: 20 },
			tr: { radius: 20 },
			bl: { radius: 0 },
			br: { radius: 0 },
			antiAlias: true
		};

		var settingsonline_right_content_buttons = {
			tl: { radius: 0 },
			tr: { radius: 0 },
			bl: { radius: 16 },
			br: { radius: 16 },
			antiAlias: true
		};
		createCurvyCorners(settingsonline_right_content_heading, ".online-right-content-heading");
		createCurvyCorners(settingsonline_right_content_buttons, ".online-right-content-buttons");
		//curvyCornersRedraw();
		return false;
	};

	function collectGallryDataList(ajaxURL, targetId) {
		yearRange = $("#selectAnotheAlbum a.getYear.selected").attr('pyear');
		monthRange = $("#selectAnotheAlbum a.getMonth.selected").attr('pmonth');
		data = "year=" + yearRange + "&month=" + monthRange + "&currentView=" + $("#currentViewText").val() + "&anotherAlbum=" + $("#anotherAlbumText").val() + "&noPhotoMeassage=" + $("#noPhotoMeassageText").val();
		ajaxURL = ajaxURL + "?" + data;
		$(targetId).empty().addClass('loading');
		triggerAjaxCall({
			ajaxURL: ajaxURL,
			targetId: targetId,
			onSuccessCallback: function () { return "galleryPage" }
		});
	};

	function reInitiateCarousal() {
		$(".gallery-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.gallery-next',
			prev: '.gallery-prev',
			displaySlideQty: 7, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Number of tiles to be displayed at once in the carousel
				var displaySlideQty = 7;
				//Access to the API 
				var api = $(".gallery-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableButtonNext1(api, displaySlideQty, index);
			}
		});
	};

	function checkIfUserLoggedIn() {

	}

	function triggerAjaxCall(params) {

		var options = $.extend({
			ajaxURL: null,
			targetId: "",
			hrefLink: "",
			currentObj: "",
			getFilterOption: "",
			onSuccessCallback: function () { },
			onErrorCallBack: function () { }

		}, params);
		if (options.ajaxURL) {
			$.ajax({
				type: 'POST',
				cache: 'false',
				url: options.ajaxURL,
				success: function (data) {
					if (options.targetId !== "") {
						$(options.targetId)
							.removeClass('loading')
							.html(data);
					}

					//console.log(onSuccessCallback);
					if (options.onSuccessCallback() === 'galleryPage') {
						reInitiateCarousal();
					};
					if (options.onSuccessCallback() === 'playTimeGuide') {
						updatePageUI(data);
					};
					if (options.onSuccessCallback() === 'checkListPage') {
						isUserLoggedIn(data, options.hrefLink);
					};
					if (options.onSuccessCallback() === 'checkListPageHaveIt') {
						saveUserOptions(data, options.currentObj);
					};
					if (options.onSuccessCallback() === 'checkListHaveItSection') {
						updateHaveItSection(data, options.currentObj);
					};
					if (options.onSuccessCallback() === 'checkListNeedItSection') {
						updateNeedItSection(data, options.currentObj);
					};
					if (options.onSuccessCallback() === 'emailCheckList') {
						openEmailCheckListPopup(data, options.getFilterOption, options.hrefLink);
					};
				},
				error: function (data) {
					options.onErrorCallBack();
				}
			});
		}
	};

	function isUserLoggedIn(data, hrefLink) {
		if (data === 'True') {
			window.location = hrefLink;
		} else {
			openLoginPopUp();
		}
	}

	function saveUserOptions(data, currentObj) {
		if (data === 'True') {
			getProductId = $(currentObj).attr('prodid');
			getDataAttr = $(currentObj).attr('data-attr');
			if ($(currentObj).hasClass('selected')) {
				$(currentObj).removeClass('selected');
			} else {
				$(currentObj).addClass('selected');
			}
			ajaxURL = localInfo + "/CheckList/SaveUserAttributes?attributeType=" + getDataAttr + "&attributeValue=" + getProductId;
			triggerAjaxCall({
				ajaxURL: ajaxURL
			});
		} else {
			openLoginPopUp();
		}
	}

	function updateHaveItSection(data, currentObj) {
		if (data === 'True') {
			if ($(currentObj).hasClass('have-it')) {
				$(currentObj).hide();
			}
			getProductId = $(currentObj).attr('id');
			getDataAttr = $(currentObj).attr('data-attr');
			$('#haveit-prods').html('');
			ajaxURL = localInfo + "/CheckList/SaveAndGetHaveitCheckList?attributeType=" + getDataAttr + "&attributeValue=" + getProductId;
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				targetId: "#haveit-prods"
			});
			if ($(currentObj).hasClass('have-it')) {
				$('#wantit-prods').html('');
				ajaxURL = localInfo + "/CheckList/SaveAndGetWantitCheckList?attributeType=wantit" + "&attributeValue=" + getProductId;
				triggerAjaxCall({
					ajaxURL: ajaxURL,
					targetId: "#wantit-prods"
				});
			}
		} else {
			openLoginPopUp();
		}
	}

	function updateNeedItSection(data, currentObj) {
		if (data === 'True') {
			getProductId = $(currentObj).attr('id');
			getDataAttr = $(currentObj).attr('data-attr');
			$('#wantit-prods').html('');
			ajaxURL = localInfo + "/CheckList/SaveAndGetWantitCheckList?attributeType=" + getDataAttr + "&attributeValue=" + getProductId;
			triggerAjaxCall({
				ajaxURL: ajaxURL,
				targetId: "#wantit-prods"
			});
		} else {
			openLoginPopUp();
		}
	}

	function openEmailCheckListPopup(data, getFilterOption, hrefLink) {
		if (data === 'True') {
			opencheckListPopup(getFilterOption, hrefLink);
		} else {
			openLoginPopUp();
		}
	}

	function opencheckListPopup(getFilterOption, hrefLink) {
		var popupurl = hrefLink + "&emailType=" + getFilterOption;

		//Make the AJAX call to fetch the data & then call overlay to display popup
		$.ajax({
			url: popupurl,
			success: function (data) {
				$('.displayComponentOverlay').html(data);
				$('.displayComponentOverlay').jOverlay({ color: '#8c8c8c', opacity: 0.9, zindex: '9999', bgClickToClose: false });
				$(document).scrollTop(0);
			}
		});
	}

	function openLoginPopUp() {
		var popupurl = localInfo + "/TridionPage/CreateLightBox?modelId=tcm%3A111-2345-8&ParamView=_ThomasLogin";

		//Make the AJAX call to fetch the data & then call overlay to display popup
		$.ajax({
			url: popupurl,
			success: function (data) {
				$('.displayComponentOverlay').html(data);
				$('.displayComponentOverlay').jOverlay({ color: '#8c8c8c', opacity: 0.9, zindex: '9999', bgClickToClose: false });
				$(document).scrollTop(0);
			}
		});
		var popupurl = "";
	}

	function RateItem(scale, ratingValue) {
		itemval = $("#ItemId").html();
		var localInfo = "/" + $('#locale').val();
		$.post(localInfo + "/Rating/SaveRating", { itemId: itemval, rating: ratingValue },
                function (obj) {
                	if (obj.Success) {
                		votes = obj.Result.Rating;
                		setRating(votes, ratingValue); //update the display
                	}
                	else {
                		//alert(obj.Message); //failure, show message
                	}
                });
		if ($('.video-rating-check').length == 0) {
			$.post(localInfo + "/Rating/GetAverageRating", { itemId: itemval, showRatingSummary: true },
                    function (obj) {
                    	$('.avgRatingSec').html(obj);
                    	$('.out-of').html($('.out-of-text').html());
                    	$('.votes-voted').html($('.votes-text').html());
                    });
		}
		else {
			$.post(localInfo + "/Rating/GetAverageRating", { itemId: itemval, showRatingSummary: false },
                    function (obj) {
                    	$("." + itemval + " .avgRatingSec").html(obj);
                    	$('.out-of').html($('.out-of-text').html());
                    	$('.votes-voted').html($('.votes-text').html());
                    });
			$.post(localInfo + "/Rating/GetAverageRating", { itemId: itemval, showRatingSummary: true },
                    function (obj) {
                    	$(".lightbox-avg-rating-video .avgRatingSec").html(obj);
                    	$('.out-of').html($('.out-of-text').html());
                    	$('.votes-voted').html($('.votes-text').html());
                    });

		};

	};

	function setRating(votes, ratingValue) {
		$(".rating").remove();
		$(".ratings .ratingValue").html(ratingValue);
		$(".ratings").prepend(votes).show();
		$(".product-rating").hide();
		$(".online-rating .craft-rate").html("");
		//Activity Thanks Message
		$(".online-rating .craft-rate-mouseover").html($(".rated-thanks-message").html());
		$(".inner-page-right .craft-rate").html("");
		//Game Thanks Message
		$(".inner-page-right .craft-rate-mouseover").html($(".rated-thanks-message").html());
		$(".popup-rating-games .craft-rate").html("");
		//Game Thanks Message
		$(".popup-rating-games .craft-rate-mouseover").html($(".rated-thanks-message").html());
		$(".online-right-content-craft .craft-rate").html("");
		//Craft Thanks Message
		$(".online-right-content-craft .craft-rate-mouseover").html($(".rated-thanks-message").html());
		$(".video-lightbox .sub-heading").hide();
		//Video Thanks Message
		$(".video-lightbox .small").html($(".rated-thanks-message").html());
	};

	function toggleChecked(status) {
		$(".checkboxes input").each(function () {
			$(this).attr("checked", status);
		});
	};

	function disableButtonNext1(api, displaySlideQty, index) {
		//Get the next button reference
		var next_btn = api.getConf().next;

		//Get the disabled class name
		var disabled_class = api.getConf().disabledClass;

		/*
		If the summation value of the index of starting tile in the set of visible 3 tiles and number of tiles to be displayed at once in a crousel is equal to the total number of 		tiles in the carousel, then there is no more tile to display. So then make the 'next' button disabled. Also click event is disabled for 'next' button. But if user clicks on 'prev', 
		then 'next' button is enabled and it is binded to click event again for moving to next tile
		*/
		if (api.getSize() === (index + displaySlideQty)) {
			//Go to the parent DIV of root, then find the 'next' button DOM reference & finally add the disabled class.
			$(api.getRoot()).parent().find(next_btn).toggleClass(disabled_class);

			//Unbind the click event of 'next' button
			$(api.getRoot()).parent().find(next_btn).unbind('click');
		}
		else {
			//alert("hello");
			//Bind the click event of 'next' button
			$(api.getRoot()).parent().find(next_btn).unbind('click').bind('click', function (e) { e.stopPropagation(); api.next(); });
		}
	};

	function disableButtonNext(api, displaySlideQty, index) {
		//Get the next button reference
		var next_btn = api.getConf().next;

		//Get the disabled class name
		var disabled_class = api.getConf().disabledClass;

		/*
		If the summation value of the index of starting tile in the set of visible 3 tiles and number of tiles to be displayed at once in a crousel is equal to the total number of 		tiles in the carousel, then there is no more tile to display. So then make the 'next' button disabled. Also click event is disabled for 'next' button. But if user clicks on 'prev', 
		then 'next' button is enabled and it is binded to click event again for moving to next tile
		*/
		if (api.getSize() === (index + displaySlideQty)) {
			//Go to the parent DIV of root, then find the 'next' button DOM reference & finally add the disabled class.
			$(api.getRoot()).parent().find(next_btn).toggleClass(disabled_class);

			//Unbind the click event of 'next' button
			$(api.getRoot()).parent().find(next_btn).unbind('click');
		}
		else {
			//alert("hello");
			//Bind the click event of 'next' button
			$(api.getRoot()).parent().find(next_btn).unbind('click').bind('click', function (e) { e.stopPropagation(); api.next(); });
		}
	};

	function disableNextButton(api) {
		//Get the next button reference
		var next_btn = api.getConf().next;
		//Get the disabled class name
		var disabled_class = api.getConf().disabledClass;
		/*
		If the summation value of the index of starting tile in the set of visible 3 tiles and number of tiles to be displayed at once in a crousel is equal to the total number of 		tiles in the carousel, then there is no more tile to display. So then make the 'next' button disabled. Also click event is disabled for 'next' button. But if user clicks on 'prev', 
		then 'next' button is enabled and it is binded to click event again for moving to next tile
		*/
		if ((api.getSize() - 1) === (api.getIndex() + api.getConf().displaySlideQty)) {
			//Unbind the click event of 'next' button
			$(next_btn).unbind('click');
		}
	};

	function disableNextButtonClass(api) {
		//Get the next button reference
		var next_btn = api.getConf().next;
		//Get the disabled class name
		var disabled_class = api.getConf().disabledClass;

		if (api.getSize() === (api.getIndex() + api.getConf().displaySlideQty)) {
			$(next_btn).addClass(disabled_class);
		} else {
			$(next_btn).removeClass(disabled_class).unbind('click').bind('click', function (e) { e.stopPropagation(); api.next(); });
		}
	};

	//Display carousel text from image alt in the text area
	function displayCarouselText(index) {
		$("#live-tv-carousel-text").text($('.live-tv-scrollable p.image img').eq(index).attr("alt"));
	}

	/* Closes the overlay comes in a page */
	function closeOverLay(overlay) {
		if (overlay.css('display') == "block") {
			//Hide the overlay
			overlay.css('display', 'none');
		}
		return false;
	};

	/* product details page - product carousel 'Demo'. 'Tv Com' starts
	function showHoverImage(className, offsetValue) {
	$('body').prepend('<div class="' + className + '">');
	$('div.' + className).css({ 'top': offsetValue.top - 26, 'left': offsetValue.left + 2 });
	};

	function removeHoverImage(className) {
	$('body').find('div.' + className).remove();
	}; */

	function initCarousel() {

		//product-landing-csl
		$(".online-game-landing-carousel .scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.bottom-next',
			prev: '.bottom-prev',
			displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel
			initialIndex: 0,
			size: 4,
			onSeek: function (event, index) {
				//Access to the API 
				var api = $(".online-game-landing-carousel .scrollable").data("scrollable");
				//Call the function to set disable class on the 'next' button
				disableNextButtonClass(api);
			},
			onBeforeSeek: function (event, index) {
				//Access to the API 
				var api = $(".online-game-landing-carousel .scrollable").data("scrollable");
				//Call the function to disable the 'next' button
				disableNextButton(api);
			}
		});

		/* birth detail bottom */
		$(".scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.next',
			prev: '.prev',
			displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Number of tiles to be displayed at once in the carousel
				var displaySlideQty = 4;
				//Access to the API 
				var api = $(".scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableButtonNext(api, displaySlideQty, index);

			}
		});

		/* birth detail right section */
		$(".right-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.right-next',
			prev: '.right-prev',
			displaySlideQty: 1, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) { }
		});

		/* birth landing bottom section */
		$(".birthday-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.landing-bottom-next',
			prev: '.landing-bottom-prev',
			displaySlideQty: 3, // Number of tiles to be shown at a time in a carousel
			size: 3,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".birthday-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});

		/* playStage landing bottom section */

		if ($("#playStage-carousel div.items > div").length > 4) {

			$('.carousel_playTypes a.landing-bottom-prev, .carousel_playTypes a.landing-bottom-next').css('visibility', 'visible');

			$(".playStage-scrollable").scrollable({
				circular: false,
				keyboard: false,
				next: '.landing-bottom-next',
				prev: '.landing-bottom-prev',
				displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel
				size: 4,
				initialIndex: 0, onBeforeSeek: function () {
				}, onSeek: function (event, index) {

					//Access to the API 
					var api = $(".playStage-scrollable").data("scrollable");

					//Call the function to disable the 'next' button
					disableNextButtonClass(api);
				}
			});
		}

		/* online game landing bottom section */
		$(".online-game-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.bottom-next',
			prev: '.bottom-prev',
			displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Number of tiles to be displayed at once in the carousel
				var displaySlideQty = 4;
				//Access to the API 
				var api = $(".online-game-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableButtonNext(api, displaySlideQty, index);
			}
		});

		/* video landing bottom section */
		$(".video-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.bottom-next',
			prev: '.bottom-prev',
			displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Number of tiles to be displayed at once in the carousel
				var displaySlideQty = 4;
				//Access to the API 
				var api = $(".video-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableButtonNext(api, displaySlideQty, index);
			}
		});

		/* birth landing bottom section */
		$(".craft-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.landing-bottom-next',
			prev: '.landing-bottom-prev',
			displaySlideQty: 3, // Number of tiles to be shown at a time in a carousel
			size: 3,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".craft-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});

		/* craft detail right section */
		$(".right-bottom-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.right-bottom-next',
			prev: '.right-bottom-prev',
			displaySlideQty: 1, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) { }
		});

		/* craft detail bottom */
		$(".bottom-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.next',
			prev: '.prev',
			displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Number of tiles to be displayed at once in the carousel
				var displaySlideQty = 4;
				//Access to the API 
				var api = $(".bottom-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableButtonNext(api, displaySlideQty, index);
			}
		});

		/* online game detail bottom */
		$(".online-bottom-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.next',
			prev: '.prev',
			displaySlideQty: 5, // Number of tiles to be shown at a time in a carousel
			size: 5,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".online-bottom-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});

		/* Color detail bottom */
		$(".color-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.landing-bottom-next',
			prev: '.landing-bottom-prev',
			displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Number of tiles to be displayed at once in the carousel
				var displaySlideQty = 4;
				//Access to the API 
				var api = $(".color-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableButtonNext(api, displaySlideQty, index);
			}
		});

		/* Brand Carousels Starts - if more than one childs, then auto scroll carousel, else no carousel. - Bug: 1542251 */
		if ($(".brand-scrollable div.items div").length > 1) {

			var root = $(".brand-scrollable").scrollable({
				circular: true,
				keyboard: false,
				next: '.brand-next',
				prev: '.brand-prev',
				displaySlideQty: 1, // Number of tiles to be shown at a time in a carousel

				initialIndex: 0, onBeforeSeek: function () {
				}, onSeek: function (event, index) { }
			}).navigator().autoscroll({
				autoplay: true,
				interval: 4000
			});
			window.api = root.data("scrollable");
		}

		/* Brand Carousels Ends */

		/* landing page fp carousel starts here */
		$(".landing-right-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.landing-right-next',
			prev: '.landing-right-prev',
			displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel
			size: 4,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".landing-right-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});
		/*  landing page fp carousel ends here */

		$(".gallery-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.gallery-next',
			prev: '.gallery-prev',
			displaySlideQty: 7, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Number of tiles to be displayed at once in the carousel
				var displaySlideQty = 7;
				//Access to the API 
				var api = $(".gallery-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableButtonNext(api, displaySlideQty, index);
			}
		});

		/* Vertical Scrollbar -top right - in JOL_landing_FINAL */
		$(".vertical-right-scrollable").scrollable({
			vertical: true,
			keyboard: false,
			next: '.vertical-top-next1',
			prev: '.vertical-top-prev1',
			displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel
			size: 4,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".vertical-right-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});

		/* Vertical Scrollbar -bottom left - in JOL_landing_FINAL */
		var isFullWidth = $('#jolFullWidthCarousel').val();
		if (isFullWidth === 'true') {
			var qty = 6;
		} else {
			var qty = 4;
		}
		$(".vertical-left-scrollable").scrollable({
			vertical: true,
			keyboard: false,
			next: '.vertical-top-next',
			prev: '.vertical-top-prev',
			displaySlideQty: qty, // Number of tiles to be shown at a time in a carousel
			size: qty,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".vertical-left-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});

		/* Horizontal Scrollbar - bottom right - in JOL_landing_FINAL */
		$(".jol-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.jol-landing-bottom-next',
			prev: '.jol-landing-bottom-prev',
			displaySlideQty: 3, // Number of tiles to be shown at a time in a carousel
			size: 3,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".jol-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});

		/* Horizontal Scrollbar - bottom right - in JOL_landing_FINAL */
		$(".lnl-video-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.lnl-video-landing-bottom-next',
			prev: '.lnl-video-landing-bottom-prev',
			displaySlideQty: 5, // Number of tiles to be shown at a time in a carousel
			size: 5,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".lnl-video-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});

		/* Horizontal Scrollbar - bottom right - in JOL_landing_FINAL */
		$(".lnl-whatsnew-video-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.lnl-video-landing-bottom-next',
			prev: '.lnl-video-landing-bottom-prev',
			displaySlideQty: 2, // Number of tiles to be shown at a time in a carousel
			size: 2,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".lnl-whatsnew-video-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});



		/* Horizontal Scrollbar - bottom right - in JOL_landing_FINAL */
		$(".lnl-games-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.lnl-games-landing-bottom-next',
			prev: '.lnl-games-landing-bottom-prev',
			displaySlideQty: 5, // Number of tiles to be shown at a time in a carousel
			size: 5,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".lnl-games-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);

			}
		});


		/* Horizontal Scrollbar - bottom right - in JOL_landing_FINAL */
		$(".lnl-whatsnew-games-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.lnl-games-landing-bottom-next',
			prev: '.lnl-games-landing-bottom-prev',
			displaySlideQty: 2, // Number of tiles to be shown at a time in a carousel
			size: 2,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".lnl-whatsnew-games-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);

			}
		});


		/* Horizontal Scrollbar - bottom right - in JOL_landing_FINAL */
		$(".lnl-webisodes-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.lnl-webisodes-landing-bottom-next',
			prev: '.lnl-webisodes-landing-bottom-prev',
			displaySlideQty: 2, // Number of tiles to be shown at a time in a carousel
			size: 2,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".lnl-webisodes-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);

			}
		});


		/* Horizontal Scrollbar - bottom right - in FPBaby Apps */
		$(".lnl-apps-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.lnl-apps-landing-bottom-next',
			prev: '.lnl-apps-landing-bottom-prev',
			displaySlideQty: 5, // Number of tiles to be shown at a time in a carousel
			size: 1,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".lnl-apps-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);

			}
		});
		
		
		/* Horizontal Scrollbar - bottom right - in FPBaby Apps */
		$(".baby-apps-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.baby-apps-landing-bottom-next',
			prev: '.baby-apps-landing-bottom-prev',
			displaySlideQty: 5, // Number of tiles to be shown at a time in a carousel
			size: 1,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".baby-apps-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);

			}
		});		
		/* Horizontal Scrollbar - bottom right - in JOL_landing_FINAL */
		$(".lnl-apps .fpBaby-apps-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.lnl-apps .fpBaby-apps-landing-bottom-next',
			prev: '.lnl-apps .fpBaby-apps-landing-bottom-prev',
			displaySlideQty: 5, // Number of tiles to be shown at a time in a carousel
			size: 5,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".lnl-apps .fpBaby-apps-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);

			}
		});


		/* Horizontal Scrollbar - bottom right - in JOL_landing_FINAL */
		$(".lnl-whatsnew-apps-landing-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.lnl-apps-landing-bottom-next',
			prev: '.lnl-apps-landing-bottom-prev',
			displaySlideQty: 2, // Number of tiles to be shown at a time in a carousel
			size: 2,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".lnl-whatsnew-apps-landing-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);

			}
		});


		/*vertical scroll-bar in room to bloom blogs and videos page*/
		$("#blogsVideoCarosel").scrollable({
			vertical: true,
			keyboard: false,
			next: '.blogs-next',
			prev: '.blogs-prev',
			displaySlideQty: 2, // Number of tiles to be shown at a time in a carousel
			size: 2,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $("#blogsVideoCarosel").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});
		//Product Detail share your photo carousel
		$(".share-your-photo-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.share-your-photo-btn-next',
			prev: '.share-your-photo-btn-prev',
			displaySlideQty: 4, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Number of tiles to be displayed at once in the carousel
				var displaySlideQty = 4;
				//Access to the API 
				var api = $(".share-your-photo-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableButtonNext(api, displaySlideQty, index);
			}
		});

		//PopUp - Photo Carousel starts
		$(".share-your-photo-popup-scrollable").scrollable({
			circular: false,
			keyboard: false,
			next: '.share-your-photo-popup-btn-next',
			prev: '.share-your-photo-popup-btn-prev',
			displaySlideQty: 1, // Number of tiles to be shown at a time in a carousel

			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) { }
		});

		/* Thomas & Friends Track Layout */
		$(".thomas-track-layout-vertical-left-scrollable").scrollable({
			vertical: true,
			keyboard: false,
			next: '.vertical-top-next',
			prev: '.vertical-top-prev',
			displaySlideQty: 3, // Number of tiles to be shown at a time in a carousel
			size: 3,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {
				//Access to the API 
				var api = $(".thomas-track-layout-vertical-left-scrollable").data("scrollable");

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});
		/* little people live tv show starts here */
		$(".live-tv-scrollable").scrollable({
			circular: false,
			keyboard: false,
			easing: 'linear',
			next: '.live-tv-next',
			prev: '.live-tv-prev',
			displaySlideQty: 1, // Number of tiles to be shown at a time in a carousel
			size: 1,
			initialIndex: 0, onBeforeSeek: function () {
			}, onSeek: function (event, index) {

				//Access to the API 
				var api = $(".live-tv-scrollable").data("scrollable");

				//Displays carousel text ( Text is present in img alt tag)
				displayCarouselText(index);

				//Call the function to disable the 'next' button
				disableNextButtonClass(api);
			}
		});

		//For initial carousel image text display in the text box
		if ($(".live-tv-scrollable .items").children().length > 0) {

			//Access the API reference
			var api = $(".live-tv-scrollable").data("scrollable");

			//Get the initial index
			var initialIndex = api.getIndex();

			//If it is the first item
			if (initialIndex == 0) {

				//Display the text in the text box
				displayCarouselText(initialIndex);
			}
		}
		/* little people live tv show ends here */


	};

	function domReadyInit() {


	};

	function initAccordians() {
		$('#list1, #list2').accordion({
			alwaysOpen: false,
			autoheight: false,
			collapsible: true,
			active: false
		});

		$('#list1-subLevel, #list2-subLevel, #list3-subLevel, #list4-subLevel, #list5-subLevel, #list6-subLevel, #list7-subLevel, #list8-subLevel, #list9-subLevel, #list10-subLevel,  #list11-subLevel, #list12-subLevel, #list13-subLevel, #list14-subLevel, #list15-subLevel, #list16-subLevel, #list17-subLevel, #list18-subLevel, #list19-subLevel, #list20-subLevel').accordion({
			alwaysOpen: false,
			autoheight: false,
			collapsible: true,
			active: false
		});

		/* $('.sortByFilters').accordion({
		alwaysOpen: false,
		autoheight: false,
		collapsible: true,
		active: false
		});

		if (isBrandProductPage === true) {
		$('.navigation').accordion({
		alwaysOpen: false,
		autoheight: false,
		collapsible: true,
		active: false
		});
		}*/
	};

	function initTabs() {
		/* tabs in about us */
		$(".about-us-content .tabs").tabs(".about-us-content .pane", {
			onClick: function () {
				//console.log(this.getConf(), this.getCurrentPane(), this.getCurrentTab(), this.getIndex(), this.getPanes(), this.getTabs());
			}
		});
		/* Room to bloom Blogs and video page*/
		$(".blogsDescriptionContainer .tabs").tabs(".blogsDescriptionContainer .pane", {
			onClick: function () {
				//console.log(this.getConf(), this.getCurrentPane(), this.getCurrentTab(), this.getIndex(), this.getPanes(), this.getTabs());
			}
		});

		$(".playTime-guide-content .tabs").tabs(".playTime-guide-content .pane", { history: true });
		if ($('#jolAgeSpecificPage').length > 0) {
			var apiTabs = $(".playTime-guide-content .tabs").data("tabs");
			apiTabs.onClick(function (index) {
				tabIndex = apiTabs.getIndex();
				var tabObject = new Object();
				tabObject[0] = 'playstage';
				tabObject[1] = 'playtips'
				tabObject[2] = 'activities'
				tabObject[3] = 'helpful-info'
				window.location.hash = "#!/" + tabObject[tabIndex];
				adjustHeightJOLTabHeading();
			});
		}
	};

	function initScrollPanes() {
		$('.scroll-pane').jScrollPane({ showArrows: false });
		$('.scroll-pane1').jScrollPane({ showArrows: false });

		/* Scroll bar for find a product - age */
		$('.left-scroll-pane').jScrollPane({ showArrows: true });

		/* Scroll bar for find a retailer pop up starts */
		$('.popup-scroll-pane').jScrollPane({ showArrows: false });

		/* Scroll bar for find a retailer pop up starts */
		$('.result-scroll-pane').jScrollPane({ showArrows: false });
	};

	function initMisc() {
		$('.navLinks').each(function () {
			if ($(this).hasClass('activePage')) {
				$(this).next().css('display', 'block');
				if ($.browser.msie) {
					if ($.browser.version == 7.0) {
						$(this).next().css('display', 'inline-block');
					}
				}
			};
		});



		var footersize = $("#footer_site_map_content > .footer_column").size();
		var footerColumnObj = $("#footer_site_map_content > .footer_column");
		if (footersize == 5) {
			$('#footer_site_map_content').addClass("footer_col5");
			$(footerColumnObj).each(function (i) {
				$(this).addClass('column' + parseInt(i + 1));
			});
		}
		else if (footersize == 4) {
			$('#footer_site_map_content').addClass("footer_col4");
			$(footerColumnObj).each(function (i) {
				$(this).addClass('column' + parseInt(i + 1));
			});
		}
		else if (footersize == 3) {
			$('#footer_site_map_content').addClass("footer_col3");
			$(footerColumnObj).each(function (i) {
				$(this).addClass('column' + parseInt(i + 1));
			});
		}




		$('ul.nav-links li:last a,ul.nav_product_detail li:last a').css('background', 'none');
		$('.nav_bottom > ul > li:last').css('background', 'none');
		$('.nav_brand > ul > li:last').css('background', 'none');

		if ($('#openCreersTab').length > 0) {
			var api = $(".about-us-content .tabs").data('tabs');
			api.click(2);
		}

		if ($('#tabToOpen').length > 0) {
			var getTabValue = parseInt($('#tabToOpen').val());
			var api = $(".playTime-guide-content .tabs").data('tabs');
			api.click(getTabValue);
		}

		if ($('#sectionToAnchor').length > 0 && ($('#sectionToAnchor').val() !== '')) {
			getAnchorValue = "!" + $('#sectionToAnchor').val();
			getTCMUIROnLoad = $('#tcmId').val();
			if (getAnchorValue.indexOf('tcm:') === -1) {
				window.location.hash = "#" + getAnchorValue;
			} else {
				targetId = ".play-LearnTabContent .tab-column-left"
				ajaxURL = localInfo + "/Filter/GetPlayAndLearnActivityComponent?componentUri=" + getTCMUIROnLoad;
				//triggerAjaxCall(ajaxURL, targetId, 'playTimeGuide');
				triggerAjaxCall({
					ajaxURL: ajaxURL,
					targetId: targetId,
					onSuccessCallback: function () { return "playTimeGuide" }
				});
				$(targetId).html('').addClass('loading');
				window.location.hash = "#!/activities/" + getTCMUIROnLoad;
			}
		}

		// reduce the hight of the agefilter
		if (($('ul.filter-Age').length > 0) && ($("#endecaSearch").val() !== 'true')) {
			$('ul.filter-Age').parents('.jspContainer').css('height', '100px');
			$('ul.filter-Age').parents('.scroll-pane').css('height', '100px');
		}

		$('span.text').wrapInner('<span />');
		if ($.browser.msie && (parseInt($.browser.version, 10) == 7)) {
			$('span.text span').each(function () {
				getCharacterCount = $(this).html().length;
				if (getCharacterCount <= parseInt(14)) {
					$(this).css('padding-top', '8px')
				} else {
					$(this).css('padding-top', '2px')
				}
			});
		}

		getFiltersLength = $('.navigation .filter').length;
		if (getFiltersLength > 0) {
			$('.navigation .filter').last().css('border-bottom', '0px');
		}

		getScrollPaneLength = $('.left-scroll-pane').length;
		if (getFiltersLength === 1) {
			$('.left-scroll-pane').css('max-height', '800px');
			$('.left-scroll-pane').css('min-height', '500px');
		}

		// is isBrandPage the add class viewAllBrands for all the categories in the first <li>
		if (isBrandProductPage === true) {
			$('.navigation .filter').each(function () {
				getHTML = $(this).find('ul li:first').html().toLowerCase();
				if (getHTML === 'view all') {
					$(this).find('ul li:first').addClass('viewAllBrands');
				}
			});
		}

		//product page Mom quote 

		$("div.testimonial").each(function () {
			var currentObj = $(this);
			var header = currentObj.find('span.mom-quote-title');
			var authorName = currentObj.find('span.mom-quote-author');
			currentObj.find('h3').html(header.text());
			header.remove();
			currentObj.find('span.author-testimonial').html(authorName.html());
			authorName.remove();
		});

		// JOL age specific playStage Tab
		$('div.featureImg').each(function () {
			var currentObj = $(this).find('span');
			var currentObjHeight = currentObj.height();
			if (currentObjHeight <= 15) {
				$(currentObj).css('padding-top', '28px');
			} else if (15 < currentObjHeight <= 30) {
				$(currentObj).css('padding-top', '22px');
			} else if (currentObjHeight > 30) {
				$(currentObj).css('padding-top', '30px');
			}
		});

		// About us content height mid
		if ($('div.about-us-content').length > 0) {
			var aboutHeight = $('div.about-us-content .tab-column-left').height();
			var marginHeight = parseInt((aboutHeight / 2) - 70);
			$('div.about-us-content .middle-section').css("margin-top", marginHeight);
		}
		if ($('#AboutUsDetailPageView').length == 1) {
			if ($.browser.msie) {
				if ($.browser.version == 7.0) {
					$('html').addClass('ie7');
				}
			}
		}
		var brandElementsLength = parseInt($('#nav_Brands ul > li').length) - parseInt(2);
		var brandElementsCont = $('#nav_Brands ul');
		if (brandElementsLength === 3) {
			brandElementsCont.addClass('threeItems');
		}
		else if (brandElementsLength === 4) {
			brandElementsCont.addClass('fourItems');
		}
		else if (brandElementsLength === 2) {
			brandElementsCont.addClass('twoItems');
		} else if (brandElementsLength === 1) {
			brandElementsCont.addClass('oneItem');
		}

		var mylist = $('#SearchPageView .filter-category');
		var listitems = mylist.children('li:not(:.void)').get();
		listitems.sort(function (a, b) {
			return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
		})
		$.each(listitems, function (idx, itm) { mylist.append(itm); });

		window.stopHash = true;
		selectFilterFromHash();

	}; //initMisc ends

	function lightBoxinit() {
		// Home Page - Right section Video
		$('.home-video-image').live('click', function (event) {
			event.preventDefault();

			//Get the url to call
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				cache: false,
				success: function (data) {
					$('.displayHomeVideoOverlay').html(data);
					$('.displayHomeVideoOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, css: { position: 'absolute', top: '10%', left: '22%'} });
					$(document).scrollTop(0);
				}
			});

		});

		$("#Launch-Video").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '20%', left: '20%' }, bgClickToClose: false });
					$(document).scrollTop(0);
				}
			});

			//Call this function to load jquery.zclip.js, main.js and unbinding the click event
			shareEmbedEmail("#Launch-Video");
		});


		$("#Launch-Webisode").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.webisodeComponentOverlay').html(data);
					$('.webisodeComponentOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '20%', left: '20%' }, bgClickToClose: false });
					$(document).scrollTop(0);
				}
			});

			//Call this function to load jquery.zclip.js, main.js and unbinding the click event
			shareEmbedEmail("#Launch-Webisode");
		});

		$("#LaunchGame").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').show();

					var flashHeight = $('.displayComponentOverlay object').height();
					var flashWidth = $('.displayComponentOverlay object').width();

					var cb = $('.displayComponentOverlay object').attr('codebase');
					if (typeof cb !== 'undefined' && cb !== false) {
						if (cb.toLowerCase().indexOf('director') !== -1) {
							flashHeight = $('.displayComponentOverlay object').attr('height');
							flashWidth = $('.displayComponentOverlay object').attr('width');
						}
					}

					//var flashHeight = $('.displayComponentOverlay object').attr('height');
					//var flashWidth = $('.displayComponentOverlay object').attr('width');

					if ($('.displayComponentOverlay object object')) {
						if ($('.displayComponentOverlay object object').height() > $('.displayComponentOverlay object').height()) {
							flashHeight = $('.displayComponentOverlay object object').height();
						}
						if ($('.displayComponentOverlay object object').width() > $('.displayComponentOverlay object').width()) {
							flashWidth = $('.displayComponentOverlay object object').width();
						}
					}

					var windowWidth = $(window).width();
					var windowHeight = $(window).height();
					var flashRatio = flashWidth / flashHeight;
					var windowRatio = windowWidth / windowHeight;

					if (windowRatio > flashRatio) {
						if (windowHeight > flashHeight) {
							newFlashHeight = windowHeight * 0.88;
							newFlashWidth = newFlashHeight * flashRatio;
						}
						else {
							newFlashWidth = flashWidth;
							newFlashHeight = flashHeight;
						}
					}
					else {
						if (windowWidth > flashWidth) {
							newFlashWidth = windowWidth * 0.88;
							newFlashHeight = newFlashWidth / flashRatio;
						}
						else {
							newFlashWidth = flashWidth;
							newFlashHeight = flashHeight;
						}
					}
					if (newFlashWidth > 1132) {
						newFlashHeight = newFlashHeight * 1132 / newFlashWidth
						newFlashWidth = 1132;
					}

					$('.displayComponentOverlay object').width(newFlashWidth + 'px');
					$('.displayComponentOverlay object').height(newFlashHeight + 'px');
					if ($('.displayComponentOverlay object object')) {
						$('.displayComponentOverlay object object').width(newFlashWidth + 'px');
						$('.displayComponentOverlay object object').height(newFlashHeight + 'px');
					}
					$('.lightbox-top>div').width((newFlashWidth + 25) + 'px')
					$('.lightbox-content').width(newFlashWidth + 'px')
					$('.lightbox-content .modal-area .modal-area-content').height(newFlashHeight + 'px')
					$('.lightbox-bottom>div').width((newFlashWidth + 25) + 'px')
					/* Changed the value as the PopUp is going up the screen, there by cutting a part of it in IE & Chrome - Pulak */
					$('.displayComponentOverlay').jOverlay();
					$(document).scrollTop(0);
					//                    onlineGamesSetupGames();
				}
			});
		});

		$("#FavouritesVid").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').show();

					var flashHeight = $('.displayComponentOverlay object').height();
					var flashWidth = $('.displayComponentOverlay object').width();

					if ($('.displayComponentOverlay object object')) {
						if ($('.displayComponentOverlay object object').height() > $('.displayComponentOverlay object').height()) {
							flashHeight = $('.displayComponentOverlay object object').height();
						}
						if ($('.displayComponentOverlay object object').width() > $('.displayComponentOverlay object').width()) {
							flashWidth = $('.displayComponentOverlay object object').width();
						}
					}
					$('.displayComponentOverlay').jOverlay();
					$(document).scrollTop(0);
					//                    onlineGamesSetupGames();
				}
			});
		});


		$("#LaunchWhatsNew").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {

					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').show();

					var flashHeight = $('.displayComponentOverlay object').height();
					var flashWidth = $('.displayComponentOverlay object').width();

					if ($('.displayComponentOverlay object object')) {
						if ($('.displayComponentOverlay object object').height() > $('.displayComponentOverlay object').height()) {
							flashHeight = $('.displayComponentOverlay object object').height();
						}
						if ($('.displayComponentOverlay object object').width() > $('.displayComponentOverlay object').width()) {
							flashWidth = $('.displayComponentOverlay object object').width();
						}
					}

					var windowWidth = $(window).width();
					var windowHeight = $(window).height();
					var flashRatio = flashWidth / flashHeight;
					var windowRatio = windowWidth / windowHeight;

					if (windowRatio > flashRatio) {
						if (windowHeight > flashHeight) {
							newFlashHeight = windowHeight * 0.88;
							newFlashWidth = newFlashHeight * flashRatio;
						}
						else {
							newFlashWidth = flashWidth;
							newFlashHeight = flashHeight;
						}
					}
					else {
						if (windowWidth > flashWidth) {
							newFlashWidth = windowWidth * 0.88;
							newFlashHeight = newFlashWidth / flashRatio;
						}
						else {
							newFlashWidth = flashWidth;
							newFlashHeight = flashHeight;
						}
					}
					if (newFlashWidth > 1132) {
						newFlashHeight = newFlashHeight * 1132 / newFlashWidth
						newFlashWidth = 1132;
					}

					$('.displayComponentOverlay object').width(newFlashWidth + 'px');
					$('.displayComponentOverlay object').height(newFlashHeight + 'px');
					if ($('.displayComponentOverlay object object')) {
						$('.displayComponentOverlay object object').width(newFlashWidth + 'px');
						$('.displayComponentOverlay object object').height(newFlashHeight + 'px');
					}
					$('.lightbox-top>div').width((newFlashWidth + 25) + 'px')
					$('.lightbox-content').width(newFlashWidth + 'px')
					$('.lightbox-content .modal-area .modal-area-content').height(newFlashHeight + 'px')
					$('.lightbox-bottom>div').width((newFlashWidth + 25) + 'px')
					/* Changed the value as the PopUp is going up the screen, there by cutting a part of it in IE & Chrome - Pulak */
					$('.displayComponentOverlay').jOverlay();
					$(document).scrollTop(0);
					//                    onlineGamesSetupGames();
				}
			});
		});

		$(".experts").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '20%', left: '24%'} });
					createCurvyCorners(settingsLightBox_header, ".parenting-topic-popup .parenting-topic-header");
					createCurvyCorners(settingsLightBox_content, ".parenting-topic-popup .parenting-topic-content");
					$(document).scrollTop(0);
				}
			});
		});


		$(".fpbaby-articles-advice .article,.brand-site-fpbaby .article").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");
			//var getAnchorValue = "!" + $(this).attr("lighboxType");
			var getAnchorValue = $(this).attr("lighboxType");
			//var $article = $(this);

			// update hash
			hashSegments = window.location.hash.substr(1).split("&");
			parentCatCode = "", subCatCode = "", modelId = "", ParamView = "";
			var getHashValue = "";
			for (i = 0; i < hashSegments.length; i++) {
				pieces = hashSegments[i].split("=");
				if (pieces[0].toLowerCase() == 'pcat') {
					parentCatCode = pieces[1];
					getHashValue += pieces[0] + "=" + pieces[1] + "&";
				}
				if (pieces[0].toLowerCase() == 'scat') {
					subCatCode = pieces[1];
					getHashValue += pieces[0] + "=" + pieces[1] + "&";
				}
			}
			getHashValue = getHashValue + getAnchorValue;
			if (document.location.hash.substr(1).indexOf(getHashValue) == -1) {
				window.location.hash = "#" + getHashValue;
			}
			if ($.browser.msie) {
				if ($.browser.version == 7.0) {
					$(window).trigger('hashchange');
				}
			}
			// moved the AJAX call to hash change event
		});

		function FPBabyRemoveArticleHash() {
			// remove Article lightbox hash parameters
			hashSegments = window.location.hash.substr(1).split("&");
			var getHashValue = "";
			for (i = 0; i < hashSegments.length; i++) {
				pieces = hashSegments[i].split("=");
				if (pieces[0].toLowerCase() == 'pcat') {
					parentCatCode = pieces[1];
					getHashValue += pieces[0] + "=" + pieces[1] + "&";
				}
				if (pieces[0].toLowerCase() == 'scat') {
					subCatCode = pieces[1];
					getHashValue += pieces[0] + "=" + pieces[1] + "&";
				}
				if (pieces[0].toLowerCase() == 'modelid') {
					modelId = pieces[1];
				}
				if (pieces[0].toLowerCase() == 'paramview') {
					ParamView = pieces[1];
				}
			}
			$(".article[lighboxtype='modelId=" + modelId + "&ParamView=" + ParamView + "']:visible").removeClass("selected");
			if (getHashValue.length > 0) {
				getHashValue = getHashValue.substring(0, getHashValue.length - 1);
			}
			window.location.hash = "#" + getHashValue;
		}

		// Remove hash from url when FPBaby article lighbox is closed
		$('.fpbaby-article-popup #popup-close').live('click', function (event) {
			event.preventDefault();
			FPBabyRemoveArticleHash();
		});
		$(document).keydown(function (event) {
			if (event.keyCode == 27) {
				if ($(".fpbaby-articles-advice,.brand-site-fpbaby").length > 0) {
					FPBabyRemoveArticleHash();
				}
			}
		});

		$(".button-large-green").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '10%', left: '26%'} });
					/* Added for IE 7 curvy corner - JOL : 2months old : Got Play Tips popup */
					createCurvyCorners(settingsLightBox_header, ".letusknow-popup .letusknow-header");
					createCurvyCorners(settingsLightBox_content, ".letusknow-popup .letusknow-content");
					$(document).scrollTop(0);
				}
			});
		});

		$("#button-craft, .send-us-button,.forward-button,.button-craft, #ShowAdvice, #PhotoUpload, #share_button, .learn-more").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '10%', left: '18%'} });
					$(document).scrollTop(0);
				}
			});
		});

		$(".button-thomas").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').jOverlay({ color: '#8c8c8c', opacity: 0.9, zindex: '9999', bgClickToClose: false });
					$(document).scrollTop(0);
				}
			});
		});

		$("#find-retailerpopup").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '10%', left: '14%'} });

					if ($.browser.msie && (parseInt($.browser.version, 10) == 7 || parseInt($.browser.version, 10) == 8)) {
						createCurvyCorners(settingsLightBox_header, ".findretailer-header");
						createCurvyCorners(settingsLightBox_content, ".findretailer-content");
					}

					$(document).scrollTop(0);
					setTimeout(function () {
						$('.scroll-pane1').jScrollPane({ showArrows: false });
					}, 500);

				}
			});
		});

		//Let us know button in Online games detail page
		$("#LetusknoButon").live('click', function (event) {
			event.preventDefault();
			var popupurl = $(this).attr("rel");

			//Make the AJAX call to fetch the data & then call overlay to display popup
			$.ajax({
				url: popupurl,
				success: function (data) {
					$('.displayComponentOverlay').html(data);
					$('.displayComponentOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '10%', left: '26%'} });
					if ($.browser.msie && (parseInt($.browser.version, 10) == 7 || parseInt($.browser.version, 10) == 8)) {
						createCurvyCorners(settingsLightBox_header, ".letusknow-header");
						createCurvyCorners(settingsLightBox_content, ".letusknow-content");
					}
					$(document).scrollTop(0);
				}
			});
		});
	}; // lightBox ends


	$(".important-reward-button").live('click', function (event) {
		event.preventDefault();
		$('#product-happy-dialog-modal').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '10%', left: '18%'} });
		$(document).scrollTop(0);
	});

	// Pop up the lightbox on page load based on the Hash URL
	function initLightboxHashUrl() {

		// default lightbox url
		var ajaxUrl = localInfo + "/TridionPage/CreateLightBox?";

		// (FP Baby)
		if ($(".fpbaby-articles-advice,.brand-site-fpbaby").length > 0) {

			// get hash parameters
			hashSegments = window.location.hash.substr(1).split("&");
			parentCatCode = "", subCatCode = "", modelId = "", ParamView = "";
			for (i = 0; i < hashSegments.length; i++) {
				pieces = hashSegments[i].split("=");
				if (pieces[0].toLowerCase() == 'pcat') {
					parentCatCode = pieces[1];
				}
				if (pieces[0].toLowerCase() == 'scat') {
					subCatCode = pieces[1];
				}
				if (pieces[0].toLowerCase() == 'modelid') {
					modelId = pieces[1];
				}
				if (pieces[0].toLowerCase() == 'paramview') {
					ParamView = pieces[1];
				}
			}

			// close lightbox if it was opened.
			if (document.location.hash == "" || (modelId == "" && ParamView == "")) {
				$.closeOverlay();
				$('.displayComponentOverlay, .displayHomeVideoOverlay').html('');
				$('.article.selected').removeClass('selected');
			}
			// load article list
			if (parentCatCode != "" && subCatCode != "") {
				$('.accordians h3[data-parent-cat="' + parentCatCode + '"][data-sub-cat="' + subCatCode + '"]').not(".loaded").click();
			} else if (parentCatCode != "") {
				$('.accordians h3[data-parent-cat="' + parentCatCode + '"]').not(".loaded").click();
			}
			// load article detail lightbox 
			if (modelId != "" && ParamView == "_ArticleDetailLightBox") {
				//$(".article[lighboxtype='modelId=" + modelId + "&ParamView=" + ParamView + "']:visible").not(".selected").click();
				loadArticle(modelId, ParamView);
			}
		}
	}
	function loadArticle(modelId, ParamView) {
		var ajaxUrl = localInfo + "/TridionPage/CreateLightBox?";
		if (document.location.hash && document.location.hash.substr(1).indexOf('_ArticleDetailLightBox') != -1) {
			ajaxUrl += "modelId=" + modelId + "&ParamView=" + ParamView;

			$.ajax({
				url: ajaxUrl,
				success: function (data) {
					$('.displayComponentOverlay').get(0).innerHTML = data;

					// Call this function to initialize share button in the lightbox
					// Note: addthis doesn't work well with jOverlay, so this need to be called before jOverlay.
					ReinitializeAddThis();

					$('.displayComponentOverlay').jOverlay({ bgClickToClose: false, center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '20%', width: '100%'} });
					$(document).scrollTop(0);
					setTimeout(function () {
						$('.scroll-pane').jScrollPane({ showArrows: false, verticalGutter: 30 });
					}, 500);
				}
			});
		}
	}

	// anything to be executed when hash changes
	$(window).bind('hashchange', function (e) {
		if (window.addthis) {
			addthis.ost = 0;
			addthis.update('share', 'url', window.location.href); // new url
			addthis.update('share', 'title', window.document.title); // new title.
			addthis.ready(); // this will re-render the buttons.
		}
		initLightboxHashUrl();
		selectFilterFromHash();
	});

	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		if (results == null)
			return "";
		else
			return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	/* FP Autoclick for lightboxes and/or search criteria */
	function fpAutoClick() {
		$('#product-detail-carousel a[href="' + getParameterByName("lbopen") + '"] span').click();
		$('#dora-gym-product-detail-carousel a[href="' + getParameterByName("lbopen") + '"] span').click();
		$('a[href="' + getParameterByName("lbopen") + '"].important-reward-button').click();
	}



	/* FP Landing page Main carousel starts */
	function fpGetIntervalDuration(image_index) {
		wait_time = $('.landing-scrollable div.items a img:eq(' + image_index + ')').attr('wait-time');
	};

	function fpLandingMainCarousel(interval_value) {
		interval_value = $('.landing-scrollable div.items a img:eq(0)').attr('wait-time');
		//check if the interval value is supplied in the function. If not set 5000 as initial value
		if (typeof (interval_value) === 'undefined') {
			interval_value = 5000;
		}

		/*
		Carousel Plug-in will be attached only if more than one image is present, else it will be static.
		*/
		if ($(".landing-scrollable div.items a").length > 1) {

			// get access to the API
			var root = $(".landing-scrollable").scrollable({
				circular: true,
				keyboard: false,
				next: '.landing-next',
				prev: '.landing-prev'
			}).navigator().autoscroll({
				autoplay: false,
				interval: interval_value
			});
			window.api = root.data("scrollable");
		}
	};

	function initCustomFormElements() {
		$('input:checkbox').each(function () {
			if ($(this).is(':checked')) {
				$(this).parent().addClass('checked');
			}
			else if ($(this).is(':disabled')) {
				$(this).parent().addClass('disabled');
			}
			else {
				$(this).parent().removeClass('checked');
			}
		});
	}; // initCustomFormElements ends

	function initSubNav() {
		var localInfo = "/" + $('#locale').val();
		if ($('nav.nav_brand').length < 1) {
			return false;
		}
		var subnav_timeout = null;
		var subArr = ["products", "brands", "playtime", "games", "shops"];
		// Show Baby subnav menu for US
		if (localInfo.toLocaleLowerCase().indexOf("en_us") != -1) {
			subArr = ["products", "brands", "baby", "playtime", "games", "shops"];
		}
		$('body').prepend('<div id="sub-nav-curtain"></div><div id="sub-nav-wrap" class="gradient"><div id="sub-nav-brand" class="clearfix"></div></div>');
		$('.nav_brand li ul').each(function (i) {
			$(this).addClass(subArr[i] + '-sub').appendTo('#sub-nav-brand');
		});

		// Brand navigation hover menus:
		$('.nav_brand li').hoverIntent(function () {
			clearTimeout(subnav_timeout);
			var refToAnchorTag = $(this).children("a.navLinks");
			var refToSpan = $(this).children("span:first");
			var refToSub = $('#sub-nav-wrap').add('#sub-nav-curtain');
			$(this).addClass('hover-active');
			$(refToAnchorTag).addClass('active');
			$(refToSpan).css('display', 'block');
			$(refToSub).addClass('active');
			if ($.browser.msie) {
				if ($.browser.version == 7.0) {
					$(refToSpan).css('display', 'inline-block');
				}
			}
		}, function () {
			var refToAnchorTag = $(this).children("a.navLinks");
			var refToSpan = $(this).children("span:first");
			$(this).removeClass('hover-active');
			$(refToAnchorTag).removeClass('active');
			$(refToSpan).css('display', 'none');
			if ($(refToAnchorTag).hasClass('activePage')) {
				$(refToSpan).css('display', 'block');
			};
		});

		// Sub nav hover:
		$('#sub-nav-wrap').hover(function () {
			$(this).add('#sub-nav-curtain').addClass('active');
		}, function () {
			var self = $(this);
			subnav_timeout = setTimeout(function () { self.add('#sub-nav-curtain').removeClass('active'); }, 100);
		});

		// hide Babygear and Babytoys menu for US
		if (localInfo.toLocaleLowerCase().indexOf("en_us") != -1) {
			$('#sub-nav-brand ul.products-sub li#nav_Babygear').hide();
			$("#sub-nav-brand ul.products-sub li[id='nav_Baby Toys']").hide();
		}

	}; // initSubNav ends

	function initIntlCode() {
		if (($('body.it_it').length === 0) && ($('body.sv_se').length === 0) && ($('body.nn_no').length === 0) && ($('body.nb_no').length === 0) && ($('body.he_il').length === 0)) {//not to execute the below statement for it_it
			if ($('.nav_bottom > ul > li').length === 4) {
				$('.nav_bottom > ul > li').css('padding', '0 27px');
			}
		}
		if ($.browser.msie) {
			if ($.browser.version == 7.0) {
				if (($('#locale').val() !== 'en_us') && ($('.nav_bottom > ul > li').length === 4)) {
					$('span.games-arrow').css({
						'left': '120px'
					});
					$('span.product-arrow').css({
						'left': '80px'
					});
					$('span.brands-arrow').css({
						'left': '75px'
					});
					$('span.playTimeGuide-arrow').css({
						'left': '100px'
					});
				}
			}
		}
	}

	function adjustHeightJOLTabHeading() {
		$('div.subHeading1, div.subHeading2').each(function () {
			var currentObj = $(this).find('span');
			var currentObjHeight = currentObj.height();
			if (currentObjHeight > 24) {
				$(currentObj).css('padding-top', '0px');
			}
		});
	}

	// anything to be executed on load
	function init() {
		bindEvents();
		initCarousel();
		domReadyInit();
		//videoShareFlashTest();
		initAccordians();
		initTabs();
		initMisc();
		initScrollPanes();
		lightBoxinit();
		fpLandingMainCarousel();
		fpAutoClick();
		initCustomFormElements();
		initSubNav();
		initIntlCode();
		initLightboxHashUrl();
		updateLeftNav();
		try {
			checkFlashCookie();
		}
		catch (Exce)
        { }
	}
	return {
		init: init,
		adjustHeightJOLTabHeading: adjustHeightJOLTabHeading
	};
};

$(document).ready(function () {
    var mainComponent = new com.mattel.main();
    mainComponent.init();
});


$(window).load(function () {
    // run code 
    var mainComponentJOL = new com.mattel.main();
    mainComponentJOL.adjustHeightJOLTabHeading();

    if ($('#articleSearchPageType').length > 0) {
        $('.playtime-guide .accordians .sectionHeading > h3').each(function () {
            var h3height = $(this).height();
            if (h3height > 26) {
                $(this).css({ 'padding': '5px 10px 5px 30px', 'line-height': '1' })
            }
        });
    }
});


function selectFilter(a, hashKey, selectorClass, selectorCode) {
	if(a[0] == hashKey) {
		if(a[1] == "undefined") {
			a[1] = "";
		}
		$(selectorClass + ' li[' + selectorCode + '="' + a[1] + '"]').addClass('triggered');
		$(selectorClass + ' li:not(".click-active")[' + selectorCode + '="' + a[1] + '"]').trigger('click');
	}
}

function selectFilterFromHash() {
	var params = (window.location.hash.substr(1)).split("&");
	for (param = 0; param < params.length; param++)
	{
		var a = params[param].split("=");
		selectFilter(a, "age", ".filter-Age", "selector-code");
		selectFilter(a, "age", ".filter-Age", "pname");
		selectFilter(a, "cat", ".filter-category", "data-cat-code");
		selectFilter(a, "age", ".filter-Age", "categorycode");
		selectFilter(a, "cat", ".filter-category", "pname");
		selectFilter(a, "cat", ".filter-category", "categorycode");
		selectFilter(a, "brand", ".filter-brands", "data-brand-code");
		selectFilter(a, "brand", ".filter-brands", "categorycode");
		selectFilter(a, "brand", ".filter-brands", "pname");
		selectFilter(a, "dev", ".filter-development-stage", "categorycode");
		selectFilter(a, "sol", ".filter-solutions", "categorycode");
		selectFilter(a, "col", ".filter-collections", "categorycode");
		selectFilter(a, "typ", ".filter-type", "categorycode");
		selectFilter(a, "the", ".filter-themes", "categorycode");
		selectFilter(a, "the", ".filter-themes", "pname");
		selectFilter(a, "os", ".filter-os", "pname");
		if(a[0] == "viewAllProducts" && a[1] == "true") {
			$('#viewAllProducts.active').trigger('click');
		}
	}
	if(window.location.hash.substr(1) != "") {
		$('.click-active:not(".triggered")').trigger('click');
	}
}

