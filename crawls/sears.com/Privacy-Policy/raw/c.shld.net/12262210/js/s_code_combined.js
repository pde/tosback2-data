/* SiteCatalyst code version: H.22.1
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com
Last Updated 10/02/2012 by MaAlexan@Adobe.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
var s_account=omAcct;
var s=s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkInternalFilters="javascript:,sears.com,searspr.com,kmart.com,chtah.com,shoplocal.com,mvm.com,mygofer.com,craftsman.com,kenmore.com,diehard.com,pulse.ecom.kmart.com,beta-kmart-stage.intra.sears.com,mykmart.com,expotv.com,mysears.com,184.106.1.131,184.106.1.128,184.106.1.129,opionlab.com,integration.richrelevance.com,media.richrelevance.com,recs.richrelevance.com,richrelevance.com,*.richrelevance.com"
s.linkLeaveQueryString=false
s.linkTrackVars="prop35"
s.linkTrackEvents="None"

/************************** DFA VARIABLES **************************/
/* Disabled until further notice */

s.rsid=s_account.toLowerCase();
if (s.rsid.indexOf('searscom')>-1) var dfa_CSID='1517664';
if (s.rsid.indexOf('searskmartcom')>-1) var dfa_CSID='1517990';
if (s.rsid.indexOf('searscraftsmancom')>-1) var dfa_CSID='1517991';
if (s.rsid.indexOf('searskenmorecom')>-1) var dfa_CSID='1517992';
var dfa_SPOTID='2824997'; // DFA Spotlight ID
var dfa_tEvar='eVar37'; // transfer variable, typically the "View Through" eVar.
var dfa_errorEvar='eVar52'; // DFA error tracking (optional)
var dfa_timeoutEvent='event66'; // Tracks timeouts/empty responses (optional)
var dfa_requestURL="http://fls.doubleclick.net/json?spot=[SPOTID]&src=[CSID]&var=[VAR]&host=integrate.112.2o7.net%2Fdfa_echo%3Fvar%3D[VAR]%26AQE%3D1%26A2S%3D1&ord=[RAND]"; // the DFA request URL
s.maxDelay="2000" // maximum time to wait for DFA, in milliseconds
var dfa_visitCookie="s_dfa"; // The name of the visitor cookie to use to restrict DFA calls to once per visit.
var dfa_overrideParam="ADID"; // A query string paramter that will force the DFA call to occur.
var dfa_newRsidsProp; //="prop34"; // Stores the new report suites that need the DFA tracking code. (optional)

/************************ END DFA Variables ************************/

/* Set Cookie Domain Periods */
s.cookieDomainPeriods="2"
s.fpCookieDomainPeriods="2"

var d=window.location.hostname
if (d.indexOf('pulse.ecom.sears')>1|d.indexOf('beta-sears-stage')>1){
   s.cookieDomainPeriods="3";
   s.fpCookieDomainPeriods="3";
}

/* Plugin Config */
s.usePlugins=true
/* Search Term De-Duplication Config */
s.successfulSearchEvent 		= 'event25';
s.nullSearchEvent 				= 'event26';
s.searchTermVariable		    = 'eVar4';

/* DynamicObjectIDs config */
/*function s_getObjectID(o) {
	var ID=o.href;
	return ID;
}
s.getObjectID=s_getObjectID */


