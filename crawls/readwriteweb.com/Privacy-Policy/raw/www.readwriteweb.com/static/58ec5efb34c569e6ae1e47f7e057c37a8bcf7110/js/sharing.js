var RWShare = (function(window, $, Socialite, _gaq, _kmq, undefined){$(function(){
	
	var self = this,
		trackSocial,
		trackEvent,
		linkedInShared,
		plusone_vote,
		extractParamFromUri;
	
	// twitter setup
	$.getScript("http://platform.twitter.com/widgets.js", function(){
		twttr.events.bind('tweet', function(event){
			if (event) {
				var opt_target;
				if (event.target && event.target.nodeName == 'IFRAME') {
					opt_target = extractParamFromUri(event.target.src, 'url');
				}
				trackSocial("tweet", opt_target, "Twitter");
			}
		});
	});
	
	// facebook setup
	window.fbAsyncInit = function() {
		FB.init({appId: window._conf.facebook_app_id, status: true, cookie: true, xfbml: true});
		FB.Event.subscribe('edge.remove', function(href, widget) { 
			trackSocial("Unlike", href, "Facebook");
		});
		FB.Event.subscribe('edge.create', function(href, widget) { 
			trackSocial("Like", href, "Facebook");
		});
	};
	
	window.Socialite.setup({
	    facebook: {
	        lang     : 'en_US',
	        appId    : window._conf.facebook_app_id,
	        onlike   : function(url) { trackSocial("Like", url, "Facebook"); },
	        onunlike : function(url) { trackSocial("UnLike", url, "Facebook"); },
	        onsend   : function(url) { trackSocial("Send", url, "Facebook"); }
	    },
	    twitter: {
	        lang       : 'en',
	        onclick    : function(e) { /* ... */ },
	        ontweet    : function(e) { trackSocial("tweet", $(e.target.parentNode).data('href'), "Twitter"); },
	        onretweet  : function(e) { trackSocial("retweet", $(e.target.parentNode).data('href'), "Twitter"); },
	        onfavorite : function(e) { trackSocial("favorite", $(e.target.parentNode).data('href'), "Twitter"); },
	        onfollow   : function(e) { trackSocial("follow", $(e.target.parentNode).data('href'), "Twitter"); }
	    },
	    googleplus: {
	        lang               : 'en-US',
	        onstartinteraction : function(el, e) {trackEvent('',$(el).data('category'), 'click','googleplus')},
	        onendinteraction   : function(el, e) { /* ... */ },
	        callback           : function(el, e) { trackSocial(e.state, e.href, "GooglePlus");}
	    }
	});
	window.Socialite.process();
	
	// Social tracking with GA
	window.trackSocial = trackSocial = function(socialEvent, href, network) {
		_kmq.push(['record', 'Social Track', {network: network, event: socialEvent, href: href}]);
		
		window._gaq.push(['rwwSocial._setAccount', 'UA-421291-1']);
		window._gaq.push(['rwwSocial._setAllowLinker', true]); 
		window._gaq.push(['rwwSocial._setAllowHash', false]);
		window._gaq.push(['rwwSocial._setDomainName', 'none']);
		window._gaq.push(['rwwSocial._trackSocial', network, socialEvent, href]);
	}
	
	// Event tracking with GA
	window.trackEvent = trackEvent = function(link, category, action, label) {
		try{
			_kmq.push(['record', 'GA Track', {category: category, action: action, label: label}]);
			
			window._gaq.push(['rwwEvent._setAccount', 'UA-421291-1']);
			window._gaq.push(['rwwEvent._setAllowLinker', true]); 
			window._gaq.push(['rwwEvent._setAllowHash', false]);
			window._gaq.push(['rwwEvent._setDomainName', 'none']);
			window._gaq.push(['rwwEvent._trackEvent', category, action, label]);
			if(link.type == 'submit') {
				setTimeout(function() {
					var form = $(link).parents('form:first');
					form.submit();
				}, 500);
			} else if(link.href != undefined) {
				setTimeout('document.location = "' + link.href + '"', 200);
			}
		}
		catch(err) {}
	}
	
	window.linkedInShared = linkedInShared = function() {
		trackSocial('Share', window.location.href,'LinkedIn');
	}
	
	window.plusone_vote = plusone_vote = function(plusone) { 
		trackSocial(plusone.state, window.location, "GooglePlus");
	}

	extractParamFromUri = function(uri, paramName) {
		if (!uri) {
			return;
		}
		var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
		var params = regex.exec(uri);
		if (params != null) {
			return unescape(params[1]);
		}
		return;
	}
	
	return {
		trackSocial: trackSocial,
		trackEvent: trackEvent,
	}
});}(window, jQuery, Socialite, window._gaq || [], window._kmq || []));