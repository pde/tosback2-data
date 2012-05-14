










//Preload the loading image for both uc and qv.
preload_QV_UC_loading = new Image();
preload_QV_UC_loading.src = 'http://images.orchardbrands.com/blair/assets/images/img/loading.gif';

/* Persistant Cart (universal cart) Javascript */
/* --------------------------------------------- */

// Commands
// persistantCartCommands[0] = "showProduct" action
// persistantCartCommands[1] = "addProduct" action
// persistantCartCommands[2] = "addEnsemble" and "addProducts" action
// persistantCartCommands[3] = "remove" action
// persistantCartCommands[4] = "addCatalogItems" action
// persistantCartCommands[5] = "addProductWishlist" action
// persistantCartCommands[6] = "addAllProductsWishlist" action
// persistantCartCommands[7] = "updateProduct" action

var persistantCartCommands = new Array(4);
persistantCartCommands[0] = '/checkout/universal_cart.jsp';
persistantCartCommands[1] = '/checkout/add_item_pc.cmd';
persistantCartCommands[2] = '/checkout/add_items_pc.cmd';
persistantCartCommands[3] = '/checkout/delete_item_in_cart.cmd';
persistantCartCommands[4] = '/checkout/add_catalog_order_items_pc.cmd';
persistantCartCommands[5] = '/user/add_wishlist_item_to_basket_pc.cmd';
persistantCartCommands[6] = '/user/add_all_wishlist_items_to_basket_pc.cmd';
persistantCartCommands[7] = '/checkout/add_item_pc.cmd';
persistantCartCommands[8] = '/catalog/ensemble_add_item_pc.cmd';


var requestURL = "";
var persistantCartContainerId = "#widget-ucart";
var persistantCartCloseButClass = ".widget-ucart-close-but";
var hideTimeOuts;

var ucartLoadingHTML = '<div id="widget-ucart" class="vposfixed">' +
'<div id="glo-ucart-top" class="widget-ie6png"><!-- --></div>' +
'<div id="glo-ucart-body" class="widget-ie6png">' +
'<div id="glo-ucart-content">'+
'<div class="widget-ima-loader"><img src="http://images.orchardbrands.com/blair/assets/images/img/loading.gif" alt="Loading..."/></div>' +
'</div>' +
'</div>' +
'<div id="glo-ucart-bottom" class="widget-ie6png"><!-- --></div>' +
'</div>';

/* Function(s) to Show the Basket Layer */
function showBasket(action, params, id) {
clearAllTimeouts();
showloading();
lib.layer.ie6Fix("#widget-ucart", "a");

if( (action == "show") || (action == "personalized") || (action == "showFromQuickview") ){
requestURL = persistantCartCommands[0];
}
else if(action == "addProducts"){
requestURL = persistantCartCommands[2];
}
else if(action == "addEnsemble"){
requestURL = persistantCartCommands[2];
}
else if(action == "remove"){

requestURL = persistantCartCommands[3];
}
else if(action == "addCatalogItems"){
requestURL = persistantCartCommands[4];
}
else if(action == "addProductWishlist"){
var removeItemFromDisplay = true;
requestURL = persistantCartCommands[5];
}
else if(action == "addAllProductsWishlist"){
var removeAllItemsFromDisplay = true;
requestURL = persistantCartCommands[6];
}
else if(action == "updateProduct"){
requestURL = persistantCartCommands[7];
}
else if(action == "addProductsEnsemble"){
requestURL = persistantCartCommands[8];
}
else {
alert("missing action");
}

var headerPos = $('#header-wrapper .shoppingCartWrap').position(),
headerHeight = $('#header-wrapper .shoppingCartWrap').height(),
windowScroll = $(window).scrollTop();

if((headerPos.top + headerHeight) < windowScroll){
$("#widget-ucart").stop(false, true).animate({"top": (windowScroll + 5)}, "slow" );
}else{
$("#widget-ucart").stop(false, true).animate({"top": (headerPos.top + headerHeight)}, "slow" );
}

requestURL = requestURL;
params = "ts=" + timestamp() + "&action=" + action + "&" + params;
$.ajax({
type: "POST",
url: requestURL,
data: params,
dataType: "html",
async: false,
timeout: 15000,
success: function(data) {
if( removeItemFromDisplay ) {
$("#item_container_" + id).addClass("movedToCart");
$("#item_container_" + id).html("This item has been<br/>moved to your cart");
} else if ( removeAllItemsFromDisplay ) {
$("#wishlist_table").addClass("movedToCart");
$("#wishlist_table").html("All items from your Wish List have been moved to your cart.");
}

hideloading();
$(persistantCartContainerId).append(data);
$(persistantCartContainerId).show();
lib.layer.ie6Fix("#widget-ucart", "u");
return true;
},
error: function() {
hideloading();
lib.layer.ie6Fix("#widget-ucart", "r");
return false;
}
});
};

