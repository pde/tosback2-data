var ACDownloadSearch = {

	'downloads' : {},
	'pageNumber': 1,
	'locale': 'en_US',
	'akamaiUrl': 'http://km.support.apple.com',
	'localized': {},
	// Object for retaining search state between AJAX calls - instantiated with defaults
 	'searchState' : { state: "browse", searchTerm: "", facet: "all", sort: "alphabetical", category: "", offset: 0, results: 0 },
 	'pageNamePrefix':'acs::kb::dl',
 	//Added by skumar for increasing total result count on page
 	'totalResultsOnPage':30,
 	// getting set up!
	'initialize': function() {
		// defining the function that is called after there has been a change in the product browser
		ACProductBrowser.callbackTrigger = function(strID) {
			ACDownloadSearch.searchState.facet = 'all';
			ACDownloadSearch.searchAJAX(0, 'recency', strID, 'state_browse');
		};
		
		// load featured manuals
		var dynamicScript = new JSONscriptRequest(ACDownloadSearch.akamaiUrl + '/kb/index?page=downloads_browse&sort=recency&category=DOWNLOADS.FEATURED&locale=' + ACDownloadSearch.locale + '&callback=ACDownloadSearch.loadFeatured');
		
		if(dynamicScript.headLoc) {
		
			try{
				dynamicScript.buildScriptTag();
				dynamicScript.addScriptTag();
			}
			catch(ex) {
				// IE 5 for Mac will throw an exception here.
			}
		}
		
		ACProductBrowser.searchObject = ACDownloadSearch;
		ACRecentProducts.searchObject = ACDownloadSearch;
		
		ACProductBrowser.unitDimensions = $('pb-listing').getDimensions();
		ACProductBrowser.doctype = 'DOWNLOADS';
		
		// code to check whether the url is for home page or not
		if((window.location.href).indexOf("#") == -1){ 
			ACUtil.writeCookie('searchTermState', 0);
		}
		
		// get first level no matter what
		ACProductBrowser.displayProducts(ACProductBrowser.rootProduct, undefined, function() {
		
			var searchTermState = ACUtil.readCookie('searchTermState')!==null ? ACUtil.readCookie('searchTermState') : '';
			var locationString = new String(document.location);
			locationString = new String(decodeURIComponent(locationString.replace(/\+/g," ")));
			if(locationString[locationString.length-1]=='/') {
				// means there is a trailing /
				locationString = locationString.substring(0, locationString.length-1);
			}
			var locationParts = locationString.split('/');
			
			// support for anchor URLs
			if(locationString.indexOf("#")!=-1) {
				locationAnchorParts = locationString.split('#');
				if(locationParts[3].indexOf("_")==-1) {
					locationParts[4] = locationAnchorParts[1];
				}
				else {
					locationParts[5] = locationAnchorParts[1];
				}
			}
			
			if(locationParts[locationParts.length-1].indexOf("_diy")!=-1) {
				ACDownloadSearch.searchState.facet = 'diy';
				locationParts[locationParts.length-1] = locationParts[locationParts.length-1].replace("_diy", "");
			}
			
			// load product specific browser and search results if one is specified in the URL
			if(locationString.indexOf("index?page=")==-1 && 
				((locationParts[3].indexOf("_")==-1 && locationParts.length>4) || (locationParts[3].indexOf("_")!=-1 && locationParts.length>5)) && locationParts[locationParts.length-1]!='') {
				
				var prodName = ACUtil.inputCleanup(locationParts[locationParts.length-1].toLowerCase());
				
				// Following code added to support <exp2://Ticket/7394855> Redirects from old iKnow browser URLs
				if(prodName == "mice") {
					prodName = "miceandtrackpad";
				}
				// Condition to show browse page for non InQuira locales on click of back button from search page
				if(ACDownloadSearch.locales.indexOf(ACDownloadSearch.locale) == -1 && searchTermState == "search" && locationString.indexOf("#") != -1){ 
						ACProductBrowser.displayProducts(ACProductBrowser.rootProduct);
						ACDownloadSearch.searchAJAX(0, 'recency', ACProductBrowser.rootProduct, 'state_browse');
				}else if(searchTermState == "search"){ 
					$('searchsupport').value = ACUtil.trim(prodName);
					ACDownloadSearch.searchState.searchTerm = ACUtil.trim(prodName);
					ACDownloadSearch.searchAJAX(0, 'relevancy', '', 'state_search');
				} else{
					ACProductBrowser.checkAndLoadProduct(prodName, function() {
						ACDownloadSearch.searchAJAX(0, 'recency', ACProductBrowser.currentID, 'state_browse');
					});
				}		
			}
			else {
				ACProductBrowser.displayProducts(ACProductBrowser.rootProduct);
				ACDownloadSearch.searchAJAX(0, 'recency', ACProductBrowser.rootProduct, 'state_browse');
			}

		}, false);
	
	},
	
	'searchAJAX' : function(offset, sorting, category, filterName) {
		
		if(filterName!==undefined) {
			var filterType = filterName.substr(0, filterName.indexOf("_"));
			var filterValue = filterName.substr(filterName.indexOf("_")+1, 35);
			ACDownloadSearch.searchState[filterType] = filterValue;
		}
		
		// make sure to redirect any non English query to the old Google search
		if(ACDownloadSearch.searchState.state=='search' && ACDownloadSearch.locales.indexOf(ACDownloadSearch.locale)==-1) {
			window.location = ACUtil.getGSAUrl(ACDownloadSearch.locale, ACDownloadSearch.searchState.searchTerm, 'kbdload');
			return;

		}
		
		// hide all elements first
		$('results-Support-ul').hide();
		$('filter').hide();
		$('results_none').hide();
		$('pagination_top').hide();
		$('pagination_bottom').hide();
		$('query').hide();
		
		$('query').innerHTML = '';
		
		$('loading').style.display='block';
		
		if(offset!=undefined) {
			if(offset==0) {
				ACDownloadSearch.searchState.offset = 0;
			}
			else {
				ACDownloadSearch.searchState.offset = ACDownloadSearch.searchState.offset+offset;
				if(ACDownloadSearch.searchState.offset<0) {
					ACDownloadSearch.searchState.offset = 0;
				}
			}
			
		}
		if(sorting!=undefined) {
			ACDownloadSearch.searchState.sort = sorting;
		}
		
		if(category!=undefined && category=='MAIN_PRODUCTS') {
			ACDownloadSearch.searchState.category = '';
		}
		else if(category!=undefined) {
			ACDownloadSearch.searchState.category = category;
		}

		getUrl = '/kb/index?page=downloads_' + ACDownloadSearch.searchState.state;
		getUrl += '&offset=' + ACDownloadSearch.searchState.offset;
		getUrl += '&sort=' + ACDownloadSearch.searchState.sort;
		getUrl += '&facet=' + ACDownloadSearch.searchState.facet;
		
		// if serial number search, send all three levels and make it non hierarchical
		if(typeof ACDownloadSearch.searchState.category == 'object') {
			getUrl += '&category=' + escape(ACDownloadSearch.searchState.category.join(" "));
			getUrl += '&hierarchicalcategories=false';
		}
		else {
			getUrl += '&category=' + ACDownloadSearch.searchState.category;
		}
		
		if(ACDownloadSearch.searchState.state=="search") {
			ACProductBrowser.displayRows(0);
			
			getUrl += '&q=' + unescape(ACDownloadSearch.searchState.searchTerm);
			
			if(ACUtil.readCookie('s_vi')!==null) {
				// pass site catalyst session ID for reporting
				getUrl += '&sitecatalystid=' + escape(ACUtil.readCookie('s_vi'));
			}
		}
		else {
			// use akamai
			getUrl = ACDownloadSearch.akamaiUrl + getUrl;
		}
		
		getUrl += '&locale=' + ACDownloadSearch.locale;
		
		var dynamicScript = new JSONscriptRequest(getUrl + '&callback=ACDownloadSearch.showResults');
		
		if(dynamicScript.headLoc) {
		
			try{
				dynamicScript.buildScriptTag();
				dynamicScript.addScriptTag();
			}
			catch(ex) {
				// IE 5 for Mac will throw an exception here.
			}
		}
		
		if(ACDownloadSearch.searchState.state=="browse") {
			var reportProduct = ACProductBrowser.getProduct(ACDownloadSearch.searchState.category);
			
			var productTitle = reportProduct!==undefined ? reportProduct.name : undefined;
			if(reportProduct!==undefined && reportProduct.parentid!='MAIN_PRODUCTS') { 
				productTitle = ACProductBrowser.getProductName(reportProduct.parentid) + "::" + productTitle;
			}
			
			if (productTitle!=undefined){
				window.setTimeout("ACUtil.clickTracking(\"" + ACDownloadSearch.pageNamePrefix+"::"+productTitle + "\");", 800);
			}
		}
		
	},
	
	'showResults': function(json) {
		downloads = json;
		$('loading').style.display='none';
		$('results_none').hide();
		
		// display title
		if(ACDownloadSearch.searchState.state=='browse' && ACDownloadSearch.searchState.category!="") {
			// if level is lower then what exists in product browser, use the ID that is shown in product browser
			var downloadsName = ACProductBrowser.getProductName(ACDownloadSearch.searchState.category, ACProductBrowser.genericProducts);
			downloads.name = downloadsName ? downloadsName : ACProductBrowser.getProductName(ACProductBrowser.currentID, ACProductBrowser.genericProducts);
		}
		
		if(ACDownloadSearch.searchState.state=="browse") {
			ACDownloadSearch.totalResultsOnPage = 10;
		}else{
			ACDownloadSearch.totalResultsOnPage = 30;
		}
		
		if(downloads.name) {
			$('query').innerHTML = "<h2>" + downloads.name + "</h2>";
			$('query').show();
		}
		else {
			$('query').hide();
		}
		
		var numDownloads = downloads.downloads.length;
		
		if(numDownloads>0) {
			
			// code added to fix <exp2://Ticket/8579725>
			// As there is dictionary restriction at InQuira end show total results as 150 if it is more
			if(ACDownloadSearch.searchState.state == 'search' && downloads.totalresults > 150){
				downloads.totalresults = 150;
			}
			
			$('results_total').innerHTML = downloads.totalresults;
			$('results_from').innerHTML = ACDownloadSearch.searchState.offset+1;
			
			//console.log(downloads.totalresults + "--" + ACDownloadSearch.pageNumber*10);
			//if(downloads.totalresults > ACDownloadSearch.searchState.offset+10) {
			if(downloads.totalresults > ACDownloadSearch.searchState.offset+ACDownloadSearch.totalResultsOnPage) {
			
				//$('results_until').innerHTML = ACDownloadSearch.searchState.offset+10;
				$('results_until').innerHTML = ACDownloadSearch.searchState.offset+ACDownloadSearch.totalResultsOnPage;
			}
			else {
				$('results_until').innerHTML = downloads.totalresults;
			}
			
			//if(downloads.totalresults>10) {
			if(downloads.totalresults>ACDownloadSearch.totalResultsOnPage) {
				var paginationDirection = "";
				//if(downloads.totalresults > ACDownloadSearch.searchState.offset+10 && ACDownloadSearch.searchState.offset>0) {
				if(downloads.totalresults > ACDownloadSearch.searchState.offset+ACDownloadSearch.totalResultsOnPage && ACDownloadSearch.searchState.offset>0) {
					paginationDirection = "both";
				}
				//else if(downloads.totalresults > ACDownloadSearch.searchState.offset+10) {
				else if(downloads.totalresults > ACDownloadSearch.searchState.offset+ACDownloadSearch.totalResultsOnPage) {
					paginationDirection = "next";
				}
				else {
					paginationDirection = "previous";
				}
				ACDownloadSearch.activatePagination($('pagination_top'), paginationDirection);
				ACDownloadSearch.activatePagination($('pagination_bottom'), paginationDirection);
				
				$('pagination_top').show();
				$('pagination_bottom').show();
			}
			else {
				$('pagination_top').hide();
				$('pagination_bottom').hide();
			}
			
			var resultList = "";
			for(i=0;i<numDownloads;i++) {
				var downloadId = downloads.downloads[i].id && downloads.downloads[i].id!="" ? downloads.downloads[i].id : "";
				
				var omnitureClickName = (ACDownloadSearch.pageNamePrefix + "::" + downloadId + "::" + downloads.downloads[i].title.replace('\'', '\\\'') + "::").toLowerCase();
				// prodName added for <exp2://Ticket/8266890> iKnow: Products are deleted in "My Most Recent Products:" 
				var prodName=escape(downloads.downloads[i].prodName);				
				//exp2://Ticket/12390683 : Product names in EN in My most recent products
				//var aHref = "<a onclick=\"ACRecentProducts.add('" + downloads.downloads[i].productname + "', '" + downloads.downloads[i].parent + "', '" + prodName + "');ACUtil.setIteminBrowserCache('"+downloadId+"','"+downloads.downloads[i].productname+"');ACUtil.clickTracking('" + omnitureClickName + "listdetail');\" href=\"" + (downloads.downloads[i].answerurl ? downloads.downloads[i].answerurl: downloads.downloads[i].url) + "\">";
				var aHref = "<a onclick=\"ACRecentProducts.add('" + downloads.downloads[i].productname + "', '" + downloads.downloads[i].parent + "', '" + downloads.downloads[i].title + "');ACUtil.setIteminBrowserCache('"+downloadId+"','"+downloads.downloads[i].productname+"');ACUtil.clickTracking('" + omnitureClickName + "listdetail');\" href=\"" + (downloads.downloads[i].answerurl ? downloads.downloads[i].answerurl: downloads.downloads[i].url) + "\">";
				var fileUrl = "";
				
				resultList += "<li class=\"top-results dt-thumbnail\"><h3>"+aHref+"<img class=\"thumbnail\" src=\"" + ACUtil.getImageSrc(ACDownloadSearch.akamaiUrl + downloads.downloads[i].thumbnail) + "\" alt=\"\">";
				resultList += "<span>" + downloads.downloads[i].title + "</span></a></h3>";
				
				if(downloads.downloads[i].fileurl!="") {
					fileUrl = "<div class=\"download\"><a onclick=\"ACRecentProducts.add('" + downloads.downloads[i].productname + "', '" + downloads.downloads[i].parent + "', '" + prodName + "');ACUtil.clickTracking('" + omnitureClickName + "listbutton');\" href=\"" + downloads.downloads[i].fileurl + "\" class=\"download-button\"><span>" + ACDownloadSearch.localized.download + "</span></a></div>";
				}
				
				if(ACDownloadSearch.searchState.state=="browse") {
					resultList += "<div class=\"desc\">" + downloads.downloads[i].description + "</div>\n";
					resultList += "<div class=\"meta\">" + downloads.downloads[i].lastmodified;
					if(downloads.downloads[i].filesize!="") { 
						resultList += " - " + downloads.downloads[i].filesize;
					}
					resultList += fileUrl + "</div></li>\n";
				}
				else {
					resultList += "<div class=\"desc\">" + downloads.downloads[i].excerpt + "</div>\n";
					resultList += "<div class=\"meta\">" + downloads.downloads[i].url + "</div>" + fileUrl + "</li>\n";
				}

			}
			
			$('results-Support-ul').innerHTML = resultList;
			$('results-Support-ul').show();
			
			// if not featured, show number of results and sorting bar
			$('filter').show();
		}
		else {
			ACDownloadSearch.resultsNone();
		}
		
	},
	
	'resultsNone': function() {
		$('loading').hide();
		$('results-Support-ul').hide();
		$('filter').hide();
		$('pagination_top').hide();
		$('pagination_bottom').hide();
		$('query').hide();
		
		$('results_none').show();
	},
	
	'searchWithTerm': function() {
		
		if($F('searchsupport')!="") {
			ACDownloadSearch.searchState.searchTerm = ACUtil.inputCleanup(ACUtil.trim($F('searchsupport')));
			//fix done for <exp2://Ticket/8579185> iKnow: Cannot go back after searching by article ID 
			//When user submits article id ,then we do not add the article id to url
			if(!(ACDownloadSearch.searchState.searchTerm.match(/^[a-zA-Z]{2,3}\d{1,6}$/))) {
				// fix for <exp2://Ticket/9068737> iKnow - Product search in non-iKnow lang error
				if(ACDownloadSearch.locales.indexOf(ACDownloadSearch.locale)!=-1){ 
					window.location = "#" + ACUtil.inputCleanup($F('searchsupport'));
				}
			}
			if(ACDownloadSearch.searchState.searchTerm.match(/^[a-zA-Z]{2,3}\d{1,6}$/)) {
				window.location.assign('/kb/' + ACDownloadSearch.searchState.searchTerm + '?viewlocale=' + ACUtil.getPrimaryViewLocale(this.locale));
			}
			else if(ACUtil.validateSerialNumber(ACDownloadSearch.searchState.searchTerm)) {
				ACUtil.writeCookie('searchTermState', 0); 
				// now check if we can find a product id based on serial number 
				new Ajax.Request("/kb/index?page=categorydata&serialnumber=" + ACDownloadSearch.searchState.searchTerm, {
					method:'get',
					onSuccess: function(transport) {
						var category = transport.responseText.evalJSON();
					    // categoryObject is used to high light the product in product browser list
					    ACProductBrowser.categoryObject = category;
					    ACDownloadSearch.searchState.category = [category.id];
						if(category && category.parent && ACProductBrowser.productExists(category.parent)) {
							ACProductBrowser.changeLevel(category.parent, ACDownloadSearch.searchState.category);
						}
						else if(category && category.grandparent && ACProductBrowser.productExists(category.grandparent)) {
							ACProductBrowser.changeLevel(category.grandparent, ACDownloadSearch.searchState.category);
						}
						else if(category && category.greatgrandparent && ACProductBrowser.productExists(category.greatgrandparent)) {
							// Added to fix <exp2://Ticket/8233945>
							ACProductBrowser.changeLevel(category.greatgrandparent, ACDownloadSearch.searchState.category);
						}
						else {
							//ACDownloadSearch.resultsNone();
							ACDownloadSearch.searchAJAX(0, 'relevancy', '', 'state_search');
						}
						// make sure serial number stays in box
						$('searchsupport').value = ACDownloadSearch.searchState.searchTerm;
					},
					onFailure: function() { 
						if(typeof console != 'undefined') console.log('Could not receive data from category API. Please try again.');
						ACDownloadSearch.resultsNone();
					}
				});
			}
			else {
				ACUtil.writeCookie('searchTermState', 'search');
				ACDownloadSearch.searchAJAX(0, 'relevancy', '', 'state_search');
			    ACUtil.trackSearchResults('downloads',ACDownloadSearch.searchState.searchTerm);
			}
			
		}
		
	},
	
	'applySearchFilters': function(element, selectedFilter) {
	
		var lis = element.getElementsByTagName('li');
		for(var i=0;i<lis.length;i++){
		  var li = lis[i];
		  var elementId = li.getElementsByTagName('a')[0].getAttribute('id');
		  
		  var elementShortId = elementId.substr(elementId.indexOf("_")+1,15);
		
		  if(elementId==selectedFilter) {
			Element.addClassName(li.getElementsByTagName('a')[0], 'selected');
		  }
		  else {
		  	Element.removeClassName(li.getElementsByTagName('a')[0], 'selected');
		  }
		  
		  li.onclick = function(element) {
			  var elementId = this.getElementsByTagName('a')[0].getAttribute('id');
	
			  ACDownloadSearch.searchAJAX(undefined, undefined, undefined, elementId);
			  ACDownloadSearch.removeCategorySelection(this.parentNode);
			  Element.addClassName(this.getElementsByTagName('a')[0], 'selected');
			  return false;
		  };
		  
		}
	},
	
	'removeCategorySelection' : function(element){
		 var lis = $(element).getElementsByTagName('li');
		 for(var i=0;i<lis.length;i++){
			var li = lis[i];
			Element.removeClassName(li.getElementsByTagName('a')[0], 'selected');
		 }
	},
		
	'activatePagination' : function(element, direction) {
		
		var localizedNextString = (element.getElementsByClassName('next')[0]!=undefined) ? element.getElementsByClassName('next')[0].innerHTML : '';
		var localizedPreviousString = (element.getElementsByClassName('previous')[0]!=undefined) ? element.getElementsByClassName('previous')[0].innerHTML : '';
		element.innerHTML = '';
		if(direction=="previous" || direction=="both") {
			element.innerHTML += "<a class=\"previous\" href=\"#\" onclick=\"ACDownloadSearch.searchAJAX(-"+ACDownloadSearch.totalResultsOnPage+");return false;\">" + localizedPreviousString + "</a> | ";
		}
		else {
			element.innerHTML += "<span class=\"previous\">" + localizedPreviousString + "</span> | ";
		}
		
		if(direction=="next" || direction=="both") {
			element.innerHTML += "<a class=\"next\" href=\"#\" onclick=\"ACDownloadSearch.searchAJAX("+ACDownloadSearch.totalResultsOnPage+");return false;\">" + localizedNextString + "</a>";
		}
		else {
			element.innerHTML += "<span class=\"next\">" + localizedNextString + "</span>";
		}
		
	},
	
	'loadFeatured': function(featured) {
		var numDownloads = featured.downloads.length;
		
		if(numDownloads>0) {
			var resultList = '';
			for(i=0;i<numDownloads;i++) {
				
				var omnitureClickName = ("acs::" + ACProductBrowser.locale + "::" + featured.downloads[i].title.replace('\'', '\\\'') + "::" + featured.downloads[i].id + "::downloads::").toLowerCase();
				
				var aLink = "onclick=\"ACRecentProducts.add('" + featured.downloads[i].productname + "', '" + featured.downloads[i].parent + "', '" + featured.downloads[i].prodName + "');ACUtil.setIteminBrowserCache('"+featured.downloads[i].id+"','"+featured.downloads[i].productname+"');ACUtil.clickTracking('" + omnitureClickName + "featureddetail');\" href=\"" + featured.downloads[i].url + "\"";
				
				if(i>0) {
					resultList += "<div class=\"padtop10\"></div><div class=\"divider\"></div>";
				}	
				resultList += "<h3><a " + aLink + "><span><img src=\"" + ACUtil.getImageSrc(ACDownloadSearch.akamaiUrl + featured.downloads[i].thumbnail) + "\" alt=\"\"></span>";
				resultList += featured.downloads[i].title + "</a></h3>";
				resultList += "<div class=\"desc\">" + featured.downloads[i].description + "</div>";
				resultList += "<a " + aLink + " class=\"more\">" + ACDownloadSearch.localized.learnMore + "</a>";
				
			}
			$('featured').innerHTML = resultList;
		}
		
	}
	
};
