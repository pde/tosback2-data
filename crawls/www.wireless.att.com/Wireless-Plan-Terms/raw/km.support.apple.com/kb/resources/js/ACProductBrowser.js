var ACProductBrowser = {

	'genericProducts' : '', // used for tracking display names for # anchor links
	'currentID' : '',
	'unitDimensions' : '',
	'locale': 'en_US',
	'doctype': '',
	'productRows': 1,
	'currentLevel': '',
	'akamaiUrl': 'http://km.support.apple.com',
	'rootProduct': 'MAIN_PRODUCTS',
	'finalProduct': 'MAIN_PRODUCTS',
	'products' : { 
		"id": 'MAIN_PRODUCTS', 
		"products": [] 
	} ,
	'searchPage': false, // set to true if implementation is used on search results page (page=search)
	'searchObject': {}, // reference back to object using the browser (manuals/spec) 
	'categoryObject': '',
	'loadProducts': function(json) {
		
		if(json.id==ACProductBrowser.rootProduct) {
			ACProductBrowser.products = json;
		}
		else if(ACProductBrowser.products!='') {
			// find where to insert the products for sub levels
			this.insertProductsAtLevel(ACProductBrowser.products, json.id, json.products);
		}
		
		if((ACProductBrowser.finalProduct==null || ACProductBrowser.finalProduct===ACProductBrowser.currentID) && (ACProductBrowser.currentID==json.id || ACProductBrowser.currentID=='') && !ACProductBrowser.searchPage && ACProductBrowser.getLevel(ACProductBrowser.products, ACProductBrowser.currentID)) {
			ACProductBrowser.populateBrowser(ACProductBrowser.currentID);
			$('searchsupport').disabled = false;
			ACProductBrowser.finalProduct = null;
		}
		
		if((typeof ACRecentProducts != 'undefined') && ACRecentProducts!==undefined) {
			ACRecentProducts.update();
		}
		
		ACProductBrowser.waiting = false;
		
		if(ACProductBrowser.callback) {
			ACProductBrowser.callback();
			ACProductBrowser.callback = null;
		}
		if(ACProductBrowser.callback4 && ACProductBrowser.products.products.length!=0 && ACProductBrowser.genericProducts!="") {
			ACProductBrowser.callback4();
			ACProductBrowser.callback4 = null;
		}
	},
	
	'displayProducts' : function(strID, callBack, callBack2, products, callBack4) {
		
		ACProductBrowser.currentID = strID;
		ACProductBrowser.callback = callBack;
		ACProductBrowser.callback2 = callBack2; // used for genericproducts
		ACProductBrowser.callback4 = callBack4; // only fire if generic products AND products is loaded
		
		if(ACProductBrowser.products.products.length==0) {
			if(!ACProductBrowser.searchPage) {
				// get top level
				ACProductBrowser.fetchProducts();
			}
			
			// get all generic products
			ACProductBrowser.fetchProducts(undefined, 'ACProductBrowser.receiveGenericProducts', '');
		}
		else {
			
			// check if the level has any products. If it hasn't and there are no sub products, ignore
			var jsonLevel = this.getLevel(ACProductBrowser.products, strID);
			if(jsonLevel===undefined || !jsonLevel.products) {
				// this will rely on a callback function being set and will not auto-populate the browser
				// we have to wait for the response before we can do that
				if(!ACProductBrowser.searchPage) {
					ACProductBrowser.fetchProducts(strID);
				}
			}
			else {
				ACProductBrowser.populateBrowser(strID);
			}
		}
	},
	
	'fetchProducts': function(categoryKey, callBack, doctype) {
		var categoryParam = categoryKey!==undefined ? "&category=" + categoryKey : "";
		var callBackParam = callBack!==undefined ? "&callback=" + callBack : "&callback=ACProductBrowser.loadProducts";
		var doctypeParam = doctype!==undefined ? "&doctype=" + doctype : "&doctype=" + ACProductBrowser.doctype;
		
		var getUrl = ACProductBrowser.akamaiUrl + '/kb/index?page=products&locale=' + ACProductBrowser.locale + doctypeParam + categoryParam + callBackParam;
		var dynamicScript = new JSONscriptRequest(getUrl);
	
		if(dynamicScript.headLoc) {
		
			try {
				dynamicScript.buildScriptTag();
				dynamicScript.addScriptTag();
			}
			catch(ex) {
				// IE 5 for Mac will throw an exception here.
			}
		}
	},
	
	'checkAndLoadProduct': function(prodName, callback, type, callback2) {
		var type = type===undefined ? 'urlpath' : type;
		
		// make sure to load all levels down to prodName (used when user comes in with anchor link)
		if(callback) ACProductBrowser.callback3 = callback;

		var productExists = ACProductBrowser.getLevel(ACProductBrowser.products, prodName, type);
		var productExistsGeneric = ACProductBrowser.getLevel(ACProductBrowser.genericProducts, prodName, type);

		if(!productExistsGeneric) {
			// if the product in anchor does not exist, send user to search term
			$('searchsupport').value = unescape(prodName);
			this.searchObject.searchWithTerm();
			return;
		}
		
		// we only support three levels, but this really should be done recursively
		var parentid = '';
		var grandparentid = '';
		var greatgrandparentid = '';
		
		ACProductBrowser.currentID = productExistsGeneric.id;
		
		if(!productExists && productExistsGeneric) {
		
			// keep track of what is the final product to show so the product browser doesn't flicker
			ACProductBrowser.finalProduct = productExistsGeneric.id;
			
			parentid = productExistsGeneric && productExistsGeneric.parentid!=ACProductBrowser.rootProduct ? productExistsGeneric.parentid : '';
			
			if(parentid!=ACProductBrowser.rootProduct) {
				var productExistsGenericParent = ACProductBrowser.getLevel(ACProductBrowser.genericProducts, parentid);
				grandparentid = productExistsGenericParent && productExistsGenericParent.parentid!=ACProductBrowser.rootProduct ? productExistsGenericParent.parentid: '';
				
				if(grandparentid!=ACProductBrowser.rootProduct) {
					var productExistsGenericGrandParent = ACProductBrowser.getLevel(ACProductBrowser.genericProducts, grandparentid);
					greatgrandparentid = productExistsGenericGrandParent && productExistsGenericGrandParent.parentid!=ACProductBrowser.rootProduct ? productExistsGenericGrandParent.parentid: '';
				}
				
			}
			
			// now lets load each level if we don't have them, starting from the top, using intervals to make sure that we don't move on
			// before parent is done loading, painful - again, should be recursive
			if(greatgrandparentid!='') {
				ACProductBrowser.waiting = true;
				ACProductBrowser.displayProducts(greatgrandparentid, null);
			}
			if(grandparentid!='') {
				ACProductBrowser.intervalGrand = window.setInterval(function() {
					if(!ACProductBrowser.waiting) {
						ACProductBrowser.waiting = true;
						ACProductBrowser.displayProducts(grandparentid, null);
						clearInterval(ACProductBrowser.intervalGrand);
					}
				}, 200);
			}
			if(parentid!='') {
				ACProductBrowser.intervalParent = window.setInterval(function() {
					if(!ACProductBrowser.waiting) {
						ACProductBrowser.waiting = true;
						ACProductBrowser.displayProducts(parentid, null);
						clearInterval(ACProductBrowser.intervalParent);
					}
				}, 200);
			}
			
			ACProductBrowser.intervalMain = window.setInterval(function() {
				if(!ACProductBrowser.waiting) {
					ACProductBrowser.waiting = true;
					ACProductBrowser.displayProducts(productExistsGeneric.id, null);
					clearInterval(ACProductBrowser.intervalMain);
				}
			}, 200);
			
		}
		else {
			ACProductBrowser.displayProducts(ACProductBrowser.currentID);
		}
		
		if(ACProductBrowser.callback3) {
			ACProductBrowser.callback3();
			ACProductBrowser.callback3 = null;
		}
	},
	
	'receiveGenericProducts': function(json) {
		// this function is called after we receive the generic product hierarchy which is needed to support # type anchors coming into the page
		ACProductBrowser.genericProducts = json;

		if((typeof ACRecentProducts != 'undefined') && ACRecentProducts!==undefined) ACRecentProducts.update();
		
		if(ACProductBrowser.callback2) {
			ACProductBrowser.callback2();
			ACProductBrowser.callback2 = null;
		}
		if(ACProductBrowser.callback4 && ACProductBrowser.products.products.length!=0 && ACProductBrowser.genericProducts!="") {
			ACProductBrowser.callback4();
			ACProductBrowser.callback4 = null;
		}
	},
	
	'populateBrowser': function(strID) {
		
		var jsonLevel = this.getLevel(ACProductBrowser.products, strID);
		
		while((jsonLevel.products===undefined || (jsonLevel.products && jsonLevel.products.length<2)) && jsonLevel.id!=ACProductBrowser.rootProduct) {
			// if there are no more then 1 product on this level, show parent level instead
			jsonLevel = this.getLevel(ACProductBrowser.products, jsonLevel.parentid);
		}
		
		// build the "back" link
		var parent = jsonLevel.parentid;
		var parentUrlPath = ACProductBrowser.getProductUrlPath(parent);
		
		if (parent) {
			var anchorLink = !ACProductBrowser.searchPage ? "#" + (parentUrlPath ? parentUrlPath : ''): "";
			$('backbutton').innerHTML = ACProductBrowser.getProductName(jsonLevel.parentid, ACProductBrowser.genericProducts);
			$('pb-title').innerHTML = '<a href="' + anchorLink + '" onclick="ACProductBrowser.changeLevel(\'' + parent + '\');' + (ACProductBrowser.searchPage ? "return false;" : "") + '">' + $('backbutton').innerHTML + '</a>';
		} 
		else if(jsonLevel.name && ACProductBrowser.currentLevel!="" && jsonLevel.id!=ACProductBrowser.rootProduct) {
			$('pb-title').innerHTML = '<h3>' + jsonLevel.name + '</h3>';
		}
		else if(!ACProductBrowser.searchPage) {
			$('pb-title').innerHTML = '<h3>' + jsonLevel.name + '</h3>';
		}
		else {
			$('pb-title').innerHTML = '';
		}
		
		// if strID is same as currentLevel, don't do anything (avoid flickering)
		if(jsonLevel.id!=ACProductBrowser.currentLevel || $('pb-listing').getElementsByTagName("li").length==0) {
			ACProductBrowser.currentLevel = jsonLevel.id;
			
			// display products in correctly sorted order
			var productListArray = new Array();
			
			for (var i=0;i<=jsonLevel.products.length-1;i++) {
				if(jsonLevel.products[i] && jsonLevel.products[i].thumbnail) {
					var order = jsonLevel.products[i].order;
					var anchorLink = !ACProductBrowser.searchPage ? "#" + jsonLevel.products[i].urlpath: "";
					
					productListArray[order] = '<li><a href="' + anchorLink + '" onclick="ACProductBrowser.changeLevel(\'' + jsonLevel.products[i].id + '\');' + (ACProductBrowser.searchPage ? "return false;" : "") + '">';
					productListArray[order] += '<img src="';
					
					if(jsonLevel.products[i].thumbnail.indexOf("http://")!=0) {
						productListArray[order] += ACProductBrowser.akamaiUrl;
					}
					productListArray[order] += ACUtil.getImageSrc(jsonLevel.products[i].thumbnail) + '" alt=""><br />' + jsonLevel.products[i].name + '</a></li>';
				}
				
			}
			
			var htmlBlob = "<ul>";
			for(var i=0;i<productListArray.length;i++) {
				if(productListArray[i]!=undefined) {
					htmlBlob += productListArray[i];
				}
			}
			htmlBlob += "</ul>";
			$('pb-listing').style.opacity = "0";
			$('pb-listing').innerHTML = htmlBlob;
			
			// Hack for fixing IE 9 issue: <exp2://Ticket/8736557> iKnow: Product icons not displayed with IE 9
			if($('pb-listing').currentStyle && $('pb-listing').currentStyle.hasLayout) { $('pb-listing').style.opacity = "1";}
			
			new Effect.Opacity('pb-listing', { duration:0.2,from:0,to:1} );

			ACProductBrowser.finalProduct = null;
			
		}

		if(ACProductBrowser.categoryObject != ''){
			for (var i=0;i<=jsonLevel.products.length-1;i++) {
				if(jsonLevel.products[i].id == ACProductBrowser.categoryObject.parent){
		        	ACProductBrowser.hiliteProduct(ACProductBrowser.categoryObject.parent);
		        	break;
				}
				else if(jsonLevel.products[i].id == ACProductBrowser.categoryObject.grandparent){
		        	ACProductBrowser.hiliteProduct(ACProductBrowser.categoryObject.grandparent);
		        	break;
				}
				else if(jsonLevel.products[i].id == ACProductBrowser.categoryObject.greatgrandparent) {
		        	ACProductBrowser.hiliteProduct(ACProductBrowser.categoryObject.greatgrandparent);
		        	break;
				}
			}
			ACProductBrowser.categoryObject = '';
		}
		else{
			ACProductBrowser.hiliteProduct(strID);
		}
		
		// auto display rows
		if (jsonLevel.products.length >= 9) {
			ACProductBrowser.displayRows(2);
		} else {
			ACProductBrowser.displayRows(1);
		}
		
		if(ACProductBrowser.callback) {
			ACProductBrowser.callback();
			ACProductBrowser.callback = null;
		}
		
	},
	
	'getLevel': function(json, strID, property) {
		
		if(!strID) {
			return;
		}
		
		if(!property) {
			property = 'id';
		}
		
		if(json[property]==strID) {
			return json;
		}
		else if(json.products) {
			for (var i=0;i<=json.products.length-1;i++) {
				var returnedJSON = this.getLevel(json.products[i], strID, property);
				if(returnedJSON) {
					return returnedJSON;
				}
			}
		}
		
	},
	
	'insertProductsAtLevel': function(json, strID, products) {
		
		if(!strID) {
			return;
		}
		
		if(json['id']==strID) {
			return json;
		}
		else if(json.products) {
			for (var i=0;i<=json.products.length-1;i++) {
				var returnedJSON = this.insertProductsAtLevel(json.products[i], strID, products);
				if(returnedJSON) {
					json['products'][i]['products'] = products;
				}
			}
		}
		
	},
	
	'productExists': function(strID) {

		var jsonLevel = ACProductBrowser.getLevel(ACProductBrowser.products, strID);
		if(jsonLevel!=undefined && jsonLevel.name!='') {
			return true;
		}
		return false;
		
	},
	
	'displayRows' : function(intRows) {
		
		if(intRows==ACProductBrowser.productRows) {
			return;
		}
		
		$('pb-listing').setStyle({display:'block'});
		ACProductBrowser.productRows = intRows;
		var currentHeight = parseInt($('pb-listing').clientHeight);
		if (currentHeight < 100) {
			if (intRows > 0 ) {
				new Effect.Scale('pb-listing',100, { 
					duration:0.2,scaleX:false,scaleContent:false,
					scaleFrom:0,
					scaleMode: { originalHeight:ACProductBrowser.unitDimensions.height*intRows, originalWidth:ACProductBrowser.unitDimensions.width }	
				} );
			}

		} else {
			
			var targetHeight =  intRows * ACProductBrowser.unitDimensions.height;
			var scaleFactor = targetHeight/currentHeight * 100;
			new Effect.Scale('pb-listing',scaleFactor, { duration:0.2,scaleX:false,scaleContent:false } );
			
			if (intRows == 0 ) {
				var anchorLink = !ACProductBrowser.searchPage ? "#" + (ACProductBrowser.products.urlpath ? ACProductBrowser.products.urlpath : ''): "";
				$('pb-title').innerHTML = '<a href="' + anchorLink + '" onclick="ACProductBrowser.changeLevel(\'' + ACProductBrowser.rootProduct + '\');' + (ACProductBrowser.searchPage ? "return false;" : "") + '">' + ACProductBrowser.products.name + '</a>';
				$('pb-listing').setStyle({display:'none'});
			}
		}
		
	},
	
	'hiliteProduct' : function(strID) {
		$('pb-listing').select('li').invoke('removeClassName','selected');
		var listElement = ACProductBrowser.getProductListElement(strID);
		if(listElement) {
			listElement.addClassName('selected');
		}
	},
	
	'getProductListElement' : function(strID) {
		var foundElement = null;
		strID = strID.replace(/\+/g, "");
		$('pb-listing').select('li').each(function(element){
			
			if(element.down('a') != null && element.down('a').readAttribute('onclick') != null){
				if (element.down('a').readAttribute('onclick').replace(/\+/g, "").match('\'' + strID + '\'') ) {
					foundElement = element;
					throw $break;
				}
			}
		});
		return foundElement;

	},
	
	'changeLevel' : function(strID, alternateID) {
		ACProductBrowser.hiliteProduct(strID);
		
		ACProductBrowser.currentID = strID;
		// alternateID is used for lower level then the product browser returns, for instance serial number searches
		ACProductBrowser.changeLevelCallBack(alternateID);
		if(!ACProductBrowser.searchPage) {
			$('searchsupport').clear();
		}
	},
	
	'changeLevelCallBack' : function(alternateID) {
		var prodID = alternateID!==undefined ? alternateID : ACProductBrowser.currentID;
		ACProductBrowser.callbackTrigger(prodID);
		
		if(!ACProductBrowser.searchPage) {
			ACProductBrowser.displayProducts(ACProductBrowser.currentID);
		}
	},
	
	'callbackTrigger': function() {
		// this function should be overridden with the implementation specific needs of the product browser
	},
	
	'getProductName': function(strID, products) {
		var products = products!==undefined ? products : ACProductBrowser.products;
		var jsonLevel = this.getLevel(products, strID);
		if(jsonLevel!==undefined) {
			return jsonLevel.name;
		}
	},
	
	'getProductUrlPath': function(strID, products) {
		var products = products!==undefined ? products : ACProductBrowser.products;
		var jsonLevel = this.getLevel(products, strID);
		if(jsonLevel!==undefined) {
			return jsonLevel.urlpath;
		}
	},
	
	'getProduct': function(strID, products) {
		var products = products!==undefined ? products : ACProductBrowser.products;
		var jsonLevel = this.getLevel(products, strID);
		if(jsonLevel!==undefined) {
			return jsonLevel;
		}
	}
	
};
