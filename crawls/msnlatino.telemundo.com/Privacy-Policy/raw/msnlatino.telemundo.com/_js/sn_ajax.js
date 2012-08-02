var sn_user = null;

var tmtLogin = 0;
var alertTimeout = 0;

/*$(document).ready( function() {
	var sn_cook = sn_readCookie('sn_nbc_b');
	if (sn_cook != null) {
		var sn_cookieData = unescape(sn_cook).split('|');
		var sn_currentUserData = new sn_UserData(sn_cookieData[1], sn_cookieData[2], sn_cookieData[3], sn_cookieData[4], sn_cookieData[5], sn_cookieData[6]);
		sn_user = sn_currentUserData;
	}
});*/

function sweep_check_logged_in() {
	if (sn_user != null) return true;
	sn_require_ajax_login();
	return false;
}

function vote_check_logged_in() {
	if (sweep_check_logged_in()) sn_ajax_vote(ajaxLoginVoteTarget);
}

function sn_ajax_vote(optionCode) {
	//console.log('optionCode: ' + optionCode);
	var data={};
	data['question_'+voteQuestionID] = optionCode;
	data['action']='votePollByID';
	data['pollID']=votePollID;
	//settings.messenger.wait_on(self);
		$.ajax(setAjax({
			data:data,
			dataType: "json",
			processData: true,
			success: function(d){//d,message_box,output_function, use_internal_lightbox
				//MGRad.refreshAds();
			//settings.messenger.wait_off(self);
				//console.log(d);
				m.alertbox(d.messages[0]);
				//alert("Hello");
			}
		}));
}

function utf8_encode ( string ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
 
    string = (string+'').replace(/\r\n/g, "\n").replace(/\r/g, "\n");
 
    var utftext = "";
    var start, end;
    var stringl = 0;
 
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
 
        if (c1 < 128) {
            end++;
        } else if((c1 > 127) && (c1 < 2048)) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc != null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;
        }
    }
 
    if (end > start) {
        utftext += string.substring(start, string.length);
    }
 
    return utftext;
}

function sn_show_sendToFriend()
{
m.alertbox('<div class="sn_popup_form"><ul><li><label for="lblFriendName">Nombre de tu amigo:</label><input name="lblFriendName" class="input_text" type="text" /></li><li><label for="lblFriendEmail">Correo de tu amigo:</label><input name="lblFriendEmail" class="input_text" type="text" /></li></ul><div class="stf_popup_submit"><button value="Cancelar" type="button" onclick="m.remove_alertbox();">Cancelar</button><button value="Enviar" type="button" onclick="sn_ajax_sendToFriend($(this).parent().parent().find(\'input[@name=lblFriendName]\').val(), $(this).parent().parent().find(\'input[@name=lblFriendEmail]\').val()); m.remove_alertbox();">Enviar</button></div></div>');
$('#lightbox').unbind('click');
$('#gateway_message_alertbox').unbind('click');
}

function sn_ajax_sendToFriend(friendName, friendEmail)
{
	var title = utf8_encode((($('div#mod_featured_article div.image_item dt.title').length > 0) ? $('div#mod_featured_article div.image_item dt.title') : $('#gallery_title')).text());
	var url = (typeof g != 'undefined' && typeof g.UUID_array != 'undefined') ? ('#'+g.UUID_array[g.at_image]) : '';

	$.ajax({
		type: "POST",
		url: "/services/ajax/sendToFriend",
		data: 'friendName=' + escape(friendName) + '&friendEmail=' + escape(friendEmail) + '&title=' + escape(title) + '&url=' + escape(url),
		success: function(msg) {
			console.log(msg);
			var ms = sn_ajax_callback_no_popup(msg);
			var success = ms[0];
			if (!success) {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			} else {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			}
		}
	});

}

function sn_ajax_addFavoritePhoto(pid)
{
	$.ajax({
		type: "GET",
		url: "/services/ajax/addFavoritePhoto",
		data: 'id=' + escape(pid) + '&title=' + escape(utf8_encode($('#gallery_title').text())),
		success: function(msg) {
			console.log(msg);
			var ms = sn_ajax_callback_no_popup(msg);
			var success = ms[0];
			if (!success) {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			} else {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			}
			$('#info_block ul.drop_tab .add_to_favorites').bind('click',function(){sn_ajax_addFavoritePhoto(g.UUID_array[g.at_image])});
		}
	});
	$('#info_block ul.drop_tab .add_to_favorites').unbind('click');
}