function showloading() {
var jumpToTop = (window.pageView != 'ENSEMBLE_PAGE' && "3" == window.template);
if (jumpToTop) {
document.location="#topOfPage";
}
$(persistantCartContainerId).remove();

//load, position, show new cart
$("body").append(ucartLoadingHTML);
positionPersistantCart();
$(persistantCartContainerId).show();

// add an event for close layer.
//$(persistantCartCloseButClass).click(function() { hideBasket(); });
};

function hideloading() {
$(persistantCartContainerId + " *").remove();
$(persistantCartContainerId).html("");
};

function updateToCart() {
params = "productName=" + $("input[@name=productName]").val() +
"&productId=" + $("input[@name=productId]").val() +
"&categoryId=" + $("input[@name=categoryId]").val() +
"&parentCategoryId=" + $("input[@name=parentCategoryId]").val() +
"&subCategoryId=" + $("input[@name=subCategoryId]").val() +
"&redirectPath=" + $("input[@name=redirectPath]").val() +
"&source=" + $("input[@name=source]").val();

// iterate through product variants of the product
index = 0;
variantName = 'productVariantId';
variantValue = '';
quantityName = 'quantity';
quantityValue = '';

$(".the-variant-ids").each(function() {
if ($(this).val() != '') {
variantName = $(this).attr("name");
variantValue = $(this).val();
quantity = $(".the-variant-qtys").eq(index);
quantityName = quantity.attr("name");
quantityValue = quantity.val();

return false; // break
}
index++;
});

params = params + "&" + variantName + "=" + variantValue;
params = params + "&" + quantityName + "=" + quantityValue;

//see if this is an update.
if( $("input[@name=itemGUID]").val() )
{ params = params + "&itemGUID=" + $("input[@name=itemGUID]").val() + "&isUpdate=1"; }

showBasket('updateProduct',params);
};

function addToCart(type) {
params = "productName=" + $("input[@name=productName]").val() +
"&productId=" + $("input[@name=productId]").val() +
"&categoryId=" + $("input[@name=categoryId]").val() +
"&parentCategoryId=" + $("input[@name=parentCategoryId]").val() +
"&subCategoryId=" + $("input[@name=subCategoryId]").val();

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
if( $("input[@name=itemGUID]").size() > 0 )
{ params = params + "&itemGUID=" + $("input[@name=itemGUID]").val(); }

showBasket('addProducts', params);
};

function wishListAddToCart(id, params) {
showBasket('addProductWishlist', params, id);
};

function wishListAddAllToCart(params) {
showBasket('addAllProductsWishlist', params);
};

function addEnsembleToCart(type) {
params = "productName=" + $("input[@name=productName]").val() +
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

params = params + "&productCount=" + $(".the-variant-ids").length;
showBasket('addEnsemble',params);
};

function updateHeader(amt, total) {
if(amt == 1)
{ $("#widget-ucart-item-count").text(amt + " item(s) " + total);}
else
{ $("#widget-ucart-item-count").text(amt + " item(s) " + total);}
};

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
clearTimeout(hideTimeOuts);
};

function timestamp() { return new Date().getTime(); }

//Edit this function if need to do something special on basket close.
function hideBasket() {
$(persistantCartContainerId).hide();
$(persistantCartContainerId).remove();

shoppingBagBut = $("#widget-header-active-link").eq(0);
$(shoppingBagBut).attr("id","")
$(shoppingBagBut).mouseout();
lib.layer.ie6Fix("#widget-ucart", "r");
};

//edit this function to update the setup
function setupPersistantCartButtons() {
var jumpToTop = (window.pageView != 'ENSEMBLE_PAGE' && "3" == window.template);
if (jumpToTop) {
// draw focus near this
document.location="#topOfPage";
}

$(persistantCartCloseButClass).unbind("click").click(function() {
hideBasket();
});
$(persistantCartCloseButClass).attr("href","javascript:void(0)");
};

