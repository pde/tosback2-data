//*******************************************************************************************************************/
//Name: adidasAnalytics.js
//Description: Adidas wrapper JS aroudn the coremetrics tagging funtions
//*******************************************************************************************************************/

//delimiter string to be used in explore attributes
var exploreAttrDelimiter = "-_-";

/**
* returns the string of explore attributes with the delimiter
*/
function createExploreAttributesString(exploreAttributes) {
	return exploreAttributes.join(exploreAttrDelimiter);
}

/**
* returns the string of Split test id as A=1|B=2|...etc 
*/
function createSplitIdString(spitTestId) {
	var formattedSplitTestId = spitTestId ;
	if(spitTestId.length==4)
	{
	formattedSplitTestId = 'A='+spitTestId.charAt(0)+'|B='+spitTestId.charAt(1)+'|C='+spitTestId.charAt(2)+'|D='+spitTestId.charAt(3);
	}	
	return formattedSplitTestId;
}
/**
* Page View Tag
* @param pageId
* @param categoryId
* @param optionalSearchString
* @param results
* @param exploreAttributes
*/
function tagPageview(pageId, categoryId, optionalSearchString, results,
		exploreAttributes) {
	addDateToExploreAtt(exploreAttributes,15);
	cmCreatePageviewTag(pageId, categoryId, optionalSearchString, results,
			createExploreAttributesString(exploreAttributes));
}
/**
* Product View Tag
* @param prodID
* @param prodName
* @param categoryId
* @param exploreAttributes
*/
function tagProductview(prodID, prodName, categoryId, searchString, exploreAttributes) {
	addDateToExploreAtt(exploreAttributes,23);
	cmMakeTag(["tid","5","pi","PRODUCT: "+prodName+" ("+prodID+")","pr",prodID,"pm",prodName,"cg",categoryId,"pc","Y","cm_vc",cmExtractParameter("cm_vc",document.location.href),"cm_exAttr",exploreAttributes, "se",searchString]);
}
/**
* Shop Action 5 Tag
* @param prodID
* @param prodName
* @param quantity
* @param unitPrice
* @param exploreAttributes
*/
function tagShopAction5(prodID, prodName, quantity, unitPrice, categoryId, currency,  
		exploreAttributes) {
	cmCreateShopAction5Tag(prodID, prodName, quantity, unitPrice, categoryId, currency, 
			createExploreAttributesString(exploreAttributes));
}
/**
* Display Shop 5
*/
function tagDisplayShop5s() {
	cmDisplayShop5s();
}
/**
* Shop Action 9
* @param prodID
* @param prodName
* @param quantity
* @param unitPrice
* @param customerId
* @param orderId
* @param orderTotal
* @param categoryId
* @param exploreAttributes
*/
function tagShopAction9(prodID, prodName, quantity, unitPrice, customerId,
		orderId, orderTotal, categoryId, currency, exploreAttributes) {
	cmCreateShopAction9Tag(prodID, prodName, quantity, unitPrice, customerId,
			orderId, orderTotal, categoryId, currency, 
			createExploreAttributesString(exploreAttributes));
}
/**
* Display Shop 9
*/
function tagDisplayShop9s() {
	cmDisplayShop9s();
}
/**
* Order Tag
* @param orderId
* @param orderTotal
* @param OrderShipping
* @param customerId
* @param customerCity
* @param customerState
* @param customerPostalCode
* @param exploreAttributes
*/
function tagOrder(orderId, orderTotal, OrderShipping, customerId, customerCity,
		customerState, customerPostalCode, currency, exploreAttributes) {
	cmCreateOrderTag(orderId, orderTotal, OrderShipping, customerId,
			customerCity, customerState, customerPostalCode, currency, 
			createExploreAttributesString(exploreAttributes));
}
/**
* Registration Tag
* @param customerId
* @param customerEmail
* @param customerCity
* @param customerState
* @param customerPostalCode
* @param customerCountry
* @param exploreAttributes
*/
function tagRegistration(customerId, customerEmail, customerCity,
		customerState, customerPostalCode, customerCountry, exploreAttributes) {
	cmCreateRegistrationTag(customerId, customerEmail, customerCity,
			customerState, customerPostalCode, customerCountry,
			createExploreAttributesString(exploreAttributes));
}
/**
* Conversion Event
* @param eventId
* @param actionType
* @param eventCategoryId
* @param points
* @param exploreAttributes
*/
function tagConversionEvent(eventId, actionType, eventCategoryId, points,
		exploreAttributes) {
	cmCreateConversionEventTag(eventId, actionType, eventCategoryId, points,
			createExploreAttributesString(exploreAttributes));
}
/**
* Element Tag
* @param elementID
* @param elementCategory
* @param exploreAttributes
*/
function tagElement(elementID, elementCategory, exploreAttributes) {
	cmCreateElementTag(elementID, elementCategory,
			createExploreAttributesString(exploreAttributes));
}
/**
* Manual Pageview
* @param manualPageID
* @param manualCategoryID
* @param destinationURL
* @param ReferringURL
* @param exploreAttributes
*/
function tagManualPageview(manualPageID, manualCategoryID, destinationURL,
		ReferringURL, exploreAttributes) {
	cmCreateManualPageviewTag(manualPageID, manualCategoryID, destinationURL,
			ReferringURL, createExploreAttributesString(exploreAttributes));
}
/**
* Manual Impression
* @param pageID
* @param cm_sp_val
* @param cm_re_val
*/
function tagManualImpression(pageID, cm_sp_val, cm_re_val) {
	cmCreateManualImpressionTag(pageID, cm_sp_val, cm_re_val);
}
/**
* Manual Link Click
* @param targetHREF
* @param linkname
* @param pageID
*/
function tagManualLinkClick(targetHREF, linkname, pageID) {
	cmCreateManualLinkClickTag(targetHREF, linkname, pageID);
}

