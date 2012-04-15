/**
 * @author ezdermam
 */

NICK.namespace("avatar");
NICK.avatar.loginName = null;

NICK.avatar.DEFAULT_AVATAR_MALE   = 'm_0001_0001_0001_0001_0001';
NICK.avatar.DEFAULT_AVATAR_FEMALE = 'f_0001_0001_0001_0001_0001';
$(document).ready(function() {
	$(document).bind("authStatus loggedIn", function(){
		if (NICK.login.isLoggedIn()) {
			NICK.avatar.loginName = NICK.login.getNickName();
		}
	});
	
	if (NICK.login.isLoggedIn()) {
		NICK.avatar.loginName = NICK.login.getNickName();
	}
});

/**
 * Generates and returns a masked CSS avatar image based on
 * given size constrains
 * 
 * @param aid <string>     compsite avatar hash data
 * @param width <numeric>  amount to scale down the entire image data
 * @param height <numeric> amount of pixels to mask, when using this option
 *                         when using this option the "top baseline" of the
 *                         avatar is shifted to the top and the excess horizontal
 *                         whitespace is masked.
 * @param tightFit <bool>  determines if the containing box should fit tight to the
 *                         masked off white space
 */
NICK.avatar.image = function( aid, width, height, tightFit ) {
	var horizontal = null, vertical = null;

	var aid = aid || NICK.login.getAvatar();
	var cwidth  = !!width  ? width  : 'auto';
	var cheight = !!height ? height : 'auto';

	if ( !!width && !!height ) {
		vertical   = Math.floor((width / 241) * 130);
		horizontal = Math.floor((width / 241) * 40);
		cwidth    -= (horizontal * 2);
	}

	var path = NICK.utils.getImage('/nickcomposite-assets/' + aid + '.png?host=nick' + ( !!width ? '&width=' + width : '') );

	var template  = '<div class="UAContainer UAStyle' + ( !!height ? 'Mask' : 'Full' ) + '" style="width: ' + ( !!tightFit ? cwidth : width ) + 'px; height: ' + height + 'px;">';
		template += '<div class="UAWrapper" style="width: ' + cwidth + 'px; height: ' + cheight + 'px;">';
		template += '<img class="UAImage" src="' + path + '" alt="User Avatar" style="' + (!!height && !!width ? 'top: -' + vertical + 'px; left: -' + horizontal + 'px;' : '') + '" />';
		template += '</div>';
		template += '</div>';

	return template;
}

NICK.avatar.headshot = function( aid ) {
	return NICK.avatar.image( aid, 100, 80 );
}

NICK.avatar.hashFromSource = function( src ) {
	// 1) Cut our string down to start of ?
	// 2) Remove 4 characters for: .png
	// 3) Split to 4th /:
	return src.substring(0, src.indexOf("?") - 4).split("/")[4];
}

NICK.avatar.getDefaultAvatar = function( gender ) {
	switch( gender.toLowerCase() ) {
		case 'f':
		case 'female':
			return this.DEFAULT_AVATAR_FEMALE;
		default:
			return this.DEFAULT_AVATAR_MALE;
	}
}

/**
 * legacy method
 */
NICK.avatar.embed = function(divname,username,composite, width, height, scale, style, isSelf, asHTML) {
	NICK.utils.doLog("Deprecated Method: NICK.avatar.embed(), Please convert to: NICK.avatar.image()");

	/*if ( this.flash == true ) {
		doRegisterSwf(divname,'/assets/swf/avatarNick.swf',divname,'9.0.124.0',width+'px',height+'px',{username:username, scale:scale, style:style, isSelf:isSelf},'false','false','/dynamo/javascript/swfobject/expressinstall.swf','/common/detect/get_flash.jhtml',{wmode:"transparent",salign:"TL",allowScriptAccess:"sameDomain",swliveconnect:"false"},{});
	} else {
		$("#"+divname).empty();
		var container = $("#" + divname).addClass("buddy-avatar-image buddy-avatar-image-" + style);
		var img = '<img src="http://nick.mtvnimages-d.mtvi.com/nickcomposite-assets/'+composite+'.png?host=nick&width=' + width + '" />';

		if ( !!!asHTML ) {
			$(img).appendTo(container);
		} else {
			return '<div class="profile-headshot"><div class="buddy-avatar-image buddy-avatar-image-' + style + '">' + img + '</div></div>';
		}
	}*/
}
