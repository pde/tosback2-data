/// 
/// Costco Javascript Analytics proxy variables and functions.  
///
/// These allow Costco to switch Analytics providers with minimal pain.   
/// In the ideal conversion you would add the new provider's javascript library functions to the solution and
/// reference the functions here.  All existing Costco pages should make calls to functions in this file.
///
/// In practice, there might be new functions that might need to be created and new attributes to be passed. 
/// So they should be added to this file.
///

/// Analytics variables may be set by the code behind or Costco page specific scripts.
/// CostcoPage.cs sets the environment, default PageID, and default category variables.
//	var analyticsSubDomain;     /// Assumes this will be a sub domain under Costco.com or .ca
//	var analyticsSiteCountry;   /// .COM or .CA
//	var analyticsAcctNo;        /// Coremetrics ClientID used to separate reports by BC, BD, and CA.
//	var analyticsEnvironment;   /// Test or Production.

// Tab Tagging Flag Variables
var tabProductFlag;
var tabSpecsFlag;
var tabShippingFlag;
var tabReturnsFlag;
var tabConciergeFlag;
var tabReviewsFlag;

/// Functions will normally be called by the Costco pages specific scripts.
/// Uses JQuery and Coremetrics libraries.
//<script type='text/javascript' src='/Scripts/JQuery.js'></script>
//<script type='text/javascript' src='/Scripts/Coremetrics/eluminate.js'></script>
//<script type='text/javascript' src='/Scripts/Coremetrics/cmDataTagUtils.js'></script>

/// When the page is loaded, initialize the environment so tags can be sent at the appropriate time.
function AnalyticsPageSetup() {
	AddActionClickTags();
	CheckForRegisteredUser();
}
 
 /// Adds action tags to Click events assoicated with images.  
 /// Examples: Watch Video, View PDF...
 function AddActionClickTags() {
	// Video and Image Tagging
	
//tab tagging

	$("[href='#product-tab1']").click(function(){ 
			if (tabProductFlag!=1){
				tabProductFlag=1;
				var attributes=cG7.cM0[cm_ClientID];
				cmCreatePageElementTag("PRODUCT DETAILS", "TABS",attributes); 
			}		
		});

	$("[href='#product-tab2']").click(function(){
		if (tabSpecsFlag!=1){
			tabSpecsFlag=1;
			var attributes=cG7.cM0[cm_ClientID];
			cmCreatePageElementTag("SPECIFICATIONS", "TABS",attributes); 
		}		
	});
	
	$("[href='#product-tab3']").click(function(){
			if (tabShippingFlag!=1){
				tabShippingFlag=1;
				var attributes=cG7.cM0[cm_ClientID];
				cmCreatePageElementTag("SHIPPING AND TERMS", "TABS",attributes); 
			}		
		});
	
	$("[href='#product-tab4']").click(function(){
		if (tabReturnsFlag!=1){
			tabReturnsFlag=1;
			var attributes=cG7.cM0[cm_ClientID];
			cmCreatePageElementTag("RETURN POLICY", "TABS",attributes); 
		}		
	});
	
	$("[href='#product-tab5']").click(function(){
		if (tabConciergeFlag!=1){
			tabConciergeFlag=1;
			var attributes=cG7.cM0[cm_ClientID];
			cmCreatePageElementTag("FREE CONCIERGE SERVICE", "TABS",attributes); 
		}		
	});

	$("[href='#product-tab6']").click(function(){ 
			if (tabReviewsFlag!=1){
				tabReviewsFlag=1;
				var attributes=cG7.cM0[cm_ClientID];
				cmCreatePageElementTag("PRODUCT REVIEWS", "TABS",attributes); 
			}		
		});
 }
 
 //
 //  Once the user logs in, the coremetrics registered user cookie is set.  
 //  This allows the next page, to send the coremetrics registered user ID 
 //  without cluttering the query string or complicating server side logic.
 //
 function CheckForRegisteredUser() {
	var regUserID = $.cookie('CoremetricsRegisteredUser');
	if (regUserID != null && regUserID.length > 1)  // IE does not always clear regUserID
	{
		cmCreateRegistrationTag( regUserID );
		$.cookie('CoremetricsRegisteredUser', null, { expires:-1, path: '/' } );  //Clear the cookie so it is only sent once per login.
	}
}
 
 $(window).load( function() {
	AnalyticsPageSetup();
});