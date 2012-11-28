///////////////////////////////////////////
//author:  dominic green /////////////////
//version: 1.1 ///////////////////////////
//date   : 05/04/2011 ////////////////////
//////////////////////////////////////////

//////////////////////////////////////////////////
//
// Index (added by Jeremy Herr 20 April 2012)
//
//  - variable declarations
//  - object constructors
//  - functions
//  - variable definitions
//  - document ready
//
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// variable declarations
//////////////////////////////////////////////////

var samuiUrlDomain;
var tmgHomeUrl;
var paywallHomeUrl;
var toolbarCpcUrl;
var samuiUrlBase;
var toolbarSubscribeUrl;

//generic speed of transitions
var speed                = 800;
var samMenuArray         = [];
var samLoginMenu;
var samRegisterMenu;
var samSubscribeMenu;
var samSitesMenu;
var samSubInfoMenu;
var samCompleteMenu;
var samPageUser;
var samMenuArray;
var samLoggedOutLogo     = "logoU";
var samLoggedInLogo      = "logoU"; // this is changed to logoS if user is subscribed
var samLoggedOutMessage  = "";
var samLoggedInMessage   = "";
var samSubscribedMessage = "";
var samLinks             = "";
var samCookie;

var samDomain         = 'https://auth.telegraph.co.uk';
var samAssets         = 'http://s.telegraph.co.uk';
var samHomeLink       = 'http://www.telegraph.co.uk';
var samSubscribeLink  = 'http://www.telegraph.co.uk/subscriptions/';
var cpcLink           = 'https://auth.telegraph.co.uk/customer-portal/myaccount/index';
var logOutLink        = 'https://auth.telegraph.co.uk/sam-ui/logoff.htm?redirectTo=' + window.location;
var tmgHomeUrl        = 'http://www.telegraph.co.uk/';
var privacyPolicyLink = 'http://www.telegraph.co.uk/topics/about-us/3691972/Privacy-and-Cookie-Policy.html';

//////////////////////////////////////////////////
// object constructors
//////////////////////////////////////////////////

// Menu constructor (each choice on toolbar that slides down when clicked on is a Menu)
function Menu(spec) {
	// attributes
	this.menuName  = "";
	this.menuId    = "";
	this.menuClass = "";
	this.expanded  = false;
	this.locked    = false;
	this.content   = "";

	// define dropDown based on provided spec object argument,
	// make it true by default.
	if (typeof (spec) === 'object' && spec.dropDown === false) {
		this.dropDown = false;
	} else {
		this.dropDown = true;
	}

	// accessors and mutators
	this.getMenuName = function () {
		return this.menuName;
	};

	this.setMenuName = function (menuName) {
		this.menuName = menuName;
	};

	this.getMenuId = function () {
		return this.menuId;
	};

	this.setMenuId = function (menuId) {
		this.menuId = menuId;
	};

	this.getMenuClass = function () {
		return this.menuClass;
	};

	this.setMenuClass = function (menuClass) {
		this.menuClass = menuClass;
	};

	this.getExpanded = function () {
		return this.expanded;
	};

	this.setExpanded = function (expanded) {
		this.expanded = expanded;
	};

	this.getLocked = function () {
		return this.locked;
	};

	this.setLocked = function (locked) {
		this.locked = locked;
	};

	this.getContent = function () {
		return this.content;
	};

	this.setContent = function (content) {
		this.content = content;
	};

	this.toggleMenu = function () {
		if(this.expanded === false) {
			this.expanded = true;
		} else {
			this.expanded = false;
		}
	};

	this.toggleBox = function () {
		if (this.box === 1) {
			this.box = 2;
		} else {
			this.box = 1;
		}
	};

	this.isDropDown = function () {
		return this.dropDown;
	};
}

// User constructor
function User() {
	this.loggedIn   = false;
	this.subscriber = false;
	this.clicks     = 10;
	this.wall       = false;

	this.getLoggedIn = function () {
		return this.loggedIn;
	}

	this.setLoggedIn = function (loggedIn) {
		this.loggedIn = loggedIn;
	}

	this.getSubscriber = function () {
		return this.subscriber;
	}

	this.setSubscriber = function (subscriber) {
		this.subscriber = subscriber;
	}

	this.getClicks = function () {
		return clicks;
	}

	this.setClicks = function (clicks) {
		this.clicks = clicks;
	}

	this.getWall = function () {
		return this.wall;
	}

	this.setWall = function (wall) {
		this.wall = wall;
	}
}

