//
// This file contains scripts that are nessary for the proper rendering and interaction of the Global Header and Footer Project.
//
// Contains scripts for WHY tooltip, MINI CART, USER, LOCALIZTION and LOCALIZATION POPUP
//
var timeout;
function getHeaderStoreNum() {
    var locStoreStr = readCookie('THD_LOCSTORE');
    if (locStoreStr != null && locStoreStr.length != 0) {
        var sepLocStoreStr = locStoreStr.split('+');
    }
    var locStoreNum = sepLocStoreStr[0];
    if (locStoreNum != null) {
        return locStoreNum;
    }
}


function getHeaderLocalStore(type) {
    var storeFinderHref;
    var storeInfo;
    var localStoreMenu;
    var localStoreCompare;
    try {
        var storeZip = getTHDStoreZip();
        var storeNum = getHeaderStoreNum();
        var storeName = getTHDStoreName();
        var storeString = storeName + ' #' + storeNum;
    } catch (e) {
        var storeZip = '';
    }
    // This grabs the ZIP from utlis.js and sets a global VAR
    if (storeZip != '' && storeZip != '0') {
        // Live StoreFinder Link.
        //storeFinderHref = 'http://'+getHostNameNonSecure()+'/StoreFinder/index.jsp#zip='+getTHDStoreZip();

        // QA StoreFinder Link
        storeFinderHref = 'http://' + getHostNameNonSecure() + '/webapp/wcs/stores/servlet/THDStoreFinder?langId=-1&storeId=10051&catalogId=10053&zip=' + getTHDStoreZip();

        storeInfo = getTHDLocalStoreInfo();
        localStoreMenu = '<li>My Store Location: <a class="thdOrange b" href="' + storeFinderHref + '" alt="Store Finder">' + storeString + '</a> <a class="smallGreyLink" href="' + storeFinderHref + '" alt="Change">(Change)</a></li>';
        localStoreCompare = 'Based on My Store Location: <a style="color:white;" href="' + storeFinderHref + '" alt="Store Finder">' + storeString + '</a> (<a class="thdOrange b" href="' + storeFinderHref + '" alt="Change">Change</a>)';
    } else {

        // Live StoreFinder Link.
        //storeFinderHref = 'http://'+getHostNameNonSecure()+'/StoreFinder/index.jsp';

        // QA StoreFinder Link
        storeFinderHref = 'http://' + getHostNameNonSecure() + '/webapp/wcs/stores/servlet/THDStoreFinder?langId=-1&storeId=10051&catalogId=10053';

        localStoreMenu = '<li><a class="thdOrange b" href="' + storeFinderHref + '" alt="Store Finder">Choose Your Local Store</a> <a class="smallGreyLink tooltip" title="In order to provide up to the minute updates on product pricing and availability at your local store, please select the store nearest to you." href="javascript:void(0);" alt="Why?" id="why">(Why?)</a></li>';
        localStoreCompare = '<a class="thdOrange b" href="' + storeFinderHref + '" alt="Store Finder">Choose Your Local Store</a> <a class="tooltip" style="color:white;" title="In order to provide up to the minute updates on product pricing and availability at your local store, please select the store nearest to you." href="javascript:void(0);" alt="Why?" id="why">(Why?)</a>';
    };
    if (type === 'menu') {
        return localStoreMenu;
    }
    if (type === 'href') {
        return storeFinderHref;
    }
    if (type === 'compare') {
        return localStoreCompare;
    }
}

function getAccountMenu(loc) {
    var localUserMenu;
    var accountMenu;
    try {
        var userName = getTHDUserName();
    } catch (e) {
        var userName = '';
    }
    if (userName != '') {
        localUserMenu = '<li>Hello, <a class="thdOrange b" href="javascript:goToTHDMyAccountFromJS();" alt="">' + getTHDUserName() + '</a> <a class="smallGreyLink" href="http://' + getHostNameNonSecure() + '/webapp/wcs/stores/servlet/THDLogoff?langId=-1&amp;storeId=10051&amp;catalogId=10053&amp;personalizedCatalog=true&amp;changeUser=true&amp;URL=HomePageView" alt="Sign Out">(Sign Out)</a></li>';
        accountMenu = '<li class="end"><a href="javascript:goToTHDMyAccountFromJS();" alt="My Account" rel="nofollow">My Account</a></li>';
    } else {
        localUserMenu = '';
        accountMenu = '<li class="end"><a href="javascript:goToTHDMyAccountFromJS();" alt="My Account" rel="nofollow">My Account</a> <span class="smallGreyLink">(<a class="smallGreyLink" href="https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/LogonForm?langId=-1&storeId=10051&catalogId=10053&" alt="Sign in">Sign in</a> or <a class="smallGreyLink" href="https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/UserRegistrationForm?langId=-1&storeId=10051&catalogId=10053&new=Y" alt="Register">Register</a>)</span></li>';
    };
    if (loc === 'user') {
        return localUserMenu;
    }
    if (loc === 'account') {
        return accountMenu;
    }
}