//edit this function to position cart.
function positionPersistantCart() {
newLeft = 10 + ($("body").width() / 2) + ( $("#mainDiv").width() / 2 ) - $(persistantCartContainerId).width();
newTop = $("#widget-but-ucart").get(0).offsetTop + $("#widget-but-ucart").get(0).offsetHeight;

$(persistantCartContainerId).css("left", newLeft+"px");
$(persistantCartContainerId).css("top", newTop+"px");
};
/* ---------------------------------------- */


/* QuickView Javascript */
/* ---------------------------------------- */

//quickViewcommands[0] = "show" action
//quickViewcommands[1] = "add product" action
var quickViewCommands = new Array(2);
quickViewCommands[0] = '/catalog/quickview.jsp';
quickViewCommands[1] = '/catalog/qv_add_item_pc.cmd';
quickViewCommands[2] = '/checkout/qv_personalization_add.cmd';

var quickViewContainerId = "#widget-quickview";
var quickViewCloseButtonsClass = ".widget-quickview-but-close";
var quickViewCloseButtonsAdd = ".widget-quickview-but-add";

var quickviewContainerHTML = '<div id="widget-quickview"></div>';
var quickviewLoadingHTML = '<div id="cat-quickview-top" class="widget-ie6png"><!-- --></div>' +
'<div id="cat-quickview-body" class="widget-ie6png">' +
'<div id="cat-quickview-content">'+
'<div class="widget-ima-loader"><img src="http://images.orchardbrands.com/blair/assets/images/img/loading.gif" alt="Loading..."/></div>' +
'</div>' +
'</div>' +
'<div id="cat-quickview-bottom" class="widget-ie6png"><!-- --></div>';


/* Function(s) for QuickView */
function loadQuickView(params,selector) {
closeQuickView();
addQuickView(selector);
ajaxQuickView(quickViewCommands[0],params);

// if this is an edit, want to have this appear above the cart.
if( params.indexOf("itemGUID") != -1 ){
hideBasket();
$(quickViewContainerId).css("z-index", "20");
}
};

function addQuickView(selector) {
//pageView = pageView + "_QUICKVIEW";
$(selector).append(quickviewContainerHTML);
$(quickViewContainerId).append(quickviewLoadingHTML);
adjustQuickviewLocation();
$(quickViewContainerId).show();
lib.layer.ie6Fix("#widget-quickview", "a");
};

function closeQuickView() {
//pageView = pageView.replace(/_QUICKVIEW/, "");
$(quickViewContainerId).remove();
lib.layer.ie6Fix("#widget-quickview", "r");
};

function ajaxQuickView(page,params) {
params = "rId=" + new Date().getTime() + "&" + params;
$.ajax({
type: "POST",
url: page,
data: params,
dataType: "html",
success: function(msg) {
$(quickViewContainerId +" *").remove();
$(quickViewContainerId).html("");
$(quickViewContainerId).append(msg);
}
});
};

function addProductFromQuickView(params) {
params = params +
"&productName=" + $("#productName").val() +
"&productVariantId=" + $("#productVariantId_qv").val() +
"&quantity=" +$("#quantity").val();

if( $(quickViewContainerId + " input[@name=itemGUID]").size() > 0 )
{ params = params + "&itemGUID=" + $(quickViewContainerId + " input[@name=itemGUID]").val(); }
if( $(quickViewContainerId + " input[@name=onBasketPage]").size() > 0 )
{ params = params + "&onBasketPage=" + $(quickViewContainerId + " input[@name=onBasketPage]").val(); }
if( $(quickViewContainerId + " input[@name=onCheckoutPage]").size() > 0 )
{ params = params + "&onCheckoutPage=" + $(quickViewContainerId + " input[@name=onCheckoutPage]").val();}
if( $(quickViewContainerId + " input[@name=sourcePage]").size() > 0 )
{ params = params + "&sourcePage=" + $(quickViewContainerId + " input[@name=sourcePage]").val();}

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
} else {
params = params + "&" + $(this).attr("name") + "=false";
}
});

$(quickViewContainerId + " *").remove();
$(quickViewContainerId).append(quickviewLoadingHTML);
ajaxQuickView(quickViewCommands[1],params);
};

var qvInterval;

