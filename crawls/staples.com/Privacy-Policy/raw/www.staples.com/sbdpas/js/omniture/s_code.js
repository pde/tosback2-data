/* SiteCatalyst code version: H.24.2
Modified 7/4/2012 */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/

if(!s_account)
	if(document.location.hostname.indexOf('staples.com')>-1)
		var s_account="staplescomprod"; //route the image request to production unless another s_account value is specified
	if(document.location.hostname.indexOf('staples.ca')>-1)
		var s_account="staplescaprodreplat"; //route the image request to production unless another s_account value is specified
			
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Conversion Config */
if(s_account.indexOf('staplesca')>-1){
	s.linkInternalFilters="javascript:,www.staples.ca,businessdepot.ca,businessdepot.com,www.bureauengros.ca,bureauengros.com,stapleslistens.ca,easy.staples.ca,simple.bureauengros.com,flyerservices.staples.ca,flyerservices2.staples.ca,"
	s.currencyCode="CAD"
	
	if(s_account=="staplescauatreplat" || s_account=="staplescadevreplat")
		s.trackExternalLinks=false
	else
		s.trackExternalLinks=true
}
else{	
	s.currencyCode="USD"
	s.linkInternalFilters="javascript:,.staples.com,weeklyad.staples.com,cache.vendaria.com,staplesrewardscenter.com,stapleseasyrebates.com,print.staples.com"
		       +"sellpoint.net,powerreviews.com,webcollage.net,shoplocal.com,weeklyad.com,staples-locator.com"	
	s.trackExternalLinks=true;
}

/* Character Set Config */
s.charSet="iso-8859-1"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"
/* Plugin Config */
s.usePlugins=true
/* Search Term De-Duplication Config */
s.successfulSearchEvent 		= 'event1';
s.nullSearchEvent 				= 'event2';
s.searchTermVariable		    = 'eVar1';
/* DynamicObjectIDs config */
function s_getObjectID(o) {
	var ID=o.href;
	return ID;
}
s.getObjectID=s_getObjectID;

/* Channel Manager Config */
s._channelDomain='Social Media Organic|facebook.com,flickr.com,twitter.com,youtube.com,myspace.com,blogspot.com,t.co>';
s._channelPattern="Email|EM>Affiliates|AFF>Banner|BNR>Banner|BAN>Broadband|BRD>Social Media|SM>Comparison Shopping|CSE>Display Advertising|DA>Paid Search|PS";

