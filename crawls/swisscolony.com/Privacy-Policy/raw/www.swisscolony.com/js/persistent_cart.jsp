

var persistentCartCommands = new Array(8);
persistentCartCommands[0] = '/checkout/universal_cart.jsp';
persistentCartCommands[1] = '/checkout/add_item_pc.cmd';
persistentCartCommands[2] = '/checkout/add_items_pc.cmd';
persistentCartCommands[3] = '/checkout/delete_item_in_cart.cmd';
persistentCartCommands[4] = '/checkout/add_catalog_order_item_pc.cmd';
persistentCartCommands[5] = '/user/add_wishlist_item_to_basket_pc.cmd';
persistentCartCommands[6] = '/user/add_all_wishlist_items_to_basket_pc.cmd';
persistentCartCommands[7] = '/user/instore_pickup_zip_json_pc.jsp';

var persistentCartContainerId = "#widget-ucart";
var persistentCartCloseButClass = ".widget-ucart-close-but";
var hideTimeOuts= new Array();

var ucartLoadingHTML = 	'<div id="widget-ucart">' +
				 		'  <div id="glo-ucart-top" class="widget-ie6png"><!--  --></div>' +
				  		'  <div id="glo-ucart-body" class="widget-ie6png">' +
				  		'    <div id="glo-ucart-content">'+
				  		'	   <div class="widget-ima-loader"><img src="/assets/images/common/loading.gif" alt="Loading..." /></div>' +
				  		'    </div>' +
				  		'  </div>' +
				  		'  <div id="glo-ucart-bottom" class="widget-ie6png"><!--  --></div>' +
  				  		'</div>';

var ucartSimpleHTML = 	'<div id="widget-ucart"></div>';

  				  		
/* Function(s) to Show the Basket Layer */
function showBasket(action,params,refreshPage,refreshDelayTime) {
	if( (action == "show") || (action == "showFromQuickview") )
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[0]; }
	else if(action == "addProduct")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[1];}
	else if(action == "addEnsemble")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[2];}
	else if(action == "remove")
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[3];}
	else if(action == "addCatalogItems")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[4];}
	else if(action == "addProductWishlist")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[5];}
	else if(action == "addAllProductsWishlist")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[6];}
	else
	{ alert("missing action"); }

	requestURL = requestURL;
	params = "ts=" + timestamp() + "&action=" + action + "&" + params;

	$.ajax({
		type: "POST",
		url: requestURL,
		data: params,
		dataType: "html",
      	timeout: 15000,
		success: function(data) {
			hideloading();
			$(persistentCartContainerId).append(data);
			$(persistentCartContainerId).show();
			if (refreshPage != undefined && refreshPage) {
            	setTimeout( function() { location.reload(true); }, refreshDelayTime != undefined? refreshDelayTime : 0);
         }
			return true;
		},
		error: function() {
			hideloading();
			return false;
		}
	});
};

function showloading(htmlToShow) {
	$(persistentCartContainerId).remove();

	//load, position, show new cart
	$("body").append(htmlToShow);
	positionpersistentCart();
	$(persistentCartContainerId).show();

	// add an event for close layer.
	//$(persistentCartCloseButClass).click(function() { hideBasket(); });
};

function hideloading() {
	$(persistentCartContainerId + " *").remove();
	$(persistentCartContainerId).html("");
};


//edit this function to position cart.
function positionpersistentCart() {
	newLeft = 10 + ($("body").width() / 2) + ( $(".common-template-shell").width() / 2 ) - $(persistentCartContainerId).width();

	$(persistentCartContainerId).css("left", newLeft+"px");
	$(persistentCartContainerId).css("top", "70px");
};
  				 
 //edit this function to update the setup
function setupPersistentCartButtons() {
	// draw focus near this
	window.location = "#";

	$(persistentCartCloseButClass).unbind("click").click(function() {
		hideBasket();
	});
	$(persistentCartCloseButClass).attr("href","javascript:void(0)");
	clearAllTimeouts();
};

//Edit this function if need to do something special on basket close.
function hideBasket() {
	$(persistentCartContainerId).hide();
	$(persistentCartContainerId).remove();

	shoppingBagBut = $("#widget-header-active-link").eq(0);
	$(shoppingBagBut).attr("id","")
	$(shoppingBagBut).mouseout();
};

function updateHeader(amt) {
	if(amt == 1)
	{ $("#widget-ucart-item-count").text(amt + " item(s)"); }
	else
	{ $("#widget-ucart-item-count").text(amt + " item(s)");}
};


function addToCart(prefix, container) {
	var scope = $(prefix);
	if (container)
		scope = $(container).parents(prefix);

	var productVariantId = $("input[@name=productVariantId]", scope).val();
	if (productVariantId == null || productVariantId == undefined)
		productVariantId = $("input[@name=productVariantId2]", scope).val();

	params =  "productName=" + $("input[@name=productName]", scope).val() +
			  "&productId=" + $("input[@name=productId]", scope).val() +
   	 		  "&categoryId=" + $("input[@name=categoryId]", scope).val() +
   	 		  "&parentCategoryId=" + $("input[@name=parentCategoryId]", scope).val() +
   	 		  "&subCategoryId=" + $("input[@name=subCategoryId]", scope).val() +
   	 		  "&quantity=" + $("input[@name=quantity]", scope).val() +
   	 		  "&productVariantId=" + productVariantId;
   	 		  
	//see if this is an update.
  	if( $("input[@name=itemGUID]", scope).size() > 0 )
  	{ params = params + "&itemGUID=" + $("input[@name=itemGUID]", scope).val() + "&isUpdate=1"; }

	if( $("input[@name=onBasketPage]", scope).size() > 0 )
  		{ params = params + "&onBasketPage=" + $("input[@name=onBasketPage]", scope).val(); }
  	
	if (prefix != undefined)
		params = params + "&prefix=" + prefix;
		
  	showBasket('addProduct',params);
};

