mybuys.setClient("PACSUN");

//Styles for all zones
mybuys.setStyle('.mbitem', 'font-family', 'sans-serif', 'text-align', 'left');
mybuys.setStyle('.mbpricelink:link', 'color', '#000000', 'font-weight', 'normal');
mybuys.setStyle('.mbpricelink:visited', 'color', '#000000', 'font-weight', 'normal');
mybuys.setStyle('.mblistsalerowspan', 'text-align', 'left', 'background-color', '#FFFFFF', 'padding-left', '2px');
mybuys.setStyle('.mbnamerowspan', 'text-align', 'left', 'overflow', 'hidden', 'background-color', '#FFFFFF', 'padding-left', '2px', 'line-height', 'normal !important');
mybuys.setStyle('.mbimgspan', 'background-color', '#FFFFFF');
mybuys.setStyle('.mblegend', 'font-size', '12px', 'font-weight', 'bold', 'color', '#000000', 'text-align', 'left', 'padding', '0', 'font-family', 'sans-serif');
mybuys.setStyle('.mblistlink:link', 'color', '#999999', 'text-decoration', 'line-through');
mybuys.setStyle('.mblistlink:visited', 'color', '#999999', 'text-decoration', 'line-through');
mybuys.setStyle('.mbsalelink:link', 'color', '#FF0000');
mybuys.setStyle('.mbsalelink:visited', 'color', '#FF0000');
mybuys.setStyle('.mbdivider', 'height', '0px', 'border-color', '#C1C1C1', 'border-style', 'none none dotted', 'border-width', '0 0 1px');
mybuys.setStyle('.mbpromotext', 'color', 'red', 'text-align', 'left', 'display', 'inline-block'); 

//PDP styles
mybuys.setStyleByPageType("PRODUCT_DETAILS", '.mbzone', 'width', '415px');
mybuys.setStyleByPageType("PRODUCT_DETAILS", '.mbitem', 'width', '100px', 'padding', '0px 1px 0px 2px', 'font-size', '9px');
mybuys.setStyleByPageType("PRODUCT_DETAILS", '.mbnamerowspan', 'width', '100px', 'max-height', '24px');

//Shopping Cart styles
mybuys.setStyleByPageType("SHOPPING_CART", '.mbzone', 'width', '520px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mbitem', 'width', '120px', 'padding', '10px 5px 0', 'font-size', '11px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mbnamerowspan', 'width', '100px', 'max-height', '28px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mblegend', 'background-color', '#E7E7E7', 'padding', '0 5px', 'line-height', '31px !important', 'font-weight', 'normal', 'font-size', '11px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mbdivider', 'display', 'none !important');

//HCAT styles
mybuys.setStyleByPageType("HIGH_LEVEL_CATEGORY", '.mbzone', 'width', '780px');
mybuys.setStyleByPageType("HIGH_LEVEL_CATEGORY", '.mbitem', 'width', '180px', 'padding', '0px 7px 0px 8px', 'font-size', '11px');
mybuys.setStyleByPageType("HIGH_LEVEL_CATEGORY", '.mbnamerowspan', 'width', '140px', 'max-height', '28px');

//No Search Results styles
mybuys.setStyleByPageType("SEARCH_RESULTS", '.mbzone', 'width', '960px');
mybuys.setStyleByPageType("SEARCH_RESULTS", '.mbitem', 'width', '185px', 'padding', '0px 3px 0px 4px', 'font-size', '11px');
mybuys.setStyleByPageType("SEARCH_RESULTS", '.mbnamerowspan', 'width', '140px', 'max-height', '28px');

mybuys.processResponseHTML = function(zoneHtmls) {
	clearTimeout(this.requestProcId);
	if (!this.renderOK) return;
	var leftoverZones=[]
	for (var zk=0;zk<this.zoneKeysToZoneDivIds.length;zk++)
	{	if (this.zoneKeysToZoneDivIds[zk])
			leftoverZones[zk]=true;
	}
	for (zonekey in zoneHtmls)
	{	try { if (typeof zoneHtmls[zonekey] == 'function') continue; } catch(e) { continue; };
		var zoneDivId = this.zoneKeysToZoneDivIds[zonekey];
		if (!zoneDivId) continue;
		var zoneDiv = this.el(zoneDivId);
		if (zoneDiv)
		{
			zoneDiv.innerHTML=zoneHtmls[zonekey];
			leftoverZones[zonekey]=false;
		}
	}
	for (var zk=0;zk<leftoverZones.length;zk++)
	{	if (leftoverZones[zk])
			this.loadFailoverImage(zk);
	}
	
	//BEGIN URL FIXING
	if((mybuys.params['pt'] == 'cart') && (location.protocol === 'https:')) {
		var mbDomainName = location.host;
		jQuery('a.mbimglink,a.mbnamelink,a.mblistlink,a.mbsalelink,a.mbpricelink').each(function(index) {
			$(this).attr('href', 'http://' + mbDomainName + $(this).attr('href'));
		});
	}
}

mybuys.applyStyles();
mybuys.setFailOverMsecs(5000);
mybuys.enableZones();