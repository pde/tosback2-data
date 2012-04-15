






	
/*		
"#login_links  [fblink='namelink']"
"#login_links  [fblink='signlink']"
"#login_links  [fblink='facelink']"
*/	
	

// all of this is internal stuff, we're going to move this back over to xs_login_links.tmpl, but right now it's just easier to maintain with the reduced pageload

$h.util.setCookie('nexturl',(function(){return (((document.location.href.indexOf('registration') === -1) && (document.location.href.indexOf('login') === -1)) ? document.location.href : "http://"+document.domain);}()), 1);

/*function runpop(){
	window.open('/cm/seventeen/fbLinkAuth.html','name','height=330, width=620,toolbar=no,directories=no,status=no, menubar=no,scrollbars=no,resizable=no,alwaysRaised=yes,titlebar=no');
}
*/



$h.loginlinks = {
	action : { // $h.loginlinks.action.login();
		login : function(){
			$("[hfbconnLogin='loading']").show();
			$("[hfbconnLogin='noconnect'],[hfbconnLogin='connected'],[hfbconnLogin='nologin']").hide();			
			$h.FB.action.login();
		},
		logout : function(){
			$("[hfbconnLogin='loading']").show();
			$("[hfbconnLogin='noconnect'],[hfbconnLogin='connected'],[hfbconnLogin='nologin']").hide();			
			$h.FB.action.logout();
		}
	},
	site_url_location : "",
	set_site_url_location : function(str){ 
		this.site_url_location = str;
	},
	init : function(){ 
		$h.loginlinks.get_first_name();
		$h.session.ifReady.login(function(){
//			alert("login fired!")
			if (!!mag_user.facebook_id){
				FB.getLoginStatus(function(response) {
					if (response.session) {
						$h.loginlinks.render.fbconnected("fblogin");
						// logged in and connected user, someone you know
					}/* else {
						// no user session available, someone you dont know
					}*/
				});
//				$h.loginlinks.render.fbconnected(source);
			} else {
				$h.loginlinks.render.online();
			}			
			
//			$h.loginlinks.checklinked();
		});
		$h.session.ifReady.logout(function(){
//			alert("logout fired!")
			$h.loginlinks.render.offline();
//			$h.loginlinks.checklinked();
		});
		$h.FB.ifReady.login(function(){
//			alert("fblogin fired!")
			$h.loginlinks.render.fbconnected("fblogin");
//			$h.loginlinks.overrideanchortags();
		});
		$h.FB.ifReady.logout(function(){
			if (!!mag_user.user_name){
//			alert("fb logout fired! but !!mag_user so..")
				$h.loginlinks.render.online();
			} else {
//				alert("no mag_user????")
				$h.loginlinks.render.offline();
			}
//			$h.loginlinks.checklinked();
		});	
	},
	overrideanchortags : function(){ // $h.loginlinks.overrideanchortags()
		$("a").each(function(){
			var currentanchortag = $(this)[0];
			var href = currentanchortag.href;
			if (/\/registration\/logout/.test(href)){
				currentanchortag.onclick = function(){
					$h.FB.action.logout();
					return false;
				};
			} else if(/\/login\/\?signout\=1/.test(href)){
				currentanchortag.onclick = function(){
					$h.FB.action.logout();
					return false;
				};
			}
		});		
	},
	// checklinked may be obsolete, instead seperated all the calls and placed them directly in the ifReady callback events
/*	checklinked : function(source){ // $h.loginlinks.checklinked()
		if (!!mag_user.user_name){
			if (!!mag_user.facebook_id){
	alert(1)
				$h.loginlinks.render.fbconnected(source);
			} else {
	alert(2)
				$h.loginlinks.render.online();
			}
		} else if ($h.FB._vars.status === "connected") {
	alert(3)
			$h.loginlinks.render.fbconnected("fblogin");
		} else {
	alert(4)
			$h.loginlinks.render.offline();
		}
	},*/
	get_first_name : function(){ // $h.loginlinks.get_first_name();
		if (!window.mag_user) {return false;}
		var name = (mag_user.first_name || mag_user.user_name) ? (mag_user.first_name || mag_user.user_name) : "";
		var displayName = (name.length > 12) ? name.substring(0,12) + '&hellip;' : name ;
		this._vars.first_name = displayName;
	},
	_vars : {
		imgurl : "", // $h.loginlinks._vars.imgurl
		fbusername : "",
		first_name : "" // $h.loginlinks._vars.first_name
	},
	render : {
		fbconnected : function(source){ // renders fb connected w/online status
//			console.warn("render.fbconnected: GETTING MAG_USER");
			$("[hfbconnLogin='loading']").hide();
			$h.loginlinks.get_first_name();
			if (!!!$h.loginlinks._vars.imgurl){
				$("#login_links  [fblink='facelink'][hfbconnLogin='connected']").html($h.loginlinks.drawtext.connected_facelink_pleasewait());
			}		
			$("#login_links  [fblink='signlink'][hfbconnLogin='connected']").html($h.loginlinks.drawtext.connected_signlink());
			if ($h.loginlinks._vars.first_name === ""){ // a mag_user is not found, so lets create a temporary login links look to handle not logged in users
				FB.api('/me',function(response){
					console.warn("[$h.loginlinks.render.fbconnected] user is not logged in");
					$h.loginlinks._vars.imgurl = "https://graph.facebook.com/"+response.id+"/picture";
					$h.loginlinks._vars.first_name = response.first_name;
					$h.loginlinks._vars.fbusername = "link account";
					$("#login_links  [fblink='facelink'][hfbconnLogin='connected']").html($h.loginlinks.drawtext.connected_facelink_nomag());
					$("#login_links  [fblink='signlink'][hfbconnLogin='connected']").html($h.loginlinks.drawtext.connected_signlink_nomag());
					$("[hfbconnLogin='nologin']").hide();
					$("[hfbconnLogin='noconnect']").hide();
					$("[hfbconnLogin='connected']").fadeIn();
				});
			} else if (source === "fblogin"){
//				alert("hi")
				FB.api('/me', function(response) {
					$h.loginlinks._vars.imgurl = "https://graph.facebook.com/"+response.id+"/picture";
//					$h.loginlinks._vars.fbusername = response.link.split("facebook.com/")[1];
//					response.link.split("facebook.com/")[1]
					
					if (response.link.search("profile.php") === -1){// doing some corrective code to detect whether or not the user has created a profile url
						$h.loginlinks._vars.fbusername = response.link.split("facebook.com/")[1];
					} else {// if not, degrade gracefully to first name
						// also let's check if the mag_user.first_name even exists...
						if ($h.loginlinks._vars.first_name === ""){
							$h.loginlinks._vars.first_name = response.first_name;
							$h.loginlinks._vars.fbusername = "profile";
						} else {
							$h.loginlinks._vars.fbusername = response.first_name;
						}
					}

//					$("#login_links  [fblink='facelink'][hfbconnLogin='connected']").html('<img src="'+$h.loginlinks._vars.imgurl+'" id="fb_minicon" height="21" width="21" /> <span class="exclam">Hi '+mag_user.first_name+'!</span> <a class="sign_in_link" href="'+$h.loginlinks.site_url_location+'/registration/editProfile.html">('+$h.loginlinks._vars.fbusername+')</a>');
					$("#login_links  [fblink='facelink'][hfbconnLogin='connected']").html($h.loginlinks.drawtext.connected_facelink());
					$("[hfbconnLogin='nologin']").hide();
					$("[hfbconnLogin='noconnect']").hide();
					if ($.browser.msie){
						$("[hfbconnLogin='connected']").show();
					} else {
						$("[hfbconnLogin='connected']").fadeIn();
					}
					
				});
			}else {
//				alert("2")
				$("[hfbconnLogin='nologin']").hide();
				$("[hfbconnLogin='noconnect']").hide();
				if ($.browser.msie){
					$("[hfbconnLogin='connected']").show();
				} else {
					$("[hfbconnLogin='connected']").fadeIn();
				}
				
			}
		},
		online : function(){ // renders online but NOT fb connected
			$("[hfbconnLogin='loading']").hide();
			$h.loginlinks.get_first_name();
			$("[hfbconnLogin='nologin']").hide();
			$("[hfbconnLogin='connected']").hide();		
//alert("noconnect_namelink"+$h.loginlinks.drawtext.noconnect_namelink())
			$("#login_links  [fblink='namelink'][hfbconnLogin='noconnect']").html($h.loginlinks.drawtext.noconnect_namelink());
//alert("noconnect_facelink"+$h.loginlinks.drawtext.noconnect_facelink());
			$("#login_links  [fblink='facelink'][hfbconnLogin='noconnect']").html($h.loginlinks.drawtext.noconnect_facelink());
			$("#login_links  [fblink='signlink'][hfbconnLogin='noconnect']").html($h.loginlinks.drawtext.noconnect_signlink());
			if ($.browser.msie){ // ghetto fix.. clean this up later
				$("[hfbconnLogin='noconnect']").show();
			} else {
				$("[hfbconnLogin='noconnect']").fadeIn();
			}
		},
		offline : function(){
			$("[hfbconnLogin='loading']").hide();
			$("[hfbconnLogin='noconnect']").hide();
			$("[hfbconnLogin='connected']").hide();		
//alert("nologin_signlink"+$h.loginlinks.drawtext.nologin_signlink())
			$("#login_links  [fblink='signlink'][hfbconnLogin='nologin']").html($h.loginlinks.drawtext.nologin_signlink());
//alert("nologin_namelink"+$h.loginlinks.drawtext.nologin_namelink())
			$("#login_links  [fblink='namelink'][hfbconnLogin='nologin']").html($h.loginlinks.drawtext.nologin_namelink());
//alert("nologin_facelink"+$h.loginlinks.drawtext.nologin_facelink())
			$("#login_links  [fblink='facelink'][hfbconnLogin='nologin']").html($h.loginlinks.drawtext.nologin_facelink());
//$("#login_links  [fblink='facelink'][hfbconnLogin='nologin']").html("HI");
			if ($.browser.msie){
				$("[hfbconnLogin='nologin']").show();
			} else {
				$("[hfbconnLogin='nologin']").fadeIn();
			}
		}
	},
	drawtext : {
		connected_facelink_pleasewait : function(){
//			$h.console.log("connected_facelink_pleasewait");
			return '<span class="exclam">Hi '+$h.loginlinks._vars.first_name+'!</span> <a class="sign_in_link" href="'+$h.loginlinks.site_url_location+'/registration/editProfile.html">(loading..)</a>';
		},// $h.loginlinks.drawtext.nologin_signlink 
		connected_facelink_nomag : function(){
//			$h.console.log("connected_facelink_nomag");
			return '<img src="'+$h.loginlinks._vars.imgurl+'" id="fb_minicon" height="21" width="21" /> <span class="exclam">Hi '+$h.loginlinks._vars.first_name+'!</span> <a class="sign_in_link" href="#" onclick="$h.FB.macro.checkLink()">('+$h.loginlinks._vars.fbusername+')</a>';
		},
		connected_signlink_nomag : function(){
//			$h.console.log("connected_signlink_nomag");
			return '<a class="sign_in_link" href="#" onclick="$h.loginlinks.action.logout();return false;">Sign Out</a>';
		},
		connected_facelink : function(){
//			$h.console.log("connected_facelink");
			return '<img src="'+$h.loginlinks._vars.imgurl+'" id="fb_minicon" height="21" width="21" /> <span class="exclam">Hi '+$h.loginlinks._vars.first_name+'!</span> <a class="sign_in_link" href="'+$h.loginlinks.site_url_location+'/registration/editProfile.html">('+$h.loginlinks._vars.fbusername+')</a>';
		},//
		connected_signlink : function(){
//			$h.console.log("connected_signlink");
			return '<a class="sign_in_link" href="#" onclick="$h.loginlinks.action.logout();return false;">Sign Out</a>';
		},
		noconnect_namelink : function(){
//			$h.console.log("connected_namelink");
			return '<span class="exclam">Hi</span> <a class="sign_in_link" href="'+$h.loginlinks.site_url_location+'/registration/editProfile.html">'+$h.loginlinks._vars.first_name+'!</a>';
		},
		noconnect_facelink : function(){
			return '<a class="sign_in_link" href="#" onclick="$h.loginlinks.action.login(); return false;">Connect with Facebook</a>';
		},
		noconnect_signlink : function(){
			return '<a class="sign_in_link" href="'+$h.loginlinks.site_url_location+'/login/?signout=1">Sign Out</a>';
		},
		nologin_signlink : function(){
			return '<a class="sign_in_link" href="'+$h.loginlinks.site_url_location+'/login/">Sign In</a>';
		},
		nologin_namelink : function(){
			return '<a class="sign_in_link_exclam" href="'+$h.loginlinks.site_url_location+'/registration/">Join Free!</a>';
		},
		nologin_facelink : function(){
			return '<a class="sign_in_link" href="#" onclick="$h.loginlinks.action.login(); return false;">Sign in with Facebook</a>';
		}
	}
};

			$("[hfbconnLogin='loading']").show();
			$("[hfbconnLogin='noconnect'],[hfbconnLogin='connected'],[hfbconnLogin='nologin']").hide();
			
			
	// legacy hacky associated with the /login page
    $('a.sign_in_link').bind("click", function(){
        // Set next url cookie
        if ( (document.location.href.indexOf('registration') === -1) && (document.location.href.indexOf('login') === -1) ) {
			$h.util.setCookie('nexturl', document.location.href, 1);
        } else {
			$h.util.setCookie('nexturl', "http://" + document.location.host, 1);
        }
        window.location = _location;
    });			
