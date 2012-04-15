var salon_logged_in = false;
var wp_login = "";
var login = "";
window.SalonLogin = {};
SalonLogin.buildPage = function($) {
	login = getCookie( "salon_login" );
	wp_login = getCookie( "salon_logged_in_cookie" );
	if( login !== null && login.length > 0 && wp_login !== null && wp_login.length > 0 )
	{
		salon_logged_in = true;
		login = decodeURIComponent( login );
		login = login.replace( "+", " " );	
		jQuery(".salonShowUsername").html( ', '+decodeURI( login ));
		jQuery("#loginIn").toggle( true );
		jQuery("#loginOut").toggle( false );
	} else {
		salon_logged_in = false;
		jQuery("#loginIn").toggle( false );
		jQuery("#loginOut").toggle( true );
	}
};

/* 20110918 DEPRECATED login is only on the login popup
var conf=
{
        APIKey: salon_gigya_key
        ,enabledProviders: salon_gigya_providers_register
}
var login_params=
{
        showTermsLink: 'false'
        ,height: 20
        ,width: 55
        ,containerID: 'componentDiv'
        ,UIConfig: '<config><body><controls><snbuttons buttonsize="15"></snbuttons></controls></body></config>'
        ,autoDetectUserProviders: ''
        ,facepilePosition: 'none'
}
*/
function launchLoginPopup(loc)
{
	var width=800;
	var height=450;
	var left = (screen.width/2)-(width/2);
	var top = (screen.height/2)-(height/2);
	if (loc == 'register') {
		var url = salon_ssl_home + '/wp-login.php?action=register';
	} else {
		var url = salon_ssl_home + '/wp-login.php?redirect_to='+window.location;
	}
	var loginWindow = window.open( url, 'loginWindow', 'height='+height+',width='+width+',top='+top+',left='+left+'location=yes,menubar=no,status=0,toolbar=0' ); // left=250 top=250
	loginWindow.focus();
}

