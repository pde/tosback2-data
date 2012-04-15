var ATT = window.ATT || {};

// used for performing color SKU changes
ATT.ColorSwatch = (function() {
	var selectedSku = {};
	var selectedSkuStyle = {
		backgroundImage : "url(/cell-phone-service/images/common/colorSwatch_highlight.gif)",
		backgroundPosition: "50% 0%",
		backgroundRepeat : "no-repeat"
	};
	var selectedSkuStyle2 = {
		backgroundImage : "url(/cell-phone-service/images/common/colorSwatch_highlight_52x28.gif)",
		backgroundPosition: "50% 0%",
		backgroundRepeat : "no-repeat"
	}
	var ifurbImages = {
			"8 GB"  : "ifurb_phones_burst.gif",
			"16 GB" : "ifurb16gb_phones_burst.gif"
	}
	
	function _swapAjaxPriceBlock(me, compare) {
		var oldSku = me.className.split(" ")[1]; // get old sku id
		var newSku = me.className.split(" ")[2]; // get new sku id
		
		var xhr = new Ajax.Request("/cell-phone-service/cell-phones/displayPricingAjax.jsp", {
			onSuccess : function(transport) { 
				var block = $$("#"+oldSku+"_pblock .listItemPriceContainerNoFixedHeight")[0];
				var text = transport.responseText;
				if (block) { block.innerHTML = text; }
				// switch compare check box sku value
				$(compare).value=newSku;
			},
			method : 'get',
			parameters : { q_sku : newSku }
		});
		try { xhr.transport.send(null); } catch(e) { } /* needed for IE vs ( FF & Safari ) behavior */
	}
	
	function _swapAjaxPriceBlockByZip(me, compare) {		
		var zipSku = me.className.split(" ")[1]; // get old sku id
		//	var newSku = me.className.split(" ")[2]; // get new sku id
		var zip= document.getElementById('zipFieldPricing_'+zipSku).value;
		var zipList= document.getElementById('v_npPhonesList').value;
		var zipListCnt= document.getElementById('v_npPhonesCount').value;		
		for(i=1;i<=zipListCnt;i++) {
			var oldSku = zipList.split(" ")[i];	
			_swapPriceByZip(zip,oldSku);
		}
	}
	
	function _swapPriceByZip(sZip,sOldSku) {
		var xhr = new Ajax.Request("/cell-phone-service/cell-phones/displayPricingAjaxByZip.jsp?zipCode="+sZip+"&q_sku="+sOldSku, {
			onSuccess : function(transport) { 
				var block = $$("#"+sOldSku+"_pblock .listItemPriceContainerNoFixedHeight")[0];				
				var text = transport.responseText;
				if (block) { block.innerHTML = text; }
				// switch compare check box sku value
				$(compare).value=sOldSku;
			},
			method : 'get',
			parameters : { q_sku : sOldSku }
		});
		try { xhr.transport.send(null); } catch(e) { } /* needed for IE vs ( FF & Safari ) behavior */
	}
	
	function _swapAjaxPriceBlockByZipB(me, compare, package) {		
		var zipSku = me.className.split(" ")[1]; // get old sku id
		//var newSku = me.className.split(" ")[2]; // get new sku id
		var zip= document.getElementById('zipFieldPricingB_'+zipSku).value;
		var zipList= document.getElementById('v_npPhonesList').value;
		var zipListCnt= document.getElementById('v_npPhonesCount').value;
		for(i=1;i<=zipListCnt;i++) {
			var oldSku = zipList.split(" ")[i];				
			_swapPriceByZipB(zip,oldSku,package);
		}
	}
	function _swapPriceByZipB(sZip,sOldSku,package) {	
		if (package){
			var ajaxURL = "/cell-phone-service/packages/displayPricingAjaxByZip_Grid.jsp";
		} else {
			var ajaxURL = "/cell-phone-service/cell-phones/displayPricingAjaxByZip_Grid.jsp";
		}
		var xhr = new Ajax.Request(ajaxURL+"?zipCode="+sZip+"&q_sku="+sOldSku, {
			onSuccess : function(transport) { 
				var block = $$("#"+sOldSku+"_price_info")[0];
				var text = transport.responseText;
				if (block) { block.innerHTML = text; }
				// switch compare check box sku value
				$(compare).value=sOldSku;
			},
			method : 'get',
			parameters : { q_sku : sOldSku }
		});
		try { xhr.transport.send(null); } catch(e) { } /* needed for IE vs ( FF & Safari ) behavior */
	}
	
	function _swapAjaxSkuInformation(me, usePackageSku, storage) {
		var xhr = new Ajax.Request("/cell-phone-service/packages/getSKUDetailsAJAX.jsp", {
			onSuccess : function(response) {
				var xml = response.responseXML;
				var oldSku = me.className.split(" ")[1]; // get old sku id
				var newSku = me.className.split(" ")[2]; // get new sku id
				
				// swap phone image
				var imgbox = $(oldSku +"_image_details");
				imgbox.down().src = xml.getElementsByTagName("imageUrl")[0].firstChild.nodeValue;
				var dispName = xml.getElementsByTagName("displayName")[0].firstChild.nodeValue;
				imgbox.down().alt = dispName;
				imgbox.title = dispName;
				
				// swap bazaar voice image if present
				var reviews = xml.getElementsByTagName("bvReviews")[0].firstChild.nodeValue;
				var ratings = xml.getElementsByTagName("bvRating")[0].firstChild.nodeValue;
				_swapBazaarVoiceImage(oldSku+"_bvdetails", reviews, ratings);
				
				// swap the sku id on all links
				$$("a[id*='"+ oldSku +"']").each(function(e){
					var start = (e.href.indexOf("q_package=") + 10);
					if (start <= 10) { start = (e.href.indexOf("q_sku=") + 6) }
					if (usePackageSku) {
						// get package sku number
						var packageSku = xml.getElementsByTagName("packageId")[0].firstChild.nodeValue;
						var sku = e.href.substring(start, start + 27);
						e.href = e.href.replace(sku, packageSku + "&q_sku=" + newSku);
					} else {
						var sku = e.href.substring(start, start + 10);
						e.href = e.href.replace(sku, newSku);
					}
				});
				// toggle starburst if available
				if (storage) {
					var burst = $(oldSku + "_GB");
					if (burst) { 
						var idx = burst.src.lastIndexOf("/") + 1;
						burst.src = burst.src.replace(burst.src.substring(idx, burst.src.length), ifurbImages[storage]);
					}
				}
				// toggle pinless if present
				var pinlessStar = $("starPinless_" + oldSku);
				if (pinlessStar) {
					var pinless = xml.getElementsByTagName("isPinless")[0].firstChild.nodeValue;
					pinlessStar.setStyle((pinless == 'true') ? {'visibility':'visible', 'display':'block'} : {'visibility':'hidden'});
				}
			},
			method : 'get',
			parameters : { q_sku : me.className.split(" ")[2], q_image : 'largeImage' }
		});
		try { xhr.transport.send(null); } catch(e) { } /* needed for IE vs ( FF & Safari ) behavior */
	}
	
	function _swapBazaarVoiceImage(id, reviews, ratings) {
		var xhr = new Ajax.Request("/cell-phone-service/cell-phones/bazaarReviewSwatch.jsp", {
			onSuccess : function(transport) {
				var text = transport.responseText;
				var element = $(id);
				if (element) { element.replace(text); }
			},
			method : 'get',
			parameters : { q_reviews : reviews, q_rating : ratings, q_id : id }
		});
		try { xhr.transport.send(null); } catch(e) { } /* needed for IE vs ( FF & Safari ) behavior */
	}
	
	function _setSelectedColorSku(obj, type) {
		var index = obj.className.split(" ")[1];
		selectedSku[index] = obj;
		Element.up(obj).setStyle((type == 2 ? selectedSkuStyle2 : selectedSkuStyle));
		
		// swap phone color name - strip out new color text if present
		var titleVal = obj.title;
		var startIdx = (titleVal.indexOf("New") < 0) ? -1 : titleVal.indexOf("-");
		if (titleVal.length > 1) {
			$(index+"_color_title").firstChild.nodeValue = 
				titleVal.substring((startIdx > 0 ? startIdx + 2 : 0), titleVal.length);
		}
	}
	
	function _swapSelectedColorSku(obj, type) {
		var index = obj.className.split(" ")[1];
		var oldSelection = selectedSku[index];
		if (oldSelection) {
			Element.up(oldSelection).setStyle({ background : "" });
		}
		_setSelectedColorSku(obj, type);
	}
	
	function _updateNewArrivalBanner(enabled, idSku) {
		var element = $("newColorLineDiv_" + idSku); 
		if (element) { element.style.display = (enabled) ? 'block' : 'none'; }
	}
	
	return {
		initializeColorSku : function() {
			$$("a.initialColorSku").each(function(e) {
				_setSelectedColorSku(e, (e.className.indexOf("apple") < 0 ? 1 : 2));
			});
		},
		
		colorSkuOver : function(obj) {
			Element.down(obj).setStyle({borderColor:"#000"});
		},
		
		colorSkuOut : function(obj) {
			Element.down(obj).setStyle({borderColor:"#ccc"});
		},
		
		colorSkuClick : function(clickEvt) {
			_swapAjaxSkuInformation(clickEvt.obj, clickEvt.usePackageSku, clickEvt.storage);
			_swapSelectedColorSku(clickEvt.obj, clickEvt.type);
			_swapAjaxPriceBlock(clickEvt.obj, clickEvt.compare);
			_updateNewArrivalBanner(clickEvt.newArrival, clickEvt.defaultSku);
			// execute web trends
			if (!clickEvt.fake) {
				try {
					dcsMultiTrack(
							"DCS.dcsuri", window.location.href,
							"DCS.dcsref", window.location.href,
							"DCSext.wtEventType", "user",
							"DCSext.wtLinkName", clickEvt.obj.title,
							"DCSext.wtSku", clickEvt.obj.className.split(" ")[2], 
							"DCSext.wtLinkLocation", "Phone List Pg Swatch",
							"DCSext.buyflowtype", "NEW",
							"DCSext.wtNoHit", "Y",
							"DCSext.wtPN", "Phone List Pg"
						);
				} catch(e) {}
			}
		},
		
		zipCodeSkuClick : function(clickEvt) {				
			_swapAjaxPriceBlockByZip(clickEvt.obj, clickEvt.compare);	
		},
		
		zipCodeBSkuClick : function(clickEvt) {								
			_swapAjaxPriceBlockByZipB(clickEvt.obj, clickEvt.compare, clickEvt.package);	
		},
		
		phoneImageOver : function(obj) {
			Element.setStyle(obj, {borderColor : "#0000A0"});
		},
		
		phoneImageOut : function(obj) {
			Element.setStyle(obj, {borderColor : "#fff"});
		}
	}
})();

