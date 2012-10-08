
/* This javascript performs functions required on Recently Viewed feature*/
		

function saveAllToWishList(items){
	var catentryTokens = items.split(",");
	
	var catentries="";
	//alert('length: '+ catentryTokens.length);
	for(var i=0;i<catentryTokens.length;++i){
	
		if (endsWith(catentryTokens[i], "99")){
			 var indexOf99 = catentryTokens[i].indexOf("99");
			catentryTokens[i] = catentryTokens[i].substring(0, indexOf99);
		}
		var j=i+1;
		catentries = catentries+'catEntryId_'+j+"="+catentryTokens[i]+"&quantity_"+j+"=1&";
	}
	var url ="InterestItemAdd?storeId=10101&langId=-1&catalogId=10001&"+catentries+"URL=InterestItemDisplay";
	window.location.href=url;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function ajaxRemoveItem( item, storeId, catalogId) {
	new Ajax.Request('RemoveItemsFromRecentlyViewedCmd', 
			{	
			method:'post', 
			parameters :'storeId='+storeId+'&catalogId='+catalogId+'&item='+item,
			onSuccess: function(transport){
				document.getElementById("recentlyViewedDIV").innerHTML ="Item deleted";
		
				},
	onComplete: function(){
		//alert("complete");
	},
	onFailure: function(){ 
		alert('Please try selecting a credit card for payment after a few minutes.') 
		}   
	}
);
}


