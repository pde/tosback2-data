//alert(oldQS);
// var oldQS is set on the page in php.  Is used in some functions
//setTimeout(checkCompareItems,1250);

$.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
});

//update the cart count when page is ready
$(document).ready(function(){

  if( $("#bannerRotator div.banners div").length > 1){
    $("#bannerRotator").scrollable({ vertical: true, circular: true, keyboard: false }).autoscroll(5000);
  }

	//update the cart count
	var baseUrl = "https:" == document.location.protocol?secureBase:base;
	$('#cartCountSpan').load(baseUrl+'cartCount.php');

	//Search Bar stuff
	$('#formSearch').submit(function(){ if($('#search').attr("value")=='' || $('#search').attr("value")=='Keyword, Item #'){return false;} s.doSearch(); });
	$('#search').blur(function(){ if($(this).attr("value")=='') $(this).attr("value",'Keyword, Item #');});
	$('#search').focus(function(){if($(this).attr("value")=='Keyword, Item #') $(this).attr("value","");});


	$('a[href=#top]').click(function(){
    $('html, body').animate({scrollTop:0}, 'slow');
    return false;
  });

	//if on a thumbnails page, initialize browser history stuff
	if ($('#thumbnails').length) {
		//$("div.thumbImageWrap").quickLookButton("testNarrow.php");
		$("div.thumbImageWrap").live('click',function(){
			window.location=$(this).find('a').attr('href');
		});
		//check to see if we have a right navbar
		var hasRightNav=$('#narrowOptions').length;

		//this runs when the hashtag changes
		$(window).bind( "hashchange", function(e) {
			//get current states from the hashtag
			// In jQuery 1.4, use e.getState( "url" );
			var page = $.bbq.getState( "p" ) || "1"; //page number
			var priceRange = $.bbq.getState( "pr" ); //price range
			var filters = $.bbq.getState( "f" ); //filters
			var sort = $.bbq.getState("s");
			var rows = $.bbq.getState("rows");

			// setup the url parameters
			var sendUrl=oldQS+'&page='+page;
			if (sort!=undefined){
				sendUrl+="&sort="+sort;
				switchSortOption('sort'+sort);
				if($('input[name=sortSelect]:checked').val() != sort){
					$('input[name=sortSelect][value="'+sort+'"]').attr('checked', true);
				}
			}
			if (priceRange!=undefined){sendUrl+="&priceRange="+priceRange;}
			if (filters!=undefined){sendUrl+="&filters="+filters;}
			if (rows!=undefined){sendUrl+="&rowsShown="+rows;}

			//make the ajax calls
			$('#thumbnails').fadeTo('fast','0.2',function(){
				$.post(baseUrl+'ajaxThumbHandler.php', sendUrl+'&data=thumbs', function(data){
				if(data.indexOf("doRedirect")>-1){
					redirect=data.substr(11,data.length);
					//alert(redirect);
					document.location.href=redirect;
				}
				else{
					$('#thumbnails').html(data);
					$('#thumbnails').fadeTo('fast','1');
					//$("div.thumbImageWrap").quickLookButton("testNarrow.php");
					
					// Display the ql Button
					$('.qlPLPButton, .qlCartButton').css({visibility:'visible'});
					
					equalHeight('#sidebar','#content');
					//alert($('#narrowOptions:in-view'));
					if(rows!='all' && !elementInViewport('#narrowOptions') ){
						$('html, body').animate({scrollTop:0}, 'slow');
					}
				}
			})});
			$('.pagingOptions').load(baseUrl+'ajaxThumbHandler.php?'+sendUrl.replace(/ /g,'%20')+'&data=paging');
			if(hasRightNav){
				$('#narrowOptions').load(baseUrl+'ajaxThumbHandler.php?'+sendUrl.replace(/ /g,'%20')+'&data=fullRightNav');
			}

		});

		if($.bbq.getState( "p" ) != undefined){
			$(window).trigger( "hashchange" );
		}

	}

	if ($('#narrowOptions').length) {
		$(".narrowHeading").live('mouseover mouseout', function(event) {
			if (event.type == 'mouseover') {
				if($(this).parents(".narrowGroup").find(".narrowSelected ul li").length==0){
						$(this).addClass("narrowHover");
				}
			} else {
				$(this).removeClass("narrowHover");
			}
		});

		$(".narrowChoices li").live('click',function(){
			if($(this).hasClass('priceOption')){
				changePriceRange($(this).find('a:first').attr('href'));
			}
			else{
				addFilter($(this).text());
			}
		});

		//$("select.narrowChoices").live('change',function(){
		//	if($(this).hasClass('priceOption')){
		//		changePriceRange($(this).val());
		//	}
		//	else{
		//		addFilter($(this).text());
		//	}
		//});

		$(".narrowSelected li").live('click',function(){
			if($(this).hasClass('priceOption')){
				changePriceRange('none');
			}
			else{
				removeFilter($(this).text());
			}
		});
	}

	if ($('.swatchSlider').length) {
		$(".swatchSlider").scrollable();
	}
	//$("#detailImagePopUp").dialog({
	//					modal: true,
	//					width: 600,
	//					position: 'center',
	//					autoOpen: false
	//});
	//$("#detailTabs").tabs();

	$("#detailImagePanel a[rel]").overlay({ mask:{ color: '#cccccc' }, top:'center', fixed:false });
	$("ul.css-tabs").tabs("div.css-panes > div");

	$("#gcAmount").change(function(){
			var dollarAmount=$(this).val();
			$("#price").html(dollarAmount);
		});

	//$("#addToCartButton").button({ icons: {primary: "ui-icon-locked"}});
	$("#detailOrderForm").live('submit',function(){
		$("#ajaxForm").val("1");
		var popUpElem = $('#addPopUp');
		popUpElem.html(" ").activity( { color: "#fff"}) ;
		if ( popUpElem.data("overlay") ){
			popUpElem.data("overlay").load();
		}
		else{
			popUpElem.overlay({
				mask:{ color: '#cccccc' },
				top: 'center',
        fixed:false,
				load: true
			});
		}
		$.post("detail.php", $("#detailOrderForm").serialize(), function(data){
			//alert(data);
				popUpElem.activity(false);
				responseAction = $(data).find('action').text();
				if( responseAction == 'redirect'){
					window.location = $(data).find('content').text();
				}
				else{
					popUpElem.html($(data).find('content').text());
					$('#cartCountSpan').load(baseUrl+'cartCount.php');
				}
			});

		return false;
	});


	// QuickLook - jxj4280
	window.QUICKLOOK_INITED = false;
	
	$('.thumbnail').live({
        mouseenter:
           function()
           {
						var theButton = $('.quickLookBtnCon',this);
								//console.log(theButton)
								theButton.show();
           },
        mouseleave:
           function()
           {
						var theButton = $('.quickLookBtnCon',this);
						//console.log(theButton)
						theButton.hide();
           }
       }
    );

	$('.qlPLPButton, .qlCartButton').css({visibility:'visible'}).live('click',function(e) {
		e.preventDefault();
		var theUrl = this.href;

		// This will help ensure that the elements we need are on the page.
		// QuickLook Overlay
		var $qlOverlay  = $('#qlOverlay');
		if ($qlOverlay.length == 0) {
			$('body').append('<div id="qlOverlay" class="overlay"><div id="qlOverlayContent"></div></div>');
			var $qlOverlay  = $('#qlOverlay');
		}
		
		// Clear the contents.
		$qlOverlay.find('#qlOverlayContent').html('');
		
		// Add to Cart post submit overlay
		if ($('#addPopUp').length == 0) {
			$('body').append('<div id="addPopUp" class="overlay suggestionsPopUp" ></div>');
		}
		
		// The QuickLook Element
		$(this).overlay({
				target:'#qlOverlay',
				mask:{ color: '#cccccc' },
				top: 'center',
				fixed: false,
				load: true,
				onBeforeLoad: function() {
					// grab wrapper element inside content
					var wrap = this.getOverlay().find("#qlOverlayContent");
					// load the page specified in the trigger
					wrap.find("#qlOverlayContent").html('');
					wrap.load(theUrl, function(){
						
						// Attach the tab functionality - Needs to be done for each load of the overlay
						$("ul.css-tabs",'#qlOverlay').tabs("div.css-panes > div");
						
						// Attach the Swatch slider
						if ($('.swatchSlider','#qlOverlay').length) {
							$(".swatchSlider",'#qlOverlay').scrollable();
						}
						
						// Some events can be attached a single time. Put them here.
						if (!window.QUICKLOOK_INITED) {
							window.QUICKLOOK_INITED = true;

							// Add to cart Overlay
							$("#qlDetailOrderForm").live('submit',function(){
								var hasQty = parseInt($('#qlQty').val(),10);
								if (!hasQty || hasQty<=0) {
									alert('You must specify a quantity.');
									return false;
								}
								
								// Check upsell qty if needed
								var $upsellCon = $('.upsellContainer','#qlOverlayContent');
								if ($upsellCon.length>0 && $('.rugPadTypeSelector',$upsellCon).val() != '') {
									var hasQty = parseInt($('.rugPadQty',$upsellCon).val(),10);
									if (!hasQty || hasQty<=0) {
										alert('You must specify a quantity for the rug pad.');
										return false;
									}
								}
								
								$.mask.getMask().css({display:"none"});
								$("#qlAjaxForm").val("1");
								var popUpElem = $('#addPopUp');
								popUpElem.html(" ").activity( { color: "#fff"}) ;
								if ( popUpElem.data("overlay") ){
									popUpElem.data("overlay").load();
								}
								else{
									
									popUpElem.overlay({
										mask:{ color: '#cccccc'},
										top: 'center',
                    fixed: false,
										load: true
									});
								}
								
								$.post("detail.php", $("#qlDetailOrderForm").serialize(), function(data){
										popUpElem.activity(false);
										responseAction = $(data).find('action').text();
										if( responseAction == 'redirect'){
											window.location = $(data).find('content').text();
										}
										else{
											popUpElem.html($(data).find('content').text());
											$('#cartCountSpan').load(baseUrl+'cartCount.php');
										}
									});
								return false;
							}); // Add-to-cart

							// Gift Card change
							$('#qlGcAmount','#qlOverlay').live('change',function(){
								$("#qlPrice").html($(this).val());
							});
							
							// Clicking thumbnail swaps the larger image
							$('.qlAlternateViewImage img', '#qlOverlay').live('click',function(){
								changeQLLargeImage(this.src);
							})
							
							// Hovering of a Swatch changes name above swatch group 
							$('.swatchImg', '#qlOverlay').live({
								mouseenter:function(){
									var $this = $(this);
									$this.parents('.qlSwatchBox').find('.swatchDescription').html($this.attr('title'));
								},
								mouseleave:function(){
									var $this = $(this);
									$this.parents('.qlSwatchBox').find('.swatchDescription').html('&nbsp;');
								}
							});
							
							// Attach Swatch click events
							$('#qlSwtachBox_one .swatchImg', '#qlOverlay').live('click',function(){
								qlSwatchClick(window.QLData.parentID,$(this).attr('hdc-spec'),$('#qlSpecTwo').val());
							});
							$('#qlSwtachBox_two .swatchImg', '#qlOverlay').live('click',function(){
								qlSwatchClick(window.QLData.parentID,$('#qlSpecOne').val(),$(this).attr('hdc-spec'));
							});
							// Attach Selectbox change events.
							$('#qlSpecOne', '#qlOverlay').live('change',function(){
								qlSwatchClick(window.QLData.parentID,$(this).val(),$('#qlSpecTwo').val());
							});
							$('#qlSpecTwo', '#qlOverlay').live('change',function(){
								qlSwatchClick(window.QLData.parentID,$('#qlSpecOne').val(),$(this).val());
							});
							
							// Wishlist link
							$('#qlWishListLink').live('click',function(){
								e.preventDefault();
								if (document.qlDetailOrderForm.quantity.value == 0)
								{
									alert('Please enter a quantity before adding this item to your Wish List.');
									return false;
								}
								$('#qlWishList').val('1');
								//$('#qlDetailOrderForm').die('submit.ql_ajax');
								document.qlDetailOrderForm.submit(); // This appears to by-passes the jQuery Event.
								return false;
							});

							//Edit Item Button
							$('#qlEditCart','#qlOverlay').live('click',function(){
								e.preventDefault();
								$('#qlDetailOrderForm').submit();
								return false;
								});
							
							
						}
					});
					
				},
				onLoad: function () { $('#qlOverlay').data("overlay",this) }
			});
		return false;
	});
	
	/* Rugpad Addon/Upsell */
	$(document).on('change','.upsellContainer .rugPadTypeSelector', function(){
		var $context = $(this).parentsUntil('.upsellContainer');
		rugPad_PopulateSizes($context);
	}); // '.upsellContainer .rugPadTypeSelector' change
	
	$(document).on('change','.upsellContainer .rugPadSelector', function(){
		var $context = $(this).parentsUntil('.upsellContainer');
		rugPad_PopulatePrices($context);
	}); // '.upsellContainer .rugPadSelector' change
	
}); // End doc.ready()