/**
* All the static text variables used while tagging
*/
var marketingPreferences="MarketingPreferences";
var checkGCBalance="CheckGCBalance";
var configurePreviewMessage="ConfigPreviewMessage";
var addPromoandSuccess="AddPromoandSuccess";
var migrateUserPassChange="changePwPrompt";
var addYMAL="YMALAdd";
var viewAltColor="ViewAltColor-";
var technologyInteraction="Technology-";
var viewAlternateImage="ViewAltImg-";
var changeSort="ChangeSort";
var modifyProductsPerPage="ModifyProductsPerPage";
var viewNewPage="ViewNewPage-";
var quickviewActivate="QuickviewActivate-";
var viewAlternativeArticle="ViewAltArticle-";
var viewProduct="ViewProduct";
var err404="EcomShopError404";
var leaveReview="LeaveReview-";
var readReviewInteraction="ReadReview-";
var twitterInteraction="Twitter-";
var facebookInteraction="Facebook-";
var deliciousInteraction="Delicious-";
var mySpaceInteraction="MySpace-";
var emailFriend="EmailFriend-";
var viewZoom="ViewZoom-";
var fbLike="FacebookLike";
var addThisShare="AddThisShare";
var sizeChart="SizeChart-";

var cat_fbLike="eCom|ProductPage|FacebookLike";
var cat_addThisShare="eCom|ProductPage|AddThisShare";
var cat_viewZoom="eCom|ProductPage|ViewZoom";
var cat_emailFriend="eCom|ProductPage|EmailFriend";
var cat_mySpaceInteraction="eCom|ProductPage|MySpaceInteraction";
var cat_deliciousInteraction="eCom|ProductPage|DeliciousInteraction";
var cat_facebookInteraction="eCom|ProductPage|FacebookInteraction";
var cat_twitterInteraction="eCom|ProductPage|TwitterInteraction";
var cat_readReviewInteraction="eCom|ProductPage|ReadReviewInteraction";
var cat_leaveReview="eCom|ProductPage|LeaveReview";
var cat_error="eCom|Shop|Error";
var cat_viewProduct="eCom|CategorySearch|ViewArticle";
var cat_viewAlternativeArticle="eCom|CategorySearch|Quickview|ViewAltArticle";
var cat_quickviewActivate="eCom|CategorySearch|QuickviewActivate";
var cat_viewNewPage="eCom|CategorySearch|ViewNewPage";
var cat_modifyProductsPerPage="eCom|CategorySearch|ModifyProductsPerPage";
var cat_changeSort="eCom|CategorySearch|ChangeSort";
var cat_viewAlternateImage="eCom|ProductPage|ViewAltImage";
var cat_technologyInteraction="eCom|ProductPage|TechnologyInteraction";
var cat_viewAltColor="eCom|ProductPage|ViewAlternateColor";
var cat_ymal="eCom|Cart|YMALAdd";
var cat_cart="eCom|Cart";
var cat_migrateUserPassChange="ecom|Pwchange";
var cat_configurePreviewMessage="eCom|GiftCard|ProductPage|ConfigPreviewMessage";
var cat_checkGCBalance="eCom/GiftCard|ProductPage|CheckGCBalance";
var cat_marketingPreferences="eCom|Checkout|EmailPreferences";
var cat_sizeChart="eCom|ProductPage|ViewSizeChart";


//*******************************************************************************************************************/

function staticPageViewTag(pageName, categoryName, searchTerm){
	tagPageview(pageName, categoryName, searchTerm, null,staticExploreAttr);
}

//PDP 
function tagFacebookElement(prodId,prodinfo){
	var exploreAttr = [prodId //articleId
                       ,''//
                       ,''
                       ,coremetricsSplittestId // site split id
                       ];    
		tagElement(facebookInteraction+prodinfo,cat_facebookInteraction, exploreAttr);    
	}
	
function tagDeliciousElement(prodId,prodinfo){
	var exploreAttr = [prodId //articleId
                       ,''//
                       ,''
                       ,coremetricsSplittestId // site split id
                       ];    
		tagElement(deliciousInteraction+prodinfo,cat_deliciousInteraction, exploreAttr);    
	}
	