function s_doPlugins(s) {
	/* Instantiate s.events */
	s.events=s.events?s.events:"";
	
	/* Kenshoo - k_clickid update */
	var s_kenId=s.getQueryParam('k_clickid');
	var s_cid=s.getQueryParam('cid');
	if (s_kenId)
		s.eVar50=s.getQueryParam('k_clickid');
	else if (s_cid)
		s.eVar50="tracking code with no k_clickid";
		
	/* Rearrange query string parameters */
	//prioritize cid
	s.pageURL=s.manageQueryParam('cid',1,1);
	//then prioritize om_rid 
	s.pageURL=s.manageQueryParam('om_rid',1,0);
	
	/* Call channel manager and set campaign IDs*/
	var s_omtrCmp=s.getQueryParam('cid')
	var s_coreCmp=s.getQueryParam('cm_mmc')
	if(!s_omtrCmp && s_coreCmp){
		s.campaign=s.getQueryParam('cm_mmc');
		s.channelManager('cm_mmc','','c_m','0','','1');
	}
	else{
		s.campaign=s.getQueryParam('cid');
		s.channelManager('cid','','c_m','0','','1');
	}
	
		//read cid from weekly ad cookie
		if(s.c_r('cid_weeklyad'))
		{
		 s.campaign=(s.c_r('cid_weeklyad'));
		 s.c_w('cid_weeklyad','');
		}
	
	//clean up campaign strings
	s.campaign=s.repl(s.campaign,'%25','%');
	s.campaign=s.repl(s.campaign,'%3A',':');
	s.campaign=s.repl(s.campaign,'%3a',':');
		
	if(s._channel == "Direct Load"){
		//suppress channel manager for direct page loads
		s._campaign=s._channel=s._referrer=s._keywords=s._partner=s._referringDomain="";
	}
	if(!s._referrer && s._channel)
		s._channel = s._channel + ': No Referrer';
	if (s._channel == 'Referrers'){
		//create campaign ID for unpaid referrers from referring domain
		s._referringDomain = s.split(s._referringDomain,'/');
		s._campaign = 'referrer:'+ s._referringDomain[0];
		//set natural referring domain
		s.eVar5=s._referringDomain[0];		
	}
	if(s._channel=='Natural Search'){
		//create campaign ID for natural search campaigns
		s._campaign='seo:' + s._partner;
		//set natural keyword
		s.eVar24=s._keywords;
		//overwrite paid keyword
		s.eVar25='Other';
		//set natural search landing page
		s.prop17=s.eVar6=s.pageName;
	}
	if(s._channel=='Paid Search'){
		//overwrite natural keyword
		s.eVar24='Other';
		//set paid keyword
		s.eVar25=s._keywords;
		//overwrite natural search landing page
		s.eVar6='Paid Search Campaign';
	}
	if(s._channel=='Social Media Organic'){
		//overwrite natural keyword
		s._campaign='smo:'+s._campaign;
	}
	if(s._campaign && !s._partner){
		//overwrite keywords, partner and nat search landing page for non-search campaigns
		s.eVar24='Other';
		s.eVar25='Other';
	}

	s.eVar20='';	
	if(s._campaign  && typeof s._campaign != 'undefined'){
		//apply the channel manager generated campaign values to s.campaign if it is not present
		if(!s.campaign)
			s.campaign=s.eVar20=s._campaign;	
		//make sure campaign and eVar20 are set to the same value
		s.eVar20=s.campaign&&!s.eVar20?s.campaign:s.eVar20;
		s.campaign=s.eVar20&&!s.campaign?s.eVar20:s.campaign;				
		//set campaign pathing
		s.prop12=s.campaign + ': '+s.pageName;
		//clean up campaign strings
		s.campaign=s.repl(s.campaign,'%25','%');
		s.campaign=s.repl(s.campaign,'%3A',':');
		s.campaign=s.repl(s.campaign,'%3a',':');
		s.campaign=s.repl(s.campaign,'%24','$');
		//copy campaign to a prop
		s.prop30=s.campaign;
	}
	else{
		//fill in pathing if campaign is not present
		s.prop12=s.pageName;
	}
	if(s.campaign){
		//make sure campaign and eVar20 are set to the same value
		//clean up campaign strings
		s.campaign=s.repl(s.campaign,'%25','%');
		s.campaign=s.repl(s.campaign,'%3A',':');
		s.campaign=s.repl(s.campaign,'%3a',':');
		s.campaign=s.repl(s.campaign,'%24','$');
		s.eVar20=s.campaign&&!s.eVar20?s.campaign:s.eVar20;
		s.campaign=s.eVar20&&!s.campaign?s.eVar20:s.campaign;	
	}
	if(s._channel && typeof s._channel !='undefined'){
		// set channel eVars
		s.eVar22=s.eVar21=s._channel;		
	}
	//channel setting fallback
	if(!s.eVar21&&s.campaign){
		s.eVar21=s.eVar22=s.campaign.substring(0,2).toLowerCase()=='em'?'Email':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,2).toLowerCase()=='ps'?'Paid Search':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='seo'?'Natural Search':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,8).toLowerCase()=='referrer'?'Referrers':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='cse'?'Comparison Shopping':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='aff'?'Affiliates':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='bnr'?'Banner':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='ban'?'Banner':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='brd'?'Broadband':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,2).toLowerCase()=='sm'?'Social Media':s.eVar21;
		s.eVar21=s.eVar22=s.campaign.substring(0,2).toLowerCase()=='da'?'Display Advertising':s.eVar21;
		if(!s.eVar21&&s.campaign)
		s.eVar21=s.eVar22='Paid Non-Search';
	}
	
	var campaign =s.getValOnce(s.campaign,"s_campaign",0);
	
	// stack channel touches across visits
	if(s.eVar21)
		s.eVar23=s.crossVisitParticipation(s.eVar21,'cvp_cha','60','5','>','purchase');
	/* Set bounce rate analysis events */
    s.clickPast(s.campaign,'event37','event38');
	
    /* Collect and set the recipient ID */
	var s_recipient=s.getQueryParam('om_rid')
	var s_coreRecipient=s.getQueryParam('cm_lm')
	if(s_recipient){
		s.eVar32=s_recipient;
		s.eVar33=s.campaign;
	}
	if(!s_recipient && s_coreRecipient){
		s.eVar32=s_coreRecipient;
		s.eVar33=s.campaign;
	}
    /* Collect internal campaign parameter */	
	if(s.getQueryParam('ICID'))
		s.eVar4=s.getQueryParam('ICID');
	if(s.getQueryParam('cm_sp'))
		s.eVar4=s.getQueryParam('cm_sp'); 

	/* Store the previous page name */
	var prevPage=s.getPreviousValue(s.pageName,'gpv_pn','');
	
	/* Set the previous page to prop 26 */
	if(prevPage)
		s.prop26=prevPage;
	
	/* TNT Integration */

	s.tnt=s.trackTNT();
	
	/* 
	 * For redirected searches: collect and set the search term and successful search 
	 * event and specify 'Redirected Search' for the number of search results and search page
	 */
	var searchTerm=s.getQueryParam('cmSearchKeyword')
	if(searchTerm){
		s.eVar1=s.prop1=searchTerm;
		if(s.events){
			s.events=s.events+',event1';
		}
		else{
			s.events='event1';
		}
		s.prop17=s.eVar19=s.prop2=s.prop50='Redirected Search';
		if(!s.eVar3)
			s.eVar3='Search';
	}
	
	/* Force search term to lower case and set original search page */
	if(s.eVar1){
		s.eVar1=s.prop1=s.eVar1.toLowerCase();
		s.prop17=prevPage;
		s.eVar1=s.prop1=s.repl(s.eVar1,'+',' ');
	}
	
	/* Do not refire search event if the same search term passed in twice */
	var t_search=s.getValOnce(s.eVar1,'ev1',0)
	if(t_search=='')
	{	
		var a=s.split(s.events,',');
		var e='';
		for(var i = 0; i < a.length ; i++ )
		{
			if(a[i]=='event1'||a[i]=='event2')
				continue;
			else
				e += a[i]?a[i]+',':a[i];
		}
		s.events=e.substring(0,e.length-1);
	}
	//create productnum product for search term merchandising eVar binding
	else if(!s.products)
	{
		if(!s.c_r('productnum'))
			s.productNum=1;
		else
			s.productNum=parseInt(s.c_r('productnum'))+1;
		s.products=';productsearch' + s.productNum;
		var e=new Date();
		e.setTime(e.getTime()+(30*86400000));
		s.c_w('productnum',s.productNum,e);
	}
	if(s.c_r('productnum')&&s.events.indexOf('purchase')>-1)
		s.c_w('productnum','0',0);
        
        //Visit Site Search. Setting event73 if the user visited event 1 (successful search) or event 2 (unsuccessful search). 
        //Event 73 is searialized to be recorded only once per visit.
	if(s.events && ((s.events+',').indexOf('event1,')>-1 || (s.events+',').indexOf('event2,')>-1))
		s.events=s.apl(s.events,'event73',',',2);
		
	/* Setting PFM (eVar3) to Online Flyer when referrer is flyerservices page*/    	
	if(document.referrer.indexOf("flyerservices") > -1){ 		
    		s.eVar3="Weekly Ad";
    		s.eVar17="Weekly Ad:No Sub-Finding Method Specified";
    	}
		
    /* 
	 * Product finding method automation.  Sets product finding method for internal 
	 * campaigns, external campaigns, easy reorder and weekly ads and collects the
	 * pfm parameter if available
	 */
	if(s.eVar4 && typeof s.eVar4 != 'undefined' && !s.eVar3)
	   	s.eVar3="Internal Campaigns" //set product finding method for internal campaigns
	if(s.eVar4 && s.eVar4!='Non-Internal Campaign' && typeof s.eVar4 != 'undefined' && s.eVar3 == 'Browse')
	   	s.eVar3="Internal Campaigns" //set product finding method for internal campaigns
    	if(campaign && typeof campaign != 'undefined') { // campaign is used instead of s.campaign because of the following case: land on a page with external campaign, click on quick view or add to cart from recommendations. The 2nd image request will still have PFM and PSFM as "External Campaigns" which is not desired by staples
    		if(s.linkName){} //this condition is used not to overwrite the PFM or SPFM that are set on the tl call
    		else {    			
	    		s.eVar3='External Campaigns'; //set product finding method for external campaigns
	    		s.eVar17='External Campaigns:No Sub-Finding Method Specified';
	    	}
	}
	var s_cmArea=s.getQueryParam('cmArea'); //look for the cmArea parameter
	if(s_cmArea == 'RIGHTRAIL+EZRO')
		s.eVar3="Easy Reorder"; //if cmArea is 'RIGHTRAIL+EZRO' set easy reorder product finding method
	var s_pfm=s.getQueryParam('pfm'); //look for the product finding method parameter
	if(s_pfm && s_pfm != 'undefined'){
		s.eVar3=s_pfm;
		if(s_pfm == 'Weekly_Ad'){
			s.eVar37='Weekly Ad'; //set product finding method and weekly ad flag
		}
	}
    /* Quick Fix to set Product Finding Variables based on Staples Weekly Ad Domain */
	if(document.referrer.indexOf('weeklyad.staples.com') > -1 && (!s.eVar3 || s.eVar3.toLowerCase()=='browse')){
	  	s.eVar3='Weekly Ad';
	  	s.eVar17='Weekly Ad:No Sub-Finding Method Specified';
	   	s.eVar37=s.eVar3;
	}	
		
	/* assigning SPFM on the Search results page when coming from 3rd party site search */
	if(document.referrer && document.location.href)
	{	
		if(document.location.href.indexOf('StaplesSearch?')>-1 && (document.location.hostname!= document.referrer.split('/')[2] || document.referrer=='http://www.staples.com/sbd/content/inc/partner_header607.html') && s.eVar3=='Search')
			s.eVar17='Search:Basic Search';
	}
	
	/* 
	 * Product finding method-dependent automation.  Sets non-browse,non-search and 
	 * non-internal camapign values when the corresponding finding method is not set
	 */
	if(s.eVar3 && typeof s.eVar3 != 'undefined'){
		//Overwrite merchandising categories when the finding method is not browse
		if(s.eVar3 != 'Browse')
	    	s.eVar14=s.eVar15='Non-Browse'; 
	    //Overwrite search keyword when the finding method is not search and no keyword is present
	    if(s.eVar3 != 'Search' && !s.eVar1)
	    	s.eVar1='Non-Search'; 
	    //Overwrite internal campaign when the finding method is not internal campaigns and no internal campaign is present
	    if(s.eVar3 != 'Internal Campaigns' && !s.eVar4)
	    	s.eVar4='Non-Internal Campaign'; 
	}
		
	/* for browse pages, if eVar17 is not set. Set eVar17 as Browse:<prop3> instead of the default no SPFM */
	if(s.eVar3 == 'Browse' && !s.eVar17 && s.prop3)
	{
		s.linkTrackVars=s.apl(s.linkTrackVars,'eVar17',',',2);
		s.eVar17=s.eVar3+':'+s.prop3;
	}
	
	if(document.referrer.indexOf("basketbuilder.staples.com/basketDetail.aspx")!=-1&&s.events.indexOf("scAdd")!=-1){
	    s.eVar3="Basketbuilder";
	    s.eVar17="Basketbuilder:Main";
	}
	if(document.referrer.indexOf("basketbuilder.staples.com/candyaisle")!=-1&&s.events.indexOf("scAdd")!=-1){
	    s.eVar3="Basketbuilder";
	    s.eVar17="Basketbuilder:Candy Aisle";
	}
	if(document.referrer.indexOf("basketbuilder.staples.com/modalAlert")!=-1&&s.events.indexOf("scAdd")!=-1){
	    s.eVar3="Basketbuilder";
	    s.eVar17="Basketbuilder:Intercept";
	}
	
	/* removing any and all "ATC Overlay" PFM references so the previous value gets the credit */
	if(s.eVar3=='ATC Overlay')
		s.eVar3=s.eVar17='';
	
	if(s.eVar3=='Up-Sell' || s.eVar3=='Cross-Sell')
		s.eVar17='';

	/* Quick fix to set sub-finding method when the finding method is specified without one */
	if(s.eVar3 && s.eVar3!='Search' && !s.eVar17){
		s.linkTrackVars=s.apl(s.linkTrackVars,'eVar17',',',2);
		s.eVar17=s.eVar3+':No Sub-Finding Method Specified';
	}	
	
    /* Copy the purchase ID to an eVar */
    if(s.purchaseID)
    	s.eVar7=s.purchaseID;
    	
    /* Set up Dynamic Object IDs */
	s.setupDynamicObjectIDs();
	
	/* Record page URL in a custom prop */
	var s_thisPage=location.href;
		s.prop21=s_thisPage.substr(0,99);

	/* Collect the customer ID if not already set */
	if(!s.eVar18)
		s.eVar18=s.c_r('DirectCustomerNumber');
		
	/* Set an event on every page */
	if(s.events && typeof s.events != 'undefined'){
		if(!(s.events.match("event4"))){
			s.events=s.events + ",event4";
		}
	}
	else{
		s.events="event4";
	}
	
	/* Prefix Weekly Ad pagenames with "wklyad" and set a prop for segmentation of Weekly Ad visits. Setting PFM (eVar3) to Weekly Ad  when on the Weekly Ad page*/	
	if(s_thisPage.indexOf("weeklyad") > -1 || s_thisPage.indexOf("shoplocal") > -1 || s_thisPage.indexOf("crossmediaservices") > -1 || s_thisPage.indexOf("localhost") > -1){
		if(!s.pageName) s.pageName="wklyad:LandingPage";
		if(!s.channel)s.channel="wklyad:LandingPage";
		if(!s.prop3)s.prop3="wklyad:LandingPage";
		if(!s.prop12)s.prop12="wklyad:LandingPage";
		s.prop29=s.eVar44="Weekly Ad";
		if(!s.eVar3){
			s.eVar3="Weekly Ad";
			s.eVar17='Weekly Ad:No Sub-Finding Method Specified';
		}
	}	
	else{
		s.prop29=s.eVar44="Staples.com"
	}
	/* Copy the CheetahMail browse hierarchy codes to a prop */
	if(s.eVar38)
		s.prop31=s.eVar38;
		
	/* Read the Staples User cookie into the recipient ID eVar */
	var userCookie=s.c_r('StaplesUser');
	if(!s.eVar32 && userCookie){
		//ensure userCookie contains an email address
		if(userCookie.indexOf('@') > -1 || userCookie.indexOf('%40') > -1){
		//clean up cookie values
			userCookie=s.repl(userCookie,'%2E','.');
			userCookie=s.repl(userCookie,'%40','@');
			userCookie=s.repl(userCookie,'%5F','_');
			userCookie=s.repl(userCookie,'%2D','-');
			userCookie=s.repl(userCookie,'%21','!');
			userCookie=s.repl(userCookie,'%26','&');
			userCookie=s.repl(userCookie,"%27","'");
			userCookie=s.repl(userCookie,'%3A',':');
			userCookie=s.repl(userCookie,'%3B',';');
			userCookie=s.repl(userCookie,'%2B','+');
			userCookie=s.repl(userCookie,'%3D','=');
			userCookie=s.repl(userCookie,'%3F','?');
			s.eVar32=userCookie;
		}
	}
	/* Read the StaplesUserInfo cookie into the Rewards Tier (2nd Source) eVar */
	var userInfoCookie=s.c_r('StaplesUserInfo');
	if(userInfoCookie){
		//clean up cookie values
		userInfoCookie = s.repl(userInfoCookie,"%22","");
		userInfoCookie = s.repl(userInfoCookie,"}","");
		userInfoCookie = s.repl(userInfoCookie,'"','');
		userInfoCookie = s.repl(userInfoCookie,'%3A',':');
		//extract tier from remaining user info
		var rewardsTier = s.split(userInfoCookie,'tier:');
		rewardsTier = s.split(rewardsTier[1],",");
		s.eVar46=rewardsTier[0];
	}
	/* Persist the rewards tier in an Adobe cookie */
	s.eVar46=s.getAndPersistValue(s.eVar46,'s_v46_persist',730);
	
	/* Read and clean up the s_vi cookie and populate to eVar47 */
	var s_visIdCookie=s.c_r('s_vi');
	var visRegExp=/[0-9A-F]+-[0-9A-F]+/g;
	var s_visId=s_visIdCookie.match(visRegExp);
	if(s_visId){
		s.eVar47=s_visId;
		s_dfaCall();
	}
	else{
		setTimeout("s_dfaCall()", 1500);
	}
	/* Persist the visitor ID in an Adobe cookie */
	s.eVar47=s.getAndPersistValue(s.eVar47,'s_v47_persist',730);
	
	/* Collect the Test & Target PCID into eVar42 */
	if(window.mboxFactoryDefault && typeof mboxFactoryDefault.getPCId == "function")
		s.eVar42 = mboxFactoryDefault.getPCId().getId();
	
	/* Setting prop38 to the same value as PFM (evar3) to get PFM traffic reports*/
	if(s.eVar3 && !s.prop38)
		s.prop38 = s.eVar3;
		
	/* Setting prop38 to the same value as link click PFM (evar3) to get PFM traffic reports*/
	if(s.linkTrackVars && (s.linkTrackVars+',').indexOf('eVar3,')>-1)
	{
		s.linkTrackVars=s.apl(s.linkTrackVars,'prop38',',',2);
		s.prop38=s.eVar3;
	}
	
	if(s.getQueryParam('fromCartridge').toLowerCase()=='y' && s.eVar3=='Search')
		s.eVar17='Search:InkCart';
	
	/* T&T offline demographic info - read customerTier and CustomerSegment cookies, set eVar55,eVar56,eVar57,eVar58  */
	var tierCookie=s.c_r('customerTier');
	if(tierCookie){    
		//clean up cookie values
		tierCookie = s.repl(tierCookie,"%22","");
		tierCookie = s.repl(tierCookie,"}","");
		tierCookie = s.repl(tierCookie,'"','');
		tierCookie = s.repl(tierCookie,'%3A',':');
			
		var cbp = s.split(tierCookie,'cbp:');
		cbp = s.split(cbp[1],",");
		if(cbp[0]==""){
			cbp[0]="None";
			}
			s.eVar55="cbp="+cbp[0];
		}	
	else {  //tierCookie does not exist set value to None
		s.eVar55="cbp=None";
		}	
	var segmentCookie=s.c_r('CustomerSegment');
	if(segmentCookie){
		//clean up cookie values
		segmentCookie = s.repl(segmentCookie,"%22",""); 
		segmentCookie = s.repl(segmentCookie,"}","");
		segmentCookie = s.repl(segmentCookie,'"','');
		segmentCookie = s.repl(segmentCookie,'%3A',':');
		
		var leapData = s.split(segmentCookie,'LEAP:');
		leapData = s.split(leapData[1],","); //setting variable with leap cookie value if it exists
		if (leapData[0]){
			s.eVar55=s.eVar55+",business=Leap No Data,emprange=Leap No Data";
			s.eVar56="Leap No Data";
			s.eVar57="Leap No Data";
			s.eVar58="Leap No Data"
			}
		else{	
			var business = s.split(segmentCookie,'business:');
			business = s.split(business[1],",");
			if(business[0]==""){
				business[0]="None";
				}
			s.eVar55=s.eVar55+",business="+business[0];
			
			var empRange = s.split(segmentCookie,'empRange:');
			empRange = s.split(empRange[1],",");
			if(empRange[0]==""){
				empRange[0]="None";
				}			
			s.eVar55=s.eVar55+",emprange="+empRange[0];
				
			var endDigit=1;
			s.eVar56="";
				while (endDigit < 11){
				var name = "msv_id" + endDigit;
				var msv_id = s.split(segmentCookie,name+":");
				msv_id = s.split(msv_id[1],",");
				if(msv_id[0]==""){
					msv_id[0]="None";
					}
				s.eVar56 = s.eVar56 + name + "=" + msv_id[0];
				
				//if less than 10th iteration, add comma to eVar56 value
				if (endDigit < 10){	
					s.eVar56 = s.eVar56 + ",";
					}
				endDigit++;
				}  //end While Loop
			
			var categoryList = ["CopyPaper", "Ink", "Toner", "CleaningandBreakroom", "Technology", "Furniture", "Computers", "CPC", "MailandShip", "OtherSupplies", "Others"];
			s.eVar57="";
			s.eVar58="";			
			for (var x = 0; x < categoryList.length; x++){
				var category = s.split(segmentCookie,categoryList[x]+":");
				category = s.split(category[1],",");
				if(category[0]==""){
					s.eVar57 = s.eVar57 + categoryList[x].toLowerCase()+ "_sow=None" 
					s.eVar58 = s.eVar58 + categoryList[x].toLowerCase()+ "_pc=None";
					}
				else{
					var walletInfo = s.split(category[0],"|");	
					s.eVar57 = s.eVar57 + categoryList[x].toLowerCase()+ "_sow=" + walletInfo[0];
					s.eVar58 = s.eVar58 + categoryList[x].toLowerCase()+ "_pc=" + walletInfo[1];
					}
				//if less than CategoryList Array length, add comma to eVar57 and eVar58 value
				if (x < (categoryList.length-1)){	
					s.eVar57 = s.eVar57 + ",";
					s.eVar58 = s.eVar58 + ",";
					}
				} //End For Loop
			}	
		}
		else {  //segmentCookie does not exist, set values equal to None
			s.eVar55=s.eVar55 + ",business=None,emprange=None";
			s.eVar56="None";
			s.eVar57="None";
			s.eVar58="None";		
		}
		
	if(s.eVar17 && s.eVar17.indexOf(': ')>-1)
	s.eVar17=s.repl(s.eVar17,': ',':');
	
	/* Setting the hierarchy variable to be the same as prop6, delimiter is : */
	if(s.prop6) s.hier1=s.prop6;
	
	if(s.linkTrackVars && (s.linkTrackVars+',').indexOf('prop6,')>-1)
	{
			if (s.prop6){
				s.linkTrackVars=s.apl(s.linkTrackVars,'hier1',',',2);
				s.hier1=s.prop6;
			}
	}
	
	//Set scAdd on print.staples.com when pfid parameter is appended to URL on cart page
	var vpCartPage=document.location.toString();
	if(s.getQueryParam('pf_id') && vpCartPage.indexOf('display_xcart.aspx')!=-1)
	{
	
	 if(s.events && typeof s.events != 'undefined')
	 {
	  s.events=s.events + ",scAdd";
	 }
	 else{
		s.events="scAdd";
	 }
        }
	
	
	/*Set atcLocation on all pages before actually adding to cart, and prevent popups from overwriting*/
	var noPopUp=document.location.toString();
	
	 if(window.self==window.parent && noPopUp.indexOf('popup')<0 && s.events.indexOf('scAdd')<0)
	 {
	   s.c_w('s_atcLocation',s.prop3);
	 }

	 if(s.events && (s.events+',').indexOf('scAdd,')>-1)
	 {
		s.linkTrackVars=s.apl(s.linkTrackVars,'eVar12',',',2);
		var checkCartRec=s.eVar17;
		if(s.eVar17 && checkCartRec.indexOf('cart')!=-1)
		{
		 if(checkCartRec.indexOf('cart_overlay')!=-1)
		 {
		  s.eVar12='Shopping Cart Overlay';	
		 }else
		 {
		  s.eVar12='Shopping Cart Page';
		 }
		}else
		{
		  s.eVar12=s.c_r('s_atcLocation');
		}
    	 }
	
	
	
	/* set eVar61 only when the user visits staples.ca */
	if(document.location.hostname.indexOf('staples.ca')>-1)
	s.eVar61='Visited Staples CA';
	
	/* Capturing cm_sp and ICID internal campaign in the exit links */
	var exitLinkCMSP=s.exitLinkHandler();
	var exitLinkICID=s.exitLinkHandler();

	if(exitLinkCMSP) {
		var exitLink = exitLinkCMSP;
		if(exitLink.indexOf('cm_sp')>-1){
			var start = exitLink.indexOf('cm_sp');
			var subValue= exitLink.substring(start+6);
			var end = subValue.indexOf('&');		
			if(end != -1)
				subValue=subValue.substring(0,end)
			else
				subValue=subValue.substring(0);
			s.eVar4=subValue;
			s.linkTrackVars="eVar4";
		}
	}
	else if(exitLinkICID){
		var exitLink = exitLinkICID;
		if(exitLink.indexOf('ICID')>-1){
			var start = exitLink.indexOf('ICID');
			var subValue= exitLink.substring(start+6);
			var end = subValue.indexOf('&');		
			if(end != -1)
				subValue=subValue.substring(0,end)
			else
				subValue=subValue.substring(0);
			s.eVar4=subValue;
			s.linkTrackVars="eVar4";
		}
	}
	
	//capturing metrics for percentage of page viewed
	var b = s.getPercentPageViewed(s.pageName);
        s.prop44 = b[0];
        s.prop45 = b[1];
        s.prop46 = b[2];
        s.prop47 = b[3];

        //write main SKU to cookie to be extracted for various scenarios
        if(typeof(s.prop3)!='undefined' && s.prop3=='Product Detail')
        {
         var mainSKU=s.products;
         mainSKU=mainSKU.slice(1);
         s.c_w('s_mainSKU',mainSKU);
        }
	
	//get search rule when query parameter is present in URL
	if(s.getQueryParam('sRule'))
	{
	  s.eVar64=s.getQueryParam('sRule');
	}
	
	//capture search result page type
        if(typeof(s.prop2)!='undefined')
        {
         if(s.prop2=='zero')
	 {
	   s.prop50='No Search Results';
	 }else if(s.prop2=='Redirected Search')
	 {
	   s.prop50='Redirected Search';  
	 }else{
	   s.prop50='Search Results';
	 }
	 
        }
	

}	

