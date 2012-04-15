var maxVisibleItems = 10;

function addShoppingListItem(oShoppingListItem, fCallback) {

  if (oShoppingListItem) {

    // Convert all cases to arrays so we can use a single API
    var aItems = isArray(oShoppingListItem) ? oShoppingListItem : [oShoppingListItem];

    // Remove items with no item text
    for (var i = aItems.length - 1; i >= 0; i--) {
      if (!aItems[i].itemText) {
        aItems.splice(i, 1);
      }
    }

    // If there are surviving items with itemText...
    if (aItems.length) {

      // Add the item
      ShoppingListAjaxService.saveItemsToActiveList(aItems, {
        callback: function(response) {
          updateWidgets(response, aItems.length);
          if (typeof fCallback == "function") {
            fCallback(response);
          }
        },
        errorHandler:handleError});
    }

  }

  return false;
}

function updateWidgets(oShoppingList, iNewItems) {
  $('#widget-shopping-error-message-container').empty().hide();
  updateSidebarList(oShoppingList, iNewItems);
  updateHeaderList(oShoppingList);
  checkMaxECoupons();

  return true;
}

function updateSidebarList(oList, iNewItems) {
  var result = true;
  var isCouponListPage = $("div#ecoupon-list").length; // Element exists on page

  clearSidebarList();

  if (oList) {
    // Populate the table with items
    var oBody = $("#shopping-list-sidebar-items tbody");

    if (oBody) {

      oList.shoppingListItems.sort(sortDisplayOrderDesc);

      for (var i = 0; i < oList.shoppingListItems.length; i++) {
        var oItem = oList.shoppingListItems[i];
        var oItemAttrs = oItem.shoppingListItemAttr[0];
        var sRow = "";
        var rowClass = (i % 2 == 0) ? "oddrow" : "evenrow";

        sRow = '<tr>' +
        '<td class="item-name ' + rowClass + '">' + truncateEllipsis(oItem.itemText, 40) + '</td>' +
        '<td class="item-delete oddrow"><a href="/shopping-list/viewmylist?remove=' + oItem.listLineNumber + '">' +
          '<img alt="Delete this item" title="Delete this item" src="/common/img/icn-delete.png" /></a></td>' +
        '</tr>';

        oBody.prepend(sRow);

        if (i > maxVisibleItems - 1) {
          // Roll off the last item
          $("#shopping-list-sidebar-items tbody tr:last").remove();
        }

        try {
          if (oItemAttrs["attributeCode"].toLowerCase() == "ecoupon" &&
              oItemAttrs["status"].toLowerCase() == "requested") {
            updateCouponOptions(oItemAttrs["attributeId"]);
          }
        }
        catch(e) {
        }

      }

      toggleListOptions(oList);

      if (oItemAttrs["attributeCode"].toLowerCase() == "ecoupon" &&
          oItemAttrs["status"].toLowerCase() == "requested" &&
          !checkMaxECoupons()) {
            updateECouponWidget();
      }

      // Glow item
      var jqRows = $(oBody).children('tr');

      for (var i = 0; i < iNewItems; i++) {
        glowElement($(jqRows[i]).children('td'));
      }

    }
    else {
      result = false;
    }
  }
  else {
    result = false;
  }

  return result;
}

function clearSidebarList() {
  $("#shopping-list-sidebar-items tbody").empty();

  return true;
}

function updateHeaderList(oList) {
  var result = true;

  clearHeaderList();

  if (oList.shoppingListItems.length < 1) {
    $("#login-options-list-sub").prepend('<li class="headerlistitem"><a class="mute" href="/shopping-list/viewmylist">No items</a></li>');
    result = false;
  }
  else {
    $("#login-options-list-sub").removeClass("empty");

    // Get an item suitable for cloning
    var jTemplate = $("#headerlist-full");

    // Sort the list appropriately
    oList.shoppingListItems.sort(sortDisplayOrderAsc);

    for (var i = 0; i < 4; i++) {
      var oItem = oList.shoppingListItems[i];

      if (oItem != undefined) {
        var jNew = jTemplate.clone().removeClass("headerlistfooter pad").addClass("headerlistitem").removeAttr("id");

        jNew.find("a").addClass("mute").html(truncateEllipsis(oItem.itemText, 30) + (oItem.quantityText.length ? " (" + oItem.quantityText + ")" : ""));
        $("#login-options-list-sub").prepend(jNew);
      }
    }
  }

  return result;
}

function clearHeaderList() {
  $("#login-options-list-sub").addClass("empty").find("li.headerlistitem").remove();

  return;
}

function deleteListItem(itemLineNumber) {
  ShoppingListAjaxService.deleteItemFromActiveList(
    {listLineNumber: itemLineNumber},
    {callback: function(response) {
      updateWidgets(response);

      if (typeof fCallback == "function") {
        fCallback(response);
      }
    }, errorHandler:handleError});

  return false;
}