function sn_ajax_removeFavoritePhoto(elt)
{
	console.log('removeFavoritePhoto');
	var myDL = $(elt).parent().parent();
	myDL.parent().remove();
	var pid = myDL.find('dd.contentID').html();

	console.log('pid = ' + pid);

	$.ajax({
		type: "GET",
		url: "/services/ajax/removeFavoritePhoto",
		data: 'id=' + escape(pid),
		success: function(msg) {
			console.log(msg);
			var ms = sn_ajax_callback_no_popup(msg);
			var success = ms[0];
			if (!success) {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			} else {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			}
		}
	});
}

function sn_ajax_listFavoritePhotos()
{
	console.log('listFavoritePhotos');
	$.ajax({
		type: "GET",
		url: "/ajax/listFavoritePhotos",
		success: function(msg) {
			eval('var z = ' + msg);
			for (i in z) {
				console.log(i);
			}
		}
	});
}

function sn_ajax_addFavoriteVideo(vid)
{
	$.ajax({
		type: "GET",
		url: "/services/ajax/addFavoriteVideo",
		data: 'id=' + escape(vid),
		success: function(msg) {
			console.log(msg);
			var ms = sn_ajax_callback_no_popup(msg);
			var success = ms[0];
			if (!success) {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			} else {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			}
			$('#info_block ul.drop_tab .add_to_favorites')[0].href = 'javascript:sn_ajax_addFavoriteVideo(viduuid)';
		}
	});
	$('#info_block ul.drop_tab .add_to_favorites')[0].href = '#';
}

function sn_ajax_removeFavoriteVideo(elt)
{
	console.log('removeFavoriteVideo');
	var myDL = $(elt).parent().parent();
	myDL.parent().remove();
	var vid = myDL.find('dd.contentID').html();

	console.log('vid = ' + vid);

	$.ajax({
		type: "GET",
		url: "/services/ajax/removeFavoriteVideo",
		data: 'id=' + escape(vid),
		success: function(msg) {
			console.log(msg);
			var ms = sn_ajax_callback_no_popup(msg);
			var success = ms[0];
			if (!success) {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			} else {
				m.alertbox('<span class="sn_notice">'+ms[1]+'</span>');
			}
		}
	});
}

function sn_ajax_getRelatedVideos(id) {
	$.ajax({
		type: "GET",
		url: "/ajax/getRelatedVideos",
		data: 'uuid='+id,
		success: function(msg) {
			$('#mod_related_galleries').replaceWith(msg);
		}
	});
}
function sn_ajax_getRelatedSegments(id) {
	$.ajax({
		type: "GET",
		url: "/ajax/getRelatedSegments",
		data: 'uuid='+id,
		success: function(msg) {
			$('#thumbs').html(msg);
		}
	});
}

function sn_require_ajax_login(required, cdnLogin) {
	m.remove_alertbox();
	if (typeof required == 'undefined')
		var required = false;
	if (typeof cdnLogin == 'undefined')
		var cdnLogin = false;
	var cancelOnclick = required ? 'document.location = \'/\';' : 'm.remove_alertbox();';
	var registerTarget = '/accounts/registration_start' + (cdnLogin ? '?cdn=1' : '');
	var loginAction = 'javascript:' + (required ? 'timeoutLoggedIn('+(cdnLogin ? 'true' : 'false')+');' : '') + 'sn_ajax_login();';
	var cdnHidden = cdnLogin ? '<input type="hidden" name="cdn" value="1" />' : '';
	loginAction='/registro';
	registerTarget='/registro?act=register&redirectUrl='+window.location.href;
	m.alertbox('<div id="login_popup"><div class="module module_dark"><form action="'+loginAction+'" method="POST" onsubmit="return validateRequiredFields([this.email, this.password]);">'+cdnHidden+'<div class="module_head"><h3>por favor ingresa</h3><button class="site_btn_bg popup_cancel_btn" type="button" onclick="'+cancelOnclick+'">cancelar</button><input type="hidden" name="act" value="login" id="act" /><input type="hidden" name="redirectUrl" value="'+window.location.href+'" id="redirectURL" /></div><div class="module_content"><div class="fb_loginButton"><fb:login-button size="medium" background="dark" length="long" onlogin="facebook_onlogin_ready();"></fb:login-button></div><ul id="login_popup_cred"><li>Correo:<input type="text" name="email"/></li><li>Clave:<input type="password" name="password"/></li><li><button class="site_btn_bg popup_login_btn" type="submit">Ingresa</button></li></ul><a href="/registro?act=forgotpassword">&#191;Olvidaste tu contrase&#241;a?</a><div class="clear"></div><div id="login_popup_reg"><p>&#191;Necesitas una cuenta de Telemundo?</p><a href="'+registerTarget+'">Reg&#237;strate aqu&#237;</a><div class="clear"></div></div></div></div></form></div>');
	if (typeof ajaxLoginUgcTarget != 'undefined') $('#login_popup_reg a').attr('target', '_blank');
	$('#lightbox').css('opacity','0.9');
	$('#lightbox').unbind('click');
	$('#gateway_message_alertbox').addClass('login_popup_wrapper');
	$('#gateway_message_alertbox').unbind('click');

	// Facebook Connect - set onConnectedFunction function
	onConnectedFunction = fbcCheckUserExists;
	// set reg config file
	cf = "simple_reg";
	// set registration ajax and app uris
	nbcudps_ajaxURL = "/registration/app";
	nbcudps_appURL = "/registro";
	// render fb connect button
	refreshXFBMLnow();
}

