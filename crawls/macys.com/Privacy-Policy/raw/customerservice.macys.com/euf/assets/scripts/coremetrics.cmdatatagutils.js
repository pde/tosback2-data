<!--
/*
 * cmdatatagutils.js v4.0, 4/18/2005
 *$Id: cmdatatagutils - MASTER.txt 153122 2010-08-03 18:05:04Z etowb $
 * Date			Imp. Eng.			Desc
 *									action tags price and order tag order total
 * 11/21/06		Hutch White			Create cm.rf from variable or argument in query string
 * 01/23/07		Hutch White			Modify cm.rf logic for ProductViewTag
 * 02/02/07		Hutch White			Add Bazaar Voice Tagging
 * 03/08/07		Hutch White			Revise Bazaar Voice Tagging
 * 11/14/07		HHall				Added cm_em function
 * 03/31/08		MOCHOA				Enabled Conversion Event and Element Tag functions
 * 04/23/08		HWHITE				Add Explore Attributes
 * 06/03/08     LHIBBARD            Add manual tagging
 * 06/11/08		HWHITE				Update aggregation code
 * 07/08/08		Stamkin				Update the code (cm_em) to send one image request only (registration tag and pageview tag are part of one image request only)
 * 12/01/08		HWHITE				Update cm.rf and cm.ul for registration tag 
 * 2/4/08		HWHITE				Convert library to Maketag to resolve Firefox and cross domain frames
 * 4/10/2009		ETOWB				Corrected shop aggregation logic to not use slot number
 * 5/13/2009		ETOWB				Recombined productview and custom tag into a single tag
 * 07/01/09		JBOWSER				Small update to MakeTag for IOv4 with RTR
 * 07/14/09		MESTES				Configuration Section for IO V4
 * 07/21/09		MESTES				change IORequest.required_attributes from  [1,0,0,0,0] to [1,0,0,0,0] since macys is passing us none.
 * 08/06/09          MESTES              change to encrypt product id's and category id's
 * 08/07/09		ETOWB				productview tag pr1 field now contains avgRating value
 *							Added AdTarget changes
 * 07/30/10		ETOWB				Updated for new test system
*/
 
var cm_exAttr=new Array; 
var cm_ClientID = "60067660";
var cm_HOST = "testdata.coremetrics.com/cm?";
var cm_TrackLink = "A";
var cm_TrackImpressions = "";
var cm_JSFEnabled = false;

// AdTarget config and initialization
var cm_Production_HOST = "www3.macys.com";
var cm_PartnerDataClientIDs = "90067660";
if (typeof cmLoad == 'function') {
	cmLoad();
}
 
