(function($){
	TWP.Module = window.TWP.Module || {};
    TWP.Module.MegaMenu = function () {
	adCalled = false;
	/*var $promoAd = 	(typeof placeAd2 == 'function')?placeAd2(commercialNode,'promo','adi',''):'';*/
	/*GOES INTO MOUSEOVER EVENT
	if(!adCalled){
		  	jQuery('div.roll-ad').append(placeAd2(commercialNode,'promo','adi',''));
					adCalled = true;	
		  };
		*/
		
		jQuery('#main-nav-wrapper-v2 li.politics, li.politics div.rollMe, #header-v3 .politicsAd').hover(function() {
		  jQuery('li.politics div.rollMe, #header-v3 .sample-ad.politicsAd').css('visibility','visible');
		  jQuery('li.politics a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.politics div.rollMe, #header-v3 .sample-ad').css('visibility','hidden');
		  jQuery('li.politics a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
		
		jQuery('#main-nav-wrapper-v2 li.opinions, li.opinions div.rollMe, #header-v3 .opinionsAd').hover(function() {
		  jQuery('li.opinions div.rollMe, #header-v3 .sample-ad.opinionsAd').css('visibility','visible');
		  jQuery('li.opinions a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},		
		function() {
		  jQuery('li.opinions div.rollMe, #header-v3 .sample-ad').css('visibility','hidden');
		  jQuery('li.opinions a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
		
		jQuery('#main-nav-wrapper-v2 li.local, li.local div.rollMe').hover(function() {
		  jQuery('li.local div.rollMe').css('visibility','visible');
		  jQuery('li.local a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.local div.rollMe').css('visibility','hidden');
		  jQuery('li.local a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
		
		jQuery('#main-nav-wrapper-v2 li.sports, li.sports div.rollMe').hover(function() {
		  jQuery('li.sports div.rollMe').css('visibility','visible');
		  jQuery('li.sports a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.sports div.rollMe').css('visibility','hidden');
		  jQuery('li.sports a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
		
		jQuery('#main-nav-wrapper-v2 li.national, li.national div.rollMe').hover(function() {
		  jQuery('li.national div.rollMe').css('visibility','visible');
		  jQuery('li.national a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.national div.rollMe').css('visibility','hidden');
		  jQuery('li.national a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
		
		jQuery('#main-nav-wrapper-v2 li.world, li.world div.rollMe').hover(function() {
		  jQuery('li.world div.rollMe').css('visibility','visible');
		  jQuery('li.world a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.world div.rollMe').css('visibility','hidden');
		  jQuery('li.world a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
	
		jQuery('#main-nav-wrapper-v2 li.business, li.business div.rollMe').hover(function() {
		  jQuery('li.business div.rollMe').css('visibility','visible');
		  jQuery('li.business a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.business div.rollMe').css('visibility','hidden');
		  jQuery('li.business a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
	
		jQuery('#main-nav-wrapper-v2 li.technology, li.technology div.rollMe').hover(function() {
		  jQuery('li.technology div.rollMe').css('visibility','visible');
		  jQuery('li.technology a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.technology div.rollMe').css('visibility','hidden');
		  jQuery('li.technology a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
	
		jQuery('#main-nav-wrapper-v2 li.lifestyle, li.lifestyle div.rollMe').hover(function() {
		  jQuery('li.lifestyle div.rollMe').css('visibility','visible');
		  jQuery('li.lifestyle a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *, #wpni_adi_flex_ss_bb_hp *, #wpni_adi_flex_bb_hp *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.lifestyle div.rollMe').css('visibility','hidden');
		  jQuery('li.lifestyle a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *, #wpni_adi_flex_ss_bb_hp *, #wpni_adi_flex_bb_hp *').removeClass('adnoDisplay');
		});
		
	
		jQuery('#main-nav-wrapper-v2 li.entertainment, li.entertainment div.rollMe').hover(function() {
		  jQuery('li.entertainment div.rollMe').css('visibility','visible');
		  jQuery('li.entertainment a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *, #wpni_adi_flex_ss_bb_hp *, #wpni_adi_flex_bb_hp *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.entertainment div.rollMe').css('visibility','hidden');
		  jQuery('li.entertainment a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *, #wpni_adi_flex_ss_bb_hp *, #wpni_adi_flex_bb_hp *').removeClass('adnoDisplay');
		});
		
	
		jQuery('#main-nav-wrapper-v2 li.blogs, li.blogs div.rollMe').hover(function() {
		  jQuery('li.blogs div.rollMe').css('visibility','visible');
		  jQuery('li.blogs a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *, #wpni_adi_flex_ss_bb_hp *, #wpni_adi_flex_bb_hp *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.blogs div.rollMe').css('visibility','hidden');
		  jQuery('li.blogs a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *, #wpni_adi_flex_ss_bb_hp *, #wpni_adi_flex_bb_hp *').removeClass('adnoDisplay');
		});
		
		
		jQuery('#main-nav-wrapper-v2 li.photography, li.photography div.rollMe').hover(function() {
		  jQuery('li.photography div.rollMe').css('visibility','visible');
		  jQuery('li.photography a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.photography div.rollMe').css('visibility','hidden');
		  jQuery('li.photography a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
		
		jQuery('#main-nav-wrapper-v2 li.video, li.video div.rollMe').hover(function() {
		  jQuery('li.video div.rollMe').css('visibility','visible');
		  jQuery('li.video a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.video div.rollMe').css('visibility','hidden');
		  jQuery('li.video a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});
		
	
		jQuery('#main-nav-wrapper-v2 li.more, li.more div.rollMe').hover(function() {
		  jQuery('li.more div.rollMe').css('visibility','visible');
		  jQuery('li.more a.top').addClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').addClass('adnoDisplay');
		},
		function() {
		  jQuery('li.more div.rollMe').css('visibility','hidden');
		  jQuery('li.more a.top').removeClass('onColor');
		  jQuery('#slug_leaderboard *, #slug_pushdown *').removeClass('adnoDisplay');
		});

	};
	

	TWP.Module.MegaMenu();


})(jQuery);