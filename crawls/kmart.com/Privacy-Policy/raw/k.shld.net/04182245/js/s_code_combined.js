/* SiteCatalyst code version: H.25.3.
Copyright 1996-2013 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com
For support with this s_code file, contact Matthew.Alexander@Adobe.com
Last Updated 4/11/2013 by Matthew.Alexander@Adobe.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
var s_account=omAcct;
if (location.host.indexOf('pilot.') > -1) s_account='searskmartpilot';
var s=s_gi(s_account);

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Conversion Config */
s.currencyCode="USD";
/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters = "javascript:,.sears.com,.searspr.com,.kmart.com,.chtah.com,.shoplocal.com,.mygofer.com,.craftsman.com,.kenmore.com,.diehard.com,.mykmart.com,.expotv.com,.mysears.com,184.106.1.131,184.106.1.128,184.106.1.129,.opionlab.com,.richrelevance.com,.semantictec.com,.expotv.com";
s.linkLeaveQueryString=false;
s.linkTrackVars="";
s.linkTrackEvents="None";

/************************** DFA VARIABLES **************************/
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
s.maxDelay="2000"; // maximum time to wait for DFA, in milliseconds
var dfa_visitCookie="s_dfa"; // The name of the visitor cookie to use to restrict DFA calls to once per visit.
var dfa_overrideParam="ADID"; // A query string paramter that will force the DFA call to occur.
var dfa_newRsidsProp; //="prop34"; // Stores the new report suites that need the DFA tracking code. (optional)
/************************ END DFA Variables ************************/

/* Plugin Config */
s.usePlugins=true;

s.ActionDepthTest = true;

/* Channel Manager Config */
s._channelPattern="Affiliates|iax,kax,max,i008>Direct Affiliate|idax,kdax,mdax>Affiliates CJ|cj>"
+"Email Promotional|iox>Email Triggered|itx>Email Transaction|iex>Paid Search|isx,ksx,msx>"
+"Datafeeds|idx,kdx,mdx>Deals and Promotions|ipr>Media|imx,dfa>Community|comm>Social Media|ism>"
+"Blogs|ibx>SMS|smsx>Cart to Cart|c2cx>QR Code|qrx>CD CC Phone|CDPhone>Kiosk|Kiosk>exclude|K-on-Sx,S-on-Kx>"
+"Editorial|edl";

