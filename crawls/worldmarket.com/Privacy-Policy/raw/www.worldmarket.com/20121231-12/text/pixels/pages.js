jQuery(function() {


if ( location.pathname=="/basket.do") {
	jQuery("#sourceCode").keydown(function (e) {return ((e.keyCode || e.which) !== 13) })
	if ( jQuery("#sourceCode").val()=="" ) 
		jQuery(".promoCodeSection")
			.css({"display":"none"})
			.before(jQuery('<div style="float: left;"><a href="#" id="optimizely_show_promo" style="font-size: 12px; color: #585858 !important;">ENTER PROMO CODE</a></div>').mousedown(function() {jQuery(this).css('display','none'); jQuery('.promoCodeSection').css('display','block'); }));

}


function trackStoreLocatorSubmit() {
		var ts = new Date().getTime();
		var s = jQuery("form#eslSearchForm1 input[name=eslSearchInput1]").val();
		if ( location.pathname.indexOf('/store-locator.do')==-1 || s=="" || s=="Enter Zip" || s=="Enter City, State or ZIP") return;
		_gaq.push(['_trackEvent', 'UserAction', 'StoreLocator', s]); 

		var dclk_iframe_p = document.createElement('iframe');
		dclk_iframe_p.style.width="1px";
		dclk_iframe_p.style.height="1px";
		var dclkpUrl = "http://fls.doubleclick.net/activityi;"+
				"src=3168996;type=conve502;cat=store229;"+
				"ord="+ts+"?";
		dclk_iframe_p.src = dclkpUrl;
		document.getElementsByTagName('body')[0].appendChild(dclk_iframe_p);

		var storelocpxl=document.createElement('img');
		storelocpxl.style.height = 1;
		storelocpxl.style.width = 1;
		var uid = Math.floor((Math.random()*1000000)+1);
		if (typeof(ml_user)=="object" && ml_user.customercode) uid= ml_user.customercode;
		storelocpxl.src= '//www.rkdms.com/order.gif?'+
				'mid=worldmarket'+
				'&icent=0&iqty=1&lid=1&iid=0'+
				'&oid=' + s + '-' + ts + '-' + uid +
				'&iname=store'+
				'&ts='+ts;
		document.getElementsByTagName('body')[0].appendChild(storelocpxl);
}

//jQuery('form[action="/store-locator.do"]').submit(function () {
jQuery('form#eslSearchForm1').submit(function () {
	trackStoreLocatorSubmit();
});


	var categ_urls = [];

	categ_urls["/category/furniture.do"] = "src=3168996;type=pageview;cat=furni899";
	categ_urls["/category/code/100504.do"] = "src=3168996;type=pageview;cat=furni899";


	categ_urls["/category/home-decorating.do"] = "src=3168996;type=pageview;cat=decor557";
	categ_urls["/category/code/100505.do"] = "src=3168996;type=pageview;cat=decor557";

	categ_urls["/category/kitchen-entertaining.do"] = "src=3168996;type=pageview;cat=enter578";
	categ_urls["/category/code/100506.do"] = "src=3168996;type=pageview;cat=enter578";

	categ_urls["/category/gifts-accessories.do"] = "src=3168996;type=pageview;cat=gifts189";
	categ_urls["/category/code/100507.do"] = "src=3168996;type=pageview;cat=gifts189";

	categ_urls["/category/food-and-drink.do"] = "src=3168996;type=pageview;cat=foodd095";
	categ_urls["/category/code/100508.do"] = "src=3168996;type=pageview;cat=foodd095";

	categ_urls["/category/seasonal.do"] = "src=3168996;type=pageview;cat=seaso618";
	categ_urls["/category/code/100509.do"] = "src=3168996;type=pageview;cat=seaso618";

	categ_urls["/content/inspirations.do"] = "src=3168996;type=pageview;cat=inspi252";

	categ_urls["/category/sale.do"] = "src=3168996;type=pageview;cat=saleg161";
	categ_urls["/category/code/Sale.do"] =  "src=3168996;type=pageview;cat=saleg161";

if ( categ_urls[location.pathname] ) {
	var dclk_iframe_p = document.createElement('iframe');
	dclk_iframe_p.style.width="1px";
	dclk_iframe_p.style.height="1px";
	var dclkpUrl = "http://fls.doubleclick.net/activityi;"+
			categ_urls[location.pathname] + ";ord="+ts+"?";
	dclk_iframe_p.src = dclkpUrl;
	document.getElementsByTagName('body')[0].appendChild(dclk_iframe_p);
}


/*
Start of DoubleClick Floodlight Tag: Please do not remove
Activity name of this tag: Create an Account
URL of the webpage where the tag is expected to be placed: https://www.worldmarket.com/checkout/index.jsp?process=login
This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
Creation Date: 05/10/2011
*/

if ( location.pathname=="/account/registeraddress.do" && getQueryArgs("method")[0]=="view" && jQuery(".errorblock h1").size()==0) {
	var dclk_iframe_a = document.createElement('iframe');
	dclk_iframe_a.style.width="1px";
	dclk_iframe_a.style.height="1px";
	var dclkaUrl = "http://fls.doubleclick.net/activityi;"+
			"src=3168996;"+
			"type=conve502;cat=creat747;ord="+ts+"?";
	dclk_iframe_a.src = dclkaUrl;
	document.getElementsByTagName('body')[0].appendChild(dclk_iframe_a);
}

if ( location.pathname.indexOf("/product/")==0 ) {
/* RKG- COMPARISON SHOPPING TAG */
   var a = document.createElement("script");
    a.src = "/text/pixels/maq30.js";
    a.type = "text/javascript";
	document.getElementsByTagName('body')[0].appendChild(a)
}




}); // end jQuery wrapper
