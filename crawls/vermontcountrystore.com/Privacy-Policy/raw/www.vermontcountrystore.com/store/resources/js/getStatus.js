/* AJAX LOAD PERSONAL ELEMENTS */
// header
function getProfileStatus(context){
	$.ajax({
		url: context + '/views/common/header/status.jsp',
		dataType: 'json',
		cache: false,
		success: function(data) {
			showStatus(data, context);
		},
		error: function(){
			showStatus(null, context);
		}
	});
}
// Welcome Message
function showStatus(profile, context){
	var welcomeMsg = '',
		status = '',
		cartCount = '',
		firstName = '',
		sc = '';
	if (profile != undefined){
		status = profile.status;
		cartTotal = profile.cartTotal;
		firstName = profile.firstName;
		context = profile.context;
        loginUrl = profile.loginUrl;
		logoutUrl = profile.logoutUrl;
        profileUrl = profile.profileUrl;
        orderStatusURL = profile.orderStatusURL;
		cartCount = profile.cartCount;
		sc = profile.sc;
        queryString = profile.queryString;
        requestURL = profile.requestURL;
        var liveHelpURL = 'onclick="' + "window.open('https://service.liveperson.net/hc/88287119/?cmd=file&file=visitorWantsToChat&site=88287119&imageUrl=http://service.liveperson.net/hcp/Gallery/ChatButton-Gallery/English/General/1a&referrer=" + requestURL + queryString + "', 'liveHelp','height=320,width=472')" + ';"';
		if (status == '1'){			
			welcomeMsg = 'Welcome, '+ firstName +'. <a href="/store/?_DARGS=/store/views/common/header/header.jsp_AF&_dynSessConf='+sc+'&/vcs/userprofiling/VCSProfileFormHandler.logout=true&_D%3A/vcs/userprofiling/VCSProfileFormHandler.logoutSuccessURLCode=+&_D%3A/vcs/userprofiling/VCSProfileFormHandler.logout=+&/vcs/userprofiling/VCSProfileFormHandler.logoutSuccessURLCode=logoutSuccessURL">(Not '+ firstName +'?)</a> <a href="' + profileUrl + '" class="account-link">My Account</a> ';
		} else {
			welcomeMsg = '<a href="' + loginUrl + '" rel="nofollow">Sign In</a> / <a href="' + loginUrl + '" rel="nofollow">Register Now</a>';
		}
		$('#loginState').html(welcomeMsg);
		$('#shopping-bag-text').html("<a href='" + context + "' rel='nofollow'>Shopping Bag ("  + cartCount + ")</a>");
	} else {
		welcomeMsg = '<a href="' + loginUrl + '" rel="nofollow">Sign In</a> / <a href="' + loginUrl + '" rel="nofollow">Register Now</a>';
		$('#loginState').html(welcomeMsg);
		$('#shopping-bag-text').html("<a href='" + context + "' rel='nofollow'>Shopping Bag (0)</a>");
	}
}
