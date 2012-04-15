/***************************************************************************
*
* Copyright (C) Telegraph Media Group Ltd.
* All Rights Reserved. No use, copying or distribution of this work may be
* made. This notice must be included on all copies, modifications and
* derivatives of this work.
****************************************************************************
* Author: L Dyson  Date: 15/03/2008
*
* Description:
* jQuery/Webtrends code for new-site Web Analytics for DCSMultiTrack
*
****************************************************************************
* $Id: tmglMultitrackSelector.js,v 1.17 2009/07/20 14:31:56 iviec Exp $
*
* Updates:
*
* 18/02/2011  P O'Shaughnessy TCUK-974 WebTrends tracking changes
* 14/07/2011  A Agamah (DIGI-878) Added new rules to solve double Webtrends hits
*
***************************************************************************/

/* track commercial element page impressions */
function trackAdImpressions(){
	/* the trackingItem css class is only used for tracking, so this method records a page impression hit for each one. */
	if ( $(".trackingItem").length > 0 ) {
		$(".trackingItem").each(function(){
			/* record a hit as long as the item is not a hidden slide show element. */
			if ( $(this).parents(".ssHide").length <= 0 && !$(this).hasClass(".hdn")){
				dcsRebuild();
				//dcsMultiTrack('WT.ad',$(this).comments(0),'DCSext.clickArticleId',$(this).comments(0),'DCSext.clickSectionId',$(this).comments(1),'DCSext.clickSectionPosition',$(this).comments(2));
				dcsMultiTrack('DCSext.comTrackItem',$(this).comments(0)+'/'+$(this).comments(1)+'/'+$(this).comments(2)+'/'+$(this).comments(3),'WT.ad',$(this).comments(0),"WT.ul",navigator.appName=="Netscape"?navigator.language:navigator.userLanguage); //added WT.ul (user language tracking) on 20/06/2011 - DIGI603
			}
		});
	}
}

function trackTabWidgetInitialAdImpressions() {

	var adIds = '';

	$(".configTabs").each(function() {

		var firstTab = $(this).find(".controlledTab")[0];
		$(firstTab).find("div a").each(function() {
			if( adIds != "" ) adIds += ";";
			adIds += $(this).attr('class').substring(4);

		});
	});

	var realUri = DCS.dcsuri;

	dcsCleanup(); // Replacing dcsRebuild() with dcsCleanup() to solve the double hit problem (DIGI-878)

	// Removing the below call - DIGI-1847
//	if(adIds){ // Make sure adIds in not NULL or empty before running the tracking function (DIGI-878)
//		dcsMultiTrack("DCS.dcsuri","/widget/ads_displayed","WT.ad",adIds,"WT.dl","53","DCS.dcsref",DCS.dcssip+DCS.dcsuri,"WT.ul",navigator.appName=="Netscape"?navigator.language:navigator.userLanguage); //added WT.ul (user language tracking) on 20/06/2011 - DIGI603
//	}
	
	// Reset dcsuri for further tracking requests
	DCS.dcsuri = realUri;
}

$(function() {
	trackTabWidgetInitialAdImpressions();
});


/* External Links */
$('a[href]').click(function(){

	if ($(this).attr("href").indexOf("telegraph.co.uk") == -1
	 && ($(this).attr("href").indexOf("/") > 0 || $(this).attr("href").indexOf("/") == -1)
	 && ($(this).attr("href").indexOf("#") > 0 || $(this).attr("href").indexOf("#") == -1 )
	 && $(this).attr("href").indexOf("link.brightcove.com") == -1
	 && $(this).attr("href").indexOf("javascript:") == -1
	 && $(this).attr("href").indexOf("mailto:") == -1) {

		var realUri = DCS.dcsuri;

		var params = ['DCS.dcsuri','/extra/external_link_clicked','DCSext.externalLink',$(this).attr("href"),'WT.tx_u','1','WT.dl','53','DCS.dcsref',DCS.dcssip+DCS.dcsuri];

		// Pass through the ad ID if there is one (it'll either be the Escenic puff's ID or feed item's GUID) using the WT.ac property
		var puffId = $(this).data('puffId');
		if( puffId != null ) {
			params[params.length] = 'WT.ac';
			params[params.length] = puffId;
		}

		dcsRebuild();
		dcsMultiTrack.apply(null, params);

		// Reset dcsuri for further tracking requests
		DCS.dcsuri = realUri;

	}

});

/* track links to pdf's */
$("a[href*='.pdf']").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.pdfDownload',$(this).attr('href'),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});

/* Image Puff */
	$(".puff > a > img").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.puff',$(this).parents(".puff").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri,
					'DCSext.comTrackItem',$(this).parents('.puff').comments(0)+'/'+$(this).parents('.puff').comments(1)+'/'+$(this).parents('.puff').comments(2)+'/'+$(this).parents('.puff').comments(3),'DCSext.clickURL',$(this).parent().attr('href'));
});


	/* click tracking for commercial elements as per changes / additions july 09 */
/* Commercial Nav Link, Commercial Link, Commercial Puff, hoiday search box link, autotraderbox */
$(".commNavLinkItems a, .comLink a, .commercialPuff a, .searchForm #linkItem a, #autotrader a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.comTrackItem',$(this).parents('.trackingItem').comments(0)+'/'+$(this).parents('.trackingItem').comments(1)+'/'+$(this).parents('.trackingItem').comments(2)+'/'+$(this).parents('.trackingItem').comments(3),'DCSext.clickURL',$(this).attr('href'));
});

/* click tracking for holiday search form submit button */
/* hoiday search box */
$("#searchSubmit").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.comTrackItem',$(this).parents('#searchForm').comments(0)+'/'+$(this).parents('#searchForm').comments(1)+'/'+$(this).parents('#searchForm').comments(2)+'/'+$(this).parents('#searchForm').comments(3),'DCSext.clickURL',$(this).parents('#searchForm').attr('action'));
});



