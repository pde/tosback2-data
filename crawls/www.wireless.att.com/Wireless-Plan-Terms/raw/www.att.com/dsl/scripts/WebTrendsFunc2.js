var currentdcsref = ""; 
var currentdcsuri = ""; 
var currentPN = "";
var currentisModal = "false";
var currentStatusCodeFn = "";

function fireModalReportingEvent() {
	$('btn_check_event').click();
	$('address_check_event').click();
	$('empty_cart_event').click();
}

function findLinkLocation(myLink) {
	var myNode = myLink;
	while (myNode.nodeName.toUpperCase() != "BODY") {
	    myNode = myNode.parentNode;

        if (myNode.id == 'universalNav-wrapper') {
            return "HDR";
        } else if (myNode.id == 'header2') {
            return "HDR";
        } else  if (myNode.id == 'mainNavigation') {
            return "MNB";
        } else if (myNode.id == 'content') {
            return "BDY";
        } else if (myNode.id == 'btmContainer2') {
            return "FTR";
        }
	}
	return "";
}

function querySt(qs, ji) {

    if (qs.indexOf("?") > -1) {
	    var gy = qs.split("?");
	    hy = gy[1].split("&"); // hy = the array of queryString matched pairs
		
	    for (i=0;i<hy.length;i++) {
			var ft = hy[i].split("="); // ft = the array of queryString name/value of a matched pair

			if (ft[0] == ji) {			
				return ft[1];
			}
		}
    }  
	return "empty";
}

function handleModalClick() {
		//alert("Inside WebTrendsFunc2.js-handleModalClick");
	
    	var drml_wtEvent 		= DCSext['wtEvent'] || '';
    	var drml_wtPN 			= DCSext['wtPN'] || '';
    	var drml_dcsref 		= DCS['dcsref'] || '';
    	var drml_dcsqry 		= DCS['dcsqry'] || '';
    	var drml_dcsuri 		= DCS['dcsuri'] || '';
    	var drml_wtStatusCode 	= DCSext['wtStatusCode'] || '';
    	var drml_wtSuccessFlag 	= DCSext['wtSuccessFlag'] || '';
    	var drml_wtNoHit 		= DCSext['wtNoHit'] || '';
    	var drml_wtSlotContent 	= DCSext['wtSlotContent'] || '';
    	var drml_wtAddSKUQty 	= DCSext['wtAddSKUQty'] || '';
    	var drml_buyFlowType 	= DCSext['buyFlowType'] || '';
    	var drml_ti				= WT['ti'] || '';
    	
    	
    	DCSext['wtEvent'] 		= '';
    	DCSext['wtPN'] 			= this.ctPN;
    	DCS['dcsref']			= this.ctdcsref;
    	DCS['dcsqry']			= '';
    	DCS['dcsuri']			= this.ctdcsuri;
    	DCSext['wtStatusCode'] 	= '';
    	DCSext['wtSuccessFlag'] = '';
    	DCSext['wtNoHit'] 		= '';
    	DCSext['wtSlotContent'] = '';
    	DCSext['wtAddSKUQty']   = '';

    	
    	if(this.buyFlowType != undefined)
    		DCSext['buyFlowType'] = this.buyFlowType;

    	
    	WT['ti'] 				= '';
    	
    	dcsMultiTrack();
    	
    	DCSext['wtEvent'] 		= drml_wtEvent;
    	DCSext['wtPN'] 			= drml_wtPN;
    	DCS['dcsref']			= drml_dcsref;
    	DCS['dcsqry']			= drml_dcsqry;
    	DCS['dcsuri']			= drml_dcsuri;
    	DCSext['wtStatusCode'] 	= drml_wtStatusCode;
    	DCSext['wtSuccessFlag'] = drml_wtSuccessFlag;
    	DCSext['wtNoHit'] 		= drml_wtNoHit;
    	DCSext['wtSlotContent'] = drml_wtSlotContent;
    	DCSext['wtAddSKUQty']   = drml_wtAddSKUQty;
    	DCSext['buyFlowType']	= drml_buyFlowType;
    	WT['ti'] 				= drml_ti;	
    	
}