//Need this to load after whole page is loaded to take into account image sizes in Chrome
$(window).bind("load", function() {
  if ($('#sidebar').length) {
		equalHeight('#sidebar','#content');
	}
});


var handleFailure = function callBack(o) {
	if (!redirected){
		//alert('failure');
	}
	return true;
}
//*********END callback information

//*********Detail Page ajax functions
function swatchClick(item,spec1,spec2){
	//alert("spec="+spec+"|item="+item+"|");
	$('#detailMain').fadeTo('slow','0.2',function(){
		$.get('detailRequest.php', {'item': item, 'spec1': spec1, 'spec2': spec2, 'outletFlag': outletFlag}, function(data){
				$('#detailImagePanel').html($(data).find('image').text());
				$('#productOrderForm').html($(data).find('orderForm').text());
				$('#detailCopy').html($(data).find('productCopy').text());
				$('#longDesc').html($(data).find('longDesc').text());
				$('#productSpecs').html($(data).find('productSpecs').text());
				changeLargeImage($(data).find('largeImage').text());
				var backOrderDays = $(data).find('backOrderDays').text();
				$('#detailMain').fadeTo('fast','1');
				lpSendData('page','backOrderDays',backOrderDays);
				$("#detailImagePanel a[rel]").overlay({ mask: { color: '#cccccc' }, top:'center', fixed:false });
		})
	});
	return false;
}


