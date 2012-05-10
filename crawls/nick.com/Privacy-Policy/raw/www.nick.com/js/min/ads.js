if(typeof KIDS=="undefined"||!KIDS){var KIDS={}
}KIDS.namespace("ads");
KIDS.ads.adArray;
KIDS.ads.Ad=function(a){try{this.ad=a;
this.getSize=function(){return this.ad.size
};
this.getContentType=function(){if(this.ad.contentType){return this.ad.contentType
}else{return"adj"
}};
this.getActualSize=function(){if(this.ad.actualSize){return this.ad.actualSize
}else{return""
}};
this.getElementID=function(){return this.ad.elementID
};
this.getKeyValues=function(){return this.ad.keyValues
};
this.isRefreshable=function(){return(this.ad.refreshable=="true")?true:false
};
this.getRefreshRate=function(){if(isNaN(this.ad.refreshRate)){return 500
}return new Number(this.ad.refreshRate)
}
}catch(b){}};
KIDS.ads.getAds=function(b){if(KIDS.ads.adArray!=null){return KIDS.ads.adArray
}KIDS.ads.adArray=new Array();
for(var a in KIDS.ads.config.ads){KIDS.ads.adArray.push(new KIDS.ads.Ad(KIDS.ads.config.ads[a]));
KIDS.utils.doLog("Ad: "+KIDS.ads.config.ads[a].size)
}return KIDS.ads.adArray
};
KIDS.ads.getVideoAdFrequency=function(){try{if(KIDS.ads.config.videoAdFrequency){return new Number(KIDS.ads.config.videoAdFrequency)
}else{return 0
}}catch(a){return 0
}};
if(typeof btg=="undefined"){var btg={}
}btg.config={version:"3",defferedAdLoading:false,Omniture:{enabled:true,account:"nickvia",charSet:"",dynamicAccountSelection:"true",dynamicAccountList:"nickviadev=nick-d.mtvi.com,nick-q.mtvi.com",linkInternalFilters:"javascript:,nick.com",videoViewEventDisable:true,enableTimeParting:false,trackInlineStats:true,defaultHier:"hier1",enableVisitorNamespace:"false",enableMtvnVisitorGuid:false,enableMeteorPlugin:false,enableGuidPlugin:true,enableGuidAuxiliaryCall:true,enableFirstPartyCookie:false,tabletAccount:"",timezone:"-5",trackExternalLinks:"true",fluxCommunityId:""},Nielsen:{enabled:false,cid:"us-300231",videoCensusId:"c02"},GoogleAnalytics:{enabled:false,account:"",reportMode:""},QuantCast:{enabled:true,adsEnabled:false,labels:"MTVN Global Digital Network,MTVN Global Digital Proper,Nickelodeon Kids and Family Global Network,Nickelodeon Kids and Family Proper,Nickelodeon Kids and Family Domestic,Nickelodeon Kids and Family Tribes,Kids and Family Viral,Nickelodeon Kids Digital,Kids and Family Gaming,Kids and Family Paid Products,Nick Network,Nick Site",reportMode:""},ComScore:{enabled:true,c2:"6036034"},Meteor:{enabled:false,applicationId:"",multiDomain:false},ChoiceStream:{enabled:false,apiKey:"",profileId:""},DoubleClick:{enabled:true,dartSite:"nick.nol"},International:{enabled:false,dartSite:""},ABTest:{enabled:false},FluxHosted:{enabled:false},Photos:{enabled:false},TestAndTarget:{enabled:false},Demdex:{enabled:true}};
var btg=typeof btg==="object"?btg:{};
btg.config=typeof btg.config==="object"?btg.config:{};
btg.isCoreLoaded=false;
btg.globalvars={VISITOR_NAMESPACE:"mtvn",IS_CODA_ADS_USED:false,USER_AGENT:new function(){if(/MSIE/.test(navigator.userAgent)){this.BROWSER="MSIE"
}else{this.BROWSER="Other"
}},MODULES_URL:"http://btg.mtvnservices.com/aria/mods.html",IS_TOP_ACCESSIBLE:function(){try{return typeof top.location.search!="undefined"&&typeof top.location.search!="unknown"
}catch(c){return false
}}(),PAGE_URL:function(){try{var d="",d=self.location.pathname;
if(d==""){d="/"
}return d
}catch(e){}}(),IS_UNIT_TEST:function(){try{return location.href.toLowerCase().indexOf("/api/jsunittest/tests/")!=-1
}catch(c){return false
}}(),FORCE_AD_WAIT_TIME:{PLAYER_LOADED:10000,PLAYER_FAILED:10000,PLAYER_LOAD_WAIT_TIME:10000},VALID_DCOPT:["ist"],ON_DOCUMENT_READY:function(){window.DOMLOADED=false;
window.onload=function(){if(window.DOMLOADED==false&&btg.config.defferedAdLoading){btg.AdManager.placeAllAds()
}};
document.onreadystatechange=function(){if(document.readyState=="complete"&&btg.config.defferedAdLoading){window.DOMLOADED=true;
btg.AdManager.placeAllAds()
}}
}()};
btg.loadLocalConfig=function(){if(typeof btg.config!="undefined"&&typeof btg.config!="undefined"){btg.Object.copyProperties(btg.config,this.config,true)
}if(typeof MTVN!="undefined"&&typeof MTVN.config!="undefined"&&typeof MTVN.config.btg!="undefined"){btg.Object.copyProperties(MTVN.config.btg,this.config,true)
}if(typeof mtvn!="undefined"&&typeof mtvn.btg!="undefined"&&typeof mtvn.btg.config!="undefined"){if(typeof mtvn.btg.config.ReportSettings!="undefined"){for(r in mtvn.btg.config.ReportSettings){if(!mtvn.btg.config.ReportSettings.hasOwnProperty(r)){continue
}if(typeof mtvn.btg.config.ReportSettings[r]==="object"){btg.Object.copyProperties(mtvn.btg.config.ReportSettings[r],this.config[r],true)
}else{this.config[r]=mtvn.btg.config.ReportSettings[r]
}}}if(typeof mtvn.btg.config.AdSettings!="undefined"){for(a in mtvn.btg.config.AdSettings){if(!mtvn.btg.config.AdSettings.hasOwnProperty(a)){continue
}if(typeof mtvn.btg.config.AdSettings[a]==="object"){btg.Object.copyProperties(mtvn.btg.config.AdSettings[a],this.config[a],true)
}else{this.config[a]=mtvn.btg.config.AdSettings[a]
}}}}if(typeof com!="undefined"&&typeof com.mtvi!="undefined"&&typeof com.mtvi.reporting!="undefined"&&typeof com.mtvi.reporting.Account!="undefined"){if(typeof this.config.Omniture=="undefined"){this.config.Omniture={enabled:true}
}this.config.Omniture.account=com.mtvi.reporting.Account.name;
this.config.Omniture.dynamicAccountSelection=com.mtvi.reporting.Account.dynamic;
this.config.Omniture.dynamicAccountList=com.mtvi.reporting.Account.list;
this.config.Omniture.indexFileName=com.mtvi.reporting.Account.defaultIndexFileName;
this.config.Omniture.linkInternalFilters=com.mtvi.reporting.Account.filters;
if(typeof com.mtvi.reporting.Account.dartSite!="undefined"){this.config.DoubleClick.enabled=true;
this.config.DoubleClick.dartSite=com.mtvi.reporting.Account.dartSite
}}if(typeof com!="undefined"&&typeof com.mtvi!="undefined"&&typeof com.mtvi.config!="undefined"&&typeof com.mtvi.config.SectionSetup!="undefined"){btg.Object.copyProperties(com.mtvi.config.SectionSetup,this.config.Omniture,true)
}};
btg.loadModules=function(){var d=[],e=this.config;
if(typeof e.TestAndTarget!="undefined"&&typeof e.TestAndTarget.enabled!="undefined"&&e.TestAndTarget.enabled){d.push("TestAndTarget")
}if(typeof e.Photos!="undefined"&&typeof e.Photos.enabled!="undefined"&&e.Photos.enabled){d.push("Photos")
}if(typeof e.ABTest!="undefined"&&typeof e.ABTest.enabled!="undefined"&&e.ABTest.enabled){d.push("ABTest")
}if(typeof e.FluxHosted!="undefined"&&typeof e.FluxHosted.enabled!="undefined"&&e.FluxHosted.enabled){d.push("FluxHosted")
}if(typeof e.Meteor!="undefined"&&typeof e.Meteor.enabled!="undefined"&&e.Meteor.enabled){d.push("Meteor")
}d=btg.globalvars.MODULES_URL+"?m="+d.join(",")+"&v="+btg.Controller.getVersion();
btg.DOM.loadScript(d)
};
btg.Controller=new function(){var g=btg.globalvars,l=true,k=true,j=false,h="";
this.init=function(){btg.loadLocalConfig();
btg.loadModules();
g.IS_LIVE_ENV=function(){var u=true;
try{if(btg.String.isDefined(btg.config.Omniture.dynamicAccountList)){var t=btg.config.Omniture.dynamicAccountList,n=t.indexOf("=");
if(n>-1){var t=t.substring(n+1),t=t.split(","),p=self.location.hostname;
if(g.IS_TOP_ACCESSIBLE){p=top.location.hostname
}for(var n=0,b=t.length;
n<b;
n++){if(p.indexOf(t[n])>-1){u=false;
break
}}}}}catch(q){}return u
}();
h=typeof g.PAGE_URL=="string"&&g.PAGE_URL!=""?g.PAGE_URL:location.pathname;
if(h.charAt(h.length-1)=="/"){h+=typeof btg.config.indexFileName=="string"?btg.config.indexFileName:"index"
}btg.config._defaultPageName=h;
btg.ReportingManager.init();
btg.AdManager.init();
if(typeof btg.TestAndTarget!="undefined"){btg.TestAndTarget.init()
}this.init=function(){btg.loadLocalConfig();
return this
};
return this
};
this.gameInit=function(){if(!l&&btg.config){btg.ReportingManager.init();
l=true
}if(!k&&btg.config){btg.AdManager.init();
k=true
}if(!j&&com.mtvnet.games.GameSettings){btg.GameReportingManager.init();
btg.GameAdManager.init();
j=true
}return true
};
this.loadGame=function(c){if(j){btg.GameAdManager.loadGame(c);
btg.GameReportingManager.gameLoad(c)
}};
this.sendPageCall=function(c){this.init();
if(l){if(typeof c=="undefined"||!c){c={}
}btg.ReportingManager.sendPageCall(c);
btg.ReportingManager.getData()
}};
this.sendLinkEvent=function(c){this.init();
if(l){if(typeof c=="undefined"||!c){c={}
}btg.ReportingManager.sendLinkEvent(c)
}};
this.placeAd=function(c){this.init();
if(k){if(btg.config.defferedAdLoading){return btg.AdManager.placeAdTag(c,true)
}else{c=btg.AdManager.placeAd(c);
btg.AdManager.getData();
return c
}}};
this.reloadAds=function(){btg.AdManager.reloadAll();
return this
};
this.placeIFrameAd=function(d,e){this.init();
btg.AdManager.placeIFrameAd(d,e)
};
this.getAdUrl=function(c){this.init();
if(k){return btg.AdManager.getAdUrl(c)
}};
this.getVersion=function(){return btg.config.version
};
this.createMboxes=function(c){if(typeof mboxDefine=="function"&&typeof btg.config.Omniture.enableTestAndTarget=="boolean"&&btg.config.Omniture.enableTestAndTarget&&typeof btg.TestAndTarget!="undefined"){btg.TestAndTarget.createMboxes(c)
}};
this.setChoiceStreamRequest=function(c,e){if(l){btg.ReportingManager.setChoiceStreamRequest(c,e)
}}
};
btg.Beacon=function(c){this.url=c;
this.data=null
};
btg.Beacon.prototype={setData:function(c){this.data=btg.Object.toString(c,"&")
},formatSrc:function(){if(this.data){if(this.url.indexOf("?")>-1){this.url+="&"+this.data
}else{this.url+="?"+this.data
}}return this.url
},send:function(){var c=new Image(1,1);
c.src=this.formatSrc();
c.onload=function(){};
c.onabort=function(){};
c.onerror=function(){}
}};
btg.Alert=function(f,j){if(!f){return
}switch(j){case 1:var h="Warning";
break;
case 2:h="Alert";
break;
default:h="Error"
}this.dependencies=new btg.DependencyManager;
this.dependencies.add("ga_script_load",function(){return typeof _gat=="object"
},100);
this.dependencies.checkDependency("ga_script_load");
if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,function(){new btg.Alert(f,j)
});
return
}var g=_gat._createTracker("UA-18578264-1","coda_alerts_tracker");
g._setDomainName("");
g._trackEvent(location.hostname,location.pathname,h+": "+f)
};
btg.Cookie={read:function(g){for(var g=g+"=",l=document.cookie.split(";"),k=0,j=l.length;
k<j;
k++){for(var h=l[k];
h.charAt(0)==" ";
){h=h.substring(1,h.length)
}if(h.indexOf(g)==0){return unescape(h.substring(g.length,h.length))
}}return null
},set:function(g,l,k,j,h){g=g+"="+escape(l)+"; path=/";
if(k){g+=";expires="+k
}if(!h){h=document.domain.split(".");
h=h.length>2?h[h.length-2]+"."+h[h.length-1]:document.domain
}if(h!="localhost"){g+=";domain="+h
}g+=";path="+(j?j:"/");
document.cookie=g
},remove:function(e,g,f){e=e+"=";
if(!f){f=document.domain.split(".");
f=f.length>2?f[f.length-2]+"."+f[f.length-1]:document.domain
}if(f!="localhost"){e+=";domain="+f
}e+=";path="+(g?g:"/");
e+=";expires=Thu, 01-Jan-1970 00:00:01 GMT";
document.cookie=e
}};
btg.DOM={Events:{addListener:function(e,g,f){if(g=="DOMContentLoaded"&&!e.addEventListener){document.onreadystatechange=function(){if(document.readyState=="complete"){f()
}}
}else{if(e.attachEvent){e.attachEvent("on"+g,f)
}else{if(e.addEventListener){e.addEventListener(g,f,false)
}else{e["on"+g]=f
}}}},removeListener:function(e,g,f){if(e.detachEvent){e.detachEvent("on"+g,f)
}else{if(e.removeEventListener){e.removeEventListener(g,f,false)
}else{e["on"+g]=null
}}}},createIframe:function(j){for(var q=document.createElement("iframe"),p=["id","name","width","height","scrolling","frameBorder","marginHeight","marginWidth","noResize"],o=p.length,n=0;
n<o;
n++){var l=p[n],k=j[l];
if(k){q[l]=k;
q.setAttribute(l,k)
}}return q
},appendIframe:function(d){if(!d.src){return null
}if(!d.parent||d.parent.nodeType!==1){d.parent=document.body
}if(typeof d.style!=="object"){d.style={height:"1px",width:"1px",visibility:"hidden",position:"absolute",bottom:"0",left:"-1000px"}
}var e=this.createIframe(d);
if(typeof d.onload==="function"){e.onload=d.onload
}this.applyStyle(e,d.style);
d.parent.appendChild(e);
e.src=d.src;
return e
},applyStyle:function(e,g){if(!btg.Object.isDefined(g)||!btg.Object.isDefined(e)){return
}var f=btg.Object.toString(g,";",":");
if(btg.globalvars.USER_AGENT.BROWSER=="MSIE"){if(!btg.String.isDefined(e.id)){e.id="coda_iframe_"+(new Date).getTime()
}document.createStyleSheet().addRule("#"+e.id,f)
}else{e.setAttribute("style",f)
}},loadScript:function(g,l,k){if(btg.String.isDefined(g)){try{var j=document.createElement("script");
j.setAttribute("type","text/javascript");
j.setAttribute("src",g);
if(typeof k=="function"){j.onload=j.onreadystatechange=k
}if(l){document.body.appendChild(j)
}else{document.getElementsByTagName("head")[0].appendChild(j)
}}catch(h){}}},loadScriptOnHead:function(e){if(btg.String.isDefined(e)){try{var g=document.createElement("script");
g.setAttribute("type","text/javascript");
g.setAttribute("src",e);
document.getElementsByTagName("head")[0].appendChild(g)
}catch(f){}}},getStyle:function(f,j){var h=null;
try{if(btg.Object.isDefined(f)&&btg.String.isDefined(j)){if(btg.Object.isDefined(document.defaultView)&&typeof document.defaultView.getComputedStyle=="function"){h=document.defaultView.getComputedStyle(f,null)[j]
}else{if(typeof window.getComputedStyle=="function"){h=window.getComputedStyle(f,null)[j]
}else{if(btg.Object.isDefined(f.currentStyle)){h=f.currentStyle[j]
}else{h=f.style[j]
}}}}}catch(g){return h
}return h
}};
btg.Events=new function(){var c=function(){this.callbacks=[];
this.subscribe=function(d){if(typeof d=="function"){this.callbacks[this.callbacks.length]=d
}};
this.remove=function(f){for(var h=0,g=this.callbacks.length;
h<g;
h++){if(this.callbacks[h]==f){delete this.callbacks[h]
}}};
this.fire=function(){for(var f=0,h=this.callbacks.length;
f<h;
f++){try{if(typeof this.callbacks[f]=="function"){this.callbacks[f].apply(this,arguments)
}}catch(g){new btg.Alert('An event callback has failed. "'+g.number+": "+g.message+'".')
}}}
};
this.add=function(b){this[b]=new c;
return this
};
this.CORE_LOADED=new c;
this.flipBookView=new c;
this.adLoaded=new c;
this.Player_Freewheel_failsafe=new c;
this.ABTest_Group_Assigned=new c;
this.ON_GAME_CONFIG_LOADED=new c;
this.ON_GAME_LOAD=new c;
this.ON_GAME_PLAY=new c;
this.ON_GAME_LEVELSTART=new c
};
if(!this.btg.JSON){btg.JSON=function(){function b(b){return b<10?"0"+b:b
}function c(b,f){var g,h,k,j;
g=/["\\\x00-\x1f\x7f-\x9f]/g;
var l;
switch(typeof b){case"string":return g.test(b)?'"'+b.replace(g,function(b){var c=d[b];
if(c){return c
}c=b.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+b+'"';
case"number":return isFinite(b)?String(b):"null";
case"boolean":case"null":return String(b);
case"object":if(!b){return"null"
}if(typeof b.toJSON==="function"){return c(b.toJSON())
}g=[];
if(typeof b.length==="number"&&!b.propertyIsEnumerable("length")){j=b.length;
for(h=0;
h<j;
h+=1){g.push(c(b[h],f)||"null")
}return"["+g.join(",")+"]"
}if(f){j=f.length;
for(h=0;
h<j;
h+=1){k=f[h];
if(typeof k==="string"){if(l=c(b[k],f)){g.push(c(k)+":"+l)
}}}}else{for(k in b){if(typeof k==="string"){if(l=c(b[k],f)){g.push(c(k)+":"+l)
}}}}return"{"+g.join(",")+"}"
}}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+b(this.getUTCMonth()+1)+"-"+b(this.getUTCDate())+"T"+b(this.getUTCHours())+":"+b(this.getUTCMinutes())+":"+b(this.getUTCSeconds())+"Z"
};
var d={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
return{stringify:c,parse:function(b,c){function d(b,e){var h,o;
if(e&&typeof e==="object"){for(h in e){if(Object.prototype.hasOwnProperty.apply(e,[h])){o=d(h,e[h]);
if(o!==undefined){e[h]=o
}}}}return c(b,e)
}var h;
if(/^[\],:{}\s]*$/.test(b.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(:?[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){h=eval("("+b+")");
return typeof c==="function"?d("",h):h
}throw new SyntaxError("parseJSON")
}}
}()
}btg.Math={random:function(){var d,e;
if(arguments.length>1){d=arguments[0];
e=arguments[1]
}else{d=0;
e=arguments[0]
}return Math.floor(Math.random()*(e-d+1)+d)
}};
btg.Object={isDefined:function(c){if(typeof c=="object"&&c!==null){return true
}else{return false
}},toString:function(g,l,k){if(!l){l=","
}if(!k){k="="
}var j=[],h;
for(h in g){if(g.hasOwnProperty(h)){j.push(h+k+g[h])
}}return j.join(l)
},copyProperties:function(f,j,h){if(btg.Object.isDefined(f)&&btg.Object.isDefined(j)){for(var g in f){if(btg.Object.isDefined(j[g])||btg.String.isDefined(j[g])){if(h){j[g]=f[g]
}}else{j[g]=f[g]
}}}},isConfigDefined:function(c){if(typeof c=="object"&&c!==null&&c.enabled==true){return true
}else{return false
}}};
btg.Sections={getAdSections:function(){var d=btg.config,e=self.location.pathname;
if(e==""){e="/"
}if(e.lastIndexOf("/")==e.length-1){e+=btg.Object.isDefined(d)&&btg.String.isDefined(d.defaultIndexFileName)?d.defaultIndexFileName:"index"
}if(e!="/"&&e.indexOf("/")==0){e=e.substring(1)
}return e
},getReportingSections:function(){return self.location.pathname
}};
btg.Session={Variables:{config:[],add:function(f){if(typeof f=="undefined"){return false
}for(var j=0,h=this.config.length;
j<h;
j++){if(typeof this.config[j].varName!="string"){continue
}for(var g=0,h=f.length;
g<h;
g++){if(typeof f[g].varName!="string"){continue
}if(f[g].varName==this.config[j].varName){this.config.splice(j,1)
}}}this.config=this.config.concat(f);
return true
},setData:function(h){var o=btg.String.isDefined;
if(!o(h)){return null
}for(var n=0,l=this.config.length;
n<l;
n++){var k=this.config[n];
if(typeof h[k.varName]!="undefined"){h[k.varName]=this.saveToCookie(k,h[k.varName])
}else{var j=o(k.cookieName)?k.cookieName:"mtvn_btg_"+k.varName,j=btg.Cookie.read(j);
if(o(j)){j=j.replace(/\+/gim,";");
h[k.varName]=j
}}}return h
},saveToCookie:function(w,v){var u=btg.String.isDefined;
if(typeof v=="string"&&typeof w.varName=="string"){var v=v.replace(/\;/gim,"+"),t=w.varName,t=typeof w.cookieName=="string"?w.cookieName:"mtvn_btg_"+t,q=typeof w.neverDie=="boolean"?w.neverDie:0;
if(typeof w.appendOnly=="boolean"||typeof w.appendOnly=="number"?w.appendOnly:0){var p=btg.Cookie.read(t);
if(u(p)){values=v.split(",");
for(var o=0,l=values.length;
o<l;
o++){var n=values[o];
if(!u(n)){continue
}if(p.indexOf(n)>-1){continue
}if(p.length>0){p+=","
}p+=n
}v=p
}}p=(new Date).getYear();
btg.Cookie.set(t,v,q?"Thu, 01-Jan-"+(p+10)+" 23:59:59 GMT":null)
}return u(v)?v.replace(/\+/gim,";"):null
}}};
btg.String={isDefined:function(c){if(typeof c==="undefined"||c===null||c==""){return false
}else{return true
}},random:function(f){for(var j="",f=f?f:8,h=0;
h<f;
h++){var g=Math.floor(Math.random()*"ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".length);
j+="ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".substring(g,g+1)
}return j
},toObject:function(j,q){for(var p=j.split(q?q:","),o={},n=0,l=p.length;
n<l;
n++){var k=p[n].split("=");
o[k[0]]=k[1]
}return o
},queryStringToObject:function(c){c=c.indexOf("?")>-1?c.split("?")[1]:c;
return btg.String.toObject(c,"&")
},stripFileExtension:function(d){var e=d.lastIndexOf(".");
if(e>0){return d.substring(0,e)
}else{return d
}},charLtrim:function(d,e){if(d.indexOf(e)==0){d=d.substring(1)
}return d
},charRtrim:function(f,j){var h=f.lastIndexOf(j),g=f.length;
if(h==g-1){f=f.substring(0,g-1)
}return f
},charTrim:function(d,e){d=btg.String.charLtrim(d,e);
return d=btg.String.charRtrim(d,e)
},isMockupMode:function(){var d=false,e=this.queryStringToObject((btg.globalvars.IS_TOP_ACCESSIBLE?top:self).location.search);
if(e.mockupMode&&e.mockupMode=="true"){d=true
}return d
},mockItUp:function(c){c=c.replace(/[<]/g,"&lt;");
return c=c.replace(/[>]/g,"&gt;")
},getFileName:function(c){c=btg.String.isDefined(c)?c:"";
return c=c.substring(c.lastIndexOf("/")+1)
},getBetween:function(g,l,k){var j="";
if(btg.String.isDefined(g)){if(btg.String.isDefined(l)){var h=g.indexOf(l);
if(h>=0){j=g.substring(h+l.length)
}}if(btg.String.isDefined(k)){g=j.indexOf(k);
if(g>=0){j=j.substring(0,g)
}}}return j
},encode:function(d,e){if(d){d=e?escape(d):encodeURIComponent(d)
}return d
},decode:function(d,e){if(d){d=e?unescape(d):decodeURIComponent(d)
}return d
}};
btg.Error={log:function(d){try{if(typeof console==="object"&&console.log&&btg.String.isDefined(d)){console.log(d)
}}catch(e){}}};
btg.Window={getNodeLinkName:function(g){for(var l=null,k=0,j=g.childNodes.length;
k<j;
k++){var h=g.childNodes[k];
switch(h.nodeType){case 3:l=h.nodeValue;
break;
case 1:if(g.attributes.title&&g.attributes.title.nodeValue!=""){l=g.attributes.title.nodeValue
}else{if(g.attributes.alt&&g.attributes.alt.nodeValue!=""){l=g.attributes.alt.nodeValue
}}}}return l
},debug:function(d){var e=document.getElementById("debug");
if(!e){e=document.createElement("div");
e.setAttribute("id","debug");
document.getElementsByTagName("body")[0].appendChild(e)
}e.innerHTML=e.innerHTML+d+"<br>"
}};
btg.Environment={getPlatform:function(){var d="desktop",e=window.navigator.userAgent.toLowerCase();
if(e.indexOf("ipad")!=-1){d="iPad"
}else{if(e.indexOf("iphone")!=-1){d="iPhone"
}}return d
},getCnamedDomain:function(){var e=location.hostname,g="",f=new RegExp(/([A-z0-9]*\.\bco\...\b|[A-z0-9]*\.uol\.\bcom\...\b|[A-z0-9]*\.\bcom\...\b|[A-z0-9]*\.\bcom\b|[A-z0-9]*\...\b)/);
if(e.match(f)){m=f.exec(e);
g="sc."+e.substr(m.index)
}return g
}};
btg.Class={inheritFrom:function(g,l){function k(){if(arguments.length>0&&typeof g==="function"){g.apply(this,arguments)
}}if(typeof g==="function"||typeof g==="object"){if(typeof l==="function"||typeof l==="object"){var j=l.prototype;
l.prototype=typeof g==="function"?new g:g;
for(var h in j){l.prototype[h]=j[h]
}l.prototype.constructor=l;
k.prototype=typeof l==="function"?new l:l;
k.prototype.constructor=k
}else{k.prototype=typeof g==="function"?new g:g;
k.prototype.constructor=k
}}else{btg.Error.log("Coda ERROR: btg.Class.inheritFrom(a_superClass,a_subClass) requires at least a_superClass argument!")
}return k
}};
btg.Timer=function(d,e){this.id=d;
this.isRunning=false;
this.currentCount=0;
this.milliseconds=e?e:100;
this.intervalId=null;
this.listeners=[]
};
btg.Timer.prototype={on:function(d,e){if(typeof e=="function"){this.listeners[d]=e
}},execListener:function(c){if(typeof this.listeners[c]=="function"){this.listeners[c]()
}},start:function(){if(!this.isRunning){this.isRunning=true;
this.intervalId=setInterval(this.id+".count()",this.milliseconds)
}},count:function(){this.currentCount=this.currentCount+this.milliseconds;
this.execListener("count")
},stop:function(){clearInterval(this.intervalId);
this.isRunning=false
},reset:function(){this.stop();
this.currentCount=0;
this.start()
}};
btg.TimeTracker=function(h){var o=btg.String.isDefined,n=btg.Cookie,l="",k=null,j=o(h)?h:"";
this.init=function(){k=(new Date).getTime();
btg.DOM.Events.addListener(window,"unload",this.saveTimeSpent);
return true
};
this.setData=function(c){if(o(c)){l=c
}};
this.getTimeSpentOnPage=function(){var c="",c=(new Date).getTime(),c=Math.round((c-k)/100);
if(c<1){c=""
}k=(new Date).getTime();
return c
};
this.saveTimeSpent=function(){if(o(j)){var c=(new Date).getTime(),c=Math.round((c-k)/100);
if(c<1){c=1
}c=c;
c+=o(l)?","+l:"";
n.set(j,c)
}};
this.getTimespent=function(){if(o(j)){var c=n.read(j);
n.remove(j);
k=(new Date).getTime();
return o(c)?c:""
}}
};
btg.Ajax=function(e){var g=btg.Object.isDefined(e)?e:{};
g.method=btg.String.isDefined(g.method)?g.method:"GET";
var f;
if(window.XMLHttpRequest){f=new XMLHttpRequest
}else{f=new ActiveXObject("Microsoft.XMLHTTP")
}this.sendRequest=function(){if(!btg.String.isDefined(g.url)){btg.Error.log("Coda ERROR: Ajax request URL not specified!");
return"[ERROR: Ajax request URL not specified!]"
}f.onreadystatechange=function(){if(f.readyState==4){g.responseText=f.responseText;
g.responseXML=f.responseXML;
if(f.status==404){if(typeof g.on404=="function"){g.on404(g)
}}else{if(typeof g.onSuccess=="function"){g.success=true;
g.onSuccess(g)
}}}};
try{f.open(g.method,g.url,true);
f.send();
return true
}catch(c){if(typeof g.onFail=="function"){g.error=c;
g.fail=true;
g.onFail(g)
}return false
}};
if(g.autoSend===true){this.sendRequest()
}};
(function(e){var g=["demdexcall","demdexfwsegment","uuid","usersegment"],f=function(c){var q=c.data,p,o;
if(!JSON){return
}if(q){try{q=JSON.parse(q)
}catch(l){return
}p=q.type;
o=q.value
}if(p&&g.join().indexOf(p)!=-1){switch(p){case g[0]:c={};
q=0;
for(p=o.length;
q<p;
q++){var n=o[q].split("=");
c[n[0]]=n[1]
}btg.Demdex.sendPageCall(c);
break;
case g[1]:o={type:g[1],value:btg.Demdex.getFWSegment()};
if(o.value){c.source.postMessage(JSON.stringify(o),"*")
}break;
case g[2]:o={type:g[2],value:btg.Cookie.read("vmn_uuid")};
if(o.value){c.source.postMessage(JSON.stringify(o),"*")
}break;
case g[3]:o={type:g[3],value:btg.Cookie.read("mtvn_btg_userSegments")};
if(o.value){c.source.postMessage(JSON.stringify(o),"*")
}}}};
if(typeof e.addEventListener!=="undefined"){e.addEventListener("message",f,false)
}else{if(typeof e.attachEvent!=="undefined"){e.attachEvent("onmessage",f)
}}})(window);
btg.DependencyManager=function(h){var o=btg.config,n=h?h:8000,l=false,k=[],j=[];
this.add=function(d,u,g,e){if(typeof d=="undefined"||typeof u=="undefined"){return false
}for(var t=0,q=j.length;
t<q;
t++){if(j[t].flagname==d){return false
}}j[j.length]={flagname:d,callback:u,interval:g?g:100};
if(!l){l=true;
window.setTimeout(this.sendCalls,n)
}if(e){this.checkDependency(d)
}return true
};
this.remove=function(e){if(typeof e=="string"&&e!=""){for(var g=0,f=j.length;
g<f;
g++){if(j[g].flagname==e){j.splice(g,1);
break
}}}if(!this.hasDependency()){this.sendCalls()
}};
this.checkDependency=function(g){for(var u=null,t=0,p=j.length;
t<p;
t++){if(j[t].flagname==g){u=j[t]
}}if(!u){return false
}if(u.callback.apply()){this.remove(g)
}else{var q=this;
window.setTimeout(function(){q.checkDependency(g)
},u.interval)
}};
this.hasDependency=function(e){if(btg.String.isDefined(e)){for(var g=j.length,f=0;
f<g;
f++){if(j[f].flagname==e){return true
}}return false
}return j.length>=1
};
this.addToCallQueue=function(c,t){if(!t){return false
}for(var p=new Array,f=2,q=arguments.length;
f<q;
f++){p.push(arguments[f])
}k[k.length]={context:c?c:this,callback:t,args:p,config:o};
return true
};
this.sendCalls=function(){j=[];
for(var c=o,g=0,f=k.length;
g<f;
g++){o=k[g].config;
k[g].callback.apply(k[g].context,k[g].args)
}o=c;
k=[]
}
};
btg.PluginManager=function(f){for(var j=new Array,h=1,g=arguments.length;
h<g;
h++){j.push(arguments[h])
}h=0;
for(g=f.length;
h<g;
h++){if(typeof f[h].init=="function"){f[h].init.apply(this,j)
}}this.run=function(l){for(var k=0,b=f.length;
k<b;
k++){if(btg.Object.isDefined(f[k])&&typeof f[k].run=="function"){l=f[k].run(l)
}}return l
}
};
btg.QueueManager=function(c){this.id=c.id;
this.timeToWait=!isNaN(c.timeToWait)?c.timeToWait:1;
this.handler=typeof c.handler=="function"?c.handler:function(){};
this.notificationHandler=typeof c.notificationHandler=="function"?c.notificationHandler:function(){};
this.intervalId=null;
this.isProcessing=false;
this.queue=[];
this.processedQueue=[];
this.maxNumItems=c.maxNumItems;
this.maxElapsed=c.maxElapsed;
this.itemsAdded=this.totalItems=this.elapsed=0
};
btg.QueueManager.prototype={init:function(){this.isProcessing=true;
this.processQueue();
this.intervalId=setInterval(this.id+".processQueue()",this.timeToWait)
},addToQueue:function(){this.queue.push(arguments);
this.itemsAdded++;
if(!this.isProcessing){this.init()
}},processQueue:function(){if(this.isProcessing==true){if(this.queue.length>0){var c=this.queue.shift();
this.elapsed=this.elapsed+this.timeToWait;
this.totalItems++;
if(!this.hasLimit()){this.handler(c);
this.processedQueue.push(c)
}else{this.notificationHandler(this);
this.clearQueue();
this.stop()
}}else{this.stop()
}}},stop:function(){clearInterval(this.intervalId);
this.isProcessing=false;
this.itemsAdded=this.totalItems=this.elapsed=0
},hasLimit:function(){return this.elapsed==this.maxElapsed||this.totalItems>this.maxNumItems
},clearQueue:function(){this.queue=[];
this.processedQueue=[]
}};
btg.Demdex=new function(){var f=btg.Cookie,j=new btg.Beacon,h=false,g=btg.String;
this.canSendRequest=true;
this.dependencies=new btg.DependencyManager;
this.data=null;
this.sendIdSyncCall=function(){var c=f.read("vmn_uuid");
if(!f.read("mtvn_dmp_init")&&c){var b=new Date;
j.url="//dpm.demdex.net/ibs:dpid=332&dpuuid="+c;
j.send();
b.setHours(23);
b.setMinutes(59);
f.set("mtvn_dmp_init",1,b)
}};
this.init=function(){this.dependencies.add("demdex_response",function(){return(btg.Demdex?btg.Demdex:{}).canSendRequest
},500,false)
};
this.sendPageCall=function(q,p){if(f.read("vmn_3pc")=="0"){return
}this.dependencies.checkDependency("demdex_response");
if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendPageCall,q,p);
return
}this.canSendRequest=false;
var o="//mtvn.demdex.net/event?",e={d_rtbd:"json",d_dst:1,d_cts:1,d_cb:"btg.Demdex.response"};
if(p&&typeof p==="object"){for(var n in p){if(p.hasOwnProperty(n)){e["d_"+n]=g.encode(g.decode(p[n]))
}}}if(f.read("vmn_host")==null){q.host=location.hostname;
f.set("vmn_host",1)
}if(q&&typeof q==="object"){for(n in q){if(q.hasOwnProperty(n)&&q[n]){var b=n;
if(n.match(/^(prop\d{1,2})$/ig)){b=n.replace("prop","c")
}else{if(n.match(/^(evar\d{1,2})$/ig)){b=n.replace("eVar","v")
}else{if(n.match(/^(hier\d{1,2})$/ig)){b=n.replace("hier","h")
}else{if(n.match(/^(channel)$/ig)){b=n.replace("channel","ch")
}}}}e["c_"+b]=g.encode(g.decode(q[n]))
}}}btg.DOM.loadScript(o+btg.Object.toString(e,"&"))
};
this.sendSocialCall=function(n){if(f.read("vmn_3pc")=="0"){return
}this.dependencies.checkDependency("demdex_response");
if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendSocialCall,n);
return
}this.canSendRequest=false;
var l="//mtvn.demdex.net/event?",e={d_rtbd:"json",d_dst:1,d_cts:1,d_cb:"btg.Demdex.response",c_uuid:f.read("vmn_uuid")};
if(n&&typeof n==="object"){for(var b in n){if(n.hasOwnProperty(b)&&n[b]){e["c_"+b]=g.encode(g.decode(n[b]))
}}}btg.DOM.loadScript(l+btg.Object.toString(e,"&"))
};
this.getFWSegment=function(){var k=this.data,t=btg.String,q=btg.Object,p;
if(q.isDefined(k)&&q.isDefined(k.stuff)){for(var k=k.stuff,o=0,n=k.length;
o<n;
o++){if(q.isDefined(k[o])&&t.isDefined(k[o].cn)&&k[o].cn=="fw"&&t.isDefined(k[o].cv)){p=k[o].cv;
break
}}}return p
};
this.response=function(d){this.data=d;
btg.Demdex.canSendRequest=true;
if(!h){btg.DOM.appendIframe({src:location.protocol+"//fast.mtvn.demdex.net/DSD-gz/mtvn-dest.html?targus=1&targusvalidttl=14400&bizo=1&bizovalidttl=14400&nexac=1&nexacvalidttl=14400"});
h=true
}btg.MediaPlayer.setDemdexFWSegment(d);
a:{if(!btg.Demdex.data){break a
}if(!btg.Demdex.data.dests){break a
}for(var d=btg.Demdex.data.dests,l=0;
l<d.length;
l++){var k=document.createElement("img");
k.src=d[l].c;
document.body.appendChild(k)
}}}
};
btg.GUID=new function(){var h=null,o=null,n=function(){var c=btg.Cookie.read("vmn_uuid");
if(typeof c=="string"){o=c
}return typeof o=="string"
},l=function(){return typeof h.enableGuidPlugin=="boolean"&&h.enableGuidPlugin
};
this.isGUIDReported=false;
this.hasGUIDCookie=function(){return n()
};
this.get3pcCookie=function(){var c=btg.Cookie.read("vmn_3pc");
return !btg.String.isDefined(c)?null:c
};
this.init=function(b){h=b;
if(!l()){return false
}if(typeof h.guidIdVarMap=="undefined"){h.guidIdVarMap=["eVar57"]
}if(typeof h.guidIdVarMap=="string"){h.guidIdVarMap=h.guidIdVarMap.split(",")
}return true
};
this.run=function(d){if(!l()){return d
}if(!n()){new btg.Alert("Failed to find the UUID value.");
return d
}for(var c=0,b=h.guidIdVarMap.length;
c<b;
c++){d[h.guidIdVarMap[c]]=o
}this.isGUIDReported=true;
return d
};
this.guidScript=function(){var c=btg.GUID;
btg.Controller.init();
if(c.hasGUIDCookie()&&!c.isGUIDReported){c.sendLinkEventCall();
return c.isGUIDReported=true
}return false
};
this.sendLinkEventCall=function(){var c={linkName:"GUID reporting",linkType:"o"},c=btg.GUID.run(c);
if(l){btg.Controller.sendLinkEvent(c)
}};
try{var k="http"+("https:"==document.location.protocol?"s":"")+"://btg.mtvnservices.com/aria/uuid.html";
if(!this.get3pcCookie()){btg.DOM.loadScript(k)
}}catch(j){}};
try{btg.DOM.Events.addListener(window,"load",function(){var d=btg.config,e=btg.Object.isConfigDefined;
if(e(d.Omniture)){if(d.Omniture.enableGuidPlugin&&d.Omniture.enableGuidAuxiliaryCall&&!btg.GUID.isGUIDReported){d=new btg.DependencyManager;
d.add("vmn_uuid",btg.GUID.guidScript);
d.checkDependency("vmn_uuid")
}}})
}catch(e$$13){}btg.ComScore=function(c){this.btgIsStr=btg.String.isDefined;
this.config=c;
this.c1=this.btgIsStr(this.config.c1)?this.config.c1:"2";
this.c2=this.btgIsStr(this.config.c2)?this.config.c2:"6036034";
this.c3=this.btgIsStr(this.config.c3)?this.config.c3:"";
this.c4=this.btgIsStr(this.config.c4)?this.config.c4:escape(document.location.href);
this.c5=this.btgIsStr(this.config.c5)?this.config.c5:"20000";
this.c6=this.btgIsStr(this.config.c6)?this.config.c6:"";
this.c15=this.btgIsStr(this.config.c15)?this.config.c15:"";
this.sendPageCall()
};
btg.ComScore.prototype={sendPageCall:function(e){var g=btg.ReportingManager;
if(typeof e==="object"){if(this.btgIsStr(e.comScore1)){this.c1=e.comScore1
}if(this.btgIsStr(e.comScore2)){this.c2=e.comScore2
}if(this.btgIsStr(e.comScore3)){this.c3=e.comScore3
}if(this.btgIsStr(e.comScore4)){this.c4=e.comScore4
}if(this.btgIsStr(e.comScore5)){this.c5=e.comScore5
}if(this.btgIsStr(e.comScore6)){this.c6=e.comScore6
}if(this.btgIsStr(e.comScore15)){this.c15=e.comScore15
}}e=["c1=",this.c1,"&c2=",this.c2,"&c3=",this.c3,"&c4=",this.c4,"&c5=",this.c5,"&c6=",this.c6,"&c15=",this.c15].join("");
try{if(!btg.globalvars.IS_UNIT_TEST&&!g.isScriptIncluded.comscore){btg.DOM.loadScript((document.location.protocol=="https:"?"https://sb":"http://b")+".scorecardresearch.com/beacon.js?"+e);
g.isScriptIncluded.comscore=true
}}catch(f){}}};
btg.GoogleAnalytics=function(c){this.btgIsStr=btg.String.isDefined;
this.config=c;
if(c.iframeAccount&&!btg.globalvars.IS_UNIT_TEST){document.write(unescape("%3Cdiv id='btg_ga_div'%3E%3C/div%3E"))
}this.account=c.account;
this.dependencies=new btg.DependencyManager;
this.dependencies.add("ga_script_load",function(){return typeof _gat=="object"
},100);
this.dependencies.checkDependency("ga_script_load")
};
btg.GoogleAnalytics.prototype={sendPageCall:function(A){if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendPageCall,A);
return
}if(this.btgIsStr(this.config.iframeAccount)){var z=[];
if(this.config.iframeAccount.indexOf(",")>-1){z=this.config.iframeAccount.split(",")
}else{z[0]=this.config.iframeAccount
}for(var y=0,x=z.length;
y<x;
y++){var w=document.getElementById("btg_ga_div"),v=window.location,u=A.pageName,u=u.substring(0,1)!="/"?"/"+u:u,q=document.referrer,t="//btg.mtvnservices.com/aria/ga.html?ga="+z[y]+"&uri=",q="&ref="+escape(q);
if(w){var p=document.createElement("iframe");
p.src=v.protocol+t+v.hostname+u+q;
p.style.width=1+"px";
p.style.height=1+"px";
p.style.visibility="hidden";
p.style.left=-50+"px";
p.style.top=-50+"px";
p.style.position="absolute";
w.appendChild(p)
}}}if(this.btgIsStr(this.config.account)){try{if(!btg.globalvars.IS_UNIT_TEST){if(typeof _gat=="object"){_gat._getTracker(this.config.account)._trackPageview()
}}}catch(n){}}},sendLinkEvent:function(d){if(!d||!this.btgIsStr(d.category)||!this.btgIsStr(d.action)||!this.btgIsStr(d.label)){return
}if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendLinkEvent,d);
return
}d.value=typeof d.value!="undefined"&&typeof parseInt(d.value)=="number"?parseInt(d.value):null;
var e=_gat._createTracker(this.config.account,"event_tracker");
e._setDomainName("");
e._trackEvent(d.category,d.action,d.label,d.value)
}};
try{if(!btg.globalvars.IS_UNIT_TEST){var ga=document.createElement("script");
ga.type="text/javascript";
ga.async=true;
ga.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";
var s=document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(ga,s)
}}catch(e$$16){}btg.Nielsen=function(c){this.config=c;
this.dependencies=new btg.DependencyManager;
this.dependencies.add("nielsen_uuid_present",function(){return btg.Cookie.read("vmn_uuid")!=""?true:false
},100);
this.dependencies.checkDependency("nielsen_uuid_present");
this.sendIdSyncCall()
};
btg.Nielsen.prototype={sendPageCall:function(){var d=null;
if(!d&&btg.String.isDefined(this.config.cid)){d=this.config.cid
}if(!d){return false
}var e=new Image(1,1);
e.onerror=e.onload=function(){e.onerror=e.onload=null
};
e.src=["//secure-us.imrworldwide.com/cgi-bin/m?ci="+d+"&cg=0&cc=1&si=",escape(window.location.href),"&rp=",escape(document.referrer),"&ts=compact&rnd=",(new Date).getTime()].join("")
},sendIdSyncCall:function(e){if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendIdSyncCall,e);
return
}e=btg.Cookie.read("vmn_uuid");
if(e==null){return
}if(btg.Cookie.read("vmn_nielsen_idsynch")==null){var g=new Image(1,1);
g.onerror=g.onload=function(){g.onerror=g.onload=null
};
var f=escape(window.location.href);
g.src=["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-mtvn&cg="+e+"&cc=1&si=",f,"&rp=",escape(document.referrer),"&ts=compact&rnd=",(new Date).getTime()].join("");
btg.Cookie.set("vmn_nielsen_idsynch","true")
}}};
btg.Omniture=function(d){this.pageViewEventSet=false;
this.btgIsStr=btg.String.isDefined;
this.btgSv=btg.Session.Variables;
this.name="Omniture";
this.values=[];
this.newRepeatProp=this.btgIsStr(d.newRepeatProp)?d.newRepeatProp:"prop41";
this.config=d;
this.hcode=btg.Hcode;
this.userPlatform=btg.Environment.getPlatform();
this.hcode.setAccount(this.config.account);
if(this.userPlatform=="desktop"){if(this.config.enableFirstPartyCookie){this.hcode.trackingServer=btg.Environment.getCnamedDomain()
}}else{this.hcode.trackingServer=btg.Environment.getCnamedDomain();
if(this.btgIsStr(this.config.tabletAccount)){this.hcode.setAccount(this.config.tabletAccount)
}}for(var e in this.config){this.hcode[e]=this.config[e]
}this.url="http"+(this.hcode.ssl?"s":"")+"://"+this.hcode.un+".112.2o7.net/b/ss/"+this.hcode.un+"/1/";
this.dependencies=new btg.DependencyManager;
this.plugins=new btg.PluginManager([btg.GUID],this.config,this.dependencies);
if(typeof btg.config.Omniture.enableVisitorNamespace=="boolean"&&btg.config.Omniture.enableVisitorNamespace){this.setAttribute("visitorNamespace",btg.globalvars.VISITOR_NAMESPACE)
}if(typeof this.config.userSegmentVarMap=="undefined"){this.config.userSegmentVarMap={traffic:"prop31",commerce:"products"};
btg.config.Omniture.userSegmentVarMap=this.config.userSegmentVarMap
}if(typeof btg.UserSegment!="undefined"){btg.UserSegment.init(this)
}if(typeof btg.FluxState!="undefined"){btg.FluxState.init(this.config.fluxCommunityId)
}if(typeof this.config.fluxVarMap=="undefined"){this.config.fluxVarMap={memberState:"prop5",loginState:"prop6"};
btg.config.Omniture.fluxVarMap=this.config.fluxVarMap
}if(typeof this.config.timePartingVarMap=="undefined"){this.config.timePartingVarMap={trafficDay:"prop33",trafficHour:"prop34",commerceDay:"eVar45",commerceHour:"eVar46"}
}if(typeof this.config.photosVarMap=="undefined"){this.config.photosVarMap={application:["prop48","eVar31"],gallery:"eVar16",photoId:"eVar17",flipbookView:"event57",photoView:"event58",adView:"event59",timeSpent:"event60"}
}if(typeof this.config.pageViewEvent!="string"){this.config.pageViewEvent="event16"
}if(typeof btg.MediaPlayer!="undefined"){btg.MediaPlayer.init(this)
}};
btg.Omniture.prototype={setAttribute:function(d,e){if(this.btgIsStr(d)){this.hcode[d]=this.btgIsStr(e)?e:"";
return true
}else{return false
}},getAttribute:function(c){return this.hcode[c]
},setValues:function(d){for(var e in d){this.setAttribute(e,d[e]);
this.values.push(e)
}return true
},clearValues:function(){for(var d=0,e=this.values.length;
d<e;
d++){if(this.values[d]!="pageName"){this.setAttribute(this.values[d],"")
}}this.clearNewRepeat();
this.values=this.getPageName()?["pageName"]:[];
return true
},setNewRepeat:function(){this.setAttribute(this.newRepeatProp,this.hcode.getNewRepeat());
return true
},clearNewRepeat:function(){this.setAttribute(this.newRepeatProp,"");
return true
},getValOnce:function(e,g,f){return this.hcode.getValOnce(e,g,f)
},getNewRepeat:function(){return this.hcode.getNewRepeat()
},getPageName:function(){return this.getAttribute("pageName")
},preprocessData:function(d){d=this.plugins.run(d);
if(this.btgIsStr(d.account)){this.hcode.setAccount(d.account)
}else{this.hcode.setAccount(this.config.account)
}if(typeof mboxDefine=="function"&&typeof this.config.enableTestAndTarget=="boolean"&&this.config.enableTestAndTarget){d.tnt=this.hcode.trackTNT();
if(d.tnt==""){d.tnt=btg.TestAndTarget.getCampaignId()
}}if(typeof btg.UserSegment!="undefined"){d=btg.UserSegment.setData(this,d)
}if(typeof btg.Session!="undefined"){d=this.btgSv.setData(d)
}var e=btg.Cookie.read;
if(e("vmn_3pc")&&e("vmn_3pc")=="0"){d.eVar58="3PB"
}return d
},sendPageCall:function(f){if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendPageCall,f);
return
}f=typeof f!="object"?{}:f;
if(typeof f.pageName!="string"||f.pageName==""){f.pageName=typeof this.hcode.pageName==="string"&&this.hcode.pageName!=""?this.hcode.pageName:btg.config._defaultPageName
}if(typeof this.config.noPagenameSlash!="undefined"&&this.config.noPagenameSlash&&f.pageName.charAt(0)=="/"){f.pageName=f.pageName.substring(1)
}if(typeof this.config.defaultHier=="string"&&this.config.defaultHier!=""){if(typeof f[this.config.defaultHier]!=="string"||f[this.config.defaultHier]==""){if(typeof this.hcode[this.config.defaultHier]==="string"&&this.hcode[this.config.defaultHier]!=""){var j=this.hcode[this.config.defaultHier]
}else{if(typeof f.docHierarchy==="string"&&f.docHierarchy!=""){j=f.docHierarchy
}else{j=f.pageName
}}if(j.charAt(j.length-1)=="/"){if(typeof btg.config.indexFileName==="string"){f[this.config.defaultHier]=j+btg.config.indexFileName
}else{f[this.config.defaultHier]=j+"index"
}}else{f[this.config.defaultHier]=j
}f[this.config.defaultHier]=btg.String.charLtrim(f[this.config.defaultHier],"/")
}}if(typeof f.channel!="string"||f.channel==""){if(typeof this.hcode.channel=="string"){f.channel=this.hcode.channel
}else{if(f.pageName=="/"){f.channel=f.pageName
}else{for(var j=f.pageName.split("/"),h=0,g=j.length;
h<g;
h++){if(j[h]!=""){f.channel=j[h];
break
}}}}}if(typeof f.channel=="string"){f.eVar49=f.channel
}if(typeof btg.SEO!="undefined"){f=btg.SEO.setData(this,f)
}if(typeof btg.BrowserToolbar!="undefined"){f=btg.BrowserToolbar.setData(this,f)
}if((typeof this.config.isFluxHosted=="undefined"||typeof this.config.isFluxHosted!="undefined"&&this.config.isFluxHosted!=true)&&typeof btg.FluxState!="undefined"){f=btg.FluxState.setData(this,f)
}if(typeof btg.Search!="undefined"){f=btg.Search.setData(f)
}if(typeof btg.Search!="undefined"){f=btg.Search.chkConversions(f)
}if(typeof btg.Photos!="undefined"){f=btg.Photos.setData(f)
}if(typeof this.config.enableTimeParting!="undefined"&&this.config.enableTimeParting==true&&typeof this.config.timePartingVarMap!="undefined"){j=typeof btg.config.Omniture.timezone!="undefined"?btg.config.Omniture.timezone:"-5";
f[this.config.timePartingVarMap.commerceHour]=f[this.config.timePartingVarMap.trafficHour]=this.hcode.getTimeParting("h",j);
f[this.config.timePartingVarMap.commerceDay]=f[this.config.timePartingVarMap.trafficDay]=this.hcode.getTimeParting("d",j)
}if(typeof this.config.percentPageViewedVarMap!="undefined"){if(typeof this.config.percentPageViewedVarMap.previousPage!="undefined"){f[this.config.percentPageViewedVarMap.previousPage]=this.hcode.getPreviousValue(f.pageName,"s_pn")
}if(typeof this.config.percentPageViewedVarMap.percentage!="undefined"){if(this.config.percentPageViewedVarMap.percentage.indexOf("event")>=0){if(typeof f.events=="string"&&f.events!=""){f.events+=","
}else{f.events=""
}f.events+=this.config.percentPageViewedVarMap.percentage;
if(typeof f.products=="string"&&f.products!=""){f.products+=","
}else{f.products=""
}f.products+=";;;;"+this.config.percentPageViewedVarMap.percentage+"="+this.hcode.getPercentPageViewed()
}else{f[this.config.percentPageViewedVarMap.percentage]=this.hcode.getPercentPageViewed()
}}}if(!this.pageViewEventSet){j=typeof f.events==="string"?f.events:"";
if(typeof this.config.pageViewEvent==="string"&&j.indexOf(this.config.pageViewEvent)<0){if(j!=""){j+=","
}j+=this.config.pageViewEvent;
f.events=j;
this.pageViewEventSet=true
}}if(typeof btg.GameReporter!="undefined"){btg.GameReporter.gtsEvent="event74";
f=btg.GameReporter.setData(f)
}f=this.preprocessData(f);
this.setValues(f);
this.setNewRepeat();
this.attachLoggedEvent();
if(btg.Object.isConfigDefined(btg.config.Demdex)&&btg.Demdex){f[this.newRepeatProp]=this.getAttribute(this.newRepeatProp);
btg.Demdex.sendPageCall(f)
}this.hcode.t();
this.clearValues();
return true
},sendLinkEvent:function(e){this.hcode.trackExternalLinks=false;
if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.sendPageCall,e);
return
}var e=typeof e!="object"?{}:e,g=this.getPageName();
e.lnk=e.lnk?this.hcode.co(e.lnk):true;
e.linkType=e.linkType?e.linkType:"o";
e.referrer=location.href;
e=this.preprocessData(e);
this.setValues(e);
this.setAttribute("pageName","");
this.attachLoggedEvent();
this.hcode.t();
this.clearValues();
this.setAttribute("pageName",g);
if(btg.config.Omniture.trackExternalLinks===true){var f=this;
setTimeout(function(){f.hcode.trackExternalLinks=true
},1)
}return true
},setAccountVars:function(d){this.setAttribute("un",d.name);
this.setAttribute("dynamicAccountSelection",d.dynamic);
this.setAttribute("dynamicAccountList",d.list);
this.setAttribute("linkInternalFilters",d.filters);
this.setAttribute("charSet",d.chartset);
for(var e in d){if(this.btgIsStr(e)){this.setAttribute(e,this.btgIsStr(d[e])?d[e]:"")
}}},logEvent:function(d){var e=btg.Cookie.set;
if(this.btgIsStr(d)){if(this.btgIsStr(d.UIEvent)){e("UIEvent",d.UIEvent)
}if(this.btgIsStr(d.UIEventName)){e("UIEventName",d.UIEventName)
}if(this.btgIsStr(d.UITrackingCode)){e("UITrackingCode",d.UITrackingCode)
}}},attachLoggedEvent:function(){var d=btg.Cookie.read,e=btg.Cookie.remove;
if(this.btgIsStr(d("UIEvent"))){this.setAttribute("events",d("UIEvent"));
e("UIEvent")
}if(this.btgIsStr(d("UIEventName"))){this.setAttribute("eVar40",d("UIEventName"));
e("UIEventName")
}if(this.btgIsStr(d("UITrackingCode"))){this.setAttribute("campaign",d("UITrackingCode"));
e("UITrackingCode")
}return true
},clearAllVars:function(){for(var c=1;
c<=50;
c++){this.setAttribute("eVar"+c,"");
this.setAttribute("prop"+c,"");
if(c<6){this.setAttribute("hier"+c,"")
}}this.setAttribute("pageName","");
this.setAttribute("channel","");
return true
}};
btg.ReportingManager=new function(){var w=false,v=false,u=false,t=false,q,p,o,l,n;
this.isScriptIncluded={comscore:false,quantcast:false,googleAnalytics:false};
this.init=function(){p=btg.config;
var b=btg.Object.isConfigDefined;
if(b(p.Omniture)&&btg.Omniture){o=new btg.Omniture(p.Omniture);
w=true
}new btg.Nielsen(p.Nielsen);
if(b(p.GoogleAnalytics)&&btg.GoogleAnalytics){n=new btg.GoogleAnalytics(p.GoogleAnalytics);
u=true
}if(b(p.QuantCast)&&btg.QuantCast){l=new btg.QuantCast(p.QuantCast);
v=true
}if(b(p.ComScore)&&btg.ComScore){new btg.ComScore(p.ComScore)
}if(p.ChoiceStream&&p.ChoiceStream.enabled&&btg.ChoiceStream){choicestream=new btg.ChoiceStream(p.ChoiceStream);
t=true
}if(b(p.ChoiceStream)&&btg.ChoiceStream){choicestream=new btg.ChoiceStream(p.ChoiceStream);
t=true
}if(b(p.Demdex)&&btg.Demdex){btg.Demdex.init();
btg.Demdex.sendIdSyncCall();
hasDemdex=true
}};
this.sendPageCall=function(b){if(w){o.sendPageCall(typeof b.omniture=="object"&&b.omniture!=null?b.omniture:b);
q=o.getPageName()
}if(v){l.sendPageCall(typeof b.quantCast=="object"&&b.quantCast!=null?b.quantCast:b)
}if(u){n.sendPageCall(typeof b.googleAnalytics=="object"&&b.googleAnalytics!=null?b.googleAnalytics:b)
}};
this.sendLinkEvent=function(b){if(w){o.sendLinkEvent(typeof b.omniture=="object"&&b.omniture!=null?b.omniture:b)
}if(u&&btg.Object.isDefined(b.googleAnalytics)){n.sendLinkEvent(b.googleAnalytics)
}};
this.getData=function(){btg.Controller.init();
return{pageName:q}
};
this.getOmniture=function(){return w?o:null
};
this.setChoiceStreamRequest=function(d,e){if(t){choicestream.setChoiceStreamRequest(d,e)
}}
};
btg.FluxState=new function(){var c=function(){if(typeof Flux!="object"||Flux==null){return null
}else{if(typeof Flux.context=="object"&&Flux.context!=null&&typeof Flux.context.user=="object"&&Flux.context.user!=null){return 3
}else{if(typeof Flux.Context=="object"&&Flux.Context!=null){return 2
}}}return null
};
this.init=function(d){if(d){btg.DOM.loadScript((document.location.protocol=="https:"?"https://":"http://")+"widgets3.flux.com/context/short/"+d)
}};
this.setData=function(l,k){var j=l.config.fluxVarMap.memberState;
var h=null;
switch(c()){case 3:h=Flux.context.user.communityMember;
break;
case 2:h=Flux.Context.isCommunityMember()
}k[j]=h?"member":"non-member";
j=l.config.fluxVarMap.loginState;
var h=btg.UserSegment,b=null;
switch(c()){case 3:if(Flux.context.user.memberType){b=Flux.context.user.memberType;
h.add(l,b+" User")
}else{if(Flux.context.user.facebookOnly){b="FB Only";
h.add(l,"FB Connect Only User")
}else{if(Flux.context.user.facebookConnected){b="Flux + FB";
h.add(l,"Flux & FB Connect User")
}else{if(typeof Flux.context.user.ucid=="string"&&Flux.context.user.ucid.length>0){b="Flux Only";
h.add(l,"Flux Only User")
}else{b="not logged-in"
}}}}break;
case 2:b=Flux.Context.isUserAuthenticated()?"logged-in":"not logged-in";
break;
default:b="not logged-in"
}if(b&&b!="not logged-in"){h.add(l,"LoggedIn")
}k[j]=b;
return k
}
};
btg.SEO=new function(){this.setData=function(g,l){for(var k=[["google.com","GoogleUser"],["msn.com","MSNUser"],["yahoo.com","YahooUser"]],j=0,h=k.length;
j<h;
j++){if(document.referrer.indexOf(k[j][0])>-1){if(typeof btg.UserSegment!="undefined"){btg.UserSegment.set(k[j][1])
}}}return l
}
};
btg.Search=new function(){var f=btg.Cookie,j=f.set,h="",g=function(c){if(h.indexOf(c)<0){if(h!=""){h+=","
}h+=c
}return h
};
this.init=function(){};
this.setData=function(d){if(typeof com_mtvi_SSDC!="object"){return d
}var n="events,prop31";
g("event36");
d.eVar3=typeof com_mtvi_SSDC.srchtype=="string"?com_mtvi_SSDC.srchtype:"GENERAL";
if(typeof com_mtvi_SSDC.srchsyn!="undefined"){g("event33");
if(typeof com_mtvi_SSDC.srchsyn=="object"){for(var l=0,e=com_mtvi_SSDC.srchsyn.length;
l<e;
l++){com_mtvi_SSDC.srchsyn[l]=com_mtvi_SSDC.srchsyn[l].replace(/\,/,"")
}com_mtvi_SSDC.srchsyn=com_mtvi_SSDC.srchsyn.join(",")
}d.eVar36=com_mtvi_SSDC.srchsyn;
n+=",eVar36"
}if(typeof com_mtvi_SSDC.srchterm=="string"){g("event38");
d.eVar2=com_mtvi_SSDC.srchterm;
n+=",eVar2"
}else{if(typeof com_mtvi_SSDC.srchfail=="string"){g("event37");
d.eVar4=typeof com_mtvi_SSDC.appfailure=="boolean"&&com_mtvi_SSDC.appfailure?"APP_FAILURE":com_mtvi_SSDC.srchfail;
n+=",eVar4"
}}btg.UserSegment.set("SiteSearcher");
d.linkTrackVars=n;
d.linkTrackEvents=h;
return d
};
this.sendLinkEvent=function(){if(!com_mtvi_SSDC){return false
}var c={linkName:"SITE_SEARCH_RESULTS",linkType:"o"},c=this.setData(c);
btg.Controller.sendLinkEvent(c);
return true
};
this.chkConversions=function(e){var d=f.read,b=f.remove;
if(typeof e.events=="string"){h=e.events
}if(d("mtvn_btg_SSDC_conv")){g("event35");
b("mtvn_btg_SSDC_conv")
}if(d("mtvn_btg_SSDC_syn_conv")){g("event34");
b("mtvn_btg_SSDC_syn_conv")
}if(d("mtvn_btg_SSDC_typeahead_conv")){g("event39");
b("mtvn_btg_SSDC_typeahead_conv")
}e.events=h;
return e
};
this.setConversion=function(){j("mtvn_btg_SSDC_conv",1)
};
this.setSynConversion=function(){j("mtvn_btg_SSDC_syn_conv",1)
};
this.setTypeAheadConversion=function(){j("mtvn_btg_SSDC_typeahead_conv",1)
}
};
btg.UserSegment=new function(){var c=btg.Cookie;
this.init=function(e){var b=c.read("mtvn_btg_userSegments");
e.userSegments=b?b.split(","):[];
return true
};
this.set=function(j,h){if(!h){h=btg.ReportingManager.getOmniture()
}for(var g=0,b=h.userSegments.length;
g<b;
g++){if(h.userSegments[g]==j){return false
}}h.userSegments[h.userSegments.length]=j;
c.set("mtvn_btg_userSegments",h.userSegments.join(","));
return true
};
this.add=function(e,f){this.set(f,e);
return true
};
this.getSegments=function(d){return d.userSegments
};
this.getStr=function(f,h,g){if(!h){h=""
}if(!g){g=""
}return typeof f.userSegments=="object"&&f.userSegments.length>0?h+f.userSegments.join(g+","+h)+g:""
};
this.setData=function(e,f){f[e.config.userSegmentVarMap.traffic]=f[e.config.userSegmentVarMap.traffic]?f[e.config.userSegmentVarMap.traffic]+(this.getStr(e)!=""?",":"")+this.getStr(e):this.getStr(e);
f[e.config.userSegmentVarMap.commerce]=f[e.config.userSegmentVarMap.commerce]?f[e.config.userSegmentVarMap.commerce]+(this.getStr(e,"User Segment;")!=""?",":"")+this.getStr(e,"User Segment;"):this.getStr(e,"User Segment;");
return f
}
};
btg.QuantCast=function(c){this.labels="";
this.config=c;
this.labels=this.config.labels
};
btg.QuantCast.prototype={sendPageCall:function(e){if(this.config.reportMode=="direct"){var g=btg.QuantCast.Ads;
if(g.dependencies.hasDependency()){g.dependencies.addToCallQueue(this,this.sendPageCall,e);
return
}try{_qoptions={labels:this.labels};
_qacct="p-94wNw88f65Rhk";
quantserve()
}catch(f){}}}};
btg.QuantCast.Ads=new function(){this.dependencies=new btg.DependencyManager;
this.dependencies.add("qc_script_load",function(){return typeof quantserve=="function"
},100,true);
this.setLabels=function(h,o){try{if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,this.setLabels,h,o);
return
}var n="",l="",k="",l=h.dartSite.replace(/\./g,"_"),k=o.replace(/^\//m,""),k=k.replace(/\//g,"."),n=btg.config.QuantCast.labels+",Viacom Global Digital Network.MTVN Digital Ad Sales.Content.Pages."+l+"."+k;
_qoptions={labels:n};
_qacct="p-94wNw88f65Rhk";
quantserve()
}catch(j){}};
this.setCookieDemoTargetVal=function(f){for(var j=[],h=0,g=f.segments.length;
h<g;
h++){j[h]="demo="+f.segments[h].id
}btg.Cookie.set("qcDemo",escape(j.join(";")))
}
};
try{var _qCfg=btg.config.QuantCast;
if(_qCfg.enabled){btg.DOM.loadScript(("https:"==document.location.protocol?"//secure":"//edge")+".quantserve.com/quant.js")
}if(_qCfg.adsEnabled&&!btg.String.isDefined(btg.Cookie.read("qcDemo"))){btg.DOM.loadScript("//pixel.quantserve.com/api/segments.json?a=p-94wNw88f65Rhk&callback=btg.QuantCast.Ads.setCookieDemoTargetVal")
}}catch(e$$21){}btg.ABTest=function(A,z,y){var x=btg.Cookie;
if(typeof A!=="string"||btg.String.charTrim(A," ")==""){btg.Error.log("Coda ERROR: btg.ABTest: The first argument to the constructor must be a unique ID of the type {String}.");
return null
}if(typeof z!="object"||z.length<2){btg.Error.log('Coda ERROR: btg.ABTest: The second argument to the constructor must be an Array of 2 or more Objects, each with a "name" and a "weight" property.');
return null
}var w=0,v=Math.floor(Math.random()*(100-1+1)+1),u="MTVN_ABTest_"+A,q=x.read(u),t=null;
this.getId=function(){return A
};
this.getGroup=function(){return t
};
if(q&&q!=""){t=q
}else{z.sort(function(d,e){return e.weight-d.weight
});
for(var q=0,p=z.length;
q<p;
q++){var n=w+z[q].weight;
if(v>w&&v<=n){t=z[q].name
}w+=z[q].weight
}if(!t){btg.Error.log("Coda ERROR: btg.ABTest: Couldn't assign user to an A/B Test group.");
return null
}if(w!=100){btg.Error.log("Coda ERROR: btg.ABTest: The sum of the weights of your A/B Test groups must equal 100 exactly.");
return null
}x.set(u,t,"Thu, 31-Dec-2038 11:59:59 GMT")
}btg.UserSegment.set(A+": "+t);
btg.Events.ABTest_Group_Assigned.fire(A,t);
if(typeof y=="function"){y.call(this)
}};
var s_code="",s_objectID;
function s_gi(I,H,G){try{var F="s.version='H.23.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(k)>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.jsLoaded=function(){var s=this,x;if(s.lmq)for(i=0;i<s.lmq.length;i++){x=s.lmq[i];s.loadModule(x.n,x.u,x.d)}if(s.onLoad)s.onLoad(s);if(s.tq)for(i=0;i<s.tq.length;i++)s.t(s.tq[i])};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",E=window,D=E.s_c_il,C=navigator,A=C.userAgent,B=C.appVersion,z=B.indexOf("MSIE "),x=A.indexOf("Netscape6/"),u,K,y,t;
if(I){I=I.toLowerCase();
if(D){for(K=0;
K<D.length;
K++){t=D[K];
y=t._c;
if((!y||y=="s_c"||y=="s_l")&&(t.oun==I||t.fs&&t.sa&&t.fs(t.oun,I))){if(t.sa){t.sa(I)
}if(y=="s_c"){return t
}}else{t=0
}}}}E.s_an="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
E.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
E.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
E.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
E.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
E.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
E.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a");
E.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
F=s_d(F);
if(z>0){u=parseInt(K=B.substring(z+5));
if(u>3){u=parseFloat(K)
}}else{if(x>0){u=parseFloat(A.substring(x+10))
}else{u=parseFloat(B)
}}if(u<5||B.indexOf("Opera")>=0||A.indexOf("Opera")>=0){F=s_ft(F)
}if(!t){t=new Object;
if(!E.s_c_in){E.s_c_il=new Array;
E.s_c_in=0
}t._il=E.s_c_il;
t._in=E.s_c_in;
t._il[t._in]=t;
E.s_c_in++
}t._c="s_c";
(new Function("s","un","pg","ss",F))(t,I,H,G);
return t
}catch(J){}}var mboxCopyright="Copyright 1996-2009. Adobe Systems Incorporated. All rights reserved";
mboxUrlBuilder=function(d,e){this.a=d;
this.b=e;
this.c=new Array;
this.d=function(c){return c
};
this.f=null
};
mboxUrlBuilder.prototype.addParameter=function(f,j){if((new RegExp("('|\")")).exec(f)){throw"Parameter '"+f+"' contains invalid characters"
}for(var h=0;
h<this.c.length;
h++){var g=this.c[h];
if(g.name==f){g.value=j;
return this
}}h=new Object;
h.name=f;
h.value=j;
this.c[this.c.length]=h;
return this
};
mboxUrlBuilder.prototype.addParameters=function(e){if(!e){return this
}for(var g=0;
g<e.length;
g++){var f=e[g].indexOf("=");
if(f==-1||f==0){continue
}this.addParameter(e[g].substring(0,f),e[g].substring(f+1,e[g].length))
}return this
};
mboxUrlBuilder.prototype.setServerType=function(c){this.o=c
};
mboxUrlBuilder.prototype.setBasePath=function(c){this.f=c
};
mboxUrlBuilder.prototype.setUrlProcessAction=function(c){this.d=c
};
mboxUrlBuilder.prototype.buildUrl=function(){for(var f=(document.location.protocol=="file:"?"http:":document.location.protocol)+"//"+this.a+(this.f?this.f:"/m2/"+this.b+"/mbox/"+this.o),j=f.indexOf("?")!=-1?"&":"?",h=0;
h<this.c.length;
h++){var g=this.c[h];
f+=j+encodeURIComponent(g.name)+"="+encodeURIComponent(g.value);
j="&"
}return this.t(this.d(f))
};
mboxUrlBuilder.prototype.getParameters=function(){return this.c
};
mboxUrlBuilder.prototype.setParameters=function(c){this.c=c
};
mboxUrlBuilder.prototype.clone=function(){var d=new mboxUrlBuilder(this.a,this.b);
d.setServerType(this.o);
d.setBasePath(this.f);
d.setUrlProcessAction(this.d);
for(var e=0;
e<this.c.length;
e++){d.addParameter(this.c[e].name,this.c[e].value)
}return d
};
mboxUrlBuilder.prototype.t=function(c){return c.replace(/\"/g,"&quot;").replace(/>/g,"&gt;")
};
mboxStandardFetcher=function(){};
mboxStandardFetcher.prototype.getType=function(){return"standard"
};
mboxStandardFetcher.prototype.fetch=function(c){c.setServerType(this.getType());
document.write('<script src="'+c.buildUrl()+'" language="JavaScript"><\/script>')
};
mboxStandardFetcher.prototype.cancel=function(){};
mboxAjaxFetcher=function(){};
mboxAjaxFetcher.prototype.getType=function(){return"ajax"
};
mboxAjaxFetcher.prototype.fetch=function(c){c.setServerType(this.getType());
c=c.buildUrl();
this.x=document.createElement("script");
this.x.src=c;
document.body.appendChild(this.x)
};
mboxAjaxFetcher.prototype.cancel=function(){};
mboxMap=function(){this.y=new Object;
this.z=new Array
};
mboxMap.prototype.put=function(d,e){if(!this.y[d]){this.z[this.z.length]=d
}this.y[d]=e
};
mboxMap.prototype.get=function(c){return this.y[c]
};
mboxMap.prototype.remove=function(c){this.y[c]=undefined
};
mboxMap.prototype.each=function(f){for(var j=0;
j<this.z.length;
j++){var h=this.z[j],g=this.y[h];
if(g){if(f(h,g)===false){break
}}}};
mboxFactory=function(g,l,k){this.E=false;
this.C=g;
this.D=k;
this.F=new mboxList;
mboxFactories.put(k,this);
this.H=(this.G=typeof document.createElement("div").replaceChild!="undefined"&&true&&typeof document.getElementById!="undefined"&&typeof(window.attachEvent||document.addEventListener||window.addEventListener)!="undefined"&&typeof encodeURIComponent!="undefined")&&mboxGetPageParameter("mboxDisable")==null;
var j=k=="default";
this.J=new mboxCookieManager("mbox"+(j?"":"-"+k),mboxCookiePageDomain());
this.H=this.H&&this.J.isEnabled()&&this.J.getCookie("disable")==null;
if(this.isAdmin()){this.enable()
}this.K=mboxGenerateId();
this.L=mboxScreenHeight();
this.M=mboxScreenWidth();
this.N=mboxBrowserWidth();
this.O=mboxBrowserHeight();
this.P=mboxScreenColorDepth();
this.Q=mboxBrowserTimeOffset();
this.R=new mboxSession(this.K,"mboxSession","session",31*60,this.J);
this.S=new mboxPC("PC",1209600,this.J);
this.w=new mboxUrlBuilder(g,l);
this.T(this.w,j);
this.V=this.U=(new Date).getTime();
var h=this;
this.addOnLoad(function(){h.V=(new Date).getTime()
});
if(this.G){this.addOnLoad(function(){h.E=true;
h.getMboxes().each(function(c){c.setFetcher(new mboxAjaxFetcher);
c.finalize()
})
});
this.limitTraffic(100,10368000);
if(this.H){this.Y();
this.Z=new mboxSignaler(function(d,e){return h.create(d,e)
},this.J)
}}};
mboxFactory.prototype.isEnabled=function(){return this.H
};
mboxFactory.prototype.getDisableReason=function(){return this.J.getCookie("disable")
};
mboxFactory.prototype.isSupported=function(){return this.G
};
mboxFactory.prototype.disable=function(d,e){if(typeof d=="undefined"){d=60*60
}if(typeof e=="undefined"){e="unspecified"
}if(!this.isAdmin()){this.H=false;
this.J.setCookie("disable",e,d)
}};
mboxFactory.prototype.enable=function(){this.H=true;
this.J.deleteCookie("disable")
};
mboxFactory.prototype.isAdmin=function(){return document.location.href.indexOf("mboxEnv")!=-1
};
mboxFactory.prototype.limitTraffic=function(){};
mboxFactory.prototype.addOnLoad=function(c){if(window.addEventListener){window.addEventListener("load",c,false)
}else{if(document.addEventListener){document.addEventListener("load",c,false)
}else{if(document.attachEvent){window.attachEvent("onload",c)
}}}};
mboxFactory.prototype.getEllapsedTime=function(){return this.V-this.U
};
mboxFactory.prototype.getEllapsedTimeUntil=function(c){return c-this.U
};
mboxFactory.prototype.getMboxes=function(){return this.F
};
mboxFactory.prototype.get=function(d,e){return this.F.get(d).getById(e||0)
};
mboxFactory.prototype.update=function(d,e){if(!this.isEnabled()){return
}if(this.F.get(d).length()==0){throw"Mbox "+d+" is not defined"
}this.F.get(d).each(function(c){c.getUrlBuilder().addParameter("mboxPage",mboxGenerateId());
c.load(e)
})
};
mboxFactory.prototype.create=function(j,u,t){if(!this.isSupported()){return null
}var q=this.w.clone();
q.addParameter("mboxCount",this.F.length()+1);
q.addParameters(u);
var u=this.F.get(j).length(),p=this.D+"-"+j+"-"+u;
if(t){t=new mboxLocatorNode(t)
}else{if(this.E){throw"The page has already been loaded, can't write marker"
}t=new mboxLocatorDefault(p)
}try{var o=this,n=new mbox(j,u,q,t,"mboxImported-"+p);
if(this.H){n.setFetcher(this.E?new mboxAjaxFetcher:new mboxStandardFetcher)
}n.setOnError(function(c){n.setMessage(c);
n.activate();
if(!n.isActivated()){o.disable(60*60,c);
window.location.reload(false)
}});
this.F.add(n)
}catch(l){this.disable();
throw'Failed creating mbox "'+j+'", the error was: '+l
}j=new Date;
q.addParameter("mboxTime",j.getTime()-j.getTimezoneOffset()*60000);
return n
};
mboxFactory.prototype.getCookieManager=function(){return this.J
};
mboxFactory.prototype.getPageId=function(){return this.K
};
mboxFactory.prototype.getPCId=function(){return this.S
};
mboxFactory.prototype.getSessionId=function(){return this.R
};
mboxFactory.prototype.getSignaler=function(){return this.Z
};
mboxFactory.prototype.getUrlBuilder=function(){return this.w
};
mboxFactory.prototype.T=function(d,e){d.addParameter("mboxHost",document.location.hostname).addParameter("mboxSession",this.R.getId());
if(!e){d.addParameter("mboxFactoryId",this.D)
}if(this.S.getId()!=null){d.addParameter("mboxPC",this.S.getId())
}d.addParameter("mboxPage",this.K);
d.addParameter("screenHeight",this.L);
d.addParameter("screenWidth",this.M);
d.addParameter("browserWidth",this.N);
d.addParameter("browserHeight",this.O);
d.addParameter("browserTimeOffset",this.Q);
d.addParameter("colorDepth",this.P);
d.setUrlProcessAction(function(f){f+="&mboxURL="+encodeURIComponent(document.location);
var g=encodeURIComponent(document.referrer);
if(f.length+g.length<2000){f+="&mboxReferrer="+g
}f+="&mboxVersion="+mboxVersion;
return f
})
};
mboxFactory.prototype.nb=function(){return""
};
mboxFactory.prototype.Y=function(){document.write("<style>.mboxDefault { visibility:hidden; }</style>")
};
mboxFactory.prototype.isDomLoaded=function(){return this.E
};
mboxSignaler=function(h,o){this.J=o;
for(var n=o.getCookieNames("signal-"),l=0;
l<n.length;
l++){var k=n[l],j=o.getCookie(k).split("&");
h(j[0],j).load();
o.deleteCookie(k)
}};
mboxSignaler.prototype.signal=function(c){this.J.setCookie("signal-"+c,mboxShiftArray(arguments).join("&"),45*60)
};
mboxList=function(){this.F=new Array
};
mboxList.prototype.add=function(c){if(c!=null){this.F[this.F.length]=c
}};
mboxList.prototype.get=function(f){for(var j=new mboxList,h=0;
h<this.F.length;
h++){var g=this.F[h];
if(g.getName()==f){j.add(g)
}}return j
};
mboxList.prototype.getById=function(c){return this.F[c]
};
mboxList.prototype.length=function(){return this.F.length
};
mboxList.prototype.each=function(d){if(typeof d!="function"){throw"Action must be a function, was: "+typeof d
}for(var e=0;
e<this.F.length;
e++){d(this.F[e])
}};
mboxLocatorDefault=function(c){this.g="mboxMarker-"+c;
document.write('<div id="'+this.g+'" style="visibility:hidden;display:none">&nbsp;</div>')
};
mboxLocatorDefault.prototype.locate=function(){for(var c=document.getElementById(this.g);
c!=null;
){if(c.nodeType==1){if(c.className=="mboxDefault"){return c
}}c=c.previousSibling
}return null
};
mboxLocatorDefault.prototype.force=function(){var d=document.createElement("div");
d.className="mboxDefault";
var e=document.getElementById(this.g);
e.parentNode.insertBefore(d,e);
return d
};
mboxLocatorNode=function(c){this.ub=c
};
mboxLocatorNode.prototype.locate=function(){return typeof this.ub=="string"?document.getElementById(this.ub):this.ub
};
mboxLocatorNode.prototype.force=function(){return null
};
mboxCreate=function(d){var e=mboxFactoryDefault.create(d,mboxShiftArray(arguments));
if(e){e.load()
}return e
};
mboxDefine=function(d,e){return mboxFactoryDefault.create(e,mboxShiftArray(mboxShiftArray(arguments)),d)
};
mboxUpdate=function(c){mboxFactoryDefault.update(c,mboxShiftArray(arguments))
};
mbox=function(g,l,k,j,h){this.Ab=null;
this.Bb=0;
this.hb=j;
this.ib=h;
this.Cb=null;
this.Db=new mboxOfferContent;
this.vb=null;
this.w=k;
this.message="";
this.Eb=new Object;
this.Fb=0;
this.yb=l;
this.g=g;
this.Gb();
k.addParameter("mbox",g).addParameter("mboxId",l);
this.Hb=function(){};
this.Ib=function(){};
this.Jb=null
};
mbox.prototype.getId=function(){return this.yb
};
mbox.prototype.Gb=function(){if(this.g.length>250){throw"Mbox Name "+this.g+" exceeds max length of 250 characters."
}else{if(this.g.match(/^\s+|\s+$/g)){throw"Mbox Name "+this.g+" has leading/trailing whitespace(s)."
}}};
mbox.prototype.getName=function(){return this.g
};
mbox.prototype.getParameters=function(){for(var e=this.w.getParameters(),g=new Array,f=0;
f<e.length;
f++){if(e[f].name.indexOf("mbox")!=0){g[g.length]=e[f].name+"="+e[f].value
}}return g
};
mbox.prototype.setOnLoad=function(c){this.Ib=c;
return this
};
mbox.prototype.setMessage=function(c){this.message=c;
return this
};
mbox.prototype.setOnError=function(c){this.Hb=c;
return this
};
mbox.prototype.setFetcher=function(c){if(this.Cb){this.Cb.cancel()
}this.Cb=c;
return this
};
mbox.prototype.getFetcher=function(){return this.Cb
};
mbox.prototype.load=function(d){if(this.Cb==null){return this
}this.setEventTime("load.start");
this.cancelTimeout();
this.Bb=0;
this.Cb.fetch(d&&d.length>0?this.w.clone().addParameters(d):this.w);
var e=this;
this.Lb=setTimeout(function(){e.Hb("browser timeout",e.Cb.getType())
},15000);
this.setEventTime("load.end");
return this
};
mbox.prototype.loaded=function(){this.cancelTimeout();
if(!this.activate()){var c=this;
setTimeout(function(){c.loaded()
},100)
}};
mbox.prototype.activate=function(){if(this.Bb){return this.Bb
}this.setEventTime("activate"+ ++this.Fb+".start");
if(this.show()){this.cancelTimeout();
this.Bb=1
}this.setEventTime("activate"+this.Fb+".end");
return this.Bb
};
mbox.prototype.isActivated=function(){return this.Bb
};
mbox.prototype.setOffer=function(c){if(c&&c.show&&c.setOnLoad){this.Db=c
}else{throw"Invalid offer"
}return this
};
mbox.prototype.getOffer=function(){return this.Db
};
mbox.prototype.show=function(){this.setEventTime("show.start");
var c=this.Db.show(this);
this.setEventTime(c==1?"show.end.ok":"show.end");
return c
};
mbox.prototype.showContent=function(c){if(c==null){return 0
}if(this.vb==null||!this.vb.parentNode){this.vb=this.getDefaultDiv();
if(this.vb==null){return 0
}}if(this.vb!=c){this.Nb(this.vb);
this.vb.parentNode.replaceChild(c,this.vb);
this.vb=c
}this.Ob(c);
this.Ib();
return 1
};
mbox.prototype.hide=function(){this.setEventTime("hide.start");
var c=this.showContent(this.getDefaultDiv());
this.setEventTime(c==1?"hide.end.ok":"hide.end.fail");
return c
};
mbox.prototype.finalize=function(){this.setEventTime("finalize.start");
this.cancelTimeout();
if(this.getDefaultDiv()==null){if(this.hb.force()!=null){this.setMessage("No default content, an empty one has been added")
}else{this.setMessage("Unable to locate mbox")
}}if(!this.activate()){this.hide();
this.setEventTime("finalize.end.hide")
}this.setEventTime("finalize.end.ok")
};
mbox.prototype.cancelTimeout=function(){if(this.Lb){clearTimeout(this.Lb)
}if(this.Cb!=null){this.Cb.cancel()
}};
mbox.prototype.getDiv=function(){return this.vb
};
mbox.prototype.getDefaultDiv=function(){if(this.Jb==null){this.Jb=this.hb.locate()
}return this.Jb
};
mbox.prototype.setEventTime=function(c){this.Eb[c]=(new Date).getTime()
};
mbox.prototype.getEventTimes=function(){return this.Eb
};
mbox.prototype.getImportName=function(){return this.ib
};
mbox.prototype.getURL=function(){return this.w.buildUrl()
};
mbox.prototype.getUrlBuilder=function(){return this.w
};
mbox.prototype.Qb=function(c){return c.style.display!="none"
};
mbox.prototype.Ob=function(c){this.Rb(c,true)
};
mbox.prototype.Nb=function(c){this.Rb(c,false)
};
mbox.prototype.Rb=function(d,e){d.style.visibility=e?"visible":"hidden";
d.style.display=e?"block":"none"
};
mboxOfferContent=function(){this.Ib=function(){}
};
mboxOfferContent.prototype.show=function(c){c=c.showContent(document.getElementById(c.getImportName()));
if(c==1){this.Ib()
}return c
};
mboxOfferContent.prototype.setOnLoad=function(c){this.Ib=c
};
mboxOfferAjax=function(c){this.Mb=c;
this.Ib=function(){}
};
mboxOfferAjax.prototype.setOnLoad=function(c){this.Ib=c
};
mboxOfferAjax.prototype.show=function(d){var e=document.createElement("div");
e.id=d.getImportName();
e.innerHTML=this.Mb;
d=d.showContent(e);
if(d==1){this.Ib()
}return d
};
mboxOfferDefault=function(){this.Ib=function(){}
};
mboxOfferDefault.prototype.setOnLoad=function(c){this.Ib=c
};
mboxOfferDefault.prototype.show=function(c){c=c.hide();
if(c==1){this.Ib()
}return c
};
mboxCookieManager=function(d,e){this.g=d;
this.Ub=e==""||e.indexOf(".")==-1?"":"; domain="+e;
this.Vb=new mboxMap;
this.loadCookies()
};
mboxCookieManager.prototype.isEnabled=function(){this.setCookie("check","true",60);
this.loadCookies();
return this.getCookie("check")=="true"
};
mboxCookieManager.prototype.setCookie=function(f,j,h){if(typeof f!="undefined"&&typeof j!="undefined"&&typeof h!="undefined"){var g=new Object;
g.name=f;
g.value=escape(j);
g.expireOn=Math.ceil(h+(new Date).getTime()/1000);
this.Vb.put(f,g);
this.saveCookies()
}};
mboxCookieManager.prototype.getCookie=function(c){return(c=this.Vb.get(c))?unescape(c.value):null
};
mboxCookieManager.prototype.deleteCookie=function(c){this.Vb.remove(c);
this.saveCookies()
};
mboxCookieManager.prototype.getCookieNames=function(d){var e=new Array;
this.Vb.each(function(b){if(b.indexOf(d)==0){e[e.length]=b
}});
return e
};
mboxCookieManager.prototype.saveCookies=function(){var e=new Array,g=0;
this.Vb.each(function(c,b){e[e.length]=c+"#"+b.value+"#"+b.expireOn;
if(g<b.expireOn){g=b.expireOn
}});
var f=new Date(g*1000);
document.cookie=this.g+"="+e.join("|")+"; expires="+f.toGMTString()+"; path=/"+this.Ub
};
mboxCookieManager.prototype.loadCookies=function(){this.Vb=new mboxMap;
var g=document.cookie.indexOf(this.g+"=");
if(g!=-1){var l=document.cookie.indexOf(";",g);
if(l==-1){l=document.cookie.indexOf(",",g);
if(l==-1){l=document.cookie.length
}}for(var g=document.cookie.substring(g+this.g.length+1,l).split("|"),l=Math.ceil((new Date).getTime()/1000),k=0;
k<g.length;
k++){var j=g[k].split("#");
if(l<=j[2]){var h=new Object;
h.name=j[0];
h.value=j[1];
h.expireOn=j[2];
this.Vb.put(h.name,h)
}}}};
mboxSession=function(g,l,k,j,h){this.hc=l;
this.qb=k;
this.ic=j;
this.J=h;
this.jc=false;
this.yb=typeof mboxForceSessionId!="undefined"?mboxForceSessionId:mboxGetPageParameter(this.hc);
if(this.yb==null||this.yb.length==0){this.yb=h.getCookie(k);
if(this.yb==null||this.yb.length==0){this.yb=g;
this.jc=true
}}h.setCookie(k,this.yb,j)
};
mboxSession.prototype.getId=function(){return this.yb
};
mboxSession.prototype.forceId=function(c){this.yb=c;
this.J.setCookie(this.qb,this.yb,this.ic)
};
mboxPC=function(e,g,f){this.qb=e;
this.ic=g;
this.J=f;
this.yb=typeof mboxForcePCId!="undefined"?mboxForcePCId:f.getCookie(e);
if(this.yb!=null){f.setCookie(e,this.yb,g)
}};
mboxPC.prototype.getId=function(){return this.yb
};
mboxPC.prototype.forceId=function(c){if(this.yb!=c){this.yb=c;
this.J.setCookie(this.qb,this.yb,this.ic);
return true
}return false
};
mboxGetPageParameter=function(d){var e=null,d=(new RegExp(d+"=([^&]*)")).exec(document.location);
if(d!=null&&d.length>=2){e=d[1]
}return e
};
mboxSetCookie=function(e,g,f){return mboxFactoryDefault.getCookieManager().setCookie(e,g,f)
};
mboxGetCookie=function(c){return mboxFactoryDefault.getCookieManager().getCookie(c)
};
mboxCookiePageDomain=function(){var d=/([^:]*)(:[0-9]{0,5})?/.exec(document.location.host)[1];
if(!/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.exec(d)){var e=/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/.exec(d);
if(e){d=e[0]
}}return d?d:""
};
mboxShiftArray=function(e){for(var g=new Array,f=1;
f<e.length;
f++){g[g.length]=e[f]
}return g
};
mboxGenerateId=function(){return(new Date).getTime()+"-"+Math.floor(Math.random()*999999)
};
mboxScreenHeight=function(){return screen.height
};
mboxScreenWidth=function(){return screen.width
};
mboxBrowserWidth=function(){return window.innerWidth?window.innerWidth:document.documentElement?document.documentElement.clientWidth:document.body.clientWidth
};
mboxBrowserHeight=function(){return window.innerHeight?window.innerHeight:document.documentElement?document.documentElement.clientHeight:document.body.clientHeight
};
mboxBrowserTimeOffset=function(){return -(new Date).getTimezoneOffset()
};
mboxScreenColorDepth=function(){return screen.pixelDepth
};
try{if(typeof mboxVersion=="undefined"){var mboxVersion=39,mboxFactories=new mboxMap,mboxFactoryDefault=new mboxFactory("mtvnetworks.tt.omtrdc.net","mtvnetworks","default")
}if(mboxGetPageParameter("mboxDebug")!=null||mboxFactoryDefault.getCookieManager().getCookie("debug")!=null){setTimeout(function(){if(typeof mboxDebugLoaded=="undefined"){alert("Could not load the remote debug.\nPlease check your connection to Test&amp;Target servers")
}},60*60);
document.write('<script language="Javascript1.2" src="http://admin5.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=mtvnetworks.tt.omtrdc.net&clientCode=mtvnetworks"><\/script>')
}}catch(e$$30){}mboxScPluginFetcher=function(d,e){this.b=d;
this.qc=e
};
mboxScPluginFetcher.prototype.rc=function(c){c.setBasePath("/m2/"+this.b+"/sc/standard");
this.sc(c);
c=c.buildUrl();
c+="&scPluginVersion=1";
return c
};
mboxScPluginFetcher.prototype.sc=function(e){for(var g=["dynamicVariablePrefix","visitorID","vmk","ppu","charSet","visitorNamespace","cookieDomainPeriods","cookieLifetime","pageName","currencyCode","variableProvider","channel","server","pageType","transactionID","purchaseID","campaign","state","zip","events","products","linkName","linkType","resolution","colorDepth","javascriptVersion","javaEnabled","cookiesEnabled","browserWidth","browserHeight","connectionType","homepage","pe","pev1","pev2","pev3","visitorSampling","visitorSamplingGroup","dynamicAccountSelection","dynamicAccountList","dynamicAccountMatch","trackDownloadLinks","trackExternalLinks","trackInlineStats","linkLeaveQueryString","linkDownloadFileTypes","linkExternalFilters","linkInternalFilters","linkTrackVars","linkTrackEvents","linkNames","lnk","eo"],f=0;
f<g.length;
f++){this.uc(g[f],e)
}for(f=1;
f<=50;
f++){this.uc("prop"+f,e);
this.uc("eVar"+f,e);
this.uc("hier"+f,e)
}};
mboxScPluginFetcher.prototype.uc=function(e,g){var f=this.qc[e];
if(typeof f==="undefined"||f===null||f===""){return
}g.addParameter(e,f)
};
mboxScPluginFetcher.prototype.cancel=function(){};
mboxStandardScPluginFetcher=function(d,e){mboxScPluginFetcher.call(this,d,e)
};
mboxStandardScPluginFetcher.prototype=new mboxScPluginFetcher;
mboxStandardScPluginFetcher.prototype.getType=function(){return"standard"
};
mboxStandardScPluginFetcher.prototype.fetch=function(c){c.setServerType(this.getType());
c=this.rc(c);
document.write('<script src="'+c+'" language="JavaScript"><\/script>')
};
mboxAjaxScPluginFetcher=function(d,e){mboxScPluginFetcher.call(this,d,e)
};
mboxAjaxScPluginFetcher.prototype=new mboxScPluginFetcher;
mboxAjaxScPluginFetcher.prototype.fetch=function(c){c.setServerType(this.getType());
c=this.rc(c);
this.x=document.createElement("script");
this.x.src=c;
document.body.appendChild(this.x)
};
mboxAjaxScPluginFetcher.prototype.getType=function(){return"ajax"
};
function mboxLoadSCPlugin(c){if(!c){return null
}c.m_tt=function(d){d=d.m_i("tt");
d.H=true;
d.b="mtvnetworks";
d._t=function(){if(!this.isEnabled()){return
}var e=this.xc();
if(e){var f=mboxFactoryDefault.isDomLoaded()?new mboxAjaxScPluginFetcher(this.b,this.s):new mboxStandardScPluginFetcher(this.b,this.s);
e.setFetcher(f);
e.load()
}};
d.isEnabled=function(){return this.H&&mboxFactoryDefault.isEnabled()
};
d.xc=function(){var e=this.yc(),f=document.createElement("DIV");
return mboxFactoryDefault.create(e,new Array,f)
};
d.yc=function(){return"SiteCatalyst: "+(this.s.events&&this.s.events.indexOf("purchase")!=-1?"purchase":"event")
}
};
return c.loadModule("tt")
}btg.Hcode=s_gi("");
if(typeof btg.Hcode==="object"){btg.Hcode.setAccount=function(c){this.un=c
}
}if(typeof btg.Hcode==="object"){btg.Hcode.getNewRepeat=new Function("var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w('s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s.c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cval+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else return 'Repeat';")
}if(typeof btg.Hcode==="object"){btg.Hcode.getTimeParting=new Function("t","z","var s=this,cy;dc=new Date('1/1/2000');if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}else{;z=parseFloat(z);var dsts=new Date(s.dstStart);var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}if(t=='d'){return dow};if(t=='w'){return dt}}};");
btg.Hcode.dstStart="03/13/2011";
btg.Hcode.dstEnd="11/06/2011";
btg.Hcode.currentYear=(new Date).getFullYear()
}if(typeof btg.Hcode==="object"){btg.Hcode.getValOnce=new Function("v","c","e","var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v")
}if(typeof btg.Hcode==="object"){btg.Hcode.getPreviousValue=new Function("v","c","el","var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el){if(s.events){i=split(el,',');j=split(s.events,',');for(x in i){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
var split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a")
}if(typeof btg.Hcode==="object"){btg.Hcode.getPercentPageViewed=new Function("","var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
btg.Hcode.getPPVCalc=new Function("","var s=s_c_il["+btg.Hcode._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");
btg.Hcode.getPPVSetup=new Function("","var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s.getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,false);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEvent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCalc);}");
btg.Hcode.getPPVSetup()
}if(typeof btg.Hcode==="object"){btg.Hcode.getQueryParam=new Function("p","d","u","var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.location);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i==p.length?i:i+1)}return v");
btg.Hcode.p_gpv=new Function("k","u","var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
btg.Hcode.p_gvf=new Function("t","k","if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'True':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa(v)}return ''")
}if(typeof btg.Hcode==="object"){btg.Hcode.trackTNT=function(g,l,k){var g=g?g:"s_tnt",j="",h=false,k=k?k:true;
if(this.getQueryParam){h=this.getQueryParam(l?l:"s_tnt")
}if(h){j+=h+","
}if(this.wd[g]!=undefined){j+=this.wd[g]
}if(k){this.wd[g]=""
}return j
}
}btg.MediaPlayer={context:null,playerCommandQueue:null,isHtml5:false,html5MetaData:{},init:function(c){this.context=c;
this.playerCommandQueue=new btg.QueueManager({id:"btg.MediaPlayer.playerCommandQueue",timeToWait:100,maxNumItems:10,maxElapsed:1000,handler:this.execute})
},playStarted:false,players:[],addPlayer:function(e,g){var f=this.isHtml5?e.id:e;
this.players[f]=new this.Player(e,g);
return this.players[f]
},setEndSlateClick:function(e){var g=btg.Cookie.set,f=btg.config.Omniture;
g("mtvn_btg_tnt",(e&&typeof f.enableTestAndTarget=="boolean"&&f.enableTestAndTarget?btg.TestAndTarget.getCampaignId():"")+"_"+(typeof feedEndslate!="undefined"&&feedEndslate));
g("mtvn_btg_esclicked",e)
},getEndSlateClick:function(){return btg.Cookie.read("mtvn_btg_esclicked")
},PlayerController:function(d,e){return this.addPlayer(d,e)
},pause:function(){var d=btg.MediaPlayer,e;
for(e in d.players){if(d.players.hasOwnProperty(e)){d.players[e].player.pause()
}}},unpause:function(){var d=btg.MediaPlayer,e;
for(e in d.players){if(d.players.hasOwnProperty(e)){if(d.players[e].player.unpause){d.players[e].player.unpause()
}else{if(d.players[e].player.play){d.players[e].player.play()
}}}}},execute:function(d){var e=btg.MediaPlayer;
if(e.playStarted){switch(d){case"unpause":e.unpause();
break;
case"pause":e.pause()
}}else{e.playerCommandQueue.queue.push(d)
}},reportingInit:function(){try{btg.config.Omniture.videoViewEventDisable=true;
btg.Demdex.sendIdSyncCall()
}catch(c){}},getFirstPartyServer:function(){var c=null;
if(btg.config.Omniture.enableFirstPartyCookie){c=btg.Environment.getCnamedDomain()
}return c
},getVmnUUID:function(){return btg.Cookie.read("vmn_uuid")
},setDemdexFWSegment:function(){var e=btg.Demdex.getFWSegment(),g=btg.MediaPlayer;
if(e){for(var f in g.players){if(g.players.hasOwnProperty(f)&&g.players[f].player&&g.players[f].player.setDemdexFWSegment){g.players[f].player.setDemdexFWSegment(e)
}}}},Player:function(b,c){var d=btg.Controller,e=btg.Cookie,f=btg.TestAndTarget,g=btg.MediaPlayer,h=btg.config;
this.playerId=this.isHtml5?b.id:b;
this.player=this.lastGuid=null;
this.playerLoaded=false;
this.onLoadFunctionName=c;
this.onLoaded=function(){this.player=g.getPlayerObject(b);
g.addListeners(this.player);
this.playerLoaded=true;
var c=eval(this.onLoadFunctionName);
if(typeof c=="function"){c(this)
}};
this.onDump=function(){};
this.dump=function(){var b="";
if(this.playerLoaded){b=this.player.getLogDump()
}else{b="player not loaded"
}this.onDump(b)
};
this.onPlayHeadUpdate=function(b){b=g.isHtml5?b.data:b;
if((b=b==-1||b==null||typeof b=="undefined"?1.5:b)&&b>1){if(!g.playStarted){g.playStarted=true;
g.playerCommandQueue.init()
}}};
this.onMetaData=function(b){if(btg.MediaPlayer.isHtml5){try{html5MetaData=b={guid:b.data.rss.guid,contentType:b.data.rss.group.categories.contentType}
}catch(c){}}if(location.search.match(/showMetaData\=true/)){str="";
for(m in b){str+=m+": "+b[m]+"\n"
}alert(this.lastGuid+"\n\n\n"+str)
}var l="",o=document.location.search,p=o.toLowerCase().indexOf("xrs=mpes_")!=-1?true:false,v=b.contentType==="c3_adpod";
if(p){for(var o=o.replace(/^\?/g,"").split("&"),p=0,n=o.length;
p<n;
p++){if(o[p].split("=")[0]=="xrs"){l=btg.String.isDefined(o[p].split("=")[1])?o[p].split("=")[1]:""
}}}if(b.guid&&this.lastGuid!==b.guid){l={linkName:"Video View",linkType:"o",eVar28:b.contentType,events:"event15"+(g.getEndSlateClick()=="true"?",event45":""),campaign:l};
if(typeof h.Omniture.enableTestAndTargetTrial!="undefined"&&h.Omniture.enableTestAndTargetTrial){o=(p=e.read("mtvn_btg_tnt"))?p.split("_")[0]:"";
p=p?p.split("_")[1]:"false";
if(g.getEndSlateClick()=="true"&&o!=""){if(p.toString()=="true"){f.convertMbox(location.href&&location.href.match(/[\?#&]id=[^&]/gi)?"editorialplaylist":"dynamicplaylist")
}else{f.convertMbox("endslatevideoloaded")
}}f.convertMbox("endSlateGating")
}e.set("mtvn_btg_tnt","");
if(typeof btg.UserSegment!="undefined"){btg.UserSegment.add(g.context,"VideoViewer");
if(v){btg.UserSegment.add(btg.MediaPlayer.context,"C3VideoViewer")
}}if(typeof h.Omniture.videoViewEventDisable!="undefined"&&h.Omniture.videoViewEventDisable){l.events=l.events.replace(/event15(,)?/gi,"");
l.eVar28=""
}else{g.setEndSlateClick("false");
d.sendLinkEvent(l)
}}this.lastGuid=b.guid
};
this.onEndslateLoad=function(){if(typeof this.onEndslateFired!="undefined"){return
}else{this.onEndslateFired=true
}if(typeof btg.UserSegment!="undefined"){btg.UserSegment.add(g.context,"EndslateViewer")
}d.sendLinkEvent({linkName:"Endslate View",linkType:"o",events:"event44"});
if(typeof h.Omniture.enableTestAndTargetTrial!="undefined"&&h.Omniture.enableTestAndTargetTrial){f.convertMbox("endslateload")
}}
},getPlayerObject:function(d){if(btg.MediaPlayer.isHtml5){d=d
}else{if(navigator.appName.indexOf("Microsoft")){d=window[d]?window[d]:document[d]?document[d]:null
}else{d=document[d]?document[d]:window[d]?window[d]:null
}if(d&&typeof d.length!="undefined"){for(var e in d){if(typeof d[e].pause!="undefined"){d=d[e];
break
}}}}return d
},addListeners:function(c){if(btg.MediaPlayer.isHtml5){c.addEventListener("onMetadata",btg.MediaPlayer.players[c.id].onMetaData);
c.addEventListener("onPlayheadUpdate",btg.MediaPlayer.players[c.id].onPlayHeadUpdate)
}else{c.addEventListener("METADATA",'btg.MediaPlayer.players["'+c.id+'"].onMetaData');
c.addEventListener("ENDSLATE_CLICK",'btg.MediaPlayer.players["'+c.id+'"].onEndslateLoad');
c.addEventListener("PLAYHEAD_UPDATE",'btg.MediaPlayer.players["'+c.id+'"].onPlayHeadUpdate');
if(c.addReportingEventListener){c.addReportingEventListener("DEMDEXVIDEOSTARTCALL","btg.Demdex.sendPageCall");
c.addReportingEventListener("DEMDEXVIDEOENDCALL","btg.Demdex.sendPageCall");
c.addReportingEventListener("DEMDEXEMBED","btg.Demdex.sendSocialCall");
c.addReportingEventListener("DEMDEXLINK","btg.Demdex.sendSocialCall");
c.addReportingEventListener("DEMDEXSHARE","btg.Demdex.sendSocialCall");
c.addReportingEventListener("REPORTINGINIT","btg.MediaPlayer.reportingInit");
c.addReportingEventListener("FIRSTPARTYSERVER","btg.MediaPlayer.getFirstPartyServer");
c.addReportingEventListener("VMNUUID","btg.MediaPlayer.getVmnUUID");
c.addReportingEventListener("ENDSLATECLICK","btg.MediaPlayer.setEndSlateClick")
}}},onWindowLoaded:function(){var d=btg.MediaPlayer,e=window.mtvnPlayerLoaded;
window.mtvnPlayerLoaded=function(c){var b;
if(btg.Object.isDefined(c)){d.isHtml5=true;
b=c.id;
if(c.isFlash){d.isHtml5=false;
c=c.id
}}else{b=c
}if(typeof e!="undefined"){e(b)
}if(!d.isHtml5&&typeof document.getElementById(b)=="undefined"){return
}if(typeof d.players[b]=="undefined"){d.addPlayer(c)
}d.players[b].onLoaded()
}
}};
try{btg.MediaPlayer.onWindowLoaded();
var MTVNPlayer=MTVNPlayer||{};
MTVNPlayer.addCallback=function(c){this.onAPIReady=function(b){return b?function(){b();
c()
}:c
}(this.onAPIReady)
};
MTVNPlayer.addCallback(function(c){return function(){MTVNPlayer.onPlayer(c)
}
}(mtvnPlayerLoaded))
}catch(e$$38){}btg.AdManager=new function(){var O=btg.Object,N=O.copyProperties,M=btg.String.isDefined,L=O.isConfigDefined,K=btg.String.stripFileExtension,J=btg.Math.random,I=btg.globalvars,G=false,H=false,F=false,D=false,C=false,y=30000,E,B=[],x=new btg.DependencyManager(7000);
x.add("demdex_data",function(){return !btg.config.Demdex||!btg.config.Demdex.enabled||btg.Object.isDefined(btg.Demdex.data)
},100,true);
x.add("uuid",function(){return btg.Cookie.read("vmn_uuid")!=null
},100,true);
this.groupedReloadableAdsCounter=this.groupedReloadableAdsTotal=0;
var A={};
A.tile=0;
A.ord=J(100000000000000000,1000000000000000000);
var z=[{name:"DoubleClick",url:"http://ad.doubleclick.net/",reportEvent:"event79"},{name:"FreeWheel",url:"http://140cc.v.fwmrm.net/",reportEvent:"event80"}];
this.reloadableAds={};
this.init=function(){E=btg.config;
if(E.reloadableAds&&E.reloadableAds===true){C=true
}if(E.reloadInterval&&!isNaN(parseInt(E.reloadInterval))){E.reloadInterval=parseInt(E.reloadInterval);
if(E.reloadInterval>=10000){y=E.reloadInterval
}}var c={};
if(L(E.DoubleClick)){E.DoubleClick.dartSite=btg.DartSite.getValue(E.DoubleClick.dartSite);
if(E.DoubleClick.type&&E.DoubleClick.type.toLowerCase()=="international"){E.International={};
N(E.DoubleClick,E.International)
}else{if(E.DoubleClick.type&&E.DoubleClick.type.toLowerCase()=="domestic"){E.International={}
}}G=true;
if(M(E.DoubleClick.sections)){E.DoubleClick.sections=K(E.DoubleClick.sections);
c.sections=E.DoubleClick.sections
}else{this.setDefaultSections();
if(M(A.sections)){c.sections=A.sections
}}c.dartSite=E.DoubleClick.dartSite
}if(L(E.FreeWheel)){H=true
}if(L(E.International)){F=true;
if(M(E.International.sections)){E.International.sections=K(E.International.sections);
c.sections=E.International.sections
}else{this.setDefaultSections();
if(M(A.sections)){c.sections=A.sections
}}c.dartSite=E.International.dartSite
}if(L(E.QuantCast)){D=true
}if(D){PlatoAd=new btg.DomesticDc(E.DoubleClick);
dmobj={size:"728x90",contentType:"adj"};
dmobj.sections=c.sections;
if(M(E.QuantCast.vertical)){PlatoAd.setKeyValues("vertical="+E.QuantCast.vertical)
}PlatoAd.init(dmobj);
PlatoAd.getUrl();
if(btg.QuantCast){btg.QuantCast.Ads.setLabels(c,PlatoAd.getSections())
}}this.check4BlockedAds();
c=this.getAdsBHCookie("mtvn_btg_adshidden");
if(c<2){btg.Cookie.set("mtvn_btg_adshidden",++c);
btg.Events.adLoaded.subscribe(this.checkStyle)
}};
this.getAdsBHCookie=function(d){var e="",d=btg.Cookie.read(d);
if(d!=null){e=parseInt(d)
}else{e=0
}return e
};
this.sendAdBlockedRepCall=function(){btg.Cookie.set("mtvn_btg_adsblocked",this.getAdsBHCookie("mtvn_btg_adsblocked")+1);
for(var f=[],j=[],h=0,g=z.length;
h<g;
h++){if(z[h].isBlocked===true){f.push(z[h].name);
j.push(z[h].reportEvent)
}}if(f.length>0){f=f.join(" and ");
btg.Controller.sendLinkEvent({linkName:f+" Blocked",linkType:"o",eVar55:f+" Blocked",events:j.join()});
btg.Cookie.set("mtvn_btg_adsblocked",2)
}};
this.blockCallback=function(f){for(var j=0,h=0,g=z.length;
h<g;
h++){if(f.url==z[h].url){if(typeof f.fail!="undefined"&&f.fail===true){z[h].isBlocked=true
}else{z[h].isBlocked=false
}}if(typeof z[h].isBlocked!="undefined"){j++
}}if(j==z.length){btg.AdManager.sendAdBlockedRepCall()
}};
this.check4BlockedAds=function(){if(navigator.userAgent.indexOf("MSIE")!=-1){return
}var d=this.getAdsBHCookie("mtvn_btg_adsblocked");
if(d>=2){}else{if(d<2){for(var d=0,e=z.length;
d<e;
d++){new btg.Ajax({method:"POST",onSuccess:this.blockCallback,onFail:this.blockCallback,autoSend:true,url:z[d].url})
}}}};
this.sendAdHiddenRepCall=function(){if(this.getAdsBHCookie("mtvn_btg_adshidden")>=2){return
}btg.Controller.sendLinkEvent({linkName:"DoubleClick Hidden",linkType:"o",eVar55:"DoubleClick Hidden",events:z[0].reportEvent});
btg.Cookie.set("mtvn_btg_adshidden",2)
};
this.checkStyle=function(f){try{var j=document.getElementById(f),h=j.tagName.toLowerCase()=="iframe"?j:j.parentNode;
if(btg.DOM.getStyle(h,"display")=="none"||btg.DOM.getStyle(h,"visibility")=="hidden"){btg.AdManager.sendAdHiddenRepCall()
}}catch(g){}};
this.addUuid=function(e){var g=btg.Cookie.read("vmn_uuid"),f=btg.config.DoubleClick.keyValues;
if(g!=null){g="u="+g;
if(btg.String.isDefined(e.keyValues)){e.keyValues+=e.keyValues.lastIndexOf(";")==e.keyValues.length-1?g+";":";"+g+";"
}else{if(btg.String.isDefined(f)){e.keyValues=f.lastIndexOf(";")==f.length-1?f+g+";":f+";"+g+";"
}else{e.keyValues=g+";"
}}}return e
};
this.addDemdexVals=function(g){if(btg.Object.isDefined(btg.Demdex.data&&btg.Demdex.data.stuff)){for(var l=btg.Demdex.data.stuff,k=btg.config.DoubleClick.keyValues,j=0,h=l.length;
j<h;
j++){if(btg.Object.isDefined(l[j])&&btg.String.isDefined(l[j].cn)&&l[j].cn=="dfp"&&btg.String.isDefined(l[j].cv)){l=l[j].cv.split(",").join(";");
if(btg.String.isDefined(g.keyValues)){g.keyValues+=g.keyValues.lastIndexOf(";")==g.keyValues.length-1?l+";":";"+l+";"
}else{if(btg.String.isDefined(k)){g.keyValues=k.lastIndexOf(";")==k.length-1?k+l+";":k+";"+l+";"
}else{g.keyValues=l+";"
}}break
}}}return g
};
this.placeAd=function(e,g){btg.Controller.init();
if(btg.config.defferedAdLoading&&!g){this.placeAdTag(e)
}else{if(typeof I.IS_CODA_ADS_USED!="undefined"&&I.IS_CODA_ADS_USED==false){I.IS_CODA_ADS_USED=true
}if(e.size=="6x6"){if(btg.Cookie.read("vmn_poe")==null){btg.Cookie.set("vmn_poe","6x6")
}else{return
}}var f=this.getAd(e);
if(e.isReloadable===true||C&&e.isReloadable!==false){if(f.setContentType){f.setContentType("adi")
}f.reloadInterval=y;
if(e.reloadInterval&&!isNaN(parseInt(e.reloadInterval))){f.needUniqueOrd=true;
e.reloadInterval=parseInt(e.reloadInterval);
if(e.reloadInterval>=10000){f.reloadInterval=e.reloadInterval
}}else{this.groupedReloadableAdsTotal++;
this.groupedReloadableAdsCounter++
}if(f.reloadTimer){clearInterval(f.reloadTimer);
f.reloadTimer=null
}f.reloadTimer=setInterval(function(){btg.AdManager.reloadAd(f)
},f.reloadInterval)
}if(f!=null){f.placeAd(e);
return f
}else{btg.Error.log("Coda ERROR: Ad not created, please check your config to enable CODA ads!");
return null
}}};
this.placeAdTag=function(d){var e=btg.config;
e.adSetup=e.adSetup||[];
d.adId="btgAd_"+e.adSetup.length;
e.adSetup[e.adSetup.length]=d;
document.write("<div id='"+d.adId+"'></div>")
};
this.placeAllAds=function(){if(btg.Cookie.read("vmn_3pc")!="0"&&x.hasDependency()){x.addToCallQueue(this,btg.AdManager.placeAllAds);
return
}var e=btg.config.adSetup;
if(e){for(var g=0,f=e.length;
g<f;
g++){e[g].contentType="adi";
if(e[g].adId.match(/btgad_/ig)){this.placeAd(e[g],true)
}else{if(console&&console.log){console.log("Please provide adId in std format. Ex. 'btgAd_1'.")
}}}}};
this.adLoadNotify=function(c){if(typeof btg.Events.adLoaded!="undefined"){btg.Events.adLoaded.fire(c)
}};
this.setAdReloadOrdByGroup=function(c){if(c.needUniqueOrd===true){c.setOrd(J(100000000000000000,1000000000000000000))
}else{if(this.groupedReloadableAdsCounter>=this.groupedReloadableAdsTotal&&this.groupedReloadableAdsCounter%this.groupedReloadableAdsTotal==0){A.ord=J(100000000000000000,1000000000000000000)
}c.setOrd(A.ord);
this.groupedReloadableAdsCounter++
}};
this.reloadAd=function(g){var d=O.isDefined;
if(d(g)&&M(g.id)&&d(self.frames[g.id])){g.setContentType("adi");
this.setAdReloadOrdByGroup(g);
try{self.frames[g.id].location.replace(g.getUrl())
}catch(b){}}};
this.reloadAll=function(){var g=B.length,l=btg.FreeWheelAdInterface.fwAds,k=l.length;
A.ord=J(100000000000000000,1000000000000000000);
for(var j=0;
j<g;
j++){var h=B[j];
h.setOrd(A.ord);
this.reloadAd(h);
if(h.reloadTimer){clearInterval(h.reloadTimer);
h.reloadTimer=null;
h.reloadTimer=setInterval(function(){btg.AdManager.reloadAd(h)
},h.reloadInterval)
}}for(j=0;
j<k;
j++){h=l[j];
h.dcAd.setOrd(A.ord);
h.reload();
h.startReloadTimer()
}return this
};
this.getData=function(){return A
};
this.setDefaultSections=function(c){c=M(c)?c:btg.Sections.getAdSections();
if(M(c)){A.sections=K(c)
}};
this.getAd=function(c){this.init();
var d;
if(F){d=new btg.InternationalDc(E.International)
}else{if(H){d=new btg.FreeWheelAd(E)
}else{if(G){d=new btg.DomesticDc(E.DoubleClick)
}else{btg.Error.log("Coda ERROR: Ads not enabled. Please check your config or placeAd() method call!");
return null
}}}if(btg.Object.isConfigDefined(btg.config.Demdex)){c=this.addDemdexVals(c)
}c=this.addUuid(c);
if(!c.isSurrogate){A.tile++
}if(M(c.sections)){c.sections=K(c.sections)
}N(A,c);
d.init(c);
if(!c.isSurrogate){B.push(d)
}return d
};
this.getAds=function(){return B
};
this.getAdUrl=function(c){return this.getAd(c).getUrl()
};
this.setTile=function(c){A.tile=c
}
};
btg.FreeWheelAd=function(c){this.isStr=btg.String.isDefined;
this.config=c;
this.type="FreeWheelAd";
this.fwType="DART";
this.slotId="fwph_";
this.reloadable=false;
this.reloadTime=30000;
this.needUniqueOrd=this.isGroupedByOrd=false
};
btg.FreeWheelAd.prototype={placeAd:function(e){if(this.fwType=="MRM"||this.fwType=="COV"){this.realWidth=this.realSize.substr(0,this.realSize.indexOf("x"));
this.realHeight=this.realSize.substr(this.realSize.indexOf("x")+1,this.realSize.length);
var g="slid=";
g+=this.slotId;
g+="&ptgt=s&envp=g_iframe_js&w=";
g+=this.realWidth;
g+="&h=";
g+=this.realHeight;
var f="";
f+='<span id="'+this.slotId+'" class="_fwph">';
f+='<form id="_fw_form_'+this.slotId+'" style="display:none;">';
f+='<input type="hidden" name="_fw_input_'+this.slotId+'" id="_fw_input_'+this.slotId+'" value="'+g+'" />';
f+="</form>";
f+='<span id="_fw_container_'+this.slotId+'" class="_fwac">';
f+='<span id="fwCustom_'+this.slotId+'" name="fwCustom_'+this.slotId+'" class="fwCustomAll" style="width:'+this.realWidth+"px;height:"+this.realHeight+'px;display:block;"></span></span>';
f+="</span>";
if(btg.globalvars.IS_TOP_ACCESSIBLE&&btg.String.queryStringToObject(top.location.search).mockupMode=="true"){f=btg.String.mockItUp(f)
}if(btg.config.defferedAdLoading){if(e=document.getElementById(e.adId)){e.innerHTML=f
}else{document.write(f)
}}else{document.write(f)
}btg.FreeWheelAdInterface.fwAds[this.slotId]=this;
btg.DOM.Events.addListener(window,"load",this.timerToPlayAd)
}else{if(this.fwType=="DART"){this.dcAd=new btg.DomesticDc(this.config.DoubleClick);
this.dcAd.init(this.initData);
this.dcAd.placeAd(e)
}else{new btg.Alert("FreeWheel ad type not recognized.");
btg.Error.log("Coda ERROR: FreeWheel ad type not recognized. Please check your config!")
}}},timerToPlayAd:function(){setTimeout(function(){var d=false,e;
for(e in btg.MediaPlayer.players){d=true;
break
}if(d){setTimeout(btg.FreeWheelAdInterface.forcedPlayAd,btg.globalvars.FORCE_AD_WAIT_TIME.PLAYER_LOADED)
}else{setTimeout(btg.FreeWheelAdInterface.forcedPlayAd,btg.globalvars.FORCE_AD_WAIT_TIME.PLAYER_FAILED)
}},btg.globalvars.FORCE_AD_WAIT_TIME.PLAYER_LOAD_WAIT_TIME)
},setContentType:function(){},init:function(c){this.initData=c;
if(this.isStr(c.size)){this.size=c.size
}else{this.size="[ERROR: Size Not Defined!]";
new btg.Alert("FreeWheel ad size not defined.");
btg.Error.log("Coda ERROR: FreeWheel ad size not defined.")
}if(this.isStr(c.realSize)){this.realSize=c.realSize
}else{this.realSize=this.size
}this.slotId+=c.tile;
if(this.isStr(this.config.FreeWheel.type)){this.fwType=this.config.FreeWheel.type.toUpperCase()
}if(this.config.FreeWheel.reloadable||c.isReloadable){this.reloadable=true;
this.reloadTime=30000;
if(this.config.FreeWheel.reloadTime&&!isNaN(parseInt(this.config.FreeWheel.reloadTime))&&parseInt(this.config.FreeWheel.reloadTime)>=10000){this.reloadTime=parseInt(this.config.FreeWheel.reloadTime);
this.isGroupedByOrd=true
}if(c.reloadInterval&&!isNaN(parseInt(c.reloadInterval))&&parseInt(c.reloadInterval)>=10000){this.reloadTime=parseInt(c.reloadInterval);
if(this.isGroupedByOrd===true){this.isGroupedByOrd=false
}this.needUniqueOrd=true
}if(this.isGroupedByOrd===true){btg.AdManager.groupedReloadableAdsTotal++;
btg.AdManager.groupedReloadableAdsCounter++
}}},reload:function(){var h="_fw_frame_"+this.slotId,o=document.getElementById(h),n=document.getElementById("fwCustom_"+this.slotId);
if(!btg.Object.isDefined(this.dcAd)){this.dcAd=new btg.DomesticDc(this.config.DoubleClick);
this.dcAd.init(this.initData)
}if(!this.isStr(this.dcAd.id)){this.dcAd.setId("ad"+this.dcAd.tile)
}this.dcAd.needUniqueOrd=this.needUniqueOrd;
if(o!=null){btg.AdManager.setAdReloadOrdByGroup(this.dcAd)
}this.dcAd.setContentType("adi");
h='<iframe allowtransparency="true" style="display:inline;width:'+this.realWidth+"px;height:"+this.realHeight+'px;border:0px;z-index:99;border-width:0px;" onload="btg.AdManager.adLoadNotify(\''+this.dcAd.id+'\');" id="'+h+'" name="'+h+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="'+this.realWidth+'" height="'+this.realHeight+'" src="'+this.dcAd.getUrl()+'"></iframe>';
if(o==null&&n!=null){n.style.border="0px";
n.style.backgroundColor="transparent";
try{n.innerHTML=h
}catch(l){}}else{if(o!=null){if(o.parentElement){try{o.parentElement.innerHTML=h
}catch(k){}}else{if(o.parentNode){try{o.parentNode.innerHTML=h
}catch(j){}}}}}},startReloadTimer:function(){if(this.reloadable){var c=this;
if(this.reloadTimer){clearInterval(this.reloadTimer);
this.reloadTimer=null
}this.reloadTimer=setInterval(function(){c.reload()
},this.reloadTime)
}}};
btg.FreeWheelAdInterface=new function(){var c=btg.String;
this.fwAds=[];
this.getFallbackDisplayHTML=function(w,v){for(var u=c.isDefined,t="",q=this.fwAds[w],p=v.split(","),n="",o=0,b=p.length;
o<b;
o++){if(u(p[o])){n+=";!category="+p[o]
}}q.dcAd=new btg.DomesticDc(q.config.DoubleClick);
if(u(q.initData.keyValues)){q.initData.keyValues+=n
}else{q.initData.keyValues=n
}q.initData.contentType="adj";
q.dcAd.init(q.initData);
if(q.reloadable){q.startReloadTimer()
}if(!u(q.dcAd.id)){q.dcAd.setId("ad"+q.dcAd.tile)
}t+='<script type="text/javascript"  id="'+q.dcAd.id+"\" onreadystatechange=\"if(this.readyState=='complete')parent.btg.AdManager.adLoadNotify('"+q.dcAd.id+"');\" onload=\"parent.btg.AdManager.adLoadNotify('"+q.dcAd.id+'\');" src="';
t+=q.dcAd.getUrl();
t+='"><\/script>';
return t
};
this.forcedPlayAd=function(){var q=btg.FreeWheelAdInterface,p=btg.globalvars,o=c.queryStringToObject,n=false,l=false,j,b=p.IS_LIVE_ENV;
if(p.IS_TOP_ACCESSIBLE){if(o(top.location.search).fwFailSafe=="true"){j=true
}else{if(o(top.location.search).fwFailSafe=="false"){j=false
}}}if(j==true){n=true;
if(b==true){l=true
}}else{if(j==false){n=false
}else{if(b==true){l=n=true
}}}if(p.IS_TOP_ACCESSIBLE&&o(top.location.search).mockupMode=="true"){l=n=false
}if(n==true){for(i in q.fwAds){if(document.getElementById("_fw_frame_"+i)==null){if(q.fwAds[i].reloadable){q.fwAds[i].startReloadTimer()
}q.fwAds[i].reload()
}else{l=false
}}if(l==true){new btg.Alert("Freewheel failsafe method used.",1)
}}}
};
var mtvn=typeof mtvn==="object"?mtvn:{};
mtvn.btg=typeof mtvn.btg==="object"?mtvn.btg:{};
mtvn.btg.ads=typeof mtvn.btg.ads==="object"?mtvn.btg.ads:{};
mtvn.btg.ads.FreeWheelAdInterface=btg.FreeWheelAdInterface;
(function(c){c.DartSite=function(){var b=c.Environment.getPlatform();
return{getValue:function(d){if(b==="iPad"&&d.indexOf(".tab")===-1){d+=".tab"
}return d
}}
}()
})(btg);
btg.DoubleClick=function(d){this.isStr=btg.String.isDefined;
this.isObj=btg.Object.isDefined;
this.gv=btg.globalvars;
this.qsToObj=btg.String.queryStringToObject;
this.mockItUp=btg.String.mockItUp;
if(this.isObj(d)){this.config=d
}this.server="ad.doubleclick.net";
this.ssl=false;
this.contentType="adj";
this.mediaType="standard";
this.keyValues="";
this.zoneOverride=null;
this.additionalKeyValues=[];
this.exclusions=[];
this.reservedKeyValues={};
if(this.isObj(d)){this.autoDcopt=d.autoDcopt?true:false
}if(this.isObj(btg.AdManager)&&!btg.AdManager.dcoptOn){btg.AdManager.dcoptOn=false
}this.isDevEnv=false;
if(btg.globalvars.IS_TOP_ACCESSIBLE&&top.location.hostname.indexOf("mtvi.com")>-1){this.isDevEnv=true
}if(this.isObj(d)){for(var e in d){if(this.isStr(d[e])&&(typeof d[e]=="string"||typeof d[e]=="number")){if(e=="sections"){this.setSections(d[e])
}else{if(e=="keyValues"){this.setKeyValues(d[e])
}else{if(e=="positionThreshold"){this.setPositionThreshold(d[e])
}else{this[e]=d[e]
}}}}}}};
btg.DoubleClick.prototype={formatUrl:function(d){var e="",e=d.dartSite+"/"+d.zone+";";
if(e.length>64){d.zone=d.zone.substring(0,d.zone.length-(e.length-64))
}e=[[d.protocol+d.server,d.contentType,d.dartSite,d.zone].join("/"),d.sections];
if(this.isStr(d.keyValues)){e.push(d.keyValues)
}if(d.ord>0){e.push("ord="+d.ord+"?")
}return e=e.join(";")
},setKeyValues:function(c){c=c.replace(/[^\w=!;|-]/g,"_");
this.keyValues=c.replace(/^;+|;+$/g,"");
if(this.keyValues.indexOf("mtype=")>-1){this.setMediaType(this.getKeyValue("mtype="))
}if(this.keyValues.indexOf("pos=")>-1){this.setPosition(this.getKeyValue("pos="))
}else{if(this.keyValues.indexOf("threshold=")>-1){this.setPositionThreshold(this.getKeyValue("threshold="))
}}},setZoneOverride:function(c){this.zoneOverride=c
},setId:function(c){this.id=c
},setServer:function(c){this.server=c
},setSsl:function(){this.ssl=true
},setDartSite:function(c){this.dartSite=btg.DartSite.getValue(c)
},setContentType:function(c){this.contentType=c
},setMediaType:function(c){this.mediaType=c
},setPosition:function(c){this.position=c
},setSections:function(f){for(var f=f=="/"?f:btg.String.charTrim(f,"/"),j=this.isObj(btg.config)&&this.isStr(btg.config.defaultIndexFileName)?btg.config.defaultIndexFileName:"index",j=btg.String.stripFileExtension(j),j=["/",j,"home/"+j],h=0,g=j.length;
h<g;
h++){if(f.indexOf(j[h])==0&&f.length==j[h].length){f=f.replace(j[h],"_hp");
break
}}for(f=f.replace(/[^\/\w=!;|-]/g,"_");
f.match(/\/\d/);
){f=f.replace(/\/\d/,RegExp.lastMatch.substring(0,1)+"_"+RegExp.lastMatch.substring(1,2))
}f=f.replace(/^\d/,"_"+f.match(/^\d/,"_"));
this.sections=f.replace(/^\/+|\/+$/g,"");
if(this.sections.indexOf(".")>-1){this.sections=this.sections.split(".")[0]
}},setSize:function(c){this.size=c
},setRealSize:function(c){this.realSize=c
},setTile:function(c){this.tile=c
},setPositionThreshold:function(c){if(isNaN(parseInt(c))){this.positionThreshold=null
}else{this.positionThreshold=parseInt(c)
}},setOrd:function(c){this.ord=c
},setPartner:function(c){this.partner=c
},addExclusionCategory:function(f){var f=f.replace(/^;+|;+$/g,""),j=false;
if(this.exclusions.length>0){for(var h=0,g=this.exclusions.length;
h<g;
h++){if(this.exclusions[h].match(new RegExp("category="+f,"ig"))){j=true;
break
}}if(!j){this.exclusions.push("!category="+f)
}}else{this.exclusions.push("!category="+f)
}},addKeyValues:function(c){if(this.isStr(c)&&c.indexOf("=")>-1){this.additionalKeyValues.push(c)
}},appendKeyValue:function(d,e){if(!this.isStr(d)){d=""
}if(!this.isStr(e)){e=""
}d=d.replace(/^;+|;+$/g,"");
e=e.replace(/^;+|;+$/g,"");
if(d.indexOf("=")>-1){e+=";"+d
}return e=e.replace(/^;+|;+$/g,"")
},removeKeyValue:function(d){if(this.isStr(this.getKeyValue(d))){var e=";"+d+this.getKeyValue(d);
if(this.keyValues.indexOf(e)==-1){e=d+this.getKeyValue(d)+";";
if(this.keyValues.indexOf(e)==-1){e=d+this.getKeyValue(d)
}}this.keyValues=this.keyValues.replace(new RegExp(e,"g"),"");
this.removeKeyValue(d)
}},getProtocol:function(){return this.ssl?"https://":"http://"
},getPosition:function(){var e="unk";
if(this.isStr(this.position)){if(this.position.indexOf("atf")>-1){e="atf"
}else{if(this.position.indexOf("btf")>-1){e="btf"
}}}else{if(btg.String.isDefined(this.containerAdId)){var g=document.getElementById(this.containerAdId),g=parseInt(g.offsetTop),f=parseInt(document.documentElement.clientHeight);
if(!isNaN(g)&!isNaN(f)){if(g<f){e="atf"
}else{e="btf"
}}}else{if(this.isStr(this.positionThreshold)){e=this.tile<=this.positionThreshold?"atf":"btf"
}}}return e
},getKeyValue:function(d){var e;
if(this.keyValues.indexOf(d)>-1){d=this.keyValues.split(d);
if(d.length>0){if(d[1].indexOf(";")>-1){e=d[1].substring(0,d[1].indexOf(";"))
}else{e=d[1]
}}}return e
},getSections:function(){return this.sections
},getContentTypeAbbreviation:function(){var c="";
if(this.contentType=="pfadx"){c="p"
}if(this.contentType=="adj"){c="j"
}if(this.contentType=="adi"){c="i"
}if(this.contentType=="adx"){c="x"
}if(this.contentType=="ad"){c="a"
}return c
},getExclusions:function(){return this.exclusions.join(";")
},isValidDcopt:function(f){var j=false;
if(this.isStr(f)){for(var h=0,g=btg.globalvars.VALID_DCOPT.length;
h<g;
h++){if(f==btg.globalvars.VALID_DCOPT[h]){j=true;
break
}}}return j
},formatReserved:function(){for(var h=this.keyValues,o=["dcmt","dcopt","dcove"],n=0,l=o.length;
n<l;
n++){if(h.indexOf(o[n]+"=")>-1){for(var k=this.getKeyValue(o[n]+"="),h=h.split(o[n]+"="+k),j=0,l=h.length;
j<l;
j++){h[j]=h[j].replace(/^;+|;+$/g,"")
}if(o[n]=="dcopt"&&this.isValidDcopt(k)!=true){this.keyValues=h.join(";");
return this.formatReserved()
}this.reservedKeyValues[o[n]]=k;
h=h.join(";")
}}if(h.lastIndexOf(";")==h.length-1){h=h.substring(0,h.length-1)
}return h
},getAdditionalKeyValues:function(){return this.additionalKeyValues.join(";")
},applyTestbedValues:function(){var c=btg.Cookie.read("mtvn_btg_atb");
if(c!=null&&c.indexOf("daDart:")>=0){c=c.split(",")[0].split(":")[1];
this.dartSite=c=="auto"?this.dartSite="atb_"+this.dartSite:c
}},getValues:function(){this.applyTestbedValues();
var e=this.isStr(this.zoneOverride)?this.zoneOverride:this.formatZone(),g=this.formatKeyValues(),f=this.formatSectionValues();
return{id:this.id,protocol:this.getProtocol(),server:this.server,dartSite:this.dartSite,contentType:this.contentType,mediaType:this.mediaType,zone:e,sections:f,keyValues:g,ord:this.ord}
},getRealWidth:function(){return this.realSize.substr(0,this.realSize.indexOf("x"))
},getRealHeight:function(){return this.realSize.substr(this.realSize.indexOf("x")+1,this.realSize.length)
},getWidth:function(){return this.size.substr(0,this.size.indexOf("x"))
},getHeight:function(){return this.size.substr(this.size.indexOf("x")+1,this.size.length)
},getUrl:function(){return this.formatUrl(this.getValues())
},getJson:function(){var c=this.getValues();
c.url=this.formatUrl(c);
return c
},getXml:function(){var e=[],g=this.getValues();
g.url=this.formatUrl(g);
for(var f in g){if(typeof(g[f]=="string")){e.push("<"+f+"></"+g[f]+">")
}}return"<DoubleClick>"+e.join("")+"</DoubleClick>"
},init:function(c){if(typeof c==="object"){if(this.isStr(c.zoneOverride)){this.setZoneOverride(c.zoneOverride)
}if(this.isStr(c.id)){this.setId(c.id)
}if(this.isStr(c.server)){this.setServer(c.server)
}if(this.isStr(c.ssl)){this.setSsl(c.ssl)
}if(this.isStr(c.dartSite)){this.setDartSite(c.dartSite)
}if(this.isStr(c.contentType)){this.setContentType(c.contentType)
}if(this.isStr(c.mediaType)){this.setMediaType(c.mediaType)
}if(this.isStr(c.position)){this.setPosition(c.position)
}if(this.isStr(c.sections)){this.setSections(c.sections)
}if(this.isStr(c.keyValues)){this.setKeyValues(c.keyValues)
}if(this.isStr(c.size)){this.setSize(c.size)
}else{this.setSize("[ERROR: Size Not Defined!]");
btg.Error.log("Coda ERROR: btg.DoubleClick: Size Not Defined!")
}if(this.isStr(c.realSize)){this.setRealSize(c.realSize)
}else{this.setRealSize(this.size)
}if(this.isStr(c.tile)){this.setTile(c.tile)
}if(this.isStr(c.positionThreshold)){this.setPositionThreshold(c.positionThreshold)
}if(this.isStr(c.ord)){this.setOrd(c.ord)
}if(this.isStr(c.partner)){this.setPartner(c.partner)
}}},createIframe:function(e){var g=document.getElementById(e.adId),f=null;
if(g){e.frameBorder="0";
e.marginHeight="0";
e.marginWidth="0";
e.scrolling="no";
e.onload=function(){btg.AdManager.adLoadNotify(this.id)
};
e.parent=g;
e.style={height:e.height+"px",width:e.width+"px","border-width":"0",overflow:"hidden"};
if(this.gv.IS_TOP_ACCESSIBLE&&this.qsToObj(top.location.search).mockupMode=="true"){e.parent=document.createElement("div");
f=btg.DOM.appendIframe(e);
g.innerHTML=this.mockItUp(f.parentNode.innerHTML)
}else{f=btg.DOM.appendIframe(e)
}f.setAttribute("allowtransparency",true)
}}};
btg.DomesticDc=function(){this.type="DomesticDc"
};
btg.DomesticDc.prototype={formatSectionValues:function(){try{var h=this.sections.split("/")
}catch(o){h=["[ERROR: Sections Not Defined!]"];
btg.Error.log("Coda ERROR: btg.DomesticDc: Sections Not Defined!")
}for(var n=0,l=[],k=0,j=h.length;
k<j;
k++){if(btg.String.isDefined(h[k])){l.push("sec"+n+"="+h[k]);
n++
}}return l.join(";")
},formatZone:function(){var e=this.getPosition()+"_"+this.getContentTypeAbbreviation()+"_"+this.mediaType.substr(0,1)+"/",g=this.getSections();
if(this.isStr(this.keyValues)){if(this.keyValues.indexOf("partner=")>-1){var f=this.getKeyValue("partner=");
if(this.isStr(f)&&f!="null"){e+=f+"/";
this.addExclusionCategory(f);
this.addExclusionCategory("partner")
}else{this.keyValues=this.keyValues.replace(/(partner=;)|partner=$/ig,"partner=null;")
}}if(this.keyValues.indexOf("vertical=")>-1){f=this.getKeyValue("vertical=");
if(this.isStr(f)){g=f+"/"+g;
this.setSections(g)
}}if(this.keyValues.indexOf("synd=")>-1){f=this.getKeyValue("synd=");
if(this.isStr(f)){this.addExclusionCategory(f)
}}}e=e.replace(/^\d/,"_"+e.match(/^\d/,"_"));
return e+g
},setDemoVal:function(){var c=btg.Cookie.read("qcDemo");
if((typeof btg.config!="undefined"&&typeof btg.config.QuantCast!="undefined"&&typeof btg.config.QuantCast.adsEnabled=="boolean"&&btg.config.QuantCast.adsEnabled?true:false)&&this.isStr(c)&&this.keyValues.indexOf("demo=D")==-1){this.keyValues+=";"+unescape(c)
}},formatKeyValues:function(){var c=this.getAdditionalKeyValues();
if(this.isStr(c)){this.keyValues+=";"+c
}if(this.keyValues.indexOf("pos=")==-1){this.keyValues+=";pos="+this.getPosition()
}if(this.keyValues.indexOf("tag=")==-1){this.keyValues+=";tag="+this.contentType
}if(this.keyValues.indexOf("mtype=")==-1){this.keyValues+=";mtype="+this.mediaType
}if(this.autoDcopt){this.removeKeyValue("dcopt");
if(this.tile=="1"){this.keyValues+=";dcopt=ist"
}}this.keyValues=this.formatReserved();
if(this.isStr(this.size)&&this.keyValues.indexOf("sz=")==-1){this.keyValues+=";sz="+this.size
}if(this.tile>=0&&this.keyValues.indexOf("tile=")==-1){this.keyValues+=";tile="+this.tile
}this.setDemoVal();
if(this.isStr(this.reservedKeyValues.dcmt)){this.keyValues+=";dcmt="+this.reservedKeyValues.dcmt
}if(this.isStr(this.reservedKeyValues.dcopt)){this.removeKeyValue("dcopt");
this.keyValues+=";dcopt="+this.reservedKeyValues.dcopt
}if(this.keyValues.indexOf(this.getExclusions())==-1&&this.exclusions.length>0){this.keyValues+=";"+this.getExclusions()
}if(this.isStr(this.reservedKeyValues.dcove)){this.keyValues+=";dcove="+this.reservedKeyValues.dcove
}if(this.gv.IS_TOP_ACCESSIBLE){c=this.qsToObj(top.location.search.toLowerCase()).testmode;
if(this.isStr(c)&&this.keyValues.toLowerCase().indexOf("testmode")<0){this.keyValues+=";testmode="+c
}}return this.keyValues=this.keyValues.replace(/^;+|;+$/g,"")
},placeAd:function(d){if(!this.isStr(this.id)){this.setId("ad"+this.tile)
}if(btg.config.defferedAdLoading){this.containerAdId=d.adId;
this.createIframe({allowtransparency:"true",id:this.id,name:this.id,width:this.getRealWidth(),height:this.getRealHeight(),src:this.getUrl(),adType:this.contentType,adId:d.adId})
}else{if(this.contentType=="adi"){var e='<iframe allowtransparency="true" onload="btg.AdManager.adLoadNotify(\''+this.id+'\');" id="'+this.id+'" name="'+this.id+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="'+this.getRealWidth()+'" height="'+this.getRealHeight()+'" src="'+this.getUrl()+'"></iframe>';
if(this.gv.IS_TOP_ACCESSIBLE&&this.qsToObj(top.location.search).mockupMode=="true"){e=this.mockItUp(e)
}if(this.isStr(d)&&this.isStr(d.reloadableAdId)){return e
}else{if(typeof exposeTestFunctionNames=="undefined"){document.write(e)
}}}else{e='<script type="text/javascript" id="'+this.id+"\" onreadystatechange=\"if(this.readyState=='complete')btg.AdManager.adLoadNotify('"+this.id+"');\" onload=\"btg.AdManager.adLoadNotify('"+this.id+'\');" src="'+this.getUrl()+'"><\/script>';
if(this.gv.IS_TOP_ACCESSIBLE&&this.qsToObj(top.location.search).mockupMode=="true"){e=this.mockItUp(e)
}if(this.isStr(d)&&this.isStr(d.reloadableAdId)){return e
}else{if(typeof exposeTestFunctionNames=="undefined"){document.write(e)
}}}}}};
btg.DomesticDc=btg.Class.inheritFrom(btg.DoubleClick,btg.DomesticDc);
btg.InternationalDc=function(){this.type="InternationalDc"
};
btg.InternationalDc.prototype={formatSectionValues:function(){var h=this.sections.split("/"),o="none",n="none",l="none",k=[];
if(this.isStr(h[0])){o=h[0]
}else{o="/"
}if(this.isStr(h[1])){n=h[1]
}if(this.isStr(h[2])){for(var l=2,j=h.length;
l<j;
l++){if(this.isStr(h[l])){k.push(h[l])
}}l=k.join("/")
}return"sec0="+o+";sec1="+n+";secN="+l
},formatZone:function(){var c=this.sections.split("/");
if(this.isStr(c[0])){c=c[0]
}else{c="/home"
}return c
},formatKeyValues:function(){var d=btg.AdManager,e=this.getAdditionalKeyValues();
if(this.isStr(e)){this.keyValues+=";"+e
}this.keyValues=this.formatReserved();
if(this.isStr(this.size)&&this.keyValues.indexOf("sz=")==-1){this.keyValues+=";sz="+this.size
}if(this.tile>=0&&this.keyValues.indexOf("tile=")==-1){this.keyValues+=";tile="+this.tile
}if(this.isStr(this.reservedKeyValues.dcmt)){this.keyValues+=";dcmt="+this.reservedKeyValues.dcmt
}if(this.autoDcopt&&this.tile=="1"){this.keyValues+=";dcopt=ist";
d.dcoptOn=true
}if(this.isStr(this.reservedKeyValues.dcopt)){if(d.dcoptOn){if(this.tile!="1"){btg.Error.log("Coda ERROR: btg.InternationalDc: Attempt to set dcopt value more than once per page!");
if(this.isDevEnv){this.keyValues+=";[ERROR: Attempt to set dcopt value more than once per page!]"
}}}else{this.keyValues+=";dcopt="+this.reservedKeyValues.dcopt;
d.dcoptOn=true
}}if(this.exclusions.length>0){this.keyValues+=";"+this.getExclusions()
}if(this.isStr(this.reservedKeyValues.dcove)){this.keyValues+=";dcove="+this.reservedKeyValues.dcove
}if(this.gv.IS_TOP_ACCESSIBLE){d=this.qsToObj(top.location.search.toLowerCase()).testmode;
if(this.isStr(d)&&this.keyValues.toLowerCase().indexOf("testmode")<0){this.keyValues+=";testmode="+d
}}return this.keyValues=this.keyValues.replace(/^;+|;+$/g,"")
},addInternationalValues:function(c){if(this.isStr(c.log)){this.addKeyValues("log="+c.log)
}else{this.addKeyValues("log=0")
}if(this.isStr(c.demo)){this.addKeyValues("demo="+c.demo)
}else{this.addKeyValues("demo=none")
}if(this.isStr(c.event)){this.addKeyValues("event="+c.event)
}else{this.addKeyValues("event=none")
}if(this.isStr(c.keyword)){this.addKeyValues("search_kw="+c.keyword)
}else{this.addKeyValues("search_kw=none")
}if(this.isStr(c.vid)){this.addKeyValues("vid="+c.vid)
}else{this.addKeyValues("vid=none")
}if(this.isStr(c.vid_type)){this.addKeyValues("vid_type="+c.vid_type)
}else{this.addKeyValues("vid_type=none")
}if(this.isStr(c.region)){this.addKeyValues("region="+c.region)
}else{this.addKeyValues("region=none")
}this.addKeyValues("dcove=d");
this.addKeyValues("url="+escape(location.pathname));
if(this.isStr(c.keyValues)){this.addKeyValues(c.keyValues)
}},placeAd:function(d){this.addInternationalValues(d);
if(!this.isStr(this.id)){this.setId("ad"+this.tile)
}if(btg.config.defferedAdLoading){this.createIframe({allowtransparency:"true",id:this.id,name:this.id,width:this.getRealWidth(),height:this.getRealHeight(),src:this.getUrl(),adType:this.contentType,adId:d.adId})
}else{if(this.contentType=="adi"){var e='<iframe allowtransparency="true" onload="btg.AdManager.adLoadNotify(\''+this.id+'\');" id="'+this.id+'" name="'+this.id+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="'+this.getRealWidth()+'" height="'+this.getRealHeight()+'" src="'+this.getUrl()+'"></iframe>';
if(this.gv.IS_TOP_ACCESSIBLE&&this.qsToObj(top.location.search).mockupMode=="true"){e=this.mockItUp(e)
}if(this.isStr(d)&&this.isStr(d.reloadableAdId)){return e
}else{if(typeof exposeTestFunctionNames=="undefined"){document.write(e)
}}}else{e='<script type="text/javascript" id="'+this.id+"\" onreadystatechange=\"if(this.readyState=='complete')btg.AdManager.adLoadNotify('"+this.id+"');\" onload=\"btg.AdManager.adLoadNotify('"+this.id+'\');" src="'+this.getUrl()+'"><\/script>';
if(this.gv.IS_TOP_ACCESSIBLE&&this.qsToObj(top.location.search).mockupMode=="true"){e=this.mockItUp(e)
}if(this.isStr(d)&&this.isStr(d.reloadableAdId)){return e
}else{if(typeof exposeTestFunctionNames=="undefined"){document.write(e)
}}}}}};
btg.InternationalDc=btg.Class.inheritFrom(btg.DoubleClick,btg.InternationalDc);
btg.SurrogateAd=new function(){var c={poe:{tile:"0",size:"6x6",cookieName:"vmn_poe",contentType:"adj",position:"btf"}};
this.load=function(g){if(btg.String.isDefined(g)&&btg.Object.isDefined(c[g])&&btg.Object.isConfigDefined(btg.config.DoubleClick)){var f=function(d){document.write('<script src="'+d+'"><\/script>')
},g=c[g];
g.isSurrogate=true;
if(btg.String.isDefined(g.cookieName)){if(btg.Cookie.read(g.cookieName)==null){var b=btg.AdManager.getAdUrl(g);
f(b);
btg.Cookie.set(g.cookieName,g.size)
}}else{b=btg.AdManager.getAdUrl(g);
f(b)
}}}
};
if(typeof mtvn=="undefined"){mtvn={}
}mtvn.btg={Controller:btg.Controller,managers:{DependencyManager:btg.DependencyManager,PluginManager:btg.PluginManager,QueueManager:btg.QueueManager},ads:{AdManager:btg.AdManager,games:{GameAdLoader:btg.GameAdLoader,GameAdManager:btg.GameAdManager,GameDc:btg.GameDc},freewheel:{FreeWheelAd:btg.FreeWheelAd,FreeWheelAdInterface:btg.FreeWheelAdInterface}},reporting:{ABTest:btg.ABTest,ChoiceStream:btg.ChoiceStream,ComScore:btg.ComScore,ESIVars:btg.ESIVars,FluxHosted:btg.FluxHosted,FluxState:btg.FluxState,GoogleAnalytics:btg.GoogleAnalytics,Nielsen:btg.Nielsen,Omniture:btg.Omniture,Photos:btg.Photos,QuantCast:btg.QuantCast,RecsABTesting:btg.RecsABTesting,ReportingManager:btg.ReportingManager,Search:btg.Search,SEO:btg.SEO,TestAndTarget:btg.TestAndTarget,UserSegment:btg.UserSegment,Demdex:btg.Demdex,omniture:{Hcode:btg.Hcode},player:{Loadtime:btg.Loadtime,MediaPlayer:btg.MediaPlayer,Preload:btg.Preload},games:{GameEventMediator:btg.GameEventMediator,GameEventVO:btg.GameEventVO,GameReporter:btg.GameReporter,GameReportingManager:btg.GameReportingManager}},util:{Alert:btg.Alert,Beacon:btg.Beacon,Class:btg.Class,Cookie:btg.Cookie,DOM:btg.DOM,Events:btg.Events,JSON:btg.JSON,Math:btg.Math,Object:btg.Object,String:btg.String,Timer:btg.Timer,TimeTracker:btg.TimeTracker,Window:btg.Window,Sections:btg.Sections},plugins:{GUID:btg.GUID,Meteor:btg.Meteor}};
if(typeof mtvn.btg.config=="undefined"){mtvn.btg.config={}
}if(typeof mtvn.btg.config.ReportSettings=="undefined"){mtvn.btg.config.ReportSettings={defaultPageName:btg.globalvars.PAGE_URL,Omniture:{},Nielsen:{},GoogleAnalytics:{},QuantCast:{},ComScore:{},Meteor:{},ChoiceStream:{},Demdex:{}}
}if(typeof mtvn.btg.config.AdSettings=="undefined"){mtvn.btg.config.AdSettings={DoubleClick:{},International:{},QuantCast:{}}
}if(typeof com=="undefined"){com={}
}if(typeof com.mtvi=="undefined"){com.mtvi={}
}if(typeof com.mtvi.reporting=="undefined"){com.mtvi.reporting={}
}if(typeof com.mtvi.ads=="undefined"){com.mtvi.ads={}
}if(typeof com.mtvi.config=="undefined"){com.mtvi.config={}
}if(typeof com.mtvi.util=="undefined"){com.mtvi.util={}
}if(typeof com.mtvi.util.IFrameReloader=="undefined"){com.mtvi.util.IFrameReloader={}
}if(typeof com.mtvi.metadata=="undefined"){com.mtvi.metadata={}
}com.mtvi.util={toObject:btg.String.toObject,queryStringToHash:btg.String.queryStringToObject,isDefined:btg.String.isDefined,readCookie:btg.Cookie.read,deleteCookie:btg.Cookie.remove,crawlNodes:btg.Window.getNodeLinkName,addOnloadEvent:function(c){return btg.DOM.Events.addListener(window,"load",c)
}};
com.mtvi.metadata={getDefaultPageName:function(){var e="",g=btg.globalvars;
try{e=g&&typeof g.PAGE_URL=="string"&&g.PAGE_URL!=""?g.PAGE_URL:location.pathname;
if(e.lastIndexOf("/")==e.length-1){if(mtvn.btg.util.String.isDefined(mtvn.btg.config.ReportSettings.indexFileName)){e+=mtvn.btg.config.ReportSettings.indexFileName
}else{e=e!="/"?mtvn.btg.util.String.charRtrim(e,"/"):e
}}if(e!="/"){e=mtvn.btg.util.String.charRtrim(e,"/")
}if(e!="/"&&e.indexOf("/")==0){e=e.substring(1)
}if(e.indexOf("/")==-1&&e.indexOf(mtvn.btg.config.ReportSettings.indexFileName)!=-1){e="home/"+e
}}catch(f){}return e
},getDefaultHierarchy:function(){var c=this.getDefaultPageName();
return c=="/"?"":c
},getDefaultChannel:function(){var c=this.getDefaultPageName();
return c!="/"?c.split("/")[0]:c
}};
com.mtvi.reporting.Controller=new function(){this.initalized=false;
this.initialize=function(){btg.Controller.init()
};
this.sendCall=function(c){btg.Controller.sendPageCall(c)
};
this.sendLinkEvent=function(c){btg.Controller.sendLinkEvent(c)
};
this.registerLinks=function(){return true
};
this.setConfig=function(d){for(var e in d){btg.config.Omniture[e]=d[e]
}return true
};
this.addRegisterLinks=function(){return true
};
this.setDefaultData=function(d,e){if(btg.String.isDefined(d)){btg.config.Omniture[d]=btg.String.isDefined(e)?e:"";
return true
}return false
}
};
com.mtvi.ads.AdManager=new function(){var f=btg.config.DoubleClick,j=btg.config.International,h=btg.String.isDefined,g=btg.Object.isDefined;
this.setDartSite=function(b){(f.enabled?f:j).dartSite=b
};
this.setPositionThreshold=function(b){(f.enabled?f:j).positionThreshold=b
};
this.setSiteName=function(b){(f.enabled?f:j).siteName=b
};
this.setDefaultSections=function(b){if(h(b)){f.sections=b
}};
this.setKeyValues=function(b){(f.enabled?f:j).keyValues=b
};
this.getFormattedSections=function(x){var w=x;
try{var w=x=="/"?x:btg.String.charTrim(x,"/"),u=x.length,q="index";
if(g(com.mtvi.reporting.Account)&&h(com.mtvi.reporting.Account.defaultIndexFileName)){q=com.mtvi.reporting.Account.defaultIndexFileName
}if(g(mtvn.btg.config.AdSettings)&&h(mtvn.btg.config.AdSettings.defaultIndexFileName)){q=mtvn.btg.config.AdSettings.defaultIndexFileName
}if(g(btg.config)&&h(btg.config.defaultIndexFileName)){q=btg.config.defaultIndexFileName
}for(var q=btg.String.stripFileExtension(q),t=["/",q,"home/"+q],n=0,e=t.length;
n<e;
n++){if(x.indexOf(t[n])==0&&u==t[n].length){w=x.replace(t[n],"_hp");
break
}}if(w==""){w="_hp"
}var d=btg.String.stripFileExtension(w).split("/");
if(d.length==2){if(d[1]==q){w=btg.String.stripFileExtension(w).replace(q,"_mn")
}}}catch(y){}return w
};
this.placeAd=function(c){btg.Controller.placeAd(c)
};
this.setServer=function(b){(f.enabled?f:j).server=b
};
this.setSsl=function(){(f.enabled?f:j).ssl=true
};
this.setDefaultContentType=function(b){(f.enabled?f:j).contentType=b
};
this.setZoneOverride=function(b){(f.enabled?f:j).zoneOverride=b
};
this.IFrameAds=[];
this.placeIFrameAd=function(c){c.isReloadable=true;
btg.Controller.placeAd(c)
};
this.setReloadInterval=function(c){btg.config.reloadInterval=c
};
this.setAdClass=function(){};
this.getAdById=function(){return null
};
this.getDartSite=function(){return(f.enabled?f:j).dartSite
};
this.getAd=function(c){return btg.AdManager.getAd(c)
};
this.getReloadInterval=function(){return btg.config.reloadInterval
};
this.reloadIFrameAds=function(){btg.Controller.reloadAds()
};
this.reloadIFrameAd=function(){};
this.setZone=function(){};
this.getNewAd=function(){};
this.populateNamesValuesObj=function(){}
};
com.mtvi.ads.DoubleClickAd=function(){};
com.mtvi.ads.DoubleClickAd.prototype={setZoneOverride:function(){},setDartSite:function(){},setOrd:function(){},placeAd:function(){},getXml:function(){return null
},getJson:function(){return null
},getUrl:function(){return null
},getSections:function(){return null
},setSize:function(){},setSections:function(){},setContentType:function(){},setKeyValues:function(){},setTile:function(){},setPositionThreshold:function(){},setServer:function(){},setSsl:function(){},setMediaType:function(){},setPosition:function(){},setPartner:function(){},setId:function(){}};
com.mtvi.reporting.ComScore=new function(){this.sendComScoreCall=function(){}
};
com.mtvi.reporting.Dispatcher=function(){this.getValOnce=function(){return true
};
this.sendCall=function(c){btg.Controller.sendPageCall(c)
};
this.sendLinkEvent=function(c){mtvn.btg.Controller.sendLinkEvent(c)
};
this.registerLinks=function(){return true
};
this.setAttribute=function(d,e){if(btg.String.isDefined(d)){btg.Hcode[d]=btg.String.isDefined(e)?e:"";
return true
}return false
};
this.getAttribute=function(c){return btg.config.Omniture[c]
};
this.setValues=function(d){for(var e in d){if(btg.String.isDefined(d[e])){this.setAttribute(e,d[e])
}}};
this.send=function(c){btg.Controller.sendPageCall(c)
};
this.setDefaultData=function(){};
this.clearProps=function(){};
this.clearAllVars=function(){}
};
com.mtvi.reporting.FluxWidgeted={setVars:function(){return true
}};
com.mtvi.reporting.GoogleAnalytics={makeCall:function(){(new btg.GoogleAnalytics(btg.GoogleAnalytics)).sendPageCall();
return true
}};
com.mtvi.reporting.MediaPlayer={addPlayer:btg.MediaPlayer.addPlayer};
mtvn.btg.reporting.MediaPlayer={setEndSlateClick:mtvn.btg.reporting.player.MediaPlayer.setEndSlateClick,getEndSlateClick:mtvn.btg.reporting.player.MediaPlayer.getEndSlateClick};
com.mtvi.reporting.QuantCast=new function(){this.sendQuantCastCall=function(){(new btg.QuantCast(btg.config.QuantCast)).sendPageCall();
return true
}
};
com.mtvi.reporting.Search=btg.Search;
com.mtvi.reporting.Search.setVars=btg.Search.setData;
btg.isCoreLoaded=function(){btg.Events.CORE_LOADED.fire();
btg.DOM.Events.addListener(document,"DOMContentLoaded",function(){this.dependencies=new btg.DependencyManager(4000);
this.dependencies.add("poe_loading",function(){return typeof vmn_btg_ESIVars!="undefined"
},500,true);
if(this.dependencies.hasDependency()){this.dependencies.addToCallQueue(this,function(){btg.SurrogateAd.load("poe")
})
}});
btg.SurrogateAd.load("poe");
return true
}();
com.mtvi.reporting.VideoCensus=new function(){var a=com.mtvi.util.isDefined;
var e="http://secure-us.imrworldwide.com/cgi-bin/m?";
var b="1";
var d=function(k){var f=[];
try{if(a(k.title)&&k.title.indexOf("dav0-")==-1){k.title="dav0-"+k.title
}if(a(k.videoCensusId)&&k.videoCensusId.indexOf("vc")==-1){k.videoCensusId="vc,"+k.videoCensusId
}if(a(k.streamType)&&k.streamType.indexOf("st")==-1){k.streamType="st,"+k.streamType
}if(a(k.programType)&&k.programType.indexOf("pt")==-1){k.programType="pt,"+k.programType
}}catch(j){}try{var h={ci:a(k.clientId)?k.clientId:"",si:a(k.streamUrl)?escape(k.streamUrl):"",tl:a(k.title)?escape(k.title):"",cg:a(k.section)?escape(k.section):"",c3:a(k.streamType)?k.streamType:"",c4:a(k.programType)?k.programType:"",c6:a(k.videoCensusId)?k.videoCensusId:"",cc:b,rnd:Math.ceil(Math.random()*1000000000)};
for(var g in h){if(a(h[g])){f.push(g+"="+h[g])
}}return e+f.join("&")
}catch(j){}};
var c=function(g){try{if(a(g)){var f=new Image(1,1);
f.src=g;
f.onload=function(){return
}
}}catch(h){}};
this.sendCall=function(g){try{if(a(g.clientId)){c(d(g))
}}catch(f){}}
};
function Configuration(orig){this.orig=orig;
this.setting={};
this.setting.name="";
this.setting.dynamicAccountSelection=false;
this.setting.dynamicAccountList="";
this.setting.linkInternalFilters="";
this.setting.trackExternalLinks=false;
this.setting.trackDownloadLinks=false;
this.setting.trackInlineStats=false;
this.setting.pageName="";
this.setting.hier2="";
this.setting.channel="";
this.setting.prop1="";
this.setting.prop2="";
this.setting.prop3="";
this.setting.prop4="";
this.setting.prop5="";
this.setting.prop6="";
this.setting.prop7="";
this.setting.prop8="";
this.setting.prop9="";
this.setting.prop10="";
this.setting.prop11="";
this.setting.prop12="";
this.setting.prop13="";
this.setting.prop14="";
this.setting.prop15="";
this.setting.prop16="";
this.setting.prop17="";
this.setting.prop18="";
this.setting.prop19="";
this.setting.prop20="";
this.setting.prop23="";
this.setting.prop24="";
this.setting.prop25="";
this.setting.prop26="";
this.setting.prop27="";
this.setting.prop28="";
this.setting.prop29="";
this.setting.prop30="";
this.setting.prop31="";
this.setting.prop32="";
this.setting.prop33="";
this.setting.prop34="";
this.setting.prop35="";
this.setting.prop36="";
this.setting.prop37="";
this.setting.prop38="";
this.setting.prop39="";
this.setting.prop40="";
this.setting.prop41="";
this.setting.prop42="";
this.setting.prop43="";
this.setting.prop44="";
this.setting.prop45="";
this.setting.prop46="";
this.setting.prop47="";
this.setting.prop48="";
this.setting.prop49="";
this.setting.prop50="";
this.setting.eVar1="";
this.setting.eVar2="";
this.setting.eVar3="";
this.setting.eVar4="";
this.setting.eVar5="";
this.setting.eVar6="";
this.setting.eVar7="";
this.setting.eVar8="";
this.setting.eVar9="";
this.setting.eVar10="";
this.setting.campaign="";
this.setting.events="";
this.setting.products="";
this.setting.lnk=false;
this.setting.linkType="";
this.setting.linkName="";
this.showPage=false;
this.videoSuite="";
this.init=function(){if(typeof this.orig!="undefined"){this.setting.name=this.orig.getName();
this.setting.dynamicAccountSelection=this.orig.isDynamicAccountSelection();
this.setting.dynamicAccountList=this.orig.getDynamicAccountList();
this.setting.linkInternalFilters=this.orig.getLinkInternalFilters();
this.setting.trackExternalLinks=this.orig.isTrackExternalLinks();
this.setting.trackDownloadLinks=this.orig.isTrackDownloadLinks();
this.setting.trackInlineStats=this.orig.isTrackInlineStats();
this.setting.pageName=this.orig.getPageName();
this.setting.hier1=this.orig.getHier1();
this.setting.hier2=this.orig.getHier2();
this.setting.channel=this.orig.getChannel();
this.setting.prop1=this.orig.getProp(1);
this.setting.prop2=this.orig.getProp(2);
this.setting.prop3=this.orig.getProp(3);
this.setting.prop4=this.orig.getProp(4);
this.setting.prop5=this.orig.getProp(5);
this.setting.prop6=this.orig.getProp(6);
this.setting.prop7=this.orig.getProp(7);
this.setting.prop8=this.orig.getProp(8);
this.setting.prop9=this.orig.getProp(9);
this.setting.prop10=this.orig.getProp(10);
this.setting.prop11=this.orig.getProp(11);
this.setting.prop12=this.orig.getProp(12);
this.setting.prop13=this.orig.getProp(13);
this.setting.prop14=this.orig.getProp(14);
this.setting.prop15=this.orig.getProp(15);
this.setting.prop16=this.orig.getProp(16);
this.setting.prop17=this.orig.getProp(17);
this.setting.prop18=this.orig.getProp(18);
this.setting.prop19=this.orig.getProp(19);
this.setting.prop20=this.orig.getProp(20);
this.setting.prop23=this.orig.getProp(23);
this.setting.prop24=this.orig.getProp(24);
this.setting.prop25=this.orig.getProp(25);
this.setting.prop26=this.orig.getProp(26);
this.setting.prop27=this.orig.getProp(27);
this.setting.prop28=this.orig.getProp(28);
this.setting.prop29=this.orig.getProp(29);
this.setting.prop30=this.orig.getProp(30);
this.setting.prop31=this.orig.getProp(31);
this.setting.prop32=this.orig.getProp(32);
this.setting.prop33=this.orig.getProp(33);
this.setting.prop34=this.orig.getProp(34);
this.setting.prop35=this.orig.getProp(35);
this.setting.prop36=this.orig.getProp(36);
this.setting.prop37=this.orig.getProp(37);
this.setting.prop38=this.orig.getProp(38);
this.setting.prop39=this.orig.getProp(39);
this.setting.prop40=this.orig.getProp(40);
this.setting.prop41=this.orig.getProp(41);
this.setting.prop42=this.orig.getProp(42);
this.setting.prop43=this.orig.getProp(43);
this.setting.prop44=this.orig.getProp(44);
this.setting.prop45=this.orig.getProp(45);
this.setting.prop46=this.orig.getProp(46);
this.setting.prop47=this.orig.getProp(47);
this.setting.prop48=this.orig.getProp(48);
this.setting.prop49=this.orig.getProp(49);
this.setting.prop50=this.orig.getProp(50);
this.setting.eVar1=this.orig.getEVar(1);
this.setting.eVar2=this.orig.getEVar(2);
this.setting.eVar3=this.orig.getEVar(3);
this.setting.eVar4=this.orig.getEVar(4);
this.setting.eVar5=this.orig.getEVar(5);
this.setting.eVar6=this.orig.getEVar(6);
this.setting.eVar7=this.orig.getEVar(7);
this.setting.eVar8=this.orig.getEVar(8);
this.setting.eVar9=this.orig.getEVar(9);
this.setting.eVar10=this.orig.getEVar(10);
this.setting.campaign=this.orig.getCampaign();
this.setting.events=this.orig.getEvents();
this.setting.products=this.orig.getProducts();
this.showPage=this.orig.isShowPage();
this.videoSuite=this.orig.getVideoSuite()
}};
this.getName=function(){return this.setting.name
};
this.setName=function(name){this.setting.name=name
};
this.isDynamicAccountSelection=function(){return this.setting.dynamicAccountSelection
};
this.setDynamicAccountSelection=function(das){this.setting.dynamicAccountSelection=das
};
this.getDynamicAccountList=function(){return this.setting.dynamicAccountList
};
this.setDynamicAccountList=function(dal){this.setting.dynamicAccountList=dal
};
this.getLinkInternalFilters=function(){return this.setting.linkInternalFilters
};
this.setLinkInternalFilters=function(lif){this.setting.linkInternalFilters=lif
};
this.isTrackExternalLinks=function(){return this.setting.trackExternalLinks
};
this.setTrackExternalLinks=function(tel){this.setting.trackExternalLinks=tel
};
this.isTrackDownloadLinks=function(){return this.setting.trackDownloadLinks
};
this.setTrackDownloadLinks=function(tdl){this.setting.trackDownloadLinks=tdl
};
this.isTrackInlineStats=function(){return this.setting.trackInlineStats
};
this.setTrackInlineStats=function(tns){this.setting.trackInlineStats=tns
};
this.getPageName=function(){return this.setting.pageName
};
this.setPageName=function(pagename){this.setting.pageName=pagename
};
this.getHier1=function(){return this.setting.hier1
};
this.setHier1=function(hier1){this.setting.hier1=hier1
};
this.getHier2=function(){return this.setting.hier2
};
this.setHier2=function(hier2){this.setting.hier2=hier2
};
this.getChannel=function(){return this.setting.channel
};
this.setChannel=function(chan){this.setting.channel=chan
};
this.isShowPage=function(){return this.showPage
};
this.setShowPage=function(isSP){this.showPage=isSP
};
this.getVideoSuite=function(){return this.videoSuite
};
this.setVideoSuite=function(vs){this.videoSuite=vs
};
this.getProp=function(n){return(eval("this.setting.prop"+n))
};
this.setProp=function(n,value){eval("this.setting.prop"+n+'="'+value+'"')
};
this.getEVar=function(n){return(eval("this.setting.eVar"+n))
};
this.setEVar=function(n,value){eval("this.setting.eVar"+n+'="'+value+'"')
};
this.getCampaign=function(){return this.setting.campaign
};
this.setCampaign=function(c){this.setting.campaign=c
};
this.getEvents=function(){return this.setting.events
};
this.setEvents=function(e){this.setting.events=e
};
this.getProducts=function(){return this.setting.products
};
this.setProducts=function(p){this.setting.products=p
};
this.isLink=function(){return this.setting.lnk
};
this.setLink=function(lnk){this.setting.lnk=lnk
};
this.getLinkType=function(){return this.setting.linkType
};
this.setLinkType=function(linkType){this.setting.linkType=linkType
};
this.getLinkName=function(){return this.setting.linkName
};
this.setLinkName=function(linkName){this.setting.linkName=linkName
}
};
if(typeof KIDS=="undefined"||!KIDS){var KIDS={}
}KIDS.namespace("reporting.omnifunctions");
$(document).bind("loggedIn",function(){KIDS.reporting.omnifunctions.sendLogin("Complete")
});
KIDS.reporting.omnifunctions.DOSstaus="";
$(document).ready(function(){if(typeof NICK.kca!="undefined"){if(typeof NICK.kca.dos!="undefined"){$(document).bind(NICK.kca.dos.EVENT_HOMEPAGE_TAKEOVER,function(){if(NICK.kca.dos.CURRENT_SHOW_STATE==NICK.kca.dos.SHOW_STATUS_ORANGE){KIDS.reporting.omnifunctions.KCA2012OrangeCarpetOn();
KIDS.ads.refresh.KCAOrangeCarpetOn()
}else{if(NICK.kca.dos.CURRENT_SHOW_STATE==NICK.kca.dos.SHOW_STATUS_LIVE){KIDS.reporting.omnifunctions.KCA2012LiveShowOn();
KIDS.ads.refresh.KCALiveShowOn()
}}});
$(document).bind(NICK.kca.dos.EVENT_DOS_OFF,function(){KIDS.reporting.omnifunctions.KCA2012LiveShowOff();
KIDS.ads.refresh.KCALiveShowOff()
})
}}});
KIDS.reporting.omnifunctions.sendReportingCall=function(b){try{if(b==null){b=KIDS.reporting.config
}var a=btg.config.Omniture.account;
if(com.mtvi.util.isDefined(b.setting.name)){btg.config.Omniture.account=b.setting.name
}btg.Controller.init();
if(typeof KIDS.reporting.abTest!="undefined"){var c=new btg.ABTest(KIDS.reporting.abTest.abtestId,KIDS.reporting.abTest.abtestGroups);
KIDS.reporting.abTest.currentGroup=c.getGroup();
KIDS.utils.doLog("abTest.getGroup():"+KIDS.reporting.abTest.currentGroup);
if(KIDS.reporting.abTest.currentGroup.indexOf("Control")>-1){b.setting.prop32="NickRec Impression"
}else{b.setting.prop32="CS Impression"
}}btg.Controller.sendPageCall(b.setting);
if(com.mtvi.util.isDefined(b.setting.name)){btg.config.Omniture.account=a
}btg.Controller.init()
}catch(d){KIDS.utils.doLog(d.toString())
}};
KIDS.reporting.omnifunctions.sendLinkEvent=function(d,b){try{var a=btg.config.Omniture.account;
if(com.mtvi.util.isDefined(d)){btg.config.Omniture.account+=","+d;
btg.Controller.init()
}btg.Controller.sendLinkEvent({linkName:b,linkType:"o"});
if(com.mtvi.util.isDefined(d)){btg.config.Omniture.account=a;
btg.Controller.init()
}}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.sendAnalyticsEvent=function(c,a){try{if(com.mtvi.util.isDefined(a)){KIDS.reporting.omnifunctions.sendLinkEvent(c,a)
}}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.pageNameAppend=function(c){try{var b=new Configuration();
b.init();
var a=KIDS.reporting.config.getPageName();
b.setPageName(a+"-"+c);
KIDS.reporting.omnifunctions.sendReportingCall(b);
KIDS.reporting.omnifunctions.comscoreReport("comscore")
}catch(d){KIDS.utils.doLog(d.toString())
}};
KIDS.reporting.omnifunctions.pageNameReset=function(b){try{var a=new Configuration();
a.init();
a.setPageName(KIDS.reporting.domain+"/"+b);
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.kcaVoteEvent=function(b){try{var d=NICK.kca.getProgress();
var a=d.split("|");
var f="event80";
if(a.length>0){if(a.length!=9){f+=",event"+(80+a.length)
}else{f+=",event69"
}}btg.Controller.sendLinkEvent({linkName:"KCA Voting:"+NICK.kca.getSavedCategory(),linkType:"o",events:f})
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.searchSetConversion=function(){try{if(com){com.mtvi.reporting.Search.setConversion()
}}catch(a){KIDS.utils.doLog(a.toString())
}};
KIDS.reporting.omnifunctions.reportCoverFlowImpression=function(c,b){try{}catch(a){KIDS.utils.doLog(a.toString())
}};
KIDS.reporting.omnifunctions.reportCoverFlowClickThru=function(c,b){try{}catch(a){}};
KIDS.reporting.omnifunctions.sendInitCall=function(c,b,a){elementString=c+"-"+b+"-"+a;
linkName="/init_click_tracking/"+elementString;
KIDS.reporting.omnifunctions.sendLinkEvent(null,linkName)
};
KIDS.reporting.omnifunctions.trackEvent=function(b){try{var a=new Configuration(KIDS.reporting.config);
a.init();
a.setPageName(a.getPageName()+"/event-"+b);
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.trackKCA=function(a){};
KIDS.reporting.omnifunctions.trackGamePlay=function(c,a){try{var b=new Configuration(KIDS.reporting.config);
b.init();
b.setPageName(b.getPageName()+"/event-"+c);
b.setProp(4,a);
KIDS.reporting.omnifunctions.sendReportingCall(b)
}catch(d){KIDS.utils.doLog(d.toString())
}};
KIDS.reporting.omnifunctions.bghReport=function(b){try{KIDS.reporting.account.name=suiteID;
var a=new Configuration(KIDS.reporting.config);
a.init();
a.setPageName(a.getPageName()+"-"+b);
a.setHier2(a.getPageName());
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.fetchGamePlaySite=function(b){var c=new RegExp("(nick)(?:-(?:jd|d|jq|q).mtvi)?.com","gi");
var a=c.exec(b);
if(a){if(b.indexOf("spongebob.")>-1){return("spongebob")
}else{if(b.indexOf("nickatnite.")>-1){return("nickatnite")
}else{if(b.indexOf("nicktoons.")>-1){return("nicktoons")
}else{if(b.indexOf("teennick.")>-1){return("teennick")
}else{return("nick")
}}}}}else{c=new RegExp("(nickjr)(?:-[dq].mtvi)?.com","gi");
a=c.exec(b);
if(a){if(b.indexOf("/playtime/")>0){return("playtime")
}return(a[1])
}else{c=new RegExp("(noggin)(?:-[dq].mtvi)?.com","gi");
a=c.exec(b);
if(a){return(a[1])
}else{c=new RegExp("(shockwave|addictinggames|the-n).*.com","gi");
a=c.exec(b);
if(a){return(a[1])
}else{c=new RegExp("(nickatnite)(?:-[dq].mtvi)?.com","gi");
a=c.exec(b);
if(a){return("nickatnite")
}else{c=new RegExp(":909","gi");
a=c.exec(b);
if(a){return("nick-localhost")
}else{return(null)
}}}}}}};
KIDS.reporting.omnifunctions.trackKidsGamePlay=function(f){try{var b=new Configuration();
b.init();
var a=KIDS.reporting.omnifunctions.fetchGamePlaySite(document.URL);
var c="viakidsgameplay";
b.setName(c);
b.setDynamicAccountSelection(false);
b.setChannel(a);
b.setHier1(a+"/"+f);
b.setHier2("");
b.setProp(1,b.getHier1());
b.setProp(2,f);
b.setProp(3,a);
KIDS.reporting.omnifunctions.sendReportingCall(b)
}catch(d){}};
KIDS.reporting.omnifunctions.clearDispatcherEVars=function(b){try{var a=(com.mtvi.reporting.Controller.initalized?btg.reporting.omniture.Hcode:btg.config.ReportSettings.Omniture);
for(var c=b;
c>0;
c--){a["eVar"+c]=""
}}catch(d){KIDS.utils.doLog("KIDS.reporting.omnifunctions.clearDispatcherEVars failed:"+d)
}};
KIDS.reporting.omnifunctions.doShowTemplateAction=function(a){try{KIDS.reporting.omnifunctions.pageNameAppend(a);
changeAd(a)
}catch(b){}};
KIDS.reporting.omnifunctions.sendMyNickItem=function(a){linkName="/myNick/itemAdd/"+a;
KIDS.reporting.omnifunctions.sendLinkEvent("",linkName)
};
KIDS.reporting.omnifunctions.BGHPledgeReporting=function(d,g){try{var a=new Configuration(KIDS.reporting.config);
a.init();
var b;
var c;
if(d!=null&&g!=null){b="/"+d+"/"+g+"/viaWeb";
c="/"+g+"/"+d+"/viaWeb"
}a.setPageName(a.getPageName()+b);
a.setHier2(a.getHier2()+c);
KIDS.reporting.omnifunctions.sendReportingCall(a);
KIDS.reporting.omnifunctions.comscoreReport("comscore")
}catch(f){}};
KIDS.reporting.omnifunctions.comscoreReport=function(a){try{var c='<iframe id="'+a+'" src="/ad/comscore" style="overflow:hidden;margin:0px;padding:0px;display:none;" scrolling="no" width="1" height="1" frameborder="0"></iframe>';
if($("#"+a).length){$("#"+a).replaceWith(c)
}else{$(c).appendTo("body")
}}catch(b){}};
KIDS.reporting.omnifunctions.pageNameAppendNicktoons=function(b){try{var a=new Configuration(KIDS.reporting.config);
a.init();
if(b!=null&&b.length>0){b="-"+b
}a.setName("nickvia");
a.setPageName(a.getPageName()+b);
KIDS.reporting.omnifunctions.sendReportingCall(a);
KIDS.reporting.omnifunctions.comscoreReport("comscore")
}catch(c){}};
KIDS.reporting.omnifunctions.reportKCA=function(){try{var a=new Configuration(KIDS.reporting.config);
a.init();
a.setPageName(KIDS.reporting.domain+"/kids-choice-awards/overlay_voting/"+a.getChannel());
a.setHier2(a.getPageName());
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){}};
KIDS.reporting.omnifunctions.mashupReporting=function(b){try{var a=new Configuration(KIDS.reporting.config);
a.init();
a.setPageName(a.getPageName()+"/mashups/"+b);
a.setHier1("turbonick/mashups/"+b);
a.setName("nickvia");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(c){}};
KIDS.reporting.omnifunctions.nanPrint=function(b,f,d,a){try{KIDS.reporting.omnifunctions.reportPrint(b,f,d,a)
}catch(c){}};
KIDS.reporting.omnifunctions.printTracker=function(b,f,d,a){try{KIDS.reporting.omnifunctions.reportPrint(b,f,d,a)
}catch(c){}};
KIDS.reporting.omnifunctions.printReporting=function(b,c,g,f,a){try{KIDS.reporting.omnifunctions.reportPrint(c,g,f,a)
}catch(d){}};
KIDS.reporting.omnifunctions.reportPrint=function(b,k,j,g){try{var c="viakfprint";
var a=KIDS.reporting.omnifunctions.fetchGamePlaySite(document.URL);
var f=new Configuration(KIDS.reporting.config);
f.init();
f.setName(c);
f.setPageName(a+"-"+k+"-"+j+"-"+b);
f.setChannel(a);
f.setHier1(a+"/"+k+"/"+j+"/"+b);
f.setHier2(f.getHier1());
f.setProp(1,g);
f.setProp(2,a);
f.setProp(3,k);
f.setProp(4,j);
f.setProp(5,b);
KIDS.reporting.omnifunctions.sendReportingCall(f);
var h='<img src="http://ad.doubleclick.net/ad/nick.nol/hp_printables;adid=230867644;sz=1x1;ord=123;"/>';
$(h).appendTo("body")
}catch(d){}};
KIDS.reporting.omnifunctions.oldReportingCall=function(b){try{var a=new Configuration(KIDS.reporting.config);
a.init();
var d=b.setOverrides;
KIDS.reporting.omnifunctions.omniSetOverrides(d,"overwrite",a);
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(c){}};
KIDS.reporting.omnifunctions.omniSetOverrides=function(f,g,a){try{for(i in f){var b=i.replace(/s_/,"");
b=(b=="account")?"name":b;
a.setting[b]=f[i];
if(b=="name"){if(g){if(g=="append"){var c=new RegExp("^"+ro[b]+"$|^"+ro[b]+",|,"+ro[b]+"$|,"+ro[b]+",");
if(!c.test(KIDS.reporting.config.getName())){a.setName(KIDS.reporting.config.getName()+","+a.getName())
}}}}}}catch(d){}};
KIDS.reporting.omnifunctions.sendLinkCall=function(d,a){try{var b=unescape(d);
if(a){if(a.setOverrides.name){KIDS.reporting.omnifunctions.sendLinkEvent(a.setOverrides.name,b)
}else{if(a.setOverrides.s_account){KIDS.reporting.omnifunctions.sendLinkEvent(a.setOverrides.s_account,b)
}}}else{KIDS.reporting.omnifunctions.sendLinkEvent(null,b)
}}catch(c){}};
KIDS.reporting.omnifunctions.reloadEvent=function(b){try{var a=new Configuration(KIDS.reporting.config);
a.init();
a.setPageName(a.getPageName()+"-"+b);
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(c){KIDS.utils.doLog("KIDS.reporting.omnifunctions.reloadEvent failed:"+c)
}};
KIDS.reporting.omnifunctions.updateRefreshAds=function(l,b,n){try{KIDS.ads.refresh.stopRefreshing();
KIDS.ads.refresh.ord=Math.random()*1000000000000000000;
KIDS.ads.refresh.cat=Math.floor(Math.random()*(KIDS.ads.refresh.maxSponsor-KIDS.ads.refresh.minSponsor+1)+KIDS.ads.refresh.minSponsor);
var c=n.split(";");
for(var h=0;
h<c.length;
h++){for(var f=0;
f<KIDS.ads.refresh.IFrameAds.length;
f++){if(KIDS.ads.refresh.IFrameAds[f].containerId==c[h]){var a=KIDS.ads.refresh.IFrameAds[f].src;
if(a.indexOf("ord=")>-1){a=a.split("ord=")[0]+"ord="+KIDS.ads.refresh.ord+"?"
}var k=new RegExp("(^.*cat=)\\d+(;.*$)");
var o=k.exec(a);
a=(o.length==3)?o[1]+KIDS.ads.refresh.cat+o[2]:a;
l=l.toLowerCase();
if(b.indexOf(".")>-1){b=b.substring(0,b.indexOf(".")).replace(/[- ]/gi,"_")
}if(a.indexOf(l+"=")>-1){var g=a.split(l+"=");
a=g[0]+l+"="+b+g[1].substr(g[1].indexOf(";"))
}else{var g=a.split("sz=");
a=g[0]+l+"="+b+";sz="+g[1]
}KIDS.ads.refresh.IFrameAds[f].src=a;
$("#"+KIDS.ads.refresh.IFrameAds[f].id).attr("src","");
$("#"+KIDS.ads.refresh.IFrameAds[f].id).attr("src",KIDS.ads.refresh.IFrameAds[f].src);
var d=document.getElementById("gameSwf");
if(d){d.focus()
}}}}}catch(m){KIDS.utils.doLog("KIDS.reporting.omnifunctions.updateRefreshAds failed:"+m)
}};
KIDS.reporting.omnifunctions.teennickShareEvent=function(a){try{KIDS.reporting.omnifunctions.sendLinkCall("Share "+KIDS.get("urlAlias")+" on "+a,"")
}catch(b){}};
KIDS.reporting.omnifunctions.teennickFacebookConnect=function(){try{KIDS.reporting.omnifunctions.sendLinkCall("Facebook Connect Button Clicked","")
}catch(a){}};
KIDS.reporting.omnifunctions.tabReporting=function(c,d,a){try{KIDS.reporting.omnifunctions.sendLinkCall(c+" "+d+" tab: "+a+" clicked","")
}catch(b){}};
KIDS.reporting.omnifunctions.teennickSendLogin=function(){try{var a=new Configuration();
a.init();
a.setName("the-n");
a.setDynamicAccountSelection(true);
a.setDynamicAccountList("the-ndev=teennick-d.mtvi.com,teennick-q.mtvi.com");
a.setLinkInternalFilters("javascript:,teennick.com");
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName("/LoginComplete");
a.setHier2("LoginComplete");
a.setEvents("event4");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){}};
KIDS.reporting.omnifunctions.sendUsernameTaken=function(){try{var a="Registration: Username Taken Error";
mtvn.btg.Controller.sendLinkEvent({linkName:a,linkType:"o",prop29:"Registration: Username Taken Error"})
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendLogin=function(b){try{if(b=="Popup"){var a=new Configuration();
a.init();
a.setName(KIDS.reporting.config.getName());
a.setDynamicAccountSelection(true);
a.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
a.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName("Login - "+b);
a.setProp("1",KIDS.reporting.site);
a.setEVar("1",KIDS.reporting.site);
a.setProp("17","Login");
a.setEVar("17","Login");
a.setHier2("Login/"+b);
a.setChannel("Login");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}if(b=="Complete"){btg.Controller.sendLinkEvent({linkName:"Login Complete",events:"event3",linkType:"o"})
}}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.sendReg=function(b){try{var a=new Configuration();
a.init();
a.setName(KIDS.reporting.config.getName());
a.setDynamicAccountSelection(true);
a.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
a.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName(KIDS.reporting.domain+"/Registration -"+b);
if(b=="Registration Complete"){a.setEvents("event1")
}a.setHier2(KIDS.reporting.domain+"/Registration/"+b);
a.setChannel("Registration");
a.setProp("1",KIDS.reporting.site);
a.setEVar("1",KIDS.reporting.site);
a.setProp("17","Registration-Signup");
a.setEVar("17","Registration-Signup");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.sendForgotPassword=function(){try{var a=new Configuration();
a.init();
a.setName(KIDS.reporting.config.getName());
a.setDynamicAccountSelection(true);
a.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
a.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName(KIDS.reporting.domain+"/Login - Forgot Password");
a.setHier2(a.getPageName());
a.setChannel("Login");
a.setProp("1",KIDS.reporting.site);
a.setEVar("1",KIDS.reporting.site);
a.setProp("17","Login");
a.setEVar("17","Login");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.gameBuilderCreated=function(c){try{var a=new Configuration();
a.init();
a.setName(KIDS.reporting.config.getName());
a.setDynamicAccountSelection(true);
a.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
a.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName(KIDS.reporting.domain+"/games/GameBuilder Game Created - "+c);
a.setHier1(KIDS.reporting.domain+"games/gamebuilder/"+c+"/GameCreated");
a.setHier2(KIDS.reporting.domain+"games/gamebuilder/"+c+"/GameCreated");
a.setChannel("games");
a.setEvents("event17");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){}};
KIDS.reporting.omnifunctions.gameBuilderPlayed=function(c){try{var a=new Configuration();
a.init();
a.setName(KIDS.reporting.config.getName());
a.setDynamicAccountSelection(true);
a.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
a.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName(KIDS.reporting.domain+"/games/GameBuilder Game Played - "+c);
a.setProp(4,"GameBuilder Game - "+c);
a.setHier1(KIDS.reporting.domain+"games/gamebuilder/"+c+"/GamePlayed");
a.setHier2(KIDS.reporting.domain+"games/gamebuilder/"+c+"/GamePlayed");
a.setChannel("games");
a.setEvents("event18");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){}};
KIDS.reporting.omnifunctions.gameBuilderTested=function(c){try{var a=new Configuration();
a.init();
a.setName(KIDS.reporting.config.getName());
a.setDynamicAccountSelection(true);
a.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
a.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName(KIDS.reporting.domain+"/games/GameBuilder Game Tested - "+c);
a.setHier1(KIDS.reporting.domain+"games/gamebuilder/"+c+"/GameTested");
a.setHier2(KIDS.reporting.domain+"games/gamebuilder/"+c+"/GameTested");
a.setChannel("games");
a.setEvents("event19");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){}};
KIDS.reporting.omnifunctions.gameBuilderSaved=function(c){try{var a=new Configuration();
a.init();
a.setName(KIDS.reporting.config.getName());
a.setDynamicAccountSelection(true);
a.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
a.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName(KIDS.reporting.domain+"/games/GameBuilder Game Saved - "+c);
a.setHier1(KIDS.reporting.domain+"games/gamebuilder/"+c+"/GameSaved");
a.setHier2(KIDS.reporting.domain+"games/gamebuilder/"+c+"/GameSaved");
a.setChannel("games");
a.setEvents("event20");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){}};
KIDS.reporting.omnifunctions.gameBuilderPublished=function(c){try{var a=new Configuration();
a.init();
a.setName(KIDS.reporting.config.getName());
a.setDynamicAccountSelection(true);
a.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
a.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName(KIDS.reporting.domain+"/games/GameBuilder Game Published - "+c);
a.setHier1(KIDS.reporting.domain+"/games/gamebuilder/"+c+"/GamePublished");
a.setHier2(KIDS.reporting.domain+"/games/gamebuilder/"+c+"/GamePublished");
a.setChannel("games");
a.setEvents("event22");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){}};
KIDS.reporting.omnifunctions.redeemAward=function(b){try{linkName=KIDS.reporting.config.getPageName()+"-Redeem"+b;
KIDS.reporting.omnifunctions.sendLinkEvent("",linkName)
}catch(a){KIDS.utils.doLog(a.toString())
}};
KIDS.reporting.omnifunctions.redeemKCAAvatar=function(){try{KIDS.reporting.omnifunctions.redeemAward("KCAAvatar")
}catch(a){KIDS.utils.doLog(a.toString())
}};
KIDS.reporting.omnifunctions.redeemKCAStarLoungeCode=function(){try{KIDS.reporting.omnifunctions.redeemAward("KCAStarLoungeCode")
}catch(a){KIDS.utils.doLog(a.toString())
}};
KIDS.reporting.omnifunctions.redeemFridayFreebie=function(a){try{KIDS.reporting.omnifunctions.redeemAward("FridayFreebie-"+a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.gameAchievementEarned=function(c,f,a){try{prop24="";
if(a==true){prop24=c+" - "+f
}var b=new Configuration();
b.init();
b.setName(KIDS.reporting.config.getName());
b.setDynamicAccountSelection(true);
b.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
b.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
b.setTrackExternalLinks(true);
b.setTrackDownloadLinks(true);
b.setTrackInlineStats(true);
b.setProp(23,c+" - "+f);
b.setProp(24,prop24);
b.setPageName(KIDS.reporting.domain+"/games/Game Achievements/Badge Earned");
b.setHier1(KIDS.reporting.domain+"games/Game Achievements/Badge Earned/"+f);
b.setHier2(KIDS.reporting.domain+"games/Game Achievements/Badge Earned/"+f);
b.setChannel("games");
KIDS.reporting.omnifunctions.sendReportingCall(b)
}catch(d){}};
KIDS.reporting.omnifunctions.gameAchievementLogin=function(b,a,k,j,h,g,f){try{if(a!=""){a=b+" - "+a
}if(k!=""){k=b+" - "+k
}if(j!=""){j=b+" - "+j
}if(h!=""){h=b+" - "+h
}if(g!=""){g=b+" - "+g
}if(f!=""){f=b+" - "+f
}var d=new Configuration();
d.init();
d.setName(KIDS.reporting.config.getName());
d.setDynamicAccountSelection(true);
d.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
d.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
d.setTrackExternalLinks(true);
d.setTrackDownloadLinks(true);
d.setTrackInlineStats(true);
d.setPageName(KIDS.reporting.domain+"/games/Game Achievements/Login Conversion");
d.setProp(24,a+","+k+","+j+","+h+","+g+","+f);
d.setHier1(KIDS.reporting.domain+"games/Game Achievements/Login Conversion");
d.setHier2(KIDS.reporting.domain+"games/Game Achievements/Login Conversion");
d.setChannel("games");
KIDS.reporting.omnifunctions.sendReportingCall(d)
}catch(c){}};
KIDS.reporting.omnifunctions.gameEventMap=function(b){try{var g=KIDS.get("urlAlias")+" - ";
b=b.toLowerCase();
var a=b.split("_");
var d=a.length;
for(var c=0;
c<d;
c++){g=g+a[c].charAt(0).toUpperCase()+a[c].substring(1);
if(c!=d-1){g+=" "
}}return g
}catch(f){}};
KIDS.reporting.omnifunctions.channelOverride=function(a,c){try{var b=new Configuration();
b.init();
b.setName(KIDS.reporting.config.getName());
b.setDynamicAccountSelection(true);
b.setDynamicAccountList(KIDS.reporting.config.getDynamicAccountList());
b.setLinkInternalFilters(KIDS.reporting.config.getLinkInternalFilters());
b.setTrackExternalLinks(true);
b.setTrackDownloadLinks(true);
b.setTrackInlineStats(true);
b.setPageName(KIDS.reporting.domain+c);
b.setChannel(a);
KIDS.reporting.omnifunctions.sendReportingCall(b)
}catch(d){}};
KIDS.reporting.omnifunctions.choiceStreamRecommendationsClick=function(){try{if(typeof KIDS.reporting.abTest!="undefined"){if(KIDS.reporting.abTest.currentGroup.indexOf("Control")<0){var a=KIDS.reporting.config.getPageName()+"/ChoiceStreamRecommendationClicked";
btg.Controller.sendLinkEvent({linkName:a,linkType:"o",events:"event40",prop32:"CS Click"})
}else{var a=KIDS.reporting.config.getPageName()+"/NickRecommendationClicked";
btg.Controller.sendLinkEvent({linkName:a,linkType:"o",prop32:"NickRec Click"})
}}}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.kca2012MissionOverlay=function(){try{var a=new Configuration();
a.init();
a.setPageName("nick.com/KCAMissionOverlay");
a.setChannel("kca");
a.setProp(1,"kca");
a.setEVar(1,"kca");
a.setProp(17,"Extras");
a.setEVar(17,"Extras");
a.setEVar(16,"nick.com/KCAMissionOverlay");
a.setHier2("nick.com/KCAMissionOverlay");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.kca2012SlimeCollected=function(){try{var a=new Configuration();
a.init();
a.setPageName("nick.com/KCASlimePoints");
a.setChannel("kca");
a.setProp(1,"kca");
a.setEVar(1,"kca");
a.setProp(17,"Extras");
a.setEVar(17,"Extras");
a.setEVar(16,"nick.com/KCASlimePoints");
a.setHier2("nick.com/KCASlimePoints");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){}};
KIDS.reporting.omnifunctions.kca2012Unlockable=function(a){try{btg.Controller.sendLinkEvent({linkName:"KCADigitalGift"+a,linkType:"o"});
$(document).trigger("KCADigitalGift")
}catch(b){}};
KIDS.reporting.omnifunctions.reportNavBar=function(d){try{var b=d.split(" ");
for(var a=0;
a<b.length;
a++){if(b[a].indexOf("nick-momma")>-1){btg.Controller.sendLinkEvent({linkName:b[a],linkType:"o"})
}}}catch(c){KIDS.utils.doLog('KIDS.reporting.omnifunctions.reportNavBar("'+d+'"):'+c.toString())
}};
KIDS.reporting.omnifunctions.KCA2012OrangeCarpetOn=function(){try{var a=new Configuration();
a.init();
a.setChannel("Homepage");
a.setProp(1,"kca");
a.setEVar(1,"kca");
a.setProp(11,"kca");
a.setEVar(11,"kca");
a.setProp(17,"Homepage");
a.setEVar(17,"Homepage");
a.setEVar(16,"nick.com/KCA DOS Orange Carpet On");
a.setPageName("nick.com/KCA DOS Orange Carpet On");
a.setHier2("index.html");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.KCA2012LiveShowOn=function(){try{var a=new Configuration();
a.init();
a.setChannel("Homepage");
a.setProp(1,"kca");
a.setEVar(1,"kca");
a.setProp(11,"kca");
a.setEVar(11,"kca");
a.setProp(17,"Homepage");
a.setEVar(17,"Homepage");
a.setEVar(16,"nick.com/KCA DOS Live Show On");
a.setPageName("nick.com/KCA DOS Live Show On");
a.setHier2("index.html");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.KCA2012LiveShowOff=function(){try{var a=new Configuration();
a.init();
a.setChannel("Homepage");
a.setProp(1,"kca");
a.setEVar(1,"kca");
a.setProp(11,"kca");
a.setEVar(11,"kca");
a.setProp(17,"Homepage");
a.setEVar(17,"Homepage");
a.setEVar(16,"nick.com/KCA DOS Live Show Off");
a.setPageName("nick.com/KCA DOS Live Show Off");
a.setHier2("index.html");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.KCA2012LiveVoteVoted=function(){try{btg.Controller.sendLinkEvent({linkName:"KCA Live Vote",linkType:"o",events:"event75"})
}catch(a){KIDS.utils.doLog(a.toString())
}};
KIDS.reporting.omnifunctions.KCA2012DOSEventPics=function(){try{var a=new Configuration();
a.init();
a.setChannel("Homepage");
a.setProp(1,"kca");
a.setEVar(1,"kca");
a.setProp(11,"kca");
a.setEVar(11,"kca");
a.setProp(17,"Homepage");
a.setEVar(17,"Homepage");
a.setEVar(16,"nick.com/KCA DOS Event Pics");
a.setPageName("nick.com/KCA DOS Event Pics");
a.setHier2("index.html");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.KCA2012DOSVideo=function(){try{var a=new Configuration();
a.init();
a.setChannel("Homepage");
a.setProp(1,"kca");
a.setEVar(1,"kca");
a.setProp(11,"kca");
a.setEVar(11,"kca");
a.setProp(17,"Homepage");
a.setEVar(17,"Homepage");
a.setEVar(16,"nick.com/KCA DOS Video");
a.setPageName("nick.com/KCA DOS Video");
a.setHier2("index.html");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendNTErrorCall=function(){linkName="Old Nicktropolis Call at "+location.href;
KIDS.reporting.omnifunctions.sendLinkEvent("",linkName)
};
KIDS.reporting.omnifunctions.sendReportingErrorCall=function(){linkName="Old Call at "+location.href;
KIDS.reporting.omnifunctions.sendLinkEvent("",linkName)
};
KIDS.reporting.omnifunctions.sendActivityFeed=function(f,a,d){try{var b=KIDS.reporting.config.getPageName()+"/ActivityFeedClick";
mtvn.btg.Controller.sendLinkEvent({linkName:b,linkType:"o",prop27:f+"-"+a+"-"+d})
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.sendActivityFeedImp=function(a){try{var c="/ActivityFeedImpression: "+a;
mtvn.btg.Controller.sendLinkEvent({linkName:c,linkType:"o",prop27:c})
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendShareClick=function(){try{var a="Share Button Click: "+KIDS.reporting.config.getPageName();
mtvn.btg.Controller.sendLinkEvent({linkName:a,linkType:"o",events:"event30"})
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendSTFEmailSent=function(){try{mtvn.btg.Controller.sendLinkEvent({linkName:"Send to Friend Email Sent",linkType:"o",events:"event31"})
}catch(a){KIDS.utils.doLog(a.toString())
}};
_nrtrackingcode=KIDS.reporting.omnifunctions.nrtrackingcode;
NRcall=KIDS.reporting.omnifunctions.NRcall;
sendAnalyticsEvent=KIDS.reporting.omnifunctions.sendAnalyticsEvent;
sendLinkEvent=KIDS.reporting.omnifunctions.sendLinkEvent;
pageNameAppend=KIDS.reporting.omnifunctions.pageNameAppend;
pageNameReset=KIDS.reporting.omnifunctions.pageNameReset;
sendInitCall=KIDS.reporting.omnifunctions.sendInitCall;
reportPlayer=KIDS.reporting.omnifunctions.reportPlayer;
sendKaraoke=KIDS.reporting.omnifunctions.sendKaraoke;
trackEvent=KIDS.reporting.omnifunctions.trackEvent;
trackKCA=KIDS.reporting.omnifunctions.trackKCA;
trackGamePlay=KIDS.reporting.omnifunctions.trackGamePlay;
bghReport=KIDS.reporting.omnifunctions.bghReport;
fetchGamePlaySite=KIDS.reporting.omnifunctions.fetchGamePlaySite;
trackKidsGamePlay=KIDS.reporting.omnifunctions.trackKidsGamePlay;
trackKCACamera=KIDS.reporting.omnifunctions.trackKCACamera;
doShowTemplateAction=KIDS.reporting.omnifunctions.doShowTemplateAction;
sendMyNickItem=KIDS.reporting.omnifunctions.sendMyNickItem;
BGHPledgeReporting=KIDS.reporting.omnifunctions.BGHPledgeReporting;
pageNameAppendNicktoons=KIDS.reporting.omnifunctions.pageNameAppendNicktoons;
reportKCA=KIDS.reporting.omnifunctions.reportKCA;
mashupReporting=KIDS.reporting.omnifunctions.mashupReporting;
printTracker=KIDS.reporting.omnifunctions.printTracker;
sendReportingCall=KIDS.reporting.omnifunctions.oldReportingCall;
sendLinkCall=KIDS.reporting.omnifunctions.sendLinkCall;
sendReportingCallTN2=KIDS.reporting.omnifunctions.sendReportingCallTN2;
reportCoverFlowImpression=KIDS.reporting.omnifunctions.reportCoverFlowImpression;
reportCoverFlowClickThru=KIDS.reporting.omnifunctions.reportCoverFlowClickThru;
incrementReactorator=KIDS.reporting.omnifunctions.incrementReactorator;
nanPrint=KIDS.reporting.omnifunctions.nanPrint;
KIDS.reporting.omnifunctions.NFLoverlay=KIDS.reporting.omnifunctions.sendReportingErrorCall;
KIDS.reporting.omnifunctions.KCA2011Takeover=KIDS.reporting.omnifunctions.sendReportingErrorCall;
KIDS.reporting.omnifunctions.sendKaraoke=KIDS.reporting.omnifunctions.sendReportingErrorCall;
KIDS.reporting.omnifunctions.reportPlayer=KIDS.reporting.omnifunctions.sendReportingErrorCall;
if(typeof NICK!="undefined"||NICK){NICK.namespace("reporting.omnifunctions");
NICK.reporting.omnifunctions._nrtrackingcode=KIDS.reporting.omnifunctions.nrtrackingcode;
NICK.reporting.omnifunctions.NRcall=KIDS.reporting.omnifunctions.NRcall;
NICK.reporting.omnifunctions.sendAnalyticsEvent=KIDS.reporting.omnifunctions.sendAnalyticsEvent;
NICK.reporting.omnifunctions.sendLinkEvent=KIDS.reporting.omnifunctions.sendLinkEvent;
NICK.reporting.omnifunctions.pageNameAppend=KIDS.reporting.omnifunctions.pageNameAppend;
NICK.reporting.omnifunctions.pageNameReset=KIDS.reporting.omnifunctions.pageNameReset;
NICK.reporting.omnifunctions.sendInitCall=KIDS.reporting.omnifunctions.sendInitCall;
NICK.reporting.omnifunctions.reportPlayer=KIDS.reporting.omnifunctions.reportPlayer;
NICK.reporting.omnifunctions.sendKaraoke=KIDS.reporting.omnifunctions.sendKaraoke;
NICK.reporting.omnifunctions.trackEvent=KIDS.reporting.omnifunctions.trackEvent;
NICK.reporting.omnifunctions.trackKCA=KIDS.reporting.omnifunctions.trackKCA;
NICK.reporting.omnifunctions.trackGamePlay=KIDS.reporting.omnifunctions.trackGamePlay;
NICK.reporting.omnifunctions.bghReport=KIDS.reporting.omnifunctions.bghReport;
NICK.reporting.omnifunctions.fetchGamePlaySite=KIDS.reporting.omnifunctions.fetchGamePlaySite;
NICK.reporting.omnifunctions.trackKidsGamePlay=KIDS.reporting.omnifunctions.trackKidsGamePlay;
NICK.reporting.omnifunctions.trackKCACamera=KIDS.reporting.omnifunctions.trackKCACamera;
NICK.reporting.omnifunctions.doShowTemplateAction=KIDS.reporting.omnifunctions.doShowTemplateAction;
NICK.reporting.omnifunctions.sendMyNickItem=KIDS.reporting.omnifunctions.sendMyNickItem;
NICK.reporting.omnifunctions.BGHPledgeReporting=KIDS.reporting.omnifunctions.BGHPledgeReporting;
NICK.reporting.omnifunctions.pageNameAppendNicktoons=KIDS.reporting.omnifunctions.pageNameAppendNicktoons;
NICK.reporting.omnifunctions.reportKCA=KIDS.reporting.omnifunctions.reportKCA;
NICK.reporting.omnifunctions.mashupReporting=KIDS.reporting.omnifunctions.mashupReporting;
NICK.reporting.omnifunctions.printTracker=KIDS.reporting.omnifunctions.printTracker;
NICK.reporting.omnifunctions.sendReportingCall=KIDS.reporting.omnifunctions.oldReportingCall;
NICK.reporting.omnifunctions.sendLinkCall=KIDS.reporting.omnifunctions.sendLinkCall;
NICK.reporting.omnifunctions.sendReportingCallTN2=KIDS.reporting.omnifunctions.sendReportingCallTN2;
NICK.reporting.omnifunctions.reportCoverFlowImpression=KIDS.reporting.omnifunctions.reportCoverFlowImpression;
NICK.reporting.omnifunctions.reportCoverFlowClickThru=KIDS.reporting.omnifunctions.reportCoverFlowClickThru;
NICK.reporting.omnifunctions.incrementReactorator=KIDS.reporting.omnifunctions.incrementReactorator
};
setNicktropolisRegion=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendReportingCallNicktropolis=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendChatbotCall=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisStartup=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisRoom=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolis=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisGame=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisHFDGame=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisObject=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisChat=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisError=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisMashup=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisAdRoom=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisAdVideo=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisAdGame=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisBlocksGame=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisBlocksStart=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisBlocksEnd=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisHomesite=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisGMGames=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisAdGameEnd=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisClothingStore=KIDS.reporting.omnifunctions.sendNTErrorCall;
sendNicktropolisKCAStream=KIDS.reporting.omnifunctions.sendNTErrorCall;
KIDS.reporting.omnifunctions.sendClubError=function(b){try{var a="Club Error - "+b;
KIDS.reporting.omnifunctions.sendLinkEvent(null,a)
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.sendClubTransaction=function(h,b,a,g,d){try{var f="Club Transaction - "+h+" - "+b+" - "+a+" - "+g+" - "+d;
KIDS.reporting.omnifunctions.sendLinkEvent(null,f)
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.sendClubBuddy=function(a){try{var c="Club - Buddy "+a;
KIDS.reporting.omnifunctions.sendLinkEvent(null,c)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendClubBlock=function(c){try{var a="User Blocked - "+c;
KIDS.reporting.omnifunctions.sendLinkEvent(null,a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendClubAction=function(a){try{if(a=="Closet Open"){KIDS.reporting.omnifunctions.sendClubClosetOpen()
}else{if(a=="Edit Avatar"){KIDS.reporting.omnifunctions.sendClubSaveAvatar()
}else{if(a=="Edit Room Open"){KIDS.reporting.omnifunctions.sendClubEditRoomOpen()
}else{if(a=="Edit Room"){KIDS.reporting.omnifunctions.sendClubEditRoomSave()
}else{linkName="Club Action: "+a;
KIDS.reporting.omnifunctions.sendLinkEvent("",linkName)
}}}}}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendClubGamePlay=function(a){try{KIDS.reporting.omnifunctions.trackKidsGamePlay(a+"_club")
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendClubGameSession=function(a){try{btg.Controller.sendLinkEvent({linkName:"Club Game Session: "+a,prop4:a+"_club",linkType:"o"})
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendClubClosetOpen=function(){try{var a=new Configuration();
a.init();
a.setPageName("nick.com/club/Closet Open");
a.setProp(1,"Nick.com Proper");
a.setEVar(1,"Nick.com Proper");
a.setChannel("club");
a.setHier2(KIDS.reporting.domain+"/club/Closet Open");
a.setProp(29,"Closet Open");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendClubSaveAvatar=function(){try{btg.Controller.sendLinkEvent({linkName:"Club Action: Save Avatar",prop29:"Save Avatar",linkType:"o"})
}catch(a){KIDS.utils.doLog(a.toString())
}};
KIDS.reporting.omnifunctions.sendClubEditRoomOpen=function(){try{var a=new Configuration();
a.init();
a.setPageName("nick.com/club/Edit Room");
a.setProp(1,"Nick.com Proper");
a.setEVar(1,"Nick.com Proper");
a.setChannel("club");
a.setHier2(KIDS.reporting.domain+"/club/Room Open");
a.setProp(29,"Edit Room");
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(b){KIDS.utils.doLog(b.toString())
}};
KIDS.reporting.omnifunctions.sendClubEditRoomSave=function(){try{btg.Controller.sendLinkEvent({linkName:"Club Action: Save Room",prop29:"Save Room",linkType:"o"})
}catch(a){KIDS.utils.doLog(a.toString())
}};
KIDS.reporting.omnifunctions.sendClubProfileView=function(d){try{var a=new Configuration();
if(NICK.club.loginName==NICK.club.pageOwner){var f="self";
var b="self"
}else{var f="other";
var b=NICK.club.pageOwner
}a.init();
a.setName("nickvia");
a.setDynamicAccountSelection(true);
a.setDynamicAccountList("nickviadev=nick-d.mtvi.com,nick-q.mtvi.com");
a.setLinkInternalFilters("javascript:,nick.com");
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName(KIDS.reporting.domain+"/club/profile/"+d);
a.setHier2(KIDS.reporting.domain+"/club/profile/view/"+d);
a.setChannel("club");
a.setProp(1,"Nick.com Proper");
a.setEVar(1,"Nick.com Proper");
a.setProp("27",b);
a.setProp("29","Profile View - "+f)
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.sendClubRoomView=function(f){try{var a=new Configuration();
if(NICK.club.loginName==NICK.club.pageOwner){var g="self";
var b="self"
}else{var d="other";
var b=NICK.club.pageOwner
}a.init();
a.setName("nickvia");
a.setDynamicAccountSelection(true);
a.setDynamicAccountList("nickviadev=nick-d.mtvi.com,nick-q.mtvi.com");
a.setLinkInternalFilters("javascript:,nick.com");
a.setTrackExternalLinks(true);
a.setTrackDownloadLinks(true);
a.setTrackInlineStats(true);
a.setPageName(KIDS.reporting.domain+"/club/profile/"+f);
a.setHier2(KIDS.reporting.domain+"/club/profile/view/"+f);
a.setChannel("club");
a.setProp(1,"Nick.com Proper");
a.setEVar(1,"Nick.com Proper");
a.setProp("27",b);
a.setProp("29","Room View - "+g);
KIDS.reporting.omnifunctions.sendReportingCall(a)
}catch(c){KIDS.utils.doLog(c.toString())
}};
KIDS.reporting.omnifunctions.sendClubProfileEdit=function(c,b,a){try{btg.Controller.sendLinkEvent({linkName:"/club/profile/editProfile/",prop28:"Add Favorite "+b+" - "+a,events:"event6",linkType:"o"})
}catch(d){KIDS.utils.doLog(d.toString())
}};
sendClubTransaction=KIDS.reporting.omnifunctions.sendClubTransaction;