s.doPlugins=s_doPlugins
/******************* CONVENIENCE FUNCTIONS SECTION ******************/
/* Optional functions that can be called from the page as needed    */


//record search keyword and number of previously ordered items in box on search results page
function s_previouslyOrderedSearchBox(resultNum)
{
 s.linkTrackVars="prop1,prop49,prop51";
 s.linkTrackEvents="None";
 s.events="";
 s.prop49=resultNum;
 s.prop51='Previously Ordered Items';
 s.tl(true,"o","Clicked on Previously Ordered Items Box from Search Results Page");
}

//Record Search: Previously Ordered Items PFM on add to cart or clickthrough
function s_previouslyOrderedItemSearchClick()
{
 s.linkTrackVars="prop49,eVar3,eVar17,prop1,prop51";
 s.linkTrackEvents="None";
 s.events="";
 s.eVar3='Search';
 s.eVar17='Search:Previously Ordered Items';
 s.prop51='Previously Ordered Items';
 s.tl(true,"o","Clickthrough or Add-to-Cart of Item from Previously Ordered Items on Search Results Page");
}

//record search keyword and number of product and research tools on search results page
function s_prodResearchToolsSearchBox(resultNum)
{
 s.linkTrackVars="prop1,prop49,prop51";
 s.linkTrackEvents="None";
 s.events="";
 s.prop49=resultNum;
 s.prop51='Product and Research Tools';
 s.tl(true,"o","Clicked on Product and Research Tools Box from Search Results Page");
}