function setupQuickViewButtons() {
$(quickViewCloseButtonsClass).unbind("click").click(function() { closeQuickView(); });

qvInterval = setInterval( "adjustQuickviewLocation();" , 100);
setTimeout(function() { clearInterval(qvInterval); }, 1000);
adjustQuickviewLocation();
};

// Edit this per site to adjust location
function adjustQuickviewLocation() {
var bWindowOffsets = getScrollXY();
var bWindowViewport = getViewportSize();
var qvTop = ((bWindowViewport[1] / 2) - ($(quickViewContainerId).height() / 2)) + bWindowOffsets[1];
qvTop = (qvTop < 0) ? 100 : qvTop;
$(quickViewContainerId).css("top",qvTop+"px");
};
/* ---------------------- */

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
return [ vpW, vpH ];
};
// ------------------------------------------------

/* Quickview setup */
function setup_quickview() {
var qTimer;
var imgHTML = '<a href="#"><img class="widget-ie6png" id="widget-quickview-but" title="Click to view or edit item details without leaving this page." src="http://images.orchardbrands.com/blair/assets/images/btn/quickview.png" alt="Click to view or edit item details without leaving this page."/></a>';
var queryParam1;
var queryParam2;
$(".widget-app-quickview").each(function() {
$(this).parent().parent().css("position","relative");
$(this).mouseover(function() {
if( typeof qTimer != undefined )
{
clearTimeout(qTimer);
$("#widget-quickview-but").parent().remove();
}
$(this).parent().parent().append(imgHTML);
$("#widget-quickview-but").css("position","absolute");
$("#widget-quickview-but").css("left", "10px");
qTop = $(".widget-app-quickview", $("#widget-quickview-but").parent().parent()).height() - $("#widget-quickview-but").height() - 2 - 10;
$("#widget-quickview-but").css("top", qTop+"px");
$("#widget-quickview-but").mouseover(function() {
if(typeof qTimer != undefined)
{ clearTimeout(qTimer); }
});
$("#widget-quickview-but").parent().click(function(ev) {

queryParam1 = $(this).parent().attr("id").split(";")[0];
queryParam2 = "&" + $(this).parent().attr("id").split(";")[1];

type = queryParam1.split("-")[0];
id = queryParam1.split("-")[1];

if( type == "p" )
{ params = "productId="+id;}
else
{ params = "ensembleId="+id; }
params = params + queryParam2;

loadQuickView(params, $("body"));
});
$("#widget-quickview-but").parent().attr("href","javascript:void(0)");
});
$(this).mouseout(function() {
qTimer = setTimeout(function() { $("#widget-quickview-but").parent().remove(); }, 100);
});
});
};

function setup_quickview_basket() {
var qTimer;
var imgHTML = '<a href="#" title="Click to view or edit item details without leaving this page."><img class="widget-ie6png" id="widget-quickview-but" src="http://images.orchardbrands.com/blair/assets/images/btn/quickview_cart.png" alt="Click to view or edit item details without leaving this page."/></a>';
$(".widget-app-quickview-basket").each(function(){
$(this).parent().parent().css("position","relative");

$(this).hover(function(){
clearTimeout(qTimer);
if($("#widget-quickview-but").length == 0){
$(this).parent().parent().append(imgHTML);
$("#widget-quickview-but").hover(function(){
clearTimeout(qTimer);
},
function(){
qTimer = setTimeout(function() { $("#widget-quickview-but").parent().remove(); }, 100);
});
$("#widget-quickview-but").parent().click(function(evt){
evt.preventDefault();
params = $("span", $(this).parent()).text();
loadQuickView(params, $("body"));
});
$("#widget-quickview-but").parent().attr("href","#");
}
},
function(){
qTimer = setTimeout(function() { $("#widget-quickview-but").parent().remove(); }, 100);
});

});
};


$(function() {
setup_quickview();
setup_quickview_basket();
});
/* -------------------------- */


jQuery.fn.replaceWith = function(replacement) {
return this.each(function(){
element = $(this);
$(this)
.after(replacement).next()
.attr('class', element.attr('class')).attr('id',element.attr('id'))
.html(element.html())
.prev().remove();
});
};


/* ---------------------------------------- */
/* Viewing Shopping Cart Id Javascript */
/* ---------------------------------------- */
var scartIdContainerId = "#widget-scartid";
var scartIdCloseButtonsClass = ".widget-scartid-but-close";

