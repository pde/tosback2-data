 // code yanked from ajaxian: http://ajaxian.com/archives/graceful-degradation-of-firebug-$h.console-object Thanks, ajaxian! :-) - Alex
// code yanked from the Yahoo media player. Thanks, Yahoo.
if (! ("console" in window) || !(("firebug" in console) || (navigator.userAgent.toLowerCase().indexOf('chrome') > -1))) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupCollapsed"
                 , "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i <names.length; ++i) window.console[names[i]] = function() {};
}

/** initial instantiation check for hearst object
 *  I call it: $h
 *   - Alex
 */
if (!window.$h) {window.$h = {};}


// heehee, mapping console to $hearst obj
window.$h.console = window.console;





/*
 * Hearst Utilities Object
 * - first we have to assess whether or not this utilties object already exists...
 * 
 */
(function(){
	// local var to spam console messages, set verbose to false to turn off the spam
	var verbose = false;
	if ($h.util){
		if (verbose) $h.console.warn("$h.utilities object exists");
	} else {
		if (verbose) $h.console.log("building: $h.util");
		$h.util = {
			deleteCookie: function(name){
				if (verbose) $h.console.log("$h.util.deleteCookie: "+name);
				$h.util.setCookie(name,null);
			},
			setCookie: function(name,value,options) {
				if (verbose) $h.console.log("$h.util.setCookie: "+name+":"+value)
			    if (typeof value != 'undefined') { // name and value given, set cookie
					options = options || {};
					if (value === null) {
						value = '';
						options.expires = -1;
					}
					var expires = '';
					if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
						var date;
						if (typeof options.expires == 'number') {
							date = new Date();
							date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
						} else {
							date = options.expires;
						}
						expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
					}
					// CAUTION: Needed to parenthesize options.path and options.domain
					// in the following expressions, otherwise they evaluate to undefined
					// in the packed version for some reason...
					var path = options.path ? '; path=' + (options.path) : '';
					var domain = options.domain ? '; domain=' + (options.domain) : '';
					var secure = options.secure ? '; secure' : '';
					document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
				}
			},
			getCookie: function(name) {
				if (verbose) $h.console.log("$h.util.getCookie: "+name);
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			},
			getParameter: function(name,optstring){
				if (verbose) $h.console.log("$h.util.getParameter: "+name)
				var thestring = (!optstring) ? window.location.href : "?"+optstring;
				name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
				var regexS = "[\\?&]"+name+"=([^&#]*)";
				var regex = new RegExp( regexS );
				var results = regex.exec( thestring );
				if( results == null )
					return "";
				else
					return results[1];
			},
			buildScriptTag: function(src){
				if (typeof(src) == "undefined") {src=""}
				var t_src = src.split("&ha=1")[0];
				if (!!!t_src || (t_src == "undefined")) {
					if (verbose) $h.console.log("$h.util.buildScriptTag[FAILED]:"+src);
				} else {
					if (verbose) $h.console.log("$h.util.buildScriptTag: "+src);
					document.write('<scr' + 'ipt src="'+src+'" language="javascript"></scr' + 'ipt>');
				}
			},
			alert : function(txt){
				if (verbose) $h.console.log("$h.util.alert: "+txt)
				alert(txt);
			}
		};
	}
})();







/*
 * Hearst Session Object
 * -the intention is to create this anonymously and map to window.$h
 * - in the first iteration, we create a basic session object and map it.
 * - let's work on fleshing this out
 */
