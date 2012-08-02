//$Revision: 453031 $, $Date: 2012-07-09 15:56:55 -0700 (Mon, 09 Jul 2012) $ and $Author: bh4634 $
/*jslint bitwise: false, eqeqeq: true, newcap: true, nomen:true, onevar: true, regexp: false, white: false, plusplus: false */
/*global window $ jQuery ATT lpMTagConfig reporting_ready*/

/**
 * Click to chat
 */

ATT.namespace("c2c");

ATT.c2c = function () {

    var i, results ={
    		orderTotalDeviceValue:[],
    		orderTotalDeviceQuantity:[],
    		orderTotalDeviceType:[],
    		orderTotalPlanValue:[],
    		orderTotalPlanQuantity:[],
    		orderTotalPlanType:[],
    		orderTotalFeatureValue:[],
    		orderTotalFeatureQuantity:[],
    		orderTotalFeatureType:[],
    		orderTotalAccessoriesValue:[],
    		orderTotalAccessoriesQuantity:[],
    		orderTotalAccessoriesType:[]
    	}, $ =jQuery, doc = document, 
        href = doc.location.href, buyflowCode,
        checkoutStage, category, j, k, l, m,
        lines,  conversionStage, configureStage, setObject, getObject,
        data = ATT.globalVars.cartContents,
        reportingData,
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
    	};

    if(ATT.globalVars && ATT.globalVars.cartContents && ATT.globalVars.cartContents.orderType){
    	results.orderType = ATT.globalVars.cartContents.orderType ? ATT.globalVars.cartContents.orderType :'';
    	window.lpMTagConfig.vars.push(["page","orderType",results.orderType]);
    }

    	
    if(data && data.lob && data.lob.items){
        lines = data.lob.items;
        
        results.orderTotal = data.orderTotals["final"].dueToday || '';
        results.firstBill  = data.orderTotals["final"].firstBill || '';
        results.mrcTotal   = data.orderTotals["final"].mrcTotal || '';
        results.taxAmount = data.orderTotals.estimatedTaxes.totalTax || '';
        
        if(typeof results.orderTotal === 'string' && results.orderTotal){
        	results.orderTotal = results.orderTotal.replace('$','').replace(',','');
        	results.orderTotal = results.orderTotal && typeof(results.orderTotal.toFixed(2) === 'string') ?  parseFloat(results.orderTotal.toFixed(2)) : '';
        	results.orderTotal = parseFloat(results.orderTotal.toFixed(2));
     	
        }
        if(typeof results.mrcTotal === 'string' && results.mrcTotal){
        	results.mrcTotal = results.mrcTotal.replace('$','').replace(',','');
        	results.mrcTotal = parseFloat(results.mrcTotal);
        	
        }
        
        if(typeof results.taxAmount === 'string' && results.taxAmount){
        	results.taxAmount =results.taxAmount.replace('$','').replace(',','');
        	results.taxAmount = parseFloat(results.taxAmount);
        	
        }
        
        for(i in lines){

            if(lines.hasOwnProperty(i)){
                //-----------  Device ----------------------------
                if (lines[i] && lines[i].parts && lines[i].parts.device) {
                    m = lines[i].parts.device.length;

                    while(m--){
                        results.orderTotalDeviceValue[m] = lines[i].parts.device[m].prices.dueToday;
                        if(typeof results.orderTotalDeviceValue[m] === 'string'){
                            results.orderTotalDeviceValue[m] = results.orderTotalDeviceValue[m].replace('$','');
                            results.orderTotalDeviceValue[m] = parseFloat(results.orderTotalDeviceValue[m]);

                        }
                        results.orderTotalDeviceQuantity[m] = lines[i].parts.device[m].qty;
                        results.orderTotalDeviceType[m] = lines[i].parts.device[m].detail;
                    }

                }
                //-------------  Plans ---------------------------------------
                if (lines[i] && lines[i].parts && lines[i].parts.plan) {
                    l = lines[i].parts.plan.length;
                    while(l--){
                        results.orderTotalPlanValue[l] = lines[i].parts.plan[l].prices.monthly;
                        if(typeof results.orderTotalPlanValue[l] === 'string'){
                            results.orderTotalPlanValue[l] = results.orderTotalPlanValue[l].replace('$','');
                            results.orderTotalPlanValue[l] = parseFloat(results.orderTotalPlanValue[l]);
                        }
                        results.orderTotalPlanQuantity[l] = lines[i].parts.plan[l].qty;
                        results.orderTotalPlanType[l]= lines[i].parts.plan[l].detail;
                    }

                }
                //---------- Feature ----------------------------------------
                if (lines[i] && lines[i].parts && lines[i].parts.services) {
                    j = lines[i].parts.services.length;
                    while(j--){
                        results.orderTotalFeatureValue[j] = lines[i].parts.services[j].prices.monthly;
                        if(typeof results.orderTotalFeatureValue[j] === 'string'){
                            results.orderTotalFeatureValue[j] =  results.orderTotalFeatureValue[j].replace('$','');
                            results.orderTotalFeatureValue[j] = parseFloat(results.orderTotalFeatureValue[j]);
                        }
                        results.orderTotalFeatureQuantity[j] = lines[i].parts.services[j].qty;
                        results.orderTotalFeatureType[j] = lines[i].parts.services[j].detail;
                    }


                }

                //------------   Accessories -------------------------------------------
                if (lines[i] && lines[i].parts && lines[i].parts.accessories) {
                    k = lines[i].parts.accessories.length;
                    while(k--){
                        results.orderTotalAccessoriesValue[k] = lines[i].parts.accessories[k].prices.dueToday;
                        if(typeof results.orderTotalAccessoriesValue[k] === 'string'){
                            results.orderTotalAccessoriesValue[k] = results.orderTotalAccessoriesValue[k].replace('$','');
                            results.orderTotalAccessoriesValue[k] = parseFloat(results.orderTotalAccessoriesValue[k]);

                        }
                        results.orderTotalAccessoriesQuantity[k] = lines[i].parts.accessories[k].qty;
                        results.orderTotalAccessoriesType[k] = lines[i].parts.accessories[k].detail;
                    }

                }



            }
        }

        results.orderTotalDeviceValue = addArrItems(results.orderTotalDeviceValue);             
        results.orderTotalDeviceQuantity = addArrItems(results.orderTotalDeviceQuantity);
        results.orderTotalDeviceType = ATT.util.filter(results.orderTotalDeviceType, function(n){return n;}).join('|');

        results.orderTotalPlanValue = addArrItems(results.orderTotalPlanValue);
        results.orderTotalPlanQuantity = addArrItems(results.orderTotalPlanQuantity);
        results.orderTotalPlanType = ATT.util.filter(results.orderTotalPlanType, function(n){return n;}).join('|');

        results.orderTotalFeatureValue = addArrItems(results.orderTotalFeatureValue);
        results.orderTotalFeatureQuantity = addArrItems(results.orderTotalFeatureQuantity);
        results.orderTotalFeatureType = ATT.util.filter(results.orderTotalFeatureType, function(n){return n;}).join('|');

        results.orderTotalAccessoriesValue = addArrItems(results.orderTotalAccessoriesValue);
        results.orderTotalAccessoriesQuantity = addArrItems(results.orderTotalAccessoriesQuantity);
        results.orderTotalAccessoriesType = ATT.util.filter(results.orderTotalAccessoriesType, function(n){return n;}).join('|');
    }
	//totPlanNum, totFeatureNum,
    if (results.orderTotalPlanValue || results.orderTotalFeatureValue)	{
	    results.orderTotalRMR =  results.orderTotalPlanValue +  results.orderTotalFeatureValue;
	}
    //TODO: changing it to make sure on that page

    if (~href.indexOf('/wireless/')) {
        conversionStage = "customize";
    }
    if (~href.indexOf('/cart')) {
    	 results.orderTotal = results.orderTotal && !isNaN(results.orderTotal) ? results.orderTotal  : 0;
    	 results.orderTotal = results.taxAmount && !isNaN(results.taxAmount)? results.orderTotal +  results.taxAmount : results.orderTotal;
        conversionStage = "cart";
        buyflowCode = ATT.globalVars.flowcode;
       ATT.util.setCookie('buyflowType',ATT.globalVars.cartContents.buyFlowType,1);
       ATT.util.setCookie('wtContents',  ATT.globalVars.cartContents.wtCartContents, 1);
       ATT.util.setCookie('lpCartTotal', results.orderTotal, 1); 
       ATT.util.setCookie('lpCartTotalRMR', results.mrcTotal, 1); //"cartTotalRMR",
    }
    if (~href.indexOf('/checkout')) {
        conversionStage = "checkout";
    }

    if (~href.indexOf('/ordersummary')) {
        conversionStage = "confirmation";
    }
    
    //configure stage 
    if (~href.indexOf('/devices/') ) {
    	configureStage = "Add a device"; 
    	category = "Devices";
    }
    if (~href.indexOf('/services/')) {
    	configureStage = "Add services";
    	category = "Services";
    }
    if (~href.indexOf('/accessories/')) {
    	configureStage = "Add accessories";
    	category = "";
    }
    if (~href.indexOf('/plans')) {
    	configureStage = "Add a plan";
    	category = 'Plans';
    }
    if (~href.indexOf('/packageslist')) {
    	configureStage = "Configure yours package";
    	category = '';
    }
    
    //checkoutStage
    if (~href.indexOf('/personalpayment')) {
    	checkoutStage = "Personal & Payment Info";
    }
    if (~href.indexOf('/phonedetails')) {
    	checkoutStage = "Phone Number Details";
    }
    if (~href.indexOf('/orderreview')) {
    	checkoutStage = "Review and Submit Order";
    	results.taxAmount = results.taxAmount && !isNaN(results.taxAmount) ?  results.taxAmount*2 : ''; 
    }
    
    
    results.orderTotal = results.orderTotal && !isNaN(results.orderTotal) ? results.orderTotal : ATT.util.getCookie('lpCartTotal') &&  ATT.util.getCookie('lpCartTotal')!=='undefined' ? parseFloat(ATT.util.getCookie('lpCartTotal')) : 0;
    results.orderTotal = results.taxAmount && !isNaN(results.taxAmount)? (results.orderTotal - results.taxAmount) +  results.taxAmount : results.orderTotal;
    // ATT.util.setCookie('lpCartTotalRMR', results.mrcTotal, 1); //"cartTotalRMR",
    results.mrcTotal =  results.mrcTotal && !isNaN(results.mrcTotal) ?  results.mrcTotal : ATT.util.getCookie('lpCartTotalRMR') && ATT.util.getCookie('lpCartTotalRMR') !== 'undefined' ? parseFloat(ATT.util.getCookie('lpCartTotalRMR')) : 0;
    
    
    window.lpMTagConfig.vars.push(["page","categoryName", category || '']);
    window.lpMTagConfig.vars.push(["page","conversionStage",conversionStage || ""]);
    window.lpMTagConfig.vars.push(["page","configureStage",configureStage || ""]);
    window.lpMTagConfig.vars.push(["page","cartTotal",results.orderTotal]);
   // window.lpMTagConfig.vars.push(["page","cartTotalOTR",results.orderTotal || ""]);
    window.lpMTagConfig.vars.push(["page","cartTotalRMR",results.mrcTotal]);
	window.lpMTagConfig.vars.push(["page","checkoutStage",checkoutStage || ""]);
	
	setObject = function(key, value) {
	     return	window.localStorage.setItem(key, JSON.stringify(value));
	};

	getObject = function(key) {
	    return JSON.parse(window.localStorage.getItem(key));
	};
	if(~location.href.indexOf('/orderreview')){
		setObject("cartItems", results);
		reportingData = {
				ban : ATT.globalVars.ban,
				cartContents : ATT.globalVars.flattenCartContents.wtCartContents||''
		};
		setObject('reportData', reportingData);
	}
	
	$(doc).bind('cbox_complete', function () {
       window.lpSendData("page","modalFlag","on") ;
    }).bind('cbox_closed', function () {
        window.lpSendData("page","modalFlag","off") ;
    });
	
	if (~location.href.indexOf('/ordersummary')) {
		
			results = getObject("cartItems");
			
			// floating issues have to take care 
			results.mrcTotal 					= results.mrcTotal && typeof(results.mrcTotal.toFixed(2) === 'string') ?  parseFloat(results.mrcTotal.toFixed(2)) : '';
			results.orderTotal 					= results.orderTotal && typeof(results.orderTotal.toFixed(2) === 'string') ?  parseFloat(results.orderTotal.toFixed(2)) : '';
			results.orderTotalDeviceValue 		= results.orderTotalDeviceValue && typeof(results.orderTotalDeviceValue.toFixed(2) === 'string') ?  parseFloat(results.orderTotalDeviceValue.toFixed(2)) : '';
			results.orderTotalPlanValue 		= results.orderTotalPlanValue && typeof(results.orderTotalPlanValue.toFixed(2) === 'string') ?  parseFloat(results.orderTotalPlanValue.toFixed(2)) : '';
			results.orderTotalFeatureValue 		= results.orderTotalFeatureValue && typeof(results.orderTotalFeatureValue.toFixed(2) === 'string') ?  parseFloat(results.orderTotalFeatureValue.toFixed(2)) : '';
			results.orderTotalAccessoriesValue 	= results.orderTotalAccessoriesValue && typeof(results.orderTotalAccessoriesValue.toFixed(2) === 'string') ?  parseFloat(results.orderTotalAccessoriesValue.toFixed(2)) : '';
						
		    window.lpMTagConfig.vars.push(["page","OrderTotal",results.orderTotal || ""]);
		    window.lpMTagConfig.vars.push(["page","OrderNumber",ATT.globalVars.orderNumber || ""]);
		   
		    //thank you /confirmation
		    window.lpMTagConfig.vars.push(["page","orderTotalOrderType",results.orderType]);
		    window.lpMTagConfig.vars.push(["page","orderTotalOTR",results.orderTotal || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalRMR",results.mrcTotal || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalDeviceValue",results.orderTotalDeviceValue || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalDeviceQuantity",results.orderTotalDeviceQuantity || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalDeviceType",results.orderTotalDeviceType || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalPlanValue",results.orderTotalPlanValue || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalPlanQuantity",results.orderTotalPlanQuantity || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalPlanType",results.orderTotalPlanType || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalFeatureValue",results.orderTotalFeatureValue || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalFeatureQuantity",results.orderTotalFeatureQuantity || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalFeatureType",results.orderTotalFeatureType || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalAccessoriesValue",results.orderTotalAccessoriesValue || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalAccessoriesQuantity",results.orderTotalAccessoriesQuantity || ""]);
		    window.lpMTagConfig.vars.push(["page","orderTotalAccessoriesType",results.orderTotalAccessoriesType || ""]);
		
	}   

};

/**
* c2c function pass data to the liveperson server
* @method c2c
* @param object {} 
* @example 
*/
jQuery(document).ready(function(){
    jQuery.when(ATT.globalVars.cartPromise).then(function() {
      ATT.c2c();
    });

});