function s_doPlugins(s) {
	
	// These lines prevent errors. I get "x is undefined" in unrelated HTML files if I take them out.
	s.events=s.events?s.events:"";
	s.products=s.products?s.products:"";
	
	// Set report suite
	s.rsid_list="searscom=Production|searscom,searscomprod=Production|searscom,searszetacom=Social|searscom,searsbetatwo=Beta|searscom,searslmpcom=Local|searscom,searsespanolcom=Espanol|searscom,searsinternational=International|searscom,searspuertoricocomglobal,searspuertoricocom=Puerto Rico|searscom,searspuertoricocomglobal,searspuertoricocomespanol=Puerto Rico Espanol|searscom,searscraftsmancom=Craftsman|searscom,searskenmorecom=Kenmore"+"|";
	s.rsid_list_start=s.rsid_list.indexOf(s_account);
	s.linkTrackVars=s.apl(s.linkTrackVars,'prop35',',',2);
	if (s.rsid_list_start<0)
		s.prop35="Other:"+s_account;
	else
		s.prop35=s.rsid_list.substring(s.rsid_list.indexOf("=",s.rsid_list_start)+1,s.rsid_list.indexOf("|",s.rsid_list_start));
	
	/***** Start of Helper Variables *****/
	
	// A Date object for use below.
	var dateToday = new Date();
	// A Date object set 1 days in the past for expiring cookies
	var date1DayOld = new Date();
	date1DayOld.setDate(date1DayOld.getDate()-1);
	// A Date object set 30 days in the future
	var date30DaysOut = new Date();
	date30DaysOut.setDate(date30DaysOut.getDate()+30);
	
	// Get the number of this visit fot this visitor. Maintain count for 5 years.
	s.visitNum = s.getVisitNum(1825);
	// Put the page number of the visit into prop58
	if (s.ActionDepthTest){
		s.prop58 = s.getActionDepth("s_depth");
		s.ActionDepthTest=false;
	}
   	// Previous pageName
	s.prop52=s.getPreviousValue(s.pageName,'gpv_pn','');
	
	// Set s.referrer based on referrer cookie dropped during redirects
	if (!s.referrer && !!getQSorCookieVal(true, "refererOrigin")){
		s.referrer = getQSorCookieVal(true, "refererOrigin");
		document.cookie = 'refererOrigin=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
	}
	else if (!s.referrer && !!getQSorCookieVal(true, "Referrer")){
		s.referrer = getQSorCookieVal(true, "Referrer");
		document.cookie = 'referrer=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
		document.cookie = 'Referrer=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
	}
	else if (!s.referrer){
		s.referrer = document.referrer;
	}
	
	
	sLocation = location.toString();

	/***** End of Helper Variables *****/
	
	
	// Capture current URL
	// The referrer of the tracking call is the current page URL.
	s.prop54 = "D=Referer"; // "Referer" with one r is the correct spelling of this header.
	// Capture referring URL from the s_code r variable.
	s.prop55 = "D=r";
	
	
	/***** Start of White Label Checkout Logic *****/
	// Other sites use Sears.com's cart and checkout flow
	var searsCheckoutPages = 'Product Options|Shopping Cart|CartPickupOverlay|Checkout Login|Shipping Information|Shipping Cost Page|Delivery Options|SPU Order Options|Review Page|Review Order|Order Confirmation';
	var bIsCheckoutPage = false;
	if (!!s.pageName && RegExp(searsCheckoutPages,'i').test(s.pageName) && !RegExp('Craftsman|Write|Print','i').test(s.pageName))
		bIsCheckoutPage = true;
	
	/** ShopYourWay-to-Sears Tracking **/
	var s_SYWRSID = s.c_r('s_SYWRSID');
	// If cookie is not present, but user landed in the checkout flow directly from SYW, drop the cookie.
	if (!s_SYWRSID && RegExp('Product Options|Shopping Cart','i').test(s.pageName) && (s.getQueryParam('wlref').toLowerCase() == "sscart" || (s.referrer && s.referrer.indexOf("://www.shopyourway.com") > -1))){
		// Set the SYW RSID to the same environment as the Sears RSID.
		s_SYWRSID = (s_account.indexOf('dev') > -1) ? 'searssocialnewsitedev' : (s_account.indexOf('qa') > -1) ? 'searssocialqanew' : 'searssocialprodnew,searsqadelvercom';
		// Write the SYW RSID to a cookie with session expiration.
		s.c_w('s_SYWRSID',s_SYWRSID,0);
	}
	// If user has the RSID cookie and this page is in the checkout flow, append the RSID to s_account.
	if (!!s_SYWRSID && bIsCheckoutPage){
		// Append ShopYourWay report suite to s_account.
		s.sa(s_account+','+s_SYWRSID);
		// Fix blank Add to Cart Location
		if (!!s.products)
			s.products=s.products.replace(/eVar18=(\||,|$)/g,'eVar18=SYW$1');
		// Expire cookie on purchase
		if (s.purchaseID)
			s.c_w('s_SYWRSID','',date1DayOld);
	}
	
	/** FitStudio-to-Sears Tracking **/
	var s_FSRSID = s.c_r('s_FSRSID');
	// If cookie is not present, but user came from FitStudio.com, drop the cookie.
	// Referrer is a Sears API, not FitStudio.com. Referrer example:
	// http://www.sears.com/shc/s/APICheckOutCmd?storeId=10153&catalogId=12605&shcapiBypassSSO=true&redirectURL=http://www.sears.com/shc/s/OrderItemDisplayView&JSESSIONID=0000o25lEkxPHeJaqIHkY_6thTO:16rg0fjpq&wcid_10153=2112656105&WC_PERSISTENT=R7N3SGBLgup94leKe
	if (!s_FSRSID && bIsCheckoutPage && !!s.referrer && s.referrer.indexOf("APICheckOutCmd?storeId=10153&catalogId=12605") > -1){
		// Set the FitStudio RSID to the same environment as the Sears RSID.
		s_FSRSID = (s_account.indexOf('dev') > -1) ? 'searsgearfitclubdev' : (s_account.indexOf('qa') > -1) ? 'searsgearfitclubdev' : 'searsgearfitclubprod';
		// Write the FitStudio RSID to a cookie with 30 day expiration.
		s.c_w('s_FSRSID',s_FSRSID,date30DaysOut);
	}
	// If user has the RSID cookie and this page is in the checkout flow, append the RSID to s_account.
	if (!!s_FSRSID && bIsCheckoutPage){
		// Append FitStudio report suite to s_account.
		s.sa(s_account+','+s_FSRSID);
		// Expire cookie on purchase
		if (s.purchaseID)
			s.c_w('s_FSRSID','',date1DayOld);
	}
		
	/** Parts Direct Vertical (parts.sears.com) --> Sears Tracking **/
	var s_PDVRSID = s.c_r('s_PDVRSID');
	// If cookie is not present, but user came from parts.sears.com, drop the cookie.
	if (!s_PDVRSID && bIsCheckoutPage && !!s.referrer && s.referrer.indexOf("://parts.sears.com") > -1){
		// Set the Parts Direct Vertical RSID to the same environment as the Sears RSID.
		s_PDVRSID = (s_account.indexOf('dev') > -1) ? 'searspartsdirectverticalonsears.comdev' : (s_account.indexOf('qa') > -1) ? 'searspartsdirectverticalonsears.comqa' : 'searspartsdirectverticalonsears.com';
		// Write the Parts Direct Vertical RSID to a cookie with 30 day expiration.
		s.c_w('s_PDVRSID',s_PDVRSID,date30DaysOut);
	}
	// If user has the RSID cookie and this page is in the checkout flow, append the RSID to s_account.
	if (!!s_PDVRSID && bIsCheckoutPage){
		// Append Parts Direct Vertical report suite to s_account.
		s.sa(s_account+','+s_PDVRSID);
		// Expire cookie on purchase
		if (s.purchaseID)
			s.c_w('s_PDVRSID','',date1DayOld);
	}
	
	/***** End of Cross Domain Tracking *****/
	
	
	/***** Start of External Campaign Tracking *****/
	// Kiosk Cookie
	if (s.c_r('sid') && s.c_r('sid').toLowerCase().indexOf('kiosk') == 0){
		s.eVar24 = s.c_r('sid').replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // Trim whitespace
		s.campaign=s.eVar2=s.eVar6=s.eVar33="D=v24";
	}
	else if (s.c_r('DEALER_FACILITY_COOKIE')){
		s.eVar24 = 'kiosk_dealer_facility';
		s.campaign=s.eVar2=s.eVar6=s.eVar33="D=v24";
	}
	if (!s.eVar24){ // Don't run CM if we got SID from kiosk cookie
		s.channelManager('sid');
		
		// DFA Channel Logic
		if (!!s.getQueryParam('adid'))
			s._channel = "Media Click";
		
		if (!!s._channel){
			// Collect paid search / internal kiosk paramater
			if (s.c_r('kiosk_psid'))
				s.eVar21=s.c_r('kiosk_psid');
			if (!s.eVar21)
				s.eVar21=s.getQueryParam('PSID');
			
			// Collect Responsys email Link ID
			if (!s.eVar23)
				s.eVar23 = s.getQueryParam('LID');
			if (!s.eVar23)
				s.eVar23 = 'Other';
			
			// Paid search is not always properly detected, presumably because SID code is not always present.
			// If there was no SID but user came from a search engine they would get the Natural Search channel.
			// SID and PSID could be passed into channelManager, but it would return s._campaign with both concatenated, which is not desired.	
			if (s._channel == 'Natural Search' && !!s.eVar21)
				s._channel = 'Paid Search';
			
			switch(s._channel){
				case 'Direct Load':
					//suppress channel manager for direct page loads
					s._campaign=s._channel=s._referrer=s._referringDomain=s._keywords=s._partner=s._referringDomain="";
					//set product finding method to direct
					s.eVar40='Direct';
					break;
					
				case 'exclude':
					//suppress channel manager for prefixes identified for exclusion
					s._campaign=s._channel=s._referrer=s._referringDomain=s._keywords=s._partner=s._referringDomain="";
					break;
					
				case 'Referrers':
					// Do not set for site-to-site referrals or Paypal purchases
					if (s._referringDomain.indexOf('sso.shld.net') > -1 || s._referringDomain.indexOf('sso.shld.net:443') > -1 || (s._referringDomain.indexOf('paypal.com') > -1 && location.protocol=='https:'))
						s._campaign=s._channel=s._referrer=s._referringDomain=s._keywords=s._partner=s._referringDomain=s.campaign="";
					else {
						s.eVar24 = 'nsref:'+ s._referringDomain;
						s._campaign='N/A';
					}
					break;
					
				case 'Natural Search':
					var URLPath = window.location.pathname;
					var aKeywords = s.split(s._keywords,' ');
					
					// If tName, search, or keyword paramaters are in the URL and the referrer is a search engine, then the traffic came from BloomReach
					if (!!s.getQueryParam('tName') || !!s.getQueryParam('tname'))
						s.eVar24 = 'seo:' + s._partner + ':BloomReach:Thematic';
					else if (!!s.getQueryParam('keyword') || !!s.getQueryParam('search') || URLPath.indexOf('search=') > -1){
						// Suppress BloomReach if this was an out-of-stock redirect
						if (!!s.getQueryParam('yikes_prod'))
							s.eVar24 = 'seo:' + s._partner + ':Search';
						else
							s.eVar24 = 'seo:' + s._partner + ':BloomReach:Search';
					}
					else if (URLPath.indexOf('/dap_') > -1 || URLPath.indexOf('/dap-') > -1) s.eVar24 = 'seo:' + s._partner + ':BrandShowcase';
					else if (URLPath.indexOf('/nb_') > -1 || URLPath.indexOf('/nb-') > -1)   s.eVar24 = 'seo:' + s._partner + ':Non-Browse';
					else if (URLPath.indexOf('/v_') > -1 || URLPath.indexOf('/v-') > -1)     s.eVar24 = 'seo:' + s._partner + ':Vertical';
					else if (URLPath.indexOf('/c_') > -1 || URLPath.indexOf('/c-') > -1)     s.eVar24 = 'seo:' + s._partner + ':Category';
					else if (URLPath.indexOf('/s_') > -1 || URLPath.indexOf('/s-') > -1)     s.eVar24 = 'seo:' + s._partner + ':Sub-Category';
					else if (URLPath.indexOf('/p_') > -1 || URLPath.indexOf('/p-') > -1){
						s.eVar24 = 'seo:' + s._partner + ':Product';
						// If this is a Marketplace product page identify who sells the product
						if (!!s.events){
							if (s.events.indexOf("event45") > -1){
								s.eVar24 += "-Marketplace"; // Indicates a product page where Merchants sell the product
								if (s.events.indexOf("event54") > -1)
									s.eVar24 += "-&-Sears"; // Indicates a product page where Merchants and Sears sell the product
							}
							else s.eVar24 += "-Sears"; // Indicates a product page where only Sears sells the product
						}
					}
					// Detect visitors who use a search engine as a browser address bar. For instance, they search for only "sears.com".
					else if (aKeywords.length == 1 && RegExp('^(www.kmart.com|kmart.com|kmart)$', 'i').test(aKeywords[0]))
						s.eVar24 = 'seo:' + s._partner + ':DTS';
					
					// Otherwise this is a standard search engine referral
					else
						s.eVar24 = 'seo:' + s._partner + ':other';
			
					// BloomReach creates some landing pages for Sears. In their HTML they've identified the business unit of the content to append to the channel.
					// Their Div: <div id="BRBusinessUnit" style="display:none">Appliances</div>
					// We trim leading and trailing white space, since inenrHTML will insert spaces in some browsers.
					if (!!document.getElementById('BRBusinessUnit'))
						s.eVar24+=":"+document.getElementById('BRBusinessUnit').innerHTML.replace(/^\s+|\s+$/g, "");
					
					// Any search results page could be the destination of a "Product Out-Of-Stock" redirect. "yikes_prod" in the URL indicates such a redirect.
					if (!!s.getQueryParam('yikes_prod'))
						s.eVar24+=':OOS-Redirect';
					
					// No campaign code available
					s._campaign='N/A';
					// Set natural search keyword
					s.eVar14=s._keywords;
					// Overwrite paid search keyword
					s.eVar13='Other';
					break;
					
				case 'Paid Search':
					// Set paid search keyword
					s.eVar13 = s._keywords;
					// Overwrite natural search keyword
					s.eVar14 = 'Other';
					// Set channel and campaign variables.
					if (s._campaign)
						s.eVar24=s.campaign=s._campaign.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // Set to SID code with whitespace trimmed
					if (!s.eVar24 && s.eVar21)
						s.eVar24=s.campaign=s.eVar21;  // If no SID code, set to PSID
					break;
					
				case 'Paid Non-Search':
					// Rename channel
					s._channel = 'Other Channel';
					break;
			
			} // End switch(s._channel)
		}
		
		// Overwrite keywords for non-search campaigns
		if (!!s._channel && s._channel != 'Paid Search' && s._channel != 'Natural Search')
			s.eVar13=s.eVar14='Other';
	
		if (!s.campaign && !!s._campaign)
			s.campaign=s._campaign.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // Trim whitespace
		// If eVar24 hasn't been set to a channel above, set it to the campaign code
		if (!s.eVar24 && !!s._channel)
			s.eVar24=s._channel;
		else if (!s.eVar24 && !!s.campaign)
			s.eVar24=s.campaign;
		
		if (!!s.eVar24){
			s.prop8=s.eVar2=s.eVar6=s.eVar33="D=v24";
			// Set click-through and click-past events
			s.clickPast(s.eVar24,'event15','event19');
			// Set Product Finding Method
			s.eVar40 = 'External Campaigns';
			// Add 'External Campaigns' to Product Merchandising Location
			if (!!s.eVar41) s.eVar41 += ' | External Campaigns';
			// Set page name and page type pathing props
			s.prop18 = s._channel + ': ' + s.pageName;
			s.prop13 = s._channel + ': ' + s.prop27;
		}
		else{
			// Set page name and page type pathing props without channel
			s.prop18=s.pageName;
			s.prop13=s.prop27;
		}
	} // End if not s.eVar24 
	
	if (!s.eVar71 && !!s.eVar24)
		s.eVar71 = s.eVar24;
	if (navigator.userAgent.toLowerCase().indexOf('shc-kiosk') >= 0)
		s.eVar71 = 'kiosk';
	// Set eVar72 so CVP 2.0 can alter it server-side.
	if (!!s.eVar71)
		s.eVar72='0-3h';

	if (!!s.eVar24){
		// Translate SID codes into channels. This used to be done by a VISTA Rule.
		var tmpChannel = '';
		var s_eVar24 = s.eVar24.toLowerCase();

		if (s_eVar24.indexOf('iaespx')==0) tmpChannel='Affiliates > Espanol';
		else if (s_eVar24.indexOf('iaprgx')==0) tmpChannel='Affiliates > Puerto Rico';
		else if (RegExp(/^\d{2}x/).test(s_eVar24)) tmpChannel='Paid Search';
		if (!!tmpChannel){
			s.eVar24=tmpChannel;
			s.eVar2=s.eVar33="D=v24";
			// Set channel level campaign stacking
			s.eVar7=s.crossVisitParticipation(tmpChannel,'s_cvp_v7','30','5','>');
		} else {
			// eVar24 holds a SID/PSID code that doesn't match any channels above
			s.eVar2=s.eVar33="D=v24";
			// Set channel-level campaign stacking. If s._channel is blank crossVisitParticipation doesn't update the stack.
			s.eVar7=s.crossVisitParticipation(s._channel,'s_cvp_v7','30','5','>');
		}
	}
    /***** End of External Campaign Tracking *****/
	
	
	/***** Start of Internal Campaign Stacking *****
	 Example: s.eVar5="syw_cmp1123|xsite_Craftsman|xsite_ShopYourWay"
	 Only add unique values (case-insensitive) to the list.
	 eVar5 and the s_e5 cookie are both set to visit expiration.
	*/
	var temp_eVar5 = s.c_r('s_e5');
	var s_eVar5StartValue = temp_eVar5;
	var s_eVar5Array = s.split(temp_eVar5,'|');
	var s_eVar5ArrayStartLength = s_eVar5Array.length;
	/* Internal Campaigns - eVar5 set on the page */
	if (!!s.eVar5 && temp_eVar5.indexOf(s.eVar5) == -1)
		s_eVar5Array[s_eVar5Array.length] = s.eVar5;
	/* Internal Campaigns - ManageMyLife Article ID in mml parameter */
	var s_mml = s.getQueryParam('mml');
	if (!!s_mml && temp_eVar5.indexOf(s_mml) == -1){
		s_eVar5Array[s_eVar5Array.length] = s_mml;
		// Set Product Finding Method
		if (!s.eVar40)
			s.eVar40="Manage My Life Article";
	}
	/* Internal Campaigns - intcmp parameter */
	var s_intcmp = s.getQueryParam('intcmp');
	if (!!s_intcmp && temp_eVar5.indexOf(s_intcmp) == -1){
		s_eVar5Array[s_eVar5Array.length] = s_intcmp;
		// Set Product Finding Method
		if (!s.eVar40)
			s.eVar40="Internal Campaigns";
	}
	// If s.eVar5 was not set on the page and no internal campaign code is in the URL, then see if the referrer is a partner site. 
	if (!!s.referrer && !s.eVar5 && !s_intcmp && !s_mml){
		s_rd=s.split(s.referrer,'/');
		s_rd=s_rd[2];
		s_rd=s.split(s_rd,'?');
		s._refDomain=s_rd[0];
		if (!!s._refDomain && location.host.indexOf(s._refDomain) == -1){ //if the referring domain is different than the current domain
			// syntax: s._searsSites=[campaign1]|[site1]>[campaign2]|[site2]>[campaign3]|[site3]>...
			s._searsSites="xsite_SearsMobile|m.sears.com>xsite_Sears|sears.com>"
			+"xsite_ShopYourWayRewards|shopyourwayrewards.com>xsite_ShopYourWay|shopyourway.com>"
			+"xsite_PartsDirect|searspartsdirect.com>xsite_SearsPartsDirectVertical|parts.sears.com>"
			+"xsite_KmartMobile|m.kmart.com>xsite_Kmart|kmart.com>"
			+"xsite_SearsCanada|sears.ca>xsite_KmartDesign|kmartdesign.com>"
			+"xsite_CraftsmanMobile|m.craftsman.com>xsite_Craftsman|craftsman.com>"
			+"xsite_Kenmore|kenmore.com>xsite_MyGofer|mygofer.com>"
			+"xsite_SearsHometown|searshometownstores.com>xsite_LE|landsend.com>"
			+"xsite_ManageMyLife|managemylife.com>xsite_TGI|thegreatindoors.com>"
			+"xsite_SearsFlowers|searsflowers.com>xsite_SearsOptical|searsoptical.com>"
			+"xsite_SearsPortrait|searsportrait.com>xsite_SearsPhotos.com|searsphotos.com>"
			+"xsite_SearsLiquidations|searsliquidations.com>xsite_Searsoutlet|searsoutlet.com>"
			+"xsite_RideNSS|ridenss.com>xsite_ProtegeMVP|protegemvp.com>"
			+"xsite_DieHard|diehard.com>xsite_searsHoldings|searsholdings.com>"
			+"xsite_FitOrbit|fitorbit.com>xsite_FitStudio|fitstudio.com>"
			+"xsite_ServiceLive|servicelive.com>xsite_SearsHomeServices|searshomeservices.com";
			s._searsSitePairs = s.split(s._searsSites, '>'); //split the array into individual campaign/site pairs
			for (a = 0; a < s._searsSitePairs.length; a++) {
				s._searsSiteElements = s.split(s._searsSitePairs[a], '|'); //divide the pairs into campaign and site components
				//if the referring domain matches a site on the list and the associated xsite value is not in the eVar5 cookie
				if (s._refDomain.indexOf(s._searsSiteElements[1]) != -1 && temp_eVar5.indexOf(s._searsSiteElements[0]) == -1){
					// Set eVar5 to the xsite value for the partner site
					s_eVar5Array[s_eVar5Array.length] = s._searsSiteElements[0];
					
					// Drop partner ID into a 30-day cookie
					var s_partnerSite = s._searsSiteElements[0].slice(s._searsSiteElements[0].indexOf("_")+1);
					s.c_w('s_rp',s_partnerSite,date30DaysOut);
					
					// Set Product Finding Method
					if (!s.eVar40)
						s.eVar40="Internal Partner Site Crossing";
					
					// Exit the for loop
					break;
				}
			}
		}
	}
	// Example Result: temp_eVar5="syw_cmp1123|xsite_Craftsman|xsite_ShopYourWay"
	if (s_eVar5Array.length > s_eVar5ArrayStartLength){
		// Alphabetize to reduce cardinality.
		s_eVar5Array.sort();
		temp_eVar5=s.join(s_eVar5Array,{delim:'|'});
	}
	// If this is the first page of the visit and there is no partner referral (eVar5 is no set), and a referring partner cookie is present,
	// then set eVar5 as a return visit from the original referring partner.
	/* This could be extended to record all referring partners "returnVisit_ShopYourWay|returnVisit_Craftsman|returnVisit_Sears".
	   If the user is on ShopYourWay.com they would not want ShopYourWay to appear in eVar5. Only "returnVisit_Craftsman|returnVisit_Sears". */
	var s_referringPartner = s.c_r('s_rp');

	if (s.prop58 == 1 && !temp_eVar5 && s_referringPartner)
		temp_eVar5 = "returnVisit_" + s_referringPartner;
	
	// Finalize s.eVar5 and save to a session cookie
	if (temp_eVar5 != s_eVar5StartValue){
		s.eVar5 = temp_eVar5;
		document.cookie = 's_e5=' + s.eVar5 + '; path=/';
	}
	/***** End of Internal Campaign Stacking *****
	
	
	/***** Start of Internal Search Tracking *****/
	if (!s.prop11 && !!s.eVar4 && s.eVar4.indexOf('SearchAbandoned:') == -1)
		s.prop11 = s.eVar4;
	// Force search term to lower case, remove invalid characters, and copy to eVar4.
	if (!!s.prop11) {
		s.eVar4=s.prop11=s_cleanseKeywords(unescape(s.prop11.toLowerCase()));
		// Save keyword to an Internal Search Term cookie with session expiration
		if (s.c_r("s_ist") != s.eVar4)
			s.c_w("s_ist", s.eVar4, 0);
		
		// Record page where search originated
		s.prop48=s.prop52;
	}
	// Seach redirect
	if (!s.prop70 && !!s.getQueryParam("redirectType"))
		s.prop70="Search Redirect > "+s.getQueryParam("redirectType")+" > "+s.pageName;
	if (!s.prop70 && !!s.prop11)
		s.prop70='Search Redirect > No Redirect';
	if (!!s.prop70)
		s.eVar70="D=c70";
	// Suppress the search and null search events if the same search term is passed in more than once.
	var temp_eVar4 = s.getValOnce(s.eVar4, 's_e4', 0);
	if (!temp_eVar4 && !!s.events){
		s.events=s.events.replace(/,?event(25|26|95)/g,"");
		s.events=s.events.replace(/^,/,"");
	}
	// Set a blank product string whenever a search occurs and s.product is not present to bind the search term to the search event.
	if (!!temp_eVar4 && !s.products)
		s.products = ";";
	// Copy refinement type and attribute from props 4 and 5.
	if (!s.eVar9 && !!s.prop4)
		s.eVar9 = "D=c4";
	if (!s.eVar10 && !!s.prop5)
		s.eVar10 = "D=c5";
	// Set eVar4 "Search Abandoned" when eVar40 sets to anything but Search and there was a search term in the s_ist cookie.
	if (!s.eVar4 && !!s.c_r("s_ist") && !!s.eVar40 && s.eVar40 != "Search" && s.eVar40 != "Search BRAT Redirect" && s.eVar40 != "Product-Error-Search"){
		s.eVar4 = "SearchAbandoned: " + s.c_r("s_ist");
		// Expire the cookie.
		s.c_w("s_ist","",date1DayOld);
	}
	/* Internal Search Keyword Click-Throughs */
	if (!!s.events){
		// Quick Views or Add to Cart layer.
		if ((s.events.indexOf("event27") > -1 || s.events.indexOf("scAdd") > -1) && (s.getQueryParam("keyword") || sLocation.indexOf("/search=") > -1)){
			if (s.getQueryParam("keyword"))
				s.prop32 = s.getQueryParam("keyword");
			else if (sLocation.indexOf("/search=") > -1)
				s.prop32 = sLocation.match(/(search=)([^&\?\b]*)/)[2];
		}
		// Any Product View, or scAdd on Shopping Cart or Product Options page following Search Results.
		else if ((s.events.indexOf("prodView") > -1 || (!!s.pageName && (s.pageName=='Shopping Cart' || s.pageName=='Product Options') && s.events.indexOf("scAdd") > -1)) && (!!s.referrer && s.referrer.indexOf("keyword") > -1 || s.referrer.indexOf("/search=") > -1)){
			if (s.referrer.indexOf("keyword") > -1)
				s.prop32 = s.getQueryParam("keyword",'',s.referrer);
			if (s.referrer.indexOf("/search=") > -1)
				s.prop32 = s.referrer.match(/(search=)([^&\?\b]*)/)[2];
		}
		// Any Product View, or scAdd on Shopping Cart or Product Options page following the Product Compare page.
		else if (!!s.prop52 && s.prop52 == "Product Compare" && !!s.c_r("s_ist") && (s.events.indexOf("prodView") > -1 || (!!s.pageName && (s.pageName=='Shopping Cart' || s.pageName=='Product Options') && s.events.indexOf("scAdd") > -1))){
			s.prop32 = s.c_r("s_ist");
		}
 		if (!!s.prop32){
			s.prop32=s_cleanseKeywords(unescape(s.prop32.toLowerCase()));
			// event62 is serialized to the visit and keyword
			s.events=s.apl(s.events, 'event62:'+s.visitNum+s.prop32.replace(/\W/g, ''), ',', 2);
			// Ensure that eVar4 and eVar40 set on all pages in search click flow
			// so they set back to search values after user browses away from search flow and then returns via their browser history.
			s.eVar4 = s.prop32;
			s.eVar40 = "Search";
 		}
	}
	/* End Internal Search Keyword Click-Throughs */
	/***** End of Internal Search Tracking *****/
	
	
	/***** Start of User Context *****/
	/* eVar32 (Associate ID and Unit) - only capture for Shop Sears sites. */
	if (s.getQueryParam('omnCn') && /searssearsshopsearslitedev|searssearsshopsearsliteqa|searsshop|searsshopdev|searsshopsearslite|searsshopsearsliteglobal|searsshopsearsliteuc|searsshoptv|searsshoptvdev|searsshoptvqa/.test(s_account))
	  	s.eVar32=s.getQueryParam('omnCn');
	/* eVar30 (Profile Status) */
	// Club affiliations are pulled from Sears' registration API and s.eVar30 is set on the page. Here we alphabetize them.
	if (!!s.eVar30){
		s_eVar30Array = s.split(s.eVar30,'|');
		// Alphabetize s.eVar30 to reduce duplicates.
		s_eVar30Array.sort(caseInsensitiveSort);
		// Create s.eVar30 from s_eVar30Array
		s.eVar30=s.join(s_eVar30Array,{delim:'|'});
		// Drop eVar30 to a session cookie so it can be sent to ForeSee when they open a survey layer
		document.cookie = 's_e30=' + s.eVar30 + '; path=/';
	}
	/* eVar26 (Behavioral Segmentation) */
	var tempEVar26 = s.c_r('s_e26');
	if (!s.eVar26 || (!!s.eVar26 && tempEVar26.indexOf(s.eVar26) > -1))
		s.eVar26 = tempEVar26;
	else if (!!s.eVar26)
	   s.eVar26 += "|"+tempEVar26;
	if (!!s.events){
		// For below, event45 indicates that a Marketplace product is on the page.
		// event54 indicates that a Sears product is on a marketplace page.
		// On non-marketplace pages neither event45 nor event54 are set.
		if (s.eVar26.indexOf("MP PIDs seen") > -1){
			if (s.events.indexOf("event54") > -1 || (s.events.indexOf("event45") == -1 && s.events.indexOf("prodView") > -1))
				s.eVar26 = s.eVar26.replace("MP PIDs seen", "MP & SHC PIDs seen");
		}
		else if (s.eVar26.indexOf("MP & SHC PIDs seen") == -1 && s.eVar26.indexOf("SHC PIDs seen") > -1){
			if (s.events.indexOf("event45") > -1)
				s.eVar26 = s.eVar26.replace("SHC PIDs seen", "MP & SHC PIDs seen");
		}
		else if (s.eVar26.indexOf("MP & SHC PIDs seen") == -1){
			if (s.events.indexOf("event45") > -1 && s.events.indexOf("event54") > -1)
				s.eVar26 = !!s.eVar26 ? s.eVar26+"|MP & SHC PIDs seen" : "MP & SHC PIDs seen";
			else if (s.events.indexOf("event45") > -1)
				s.eVar26 = !!s.eVar26 ? s.eVar26+"|MP PIDs seen" : "MP PIDs seen";
			else if (s.events.indexOf("event54") > -1 || (s.events.indexOf("event45") == -1 && s.events.indexOf("prodView") > -1))
				s.eVar26 = !!s.eVar26 ? s.eVar26+"|SHC PIDs seen" : "SHC PIDs seen";
		}
		// Drop eVar26 to a session cookie so it can be sent to ForeSee when they open a survey layer
		if (!!s.eVar26)
			document.cookie = 's_e26=' + s.eVar26 + '; path=/';
	}
	/***** End of User Context *****/
	
	
	if (!!s.purchaseID){
		s.eVar42=s.transactionID="D=purchaseID";
		// Set serialized event whenever a purchase occurs.
		s.events=s.apl(s.events,'event75',",",1);
	}
		
	// Fix products string
	if (!!s.products){
		s.products=s.repl(s.products,"|,eVar46","|eVar46");
		s.products=s.repl(s.products,"|,evar46","|evar46");
	}
	
	// Slot Analysis Variable Cleanup - remove events if click-through position is not collected
	if (!!s.products && (s.products.indexOf('event29=;') > -1 || s.products.indexOf('event29=|') > -1 || s.products.indexOf('event29=undefined;') > -1)){
		s.products=s.repl(s.products,'event29=;',';');
		s.products=s.repl(s.products,'event29=|','');
		s.products=s.repl(s.products,'event29=undefined;','');
		if (!!s.events)
			s.events=s.repl(s.events,',event28,event29','');
	}
	
	// Set product compare count
	s.prop37=s.getQueryParam("prodCount");
	
	// Set On-Site Registration Location
	if (!!s.events && s.events.indexOf('event55') > -1)
		s.prop24=s.prop52;
	
	// Collect ad cell and concatenate with the previous page.
	var s_adCell = s.getQueryParam('adCell');
	if(!s.prop7 && !!s_adCell){
		s.prop7=s.prop52+':'+s_adCell;
		s.eVar3="D=c7";
	}
	
	// Stack merchandising category values
	if (!!s.prop1)
		s.eVar47=s.crossVisitParticipation(s.prop1,'s_v47','1','5',' | ','purchase');
	
	// Make sure that prodView and event10 are always set together and that both are set when a quick view is detected.
	if (!!s.events && /prodView|event10|event27/.test(s.events)){
		s.events = s.apl(s.events, 'prodView',',', 2);
		s.events = s.apl(s.events, 'event10', ',', 2);
	}

	// Capture Finder product finding method
	if (!!s.getQueryParam('gbtId'))
		s.eVar40='Finder:'+s.getQueryParam('gbtId');
	
	// Capture List Page Number
	var s_pagenumber=s.getQueryParam('pageNum');
	if (!!s_pagenumber)
		s.prop38='Page Number > '+s_pagenumber;
	if (!s_pagenumber && s.prop27 && (s.prop27.toLowerCase()=='search results' || s.prop27.toLowerCase()=='subcategory'))
		s.prop38='Page Number > 1';
	
	// Capture eCatalog Name
	s.eVar54=s.getQueryParam('ecatalog');
	
	// Parts Finder
	if (!!s.prop46){
		s.eVar64=s.prop46;
		s.events=s.apl(s.events,'event69',',');
		if(!s.products)
			s.products=";";
	}
	
	// Percent Page Viewed
	// Don't set until second page to avoid "undefined"?
	if (!!s.prop58 && s.prop58 > 1){
		var ppvArray = s.getPercentPageViewed(s.prop52);
		if (!!ppvArray)
			s.prop51 = ppvArray[1] + '|' + ppvArray[2];
		// Send PPV info on exit links
		var sURL = s.exitLinkHandler();
		if (!!sURL) {
			s.linkTrackVars = s.apl(s.linkTrackVars,'prop51',',',1);
			s.linkTrackVars = s.apl(s.linkTrackVars,'prop52',',',1);
			s.prop52 = s.pageName;
			var ppvArray = s.getPercentPageViewed(s.pageName);
			s.prop51 = ppvArray[1] + '|' + ppvArray[2];
		}
	}
	
	// Set events each time the visitor sets or retrieves their zip code.
	if (!!s.eVar17 && s.eVar17 != "Not Provided" && s.eVar17 != s.getPreviousValue(s.eVar17,'gpv_v17','')){
		s.events=s.apl(s.events,'event96',",",1); // event96 is serialized
		s.events=s.apl(s.events,'event97',",",1); // event97 counts each instance
	}
	
	// Set entry page and page type
	if (s.prop58 == 1){
		s.eVar25 = s.prop27;
		s.eVar75 = s.prop27;
	}
	
	// Consolidate "Brand Showcase" product finding methods.
	if (!!s.eVar40 && s.eVar40.indexOf("Brand Showcase") > -1)
		s.eVar40 = "Brand Showcase";
	
	// Remove dummy values and unexpected non-digit values from eVar1 so it persists previous value.
	if (!!s.eVar1 && (s.eVar1 == "1234567" || s.eVar1 == "-1002" || s.eVar1 == "10153" || s.eVar1 == "0" || (/\D/.test(s.eVar1))))
		s.eVar1 = "";
	
	// Disassociate PIDs from bundle IDs on single-item PDPs and quick views
	if (!!s.events && s.events.indexOf('prodView') > -1 && (!s.prop12 || s.prop12.indexOf("Bundle > Quickview") == -1 && s.prop12.indexOf("Outfits > Quickview") == -1) && !s.eVar68)
		s.eVar68 = 'Non-Collection';
	
	// eVar16 (Promo Click Detail) reset logic
	if (!!s.eVar40 && !s.eVar16)
		s.eVar16 = "N/A";
		
	// Gather Test&Target campaign and offer for reporting within SiteCatalyst
	s.tnt = s.trackTNT();
	
}
s.doPlugins=s_doPlugins;

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Custom function to whitelist acceptable characters and remove all others.
 */