function s_doPlugins(s) {

	s.bStartOfVisit = (s.getVisitStart("s_visit") == 1) ? true : false;

	// A Date object for use below.
	var dateToday = new Date();
	// A Date object set 1 days in the past for expiring cookies
	var date1DayOld = new Date();
	date1DayOld.setDate(date1DayOld.getDate()-1);
	// A Date object set 30 days in the future
	var date30DaysOut = new Date();
	date30DaysOut.setDate(date30DaysOut.getDate()+30);

	// Returns "New" or "Repeat" visitor. 5 year cookie expiration.
	s.visitorNewRepeat = s.getNewRepeat(1825, 's_gnr');

	/* Previous pageName */
	var s_prevPage=s.getPreviousValue(s.pageName,'gpv_pn','');

	/*capture social.sears.com referrer with a wlref param*/
	s.eVar63=s.getQueryParam('wlref').toLowerCase();

	var searsCheckoutPages = 'Product Options|Shopping Cart|CartPickupOverlay|Checkout Login|Shipping Information|Shipping Information Alternate|Shipping Cost Page|Delivery Options|SPU Order Options|SPU Order Options > In Stock Modal|Review Page|Review Order|Order Confirmation';
	var bIsCheckoutPage = false;
	if (s.pageName && RegExp('^('+searsCheckoutPages+')$','i').test(s.pageName)) bIsCheckoutPage = true;

	/* ShopYourWay-to-Sears Tracking - added 1/20/2012
	 * Revised 6/18/2012 to add QA & Dev environment detection
	 * Revised 8/14/2012 to exclude pages not in the Sears checkout flow.
	 */
	// Retrieve SYW RSID from cookie.
	var s_SYWRSID = s.c_r('s_SYWRSID');
	// If cookie is not present, but user landed in the checkout flow directly from SYW, drop the cookie.
	if (!s_SYWRSID && RegExp('^(Product Options|Shopping Cart)$','i').test(s.pageName) && (s.eVar63.indexOf("sscart") > -1 || (document.referrer && /(social\.sears|shopyourway)\.com/i.test(document.referrer)))){
		// Set the SYW RSID to the same environment as the Sears RSID.
		s_SYWRSID = (s_account.indexOf('dev') > -1) ? 'searssocialnewsitedev' : (s_account.indexOf('qa') > -1) ? 'searssocialqanew' : 'searssocialprodnew';
		// Write the SYW RSID to a cookie with session expiration.
		s.c_w('s_SYWRSID',s_SYWRSID,0);
	}
	// If user has the RSID cookie and this page is in the checkout flow, append the RSID to s_account.
	if (s_SYWRSID && bIsCheckoutPage){
		// Append ShopYourWay report suite to s_account.
		s.sa(s_account+','+s_SYWRSID);
		// Expire cookie on purchase
		if (s.purchaseID){
			s.c_w('s_SYWRSID','',date1DayOld);
		}
		}

	/* FitStudio-to-Sears Tracking - added 7/18/2012
	 * Revised 8/14/2012 to exclude pages not in the Sears checkout flow.
	 */
	// Retrieve Fit Studio RSID from cookie.
	var s_FSRSID = s.c_r('s_FSRSID');
	// If cookie is not present, but user came from FitStudio.com, drop the cookie.
			// Referrer is a Sears API, not FitStudio.com. Referrer example:
			// http://www.sears.com/shc/s/APICheckOutCmd?storeId=10153&catalogId=12605&shcapiBypassSSO=true&redirectURL=http://www.sears.com/shc/s/OrderItemDisplayView&JSESSIONID=0000o25lEkxPHeJaqIHkY_6thTO:16rg0fjpq&wcid_10153=2112656105&WC_PERSISTENT=R7N3SGBLgup94leKe
	if (!s_FSRSID && bIsCheckoutPage && document.referrer && document.referrer.indexOf("APICheckOutCmd?storeId=10153&catalogId=12605") > -1){
				// Set the FitStudio RSID to the same environment as the Sears RSID.
				s_FSRSID = (s_account.indexOf('dev') > -1) ? 'searsgearfitclubdev' : (s_account.indexOf('qa') > -1) ? 'searsgearfitclubdev' : 'searsgearfitclubprod';
				// Write the FitStudio RSID to a cookie with 30 day expiration.
		s.c_w('s_FSRSID',s_FSRSID,date30DaysOut);
			}
		// If user has the RSID cookie and this page is in the checkout flow, append the RSID to s_account.
		if (s_FSRSID && bIsCheckoutPage){
			// Append FitStudio report suite to s_account.
			s.sa(s_account+','+s_FSRSID);
			// Expire cookie on purchase
			if (s.purchaseID){
				s.c_w('s_FSRSID','',date1DayOld);
		}
		}


	// For product compare count
	s.prop37=s.getQueryParam("prodCount");

	s.events=s.events?s.events:"";

	/* Force search term to lower case and copy to eVar4 */
	if(s.prop11) {
		s.prop11=s.prop11.toLowerCase();
		s.eVar4=s.prop11;
		// record original search page
		s.prop48=s_prevPage;
	}
	if(s.events.indexOf('event55') > -1)
		s.prop24=s_prevPage;

	/* seach redirect */
	if(s.getQueryParam("redirectType")){
		s.prop70="Search Redirect > "+s.getQueryParam("redirectType")+" > "+s.pageName;
	}
	if(s.prop11&&!s.prop70){
		s.prop70='Search Redirect > No Redirect';
	}
	/*copy search redirect from prop to evar*/
	if(s.prop70){
		s.eVar70="D=c70";
	}

	/*capture search corrections*/
	var kwdTemp = escape(getQSorCookieVal(false, "keyword"));
	var usrKwdTemp = escape(getQSorCookieVal(false, "usrKeyword"));

	if(kwdTemp && usrKwdTemp) {
		s.prop11=s.eVar4=kwdTemp.toLowerCase();
		s.events=s.apl(s.events,'event95',',');
		s.eVar69=usrKwdTemp+">>"+kwdTemp;
	} else if(s.prop11){
		s.eVar69="Non-misspelled Search";
	}

	/*
	 * Suppress the search and null search events if the same
	 * search term is passed in more than once
	 */
	var t_search = s.getValOnce(s[s.searchTermVariable], 'ev1', 0);
	if (t_search == '') {
		var a=s.split(s.events,',');
		var e='';
		for (var i = 0; i < a.length; i++) {
			if(a[i] == s.successfulSearchEvent)
				continue;
			else if(a[i] == s.nullSearchEvent)
				continue;
			else if(a[i] == 'event95')
				continue;
			else
				e += a[i]?a[i]+',':a[i];
		}
		s.events=e.substring(0,e.length-1);
	}
	/*
	 * Set a blank product string whenever a search occurs and no product
	 * is present on the page to make sure the search term is bound to
	 * the search event
	 */
    if (t_search && t_search != 'undefined' && !s.products)
        s.products = ";";

    /* Copy refinement type and attribute from props 4 and 5 */
    if(!s.eVar9 || s.eVar9 == 'undefined' && s.prop4)
    	s.eVar9 = s.prop4;
    if(!s.eVar10 || s.eVar10 == 'undefined' && s.prop5)
    	s.eVar10 = s.prop5;


	//collect paid search / internal kiosk paramater
	if(s.c_r('kiosk_psid')) s.eVar21=s.c_r('kiosk_psid');
	if(!s.eVar21)			s.eVar21=s.getQueryParam('PSID');

	//collect Responsys lid code
	if(!s.eVar23)
		s.eVar23=s.getQueryParam('LID');


	/* Channel Manager Config */
	s._channelPattern="Affiliates|IAx>Affiliates|iax>Affiliates|i008>Affiliates|"
	+"I008>Affiliates|KAx>Affiliates|kax>Datafeeds|IDx>Datafeeds|idx>Datafeeds|K"
	+"Dx>Datafeeds|kdx>Email Promo|iox>Email Promo|IOx>Email Triggered|ITx>Email"
	+" Triggered|itx>Email Transaction|IEx>Email Transaction|iex>Kiosk|Kiosk>Kio"
	+"sk|kiosk>Direct Affiliate: Sears|IDAx>Direct Affiliate: Sears|idax>Media|I"
	+"Mx>Media|imx>Community|comm>Social Media|ISm>Social Media|ism>Deals and Pr"
	+"omotions|IPr>Deals and Promotions|ipr>Blogs|IBx>Blogs|ibx>Direct Affiliate"
	+": Kmart|KDAx>Direct Affiliate: Kmart|kdax>exclude|K-on-Sx>exclude|S-on-Kx>CD CC Phone|CDPhone"
	+"SMS|SMSx>SMS|smsx>QR Code|QRx>QR Code|qrx";

    /* External campaign tracking with channel manager */
	s.channelManager('sid');

	// Paid search is not always properly detected, presumably because SID code is not always present.
	// If there was no SID but user came from a search engine they would get the Natural Search channel.
	// SID and PSID could be passed into channelManager, but it would return s._campaign with both concatenated, which is not desired.
	if(s._channel=='Natural Search' && s.eVar21) s._channel = 'Paid Search';

	if(s._channel == "Direct Load"){
		//suppress channel manager for direct page loads
		s._campaign=s._channel=s._referrer=s._referringDomain=s._keywords=s._partner=s._referringDomain="";
		//set product finding method to direct
		s.eVar40='Direct';
	}
	if(s._channel == "exclude"){
		//suppress channel manager for prefixes identified for exclusion
		s._campaign=s._channel=s._referrer=s._referringDomain=s._keywords=s._partner=s._referringDomain="";
	}
	if(!s.campaign && s._campaign)
		//set s.campaign from channel mgr generated value s._campaign
		s.campaign=s._campaign;
	if (s._channel == 'Referrers'){
		//create campaign ID for unpaid referrers
			//do not set for Paypal purchases or site to site referrals
		var excludeRef=s._referringDomain.indexOf('sso.shld.net');
		if(excludeRef == -1)
			excludeRef=s._referringDomain.indexOf('sso.shld.net:443');
		if ((excludeRef > -1) || (location.protocol=='https:' && s._referringDomain.indexOf('paypal.com') > -1)){
                s._campaign=s._channel=s._referrer=s._referringDomain=s._keywords=s._partner=s._referringDomain=s.campaign="";
           }
           else {
				s.eVar24 = 'nsref:'+ s._referringDomain;
				//do not set s.campaign
				s.campaign='';
			}
		}
	if(s._channel=='Natural Search'){
		var URLPath = window.location.pathname;
		var aKeywords = s.split(s._keywords,' ');

		// If tName, search, or keyword paramaters are in the URL and the referrer is a search engine, then the traffic came from BloomReach
		if (s.getQueryParam('tName') || s.getQueryParam('tname')){
			s.eVar24='seo:' + s._partner + ':BloomReach:Thematic';
		} else if (s.getQueryParam('keyword') || s.getQueryParam('search') || URLPath.indexOf('search=') > -1){
			s.eVar24='seo:' + s._partner + ':BloomReach:Search';

		} else if (URLPath.indexOf('/dap_') > -1 || URLPath.indexOf('/dap-') > -1){
			s.eVar24='seo:' + s._partner + ':BrandShowcase';

		// Detect types of search redirects
		} else if (URLPath.indexOf('/v_') > -1 || URLPath.indexOf('/v-') > -1){
			s.eVar24='seo:' + s._partner + ':Vertical';
		} else if (URLPath.indexOf('/c_') > -1 || URLPath.indexOf('/c-') > -1){
			s.eVar24='seo:' + s._partner + ':Category';
		} else if (URLPath.indexOf('/s_') > -1 || URLPath.indexOf('/s-') > -1){
			s.eVar24='seo:' + s._partner + ':Sub-Category';
		} else if (URLPath.indexOf('/nb_') > -1 || URLPath.indexOf('/nb-') > -1){
			s.eVar24='seo:' + s._partner + ':Non-Browse';
		} else if (URLPath.indexOf('/p_') > -1 || URLPath.indexOf('/p-') > -1){
			s.eVar24='seo:' + s._partner + ':Product';
			// If this is a Marketplace product page identify who sells the product
			if (!!s.products && s.products.indexOf(";SPM") > -1){
				s.eVar24 += "-Marketplace"; // Indicates a product page where Merchants sell the product
				if (s.products.indexOf("evar8=SHC") > -1){
					s.eVar24 += "-&-Sears"; // Indicates a product page where Merchants and Sears sell the product
				}
			} else {
				s.eVar24 += "-Sears";       // Indicates a product page where only Sears sells the product
			}

		// Detect visitors who use a search engine as a browser address bar. For instance, they search for only "sears.com".
		} else if (aKeywords.length == 1 && RegExp('^(www.sears.com|sears.com|sears|sear)$','i').test(aKeywords[0])){
			s.eVar24='seo:' + s._partner + ':DTS';

		// Otherwise this is a standard search engine referral
		} else {
			s.eVar24='seo:' + s._partner + ':other';
		}

		//do not set s.campaign
		s.campaign='';
		//set natural search keyword
		s.eVar14=s._keywords;
		//overwrite paid search keyword
		s.eVar13='Other';
	}
	if(s._channel=='Paid Search'){
		//set paid search keyword
		s.eVar13=s._keywords;
		//overwrite natural search keyword
		s.eVar14='Other';
		// Set channel and campaign variables. eVar2 is based on eVar24.
		if (s._campaign) s.eVar24=s.campaign=s._campaign;  // Set to SID code
		if (!s.eVar24 && s.eVar21) s.eVar24=s.campaign=s.eVar21;  // If no SID code, set to PSID
	}
	if(s._channel && s._channel != 'Paid Search' && s._channel != 'Natural Search'){
		//overwrite keywords for non-search campaigns
		s.eVar13=s.eVar14='Other';
	}
	if(s._channel=='Paid Non-Search'){
		//rename channel
		s._channel='Other Channel';
	}

	if (s.getQueryParam('adid'))
    s._channel="Media Click";

	if(!s.eVar24)
		s.eVar24=s._campaign;


	//set click-through and click-past events
	s.clickPast(s.eVar24,'event15','event19');

	if (s.eVar24 && typeof s.eVar24 != 'undefined'){
	    //set product finding method for external campaigns
	    s.eVar40='External Campaigns';
		//set page name and page type pathing variables
		s.prop13=s._channel + ': '+s.prop27;
		s.prop18=s._channel + ': '+s.pageName;
		// copy campaigns to traffic variable and eVar
		s.prop8=s.eVar2=s.eVar6=s.eVar24;
		//assign 'other' to eVar21 if no psid is present
		if(!s.eVar21 || typeof s.eVar21 == 'undefined')
			s.eVar21='Other';
		//assign 'other' to eVar23 if no Responsys LID is present
		if(!s.eVar23 || typeof s.eVar23 == 'undefined')
			s.eVar23='Other';
	}
	else{
		//fill in pathing variables if campaign is not present
		s.prop13=s.prop27;
		s.prop18=s.pageName;
	}

	/* Kiosk Cookie */
	if(s.c_r('sid')&&s.c_r('sid').toLowerCase().indexOf('kiosk')==0)
		s.campaign=s.eVar2=s.eVar6=s.eVar24=s.c_r('sid');
	else if(s.c_r('DEALER_FACILITY_COOKIE'))
		s.campaign=s.eVar2=s.eVar6=s.eVar24='kiosk_dealer_facility';

	/* DFA Channel Logic */
	if (s.getQueryParam('adid'))
		s.eVar24=s.eVar2=s.eVar6="Media";

	if(!s.eVar71 && s.eVar2)
		s.eVar71=s.eVar2;
	if(navigator.userAgent.toLowerCase().indexOf('shc-kiosk')>=0)
		s.eVar71='kiosk';
	if(s.eVar71)
		s.eVar72='0-3h';

	if (s.eVar24 && typeof s.eVar24 != 'undefined'){
		// Translate SID codes into channels. This used to be done by a VISTA Rule.
		var tmpChannel = '';
		var s_eVar24 = s.eVar24.toLowerCase();
		if (s_eVar24.indexOf('iaespx')==0) tmpChannel='Affiliates > Espanol';
		else if (s_eVar24.indexOf('iaprgx')==0) tmpChannel='Affiliates > Puerto Rico';
		else if (s_eVar24.indexOf('kiosk')==0) tmpChannel='Kiosk';
		else if (s_eVar24.indexOf('comm')==0) tmpChannel='Community';
		else if (s_eVar24.indexOf('smsx')==0) tmpChannel='SMS';
		else if (RegExp('^(idax|kdax|mdax)').test(s_eVar24)) tmpChannel='Direct Affiliate';
		else if (RegExp(/^(isx|ksx|msx|\d{2}x)/).test(s_eVar24)) tmpChannel='Paid Search';
		else if (RegExp('^(idx|kdx|mdx)').test(s_eVar24)) tmpChannel='Datafeeds';
		else if (RegExp('^(iax|i008|kax|max)').test(s_eVar24)) tmpChannel='Affiliates';
		else if (s_eVar24.indexOf('cj')==0) tmpChannel='Affiliates CJ';
		else if (s_eVar24.indexOf('ibx')==0) tmpChannel='Blogs';
		else if (s_eVar24.indexOf('dfa')==0) tmpChannel='Media';
		else if (s_eVar24.indexOf('imx')==0) tmpChannel='Media';
		else if (s_eVar24.indexOf('ism')==0) tmpChannel='Social Media';
		else if (s_eVar24.indexOf('io')==0) tmpChannel='Email Promotional';
		else if (s_eVar24.indexOf('it')==0) tmpChannel='Email Triggered';
		else if (s_eVar24.indexOf('ie')==0) tmpChannel='Email Transaction';
		else if (s_eVar24.indexOf('ipr')==0) tmpChannel='Deals and Promotions';
		else if (s_eVar24.indexOf('qrx')==0) tmpChannel='QR Code';
		if (!!tmpChannel){
			s.eVar2=s.eVar24=tmpChannel;
			//set channel level campaign stacking
			s.eVar7=s.crossVisitParticipation(tmpChannel,'s_cvp_v7','30','5','>');
		} else {
			// eVar24 holds a SID/PSID code that doesn't match any channels above
			s.eVar2=s.eVar24;
			//set channel level campaign stacking
			s.eVar7=s.crossVisitParticipation(s._channel,'s_cvp_v7','30','5','>');
	}
	}


	/* Collect ad cell and concatenate with the previous page */
	var s_adCell = s.getQueryParam('adCell');
	if(!s.prop7 && s_adCell)
		s.prop7=s.eVar3=s_prevPage+':'+s_adCell;

	/* Stack merchandising category values */
	if(s.eVar11){s.eVar47=s.crossVisitParticipation(s.prop1,'s_v47','1','5',' | ','purchase')};

    /* Set up dynamic object IDs */
	//s.setupDynamicObjectIDs();

	/* Plugin Example: trackTNT 1.0 */
	s.tnt = s.trackTNT();

	if(s.purchaseID){
	/* Copy purchaseID to an eVar */
		s.eVar42=s.transactionID=s.purchaseID;

		/* Set serialized event whenever a purchase occurs. SC will only count it once per visit. */
		s.events=s.apl(s.events,'event75',",",1);
	}

	/*
	* Make sure that prodView and event10 are always set together and that both are
	* set when a quick view or a collection event is detected
	*/
	var s_prodEvents=new Array();
	s_prodEvents[0]=s.events.indexOf('prodView');
	s_prodEvents[1]=s.events.indexOf('event10');
	s_prodEvents[2]=s.events.indexOf('event27');
	s_prodEvents[3]=s.events.indexOf('event40');

	for (var i = 0; i < s_prodEvents.length; i++){
		if(s_prodEvents[i] > -1){
			if (s_prodEvents[0] == -1){
				s.events=s.events + ',prodView';
				s_prodEvents[0]=1;
			}
			if (s_prodEvents[1] == -1){
				s.events=s.events + ',event10';
				s_prodEvents[1]=1;
			}
		}
	}

	/* Capture Finder product finding method */
	if(s.getQueryParam('gbtId'))
		s.eVar40='Finder:'+s.getQueryParam('gbtId');

    /* Capture List Page Number */
	var s_pagenumber=s.getQueryParam('pageNum');
	if(s_pagenumber)
		s.prop38='Page Number > '+s_pagenumber;
	if(!s_pagenumber&&s.prop27&&(s.prop27.toLowerCase()=='search results'||s.prop27.toLowerCase()=='subcategory'))
		s.prop38='Page Number > 1';

	/* Capture eCatalog Name */
	if (s.getQueryParam('ecatalog'))
		s.eVar54=s.getQueryParam('ecatalog');

  	/* Capture the associate ID and unit # */
  	s.eVar32=s.getQueryParam('omnCn');

	/* Set Search Keyword in prop32 on PDP and Quick View after a search is performed */
	//Don't count Top Rated product views
	if (!s.getQueryParam('mv')){
		//Product Views
		  if (s.events.indexOf("prodView") > -1){
			if (document.referrer.indexOf("keyword") > -1){
			  s.prop32=s.getQueryParam("keyword",'',document.referrer);
			}
			//Quick Views
			if (s.events.indexOf("event27") > -1 && s.getQueryParam("keyword")){
			  s.prop32=s.getQueryParam("keyword");
			}
		}
	}

	// Overwrite marketing channel variables with values from partner sites
	if (getQSorCookieVal(true, "eVar2")){
		s.eVar2 = getQSorCookieVal(true, "eVar2");
		document.cookie = 'eVar2=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	if (getQSorCookieVal(true, "campaign")){
		s.campaign = getQSorCookieVal(true, "campaign");
		document.cookie = 'campaign=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	if (getQSorCookieVal(true, "eVar6")){
		s.eVar6 = getQSorCookieVal(true, "eVar6");
		document.cookie = 'eVar6=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	if (getQSorCookieVal(true, "eVar7")){
		s.eVar7 = getQSorCookieVal(true, "eVar7");
		document.cookie = 'eVar7=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	if (getQSorCookieVal(true, "eVar21")){
		s.eVar21 = getQSorCookieVal(true, "eVar21");
		document.cookie = 'eVar21=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	if (getQSorCookieVal(true, "eVar24")){
		s.eVar24 = getQSorCookieVal(true, "eVar24");
		document.cookie = 'eVar24=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}


	/***** Internal Campaign Stacking *****
	 Example: s.eVar5="syw_cmp1123|xsite_Craftsman|xsite_ShopYourWay"
	 Only add unique values (case-insensitive) to the list.
	 eVar5 and the s_e5 cookie are both set to visit expiration.
	*/
	var s_eVar5 = s.c_r('s_e5');
	var s_eVar5Array = s.split(s_eVar5,'|');
	var s_eVar5ArrayStartLength = s_eVar5Array.length;
	/* Internal Campaigns - eVar5 set on the page */
	if (s.eVar5 && s_eVar5.indexOf(s.eVar5) == -1){
		s_eVar5Array[s_eVar5Array.length] = s.eVar5;
	}
	/* Internal Campaigns - ManageMyLife Article ID in mml parameter */
	var s_mml = s.getQueryParam('mml');
	if (s_mml && s_eVar5.indexOf(s_mml) == -1){
		s_eVar5Array[s_eVar5Array.length] = s_mml;
		// Set Product Finding Method
		if (!s.eVar40) s.eVar40="Manage My Life Article";
	}
	/* Internal Campaigns - intcmp parameter */
	var s_intcmp = s.getQueryParam('intcmp');
	if (s_intcmp && s_eVar5.indexOf(s_intcmp) == -1){
		s_eVar5Array[s_eVar5Array.length] = s_intcmp;
		// Set Product Finding Method
		if (!s.eVar40) s.eVar40="Internal Campaigns";
	}
	// If s.eVar5 was not set on the page and no internal campaign code is in the URL, then see if the referrer is a partner site.
	if (document.referrer && !s.eVar5 && !s_intcmp && !s_mml){
		// syntax: s._searsSites=[campaign1]|[site1]>[campaign2]|[site2]>[campaign3]|[site3]>...
	s._searsSites="xsite_Sears|sears.com>xsite_Kmart|kmart.com>xsite_LE|landsend.com>xsit"
	+"e_TGI|thegreatindoors.com>xsite_ManageMyLife|managemylife.com>xsite_PartsDirect|sear"
	+"spartsdirect.com>xsite_Craftsman|craftsman.com>xsite_Kenmore|kenmore.com>xsite_MyGof"
	+"er|mygofer.com>xsite_SearsCanada|sears.ca>xsite_ServiceLive|servicelive.com>xsite_Sh"
	+"opYourWayRewards|shopyourwayrewards.com>xsite_SearsHometown|searshometownstores.com>"
	+"xsite_SearsFlowers|searsflowers.com>xsite_SearsOptical|searsoptical.com>xsite_SearsP"
	+"ortrait|searsportrait.com>xsite_SearsPhotos.com|searsphotos.com>xsite_SearsLiquidati"
	+"ons|searsliquidations.com>xsite_DieHard|diehard.com>xsite_RideNSS|ridenss.com>xsite_"
	+"ProtegeMVP|protegemvp.com>xsite_Searsoutlet|searsoutlet.com>xsite_searsHoldings|sear"
	+"sholdings.com>xsite_KmartDesign|kmartdesign.com>xsite_FitOrbit|fitorbit.com>xsite_Sh"
	+"opYourWay|shopyourway.com"
		s_thisPage=location.host;
		s_rd=s.split(document.referrer,'/');
		s_rd=s_rd[2];
		s_rd=s.split(s_rd,'?');
		s._refDomain=s_rd[0];
		if (typeof s._refDomain != 'undefined' && s_thisPage.indexOf(s._refDomain) == -1){ //if the referring domain is different than the current domain
			s._searsSitePairs = s.split(s._searsSites, '>'); //split the array into individual campaign/site pairs
	  	  for (a = 0; a < s._searsSitePairs.length; a++) {
	    		s._searsSiteElements = s.split(s._searsSitePairs[a], '|'); //divide the pairs into campaign and site components
	    		for (b = 0; b < s._searsSiteElements.length; b++){
		    		var s_matchedDomain=s._refDomain.indexOf(s._searsSiteElements[1]);
					//if the referring domain matches a site on the list and the associated xsite value is not in the eVar5 cookie
					if (s_matchedDomain != -1 && s_eVar5.indexOf(s._searsSiteElements[0]) == -1){
						// Set eVar5 to the xsite value for the partner site
						s_eVar5Array[s_eVar5Array.length] = s._searsSiteElements[0];

						// Drop partner ID into a 30-day cookie
						var s_partnerSite = s._searsSiteElements[0].slice(s._searsSiteElements[0].indexOf("_")+1);
						s.c_w('s_referringPartner',s_partnerSite,date30DaysOut);

						// Set Product Finding Method
						if (!s.eVar40) s.eVar40="Internal Partner Site Crossing";

		    			break;
	    			}
				}
			}
		}
	}
	// Example Result: s_eVar5="syw_cmp1123|xsite_Craftsman|xsite_ShopYourWay"
	if (s_eVar5Array.length > s_eVar5ArrayStartLength){
		// Alphabetize to reduce cardinality.
		s_eVar5Array.sort();
		s_eVar5=s.join(s_eVar5Array,{delim:'|'});
	}
	// If this is the first page of the visit and there is no partner referral (eVar5 is no set), and a referring partner cookie is present,
	// then set eVar5 as a return visit from the original referring partner.
	/* This could be extended to record all referring partners "returnVisit_ShopYourWay|returnVisit_Craftsman|returnVisit_Sears".
	   If the user is on ShopYourWay.com they would not want ShopYourWay to appear in eVar5. Only "returnVisit_Craftsman|returnVisit_Sears". */
	var s_referringPartner = s.c_r('s_referringPartner');

	if (s.bStartOfVisit && !s_eVar5 && s_referringPartner){
		s_eVar5 = "returnVisit_" + s_referringPartner;
	}
	// Finalize s.eVar5 and save to a session cookie
	s.eVar5 = s_eVar5;
	if (s.eVar5) document.cookie = 's_e5=' + s.eVar5 + '; path=/';


	/***** End Internal Campaign Stacking *****


	/*Slot Analysis Variable Cleanup-remove events if click-through position is not collected*/
	if(s.products&&(s.products.indexOf('event29=;')>=0||s.products.indexOf('event29=|')>=0||s.products.indexOf('event29=undefined;')>=0)){
		s.products=s.repl(s.products,'event29=;',';');
		s.products=s.repl(s.products,'event29=|','');
		s.products=s.repl(s.products,'event29=undefined;','');
		if(s.events){
			s.events=s.repl(s.events,',event28,event29','');
		}
	}

	/*set report suite*/
	s.rsid_list="searscom=Production|searscom,searscomprod=Production|searscom,searszetacom=Social|searscom,searsbetatwo=Beta|searscom,searslmpcom=Local|searscom,searsespanolcom=Espanol|searscom,searsinternational=International|searscom,searspuertoricocomglobal,searspuertoricocom=Puerto Rico|searscom,searspuertoricocomglobal,searspuertoricocomespanol=Puerto Rico Espanol|searscom,searscraftsmancom=Craftsman|searscom,searskenmorecom=Kenmore"+"|";
	s.rsid_list_start=s.rsid_list.indexOf(s_account);
	s.linkTrackVars=s.apl(s.linkTrackVars,'prop35',',',2);
	if (s.rsid_list_start<0){
		s.prop35="Other:"+s_account;
	} else {
		s.prop35=s.rsid_list.substring(s.rsid_list.indexOf("=",s.rsid_list_start)+1,s.rsid_list.indexOf("|",s.rsid_list_start));
	}

	/** Fix products string **/
	s.products=s.products?s.products:"";
	s.products=s.repl(s.products,"|,eVar46","|eVar46");
	s.products=s.repl(s.products,"|,evar46","|evar46");

	/*Parts Finder*/
	if(s.prop46){
		s.eVar64=s.prop46;
		s.events=s.apl(s.events,'event69',',');
		if(!s.products){
			s.products=";";
		}
	}

	/* Get Percent Page Viewed */
	s.prop52 = s_prevPage;
	var ppvArray = s.getPercentPageViewed(s_prevPage);
	if (ppvArray){
		s.prop51 = ppvArray[1] + '|' + ppvArray[2];
	}
	/* To send the hit on an exit link multiple values*/
	var sURL = s.exitLinkHandler();
	if(sURL) {
		s.linkTrackVars = s.apl(s.linkTrackVars,'prop51',',',1);
		s.linkTrackVars = s.apl(s.linkTrackVars,'prop52',',',1);
		s.prop52 = s.pageName;
		var ppvArray = s.getPercentPageViewed(s.pageName);
		s.prop51 = ppvArray[1] + '|' + ppvArray[2];
	}

	/*
	 * Debugging Marketing Channels Issue where eVar2 is blank despite presence of referrer.
	 * Need to know why eVar2 is blank on first page of visit when we have a referrer.
	 * <current domain>:<current page SID>:<referring domain>:<marketing channel>:<search keywords>
	 */
	if (!s.eVar2 && s.bStartOfVisit && document.referrer){
		(function() { // Anonymous function to reduce variable scope
			//Determine if the referrer matches up with what's in linkInternalFilters.
			var bIntRef = false;
			var sDocRef = document.referrer;
			var sRef = sDocRef.substr(sDocRef.indexOf("://")+3,sDocRef.indexOf("/",sDocRef.indexOf("://")+3)-sDocRef.indexOf("://")-3);
			var aLIF = s.linkInternalFilters.toLowerCase();
			aLIF = s.split(aLIF, ',');
			for (m = 0; m < aLIF.length; m++) {
				if (sRef.indexOf(aLIF[m]) != -1){
					bIntRef = true;
					break;
				}
			}
			if (!bIntRef){
				var sSID = s.getQueryParam('sid')?s.getQueryParam('sid'):'No SID';
				s.prop54 = location.hostname.replace('www.', '') + ":" + sSID + ":" + sRef.replace('www.', '') + ":" + s._channel + ":" + s._keywords;
				// Capture the referrer for correlation
				s.prop55 = document.referrer;
			}
		})();
	}

	/*
	/* Zip Code Tracking Logic */
	/*
	/* Set event96 & event97 each time the visitor sets or retrieves a zip code. */
	if (s.eVar17 && s.eVar17 != "Not Provided" && s.eVar17 != s.getPreviousValue(s.eVar17,'gpv_v17','')){
		s.events=s.apl(s.events,'event96',",",1); // event96 is serialized
		s.events=s.apl(s.events,'event97',",",1); // event97 counts each instance
}

	//set entry page and page type
	if (s.bStartOfVisit){
		// Use and then delete value passed from partner site if available
		if (getQSorCookieVal(true, "eVar25")){
			s.eVar25 = getQSorCookieVal(true, "eVar25");
			document.cookie = 'eVar25=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
		else {
		s.eVar25 = s.prop27 + ' | ' + s.pageName;
		}

		s.eVar75 = s.prop27;
}

	// Promo Impression Tracking
	// Add "New Visitor" or "Repeat Visitor" to the [Page Type] part of the impression details variable, prop15.
	if (s.prop15){
		arrImprDetails = s.split(s.prop15,":");
		if (arrImprDetails[3] && arrImprDetails[3].indexOf('- New') == -1 && arrImprDetails[3].indexOf('- Repeat') == -1 ) arrImprDetails[3] += " - " + s.visitorNewRepeat;
		s.prop15 = s.join(arrImprDetails,{delim:':'});
	}

	// Set Conversion Variable Syntax Merchandised eVars to Dummy Values when not explicitly set
	if (s.events.indexOf('event40')){
		if (!s.eVar68) s.eVar68 = 'Non-Collection';
}

}
s.doPlugins=s_doPlugins

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/* Custom function to get query string or cookie values - added 1.20.2012
 * s.getQueryParams was throwing JS errors because of a URL-encoded registration mark in search keywords.
 * s.getQueryParams -calls-> s.p_gpv -calls-> s.p_gvf -calls-> s.epa <-- throws JS error
 */
function getQSorCookieVal(bCookie, sParam){
	if (bCookie){
		var oInput = document.cookie;
		var sDelimiter = ';';
	} else {
		var oInput = location.search;
		var sDelimiter = '&';
	}
	sParam += "=";
	if (oInput.length > 0){
		var iStart = oInput.indexOf(sParam);
		if (iStart != -1){
			iStart += sParam.length;
			var iEnd = oInput.indexOf(sDelimiter, iStart);
			if (iEnd == -1) iEnd = oInput.length;
			return unescape(oInput.substring(iStart, iEnd));
		} else {
			return '';
		}
	} else {
		return '';
	}
}

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");

/*
 * Plugin: getPercentPageViewed v1.5
 */
s.handlePPVevents=new Function("",""
+"var s=s_c_il["+s._in+"];if(!s.getPPVid)return;var dh=Math.max(Math."
+"max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.ma"
+"x(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max("
+"s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.i"
+"nnerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeigh"
+"t),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s"
+".wd.document.body.scrollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh"
+"*100),100),c=s.c_r('s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',4):[]"
+",id=(a.length>0)?(a[0]):escape(s.getPPVid),cv=(a.length>1)?parseInt"
+"(a[1]):(0),p0=(a.length>2)?parseInt(a[2]):(pv),cy=(a.length>3)?pars"
+"eInt(a[3]):(0),cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy"
+")?vh:cy)):'';s.c_w('s_ppv',cn);");
s.getPercentPageViewed=new Function("pid",""
+"pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.l"
+"inkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'"
+"),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i="
+"3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape("
+"a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid"
+"=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('"
+"s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventL"
+"istener('load',s.handlePPVevents,false);s.wd.addEventListener('scro"
+"ll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handl"
+"ePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onlo"
+"ad',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevent"
+"s);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-'"
+")?(a):(a[1]);");

/*
 * Plugin: exitLinkHandler 0.7 - identify and report exit links
 */
s.exitLinkHandler=new Function("p","o",""
+"var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
+"e&&(h||s.linkName)))return'';i=h.href.indexOf('?');t=s[n];s[n]=p?p:"
+"t;h.ref=s.linkLeaveQueryString||i<0?h.href:h.href.substring(0,i);if"
+"(s.lt(h.href)=='e')s.linkType='e';else h='';s[n]=t;return o?h:h.hre"
+"f;");
s.p_gh=new Function("",""
+"var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o"
+"),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o"
+"=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot"
+"(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");

/*
 * Plugin: getPreviousValue v1.0 - return previous value of designated
 *   variable
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
* Plugin: clickPast - version 1.0
*/
s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");

s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Plugin: manageQueryParam v1.2 - correct parameters in query string
 */
s.manageQueryParam=new Function("p","w","e","u",""
+"var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"
+"cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"
+"?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("
+"'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"
+"(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.le"
+"ngth);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1"
+",x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.su"
+"bstring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp)"
+"{y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';var eui=0"
+";while(qv.indexOf('%25')>-1){qv=unescape(qv);eui++;if(eui==10)break"
+";}qv=s.rep(qv,'+',' ');qv=escape(qv);qv=s.rep(qv,'%25','%');qv=s.re"
+"p(qv,'%7C','|');qv=s.rep(qv,'%7c','|');qp=qp.substring(0,y+1)+qv;}i"
+"f(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs='"
+"?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else if"
+"(qp)qs='?'+qp;return u+qs;");

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/*
 *	Plugin: crossVisitParticipation v1.6 - stacks values from
 *	specified variable in cookie and returns value
 */
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!='')arry=eval(c);var e=new Date();e.setFullYear(e.getFullY"
+"ear()+5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[ar"
+"ry.length-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new"
+" Date().getTime()];var start=arry.length-ct<0?0:arry.length-ct;var "
+"td=new Date();for(var x=start;x<arry.length;x++){var diff=Math.roun"
+"d((td.getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arr"
+"y[x][0]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{deli"
+"m:',',front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join"
+"(h,{delim:dl});if(ce)s.c_w(cn,'');return r;");

/*
* TNT Integration Plugin v1.0
*/
s.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");

/*
 * channelManager v2.45 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f",""
+"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+"e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer"
+"?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.index"
+"Of('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInter"
+"nalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m+"
+"+){B=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf("
+"'//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q,r)"
+";t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSearchE"
+"ngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s."
+"repl(g,'as_q','*');}A=s.split(S,'>');T=A.length;for(i=0;i<A.length;"
+"i++){D=A[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length"
+";G++){H=j.indexOf(E[G]);if(H>-1){if(D[2])N=u=D[2];else N=t;if(d==1)"
+"{N=s.repl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo'"
+");N=s.repl(N,'%','oogle');}i=s.split(D[1],',');for(k=0;k<i.length;k"
+"++){M=s.getQueryParam(i[k],'',g).toLowerCase();if(M)break;}}}}}if(!"
+"O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';el"
+"se P='Paid Non-Search';}if(!O&&N){u=N;P='Natural Search'}}if(h==1&&"
+"!O&&v==1)u=P=t=p='Direct Load';X=M+u+t;c=c?c:'c_m';if(c!='0'){X=s.g"
+"etValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.split(g,'>');l=k."
+"length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r"
+".length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.indexOf(Y);if"
+"(i>-1)P=q[0];}}}g=s._channelParameter;if(g&&X){k=s.split(g,'>');l=k"
+".length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S="
+"r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0]}}}g=s"
+"._channelPattern;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m"
+"++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;"
+"T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H"
+"==0)P=q[0];}}}if(X)M=M?M:N?'Keyword Unavailable':'n/a';p=X&&p?p:'';"
+"t=X&&t?t:'';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?"
+"P:'';s._referrer=p;s._referringDomain=t;s._partner=N;s._campaignID="
+"O;s._campaign=u;s._keywords=M;s._channel=P;");
/* non-custom list */
s.seList="search.aol.com,search.aol.ca|query,q|AOL.com Search>ask.com"
+",ask.co.uk|ask,q|Ask Jeeves>google.co,googlesyndication.com|q,as_q|"
+"Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as_q"
+"|Google - Australia>google.be|q,as_q|Google - Belgium>google.com.br"
+"|q,as_q|Google - Brasil>google.ca|q,as_q|Google - Canada>google.cl|"
+"q,as_q|Google - Chile>google.cn|q,as_q|Google - China>google.com.co"
+"|q,as_q|Google - Colombia>google.dk|q,as_q|Google - Denmark>google."
+"com.do|q,as_q|Google - Dominican Republic>google.fi|q,as_q|Google -"
+" Finland>google.fr|q,as_q|Google - France>google.de|q,as_q|Google -"
+" Germany>google.gr|q,as_q|Google - Greece>google.com.hk|q,as_q|Goog"
+"le - Hong Kong>google.co.in|q,as_q|Google - India>google.co.id|q,as"
+"_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google.co.i"
+"l|q,as_q|Google - Israel>google.it|q,as_q|Google - Italy>google.co."
+"jp|q,as_q|Google - Japan>google.com.my|q,as_q|Google - Malaysia>goo"
+"gle.com.mx|q,as_q|Google - Mexico>google.nl|q,as_q|Google - Netherl"
+"ands>google.co.nz|q,as_q|Google - New Zealand>google.com.pk|q,as_q|"
+"Google - Pakistan>google.com.pe|q,as_q|Google - Peru>google.com.ph|"
+"q,as_q|Google - Philippines>google.pl|q,as_q|Google - Poland>google"
+".pt|q,as_q|Google - Portugal>google.com.pr|q,as_q|Google - Puerto R"
+"ico>google.ro|q,as_q|Google - Romania>google.com.sg|q,as_q|Google -"
+" Singapore>google.co.za|q,as_q|Google - South Africa>google.es|q,as"
+"_q|Google - Spain>google.se|q,as_q|Google - Sweden>google.ch|q,as_q"
+"|Google - Switzerland>google.co.th|q,as_q|Google - Thailand>google."
+"com.tr|q,as_q|Google - Turkey>google.co.uk|q,as_q|Google - United K"
+"ingdom>google.co.ve|q,as_q|Google - Venezuela>bing.com|q|Microsoft "
+"Bing>naver.com,search.naver.com|query|Naver>yahoo.com,search.yahoo."
+"com|p|Yahoo!>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Canada>yah"
+"oo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>sg.yahoo.com,sg.sea"
+"rch.yahoo.com|p|Yahoo! - Singapore>uk.yahoo.com,uk.search.yahoo.com"
+"|p|Yahoo! - UK and Ireland>search.cnn.com|query|CNN Web Search>sear"
+"ch.earthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Se"
+"arch>search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Searc"
+"h";

/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*
 * Plugin Utility: s.join: 1.0
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Function - read combined cookies v 0.36
 */
if(!s.__ccucr){
	s.c_rr=s.c_r;
	s.__ccucr = true;
	function c_r(k){
		var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;
		if(v)return v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;
		i=c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';',i);
		m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:m));
		if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.getTime())
		{d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}return v;
	}
	s.c_r=c_r;
}
/*
 * Function - write combined cookies v 0.36
 */
