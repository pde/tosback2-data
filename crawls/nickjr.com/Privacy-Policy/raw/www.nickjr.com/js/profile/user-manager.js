;if(typeof NICKJR == "undefined" || !NICKJR) var NICKJR = {};
KIDS.namespace("registration", NICKJR);
KIDS.namespace("registration.flux", NICKJR);

// Default page element for "welcome" messages
NICKJR.registration.flux.DEFAULT_LOGIN_AREA = "#fluxlogin";
function scrollToTop() {scroll(0,0);}
(function($) {
	NICKJR.registration.flux.userManager = function(options) {
		// if "new" is omitted, this will correct it
		if (!(this instanceof NICKJR.registration.flux.userManager)) return new NICKJR.registration.flux.userManager();
	
		KIDS.utils.doLog('UserManager instantiated.');
		var isFluxReady = false;
		var isLoggedIn = false;
		var isCommunityMember = false;
		var isFullyRegistered = false;
		var username = null;
		var avatar = null;
		var that = this;
			
		// loginArea corresponds to a page element that holds the "Welcome" messages
		this.defaults = {
			'loginArea': NICKJR.registration.flux.DEFAULT_LOGIN_AREA
		};
			
		this.settings = $.extend({}, this.defaults, options);
		
		this.referralUrl = null;
		
		var initAttempts = 0;
		// Shows the appropriate overlay depending on the user status
		this.initUser = function() {
		    if (isFluxReady) {
			if (!isCommunityMember && isLoggedIn) {
				this.widget.createInterimWidget();
				return true;
			} else if (!isLoggedIn) {
				this.widget.createSignUpWidget();
				return true;
			} else {
				return false;
			}
		    } else {
			if (initAttempts <= 10) {
			    var t = setTimeout(that.initUser, 500);
			    KIDS.utils.doLog('Attempting init ' + initAttempts);
			    initAttempts++;
			}
		    }
		};
		
		// Shows the appropriate greeting/link depending on the user status
		this.initGreeting = function() {
			
			var profileLink = "/me/index";
			// var adfree = KIDS.get("adfree");
			var adfree = (document.location.search.match(/[&?]af=1/) != null);
			if(adfree){
				profileLink = "/bumper.html?url=%2Fme%2Findex";
			}
			
			var greeting = null;
			if (!isCommunityMember && isLoggedIn) {
				greeting = "<div id='userExtra'><img src='"+avatar+"' width='50' height='50' /></div>";
				greeting += "<div id='userBlurb'>";
					greeting += "<span class='welcome'>welcome back</span><br />";
					greeting += "<a href='"+profileLink+"' class='usernameLink'>" + username + "</a>";
					greeting += "<div class='profileLinks'>";
						greeting += "<a href='#' id='interimUser'>Join</a> <a href='#' id='logoutUser'>Logout</a>";
					greeting += "</div>";
				greeting += "</div>";
			} else if (!isLoggedIn) {
				greeting = "<div id='userSignup'><a href='#' id='signupUser' class='signupMenuIcon'><span class='seo'>Sign Up</span></a></div>";
				greeting += "<div id='userBlurb' class='signupDisplay'>";
					greeting += "<span class='welcome'>Already a member?</span>";
					greeting += "<a href='#' class='loginLink' id='signinUser'>Log in</a>";
				greeting += "</div>";
			} else {
				greeting = "<div id='userExtra'><a href='"+profileLink+"'><img src='"+avatar+"' width='50' height='50' /></a></div>";
				greeting += "<div id='userBlurb'>";
					greeting += "<span class='welcome'>welcome back</span><br />";
					greeting += "<a href='"+profileLink+"' class='usernameLink'>" + username + "</a>";
					greeting += "<div class='profileLinks'>";
						greeting += "<a href='"+profileLink+"' id='userProfile'>Profile</a> <a href='#' id='logoutUser'>Logout</a>";
					greeting += "</div>";
				greeting += "</div>";
			}
			$(this.settings.loginArea).html(greeting);
			$('#logoutUser').click(function(ev) { ev.preventDefault(); userMgr.signOut(); return false;});
			$('#loginInitUser').click(function(ev) { ev.preventDefault(); userMgr.initUser(); return false;});
			$('#signupUser').click(function(ev) {ev.preventDefault(); userMgr.widget.createSignUpWidget(); return false;});
			$('#signinUser').click(function(ev) {ev.preventDefault(); userMgr.widget.createSignInWidget(); return false;});
			$('#interimUser').click(function(ev) {ev.preventDefault(); userMgr.widget.createInterimWidget(); return false;});
		};

		var timer = null;
		var checkFluxWidget = function() {
			KIDS.utils.doLog('Checking widget...');
			if (!that.widget.exists()) {
				if (isLoggedIn) {
					KIDS.utils.doLog('User logged in, clearing timeout.');
					clearTimeout(timer);
					return false;
				}
				KIDS.utils.doLog('Flux widget has been closed, reopening.');
				that.initUser();
			}
			timer = setTimeout(checkFluxWidget, 2000);
		};
		
		this.loginRequired = function(required) {
			if (required) {
				$(document).ready(function() {
					$('body').bind('fluxContextLoaded', function() {
						if (!isLoggedIn || !isCommunityMember) {
							that.initUser();
							checkFluxWidget();
						}
					});
				});
			}
		};
		
		this.getIsLoggedIn = function() {
			return isLoggedIn;
		};
		
		this.getIsCommunityMember = function() {
			return isCommunityMember;
		};
		
		this.getIsFullyRegistered = function() {
			return isFullyRegistered;
		};
		
		this.getUsername = function() {
			return username;
		};

		this.extractUsername = function(u) {
			var username = u.userProfileUrl.split('/').reverse()[0];
			return (username === ('0'+u.ucid)) ? null : username;
		};

		this.isUserValid = function (u) {
		   return (u && u.acceptedCommunityTerms && u.acceptedFluxTerms && u.communityMember && u.emailVerified && that.extractUsername(u));
		};

		this.shouldForceAcceptTerms = function (u) {
			return u && !(u.acceptedCommunityTerms && u.acceptedFluxTerms) && u.communityMember && u.emailVerified;
		};
		
		var setTransparency = function(id) {
			var el = document.getElementById(id);
			if (el) el.allowTransparency = true;
		};

		/* Delete the RtxAuth cookie(s)*/
		this.snickerdoodle = function() {
			var loc = null;
			if (location.host.indexOf('local') == -1) {
				var temp = location.host.split('.');
				temp.splice(0,1);
				loc =  '.' + temp.join('.');
			}
			/* There are two cookies set (at least on relaunch): .relaunch.nickjr and .nickjr, this will remove them both */
			$.cookie('RtxAuth2407', null, { domain: '.'+location.host, path: '/', expires: -1});
			$.cookie('RtxAuth2407', null, { domain: loc, path : '/', expires: -1});
		};

		var contextAttempts = 0;
		this.loadContext = function() {
			if (typeof Flux === 'undefined') {
			    if (contextAttempts <= 10) {
				var t = setTimeout(that.loadContext, 500);
				KIDS.utils.doLog('Attempting to load context ' + contextAttempts);
				contextAttempts++;
			    }
			} else {
			    isFluxReady = true;
			    Flux.loadContext(function(context){
				var u = context.user;
				context.onSignOut = that.onSignOut;
				context.onSignIn = that.onSignIn;
				if(u == null) {
					if ($.cookie('RtxAuth2407')) {
						that.snickerdoodle();
					}
					isLoggedIn = false;
					isCommunityMember = false;
					isFullyRegistered = false;
					that.widget.checkPopRegistrationQueryString();
				} else {
					/**
					 * Check for nickjr cookie here...?
					 */
					 if(! $.cookie('RtxAuth2407')) {
						KIDS.utils.doLog("No nickjr cookie");
						that.sendRedirect();
					} 
					isLoggedIn = true;
					isCommunityMember = u.communityMember;
					isFullyRegistered = that.isUserValid(u);
					
					try {
						username = that.extractUsername(u);
						if(!username) {
						  that.widget.roadblock();
						}
					} catch (err){
						if(u != null){
							username = u.displayName;
						} else {
							that.widget.roadblock();
						}
					}
					avatar = u.avatarUrls['70x70'];

					if (!isFullyRegistered) {
						that.widget.checkPopRegistrationQueryString();
					}

					if(that.shouldForceAcceptTerms(u)){
						that.widget.roadblock();
					}
				}
				$('body').trigger('fluxContextLoaded');
					KIDS.utils.doLog("Flux context Loaded");
			    });
			}
		};
		
		this.sendRedirect = function() {
			KIDS.utils.doLog("sending redirect");
			var redirect = "http://" + location.host + "/fluxLogin";
			redirect += (that.referralUrl !== null) ? that.referralUrl : location.pathname + location.search;
			KIDS.utils.doLog("Referral URL: " + redirect);
			that.referralUrl = null;
			location.href = NICKJR.stageVars.fluxAuthServer + "/-/GetAuthCookie.ashx?returnUrl=" + redirect;
			KIDS.utils.doLog("Flux auth server: " + NICKJR.stageVars.fluxAuthServer + "/-/GetAuthCookie.ashx?returnUrl=" + redirect);
		}
		
		this.onSignIn = function() {
			KIDS.reporting.omnifunctions.sendLogin()
			isLoggedIn = true;
			KIDS.utils.doLog("User signed in");
			$('body').trigger('FluxSignedIn', true);
			that.sendRedirect();
			//location.reload();
		};
		
		this.onSignOut = function() {
			isLoggedIn = false;
			that.snickerdoodle();
			KIDS.utils.doLog("User signed out");
			$('body').trigger('FluxSignedIn', false);
			location.href = 'http://' + location.host + '/';
		};
		
		this.signOut = function() {
			KIDS.utils.doLog("Logging user out.");
			Flux.loadContext(function(context) {
				if(context.user) {
					context.signOut(false, function(error) {
						switch (error.id) {
							case $error.readOnlyMode:
								KIDS.utils.doLog("ERROR: Read Only Mode");
								break;
							default:
								KIDS.utils.doLog("ERROR: Could not sign out");
								//window.location.reload();
								break;
						}
					});
				}
			}); 
		};
		
		this.setCloseBtn = function(){
		    $(".closeButton").click(function(event){
		        userMgr.sendRedirect();
		        //location.reload();
		    });
		}
		this.scrollTop = function(){
		    var curTop = parseInt($(".authentication > div").css('top'));
		    $(document).scrollTop(curTop);
		}
		
		this.widget = {
			customWidgetParams: {
				containerId: null,
				fluxHosted: true
			},
			create: function(callback, params) {
				var extParams = this.customWidgetParams;
				$.extend(extParams, params);
				Flux.createWidget('Authentication', extParams, function (widget) {callback(widget);});
			},
			createSignInWidget: function() {
				this.create(function(widget) {
					widget.showSignInForm();
					setTransparency('authenticationFrame');
				});
			},
			createSignUpWidget: function() {
				this.create(function(widget) {
					widget.showSignUpForm();
					setTransparency('authenticationFrame');
				});
			},
			createQuickSignUpWidget: function(params) {
				this.create(function(widget) {
					widget.showSignUpForm();
					setTransparency('authenticationFrame');
				}, params);
			},
			createInterimWidget: function() {
				this.create(function(widget) {
					widget.showInterimForm();
					setTransparency('authenticationFrame');
				});
			},
			checkPopRegistrationQueryString: function() {
				if (document.location.search.match(/[&?]register=true/) !== null) {
					this.createSignUpWidget();
				}
			},
			createAddChildWidget: function() {
				if (!isLoggedIn || !isCommunityMember) {
					userMgr.initUser();
					return;
				}
				KIDS.utils.doLog('Initializing Add Child Overlay');
				var addChildUrl = '/add-child/';
				$('body').prepend('<div id="addChild"></div>');
				$('#addChild').load(addChildUrl).dialog({
					width: 700,
					height: 1300,
					modal: true,
					position: 'center',
					zIndex: '99999999',
					close: function(e, ui) {$('#addChild').remove();$('body').trigger('addChildClose');}
				});
				$('.ui-icon-closethick').html('[x]');
			},
			roadblock: function(roadblocked, shouldReloadLogin) {
				roadblocked = (typeof roadblock === 'undefined') ? null : roadblocked;
				shouldReloadLogin = (typeof shouldReloadLogin === 'undefined') ? true : shouldReloadLogin;
				this.create(function(widget){
					if (widget.performRoadBlockerCheck()) {
						roadblocked();
					} else {
						Flux.loadContext(function(context) {
							context.onSignIn = roadblocked;
						});
					}
				});
				setTransparency("authenticationFrame");
			},
			exists: function() {
				KIDS.utils.doLog('Checking page for flux widget...');
				if ($('body > .fluxWidget').length === 0) {
					KIDS.utils.doLog('Flux widget is NOT open.');
					return false;
				} else {
					KIDS.utils.doLog('Flux widget is open.');
					return true;
				}
			}
		};
	};
})(jQuery);

