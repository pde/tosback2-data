 /**********************************************
@title:  pixelManagementService.js
@author:  Andrew Southwick
@date:    04-07-2010
@rev:     1.0
@desc:    Pixel Management Service - this is the principle JS Controller framework file for pixel management which
is exposed for WCD to manage pixels through Pixel Definitions within content at runtime.

Functional Notes:
1) STEP 1: Initialization: Read the pixelPartnerPersistedRegistry variable from the cookie and populate 
the cookie string data in the model as pixelPartnerPersistedRegistryFromCookie.

2) STEP 1: Initialization: Convert the pixelPartnerPersistedRegistryFromCookie to an array of pixelPartner 
objects, and instantiate new pixelPartner objects which would only have the following properties populated: 
1. prefix, 2. startDate 3. endDate.

3) STEP 1: Initialization complete - this happens before any pixelPartners in the pixelPartnerRegistry are 
processed.

4) STEP 2: Process pixelPartnerRegistry: When we iterate through the pixelPartnerRegistry, we need to detect 
if the pixelPartner from the registry is already in the pixelPartnerPersistedRegistry - this can be done quickly by
doing an indexOf on the pixelPartnerPersistedRegistryFromCookie string. 

NOTE: IN STEP 2 ITEM 4.a AND 4.b ARE NOT NEEDED BECAUSE THE FINAL SERIALIZATION OF THE PERSISTED REGISTRY OCCURS AT STEP 5.B.
a. If we find a match in the pixelPartnerPersistedRegistryFromCookie string, then we should update that string with 
the latest startDate and endDate from the pixelPartner objects that is in the pixelPartnerRegistry. 
b. When this is updated we should persist the newly updated pixelPartnerPersistedRegistryFromCookie to the cookie variable
"pixelPartnerPersistedRegistry".

5) STEP 3: Final Cleanup after the pixelPartnerRegistry has been scanned, we should then perform a final loop over 
the pixelPartnerPersistedRegistry to detect any outdated pixelPartners. 

a. If an outdated partner is found, do a cleanup on all variables in the cookie related to that partner, and remove
the pixelPartner from the pixelPartnerPersistedRegistryFromCookie, and from the pixelPartnerPersistedRegistry. 
To do the registry update - copy the pixelPartner currently in the pixelPartnerPersistedRegistry to the
pixelPartnerPersistedValidRegistry with push. When you complete iteration over the pixelPartnerPersistedRegistry then clear the
pixelPartnerPersistedRegistry.clear() - and then change the reference of the pixelPartnerPersistedRegistry to the 
pixelPartnerPersistedValidRegistry. 
b.Finally, write the now updated and cleaned up pixelPartnerPersistedRegistryFromCookie variable to the cookie. 
This should be based on a final loop over the new completely validated pixelPartnerPersistedRegistry.
  
1) When we write to the cookie any variable we would also write the pixelPartner to the pixelPartnerPersistedRegistry.
 
2) We would also update the pixelPartnerPersistedRegistry variable.  
This variable contains a list of all pixel partner prefixes.
 
The pixelPartnerPersistedRegistry variable does not have a prefix because it is global to the service.
example format:
mpt_<startDate>-<endDate>,abc_<startDate>-<endDate>,myTestPrefix_<startDate>-<endDate>,aaa_<startDate>-<endDate>,bbb_<startDate>-<endDate>,cccc_<startDate>-<endDate>
 
At runtime compare the pixelPartnerPersistedRegistry variable with the actual registry and if the 
prefix is in the pixelPartnerPersistedRegistry but NOT in the registry, then check the start and end dates for the 
pixelPartnerPrefix that was detected in the pixelPartnerPersistedRegistry startDate and endDate variables.
If the end date is already passed, then execute a cleanup operation on that partner's cookie variables.

@assumes: prototype.js 1.5 rel.
@assumes: no additional depedencies.
********************************/
 

var PixelManagementService = Class.create();

PixelManagementService.prototype = {
    isActive: true,
    initialize:function() {
		var main = this.controller.init.main.bind(this);
		main();	
	},
	constants:{
		PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME:"pixelManagementPersist",
		PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST:"pixelPartnerList",
		PIXEL_MANAGEMENT_TRANSMISSIONS_ELEMENT_NAME:"pixelManagementTransmissions",
		PIXEL_PARTNER_TRANSMISSION_ELEMENT_ID_PREFIX:"pixelPartnerTransmission_",
		DATE_IN_USE:brandConst.DATE_IN_USE
	},
	constructors:{
		
	},
	model:{
		isInitializationComplete:false,
		pixelPartnerRegistry:[],
		pixelPartnerWaitingRegistry:[],
		pixelPartnerToCleanRegistry:[],
		pixelPartnerTransmissionLog:[],
		metricsLibrary:{},
		pixelPartners:{},
		pixelPartnerPersistedRegistryFromCookie:null,
		pixelPartnerPersistedRegistry:[],
		pixelPartnerCookieVarPrefixMap:{},
		isPersonalizationDataReady:false
	},
	controller: {
		init:{
			main:function() {
				if (this.isActive) {
					var personalizationDataReadyHandler = this.controller.eventHandlers.personalizationDataReadyHandler.bind(this);
					Event.observe(document, "personalizationData:ready", personalizationDataReadyHandler);
					var domLoadedHandler = this.controller.eventHandlers.domLoadedHandler.bind(this);
					if(/product.do$/.test(document.location.pathname)) {
                        // product page specific custom event 
                        Event.observe(document, "productPage:ready", domLoadedHandler);
					} else {
						// Standard event
                        processingService.api.addApplicationMethodToRegistry(domLoadedHandler, "pixel management service");
                    }
				}
			}
		},
		eventHandlers:{
			domLoadedHandler:function() {
				var isPersonalizationDataReady = pixelManagementService.model.isPersonalizationDataReady;
				var pixelManagementServiceReadyHandler = this.controller.eventHandlers.pixelManagementServiceReadyHandler.bind(this);
				if (isPersonalizationDataReady) {
					pixelManagementServiceReadyHandler();
				} else {
					Event.observe(document, "personalizationData:ready", pixelManagementServiceReadyHandler);
				}
			},
			personalizationDataReadyHandler:function() {
				pixelManagementService.model.isPersonalizationDataReady = true;
			},
			pixelManagementServiceReadyHandler:function() {
				var isInitializationComplete = this.model.isInitializationComplete;
				if (!isInitializationComplete) {
					var setMetricsLibraryBound = this.controller.metricsLibraryManager.setMetricsLibrary.bind(this);
					setMetricsLibraryBound();

					//STEP 1: Initialization: Read the pixelPartnerPersistedRegistry
					var inspectPixelPartnerPersistedRegistryBound = this.controller.pixelPartnerManager.inspectPixelPartnerPersistedRegistry.bind(this);
					inspectPixelPartnerPersistedRegistryBound();
					
					var inspectPixelPartnerRegistryBound = this.controller.pixelPartnerManager.inspectPixelPartnerRegistry.bind(this);
					inspectPixelPartnerRegistryBound();
					isInitializationComplete = true;
					this.model.isInitializationComplete = isInitializationComplete;
				}
			}
		},
		metricsLibraryManager:{},
		pixelPartnerManager:{}
	},
	api:{
		inspectPixelPartnerWaitingRegistry:function() {
			if (pixelManagementService.isActive) {
				var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
				pixelPartnerManager.inspectPixelPartnerWaitingRegistry();
			}
		},
		inspectPixelPartnerRegistry:function() {
			if (pixelManagementService.isActive) {
				var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
				pixelPartnerManager.inspectPixelPartnerRegistry();
			}
		},
		setPixelPartnerToPixelPartnerRegistry:function(pixelPartner) {
			if (pixelManagementService.isActive) {
				pixelManagementService.controller.pixelPartnerManager.setPixelPartnerToPixelPartnerRegistry(pixelPartner);
			}
		}
	}
}

pixelManagementService = new PixelManagementService();

Object.extend(
	pixelManagementService.model.metricsLibrary, {
		common:{
			pageType:null,
			pageId:null,
			pageUrl:null,
			pageName:null,
			tid:null,
			isNewCustomer:null,
			isRecognizedVisitor:null,
			enteringBrandCode:null,
			currencyCode:null
		},
		order:{
			orderId:null,
			orderTotal:null,
			orderSubTotal:null,
			promotionSubTotal:null,
			promotionRewardsTotal:null,
			giftServicesTotal:null,
			billingZip:null,
			shippingZip:null,
			taxTotal:null,
			shippingTotal:null,
			checkoutBrand:null,
			productList:null,
			productAndOrderData:null
		},
		shoppingBag:{
			productList:{},
			productCount:null
			/*
			 * item price, item brand, 9 digit style color product sku
			 */
		}
	}
);

Object.extend(
	pixelManagementService.constructors, {
		AbstractShoppingBagProduct:function() {
			this.initialize = function() {
				//initialize properties here
			};
			this.productBusinessId = null;
			this.productBrandCode = null;
			this.productName = null;
			this.quantity = null;
			this.price = null;
			this.colorDescription = null;
			this.skuDescription = null;
			this.skuId = null;
		},
		AbstractMarketingPartner:function() {
			this.initialize = function() {
				//initialize properties here
			};
			this.partnerCookieValue = null;
			this.enteringBrandCode = null;
			this.tid = null;
			this.ap = null;
			this.expirationTimeStamp = null;
			this.entryDate = null;
			this.creative = null;
			this.mkwid = null;
		},
		AbstractPixelPartner:function() {
			this.initialize = function() {
				//initialize properties here
			};
			this.isReadyForTransmission = false;
			this.isWaitReport = false;
			this.isWaitComplete = false;
			this.pixelPartnerName = null;
			this.pixelPartnerId = null;
			this.pixelPartnerCookieVarPrefix = null;
			this.pixelPartnerInboundParameterList = [];
			this.pixelPartnerPersistedParameterList = [];
			this.pixelPartnerStartDate = null;
			this.pixelPartnerEndDate = null;
			this.pixelPartnerTransmissionTemplate = null;
			this.pixelPartnerTransmissionMarkup = null;
			this.model = {
				inboundParameters:{}, 
				persistedParameters:{},
				metricsLibrary:pixelManagementService.model.metricsLibrary
			};
			
			this.controller = {
				setPixelPartnerModel:function() {
				
				},
				setPixelPartnerTransmissionTemplate:function() {
					
				},
				setCleanUp:function() {
					
				},
				helper:function() {
					
				},
				setCookieVar:function(cookieVarKey,cookieVarValue) {
					var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
					var pixelPartnerManagerHelper = pixelPartnerManager.helper;
					var PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME;
					var pixelPartnerCookieVarPrefix = pixelPartnerManagerHelper.getPixelPartnerCookieVarPrefix(this);		
					var cookieKey = pixelPartnerCookieVarPrefix + cookieVarKey;
					gidLib.setCookieVar(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME, cookieKey, cookieVarValue);
				},
				getCookieVar:function(cookieVarKey) {
					var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
					var pixelPartnerManagerHelper = pixelPartnerManager.helper;
					var PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME;
					var pixelPartnerCookieVarPrefix = pixelPartnerManagerHelper.getPixelPartnerCookieVarPrefix(this);					
					var cookieValue = gidLib.getCookieVar(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME, pixelPartnerCookieVarPrefix + cookieVarKey);
					return cookieValue;
				},
				removeCookieVar:function(cookieVarKey) {
					var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
					var pixelPartnerManagerHelper = pixelPartnerManager.helper;
					var PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME;
					var pixelPartnerCookieVarPrefix = pixelPartnerManagerHelper.getPixelPartnerCookieVarPrefix(this);					
					gidLib.removeCookieVar(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME, pixelPartnerCookieVarPrefix + cookieVarKey);
				}
			};
			var setCookieVarBound = this.controller.setCookieVar.bind(this);
			this.controller.setCookieVar = setCookieVarBound;
			var getCookieVarBound = this.controller.getCookieVar.bind(this);
			this.controller.getCookieVar = getCookieVarBound;
			var removeCookieVarBound = this.controller.removeCookieVar.bind(this);
			this.controller.removeCookieVar = removeCookieVarBound;
			
		},
		AbstractPixelPartnerTransmission:function(pixelPartner) {
			this.initialize = function() {
				//initialize properties here
			};
			this.pixelPartnerTransmissionDate = new Date();
			this.pixelPartnerTransmissionTemplate = pixelPartner.pixelPartnerTransmissionTemplate;
			this.pixelPartnerTransmissionMarkup = pixelPartner.pixelPartnerTransmissionMarkup;
			this.pixelPartner = pixelPartner;
		}
	}
);