var scartIdContainerHTML = '<div id="widget-scartid"></div>';


/* Function(s) for viewing Shopping Cart Id */
function loadShoppingCartId(params,selector) {
closeShoppingCartId();
addShoppingCartId(selector);
ajaxShoppingCartId('/checkout/shopping_cart_id.cmd',params);
$(scartIdContainerId).css("z-index", "20");
};

function addShoppingCartId(selector) {
$(selector).append(scartIdContainerHTML);
lib.layer.ie6Fix("#widget-scartid", "a");
adjustShoppingCartIdLocation();
$(scartIdContainerId).show();
};

function closeShoppingCartId() {
$(scartIdContainerId).remove();
lib.layer.ie6Fix("#widget-scartid", "r");
};

function ajaxShoppingCartId(page,params) {
params = "rId=" + new Date().getTime() + "&" + params;
$.ajax({
type: "POST",
url: page,
data: params,
dataType: "html",
success: function(msg) {
$(scartIdContainerId +" *").remove();
$(scartIdContainerId).html("");
$(scartIdContainerId).append(msg);
}
});
};
// Edit this per site to adjust location
function adjustShoppingCartIdLocation() {
var bWindowOffsets = getScrollXY();
var bWindowViewport = getViewportSize();
var qvTop = ((bWindowViewport[1] / 2) - ($(scartIdContainerId).height() / 2)) + bWindowOffsets[1];
qvTop = (qvTop < 0) ? 100 : qvTop;
$(scartIdContainerId).css("top",qvTop+"px");
};

function setupSCIdButtons() {
$(scartIdCloseButtonsClass).unbind("click").click(function() { closeShoppingCartId(); });

var qvInterval = setInterval( "adjustShoppingCartIdLocation();" , 100);
setTimeout(function() { clearInterval(qvInterval); }, 1000);
adjustShoppingCartIdLocation();
};


/* ------------------------------------------------------------------------------------------------------*/
/* Viewing More Information about Shipping and Tax calculations in Shopping Cart Javascript */
/* ------------------------------------------------------------------------------------------------------*/
var scartMoreInfoContainerId = "#widget-scart-moreinfo";
var scartMoreInfoCloseButtonsClass = ".widget-scart-moreinfo-but-close";

var scartMoreInfoContainerHTML = '<div id="widget-scart-moreinfo"></div>';


/* Function(s) for viewing More Information in Shopping Cart */
function loadSCMoreInfo(selector) {
closeSCMoreInfo();
addSCMoreInfo(selector);
ajaxSCMoreInfo('/checkout/shopping_cart_more_info.jsp');
$(scartMoreInfoContainerId).css("z-index", "20");
};

function addSCMoreInfo(selector) {
$(selector).append(scartMoreInfoContainerHTML);
lib.layer.ie6Fix("#widget-scartid-moreinfo", "a");
adjustSCMoreInfoLocation();
$(scartMoreInfoContainerId).show();
};

function closeSCMoreInfo() {
$(scartMoreInfoContainerId).remove();
lib.layer.ie6Fix("#widget-scartid-moreinfo", "r");
};

function ajaxSCMoreInfo(page) {
params = "rId=" + new Date().getTime();
$.ajax({
type: "POST",
url: page,
data: params,
dataType: "html",
success: function(msg) {
$(scartMoreInfoContainerId +" *").remove();
$(scartMoreInfoContainerId).html("");
$(scartMoreInfoContainerId).append(msg);
}
});
};
// Edit this per site to adjust location
function adjustSCMoreInfoLocation() {
var bWindowOffsets = getScrollXY();
var bWindowViewport = getViewportSize();
var qvTop = ((bWindowViewport[1] / 2) - ($(scartMoreInfoContainerId).height() / 2)) + bWindowOffsets[1];
qvTop = (qvTop < 0) ? 100 : qvTop;
$(scartMoreInfoContainerId).css("top",qvTop+"px");
};

function setupSCMoreInfoButtons() {
$(scartMoreInfoCloseButtonsClass).unbind("click").click(function() { closeSCMoreInfo(); });

var qvInterval = setInterval( "adjustSCMoreInfoLocation();" , 100);
setTimeout(function() { clearInterval(qvInterval); }, 1000);
adjustSCMoreInfoLocation();
};