function s_cleanseKeywords(sInput){
	return sInput ? sInput.replace(/[^\w\s,.;:\(\)\[\]\!@\$&]/g, '') : '';
}

/*
 * Custom function to pass into array.sort(caseInsensitiveSort)
 */
function caseInsensitiveSort(a,b){ 
   var ret = 0;
   a = a.toLowerCase();
   b = b.toLowerCase();
   if(a > b) ret = 1;
   if(a < b) ret = -1; 
   return ret;
}

/*
 * Custom function to get query string or cookie values
 * s.getQueryParams was throwing JS errors because of a URL-encoded registration mark in search keywords.
 * s.getQueryParams -calls-> s.p_gpv -calls-> s.p_gvf -calls-> s.epa <-- throws JS error
 */
function getQSorCookieVal(bCookie, sParam){
	if (bCookie){
		var oInput = document.cookie;
		var sDelimiter = ';';
	} else {
		var oInput = location.search.substring(1); // Use query string without question mark
		var sDelimiter = '&';
	}
	if (oInput.length > 0){
		var oParamRegEx = new RegExp('(^|\\b|'+sDelimiter+')'+sParam+'=([^\\b'+sDelimiter+']*)','i');
		var aRegExMatches = oParamRegEx.exec(oInput);
		if (aRegExMatches) return aRegExMatches[2];
		else return '';
	}
}

/*
* Plugin: getVisitNum - version 3.0
*/
s.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+"t;");

/*
 * Plugin: getActionDepth v1.0 - Returns the current
 * page number of the visit
 */
s.getActionDepth=new Function("c",""
+ "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);"
+ "if(!s.c_r(c)){v=1}if(s.c_r(c)){v=s.c_r(c);v++}"
+ "if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");

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
 * Plugin: exitLinkHandler 0.8 - identify and report exit links
 */
s.exitLinkHandler=new Function("p","e",""
+"var s=this,o=s.p_gh(),h=o.href,n='linkInternalFilters',i,t;if(!h||("
+"s.linkType&&(h||s.linkName)))return'';i=h.indexOf('?');t=s[n];s[n]="
+"p?p:t;h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=="
+"'e')s.linkType='e';else h='';s[n]=t;return e?o:h;");
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

/* DynamicObjectIDs config */
/*function s_getObjectID(o) {
	var ID=o.href;
	return ID;
}
s.getObjectID=s_getObjectID */
// Set up dynamic object IDs
//s.setupDynamicObjectIDs();

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
	if(chan&&recent)
		return chan+'::'+recent;
	else
		return '';
}
		
/*
 * Tracking Servers
 */ 