Object.extend(
	pixelManagementService.controller.metricsLibraryManager, {
		setMetricsLibrary:function() {
			var setCommonMetricsBound = this.controller.metricsLibraryManager.setCommonMetrics.bind(this);
			setCommonMetricsBound();
			var setShoppingBagMetricsBound = this.controller.metricsLibraryManager.setShoppingBagMetrics.bind(this);
			setShoppingBagMetricsBound();
			var setOrderMetricsBound = this.controller.metricsLibraryManager.setOrderMetrics.bind(this);
			setOrderMetricsBound();
		},
		setCommonMetrics:function() {
			var metricsLibrary = this.model.metricsLibrary;
			var commonViewManagerModel = reportingService.controller.viewManagers.commonViewManager.model;
			var commonMetricsHelper = this.controller.metricsLibraryManager.commonMetricsHelper;
			var pageId = commonMetricsHelper.getPageId();
			var marketingPartner = commonMetricsHelper.getMarketingPartner();
			var ap = commonMetricsHelper.getAp(marketingPartner);
			var tid = commonMetricsHelper.getTid(marketingPartner);
			var enteringBrandCode = commonMetricsHelper.getEnteringBrandCode(marketingPartner);
			var isNewCustomerBound = commonMetricsHelper.isNewCustomer.bind(this);
			var isNewCustomer = isNewCustomerBound();
			var isRecognizedVisitorBound = commonMetricsHelper.isRecognizedVisitor.bind(this);
			var isRecognizedVisitor = isRecognizedVisitorBound();
			var currencyCode = reportingService.controller.reportingManager.currencyType;
				
			/* Set common metricsLibrary variables */
			metricsLibrary.common.pageType = commonViewManagerModel.commonCurrentPath;
			metricsLibrary.common.pageId = pageId;
			metricsLibrary.common.pageUrl = window.location.href;
			metricsLibrary.common.pageName = commonViewManagerModel.commonCurrentPageName;
			metricsLibrary.common.marketingPartner = marketingPartner;
			metricsLibrary.common.ap = ap;
			metricsLibrary.common.tid = tid;
			metricsLibrary.common.enteringBrandCode = enteringBrandCode;
			metricsLibrary.common.isNewCustomer = isNewCustomer;
			metricsLibrary.common.isRecognizedVisitor = isRecognizedVisitor;
			metricsLibrary.common.currencyCode = currencyCode;
		},
		commonMetricsHelper:{
			getTid:function(marketingPartner) {
				var tid = null;
				if (marketingPartner != null && marketingPartner != undefined) {
					tid = marketingPartner.tid;
				}
				return tid;
			},
			getAp:function(marketingPartner) {
				var ap = null;
				if (marketingPartner != null && marketingPartner != undefined) {
					ap = marketingPartner.ap;
				}
				return ap;
			},
			getEnteringBrandCode:function(marketingPartner) {
				var enteringBrandCode = null;
				if (marketingPartner != null && marketingPartner != undefined) {
					enteringBrandCode = marketingPartner.enteringBrandCode;
				}
				return enteringBrandCode;
			},
			getMarketingPartner:function() {
				// 1|||gogobue8t|||7|||1276552732404|||20100607|||4756478655|||695KzBoD|||
				var marketingPartner = null;
				var partnerCookieValue = gidLib.getCookie("PARTNER");
				if (partnerCookieValue != null 
						&& partnerCookieValue != undefined 
						&& partnerCookieValue != "" 
						&& partnerCookieValue.indexOf("|||") != -1) {
					
					var partnerCookieValueArray = partnerCookieValue.split("|||");
					marketingPartner = new pixelManagementService.constructors.AbstractMarketingPartner();
					
					marketingPartner.partnerCookieValue = partnerCookieValue;
					marketingPartner.enteringBrandCode = partnerCookieValueArray[0];
					marketingPartner.tid = partnerCookieValueArray[1];
					marketingPartner.ap = partnerCookieValueArray[2];
					marketingPartner.expirationTimeStamp = partnerCookieValueArray[3];
					marketingPartner.entryDate = partnerCookieValueArray[4];
					marketingPartner.creative = partnerCookieValueArray[5];
					marketingPartner.mkwid = partnerCookieValueArray[6];
				}
				return marketingPartner;
			},
			getPageId:function() {
				var pageId = null;
				var cid = gidLib.getQuerystringParam("cid", true);
				var pid = gidLib.getQuerystringParam("pid", true);
				var oid = gidLib.getQuerystringParam("oid", true);
				if (cid != null && cid != "") {
					pageId = cid;
				}
				if (pid != null && pid != "") {
					pageId = pid;
				}
				if (oid != null && oid != "") {
					pageId = oid;
				}
				return pageId;
			},
			isNewCustomer:function() {
				var isNewCustomer = false;
				var isNewCustomerCookieValue = getCookieVar("omniSession","isNewCustomer");
				if (isNewCustomerCookieValue == "true") {
					isNewCustomer = true;
				}
				return isNewCustomer;
			},
			isRecognizedVisitor:function() {
				var commonViewManagerModel = reportingService.controller.viewManagers.commonViewManager.model;
				var customerId = commonViewManagerModel.profile.customerId;
				var isRecognizedVisitor = false;
				if (customerId != null && customerId != "" && customerId.length > 0) {
					isRecognizedVisitor = true;
				}
				return isRecognizedVisitor;
			}
		},
		setShoppingBagMetrics:function() {
			var commonViewManagerModel = reportingService.controller.viewManagers.commonViewManager.model;
			var metricsLibrary = this.model.metricsLibrary;
			var getProductListBound = this.controller.metricsLibraryManager.shoppingBagMetricsHelper.getProductList.bind(this);
			var productsFromCookie = commonViewManagerModel.getProductsDecoded(getCookieVar("omniSessionProducts","strProductsInBag"));
			var productList = getProductListBound(productsFromCookie);
			metricsLibrary.shoppingBag.productList = productList;
			metricsLibrary.shoppingBag.productCount = commonViewManagerModel.productCountInBag;
			
		},
		shoppingBagMetricsHelper:{
			getProductList:function(productData) {
				var productList = null;
				var commonViewManagerModel = reportingService.controller.viewManagers.commonViewManager.model;
				var metricsLibrary = this.model.metricsLibrary;
				var productsArray = productData.split("||");
				
				// alert("strProducts = " + strProducts);
				// alert("arrayProducts.length = " + arrayProducts.length);
				if (productsArray.length > 0) {
					productList = new Array();
					for (var i = 0; i < productsArray.length; i++) {
						var shoppingBagProduct = new pixelManagementService.constructors.AbstractShoppingBagProduct();
						var productData = productsArray[i];
						var productAttributesArray = productData.split("^,^");
						shoppingBagProduct.productBusinessId = productAttributesArray[0];
						shoppingBagProduct.productBrandCode = productAttributesArray[1];
						shoppingBagProduct.productName = productAttributesArray[2];
						shoppingBagProduct.quantity = productAttributesArray[3];
						shoppingBagProduct.price = productAttributesArray[4];
						shoppingBagProduct.colorDescription = (productAttributesArray[5] ? commonViewManagerModel.parseVars(productAttributesArray[5], ",") : "");
						shoppingBagProduct.skuDescription = (productAttributesArray[6] ? commonViewManagerModel.parseVars(productAttributesArray[6], ",") : "");
						shoppingBagProduct.skuId = productAttributesArray[7];
						productList.push(shoppingBagProduct);
					}
				}
				return productList;
			}
		},
		setOrderMetrics:function() {
			var metricsLibrary = this.model.metricsLibrary;
			var metricsLibraryShoppingBag = metricsLibrary.shoppingBag;
			var orderMetricsHelper = this.controller.metricsLibraryManager.orderMetricsHelper;
			var isOrderPage = orderMetricsHelper.isOrderPage();
			var isOrderConfirmationPage = orderMetricsHelper.isOrderConfirmationPage();
			var isInternationalOrderConfirmationPage = orderMetricsHelper.isInternationalOrderConfirmationPage();
			if (isOrderPage) {
				var setMetricsForOrderPageBound = orderMetricsHelper.setMetricsForOrderPage.bind(this);
				setMetricsForOrderPageBound();
			} else if (isOrderConfirmationPage) {
				var setMetricsForOrderConfirmPageBound = orderMetricsHelper.setMetricsForOrderConfirmPage.bind(this);
				setMetricsForOrderConfirmPageBound();
			} else if (isInternationalOrderConfirmationPage) {
				var setMetricsForInternationalOrderConfirmPageBound = orderMetricsHelper.setMetricsForInternationalOrderConfirmPage.bind(this);
				setMetricsForInternationalOrderConfirmPageBound();
			}
			
		},
		orderMetricsHelper:{
			isOrderConfirmationPage:function() {
				var isOrderConfirmationPage = false;
				var pathName = window.location.pathname;
				if (pathName == "/checkout/orderConfirm.do") {
					isOrderConfirmationPage = true;
				}
				return isOrderConfirmationPage;
			},
			isOrderPage:function() {
				var isOrderPage = false;
				var pathName = window.location.pathname;
				if (pathName == "/checkout/order.do") {
					isOrderPage = true;
				}
				return isOrderPage;
			},
			isInternationalOrderConfirmationPage:function() {
				var isOrderConfirmationPage = false;
				var pathName = window.location.pathname;
				if (pathName == "/checkout/internationalPlaceOrder.do") {
					isOrderConfirmationPage = true;
				}
				return isOrderConfirmationPage;
			},
			setMetricsForOrderPage:function() {
				
			},
			setMetricsForOrderConfirmPage:function() {
				var commonViewManagerModel = reportingService.controller.viewManagers.commonViewManager.model;
				var metricsLibrary = this.model.metricsLibrary;
				var orderConfirmViewManagerModel = reportingService.controller.viewManagers.orderConfirmViewManager.model;
				var getProductListBound = this.controller.metricsLibraryManager.shoppingBagMetricsHelper.getProductList.bind(this);
				var orderMetricsHelper = this.controller.metricsLibraryManager.orderMetricsHelper;
				var productAndOrderDataListIteratorBound = orderMetricsHelper.productAndOrderDataListIterator.bind(this);
				var productAndOrderData = orderConfirmViewManagerModel.order.products;
				var productAndOrderDataList = getProductListBound(productAndOrderData);
				
				if (productAndOrderDataList != null && productAndOrderDataList.length > 0) {
					productAndOrderDataList.each(productAndOrderDataListIteratorBound);
				}
				metricsLibrary.order.productList = metricsLibrary.shoppingBag.productList;
				metricsLibrary.order.orderId = orderConfirmViewManagerModel.order.orderId;
				metricsLibrary.order.shippingZip = orderConfirmViewManagerModel.order.zip;
				metricsLibrary.order.checkoutBrand = commonViewManagerModel.commonBrandPrefix;

			},
			setMetricsForInternationalOrderConfirmPage:function() {
				var commonViewManagerModel = reportingService.controller.viewManagers.commonViewManager.model;
				var metricsLibrary = this.model.metricsLibrary;
				var internationalPlaceOrderViewManagerModel = reportingService.controller.viewManagers.internationalPlaceOrderViewManager.model;
				var getProductListBound = this.controller.metricsLibraryManager.shoppingBagMetricsHelper.getProductList.bind(this);
				var orderMetricsHelper = this.controller.metricsLibraryManager.orderMetricsHelper;
				var productAndOrderDataListIteratorBound = orderMetricsHelper.productAndOrderDataListIterator.bind(this);
				//var productAndOrderData = internationalPlaceOrderViewManagerModel.order.products;
				var productAndOrderData = metricsLibrary.order.productAndOrderData;
				var productAndOrderDataList = getProductListBound(productAndOrderData);
				
				if (productAndOrderDataList != null && productAndOrderDataList.length > 0) {
					productAndOrderDataList.each(productAndOrderDataListIteratorBound);
				}
				//metricsLibrary.order.productList = metricsLibrary.shoppingBag.productList;
				metricsLibrary.order.productList = productAndOrderDataList;
				metricsLibrary.order.orderId = internationalPlaceOrderViewManagerModel.order.orderId;
				metricsLibrary.order.shippingZip = internationalPlaceOrderViewManagerModel.order.zip;
				metricsLibrary.order.checkoutBrand = commonViewManagerModel.commonBrandPrefix;
				metricsLibrary.order.orderTotal = internationalPlaceOrderViewManagerModel.order.total;
	
			},
			productAndOrderDataListIterator:function(shoppingBagProduct, index) {
				var metricsLibrary = this.model.metricsLibrary;
				var orderMetricsHelper = this.controller.metricsLibraryManager.orderMetricsHelper;
				/*
				 * "000079^,^1^,^^,^1^,^100.00^,^blue^,^||grossTax^,^^,^event3=0.00^,^1^,^0.00^,^^,^||grossShipping^,^^,^event4=0.00^,^1^,^0.00^,^^,^||grossPromotionRewards^,^^,^event5=0.00^,^1^,^0.00^,^^,^||grossPromotionSubtotal^,^^,^event18=0.00^,^1^,^0.00^,^^,^||grossGiftServices^,^^,^event6=0.00^,^1^,^0.00^,^^,^||grossOrderTotal^,^^,^event7=100.00^,^1^,^0.00^,^^,^"
				 */
				if (shoppingBagProduct.productBusinessId.indexOf("gross") != -1) {
					var price = orderMetricsHelper.getPriceValueFromProductData(shoppingBagProduct.productName);
					if (shoppingBagProduct.productBusinessId == "grossTax") {
						metricsLibrary.order.taxTotal = price;
					} else if (shoppingBagProduct.productBusinessId == "grossShipping") {
						metricsLibrary.order.shippingTotal = price;
					} else if (shoppingBagProduct.productBusinessId == "grossPromotionRewards") {
						metricsLibrary.order.promotionRewardsTotal = price;
					} else if (shoppingBagProduct.productBusinessId == "grossPromotionSubtotal") {
						metricsLibrary.order.promotionSubTotal = price;
					} else if (shoppingBagProduct.productBusinessId == "grossGiftServices") {
						metricsLibrary.order.giftServicesTotal = price;
					} else if (shoppingBagProduct.productBusinessId == "grossOrderTotal") {
						metricsLibrary.order.orderTotal = price;
					}
				}
			},
			getPriceValueFromProductData:function(productData) {
				// "event7=100.00"
				var priceValue = null;
				if (productData.indexOf("=") != -1) {
					var x = productData.indexOf("=") + 1;
					var y = productData.length;
					priceValue = productData.substring(x, y);
				}
				return priceValue;
			}
		}
	}
);