//**********END detail page ajax

//**********Thumbnail page Ajax

function showAllOptions(divToChange,sendUrl, typeDesc){
	sendUrl+='&typeDesc='+typeDesc+'&data=oneRightNav&hide=false';
	$.post('ajaxThumbHandler.php', sendUrl, function(data){ $('#'+divToChange).html($(data));});
}

function hideExtraOptions(divToChange,sendUrl){
	typeDesc=divToChange.substring(0,divToChange.length-3);
	typeDesc = typeDesc.replace(/&/g,"%26");
	typeDesc = typeDesc.replace(/_/g," ");
	sendUrl+='&typeDesc='+typeDesc+'&data=oneRightNav&hide=true';
	$.post('ajaxThumbHandler.php', sendUrl, function(data){ $('#'+divToChange).html($(data));});
}

function addFilter(newFilter){
	var filters = $.bbq.getState( "f" );
	if(filters===undefined){filters=newFilter;}
	else{filters+=','+newFilter;}
	$.bbq.pushState({'p': '1', 'f':filters});
}

function removeFilter(rmFilter){
  rmFilter = rmFilter.replace(/\\/g,"");
	rmFilter = rmFilter.replace(/\+/g," ");
	rmFilter = rmFilter.replace(/"/g,"%22");
	rmFilter = rmFilter.replace(/&/g,"%26");
	rmFilter = rmFilter.replace(/'/g,"%27");
	var currentFilter = $.bbq.getState( "f" );
  var pattern = new RegExp(rmFilter, "i");
  var compattern = new RegExp(",,");
  currentFilter = currentFilter.replace(/\+/g, " ");
  currentFilter = currentFilter.replace(pattern, "");
  currentFilter = currentFilter.replace(compattern, ",");
	if (!currentFilter || currentFilter==","){
		$.bbq.removeState('f');
	}
	else{$.bbq.pushState({'p': '1', 'f':currentFilter});}
}

function getThumbsPage (sendUrl){
	$.post('ajaxThumbHandler.php', sendUrl+'&data=thumbs', function(data){ $('#thumbnails').html($(data));});
	$.post('ajaxThumbHandler.php', sendUrl+'&data=paging', function(data){ $('.pagingOptions').html($(data)); });
}

function changeNumRows(rows){
	$.bbq.pushState({'p': '1', 'rows': rows});
}

function resort(){
	sortOption =$('#sortSelect').val();
	$.bbq.pushState({'p': '1', 's': sortOption});
}
function changeThumbPage(page){
	$.bbq.pushState({ 'p': page });
}

function changePriceRange(priceRange){
	if(priceRange=='none'){$.bbq.removeState('pr');}
	else{$.bbq.pushState({ 'p': '1', 'pr': priceRange });}
}
function createPriceRange(high, low){
	priceRange=pad(high,'0',4).concat(pad(low,'0',4));
	changePriceRange(priceRange);
}
function pad(charString, padChar,stringLength){
	returnString = "";
	charsToAdd = stringLength - charString.length;
	if(charsToAdd < 0){returnString = charString.substr(0,charString);}
	else{
		for(x=0;x<charsToAdd;x++){
			returnString+=''+padChar;
		}
		returnString+=''+charString;
	}
	return returnString;
}
//************************************

//**** RUG Finder functions **********
//var handleSuccessCount = function callBack(o) {
//	//alert(o.argument[0]);
//	response = o.responseText;
//	document.getElementById("searchResultCount").innerHTML = response;
//}
//var countCallback={ success:handleSuccessCount,
//										failure:handleFailure
//	}


function calculateSearchResults(formObj,classId){
	sendUrl = "classId="+classId;
	defDesc = Array();
	count = 0;
	for(x=0;x<formObj.elements.length;x++){
		if(formObj.elements[x].type=="select-one" && formObj.elements[x].value!=""){
			defDesc[count]=formObj.elements[x].value;
			count++;
		}
	}
	sendUrl+="&defIds="+defDesc;
	sendUrl+="&data=resultCount";
	//alert(sendUrl);
	$('#searchResultCount').load('ajaxThumbHandler.php?'+sendUrl.replace(/ /g,'%20'));
}

function searchRugs(formObj){
	defDesc = Array();
	for(x=0;x<formObj.elements.length;x++){
		if(formObj.elements[x].type=="select-one" && formObj.elements[x].value!=""){
			defDesc[count]=formObj.elements[x].value;
			count++;
		}
	}
	if(defDesc.length > 0){
		document.location=base+"rugThumbs.php?classification=7&defDesc="+defDesc+"&rugFinder";
	}
}

//**********Quick Order page Ajax

function updateBaseIdDetails(sku){
	$.post(base+'quickOrderAjax.php', {'sku': sku}, function(data){
		sku = $(data).find('sku').text();
		ohQty = $(data).find('qty').text();
		price = $(data).find('price').text();
		retailPrice = $(data).find('retailPrice').text();
		priceBreak = $(data).find('priceBreak').text();
		inv7 = sku.substr(0,7);
		change = price.substr(-3);
		if(change==".00"){price = price.substr(0,(price.length-3) );}
		change = retailPrice.substr(-3);
		if(change==".00"){retailPrice = retailPrice.substr(0,(retailPrice.length-3) );}
		if(priceBreak=="1" && price!=retailPrice){
			price = "<span style=\"text-decoration:line-through;\">$"+retailPrice+"</span>"
							+"<span style=\"color:#CC0000;\">$"+price+"</span>";
		}
		else{price = "$"+price;}
		//if(document.getElementById(inv7+"qty")){document.getElementById(inv7+"qty").innerHTML = ohQty;}
		//document.getElementById(inv7+"price").innerHTML = price;
		if($('#'+inv7+"qty").length){$('#'+inv7+"qty").html(ohQty);}
		$('#'+inv7+"price").html(price);
	});

}
//***************

function createWelcomePanel(popUpDiv,width,timeOutSeconds,cookieName){
	if(cookieName){ var panelCookie = new Cookie(document, cookieName,"","",".homedecorators.com");}
	popUp = new YAHOO.widget.Panel(popUpDiv, {
    close:true,
    draggable: false,
    zindex:4,
    modal: true,
    visible: false,
    width:width,
    fixedcenter:true} );
  popUp.render(document.body);
	if(!panelCookie.load()){
		popUp.show();
		if(cookieName){
			panelCookie.value=1;
			panelCookie.store();
		}
		if(timeOutSeconds>0){
			setTimeout("popUp.hide()",timeOutSeconds*1000);
		}
	}
}

$.fn.quickLookButton = function(url) {
    return this.hover(function(e) {
				var $el = $(this);
				var parentEl=$(this).parents(".thumbnail");
				var title=parentEl.find(".thumbDetails a.itemDesc").text();
				var sku=parentEl.find(".thumbPopSku").text();

        var $tempButton = $("<a />", {
            "href": "#",
            "text": "Quick Look",
            "class": "qlButton",
            "css": {
								"position":"absolute",
								"bottom":"35px",
								"left": "55px"
            }
        }).button().click(function(){  //.appendTo($el);

					$("#quickLook").dialog({
						modal: true,
						draggable: false,
						resizable: false,
						//width: 600,
						//height: 200,
						title: title,
						open: function(){
							$("#quickLook").html(sku);
						}
					});
					return false;
				});

				$tempButton.appendTo($el);

    }, function(e) {
        $(".qlButton").fadeOut("fast", function() {
            $(this).remove();
        });

		});

	}

function detailPop(){
	$("#detailImagePopUp").dialog("open");
	return false;
}

function changeLargeImage(imgSrc){
	$(".detailImagePop").each(function(){
		$(this).attr("src",imgSrc);
	});
	return false;
}

function equalHeight(container1, container2){
	var el1 = $(container1);
	var el2 = $(container2);
	el1.height("");
	el2.height("");
	var height1 = el1.height();
	var height2 = el2.height();
	if (height1 < height2){
		el1.height(height2);
	}
	else{el2.height(height1);}
}

$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });
}


