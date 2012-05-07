/* $Id: bottom.js 2439 2012-04-20 16:55:53Z dalee $ */

if((loggedIn == 1 || loggedIn == '1') && document.getElementById('orderTrackingLink') != null){
    document.getElementById('orderTrackingLink').href = '/OrderHistoryView?storeId=8000';
}  
function addSitePromotionTags(analyticsInfo){
	rei.analytics.sendSpEvent(analyticsInfo);
}   
/* $Id: fixHeight.js 1913 2012-03-30 17:17:40Z jowilso $ */

/* Fix the height of shaded items when they live within columns */
function fixHeight() {
	$('.fixHeight').each(function() {
		var targets = $(this).find('.fixHeightTarget');
		var tallestTarget = 0;  
		targets.each( function() {  
			currentHeight = $(this).height(); 
			if (currentHeight > tallestTarget) {  
				tallestTarget = currentHeight;  
			}
		});
		var fixHeight = tallestTarget - 10;
		$(this).find('.shaded').height(fixHeight);		
	});
}  

$(document).ready(function() {
	fixHeight();
});
/* $Id: analytics.js 2169 2012-04-10 16:31:02Z rray $ */

/* Google Analytics, setup then load below */
var _gaq = _gaq||[];
_gaq.push(['_setAccount','UA-3017203-1'],['_trackPageview']);

