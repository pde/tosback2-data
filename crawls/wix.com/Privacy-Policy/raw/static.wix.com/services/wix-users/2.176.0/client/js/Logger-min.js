/* logger */ 
var WixLogger=function(a){this._logList=[];
this._timeData={};
this._settings=a;
this._initTime=new Date().getTime();
this._analytics=new WixGoogleAnalytics(a.defaultAnalytics,a.optionalAnalytics,a.version,a.userType,a.userLangauge);
this._wixBI=new WixBILogger(a.floggerServerURL,a.version,a.siteId,a.userId,a.userType,a.session,a.computerId,a.creationSource, a.src)
};
WixLogger.prototype.updateSetting=function(c,b){var a=this._settings||{};
a[c]=b;
switch(c){case"siteId":this._wixBI.setDocId(b);
break
}};
WixLogger.prototype.showLog=function(){};
WixLogger.prototype.reportError=function(c,b,a,d){d=d||{};
if(this._handleLogObj("reportError",c,d,{className:b,methodName:a})){this._wixBI.sendError(c,b,a,d);
this._analytics.sendError(c,b,a,d);
this._settings.onError&&this._settings.onError(c,b,a,d)
}return(window.location.hash!="debug")?function(){}:null
};
WixLogger.prototype.reportEvent=function(a,b){b=b||{};
if(this._handleLogObj("reportEvent",a,b)){if(a.biEventId){this._wixBI.sendEvent(a,b)
}this._analytics.sendEvent(a,b);
this._settings.onEvent&&this._settings.onEvent(a,b)
}};
WixLogger.prototype._handleLogObj=function(c,a,d,e){if(!a){return false
}a.callCount=a.callCount||0;
if(a.callLimit&&a.callLimit<=a.callCount){return false
}else{this._checkTime(a,d);
this._logLog(c,a,d,e);
if(a.thresholdTime&&a.time>a.thresholdTime){if(a.thresholdError){var b=settings.errors[a.thresholdError];
this.reportError(b)
}}a.callCount++
}return true
};
WixLogger.prototype._logLog=function(){this._logList.push(arguments)
};
WixLogger.prototype._checkTime=function(a,b){b=b||{};
b.time=this._getTime(a.timerId)
};
WixLogger.prototype._getTime=function(a){a=a||"initTime";
var b=this._initTime;
if(a!="initTime"){b=this._timeData[a]||this._initTime
}this._timeData[a]=new Date().getTime();
return this._timeData[a]-b
};

/* bi */
var WixBILogger=function(b,a,g,d,h,f,c,e,y){this._floggerServerURL=b;
this._common={src:y,did:g,uid:d,gsi:f,cid:c,ver:a,lng:"en-US",evid:0,cat:0,app:e};
this._keyArray={errorKeys:["errc","iss","sev","errscp","trgt","httpc","dsc"],funnelKeys:["c1","i1","g1"]}
};
WixBILogger.prototype.setDocId=function(a){this._common.did=a
};
WixBILogger.prototype.sendError=function(h,e,c,a,i){if(!h){return
}this._common.evid=h.type||10;
var j=this._common.cat=h.category;
//this._common.ts=a.time;
this._common.src=h.src;
var f=i||h.httpResponse||0;
var d=h.errorCode;
var b="";
if(typeof a=="string"){b=a+"\n"+b
}b=h.desc+"\n"+b;
if(j===4&&a){d=a.errorCode;
b=a.errorDescription
}var k=[d,h.issue,h.severity,c,e,f,b];
var g=this._combineArraysToString(this._keyArray.errorKeys,k);
this._createReport("trg?",g,this._common)
};
WixBILogger.prototype.sendEvent=function(b,d){if(!b){return
}var d=d||{};
var a=[d.c1,d.i1,d.g1];
this._common.evid=b.biEventId;
this._common.cat=b.category;
//this._common.ts=d.time;
var c=this._combineArraysToString(this._keyArray.funnelKeys,a);
var y = b.src ? b.src +"?" : "mee?";
this._createReport(y,c,this._common)
};
WixBILogger.prototype._createReport=function(c,d,b){var a=this._objToString(b);
this._createHit(this._floggerServerURL+c+a+d)
};
WixBILogger.prototype._createHit=function(a){
    if(window.location.hash!=="debug"){new Image(0,0).src=a}
};
WixBILogger.prototype._combineArraysToString=function(b,e){var d="";
for(var a=0;
a<b.length;
a++){var c=(!e[a]&&e[a]!==0)?"":e[a];
d=d+b[a]+"="+c+"&"
}return d
};
WixBILogger.prototype._objToString=function(b){var d="";
for(var a in b){var c=(!b[a]&&b[a]!==0)?"":b[a];
d=d+a+"="+c+"&"
}return d
};

/* analytics */
var WixGoogleAnalytics=function(a,g,b,e,f){this._accountList=a;
this._optionalAccounts=g;
this._version=b;
this._userType=e;
this._userLanguage=f;
if(!window._gaq){var d=document.createElement("script");
d.type="text/javascript";
d.async=true;
d.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";
var c=document.getElementsByTagName("script")[0];
c.parentNode.insertBefore(d,c)
}};
WixGoogleAnalytics.prototype.sendEvent=function(c,f){var b=c.category/*wixLogLegend.getKey("type",c.type)*/;
var e=c.desc;
var a=f.label;
var d=f.value||f.time;
this._sendAnalyticEvent(b,e,a,d)
};
WixGoogleAnalytics.prototype.sendError=function(e,c,a,g){var d=wixLogLegend.getKey("type",e.type);
var f=e.desc;
var b=c+"."+a;
this._sendAnalyticEvent(d,f,b)
};
WixGoogleAnalytics.prototype._sendAnalyticEvent=function(a,b,c,f){a=a||"";
b=b||"";
c=c||"";
f=f||0;
var g=function(k,m,h,i,j,l){window._gaq=window._gaq||[];
window._gaq.push([k+"_setAccount",m]);
window._gaq.push([k+"_setCustomVar",1,"version",this._version,1]);
window._gaq.push([k+"_setCustomVar",2,"language",this._userLanguage,1]);
window._gaq.push([k+"_setCustomVar",3,"userType",this._userType,1]);
window._gaq.push([k+"_trackEvent",h,i,j,l])
};
for(var d=0;
d<this._accountList.length;
++d){var e=(d==0)?"":"t"+d+".";
g(e,this._accountList[d],a,b,c,f)
}};


/*login events*/
var wixLogLegend = (function(){
    var pk= function(){};

    // Set legend categories
    var categories = {};
    categories.type = {'error':10, 'timing':20, 'funnel':30, 'userAction':40},
    categories.category = {'editor':1, 'viewer':2, 'core':3, 'server':4};
    categories.issue = {'defaultVal':0, 'components':1, 'managers':2, 'modal':4, 'timing':5};
    categories.severity = {'recoverable':10, 'warning':20, 'error':30, 'fatal':40};

    // Copy categories to pk
    for(var cat in categories) {
        pk[cat] = categories[cat];
    }

    // return the label of a param according to the value
    pk.getKey = function(category, value) {
        var category = categories[category] || {};
        for(var item in category) {
            if(value == category[item]) {
                return item;
            }
        }
        return '';
    };

    return pk;
})();