function elementInViewport(element) {
	var $element = $(element);
	var offset = $element.offset();

	var $window = $(window);
	var windowTop = $window.scrollTop();
	var threshold = 10;

	if (offset.top - threshold < windowTop) {
			if (offset.top + $element.height() + threshold >= windowTop) {
					// top edge below the window's top
			} else {
					return false;
			}
	} else {
			if (offset.top - threshold <= windowTop + $window.height()) {
					// bottom edge above the window's bottom
			} else {
					return false;
			}
	}

	var windowLeft = $window.scrollLeft();

	if (offset.left - threshold < windowLeft) {
			if (offset.left + $element.width() + threshold >= windowLeft) {
					// left edge be on the left side of the window's left edge
			} else {
					return false;
			}
	} else {
			if (offset.left - threshold <= windowLeft + $window.width()) {
					// right edge be on the right side of the window's right edge
			} else {
					return false;
			}
	}

	return true;

}


/* Quicklook - jxj4280 */
function changeQLLargeImage(newSrc) {
	document.getElementById('qlLargeImage').src=newSrc;
}

function qlSwatchClick(item,spec1,spec2){
	var theProp = item+''+spec1+''+spec2;
	var notAvailableStatus = ["N/A","DISCONTINUED","SOLD OUT"];

	var _updateQuickLook = function(d) {
		var addToCartTweaker = 'visible';
		if ($.inArray(d.stockStatus.toUpperCase(),notAvailableStatus)!=-1) {
			addToCartTweaker = 'hidden';
		}

		$('#qlOverlayContent','#qlOverlay').fadeTo('slow','0.2',function(){
			
			$('#qlLargeImage','#qlOverlay').attr('src',d.largePic).attr('alt',d.name+' #'+d.sku10+' #'+d.sku8+' #'+d.sku7+' #'+d.sku5);
			/*
			altViewImgs = [];
			for (var i=0,l=d.images.length;i<l;i++) {
				altViewImgs[i] = '<div class="qlAlternateViewImage"><div class="qlAlternateViewImageWrap wraptocenter"><img src="'+d.images[i].img+'" width="90" alt="'+d.images[i].type+'" /></div></div>'
			}
			$('#qlAlternateViews','#qlOverlay').html(altViewImgs.join('\n'));*/
			$('#qlAlternateViews','#qlOverlay').html(d.altView);
			$('#qlProductOrderForm','#qlOverlay').html(d.optionsHtml);
			$('.detailCopy','#qlOverlay').html(d.productCopy);
			$('#qlOverlayContent').fadeTo('fast','1');
			$('.qlProductLink').attr('href',d.productLink);
			$('#qlAddToCartImg').css('visibility',addToCartTweaker);
			$('.qlProdName').html(d.name);
			//$('#qlReviewImg').attr('src',d.ratingImg);
		});
	};
	
	if (window.QLData.cache === undefined) { window.QLData.cache = {}; }
	if (window.QLData.cache[theProp] === undefined) {
		$.get('item_service.php', {
			'item': item,
			'spec1': spec1,
			'spec2': spec2,
			'outletFlag': window.outletFlag,
			context:'quicklook',
			qty:$('#qlQty').val()
		}, function(data){
			window.QLData.cache[theProp] = data;
			_updateQuickLook(window.QLData.cache[theProp]);
		});
	} else {
		_updateQuickLook(window.QLData.cache[theProp]);
	}
	return false;
}