//Record Search: Previously Ordered Items PFM on add to cart or clickthrough
function s_prodResearchToolsSearchClick()
{
 s.linkTrackVars="prop49,prop51,prop1";
 s.linkTrackEvents="None";
 s.events="";
 s.prop51='Product and Research Tools';
 s.tl(true,"o","Clickthrough from Product and Research Tools Box on Search Results Page");
}

//record blue box messaging from no search results page
function s_blueBoxMessagingClick(msg)
{
 s.linkTrackVars="prop49,prop51,prop1,prop52";
 s.linkTrackEvents="None";
 s.events="";
 s.prop51='Blue Box Messaging';
 s.prop52=msg;
 s.tl(true,"o","Clickthrough from Blue Messaging Box on No Search Results Page");
}

//record grid/list toggle on search results page
function s_searchDisplayView(view)
{
 s.linkTrackVars="prop1,prop2,prop3,prop4,prop5,prop6,prop53";
 s.linkTrackEvents="None";
 s.events="";
 s.prop53=view;
 s.tl(true,"o","Clicked "+view+" view on search results page");
}

//record social type and SKU when sharing product
function s_shareProduct(socialType,product)
{
 s.linkTrackVars="products,eVar63,events";
 s.linkTrackEvents="event56";
 s.events="event56";
 s.products=";"+product;
 s.eVar63=socialType;
 s.tl(true,"o","Shared "+product+" to "+socialType);
}

/* 
 * Begin Checkout: Record all of the products in the cart when the 
 * Proceed To Checkout button is clicked
 */

function s_beginCheckout(products){ 
	//s_beginCheckout(';SKU1,;SKU2,;SKU3')
	s.linkTrackVars='events,products';
	s.linkTrackEvents='scCheckout';
	s.products=products;
	s.events='scCheckout';
	s.tl(true,'o','Checkout');
}
/*
 * Internal Campaign: Record the internal campaign ID without using a
 * query string
 */
function s_intCmp(campaign){
	s.linkTrackVars='eVar4';
	s.linkTrackEvents='none';
	s.eVar4=campaign;
	s.tl(true,'o','Internal Campaign Click-Through');
}
/*
 * Product Tab: Measure product tab usage and set read reviews event on the 
 * reviews page
 */
function s_prodTab(tab){
	//s_prodTab('Specifications')
	        s.eVar12='';
		s.linkTrackVars='prop11,prop48';
		s.linkTrackEvents='none';
		s.events='';
		s.prop11=tab;
		s.prop48=s.c_r('s_mainSKU');
		s.tl(true,'o',tab);
		s.prop48=s.prop11='';
	}
/* 
 * Add to Cart: Record the product(s) added to the cart, the potential
 * revenue and units, the cart addition location and finding method when 
 * called 
 */
function s_cartAdd(products,revenue,units,atcMethod,findMethod){ 
	//s_cartAdd('sku1',"10","1","Shopping Cart: Easy Reorder","Easy Reorder")
	//s_cartAdd('sku1:sku2:sku3',"10:25:34","1:1:1","Product Detail Page")
	if(findMethod){
		s.linkTrackVars='events,products,eVar12,eVar3,eVar14,eVar15,eVar1,eVar4';
		s.eVar3=findMethod;	
	}
	else{
		s.linkTrackVars='events,products,eVar12';
	}
	if(!s.eVar12 && s.prop3){		
		s.eVar12=s.prop3;
	}
	s.linkTrackEvents='scAdd,scOpen,event35,event36';
	s.events='scAdd,scOpen,event35,event36';
	var prodArray=s.split(products,':')
	if(products) s.products='';
	if(revenue && units){
		var revArray=s.split(revenue,':')
		var unitsArray=s.split(units,':')
		for(var i = 0; i < prodArray.length; i++){
			if(typeof s.products != 'undefined' && s.products){
				if(revArray[i] && unitsArray[i]){
					s.products=s.products+',;'+prodArray[i]+';;;event35='+revArray[i]+'|event36='+unitsArray[i];
				}
				else{
					s.products=s.products+',;'+prodArray[i];
				}
			}
			else{
				if(revArray[i] && unitsArray[i]){
					s.products=';'+prodArray[i]+';;;event35='+revArray[i]+'|event36='+unitsArray[i];
				}
				else{
					s.products=';'+prodArray[i];
				}
			}
		}
	}
	else{
		for(var i = 0; i < prodArray.length; i++){	
			if(typeof s.products != 'undefined' && s.products){
				s.products=s.products+',;'+prodArray[i];
			}
			else{
					s.products=';'+prodArray[i];
				}
		}
	}
	s.tl(true,'o','Cart Addition');
}
function s_addToFavorites(products){
	s.linkTrackVars='events,products';
	s.linkTrackEvents='event23';
	s.events='event23';
	var prodArray=s.split(products,':')
	for(var i = 0; i < prodArray.length; i++){
		if(typeof s.products != 'undefined' && s.products){
			s.products=s.products+',;'+prodArray[i];
		}
		else{
			s.products=';'+prodArray[i];
		}
	}
	s.tl(true,'o','Add to Favorites');
}
/*
 * Home Page Location: Measure location of clicks on home page
 */
