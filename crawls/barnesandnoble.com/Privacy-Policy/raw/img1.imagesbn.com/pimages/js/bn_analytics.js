//certona singleton
BN('Analytics.Tools.Certona',function(){
	var nullfn=function(){};
	return {
		setup:nullfn,
		testStr:nullfn,
		loadJs:nullfn,
		setupEvents:nullfn,
		show:nullfn
	};
});
BN('Analytics.Widgets', function() {
	var SetIdentifyingData = function(root) {
		var props = {
			setDataType:'',
			widgetName:'',
			setDataFilter:'',
			widgetType:"Rows"
		};
		var setupData = function(obj){
			props.setDataType = obj.dataType;
			props.setDataFilter = obj.dataFilter;
			props.widgetName = obj.name;
		};

		var init = function(dataSearchRoot) {
			var dataSource = dataSearchRoot.find('.product-set-data');
			var name = dataSearchRoot.find("[data-BNWidgetName]").attr("data-BNWidgetName") || dataSearchRoot.attr("data-BNWidgetName"),
					dataType = dataSource.attr('data-metrics-setType'),
					filter =dataSource.attr('data-metrics-setTypeModifier');
			setupData({
				'name':name,
				'dataFilter':filter,
				'dataType':dataType
			});
		};
		if(root){
			init(root);
		}
		return {
			getSetDataType: function(){return props.setDataType;},
			getSetFilterType: function(){return props.setDataFilter;},
			getWidgetName: function(){return props.widgetName;},
			getWidgetType: function(){return props.widgetType;},
			setData:setupData, //this should be relatively immutable - so this is removed by factory
			setWidgetType: function(type){props.widgetType=type;},
			setProductRoot: init
		};
	};

	return {
		productSetDataFactory: function(root){
			var obj = new SetIdentifyingData();
			if(root.name && root.dataType && !(root.html) ){//duck type params
				obj.setData(root);
			} else{
				obj.setProductRoot(root);
			}
			delete obj.setData;
			return obj;
		}
	};
});
BN('PageInjection', function() {
	var trackReg = function() {
		var parts, emh, ut, email;
		var tempCmRegData = (typeof bnNav !== 'undefined' && typeof bnNav.getCookie !== 'undefined') ? bnNav.getCookie('tempCmRegData') : null;
		if (tempCmRegData) {
			parts = tempCmRegData.split('&');
			emh = parts[0].split('=')[1];
			ut = parts[1].split('=')[1];
			email = parts[2].split('=')[1];
			cmCreateRegistrationTag(emh, email, '', '', '', ut);
			// cleanup when we're done      
			bnNav.setCookie("tempCmRegData", '', -1);
		}
	};
	var bottomBeforeGA = function() {
		var aTools = BN.Analytics.TagLibrary;
		try {
			aTools.getTag('pageView').exec();
		} catch (e) {
			//alert('error:'+e.message);
		}

		trackReg();
	};

	return {
		beginBody: function() { },
		bottomBeforeGAInclude: bottomBeforeGA,
		bottomAfterGAInclude: function() { }
	};
});
/*code for specific tagging here, and in  jquery-pdp */
BN('Analytics.Utils', function(){
	var log = function(m){
		if(typeof console !== "undefined"){
			console.log("--- "+m+" ---");
		}
	};
	var cmElementTagUtil = function(){
		var setup = function(root){
			root = root || 'body';
			/*if($('.overlay form').exists()) { // if overlay, start there as top node
			 root = $('.overlay form');
			 }*/
			$(root).find("input[cmtagdata]").each(function(){
				var eventType = "blur";
				switch($(this).attr('type')){
					case 'password':
					case 'text':
						if($(this).val() !== ""){ // if hasvalues(Editing), update config object
							this.config = {value: $(this).val()};
						}
						break;
					case 'radio':
					case 'checkbox':
						eventType = 'mousedown';
						break;
				}
				$(this).bind(eventType, function(){
					trackFormElements(this);
				});
			});
			$(root).find("select[cmtagdata]").bind('change', function(){
				trackFormElements(this);
			});
			$(root).find("a[data-cmelementid]").bind('click', function(){
				trackLinks(this);
			});
		};

		var trackFormElements = function(el, err){
			var cmArgArray, aLength, extraAttr, s, elAttr, error;
			if(cache(el) !== null || err === true){
				elAttr = $(el).attr("cmtagdata");
				cmArgArray = elAttr.split("|");
				aLength = cmArgArray.length;
				error = (err) ? "Error: " : "";
				if(aLength > 0){
					if(aLength === 2){
						cmCreatePageElementTag("'"+error+cmArgArray[0]+"'", "'"+cmArgArray[1]+"'");
						//log("cmCreatePageElementTag('"+error+cmArgArray[0]+"', '"+cmArgArray[1]+"')");
					}else if(aLength > 2){
						extraAttr = "";
						for(s=2; s<aLength; s++){
							if (extraAttr === ""){
								extraAttr = cmArgArray[s];
							}else{
								extraAttr += "-_-" + cmArgArray[s];
							}
						}
						cmCreatePageElementTag("'"+error+cmArgArray[0]+"'", "'"+cmArgArray[1]+"'", extraAttr);
						//log("cmCreatePageElementTag('"+error+cmArgArray[0]+"','"+cmArgArray[1]+"', '"+extraAttr+"')");
					}
				}else{
					cmCreatePageElementTag(error+elAttr);
					//log("cmCreatePageElementTag('"+error+elAttr+"')");
				}
			}
		};
		var cache = function(el){
			el.config = el.config || {};
			if(el.config.value !== el.value && el.value !== ""){
				el.config = {value: el.value};
				return el;
			}
			return null;
		};
		var errorCheck = function(form){
			$(form).find(':input.required').each(function() {
				if($(this).hasClass("errorField")){
					trackFormElements(this, true);
				}
			});
		};
		var trackLinks = function(link){
			var linkElementId = $(link).attr("data-cmelementid");
			var linkElementCategory = $("body").attr("id").split('-')[1]; // this needs to be updated to use PageData Object
			linkElementCategory = (!$(".content").is('#ebook')) ? linkElementCategory : "ebookproduct";
			cmCreatePageElementTag(linkElementId, linkElementCategory);
			//log("cmCreatePageElementTag('"+linkElementId+"', "+linkElementCategory+"')");
		};
		return {
			setup: setup,
			logErrors: errorCheck
		};
	};
	return {
		cmElementTagUtil: cmElementTagUtil
	};
});

// Aster tracking
BN('Analytics.BNTracking', function(){
	var isEnabled = true;
	var domain = document.location.protocol + '//pnr.barnesandnoble.com';
	var webServiceProductUrl = domain + '/ws/v2/bntracking/SetProductViewed/';
	var webServiceOrderUrl = domain + '/ws/v2/bntracking/SetProductPurchased/';
	var img = new Image();
	var getEan = function(){
		var found, result, eanHalf, str = document.location.toString();
		if (BN.Page && BN.Page.CoremetricsData && BN.Page.CoremetricsData.ean) {
			result = BN.Page.CoremetricsData.ean;
		}
		else {
			found = str.match(/(?:EAN|ISBN)=([0-9X]{3,13})&?/i);
			if (found) {
				result = found[1];
			}
			else {
				eanHalf = str.split('/e/')[1];
				if(typeof eanHalf !== 'undefined'){
					result = eanHalf.split('/')[0];
				}
			}
		}
		return result;
	};

	return {
		createOrderTag: function(eans, url, delim){
			if (eans && isEnabled) {
				delim = delim || ',';
				eans = (typeof eans === 'string') ? eans : eans.join(delim);
				webServiceOrderUrl = url || webServiceOrderUrl;
				img.src = webServiceOrderUrl + eans + '/';
			}
		},
		createProductTag: function(ean, url){
			if(ean && isEnabled){
				webServiceProductUrl = url || webServiceProductUrl;
				img.src = webServiceProductUrl + ean + '/';
			}
		},
		getEan: getEan
	};
});

