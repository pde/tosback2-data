

CQ_Analytics.Sitecatalyst = {
    getBaseMappings: function() {
        s['login'] = CQ_Analytics.PageDataMgr.data['login'];
        s['systemType'] = CQ_Analytics.PageDataMgr.data['systemType'];
        s['rmetricscampaign'] = CQ_Analytics.PageDataMgr.data['metricscampaign'];
        s['lifeCycleL2'] = CQ_Analytics.PageDataMgr.data['lifeCycleL2'];
        s['lifeCycleL1'] = CQ_Analytics.PageDataMgr.data['lifeCycleL1'];
        s['language'] = CQ_Analytics.PageDataMgr.data['language'];
        s['rmetricssegment'] = CQ_Analytics.PageDataMgr.data['metricssegment'];
        s['resourceType'] = CQ_Analytics.PageDataMgr.data['resourceType'];
        s['programLevel'] = CQ_Analytics.PageDataMgr.data['programLevel'];
        s['topicL2'] = CQ_Analytics.PageDataMgr.data['topicL2'];
        s['topicL1'] = CQ_Analytics.PageDataMgr.data['topicL1'];
        s['cqUrl'] = CQ_Analytics.PageDataMgr.data['cqUrl'];
        s['englishTitle'] = CQ_Analytics.PageDataMgr.data['englishTitle'];
        s['campaign'] = CQ_Analytics.PageDataMgr.data['campaign'];
        s['assetType'] = CQ_Analytics.PageDataMgr.data['assetType'];
        s['trackOmniture'] = true;
        s['pageType'] = CQ_Analytics.PageDataMgr.data['pageType'];
        s['intelProductL3'] = CQ_Analytics.PageDataMgr.data['intelProductL3'];
        s['intelTechnology'] = CQ_Analytics.PageDataMgr.data['intelTechnology'];
        s['location'] = CQ_Analytics.PageDataMgr.data['location'];
        s['intelProductL2'] = CQ_Analytics.PageDataMgr.data['intelProductL2'];
        s['localCode'] = CQ_Analytics.PageDataMgr.data['localCode'];
        s['intelProductL4'] = CQ_Analytics.PageDataMgr.data['intelProductL4'];
        s['docID'] = CQ_Analytics.PageDataMgr.data['docId'];
        s['loadScript'] = '';
        s['targetAudience'] = CQ_Analytics.PageDataMgr.data['targetAudience'];
        s['trackGoogleAnalytics'] = true;
        s['vps'] = CQ_Analytics.PageDataMgr.data['vps'];
        s['intelProductL1'] = CQ_Analytics.PageDataMgr.data['intelProductL1'];
        
    },

    
    hasEvent: function(event) {
        var a = CQ_Analytics.EventDataMgr.getProperty("events").split("â¦");
            var i = a.length;
            while (i--) {
                if (a[i] === event) {
                    return true;
                }
            }
            return false;
    },
            
    setEvar: function(evar, value) {
        if(evar.match(/^eventdata\.events\./)) {
            if (this.hasEvent(evar.replace(/.+\./,""))) {
                this.events.push(value);
            }
            s.events = this.events.join(",");
            s.linkTrackEvents=s.events;
        } else if(value != '') {
            var tmp = value.split(".");
            var mgr = tmp[0];
            var key = tmp[1];
            var manager = {
                'profile': 'ProfileDataMgr',
                'pagedata': 'PageDataMgr',
                'tagcloud': 'TagCloudMgr',
                'surferinfo': 'SurferInfoMgr',
                'eventdata': 'EventDataMgr'
            };
            if(CQ_Analytics[manager[mgr]] != undefined) {
                 s[evar]= CQ_Analytics[manager[mgr]].data[key];
                 if (mgr=="eventdata") {
                     s.linkTrackVars = s.linkTrackVars + "," + evar;
                 }
            }
        }
    },
    events: [],
    collect: function() {
        var elements = document.getElementsByTagName("*");
            var evnts = {};
            var alldata = {};
            for (var i=0;i<elements.length;i++) {
                if (elements[i].getAttribute("record")) {
                    var trackres = eval("record(" + elements[i].getAttribute("record") + ",true)");
                    var event = trackres[0];
                    evnts[event] = event;
                    var data = trackres[1];
                    for (var j in data) {
                        CQ_Analytics.EventDataMgr.setProperty(j, data[j]);
                    }
                }
            }
            var myevents = [];
            for (i in evnts) {
                myevents.push(i);
            }
            CQ_Analytics.EventDataMgr.setProperty("events", myevents.join("…"));
    }
};
// Custom WAP -------------------------------------------------------------------------------

var wapTrackingEnv = "prod";
var wapReportSuites = "intelreimglobal"; //Omniture Report Suites defined in Analytic tab
s={}; //init s object
// END ---------------------------------------------------------------------------------------