Object.extend(
	pixelManagementService.controller.pixelPartnerManager, {
		pixelPartnerRegistryHasWaitReports:false,
		pixelPartnerManagerHasPixelPartnersToClean:false,
		setPixelPartnerToPixelPartnerRegistry:function(pixelPartner) {
			var pixelPartnerRegistry = pixelManagementService.model.pixelPartnerRegistry;
			if (pixelPartnerRegistry == null) {
				pixelManagementService.model.pixelPartnerRegistry = new Array();
				pixelPartnerRegistry = pixelManagementService.model.pixelPartnerRegistry;
			}
			pixelPartnerRegistry.push(pixelPartner);
		},
		/**
		 * This method checks the persisted partners from the pixelManagementPersist cookie and set the partners
		 * to the pixelPartnerPersistedRegistry in the model.
		 * Format of partner in the cookie: pixelPartner_YYYY/MM/DD-YYYY/MM/DD
		 */
		inspectPixelPartnerPersistedRegistry : function() {
			var PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME;
			var PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST;
			var pixelPartnerPersistedRegistry = pixelManagementService.model.pixelPartnerPersistedRegistry;
			var pixelPartnerCookieVarPrefixMap = pixelManagementService.model.pixelPartnerCookieVarPrefixMap;
			
			//check cookie for persisted pixel partner info
			pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie = 
				gidLib.getCookieVar(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME,PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST);
			var partnerArray = pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie.split(",");
			if (partnerArray != null && partnerArray != undefined && partnerArray != "" && partnerArray.length > 0) {
				//set persistedPartnerRegistry from persistedPartnerCookie
				var length = partnerArray.length;
				for (var i = 0; i < length; i++){
					
					var indexUnderscore = partnerArray[i].lastIndexOf("_");
					var indexDash = partnerArray[i].lastIndexOf("-");
					var cookieVarPrefixMapPixelPartner = null;
					var pixelPartnerCookieVarPrefix = partnerArray[i].substring(0, indexUnderscore);
					cookieVarPrefixMapPixelPartner = pixelPartnerCookieVarPrefixMap[pixelPartnerCookieVarPrefix];
					if (!cookieVarPrefixMapPixelPartner) {
						var persistedPartner = new pixelManagementService.constructors.AbstractPixelPartner();
						persistedPartner.pixelPartnerCookieVarPrefix = pixelPartnerCookieVarPrefix;
						persistedPartner.pixelPartnerStartDate = partnerArray[i].substring(indexUnderscore + 1, indexDash);
						persistedPartner.pixelPartnerEndDate = partnerArray[i].substring(indexDash + 1);
						pixelPartnerPersistedRegistry.push(persistedPartner);
						pixelPartnerCookieVarPrefixMap[pixelPartnerCookieVarPrefix] = persistedPartner;
					}
				}
			}
		},
		/**
		 * This method copies all pixelPartners from the pixelPartnerWaitingRegistry to the
		 * pixelPartnerRegistry.  It clears the current wait registry and then will re-inspect
		 * the pixelPartnerRegistry.  If there are still wait reports this reports will be 
		 * re-added to the pixelPartnerWaitingRegistry in the next run.
		 * @author Andrew Southwick
		 */
		inspectPixelPartnerWaitingRegistry:function() {
			if(!window['pixelManagementService']) { return; }
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelPartnerWaitingRegistry = pixelManagementService.model.pixelPartnerWaitingRegistry;
			var pixelPartnerWaitingRegistryIterator = null;
			
			pixelPartnerWaitingRegistryIterator = pixelPartnerManager.pixelPartnerWaitingRegistryIterator;
			if (pixelPartnerWaitingRegistry != null && pixelPartnerWaitingRegistry.length > 0) {
				pixelPartnerWaitingRegistry.each(pixelPartnerWaitingRegistryIterator);
				/* Clear the current pixelPartnerWaitingRegistry as this will be rebuilt if their are still reports waiting 
				 * when the inspectPixelPartnerRegistry method is called. 
				 */
				pixelPartnerWaitingRegistry.clear();
				pixelPartnerManager.inspectPixelPartnerRegistry();
			}
		},
		inspectPixelPartnerRegistry:function() {
            if(!window['pixelManagementService']) { return; }
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelPartnerRegistry = pixelManagementService.model.pixelPartnerRegistry;
			var pixelPartnerWaitingRegistry = pixelManagementService.model.pixelPartnerWaitingRegistry;
			var pixelPartnerToCleanRegistry = pixelManagementService.model.pixelPartnerToCleanRegistry
			var pixelPartnerRegistryIterator = null;
			var pixelPartnerToCleanRegistryIterator = null;
			pixelPartnerManager.pixelPartnerRegistryHasWaitReports = false;
			
			pixelPartnerRegistryIterator = pixelPartnerManager.pixelPartnerRegistryIterator;
			pixelPartnerRegistry.each(pixelPartnerRegistryIterator);
			/* Clear the pixelPartnerRegistry as all pixelPartners have been processed.  Any partners that were not
			 * ready for transmission are what reports, and are in the pixelPartnersWaitingRegistry.
			 */
			pixelPartnerRegistry.clear();
			
			/* STEP 3 injection point */
			pixelPartnerManager.cleanUpExpiredParnterFromPersistedRegistry();
			
			if (pixelPartnerManager.pixelPartnerManagerHasPixelPartnersToClean == true) {
				pixelPartnerToCleanRegistryIterator = pixelPartnerManager.pixelPartnerToCleanRegistryIterator;
				pixelPartnerToCleanRegistry.each(pixelPartnerToCleanRegistryIterator);
				pixelPartnerToCleanRegistry.clear();
			}
		},
		pixelPartnerRegistryIterator:function(pixelPartner, registryIndex) {
			var pixelPartnerController = pixelPartner.controller;
			var pixelPartnerName =  pixelPartner.pixelPartnerName;
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelPartnerWaitingRegistry = pixelManagementService.model.pixelPartnerWaitingRegistry;
			var pixelPartnerPersistedRegistryFromCookie = pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie;

			if (pixelPartner.isReadyForTransmission == false) {
				if ((pixelPartner.isWaitReport == true) && (pixelPartner.isWaitComplete == false)) {
					pixelPartnerManager.pixelPartnerRegistryHasWaitReports = true;
					pixelPartnerWaitingRegistry.push(pixelPartner);
				} else {
					// Report is ready for transmission.
					pixelPartner.isReadyForTransmission = true;
				}
			}
			if ((pixelPartner.isReadyForTransmission == true) && (pixelPartnerManager.isPixelPartnerActive(pixelPartner))) {
				// pixelPartner is ready for transmission so processPixelPartner.
				pixelPartnerManager.processPixelPartner(pixelPartner);
			}
			
			// Step 2 injection point for cookie management.
			/* No need yet to clean up the string, as the string will be re-serialized at the end of processing the 
			 * pixelPartnerRegistry so that the final clean version of the pixelPartnerPersistedRegistry 
			 * is in synch with the string.
			 */
			// pixelPartnerManager.updatePixelPartnerPersistedRegistryString(pixelPartner);
			if (pixelPartnerManager.isPixelPartnerActive(pixelPartner)){
				pixelPartnerManager.setPixelPartnerPersistedRegistry(pixelPartner);
			}
		},
		pixelPartnerToCleanRegistryIterator:function(pixelPartner, registryIndex) {
			var pixelPartnerController = pixelPartner.controller;
			var pixelPartnerName =  pixelPartner.pixelPartnerName;
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			if (pixelPartnerController.setCleanUp) {
				var setCleanUp = pixelPartnerController.setCleanUp.bind(pixelPartner);
				setCleanUp();
			}
		},
		pixelPartnerWaitingRegistryIterator:function(pixelPartner, registryIndex) {
			var pixelPartnerController = pixelPartner.controller;
			var pixelPartnerName =  pixelPartner.pixelPartnerName;
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelPartnerRegistry = pixelManagementService.model.pixelPartnerRegistry;
			pixelPartnerRegistry.push(pixelPartner);
		},	
		cleanUpExpiredParnterFromPersistedRegistry:function() {
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelPartnerPersistedRegistry = pixelManagementService.model.pixelPartnerPersistedRegistry;
			var PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME;
			var PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST;
			var pixelPartnerPersistedValidRegistry = new Array();
			var length = pixelPartnerPersistedRegistry.length;
			for (var i = 0; i < length; i++){
				var pixelPartnerFromPersistedRegistry = pixelPartnerPersistedRegistry[i];
				if (!pixelPartnerManager.isPixelPartnerActive(pixelPartnerFromPersistedRegistry)) {
					//cleanup all variables in the cookie related to that partner
					//remove the pixelPartner from pixelPartnerPersistedRegistryFromCookie, 
					//and from the pixelPartnerPersistedRegistry by pushing the valid partner to pixelPartnerPersistedValidRegistry
					pixelPartnerManager.removeExpiredCookieVar(pixelPartnerFromPersistedRegistry);
					/* NOTE: Instead of cleanup on the string while we are iterating we will serialize the string
					 * at the end of processing based on iterating over the final version of the
					 * pixelPartnerPersistedRegistry (which is based on the pixelPartnerPersistedValidRegistry.
					 */
					// pixelPartnerManager.removePixelPartnerFromPersistedRegistryString(pixelPartnerFromPersistedRegistry);
				} else {
					pixelPartnerPersistedValidRegistry.push(pixelPartnerFromPersistedRegistry);
				}
			}
			pixelPartnerPersistedRegistry.clear();
			pixelManagementService.model.pixelPartnerPersistedRegistry = pixelPartnerPersistedValidRegistry;
			
			/* Insertion point here for STEP 3: ITEM 5.b - loop through the now valid pixelPartnerPersistedRegistry and re-serialize
			 * the pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie
			 * pixelManagementService.model.previousPixelPartnerPersistedRegistryFromCookie
			 */ 
			var previousPixelPartnerPersistedRegistryFromCookie = pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie;
			pixelPartnerManager.updatePixelPartnerPersistedRegistryFromCookie();
			
			/* Set the PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST cookie variable with the now updated version of the string such that all
			 * expired partners have been removed from the PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST string.
			 */
			if (pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie != ""){
				gidLib.setCookieVar(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME, PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST, 
						pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie);
			}
		},
		updatePixelPartnerPersistedRegistryFromCookie:function() {
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelPartnerPersistedRegistry = pixelManagementService.model.pixelPartnerPersistedRegistry;
			var pixelPartnerManagerHelper = pixelPartnerManager.helper;
			var length = pixelPartnerPersistedRegistry.length;
			var updatedString = "";
			for (var i = 0; i < length; i++){
				var pixelPartnerFromPersistedRegistry = pixelPartnerPersistedRegistry[i];				
				updatedString += pixelPartnerManagerHelper.getPixelPartnerPersistedRegistryString(pixelPartnerFromPersistedRegistry) + ",";
			}
			pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie = updatedString.replace(/,$/,"");
		},
		setPixelPartnerInboundParameters:function(pixelPartner) {
			var inboundParameters = pixelPartner.model.inboundParameters;
			for (var i = 0; i < pixelPartner.pixelPartnerInboundParameterList.length; i++) {
				var inboundParameterName = pixelPartner.pixelPartnerInboundParameterList[i];
				var inboundParameterValue = gidLib.getQuerystringParam(inboundParameterName, true); 
				inboundParameters[inboundParameterName] = inboundParameterValue;
			}
		},
		setPixelPartnerPersistedParameters:function(pixelPartner) {
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelPartnerManagerHelper = pixelPartnerManager.helper;
			var PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME;
			var PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_PARTNER_LIST;
			var inboundParameters = pixelPartner.model.inboundParameters;
			var persistedParameters = pixelPartner.model.persistedParameters;
			var pixelPartnerCookieVarPrefix = pixelPartnerManagerHelper.getPixelPartnerCookieVarPrefix(pixelPartner);
			for (var i = 0; i < pixelPartner.pixelPartnerPersistedParameterList.length; i++) {
				var persistedParameterName = pixelPartner.pixelPartnerPersistedParameterList[i];
				var persistedParameterNameForCookie = pixelPartnerCookieVarPrefix + persistedParameterName;
				var persistedParameterValue = gidLib.getCookieVar(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME, persistedParameterNameForCookie); 
				var inboundParameterValue = inboundParameters[persistedParameterName];
				persistedParameters[persistedParameterName] = persistedParameterValue;
				/* Check to see if the inbound parameter has value and if so then overwrite the persisted value in the cookie. */
				if (inboundParameterValue != null && inboundParameterValue != "") {
					gidLib.setCookieVar(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME, persistedParameterNameForCookie, inboundParameterValue);
					persistedParameters[persistedParameterName] = inboundParameterValue;
				}
			}		
		},
		isPixelPartnerActive:function(pixelPartner){
			var startDate = new Date(pixelPartner.pixelPartnerStartDate);
			var endDate = new Date(pixelPartner.pixelPartnerEndDate);
			var today = Date.parse(pixelManagementService.constants.DATE_IN_USE);
			if ((today >= startDate) && (today <= endDate)){
				return true;
			} else {
				return false;
			}
		},
		removeExpiredCookieVar:function(pixelPartner){
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelPartnerManagerHelper = pixelPartnerManager.helper;
			var PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME = pixelManagementService.constants.PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME;
			var pixelPartnerCookieVarPrefix = pixelPartnerManagerHelper.getPixelPartnerCookieVarPrefix(pixelPartner);
			while (gidLib.getCookie(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME).indexOf(pixelPartnerCookieVarPrefix) != -1){
				var	cookieString = gidLib.getCookie(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME);
				var startIndex = cookieString.indexOf(pixelPartnerCookieVarPrefix);
				var endIndex = cookieString.indexOf("=", startIndex);
				var cookieKey = cookieString.substring(startIndex, endIndex);
				gidLib.removeCookieVar(PIXEL_MANAGEMENT_PERSIST_COOKIE_NAME, cookieKey);
			}
		},
		setPixelPartnerPersistedRegistry : function(pixelPartner) {
			var pixelPartnerPersistedRegistry = pixelManagementService.model.pixelPartnerPersistedRegistry;
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var length = pixelPartnerPersistedRegistry.length;
			var partnerInRegistry = false;
			var index = null;
			for (var i = 0; i < length; i++){
				if (pixelPartner.pixelPartnerCookieVarPrefix == pixelPartnerPersistedRegistry[i].pixelPartnerCookieVarPrefix){
					partnerInRegistry = true;
					index = i;
					break;
				}
			}
			if (length == 0 || !partnerInRegistry){
				pixelPartnerPersistedRegistry.push(pixelPartner);
			} else {
				pixelPartnerPersistedRegistry[index] = pixelPartner;
			}
		},
		removePixelPartnerFromPersistedRegistryString : function(pixelPartner) {
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelPartnerManagerHelper = pixelPartnerManager.helper;
			var registryVar = pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie;
			if (registryVar != null){
				var startIndex = registryVar.indexOf(pixelPartner.pixelPartnerCookieVarPrefix);
				//length of the Partner-Date format "_YYYY/MM/DD-YYYY/MM/DD" = 22
				var expiredVar = registryVar.substring(startIndex, startIndex + pixelPartner.pixelPartnerCookieVarPrefix.length + 22);
				if (startIndex == 0){
					registryVar = registryVar.replace(expiredVar + ",", "");
				} else {
					registryVar = registryVar.replace("," + expiredVar, "");
				}
			}
			pixelManagementService.model.pixelPartnerPersistedRegistryFromCookie = registryVar;
		},	
		processPixelPartner:function(pixelPartner) {
			var pixelPartnerController = pixelPartner.controller;
			var pixelPartnerToCleanRegistry = pixelManagementService.model.pixelPartnerToCleanRegistry;
			var pixelPartnerTransmissionLog = pixelManagementService.model.pixelPartnerTransmissionLog;
			var pixelPartnerManager = pixelManagementService.controller.pixelPartnerManager;
			var pixelManagementTransmission = null;
			
			if (pixelPartnerController) {
				if (pixelPartnerController.setPixelPartnerModel && pixelPartnerController.setPixelPartnerTransmissionTemplate) {
					pixelPartnerManager.setPixelPartnerInboundParameters(pixelPartner);
					pixelPartnerManager.setPixelPartnerPersistedParameters(pixelPartner);
					var setPixelPartnerModel = pixelPartnerController.setPixelPartnerModel.bind(pixelPartner);
					setPixelPartnerModel();
					var setPixelPartnerTransmissionTemplate = pixelPartnerController.setPixelPartnerTransmissionTemplate.bind(pixelPartner);
					setPixelPartnerTransmissionTemplate();
					if (pixelPartner.pixelPartnerTransmissionTemplate != null) {
						pixelPartner.isReadyForTransmission = true;
						pixelPartnerManager.setPixelPartnerTransmissionTemplateToDom(pixelPartner);
						pixelManagementTransmission = new pixelManagementService.constructors.AbstractPixelPartnerTransmission(pixelPartner);
						pixelPartnerTransmissionLog.push(pixelManagementTransmission);
						if (pixelPartnerController.setCleanUp) {
							pixelPartnerToCleanRegistry.push(pixelPartner);
							pixelPartnerManager.pixelPartnerManagerHasPixelPartnersToClean = true;
						}
					}
				} else {
					// logService.error(reportName + " does not have proper interface methods.");
				}
			}
		},
		setPixelPartnerTransmissionTemplateToDom:function(pixelPartner) {
			var PIXEL_MANAGEMENT_TRANSMISSIONS_ELEMENT_NAME = pixelManagementService.constants.PIXEL_MANAGEMENT_TRANSMISSIONS_ELEMENT_NAME;
			var PIXEL_PARTNER_TRANSMISSION_ELEMENT_ID_PREFIX = pixelManagementService.constants.PIXEL_PARTNER_TRANSMISSION_ELEMENT_ID_PREFIX;
			var pixelPartnerTransmissionElementId = PIXEL_PARTNER_TRANSMISSION_ELEMENT_ID_PREFIX + pixelPartner.pixelPartnerId;
			
			var pixelManagementTransmissionsElement = $(PIXEL_MANAGEMENT_TRANSMISSIONS_ELEMENT_NAME);
			var pixelPartnerTransmissionElement = $(pixelPartnerTransmissionElementId);
			var pixelPartnerTransmissionTemplate = null;
			var pixelPartnerTransmissionMarkup = null;
			
			if (pixelManagementTransmissionsElement == null) {
				/* pixelManagementTransmissionsElement does not exist, so create the element */
				var pixelManagementTransmissionsElement = Element.extend(document.createElement('div'));
				pixelManagementTransmissionsElement.id = PIXEL_MANAGEMENT_TRANSMISSIONS_ELEMENT_NAME;
				document.body.appendChild(pixelManagementTransmissionsElement);
			}
			if (pixelPartnerTransmissionElement == null) {
				/* pixelPartnerTransmissionElement does not exist, so create the element */
				var pixelPartnerTransmissionElement = Element.extend(document.createElement('div'));
				pixelPartnerTransmissionElement.id = pixelPartnerTransmissionElementId;
				pixelManagementTransmissionsElement.appendChild(pixelPartnerTransmissionElement);
			}
			pixelPartnerTransmissionTemplate = pixelPartner.pixelPartnerTransmissionTemplate;
			if (pixelPartnerTransmissionTemplate != null) {
				pixelPartnerTransmissionMarkup = pixelPartnerTransmissionTemplate.evaluate(pixelPartner);
				pixelPartnerTransmissionElement.update(pixelPartnerTransmissionMarkup);
				pixelPartner.pixelPartnerTransmissionMarkup = pixelPartnerTransmissionMarkup;
			}
		},
		helper:{
			getPixelPartnerCookieVarPrefix:function(pixelPartner) {
				var pixelPartnerCookieVarPrefix = null;
				if (pixelPartner) {
					pixelPartnerCookieVarPrefix = "pixMan_" + pixelPartner.pixelPartnerCookieVarPrefix + "_";
				}
				return pixelPartnerCookieVarPrefix;
			},
			getPixelPartnerPersistedRegistryString:function(pixelPartner) {
				var PixelPartnerPersistedRegistryString = null;
				if (pixelPartner) {
					PixelPartnerPersistedRegistryString = pixelPartner.pixelPartnerCookieVarPrefix + "_" + pixelPartner.pixelPartnerStartDate + "-" + pixelPartner.pixelPartnerEndDate;
				}
				return PixelPartnerPersistedRegistryString;
			}
		}
	}
);