/* 
 TO DO: THE MODULES BELOW CAN GO AT THE BOTTOM OF THE PAGE
 */

BN('Analytics.TagLibrary', function() {
	var metrics = function() {
		return (BN.Page && BN.Page.Metrics) ? BN.Page.Metrics : false;
	};

	//this contains the page object and the definitions for each page. It ultimately
	var getPageType = function() {

		//Page type object needs it's setters set - then tag fn's can use the right pages type for its tags:
		var PageType = function() {
			//this object represents all the paramaters pages use. Not all must be set for all page types.
			// As long as the tags that use the page type have their params supported.
			var params = {
			};
			var setParam = function(n, fn) {
				params[n] = function() {
					return fn(metrics());
				};
			};

			var getParam = function(n) {
				var result;
				if (params[n]) {
					result = params[n]();
				} else if (metrics()[n]) {
					result = metrics()[n];
				} else {
					//alert('no algorithm defined for paramater '+n);
				}
				return result;
			};



			return {
				defineParameter: setParam,
				getParamNamed: getParam
			};
		};


		//set up all potential page type patterns - could set up only current page, hesitating on multiple 'types' for single page, but different 'needs'.
		// MBiagetti: These types translate the basic matrics values into patterns and combinitions specifically requested by the business for reporting.
		// ie: for the product page's id, the pattern is {metrics.PageName}:{metrics.title}({metrics.ean}),
		// which evaluates to: "PRODUCT:Harry Potter and the Half-Blood Prince (Harry Potter #6)(9780439784542)"

		var types = {};

		//BEGIN SEARCH type
		var searchPageType = new PageType();

		searchPageType.defineParameter('PageId', function(d) {
			return d.pageName + (d.pageNumber) ? (' Page ' + d.pageNumber) : '';
		});

		searchPageType.defineParameter('CategoryId', function(d) {
			return d.pageCategory + ': ' + d.pageSubCategory;
		});

		searchPageType.defineParameter('SearchTerm', function(d) {
			return d.searchTerm || 'no search term';
		});
		searchPageType.defineParameter('pageTypeName', function(d) {
			return "Search Results" + " - " + d.pageCategory;
		});

		//END SEARCH type - now adds to list
		types.Search = searchPageType;

		//BEGIN Product type
		var productPageType = new PageType();

		productPageType.defineParameter('PageId', function(d) {
			return d.pageName + ":" + d.title + "(" + d.ean + ")";
		});

		productPageType.defineParameter('CategoryId', function(d) {
			return d.pageSubCategory;
		});

		productPageType.defineParameter('pageTypeName', function(d) {
			return "Product Page";
		});

		productPageType.defineParameter('isPageUrlVaried', function(d) {
			return true;
		});

		//END Product type - now adds to list
		types.Product = productPageType;

		//Begin CART page type
		var cartPage = new PageType();

		cartPage.defineParameter('PageId', function(metricsData) {
			return 'cart:' + metricsData.pageName;
		});

		//END cart type - now adds to list
		types.Cart = cartPage;

		//Begin CDS page type
		var CDSPage = new PageType();

		CDSPage.defineParameter('PageId', function(metricsData) {
			return metricsData.pageName + ': ' + metricsData.pageSubName + ' - ' + metricsData.pageDescription;
		});

		CDSPage.defineParameter('PageCategory', function(metricsData) {
			return metricsData.pageCategory;
		});
		//END CDS type - now adds to list
		types.CDS = CDSPage;

		//this returns only the right one.
		//i.e: pageType='search' eventType:'something elese'
		return types[metrics().pageType];
	};


	var Tag = function(fn) { //fn expected to return a function
		var pageType = getPageType();

		var exec = fn(pageType); //This should be a function

		return {
			exec: exec
		};
	};

	var TagLibrary = (function() {
		var isInitialized = false;
		var ensureInit = function() {
			if (isInitialized === false) {
				isInitialized = true;
				setupLibrary();
			}
		};

		var tags = {};
		var addTag = function(name, tag) {
			tags[name] = (typeof tag === 'function') ? new Tag(tag) : tag;
		};
		var getTag = function(n, dontClone) {
			ensureInit();
			return tags[n];
		};
		return {
			addTag: addTag,
			getTag: getTag
		};
	}());

//this is executed later (on begin page) because metrics data may not be set when it is loaded. getPageType() contains the reference to metrics.
	var setupLibrary = function() {

		/*	var pageViewTag = new Tag(function(pt){
		 return function(){
		 var production = (BN.Page.NavData.environment === 'Production');
		 if (production) {
		 cmSetProduction();
		 }
		 //			alert(pt.getramNamed('PageId')+' '+pt.getParamNamed('CategoryId')+' '+pt.getParamNamed('searchTerm')+' '+pt.getParamNamed('numberOfResults'));
		 //cmCreatePageviewTag(pt.getParamNamed('PageId'),pt.getParamNamed('CategoryId'),pt.getParamNamed('searchTerm'),pt.getParamNamed('numberOfResults'));
		 TagLibrary.getTag('PageViewTag').exec("1", "2");

		 };
		 });
		 */
		//		var optimostTag = new Tag(function(pt){
		//			BN_Analytics.setPageName(pt.getParamNamed('OptimostName'));
		//		});
		//pageViewTag();


	};



	return {
		addTag: TagLibrary.addTag,
		getTag: TagLibrary.getTag,
		hasMetrics: metrics
	};

});


/*
 @Namespace BN.Analytics
 @Module TagRules stores Coremetrics rulesets
 @Return a Coremetrics ruleset as object
 */