function handleNonModalClick() {
	
	//alert("Inside WebTrendsFunc2.js-handleNonModalClick");
    var wtStatusCode = "0";
    if(this.ctStatusCodeFn != null && this.ctStatusCodeFn != "") {
    	wtStatusCode = eval(this.ctStatusCodeFn);
	    if(wtStatusCode == "")
	    	wtStatusCode = "0";
    }		    
	
	DCSext['wtEvent'] 		= this.ctEvent;
	DCSext['wtPN'] 			= this.ctPN;
	DCS['dcsref']			= this.ctdcsref;
	DCS['dcsuri']			= this.ctdcsuri;
	DCSext['wtStatusCode'] 	= wtStatusCode;
	DCSext['wtSuccessFlag'] = wtStatusCode == "0" ? "1" : "0";
	DCSext['wtNoHit'] 		= (this.ctNoHit != undefined) ? this.ctNoHit : '1';

	
	//For a non-modal event with a status code function, assume only want to display if client-side
	//error is detected.  Otherwise, do not report since consolidation should handle event on target page.
	if(this.ctStatusCodeFn != null && this.ctStatusCodeFn != "" && wtStatusCode == "0") 
		return;
	
	dcsMultiTrack(
		'DCS.dcsuri',this.ctdcsuri,
		'DCS.dcsref',this.ctdcsref
	);
}

function addsubmitFormWT(currentEvent, currentFormSubmit) {
	
	webTrendTag(currentEvent, currentFormSubmit);
}	

function webTrendTag(wtEvent, wtFormSubmit) {
	//alert("Current Event = "+wtEvent);
	
	try {
		var str = ""; 				
		str += "*wtEvent^" + wtEvent;		
		str += "*wtFormSubmit^" + wtFormSubmit;
		commonFunc.setCookie("dsl_webtrend", str);
		//alert("str="+str+" wtEvent= "+wtEvent);
	} catch (e) {
	}
}	



var dcsuri = "";
var uriRoot = window.location.protocol +  "//" + window.location.host;

function getWTPageName(uri, qualified) {
	var pn = null;
	try {
		if(wtPageNameData[uri])
			pn = wtPageNameData[uri].qual && qualified ? wtPageNameData[uri].qual : wtPageNameData[uri].pnDefault;
	} catch(e) {}	
	return pn;
}

function getWTPageNameDRockSpecific(uri, qualified, serviceAvailResult, localeZipCode) {
	var pn = getWTPageName(uri, qualified);
		
	if (uri.toString().indexOf("dsl/message.jsp") > -1) {
		try {
			var messageId = window.location.href.toQueryParams().messageId;
			if(messageId && messageId.length > 0) {
				pn += (": " + messageId);
			}
		} catch(ex) {
		}
	}
	
	if(pn != null && pn != "")
		return pn;

	if (uri.toString().indexOf("dsl/index.jsp") > -1) {
		pn = (localeZipCode == null || localeZipCode == "") ? 'DSL Landing (Non-Localized)' : 'DSL Landing (Localized)';
	}
	
	if(pn == null || pn == '') //DEFAULT
		pn = "DSL Unknown Page Name";
	
	return pn;
}	

var wtDupLinks = [];
function wtDupLink (tag) {
	this.tags = [tag];
}

function injectWebTrendsData() {
	try {
		addOnclickToWebTrendTags();
		addOnclickToWebTrendElements();
		addQSDataToWebTrendTags();
		addQSDataToWebTrendTagsDRockSpecific();
		addLinkCountsForWebTrends();
		removeLiveChatNoThanks();
		removeOneTimeOnLoadReportingData();
	} catch(e) {
	}
}


