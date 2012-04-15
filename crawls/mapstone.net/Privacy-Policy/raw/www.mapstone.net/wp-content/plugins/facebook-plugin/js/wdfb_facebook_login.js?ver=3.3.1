(function ($) {
$(function () {
	
_redirecting = false;
	
function notifyAndRedirect () {
	if (_redirecting) return false;
	_redirecting = true;
	
	var redir = '';
	$('fb\\:login-button').each(function () {
		redir = $(this).attr('redirect-url');
		if (redir) return false;
	});
	if (!redir) redir = window.location;
	
	// Start UI change
	$('fb\\:login-button').each(function () {
		var $parent = $(this).parent('p');
		$parent.after('<img src="' + _wdfb_root_url + '/img/waiting.gif">');
		$parent.remove();
	});
	
	$.post(_wdfb_ajaxurl, {"action": "wdfb_perhaps_create_wp_user"}, function () {
		window.location = redir;
	});
}

$('fb\\:login-button').click(function () {
	FB.Event.subscribe('auth.login', function (r) {
		if (r.session) notifyAndRedirect();
	});
	FB.getLoginStatus(function (resp) {
		if (resp.session) notifyAndRedirect();
	});	
});

	
});
})(jQuery);