//
// IO V4 Macys Configuration
// 
// The following variables are global to io_v4.js
// 
if (typeof(IORequest) == "function")
{
   IORequest.client_id           = cm_ClientID;   // client id
   IORequest.encrypt_cats        = true;          // stores categories as 8 digit hex numbers (use if site has long category names)
   IORequest.encrypt_prds        = true;          // stores products as 8 digit hex numbers (use if site has long product names) 
   IORequest.conflict_resolution = true;          // for pages with multiple zones - a recommendation appearing in zone 1 will be filtered out from zone 2
   IORequest.max_prd_length      = 25;            // products with lengths longer than this number will be ignored
   IORequest.max_cat_length      = 25;            // categories with lengths longer than this number will be ignored
   IORequest.timeout             = [8000, 3000];  // timeout for download of product file [first, subsequent] (ms)
   IORequest.use_site_category   = false;         // a site category is the one passed on cmCreate[Page|Product]Tag
                                                  // a non site category is passed in the product files
   // 
   // IORequest.a_max_elements - the sizes of the arrays stored in the IO cookie.  The sizes should 
   // be kept to a minimum to reduce the length of the IO cookie.  
   // 
   // The arrays we are keeping are:
   //
   //  0 pv: order in which products are viewed 
   //  1 pc: order in which products are carted
   //  2 pp: order in which products are purchased
   //  3 cv: order in which categories are viewed
   //  4 cn: the number of views of each corresponding category in the cv array
   //  5 bv: order in which brands are viewed
   //  6 bn: the number of views of each corresponding brand in the bv array
   //
   // IORequest.a_max_elements 
   //
   // Note that the size of the cn array (element 4) and the size of the cv (element 3) are the same 
   // (in the default case 10).  This means we are keeping an array of the last 10 categories
   // viewed and a separate array of the number of times each of the categories was viewed.
   //
   if ((IORequest.ie_version() !== null) && (IORequest.ie_version() < 7.0))
   {
      IORequest.a_max_elements = [1,3,5,3,3,0,0];
   }
   else
   {
      IORequest.a_max_elements = [1,3,5,7,7,0,0];
   }

   //
   // In product files, 5 customer specified attributes are supported.  By default, those are:
   //
   // 1 - product description
   // 2 - url to product page (for anchor tag)
   // 3 - price
   // 4 - rating (1 to 5 stars)
   // 5 - url to image
   //
   // The array below specifies which of these attributes are required.  If an attribute
   // is required but is not passed in the product file, the corresponding recommendation
   // will not be passed to the zone population function.
   //
   IORequest.required_attributes  = [0,0,0,0,0];

   //
   // Access method 
   //
   // 'json remote' or 'ajax remote'
   //
   // 'ajax remote' is the recommended access method if the clients server can be configured
   // to allow remote servers to be mapped into the space of the local server (such as the Proxypass
   // directive in Apache).
   //
   // The directive to use in Apache is:
   //
   // ProxyPass /limelight/ http://coremetric.vo.llnwd.net/o33/
   // 
   // this will allow cross domain ajax requests to our Content Delivery Network.
   //
   // see: http://httpd.apache.org/docs/2.2/mod/mod_proxy.html#proxypass for details
   //
   // Both 'json remote' and 'ajax remote' return identical files.  'ajax remote' is recommended
   // due to its ability to handle 404's.  To be specific, in the case of a "file not found" error, 
   // 'json remote' waits for a timeout to occur before proceeding which may be up to 2 seconds
   // (configurable above), while 'ajax remote' will respond with a 404 which may return in milliseconds.
   // For content which is available, response times are similar.
   //
   IORequest.access_method             = 'json remote';

   //
   // Default product file JSON object that defines the recommendations to be used if communications fail
   //
   // Example:
   //
   // IORequest.default_product_file = {"hd":["20090603162001","90110130","P","82","V4",12],"pd":[["FUCO-02",0,"MC-10007","MODERN OCCASIONAL TABLE","10027","245.79","4","FUCO_02.jpg"],["FUCO-03",81610.37,"MC--1","TWO-DRAWER COFFEE TABLE","10029","247.89","4","FUCO_03.jpg"],["FUCO-01",70950.58,"MC-10007","SLEEK OCCASIONAL TABLE","10025","380.10","3","FUCO_01.jpg"],["FUDE-03",67009.54,"MC-10006","STUDENTS DESK","10023","349.99","3","FUDE_03.jpg"],["FUDE-01",51750.44,"MC--1","EXECUTIVE SIX-DRAWER DESK","10019","849.99","2","FUDE_01.jpg"],["FUDEL-04",41030.65,"MC-10009","ADJUSTABLE DESK LAMP","10043","62.59","4.5","FUDEL_04.jpg"],["FUOF-04",37794.1,"MC--1","SPINDLE BACK CHAIR","10015","99.99","2","FUOF_04.jpg"],["FUDE-02",32265.93,"MC-10006","CRAFT TABLE","10021","259.99","4","FUDE_02.jpg"],["FUTA-01",22503.76,"MC-10008","MOCHA LINEN TABLE LAMP","10031","39.99","3","FUTA_01.jpg"],["FUDEL-03",14126.68,"MC-10009","LAMPE DE BUREAU ? COL DE CYGNE","10041","60.49","4.5","FUDEL_03.jpg"],["FUOF-05",12756.14,"MC-10005","Silver Metallic Straight Back Chair","10017","67.99","4.5","FUOF_05.jpg"],["FUTA-02",11456.86,"MC-10008","BEIGE LINEN TABLE LAMP","10033","28.99","4","FUTA_02.jpg"]],"ap":["","//websphere.lab.dfw.coremetrics.com/webapp/wcs/stores/servlet/ProductDisplay?catalogId=10001&storeId=10001&productId=","$","","//websphere.lab.dfw.coremetrics.com/wcsstore/ConsumerDirect/images/catalog/"]};
   //
   // note: this should be assigned by a Coremetrics implementation engineer.  
   //
   // It entails downloading a product file and inserting the JSON object that makes up that product file.  The example
   // above shows the expected format.  (the URL of the file can be obtained using a firebug enabled version of FireFox and and 
   // checking the debug output as displayed in the console tab of FireFox).
   //
   IORequest.default_product_file = undefined;
}