//apply rules to non-anchor elements
function addOnclickToWebTrendElements() {
	$H(wtInjectData).each(function(rule) {
		if(wtInjectData[rule.key].uri == requestURI || wtInjectData[rule.key].uri == "*") {
			if(wtInjectData[rule.key].hreflike) {
				return;
			}
			
			$A(wtInjectData[rule.key].idlike).each(function(idlikeElem) {
				if($(idlikeElem)) {
					$(idlikeElem).ctdcsref 			= wtInjectData[rule.key].ctdcsref.startsWith("[js]") ? eval(wtInjectData[rule.key].ctdcsref.substring(4)) : wtInjectData[rule.key].ctdcsref;
					$(idlikeElem).ctdcsuri 			= wtInjectData[rule.key].ctdcsuri.startsWith("[js]") ? eval(wtInjectData[rule.key].ctdcsuri.substring(4)) : wtInjectData[rule.key].ctdcsuri;
					$(idlikeElem).ctPN 				= wtInjectData[rule.key].ctPN.startsWith("[js]") ? eval(wtInjectData[rule.key].ctPN.substring(4)) : wtInjectData[rule.key].ctPN;
					$(idlikeElem).ctIsModal 		= wtInjectData[rule.key].ctIsModal.startsWith("[js]") ? eval(wtInjectData[rule.key].ctIsModal.substring(4)) : wtInjectData[rule.key].ctIsModal;
					$(idlikeElem).ctEvent 			= wtInjectData[rule.key].ctEvent.startsWith("[js]") ? eval(wtInjectData[rule.key].ctEvent.substring(4)) : wtInjectData[rule.key].ctEvent;
					$(idlikeElem).ctFormSubmit 		= wtInjectData[rule.key].ctFormSubmit.startsWith("[js]") ? eval(wtInjectData[rule.key].ctFormSubmit.substring(4)) : wtInjectData[rule.key].ctFormSubmit;
					
					if(wtInjectData[rule.key].ctNoHit != undefined)
						$(idlikeElem).ctNoHit 		= wtInjectData[rule.key].ctNoHit.startsWith("[js]") ? eval(wtInjectData[rule.key].ctNoHit.substring(4)) : wtInjectData[rule.key].ctNoHit;

					if(wtInjectData[rule.key].buyFlowType != undefined)
						$(idlikeElem).buyFlowType 	= wtInjectData[rule.key].buyFlowType.startsWith("[js]") ? eval(wtInjectData[rule.key].buyFlowType.substring(4)) : wtInjectData[rule.key].buyFlowType;
					
					if(wtInjectData[rule.key].ctStatusCodeFn != null) {
						$(idlikeElem).ctStatusCodeFn	= wtInjectData[rule.key].ctStatusCodeFn.startsWith("[js]") ? eval(wtInjectData[rule.key].ctStatusCodeFn.substring(4)) : wtInjectData[rule.key].ctStatusCodeFn;
					}
					
			        if($(idlikeElem).ctIsModal == "true")
			        	Event.observe($(idlikeElem), 'click', handleModalClick);
			        else
			        	Event.observe($(idlikeElem), 'click', handleNonModalClick);
				}					
			});
		}
	});
}


//apply rules anchor tags
function addQSDataToWebTrendTags() {
	$$('a').each(function(tag) {
		if (tag.href.indexOf("#") > -1)
			return;
		
		$H(wtQSData).each(function(rule) {
			if (tag.href.indexOf(rule.key) > -1 || (rule.key.startsWith("ID:") && rule.key.substring(3) == tag.id)) { //RedHat B2C-47833, 03/08/10
				
				if((requestURI == "/dsl/shop/plansShared.jsp" || requestURI == "/dsl/shop/plansDirect.jsp") && (tag.href.indexOf("/dsl/shop/plansUpgrade.jsp") > -1)) {
					rule.value = "Existing_DSL";
				}
				
				tag.href += ((tag.href.indexOf("?") > -1) ? "&" : "?") + "wtLinkName=" + rule.value;				
	            linkLocation = findLinkLocation(tag);
	            if (linkLocation != "0") {
	                tag.href += "&wtLinkLocation=" + linkLocation;
	            }
	            var link = tag.href.split("?")[0];
	            
	            if(wtDupLinks[link]) {
	            	wtDupLinks[link].tags.push(tag);
	            } else {
	            	wtDupLinks[link] = new wtDupLink(tag);
	            }			
			}
		});
	});		
}



