/* CHECK IF BADGEVILLE exists */
				
function BVinit(){
	Badgeville.Defaults.multiTab.tabs[0].data.initTab = 'daily';
	Badgeville.$.extend( Badgeville.Lang, {
		horizontalLeaderboardHeader: '<img src="http://www.samsung.com/us/images/badgeville/samsung_nation_logo.gif" width="110" height="47">'
			   	
	});
			
	Badgeville.Lang.whatIsThisTip1 = 'It\'s the exciting new social loyalty program where you earn badges, move up the ranks and have fun discovering everything Samsung.com has to offer.',
	Badgeville.Lang.whatIsThisTip2 = '',
	Badgeville.Lang.whatIsThisTip3 = '',
	Badgeville.Lang.joinTheCommunity = 'Join Samsung Nation',
	Badgeville.Lang.topFans = 'Leaderboard',

	Badgeville.Lang.viewShowcase = 'View Your Showcase!',
	//Badgeville.Lang.friendsNoUser = '',
	Badgeville.Lang.join = 'Are you a Samsung fan?',
	Badgeville.Lang.multiTabTitle = 'Samsung Nation',
	Badgeville.Lang.signUp 	= 'Join Now',
	Badgeville.Lang.signIn 	= 'Sign In',
	Badgeville.Lang.signOut = 'Sign Out';

	Badgeville.noTrack = true;
	Badgeville.Settings.autoReward = [];

	// API keys for FB and Twitter - this allows for sharing
	//Badgeville.Settings.FB='226153277431602';
	//Badgeville.Settings.twitter='oQYqWBpP2udteN5A86dCag';  // production key for twitter

	var urlValue = String(window.location.href);
	var urlValueSplit = urlValue.split('/');

	$('.bv_WhatIsThisText ul li:nth-child(2)').css('display', 'none');
	$('.bv_WhatIsThisText ul li:nth-child(3)').css('display', 'none');
	
	
	//temp stuff - should be put in the final template
	
	
	if (urlValueSplit[4] == 'article' && !urlValueSplit[5]){
		$('#container').append('<h2 style="margin-bottom:10px;font-family:PFSquareSansProMedium,tahoma;font-size: 27px;font-weight: normal;">Join Samsung Nation</h2><p style="margin-bottom:10px;font-family: PFSquareSansProRegular,tahoma;font-size: 15px;line-height: 17px;">Learn about the exciting new social loyalty program where you earn badges, move up the ranks and have fun discovering everything Samsung.com has to offer.</p><div id="horizontalLeaderboard" style="margin-top:10px;clear:both;display:block;height:100px;width:960px;"></div><div style="width:960px; height: 100px;">&nbsp;</div>');
		
	}

	
	$('.bv_infopanel p').text('Welcome to the exciting new community where you are rewarded by simply exploring Samsung.com and discovering everything it has to offer. You\'re now free to earn points, unlock and collect badges, boost your ranking, see who\'s leading, and watch Samsung Nation evolve over time.');
	
	$('.bv_infopanel p').append('<p style="margin-top:12px">Look to the right to check out real-time activity, then dive into the site to see what you can uncover.</p>');
	
	if(urlValueSplit[4] == 'support'){
		$('#bv_widgets').prepend('<div id="samsungnation"></div>');
		$('.badgevillehead').text('Your Samsung Nation Progress');
		$('.bv_infopanel .badgevillehead').text('You\'re Now a Part of Samsung Nation');
	}
	
	
	//swap divs based on logged-in/out state
	if(urlValueSplit[4] == 'samsungnation'){
		if(isLogin()){
			$('#joinBadgeville').hide();
			$('.bv_login').removeClass();
			$('#loggedinBadgeville').show();
			$('#loginframe').remove();
			
		}else{
		
			$('#loggedinBadgeville').hide();
			$('#joinBadgeville').show();
			$('#joinBadgeville h2.badgevillehead').append('<p style="font-size:11px; font-family:arial; margin-top:10px; font-weight:normal; line-height:16px;">Enter your existing Samsung.com username and password:</p> <iframe id="loginframe" src="https://sso-us.samsung.com/sso/bv_profile/bvViewAction_LI" width="250" height="325" style="margin-top: 15px" scrolling="no" frameborder="0"></iframe>');
			$('#bv_joinNow').addClass('.bv_login');
		}
	}else{
		if(isLogin()){
			$('#joinBadgeville').hide();
			$('.bv_login').removeClass();
			$('#loggedinBadgeville').show();
			//$('#loginframe').remove();
			
		}else{
		
			$('#loggedinBadgeville').hide();
			$('#joinBadgeville').show();
			//$('#joinBadgeville h2.badgevillehead').append('<iframe id="loginframe" src="https://sso-us.samsung.com/sso/bv_profile/bvViewAction_LI" width="250" height="325" style="margin-top: 15px" scrolling="no" frameborder="0"></iframe>');
			$('#bv_joinNow').addClass('.bv_login');
		}
	}
	
	//remove default image from what is this?
	
	//    Badgeville.Settings.Pics.sampleBadge_medium_url = true;
	
	if(isLogin()){
		var bvEmail = getCookie("prof_bpno_s") + '@nowhere.com';
		var bvUsername = getCookie("prof_fname") + " " + getCookie("prof_lname");
		var janRainPhotoUrl = getCookie("userImage");

		bvUsername = bvUsername.toLowerCase();

			// Implement Opt Out button if placeholder exists 
			// Get the opt-out flag, then create the opt-out button based upon its state. Also,
			//  invoke setUser with no user if opt-out is true, or the current user if opt-out
			//  is false.   	
			Badgeville.ready( function() {

				Badgeville.getPlayer( bvEmail , function( data ) {
				
					

					var optOutFlag = data.options.optOut;
					
					$('#optOutPlaceholder').append(
							'<br><br><a class=' + (optOutFlag ? 'turn_on' : 'turn_off') + ' href="javascript:" onclick="setOptOut(\''+bvEmail+ '\', '
								+ !optOutFlag + ');">' + (optOutFlag ? 'Turn On Samsung Nation' : 'Turn Off Samsung Nation') + '</a>'
						); 
						
						if (optOutFlag) {
							Badgeville.setPlayer();
							$('#turnOnMsgPlaceholder').append(
								'<hr/><br/><p><a class="turn_on" href="javascript:" onclick="setOptOut(\''+bvEmail+'\', '+ !optOutFlag +');" >Turn on Samsung Nation</a> to start earning points, unlocking new badges and qualifiying for sweepstakes!</p><br/><hr/>'
							);
							$('#turnOnMsgPlaceholder').css('border-bottom','1px solid #CCCCCC');
							$('.bv_infopanel .badgevillehead').html('Oh no, You\'ve Turned Off Samsung Nation');
							$('.bv_infopanel').find('p').html('You can turn on Samsung Nation at any time. Simply click <a href="setOptOut(\''+bvEmail+'\', '+ !optOutFlag +');" >here</a>'); 
							
						} else {
						if (janRainPhotoUrl == null || janRainPhotoUrl == '')  {
							Badgeville.setPlayer({
								email: bvEmail,
								display_name: bvUsername
							});
						} else {
							Badgeville.setPlayer({
								email: bvEmail,
								display_name: bvUsername, 
								picture_url: janRainPhotoUrl
							});
						}
			
						onloadBadgevilleCreds();
					}
					
					
					// Manually initialize widgets. (because they have to be initialized after setUser is called in order to prevent JS error)
				
					BV('#multiTab').multiTab();
					BV('#activities').activities();
					BV('#showcase').showcase();
					BV('#horizontalLeaderboard').horizontalLeaderboard();
				
					
					
					
					
						});
						onloadBadgevilleInit();
					});

					if(urlValueSplit[4] == 'article' && !urlValueSplit[5]){Badgeville.Defaults.horizontalLeaderboard.width = '960';}
			
					if(urlValueSplit[4] == 'article' && urlValueSplit[5]){
						$('#horizontalLeaderboard').width(630);
						Badgeville.Defaults.horizontalLeaderboard.width = '630';
					}
		
		Badgeville.bind('beforeShare', function(event, data) {
			if (data.sharetype == 'FB') {
				//data.shareOptions.caption = '';
				data.shareOptions.description = 'Join our exciting new social loyalty program where you can have fun earning badges and moving up in the ranks while discovering everything Samsung.com has to offer.';
				data.shareOptions.link = 'http://www.samsung.com/samsungnation';
				data.shareOptions.name = 'Samsung.com Community';
			} else if (data.sharetype == 'Twitter') {
				data.shareOptions.tweet = data.target.message + ' #SamsungNation on ' + location.href;
			} 
		});


		
		//	Badgeville.crouton = function(){};   
		//	Badgeville.Settings.showToast = 0;  
		
		
		(function( $ ) {
			// Store a reference to the original method
			var tD = Badgeville.toastDisplay;
			Badgeville.toastDisplay = function( reward ) {
			// Call the original method with the new reward object and store the resulting jQuery object
			var ret = tD( reward );
			$('.bv_toastOverlay', ret).remove();
			ret.removeClass('bv_roundedCorners_top');
			$('.bv_toast', ret).prepend('<div id="sam_community"><img src="/us/images/samsungNation_black.png"></div>').removeClass('bv_accentGradient');
			$('.bv_toast', ret).css({"background-color":"#E0E0E0"});
			$('.bv_close', ret).removeClass('bv_primaryBackground').addClass('bv_highlightBackground');
			var shareSection = $('.bv_tipShare', ret).prepend('<span id="sam_share_text">Share</span>');
			$('.bv_toast', ret).append(shareSection);
			$('.bv_toastOptions .bv_toastProfile', ret).html('View Showcase!');
			
			return ret;
			};
		})( Badgeville.$ );
		
	//	addLoadEvent(onloadBadgevilleInit);
		addLoadEvent(checkBadgevTimeOnSite);  // check after load
		addUnloadEvent(checkBadgevTimeOnSite);  // check before unload
		setInterval('checkBadgevTimeOnSite()',5000);  // check every 5 seconds

	} else {

			Badgeville.ready( function() {
					BV('#multiTab').multiTab();
					BV('#activities').activities();
					BV('#horizontalLeaderboard').horizontalLeaderboard();
			});
	}

	// remove "Receive summary emails" from Our Community widget
	Badgeville.bind( 'afterCreate:settings', function( event, widget ) {
		Badgeville( 'label[for=bv_summaries]', widget.element ).remove();
	});

	Badgeville.Settings.signUp = function(){
		setBadgevCookie('sNation', 'true');
	  	
		//location.href = '/us/support/account';
		gnblogin("N");
	}

	Badgeville.Settings.signIn = function(){
		
		//location.href = '/us/support/account';
		gnblogin("N");
	}  
var __setDefaults = Badgeville.$.bv.showcase.prototype._setDefaults;
Badgeville.widget('bv.showcase', Badgeville.$.bv.showcase, {
_setDefaults : function() {
var self = this;
__setDefaults.apply(self, arguments);
if ( !self.options.modal ) { // new code
	self.options.layout.top[0].width = '270';
	self.options.layout.top[1].width = '210';
	self.options.layout.top[2].width = '442';
	self.options.layout.bottom[0].width = '100%';
	} // new code

}
});



}

