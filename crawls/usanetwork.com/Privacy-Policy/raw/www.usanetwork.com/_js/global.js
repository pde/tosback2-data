var webspectator = true;
var chatterAdTimeout;
var pageScroll;
var chatterScroll;
var usa_debugFlag = false;
var randDARTNumber=0;
var agent = navigator.userAgent.toLowerCase();
var scrWidth = screen.width;
var scrHeight = screen.height;
// The document.documentElement dimensions seem to be identical to
// the screen dimensions on all the mobile browsers I've tested so far
var elemWidth = document.documentElement.clientWidth;
var elemHeight = document.documentElement.clientHeight;
// We need to eliminate Symbian, Series 60, Windows Mobile and Blackberry
// browsers for this quick and dirty check. This can be done with the user agent.
var otherBrowser = (agent.indexOf("series60") != -1) || (agent.indexOf("symbian") != -1) || (agent.indexOf("windows ce") != -1) || (agent.indexOf("blackberry") != -1);
// If the screen orientation is defined we are in a modern mobile OS
var mobileOS = typeof orientation != 'undefined' ? true : false;
// If touch events are defined we are in a modern touch screen OS
var touchOS = ('ontouchstart' in document.documentElement) ? true : false;
// iPhone and iPad can be reliably identified with the navigator.platform
// string, which is currently only available on these devices.
var iOS = ((navigator.platform).toLowerCase().indexOf("iphone") != -1) ||
        ((navigator.platform).toLowerCase().indexOf("ipad") != -1) ||
        ((agent).toLowerCase().indexOf("iphone") != -1) ||
        ((agent).toLowerCase().indexOf("ipad") != -1) ? true : false;
// If the user agent string contains "android" then it's Android. If it
// doesn't but it's not another browser, not an iOS device and we're in
// a mobile and touch OS then we can be 99% certain that it's Android.
var android = (agent.indexOf("android") != -1) || (!iOS && !otherBrowser && touchOS && mobileOS) ? true : false;

var usa_homeVideoWidth = 300;
var usa_homeVideoHeight = 187;

var usa_omniturePageName;
var usa_omnitureSprop3;
var usa_omnitureSprop4;

var EchoRiverClient;

var ad_section = '';

var usa_freewheel = {
	networkId : 169843,
	cb_profile : "169843:nbcu_live_as3",
	siteSectionNetworkId : 169843,
	videoAssetNetworkId : 169843,
	fw_server : "http://29773.v.fwmrm.net/ad/p/1",
	amLocation : "http://adm.fwmrm.net/p/nbcu_live/AdManager.swf",
	videoAssetFallbackId : "Fallback36750133"
}

// default fw_config for show pages
function fw_config()
{
	return {
		networkId : usa_freewheel.networkId,
		cb_profile : usa_freewheel.cb_profile,
		siteSectionNetworkId : usa_freewheel.siteSectionNetworkId,
		videoAssetNetworkId : usa_freewheel.videoAssetNetworkId,
		fw_server : usa_freewheel.fw_server,
		siteSection : ((typeof fwSiteSection != 'undefined' && fwSiteSection != '') ? fwSiteSection : 'usa_home_'+ad_section+'_0_short'),
		autoplay : false,
		amLocation : usa_freewheel.amLocation,
		videoAssetFallbackId : usa_freewheel.videoAssetFallbackId
	};
}

