/*	homepage_src.js
 *	
 *	@Author: Ryan McGrath (ryan@webs.com)
 *	@Requires: lithe.js
 */

var publicHome = {
	signinLink: null,
	signinBox: null,
    usernamebox: null,
    password1: null,
    password2: null,

    /* Used to catch slow logins */
	pickup: function () {
    	var counter = document.createElement('img');
	    counter.src = 'http://counters.freewebs.com/Members/Counters/counter.jsp?userid=1&name=slowLogin';
	},
	
	loginLeaf: null
};

lithe.DOM.ready(function() {
	publicHome.loginLeaf = lithe.$("#login_leaf");
	publicHome.signinLink = lithe.$("#sign_in_nav");
	publicHome.signinBox = lithe.$("#webs_login_wrapper");
	
	lithe.Events.add(publicHome.loginLeaf, "submit", function() {
		if(typeof pushgaq === "function") pushgaq(webs.login_leaf);
		document.getElementById("sign_in_leaf").style.display = "none";
		document.getElementById("login_loadingText").style.display = "block";
		setTimeout(publicHome.pickup, 5000);
	});

	lithe.Events.add(publicHome.signinLink, "click", function(e) {
		if(publicHome.signinLink.href !== "#") publicHome.signinLink.href = "#signin";
		if(publicHome.signinBox.style.visibility == "hidden" || publicHome.signinBox.style.visibility == ""){
			publicHome.signinBox.style.visibility = "visible";
			document.getElementById("sign_in_nav").className += ' signinNoBg';
			document.getElementById("FWloginUsername").focus();
		}else{
			publicHome.signinBox.style.visibility = "hidden";
			document.getElementById("sign_in_nav").className = document.getElementById("sign_in_nav").className.replace(' signinNoBg', '');
		}
		return false;
	});
	document.getElementById("sign_in_nav").focus();
	
	// ie8 only problem not being able to fire submit
	if(navigator.userAgent.indexOf('MSIE 8') != -1) {
		lithe.Events.add(lithe.$("#FWloginUsername"), "keypress", function(e){ if(e.keyCode == "13" && publicHome.loginLeaf) publicHome.loginLeaf.submit();});
		lithe.Events.add(lithe.$("#FWloginPassword2"), "keypress", function(e){ if(e.keyCode == "13" && publicHome.loginLeaf) publicHome.loginLeaf.submit();});
	}
	
    publicHome.usernamebox = lithe.$("#FWloginUsername");

	if(publicHome.usernamebox != null) {
		publicHome.usernameprompt = publicHome.usernamebox.value;
		publicHome.password1 = lithe.$("#FWloginPassword");
		publicHome.password2 = lithe.$("#FWloginPassword2");

		lithe.Events.add(publicHome.usernamebox, "focus", function() {
			if(publicHome.usernamebox.value === publicHome.usernameprompt) publicHome.usernamebox.value = "";
			publicHome.usernamebox.style.cssText = "color: #fff;";
		});

		lithe.Events.add(publicHome.usernamebox, "blur", function() {
			if(publicHome.usernamebox.value === "") {
				publicHome.usernamebox.value = publicHome.usernameprompt;
				publicHome.usernamebox.style.cssText = "";
			}
		});

		lithe.Events.add(publicHome.password1, "focus", function() {
			publicHome.password1.style.display = "none";
			publicHome.password2.style.display = "block";
			setTimeout(function() {
				publicHome.password2.focus();
			}, 50);
		});

		lithe.Events.add(publicHome.password2, "blur", function() {
			if(publicHome.password2.value === "") {
				publicHome.password2.style.display = "none";
				publicHome.password1.style.display = "block";
			}
		});
	}

    if(document.location.pathname === "/") {
	    var csrf = lithe.$("#csrf");
	    if(csrf && csrf.length > 0) csrf.value = CSRF;

        publicHome.throwSignup = lithe.$("#throw_signup");
	
	    lithe.Events.add(publicHome.throwSignup, "submit", function() {	
		    var choice = lithe.$("#category").value;
		    _gaq.push(['_linkByPost', publicHome.throwSignup]);
		    if(publicHome.throwSignup && choice) {
				var s = 'http://www.webs.com';
//				var s = 'http://members.webs.com';
//				if (typeof(membersServer)!='undefined'){
//					s = membersServer;
//				}
			    publicHome.throwSignup.action = s + "/Signup/?fromHomepage=1" + choice;
			}
	    });

    }
});
