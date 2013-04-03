	ATT.namespace("listPage"); 
	ATT.listPage =  new function () {
		var th = this;
		var vUrl = '';
		var vDivId = '';
		var vPageName = '';
		var vCookieName = '';
		var vAjax = true;
		var vQueryString = '';
		var vSessionId = ATT.util.getCookie("SHOPSESSIONID");
		var vAjaxCount = 0;
		var vInitValue = '';
		var vRedirectUrl = '';
		this.onComplete = function(){};	//called after getting a new set of products/devices
		this.vFunc = null;
		this.sessionSafe = function sessionSafe(sessionInfo){
			// make sure the localStorage information applies to this session.
			
			if(vSessionId && sessionInfo){
				sessionInfo = sessionInfo.split(';');
				if(vSessionId == sessionInfo[0]){return sessionInfo[1]}
			}
			
			return "";
		}
		this.constructUserSpecificUrl = function constructUserSpecificUrl(baseURL, deviceGroup, paymentType, packageType){
			var urlParams, returnURL, queryString, cartContents;
			urlParams = {};
			returnURL = "";
			queryString = "";
			cartContents = ATT.globalVars.cartContents;
			
			if(!baseURL || baseURL == null){return false}
			
			if(cartContents){
				urlParams["flowtype"] = cartContents.buyFlowType;
				urlParams["zip"] = cartContents.userZip;
				urlParams["planid"] = cartContents.planInContext;
				urlParams["deviceGroupType"] = deviceGroup;
				urlParams["paymentType"] = paymentType;
				urlParams["packageType"] = packageType;
				
				if(cartContents.lob && cartContents.lob.items.length){
					var LOSGs = cartContents.lob.items;
					for(var i = 0; i < LOSGs.length; i++){
						var thisLOSG = LOSGs[i];
						if (typeof thisLOSG.parts != 'undefined') {
							if(cartContents.losgInContext == thisLOSG.id && typeof thisLOSG.parts.plan != 'undefined'  && thisLOSG.parts.plan.length > 0 && thisLOSG.parts.plan[0].pid != ""){
								urlParams["planid"] = thisLOSG.parts.plan[0].pid;
							}
						}
					}
				}
				
				for(param in urlParams){
					if(urlParams[param] != ""){
						queryString += "." + param + "-" + urlParams[param];
					}
				}
				baseURL = baseURL.split(".").slice(0,-1).join(".");
				returnURL = queryString.length ? baseURL + queryString + ".html" : baseURL;
			}
			return returnURL;
		}
		this.getUrl = function getUrl() {return vUrl}
		this.getDivId = function getDivId() {return vDivId}
		this.setUrl = function setUrl(p1) {
			vUrl = p1;
		}
		this.setDivId = function setDivId(p1) {
			vDivId = p1; 
		}
		this.pageName = function pageName(p1) {
			if (p1 == undefined) {
				return  vPageName;
			} else {
				vPageName = p1
				vCookieName = 'listFilter' + p1;
			}
		}		
		
		this.getCookieName = function getCookieName() {
			return  vCookieName;
		}		
		this.redirectUrl = function redirectUrl(p1) {
			if (p1 != undefined) {
				vRedirectUrl = p1;
			} 
			return  vRedirectUrl;
		}		
		this.initValue = function initValue(p1) {
			if (p1 != undefined) {
				vInitValue = p1;
			} 
			return  vInitValue;
		}
		this.getScrollPositionPref = function getScrollPositionPref(){
			var sessionId, scrollPositionPref, scrollPositionPrefPair;
			
			sessionId =  ATT.util.getCookie("SHOPSESSIONID")
			scrollPositionPref =  window.localStorage.getItem(th.pageName() + "ScrollPositionPref");
			
			if(sessionId && scrollPositionPref){
				scrollPositionPrefPair = scrollPositionPref.split(';');
				if(sessionId == scrollPositionPrefPair[0]){return scrollPositionPrefPair[1]}
			}
			
			return false
		}
		this.setScrollPositionPref = function setScrollPositionPref(){window.localStorage.setItem(th.pageName() + "ScrollPositionPref", ATT.util.getCookie("SHOPSESSIONID") + ";" + jQuery(window).scrollTop())}
		this.getShowMorePref = function getShowMorePref(){
			var sessionId, sizePref, sizePrefPair;
			
			sessionId =  ATT.util.getCookie("SHOPSESSIONID")
			sizePref =  window.localStorage.getItem(th.pageName() + "SizePref");
			
			if(sessionId && sizePref){
				sizePrefPair = sizePref.split(';');
				if(sessionId == sizePrefPair[0]){return sizePrefPair[1]}
			}
			return jQuery('input#showMore').attr('value');
		}
		this.setShowMorePref = function setShowMorePref(sizePref){
			window.localStorage.setItem(th.pageName() + "SizePref", ATT.util.getCookie("SHOPSESSIONID") + ";" + sizePref);
		}
		this.showQuickView = function showQuickView(){
			var quickViewLink = jQuery(this).attr('href').replace('.html', '.quickview.html');
			
			jQuery.colorbox(
				{
					iframe: false, 
					scrolling: false, 
					width: 760, 
					height: 680,
					href:quickViewLink, 
					onComplete:function(){
						jQuery(".closeModal").click(function(){jQuery.colorbox.close()})
						jQuery('#priceBlockAjax input, #priceBlockAjax select').filter(':visible').uniform();
						jQuery.colorbox.resize();
					}
				}
			);
			return false;
		}
		this.generateFilterToken = function generateFilterToken(category, displayValue, element){
			var token = jQuery("<div>");
			token.attr("class", "filterToken");
			token.data("relatedElement", element);
			token.html("<a href='#'>" + displayValue + "</a>");
			token.click(function(){
				var relatedElement = jQuery(this).data("relatedElement");
				var filterGroupCheckboxInputs = jQuery("input[type='checkbox'][name=" + relatedElement.attr("name") + "]");
				var filterGroupRadioInputs = jQuery("input[type='radio'][name=" + relatedElement.attr("name") + "]");
				
				relatedElement.attr("checked", false);
				relatedElement.checked = false;
				
				if(!filterGroupCheckboxInputs.filter("[checked=true]").length){
					jQuery.each(filterGroupCheckboxInputs, function(index, filterInput){
						if(filterInput.value.toLowerCase() == 'all'){
							filterInput.checked = true;
						}
					});
				}
				
				jQuery.each(filterGroupRadioInputs, function(index, filterInput){
					if(filterInput.getAttribute('default') == 'true'){
						filterInput.checked = true;
					}
				});
				
				inputClick();
				jQuery.uniform.update('input.listFilterGroup');
				
			});
			return token;
		}
		this.generateFilterTokens = function generateFilterTokens(){
			var filterInputs = jQuery("input.listFilterGroup");
			jQuery("#filterTokens").html("");
			jQuery.each(filterInputs, function(index, filterInput){
				filterInput = jQuery(filterInput);
				if(filterInput.attr("checked")){
					var filtervalue = filterInput.val() || "";
					var content = filterInput.data("tokencontent") || "";
					var category = filterInput.data("tokencategory") || "";
					if(content != "" && category != "" && filtervalue.toLowerCase() != "all"){
						jQuery("#filterTokens").append(th.generateFilterToken(category, content, filterInput));
					}
				}
			})
			if(!jQuery("#filterTokens div").length){
				if(jQuery("#filterAttributeDiv").length){jQuery("#filterAttributeDiv").hide();}
				jQuery("#filterAttributeDisplay").hide();				
				if(jQuery("#compatibilityMessage").html() == ""){jQuery("#yellowMessage").hide();}
				return;
			}
			if(jQuery("#compatibilityMessage").html() == ""){jQuery("#compatibilityMessage").hide()}
			jQuery("#filterAttributeDisplay").show();
			if(jQuery("#filterAttributeDiv").length){jQuery("#filterAttributeDiv").show();}
			else {jQuery("#yellowMessage").show();}
		}
		
		this.getAllCheckbox = function getAllCheckbox(param) {
			var vArray = jQuery("input[type=checkbox]");
			var check_array = new Array();
			if (param == undefined) {
				check_array = vArray;
			} else {
				for (var i=0; i<vArray.length; i++) {
					if (param == vArray[i].name)
						check_array.push(vArray[i]);
				}				
			}
			return check_array;
		} // end of getAllCheckbox

		this.getAllRadio = function getAllRadio(param) {
			var vArray = jQuery("input[type=radio]");
			var check_array = new Array();
			if (param == undefined) {
				check_array = vArray;
			} else {
				for (var i=0; i<vArray.length; i++) {
					if (param == vArray[i].name)
						check_array.push(vArray[i]);
				}				
			}
			return check_array;
		} // end of getAllRadio
		
		this.uncheckAllCheckbox = function uncheckAllCheckbox(pArray) {
			for (var i=1; i<pArray.length; i++) {
				pArray[i].checked = false;
				jQuery('#'+pArray[i].id).parent().attr("class","");
			}
		} 
						
		this.checkboxClick = function checkboxClick() {
			var vArray = th.getAllCheckbox(this.name);
			if (vArray[0].value.toLowerCase() == 'all') {
				vArray[0].checked = false; 
				jQuery('#'+vArray[0].id).parent().attr("class","");
			}
			inputClick();
		}
						
		this.checkboxAllClick = function checkboxAllClick() {
			th.uncheckAllCheckbox(th.getAllCheckbox(this.name));
			inputClick();
		}
		this.radioClick = function radioClick () {
			inputClick();
		}
		
		function inputClick () {
			//ATT.util.setCookie('listFilterDevices', 'devices');
			if (vPageName != '')  {
				if (vAjax) {
					var vArray = jQuery(".listFilterGroup:checked");
					var checkedStr = getCheckedValue(vArray);
					if (vInitValue == checkedStr) {
						window.localStorage.setItem(vCookieName, '');
						//ATT.util.setCookie(vCookieName, '', -1);
					} else {
						//ATT.util.setCookie(vCookieName, checkedStr); 
						window.localStorage.setItem(vCookieName, vSessionId + ";" + checkedStr);
					}
				}
			}
			if (vRedirectUrl != '') {
				ATT.modalSpinner.show();
				document.location.href = vRedirectUrl + ((vRedirectUrl.indexOf('.html') > -1) ? '' : '.html');
				vRedirectUrl = '';
			} else {
				th.getItemInfo();
			}
			//jQuery(document).scrollTop(500);
		}
		
		function getQueryString() {
			var result = {}, queryString = location.search.substring(1),
				re = /([^&=]+)=([^&]*)/g, m;
			while (m = re.exec(queryString)) {result[decodeURIComponent(m[1])] = decodeURIComponent(m[2])}
			return result;
		}

		//this function will itirate thru all the checked inputs and retrieve corresponding attributes for pricing
		function getCheckedValue (pArray) {
			var vKeyName='', vKeyValue='', queryStr='', range='', queryHash;
			queryHash = getQueryString();
			if(!!queryHash["prod"]){queryStr += ((queryStr=='') ? '' : '&') + "prod" + '=' + queryHash["prod"]}
            var keyStr = '&priceRange=', priceRange = '';
            
			for (var i=0; i<pArray.length; i++) {
                var pr = ''; 
				if (pArray[i].value.toLowerCase() != 'all') {
					if (vKeyName != pArray[i].name) {
						//if (vKeyName != '') {								
							if (pArray[i].type == 'radio') {
								var min = pArray[i].getAttribute('begin');
								var max = pArray[i].getAttribute('end');
								if (min != null && max != null && min != '' && max != '') {
									range = 'min=' + min + '&max=' + max;
									queryStr += ((queryStr=='') ? '' : '&') + range;
								}
							}
							if (vKeyValue != '') {
								queryStr += ((queryStr=='') ? '' : '&') + vKeyName + '=' + vKeyValue;
								vKeyValue = '';
							} 
						//}
					}
					
					vKeyName = pArray[i].name; 
					vKeyValue += ((vKeyValue=='') ? '' : ',') + pArray[i].value;
                    
                    if (vKeyName == 'rangePricing') {
                        //range = 'min=' + min + '&max=' + max;
                        var min = pArray[i].getAttribute('begin');
                        var max = pArray[i].getAttribute('end');
                        priceRange += min + '-' + max + ',';
                        finalPriceRange = priceRange.slice(0,-1);
                        pr = keyStr + finalPriceRange;  
                    }
				}
				if (i == (pArray.length - 1)) {
					if ((vKeyName != '') && (vKeyValue != '')) {
						queryStr += ((queryStr=='') ? '' : '&') + vKeyName + '=' + vKeyValue;
					}
				}
                queryStr = pr + queryStr;
			}
			
			return queryStr;
		} // end of getCheckedValue
		
		function getParameterByName(name) {
			var qs = window.location.search.substring(1, location.search.length);
			var vStrArray = qs.split("&");
			for (var i=0; i < vStrArray.length; i++) {
				var vStr = vStrArray[i].split("=");
				if (name == vStr[0])
					return vStr[1];
			}
			return null;
		}
		
		function isUrlDivIdExist () {
			if (vUrl != '' && vDivId != '')
				return true;
			else
				return false;
		}
		
		this.getItemInfo = function getItemInfo() {
			var vArray = jQuery(".listFilterGroup:checked");
			var vDeviceType = getParameterByName("deviceType");
			var checkedStr = getCheckedValue(vArray);
			var queryStr = (checkedStr=='' ? '&' : '') + checkedStr;
			if (vDeviceType != null)
				queryStr += '&deviceType=' + vDeviceType;

			vQueryString = queryStr;
			if (vAjax) {
				if (isUrlDivIdExist()) {
					var vArrayUrl = vUrl.split(';');
					var vArrayDivId = vDivId.split(';');
					ATT.modalSpinner.show();
					for (var i=0; i<vArrayUrl.length ;i++) {
						var destinationDiv = "#"+vArrayDivId[i];
						//jQuery(document).trigger("getContent",[destinationDiv]);
						jQuery(destinationDiv).load(
							vArrayUrl[i], 
							queryStr, /*{limit: 25}*/
							function(response, status, xhr) {
								//jQuery(document).trigger("getContentComplete",[destinationDiv]);
								var scrollPref = th.getScrollPositionPref();
								
								vAjaxCount++;
								if (vAjaxCount == i) {
									vAjaxCount = 0;
									if (th.vFunc != null) {
										th.vFunc();
										th.vFunc = null;
									}
									if(scrollPref){jQuery(window).scrollTop(scrollPref)}
									ATT.modalSpinner.close();
									th.generateFilterTokens();
									th.onComplete();
								}
								jQuery('#list-body .styled_forms input, #list-body .styled_forms textarea, #list-body .styled_forms select').filter(":visible").uniform();
							}
						);
					}
					ATT.ui.rtiListOOS.delay(4000).then(function() {
						ATT.ui.rtiListOOS.init();
					});
					
				}
			}
		} // end of getItemInfo
		
		this.clearFilter = function clearFilter() {
			var vArrayCheckbox = jQuery("input[type=checkbox]").filter(".listFilterGroup"); 
			var vArrayRadio = jQuery("input[type=radio]").filter(".listFilterGroup"); 
			for (var i=0; i<vArrayCheckbox.length; i++) {
				if ((vArrayCheckbox[i].value.toLowerCase() == 'all')) { 
					vArrayCheckbox[i].checked = true;
				} else if ((vArrayCheckbox[i].name != 'sortByProperties') && (vArrayCheckbox[i].name != 'showMoreListSize')){
					vArrayCheckbox[i].checked = false; 
				}
			}
			for (var i=0; i<vArrayRadio.length; i++) {
				var vDefault = vArrayRadio[i].getAttribute('default');
				if (vDefault == 'true') {
					vArrayRadio[i].checked = true;
				} 
			}
			inputClick();
			jQuery.uniform.update('.listFilterGroup');
		} // end of clearFilter
		
		this.setFilter = function setFilterDefault (param) {
			var changed = false;
			if (vPageName != '') {
				var filterStorage = ATT.listPage.sessionSafe(window.localStorage.getItem(vCookieName)) || "";
				var filterCookie = ATT.listPage.sessionSafe(ATT.util.getCookie(vCookieName)) || "";
				var filterString = filterStorage || filterCookie;
				if ((filterString != '') && (filterString != null)) {
					changed = th.setFilterDefault(filterString);
				}
			}
			return changed;  //did we get a new set of items?
		}
		this.setFilterDefaultFromCookie = function setFilterDefaultFromCookie (param) {
			var changed = false;
			if (vPageName != '') {
				var str = ATT.listPage.sessionSafe(ATT.util.getCookie(vCookieName));
				if ((str != '') && (str != null)) {
					changed = th.setFilterDefault(str)
				}
			}
			return changed;  //did we get a new set of items?
		}
		
		this.setFilterDefault = function setFilterDefault (param) {
			var return_val = th.setInputCheck(param);
			if (return_val) ATT.listPage.getItemInfo();
			return return_val;
		}
		
		this.setInputCheck = function setInputCheck (param) {
			var changed = false;
			if ((typeof param == "undefined") || (param == '' ) || !param){return false}
			vAjax = false;
			var vFilterArray = param.split('&'); 
			for (var i=0; i < vFilterArray.length; i++) {
				var vKeyValueArray = vFilterArray[i].split('=');
				var vKey = vKeyValueArray[0];
				var vValue = vKeyValueArray[1];
				//ATT.log('setFilterDefault-> vKey:' + vKey + ' = vValue:' + vValue);
				var arrInput = (vKey == 'max') ? document.getElementsByName('rangePricing') : document.getElementsByName(vKey);
				if (vKey != 'rangePricing') {
					for (var j=0; j < arrInput.length; j++) {
						if (vKey == 'max') {
							var vMin = arrInput[j].getAttribute('begin');
							var vMax = arrInput[j].getAttribute('end');
							//ATT.log('setFilterDefault 1 pre -> ' + vKey + ' = ' + vValue + ' , min =' + vPreValue);
							if ((vMax ==  vValue) && (vMin == vPreValue)){
								arrInput[j].click();
								changed = true;
								//ATT.log('setFilterDefault 1-> ' + vKey + ' = ' + vValue + ' , min =' + vPreValue);
							}
						} else {
							if (! ((vKey == 'sortByProperties') || (vKey == 'showMoreListSize'))) {
								var found = (vValue.indexOf(',') > -1) ? (vValue.indexOf(arrInput[j].value) > -1) : (vValue == arrInput[j].value);
								if (found) {
									//ATT.log('checked: ' + arrInput[j].checked);
									//ATT.log('setFilterDefault 2-> ' + arrInput[j].value + ': ' + vKey + ' = ' + vValue);
									if (arrInput[j].checked == false) arrInput[j].click();
									changed = true;
								}
							}
						}
					} // end loop j
				}
				var vPreValue = vValue;
			} // end of loop i
			
			
			filterInputs = jQuery("input.listFilterGroup").each(function(index){
				filterInput = jQuery(this);
				if(filterInput.attr("checked")){
					var content = filterInput.data("tokencontent") || "";
					var category = filterInput.data("tokencategory") || "";
					if(content != "" && category != ""){
						filterExpand(jQuery(filterInput).attr("name"));
						if(filterInput.parents("li:hidden").length){toggleFilterItems(jQuery(filterInput).attr("name"))}
					}
				}
			});
			

			
			
			vAjax = true;
			return changed;  //did we get a new set of items?
		} // end of setInputCheck
		
		this.noAjaxInputClick = function noAjaxInputClick() {
			vAjax = false;
			th.getItemInfo();
			vAjax = true;
			return vQueryString;
		}
		
		this.removeAllFilterCookies = function removeAllFilterCookies(param) {
			if (typeof param != "undefined") {
				var cookie_array = document.cookie.split('; ');
				for (var x=0; x < cookie_array.length; x++) {
					var cookieParts_array = cookie_array[x].split('=');
					if (cookieParts_array[0].indexOf(param) > -1) {
						//ATT.util.setCookie(cookieParts_array[0], '', -1);
						window.localStorage.setItem(cookieParts_array[0], '');
					}
				}
			}
		}
		
		this.setCookie = function setCookie(cookieName, cookieValue, days, path) {
			var domain = document.domain;
			var secure = false;
			var vDate = new Date();
			var vDays = (days == undefined) ? 0 : days;
			vDate.setTime(date.getTime() + (vDays*24*60*60*1000));
			cookieStr = cookieName + "=" + cookieValue;
			cookieStr += (expireDate == undefined) ? "" : ("; expires=" + vDate.toGMTString());  
			cookieStr += (path == undefined) ? "; path=/" : ("; path=" + path);
			cookieStr += (domain == undefined) ? "" : ("; domain=" + domain);
			cookieStr += (secure == true) ? "; secure" : "";
			document.cookie = cookieStr;			
		} // end of setCookie
		
		this.getCookie = function getCookie(cookieName) {
			var return_value = '';
			var cookie_array = document.cookie.split ('; ');
			for (var x=0; x < cookie_array.length; x++) {
				var cookieParts_array = cookie_array[x].split('=');
				if (cookieParts_array[0] == cookieName) {
					return_value = cookie_array[x].substring(cookieParts_array[0].length+1, cookie_array[x].length);
				}
			}
			return return_value;
		} // end of getCookie
		
	} // end of listPage

	/*
		filter methods
	*/
	function filterCollapseExpand(param) {
		jQuery("#"+param).toggle();
		jQuery("#filter-collapse-"+param).toggle();
		jQuery("#filter-expand-"+param).toggle();
	}
	
	function filterExpand(param) {
		jQuery("#"+param).show();
		jQuery("#filter-collapse-"+param).show();
		jQuery("#filter-expand-"+param).hide();
	}
	
	function filterCollapse(param) {
		jQuery("#"+param).hide();
		jQuery("#filter-collapse-"+param).hide();
		jQuery("#filter-expand-"+param).show();
	}
	
	function toggleFilterItems(param){
		
		if(jQuery("#"+param+" li").length <= 6){
			jQuery("#"+param + " .filterItemToggle").hide();
			return;
		}else{
			jQuery("#"+param + " .filterItemToggle").show();
		}
		
		if(jQuery("#"+param).attr("state") === "collapsed"){
			jQuery("#"+param+" li").show();
			jQuery("#"+param + " .filterItemToggleMore").hide();
			jQuery("#"+param + " .filterItemToggleLess").show();
			jQuery("#"+param).attr("state", "expanded");
		}else{
			var itemsToHide = jQuery(jQuery("#"+param+" li").get().slice(5));
			itemsToHide.hide();
			jQuery("#"+param + " .filterItemToggleMore").html("more (" + (itemsToHide.length - 1) + ")");
			jQuery("#"+param + " .filterItemToggleMore").show();
			jQuery("#"+param + " .filterItemToggleLess").hide();
			jQuery("#"+param).attr("state", "collapsed");
		}
		jQuery("#"+param + " .filterItemToggle").show();
		
	}
	
	var listFilterInputClick = true;
	jQuery(document).ready(function() {
		ATT.listPage.initValue(ATT.listPage.noAjaxInputClick());
		if (listFilterInputClick) {
			var vArrayCheckbox = jQuery("input[type=checkbox]").filter(".listFilterGroup"); 
			var vArrayRadio = jQuery("input[type=radio]").filter(".listFilterGroup"); 
			
			vArrayCheckbox.click(ATT.listPage.setScrollPositionPref);
			vArrayRadio.click(ATT.listPage.setScrollPositionPref);
			
			for (var i=0; i<vArrayCheckbox.length; i++) {
				if (vArrayCheckbox[i].value.toLowerCase() == 'all') 
					vArrayCheckbox[i].onclick = ATT.listPage.checkboxAllClick; 
				else 
					vArrayCheckbox[i].onclick = ATT.listPage.checkboxClick;
			}
			for (var i=0; i<vArrayRadio.length; i++) {
				vArrayRadio[i].onclick = ATT.listPage.radioClick;
			}
		}
		
		var scrollPref = ATT.listPage.getScrollPositionPref();
		if(scrollPref){jQuery(window).scrollTop(scrollPref)}
		
		window.onbeforeunload = ATT.listPage.setScrollPositionPref;
		jQuery("#content").delegate(".clearFilter", "click", ATT.listPage.clearFilter);
		jQuery("#content").delegate(".quickViewLink", "click", ATT.listPage.showQuickView);
	});	