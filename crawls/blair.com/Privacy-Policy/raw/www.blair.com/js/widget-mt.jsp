












var personalizerCommands = new Array(2);
personalizerCommands[0] = '/checkout/personalization_add.cmd';
personalizerCommands[1] = '/checkout/personalize_item_submit.cmd';
personalizerCommands[2] = '/user/add_wishlist_item_to_basket_pc_personalized.cmd';
personalizerCommands[3] = '/user/add_all_wishlist_items_to_basket_pc_personalized.cmd';
personalizerCommands[4] = '/checkout/personalize_item_from_basket.cmd';
personalizerCommands[5] = '/checkout/add_items_pc_personalized.cmd';
personalizerCommands[6] = '/checkout/add_catalog_order_items_pc_personalized.cmd';
personalizerCommands[7] = '/checkout/personalization_dispatch.cmd';
personalizerCommands[8] = '/checkout/ensemble_personalization_add.cmd';
personalizerCommands[9] = '/checkout/personalize_item_from_checkout.cmd';

var personalizerContainerId = "#widget-personalize";
var personalizeCloseButClass = ".widget-personalize-close-but";

//Preload the loading image for the personalization popup
preload_QV_UC_loading = new Image();
preload_QV_UC_loading.src = "http://images.orchardbrands.com/blair/assets/images/img/loading.gif";

var personalizerLoadingHTML = 	'<div id="widget-personalize">' +
				 		'  <div id="widget-personalize-top" class="widget-ie6png"><!--  --></div>' +
				  		'  <div id="widget-personalize-body" class="widget-ie6png">' +
				  		'    <div id="widget-personalize-content">'+
				  		'	   <div class="widget-ima-loader"></div>' +
				  		'    </div>' +
				  		'  </div>' +
				  		'  <div id="widget-personalize-bottom" class="widget-ie6png"><!--  --></div>' +
  				  		'</div>';

/* This function builds the params object from the hidden product field information on the input page.  These params
   are then passed to a specific Command based on the type of action it is.  In the case of personalization this action
   is going to be 'addProduct' and the resulting Command should be the personalization dispatch Command. */

function addToCartAndPersonalize(type) {
  var personalizationFlag = false;

  params =  "productName=" + $("input[@name=productName]").val() +
            "&productId=" + $("input[@name=productId]").val() +
            "&categoryId=" + $("input[@name=categoryId]").val() +
            "&parentCategoryId=" + $("input[@name=parentCategoryId]").val() +
            "&subCategoryId=" + $("input[@name=subCategoryId]").val() +
            "&redirectPath=" + $("input[@name=redirectPath]").val() +
            "&source=" + $("input[@name=source]").val();

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

  params = params + "&productCount=" + $(".the-variant-ids").length;

  //see if this is an update.
  if( $("input[@name=itemGUID]").val() )
  { params = params + "&itemGUID=" + $("input[@name=itemGUID]").val() + "&isUpdate=1"; }

    // iterate through the products "would you like to personalize this item" flags
    $(".the-variant-personalize-item").each(function() {
      if (($(this).is(":hidden") && $(this).val() == "true") || $(this).is(':checked')) {
        params = params + "&" + $(this).attr("name") + "=true";
        personalizationFlag = true;
      } else {
        params = params + "&" + $(this).attr("name") + "=false";
      }
    });

  //pop the personalizer with the product parameters
    if (personalizationFlag) {
        showPersonalizer('addProducts', params, null, personalizationFlag);
    } else {
        showBasket('addProducts', params);
    }
};

