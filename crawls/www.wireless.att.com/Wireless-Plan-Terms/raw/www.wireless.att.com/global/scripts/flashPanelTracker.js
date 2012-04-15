// this is a fake WT global var... remove before checking in
// var gDcsId = "foo";


function AutoTiles() {
	this.wtLoaded = false;
	var numPanels = 10;
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
		var foundRef = window.location.href.indexOf('&dcsref');
		if(foundRef != -1) {
			// if the current location contains a dcsref (ex: u-rock referral.jsp) then pass the original dcsref from the referrer B2C-24390
			var newref = window.location.href.substr(foundRef+8);
			newref = newref.substring(0, newref.indexOf('?'));
			dcsMultiTrack('DCS.dcsuri',window.location.pathname,'DCS.dcsref',newref,'DCSext.wtNoHit','y','DCSext.wtSlotContent',slotTypeId + '-' + tsContentId + '-' + panelId);		
		} else {
			dcsMultiTrack('DCS.dcsuri',window.location.pathname,'DCS.dcsref',window.location.href,'DCSext.wtNoHit','y','DCSext.wtSlotContent',slotTypeId + '-' + tsContentId + '-' + panelId);		
		}
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

