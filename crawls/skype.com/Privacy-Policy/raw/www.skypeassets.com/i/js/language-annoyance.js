/**
 * Show local site switching bar on top of the screen
 * Copyright (c) 2008, Skype Technologies S.A. All rights reserved.
 * Version: 1.0
*/

var counter = 0;
SKYPE.util.showLocalSiteBar = function() {    
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    var AN = YAHOO.util.Anim;
    
    // Make the script wait for PREF_DEFAULT_CC variable to be available. If not, will just stop in 10 seconds
    if (typeof(PREF_DEFAULT_CC) == "undefined" && counter < 10) {
        var waitForIt = setTimeout(function() {
            counter++;
            SKYPE.util.showLocalSiteBar();
        }, 1000);
    } else if (typeof(PREF_DEFAULT_CC) == "undefined") {
        return;
    } else {
        // Mak country name name and language for l10n and link        
        var countryMap = {"GB":"UK", "US":"US"};
        var languageMap = {"GB":"en-gb", "US":"en-us"};
        var header = D.get("header");
        var body = document.getElementsByTagName("BODY")[0];
        var localSiteBar = D.get("localSiteBar");
        if (PREF_DEFAULT_CC && PREF_DEFAULT_CC.match("US|GB") && !SKYPE.user.Preferences.getLanguage().match("en-gb|en-us") && !SKYPE.user.Preferences.getEnv("hideLangBar")) {
                var languageString = "<span id=\"\">You’re viewing our international site. <strong>Switch to <a href=\"/intl/"+languageMap[PREF_DEFAULT_CC]+"\" class=\"languageLink\" title=\"intl/"+languageMap[PREF_DEFAULT_CC]+"\"><img src=\"/i/images/flags/dummyflag.png\" alt=\"\" class=\"flag "+PREF_DEFAULT_CC+"\" /></a> <a href=\"/intl/"+languageMap[PREF_DEFAULT_CC]+"\" class=\"languageLink\" title=\"intl/"+languageMap[PREF_DEFAULT_CC]+"\">"+countryMap[PREF_DEFAULT_CC]+" website</a> instead.</strong></span>";
            
            // Create the languagebar element, position it before the header and animate it to height
            if (!localSiteBar) {
                var localSiteBar = document.createElement("DIV");
                localSiteBar.setAttribute("id", "localSiteBar");
                localSiteBar.innerHTML = "<div id=\"localSiteBarContent\"><a href=\"/\" id=\"closeButton\"/ title=\"Hide this message\"></a>"+languageString+"</div>";
                body.insertBefore(localSiteBar, header);
                var animHeight = new AN(localSiteBar, { height: { from: 0, to: 24 } }, 0.5, YAHOO.util.Easing.easeIn);
                animHeight.animate();
                
				//WANALYTICS: Tracks the bar is displayed
				if (typeof pageTracker != "undefined")
					pageTracker._trackPageview('/custom_metrics/local_site_bar/show_bar');

                // Add listeners for closing the bar without following links and animate height to 0
                E.addListener(D.get("closeButton"), "click", SKYPE.util.cancelDefault); // Remove link default action
                E.addListener(D.get("closeButton"), "click", function() {                
                    var animHeight = new AN(localSiteBar, { height: { to: 0 } }, 0.5, YAHOO.util.Easing.easeIn);
                    animHeight.animate();
                    
                    // Set cookies for hiding the bar and remove bar from DOM when closing animation completes
                    animHeight.onComplete.subscribe(function() {    
                        body.removeChild(D.get("localSiteBar"));
                        SKYPE.user.Preferences.setEnv("hideLangBar");
                        SKYPE.user.Preferences.save();
                    });

					//WANALYTICS: Tracks the bar is closed
					if (typeof pageTracker != "undefined")
						pageTracker._trackPageview('/custom_metrics/local_site_bar/close_bar');
                });
                
                // Add listeners to local site links inside the bar to local site (flag + textual link) which close the bar and switch to local site
                D.getElementsByClassName("languageLink", "a", D.get("localSiteBar"), function() {
                    E.addListener(this, "click", SKYPE.util.cancelDefault); // Remove link default action
                    E.addListener(this, "click", function() {
                        var changeUrl = this.href;

                        // Set cookies for the new language and hiding the bar and remove the bar from DOM
                        SKYPE.user.Preferences.setLanguage(languageMap[PREF_DEFAULT_CC]);
                        SKYPE.user.Preferences.setEnv("hideLangBar");
                        SKYPE.user.Preferences.save();

                        // Check the current page URI so the user will be sent to the same corresponind link on local site
                        var reg = new RegExp("(^"+window.location.protocol+"//"+window.location.hostname+"/)"+"(intl/[a-zA-Z-]{2,7})?/?(.*)");
                		var urlArray = reg.exec(window.location);
                		if(typeof urlArray[1] != undefined) {
                			var newLocation = urlArray[1];	
                			if(typeof urlArray[2] != undefined) {
                				newLocation += this.title+"/";
                			}
                			if(typeof urlArray[3] != undefined) {
                				newLocation += urlArray[3];
                			}
                			window.location = newLocation;
                		} else {
                			window.location = changeUrl;
                		}
                        body.removeChild(D.get("localSiteBar"));

					//WANALYTICS: Tracks user changed local
					if (typeof pageTracker != "undefined")
						pageTracker._trackPageview('/custom_metrics/local_site_bar/changed_local');
						
					
                    });
                });
            }
        }
    }
};
YAHOO.util.Event.onDOMReady(function() {
    SKYPE.util.showLocalSiteBar();
});