function wishListAddToCart(params,refreshPage,refreshDelayTime) {
	showBasket('addProductWishlist',params,refreshPage,refreshDelayTime);
};

function wishListAddAllToCart(params,refreshPage,refreshDelayTime) {
	showBasket('addAllProductsWishlist',params,refreshPage,refreshDelayTime);
};

function addCatalogOrderItemsToCart() {
    params = "productId=" + $("input[@name=productId]").val() +
  		     "&itemNumber=" + $("input[@name=itemNumber]").val() +
  			 "&productName=" + $("input[@name=productName]").val() +
  			 "&productVariantId=" + $("input[@name=productVariantId]").val() +
  			 "&quantity=" + $("input[@name=quantity]").val();
    showBasket('addCatalogItems',params);
};

function addEnsembleToCart(type) {
	params =  "productName=" + $("input[@name=productName]").val() +
			  "&ensembleId=" + $("input[@name=ensembleId]").val() +
			  "&categoryId=" + $("input[@name=categoryId]").val() +
   	 		  "&parentCategoryId=" + $("input[@name=parentCategoryId]").val();

	// iterate through products in the ensemble for variant id
	$(".the-variant-ids").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

	// iterate through products for qty
	$(".the-variant-qtys").each(function() {
		if( type == 'all' )
		{
		  $(this).val("1");
		  params = params + "&" + $(this).attr("name") + "=1";
		}
		else
		{ params = params + "&" + $(this).attr("name") + "=" + $(this).val(); }
	});

	// iterate through products variant count
	$(".the-variant-count").each(function() {		
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});
	
	params = params + "&productCount=" + $(".the-variant-ids").length;
	showBasket('addEnsemble',params);
};

function setUserZipCodePC(refresh)  {
    var params = "ts=" + timestamp() + "&action=updateUserZipCode" +
                 "&storesListZipCode=" +  $("input[@name=storesListZipCodePC]").val() +
                 "&storesListLatitude=" +  $("input[@name=storesListLatitudePC]").val() +
                 "&storesListLongitude=" +  $("input[@name=storesListLongitudePC]").val();
    var requestURL = persistentCartCommands[7];

    $.ajax({
		type: "GET",
		url: requestURL,
		data: params,
		dataType: "json",
      	timeout: 15000,
		success: function(data) {
			if (refresh) {
                showBasket('show', '');
            }
            return true;
		},
		error: function() {
            alert('There was an error trying to save your zip code.');
            return false;
		}
	});

}

// Edit this per site to adjust location
function adjustDivLocation(divToAdjust) {
	var bWindowOffsets = getScrollXY();
	var bWindowViewport = getViewportSize();
	var qvTop = ((bWindowViewport[1] / 2) - ($(divToAdjust).height() / 2)) + bWindowOffsets[1];
	qvTop = (qvTop < 0) ? 100 : qvTop;
	$(divToAdjust).css("top",qvTop+"px");
	$(divToAdjust).css("left","50%");
	$(divToAdjust).css("margin-left",-($(divToAdjust).width()/2));
};

// Helper Function(s)
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

function getViewportSize() {
  var vpW = 0, vpH = 0;
  if (typeof window.innerWidth != 'undefined')
  {
    vpW = window.innerWidth,
    vpH = window.innerHeight
  }
  else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
  {
    vpW = document.documentElement.clientWidth,
    vpH = document.documentElement.clientHeight
  }
  else
  {
    vpW = document.getElementsByTagName('body')[0].clientWidth,
    vpH = document.getElementsByTagName('body')[0].clientHeight
  }
  return [  vpW, vpH ];
}

function errorAppend(area,msg) {
	$(area).html(msg.replace(/&amp;/g, "&").replace(/&lt;/g,
        "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'"));
	$(area).show();
};

function resetErrorFields() {
	$(".glo-tex-error").hide();
	$(".glo-tex-error").html("");
};

function messageAppend(area,msg) {
	$(area).html(msg);
	$(area).show();
};

function resetMessageFields() {
	$(".glo-tex-info").hide();
};

function clearAllTimeouts() {
	for(x = 0; x < hideTimeOuts.length; x++)
	{ clearTimeout(hideTimeOuts[x]); }
};

function timestamp() { 
	return new Date().getTime(); 
}
	
function loadQuickView(overlayURL)
{
	if (typeof OverlayWidget != "undefined") 
 		OverlayWidget.show("#headerOverlay", null, { sourceURL : overlayURL }); 
}	

function hideQuickView()
{
	if (typeof OverlayWidget != "undefined") { OverlayWidget.hideAll(); }
}

function loadOverlay(overlay, overlayURL)
{
	if (typeof OverlayWidget != "undefined") 
 		OverlayWidget.show(overlay, null, { sourceURL : overlayURL }); 
}