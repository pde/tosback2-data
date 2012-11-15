
//change for sli - add full url
var cart_base = window.location.protocol + "//" + window.location.hostname;
var ajaxTimeout = '15000';
var params;
var persistentCartCommands = new Array(7);
persistentCartCommands[0] = cart_base + "/checkout/minicart.jsp";
persistentCartCommands[1] = cart_base + "/checkout/process_item_ajax.cmd";
persistentCartCommands[2] = cart_base + "/checkout/process_items_ajax.cmd";
persistentCartCommands[3] = cart_base + "/checkout/delete_item_from_order_ajax.cmd";
persistentCartCommands[4] = cart_base + "/checkout/continue_detailed_personalize_item_ajax.cmd";
persistentCartCommands[5] = cart_base + "/checkout/add_membership_product_ajax.cmd";
persistentCartCommands[6] = cart_base + "/checkout/process_quickview_item_ajax.cmd";



var persistentCartContainerId = "#minicart_container";
var persistentCartId = "#minicart";
var persistentCartCloseButClass = "#minicart .bar .close";
var persistentCartIsShowing = false;
var persistentCartLinkClass = ".js_minicart";

var hideTimeOuts= new Array();

var ucartLoadingHTML = 	'<div id="minicart_container">' +
				  		'	   <div class="loader"><img src="/assets/loading.gif" alt="Loading..." /></div>' +
				  		'</div>';
 ucartLoadingHTML = '';
var ucartSimpleHTML = 	'<div id="minicart_container"></div>';
ucartSimpleHTML = '';
  				  		
/* Function(s) to Show the Basket Layer */
function showBasket(action,params,refreshPage,refreshDelayTime, keepActive) {
	if( (action == "show") || (action == "showFromQuickview") )
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[0]; }
	else if(action == "addProduct")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[1];}
	else if(action == "addEnsemble")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[2];}
	else if(action == "remove")
	{ showloading(ucartLoadingHTML); requestURL = persistentCartCommands[3];}
	else if(action == "addGiftCertPersonalization")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[4];}
    else if(action == "addProductMembership")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[5];}
    else if(action == "addFromQuickView")
	{ showloading(ucartSimpleHTML); requestURL = persistentCartCommands[1];}
	else
	{ alert("missing action"); }

	requestURL = requestURL;
	params = "ts=" + timestamp() + "&action=" + action + "&" + params;
	$.ajax({
		type: "POST",
		url: requestURL,
		data: params,
		dataType: "html",
      	timeout: ajaxTimeout,
		success: function(data) {
			hideloading();
			$(persistentCartContainerId).append(data);
			$(persistentCartContainerId).show();
            scrollSetup();
            if (refreshPage != undefined && refreshPage) {
            	setTimeout( function() { location.reload(true); }, refreshDelayTime != undefined? refreshDelayTime : 0);
            } else {
                if (keepActive != undefined && keepActive) {
                
                var container = $('#minicart');

                container.mouseleave(function() {
                    setTimeout(hideBasket,5000);
                });
                } else {
                    setTimeout(hideBasket,5000);
                }

            }
            persistentCartIsShowing = true;
			return true;
		},
		error: function() {
			hideloading();
			return false;
		}
	});
    //window.scrollTo(0,0);
}

// When the Universal Cart layer opens it will close if the user clicks on anything in the main browser window
$(document).click(function(event) {
    var posX = event.clientX;
    var posY = event.clientY;
    var miniCart = $(persistentCartContainerId);
    var miniCartPos = miniCart.offset();
    if(isShowingBasket())
        {
            // If user click to background, close the mini cart
            if(!(posX >= miniCartPos.left && posX <= (miniCartPos.left + miniCart.width())
                && posY >= miniCartPos.top && posY <= (miniCartPos.top + miniCart.height()))) {
                hideBasket();
            }
        }
});

$(function(){
   var minicartTimer;
   $(persistentCartLinkClass).hover(function(){
      minicartTimer = showBasket('show', '', false, '5000', true);
   },function(ev) {
      if( typeof minicartTimer != undefined ) { clearTimeout(minicartTimer); }
   });
});

function isShowingBasket() {
    return persistentCartIsShowing;
}

function showloading(htmlToShow) {
	//$(persistentCartContainerId).remove();

	//load, position, show new cart
	//$("body").append(htmlToShow);
	//positionpersistentCart();
	//$(persistentCartContainerId).show();
}

function hideloading() {
	$(persistentCartContainerId + " *").remove();
	$(persistentCartContainerId).html("");
}


//edit this function to position cart.
function positionpersistentCart() {
	newLeft = 10 + ($("body").width() / 2) - $(persistentCartContainerId).width();

	$(persistentCartContainerId).css("left", newLeft+"px");
	$(persistentCartContainerId).css("top", "70px");
}
  				 
 //edit this function to update the setup