/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
if (!s.trackingServer) s.trackingServer="om.kmart.com";
if (!s.trackingServerSecure) s.trackingServerSecure="som.kmart.com";

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
					if(s.getQueryParam('adid')&&(!p.lastclktime||p.lastclktime==0))
						s[p.tEvar]="DFA-"+(p.lis?p.lis:0)+"-"+(p.lip?p.lip:0)+"-"+(p.lastimp?p.lastimp:0)+"-"+(p.lastimptime?p.lastimptime:0)+"-"+(p.lis?p.lis:0)+"-"+(p.lip?p.lip:0)+"-"+(p.lastimp?p.lastimp:0)+"-"+(p.lastimptime?p.lastimptime:0)
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
									if (s.eVar71.indexOf('0:0:0') > -1)
										s.eVar71="DFA:VT:"+(p.lis?p.lis:0)+":"+(p.lip?p.lip:0)+":"+(p.lastimp?p.lastimp:0);
									s.eVar72='0-3h';
								} else if (s__dfa[8]<s__dfa[4]&&(td.getTime()/1000-s__dfa[4]) < 2592000){
									s.eVar65='media VT';
									s.eVar71="DFA:VT:"+(p.lis?p.lis:0)+":"+(p.lip?p.lip:0)+":"+(p.lastimp?p.lastimp:0);
									s.eVar72='0-3h';
								}
							}
						}
							if (s.eVar71.indexOf("DFA:CT") == 0)
								s.eVar65='media CT';
							else if (s.eVar71.indexOf("DFA:VT") == 0)
								s.eVar65='media VT';

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
s.Integrate.add("AudienceManager");
s.Integrate.AudienceManager.setVars=function(s,p){
	/* Use this section to set additional partner data in SiteCatalyst variables */
	/* Example: s.campaign=p.cid */
};
s.Integrate.AudienceManager.useVars=function(s,p){
if("function"!=typeof DIL)DIL=function(a,b){var d=[],c,f;a!==Object(a)&&(a={});var e,h,j,o,p,s,l,t,y,B,w;e=a.partner;h=a.containerNSID;j=a.iframeAttachmentDelay;o=!!a.disableDestinationPublishingIframe;p=a.iframeAkamaiHTTPS;s=a.mappings;l=a.uuidCookie;t=!0===a.enableErrorReporting;y=a.visitorService;B=!0===a.disableScriptAttachment;w=!0===a.removeFinishedScriptsAndCallbacks;t&&DIL.errorModule.activate();(c=b)&&d.push(c+"");if(!e||"string"!=typeof e)return c="DIL partner is invalid or not specified in initConfig",
DIL.errorModule.handleError({name:"error",message:c,filename:"dil.js"}),Error(c);c="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(h||"number"==typeof h)h=parseInt(h,10),!isNaN(h)&&0<=h&&(c="");c&&(h=0,d.push(c),c="");f=DIL.getDil(e,h);if(f instanceof DIL&&f.api.getPartner()==e&&f.api.getContainerNSID()==h)return f;if(this instanceof DIL)DIL.registerDil(this,e,h);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+
e+" and containerNSID = "+h);var u={IS_HTTPS:"https:"==document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},A={stuffed:{}},i={},n={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_img_responses:0,
num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,uuid:null,noADMS:!1,instanceType:null,releaseType:"no ADMS",admsProcessingStarted:!1,process:function(g){try{if(!this.admsProcessingStarted){var a=this,k,b,c,d;if("function"==typeof g&&"function"==typeof g.getDefault&&"function"==typeof g.getInstance&&(y===Object(y)&&(k=y.namespace)&&"string"==typeof k?(this.instanceType="namespace: "+k,b=g.getInstance(k)):(this.instanceType="default",
b=g.getDefault()),b===Object(b)&&"function"==typeof b.getVisitorID)){this.admsProcessingStarted=!0;c=function(g){if("ADMS"!=a.releaseType)a.uuid=g,a.releaseType="ADMS",a.releaseRequests()};d=b.getVisitorID(c);if(-1==d){this.releaseType="failed ADMS";this.releaseRequests();return}if("string"==typeof d&&d.length){c(d);return}setTimeout(function(){if("ADMS"!=a.releaseType)a.releaseType="timeout",a.releaseRequests()},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.noADMS=!0;this.releaseRequests()}}catch(e){this.releaseRequests()}},
releaseRequests:function(){this.calledBack=!0;n.registerRequest()}},registerRequest:function(g){var a=this.firingQueue;g===Object(g)&&a.push(g);if(!this.firing&&a.length)if(this.adms.calledBack){if(g=a.shift(),x.fireRequest(g),!this.firstRequestHasFired&&"script"==g.tag)this.firstRequestHasFired=!0}else this.processADMS()},processADMS:function(){this.adms.process(window.ADMS)},requestRemoval:function(g){if(!w)return"removeFinishedScriptsAndCallbacks is not boolean true";var a=this.toRemove,k,b;if(g===
Object(g))k=g.script,b=g.callbackName,(k===Object(k)&&"SCRIPT"==k.nodeName||"no script created"==k)&&"string"==typeof b&&b.length&&a.push(g);if(this.readyToRemove&&a.length){b=a.shift();k=b.script;b=b.callbackName;"no script created"!=k?(g=k.src,k.parentNode.removeChild(k)):g=k;window[b]=null;try{delete window[b]}catch(d){}this.removed.push({scriptSrc:g,callbackName:b});DIL.variables.scriptsRemoved.push(g);DIL.variables.callbacksRemoved.push(b);return this.requestRemoval()}return"requestRemoval() processed"}};
f=function(){var g="http://fast.";u.IS_HTTPS&&(g=!0===p?"https://fast.":"https://");return g+e+".demdex.net/dest4.html?d_nsid="+h+"#"+encodeURIComponent(document.location.href)};var v={THROTTLE_START:3E4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+e+"_"+h,url:f(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:u.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var g=this,a=document.createElement("iframe");a.id=
this.id;a.style.cssText="display: none; width: 0; height: 0;";a.src=this.url;m.addListener(a,"load",function(){g.iframeHasLoaded=!0;g.requestToProcess()});document.body.appendChild(a);this.iframe=a},requestToProcess:function(g){var a=this;g&&!q.isEmptyObject(g)&&this.process(g);if(this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages){if(!this.throttleTimerSet)this.throttleTimerSet=!0,setTimeout(function(){a.messageSendingInterval=u.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START);this.sendingMessages=
!0;this.sendMessages()}},process:function(g){var a=encodeURIComponent,k,b,d,c,e;if((k=g.dests)&&k instanceof Array&&(b=k.length))for(d=0;d<b;d++)c=k[d],c=[a("dests"),a(c.id||""),a(c.y||""),a(c.c||"")],this.addMessage(c.join("|"));if((k=g.ibs)&&k instanceof Array&&(b=k.length))for(d=0;d<b;d++)c=k[d],c=[a("ibs"),a(c.id||""),a(c.tag||""),m.encodeAndBuildRequest(c.url||[],","),a(c.ttl||"")],this.addMessage(c.join("|"));if((k=g.dpcalls)&&k instanceof Array&&(b=k.length))for(d=0;d<b;d++)c=k[d],e=c.callback||
{},e=[e.obj||"",e.fn||"",e.key||"",e.tag||"",e.url||""],c=[a("dpm"),a(c.id||""),a(c.tag||""),m.encodeAndBuildRequest(c.url||[],","),a(c.ttl||""),m.encodeAndBuildRequest(e,",")],this.addMessage(c.join("|"));this.jsonProcessed.push(g)},addMessage:function(g){var a=encodeURIComponent;this.messages.push((t?a("---destpub-debug---"):a("---destpub---"))+g)},sendMessages:function(){var g=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,this.url,this.iframe.contentWindow),this.messagesPosted.push(a),
setTimeout(function(){g.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},C={traits:function(g){if(q.isValidPdata(g)){if(!(i.sids instanceof Array))i.sids=[];m.extendArray(i.sids,g)}return this},pixels:function(g){if(q.isValidPdata(g)){if(!(i.pdata instanceof Array))i.pdata=[];m.extendArray(i.pdata,g)}return this},logs:function(g){if(q.isValidLogdata(g)){if(i.logdata!==Object(i.logdata))i.logdata={};m.extendObject(i.logdata,g)}return this},customQueryParams:function(g){q.isEmptyObject(g)||
m.extendObject(i,g,n.reservedKeys);return this},signals:function(g,a){var b,c=g;if(!q.isEmptyObject(c)){if(a&&"string"==typeof a)for(b in c={},g)g.hasOwnProperty(b)&&(c[a+b]=g[b]);m.extendObject(i,c,n.reservedKeys)}return this},result:function(g){if("function"==typeof g)i.callback=g;return this},afterResult:function(g){if("function"==typeof g)i.postCallbackFn=g;return this},useImageRequest:function(){i.useImageRequest=!0;return this},clearData:function(){i={};return this},submit:function(){x.submitRequest(i);
i={};return this},getPartner:function(){return e},getContainerNSID:function(){return h},getEventLog:function(){return d},getState:function(){var g={},a={};m.extendObject(g,n,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});m.extendObject(a,v,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:i,otherRequestInfo:g,destinationPublishingInfo:a}},idSync:function(g){if(g!==Object(g)||"string"!=typeof g.dpid||!g.dpid.length)return"Error: config or config.dpid is empty";
if("string"!=typeof g.url||!g.url.length)return"Error: config.url is empty";var a=g.url,b=g.minutesToLive,c=encodeURIComponent,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"==typeof b)b=20160;else if(b=parseInt(b,10),isNaN(b)||0>=b)return"Error: config.minutesToLive needs to be a positive number";g=["ibs",c(g.dpid),"img",c(a),b];v.addMessage(g.join("|"));n.firstRequestHasFired&&v.requestToProcess();return"Successfully queued"},aamIdSync:function(g){if(g!==Object(g)||"string"!=typeof g.dpuuid||
!g.dpuuid.length)return"Error: config or config.dpuuid is empty";g.url="//dpm.demdex.net/ibs:dpid="+g.dpid+"&dpuuid="+g.dpuuid;return this.idSync(g)}},x={submitRequest:function(g){n.registerRequest(x.createQueuedRequest(g));return!0},createQueuedRequest:function(g){var a=n,b,c=g.callback,d="img";if(!q.isEmptyObject(s)){var f,l,o;for(f in s)if(s.hasOwnProperty(f)&&(l=s[f],!(null==l||""===l)&&f in g&&!(l in g)&&!(l in n.reservedKeys)))o=g[f],null==o||""===o||(g[l]=o)}if(!q.isValidPdata(g.sids))g.sids=
[];if(!q.isValidPdata(g.pdata))g.pdata=[];if(!q.isValidLogdata(g.logdata))g.logdata={};g.logdataArray=m.convertObjectToKeyValuePairs(g.logdata,"=",!0);g.logdataArray.push("_ts="+(new Date).getTime());if("function"!=typeof c)c=this.defaultCallback;if(a.useJSONP=!g.useImageRequest||"boolean"!=typeof g.useImageRequest)d="script",b=a.callbackPrefix+"_"+e+"_"+h+"_"+(new Date).getTime();return{tag:d,src:x.makeRequestSrc(g,b),internalCallbackName:b,callbackFn:c,postCallbackFn:g.postCallbackFn,useImageRequest:g.useImageRequest,
requestData:g}},defaultCallback:function(g){var a,b,c,d,e,f,h,j,p;if((a=g.stuff)&&a instanceof Array&&(b=a.length))for(c=0;c<b;c++)if((d=a[c])&&d===Object(d)){e=d.cn;f=d.cv;h=d.ttl;if("undefined"==typeof h||""===h)h=Math.floor(m.getMaxCookieExpiresInMinutes()/60/24);j=d.dmn||"."+document.domain;p=d.type;if(e&&(f||"number"==typeof f))"var"!=p&&(h=parseInt(h,10))&&!isNaN(h)&&m.setCookie(e,f,1440*h,"/",j,!1),A.stuffed[e]=f}a=g.uuid;if("string"==typeof a&&a.length&&!q.isEmptyObject(l)){b=l.path;if("string"!=
typeof b||!b.length)b="/";c=parseInt(l.days,10);isNaN(c)&&(c=100);m.setCookie(l.name||"aam_did",a,1440*c,b,l.domain||"."+document.domain,!0===l.secure)}!o&&!n.abortRequests&&v.requestToProcess(g)},makeRequestSrc:function(a,b){a.sids=q.removeEmptyArrayValues(a.sids||[]);a.pdata=q.removeEmptyArrayValues(a.pdata||[]);var c=n,d=m.encodeAndBuildRequest(a.sids,","),f=m.encodeAndBuildRequest(a.pdata,","),l=(a.logdataArray||[]).join("&");delete a.logdataArray;var o=u.IS_HTTPS?"https://":"http://",j;j=[];
var p,i,s,t;for(p in a)if(!(p in c.reservedKeys)&&a.hasOwnProperty(p))if(i=a[p],p=encodeURIComponent(p),i instanceof Array)for(s=0,t=i.length;s<t;s++)j.push(p+"="+encodeURIComponent(i[s]));else j.push(p+"="+encodeURIComponent(i));j=j.length?"&"+j.join("&"):"";return o+e+".demdex.net/event?d_nsid="+h+(d.length?"&d_sid="+d:"")+(f.length?"&d_px="+f:"")+(l.length?"&d_ld="+encodeURIComponent(l):"")+j+(c.useJSONP?"&d_rtbd=json&d_jsonv="+DIL.jsonVersion+"&d_dst=1&d_cts=1&d_cb="+(b||""):"")},fireRequest:function(a){"img"==
a.tag?this.fireImage(a):"script"==a.tag&&this.fireScript(a)},fireImage:function(a){var b=n,e,f;if(!b.abortRequests)b.firing=!0,e=new Image(0,0),b.sent.push(a),e.onload=function(){b.firing=!1;b.fired.push(a);b.num_of_img_responses++;b.registerRequest()},f=function(e){c="imgAbortOrErrorHandler received the event of type "+e.type;d.push(c);b.abortRequests=!0;b.firing=!1;b.errored.push(a);b.num_of_img_errors++;b.registerRequest()},e.addEventListener?(e.addEventListener("error",f,!1),e.addEventListener("abort",
f,!1)):e.attachEvent&&(e.attachEvent("onerror",f),e.attachEvent("onabort",f)),e.src=a.src},fireScript:function(a){var b=this,f=n,h,l,j=a.src,p=a.postCallbackFn,o="function"==typeof p,i=a.internalCallbackName;if(!f.abortRequests)f.firing=!0,window[i]=function(b){try{b||(b={});var h=a.callbackFn;f.firing=!1;f.fired.push(a);f.num_of_jsonp_responses++;h(b);o&&p(b)}catch(r){r.message="DIL jsonp callback caught error with message "+r.message;c=r.message;d.push(c);r.filename=r.filename||"dil.js";r.partner=
e;DIL.errorModule.handleError(r);try{h({error:r.name+"|"+r.message}),o&&p({error:r.name+"|"+r.message})}catch(j){}}finally{f.requestRemoval({script:l,callbackName:i}),f.registerRequest()}},B?(f.firing=!1,f.requestRemoval({script:"no script created",callbackName:i})):(l=document.createElement("script"),l.addEventListener&&l.addEventListener("error",function(d){f.requestRemoval({script:l,callbackName:i});c="jsonp script tag error listener received the event of type "+d.type+" with src "+j;b.handleScriptError(c,
a)},!1),l.type="text/javascript",l.src=j,h=DIL.variables.scriptNodeList[0],h.parentNode.insertBefore(l,h)),f.sent.push(a)},handleScriptError:function(a,b){var c=n;d.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.num_of_jsonp_errors++;c.registerRequest()}},q={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;
return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,e=[],b=0;b<c;b++)d=a[b],"undefined"!=typeof d&&null!=d&&e.push(d);return e},isPopulatedString:function(a){return"string"==typeof a&&a.length}},m={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"==typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+b,function(a){"function"==typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,
b,c){var d=[],b=b||"=",e,f;for(e in a)f=a[e],"undefined"!=typeof f&&null!=f&&d.push(e+b+(c?encodeURIComponent(f):f));return d},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=Array(d),f=0;f<d;f++)f in c&&(e[f]=b.call(b,c[f],f,c));return e},filter:function(a,
b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var f=[],e=0;e<d;e++)if(e in c){var h=c[e];b.call(b,h,e,c)&&f.push(h)}return f}return a.filter(b)},getCookie:function(a){var a=a+"=",b=document.cookie.split(";"),c,d,e;for(c=0,d=b.length;c<d;c++){for(e=b[c];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(a))return decodeURIComponent(e.substring(a.length,e.length))}return null},setCookie:function(a,
b,c,d,e,f){var h=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(c?";expires="+(new Date(h.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(f?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,b),!0):!1},extendObject:function(a,b,c){var d;if(a===Object(a)&&b===Object(b)){for(d in b)if(b.hasOwnProperty(d)&&(q.isEmptyObject(c)||!(d in c)))a[d]=b[d];return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(u.COOKIE_MAX_EXPIRATION_DATE)).getTime()-
(new Date).getTime())/1E3/60}};"error"==e&&0==h&&m.addListener(window,"load",function(){DIL.windowLoaded=!0});var z=function(){E();!o&&!n.abortRequests&&v.attachIframe();n.readyToRemove=!0;n.requestRemoval()},E=function(){o||setTimeout(function(){!n.firstRequestHasFired&&!n.adms.admsProcessingStarted&&!n.adms.calledBack&&C.submit()},DIL.constants.TIME_TO_DEFAULT_REQUEST)},D=document;"error"!=e&&(DIL.windowLoaded?z():"complete"!=D.readyState&&"loaded"!=D.readyState?m.addListener(window,"load",z):DIL.isAddedPostWindowLoadWasCalled?
m.addListener(window,"load",z):(j="number"==typeof j?parseInt(j,10):0,0>j&&(j=0),setTimeout(z,j||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));this.api=C;this.getStuffedVariable=function(a){var b=A.stuffed[a];!b&&"number"!=typeof b&&(b=m.getCookie(a),!b&&"number"!=typeof b&&(b=""));return b};this.validators=q;this.helpers=m;this.constants=u;this.log=d;if(window._dil_unit_tests)this.pendingRequest=i,this.requestController=n,this.setDestinationPublishingUrl=f,this.destinationPublishing=v,
this.requestProcs=x,this.variables=A},function(){var a=document,b;if(null==a.readyState&&a.addEventListener)a.readyState="loading",a.addEventListener("DOMContentLoaded",b=function(){a.removeEventListener("DOMContentLoaded",b,!1);a.readyState="complete"},!1)}(),DIL.extendStaticPropertiesAndMethods=function(a){var b;if(a===Object(a))for(b in a)a.hasOwnProperty(b)&&(this[b]=a[b])},DIL.extendStaticPropertiesAndMethods({version:"3.4",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},
variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,isAddedPostWindowLoad:function(a){this.isAddedPostWindowLoadWasCalled=!0;this.windowLoaded="function"==typeof a?!!a():"boolean"==typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(b){return(new Image(0,0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+
(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(a,b,d){b=b+"$"+d;b in this.dils||(this.dils[b]=a)},getDil:function(a,b){var d;"string"!=typeof a&&(a="");b||(b=0);d=a+"$"+b;return d in this.dils?this.dils[d]:Error("The DIL instance with partner = "+a+" and containerNSID = "+b+" was not found")},dexGetQSVars:function(a,b,d){b=this.getDil(b,d);return b instanceof this?b.getStuffedVariable(a):""},xd:{postMessage:function(a,b,d){var c=1;if(b)if(window.postMessage)d.postMessage(a,
b.replace(/([^:]+:\/\/[^\/]+).*/,"$1"));else if(b)d.location=b.replace(/#.*$/,"")+"#"+ +new Date+c++ +"&"+a}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),b={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},d=!1;return{activate:function(){d=!0},handleError:function(c){if(!d)return"DIL error module has not been activated";
c!==Object(c)&&(c={});var f=c.name?(new String(c.name)).toLowerCase():"",e=[],c={name:f,filename:c.filename?c.filename+"":"",partner:c.partner?c.partner+"":"no_partner",site:c.site?c.site+"":document.location.href,message:c.message?c.message+"":""};e.push(f in b?b[f]:b.noerrortypedefined);a.api.pixels(e).logs(c).useImageRequest().submit();return"DIL error report sent"},pixelMap:b}}(),DIL.tools={},DIL.modules={};
DIL.tools.getSearchReferrer=function(a,b){var d=DIL.getDil("error"),c=DIL.tools.decomposeURI(a||document.referrer),f="",e="",h={queryParam:"q"},f=d.helpers.filter([b===Object(b)?b:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!c.hostname.match(a.hostPattern))}).shift();return!f?{valid:!1,name:"",keywords:""}:{valid:!0,name:c.hostname,keywords:(d.helpers.extendObject(h,
f),e=h.queryPattern?(f=(""+c.search).match(h.queryPattern))?f[1]:"":c.uriParams[h.queryParam],decodeURIComponent(e||"").replace(/\+|%20/g," "))}};
DIL.tools.decomposeURI=function(a){var b=DIL.getDil("error"),d=document.createElement("a");d.href=a||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(a,d){b.helpers.map(d.split("&"),function(b){b=b.split("=");a[b.shift()]=b.shift()});return a}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},b=document.getElementsByTagName("meta"),d,c,f,e,h;for(d=0,f=arguments.length;d<f;d++)if(e=arguments[d],null!==e)for(c=0;c<b.length;c++)if(h=b[c],h.name==e){a[e]=h.content;break}return a};
DIL.modules.siteCatalyst={init:function(a,b,d){try{var c=this,f={name:"DIL Site Catalyst Module Error"},e=function(a){f.message=a;DIL.errorModule.handleError(f);return a};if(!(b instanceof DIL))return e("dilInstance is not a valid instance of DIL");f.partner=b.api.getPartner();if(a!==Object(a))return e("siteCatalystReportingSuite is not an object");if("function"!=typeof a.m_i||"function"!=typeof a.loadModule)return e("s.m_i is not a function or s.loadModule is not a function");a.m_DIL=function(a){a=
a.m_i("DIL");if(a!==Object(a))return e("m is not an object");a.trackVars=c.constructTrackVars(d);a.d=0;a._t=function(){var a,b,c=","+this.trackVars+",",d=this.s,f,h=[];f=[];var j={},w=!1;if(d!==Object(d)||!(d.va_t instanceof Array))return e("Error in m._t function: s is not an object or s.va_t is not an array");if(this.d){if(d.lightProfileID)(a=d.lightTrackVars)&&(a=","+a+","+d.vl_mr+",");else if(d.pe||d.linkType){a=d.linkTrackVars;if(d.pe&&(b=d.pe.substring(0,1).toUpperCase()+d.pe.substring(1),d[b]))a=
d[b].trackVars;a&&(a=","+a+","+d.vl_l+","+d.vl_l2+",")}if(a){for(b=0,h=a.split(",");b<h.length;b++)0<=c.indexOf(","+h[b]+",")&&f.push(h[b]);f.length&&(c=","+f.join(",")+",")}for(f=0,b=d.va_t.length;f<b;f++)a=d.va_t[f],0<=c.indexOf(","+a+",")&&null!=d[a]&&""!==d[a]&&(j[a]=d[a],w=!0);w&&this.d.api.signals(j,"c_").submit()}};a.setup=function(){this.d=b}};a.loadModule("DIL");if(a.DIL!==Object(a.DIL)||"function"!=typeof a.DIL.setup)return e("s.DIL is not an object or s.DIL.setup is not a function");a.DIL.setup();
if(f.message)return f.message}catch(h){h.message="DIL Site Catalyst module caught error with message "+h.message;if(b instanceof DIL)h.partner=b.api.getPartner();DIL.errorModule.handleError(h);return h.message}},constructTrackVars:function(a){var b=[],d,c,f,e,h;if(a===Object(a)){d=a.names;if(d instanceof Array&&(f=d.length))for(c=0;c<f;c++)e=d[c],"string"==typeof e&&e.length&&b.push(e);a=a.iteratedNames;if(a instanceof Array&&(f=a.length))for(c=0;c<f;c++)if(d=a[c],d===Object(d)&&(e=d.name,h=parseInt(d.maxIndex,
10),"string"==typeof e&&e.length&&!isNaN(h)&&0<=h))for(d=0;d<=h;d++)b.push(e+d);if(b.length)return b.join(",")}return this.constructTrackVars({names:"pageName,channel,campaign,products,events,pe,pev1,pev2,pev3".split(","),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:75}]})}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,init:function(a,b,d){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var c={name:"DIL GA Module Error"},f="";b instanceof DIL?(this.dil=b,c.partner=this.dil.api.getPartner()):(f="dilInstance is not a valid instance of DIL",c.message=f,DIL.errorModule.handleError(c));
!(a instanceof Array)||!a.length?(f="gaArray is not an array or is empty",c.message=f,DIL.errorModule.handleError(c)):this.arr=a;this.tv=this.constructTrackVars(d);this.errorMessage=f}catch(e){e.message="DIL GA module caught error with message "+e.message;if(b instanceof DIL)e.partner=b.api.getPartner();DIL.errorModule.handleError(e);this.errorMessage=e.message}finally{return this}},constructTrackVars:function(a){var b=[],d,c,f,e;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){f=this.defaultTrackVars;
e={};for(d=0,c=f.length;d<c;d++)e[f[d]]=!0;this.defaultTrackVarsObj=e}else e=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(c=a.length))for(d=0;d<c;d++)f=a[d],"string"==typeof f&&f.length&&f in e&&b.push(f);if(b.length)return b}return this.defaultTrackVars},constructGAObj:function(a){var b={},a=a instanceof Array?a:this.arr,d,c,f,e;for(d=0,c=a.length;d<c;d++)f=a[d],f instanceof Array&&f.length&&(e=f.shift(),"string"==typeof e&&e.length&&(b[e]instanceof Array||(b[e]=[]),
b[e].push(f)));return b},addToSignals:function(a,b){if("string"!=typeof a||""===a||null==b||""===b)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(b);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),b={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c){"string"==typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,f,e){this.addToSignals("c_itemOrderId",a);this.addToSignals("c_itemSku",
b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",f);this.addToSignals("c_itemQuantity",e)},_addTrans:function(a,b,c,d,f,e,h,j){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",f);this.addToSignals("c_transCity",e);this.addToSignals("c_transState",h);this.addToSignals("c_transCountry",j)},_trackSocial:function(a,
b,c,d){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},d=this.tv,c,f,e,h,j,o;for(c=0,f=d.length;c<f;c++)if(e=d[c],a.hasOwnProperty(e)&&b.hasOwnProperty(e)&&(o=a[e],o instanceof Array))for(h=0,j=o.length;h<j;h++)b[e].apply(this,o[h])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();return this.hasSignals?(this.dil.api.signals(this.signals).submit(),
"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){a.message="DIL GA module caught error with message "+a.message;if(this.dil instanceof DIL)a.partner=this.dil.api.getPartner();DIL.errorModule.handleError(a);return this.errorMessage=a.message}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],init:function(a,b,d){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=d===Object(d)?d:{};var d={name:"DIL Peer39 Module Error"},c=[],f="";if(this.isSecurePageButNotEnabled(document.location.protocol))f="Module has not been enabled for a secure page",c.push(f),d.message=f,DIL.errorModule.handleError(d);b instanceof DIL?(this.dil=b,d.partner=this.dil.api.getPartner()):
(f="dilInstance is not a valid instance of DIL",c.push(f),d.message=f,DIL.errorModule.handleError(d));"string"!=typeof a||!a.length?(f="aid is not a string or is empty",c.push(f),d.message=f,DIL.errorModule.handleError(d)):this.aid=a;this.errorMessage=c.join("\n")}catch(e){e.message="DIL Peer39 module init() caught error with message "+e.message;if(b instanceof DIL)e.partner=b.api.getPartner();DIL.errorModule.handleError(e);this.errorMessage=e.message}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"==
a&&!0!==this.optionals.enableHTTPS?!0:!1},constructSignals:function(){var a=this,b=this.constructScript(),d=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(d){}finally{a.calledBack=!0,"function"==typeof a.optionals.afterResult&&a.optionals.afterResult()}};d.parentNode.insertBefore(b,d);this.scriptsSent.push(b);return"Request sent to Peer39"},processData:function(a){var b,
d,c,f,e={},h=!1;this.returnedData.push(a);if(a instanceof Array)for(b=0,d=a.length;b<d;b++)c=a[b].split("="),f=c[0],c=c[1],f&&isFinite(c)&&!isNaN(parseInt(c,10))&&(e[f]instanceof Array||(e[f]=[]),e[f].push(c),h=!0);return{hasSignals:h,signals:e}},constructScript:function(){var a=document.createElement("script"),b=this.optionals,d=b.scriptId,c=b.scriptSrc,b=b.scriptParams;a.id="string"==typeof d&&d.length?d:"peer39ScriptLoader";a.type="text/javascript";"string"==typeof c&&c.length?a.src=c:(a.src=(this.dil.constants.IS_HTTPS?
"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"==typeof b&&b.length&&(a.src+="?"+b));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){a.message="DIL Peer39 module submit() caught error with message "+a.message;if(this.dil instanceof DIL)a.partner=this.dil.api.getPartner();DIL.errorModule.handleError(a);return this.errorMessage=a.message}}};
//3.4
var _scObj = s_gi(s_account);
var sDil = DIL.create({
	partner : "sears",
	uuidCookie:{
        name:'aam_uuid',
        days:30
	}
});
DIL.modules.siteCatalyst.init(_scObj, sDil, {
	names: ['pageName', 'channel', 'campaign', 'products', 'events', 'pe', 'referrer', 'server', 'purchaseID', 'zip', 'state'],
		iteratedNames: [{
			   name: 'eVar',
			   maxIndex: 75
		}, {
			   name: 'prop',
			   maxIndex: 75
		}, {
			   name: 'pev',
			   maxIndex: 3
		}, {
			   name: 'hier',
			   maxIndex: 4
		}]
	});
}
/************************ Inclusion of AudienceManager Code ends here ************************/

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.25.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase()"
+";else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.t"
+"cn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[u"
+"n]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;retur"
+"n ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if("
+"!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nr"
+"s){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'"
+"].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return '"
+"'}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=="
+"'s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x"
+";i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h."
+"substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length"
+">1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.lengt"
+"h;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.subst"
+"ring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nf"
+"l[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!n"
+"fl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk."
+"substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+"
+"ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',"
+"fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring("
+"0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+"
+"s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!="
+"'linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substrin"
+"g(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&"
+"&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1"
+"';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k"
+"=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascri"
+"ptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='h"
+"omepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k"
+"=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')"
+"q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eV"
+"ar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'"
+"';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLow"
+"erCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h"
+"=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','lt"
+"ef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s."
+"bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)retur"
+"n;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);"
+"s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.tar"
+"get){t=e.target.target;if(e.target.dispatchEvent&&(!t||t==\\'_self\\'||t==\\'_top\\'||(s.wd.name&&t==s.wd.name))){e.stopPropagation();e.stopImmediatePropagation();e.preventDefault();n=s.d.createEve"
+"nt(\"MouseEvents\");n.initMouseEvent(\"click\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);n.s_f"
+"e=1;s.bct=e.target;s.bce=n;}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o."
+"protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<"
+"0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if"
+"((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c="
+"o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else "
+"if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}"
+"return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf('"
+",')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s."
+"sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0}"
+";s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype"
+"||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape("
+"x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+"
+"o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.a"
+"pv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent){s.bbc=1;s.useForcedLinkTracking=1;s.b"
+".addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+"
+"s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&"
+"m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s"
+".uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.to"
+"LowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;"
+"if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Ar"
+"ray;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','"
+"_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r"
+"._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;i"
+"f(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\""
+"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.le"
+"ngth;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf("
+"'function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModu"
+"le(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g="
+"\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o="
+"s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o."
+"l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascr"
+"ipt\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2"
+")}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=th"
+"is,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function("
+"vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo"
+"=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0')"
+";s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.gfid=function(){v"
+"ar s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.fl"
+"oor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.applyADMS=function(){var s=this,vb=new Object;if(s"
+".wd.ADMS&&!s.visitorID&&!s.admsc){if(!s.adms)s.adms=ADMS.getDefault();if(!s.admsq){s.visitorID=s.adms.getVisitorID(new Function('v','var s=s_c_il['+s._in+'],l=s.admsq,i;if(v==-1)v=0;if(v)s.visitorI"
+"D=v;s.admsq=0;if(l){s.admsc=1;for(i=0;i<l.length;i++)s.t(l[i]);s.admsc=0;}'));if(!s.visitorID)s.admsq=new Array}if(s.admsq){s.vob(vb);vb['!visitorID']=0;s.admsq.push(vb);return 1}else{if(s.visitorI"
+"D==-1)s.visitorID=0}}return 0};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/108"
+"00000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.g"
+"tfs(),ta=-1,q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc',"
+"'true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;"
+"if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.pa"
+"rse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.w"
+"d.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElemen"
+"t.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Functi"
+"on('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';'"
+";if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugin"
+"s=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}s.fid=s.gfid();if(s.applyADMS())return '';if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;"
+"if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oid"
+"t,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';i"
+"f((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.li"
+"nkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.o"
+"t(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-objec"
+"t-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\""
+").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")o"
+"cx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s"
+")}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else t"
+"rk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retri"
+"eveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);s.abort=0;s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s"
+".pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLig"
+"ht=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l."
+"length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n"
+",x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i"
+"++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=windo"
+"w;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s."
+"n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft In"
+"ternet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if("
+"s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCha"
+"rCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,fid,vmk,visitorMigrationKey,visitorMigrationServer,v"
+"isitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,r"
+"etrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,"
+"lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;"
+"n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,reso"
+"lution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',tracki"
+"ngServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountM"
+"atch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTr"
+"ackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function"
+"(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
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
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
/****************** shc_code.js start here  ******************/
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/* StoreFront Plugins */