//////////////////////////////////////////////////
// functions
//////////////////////////////////////////////////

function samClickMenu(menuId) {
	var thisMenu;

	if(samCheckMenus() === false) {
		samLockMenus();
		for (var i = 0; i < samMenuArray.length; i++) {
			if(menuId === samMenuArray[i].getMenuId()) {
				$(".dLine").removeClass("dLineOn");
				$(".dLineL").removeClass("dLineOnL");
				$("#" + menuId).parent().find(".dLine").addClass("dLineOn");
				$("#" + menuId).parent().find(".dLineL").addClass("dLineOnL");
				if(menuId != 'subscribeButton' && menuId != 'sitesButton'){
					$("#" + menuId).addClass("upArrow");
				}
				samMenuWipe(samMenuArray[i].getMenuName());
				thisMenu = samMenuArray[i];
			}
		}

		// only toggle if it is a dropdown menu
		if (typeof (thisMenu) === 'object' && thisMenu.isDropDown()) {
			if(thisMenu.getExpanded() === false){
				thisMenu.toggleMenu();
				//Turn me off here to stop the double menu up
				//$(".drop").slideUp(speed, function(){
				$(".drop").html(thisMenu.getContent());
				$(".drop").removeClass("regDrop smlDrop medDrop");

				$(".drop").addClass(thisMenu.getMenuClass());
				$(".drop").slideDown(speed, function () {
					samUnlockMenus();
				});
			} else {
				thisMenu.toggleMenu();
				$(".drop").slideUp(speed, function () {
					$(".drop").hide();
					samUnlockMenus();
					$("#" + thisMenu.getMenuId() + "").removeClass("upArrow");
					$(".dLine").removeClass("dLineOn");
					$(".dLineL").removeClass("dLineOnL");
					samMenuWipe(thisMenu.getMenuName());
				});
			}
		}
	}
}