BN('Analytics.TagRules',function(){
	var ruleSets = {};
	var addRuleSet =function(n){
		if(!ruleSets[n]){
			ruleSets[n]={};
		}
	};
	var getRuleSet = function(n,silent){
		var result={};
		if(ruleSets[n]){
			result= ruleSets[n];
		}else if(silent){//do nothing
		}else{
			throw new Error('Rule set '+n+' doesnt exist');
		}
		return result;
	};
	var addRule=function(setName,ruleName,ruleObj){
		var set = getRuleSet(setName);
		set[ruleName]=ruleObj;
	};
	var getRule=function(setName,ruleName){
		return getRuleSet(setName)[rukeName];
	};
	var globalClickItems = {
		productSelectMenu : {
			idBase : 'SEARCH FIELD:',
			selector : '.ui-selectmenu li',
			idModifier : function(el,rule){return '';},
			categoryBase : 'MENU',
			categoryModifier : function(el,rule){
				var selection = $(el).text();
				return selection;
			}
		}
	};
	var searchClickItems = {
		addToCartRule: {
			idBase:'',
			selector:'.purchase-style-button',
			idModifier:	function(el, rule){
				//Shop Action : From <Current Shop Action>
				//Purchase Type : Product Type
				// parse href for product code
				var href = $(el).attr('href'),
						purchaseType = $(el).text(),
						productCode = BN.Navigation.URL.newURL(href).queryValue('productcode'),
						productName,
						idModifierString;

				switch (productCode) {
					case 'BK':
						productName = "BOOK";
						break;
					case 'MU':
						productName = "MUSIC";
						break;
					case 'DV' :
						productName = "DIGITAL VIDEO/BLUE RAY";
						break;
					case 'Video' :
						productName = "VIDEO";
						break;
					case 'ER' :
						productName = "EBOOK";
						break;
					case 'DM' :
						productName = "DIGITAL MAG";
						break;
					case 'GG' :
						productName = "VIDEO GAME";
						break;
					case 'XB' :
						productName = "TOYS";
						break;
					case 'MO' :
						productName = "PRINT MAG";
						break;
					case 'DP' :
						productName = "AUDIO BOOK MP3/DOWNLOADABLE SPARK CHART";
						break;
					case 'WA' :
						productName = "WARRANTY";
						break;
					case 'VH' :
						productName = "VIDEO CASSETTE";
						break;
					default :
						productName = "NO CATEGORY FOR PRODUCT CODE : " + productCode;
				}
				idModifierString = purchaseType +": "+productName;
				//log(idModifierString);

				return idModifierString;
			},
			categoryBase:'SHOP ACTION: FROM SEARCH RESULTS',
			categoryModifier:function(el, rule){
				var categoryModifierString;
				var pUrl = document.location.href;
				if (BN.Navigation.URL.newURL(pUrl).queryValue('store')) {
					categoryModifierString = BN.Navigation.URL.newURL(pUrl).queryValue('store');
				}
				else {
					categoryModifierString = "ALL PRODUCTS";
					//log(BN.Navigation.URL.newURL(pUrl).queryValue('store'));
				}
				return categoryModifierString;
			}
		}
	};
	var resolveSpecificTagRules = function (r){
		//allow parameter as a string, return the one rule specified
		if(typeof r === "string") {
			return clickItems[r];
			//console.log(clickItems[r]);
		}
		else { //allow parameter as an obj, returns obj passed
			return r;
		}
	};
	return {
		getClickTagRules:function(){return globalClickItems;},
		getSearchTagRules:function() {return searchClickItems;},
		getSpecificTagRules: resolveSpecificTagRules,
		getKeyUpRules: function(){return enterKeyItems;},
		getFocusRules: function(){return focusItems;},
		getRuleSet:getRuleSet,
		getRule:getRule,
		addRule:addRule,
		addRuleSet:addRuleSet
	};
});

/*
 @Namespace BN.Analytics
 @Module Tag Application, iterates through current rules and fires CM function with appropriate parameters
 */
BN('Analytics.TagApplication', function() {
	var registerRulesForTags = function (rules, event){
		var ruleName;
		var createMetricsPerRule = function(currentRule,ruleName, event){
			$(currentRule.selector).bind(event, function(e){
				cmCreatePageElementTag(currentRule.idBase + currentRule.idModifier(this, currentRule), currentRule.categoryBase + " : " + currentRule.categoryModifier(this, currentRule));
			});
		};

		for(ruleName in rules){
			if(rules.hasOwnProperty(ruleName)){
				createMetricsPerRule(rules[ruleName],ruleName, event);
			}
		}

	};
	var executeMetricRules = function(rules) {
		var ruleName;
		var fireMetricsPerRule = function(currentRule, ruleName){
			cmCreatePageElementTag(currentRule.idBase + currentRule.idModifier(this, currentRule), currentRule.categoryBase + " : " + currentRule.categoryModifier(this, currentRule));
		};
		for(ruleName in rules){
			if(rules.hasOwnProperty(ruleName)){
				fireMetricsPerRule(rules[ruleName],ruleName);
			}
		}
	};

	var applyRules = function(ruleSetName) {
		var ruleName;
		var ruleSet = Rules.getRuleSet(ruleSetName);
		for(ruleName in rules){
			if(rules.hasOwnProperty(ruleName)){
				applyRule(rules[ruleName]);
			}
		}
	};

	var applyRule=function(rule){

		var applyRuleTo=function(el){
			var i;
			if (typeof rule.tagName !== 'object') { //if not an array
				TagLib.getTag(rule.tagName).exec(el||undefined,rule );//Change to .apply call syntax
			}else{
				for(i=0;i<rule.tagName.length;i++){
					TagLib.getTag(rule.tagName[i]).exec(el||undefined,rule );
				}
			}
		};

		if(rule.selector){
			$(rule.selector).each(function(){
				applyRuleTo(this);
			});
		}else{
			applyRuleTo();
		}
	};

	return {
		applyRuleSet:applyRules,
		applyRule:applyRule,
		registerRulesForTags: registerRulesForTags,
		executeMetricRules: executeMetricRules
	};
});


$(function() {

	// cmSetProduction() is include in other ways as well on the site.  For the first use of this tag, in the Format Collapsed product page, I cannot determine how it was being used, so I am including it here for now for saftey.  It is okay if it is called twice. 
	if (BN && BN.Page && BN.Page.NavData && BN.Page.NavData.environment && BN.Page.NavData.environment === 'Production') {
		cmSetProduction ();
	}

	// call all appropriate click metric rules,  pass CM its values
	var clickRules = BN.Analytics.TagRules.getClickTagRules();
	BN.Analytics.TagApplication.registerRulesForTags(clickRules, 'click');
	//BN.Analytics.ManualLinkTag.reportManualClick('searchMenuSelected');

	/* New way of storing metrics tags in a taglibrary */
	BN(['BN.Analytics.TagLibrary'], function($, TagLib) { //This makes TagLib equivelant to BN.Anylitics.TagLibrary

		//********************************************************************
		//*************** ELEMENTALS ****************************************
		//*********************************************************************


		/* TODO: we need to figure out what this definition should look like.
		 TagLib.addTag('PageViewTag', function(pageType) {
		 return function(pageId, categoryId, searchString, searchResults, attributes, bnCustomerID, bnURL, storeId, experimentID, variationID) {
		 cmCreatePageviewTag(pageId, categoryId, categoryId, searchString, searchResults, attributes, bnCustomerID, bnURL, storeId, experimentID, variationID);
		 };
		 });*/

		TagLib.addTag('PageView-Base', function(pt) {
			return function() {
				cmCreatePageviewTag(pt.getParamNamed('PageId'), pt.getParamNamed('CategoryId'), pt.getParamNamed('searchTerm'), pt.getParamNamed('numberOfResults'));
			};
		});
		TagLib.addTag('ProductView-Base', function() {
			return function(productID, productName, categoryID, attributes) {
				attributes = attributes || [];
				var attributeString = attributes.join("-_-");
				cmCreateProductviewTag(productID, productName, categoryID, attributeString);
			};
		});
		TagLib.addTag('RETag-Base', function(pt) {
			return function(anchorElement, version, area, link) {
				$(anchorElement).click(function(){
					var urlObj = BN.Navigation.URL.newURL(anchorElement.href);
					urlObj.updateQuery({ 'cm_re': version + '-_-' + area + '-_-' + link });
					this.href = urlObj.getFullLocation();
				});
			};
		});


		TagLib.addTag('ElementTag-Base', function(pageType) {
			return function(elementId, categoryId, attributes) {
				cmCreatePageElementTag(elementId, categoryId, attributes);
			};
		});



		TagLib.addTag('SitePromotion-Base', function(pt) {
			/*
			 *	This generates a cormetrics Site Promtion query string value.
			 *	If required, this fires coremtrics' ManualSitePromotion call instead of modifiy a query string.
			 *	Some of this implementation is currently duplicated in IndexedSitePromotion at this time.
			 *
			 */

			function constructSitePromotionSyntax (usePageName, area, linkType, linkName) {

				var promotionValues = [];
				var queryStr = "";

				if (usePageName) { promotionValues.push(pt.getParamNamed('pageTypeName')); }
				if (area) { promotionValues.push(area); }
				if (linkType) { promotionValues.push(linkType); }
				if (linkName) { promotionValues.push(linkName); }

				if (promotionValues.length < 3) { promotionValues.push("NA"); }

				// join the first 3 parameters with the separator "-_-"
				queryStr = encodeURIComponent(promotionValues.slice(0, 3).join("-_-"));

				if (promotionValues.length > 3) {
					// then join the remaining parameters with the separator "-"
					queryStr += "_" + encodeURIComponent(promotionValues.slice(3).join("_"));
				}

				return queryStr;
			}

			function locationMinusHashmark(){
				return window.location.href.split(window.location.hash).join("");
			}


			return function(anchorElement, area, linkType, linkName, config) {

				var $anchorElement = $(anchorElement);
				config = config || {};
				config.eventName = config.eventName || "click";
				if (config.eventName != "click"){
					linkType = config.eventName + ((config.eventName && linkType) ?  "_" : "") + linkType;
				}

				if ($anchorElement.size() < 1) {
					return;
				}


				$anchorElement.bind(config.eventName, function(e){
					var targetUrl = BN.Navigation.URL.newURL($anchorElement.attr('href'));
					var currentUrl = {};
					var manualTag = TagLib.getTag('ManualLinkClick-Base');
					var hrefOnlyHashMark = ($anchorElement.attr('href') && $anchorElement.attr('href').indexOf("#") == 0);
					var queryStr = constructSitePromotionSyntax (config.usePageName, area, linkType, linkName);
					var linkLabel = (linkType || "") + (linkType && linkName ? "_" : "") + (linkName || "");
					if (config.onEventCallback) {
						// this call back adds currently is used by the IndexedSitePromotion tag to add a numbered suffix to the querysting, if needed.
						queryStr = config.onEventCallback(queryStr);
					}
					targetUrl.updateQuery({'cm_sp': queryStr});

					config.useManual = (typeof config.useManual !== "undefined") ? config.useManual : hrefOnlyHashMark;
					config.useManual = true;
		
					if (!config.useManual) {
						// The most common path: Update the the <a> in the markup and allow the regular coremetrics link tagging to tranmit the site promotion
						this.href = targetUrl.getFullLocation();
					}
					else if (hrefOnlyHashMark) {
						// else use the current window's url, as per business request, and send a manual coremtrics tracking call
						currentUrl = BN.Navigation.URL.newURL(locationMinusHashmark());
						currentUrl.updateQuery({'cm_sp': queryStr});
						manualTag.exec(currentUrl.getFullLocation(), linkLabel);
					}
					else { // useManual == true but the <a> has an href value
						// and send a manual coremtrics tracking call using the <a>'s href value
						manualTag.exec(targetUrl.getFullLocation(), linkLabel);
					}
					//console.log(this.href);
				});

			};
		});


		TagLib.addTag('SitePromotionEvent-Base', function(pt) {


			return function(eventName, area, linkType, linkName) {
				var linkLabel, qsValue, str;
				var urlObj = BN.Navigation.URL.newURL(window.location.href);
				var manualTag = TagLib.getTag('ManualLinkClick-Base');
				// Create the format: EventName_LinkType_LinkName, where each string is optional.
				linkLabel = (eventName && eventName != "click") ? eventName : "";
				linkLabel += (linkLabel && linkType) ? "_" : "";
				linkLabel += (linkType) ? linkType : "";
				linkLabel += (linkLabel && linkName) ? "_" : "";
				linkLabel += (linkName) ? linkName : "";
				qsValue = pt.getParamNamed('pageTypeName') + "-_-" + area + '-_-' + (linkLabel || "NA");
				str = encodeURI(qsValue);
				urlObj.updateQuery({'cm_sp': str});
				manualTag.exec(urlObj.getFullLocation(), linkLabel);
			};
		});

		TagLib.addTag('ManualLinkClick-Base', function() {
			return function(href, linkName) {
				cmCreateManualLinkClickTag(href, linkName);
			};
		});





		//********************************************************************
		//*************** General Patterns ****************************************
		//*********************************************************************

		TagLib.addTag('PageView', function() {
			/*
			 *	Provide a general PageView Tag that also executes other on-tracking-ready
			 *	tags & functions as need, such as A/B testing Element tracking, and calling
			 *	cmSetProduction()
			 */
			return function() {
				var pageViewTag = TagLib.getTag('PageView-Base');
				var abElementTag = {};

				pageViewTag.exec();

				if (BN && BN.Page && BN.Page.Metrics && BN.Page.Metrics.AB) {
					abElementTag = TagLib.getTag('ABTestElementTag');
					abElementTag.exec(BN.Page.Metrics.AB);
				}

			};
		});

		TagLib.addTag('ABTestElementTag', function() {
			return function(settingsOrExperimentId, experimentName, variationId, variationName) {
				var settingsObject = (typeof settingsOrExperimentId === "object") ? settingsOrExperimentId : {}; // if the first parameter is an object, then assume contains the values for the tested being tracked.
				var tag = TagLib.getTag('ElementTag');
				var elemId, catId;

				if (typeof settingsOrExperimentId === "string") { // otherwise, if the first param is a tring, then assume that all params are strings and build a setting object form them instead
					settingsObject.experimentId = settingsOrExperimentId;
					settingsObject.experimentName = experimentName;
					settingsObject.variationId = variationId;
					settingsObject.variationName = variationName;
				}

				// Then use the settingsObject to report this abtesting experiment
				elemId = settingsObject.variationId + "-" + settingsObject.variationName;
				catId = settingsObject.experimentId + "-" + settingsObject.experimentName;

				tag.exec(elemId, catId, catId + "-_-" + elemId);
			};
		});


		TagLib.addTag('ElementTag', function(pageType) {
			return function(elementId, categoryId, attributes) {
				var elementTag = TagLib.getTag('ElementTag-Base');
				elementTag.exec(elementId, categoryId, attributes);
			};
		});

		/* DEPRICATED - Please use ElementTag indead - This tag will be removed April 2011 - mbiagetti ******************************/
		TagLib.addTag('ElementTagWExploreAttributes', function(pageType) {
			return function(elementId, categoryId, attributes) {
				var elementTag = TagLib.getTag('ElementTag');
				elementTag.exec(elementId, categoryId, attributes);
			};
		});
		/* **************************************************************************************************************************/

		TagLib.addTag('PageSpecificSitePromotionAggregator', function(pt) {
			/*
			 *	This creates a SitePromotionTag that covers a repeating series of links that are desired to be
			 *	rolled up into one single SitePromotion value for an aggregated tracking experience.
			 *	So any links found with the given selector get reported with the same value.
			 *	The a click following links:
			 *	<a>Pride and Prejudice</a>
			 *	<a>Dracula</a>
			 *	<a>HTML</a>
			 *	They would all get reported as the same "Product_Title" click.
			 *
			 */
			return function(selector, pageAreaName, linkTypeName, linkName, config) {
				var sitePromotionTag = TagLib.getTag('SitePromotion-Base');
				var defaultLinkName = function (anchorElement) {
					var text = $(anchorElement).text() || $(anchorElement).attr('title') || "";
					text = text.replace(/\(\d*\)/g, "");
					return $.trim(text);
				};
				linkName = linkName || defaultLinkName;
				linkTypeName = linkTypeName || "";
				config = config || {};
				$(selector).filter("a").each (function (index, anchorElement) {
					var finalLinkName = (typeof linkName === "function") ? linkName(anchorElement) : linkName;
					config.usePageName = true;
					sitePromotionTag.exec(this, pageAreaName, linkTypeName, finalLinkName, config);
				});
			};
		});

		TagLib.addTag('PageSpecificSitePromotion', function() {
			return function(anchorElement, area, linkType, linkName, config) {
				var sitePromotionTag = TagLib.getTag('SitePromotion-Base');
				config = config || {};
				config.usePageName = true;
				sitePromotionTag.exec(anchorElement, area, linkType, linkName, config);
			};
		});


		var sitePromotionCounts = {};
		TagLib.addTag('IndexedSitePromotion', function(pt) {
			/*
			 *	This generates a cormetrics Site Promtion query string value.
			 *	A number optionally added to the querystring value if it's determined that an identical
			 *	SitePromtion was previously generated on the page.
			 *	So, if the following html is found:
			 *			<a>Books</a>
			 *			<a>Books</a>
			 *			<a>Books</a>
			 *			<a>Books</a>
			 *	This tag will generate tracking values of : 
			 *			Books_1
			 *			Books_2
			 *			Books_3
			 *			Books_4
			 *	If required, this fires coremtrics' ManualSitePromotion call instead of modifiy a query string.
			 *	This implementation currently duplicates some functionality in SitePromotion-Base.
			 */


			/* The following two functions should be moved out of this tag for efficiency at runtime. */
			function countThisPromotion(area, linkType, eventName, identifer) {
				// note whether this Site Promotion is unique on the page, or if there's an existing count of identical sitePromotions to this one and increment that count
				var currIdx;
				sitePromotionCounts[area+linkType] = sitePromotionCounts[area+linkType] || {};

				if(sitePromotionCounts[area+linkType][identifer] === undefined){
					sitePromotionCounts[area+linkType][identifer] = 0;
				}

				currIdx =  ++ sitePromotionCounts[area+linkType][identifer];

				var getThisSitePromotionCountSuffix =  function (){
					// find count of this SitePromotion value and if it is > 1, then included it in the reported value					
					return (sitePromotionCounts[area+linkType][identifer] > 1 || sitePromotionCounts[area+linkType+"forceNumbering"]) ? ("_" + currIdx) : "";
				};

				return getThisSitePromotionCountSuffix;
			}



			/* This is will be further refactored for clarity...*/

			return function(anchorElement, area, linkType, linkName, config) {
				var $anchorElement = $(anchorElement);
				var getThisSitePromotionCountSuffix;
				var sitePromotionTag = TagLib.getTag('SitePromotion-Base');
				var identifer;
				var previousCallback;
				config = config || {};
				config.eventName = config.eventName || "click";
				identifer = area + linkType + config.eventName + linkName;

				previousCallback = config.onEventCallback;
				getThisSitePromotionCountSuffix = countThisPromotion(area, linkType, config.eventName, identifer);

				config.onEventCallback = function (queryString) {
					if (previousCallback) {
						queryString = previousCallback(queryString);
					}
					return (queryString += getThisSitePromotionCountSuffix());
				};
				sitePromotionTag.exec (anchorElement, area, linkType, linkName, config);

			};
		});



		TagLib.addTag('AnchorTextSitePromotion', function(pageType) {
			/*  
			 *	This creates a SitePromotion tag with a link name contructed from the text of a given anchor tag.
			 *	As part of a general agreement with business owners, any digits wrapped in paraenthesis are ignored:
			 *	So a click on the html "<a>Books (102)</a>" gets reported as "Books".
			 */
			return function(anchorElement, pageAreaName, linkType, config) {
				var promoElemTag = TagLib.getTag('IndexedSitePromotion');				
				var text = $(anchorElement).text() || $(anchorElement).attr('title') || "";				
//				var cmPrefix = $(anchorElement).attr('cmPrefix') || "";
				var cmPrefix = $(anchorElement).attr('data-cmPrefix') ? $(anchorElement).attr('data-cmPrefix')+"_" : "";				
				text = cmPrefix+text;
				text = text.replace(/\(\d*\)/g, "");
				var linkName = $.trim(text);
				config = config || {};
				promoElemTag.exec(anchorElement, pageAreaName, linkType, linkName, config);
			};
		});





		TagLib.addTag('SitePromotionArea', function(pageType) {
			/* 
			 * This creates a series of AnchorTextSitePromotion tags within a given area of the page.
			 * It does this be iterating thought each anchor element found in the given area and appling
			 * the AnchorTextSitePromotion after a little set up work.
			 */
			return function(areaRootElement, pageAreaName, linkTypeName, config) {
				var anchorTextSitePromotion = TagLib.getTag('AnchorTextSitePromotion');
				var identifer;
				config = config || {};
				linkTypeName = linkTypeName || "";
				identifer = pageAreaName + linkTypeName;
				if (typeof sitePromotionCounts !== "undefined"){
					// This will reset the automatic sitepromition counts as needed.  Will be refactored into separate object.
					sitePromotionCounts[identifer] = {};
				}
				$(areaRootElement).find("a").each (function (index, anchorElement) {
					var configCopy = {};
					$.extend (configCopy, config);
					anchorTextSitePromotion.exec(this, pageAreaName, linkTypeName, configCopy);
				});
			};
		});

		TagLib.addTag('PageSpecificSitePromotionArea-Base', function(pageType) {
			/* 
			 *	This calls simply SitePromotionArea with usePageName set to true
			 */
			return function(areaRootElement , pageAreaName, linkTypeName, config) {
				var sitePromotionAreaTag = TagLib.getTag('SitePromotionArea');
				config = config || {};
				config.usePageName = true;
				sitePromotionAreaTag.exec(areaRootElement , pageAreaName, linkTypeName, config);
			};
		});

		TagLib.addTag('PageSpecificSitePromotionArea', function(pageType) {
			/* This simply provides an interface for calling PageSpecificSitePromotionArea-Base, without an specialized parameters */
			return function(areaRootElement , pageAreaName, linkTypeName, config) {
				var sitePromotionAreaTag = TagLib.getTag('PageSpecificSitePromotionArea-Base');
				sitePromotionAreaTag.exec(areaRootElement,pageAreaName,linkTypeName, config);
			};
		});

		TagLib.addTag('PageSpecificManualSitePromotionArea', function(pageType) {
			/* This creates a series of AnchorTextSitePromotion tags within a given area of the page, with a useManual flag set to true */
			return function(areaRootElement , pageAreaName, linkTypeName, config) {
				var sitePromotionAreaTag = TagLib.getTag('PageSpecificSitePromotionArea-Base');
				config = config || {};
				config.useManual = true;
				sitePromotionAreaTag.exec(areaRootElement,pageAreaName,linkTypeName, config);
			};
		});

		TagLib.addTag('PageSpecificHoverSitePromotionArea', function(pageType) {
			/* This creates a series of AnchorTextSitePromotion tags within a given area of the page, with a useManual flag set to true */
			return function(areaRootElement , pageAreaName, linkTypeName, config) {
				var sitePromotionAreaTag = TagLib.getTag('PageSpecificSitePromotionArea-Base');
				config = config || {};
				config.useManual = true;
				config.eventName = "mouseenter";
				sitePromotionAreaTag.exec(areaRootElement,pageAreaName,linkTypeName, config);
			};
		});




		TagLib.addTag('ProductRealEstate', function(pt) {
			return function(anchorElement, version, area) {
				var tag = TagLib.getTag('RETag-Base');
				var ean;
				//This assumes friendly url (follows /e/ in the path, and can be followed by something)
				try{
				  ean = anchorElement.href.split('/e/')[1].split('/')[0];
				}
				catch(e){
				  ean = anchorElement.href.split('ean=')[1].split('&')[0];	
				}
				//var ean = anchorElement.href.split('ean=')[1].split('&')[0];
				
				var typeOfLink = $(anchorElement).find('img').length > 0 ? "Image" : "Name";
				var viewParam = ean + '_' + typeOfLink;
				tag.exec(anchorElement, version, area, viewParam);
			};
		});


		TagLib.addTag('PageBasedRealEstate',function(pt){
			// Depricated - The name "PageBasedRealEstate" should not be used - please use the tag below "PageSpecificRealEstate"
			return function(anchor,area,link){
				var myTag = TagLib.getTag('RETag-Base');
				myTag.exec(anchor,pt.pageType,area,link);
			};
		});

		TagLib.addTag('PageSpecificRealEstate',function(pt){
			return function(anchor,area,link){
				var myTag = TagLib.getTag('RETag-Base');
				myTag.exec(anchor,pt.pageType,area,link);
			};
		});



		TagLib.addTag('MarkupBasedProductView', function(pt) {
			return function(productRootElement) {

				var productViewTag = TagLib.getTag('ProductView-Base');
				var $productRootElement = $(productRootElement);
				var ean = $productRootElement.find("form input[name='EAN']").val();
				var productCode = $productRootElement.find("form input[name='productcode']").val();
				var title = $productRootElement.find(".product-data[data-product-title]").attr('data-product-title');
				var workId = $productRootElement.find(".product-data[data-product-workId]").attr('data-product-workId');
				var usedWorkId = pt.getParamNamed('pageWorkId') || ""; // currently only found on the product page
				var cdf = $productRootElement.find(".product-data[data-metrics-cdf]").attr('data-metrics-cdf');
				var cdfParts = [], exploreAttributes = [];

				if (! ean) {
					ean = $productRootElement.find("a.buyItemNowButtonFunc").attr("href");
					if (ean && ean.indexOf("ean=") > -1) {
						ean = ean.split("ean=")[1].split("&")[0];
					}
				}

				if (productCode && productCode.charAt(0) == 'Q') { // Then this is a used item.
					cdf = 'U' + cdf.slice(1); // Handle the case of used items, where the cdf is augmented by convention
					workId = workId ? workId : usedWorkId;
				}

				cdfParts = cdf.split('-');
				exploreAttributes = [cdfParts[0], cdfParts[1]]; // format: [ProductSubType, StoreSubject, FormatType], all extracted form the CDF value

				exploreAttributes.push(cdfParts[2] ? cdfParts[2] : "not available"); // As of this writting, only eBooks have this format code.

				exploreAttributes.push(workId ? workId : "not available");

				productViewTag.exec(ean, title, cdf, exploreAttributes);
			};
		});

		
		
		
		
		//********************************************************************
		//*************** Specific Patterns ****************************************
		//*********************************************************************

		TagLib.addTag('ExpanderBasedSitePromotionEvents', function(pageType) {
			/* This binds manual SitePromotion tags to a series of events for the bn.ui.js exapander experience.  The getLinkValues could be moved to bn.ui.js to be closest to where the functionality is defined */
			function getLinkValues (eventTarget, e) {
				var linkName = $.trim($(eventTarget).prev().find('.details-col').html());
				var eventName = e.type ? e.type : "";
				var type = ""; // The expander events do not have specific types
				eventName = (eventName.indexOf("on") == "0") ? eventName.slice(2) : eventName;
				eventName = (eventName == 'More') ? 'SeeMore' : eventName;
				return {
					linkType: type,
					linkName: linkName,
					eventName : eventName
				};
			}

			return function(areaRootElement, pageAreaName, eventNames) {
				var i;
				var sitePromotionTag = TagLib.getTag('SitePromotionEvent-Base');
				for (i = 0; i < eventNames.length; i++) {
					$(areaRootElement).bind(eventNames[i], function (e) {
						var linkValues = getLinkValues(this, e);
						sitePromotionTag.exec(linkValues.eventName, pageAreaName, linkValues.linkType, linkValues.linkName);
					});
				}
			};
		});


		TagLib.addTag('ListBasedSitePromotionArea', function(pageType) {
			/* This binds SitePromotion tags to a series of events for the bn.ui.js List experience*/
			function getLinkName (eventTarget) {
				return $.trim($(eventTarget).parents(".collection").prev().find('.details-col').html());
			}

			return function(areaRootElement, pageAreaName, linkTypeName, config) {
				var indexedSitePromotion = TagLib.getTag('IndexedSitePromotion');
				config = config || {};
				config.usePageName = true;
				if (typeof sitePromotionCounts !== "undefined"){
					sitePromotionCounts[pageAreaName+linkTypeName] = {};
					sitePromotionCounts[pageAreaName+linkTypeName+"forceNumbering"] = true;
				}
				$(areaRootElement).find("a").each (function (index, anchorElement) {
					indexedSitePromotion.exec(this, pageAreaName, linkTypeName, getLinkName (anchorElement), config);
				});
			};
		});

		TagLib.addTag('HtmlSelectBasedSitePromotion', function(pageType) {
			/* 
			 *	This assigns a change listner to the indicated <select> element and fires a manual site promtion
			 *	Then the user picks a new option in the element.
			 *
			 */
			return function(selectRootElement, pageAreaName, linkTypeName) {
				var sitePromotionTag = TagLib.getTag('SitePromotionEvent-Base');
				$(selectRootElement).bind("change", function (e) {
					sitePromotionTag.exec("change to", pageAreaName, linkTypeName, $(e.target).find("option[selected]").text());
				});
			};
		});


		TagLib.addTag('ProductRootBasedProductViewArea', function() {
			return function(areaElement) {

				var productViewTag = TagLib.getTag('MarkupBasedProductView');

				$(areaElement).find(".product-root-node").each(function(index, productRoot) {
					productViewTag.exec(productRoot);
				});
			};
		});


		TagLib.addTag('ProductSetRealEstate', function(pt) {
			return function(anchorElement, typeOfData, dataFilter, productSetType, position) {
				//Shift because modifier may be empty (param order matches requirement spec)
				if (position === undefined) {
					position = productSetType;
					productSetType = typeOfData;
					typeOfData = dataFilter;
					dataFilter = ''; //since it wont take up space
				}
				var cmPrefix = anchorElement.href.indexOf('ean=') > 0 ? "Add_" : "";
				dataFilter = (dataFilter) ? dataFilter + '_' : '';
				var version = typeOfData + '_' + dataFilter + productSetType;
				var area = cmPrefix + 'Product' + position;
				TagLib.getTag('ProductRealEstate').exec(anchorElement, version, area);
			};
		});

		TagLib.addTag('ProductSetElementTag', function(pageType) {
			return function(classOfData, typeOfData, dataFilter, productSetType) {
				if (productSetType === undefined) {
					productSetType = typeOfData;
					typeOfData = dataFilter;
					dataFilter = false;
				}
				dataFilter = (dataFilter) ? dataFilter + ' ' : '';
				var genericElementTag = TagLib.getTag('ElementTag');
				var elemId = pageType.getParamNamed('PageId') + "_Viewed";
				var catId = classOfData + ': ' + typeOfData + ' ' + dataFilter + productSetType;
				genericElementTag.exec(elemId, catId);

			};
		});

		TagLib.addTag('ProductSetTagging', function(pageType) {
			return function(productSet) {
				var reTag = TagLib.getTag('ProductSetRealEstate');
				var elementTag = TagLib.getTag('ProductSetElementTag');
				var sitePromotionTag = TagLib.getTag('PageSpecificSitePromotion');
				var setIdentifiers = productSet.getWidgetIdentification();
				var isPageUrlVaried = pageType.getParamNamed('isPageUrlVaried');
				// ***** attributes examples *****
				// setIdentifiers.getSetDataType() sample: data-metrics-settype="AlsoBought"  
				// setIdentifiers.getWidgetType() sample: data-bntrack="Carousel"
				// setIdentifiers.getSetFilterType() sample: ?
					//if (setIdentifiers.getWidgetType()!= "Carousel"){ // better to test against getSetDataType
				if (setIdentifiers.getSetDataType()!= ""){
					elementTag.exec("Recommendation",
						setIdentifiers.getSetDataType(),
						setIdentifiers.getSetFilterType(),
						setIdentifiers.getWidgetType());
				};								
				productSet.applyToEachItem(function(node, idx) {
					$(node).find('a[href*="/e/"]').add('.add-to-cart-button').each(function() { // 'a[href*="/e/"]
						var filterAndWidgetName = (setIdentifiers.getSetFilterType() || "")
								+ (setIdentifiers.getSetFilterType() && setIdentifiers.getWidgetType() ? "_" : "")
								+ (setIdentifiers.getWidgetType() || "");

						if (! isPageUrlVaried) {
							// then use realestate tags, which all report under one url in coremetrics											
							reTag.exec(this,
									setIdentifiers.getSetDataType(),
									setIdentifiers.getSetFilterType(),
									setIdentifiers.getWidgetType(),
									idx+1);
						}
						else {
							// else, use site promotions (such as on the search and product pages) which roll-up from multiple urls
							sitePromotionTag.exec(this,
									"Recommendations",
									setIdentifiers.getSetDataType(),
									filterAndWidgetName);
						}
					});
				});
			};
		});

		/* Note, Our CM proxy currently appends values to the page view call for AB testing */
		BN.Analytics.TagLibrary.addTag('SearchPageViewTag', function(pageType) {
			var production = (BN.Page.NavData.environment === 'Production');
			if (production) {
				cmSetProduction();
			}
			return function(pageId, categoryId, searchString) {
				cmCreatePageviewTag(pageType.getParamNamed('PageId'), pageType.getParamNamed('CategoryId'), pageType.getParamNamed('searchTerm'), pageType.getParamNamed('numberOfResults'));
			};
		});
		
		// Navbar Tabs Specific Functions
		TagLib.addTag('AnchorTextSitePromotion_TABS', function(pageType) {
		/**** Modified AnchorTextSitePromotion process tab position in navbar // GS 1-2012 ****/
			return function(anchorElement, pageAreaName, linkType, config) {
				var promoElemTag = TagLib.getTag('IndexedSitePromotion');
				var text = $(anchorElement).text() || $(anchorElement).attr('title') || "";
				text = text.replace(/ /g, '');			
				var linkName = $.trim(text);
				config = config || {};
				//promoElemTag.exec(anchorElement, pageAreaName, "", linkName+"-"+linkType, config);				
				promoElemTag.exec(anchorElement, pageAreaName, linkName+"-"+linkType, linkName, config);
			};
		});
		
		TagLib.addTag('AnchorTextSitePromotion_Nav_Links', function(pageType) {
			/*  
			 *	This creates a SitePromotion tag with a link name contructed from the text of a given anchor tag.
			 *	As part of a general agreement with business owners, any digits wrapped in paraenthesis are ignored:
			 *	So a click on the html "<a>Books (102)</a>" gets reported as "Books".
			 *  specific to nav links - all spaces between link text are removed
			 */
			return function(anchorElement, pageAreaName, linkType, config) {
				var promoElemTag = TagLib.getTag('IndexedSitePromotion');				
				var text = $(anchorElement).text() || $(anchorElement).attr('title') || "";				
//				var cmPrefix = $(anchorElement).attr('cmPrefix') || "";
				var cmPrefix = $(anchorElement).attr('data-cmPrefix') ? $(anchorElement).attr('data-cmPrefix')+"_" : "";				
				text = cmPrefix+text;
				text = text.replace(/\(\d*\)/g, "");
				var linkName = $.trim(text).replace(/ /g,'');
				config = config || {};
				promoElemTag.exec(anchorElement, pageAreaName, linkType, linkName, config);
			};
		});


 
		
	});

});