//var s_account=omAcct; // Set this to "searscom" when in the production environment;
//var s=s_gi(s_account);

//Declare required prefix constants
var HOME_PAGE = 'Homepage';
var VERTICAL 			= 'Vertical';
var CATEGORY 			= 'Category';
var SUBCAT 				= 'Subcategory';
var PRODUCT 			= 'Product Summary';
var SEARCH_RESULTS = 'Search Results';
var NO_SEARCH_RESULTS = 'No Search Results';
var DAP 				= 'DAP';
var NB 					= 'Static Browse';
var DCP 				= 'Dynamic Category';
var GIFT_CARDS 			= 'Gift Cards';
var WRITE_REVIEW 		= 'Write Review Page';
var UPLOAD_VIDEO_REVIEW = 'Upload Video Review';
var ERROR_PAGE= 'Browse Error';
var COMPARE				= 'Product Compare';
var KEYWORD_REDIRECT 		= 'Keyword Redirect';
var	CATEGORY_RESEARCH_PAGE= 'Reviews Research Page';
var EPUBLISHING = 'ePublishing';
var channel ;
var omSbv;
var omPrefix;
var omVrt;
var omCat;
var omSubCat;
var omSbf;
var omPid;
var SHOP_BY_BRAND = 'Shop By Brand';
var UName = "";
var UValue = "";

//Declare other required variables
var isAutomotive = $('input#isAutomotive').val();
//var vName = $('input#vName').val();

var brandList =["Zeghani","Vedere Le Stelle", "Bosch Showcase", "Skechers", "New Balance", "Crocs", "Sears Add 1 Showcase","David Tutera", "Pretty in Pave", "Ella Rose","Riders",  "Wranglers", "dickies brand showcase", "Jaclyn Smith Brands", "kardashiankollection", "Hasbro Games", "Just Kidz", "Littlest Pet Shop", "KM Nerf", "KM Playskool", "Ringside", "KM Vtech", "kmartpoolsfinder", "kmartbikefinder", "KM LEGO", "KM Power Wheels", "KM LeapFrog", "Ringside" , "KM Vtech" , "KM Barbie", "KM Hot Wheels", "Monster High", "Fisher Price", ""]; 
// ECOM-284276 - added "" at the end of the array, similar to Sears scc js; eVar40 was missing during onload of Kmart Toy Finder page
    var refBrandList =["dap_10153_12605_dap_Zeghani","dap_10153_12605_dap_Vedere+Le+Stelle", "dap_10153_12605_dap_Bosch+Showcase", "dap_10153_12607_dap_Skechers", "dap_10153_12605_dap_New+Balance", "dap_10153_12605_dap_Crocs", "dap_10153_12605_dap_Sears+Add+1+Showcase","dap_10153_12605_dap_David+Tutera", "dap_10153_12605_dap_Pretty+in+Pave", "dap_10153_12605_dap_Ella+Rose",  "dap_10151_10104_dap_Riders",  "dap_10151_10104_dap_Wranglers", "dap_10153_12605_dap_dickies+brand+showcase", "dap_10151_10104_dap_Jaclyn+Smith+Brands", "dap_10153_12605_dap_kardashiankollection", "dap_10153_12605_dap_Bosch+Showcase", "dap_10151_10104_dap_Hasbro+Games", "dap_10151_10104_dap_Just+Kidz", "dap_10151_10104_dap_Littlest+Pet+Shop", "dap_10151_10104_dap_KM+Nerf", "dap_10151_10104_dap_KM+Playskool", "dap_10151_10104_dap_Ringside", "dap_10151_10104_dap_KM+Vtech",
        "v_10151_10104_Clothing?sbf=Brand&sbv=Athletech", "v_10153_12605_Clothing?sbv=Dockers&sbf=Brand", "v_10151_10104_Clothing?sbf=Brand&sbv=Route+66", "v_10153_12605_Appliances?sbf=Brand&sbv=Electrolux", "v_10153_12605_Appliances?sbf=Brand&sbv=Frigidaire","v_10153_12605_Appliances?sbf=Brand&sbv=GE+Appliances", "v_10153_12605_Appliances?sbf=Brand&sbv=LG","v_10153_12605_Appliances?sbf=Brand&sbv=Maytag","v_10153_12605_Appliances?sbf=Brand&sbv=KitchenAid", "v_10153_12605_Appliances?sbf=Brand&sbv=Whirlpool", "v_10153_12605_Appliances?sbf=Brand&sbv=Jenn-Air","v_10153_12605_Computers+%26+Electronics?sbf=Brand&sbv=Kodak","v_10151_10104_Computers+%26+Electronics?sbf=Brand&sbv=Kodak", "v_10153_12605_Shoes?sbf=Brand&sbv=Avia", "v_10153_12605_Shoes?sbf=Brand&sbv=Bearpaw", "v_10153_12605_Shoes?adCell=W6&sbv=Caterpillar&sbf=Brand",
        "v_10153_12605_Shoes?sbf=Brand&sbv=Converse", "c_10153_12605_Shoes_Kids?sbf=Brand&sbv=Disney", "v_10153_12605_Clothing?sbf=Brand&sbv=Dockers", "v_10153_12605_Shoes?sbf=Brand&sbv=Dr.+Scholl%27s", "v_10153_12605_Shoes?sbf=Brand&sbv=Fila", "v_10153_12605_Shoes?sbf=Brand&sbv=New+Balance", "v_10153_12605_Shoes?sbf=Brand&sbv=Orthaheel", "v_10151_10104_Shoes?sbf=Brand&sbv=Protege", "v_10153_12605_Shoes?sbf=Brand&sbv=Reebok", "v_10153_12605_Shoes?sbf=Brand&sbv=Skechers", "v_10153_12605_Shoes?sbf=Brand&sbv=Timberland+PRO", "v_10153_12605_Shoes?sbf=Brand&sbv=Wolverine", "c_10153_12605_Appliances_Small+Kitchen+Appliances?sbf=Brand&sbv=Cuisinart", "c_10153_12605_For+the+Home_Mattresses?sbf=Brand&sbv=Sealy",
        "v_10153_12605_Clothing?sbf=Brand&sbv=Levi+s","http://www.sears.com/clothing/v-1020011?sbf=Brand&sbv=Levi","http://www.sears.com/zeghani/dap-120000000144307","http://www.sears.com/vedere-le-stelle/dap-120000000140764","http://www.sears.com/skechers/dap-120000000172633","http://www.sears.com/new-balance/dap-120000000209171","http://www.sears.com/crocs/dap-120000000218046","http://www.sears.com/sears-add-1-showcase/dap-120000000224118","http://www.sears.com/david-tutera/dap-120000000119926","http://www.sears.com/pretty-in-pave/dap-120000000208423","http://www.sears.com/ella-rose/dap-120000000208943","http://www.kmart.com/riders/dap-100000000152003","http://www.kmart.com/wranglers/dap-120000000169155","http://www.sears.com/dickies-brand-showcase/dap-120000000212022","http://www.kmart.com/jaclyn-smith-brands/dap-100000000160521",
        "http://www.sears.com/kardashiankollection/dap-120000000132635","http://www.sears.com/bosch-showcase/dap-120000000195376","http://www.kmart.com/hasbro-games/dap-120000000016503","http://www.kmart.com/just-kidz/dap-120000000117797","http://www.kmart.com/littlest-pet-shop/dap-120000000000502","http://www.kmart.com/km-nerf/dap-120000000051256","http://www.kmart.com/km-playskool/dap-120000000057225","http://www.kmart.com/ringside/dap-120000000053782","http://www.kmart.com/km-vtech/dap-120000000119835","http://www.kmart.com/clothing/v-20008?sbf=Brand&sbv=Athletech","http://www.sears.com/clothing/v-1020011?sbf=Brand&sbv=Dockers","http://www.kmart.com/clothing/v-20008?sbf=Brand&sbv=Route+66","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=Frigidaire","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=GE+Appliances",
        "http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=LG","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=Maytag","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=KitchenAid","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=Whirlpool","http://www.sears.com/appliances/v-1020003?sbf=Brand&sbv=Jenn-Air","http://www.sears.com/computers-electronics/v-1020002?sbf=Brand&sbv=Kodak","http://www.kmart.com/computers-electronics/v-20001?sbf=Brand&sbv=Kodak","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Avia","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Bearpaw","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Caterpillar","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Converse","http://www.sears.com/shoes-kids/c-1020179?sbf=Brand&sbv=Disney","http://www.sears.com/clothing/v-1020011?sbf=Brand&sbv=Dockers",
        "http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Dr.+Scholl+s","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Fila","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=New+Balance","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Orthaheel","http://www.kmart.com/shoes/v-23140?sbf=Brand&sbv=Protege","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Reebok","http://www.sears.com/skechers/dap-120000000172633","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Timberland+PRO","http://www.sears.com/shoes/v-1020013?sbf=Brand&sbv=Wolverine","http://www.sears.com/appliances-small-kitchen-appliances/c-1020025?sbf=Brand&sbv=Cuisinart","http://www.sears.com/for-the-home-mattresses/c-1020246?sbf=Brand&sbv=Sealy", "http://www.kmart.com/shc/s/dap_10151_10104_DAP_kmart-pools-finder", "http://www.kmart.com/shc/s/dap_10151_10104_DAP_kmart-bike-finder",
        "http://www.kmart.com/shc/s/dap_10151_10104_DAP_KM%20LEGO", "http://www.kmart.com/shc/s/dap_10151_10104_DAP_KM%20Power%20Wheels", "http://www.kmart.com/shc/s/dap_10151_10104_DAP_KM%20LeapFrog", "http://www.kmart.com/shc/s/dap_10151_10104_DAP_ringside", "http://www.kmart.com/shc/s/dap_10151_10104_DAP_KM%20Vtech", "http://www.kmart.com/shc/s/dap_10151_10104_DAP_KM%20Barbie", "http://www.kmart.com/shc/s/dap_10151_10104_DAP_KM+Hot+Wheels", "http://www.kmart.com/shc/s/dap_10151_10104_DAP_Monster+High", "http://www.kmart.com/shc/s/dap_10151_10101_DAP_Fisher%20Price"];
    var sbvListSearsV =["levi's","dockers","electrolux","frigidaire","ge appliances","lg","maytag","kitchenAid","whirlpool","jennair","kodak","avia","bearpaw","caterpillar","converse","dr. scholl's","fila","new balance","orthaheel","reebok","skechers","timberland pro","wolverine"];
    var sbvListSearsC =["disney","cuisinart","sealy"];
    var sbvListKmartV =["athletech","route 66","kodak","protege"];
    var SearsVertCheck =["clothing?","appliances?","computers & electronics?","shoes?","for the home?"];
    var SearsCatCheck =["appliances_small kitchen appliances?","for the home_mattresses?","Shoes_Kids?"];
    var KmartVertCheck =["clothing?","shoes?","computers & electronics?"];

populateSObject();