//*********Function to remake the menu***********/
function samReloadMenu() {

	if (samPageUser.getLoggedIn() == true || samPageUser.getLoggedIn() == "true") {
		var subStatus =  getCookieValue("tmg_p13n","subscriber");
		var subButton =  getCookieValue("tmg_p13n","subButton");
		if (subStatus === "true") {
			samLoggedInLogo = "logoS";
		}
		// This if block is currently not in use because we've replaced the user name with "My Account"
		if (getCookieValue("tmg_p13n","firstName") === "" && getCookieValue("tmg_p13n","lastName") === "") {
			var samUserName = getCookieValue("tmg_p13n","username");
		} else {
			var samUserName = getCookieValue("tmg_p13n","firstName")+" "+getCookieValue("tmg_p13n","lastName");
		}

		samSitesMenu.setContent("");

		if (samPageUser.getWall() === true && samPageUser.getLoggedIn() !== true) {

		} else {
			if (subButton === "true") {
				var samSubMessage = samSubscribedMessage;
			} else {
				var samSubMessage = "<span class='menuButton logedInsubscribe' id='subscribeButton'>Subscribe<span class='dLine'></span></span></span>" + samLoggedInMessage;
			}
			if (typeof(menuDisabled) === 'boolean' && menuDisabled === true || gup('wall') === 'true' || gup('disabled') === 'true' || samPageUser.getWall() === true) {
				$(".tmgMainMenu").html("<span class='menuButtonCon'><a href='" + tmgHomeUrl + "' title='The Telegraph Home'><img src='" + samAssets + "/toolbar/images/" + samLoggedInLogo + ".png' name='" + samLoggedInLogo + "' alt='" + samLoggedInLogo + "' class='tmgMainMenuLogo'/></a><span id='" + samPrivacyPolicyMenu.getMenuId() + "' class='menuButtonTelegraphArea noArrow' title='read our privacy and cookies policy'>" + samPrivacyPolicyMenu.getMenuName() + "<span class='dLine'></span></span></span></span></div>");
			} else {
				$(".tmgMainMenu").html("<span class='menuButtonCon'><a href='" + tmgHomeUrl + "' title='The Telegraph Home'><img src='" + samAssets + "/toolbar/images/" + samLoggedInLogo + ".png' name='" + samLoggedInLogo + "' alt='" + samLoggedInLogo + "' class='tmgMainMenuLogo'/></a><span id='" + samPrivacyPolicyMenu.getMenuId() + "' class='menuButtonTelegraphArea noArrow' title='read our privacy and cookies policy'>" + samPrivacyPolicyMenu.getMenuName() + "<span class='dLine'></span></span><span class='menuButton noArrow userName' id='" + samSitesMenu.getMenuId() + "'><span class='dLine'></span>" + samSitesMenu.getMenuName() + "</span></span>" + samSubMessage + "<span class='menuButton noArrow' id='samLogOutButton'>Log out<span class='dLine'></span></span></span></div>");
			}
		}
	} else {
		if (samPageUser.getWall() === true && samPageUser.getLoggedIn() !== true) {
			// TCUK is now loading the wall
			// loadWall();
		} else {
			if (typeof(menuDisabled) === 'boolean' && menuDisabled === true || gup('wall') === 'true' || gup('disabled') === 'true' || samPageUser.getWall() === true) {
				$("#tmgMenu-z1").html("<div id='tmgMenuBar-z1'><div class='tmgMainMenu'><span class='menuButtonCon'><a href='" + tmgHomeUrl + "' title='The Telegraph Home'><img src='" + samAssets + "/toolbar/images/" + samLoggedOutLogo + ".png' name='" + samLoggedOutLogo + "' alt='" + samLoggedOutLogo + "' class='tmgMainMenuLogo'/></a></span><span id='" + samPrivacyPolicyMenu.getMenuId() + "' class='menuButtonTelegraphArea noArrow' title='read our privacy and cookies policy'>" + samPrivacyPolicyMenu.getMenuName() + "<span class='dLine'></span></span><span class='menuButtonCon'></span>" + samLoggedOutMessage + "</div></div></div><div class='drop' style='display: none;'>");
			} else {
				$("#tmgMenu-z1").html("<div id='tmgMenuBar-z1'><div class='tmgMainMenu'><span class='menuButtonCon'><a href='" + tmgHomeUrl + "' title='The Telegraph Home'><img src='" + samAssets + "/toolbar/images/" + samLoggedOutLogo + ".png' name='" + samLoggedOutLogo + "' alt='" + samLoggedOutLogo + "' class='tmgMainMenuLogo'/></a></span><span id='" + samPrivacyPolicyMenu.getMenuId() + "' class='menuButtonTelegraphArea noArrow' title='read our privacy and cookies policy'>" + samPrivacyPolicyMenu.getMenuName() + "<span class='dLine'></span></span><span class='menuButton noArrow' id='" + samSubscribeMenu.getMenuId() + "'>" + samSubscribeMenu.getMenuName() + "<span class='dLine'></span></span><span class='menuButtonCon'><span class='menuButton downArrow' id='" + samRegisterMenu.getMenuId() + "'>" + samRegisterMenu.getMenuName() + "<span class='dLine'></span></span><span class='menuButtonCon'><span class='menuButton downArrow' id='" + samLoginMenu.getMenuId() + "'>" + samLoginMenu.getMenuName() + "<span class='dLine'></span></span></span><span class='menuButtonCon'></span>" + samLoggedOutMessage + "</div></div></div><div class='drop' style='display: none;'>");
			}
		}
	}
}

//*******Set a menu back to default state function *********/
function samMenuWipe(menuName) {
	for (var i = 0; i < samMenuArray.length; i++) {
		if(menuName != samMenuArray[i].getMenuName()){
			samMenuArray[i].setExpanded(false);
			samMenuArray[i].setLocked(false);
			if (typeof (samMenuArray[i]) === 'object' && samMenuArray[i].isDropDown()) {
				$("#"+samMenuArray[i].getMenuId()+"").removeClass("upArrow");
				$("#"+samMenuArray[i].getMenuId()+"").addClass("downArrow");
			}
		}
	}
}

//*******Lock all menus******************/
function samLockMenus() {
	for (var i = 0; i < samMenuArray.length; i++) {
		samMenuArray[i].setLocked(true);
	}
}

