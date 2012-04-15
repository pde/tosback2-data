HEARST.user = function() {
	var user, name, displayName, HTML, $login,
		signOut = HEARST.utils.getQueryVariable('signout'),
		nextURL = HEARST.utils.getQueryVariable('next_url') || document.location.href,
		URL = {
			login: '/login/?next_url=' + nextURL,
			logout: '/login/?signout=1&next_url=' + nextURL,
			reg: '/registration/?next_url=' + nextURL,
			signout: ((HEARST.utils.getQueryVariable('next_url')) ? nextURL : '/')
		};

	if (mag_user && mag_user.logged_in) {
		user = mag_user;
		name = user.first_name || user.user_name;
		displayName = (name.length > 12) ? name.substring(0,12) + '&hellip;' : name ;
	}

	return user || { logged_in:false, toString: function() { return '' } };
}( );