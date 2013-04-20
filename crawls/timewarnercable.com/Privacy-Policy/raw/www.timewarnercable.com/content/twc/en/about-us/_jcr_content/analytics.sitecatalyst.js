
        if (!Array.prototype.indexOf) { /* patch IE */
            Array.prototype.indexOf = function(obj, start) {
                 for (var i = (start || 0), j = this.length; i < j; i++) {
                     if (this[i] === obj) { return i; }
                 }
                 return -1;
            }
        }

        function record(event, values, collect, opt, componentPath) {
            var options = {};
            options.event = event;
            options.values = values;
            options.collect = collect;
            options.options= opt;
            options.componentPath = componentPath;
            // could use this hack to force old record() calls: options.componentPath = componentPath || CQ_Analytics.Sitecatalyst.frameworkComponents[0];

            //add old record callbacks to after callbacks
            var f = function (callback) {
                return function(options) {
                    callback.call(this, options.event, options.values);
                    return false;
                };
            };

            for (var i = record.callbacks.length - 1; i >= 0; i--) {
                CQ_Analytics.registerAfterCallback(f(record.callbacks[i]), 150 - i);
                record.callbacks.pop();
            }

            return CQ_Analytics.record(options);
        }

        record.callbacks = [];

        CQ_Analytics.registerAfterCallback(function(options) {
            if( $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                return false;    // component not in framework, skip SC callback
            CQ_Analytics.Sitecatalyst.saveEvars();
            CQ_Analytics.Sitecatalyst.updateEvars();
            CQ_Analytics.Sitecatalyst.updateLinkTrackVars();
            return false;
        }, 10);

        CQ_Analytics.registerAfterCallback(function(options) {
            if( $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                return false;    // component not in framework, skip SC callback
            s = s_gi("tsg2resdev3");
            if (s.linkTrackVars == "None") {
                s.linkTrackVars = "events";
            } else {
                s.linkTrackVars = s.linkTrackVars + ",events";
            }
            CQ_Analytics.Sitecatalyst.trackLink(options);
            return false;
        }, 100);


        CQ_Analytics.registerAfterCallback(function(options) {
            if( $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                return false;    // component not in framework, skip SC callback
            CQ_Analytics.Sitecatalyst.restoreEvars();
            return false;
        }, 200);

        CQ_Analytics.adhocLinkTracking = "false";

        CQ_Analytics.Sitecatalyst = {

            events: [],
            
            trackVars: [],

            settings: [],

            stores: CQ_Analytics.StoreRegistry.getStores(),

            getServiceUrl: function() {
                return "https://sitecatalyst.omniture.com/sc15/reports/index.html?a=Report.Standard&switch_accnt={REPORTSUITE}&r=Report.PageSummary&ssSession={SESSION}&jpj={JPJ}&rp=newpage|{PAGEID};page_type|;";
            },

            openServiceUrl: function() {
                var self = this;
                if (this.getServiceUrl() != "null") {
                    var contentUrl = CQ.WCM.getContentUrl();
                    contentUrl = contentUrl.replace(/http:\/\/.*?\//, "/");
                    /*strip scheme*/
                    contentUrl = contentUrl.replace(/(.*?)\?.*/, "$1");
                    /*strip query*/
                    var url = CQ.HTTP.externalize('/libs/cq/analytics/deeplink.json?cfgPath=/etc/cloudservices/sitecatalyst/twc-tsg/res-prod')
                    url += "&path=" + CQ.HTTP.externalize(contentUrl);
                    CQ.HTTP.get(url, function(options, success, response) {
                        if (success) {
                            var data = CQ.HTTP.eval(response);
                            if (data) {
                                var serviceUrl = self.getServiceUrl();
                                serviceUrl = serviceUrl.replace(/\{SESSION\}/gi, (data.ssSession ? data.ssSession : ""));
                                serviceUrl = serviceUrl.replace(/\{JPJ\}/gi, (data.jpj ? data.jpj : ""));
                                serviceUrl = serviceUrl.replace(/\{PAGEID\}/gi, (data.pageid ? data.pageid : ""));
                                serviceUrl = serviceUrl.replace(/\{REPORTSUITE\}/gi, "tsg2resdev3");
                                CQ.shared.Util.open(serviceUrl);
                            }
                        }
                    });
                }
            },

            hasEvent: function(event) {
                var store = CQ_Analytics.StoreRegistry.getStore("eventdata");
                var a = store.getProperty("events").split("\u2026");
                var i = a.length;
                while (i--) {
                    if (a[i] === event) {
                        return true;
                    }
                }
                return false;
            },

            setEvar: function(evar, value) {
                if (evar.match(/^eventdata\.events\./)) {
                    if (this.hasEvent(evar.replace(/.+\./, ""))) {
                        this.events.push(value);
                        this.updateLinkTrackEvents();
                    }
                } else if (value != '') {
                    var tmp = value.split(".");
                    var storename = tmp[0];
                    var key = tmp[1];
                    //var store = CQ_Analytics.StoreRegistry.getStore(storename);
                    //s[evar] = store.getProperty(key);

                    // set up direct references to datastores for use in expressions
                    for (var store in this.stores)
                        try {
                            eval("var " + store + "=this.stores[store].data");
                        } catch(e) {
                        }
                    // evaluate expression using direct references to stores
                    try {
                        s[evar] = eval(value);
                    } catch(e) {
                        console.log("Could not set " + evar + ": " + e);
                    }

                    if (storename == "eventdata" && this.trackVars.indexOf(evar) < 0) {
                        this.trackVars.push(evar);
                    }
                }
            },

            updateLinkTrackEvents: function() {
                s.events = this.events.join(",");
                s.linkTrackEvents = s.events;
            },

            updateLinkTrackVars: function() {
                s.linkTrackVars = this.trackVars.join(",");
            },

            eraseTrackVars: function(saved) {
                for (var i = 0; i < this.trackVars.length; i++) {
                    var evar = this.trackVars[i];
                    if (evar !== 'events') {
                        if (saved)
                            saved[evar] = s[evar];
                        delete s[evar];
                    }
                }
                this.trackVars = [];
            },

            saveEvars: function() {
                var saved = {
                    events: this.events,
                    trackVars: this.trackVars,
                    linkTrackVars: s.linkTrackVars,
                    linkTrackEvents: s.linkTrackEvents
                };
                //clear events cache
                this.events = [];
                this.eraseTrackVars(saved);
                this.settings.push(saved);
            },

            restoreEvars: function() {
                var former = this.settings.pop();
                this.events = former.events;
                delete former.events;
                this.trackVars = former.trackVars;
                delete former.trackVars;
                this.updateLinkTrackEvents();
                this.eraseTrackVars();
                for (var prop in former) {
                    s[prop] = former[prop];
                }
            },

            stopTrackingTemporarily: function() {
                // Disable tracking temporarily, so automatic link tracking is bypassed
                var old_s = {
                    trackDownloadLinks: s.trackDownloadLinks,
                    trackExternalLinks: s.trackExternalLinks
                };
                s.trackDownloadLinks = false;
                s.trackExternalLinks = false;
                (function() {
                    for (var prop in old_s) {
                        s[prop] = old_s[prop];
                    }
                }).defer(200);
            },

            trackLink: function(options) {
                var obj = options.options.obj || "", linkType;
                var defaultLinkType = options.options.defaultLinkType || "o";
                if (typeof obj.href !== 'undefined')
                    linkType = s.lt(obj.href);
                linkType = linkType || defaultLinkType;
                var s_code = s.tl(obj, linkType, "");
                if (s_code) document.write(s_code);
                this.stopTrackingTemporarily();
            },


            customTrack: function(obj) {
                var events = obj.getAttribute('adhocevents') || "";
                var evars = obj.getAttribute('adhocevars') || "";
                if (events || evars) {
                    // set up direct references to datastores for use in expressions
                    for (var store in this.stores)
                        try {
                            eval("var " + store + "=this.stores[store].data");
                        } catch(e) {
                        }
                    // evaluate evars using direct references to stores
                    try {
                        eval("evars = {" + evars + "}");
                    } catch(e) {
                    }
                    CQ_Analytics.Sitecatalyst.saveEvars();
                    try {
                        var linkTrackVars = [];
                        if (events.length > 0) {
                            s.linkTrackEvents = s.events = events;
                            linkTrackVars.push('events');
                        }
                        for (var key in evars) {
                            linkTrackVars.push(key);
                            var value = "'" + escape(evars[key]) + "'";
                            this.setEvar(key, value);
                        }
                        if (linkTrackVars.length > 0)
                            s.linkTrackVars = linkTrackVars.join(',');
                        this.trackLink({options: { obj: obj }});
                    } finally {
                        CQ_Analytics.Sitecatalyst.restoreEvars();
                    }
                }
            },

            collect: function() {
                var elements = document.getElementsByTagName("*");
                var evnts = {};
                var alldata = {};
                var store = CQ_Analytics.StoreRegistry.getStore("eventdata");
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].getAttribute("record")) {
                        var trackres = eval("record(" + elements[i].getAttribute("record") + ",true)");
                        var event = trackres[0];
                        evnts[event] = event;
                        var data = trackres[1];
                        for (var j in data) {
                            store.setProperty(j, data[j]);
                        }
                    }
                }
                var myevents = [];
                for (i in evnts) {
                    myevents.push(i);
                }
                store.setProperty("events", myevents.join("\u2026"));
            }

        };

        var s_account = "tsg2resdev3"
        var s = s_gi(s_account)
/************************** CONFIG SECTION **************************/
        s.fpCookieDomainPeriods = "2"
        
                s.dc='122'
                s.currencyCode='USD'
                s.trackInlineStats=true
                s.linkTrackVars='None'
                s.charSet='ISO-8859-1'
                s.linkLeaveQueryString=true
                s.linkExternalFilters=''
                s.linkTrackEvents='None'
                s.trackExternalLinks=true
                s.linkDownloadFileTypes='exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx'
                s.linkInternalFilters='javascript:,timewarnercable.com,#,localhost,webapps.rr.com'
                s.trackDownloadLinks=true

    /* WARNING: Changing any of the below variables will cause drastic
     changes to how your visitor data is collected.  Changes should only be
     made when instructed to do so by your account manager.*/
        s.visitorNamespace = "twctsg"
        s.trackingServer = "metric.timewarnercable.com"
        s.trackingServerSecure = "metrics.timewarnercable.com"
        CQ_Analytics.adhocLinkTracking = ""
        
        
        
        /* Page Name Plugin Config */
s.siteID=""            // leftmost value in pagename
s.defaultPage="overview"       // filename to add when none exists
s.queryVarsList=""     // query parameters to keep
s.pathExcludeDelim=";" // portion of the path to exclude
s.pathConcatDelim=" > "   // page name component separator
s.pathExcludeList="twctsg,content,twc,en"   // elements to exclude from the path


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/


/* DynamicObjectIDs config */
function s_getObjectID(o) {
	var ID = o.href;
	return ID;
}
s.getObjectID = s_getObjectID

/* added for CQ */               
/* change to prod report suite if necessary */
var isDev = (/webapps/.test(document.domain) || /localhost/.test(document.domain) || /contentmanager/.test(document.domain));
if (!isDev) {
	s.sa('tsg2resglobal');
} 
/* end added for CQ */

/* Plugin Config */
s.usePlugins = true;
var noneIndex;
function s_doPlugins(s) {

		/*s_code date*/
		s.prop48="3/13/2013";
                
		if ((!s.prop3) && (!s.eVar6)) {
            s.eVar6 = s.prop3 = "corporate";
        }
        /* Populate  the FAQ prop16 based on prop9 and prop1 */
        // this will work for CQ pages, but need to provide case for FAQ handling on non-CQ platforms without conflicting with this logic
        if (s.prop9 && /\/residential-home\/support\/faqs/.test(document.URL) ) // FAQ page
        {
            // added for cq
           if (/\/residential-home\/support\/faqs\.html/.test(document.URL)) { // listing page
                s.pageName = "faqs > all faqs";
           }
           else  { // detail and category listing page
				var faqPath1 = document.URL.split("/residential-home/support/"); 
				var faqPath2 = faqPath1[1].split("/"); 
				faqPath2[faqPath2.length-1] = s.prop9;  
				s.pageName = faqPath2.join(" > ");
				if (s.prop9.indexOf(" ") == -1 )  { s.prop9 = ""; }
           }
                
        }
        else // not FAQ page
            s.prop9="";
        // end added for cq
	
	
	
      if (!s.pageType && !s.pageName)s.pageName = s.getPageName()
      if (!s.pageType){
		s.pageName = s.repl(s.pageName, " > default.html", ""); 
		s.pageName = s.repl(s.pageName, "default", "overview");
		s.pageName = s.repl(s.pageName, ".html", "");
       }
       
       	/* MOD cleanup */
	if ( /\/rent./.test(document.URL)){
		if (s.pageName.indexOf("rent.") >= 0) { 
			var modPath = s.pageName.split(".");
			var modId = modPath[1];			
			s.pageName = "rent > " + modId;
		}
		if (typeof s.events !== "undefined" && s.inList("event66",s.events) ){
			var modPath2 = s.pageName.split(" > "); 
			var modId2 = modPath2[1];	
			s.eVar7 = s.eVar7 + "|" + modId2;
		}
	}
	/* end MOD cleanup */
       
	/* Populate the Additional variables  */
	if (s.pageName && s.pageName != ''){
			var str	= s.pageName.split(" > ");
			s.channel=str[0];
			if(str.length ==1){
				s.prop1=s.prop2=str[0];
			}
			if(str.length ==2){
				s.prop1=s.prop2=str[0] + " > " + str[1]
			}
			if(str.length > 2){
				s.prop1=str[0] + " > " + str[1]
				s.prop2=str[0] + " > " + str[1] + " > " + str[2]
			}
			if (s.pageName)					{ s.hier1 	= s.repl(s.pageName, " > ", "|");};
			if (s.prop3)					{ s.prop5 	= s.prop3 + ": " + s.pageName;};
			if (s.prop9)					{ s.prop16 = s.prop1 + ": " + s.prop9; s.eVar49 = s.prop16; };
	}		
		
	/*Add eVar6 to all hits*/
	noneIndex= s.linkTrackVars.indexOf("None")
	if(noneIndex >= 0) s.linkTrackVars="eVar6,eVar75";
	if(noneIndex < 0) s.linkTrackVars=s.apl(s.linkTrackVars,"eVar6,eVar75",",",2);
	/* Call to Days Since LastVisit Plugin */
	if(s.c_r('s_lastvisit')){
		if(!s.c_r('s_lastvisit_s')){
			var e = new Date();
			e.setTime(e.getTime()+1800000);
			s.c_w('s_lastvisit_s','migrate', e);
		}
	}
	s.eVar20 = s.getDaysSinceLastVisit('s_lastvisit');

	/* Call to get time to complete Plugin */
	if(s.events){
		if(s.events.indexOf('event23')>-1)
			s.prop13='start';
	if(s.events.indexOf('purchase')>-1)
		s.prop13='stop';
		s.prop13=s.getTimeToComplete(s.prop13,'ttc',0);
	}
	
	/* Getting the Off-site campaign code */
	if (!s.campaign)s.campaign = s.getQueryParam('cid');
	if (!s.campaign)s.campaign = s.getHashParam('cid','','',1);
	/*Get Light Server call cookie*/
	if(!s.campaign){
		s.campaign=s.getLightCookie("s_mtd","v13");
		//account for URL encoding.
		if(s.campaign && s.campaign.indexOf('%3A') > -1)s.campaign = s.repl(s.campaign, "%3A", ":");
	}	
	/*get it from the referrer*/
	if(!s.campaign){
		if(document.URL.indexOf("ids.rr.com") > 0){
			s.campaign = s.getQueryParam('cid','',document.referrer);
		}
	}
	/*Get ValOnce on Campaign*/
	s.campaign = s.getValOnce(s.campaign,'cid_cookie', 0);

	/* Getting the internal campaign code */
	if (!s.eVar17)s.eVar17 = s.getQueryParam('iid');
	if (!s.eVar17)s.eVar17 = s.getHashParam('iid','','',1);
	if (!s.eVar17){
		if(document.URL.indexOf("ids.rr.com") > 0){
			s.eVar17 = s.getQueryParam('iid','',document.referrer);
		}
	}
	s.eVar17 = s.getValOnce(s.eVar17, 'iid_cookie', 0);
	
	if (s.getQueryParam('iidpos'))
	{
		s.eVar53 = s.getValOnce(s.getQueryParam('iidpos'), 'iidpos_cookie', 0);
	} 	
	
	/* s.crossVisitParticipation Example: 1.2 */
	if (s.campaign)
	{
		s.eVar21 = s.crossVisitParticipation(s.campaign, 's_cpm', '90', '5', ' > ', '');
	}

	/* Call to New vs. Repeat Visitors Plugin */
	s.eVar22 = s.getNewRepeat();

	/* Track the pathing by Returning Visitors */
	if (s.eVar22 == 'Repeat')
	{
		s.prop20 = s.getAndPersistValue(s.eVar22, 'repeat_path', 0) + ": " + s.pageName;
	}

	/* Track the pathing by New Visitors */
	if (s.eVar22 == 'New')
	{
		s.prop21 = s.getAndPersistValue(s.eVar22, 'new_path', 0) + ": " + s.pageName;
	}

	/* Render the page view event*/
	if (s.pageName)
	{
		s.events = s.apl(s.events,'event49',',',2);
		s.eVar47=s.pageName;
		/*Omega pathing */
		if(!s.prop54)s.prop54="D=pageName";
	}
	
	/*add sub pageviews in Omega Pathing*/
	if(s.eVar63 && s.prop54.indexOf("D=pageName") >= 0)s.prop54="D=v63";

		
	/* Populate prop11 based on either prop7 or prop8 */
	if ( typeof( s.prop7 ) != "undefined" ) {
		s.prop11 = s.prop7;
		} else if( typeof( s.prop8 ) != "undefined" ) {
		s.prop11 = s.prop8;
	}
	
	/*Generating Unique Searches
		Code must be after appending event49 for a page view event*/
		if (s.prop18) { 
			s.eVar18 = s.prop18 
			s.eVar18 = s.getValOnce(s.eVar18, 'query_cookie', 0);
			if(s.eVar18) s.events=s.apl(s.events,"event50",",",2);
			if(s.inList("event50",s.events)  && !s.eVar18){
				 s.events = s.repl(s.events, ",event50", "");
				 s.events = s.repl(s.events, "event50", "");
				 s.events = s.repl(s.events, ",,", ",");
			}
		}

	
	if(s.inList("event7",s.events) ||  s.inList("event9",s.events) ||  s.inList("event1",s.events))s.eVar40=s.getQueryParam("Target");

	s.eVar40=s.getAndPersistValue(s.eVar40,'target_val',0);
	
		/* Plugin Example: linkHandler v0.5*/
	var url=s.linkHandler('?eid=|&eid=|?EID=|&EID=', 'e');
	if(url){
		s.linkName = url.toString().toLowerCase();
		if(s.linkName.indexOf("javascript:void(window.open('") >= 0){
			s.linkName = s.repl(s.linkName, "javascript:void(window.open('", "");
			s.linkName = s.repl(s.linkName, "','','').focus())", "");
		}	
		s.linkName = "eid:" + s.linkName;
		noneIndex= s.linkTrackVars.indexOf("None")
		if(noneIndex >= 0) s.linkTrackVars="prop43,prop54";
		if(noneIndex < 0) s.linkTrackVars=s.apl(s.linkTrackVars,"prop43,prop54",",",2);
		s.prop43=s.pageName;
		s.prop54 = "exit:" + url.toString().toLowerCase();			
		if(s.prop19){
			s.linkTrackVars=s.apl(s.linkTrackVars,"prop19",",",2);

			s.prop54=s.prop19
		}		
	}	
		
	/* exitLinkHandler v0.5 */
	var url2=s.exitLinkHandler()
	if(url2){
		noneIndex= s.linkTrackVars.indexOf("None")
		if(noneIndex >= 0) s.linkTrackVars="prop43,prop54";
		if(noneIndex < 0) s.linkTrackVars=s.apl(s.linkTrackVars,"prop43,prop54",",",2);
		s.prop43=s.pageName;
		s.prop54 = "exit:" + url2.toString().toLowerCase();			
		if(s.prop19){
			s.linkTrackVars=s.apl(s.linkTrackVars,"prop19",",",2);

			s.prop54=s.prop19
		}		
	}
	
	/* Used to map divisions to evar*/
	s.eVar6 = s.prop3;
	/*used to map language to evar */
	s.eVar29 = s.prop29;
	
	/*previous page*/
	if(!s.eVar59)s.eVar59 = s.getPreviousValue(s.pageName,'gpv_ev59','');
	
	/*Custom Link Tracking*/
	if(!s.eVar57){
		s.eVar57= s.readCookieLink(); 
		if(s.eVar57) s.events=s.apl(s.events,"event86",",",2);	
	}
	
	/*Custom pop/click to chat*/
	if(s.inList('event97', s.events) || s.inList('event81', s.events)){
		if(s.eVar67 && s.eVar68)s.c_w('popPage',s.eVar68+'|'+s.eVar67,0)
	}
	if(s.inList('event77', s.events)){
		var popPage = s.c_r('popPage').split('|')
		if(popPage.length == 2){
			s.linkTrackVars=s.apl(s.linkTrackVars,"eVar67,eVar68",",",2);
			s.eVar68=popPage[0];
			s.eVar67=popPage[1];
		}
		s.c_w('popPage','')
	}
	
	/*Get and persist 75*/
	s.eVar75=s.getAndPersistValue(s.eVar75,'s_v75',365);
	
	/*Live Person Measurement*/
	if(s.inList("event40",s.events)){
		var e = new Date();
		e.setTime(e.getTime()+86400000);
		s.c_w('sc_liveperson','true', e);
	}
	
	if(s.inList("purchase",s.events)){
		if(s.c_r('sc_liveperson')){
			s.prop73=s.purchaseID;
			s.c_w('sc_liveperson','',-1);
		}
	}

	/*Lowercasing Variables*/
	for(n in s) {
    	if(n.indexOf('prop') > -1) {
			if(!(n.indexOf('prop51') > -1) && !(n.indexOf('prop52') > -1)){
				if(s[n]){
					s[n] = s[n].toString();
					if(s[n].indexOf('D=') == -1)s[n]=s[n].toLowerCase();
				}
			}
		}
	}
	
	for(n in s) {
    	if(n.indexOf('eVar') > -1) {
			if(s[n]){
				s[n] = s[n].toString();
				if(s[n].indexOf('D=') == -1)s[n]=s[n].toLowerCase();
			}
    	}
	}

	/* make all variables lowercase*/
	if (s.pageName) s.pageName=s.pageName.toLowerCase();
	if (s.channel) s.channel=s.channel.toLowerCase();
	if (s.hier1) s.hier1=s.hier1.toLowerCase();
	if (s.state) s.state=s.state.toLowerCase();
	if (s.products) s.products=s.products.toLowerCase();
	if(s.purchaseID) s.transactionID = s.purchaseID;
}

s.doPlugins = s_doPlugins

        

        
        



 