// global userMgr, holds the flux user info
var userMgr = new NICKJR.registration.flux.userManager();

// custom event for notification of flux context loaded
(function($){
	$(document).ready(function() {
		userMgr.loadContext();
	});
	$('body').bind('fluxContextLoaded', function() {userMgr.initGreeting();});
})(jQuery);

// Registration Overlay Callbacks: ------------------
//     (intended to be called using /xd_flux.html)
var enableFluxOverlayCloseRefresh = function(){
    userMgr.setCloseBtn();
}
var registerFinalIncreaseHeight = function(args){
    var docH,
    def = '900',
    authFrame = document.getElementById("authenticationFrame");
    NickLog.debug('registerFinalIncreaseHeight');
    try{
        docH = args['h'] ? args['h'] : def; 
        NickLog.debug('registerFinalIncreaseHeight: docH: ' + docH);
        authFrame.style.height = docH + 'px';
    }catch(e){
        NickLog.debug("registerFinalIncreaseHeight: caught exception: e: " + e);
    }
}
var registerFinalCrossDomainCallback = function(){
    NickLog.debug('registerFinalCrossDomainCallback');
    userMgr.scrollTop();
    userMgr.setCloseBtn();
}
var registerFinalDoneCrossDomainCallback = function(args){
    NickLog.debug('registerFinalDoneCrossDomainCallback');
    var height = "250";
    if(typeof args !== "undefined" && typeof args['h'] !== "undefined"){
        height = args['h']; 
    }
    userMgr.scrollTop();
    userMgr.setCloseBtn();
    registerFinalIncreaseHeight({h:height});
}
// End Registration Overlay Callbacks:
