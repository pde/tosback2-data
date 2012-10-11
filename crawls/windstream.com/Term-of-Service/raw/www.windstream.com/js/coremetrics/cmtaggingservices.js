/************************************************************************************/
/* $Revision: $
 * $Id: $
 *
 * Author: Coremetrics/PSD 
 * Coremetrics  v1.0, 2010/06/02
 * COPYRIGHT 1999-2008 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 * Disclaimer: Coremetrics is not responsible for hosting or maintenance or this file
 *
 */
/************************************************************************************/
var cm_TrackImpressions = "";
/*===========================GLOBAL VARIABLES ===============================*/
// options for debug mode when sending tag:
// 1: only alert
// 2: only send tag
// 3: alert & send tag
var G_PS_DEBUG_MODE 		= 2;

var G_PS_ARR_DOMAIN = new Array("windstream.com");//value must be one array of domains or null

// current page url
var G_PS_URL_PATH 			= "" + document.location.href.toLowerCase();
var G_PS_PATHNAME 			= document.location.pathname.toLowerCase();
var G_PS_QUERYSTRING 		= document.location.search.toLowerCase();
var G_PS_URL_REFERRER 		= document.referrer.toLowerCase();
var G_PS_COOKIE_LIFETIME 	= 432000; // 5*24*60*60 = 5 days
// cookie name
var G_PS_COOKIE_CATID 		= "PS_CATID";
var G_PS_COOKIE_PROD_CATID 	= "PS_PROD_CATID";
var G_PS_COOKIE_PROD_NAME 	= "PS_PROD_NAME";
var G_PS_COOKIE_PROFILE 	= "PS_PROFILE";
var G_PS_COOKIE_FLAG 		= "PS_FLAG";		// used as a "session" variable to handle events between pages
/*========================= END GLOBAL VARIABLES =============================*/

/*=========================== BEGIN NAVIGATION ===============================*/
// Navigation logic should go here!
if (G_PS_URL_PATH.search(/quitcablenow/) > -1) 
{
	//alert(G_PS_URL_PATH.search(/quitcablenow/));
	
	psCreatePageviewTag("quitcablenow", "residential", null, null);
}
else if (G_PS_URL_PATH.search(/quitcablesavemoney/) > -1) 
{
	cm_TrackImpressions = "R";
	psCreatePageviewTag("quitcablesavemoney", "residential", null, null);
}
else if (G_PS_URL_PATH.search(/quitnowsavemoney/) > -1) 
{
	psCreatePageviewTag("quitnowsavemoney", "residential", null, null);
}
/*else if(G_PS_PATHNAME.search(/^\/(default.aspx)/)>-1 || G_PS_PATHNAME=='/')
{	
	psCreatePageviewTag("residential-home","residential",null,null);
}*/
/******RM - 08/22/2011 - CAPP**************/
else if(G_PS_URL_PATH.search(/capp/) > -1 )
    psCreatePageviewTag("customer-account-protection-plan", "residential", null, null);
