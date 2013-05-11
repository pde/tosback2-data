cpwm_page =  new function () {
	this.getQueryValue = function (s) {
		if (""==s || typeof(s)=="undefined") return qa;
		if (typeof(qa[s])=="undefined") return false;
		return (qa[s].length==1) ?qa[s][0]:qa[s];
	};
	this.pageType = function () {return pageType;};
	this.product = function () {return product;};
	this.category = function () {return category;};
	this.cart = function () {return cart;};
	this.order = function () {return order;};
	this.breadcrumb = function () {return breadcrumb;};

	// private methods and vars
	var qa = {};
	var product = {};
	var category = {};
	var pageType="";
	var cart = {};
	var order = {};
	var breadcrumb = [];
	
	function parseQueryString () {
		try { 
		window.location.search.replace(/([^?=&]+)(=([^=&]+))?/g, 
			function (m,key,hasVal,val){
				qa[key] = qa[key] ? qa[key] : []; 
				if (val==undefined) val="";
				qa[key].push(val);
			}
		);
		} catch(e) {
			console.log("CPWM page error: parseQueryString: "+e.toString());
		}
	};
	function getBreadcrumb() {
		var cats = [];
		jQuery("a.breadcrumb").each(function () {
			var cat = jQuery(this).text().trim().replace(/,/, "\\,");
			if ("Home" !== cat) cats.push(cat);
		});
		var thiscat = jQuery(".breadcrumb span:last").text();
			if (location.pathname.indexOf("/category/")==0 && thiscat) cats.push(thiscat);
		if (location.pathname.indexOf("/basket.do")==0) cats.push("Cart");
		if (location.pathname.indexOf("/checkout/accordioncheckout.do")==0) cats.push("Checkout");
 		breadcrumb = cats;
	}

	function getPageType () {/*gateway, directory, content, product:family, kit, single, dropdown*/
		try {
		if (location.pathname.indexOf("/product/")==0) {
			product.name = jQuery("h1.detailheader").text().trim();
			product.category = breadcrumb.join(",");

			product.image = jQuery("div.detailImage a.cloud-zoom:first").attr("href").replace(/wid=2000/, "wid=500");

			pageType="single";	
			if (jQuery("div.pdpDepOpt select").size()>0) pageType="dropdown";
			if (jQuery("div#tabContent table tr.tableitem1bg").size()>0) pageType="family";

			if ("single" == pageType) {
				product.SKU = jQuery("div.detailheaderCode span:last").html().trim();
				product.available = (jQuery("span.availability").html().trim()!=="IN STOCK" && jQuery("span.availability").html().trim()!=="BACKORDER") ? "0": "";
			}
			if ("dropdown" == pageType) {
				var avail = 0;
				for(i in skuCartMsgMap) {
					if ("IN STOCK" === eval('skuCartMsgMap['+i+']') || "BACKORDER" === eval('skuCartMsgMap['+i+']')) avail++;
				}
				product.available = (avail>0) ? "" : "0"; 
			}
			if ("dropdown" == pageType || "single" == pageType) {
				if (0==jQuery("div.singlePrice span.pricesale").size()) { // not on sale 
					product.regularPrice = jQuery("div.singlePrice").html().trim().replace(/[^0-9.\-]/g,"");
				} else { // onsale
					product.regularPrice = jQuery("div.singlePrice span.pricewas").html().trim().replace(/[^0-9.\-]/g,"");
					product.salePrice = jQuery("div.singlePrice span.pricesale").html().trim().replace(/[^0-9.\-]/g,"");
				}
				product.regularPrice = product.regularPrice.replace(/-.*/,"");
				product.salePrice = (product.salePrice) ? product.salePrice.replace(/-.*/,"") : "";
			}
		} else if (location.pathname.indexOf("/category/")==0) {
			// not spec'd yet
		}
		} catch(e) {
			console.log("CPWM page error: getPageType: "+e.toString());
		}
	};

	function getCartInfo() {
		try {
		

		if (jQuery("div#accCart").size()==0 && jQuery("div#globalBasket").size()==0) {
			console.log("no cart found")
			return; 
		}

		cart.itemNames = [];
		cart.itemQty = [];
		cart.itemSKUs = [];

		if (jQuery("div#globalBasket").size()) {
			cart.merchTotal = jQuery("div#globalBasket span.navTotal").html().trim().replace(/[^0-9.]/g,"");
			cart.itemCount = jQuery("div#globalBasket span.navQty").html().trim().replace(/[^0-9]/g,"");
			jQuery("div.globalCartItems div.globalCartItemInfo").each(function () {
				cart.itemSKUs.push(jQuery("div.SKU", this).text().trim()); 	
				cart.itemNames.push(jQuery("div.name a", this).text().trim()); 	
				cart.itemQty.push(jQuery("div.qty span.basketQty", this).html().trim());
			});
			cart.itemNamesCSV = cart.itemNames.join("|").replace(/,/g, "\\,").replace(/\|/g, ","); // escape commas in item name
			cart.itemSKUsCSV = cart.itemSKUs.join("|").replace(/,/g, "\\,").replace(/\|/g, ","); // escape commas in item name
			cart.itemQtyCSV = cart.itemQty.join(",");
		}
		} catch(e) {
			console.log("CPWM page error: getCartInfo: "+e.toString());
		}

	}

	function getOrderInfo() {
		try {
		if (typeof ml_order==="undefined") return;
		order.id = ml_order.ordercode;
		order.total = ml_order.total;
		var itemsSKUs = [], itemsPrices = [], itemsPricesWithDiscount = [], itemsQty = [];
		jQuery(ml_order.products).each(function (i,o) {
			itemsSKUs.push(o[0]);
			itemsPrices.push(o[2]);
			itemsPricesWithDiscount.push(o[4]);
			itemsQty.push(o[1]);
		});
		order.itemsSKUsCSV =  itemsSKUs.join(",");
		order.itemsPricesCSV = itemsPrices.join(",");
		order.itemsPricesWithDiscountCSV = itemsPricesWithDiscount.join(",");
		order.itemsQtyCSV = itemsQty.join(",");;
		} catch(e) {
			console.log("CPWM page error: getOrderInfo: "+e.toString());
		}
	}
	

	//initialize
		// parse query string
		parseQueryString();
		getBreadcrumb();
		getCartInfo();
		getPageType();
		getOrderInfo();
};