function s_homeLoc(clickLocation){
	//s_homeLoc('Left Nav')
	s.linkTrackVars='prop15';
	s.linkTrackEvents='none';
	s.prop15=clickLocation;
	s.tl(true,'o','Home Page Click');
}
/*
 * Product Affinity: Record product referrals
 */
function s_prodAffinity(product,findMethod,referralType,recRule){
	//s_prodAffinity(';SKU1','Cross-Sell','Supplies & Accessories: PD')
	s.linkTrackVars='eVar3,eVar16,eVar17,eVar45';
	s.linkTrackEvents='none';
	if(recRule)
		s.eVar45=recRule;
	else
		s.eVar45='no recRule';
	if(findMethod)
		s.eVar3=findMethod;
	else
		s.eVar3='no PFM in prodAffinity';
	if(referralType)
		s.eVar17=s.eVar3 + ':' + referralType;
	else
		s.eVar17=s.eVar3+':No SPFM in prodAffinity';		
	if(product)
		s.eVar16=product;
	else
		s.eVar16='no product in prodAffinity';
		
	s.tl(true,'o','Product Affinity');
}
/*
 * Finding Method: Record the product finding method and (optionally) the
 * recommendation type and recRule
 */
function s_findMethod(findMethod,recommendType,recRule){
	//s_findMethod('Recommendations','recently viewed','rule');
	//s_findMethod('Recommendations','recently viewed');	
	s.linkTrackVars='eVar3,eVar17,eVar45';
	if(recRule)		
		s.eVar45=recRule;		
	else
		s.eVar45='no recRule';				
	if(findMethod)
		s.eVar3=findMethod;
	else
		s.eVar3='no PFM in findMethod';
	if(recommendType)
		s.eVar17=s.eVar3 + ':' + recommendType;
	else
		s.eVar17=s.eVar3 +':No SPFM in findMethod';
		
	s.linkTrackEvents='none';
	
	s.tl(true,'o','Finding Method');	
}

/*
 * Product Slot: Measure performance of search result slots
 */
function s_prodSlot(slot,searchPageNumber){
	//s_prodSlot('4','2')
	s.linkTrackVars='eVar19';
	s.linkTrackEvents='none';
	s.eVar19=slot+': '+searchPageNumber;
	s.tl(true,'o','Search Slot');
}
/*
 * Weekly Ad Full Product View: Record weekly ad product views by sku
 */
function s_wkAdProdView(product){
	//s_wkAdProdView('SKU1')
	s.linkTrackVars='events,products';
	s.linkTrackEvents='event43';
	s.events='event43';
	s.products=';'+product;
	s.tl(true,'e','Weekly Ad Product View');
}
/*
 * Weekly Ad Cart Add: Record weekly ad cart additions by sku
 */
function s_wkAdCartAdd(product){
	//s_wkAdCartAdd('SKU1')
	s.linkTrackVars='events,products';
	s.linkTrackEvents='event44';
	s.events='event44';
	s.products=';'+product;
	s.tl(true,'e','Weekly Ad Cart Additions');
}
/*
 * Flyout Interaction
 */
function s_flyoutTrack(flyoutCategory,matchToolClick){
	//s_flyoutTrack('Zoom')	
	if(matchToolClick == 'true'){
		s.linkTrackVars='prop27,eVar3,eVar17';
		s.eVar3="Ink & Toner"; 
	        s.eVar17="Ink & Toner:flyout";
	}else
		s.linkTrackVars='prop27';
		
	s.linkTrackEvents='none';
	s.prop27=flyoutCategory;
	s.tl(true,'o','Product Flyout Interaction');
}
/*
 * Refinement Tracking
 */
function s_refineTrack(rtAction, rtType, rtValue){
	//s_refineTrack('Refinement','Brand','Staples')
	s.linkTrackVars='prop7,prop8,prop4';
	if(rtAction && !rtType && !rtValue)
		s.prop7=s.prop8=rtAction;
	if(rtType && !rtValue){
		s.prop7=s.prop8=rtAction+': '+rtType;
	}
	if(rtValue){
		s.prop7=rtAction+': '+rtType;
        s.prop8=rtAction+': '+rtType+': '+rtValue;
	}
	if(s.prop4){
		s.prop7=s.prop4+': '+s.prop7;
		s.prop8=s.prop4+': '+s.prop8;
	}
	s.linkTrackEvents='none';
	s.tl(true,'o','Refinement Tracking');
}
/*
 * Facebook Likes
 */
function s_fbLike(){
	//s_fbLike()
	s.linkTrackVars='products,events,eVar47';
	s.linkTrackEvents='event62';
	s.events='event62';
	s.eVar47='Facebook Like';
	s.tl(true,'o','Facebook Like');
}
/*
 *	Store Locator Searches
 */
 function s_storeLocator(zip,city,state,address){
	s.linkTrackVars='prop18,events';
	s.linkTrackEvents='event24';
	s.events='event24';
	if(zip)
		s.prop18='zip:'+zip;
	if(state){
		s.prop18 ? s.prop18=s.prop18+',state:'+state : s.prop18='state:'+state;
	}
	if(city){
		s.prop18 ? s.prop18=s.prop18+',city:'+city : s.prop18='city:'+city;
	}
	if(address){
		s.prop18 ? s.prop18=s.prop18+',addr:'+address : s.prop18='addr:'+address;
	}
	s_dfaCall();
	s.tl(this,'o','Store Locator Search');
 }
/*
* Set the variables for comparison chart
*/
function s_comparisonTrack(){
	 s.eVar10=s.eVar10;
         s.pageName="compchartresults";
         s.server=s.server;
         s.channel="Other";
         s.prop3="compchartresults";
         s.prop4=s.prop4;
         s.prop5=s.prop5;
         s.prop6=s.prop6;
         s.hier1=s.prop6;
         var s_code=s.t();
         if(s_code)document.write(s_code);
}
/*
* On load of the cart overlay page
*/
function s_cartAddOverlay(products,revenue,units,atcMethod,findMethod){ 
	//s_cartAddOverlay('sku1',"10","1","Shopping Cart: Easy Reorder","Easy Reorder")
	//s_cartAddOverlay('sku1:sku2:sku3',"10:25:34","1:1:1","Product Detail Page")	
	if(findMethod){
		s.linkTrackVars='events,products,eVar12,eVar3,eVar14,eVar15,eVar1,eVar4';
		s.eVar3=findMethod;
		}
	else{
		s.linkTrackVars='events,products,eVar12';
	}
	s.linkTrackEvents='scAdd,scOpen,event35,event36,event4';
	s.events='scAdd,scOpen,event35,event36,event4';
	s.products='';	
	var prodArray=s.split(products,':');
	if(revenue && units){
		var revArray=s.split(revenue,':')
		var unitsArray=s.split(units,':')
		for(var i = 0; i < prodArray.length; i++){
			if(typeof s.products != 'undefined' && s.products){
				if(revArray[i] && unitsArray[i]){
					s.products=s.products+',;'+prodArray[i]+';;;event35='+revArray[i]+'|event36='+unitsArray[i];
				}
				else{
					s.products=s.products+',;'+prodArray[i];
				}
			}
			else{
				if(revArray[i] && unitsArray[i]){
					s.products=';'+prodArray[i]+';;;event35='+revArray[i]+'|event36='+unitsArray[i];
				}
				else{
					s.products=';'+prodArray[i];
				}
			}
		}
	}
	else{
		for(var i = 0; i < prodArray.length; i++){	
			if(typeof s.products != 'undefined' && s.products){
				s.products=s.products+',;'+prodArray[i];
			}
			else{
				s.products=';'+prodArray[i];
			}
		}
	}
}
/*
* Add to cart overlay for on clicks of product detail,View Cart, Add to cart
*/
function s_atcOverlayRecom(findMethod,clickType,products){
	//s_atcOverlayRecom('ATC Overlay: Cross-Sell','Product Detail','12345:23456');
	if(true){
        	s.linkTrackVars='prop3,prop4,prop5,prop6,eVar3,products,hier1';
                s.linkTrackEvents='none';                 
                //s.eVar3=findMethod;                 
                s.prop3='Checkout'; 
                s.prop4="Checkout: "+findMethod+": "+clickType; 
                s.prop5="Checkout: "+findMethod+": "+clickType;
                s.prop6="Checkout: "+findMethod+": "+clickType;
                s.hier1=s.prop6;
                s.products='';
                var prodArray=s.split(products,':');
                if(products){
                	for(var i = 0; i < prodArray.length; i++){	
				if(typeof s.products != 'undefined' && s.products){
					s.products=s.products+',;'+prodArray[i];
				}
				else{
					s.products=';'+prodArray[i];
				}
			}
		}
		/* commenting out s.tl() call as s_findMethod() method is being called for this purpose
                s.tl(this,'o',findMethod+': '+clickType); */
            }
}
/*
 * Search helpful Yes or No tracking
 */