if(!s.__ccucw){
	s.c_wr=s.c_w;
	s.__ccucw = true;
	function c_w(k,v,e){
		var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,c,i,t;
		d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s.ape(k);
		pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1)
		{pv=pv.substring(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);
		i=sv.indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.indexOf(';',i)+1);
		sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime()){pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';
		pc=1;}}else{sv+=' '+k+'='+s.ape(v)+';';sc=1;}sv=sv.replace(/%00/g,'');
		pv=pv.replace(/%00/g,'');if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t.indexOf(';')!=-1){
		var t1=parseInt(t.substring(t.indexOf('|')+1,t.indexOf(';')));
		t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.setTime(ht);s.c_wr(pn,pv,d);}
		return v==s.c_r(s.epa(k));
	}
	s.c_w=c_w;
}

/*
 * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
 */
s.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}");
s.setOIDs=new Function("e",""
+"var s=s_c_il["+s._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+"]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

/*
 * Partner Plugin: DFA Check 0.9 - Restrict DFA calls to once a visit,
 * per report suite, per click through. Used in conjunction with VISTA
 */
s.partnerDFACheck=new Function("c","src","p",""
+"var s=this,dl=',',cr,nc,q,g,i,j,k,fnd,v=1,t=new Date,cn=0,ca=new Ar"
+"ray,aa=new Array,cs=new Array;t.setTime(t.getTime()+1800000);cr=s.c"
+"_r(c);if(cr){v=0;}ca=s.split(cr,dl);aa=s.split(s.un,dl);for(i=0;i<a"
+"a.length;i++){fnd=0;for(j=0;j<ca.length;j++){if(aa[i]==ca[j]){fnd=1"
+";}}if(!fnd){cs[cn]=aa[i];cn++;}}if(cs.length){for(k=0;k<cs.length;k"
+"++){nc=(nc?nc+dl:'')+cs[k];}cr=(cr?cr+dl:'')+nc;s.vpr(p,nc);v=1;}q="
+"s.wd.location.search.toLowerCase();q=s.repl(q,'?','&');g=q.indexOf("
+"'&'+src.toLowerCase()+'=');if(g>-1){s.vpr(p,cr);v=1;}if(!s.c_w(c,cr"
+",t)){s.c_w(c,cr,0);}if(!s.c_r(c)){v=0;}return v>=1;");

/*
 * Utility Function: vpr - set the variable vs with value v
 */
s.vpr=new Function("vs","v",
"if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Custom CVP read (includes recency)
 */
s.CVPwRecency=function(cn) {
	arry=s.split(s.c_r(cn).toLowerCase(),'],[');
	for(q=0; q<arry.length; q++) {
		z = arry[q];
		z = s.repl(z,'[', '');
		z = s.repl(z,']', '');
		z = s.repl(z,"'", '');
		z = s.repl(z,"%20", ' ');
		arry[q] = s.split(z, ',');
	}
	var td = new Date();
	var recent='';
	var chan='';
	for (var x = 0; x < arry.length; x++) {
		var diff = Math.round((td.getTime() - arry[x][1]) / 86400000);
		if(x!=0){
			recent=recent+'>';
			chan=chan+'>';
		}
		chan=chan+arry[x][0];
		recent=diff<=0?recent+'S':recent;
		recent=diff>=1&&diff<=3?recent+'1-3':recent;
		recent=diff>=4&&diff<=14?recent+'4-14':recent;
		recent=diff>=15&&diff<=30?recent+'15-30':recent;
		recent=diff>30?recent+'30+':recent;
	}
	if(chan&&recent){
		return chan+'::'+recent;
	} else {
		return '';
	}
}

/*
 * Tracking Servers
 */
/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.trackingServer="om.sears.com";
s.trackingServerSecure="som.sears.com"

/***CUSTOM***DFA Integration***CUSTOM***/
s.loadModule("Integrate")
s.Integrate.onLoad=function(s,m) {
	var dfaCheck = s.partnerDFACheck(dfa_visitCookie,dfa_overrideParam,dfa_newRsidsProp);
	if (dfaCheck) {
		s.Integrate.add("DFA");
		s.Integrate.DFA.tEvar=dfa_tEvar;
		s.Integrate.DFA.errorEvar=dfa_errorEvar;
		s.Integrate.DFA.timeoutEvent=dfa_timeoutEvent;
		s.Integrate.DFA.CSID=dfa_CSID;
		s.Integrate.DFA.SPOTID=dfa_SPOTID;
		s.Integrate.DFA.get(dfa_requestURL);
		s.Integrate.DFA.setVars=function(s,p) {
			if (window[p.VAR]) { // got a response
				if(!p.ec) { // no errors
					s[p.tEvar]="DFA-"+(p.lis?p.lis:0)+"-"+(p.lip?p.lip:0)+"-"+(p.lastimp?p.lastimp:0)+"-"+(p.lastimptime?p.lastimptime:0)+"-"+(p.lcs?p.lcs:0)+"-"+(p.lcp?p.lcp:0)+"-"+(p.lastclk?p.lastclk:0)+"-"+(p.lastclktime?p.lastclktime:0)
/****************** Custom START ******************/
					/* in case an ad does not go through the DFA clicktracker */
					if(s.getQueryParam('adid')&&(!p.lastclktime||p.lastclktime==0)){
						s[p.tEvar]="DFA-"+(p.lis?p.lis:0)+"-"+(p.lip?p.lip:0)+"-"+(p.lastimp?p.lastimp:0)+"-"+(p.lastimptime?p.lastimptime:0)+"-"+(p.lis?p.lis:0)+"-"+(p.lip?p.lip:0)+"-"+(p.lastimp?p.lastimp:0)+"-"+(p.lastimptime?p.lastimptime:0)
					}
					if(s[p.tEvar] && (!s.eVar71 || !s.eVar65 || s.eVar65=='media' || s.eVar65=='media CT' )){
						//set media VT or media CL
						var td = new Date();
						if(s[p.tEvar]){
							var s__dfa='';
							s__dfa=s.split(s[p.tEvar],'-')
							if (s__dfa[8]&&s__dfa[4]){
								if ((td.getTime()/1000-s__dfa[8]) < 120 || (td.getTime()/1000-s__dfa[4]) < 120){
									s.eVar65='media CT';
									s.eVar71="DFA:CT:"+(p.lcs?p.lcs:0)+":"+(p.lcp?p.lcp:0)+":"+(p.lastclk?p.lastclk:0);
									// If CT data is all zeros, default to VT data.
									if (s.eVar71.indexOf('0:0:0') > -1){
										s.eVar71="DFA:VT:"+(p.lis?p.lis:0)+":"+(p.lip?p.lip:0)+":"+(p.lastimp?p.lastimp:0);
									}
									s.eVar72='0-3h';
								} else if (s__dfa[8]<s__dfa[4]&&(td.getTime()/1000-s__dfa[4]) < 2592000){
									s.eVar65='media VT';
									s.eVar71="DFA:VT:"+(p.lis?p.lis:0)+":"+(p.lip?p.lip:0)+":"+(p.lastimp?p.lastimp:0);
									s.eVar72='0-3h';
								}
							}
						}
						// Use and delete values from partner sites
						if (getQSorCookieVal(true, "eVar37")){
							s.eVar37 = getQSorCookieVal(true, "eVar37");
							document.cookie = 'eVar37=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
						}
						if (getQSorCookieVal(true, "eVar71")){
							s.eVar71 = getQSorCookieVal(true, "eVar71");
							document.cookie = 'eVar71=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
							if (s.eVar71.indexOf("DFA:CT") == 0) s.eVar65='media CT';
							else if (s.eVar71.indexOf("DFA:VT") == 0) s.eVar65='media VT';
						}

						if(s.eVar65){
							s__eVar66=s.crossVisitParticipation(s.eVar65,'o_v66','30','4','>','');
							s.eVar66=s.CVPwRecency('o_v66');
						}
					}
/****************** Custom END  ******************/
				} else if (p.errorEvar) { // got an error response, track
					s[p.errorEvar] = p.ec;
				}
			} else if (p.timeoutEvent) { // empty response or timeout
				s.events = ((!s.events || s.events == '') ? '' : (s.events + ',')) + p.timeoutEvent; // timeout event
			}
		}
	}
}

/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!s.wd[o])s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p.get"
+"=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m.l[i]"
+"];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=function"
+"(p,u){var m=this,s=m.s,x,v,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*1000000000000"
+"0):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;for(x in p)if(x&&x.substring(0,1)!='_'&&(!Object||!Object.prototype||!Object.prototype[x])){v=''+p[x];if(v==p[x]||parseFloat(v)==p[x])u="
+"s.rep(u,'['+x+']',s.rep(escape(v),'+','%2B'))}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule("
+"'Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<"
+"m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d["
+"x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;i"
+"m=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");

