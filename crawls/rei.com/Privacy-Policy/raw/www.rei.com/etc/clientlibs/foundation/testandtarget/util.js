if( !window.CQ_Analytics ) {
    window.CQ_Analytics = {};
}
CQ_Analytics.TestTarget = new function() {
    return {    
        
        init: function(clientcode) {
            var server = clientcode + '.tt.omtrdc.net';
            if (typeof mboxVersion == 'undefined') {
                mboxVersion = 41;
                mboxFactories = new mboxMap();
                mboxFactoryDefault = new mboxFactory(server, clientcode, 'default');
            }
        
            if (mboxGetPageParameter("mboxDebug") != null
                    || mboxFactoryDefault.getCookieManager().getCookie("debug") != null) {
                setTimeout(
                        function() {
                            if (typeof mboxDebugLoaded == 'undefined') {
                                alert('Could not load the remote debug.\nPlease check your connection to Test&amp;Target servers');
                            }
                        }, 60 * 60);
                document.write('<'
                                + 'scr'
                                + 'ipt language="Javascript1.2" src='
                                + '"http://admin4.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost='
                                + server + '&clientCode=' + clientcode + '"><'
                                + '\/scr' + 'ipt>');
            }
        },
        
	    /**
		 * Fetches the resource from provided path and writes the
		 * response to the document or the mbox Element if 
		 * 
		 * <ul>
		 * <li>response status code is 200</li>
		 * <li>response has a body with length > 0</li>
		 * </ul>
		 * 
		 * Uses a synchronous call for requesting the resource.
		 * 
		 * @static
		 * @param {String}
		 *            path Path to document/node to request.
		 */
        pull: function(path) {
        	var wcmmode = CQ.shared.HTTP.getParameter(document.location.href, 'wcmmode');
        	if (wcmmode && wcmmode.length > 0) {
        		path = CQ.shared.HTTP.addParameter(path,'wcmmode',wcmmode);
        	}
        	var output = CQ.shared.HTTP.get(path);
        	var isOk = (output && output.status && output.status == 200);
        	var hasBody = (output && output.body && output.body.length > 0);
        	if (isOk && hasBody) {
        		var caller = arguments.callee.caller;
        		if (!caller) {
        			document.write(output.body);
        		} else { 
	        		var target;
	        		while (caller){
	        			if (caller.arguments.length > 0) {
	        				if (caller.arguments[0].Fb) {
	        					target = caller.arguments[0].Fb;
	        					break;
	        				}
	        			}
	        			caller = caller.arguments.callee.caller;
	        		};
					if (target) {
					    var scriptwrapper = document.createElement('div');
					    scriptwrapper.innerHTML = output.body;
					    target.appendChild(scriptwrapper);
					    var scripts = target.getElementsByTagName('script');
						for (var i = 0; i < scripts.length; i++) {
						    eval(scripts[i].text);
						}
					}
        		}
        	} else {
        		if (console) console.log("Could not pull resource. Response[status:{},body:{}]", output.status, output.body);
        	}
        },

        reloadRequested: false,

        /* clump update requests together over 500ms, to avoid excessive mboxUpdates */
        triggerUpdate: function(e, sessionstore) {
            if(!CQ_Analytics.TestTarget.reloadRequested) {
                CQ_Analytics.TestTarget.reloadRequested = true;
                setTimeout("CQ_Analytics.TestTarget.deleteMboxCookies(); CQ_Analytics.TestTarget.reloadRequested = false;", 500);
            }
        },
        
        registerMboxUpdateCalls: function() {
            if (CQ_Analytics.mboxes) {
                CQ_TestTarget = {};
                CQ_TestTarget.usedStoresLoaded = false;
                CQ_TestTarget.usedStores = CQ_Analytics.TestTarget.getMappedSessionstores();
                if (CQ_TestTarget.usedStores.length > 0) {
                    CQ_Analytics.CCM.addListener("storeupdate", function(e, sessionstore) {
                        var idx = $CQ.inArray(sessionstore.getName(), CQ_TestTarget.usedStores);
                        if (idx > -1 && !$CQ.isEmptyObject(sessionstore.getData())) {
                            CQ_TestTarget.usedStores.splice(idx,1);
                        }
                        if (CQ_TestTarget.usedStores.length < 1 && !CQ_TestTarget.usedStoresLoaded) {
                            CQ_Analytics.TestTarget.callMboxUpdate();
                            CQ_TestTarget.usedStoresLoaded = true;
                        }
                    });
                    /* fallback in case a store fails to fire 'storeupdate' */
                    CQ_Analytics.CCM.addListener("storesinitialize", function(e, sessionstore) {
                        if (!CQ_TestTarget.usedStoresLoaded) {
                            CQ_Analytics.TestTarget.callMboxUpdate();
                        }
                    });
                } else {
                    CQ_Analytics.TestTarget.callMboxUpdate();
                }
            }           
        },
        
        callMboxUpdate: function() {
            if (CQ_Analytics.mboxes) {
                for (var i=0;i<CQ_Analytics.mboxes.length;i++) {
                    var updateArgs = [CQ_Analytics.mboxes[i].name];
                    for(var j=0; j < CQ_Analytics.mboxes[i].mappings.length; j++) {
                        var profileprefix = "";
                        var mapping = CQ_Analytics.mboxes[i].mappings[j];
                        var tmp = mapping.split(".");
                        var storename = tmp[0];
                        var key = tmp[1];
                        var stores = CQ_Analytics.StoreRegistry.getStores();
                        var store = CQ_Analytics.StoreRegistry.getStore(storename)
                        if(store != undefined) {
                            if(CQ_Analytics.mboxes[i].isProfile.indexOf(mapping) > -1 &&
                               !mapping.match(/^profile\..*$/)) {
                                profileprefix = "profile.";
                            }
                            updateArgs.push(profileprefix + mapping + "=" + store.getProperty(key));
                        }
                    }
                    mboxUpdate.apply(this, updateArgs);
                }
            }
        },
        
        storesPropertiesOptionsProvider: function() {
            var options = [];
            var stores = CQ_Analytics.StoreRegistry.getStores();
            for(var name in stores) {
                var store = CQ_Analytics.StoreRegistry.getStore(name);
                if( store ) {
                    var names = store.getPropertyNames();
                    for(var j = 0; j < names.length; j++) {
                        var value = names[j];
                        if( !CQ.shared.XSS.KEY_REGEXP.test(value) ) {
                            options.push({
                                value: name + "." + value
                            });
                        }
                    }
                }
            }
            return options;
        },

        /**
         * Returns an Array of session store names used in
         * CQ_Analytics.mboxes mappings. Returns empty Array if none
         * found.
         */
        getMappedSessionstores: function () {
            var storenames = [];
            if (CQ_Analytics.mboxes) {
                for (var i=0;i<CQ_Analytics.mboxes.length;i++) {
                    for (var j=0; j < CQ_Analytics.mboxes[i].mappings.length; j++) {
                        var mapping = CQ_Analytics.mboxes[i].mappings[j];
                        var tmp = mapping.split(".");
                        var storename = tmp[0];
                        var key = tmp[1];
                        if ($CQ.inArray(storename, storenames) < 0) {
                            storenames.push(storename);
                        }
                    }
                }
            }
            return storenames;
        },
        
        /**
         * Deletes mbox cookies. If mboxFactoryDefault is undefined the function returns.
         * Forces a page reload if in CQ.WCM.isPreviewMode() is true.
         */
        deleteMboxCookies: function() {
            if (typeof mboxFactoryDefault == 'undefined') return;
            var dc=document.cookie, mc='PC,geo,session,check,debug,edge', no=[];
            mc = mc.split(',');
            for(i=0;i<mc.length;i++){
                try{
                    mboxFactoryDefault.getCookieManager().deleteCookie(mc[i]);
                }catch(e){
                    no.push(mc[i]);
                }
            }
            if (no != ''){
                if (console) console.log('{1} mbox cookies not found!', no);
            }
            if (CQ && CQ.WCM && CQ.WCM.isPreviewMode()) {
                CQ_Analytics.TestTarget.callMboxUpdate();
            }
        },
    
        registerListeners: function() {
            var stores = CQ_Analytics.CCM.getStores();
            for (var storename in stores) {
                var store = stores[storename];
                if (storename != "mouseposition" && store.addListener) {
                    store.addListener("update",function(event, property) {
                        if (property && property.match && property.match("^mouse")!="mouse") {
                            CQ_Analytics.TestTarget.triggerUpdate();
                        }
                    });
                }
            }
        },
                
        ignoredUpdates: {},
        
        ignoreNextUpdate: function(mboxName) {
            CQ_Analytics.TestTarget.ignoredUpdates[mboxName] = true;
        }       
    
    }
};

mbox.prototype._setOffer = mbox.prototype.setOffer;
mbox.prototype.setOffer = function(Nb) {
    if (CQ_Analytics.TestTarget.ignoredUpdates[this.g]) {
        delete CQ_Analytics.TestTarget.ignoredUpdates[this.g];
        return this;
    } else {
        return this._setOffer(Nb);
    }
};

CQ_Analytics.CCM.addListener("storesinitialize", function(e) {
    setTimeout("CQ_Analytics.TestTarget.registerListeners()", 7000);
});
