/**
 *    @description    ADITURE
 *    @version        1.3
 *    @usage          aditure.trigger("{mandatory|'empty'}", "{interactive|game|puzzle|...}", {exclusion:""});
 *    @usage          param[0]:required / param[1]:optional / param[2]:optional
 */

var OARuleStyles = new Array(["interactive","30s-NextClick"],["game","30s-NextClick"],["puzzle","30s-NextClick"],["quiz","EveryClick"],["slideshow","EveryClick"],["timeline","EveryClick"],["default","30s-NextClick"]),
    OARuleSet = "",
    pageLevelInteractiveRuleSet = "",
	OATimerTime = 0;
    OATimerStatus = "begin",
    OATriggerAction = "",
	previousClickDatetime = 0,
	OAEveryClickInterval = 1500,
    doAditureEvents = false,
    networkAccounts = new Array(["animal","disccapl"],["dhd","disccdhd"],["dsc","disccdsc"],["health","discchlt"],["fittv","disccfit"],["investigation","disccids"],["kids","discckid"],["military","disccmil"],["news","disccnews"],["planetgreen","discdpg"],["science","disccsci"],["tlc","discctlc"],["turbo","disccturbo"]),
    globalAccount = "disccglobal",
    omnitureDevFlag = hostContainsTestSub,
    showDebugConsole = false,
    fiftyPercent = false,
    debugObject = {adRefreshCounter:0};


/**
 *    @description    tracking methods for onclick events
 *    @usage          aditure.trigger("{mandatory|'empty'}", "{interactive|game|puzzle|...}", {exclusion:""});
 *    ......          param[0]:required / param[1]:optional / param[2]:optional
 */
var aditure = new Object;
aditure = {
        trigger: function(actionName, passedInteractiveType, exclude) {
				if ("undefined" != typeof (interactiveTypeOverride)) { interactiveType = interactiveTypeOverride; }
				else if ("undefined" != typeof (passedInteractiveType)) { interactiveType = passedInteractiveType; }
				else { interactiveType = "default"; }
                
                OATriggerAction = actionName;
                
                for (var i = 0; i < OARuleStyles.length; i++) {
                        if (interactiveType == OARuleStyles[i][0]) { OARuleSet = OARuleStyles[i][1]; break; }
                }
                
                switch (OARuleSet) {
                        case "30s-NextClick" :
                                aditure.ruleNextClick();
                                break;
                        case "EveryClick" :
                                aditure.ruleEveryClick();
                                break;
                        default : break;
                }
                
                if (showDebugConsole) { debugDiv.style.background = "#C66"; }
				if (doAditureEvents) { aditure.fireEvents(); }
        },
        
       	ruleNextClick: function() {
                if ("mandatory" == OATriggerAction) {
                        if ("active" == OATimerStatus) { OATimerTime = 0; OATimerStatus = "complete"; }
                        doAditureEvents = true;
                }
                else {
                        if ("active" != OATimerStatus) {
                                doAditureEvents = true;
                                OATimerTime = 30;
                                OATimerStatus = "active";
                                aditure.timer(30);
                        }
                        else { doAditureEvents = false; }
                }
        },
        
       	ruleEveryClick: function() {
                var currentDate = new Date(),
                    thisClickDatetime = (currentDate.getSeconds() * 1000) + currentDate.getMilliseconds();
                    
                if ((thisClickDatetime - previousClickDatetime) >  OAEveryClickInterval) { OATimerTime = 0; doAditureEvents = true; }
                else { doAditureEvents = false; }
                
                previousClickDatetime = thisClickDatetime;
		},
        
        fireEvents: function() {
				if (showDebugConsole) {
                        debugObject.adRefreshCounter++;
                        debugDiv.style.background = "#363";
                        debugDiv.innerHTML = "<h1>Refreshing!</h1>";
                }
                
				interactivePageViewEvent.trigger();
				aditure.adrefresh();				
				    if (fiftyPercent) {
					   COMSCORE.beacon({
						  c1: 2,
						  c2: 6036284,
						  c3: "",
						  c4: "",
						  c5: "",
						  c6: "",
						  c7: "comscorekw=pageview_candidate",
						  c15: ""
					   });
					   aditure.fireNeilson();
				    }
		},
        
        timer: function(seconds) {
                if (0 < OATimerTime) { setTimeout(function() { seconds--; OATimerTime = seconds; aditure.timer(seconds); if (showDebugConsole) { aditure.updateDebugConsole() } }, 1000); }
                else { OATimerTime = 0; OATimerStatus = "complete"; }
		},
        
        network: function() {
                for (var i = 0; i < networkAccounts.length; i++) {
                        if (hostnameSplit[0] == networkAccounts[i][0]) { return i; break; }
                }
        },
        
        adrefresh: function() {
                if ("undefined" != typeof(DIT.oasc)) { DIT.oasc.refresh(); }
                else {
                        var leaderboard = document.getElementById("ad-container-leaderboard"),
                            rectangle = document.getElementById("ad-container-rectangle"),
                            skyscraper = document.getElementById("ad-container-skyscaper");
						if (leaderboard) { leaderboard.src = leaderboard.src; }
                        if (rectangle) { rectangle.src = rectangle.src; }
                        if (skyscraper) { skyscraper.src = skyscraper.src; }
                }
        },
        
		renderDebugConsole: function() {
			debugObject.adRefreshCounter=0;
			showDebugConsole=true;
			debugDiv=document.createElement("div");
			debugDiv.style.padding='10px';
			debugDiv.style.textAlign='left';
			debugDiv.style.font='13px Arial';
			debugDiv.style.color="#fff";
			debugDiv.style.opacity=.95;
			debugDiv.id="monkey";
			debugDiv.style.position='fixed';
			debugDiv.style.width='300px';
			debugDiv.style.height='200px';
			debugDiv.style.bottom='0px';
			debugDiv.style.right='0px';
			debugDiv.style.background='#666';
			debugDiv.innerHTML="<h2>Aditure Debug</h2>";
			document.getElementsByTagName("body")[0].appendChild(debugDiv);
		},
        
		updateDebugConsole: function() {
			debugDiv.style.background='#666';
			debugDiv.innerHTML="<h2>Aditure Debug</h2>";
			debugDiv.innerHTML+="<p>Interactive Type: " + interactiveType+"</p>";
			debugDiv.innerHTML+="<p>Rule Set: " + OARuleSet+"</p>";
			debugDiv.innerHTML+="<p>Refresh Counter: " + debugObject.adRefreshCounter + "</p>";
			if (OATimerTime!=0) {
				debugDiv.innerHTML+="<h3><strong>t -<span style='color:#F99; background:#333'>" + OATimerTime+"</span></strong> seconds + click until refresh</h3>";
			} else {
				debugDiv.innerHTML+="<h3 style='color:#6C6'>Next Click Will Trigger AdRefresh + Omniture</h3>";
			}	
		},
		
		fireNeilson: function() {
			var d = new Image(1, 1); 
			d.onerror = d.onload = function () {d.onerror = d.onload = null;}; 
			d.src = ["http://secure-us.imrworldwide.com/cgi-bin/m?ci=us-204250h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
		}
};


/**
 *    @description    set listener for debugger console if flagged in query string
 */
if (-1 != (document.location.search).indexOf("debug=true")) {
        window.addEventListener('load', aditure.renderDebugConsole, false);
}