/* Rugpad Addon/Upsell */

/**
 * Populates the RugPad Upsell sizes options.
 *
 * @param $context - jQuery object of the 'upsellContainer' that houses the dropdown that sparked the event
 */
function rugPad_PopulateSizes($context) {
	var $theType = $context.find('.rugPadTypeSelector'),
	    $theSize = $context.find('.rugPadSelector'),
			$selBaseId = $theType.val();
	
	if ($selBaseId==0 || undefined == rugPadUpsellOptions[$selBaseId]) {
		rugPad_Reset($context);
	} else {
		
		// Change "Select Rug Pad" option to read "Cancel"
		$theType.find('option').eq(0).text('Cancel');
		
		// Clear any previous size
		rugPad_ResetSizes($context, true);
		
		// Add the sizes for this Rug Pad
		for (var i=0,l=rugPadUpsellOptions[$selBaseId].length; i<l; i++) {
			$theSize.append('<option value="'+rugPadUpsellOptions[$selBaseId][i].sku+'">'+rugPadUpsellOptions[$selBaseId][i].size+'</option>')
		}
		$theSize.trigger('change');
	}
}

/**
 * Populates the RugPad Upsell prices for the selected rugpad / size.
 *
 * @param $context - jQuery object of the 'upsellContainer' that houses the dropdown that sparked the event
 */