function isLogin(){
	var result = false;
	var remoteId = getCookie("remoteId");
	if ((remoteId != null) && (remoteId != "")) result = true;
	
	return result;
}

function setDelay(delay)
{
	var date = new Date();
	var currentDate = null;

	do { currentDate = new Date(); }
	while(currentDate-date < delay);
}


function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof oldonload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function () {
			oldonload();
			func();
		}
	}
}


function addUnloadEvent(func) {
	var oldonbeforeload = window.onbeforeunload;
	if (typeof oldonbeforeload != 'function') {
		window.onbeforeunload = func;
	}
	else {
		window.onbeforeunload = function () {
			oldonbeforeload();
			func();
		}
	}
}


function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}


function setBadgevCookie(c_name,value,expmin)
{

	var exdate=new Date();
	exdate.setMinutes(exdate.getMinutes() + expmin); 
	var c_value=escape(value) + ((expmin==null) ? "" : "; expires="+exdate.toUTCString()) + ("; path=/") + ( ";domain=" + ".samsung.com" );
	document.cookie=c_name + "=" + c_value;
	
      

}
function getCookie(name) 
{
	var search = name + "=";
	if (document.cookie.length > 0) 
	{
		offset = document.cookie.indexOf(search);
		if (offset != -1)
		{
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
			end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		} 
	}
}
function deleteCookie(name, path, domain)
{
	if (getCookie(name)) {
		document.cookie = name + '=' +
			((path) ? ';path=' + path : '') +
			((domain) ? ';domain=' + domain : '' ) +
			';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	}
}

// This method sets the opt-out flag for the user with the specified email address,
// and triggers a page refresh once the flag is set to refresh the widgets
function setOptOut(emailAddress, optOutFlag) {
    if (optOutFlag) {
        Badgeville.Settings.player.options.optOut = true;
        Badgeville.setPlayer( {
            email: emailAddress,
            widget_options: Badgeville.JSON.stringify( Badgeville.Settings.player.options )
        }, function(data) {
            location.reload();
        });
    } else {
        Badgeville.getPlayer( emailAddress , function(data) {
            data.options.optOut = false;
            Badgeville.setPlayer(  {
                email: emailAddress,
                widget_options: Badgeville.JSON.stringify( data.options )
            }, function(data) {
                location.reload();
            });
        });
    }
}




function checkBadgevTimeOnSite() {
	
	if(Badgeville.Settings.player == null) 
		return;
	if(Badgeville.Settings.player.admin == true) { 
		return;  // User is in Opt Out state
	}

	var bv_cookie = getCookie('badgev_timeonsite');
	var dateNow = new Date();
	if (bv_cookie) {			
		var cookieDate = new Date(bv_cookie);  // bv_cookie must be in Date.toString() format
		var timeDiff = dateNow - cookieDate;
		
		Badgeville.ready( function() {
			if (timeDiff >= 1800000) {   // if more than 30 min on site		
				//Badgeville.credit({verb:'spendtimeonsite',timespent:'30'});
				giveBadgevilleCredit('spendtimeonsite','','30');
			
				// replace old cookie with new
				setBadgevCookie('badgev_timeonsite',dateNow.toString(),35);
			
			}
			else if (timeDiff >= 600000 && getCookie('badgev_tenmark') == null) {  // if more than 10 min on site			
				//Badgeville.credit({verb:'spendtimeonsite',timespent:'10'});
				giveBadgevilleCredit('spendtimeonsite','','10');
				setBadgevCookie('badgev_tenmark','true',20);  // we only want to credit once
			}
		});
	}
	else {
		setBadgevCookie('badgev_timeonsite',dateNow.toString(),35);
	}
	
}
		
var badgev_timer;
var badgev_params = {
		category:'',
		page:'',
		nightowl:'',
		enoughtimeonsite:'',
		timespent:'',
		event:''
}
	
function onloadBadgevilleInit() {
	
	Badgeville.ready( function() {
		
		var badgev_isGalaxyS = false;
		if (typeof(badgev_isLifemovesyou) != 'undefined' && badgev_isLifemovesyou){
			badgev_params.category = 'lifemovesyou';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		// SXSW, Genome tagging
		if(typeof(badgev_isSxsw) != 'undefined' && badgev_isSxsw) {

			badgev_params.category = 'sxsw';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		if(typeof(badgev_isGenome) != 'undefined' && badgev_isGenome) {

			badgev_params.category = 'genome';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		if(typeof(badgev_isSxsw) != 'undefined' && badgev_isSxsw && typeof(badgev_isGenome) != 'undefined' && 		badgev_isGenome) {
   			 badgev_params.category = ['sxsw','genome'];
    			 badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}

		//best reviewed
		if (typeof(badgev_isBestreviewed) != 'undefined' && badgev_isBestreviewed){
			badgev_params.category = 'bestreviewed';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',1000);
		}		

		//Black friday campaign tagging
		if (typeof(badgev_isBlackFridaydeals) != 'undefined' && badgev_isBlackFridaydeals){
			badgev_params.event = 'blackfriday';
		}
		// GS2 tagging
		if(typeof(badgev_isGS2) != 'undefined' && badgev_isGS2) {

			badgev_params.category = 'gsii';
		}

		// 2013 New Year Resolution
		if (typeof(badgev_isNewyear) != 'undefined' && badgev_isNewyear){
			badgev_params.category = 'newyear';
			// console.log('newyear');
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);

		}

		// 2013 valentine
		if (typeof(badgev_isValentine) != 'undefined' && badgev_isValentine){
			badgev_params.category = 'valentine';
			// console.log('valentine');
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',1000);

		}
		
		//2013 stem
		if (typeof(badgev_isStem) != 'undefined' && badgev_isStem){
			badgev_params.category = 'stem';
			// console.log('stem');
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',1000);

		}		

		// CES 2012 tagging
		if (typeof(badgev_isCes2012) != 'undefined' && badgev_isCes2012){
			badgev_params.event = 'ces2012';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		// get category - badgev_is3D and badgev_isAndroid defined on product/accessory detail pages
		if(typeof(badgev_is3D) != 'undefined' && badgev_is3D) {
			badgev_params.category = '3d'
		}
		if(typeof(badgev_isAndroid) != 'undefined' && badgev_isAndroid){
			badgev_params.category = 'android';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		var urlVal = String(window.location.href);      
		var urlValSplit = urlVal.split('/');

		if(urlVal.indexOf("hope-for-children") != -1 ){ badgev_params.category = 'stem'; badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',1000); }

		if (urlValSplit[6] == undefined &&  
		(urlValSplit[5] == 'cell-phones'|| urlValSplit[5] == 'galaxy-tab' || urlValSplit[5] == 'galaxy-note'
		|| urlValSplit[5] == 'mp3-players')){
			badgev_params.category = 'android';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		if(urlVal.indexOf("SGH-I717ZBAATT-features") != -1 || urlVal.indexOf("YP-G70CWY/XAA-features") != -1 
		|| urlVal.indexOf("YP-G70CWY/XAA-features") != -1  ){
			badgev_params.category = 'android';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		if(urlVal.indexOf("SGH-I717ZBAATT-features") != -1 || urlVal.indexOf("YP-G70CWY/XAA-features") != -1 
		|| urlVal.indexOf("YP-G70CWY/XAA-features") != -1  ){
			badgev_params.category = 'android';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		if(urlVal.indexOf("10-great-apps-for-the-galaxy-note") != -1 || urlVal.indexOf("20-apps-for-your-galaxy-note-s-pen") != -1 
		|| urlVal.indexOf("5-android-apps-for-busy-dads") != -1  || urlVal.indexOf("5-android-apps-for-busy-moms") != -1 
		|| urlVal.indexOf("5-cool-android-apps-for-summer") != -1 || urlVal.indexOf("5-kid-friendly-android-apps") != -1 
		|| urlVal.indexOf("5-signs-it-s-time-to-upgrade-your-phone") != -1 || urlVal.indexOf("android-4-0-explained") != -1 
		|| urlVal.indexOf("chaton-keeps-you-connected") != -1 || urlVal.indexOf("galaxy-s-iii-designed-to-make-life-easier") != -1
		|| urlVal.indexOf("galaxy-s-iii-starter-guide") != -1 || urlVal.indexOf("how-to-transfer-media-to-your-android-phone") != -1
		|| urlVal.indexOf("streamline-your-digital-universe-with-allshare") != -1 || urlVal.indexOf("tips--tricks-galaxy-nexus-sprint-") != -1
		|| urlVal.indexOf("tips--tricks-galaxy-note") != -1 || urlVal.indexOf("tips--tricks-galaxy-s-aviator-") != -1
		|| urlVal.indexOf("tips--tricks-galaxy-s-blaze-4g") != -1 || urlVal.indexOf("tips--tricks-galaxy-s-ii-u-s-cellular-") != -1
		|| urlVal.indexOf("tips--tricks-galaxy-s-iii") != -1 || urlVal.indexOf("tips--tricks-galaxy-tab-10-1-u-s-cellular-") != -1
		|| urlVal.indexOf("expert-review-samsung-epic-4g-touch") != -1 || urlVal.indexOf("tips--tricks-galaxy-tab-7-7-verizon-") != -1 
		|| urlVal.indexOf("our-galaxy-smartphones") != -1 
		|| urlVal.indexOf("2012-galaxy-players") != -1){

			badgev_params.category = 'android';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		// Note category
		if (urlValSplit[6] != undefined &&  
				(urlValSplit[6] == 'GT-N8013EAYXAR' || urlValSplit[6] == 'GT-N8013EAVXAR' || urlValSplit[6] == 'GT-N8013ZWYXAR'
				|| urlValSplit[6] == 'SGH-I717ZBAATT' || urlValSplit[6] == 'SGH-I717RWAATT' || urlValSplit[6] == 'SGH-T879ZBBTMB'
					|| urlValSplit[6] == 'GT-N8013ZWYXAR' || urlValSplit[6] == 'GT-N8013EAYXAR' || urlValSplit[6] == 'GT-N8013EAVXAR'
						|| urlValSplit[6] == 'ET-S110EBEGSTA' || urlValSplit[6] == 'EDD-D1E1BEGSTA' || urlValSplit[6] == 'ECS-K1E1BEGSTA'
							|| urlValSplit[6] == 'EFC-1E1CBEGSTA')){
					badgev_params.category = 'note';
					badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		if(typeof(badgev_isNoteworthy) != 'undefined' && badgev_isNoteworthy){
			badgev_params.category = 'note';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  
		}
		// Energy star badge
      		
		var badgev_isEnergy = getCookie('badgev_isEnergy');

		if(badgev_isEnergy){
                 	badgev_params.category = 'energy';
           		badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',1000);  
		 	deleteCookie("badgev_isEnergy", "/", "samsung.com");	 
		}
		// is it a Galaxy S phone?
		if(typeof(omn_ss_productName) != 'undefined' && (omn_ss_productName == 'SGH-I897' ||
			omn_ss_productName == 'SGH-T959' || omn_ss_productName == 'SPH-D700' || omn_ss_productName == 'SCH-I500')) {
				badgev_isGalaxyS = true;
		}	

		//get page type and set timer 
		if(typeof(omn_ss_pagetype) != 'undefined' && omn_ss_pagetype == 'Homepage') {	
			badgev_params.page = 'homepage';	
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',19000);  // 19 seconds for homepage
		}
		else if(urlValueSplit[4] == 'article') {	
			badgev_params.page = 'articlepage';
			badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',1000);  // 1 second for article page and so on

		}
		else if(urlValueSplit[4] == 'mobile') {
			if(urlValueSplit[5] != null && (urlValueSplit[5].indexOf('tab') != -1 || urlValueSplit[5] == 'us-cellular' || badgev_isGalaxyS)) {	
				badgev_params.page = 'galaxypage';
				badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',7000);  
			}
			else {
				badgev_params.page = 'mobilepage';
				badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',13000);  
			}
		}
		else if(urlValueSplit[4] == 'support') {
			if(urlValueSplit[5] != null && (urlValueSplit[5] == 'account' || urlValueSplit[5] == 'myAccountYourProducts.do')) {
				badgev_params.page = 'profilepage';
				badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',21000);  
			} 
			else {
				badgev_params.page = 'supportpage';
				badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',19000);  
			}
		}
		else if(urlValueSplit[5] != null && 
			(urlValueSplit[5] == 'laptops' || urlValueSplit[5] == 'chromebook' || 
			urlValueSplit[5] == 'notebooks' || urlValueSplit[5] == 'netbooks')) {	
				
				badgev_params.page = 'notebookpage';
				badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',14000);  

		}else {   

        		badgev_params.page = 'other';
        		badgev_timer = setTimeout('giveBadgevilleCredit("pageread")',15000);  

		}

		
		// get nightowl status (between midnight and 4 am local time)
		var tempDate = new Date();		
		if ((tempDate.getHours() >= 0 && tempDate.getHours() < 4) ||  (tempDate.getHours() == 4 && tempDate.getMinutes() == 0)) {
				badgev_params.nightowl = 'true';
		}
    }); 
}

function onloadBadgevilleCreds() {
		
		giveBadgevilleCredit('visits');
		
		setDelay(1000);  // Calling Badgeville.credit consecutively too quickly may cause issues.
		
		if(location.href.indexOf('-buy') != -1) {
			giveBadgevilleCredit('shopclick');
		}
		else if(urlValueSplit[4] == 'article' && urlValueSplit[5] != null && urlValueSplit[6] == null) {
			giveBadgevilleCredit('readarticle');
		}
		else if(urlValueSplit[4] == 'support' && urlValueSplit[5] != null && (urlValueSplit[5] == 'account' || urlValueSplit[5] == 'myAccountYourProducts.do')) {
			giveBadgevilleCredit('sign-in');
		} 
	
}
function giveBadgevilleCredit(verb,category,timespent) {
    // If BV player is already set, proceed with the credit.  If not, bind the credit to after set player.
    if (Badgeville.Objects.is(Badgeville.Settings.player, Badgeville.Objects.PLAYER)) {
        giveBadgevilleCreditInternal();
    } else {
        Badgeville.bind( 'afterSetPlayer', giveBadgevilleCreditInternal);
    }

    function giveBadgevilleCreditInternal() {


            if (verb == null || verb == '') 
                return;

            if(Badgeville.Settings.player == null) 
                return;
            if (typeof(Badgeville.Settings.player.admin) != 'undefined' && Badgeville.Settings.player.admin == true) {
                return;
            }

            if (verb == 'pageread') 
                badgev_params.enoughtimeonsite = 'true';

            if (category) 
                badgev_params.category = category;

            if (timespent)
                badgev_params.timespent = timespent;

            var paramObject = new Object();

            paramObject['verb'] = verb;

            for (x in badgev_params) {
                if (badgev_params[x] != '') {   
                    paramObject[x] = badgev_params[x];
                }
            }

            // for (x in paramObject) {
            //  alert('valid param ' + x + ' is ' + paramObject[x]);
            // }

            Badgeville.credit(paramObject);   // only pass in non-empty parameters

    }

}



//changes href attribute of tooltip link to stop page refresh
$(document).ready(function(){
	$('.hastip').attr('href', 'JavaScript:void(0)');
});