/************************ Inclusion of AudienceManager Code start here ************************/
if("function"!=typeof DIL)DIL=function(b,c){var d=[],e,j,h,k,v;"object"!=typeof b&&(b={});v=!!b.disableDestinationPublishingIframe;(e=c)&&d.push(e+"");j=b.partner;if(!j||"string"!=typeof j)return e="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:e,filename:"dil.js"}),Error(e);e="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if((h=b.containerNSID)||"number"==typeof h)h=parseInt(h,10),!isNaN(h)&&0<=h&&
(e="");e&&(h=0,d.push(e),e="");k=DIL.getDil(j,h);if(k instanceof DIL&&k.api.getPartner()==j&&k.api.getContainerNSID()==h)return k;if(this instanceof DIL)DIL.registerDil(this,j,h);else return new DIL(b,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+j+" and containerNSID = "+h);var q={IS_HTTPS:"https:"==document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage},w={},i={},g={firingQueue:[],fired:[],firing:!1,errored:[],reservedKeys:{sids:!0,
pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_img_responses:0,num_of_img_errors:0,registerRequest:function(a){var f=this.firingQueue;"object"==typeof a&&f.push(a);if(!this.firing&&f.length&&(a=f.shift(),r.fireRequest(a),!this.firstRequestHasFired&&"script"==a.tag))this.firstRequestHasFired=!0}};k=function(){var a="http://fast.";q.IS_HTTPS&&
(a=!0===b.iframeAkamaiHTTPS?"https://fast.":"https://");return a+j+".demdex.net/dest3.html?d_nsid="+h+"#"+encodeURIComponent(document.location.href)};var s={THROTTLE_START:3E4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+j+"_"+h,url:k(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messageSendingInterval:q.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var a=this,f=document.createElement("iframe");f.id=this.id;f.style.cssText="display: none; width: 0; height: 0;";
f.src=this.url;n.addListener(f,"load",function(){a.iframeHasLoaded=!0;a.requestToProcess()});document.body.appendChild(f);this.iframe=f},requestToProcess:function(a){var f=this;a&&!o.isEmptyObject(a)&&this.process(a);if(this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages){if(!this.throttleTimerSet)this.throttleTimerSet=!0,setTimeout(function(){f.messageSendingInterval=q.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START);this.sendingMessages=!0;this.sendMessages()}},process:function(a){var f=
this.messages,l=encodeURIComponent,m,d,b,c,e;if((m=a.dests)&&m instanceof Array&&(d=m.length))for(b=0;b<d;b++)c=m[b],c=[l("dests"),l(c.id||""),l(c.y||""),l(c.c||"")],f.push(c.join("|"));if((m=a.ibs)&&m instanceof Array&&(d=m.length))for(b=0;b<d;b++)c=m[b],c=[l("ibs"),l(c.id||""),l(c.tag||""),n.encodeAndBuildRequest(c.url||[],","),l(c.ttl||"")],f.push(c.join("|"));if((m=a.dpcalls)&&m instanceof Array&&(d=m.length))for(b=0;b<d;b++)c=m[b],e=c.callback||{},e=[e.obj||"",e.fn||"",e.key||"",e.tag||"",e.url||
""],c=[l("dpm"),l(c.id||""),l(c.tag||""),n.encodeAndBuildRequest(c.url||[],","),l(c.ttl||""),n.encodeAndBuildRequest(e,",")],f.push(c.join("|"));this.jsonProcessed.push(a)},sendMessages:function(){var a=this;this.messages.length?(DIL.xd.postMessage(a.messages.shift(),a.url,a.iframe.contentWindow),setTimeout(function(){a.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},x={traits:function(a){if(o.isValidPdata(a)){if(!(i.sids instanceof Array))i.sids=[];n.extendArray(i.sids,a)}return this},
pixels:function(a){if(o.isValidPdata(a)){if(!(i.pdata instanceof Array))i.pdata=[];n.extendArray(i.pdata,a)}return this},logs:function(a){if(o.isValidLogdata(a)){if("object"!=typeof i.logdata)i.logdata={};n.extendObject(i.logdata,a)}return this},customQueryParams:function(a){o.isEmptyObject(a)||n.extendObject(i,a,g.reservedKeys);return this},signals:function(a,f){var l,m=a;if(!o.isEmptyObject(m)){if(f&&"string"==typeof f)for(l in m={},a)a.hasOwnProperty(l)&&(m[f+l]=a[l]);n.extendObject(i,m,g.reservedKeys)}return this},
result:function(a){if("function"==typeof a)i.callback=a;return this},afterResult:function(a){if("function"==typeof a)i.postCallbackFn=a;return this},useImageRequest:function(){i.useImageRequest=!0;return this},clearData:function(){i={};return this},submit:function(){r.submitRequest(i);i={};return this},getPartner:function(){return j},getContainerNSID:function(){return h},getEventLog:function(){return d},getState:function(){var a={},f={};n.extendObject(a,g,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});
n.extendObject(f,s,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:i,otherRequestInfo:a,destinationPublishingInfo:f}}},r={submitRequest:function(a){g.registerRequest(r.createQueuedRequest(a));return!0},createQueuedRequest:function(a){var f,l=a.callback,m="img";if(!o.isValidPdata(a.sids))d.push("requestProcs.createQueuedRequest(): sids is not valid, converting to an empty array"),a.sids=[];if(!o.isValidPdata(a.pdata))d.push("requestProcs.createQueuedRequest(): pdata is not valid, converting to an empty array"),
a.pdata=[];if(!o.isValidLogdata(a.logdata))d.push("requestProcs.createQueuedRequest(): logdata is not valid, converting to an empty object"),a.logdata={};a.logdataArray=n.convertObjectToKeyValuePairs(a.logdata,"=",!0);a.logdataArray.push("_ts="+(new Date).getTime());if("function"!=typeof l)l=this.defaultCallback;if(g.useJSONP=!a.useImageRequest||"boolean"!=typeof a.useImageRequest)m="script",f=g.callbackPrefix+(new Date).getTime();return{tag:m,src:r.makeRequestSrc(a,f),internalCallbackName:f,callbackFn:l,
postCallbackFn:a.postCallbackFn,useImageRequest:a.useImageRequest,requestData:a}},defaultCallback:function(a){var f,l,m,c,b,d,e,h,j;if((f=a.stuff)&&f instanceof Array&&(l=f.length))for(m=0;m<l;m++)if((c=f[m])&&"object"==typeof c)if(b=c.cn,d=c.cv,e=c.ttl||0,h=c.dmn||"."+document.domain,j=c.type,b&&(d||"number"==typeof d))"var"!=j&&(e=parseInt(e,10))&&!isNaN(e)&&n.setCookie(b,d,1440*e,"/",h,!1),w[b]=d;!v&&!g.abortRequests&&s.requestToProcess(a)},makeRequestSrc:function(a,f){a.sids=o.removeEmptyArrayValues(a.sids||
[]);a.pdata=o.removeEmptyArrayValues(a.pdata||[]);var c=n.encodeAndBuildRequest(a.sids,","),b=n.encodeAndBuildRequest(a.pdata,","),d=(a.logdataArray||[]).join("&");delete a.logdataArray;var e=q.IS_HTTPS?"https://":"http://",i;i=[];var k,t;for(k in a)!(k in g.reservedKeys)&&a.hasOwnProperty(k)&&(t=a[k],t instanceof Array?i.push(k+"="+n.encodeAndBuildRequest(t,",")):i.push(k+"="+encodeURIComponent(t)));i=i.length?"&"+i.join("&"):"";return e+j+".demdex.net/event?d_nsid="+h+(c.length?"&d_sid="+c:"")+
(b.length?"&d_px="+b:"")+(d.length?"&d_ld="+encodeURIComponent(d):"")+i+(g.useJSONP?"&d_rtbd=json&d_jsonv="+DIL.jsonVersion+"&d_dst=1&d_cts=1&d_cb="+(f||""):"")},fireRequest:function(a){"img"==a.tag?this.fireImage(a):"script"==a.tag&&this.fireScript(a)},fireImage:function(a){var f,c;if(!g.abortRequests)g.firing=!0,f=new Image(0,0),f.onload=function(){g.firing=!1;g.fired.push(a);g.num_of_img_responses++;g.registerRequest()},c=function(f){e="imgAbortOrErrorHandler received the event of type "+f.type;
d.push(e);g.abortRequests=!0;g.firing=!1;g.errored.push(a);g.num_of_img_errors++;g.registerRequest()},f.addEventListener?(f.addEventListener("error",c,!1),f.addEventListener("abort",c,!1)):f.attachEvent&&(f.attachEvent("onerror",c),f.attachEvent("onabort",c)),f.src=a.src},fireScript:function(a){var f=this,c,b,h=a.src,i=a.postCallbackFn,k="function"==typeof i;if(!g.abortRequests)g.firing=!0,window[a.internalCallbackName]=function(f){try{f||(f={});var c=a.callbackFn;g.firing=!1;g.fired.push(a);g.num_of_jsonp_responses++;
c(f);k&&i(f)}catch(b){b.message="DIL jsonp callback caught error with message "+b.message;e=b.message;d.push(e);b.filename=b.filename||"dil.js";b.partner=j;DIL.errorModule.handleError(b);try{c({error:b.name+"|"+b.message}),k&&i({error:b.name+"|"+b.message})}catch(l){}}finally{g.registerRequest()}},b=document.createElement("script"),b.addEventListener&&b.addEventListener("error",function(c){e="jsonp script tag error listener received the event of type "+c.type+" with src "+h;f.handleScriptError(e,
a)},!1),b.type="text/javascript",b.src=h,c=document.getElementsByTagName("script")[0],c.parentNode.insertBefore(b,c)},handleScriptError:function(a,f){d.push(a);g.abortRequests=!0;g.firing=!1;g.errored.push(f);g.num_of_jsonp_errors++;g.registerRequest()}},o={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if("object"!=typeof a)return!0;for(var f in a)if(a.hasOwnProperty(f))return!1;
return!0},removeEmptyArrayValues:function(a){for(var f=0,c=a.length,b,d=[],f=0;f<c;f++)b=a[f],"undefined"!=typeof b&&null!=b&&d.push(b);return d}},n={addListener:function(){if(document.addEventListener)return function(a,f,b){a.addEventListener(f,function(a){"function"==typeof b&&b(a)},!1)};if(document.attachEvent)return function(a,f,b){a.attachEvent("on"+f,function(a){"function"==typeof b&&b(a)})}}(),convertObjectToKeyValuePairs:function(a,f,b){var c=[],f=f||"=",d,e;for(d in a)e=a[d],"undefined"!=
typeof e&&null!=e&&c.push(d+f+(b?encodeURIComponent(e):e));return c},encodeAndBuildRequest:function(a,f){return this.map(a,function(a){return encodeURIComponent(a)}).join(f)},map:function(a,f){if(Array.prototype.map)return a.map(f);if(void 0===a||null===a)throw new TypeError;var b=Object(a),c=b.length>>>0;if("function"!==typeof f)throw new TypeError;for(var d=Array(c),e=0;e<c;e++)e in b&&(d[e]=f.call(f,b[e],e,b));return d},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;
var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=[],h=0;h<d;h++)if(h in c){var g=c[h];b.call(b,g,h,c)&&e.push(g)}return e}return a.filter(b)},getCookie:function(a){var a=a+"=",b=document.cookie.split(";"),c,d,e;for(c=0,d=b.length;c<d;c++){for(e=b[c];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(a))return decodeURIComponent(e.substring(a.length,e.length))}return null},setCookie:function(a,b,c,d,e,h){var g=new Date;c&&(c*=6E4);document.cookie=a+"="+
b+(c?";expires="+(new Date(g.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(h?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,b),!0):!1},extendObject:function(a,b,c){var d;if("object"==typeof a&&"object"==typeof b){for(d in b)if(b.hasOwnProperty(d)&&(o.isEmptyObject(c)||!(d in c)))a[d]=b[d];return!0}return!1}};"error"==j&&0==h&&n.addListener(window,"load",function(){DIL.windowLoaded=!0});var u=function(){z();
!v&&!g.abortRequests&&s.attachIframe()},z=function(){setTimeout(function(){g.firstRequestHasFired||x.submit()},DIL.constants.TIME_TO_DEFAULT_REQUEST)},y=document,p=b.iframeAttachmentDelay;"error"!=j&&(DIL.windowLoaded?u():"complete"!=y.readyState&&"loaded"!=y.readyState?n.addListener(window,"load",u):DIL.isAddedPostWindowLoadWasCalled?n.addListener(window,"load",u):(p="number"==typeof p?parseInt(p,10):0,0>p&&(p=0),setTimeout(u,p||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));this.api=x;
this.getStuffedVariable=function(a){var b=w[a];!b&&"number"!=typeof b&&(b=n.getCookie(a),!b&&"number"!=typeof b&&(b=""));return b};this.validators=o;this.helpers=n;if(window._unit_tests)this.constants=q,this.pendingRequest=i,this.requestController=g,this.setDestinationPublishingUrl=k,this.destinationPublishing=s,this.requestProcs=r,this.log=d},function(){var b=document,c;if(null==b.readyState&&b.addEventListener)b.readyState="loading",b.addEventListener("DOMContentLoaded",c=function(){b.removeEventListener("DOMContentLoaded",
c,!1);b.readyState="complete"},!1)}(),DIL.extendStaticPropertiesAndMethods=function(b){var c;if("object"==typeof b)for(c in b)b.hasOwnProperty(c)&&(this[c]=b[c])},DIL.extendStaticPropertiesAndMethods({version:"2.3",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,isAddedPostWindowLoad:function(b){this.isAddedPostWindowLoadWasCalled=!0;this.windowLoaded="function"==typeof b?!!b():"boolean"==typeof b?
b:!0},create:function(b){try{return new DIL(b)}catch(c){return(new Image(0,0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(b,c,d){c=c+"$"+d;c in this.dils||(this.dils[c]=b)},getDil:function(b,c){var d;"string"!=
typeof b&&(b="");c||(c=0);d=b+"$"+c;return d in this.dils?this.dils[d]:Error("The DIL instance with partner = "+b+" and containerNSID = "+c+" was not found")},dexGetQSVars:function(b,c,d){c=this.getDil(c,d);return c instanceof this?c.getStuffedVariable(b):""},xd:{postMessage:function(b,c,d){var e=1;if(c)if(window.postMessage)d.postMessage(b,c.replace(/([^:]+:\/\/[^\/]+).*/,"$1"));else if(c)d.location=c.replace(/#.*$/,"")+"#"+ +new Date+e++ +"&"+b}}}),DIL.errorModule=function(){var b=DIL.create({partner:"error",
containerNSID:0,disableDestinationPublishingIframe:!0}),c={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020};return{handleError:function(d){var e=d.name?(d.name+"").toLowerCase():"",j=[],d={name:e,filename:d.filename?d.filename+"":"",partner:d.partner?d.partner+"":"no_partner",site:d.site?d.site+"":document.location.href,message:d.message?d.message+"":
""};j.push(e in c?c[e]:c.noerrortypedefined);b.api.pixels(j).logs(d).useImageRequest().submit()},pixelMap:c}}();DIL.tools={};
DIL.tools.getSearchReferrer=function(b,c){var d=DIL.getDil("error"),e=DIL.tools.decomposeURI(b||document.referrer),j="",h="",k={queryParam:"q"},j=d.helpers.filter(["object"==typeof c?c:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(b){return!(!b.hasOwnProperty("hostPattern")||!e.hostname.match(b.hostPattern))}).shift();return!j?{valid:!1,name:"",keywords:""}:{valid:!0,name:e.hostname,keywords:(d.helpers.extendObject(k,
j),h=k.queryPattern?(j=(""+e.search).match(k.queryPattern))?j[1]:"":e.uriParams[k.queryParam],decodeURIComponent(h||"").replace(/\+|%20/g," "))}};
DIL.tools.decomposeURI=function(b){var c=DIL.getDil("error"),d=document.createElement("a");d.href=b||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(b,d){c.helpers.map(d.split("&"),function(c){c=c.split("=");b[c.shift()]=c.shift()});return b}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var b={},c=document.getElementsByTagName("meta"),d,e,j,h,k;for(d=0,j=arguments.length;d<j;d++)if(h=arguments[d],null!==h)for(e=0;e<c.length;e++)if(k=c[e],k.name==h){b[h]=k.content;break}return b};
DIL.create({
		partner : "sears",
		containerNSID : 0
		});
//Site Cate Integration code starts

s = s_gi(s_account);
s.m_DIL = function() {
  var m = s.m_i("DIL");
  m.trackVars = 'pageName,channel,campaign,products,events,';

  for (var i = 0; i <= 75; i++) {
    m.trackVars += 'prop' + i + ',' + 'eVar' + i + ',';
  }

  m.d = 0;
  m._t = function() {
    var m = this,
      f = ',' + m.trackVars + ',',
      s = m.s,
      k,
      store = {};

    if (m.d && !s.pe) {
      for (var i = 0; i < s.va_t.length; i++) {
        k = s.va_t[i];
        if (f.indexOf(',' + k + ',') >= 0 && s[k] !== undefined) {
         store[k] = s[k];
       }
      }

      m.d.api.signals(store, "c_").submit();
    }
  };
 m.setup = function(p,i){
    this.d = DIL.getDil('sears');
  };
};

s.loadModule("DIL")
s.DIL.setup();

/************************ Inclusion of AudienceManager Code ends here ************************/

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"
+"&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."
+"mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"
+"'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="
+"='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"
+" alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="
+"function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"
+";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"
+"h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"
+"+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"
+"ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"
+"inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"
+"geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"
+"tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="
+"=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"
+"')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"
+"';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"
+";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"
+"!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"
+")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"
+"ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"
+"!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"
+"();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"
+"on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"
+"xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"
+"')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"
+")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"
+"=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"
+",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"
+");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"
+"s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"
+",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"
+"n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"
+"ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
+"[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"
+".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"
+"|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"
+"tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"
+")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"
+"ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"
+"rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"
+"s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"
+"l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"
+"ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"
+"ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"
+";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("
+"\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."
+"length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"
+"f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"
+"dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "
+"g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"
+"o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"
+"o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"
+"cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"
+"f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"
+"||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"
+"ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"
+"l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"
+"ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("
+")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"
+"t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"
+";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"
+"{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="
+"screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"
+"th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="
+"tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"
+"l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"
+"t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"
+";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"
+",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"
+";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"
+";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="
+"s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("
+");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"
+"Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"
+"{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"
+"xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
+"n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"
+"ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="
+"parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="
+"'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"
+"fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"
+"linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"
+"rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"
+",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"
+"ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}
/************************ Inclusion of shc_code.js start here ************************/
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/* StoreFront Plugins */

//Declare required prefix constants
var HOME_PAGE = 'Homepage',
    VERTICAL 			= 'Vertical',
    CATEGORY 			= 'Category',
    SUBCAT 				= 'Subcategory',
    ADYOURWAY 			= 'AdYourWay',
    PRODUCT 			= 'Product Summary',
    SEARCH_RESULTS = 'Search Results',
    NO_SEARCH_RESULTS = 'No Search Results',
    SHOP_BY_CLEARANCE = 'Shop By Clearance',
    THEME      			= 'Theme',
    DAP 				= 'DAP',
    NB 					= 'Static Browse',
    DCP 				= 'Dynamic Category',
    GIFT_CARDS 			= 'Gift Cards',
    WRITE_REVIEW 		= 'Write Review Page',
    UPLOAD_VIDEO_REVIEW = 'Upload Video Review',
    ERROR_PAGE= 'Browse Error',
    COMPARE				= 'Product Compare',
    KEYWORD_REDIRECT 		= 'Keyword Redirect',
    SEE_ALL_FILTERS = 'See All Filters',
    EPUBLISHING = 'ePublishing',
    channel ,
    omSbv,
    omPrefix,
    omVrt,
    omCat,
    omSubCat,
    omSbf,
    omPid,
    SHOP_BY_BRAND = 'Shop By Brand',
    Rebate = 'Rebate Availability',
    Recap = 'Shopping Recap',
    LSD = 'Local Seller Directory',
    isAutomotive = $('input#isAutomotive').val();//Declare other required variables
    var brandList =["Zeghani","Vedere Le Stelle", "Bosch Showcase", "Skechers", "New Balance", "Crocs", "Sears Add 1 Showcase","David Tutera", "Pretty in Pave", "Ella Rose","Riders",  "Wranglers", "dickies brand showcase", "Jaclyn Smith Brands", "kardashiankollection", "Hasbro Games", "Just Kidz", "Littlest Pet Shop", "KM Nerf", "KM Playskool", "Ringside", "KM Vtech", "searspoolsfinder", "searsbikefinder", "SRS Lego", "SRS Power Wheels", "SRS LeapFrog", "Ringside Toys", "sandrabysandralee", "samsoniteluggagebrandshowcase", "batesshoesbrandshowcase","kitchenaidappliancesbrandshowcase","catfootwearworkboots",""];
    var refBrandList =["dap_10153_12605_dap_Zeghani","dap_10153_12605_dap_Vedere+Le+Stelle", "dap_10153_12605_dap_Bosch+Showcase", "dap_10153_12607_dap_Skechers", "dap_10153_12605_dap_New+Balance", "dap_10153_12605_dap_Crocs", "dap_10153_12605_dap_Sears+Add+1+Showcase","dap_10153_12605_dap_David+Tutera", "dap_10153_12605_dap_Pretty+in+Pave", "dap_10153_12605_dap_Ella+Rose",  "dap_10151_10104_dap_Riders",  "dap_10151_10104_dap_Wranglers", "dap_10153_12605_dap_dickies+brand+showcase", "dap_10151_10104_dap_Jaclyn+Smith+Brands", "dap_10153_12605_dap_kardashiankollection", "dap_10153_12605_dap_Bosch+Showcase", "dap_10151_10104_dap_Hasbro+Games", "dap_10151_10104_dap_Just+Kidz", "dap_10151_10104_dap_Littlest+Pet+Shop", "dap_10151_10104_dap_KM+Nerf", "dap_10151_10104_dap_KM+Playskool", "dap_10151_10104_dap_Ringside", "dap_10151_10104_dap_KM+Vtech",
        "v_10151_10104_Clothing?sbf=Brand&sbv=Athletech", "v_10153_12605_Clothing?sbv=Dockers&sbf=Brand", "v_10151_10104_Clothing?sbf=Brand&sbv=Route+66", "v_10153_12605_Appliances?sbf=Brand&sbv=Electrolux", "v_10153_12605_Appliances?sbf=Brand&sbv=Frigidaire","v_10153_12605_Appliances?sbf=Brand&sbv=GE+Appliances", "v_10153_12605_Appliances?sbf=Brand&sbv=LG","v_10153_12605_Appliances?sbf=Brand&sbv=Maytag","v_10153_12605_Appliances?sbf=Brand&sbv=KitchenAid", "v_10153_12605_Appliances?sbf=Brand&sbv=Whirlpool", "v_10153_12605_Appliances?sbf=Brand&sbv=Jenn-Air","v_10153_12605_Computers+%26+Electronics?sbf=Brand&sbv=Kodak","v_10151_10104_Computers+%26+Electronics?sbf=Brand&sbv=Kodak", "v_10153_12605_Shoes?sbf=Brand&sbv=Avia", "v_10153_12605_Shoes?sbf=Brand&sbv=Bearpaw", "v_10153_12605_Shoes?adCell=W6&sbv=Caterpillar&sbf=Brand",
        "v_10153_12605_Shoes?sbf=Brand&sbv=Converse", "c_10153_12605_Shoes_Kids?sbf=Brand&sbv=Disney", "v_10153_12605_Clothing?sbf=Brand&sbv=Dockers", "v_10153_12605_Shoes?sbf=Brand&sbv=Dr.+Scholl%27s", "v_10153_12605_Shoes?sbf=Brand&sbv=Fila", "v_10153_12605_Shoes?sbf=Brand&sbv=New+Balance", "v_10153_12605_Shoes?sbf=Brand&sbv=Orthaheel", "v_10151_10104_Shoes?sbf=Brand&sbv=Protege", "v_10153_12605_Shoes?sbf=Brand&sbv=Reebok", "v_10153_12605_Shoes?sbf=Brand&sbv=Skechers", "v_10153_12605_Shoes?sbf=Brand&sbv=Timberland+PRO", "v_10153_12605_Shoes?sbf=Brand&sbv=Wolverine", "c_10153_12605_Appliances_Small+Kitchen+Appliances?sbf=Brand&sbv=Cuisinart", "c_10153_12605_For+the+Home_Mattresses?sbf=Brand&sbv=Sealy",
        "v_10153_12605_Clothing?sbf=Brand&sbv=Levi+s","http://www.sears.com/clothing/v-1020011?sbf=Brand&sbv=Levi","http://www.sears.com/zeghani/dap-120000000144307","http://www.sears.com/vedere-le-stelle/dap-120000000140764","http://www.sears.com/skechers/dap-120000000172633","http://www.sears.com/new-balance/dap-120000000209171","http://www.sears.com/crocs/dap-120000000218046","http://www.sears.com/sears-add-1-showcase/dap-120000000224118","http://www.sears.com/david-tutera/dap-120000000119926","http://www.sears.com/pretty-in-pave/dap-120000000208423","http://www.sears.com/ella-rose/dap-120000000208943","http://www.kmart.com/riders/dap-100000000152003","http://www.kmart.com/wranglers/dap-120000000169155","http://www.sears.com/dickies-brand-showcase/dap-120000000212022","http://www.kmart.com/jaclyn-smith-brands/dap-100000000160521",
        "http://www.sears.com/kardashiankollection/dap-120000000132635","http://www.sears.com/bosch-showcase/dap-120000000195376","http://www.kmart.com/hasbro-games/dap-120000000016503","http://www.kmart.com/just-kidz/dap-120000000117797","http://www.kmart.com/littlest-pet-shop/dap-120000000000502","http://www.kmart.com/km-nerf/dap-120000000051256","http://www.kmart.com/km-playskool/dap-120000000057225","http://www.kmart.com/ringside/dap-120000000053782","http://www.kmart.com/km-vtech/dap-120000000119835","http://www.kmart.com/clothing/v-20008?sbf=Brand&sbv=Athletech","http://www.sears.com/clothing/v-1020011?sbf=Brand&sbv=Dockers","http://www.kmart.com/clothing/v-20008?sbf=Brand&sbv=Route+66","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=Frigidaire","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=GE+Appliances",
        "http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=LG","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=Maytag","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=KitchenAid","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=Whirlpool","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=Jenn-Air","http://www.sears.com/computers-electronics/v-1020002?sbf=Brand&sbv=Kodak","http://www.kmart.com/computers-electronics/v-20001?sbf=Brand&sbv=Kodak","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Avia","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Bearpaw","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Caterpillar","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Converse","http://www.sears.com/shoes-kids/c-1020179?sbf=Brand&sbv=Disney","http://www.sears.com/clothing/v-1020011?sbf=Brand&sbv=Dockers",
        "http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Dr.+Scholl+s","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Fila","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=New+Balance","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Orthaheel","http://www.kmart.com/shoes/v-23140?sbf=Brand&sbv=Protege","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Reebok","http://www.sears.com/skechers/dap-120000000172633","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Timberland+PRO","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Wolverine","http://www.sears.com/appliances-small-kitchen-appliances/c-1020025?sbf=Brand&sbv=Cuisinart","http://www.sears.com/for-the-home-mattresses/c-1020246?sbf=Brand&sbv=Sealy","http://www.sears.com/shc/s/dap_10153_12605_DAP_sears-pools-finder","http://www.sears.com/shc/s/dap_10153_12607_DAP_sears-bike-finder",
        "http://www.sears.com/shc/s/dap_10153_12605_DAP_SRS+Lego","http://www.sears.com/shc/s/dap_10153_12605_DAP_SRS%20Power%20Wheels","http://www.sears.com/shc/s/dap_10153_12605_DAP_SRS%20LeapFrog","http://www.sears.com/shc/s/dap_10153_12605_DAP_Ringside%20Toys","http://www.sears.com/shc/s/dap_10153_12605_DAP_sandra-by-sandra-lee","http://www.sears.com/samsonite-luggage-brand-showcase/dap-120000000249444","http://www.sears.com/shc/s/dap_10153_12605_DAP_bates-shoes-brand-showcase","v_10153_12605_Appliances?sbf=Brand&sbv=KitchenAid","http://www.sears.com/for-the-home-mattresses/c-1020246?sbf=Brand&sbv=Sealy", "http://www.sears.com/for-the-home-mattresses/c-1020246?sbf=Brand&sbv=Serta","v_10153_12605_Appliances?sbf=Brand&sbv=Whirlpool"];
    var sbvListSearsV =["levi's","dockers","electrolux","frigidaire","ge appliances","lg","maytag","kitchenAid","whirlpool","jennair","kodak","avia","bearpaw","caterpillar","converse","dr. scholl's","fila","new balance","orthaheel","reebok","skechers","timberland pro","wolverine"];
    var sbvListSearsC =["disney","cuisinart","sealy","serta"];
    var sbvListKmartV =["athletech","route 66","kodak","protege"];
    var SearsVertCheck =["clothing?","appliances?","computers & electronics?","shoes?","for the home?"];
    var SearsCatCheck =["appliances_small kitchen appliances?","for the home_mattresses?","Shoes_Kids?"];
    var KmartVertCheck =["clothing?","shoes?","computers & electronics?"];

populateSObject();

function populateSObject() {
	var x = getSHC(),
	    shipVantageUser = '';
	    var new_Pathname = "";
	try{
		new_Pathname = window.location.pathname;
	if(!!$.cookie("om_m")){
		shipVantageUser = $.cookie("om_m");
	}
	}catch(e){}
        try {
			if($.cookie('refererOrigin') != null){
				s.referrer = $.cookie('refererOrigin');
			 }
		}catch(e){
        }

	if(x.summary.toLowerCase() !== 'undefined' && x.summary.length ) {
		switch(x.summary) {
			case HOME_PAGE:
				if(shipVantageUser.indexOf("shipvantage") != -1)
				setHomePageVars(x);
				else
				setAllPageVars(x);
				break;
			case VERTICAL:
				setVerticalVars(x);
				break;
			case CATEGORY:
				setCategoryVars(x);
				if(validateBrandShowCase(omVrt,x)) {
					s.eVar40 = 'Brand Showcase:'+omSbv;
		   		}
				break;
			case SUBCAT:
			        if (typeof isViewAll!= 'undefined' && isViewAll != undefined && isViewAll =='true')
				setCategoryVars(x);
	                           else
				setSubCategoryVars(x);
				break;
			case PRODUCT:
				setProductVars(x);
				break;
			case SEARCH_RESULTS:
				setSearchVars(x);
				break;
			case NO_SEARCH_RESULTS:
				setNoSearchVars(x);
				break;
			case SHOP_BY_CLEARANCE:
				setShopByClearanceVars(x);
				break;
			case THEME:
				setThemeVars(x);
				break;
			case ADYOURWAY:
				setAdYourWayVars(x);
				break;
			case DAP:
				try{
					if(typeof new_Pathname != 'undefined' && new_Pathname.toLowerCase().indexOf('dapc') > -1 && new_Pathname.toLowerCase().indexOf('searsstyle') > -1){
					   setDAPCVars(x);
					} else {
						setDAPVars(x);
						if(validateBrandShowCase(omVrt,x)) {
							s.eVar40 = 'Brand Showcase:'+omVrt;
						}
					}
				}catch(e){}
 				break;
			case NB:
				setNBVars(x);
				break;
			case DCP:
				x.vrt = DCP;
				setDCPVars(x);
				break;
			case KEYWORD_REDIRECT:
				//setKeywordDirectVars(x);
				break;
			case GIFT_CARDS:
				setGiftCardVars(x);
				break;
			case WRITE_REVIEW:
				setAllPageVars(x);
				break;
			case UPLOAD_VIDEO_REVIEW:
				setAllPageVars(x);
				break;
			case COMPARE:
				setComparePageVars(x);
				break;
			case SEE_ALL_FILTERS:
				setSeeAllFiltersPageVars(x);
				break;
			case SHOP_BY_BRAND:
				setShopByBrandPageVars(x);
				if(validateBrandShowCase(omVrt,x)) {
		   			s.eVar40 = 'Brand Showcase:'+omSbv;
		   		}
				break;
			case Rebate:
				setRebatePageVars(x);
				break;
			case Recap:
				setShoppingRecapPageVars(x);
				break;
			// Add flow for Weekly Ad pages.
			case EPUBLISHING:
				if (WeeklyAd.Omniture !== undefined) {
					// weeklyAdOmniture originally defined in weeklyad.js. Do not change the name here.
					weeklyAdOmniture = WeeklyAd.Omniture(x);
				}
				break;
			// Add flow for Weekly Ad pages - End
			case LSD:
				setLocalSellerDirectoryVars(x);
				break;
			default:
				if(x.summary.toLowerCase().indexOf('error') > -1) setErrorPageVars(x);
				else {
					if(typeof channel !== 'undefined'){
				if(x.channel.toLowerCase() !== 'undefined' && (x.channel === 'Gift Registry' || x.channel === 'Give Together')) {
					setGRGTPageVars(x);
				}
					}
				else{
				setAllPageVars(x);
				}
				}
				break;
		}
	} else {
		//some unknown page
		setAllPageVars(x);
	}

	//Following are generic to all pages
	//Code to block ECOM-255333 - Remove Omniture Call to Searsstyle.com
	if(typeof new_Pathname === 'undefined' || (new_Pathname.toLowerCase().indexOf('dapc') === -1 && new_Pathname.toLowerCase().indexOf('searsstyle') === -1)){
	setVisitorVars(); 			//Sets eVar1 and prop9
	setUserProfieVars(x); 	//Sets eVar30 and eVar45
	}

	//Deleting Referer Cookie once the redirect URL is set to Omniture
		try {
			if($.cookie('refererOrigin') != null){
				$.cookie('refererOrigin',"",{path: '/',expires:-1});
			}
		}catch(e){
        }
}

 //Checks the referrer URL
 function validateBrandReferrer(Url){
 	try {
 		if(Url !== 'undefined' && Url != ""){
			Url = Url.replace(/%20/g, "+");
			Url = Url.replace(/%27/g, "+");
			Url = Url.replace(/ /g, "+");
 		}
		for(var bl=0;bl<refBrandList.length;bl++){
			if((Url.toLowerCase()).indexOf((refBrandList[bl].toLowerCase())) !=-1 ) {
				return true;
			}
		}
		return false;
	}catch(e){
	  return false;
	}
 }

 //Validate Brand ShowCase vertical name
 function validateBrandShowCase(bVName,x){
 	try {
 	if (typeof x.summary !== 'undefined' && x.summary == 'DAP') {
 	for(var bl=0;bl<brandList.length;bl++){
				if((bVName.toLowerCase()).indexOf((brandList[bl].toLowerCase())) !=-1 ) {
					return true;
 	}
 	}
		}else if(typeof x.summary !== 'undefined' && x.summary == 'Shop By Brand' && omSbf == 'Brand') {
 		var currentStoreId = getStoreId();
 		if(currentStoreId == '10153'){
				var omName = "";
				if(omVrt !== 'undefined'){
				    omName = omVrt;
 				 		}
				if(omCat !== 'undefined' && omCat != ""){
					omName = omName + "_" + omCat;
 				 	}
				if(omSubCat !== 'undefined' && omSubCat != ""){
					omName = omName + "_" + omSubCat;
 				 }
				if(omName != ""){
					omName = omName + "?";
 			}
				for(var svc=0;svc<SearsVertCheck.length;svc++){
					if((omName.toLowerCase()).indexOf((SearsVertCheck[svc].toLowerCase())) !=-1 ){
						for(var sbv=0;sbv<sbvListSearsV.length;sbv++){
							if((omSbv.toLowerCase()).indexOf((sbvListSearsV[sbv].toLowerCase())) !=-1 ){
			 				return true;
			 			}
			 		}
			 	}
			}
				for(var svc=0;svc<SearsCatCheck.length;svc++){
					if((omName.toLowerCase()).indexOf((SearsCatCheck[svc].toLowerCase())) !=-1 ){
						for(var sbv=0;sbv<sbvListSearsC.length;sbv++){
							if((omSbv.toLowerCase()).indexOf((sbvListSearsC[sbv].toLowerCase())) !=-1 ){
								return true;
 		}
 	}
	 			 				}
	 			 			}
	 			 		}
			else if(currentStoreId == '10151'){
				var omName = "";
				if(omVrt !== 'undefined'){
				    omName = omVrt;
	 			 	}
				if(omCat !== 'undefined' && omCat != ""){
					omName = omName + "_" + omCat;
	 			 }
				if(omSubCat !== 'undefined' && omSubCat != ""){
					omName = omName + "_" + omSubCat;
	 		}
				if(omName != ""){
					omName = omName + "?";
	 	}
	 		for(var kvc=0;kvc<KmartVertCheck.length;kvc++){
					if((omName.toLowerCase()).indexOf((KmartVertCheck[kvc].toLowerCase())) !=-1 ){
						for(var sbv=0;sbv<sbvListKmartV.length;sbv++){
							if((omSbv.toLowerCase()).indexOf((sbvListKmartV[sbv].toLowerCase())) !=-1 ){
				 					return true;
				 				}
	 			 			}
				 		}
				 	}
				}
	 		}
		return false;
	}catch(e){
	  return false;
	 	}
 	}

function setErrorPageVars(x) {
	s.pageType = 'errorPage';
	var genVal = x.summary;
	if(x.vrt.length  && x.vrt.toLowerCase !== 'undefined') {
		genVal = x.vrt;
}
	s.channel = genVal;
	s.prop1 = genVal;
	s.prop2 = genVal;
	s.prop3 = genVal;
	s.prop27 = genVal;
	s.prop28 = genVal;
}

function setHomePageVars(x) {
	s.channel = 'ShipVantage';
	s.pageName='ShipVantage > Home';
	s.prop1='ShipVantage > Home';
	s.prop2='ShipVantage > Home';
	s.prop3='ShipVantage > Home';
	s.prop13='ShipVantage > Home';
	s.prop18='ShipVantage > Home';
	s.prop27='ShipVantage > Home';
	s.prop28='ShipVantage > Home';

	if(gup('prop17') !== '') {
	s.prop17 = gup(unescape('prop17'));
	}
}

function setAllPageVars(x) {

	//Return - if details are insufficient
	if(x.summary === '' || x.summary.toLowerCase() === 'undefined') return;

	//For JIRA ECOM-257942
	var pageNameVar = x.summary;
	if (typeof pageNameVar !== 'undefined' && pageNameVar.toLowerCase() === 'homepage'){
		pageNameVar = pageNameVar + " > Sears";
	}
	s.pageName = pageNameVar;

	var genVal = x.summary;
	if(x.vrt.length  && x.vrt.toLowerCase !== 'undefined') {
		genVal = x.vrt;
	}
	s.channel = genVal;
	s.prop1 = genVal;
	s.prop2 = genVal;
	s.prop3 = genVal;
	s.prop27 = genVal;
	s.prop28 = genVal;
	if(gup('prop17') !== '') {
	s.prop17 = gup(unescape('prop17'));
	}
}

function setVerticalVars(x) {
	var pageType = "Vertical";
	s.pageName = pageType+' > '+x.vrt;
	s.channel = x.vrt;
	s.prop1 = x.vrt;
	s.prop2 = x.vrt;
	s.prop27 = pageType;
	s.prop28 = x.vrt+' > '+pageType;
		s.events = "event38";
	s.eVar11="D=pageName";
	s.eVar41="D=pageName";
	setProp3(x);

	//PFM
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
			if(x.vrt === 'Gifts') {s.eVar40 = 'Gift Finder';}
				else if(gup('sortOption') === 'RATING_HIGH_TO_LOW') {s.eVar40 = 'Top Rated';}
				else {
						s.eVar40 = 'Browse';
					}
	 			}
	// Set prop17 for keyword redirect pages only
	if(gup('prop17') !== '') {
	s.prop17 = gup(unescape('prop17'));
	s.prop49='Search Redirect > Vertical';
	s.prop11=s.prop17;
	setKeywordDirectVars(x);
	}

	/* Code added for vertical redesign - Start */
	if (typeof verticalOmVars !== 'undefined' && verticalOmVars !== undefined && verticalOmVars !== null) {
		s.pageName = verticalOmVars.pageName;
		s.channel = verticalOmVars.channel;
		s.prop1 = verticalOmVars.prop1;
		s.prop2 = verticalOmVars.prop2;
		s.prop3 = verticalOmVars.prop3;
		s.prop27 = verticalOmVars.prop27;
		s.prop28 = verticalOmVars.prop28;
	}
	if (typeof pageNameOmVar !== 'undefined' && pageNameOmVar !== undefined && pageNameOmVar !== null) {
		s.pageName = pageNameOmVar.name.replace(/<p>|<\/p>/g,"");
	}
	/* Code added for vertical redesign - End */
}

function setComparePageVars(x) {
	var url = window.location.href,
	    dw_param = gup( 'dw' ),
	    dataUnavlbl = 'NA > ' + url,
	    pageType = "Product Compare";
	s.pageName = pageType;
	if (dw_param !== null && dw_param.toLowerCase() === 'y'){
		s.eVar40 = "Delver Compare";
	}else{
	s.eVar40 = "Compare";
	}
	s.prop27 = pageType;
	if(x.vrt !== null && x.vrt.length ) {
		s.channel = x.vrt;
		s.prop28 = x.vrt+' > '+pageType;
	} else {
		s.channel = dataUnavlbl;
		s.prop28 = dataUnavlbl + ' > ' + pageType;
	}
	if(x.vrt !== null && x.vrt.length && x.cat !== null && x.cat.length )
		s.prop1 = x.vrt+' > '+x.cat;
	else
		s.prop1 = dataUnavlbl;
	if(x.vrt !== null && x.vrt.length  && x.cat !== null && x.cat.length && x.subcat !== null && x.subcat.length)
		s.prop2 = x.vrt+' > '+x.cat+' > '+x.subcat;
	else
		s.prop2 = dataUnavlbl;
	setProp3(x);
}

function setCategoryVars(x) {
	var pageType = "Category";
	s.pageName = pageType+' > '+x.vrt+' > '+x.cat;
	s.channel = x.vrt;
	s.prop1 = x.vrt+' > '+x.cat;
	s.prop2 = x.vrt+' > '+x.cat;

	if (typeof isViewAll!== 'undefined' && isViewAll !== undefined && isViewAll ==='true')
	s.prop27="Category View All";
	else
	if (typeof isNewCategory!== 'undefined' && isNewCategory !== undefined && isNewCategory ==='true') {
		s.prop27="Category New";
	}else if(typeof catVertCommonLayout !== 'undefined' && catVertCommonLayout !== undefined && catVertCommonLayout === 'true'){
		s.prop27="Category V2";
	}
	else
	s.prop27="Category Old";
	s.prop28 = x.vrt+' > '+pageType;
		s.events = "event39";
	s.eVar11="D=pageName";
	s.eVar41="D=pageName";
	setProp3(x);

	//PFM
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
		if(x.vrt === 'Gifts')
		 {s.eVar40 = 'Gift Finder';}
		else if(gup('sortOption') === 'RATING_HIGH_TO_LOW')
		 {s.eVar40 = 'Top Rated';}
				else {
						s.eVar40 = 'Browse';
					}
	 			}
	// Set prop17 for keyword redirect pages only
	if(gup('prop17') !== '') {
	s.prop17 = gup(unescape('prop17'));
	s.prop49='Search Redirect > Category';
		s.prop11=s.prop17;
	setKeywordDirectVars(x);
	}
}

function setSubCategoryVars(x) {

		// Landed in sub category page.
		var pageType = "Subcategory";
		s.pageName = pageType+' > '+x.vrt+' > '+x.cat+' > '+x.subcat;
		s.channel = x.vrt;
		s.prop1 = x.vrt+' > '+x.cat;
		s.prop2 = x.vrt+' > '+x.cat+' > '+x.subcat;
		s.prop27 = pageType;
		s.prop28 = x.vrt+' > '+pageType;
	s.eVar11="D=pageName";
	s.eVar41="D=pageName";

	setProp3(x);

	/*Added event56 as per ECOM-240755*/
	s.events = "event56,event25";

	//PFM
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
	if(x.vrt === 'Gifts') s.eVar40 = 'Gift Finder';
	else if(gup('sortOption') === 'RATING_HIGH_TO_LOW') s.eVar40 = 'Top Rated';
	else if(gup('keyword') !== '') {s.eVar40 = 'Search'; s.eVar4 = gup('keyword');}
	else s.eVar40 = 'Browse';
	}
	// Set prop17 for keyword redirect pages only
	if(gup('prop17') !== ''){
	s.prop17 = gup(unescape('prop17'));
		s.prop49='Search Redirect > '+ s.pageName;
			s.prop11=s.prop17;
		s.evar4=s.prop17;
		if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
		s.eVar40="Search";
		}
		s.events="event56,event25";
		if(!!$.cookie("SVert")  && $.cookie("SVert") !== undefined ){
			s.prop33 = $.cookie("SVert");
	}
}
}

function setDCPVars(x) {
		// Landed in sub category page.
		var pageType = "Subcategory";
		s.pageName = x.vrt+' > '+x.cat+' > '+x.subcat;
		s.channel = x.vrt;
		s.prop1 = x.vrt+' > '+x.cat;
		s.prop2 = x.vrt+' > '+x.cat+' > '+x.subcat;
		s.prop27 = pageType;
		s.prop28 = x.vrt+' > '+pageType;
	s.eVar11="D=pageName";
	s.eVar41="D=pageName";

	setProp3(x);
	s.events = "event56";

	//PFM
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
	if(x.vrt === 'Gifts') s.eVar40 = 'Gift Finder';
	else if(gup('sortOption') === 'RATING_HIGH_TO_LOW') s.eVar40 = 'Top Rated';
	else s.eVar40 = 'Browse';
	}
	// Set prop17 for keyword redirect pages only
	if(gup('prop17') !== ''){
		s.prop17 = gup(unescape('prop17'));
		s.prop49='Search Redirect > '+ s.pageName;
		s.prop11=s.prop17;
		if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
		s.eVar40="Search";
		}
		s.events="event25";
		if(!!$.cookie("SVert")  && $.cookie("SVert") !== undefined ){
			s.prop33 = $.cookie("SVert");
		}
	}
}

function setThemeVars(x) {
	var pageType = "Theme";
	s.pageName = pageType+' > '+x.themeName;
	s.channel = pageType+' > '+x.themeName;
	s.prop1 = pageType+' > '+x.themeName;
	s.prop2 = pageType+' > '+x.themeName;
	s.prop3 = pageType+' > '+x.themeName;
	s.prop27= pageType+' > '+x.themeName;
	s.prop28 = pageType+' > '+x.themeName;
}

function setProductVars(x){

	/*ECOM -235003 Starts here*/
	var pageType;
	if($('input#purchaseStatus').val() === "true"){
		pageType = "Persistent Product Summary";
	}else{
		pageType = "Product Summary";
	}

	var productType = document.getElementById("product").className,
	className = $('#product').attr('class'),
	names = className.split(' ');
	if(typeof rspuPageType !="undefined" && rspuPageType !=""){
		names.push(rspuPageType);
	}

	var outfitItems = $('#outfitsGridWrp .outfitProductWrp').size(),
	outfitOOSItems = $('#outfitsGridWrp .outfitProductWrp.oos').size();

	/*ECOM -235003 Ends here*/
	s.pageName = pageType;

	//prop10 for outfits
	if(names.length && jQuery.inArray('outfit',names) >-1) {
	     s.prop10=x.pid + ' > ' + outfitItems + ' > ' + outfitOOSItems;
	     s.eVar68 = x.pid;
	} else {
	s.prop10=x.pid;
	}

	var url = window.location.href,
	    dataUnavlbl = 'NA > ' + url;

	if (typeof vn != 'undefined' && vn != null && vn != ''){
        	s.channel = vn;
		s.prop28 = vn + ' > ' + pageType;
	} else if(x.vrt !== null && x.vrt.length) {
		s.channel = x.vrt;
		s.prop28 = x.vrt + ' > ' + pageType;
	} else if(typeof vName !== 'undefined' && vName.length ){
		s.channel = vName;
		s.prop28 = vName + ' > ' + pageType;
	}
	else {
		s.channel = dataUnavlbl;
		s.prop28 = dataUnavlbl + ' > ' + pageType;
	}

	//prop1 for outfits
	if(names.length && jQuery.inArray('outfit',names) >-1) {
		if(x.cat !== null && x.cat.length){
			s.prop1 = x.cat;
		}
		else if(typeof cName !== 'undefined' && cName.length){
			s.prop1 = cName;
		}
		else{
			s.prop1 = dataUnavlbl;
		}
	} else {
	if (typeof vn != 'undefined' && vn != null && vn != '' && typeof cn != 'undefined' && cn != null && cn != ''){
        	s.prop1 = vn+' > '+cn;
	} else if(x.vrt !== null && x.vrt.length  && x.cat !== null && x.cat.length ){
		s.prop1 = x.vrt+' > '+x.cat;
	}
	else if(typeof vName !== 'undefined' && vName.length  && typeof cName !== 'undefined' && cName.length){
	  	s.prop1 = vName+' > '+cName;
	}
	else{
		s.prop1 = dataUnavlbl;
	}
	}

	//prop2 for outfits
	if(names.length && jQuery.inArray('outfit',names) >-1) {
		if(x.subcat !== null && x.subcat.length ){
			s.prop2 = x.subcat + ' > ' + outfitItems + ' > ' + outfitOOSItems;
		}
		else if(typeof sName !== 'undefined' && sName.length ){
			s.prop2 = sName + ' > ' + outfitItems + ' > ' + outfitOOSItems;
		}
		else{
			s.prop2 = dataUnavlbl;
		}
	} else {
	if (typeof vn != 'undefined' && vn != null && vn != '' && typeof cn != 'undefined' && cn != null && cn != '' && typeof sn != 'undefined' && sn != null && sn != ''){
        	s.prop2 = vn+' > '+cn+' > '+sn;
	} else if(x.vrt !== null && x.vrt.length  && x.cat !== null && x.cat.length  && x.subcat !== null && x.subcat.length ){
		s.prop2 = x.vrt+' > '+x.cat+' > '+x.subcat;
	}
	else if(typeof vName !== 'undefined' && vName.length  && typeof cName !== 'undefined' && cName.length  && typeof sName !== 'undefined' && sName.length ){
		s.prop2 = vName+' > '+cName+' > '+sName;
	}
	else{
		s.prop2 = dataUnavlbl;
	}
	}
	var productType = document.getElementById("product").className,
	    className = $('#product').attr('class'),
	    names = className.split(' ');
		if(typeof rspuPageType !="undefined" && rspuPageType !=""){
			names.push(rspuPageType);
		}
	if(names.length )
	{
		if(names.length === 1)
		{
			var name = names[0];
		}
		else
		{
			var name = names[1];
		}

		if(typeof bundleProductPage !== 'undefined' && bundleProductPage) {
			s.prop27 = pageType+" > BDL";
			s.eVar40 = 'PDP:Bundle';
			s.eVar68 = bundlesJson.pId;
			if(bundlesJson.promotionName !== '') {
				s.eVar5 = bundlesJson.promotionName;
			}
			if(!!$.cookie("zipCode10153") && $.cookie("zipCode10153") !== undefined && $.cookie("zipCode10153") !== '') {
				s.eVar62 = $.cookie("zipCode10153");
			}
		}else if(jQuery.inArray('softline',names) >-1 ){
			s.prop27 = pageType+" > SL3";
		}else if(jQuery.inArray('hardline',names) >-1 || name.toLowerCase() === 'hardlinecpc'){
				s.prop27 = pageType+" > HL3";
		}else if($('#addCart').hasClass('btn_scheduleChange')){
			s.prop27 = pageType+" > HL";
		}else if(typeof outfitPage !== 'undefined' && outfitPage.toLowerCase() === 'true'){
			s.prop27 = pageType+" > OTF";
		}else{
			s.prop27 = pageType+" > COL";
		}
	}

	if(typeof x.evt !== 'undefined') {

	if(!!$.cookie("viewType")){
		var layout=$.cookie("viewType")
	}else{
		var layout='gal';
	}
		var blockNo;
		/*ECOM-247154 fix*/
		var blockType="";
		if(gup('blockType') !== ''){
			blockType = gup('blockType');
		}
		if(gup('blockNo')!=='' || gup('ViewAll')!=='true') {
		blockNo=gup('blockNo');
		if(layout === 'pac') eVar28 = 'P'+blockNo;
	    else if(layout === 'gal') eVar28 = 'G'+blockNo;
	    else if(layout === 'list') eVar28 = 'L'+blockNo;
		if(gup('blockNo')!=='' ){
		    s.prop29=blockNo;
		}
		if(s.prop27==="Product Summary > OTF"){
		var outfitItems = $('#outfitsGridWrp .outfitProductWrp').length,
		outfitOOSItems = $('#outfitsGridWrp .outfitProductWrp.oos').length;

		s.events='prodView,event10,event40,event28,event29';
			var evnt = x.evt.products.split(',');
			s.products='';
						for(var i=0;i<evnt.length;i++) {
						var ck=evnt[i];
						s.products+=ck+";;;event29="+blockNo+"|event28="+blockType+",";
		}
		// To track Number of Outfit items under a product
			trackClickActionOutfits('Outfits > Total Outfit Item Count >'+outfitItems);
		// To track Number of Out of Stock Outfit items under a product
			if (outfitOOSItems >= 1) {
				trackClickActionOutfits('Outfits > Outfit Offline Items >'+outfitOOSItems);
			}
		}else if(s.prop27!=="Product Summary > COL"){
		s.events='prodView,event10,event28,event29';
		s.products=x.evt.products+";;;event29="+blockNo+"|event28="+blockType;
		}else if(s.prop27==="Product Summary > COL"){

		s.events='prodView,event10,event40,event28,event29';
			var evnt = x.evt.products.split(',');
			s.products='';
						for(var i=0;i<evnt.length;i++) {
						var ck=evnt[i];
						s.products+=ck+";;;event29="+blockNo+"|event28="+blockType+",";
		}
		}}
		else
		{
			s.events = x.evt.events;
			s.products = x.evt.products;}
		if(typeof bundleProductPage !== 'undefined' && bundleProductPage) {
			s.events = x.evt.events;
			s.products = x.evt.products;
		}
	}

	if(typeof mktPlaceInd !== 'undefined'){
			var mktNameList = $('input#mktNameList').val();
		if(typeof $('input#omnMerchPID').val() !== 'undefined' && $('input#omnMerchPID').val() !== '' && typeof mktNameList !== 'undefined' && mktNameList !== '^SHC*SHC') {
			s.events=s.events+",event45";
			mktstring = $('input#mktNameList').val();

			if(mktPlaceInd === "CPC"){
				s.events= s.events + ",event48,event50";
			}
			else if(mktstring.indexOf('CPC') != -1) {
				s.events=s.events + ",event50";
			}

			if(mktPlaceInd === "FBM"){
				s.events= s.events + ",event49,event51";
			}
			else if(mktstring.indexOf('FBM') != -1) {
				s.events=s.events + ",event51";
			}

			if(mktPlaceInd === "FBS"){
				s.events= s.events + ",event52,event53";
			}
			else if(mktstring.indexOf('FBS') != -1) {
				s.events=s.events + ",event53";
			}
			//Added for ECOM-247086
			if(mktPlaceInd === "SHC"){
				s.events = s.events + ",event53,event54";
			}
			else if(mktstring.indexOf('SHC') != -1){
					s.events= s.events + ",event54";
			}

		} else {
			if(s.events != 'event46,event47') {
			     if(typeof buyerprotection !=='undefined' && buyerprotection !== null){
					s.events = s.events + buyerprotection;
			     }
			}
		}
		if(typeof viewAllMerchEvt !== 'undefined' && !!viewAllMerchEvt) {
			s.events = viewAllMerchEvt;
		}

		var tmp_brand="", tmp_vrt="", tmp_cat="";

    	/*if (typeof x.evt !== 'undefined' && x.evt.eVar43 !=='undefined' && x.evt.eVar43 !== null && x.evt.eVar43.length){
    	    tmp_brand=x.evt.eVar43;
    	}*/

    	if (x.vrt !==null && x.vrt.length){
    	    tmp_vrt=x.vrt;
    	}

    	if (x.cat !==null && x.cat.length){
    	    tmp_cat=x.cat;
    	}

    	if (s.events == 'prodView,event10')
    	{
          	s.products=x.evt.products+";;;;";
			if(tmp_brand !==null && tmp_brand.length)
			{
			     if( (tmp_cat !==null && tmp_cat.length)|| (tmp_vrt !==null && tmp_vrt.length)){
				 s.products=s.products+tmp_brand;
				 }
				 else
				 s.products=s.products+tmp_brand;
			}
    	}
		else if(s.events.match("^(prodView,event10,event45)"))
		{
			s.products=x.evt.products+";;;event45=1;";
			if(tmp_brand !==null && tmp_brand.length)
			{
				if( (tmp_cat !==null && tmp_cat.length)|| (tmp_vrt !==null && tmp_vrt.length))
				{
					s.products=s.products+tmp_brand;
				}
				else
					s.products=s.products+tmp_brand;
			}
		}
	if((typeof $('input#omnMerchPID').val() !== 'undefined' && $('input#omnMerchPID').val() !== '') && (typeof sinNumber !== 'undefined' && sinNumber !== '')){
				mktstring = $('input#mktNameList').val();
				aMktName =  mktstring.split("^");
				var omnMerchId = $('input#omnMerchId').val().split('|');
				var omnMerchPID = $('input#omnMerchPID').val().split('|');
				//s.prop10=''; //ECOM-241227
					s.products=s.products + "|";
					CPCFlag = 0;
					FBMflag = 0;
					FBSflag = 0;
					//s.products=s.products+"evar35="+sinNumber+"|event45=1"
					/*ECOM-247154 fix*/
					s.products= s.products + ";"+sinNumber+";;;event45=1"+prodBrand+"|evar35="+sinNumber;
					var tempVendorName;
					for(var i = 1 ; i < aMktName.length; i++){
						aMktType = aMktName[i].split("*");
							tempVendorName = aMktType[1];
							tempVendorName = replaceAll(tempVendorName,',','');
							tempVendorName = replaceAll(tempVendorName,';','');
							tempVendorName = replaceAll(tempVendorName,'|','');
						s.products=s.products+",;M:"+tempVendorName+";;;";
						if((aMktType[0] === "CPC") && (CPCFlag == 0 || CPCFlag ==1)){
							/*ECOM-247086 changes*/
							if(CPCFlag == 0 && mktstring.indexOf('CPC') != -1){
								s.products=s.products+"event48=1|event50=1;"
								CPCFlag = 1;
					} else if(CPCFlag ==1) {
								s.products=s.products+"event50=1;"
								CPCFlag = 1;
							}
				} else if ((aMktType[0] === "FBM") && (FBMflag == 0 || FBMflag ==1)) {
							/*ECOM_247086 Changes*/
							if(FBMflag == 0 && mktstring.indexOf('FBM') != -1 && mktPlaceInd == "FBM"){
								s.products=s.products+"event49=1|event51=1;"
								FBMflag = 1;
							}else{
								s.products=s.products+"event51=1;"
								FBMflag = 1;
							}
				} else if ((aMktType[0] == "FBS") && (FBSflag == 0 || FBSflag ==1)) {
							if(FBSflag == 0  && mktstring.indexOf('FBS') != -1){
								s.products=s.products+"event52=1|event53=1;"
								FBSflag = 1;
					} else if(FBSflag ==1) {
								s.products=s.products+"event53=1;"
								FBSflag = 1;
							}
						}
						//Changes for ECOM-247086
						//else if((aMktType[0] == "SHC") && mktstring.length > 0 && mktstring.indexOf('SHC') > -1) {
						//	s.products=s.products+"event54=1;"
						//}

			   s.products=s.products+"evar8="+omnMerchId[i]+"|evar35="+sinNumber+"|evar38="+omnMerchPID[i];
			   if(omnMerchId[i] === 'SHC'){
			   	s.prop10=omnMerchPID[i];
					}
				}
	}
	}

	//Fix for ECOM-263259
	if($('#upsellModTable').length >= 1){
		s.prop15="R0::Upgrade:Product Summary:TEC";
	}

	// Set prop17 for keyword redirect pages only
	if(gup('prop17') !== '')

	{	s.prop17 = gup(unescape('prop17'));
		s.prop49='Search Redirect > Product Summary';
		s.events="prodView,event10";
				s.prop11=s.prop17;
				s.products=x.evt.products;
				if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
			if(gup('brec') !== '' && gup('brec') === 'Y') {
			        s.eVar40="Model Recommendations Search";
			} else {
				s.eVar40='Search';
				}
		}
	s.prop29='';
	s.prop48='';
	setKeywordDirectVars(x);
		}
	else
	{
		if (x.kywrd !== null && x.kywrd.length )
		{
    		s.prop17=x.kywrd.toLowerCase();
    	}
	}
	setProp3(x);
}

function setDAPVars(x) {
	var pageType = 'DAP > ' + x.vrt;
	s.pageName = pageType;
	s.channel = pageType;
	s.prop1 = pageType;
	s.prop2 = pageType;
	s.prop3 = pageType;
	s.prop27 = pageType;
	s.prop28 = pageType;
	s.eVar12 = 'D=pageName';
	if(x.vrt.toLowerCase() === 'wow specials') s.eVar40="Deal of the Day";
	else if(x.vrt.toLowerCase() === 'personal shopper') s.eVar40="Personal Shopper";
	if(gup('prop17') !== '') {
		s.prop17 = gup(unescape('prop17'));
		s.prop49='Search Redirect > '+pageType;
		s.prop11=s.prop17;
		setKeywordDirectVars(x);
		s.events="event25";
	}
}

function setDAPCVars(x) {

	s.linkTrackVars="pageName,channel,prop1,prop2,prop3,eVar12,eVar25,prop13,prop18,prop27,prop28,prop52,eVar75,eVar52,eVar5";
	if(typeof searsStylePagename != 'undefined'){
		s.pageName = searsStylePagename;
	}
	if(typeof searsStyleChannel != 'undefined'){
		s.channel = searsStyleChannel;
	}
	if(typeof searsStyleProp1 != 'undefined'){
		s.prop1 = searsStyleProp1;
	}
	if(typeof searsStyleProp2 != 'undefined'){
		s.prop2 = searsStyleProp2;
	}
	if(typeof searsStyleProp3 != 'undefined'){
		s.prop3 = searsStyleProp3;
	}
	if(typeof searsStyleeVar12 != 'undefined'){
		s.eVar12 = searsStyleeVar12;
	}
	if(typeof searsStyleProp13 != 'undefined'){
		s.prop13 = searsStyleProp13;
	}
	if(typeof searsStyleProp18 != 'undefined'){
		s.prop18 = searsStyleProp18;
	}
	if(typeof searsStyleeVar25 != 'undefined'){
		s.eVar25 = searsStyleeVar25;
	}
	if(typeof searsStyleProp27 != 'undefined'){
		s.prop27 = searsStyleProp27;
	}
	if(typeof searsStyleProp28 != 'undefined'){
		s.prop28 = searsStyleProp28;
	}
	if(typeof searsStyleProp52 != 'undefined'){
		s.prop52 = searsStyleProp52;
	}
	if(typeof searsStyleeVar75 != 'undefined'){
		s.eVar75 = searsStyleeVar75;
	}
	if(typeof searsStyleeVar5 != 'undefined'){
		s.eVar5 = searsStyleeVar5;
	}
	s.eVar52 = "nh";
}

function setGiftCardVars(x) {
	var pageType = 'Gift Cards > ';
	if(window.location.href.indexOf('Physical') > -1) pageType += 'Order Gift Cards';
	else if (window.location.href.indexOf('Virtual') > -1) pageType += 'Order eGift Cards';
	else if (window.location.href.indexOf('Print') > -1) pageType += 'Order Print Cards';
	else pageType += 'Check Gift Card Balance';
	s.pageName = pageType;
	s.channel = x.summary;
	s.prop1 = pageType;
	s.prop2 = pageType;
	s.prop3 = pageType;
	s.prop27 = pageType;
	s.prop28 = pageType;
}

function setNoSearchVars(x) {
	var pageType = "No Search Results";
	s.pageName = pageType;
	s.channel = "Search Results";
	s.events = "event26";
	s.prop1 = pageType;
	s.prop2 = pageType;
	s.prop27 = pageType;
	s.prop28 = pageType;
	s.prop3 = pageType;
	if(!!$.cookie("SVert")  && $.cookie("SVert") !== undefined ){
s.prop33 = $.cookie("SVert");
			}
	if(!!$.cookie("SVert")  && $.cookie("SVert") !== undefined ){
s.prop33 = $.cookie("SVert");
			}
	s.prop49='Zero';
	s.eVar49='Zero';
	setProp11(x);
}

function setShopByClearanceVars(x) {
	var pageType = 'Browse';
	s.pageName = pageType;
	if(gup('prop17') !== '') {
		s.eVar4=gup(unescape('prop17'));
	}
	if(s.getQueryParam("redirectType")){
		s.eVar40="Search BRAT Redirect";
	}
	else{
	s.eVar40 = pageType;
}
}

function setKeywordDirectVars(x) {
	s.events = s.events+",event25";
	if(!!$.cookie("SVert")  && $.cookie("SVert") !== undefined ){
s.prop33 = $.cookie("SVert");
}
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
		if(gup('brec') !== '' && gup('brec') === 'Y') {
		       s.eVar40="Model Recommendations Search";
		} else {
	s.eVar40="Search";
}
}
}

function setAdYourWayVars(x) {
	var pageType = "AdYourWay";
	s.pageName = pageType;
	s.channel = pageType;
	s.prop1 = pageType;
	s.prop2 = pageType;
	s.prop3 = pageType;
	s.prop27 = pageType;
	s.prop28 = pageType;
	s.eVar40 = pageType;
}

function setMRVars(x) {
	try {
			s.linkTrackVars="pageName,channel,prop1,prop2,prop3,eVar4,prop11,prop13,prop18,prop27,prop28,eVar40";
			s.linkTrackEvents="event80";
			s.events = "event80";
			if(x.pid === '') {
				var pageType = 'Model Recommendations '+omKywrd+' Results';
				s.pageName = pageType;
				s.channel = pageType;
				s.prop1 = pageType;
				s.prop2 = pageType;
				s.prop3 = pageType;
				if(x.kywrd !== '') {
					s.eVar4 = omKywrd;
					s.prop11 = omKywrd;
				}
				if(x.vrt !== '' && x.cat !== '' && x.subcat !== '') {
					s.prop13 = pageType+' > '+omVrt+' > '+omCat+' > '+omSubCat;
					s.prop18 = pageType+' > '+omVrt+' > '+omCat+' > '+omSubCat;
					s.prop27 = pageType+' > '+omVrt+' > '+omCat+' > '+omSubCat;
				}
				else if(x.vrt !== '' && x.cat!=='' && x.subcat === '') {
					s.prop13 = pageType+' > '+omVrt+' > '+omCat;
					s.prop18 = pageType+' > '+omVrt+' > '+omCat;
					s.prop27 = pageType+' > '+omVrt+' > '+omCat;
				}
				else if(x.vrt !== '' && x.cat ==='' && x.subcat === ''){
					s.prop13 = pageType+' > '+omVrt;
					s.prop18 = pageType+' > '+omVrt;
					s.prop27 = pageType+' > '+omVrt;
				}
				s.prop28 = omVrt+' > '+pageType;
			} else {
				var pageType = 'Model Recommendations Results';
				s.pageName = pageType;
				s.channel = pageType;
				s.prop1 = pageType;
				s.prop2 = pageType;
				s.prop3 = pageType;
				s.prop13 = pageType+' > '+omVrt+' > '+omCat+' > '+omSubCat;
				s.prop18 = pageType+' > '+omVrt+' > '+omCat+' > '+omSubCat;
				s.prop27 = pageType+' > '+omVrt+' > '+omCat+' > '+omSubCat;
				s.prop28 = omVrt+' > '+pageType;

			}
				s.eVar40 = 'Model Recommendations Search';
				s.tl(true,'o','Model Recommendation Search');
		}
		catch(e){
	}
}

function setSearchVars(x) {
	try {
		var pageType = x.summary;
		s.pageName = pageType;
		s.channel = pageType;
		s.events = "event25";
		s.prop1 = pageType;
		s.prop2 = pageType;
		if(omKywrd !== undefined && omKywrd !== ''){
			s.eVar4=omKywrd;
		}
		if(x.vrt !== '' && x.cat!=='' && x.subcat!== ''){
			s.prop27 = 'Search Results > Subcategory';
			s.prop28 = x.vrt + ' > Search Results';
		}
		else if(x.vrt !== '' && x.cat!=='' ){
			s.prop27 = 'Search Results > Cateogry';
			s.prop28 = x.vrt + ' > Search Results';
		}
		else if(x.vrt !== ''){
			s.prop27 = 'Search Results > Vertical';
			s.prop28 = x.vrt + ' > Search Results';
		}
		else{
			s.prop27 = 'Search Results';
			s.prop28 = 'Search Results';
		}
		s.prop3 = pageType;
		if(!!$.cookie("SVert")  && $.cookie("SVert") !== undefined ){
s.prop33 = $.cookie("SVert");
			}
		s.prop49=x.productCount;
		s.eVar49=x.productCount;
		if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
			if(gup('brec') !== '' && gup('brec') === 'Y') {
			       s.eVar40="Model Recommendations Search";
			} else {
		s.eVar40="Search";
		}
		}
		if(!!$.cookie("lmppopupOm"))
		{
			if(!!$.cookie("lmppopupProp22")){
			s.prop22 =  $.cookie("lmppopupProp22");
			$.cookie("lmppopupOm",null,{path:'/shc/s/'});
			$.cookie("lmppopupProp22",null,{path:'/shc/s/'});
			}

		}
		if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
			if(gup('sortOption') === 'RATING_HIGH_TO_LOW'){
				s.eVar40 = 'Top Rated';
			}
		}
		//Change for ECOM-232005
		if(gup('yikes_prod') !== ''){
			s.eVar40 = 'Product-Error-Search';
		}
		setProp11(x);
	}catch(e){
	}
}

function setNBVars(x) {
	var url = window.location.href, pageType;
	if(x.vrt !== null && x.vrt.length )
	{
		pageType = 'NB > ' + x.vrt;
	}
	else
	{
		pageType = 'NA > ' + url;
	}
	s.pageName = pageType;
	s.channel = pageType;
	s.prop1 = pageType;
	s.prop2 = pageType;
	s.prop3 = pageType;
	s.prop27 = pageType;
	s.prop28 = pageType;

	if(!!$.cookie("SVert")  && $.cookie("SVert") !== undefined ){
		s.prop33 = $.cookie("SVert");
	}
	s.prop49='Search Redirect > '+pageType;
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
	s.eVar40='Search';
	}
	s.events="event25";
	if(gup('prop17') !== '') {
			s.prop17 = gup(unescape('prop17'));
			s.prop11=s.prop17;
	}
	s.eVar12 = 'D=pageName';
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
	if(x.vrt.toLowerCase() === 'myrecs') {
		s.eVar40 = 'Recommendations';
	} else if(x.vrt.toLowerCase() === 'catalogs') {
		s.eVar40 = 'Catalog';
	} else if(x.vrt.toLowerCase() === 'kitchenadvisor') {
		s.eVar40 = 'Kitchen Advisor';
	} else if(x.vrt.toLowerCase() === 'laundryadvisor') {
		s.eVar40 = 'Laundry Advisor';
	} else if(x.vrt.toLowerCase().indexOf('shop by room') > -1) {
		s.eVar40 = 'Shop By Room';
	}
	}
}

