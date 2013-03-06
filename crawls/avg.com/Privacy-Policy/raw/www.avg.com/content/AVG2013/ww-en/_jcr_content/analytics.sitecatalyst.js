
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
            CQ_Analytics.Sitecatalyst.updateEvars(options);
            CQ_Analytics.Sitecatalyst.updateLinkTrackVars();
            return false;
        }, 10);

        CQ_Analytics.registerAfterCallback(function(options) {
            if( $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                return false;    // component not in framework, skip SC callback
            s = s_gi("avgcorporatepublicww");
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
                    var url = CQ.HTTP.externalize('/libs/cq/analytics/deeplink.json?cfgPath=/etc/cloudservices/sitecatalyst/qaconfig/AVG_CQ-Author')
                    url += "&path=" + CQ.HTTP.externalize(contentUrl);
                    CQ.HTTP.get(url, function(options, success, response) {
                        if (success) {
                            var data = CQ.HTTP.eval(response);
                            if (data) {
                                var serviceUrl = self.getServiceUrl();
                                serviceUrl = serviceUrl.replace(/\{SESSION\}/gi, (data.ssSession ? data.ssSession : ""));
                                serviceUrl = serviceUrl.replace(/\{JPJ\}/gi, (data.jpj ? data.jpj : ""));
                                serviceUrl = serviceUrl.replace(/\{PAGEID\}/gi, (data.pageid ? data.pageid : ""));
                                serviceUrl = serviceUrl.replace(/\{REPORTSUITE\}/gi, "avgcorporatepublicww");
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
                    // set up direct references to datastores for use in expressions
                    for (var store in this.stores)
                        try {
                            eval("var " + store + "=this.stores[store].data");
                        } catch(e) {
                        }
                    // evaluate expression using direct references to stores
                    try {
                        s[evar] = CQ_Analytics.Variables.replaceVariables(eval(value));
                    } catch(e) {
                        console.log("Could not set " + evar + ": " + e);
                    }

                    if (this.trackVars.indexOf(evar) < 0) {
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
                var eventdata = CQ_Analytics.StoreRegistry.getStore("eventdata");
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].getAttribute("record")) {
                        var trackres = eval("record(" + elements[i].getAttribute("record") + ",true)");
                        var event = trackres[0];
                        evnts[event] = event;
                        var data = trackres[1];
                        for (var j in data) {
                            var store = eventdata;
                            var prop = j.split('.');
                            if (j.indexOf('.') >= 0 && CQ_Analytics.StoreRegistry.getStore(prop[0])) {
                                store = CQ_Analytics.StoreRegistry.getStore(prop[0]);
                                prop = prop[1];
                            }
                            store.setProperty(prop, data[j]);
                        }
                    }
                }
                var myevents = [];
                for (i in evnts) {
                    myevents.push(i);
                }
                eventdata.setProperty("events", myevents.join("\u2026"));
            }

        };

        var s_account = "avgcorporatepublicww"
        var s = s_gi(s_account)
/************************** CONFIG SECTION **************************/
        s.fpCookieDomainPeriods = "2"
        
                s.currencyCode='USD'
                s.trackInlineStats=true
                s.linkTrackVars='None'
                s.charSet='UTF-8'
                s.linkLeaveQueryString=false
                s.linkExternalFilters=''
                s.linkTrackEvents='None'
                s.trackExternalLinks=true
                s.linkDownloadFileTypes='exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls'
                s.linkInternalFilters='javascript:,'+window.location.hostname
                s.trackDownloadLinks=true

    /* WARNING: Changing any of the below variables will cause drastic
     changes to how your visitor data is collected.  Changes should only be
     made when instructed to do so by your account manager.*/
        s.visitorNamespace = "avgtechnologies"
        s.trackingServer = "omni.avg.com"
        s.trackingServerSecure = "somni.avg.com"
        CQ_Analytics.adhocLinkTracking = "true"
        
        
        
        

s.getQueryParam = new Function("p", "d", "u", ""
+ "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+ "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+ ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+ "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+ "=p.length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", ""
+ "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+ "=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase()){v=s.rep(v,'+',' '); return v;}"
+ "}return ''");


s.deB64 = function(s) {
  var e={},i,k,v=[],r='',w=String.fromCharCode;
  var n=[[65,91],[97,123],[48,58],[43,44],[47,48]];
  for(z in n){for(i=n[z][0];i<n[z][1];i++){v.push(w(i));}}
  for(i=0;i<64;i++){e[v[i]]=i;}
  for(i=0;i<s.length;i+=72){var b=0,c,x,l=0,o=s.substring(i,i+72);
  for(x=0;x<o.length;x++){c=e[o.charAt(x)];b=(b<<6)+c;l+=6;while(l>=8){r+=w((b>>>(l-=8))%256);}}}return r;}
  

if(!s.eVar62){
	s.eVar62=(s.deB64(s.getQueryParam('tu_exp')))
  }
  
  
  
  


/***** HELPER FUNCTIONS3 ****/
url = document.location.href;
url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
alias = url.substring(url.lastIndexOf("/") + 1, url.length);
domain = url.split(/\/+/g)[1]; 


	/* Automated download tracking */
	var url=s.linkHandler("download-file-");
  var metadownload = GetHttpEquiv();
  if(metadownload === undefined) {
 var metadownload = "0";
}
//  var s_vi_value = s.c_r("s_vi");
  var s_vi_value = "abcd";  
  var s_vi_value_short = s_vi_value.substring(7, 20);
  if((url) || (metadownload.indexOf('download-file-')>-1) ) {    
        	if((url.indexOf('tri')>-1)  || (metadownload.indexOf('tri')>-1)) {
			if((url.indexOf('avd')>-1) || (metadownload.indexOf('avd')>-1)){ 
				s.prop9="down_trial_avd_avg_"+alias;
				s.eVar9="down_trial_avd_avg_"+alias;
        s.products =';avd_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */               
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}else if((url.indexOf('triisi')>-1) || (metadownload.indexOf('triisi')>-1)){ 
				s.prop9="down_trial_isi_avg_"+alias;
				s.eVar9="down_trial_isi_avg_"+alias;
        s.products =';isi_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */    
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}else if((url.indexOf('trituh')>-1) || (metadownload.indexOf('trituh')>-1)){ 
				s.prop9="down_trial_tuh_avg_"+alias;
				s.eVar9="down_trial_tuh_avg_"+alias;
        s.products =';tuh_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */    
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}else if((url.indexOf('fww')>-1) || (metadownload.indexOf('fww')>-1)){ 
				s.prop9="down_trial_fww_avg_"+alias;
				s.eVar9="down_trial_fww_avg_"+alias;
        s.products =';fww_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */    
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}else if((url.indexOf('isp')>-1) || (metadownload.indexOf('isp')>-1)){ 
				s.prop9="down_trial_isp_avg_"+alias;
				s.eVar9="down_trial_isp_avg_"+alias;
        s.products =';isp_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";     
			}else if((url.indexOf('idt')>-1) || (metadownload.indexOf('idt')>-1)){ 
				s.prop9="down_trial_idt_avg_"+alias;
				s.eVar9="down_trial_idt_avg_"+alias;
        s.products =';idt_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}                 
       else if((url.indexOf('triavc')>-1) || (metadownload.indexOf('triavc')>-1)){ 
				s.prop9="down_trial_avc_avg_"+alias;
				s.eVar9="down_trial_avc_avg_"+alias;
        s.products =';avc_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}   
       else if((url.indexOf('triisc')>-1) || (metadownload.indexOf('triisc')>-1)){
				s.prop9="down_trial_isc_avg_"+alias;
				s.eVar9="down_trial_isc_avg_"+alias;
        s.products =';isc_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"+s_vi_value_short;
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}
       else if((url.indexOf('triavb')>-1) || (metadownload.indexOf('triavb')>-1)){  
				s.prop9="down_trial_avb_avg_"+alias;
				s.eVar9="down_trial_avb_avg_"+alias;
        s.products =';avb_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"+s_vi_value_short;
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}      
       else if((url.indexOf('triise')>-1)  || (metadownload.indexOf('triise')>-1)){   
				s.prop9="down_trial_ise_avg_"+alias;
				s.eVar9="down_trial_ise_avg_"+alias;
        s.products =';ise_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}                  
       else if((url.indexOf('trifsc')>-1)  || (metadownload.indexOf('trifsc')>-1)){    
				s.prop9="down_trial_fsc_avg_"+alias;
				s.eVar9="down_trial_fsc_avg_"+alias;
        s.products =';fsc_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}                 
       else if((url.indexOf('trimsb')>-1)  || (metadownload.indexOf('trimsb')>-1)){  
				s.prop9="down_trial_msb_avg_"+alias;
				s.eVar9="down_trial_msb_avg_"+alias;
        s.products =';msb_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}                                                
       else if((url.indexOf('trialb')>-1)  || (metadownload.indexOf('trialb')>-1)){     
				s.prop9="down_trial_alb_avg_"+alias;
				s.eVar9="down_trial_alb_avg_"+alias;
        s.products =';alb_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			} 
		} else             
        		if((url.indexOf('afg')>-1)  || (metadownload.indexOf('afg')>-1)){
				s.prop9="down_paid_afg_avg_"+alias;
				s.eVar9="down_paid_afg_avg_"+alias;
        s.products =';afg_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}else if((url.indexOf('avd')>-1)  || (metadownload.indexOf('avd')>-1)){
				s.prop9="down_paid_avd_avg_"+alias;
				s.eVar9="down_paid_avd_avg_"+alias;
        s.products =';avd_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}else if((url.indexOf('fww')>-1)  || (metadownload.indexOf('fww')>-1)){
				s.prop9="down_paid_fww_avg_"+alias;
				s.eVar9="down_paid_fww_avg_"+alias;
        s.products =';fww_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}else if((url.indexOf('isp')>-1)  || (metadownload.indexOf('isp')>-1)){
				s.prop9="down_paid_isp_avg_"+alias;
				s.eVar9="down_paid_isp_avg_"+alias;
        s.products =';isp_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}else if((url.indexOf('lsf')>-1)  || (metadownload.indexOf('lsf')>-1)){
				s.prop9="down_paid_lsf_avg_"+alias;
				s.eVar9="down_paid_lsf_avg_"+alias;
        s.products =';lsf_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";    
			}else if((url.indexOf('afh')>-1)  || (metadownload.indexOf('afh')>-1)){     
				s.prop9="down_paid_afh_avg_"+alias;
				s.eVar9="down_paid_afh_avg_"+alias;
        s.products =';afh_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";     
			}else if((url.indexOf('abf')>-1)  || (metadownload.indexOf('abf')>-1)){    
				s.prop9="down_paid_abf_avg_"+alias;
				s.eVar9="down_paid_abf_avg_"+alias;
        s.products =';abf_trial;1;0';
				s.events=s.events?s.events+",event33":"event13,event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";    
			}else if((url.indexOf('smf')>-1)  || (metadownload.indexOf('smf')>-1)){       
				s.prop9="down_paid_smf_avg_"+alias;
				s.eVar9="down_paid_smf_avg_"+alias;
        s.products =';smf_paid;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";     
			}else if((url.indexOf('alf')>-1)  || (metadownload.indexOf('alf')>-1)){       
				s.prop9="down_paid_alf_avg_"+alias;
				s.eVar9="down_paid_alf_avg_"+alias;
        s.products =';alf_paid;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";     
			}else if((url.indexOf('avc')>-1)  || (metadownload.indexOf('avc')>-1)){     
				s.prop9="down_paid_avc_avg_"+alias;
				s.eVar9="down_paid_avc_avg_"+alias;
        s.products =';avc_paid;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";    
			}else if((url.indexOf('pct')>-1)  || (metadownload.indexOf('pct')>-1)){     
				s.prop9="down_paid_pct_avg_"+alias;
				s.eVar9="down_paid_pct_avg_"+alias;
        s.products =';pct_paid;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";    
			}else if((url.indexOf('avb')>-1)  || (metadownload.indexOf('avb')>-1)){      
				s.prop9="down_paid_avb_avg_"+alias;
				s.eVar9="down_paid_avb_avg_"+alias;
        s.products =';avb_paid;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";   
			}else if((url.indexOf('ise')>-1)  || (metadownload.indexOf('ise')>-1)){    
				s.prop9="down_paid_ise_avg_"+alias;
				s.eVar9="down_paid_ise_avg_"+alias;
        s.products =';ise_paid;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33"; 
			}else if((url.indexOf('fsc')>-1)  || (metadownload.indexOf('fsc')>-1)){  
				s.prop9="down_paid_fsc_avg_"+alias;
				s.eVar9="down_paid_fsc_avg_"+alias;
        s.products =';fsc_paid;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";  
			}else if((url.indexOf('msb')>-1)  || (metadownload.indexOf('msb')>-1)){      
				s.prop9="down_paid_msb_avg_"+alias;
				s.eVar9="down_paid_msb_avg_"+alias;
        s.products =';msb_paid;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";      
			}else if((url.indexOf('alb')>-1)  || (metadownload.indexOf('alb')>-1)){      
				s.prop9="down_paid_alb_avg_"+alias;
				s.eVar9="down_paid_alb_avg_"+alias;
        s.products =';alf_paid;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}
      else if((url.indexOf('tuh')>-1)  || (metadownload.indexOf('tuh')>-1)){      
				s.prop9="down_trial_tuh_avg_"+alias;
				s.eVar9="down_trial_tuh_avg_"+alias;
        s.products =';tuh_trial;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
			}          
     /* else {
				s.prop9=url;
				s.eVar9=url;
				s.events=s.events?s.events+",event9,event10,event13":"event9,event10,event13";
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event9,event10,event13";
			}        */
		}
    
    

 
 var url2=s.linkHandler("download");    
 if(url2) {
    if(url.indexOf('download.cnet.com/AVG-AntiVirus-FREE')>-1)   {
				s.prop9="down_free_avc_cnet.com_"+alias;
				s.eVar9="down_free_avc_cnet.com_"+alias;
        s.products =';avc_free;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
    }
 }
 
 
 var url3=s.linkHandler("stahuj");    
 if(url3) {
    if(url.indexOf('stahuj.centrum.cz/avg-antivirus')>-1)   {
				s.prop9="down_free_avc_stahuj.cz_"+alias;
				s.eVar9="down_free_avc_stahuj.cz_"+alias;
        s.products =';avc_free;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
    }
 } 
 
 var url4=s.linkHandler("chip.de");    
 if(url4) {
    if(url.indexOf('chip.de/downloads/AVG-Free-Antivirus')>-1)   {
				s.prop9="down_free_avc_chip.de_"+alias;
				s.eVar9="down_free_avc_chip.de_"+alias;
        s.products =';avc_free;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
    }
 }  
 
  var url5=s.linkHandler("01net.com");    
 if(url5) {
    if(url.indexOf('01net.com/telecharger/windows/Securite/antivirus-antitrojan')>-1)   {
				s.prop9="down_free_avc_01net.com_"+alias;
				s.eVar9="down_free_avc_01net.com_"+alias;
        s.products =';avc_free;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
    }
 }  
 
 
  var url6=s.linkHandler("html.it");    
 if(url6) {
    if(url.indexOf('download.html.it/software/vedi/9792/avg-anti-virus')>-1)   {
				s.prop9="down_free_avc_html.it_"+alias;
				s.eVar9="down_free_avc_html.it_"+alias;
        s.products =';avc_free;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
    }
 }  
 
 
  var url7=s.linkHandler("dobreprogramy.pl");    
 if(url7) {
    if(url.indexOf('dobreprogramy.pl/AVG-AntiVirus-Free-Edition')>-1)   {
				s.prop9="down_free_avc_dobreprogramy.pl_"+alias;
				s.eVar9="down_free_avc_dobreprogramy.pl_"+alias;
        s.products =';avc_free;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
    }
 } 
 
 
   var url8=s.linkHandler("baixaki.com");    
 if(url8) {
    if(url.indexOf('baixaki.com.br/download/avg-anti-virus')>-1)   {
				s.prop9="down_free_avc_baixaki.com.br_"+alias;
				s.eVar9="down_free_avc_baixaki.com.br_"+alias;
        s.products =';avc_free;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
    }
 } 
 
   var url9=s.linkHandler("softportal.com");    
 if(url9) {
    if(url.indexOf('softportal.com/getsoft-607-avg-antivirus-free')>-1)   {
				s.prop9="down_free_avc_softportal.com_"+alias;
				s.eVar9="down_free_avc_softportal.com_"+alias;
        s.products =';avc_free;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
    }
 } 
 
    var url10=s.linkHandler("tamindir.com");    
 if(url10) {
    if(url.indexOf('tamindir.com/avg-anti-virus-free-edition')>-1)   {
				s.prop9="down_free_avc_tamindir.com_"+alias;
				s.eVar9="down_free_avc_tamindir.com_"+alias;
        s.products =';avc_free;1;0';
				s.events=s.events?s.events+",event33":"event33"; /*+s_vi_value_short; */
				s.linkTrackVars="prop9,eVar9,events";
				s.linkTrackEvents="event33";
    }
 } 



 alert("I am an alert box!");


/***** CUSTOM TRACKING ***/
if(domain=="free.avg.com"){
s.eVar1 = "fs_"+alias;
}else{s.eVar1="ws_"+alias;}


if(s.pageName){

/***** remove parameters from URL begin ******/
                       
if (document.location.href.indexOf('?') >= 0) s.pageName=document.location.href.substring(0,document.location.href.indexOf('?'));
                                                                                                  
if (document.location.href.indexOf('#') >= 0) s.pageName=document.location.href.substring(0,document.location.href.indexOf('#'));                                                 
                      
/***** remove parameters from URL end ******/      

}

s.usePlugins=true; //do not modify

/**Note: add your custom JS plugins inside the s_doPlugins function below**/

function s_doPlugins(s) {
/*****START OF PLUGINS SECTION*****/

function get_cookie ( cookie_name ){var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );if ( results )return ( unescape ( results[2] ) ); else return null;}     

/************************ Test&Target Plugin Start *************************/
/*
* TNT Integration Plugin v1.0
* v - Name of the javascript variable that is used. Defaults to s_tnt
(optional)
* p - Name of the url parameter. Defaults to s_tnt (optional)
* b - Blank Global variable after plugin runs. Defaults to true (Optional)
*/
s.trackTNT = function(v, p, b)
{
var s=this, n="s_tnt", p=(p)?p:n, v=(v)?v:n, r="",pm=false, b=(b)?b:true;
if(s.getQueryParam)
pm = s.getQueryParam(p); //grab the parameter
if(pm)
r += (pm + ","); // append the parameter
if(s.wd[v] != undefined)
r += s.wd[v]; // get the global variable
if(b)
s.wd[v] = ""; // Blank out the global variable for ajax requests
return r;
}
s.tnt=s.trackTNT();
/*********************** Test&Target Plugin End *************************/

/*
 * Plugin: getVisitNum - version 3.0
 */
s.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+"t;");



  

/*
* Plugin Utility: apl v1.1
*/
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");


/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");

/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Utility Function: p_c
 */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");



/*                                                                  
* Plugin: clickPast - version 1.0
*/
s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * channelManager v2.2 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","V",""
+"var s=this,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E,F,"
+"G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,W,X,Y;g=s.referrer?s.referrer:documen"
+"t.referrer;g=g.toLowerCase();if(!g){h='1'}i=g.indexOf('?')>-1?g.ind"
+"exOf('?'):g.length;j=g.substring(0,i);k=s.linkInternalFilters.toLow"
+"erCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k"
+"[m])==-1?'':g;if(n)o=n}if(!o&&!h){p=g;q=g.indexOf('//')>-1?g.indexO"
+"f('//')+2:0;r=g.indexOf('/',q)>-1?g.indexOf('/',q):i;t=g.substring("
+"q,r);t=t.toLowerCase();u=t;P='Referrers';v=s.seList+'>'+s._extraSea"
+"rchEngines;if(V=='1'){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^'"
+");g=s.repl(g,'as_q','*');}A=s.split(v,'>');B=A.length;for(C=0;C<B;C"
+"++){D=A[C];D=s.split(D,'|');E=s.split(D[0],',');F=E.length;for(G=0;"
+"G<F;G++){H=j.indexOf(E[G]);if(H>-1){I=s.split(D[1],',');J=I.length;"
+"for(K=0;K<J;K++){L=s.getQueryParam(I[K],'',g);if(L){L=L.toLowerCase"
+"();M=L;if(D[2]){u=D[2];N=D[2]}else{N=t}if(V=='1'){N=s.repl(N,'#',' "
+"- ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','"
+"oogle');}}}}}}}O=s.getQueryParam(a,b);if(O){u=O;if(M){P='Paid Searc"
+"h'}else{P='Paid Non-Search';}}if(!O&&M){u=N;P='Natural Search: Non-Brand'}f=s."
+"_channelDomain;if(f){k=s.split(f,'>');l=k.length;for(m=0;m<l;m++){Q"
+"=s.split(k[m],'|');R=s.split(Q[1],',');S=R.length;for(T=0;T<S;T++){"
+"W=j.indexOf(R[T]);if(W>-1)P=Q[0]}}}d=s._channelParameter;if(d){k=s."
+"split(d,'>');l=k.length;for(m=0;m<l;m++){Q=s.split(k[m],'|');R=s.sp"
+"lit(Q[1],',');S=R.length;for(T=0;T<S;T++){U=s.getQueryParam(R[T]);i"
+"f(U)P=Q[0]}}}e=s._channelPattern;if(e){k=s.split(e,'>');l=k.length;"
+"for(m=0;m<l;m++){Q=s.split(k[m],'|');R=s.split(Q[1],',');S=R.length"
+";for(T=0;T<S;T++){X=O.indexOf(R[T]);if(X==0)P=Q[0]}}}if(h=='1'&&!O)"
+"{u=P=t=p='Direct Load'}T=M+u+t;U=c?'c':'c_m';if(c!='0'){T=s.getValO"
+"nce(T,U,0);}if(T)M=M?M:'n/a';s._referrer=T&&p?p:'';s._referringDoma"
+"in=T&&t?t:'';s._partner=T&&N?N:'';s._campaignID=T&&O?O:'';s._campai"
+"gn=T&&u?u:'';s._keywords=T&&M?M:'';s._channel=T&&P?P:'';");
/* Top 130 - Grouped */
s.seList="altavista.co,altavista.de|q,r|AltaVista>.aol.,suche.aolsvc"
+".de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>www.baidu.com|wd|Baidu>daum"
+".net,search.daum.net|q|Daum>google.,googlesyndication.com|q,as_q|Go"
+"ogle>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor|"
+"MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query"
+",search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sezn"
+"am.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query"
+"|Tiscali>virgilio.it|qs|Virgilio>yahoo.com,yahoo.co.jp|p,va|Yahoo!>"
+"yandex|text|Yandex.ru>search.cnn.com|query|CNN Web Search>search.ea"
+"rthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Search>"
+"search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Search";

/*
 * s.join: 1.0 - s.join(v,p)
 *
 *  v - Array (may also be array of array)
 *  p - formatting parameters (front, back, delim, wrap)
 *
 */

s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");


/*
 *	Plug-in: crossVisitParticipation v1.5 - stacks values from
 *	specified variable in cookie and returns value
 */

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v=='')return '';v=escape(v);var arry=new Array(),a=new Array("
+"),c=s.c_r(cn),g=0,h=new Array();if(c&&c!='')arry=eval(c);var e=new "
+"Date();e.setFullYear(e.getFullYear()+5);if(dv==0 && arry.length>0 &"
+"& arry[arry.length-1][0]==v)arry[arry.length-1]=[v, new Date().getT"
+"ime()];else arry[arry.length]=[v, new Date().getTime()];var start=a"
+"rry.length-ct<0?0:arry.length-ct;var td=new Date();for(var x=start;"
+"x<arry.length;x++){var diff=Math.round((td.getTime()-arry[x][1])/86"
+"400000);if(diff<ex){h[g]=unescape(arry[x][0]);a[g]=[arry[x][0],arry"
+"[x][1]];g++;}}var data=s.join(a,{delim:',',front:'[',back:']',wrap:"
+"\"'\"});s.c_w(cn,data,e);var r=s.join(h,{delim:dl});if(ce) s.c_w(cn"
+",'');return r;");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Plugin: linkHandler 0.5 - identify and report custom links
 */
s.linkHandler=new Function("p","t",""
+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn=new Function("t","h",""
+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+"return 0;");

/*
 * Utility Function: p_gh
 */
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

 /*
 * Plugin: Flash Detection 0.6 - Detect Flash version number
 */
s.detectFlash=new Function("cn","mfv","vr",""
+"var s=this,fv=-1,dwi=0,r,w,mt=s.n.mimeTypes,fk=s.c_r(cn),k=s.c_w('s"
+"_cc','true',0)?'Y':'N';if(k=='Y'&&!fk){if(s.pl&&s.pl.length){if(s.p"
+"l['Shockwave Flash 2.0'])fv=2;x=s.pl['Shockwave Flash'];if(x){fv=0;"
+"z=x.description;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt"
+"&&mt.length){x=mt['application/x-shockwave-flash'];if(x&&x.enabledP"
+"lugin)fv=0;}if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.i"
+"sie&&w&&execScript){result=false;for(var i=mfv;i>=3&&result!=true;i"
+"--){execScript('on error resume next: result = IsObject(CreateObjec"
+"t(\"ShockwaveFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}r=f"
+"v==-1?'flash not detected':fv==0?'flash enabled (no version)':'flas"
+"h '+fv;s.c_w(cn,r,0);return 'true';}else return '';");
s.getFlash=new Function("cn",""
+"var s=this;if(cn&&s.c_r(cn))return s.c_r(cn);");
s.returnFlash=new Function("cn","vr","to",""
+"setTimeout(\"var cn,vr,to,s_dfv=s_gi(s_account);s_dfv.linkTrackVars"
+"=vr,s_dfv.vr=s.getFlash();s_dfv.tl(this,'o','Flash Version Detectio"
+"n')\",to);");

/*****END OF PLUGINS SECTION******/
}

s.doPlugins=s_doPlugins; //do not modify
        

        
        



 