function deleteSidebarItem(jqAnchorElem) {
  var itemLineNumber = getUrlParamValue($(jqAnchorElem).attr("href"), "remove");

  if (itemLineNumber != "") {
    deleteListItem(itemLineNumber);
    $(jqAnchorElem).parent().parent().remove();
  }
}

function clearShoppingList(fCallback) {
  ShoppingListAjaxService.clearActiveList({
    callback: function(response) {
      updateWidgets(response);
      if (typeof fCallback == "function") {
        fCallback(response);
      }
    },
    errorHandler:handleError
  });

  return true;
}

function cleanseAddItemUrl(url) {
  return url.replace(/shoppingListItems\[\d+\]\./g, "").replace(/shoppingListItemAttr\[\d+\]\.id\./g, "").replace(/shoppingListItemAttr\[\d+\]\./g, "");
}

function getUrlParamValue(url, paramName, unescapeValue) {
  paramName = paramName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

  var regExStr = "[\\?&]" + paramName + "=([^&#]*)";
  var regEx = new RegExp(regExStr);
  var results = regEx.exec(url);

  return (results == null) ? "" : (unescapeValue) ? unescape(results[1]) : results[1];
}

function sortDisplayOrderAsc(obj1, obj2) {
  return ((obj1.displayOrder < obj2.displayOrder) ? -1 : ((obj1.displayOrder > obj2.displayOrder) ? 1 : 0));
}

function sortDisplayOrderDesc(obj1, obj2) {
  return ((obj1.displayOrder < obj2.displayOrder) ? 1 : ((obj1.displayOrder > obj2.displayOrder) ? -1 : 0));
}

function handleError(message, exc) {
  if (typeof dump == "function") {
    dump("shopping-list-ajax.js: " + message + "\n\n");
  }
}

function isArray(value) {
  return value &&
    typeof value === "object" &&
    typeof value.length === "number" &&
    typeof value.splice === "function" &&
    !(value.propertyIsEnumerable("length"));
}

function toggleListOptions(oList, widgetItemCount) {
  var itemCount = null;

  if (widgetItemCount) {
    itemCount = widgetItemCount;
  }
  else {
    if (oList) {
      itemCount = oList.shoppingListItems.length
    }
    else {
      itemCount = $("#shopping-list-sidebar-items tr").length;
    }
  }

  if (itemCount == 0) {
    $(".widget-shopping-list h3").html("&nbsp;");
    $(".widget-shopping-list").addClass("empty");
    $(".widget-shopping-list .empty-list-content").show();
    $(".widget-shopping-list .add-item").hide();
    $(".widget-shopping-list .view-list").hide();
  }
  else {
    $(".widget-shopping-list h3").html("My Shopping List");
    $(".widget-shopping-list").removeClass("empty");
    $(".widget-shopping-list .empty-list-content").hide();
    $(".widget-shopping-list .add-item").show();
    $(".widget-shopping-list .view-list").show();

    if (itemCount > maxVisibleItems) {
      $(".widget-shopping-list .widget-view-all").show();
    }
    else {
      $(".widget-shopping-list .widget-view-all").hide();
    }
  }
}

function glowElement(jqElem) {
  $(jqElem).animate({backgroundColor: "#ffffcc"}, 300);
  $(jqElem).animate({backgroundColor: "#ffffcc"}, 1000);
  $(jqElem).animate({backgroundColor: "#fff"}, 300);
}

function initShoppingListWidget() {
  $.getScript("/common/js/jquery.color.js");

  toggleListOptions(null, (widgetListItemCount) ? widgetListItemCount : null);

  $("a.add-to-list, a.add-to-card, a.add-to-print").live("click", function() {

    if (!$(this).hasClass("saved") && !$(this).hasClass("listed") &&
        !$(this).hasClass("noCard") && !$(this).hasClass("notLoggedIn")) {

      if (checkMaxECoupons()) {
        // Replace the add to card with simply add to list
        $(this).attr("href", $(this).attr("href").replace("/shopping-list/addtocard?", "/shopping-list/addtomylist?"));
      }

      addItemToListByHREF(this);

      if (!$(this).hasClass("add-to-card")) {
        $(this).addClass("listed");
      }
    }

    return false;
  });

  // Handle adding a new item via direct input
  $("#custom-item-name").val("");

  $(".add-item button").click(function() {
    if (validate("additem")) {
      addItemToListByHREF($("#custom-item-href").val() + $("#custom-item-name").val());
      $("#custom-item-name").val("");
    }

    return false;
  });

  // Attach item removal behavior
  $("#shopping-list-sidebar-items tbody td.item-delete a").live("click", function() {
    deleteSidebarItem(this);
    return false;
  });

  $("#custom-item-name").click(function(){
    $("#custom-item-name").val("");
  });

  $("#custom-item-name").focus(function(){
    $("#custom-item-name").val("");
  });

};

