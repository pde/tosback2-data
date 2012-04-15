// If we haven't created the PIER1TOGO object already (for namespacing purposes)
// go ahead and create it now
if (typeof PIER1TOGO === 'undefined') {
    PIER1TOGO = {};
}

PIER1TOGO.shoppingWidget = {
    isWidgetVisibleOverride : false // used to make sure the widget shows when items are added
};

PIER1TOGO.shoppingWidget.hoverBasketItem = (function () {
    var $widget, config, init, toggleDetails;
    
    config = {
        widget: 'div.shoppingWidget',
        items: 'div.basketSlider li:not(.pager) > a',
        details: 'div.basketItemDetails',
        hiddenClass: 'visuallyHidden'
    };
    
    init = function(options) {
        $.extend(config, options);        
        $widget = $(config.widget);
        
        // of course we don't want to do anything if there isn't a widget
        if (!$widget.length) { 
            return;
        }    
        
        $widget.delegate(config.items,'hover', toggleDetails);
    };
    
    toggleDetails = function (){
        var $parentLi = $(this).closest('li'),
            $details = $parentLi.children(config.details);
        
        if ($details.length) {
            $details.toggleClass(config.hiddenClass);
        
            if (!$details.hasClass(config.hiddenClass)) {
                $details.position({
                    my: 'center bottom',
                    at: 'left top',
                    of: $parentLi,
                    offset: '0 -5',
                    collision: 'fit'
                });
            }
        }
    };
    
    return {
        init: init
    }
}());

PIER1TOGO.shoppingWidget.callWidgetService = function (methodName, data, callback, errorCallback) {    
    $.ajax({
        type: "POST",
        url: "/DesktopModules/Pier1ToGo/Services/ShoppingListWidgetService.aspx/" + methodName,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (callback != null) {
                callback(msg.d);
            }
        },
        error: function (msg) {
            if (errorCallback != null) {
                errorCallback(msg);
            }
        }
    });
};

PIER1TOGO.shoppingWidget.bindBasket = function (basket) {

    // item in basket binding
    var bindListItem = function (basketItemDiv, basketListItem) {
        var $basketItem = $(basketItemDiv),
            markup = '',
            detailSkuMarkup = '';

        if (basketListItem != null) {
            markup += '<a href="' + basketListItem.DetailUrl + '">';
            markup += '<img src="' + basketListItem.ImageThumbnailUrl + '" width="50" height="50" alt="'+ basketListItem.Name +'" />';
            markup += '</a>';
                            
            markup += '<div class="basketItemDetails clearfix visuallyHidden">';
            markup += '<img src="'+ basketListItem.ImageThumbnailUrl +'" width="120" height="120" alt="'+ basketListItem.Name +'" />';
            markup += '<div class="skuContent">';
            markup += '<h2>' + basketListItem.Name + '</h2>';            
            markup += '<ul class="skuItems">';

            for (var s = 0, skuLength = basketListItem.SKUs.length; s < skuLength; s++) {
                detailSkuMarkup += '<li><p class="itemName">' + basketListItem.SKUs[s].Name + "</p>";
                detailSkuMarkup += '<ul class="skuDetails">'
                detailSkuMarkup += '<li>' + basketListItem.SKUs[s].Price + '</li>'
                detailSkuMarkup += '<li><strong>SKU:</strong> ' + basketListItem.SKUs[s].SKU + '</li>'
                detailSkuMarkup += '</ul>'
                detailSkuMarkup += '</li>';
            }

            markup += detailSkuMarkup;
            markup += '</ul>';
            markup += '</div>';
            $basketItem.html(markup);
        }
        else {
            markup = '<span class="visuallyHidden">Empty</span>',
            detailSkuMarkup = '';
            $basketItem.html(markup);            
        }
    }

    // basket binding
    if (basket != null) {

        if (basket.IsLoggedIn) {
            $("li.loginLogout").addClass('visuallyHidden');
        }
        else {
            $("li.loginLogout").removeClass('visuallyHidden');
        }

        if (basket.IsWidgetVisible || PIER1TOGO.shoppingWidget.isWidgetVisibleOverride) {
            $("div.shoppingListWidgetHeader").hide();
            $("div.shoppingListWidget").show();
        }
        else {
            $("div.shoppingListWidget").hide();
            $("div.shoppingListWidgetHeader").show();
        }

        if (basket.PagedItems.length < 1) {

            if (basket.IsLoggedIn) {
                $("fieldset.emailLoginBoxPanel").hide();
                //$("div.emptyWidgetBasket").show();
                $("div.widgetBasket").show();
            }
            else {
                $("fieldset.emailLoginBoxPanel").show();
                $("li.loginLogout").addClass('visuallyHidden');
                //$("div.emptyWidgetBasket").hide();
                $("div.widgetBasket").hide();
            }

            $("input.manageBasketButton").hide();
        }
        else {

            var basketItemDivs = $("li.shoppingWidgetBasketItem");

            for (var b = 0; b < basketItemDivs.length; b++) {

                if (b < basket.PagedItems.length) {
                    bindListItem(basketItemDivs[b], basket.PagedItems[b]);
                }
                else {
                    bindListItem(basketItemDivs[b], null);
                }
            }

            $("input.manageBasketButton").show();
            $("div.widgetBasket").show();
            //$("div.emptyWidgetBasket").hide();
            $("fieldset.emailLoginBoxPanel").hide();
        }
    }
};