function s_searchHelpful(yesno,searchTerm){
	//s_searchHelpful("Yes","printers"); // "printers" being the search term
	//s_searchHelpful("No","printers"); // "printers" being the search term
	//s_searchHelpful("No","null"); // for unsuccessful search, pass null as the search term	
	s.linkTrackEvents='none';
	if(yesno){
		if(searchTerm){
			s.linkTrackVars='prop33,prop34,eVar3,eVar4,eVar17,prop3,prop4,prop5,prop6,hier1';
			s.prop34=searchTerm+":"+yesno;
		}
		else{
			s.linkTrackVars='prop33,eVar3,eVar4,eVar17,prop3,prop4,prop5,prop6,hier1';
		}
		s.prop33=yesno;
	}
	else
		s.linkTrackVars='none';
	s.tl(true,'o','Search Helpful');
}
/*
 * Check in-store availability
 */
function s_checkInStore(){
	s.linkTrackVars='events,products,eVar3,eVar4,eVar17,prop3,prop4,prop5,prop6,hier1';
	s.linkTrackEvents='event61';
	s.events='event61';
	s.tl(true,'o','Check InStore Availability');
}
/*
 * Print this page
 */
function s_printThisPage(){
	s.linkTrackVars='events,products,eVar3,eVar4,eVar17,prop3,prop4,prop5,prop6,hier1';
	s.linkTrackEvents='event60';
	s.events='event60';
	s.tl(true,'o','Print This Page');
}
/*
 * Out Of Stock
 */
function s_outOfStock(product,postalCode,message,timestamp){ 
	s.linkTrackVars='products,events,eVar51,eVar60,prop9';
        s.linkTrackEvents='event78';
        s.events='event78';
        s.products='';
        if(product) s.products=';'+ product;
	if(postalCode) s.eVar51=postalCode; //setting the value only if eVar51 is not set using the Zipcode cookie.
	else s.eVar51='';
	if(message) s.prop9=message;
	else s.prop9='';
	if(timestamp) s.eVar60=timestamp;
	else s.eVar60='';
        s.tl(true,'o','Out of Stock');
}
/*
 * Cart Removals
 */
function s_remItem(product){ 
	s.linkTrackVars='events,products';
	s.linkTrackEvents='scRemove';	
	s.events='scRemove';
	s.products='';
	if(product) s.products=';'+product;
	s.tl(true,'o','Item removal from Cart');
}
/*
 * Form Error Tracking
 */
function s_formError(errorMessage){ 
	s.linkTrackVars='prop9';
	s.linkTrackEvents='none';
	if(errorMessage) s.prop9=errorMessage;
	else s.prop9='No form error specified';
	s.tl(true,'o','Form Error');
}


/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

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
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");
/*
* Plugin: getVisitStart v2.0 - returns 1 on first page of visit
* otherwise 0
*/
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");
/*
* Plugin: s_dfaCall: create a DFA Floodlight tag on every page of the
* visit
*/
function s_dfaCall(){
	var a,b,c,d,e,f
	if(!s.eVar47 || s.eVar47 == 'null')	{
		a=s.c_r('s_vi');
		b=/[0-9A-F]+-[0-9A-F]+/g;
		c=a.match(b);
	}
	else{c=s.eVar47;}
	var dfaParams = ['u3=' + c];
	if(s.eVar7){dfaParams.push('u4='+s.eVar7);}
	if(s.events){e=s.repl(s.events,',','^');dfaParams.push('u5='+e);}
	if(s.products){f=s.repl(s.products,';','~');f=s.repl(f,',','^');dfaParams.push('u6='+f);}
	if(s.prop6){
		if(!s.eVar7)
			dfaParams.push('u7='+s.prop6); 
		else 
			dfaParams.push('u7='+s.pageName);
	}
	if(!s.eVar7){	
		if(s.prop24){dfaParams.push('u8='+s.prop24);}
		if(s.eVar36){dfaParams.push('u9='+s.eVar36);}
		if(s.eVar46){dfaParams.push('u10='+s.eVar46);}	
		if(s.prop18){dfaParams.push('u11='+s.prop18);}
		if(s.prop21){d=s.split(s.prop21,'//');dfaParams.push('u12=' + d[1]);}
		if(s.eVar24 && s.eVar24 != 'Other'){dfaParams.push('u13=NS:'+s.eVar24);}
		if(s.eVar25 && s.eVar25 != 'Other'){dfaParams.push('u13=PS:'+s.eVar25);}
	}
	dfaParams=dfaParams.toString();
	dfaParams=s.repl(dfaParams,',',';');
	if(dfaParams){
		var axel=Math.random()+'';
		var n=axel*10000000000000;
		var protocol=window.location.protocol;
		var omtrdfaURL=protocol+'//fls.doubleclick.net/activityi;src=737194;type=staples;cat=adobe619;'+dfaParams+';ord='+n+'?';
		var createIframe=document.createElement('iframe');
		createIframe.setAttribute('src',omtrdfaURL);
		createIframe.setAttribute('width','1');
		createIframe.setAttribute('height','1');
		createIframe.setAttribute('frameborder','0');
		createIframe.setAttribute('style','display:none');
		
		//bypassing dfa call to fix JS error on weekly ad production site
		if(typeof(s.channel)!='undefined')
		{
		 var weeklyAdCheck=s.channel;
		 if(weeklyAdCheck.indexOf('wklyad:')<0)
		 {
		  document.getElementsByTagName('body')[0].appendChild(createIframe);
		 }
		}
		
		
	}
}

/*
 * Plugins: getPercentagePageViewed and handlePPVevents
 */
s.handlePPVevents = new Function("", "if(!s.getPPVid)return;var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh*100),100),c=s.c_r('s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',4):[],id=(a.length>0)?(a[0]):escape(s.getPPVid),cv=(a.length>1)?parseInt(a[1]):(0),p0=(a.length>2)?parseInt(a[2]):(pv),cy=(a.length>3)?parseInt(a[3]):(0),cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy)?vh:cy)):'';s.c_w('s_ppv',cn);");
s.getPercentPageViewed = new Function("pid", "pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.linkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i=3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape(a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventListener('load',s.handlePPVevents,false);s.wd.addEventListener('scroll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handlePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onload',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevents);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-')?(a):(a[1]);");

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
 *	Plug-in: manageQueryParam v1.2 - Manages query string parameters
 *	by either encoding, swapping, or both encoding and swapping a value. 
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
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin Utility: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin Utility: s.join: 1.0 
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
/*
 * Plugin Utility: p_fo(x,y): Ensures the plugin code is fired only on the 
 *      first call of do_plugins
 */
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Function - read combined cookies v 0.3
 */
if(!s.__ccucr){s.c_rr=s.c_r;s.__ccucr = true;
s.c_r=new Function("k",""
+"var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
+"urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
+"c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
+",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
+"m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
+"Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
+"urn v;");}

/*
 * Function - write combined cookies v 0.3
 */
if(!s.__ccucw){s.c_wr=s.c_w;s.__ccucw = true;
s.c_w=new Function("k","v","e",""
+"this.new2 = true;"
+"var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
+"c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
+".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
+"ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
+".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
+"ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
+"{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
+"='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
+".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
+"ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
+"Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");}

/*
* TNT Integration Plugin v1.0
*/
s.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");

/*
 *	Plug-in: crossVisitParticipation v1.7 - stacks values from
 *	specified variable in cookie and returns value
 */

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

/*                                                                  
 * Plugin: clickPast - version 1.0
 */