function populateSObject() {
	var x = getSHC();
	var shipVantageUser = '';
	var new_Pathname = "";
	try{
		new_Pathname = window.location.pathname;
	if($.cookie("om_m") !=null && $.cookie("om_m") !=''){
		shipVantageUser = $.cookie("om_m");
	}
	}catch(e){}

	try {
		if($.cookie('refererOrigin') != null){
			s.referrer = $.cookie('refererOrigin');
		 }
	}catch(e){
        }

	if(x.summary.toLowerCase() != 'undefined' && x.summary.length > 0) {
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
			        if (typeof br_data.ptype != 'undefined' && br_data.ptype == 'SUBCATEGORY' && typeof sName!= 'undefined' && sName == '')
				setCategoryVars(x);
	                           else
				setSubCategoryVars(x);
				break;
			case CATEGORY_RESEARCH_PAGE:
				setCategoryResearchVars(x);
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
			case DAP:
				//Code to block ECOM-255333 - Remove Omniture Call to Searsstyle.com
				try{
					if(typeof new_Pathname === 'undefined' || (new_Pathname.toLowerCase().indexOf('dapc') === -1 && new_Pathname.toLowerCase().indexOf('searsstyle') === -1)){
						setDAPVars(x);
						if(validateBrandShowCase(omVrt,x)) {
						   if(omVrt.toLowerCase() == 'toy finder') { // ECOM-284276
							s.eVar40 = 'Toy Finder'; 
						   } else {
							s.eVar40 = 'Brand Showcase:'+omVrt;
						   }
						}
					}
				}catch(e){}
 				break;
			case NB:
				setNBVars(x);
				break;
			case DCP:
				x.vrt = DCP;
				setSubCategoryVars(x);
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
			case SHOP_BY_BRAND:
				setShopByBrandPageVars(x);
				if(validateBrandShowCase(omVrt,x)) {
		   			s.eVar40 = 'Brand Showcase:'+omSbv;
		   		}
				break;
			// Add flow for Weekly Ad pages.
			case EPUBLISHING:
				if (WeeklyAd.Omniture != undefined) {
					// weeklyAdOmniture originally defined in weeklyad.js. Do not change the name here.
					weeklyAdOmniture = WeeklyAd.Omniture(x);
				}
				break;
			// Add flow for Weekly Ad pages - End
			default:
				if(x.summary.toLowerCase().indexOf('error') > -1) setErrorPageVars(x);
                                else {
					if(typeof channel != 'undefined'){
						if(x.channel.toLowerCase() != 'undefined' && (x.channel == 'Gift Registry' || x.channel == 'Give Together')) {
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

	if (($.cookie('s_sd') == 's_sd')||(location.protocol == 'https:')){

	setUserProfieVars(); 	//Sets eVar30 and eVar45
	}
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
	if(x.vrt.length > 0 && x.vrt.toLowerCase != 'undefined') {
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

	//Return - if details are insufficient
	/*if(x.summary == '' || x.summary.toLowerCase() == 'undefined') return;

	var genVal = x.summary;
	if(x.vrt.length > 0 && x.vrt.toLowerCase != 'undefined') {
		genVal = x.vrt;
	}
	s.channel = genVal;	*/
	if(gup('prop17') != '') {
	s.prop17 = gup(unescape('prop17'));
		s.prop17=unescape(s.prop17.replace(/\+/g," ")); // ECOM-270017
	}
}
function setAllPageVars(x) {

	//Return - if details are insufficient
	if(x.summary == '' || x.summary.toLowerCase() == 'undefined') return;

	s.pageName = x.summary;

	var genVal = x.summary;
	if(x.vrt.length > 0 && x.vrt.toLowerCase != 'undefined') {
		genVal = x.vrt;
	}
	s.channel = genVal;
	s.prop1 = genVal;
	s.prop2 = genVal;
	s.prop3 = genVal;
	s.prop27 = genVal;
	s.prop28 = genVal;

	if(gup('prop17') != '') {
		s.prop17 = gup('prop17');
		s.prop17=unescape(s.prop17.replace(/\+/g," ")); // ECOM-270017
}
}

function setVerticalVars(x) {
			var pageType = "Vertical";
			s.pageName = pageType+' > '+x.vrt;
			s.channel = x.vrt;
			s.prop1 = x.vrt;
			s.prop2 = x.vrt;
			if (typeof isNewVertical !== 'undefined' && isNewVertical !== 'undefined' && isNewVertical == 'true') {
				s.prop27 = 'Vertical V2';
				s.prop28 = x.vrt+' > Vertical V2';
			} else {
			s.prop27 = pageType;
			s.prop28 = x.vrt+' > '+pageType;
			}
			s.events="event38";
	s.eVar11="D=pageName";
	s.eVar41="D=pageName";
	setProp3(x);

	// Set prop17 for keyword redirect pages only
	if(gup('prop17') != '') {
	s.prop17 = gup('prop17');
		s.prop17=unescape(s.prop17.replace(/\+/g," ")); // ECOM-270017
	s.prop49='Search Redirect > Vertical';
	s.prop11=s.prop17;
	setKeywordDirectVars(x);
	}

	//PFM
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){			
			if(x.vrt === 'Gifts') {s.eVar40 = 'Gift Finder';}
			else if(x.vrt.toLowerCase().search('toy') != -1 && document.referrer.toLowerCase().search('toy-finder') != -1) {s.eVar40 = 'Toy Finder';} // ECOM-284276
			else if(gup('sortOption') === 'RATING_HIGH_TO_LOW') {s.eVar40 = 'Top Rated';}
			else {s.eVar40 = 'Browse';}
	 }
}

function setComparePageVars(x) {
	var url = window.location.href;
	var dataUnavlbl = 'NA > ' + url;
	var pageType = "Product Compare";
	s.pageName = pageType;
	s.eVar40 = "Compare";
	s.prop27 = pageType;
	if(x.vrt != null && x.vrt.length > 0) {
		s.channel = x.vrt;
		s.prop28 = x.vrt+' > '+pageType;
	} else {
		s.channel = dataUnavlbl;
		s.prop28 = dataUnavlbl + ' > ' + pageType;
			}
	if(x.vrt != null && x.vrt.length > 0 && x.cat != null && x.cat.length > 0)
		s.prop1 = x.vrt+' > '+x.cat;
	else
		s.prop1 = dataUnavlbl;
	if(x.vrt != null && x.vrt.length > 0 && x.cat != null && x.cat.length > 0 && x.subcat != null && x.subcat.length > 0)
		s.prop2 = x.vrt+' > '+x.cat+' > '+x.subcat;
	else
		s.prop2 = dataUnavlbl;
	setProp3(x);
			}

function setCategoryVars(x) {
			var pageType = "Category";

			//$.cookie("fromcat","true",{path:'/'});
                        //$.cookie("categoryName",x.cat,{path:'/'});
			s.pageName = pageType+' > '+x.vrt+' > '+x.cat;
			s.channel = x.vrt;
			s.prop1 = x.vrt+' > '+x.cat;
			s.prop2 = x.vrt+' > '+x.cat;
			if (typeof isViewAll!== 'undefined' && isViewAll !== undefined && isViewAll ==='true') {
				s.prop27="Category View All";
			s.prop28 = x.vrt+' > '+pageType;
			} else if (typeof isNewCategory!== 'undefined' && isNewCategory !== undefined && isNewCategory ==='true') {
				s.prop27="Category New";
				s.prop28 = x.vrt+' > '+pageType;
			} else if(typeof catVertCommonLayout !== 'undefined' && catVertCommonLayout !== undefined && catVertCommonLayout === 'true'){
				s.prop27="Category V2";
				s.prop28 = x.vrt+' > Category V2';
			} else {
				s.prop27="Category Old";
				s.prop28 = x.vrt+' > '+pageType;
			}
			s.events= "event39";
	s.eVar11="D=pageName";
	s.eVar41="D=pageName";
	setProp3(x);

	//PFM
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
		var currentStoreId = getStoreId();
		if(x.vrt === 'Gifts') {s.eVar40 = 'Gift Finder';} 
		else if(x.vrt.toLowerCase().search('toy') != -1 && document.referrer.toLowerCase().search('toy-finder') != -1) {s.eVar40 = 'Toy Finder';} // ECOM-284276
		else if(gup('sortOption') === 'RATING_HIGH_TO_LOW') {s.eVar40 = 'Top Rated';} 
		else {s.eVar40 = 'Browse';}
	}
	
	// Set prop17 for keyword redirect pages only
	if(gup('prop17') != '') {
	s.prop17 = gup('prop17');
		s.prop17=unescape(s.prop17.replace(/\+/g," ")); // ECOM-270017
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
		s.events = "event56";
	s.eVar11="D=pageName";
	s.eVar41="D=pageName";

	setProp3(x);

	//PFM
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
		if(x.vrt == 'Gifts') {s.eVar40 = 'Gift Finder';}
		else if(x.vrt.toLowerCase().search('toy') != -1 && document.referrer.toLowerCase().search('toy-finder') != -1) {s.eVar40 = 'Toy Finder';} // ECOM-284276
		else if(gup('sortOption') == 'RATING_HIGH_TO_LOW') {s.eVar40 = 'Top Rated';}
		else {s.eVar40 = 'Browse';}
	}
	
	// Set prop17 for keyword redirect pages only
	if(gup('prop17') != ''){
	s.prop17 = gup('prop17');
		s.prop17=unescape(s.prop17.replace(/\+/g," ")); // ECOM-270017
	s.prop49='Search Redirect > SubCategory';
			s.prop11=s.prop17;
		s.eVar4=s.prop17; // ECOM-270017
	setKeywordDirectVars(x);
		}
}

function setCategoryResearchVars(x){
	var pageName = x.summary;;
	var pageNamePrefix='Product Summary';
	s.pageName 	= pageNamePrefix +' > '+pageName;
	s.prop1 	= pageNamePrefix +' > '+pageName;
	s.prop2		= pageNamePrefix +' > '+pageName;
	s.prop3 	= pageNamePrefix +' > '+pageName;
	s.prop13 	= pageNamePrefix +' > '+pageName;
	s.prop18 	= pageNamePrefix +' > '+pageName;
	s.prop27	= pageNamePrefix +' > '+pageName;
	s.prop28 	= pageNamePrefix +' > '+pageName;
}

function setProductVars(x) {

	var pageType = "Product Summary";
	s.pageName = pageType;
	//As per JIRA - ECOM-93203
	//s.eVar40 = pageType;
	var url = window.location.href;
	var dataUnavlbl = 'NA > ' + url;

	var productType = document.getElementById("product").className;
	var className = $('#product').attr('class');
	var names = className.split(' ');

	if(typeof rspuPageType !="undefined" && rspuPageType !=""){
		names.push(rspuPageType);
	}

	var outfitItems = $('#outfitsGridWrp .outfitProductWrp').size(),
	outfitOOSItems = $('#outfitsGridWrp .outfitProductWrp.oos').size();

	//prop10 for outfits
	if(names.length && jQuery.inArray('outfit',names) >-1) {
	     s.prop10=x.pid + ' > ' + outfitItems + ' > ' + outfitOOSItems;
	     s.eVar68 = x.pid;
	} else {
	     s.prop10=x.pid;
	}

	if (typeof vn != 'undefined' && vn != null && vn != ''){
        	s.channel = vn;
		s.prop28 = vn + ' > ' + pageType;
	}else if(x.vrt != null && x.vrt.length > 0) {
		s.channel = x.vrt;
		s.prop28 = x.vrt + ' > ' + pageType;
	} else if(typeof vName != 'undefined' && vName.length > 0){
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
	}else if(x.vrt != null && x.vrt.length > 0 && x.cat != null && x.cat.length > 0){
		s.prop1 = x.vrt+' > '+x.cat;
	}
	else if(typeof vName != 'undefined' && vName.length > 0 && typeof cName != 'undefined' && cName.length > 0){
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
	}else if(x.vrt != null && x.vrt.length > 0 && x.cat != null && x.cat.length > 0 && x.subcat != null && x.subcat.length > 0){
		s.prop2 = x.vrt+' > '+x.cat+' > '+x.subcat;
	}
	else if(typeof vName != 'undefined' && vName.length > 0 && typeof cName != 'undefined' && cName.length > 0 && typeof sName != 'undefined' && sName.length > 0){
		s.prop2 = vName+' > '+cName+' > '+sName;
	}
	else{
		s.prop2 = dataUnavlbl;
	}
	}
	var productType = document.getElementById("product").className;
	var className = $('#product').attr('class');
	var names = className.split(' ');

	if(typeof rspuPageType !="undefined" && rspuPageType !=""){
		names.push(rspuPageType);
	}

	if(names.length > 0)
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
			if(!!$.cookie("zipCode10151") && $.cookie("zipCode10151") !== undefined && $.cookie("zipCode10151") !== '') {
				s.eVar62 = $.cookie("zipCode10151");
			}
		}else if(jQuery.inArray('softline',names) >-1){
			s.prop27 = pageType+" > SL3";
		}else if(jQuery.inArray('hardline',names) >-1){
				s.prop27 = pageType+" > HL3";
		}else if(typeof outfitPage !== 'undefined' && outfitPage.toLowerCase() === 'true'){
			s.prop27 = pageType+" > OTF";
		}else{
			s.prop27 = pageType+" > COL";
	}
	}

	if(typeof x.evt != 'undefined') {
	//if(gup('prdNo')!='') {
	if($.cookie("viewType")!=null && $.cookie("viewType")!=''){
		var layout=$.cookie("viewType")
		var blockNo;
		if(gup('prdNo')!='')
		blockNo=gup('prdNo');
		else blockNo='';
		if(layout == 'pac') eVar28 = 'P'+blockNo;
	    else if(layout == 'gal') eVar28 = 'G'+blockNo;
	    else if(layout == 'list') eVar28 = 'L'+blockNo;
}
else{
var blockNo;
		if(gup('prdNo')!='')
		blockNo=gup('prdNo');
		else blockNo='';

}

		if(s.prop27==="Product Summary > OTF"){
			var outfitItems = $('#outfitsGridWrp .outfitProductWrp').length,
			outfitOOSItems = $('#outfitsGridWrp .outfitProductWrp.oos').length;
			
			s.events='event40';
			s.products=";Outfit Detail Page";
			/*s.events='prodView,event10,event40,event28,event29';
			var evnt = x.evt.products.split(',');
			s.products='';
			for(var i=0;i<evnt.length;i++) {
  			  var ck=evnt[i];
			  s.products+=ck+",";
			}*/
			//To track Number of Outfit items under a product
			//trackClickActionOutfits('Outfits > Total Outfit Item Count >'+outfitItems);
			//To track Number of Out of Stock Outfit items under a product
			//if (outfitOOSItems >= 1) {
			//trackClickActionOutfits('Outfits > Outfit Offline Items >'+outfitOOSItems);
			//}
		}else if(s.prop27!="Product Summary > COL"){
		s.events='prodView,event10,event28,event29';
		if(gup('blockNo')!='' && gup('blockNo')!= 'undefined')
		s.products=x.evt.products;
		else
		s.products=x.evt.products;

	//s.prop29 = eVar28;

		}else if(s.prop27=="Product Summary > COL"){


		s.events='prodView,event10,event40,event28,event29';
			var evnt = x.evt.products.split(',');
			s.products='';
						for(var i=0;i<evnt.length;i++) {
						var ck=evnt[i];
						s.products+=ck+",";

		}
		}
		else
		{
			s.events = x.evt.events;

			s.products = x.evt.products;

			}

			if (typeof eVar28 !='undefined' && eVar28!= 'undefined')
			{
			s.prop29=eVar28;
			}

			if(typeof bundleProductPage !== 'undefined' && bundleProductPage) {
				//s.events = x.evt.events;
				//s.products = x.evt.products;
				s.events='event40';
				s.products=";Bundle Detail Page";
			}
	}
	//Commenting out the following block as per ECOM-92599
	/* var event29Val = s.getQueryParam('event29');
		var evar28Val = s.getQueryParam('eVar28');
	if(event29Val.length > 0 && evar28Val.length > 0) {
		s.events = s.events+",event28,event29";
		s.products = s.products+";;;event29="+event29Val+";eVar28="+evar28Val;
	}*/

	if(typeof mktPlaceInd != 'undefined'){
		if(typeof merchantCount != 'undefined' && merchantCount > 0) {
			s.events=s.events+",event45";
			merchCount = merchantCount;
			if(typeof CPCCount != 'undefined' && CPCCount > 0){
				s.events= s.events + ",event48,event50";
		}
			if(typeof CPCCount != 'undefined' && CPCCount == 0 && $('input#mktPlaceInd').val() == 'CPC'){
				s.events= s.events + ",event48,event50";
		}

			if(typeof FBMCount != 'undefined' && FBMCount == 0 && $('input#mktPlaceInd').val() == 'FBM'){
				s.events= s.events + ",event49,event51";
	}

			if(typeof FBMCount != 'undefined' && FBMCount > 0){
				s.events= s.events + ",event49,event51";
}

			if(typeof FBSCount != 'undefined' && FBSCount == 0 && $('input#mktPlaceInd').val() == 'FBS'){
				s.events= s.events + ",event52,event53";
		}

			if(typeof FBSCount != 'undefined' && FBSCount > 0){
				s.events= s.events + ",event52,event53";
}
			if(typeof CPCCount != 'undefined' &&
				typeof FBMCount != 'undefined' &&
				typeof FBSCount != 'undefined' &&
				(merchantCount != 1) &&
				((merchantCount-CPCCount-FBSCount-FBMCount > 1) || ($('input#mktPlaceInd').val() == 'SHC'))) {
					s.events= s.events + ",event54";
			}

			     }else{
			if(s.events != 'event46,event47') {
			     if(typeof buyerprotection !='undefined' && buyerprotection != null) {
					s.events = s.events + buyerprotection;
		}
			}
		}
		if(typeof viewAllMerchEvt != 'undefined' && viewAllMerchEvt != null && viewAllMerchEvt != '') {
			s.events = viewAllMerchEvt;
		}

		var tmp_brand="";
    	var tmp_vrt="";
    	var tmp_cat="";

    	/*if (x.evt.eVar43 != null && x.evt.eVar43.length>0){
    	    tmp_brand=x.evt.eVar43;
    	}*/

    	if (x.vrt !=null && x.vrt.length>0){
    	    tmp_vrt=x.vrt;
    	}

    	if (x.cat !=null && x.cat.length>0){
    	    tmp_cat=x.cat;
    	}

    	if (s.events == 'prodView,event10')
    	{
          	s.products=x.evt.products+";;;;";
			if(tmp_brand !=null && tmp_brand.length>0)
			{
			     if( (tmp_cat !=null && tmp_cat.length>0)|| (tmp_vrt !=null && tmp_vrt.length>0)){
				 s.products=s.products+"evar43="+tmp_brand;
				 }
				 else
				 s.products=s.products+"evar43="+tmp_brand;
			}
    	}
		else if(s.events.match("^(prodView,event10,event45)"))
		{
			s.products=x.evt.products+";;;event45=1;";
			if(tmp_brand !=null && tmp_brand.length>0)
			{
				if( (tmp_cat !=null && tmp_cat.length>0)|| (tmp_vrt !=null && tmp_vrt.length>0))
				{
					s.products=s.products+"evar43="+tmp_brand;
				}
				else
					s.products=s.products+"evar43="+tmp_brand;
			}
		}

		if((typeof mktName != 'undefined' && mktName != '') && (typeof sinNumber != 'undefined' && sinNumber != '')){
				mktstring = mktName;
				aMktName =  mktName.split("^");
					s.products=s.products + "|";
					CPCFlag = 0;
					FBMflag = 0;
					FBSflag = 0;
					s.products=s.products+"evar35="+sinNumber
					for(var i = 0 ; i < aMktName.length; i++){
						aMktType = aMktName[i].split("*");
						s.products=s.products+",;M:"+aMktType[0]+":"+aMktType[1]+";;;";
						if((aMktType[0] == "CPC") && (CPCFlag == 0 || CPCFlag ==1)){
							if(CPCFlag == 0){
								s.products=s.products+"event48=1|event50=1;"
								CPCFlag = 1;
					} else if(CPCFlag ==1) {
								s.products=s.products+"event50=1;"
								CPCFlag = 1;
							}
				} else if ((aMktType[0] == "FBM") && (FBMflag == 0 || FBMflag ==1)) {
							if(FBMflag == 0){
								s.products=s.products+"event49=1|event51=1;"
								FBMflag = 1;
					} else if(FBMflag ==1) {
								s.products=s.products+"event51=1;"
								FBMflag = 1;
							}
				} else if ((aMktType[0] == "FBS") && (FBSflag == 0 || FBSflag ==1)) {
							if(FBSflag == 0){
								s.products=s.products+"event52=1|event53=1;"
								FBSflag = 1;
					} else if(FBSflag ==1) {
								s.products=s.products+"event53=1;"
								FBSflag = 1;
							}
						}
					   s.products=s.products+"evar35="+sinNumber+"|evar8="+aMktType[0]+":"+aMktType[1];
					}
				}
	}
	// Set prop17 for keyword redirect pages only
	if(gup('prop17') != '')

	{	s.prop17 = gup('prop17');
		s.prop17=unescape(s.prop17.replace(/\+/g," ")); // ECOM-270017
		s.prop49='Search Redirect > Product Summary';
		s.events="prodView,event10";
				s.prop11=s.prop17;
				s.products=x.evt.products;
				//s.prop27='Product Summary';
				s.eVar11="D=pageName";
	s.eVar41="D=pageName";
	s.prop29='';
	s.prop48='';
	setKeywordDirectVars(x);
		}
	else
	{
		if (x.kywrd != null && x.kywrd.length > 0) {
    		s.prop17=x.kywrd.toLowerCase();
    			s.prop17=unescape(s.prop17.replace(/\+/g," ")); // ECOM-270017
    	}
	}
	setProp3(x);
	//ECOM-258560 changes Starts here
	if(typeof $('input#dod_product_val') !== 'undefined' && $('input#dod_product_val').val() == "true" && $('body').attr('id') == "product"){
		setDodVar_Pdp(x);
}
	//ECOM-258560 changes Ends here
}
//ECOM-258560 Changes
function setDodVar_Pdp(x){
	if(typeof s !== 'undefined'){
		s.linkTrackVars = 'products,eVar40' ;
		s.products= x.evt.products;
		s.eVar40 = 'Deal of the Day';
		s.tl(true,'o','Deal of the Day');
	}
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
	s.eVar12 = 'D=pageName'; // Setting it as D=pageName as per ECOM-91571
	if(x.vrt.toLowerCase() == 'wow specials') s.eVar40="Deal of the Day";
	else if(x.vrt.toLowerCase() == 'personal shopper') s.eVar40="Personal Shopper";
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
			if($.cookie("SVert") != null && $.cookie("SVert") != undefined && $.cookie("SVert")!= ""){
s.prop33 = $.cookie("SVert");
			}
			s.prop49='Zero';
			s.eVar49='Zero';
	setProp11(x);
		}

