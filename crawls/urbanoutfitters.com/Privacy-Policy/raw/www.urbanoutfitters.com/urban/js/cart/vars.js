/*
	global variables
*/

// browsers 
var ie = (document.all) ? true : false;

// default shipping values
var defaultCountryID = "0000";
var defaultStateID = "AK";
var defaultCanStateID = "AB";
var defaultAusStateID = "ACT";

// ajax response vars
var curCheckout = null;
var curPrices = null;
var curSavedForLater = null;
var numCartItems = 0;
var numSavedForLater = 0;

// loggedin, recognized, anonymous
var userStatus = null;
// existing, new, guest
var userType = null;

// cart tool tip vars
var cartToolTipDiv = null;
var cartToolTipMsg = "";
var cartToolTipDisplay = "none";
var xOffset = 120;
var yOffset = 65;

// global vars for message faders
var ajaxCartOpac = 100;
var ajaxCartFadeTimer = null;
var ajaxCartMsgTimer = null;
var ajaxCartTimer = 500;
var cartProcessing = false;

// current cart toggle
var curCartSaved = "cartContainer";

// modal window tracker
var curModalWinID = "";

// inventory codes map
var inventoryCodes = new Array("_1000","_1001","_1003");
inventoryCodes["_1000"] = "In Stock";
inventoryCodes["_1001"] = "Out of Stock";
inventoryCodes["_1003"] = "Backordered";

// stores saved responses returned from AJAX calls
var savedShippingAddressColl = null;
var savedGiftlistAddressColl = null;
var savedCreditCardColl = null;
var savedBillingAddressColl = null;
var allCountries = null;

// gift wrap options map
var giftOptionChoices = new Array("_0","_3","_4");
giftOptionChoices["_0"] = "";
giftOptionChoices["_3"] = "Self Wrap - $3.00";
giftOptionChoices["_4"] = "Gift Box - $4.00";

// boolean for forgot password
var hasEmail = false;

// profile variables
var profileLocation = "";
var userID = "";
var userEmail = "";

// first time through cart load and saved for later
var firstTime = true;
var firstTimeSaved = true;

// tracks line item discount total for order
var totalLineItemDiscount = 0;

// track line item color and size arrays
var allLineItemData = new Array();

// endless page variables
var pageIncr = 7;
var pageNum = 1;
var lineItemStart = 0;
var lineItemEnd = 7;
var checkInterval = 200;
var preloadDistance = 25;
var isUpdating = false;
var hasData = true;
var updatePageTimer = null;
var useCurPageNum = false;

// determine if quantity updated for line item exceeds inventory
var qtySubmitted = 0;
var newQty = 0;
var origQty = 0;
var newQtySku = "";
var cartAction = "";
var numLineItems = 0;

// determine if user has any out of stock items
var hasOutOfStockItem = false;

// name of cookie to track persistant virtual categories 
var cookieName = "persistantCatValues";	
// name of cookie to track gift list address used at checkout
var giftListCookie = "shipToGiftList";
// boolean to track 
var shippingToGiftList = false;

// scene 7 base url
var scene7Url = "//images.urbanoutfitters.com/is/image/UrbanOutfitters/";

// egift required fields
var egiftRecipientNameErr = false;
var egiftRecipientEmailErr = false;

// paypal
var payPalErrMsg = "PayPal isn't available at this time, please select a different method of payment";