/* drive rei.com analytics */
function reiAnalytics() {

	// Do nothing for Safari Preview and Prerender
	if (navigator.loadPurpose == "preview" || document.webkitVisibilityState == "prerender"){ return; }

	var ga = document.createElement('script');
	ga.type = 'text/javascript',ga.async = true;
	ga.src = ('https:'== document.location.protocol ? 'https://ssl': 'http://www') + '.google-analytics.com/ga.js';
	document.getElementsByTagName('script')[0].parentNode.appendChild(ga);

	s.events = s.events || new String('');
	var store = "REI";
	if (storeId == "8001") { store = "Outlet";
	}else if (storeClass == "adv") { store = "ADV" }
	
	if(!window.rei || !rei.analytics) return;
		
	var a, analytics, options;
	a = analytics = rei.analytics;
	// TODO rename omnivars.recommendation* TO omnivars.ratings*
	// TODO SOME OF THESE MIGHT BELONG ON window.rei, not on rei.analytics
	options = a.options = {
		subsection1:'',
		subsection2:'',
		subsection3:'',
		subsection4:'',
		subsection5:'',
		prod_cat_shop:'',
		prod_cat_dept:'',
		prod_cat_primary:'',
		store_search_type:'',
		store_purchase_type:'',
		user_search_term:'',
		content_type:'',
		refinement_type:'',
		refinement_detail:'',
		refinement_type_list:'',
		refinement_detail_list:'',
		pagination:'',
		sort_option:'',
		recommendation_count:'',
		site_tool_usage:'',
		items_per_page:'',
		fulfillment_method:'',
		payment_method:'',
		zip:'',
		purchase_id:'',
		state:'',
		// rename omni_re to real_estate but keep for backwards compatibility indefinitely (Dec 2010)
		real_estate: '',
		page_name: '',
		site_section: '',
		template_type: '',
		// site_id eg 8000/8001/etc, sometimes text eg 'rei'
		site_id: 0,
		// prev_omni_pagename: generated string
		prev_omni_pagename: '',
		// product finding method: ie how you got to the product page (a preset list of paths)
		p_f_m: '',
		events: '',
		// opencart: any items in cart? false or 1
		opencart: '',
		// membership-click
		mclick: '',
		sl_seen: '',
		session_id: $.cookie("s_vi"),
		// TODO should membership_status be moved up/elsewhere in rei namespace?
		membership_status: 'non-member',
		externalReferrer: document.referrer ? !/^https?:..([a-z0-9-]+\.)*rei\.com\//i.test(document.referrer):false,
		// TODO what are these 3 bEnable options and how are they used?
		bEnableFormAnalysisPlugin: false,
		bEnableCustomSearchMarketingPlugin: false,
		bEnableMediaModule: false,
		// TODO should is_logged_in be moved up/elsewhere in rei namespace?
		is_logged_in: $.cookie("loggedin") || 'not logged in'
	};

	var COOKIE = 'REI_ANALYTICS_SESSION';
	if(options.is_logged_in == '1') options.is_logged_in = 'logged in';

	/*
	 * options set from cookie
	 */
	var c = ($.cookie(COOKIE)||'').split('|'), NAME_VALUE_PAIR = '~';
	var i=0,l=c.length,nv;
	// popuplate/overwrite any options with values saved in cookie
	while(nv =c[i++]){
		nv = nv.split(NAME_VALUE_PAIR);
		if(nv.length < 2) continue;
		options[nv[0]] = nv[1];
	}

	/*
	 * utility functions
	 */
	var savelist = 'opencart,mclick,sl_seen,p_f_m,prev_omni_pagename'.split(',');
	a.save = function(nam,val){
	// save options to cookie: opencart, mclick, sl_seen, p_f_m, prev_omni_pagename
		options[nam] = val;
		var i=0,key,list=[];
		while(key=savelist[i++]){
			list.push(key.concat(NAME_VALUE_PAIR,options[key]));
		}
		if ($ != null) $.cookie(COOKIE, list.join('|'), {path:'/'});
	} // save()
	a.events = function(e){
	// setup omniture custom event variable "s.event" in order to properly format the variable string
		s.events.length ? (s.events += (',' + e)):(s.events = e);
	} // events()

	/*
	 * custom analytics functions
	 * TODO many utility functions (below) overwrite s.events instead of appending to it: is this desired?
	 */

	a.prodRedirect = function(){
	// rcarlis 20110131 allow analytics to track 301 redirects: /product/794446?ref=794441 (current_product?ref=old_product)
		var ref = location.search.match(/ref=(\d+)/)
		if(ref){
		try{
			ref = ref[1].concat(';', location.href.match(/product\/(\d+)/)[1]);
			var s = s_gi(s_account);
			s.prop61 = s.eVar61 = ref;
		}catch(err){}
		};
	}
	// Build s.products for the Product Details page
	a.buildProducts = function(){
		var rate = options.recommendation_ratings || '',
			pfm = options.p_f_m || '';
		// prefix each
		rate = rate ? ('event65='+rate):'';
		pfm = pfm ? ('eVar2='+pfm):'';

		var pstring = ';'.concat(
				options.products				
		);
		return pstring;
	}

	// Event to be added to membership links/actions
	a.sendMembershipEvent = function(mclick){
	try{
		mclick = mclick && mclick.toLowerCase ? mclick.toLowerCase():'not set';
		var s = s_gi(s_account);
		s.eVar20=mclick;
		s.linkTrackVars="eVar20";
		s.linkTrackEvents="None";
		s.tl(true,"o","Membership Event");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}

	// Global Tracking
	a.sendGlobalTrackingEvent = function(event_text){
	try{
		var s = s_gi(s_account);
		var sp_val = "cm_sp-_-" + event_text.toLowerCase();
		s.eVar38=sp_val;
		s.eVar39 = CQ_Analytics.PageDataMgr.data['scPageName'];
		s.events = s.linkTrackEvents = "event68";
		if(sp_val.indexOf("banner") != -1){
			s.eVar3=sp_val;
			s.linkTrackVars="events,eVar38,eVar39,eVar3";
		}else{
			s.linkTrackVars="events,eVar38,eVar39";
		}
        s.tl(true,"o",'SP Event');          
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}
	
	// Event to be added on "_sp" links
	a.sendSpEvent = function(event_text){
	try{
		var s = s_gi(s_account);
		var sp_val = "cm_sp-_-" + event_text.toLowerCase();
		s.eVar38=sp_val;
		s.eVar39 = CQ_Analytics.PageDataMgr.data['scPageName'];
        s.pageName = s.eVar39;
		s.events = s.linkTrackEvents = "event68";
		if(sp_val.indexOf("banner") != -1){
			s.eVar3=sp_val;
			s.linkTrackVars="events,eVar38,eVar39,eVar3";
		}else{
			s.linkTrackVars="events,eVar38,eVar39";
		}
		s.tl(true,"o",'SP Event');
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}

	// Event to be added on "_re" links
	a.sendReEvent = function(event_text){
	try{
		var s = s_gi(s_account);
		s.eVar38="cm_re-_-" + event_text.toLowerCase();
		s.eVar39 = CQ_Analytics.PageDataMgr.data['scPageName'];
        s.pageName = s.eVar39;
		s.events = s.linkTrackEvents = "event68";
		s.linkTrackVars="events,eVar38,eVar39";
		s.tl(true,"o","RE Event");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}

	// Send to a Friend
	a.sendToFriend = function(sku){
	try{
		var s = s_gi(s_account);
		s.products=";" + sku;
		s.linkTrackEvents="event33";
		s.linkTrackVars="events,products";
		s.events="event33";
		s.tl(true,"o","Send to Friend Event");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}


	// wish list create
	a.createWishList = function(){
	try{
		var s = s_gi(s_account);
		s.linkTrackEvents="event28";
		s.linkTrackVars="events";
		s.events="event28";
		s.tl(true,"o","Create Wish List Event");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}

	// Add a one ore more products to the cart (non-membership product only)
	a.addToCart = function(skus){
	try{
		var s = s_gi(s_account);
		var sp_val = "cm_sp-_-pagecontent-_-item_selector-_-"+ $('.fn').text() +"-_-add to cart";
		s.eVar38=sp_val;
		var tmpS="";
		if(skus.indexOf(",") != -1){
			var tmpA = skus.selSKU.split(',');
			for(i in tmpA){
				tmpA[i] = ";" + tmpA[i];
			}
			tmpS = tmpA.join(',');
		}else{
			tmpS=";" + skus;
		}
		s.products = tmpS;
		if(options.opencart===""){
			s.events = "scOpen,scAdd,event68";
			a.save("opencart","1");
		} else {
			s.events = "scAdd,event68";
		}
		s.linkTrackVars="events,products,eVar38,eVar39";
		s.linkTrackEvents="scAdd,scOpen,event68";
		s.tl(true,"o","SP Event","Add to Cart Event");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}
	//Removes an item from the cart
	a.removeFromCart = function(styleid){
	try{
		var s = s_gi(s_account);
		s.products = ";"+styleid;
		s.events = "scRemove";
		s.linkTrackVars="events,products";
		s.linkTrackEvents="scRemove";
		s.tl(this,"o");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}
	// User clicked on the back order button
	a.addToCart_BackOrder = function(sku){
	try{
		var s = s_gi(s_account);
		s.products = ";;;;;eVar24="+sku;
		s.events = "event34";
		s.linkTrackVars="events,products";
		s.linkTrackEvents="event34";
		s.tl(true,"o", "Add to Cart Event - BackOrder");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}
	// User clicked on an add to cart on gift registry
	a.addToCart_GiftRegistry = function(style){
	try{
		var s = s_gi(s_account);
		s.products = ";" + style +";;;;eVar2=gift registry";
		s.events = "scAdd";
		s.linkTrackVars="events,products";
		s.linkTrackEvents="scAdd";
		s.tl(true,"o", "Add to Cart Event - Gift Registry");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}
	// Add to cart (membership)
	a.addToCart_Membership = function(){
	try{
		var s = s_gi(s_account);
		s.products = ";membership";
		s.events = "scAdd";
		s.linkTrackVars="events,products";
		s.linkTrackEvents="scAdd";
		s.tl(true,"o", "Add to Cart Event - Membership");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}
	// User clicked on the "find a store" button on the store locator
	a.findStore = function(state){
	try{
		var s = s_gi(s_account);
		state = state.toLowerCase();
		s.prop8=state;
		s.events = "event16";
		s.linkTrackVars="events,prop8";
		s.linkTrackEvents="event16";
		s.tl(this,"o");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}
	// User contributes to the site with a comment on expert articles
	a.siteContribution = function(){
	try{
		var s = s_gi(s_account);
		s.events = "event12,event24";
		s.linkTrackVars="events";
		s.linkTrackEvents="event12,event24";
		s.tl(true,"o", "Site Contribution Event");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}
	// User clicked on the add to wishlist button
	a.addToWishList = function(style) {
		var s = s_gi(s_account);
		var sp_val = "cm_sp-_-pagecontent-_-item_selector-_-"+ $('.fn').text() +"-_-add to wish list";
		s.eVar38=sp_val;
		s.products = ";;;;;eVar24="+style; 
		s.linkTrackVars="events,products,eVar38,eVar39";
		s.events = s.linkTrackEvents="event27,event68";
	    s.tl(true, "o", 'SP Event',"Add to Wish List Event");
	}
	
	/**
	 *	Analytics Function
	 *	@namespace 		analytics
	 *	@desc			throw event for facebook like button click
	 *	@version		0.01
	 *	@requires		
	 *	@returns nothing
	 */
	a.fbLike = function(style){
	try{
		var s = s_gi(s_account);
		var sp_val = "cm_sp-_-pagecontent-_-actionbar-_-facebook like";
		s.eVar38=sp_val;
		s.products = ";"+style; 
		s.events = "event8";
		s.linkTrackVars="events,products,eVar38,eVar39";
		s.linkTrackEvents="event8";
	    s.tl(true, "o", "Facebook Like");
	}catch(err){ if(window.rei && rei.error) rei.error.push(err); }
	}
	
	// User looks up their dividend
	a.lookupDividend = function(){
		return rei.analytics.sendSpEvent("membership-_-dividend-_-lookup_form_submit");
	}
	// User looks up their membership number
	a.lookupMemberNumber = function(){
		return rei.analytics.sendSpEvent("membership-_-member_number-_-lookup_form_submit");
	}
	
	/**
	 *	Reset Omniture Tags
	 *	@desc			Resets omniture tags to empty strings
	 *	@author			agatlab
	 *	@returns		{Object} rei.analytics
	*/
	a.resetTags = function(){
		// Empty props and eVars
		for(i = 1;i <= 50;i++){
			(function(index){
				s["prop"+index] = "";
				s["eVar"+index] = "";
			})(i.toString());
		};
		// Empty additional Tags
		s.products = "";
		s.events = "";
		s.linkTrackVars= "";
		s.linkTrackEvents = "";
		s.pageName = "";
		s.pageURL = "";
		s.channel = "";
		s.hier1 = "";
		return a;
	}
	/**
	 *	Cache Current Tags
	 *	@desc			Caches current omnitures tags.
	 *	@author			agatlab
	 *	@returns		{Object} rei.analytics
	*/
	a.cacheCurrentTags = function(){
		a.cachedTags = (a.cachedTags == undefined) ? {} : a.cachedTags;
		(function(sTags){
			// Save props and eVars
			for(i = 1;i <= 50;i++){
				(function(index){
					a.cachedTags["prop"+index] = sTags["prop"+index];
					a.cachedTags["eVar"+index] = sTags["eVar"+index];
				})(i.toString());
			};
			// Save additional Tags
			a.cachedTags.products = sTags.products;
			a.cachedTags.events = sTags.events;
			a.cachedTags.linkTrackVars = sTags.linkTrackVars;
			a.cachedTags.linkTrackEvents = sTags.linkTrackEvents;
			a.cachedTags.pageName = sTags.pageName;
			a.cachedTags.pageURL = sTags.pageURL;
			a.cachedTags.channel = sTags.channel;
			a.cachedTags.hier1 = sTags.hier1;
		})(s);
		return a;
	}
	/**
	 *	Delete Cached Tags
	 *	@desc			Deletes all the cached tags from the rei.analtyics object
	 *	@author			agatlab
	 *	@returns		{Object} rei.analytics
	*/
	a.deleteCache = function(){
		if(typeof a.cachedTags == "undefined"){ return a; }
		delete a.cachedTags;
		return a;
	}
	/**
	 *	Reload Cached Tags
	 *	@desc			Reloads cached tags back to the omniture tags
	 *	@author			agatlab
	 *	@returns		{Object} rei.analytics
	*/
	a.reloadCachedTags = function(){
		// Save props and eVars
		if(typeof a.cachedTags == "undefined"){ return a; }
		(function(cachedTags){
			for(i = 1;i <= 50;i++){
				(function(index){
					s["prop"+index] = cachedTags["prop"+index];
					s["eVar"+index] = cachedTags["eVar"+index];
				})(i.toString());
			};
			// Save additional Tags
			s.products = cachedTags.products;
			s.events = cachedTags.events;
			s.linkTrackVars = cachedTags.linkTrackVars;
			s.linkTrackEvents = cachedTags.linkTrackEvents;
			s.pageName = cachedTags.pageName;
			s.pageURL = cachedTags.pageURL;
			s.channel = cachedTags.channel;
			s.hier1 = cachedTags.hier1;
		})(a.cachedTags)
		return a;
	}
	/**
	 *	Custom Page Load
	 *	@desc			Triggers a omniture page load event and will try load custom tags into the omniture tags before sending load event
	 *	@author			agatlab
	 * @params		{Object} Object of omniture tags
	 *	@returns		{Object} rei.analytics
	 * @example		rei.analytics.customPageLoad({
	 *								pageName: "checkout:minicart",
	 *								pageURL: "/ShoppingCart",
	 *								channel: "checkout",
	 *								hier1: "checkout:minicart",
	 *								prop1: "checkout:cart",
	 *								prop2: "reicom",
	 *								prop3: "minicart",
	 *								prop6: "cart",
	 *								prop7: "rei",
	 *								prop9: "commerce",
	 *							});
	*/
	a.customPageLoad = function(tags,callback){
		if(typeof tags == "object" && !$.isEmptyObject(options) && (tags.pageName != undefined && tags.pageURL != undefined)){
			a.cacheCurrentTags().resetTags();
			for(var tagName in tags) {
				s[tagName] = tags[tagName];
			}
			s.t();
			if(typeof callback == "function"){
				callback();
			}
		}
		return a;
	}
	
	/* 
	 * options
	 * process the list of values the page passed via rei.analytics[]
	 * objects map onto options, overwriting any values set before this point
	 * functions are executed
	 *
	 * NOTE
	 * the following provides backward compatibility
	 * we look first at window.naf for old pages that we have not yet updated
	 * saving the options set on naf to options
	 * and also copying the same utility functions onto naf.omni as they were previously
	 */ 
	var l, item, prop, naf = window.naf || false;
	if(naf){
		for(item in naf){
			if(item == 'omni') continue;
			// options.page_name = naf.page_name
			options[item] = naf[item];
		}
		naf.omni = naf.omni || {};
		naf = naf.omni;
		// for these pages also try setting up references to our functions
		var omni_fn = 'buildProducts,sendMembershipEvent,sendSpEvent,sendReEvent,sendToFriend,addToCart,removeFromCart,addToCart_BackOrder,addToCart_GiftRegistry,addToCart_Membership,findStore,siteContribution'.split(',');
		while(item=omni_fn.shift()){
			if(!a[item]) continue;
			naf[item] = a[item];
		};
	};

	l = a.length, i=0;
	while(i++<l){
		item = a.shift();
		switch(typeof item){
		case 'function':
			try{
			item();
			}catch(err){ if(window.rei && rei.error) rei.error.push(err); };
		break;
		case 'object':
			if(item.constructor != Object) continue;
			for(prop in item) options[prop] = item[prop];
		break;
		}
	}

	var falsyString = /^\s*false\s*/i;
	/*
	 * change the array functions (push, splice, unshift)
	 * so that we can continue to process incoming settings or functions
	 * 
	 * TODO modify rei.analytics.push to update props and evars on s for the corresponding options
	 * */
	a.unshift = a.push = function(){
		var list = arguments, i=0, item;
		var l = list.length;
		while(i<l){
			item=list[i++];
			switch(typeof item){
				case 'function':
					try{
					item();
					}catch(err){ if(window.rei && rei.error) rei.error.push(err); };
				break;
				case 'object':
					if(item.constructor != Object) continue;
					for(prop in item) options[prop] = item[prop];
				break;
			}
		}

		// backwards compatible for omni_re
		if(options.omni_re) options.real_estate = options.omni_re;
		delete options.omni_re;
		options.real_estate = options.real_estate.replace(falsyString,'');
		// return array length
		return 0;
	}
	a.splice = function(){
		this.push.apply(this, Array.prototype.splice.call(arguments,2));
	return [];
	};

	var _attr;
	var list = $('analytics');
	var cleanSpaces = /\s+/mg;
	var leftSpace = /^\s+/;
	var rightSpace = /\s+$/;
	
	/* 
	 * handle analytics html tags in the page (typically added via marketing team)
	 * eg: <analytics page_name="rei:stuff" site_id="8001"/>
	 * */
	i=0;
	while(item=list[i++]){
		_attr = item.attributes;
		l=0;
		while(prop=_attr[l++]){
			// if an attribute exists then we assume we should set it
			options[prop.name] = prop.value.replace(cleanSpaces,' ').replace(leftSpace,'').replace(rightSpace,'');
			if(prop.name == 'analytics') a.push(new Function(prop.value));
		}
	}

	// old method of setting real_estate option
	if(options.omni_re && !options.real_estate){
		options.real_estate = options.omni_re;
		delete options.omni_re;
	}
	options.real_estate = options.real_estate.replace(falsyString,'');
	if(document.getElementById('omni_re')) options.real_estate = 'true';
	/*
	 * options
	 * set or change options based on various conditions
	 */
	if(!options.p_f_m){
	// no PFM from cookie so try setting one:
	// Define the product finding method. Dependent on knowing the previous page
	/*
	NOTE only these 2 pages set p_f_m directly:
		/xsl/search/unifiedSearch5Presentation.xsl
		/xsl/search/search5Presentation.xsl
	*/
		//Set on every page expert advice page
		if(options.page_name.indexOf("expert advice")==0){
			options.p_f_m = "expert advice";
		}
		//Set on every 'page adventures' page
		if(options.page_name.indexOf("adventures")+1){
			options.p_f_m = "adventures";
		}
		//Set on every outdoor school page
		if(options.page_name.indexOf("outdoor school")+1){
			options.p_f_m = "outdoor school";
		}
		//Set on unavailable proudct page
		if(options.page_name.indexOf("product unavailable")+1){
			options.p_f_m = "product unavailable page";
		}
		//Set on wishlist page
		if(options.page_name.indexOf("wishlist")+1){
			options.p_f_m = 'wish list';
		}
		//Entered on a Product Details page
		if(options.externalReferrer && (options.page_name.indexOf("product detail")+1)){
			options.p_f_m = "entry product page";
		}
		//Entered on a Category Listing page
		if(options.externalReferrer && (options.page_name.indexOf("nav_search")+1)){
			options.p_f_m = "entry nav search";
		}
		//Entered on an Event page
		if(options.externalReferrer && (options.page_name.indexOf("event")+1)){
			options.p_f_m = "entry event page";
		}
		//The user performed a search from a REI site - set on the page.
	
		//we figured out a new product finding method, save it for later
		if(options.p_f_m) a.save("p_f_m", options.p_f_m);
	}

	/*
	 * fallback for pages without options/tags based on url
	 */
	if(!options.page_name){
		var url_page_name = document.location.href;
		var pageSection = url_page_name.substring(url_page_name.indexOf('.com/')+5, url_page_name.lastIndexOf('/'));
		var page_name = url_page_name.substring(url_page_name.lastIndexOf('/')+1, url_page_name.indexOf('.html'));
		switch(pageSection.toLowerCase()){
			case 'aboutrei':
				options.page_name = 'aboutrei:'+url_page_name,
				options.site_section = 'aboutrei',
				options.template_type = 'aboutrei',
				options.content_type = '',
				options.subsection1 = 'aboutrei',
				options.site_id = 'rei';
			break;
			case 'adventures/resources':
				options.page_name = 'adventures:'+url_page_name,
				options.site_section =  'adventures',
				options.template_type = 'adventures',
				options.content_type = 'adventures',
				options.subsection1 = 'resources',
				options.site_id = 'adventures';
			break;
			case 'adventures/activity':
				options.page_name = 'adventures:'+url_page_name,
				options.site_section =  'adventures',
				options.template_type = 'adventures',
				options.content_type = 'adventures',
				options.subsection1 = 'activity',
				options.site_id = 'adventures';
			break;
		}
	};

	/*
	 * All pages Settings
	 */
	var path = location.pathname.replace(rei.re.cleanUrlChars,'!');

	//Community Pages
	if(location.href.replace(rei.re.cleanUrlChars,'!').indexOf("findout.rei.com")+1){
		s.pageName="findout:" + path;
		s.channel="findout";
		s.prop6="findout";
		a.events("event36");
	}

	// this needs to be setup from page options
	if(options.prod_cat_shop){
		var tmp_h2 = options.prod_cat_shop;
		if(options.prod_cat_dept){
			tmp_h2 += "|" + options.prod_cat_dept;
		}else{
			tmp_h2 += "|" ;
		}
		if(options.prod_cat_primary){
			tmp_h2 += "|" + options.prod_cat_primary;
		}else{
			tmp_h2 += "|";
		}
		tmp_h2 += "|" + options.page_name;
		options.hier2= tmp_h2.toLowerCase();
	}

	/*
	 * Logic for specific pages/business rules Settings
	 */
	// The user has provided their membership number on checkout:billing page.
	if(options.page_name.indexOf("checkout:add shipping address") != -1){
		if(document.chk && document.chk.member_number && document.chk.member_number.value){
			a.events("event9");
			options.membership_status = "member";
		}

		if( options.mclick && $('[name=buy_membership]').val() ){
			a.sendMembershipEvent('billing page');
			a.save("mclick","1");
		}

	}
	/*
	 * Checkout Billing Page and Session Expired
	 */
	if(options.page_name.indexOf("checkout:billing") != -1 && window.location.href.toLowerCase().indexOf("timeout=y") != -1){
		s.eVar60 = "timeout=y";
		s.prop60 = "timeout=y";
	}

	//Shopping Cart Events
	if( options.page_name.indexOf("checkout:cart") != -1 ){
		a.events("scView");
	}
	if( options.page_name.indexOf("checkout:cart aff_trails") != -1 ){
		if($("#styleNumber").text() >= 1){
			s.products = $("#styleNumber").text();
			a.events("scAdd");
		}
		
	}
	//Store Locator
	if( options.page_name.indexOf("store_locator") != -1 ){
		if(!options.sl_seen){
			options.site_tool_usage="store locator";
			a.save('sl_seen','1');
		}
	}
	// The first page a user sees is an error page
	if(options.page_name.indexOf("error") != -1){
		a.events("event19");

		if(options.externalReferrer){
			a.events("event25");
		}
	}

	//s.products for the Product details page needs to be built. All other pages build s.products on the page and pass it via options.products
	if(options.page_name.indexOf("product detail")+1){
		s.products = a.buildProducts();
	}else if(options.page_name.indexOf("outlet:feature_deal of the day")+1){
		s.products = a.buildProducts();
	}else if(options.products){
		s.products = options.products;
	}

	//Created Online Account
	if((options.page_name.indexOf("your account:main")+1)&&((options.prev_omni_pagename||'').indexOf("your account: create_main")+1)){
		a.events("event17");
		s.eVar14="yes";
	}

	//Community/Article View
	if(options.site_section.match("(expert advice)|(community)")){
		a.events("event26, event36");
		s.eVar29=options.page_name;
	}

	//Event/Class Registration Confirmation
	if(options.page_name.indexOf('event registration:order confirmation')+1){
		a.events("event7");
	}

	//Map & Directions Pages
	if(path.replace(rei.re.cleanUrlChars,'!').match("map\/store\/[0-9]+")){
		omniStoreId = path.substr(11,path.length);
		options.page_name = 'stores:store map ' + omniStoreId ;
		options.subsection3 = omniStoreId;
	}

	//Order Checkout Page
	if(options.page_name.indexOf("checkout:order confirmation")+1){
		s.products = options.products;
		//Membership Purchased
		if(options.products.indexOf("membership")+1){
			a.events("event18");
		}
	}
	
	// A User Search has occured, REI or Outlet
	if(options.search_terms && (options.page_name.indexOf("user_search")+1) && (options.page_name.indexOf("initial")+1)) {
	         	s.prop26 = options.search_terms.toLowerCase();
			s.prop28 = options.prev_omni_pagename;
			var event1Serialized = 'event1:' + searchId;
			var event6Serialized = 'event6:' + searchId;
			a.events(event1Serialized + "," + event6Serialized);
			if(options.num_search_results){
				s.prop27 = options.num_search_results;
				s.products = ";;;;event6=" + options.num_search_results;
			}
	}

	/* A catch-all for pages that go through ultraTranform.xsl.
	 * If a page does not have a page_name value then is it is uncoded
	 * we will look at it's storeClass value and set various Omniture vars based on it.
	 * storeClass = 'adv';  or  ?rei? or ?outlet?
	 */
	if(!options.page_name){
		options.content_type = 'uncoded';
	switch(storeClass){
		case 'rei':
			options.site_section = options.template_type = 'rei';
			options.site_id =  'rei';
		break;
		case 'outlet':
			options.site_section = options.template_type = 'outlet';
			options.site_id =  'outlet';
		break;
		case 'adv':
			options.site_section = options.template_type = 'adventures';
			options.site_id =  'adventures';
		break;
		default:
			options.site_section = options.template_type = 'n/a';
			options.site_id =  'n/a';
		break;
	} // switch
	}

	/*
	 * now that options have been changed/setup save or use them as-needed
	 */

	/* omnivars dictionary
	 * for mapping frontend terms to analytics: translates a 'word' to 'props', 'eVars' (or both). Also used to assign all defined s.events, s.prop and s.eVar values
	 * syntax for setup is a string with pipe delimited entries, comma-delimited values
	 * each entry must have 3 values which are repectively: word,prop,evar (empty values are fine)
	 * eg: 'word,prop,evar|w,p,e|...'
	 *
	 * setup omnivars AFTER ALL options are setup and adjusted (ie custom from each page)
	 *
	 * TODO modify rei.analytics.push to update props and evars on s for the corresponding options
	 */	
	var v, omnivars = "site_section,channel,|subsection1,prop1,eVar25|subsection2,prop2,eVar26|subsection3,prop3,eVar27|subsection4,prop4,|subsection5,prop5,|prod_cat_shop,prop32,|prod_cat_dept,prop33,|prod_cat_primary,prop34,|template_type,prop6,|site_id,prop7,|store_search_type,,eVar16|store_purchase_type,,eVar17|user_search_term,,eVar18|content_type,prop9,|refinement_type,prop10,|refinement_detail,prop11,|refinement_type_list,prop12,|refinement_detail_list,prop13,|pagination,prop14,|sort_option,prop20,|recommendation_count,prop36,|site_tool_usage,prop18,|is_logged_in,prop19,eVar12|items_per_page,prop21,|fulfillment_method,,eVar4|payment_method,,eVar5|zip,zip,|purchase_id,purchaseID,eVar1|membership_status,,eVar11|state,state,".split('|');

	// TODO do we need to test options.* before setting s.* ??
	a.setTags = function(){
		//console.log("setTags"); 
		while(v=omnivars.shift()){
			v = v.split(',');
			omnivars[v[0]] = {prop:v[1],evar:v[2]};
			if(v[1]){ /* prop setup:
				subsection1,prop1,eVar25
				setup:
				s.prop1 = options.subsection1
				*/
				s[v[1]] = options[v[0]].toString().toLowerCase();
			}
			if(v[2]){ /* evar setup:
				subsection1,prop1,eVar25
				setup:
				s.eVar25 = options.subsection1
				*/
				s[v[2]] = options[v[0]].toString().toLowerCase();
			}
		};
	
		// expose this dictionary
		a.omnivars = omnivars;

		/* removed to sitecatalyst.reiplugins.js.jsp to run before scode call
		//Template Type First & Last Touch
		s.hier1 = options.page_name;
		s.eVar21 = s.eVar22 = s.prop6;
		console.log("s.eVar21: " + s.eVar21);
		s.eVar23="+1";
		*/

		// for all pages fire event4
		a.events('event4');

		//Set First Time or Repeat Visitor
		if(s.prop31=='1'){
			a.events("event21");
		}else if(s.prop31 > '1'){
			a.events("event22");
		}

		//Keep track of the last page's omniture pagename
		$(window).unload(function() { a.save("prev_omni_pagename", options.page_name.toLowerCase()); });
	};
	a.setTags();
	/*
	 * events
	 */
	if(options.events) a.events(options.events);
	//Page events are hardcoded to the page and must be interpreted after the browser loads the page. Only on JSP pages
	if(options.page_events) a.events(options.page_events);

	s.eVar19 = s.hier2 = options.hier2;

	//PurchaseID 
	if(options.purchase_id!="") s.purchaseID = options.purchase_id;

	//PageName
	s.pageName = options.page_name.toLowerCase();

	/* 
	 * jQuery
	 * Now that analytics is all setup, use jQuery to bind analytics to all the common dom elments
	 *
	 * use jQuery.each (or equivalent) so that if elements don't exist this fails silently
	 * TODO review, refactor; esp want only one attribute generation and click event attached
	 */

	var alphanumeric_space = /[^ a-z0-9]/gi;
	$([document.getElementById('pageContent'), 
		document.getElementById('sidebarWrapper'), 
		document.getElementById('hunt2'), 
		document.getElementById('hunt3')]).each(function(){
		
		if(!this.getElementsByTagName) return;
		var str = '',
			pagename = document.body.className.toLowerCase();
		if(typeof this.tagName == "undefined") return;
		if(this.id == 'pageContent'){
			// REI Homepage links only
			if(document.body.id == 'reihome') str = 'rei homepage';
			// Outlet Homepage links only
			else if(document.body.id == 'outletHp') str = 'outlet homepage';
		}else if(this.id.indexOf("hunt")+1){
		//Top Nav Clicked
			if(pagename.indexOf('rei')+1){
				str = 'top nav rei';
			}else if(pagename.indexOf("outlet")+1){
				str = 'top nav outlet';
			}
		}else if(this.id == 'sidebarWrapper' && pagename.indexOf('sidebar') < 0){
		//Global Sidebar Clicked - only fire if another custom sidebar isn't used
			if(pagename.indexOf('rei')+1){
				str = 'global sidebar nav rei';
			}else if(pagename.indexOf("outlet")+1){
				str = 'global sidebar nav outlet';
			}
		}
		if(!str) return;

		if(!this.getElementsByTagName) return;
		$(this.getElementsByTagName('a')).one('click.analytics',function(e){
			// links that should set a Product Finding Method.
			rei.analytics.save('p_f_m',str);
		});
	});

	/* jmontgo: builds 3 'buckets', appends attrib to element and builds valu for manual_cm_sp attribute
	 *
	 * review and change 'analytics1' attribute in skus.xsl
	 *
	 * change manual_cm_* to manual_analytics_*?
	 * TODO across the file refactor \<cm_* (or equivalent) coremetrics related holdover names/vars etc
 	 */
	$('#hunt2 a#membershipLink').bind('click.analytics',function(e){
		rei.analytics.sendMembershipEvent('mem_header_tab');
	});

	$('input#token').each(function(){
	// setup any tokens for pairing analytics data with data that we have
		this.value = s.prop50 = s.eVar15 = rei.util.randomID(40);
	});
	
	// Build default body tracking tag from page name and anchor value
	a.buildBodyTrackingTag = function(anchor){
		var anchorValue = (anchor.children('img').attr('alt') || (anchor.text()||'')).replace(alphanumeric_space, '');
		anchorValue = anchorValue.replace(/^\s*|\s*$/,"");   // Trimming spaces if any
		return anchorValue;
	}
	
	// Look for globalTracking or bodyTracking attributes and assign one click event
	$('a').each(function() {
		$(this).one('click.analytics',function() {
			if ($(this).attr('globalTracking')) {
				rei.analytics.sendSpEvent($(this).attr('globalTracking'));
			} else if (CQ_Analytics.PageDataMgr.data['enableBodyTracking'] == 'true') {
				if ($(this).attr('bodyTracking')) {
					rei.analytics.sendReEvent($(this).attr('bodyTracking'));
				} else {
					var bodyTrackingTag = a.buildBodyTrackingTag($(this));
					rei.analytics.sendReEvent(bodyTrackingTag);
				}
			}
		});
	}); // $('a').each(...);
	
	// Look for globalTracking applied to button elements
	$('button').each(function() {
		$(this).one('click.analytics',function() {
			if ($(this).attr('globalTracking')) {
				rei.analytics.sendGlobalTrackingEvent($(this).attr('globalTracking'));
			}
		});
	});
	
	//Minicart Events
	$("#minicartContainer")
		.bind("showCart", function(){
			//console.log("minicart, showCart event triggered");
			//console.log(s.pageName);
			$(this).find("a").unbind("analytics");
			
			// Exit function if rei.analytics.customPageLoad has already ran for the minicart
			if(s.pageName === "checkout:minicart"){
				return;
			} 
			
			rei.analytics.customPageLoad({
				pageName: "checkout:minicart",
				pageURL: "/ShoppingCart",
				channel: "checkout",
				hier1: "checkout:minicart",
				prop1: "checkout:cart",
				prop2: "reicom",
				prop3: "minicart",
				prop6: "cart",
				prop7: "rei",
				prop9: "commerce"
			});
			//console.log(s.pageName);
		})
		.bind("hideCart", function(){
			//console.log("minicart, hideCart event triggered");
			//console.log(s.pageName);
			rei.analytics.resetTags().reloadCachedTags();
			//console.log(s.pageName);
		})
		.find("a, .jcarousel-next, .jcarousel-prev").unbind(".analytics")
		.live("click.analyticsMinicart", function(e){
			var _this = $(e.currentTarget);
			//console.log(e.currentTarget.tagName);
			//console.log(_this.is(".jcarousel-prev, .jcarousel-next"));
			if(e.currentTarget.tagName == "A" || _this.is(".jcarousel-next, .jcarousel-prev")){
				var s = s_gi(s_account), linkText = _this.text().toLowerCase();
				linkText = (_this.is(".jcarousel-next")) ? "arrow next" : linkText;
				linkText = (_this.is(".jcarousel-prev")) ? "arrow prev" : linkText;
				s.eVar38="cm_re-_-minicart-_-" + linkText;
				s.eVar39="checkout:minicart";
				s.events = s.linkTrackEvents = "event68";
				s.linkTrackVars="events,eVar38,eVar39";
				s.tl(true,"o","RE Event");
				//console.log("sent event, " + s.eVar38);
			}
		});

	/*
	 * make it possible for analytics (et al) to add analytics to pages and content
	 * using the attribute analytics_click, eg: <a analytics_click="fn(arg)fn(arg)" href...>
	 * we look for fn on rei.analytics as follows
	 * */
	 
	var nonJSfn = /[^a-z0-9_$]/gi, leadingQuote = /^['"]/, trailingQuote = /['"]$/;
	$('[analytics_click]').each(function(){
		var list, l = $(this), trim = $.trim;
		list = trim( l.attr('analytics_click') );
		if(!list) return;

		/*
		 * parse attribute value to get fn name and any args
		 * loop thru each fn and set it up with any data, then setup function and attach to click
		 * */
		 
		var fn, args, list = list.split(')');
		while(fn=list.shift()){
			fn = fn.split('(');
			if(fn.length < 2) continue;
			args = trim(fn[1]).replace(leadingQuote, '').replace(trailingQuote, '');
			fn = trim(fn[0].replace(nonJSfn,''));
			if(!fn || !rei.analytics[fn]) continue;
			fn = rei.analytics[fn];
			fn = (function(_fn, _args){ return function(){ _fn(_args); } })(fn, args);
			l.bind('click.analytics',fn);
		}
	});
}
/* $Id: pageLoadTimeTracking.js 1913 2012-03-30 17:17:40Z jowilso $ */

gomez = {
    gs: new Date().getTime(),
    acctId: '2B42D0',
    pgId: subDomain + CQ_Analytics.PageDataMgr.initProperty[ 'scPageName' ],
    grpId: CQ_Analytics.PageDataMgr.initProperty[ 'scTemplateType' ],
    wrate: CQ_Analytics.PageDataMgr.initProperty[ 'pageViewTrackingRate' ]
};

if ( gomez ) {
    gomez.gs = pageLoadStartTime;
}
/* $Id: miniFirst.js 2467 2012-04-23 20:31:24Z jowilso $ */

/*Gomez tag version: 7.0.1*/ var gomez=gomez?gomez:{};gomez.h3=function(d, s){for(var p in s){d[p]=s[p];}return d;};gomez.h3(gomez,{b3:function(r){if(r<=0)return false;return Math.random()<=r&&r;},b0:function(n){var c=document.cookie;var v=c.match(new RegExp(';[ ]*'+n+'=([^;]*)'));if(!v)v=c.match(new RegExp('^'+n+'=([^;]*)'));if(v)return unescape(v[1]);return '';},c2:function(n,v,e,p,d,s){try{var t=this,a=t.domain?t.domain:location.hostname;var c=n+'='+escape(v)+(e?';expires='+e.toGMTString():'')+(p?';path='+p:';path=/')+(d?';domain='+d:';domain='+a)+(s?';secure':'');document.cookie=c;}catch(e){}},z0:function(n){var t=this;if(n){var s =t.b0("__g_c");if(!s)return '';var v=s.match(new RegExp(n+':([^\|]*)'));if(v)return unescape(v[1]);return '';}else return '';},z1:function(n,m){var t=this;if(n){var s=t.b0("__g_c");if(s){if(s.indexOf(n+':')!=-1)s=s.replace(new RegExp('('+n+':[^\|]*)'),n+':'+m);else s=s==' '?n+':'+m:s+'|'+n+':'+m;t.c2("__g_c",s);}else t.c2("__g_c",n+':'+m);};},b2:function(v,s){var t=this,f=new Date(t.gt()+946080000000),g=''+v+'_'+s;t.c2('__g_u',g,f);t.gc.c=v;t.gc.d=s;t.z1('c',v);t.z1('d',s);},gt:function(){return new Date().getTime()},b5:function(){return new Date().getTime()-gomez.gs},j1:function(h){if(h){if(h.indexOf('<')!=-1||h.indexOf('%3C')!=-1||h.indexOf('%3c')!=-1)return null;if(window.decodeURIComponent)return decodeURIComponent(h);else return unescape(h);}return null;},f1:function(u,t){try{if(u){if(!/(^http|^https)/.test(u)){if(t==1)return gomez.j1(location.hostname);else return u;}var p=new RegExp('(^http|^https|):\/{2}([^\?#;]*)');if(t==1)p=new RegExp('(^http|^https|):\/{2}([^\/\?]*)');var r=u.match(p);if(r&&t==1)return gomez.j1(r[2]);else if(r)return r[0];}return null;}catch(e){return null;}},j3:function(n){try{var t =this,key=escape((window.location+n).replace(new RegExp("([:\/\.])","gm"),""));if(key&&key.length>100){key=key.substring(0,100);}if(window.localStorage){window.localStorage.setItem(key, t.gt());}else{t.z1('r',key+'___'+t.gt());}}catch(e){return ;}}, j2:function(){try{var m,t =this,key=escape((document.referrer+window.location).replace(new RegExp("([:\/\.])","gm"),""));if(key&&key.length>100){key=key.substring(0,100);}if(window.localStorage){m=window.localStorage.getItem(key);}if(!m){var c=t.z0("r");if(c){var r=c.split('___');if(r &&r[0]==key){m=r[1];}};};t.j4();return m;}catch(e){return ;}}, j4:function(){try{var t =this;if(window.localStorage){var key=escape((document.referrer+window.location).replace(new RegExp("([:\/\.])","gm"),""));if(key&&key.length>100){key=key.substring(0,100);}window.localStorage.removeItem(key);}else{t.z1('r', '');}}catch(e){return ;}}, j5:function(){var ret='';for(var i=0;i<3;i++){ret =ret +(((1+Math.random())*0x10000)|0).toString(16).substring(1);}ret =parseInt(ret, 16);return ret;},j6:function(){var t =this;var g=t.b0("__g_u");if(g&&g!='1'&&g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1){var r =g.split("_");if(r.length>5){if(parseInt(r[5])<new Date().getTime()){return undefined;}else{return parseFloat(r[2]);}}}return undefined;},nameEvent:function(){},startInterval:function(){},endInterval:function(){},customValue:function(){}});gomez.P=function(){};gomez.P.prototype={hash:function(o){if(!o)return '';var t=this,s='{n:'+t.f9(o['n'])+'|';for(var i in o){if(i=='n')continue;if(typeof(o[i])=='string'||typeof(o[i])=='number')s +=i+':'+t.f9(o[i])+'|';};s=s.substring(0,s.length-1);return s+'}';},f9:function(s){s=''+s;s=s.replace('|','#$#').replace(':','$*$').replace('{','@#@').replace('}','*@*').replace('&','!*!');return s;},g0:function(){var t=this,z=gomez;if(z.grpIds)z.h3(z.gc,z.grpIds);if(z.wrate)z.gc.r=z.wrate;z.gc.e=z.grpId;for(var i=1;i<5;i++){if(z["grpId"+i]!=undefined){z.gc["e"+i]=z["grpId"+i];}}z.gc.b=z.pgId;z.gc.l=z.f1(z.m,2);if(self.screen){z.gc.m=screen.width;z.gc.o=screen.height;}else if(self.java){var j=java.awt.Toolkit.getDefaultToolkit();var s=j.getScreenSize();z.gc.m=s.width;z.gc.o=s.height;};z.gc.p=navigator.platform;if(navigator.cpuClass)z.gc.q=navigator.cpuClass;if(!z.gc.f&&!z.gc.g){try{var a=new Array("MSIE","Firefox","Opera","Safari","Chrome"),b=document.createElement('div');if(b.addBehavior&&document.body){b.addBehavior('#default#clientCaps');z.gc.k=b.connectionType;}}catch(e){};for(var i=0;i<a.length;i++){if(navigator.userAgent.indexOf(a[i])!=-1){z.gc.g=a[i];z.gc.f=(new String(navigator.userAgent.substring(navigator.userAgent.indexOf(a[i])).match(/[\d.]+/))).substring(0);}}if(!z.gc.f&&!z.gc.g){z.gc.g=navigator.vendor||navigator.appName;z.gc.f=(new String(navigator.appVersion.match(/[\d.]+/))).substring(0);}}return t.hash(z.gc);}};try{gomez.gc={'n':'c'};var iU=gomez.b0('__g_u');if(iU==undefined||iU==''){gomez.b2(gomez.j5(), 0);}var sR=gomez.j6();if(sR==undefined){sR=1;gomez.isFirstVi=true;}else{gomez.isFirstVi=false;}var wR=gomez.wrate?parseFloat(gomez.wrate):(gomez.wrate==0?0:1);wR=wR<0?0:(wR>1?1:wR);gomez.inSample=gomez.z0('a');if(!gomez.inSample||gomez.inSample==''){if(gomez.b3(wR*sR)){gomez.inSample=1;}else{gomez.inSample=0;}gomez.z1('a', gomez.inSample);}else{gomez.inSample=parseInt(gomez.inSample);}gomez.runFlg=gomez.inSample>0;if(gomez.runFlg){gomez.clickT=gomez.j2();gomez.h1=function(v,d){return v?v:d};gomez.gs=gomez.h1(gomez.gs,new Date().getTime());gomez.acctId=gomez.h1(gomez.acctId,'');gomez.pgId=gomez.h1(gomez.pgId,'');gomez.grpId=gomez.h1(gomez.grpId, '');gomez.E=function(c){this.s=c;};gomez.E.prototype={g1:function(e){var t=gomez,i=t.g6(e);if(i)i.e=t.b5();}};gomez.L=function(m){this.a=m;};gomez.L.prototype={g2:function(m){var t=gomez,n=t.b5();var s=document.getElementsByTagName(m);var e=t.k;if(m=='script')e=t.j;if(m=='iframe')e=t.l;if(s){var l=s.length;for(var i=0;i<l;i++){var u=s[i].src||s[i].href;if(u &&!e[u]){var r =new gomez.E(e);t.grm[u]=r;e[u]=new t.c7(u, n);if(t.gIE&&m=='script')t.e2(s[i],'readystatechange',t.d2,false);else t.e2(s[i],'load',r.g1,false);}}}}};gomez.L.m=new Object;gomez.S=function(){var t=this,h=gomez.acctId+".r.axf8.net";t.x=('https:'==location.protocol?'https:':'http:')+'//'+h+'/mr/b.gif?';t.pvHttpUrl=('https:'==location.protocol?'https:':'http:')+'//'+h+'/mr/e.gif?';t.abHttpUrl=('https:'==location.protocol?'https:':'http:')+'//'+h+'/mr/f.gif?';};gomez.h2=function(){var t=this;t.gIE=false;t.f=new Object;t._h=0;t.j=new Object;t.k=new Object;t.l=new Object;t.m=location.href;t.p=-1;t.q=-1;t.u=new Array;t._w=false;t.gSfr=/KHTML|WebKit/i.test(navigator.userAgent);t.grm=new Object;t.b;t.d=false;t.x=false;t.s=new gomez.S;t._a=false;t.h6=false;t.n1=0;t.c=false;};gomez.h3(gomez,{h5:function(u){try{var s=document.createElement('script');s.async=true;if(navigator.userAgent.indexOf('Firefox/3.5')!=-1){s.defer=true;}s.src=u;s.type='text/javascript';if(document.body)document.body.appendChild(s);else if(document.documentElement.getElementsByTagName('head')[0])document.documentElement.getElementsByTagName('head')[0].appendChild(s);}catch(e){var t=gomez;if(t.gSfr)document.write("<scr"+"ipt src='"+u+"'"+"><\/scr"+"ipt>");}},a9:function(){var t=gomez,i=t.z0('a'),g=t.b0('__g_u'),h=t.z0('h'), b=t.z0('b');t.gc.h=b;if(h)t.n1=parseInt(h);if(!t.gc.h)t.gc.h=1;t.z1('b',parseInt(t.gc.h)+1);if(i){t.a=parseInt(i);if(t.a==1){t._w=true;}else if(t.a==3){t.x=true;t._w=true;};t.d=true;}if(!t.gc.a)return;if(b){t.gc.c=t.z0('c');t.gc.i=t.z0('e');t.gc.j=t.z0('f');t.iFS=false;}else {var s='v=1';t.c2('__g_u','1',new Date(t.gt()+1000));t.iFS=true;if(t.b0('__g_u')&&g&&g!='1'&&g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1){s='v=0';var r=g.split('_');t.b2(parseInt(r[0]),parseInt(r[1])+1);if(r[4]&&r[4]!='0'&&t.gt()<parseInt(r[5])&&r[2]&&r[2]!='0'){t.b1(parseFloat(r[2]),parseFloat(r[3]),parseFloat(r[4]),parseInt(r[5]));if(r[6])t.n0(parseInt(r[6]));};};t.h6=true;};t.gc.d=t.z0('d');if(!t.gc.d||(t.gc.d&&t.gc.d==0)){t.z1('d',1);t.gc.d=1;}t.b=t.z0('g');t.j8();if(i &&!t.isFirstVi&&t._w&&!t._a){t.h7();t._a=true;};},h7:function(){var t=gomez,u=t.tloc?t.tloc:('https:'==location.protocol?'https:':'http:')+'//'+t.acctId+'.t.axf8.net/js/gtag7.0.js';t.h5(u);},n0:function(h){var t=gomez,f=new Date(t.gt()+946080000000),g=t.b0('__g_u');t.n1=h;t.z1('h',h);if(g&&g!='1'&&g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1){var r=g.split('_');g=''+r[0]+'_'+r[1]+'_'+r[2]+'_'+r[3]+'_'+r[4]+'_'+r[5]+'_'+h;t.c2('__g_u',g,f);};},b1:function(v,s,q,f){var t=this;if(s ==undefined)s =1;t.d=true;t.z1('e',v);t.z1('f',s);t.gc.i=v;t.gc.j=s;t.h4(v,s,q,f);},b3:function(i, v, s){var t =this;t.d=true;if(s ==undefined)s =1;if(i==0||i==1){t.a=i;if(i==1){t._w=true;if(!t._a){t.h7();t._a=true;};}else{t.d=false;}t.z1('a',t.a);if(v !=undefined){t.b1(v, s);}}else if(i==2){t.h4(v, s);}},h4:function(o,p,q,d){var t=this,f=new Date(t.gt()+946080000000),g=t.b0('__g_u');if(g&&g!='1'&&g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1){var r=g.split('_'),s;if(d)s=d;else if(q&&q>=0)s=new Date(t.gt()+parseInt(q*86400000)).getTime();else{q=5;s=new Date(t.gt()+432000000).getTime();};g=''+r[0]+'_'+r[1]+'_'+o+'_'+p+'_'+q+'_'+s;t.c2('__g_u',g,f);};},b6:function(){var t=gomez;t.p=t.b5();},f8:function(){var t=this;if(t.pollId1)clearInterval(t.pollId1);},b7:function(){var t =gomez;t.f8();t.q=t.b5();},c7:function(u, s){var t=this;t.m=u;t.s=s;},c8:function(){var t=gomez,n=t.b5(),l=document.images.length;if(l>t._h){for(var i=t._h;i<l;++i){var u=document.images[i].src;if(u){var r =new gomez.E(t.f);t.grm[u]=r;t.f[u]=new t.c7(u, n);t.e2(document.images[i],'load',t.c4,false);t.e2(document.images[i],'error',t.c5,false);t.e2(document.images[i],'abort',t.c6,false);}}}t._h=l;},c4:function(e){var t=gomez,i=t.g6(e);if(i)i.e=t.b5();},c5:function(e){var t=gomez,i=t.g6(e);if(i){i.e=t.b5();i.b=1;}},c6:function(e){var t=gomez,i=t.g6(e);if(i)i.a=t.b5();},g6:function(e){var t=gomez,e=window.event?window.event:e,a=t.d8(e),i;if(t.grm[a.src||a.href]&&t.grm[a.src||a.href].s)i=t.grm[a.src||a.href].s[a.src||a.href];return i;},d2:function(){var t=gomez;var e=window.event?window.event:e,s=t.d8(e);if(s.readyState=='loaded'||s.readyState=='complete'){var o=t.j[s.src];if(o)o.e=t.b5();}},nameEvent:function(n){var t=this;t.f6(n,1);},startInterval:function(n){var t=this;t.f6(n,2,1);},endInterval:function(n){var t=this;t.f6(n,2,2);},f6:function(n,p,b){if(n&&n.length>20)n=n.substring(0,20);var t=this,f=t.u;if(p==3){f[f.length]={'n':'a','a':n,'b':b,'e':p,'f':undefined};}else{f[f.length]={'n':'a','a':n,'b':t.b5(),'e':p,'f':b};}},customValue:function(n,v){var t=this;if(typeof(v)!='number'){return;}t.f6(n,3,v);},d8:function(e){if(gomez.gIE)return e.srcElement||{};else return e.currentTarget||e.target||{};},e2:function(e,p,f,c){var n='on'+p;if(e.addEventListener)e.addEventListener(p,f,c);else if(e.attachEvent)e.attachEvent(n, f);else{var x=e[n];if(typeof e[n]!='function')e[n]=f;else e[n]=function(a){x(a);f(a);};}},i1:function(){var d =window.document, done=false,i2=function (){if(!done){done=true;gomez.b6();gomez.a9();}};(function (){try{d.documentElement.doScroll('left');}catch(e){setTimeout(arguments.callee, 50);return;}i2();})();d.onreadystatechange=function(){if(d.readyState=='complete'){d.onreadystatechange=null;i2();}};},j7:function(s, toUrl){try{var t=this,z=gomez;if(!s)return;s+="{n:u|e:1}";var p ='';if(t.isFirstVi){p='&a='+z.acctId+'&r=1&s=1';}else if(t.iFS){p='&a='+z.acctId+'&r='+t.j6();}if(window.encodeURIComponent)s=encodeURIComponent(s);else s=escape(s);z.h5(z.e(toUrl)+'info='+s+p);}catch(err){}return;},e:function(u){if(!/\?|&/.test(u))if(!/\?/.test(u))u +='?';else u +='&';return u;},j8:function(){var t=gomez, p=new gomez.P();var s=p.g0();t.j7(s, t.s.pvHttpUrl);},g7:function(){try{var t=gomez;t.gc.a=t.acctId;/*@cc_on t.gIE=true;@*/if(!t.gIE)t.gIE=!-[1,];if(t.gIE){t.i1();window.attachEvent('onload', t.b7);}else if(window.addEventListener){window.addEventListener('DOMContentLoaded', t.b6, false);window.addEventListener('load', t.b7, false);}else if(t.gSfr){var m=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(m);delete m;t.b6();t.b7();}}, 10);}else return;if(!t.jbo){t.c8();t.pollId1=setInterval(t.c8, 10);}if(!t.gIE)t.a9();}catch(e){return;}}});gomez.h2();gomez.g7();}}catch(e){};