PIER1TOGO.shoppingWidget.setLocationCallback = function () {
    $lastAddBtn.attr('data-nolo', null);
    $lastAddBtn.click();
    // ASP.NET postback for link buttons uses the href to call js. We'll just grab that js and execute it
    //  since calling click() doesn't actually simulate a user clicking the link
    var href = $lastAddBtn.attr('href').substring(11);
    eval(href);
};

PIER1TOGO.shoppingWidget.addToBasketButtonHandler = function (event) {

    $lastAddBtn = $(this);
    
    if ($lastAddBtn.attr("data-nolo") == "true") {
        PIER1TOGO.setLocation.OpenDialogToSearch( { extraCopy: 'SelectLocationToAdd', callback: PIER1TOGO.shoppingWidget.setLocationCallback } );
        return false;
    }
    else if (typeof $lastAddBtn.attr("sku") != "undefined") {

        // set the name of the associated quantity textbox to make it easy to get server-side
        var quantityTextBox = $lastAddBtn.closest("div.relatedSkuDetails").find("input.quantityTextBox");
        quantityTextBox.attr('id', 'itemQuantityToUpdate').attr('name', 'itemQuantityToUpdate');
        
        // track when users click add to basket
        var productDetailWidgetTracker = $('#productDetailWidgetTracker').val();                     
        var gaAvailabilityTracker = _gat._getTracker(productDetailWidgetTracker);
        gaAvailabilityTracker._initData();
        gaAvailabilityTracker._trackEvent('Inventory', 'Add_Prod_to_Basket');
    }
};

PIER1TOGO.shoppingWidget.saveForLaterButtonHandler = function (event) {
    var $btn = $(this);
    // set the name of the associated quantity textbox to make it easy to get server-side
    var quantityTextBox = $btn.closest("div.relatedSkuDetails").find("input.quantityTextBox");
    quantityTextBox.attr('id', 'itemQuantityToUpdate').attr('name', 'itemQuantityToUpdate');
    
    // track when users click add to wishlist
    var shoppingListWidgetTracker = $('#shoppingListWidgetTracker').val();
    var gaAvailabilityTracker = _gat._getTracker(shoppingListWidgetTracker);
    gaAvailabilityTracker._initData();
    gaAvailabilityTracker._trackEvent('Inventory', 'Add_Prod_to_Wish_List');
};

