/*
The following scripts fire when the page is loaded.

If there are errors, wrap this entire script in $(document).ready(function(){  ... });
*/
var bodyEl = document.getElementsByTagName('body')[0];
var bodyId = bodyEl.id;
var bodyClass = bodyEl.className;

//written this way for performance boost over jQuery selectors.
function hasClass(el,value) { return el.className.indexOf(value) > -1; }

//Open overlay (layer in Fry lingo) using a link's href.
$(".openAjaxLayer").click(site.colorBoxHelper);
$(".openAjaxLayer").live("click", site.colorBoxHelper);

//Submit a form and stay in your overlay
if (hasClass(bodyEl,'checkout') > -1){
	$("form").find(".ajaxFormSubmit").live("submit", function(e){
		e.preventDefault();
		$.ajax({
			data:$(this).serialize(),
			url:$(this).attr("action"),
			type:$(this).attr("method") !== null ? $(this).attr("method") : "GET",
			success:function(data){
				site.updateOverlay(data);
			}
		});
		return false;
	});
}

//Close the layer
$(".closePopupLayer").live("click", function(e){
	e.preventDefault();
	$(this).closeLayer();
	return false;
});

// Search Form
$('#searchForm').submit(site.searchValidation);

//overlabels without validation
$("input.overlabel").each(site.overLabelLite.init);

//Validation Starts here
$("form").find("div.formFieldContainer:not(.checkRadio)").each(function() {
	overLabels.init($(this));
});

//Login validation onSubmit
$("#loginPanel").submit(function(evt){
	evt.preventDefault();
	var isValid = validate.fieldIsValid($('#loginPanel_userID'));
	if (isValid){
		isValid = validate.fieldIsValid($('#loginPanel_password'));
	}
	if (isValid) { this.submit(); }
	else { return false; }
});

/* Email signup */
$('#subscribeForm').live('submit', function(evt){
	evt.preventDefault();

	$('#subscribeForm input[name=emailOptionCheckbox]').each(function(i){
		$('#emailOptionTypes_'+i).val(this.checked ? 'true' : 'false');
	});

	site.callEmailSignup(evt);
});
$('#subscribeForm input[type=checkbox]').live('click',function(){
	$('#emailOptionTypes_'+this.value).val(this.checked ? 'true' : 'false');
});


