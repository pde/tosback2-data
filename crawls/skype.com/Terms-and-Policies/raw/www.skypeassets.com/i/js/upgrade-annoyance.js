/**
 * Show upgrade suggestions to specific browsers
 * Copyright (c) 2008, Skype Technologies S.A. All rights reserved.
 * Version: 1.0
*/

var counter = 0;
SKYPE.util.showUpgradeDimmer = function() {
	if (typeof YAHOO == "undefined") {
		return;
	}
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    var BR = YAHOO.env.ua;
    
    var body = document.body;
    var bodyHeight = body.offsetHeight;
    var header = D.get("header");
    var upgradeLayer = D.get("upgradeLayer");
	var cookies = false;
	
	if (SKYPE.user.Preferences.getEnv("cookieCheck")) {
		cookies = true;
	}

    SKYPE.user.Preferences.setEnv("cookieCheck");
    SKYPE.user.Preferences.save();

	if (!SKYPE.user.Preferences.getEnv("hideUpgradeLayer") &&
	SKYPE.user.Preferences.getParsedVersion().version.length > 1 &&
	SKYPE.user.Preferences.getClientProfile() == "existing" &&
	((BR.ie && BR.ie < 7) || (BR.gecko && BR.gecko < 1.9)) &&
	!document.location.pathname.match(/get-skype/) && cookies)
	{

        // Create the upgrade element, position it before the header
        if (!upgradeLayer && typeof upgradeObject != "undefined") {
            var upgradeLayer = document.createElement("DIV");
            upgradeLayer.setAttribute("id", "upgradeLayer");
            upgradeLayer.innerHTML = "<div id=\"bodyDimmer\"></div><div id=\"contentDimmer\"></div><div id=\"pleaseUpgrade\"><a href=\".\" id=\"dontUpgrade\">"+upgradeObject.dontUpgrade+"</a><h1>"+upgradeObject.title+"</h1><p>"+upgradeObject.explanation+"</p><p>"+upgradeObject.download+"</p><p class=\"downloadBrowsers\"><a href=\"http://www.getfirefox.com/\" id=\"downloadFirefox\" class=\"downloadBrowserLink\">Mozilla Firefox</a><a href=\"http://www.microsoft.com/windows/internet-explorer/\" id=\"downloadIE\" class=\"downloadBrowserLink\">Microsoft Internet Explorer</a><a href=\"http://www.opera.com/download/\" id=\"downloadOpera\" class=\"downloadBrowserLink\">Opera</a><a href=\"http://www.google.com/chrome\" id=\"downloadChrome\" class=\"downloadBrowserLink\">Google Chrome</a></p></div>";
            body.insertBefore(upgradeLayer, header);
            upgradeLayer.style.height = bodyHeight + "px";
            D.get("bodyDimmer").style.height = bodyHeight + "px";
            var restOfIt = bodyHeight - (D.get("header").offsetHeight + D.get("footer").offsetHeight + 35);
            D.get("contentDimmer").style.height = restOfIt + "px";
            
            D.getElementsBy(function(ob) {
                if (ob.tagName == "SELECT" || ob.tagName == "OBJECT" || ob.tagName == "EMBED") {
                    return true;
                } else {
                    return false;
                }
            }, "", body, function(node) {
                D.addClass(node, "hidden");
            });
            
            var closeLayer = function() {
                D.getElementsBy(function(ob) {
                    if (ob.tagName == "SELECT" || ob.tagName == "OBJECT") {
                        return true;
                    } else {
                        return false;
                    }
                }, "", body, function(node) {
                    D.removeClass(node, "hidden");
                });
                
                SKYPE.user.Preferences.setEnv("hideUpgradeLayer");
                SKYPE.user.Preferences.save();
                
                body.removeChild(D.get("upgradeLayer"));
            };

            // Add listeners for closing the layer without the links
            E.addListener(D.get("dontUpgrade"), "click", function(ev) {
                E.preventDefault(ev);
                closeLayer();
                window.location = this.href;
            });
            
            // Add listeners to local site links inside the bar to local site (flag + textual link) which close the bar and switch to local site
            D.getElementsByClassName("downloadBrowserLink", "a", D.get("upgradeLayer"), function(ev) {
                E.preventDefault(ev);
                E.addListener(this, "click", function() {
                    closeLayer();
            		window.location = this.href;
                });
            });
        }
    }
};
YAHOO.util.Event.onDOMReady(function() {
    YAHOO.util.Event.addListener(window, "load", SKYPE.util.showUpgradeDimmer);
});