// This is for the EMAIL input in the footer, carried over form 5.6
function popup() {
    var url = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/THDEmailSignUpAddCmd?langId=-1&storeId=10051&catalogId=10053&URL=EmailSignUpView&subscrType=' + document.emailsub.subscrType.value + '&emailInput=' + document.emailsub.emailInput.value + '&formName=emailsub';
    var winWidth = 350;
    var winHeight = 150;
    var winY, winX = 0;
    if (screen.width > winWidth && screen.height > winHeight) {
        winX = (screen.width - winWidth) / 2;
        winY = (screen.height - winHeight) / 2;
    }
    var winOptions = 'location=0,scrollbars=0,menubar=0,toolbar=0,status=0,resizable=1,directories=0,width=' + winWidth + ',height=' + winHeight + ',top=' + winY + ',left=' + winX;
    var windowToOpen = window.open(url, "windowToOpen", winOptions);
    window.top.name = 'opener';
    if (windowToOpen) {
        windowToOpen.focus();
    }
    document.emailsub.emailInput.value = '';
}

// Renders items from utils.js to display the MINI CART accordingly
function showCartBlock() {
    var itemsInCart = getTHDNumberItemsInCart();
    if (itemsInCart != '0' && itemsInCart != '') {
        $("#miniCartNum").html(itemsInCart);
        $("#miniCart").css('background-position', 'bottom');
    }
}


