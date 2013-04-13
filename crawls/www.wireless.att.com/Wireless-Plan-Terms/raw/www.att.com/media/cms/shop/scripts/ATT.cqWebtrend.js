//$Revision$, $Date$ and $Author$
/*jslint bitwise: false, eqeqeq: false, plusplus:false, newcap: true, nomen:true, onevar: true, regexp: false, white: false, plusplus: false */
/*global window $ jQuery ATT reporting_ready*/


/*
 * Webtrend selectors for HR2.0
* @method cqWebtrend
* @param object {}
* @return {Object} nothing
* @example
*/
ATT.namespace('cqWebtrend');

ATT.cqWebtrend = new function ($, doc) {
    var $cqclickid, filterdata, sku, wtSkuPrice,
        wtSkuQty, filterevent, wtPaperlessbillopt, servQty, planPrice, servPrice, planQty, href = doc.location.href, actualpath,
        cartId = "",
        wtargs, evt,
        wtMIRInd = $('.mir').val() ? "Y" : "N", existingId,
        wtzip  , wtcartstate, buyflowType, wtcartcontent ,
        commonLogs = [], contextarr = ["#deviceLayout,.navigation,#cart-preview-container,#helpMeChoose "],
        context = contextarr.join(''),       
        addArrItems = function(arr){
      	   if(ATT.type(arr) !== 'array'){
      		   return;
      	   }
      	   
  	    	var i = arr.length ,sum = 0;   
  	    	arr  = ATT.util.filter(arr, function(n) { return n;});
  	    	   
  	    	while(i--){
  	    	   sum+=arr[i];
  	    	}
  	
  	    	return sum;
      	},
		ecParams = function(wtargs) {
			var wtSLID = $('meta[name="DCSext.wtSLID"]'), wtAcctNum = $('meta[name="DCSext.wtAcctNum"]'), wtCTN = $('meta[name="DCSext.wtCTN"]');
			if (wtSLID.length === 1) {
				wtargs.push('DCSext.wtSLID');
				wtargs.push(wtSLID.attr('content'));
			}
			if (wtAcctNum.length === 1) {
				wtargs.push('DCSext.wtAcctNum');
				wtargs.push(wtAcctNum.attr('content'));
			} else if (wtCTN.length == 1) {
				wtargs.push('DCSext.wtCTN');
				wtargs.push(wtCTN.attr('content'));
			}
			return wtargs;
		},
        eventCheck = (function () {
            var href = location.href, evt , filterevent, wt, 
            	wtcartcontent = function (){
            		if (!!ATT.globalVars.cartContents && !!ATT.globalVars.cartContents.wtCartContents) {
            			wt = ATT.globalVars.cartContents.wtCartContents;
                    } else if(ATT.util.getCookie('wtContents') && ATT.util.getCookie('wtContents') != "undefined"){
	                	wt = ATT.util.getCookie('wtContents');
	                } else {
	                    wt = "";
	                }
            		return wt;
            	};
			
            if (~href.indexOf('/devices/') || ~href.indexOf('/addaline')) {
                filterevent = "HRock_DeviceListFilter_Click";
                evt = "HRock_DeviceListView_Click";
            }
            if (~href.indexOf('/services/')) {
                filterevent = 'HRock_ServiceListFilter_Click';
            }
            if (~href.indexOf('/accessories/')) {
                filterevent = 'HRock_AccessoryListFilter_Click';
                evt = "HRock_AccessoryListView_Click";
            }
            if (~href.indexOf('/plans')) {
                filterevent = 'HRock_PlanListFilter_Click';
                evt = "HRock_PlanListView_Click";
            }
            if (~href.indexOf('/packageslist')) {
                filterevent = 'HRock_PackageListFilter_Click';
                evt = "HRock_PackageListView_Click";
            }
            
            

            if (ATT.globalVars.cartContents && ATT.globalVars.cartContents.cartId) {
                cartId = ATT.globalVars.cartContents.cartId;
            } else {
                cartId = "";
            }

            wtcartstate = ATT.globalVars.wtCartState;


            return{
                evt:evt,
                filterevent:filterevent,
                wtcartcontent:wtcartcontent,
                cartId:cartId,
                wtcartstate:wtcartstate
            };

        }()),            
       
        cbEvents = {
            cqClick:function (e) {
                var clickid = this.getAttribute("data-cqpath"), $target = $(e.target), src = e.target.getAttribute("src"), 
                    helem = $target.attr('href'), i, $this = $(this), loc,
                    pageSection = { Marquee_:"#marquee", PriceBlock_:'.priceblock', Carousel_: '.carouselWrapper', MarqueeTile_:'.marqueeTile', LinkFarm_Col_: '.linkFarmCol', ServiceBar_: '.serviceItem', 
                					GlobalFooter: '#footer', LeftRail_:'.left-rail,#left-body', RightRail_:'.right-rail',ShoppingAssistant_:'#shoppingassistant', WirelessTile_:'.wirelessvalueTile',
                					Body:'#primary-content,#tabsLinks, #right-body', PageHeaderBand:'#underNav', BasicValueTile_:'.basicvalueTile', LeadGenerationBar:'#stayConnectedID',
                					SecondaryContent_:'#secondary-content'};
                // if target element has data-preventWtCQClickHit="true" then no wtCqClickId will be generated.
				if ($target.data('preventWtCQClickHit')==true) return;
                if ($target.data('linkLoc')) { // if data-linkLoc is specified on anchor this will override the default loc.  Only do this per EDD requirement.
                       loc = $target.data('linkLoc').replace(" ",'');
				} else {
				for(i in pageSection){
                	if ($this.parents(pageSection[i]).length) {
                		loc = i.replace(/_$/, '_' + ($(pageSection[i]).index($(this).parents(pageSection[i]))+1)) || '';
                	}
                }
                }
                if(!loc){loc = "unknownLoc";}
                if(/^#tab/.test(helem)){
                    ATT.log('inside:'+ helem +'~~'+$target.text());
                    clickid = clickid + '~~'+loc+ $.trim($target.text());
                 }else{
					if($target.data('linkName')) {
						clickid = clickid + '~~'+loc+ $target.data('linkName').replace(" ",'');
					} else {
                	 clickid = clickid ? clickid + '~~'+loc : '';
                 }
                }
                
                wtargs = ['DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCustType', 'Consumer'];
                

					wtargs.push('DCSext.wtCQClickId');
					wtargs.push(clickid);

                
                if($target.data('dcsuri')) { 
                    wtargs.push('DCS.dcsuri');
                    wtargs.push($target.data('dcsuri'));
				}
				
				if($target.data('dcsuri')) { 
					wtargs.push('DCS.dcsuri');
					wtargs.push($target.data('dcsuri'));
				}
				
                if(clickid || $target.data('linkName')){
                	window.dcsMultiTrack.apply(this, wtargs);
                }
                
                
            }

        };
        /**
		* This function will work only on checkout page which has options to change shipping methods
		*
		*/
		this.storeFulfillChangeInd = function () 
		{
			 if ( (!! window.localStorage.getItem("wtStoreFulfillChangeInd") && window.localStorage.getItem("wtStoreFulfillChangeInd") =="Y" ) || ATT.util.getCookie('wtStoreFulfillChangeInd') == "Y")
			 {
				 return "Y";
			 }
			 else
			 {
				 return "";
			 }
		}
		/****RTI WT tags on page load
        ?   wtEvent
        ?   wtSuccessFlag
        ?   wtStatusCode or wtStatusMsg
        ?   wtOOSSKU
        ?   wtOOSSKUCount
        ?   wtSKUCount
        ?   wtSLID (authenticated customers only)
        ?   wtBAN/wtCTN/wtBTN (authenticated customers only) 
		************/
		
		
		this.wtRTIOther = function wtRTIOther() {
			//var wtargs = ['DCSext.wtSuccessFlag', 1, 'DCSext.wtStatusCode', 0, 'DCSext.wtBAN', ATT.globalVars.ban];
			jQuery('<meta/>', {name: 'DCSext.wtSuccessFlag', content: 1}).appendTo('head');
			jQuery('<meta/>', {name: 'DCSext.wtStatusCode', content: 0}).appendTo('head');
			jQuery('<meta/>', {name: 'DCSext.wtBAN', content: ATT.globalVars.ban}).appendTo('head');
			
			var	r = (ATT.util.getCookie("colam_ctn") || ""),
            j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
            a=/^[0-9]*$/;
			if (j.uid !== undefined ) {
				var logintype = a.test(j.uid) ? "CTN" : "SLID";
				if (logintype === "CTN") {
					//wtargs.push('DCSext.wtCTN', j.uid);
					jQuery('<meta/>', {name: 'DCSext.wtCTN', content: j.uid}).appendTo('head');
				}else {
					//wtargs.push('DCSext.wtSLID', j.uid);
					jQuery('<meta/>', {name: 'DCSext.wtSLID', content: j.uid}).appendTo('head');
				}
			}
			
			//window.dcsMultiTrack.apply(this, wtargs);			
		} 
		
		/****RTI WT tags on page load/view/filter/showmore
        ?   wtOOSSKU
        ?   wtOOSSKUCount
        ?   wtSKUCount
		***************/

		this.wtRTISku = function wtRTISku() {
			var wtrti = ATT.cqWebtrend.wtSKUDetails();
			jQuery('<meta/>', {name: 'DCSext.wtOOSSKU', content: wtrti.oosSKU}).appendTo('head');
			jQuery('<meta/>', {name: 'DCSext.wtOOSSKUCount', content: wtrti.oosSKUCount}).appendTo('head');
			jQuery('<meta/>', {name: 'DCSext.wtSKUCount', content: wtrti.SKUCount}).appendTo('head');
			
		}
		this.wtSKUDetails = function wtRTISku() {
			var sku = [], i = jQuery('.outOfStockOpacity').length, m = jQuery('img[id*="image-sku"]').length, n = jQuery('div[id*="item_sku"]').length;
			var SKUCount = (m!=0) ? m : n;			
			var oos = (m!=0) ? jQuery('.outOfStockOpacity') : jQuery('.outOfStockOpacity').parents('div[id*="item_sku"]');
			while (i--) {
				sku[i] = (m!=0) ? jQuery(oos[i]).attr('id').split('-')[1] : jQuery(oos[i]).attr('id').split('_')[1] ;
			}
			var oosSKU = sku.join('|');
			var oosSKUCount = jQuery('.outOfStockOpacity').length;
			oosSKUCount = (oosSKUCount!=0) ? oosSKUCount :'0';
			
			return {
				oosSKU:oosSKU,
				oosSKUCount:oosSKUCount,
				SKUCount:SKUCount			
			};
		}
		this.delay = function(millis) {      
		    var dfd = jQuery.Deferred();      
		    setTimeout(function() {          
		        dfd.resolve();
            }, millis || 3000);
		    return dfd.promise();
		}
	
    //check to see if list pages add proper params
    $('div[class*=listPage-left-nav]').click(function (e){
       
       var r = $(e.target).parents('div[id*=navigation]').attr('id'), upper = (r==="navigation")?"Shared Plans":"Individual Plans", navselected = $.trim($(this).text()), combine = upper +'|'+navselected;
        wtargs = ['DCSext.wtFilterSelect', combine, 'DCSext.wtNoHit', 1,
            'DCSext.wtEvent', eventCheck.filterevent, 'DCSext.wtEventType', 'User',
            'DCSext.wtCart', eventCheck.cartId, 'DCSext.wtCartType', 'eCommerce', 'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtStatusCode', "0", 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            'DCSext.wtZipCode',ATT.globalVars.zip(), 'DCSext.wtCartState', eventCheck.wtcartstate,
            "DCSext.wtCustType", "consumer", 'DCSext.wtCQClickId', $cqclickid, 'DCSext.wtSuccessFlag', 1,
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtCustType", "consumer"];
        window.dcsMultiTrack.apply(this, wtargs);
    });

    //filters delegation
    $('body').delegate('.listFilterGroup', 'click', function () {
        var navselected = $('.listPage-left-nav-selected-top').text() ||
                          $('.listPage-left-nav-selected-middle').text() ||
                          $('.listPage-left-nav-selected-bottom').text();
        $cqclickid = $(this).data('cqpath');
        filterdata = $.trim(navselected) + '|' +
            $.trim($(this).closest("form").find('h3').text()) + "|" +
            $.trim($(this).closest("li").find("label").text());

        if (filterdata.charAt(0) === "|") {
            filterdata = filterdata.slice(1);
        }

        ATT.cqWebtrend.delay(4000).then(function() {
    		var wtrti = ATT.cqWebtrend.wtSKUDetails();
	        wtargs = ['DCSext.wtFilterSelect', filterdata, 'DCSext.wtNoHit', 1,
	                  'DCSext.wtEvent', eventCheck.filterevent, 'DCSext.wtEventType', 'User',
	                  'DCSext.wtCart', eventCheck.cartId, 'DCSext.wtCartType', 'eCommerce', 'DCSext.wtBAN', ATT.globalVars.ban,
	                  'DCSext.wtStatusCode', "0", 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
	                  'DCSext.wtZipCode',ATT.globalVars.zip(), 'DCSext.wtCartState', eventCheck.wtcartstate,
	                  "DCSext.wtCustType", "consumer", 'DCSext.wtCQClickId', $cqclickid, 'DCSext.wtSuccessFlag', 1,
	                  "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtCustType", "consumer",
	                  "DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
	        window.dcsMultiTrack.apply(this, wtargs);
    	});
    });
	
    // clear filters
    $('.clearFilter', '#content').bind('click', function () {
		ATT.cqWebtrend.delay(4000).then(function() {
    		var wtrti = ATT.cqWebtrend.wtSKUDetails();
			var wtclick = '/content/att/shop/en/wireless/devices/cellphones/jcr:content/filterparsys/clearall/clearallfilter';
			wtargs = ['DCSext.wtFilterSelect', "Clearfilter", 'DCSext.wtNoHit', 1,
				'DCSext.wtEvent', eventCheck.filterevent, 'DCSext.wtEventType', 'User',
				'DCSext.wtCart', eventCheck.cartId, 'DCSext.wtCartType', 'eCommerce',
				'DCSext.wtStatusCode', "0", 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
				'DCSext.wtZipCode',ATT.globalVars.zip(), 'DCSext.wtCartState', eventCheck.wtcartstate,
				"DCSext.wtCustType", "consumer", 'DCSext.wtCQClickId', wtclick, 'DCSext.wtSuccessFlag', 1,
				"DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtCustType", "consumer",
				"DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
			window.dcsMultiTrack.apply(this, wtargs);
		});
    });

/**************add to cart hook up********************************************************/

     
    $(doc).bind('CartSuccess CartConflict', function(e, d) {
    	if (!! d.data && !! d.data.wirelessAddToCartResultHolder) {
			var linesLen, losg, eventType = e.type, statusCode, statusFlag, lines,
				cartLine, errorCode, 
				losgInContext =  (ATT.globalVars.cartContents && ATT.globalVars.cartContents.losgInContext) ? ATT.globalVars.cartContents.losgInContext:null,
				data = ATT.globalVars.cartContents,		
				currentLine = function (){
					if(data && data.lob && data.lob.items){
						lines = data.lob.items;
						linesLen = lines.length;
						
						while(linesLen--){
							losg = lines[linesLen].id;
							if(losgInContext === losg){
								cartLine = lines[linesLen].displayName;
							}
						}
						
					}
					return cartLine;
				},
				origTarget = $(d.originatingOrder.originatingTarget)?$(d.originatingOrder.originatingTarget):'',
				addItems, len , sku,
				planList =/\/individualplans\.html|\/familyplans\.html|\/dataplans\.html|\/prepaidplans\.html/, 
				commonURL = /\/devices\/|\/voice\/|\/accessories\//,
				href = location.href,
				item = {
					sku:[],
					price:[],
					quantity:[]
				}, clickid, wtevent = 'HRock_Cart_Add_Submit';
			
			addItems = d.data.wirelessAddToCartResultHolder.addItems;
			errorCode = d.data.wirelessAddToCartResultHolder.rollUpErrorCode ? d.data.wirelessAddToCartResultHolder.rollUpErrorCode.split('.')[1] : "-2";
			statusCode = e.type === 'CartSuccess' ? '0' : errorCode;
			statusFlag = statusCode === '0' ? 1 : '0'; //ECOM1202-8735
			len = addItems.length;
			
			if(!addItems || !len || origTarget.attr('class')==="noThanks noThanksCart"){
				//skip and do nothing
			}else{
				if(commonURL.test(href)){
                    clickid = $('.addToCart img').data('cqpath') || $('.btn.addToCart').data('cqpath');
				}else if(~href.indexOf('/packages/')){
					clickid = $('.addPackageToCart img').data('cqpath');
				}else if(planList.test(href)){
					clickid = '/content/att/shop/wireless/planList/jcr:content';
				}else if(~href.indexOf('/services/')){
					clickid = '/content/att/shop/wireless/service/jcr:content';
				}else{
					clickid = "";
				}
				
				
				while(len--){
					item.quantity[len] = addItems[len].quantity;
					item.sku[len] = addItems[len].catalogRefId;
					item.price[len] = addItems[len].price?addItems[len].price:"";
					
				}
				sku = ATT.util.unique(item.sku);
				var skuQty="";
				
				if(sku.length === 1){
					item.quantity = addArrItems(item.quantity);
					skuQty = sku+'~'+item.quantity;
					item.price = addArrItems(item.price).toFixed(2);
					
				}else{
					skuItemLen = item.sku.length; 
					var skuMap ={};
					while(skuItemLen--){
						if(skuMap.hasOwnProperty(item.sku[skuItemLen])){
							skuMap[item.sku[skuItemLen]]=skuMap[item.sku[skuItemLen]]+1;
						}else{
							skuMap[item.sku[skuItemLen]]=1;
						}
					}
					for(var skuKey in skuMap){
						if(skuQty!=""){
							skuQty = skuQty+'|'+skuKey +'~'+skuMap[skuKey];
						}else{
							skuQty = skuKey +'~'+skuMap[skuKey];
						}
					}
					item.price = item.price.join('|');
				}
				if(!item.price){
					item.price =origTarget.parent('.cartItem').find('div[id*=DueToday]').text() ? $.trim(origTarget.parent('.cartItem').find('div[id*=DueToday]').text()) : '';
				}
				if ($('#modalConflictContinue:visible').length == 1) wtevent = 'HRock_Cart_Conflict_Add_Submit';
				wtargs = ['DCSext.wtEvent', wtevent, "DCSext.wtSkuPrice", item.price, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
							"DCSext.wtSkuQty", skuQty, "DCSext.wtMIRInd", wtMIRInd, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip(),"DCSext.wtCartLine", currentLine(),
							'DCSext.wtEventType', 'User', 'DCSext.wtStatusCode',statusCode, 'DCSext.wtSuccessFlag', statusFlag, 'DCSext.wtBAN', ATT.globalVars.ban,
                            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", 'DCSext.wtCartState', ATT.globalVars.wtCartState,
							"DCSext.wtCartContents", eventCheck.wtcartcontent(), 'DCSext.wtCQClickId', clickid, 'DCSext.wtCartId', eventCheck.cartId];
				extraParams = origTarget.data('extra-params') || origTarget.data('extraParams') || "";
				// check for change in fulfillment method
				if ((extraParams.indexOf('changeToDirectFulfillment') > -1 && ATT.globalVars.cartContents.cartFulfillMethod == 'Store')) {
					wtargs.push('DCSext.wtStoreFulfillChangeInd','Y');
					wtargs.push('DCSext.wtCartFulfillMethod','Direct');
				} else if (origTarget.data('selectedStorePickupDetails')) {
					// check for changes in store related wtparams for BOPIS fulfillment
					wtargs.push('DCSext.wtCartFulfillMethod','Store');
					wtargs.push('DCSext.wtStorePickupDetails',origTarget.data('selectedStorePickupDetails'));
					oldStoreDetails = ATT.globalVars.cartContents.storePickupDetails.split('~');
					if (ATT.globalVars.cartContents.storePickupDetails && origTarget.data('storeId') && (origTarget.data('storeId') != oldStoreDetails[0])) {
						wtargs.push('DCSext.wtStoreChangeInd','Y');
						wtargs.push('DCSext.wtPrevStorePickupDetails',ATT.globalVars.cartContents.storePickupDetails);
					}
					storePos = (origTarget.data('storePositionNum') === 0) ? "0":origTarget.data('storePositionNum');
					if (origTarget.data('storePositionNum') || origTarget.data('storePositionNum') === 0) {
						wtargs.push('DCSext.wtStorePositionNum',storePos);
						if ($('#radioAll:checked').length == 1) {
							wtargs.push('DCSext.wtStoreViewFlag','0');
						} else {
							wtargs.push('DCSext.wtStoreViewFlag','1');
						}
						if (typeof ATT.sliBopis.currentPageNum() != 'undefined') {
							wtargs.push('DCSext.wtPageNum',ATT.sliBopis.currentPageNum());
							wtargs.push("DCS.dcsuri","/shop/virtual/storeresults"+ATT.sliBopis.currentPageNum()+".html");
						}
					}
				} else if (extraParams.indexOf('changeToDirectFulfillment') > -1 || extraParams.indexOf('storePickUpLocation') > -1) {
					wtargs.push("DCSext.wtStorePickupDetails",ATT.globalVars.cartContents.storePickupDetails);
				}
				wtargs.push("DCSext.wtCartFulfillMethod",ATT.globalVars.cartContents.cartFulfillMethod);
				window.dcsMultiTrack.apply(this, ecParams(wtargs));
			}
		} else {return;}
    });



    /***************  ATC hook up end ******************************************/

    //cart add upsell
    $("#cart").delegate(".addToCart", "click", function () {
        var clickid = $(this).data("cqpath"),
            itemsku = $(this).closest(".cartItem").data("sku"),
            targettxt = $(this).parent().prev().text(),
            qtySku = itemsku + "~1",
            price = "$" + targettxt.split("$")[1];
    
        wtargs = ['DCSext.wtEvent', 'HRock_Cart_Add_Submit', "DCSext.wtSkuPrice", price, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            "DCSext.wtSkuQty", qtySku, "DCSext.wtMIRInd", wtMIRInd, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip(),
            'DCSext.wtEventType', 'User', 'DCSext.wtStatusCode', "0", 'DCSext.wtSuccessFlag', 1, 'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", 'DCSext.wtCartState', eventCheck.wtcartstate,
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), 'DCSext.wtCQClickId', clickid, 'DCSext.wtCartId', eventCheck.cartId,"DCSext.wtCartFulfillMethod",ATT.globalVars.cartContents.cartFulfillMethod];

        window.dcsMultiTrack.apply(this, wtargs);
        


    });
	
    //dropdown shorting
    $("#priceDropDown").bind('change', function () {

        var viewmodifier = $(this).find('option:selected').text(), evt = eventCheck.evt;

        if (viewmodifier === "Sort by" && $("#viewGridIconSelected").css('display') === "block") {
            viewmodifier = "Grid";
        } else if (viewmodifier === "Sort by" && $("#viewLineIconSelected").css('display') === "block") {
            viewmodifier = "List";
        } else {
            viewmodifier = viewmodifier;
        }
        actualpath = $(this).data('cqpath');
		
		ATT.cqWebtrend.delay(4000).then(function() {
    		var wtrti = ATT.cqWebtrend.wtSKUDetails();
			wtargs = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1, 'DCSext.wtBAN', ATT.globalVars.ban,
				'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
				'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
				"DCSext.wtViewModifier", viewmodifier, "DCSext.wtCQClickId", actualpath,
				"DCSext.wtCartId", eventCheck.cartId, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer",
				"DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(),
				"DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
			window.dcsMultiTrack.apply(this, wtargs);
		});
    });

    // event hook for colorbox complete loading
    $(doc).bind('cbox_complete', function () {
        var mname, wtargs1, modalinit, modalname, modaltitle, modaldcs, flag = true, wtSku, sku, skuPrice, clickid, v_qtyAllow;
        //modalinit = $(".modalHeader").attr("title") || $(".modalHeader h1").attr('title') || $($(".modalHeader")[1]).attr("title");
        modalinit = $('.modalHeader:isvisible').find('[title]').attr('title') ? $('.modalHeader:isvisible').find('[title]').attr('title') : $('.modalHeader:isvisible').attr('title') ? $('.modalHeader:isvisible').attr('title') : $('.modalHeader:isvisible').find('h1').text().replace(/,/g,'').replace(/ /g,'').toLowerCase();
        modalname = modalinit ? modalinit : "session";
        modaltitle = "HRock_" + modalname + "_Pg";
        modaldcs = "/wireless/virtual/" + modalname + ".html";
        wtargs1 = ['DCS.dcsref',location.pathname,'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtCustType", "consumer"];

        if(modalinit === "customerType"){
        	sku = $('div[data-sku]').data('sku') ? $('div[data-sku]').data('sku') : "";
        	
        	v_qtyAllow = jQuery('#qtyAllow').val();
        	
    		if (typeof v_qtyAllow == "undefined") {
    			v_qtyAllow = 1;
    		}
    		sku=sku + '~'+v_qtyAllow;

    		skuPrice = $('div[id*=Today]:isvisible').attr('price') ? $('div[id*=Today]:isvisible').attr('price') : "";
        	clickid = $('img[title^=Add]').data('cqpath') ? $('img[title^=Add]').data('cqpath') : "";

        	wtargs = ['DCSext.wtEvent', 'HRock_Cart_Add_Submit', "DCSext.wtSkuPrice", skuPrice, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
						"DCSext.wtSkuQty", sku, "DCSext.wtMIRInd", wtMIRInd, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip(),
						'DCSext.wtEventType', 'User', 'DCSext.wtStatusCode', -2 , 'DCSext.wtSuccessFlag', -2, 'DCSext.wtBAN', ATT.globalVars.ban,
						'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", 'DCSext.wtCartState', eventCheck.wtcartstate,
                        "DCSext.wtCartContents", eventCheck.wtcartcontent(), 'DCSext.wtCQClickId', clickid, 'DCSext.wtCartId', eventCheck.cartId,"DCSext.wtCartFulfillMethod",ATT.globalVars.cartContents.cartFulfillMethod];
			
				
            window.dcsMultiTrack.apply(this, wtargs);
        }
		
		if  (modalinit === 'StoreSearch') {
			// var skuId = $('#inStoreAvailability').data('sku');
			// var v_language = (window.location.pathname.match(/\/es\//)) ? 'Spanish' : 'English';
			//var wtargs = ['DCSext.wtSku', skuId, 'DCSext.wtLanguage', v_language, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
			// 	'DCSext.wtZipCode', ATT.globalVars.zip(), 'DCSext.wtCustType', 'consumer', 'DCSext.wtPN', modaltitle];
			// window.dcsMultiTrack.apply(this, wtargs);
			return true;
		}

        //empty cart
        $('#continue-btn', '#empty-cart-interstitial').bind('mousedown', function () {
            var wtclick = $(this).data('cqpath');
            wtargs = ['DCS.dcsuri', '/shop/cart/emptycart.html', 'DCSext.wtEvent', 'HRock_Cart_EmptyCart_Submit', 'DCSext.wtNoHit', 1,
                'DCSext.wtStatusCode', "0", 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
                'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", 'DCSext.wtBAN', ATT.globalVars.ban,
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, "DCSext.wtCartContents", eventCheck.wtcartcontent(),
                'DCSext.wtCQClickId', wtclick, "DCSext.wtZipCode",ATT.globalVars.zip()];
            window.dcsMultiTrack.apply(this, wtargs);
        });

		 //ar5204: customertype modal -- Get Started 
		jQuery(doc).bind('cbox_complete', function() {  
			jQuery('#continue', '#addaline', '#upgrades').live('click', function () { 
				var wtclick = jQuery(this).data('cqpath');
		  
				wtargs = ['DCS.dcsuri', '/content/att/shop/en/wireless/modals/shopmodals/jcr:content/mainpar/customertype', 'DCSext.wtEvent', 'HRock_Cust_BuyFlowType_Submit',
                'DCSext.wtStatusCode', "0", 'DCSext.wtSuccessFlag', 1,  "DCSext.wtCustType", "consumer",
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtCQClickId', wtclick];
            window.dcsMultiTrack.apply(this, wtargs);
				//return false; 
        });
		}); 
		
        //cancel
        $("#cancel", "#colorbox").bind('click', function (e) {
            var wtclick = $(this).data('cqpath'),
                cartIdck = $("#use-email-address").parent().hasClass('checked'),
                idmethod = cartIdck ? "email" : "TNplusName",
                evt = wtclick.match(/savecart.*/) ? "HRock_Cart_SaveCart_Submit" : (wtclick.match(/retrievecart.*/) ? "HRock_Cart_RetrieveCart_Submit" : "HRock_Cart_EmptyCart_Submit"),

                wtargscl = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1, 'DCSext.wtStatusCode', -1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
                    'DCSext.wtSuccessFlag', -1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban, 'DCSext.wtCartIdMethod', idmethod,
                    "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtCartId", eventCheck.cartId, "DCSext.wtCQClickId", wtclick,
                    'DCSext.wtCartType', 'eCommerce', "DCSext.wtZipCode",ATT.globalVars.zip()];

            if (evt === "HRock_Cart_SaveCart_Submit") {
                wtargscl.push('DCS.dcsuri', '/shop/cart/save-cart-details.html');
            }
            if (evt === "HRock_Cart_SetrieveCart_Submit") {
                wtargscl.push('DCS.dcsuri', '/shop/cart/retrievecart.html');
            }
            if (evt === "HRock_Cart_EmptyCart_Submit") {
                wtargscl.push('DCS.dcsuri', '/shop/cart/emptycart.html');
            }

            window.dcsMultiTrack.apply(this, wtargscl);
        });

        //LNP eligibility
      
        $(doc).bind('LNPEvent', function (e) {
        	
        	
        		
	            var wtclick = '/content/att/shop/en/checkout/phone-eligibility/jcr:content/lpn',
	                $invalidMsg = $('.invalidmsg'), i, n = $invalidMsg.length, 
	                arr1, arr2, statusMsg, successflag, status, $noentry = jQuery('.formErrorMessage'),
	                $invalidnumber = $('.invalidnumber'), j = $invalidnumber.length, lnpEligibility, 
	                $validnumber = $('.validnumber'), k, l = $validnumber.length, validcontainer = [], invalidmsgcontainer = null;
	            
	            for(i=0 ; i < n; i++){
	            	if (invalidmsgcontainer === null) { invalidmsgcontainer = []; }
	            	invalidmsgcontainer[i] = 'N~'+ $.trim($($invalidMsg[i]).text());
	            }
	            for(k=0; k < l; k++){
	            	validcontainer[k] =  'Y';
	            	//validcontainer[k] =  'Y~'+ $($validnumber[k]).text();
	            }
	            
	            arr1 = ATT.util.filter(invalidmsgcontainer, function(n){return n;});
	            arr2 = ATT.util.filter(validcontainer, function (n) {return n;});
	            lnpEligibility = $noentry.length ? 'N~'+$.trim($noentry.text()) : arr1.concat(arr2).join('|');
	            lnpEligibility = $.isArray(lnpEligibility) ? lnpEligibility : $.makeArray(lnpEligibility);
	            
	            /*if(lnpEligibility[0] === 'Y'){
                    status = '0';
               }else if(lnpEligibility.length){
                   status ='';
                }else{
                    status = '';
               } */
	            
	            status = lnpEligibility[0]==='Y' ? '0' : lnpEligibility.length ? '' : '0' ;
	            statusMsg = status === '0' ? '' : lnpEligibility.join('|').split('N~').join('');
	            successflag =  status==='0' ? 1 : '0'; 
	            
	            
	            wtargs = ['DCSext.wtEvent', 'HRock_LNP_Eligibility_Submit',
	                'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusMsg', statusMsg,
	                'DCSext.wtStatusCode', status, 'DCSext.wtSuccessFlag', successflag, 'DCSext.wtCartState', eventCheck.wtcartstate,
	                'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),
	                "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', wtclick, 'DCSext.wtLNPEligibility', lnpEligibility, 'DCSext.wtBAN', ATT.globalVars.ban];
	
	            window.dcsMultiTrack.apply(this, wtargs);
        	

        });
  
        
        //zipcode submit
        $("form#zipCodeEntryForm").live("submit", function () {
            var clickid = "/content/att/shop/en/zipcode/jcr:content/zipcode";

            wtargs = ['DCSext.wtEvent', 'HRock_ZipCode_Submit',
                'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
                'DCSext.wtStatusCode', "0", 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
                'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),
                "DCSext.wtZipCode", (ATT.globalVars.zip() || $("#zipCodeEntry").val()), 'DCSext.wtCQClickId', clickid];

            window.dcsMultiTrack.apply(this, wtargs);

        });

        /************* account selection hook up *************************/
            //TODO setup the account selection ,input[name*=AccountSelectionFormHandler]", "form[action*=accountselection]
        /*$("#acctSelContinue").bind("mousedown", function () {

            var clickid = "/content/att/login/jcr:content/login",
                r = (ATT.util.getCookie("colam_ctn") || ""), //null not acceptable return value 
                j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
                wtslid = j.uid;

            wtargs = ['DCSext.wtEvent', "HRock_Acct_Selection_Submit", 'DCSext.wtNoHit', 1,
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
                'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, "DCSext.wtSLID", wtslid,
                "DCSext.wtCQClickId", clickid, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer",
                "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip()];

            window.dcsMultiTrack.apply(this, wtargs);

        });*/

        /*********** account selection end ***************************/
        //wtargs1.push('DCS.dcsref', location.path);
        if (modalname === "bopisConflict") {
			wtargs1.push('DCS.dcsuri', '/shop/cart/bopisconflict.html');
			wtargs1.push('DCSext.wtCQClickId', $('#bopis-conflict-interstitial').data('cqpath'));
		}
        if (modalname === "emptyCart") {
            wtargs1.push('DCS.dcsuri', '/shop/cart/emptycart.html');
        }
        else if (modalname === "savecartModal") {
            wtargs1.push('DCS.dcsuri', '/shop/cart/save-cart-details.html');
        }
        else if (modalname === "ATT_Print") {
            wtargs1.push('DCS.dcsuri', '/print/attprintmodal.html');
        }
        else if (modalname === "save_cart_thanks") {
            wtargs1.push('DCS.dcsuri', 'shop/cart/save-cart-thanks.html');
        }
        else if (modalname === "PIMModal") {
            wtSku = ATT.globalVars.flattenCartContents.lob_items_0_parts_device_item_sku + "~1";
            wtargs1.push("DCSext.wtSku", wtSku);
        }
        else {
            wtargs1.push('DCS.dcsuri', modaldcs);
        }
        if (flag) {
        	if (ATT.DCSSignals) {
	        	$.when(ATT.DCSSignals.dcs_ready_promise).then(function(){
	        		window.dcsMultiTrack.apply(this, wtargs1);
	        	});
        	} else { window.dcsMultiTrack.apply(this, wtargs1); }
            flag = false;
        }
    });

    /*********************cbox_complete end************************************/

    /******************* Grid/list views *************************************/

    $('img[src*=view-list-deselected]').bind('click', function () {
        var viewmodifier, evt = eventCheck.evt, r = $("#priceDropDown").find('option');

        viewmodifier = $("#priceDropDown").find('option:selected').text();
        if (viewmodifier === r[0].innerHTML) {
            viewmodifier = "List";
        } else {
            viewmodifier = viewmodifier;
        }

		ATT.cqWebtrend.delay(4000).then(function() {
    		var wtrti = ATT.cqWebtrend.wtSKUDetails();
			wtargs = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1,
				'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
				'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban,
				"DCSext.wtViewModifier", viewmodifier, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "Consumer",
				"DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(),
				"DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
			window.dcsMultiTrack.apply(this, wtargs);
		});
    });


    $('img[src*=view-grid-deselected]').bind('click', function () {
        var viewmodifier = $("#priceDropDown").find('option:selected').text(), 
        	r = $("#priceDropDown").find('option'), evt = eventCheck.evt;
        
        if (viewmodifier === r[0].innerHTML) {
            viewmodifier = "Grid";
        } else {
            viewmodifier = viewmodifier;
        }

        ATT.cqWebtrend.delay(4000).then(function() {
    		var wtrti = ATT.cqWebtrend.wtSKUDetails();
			wtargs = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1,
				'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
				'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban,
				"DCSext.wtViewModifier", viewmodifier, 'DCSext.wtCartType', 'eCommerce',
				"DCSext.wtCustType", "Consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(),
				"DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
			window.dcsMultiTrack.apply(this, wtargs);
		});
    });

    /***************** grid/list view ends *****************************************************/

        //shopping cart page specific
    $('.line-details').delegate('.removeFromCartSummary', 'click', function () {
        var $this = $(this),
            $price = $.trim($($this.next("div")[0]).text()),
            sku = $this.parent().parent().data('sku') + "~1", wtargs,
            $wtClick = $this.data('cqpath');
        wtMIRInd = $('.mir').val() ? "Y" : "N";
        wtargs = ['DCSext.wtEvent', 'HRock_Cart_Remove_Submit', 'DCSext.wtNoHit', 1,
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
            'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtMIRInd', wtMIRInd, "DCSext.wtCartContents", eventCheck.wtcartcontent(),
            'DCSext.wtCQClickId', $wtClick, 'DCSext.wtCartType', 'eCommerce',
            "DCSext.wtSkuQty", sku, "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtCustType", "consumer"];
        window.dcsMultiTrack.apply(this, wtargs);
    });

    //save cart

	//retrieve cart
	$(doc).bind('SaveRetrieveCartReturned', function (e, resp) {

		if (resp.event == "HRock_Cart_RetrieveCart_Submit") {
			var wtclick = $('#retrieve-cart-btn').data('cqpath'),
                dcsuri = '/shop/cart/retrievecart.html',
				email = $('input[name*=email]').val(),
                phone = $('input[name*=telePhoneNumber]').val(),
                name = $('input[name*=firstName]').val(),
                TNplusName = phone + name,
                cartIdck = $("#use-email-address").parent().hasClass('checked'),
                cartId = cartIdck ? email : TNplusName,
                filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                phonere = /\d{10}/,
                namere = /^[a-zA-Z]+$/,
                idmethod = cartIdck ? "email" : "TNplusName",
                status = "0",
                success = 1;
		} else {
			wtclick = $('#save-cart-btn').data('cqpath');
			dcsuri = '/shop/cart/save-cart-details.html';
			
			cartId = $("#email-address").val();
			status = "0";
			success = 1;
			idmethod = "";
		}
		if (resp.items.length >= 1) {
			status = resp.items[0].errorMessageCode;
			success = "0";
		}
		wtargs = ['DCS.dcsuri', dcsuri, 
				  'DCSext.wtEvent', resp.event, 
				  'DCSext.wtSuccessFlag', success,
				  'DCSext.wtStatusCode', status,
				  "DCSext.wtCQClickId", wtclick,
				  "DCSext.wtCartId", cartId,
				  'DCSext.wtCartType', 'eCommerce',
				  'DCSext.wtCartState', resp.cartState,  
				  "DCSext.wtCartContents", resp.cartContents,
				  'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
				  'DCSext.wtCartIdMethod', idmethod,
				  'DCSext.wtCartFulfillMethod',resp.cartFulfillMethod,
				  'DCSext.wtStorePickupDetails',resp.storePickupDetails,
				  'DCSext.wtNoHit', 1,
				  "DCSext.wtZipCode",ATT.globalVars.zip()];

		window.dcsMultiTrack.apply(this, ecParams(wtargs));
	});

    //checkout
    $("#cart-container").delegate('#CheckoutForm', 'submit', function () {
        var qty, r = $("div[data-report]"),
            wtclick = jQuery("#checkout-btn-enabled-bottom").parent().attr('data-cqpath'),
            storeFulfillChangeInd= "" ,
            res = [], i = r.length, ind,
            shipping = ATT.globalVars.cartContents.orderTotals.shipping.method || "",
            monthlyAmt = ATT.globalVars.cartContents.orderTotals.final.mrcTotal || "0",
            total = ATT.globalVars.cartContents.orderTotals.final.dueToday || "0",
            onetimeamt = ATT.globalVars.cartContents.orderTotals.final.firstBill || "",
            promotioncode =  ATT.globalVars.cartContents.orderTotals.promotions,
            cartdiscount;
        	window.localStorage.removeItem("wtStoreFulfillChangeInd");
        	ATT.util.setCookie('wtStoreFulfillChangeInd',"");
            if(promotioncode && ((promotioncode.orderLevelCoupon && promotioncode.orderLevelCoupon.couponCode)  || (promotioncode.cartLevelCoupon && promotioncode.cartLevelCoupon.couponCode) ) ){
                cartdiscount = promotioncode.orderLevelCoupon ? promotioncode.orderLevelCoupon.couponCode : promotioncode.cartLevelCoupon.couponCode ? promotioncode.cartLevelCoupon.couponCode: "";
            } else {
                cartdiscount ="";
            }

        while (i--) {
            res[i] = $(r[i]).data('report') + "~1";
        }
        ind = res.join('|');
        wtargs = ['DCSext.wtEvent', 'HRock_Cart_Submit', 'DCSext.wtStatusCode', "0",
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            "DCSext.wtSkuQty", ind, "DCSext.wtShipping", shipping, 'DCSext.wtCartOneTimeAmt', onetimeamt, 'DCSext.wtCartMonthlyAmt', monthlyAmt,
            'DCSext.wtNoHit', 1, 'DCSext.wtCartTotalAmt', total, "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtCartId", eventCheck.cartId,
            'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtCartType', 'eCommerce',
            'DCSext.wtCartDiscounts', cartdiscount, 'DCSext.wtBAN', ATT.globalVars.ban,'DCSext.wtCQClickId',wtclick,'DCSext.wtStorePickupDetails',ATT.globalVars.cartContents.storePickupDetails
        ];
        
        var storePickupShippingMethod= jQuery('input[id*=storePickupShippingMethod]:checked').attr('value');

        if ((storePickupShippingMethod != 'storePickUp' && ATT.globalVars.cartContents.storePickupDetails.length > 0)) {
			
			
			wtargs.push('DCSext.wtStoreFulfillChangeInd','Y');
			wtargs.push('DCSext.wtCartFulfillMethod','Direct');
			wtargs.push('DCSext.wtStorePickupDetails',"");
			wtargs.push('DCSext.wtShipping',storePickupShippingMethod);
			window.localStorage.setItem("wtStoreFulfillChangeInd","Y");
			ATT.util.setCookie('wtStoreFulfillChangeInd',"Y");
			
        } else {
			if (storePickupShippingMethod == 'storePickUp') {
				wtargs.push('DCSext.wtCartFulfillMethod','Store');
			} else {
				wtargs.push('DCSext.wtCartFulfillMethod','Direct');
			}
		}
        window.dcsMultiTrack.apply(this, wtargs);

    });

    //compare button hook up

    $('img[src*=btn-en-compare-blu29]').bind('click', function () {

        var $selectedsku = $('input[name*=skuId]:checked'), sku = [], ind,
            i = $selectedsku.length;
            
        while (i--) {
            sku[i] = $($selectedsku[i]).val() + "~1";
        }
        ind = sku.join('|');
        wtargs = ['DCSext.wtEvent', 'HRock_DeviceCompare_Submit', 'DCSext.wtNoHit', 1, 'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtStatusCode', "0", 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, "DCSext.wtSkuQty", ind, "DCSext.wtZipCode",ATT.globalVars.zip()];
        window.dcsMultiTrack.apply(this, wtargs);
    });
	
    //show more devices
    $("#showMoreDevices a, #deviceShowAll a, #showMoreAcc a").live('mousedown', function () {
        var wtargs, href = location.href, evt = eventCheck.evt;
        
		ATT.cqWebtrend.delay(4000).then(function() {
    		var wtrti = ATT.cqWebtrend.wtSKUDetails();
			
			wtargs = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1,
				'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0" ,
				'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
				"DCSext.wtViewModifier", "Show More", 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "Consumer", 'DCSext.wtBAN', ATT.globalVars.ban,
				"DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(),
				"DCSext.wtOOSSKU", wtrti.oosSKU, "DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
			window.dcsMultiTrack.apply(this, wtargs);
		});
    });


   

    //HRock_CheckOut_PersPmtInfo_SaveAddr_Submit save address
    $("#btnPpuSave, #btnBillingVerify, #btnBillingSave").unbind('mousedown').bind("mousedown", function () {
        var wtPaperlessBillOpt = $("#signMe").parent().hasClass("checked") ? "Y" : "N",
            wtclick = $(this).data('cqpath') || "/content/att/shop/checkout/personalpayment/jcr:content/saveaddress",
            hrevent;
        if (this.id === "btnPpuSave" || this.id === "btnBillingSave") {
            hrevent = "HRock_CheckOut_PersPmtInfo_SaveAddr_Submit";
        } else {
            hrevent = "HRock_CheckOut_PersPmtInfo_VerifyAddr_Submit";
            wtclick = "";
        }

        wtargs = ['DCSext.wtEvent', hrevent, 'DCSext.wtNoHit', 1 ,  'DCSext.wtSpecialOffersOpt', "Y",
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0", 'DCSext.wtCartState', eventCheck.wtcartstate,
            'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer",
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtPaperlessBillOpt", wtPaperlessBillOpt, 'DCSext.wtCQClickId', wtclick,
            "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtCartId", eventCheck.cartId];


        window.dcsMultiTrack.apply(this, wtargs);


    });

    $('img[src*=btn_en_save_address_blu29]').live('mousedown', function(){

        var wtPaperlessBillOpt = $("#signMe").parent().hasClass("checked") ? "Y" : "N",
            wtclick = "/content/att/shop/checkout/personalpayment/jcr:content/saveaddress";


        wtargs = ['DCSext.wtEvent', 'HRock_CheckOut_PersPmtInfo_SaveAddr_Submit', 'DCSext.wtNoHit', 1 ,  'DCSext.wtSpecialOffersOpt', "Y",
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0", 'DCSext.wtCartState', eventCheck.wtcartstate,
            'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer",
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtPaperlessBillOpt", wtPaperlessBillOpt, 'DCSext.wtCQClickId', wtclick,
            "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtCartId", eventCheck.cartId];
        window.dcsMultiTrack.apply(this, wtargs);

    });
    //phone details
    //Hrock_CheckOut_PhoneDetails_Submit
    $('#submitPhonedetail').unbind('mousedown').bind('mousedown', function () {
        var acheck = $("select", ".yourwirelessnumbers").val() === "-1" ? "errorCode.W_CO_904" : "0",
            flag = acheck === "errorCode.W_CO_904" ? "0" : 1,
            wtclick = $(this).data('cqpath') || "/content/att/shop/checkout/phonedetails/jcr:content/phonedetailscontinue",
            acctType = $("input[type='radio'][name^='consumerType_']:checked").attr("id"),
            wtAcctType = ((/business/i.test(acctType))? 'B' : 'R');
            
        wtargs = ['DCSext.wtEvent', "HRock_CheckOut_PhoneDetails_Submit", 'DCSext.wtNoHit', 1, 'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,"DCSext.wtCustType","consumer", 'DCSext.wtStatusCode', acheck, "DCSext.wtCartId", eventCheck.cartId, 'DCSext.wtCQClickId', wtclick,
            'DCSext.wtSuccessFlag', flag, 'DCSext.wtCartType', 'eCommerce', 'DCSext.wtCartState', eventCheck.wtcartstate,
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtAcctType", wtAcctType];
        window.dcsMultiTrack.apply(this, wtargs);
    });

    //promo code for cart summary
    /*TODO
     wtPromoDiscountStartDate
     wtPromoDiscountEndDate
     wtPromoDuration
     ATT.globalVars.discount = ATT.globalVars.cartContents.orderTotals.promotion.couponCode;
     ATT.globalVars.promoamt =  ATT.globalVars.cartContents.orderTotals.promotion.appliedAmount;
     */
    $(doc).bind('FormResponseReturned', function (event, coupondata) {

        var wtclick, evtname, sdate, edate, pduration, code, flag, promotype, amt,
            checkstatus = coupondata.status,
            status = checkstatus === "failure" ? coupondata.messages[0].errorCode : "0",
            promoCode;

        if (coupondata.queue === "coupon") {
            wtclick = $(".summary-item-actions a", "#enter-coupon-line").data('cqpath');
            evtname = coupondata.action === "apply" ? "HRock_Cart_PromoCode_Submit" : "HRock_Cart_PromoCode_Remove";
            sdate = checkstatus === "failure" ? "" : " 2011-07-01";
            edate = checkstatus === 'failure' ? "" : " 2012-12-31";
            pduration = checkstatus === 'failure' ? "" : "1year";
            flag = checkstatus === 'success' ? 1 : "0";
            promoCode = coupondata.data.promoCode;
            promotype = checkstatus === 'failure' ? "" : "coupon";
            amt = checkstatus === 'failure' ? "" : "-$10";
        } else {
            wtclick = $(".summary-item-actions a", "#employee-referral-line").data('cqpath');
            evtname = coupondata.action === "apply" ? "HRock_Cart_PromoCode_Submit" : "HRock_Cart_PromoCode_Remove";
            sdate = "";
            edate = "";
            promoCode = coupondata.data.employeeId;
            pduration = "";
            flag = checkstatus === 'failure' ? "0" : 1;
            promotype = checkstatus === 'failure' ? "" : "employeeReferral";
            amt = "";
        }

        wtargs = ['DCSext.wtEvent', evtname, 'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', status ,
            'DCSext.wtSuccessFlag', flag, 'DCSext.wtCartState', eventCheck.wtcartstate,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtPromoCode", promoCode,
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), 'DCSext.wtCartType', 'eCommerce', 'DCSext.wtBAN', ATT.globalVars.ban,
            "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', wtclick, 'DCSext.wtCartId', eventCheck.cartId,
            "DCSext.wtPromoDollarsOffAmount", amt, "DCSext.wtPromoDuration", pduration, 'DCSext.wtPromoType', promotype,
            "DCSext.wtPromoDiscountStartDate", sdate, "DCSext.wtPromoDiscountEndDate", edate, "DCSext.wtPromoCodeStatus", "0"];
        window.dcsMultiTrack.apply(this, wtargs);

        ATT.ajaxWrapper('/shop/cart/cartsummary/jcr:content/cart.cartcontent.xhr.json', function (data) {
            ATT.globalVars.cartContents = data;
            ATT.globalVars.flattenCartContents = ATT.util.flattenObject(data);
        });

    });

    //media icons logs
    $("map").bind('click', function (e) {
        var wtShare = e.target.getAttribute("title"),
            wtclick = '/content/att/shop/common/jcr:content/socialmedia';


        wtargs = ['DCSext.wtEvent', "HRock_Social_Media_Click", 'DCSext.wtSuccessFlag', 1, "DCSext.wtCartId", eventCheck.cartId,
            'DCSext.wtCQClickId', wtclick, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtCartType', 'eCommerce', 'DCSext.wtCartState', eventCheck.wtcartstate, "DCSext.wtCustType", "consumer",
            "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtShareMethod", wtShare];

        window.dcsMultiTrack.apply(this, wtargs);
    });

    //tabs hook up
    //$("a", "ul.tabs").bind('click', cbEvents.cqClick);


    //AAL

    $('#AALSubmitButton', '.addaline').bind('click', function () {

        var wtclick = '/content/att/shop/en/wireless/addaline/jcr:content/addaline',
            aaltype, 
            aalText= jQuery('input[name=aalsubmittype]:checked').closest('.radio').siblings('label').text().split(' ');
        
        aaltype = ~$.inArray('existing', aalText) ? "Existing Family" : ~$.inArray('individual', aalText) ? "New Individual" : "New Family";
        wtargs = ['DCSext.wtEvent', 'HRock_Cart_AAL_Submit', "DCSext.wtSkuQty", "sku5676677~1", "DCSext.wtMIRInd", wtMIRInd, 'DCSext.wtNoHit', 1,
            'DCSext.wtBuyFlowCode', "HRAL~WAL~U~H~I~D~BW", 'DCSext.wtStatusCode', "0" , 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState',
            eventCheck.wtcartstate, "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', wtclick, "DCSext.wtAALType", aaltype];

        window.dcsMultiTrack.apply(this, wtargs);

    });

    

    
    $('a','body').live('click', cbEvents.cqClick);
	//$('.shipping-select').live('click', cbEvents.cqClick);
	$('.bopis .btn').live('click',cbEvents.cqClick);
    //$("ul.carousel1ContentSelector").delegate("a", 'mousedown', cbEvents.cqClick);
   
   // $("a", "#homepageFeatureswelcomeback,#ATTServicesHomepage").live("click", cbEvents.cqClick);

    /*$('a', '#homepageFeatures').live('click', function(){
        var clickid = this.getAttribute("data-cqpath");
        wtargs = ['DCSext.wtCQClickId', clickid, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];
        window.dcsMultiTrack.apply(this, wtargs);

    });*/

    //shopping assistant
    $("li.step, #sa-footer a", "#shopping-assistant").live('mousedown', function () {
        var clickid = '/content/att/shop/wireless/hmc/jcr:content/shoppingAssistanceLink';
        wtargs = ['DCSext.wtCQClickId', clickid, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];
        window.dcsMultiTrack.apply(this, wtargs);
    });



    //jQuery("a").delegate("div[data-teaserid]", "click", cbEvents.cqClick);
    //extra clicks end

    //HMC hook up
    $("#hmc-submit", "#content").bind('click', function () {
        var actualpath = '/content/att/shop/wireless/hmc/jcr:content/hmc',
            $ques = $(".question-type"),
            $ans = $(".hcmquestion:checked"),
            i = $ques.length, q = [], wtHelpChoose;
        while (i--) {
            q[i] = "Q~" + $.trim($($ques[i]).text()) + "|" + "A~" + $.trim($($ans[i]).parent().next().text());

        }
        wtHelpChoose = q.join("|");
        wtargs = ['DCSext.wtEvent', 'HRock_HMC_ViewReco_Submit', 'DCSext.wtNoHit', 1,
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0" ,
            'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
            "DCSext.wtCQClickId", actualpath, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer",
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtHelpChoose', wtHelpChoose];

        window.dcsMultiTrack.apply(this, wtargs);

    });

   

    //1.5 reporting issue ECOM1202-3384
    $("form#emailCapture").bind("submit", function () {
        var wtUserResp = $(this).find("input").val(),
            wtEmailAddr, wtshare = "", wtCQClick = "/shop/wireless/upgrade/jcr:content/emailcapture";

        if ($.trim(wtUserResp) === "Enter your email") {
        	wtUserResp ='email address';
        	ATT.log("no email entered for stay connected");
            
        }
		
        wtargs = ['DCSext.wtEvent', "HRock_Lead_Capture_Submit", 'DCSext.wtSuccessFlag', 1, "DCSext.wtCartId", eventCheck.cartId,
            'DCSext.wtCQClickId', wtCQClick, 'DCSext.wtStatusCode', "0", "DCSext.wtUserResp", wtUserResp,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtEmailAddr", ""];

        window.dcsMultiTrack.apply(this, wtargs);

    });

    //1.5 linkfarm stuff
    //$("#linkFarm a").live("mousedown", cbEvents.cqClick);


    //$("a", ".catalogtabcarousel").live("mousedown", cbEvents.cqClick);

    // 1.5 carousal stuff
   // $("a", ".carouselWrapper").live("mousedown", cbEvents.cqClick);
    $(".jcarousel-next, .jcarousel-prev", ".carouselWrapper").live("mousedown", function(){
        var clickid = '/content/campaigns/att/en/Wireless/overview/Campaign/default/jcr:content/LoBTabcontent/arrowClick';
        wtargs = ['DCSext.wtCQClickId', clickid, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];
        window.dcsMultiTrack.apply(this, wtargs);
    }) ;

    /************************* Click to chat ************************************************/
    $('#lpButtonDiv, #lpButtonDiv-2').bind('click', function () {

        var wtclick = '/content/att/shop/clicktochat/jcr:content/clicktochat';

        wtargs = ['DCSext.wtEvent', 'Chat_Request_Submit', 'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtChatType', "User_Initiated",
            'DCSext.wtChatID', "liveperson" , 'DCSext.wtStatusCode', "0" , 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, "DCSext.flowCode", "livepersonConsole",
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtChatVendor", "liveperson",
            "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', wtclick, "DCSext.wtCartId", eventCheck.cartId,"wtCartFulfillMethod",ATT.globalVars.cartContents.cartFulfillMethod];

        window.dcsMultiTrack.apply(this, wtargs);

    });

    /**************** C2C ends ****************************************************************/

    /*****************  HRock_DeviceGeoAvailCheck_Submit ***********************************/
    $("img[src*=btn-en-checkavailability-grid-blu29]").live("mousedown", function(e){
        var clickid = $(e.target).parent().data('cqpath'), wtsku = jQuery(this).parents(".listGrid-item").attr("id").split('_')[1];
        wtargs = ['DCSext.wtEvent', 'HRock_DeviceGeoAvailCheck_Submit', 'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            'DCSext.wtStatusCode', "0" , 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, "DCSext.wtSku", wtsku ,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),
            "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', clickid, "DCSext.wtCartId", eventCheck.cartId];

        window.dcsMultiTrack.apply(this, wtargs);

    });

    /************************   Closing or cancelling modal ********/
    if(~href.indexOf('/login/')){
    	$(doc).bind('cbox_complete', function(){
		        $('img[src*=btnYes]').live('click', function () {
        	var wtclick = '/content/att/shop/en/wireless/modals/shopmodals/jcr:content/mainpar/accountselection;2011339',
            	r = (ATT.util.getCookie("colam_ctn") || ""), /* null not acceptable return value */
            	j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
            	wtslid = j.uid;

            wtargs = [ 'DCSext.wtEvent', 'HRock_Acct_Selection_Submit', 'DCSext.wtNoHit', 1, 'DCSext.wtStatusCode', -1, 'DCSext.wtBuyFlowCode', 'HRAL~WAL~U~H~I~D~BW',
                'DCSext.wtSuccessFlag', -1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban,
                 "DCSext.wtCartId", eventCheck.cartId, "DCSext.wtCQClickId", wtclick, "DCSext.wtSLID", wtslid, "DCSext.wtCustType", "consumer",
                'DCSext.wtCartType', 'eCommerce', "DCSext.wtZipCode",ATT.globalVars.zip()];
            window.dcsMultiTrack.apply(this, wtargs);
        });
    	});        
    }

    //homepage login  tracking 
    if(location.pathname === '/'){
    	$('#tguardLoginButton','body').live('mousedown', function (e) {
    		var clickid = '/content/att/home/login/default/jcr:content/login;2012107',
    		     $target = $(e.target);
             wtargs = ['DCSext.wtCQClickId', clickid, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];

             window.dcsMultiTrack.apply(this, wtargs);
    		
    	});  
    }
   
    jQuery.when(reporting_ready).then(function (reporting) {

    	reporting.capture([
            {selector: '#submitPersonalPayment', type: 'wtsubmit', name: 'HRock_CheckOut_PersPmtInfo_Submit', value: function() {
    	    	var wtPaperlessBillOpt = $("#signMe").parent().hasClass("checked") ? "Y" : "N",
    	    		wtclick = $(this).data('cqpath') || "/content/att/shop/checkout/personalpayment/jcr:content/ppibutton";
                var wtEmailAddr=jQuery("input#email[type=text]").val() ? jQuery("input#email[type=text]").val() : null;
                var wtTxtOrderNotifyOpt= jQuery("#txtOrderNotify").length>0?(jQuery("#txtOrderNotify").is(':checked')?"Y":"N"):"";
    	    	reporting.params.wtBAN = ATT.globalVars.ban;
    	    	reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;
    	    	reporting.params.wtCartContents = eventCheck.wtcartcontent();
    	    	reporting.params.wtPaperlessBillOpt = wtPaperlessBillOpt;
    	    	reporting.params.wtCartState = eventCheck.wtcartstate;
    	    	reporting.params.wtCQClickId = wtclick;
    	    	reporting.params.wtCartId = eventCheck.cartId;
                reporting.params.wtEmailAddr=wtEmailAddr;
                reporting.params.wtCartType="eCommerce";
                reporting.params.wtCartFulfillMethod=ATT.globalVars.cartContents.cartFulfillMethod;
                reporting.params.wtTxtOrderNotifyOpt=wtTxtOrderNotifyOpt;
            }, params: 'wtCartType,wtCQClickId,wtCartId,wtEmailAddr,wtCartContents,wtPaperlessBillOpt,wtCartState,wtBAN,wtBuyFlowCode,wtCartFulfillMethod,wtTxtOrderNotifyOpt'},
    		
    		{selector: '#tguardLoginButton:page(/login)', type: 'wtsubmit', name: 'HRock_Login_Submit', value: function() {
    	    	var a=/^[0-9]*$/,
        	 		logintype = a.test($("#userid").val()) ? "CTN" : "SLID",
        	    	ctnVal = logintype === "CTN" ? 	$("#userid").val() : "",
        	    	slidVal = logintype === "SLID"	? 	$("#userid").val() : "",
    	    		wtclick = "/content/att/shop/en/wireless/modals/shopmodals/jcr:content/mainpar/login";
    	    	
        	   //	reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;
    	    	reporting.params.wtCQClickId = wtclick;
    	    	reporting.params.wtLoginType = logintype;
    	    	reporting.params.wtCTN = ctnVal;
    	    	reporting.params.wtSLID = slidVal;
    	    	
    	    	
    		}, params: 'wtCQClickId,wtLoginType,wtCTN,wtSLID'},
    		
    		{selector: 'img[src*=btn-en-upgrade-blu29]', type: 'wtsubmit', name: 'HRock_Cart_Upgrade_Submit', value: function() {
    	    	
    			var wtclick = '/content/att/shop/en/wireless/upgrade/jcr:content/upgrade';
    	    	reporting.params.wtCQClickId = wtclick;
    	    	reporting.params.wtSkuQty = 'sku5676897~1';
    	    	reporting.params.wtBuyFlowCode = "HRUP~WNUP~U~H~I~D~BW";
    	    	reporting.params.wtBuyFlowCode = "HRUP~WUP~U~H~I~D~BW";
    	    	reporting.params.wtZipCode = ATT.globalVars.zip();
    	    	reporting.params.wtCartId = eventCheck.cartId;
    	    	
    		}, params: 'wtCQClickId,wtSkuQty,wtBuyFlowCode,wtZipCode,wtCartId'},

            {selector: '#acctSelContinue', type: 'wtsubmit', name: 'HRock_Acct_Selection_Submit', value: function() {
                
               var wtclick = "/content/att/login/jcr:content/login",
                r = (ATT.util.getCookie("colam_ctn") || ""), // null not acceptable return value 
                j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
                wtslid = j.uid ;
                reporting.params.wtCQClickId = wtclick;
                reporting.params.wtSLID= wtslid;
                reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;
                reporting.params.wtZipCode = ATT.globalVars.zip();
                reporting.params.wtCartId = eventCheck.cartId;
				
            }, params: 'wtCQClickId,wtSLID,wtBuyFlowCode,wtZipCode,wtCartId'},
            
            /*{selector: '#CheckoutForm', type: 'wtsubmit', name: 'HRock_Cart_Submit', value: function() {
                
            	 var qty, r = $("div[data-report]"),
                 //wtclick = $("#checkout-btn-enabled-top").data('cqpath'),
                 	res = [], i = r.length, ind,
                 	shipping = ATT.globalVars.cartContents.orderTotals.shipping.method || "",
                 	monthlyAmt = ATT.globalVars.cartContents.orderTotals.final.mrcTotal || "0",
                 	total = ATT.globalVars.cartContents.orderTotals.final.dueToday || "0",
                 	onetimeamt = ATT.globalVars.cartContents.orderTotals.final.firstBill || "",
                 	promotioncode =  ATT.globalVars.cartContents.orderTotals.promotions,
                 	cartdiscount;

                 if(promotioncode && ((promotioncode.orderLevelCoupon && promotioncode.orderLevelCoupon.couponCode)  || (promotioncode.cartLevelCoupon && promotioncode.cartLevelCoupon.couponCode) ) ){
                     cartdiscount = promotioncode.orderLevelCoupon ? promotioncode.orderLevelCoupon.couponCode : promotioncode.cartLevelCoupon.couponCode ? promotioncode.cartLevelCoupon.couponCode: "";
                 } else {
                     cartdiscount ="";
                 }

                 while (i--) {
                	 res[i] = $(r[i]).data('report') + "~1";
                 }

                 ind = res.join('|');
                         	
             	 reporting.params.wtBAN = ATT.globalVars.ban;
                 reporting.params.wtCartDiscounts = cartdiscount;
                 reporting.params.wtCartState  = eventCheck.wtcartstate;
                 reporting.params.wtCartTotalAmt = total;
                 reporting.params.wtCartMonthlyAmt = monthlyAmt;
             	 reporting.params.wtCartOneTimeAmt = onetimeamt;
                 reporting.params.wtShipping = shipping;
             	 reporting.params.wtSkuQty = ind;
                 reporting.params.wtCartContents= eventCheck.wtcartcontent();
                 reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;
                 reporting.params.wtZipCode = ATT.globalVars.zip();
                 reporting.params.wtCartId = eventCheck.cartId;
                 reporting.params.wtCQClickId ='/content/att/shop/en/cart/cartsummary/jcr:content/cart;2012129';
                 reporting.params.wtCartType="eCommerce";
             }, params: 'wtBAN, wtCartDiscounts, wtCartState, wtCartTotalAmt, wtCartMonthlyAmt, wtCartOneTimeAmt, wtShipping, wtSkuQty, wtCartContents, wtBuyFlowCode, wtZipCode, wtCQClickId, wtCartId, wtCartType, wtCartFulfillMethod, wtStorePickupDetails'},
                 
             }, params: 'wtBAN, wtCartDiscounts, wtCartState, wtCartTotalAmt, wtCartMonthlyAmt, wtCartOneTimeAmt, wtShipping, wtSkuQty, wtCartContents, wtBuyFlowCode, wtZipCode, wtCartId'}, */
             
             {selector: '#submitorder', type: 'wtsubmit', name: 'HRock_CheckOut_Order_Submit', value: function() {
                 
            	 reporting.params.wtBAN = ATT.globalVars.ban;
                 reporting.params.wtCQClickId = "/content/att/shop/en/checkout/orderreview/jcr:content";
                 reporting.params.wtCartType  = "eCommerce";
                 reporting.params.wtCustType = "Consumer";
                 reporting.params.wtCartContents= eventCheck.wtcartcontent();
                 reporting.params.wtStoreFulfillChangeInd  = ATT.cqWebtrend.storeFulfillChangeInd();
                 reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;
                 reporting.params.wtZipCode = ATT.globalVars.zip();
                 reporting.params.wtCartId = eventCheck.cartId;
                reporting.params.wtCartState = eventCheck.wtcartstate;
                reporting.params.wtCartFulfillMethod=ATT.globalVars.cartContents.cartFulfillMethod;
                reporting.params.wtStorePickupDetails=ATT.globalVars.cartContents.storePickupDetails;
                 
              }, params: 'wtBAN,wtCQClickId,wtCartType,wtCustType,wtCartContents,wtStoreFulfillChangeInd,wtBuyFlowCode,wtZipCode,wtCartId,wtCartState,wtCartFulfillMethod,wtStorePickupDetails'},
            
            
             {selector: '#btnPpuSave,  #btnBillingSave, #verifyrangeAddress', type: 'wtsubmit', name: 'HRock_CheckOut_PersPmtInfo_VerifyAddr_Submit', value: function() {
                 
            	 var wtPaperlessBillOpt = $("#signMe").parent().hasClass("checked") ? "Y" : "N",
 			         wtclick = $(this).data('cqpath') || "/content/att/shop/checkout/personalpayment/jcr:content/saveaddress";
 			            
            	        
             	 reporting.params.wtCartState = eventCheck.wtcartstate;
                 reporting.params.wtCQClickId = wtclick;
                 reporting.params.wtCartType  = "eCommerce";
                 reporting.params.wtCustType = "consumer";
                 reporting.params.wtPaperlessBillOpt = wtPaperlessBillOpt;
                 reporting.params.wtCartContents= eventCheck.wtcartcontent();
                 reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;
                 reporting.params.wtZipCode = ATT.globalVars.zip();
                 reporting.params.wtCartId = eventCheck.cartId;
                 
             }, params: 'wtCartState, wtCQClickId, wtCartType, wtCustType, wtCartContents, wtPaperlessBillOpt, wtBuyFlowCode, wtZipCode, wtCartId'}
             
           
         ]);
    });
    

    /******************************************************************
     * 1: wireless LOB tab learn link event
     * 2: bazaar voice tab link write click events
 
    $("body:page(wireless)")
    	.delegate(".LoBT .valueTile a", "click", cbEvents.cqClick)
    	.delegate("#BVContent .BVRRRatingSummaryLinkWrite a", "click", function(e){
            var tmpwtargs = ['DCSext.wtCQClickId', "UNKNOWN", 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];
            window.dcsMultiTrack.apply(this, tmpwtargs);
    	});*/
	
    jQuery('#submitorder').click(function() {
    	
    	var	r = (ATT.util.getCookie("colam_ctn") || ""),
        j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
        a=/^[0-9]*$/;
		if (j.uid !== undefined ) {
			var logintype = a.test(j.uid) ? "CTN" : "SLID";
			if (logintype === "CTN") {
				window.localStorage.setItem("wtCTN",j.uid);
				window.localStorage.setItem("wtSLID","");
			}else {
				window.localStorage.setItem("wtSLID",j.uid);
				window.localStorage.setItem("wtCTN","");
			}
		}
		
    	window.localStorage.setItem("wtCartID",eventCheck.cartId);
        window.localStorage.setItem("wtcartstate",eventCheck.wtcartstate);
        window.localStorage.setItem("wtcartcontent",eventCheck.wtcartcontent());
        window.localStorage.setItem("flowcode",ATT.globalVars.flowcode);
        window.localStorage.setItem("cartFulfillMethod",ATT.globalVars.cartContents.cartFulfillMethod);
        window.localStorage.setItem("storePickupDetails",ATT.globalVars.cartContents.storePickupDetails);
    	
    });
    
}(jQuery, document);

window.localStorage.setItem("orderStatus", 1);
ATT.globalVars.confirmationFlag = ~~window.localStorage.getItem("orderStatus");

if (ATT.globalVars.confirmationFlag && ~location.href.indexOf('/ordersummary')) {
	 
      var t = function(){
        
       var wtargs ;
                            
        wtargs = ['DCSext.wtCTN', window.localStorage.getItem("wtCTN"),'DCSext.wtSLID', window.localStorage.getItem("wtSLID"), 'DCSext.wtEvent', 'HRock_System_Order_Confirmed', 'DCSext.wtEventType',"System", 'DCSext.wtStatusMsg', "SUCCESS", 'DCSext.wtStoreFulfillChangeInd', ATT.cqWebtrend.storeFulfillChangeInd(),
                    'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartID',window.localStorage.getItem("wtCartID"), 'DCSext.wtCartState',window.localStorage.getItem("wtcartstate"), 'DCSext.wtOrderId', ATT.globalVars.orderNumber,
                    'DCSext.wtCartType', "eCommerce", 'DCSext.wtZipCode',ATT.globalVars.zip(),'DCSext.wtCartFulfillMethod',window.localStorage.getItem("cartFulfillMethod"),
                    'DCSext.wtStorePickupDetails',window.localStorage.getItem("storePickupDetails"),'DCSext.wtCartContents',window.localStorage.getItem("wtcartcontent"),'DCSext.wtBuyFlowCode',window.localStorage.getItem("flowcode")]; 
                
       
             window.dcsMultiTrack.apply(this, wtargs);
                   
             window.localStorage.removeItem("cartFulfillMethod");
             window.localStorage.removeItem("storePickupDetails");
             window.localStorage.removeItem("wtCartID");
             window.localStorage.removeItem("wtcartstate");
             window.localStorage.removeItem("wtcartcontent");
             window.localStorage.removeItem("flowcode");
             window.localStorage.removeItem("wtSLID");
			 window.localStorage.removeItem("wtCTN");
      };
              
      setTimeout(function(){t();}, 5000);
      window.localStorage.setItem("orderStatus", 0);

}


            