
// Creates a Productview Tag
// Also creates a Pageview Tag by setting pc="Y"
// Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
//
// productID	: required. Product ID to set on this Productview tag
// productName	: required. Product Name to set on this Productview tag
// categoryID	: optional. Category ID to set on this Productview tag 
// searchString	: optional. Internal search string entered by user to reach this Product Detail page. Only usable if pc="Y".
// searchResults : optional.  Total numeric search results count. Only usable if pc="Y".
function cmCreateProductviewTag(productID, productName, categoryID, attributes, cm_vc) {
	cmMakeTag(["tid","5","pi",c1(cm_ClientID) ? c1(cm_ClientID) : "Product: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

// Creates a Shop tag with Action 5 (Shopping Cart)
//
// productID	: required. Product ID to set on this Shop tag
// quantity	: required. Quantity to set on this Shop tag
// productPrice	: required. Price of one unit of this product
// categoryID	: optional. Category to set on this Shop tag
// PLEASE NOTE: parameter "attributes" has been included after parameter "extrafields" to accomodate "giftwrap"
function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, extraFields, attributes) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmExtraFields",extraFields,"cmAttributes",attributes,"ha1",cm_hex_sha1(hashValue),"cc",cm_currencyCode,"at","5","tid","4","pc","N"]);
}

// Creates a Shop tag with Action 9 (Order Receipt / Confirmed)
//
// productID	: required. Product ID to set on this Shop tag
// productName	: required. Product Name to set on this Shop tag
// quantity	: required. Quantity to set on this Shop tag
// productPrice	: required. Price of one unit of this product
// customerID	: required. ID of customer making the purchase
// orderID	: required. ID of order this lineitem belongs to
// orderTotal	: required. Total price of order this lineitem belongs to
// categoryID	: optional. Category to set on this Shop tag
// PLEASE NOTE: parameter "attributes" has been included after parameter "extrafields" to accomodate "giftwrap"
function cmCreateShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, extraFields, attributes) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmExtraFields",extraFields,"cmAttributes",attributes,"ha1",cm_hex_sha1(hashValue),"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N"]);
}

// Creates an Order tag
//
// orderID			: required. Order ID of this order
// orderTotal		: required. Total of this order (minus tax and shipping)
// orderShipping	: required. Shipping charge for this order
// customerID		: required. Customer ID that placed this order
// customerCity		: optional. City of Customer that placed this order
// customerState	: optional. State of Customer that placed this order
// customerZIP		: optional. Zipcode of Customer that placed this order
// PLEASE NOTE: parameter "attributes" has been included after parameter "extrafields" to accomodate "in-StorePickUp"

function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,extraFields,attributes) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    orderShipping = orderShipping.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");	
	cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cmExtraFields",extraFields,"cmAttributes",attributes,]);
}

// Creates a Registration tag and/or a Newsletter tag
//
// customerID		: required for Registration. ID of Customer to register.
// customerEmail	: required for Newsletters. Optional for Registration.
// customerCity		: optional. City of Customer that placed this order
// customerState	: optional. State of Customer that placed this order
// customerZIP		: optional. Zipcode of Customer that placed this order
function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, newsletterName, subscribe, customerCountry, attributes) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletterName,"sd",subscribe,"cy",customerCountry,"cmAttributes",attributes]);
}