var cmJv = "1.0";
if (typeof(isNaN) == "function") cmJv = "1.1";
if (typeof(isFinite) == "function") cmJv = "1.2";
if (typeof(NaN) == "number") cmJv = "1.3";
if (typeof(decodeURI) == "function") cmJv = "1.5";
if (typeof(Array.forEach) == "function") cmJv = "1.6";
if (typeof(Iterator) == "object") cmJv = "1.7";

var cmCheckCMEMFlag = true;
var cmReferrer;
var cmDestination;
var manual_cm_mmc;
var refURL;

function ParseRef (url) {
    var newURL=url;
	if (newURL.toLowerCase().indexOf("cm_ref=")>0){
		var paramString;
		var params;
		var goodParam;
		var keepParams = new Array();
		
		var paramIndex = newURL.indexOf("?");
	
		if (paramIndex > 0) {
			paramString = newURL.substring(paramIndex+1);
			params = paramString.split("&");

			for(var i=0; i<params.length; i++) {
				if (params[i].toLowerCase().indexOf("cm_ref")>-1) {
						goodParam = unescape(params[i]);
						if (goodParam.toLowerCase().indexOf("cm_ref=")>-1){
							goodParam=goodParam.substring(goodParam.toLowerCase().indexOf("cm_ref=")+7);
						}
				}
			}	
		}
	}
	return goodParam;
}

/* TAG GENERATING FUNCTIONS */

/*
 * Calling this function points tags to the production database
 */
function cmSetProduction(){
	cm_HOST="www3.macys.com/eluminate?";
	cm_JSFPCookieDomain = "macys.com"; 
	cm_ClientID = "90067660";
}


function cmCreateManualImpressionTag(pageID, trackSP, trackRE) {
		// insert code to get pageID from cmTagControl if pageID is null
		cmMakeTag(["tid","9","pi",pageID,"cm_sp",trackSP,"cm_re",trackRE,"st",cm_ClientTS]);
}

function cmCreateManualLinkClickTag(href,name,pageID) {	
	if (cmCreateLinkTag == null && cM != null) {
		var cmCreateLinkTag = cM;
	}
	if (cmCreateLinkTag != null) {		
		var dt = new Date();
		cmLnkT3 = dt.getTime();
		href=cG7.normalizeURL(href,true);
		cmCreateLinkTag(cm_ClientTS, cmLnkT3, name, href, false, pageID);
	}
}

/* manual PageviewTag for off site page tagging.  Allows client to supply URL and Referring URL
*/
function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL) {
	if (!ReferringURL){
		ReferringURL=window.location.href;
	}
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL]);
}

function cmCreatePageElementTag(elementID, elementCategory,attributes) {
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"pflg","0","cm_exAttr",cm_exAttr]);
}

function cmCreateProductElementTag(elementID, elementCategory, productID, productCategoryID, elementLocation,attributes) {
	if (attributes){
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"pflg","1","pid",productID,"pcat",productCategoryID,"eloc",elementLocation,"cm_exAttr",cm_exAttr]);
}

function cmCreateTechPropsTag(pageID, categoryID, cm_ven, cm_cat, cm_pla, cm_ite, linkShareID, custID, refURL,attributes) {
	if(pageID == null) { pageID = cmGetDefaultPageID(); }
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}	
	if (cm_ven){
		this.manual_cm_mmc=cm_ven+"-_-"+cm_cat+"-_-"+cm_pla+"-_-"+cm_ite;
	}		
	cmMakeTag(["tid","6","pi",pageID,"cg",categoryID,"pc","Y","pv1",custID,"pv2",linkShareID,"cm_exAttr",cm_exAttr]);
}

function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults, cm_ven, cm_cat, cm_pla, cm_ite, linkShareID, custID, refURL,attributes) {
	if (pageID == null) { pageID = cmGetDefaultPageID(); }
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	if (cm_ven){
		this.manual_cm_mmc=cm_ven+"-_-"+cm_cat+"-_-"+cm_pla+"-_-"+cm_ite;
	}	
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults,"pv1",custID,"pv2",linkShareID,"cm_exAttr",cm_exAttr]);
}

