
/**
 * deferredFunctionCall packages the logic for executing a function after a page refresh.  Typically this is used by modal dialogs
 * that were spawned but required log-in to view properly.  deferredFunctionCall spawns the window after the sign-in has refreshed
 * the page.
 *
 * Example usage:
 * var buyCash = new deferredFunctionCall( "showstore" );
 * buyCash.deferredFunction = function() {
 *		showCurrencyStorefront("${applicationScope.shockwaveBaseUrlSecure}${applicationScope.shockwaveCurrencyPurchaseURI}");
 *	};
 *	$(document).ready(function(){
 *		$("#btnBuyCash").click( $.proxy( buyCash.clickHandler, buyCash ) );
 *
 *		if( buyCash.hashTagIsInUrl() ) {
 *			buyCash.executeDeferredFunction();
 *		}
 *	});
 *
 * $.proxy is required to achieve the intended effect.  See http://api.jquery.com/jQuery.proxy/ for more details
 *
 * @param hashTagToLookFor the hash tag we'll check for in the location.href; if it's present we'll execute the deferred function
 *
 * @see showStaticSignIn()
 * @see userInfo.memberId
 */
function deferredFunctionCall ( hashTagToLookFor ) {
	this.hashTagToLookFor = hashTagToLookFor;
	this.deferredFunction = null;
	this.addHashTagAndReloadPage = function() {
		document.location.href = "#" + this.hashTagToLookFor;
		location.reload();
	};
	this.clickHandler =  function() {
		if ( userInfo.memberId === "" ) {
			showStaticSignIn ( $.proxy( this.addHashTagAndReloadPage, this ) );
		} else {
			this.deferredFunction();
		}
		return false; // keep the hash from appearing in the url
	};
	this.hashTagIsInUrl = function() {
		return document.location.hash.indexOf( this.hashTagToLookFor ) !== -1; // true if the hashTag is in location.hash; false otherwise
	};
	this.executeDeferredFunction = function() {
		setTimeout( this.deferredFunction, 1000 );
		document.location.hash = "none";
	};
}