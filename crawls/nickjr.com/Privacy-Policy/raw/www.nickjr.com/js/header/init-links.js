(function ($) {
	$(document).ready(function() {
		var popupCookie = $.cookie('nickjr-popup');
		var overlayCookie = $.cookie('nickjr-overlay');
		if ($.cookie('nickjr-popup')) {
			$('body').bind('fluxContextLoaded', function() {
				if (userMgr.getIsCommunityMember()) {
					KIDS.utils.doLog('Showing popup from cookie');
					NICKJR.links.external(popupCookie);
				} else {
					KIDS.utils.doLog('Popup cookie set, user not logged in. Deleting cookie..');
				}
				$.cookie('nickjr-popup', null);
				KIDS.utils.doLog('Nickjr-popup cookie deleted.');
			});
		}
		if ($.cookie('nickjr-overlay')) {
			$('body').bind('fluxContextLoaded', function() {
				if (userMgr.getIsCommunityMember()) {
					KIDS.utils.doLog('Showing overlay from cookie');
					NICKJR.links.overlay(overlayCookie);
				} else {
					KIDS.utils.doLog('Overlay cookie set, user not logged in. Deleting cookie..');
				}
				$.cookie('nickjr-overlay', null);
				KIDS.utils.doLog('Nickjr-overlay cookie deleted.');
			});
		}

		$('.loginRequired, a.gatedLink, a.gated').click(function(ev) {
			userMgr.referralUrl = $(this).attr('href');
			var init = userMgr.initUser(); // returns FALSE if user is logged in
			if (init) {
				ev.preventDefault();
				return false;
			} else {
				return true;
			}
		});
		$('a.signupLink, a.gated-signup').click(function(ev) {
			ev.preventDefault();
			userMgr.referralUrl = $(this).attr('href');
			userMgr.widget.createSignUpWidget();
		});
		$('a.loginLink, a.gated-signin').click(function(ev) {
			ev.preventDefault();
			userMgr.referralUrl = $(this).attr('href');
			userMgr.widget.createSignInWidget();
		});
		$('a.gated-overlay').click(function(ev) {
			ev.preventDefault();
			if (userMgr.getIsCommunityMember()) {
				NICKJR.links.overlay($(this).attr('href'));
				return false;
			} else {
				var href = $(this).attr('href');
				$('body').unbind('FluxSignedIn').bind('FluxSignedIn', function() {
					KIDS.utils.doLog('Setting overlay cookie: ' + href);
					$.cookie('nickjr-overlay', href);
				});
				userMgr.initUser();
				return false;
			}
		});
		$('a.gated-new-window').click(function(ev) {
			ev.preventDefault();
			if (userMgr.getIsCommunityMember()) {
				NICKJR.links.external($(this).attr('href'));
				return false;
			} else {
				var href = $(this).attr('href');
				$('body').unbind('FluxSignedIn').bind('FluxSignedIn', function() {
					KIDS.utils.doLog('Setting popup cookie: ' + href);
					$.cookie('nickjr-popup', href);
				});
				userMgr.initUser();
				return false;
			}
		});
		$('a.overlayLink, a.overlay').click(function(ev) {
			ev.preventDefault();
			var nickjrOverlayUrl = $(this).attr('href');
			KIDS.utils.doLog('Overlay Link initiated: ' + nickjrOverlayUrl);
			$('body').prepend('<div id="nickjrOverlay"></div>');
			$('#nickjrOverlay').load(nickjrOverlayUrl).dialog({
				width: 900,
				height: 1300,
				modal: true,
				position: 'center',
				zIndex: '99999999',
				close: function(e, ui) {$('#nickjrOverlay').remove();$('body').trigger('nickjrOverlayClose');}
			});
			$('.ui-icon-closethick').html('[x]');
			return false;
		});
		$('.subNavigation a:contains("Kid")').unbind('click').click(function(ev) {
			ev.preventDefault();
			userMgr.widget.createAddChildWidget();
			return false;
		});
		$('a.externalLink, a.new-window').mtvnPopup();
	});
})(jQuery);