function rugPad_PopulatePrices($context) {
	var $theSize = $context.find('.rugPadSelector');
	
	// Show the price & qty rows
	$context.find('.startsHidden').removeClass('hide');
	
	// Add the border from the row with dropdowns
	$context.find('.rugPadSelectorRow td').removeClass('force_no_borders');
	
	if (undefined != rugPadUpsellOptions['prices'][$theSize.val()]) {
		$context.find('.upsellPrice').text(rugPadUpsellOptions['prices'][$theSize.val()].price);
		$context.find('.upsellShipping').text(rugPadUpsellOptions['prices'][$theSize.val()].shipping);
	}
}


/**
 * Resets the RugPad Upsell display to its initial values.
 *
 * @param $context - jQuery object of the 'upsellContainer' that houses the dropdown that sparked the event
 */
function rugPad_Reset($context) {
	// Hide the price & qty rows
	$context.find('.startsHidden').addClass('hide');
	
	// Remove the border from the row with dropdowns
	$context.find('.rugPadSelectorRow td').addClass('force_no_borders');
	
	// Reset the Sizes
	rugPad_ResetSizes($context);
	
	// Reset the first option of the type selector to "Select Rug Pad" and make it the selected option
	$theType = $context.find('.rugPadTypeSelector option').eq(0).text('Select Rug Pad').val(0).attr('selected',true);
	
	// Reset the rug pad quantity to zero
	$context.find('.rugPadQty').val('1');
}

/**
 * Resets the RugPad Upsell Sizes to its initial values.
 *
 * @param $context - jQuery object of the 'upsellContainer' that houses the dropdown that sparked the event
 */
function rugPad_ResetSizes($context, skipDefault) {

	if (undefined == skipDefault) { var skipDefault = false; }
	
	var $theSize = $context.find('.rugPadSelector')
	
	// Remove the options from the Select Size
	$theSize.find('option').remove().end() // Remove all options
	if (skipDefault == false) {
		$theSize.append('<option value="">Select Size</option>') // add the default Option back.
	}
}