function addQSDataToWebTrendTagsDRockSpecific() {
	$$('a').each(function(tag) {
		
		//A) tab links on plan detail pages shouldn't get numbers
		if (tag.href.indexOf("#") > -1)
			return;
		
		//B) plansShared.jsp link 
        if (tag.href.indexOf("/dsl/shop/plansShared.jsp") > -1) {
            var qStringName = "_DAV";
            if (querySt(tag.href, qStringName).toLowerCase() == "true") {
            	tag.href += (tag.href.indexOf("?") > -1 ? "&" : "?") + "wtLinkName=Add_Static_IP"; //  I do not want a Static IP link clicks
            } else if (querySt(tag.href, qStringName).toLowerCase() == "false") {
            	tag.href += (tag.href.indexOf("?") > -1 ? "&" : "?") + "wtLinkName=Add_Dynamic_IP";
            } else { 	
            	tag.href += (tag.href.indexOf("?") > -1 ? "&" : "?") + "wtLinkName=DSL_Add_To_Local";
            }
            
            linkLocation = findLinkLocation(tag);
            if (linkLocation != "0") {
            	tag.href += "&wtLinkLocation=" + linkLocation;
            }

            var link = tag.href.split("?")[0];
            if(wtDupLinks[link]) {
            	wtDupLinks[link].tags.push(tag);
            } else {
            	wtDupLinks[link] = new wtDupLink(tag);
            }			
		}
		
		//D) wtSlotClick from teamsite
		//Logic to remove ?wtSlotClick param from QS of javascript links from teamsite content.  This may not be needed
		//if we can get that group to remove the injection for the problem content - "upgrade" link on landing page
		if (tag.href.indexOf("javascript") > -1) {  
			if ((tag.href.indexOf("?wtSlotClick") > -1) || (tag.title.indexOf("Learn More") > -1)) {
				var wtSlotRemove = tag.href.substring(tag.href.indexOf("?wtSlotClick"), (tag.href.indexOf("?wtSlotClick") + 25));
				tag.href = tag.href.replace(wtSlotRemove, "");

				if (tag.href.indexOf("&") > -1) {
					tag.href = tag.href.replace("&","?");
				}
			}  
		}
		
		//E) This is being added because a new teamsite tile is appending webtrends tags and screwing up the popup. 		
		if (tag.href == "javascript:popupBTNModal_or_redirect('existing');?WT.svl=calltoaction")
			tag.href = "javascript:popupBTNModal_or_redirect('existing');"
	});		
}

function addLinkCountsForWebTrends() {
	for (var link in wtDupLinks) {
		if(wtDupLinks[link].tags && wtDupLinks[link].tags.length > 1) {
			for(var i = 0; i < wtDupLinks[link].tags.length; i++) {
				wtDupLinks[link].tags[i].href += "&WT.svl[" + (i+1) + "]";
			}
		}
	}
}