$(function() {


	BN('Analytics.NavBarTracking', ['BN.Analytics.TagLibrary'], function($, TagLibrary){
		//var anchorTextPromotion = TagLibrary.getTag('AnchorTextSitePromotion');		
		var anchorTextPromotion = TagLibrary.getTag('AnchorTextSitePromotion_Nav_Links');		
		var anchorTextPromotion_TabWithPosition = TagLibrary.getTag('AnchorTextSitePromotion_TABS'); 
	 
		var promotionArea = BN.Analytics.TagLibrary.getTag("SitePromotionArea");
		var sitePromotion = BN.Analytics.TagLibrary.getTag("SitePromotion-Base");
		var linkEventAttached = false;
		var init = function(){

			/* start tracking new nav */
			var $rootNew = $('#bn-nav-global');
			var	tabName = "";
			var tabSubCat = "";
			var cmNavbarCat = "Global_Nav";

			/* Tab tracking:
			*Site Promotions Syntax: 
			*cm_sp="All%20Departments-_-"(Tab)"-_-"NA" 
			*Example of Site Promotions: 
			*cm_sp=All%20Departments-_-NOOK-_-NA 
			*/				
			$rootNew.find("> li.nav > a").each(function(i) {
				// anchorTextPromotion.exec(this, "Global_Nav"); 
				anchorTextPromotion_TabWithPosition.exec(this, cmNavbarCat, (i+1)); // pass tab position in new function
			});

			//***  flyout tracking on initial hover of any tab *** Horizontal tab list *** 
			$("#horiz-navigation-1").bind("mouseenter", function() {
				if(!linkEventAttached)
					{
					//console.log("adding flyout tracking on initial of any tab hover");
					/* tracking of links in navbar tabs:
					*Site Promotions Syntax: 
					*cm_sp="All%20Departments-_-"(Tab)"-_-"(ColumnHeader)"_"(Link Name) 
					*Example of Site Promotions: 
					*cm_sp=All%20Departments-_-Books-_-Subjects_Biography 
					*/					
					$("#bn-nav-global li.nav").each(function(i) {
						var tabName = $(this).find('a[data-cmelementcategory]').attr('data-cmelementcategory').replace(/ /g,'');						
						//** track tab/Flyout display 750 ms after loading	* gs 1/10/2012
						var timerID = null;						 
						$(this).hover(
						  function (e) {
						  	 clearTimeout(timerID);							  								  
							 timerID = setTimeout(function(){	
							 	var spHref=cmNavbarCat+'-_-'+tabName+'-'+(i+1)+'-_-HOVER'
								// var spLinkName=tabName+'-'+(i+1); //+'-_-HOVER';							
								cmCreateManualImpressionTag(cmNavbarCat,spHref);
			                 }, 750);			  
						  },
						  function (e) {
						     clearTimeout(timerID); 								
						  }
						);
						//** track Flyout link clicks  
						$(this).find("div.linklist li div a").each(function() {
							var groupName = $(this).parent().attr('data-bntrack');							
						//	anchorTextPromotion.exec(this, cmNavbarCat, tabName);												
							$(this).attr('data-cmPrefix', tabName+'_'+groupName);
						 //	anchorTextPromotion.exec(this, cmNavbarCat+'-_-'+tabName+'-'+(i+1), tabName+'-_-'+groupName);
							anchorTextPromotion.exec(this, cmNavbarCat, tabName+'-'+(i+1));
						});						
					});					
					linkEventAttached = true;
				}
			});			

			$("#bn-nav-global li.nav span.promo a").each(function() {
				var headlineTxt = $(this).find('span.headline').text(); 
				sitePromotion.exec(this, cmNavbarCat, "Special Promotion", headlineTxt);
			});

			/* Header tracking:
			 *Site Promotions Syntax:
			 *Example of Site Promotions:
			 *cm_sp=Header-_-Sign%20In-_-NA
			 */
			//#bn-global-header-usernav ul li a
			/**/
			$("#bn-global-header-usernav li a").each(function() {
				//anchorTextPromotion.exec(this, "Header");				
				anchorTextPromotion.exec(this, cmNavbarCat, "Header");
			});
			//promotionArea.exec($("#bn-global-header-usernav").filter("not(ul.nav-panel)"), "Header");

			/* My Account sub-link:
			 *Site Promotions Syntax:
			 *Example of Site Promotions:
			 *cm_sp=
			 */
//			promotionArea.exec("#bn-global-header-usernav .nav-panel", "Header", "My Account");
			promotionArea.exec("#bn-global-header-usernav .nav-panel", cmNavbarCat, "Header");

			/*Promo message tracking
			 *Site Promotions Syntax:
			 *cm_sp="Promo%20Message-_-Position"(#)"-_-"(Promo Message Text)
			 *Example of Site Promotions:
			 *cm_sp=Promo%20Message-_-Position1-_-Become%20A%20Member
			 */		
			 // original hdr promo messages
			$("ul.bn-global-header-ext-promo-text li").each(function(index) {
				promotionArea.exec(this, "Promo Message", "Position" + (index + 1));
			});
			 // updated hdr promo messages
			$("ul#bn-global-header-cds-promo-text li").each(function(index) {
				//promotionArea.exec(this, "Promo Message", "Position" + (index + 1));
				//promotionArea.exec(this, cmNavbarCat+"-_-Promo Rotation Ads", "promo" + (index + 1));
				promotionArea.exec(this, cmNavbarCat, "Promo Rotation Ads");
			});
				 
			 // visual cart 
			$("a#cart").each(function(index) { 
				sitePromotion.exec(this, cmNavbarCat, 'cart','');		  
			});	
			 // updated hdr promo messages overwrite message // i.e.:borders
			$(".bn-globalnav-message a").each(function(index) { 
				anchorTextPromotion.exec(this, "Promo Message", "Overwrite");
			});					
			// holiday/event link in nav background			
			$(".bn-global-header-group a.bnnav-eventLink").each(function(index) { 			
				anchorTextPromotion.exec(this, "Promo Message", "Holiday_Event");
			});		
		 	// device banners				
			$(".bnNavBannerAdContent a").each(function(index) { 		
				var cmelementid = $(this).attr('data-cmelementid'); 	 
				var isX = $(this).parent().hasClass('closeit') ? "close" : "";
				sitePromotion.exec(this, "Promo Message", "banner_"+cmelementid, isX);
			});	
			/* end tracking new nav */

			/* new footer tracking */
			promotionArea.exec($("#bn-footer #bnf-pod-2"), "Footer", "NOOK Pod");
			promotionArea.exec($("#bn-footer #pod3-fb"), "Footer", "Marketing", "Facebook");
			promotionArea.exec($("#bn-footer #pod3-tw"), "Footer", "Marketing", "Twitter");
			promotionArea.exec($("#bn-footer #pod3-rss"), "Footer", "Marketing", "RSS");
			promotionArea.exec($("#bn-footer #bnf-links"), "Footer", "Site Links");
			/* end new footer tracking */

		};


		// will be depricated post-2011 redesign: //////////////////////
		var track = function(el){
			var elId = $(el).attr('data-cmelementid');
			var elCat = $(el).parents('li').find('a[data-cmelementcategory]').attr('data-cmelementcategory');
			var elSubCat = $(el).parent().parent('ul').find('li:first').text();
			if(elSubCat){
				elId = elSubCat +"-"+ elId;
			}
			cmCreatePageElementTag(elId, elCat);

		};
		return {
			init: init
		};
	});

	BN.Analytics.NavBarTracking.init();

});