function cmCreateDefaultPageviewTag(categoryID) {
	cmCreatePageviewTag(cmGetDefaultPageID(), categoryID);
}

function cmCreateProductviewTag(productID, productName, categoryID, cm_ven, cm_cat, cm_pla, cm_ite,linkShareID, custID, refURL, cmCrossSell,totalReviewCount,avgRating,numberRatingsOnlyReviews,buyAgainPercentage,attributes) {
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	
	if (productName == null) {
		productName = "";
	}
	if (cm_ven){
		this.manual_cm_mmc=cm_ven+"-_-"+cm_cat+"-_-"+cm_pla+"-_-"+cm_ite;
	}	
	cmMakeTag(["tid","5","pi","PRODUCT: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cmExtractParameter("cm_vc",document.location.href),"pr1",avgRating,"pv1",custID,"pv2",linkShareID,"pv13",cmCrossSell,"cm_exAttr",cm_exAttr,"li",10300,"ps1",productID,"ps2",productName,"ps3",categoryID,"ps4",totalReviewCount,"ps5",avgRating,"ps6",numberRatingsOnlyReviews,"ps7",buyAgainPercentage]);
}

//Throw this tag when user views reviews
function cmCreateBazaarViewTag(productID, productName,categoryID) {
     cmMakeTag(["tid","7","li",10301,"ps1",productID,"ps2",productName,"ps3",categoryID]);
}

function cmCreateMasterMemberTag(MasterProductID, MasterProductName, MasterCatID, IsMaster, custID) {
     cmMakeTag(["tid","7","li",55,"ps2",MasterProductID,"ps3",MasterProductName,"ps4",MasterCatID,"ps5",IsMaster,"ps6",custID]);
}

/*
 * Variables and Arrays to support Lineitem Aggregation
 */
var __sArray = new Array();
var __skuString = "";
var __ex=new Array();

function __cmGetPIPC(__pr,__cg) {
	var __pI, i;
	var cmAttr1=new Array();
	var cmAttr2=new Array();
	for (i=0;i<__ex.length;++i){
		cmAttr1=cmAttr1+__ex[i];
	}		
	for (__pI = 0; __pI < __sArray.length; ++__pI) {
		if (__ex.length>0){
			cmAttr2=new Array();		
			for (i=__sArray[__pI].length-__ex.length*2+1;i<__sArray[__pI].length;i=i+2){
				cmAttr2=cmAttr2+__sArray[__pI][i];
			}
	
			if (__pr == __sArray[__pI][1] && __cg == __sArray[__pI][9] && cmAttr1==cmAttr2){
				return __pI;
			}
		} else {
		if (__pr == __sArray[__pI][1] && __cg == __sArray[__pI][9]) return __pI;
		}
	}
	return -1;
}

function cmAddShop(__v) {

	var __i = __cmGetPIPC(__v[1],__v[9]);
	if (__i == -1) {
		if (__ex.length>0){
			for (var i=0; i<__ex.length; ++i){
				__v[__v.length]="s_a"+(i+1);
				__v[__v.length]=__ex[i];
			}
		}
		__sArray[__sArray.length] = __v;
	}
	else {
		var __oQ = __sArray[__i][5];
		var __oP = __sArray[__i][7];
		__sArray[__i][5] = parseInt(__sArray[__i][5]) + parseInt(__v[5]);
		__sArray[__i][7] = (((__v[7]*__v[5])+(__oP*__oQ))/__sArray[__i][5]);
	}
}

function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID,MasterProductID, MasterProductName, MasterCatID, IsMaster, cmCrossSell,attributes) {

	productID = productID.toUpperCase();
	var pattern = /[^\-0-9\.]/gi;
    productPrice = productPrice.toString().replace(pattern, "");
	var cm_slotNum;
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
	__ex=new Array();
	}

	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"at","5","tid","4","pc","N","sx1",MasterProductID,"sx2",MasterProductName,"sx3",cmCrossSell,"sx4",MasterCatID,"sx5",IsMaster]);
}

