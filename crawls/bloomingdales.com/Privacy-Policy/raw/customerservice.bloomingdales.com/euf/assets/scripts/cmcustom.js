function cmSetProduction(){
	cmSetClientID("90067797",false,"www3.bloomingdales.com","bloomingdales.com");
}

//Reverted
function cmSetTest(){
	cmSetClientID("60067797",false,"testdata.coremetrics.com","bloomingdales.com");
}

var cm_TrackImpressions = "";
var cm_UseDOMScriptLoad = true;
function cmCreatePageElementTag(elementID, elementCategory,attributes) {
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"pflg","0","cm_exAttr",cm_exAttr]);
}
function cmCreateTechPropsTag(pageID, categoryID, cm_ven, cm_cat, cm_pla, cm_ite, custID, linkShareID,attributes,extraFields) {
	if (extraFields){
		var ex_attr=extraFields.split("-_-");
		if (custID){
			ex_attr[0]=custID;
		}
		if (linkShareID){
			ex_attr[1]=linkShareID;
		}
		extraFields=ex_attr.join("-_-");
	}
	if (cm_ven){
		this.manual_cm_mmc=cm_ven+"-_-"+cm_cat+"-_-"+cm_pla+"-_-"+cm_ite;
	}		
	cmMakeTag(["tid","6","pi",pageID,"cg",categoryID,"pc","Y","pv1",custID,"pv2",linkShareID,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults, cm_ven, cm_cat, cm_pla, cm_ite, custID, linkShareID,attributes,extraFields) {
	if (extraFields){
		var ex_attr=extraFields.split("-_-");
		if (custID){
			ex_attr[0]=custID;
		}
		if (linkShareID){
			ex_attr[1]=linkShareID;
		}
		extraFields=ex_attr.join("-_-");
	}
	if (cm_ven){
		this.manual_cm_mmc=cm_ven+"-_-"+cm_cat+"-_-"+cm_pla+"-_-"+cm_ite;
	}	
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults,"pv1",custID,"pv2",linkShareID,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateProductviewTag(productID, productName, categoryID, cm_ven, cm_cat, cm_pla, cm_ite, custID, linkShareID,attributes,cm_vc) {	
	if (!cm_vc){
		cm_vc=cmExtractParameter("cm_vc",document.location.href);
	}
	if (cm_ven){
		this.manual_cm_mmc=cm_ven+"-_-"+cm_cat+"-_-"+cm_pla+"-_-"+cm_ite;
	}	
	cmMakeTag(["tid","5","pi","PRODUCT: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"pv1",custID,"pv2",linkShareID,"cmAttributes",attributes]);	
}

function cmCreateBazaarVoiceTag(productID,productName,categoryID,totalReviewCount,avgRating,numberRatingsOnlyReviews,buyAgainPercentage){

	cmMakeTag(["tid","7","li",10300,"ps1",productID,"ps2",productName,"ps3",categoryID,"ps4",totalReviewCount,"ps5",avgRating,"ps6",numberRatingsOnlyReviews,"ps7",buyAgainPercentage]);
}

//Throw this tag when user views reviews
function cmCreateBazaarViewTag(productID, productName,categoryID) {
     cmMakeTag(["tid","7","li",10301,"ps1",productID,"ps2",productName,"ps3",categoryID]);
}

function cmCreateMasterMemberTag(MasterProductID, MasterProductName, MasterCatID, IsMaster, custID) {
     cmMakeTag(["tid","7","li",55,"ps2",MasterProductID,"ps3",MasterProductName,"ps4",MasterCatID,"ps5",IsMaster,"ps6",custID]);
}

function cmCreateOrderTag(orderID, orderTotal, orderShipping, customerID,customerCity, customerState, customerZIP, custID, attributes,extraFields) {
	if (extraFields){
		var ex_attr=extraFields.split("-_-");
		if (custID){
			ex_attr[0]=custID;
		}
		extraFields=ex_attr.join("-_-");
	}	
	cmMakeTag(["tid","3","osk",__skuString,"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"or1",custID,"cmAttributes",attributes,"cmExtraFields",extraFields]);
	__skuString = "";
}

function cmCreateRegistrationTag(customerID, customerEmail, customerCity,
				customerState, customerZIP, customerGender, newsletterName, 
				subscribe, attributes) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"gd",customerGender,"nl",newsletterName,"sd",subscribe,"cmAttributes",attributes]);
}

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
    var newURL = url;
    
    if (isHref) {
		if (newURL.toLowerCase().indexOf("www.") || newURL.toLowerCase().indexOf("www1.")){
			newURL=newURL.substr(newURL.indexOf(".")+1);
		}
		    
	    var blackList = ["LinkShareID=", "LinkshareID=", "PartnerID=", "BannerID=", "PseudoCat="];
	    var paramString;
	    var paramIndex = newURL.indexOf("?");
	    var params;
	    var keepParams = new Array();
	    var goodParam;
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
	    if (defaultNormalize != null) {
	        newURL = defaultNormalize(newURL, isHref);
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