// Hover Intent Plugin
(function ($) {
    $.fn.hoverIntent = function (f, g) {
        // default configuration options
        var cfg = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        // override configuration options with user supplied object
        cfg = $.extend(cfg, g ? {
            over: f,
            out: g
        } : f);
        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function (ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function (ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
                $(ob).unbind("mousemove", track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob, [ev]);
            } else {
                // set previous coordinates for next time
                pX = cX;
                pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout(function () {
                    compare(ev, ob);
                }, cfg.interval);
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function (ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob, [ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function (e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({}, e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX;
                pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).bind("mousemove", track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) {
                    ob.hoverIntent_t = setTimeout(function () {
                        compare(ev, ob);
                    }, cfg.interval);
                }

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).unbind("mousemove", track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) {
                    ob.hoverIntent_t = setTimeout(function () {
                        delay(ev, ob);
                    }, cfg.timeout);
                }
            }
        };

        // bind the function to the two event listeners
        return this.bind('mouseenter', handleHover).bind('mouseleave', handleHover);
    };
})(jQuery);

function setCookie(c_name, value, exdays, domain) {

	var c_value = escape(value) +  ";domain=" + domain + ";path=/";	
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

/* PLP_loadPopup function load the pop up banner from globalHeadTop.html for the first time autolocalized scenario. and Auto localize failture scenario.*/

function loadBannerPopup() {
	
    var localized = true;
	var strNbr = readCookie("THD_LOCSTORE");
    var autolocalizesession = readCookie("THD_AUTOLOCALIZED_SESSION");
    var thdSession = readCookie("THD_SESSION");
	var domain = "." + getDomain();
	
	if (domain.indexOf("http://") != "-1"){

		domain = domain.replace("http://", "");
	}	
	
    if (strNbr != null && strNbr != "") {
        localized = true;
    } else {
        localized = false;
    }

	
	if (thdSession.indexOf("C37=1") != "-1" ){
	
		thdSession = thdSession.replace("C37=1", "C37=2");

        if (localized) {
			
		    setCookie("THD_SESSION", thdSession, "-1", domain);
			$("#localizeBanner").fadeIn("slow");
			timeout = setTimeout(function(){
			$("#localizeBanner").fadeOut("slow");
			},5000);

        } else {
			
            setCookie("THD_SESSION", thdSession, "-1", domain);
            $("#nonlocalizeBanner").fadeIn("slow");
			timeout = setTimeout(function(){
			$("#nonlocalizeBanner").fadeOut("slow");
			},5000);
			
        }
    }
    $('body').click(function () {
        $("#localizeBanner").fadeOut("slow");
        $("#nonlocalizeBanner").fadeOut("slow");
    });
    $('#localizeBanner').click(function (e) {
        e.stopPropagation();
    });
    $('#nonlocalizeBanner').click(function (e) {
        e.stopPropagation();
    });
    $('.local_close_link').click(function (e) {
        $("#localizeBanner").fadeOut("slow");
    });
    $('.unlocal_close_link').click(function (e) {
        $("#nonlocalizeBanner").fadeOut("slow");
    });
	
	$('#localizeBanner').mouseenter(function (e) {
	   	if (timeout!=null){
		clearTimeout(timeout);
		}
    });
	
	$('#nonlocalizeBanner').mouseenter(function (e) {
	   	if (timeout!=null){
		clearTimeout(timeout);
		}
    });
	
	$('#nonlocalizeplpZipCode1').mouseenter(function (e) {
	
       	if (timeout!=null){
		clearTimeout(timeout);
		}
    });
		

}


function getInternetExplorerVersion()
// Returns the version of Windows Internet Explorer or a -1
// (indicating the use of another browser).
{
   var rv = -1; // Return value assumes failure.
   if (navigator.appName == 'Microsoft Internet Explorer')
   {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
         rv = parseFloat( RegExp.$1 );
   }
   return rv;
}


function getDomain(){
	var currentdomain = window.location.hostname;
	var currentProtocal = window.location.protocol;
	currentdomain = currentProtocal + "//" + currentdomain  ;

	if (currentdomain.indexOf("secure.") != "-1"){

		currentdomain = currentdomain.replace("secure.", "");
	}	

	if (currentdomain.indexOf("https") != "-1"){

		currentdomain = currentdomain.replace("https", "http");
		
	}
	return currentdomain;

}

function validateBannerZip() {

    var zipValuenonLocal = document.getElementById("nonlocalizeplpZipCode1").value;

    window.open(getDomain() + "/StoreFinder/index.jsp" + "?URL=" + getRedirectUrlForStoreFinder(false, false, "", true) + "&address=" + zipValuenonLocal, "_self");

}


function validateBannerZiponKeypress(evt, thisobj) {
	if (timeout!=null){

		clearTimeout(timeout);
	}
    evt = (evt) ? evt : ((window.event) ? window.event : "")
    if (evt) {
		
        if (evt.keyCode == 13 || evt.which == 13) {
            validateBannerZip();

        }
    }

}

function changeStore() {
    var storeZip = getTHDStoreZip();
    window.open(getDomain() + "/StoreFinder/index.jsp" + "?URL=" + getRedirectUrlForStoreFinder(false, false, "", true) + "&address=" + storeZip, "_self");
}





// Gets called after DOM is ready
$(document).ready(function () {
    //localize popUP
	/*Commented to disable poup load*/
    //loadBannerPopup();

    // displays the header WHY tooltip mouseover		
    $('#why').mouseover(function (e) {
        xOffset = 348;
        yOffset = 14;
        if ($('#whyToolTip').length == '0') {
            $('body').append('<div id="whyToolTip"></div>');
            var whyTip = $('#whyToolTip');
            var text = this.title;
            whyTip.text(text);
            this.title = '';
            var whyOffset = $('#why').offset();
            var whyTop = whyOffset.top;
            var whyLeft = whyOffset.left;
            var leftPos = whyLeft - xOffset;
            var topPos = whyTop + yOffset;
            whyTip.css('top', topPos + "px").css("left", leftPos + 'px').fadeIn('fast');
        } else {
            var whyOffset = $('#why').offset();
            var whyTop = whyOffset.top;
            var whyLeft = whyOffset.left;
            var leftPos = whyLeft - xOffset;
            var topPos = whyTop + yOffset;
            $('#whyToolTip').css('top', topPos + "px").css("left", leftPos + 'px').fadeIn('fast');
        }
    });
    $('#why').mouseout(function () {
        $('#whyToolTip').fadeOut('fast');
    });

    //Hover Intent Settings
    $("#hd-deptNav").find(".item").hoverIntent({
        sensitivity: 70, // number = sensitivity threshold (must be 1 or higher)
        interval: 150, // number = milliseconds of polling interval
        over: showFlyout, // function = onMouseOver callback (required)
        timeout: 150, // number = milliseconds delay before onMouseOut function call
        out: hideFlyout // function = onMouseOut callback (required)
    });

    function showFlyout() {
        $(this).addClass('active');
    }

    function hideFlyout() {
        $(this).removeClass('active');
    }
	
	/* for header search box, this removes error text on focus. This cannot go in 
	utils.js with other header search stuff because jquery is loaded after.
	var searchFieldText is in utils.js
	9-13-2012 Search Project.
	*/
	function SearchErrorFunction() {
		var $searchFocus = $('#searchFocus');
		$searchFocus.focus(function(){
			if($searchFocus.val()==searchFieldText) {
				$searchFocus.val('');
			}
		});
	}
	SearchErrorFunction();
	
});

function getRedirectUrlForStoreFinder(removeBrowseOptionVar, removeProductCompareVar, browseOptionValue, bannerFlag) {
    var storeFinderRedirect = window.location.href;
	if (storeFinderRedirect.indexOf("?") == "-1"){
		
		storeFinderRedirect += "?";
	}
    if (removeBrowseOptionVar) {
        storeFinderRedirect = removeBrowseOption(storeFinderRedirect);
    }
    if (removeProductCompareVar) {
        storeFinderRedirect = removeRecordCompare(storeFinderRedirect);
    }
    if (browseOptionValue != null && browseOptionValue != "") {
        storeFinderRedirect = storeFinderRedirect + "&browsestoreoption=" + browseOptionValue;
    }
    if (bannerFlag) {
        storeFinderRedirect = storeFinderRedirect + "&fromAutolocaliseBanner=true";
    }
    // Double encoding to avaoid special characters like +, #.
    return encodeURIComponent(encodeURIComponent(storeFinderRedirect.replace('#', '&#')));
}