//*****Unlock all menus*****************/
function samUnlockMenus() {
	for (var i = 0; i < samMenuArray.length; i++) {
		samMenuArray[i].setLocked(false);
	}
}

//*****check if menus are locked*****************/
function samCheckMenus() {
	var stat = false;
	for (var i = 0; i < samMenuArray.length; i++) {
		if(samMenuArray[i].getLocked() == true){
			stat = true;
		}
	}
	return stat;
}

function samSlideUp() {
	$(".drop").slideUp(speed, function(){samReloadMenu();});

}

function samRefresh() {
		samPageUser.setLoggedIn(true);
		samReloadMenu();
}

function samReloadPage() {
	location.reload(true);
}

function reloadTopWindow () {
	top.location.reload();
}

function samFinishPage() {
	var domain = window.location.href;
	if (domain.indexOf("?")!=-1){
		window.location = domain+"&regComplete=true";
	}else{
		window.location = domain+"?regComplete=true";
	}
}

function linkAccount() {
	var linkaddress = samuiUrlBase;
	window.location = ""+linkaddress+"/sam-ui/setupcaptureFromLink.htm?logintype=tmgsubscriber";
}

//function to get cookies
function getCookie(c_name) {
	var y = "";
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
}

//function to strip out variables from a cookie
function getCookieValue(c_name, c_var)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
		{
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if (x==c_name)
		    {
			  var name = c_var;
			  var regexS = name+":'([^'#]*)'";
			  var regex = new RegExp( regexS );
			  var results = regex.exec (y);
		    return unescape(results[1]);
		    }
		}
}

function setCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()+"; path=/;");
	document.cookie=c_name + "=" + c_value;
}

function samGoBack(){
history.go(-1);}

function samCharLimit(word, limit){
	if(word.length < limit){
		return word;
	}else{
	word = word.substring(0,limit);

		var i = limit-1;
		while(i != 0){
			if(word.charAt(i) != " "){
				i --;
			}else{
				word = word.slice(0, i);
				return word+ "....";
			}
		}
		return word;
	}
}

// This function finds a given GET parameter in the current url and returns its value
function gup(name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec (window.location.href);
	if (results == null)
		return "";
		else
		return results[1];
}

//////////////////////////////////////////////////
// variable definitions
//////////////////////////////////////////////////

samPrivacyPolicyMenu = new Menu({dropDown: false});
samLoginMenu         = new Menu();
samRegisterMenu      = new Menu();
samSubscribeMenu     = new Menu({dropDown: false});
samSitesMenu         = new Menu({dropDown: false});
samSubInfoMenu       = new Menu();
samCompleteMenu      = new Menu();
samPageUser          = new User();
samMenuArray         = [ samPrivacyPolicyMenu,
                         samLoginMenu,
                         samRegisterMenu,
                         samSubscribeMenu,
                         samSitesMenu,
                         samSubInfoMenu,
                         samCompleteMenu ];
samCookie            = getCookie("tmg_pid");

//////////////////////////////////////////////////
// document ready
//////////////////////////////////////////////////