function setProp11(x) {
	if (x.kywrd !== null && x.kywrd.length ) {
		if(x.sid === null || x.sid.length === 0) {
    		s.prop11=x.kywrd.toLowerCase();
    	}
    	}
	}

function setProp3(x) {
	if(gup('sbv')!== '') {
		s.prop3=gup('sbv');
	} else {
		s.prop3 = x.vrt;
	}
}

function setVisitorVars() {
	populateUNameUVal();
	if(typeof UValue !== undefined && UValue !== '-1002'){
	                        s.prop9 = UValue;
	                        s.eVar1 = UValue;
	} else {
		if($.cookie('akamaiCookie') !== null && $.cookie('akamaiCookie').split('|')[1] !== ''){
			s.prop9 = "Registered";
			var persistCookieVal = unescape($.cookie("WC_PERSISTENT")).split(",")[0],
			    persistIndex = persistCookieVal.lastIndexOf("_");
			s.eVar1 = persistCookieVal.substr(persistIndex+1);
		}
		else{
		s.prop9 = '1234567';
		s.eVar1 = '1234567';
	}
}
}

function setUserProfieVars(x) {
	try{
		if(omUserType !== null && omUserType.length )
			s.eVar45 = omUserType;

		if($.cookie("s_r")!=null && $.cookie("s_r")=='s_r_Y' && eval ("(" + $.cookie('SVPersonalizationCookie')+ ")").sywrMember == 'True')
		s.eVar30 = 'sywr|craftsmanclub';
			else
			s.eVar30 = 'Anonymous';
		if($.cookie("s_r")!==null && $.cookie("s_r")==='s_r' && typeof UName !== undefined && UName === 'Guest')
		{
			s.eVar45 = 'Anonymous';
		}
		else if($.cookie("s_r")!==null && $.cookie("s_r")==='s_r_Y' && typeof UName !== undefined && UName !== 'Guest'){
			s.eVar45 = 'Registered';
		}
		if(!!$.cookie("zipCode10153") && $.cookie("zipCode10153") !== undefined )
		{
		s.eVar17 = $.cookie("zipCode10153");
		}
		else
		{
			s.eVar17 = "Not Provided";
	}
	}
	catch(e){
        }
}