// Begin Web Instrumentation Tracking ---------------------------------------------------------------------------


// Add support to catch any on-page Carousel data appearing on page load (aynsc carousels are handled farther down).

BN("Page.EventBasedTrackingData", function ($) {
	return {
		parameters: {}	
	};
});

$(document).bind("ProductCarousel.ready", function(e, carouselObject){		

	if ("startedAsynchronously" in carouselObject && ! carouselObject.startedAsynchronously () ) {  
		// note: asynchronously started carousel tracking is handled later, after Y.Analytics.Tracker.WebInstrumentationBootstrap has been run and BN.Page.CommonTrackingData has already been consumed.
		var identification = carouselObject.getWidgetIdentification().getSetDataType();
		BN.Page.EventBasedTrackingData.parameters[identification + "_CarouselCount"] =  $(carouselObject.getActiveItems()).size();
	}
	
});


// Initiate actual Web Instrumenation tracking, first checking for BN_YUI defined in external.js, can BN.Page.CommonTrackingData

$(window).load(function() {

	if (typeof BN_YUI != "undefined") {

		BN_YUI.use('analytics-internaltracking', function(Y) {	
			
			if (BN.Page && BN.Page.CommonTrackingData) { // defined in the page markup containing all the page-specific identifers and tracking statistics
			
				$.extend(BN.Page.CommonTrackingData.parameters, BN.Page.EventBasedTrackingData.parameters); // added in any on-page carouel data captured form above
		
				// Actually trigger WebInstrumentation tracking:   (This one line would be changed later to trigger both Coremetrics and WebIntrumentation tracking).
				Y.Analytics.Tracker.WebInstrumentationBootstrap(BN.Page.CommonTrackingData); 
			}
					
					
			// Add listeners for any asynchousness carousels 
			$(document).bind("ProductCarousel.ready", function(e, carouselObject){			
		
				if (carouselObject.startedAsynchronously () ) {
					var identification = carouselObject.getWidgetIdentification().getSetDataType();
					var newTrackingData = { 
						pageObj : {
							parameters: {} 
						}
					};
		
					newTrackingData.pageObj.parameters[identification + "_CarouselCount"] =  $(carouselObject.getActiveItems()).size();
					
					Y.Analytics.Tracker.on(Y.Analytics.Event.LOAD, function(){					
					
						Y.Analytics.Tracker.fire(Y.Analytics.Event.ASYNC, newTrackingData);										
					});
					
				}
			});	
		});
	}
});