// Generic form validation
function validate(activity) {
  var valid = true;

  $('#widget-shopping-error-message-container').empty().hide();

  var aErrors = [];
  var aBadFields = [];

  switch(activity.toLowerCase()) {

    case 'additem':
      $('#custom-item-name').val($.trim($('#custom-item-name').val()));

      var itemText = $('#custom-item-name').val();

      if (!itemText.length) {
        aErrors.push('An item name is required');
        aBadFields.push($('#custom-item-name'));
      }

      break;
  }

  if (aErrors.length) {
    valid = false;

    for (var i = 0; i < aBadFields.length; i++) {
      if (aBadFields[i]) {
        $(aBadFields[i]).attr('aria-invalid', 'true');
      }
    }

    $('#widget-shopping-error-message-container').html('<h4>Please correct the following:</h4><ul><li>' +
      aErrors.join('</li><li>') + '</li></ul>').show();
  }

  return valid;
}

function truncateEllipsis(str, maxLength) {
  if (str) {
    if (str.length > maxLength) {
      // Truncate the string, then go back to the end of the previous word to
      // ensure that we don't truncate in the middle of a word
      str = str.substring(0, maxLength);
      str = str.replace(/\w+$/, "");

      // Add an ellipses to the end
      str += "...";
    }
  }

  return str;
}

function setAddCouponOverlay() {
  $(".add-to-list-container a.noCard, .add-to-list-container a.notLoggedIn").click(function(e) {

    e.preventDefault();

    var couponHref = $(this).attr("href");

    // Fix for commented code further down. I'm leaving it there for now (01/27/11).
    // HPQC eCoupon defect 127
    $("#overlay-content button").parent("form").attr("action", couponHref);
    // End fix

    $.fancybox(
      $("#account-intercept-overlay").html(), {
        autoDimensions: true,
        centerOnScroll: true,
        titleShow: false,
        transitionIn: 'none',
        transitionOut: 'none',
        showCloseButton: false,
        showNavArrows: false,
        enableEscapeButton: true,
        scrolling: false,
        hideOnOverlayClick: true
      }
    );

    $.fancybox.center;

    //$("#overlay-content button").unbind('click').click(function(evt) {
    //  evt.preventDefault();
    //  window.location = couponHref;
    //});

    $('.popup-close').click($.fancybox.close);
  });
}

function updateCouponOptions(couponId) {

  if ($("div#ecoupon-list").length) {
    // Update pending coupons (set in shopping-list-dwr.js:addItemToListByHREF)
    var pendingClass = "ecoupon-" + couponId;
    var addToCardElem = $("a." + pendingClass);

    if ($(addToCardElem)) {
      $(addToCardElem).removeClass(pendingClass)
                      .addClass("saved")
                      .parents("div.coupon-options")
                      .children("div.add-to-list-container")
                      .each(function(i) {
                        $(this).children("a.add-to-print, a.print-now").remove();
                      })
                      .parents("div.coupon-outer")
                      .children("div.coupon-inner")
                      .removeClass("in-progress");
    }
  }
}

function updateECouponWidget() {
  // If the widget exists...
  if ($("div#ecoupon-summary-widget").length) {

    var currentOffersHtml = $("#couponsOnCard").html();
    var newOfferCount = parseInt(currentOffersHtml.match(/\d+/)) + 1;
    var currentRemainingOfferCount = currentOffersHtml.match(/\(\d+/) + "";

    currentRemainingOfferCount = parseInt(currentRemainingOfferCount.replace("(", "") + "") - 1;

    $("#couponsOnCard").html(newOfferCount + " (" + currentRemainingOfferCount + " Remaining)");

    // Update the potential savings
    if ($("#potentialSavings").length) {
      // Get and increment the current value
      var newPotentialSavings = parseFloat($("#potentialSavings").html().match(/\d+\.?\d*/) + "") + parseFloat(offerValue);

      $("#potentialSavings").html("$" + newPotentialSavings.toFixed(2));
    }
  }
}

function checkMaxECoupons() {
  var atMaxCoupons = false;

  if ($("div#ecoupon-summary-widget").length) {
    var currentOffersHtml = $("#couponsOnCard").html();
    var maxOffers = parseInt($("#maxCouponLimit").val());

    if (parseInt(currentOffersHtml.match(/\d+/)) >= maxOffers) {
      $("#error-message-container").html('<h4>You have reached your maximum of ' + maxOffers +
        ' active coupons saved to your card.</h4><a href="/viewcouponstatus" class="button">Manage My eCoupons</a>');
      scrollIntoView("error-message-container");
      atMaxCoupons = true;
    }
  }

  return atMaxCoupons;
}
