//********************************************************************
//*-------------------------------------------------------------------
//* Licensed Materials - Property of IBM
//*
//* WebSphere Commerce
//*
//* (c) Copyright International Business Machines Corporation. 2003
//*     All rights reserved.
//*
//* US Government Users Restricted Rights - Use, duplication or
//* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
//*
//*-------------------------------------------------------------------
//*

//////////////////////////////////////////////////////////
// Reloads the minicart HTML under the element with MiniShoppingCart id
// Requires Dojo for xhrGet
// 
//////////////////////////////////////////////////////////
function getMiniCartAjax(storeId, catalogId, langId) {
    //Look up the node we'll stick the text under.
    var targetNode = $("#MiniShoppingCart");

    //The parameters to pass to xhrGet, the url, how to handle it, and the callbacks.
    var xhrArgs = {
        url: "/shop/tools/AjaxQuickCartDisplay",
        handleAs: "text",
        content: {
            storeId: storeId,
            catalogId: catalogId,
            langId: langId
        },   
        load: function(data) {
            targetNode.innerHTML = data;
        },
        error: function(error) {
            targetNode.innerHTML = "An unexpected error occurred: " + error;
        }
    }

    //Call the asynchronous xhrGet
    console.debug("refreshing the minicart with ajax call");
    var deferred = dojo.xhrGet(xhrArgs);
}

function getMiniCartCookie(uniqueID) {
	//var cart = decodeURIComponent(dojo.cookie(uniqueID));
	var cart = decodeURIComponent(getCookie(uniqueID));
	console.debug("decoded Cart:"+cart);
	// if cookie is missing, use this default. Please note that currency symbol 
	// might not be correct but the cookie should not be missing to start with.
	if(cart == 'undefined'){
		//miniCartCookieFound = false;
		cart = '{"quantity":"0","subtotal":"$0.00"}';
	}
	var parsedCart = jQuery.parseJSON(cart);
	return parsedCart;
}