function addCatalogOrderItemsToCart(params) {
    var personalizationFlag = false;

    params = "itemNumber=" + $("input[@name=itemNumber]").val() +
  			 "&productName=" + $("input[@name=productName]").val() +
             "&redirectPath=" + $("input[@name=redirectPath]").val() +
			 "&categoryId=" + $("input[@name=categoryId]").val() +
   	 		 "&parentCategoryId=" + $("input[@name=parentCategoryId]").val();

	// iterate through products in the ensemble for variant id
	$(".the-variant-ids").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

	// iterate through products for qty
	$(".the-variant-qtys").each(function() {
        params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

    // iterate through the products "would you like to personalize this item" flags
    $(".the-variant-personalize-item").each(function() {
      if( $(this).get(0).checked ) {
        params = params + "&" + $(this).attr("name") + "=true";
        personalizationFlag = true;
      } else {
        params = params + "&" + $(this).attr("name") + "=false";
      }
    });

    // Collect the search term flags
    $(".searchTerm").each(function() {
        params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

    params = params + "&productCount=" + $(".the-variant-ids").length;

    if (personalizationFlag) {
        showPersonalizer('addCatalogItemsPersonalized', params, null, personalizationFlag);
    } else {
        showBasket('addCatalogItems', params);
    }
};

function wishListAddToCartPersonalized(id, params) {
    showPersonalizer('addProductWishlist', params, id, true);
};

function wishListAddAllToCartPersonalized(params) {
    // iterate through the products "would you like to personalize this item" flags
    $(".the-variant-personalize-item").each(function() {
      if( $(this).get(0).checked || $(this).get(0).type == "hidden" && $(this).get(0).value == "true") {
        params = params + "&" + $(this).attr("name") + "=true";
        personalizationFlag = true;
      } else {
        params = params + "&" + $(this).attr("name") + "=false";
      }
    });

    showPersonalizer('addAllProductsWishlist', params, null, true);
};

function addEnsembleToCartAndPersonalize(type, targetElem, groupElem) {
	var group = groupElem || "body"; // default to body, so all fields are included
	var evtTarget = targetElem; //The element that is clicked
	
   var personalizationFlag = false;

	var params = "productName=" + $("input[@name=productName]").val() +
			  		"&ensembleId=" + $("input[@name=ensembleId]").val() +
			  		"&categoryId=" + $("input[@name=categoryId]").val() +
   	 		  	"&parentCategoryId=" + $("input[@name=parentCategoryId]").val();

	// iterate through products in the ensemble for variant id
	$(evtTarget).parents(group).find(".the-variant-ids").each(function() {
		params += "&" + $(this).attr("name") + "=" + $(this).val();
	});

	// iterate through products for qty
	$(evtTarget).parents(group).find(".the-variant-qtys").each(function() {
		if( type == 'all' )
		{	alert('if');
		  $(this).val("1");
		  params = params + "&" + $(this).attr("name") + "=1";
		}
		else
		{ 
			params = params + "&" + $(this).attr("name") + "=" + $(this).val(); 
		}
	});

    // iterate through the products "would you like to personalize this item" flags
    $(evtTarget).parents(group).find(".the-variant-personalize-item").each(function() {
      if ($(this).get(0).checked || ($(this).get(0).type == "hidden" && $(this).get(0).value == "true")) {
        personalizationFlag = true;
        params = params + "&" + $(this).attr("name") + "=true";
      } else {
        params = params + "&" + $(this).attr("name") + "=false";
      }
    });

    params = params + "&productCount=" + $(".the-variant-ids").length;

    if (personalizationFlag) {
        showPersonalizer('addProducts', params, null, personalizationFlag);
    } else {
        showBasket('addEnsemble',params);
    }
};

function personalizeFromUniversalCart(id, params) {
  hideBasket();
  showPersonalizer('personalizeFromBasket', params, id, true);
}

function editPersonalizationFromUniversalCart(id, params) {
  hideBasket();
  showPersonalizer('personalizeFromBasket', params, id, true);
}

function personalizeFromBasket(id, params) {
  showPersonalizer('personalizeFromBasket', params, id, true);
}

function editPersonalizationFromBasket(id, params) {
  showPersonalizer('personalizeFromBasket', params, id, true);
}

function personalizeFromCheckout(id, params) {
  showPersonalizer('personalizeFromCheckout', params, id, true);
}

function editPersonalizationFromCheckout(id, params) {
  showPersonalizer('personalizeFromCheckout', params, id, true);
}


function doNotPersonalizeItem() {
  params = "&doNotPersonalize=" + $("input[@name=doNotPersonalize]").val() +
           "&itemUUID=" + $("input[@name=itemUUID]").val() +
           "&itemIndex=" + $("input[@name=itemIndex]").val() +
           "&source=" + $("input[@name=source]").val() +
           "&redirectPath=" + $("input[@name=redirectPath]").val();

  showPersonalizer('personalize', params, $("input[@name=itemUUID]").val(), true);
}

function personalizeItem() {
  var personalizeAll = false
  if ($("#personalizeAll").get(0).checked) {
    personalizeAll = true;
  }

  params = "&productName=" + $("input[@name=productName]").val() + 
    "&personalizeAll=" + personalizeAll + 
    "&itemIndex=" + $("input[@name=itemIndex]").val() +
    "&source=" + $("input[@name=source]").val() +
    "&itemUUID=" + $("input[@name=itemUUID]").val() +
    "&redirectPath=" + $("input[@name=redirectPath]").val();

  //Loop over the mongram fields and add them to the params
  $('.monogramValue').each(function() {
    if ( !$(this).is(":radio") || ($(this).is(":radio") && $(this).is(':checked'))) {
        params = params + "&" + this.name + "=" + this.value;
    }
  });

  showPersonalizer('personalize', params, $("input[@name=itemUUID]").val(), true);
}

function addProductFromQuickViewPersonalization(params) {
    var personalizationFlag = false;

    params = params + "&productName=" + $("#productName").val()  + "&productVariantId=" + $("#productVariantId_qv").val() + "&quantity=" +$("#quantity").val();

	if( $(quickViewContainerId + " input[@name=itemGUID]").size() > 0 )
  	{ params = params + "&itemGUID=" + $(quickViewContainerId + " input[@name=itemGUID]").val(); }
	if( $(quickViewContainerId + " input[@name=onBasketPage]").size() > 0 )
  	{ params = params + "&onBasketPage=" + $(quickViewContainerId + " input[@name=onBasketPage]").val(); }

	$(quickViewContainerId + " select").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

    if( "true" == $(".single-variant-personalize-item").val() ) {
        params = params + "&" + $(".single-variant-personalize-item").attr("name") + "=true";
    } else if( "false" == $(".single-variant-personalize-item").val() ) {
        params = params + "&" + $(".single-variant-personalize-item").attr("name") + "=false";
    }

    // iterate through the products "would you like to personalize this item" flags
    $(".the-variant-personalize-item").each(function() {
      if( $(this).get(0).checked ) {
        params = params + "&" + $(this).attr("name") + "=true";
        personalizationFlag = true;
      } else {
        params = params + "&" + $(this).attr("name") + "=false";
      }
    });

    $(quickViewContainerId + " *").remove();
    ajaxQuickView(quickViewCommands[2], params);
}

function personalizeFromQuickview() {
    showPersonalizer('quickview', "redirectPath=/catalog/quickview.jsp", null, true);
}

function showPersonalizerLoading() {
	$(personalizerContainerId).remove();

    //load, position, show new cart
	$("body").append(personalizerLoadingHTML);
	positionPersonalizer();
	$(personalizerContainerId).show();
};

/* Initially this function will display the loading layer but once it has successfully hit the correct Command
   and successfully made it's AJAX call (which doesn't mean the Command was successful) it will hide the loading
   layer and append the results of the Command's CommandForward to the layer. */

function showPersonalizer(action, params, id, hasPersonalizable) {
	if (hasPersonalizable == null) hasPersonalizable = false;

    if (hasPersonalizable) {
        showPersonalizerLoading();
    }

    if( action == "addProducts" )
    {
      requestURL = personalizerCommands[0];
    }
    else if( action == "personalize" )
    {
      requestURL = personalizerCommands[1];
    }
    else if( action == "addProductWishlist" )
    {
      var removeItemFromDisplay = true;
      requestURL = personalizerCommands[2]; 
    }
    else if( action == "addAllProductsWishlist" )
    {
      var removeAllItemsFromDisplay = true;
      requestURL = personalizerCommands[3];
    }
    else if( action == "personalizeFromBasket" )
    {
      requestURL = personalizerCommands[4];
    }
    else if( action == "addEnsemble")
    {
      requestURL = personalizerCommands[5];
    }
    else if( action == "addCatalogItemsPersonalized")
    {
      requestURL = personalizerCommands[6];
    }
    else if( action == "quickview")
    {
      requestURL = personalizerCommands[7];
    }
    else if( action == "addProductsEnsemble")
    {
      requestURL = personalizerCommands[8];
    }
	else if( action == "personalizeFromCheckout" )
	{
	  requestURL = personalizerCommands[9];
	}
    else
    {
      alert("missing action");
    }

	requestURL = requestURL;
	params = "ts=" + timestamp() + "&action=" + action + "&" + params;

    $.ajax({
		type: "POST",
		url: requestURL,
		data: params,
		dataType: "html",
      	timeout: 15000,
		success: function(data) {

            if( removeItemFromDisplay ) {
              $("#item_container_" + id).addClass("movedToCart");
              $("#item_container_" + id).html("This item has been<br/>moved to your cart");
            } else if ( removeAllItemsFromDisplay ) {
              $("#wishlist_table").addClass("movedToCart");
              $("#wishlist_table").html("All items from your Wish List have been moved to your cart.");
            }

            if (hasPersonalizable) {
                hidePersonalizerLoading();
                $(personalizerContainerId).append(data);

                lib.layer.ie6Fix(personalizerContainerId, "a");

                $(personalizerContainerId).show();

                // add an event for close layer.
                $(personalizeCloseButClass).bind("click", function() {
                	hidePersonalizer();
                 });
            }
            return true;
        },
			error: function() {
            hidePersonalizerLoading();
			return false;
		}
	});
};

function hidePersonalizer() {
  $(personalizerContainerId).hide();
  $(personalizerContainerId).remove();
  lib.layer.ie6Fix(personalizerContainerId, "r");
};

function hidePersonalizerLoading() {
  $(personalizerContainerId + " *").remove();
  $(personalizerContainerId).html("");
};

//edit this function to position cart.
function positionPersonalizer() {
  //just vertical centering is done
  //horizontal centering can be done with css
  lib.layer.vCenter("#widget-personalize");
};

function cancelPersonalization(showBasketFlag, params) {
  hidePersonalizer();
  if ( 1 == showBasketFlag ) {
    showBasket('personalized', params);
  }
}