function tagMySpaceElement(prodId,prodinfo){	
	var exploreAttr = [prodId //articleId
                       ,''//
                       ,''
                       ,coremetricsSplittestId // site split id
                       ];
    
		tagElement(mySpaceInteraction+prodinfo,cat_mySpaceInteraction, exploreAttr);    
	}
function tagTwitterElement(prodinfo){
	var	prodId = $("#selectColor option:selected").attr("title");
	var exploreAttr = [prodId //articleId
                       ,''//
                       ,''
                       ,coremetricsSplittestId // site split id
                       ];
    
		tagElement(twitterInteraction+prodinfo ,cat_twitterInteraction, exploreAttr);    
	}
function tagEmailFriendElement(prodId,prodinfo){	
	var exploreAttr = [prodId //articleId
                       ,''//
                       ,''
                       ,coremetricsSplittestId // site split id
                       ];
    
		tagElement(emailFriend+prodinfo, cat_emailFriend, exploreAttr);    
	}
function tagTechnology(technology){	
	var	prodId = $("#selectColor option:selected").attr("title");
	var exploreAttr = [prodId//articleId
                       ,'' //articleIdTo
                       ,'' // article position
                       ,coremetricsSplittestId // site split id
                       ];
		tagElement(technologyInteraction+technology ,cat_technologyInteraction, exploreAttr);
	}

// Add coremetrics function
function tagZoomElement(id,prodinfo){
	var exploreAttr = [id //articleId
                       ,''//
                       ,''
                       ,coremetricsSplittestId // site split id
                       ];
    
		tagElement(viewZoom+prodinfo ,cat_viewZoom, exploreAttr);    
	}

function tagElementAltImage(id,imageNumber){	
	var exploreAttr = [id //articleId
                       ,'' //articleIdTo
                       ,'' // article position
                       ,coremetricsSplittestId // site split id
                       ];
	tagElement(viewAlternateImage+imageNumber ,cat_viewAlternateImage, exploreAttr);
	}

function tagSizeChart(id,sizeChartName){	
	var exploreAttr = [id //articleId
                       ,'' //articleIdTo
                       ,'' // article position
                       ,coremetricsSplittestId // site split id
                       ];
	tagElement(sizeChart+sizeChartName ,cat_sizeChart, exploreAttr);
	}

// AUSO-911 : start
/**
 * AUSO-911
 * coremetrics tag called when user change color of the product on pdp
 * @param currentIndexTitle
 * @param currentIndexProductName
 * @param currentIndexProductColor
 * @param currentIndexProductAllSizes
 * @param currentIndexProductTmbCount
 * @param currentIndexProductRating
 * @param currentIndexBrand
 * @param currentIndexGender
 * @param currentIndexProduct
 * @param currentIndexSportProp
 * @param currentIndexCollection
 */ 
function tagElementAltColor(currentIndexTitle,currentIndexProductName,currentIndexProductColor,currentIndexProductAllSizes,currentIndexProductTmbCount,currentIndexProductRating,currentIndexBrand, currentIndexGender, currentIndexProduct, 
		currentIndexSportProp, currentIndexCollection, currentIndexAllColors){
	var genderForCoremetrics = '';
	if (currentIndexGender == 'Men\'s'){
		genderForCoremetrics = "men";
	} 
	else if (currentIndexGender == 'Women\'s'){
		genderForCoremetrics = 'women';
	} else {
		genderForCoremetrics = currentIndexGender.toLowerCase();
	} 
	
	var exploreAttributes =["" // page version -ignore
	    	               ,"" // TODO: breadcrums
	    	               , currentIndexProductAllSizes // size available
	    	               ,currentIndexAllColors // colors available
	    	               ,currentIndexProductRating // User Rating
	    	               ,"" // Family position : no need to send here as it will be tagged on search page on click of product
	    	               ,currentIndexProductTmbCount // Number of images shown	    	               
	            	       ,coremetricsSplittestId // site split id
	            	       ,currentIndexTitle
	            	       ,currentIndexProductColor
	            	       ,genderForCoremetrics
	            	       ,currentIndexProduct
	            	       ,currentIndexBrand
	            	       ,currentIndexSportProp
	            	       ,currentIndexCollection
	            	       ,"US"
	                    ];

	tagProductview(currentIndexTitle, currentIndexProductName+'_'+currentIndexProductColor, jsCategoryId, null,exploreAttributes);
}
// AUSO-911 : end
	
/**
 * This function would be used for inserting the PST date time in the format YYYY-MM-DD HH:MM:SS
 * to the exploreAttributes array for page view and product view tags. 
 * This function was added for AUSO-1841 
 * 
 *  @param exploreAttributes - Array to which the date time needs to be inserted
 *  @param dateIndex - index of the array where the date needs to be inserted
 */
function addDateToExploreAtt(exploreAttributes,dateIndex){
	exploreAttributes[dateIndex]=cmPstDateFormat;
}
			