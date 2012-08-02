var registration_url = '';
var contest_url = '';
var registro_redirect_url = '';
if (document.domain.indexOf('dev.origin') != -1) {
	registration_url = '';
} else if (document.domain.indexOf('qa.origin') != -1) {
	registration_url = '';
} else if (document.domain.indexOf('stage.origin') != -1) {
	registration_url = '';//http://registro.msnlatino.telemundo.com';
} else if (document.domain.indexOf('stage.enfoque.msnlatino.telemundo') != -1) {
	registration_url = 'http://stage-msnlatino.telemundo.com';
} else if (document.domain.indexOf('enfoque.msnlatino.telemundo') != -1) {
	registration_url = 'http://msnlatino.telemundo.com';
} else {
	registration_url = '';//http://registro.msnlatino.telemundo.com';
}

if (typeof parent_url != 'undefined' && parent_url != '') {
	registro_redirect_url = parent_url;
} else {
	registro_redirect_url = document.location.href;
}


var reg_containers = ".register_link, .register_btn, a#contest_create_account";
var login_containers = ".login_link, .login_btn";
var dialogopen = 0;

	//if on contest page
	if (typeof pageType != 'undefined') {
        	switch (pageType) {
                	case 'contest':
                        	contest_url += 'contest='+$("#cf").val()+'&';
                        	break;
                	default:
                        	break;
        	}
	}


	var login_popup = function(){
			$('<div id="login_popup"><iframe allowtransparency=true frameborder="0" style="width:100%!important;height:100%!important;border:0px" scrolling="no" src="'+registration_url+'/registro?'+contest_url+'act=login&redirectUrl='+registro_redirect_url+'"></iframe>')
			.dialog({
				autoOpen: true, 
				dialogClass: 'login_dialog',
				modal: true,
				stack: false,
				zIndex: 99998,
				//position: 'center',
				resizable: true,
				height: 800,
				close: function() {
					dialogopen = 0;
					$('.login_dialog').css('display', 'none');
					$('.ui-widget-overlay').css('display', 'none');
					if (typeof resetParentFrameHeight != 'undefined') {
						resetParentFrameHeight('231px');
					}
				},
				beforeClose: function(event, ui) {},
				open: function() {
				}
			});
	};
	var register_popup = function(url) {
		if('' == url)	url = registration_url+'/registro?redirectUrl='+registro_redirect_url;
		if('' != contest_url)	url = registration_url+'/concurso?'+contest_url+'act=register&redirectUrl='+registro_redirect_url;
		$('<div id="register_popup"><iframe allowtransparency=true frameborder="0" style="width:100%!important;height:100%!important;border:0px" scrolling="no" src="'+url+'"></iframe></div>')
			.dialog({
				autoOpen: true,
				dialogClass: 'register_dialog',
				modal: true, 
				stack: false,
				zIndex: 99998,
				resizable: true,
				height: 800,
				//position: 'center',
				close: function() {
					dialogopen = 0;
					$('.register_dialog').css('display', 'none');
					$('.ui-widget-overlay').css('display', 'none');
					if (typeof resetParentFrameHeight != 'undefined') {
						resetParentFrameHeight('231px');
					}
				},
				beforeClose: function(event, ui) {},
				open: function() {
				}
			});
	};
$(document).ready(function() {
	$(reg_containers).live('click', function(event){
		//if (sn_user == null) {
			event.preventDefault();
			if (typeof resetParentFrameHeight != 'undefined') {
					resetParentFrameHeight('2000px');
			}
			dialogopen = 1;
			dialogleft = parseInt($(window).width()/2 - $('.register_dialog').width()/2);
			//register_popup();
			//register_popup.dialog( "option", "position", [290,250]);
			//register_popup.dialog('open');
		//}

		if (sn_user == null) {
			url = '';
		}else{
			sn_logOut();
			return;
		}
		register_popup(url);

	});

	$(login_containers).live('click', function(event){
		if (sn_user == null) {
			event.preventDefault();
                        if (typeof resetParentFrameHeight != 'undefined') {
                                resetParentFrameHeight('2000px');
                        }
			dialogopen = 1;
			dialogleft = parseInt($(window).width()/2 - $('.login_dialog').width()/2);
			login_popup();
			//login_popup.dialog( "option", "position", [290,250]);
			//login_popup.dialog('open');
		}
	});

	if (typeof window.parent != 'undefined') {
		window.parent.$('.login_btn').click(function(event){
			if (sn_user == null) {
				event.preventDefault();
                        	if (typeof resetParentFrameHeight != 'undefined') {
                                	resetParentFrameHeight('2000px');
                        	}

				//dialogleft = window.parent.$(window).width()/2 - $('.login_dialog').width()/2;
				dialogopen = 1;
				login_popup();
				//login_popup.dialog('open');
				$('.ui-dialog-overlay').height(0);
				//login_popup.dialog( "option", "position", [290,250]);
				$('#login_popup').dialog('moveToTop');
			}
		});

		window.parent.$('.logout_btn').click(function(event){
			event.preventDefault();
			//parent.UGN.Auth.logout();
                	if (typeof resetParentFrameHeight != 'undefined') {
                        	resetParentFrameHeight('2000px');
                	}

			dialogopen = 1;
			//login_popup();
			$('.ui-dialog-overlay').height(0);
			$('#register_popup').dialog('moveToTop');
			sn_logOut();
			//return;
			//register_popup(url);
		});

		window.parent.$('.register_btn').click(function(event){
			event.preventDefault();
			if (typeof resetParentFrameHeight != 'undefined') {
					resetParentFrameHeight('2000px');
			}

			//dialogleft = window.parent.$(window).width()/2 - $('.register_dialog').width()/2;
			dialogopen = 1;
			
			//register_popup.dialog('open');
			$('.ui-dialog-overlay').height(0);
			//register_popup.dialog( "option", "position", [290,250]);
			$('#register_popup').dialog('moveToTop');
			if (sn_user == null) {
				url = '';
			}else{
				sn_logOut();
				return;
			}
			register_popup(url);

		});
	}


});