function setSeeAllFiltersPageVars(x){

	var hashIndex=location.href.indexOf("filterName"),
	    omFilterTemp=location.href.substring(hashIndex+11),
	    filterIndex,
	    filterName = '';
	if(omFilterTemp.indexOf('&')!==-1)
	{
	filterIndex = omFilterTemp.indexOf('&')
	}
	else
	{
	filterIndex = omFilterTemp.length;
	}
	filterName=omFilterTemp.substring(0,filterIndex);

	if(typeof filterName !== 'undefined' && filterName !== ''){
		if(filterName === 'storeOrigin')
			filterName = 'Sellers';
		if (typeof s !== 'undefined'){
			s.linkTrackVars="pageName,channel,prop2,prop3,prop27,prop28";
			s.pageName = 'See All '+filterName;
			s.channel = 'See All '+filterName;
			s.prop2 = 'See All '+filterName;
			s.prop3 = 'See All '+filterName;
			s.prop27 = 'See All '+filterName;
			s.prop28 = 'See All '+filterName;
			s.tl();
		}
	}
}

function setGRGTPageVars(x) {
if(omPageName !== 'Gift Registry > Category')
	{
		s.pageName=omPageName;
		s.prop1=omPageName;
		s.prop2=omPageName;
		s.prop3=omPageName;
		s.prop27=omPageName;
		s.prop28=omPageName;
	}

	s.channel=channel;
	s.prop9=omVisitorId;
	s.eVar1=omVisitorId;
	s.eVar30=omProfileStatus;
	s.eVar40=productFindingmethod;
	s.eVar45=omUserType;
}