function setKeywordDirectVars(x) {
	/*var pageType = "Keyword Redirect";
	s.pageName = pageType;
	s.channel = "Search Results";*/
	s.events = s.events+",event25";
	/*s.prop1 = pageType;
	s.prop2 = pageType;
	s.prop27 = pageType;
	s.prop28 = pageType;
	s.prop3 = pageType;*/
	if($.cookie("SVert") != null && $.cookie("SVert") != undefined && $.cookie("SVert")!= ""){
s.prop33 = $.cookie("SVert");
			}
	/*s.prop49='Keyword Redirect';
	s.eVar49='Keyword Redirect';
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer))
	s.eVar40="Search";
	setProp11(x);*/
}

function setSearchVars(x) {
			var pageType = x.summary;
			s.pageName = pageType;
			s.channel = pageType;
	s.events = "event25";
			s.prop1 = pageType;
			s.prop2 = pageType;
		if(omKywrd !== undefined && omKywrd !== ''){
			s.eVar4=omKywrd;
			s.eVar4=unescape(s.eVar4.replace(/\+/g," ")); // ECOM-270017
		}
		if(x.vrt != '' && x.cat!='' && x.subcat!= ''){
			s.prop27 = 'Search Results > Subcategory';
			s.prop28 = x.vrt + ' > Search Results';
		}
		else if(x.vrt != '' && x.cat!='' ){
			s.prop27 = 'Search Results > Cateogry';
			s.prop28 = x.vrt + ' > Search Results';
		}
		else if(x.vrt != ''){
			s.prop27 = 'Search Results > Vertical';
			s.prop28 = x.vrt + ' > Search Results';
		}
		else{
			s.prop27 = 'Search Results';
			s.prop28 = 'Search Results';
		}
			s.prop3 = pageType;
			if($.cookie("SVert") != null && $.cookie("SVert") != undefined && $.cookie("SVert")!= ""){
s.prop33 = $.cookie("SVert");
			}
			s.prop49=x.productCount;
			s.eVar49=x.productCount;
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
	s.eVar40="Search";
	}
	if(gup('sortOption') == 'RATING_HIGH_TO_LOW') {s.eVar40 = 'Top Rated';}
	//Change for ECOM-232005
	if(gup('yikes_prod') !== ''){ s.eVar40 = 'Product-Error-Search';}
	setProp11(x);
	}

function setNBVars(x) {
	var url = window.location.href;
	var pageType;
	if(x.vrt != null && x.vrt.length > 0)
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

	s.eVar12 = 'D=pageName'; // Setting it as D=pageName as per ECOM-91571
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
	if(x.vrt.toLowerCase() == 'myrecs') {
		s.eVar40 = 'Recommendations';
	} else if(x.vrt.toLowerCase() == 'catalogs') {
		s.eVar40 = 'Catalog';
	} else if(x.vrt.toLowerCase() == 'kitchenadvisor') {
		s.eVar40 = 'Kitchen Advisor';
	} else if(x.vrt.toLowerCase() == 'laundryadvisor') {
		s.eVar40 = 'Laundry Advisor';
	} else if(x.vrt.toLowerCase().indexOf('shop by room') > -1) {
		s.eVar40 = 'Shop By Room';
		}
}
		}

function setProp11(x) {
	if (x.kywrd != null && x.kywrd.length > 0) {
		if(x.sid == null || x.sid.length == 0) {
    		s.prop11=x.kywrd.toLowerCase();
    			s.prop11=unescape(s.prop11.replace(/\+/g," ")); // ECOM-270017
    	}
	}
}

function setProp3(x) {
	if(gup('sbv')!= '') {
		s.prop3=gup('sbv');
	} else {
		s.prop3 = x.vrt;
	}
}

function setVisitorVars() {
	populateUNameUVal();
	//commenting for ECOM-124908
	//if(omVisitorId != null && omVisitorId.length > 0 && omVisitorId.toLowerCase() != 'anonymous') {
	//	s.prop9 = omVisitorId;
	//	s.eVar1 = omVisitorId;
	//}
	if(typeof UValue != undefined && UValue != '-1002'){
	                        s.prop9 = UValue;
	                        s.eVar1 = UValue;
	} else {
		s.prop9 = '1234567';
		s.eVar1 = '1234567';
}
}

function setUserProfieVars() {
try{
		if($.cookie("ra_id")!==null)
var rausrval=$.cookie('ra_id').split('|')[1];
	// Setting eVar30 with these values shipvantage|craftsmanclub|associateid|SYWR
		var hfSYWRStatus = $("#hfSYWRStatus").val(); // SYWMax Landing page flow
		if(hfSYWRStatus != "" && typeof hfSYWRStatus !='undefined' && hfSYWRStatus != "N"){
			s.eVar30 = "SYWR";
		}
		else if($.cookie("WC_USERACTIVITY_-1002")!==null)
		{
			s.eVar30 = "Anonymous";
		}
		else if($.cookie("s_r")!==null){
			if( $.cookie('ra_id')!==null && rausrval !='G'){
		s.eVar30 = getMemberStatus();
			}
			else if($.cookie("WC_USERACTIVITY_-1002")==null || rausrval ==='G'){
				s.eVar30 = "Anonymous";
			}
		}

	// Setting eVar45 with these values Anonymous|Registered|Partial
	if(($.cookie("s_r")!==null && $.cookie("s_r")==='s_r' && typeof UName !== undefined && UName === 'Guest' && rausrval ==='G') || ($.cookie("s_r")!==null && $.cookie("s_r")==='s_r' && typeof UName !== undefined && UName === 'Guest' && $.cookie("ra_id")===null))
	{
		s.eVar45 = 'Anonymous';
}
	else if($.cookie("s_r")!==null && $.cookie("s_r")==='s_r_Y' && typeof UName !== undefined && UName !== 'Guest'){
		s.eVar45 = 'Registered';
	}
	else if($.cookie("s_r")!==null && $.cookie("s_r")==='s_r_Y'){
			s.eVar45 = 'Registered';
	}
		else if(rausrval ==='R'){
		s.eVar45 = 'Partial';
	}
	/*if(omGeoZipcode != null && omGeoZipcode.length > 0)
		s.eVar17 = omGeoZipcode;*/
			if($.cookie("zipCode10151")!=null && $.cookie("zipCode10151") != undefined && $.cookie("zipCode10151")!= "")
	{
				s.eVar17 = $.cookie("zipCode10151");
	}
				else
	{
		s.eVar17 = "Not Provided";
	}
	var sywmaxMemberJson=$.cookie('SVPersonalizationCookie');

	if(typeof sywmaxMemberJson!='undefined' && sywmaxMemberJson!=null)
	{
		sywmaxMemberJsonObject=eval('(' + sywmaxMemberJson + ')');
		var sywrNumfromJSON=sywmaxMemberJsonObject.encryptedSYWR;
		if(sywrNumfromJSON != "" && sywrNumfromJSON != null){

			s.eVar28=sywrNumfromJSON;

		}
	}

}catch(e){}
}

function getMemberStatus(){
	var raIdCookie = "";
	var raCookie = "";
	var memberStatus = 'Anonymous';
	var craftsmanClubMember = "";
	var isAssociate = "";
	var sywrMember = "";
	var shipVantageMember = "";

	if($.cookie("ra_id")!=null)
	{
		raIdCookie = $.cookie("ra_id");
		raCookie = raIdCookie.split("|");
		isAssociate = raCookie[5];
		craftsmanClubMember = raCookie[6];
		shipVantageMember = raCookie[7];
		sywrMember  = raCookie[8];
	}

	if(sywrMember == "Y")
		memberStatus = 'SYWR';
	if(craftsmanClubMember == "Y")
		memberStatus = 'craftsmanclub';
	if(shipVantageMember == "Y")
		memberStatus = 'shipvantage';
	if(isAssociate == "Y")
		memberStatus = 'associateid';
	if((sywrMember == "Y")&&(craftsmanClubMember == "Y"))
		memberStatus = 'craftsmanclub|SYWR';
	if((shipVantageMember == 'Y')&&(sywrMember == "Y"))
		memberStatus = 'shipvantage|SYWR';
	if((shipVantageMember == 'Y')&&(craftsmanClubMember == "Y"))
		memberStatus = 'shipvantage|craftsmanclub';
	if((isAssociate == "Y")&& (sywrMember == "Y"))
		memberStatus = 'associateid|SYWR';
	if((shipVantageMember == 'Y')&& (isAssociate == "Y"))
		memberStatus = 'shipvantage|associateid';
	if((craftsmanClubMember == "Y") && (isAssociate == "Y"))
		memberStatus = 'craftsmanclub|associateid';
	if((shipVantageMember == 'Y')&&(craftsmanClubMember == "Y")
			&&(isAssociate == 'Y'))
		memberStatus = 'shipvantage|craftsmanclub|associateid';
	if((shipVantageMember == 'Y')&&(craftsmanClubMember == "Y")
			&&(sywrMember == "Y"))
		memberStatus = 'shipvantage|craftsmanclub|SYWR';
	if((shipVantageMember == 'Y')&&(isAssociate == "Y")
			&&(sywrMember == "Y"))
		memberStatus = 'shipvantage|associateid|SYWR';
	if((craftsmanClubMember == "Y")&&(isAssociate == "Y")
			&&(sywrMember == "Y"))
		memberStatus = 'craftsmanclub|associateid|SYWR';
	if((shipVantageMember == 'Y') && (craftsmanClubMember == "Y") && (isAssociate == "Y")
			&&(sywrMember == "Y"))
		memberStatus = 'shipvantage|craftsmanclub|associateid|SYWR';
	if(!(shipVantageMember == 'Y')&&!(craftsmanClubMember == "Y")&&!(isAssociate == "Y")
			&&!(sywrMember == "Y"))
		memberStatus = 'NA';
	return memberStatus;
}

function setGRGTPageVars(x) {
	s.pageName=omPageName;
	s.channel=channel;
	s.prop1=omPageName;
	s.prop2=omPageName;
	s.prop3=omPageName;
	s.prop27=omPageName;
	s.prop28=omPageName;
	s.prop9=omVisitorId;
	s.eVar1=omVisitorId;
	s.eVar30=omProfileStatus;
	s.eVar40=productFindingmethod;
	s.eVar45=omUserType;
}

function setShopByBrandPageVars(x){
if(x.vrt != '' && x.cat!='' && x.subcat!= ''){
s.pageName = 'Shop by Brand > '+x.sbv+' > '+x.subcat;
		s.channel = x.vrt;
		s.prop1 = x.vrt+' > '+x.cat;
		s.prop2 = x.vrt+' > '+x.cat+' > '+x.subcat;
		s.prop3 = x.sbv;
		s.prop27 = 'Shop by Brand > Subcategory';
		s.prop28 = x.vrt+' > Shop by Brand > Subcategory';
	}
	else
	if(x.vrt != '' && x.cat!='' ){
	s.pageName = 'Shop by Brand > '+x.sbv+' > '+x.cat;
			s.channel = x.vrt;
			s.prop1 = x.vrt+' > '+x.cat;
			s.prop2 = x.vrt+' > '+x.cat;
			s.prop3 = x.sbv;
			s.prop27 = 'Shop by Brand > Category';
			s.prop28 = x.vrt+' > Shop by Brand > Category';
	}
	else
		if(x.vrt != ''){
		s.pageName = 'Shop by Brand > '+x.sbv+' > '+x.vrt;
		s.channel = x.vrt;
		s.prop1 = x.vrt;
		s.prop2 = x.vrt;
		s.prop3 = x.sbv;
		s.prop27 = 'Shop by Brand > Vertical';
		s.prop28 = x.vrt+' > Shop by Brand > Vertical';
	}


/*if(x.vrt != '' && $.cookie("fromcat") != 'true'){
		s.pageName = 'Shop by Brand > '+x.sbv+' > '+x.vrt;
		s.channel = x.vrt;
		s.prop1 = x.vrt;
		s.prop2 = x.vrt;
		s.prop3 = x.sbv;
		s.prop27 = 'Shop by Brand > Vertical';
		s.prop28 = x.vrt+' > Shop by Brand > Vertical';
	}
else if(x.vrt != '' && $.cookie("fromcat") == 'true' && $.cookie("categoryName") != ''){
		s.pageName = 'Shop by Brand > '+x.sbv+' > '+$.cookie("categoryName");
		s.channel = x.vrt;
		s.prop1 = x.vrt+' > '+$.cookie("categoryName");
		s.prop2 = x.vrt+' > '+$.cookie("categoryName");
		s.prop3 = x.sbv;
		s.prop27 = 'Shop by Brand > Category';
		s.prop28 = x.vrt+' > Shop by Brand > Category';
		$.cookie("fromcat",null,{path:'/'});
		$.cookie("categoryName",null,{path:'/'});
	} */
	if(document.referrer === 'undefined' || document.referrer === "" || !validateBrandReferrer(document.referrer)){
		s.eVar40='Search';
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
		if(bodyName != "" && bodyName.toLowerCase() == "home") {
			omVrt = HOME_PAGE;
			omPageName = HOME_PAGE;
		}
		else if(bodyName != "" && bodyName == "dyn_NB")
		{
			if(omPrefix.toLowerCase() == "undefined")
			{
				omPrefix = NB;
			}
		}
		else {
			if(omVrt == "") {
				try	{
					if(typeof verticalName != 'undefined' && verticalName != "") {
						omVrt = verticalName;
					}
				}catch(e){}
				try{
					if(typeof verticalOmniName != 'undefined' && verticalOmniName != ""){
						omVrt = verticalOmniName;
					}
				}catch(e){}
			}

			if(omCat == "")	{
				if(typeof categoryName != 'undefined' && categoryName != "") {
					omCat = categoryName;
				}
			}

			if(omSubCat == ""){
				if(typeof subcategoryName != 'undefined' && subcategoryName != ""){
					omSubCat = subcategoryName;
				}
			}
		}
	}catch(e){}

	shc.pageName=omPageName;
        if(omVrt !='undefined'){
	shc.vrt=omVrt;
	}

	if(omCat != "undefined"){
	shc.cat=omCat;
	}
	if(omSubCat != 'undefined'){
	shc.subcat=omSubCat;
	}
	if(omSbf != 'undefined'){
	shc.sbf=omSbf;
	}
	if(omSbv != 'undefined'){
	shc.sbv=omSbv;
	}
	if(omPid != 'undefined'){
	shc.pid=omPid;
	}

	if(omPrefix != 'undefined'){
	shc.summary = omPrefix;
	}
	if(channel != 'undefined'){
		shc.channel = channel;
	}
	shc.GTfilter=s.getQueryParam('GTfilter');

	if (typeof omSprop28 != 'undefined') shc.sprop28 = omSprop28;
	if (typeof pareview != 'undefined' && pareview.length>0) shc.shcPareview=pareview;
	if (typeof omMvm != 'undefined') shc.mvm=omMvm;
    if (typeof omV37 != 'undefined') shc.paV37 = omV37;
	if (typeof omV30 != 'undefined') shc.paV30 = omV30;
    if (typeof omV45 != 'undefined') shc.paV45 = omV45;
    if (typeof eVar11 != 'undefined') shc.rrV11 = eVar11;
	if (typeof eVar17 != 'undefined') shc.bgV17 = eVar17;
    if(typeof GTfilter != 'undefined' && GTfilter!="" && GTfilter.length>0){
			shc.givetogetherfilter=GTfilter;
			GTfilter="";
		}

	//external event vars not always set
	if (typeof omEvt != 'undefined') {

		shc.evt=new SHCEvent();
		var e=shc.evt;
		e.events=omEvt;

		if (typeof omPrds != 'undefined') e.products=omPrds;
		if (typeof omV22 != 'undefined') e.eVar22=omV22;
		if (typeof omV36 != 'undefined') e.eVar36=omV36;
		if (typeof omV37 != 'undefined') e.eVar37=omV37;
		if (typeof omV38 != 'undefined') e.eVar38=omV38;
		if (typeof storeId != 'undefined' && storeId != null){
			if(storeId != "10152" && storeId != "10161") {
				if (typeof omV41 != 'undefined') e.eVar41=omV41;
				if (typeof omV42 != 'undefined') e.eVar42=omV42;
				}
		}else{
			if (typeof omV41 != 'undefined') e.eVar41=omV41;
			if (typeof omV42 != 'undefined') e.eVar42=omV42;
			}
		//if (typeof omV43 != 'undefined') e.eVar43=omV43;
		if (typeof omV28 != 'undefined') e.eVar28=omV28;
		//if (typeof prodBrand != 'undefined') e.eVar43=prodBrand;
		if (typeof omV48 != 'undefined') e.eVar48=omV48;
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
	if(shc.page=='UNDEFINED' && typeof omPageName!='undefined' && omPageName.length>0){
		shc.page=omPageName;
	}
	shc.sqPid=getSQPID();
	if (typeof storeId != 'undefined' && storeId != null){
		storeId = "10151";
		var ccDecline = getCCDecline(storeId);
		var cookieName =  'FULL_AUTH_';
		cookieName+=storeId;
	}
	if(ccDecline == 'Yes'){
		shc.ccV33 = ccDecline;
		//$.cookie(cookieName,'Decline');
	}
	else if(ccDecline == 'Success'){
		shc.ccV32 = 'Yes';
		$.cookie(cookieName,'');
	}
	//end derived vars
	if(typeof productCount!='undefined'){
		shc.productCount=productCount;
	}
	if (typeof omV40 != 'undefined') {
        	    shc.findMer = omV40;
    }
    if(typeof omFilter != 'undefined' && omFilter!="" && omFilter.length>0){
		shc.filter=omFilter;
		omFilter="";
	}
	// Code inserted for tracking PAO1 billing page change
	if(typeof omV38 != 'undefined'){
		shc.paV38=omV38;
	}
	 if(typeof omCollections != 'undefined' && omCollections!="" && omCollections.length>0){
		shc.findMer=omCollections;
	 	omCollections="";
	}
     if(typeof omniCollectionCartPageName != 'undefined' && omniCollectionCartPageName!="" && omniCollectionCartPageName.length>0){
		shc.bgV17=omniCollectionCartPageName;
	 	omniCollectionCartPageName="";
	}

	/* Added for Category page redesign 09_23 Start */
	if(typeof omFilterValues != 'undefined' && omFilterValues != "" && omFilterValues.length > 0){
		shc.filterValues = omFilterValues;
		omFilterValues = "";
	}
	/* Added for Category page redesign 09_23 End */

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
		if (typeof omSPUFromPage != 'undefined') {
			if (omSPUFromPage != null && omSPUFromPage != "") {
				pfx = omSPUFromPage + ' - ' + pfx;
			}
		}

		if (typeof omSPUSeeAdditionalStore != 'undefined') {
			if (omSPUSeeAdditionalStore != null && omSPUSeeAdditionalStore != "") {
				pfx = pfx.replace("SPU Order Options", "SPU Order Options - " + omSPUSeeAdditionalStore);
			}
		}
		//Store Pickup page ends

		var noSearchResult="N";
		var tshopbyroom="";
		//Variables set on certain pages
		if (typeof omNoSearchResult != 'undefined') {
			noSearchResult=omNoSearchResult;
		}
		if (typeof t_shopbyroom_name != 'undefined') {
	    		tshopbyroom=t_shopbyroom_name;
		}
		//End variables set on certain pages
		if( typeof pfx == 'undefined'){
		pfx="";
		}

		var pfx_sub=pfx.substring(0,14);
		var sfx="";
		if (pfx_sub != 'Search Results'
			&& pfx_sub != 'Shopping Cart'
			&& pfx_sub.indexOf('Error') == -1
			&& pfx_sub != 'Product Summar'&& pfx_sub !='Special Financ' &&pfx_sub!='Special Offer'&&pfx_sub!='Rebate > Deals' &&pfx_sub!='Site Wide > De'){
			if (vt != null && vt.length > 0 && vt!= HOME_PAGE) {

				if (tshopbyroom != null && tshopbyroom != "") {
					sfx=' > '+tshopbyroom;
				} else {
					sfx=' > '+vt;
				}

		 		if (ct != null && ct.length > 0 && pfx_sub != 'Product Review'){
					sfx+=' > '+ct;
					if (sct != null && sct.length > 0) sfx+=' > '+sct;
				}
			} else {
			if (tshopbyroom != null && tshopbyroom != "") {
				sfx=' > '+tshopbyroom;
				}
			}
		}

		if (sbn != null && sbn.length > 0 && sbn == 'Brand' && pfx_sub!='Special Financ' && pfx_sub !='Special Financ'  && pfx_sub!='Special Offer' && pfx_sub!='Rebate > Deals' &&pfx_sub!='Site Wide > De'){
		      if (sbv != null && sbv.length > 0){
			sfx+=' > '+sbv;
		      }
		}

		if (pfx_sub == 'Search Results' && noSearchResult == 'Y'){
			pfx = 'No ' + pfx;
		}

	    if (pfx_sub == 'Research Cente' || pfx.substring(0,12) == 'Buying Guide') {
	       if (typeof omBGCat != 'undefined' && omBGCat != "") {
				sfx+=' > '+omBGCat;
		   }
		}
		return (pfx+sfx);
}

function getWCID(stid) {
		var namePfx='wcid_';
		if (stid != null && stid.length > 0) {
			if (stid == kenmoreStoreId || stid == craftsmanStoreId) {
				stid = searsStoreId;
			}
			namePfx+=stid;
		}
		var cks = document.cookie.split(';');
		for(var i=0;i<cks.length;i++) {
			var ck=cks[i];
			while (ck.charAt(0)==' ') ck=ck.substring(1,ck.length);
			if (ck.indexOf(namePfx) == 0) {
				if (ck.indexOf('=') != -1) {
					return ck.substring(ck.indexOf('=')+1,ck.length);
				}
			}
		}
		return null;
}

function getSQPID() {
	var t_sq, t_pid;
	t_sq=unescape(s.c_r('s_sq'));
	if (t_sq.indexOf("pid=") != -1) {
		t_sq=t_sq.substring(t_sq.indexOf("pid=")+4, t_sq.length);
		if (t_sq.indexOf('&') != -1) {
			t_pid=t_sq.substring(0,t_sq.indexOf('&'));
			return unescape(t_pid);
		}
	}
	return null;
}

function getCCDecline(stid) {
	var namePfx= 'FULL_AUTH_';
	if (stid != null && stid.length > 0) {
		namePfx+=stid;
	}
	var cks = document.cookie.split(';');
	for(var i=0;i<cks.length;i++) {
			var ck=cks[i];
			while (ck.charAt(0)==' ') ck=ck.substring(1,ck.length);
			if (ck.indexOf(namePfx) == 0) {
				if (ck.indexOf('=') != -1) {
					return ck.substring(ck.indexOf('=')+1,ck.length);
				}
			}
		}
		return null;

}

function gup(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec( window.location.href );
 if( results == null )    return "";
else    return results[1];
}
/*function to obtain UName and UValue*/
function populateUNameUVal(){
	var isUserLogin = "";
	var loginEnabled=0;
	var wcPersistentArray = [];
	var wcPersistentString = '';
try{
	/* Code to retrieve Member Id from WC_PERSISTENT cookie */
	//wcPersistentString=$.cookie("WC_PERSISTENT");
	if($.cookie("WC_PERSISTENT") != null && $.cookie("WC_PERSISTENT") != undefined && $.cookie("WC_PERSISTENT")!= ""){
		wcPersistentString=$.cookie("WC_PERSISTENT");
		wcPersistentString = unescape(wcPersistentString);

		/* To split the string if , is found in the cookie value*/
		if(wcPersistentString.indexOf(",") >= 0){
			wcPersistentString = wcPersistentString.split(",")[0];
		}

		/* For getting the index of last _ value */
		var lastIndex = wcPersistentString.lastIndexOf("_");
		/* Checking whether the lastIndexOf _ is greater then -1 */
		if(lastIndex!=undefined && lastIndex!=null && lastIndex >= 0){
			isUserLogin = wcPersistentString.substr(lastIndex+1);
		}

  	}
	/* Reading s_r cookie to identify the user's logged in status*/
	var cookieValue = $.cookie("s_r");
	cookieValue = unescape(cookieValue);
	if(cookieValue != null && cookieValue!=undefined && cookieValue== "s_r_Y") {
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
					else if(jQuery.inArray('hardline',names) >-1 )
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
				        clickType = "Header > Share > " + buttonType;
 				        s.prop12=clickType;
				        s.tl(true,'o',clickType);
				}
			}
		     }catch(e){}
}