// used for performing phones list sorting
ATT.PhoneSort = (function() {
	var wtSortType = ["LowToHighPrice", "HighToLowPrice", "OnlineOnlyPrice", "NewArrivals", "AvgRating", "MostRated"];
	var sortTypes = [
	                 
		function (obja, objb) { // sort by minimum price
			return _minimumSort(obja, objb, 1);
		},
	
		function (obja, objb) { // sort by maximum price
			return _maximumSort(obja, objb, 1);
		},
	
		function (obja, objb) { // sort by online only price
			var sortVal = _booleanSort(obja, objb, 2);
			if (sortVal == 0) {
				return _minimumSort(obja, objb, 1);
			} else { return sortVal; }
		},
		
		function (obja, objb) { // sort by new arrival
			var sortVal = _booleanSort(obja, objb, 5);
			if (sortVal == 0) {
				return _manufacSort(obja, objb);
			} else { return sortVal; }
		},
		
		function (obja, objb) { // sort by avg rating
			return _maximumSort(obja, objb, 4);
		},
		
		function (obja, objb) { // sort by most rated
			return _maximumSort(obja, objb, 3);
		}
	];
	
	function _maximumSort(parama, paramb, idx) {
		var aval = parseFloat(parama[parama.length - idx]);
		var bval = parseFloat(paramb[paramb.length - idx]);
		if (aval < bval) { return 1; }
		else if (aval > bval) { return -1; }
		else { 
			return _manufacSort(parama, paramb);
		}
	}
	
	function _minimumSort(parama, paramb, idx) {
		var aval = parseFloat(parama[parama.length - idx]);
		var bval = parseFloat(paramb[paramb.length - idx]);
		if (aval > bval) { return 1; }
		else if (aval < bval) { return -1; }
		else { 
			return _manufacSort(parama, paramb);
		}
	}
	
	function _booleanSort(parama, paramb, idx) {
		var aval = parama[parama.length - idx];
		var bval = paramb[paramb.length - idx];
		if (aval == bval) { return 0; 
		} else if (aval.toUpperCase() == 'TRUE') { return -1; 
		} else { return 1; }
	}
	
	function _manufacSort(parama, paramb) {
		return (parama[0] > paramb[0]) ? 1 : -1; 
	}
	
	function _executeSort(idx) {
		return $$(".phoneListItem-container").sort(function(a, b){
			var pricea = a.id.split('_');
			var priceb = b.id.split('_');
			return sortTypes[idx - 1](pricea, priceb);
		});
	}
	
	return {
		performSort : function(sort) {
			if (sort <= 0) { return; 
			} else if (sort > sortTypes.length) {
				var t=setTimeout("submitFliter();",250) 
			} else {
				var items = _executeSort(sort);
				if (items.length > 0) {
					var container = $$(".listContainer")[0];
					container.childElements().each(function(e){ Element.remove(e); });
					items.each(function(e){ container.appendChild(e); });
				}
			}
			ATT.PhoneFilter.storeFilterParams();
			try {
				dcsMultiTrack( // web trends
						"DCS.dcsuri", window.location.pathname,
						"DCS.dcsref", window.location.href,
						"DCSext.wtFormSubmit", 0,
						"DCSext.wtEventType", "user",
						"DCSext.wtClick_PhoneListSort", wtSortType[sort - 1]
					);
			} catch(e) {}
		}
	}
})();