//Edit this function if need to do something special on basket close.
function hideBasket() {
	$(persistentCartId).hide();
    $(persistentCartId).remove();
    persistentCartIsShowing = false;
}

function hideQuickView() {
	if (typeof OverlayWidget != "undefined") { OverlayWidget.hideAll(); }
}




function timestamp() {
	return new Date().getTime();
}

function addToCart(prefix, container, action) {
    var scope = $(prefix);
    if (container) {
        scope = $(container).parents(prefix);
    }
    var quantity =  $("input[type=hidden][name=quantity]").val();
    if (quantity == null || quantity == undefined)  {
        quantity = $("input[type=text][name=quantity]").val();
    }

    params =        "omItemNumber=" + $("input[type=hidden][name=omItemNumber]", scope).val() +
                    "&prefixCode=" + $("input[type=hidden][name=prefixCode]", scope).val() +
                    "&isMember=" + $("input[type=hidden][name=isMember]", scope).val() +
                    "&pncBuy=" + $("input[type=hidden][name=pncBuy]", scope).val() +
                    "&selImg=" + $("input[type=hidden][name=selImg]", scope).val() +
                    "&relatedProductId=" + $("input[type=radio][@name=relatedProductId]", scope).val() +
                    "&quantity=" + quantity +
                    "&loginSubmit=" + $("input[type=hidden][name=loginSubmit]", scope).val() +
                    "&siteCd=" + $("input[type=hidden][name=siteCd]", scope).val() +
                    "&queryString=" + encodeURIComponent($("input[type=hidden][name=queryString]", scope).val()) +
                    "&destinationLogin=" + encodeURIComponent($("input[type=hidden][name=destinationLogin]", scope).val());
     addGlobalSharedParams(scope);
     addSharedParams(scope);
     addPNCParams(scope);

    if (prefix != undefined){
        params = params + "&prefix=" + prefix;
    }
    showBasket(action,params);
}