var myTestPartner = new pixelManagementService.constructors.AbstractPixelPartner();
//pixelManagementService.api.setPixelPartnerToPixelPartnerRegistry(myTestPartner);
with (myTestPartner) {
	isReadyForTransmission = false;
	isWaitReport = false;
	pixelPartnerId = "myTestPartner";
	pixelPartnerName = "My Test Parnter";
	pixelPartnerCookieVarPrefix = "mtp";
	pixelPartnerInboundParameterList = ["mtp1", "mtp2", "testFun"];
	pixelPartnerPersistedParameterList = ["mtp2", "testFun"];
	model.myTestModelMetric = "testCustomModelMetric";
	pixelPartnerStartDate = "2010/07/20";
	pixelPartnerEndDate = "2010/07/30";
	//controller.removeCookieVar("testFun");
	//controller.setCookieVar("testFun", "testFunVar");
	//controller.getCookieVar("testFun");
	controller.setPixelPartnerModel = function() {
		alert("setPixelPartnerModel() running: pixelPartnerName = " + this.pixelPartnerName);
	}
	controller.setPixelPartnerTransmissionTemplate = function() {
		alert("setPixelPartnerTransmissionTemplate() running: pixelPartnerName = " + this.pixelPartnerName);
		this.pixelPartnerTransmissionTemplate = new Template(
				"<img src=\"http://www.myTestPartner.com?pixelPartnerName=#{pixelPartnerName}&pageId=#{model.metricsLibrary.common.pageId}&pageName=#{model.metricsLibrary.common.pageName}\" />");
	}
	controller.setCleanUp = function() {
		alert("setCleanUp() running: pixelPartnerName = " + this.pixelPartnerName);
	}
}