//Main navigation menu
(function(){
	var navSelector = 'div.subNav';
	site.showNav = function(){ $(this).addClass('hover'); $(navSelector,this).animate({'height':'toggle','opacity':'toggle'},100); };
	site.hideNav = function(){ $(this).removeClass('hover'); $(navSelector,this).animate({'height':'toggle','opacity':'toggle'},200); };
	$("#siteHeaderNav").find("div.subNav").hide();
	$("#siteHeaderNav > ul > li").hoverIntent(site.showNav, site.hideNav);
	/* Multi Columns for Top Navigation Menu  */
	var currentSubCat = 0;
	$('#siteHeaderNav').find('.subNav').each(function() {
		var childCount = $(this).children().children().length;
		if (childCount > 20) {
			childCount = 19
		}

		var columnCount = Math.ceil(childCount / 10);
		var thisNavColumn = $(this).children('.navColumns');
		if (columnCount < 1 || childCount < 12) {
			columnCount = 1;
		}
		var divParent = $(this).parent();
		var divLink = divParent.children('a.root');
		var divLinkName = $.trim(divLink.html());
		var divWidth = (185 * columnCount) + 'px';

		$(this).css('width', divWidth);

		if (divLinkName == "Brands") {
			$(this).css('left', '-140px');
		}
		for (var i = 0; i < columnCount; i++) {
			var currentColumnId = currentSubCat + "_currentCol_" + i;
			var currentColumnTag = '<ul id=' + currentColumnId + ' style="float:left"></ul>';
			$(thisNavColumn).append(currentColumnTag);
		}
		$(this).children().each(function() {
			var kid = $(this);
			var theKids = $(this).children();
			var kidCount = $(this).children().length;
			var columntest = Math.ceil(kidCount / 10);
			var grandchildArray = [theKids];
			var currentSubColumn = 0;
			if (kidCount > 19) {
				kidCount = 19;
			}

			for (var i = 0; i < kidCount; i++) {
				if (i % 10 === 0 && i > 0 && kidCount != 10 && kidCount > 11) {
					currentSubColumn = currentSubColumn + 1;
				}
				currentColumnId = "#" + currentSubCat + "_currentCol_" + currentSubColumn;
				$(currentColumnId).append('<li>' + $(theKids[i]).html() + '</li>');
				if (i == 18) {
					$(currentColumnId).append('<li><h3><a href=' + divLink.attr('href') + '> See All ' + divLink.html() + '</a></h3></li>');
				}
			}

			currentSubCat++;

		});
	});
	$("ul.subNavFeed").remove();

	//Header currency menu
	$('#headerCart > div.currency > div.menu').menu({'mouseEvent':'click', 'subnavCss':'.body'});

	// hover over View Prices label in header
	var headerCartLabel = $("#headerCart").find("div.label");
	var labelHoverText = $(headerCartLabel).attr('data-currencyNote');
	headerCartLabel.append("<div>"+labelHoverText+"</div>");
	headerCartLabel.hoverIntent(
		function() { $(this).find("div").animate({opacity: "show", top: "20"}, "fast"); },
		function() { $(this).find("div").animate({opacity: "hide", top: "20"}, "fast"); }
	);

}());


//Home Page Banner Slider.
if (bodyId === 'home'){
	$('#cmsHomeMain .homeBanner').simpleRotator({'delay':10000});
}

/* START BASKET PAGE */
if (bodyId === 'basket'){
	if (!site.isShowCatalogCode) { site.isShowCatalogCode = (site.CatalogCode != ""); }
	if (!site.isShowGiftCert) { site.isShowGiftCert = (site.GiftCertificate != ""); }
	if (site.isShowGiftCert || site.GiftCertError) { site.ShowGiftCertificate(); }

	$("#promo-code-link").click(function(){ $("#promocodeblock").slideToggle("slow"); });
	$("#egift-code-link").click(function(){ $("#giftcertblock").slideToggle("slow"); });

	site.doAssignDefaultValue();

	$(".apply-egift-cert-button").click(site.ApplyEGiftCertificate);
	$(".apply-promotion-code-button").click(site.ApplyPromotionCode);
}
/* END BASKET PAGE */

/* thumbnail_entity (search subcats) swatch mouseovers */
if (bodyId === 'thumbnail'){
	$("div.productItem").find("span.swatch").mouseover(function() {
		var url = this.getAttribute('data-recoloredImage');
		if (!url) {
			return;
		}
		var swatchParent = $(this).parent('.info');
		var swatchTarget = $(swatchParent).siblings('.image').children().children('img');
		var mainImgSrc = $(swatchTarget).attr('src');
		if (!mainImgSrc) {
			return;
		}
		var positionA = mainImgSrc.indexOf("sheplers/");
		positionA = positionA + 9;
		var positionB = mainImgSrc.indexOf("?");
		var substringA = mainImgSrc.substr(0, positionA);
		var substringB = mainImgSrc.substr(positionB);
		var newString = substringA + url + substringB;
		$(swatchTarget).attr('src', newString);
	});
}



if (hasClass(bodyEl,'custserv')){
	/* Start Store Locator */
	$('#siteBody').find('.storeLocationAddress ul li strong').each(function(){
		if($(this).is(':contains("Super Store")')){
			var storeName = $(this).html();
			var storeNameSplit = storeName.split('Super Store');
			$(this).html(storeNameSplit[0] + '<span> Super Store</span>');
		}
	});
	/* End Store Locator */

	/* contact Us form load */
	$("#contactUsFrm").submit(function(){$('#contactUsFrm .buttonRow').html('<p><img src="/assets/images/common/loadinfo-horiz.gif"></p>');});
}