function cmCreateShopAction9Tag(productID, productName, productQuantity,
				productPrice, customerID, orderID,
				orderTotal, categoryID, MasterProductID, MasterProductName, 
				MasterCatID, IsMaster, cmCrossSell, attributes) {

	productID = productID.toUpperCase();
	var cm_slotNum;
	var pattern = /[^\-0-9\.]/gi;
	var pattern1 = /^\s+|\s+$/gi;
    productPrice = productPrice.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	productID = productID.toString().replace(pattern1, "");
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
	__ex=new Array();
	}
	
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"cd",customerID,"on",orderID,"tr",orderTotal,"at","9","tid","4","pc","N","sx1",MasterProductID,"sx2",MasterProductName,"sx3",cmCrossSell,"sx4",MasterCatID,"sx5",IsMaster]);
	cmCalcSKUString();
}

function cmDisplayShop5s() {
	cmDisplayShops();
}

/* render the aggregated order lineitems with Shop 9 tags*/
function cmDisplayShop9s(){
	cmCalcSKUString();
	cmDisplayShops();
}

function cmCalcSKUString() {
	__skuString = "";
	var __skuStringArray = new Array();
	for (var i = 0; i < __sArray.length; ++i) {
		// aggregate
		var __skuStringArrayIndex = -1;
		for (var y = 0; y < __skuStringArray.length; ++y) {
			if (__sArray[i][1] == __skuStringArray[y][0] ) {
				__skuStringArrayIndex = y;
			}
		}
		if (__skuStringArrayIndex == -1) {
			// it doesn't exist, so add it
			var newArrayIndex = __skuStringArray.length;
			__skuStringArray[newArrayIndex] = new Array();
			__skuStringArray[newArrayIndex][0] = __sArray[i][1];
			__skuStringArray[newArrayIndex][1] = __sArray[i][7];
			__skuStringArray[newArrayIndex][2] = __sArray[i][5];
		}
		else {
			// it exists, so update it
			var __oP = __skuStringArray[__skuStringArrayIndex][1];
			var __oQ = __skuStringArray[__skuStringArrayIndex][2];
			__skuStringArray[__skuStringArrayIndex][2] = parseInt(__sArray[i][5]) + __oQ;
			__skuStringArray[__skuStringArrayIndex][1] = (__oP*__oQ+__sArray[i][7]*__sArray[i][5])/(parseInt(__sArray[i][5])+parseInt(__oQ));
		}
	}
	for (var x = 0; x < __skuStringArray.length; ++x) {
		__skuString += "|"+__skuStringArray[x][0]+"|"+__skuStringArray[x][1]+"|"+__skuStringArray[x][2]+"|";
	}
}

function cmDisplayShops() {
	var i;
	for (i = 0; i < __sArray.length; ++i) {
		cmMakeTag(__sArray[i]);
	}
	__sArray = new Array();
}

function cmCreateOrderTag(orderID, orderTotal, orderShipping, customerID, 
			  customerCity, customerState, customerZIP, custID, attributes) {
	var pattern = /[^\-0-9\.]/gi;
    orderShipping = orderShipping.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}	
	cmMakeTag(["tid","3","osk",__skuString,"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"or1",custID,"cm_exAttr",cm_exAttr]);
	__skuString = "";
}

/*
 * Creates a Conversion Event tag
 *
 * eventID			: required. Conversion event ID
 * actionType		: required. 1=conversion initiation, 2=conversion completion
 * categoryID		: optional. Category for the event
 * points			: optional. Point value to assign to conversion.
 */
 function cmCreateConversionEventTag(eventID, actionType, categoryID, points,attributes) {
 	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points,"cm_exAttr",cm_exAttr]);
}

function cmCreateRegistrationTag(customerID, customerEmail, customerCity,
				customerState, customerZIP, customerGender, newsletterName, 
				subscribe) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"gd",customerGender,"nl",newsletterName,"sd",subscribe]);
}

function cmCreateErrorTag(pageID, categoryID) {
	if(pageID == null) {
		pageID = cmGetDefaultPageID();
	}
	cmMakeTag(["tid","404","pi",pageID,"cg",categoryID,"pc","Y"]);
}