var myTestPartner2WhichIsAWaitReport = new pixelManagementService.constructors.AbstractPixelPartner();
//pixelManagementService.api.setPixelPartnerToPixelPartnerRegistry(myTestPartner2WhichIsAWaitReport);
with (myTestPartner2WhichIsAWaitReport) {
	isReadyForTransmission = false;
	isWaitReport = true;
	pixelPartnerId = "myTestPartner2WhichIsAWaitReport";
	pixelPartnerName = "My Test Partner (which is a wait report)";
	pixelPartnerCookieVarPrefix = "myTestPartner2";
	pixelPartnerInboundParameterList = ["abc1", "abc2", "testStrangeParameter"];
	pixelPartnerPersistedParameterList = ["abc2", "testStrangeParameter"];
	model.myTestModelMetric = "testCustomModelMetric";
	pixelPartnerStartDate = "2010/07/20";
	pixelPartnerEndDate = "2010/07/30";
	controller.setPixelPartnerModel = function() {
		alert("setPixelPartnerModel() running: pixelPartnerName = " + this.pixelPartnerName);
	}
	controller.setPixelPartnerTransmissionTemplate = function() {
		alert("setPixelPartnerTransmissionTemplate() running: pixelPartnerName = " + this.pixelPartnerName);
		this.pixelPartnerTransmissionTemplate = new Template(
				"<img src=\"http://www.myTestPartnerWaitReport.com?pixelPartnerName=#{pixelPartnerName}&pageId=#{model.metricsLibrary.common.pageId}&pageName=#{model.metricsLibrary.common.pageName}\" />");
	
	}
	controller.setCleanUp = function() {
		alert("setCleanUp() running: pixelPartnerName = " + this.pixelPartnerName);
	}
}
