/*
 * cmdatatagutils.js 
 * $Id: cmdatatagutils-master.txt 164006 2011-01-21 21:43:31Z hwhite $
 * $Revision: 164006 $
 *
 * Version 4.1.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 * Date		Imp. Eng.	Desc.
 * 6/9/2006	Hutch White	Added Code to create mmc tags if siteid= present in url
 * 08/08/06	Hutch White	Add manual link click tags and Liveview Normalization
 * 03/23/07	Hutch White	Add outfitID parameter to productview & Shop tags 
 *						- productview generates custom outfitID tag (li=4)
 * 4/15/07	W.Bird		Add ProdID+"^"+CategoryID Aggregation Exception Logic
 *						Add element tags, conversion tag
 *						Add new cmJv logic
 *092107	MOCHOA		Add ExtraField to Shop9Tag for giftService 
 * 110807	MOCHOA		Add Extra Field 3-6 for Shop 5/9
 *						Add Extra Field 6 for productview
 * 1/8/2008	W.Bird		Added custom tag li=40 & 50 to collect shops ExtraField 1-6
 *						data.
 * 8/19/08	H. White	Add Explore Attributes
 * 8/28/2008	H. White	Add manual_cm_mmc Feature
 * 10/22/2008	J. Bowser	Added try/catch around attempts to override referrer with the frameset referrer
 * 11/03/2008	H. White	Modify conditional for custom tag line number =4
 * 04/10/2009	E. Towb		Corrected shop aggregation logic for shop tags using attributes
 * 04/14/2009	K. Naquin	Added variables to set clientID, impression tracking, and link tracking
 * 11/06/09	H. WHITE	Convert to Maketag, Ad Target. Provide ad target eluminate with no modifications
 * 01/07/10	HWHITE		Add values to link click tag normalization
 *				keyword=,returnurl=,previousurl=,hl=,sl=,tl=,u=,rulr=,usg=
 * 04/25/10	HWHITE		Modify link click tag href value for Google Translate pages to return TRANSLATE.GOOGLE.COM
 * 05/17/10	HWHITE		Modify linkshare search for siteid argument in url to be case insensitive
 * 06/23/2010	HWHITE		Add cmSetClientID and modify cmSetProduction for testing environment
 * 01/21/2011	HWHITE		Add Forsee Tagging
 * 10/13/2011	HWHITE		Add Atributes to shop tags
 */

function cmCreatePageviewTag(pageID, searchString, categoryID, numSearchResults, template,attributes,respondentID) {
	if (pageID == null) { pageID = cmGetDefaultPageID(); }
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}	
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",numSearchResults,"pv1", respondentID,"li","3","ps1",pageID,"ps2",template,"cm_exAttr",cm_exAttr]);
}
function cmCreateProductviewTag(productID, productName, categoryID, pageID, outfitID, PickupInStore,attributes) {
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	if (outfitID || pageID || PickupInStore){
        cmMakeTag(["tid","5","pi",pageID,"pr",productID,"pm",productName,"cg",categoryID,"pc","N","li","4","ps1",productID,"ps2",productName,"ps3",categoryID,"ps4",pageID,"ps5",outfitID,"ps6",PickupInStore,"cm_vc",cmExtractParameter("cm_vc",document.location.href),"cm_exAttr",cm_exAttr]);
	} else {
        cmMakeTag(["tid","5","pi",pageID,"pr",productID,"pm",productName,"cg",categoryID,"pc","N","cm_vc",cmExtractParameter("cm_vc",document.location.href),"cm_exAttr",cm_exAttr]);
    }
}
function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, outfitID, giftServices, SavedForLater, PickupInStore, storeID, SavedForLaterDt,attributes) {
	var pattern = /[^\-0-9\.]/gi;
    productPrice = productPrice.toString().replace(pattern, "");
	var cm_slotNum;
	if (attributes){
		__ex=attributes.split("-_-");  
	} else {
	__ex=new Array();
	}
	productID = productID.toUpperCase();

// write custom tag storing extra parms prior to aggregation

	if (outfitID || giftServices || SavedForLater || PickupInStore || storeID || SavedForLaterDt)	{	
	cmMakeTag(["tid","7","li","40","ps1","5","ps2",productID,"ps3",productQuantity,"ps4",productPrice,"ps5",categoryID,"ps6",outfitID,"ps7",giftServices,"ps8",SavedForLater,"ps9",PickupInStore,"ps10",storeID,"ps11",SavedForLaterDt]);
	}
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"at","5","tid","4","pc","N","sx1",outfitID,"cmAttributes",attributes]);
}
function cmCreateShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, outfitID, giftServices, SavedForLater, PickupInStore, storeID, SavedForLaterDt, attributes) {

	var cm_slotNum;
	var pattern = /[^\-0-9\.]/gi;
	var pattern1 = /^\s+|\s+$/gi;
    productPrice = productPrice.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	productID = productID.toString().replace(pattern1, "");	 
	productID = productID.toUpperCase();

	if (attributes){
		__ex=attributes.split("-_-");	productID = productID.toUpperCase();
	} else {
	__ex=new Array();
	}
	
// write custom tag storing extra parms prior to aggregation

	if (outfitID || giftServices || SavedForLater || PickupInStore || storeID || SavedForLaterDt)	{	
	     cmMakeTag(["tid","7","li","50","ps1","9","ps2",productID,"ps3",productQuantity,"ps4",productPrice,"ps5",categoryID,"ps6",outfitID,"ps7",giftServices,"ps8",SavedForLater,"ps9",PickupInStore,"ps10",storeID,"ps11",SavedForLaterDt,"ps12",orderID]);
	} 
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"cd",customerID,"on",orderID,"tr",orderTotal,"at","9","tid","4","pc","N","sx1",outfitID,"cmAttributes",attributes]);
	cmCalcSKUString();
}
function cmCreateRegistrationTag(customerID, customerEmail, customerCity,
				customerState, customerZIP, newsletterName, 
				subscribe, attributes) {
 	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletterName,"sd",subscribe,"cm_exAttr",cm_exAttr]);
}

