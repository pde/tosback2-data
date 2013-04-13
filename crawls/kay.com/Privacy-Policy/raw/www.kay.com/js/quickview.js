// quickview.js

/*
* This method makes the quick view button visible
*/
function showQuickView(img_name) {
   	  document.getElementById(img_name).style.display = "block";  
}

/*
* This method makes the quick view button invisible
*/	    
function hideQuickView(img_name) {
   	 document.getElementById(img_name).style.display = "none";
}

	function addQV2CartAjax(form) {
		var params = [];
		var storeId = form.storeId.value;			
		var catalogId = form.catalogId.value;
		var langId = form.langId.value;
		var productId = form.catEntryId.value;
		var catEntryId = form.catEntryId.value;
		var skuSize = "";
		var stockSize ="";
		var standardSize = "";
		var stockSize1="";
		var stockSize2="";
		var stockSize3="";
		var field2_1="";
		var field2_2="";
		var field2_3="";
		var skuSize1 = "";
		var skuSize2 ="";
		var skuSize3="";
		
		//var stockSize = "";
		var strSkyBySize = form.SKUedSize.value;
		var productType = form.productType.value;  // this is to send the param specifying about special order (SO) or regular finished good (FG)
		var skuBySizeObj = form.attrValue;
		if(skuBySizeObj != null){ //this is a sku by size, need to set field2 to the size
			form.field2.value = skuBySizeObj.options[skuBySizeObj.selectedIndex].text;
		}
		
		if((form.field2 != null) && (form.field2.value!='')) { 
			skuSize = form.field2.value;
		}

		if(form.standardSize != null) {
			standardSize = form.standardSize.value;
		}

		if(form.stockSize != null ) {
			stockSize = form.stockSize.value;
		}
		 // Ring sizing for bundle components.
		if (form.field2_1 != undefined){
				skuSize1 = form.field2_1 .value;
		}
		if (form.field2_2  != undefined){
				 skuSize2 = form.field2_2.value;
		}
		if (form.field2_3 != undefined){
				 skuSize3 = form.field2_3.value;
		}
		if (form.stockSize_1 != undefined){
				stockSize1 = form.stockSize_1.value;
		}
		if (form.stockSize_2 != undefined){
				 stockSize2 = form.stockSize_2.value;
		}
		if (form.stockSize_3 != undefined){
				 stockSize3 = form.stockSize_3.value;
		}
		
		params.storeId		= storeId;
		params.catalogId	= catalogId;
		params.langId		= langId;
		params.orderId		= ".";
		params.calculationUsage = "-1,-2,-3,-4,-5,-6,-7";
		params.catEntryId		= catEntryId;
		params.productId = catEntryId;
		params.quantity = "1";
		params.SKUedSize = strSkyBySize;
		params.comment=form.comment.value;
	
		if(skuSize != "") {
			params.field2=skuSize; 
		}
		
		if(skuSize1 != "") {
			params.field2_1=skuSize1; 
		}
		if(skuSize2 != "") {
			params.field2_2= skuSize2; 
		}
		if(skuSize3 != "") {
			params.field2_3=skuSize3; 
		}
		if(stockSize1 != "") {
			params.stockSize_1= stockSize1; 
		}
		if(stockSize2 != "") {
			params.stockSize_2= stockSize2; 
		}
		if(stockSize3 != "") {
			params.stockSize_3= stockSize3; 
		}
		// following parameters are added for SKU by Size
		if(form.attrName != null){
			params.attrName= form.attrName.value;
		}
		if(form.attrValue != null){
			params.attrValue= form.attrValue.value;
		}
		if(productType != null){
			params.productType= productType ;
		}
		if(standardSize != ""){
			params.standardSize= standardSize ;
		}
		if(stockSize != ""){
			params.stockSize= stockSize ;
		}
		//window.location.href = url;
		categoryDisplayJS.addQV2KayCartAjax(params);

	}
