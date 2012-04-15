// this is a fake WT global var... remove before checking in
// var gDcsId = "foo";


function AutoTiles() {
	this.wtLoaded = false;
	var numPanels = 3;
	this.viewsTracked = new Array(numPanels);

		

	if (typeof(_autoTiles_prototype_called) == 'undefined') {
    		_autoTiles_prototype_called = true;
    		AutoTiles.prototype.init = init;
    		AutoTiles.prototype.flashListener = flashListener;
	    	AutoTiles.prototype.domScraper = domScraper;
    		AutoTiles.prototype.webTrendsCaller = webTrendsCaller;
    		AutoTiles.prototype.toggleViewedState = toggleViewedState;
			AutoTiles.prototype.flashLinkIdFactory = flashLinkIdFactory;
			AutoTiles.prototype.flashLinkIdFactoryPop = flashLinkIdFactoryPop;
    	}
	
	// initialize the tracking array
	function init() {		
		this.wtLoaded = true;
		for(i = 0; i < numPanels; i++) {
			this.viewsTracked[i] = 0;
			//alert('array sub ' + i);
		}
	}
		
	// flip the viewed state for a panel for this page view
	function toggleViewedState(panelId) {
		//alert('called panel ' + panelId);
		this.viewsTracked[panelId] = 1;
	}
	
	// this gets called by the loader swf as the panels change, it will check the state for that panel and report to WT if that panel has NOT been viewed.
	function flashListener(panelId) {
		
		var pPanel = panelId -1;
		if(this.wtLoaded) {
			var currentWtCall = this.domScraper(panelId);
			if(this.viewsTracked[pPanel] == 0) {
				this.webTrendsCaller(1, currentWtCall, panelId);
				this.toggleViewedState(pPanel);
			}
		}
	}
	
	// this gets the TSContentId from the marquee wrapper
	function domScraper(nodeToFind) {
		var qualifiedNodeName = 'wtContentID' + nodeToFind;
		var myNode = document.getElementById(qualifiedNodeName);
		return myNode.innerHTML;
	}
	
	
	// call WT and pass the relevant info.
	function webTrendsCaller(slotTypeId, tsContentId, panelId) {
		dcsMultiTrack('DCS.dcsuri',window.location.pathname,'DCS.dcsref',window.location.href,'DCSext.wtNoHit','y','DCSext.wtSlotContent',slotTypeId + '-' + tsContentId + '-' + panelId);
	}
	

	// rewrite the url coming from the CTA in the flash panel so we can append the correct content ID
	function flashLinkIdFactory(url, linkId, panelId) {
		if(url && linkId && panelId) {
			var myContentId = this.domScraper(panelId);
			var queryStringRetVal = url;
			if(url.indexOf('?') == -1) {
				var qString = '?rel=nofollow&wtSlotClick=';
			}else{
				var qString = '&rel=nofollow&wtSlotClick=';
			}
			queryStringRetVal = queryStringRetVal + qString + '1-' + myContentId + '-' + panelId + '-' + linkId;
			window.location = queryStringRetVal;
		}
	}

	
	// rewrite the url coming from the CTA in the flash panel so we can append the correct content ID now with popup!
	function flashLinkIdFactoryPop(url, linkId, panelId, popWidth, popHeight) {
		if(url && linkId && panelId) {
			var myContentId = this.domScraper(panelId);
			var queryStringRetVal = url;
			if(url.indexOf('?') == -1) {
				var qString = '?rel=nofollow&wtSlotClick=';
			}else{
				var qString = '&rel=nofollow&wtSlotClick=';
			}
			queryStringRetVal = queryStringRetVal + qString + '1-' + myContentId + '-' + panelId + '-' + linkId;
			window.open(queryStringRetVal, "", "width=" + popWidth + ", height=" + popHeight + ", resizable=1, scrollbars=1");
		}
	}
}

