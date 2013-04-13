var ACRecentProducts = {
 	
 	'searchObject': null,
 	
 	'add' : function(productCategory, parent, prodName) {
  		var pname=unescape(prodName);
  		
  		var recentProducts = [];
  		var productKeyValue="";
		if(productCategory!==undefined) {
			
			productKeyValue = productCategory + ":" + pname;

			// only add product lines to recent products and ignore older products (999)
			
			//commented as ACProductBrowser.getProduct(productCategory).order is a value from page=products[p_products.jsp]
			/*if(prodName && productCategory.indexOf('PL')==-1 && ACProductBrowser.getProduct(productCategory).order!="999") {
				return;
			}*/
			
			if(ACUtil.readCookie('ac_recentproducts')===null) {
				recentProducts[0] = productKeyValue;
			}
			else {
				recentProducts = ACUtil.readCookie('ac_recentproducts').split('||');

				if(recentProducts.indexOf(productKeyValue)!=-1) {
					// make sure to remove the search term if it already exists so we can move it to the top
					recentProducts.splice(recentProducts.indexOf(productKeyValue), 1);
				}
				
				if(recentProducts.length >= 5) {
					recentProducts.pop();
				}
				recentProducts.reverse();
				recentProducts.push(productKeyValue);
				recentProducts.reverse();

			}
			
			ACUtil.writeCookie('ac_recentproducts', recentProducts.join('||'));
		}
		ACRecentProducts.update();
		
	},
 	
	'update' : function() {
  		
  		var recentProducts = [];
		
		recentProducts = ACUtil.readCookie('ac_recentproducts')!==null ? ACUtil.readCookie('ac_recentproducts').split('||') : [];
		var ulList = '';
		
		for(var i = 0; i < recentProducts.length; i++) {
			if(recentProducts[i].length>0) {
				var productKeyValue = [];
				productKeyValue = recentProducts[i].split(':');
				var productCategory = productKeyValue[0];
				var productName = productKeyValue[1];
				var productUrlPath = ACProductBrowser.getProductUrlPath(productCategory, ACProductBrowser.genericProducts);
				if(productName!==undefined && productName!='') {
					// <rdar://problem/9041124> Product Reference Key is displayed in the search result page
					// When the selected Product is not available in the product browser, do a browse with the product key and collapse the tree
					// and when product exists in the product browser do a browse with the product key along with ProductURLPath.
					var escProductName = escape(productName);
					if(productUrlPath === undefined){
						ulList += '<li><a href="#" onclick="ACRecentProducts.searchProduct(\''+ productCategory + '\',\'' + escProductName + '\');">' + productName + '</a></li>';
					}
					else{
						ulList += '<li><a href="#' + productUrlPath + '" onclick="ACRecentProducts.showProduct(\'' + productCategory + '\');">' + productName + '</a></li>';
					}
				}
			}
		}
		$('recent-products').innerHTML = ulList;
		
		if(ulList!='') {
			$('clearproducts').style.display = 'block';
			$('noproducts').style.display = 'none';
		}
		else {
			$('clearproducts').style.display = 'none';
			$('noproducts').style.display = 'block';
		}
	},
	
	'clear' : function() {
		ACUtil.writeCookie('ac_recentproducts', null);
		ACRecentProducts.update();
	},
	
	'showProduct': function(categoryKey) {
		// when user clicks on a product in the list
		
		this.searchObject.searchState.state = 'browse';
		this.searchObject.searchState.category = categoryKey;
		this.searchObject.searchState.searchTerm = '';
		ACProductBrowser.checkAndLoadProduct(categoryKey, 0, 'id');
		this.searchObject.searchAJAX(0,0,categoryKey);
	},
	
	'searchProduct': function(categoryKey, productName) {
		// when user clicks on a product in the list which is not in the product browser
		
		this.searchObject.searchState.state = 'browse';
		this.searchObject.searchState.category = categoryKey;
		this.searchObject.searchState.searchTerm = unescape(productName);
		ACProductBrowser.displayRows(0); // for collapsing the product browser
		ACProductBrowser.currentID=''; // for removing the banner with product name on top of the browse results
		$('searchsupport').value = this.searchObject.searchState.searchTerm; // for displaying the product name in the search box
		this.searchObject.searchAJAX(0,'recency',categoryKey);
	}
	
};