/******RM - 06/30/2011 - Q3 promo*************
else if (G_PS_PATHNAME == '/quit/')
    psCreatePageviewTag("switcher promo - oklahoma - new customers", "residential", null, null);
else if (G_PS_PATHNAME == '/quitnow/')
    psCreatePageviewTag("switcher promo - kentucky - new customers", "residential", null, null);
else if (G_PS_PATHNAME == '/save/')
    psCreatePageviewTag("switcher promo - oklahoma - existing customers", "residential", null, null);
else if (G_PS_PATHNAME == '/savenow/')
    psCreatePageviewTag("switcher promo - kentucky - existing customers", "residential", null, null);
*****RM - 10/03/2011 - Q4 promo**************/
else if (G_PS_PATHNAME == '/3free/')
{
	cm_TrackImpressions = "R";    
	psCreatePageviewTag("3free", "residential", null, null);
}
else if (G_PS_PATHNAME == '/lifetime/')
{
	cm_TrackImpressions = "R";    
	psCreatePageviewTag("lifetime", "residential", null, null);
}
else if (G_PS_PATHNAME == '/lastchance/')
{
	cm_TrackImpressions = "R";    
	psCreatePageviewTag("lastchance", "residential", null, null);
}
/********RM - 12/21/2011 Q1 2012 promos*************/
else if(G_PS_PATHNAME=='/300/')
{	
	cm_TrackImpressions = "R";  
	psCreatePageviewTag("300promo","residential",null,null);
}
else if(G_PS_PATHNAME=='/200/')
{	
	cm_TrackImpressions = "R";  
	psCreatePageviewTag("200promo","residential",null,null);
}
else if(G_PS_PATHNAME=='/nosuchoffer.aspx')
{	
	psCreatePageviewTag("nosuchoffer","residential",null,null);
}
else if(G_PS_PATHNAME=='/contentremoved.aspx')
{	
	psCreatePageviewTag("contentremoved","residential",null,null);
}
/**********************************************/
else if (G_PS_PATHNAME == '/bluraysetup/') {
    psCreatePageviewTag("bluray-setup", "Support", null, null);
}
else if (G_PS_PATHNAME == '/modemrebate/') {
    psCreatePageviewTag("modem-rebate", "Company", null, null);
}
else if (G_PS_PATHNAME == '/choose_the_right_internet_speed/') {
    psCreatePageviewTag("choose-the-right-internet-speed", "Support", null, null);
}
else if (G_PS_PATHNAME == '/gigaset_4300_modem_setup/') {
    psCreatePageviewTag("modem-setup", "Support", null, null);
}
else if (G_PS_PATHNAME == '/residential/customer-support-and-repairs/how-to-videos.html') {
    psCreatePageviewTag("how-to-videos", "Support", null, null);
}
else if (G_PS_PATHNAME == '/sagem_router_video/') {
    psCreatePageviewTag("sagem-video", "Support", null, null);
}
else if (G_PS_PATHNAME.search(/\/product\.aspx/gi) > -1){
    psCreatePageviewTag("product-results", "residential", null, null);
}
else if (G_PS_PATHNAME == '/aboutwebmail/') {
    psCreatePageviewTag("about-webmail", "Company", null, null);
}
else if (G_PS_PATHNAME.search(/\/search\.aspx/gi) > -1){
    psCreatePageviewTag("search", "residential", null, null);
}
else if (G_PS_PATHNAME == '/residential/service-order-and-equipment-shopping.html')
{	
	cm_TrackImpressions = "R";
	psCreatePageviewTag("service-order-and-equipment-shopping","residential",null,null);
}
else if(G_PS_PATHNAME=='/discover.aspx' || G_PS_PATHNAME=="/discover-windstream/index.html")
{	
	psCreatePageviewTag("discover","residential",null,null);
}
else if(G_PS_PATHNAME=='/welcometowindstream.aspx')
{	
	psCreatePageviewTag("welcome-iowa-minnesota-customers","support",null,null);
}
else if(G_PS_PATHNAME=='/residential/customer-support-and-repairs/index.html')
{	
	cm_TrackImpressions = "R";
	psCreatePageviewTag("customer-support-and-repairs","residential",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/security-bundle\/([^\/\.]+)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1+'-security-bundle',"residential bundles",null,null);
}
else if (G_PS_PATHNAME == '/residential/security/comparepackages.html') {
    psCreatePageviewTag("compare-security-packages", "residential bundles", null, null);
}
/********************************/
else if(G_PS_PATHNAME.search(/^\/residential\/digital-tv-programming-channels\/([^\/\.]+)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"digital tv",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/(compare-dish-satellite-tv-service-and-costs)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"digital tv",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/(tv-phone-internet-double-play|tv-phone-internet-triple-play)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"residential bundles",null,null);
}
else if(G_PS_PATHNAME.search(/^\/bundle-?builder/gi)>-1)
{
	psCreatePageviewTag("bundle-builder","residential bundles",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/(digital-tv-programming-channels|home-phone-calling-plans|home-phone-tv-dsl-service-bundles|broadband-internet-service)(\/|\.aspx|\.html)/gi)>-1)
{
	
	if (G_PS_PATHNAME.search(/^\/residential\/(broadband-internet-service)(\/|\.aspx|\.html)/gi)>-1)
		cm_TrackImpressions = "R";
	psCreatePageviewTag(RegExp.$1,"shop",null,null);
		
}
else if(G_PS_PATHNAME == '/hsi.aspx')
{
	cm_TrackImpressions = "R";
	psCreatePageviewTag("broadband-internet-service-B", "shop", null, null);	
}
else if(G_PS_PATHNAME.search(/^\/residential\/(greenstreak-[\d]+mpbs-highspeed-dsl-home-internet|broadband-internet-security-and-protection|easy-install-home-network|secure-online-backup-and-storage|computer-help-and-technical-support|compare-highspeed-dsl-to-cable)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"high-speed internet",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/(home-phone-calling-long-distance|unlimited-long-distance-calling)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"phone plans",null,null);
}
else if(G_PS_PATHNAME.search(/^\/company\/(suppliers-[^\/\.]+)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"suppliers",null,null);
}
else if(G_PS_PATHNAME.search(/^\/company\/(coverage|windstream-overview|history|tariffs|suppliers)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"company overview",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/discover-windstream\/(high-speed-internet|digital-tv|phone-plans)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"services",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/discover-windstream\/(lifetime-price-guarantee|landline-most-reliable-home-phone|community-partners-and-programs)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"commitment",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/discover-windstream\/(customer-commitment|the-lifetime-tour|windstream-services)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"discover",null,null);
}
else if(G_PS_PATHNAME.search(/^\/company\/(job-search|why-windstream|getting-started|employee-referrals)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"careers",null,null);
}
else if(G_PS_PATHNAME.search(/^\/company\/(careers|about-windstream)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"company",null,null);
}
else if(G_PS_PATHNAME.search(/^\/company\/(retail-stores-and-payment-locations)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag('payment-options',"support",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/(customer-support-and-repairs\/account-billing)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag('payment-options',"support",null,null);
}
else if(G_PS_PATHNAME.search(/^\/ecommerce\/customer\/promptforlogin.aspx.*/gi)>-1)
{
	psCreatePageviewTag('prompt-for-login','residential',null,null);
}
//else if(G_PS_PATHNAME.search(/^\/ecommerce\/customer\/checkifexisting.aspx.*/gi)>-1)
else if(G_PS_PATHNAME.search(/^\/shoppinggateway.aspx.*/gi)>-1)
{
    psCreatePageviewTag('customer-type-prompt','Residential Checkout',null,null);
}
else if(G_PS_PATHNAME.search(/^\/(privacy|legal)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"global",null,null);
}
else if(G_PS_PATHNAME=='/terms.aspx')
{
	psCreatePageviewTag('terms-of-use',"global",null,null);
}
else if(G_PS_PATHNAME.search(/^\/(sitemap)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag('residential-sitemap',"residential",null,null);
}
else if(G_PS_PATHNAME.search(/^\/support\/stores.aspx/gi)>-1)
{
	psCreatePageviewTag('payment-locator',"support",null,null);
}
else if(G_PS_PATHNAME.search(/^\/support\/PaymentAssistance.aspx/gi) > -1)
{
	psCreatePageviewTag('payment-assistance',"support",null,null);
}
else if(G_PS_PATHNAME=='/Support/PaymentOptions.aspx?id=208')
{
	psCreatePageviewTag('payment-options',"support",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/customer-support-and-repairs\/(contact|high-speed-internet|digital-tv|phone-service|faqs)(\/|\.aspx|\.html)/gi)>-1)
{
	pid = RegExp.$1;
	if (pid == 'high-speed-internet') { pid = 'high-speed-internet-support';}
	psCreatePageviewTag(pid,"support",null,null);
}
else if(G_PS_PATHNAME=='/residential/discover-windstream/classroom-connections-school-computer-equipment.html')
{
	psCreatePageviewTag('classroom-connections-school-computer-equipment','community',null,null);
}
else if(G_PS_PATHNAME.search(/^\/(forever|lifetime|movers)/))
{
	psCreatePageviewTag(RegExp.$1,'residential',null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/(lifetime-price-guarantee)\//gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"lifetime-price-guarantee",null,null);
}
else if(G_PS_PATHNAME.search(/^\/residential\/([^\/\.]+)(\/|\.aspx)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,"Residential",null,null);
}
else if(G_PS_PATHNAME.search(/\/(product|ecommerce\/customer\/promptforlogin)(\/|\.aspx|\.html)/gi)>-1)
{
	psCreatePageviewTag(RegExp.$1,'residential',null,null);
}
else if(G_PS_PATHNAME.search(/^\/([^\/\.]+)(\.aspx|\/default\.aspx|\/)$/gi)>-1 && G_PS_PATHNAME.search(/^\/support\//gi)<0 && G_PS_PATHNAME.search(/^\/careers\//gi)<0)
{
	psCreatePageviewTag(RegExp.$1,"residential",null,null);
}
else if(G_PS_PATHNAME=="/about/newsdetail.aspx")
{
	var pSpanElem = psGetElementsByClassName(document,"span","newsItemHeadlineFullArticle");
	if(psCheckArrayExist(pSpanElem))
	{
		pPageId = pSpanElem[0].innerHTML;
	}
	psCreatePageviewTag(pPageId,"newsdetail",null,null);
}
else if(G_PS_PATHNAME.search(/^\/([^\/\.]+)\/([^\/\.]+)\.(html|aspx)/gi)>-1)
{
	var pSuppliersElem = document.getElementById("suppliers");
	if(psCheckElementExist(pSuppliersElem) && pSuppliersElem.innerHTML.toLowerCase().indexOf("thank you")>-1)
	{
		psCreatePageviewTag("Thank you",RegExp.$2,null,null);
	}
	else
		psCreatePageviewTag(RegExp.$2,RegExp.$1,null,null);
}
else if(G_PS_PATHNAME.search(/^\/([^\/\.]+)[\/]+([^\/\.]+)\/([^\/\.]+)\.html/gi)>-1)
{
	psCreatePageviewTag(RegExp.$3,RegExp.$2,null,null);
}
else if(G_PS_PATHNAME.search(/^\/support\//gi)>-1)
{
	var pPageId = "contact us";
	if(G_PS_URL_PATH.search(/tab\=1/gi)>-1)
		pPageId = "billing";
	if(G_PS_URL_PATH.search(/\/faqs\.aspx/gi)>-1)
		pPageId = "faqs";
	if(G_PS_URL_PATH.search(/\/default\.aspx\?tab\=(\d+)/gi)>-1)
	{
		switch (RegExp.$1)
		{
			case "1" : pPageId = "billing"; 					break;
			case "2" : pPageId = "faqs"; 						break;
			case "3" : pPageId = "useful calling features";		break;
			case "4" : pPageId = "find a store";				break;
			case "5" : pPageId = "internet support";			break;
		}
	}
	psCreatePageviewTag(pPageId,"support",null,null);
}
else if(G_PS_PATHNAME.search(/^\/careers\//gi)>-1)
{
	var pPageId = "why windstream";	
	if(G_PS_PATHNAME.search(/\/searchApply\.aspx/gi)>-1)
	{
		pPageId = "seach jobs for apply";		
		var pTopHeaderElem = psGetElementsByClassName(document,"p","TopHeader");
		if(!psCheckArrayExist(pTopHeaderElem))
		{
			 pTopHeaderElem = psGetElementsByClassName(document,"span","TopHeader");
		}
		if(psCheckArrayExist(pTopHeaderElem))
			pPageId = psGetInnerText(pTopHeaderElem[0]);
	}
	if(G_PS_URL_PATH.search(/\/default\.aspx\?tab\=(\d+)/gi)>-1)
	{
		switch (RegExp.$1)
		{
			case "1" : pPageId = "getting stated";				break;
			case "2" : pPageId = "seach jobs for apply";		break;
			case "3" : pPageId = "referrals & awards";			break;
		}
	}
	psCreatePageviewTag(pPageId,"careers",null,null);
}
else if (psIsSearchView())
{
	psPostSearchView();
}
/*Sub domain news.windstream.com*/
else if(psGetDomain(G_PS_URL_PATH).search(/news\.windstream\.com/gi)>-1 || psIsNewsSubdomain())
{	
	psPostSubDomainNewsView();
}
/*Sub domain ebill.windstream.com*/
else if(psGetDomain(G_PS_URL_PATH).search(/ebill\.windstream\.com/gi)>-1)
{
	psPostSubDomainEbillView();
}
/*Sub domain orderpage.windstream.com*/
else if(psGetDomain(G_PS_URL_PATH).search(/orderpage\.windstream\.com/gi)>-1)
{
	psPostSubDomainOrderpageView();
}
/*Sub domain recruitmax.windstream.com*/
else if(psGetDomain(G_PS_URL_PATH).search(/recruitmax\.windstream\.com/gi)>-1)
{
	psPostSubDomainRecruitmaxView();
}
else
{	
	psCreatePageviewTag(G_PS_PATHNAME, "ADD URL"); // Other pages go to "ADD URL" category
}

/*
 * Determine if the page is the search result page
 */
function psIsSearchView()
{
	if(G_PS_PATHNAME=="/search_results.cfm" || G_PS_PATHNAME=="/recruitmax/candidates/jobslist.cfm")
		return true;
	return false;
}

function psIsNewsSubdomain()
{
	var pSidebarContainer = document.getElementById("sidebarContainer");
	if(psCheckElementExist(pSidebarContainer))
	{
		if(pSidebarContainer.innerHTML.search(/Media\sContacts/gi)>-1)
			return true;		
	}
	return false;
}
/*============================ END NAVIGATION ================================*/


/*===================== BEGIN TAGGING BUSSINESS LOGIC ========================*/
function psPostSubDomainNewsView()
{	
	if(G_PS_PATHNAME.search(/^\/(section|article)_display\.cfm/gi)>-1 || G_PS_PATHNAME.search(/^\/(news|executives)\//gi)>-1 || G_PS_PATHNAME=="/index.cfm" || G_PS_PATHNAME=="/")
	{	
		var pPageId = psGetFirstH1ValueFromElementId("copyContent");
		if(G_PS_PATHNAME!="/article_display.cfm")
			psCreatePageviewTag(pPageId,"News : Home",null,null);
		else
		{		
			var pCatId = pPageId;
			var pH2Tag = psGetElementsByClassName(document,"h2","inline");
			if(psCheckArrayExist(pH2Tag))
			{
				pPageId = psGetInnerText(pH2Tag[0]);
			}
			psCreatePageviewTag(pPageId,pCatId,null,null);
		}
	}
	else if(G_PS_PATHNAME.search(/^\/([^\/\.]+)\./gi)>-1)
	{		
		psCreatePageviewTag(psGetFirstH1ValueFromElementId("columnContent"),"News : Home",null,null);
	}
}

function psPostSubDomainEbillView()
{
	if(G_PS_PATHNAME.search(/^\/([^\/\.]+)$/gi)>-1)
	{
		var pBlue18bElem = psGetElementsByClassName(document,"font","blue18b");
		if(psCheckArrayExist(pBlue18bElem))
		{
			psCreatePageviewTag(psGetInnerText(pBlue18bElem[0]),"Ebill : home",null,null);
		}		
	}
	else if(G_PS_PATHNAME.search(/^\/html\/([^\/\.]+)\.htm/gi)>-1)
	{
		var pPgHeaderElem = psGetElementsByClassName(document,"font","pgheader");
		if(psCheckArrayExist(pPgHeaderElem))
		{
			psCreatePageviewTag(psGetInnerText(pPgHeaderElem[0]),"Ebill : home",null,null);
		}
	}
}

function psPostSubDomainOrderpageView()
{
	if(G_PS_PATHNAME.search(/^\/([^\/\.]+)\/$/gi)>-1)			
		psCreatePageviewTag(RegExp.$1,"Orderpage : home",null,null);				
	else if(G_PS_PATHNAME.search(/^\/([^\/\.]+)\/([^\/\.]+)\./gi)>-1)
		psCreatePageviewTag(RegExp.$2,RegExp.$1,null,null);
	else if(G_PS_PATHNAME.search(/^\/([^\/\.]+)\/([^\/\.]+)\/$/gi)>-1)
		psCreatePageviewTag(RegExp.$2,RegExp.$1,null,null);
	else if(G_PS_PATHNAME.search(/^\/([^\/\.]+)\/([^\/\.]+)\/([^\/\.]+)\./gi)>-1)
		psCreatePageviewTag(RegExp.$3,RegExp.$1,null,null);
}

function psPostSubDomainRecruitmaxView()
{
	if(G_PS_PATHNAME.search(/^\/([^\/\.]+)\/([^\/\.]+)\/([^\/\.]+)\./gi)>-1)
	{
		var pHeaderElemTag = "span";
		if(G_PS_PATHNAME.search(/\/jobopps\.cfm/gi)>-1)
		{
			pHeaderElemTag = "p";
			psHijackSearchRecruit();
		}
		var pTopHeaderElem = psGetElementsByClassName(document,pHeaderElemTag,"TopHeader");
		if(psCheckArrayExist(pTopHeaderElem))
		{
			psCreatePageviewTag(psGetInnerText(pTopHeaderElem[0]),"recruitmax : home",null,null);
		}
		else
			psCreatePageviewTag("HR Login","recruitmax",null,null);
	}
	else if(G_PS_PATHNAME.search(/^\/([^\/\.]+)\/([^\/\.]+)\./gi)>-1)
	{	
		var pCatId = RegExp.$1
		var pPageId = "";
		if(RegExp.$2!="login-recs")
			pPageId = RegExp.$2;
		else
		{
			if(G_PS_QUERYSTRING.search(/type\=M/gi)>-1)
				pPageId="Hiring Manager Login";
			else
				pPageId="Internal Job Posting";
		}	
		psCreatePageviewTag(pPageId,pCatId,null,null);
	}
}

function psPostSearchView()
{
	// Your logic of throwing pageview tag for search functionalities goes here
	var pPageId 	= null;
	var sTerm 		= "";
	var sResult 	= 0;
	var sPageNum 	= 1;
	if(G_PS_PATHNAME=="/search_results.cfm")
	{
		var pColumnContainerElem = document.getElementById("columnContainer");
		if(psCheckElementExist(pColumnContainerElem))
		{
			var pResultContent = pColumnContainerElem.innerHTML.toLowerCase();
			if(pResultContent.search(/results\sper\spage/gi)>-1)
			{
				pResultContent = pResultContent.substring(pResultContent.indexOf("results per page:"),pResultContent.indexOf("results were found"));
				if(pResultContent.search(/href\=\"(.+)\"/gi)>-1)			
					sTerm = psGetValueFromUrl(RegExp.$1,"keywords");
				sResult = psTrim(pResultContent.substring(pResultContent.lastIndexOf("<p>")+3));
				var pStart = psGetValueFromUrl(G_PS_QUERYSTRING,"start");
				var pPage = psGetValueFromUrl(G_PS_QUERYSTRING,"page");
				if(pStart!=null && pStart!="null" && pStart!="" && pPage!=null && pPage!="null" && pPage!="")
				{
					sPageNum = (pStart - (pStart % pPage))/pPage + 1;
				}
				pPageId = "SEARCH SUCCESSFUL PAGE "+sPageNum;
			}	
			else
				pPageId = "SEARCH UNSUCCESSFUL";
			psCreatePageviewTag(pPageId,"News : SEARCH",sTerm,sResult);		
		}
	}
	else
	{
		var pHtmlContentElem = psGetElementsByClassName(document,"p","htmlContent");
		if(psCheckArrayExist(pHtmlContentElem))
		{
			if(pHtmlContentElem[0].innerHTML.search(/Search\sResults\:\s(\d+)/gi)>-1)
				sResult = RegExp.$1;
		}
		var pTablePurple =  psGetElementsByClassName(document,"table","purple");
		if(psCheckArrayExist(pTablePurple))
		{
			var pTableElem = pTablePurple[0].getElementsByTagName("table");
			if(psCheckArrayExist(pTableElem))
			{				
				var pStrTable = psCleanPageId(pTableElem[0].innerHTML);
				var pStrAPartTable = pStrTable.substring(pStrTable.length/10,pStrTable.length/10+50);
				psSetValueToCookie(G_PS_COOKIE_FLAG,"CurrentSearchPage",pStrAPartTable);
				if(pStrAPartTable.toLowerCase()!=psGetValueFromCookie(G_PS_COOKIE_FLAG,"SearchPage").toLowerCase())
				{
					if(psGetValueFromCookie(G_PS_COOKIE_FLAG,"SearchPage")!=null && psGetValueFromCookie(G_PS_COOKIE_FLAG,"SearchPage")!="")
						psSetValueToCookie(G_PS_COOKIE_FLAG,"SearchTerm","");
					psSetValueToCookie(G_PS_COOKIE_FLAG,"SearchPage",pStrAPartTable);				
				}
				if(psGetValueFromCookie(G_PS_COOKIE_FLAG,"SearchTerm")!=null && psGetValueFromCookie(G_PS_COOKIE_FLAG,"SearchTerm")!="")		
						sTerm = psGetValueFromCookie(G_PS_COOKIE_FLAG,"SearchTerm");									
				else
				{
					var pRows = pTableElem[0].rows;
					if(pRows.length>=2)
					{
						var pCells = pRows[1].cells;
						if(pCells.length>=3)
							if(pCells[2].innerHTML.search(/href\=\".+szSearchWords=(.+)\"/gi)>-1)
								sTerm = RegExp.$1;
					}
				}
			}	
		}
		sTerm = (sTerm == null || sTerm == "")? "All" : sTerm;
		if(sResult!=0)
			pPageId = "SEARCH SUCCESSFUL PAGE "+sPageNum;
		else
			pPageId = "SEARCH UNSUCCESSFUL";
		psCreatePageviewTag(pPageId,"Recruitmax : SEARCH",sTerm,sResult);
	}
}

function psHijackSearchRecruit()
{
	var pFormElem = document.getElementsByTagName("form");
	if(psCheckArrayExist(pFormElem))
	{
		for(i=0;i<pFormElem.length;i++)
		{
			if(pFormElem[i].action.search(/Jobslist\.cfm\?szFormat\=search/gi)>-1)
			{
				pFormElem[i].oldFunc = pFormElem[i].onsubmit;
				pFormElem[i].onsubmit = function()
				{
					psSetValueToCookie(G_PS_COOKIE_FLAG,"SearchPage","");
					var pSearchTerm = "All";
					var pTxtKeyWord = document.getElementById("txtKeyWord");
					if(psCheckElementExist(pTxtKeyWord))
					{
						pSearchTerm 	= (psGetElementValue(pTxtKeyWord)==null || psGetElementValue(pTxtKeyWord)=="") ? "All" : psGetElementValue(pTxtKeyWord);						
					}
					var pSelectElem = document.getElementsByTagName("select");
					if(psCheckArrayExist(pSelectElem))
					{
						for(j=0;j<pSelectElem.length;j++)
						{
							var pAnSelect 	= psGetElementValue(pSelectElem[j],true)=="" ? " " : psGetElementValue(pSelectElem[j]) ;
							pSearchTerm 	= pSearchTerm+"-_-"+pAnSelect;
						}
						while(pSearchTerm.substring(pSearchTerm.length-4,pSearchTerm.length)=="-_- ")
						{
							pSearchTerm = pSearchTerm.substring(0,pSearchTerm.length-4);
						}
					}
					psSetValueToCookie(G_PS_COOKIE_FLAG,"SearchTerm",pSearchTerm);
					if(this.oldFunc!=null)
						return this.oldFunc();
				}
				break;
			}
			
		}
	}
}
/*====================== END TAGGING BUSSINESS LOGIC =========================*/

/*======================= GENERAL UTILITY FUNCTION ===========================*/
/* PURPOSE: constructor for product
 * Note: you can add more methods to psProduct in its prototype
 * RETURN: none
 */
function psProduct()
{
    this.id = null;
    this.name = null;
    this.catId = null;
    this.price = null;
    this.quantity = null;

	this.reset = function()
	{
		this.id = null;
		this.name = null;
		this.catId = null;
		this.price = null;
		this.quantity = null;
	}
	/*
	 * Extracting product info from source code for posting productview tag
	 */
	this.getProduct = function()
	{
		try
		{
			this.reset(); // DO NOT REMOVE THIS IMPORTANT STATEMENT!
			/*
			 * this.id = <from URL or source code>
			 * this.name = <from source code>
			 // In most cases, catId is retrived from cookie G_PS_COOKIE_CATID as follows:
			 * this.catId = psGetCookie(G_PS_COOKIE_CATID);
			 */
			// Store productId along with catId to cookie for use later in shop5 and shop9 views
			psSetValueToCookie(G_PS_COOKIE_PROD_CATID, this.id, this.catId);

			return true;
		}
		catch (ex) { return false; }
	}
	/*
	 * Extracting product info from source code specified by the "current" row
	 * of items table in the shopping cart
	 */
	this.getItem5 = function(itemRow)
	{
		try
		{
			this.reset(); // DO NOT REMOVE THIS IMPORTANT STATEMENT!
			/*
			 * this.id = <from itemRow>
			 * this.name = <from itemRow>
			 * this.price = <from itemRow>
			 * this.quantity = <from itemRow>
			 // In most cases, catId is retrived from cookie G_PS_COOKIE_PROD_CATID as follows:
			 * this.catId = psGetValueFromCookie(G_PS_COOKIE_PROD_CATID, this.id);
			 */
			 return true;
		}
		catch (ex) { return false; }
	}
	/*
	 * Extracting product info from source code specified by the "current" row
	 * of items table in the receipt page
	 */
	this.getItem9 = function(itemRow)
	{
		try
		{
			this.reset(); // DO NOT REMOVE THIS IMPORTANT STATEMENT!
			/*
			 * this.id = <from itemRow>
			 * this.name = <from itemRow>
			 * this.price = <from itemRow>
			 * this.quantity = <from itemRow>
			 // In most cases, catId is retrived from cookie G_PS_COOKIE_PROD_CATID as follows:
			 * this.catId = psGetValueFromCookie(G_PS_COOKIE_PROD_CATID, this.id);
			 */
			 return true;
		}
		catch (ex) { return false; }
	}
}

/* PURPOSE: constructor for profile
 * Note: you can add more methods to psProfile in its prototype
 * RETURN: none
 */
function psProfile()
{
	this.cusId = null;
    this.email = null;
    this.city = null;
    this.state = null;
    this.zipcode = null;
	this.newsletter = null;
	this.subscribe = null;
	/*
	 * Get user profile from cookie
	 */
	this.readProfile = function()
	{
		try
		{
			this.cusId = psGetCookie(G_PS_COOKIE_PROFILE);
			if (this.cusId != null)
			{
				var buf = this.cusId.split('|');
				for (var i=0; i<buf.length; i++)
				{
					var tempVal = buf[i];
					// when NULL is written to cookie, it becomes string, not literal constant
					buf[i] = (tempVal=="null" ? null : tempVal); 
				}
				this.cusId = buf[0];
				this.email = buf[1];
				this.city = buf[2];
				this.state = buf[3];
				this.zipcode = buf[4];
				this.newsletter = buf[5];
				this.subscribe = buf[6];
			}
			if (!this.cusId)
					this.cusId = psGenerateRandomValue();
			return true;
		}
		catch (ex) { return false; }
	}
	/*
	 * Set user profile to cookie
	 */
	this.writeProfile = function()
	{
		try
		{
			if (this.cusId == null)
				return;
			// make sure that the data contains 4 parts separated by 3 '|'
			var data = this.cusId + "|" + this.email + '|' + this.city + '|' + this.state + '|' 
				+ this.zipcode + "|" + this.newsletter + '|' + this.subscribe;
			// store on cookie
			psSetCookie(G_PS_COOKIE_PROFILE, data);
			//
			// NOTE: To persist profile as persistent cookie, pass G_PS_COOKIE_LIFETIME as the third param instead of null
			// psSetCookie(G_PS_COOKIE_PROFILE, data, G_PS_COOKIE_LIFETIME);
			//
			return true;
		}
		catch (ex) { return false; }
	}
}

/*
 * Order object encapsulates order Id, subtotal, shipping and customer Id
 * This design is aimed at code resuse and easy readability
 */
function psOrder()
{
	this.id = null;
	this.subtotal = null;
	this.shipping = null;
	/*
	 * get order info from source code
	 */
	this.getOrder = function()
	{
		try
		{
			/*
			 * this.id = <from source code>
			 * this.subtotal = <from source code>
			 * this.shipping = <from source code>
			 */
			if (!this.id)
				this.id = psGenerateRandomValue();
			/*
			 * Extract user profile from source code
			 */
			var uP = new psProfile();
			uP.readProfile();  // Ensure to get the customer Id & email persisted at login stage
			/*
			 * uP.city = <from source code>
			 * uP.state = <from source code>
			 * uP.zipcode = <from source code>
			 * uP.newsletter = <from source code>
			 * uP.subscribe = <from source code>
			 */
			 if (!uP.cusId)
				uP.cusId = psGenerateRandomValue();
			return uP.writeProfile(); // Persist profile for later use at Receipt stage
		}
		catch (ex) {return false;}
	}
}

/* PURPOSE: Compare case-insensitive strings
 * RETURN: true: strings are not null and the same
 *         false: any of the string is null or not the same
 */
function psIsEqual()
{
	for (var i=0; i<arguments.length; i++)
	{
		if(arguments[0] == null || arguments[i] == null)
		{
			return false;
		}
		else if(arguments[0].toUpperCase() != arguments[i].toUpperCase())
		{
			return false;
		}
	}
	return true;
}

/* PURPOSE: Get inner text of an object or remove html tags of a particular string
 *          work properly even when the designated tag/text has script tag inside
 * RETURN: resultant string or null object
 */
function psGetInnerText(pTagOjb){
	var pattern = /<script[\s\S]*?<\/script>/gi; // question mark means non-greedy
	if (pTagOjb != null)
	{
		var sT = (typeof(pTagOjb) == "object") ? pTagOjb.innerHTML : pTagOjb;
		// remove all script tags and its content
		while (sT.search(pattern) > -1)
		{
			sT = sT.replace(pattern, "");
		}
		return sT.replace(/\<+.+?\>+/g, "");
	}
	return null;
}

/* PURPOSE: Remove all unaccepted characters in categoryid, including
 * [, ', ", :, comma,]
 * RETURN: string
 */
function psCleanCatId(pCatId)
{
    return (pCatId != null) ? pCatId.replace(/[\'\":,\™\®]/g, "") : null;
}

function psCleanPageId(pPageId)
{
	return (pPageId != null) ? pPageId.replace(/[\n\t\v\r’\'\"\™\®]/gi, "") : null; 
}

function psCleanProductName(pProductName)
{
	return (pProductName != null) ? pProductName.replace(/[\n\t\v\r’\'\"\™\®]/gi, "") : null; 
}

/* PURPOSE: Remove all leading & trailing spaces of a string
 * Note: [&nbsp;] is also considered as a space
 * RETURN: string
 */
function psTrim(pStr)
{
	if (pStr == null || typeof(pStr) != "string")
		return pStr;
	return (pStr != null) ? pStr.replace(/&nbsp;|\u00A0/gi, ' ').replace(/^\s+|\s+$/g, '') : null;
}

/* PURPOSE: extract value from the URL
 * in format of http://xxx.com/page.ext?key1=value1&key2=value2
 * or key1=value1&key2=value2
 * RETURN: string value of the parameter
 */
function psGetValueFromUrl(pUrl, pKey)
{
	pUrl = (pUrl != null) ? "?" + psTrim(pUrl.toLowerCase()) : null;
	pKey = (pKey != null) ? psTrim(pKey.toLowerCase()) : null;

	if (pUrl == null || pKey == null || pUrl.indexOf(pKey) == -1) 
		return null;
	
	var start = pUrl.indexOf('&' + pKey + '=');
	start = (start == -1) ? pUrl.indexOf('?' + pKey + '=') : start;
	if (start >= 0)
	{
		start = start + pKey.length;
		var end = pUrl.indexOf("&", start);
		if(end == -1) 
			end = pUrl.length;
		var middle = pUrl.indexOf("=", start);
		return pUrl.substring(middle + 1, end);
	}
	return null;
}

/* PURPOSE: returns the value of an element based on element_id
 * @pValueFlag: TRUE means VALUE  attribute of SELECT object returned, not innerHTML
 * RETURN: 
 *  Normal tag: decoded innerHTML
 *  INPUT tag: value attribute
 *  SELECT tag: decoded label of the selected option
 */
function psGetElementValueById(pTagId, pValueFlag)
{
    var tag = document.getElementById(pTagId);
    return psGetElementValue(tag, pValueFlag);
}

/* PURPOSE: returns the value of an element based on element object
 * Note: this function returns decoded text
 * to avoid "double" decode, don't invoke psHtmlDecode on returned value again
 * @pValueFlag: TRUE means VALUE  attribute of SELECT object returned, not innerHTML
 * RETURN: 
 *  Normal tag: decoded innerHTML
 *  INPUT tag: value attribute
 *  SELECT tag: decoded label of the selected option
 *  NULL: if element not exist
 */
function psGetElementValue(pTagObj, pValueFlag)
{
    var tagValue = null;
    if (pTagObj != null)
    {
        if (pTagObj.tagName.search(/^INPUT$/i) > -1)
            tagValue = pTagObj.value;
        else if (pTagObj.tagName.search(/^SELECT$/i) > -1)
        {
            if (pValueFlag == true)
                tagValue = pTagObj.options[pTagObj.selectedIndex].value;
            else
                tagValue = psHtmlDecode(pTagObj.options[pTagObj.selectedIndex].innerHTML);// return label instead of value
        }
        else
            tagValue = psHtmlDecode(pTagObj.innerHTML);
    }

    return tagValue;
}

/* PURPOSE: validate email format
 * RETURN: boolean
 */
function psCheckEmail(pEmail) 
{
    if (pEmail)
    {
        var i = pEmail.search(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        return (i > -1);
    }

    return false;
}

/* PURPOSE: convert special HTML characters to normal character
 * Note: for each project, this function needs to be updated
 * RETURN: decoded string
 */
function psHtmlDecode(pValue)
{
    if (pValue)
    {
        pValue = pValue.replace(/&nbsp;/gi, " ");
        pValue = pValue.replace(/&quot;/gi, '"');
        pValue = pValue.replace(/&amp;/gi, "&");
        pValue = pValue.replace(/&lt;/gi, "<");
        pValue = pValue.replace(/&gt;/gi, ">");
    }

    return pValue;
}

/* PURPOSE: extract main domain from the URL
 * RETURN: main domain
 */
function psGetMainDomain(pUrl){
	var se = /^https*\:\/\/([^\/\:]+)/gi;
	var domain = (pUrl.search(se) > -1) ? RegExp.$1 : null;
	if(domain != null)
	{
		if(domain.indexOf("www")==0)
		{
			domain = domain.substring(4,domain.length);
		}
		if(G_PS_ARR_DOMAIN != null)
		{
			for(var i =0; i<G_PS_ARR_DOMAIN.length; i++)
			{
				se = new RegExp("[\.]" + G_PS_ARR_DOMAIN[i] + "$","gi");
				if(("." + domain).search(se) > -1)
				{
					domain = G_PS_ARR_DOMAIN[i];
					break;
				}
			}
		}
		domain = "." + domain;
	}
	return domain;
	
}

/* PURPOSE: extract domain part in the URL
 * RETURN: domain
 */
function psGetDomain(pUrl){
    var se = /^https*\:\/\/([^\/\:]+)/gi;
    return (pUrl.search(se) > -1) ? RegExp.$1 : null;
}

/* PURPOSE: remove unnecessary characters (dollar sign, comma, quote, minus, etc) 
 * from price to make it work properly with parseFloat/parseInt
 * RETURN: well-formed price
 */
function psCleanPrice(pPrice)
{
	var pattern = /[^0-9\.]/gi;
    return (pPrice != null ? pPrice.toString().replace(pattern, "") : null);
}

/* PURPOSE: retrieve cookie value
 * RETURN: string
 */
function psGetCookie(pCookieName)
{
	var cookies = document.cookie;
	if (!pCookieName || !cookies)
		return null;

	cookies = "; " + cookies.toLowerCase();
	var key = "; " + pCookieName.toLowerCase() + "=";
	var start = cookies.lastIndexOf(key);
	if (start >= 0)
	{
		start = start + key.length;
		var end = cookies.indexOf(";", start);
		if (end == -1)
			end = cookies.length;

		return unescape(cookies.substring(start, end));
	}

    return null;
}

function psCookieBase(pCookieName, pCookieValue, pLifeTime)
{
	var pDomain = psGetMainDomain(G_PS_URL_PATH);
	CC(pCookieName, pDomain);//delete cookie by calling coremetrics's cookie function
	if(pLifeTime == "delete") 
	{         
		return true;
	}
	
	// set cookie by calling coremetrics's cookie function
	var expire = (pLifeTime) ? (new Date((new Date()).getTime() + (1000 * pLifeTime))).toGMTString() : null;
	
	return CB(pCookieName, escape(pCookieValue), expire, pDomain);
}

function encodeHtml(strValue)
{
	if (strValue!=null)
	{
		strValue = escape(strValue);
		strValue = strValue.replace(/\//g,"%2F");
		strValue = strValue.replace(/\?/g,"%3F");
		strValue = strValue.replace(/=/g,"%3D");
		strValue = strValue.replace(/&/g,"%26");
		strValue = strValue.replace(/@/g,"%40");
	}
	return strValue;
}

/* PURPOSE: set cookie value
 * Note: if the designated cookie is too big, the old items will be removed
 * because cookie size is limited to 4K
 * @pLifeTime in seconds
 * pDomain: don't specify if using current domain
 * RETURN: boolean
 */
function psSetCookie(pCookieName, pCookieValue, pLifeTime)
{
	if (!pCookieName)
	{
		return false;
	}
	
	pCookieValue = (pCookieValue==null)? "null":pCookieValue;
	
	if(pLifeTime != "delete")
	{
		pCookieName = psTrim(pCookieName);
		var oldCookieValue = psGetCookie(pCookieName);
		oldCookieValue = (oldCookieValue==null)? "null":oldCookieValue;
		var totalSize;
		if(document.cookie.indexOf(pCookieName)>-1)
		{
			totalSize =  document.cookie.length + encodeHtml(pCookieValue).length - encodeHtml(oldCookieValue).length;
		}
		else
		{
			totalSize =  document.cookie.length  + encodeHtml(pCookieValue).length + encodeHtml(pCookieName).length;
		}
		if(totalSize > 3500)
		{
			return false;
		}
	}
	psCookieBase(pCookieName,pCookieValue,pLifeTime);
}

/* PURPOSE: set value in cookie in format of:
 * #key1~value1#key2~value2
 * RETURN: string
 * NOTE: Use null or '' for pValue to remove the pair specified by pKey
 */
function psSetValueToCookie(pCookieName, pKey, pValue)
{
	if (!pCookieName || !pKey)
	{
		return false;
	}

	pCookieName = psTrim(pCookieName);
	pKey = (pKey != null) ? "#" + psTrim(pKey).toLowerCase() + "~" : pKey;
	var catCookie = psGetCookie(pCookieName);
	catCookie = (catCookie == null) ? "" : catCookie;
	pValue = (pValue == null) ? "null" : pValue;
	var oldCatCookie = catCookie;
	
	var start = catCookie.indexOf(pKey);
	
	var totalsize;
	if (start >= 0) // Store before -> remove the old value
	{
		var oldValue = psGetValueFromCookie(pCookieName,pKey.replace(/[\~\#]/gi,""));
		oldValue = (oldValue == null) ? "null" : oldValue;
		var end = catCookie.indexOf("#", start + pKey.length);
		if (end == -1)
			end = catCookie.length;
		catCookie = catCookie.replace(catCookie.substring(start, end), "");
		totalsize =  document.cookie.length  + encodeHtml(pKey).length + encodeHtml(pValue).length - encodeHtml(oldValue).length;
	}
	else
	{
		totalsize =  document.cookie.length  + encodeHtml(pKey).length + encodeHtml(pValue).length;  
		if(document.cookie.indexOf(pCookieName)<0)
		{
			totalsize += encodeHtml(pCookieName).length;
		}
	}
	catCookie = pKey + pValue + catCookie;
	var cookieArray = null;   
	//Check existed ?
	var count = 0; 
	while (totalsize > 3500 && count <1000)
	{
		var l1 = encodeHtml(catCookie).length;//length before pop
		cookieArray = catCookie.split("#");
		cookieArray.pop();
		catCookie = cookieArray.join("#");
		var l2 = encodeHtml(catCookie).length;//length after pop                                                        
		totalsize -=  (l1-l2);
		count ++;
	}   
	if(catCookie == null || catCookie == "")
	{
		catCookie = oldCatCookie;
	}
	// Save to cookie              
	psCookieBase(pCookieName, catCookie, G_PS_COOKIE_LIFETIME);
}

/* PURPOSE: get value stored in cookie in format of:
 * #key1~value1#key2~value2
 * RETURN: string
 */
function psGetValueFromCookie(pCookieName, pKey)
{
	// "normalize" input parameters
	pCookieName = psTrim(pCookieName);
	pKey = (pKey != null) ? "#" + psTrim(pKey).toLowerCase() + "~" : pKey;
	// extract catId associated with the specified key (pKey)
    var catCookie = psGetCookie(pCookieName);
    if (catCookie != null)
    {
        var start = catCookie.indexOf(pKey);
		if (start >=0 )
		{
			start = start + pKey.length;
			var end = catCookie.indexOf("#", start);
			if (end == -1)
				end = catCookie.length;
			return catCookie.substring(start, end);
		}
		return null;
    }
    return null;
}
/*
 * Check if array is exist or not
 */
function psCheckArrayExist(pArrElement)
{
    return (typeof(pArrElement) == "undefined" || pArrElement == null || pArrElement.length <= 0) ? false : true;
}

/*
 * Check an element exist or not
*/
function psCheckElementExist(pElement)
{
    return (typeof(pElement) == "undefined" || pElement == null) ? false : true;
}

/*
 * Get Element by Class Name of a Tag in a Document/Another Tag
 */
function psGetElementsByClassName(psDocument, psElementTagName, psClassName)
{
    var arrResult = new Array();
    var index = 0;
    var arrInputs = psDocument.getElementsByTagName(psElementTagName);
    if(arrInputs == null)
    {
        return null;
    }
    for(var i = 0; i < arrInputs.length; i ++ )
    {
        if(arrInputs[i].className.toLowerCase() == psClassName.toLowerCase())
        {
            arrResult[index ++ ] = arrInputs[i];
        }
    }
    return arrResult;
}

/*
 * Get the first Element by tag name
 */
function psGetElementByName(tagName,elementName){ //return only FIRST ELEMENT
	var tags = document.getElementsByTagName(tagName);
	if(psCheckArrayExist(tags)){
		for(var i=0; i<tags.length; i++){
			if(tags[i].name != null && tags[i].name.toLowerCase() == elementName.toLowerCase()){
				return tags[i];
			}
		}
	}
	return null;
}
/*
 * Get Value for Page ID from the Document Title 
 */
function psGetPageIdFromTitle()
{
	var title	= document.getElementsByTagName("title");
	return psCheckArrayExist(title) ? psGetInnerText(title[0]) : null ;
}

function psCleanHtmlTag(pValue)
{
    return (pValue != null) ? pValue.replace(/\<+.+?\>+/g, "") : null;
}

function psGetFirstH1ValueFromElementId(pElementId)
{
	var pValue = null;
	var pCopyContentElem = document.getElementById(pElementId);
	if(psCheckElementExist(pCopyContentElem))
	{
		var pH1Tag = pCopyContentElem.getElementsByTagName("h1");
		if(psCheckArrayExist(pH1Tag))
		{
			pValue = psCleanPageId(pH1Tag[0].innerHTML.toLowerCase().split("<br>")[0]);
		}
	}
	return pValue;
}
/*
 * Generate a random number
 */
function psGenerateRandomValue()
{
	var dtDate = new Date();
	var cusRandom = (dtDate.getTime()%10000000) + (Math.floor(Math.random()*10000));
	return cusRandom;
}

function psShorttenPageID(pLink)
{
	var temp1 = pLink;
	if (temp1 != null)
	{
		temp1 = (temp1.length > 255) ? temp1.substr(0, 255) : temp1;
	}
	return temp1;
}
/********************************************************/
/* WRAPPER FOR COREMETRICS' TAG FUNCTIONS               */
/********************************************************/
function psCreatePageviewTag(pId, pCatId, pSrchTerm, pSrchResult) 
{
	pId = psCleanPageId(pId);
	pId = psShorttenPageID(pId);
	//pCatId = psCleanCatId(pCatId);
    if (pSrchResult != null)
        pSrchResult += "";
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmCreatePageviewTag(" + pId + ", " + pCatId + ", " + pSrchTerm + ", " + pSrchResult + ")");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmCreatePageviewTag(pId, pCatId, pSrchTerm, pSrchResult);
}

function psCreateProductviewTag(pId, pName, pCatId) 
{
	pName = psCleanProductName(pName);
	pCatId = psCleanCatId(pCatId);
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmCreateProductviewTag(" + pId + ", " + pName + ", " + pCatId + ")");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmCreateProductviewTag(pId, pName, pCatId);
}

function psCreateShopAction5Tag(pId, pName, pQuantity, pPrice, pCatId) 
{
	pName = psCleanProductName(pName);
	pCatId = psCleanCatId(pCatId);
	pQuantity = psCleanPrice(pQuantity);
	pPrice = psCleanPrice(pPrice);
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmCreateShopAction5Tag(" + pId + ", " + pName + ", " + pQuantity + ", " + pPrice + ", " + pCatId + ")");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmCreateShopAction5Tag(pId, pName, pQuantity, pPrice, pCatId);    
}

function psCreateShopAction9Tag(pId, pName, pQuantity, pPrice, pCusID, pOrderID, pOrderTotal, pCatId) 
{
	pName = psCleanProductName(pName);
	pCatId = psCleanCatId(pCatId);
	pQuantity = psCleanPrice(pQuantity);
	pPrice = psCleanPrice(pPrice);
	pOrderTotal = psCleanPrice(pOrderTotal);
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmCreateShopAction9Tag(" + pId + ", " + pName + ", " + pQuantity + ", " + pPrice + ", " + pCusID + ", " + pOrderID + ", " + pOrderTotal + ", " + pCatId + ")");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmCreateShopAction9Tag(pId, pName, pQuantity, pPrice, pCusID, pOrderID, pOrderTotal, pCatId);
}

function psCreateOrderTag(pId, pOrderTotal, pOrderShipping, pCusID, pCusCity, pCusState, pCusZip) 
{
	pOrderTotal = psCleanPrice(pOrderTotal);
	pOrderShipping = psCleanPrice(pOrderShipping);
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmCreateOrderTag(" + pId + ", " + pOrderTotal + ", " + pOrderShipping + ", " + pCusID + ", " + pCusCity + ", " + pCusState + ", " + pCusZip + ")");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmCreateOrderTag(pId, pOrderTotal, pOrderShipping, pCusID, pCusCity, pCusState, pCusZip);
}

function psCreateConversionEventTag(pId, pActionType, pCatID, pPoints) 
{
	pCatID = psCleanCatId(pCatID);
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmCreateConversionEventTag(" + pId + ", " + pActionType + ", " + pCatID + ", " + pPoints + ")");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmCreateConversionEventTag(pId, pActionType, pCatID, pPoints);
}

function psCreateRegistrationTag(pCusID, pCustEmail, pCusCity, pCusState, pCusZip, pNewsletter, pSubscribe) 
{
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmCreateRegistrationTag(" + pCusID + ", " + pCustEmail + ", " + pCusCity + ", " + pCusState + ", " + pCusZip + ", " + pNewsletter + ", " + pSubscribe + ")");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmCreateRegistrationTag(pCusID, pCustEmail, pCusCity, pCusState, pCusZip, pNewsletter, pSubscribe);
}

function psCreateErrorTag(pPageID, pCatId) 
{
	pPageID = psCleanPageId(pPageID);
	pCatId = psCleanCatId(pCatId);
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmCreateErrorTag(" + pPageID + ", " + pCatId + ")");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmCreateErrorTag(pPageID, pCatId);
}

function psDisplayShop5s()
{
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmDisplayShop5s()");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmDisplayShop5s();
}

function psDisplayShop9s()
{
    if (G_PS_DEBUG_MODE == 1 || G_PS_DEBUG_MODE == 3)
        alert("cmDisplayShop9s()");
    if (G_PS_DEBUG_MODE == 2 || G_PS_DEBUG_MODE == 3)
        cmDisplayShop9s();
}
/*===========================END GENERAL UTILITY FUNCTION ==================*/