function cmMakeTag(__v) {
	var cm = new _cm("vn2", "e4.0");
	var i;
	for (i = 0; i < __v.length; i += 2) {
		var _n = __v[i];
		var _v = __v[i + 1];
		cm[_n] = _v;
	}
	
	var datestamp = new Date();	
	var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();	
	cm.rnd = stamp;
	
	if (cm.tid == "6") {
		cm.addTP();
		document.cookie = "cmTPSet=Y; path=/";
	}

	if (cm.tid == "1") {
		if (cI("cmTPSet") != 'Y') {
			cm.tid = "6";
			cm.pc = "Y";
			cm.addTP();
			document.cookie = "cmTPSet=Y; path=/";
		}
	}

	if (cm.tid != "4" && typeof(cm.cm_exAttr)!="undefined"){
		switch(cm.tid){
			case "6":
				prefix="pv";
				break;
			case "1":
				prefix="pv";
				break;
			case "5":
				prefix="pr";
				break;
			case "3":
				prefix="o";
				break;
			case "14":
				prefix="c";
				break;
			case "15":
				prefix="e";
				break;
			default:
				break;
		}		
		var attrNum=cm.cm_exAttr.length;
		if (attrNum>15){
			attrNum=15;
		}
		for (i=0;i<attrNum;i++){
			Attval=prefix+"_a"+(i+1);
			cm[Attval]=cm.cm_exAttr[i];
		}
		cm.cm_exAttr=null;
	}	
	if ((cm.pi == null) && (cm.pc == "Y")) {
		cm.pi = cmGetDefaultPageID();
	}
	if (refURL) {		
		cm.rf = refURL;
	}
	if (cmReferrer && !cm.rf){
		cm.rf = cmReferrer;	
	}
	if (!cm.rf){
		cm.rf=ParseRef(document.location.href)
	}
	try{
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
			if (cm.pc == "Y") {
		parent.cm_ref = document.URL;
	}
		}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
			if (cm.pc == "Y") {
		parent.cm_ref = cm.ul;
		parent.cm_set_mmc = false;
	}
		}
	}
	catch(err){}

	if (cm.ul == null) {
		cm.ul = window.location.href;
	}

	//check for zero price and zero quantity
	cmSafeZero(cm,["qt","bp","tr","sg"]);

	//check for manual_cm_mmc parameter;
	if (this.manual_cm_mmc != null) {
		cm.ul = cm.ul + ((cm.ul.indexOf("&") == -1) ? ((cm.ul.indexOf("?") == -1) ? "?" : "&") : "&") + "cm_mmc=" + this.manual_cm_mmc;
	}

	// convert MMC parameters to lowercase;
	cm.ul = cm.ul.replace(/cm_mmc/gi,"cm_mmc");
	cm.ul = cm.ul.replace(/cm_ven/gi,"cm_ven");
	cm.ul = cm.ul.replace(/cm_cat/gi,"cm_cat");
	cm.ul = cm.ul.replace(/cm_pla/gi,"cm_pla");
	cm.ul = cm.ul.replace(/cm_ite/gi,"cm_ite");
	if (cmCheckCMEMFlag){cmStartTagSet();}
		cm.writeImg();
	if (cmCheckCMEMFlag) {
		cmCheckCMEMFlag = false;	
		cmCheckCMEM();
	cmSendTagSet();
	}

	// Intelligent Offer call
	if (typeof cm_ted_io == 'function') {
		cm_ted_io(cm);
	}
}

function cmCreateUserErrorTag(pageID, categoryID, mMsgCode, mMsgType, mMsgClass, mMsgDesc, mServerName, mCloneName) {
     cmMakeTag(["tid","7","li",52,"ps2",pageID,"ps3",categoryID,"ps4",mMsgCode,"ps5",mMsgType,"ps6",mMsgClass,"ps7",mMsgDesc,"ps8",mServerName,"ps9",mCloneName]);
}

function cmCreateDelayedShopTag(productID, productName, productQuantity, productPrice, categoryID, cmReason, cmShipDays) {
     cmMakeTag(["tid","7","li",50,"ps2",productID,"ps3",productName,"ps4",productQuantity,"ps5",productPrice,"ps6",categoryID,"ps7",cmReason,"ps8",cmShipDays]);
}

function cmCreateDivisionTag(cmDivisionID, cmZipCode) {
     cmMakeTag(["tid","7","li",51,"ps2",cmDivisionID,"ps3",cmZipCode]);
}

// HELPER FUNCTIONS -----------------------------------------------------------
/* These functions are used by the tag-generating functions and/or may be used
 * in in general as convenience functions
 */