function trackNavigation(name) {   // modified via ECOM-285190 - for Toys & Games vertical
	try {
		if (typeof s != 'undefined') {
			if (omVrt.toLowerCase().search('toy') != -1 && typeof omCat !== 'undefined' && omCat == "" && typeof omSubCat !== 'undefined' && omSubCat == "") {
				s.linkTrackVars = 'eVar9,eVar10,prop4,prop5,channel,prop1,prop2,prop3,prop12,prop27,prop28';
				s.prop4 = 'Shop by Category';
				s.prop5 = 'Shop by Category > ' + name;
				s.prop12 = 'Search Refinement'; 
				s.tl(true,'o',s.prop12);
			
			} else {
				s.linkTrackVars='prop12,prop10,channel,prop1,prop2,prop3,prop19,prop27,prop28';
				s.prop12=name;
				s.tl(true,'o',name);
			}
			
		}
	} catch (e){
	}
}


function trackToysFilter(fAttribute,fValue) { // added for ECOM-285190 - but not required, as taken care by trackNavigation() 
   try {
        if (typeof s !== 'undefined' && omVrt.toLowerCase().search('toy') != -1 ) { // for Toys vertical only

		s.linkTrackVars = 'eVar9,eVar10,prop4,prop5,channel,prop1,prop2,prop3,prop12,prop27,prop28';
		s.prop4 = fAttribute;
		s.prop5 = fAttribute + ' > ' + fValue;
		s.prop12 = 'Search Refinement'; 
		s.tl(true,'o',s.prop12);
	}
   } catch (e) {}
}


function trackBreadCrumb(bcrumb) {
	try{
		if (typeof s != 'undefined') {
		s.linkTrackVars='prop12,prop10,channel,prop1,prop2,prop3,prop19,prop27,prop28';
		s.prop12=bcrumb;
		s.tl(true,'o',s.prop12);
		}
	} catch(e){
	}
}
function trackRelatedSection(pos,section) {
	try{
		if(typeof s!= 'undefined') {
			s.linkTrackVars='channel,prop1,prop2,prop3,prop10,prop12,prop27,prop28,eVar16,eVar40';
			s.eVar16=s.prop12='R0:'+pos+':'+section+':'+omPrefix+':BloomReach';
			s.eVar40='BloomReach';
			s.tl(true,'o',s.prop12);
		}
	} catch(e){}
}
function fbtTrack(pos,env) {
	try{
		if(typeof s !== 'undefined') {
			 s.linkTrackVars="channel,prop1,prop2,prop3,prop10,prop12,prop27,prop28,eVar16,eVar40";
			 //ECOM-280020
			 s.prop12='View Snippet - FBT';
			 s.eVar16=env+'1:'+pos+':FBT:AddToCart Overlay';
			 s.eVar40=env+":FBT";
			 s.tl(true, 'o', s.prop12);
		}
	} catch(e){}
}
/*
* Omniture tracking on scroll changes
*/
if (typeof $('input[name=atc]') !== 'undefined'){
	var pageType = $('input[name=atc]').val();
	if (pageType === 'PDP:SL3'){
		pageType = 'Product Details - SL';
	}else if (pageType === 'PDP:HL3'){
		pageType = 'Product Details - HL';
	}
}

var fbtFlag=true;
var upsellFlag=true;
var seeSimilar=true;
var relatedSearch=true;
var vertSection=true;
var delvrWidget=true;
var topSeller=true;
var shopSimilarProduct=true;
var relatedProduct=true;
upsellFlagRR=true;
function isScrolledIntoView(elem) {
	try {
    		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();
		var elemTop = $(elem).offset().top;
	    	var elemBottom = elemTop + $(elem).height();
		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	} catch(e) {
	}
}

function trackFBT() {
    	if (isScrolledIntoView($("#BundlingSect")) && fbtFlag==true && typeof pageType != 'undefined'){
    		fbtFlag = false;
  		s.linkTrackVars='prop15';
    		s.prop15="R0::FBT:"+pageType+":"+fbtCall;
  		s.tl(this,"o",s.prop15);
  		$(window).unbind("scroll",trackFBT);
    	}
}
function trackUpsellTEC() {
    	if ((isScrolledIntoView($("#upsellModTable")) || isScrolledIntoView($('#lgcuinternal'))) && upsellFlag==true && typeof pageType != 'undefined'){
    		upsellFlag = false;
	  	s.linkTrackVars='prop15';
	    	s.prop15="R0::Upgrade:"+pageType+":TEC";
	  	s.tl(this,"o",s.prop15);
	  	$(window).unbind("scroll",trackUpsellTEC);
    	}
}
function trackUpsellRR() {
    	if ((isScrolledIntoView($("#stepUp")) || isScrolledIntoView($('#lgcuinternal'))) && upsellFlagRR==true && typeof pageType != 'undefined' && $('#stepUp').html() != null && $('#stepUp').html().trim().length > 0){
    		upsellFlagRR = false;
	  	s.linkTrackVars='prop15';
	    	s.prop15="R0::Upgrade:"+pageType+":RR";
	  	s.tl(this,"o",s.prop15);
	  	$(window).unbind("scroll",trackUpsellRR);
    	}
}
function trackSeeSimilar() {
    	if (isScrolledIntoView($("#comparable")) && seeSimilar==true && typeof pageType != 'undefined' && $('#comparable').html() != null && $('#comparable').html().trim().length > 0){
    		seeSimilar = false;
	  	s.linkTrackVars='prop15';
	    	s.prop15="R0::See Similar:"+pageType+":RR";
	  	s.tl(this,"o",s.prop15);
	  	$(window).unbind("scroll",trackSeeSimilar);
    	}
}

function trackRelatedSearch() {
	if (isScrolledIntoView($("#br-related-searches-widget")) && relatedSearch == true){
		relatedSearch = false;
		s.linkTrackVars='prop15';
		s.prop15="R0::Related Search:"+omPrefix+":BloomReach";
		s.tl(this,"o",s.prop15);
		$(window).unbind("scroll",trackRelatedSearch);
	}
}
function trackRelatedProducts() {
	if (isScrolledIntoView($('div.br-found-heading')) && relatedProduct == true){
		relatedProduct = false;
		s.linkTrackVars='prop15';
		s.prop15="R0::Related Products:"+omPrefix+":BloomReach";
		s.tl(this,"o",s.prop15);
		$(window).unbind("scroll",trackRelatedProducts);
	}
}
function trackVertCarousel() {
	if (isScrolledIntoView($("#br-related-searches-widget")) && vertSection == true){
		vertSection = false;
		s.linkTrackVars='prop12,prop15,eVar16,eVar40';
		s.prop15="R0::Top Picks:"+omPrefix+":DB";
		eVar40="DB:Top Picks";
		s.tl(this,"o",s.prop15);
		$(window).unbind("scroll",trackVertCarousel);
	}
}
function trackDeverWidget() {
	if (isScrolledIntoView($("#SPLAT_WIDGET_comparison-products")) && delvrWidget == true && typeof pageType != 'undefined'){
		delvrWidget = false;
		s.linkTrackVars='prop15';
		s.prop15="R0::Delver:"+pageType+":TEC";
		s.tl(this,"o",s.prop15);
		$(window).unbind("scroll",trackDeverWidget);
	}
}
function trackTopSellers() {
	if (isScrolledIntoView($("#rr_placement_0")) && topSeller == true && $('#rr_placement_0').html() != null && $('#rr_placement_0').html().trim().length > 0){
		topSeller = false;
		s.linkTrackVars='prop15';
		s.prop15="R0::Top Sellers:"+omPrefix+":RR";
		s.tl(this,"o",s.prop15);
		$(window).unbind("scroll",trackTopSellers);
	}
}
function trackShopSimilar() {
	if (isScrolledIntoView($("#shopSimilarProductsWrp")) && shopSimilarProduct == true){
		shopSimilarProduct = false;
		s.linkTrackVars='prop15';
		s.prop15="R0::Shop Similar Products:"+pageType+":TEC";
		s.tl(this,"o",s.prop15);
		$(window).unbind("scroll",trackShopSimilar);
	}
}
$(trackFBT);
$(trackUpsellTEC);
$(trackUpsellRR);
$(trackRelatedSearch);
$(trackVertCarousel);
$(trackDeverWidget);
$(trackTopSellers);
$(trackShopSimilar);
$(trackRelatedProducts);
$(trackSeeSimilar);
//Added for ECOM-264723
$(window).load(function () {
  	try{
		if(typeof FSR !== 'undefined' && typeof FSR.CPPS !== 'undefined'){
			var varParts = "";
			var varVar30 = "";
			var varVar26 = "";
			if($.cookie('s_e5') !== null){
				varParts = $.cookie('s_e5');
			}
			if($.cookie('s_e30') !== null){
				varVar30 = $.cookie('s_e30');
			}
			if($.cookie('s_e26') !== null){
				varVar26 = $.cookie('s_e26');
			}
			if(varParts !== null && varParts.length > 0){
				FSR.CPPS.set("shcPartnerSite",varParts);
			}
			if(varVar30 !== null && varVar30.length > 0){
				FSR.CPPS.set("userAffiliations",varVar30);
			}
			if(varVar26 !== null && varVar26.length > 0){
				FSR.CPPS.set("shcMPSHC",varVar26);
			}
	        }
	   	if($('#BundlingSect').length)
	   	$(window).bind("scroll",trackFBT);

		if($('#upsellModTable').length || $('#lgcuinternal').length) 
		$(window).bind("scroll",trackUpsellTEC);

	   	if($('#br-related-searches-widget').length || $('div').hasClass('br-found-heading'))
	   	$(window).bind("scroll",trackRelatedSearch);

	   	if($('#tabContainBox').length)
	   	$(window).bind("scroll",trackVertCarousel);

	   	if($('#SPLAT_WIDGET_comparison-products').length)
	   	$(window).bind("scroll",trackDeverWidget);

	   	if($('#rr_placement_0').html() != null && $('#rr_placement_0').html().trim().length > 0)
		$(window).bind("scroll",trackTopSellers);

		if($('#similiarProduct1').html() !=null && $('#similiarProduct1').html().length > 0)
		$(window).bind("scroll",trackShopSimilar);

		if($('.br-sf-widget').html() != null && $('.br-sf-widget').html().length > 0)
		$(window).bind("scroll",trackRelatedProducts);
		
		if($('#stepUp').html() != null && $('#stepUp').html().trim().length > 0)
		$(window).bind("scroll",trackUpsellRR);
				
		if($('#comparable').html() != null && $('#comparable').html().trim().length > 0)
		$(window).bind("scroll",trackSeeSimilar);

  	}catch(e){}
});
/****************** shc_code.js end here  ********************/


/****************** omniture_override.js start here  ******************/
omOverride();

function omOverride()
{
	try
	{
		var bodyName = "";

		try
		{
			bodyName = (document.getElementsByTagName('body')[0]).id;
		}
		catch(e){}

		if(bodyName != "" && bodyName=="myRegistry")
		{
			// Gift registry.
			s.eVar40 = "Gift Registry";
		}

	}
	catch(e) {}
}

/****************** omniture_override.js  end here  ******************/