function timeoutLoggedIn(cdnLogin) {
	setTimeout('checkLoggedIn('+(cdnLogin ? 'true' : 'false')+');', 5000);
}

function checkLoggedIn(cdnLogin) {
	if (typeof cdnLogin == 'undefined')
		var cdnLogin = false;
	if (sn_user != null && typeof sn_user.a == 'string') {
		//clearTimeout();
	} else {
		sn_require_ajax_login(true, cdnLogin);
	}
}

function sn_ajax_login()
{
	var cdnSuffix = ($('input[@name=cdn]').length > 0 && $('input[@name=cdn]').val() == '1') ? '&cdn=1' : '';
	//console.log('logging in');
	$('#sn_btnSubmit').attr({disabled:"disabled"});
	sn_ajax_busy('#sn_login_busy', 1, 'Logging In');
	 $.ajax({
	   type: "POST",
	dataType: "text",
	   url: "/services/ajax_login",
	   data: "email=" + $('input[@name=email][@value!=\'\'][@value!=correo]').escapeVal() +"&password=" + $('input[@name=password][@value!=\'\'][@value!=clave]').escapeVal() + cdnSuffix,
	  success: function(msg)
				{
					var ms;
					ms=sn_ajax_callback_no_popup(msg);
					var success=ms[0];
					var message=ms[1];
console.log(success);
console.log(message);
					sn_ajax_busy('#sn_login_busy', 0, '');
					if(!success)
					{
m.alertbox('<span class="sn_notice">El ingreso fall&oacute;.</span>');
						if($('#sn_alert_messages').html()!=null)
						{
							$('#sn_alert_messages').slideUp('normal',function(){
							$('#sn_alert_messages').empty();
							$('#sn_alert_messages').append(message);
							$('#sn_alert_messages').slideDown();
							});
						}
						else
						{
							$('#sn_messages').slideUp();
							$('#sn_messages').empty();
							$('#sn_messages').append(message);
							$('#sn_messages').slideDown();
						}
						$('#sn_btnSubmit').attr({disabled:""});
					}
					else
					{
if (message == 'nocdn') {
	setTimeout("document.location.href = '/accounts/registration_step2?cdnconvert=1';", 2000);
	m.alertbox('<span class="sn_notice">Como no eres miembro de Club de Noveleras, te llevaremos al sitio donde puedes registrarte.</span>');
} else {
var msgParts = msg.split('&');
var oi = 'http://www.google.com/';
if (msgParts.length > 2) {
	var oiParts = msgParts[2].splitFirst('=');
	oi = unescape(oiParts[1]);
}
if (document.location.href.indexOf('tu_mundo') != -1) document.location = document.location.href;
	if (typeof ajaxLoginSweepTarget != 'undefined') setTimeout("document.location.href = '"+ajaxLoginSweepTarget+"';", 2000);
	if (typeof ajaxLoginUgcTarget != 'undefined') setTimeout("document.location.href = '"+ajaxLoginUgcTarget+"';", 5000);
	if (typeof ajaxLoginVoteTarget != 'undefined') setTimeout("sn_ajax_vote('"+ajaxLoginVoteTarget+"');", 5000);
	m.alertbox('<span class="sn_notice">Ingresaste con &eacute;xito.</span><iframe style="display: none" src="'+oi+'" width="200" height="200"></iframe>');
}
						if($('#sn_alert_messages').html()!=null)
						{
							$('#sn_alert_messages').slideUp();

						}
						var sn_cookieData = unescape(sn_readCookie('sn_nbc_b')).split('|');
console.log('logged in');
						// create new user data object with data from cookie
						var sn_currentUserData = new sn_UserData(sn_cookieData[1], sn_cookieData[2], sn_cookieData[3], sn_cookieData[4], sn_cookieData[5], sn_cookieData[6]);
						sn_user = sn_currentUserData;
						//GUUID changes
						userName=sn_currentUserData.f;
console.log('calling displayUserNav with userName ' + userName);
						sn_displayUserNavigation(userName);
						$('#sn_messages').slideUp();
						$('#sn_messages').empty();
						$('#sn_messages').append(message);
						$('#sn_messages').slideDown();
						$('#sn_login_form').slideUp();
					}

				}
, error: function() { console.log('Error'); console.error(arguments); }
	 });
	if ($('#gateway_message_alertbox').is('*')) m.remove_alertbox();
}