function addOnclickToWebTrendTags() {
	//for each 'rule' defined in 'wtInjectData' JSON		
	$H(wtInjectData).each(function(rule) {
		var uri = wtInjectData[rule.key].uri;
		//if the current page we are on (not a link) matches the rule defined in JSON, or global rule
		if(uri == requestURI || uri == "*") {
			//for each anchor 'tag' in the current page
			$$('a').each(function(tag) {
				//see if the current 'tag' matches the rule requirements for the current 'uri'
				var idlikeMatches = "unchecked", hreflikeMatches = "unchecked";
				if(wtInjectData[rule.key].idlike) {
					if(idlikeMatches == "unchecked")
						idlikeMatches = false;
					$A(wtInjectData[rule.key].idlike).each(function(idlikeElem) {
						if(tag.id.indexOf(idlikeElem) > -1 || idlikeElem == "*")
							idlikeMatches = true;
					});
				}
				if(wtInjectData[rule.key].hreflike) {
					if(hreflikeMatches == "unchecked")
						hreflikeMatches = false;
					$A(wtInjectData[rule.key].hreflike).each(function(hreflikeElem) {
						if(tag.toString().indexOf(hreflikeElem) > -1 || hreflikeElem == "*")
							hreflikeMatches = true;
					});
				}
				if(    (idlikeMatches == true		  && hreflikeMatches == true)
					|| (idlikeMatches == true		  && hreflikeMatches == "unchecked") 
					|| (idlikeMatches == "unchecked"  && hreflikeMatches == true)) 
				{
				    tag.ctdcsref 		= wtInjectData[rule.key].ctdcsref.startsWith("[js]") ? eval(wtInjectData[rule.key].ctdcsref.substring(4)) : wtInjectData[rule.key].ctdcsref;
					tag.ctdcsuri 		= wtInjectData[rule.key].ctdcsuri.startsWith("[js]") ? eval(wtInjectData[rule.key].ctdcsuri.substring(4)) : wtInjectData[rule.key].ctdcsuri;
					tag.ctPN 			= wtInjectData[rule.key].ctPN.startsWith("[js]") ? eval(wtInjectData[rule.key].ctPN.substring(4)) : wtInjectData[rule.key].ctPN;
					tag.ctIsModal 		= wtInjectData[rule.key].ctIsModal.startsWith("[js]") ? eval(wtInjectData[rule.key].ctIsModal.substring(4)) : wtInjectData[rule.key].ctIsModal;
				    tag.ctEvent 		= wtInjectData[rule.key].ctEvent.startsWith("[js]") ? eval(wtInjectData[rule.key].ctEvent.substring(4)) : wtInjectData[rule.key].ctEvent;
			        tag.ctFormSubmit 	= wtInjectData[rule.key].ctFormSubmit.startsWith("[js]") ? eval(wtInjectData[rule.key].ctFormSubmit.substring(4)) : wtInjectData[rule.key].ctFormSubmit;			        
			        if(wtInjectData[rule.key].ctNoHit != undefined)
			        	tag.ctNoHit 	= wtInjectData[rule.key].ctNoHit.startsWith("[js]") ? eval(wtInjectData[rule.key].ctNoHit.substring(4)) : wtInjectData[rule.key].ctNoHit;
			        
			        if(wtInjectData[rule.key].buyFlowType != undefined)
			        	tag.buyFlowType	= wtInjectData[rule.key].buyFlowType.startsWith("[js]") ? eval(wtInjectData[rule.key].buyFlowType.substring(4)) : wtInjectData[rule.key].buyFlowType;
			        	
			        	
			        if(wtInjectData[rule.key].ctStatusCodeFn != null)
			        	tag.ctStatusCodeFn	= wtInjectData[rule.key].ctStatusCodeFn.startsWith("[js]") ? eval(wtInjectData[rule.key].ctStatusCodeFn.substring(4)) : wtInjectData[rule.key].ctStatusCodeFn;
			        
			        	
			        if(tag.ctIsModal == "true")
			        	Event.observe(tag, 'click', handleModalClick);
			        else
			        	Event.observe(tag, 'click', handleNonModalClick);
				}
			});
		}
	});		
}

