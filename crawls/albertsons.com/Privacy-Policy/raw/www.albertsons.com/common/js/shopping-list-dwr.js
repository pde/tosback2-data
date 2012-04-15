var offerValue;

// Shopping list classes
function CustomerJS() {}
function ShoppingListJS() {}
function ShoppingListItemJS(options) {
  if (options)
    for (var p in options)
      // Dynamically set acceptable properties
      switch(p) {
        case 'itemText':
        case 'categoryCode':
        case 'quantityText':
        case 'listLineNumber':
        case 'displayOrder':
          this[p] = options[p];
          break;
        case 'attributeCode':
          // Possible attributeCode values:
          // "OnSale" (circular)
          // "Coupon"
          // "CustomRecipe" (user-defined recipe)
          // "ThirdPartyRecipe" (all other recipes)
        case 'attributeId':
        case 'attributeValue':
        case 'expDate':
        case 'description':
        case 'productCode':
          this.shoppingListItemAttr[0][p] = options[p];
          break;
        default:
          console.log('shopping-list-dwr.js: ShoppingListItemJS - Error setting shopping list item property "' + p);
          break;
      }
  return this;
}

ShoppingListItemJS.prototype.itemText = null;
ShoppingListItemJS.prototype.categoryCode = null;
ShoppingListItemJS.prototype.quantityText = null;
ShoppingListItemJS.prototype.listLineNumber = null;
ShoppingListItemJS.prototype.shoppingListItemAttr = [new ShoppingListItemAttrJS()];

function ShoppingListItemAttrJS() {
  return this;
}

ShoppingListItemAttrJS.prototype.attributeCode = null;
ShoppingListItemAttrJS.prototype.attributeId = null;
ShoppingListItemAttrJS.prototype.attributeValue = null;
ShoppingListItemAttrJS.prototype.expDate = null;
ShoppingListItemAttrJS.prototype.description = null;
ShoppingListItemAttrJS.prototype.productCode = null;

function ShoppingListItemPkJS() {}
function ShoppingListItemAttrPkJS() {}

function addItemToListByHREF(eAnchor) {
  var itemUrl;
  var isAnchorElem = false;
  var isCouponListPage = $("div#ecoupon-list").length; // Element exists on page
  var isAddToCard = false;

  if (typeof eAnchor == "string") {
    itemUrl = eAnchor;
  }
  else {
    itemUrl = $(eAnchor).attr("href");
    isAnchorElem = true;
    isAddToCard = $(eAnchor).hasClass("add-to-card");
    if (isCouponListPage && isAddToCard &&
        !$(eAnchor).hasClass("notLoggedIn") && !$(eAnchor).hasClass("noCard")) {
      $(eAnchor).parents("div.coupon-outer")
                .children("div.coupon-inner")
                .addClass("in-progress");
    }
  }

  var cleanUrl = cleanseAddItemUrl(itemUrl);
  var itemText = truncateEllipsis(getUrlParamValue(cleanUrl, "itemText", true).replace(/\+/g, ' '), 100);
  var attributeCode = getUrlParamValue(cleanUrl, "attributeCode");
  var attributeId = getUrlParamValue(cleanUrl, "attributeId");
  //var attributeValue = itemText;
  var attributeValue = getUrlParamValue(cleanUrl, "attributeValue");
  var expirationDate = getUrlParamValue(cleanUrl, "expDate");
  var displayOrder = getUrlParamValue(cleanUrl, "displayOrder");
  var description = getUrlParamValue(cleanUrl, "description");
  var productCode = getUrlParamValue(cleanUrl, "productCode");

  try {
    offerValue = parseFloat(getUrlParamValue(cleanUrl, "OfferValue"));
  }
  catch(e) {
    offerValue = 0;
  }

  if (isCouponListPage && isAnchorElem && isAddToCard && attributeCode == "eCoupon") {
    $(eAnchor).addClass("ecoupon-" + attributeId);
  }

  var oItem = new ShoppingListItemJS({
    itemText: itemText,
    categoryCode: "",
    quantityText: "1",
    attributeCode: attributeCode,
    attributeValue: attributeValue,
    attributeId: attributeId,
    expDate: expirationDate,
    description: description,
    displayOrder: 0,
    productCode: productCode
  });

  return addShoppingListItem(oItem);
}