function addEnsembleToCart(prefix, container, action) {
    var scope = $(prefix);
    if (container) {
        scope = $(container).parents(prefix);
    }
    params =    "productShipTo=" + $("input[type=hidden][name=productShipTo]", scope).val() +
                "&totalCount=" + $("input[type=hidden][name=totalCount]", scope).val();

    $('[id^="productVariantId_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

     $('[name^="quantitys_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });
    $('[name^="prefixCode_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

     $('[name^="parentProductId_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

    $('[name^="numberOfVariants_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

    $('[name^="hasPersonalization_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

    $('[name^="relateProductId_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

     $('[name^="selImg"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });

     addGlobalSharedParams(scope);
     addSharedParams(scope);

    if (prefix != undefined)
        params = params + "&prefix=" + prefix;

    showBasket(action,params);
}

function addPersonalizationToCart(prefix, container, action) {
    var scope = $(prefix);
    if (container) {
        scope = $(container).parents(prefix);
    }
    var quantity =  $("input[type=hidden][name=quantity]", scope).val();
    if (quantity == null || quantity == undefined)  {
        quantity = $("input[type=text][name=quantity]", scope).val();
    }
    var verified = "N";
    if($('#verified:checked').val() !== undefined) {
        verified = "Y";
    }
    params =    "productVariantProductId=" + $("input[type=hidden][name=productVariantProductId]", scope).val() +
                "&currentIndex=" + $("input[type=hidden][name=currentIndex]", scope).val() +
                "&personalizedProduct=" + $("input[type=hidden][name=personalizedProduct]", scope).val() +
                "&quantity=" + quantity +
                "&omItemNumber=" + $("input[type=hidden][name=omItemNumber]", scope).val() +
                "&prefixCode=" + $("input[type=hidden][name=prefixCode]", scope).val() +
                "&skipPersonalization=" + $("input[type=hidden][name=skipPersonalization]", scope).val() +
                "&hasPersonalizationGroup=" + $("input[type=hidden][name=hasPersonalizationGroup]", scope).val() +
                "&itemIndex=" + $("input[type=hidden][name=itemIndex]", scope).val() +
                "&orderIndex=" + $("input[type=hidden][name=orderIndex]", scope).val() +
                "&verified=" +  verified +
                "&warningDisplayed=" +  $("input[type=hidden][name=warningDisplayed]", scope).val() +
                "&from=" + $("input[type=hidden][name=from]", scope).val();

                $('[name^="persValue1_"]').each(function() {
                     params = params + "&" + $(this).attr("name") + "=" + $(this).val();
                });
                $('[name^="persCheckbox"]').each(function() {
                     params = params + "&" + $(this).attr("name") + "=" + $('[name^="persCheckbox"]').attr("checked");
                });
                $('[name^="persDay"]').each(function() {
                     params = params + "&" + $(this).attr("name") + "=" + $(this).val();
                });
                $('[name^="persMonth"]').each(function() {
                     params = params + "&" + $(this).attr("name") + "=" + $(this).val();
                });
                $('[name^="persYear"]').each(function() {
                     params = params + "&" + $(this).attr("name") + "=" + $(this).val();
                });


     addGlobalSharedParams(scope);

    if (prefix != undefined) {
        params = params + "&prefix=" + prefix;
    }
    showBasket(action,params);
}


function addGlobalSharedParams(scope){
    var productVariantId = $("input[type=hidden][name=productVariantId]", scope).val();
    if (productVariantId == null || productVariantId == undefined)  {
        productVariantId = $("input:radio[name=productVariantId]:checked", scope).val();
    }

    var shipTo = $("#shipTo").val();
    if (shipTo == null || shipTo == undefined)  {
        shipTo = $("select[name='shipTo']").val();
    }
    if (shipTo == null || shipTo == undefined)  {
        shipTo =  $("input[type=hidden][name=shipTo]", scope).val()
     }

    params = params +   "&productVariantId=" + productVariantId +
                        "&shipTo=" + encodeURIComponent(shipTo) +
                        "&productId=" + $("input[type=hidden][name=productId]", scope).val() +
                        "&categoryId=" + $("input[type=hidden][name=categoryId]", scope).val() +
                        "&pCategoryId=" + $("input[type=hidden][name=pCategoryId]", scope).val() +
                        "&gpCategoryId=" + $("input[type=hidden][name=gpCategoryId]", scope).val() +
                        "&siteId=" + $("input[type=hidden][name=siteId]", scope).val() +
                        "&freebieFlag=" + $("input[type=hidden][name=freebieFlag]", scope).val() +
                        "&orderTotal=" + $("input[type=hidden][name=orderTotal]", scope).val() +
                        "&orderSubTotal=" + $("input[type=hidden][name=orderSubTotal]", scope).val();


    $('input[type=hidden][name="omBreadCrumb"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });
    $('input[type=hidden][name="omSource"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });
    $('input[type=hidden][name="omSourceValue"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });
    if( $("input[type=hidden][name=itemGUID]", scope).size() > 0 ) {
      { params = params + "&itemGUID=" + $("input[type=hidden][name=itemGUID]", scope).val() + "&isUpdate=1"; }
    }
    if( $("input[type=hidden][name=pageName]", scope).size() > 0 ) {
          { params = params + "&pageName=" + $("input[type=hidden][name=pageName]", scope).val(); }
    }     

}

function addSharedParams(scope){
     params = params +   "&addTo=" + $("input[type=hidden][name=addTo]", scope).val() +
                        "&dest=" + $("input[type=hidden][name=dest]", scope).val() +
                        "&giftRegistryIds=" + $("input[type=hidden][name=giftRegistryIds]", scope).val() +
                        "&destinationShipTo=" + encodeURIComponent($("input[type=hidden][name=destinationShipTo]", scope).val()) +
                        "&shipToFirstName=" + encodeURIComponent($("input[type=text][name=shipToFirstName]", scope).val()) +
                        "&shipToLastName=" + encodeURIComponent($("input[type=text][name=shipToLastName]", scope).val()) +
                        "&shipToZipCode=" + $("input[type=text][name=shipToZipCode]", scope).val() +
                        "&shipToPOBox=" + $("input[type=checkbox][name=shipToPOBox]", scope).val();
                        

     $('[id^="selected_attribute_code_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });
    $('[id^="selectedAttributePlaceholder_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });
    $('[id^="default_alternate_image_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });
    $('[id^="selected_alternate_image_"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });
}

function addPNCParams(scope){
    //now pnc
    $('[name^="qty-"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
    });
     $('input[type=hidden][name="pickChooseIndex"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
     });

    $('input[type=hidden][name="kitQuantity"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
     });
    $('input[type=hidden][name="subProductVariantId"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
     });
    $('input[type=hidden][name="itemNumber"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
     });
    $('input[type=hidden][name="itemName"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
     });
    $('input[type=hidden][name="pageName"]').each(function() {
         params = params + "&" + $(this).attr("name") + "=" + $(this).val();
     });

    if( $("input[type=hidden][name=selectedKitQuantity]", scope).size() > 0 )
          { params = params + "&selectedKitQuantity=" + $("input[type=hidden][name=selectedKitQuantity]", scope).val(); }
    if( $("input[type=hidden][name=pncProduct]", scope).size() > 0 )
          { params = params + "&pncProduct=" + $("input[type=hidden][name=pncProduct]", scope).val(); }
}

function resetErrorFields() {
	$(".glo-tex-error").hide();
	$(".glo-tex-error").html("");
}

function resetMessageFields() {
	$(".glo-tex-info").hide();
}

function errorAppend(area,msg) {
	$(area).html(msg.replace(/&amp;/g, "&").replace(/&lt;/g,
        "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'"));
	$(area).show();
}

function messageAppend(area,msg) {
	$(area).html(msg);
	$(area).show();
}