function setRebatePageVars(x){
s.pageName='Available Rebates';
s.channel=x.vrt;
s.prop1=x.vrt+' > '+x.cat;
s.prop2=x.vrt+' > '+x.cat+' > '+x.subcat;
s.prop3=x.vrt;
s.prop27='Available Rebates'
s.prop28=x.vrt+' > Available Rebates';
}

//Added for ECOM-109873
function setShoppingRecapPageVars(x){
s.pageName='Shopping Recap';
s.channel='Shopping Recap';
s.prop1='Shopping Recap';
s.prop2='Shopping Recap';
s.prop3='Shopping Recap';
s.prop27='Shopping Recap';
s.prop28='Shopping Recap';
}

function setShopByBrandPageVars(x){
if(x.vrt !== '' && x.cat!=='' && x.subcat!== ''){
s.pageName = 'Shop by Brand > '+x.sbv+' > '+x.subcat;
		s.channel = x.vrt;
		s.prop1 = x.vrt+' > '+x.cat;
		s.prop2 = x.vrt+' > '+x.cat+' > '+x.subcat;
		s.prop3 = x.sbv;
		s.prop27 = 'Shop by Brand > Subcategory';
		s.prop28 = x.vrt+' > Shop by Brand > Subcategory';
	}
	else
	if(x.vrt !== '' && x.cat!=='' ){
	s.pageName = 'Shop by Brand > '+x.sbv+' > '+x.cat;
			s.channel = x.vrt;
			s.prop1 = x.vrt+' > '+x.cat;
			s.prop2 = x.vrt+' > '+x.cat;
			s.prop3 = x.sbv;
			s.prop27 = 'Shop by Brand > Category';
			s.prop28 = x.vrt+' > Shop by Brand > Category';
	}
	else
		if(x.vrt !== ''){
		s.pageName = 'Shop by Brand > '+x.sbv+' > '+x.vrt;
		s.channel = x.vrt;
		s.prop1 = x.vrt;
		s.prop2 = x.vrt;
		s.prop3 = x.sbv;
		s.prop27 = 'Shop by Brand > Vertical';
		s.prop28 = x.vrt+' > Shop by Brand > Vertical';
	}
		s.events = "event25";
		if(!!$.cookie("SVert") && $.cookie("SVert") != undefined ){
			s.prop33 = $.cookie("SVert");
			}
		s.prop49='Search Redirect > '+s.pageName;
		if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
		s.eVar40='Search';
		}
		if(gup('prop17') !== '') {
				s.prop17 = gup(unescape('prop17'));
				s.prop11=s.prop17;
		}

}