s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");

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
 * Plugin: getPreviousValue v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
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
/* Top 130 Uncompressed*/
s.seList="altavista.co|q,r|AltaVista>aol.co.uk,search.aol.co.uk|query"
+"|AOL - United Kingdom>search.aol.com,search.aol.ca|query,q|AOL.com "
+"Search>ask.com,ask.co.uk|ask,q|Ask Jeeves>www.baidu.com|wd|Baidu>da"
+"um.net,search.daum.net|q|Daum>google.co,googlesyndication.com|q,as_"
+"q|Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as"
+"_q|Google - Australia>google.at|q,as_q|Google - Austria>google.com."
+"bh|q,as_q|Google - Bahrain>google.com.bd|q,as_q|Google - Bangladesh"
+">google.be|q,as_q|Google - Belgium>google.com.bo|q,as_q|Google - Bo"
+"livia>google.ba|q,as_q|Google - Bosnia-Hercegovina>google.com.br|q,"
+"as_q|Google - Brasil>google.bg|q,as_q|Google - Bulgaria>google.ca|q"
+",as_q|Google - Canada>google.cl|q,as_q|Google - Chile>google.cn|q,a"
+"s_q|Google - China>google.com.co|q,as_q|Google - Colombia>google.co"
+".cr|q,as_q|Google - Costa Rica>google.hr|q,as_q|Google - Croatia>go"
+"ogle.cz|q,as_q|Google - Czech Republic>google.dk|q,as_q|Google - De"
+"nmark>google.com.do|q,as_q|Google - Dominican Republic>google.com.e"
+"c|q,as_q|Google - Ecuador>google.com.eg|q,as_q|Google - Egypt>googl"
+"e.com.sv|q,as_q|Google - El Salvador>google.ee|q,as_q|Google - Esto"
+"nia>google.fi|q,as_q|Google - Finland>google.fr|q,as_q|Google - Fra"
+"nce>google.de|q,as_q|Google - Germany>google.gr|q,as_q|Google - Gre"
+"ece>google.com.gt|q,as_q|Google - Guatemala>google.hn|q,as_q|Google"
+" - Honduras>google.com.hk|q,as_q|Google - Hong Kong>google.hu|q,as_"
+"q|Google - Hungary>google.co.in|q,as_q|Google - India>google.co.id|"
+"q,as_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google."
+"is|q,as_q|Google - Island>google.co.il|q,as_q|Google - Israel>googl"
+"e.it|q,as_q|Google - Italy>google.com.jm|q,as_q|Google - Jamaica>go"
+"ogle.co.jp|q,as_q|Google - Japan>google.jo|q,as_q|Google - Jordan>g"
+"oogle.co.ke|q,as_q|Google - Kenya>google.co.kr|q,as_q|Google - Kore"
+"a>google.lv|q,as_q|Google - Latvia>google.lt|q,as_q|Google - Lithua"
+"nia>google.com.my|q,as_q|Google - Malaysia>google.com.mt|q,as_q|Goo"
+"gle - Malta>google.mu|q,as_q|Google - Mauritius>google.com.mx|q,as_"
+"q|Google - Mexico>google.co.ma|q,as_q|Google - Morocco>google.nl|q,"
+"as_q|Google - Netherlands>google.co.nz|q,as_q|Google - New Zealand>"
+"google.com.ni|q,as_q|Google - Nicaragua>google.com.ng|q,as_q|Google"
+" - Nigeria>google.no|q,as_q|Google - Norway>google.com.pk|q,as_q|Go"
+"ogle - Pakistan>google.com.py|q,as_q|Google - Paraguay>google.com.p"
+"e|q,as_q|Google - Peru>google.com.ph|q,as_q|Google - Philippines>go"
+"ogle.pl|q,as_q|Google - Poland>google.pt|q,as_q|Google - Portugal>g"
+"oogle.com.pr|q,as_q|Google - Puerto Rico>google.com.qa|q,as_q|Googl"
+"e - Qatar>google.ro|q,as_q|Google - Romania>google.ru|q,as_q|Google"
+" - Russia>google.st|q,as_q|Google - Sao Tome and Principe>google.co"
+"m.sa|q,as_q|Google - Saudi Arabia>google.com.sg|q,as_q|Google - Sin"
+"gapore>google.sk|q,as_q|Google - Slovakia>google.si|q,as_q|Google -"
+" Slovenia>google.co.za|q,as_q|Google - South Africa>google.es|q,as_"
+"q|Google - Spain>google.lk|q,as_q|Google - Sri Lanka>google.se|q,as"
+"_q|Google - Sweden>google.ch|q,as_q|Google - Switzerland>google.com"
+".tw|q,as_q|Google - Taiwan>google.co.th|q,as_q|Google - Thailand>go"
+"ogle.bs|q,as_q|Google - The Bahamas>google.tt|q,as_q|Google - Trini"
+"dad and Tobago>google.com.tr|q,as_q|Google - Turkey>google.com.ua|q"
+",as_q|Google - Ukraine>google.ae|q,as_q|Google - United Arab Emirat"
+"es>google.co.uk|q,as_q|Google - United Kingdom>google.com.uy|q,as_q"
+"|Google - Uruguay>google.co.ve|q,as_q|Google - Venezuela>google.com"
+".vn|q,as_q|Google - Viet Nam>google.co.vi|q,as_q|Google - Virgin Is"
+"lands>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor"
+"|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|quer"
+"y,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sez"
+"nam.cz>abcsok.no|q|Startsiden>tiscali.it|key|Tiscali>virgilio.it|qs"
+"|Virgilio>yahoo.com,search.yahoo.com|p|Yahoo!>ar.yahoo.com,ar.searc"
+"h.yahoo.com|p|Yahoo! - Argentina>au.yahoo.com,au.search.yahoo.com|p"
+"|Yahoo! - Australia>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Can"
+"ada>fr.yahoo.com,fr.search.yahoo.com|p|Yahoo! - France>de.yahoo.com"
+",de.search.yahoo.com|p|Yahoo! - Germany>hk.yahoo.com,hk.search.yaho"
+"o.com|p|Yahoo! - Hong Kong>in.yahoo.com,in.search.yahoo.com|p|Yahoo"
+"! - India>yahoo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>kr.yah"
+"oo.com,kr.search.yahoo.com|p|Yahoo! - Korea>mx.yahoo.com,mx.search."
+"yahoo.com|p|Yahoo! - Mexico>ph.yahoo.com,ph.search.yahoo.com|p|Yaho"
+"o! - Philippines>sg.yahoo.com,sg.search.yahoo.com|p|Yahoo! - Singap"
+"ore>es.yahoo.com,es.search.yahoo.com|p|Yahoo! - Spain>telemundo.yah"
+"oo.com,espanol.search.yahoo.com|p|Yahoo! - Spanish (US : Telemundo)"
+">tw.yahoo.com,tw.search.yahoo.com|p|Yahoo! - Taiwan>uk.yahoo.com,uk"
+".search.yahoo.com|p|Yahoo! - UK and Ireland>yandex|text|Yandex.ru>s"
+"earch.cnn.com|query|CNN Web Search>search.earthlink.net|q|Earthlink"
+" Search>search.comcast.net|q|Comcast Search>search.rr.com|qs|RoadRu"
+"nner Search>optimum.net|q|Optimum Search";

/* Configure Modules and Plugins */
s.loadModule("Media")
s.Media.autoTrack=true
s.Media.trackWhilePlaying=true
s.Media.trackVars="events,eVar40"
s.Media.trackEvents="event53,event54"
s.Media.trackMilestones = "25,50,75,100";
s.Media.monitor = function (s,media){
	if(media.event=="Open") {
		s.events="event53";
		s.eVar40=media.name;
	}
	if(media.event=="Close") {
		s.events="event54";
	}
}
s.loadModule("Survey")
var s_sv_dynamic_root = "survey.122.2o7.net/survey/dynamic"
var s_sv_gather_root = "survey.122.2o7.net/survey/gather"

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="staples"
s.trackingServer="metrics.staples.com"
s.trackingServerSecure="smetrics.staples.com"
s.dc=122