function cmSearchResultFollowed(searchString,productID) {
	cmMakeTag(["tid","7","li","1","ps1",searchString,"ps2",productID]);
}

function cmRelatedItemInfo(productID,categoryID,refProductID,refCategoryID) {
	cmMakeTag(["tid","7","li","2","ps1",productID,"ps2",categoryID,"ps3",refProductID,"ps4",refCategoryID]);
}

function cmLIVEviewClick(href,name,pageID) {	
	cmCreateManualLinkClickTag(href,name,pageID)
}
if (defaultNormalize == null) { var defaultNormalize = null; }

/* This normalization function takes a list of parameters and parses out
   all url parameters that ARE in that list.  This only handles the simple case of 
   basic url parameters in the query string.  */
function myNormalizeURL(url, isHref) {
    var newURL = url;
    if (isHref) {
		if (newURL.toUpperCase().indexOf("TRANSLATE.GOOGLEUSERCONTENT.COM")>-1){
			return "TRANSLATE.GOOGLE.COM";
		}
		//Javascript code
		if (newURL.toLowerCase().indexOf("GuidedNavigationSetQuery")!=-1){
			newURL="javascript:GuidedNavigationSetQuery();";
		} else {
			//whitelist code
			if (newURL.toUpperCase().indexOf("SIGNIN.ASPX")>-1){
				// map pages whitelist
					var whiteList = ["origin="];
					var paramString;
					var paramIndex = newURL.indexOf("?");
					var startArgindex=newURL.toUpperCase().indexOf("ORIGIN=");
					var endArgindex1=newURL.toUpperCase().indexOf("?",startArgindex+1);
					var endArgindex2=newURL.toUpperCase().indexOf("&",startArgindex+1);
					var NewParam="";
					if (endArgindex1>-1 && endArgindex2>-1 && endArgindex1<endArgindex2 && startArgindex>-1){
						//second question mark comes before ampersand
						NewParam=newURL.substring(startArgindex,endArgindex1);
					} else if (endArgindex2==-1 && endArgindex1>-1 && startArgindex>-1){
						//second ampersand does not exist, second question mark does
						NewParam=newURL.substring(startArgindex,endArgindex1);
					} else if (endArgindex2>-1 && endArgindex1==-1 && startArgindex>-1){
						//second ampersand  exists, second question mark does
						NewParam=newURL.substring(startArgindex,endArgindex2);
					} else if (endArgindex1==-1 && endArgindex2==-1 && startArgindex>-1){
						//no second question mark or ampersand
						NewParam=newURL.substring(startArgindex);
					}
					if (NewParam!=""){
						newURL=newURL.substring(0,startArgindex-1)+"?"+NewParam;	
					}
			}
			var mapflag = newURL.indexOf("/MapPoint/");
			var catflag = newURL.indexOf("/catalogonline/");
			if ((mapflag != -1) || (catflag != -1)){
				// map pages whitelist
				if (mapflag != -1){
					var whiteList = ["bizid="];
					var paramString;
					var paramIndex = newURL.indexOf("?");
					var params;
					var keepParams = new Array();
					
					if (paramIndex > 0) {
					paramString = newURL.substring(paramIndex+1);
					newURL = newURL.substring(0, paramIndex);
					params = paramString.split("&");
					for(var i=0; i<params.length; i++) {
						for(var j=0; j<whiteList.length; j++) {
							if (params[i].indexOf(whiteList[j]) == 0) {
								keepParams[keepParams.length] = params[i];
							}
						}
					}
				
					newURL += "?" + keepParams.join("&");
				
					}
				} else { // catalog pages whitelist
					var whiteList = ["ver=", "p="];
					var paramString;
					var paramIndex = newURL.indexOf("?");
					var params;
					var keepParams = new Array();
					
					if (paramIndex > 0) {
					paramString = newURL.substring(paramIndex+1);
					newURL = newURL.substring(0, paramIndex);
					params = paramString.split("&");
					for(var i=0; i<params.length; i++) {
						for(var j=0; j<whiteList.length; j++) {
							if (params[i].indexOf(whiteList[j]) == 0) {
								keepParams[keepParams.length] = params[i];
							}
						}
					}
				
					newURL += "?" + keepParams.join("&");
				
					}
				}
			} else {
			//blacklist code
				var paramString;
				var paramIndex = newURL.indexOf("?");
				var styleFlag = newURL.indexOf("styleid=");
				var searchFlag=document.URL.indexOf("/SR?");
				var blackList = ["AddressID=", "URL=", "basketitemid=", "promocode=", "startNum=", "styleNum=", "shopper=", "ordernum=", "PrevStyleID=", "NextStyleID=", "boutique=", "refsid=", "refcat=", "slotid=", "SourceID=", "sourcecode=", "offercode=", "SearchType=", "Search=", "CatID=", "q=", "sort=", "bd=", "sa=", "hn=", "kf=", "brand=", "size=", "width=", "color=", "pricelow=", "pricehigh=", "catname=", "mediumthumbnail=", "cattext=", "PriceRange=", "sizename=", "widthname=", "brandlabelid=", "findertype=", "findertypename=", "pricerangename=", "sizename=", "widthname=", "brandlabelid=", "findertype=", "findertypename=", "pricerangename=", "origquery=", "CatID2=", "CatID3=", "catname1=", "catname2=", "catname3=", "navstate=", "gn=", "initsearch=", "ProductFinder=", "pfindid=", "category=","keyword=","returnurl=","previousurl=","hl=","sl=","tl=","u=","rulr=","usg="];
				if (styleFlag != -1) {
					blackList[blackList.length]="category="
				}
				if (searchFlag!=-1){
					blackList[blackList.length]="origin="
					blackList[blackList.length]="searchorigin="
					blackList[blackList.length]="keyword="
					blackList[blackList.length]="giftfinder="
					blackList[blackList.length]="mode="
				}
				var params;
				var keepParams = new Array();
				var goodParam;
				var newURL;
			
				if (paramIndex > 0) {
				paramString = newURL.substring(paramIndex+1);
				newURL = newURL.substring(0, paramIndex);
				params = paramString.split("&");
			
				for(var i=0; i<params.length; i++) {
					goodParam = true;
					for(var j=0; j<blackList.length; j++) {
						if (params[i].toLowerCase().indexOf(blackList[j].toLowerCase()) == 0) {
							goodParam = false;
						}
					}
					if(goodParam == true) {
						keepParams[keepParams.length] = params[i];
					}
				}
				
				newURL += "?" + keepParams.join("&");
			
				}
			}

			if (newURL.toLowerCase().indexOf("store.nordstrom.com")==-1){
				newURL = newURL.split('http://shop.nordstrom.com').join('');
				newURL = newURL.split('https://shop.nordstrom.com').join('');
			} else {
				newURL = newURL.split('http://store.nordstrom.com').join('');
				newURL = newURL.split('https://store.nordstrom.com').join('');
			}

		 
			if (defaultNormalize != null) {
				newURL = defaultNormalize(newURL, isHref);
			}
		}
	}	
    return newURL;
}

// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}