/*** Browse-path scripts ***/
if (hasClass(bodyEl, 'catalog')){

	// category Nav Boot Type and Skin
	$('#refinementContainer .refinementHeading').each(function(){
		if($(this).text() == "Style"){
			$(this).prepend('<a href="/custserv/custserv_popup.jsp?pageName=styleHelp" class="openAjaxLayer"><span id="helpStyle"></span></a>');
		}
		if($(this).text() == "Skin"){
			$(this).prepend('<a href="/custserv/custserv_popup.jsp?pageName=skinHelp" class="openAjaxLayer"><span id="helpSkin"></span></a>');
		}
	});

	//Recently-viewed panel
	(function(){
		var container = $("#recentlyViewedContainer");
		var body = container.find(".body");
		body.data('height', body.height());
		body.css({'visibility':'visible', 'height':0, 'opacity':0});
		$('.trigger', container).click(function(){
			if (body.height() === 0) {
				container.addClass('open');
				body.animate({ 'height':body.data('height'), 'opacity':1 }, 200,'swing');
			} else {
				body.animate({ 'height':0, 'opacity':0 }, 200,'swing', function(){ container.removeClass('open'); });
			}
		});

		//create thumbCarousel.
		container
			.thumbCarousel({'showAmount':3,'scrollAmount':3, 'scrollModifier':1})
			.click(function(evt){ evt.stopPropagation(); });
		//close panel when body is clicked.
		$('body').click(function(){ body.animate({ 'height':0, 'opacity':0 }, 200,'swing', function(){ container.removeClass('open'); }); });
		container.removeClass('open');

	})();

	//Left-nav functions
	// show refinement 'Narrow By' title if there are refinements
	if ($('#catalogNav .refinement').length > 0) {
		$('#catalogNav .refinementTitle').show();
	}

	//MORE menus in leftnav
	$('#catalogNav').find('a.moreRefinements').each(function(){
		var showingMoreRefinements = false;

		$(this).click(function(evt){
			evt.preventDefault();
			evt.stopPropagation();
			var self = $(this);
			var parentContainer = $(this.parentNode);


			if (parentContainer.find('div.body').length > 0){
				if (showingMoreRefinements) {
					parentContainer.find('div.body').hide();
					self.parent().removeClass('active');
					showingMoreRefinements = false;
				} else {
					parentContainer.find('div.body').show();
					self.parent().addClass('active');
					showingMoreRefinements = true;
				}
			} else {
				var refinementId = $(this).attr('rel');
				var moreHtml = "<ul>" + $(['#',refinementId].join("")).html() + "</ul>";
				var list = $(moreHtml).find('li');
				var firstColLen = (list.size() - list.size() % 2) / 2;
				if (firstColLen < list.size()/2) { firstColLen = firstColLen + 1 };
				var secondColLen = list.size() - firstColLen;
				var newHtml = $('<div class="body"><div class="closeMoreRefinements">Close</div><ul class="firstCol"></ul></div>');
				var firstColEl = $('ul.firstCol',newHtml);
				for (var i=0;i<firstColLen; i++){ firstColEl.append(list.get(i)); }
				newHtml.append('<ul class="secondCol"></ul>');
				var secondColEl = newHtml.find('ul.secondCol');
				for (var i=0;i<secondColLen; i++){ secondColEl.append(list.get(i+firstColLen)); }
				newHtml.appendTo(this.parentNode).hide().css('visibility','visible').show();
				self.parent().addClass('active');
				$('body').click(function(evt){
					newHtml.hide();
					self.parent().removeClass('active');
					showingMoreRefinements = false
				});
			}
		});
	});

	/* Product page */
	if (bodyId === 'product'){

		// Scene 7
		if (window.productImage) { productImage.imageProvider = "scene7"; }
		$('div.imageContainer').productImageZoom({/* see product.js for settings */});

		//Product Features panel
		(function(){
			var delayOpen = 500;
			var delayClose = 300;
			//Features container
			var fc = $('div.descriptionContainer').find('div.featuresContainer').css('display','block');
			var fcWidth = fc.width();

			//Features
			var fs = $('div.feature', fc);
			fs.each(function(){
				var self = $(this);
				self.data('width', self.width());
			});
			fs.animate({'width':0},delayClose, function(){ $(this).css('visibility','visible'); });

			//Feature List - Animate open on mouseover of feature icon.
			var fl = $('div.featuresList').find('img');
			fl.click(function(evt){

				fc.animate({width:fcWidth, opacity:1}, delayOpen, 'swing');
				var featureIconNum = $(this).index();

				fs.each(function(featureNum){
					if (featureNum != featureIconNum){ fs.eq(featureNum).animate({'width':0,'opacity':0},delayClose,'swing'); }
					else {
						if (fs.eq(featureNum).width() > 0){
							fs.eq(featureNum).animate({'width':0,'opacity':0},delayClose,'swing');
						} else {
							fs.eq(featureNum).animate({'width':fs.eq(featureNum).data('width'),'opacity':1},delayOpen,'swing');
						}
					}
				});
			});

			//Close functionality
			$('a.closeFeatures', fc).click(function(){
				fs.animate({'width':0,'opacity':0}, delayClose ,'swing', function(){ fc.css({'width':0}) });
			}).click();

			//Close on mouse out of area.
			$('div.options').mouseleave(function(){ $('a.closeFeatures', fc).click(); });
		})();

		//Tabs
		(function(){
			//Tabs for more product-related information
			var productComplementary = $('#productComplementary');
			var tabs = $('h2.tab', productComplementary);
			tabs.click(function(){
				var bodies = $('div.body', productComplementary);
				var self = $(this);
				var idx = self.index();
				var opened = false;
				bodies.not(bodies.get(idx)).hide(0, function(){
					if (!opened) {
						bodies.eq(idx).fadeIn();
						opened = true;
					}
				});
				tabs.addClass('closed');
				self.removeClass('closed');
			});
			productComplementary.show();
			// detect if #qa or #reviews or other tab name is in href.
			var hash = window.location.href.split("#");
			if (hash.length > 1){
				tabs.has('a[name='+hash[1]+']').click();
			} else {
				tabs.eq(0).click();
			}
		})();

		//Swatches
		(function(){
			//Swatch helpers  - filmstrip
			setTimeout(function(){
				var mainImageAttrs = filenameParser($('div.mainItem').find('div.productImage img').get(0).src);
				$('div.mainItem').find('ul.swatches img').each(function(){
					var swatchAttrs = filenameParser(this.src);
					if (mainImageAttrs.fileName == swatchAttrs.fileName){ $('div.mainItem').find('ul.swatches li').eq($(this).index()).click(); }
				});
				$('div.mainItem').find('ul.swatches li:has(img)').click(function(){

					var swatchAttrs = filenameParser($('img',this).get(0).src);
					var mainSrc = $('div.mainItem').find('div.productImage img').get(0).src;
					//change the main image.
					$('div.mainItem').find('div.productImage img').attr("src", filenameReplace(mainSrc, {'fileName':$(this).attr('recoloredimage')}));

					//update alt images.
					$("div.altImages").load("/catalog/includes/alt_images.jsp?productId="+$('#productForm input[name=productId]').val(),function(){

						productImage.createImageProvider(swatchAttrs, $(".zoomViewer").get(0));
						$('div.mainItem div.zoom').click(function(){ $('div.mainItem div.productImage img').click(); });

						var altImages = $("div.altImages li");
						var mainImageAttrs = filenameParser($('div.productImage').find('img').attr('src'));
						altImages
							.each(function(i){
								if (filenameParser($('img', altImages.eq(i)).attr('src')).fileName === mainImageAttrs.fileName){
									altImages.eq(i).addClass("active");
								} else {
									altImages.eq(i).removeClass("active");
								}
							})
							.click(function(){
								productImage.scene7ImageUpdate({'imageContainer':this});

								altImages.removeClass("active");
								$(this).addClass("active");

								$('ul.swatches img').each(function(){
									var swatchAttrs = filenameParser(this.src);
									var mainImageAttrs = filenameParser($('div.mainItem').find('div.productImage img').get(0).src);
								});

							});
					});
				});

				//Changing the color menu should select the swatch.
				$('div.COLOR_NAME select').change(function(){
					var name = $(this).val();
					var el = $(this);
					setTimeout(function(){
						el.closest('.VariantDropdownWithSwatchList').find('ul.swatches li[title="'+name+'"]').click();
					},11); //Widgets have a 10ms delay on the built-in click event.
				});

			}, 2000); //delay for widgets to load swatches.
		})();
	}
}


