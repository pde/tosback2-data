/**
*
*Cookie JS for tracking user consent - whether or not the user chooses to accept cookies.
*
*/
(function ($) {
    $.cookieCuttr = function (options) {
        var defaults = {
            cookieCutter: false, // you'd like to enable the div/section/span etc. hide feature? change this to true
            cookieCutterDeclineOnly: false, // you'd like the CookieCutter to only hide when someone has clicked declined set this to true
            cookieAnalytics: true, // just using a simple analytics package? change this to true
            cookieDeclineButton: false, // this will disable non essential cookies
            cookieAcceptButton: true, // this will disable non essential cookies
           // cookieIgnoreButton: true,
            cookieResetButton: false,
            cookieOverlayEnabled: false, // don't want a discreet toolbar? Fine, set this to true
            cookiePolicyLink: '/privacy-policy/', // if applicable, enter the link to your privacy policy here...
            cookieMessage: 'We use cookies on this website, you can <a href="{{cookiePolicyLink}}" title="read about our cookies">read about them here</a>. To use the website as intended please...',
            cookieAnalyticsMessage: 'We use cookies, just to track visits to our website, we store no personal details.',
            cookieErrorMessage: "We\'re sorry, this feature places cookies in your browser and has been disabled. <br>To continue using this functionality, please",
            cookieWhatAreTheyLink: "http://www.allaboutcookies.org/",
            cookieDisable: '',
            cookieExpires: 730,
            cookieAcceptButtonText: "Accept Cookies",//"ACCEPT COOKIES",
            cookieDeclineButtonText: "Decline Cookies",//"DECLINE COOKIES",
            //cookieIgnoreButtonText: "I would ignore",
            cookieResetButtonText: "RESET COOKIES FOR THIS WEBSITE",
            cookieWhatAreLinkText: "What are cookies?",
            cookieNotificationLocationBottom: false, // top or bottom - they are your only options, so true for bottom, false for top            
            cookiePolicyPage: false,
            cookiePolicyPageMessage: 'Please read the information below and then choose from the following options',
            cookieDiscreetLink: false,
            cookieDiscreetReset: false,
            cookieDiscreetLinkText: "Cookies?",
            cookieDiscreetPosition: "topleft", //options: topleft, topright, bottomleft, bottomright         
            cookieNoMessage: false, // change to true hide message from all pages apart from your policy page
            cookieDomain: document.domain//"avg.com"//,
        };
        var options = $.extend(defaults, options);
      /*  var cookieIgnoreButton = true;
        var cookieIgnoreButtonText = "I would ignore";  -- to be uncommented if we need the ignore button */ 
        var message = defaults.cookieMessage.replace('{{cookiePolicyLink}}', defaults.cookiePolicyLink);
        defaults.cookieMessage = 'We use cookies on this website, you can <a href="' + defaults.cookiePolicyLink + '" title="read about our cookies">read about them here</a>. To use the website as intended please...';
        //convert options
        var cookiePolicyLinkIn = options.cookiePolicyLink;
        var cookieCutter = options.cookieCutter;
        var cookieCutterDeclineOnly = options.cookieCutterDeclineOnly;
        var cookieAnalytics = options.cookieAnalytics;
        var cookieDeclineButton = options.cookieDeclineButton;
        var cookieAcceptButton = options.cookieAcceptButton;
        var cookieResetButton = options.cookieResetButton;
        var cookieOverlayEnabled = options.cookieOverlayEnabled;
        var cookiePolicyLink = options.cookiePolicyLink;
        var cookieMessage = message;
        var cookieAnalyticsMessage = options.cookieAnalyticsMessage;
        var cookieErrorMessage = options.cookieErrorMessage;
        var cookieDisable = options.cookieDisable;
        var cookieWhatAreTheyLink = options.cookieWhatAreTheyLink;
        var cookieExpires = options.cookieExpires;
        var cookieAcceptButtonText = options.cookieAcceptButtonText;
        var cookieDeclineButtonText = options.cookieDeclineButtonText;
        var cookieResetButtonText = options.cookieResetButtonText;
        var cookieWhatAreLinkText = options.cookieWhatAreLinkText;
        var cookieNotificationLocationBottom = options.cookieNotificationLocationBottom;
        var cookiePolicyPage = options.cookiePolicyPage;
        var cookiePolicyPageMessage = options.cookiePolicyPageMessage;
        var cookieDiscreetLink = options.cookieDiscreetLink;
        var cookieDiscreetReset = options.cookieDiscreetReset;
        var cookieDiscreetLinkText = options.cookieDiscreetLinkText;
        var cookieDiscreetPosition = options.cookieDiscreetPosition;
        var cookieNoMessage = options.cookieNoMessage;
        // cookie identifier
        var $cookieAccepted = $.cookie('cookie_accept_avg') == "cookie_accept_avg";
        $.cookieAccepted = function () {
            return $cookieAccepted;
        };
        var $cookieDeclined = $.cookie('cookie_decline_avg') == "cookie_decline_avg";
        $.cookieDeclined = function () {
            return $cookieDeclined;
        };
        // write cookie accept button
        if (cookieAcceptButton) {
            var cookieAccept = ' <a href="#accept" class="cc-cookie-accept" adhocevents="cookie_accept_event_avg" adhocevars="cookie_accept_var_avg" onclick="CQ_Analytics.Sitecatalyst.customTrack(this);">' + cookieAcceptButtonText + '</a> ';
        } else {
            var cookieAccept = "";
        }
        // write cookie decline button
        if (cookieDeclineButton) {
            var cookieDecline = ' <a href="#decline" class="cc-cookie-decline" adhocevents="cookie_decline_event_avg" adhocevars="cookie_decline_var_avg" onclick="CQ_Analytics.Sitecatalyst.customTrack(this);">' + cookieDeclineButtonText + '</a> ';
        } else {
            var cookieDecline = "";
        }
        // write extra class for overlay
        if (cookieOverlayEnabled) {
            var cookieOverlay = 'cc-overlay';
        } else {
            var cookieOverlay = "";
        }
        // to prepend or append, that is the question?
        if ((cookieNotificationLocationBottom) || (cookieDiscreetPosition == "bottomright") || (cookieDiscreetPosition == "bottomleft")) {
            var appOrPre = true;
        } else {
            var appOrPre = false;
        }
        if (($cookieAccepted) || ($cookieDeclined)) {
            // write cookie reset button
            if ((cookieResetButton) && (cookieDiscreetReset)) {
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies cc-discreet"><a class="cc-cookie-reset" href="#" title="' + cookieResetButtonText + '">' + cookieResetButtonText + '</a></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies cc-discreet"><a class="cc-cookie-reset" href="#" title="' + cookieResetButtonText + '">' + cookieResetButtonText + '</a></div>');
                }
                //add appropriate CSS depending on position chosen
                if (cookieDiscreetPosition == "topleft") {
                    $('div.cc-cookies').css("top", "0");
                    $('div.cc-cookies').css("left", "0");
                }
                if (cookieDiscreetPosition == "topright") {
                    $('div.cc-cookies').css("top", "0");
                    $('div.cc-cookies').css("right", "0");
                }
                if (cookieDiscreetPosition == "bottomleft") {
                    $('div.cc-cookies').css("bottom", "0");
                    $('div.cc-cookies').css("left", "0");
                }
                if (cookieDiscreetPosition == "bottomright") {
                    $('div.cc-cookies').css("bottom", "0");
                    $('div.cc-cookies').css("right", "0");
                }
            } else if (cookieResetButton) {
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies"><a href="#" class="cc-cookie-reset">' + cookieResetButtonText + '</a></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies"><a href="#" class="cc-cookie-reset">' + cookieResetButtonText + '</a></div>');
                }
            } else {
                var cookieResetButton = "";
            }
        } else {
            // add message to just after opening body tag
            if ((cookieNoMessage) && (!cookiePolicyPage)) {
                // show no link on any pages APART from the policy page
            } else if ((cookieDiscreetLink) && (!cookiePolicyPage)) { // show discreet link
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies cc-discreet"><a href="' + cookiePolicyLinkIn + '" title="' + cookieDiscreetLinkText + '">' + cookieDiscreetLinkText + '</a></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies cc-discreet"><a href="' + cookiePolicyLinkIn + '" title="' + cookieDiscreetLinkText + '">' + cookieDiscreetLinkText + '</a></div>');
                }
                //add appropriate CSS depending on position chosen
                if (cookieDiscreetPosition == "topleft") {
                    $('div.cc-cookies').css("top", "0");
                    $('div.cc-cookies').css("left", "0");
                }
                if (cookieDiscreetPosition == "topright") {
                    $('div.cc-cookies').css("top", "0");
                    $('div.cc-cookies').css("right", "0");
                }
                if (cookieDiscreetPosition == "bottomleft") {
                    $('div.cc-cookies').css("bottom", "0");
                    $('div.cc-cookies').css("left", "0");
                }
                if (cookieDiscreetPosition == "bottomright") {
                    $('div.cc-cookies').css("bottom", "0");
                    $('div.cc-cookies').css("right", "0");
                }
            } else if (cookieAnalytics) { // show analytics overlay - removed cookieIgnore from the banner, To Be Added if necessary
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies ' + cookieOverlay + '">' + cookieAnalyticsMessage + cookieAccept + cookieDecline + '</div>');// '<a href="' + cookieWhatAreTheyLink + '" title="Visit All about cookies (External link)">' + cookieWhatAreLinkText + '</a></div>');
                } else {
                    $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '">' + cookieAnalyticsMessage + cookieAccept + cookieDecline + '</div>'); //'<a href="' + cookieWhatAreTheyLink + '" title="Visit All about cookies (External link)">' + cookieWhatAreLinkText + '</a></div>');
                }
            }
            if (cookiePolicyPage) { // show policy page overlay
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies ' + cookieOverlay + '">' + cookiePolicyPageMessage + " " + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + ' <a href="#decline" class="cc-cookie-decline">' + cookieDeclineButtonText + '</a> ' + '</div>');
                } else {
                    $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '">' + cookiePolicyPageMessage + " " + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + ' <a href="#decline" class="cc-cookie-decline">' + cookieDeclineButtonText + '</a> ' + '</div>');
                }
            } else if ((!cookieAnalytics) && (!cookieDiscreetLink)) { // show privacy policy option
                if (appOrPre) {
                    $('body').append('<div class="cc-cookies ' + cookieOverlay + '">' + cookieMessage + cookieAccept + cookieDecline + '</div>');
                } else {
                    $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '">' + cookieMessage + cookieAccept + cookieDecline + '</div>');
                }
            }
        }
        if ((cookieCutter) && (!cookieCutterDeclineOnly) && (($cookieDeclined) || (!$cookieAccepted))) {
            $(cookieDisable).html('<div class="cc-cookies-error">' + cookieErrorMessage + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + '</div>');
        }
        if ((cookieCutter) && (cookieCutterDeclineOnly) && ($cookieDeclined)) {
            $(cookieDisable).html('<div class="cc-cookies-error">' + cookieErrorMessage + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + '</div>');
        }
        // if bottom is true, switch div to bottom if not in discreet mode
        if ((cookieNotificationLocationBottom) && (!cookieDiscreetLink)) {
            $('div.cc-cookies').css("top", "auto");
            $('div.cc-cookies').css("bottom", "0");
        }
        if ((cookieNotificationLocationBottom) && (cookieDiscreetLink) && (cookiePolicyPage)) {
            $('div.cc-cookies').css("top", "auto");
            $('div.cc-cookies').css("bottom", "0");
        }
        // setting the cookies

        // for top bar  
        $('.cc-cookie-accept, .cc-cookie-decline').click(function (e) {
            e.preventDefault();
            if ($(this).is('[href$=#decline]')) {
                $.cookie("cookie_accept_avg", null, {
                    domain:cookie_Domain,
                    path: '/'
                });
                $.cookie("cookie_decline_avg", "cookie_decline_avg", {
                    domain: cookie_Domain,
                    expires: cookieExpires,
                    path: '/'
                });
                if (options.cookieDomain) {
                    // kill google analytics cookies
                    var cookieDomainGA = "avg.com";
                    $.cookie("s_cc", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                    $.cookie("s_sq", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                    $.cookie("s_cc", null, {
                        path: '/'
                    });
                    $.cookie("s_sq", null, {
                        path: '/'
                    });
                    $.cookie("s_vi", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                    $.cookie("s_vi", null, {
                        path: '/'
                    });
                    $.cookie("__utma", null, {
                        domain: '.' + cookieDomainGA,
                        path: '/'
                    });
                    $.cookie("__utmb", null, {
                        domain: '.' + cookieDomainGA,
                        path: '/'
                    });
                    $.cookie("__utmc", null, {
                        domain: '.' + cookieDomainGA,
                        path: '/'
                    });
                    $.cookie("__utmz", null, {
                        domain: '.' + cookieDomainGA,
                        path: '/'
                    });
                    $.cookie("__utmv", null, {
                        domain: '.' + cookieDomainGA,
                        path: '/'
                    });
                }
            } else {
                $.cookie("cookie_decline_avg", null, {
                    domain: cookie_Domain,
                    path: '/'
                });
                $.cookie("cookie_accept_avg", "cookie_accept_avg", {
                    domain: cookie_Domain,
                    expires: cookieExpires,
                    path: '/'
                });
            }
            $(".cc-cookies").fadeOut(function () {
                // reload page to activate cookies
                location.reload();
            });
        });
        //reset cookies
        $('a.cc-cookie-reset').click(function (f) {
            f.preventDefault();
            $.cookie("cookie_accept_avg", null, {
                domain: cookie_Domain,
                path: '/'
            });
            $.cookie("cookie_decline_avg", null, {
                domain: cookie_Domain,
                path: '/'
            });
            $(".cc-cookies").fadeOut(function () {
                // reload page to activate cookies
                location.reload();
            });
        });
        //cookie error accept
        $('.cc-cookies-error a.cc-cookie-accept').click(function (g) {
            g.preventDefault();
            $.cookie("cookie_accept_avg", "cookie_accept_avg", {
                domain:cookie_Domain,
                expires: cookieExpires,
                path: '/'
            });
            $.cookie("cookie_decline_avg", null, {
                domain:cookie_Domain,
                path: '/'
            });
            // reload page to activate cookies
            location.reload();
        });
        
    };
})(jQuery);