function removeLiveChatNoThanks() {
	try { //remove the wtUserResp value after a user clicks 'no thanks' on live chat popup
		
		
		document.observe('click', function (e) {
			//alert(e.element().id);
			
			if(e.element().id.indexOf("need_") == 0 ) {
				//alert(window.location.hostname);
				
				DCS['dcssip']				 = window.location.hostname;
				DCS['dcsuri']				 = '';
				DCS['dcsref']				 = '';
				DCSext['wtUserResp'] 		 = '';
				DCSext['wtEventSuccessFlag'] = '';
			}
			if(	e.element().id.indexOf("updateCartImg") == 0) {
				DCS['dcssip']				 = '';
			}
			
			
		});
	} catch(ex) {
		
		//alert(ex);
	}
}
function removeOneTimeOnLoadReportingData() {
	try {
		commonFunc.deleteCookie("dsl_webtrend");
		DCSext['wtEvent'] 							= '';
		DCSext['wtFormSubmit'] 						= '';
		DCSext['wtStatusCode'] 						= '';
		DCSext['wtSuccessFlag'] 					= '';
		DCSext['wtQualCriteria']					= '';
		DCSext['wtServiceAvailResult']				= '';
		DCSext['wtSysRespCode']						= '';
		DCSext['wtSysTransID']						= '';
		DCSext['wtUserResp']						= '';
		DCSext['wtPaymentType']						= '';
		DCSext['wtELUID']							= '';
		DCSext['wtDwellingType']					= '';
		DCSext['wtAddressID']						= '';
		
		DCSext['wtNoHit'] 							= '';
		DCSext['wtSlotContent'] 					= '';
		DCSext['wtAddSKUQty']   					= '';
		DCSext['buyFlowType']						= '';
		
		DCS['dcsqry']								= '';
		DCSext['wtPN'] 								= '';
		DCS['dcsref']								= '';
		DCS['dcssip']				 				= '';
		WT['ti'] 									= '';
		
		wtQualCriteria 								= '';
		wtServiceAvailResult 						= '';

		
		var meta = document.getElementsByTagName("meta");		
		for(i = 0; i < meta.length; i++){
			if(meta[i].getAttribute("name") == 'DCSext.wtQualCriteria' || meta[i].getAttribute("name") == 'DCSext.wtServiceAvailResult') {
				meta[i].setAttribute("content", "");
			}
		}
		if($('upgradeFlowZipForConfPage'))
			$('upgradeFlowZipForConfPage').value = wtZipCode;
	} catch(ex) {}
}

function removeWTEventsOnModalClose() {
	try {
		DCS['wtEvent'] 	= '';
		DCSext['wtEvent'] 	= '';
	} catch(ex) {}
}

function handleDslChatTimeout() {
	try {
			
			//alert('Inside handleDslChatTimeout !!!');
		
			DCS['dcssip']				 = '';
			DCS['dcsuri']				 = '';
			DCS['dcsref']				 = '';
			
			DCSext['wtUserResp'] 		 = '';			
			DCSext['wtUserResponse'] 	 = '';
			DCSext['wtChatID'] 		 	 = ''; 
			DCSext['wtChatType'] 		 = ''; 
			DCSext['wtChatVendor'] 		 = ''; 
			DCSext['wtNoHit'] 		 	 = ''; 
			DCSext['wtStatusCode'] 		 = ''; 
			DCSext['wtPN'] 		 		 = ''; 
			DCSext['wtFlowCode'] 	 	 = '';
			
			DCSext['wtEventSuccessFlag'] = '';
			
	
			DCSext['wtSlotContent'] 	= '';
			DCSext['wtAddSKUQty']   	= '';
			DCSext['buyFlowType']		= '';		
			
			DCSext['wtChatID'] 		 	= ''; 
			DCSext['wtChatType'] 		= ''; 
			DCSext['wtChatVendor'] 		= ''; 		 
			DCSext['wtStatusCode'] 		= ''; 		 
			DCSext['wtSuccessFlag'] 	= '';
				
		
		
	    } 
	  catch(ex) {}
}