// used for JS based phone filtering
ATT.PhoneFilter = (function() {
	var group1 = $H();
	var group2 = $H();
	var group3 = $H();
	
	var filterBase = ".phoneListItem-container";
	var webTrendsName = ["Capabilities", "Manufacturer", "Style"];
	var webTrendsName2 = ["allFeatures", "allManus", "allTypes"];
	var visibleSkus = [];
	
	// gets the group associated with the number
	function _getFilterGroup(num) {
		var group = null;
		switch (num) {
		case 1: group = group1; break;
		case 2: group = group2; break;
		case 3: group = group3; break;
		}
		return group;
	}
	
	// adjusts the all value for check box groups
	function _checkAllOption(grp) {
		var checkbox = _getAllOption(grp);
		if (_hasNoSelections(grp)) {
			if (checkbox) { checkbox.checked = true; }
		} else { if (checkbox) { checkbox.checked = false; } }
	}
	
	// check if the check box group is empty 
	function _hasNoSelections(num) {
		var group = _getFilterGroup(num);
		return (group.size() == 0 || (group.size() == 1 && group['feacondition']))
	}
	
	// checks or un-checks filter options
	function _updateFilterUI(name, status, value) {
		if (document.dc[name] && !value) { document.dc[name].checked = status; }
		else if (document.dc[name]) {
			var elements = document.dc[name];
			for (var i = 0; i < elements.length; i++) {
				if (elements[i].value == value) { elements[i].checked = status; }
			}
		}
	}
	
	// gets the general check box for the given group
	function _getAllOption(grp) {
		var checkbox = null;
		switch (grp) {
		case 1: checkbox = document.dc.allFeatures; break;
		case 2: checkbox = document.dc.allManus; break;
		case 3: checkbox = document.dc.allTypes; break;
		}
		return checkbox;
	}
	
	// adds browser back button hash parameters
	function _addBackFilterValue(num, values) {
		for (var i = 0; i < values.length; i++) {
			var pair = values[i].split("=");
			if (pair.length == 2) {
				_addFilterOption(pair[0], pair[1], num);
				if (pair[0] == 'feacondition') {
					_updateFilterUI(pair[0], true, pair[1]);
				} else { _updateFilterUI(pair[0], true); }
			}
		}
	}
	
	// toggles the given filter values
	function _toggleFilterOption(obj, grp) {
		var name = obj.name;
		var value = obj.value;
		var group = _getFilterGroup(grp);
		
		if (group[name]) {
			_removeFilterOption(name, grp);
			_updateFilterUI(name, false);
		} else {
			_addFilterOption(name, value, grp);
			_updateFilterUI(name, true);
		}
		_checkAllOption(grp);
	}
		
	// collect feature criteria
	function _filterStep1() {
		var tmp = _getFilterGroup(1).values();
		for (var i=0; i<tmp.length; i++) { filterBase += ("[id*='$']".replace("$", tmp[i])); }
	}
	
	// collect manufacturer criteria
	function _filterStep2(criteria) {
		var tmp = _getFilterGroup(2).values();
		for (var i=0; i<tmp.length; i++) { criteria.push((filterBase + "[id^='$']".replace("$", tmp[i]))); }
		if (criteria.length == 0) { criteria.push(filterBase); }
	}
	
	// collect style criteria
	function _filterStep3(criteria) {
		var collect = [];
		var tmp = _getFilterGroup(3).values();
		for (var styleCount = 0; styleCount < tmp.length; styleCount++) {
			for (var count = 0; count < criteria.length; count++) {
				collect.push(criteria[count] + ("[id*='$']".replace("$",tmp[styleCount])));
			}
		}
		if (collect.length == 0) { return criteria; }
		else { return collect; }
	}
	
	// perform the steps necessary to filter items
	function _performFilterSteps(step) {
		var criteria = [];
		
		visibleSkus.each(function(e){
			Element.hide(e);
		});
		
		switch(step) {
		case 0:
		case 1:
			filterBase = ".phoneListItem-container";
			_filterStep1();
			
		default:
			_filterStep2(criteria);
			
			criteria = _filterStep3(criteria);
		}
		
		visibleSkus = $$(criteria.concat());
		var skucount = 0;
		visibleSkus.each(function(e){
			Element.show(e);
			var info = e.id.split("_");
			skucount += parseInt(info[info.length - 7]);
		});
		var showing = $("fc_param1");
		if (showing) {
			showing.firstChild.nodeValue = skucount;
		}
	}
	
	// store the filter arguments
	function _storeFilterParams() {
		var returnUrl = $H({"startFilter":"false"});
		returnUrl.merge(_getFilterGroup(1));
		returnUrl.merge(_getFilterGroup(2));
		returnUrl.merge(_getFilterGroup(3));
		
		// add defaults if needed
		if (_hasNoSelections(1)) { returnUrl["allFeatures"] = "on"; } 
		if (_hasNoSelections(2)) { returnUrl["allManus"] = "on"; }
		if (_hasNoSelections(3)) { returnUrl["allTypes"] = "on"; }
		if ($("priceDropDown").selectedIndex > 0) { returnUrl["priceDropDown"] = $("priceDropDown").value; }
		
		if ($("fc_param2")) {
			(returnUrl["allFeatures"] && returnUrl["allManus"] && returnUrl["allTypes"] && !returnUrl['feacondition']) ? 
					$("fc_param2").hide() : $("fc_param2").show();
		}
		
		// check free selection
		var free = $$(".filter-input[name='feafree']")[0];
		if (free.checked == true) { returnUrl[free.name] = free.value; }
		
		// check pay type selection
		$$(".filter-input[name='feapaytype']").each(function(e){
			if (e.checked == true) {
				returnUrl[e.name] = e.value;
				if (e.value == 'gophone') {
					var replace = e.name;
					$$(".filter-input[name='feaprepaytype']").each(function(e){
						if (e.checked == true) {
							returnUrl[replace] = (e.value == 'standard'? 'pyg' : 'pyp');
						}
					});
				}
			}
		});
		
		var xhr = new Ajax.Request("/cell-phone-service/cell-phones/storeFilterUrl.jsp", {
			method : 'get',
			parameters : returnUrl
		});
		try { xhr.transport.send(null); } catch(e) { } /* needed for IE vs ( FF & Safari ) behavior */
	}
	
	// adds the key value pair to the specified group
	function _addFilterOption(name, value, grp) {
		var group = _getFilterGroup(grp);
		group[name] = value;
	}
	
	// removes the key value pair from the specified group
	function _removeFilterOption(name, grp) {
		var group = _getFilterGroup(grp);
		group.remove(name);
	}
	
	return { // public functions
		
		filterClick : function(obj, num, initial, incremental) {
			if (obj) { _toggleFilterOption(obj, num); }
			if (num > 0 && _hasNoSelections(num)) { 
				ATT.PhoneFilter.filterWebTrends(webTrendsName[num-1], webTrendsName2[num-1], true, null, true); 
			}
			_performFilterSteps(num);
			if ($("pf_loader")) {$("pf_loader").hide();}
			(($("pf_nothing") && visibleSkus.length == 0 && !incremental) ? $("pf_nothing").show() : $("pf_nothing").hide());
			if (!initial) {
				_storeFilterParams();
			} else if (window.location.href.indexOf("#") > 0){ window.location = window.location; }
		},
		
		// selects the default all group option
		clearFilterGroup : function(num, obj) {
			var group = _getFilterGroup(num);
			var form = document.forms.dc.elements;
			group.keys().each(function(e) {
				if (form[e] && e != 'feacondition') {
					form[e].checked = false;
					group.remove(e);
					ATT.PhoneFilter.filterWebTrends(webTrendsName[num-1], e, false, null, true);
				}
			});
			if (obj) { _checkAllOption(num); this.filterClick(null, 0, false); }
		},
		
		// generates browser back button hash
		getBackFilterInfo : function(){
			var str = "|";
			for (var i = 1; i <= 3; i++) {
				str += _getFilterGroup(i).toQueryString();
				if (i < 3) { str += "|"; }
			}
			return str;
		},
		
	
		storeFilterParams : function() {
			_storeFilterParams();
		},
		
		// radio button pressed on filter
		filterRadioClick : function(name, value) {
			if (value) {
				_addFilterOption(name, value, 1);
			} else {
				_removeFilterOption(name, 1);
			}
			this.filterClick(null, 0);
		},
		
		addFilterInfo : function(name, value, grpNum) {
			_addFilterOption(name, value, grpNum);
		},
		
		filterWebTrends : function(gname, gvalue, checked, needpost, system) {
			try {
				dcsMultiTrack(
						"DCS.dcsuri", window.location.href,
						"DCS.dcsref", window.location.href,
						"DCSext.wtEventType", (system ? "system" : "user"),
						"DCSext.wtLinkName", gname +"_"+ gvalue+"_"+(checked ? "Checked" : "UnChecked"),
						"DCSext.wtLinkLocation", "LeftSide Filter",
						"DCSext.buyflowtype", "NEW",
						"DCSext.wtNoHit", (needpost ? "N" : "Y"),
						"DCSext.wtPN", "Phone List Pg"
					);
			} catch(e) {}
		}
	}
})();