/****************************** MODULES *****************************/
/* Module: Media */
s.m_Media_c="var m=s.m_i('Media');m.cn=function(n){var m=this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',"
+"x;n=m.cn(n);l=parseInt(l);if(!l)l=1;if(n&&p){if(!m.l)m.l=new Object;if(m.l[n])m.close(n);if(b&&b.id)a=b.id;for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.p=m.cn(p);i.a=a;i.t=0"
+";i.ts=0;i.s=Math.floor(tm.getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;m.l[n]=i}};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o){var m=this,i;i=m.e(n,1,o);i.m=new Function('var m"
+"=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.mt=setTimeout(i.m,5000)}}');i.m()};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){va"
+"r m=this;if (m.trackWhilePlaying) {m.e(n,4,-1)}};m.e=function(n,x,o){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),ti=m.trackSeconds,tp=m.trackMilestones,z=new Array,j,d='--**--',t=1,b,"
+"v=m.trackVars,e=m.trackEvents,pe='media',pev3,w=new Object,vo=new Object;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){w.name=n;w.length=i.l;w.playerName=i.p;if(i.to<0)w.event=\"OPEN\";else w.event=(x="
+"=1?\"PLAY\":(x==2?\"STOP\":(x==3?\"MONITOR\":\"CLOSE\")));w.openTime=new Date();w.openTime.setTime(i.s*1000);if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {b=\"Media.\"+name;pev3 = m.s.ape(i.n)+d+i.l+d+m.s.a"
+"pe(i.p)+d;if(x){if(o<0&&i.lt>0){o=(ts-i.lt)+i.lo;o=o<i.l?o:i.l-1}o=Math.floor(o);if(x>=2&&i.lo<o){i.t+=o-i.lo;i.ts+=o-i.lo;}if(x<=2){i.e+=(x==1?'S':'E')+o;i.lx=x;}else if(i.lx!=1)m.e(n,1,o);i.lt=ts"
+";i.lo=o;pev3+=i.t+d+i.s+d+(m.trackWhilePlaying&&i.to>=0?'L'+i.to:'')+i.e+(x!=2?(m.trackWhilePlaying?'L':'E')+o:'');if(m.trackWhilePlaying){b=0;pe='m_o';if(x!=4){w.offset=o;w.percent=((w.offset+1)/w"
+".length)*100;w.percent=w.percent>100?100:Math.floor(w.percent);w.timePlayed=i.t;if(m.monitor)m.monitor(m.s,w)}if(i.to<0)pe='m_s';else if(x==4)pe='m_i';else{t=0;v=e='None';ti=ti?parseInt(ti):0;z=tp?"
+"m.s.sp(tp,','):0;if(ti&&i.ts>=ti)t=1;else if(z){if(o<i.to)i.to=o;else{for(j=0;j<z.length;j++){ti=z[j]?parseInt(z[j]):0;if(ti&&((i.to+1)/i.l<ti/100)&&((o+1)/i.l>=ti/100)){t=1;j=z.length}}}}}}}else{m"
+".e(n,2,-1);if(m.trackWhilePlaying){w.offset=i.lo;w.percent=((w.offset+1)/w.length)*100;w.percent=w.percent>100?100:Math.floor(w.percent);w.timePlayed=i.t;if(m.monitor)m.monitor(m.s,w)}m.l[n]=0;if(i"
+".e){pev3+=i.t+d+i.s+d+(m.trackWhilePlaying&&i.to>=0?'L'+i.to:'')+i.e;if(m.trackWhilePlaying){v=e='None';pe='m_o'}else{t=0;m.s.fbr(b)}}else t=0;b=0}if(t){vo.linkTrackVars=v;vo.linkTrackEvents=e;vo.p"
+"e=pe;vo.pev3=pev3;m.s.t(vo,b);if(m.trackWhilePlaying){i.ts=0;i.to=o;i.e=''}}}}return i};m.ae=function(n,l,p,x,o,b){if(n&&p){var m=this;if(!m.l||!m.l[n])m.open(n,l,p,b);m.e(n,x,o)}};m.a=function(o,t"
+"){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',"
+"f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=n"
+"ew Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catc"
+"h(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){"
+"p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n="
+"=8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type='tex"
+"t/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p='Qui"
+"ckTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScale();l"
+"=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}if(n>0&&"
+"o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='"
+"RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;if(n!="
+"o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,o);o.'+f7+'=0}o."
+"'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+"
+"'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.i"
+"sie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,false)";
s.m_i("Media");
/* Module: Survey */
s.m_Survey_c="var m=s.m_i(\"Survey\");m.launch=function(i,e,c,o,f){this._boot();var m=this,g=window.s_sv_globals||{},l,j;if(g.unloaded||m._blocked())return 0;i=i&&i.constructor&&i.constructor==Array?"
+"i:[i];l=g.manualTriggers;for(j=0;j<i.length;++j)l[l.length]={l:m._suites,i:i[j],e:e||0,c:c||0,o:o||0,f:f||0};m._execute();return 1;};m._t=function(){this._boot();var m=this,s=m.s,g=window.s_sv_glob"
+"als||{},l;if(m._blocked())return;l=g.pageImpressions;l[l.length]={l:m._suites,n:s.pageName||\"\",u:s.pageURL||\"\",r:s.referrer||\"\",c:s.campaign||\"\"};m._execute();};m._rr=function(){var g=windo"
+"w.s_sv_globals||{},f=g.onScQueueEmpty||0;if(f)f();};m._blocked=function(){var m=this,g=window.s_sv_globals||{};return !m._booted||g.stop||!g.pending&&!g.triggerRequested;};m._execute=function(){if("
+"s_sv_globals.execute)setTimeout(\"s_sv_globals.execute();\",0);};m._boot=function(){var m=this,s=m.s,w=window,g,c,d=s.dc,e=s.visitorNamespace,n=navigator.appName.toLowerCase(),a=navigator.userAgent"
+",v=navigator.appVersion,h,i,j,k,l,b;if(w.s_sv_globals)return;if(!((b=v.match(/AppleWebKit\\/([0-9]+)/))?521<b[1]:n==\"netscape\"?a.match(/gecko\\//i):(b=a.match(/opera[ \\/]?([0-9]+).[0-9]+/i))?7<b"
+"[1]:n==\"microsoft internet explorer\"&&!v.match(/macintosh/i)&&(b=v.match(/msie ([0-9]+).([0-9]+)/i))&&(5<b[1]||b[1]==5&&4<b[2])))return;g=w.s_sv_globals={};g.module=m;g.pending=0;g.incomingLists="
+"[];g.pageImpressions=[];g.manualTriggers=[];e=\"survey\";c=g.config={};m._param(c,\"dynamic_root\",(e?e+\".\":\"\")+d+\".2o7.net/survey/dynamic\");m._param(c,\"gather_root\",(e?e+\".\":\"\")+d+\".2"
+"o7.net/survey/gather\");g.url=location.protocol+\"//\"+c.dynamic_root;g.gatherUrl=location.protocol+\"//\"+c.gather_root;g.dataCenter=d;g.onListLoaded=new Function(\"r\",\"b\",\"d\",\"i\",\"l\",\"s"
+"_sv_globals.module._loaded(r,b,d,i,l);\");m._suites=(m.suites||s.un).toLowerCase().split(\",\");l=m._suites;b={};for(j=0;j<l.length;++j){i=l[j];if(i&&!b[i]){h=i.length;for(k=0;k<i.length;++k)h=(h&0"
+"x03ffffff)<<5^h>>26^i.charCodeAt(k);b[i]={url:g.url+\"/suites/\"+(h%251+100)+\"/\"+encodeURIComponent(i.replace(/\\|/,\"||\").replace(/\\//,\"|-\"))};++g.pending;}}g.suites=b;setTimeout(\"s_sv_glob"
+"als.module._load();\",0);m._booted=1;};m._param=function(c,n,v){var p=\"s_sv_\",w=window,u=\"undefined\";if(typeof c[n]==u)c[n]=typeof w[p+n]==u?v:w[p+n];};m._load=function(){var m=this,g=s_sv_glob"
+"als,q=g.suites,r,i,n=\"s_sv_sid\",b=m.s.c_r(n);if(!b){b=parseInt((new Date()).getTime()*Math.random());m.s.c_w(n,b);}for(i in q){r=q[i];if(!r.requested){r.requested=1;m._script(r.url+\"/list.js?\"+"
+"b);}}};m._loaded=function(r,b,d,i,l){var m=this,g=s_sv_globals,n=g.incomingLists;--g.pending;if(!g.commonRevision){g.bulkRevision=b;g.commonRevision=r;g.commonUrl=g.url+\"/common/\"+b;}else if(g.co"
+"mmonRevision!=r)return;if(!l.length)return;n[n.length]={r:i,l:l};if(g.execute)g.execute();else if(!g.triggerRequested){g.triggerRequested=1;m._script(g.commonUrl+\"/trigger.js\");}};m._script=funct"
+"ion(u){var d=document,e=d.createElement(\"script\");e.type=\"text/javascript\";e.src=u;d.getElementsByTagName(\"head\")[0].appendChild(e);};if(m.onLoad)m.onLoad(s,m)";
s.m_i("Survey");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.24.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+"(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+"s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+"(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+"me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+"=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+"=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+"e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+"=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+"bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+"){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>="
+"0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.in"
+"dexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(s"
+"v){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';e"
+"lse if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs"
+"!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType"
+"){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;"
+"if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&"
+"e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL"
+"'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h."
+"indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if("
+"s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';r"
+"eturn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],"
+"f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e"
+"){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&"
+"&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/"
+"':'')+h}return h};s.ot=function(o){var t=o.tagName;if((''+o.tagUrn)!='undefined'||((''+o.scopeName)!='undefined'&&(''+o.scopeName).toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase("
+"):'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0"
+";if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",'"
+"'),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){"
+"o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+','"
+")>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un"
+");return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){"
+"var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)i"
+"f(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v"
+"+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o"
+"=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if("
+"s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,"
+"s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n"
+"){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0"
+"&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,"
+"i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.u"
+"n.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,"
+"l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;"
+"m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m"
+"._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s"
+"[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if"
+"((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl"
+")for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]"
+"){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o="
+"g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.su"
+"bstring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s="
+"s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s"
+".maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o"
+".type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o')"
+";o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=fun"
+"ction(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]="
+"v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<"
+"s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxD"
+"elay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()}"
+";s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),v"
+"t=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code=''"
+",vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.proto"
+"type){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','"
+"var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if"
+"(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElem"
+"ent.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}re"
+"turn hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&"
+"pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.con"
+"nectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pa"
+"geURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo"
+"&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('."
+"s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);"
+"if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex"
+";if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}"
+"if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLi"
+"ghtProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd."
+"s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfile"
+"ID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagConta"
+"inerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];"
+"x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&ty"
+"peof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().in"
+"dexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var "
+"apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.iso"
+"pera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.ap"
+"v=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i"
+"=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cooki"
+"eDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s."
+"va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,"
+"channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n"
+"=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWi"
+"dth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBuffer"
+"edRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,lin"
+"kDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=n"
+"ew Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
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

/*
 * Retail Plugin: Order Management: Splits large image requests into multiple smaller ones
 */

s_prod_arr=new Array();
s.checkProd=function(){
  var s_prodarray=s.split(s.products,',');
  if (s_prodarray.length>15){
      s.products=s_prodarray.slice(0,15);
      s_prodarray=s_prodarray.slice(15,90);
      var i=0;
      while(s_prodarray.length>0){
        s_prod_arr[i]=s_prodarray.slice(0,15);
        s_prodarray=s_prodarray.slice(15);
        i++;
      }
  }
}

s.sendExtra=function(p){
  var i=0;
  var s = s_gi(s_account);
  while (s_prod_arr[i]){
      s.linkTrackVars="events,purchaseID,products";
      s.linkTrackEvents="purchase,event49"
      s.events="purchase,event49";
      s.products=s_prod_arr[i];
      s.purchaseID=p+"_"+(i+2);
      s.tl(this, 'o','long product string');
      i++;
  }
}