PIER1TOGO.shoppingWidget.initializeBasket = function () {
    PIER1TOGO.shoppingWidget.callWidgetService(
        "GetBasket",
        //"{'nextIndex': 0 }",
        "{'nextIndex': 0, 'portalId':'" + $('#shoppingListWidget_shoppingWidgetPortalId').val() + "'}",
        PIER1TOGO.shoppingWidget.bindBasket,
        function (msg) {
            //alert("GetBasket failed.");
        }
    );
};

// aligns widget with the rest of the content
// Note: this depends on the main nav table having a class of "header2"
PIER1TOGO.shoppingWidget.positionWidget = function () {
    var left = $('table.header2').offset().left;    
    $('div.shoppingWidget').css('left',left + 'px');
    $('div.shoppingWidget').css('display','block');
};

$(document).ready(function () {
    
    PIER1TOGO.shoppingWidget.positionWidget();
    PIER1TOGO.shoppingWidget.hoverBasketItem.init();
    PIER1TOGO.shoppingWidget.initializeBasket();

    $("a.addToBasketButton").live("click", PIER1TOGO.shoppingWidget.addToBasketButtonHandler);
    $("a.saveForLaterButton").live("click", PIER1TOGO.shoppingWidget.saveForLaterButtonHandler);

    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, args) {
        
        // make sure widget is showing
        $("p.showShoppingListWidget").first().click();
        
        PIER1TOGO.shoppingWidget.callWidgetService(
            "GetBasket",
            //"{'nextIndex': 0 }",
            "{'nextIndex': 0, 'portalId':'" + $('#shoppingListWidget_shoppingWidgetPortalId').val() + "'}",
            PIER1TOGO.shoppingWidget.bindBasket,
            function (msg) {
                //alert("GetBasket failed.");
            }
        );
        
    });

    // keep widget aligned with the page content when window is resized
    $(window).resize(function() {
        PIER1TOGO.shoppingWidget.positionWidget();
    });

    // if user is on a tablet (iPad, Android, etc) we need to manually move the widget
    //  back to the bottom of the screen after scrolling
    var isTouch = ('ontouchstart' in window);
    if (isTouch) {
        $widget = $('div.shoppingWidget');
        var widgetId = $widget.attr('id');
        var widgetHeight = $widget.height();
        $(window).scroll(function () {        
            document.getElementById(widgetId).style.top = (window.pageYOffset + window.innerHeight - widgetHeight) + 'px';         
        }); 
    }


    /**
    Handlers for previous/next list buttons
    **/

    $("a.shoppingListPreviousItem").live("click", function (event) {

        event.preventDefault();

        PIER1TOGO.shoppingWidget.callWidgetService(
            "GetBasket",
            //"{'nextIndex': 0 }",
            "{'nextIndex': 0, 'portalId':'" + $('#shoppingListWidget_shoppingWidgetPortalId').val() + "'}",
            PIER1TOGO.shoppingWidget.bindBasket,
            function (msg) {
                alert("shoppingListPreviousItem failed.");
            });
    });

    $("a.shoppingListNextItem").live("click", function (event) {

        event.preventDefault();

        PIER1TOGO.shoppingWidget.callWidgetService(
            "GetBasket",
            //"{'nextIndex': 0 }",
            "{'nextIndex': 0, 'portalId':'" + $('#shoppingListWidget_shoppingWidgetPortalId').val() + "'}",
            PIER1TOGO.shoppingWidget.bindBasket,
            function (msg) {
                alert("shoppingListNextItem failed.");
            });
    });
    
    /**
    Handlers for showing and hiding the shopping list widget
    **/

    $("p.showShoppingListWidget").live("click", function (e) {
        e.preventDefault();

        $("div.shoppingListWidgetHeader").hide();
        $("div.shoppingListWidget").show();

        PIER1TOGO.shoppingWidget.isWidgetVisibleOverride = true;
        PIER1TOGO.shoppingWidget.callWidgetService("ShowBasket", "{'value':true }");
        
        // track when users maximize widget
        var shoppingListWidgetTracker = $('#shoppingListWidgetTracker').val();                      
        var gaAvailabilityTracker = _gat._getTracker(shoppingListWidgetTracker);
        gaAvailabilityTracker._initData();
        gaAvailabilityTracker._trackEvent('Inventory', 'Widget_Maximize');
    });

    // make sure the What's This link still works as normal and doesn't expand the widget
    $("p.showShoppingListWidget > a").live('click', function(e) { e.stopPropation() });

    $("a.hideShoppingListWidget").live("click", function (e) {
        e.preventDefault();

        $("div.shoppingListWidget").hide();
        $("div.shoppingListWidgetHeader").show();

        PIER1TOGO.shoppingWidget.isWidgetVisibleOverride = false;
        PIER1TOGO.shoppingWidget.callWidgetService("ShowBasket", "{'value':false }");
        
        // track when users minimize widget
        var shoppingListWidgetTracker = $('#shoppingListWidgetTracker').val();                     
        var gaAvailabilityTracker = _gat._getTracker(shoppingListWidgetTracker);
        gaAvailabilityTracker._initData();
        gaAvailabilityTracker._trackEvent('Inventory', 'Widget_Minimize');
    });

    /**
    Handlers for showing the select store dialog
    **/

    $('a.shoppingListWidgetChangeLocationStore').live('click', function (event) {
        event.preventDefault();
        PIER1TOGO.setLocation.OpenDialogToStores();
        
        // track when users click "change location"
        var shoppingListWidgetTracker = $('#shoppingListWidgetTracker').val();                     
        var gaAvailabilityTracker = _gat._getTracker(shoppingListWidgetTracker);
        gaAvailabilityTracker._initData();
        gaAvailabilityTracker._trackEvent('Inventory', 'Change_Geo_or_Store_Location');
    });

    $('a.shoppingListWidgetChangeLocation').live('click', function (event) {
        event.preventDefault();
        PIER1TOGO.setLocation.OpenDialogToSearch();
        
        // track when users click "change location"
        var shoppingListWidgetTracker = $('#shoppingListWidgetTracker').val();                     
        var gaAvailabilityTracker = _gat._getTracker(shoppingListWidgetTracker);
        gaAvailabilityTracker._initData();
        gaAvailabilityTracker._trackEvent('Inventory', 'Change_Geo_or_Store_Location');
    });

    /**
    Handlers for login clicks
    **/

    $("a.loginLink").live("click", function (e) {
        e.preventDefault();
        
        $("a.cancelLoginLink").show();
        $("a.loginLink").hide();

        $("div.widgetBasket").hide();
        $("fieldset.emailLoginBoxPanel").show();
    });

    $("a.cancelLoginLink").live("click", function (e) {
        e.preventDefault();
        
        $("a.cancelLoginLink").hide();
        $("a.loginLink").show();

        $("div.widgetBasket").show();
        $("fieldset.emailLoginBoxPanel").hide();
    });
    
    $("input.widget-login").live("click", function (e) {
        
        // track when users try to login
        var shoppingListWidgetTracker = $('#shoppingListWidgetTracker').val();                     
        var gaAvailabilityTracker = _gat._getTracker(shoppingListWidgetTracker);
        gaAvailabilityTracker._initData();
        gaAvailabilityTracker._trackEvent('Inventory', 'Widget_Login');
        
        // DoubleClick Floodlight tracking
        var click5 = new Image();
        var click5a = new Image();
        var axel = Math.random() + "";
        var ord = axel * 1000000000000000000;
        click5.src = 'http://ad.doubleclick.net/activity;src=1391379;type=p12go435;cat=pier1770;ord=' + ord + '?';
        click5a.src='http://133.xg4ken.com/media/redir.php?track=1&token=d1c1fb6d-251f-4b37-922e-e4af40621f19&type=widget&val=0.0&orderId=&promoCode=&valueCurrency=USD';

        
    });
});