/* Commercial Text Puff */
$(".comPuff a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.comTrackItem',$(this).parents('.trackingItem').comments(0)+'/'+$(this).parents('.trackingItem').comments(1)+'/'+$(this).parents('.trackingItem').comments(2)+'/'+$(this).parents('.trackingItem').comments(3),'DCSext.clickURL',$(this).attr('href'),'DCSext.puff',$(this).parents(".comPuff").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});

/* Commercial Carousel - Partner Button */
$("#comCarousel > #comCarTools > #carouselBtns > .btn").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.carouselSponsor',$(this).comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});

/* Commercial Carousel - Partner Offer */
$("#comCarousel > #comCarPartners > .partner > .offer a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.carouselOffer',$(this).parents(".offer").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri,
					'DCSext.comTrackItem',$(this).parents('.trackingItem').comments(0)+'/'+$(this).parents('.trackingItem').comments(1)+'/'+$(this).parents('.trackingItem').comments(2)+'/'+$(this).parents('.trackingItem').comments(3),'DCSext.clickURL',$(this).attr('href'));
});

/* Commercial Tracking - Middle Group */
$("#middleGroup .headerOne a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.middleGroup',$(this).parents(".headerOne").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});
$("#middleGroup .headerTwo a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.middleGroup',$(this).parents(".headerTwo").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});
$("#middleGroup .headerThree a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.middleGroup',$(this).parents(".headerThree").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});
$("#middleGroup .summary a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.middleGroup',$(this).parents(".summary").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});

/* Commercial Tracking - Bottom Group */
$("#bottomGroup .headerOne a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.bottomGroup',$(this).parents(".headerOne").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});
$("#bottomGroup .headerTwo a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.bottomGroup',$(this).parents(".headerTwo").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});
$("#bottomGroup .headerThree a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.bottomGroup',$(this).parents(".headerThree").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});
$("#bottomGroup .summary a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.bottomGroup',$(this).parents(".summary").comments(0),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});


/* Autotrader clicks */
$("#pagination a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.HTMLClick','autotraderPagination','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});
$(".autotraderNewCarTrader").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.HTMLClick','autotraderNewCarTrader','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});
$(".popAutotraderNewCar").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.HTMLClick','autotraderNewCarDetail','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});
$(".popAutotraderUsedCar").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.HTMLClick','autotraderUsedCarDetail','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
});

/* Dating Widget clicks - Due to AJAX call, we need to run this elsewhere as well, so have normalised */
datingClickReporting();

/* Tabbed Unit - tab clicks */
$(".configTabs .tabs a").click(function() {

	var adIds = '';
	var newTabId = $(this).attr("href").substring(1);

	$(this).parents(".configTabs").find("#"+newTabId+" div a").each(function() {
		if( adIds != "" ) adIds += ";";
		adIds += $(this).attr('class').substring(4);
	});

	var realUri = DCS.dcsuri;

	dcsRebuild();
	dcsMultiTrack("DCS.dcsuri","/widget/tab_changed","WT.ad",adIds,"WT.dl","53","DCS.dcsref",DCS.dcssip+DCS.dcsuri,"WT.ul",navigator.appName=="Netscape"?navigator.language:navigator.userLanguage); //added WT.ul (user language tracking) on 20/06/2011 - DIGI603

	// Reset dcsuri for further tracking requests
	DCS.dcsuri = realUri;
});


/* Print Click */
$(".print").click(function(){
    dcsRebuild();
    dcsMultiTrack('DCSext.HTMLClick','print','DCS.clickArticleId',$("meta[name='DCSext.articleId']").attr("content"));
});

/* Product apply now links */
$(".prodApplyTop a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.productApplied','1');
});
$(".prodApply a").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.productApplied','1');
});

/* Search results button click reporting */
$(".quicksearchbutton").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.quickSearchButton','1');
});
$(".showme").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.advanceSearchButton','1');
});
$(".updateres").click(function(){
	dcsRebuild();
	dcsMultiTrack('DCSext.filterSearchButton','1');
});

/* Track clicks on navigation elements
 * The actual meta is inserted on the requested page, see WTDcsVid.js
 * */

var menuSec = "";

$("#tmglPrimaryNav li a").click(function() {
	menuSec = "primary-" + $(this).text().replace(/\s+/g,'_');
	getNavPos($(this).attr("href"),menuSec);
});
$("#tmglSecondNav li a").click(function() {
	menuSec = "secondary-" + $(this).text().replace(/\s+/g,'_');
	getNavPos($(this).attr("href"),menuSec);
});
$("#tmglThirdNav li a").click(function() {
	menuSec = "tertiary-" + $(this).text().replace(/\s+/g,'_');
	getNavPos($(this).attr("href"),menuSec);
});
$("#tmglHotTopics li a").click(function() {
	menuSec = "hottopics-" + $(this).text().replace(/\s+/g,'_');
	getNavPos($(this).attr("href"),menuSec);
});
$("#mostpop #div-TODAY li h3 a").click(function() {
	getNavPos($(this).attr("href"),'mostpop-today');
});
$("#mostpop #div-THIS_WEEK li h3 a").click(function() {
	getNavPos($(this).attr("href"),'mostpop-thisweek');
});
$("#mostpop #div-THIS_MONTH li h3 a").click(function() {
	getNavPos($(this).attr("href"),'mostpop-thismonth');
});
function getNavPos(href,nav) {
	if((href.indexOf("http://www")==0)||(href.indexOf("/")==0)){
		$.cookie('tmg_navPos', nav, { path: '/'});
	}
}