function getSHC() {
	var shc=new SHC();
	try {
		var bodyName = "";
		try{
			bodyName = (document.getElementsByTagName('body')[0]).id;
		}catch(e){}

		//Home page
		if(bodyName !== "" && bodyName.toLowerCase() === "home") {
			omVrt = HOME_PAGE;
			omPageName = HOME_PAGE;
		}
		else if(bodyName !== "" && bodyName === "dyn_NB")
		{
			if(omPrefix.toLowerCase() === "undefined")
			{
				omPrefix = NB;
			}
			if(omPrefix === "Rebate Availability"){
			if(omVrt === "") {
				try	{
					if(typeof verticalName !== 'undefined' && verticalName !== "") {
						omVrt = verticalName;
		}
				}catch(e){}
				try{
					if(typeof verticalOmniName !== 'undefined' && verticalOmniName !== ""){
						omVrt = verticalOmniName;
					}
				}catch(e){}
			}

			if(omCat === "")	{
				if(typeof categoryName !== 'undefined' && categoryName !== "") {
					omCat = categoryName;
				}
			}

			if(omSubCat === ""){
				if(typeof subcategoryName !== 'undefined' && subcategoryName !== ""){
					omSubCat = subcategoryName;
				}
			}
		}
		}
		else {
			if(omVrt === "") {
				try	{
					if(typeof verticalName !== 'undefined' && verticalName !== "") {
						omVrt = verticalName;
					}
				}catch(e){}
				try{
					if(typeof verticalOmniName !== 'undefined' && verticalOmniName !== ""){
						omVrt = verticalOmniName;
					}
				}catch(e){}
			}

			if(omCat === "")	{
				if(typeof categoryName !== 'undefined' && categoryName !== "") {
					omCat = categoryName;
				}
			}

			if(omSubCat === ""){
				if(typeof subcategoryName !== 'undefined' && subcategoryName !== ""){
					omSubCat = subcategoryName;
				}
			}


		}
	}catch(e){}
	shc.pageName=omPageName;

	if(omVrt !=='undefined'){
	shc.vrt=omVrt;
	}

	if(omCat !== "undefined"){
	shc.cat=omCat;
	}
	if(omSubCat !== 'undefined'){
	shc.subcat=omSubCat;
	}
	if(omSbf !== 'undefined'){
	shc.sbf=omSbf;
	}
	if(omSbv !== 'undefined'){
	shc.sbv=omSbv;
	}
	if(omPid !== 'undefined'){
	shc.pid=omPid;
	}

	if(omPrefix !== 'undefined'){
	shc.summary = omPrefix;
	}
	if(channel !== 'undefined'){
		shc.channel = channel;
	}
	shc.GTfilter=s.getQueryParam('GTfilter');

	if (typeof omSprop28 !== 'undefined') shc.sprop28 = omSprop28;
	if (typeof pareview !== 'undefined' && pareview.length>0) shc.shcPareview=pareview;
	if (typeof omMvm !== 'undefined') shc.mvm=omMvm;
    if (typeof omV37 !== 'undefined') shc.paV37 = omV37;
	if (typeof omV30 !== 'undefined') shc.paV30 = omV30;
    if (typeof omV45 !== 'undefined') shc.paV45 = omV45;
    if (typeof eVar11 !== 'undefined') shc.rrV11 = eVar11;
	if (typeof eVar17 !== 'undefined') shc.bgV17 = eVar17;
    if(typeof GTfilter !== 'undefined' && GTfilter!=="" && GTfilter.length){
			shc.givetogetherfilter=GTfilter;
			GTfilter="";
		}

	//external event vars not always set
	if (typeof omEvt !== 'undefined') {

		shc.evt=new SHCEvent();
		var e=shc.evt;
		e.events=omEvt;

		if (typeof omPrds !== 'undefined') e.products=omPrds;
		if (typeof omV22 !== 'undefined') e.eVar22=omV22;
		if (typeof omV36 !== 'undefined') e.eVar36=omV36;
		if (typeof omV37 !== 'undefined') e.eVar37=omV37;
		if (typeof omV38 !== 'undefined') e.eVar38=omV38;
		if (typeof storeId !== 'undefined' && storeId !== null){
			if(storeId !== "10152" && storeId !== "10161") {
				if (typeof omV41 !== 'undefined') e.eVar41=omV41;
				if (typeof omV42 !== 'undefined') e.eVar42=omV42;
				}
		}else{
			if (typeof omV41 !== 'undefined') e.eVar41=omV41;
			if (typeof omV42 !== 'undefined') e.eVar42=omV42;
			}
		//if (typeof omV43 !== 'undefined') e.eVar43=omV43;
		if (typeof omV28 !== 'undefined') e.eVar28=omV28;
		//if (typeof prodBrand !== 'undefined') e.eVar43=prodBrand;
		if (typeof omV48 !== 'undefined') e.eVar48=omV48;
			}
	//end external vars

	//set vars from query string
	shc.filter=s.getQueryParam('Filter');
	shc.sid=s.getQueryParam('sid');
	shc.psid=s.getQueryParam('psid');
	shc.adCell=s.getQueryParam('adCell');
	shc.intcmp=s.getQueryParam('intcmp');
	shc.referrer=s.getQueryParam('ir');
	shc.crossSell=s.getQueryParam('cs');
	shc.adv=s.getQueryParam('adv');
	shc.year=s.getQueryParam('selectYear');
	shc.make=s.getQueryParam('selectMake');
	shc.model=s.getQueryParam('selectModel');
	shc.tireSz=s.getQueryParam('tireSize');
	shc.kywrd=s.getQueryParam('keyword');
	shc.kywrdRedirect=s.getQueryParam('keywordRedirect');
	if (shc.kywrdRedirect!=null && shc.kywrdRedirect.length>0) {
		shc.kywrd = shc.kywrdRedirect;
	}
	//end query string vars

	//set other derived vars
	shc.wcid=getWCID(s.getQueryParam('storeId'));
	if(typeof(omSbv) !== 'undefined' && typeof(omPrefix) !=='undefined' && typeof(omVrt)!=='undefined' && typeof(omCat)!=='undefined' && typeof(omSubCat)!=='undefined' && typeof(omSbf)!=='undefined'){

	shc.page=getPage(omPrefix, omVrt, omCat, omSubCat, omSbf, omSbv);
	}
	if(shc.page==='UNDEFINED' && typeof omPageName!=='undefined' && omPageName.length){
		shc.page=omPageName;
	}
	shc.sqPid=getSQPID();
	if (typeof storeId !== 'undefined' && storeId !== null && storeId !== "10165"){
		storeId = "10153";
		var ccDecline = getCCDecline(storeId),
		    cookieName =  'FULL_AUTH_';
		cookieName+=storeId;
	}
	if(ccDecline === 'Yes'){
		shc.ccV33 = ccDecline;
	}
	else if(ccDecline === 'Success'){
		shc.ccV32 = 'Yes';
		$.cookie(cookieName,'');
	}
	//end derived vars
	if(typeof productCount!=='undefined'){
		shc.productCount=productCount;
	}
	if (typeof omV40 !== 'undefined') {
        	    shc.findMer = omV40;
    }
    if(typeof omFilter !== 'undefined' && omFilter!=="" && omFilter.length){
		shc.filter=omFilter;
		omFilter="";
	}
	// Code inserted for tracking PAO1 billing page change
	if(typeof omV38 !== 'undefined'){
		shc.paV38=omV38;
	}
	 if(typeof omCollections !== 'undefined' && omCollections!=="" && omCollections.length){
		shc.findMer=omCollections;
	 	omCollections="";
	}
     if(typeof omniCollectionCartPageName !== 'undefined' && omniCollectionCartPageName!=="" && omniCollectionCartPageName.length){
		shc.bgV17=omniCollectionCartPageName;
	 	omniCollectionCartPageName="";
	}

	/* Added for Category page redesign 09_23 Start */
	if(typeof omFilterValues !== 'undefined' && omFilterValues !== "" && omFilterValues.length ){
		shc.filterValues = omFilterValues;
		omFilterValues = "";
	}
	/* Added for Category page redesign 09_23 End */
	if(typeof themeName !== 'undefined' && themeName !== "") {
		shc.themeName =	themeName;
	}
	return shc;
}

function SHC() {
	this.pageName="";
	this.make="";
	this.model="";
	this.year="";
	this.tireSz="";
	this.adCell="";
	this.sqPid="";
	this.wcid="";
	this.kywrd="";
	this.kywrdRedirect="";
	this.vrt="";
	this.cat="";
	this.subcat="";
	this.sbf="";
	this.sbv="";
	this.pid="";
        this.mvm="";
	this.sid="";
	this.psid="";
	this.filter="";
	this.givetogetherfilter="";
	this.page="";
	this.intcmp="";
	this.referrer="";
	this.crossSell="";
	this.adv="";
	this.productCount="";
	this.evt;
	this.brand="";
	this.rrV11="";
	this.findMer="";
	this.ccV32="";
	this.ccV33="";
	this.bgV17="";
	this.paV37="";
	this.paV30="";
	this.paV45="";
	this.shcPareview="";
	this.paV38="";
	this.sprop28="";
	this.filterValues = "";
	this.summary="";
	this.themeName="";
}

function SHCEvent() {
	this.events="";
	this.products="";
	this.state="";
	this.zip="";
	this.purchaseID="";
	this.eVar20="";
	this.eVar22="";
	this.eVar36="";
	this.eVar37="";
	this.eVar38="";
	this.eVar28="";
	this.eVar32="";
	this.eVar33="";
	this.eVar41="";
	this.eVar42="";
	this.eVar43="";
	this.evar45="";
	this.eVar23="";
	this.evar48="";
	this.eVar12="";
}

function getPage(pfx, vt, ct, sct, sbn, sbv) {
		//Store Pickup page starts
		if (typeof omSPUFromPage !== 'undefined') {
			if (!!omSPUFromPage ) {
				pfx = omSPUFromPage + ' - ' + pfx;
			}
		}
		if (typeof omSPUSeeAdditionalStore !== 'undefined') {
			if (!!omSPUSeeAdditionalStore ) {
				pfx = pfx.replace("SPU Order Options", "SPU Order Options - " + omSPUSeeAdditionalStore);
			}
		}
		//Store Pickup page ends

		var noSearchResult="N", tshopbyroom="";
		//Variables set on certain pages
		if (typeof omNoSearchResult !== 'undefined') {
			noSearchResult=omNoSearchResult;
		}
		if (typeof t_shopbyroom_name !== 'undefined') {
	    		tshopbyroom=t_shopbyroom_name;
		}
		//End variables set on certain pages
		if( typeof pfx === 'undefined'){
		pfx="";
		}

		var pfx_sub=pfx.substring(0,14), sfx="";
		if (pfx_sub !== 'Search Results'
			&& pfx_sub !== 'Shopping Cart'
			&& pfx_sub.indexOf('Error') === -1
			&& pfx_sub !== 'Product Summar'&& pfx_sub !=='Special Financ' &&pfx_sub!=='Special Offer'&&pfx_sub!=='Rebate > Deals' &&pfx_sub!=='Site Wide > De'){
			if (vt !== null && vt.length  && vt!== HOME_PAGE) {

				if (!!tshopbyroom ) {
					sfx=' > '+tshopbyroom;
				} else {
					sfx=' > '+vt;
				}

		 		if (ct !== null && ct.length && pfx_sub !== 'Product Review'){
					sfx+=' > '+ct;
					if (sct !== null && sct.length ) sfx+=' > '+sct;
				}
			} else {
			if (!!tshopbyroom ) {
				sfx=' > '+tshopbyroom;
				}
			}
		}

		if (sbn !== null && sbn.length  && sbn === 'Brand' && pfx_sub!=='Special Financ' && pfx_sub !=='Special Financ'  && pfx_sub!=='Special Offer' && pfx_sub!=='Rebate > Deals' &&pfx_sub!=='Site Wide > De'){
		      if (sbv !== null && sbv.length){
			sfx+=' > '+sbv;
		      }
		}

		if (pfx_sub === 'Search Results' && noSearchResult === 'Y'){
			pfx = 'No ' + pfx;
		}

	    if (pfx_sub === 'Research Cente' || pfx.substring(0,12) === 'Buying Guide') {
	       if (typeof omBGCat !== 'undefined' && omBGCat !== "") {
				sfx+=' > '+omBGCat;
		   }
		}
		return (pfx+sfx);
}

function getWCID(stid) {
		var namePfx='wcid_';
		if (stid !== null && stid.length ) {
			if (stid === kenmoreStoreId || stid === craftsmanStoreId) {
				stid = searsStoreId;
			}
			namePfx+=stid;
		}
		var cks = document.cookie.split(';');
		for(var i=0;i<cks.length;i++) {
			var ck=cks[i];
			while (ck.charAt(0)==' ') ck=ck.substring(1,ck.length);
			if (ck.indexOf(namePfx) === 0) {
				if (ck.indexOf('=') !== -1) {
					return ck.substring(ck.indexOf('=')+1,ck.length);
				}
			}
		}
		return null;
}

function getSQPID() {
	var t_sq, t_pid;
	t_sq=unescape(s.c_r('s_sq'));
	if (t_sq.indexOf("pid=") !== -1) {
		t_sq=t_sq.substring(t_sq.indexOf("pid=")+4, t_sq.length);
		if (t_sq.indexOf('&') !== -1) {
			t_pid=t_sq.substring(0,t_sq.indexOf('&'));
			return unescape(t_pid);
		}
	}
	return null;
}

function getCCDecline(stid) {
	var namePfx= 'FULL_AUTH_';
	if (stid !== null && stid.length ) {
		namePfx+=stid;
	}
	var cks = document.cookie.split(';');
	for(var i=0;i<cks.length;i++) {
			var ck=cks[i];
			while (ck.charAt(0)==' ') ck=ck.substring(1,ck.length);
			if (ck.indexOf(namePfx) === 0) {
				if (ck.indexOf('=') !== -1) {
					return ck.substring(ck.indexOf('=')+1,ck.length);
				}
			}
		}
		return null;
}

function gup(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)",
     regex = new RegExp( regexS ),
     results = regex.exec( window.location.href );
 if( results === null )    return "";
else    return results[1];
}
/*function to obtain UName and UValue*/
function populateUNameUVal(){
	var isUserLogin = "",
	    loginEnabled=0,
	    wcPersistentArray = [],
	    wcPersistentString = '';
try{
	/* Code to retrieve Member Id from WC_PERSISTENT cookie */
	if(!!$.cookie("WC_PERSISTENT")  && $.cookie("WC_PERSISTENT") !== undefined ){
		wcPersistentString=$.cookie("WC_PERSISTENT");
		wcPersistentString = unescape(wcPersistentString);

		/* To split the string if , is found in the cookie value*/
		if(wcPersistentString.indexOf(",") >= 0){
			wcPersistentString = wcPersistentString.split(",")[0];
		}

		/* For getting the index of last _ value */
		var lastIndex = wcPersistentString.lastIndexOf("_");
		/* Checking whether the lastIndexOf _ is greater then -1 */
		if(lastIndex!==undefined && lastIndex!==null && lastIndex >= 0){
			isUserLogin = wcPersistentString.substr(lastIndex+1);
		}

  	}
	/* Reading s_r cookie to identify the user's logged in status*/
	var cookieValue = $.cookie("s_r");
	cookieValue = unescape(cookieValue);
	if(cookieValue !== null && cookieValue!==undefined && cookieValue=== "s_r_Y") {
		UName = "Registered";
		UValue = isUserLogin;

	} else {
		UName = "Guest";
		UValue = "-1002";
	}
}
catch(e){
UName = "Guest";
UValue = "-1002";
}
}
function setLocalSellerDirectoryVars(x) {
	var pageType = "Local Seller Directory";
	s.pageName = pageType;
	}

function trackSocialButtons(buttonType){
	var clickType = "PDP";
	try {
		className = $('#product').attr('class');
		if(typeof className != "undefined"){
			names = className.split(' ');
			if(typeof rspuPageType !="undefined" && rspuPageType !=""){
				names.push(rspuPageType);
			}
			if(names.length)
			{
				if(names.length === 1)
				{
					var name = names[0];
				}
				else
				{
					var name = names[1];
				}
				if(jQuery.inArray('softline',names) >-1 )
					clickType += ":SL3";
				else if(jQuery.inArray('hardline',names) >-1 || name.toLowerCase() === 'hardlinecpc')
				{
						clickType += ":HL3";
				}
				else if($('#addCart').hasClass('btn_scheduleChange')){
					clickType += ":HL";
				}else if(typeof outfitPage !== 'undefined' && outfitPage.toLowerCase() === 'true')
					clickType += ":OTF";
				else{
					clickType += ":COL";
				}
				clickType += " > Header > Click > " + buttonType;
				if (typeof s !== 'undefined') {
					s.linkTrackVars='prop12,prop10,channel,prop1,prop2,prop3,prop19,prop27,prop28';
					s.prop12=clickType;
					s.tl(true,'o',clickType);
				}
			}
		} else {
			if (typeof s !== 'undefined') {
				s.linkTrackVars='prop12,prop10,channel,prop1,prop2,prop3,prop19,prop27,prop28';
				clickType = "Share This Page > " + buttonType;
				s.prop12=clickType;
				s.tl(true,'o',clickType);
			}
		}
	     }catch(e){}
}

function trackNavigation(name) {
	s.linkTrackVars='prop12,prop10,channel,prop1,prop2,prop3,prop19,prop27,prop28';
	s.prop12=name;
	s.tl(true,'o',name);

}

//Added for ECOM-264723
$(window).load(function () {
  	try{
		if(typeof FSR !== 'undefined' && typeof FSR.CPPS !== 'undefined'){
			var varParts = "";
			var varVar30 = "";
			if($.cookie('s_e5') !== null){
				varParts = $.cookie('s_e5');
			}
			if($.cookie('s_e30') !== null){
				varVar30 = $.cookie('s_e30');
			}
			if(varParts !== null && varParts.length > 0){
				FSR.CPPS.set("shcPartnerSite",varParts);
			}
			if(varVar30 !== null && varVar30.length > 0){
				FSR.CPPS.set("shcMPSHC",varVar30);
			}
	    }
  	}catch(e){}
});
/************************ Inclusion of shc_code.js end here ************************/


/************************ Inclusion of omniture_override.js start here ************************/
omOverride();


function omOverride()
{
	try
	{

		if(omniOveride("s","BrowseSubcategory"))
		{
			// Subcategory Page
			//s.eVar40 = "Sample For Testing";
		}

	}
	catch(e) {}
}

function omniOveride(str1,str2)
{

	var tempInputStr1 = str1;
	var tempInputStr2 = str2;
	var urlArray = [];
	var currentUrl = window.location.href;
	var domainValue = "";
	var restUrlValue = "";
	var seoUrlArray = [];
	var nonSeoUrlArray = [];
	var seoUrlValue = "";

	if(currentUrl != null && currentUrl.length > 0 ){

		urlArray = currentUrl.split('shc/s/');
		if(urlArray != null && urlArray.length > 0){

			domainValue = urlArray[0];
			restUrlValue = urlArray[1];

			if(domainValue != null && domainValue != 'undefined' && restUrlValue != null && restUrlValue != 'undefined'){
				seoUrlArray = restUrlValue.split( "_");
				seoUrlValue = seoUrlArray[0];

				nonSeoUrlArray = restUrlValue.split('?');
				nonSeoUrlValue = nonSeoUrlArray[0];

				if(seoUrlValue != null && seoUrlValue != 'undefined' && trim(seoUrlValue) == trim(tempInputStr1)){

						return true ;
				}
				else if(nonSeoUrlValue != null && nonSeoUrlValue != 'undefined' && trim(nonSeoUrlValue) == trim(tempInputStr2)){

						return true ;

				}
				else{
					return false;

				}

			}
			else{
				return false;
			}

		}
		else{
			return false;
		}

	}
	else{
		return false;
	}

}

/************************ Inclusion of omniture_override.js end here ************************/