function cmGetDefaultPageID() { 
	var pageName = window.location.pathname; 

	// eliminates everything after "?" (for Opera browswers)
	var tempIndex1 = pageName.indexOf("?");
	if (tempIndex1 != -1) {
		pageName = pageName.substr(0, tempIndex1);
	}
	// eliminates everything after "#" (for Opera browswers)
	var tempIndex2 = pageName.indexOf("#");
	if (tempIndex2 != -1) {
		pageName = pageName.substr(0, tempIndex2);
	}
	// eliminates everything after ";"
	var tempIndex3 = pageName.indexOf(";");
	if (tempIndex3 != -1) {
		pageName = pageName.substr(0, tempIndex3);
	}

	var slashPos = pageName.lastIndexOf("/");
	if (slashPos == pageName.length - 1) {
		pageName = pageName + "default.asp"; /****************** SET TO DEFAULT DOC NAME */
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substr(1,pageName.length);
	}

	return(pageName); 
} 

function cmIndexOfParameter (parameter, inString) {
	return inString.indexOf(parameter);
}

function cmExtractParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return null;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	var middle = s.indexOf("=", begin);
	return s.substring(middle + 1, end);
}

function cmRemoveParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return inString;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var start = (begin - 1);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	if (s.substring(start, begin) == "?") {    // retain leading "?"
		start = (start + 1);
		end = (end + 1);
	}
	return s.substring(0, start) + s.substring(end, s.length);
}

function cmCheckCMEM() {
	if (cmIndexOfParameter("cm_em",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_em",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
	if (cmIndexOfParameter("cm_lm",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_lm",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}		
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
}

function cmSafeZero(cm, checkArray) {
	// put logic here to convert number 0 to string "0"
	for (var i = 0; i < checkArray.length; ++i) {
		if ((cm[checkArray[i]] != null) && (cm[checkArray[i]] == 0)) {
			cm[checkArray[i]] = "0";
		}
	}
}

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
    var newURL = url;
	var pageURL=document.URL;
    if (isHref) {
		if (pageURL.toLowerCase().indexOf("www.") || pageURL.toLowerCase().indexOf("www1.")){
			pageURL=pageURL.substr(pageURL.indexOf(".")+1);
		}
		if (newURL.toLowerCase().indexOf("www.") || newURL.toLowerCase().indexOf("www1.")){
			newURL=newURL.substr(newURL.indexOf(".")+1);
		}

		if ((pageURL.toLowerCase().indexOf("/search/")>-1 || pageURL.toLowerCase().indexOf("/bag/")>-1) && (newURL.toLowerCase().indexOf("/product/")>-1 || newURL.toLowerCase().indexOf("/search/")>-1 || newURL.toLowerCase().indexOf("searchpagination")>-1)) {
			var whiteList = ["cm_re=", "cm_re_o=", "cm_sp=", "cm_sp_o=","cm_mmc=","cm_mmc_o="];
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
						if (params[i].toLowerCase().indexOf(whiteList[j].toLowerCase()) == 0) {
							keepParams[keepParams.length] = params[i];
						}
					}
				}
			}
			if (newURL.toLowerCase().indexOf("searchpagination")>-1){
				newURL="/search/results.ognc";
			}
			else {
				newURL += "?" + keepParams.join("&");
			}
		}
		else{
		    var blackList = ["LinkShareID=", "LinkshareID=", "PartnerID=", "BannerID="];
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

/*  hash functions that support shop aggregation with attributes */
function cm_hex_sha1(s)    { return cm_rstr2hex(cm_rstr_sha1(cm_str2rstr_utf8(s))); }

function cm_rstr_sha1(s)
{
  return cm_binb2rstr(cm_binb_sha1(cm_rstr2binb(s), s.length * 8));
}

function cm_rstr2hex(input)
{
  var hex_tab = 0 ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

function cm_str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

function cm_rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}

function cm_binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}

function cm_binb_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = cm_bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = cm_safe_add(cm_safe_add(cm_bit_rol(a, 5), cm_sha1_ft(j, b, c, d)),
                       cm_safe_add(cm_safe_add(e, w[j]), cm_sha1_kt(j)));
      e = d;
      d = c;
      c = cm_bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = cm_safe_add(a, olda);
    b = cm_safe_add(b, oldb);
    c = cm_safe_add(c, oldc);
    d = cm_safe_add(d, oldd);
    e = cm_safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

function cm_sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

function cm_sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

function cm_safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function cm_bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

//-->