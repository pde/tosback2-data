
function runcheckoutpixels() {

if ( (location.pathname=="/basket.do") && typeof ml_user==="object") {

/*
if (jQuery('.basketTotals tr:last td input[name="PayPalCheckout"]').size()>0) {
	jQuery('.basketTotals tr:last').hide().prev().hide();
}
*/

/* Start of DoubleClick Floodlight Tag: Please do not remove 
Activity name of this tag: # of Sales (Items)
URL of the webpage where the tag is expected to be placed: http://www.worldmarket.com/cart/index.jsp?ab=header:viewbasket
This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
Creation Date: 10/26/2011
*/
	var dclk_iframe_b = document.createElement('iframe');
		dclk_iframe_b.style.width="1px";
		dclk_iframe_b.style.height="1px";
		var dclkbUrl = "http://fls.doubleclick.net/activityi;"+
				";src=3168996;type=sales344;cat=ofsal250;"+
				"qty="+ ml_user.basketCount+";"+
				"cost="+ml_user.basketValue+";"+
				"ord="+ts+"?";
		dclk_iframe_b.src = dclkbUrl;
		document.getElementsByTagName('body')[0].appendChild(dclk_iframe_b);
} // end if in cart


if (null==jQuery.cookie("pxltrans"))
	jQuery.cookie("pxltrans", "clear", { path: "/"}); // create cookie


if (location.pathname.indexOf("/checkout/")<0) {// cookied and not in checkout
	jQuery.cookie("pxltrans", "clear", { path: "/"}); // clear cookie
} 


console.log("running pxl? 'done'?="+jQuery.cookie("pxltrans")+", '/checkout/thankyou.do'?="+location.pathname+" || '/checkout/accountsetup.do'?="+location.pathname+", typeof ml_order?="+typeof(ml_order)) 

/* CHECKOUT CONVIRMATION TAGS */
if ( "done"!=jQuery.cookie("pxltrans") && (location.pathname=="/checkout/thankyou.do" || location.pathname=="/checkout/accountsetup.do") && typeof(ml_order)==="object") {
//console.log("running pxl")


	ml_order.totalitemcount = 0;
	for (var i=0; i<ml_order.products.length; i++) {
		ml_order.totalitemcount += parseInt(ml_order.products[i][1]);
	}


	// calculcate total merch value before discounts (excludes shipping, shipping discounts, and tax)
	ml_order.totmerch = 0; 
	for (var i =0; i<ml_order.products.length; i++) ml_order.totmerch+=parseFloat(ml_order.products[i][2]);
	// calc total merch discount
	ml_order.merchdiscount = Math.round(100*(ml_order.totmerch - parseFloat(ml_order.total)))/100;
	var _disctodistr = ml_order.merchdiscount; 
	// for each line, calc discounted merch total
	for (var i =0; i<ml_order.products.length; i++) {
		var linedisc=Math.round(100*parseFloat(ml_order.products[i][2])/ml_order.totmerch*ml_order.merchdiscount)/100;
		_disctodistr-=linedisc;
		if (_disctodistr>=0) {
			ml_order.products[i][4] = Math.round(100*(parseFloat(ml_order.products[i][2])-linedisc))/100;
		} else {
			ml_order.products[i][4] = Math.round(100*(parseFloat(ml_order.products[i][2])-linedisc-_disctodistr))/100;
		}
	}



/*
Start of DoubleClick Floodlight Tag: Please do not remove
Activity name of this tag: Purchase Confirmation
URL of the webpage where the tag is expected to be placed: http://www.worldmarket.com
This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
Creation Date: 07/19/2012
*/
	var dclk_iframe = document.createElement('iframe');
		dclk_iframe.style.width="1px";
		dclk_iframe.style.height="1px";
		var dclkUrl = "https://fls.doubleclick.net/activityi;"+
				"src=3168996;type=sales344;cat=purch785;qty=1;"+
				"cost="+ml_order.total+";"+
				"u1="+ml_order.ordercode+";"+
				"ord="+ml_order.ordercode+"?";
		dclk_iframe.src = dclkUrl;
		document.getElementsByTagName('body')[0].appendChild(dclk_iframe);

/* End of DoubleClick Floodlight Tag: Please do not remove */




	var responsyspixel = new Image();

	responsyspixel.src = "https://emailworldmarket.com/pub/cct?_ri_=X0Gzc2X%3DUQpglLjHJlYQfvzcQQQQQvQvQ9zds&_ei_=&"+
				"action=once&"+
				"OrderID=" + ml_order.ordercode + "&"+
				"OrderTotal=" + ml_order.total + "&"+
				"NumItem="+ ml_order.totalitemcount;

	var pj_iframe = document.createElement('iframe');
		pj_iframe.style.width="1px";
		pj_iframe.style.height="1px";
		var pjUrl = "https://t.pepperjamnetwork.com/track?"+
					"PID=4864&INT=ITEMIZED"+
					"&OID="+ml_order.ordercode;
		for (var i=0; i<ml_order.products.length; i++) {
			pjUrl += 
				"&ITEM"+(1+i)+"="+ml_order.products[i][0]+
				"&QTY"+(1+i)+"="+ml_order.products[i][1]+
				"&AMOUNT"+(1+i)+"="+Math.round(100*ml_order.products[i][4]/ml_order.products[i][1])/100;
		}
		pj_iframe.src = pjUrl;
		document.getElementsByTagName('body')[0].appendChild(pj_iframe);


	/* Google Code for Purchase Conversion Page */

	window.google_conversion_id = 1024370891;
	window.google_conversion_language = "en";
	window.google_conversion_format = "3";
	window.google_conversion_color = "ffffff";
	window.google_conversion_label = "AbuKCPv4jQIQy9G66AM";
	window.google_conversion_value = ml_order.total;
	googleconv = document.createElement('script');
		googleconv.type= 'text/javascript';
		googleconv.src= 'https://www.googleadservices.com/pagead/conversion.js';
	document.getElementsByTagName('head')[0].appendChild(googleconv);

	/* UPsellit pixel */
	var USI = document.createElement('script');
		USI.type= 'text/javascript';
		USI.src = 'https://www.upsellit.com/upsellitReporting.jsp?command=REPORT&siteID=1526&productID=77&position=1&orderID='+escape(ml_order.ordercode)+'&orderAmt='+escape(ml_order.total);
	document.getElementsByTagName('head')[0].appendChild(USI);

	/* RKG PaidSearch Pixel */

	window.merchadvpixels = [];
	for (var i=0; i<ml_order.products.length; i++) {

		var prodpxl=new Image();
		prodpxl.height = 1;
		prodpxl.width = 1;
		prodpxl.src= 'https://www.rkdms.com/order.gif?'+
				'mid=worldmarket'+
				'&oid='+ml_order.ordercode+
				'&lid='+(1+i)+
				'&iid='+ml_order.products[i][0]+
				'&icent='+Math.round(100*ml_order.products[i][4]/ml_order.products[i][1])+
				'&iqty='+ml_order.products[i][1]+
				'&iname='+ escape(ml_order.products[i][3]||"undefined")+
				'&ts='+uts;
/*
		var compPixel = document.createElement('img');
		compPixel.height = 1;
		compPixel.width = 1;
		compPixel.src= '/images/misc/blank.gif?'+
			"zmam=47142862&"+
			"zmas=1&"+
			"zmaq=N&"+
			"quantity="+ml_order.products[i][1]+"&"+
			"pcode="+ml_order.products[i][0]+"&"+
			"zman="+ml_order.ordercode+"&"+
			"zmat="+ml_order.total;

		document.getElementsByTagName('body')[0].appendChild(compPixel);
*/
		
		window.merchadvpixels.push('/images/misc/blank.gif?'+
			"zmam=47142862&"+
			"zmas=1&"+
			"zmaq=N&"+
			"quantity="+ml_order.products[i][1]+"&"+
			"pcode="+ml_order.products[i][0]+"&"+
			"zman="+ml_order.ordercode+"&"+
			"zmat="+ml_order.total);

	}


	var compshop = document.createElement('script');
		compshop.type= 'text/javascript';
		compshop.src= '/text/pixels/ma2q.js?20120816-03';
	document.getElementsByTagName('head')[0].appendChild(compshop);


	jQuery.cookie("pxltrans", "done", { path: "/"});	

/// Start Bizrate POS Code 
//////
// var passin_x =''; //comment out to default center or adjust horizontal position by pixel 
// var passin_y =''; //comment out to default center or adjust vertical position by pixel 
window.orderId=''+ml_order.ordercode; 
// var z_index =''; //default 1,000,000 
window.cartTotal=''+ml_order.total; 
// var billingZipCode=''; 
// Pass up to 5 products from customer shopping cart 


window.productsPurchased= '' ;//'URL=^SKU=^GTIN=^PRICE=|URL=^SKU=^GTIN=^PRICE=|URL=^SKU=^GTIN=^PRICE=|URL=^SKU=^GTIN=^PRICE=|URL=^SKU=^GTIN=^PRICE='; 

	var bizrate = document.createElement('script');
		bizrate.type= 'text/javascript';
		bizrate.src= '//eval.bizrate.com/js/pos_136435.js';
	document.getElementsByTagName('head')[0].appendChild(bizrate);

/////
// End Bizrate POS Code 


console.log("pxl done")


} // if on confirmation page
else {

console.log("not running pxl: 'done'?="+jQuery.cookie("pxltrans")+", '/checkout/thankyou.do'?="+location.pathname+" || '/checkout/accountsetup.do'?="+location.pathname+", typeof ml_order?="+typeof(ml_order)) 
}

}; // runfooterpixels fctn