$(document).ready(function() {

	if (typeof service == "undefined" && window.location.host.indexOf('telegraph.co.uk') !== -1) {
		document.domain = "telegraph.co.uk";
	}

	if (typeof (plink) == "undefined") {
		plink = "";
	}

	$("#sitesButton").live('click', function () {
		window.location = "" + cpcLink;
	});

	$("#samLogOutButton").live('click', function () {
		window.location = "" + logOutLink;
	});

	$("#subscribeButton").live('click', function () {
		window.location = "" + samSubscribeLink;
	});

	$("#privacyPolicyButton").live('click', function () {
		window.location = "" + privacyPolicyLink;
	});

	$("body").prepend("<div id='tmgMenu-z1'></div>");

	$('head').append('<link rel="stylesheet" href="' + samAssets + '/toolbar/css/tmgMenu.css" type="text/css" />');

	//check if user cookie is set
	// NB: If you change samCookie != null to samCookie !== null it causes the menu to come up saying "undefined undefined"
	if (samCookie != null && samCookie != "") {
		samPageUser.setLoggedIn(true);
		$("#tmgMenu-z1").html("<div id='tmgMenuBar-z1'><div class='tmgMainMenu'></div></div><div class='drop' style='display: none;'>");
	}

	// set up privacy policy button
	samPrivacyPolicyMenu.setMenuName("Privacy and cookies");
	samPrivacyPolicyMenu.setMenuId("privacyPolicyButton");
	samPrivacyPolicyMenu.setMenuClass("hiddenDrop");

	//set up login menu
	samLoginMenu.setMenuName("Log in");
	samLoginMenu.setMenuId("loginButton");
	samLoginMenu.setMenuClass("smlDrop");
	samLoginMenu.setContent("<div class='innerLogin'><iframe id='guestFrame1' style='visibility:hidden;' onload='this.style.visibility=\"visible\";' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame1' width='960px' height='180px' frameborder='0' src='" + samDomain + "/sam-ui/login.htm?logintype=lite&plink=" + plink + "' scrolling='no'></iframe></div>");

	//set up login menu
	samSubscribeMenu.setMenuName("Subscribe");
	samSubscribeMenu.setMenuId("subscribeButton");
	samSubscribeMenu.setMenuClass("hiddenDrop");

	//set up register menu
	samRegisterMenu.setMenuName("Register");
	samRegisterMenu.setMenuId("registerButton");
	samRegisterMenu.setMenuClass("regDrop");
	samRegisterMenu.setContent("<div class='innerLogin'><iframe id='guestFrame1' style='visibility:hidden;' onload='this.style.visibility=\"visible\";' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame2' width='960px' height='300px' overflow='hidden' frameborder='0' src='" + samDomain + "/sam-ui/registerLite.htm?logintype=lite&plink=" + plink + "' scrolling='no'></iframe></div>");

	//set up congratulations menu
	samCompleteMenu.setMenuName("");
	samCompleteMenu.setMenuId("completeButton");
	samCompleteMenu.setMenuClass("smlDrop");
	samCompleteMenu.setContent("<div class='innerLogin'><iframe id='guestFrame1' style='visibility:hidden;' onload='this.style.visibility=\"visible\";' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame2' width='960px' height='170px' frameborder='0' src='" + samDomain + "/sam-ui/registerComplete.htm?logintype=lite&plink=" + plink + "' scrolling='no'></iframe></div>");

	//set up sites menu
	samSitesMenu.setMenuName("My Account");
	samSitesMenu.setMenuId("sitesButton");
	samSitesMenu.setMenuClass("hiddenDrop");
	if (samPageUser.getLoggedIn() === false) {
		samSitesMenu.setContent("");
	} else {
		var samUserfirstName = "";
		var samUserLastName = "";
		samSitesMenu.setContent("");
	}

	//set up sub info menu
	samSubInfoMenu.setMenuName("SubInfo");
	samSubInfoMenu.setMenuId("subinfocapture");
	samSubInfoMenu.setMenuClass("smlDrop");
	samSubInfoMenu.setContent("<div class='innerLogin'><iframe id='guestFrame1' style='visibility:hidden;' onload='this.style.visibility=\"visible\";' frameborder='0' allowtransparency='true' background-color='transparent' name='guestFrame1' width='960px' height='200px' frameborder='0' src='" + samDomain + "/sam-ui/subinfocapture.htm?logintype=lite&plink=" + plink + "' scrolling='no'></iframe></div>");

	samReloadMenu();

	//logout button event handler
	$("#logOutButton").live('click', function () {
		samPageUser.setLoggedIn(false);
		window.location = "" + samDomain + "/sam-ui/logoff.htm?redirectTo=" + document.location.href;
		samReloadMenu();
	});

	//Generic menu button handler to control open and closing of menu's
	$(".menuButton").live('click', function() {
		//set up our generic menu depending on id
		samClickMenu($(this).attr("id"));
	});

	//Generic menu button handler to control registrations in messages
	$(".regButton").live('click', function() {
		//set up our generic menu depending on id
		samClickMenu("registerButton");
	});

	//Generic menu button handler to control registrations in messages
	$(".subButton").live('click', function() {
		//set up our generic menu depending on id
		samClickMenu("subscribeButton");
	});

});