/* Store Locator */
$("#storeSearchButton").click(function() {
    clearErrors();
    if (submitGeoCodeForm(document.locateStoreForm)) {
        document.locateStoreForm.submit();
    }
    return false;
});



/*** START FILMSTRIPS ***/
switch (bodyId) {
	case 'category':
		$('div.filmstrip').thumbCarousel({'showAmount':4,'scrollAmount':4,'scrollModifier':1,'preload':4,'attachSwatches':true});
		break;
	case 'thumbnail':
		$('div.filmstrip').thumbCarousel({'showAmount':4,'scrollAmount':4,'scrollModifier':1,'preload':4});
		break;
	case 'section':
		$('div.filmstrip').thumbCarousel({'showAmount':4,'scrollAmount':4,'scrollModifier':1,'preload':5,'attachSwatches':true});
		break;
	case 'product':
		$('div.filmstrip').thumbCarousel({'showAmount':5,'scrollAmount':5,'scrollModifier':1,'preload':5,'attachSwatches':true});
		break;
	case 'basket':
		$('div.filmstrip').thumbCarousel({'showAmount':5,'scrollAmount':5,'scrollModifier':1,'preload':5,'attachSwatches':true});
		break;
}
/*** END FILMSTRIPS ***/



if (hasClass(bodyEl,'catalog')){
	(function(){
		var starWidth = false;
		$('div.bazaarVoice').each(function(){
			var $this = $(this);
			var $avg = $this.find('.bv_avg');
			var rating = parseFloat($avg.text());
			if (!starWidth) { starWidth = $this.find('.stars').width(); }
			var ratingWidth = 0;
			if (isNaN(rating)) {
				rating = 0;
				$avg.text('0');
			} else {
				ratingWidth = parseInt(starWidth * (rating / 5));
			}
			$this.find('.avg').width(ratingWidth);
		});
	}());
}



//Reset Credit Card fields for personal_info.jsp
if (hasClass(bodyEl,'personalInfo')){
	var select = $(document.addCardForm).find('div.type_ccExpire select');
	$(document.addCardForm).find('input#ccName, input#ccNumber').val('');
	select.val($('options:first', select).val());
}

/* Left Nav Show/Hide Refinement Section */
if (bodyId === 'category' || bodyId === 'thumbnail' || bodyId === 'search' ){
    $('#refinementContainer').delegate( "h3.refinementHeading","click", function(event){
        var headerParent = $(this).parent().attr('class');
        if(headerParent == "refViewState" || headerParent == "ErefViewState"){
            $(this).parent().attr('class', 'CrefViewState');
        }else{
            $(this).parent().attr('class', 'refViewState');
        }
    });
}

$('.recentlyViewedContainer').css('position','absolute');