(function(){
	// intialize the session state
	var _session = {
		"ready": false,
		"ha": !!$h.util.getParameter("ha"),
		"cacheBust": Math.floor(Math.random()*100001),
		"mag_user": null,
		"hearst_user": null,
		"mag_user_listener": null,
		"hearst_user_listener": null,
		"hearst_and_mag_user_listener": null
		
	};
	$h.session = _session;
	//$h.console.log($h.session);
	
	/************************************************************
	 *  $h.session skeleton is ready, lets build out some stuff..
	 */

	/* check High Availability
	 *  during HA, vars mag_user and hearst_user are empty objects, I can either call the script tag with HA set on,
	 *  or simply build my own empty objects. I'm gonna build my own empty object to limit unnecessary server calls
	 */
	if ($h.session.ha){
		$h.console.log("SESSION: high availability");
		window.hearst_user = {};
		window.mag_user = {};
		$h.util.buildScriptTag(_ghearst_vars.ams_ads_script_src+"&ha=1")
	}else {
		// when we aren't in HA mode, build regular script tag..
		$h.util.buildScriptTag(_ghearst_vars.ams_ads_script_src)
		var servicesurl = "services.hearstmags.com/registration/get_hearst_user.js?cachebust="+$h.session.cacheBust;
		if (/http\:\/\/betapreview/.test(document.location.href)){
			$h.console.log("SESSION: [get_hearst_user] betapreview detected!");
			//if (/realage/.test(document.location.href)){
			//$h.console.log("SESSION: [get_hearst_user] REALAGE AUTHENICATION ERROR! Please check http://betapreview.services.hearstmags.com/registration/get_hearst_user.js substituting live temporarily..");
			//	servicesurl = "http://"+servicesurl;
			//} else /
			servicesurl = document.location.protocol+"//betapreview."+servicesurl;
			//}
		} else if (/http\:\/\/alphapreview/.test(document.location.href)){
			$h.console.warn("SESSION: [get_hearst_user] alphapreview detected!");
			servicesurl = document.location.protocol+"//alphapreview."+servicesurl;
		} else {
			servicesurl = document.location.protocol+"//"+servicesurl;
		}
		
		// build get_hearst_user.js script tag..
		$h.util.buildScriptTag(servicesurl);
		
		// and finally, ghetto cookie hack to find if any of these cookies exist..
		/* KEEP IN MIND this is the ghetto function used to check for the cookie, instantiated anonymously
		 * 
		 */
		if ((function(){
			var cookiefound = false;
			var cookies = ["fSpaceSSOUserId","fSpaceSSOUserEmail","fSpaceSSOUserCheck","fSpaceSSOExpires"/*,"cgi-session-id","hm_userid"*/,"user_name"];
			for (var i in cookies){if (!!$h.util.getCookie(cookies[i])){cookiefound = true;}}
			return cookiefound;
			})()// end the anonymous function call
		){
			// if cookie was found  build the get_mag_user.js script tag..
			$h.console.log("SESSION: session cookies found");
			$h.util.buildScriptTag("/registration/get_mag_user.js?cachebust="+$h.session.cacheBust);
		} else {
			// if cookie was NOT found, make an empty mag_user object..
			$h.console.log("SESSION: creating empty mag_user");
			window.mag_user = {};
		}
	}

	
	/*
	 * docloc grandfathered code that's left over from get_mag_user.js
	 *  - ugly as sin, standardize via $h.util.setCookie("docloc",document.location);
	 *  - maintenance code needs a place to live however.
	 */
	var docloc = new String(document.location);
	if(docloc.indexOf("/registration/") < 0) document.cookie='docloc='+docloc+";path=/";
	
	
	 
	

	/*********************************
	 *  Listen for mag_user and hearst_user, once these are both found, call $h.session.init
	 *  
	 *  Listeners are put in because of the async nature of these vars coming in place
	 *   - via script tags which have the vars defined
	 *   - typically will only really matter when a user has logged in at some point
	 *   - but its better to be safe than sorry..
	 *  
	 */
	$h.session.mag_user_listener = setInterval(function(){
		if (!!window.mag_user){// mag_user exists! MAP it to $h.session
			$h.session.mag_user = window.mag_user;
			window.clearInterval($h.session.mag_user_listener);
		}
	},500);
	
	$h.session.hearst_user_listener = setInterval(function(){
		if (!!window.hearst_user){// hearst_user exists! MAP it to $h.session
			$h.session.hearst_user = window.hearst_user;
			window.clearInterval($h.session.hearst_user_listener);
		}
	},500);
	
	$h.session.hearst_and_mag_user_listener = setInterval(function(){
//		console.warn("[*********]  NOT FOUND YET[mag_user:"+(mag_user === undefined)+"][hearst_user:"+(hearst_user === undefined)+"]")
		if((!!$h.session.mag_user) && (!!$h.session.hearst_user)){
			window.clearInterval($h.session.hearst_and_mag_user_listener);

			 /* We've turned session.ready into an object
			  * WARNING: beware the distinction between the Bool session.ready and Obj session.isReady
			  */
			$h.session.ready = true;

			/** Putting in some assertion checks
			 * 
			 */
			var assert_cookie_username = $h.util.getCookie('user_name');
			$h.console.assert((mag_user.user_name==hearst_user.user_name), "[AUTH] mag_user.user_name and mag_user.user_name mismatch! [mag_user:"+mag_user.user_name+"][hearst_user:"+hearst_user.user_name+"]");
			$h.console.assert(((assert_cookie_username==mag_user.user_name)&&(assert_cookie_username==hearst_user.user_name)&&(mag_user.user_name==hearst_user.user_name)), "[AUTH] user_name mismatch! [cookie:"+assert_cookie_username+"][mag_user:"+mag_user.user_name+"][hearst_user:"+hearst_user.user_name+"]");
			$h.console.assert((assert_cookie_username==mag_user.user_name), "[AUTH] cookie user_name and mag_user.user_name mismatch! [cookie:"+assert_cookie_username+"][mag_user:"+mag_user.user_name+"]");





			/* TESTING OUT MULTI SWITCH CONDITIONAL
			 *
			 */
			 
			if ((!hearst_user.hasOwnProperty("initial_login")) && (!hearst_user.hasOwnProperty("user_name")) && (mag_user.hasOwnProperty("user_name"))){
				//var objdump = "\n\n\n"+dumpObj(mag_user,"mag_user","  ",5)+"\n\n\n"+dumpObj(hearst_user,"hearst_user","  ",5);
				//$h.console.error("[SESSION COOKIE] : logged_in session check"+objdump);
				$h.console.warn("[SWITCH 1] Executing: MULTI LOGOUT");

				var redirUrl = "/registration/logout?next_url=" + document.URL;
//				$h.util.deleteCookie('cgi-session-id');
//				$h.util.deleteCookie('chkcookie');
				$h.util.deleteCookie('fSpaceSSOUserId');
				$h.util.deleteCookie('fSpaceSSOUserId');
				$h.util.deleteCookie('fSpaceSSOUserEmail');
				$h.util.deleteCookie('fSpaceSSOUserCheck');
				$h.util.deleteCookie('fSpaceSSOExpires');

				var tdomain = "."+document.domain.replace(new RegExp(/^www\./i),"");
				$h.util.setCookie('chkcookie',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('email',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('user_name',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('first_name',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('alias',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('password',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('ur_id',null,{"path" : "/","domain" : tdomain});
				
				$h.util.setCookie('fSpaceSSOUserId',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('fSpaceSSOUserId',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('fSpaceSSOUserEmail',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('fSpaceSSOUserCheck',null,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('fSpaceSSOExpires',null,{"path" : "/","domain" : tdomain});
				window.location.assign(redirUrl);
				return false;
			}
			else if ((hearst_user.logged_in) && (!$h.util.getCookie('fSpaceSSOUserId'))){
				$h.console.warn("[SWITCH 2] Executing: MULTI LOGIN");
				var tdomain = "."+document.domain.replace(new RegExp(/^www\./i),"");
				$h.util.setCookie('fSpaceSSOUserId',hearst_user.user_name,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('fSpaceSSOUserEmail',hearst_user.email,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('fSpaceSSOUserCheck',hearst_user.encString,{"path" : "/","domain" : tdomain});
				$h.util.setCookie('fSpaceSSOExpires',hearst_user.expires,{"path" : "/","domain" : tdomain});
				window.location.reload(true); // this re-renders page, next getMyHash call will pick up cookies
				return false;
			}
			else if ((hearst_user.logged_in) && ((function(){
				var listonames = ["user_name"]
				for (var i = 0; listonames[i]; i++){
					if (mag_user[listonames[i]] == null){
						mag_user[listonames[i]] = "";
					}
					if (hearst_user[listonames[i]] == null){
						hearst_user[listonames[i]] = "";
					}
					if (mag_user[listonames[i]] !== hearst_user[listonames[i]]) {
						return true;
					}
				}
				return false;
			})())){
				$h.console.warn("[SWITCH 3] Executing: CLEARANDGO (need to sync the mag_user and hearst_user)");
				if (/http\:\/\/betapreview/.test(document.location.href)){
					alert("[MAGNUS AUTHENTICATION NOTIFICATION]\nEither you went to log in from a different hearst site, or you updated your profile. If you did neither of these things, we have a big problem.\nCookie dump:"+document.cookie);
				}
				var next_url = window.location;
				window.location.href = '/registration/clearandgo?next_url=' + escape(next_url);
				return false;
			}
			else {
				$h.console.warn("[SWITCH 4] All switches cleared")
			}
			
			// keeping this cruft in
			var hearst_user_logged_in = false;
			if (hearst_user.logged_in) {
			  hearst_user_logged_in = true;
			}


			/**
			 * Finally, we will execute site specific login/logout functions
			 * currently hacked to use jquery, this is the only part of the code
			 * that uses the jquery ready function
			 */
			try{
				$(document).ready(function () {
					if (mag_user.logged_in){
						for (i in $h.session.queue_login){
							try {
								$h.session.queue_login[i]();
							} catch (e) {
								//	
							}
						}
					} else {
						for (i in $h.session.queue_logout){
							try {
								$h.session.queue_logout[i]();
							} catch (e) {
								//	
							}
						}
					}
				});
			} catch(err) {
				$h.console.error("ERROR[SESSION COOKIE.line-313] : attempt to execute $(document).ready. "+err);
			}
		}
	},500)
	
	$h.session.queue_logout = new Array();
	$h.session.queue_login = new Array();

	$h.session.ifReady = {
		login : function(func){
			if (typeof func == 'function'){
				$h.session.queue_login.push(func);
			}
		},
		logout : function(func){
			if (typeof func == 'function'){
				$h.session.queue_logout.push(func);
			}
		}
	}
})();

// DEBUG CODE TO DUMP OBJECTS
       var MAX_DUMP_DEPTH = 10;
      
       function dumpObj(obj, name, indent, depth) {
              if (depth > MAX_DUMP_DEPTH) {
                     return indent + name + ": <Maximum Depth Reached>\n";
              }
              if (typeof obj == "object") {
                     var child = null;
                     var output = indent + name + "\n";
                     indent += "\t";
                     for (var item in obj)
                     {
                           try {
                                  child = obj[item];
                           } catch (e) {
                                  child = "<Unable to Evaluate>";
                           }
                           if (typeof child == "object") {
                                  output += dumpObj(child, item, indent, depth + 1);
                           } else {
                                  output += indent + item + ": " + child + "\n";
                           }
                     }
                     return output;
              } else {
                     return obj;
              }
       }