//cookie functions
if (typeof usa_createCookie == 'undefined')
{
	usa_createCookie = function (name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
}

if (typeof usa_readCookie == 'undefined')
{
	usa_readCookie = function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
}

if (typeof usa_eraseCookie == 'undefined')
{
	usa_eraseCookie = function (name) {
		usa_createCookie(name,"",-1);
	}
}

/* prefs obj and instance */
var usa_sitePrefsObj = function(chatter) {
	this.chatter = chatter;
};
var usa_sitePrefs = new usa_sitePrefsObj("1");
usa_loadPrefs();

function usa_savePrefs()
{
	var cookieValue = '';
	cookieValue = usa_sitePrefs.chatter;
	usa_createCookie('usa_prefs', cookieValue, 365);
}

function usa_loadPrefs()
{
	var loadedPrefs = usa_readCookie('usa_prefs');
	if (loadedPrefs != null)
	{
		if (loadedPrefs.indexOf(',') != -1)
		{
			loadedPrefs = loadedPrefs.split(',');
		}

		usa_sitePrefs.chatter = loadedPrefs;
	}
}

function genSetRandDARTNumber()
{
	randDARTNumber = Math.round(Math.random()*1000000000000);
}
genSetRandDARTNumber();

function usa_debugOut(msg)
{
	if (typeof console != 'undefined' && usa_debugFlag == true)
	{
		console.log(msg);
	}
	return;
}


function usa_handleOrientationChange()
{
	usa_debugOut('fn: usa_handleOrientationChange()');
	return;
	/*window.orientation returns a value that indicates whether iPhone is in portrait mode, landscape mode with the screen turned to the
    left, or landscape mode with the screen turned to the right. */
  var orientation = window.orientation;
  switch(orientation) {
    case 0:
        /* Add a descriptive message on "Handling iPhone or iPod touch Orientation Events"  */
        break;
    case 90:
        /* If in landscape mode with the screen turned to the left, sets the body's class attribute to landscapeLeft. In this case, all style definitions matching the
           body[class="landscapeLeft"] declaration in the iPhoneOrientation.css file will be selected and used to style "Handling iPhone or iPod touch Orientation Events". */
        break;
    case -90:
        /* If in landscape mode with the screen turned to the right, sets the body's class attribute to landscapeRight. Here, all style definitions matching the
           body[class="landscapeRight"] declaration in the iPhoneOrientation.css file will be selected and used to style "Handling iPhone or iPod touch Orientation Events". */

    	break;
    case 180:
    	/* Add a descriptive message on "Handling iPhone or iPod touch Orientation Events"  */
        break;
  }
}

window.onorientationchange = function() {
	usa_handleOrientationChange();
	if (typeof pageScroll != 'undefined')
	{
		pageScroll.refresh();
	}
	usa_expandHeightOfContent();
}

function usa_loaded() {
	usa_debugOut('fn: usa_loaded()');
	usa_setFooter();
	if (iOS || android)
	{
		if (!$('body').hasClass('noiscroll'))
		{
			pageScroll = new iScroll('usa_outerContainer', { zoom: true, hScrollbar: false, vScrollbar: false });
			usa_handleOrientationChange();
		}
	}
	usa_expandHeightOfContent();
	if (document.getElementById('usa_chatter')) $('#usa_chatter').fadeIn('slow');
}

function usa_setFooter()
{
	usa_debugOut('fn: usa_setFooter()');
	//if (usa_readCookie('device_detect') == 'desktop' || !usa_readCookie('device_detect'))
	if (!android && !iOS && !touchOS && !mobileOS && !otherBrowser)
	{
		$('#usa_desktop').addClass('active');
		$('#usa_desktop').show();
	}
	$('#usa_headFootContainer').show().slideDown();
}



/* ADDITIONAL CHATTER FUNCTIONS */
var usa_lastChatterView = 'condensed';

function usa_refreshChatterScroll()
{
	usa_debugOut('fn: usa_refreshChatterScroll()');
	if (typeof chatterScroll != 'undefined')
	{
		setTimeout(function () {
			chatterScroll.refresh();
		}, 500);
		//setTimeout("usa_refreshChatterScroll()", 5000);
	}

	if (typeof usa_chatterPageType != 'undefined')
	{
		if (usa_chatterPageType == 'FULL')
		{
			if (typeof pageScroll != 'undefined')
			{
				setTimeout(function () {
					pageScroll.refresh();
				}, 500);
			}
		}
	}
}

function usa_setChatterDisplay(type)
{
	usa_debugOut('fn: usa_setChatterDisplay("'+type+'")');
	if (type == 'condensed')
	{
		$('#usa_chatter').removeClass('expanded');
		$('#usa_chatter').removeClass('closed');
		$('#usa_chatter').addClass('open');

		$('#usa_chatterBody').css('height', 80);
		$('#usa_outerContainer').css('bottom', 180);

		if (document.getElementById('chatterAd300x250iframe'))
		{
			document.getElementById('chatterAd300x250iframe').src = "javascript:'<html></html>'";
		}
		clearTimeout(chatterAdTimeout);
	}
	else if (type == 'expanded')
	{
		$('#usa_chatter').removeClass('closed');
		$('#usa_chatter').removeClass('open');
		$('#usa_chatter').addClass('expanded');

		var newHeight = $(window).height() - $('#usa_header').height() - $('#usa_headFootContainer').height() - 40;
		$('#usa_chatterBody').css('height', String(newHeight) + 'px');
		$('#usa_outerContainer').css('bottom', 180);

		var setChatterScroll = true;
		if (typeof usa_chatterPageType != 'undefined')
		{
			if (usa_chatterPageType == 'FULL')
			{
				setChatterScroll = false;
			}
		}

		if ((iOS || android) && setChatterScroll)
		{
			chatterScroll = new iScroll('usa_chatterBodyWrapperOuter', {  zoom: true, hScrollbar: false, vScrollbar: false  });
			//usa_refreshChatterScroll();
			setTimeout("usa_refreshChatterScroll()", 1000);
		}

		if (document.getElementById('chatterAd300x250iframe'))
		{
			document.getElementById('chatterAd300x250iframe').src = '/_inc/ad.html?size=300x250';
		}

		if (typeof usa_chatterRefreshAd == 'function')
		{
			chatterAdTimeout = setTimeout(usa_chatterRefreshAd, 1000 * 60);
		}
		else if (typeof usa_refreshAd == 'function')
		{
			chatterAdTimeout = setTimeout(usa_refreshAd, 1000 * 60);
		}
	}

	$('#usa_chatterFooter').css('height', 5);
	if (typeof pageScroll != 'undefined')
	{
		pageScroll.refresh();
	}
}

function usa_expandChatter()
{
	usa_debugOut('fn: usa_expandChatter()');
	if ($('#usa_chatter').hasClass('open') || usa_lastChatterView == 'expanded')
	{
		if (typeof s_gi != 'undefined')
		{
			var s=s_gi('nbcuglobal,nbcuusanetworkd,nbcuusanetbu');
			usa_omnitureSprop3 = s.prop3;
			usa_omnitureSprop4 = s.prop4;
			usa_omniturePageName = s.pageName;
			s.prop3="Exclusives";
			s.prop4="Chatter";
			s.pageName = "Chatter";
			void (s.t());
		}

		usa_setChatterDisplay('expanded');

		usa_sitePrefs.chatter = 2;
		usa_savePrefs();

		if (typeof EchoRiverClient == 'undefined')
		{
			usa_initChatter('expanded');
		}
		else
		{
			EchoRiverClient.activities.paused = false;
			EchoRiverClient.config.set("maxBodyCharacters", "2000");
			usa_chatterShowAllNoRefresh();
		}
	}
	else
	{
		usa_setChatterDisplay('condensed');

		usa_sitePrefs.chatter = 1;
		usa_savePrefs();

		if (typeof EchoRiverClient == 'undefined')
		{
			usa_initChatter('condensed');
		}
		else
		{
			EchoRiverClient.activities.paused = false;
			EchoRiverClient.config.set("maxBodyCharacters", "60");
			EchoRiverClient.refresh();
		}

		if (typeof s_gi != 'undefined')
		{
			var s=s_gi('nbcuglobal,nbcuusanetworkd,nbcuusanetbu');
			if (typeof usa_omnitureSprop3 == 'undefined')
			{
				usa_omnitureSprop3 = s.prop3;
				usa_omnitureSprop4 = s.prop4;
				usa_omniturePageName = s.pageName;
			}
			s.prop3=usa_omnitureSprop3;
			s.prop4=usa_omnitureSprop4;
			s.pageName = usa_omniturePageName;
		}
	}

	usa_lastChatterView = '';
}

function usa_collapseChatter()
{
	usa_debugOut('fn: usa_collapseChatter()');
	if (typeof EchoRiverClient != 'undefined')
	{
		EchoRiverClient.activities.paused = true;
		EchoRiverClient.rerender("state");
	}

	if ($('#usa_chatter').hasClass('expanded'))
	{
		usa_lastChatterView = 'expanded';

		var s=s_gi('nbcuglobal,nbcuusanetworkd,nbcuusanetbu');
		if (typeof usa_omnitureSprop3 == 'undefined')
		{
			usa_omnitureSprop3 = s.prop3;
			usa_omnitureSprop4 = s.prop4;
			usa_omniturePageName = s.pageName;
		}
		s.prop3=usa_omnitureSprop3;
		s.prop4=usa_omnitureSprop4;
		s.pageName = usa_omniturePageName;
	}
	else
	{
		usa_lastChatterView = 'condensed';
	}

	$('#usa_chatter').removeClass('expanded');
	$('#usa_chatter').removeClass('open');
	$('#usa_chatter').addClass('closed');

	$('#usa_chatterBody').css('height', 0);
	$('#usa_chatterFooter').css('height', 0);
	usa_expandHeightOfContent();

	if (document.getElementById('chatterAd300x250iframe'))
	{
		document.getElementById('chatterAd300x250iframe').src = "javascript:'<html></html>'";
	}
	clearTimeout(chatterAdTimeout);

	var newHeight = 100 + $('#usa_chatterContent').height();
	$('#usa_outerContainer').css('bottom', newHeight);

	if (typeof pageScroll != 'undefined')
	{
		pageScroll.refresh();
	}

	usa_sitePrefs.chatter = 0;
	usa_savePrefs();
}

var usa_totalUsaStreamItems;
var usa_currentStreamTop = 0;
var usa_streamScrollHeight = -100;
var usa_currentStreamPage = 1;
var usa_streamPageSize = 3;
var usa_streamLoading = true;
var usa_waitingForStream = false;

function usa_updateStreamScroll()
{
	usa_debugOut('fn: usa_updateStreamScroll()');
	if (usa_waitingForStream)
	{
		var nextScroll = 5 + (usa_currentStreamPage * usa_streamScrollHeight);
		$('.echo-stream-body').css('top', String(nextScroll) + 'px');
		usa_currentStreamPage++;
		usa_waitingForStream = false;
	}
}

function usa_streamBack()
{
	usa_debugOut('fn: usa_streamBack()');
	var eb = $(".echo-stream-body");
	usa_totalUsaStreamItems = eb.find(".echo-item-content").length;

	if (usa_totalUsaStreamItems > 3 && usa_currentStreamPage >= 1)
	{
		usa_currentStreamPage--;
		var nextScroll = 5 + (usa_currentStreamPage * usa_streamScrollHeight);
		$('.echo-stream-body').css('top', String(nextScroll) + 'px');
	}
}

function usa_streamNext()
{
	usa_debugOut('fn: usa_streamNext()');
	var eb = $(".echo-stream-body");
	usa_totalUsaStreamItems = eb.find(".echo-item-content").length;

	if (usa_totalUsaStreamItems > 3 && usa_totalUsaStreamItems > (usa_currentStreamPage * usa_streamPageSize) && !usa_streamLoading)
	{
		var nextScroll = 5 + (usa_currentStreamPage * usa_streamScrollHeight);
		$('.echo-stream-body').css('top', String(nextScroll) + 'px');
		usa_currentStreamPage++;
	}
	else
	{
		usa_waitingForStream = true;
		$('.echo-stream-more').click();
	}
}

function usa_initChatter(type)
{
	usa_debugOut('fn: usa_initChatter("'+type+'")');
	var maxChars = 60;
	var query = usa_chatterObj.allQueryCondensed;

	if (typeof usa_chatterPageType == 'undefined')
	{
		if (type == 'condensed')
		{
			maxChars = 60;
			query = usa_chatterObj.allQueryCondensed;
		}
		else if (type == 'expanded')
		{
			maxChars = 2000;
			query = usa_chatterObj.allQuery;
		}
	}
	else if (usa_chatterPageType == 'FULL')
	{
		maxChars = 2000;
		query = usa_chatterObj.allQuery;
	}

	if (usa_goto == 'liveEvent' && usa_liveChat)
	{
		query = usa_chatterObj.questionsQuery;
	}
	else if (usa_goto == 'fanChat')
	{
		query = usa_chatterObj.chatQuery;
	}
	else if (usa_goto == 'curated')
	{
		query = usa_chatterObj.curatedQuery;
	}

   EchoRiverClient = new Echo.Stream({
          "target": document.getElementById("echo-stream"),
          "appkey": "prod.usanetwork",
		  "query": query,
          "maxBodyCharacters": maxChars,
          "viaLabel": {"icon": true,"text": true},
          "reTag": false,
          "streamStateLabel": {"icon": true,"text": true},
          "aggressiveSanitization": false,
          "plugins": [
			{
            	"name": "Whirlpools",
                "after": 2,
                "clickable": true
          	},
          	{
            	"name": "CommunityFlag"
    	  	},
    	  	{
    			"name": "SourceIconTweaks",
    			"icons": {
    				"usanetwork": "http://www.usanetwork.com/favicon.png"
    			}
    		},
        	{
    	      	"name": "Reply",
    	      	"nestedPlugins": [{
    	              "name": "FormAuth",
    	              "identityManagerLogin": identityManager,
    	              "identityManagerSignup": identityManager,
    	              "identityManagerEdit": identityManager,
    	              "submitPermissions": "forceLogin"
    	          }]
    	    }
          ]
  });

   Echo.Broadcast.subscribe("User.onInit",
		    function(topic, data, contextId) {
				usa_checkFacebook();
				usa_checkTwitter();
				EchoSubmit.rerender("shareContainer");
		    }
		);

		Echo.Broadcast.subscribe("User.onInvalidate",
		    function(topic, data, contextId) {
				EchoSubmit.rerender("shareContainer");
		    }
		);

   if (typeof usa_chatterPageType == 'undefined')
   {
	  	Echo.Broadcast.subscribe("Stream.onReady",
			function(topic, data, contextId) {
	  			usa_streamLoading = false;
	  			if ($('#usa_chatter').hasClass('open') && typeof usa_chatterPageType == 'undefined')
				{
	  				$('.echo-stream-more').css('display', 'none');
				}
	  			usa_updateStreamScroll();
	  			setTimeout("usa_refreshChatterScroll()", 1000);
			}
		);

		Echo.Broadcast.subscribe("Stream.onMoreButtonPress",
			function(topic, data, contextId) {
				usa_streamLoading = true;
				$('.echo-stream-more').css('display', 'block');
			}
		);
   }
   else
   {
	   Echo.Broadcast.subscribe("Stream.onReady",
				function(topic, data, contextId) {
		   			setTimeout("usa_refreshChatterScroll()", 1000);
				}
			);
   }
}



function usa_expandHeightOfContent()
{
	usa_debugOut('fn: usa_expandHeightOfContent()');
	//return;
	var heightOfContent = ($('#usa_outerContainer').height() + $('#usa_chatter').height() - 18);
	if ($(window).height() > heightOfContent)
	{
		var newHeight = $('#usa_body').height() + ($(window).height() - heightOfContent);
		$('#usa_body').css('height', newHeight + 'px');
	}
}

function usa_refreshBannerAd()
{
	usa_debugOut('fn: usa_refreshBannerAd()');
	// get all IFRAME ads on the page
	var adRoot = $('body');
	adRoot.find(".usa_adIframe.refresh").each(function(index) {
		var iFrameID = $(this).attr('id');
		document.getElementById(iFrameID).src = document.getElementById(iFrameID).src;
	});

	// omniture
	if (typeof s_gi != 'undefined')
	{
		var s=s_gi('nbcuglobal,nbcuusanetworkd,nbcuusanetbu');
		void (s.t());
	}
}

var usa_adRefreshTO;
function usa_timedAdRefreshes(time)
{
	usa_debugOut('fn: usa_timedAdRefreshes("'+time+'")');
	usa_refreshBannerAd();
	usa_adRefreshTO = setTimeout("usa_timedAdRefreshes("+time+")", time);
}
function usa_setupTimedAdRefreshes(time)
{
	usa_debugOut('fn: usa_setupTimedAdRefreshes("'+time+'")');
	usa_adRefreshTO = setTimeout("usa_timedAdRefreshes("+time+")", time);
}

function usa_buildCharactersModule(options)
{
	usa_debugOut('fn: usa_buildCharactersModule("'+options+'")');
	// setup main defaults
	var default_args = {
		'target' : '',
		'basePath' : '',
		'data' : ''
	}

	// override defaults with arguments
	for (var index in default_args)
	{
		if (typeof options[index] == "undefined") options[index] = default_args[index];
	}

	if (typeof options['data'] == 'object')
	{
		var html = '';
		for (var i=0 ; i<options['data'].character.length ; i++)
		{
			var name = options['data'].character[i].attributes.name;
			var thumb = options['basePath'] + options['data'].character[i].attributes.thumb;
			var url = options['basePath'] + options['data'].character[i].attributes.url;

			html += '<div class="character"><a href="'+url+'"><img src="'+thumb+'" /><span>'+name+'</span></a></div>';
		}
		html += '<div class="clear"></div>';
		$(options['target']).html(html);
	}
}

function usa_buildScheduleModule(options)
{
	usa_debugOut('fn: usa_buildScheduleModule("'+options+'")');
	// setup main defaults
	var default_args = {
		'target' : '',
		'data' : '',
		'max' : 4
	}

	// override defaults with arguments
	for (var index in default_args)
	{
		if (typeof options[index] == "undefined") options[index] = default_args[index];
	}

	var max = (options['data'].item.length < options['max']) ? options['data'].item.length : options['max'];

	if (typeof options['data'] == 'object')
	{
		var html = '';
		for (var i=0 ; i<max ; i++)
		{
			var showDate = options['data'].item[i].showdate;
			var showDay = options['data'].item[i].showday;
			var showDescription = options['data'].item[i].showdescription;
			var showTime = options['data'].item[i].showtime;

			html += '<div class="showing"><div class="date">'+showDay+', '+showDate+', '+showTime+'</div><div class="episode">'+showDescription+'</div></div>';
		}
		html += '<div class="clear"></div>';
		$(options['target']).html(html);
	}
}

function usa_columnAlign()
{
	usa_debugOut('fn: usa_columnAlign()');
	var contentBody = $('#usa_body');
	var tallestColumn = 0;
	var tallestColumnID = '';
	contentBody.find(".usa_column").each(function(index) {
		var columnHeight = $(this).height();
		if (columnHeight > tallestColumn)
		{
			tallestColumn = columnHeight;
			tallestColumnID = $(this).attr('id');
		}
	})

	contentBody.find(".usa_column").each(function(index) {
		if ($(this).attr('id') != tallestColumnID)
		{
			columnHeight = $(this).height();
			columnDifference = tallestColumn - columnHeight;
			moduleMargin = parseInt($("#"+$(this).attr('id')+" .mod:last").css('margin-bottom'));
			moduleCurrentHeight = parseInt($("#"+$(this).attr('id')+" .mod:last").height());
			newHeight = columnDifference + moduleCurrentHeight;
			$("#"+$(this).attr('id')+" .mod:last").css('height', String(newHeight) + 'px');
		}
	})
}

$(document).ready(function(){

	$("ul.topnav li").click(function() { //When trigger is clicked...
		// hide all open so far
		$("ul.topnav").find("ul.subnav").hide();

		if ($(this).hasClass("subhover"))
		{
			$(this).removeClass("subhover");
			$(this).find("ul.subnav").slideUp('slow');
			return;
		}
		else
		{
			$(this).addClass("subhover");
		}

		//Following events are applied to the subnav itself (moving subnav up and down)
		$(this).find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click

		$(this).hover(function() {
		}, function(){
			$(this).find("ul.subnav").slideUp('slow'); //When the mouse hovers out of the subnav, move it back up
		});

		//Following events are applied to the trigger (Hover events for the trigger)
		}).hover(function() {
			$(this).addClass("subhover"); //On hover over, add class "subhover"
		}, function(){	//On Hover Out
			$(this).removeClass("subhover"); //On hover out, remove class "subhover"
	});

	$("ul.topnav li").mouseenter(function() { //When trigger is clicked...

		//Following events are applied to the subnav itself (moving subnav up and down)
		$(this).find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click

		$(this).hover(function() {
		}, function(){
			$(this).find("ul.subnav").slideUp('slow'); //When the mouse hovers out of the subnav, move it back up
		});

		//Following events are applied to the trigger (Hover events for the trigger)
		}).hover(function() {
			$(this).addClass("subhover"); //On hover over, add class "subhover"
		}, function(){	//On Hover Out
			$(this).removeClass("subhover"); //On hover out, remove class "subhover"
	});

});

$(document).ready(function() {
	usa_loaded();
	usa_columnAlign();
	usa_setupMeebo();
	if (webspectator == true)
	{
		usa_setupWebspectator();
	}
});

$(window).resize(function() {
	usa_expandHeightOfContent();
});
function usa_showTabFeature(id)
{
	usa_debugOut('fn: usa_showTabFeature('+id+')');
	usa_debugOut(id);

	usa_nextHomeFeatureId = id;
	$('#tabFeatureContainer_' + usa_currentHomeFeatureId).fadeOut('fast', function() {
		$('#tabFeatureContainer_' + usa_currentHomeFeatureId).removeClass('selected');
		$('#tabFeatureNav_' + usa_currentHomeFeatureId).removeClass('selected');

		$('#tabFeatureContainer_' + usa_nextHomeFeatureId).fadeIn('fast');
		usa_currentHomeFeatureId = usa_nextHomeFeatureId;
		$('#tabFeatureContainer_' + usa_currentHomeFeatureId).addClass('selected');
		$('#tabFeatureNav_' + usa_currentHomeFeatureId).addClass('selected');
	});
}

function usa_buildHomeTabFeature(options)
{
	usa_debugOut('fn: usa_buildHomeTabFeature()');
	usa_debugOut(options);

	// setup main defaults
	var default_args = {
		'target' : '',
		'data' : ''
	}

	// override defaults with arguments
	for (var index in default_args)
	{
		if (typeof options[index] == "undefined") options[index] = default_args[index];
	}

	if (typeof options['data'] == 'object')
	{
		var navHtml = '';
		var tabHtml = '';

		navHtml += '<div class="tabFeatureNav">';

		if (typeof options['data'].tabFeature.length == 'undefined')
		{
			// we have one tab
			var cssClass = ' selected';
			navHtml += '<a href="javascript:usa_showTabFeature(0);" id="tabFeatureNav_0" class="'+cssClass+'"><span class="l"></span><span class="m">'+options['data'].tabFeature.attributes.title+'</span><span class="r"></span><span class="arrow"></span></a>';

			if (typeof options['data'].tabFeature.feature.length != 'undefined')
			{
				tabHtml += '<div id="tabFeatureContainer_0" class="tabFeatureContainer tabFeature'+options['data'].tabFeature.feature.length+cssClass+'">';

				for (var j=0 ; j<options['data'].tabFeature.feature.length ; j++)
				{
					tabHtml += '<a href="'+options['data'].tabFeature.feature[j].attributes.link+'" class="tabFeatureItem'+(j+1)+'"><span class="tabFeatureImage"><img src="'+options['data'].tabFeature.feature[j].attributes.src+'" /></span><span class="tabFeatureText">'+options['data'].tabFeature.feature[j].title+'</span></a>';
				}
			}
			else
			{
				// we have just one item
				tabHtml += '<div id="tabFeatureContainer_0" class="tabFeatureContainer tabFeature1'+cssClass+'">';
				tabHtml += '<a href="'+options['data'].tabFeature.feature.attributes.link+'" class="tabFeatureItem1"><span class="tabFeatureImage"><img src="'+options['data'].tabFeature.feature.attributes.src+'" /></span><span class="tabFeatureText">'+options['data'].tabFeature.feature.title+'</span></a>';
			}

			tabHtml += '</div>';
		}
		else
		{
			// we have multiple tabs
			for (var i=0 ; i<options['data'].tabFeature.length ; i++)
			{
				var cssClass = (i==0) ? ' selected' : '';
				navHtml += '<a href="javascript:usa_showTabFeature('+i+');" id="tabFeatureNav_'+i+'" class="'+cssClass+'"><span class="l"></span><span class="m">'+options['data'].tabFeature[i].attributes.title+'</span><span class="r"></span><span class="arrow"></span></a>';

				if (typeof options['data'].tabFeature[i].feature.length != 'undefined')
				{
					tabHtml += '<div id="tabFeatureContainer_'+i+'" class="tabFeatureContainer tabFeature'+options['data'].tabFeature[i].feature.length+cssClass+'">';

					for (var j=0 ; j<options['data'].tabFeature[i].feature.length ; j++)
					{
						tabHtml += '<a href="'+options['data'].tabFeature[i].feature[j].attributes.link+'" class="tabFeatureItem'+(j+1)+'"><span class="tabFeatureImage"><img src="'+options['data'].tabFeature[i].feature[j].attributes.src+'" /></span><span class="tabFeatureText">'+options['data'].tabFeature[i].feature[j].title+'</span></a>';
					}
				}
				else
				{
					// we have just one item
					tabHtml += '<div id="tabFeatureContainer_'+i+'" class="tabFeatureContainer tabFeature1'+cssClass+'">';
					tabHtml += '<a href="'+options['data'].tabFeature[i].feature.attributes.link+'" class="tabFeatureItem1"><span class="tabFeatureImage"><img src="'+options['data'].tabFeature[i].feature.attributes.src+'" /></span><span class="tabFeatureText">'+options['data'].tabFeature[i].feature.title+'</span></a>';
				}

				tabHtml += '</div>';
			}
		}
		tabHtml += '<div class="clear"></div>';

		navHtml += '<div class="clear"></div></div>';
		$(options['target']).html(navHtml + tabHtml);
	}
}

/* Meebo */
var usa_meeboTimeout;
var usa_meeboFbLikeIframeUrl = 'http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2F__FANPAGE__&width=350&height=258&colorscheme=light&show_faces=true&border_color&stream=false&header=false&appId=241079750077';
var usa_meeboTwitterIframeUrl = 'http://platform.twitter.com/widgets/follow_button.html?screen_name=__USERNAME__&show_count=true&show_screen_name=true';
var usa_meeboButtons = { buttons : []};
var usa_meeboChatterShowName = (typeof usa_meeboChatterShowName != 'undefined') ? usa_meeboChatterShowName : '';
var usa_meeboFbFanPage = (typeof usa_meeboFbFanPage != 'undefined') ? usa_meeboFbFanPage : 'USANetwork';
var usa_meeboTwitterUser = (typeof usa_meeboTwitterUser != 'undefined') ? usa_meeboTwitterUser : 'USA_Network';
var usa_meeboEnableMeebo = true;

function usa_setupMeebo()
{
	var url = window.location.href;
	var meeboNetwork = 'usanetwork';

	if (!usa_meeboEnableMeebo)
	{
		return;
	}

	if (url.indexOf('www.usanetwork.com') != -1 || url.indexOf('test.usanetwork.com') != -1 || url.indexOf('3.44.121.221') != -1)
	{
		// valid location
		if (url.indexOf('test.usanetwork.com') != -1 || url.indexOf('3.44.121.221') != -1)
		{
			//meeboNetwork = 'usanetwork:notifications';
		}
	}
	else
	{
		// invalid location
		return;
	}

	if (iOS || android)
	{
		// no HTML5 yet
		return;
	}

	window.Meebo||function(c){function p(){return["<",i,' onload="var d=',g,";d.getElementsByTagName('head')[0].",
	j,"(d.",h,"('script')).",k,"='//cim.meebo.com/cim?iv=",a.v,"&",q,"=",c[q],c[l]?
	"&"+l+"="+c[l]:"",c[e]?"&"+e+"="+c[e]:"","'\"></",i,">"].join("")}var f=window,
	a=f.Meebo=f.Meebo||function(){(a._=a._||[]).push(arguments)},d=document,i="body",
	m=d[i],r;if(!m){r=arguments.callee;return setTimeout(function(){r(c)},100)}a.$=
	{0:+new Date};a.T=function(u){a.$[u]=new Date-a.$[0]};a.v=5;var j="appendChild",
	h="createElement",k="src",l="lang",q="network",e="domain",n=d[h]("div"),v=n[j](d[h]("m")),
	b=d[h]("iframe"),g="document",o,s=function(){a.T("load");a("load")};f.addEventListener?
	f.addEventListener("load",s,false):f.attachEvent("onload",s);n.style.display="none";
	m.insertBefore(n,m.firstChild).id="meebo";b.frameBorder="0";b.name=b.id="meebo-iframe";
	b.allowTransparency="true";v[j](b);try{b.contentWindow[g].open()}catch(w){c[e]=
	d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try{var t=
	b.contentWindow[g];t.write(p());t.close()}catch(x){b[k]=o+'d.write("'+p().replace(/"/g,
	'\\"')+'");d.close();'}a.T(1)}({network:meeboNetwork});

	// Facebook Fan Page
	if (typeof usa_meeboFbFanPage != 'undefined')
	{
		usa_meeboButtons.buttons.push({
			id: "usa-fblike-button",
	        type: "widget",
	        icon: "/_img/f_logo.png",
	        label: "Facebook",
	        width: 350,
	        height: 265,
	        iframe: usa_meeboFbLikeIframeUrl.replace('__FANPAGE__', usa_meeboFbFanPage)
		});
	}

	// Twitter Follow
	if (typeof usa_meeboTwitterUser != 'undefined')
	{
		usa_meeboButtons.buttons.push({
			id: "usa-twitter-button",
	        type: "widget",
	        icon: "/_img/twitter_newbird_blue_icon16x16.png",
	        label: "Twitter",
	        width: 300,
	        height: 20,
	        iframe: usa_meeboTwitterIframeUrl.replace('__USERNAME__', usa_meeboTwitterUser)
		});
	}

	// Chatter
	if (typeof usa_meeboChatterShowName != 'undefined')
	{
		usa_meeboButtons.buttons.push({
			id: "usa-chatter-button",
	        type: "widget",
	        icon: "/_img/chatter_icon_red_crop_sm.png",
	        label: "Character Chatter",
	        width: 310,
	        height: 400,
	        iframe: "http://characterchatter.usanetwork.com/widget-meebo.php?show=" + usa_meeboChatterShowName
		});
	}

	// Character Arcade
	usa_meeboButtons.buttons.push({
		id: "usa-games-button",
        type: "action",
        icon: "/_img/16x16ca-2.png",
        label: "Games",
        onClick: function(){ parent.location.href = 'http://www.characterarcade.com/'; }
	});

	// Featured Graphic Promote
	usa_meeboButtons.buttons.push({
		id: "usa-featured_2-button",
        type: "action",
        isIcon: true,
        icon: "/_img/suitscatchup_150x30.png",
        label: "",
        onClick: function(){ parent.location.href = '/videos/Suits/Full Episodes'; }
	});
	/*
	usa_meeboButtons.buttons.push({
		id: "usa-featured_1-button",
        type: "widget",
        isIcon: true,
        icon: "/_img/rp_summerextras_150x30.png",
        label: "",
        width: 900,
        height: 400,
        iframe: "/meebo/rp-summer-extras.html",
        onHide: function(widget, element) {
            //console.log (widget);
            console.log (element);
            console.log (element.contentWindow);
            if (typeof element.contentWindow.hideVideo != 'undefined')
            {
            	element.contentWindow.hideVideo();
            }
        },
        onShow: function(widget, element) {
            //console.log (widget);
            console.log (element);
            console.log (element.contentWindow);
            if (typeof element.contentWindow.showVideo != 'undefined')
            {
            	element.contentWindow.showVideo();
            }
        }
	});
	*/

	var usa_meeboSectionValue = ad_section + ((ad_subcategory != '') ? ('_' + ad_subcategory) : '');
	Meebo.partnerTakeover = {section:usa_meeboSectionValue};

	Meebo('domReady');

	if (typeof Meebo != 'undefined')
	{
		if (typeof usa_meeboButtons != 'undefined')
		{
			for (var i=0; i<usa_meeboButtons.buttons.length ; i++)
			{
				if (usa_meeboButtons.buttons[i].type == 'widget')
				{
					Meebo('addButton', {
						id: usa_meeboButtons.buttons[i].id,
						type: usa_meeboButtons.buttons[i].type,
						icon: usa_meeboButtons.buttons[i].icon,
						label: usa_meeboButtons.buttons[i].label,
						width: usa_meeboButtons.buttons[i].width,
						height: usa_meeboButtons.buttons[i].height,
						iframe: usa_meeboButtons.buttons[i].iframe,
						isIcon: (usa_meeboButtons.buttons[i].isIcon) ? usa_meeboButtons.buttons[i].isIcon : false,
						onHide: (usa_meeboButtons.buttons[i].onHide) ? usa_meeboButtons.buttons[i].onHide : null,
						onShow: (usa_meeboButtons.buttons[i].onShow) ? usa_meeboButtons.buttons[i].onShow : null
					});
				}
				else if (usa_meeboButtons.buttons[i].type == 'action')
				{
					Meebo('addButton', {
						id: usa_meeboButtons.buttons[i].id,
						type: usa_meeboButtons.buttons[i].type,
						icon: usa_meeboButtons.buttons[i].icon,
						label: usa_meeboButtons.buttons[i].label,
						onClick: usa_meeboButtons.buttons[i].onClick,
						isIcon: (usa_meeboButtons.buttons[i].isIcon) ? usa_meeboButtons.buttons[i].isIcon : false
					});
				}
			}
		}

		clearTimeout(usa_meeboTimeout);
	}
	else
	{
		// keep checking until it's available
		usa_meeboTimeout = setTimeout(usa_setupMeebo, 500);
	}
}


function usa_setupWebspectator()
{
	$('#ad300x250').addClass('wsz');
	$('#ad300x250').attr('data-pid', '547');

	$('#usa_ad_728x90').addClass('wsz');
	$('#usa_ad_728x90').attr('data-pid', '548');

	$('#ad160x600 div.modBody').addClass('wsz');
	$('#ad160x600 div.modBody').attr('data-pid', '549');


	var wid = 'WS-USNET';
	var scr = document.createElement('script');
	scr.type = 'text/javascript';
	scr.async = true;
	scr.src = 'http://services.webspectator.com/init/' + wid + '/' + +new Date;
	var x = document.getElementsByTagName('script')[0];
	x.parentNode.insertBefore(scr, x);
}

function usa_fireOmniture(newPageName)
{
	if (typeof s != 'undefined')
	{
		s.pageName = newPageName;
		void (s.t());
	}
}



