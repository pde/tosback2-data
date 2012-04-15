/*
(C) Copyright MarketLive. 2006. All rights reserved.
MarketLive is a trademark of MarketLive, Inc.
Warning: This computer program is protected by copyright law and international treaties.
Unauthorized reproduction or distribution of this program, or any portion of it, may result
in severe civil and criminal penalties, and will be prosecuted to the maximum extent
possible under the law.
*/

// A global boolean for turning on/off debug statements printed out to the firebug console.
var bDebugGoogleAnalytics = true;

/**
 * Parses a Google Analytics specific JSON Object.
 * Special Case parsing is separated out into function calls.
 * @param {Object} oGoogleAnalyticsJSON A Google Analytics specific JSON Object.
 */
function parseGoogleAnalyticsJSON(oGoogleAnalyticsJSON){
	// call to build/eval the "pageTracker._addTrans()" tracking call
	buildTrans(oGoogleAnalyticsJSON);
	
	// call to build/eval the "pageTracker._addItem()" tracking call(s)
	buildItems(oGoogleAnalyticsJSON);

	pageTracker._trackTrans();
}

/**
 * Builds and Evals the "pageTracker._addTrans()" tracking call,
 * based on data gathered from the oGoogleAnalyticsJSON object.
 * @param {Object} oGoogleAnalyticsJSON A Google Analytics specific JSON Object.
 */
function buildTrans(oGoogleAnalyticsJSON){
	// grab the data we need and set them in vars
	var sOrderID = oGoogleAnalyticsJSON['orderID'];
	var sOrderTotal = oGoogleAnalyticsJSON['orderTotal'];
	var sTaxTotal = oGoogleAnalyticsJSON['taxTotal'];
	var sShippingTotal = oGoogleAnalyticsJSON['shippingTotal'];
	var sCity = oGoogleAnalyticsJSON['city'];
	var sState = oGoogleAnalyticsJSON['state'];
	var sCountry = oGoogleAnalyticsJSON['country'];

	// construct the eval string
	var sEvalString = 'pageTracker._addTrans(';
		sEvalString += '"'+ sOrderID +'",';
		sEvalString += '"",';
		sEvalString += '"'+ sOrderTotal +'",';
		sEvalString += '"'+ sTaxTotal +'",';
		sEvalString += '"'+ sShippingTotal +'",';
		sEvalString += '"'+ sCity +'",';
		sEvalString += '"'+ sState +'",';
		sEvalString += '"'+ sCountry +'"';
	sEvalString += ")";

	// eval the resulting string
	eval(sEvalString);

	// print out the final string (if debugging is turned on) 
	debugGoogleAnalytics(sEvalString);
}

/**
 * Builds and Evals the "pageTracker._addItem()" tracking call,
 * based on data gathered from the oGoogleAnalyticsJSON object.
 * @param {Object} oGoogleAnalyticsJSON A Google Analytics specific JSON Object.
 */
function buildItems(oGoogleAnalyticsJSON){
	// only continue if we have products
	if (oGoogleAnalyticsJSON['products']) {
		// grab the orderID, which is used in the construction of each product's eval string
		var sOrderID = oGoogleAnalyticsJSON['orderID'];	

		// loop through the objects in the products array
		for(var i=0; i<oGoogleAnalyticsJSON['products'].length; i++){
			// grab the data we need and set them in vars
			var sCode = oGoogleAnalyticsJSON['products'][i]['code'];
			var sName = oGoogleAnalyticsJSON['products'][i]['name'];
			var sPricePerUnit = oGoogleAnalyticsJSON['products'][i]["pricePerUnit"];
			var sQuantity = oGoogleAnalyticsJSON['products'][i]["quantity"];

			// construct the eval string 
			var sEvalString = 'pageTracker._addItem(';
				sEvalString += '"'+ sOrderID +'",';
				sEvalString += '"'+ sCode +'",';
				sEvalString += '"'+ sName +'",';
				sEvalString += '"",';
				sEvalString += '"'+ sPricePerUnit +'",';
				sEvalString += '"'+ sQuantity +'"';
			sEvalString += ")";

			// eval the resulting string
			eval(sEvalString);

			// print out the final string (if debugging is turned on) 
			debugGoogleAnalytics(sEvalString);
		}
	}
}

/**
 * Prints out a string to FireBug's Console, if the bDebugOmniture boolean is set to true.
 * @param {String} sEvalString A String value to pass the the console.log() function call.
 */
function debugGoogleAnalytics(sEvalString){
	if (bDebugGoogleAnalytics == true && typeof(console) != "undefined"){
		console.log("GoogleAnalytics: "+ sEvalString);
	}
}