function sn_ajax_callback_no_popup(msg)
{
        if (msg.indexOf('&') != -1)
        {
                var msgParts = msg.split('&');

                var successParts = msgParts[0].splitFirst('=');
                var messageParts = msgParts[1].splitFirst('=');
                var message = unescape(messageParts[1]);
                if (successParts[0] == 'success' && successParts[1] == 1)
                {
                        // success
                        return new Array(1,message);
                }
                else if (successParts[0] == 'success' && successParts[1] == 0)
                {
                        // failure
                        message='';
                        for(i=1;i<msgParts.length;i++)
                        {
                                messageParts = msgParts[i].splitFirst('=');
                                if(messageParts[0]=='error')
                                {
                                        message+=unescape(messageParts[1])+'<br/>';
                                }
                        }
                        return new Array(0,message);
                }
        }
        return new Array(0,'The server gave an invalid response, please try again');
}

// cookie functions
function sn_createCookie(name,value,days) {
        if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
}

function sn_readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
}

function sn_eraseCookie(name) {
        sn_createCookie(name,"",-1);
}

// user data object
var sn_UserData = function(a, b, c, d, e, f, g) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = g;
}

// extract cookie data
if (sn_readCookie('sn_nbc_b'))
{
        var sn_cookieData = unescape(sn_readCookie('sn_nbc_b')).split('|');

        // create new user data object with data from cookie
        var sn_currentUserData = new sn_UserData(sn_cookieData[1], sn_cookieData[2], sn_cookieData[3], sn_cookieData[4], sn_cookieData[5], sn_cookieData[6], sn_cookieData[7]);
	sn_user = sn_currentUserData;
	$(document).ready(function() { sn_displayUserNavigation(sn_user.f); });
}

function sn_displayUserNavigation(userName)
{
	var wr='http://msnlatino.telemundo.com';
	if(window['SMARTY_WEBROOT']!==undefined){
		wr=SMARTY_WEBROOT;
	}
	
	$('.login_link').empty();
	$('.login_link').append(((sn_user.d == 'ams-202') ? '<span class="welcome_text">Bienvenida</span>' : '<span class="welcome_text">Bienvenido</span>') + ' <a href="' + wr + '/registro?act=settings">'+userName+'</a>');
	$('.register_link').empty();
	$('.register_link').append('<a href="javascript:return false;">salir</a>');
	$('#login_form').slideUp("fast");
	$('#media_links').show();

        /*$('span#welco_mess').append('Hello, ' + userName + '!');
        $('a#sn_mynav_home').attr({ href: '/' + userName + '?e=1'});
        $('a#sn_mynav_view').attr({ href: '/' + userName + '?v=1'});
        if (document.getElementById("mm_welcomeMessageProfileButton"))
                document.getElementById("mm_welcomeMessageProfileButton").style.display = "block";
        if (document.getElementById("nav-funct"))
                document.getElementById("nav-funct").style.visibility = "visible";
        $('div#nav-funct ul').show();*/
}

function validateRequiredFields(arr) {
	var good = true;
	for (var i = 0; i < arr.length; i++) {
		elt = arr[i];
		$(elt).parent().find('span.valRequired').remove();
		if (elt.value == '') {
			good = false;
			//$("#login_popup_cred").find("input[@type=password]")
			$(elt).parent().prepend('<span class="valRequired">REQUIRED: </span>');
		}
	}
	return good;
}

$(document).ready( function() {
	m.origAlertbox = m.alertbox;

	m.alertbox = function(t) {
		if (alertTimeout) {
			this.remove_alertbox();
			clearTimeout(alertTimeout);
			alertTimeout = 0;
		}

		this.origAlertbox(t);

		if ($('#gateway_message_alertbox span.sn_notice').length > 0) {
			alertTimeout = setTimeout('m.remove_alertbox();', 5000);
		}
	}
});
