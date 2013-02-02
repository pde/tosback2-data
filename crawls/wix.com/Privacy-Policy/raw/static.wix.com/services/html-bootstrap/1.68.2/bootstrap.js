var client_version="1.68.2";
if(client_version=="${artifact.baseVersion}"){client_version="DBG"
}if(window.debugMode&&window.debugMode!=="nodebug"){document.title="(;,;) "+client_version
}window.W=window.W||{};
W.Managers=W.Managers||{};
W.BaseClasses=W.BaseClasses||{};
var h={};
function getCookieInfo(d){var f=document.cookie.split(";");
var a=d;
for(var b=0;
b<f.length;
b++){var g=f[b];
while(g.charAt(0)==" "){g=g.substring(1,g.length)
}if(g.indexOf(a)===0){g=g.substring(a.length,g.length);
return g.replace("=","")
}}return""
}var creationSource="http://m.wix.com";
if(window.siteHeader&&window.siteHeader.creationSource){switch(window.siteHeader.creationSource.toLocaleLowerCase()){case"web":creationSource="http://www.wix.com";
break;
case"standalone":creationSource="http://mobile.wix.com";
break
}}var _userAnalyticsAccount="";
if(window.googleAnalytics){_userAnalyticsAccount=(window.googleAnalytics.length===0)?"":window.googleAnalytics
}var isAnalyticsEnabled=!(window.publicModel&&window.publicModel.suppressTrackingCookies);
LOG=new WixLogger({errors:window.wixErrors,events:window.wixEvents,wixAnalytics:["UA-2117194-45"],userAnalytics:["UA-2117194-15","UA-2117194-44",_userAnalyticsAccount],enableGoogleAnalytics:isAnalyticsEnabled,floggerServerURL:(window.serviceTopology&&window.serviceTopology.biServerUrl)||"http://flogger.wixpress.com/",version:((window.viewMode!="editor")?"VR":"ER")+window.client_version,siteId:(window.siteId?siteId:""),userId:(window.siteHeader&&window.siteHeader.userId)||"00000000-0000-0000-0000-000000000000",userType:getCookieInfo("userType"),userLanguage:getCookieInfo("wixLanguage")||"unknown",session:getCookieInfo("_wix_browser_sess")||"00000000-0000-0000-0000-000000000000",computerId:getCookieInfo("_wixCIDX")||"00000000-0000-0000-0000-000000000000",creationSource:creationSource,wixAppId:3,sendPageTrackToWix:window.viewMode=="editor",sendPageTrackToUser:window.viewMode=="site",debugMode:(window.debugMode=="debug"),onEvent:function(a,b){},onError:function(c,b,a,d){if(window.debugMode=="debug"||window.debugMode=="unit_test"){if(window.console&&window.console["error"]){console.error(c.desc,c,b,a,d)
}}}});
function getPhysicalScreenDimensions(){var a=1024,c=768;
try{a=screen.availWidth;
c=screen.availHeight;
if(typeof a=="undefined"){a=1024
}if(typeof c=="undefined"){c=768
}}catch(b){a=1024;
c=768
}return{width:(a),height:(c)}
}if(typeof($)!=="undefined"){$(document).addEvent("domready",function(){LOG.reportEvent(wixEvents.DOM_LOADED);
switch(window.viewMode){case"editor":var a=0,c=0;
if(window&&window.screen&&window.screen.width){a=window.screen.width
}if(window&&window.screen&&window.screen.height){c=window.screen.height
}var d={i1:a,c1:c};
LOG.reportEvent(wixEvents.EDITOR_DOM_LOADED,d);
var b=getPhysicalScreenDimensions();
window.resizeTo(b.width,b.height);
break;
case"preview":LOG.reportEvent(wixEvents.PREVIEW_DOM_LOADED);
break;
case"site":LOG.reportEvent(wixEvents.SITE_DOM_LOADED);
break
}})
}W.ErrorLog=(function(){var c=[];
try{var b=console.error;
console.error=function(d){c.push(d);
try{b.apply(console,arguments)
}catch(f){}}
}catch(a){}return{getLog:function(){return c
},clearLog:function(){c=[]
}}
})();
if(debugMode!="unit_test"){var topLevelDomains={com:true,org:true,net:true,edu:true,gov:true,mil:true,info:true,co:true,ac:true};
var subDomain=document.domain.split(".");
if(subDomain.length>2){var beforeLastPart=subDomain[subDomain.length-2];
if(topLevelDomains[beforeLastPart]){subDomain=subDomain[subDomain.length-3]+"."+subDomain[subDomain.length-2]+"."+subDomain[subDomain.length-1]
}else{subDomain=subDomain[subDomain.length-2]+"."+subDomain[subDomain.length-1]
}}try{document.domain=subDomain
}catch(e){}}(function(){if(typeof(Constants)!="undefined"){return
}Constants={add:function(b,c){var a=this.splitNameAndNamespace(b);
this.addConstant(a.namespace,a.name,c)
},addConstant:function(a,c,d){var b=this.getNamespace(a,true);
if(b){if(undefined===b[c]){b[c]=d
}}else{throw"ERROR CREATING CONSTANT  nameSpace="+a+" name="+c+" value="+d
}},getNamespace:function(b,j){if(!b){return false
}var k=b.split(".");
var c=this;
for(var g=0,a=k.length;
g<a;
++g){var f=k[g];
if(!c[f]){if(j){var d={};
c[f]=d;
c=d
}else{return null
}}else{c=c[f]
}}return c
},splitNameAndNamespace:function(d){var c,a;
var b=d.lastIndexOf(".");
if(b>-1){c=d.substr(0,b);
a=d.substr(b+1)
}else{c="";
a=d
}return{name:a,namespace:c}
}};
Constants.CSS={COLORS:["transparent","aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],SYSTEM_FONTS:{"sans-serif":[["Arial","Helvetica"],["Arial Black","Gadget"],["Impact","Charcoal"],["Lucida Sans Unicode","Lucida Grande"],["Tahoma","Geneva"],["Verdana","Geneva"]],serif:["Georgia",["Palatino Linotype","Book Antiqua","Palatino"],["Times New Roman","Times"]],cursive:["Comic Sans MS"],monospace:["Courier New",["Lucida Console","Monaco"]]},CUSTOM_FONTS:{"sans-serif":["Anton","Basic","Jockey One","Jura","Open Sans","Overlock","Play","Signika","Spinnaker","Chelsea Market"],serif:["Caudex","EB Garamond","Enriqueta","Forum","Noticia Text","Fredericka the Great","Kelly Slab","Josefin Slab"],cursive:["Lobster","Niconne","Marck Script","Mr De Haviland","Patrick Hand","Sarina","Corben"],monospace:[]}}
})();
(function(){window.WClass=function(o,k){var d=this;
o=o||{};
o.className=k||o.className;
d.validateScope(this,o.className);
if(!d.validateClassData(o)){return d.InvalidWClass
}o.$className=o.className;
var l=d.clonePrototype(o.Extends);
var f={};
for(var n in l){f[n]=l[n]
}d.implementTraits(o.Implements,f);
for(n in o){f[n]=o[n]
}var m=f.Static;
delete f.Static;
if(!o.Extends){if(o.hasOwnProperty("toString")&&typeof o.toString=="function"){f.toString=o.toString
}else{f.toString=this._$wclassToString
}f.hasClassAncestor=this._hasClassAncestor
}if(l.Implements instanceof Array){f.Implements.combine(l.Implements)
}f.Binds=d.aggregateBinds(f.Binds,l.Binds,f.Implements);
f.$parentPrototype=l;
f.parent=function(){var r;
var p;
var q=f.parent.caller||arguments.callee.caller||arguments.caller;
if(!q){throw new Error("no caller!")
}do{r=r?r.$parentPrototype:f;
if(!r){return
}for(p in r){if(r[p]===q){break
}}}while(r[p]!==q);
if(!r||!r[p]||!r.$parentPrototype){return
}var s=d.realParent(r);
while(r[p]===s[p]){r=s;
s=d.realParent(r)
}r=d.realParent(r);
if(!r||!r[p]||typeof r[p]!="function"){return
}return r[p].apply(this,arguments)
};
var i=function(){d.validateScope(this);
d.clonePrototypeObjects(this);
d.bindMethods(f.Binds,this);
if(f.initialize&&typeof f.initialize=="function"){f.initialize.apply(this,arguments)
}d.initializeTraits(f.Implements,this,arguments)
};
var j=(new Function("_","return function "+o.className.split(".").pop()+" (){ return _.apply(this,arguments); };"))(i);
var g={};
g[o.className]=j;
d.copyStatic(j,f,m,o.Extends);
f.constructor=g[o.className];
j.prototype=f;
f.$class=j;
f.$class.$originalClassName=f.$className;
f.getOriginalClassName=function(){return f.$class.$originalClassName||f.$className
};
if(o.$extendsName){f.$class.$extendsName=o.$extendsName;
delete o.$extendsName
}else{delete f.$class.$extendsName
}return j
};
window.WClass.prototype={constructor:window.WClass,realParent:function(d){var f=d.$parentPrototype;
while(f&&f.$className&&d.$class.$extendsName&&(d.$class.$extendsName!=f.$className)){f=f.$parentPrototype
}return f
},validateScope:function(d){if(d===window||!d){LOG.reportError(wixErrors.WCLASS_CLASS_MUST_USE_NEW_OP,"WClass","validateScope")()
}for(key in d){if(d.hasOwnProperty(key)){LOG.reportError(wixErrors.WCLASS_CLASS_MUST_USE_NEW_OP,"WClass","validateScope")()
}}},clonePrototype:function(g){if(typeof g!="function"){return{}
}var d={};
var f=g.prototype||{};
if(f===Function.prototype||f===Function){return d
}for(key in f){if(f.hasOwnProperty(key)||key=="toString"){d[key]=f[key]
}}return d
},validateClassData:function(f){var d;
if(typeof f!="object"){return LOG.reportError(wixErrors.WCLASS_CLASS_DATA_INVALID,"WClass","validateClassData",d)()
}if(typeof f.className!="string"||f.className.length===0){return LOG.reportError(wixErrors.WCLASS_CLASS_EMPTY_STRING,"WClass","validateClassData")()
}for(d in f){if(this.reservedWords.indexOf(d)!==-1){return LOG.reportError(wixErrors.WCLASS_CLASS_RESERVED,"WClass","validateClassData",d)()
}}if(f.Implements&&!(f.Implements instanceof Array)){return LOG.reportError(wixErrors.WCLASS_CLASS_DATA_INVALID,"WClass","validateClassData","Implements is not an array")()
}if(f.Binds&&!(f.Binds instanceof Array)){return LOG.reportError(wixErrors.WCLASS_CLASS_DATA_INVALID,"WClass","validateClassData","Binds is not an array")()
}return true
},reservedWordsForTraits:["initialize","parent","Extends","Implements","Binds","$parentPrototype","$className"],reservedWords:["parent","$parentPrototype","$className"],bindMethods:function(f,j){var g,d,k;
if(f instanceof Array){for(g=0,d=f.length;
g<d;
g++){k=f[g];
if(typeof j[k]=="function"){j[k]=j[k].bind(j)
}else{LOG.reportError(wixErrors.WCLASS_INVALID_BIND,"WClass","bindMethods",k)
}}}},implementTraits:function(k,j){var g,d,f,m;
j.Implements=[];
if(k instanceof Array){for(g=0,d=k.length;
g<d;
g++){f=k[g];
j.Implements.push(f);
if(typeof f=="function"){f=f.prototype
}for(m in f){if(m&&this.reservedWordsForTraits.indexOf(m)===-1){j[m]=f[m]
}}}}},initializeTraits:function(n,m,g){var k,f,j;
if(n instanceof Array){for(k=0,f=n.length;
k<f;
k++){j=n[k];
if(typeof j=="function"){j=j.prototype
}var d=j.initialize;
if(d&&typeof d=="function"){d.apply(m,g)
}}}},clonePrototypeObjects:function(f){var d;
for(d in f){if(f[d]&&typeof f[d]=="object"){f[d]=(f[d] instanceof Array)?f[d].clone():Object.clone(f[d])
}}},copyStatic:function(j,i,k,g){var f;
if(typeof g=="function"){for(f in g){if(g.hasOwnProperty(f)){j[f]=g[f]
}}}if(k){var d=(k instanceof Function);
k=d?k():k;
for(f in k){if(i[f]&&!d){throw new Error("The property "+f+" conflicts with a static property")
}j[f]=i[f]=k[f]
}}},aggregateBinds:function(d,i,g){var f=[];
if(d instanceof Array){f.combine(d)
}if(i instanceof Array){f.combine(i)
}g&&g.forEach(function(j){if(j.Binds instanceof Array){f.combine(j.Binds)
}else{if(j.prototype&&j.prototype.Binds instanceof Array){f.combine(j.prototype.Binds)
}}});
return f
},_findMethod:function(f,d){while(f){if(f.hasOwnProperty(d)){var g=f[d];
if(typeof(g)=="function"){return g
}}if(f.Extends){f=f.Extends.prototype
}else{return null
}}return null
},_hasClassAncestor:function(k,j){var g=this;
do{var f=g.className;
var d;
if(j){var i=new RegExp("\\.?"+k+"(\\.|$)");
d=f&&f.match(i)
}else{d=(f==k)
}if(d){return true
}g=g.Extends&&g.Extends.prototype
}while(g);
return false
},_$wclassToString:function(){return"[wclass "+(this.className||"")+"]"
},InvalidWClass:function(){throw new Error("invalid WClass")
}};
var c=window.instanceOf;
var a;
var b=window;
b.instanceOf=a=function(g,f){if(f===b.WClass&&g&&typeof g=="function"&&g.prototype&&g.prototype.$className){return true
}if(g&&g.$className&&typeof f=="function"&&f.prototype&&f.prototype.$className){return g.getOriginalClassName()==f.prototype.getOriginalClassName()||instanceOf(g.$parentPrototype,f)
}else{b.instanceOf=c;
var d=instanceOf(g,f);
b.instanceOf=a;
return d
}}
}());
window.h.extend=function(a,b){if(typeOf(a)!=="string"){throw new Error("extend must be declared as a string")
}b=b||{};
b.Extends=a;
var c=function(){return b
};
c.dataType="extend";
return c
};
window.h.imports=function(a){a=a||[];
if(typeOf(a)!=="array"){throw new Error("imports must be passed as array or merge")
}var b=function(){return a
};
b.dataType="imports";
return b
};
window.h.traits=function(b){b=b||[];
if(typeOf(b)!=="array"){throw new Error("traits must be passed as array")
}var a=function(){return b
};
a.dataType="traits";
return a
};
W.ClassManager=W.ClassManager||{};
W.ClassManager.ClassRepository=new WClass({className:"managers.classmanager.ClassRepository",Binds:["loadMissingClasses"],initialize:function(){this._readyClasses={};
this._waitingForDependencies={};
this._waitingForClassReady={};
this._scriptLoadingQueue=[];
this._scriptLoader=new W.ClassManager.ScriptLoader();
this._loadingMissingClassesStarted=false;
this._loadingMissingClassesTimer=null
},getClass:function(a){return this._readyClasses[a]||null
},getClassWhenReady:function(a,b){if(this.isClassReady(a)){if(b){b(this.getClass(a))
}return this.getClass(a)
}if(!this.isClassLoaded(a)){this._addClassesToScriptLoadingQueue([a])
}if(!this._waitingForClassReady[a]){this._waitingForClassReady[a]=[]
}if(b){this._waitingForClassReady[a].push(b)
}},getClassStatus:function(a){if(this.isClassReady(a)){return"ready"
}if(this.isClassLoaded(a)){return"pending"
}return"missing"
},getClassStatusDetails:function(c,g){if(!g){g=1
}if(this.isClassReady(c)){return"ready"
}if(this.isClassLoaded(c)){var b="pending:\n";
var f=this._waitingForDependencies[c].dependenciesArray;
for(var a=0;
a<f.length;
a++){var d=this.getClassStatusDetails(f[a],g+1);
if(d!="ready"){b+=this._addTabs(g)+"class :"+f[a]+":"+d
}}return b
}return"missing"
},_addTabs:function(c){var b="";
for(var a=0;
a<c;
a++){b+="\t"
}return b
},registerClass:function(a){var c=a.prototype.$className;
this._readyClasses[c]=a;
if(this._waitingForClassReady[c]){for(var b=0;
b<this._waitingForClassReady[c].length;
b++){this._waitingForClassReady[c][b](a)
}delete this._waitingForClassReady[c]
}for(var f in this._waitingForDependencies){var d=this._waitingForDependencies[f];
if(this.areClassesReady(d.dependenciesArray)){delete this._waitingForDependencies[f];
d.callback(d.classData)
}}},isClassReady:function(a){return typeof this._readyClasses[a]!=="undefined"
},deleteClass:function(a){delete this._readyClasses[a]
},areClassesReady:function(d){var b,a;
var c=true;
for(b=0,a=d.length;
b<a;
b++){if(!this.isClassReady(d[b])){c=false;
break
}}return c
},registerDependentClass:function(a,c,b){if(this.areClassesReady(a)){c(b);
return
}this._waitingForDependencies[b.name]={dependenciesArray:a,callback:c,classData:b};
this._addClassesToScriptLoadingQueue(a)
},loadMissingClasses:function(){var a=this._filterLoadedClassesFromList(this._scriptLoadingQueue);
clearTimeout(this._loadingMissingClassesTimer);
delete this._loadingMissingClassesTimer;
this._loadingMissingClassesStarted=true;
if(a.length>0){this._scriptLoader.loadMissingClasses(a)
}this._scriptLoadingQueue=[]
},isClassLoaded:function(a){return this.isClassReady(a)||this._waitingForDependencies[a]
},isReady:function(){var a;
for(a in this._waitingForDependencies){return false
}this._scriptLoadingQueue=this._filterLoadedClassesFromList(this._scriptLoadingQueue);
if(this._scriptLoadingQueue.length){return false
}for(a in this._waitingForClassReady){return false
}return true
},clone:function(){var a=new W.ClassManager.ClassRepository();
a._readyClasses=Object.clone(this._readyClasses);
if(this._loadingMissingClassesStarted){a.loadMissingClasses()
}return a
},_addClassesToScriptLoadingQueue:function(b){var a=this._filterLoadedClassesFromList(b);
this._scriptLoadingQueue.combine(a);
if(this._loadingMissingClassesStarted&&!this._loadingMissingClassesTimer){this._loadingMissingClassesTimer=setTimeout(this.loadMissingClasses,10)
}},_filterLoadedClassesFromList:function(d){var b,a;
var c=[];
for(b=0,a=d.length;
b<a;
b++){if(!this.isClassLoaded(d[b])){c.include(d[b])
}}return c
},override:function(b,a){if(!b){throw new Error("Invalid class name for override")
}this._readyClasses[b]=a
}});
function merge(a){var b=function(){return a
};
b.mergeFlag=true;
return b
}function clone(){return{cloneFlag:true}
}W.ClassManager=W.ClassManager||{};
W.ClassManager.ClassParser=new WClass({className:"managers.classmanager.ClassParser",Binds:["registerClass"],initialize:function(a){this._repository=a;
this._overrides={}
},override:function(b,c){this._overrides[b]=this._overrides[b]||[];
var a=this._overrides[b].length?this._overrides[b].getLast():b;
this._overrides[b].push(c);
return a
},registerClass:function(d){var f=this._getClassDataErrorCode(d);
if(f){LOG.reportError(wixErrors.CLASS_INVALID_PENDING_OBJECT,d&&d.name||"Unknown class","class data validation",f);
return
}var a=this._getItemDependencies(d);
var b=this._repository.areClassesReady(a);
if(b){this._prepClassData(d);
var c=new WClass(d.Class,d.name);
if(d.Class.Extends){this._overrideClassObjectFields(c.prototype.Extends.prototype,c.prototype)
}this._repository.registerClass(c);
if(d.onClassReady){d.onClassReady(c)
}return c
}else{this._repository.registerDependentClass(a,this.registerClass,d)
}},_overrideClassObjectFields:function(a,d){for(var i in d){if(d.hasOwnProperty(i)){var c=d[i];
var g;
if(c instanceof Function&&c.mergeFlag){c=c();
if(typeOf(c)=="object"){g=Object.clone(a[i]);
for(var b in c){if(c.hasOwnProperty(b)){if(c[b]===undefined){delete g[b]
}else{g[b]=c[b]
}}}}else{if(typeOf(c)=="array"){g=a[i].clone();
g.combine(c)
}}d[i]=g
}else{if(c&&c.cloneFlag){var f=a[i];
if(typeOf(f)=="object"){g=Object.clone(a[i])
}else{if(typeOf(f)=="array"){g=a[i].clone()
}else{if(typeOf(f)=="string"){g=a[i]
}}}d[i]=g
}else{if(c&&c.beforeFlag){(function(){var k=a[i];
var j=c();
d[i]=function(){j.apply(this,arguments);
return k.apply(this,arguments)
}
})()
}else{if(c&&c.aroundFlag){(function(){var l=i;
var k=a[i];
var j=c();
d[i]=function(){var o=this;
var n=Array.prototype.splice.call(arguments,0);
var p=false;
n.splice(0,0,function(){p=true;
return k.apply(o,n.slice(1))
});
var m=j.apply(this,n);
if(!p){LOG.reportError(wixErrors.EXPERIMENT_INVALID_MODIFY+" - Original method was not called",d.className,l,n.slice(1))
}return m
}
})()
}else{if(c&&c.afterFlag){(function(){var j=a[i];
var k=c();
d[i]=function(){j.apply(this,arguments);
return k.apply(this,arguments)
}
})()
}}}}}}}},_getItemDependencies:function(b){var a=[];
if(b.Class&&b.Class.Extends){a.combine(this._extractStringsOnlyArray(b.Class.Extends))
}if(b.imports){a.combine(this._extractStringsOnlyArray(b.imports))
}if(b.traits){a.combine(this._extractStringsOnlyArray(b.traits))
}a=this._replaceDependenciesWithOverrides(b.name,a);
return a
},_replaceDependenciesWithOverrides:function(a,b){if(Object.keys(this._overrides).length){Array.each(b,function(g,f){if(this._overrides[g]){var d=this._overrides[g].length-1;
var c=this._overrides[g].indexOf(a);
if(c>=0){d=c?c-1:0
}if(this._overrides[g][d]!=a){b[f]=this._overrides[g][d]
}}}.bind(this))
}return b
},_extractStringsOnlyArray:function(a){if(typeOf(a)=="string"){return[a]
}if(typeOf(a)=="array"){return a.filter(this._isString)
}return[]
},_isString:function(a){return typeOf(a)=="string"
},_prepClassData:function(a){a=this._prepClassExtends(a);
a=this._prepClassTraits(a);
a=this._prepClassImports(a);
a=this._prepClassInstanceOf(a);
a.Class.injects=function(){return W.Managers.getManagers()
};
return a
},_prepClassExtends:function(a){if(a.Class.Extends&&(typeOf(a.Class.Extends)=="string")){a.Class.Extends=this._repository.getClass(a.Class.Extends)
}return a
},_prepClassTraits:function(c){if(c.traits){c.Class.Implements=[];
for(var b=0;
b<c.traits.length;
b++){var a=c.traits[b];
c.Class.Implements.push(this._repository.getClass(a))
}}return c
},_prepClassImports:function(m){var l;
var a=m.Class.Extends;
var k=a&&a.prototype&&a.prototype.imports;
k?l=Object.clone(a.prototype.imports):l={};
if(m.imports){for(var b=0;
b<m.imports.length;
b++){var g=m.imports[b];
var c=g.split(".").getLast();
l[c]?l[g]=this._repository.getClass(g):l[c]=this._repository.getClass(g)
}m.Class.imports=l
}if(m.Class.Implements){for(var d=0;
d<m.Class.Implements.length;
++d){if(!m.Class.Implements[d]){return m
}var f=m.Class.Implements[d].prototype;
if(f&&f.imports){if(!m.Class.imports){m.Class.imports=[]
}Object.merge(m.Class.imports,f.imports)
}}}return m
},_prepClassInstanceOf:function(a){a.Class._instanceOf=a.Class.Extends&&a.Class.Extends.prototype._instanceOf||[];
a.Class._instanceOf.push(a.name);
return a
},_getClassDataErrorCode:function(a){if(!a||typeOf(a.Class)!=="object"){return"No class data was found"
}if(!a.name||!instanceOf(a.name,String)){return"No class name"
}if(!this._isValidClassName(a.name)){return"Invalid class name: "+a.name
}if(a.Extends&&!(typeOf(a.Extends)=="string")){return"Extends must be a string"
}if(a.imports&&!this._isStringArray(a.imports)){return"Invalid imports array"
}if(a.traits&&!this._isStringArray(a.traits)){return"Invalid traits array"
}return false
},_isValidClassName:function(b){var d=b.split(".");
var a=d.length-1;
for(var c=0;
c<a;
c++){if(d[c].length===0){return false
}if(!d[c].test(/^[a-z][a-z0-9_]*$/)){return false
}}if(!d[a].test(/^[A-Z][A-Za-z0-9_]*$/)){return false
}return true
},_isStringArray:function(a){if(typeOf(a)!="array"){return false
}return a.every(function(b){return(typeOf(b)=="string")
})
}});
W.ClassManager=W.ClassManager||{};
W.ClassManager.ScriptLoader=new WClass({className:"managers.classmanager.ScriptLoader",initialize:function(){this._scriptDirectory="javascript";
this._scriptBaseRoot=window.serviceTopology.scriptsRoot+"/"+this._scriptDirectory+"/";
this._scriptRootByPackage={};
if(window.serviceTopology&&window.serviceTopology.scriptsLocationMap){Object.each(window.serviceTopology.scriptsLocationMap,function(b,a){this._scriptRootByPackage[a]=b+"/"+this._scriptDirectory+"/"
}.bind(this))
}this._staticSkinBaseRoot=window.serviceTopology.staticSkinUrl+"/"+this._scriptDirectory+"/";
this._loadStartDelay=10;
this._clearLoadContext();
this._newScriptsAnchor=document.head
},loadMissingClasses:function(a){if(!a.length){return
}var b=this._convertClassNamesToUrls(a);
this._ensureSingleScriptLoadingInterval(b)
},getScriptRoot:function(){return this._scriptBaseRoot
},loadMissingScripts:function(a){this._ensureSingleScriptLoadingInterval(a)
},setBodyAsScriptsAnchor:function(){this._newScriptsAnchor=document.body
},_clearLoadContext:function(){this._loadContext={id:null,urls:[]}
},_ensureSingleScriptLoadingInterval:function(a){this._loadContext.urls.combine(a);
if(this._loadContext.id){W.Utils.clearCallLater(this._loadContext.id)
}this._loadContext.id=W.Utils.callLater(this._loadMissingScripts,null,this,this._loadStartDelay)
},_convertClassNamesToUrls:function(a){var b=[];
a.forEach(function(f){var g=f.replace(/\./g,"/");
if(f.test(/^nopkg|^test|^experiments/)||!g){b.push("")
}else{g=g+".js";
if(g.indexOf("wysiwyg/")===0&&g.indexOf("/skins/")>0){g=this._staticSkinBaseRoot+g
}else{var c=g.match("^[^/]*");
if(c[0]==="mobile"){c="html-client-core"
}var d=this._scriptRootByPackage[c]||this._scriptBaseRoot;
g=d+g
}b.push(g)
}}.bind(this));
return b
},_loadMissingScripts:function(){var a=this._getNonLoadedScriptsFromSet(this._loadContext.urls);
a.forEach(function(b){this._loadScript(b)
},this);
this._clearLoadContext()
},_getNonLoadedScriptsFromSet:function(j){var a=document.scripts||Array.from(document.getElementsByTagName("script"));
var f={};
var g;
for(g=0;
g<a.length;
g++){var c=a[g].src;
c=this._convertToInnerScriptUrl(c);
f[c.toLowerCase()]=1
}var d=[];
var b=0;
j.forEach(function(i){if(!(this._convertToInnerScriptUrl(i).toLowerCase() in f)){d.push(i)
}}.bind(this));
return d
},_convertToInnerScriptUrl:function(a){var c=this._scriptDirectory+"/([^?]+)";
var b=a.match(c);
return b?b[1]:a
},_loadScript:function(b){var c="";
c=W.Utils.getAntiCacheSuffix();
var a=new Element("script",{src:b+c,type:"text/javascript"});
return a.inject(this._newScriptsAnchor,"bottom")
}});
W.ClassManager.ClassManager=new WClass({className:"ClassManager",initialize:function(){this._classRepo=new W.ClassManager.ClassRepository();
this._classParser=new W.ClassManager.ClassParser(this._classRepo)
},get:function(b,a){return this._classRepo.getClassWhenReady(b,a)
},override:function(b,a){this._classRepo.override(b,a)
},overrideDependency:function(b,a){return this._classParser.override(b,a)
},getClassStatus:function(a){return this._classRepo.getClassStatus(a)
},getClassStatusDetails:function(a){return this._classRepo.getClassStatusDetails(a)
},newClass:function(a){if(this._classRepo.getClass(a.name)){LOG.reportError(wixErrors.CLASS_ALREADY_EXIST,this.className,"newClass",a.name);
return
}return this._classParser.registerClass(Object.clone(a))
},newTrait:function(a){a.Class=a.trait;
delete a.trait;
this.newClass(a)
},newClasses:function(a){Object.forEach(a,this.newClass.bind(this))
},setDynamicScriptLoading:function(){this._classRepo.loadMissingClasses()
},_getClassDataErrorCode:function(a){this._classParser._getClassDataErrorCode(a)
},removeClass:function(a){this._classRepo.deleteClass(a)
},isReady:function(){return this._classRepo.isReady()
},clone:function(){var a=new W.ClassManager.ClassManager();
a._classRepo=this._classRepo.clone();
a._classParser=new W.ClassManager.ClassParser(a._classRepo);
return a
}});
W.Classes=new (W.ClassManager.ClassManager)();
var Events=new WClass({className:"Events",addEvent:function(b,a){b=this._removeOn(b);
this.$events=this.$events||{};
this.$events[b]=(this.$events[b]||[]).include(a);
return this
},addEvents:function(a){for(var b in a){this.addEvent(b,a[b])
}return this
},fireEvent:function(d,b,a){if(this.$events){d=this._removeOn(d);
var c=this.$events[d];
if(!c){return this
}b=Array.from(b);
c.each(function(f){if(!f){return
}if(a){f.delay(a,this,b)
}else{f.apply(this,b)
}},this)
}return this
},removeEvent:function(d,c){if(this.$events){d=this._removeOn(d);
var b=this.$events[d];
if(b){if(c){var a=b.indexOf(c);
if(a!=-1){b.splice(a,1);
if(b.length==0){delete this.$events[d]
}}}else{delete this.$events[d]
}}}return this
},removeEvents:function(c){var d;
if(typeOf(c)=="object"){for(d in c){this.removeEvent(d,c[d])
}return this
}if(c){c=this._removeOn(c)
}for(d in this.$events){if(c&&c!=d){continue
}var b=this.$events[d];
for(var a=b.length;
a--;
){this.removeEvent(d,b[a])
}}return this
},_removeOn:function(a){return a.replace(/^on([A-Z])/,function(b,c){return c.toLowerCase()
})
},removeAllEvents:function(){this.$events={}
}});
W.Classes.newClass({name:"mobile.core.managers.BaseManager",Class:{isReady:function(){throw ("Manager did not implemented isReady method")
},clone:function(){return new this.$class()
}}});
W.Classes.newClass({name:"mobile.core.managers.ExperimentsManager",Class:{initialize:function(a){this._registeredExperiments=a?Object.clone(a):{};
this._markedExperiments={};
this._deployedItems={};
this._deployedExperiments={};
this._deploymentProgress=0;
this._uniqueIdentifier=0;
this._deploymentSize=0;
this._deploymentOrder=[];
this._cleanExperimentList()
},Static:{NEW_EXPER_ITEM:"New",DELETED_EXPER_ITEM:"Deleted",REFACTORED_EXPER_ITEM:"Refactored"},notifyManagersDeploymentStart:function(){this._markDevExperiment();
this._deployBasicsExperiments(this._markedExperiments)
},notifyManagersDeploymentDone:function(){this._countDeploymentSize();
this._validateExperiments(this._markedExperiments);
this._deployHighLevelExperiments(this._markedExperiments);
var a=this;
this._deploymentTimeout=setTimeout(function(){if(!a.isReady()){a._reportExperimentsDeploymentError()
}},wixErrors.EXPERIMENT_DEPLOYMENT_TIMEOUT.timeoutThreshold)
},markExperimentsForDeployment:function(a){a=this._experimentsToLowerCase(a);
this._markedExperiments=Object.merge(this._markedExperiments,a)
},isDeployed:function(b){var a=false;
b=this._experimentsToLowerCase(b);
var c;
for(c in b){if(!this._deployedExperiments.hasOwnProperty(c)||this._deployedExperiments[c]!==b[c]){a=false;
break
}else{a=true
}}return a
},isMarked:function(a){a=this._experimentsToLowerCase(a);
for(var b in a){if(this._markedExperiments.hasOwnProperty(b)){if(this._markedExperiments[b]==a[b]){return true
}}}return false
},setDeploymentOrder:function(a){this._deploymentOrder=this._deploymentOrder.concat(a);
this._deploymentOrderToLowerCase()
},registerNewExperimentClass:function(b,a,c){this._registerNewExperimentClassItem(b,a,"new_classes",c)
},registerNewExperimentTrait:function(c,b,a){this._registerNewExperimentClassItem(c,b,"new_traits",a)
},registerNewExperimentSkin:function(c,a,b){this._registerNewExperimentClassItem(c,a,"new_skins",b)
},registerNewExperimentComponent:function(c,a,b){this._registerNewExperimentClassItem(c,a,"new_components",b)
},registerNewExperimentDataItem:function(d,c,b,a){var f=this._getExperimentGroup(d,c,"new_data");
f[b]=a
},registerNewExperimentDataTypeSchema:function(c,b,a,d){var f=this._getExperimentGroup(c,b,"new_dataTypeSchema");
f[a]=d
},registerNewExperimentManager:function(d,b,c,a){var f=this._getExperimentGroup(d,b,"new_managers");
f[c]=a
},registerExperimentConstant:function(b,a,d,c){this._registerExperimentClassItem(b,a,"constants",c,d)
},registerExperimentTrait:function(f,d,a,b){var g=this._getExperimentGroup(f,d,"traits");
var c=b||a.trait.Extends;
g[c]=a
},registerExperimentManager:function(c,b,a,d){this._registerExperimentClassItem(c,b,"managers",a,d)
},registerExperimentClass:function(c,b,d,a){this._registerExperimentClassItem(c,b,"classes",d,a)
},registerExperimentSkin:function(c,a,b,d){this._registerExperimentClassItem(c,a,"skins",b,d)
},registerExperimentComponent:function(d,b,c,a){this._registerExperimentClassItem(d,b,"components",c,a)
},registerExperimentDataItem:function(d,c,b,a){var f=this._getExperimentGroup(d,c,"data");
f[b]=a
},registerExperimentDataSchema:function(d,b,a,c){var f=this._getExperimentGroup(d,b,"data_schema");
f[a]=c
},registerExperimentCompDataSchema:function(d,b,a,c){var f=this._getExperimentGroup(d,b,"comp_schema");
f[a]=c
},registerNewExperimentDataItemProps:function(c,b,a,g,d){var f=this._getExperimentGroup(c,b,"data_prop");
f[a+"_"+g]=d
},registerNewExperimentSchemaProps:function(c,b,a,d){var f=this._getExperimentGroup(c,b,"schema_prop");
f[a]=d
},registerNewExperimentCompSchemaProps:function(c,b,a,d){var f=this._getExperimentGroup(c,b,"comp_schema_prop");
f[a]=d
},getDeployedExperiments:function(){return this._deployedItems
},_isInDevMode:function(){return(window.debugMode!=="nodebug"&&window.debugMode!=="unit_test")
},_isInEditor:function(){return(viewMode==="editor")
},_markDevExperiment:function(){if(this._isInDevMode()&&this._isInEditor()){this.markExperimentsForDeployment({Dev:"New"})
}},_experimentsToLowerCase:function(a){var c={};
for(var b in a){lexperimentId=b.toLowerCase();
c[lexperimentId]=a[b].toLowerCase()
}return c
},_deploymentOrderToLowerCase:function(){var b=[];
for(var d=0;
d<this._deploymentOrder.length;
d++){var c=this._deploymentOrder[d];
var a={};
a.id=c.id.toLowerCase();
a.conflicts=this._arrayToLowerCase(c.conflicts);
a.dependencies=this._arrayToLowerCase(c.dependencies);
a.description=c.description;
b.push(a)
}this._deploymentOrder=b
},_arrayToLowerCase:function(a){return(!a||a.length==0)?[]:a.join().toLowerCase().split(",")
},_isAppsExperiment:function(b){var a=/^App~\w{1,}~\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/i;
return a.test(b)
},_isLanguageExperiemnt:function(a){var b=/^Lang_[a-z]{2,}/i;
return(b.test(a)||a=="MultiLang")
},_isFlagExperiemnt:function(a){var b=/^FLAG_/i;
return b.test(a)
},_cleanExperimentList:function(f){var c={};
var a={};
var g={};
var b;
if(f){b=f
}else{b=this._isInEditor()?editorModel:rendererModel
}for(var d in b.runningExperiments){if(this._isAppsExperiment(d)){c[d]=b.runningExperiments[d];
delete b.runningExperiments[d]
}else{if(this._isLanguageExperiemnt(d)){a[d]=b.runningExperiments[d];
delete b.runningExperiments[d]
}else{if(this._isFlagExperiemnt(d)){g[d]=b.runningExperiments[d];
delete b.runningExperiments[d]
}}}}b.runningApps=c;
b.runningLanguages=a;
b.runningFlags=g;
return b
},_recordDeployment:function(a,b){this._deployedItems[a]=this._deployedItems[a]||[];
this._deployedItems[a].push(b);
this._deploymentProgress++;
if(this._deploymentTimeout&&this.isReady()){clearTimeout(this._deploymentTimeout);
delete this._deploymentTimeout
}},_makeNewDataProps:function(b,c){var d=c.lastIndexOf("_");
var f=c.slice(d+1);
var a=c.slice(0,d);
W.Data.addDataProps(a,f,b);
this._recordDeployment(c,this.NEW_EXPER_ITEM)
},_makeNewSchemaProps:function(a,b){W.Data.addSchemaProps(b,a);
this._recordDeployment(b,this.NEW_EXPER_ITEM)
},_makeNewCompSchemaProps:function(a,b){W.ComponentData.addSchemaProps(b,a);
this._recordDeployment(b,this.NEW_EXPER_ITEM)
},_makeNewClass:function(a){W.Classes.newClass(a);
this._recordDeployment(a.name,this.NEW_EXPER_ITEM)
},_makeNewTrait:function(a){W.Classes.newTrait(a);
this._recordDeployment(a.name,this.NEW_EXPER_ITEM)
},_makeNewSkin:function(a){W.Skins.newSkin(a);
this._recordDeployment(a.name,this.NEW_EXPER_ITEM)
},_makeNewComponent:function(a){W.Components.newComponent(a);
this._recordDeployment(a.name,this.NEW_EXPER_ITEM)
},_makeNewData:function(b,a){W.Data.addDataItem(a,b);
this._recordDeployment(a,this.NEW_EXPER_ITEM)
},_makeNewManager:function(a,b){W.Classes.newClass(a);
W.Managers.list.combine([{Class:a.name,target:b}]);
this._recordDeployment(a.name,this.NEW_EXPER_ITEM)
},_makeNewDataTypeSchema:function(a,b){W.Data.registerDataTypeSchema(b,a);
this._recordDeployment(b,this.NEW_EXPER_ITEM)
},_deployBasicsExperiments:function(a){this._deployExperiments(a,this._overrideBasicItems)
},_getOrderedExperiment:function(b){for(var a=0;
a<this._deploymentOrder.length;
a++){var c=this._deploymentOrder[a];
if(c.id===b){return c
}}return null
},_isExperimentOrdered:function(a){return(this._deploymentOrder.some(function(c,b,d){return(c.id===a)
}))
},_validateExperimentConflicts:function(a){return(a.conflicts.every(function(d,b){var c=this._markedExperiments.hasOwnProperty(d);
if(c){this._reportInvalidExperiment(a.id,wixErrors.EXPERIMENT_IN_CONFLICT,"in conflict with: "+d)
}return !c
}.bind(this)))
},_validateExperimentDependencies:function(a){return(a.dependencies.every(function(c,b){var d=this._markedExperiments.hasOwnProperty(c);
if(!d){this._reportInvalidExperiment(a.id,wixErrors.EXPERIMENT_MISSING_DEPENDENCY,"dependency: "+c+" is missing")
}return d
}.bind(this)))
},_reportInvalidExperiment:function(c,b,d){var a;
if(c){a="Experiment: "+c+" "+d
}else{a=d
}if(this._isInDevMode()){console.log(a)
}else{LOG.reportError(b,"ExperimentsManager","_reportInvalidExperiment",a)
}},_reportExperimentsDeploymentError:function(){var a=this._getMissingExperimentsItemList();
var b="Missing items: "+JSON.stringify(a);
if(a.length==0){b="All experiment items were deployed. Please check console errors for more information"
}this._reportInvalidExperiment("",wixErrors.EXPERIMENT_DEPLOYMENT_TIMEOUT,b)
},_validateSingleExperiment:function(c,b){var a;
if(!c||!b||!(a=this._getOrderedExperiment(c))){this._reportInvalidExperiment(c,wixErrors.EXPERIMENT_UNKNOWN,"was not added to experiments-order.js");
return false
}if(this._registeredExperiments[c]&&this._registeredExperiments[c][b]){return(this._validateExperimentConflicts(a)&&this._validateExperimentDependencies(a))
}return true
},_validateExperiments:function(b){var c,a;
for(c in this._markedExperiments){a=this._markedExperiments[c];
this._validateSingleExperiment(c,a)
}},_deployHighLevelExperiments:function(a){this._deployExperiments(a,this._overrideHighLevelItems)
},_deployExperiments:function(c,f){var d,b,g;
for(var a=0;
a<this._deploymentOrder.length;
a++){d=this._deploymentOrder[a].id;
if(c[d]){b=c[d];
g=this._registeredExperiments[d]&&this._registeredExperiments[d][b];
if(g){f.call(this,g);
this._deployedExperiments[d]=b
}}}},_overrideBasicItems:function(a){this._overrideItems(a.constants,this._overrideConstants);
this._overrideItems(a.traits,this._overrideTrait);
this._overrideItems(a.new_traits,this._makeNewTrait);
this._overrideItems(a.classes,this._overrideClass);
this._overrideItems(a.new_classes,this._makeNewClass);
this._overrideItems(a.managers,this._overrideClass);
this._overrideItems(a.new_managers,this._makeNewManager)
},_overrideHighLevelItems:function(a){this._overrideItems(a.skins,this._overrideSkin);
this._overrideItems(a.components,this._overrideComponent);
this._overrideItems(a.data_schema,this._overrideDataSchema);
this._overrideItems(a.comp_schema,this._overrideCompSchema);
this._overrideItems(a.data,this._overrideData);
this._overrideItems(a.data_prop,this._makeNewDataProps);
this._overrideItems(a.schema_prop,this._makeNewSchemaProps);
this._overrideItems(a.comp_schema_prop,this._makeNewCompSchemaProps);
this._overrideItems(a.new_dataTypeSchema,this._makeNewDataTypeSchema);
this._overrideItems(a.new_data,this._makeNewData);
this._overrideItems(a.new_skins,this._makeNewSkin);
this._overrideItems(a.new_components,this._makeNewComponent)
},_countDeploymentSize:function(){var b=this._markedExperiments;
this._deploymentSize=0;
for(var c in b){var a=b[c];
var g=this._registeredExperiments[c]&&this._registeredExperiments[c][a];
if(g){for(var f in g){var d=Object.keys(g[f]).length;
this._deploymentSize+=d
}}}},_overrideConstants:function(b,a){W.Classes.get(a,function(c){Object.merge(Constants,b);
this._recordDeployment(a+"_"+b,this.NEW_EXPER_ITEM)
}.bind(this))
},_overrideItems:function(d,c){if(d&&c){for(var b in d){var a=d[b];
if(typeof a==="function"){a=a()
}c.call(this,a,b)
}}},_overrideClass:function(b,a){W.Classes.overrideDependency(a,b.name);
W.Classes.get(a,function(c){b.onClassReady=function(d){d.$originalClassName=a;
W.Classes.override(a,d);
this._recordDeployment(a,d.prototype.$className)
}.bind(this);
this._setExtendsName(a,c,b);
W.Classes.newClass(b)
}.bind(this))
},_overrideTrait:function(b,a){W.Classes.overrideDependency(a,b.name);
W.Classes.get(a,function(c){b.onClassReady=function(d){d.$originalClassName=a;
W.Classes.override(a,d);
this._recordDeployment(a,d.prototype.$className)
}.bind(this);
this._setExtendsName(a,c,b);
W.Classes.newTrait(b)
}.bind(this))
},_overrideSkin:function(b,a){W.Classes.overrideDependency(a,b.name);
W.Classes.get(a,function(c){W.Classes.get(b.name,function(d){d.$originalClassName=a;
W.Classes.override(a,d)
}.bind(this));
b.onSkinReady=function(d){W.Skins.override(a,d);
this._recordDeployment(a,d.prototype.$className)
}.bind(this);
this._setExtendsName(a,c,b);
W.Skins.newSkin(b)
}.bind(this))
},_overrideComponent:function(a,c){var b=W.Classes.overrideDependency(c,a.name);
W.Components.getComponent(b,function(d){W.Classes.get(a.name,function(f){f.$originalClassName=c;
W.Classes.override(c,f);
W.Components.override(c,f);
this._recordDeployment(c,f.prototype.$className)
}.bind(this));
this._setExtendsName(c,d,a);
W.Components.newComponent(a)
}.bind(this))
},_overrideData:function(b,a){W.Data.getDataByQuery("#"+a,function(c){this._makeNewData(b,a)
}.bind(this))
},_overrideDataSchema:function(a,b){W.Data.getSchema(b,function(c){W.Data.registerDataTypeSchema(b,a);
this._recordDeployment(b,this.NEW_EXPER_ITEM)
}.bind(this))
},_overrideCompSchema:function(a,b){W.ComponentData.getSchema(b,function(c){W.ComponentData.registerDataTypeSchema(b,a);
this._recordDeployment(b,this.NEW_EXPER_ITEM)
}.bind(this))
},_registerExperimentClassItem:function(g,d,f,a,b){var i=this._getExperimentGroup(g,d,f);
var c=b||a.Class.Extends;
i[c]=a
},_registerNewExperimentClassItem:function(d,b,c,a){var f=this._getExperimentGroup(d,b,c);
f[a.name||this._getUniqueIdentifier()]=a
},_setExtendsName:function(c,f,a){var d=f.prototype;
while(d&&d.$className!=c){d=d.$parentPrototype
}var b=a.Class||a.trait;
if(b&&b.Extends===c&&d.Extends){b.$extendsName=d.Extends.prototype.$className
}},_getUniqueIdentifier:function(){return("id_"+this._uniqueIdentifier++)
},_getExperimentGroup:function(c,a,b){c=c.toLowerCase();
a=a.toLowerCase();
this._registeredExperiments[c]=this._registeredExperiments[c]||{};
this._registeredExperiments[c][a]=this._registeredExperiments[c][a]||{};
this._registeredExperiments[c][a][b]=this._registeredExperiments[c][a][b]||{};
return this._registeredExperiments[c][a][b]
},_getMissingExperimentsItemList:function(){var j={};
for(var i in this._markedExperiments){if(this._markedExperiments[i]!="none"){j[i]=this._markedExperiments[i]
}}missingItems=[];
for(i in j){var c=j[i];
var f=this._registeredExperiments[i]&&this._registeredExperiments[i][c];
if(f){for(var g in f){for(var d in f[g]){var a=W.Classes.getClassStatus(d);
if(a!="ready"){var b={};
b[i]=d;
missingItems.push(b)
}}}}}return missingItems
},markExperimentFromURL:function(){var g=window.location.search.slice(1);
var d=g.split("&");
if(d){var c=d.filter(function(k,i){var j=k.substring(k.indexOf("=")+1,k.indexOf(":"));
return(k.indexOf("experiment")==0)&&!this._isLanguageExperiemnt(j)&&!this._isAppsExperiment(j)
}.bind(this));
for(var b=0;
b<c.length;
b++){var f=c[b].split("=")[1];
var a={};
a[f.split(":")[0].toLowerCase()]=f.split(":")[1].toLowerCase();
this.markExperimentsForDeployment(a)
}}},isReady:function(){return(this._deploymentProgress==this._deploymentSize)
}}});
W.Classes.get("mobile.core.managers.ExperimentsManager",function(a){W.Experiments=new a()
});
function before(b){var a=function(){return b
};
a.beforeFlag=true;
return a
}function around(b){var a=function(){return b
};
a.aroundFlag=true;
return a
}function after(b){var a=function(){return b
};
a.afterFlag=true;
return a
}W.Classes.newClass({name:"mobile.core.managers.deployment.Managers",Class:{Extends:Events,Binds:["deploySingleManager"],Static:{DEPLOYMENT_COMPLETED_EVENT:"deploymentCompleted"},initialize:function(){this.addEvent(this.DEPLOYMENT_COMPLETED_EVENT,function(){});
this._deploymentProgress=0;
this._syncMode=false
},list:[{Class:"mobile.core.utils.InputBindings",target:"InputBindings"},{Class:"mobile.core.managers.ClassManager",target:"Classes"},{Class:"mobile.core.utils.Commands",target:"Commands"},{Class:"mobile.core.managers.events.EventsManager",target:"Events"},{Class:"mobile.core.managers.events.CommandsManager",target:"CommandsNew"}],deploy:function(){this._preDeploy();
LOG.reportEvent(wixEvents.DEPLOY_MANAGERS_START);
this.list.each(this.deploySingleManager);
this._injectsList=null;
LOG.reportEvent(wixEvents.DEPLOY_MANAGERS_END)
},deploySync:function(){this._preDeploy();
LOG.reportEvent(wixEvents.DEPLOY_MANAGERS_START);
this.list.each(this.deploySingleManagerSync);
this._injectsList=null;
LOG.reportEvent(wixEvents.DEPLOY_MANAGERS_END);
W.Experiments.notifyManagersDeploymentDone();
this.fireEvent(this.DEPLOYMENT_COMPLETED_EVENT);
this._syncMode=true
},_preDeploy:function(){W.Experiments.notifyManagersDeploymentStart();
this._deploymentSize=this.list.length-1
},_postDeploy:function(){++this._deploymentProgress;
if(this.isReady()){W.Experiments.notifyManagersDeploymentDone();
this.fireEvent(this.DEPLOYMENT_COMPLETED_EVENT)
}},isReady:function(){if(this._syncMode){return true
}else{return(this._deploymentProgress>=this._deploymentSize)
}},deploySingleManager:function(b,a){if(!instanceOf(b.target,String)){LOG.reportError(wixErrors.MANAGERS_INVALID_NAME,this.className,"deploySingleManager",null);
throw new Error(wixErrors.MANAGERS_INVALID_NAME.desc)
}if(b.Class!="mobile.core.managers.ClassManager"){W.Classes.get(b.Class,function(c){if(!instanceOf(c,Function)&&!instanceOf(c,Class)){LOG.reportError(wixErrors.MANAGERS_INVALID_CLASS,this.className,"deploySingleManager",b.target);
throw new Error(wixErrors.MANAGERS_INVALID_CLASS.desc)
}W[b.target]=new c();
this._postDeploy()
}.bind(this))
}},deploySingleManagerSync:function(b,a){if(!instanceOf(b.target,String)){LOG.reportError(wixErrors.MANAGERS_INVALID_NAME,this.className,"deploySingleManager",null);
throw new Error(wixErrors.MANAGERS_INVALID_NAME.desc)
}if(b.Class!="mobile.core.managers.ClassManager"){var c=W.Classes.get(b.Class);
if(!instanceOf(c,Function)&&!instanceOf(c,Class)){LOG.reportError(wixErrors.MANAGERS_INVALID_CLASS,this.className,"deploySingleManager",b.target);
throw new Error(wixErrors.MANAGERS_INVALID_CLASS.desc)
}W[b.target]=new c()
}},takeSnapshot:function(){if(!this.isReady()){return false
}var d=this.getManagers();
var b={};
if(Object.some(d,function(f){if(!instanceOf(f.isReady,Function)){LOG.reportError(wixErrors.MANAGERS_INVALID,f.className,"takeSnapshot","");
throw new Error(wixErrors.MANAGERS_INVALID.desc)
}return !f.isReady()
})){return false
}var a={};
this.list.forEach(function(i){var g=i.target;
var f=W[g];
a[g]=f;
W[g]=b[g]=f.clone()
});
for(var c in a){W[c]=a[c]
}b.Utils=new UtilsClass();
this._snapshot=b;
return true
},notReadyMessage:function(){if(!this.isReady()){return"mobile.core.managers.deployment.Managers is not ready, this probably an indication that test files are not loaded properly"
}var b=this.getManagers();
var a="";
Object.each(b,function(d,c){if(!d){a+=c+" is undefined\n"
}else{if(!instanceOf(d.isReady,Function)){a+=c+" isReady is not defined or not a function\n"
}else{if(!d.isReady()){if(!d.getNotReadyMessage){a+=c+" is not ready, no details supplied by manager\n"
}else{a+=c+" is not ready. Details: "+d.getNotReadyMessage()+"\n"
}}}}});
if(a===""){a="there is no reason for takeSnapshot failure"
}return a
},_$notReadyList:function(){var b=this.getManagers();
var a=true;
for(var c in b){if(!b[c].isReady()){W.Utils.debugTrace(c+" is not ready");
a=false
}}if(a){return"all managers are ready :)"
}},deploySnapshot:function(){if(this._snapshot===undefined){return false
}Object.forEach(this._snapshot,function(b,a){W[a]=b.clone()
});
this._injectsList=null;
return true
},hasSnapShot:function(){return this._snapshot!==undefined
},getManagers:function(){var a={};
a.Utils=W.Utils;
this.list.forEach(function(b){a[b.target]=W[b.target]
});
this._injectsList=a;
return a
},override:function(a){this.list.forEach(function(c){var b=a.filter(function(d){return d.target==c.target
});
if(b.length>0){c.Class=b[b.length-1].Class
}})
}}});
W.Classes.get("mobile.core.managers.deployment.Managers",function(a){W.Managers=new a()
});
(function(){var i,n,p,r,l,o,b,q;
i=new Element("style",{id:"testCss"}).inject(document.head);
r=(i.sheet)?"sheet":"styleSheet";
n=i[r];
if(!n){LOG.reportError(wixErrors.UTILS_STYLE_NOT_FOUND,"Styles","feature detection")
}l=(n.ownerNode)?"ownerNode":"owningElement";
b=(n.deleteRule)?"deleteRule":"removeRule";
o=(n.cssRules)?"cssRules":"rules";
var k=function(t){return t.replace(/[\s]+/g," ").replace(/'/g,'"').replace(/^\s+/,"").replace(/\s*$/,"")
};
var g;
if(n.insertRule){g=function(t,w){t=k(t);
if(this._rulesMap[t]){LOG.reportError(wixErrors.UTILS_RULE_ALREADY_EXIST,"Styles","createRule",t+"");
return
}var u=this.insertRule(t+"{"+w+"}",this.cssRules.length);
var v=this.cssRules[u];
this._rulesMap[t]=v;
this._browserSelectorMapping[t]=v.selectorText;
return v
}
}else{g=function(t,x){t=k(t);
if(this._rulesMap[t]){LOG.reportError(wixErrors.UTILS_RULE_ALREADY_EXIST,"Styles","createRule",t+"");
return
}var v=this.addRule(t,x);
var w;
if(v!=-1){w=this.rules[v]
}else{for(var u=0;
u<this.rules.length;
++u){if(this.rules[u].selectorText==t){w=this.rules[u];
break
}}}this._rulesMap[t]=w;
this._browserSelectorMapping[t]=w.selectorText;
return w
}
}n._rulesMap={};
n._browserSelectorMapping={};
p=g.apply(n,["#tempSelector","color:black;"]);
q=(p.cssText)?"cssText":"no_support";
var a=function(){return this[r]
};
var m=function(){return this[o]
};
var c=function(){this._rulesMap=undefined;
this.styleNode.dispose()
};
var j=function(){this._rulesMap=[];
for(var t=this[o].length-1;
t>=0;
--t){this[b](t)
}};
var f=function(t){t=k(t);
return(this._rulesMap[t])?this._rulesMap[t]:null
};
var d=function(t){t=k(t);
var w=false;
if(this._rulesMap[t]){var x=this._browserSelectorMapping[t];
var u=this[o].length-1;
for(var v=u;
v>=0;
--v){if(this[o][v].selectorText==x){this[b](v);
w=true
}}delete this._rulesMap[t]
}return w
};
var s;
if(n.cssRules){s=function(t,v){t=k(t);
var u=this._rulesMap[t];
if(!u){u=this.createRule(t,v);
this._rulesMap[t]=u
}else{u.style[q]=v
}return u
}
}else{s=function(t,u){t=k(t);
if(this._rulesMap[t]){this.removeRuleBySelector(t);
delete this._rulesMap[t]
}return this.createRule(t,u)
}
}W.Classes.newClass({name:"mobile.core.utils.Styles",Class:{createStyleSheet:function(v){var x=W.Utils.getUniqueId(v);
var w=new Element("style",{id:x}).inject(document.head);
var u=w[r];
if(!u){var y=document.styleSheets;
for(var t=0;
t<y.length;
++t){if(y[t][l]===w){u=y[t];
break
}}}if(u){u._rulesMap={};
u._browserSelectorMapping={};
u.styleNode=w;
u.getRuleList=m;
u.removeStyleSheet=c;
u.clearRules=j;
u.getRuleBySelector=f;
u.removeRuleBySelector=d;
u.updateRule=s;
u.createRule=g;
w.getStyleSheet=a;
return u
}LOG.reportError(wixErrors.UTILS_ERR_CREATE_STYLE,"Styles","createStyleSheet","")
}}})
})();
window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(b,a){window.setTimeout(b,1000/60)
}
})();
W.Classes.newClass({name:"mobile.core.utils.Tween",Class:{Static:{_activeTweens:[],killAll:function(){while(this._activeTweens.length>0){this.killTween(this._activeTweens[0])
}},killTweensOf:function(a){var b=[];
this._activeTweens.forEach(function(c){if(c._target===a){b.push(c)
}});
b.forEach(function(c){this.killTween(c)
})
},killTween:function(b){var a;
b.dispose();
a=this._activeTweens.indexOf(b);
if(a!=-1){this._activeTweens.splice(a,1)
}},_startTween:function(){this.killTweensOf(this._target);
this._activeTweens.push(this);
this._t0=this._getCurrentTime();
window.requestAnimFrame(this._render.bind(this))
},debugMode:false,log:function(){},to:function(d,c,f){var a=this;
var b=new a(d,c,f)
},execute:function(g,f,c,d){d.myProp=f;
var a=this;
var b=new a({myProp:g},c,d)
}},initialize:function(g,b,a){var j,k;
this._target=g;
this._duration=Math.floor(b*1000);
this._easeParams=[];
this._t=0;
this._tStep=null;
this._isAlive=true;
var i=typeOf(g)=="element";
if(i){this._setValueFunc=this._setStyle
}else{this._setValueFunc=this._setTargetProperty
}this._easeFunc=this.linear;
var f=this._parseParameter(a,"ease","linear");
if(this[f]!==undefined&&typeOf(this[f])=="function"){this._easeFunc=this[f]
}this._onCompleteCallback=this._parseParameter(a,"onComplete",null);
this._onUpdateCallback=this._parseParameter(a,"onUpdate",null);
var c=this._parseParameter(a,"delay",0);
for(var d in a){if(i||g[d]!==undefined){j={};
j.propName=d;
if(i){k=g.getStyle(d);
j.origValue=parseFloat(k);
j.unit=this._parseUnit(k);
if(isNaN(j.origValue)){j.origValue=0;
j.unit="px"
}}else{j.origValue=parseFloat(g[d])
}j.targetValue=parseFloat(a[d]);
this._easeParams.push(j)
}}if(c===0){this._startTween()
}else{c=parseInt(c*1000,10);
setTimeout(this._startTween.bind(this),c)
}},_parseUnit:function(b){var a=/[^0-9-]+$/;
if(a.test(b)===true){return String(String(b).match(a)[0])
}else{return""
}},_parseParameter:function(c,d,b){var a;
if(c[d]!==undefined){a=c[d];
delete c[d]
}else{a=b
}return a
},_render:function(){var d;
var c;
if(this._isAlive){var b=this._getCurrentTime();
this._tStep=b-this._t0;
this._t0=b;
this._t+=this._tStep;
for(var a=0;
a<this._easeParams.length;
a++){d=this._easeParams[a];
if(this._t<this._duration){c=this._easeFunc(this._t,0,1,this._duration)*(d.targetValue-d.origValue)+d.origValue
}else{c=d.targetValue
}if(this.debugMode===true){this.log(this._tStep,this._t,c)
}if(d.unit){if(d.unit=="px"){c=Math.round(c)
}}this._setValueFunc(d.propName,c,d.unit);
if(this._onUpdateCallback!==null){this._onUpdateCallback(c,this._target,d.propName)
}}if(this._t<this._duration){window.requestAnimFrame(this._render.bind(this))
}else{if(this._onCompleteCallback!==null){this._onCompleteCallback(this)
}this.killTween(this)
}}},_getCurrentTime:function(){return new Date().getTime()
},_setStyle:function(c,b,a){this._target.setStyle(c,String(b)+a)
},_setTargetProperty:function(b,a){this._target[b]=a
},dispose:function(){this._isAlive=false;
this._target=null;
this._onCompleteCallback=null;
this._onUpdateCallback=null
},linear:function(f,a,i,g){return i*f/g+a
},strong_easeIn:function(f,a,i,g){return i*(f/=g)*f*f*f*f+a
},strong_easeOut:function(f,a,i,g){return i*((f=f/g-1)*f*f*f*f+1)+a
},strong_easeInOut:function(f,a,i,g){if((f/=g*0.5)<1){return i*0.5*f*f*f*f*f+a
}return i*0.5*((f-=2)*f*f*f*f+2)+a
},swing:function(f,a,i,g){return(-Math.cos(this.linear(f,a,i,g)*Math.PI)/2)+0.5
}}});
W.Classes.newClass({name:"mobile.core.managers.Hash",Class:{Extends:Events,intervalId:0,initialize:function(){this._storedExtData="";
if("onhashchange" in window&&!Browser.ie8){window.onhashchange=function(){this._onHashChange()
}.bind(this)
}else{this._storedObjectId=window.location.hash;
clearInterval(this.intervalId);
this.intervalId=window.setInterval(function(){this._onHashChange()
}.bind(this),100)
}},fireHashChangeEvent:function(){if(Browser&&Browser.ie8){this._onHashChange("force change")
}else{this._onHashChange()
}},_onHashChange:function(b){var d=this.getHashParts();
var f=this._storedObjectId!=d.id;
if(b==="force change"){f=true
}var a=this._storedExtData!=d.extData;
if(f||a){this._storedObjectId=d.id;
this._storedExtData=d.extData;
var c=false;
if(this._silencedExtData){if(this._silencedExtData==d.extData){delete this._silencedExtData;
c=true
}}this.fireEvent("change",{newHash:d.id,isForSureAfterChange:true,extData:d.extData,isIdChanged:f,isExtDataChanged:a,silent:c})
}if(window.rendererModel&&window.rendererModel.runningFlags&&window.rendererModel.runningFlags.FLAG_cleanhomepageurl){this._cleanHomePageURL()
}},getHash:function(){var a=window.location.hash;
a=unescape(a);
var b=this.getHashParts(a);
return b.id
},getHashParts:function(g){g=g||window.location.hash;
var i="|",j="/",d="/",a=g,l="",f="";
if((g.length>1)&&g.substr(0,2)=="#!"){a=g.substr(2)
}else{if(g.charAt(0)=="#"){a=g.substr(1)
}}var c=a.indexOf(j),m=a.indexOf(i),k=j;
if((m!=-1)&&(m<c)||(m>-1)&&(c==-1)){k=i
}var b=a.indexOf(k);
if(b>-1){l=a.substr(0,b);
a=a.substr(b+1)
}b=a.indexOf(d);
if(b>-1){f=a.substr(b+1);
a=a.substr(0,b)
}return{id:a?a:"",title:l?l:"",extData:f?f:""}
},getHashPartsString:function(a,d,g){var c="|";
var f="/";
var b="";
if(d){b=d.replace(/([^\s\w\d_-])/g,"").replace(/\s+/g,"-")
}b+=f+a;
if(g){b+=f+g
}return b
},setHash:function(a,g,i,d){g=g||"untitled";
var c=this.getHashPartsString(a,g,i);
var f=this._storedObjectId!==a;
var b=this._storedExtData!=i;
if(f||b){if(d){this._silencedExtData=i
}this.fireEvent("change",{newHash:a,isForSureAfterChange:false,extData:i,isExtDataChanged:b,isIdChanged:f,silent:(d==true)});
W.Utils.callLater(function(){var j=window.location.hash;
if(j!=="#!"+c){window.location.hash="!"+c
}}.bind(this))
}},setHashExtData:function(a){var b=this.getHashParts();
this.setHash(b.id,b.title,a,true)
},_cleanHomePageURL:function(){var c,b;
var d=this.getHashParts(c);
if(d.extData){return
}if(W.Viewer.getHomePageId()!=d.id){return
}if(window.history&&window.history.replaceState){c=window.location.hash;
b=window.location.href;
var a=b.substr(0,b.length-c.length);
window.history.replaceState(null,null,a)
}else{window.location.hash=""
}}}});
function UtilsClass(){if(this===(function(){return this
}())){return new UtilsClass()
}this._getUtilsDependencies();
this._prefixCounterMap={}
}UtilsClass.extendPrototype=function(d){var c,g,f,a,b=arguments;
a=(typeof this==="function")?this.prototype:this;
if(typeof d==="string"){b=[].slice.call(arguments,1);
a=a[d]=a[d]||{}
}for(c=0;
c<b.length;
c++){f=b[c];
for(g in f){if(f.hasOwnProperty(g)){a[g]=f[g]
}}}};
UtilsClass.prototype._getUtilsDependencies=function(){var a=this;
if(W.Classes){W.Classes.get("mobile.core.managers.Hash",function(b){a.hash=new b()
});
W.Classes.get("mobile.core.utils.Styles",function(b){a._styles=new b()
});
W.Classes.get("mobile.core.utils.Tween",function(b){a.Tween=b
})
}};
UtilsClass.prototype.clone=function(){return new UtilsClass()
};
UtilsClass.prototype.isReady=function(){if(this.hash&&this._styles&&this.Tween){return true
}};
W.Utils=new UtilsClass();
UtilsClass.extendPrototype({log:function(){}});
UtilsClass.extendPrototype({_sendURLtoGoogleAnalytics:function(b,a){b._trackPageview(a)
},_getGoogleAnalyticsTracker:function(a){if(!window._gat){return
}pageTracker=_gat._getTracker(a);
pageTracker._initData();
return pageTracker
},reportSiteAnalytics:function(d,f){var c="UA-2117194-25";
var a="site";
var b=a+"/"+d;
if(f){b=b+"/"+f
}this.sendToGoogleAnalytics(b,c)
},reportEditorAnalytics:function(d,f){var c="UA-2117194-23";
var a="editor";
var b=a+"/"+d;
if(f){b=b+"/"+f
}if(window.siteHeader){if(window.siteHeader.username){b=b+"/"+siteHeader.username
}if(window.siteHeader.siteName){b=b+"/"+siteHeader.siteName
}}this.sendToGoogleAnalytics(b,c)
},sendToGoogleAnalytics:function(b,d){try{if(window._gat){var f=this._getGoogleAnalyticsTracker(d);
this._sendURLtoGoogleAnalytics(f,b,d);
return
}var i=(("https:"==document.location.protocol)?"https://ssl.":"http://www.");
var a=new Element("script",{id:"googleAnalyticsScript"});
var c=document.getElementsByTagName("script")[0];
a.type="text/javascript";
c.parentNode.insertBefore(a,c);
a.src=i+"google-analytics.com/ga.js";
this.gaCheck(b,d)
}catch(g){}},gaCheck:function(a,b){try{if(window._gat){var c=this._getGoogleAnalyticsTracker(b);
this._sendURLtoGoogleAnalytics(c,a)
}else{setTimeout(this.gaCheck.bind(this,a,b),1000)
}}catch(d){}}});
UtilsClass.extendPrototype({show:function(a){$(a).uncollapse()
},hide:function(a){$(a).collapse()
},setChildIndex:function(b,g,c){var d=b.getChildren();
var f=d[g];
var a=d[c];
if(f==a){f.fireEvent(Constants.DisplayEvents.MOVED_IN_DOM,Constants.DisplayEvents.MOVED_IN_DOM)
}if(f&&a){f.inject(a,(c<g?"before":"after"));
f.fireEvent(Constants.DisplayEvents.MOVED_IN_DOM,Constants.DisplayEvents.MOVED_IN_DOM);
a.fireEvent(Constants.DisplayEvents.MOVED_IN_DOM,Constants.DisplayEvents.MOVED_IN_DOM)
}},waitForElement:function(a,f,g,b){var i=0;
var d=g/f;
var c=setInterval(function(){i++;
if(i>d){clearInterval(c);
b(false)
}var j=$$(a).length;
if(j>0){clearInterval(c);
b(true)
}},f)
},createStyleSheet:function(a){return this._styles.createStyleSheet(a)
},getComputedStyle:function(a){if(window.getComputedStyle){return window.getComputedStyle(a,null)
}else{return a.currentStyle
}},_htmlTextReplacements:[["<","&lt;"],[">","&gt;"]],convertToHtmlText:function(d){d=d.toString();
for(var b=0;
b<this._htmlTextReplacements.length;
++b){var c=this._htmlTextReplacements[b][0];
var a=this._htmlTextReplacements[b][1];
while(d.indexOf(c)!=-1){d=d.replace(c,a)
}}return d
},convertFromHtmlText:function(d){for(var b=0;
b<this._htmlTextReplacements.length;
++b){var c=this._htmlTextReplacements[b][0];
var a=this._htmlTextReplacements[b][1];
while(d.indexOf(a)!=-1){d=d.replace(a,c)
}}return d
},getWindowSize:function(){var c,b;
if(typeof window.innerWidth!="undefined"){c=window.innerWidth;
b=window.innerHeight
}else{if(typeof document.documentElement!=="undefined"&&typeof document.documentElement.clientWidth!=="undefined"&&document.documentElement.clientWidth!==0){c=document.documentElement.clientWidth;
b=document.documentElement.clientHeight
}else{var a=document.getElementsByTagName("body")[0];
c=a.clientWidth;
b=a.clientHeight
}}return{width:c,height:b}
},getPositionRelativeToWindow:function(b){if(!$$(b).length){return{x:0,y:0}
}var c=$$(b)[0];
var d=c.getPosition();
var a=window.getScroll();
d.x-=a.x;
d.y-=a.y;
return d
},getMidPos:function(n,c,g){var m=window.getSize();
var d=m.x;
var l=m.y;
var k,j,i,f;
if(g.page){k=g.page.x;
j=g.page.y;
i=g.client.x+n;
f=g.client.y+c
}else{k=g.pageX;
j=g.pageY;
i=g.clientX+n;
f=g.clientY+c
}var b=(i>=d)?(k-(i-d)):k;
var a=(f>=l)?(j-(f-l)):j;
return{x:b,y:a}
},getCSSBrowserFeature:function(b){var a=Modernizr.prefixed(b.camelCase());
return(!a)?false:a.replace(/([A-Z])/g,function(d,c){return"-"+c.toLowerCase()
}).replace(/^ms-/,"-ms-")
},getIsSibling:function(b,a){return b&&a&&b.getParent()===a.getParent()
},iframeCallback:0,prepareIFrameForWrite:function(b,f){try{var d=b.contentWindow.document||b.contentWindow.document;
f(b,d)
}catch(c){var a="tmp"+(this.iframeCallback++);
W[a]=function(){var g=b.contentDocument||b.contentWindow.document;
f(b,g)
};
b.src=W.Config.getServiceTopologyProperty("scriptsRoot")+"/html/sameDomainIFrame.html?d="+encodeURIComponent(document.domain)+"&c="+encodeURIComponent(a)
}},forceBrowserRepaint:function(c,f,a){a=a||["safari"];
var d=false;
var b=0;
for(b;
b<a.length;
b++){if(Browser[a[b]]){d=true;
break
}}if(d){c=c||$$("body");
f=f||150;
c.setStyle("opacity",0.99);
setTimeout(function(){c.setStyle("opacity",1)
},f)
}},forceBrowserRepaintOnScroll:function(a){if(Browser.safari){a=a||$$("body");
this._op=(this._op===1)?0.99:1;
a.setStyle("opacity",this._op)
}},stopMouseWheelPropagation:function(b){b=b||{};
var a=this.getSize().y;
if((this.scrollTop===(this.scrollHeight-a)&&b.wheel<0)||(this.scrollTop===0&&b.wheel>0)){b.preventDefault()
}},printNodesWithStyle:function(a,d){var f=this.getComputedStyle(a);
if(f&&f[d]&&f[d]!="auto"){console.log(f[d],a)
}if(!a.childNodes){return
}var c=a.childNodes;
for(var b=0;
b<c.length;
b++){this.printNodesWithStyle(c[b],d)
}},requestAnimFrame:function(){},isInputKey:function(a){if(!a){return false
}if(a<48){return(a==13||a==32||a==8||a==46)
}if(a>=112&&a<=145){return false
}if(a>90&&a<=93){return false
}return true
},numberToPageId:function(c){var b=c.toString(36);
var a=b.length;
if(a<3){b="0000".substr(0,3-a)+b
}return b
},serverRequest:function(f,i,d,g,a){var c="";
var b=new Request.JSON({url:c+f,onSuccess:g,onFailure:a});
if(i=="post"){b.post(d)
}else{b.get(d)
}}});
(function(){var a=typeof window!="undefined"?window:exports,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",b=(function(){try{document.createElement("$")
}catch(d){return d
}}());
a.btoa||(a.btoa=function(i){for(var k,f,d=0,j=c,g="";
i.charAt(d|0)||(j="=",d%1);
g+=j.charAt(63&k>>8-d%1*8)){f=i.charCodeAt(d+=3/4);
if(f>255){throw b
}k=k<<8|f
}return g
});
a.atob||(a.atob=function(i){i=i.replace(/=+$/,"");
if(i.length%4==1){throw b
}for(var k=0,j,f,d=0,g="";
f=i.charAt(d++);
~f&&(j=k%4?j*64+f:f,k++%4)?g+=String.fromCharCode(255&j>>(-2*k&6)):0){f=c.indexOf(f)
}return g
})
}());
UtilsClass.extendPrototype({errorPopup:function(c,a,b){if(W.EditorDialogs){if(window.debugMode&&window.debugMode!=="nodebug"){W.EditorDialogs.openErrorDialog(c,a,b)
}else{W.EditorDialogs.openErrorDialog(c,a)
}}},debugTrace:function(){if(window.debugMode!=="nodebug"){if(window.console){if(console.log.apply){console.log.apply(console,arguments)
}else{console.log(arguments)
}}}},reportWixifyTimeOut:function(a,b,d,c){this.debugTrace(["* Wixify timeout id:"+a.get("id")+" comp:"+a.get("comp"),{node:a,logic:b,skin:d,data:c},{pendingClasses:W.Classes._pendingNewClassesQueue.map,pendingSkins:W.Skins._skinQue.map}])
},alertError:function(d,b,a,f,c){if(!c){LOG.reportError(d,b,a,f)
}this.errorPopup("Error",f,b+"."+a+"\n\n"+f);
return(window.debugMode!="debug")?function(){}:null
},getStackTrace:function(b){b=(!isNaN(b)&&b>0)?b:1;
var d=new Error();
var a="(no stack)";
if(d.stack){a=d.stack
}else{if(window.opera&&d.message){a=d.message
}else{}}a=a.split("[object Object]").join("{}");
a=a.split("[object Array]").join("[]");
a=a.replace(/at/g,"");
a=a.split(window.serviceTopology.scriptsRoot+"/javascript/").join("");
var c=a.split("\n");
if(c[0].toLowerCase()=="error"){b++
}c=c.splice(b);
return c.join("<<").replace(/\s{2,}/g," ")
}});
UtilsClass.extendPrototype({getAddPageTemplateFromMainPage:function(b,a,c){return this.getAddPageTemplateFromPage("mainPage",b,a,c)
},getAddPageTemplateFromCurrentPage:function(b,a,c){return this.getAddPageTemplateFromPage(W.Preview.getPreviewManagers().Viewer.getCurrentPageId(),b,a,c)
},getAddPageTemplateFromPage:function(a,i,c,b){c=c||"";
var j=W.Preview.getHtmlElement(a).getLogic();
var k="ADD_PAGE_"+i.toUpperCase()+"_GROUPNAME";
var d="ADD_PAGE_"+i.toUpperCase()+c+"_NAME";
var g="ADD_PAGE_"+i.toUpperCase()+c+"_DESCRIPTION";
var f={group:k,name:d,applicationType:b||Constants.WEditManager.SITE_TYPE_WEB,previewPic:i.toLowerCase()+c+".png",pageDescription:g,serializedPageData:W.ClipBoard.copyComponent(j)};
strRet=JSON.encode(f);
strRet=strRet.replace(/\\\"/g,"\\'");
return strRet
}});
UtilsClass.extendPrototype({getUniqueId:function(a){var b=this._prefixCounterMap;
a=a?a.replace(/[^A-Za-z0-9_-]/g,""):"";
if(a.length>3){a=a?a.replace(/[aeiou]/gi,""):""
}a=a?a:Constants.components.DEFAULT_PREFIX;
b[a]=b[a]===undefined?0:++b[a];
while($(a+b[a].toString(36))){b[a]++
}return a+b[a].toString(36)
},getGUID:function(){var a=function(){return Math.floor(Math.random()*65536).toString(16)
};
return(a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a())
},getAntiCacheSuffix:function(){var c=W.Utils.getQueryParam("nocache");
var a=W.Utils;
var b;
if(window.location.protocol==="file:"||c=="false"||window.debugMode==="nodebug"){b=""
}else{if(!a._antiCacheSuffix){a._antiCacheSuffix=new Date().getTime().toString(36)
}b="?noCache="+a._antiCacheSuffix
}return b
},setUrlParam:function(b,g,f){var j=b.split("?");
var a=[];
var d=false;
if(j.length==2){a=j[1].split("&");
for(var c=0;
c<a.length;
c++){if(a[c].indexOf(g+"=")===0){a[c]=g+"="+String(f);
d=true;
break
}}}if(!d){a.push(g+"="+String(f))
}j[1]=a.join("&");
b=j.join("?");
return b
},getMailFromMailtoURL:function(c){var b="mailto:";
var f=b.length;
if(c.substr(0,f)==b){c=c.substr(f)
}var d="?subject=";
var a=c.indexOf(d);
if(a>-1){c=c.substr(0,a)
}return c
},getQueryParam:function(c,b){c=c.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var a="[\\?&]"+c+"=([^&#]*)";
var g=new RegExp(a);
var f=b||window.location.href;
var d=g.exec(f);
if(d===null){return""
}else{return d[1]
}},callLater:function(f,d,b,c){if(f&&typeOf(f)==="function"){d=d||[];
b=b||window;
c=c||1;
var a=(this.getQueryParam("stack")==="true")?this.getStackTrace():"";
return setTimeout(function(){f.callLaterStack=a;
f.apply(b,d);
delete f.callLaterStack
},c)
}},clearCallLater:function(a){clearTimeout(a)
},callOnNextRender:function(c,a){a=a||60;
var b=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(d){window.setTimeout(d,a)
};
return b(c)
},clearOnNextRender:function(a){var b=window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout;
b(a)
},objectSizeDelta:function(c){var a=0;
for(var b in c){if(c.hasOwnProperty(b)){a++
}}return a
},getTimestamp:function(){var j=[W.Resources.get("EDITOR_LANGUAGE","DAY_SUNDAY"),W.Resources.get("EDITOR_LANGUAGE","DAY_MONDAY"),W.Resources.get("EDITOR_LANGUAGE","DAY_TUESDAY"),W.Resources.get("EDITOR_LANGUAGE","DAY_WEDNESDAY"),W.Resources.get("EDITOR_LANGUAGE","DAY_THURSDAY"),W.Resources.get("EDITOR_LANGUAGE","DAY_FRIDAY"),W.Resources.get("EDITOR_LANGUAGE","DAY_SATURDAY")];
var a=new Date();
var i=a.getDate();
var d=a.getMonth()+1;
var k=W.Resources.get("EDITOR_LANGUAGE","MONTH_"+d);
var c=a.getHours();
if(c<10){c="0"+c
}var b=a.getMinutes();
if(b<10){b="0"+b
}var f=a.getDay();
var g=a.getYear()+1900;
return j[f]+", "+i+" "+k+" "+g+", "+c+":"+b
},naiveInstanceOf:function(b,a){if(!b){return false
}if(!instanceOf(a,String)&&instanceOf(b,a)){return true
}if(!instanceOf(a,String)){a=a.prototype.className
}if(b._instanceOf===undefined||a===undefined){return false
}return b._instanceOf.some(function(c){return c==a
})
},sanitizeUnicode:function(a){return typeof a=="string"?a.replace(/[\u2028\u2029]/g,"\u000A"):a
},getUniqueArray:function(a){var c=[];
var f=a.length;
for(var d=0;
d<f;
d++){for(var b=d+1;
b<f;
b++){if(a[d]===a[b]){b=++d
}}c.push(a[d])
}return c
},areArraysContainSameElements:function(d,c){var b=d.filter(function(f){return c.indexOf(f)==-1
});
var a=c.filter(function(f){return d.indexOf(f)==-1
});
if((a&&a.length>0)||(b&&b.length>0)){return false
}return true
},areObjectsEqual:function(b,a){var c;
for(c in b){if(typeof(a[c])=="undefined"){return false
}}for(c in b){if(b[c]){switch(typeof(b[c])){case"object":if(!this.areObjectsEqual(b[c],a[c])){return false
}break;
case"function":if(typeof(a[c])=="undefined"||(b[c].toString()!=a[c].toString())){return false
}break;
default:if(b[c]!=a[c]){return false
}}}else{if(a[c]){return false
}}}for(c in a){if(typeof(b[c])=="undefined"){return false
}}return true
},stringToBoolean:function(a){if(!a){return false
}return a.toLowerCase()=="true"
},strEndsWith:function(b,a){return(b.indexOf(a,b.length-a.length)!==-1)
},getComponentLogicFromDom:function(a){return this.getComponentLogicFromDomByAttribute("id",a)
},getComponentLogicFromDomByAttribute:function(c,d){var b=W.Preview?W.Preview.getPreviewSite():window;
var a=b.$$("["+c+'="'+d+'"]')[0];
if(a){return a.getLogic()
}else{return null
}}});
UtilsClass.extendPrototype({instanceIndex:0,_$getUniqeId:function(c){var b=this.instanceIndex;
var a=Utils.getUniqueId(c);
this.instanceIndex=b;
return a
}});
UtilsClass.extendPrototype({isObjectEmpty:function(a){return Object.some(a,function(){return true
})
},isValidColor:function(a){return instanceOf(a,String)&&((a.indexOf("#")===0&&(a.length===4||a.length===7)&&!isNaN(a.replace("#","0x")))||Constants.CSS.COLORS.contains(a.toLowerCase()))
},isNumber:function(a){return !isNaN(parseFloat(a))&&isFinite(a)
},isURLPartValid:function(a){return(/[^a-z_0-9]/.test(a)===false)&&a.length>=4
},convertToValidUrlPart:function(a){return a.replace(/[ ]/g,"-").replace(/[^A-Za-z0-9-]/g,"").toLowerCase()
},isValidUrl:function(a){if(a.indexOf(".")===0){a=this._rel_to_abs(a)
}return this._RegEx.validUrlReg.test(a)
},_rel_to_abs:function(a){if(/^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(a)){return a
}var c=location.href.match(/^(.+)\/?(?:#.+)?$/)[0]+"/";
if(a.substring(0,2)=="//"){return location.protocol+a
}else{if(a.charAt(0)=="/"){return location.protocol+"//"+location.host+a
}else{if(a.substring(0,2)=="./"){a="."+a
}else{if(/^\s*$/.test(a)){return""
}else{a="../"+a
}}}}a=c+a;
var b=0;
while(/\/\.\.\//.test(a=a.replace(/[^\/]+\/+\.\.\//g,""))){}a=a.replace(/\.$/,"").replace(/\/\./g,"").replace(/"/g,"%22").replace(/'/g,"%27").replace(/</g,"%3C").replace(/>/g,"%3E");
return a
},isValidUrlNoProtocol:function(a){return this._RegEx.validUrlNoProtocolReg.test(a)
},isValidEmail:function(a){return this._RegEx.validEailReg.test(a)
},isValidTwitterUser:function(a){return this._RegEx.ValidTwitterUserReg.test(a)
},validatePageTitle:function(b){var a=b;
a=a.replace(/[^A-Za-z0-9_ ]/g,"");
if(a.indexOf(" ")===0){while(a.indexOf(" ")===0){a=a.substr(1)
}}if(a.indexOf("  ")>-1){while(a.indexOf("  ")>-1){a=a.replace("  "," ")
}}a=a.substr(0,Constants.Page.NAME_MAX_LENGTH);
if(a===""){a="untitled"
}return a
},isInputKey:function(a){if(!a){return false
}if(a<48){return(a==13||a==32||a==8||a==46)
}if(a>=112&&a<=145){return false
}if(a>90&&a<=93){return false
}return true
},isEquivalent:function(g,f){if(typeof g!==typeof f){return false
}if(g instanceof Array&&!(f instanceof Array)){return false
}if((typeof g&&typeof f)==="function"){return true
}if(typeof g==="string"||typeof g==="number"||typeof g==="boolean"){return(g===f)
}var b=0;
var a=(g instanceof Array);
if(!a){for(var c in g){if(g.hasOwnProperty(c)&&!f.hasOwnProperty(c)){return false
}else{++b
}}for(c in f){if(f.hasOwnProperty(c)){b--
}}if(b!==0){return false
}for(c in g){if(g.hasOwnProperty(c)&&!this.isEquivalent(g[c],f[c])){return false
}}}else{var d=function(j,i){return W.Utils.isEquivalent(j,f[i])
};
return(g.length==f.length&&g.every(d,f))
}return true
},_RegEx:{validUrlReg:new RegExp("^(ftps|ftp|http|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&*;:/~\\+#!|]*[\\w\\-\\@?^=%&*;/~\\+#!|])?$"),validUrlNoProtocolReg:new RegExp("^[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&*;:/~\\+#!|]*[\\w\\-\\@?^=%&*;/~\\+#!|])?$"),validEailReg:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,ValidTwitterUserReg:/^@?[a-zA-Z0-9_%]+$/}});
UtilsClass.extendPrototype({hashing:{SHA256:(function(){var s=0;
var B="";
function k(){return hex_sha256("abc").toLowerCase()=="ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
}function z(E){return r(m(v(E),E.length*8))
}function y(G,J){var I=v(G);
if(I.length>16){I=m(I,G.length*8)
}var E=[],H=[];
for(var F=0;
F<16;
F++){E[F]=I[F]^909522486;
H[F]=I[F]^1549556828
}var K=m(E.concat(v(J)),512+J.length*8);
return r(m(H.concat(K),512+256))
}function D(G){try{s
}catch(J){s=0
}var I=s?"0123456789ABCDEF":"0123456789abcdef";
var F="";
var E;
for(var H=0;
H<G.length;
H++){E=G.charCodeAt(H);
F+=I.charAt((E>>>4)&15)+I.charAt(E&15)
}return F
}function a(G){try{B
}catch(K){B=""
}var J="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var F="";
var E=G.length;
for(var I=0;
I<E;
I+=3){var L=(G.charCodeAt(I)<<16)|(I+1<E?G.charCodeAt(I+1)<<8:0)|(I+2<E?G.charCodeAt(I+2):0);
for(var H=0;
H<4;
H++){if(I*8+H*6>G.length*8){F+=B
}else{F+=J.charAt((L>>>6*(3-H))&63)
}}}return F
}function d(O,H){var G=H.length;
var N=[];
var M,E,P,J;
var L=[];
var F=Math.ceil(O.length/2);
for(M=0;
M<F;
M++){L[M]=(O.charCodeAt(M*2)<<8)|O.charCodeAt(M*2+1)
}while(L.length>0){J=[];
P=0;
for(M=0;
M<L.length;
M++){P=(P<<16)+L[M];
E=Math.floor(P/G);
P-=E*G;
if(J.length>0||E>0){J[J.length]=E
}}N[N.length]=P;
L=J
}var I="";
for(M=N.length-1;
M>=0;
M--){I+=H.charAt(N[M])
}var K=Math.ceil(O.length*8/(Math.log(H.length)/Math.log(2)));
for(M=I.length;
M<K;
M++){I=H[0]+I
}return I
}function t(G){var F="";
var H=-1;
var E,I;
while(++H<G.length){E=G.charCodeAt(H);
I=H+1<G.length?G.charCodeAt(H+1):0;
if(55296<=E&&E<=56319&&56320<=I&&I<=57343){E=65536+((E&1023)<<10)+(I&1023);
H++
}if(E<=127){F+=String.fromCharCode(E)
}else{if(E<=2047){F+=String.fromCharCode(192|((E>>>6)&31),128|(E&63))
}else{if(E<=65535){F+=String.fromCharCode(224|((E>>>12)&15),128|((E>>>6)&63),128|(E&63))
}else{if(E<=2097151){F+=String.fromCharCode(240|((E>>>18)&7),128|((E>>>12)&63),128|((E>>>6)&63),128|(E&63))
}}}}}return F
}function A(F){var E="";
for(var G=0;
G<F.length;
G++){E+=String.fromCharCode(F.charCodeAt(G)&255,(F.charCodeAt(G)>>>8)&255)
}return E
}function n(F){var E="";
for(var G=0;
G<F.length;
G++){E+=String.fromCharCode((F.charCodeAt(G)>>>8)&255,F.charCodeAt(G)&255)
}return E
}function v(F){var E=[];
var I=F.length>>2;
for(var G=0;
G<I;
G++){E[G]=0
}for(var H=0;
H<F.length*8;
H+=8){E[H>>5]|=(F.charCodeAt(H/8)&255)<<(24-H%32)
}return E
}function r(F){var E="";
for(var G=0;
G<F.length*32;
G+=8){E+=String.fromCharCode((F[G>>5]>>>(24-G%32))&255)
}return E
}function g(F,E){return(F>>>E)|(F<<(32-E))
}function i(F,E){return(F>>>E)
}function x(E,G,F){return((E&G)^((~E)&F))
}function l(E,G,F){return((E&G)^(E&F)^(G&F))
}function c(E){return(g(E,2)^g(E,13)^g(E,22))
}function f(E){return(g(E,6)^g(E,11)^g(E,25))
}function C(E){return(g(E,7)^g(E,18)^i(E,3))
}function b(E){return(g(E,17)^g(E,19)^i(E,10))
}function q(E){return(g(E,28)^g(E,34)^g(E,39))
}function u(E){return(g(E,14)^g(E,18)^g(E,41))
}function j(E){return(g(E,1)^g(E,8)^i(E,7))
}function p(E){return(g(E,19)^g(E,61)^i(E,6))
}var o=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998];
function m(F,G){var H=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225];
var E=[];
var T,S,R,Q,O,M,L,K;
var J,I,P,N;
F[G>>5]|=128<<(24-G%32);
F[((G+64>>9)<<4)+15]=G;
for(J=0;
J<F.length;
J+=16){T=H[0];
S=H[1];
R=H[2];
Q=H[3];
O=H[4];
M=H[5];
L=H[6];
K=H[7];
for(I=0;
I<64;
I++){if(I<16){E[I]=F[I+J]
}else{E[I]=w(w(w(b(E[I-2]),E[I-7]),C(E[I-15])),E[I-16])
}P=w(w(w(w(K,f(O)),x(O,M,L)),o[I]),E[I]);
N=w(c(T),l(T,S,R));
K=L;
L=M;
M=O;
O=w(Q,P);
Q=R;
R=S;
S=T;
T=w(P,N)
}H[0]=w(T,H[0]);
H[1]=w(S,H[1]);
H[2]=w(R,H[2]);
H[3]=w(Q,H[3]);
H[4]=w(O,H[4]);
H[5]=w(M,H[5]);
H[6]=w(L,H[6]);
H[7]=w(K,H[7])
}return H
}function w(E,H){var G=(E&65535)+(H&65535);
var F=(E>>16)+(H>>16)+(G>>16);
return(F<<16)|(G&65535)
}return{hex_sha256:function(E){return D(z(t(E)))
},b64_sha256:function(E){return a(z(t(E)))
},any_sha256:function(E,F){return d(z(t(E)),F)
},hex_hmac_sha256:function(E,F){return D(y(t(E),t(F)))
},b64_hmac_sha256:function(E,F){return a(y(t(E),t(F)))
},any_hmac_sha256:function(E,G,F){return d(y(t(E),t(G)),F)
}}
})()}});
UtilsClass.extendPrototype({cookies:{createCookie:function(f,d,c){var a="";
if(c){var b=new Date();
b.setTime(b.getTime()+(c));
a="; expires="+b.toGMTString()
}document.cookie=f+"="+d+a+"; path=/"
},deleteCookie:function(a){document.cookie=a+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/"
},hasCookie:function(a){return this.readCookie(a)!==null
},readCookie:function(b){var a=document.cookie.match(new RegExp("\\b"+b+"=(.*?)(;|$)"));
if(a){return(a[1])
}else{return null
}}}});
W.Classes.newClass({name:"mobile.core.managers.utils.BufferFunction",Class:{Binds:["_wrapperFunction"],initialize:function(a,b){this._isFirstCallDelayed=false;
this._bufferTime=1000;
this._lastCallArguments;
this._replaceFunctionAndSaveOriginal(a,b);
this._clearBuffer()
},setBufferTime:function(a){this._bufferTime=a
},getBufferTime:function(a){return this._bufferTime
},setIsFirstCallDelayed:function(a){this._isFirstCallDelayed=a
},getIsFirstCallDelayed:function(a){return this._isFirstCallDelayed
},_replaceFunctionAndSaveOriginal:function(a,b){this._scope=a;
this._originalFunction=a[b];
a[b]=this._wrapperFunction
},_wrapperFunction:function(){this._lastCallArguments=arguments;
this._tryCallingFunction()
},_tryCallingFunction:function(){if(this.isReadyToCall()){this.callOriginalFunction();
this._delayCall(this._clearBuffer)
}else{this._delayCall(this._clearBufferAndTryCallingFunction)
}},callOriginalFunction:function(){this._originalFunction.apply(this._scope,this._lastCallArguments)
},isReadyToCall:function(){return(!this._callTimerId&&this._isFirstCallDelayed===false)
},_clearBuffer:function(){this._callTimerId=undefined
},_clearBufferAndTryCallingFunction:function(){this._clearBuffer();
this._tryCallingFunction()
},_delayCall:function(a){this.injects().Utils.clearCallLater(this._callTimerId);
this._callTimerId=this.injects().Utils.callLater(a,[],this,this._bufferTime)
}}});
Object.isEquivalent=function(g,f){if(typeof g!==typeof f){return false
}if(g instanceof Array&&!(f instanceof Array)){return false
}if(typeof g==="string"||typeof g==="number"||typeof g==="boolean"||typeof f==="function"){return(g===f)
}var b=0;
var a=(g instanceof Array);
if(!a){for(var c in g){if(g.hasOwnProperty(c)&&!f.hasOwnProperty(c)){return false
}else{++b
}}for(c in f){if(f.hasOwnProperty(c)){b--
}}if(b!==0){return false
}for(c in g){if(g.hasOwnProperty(c)&&!Object.isEquivalent(g[c],f[c])){return false
}}}else{var d=function(j,i){return Object.isEquivalent(j,f[i])
};
return(g.length==f.length&&g.every(d,f))
}return true
};
Array.implement({moveItem:function(a,b){var c=this[a];
if(b<0){b=0
}if(b>this.length-1){b=this.length-1
}this.splice(a,1);
this.splice(b,0,c)
},getIndexByField:function(d,c){for(var b=0,a=this.length;
b<a;
b++){if(this[b][d]==c){return b
}}return -1
},getByField:function(c,b){var a=this.getIndexByField(c,b);
return a>=0?this[a]:undefined
},indexOfByPredicate:function(a){for(var b=0;
b<this.length;
b++){if(a(this[b])){return b
}}return -1
},intersect:function(b,a){return this.filter(function(c){return b.some(function(d){return a?a(c,d):c===d
})
})
},isIntersecting:function(b,a){return this.some(function(c){return b.some(function(d){return a?a(c,d):c===d
})
})
},first:function(c){var b;
for(var a=0;
!b&&a<this.length;
a++){if(c(this[a])){b=this[a]
}}return b
},eraseWithPredicate:function(a){var b=this.filter(a);
b.forEach(function(c){this.erase(c)
},this);
return this
}});
if(!Array.isArray){Array.implement({isArray:function(a){return Object.prototype.toString.call(a)==="[object Array]"
}})
}var Async=new WClass({className:"Async",initialize:function(){}});
Async.Bulk=new WClass({className:"Async.Bulk",Implements:[Options,Events],Binds:["run"],options:{completeEvent:"complete",errorEvent:"error",completeCallback:null,errorCallback:null,parallel:true,specialTargets:[{target:null,method:null,completeEvent:null,errorEvent:null}],executeDelay:false,keepAlive:false,stopOnErrors:true,timeout:0},_method:null,_pending:[],_running:false,_error:[],_complete:[],_done:[],initialize:function(c,f,d){if(!c||c.length===undefined){LOG.reportError(wixErrors.BULK_INVALID_TARGET,"Async.Bulk","initialize",c)();
return this
}this.setOptions(d);
this._targets=c;
this._method=f;
var b=this;
var a=window;
if(this.options.timeout>0){this._timeoutInterval=a.setTimeout(this._bulkOperationTimeout.bind(this),this.options.timeout)
}this._onTargetComplete=function(){this.removeEvent(b._getTargetDetails(this).completeEvent,b._onTargetComplete);
b._pending.erase(this);
b._complete.push(this);
b._done.push(this);
b._checkProgress()
};
this._onTargetFailed=function(){this.removeEvent(b._getTargetDetails(this).errorEvent,b._onTargetFailed);
b._pending.erase(this);
b._error.push(this);
b._done.push(this);
b._checkProgress()
};
if(!this.options.executeDelay){this.run()
}else{if(instanceOf(this.options.executeDelay,Number)&&this.options.executeDelay>0){a.setTimeout(this.run,this.options.executeDelay)
}}},_bulkOperationTimeout:function(){LOG.reportError(wixErrors.BULK_TIMEOUT,"Async.Bulk","_bulkOperationTimeout",String(this.options.timeout)+" ms | Pending Operations:"+this._pending)()
},run:function(){if(this._targets.length!==undefined&&this._targets.length!==null&&this._targets.length===0){this._clearInterval();
this._handleBulkComplete();
return
}this._targets.each(function(b,a){this._addToQue(b,a)
},this);
if(this.options.parallel){this._targets.each(this._runMethodOnTarget,this)
}else{this._runNextTarget()
}},_runNextTarget:function(){var a=this._targets.length-this._pending.length;
var b=this._targets[a];
this._runMethodOnTarget.apply(this,[b])
},_clearInterval:function(){if(this._timeoutInterval){clearInterval(this._timeoutInterval);
delete this._timeoutInterval
}},_runMethodOnTarget:function(a){if(instanceOf(this._method,Function)){this._method.call(a)
}if(instanceOf(this._method,String)){if(instanceOf(a[this._method],Function)){a[this._method].call(a)
}else{LOG.reportError(wixErrors.BULK_NO_METHOD,"Async.Bulk","_runMethodOnTarget",a)()
}}},stop:function(a){},destroy:function(){if(this._targets){this._targets.each(function(a){a.removeEvent(this._getTargetDetails(this).completeEvent,this._onTargetComplete);
a.removeEvent(this._getTargetDetails(this).errorEvent,this._onTargetFailed)
},this)
}this._targets=null
},progress:function(){return{complete:this._complete.slice(),error:this._error.slice(),total:this._targets.slice()}
},_addToQue:function(c,a){var b=this._getTargetDetails(c);
this._pending[a]=c;
c.addEvent(b.completeEvent,this._onTargetComplete);
c.addEvent(b.errorEvent,this._onTargetFailed)
},_onTargetComplete:undefined,_onTargetFailed:undefined,_getTargetDetails:function(d){var b;
var a;
var c={method:this._method,completeEvent:this.options.completeEvent,errorEvent:this.options.errorEvent};
for(b=0,a=this.options.specialTargets.length;
b<a;
b++){if(this.options.specialTargets[b].target===d){return this.options.specialTargets[b].target.implement(c)
}}return c
},_checkProgress:function(){if(this._pending.length>0){if(!this.options.parallel){this._runNextTarget()
}}else{if(this.options.stopOnErrors&&this._error.length>0){this._handleBulkError()
}else{this._handleBulkComplete()
}this._clearInterval();
if(!this.options.keepAlive){this.destroy()
}}},_handleBulkError:function(a){if(a){this.fireEvent("error",[this._complete,this._error]);
if(instanceOf(this.options.errorCallback,Function)){this.options.errorCallback(this._complete,this._error)
}}else{window.setTimeout(this._handleBulkError.bind(this,true),1)
}},_handleBulkComplete:function(a){if(a){this.fireEvent("complete",[this._complete,this._error]);
if(instanceOf(this.options.completeCallback,Function)){this.options.completeCallback(this._complete,this._error)
}}else{window.setTimeout(this._handleBulkComplete.bind(this,true),1)
}}});
W.Queue=function(){this.map={}
};
W.Queue.prototype={add:function(a,b){this.map[a]=this.map[a]||[];
this.map[a].push(b)
},addUnique:function(b,d){this.map[b]=this.map[b]||[];
var c=true;
for(var a=0;
a<this.map[b].length;
a++){if(this.map[b][a]===d){c=false;
break
}}if(c){this.map[b].push(d)
}},remove:function(a,b){this.map[a]&&this.map[a].erase(b)
},removeKey:function(a){delete this.map[a]
},removeAll:function(){this.map={}
},getQueue:function(a){return this.map[a]||[]
},getQueueKeys:function(){return Object.keys(this.map)
},hasQueue:function(){return Object.some(this.map,function(){return true
})
},popQueue:function(b){var a=this.getQueue(b);
this.removeKey(b);
return a
}};
Element.implement({cleanup:function(){var a=$(this.parentNode);
if(a){a.removeEvents(Constants.DisplayEvents.ADDED_TO_DOM)
}},insertInto:function(d,f,c){if(!d){LOG.reportError(wixErrors.CM_NULL_PARENT,"Element","insertInto");
return this
}if(!f&&this.getParent()===d){return this
}var b=$(d);
b.grab(this,f);
if("before"==f||"after"==f){d=d.parentNode;
if(null===d){LOG.reportError(wixErrors.CM_NULL_PARENT,"Element","insertInto");
return this
}}var a=Constants.DisplayEvents.ADDED_TO_DOM;
if(this.getLogic&&this.getLogic().getIsDisplayed()){a=Constants.DisplayEvents.MOVED_IN_DOM
}c=c||a;
if(this.isNodeDisplayed()){this.fireEventRecursively(Constants.DisplayEvents.ADDED_TO_DOM,c)
}return this
},fireEventRecursively:function(f,b,a){this.fireEvent(f,b,a);
var d=this.getChildren();
for(var c=0;
c<d.length;
c++){var g=d[c];
if(g.fireEventRecursively){g.fireEventRecursively(f,b,a)
}}},removeFromDOM:function(){var a=this.isNodeDisplayed();
if(this.parentNode){var b=$(this.parentNode);
if(b){b.removeEvent(Constants.DisplayEvents.ADDED_TO_DOM,this._insertedToDOMCB)
}this.dispose()
}if(a){this._onDisplayChangedEvent(Constants.DisplayEvents.REMOVED_FROM_DOM,0)
}},setCollapsed:function(a){if(a){this.collapse()
}else{this.uncollapse()
}},toggleCollapsed:function(){if(this.hasClass(Constants.CoreClasses.HIDDEN)){this.uncollapse()
}else{this.collapse()
}return this
},collapse:function(){if(false===this.hasClass(Constants.CoreClasses.HIDDEN)){this.addClass(Constants.CoreClasses.HIDDEN);
this._onDisplayChangedEvent(Constants.DisplayEvents.COLLAPSED,0)
}return this
},uncollapse:function(a){if(this.hasClass(Constants.CoreClasses.HIDDEN)){this.removeClass(Constants.CoreClasses.HIDDEN);
if(a){this.addClass(a)
}this._onDisplayChangedEvent(Constants.DisplayEvents.DISPLAYED,0)
}return this
},triggerDisplayChanged:function(){this._onDisplayChangedEvent(Constants.DisplayEvents.DISPLAY_CHANGED,0)
},isConnectedToDOM:function(){var b=this;
var a=document.documentElement;
while(b){if(b.documentElement==a){return true
}b=b.parentNode
}return false
},isCollapsed:function(){var a=document.documentElement;
var b=this;
while(b){if(a==b.documentElement){return false
}var c=b.style;
var d=b.getStyle("display");
if("none"==d||b.hasClass("hidden")){return true
}b=b.parentNode
}return false
},isNodeDisplayed:function(){var b=this;
var a=document.documentElement;
while(b){if(typeOf(b)=="document"){return true
}var d=$(b);
if(!d){return false
}var c=d.getStyle("display");
if("none"==c||d.hasClass("hidden")){return false
}b=b.parentNode
}return false
},_onDisplayChangedEvent:function(f){var g,c,d,a;
if(this.getElementsByTagName){g=this.getElementsByTagName("*")||[];
if(Browser.ie){if(Array.slice){g=Array.slice(g)
}else{d=[];
for(c=g.length-1;
c>=0;
--c){d[c]=g[c]
}g=d
}}else{g=Array.prototype.slice.call(g)
}}else{g=this.getElements("*")||[]
}for(c=0,a=g.length;
c<a;
++c){try{d=g[c];
if(d.fireEvent){d.fireEvent(f,f)
}}catch(j){this._reportUnknownError(j)
}}try{this.fireEvent(f,f)
}catch(b){this._reportUnknownError(b)
}},_reportUnknownError:function(d){var c=this&&this.getLogic&&this.getLogic()&&this.getLogic()._editedComponent&&this.getLogic()._editedComponent.$className||"no component name";
var b=d&&d.message||"no message";
var a=wixErrors.UNKNOWN_ERROR;
a.ignore=true;
LOG.reportError(a,"Element.js",c,b)
},_insertedToDOM:function(a){this.fireEvent(Constants.DisplayEvents.ADDED_TO_DOM,a)
},getContentRect:function(a){a=a||$$("body")[0];
var b=this.getCoordinates(a);
this.getElements("div").forEach(function(c){if(c.isVisible()===true&&c.isDisplayed()===true){var d=c.getCoordinates(a);
if(d.left<b.left){b.left=d.left
}if(d.right>b.right){b.right=d.right
}if(d.top<b.top){b.top=d.top
}if(d.bottom>b.bottom){b.bottom=d.bottom
}}});
b.width=b.right-b.left;
b.height=b.bottom-b.top;
return b
},_insertedToDOMCB:null});
Element.NativeEvents.cut=2;
Element.NativeEvents.paste=2;
Element.Events.paste={base:"paste",condition:function(a){this.fireEvent(Constants.CoreEvents.PASTE,a,1);
return false
}};
Constants.CoreEvents={CLICK:"click",KEY_DOWN:"keydown",KEY_UP:"keyup",KEY_PRESS:"keypress",COPY:"copy",CUT:"cut",BLUR:"blur",FOCUS:"focus",PASTE:"paste",MOUSE_OVER:"mouseover",MOUSE_OUT:"mouseout",MOUSE_DOWN:"mousedown",MOUSE_UP:"mouseup",MOUSE_MOVE:"mousemove",MOUSE_WHEEL:"mousewheel",CHANGE:"change",INPUT:"input",RESIZE:"resize",SCROLL:"scroll"};
Constants.DisplayEvents={ADDED_TO_DOM:"insertedToDOM",REMOVED_FROM_DOM:"removedFromDOM",DISPLAYED:"displayed!",COLLAPSED:"collapsed!",DISPLAY_CHANGED:"displayed?",MOVED_IN_DOM:"movedInDOM",SKIN_CHANGE:"skinChange"};
Constants.CoreClasses={HIDDEN:"hidden"};
Element.Events.cut={base:"cut",condition:function(a){this.fireEvent(Constants.CoreEvents.CUT,a,1);
return false
}};
(function(){W.Color=new WClass({className:"Color",initialize:function(f,i,d,c){if(typeOf(d)=="number"&&typeOf(i)=="number"&&typeOf(f)=="number"){this.setRed(f);
this.setGreen(i);
this.setBlue(d);
this.setAlpha(c)
}else{if(typeOf(f)=="string"){if(f.indexOf("#")===0){this.setHex(f)
}else{var g=f.replace(/[rgba\(\)]/g,"");
this.setRgba(g)
}}else{this._isUpdateDisabled=true;
f=f||{};
this.setRed((f.getRed&&typeOf(f.getRed)=="function")?f.getRed():0);
this.setGreen((f.getGreen&&typeOf(f.getGreen)=="function")?f.getGreen():0);
this.setBlue((f.getBlue&&typeOf(f.getBlue)=="function")?f.getBlue():0);
this.setAlpha((f.getAlpha&&typeOf(f.getAlpha)=="function")?f.getAlpha():1);
this._isUpdateDisabled=false;
this._updateHsb()
}}},invert:function(){return this.getInvertColor()
},saturation:function(c){this.setSaturation(c*(this._s/100));
return this
},luminous:function(c){this.setLuminous(c*(this._l/100));
return this
},alpha:function(c){this.setAlpha(c*(this._a/100));
return this
},maxSaturation:function(c){if(this._s>c){this.setSaturation(c)
}return this
},minSaturation:function(c){if(this._s<c){this.setSaturation(c)
}return this
},maxLuminous:function(c){if(this._l>c){this.setLuminous(c)
}return this
},minLuminous:function(c){if(this._l<c){this.setLuminous(c)
}return this
},getHex:function(d){var c="#"+this._formatHexColor(this._r)+this._formatHexColor(this._g)+this._formatHexColor(this._b);
if(d){c+=this._formatHexColor(this._a*255)
}return c
},getRgb:function(){return this._r+","+this._g+","+this._b
},getRgba:function(){return this.getRgb()+","+this.getAlpha()
},getRed:function(){return this._getValue(this._r,0)
},getGreen:function(){return this._getValue(this._g,0)
},getBlue:function(){return this._getValue(this._b,0)
},getAlpha:function(){return this._getValue(this._a,1,2)
},getHue:function(){return this._getValue(this._h,0)
},getSaturation:function(){return this._getValue(this._s,100)
},getLuminous:function(){return this._getValue(this._l,100)
},getInvertColor:function(){return new W.Color([255-this._r,255-this._g,255-this._b].join(","))
},_getValue:function(f,c,d){var g=(!f&&f!==0)?c:f;
if(g!==0&&g!==1&&typeof d==="number"&&typeof g==="number"){g=g.toFixed(d);
g=Number(g)
}return g
},setRed:function(c){this._r=this._validateValue(c,0,255,0);
this._updateHsb()
},setGreen:function(c){this._g=this._validateValue(c,0,255,0);
this._updateHsb()
},setBlue:function(c){this._b=this._validateValue(c,0,255,0);
this._updateHsb()
},setAlpha:function(c){this._a=this._validateValue(c,0,1,1)
},setHue:function(c){this._h=this._validateValue(c,0,360,0);
this._updateRgb()
},setSaturation:function(c){this._s=this._validateValue(c,0,100,100);
this._updateRgb()
},setLuminous:function(c){this._l=this._validateValue(c,0,100,100);
this._updateRgb()
},setHex:function(d){if(d.charAt(0)=="#"){d=d.substr(1)
}this._isUpdateDisabled=true;
this.setRed(parseInt(d.substr(0,2),16));
this.setGreen(parseInt(d.substr(2,2),16));
this.setBlue(parseInt(d.substr(4,2),16));
var c=parseInt(d.substr(6,2),16);
if(!isNaN(c)||!this._a){this.setAlpha((c===0)?0:c/255)
}this._isUpdateDisabled=false;
this._updateHsb()
},setRgba:function(d){this._isUpdateDisabled=true;
var c=this._formatSplitValue(d,["r","g","b","a"]);
this.setRed(c.r);
this.setGreen(c.g);
this.setBlue(c.b);
this.setAlpha(c.a);
this._isUpdateDisabled=false;
this._updateHsb()
},setHsl:function(c){this._isUpdateDisabled=true;
var d=this._formatSplitValue(c,["h","s","l"]);
this.setHue(d.h);
this.setSaturation(d.s);
this.setLuminous(d.l);
this._isUpdateDisabled=false;
this._updateRgb()
},_formatSplitValue:function(g,f){var d={};
if(typeOf(g)=="string"){g=g.split(",")
}if(typeOf(g)=="array"){for(var c=0;
c<f.length;
++c){d[f[c]]=g[c]
}}return d
},_validateValue:function(g,f,c,d){if(g!==0){g=g||d||f
}g=Number(String(g).trim());
if(isNaN(g)||g>c){g=c
}if(g<f){g=f
}return g
},_formatHexColor:function(c){c=c||"00";
if(typeOf(c)=="number"){c=Math.round(c);
c=c.toString(16)
}while(c.length<2){c="0"+c
}return c.toUpperCase()
},_updateHsb:function(){if(this._isUpdateDisabled===true){return
}var c=b(this._r,this._g,this._b);
this._h=c.h||0;
this._s=c.s||0;
this._l=c.l||0
},_updateRgb:function(){if(this._isUpdateDisabled===true){return
}var c=a(this._h,this._s,this._l);
this._r=c.r;
this._g=c.g;
this._b=c.b
},toString:function(){return this.getHex(false)
}});
function a(m,j,g){var k,s,o,l,n,d,c,r;
m%=360;
if(g===0){return({r:0,g:0,b:0})
}j/=100;
g/=100;
m/=60;
l=Math.floor(m);
n=m-l;
d=g*(1-j);
c=g*(1-(j*n));
r=g*(1-(j*(1-n)));
if(l===0){k=g;
s=r;
o=d
}else{if(l==1){k=c;
s=g;
o=d
}else{if(l==2){k=d;
s=g;
o=r
}else{if(l==3){k=d;
s=c;
o=g
}else{if(l==4){k=r;
s=d;
o=g
}else{if(l==5){k=g;
s=d;
o=c
}}}}}}k=Math.floor(k*255);
s=Math.floor(s*255);
o=Math.floor(o*255);
return({r:k,g:s,b:o})
}function b(g,o,m){var n,d,l,j,k,c;
g/=255;
o/=255;
m/=255;
n=Math.min(Math.min(g,o),m);
d=Math.max(Math.max(g,o),m);
if(n==d){return({h:undefined,s:0,l:d*100})
}l=(g==n)?o-m:((o==n)?m-g:g-o);
j=(g==n)?3:((o==n)?5:1);
k=Math.floor((j-l/(d-n))*60)%360;
c=Math.floor(((d-n)/d)*100);
d=Math.floor(d*100);
return({h:k,s:c,l:d})
}})();
(function(){Constants.BorderRadius={VALID_UNITS:["px","%","em"]};
W.BorderRadius=new WClass({className:"BorderRadius",initialize:function(a){if(a.getThemeString){a=a.getThemeString()
}else{if(Array.isArray(a)){a=a.join(" ")
}else{a=a.toString()
}}var b=a.split(" ").filter(function(c){return !!c
});
this.set.apply(this,b)
},square:function(c,b,a,f){this._isLocked=false;
for(var d=0;
d<arguments.length;
++d){switch(arguments[d].toLowerCase()){case"tr":this._topRightRadius=0;
break;
case"tl":this._topLeftRadius=0;
break;
case"br":this._bottomRightRadius=0;
break;
case"bl":this._bottomLeftRadius=0;
break
}}return this
},set:function(d,c,b,a){this._isLocked=false;
if(typeof d=="undefined"){d=0
}if(typeof c=="undefined"){c=d;
this._isLocked=true
}if(typeof b=="undefined"){b=d
}if(typeof a=="undefined"){a=c
}this.setTopLeft(d,this._isLocked);
this.setTopRight(c,this._isLocked);
this.setBottomRight(b,this._isLocked);
this.setBottomLeft(a,this._isLocked)
},setTopLeft:function(b,c){this._isLocked=!!c;
var a=this._seperateSizeFromUnit(b,this._topLeftUnits);
this._topLeftRadius=a.size;
this._topLeftUnits=a.unit
},setTopRight:function(b,c){this._isLocked=!!c;
var a=this._seperateSizeFromUnit(b,this._topRightUnits);
this._topRightRadius=a.size;
this._topRightUnits=a.unit
},setBottomRight:function(b,c){this._isLocked=!!c;
var a=this._seperateSizeFromUnit(b,this._bottomRightUnits);
this._bottomRightRadius=a.size;
this._bottomRightUnits=a.unit
},setBottomLeft:function(b,c){this._isLocked=!!c;
var a=this._seperateSizeFromUnit(b,this._bottomLeftUnits);
this._bottomLeftRadius=a.size;
this._bottomLeftUnits=a.unit
},_seperateSizeFromUnit:function(d,b){d=String(d);
var a=parseFloat(d);
var c=d.split(String(a)).join("");
a=(!isNaN(a))?a:0;
c=(Constants.BorderRadius.VALID_UNITS.contains(c))?c:b||Constants.BorderRadius.VALID_UNITS[0];
return{unit:c,size:a}
},getCssValue:function(){if(this._isLocked){return this.getTopLeft()
}return[this.getTopLeft(),this.getTopRight(),this.getBottomRight(),this.getBottomLeft()].join(" ")
},getCssRule:function(a){return"border-radius:"+this.getCssValue()
},getThemeString:function(){return this.getCssValue()
},getTopLeft:function(){return this._topLeftRadius+this._topLeftUnits
},getTopRight:function(){return this._topRightRadius+this._topRightUnits
},getBottomRight:function(){return this._bottomRightRadius+this._bottomRightUnits
},getBottomLeft:function(){return this._bottomLeftRadius+this._bottomLeftUnits
},getIsLocked:function(){return this._isLocked
},getUnits:function(){return[this._topLeftUnits,this._topRightUnits,this._bottomRightUnits,this._bottomLeftUnits]
},toString:function(){return this.getCssValue()
}})
})();
(function(){Constants.BoxShadow={VALID_UNITS:["px"]};
W.BoxShadow=new WClass({className:"BoxShadow",initialize:function(b,d){this._shadow=[];
var c="";
var a=false;
if(b&&b!=="none"){c=b
}if(d!==false&&c){a=true
}if(c.getThemeString){c=c.getThemeString()
}this._parseShadowString(c||"0 0 0 0 #000000");
this.setToggleOn(a)
},setToggleOn:function(a){this._toggleOn=a
},setColor:function(a,b){b=b||0;
this._shadow[b].color=new W.Color(a)
},setBlurRadius:function(a,b){b=b||0;
this._shadow[b].blur=this._getSizeFromUnit(a)
},setSpreadRadius:function(a,b){b=b||0;
this._shadow[b].spread=this._getSizeFromUnit(a)
},setOffset:function(a,c,b){c=(typeof c!="undefined")?c:a;
this.setOffsetX(a,b);
this.setOffsetY(c,b)
},setOffsetX:function(a,b){b=b||0;
this._shadow[b].x=this._getSizeFromUnit(a);
this._shadow[b].angle=this._calcAngle(b);
this._shadow[b].distance=this._calcDistance(b)
},setOffsetY:function(b,a){a=a||0;
this._shadow[a].y=this._getSizeFromUnit(b);
this._shadow[a].angle=this._calcAngle(a);
this._shadow[a].distance=this._calcDistance(a)
},setInset:function(a,b){this._shadow[b||0].inset=(a)?"inset":""
},setDistance:function(b,a){a=a||0;
this._shadow[a].distance=this._getSizeFromUnit(b);
this._shadow[a].x=this._shadow[a].distance*Math.sin(this._shadow[a].angle);
this._shadow[a].y=this._shadow[a].distance*Math.cos(this._shadow[a].angle)
},setAngle:function(d,c,b){var a=(c)?Math.PI/180:1;
b=b||0;
this._shadow[b].angle=(d*a)||0;
this._shadow[b].x=this._shadow[b].distance*Math.sin(this._shadow[b].angle);
this._shadow[b].y=this._shadow[b].distance*Math.cos(this._shadow[b].angle)
},setUnit:function(b,a){a=a||0;
this._shadow[a].unit=(Constants.BoxShadow.VALID_UNITS.contains(b))?b:Constants.BoxShadow.VALID_UNITS[0]
},getDistance:function(a){a=a||0;
return(this._shadow[a].distance)
},getAngle:function(c,b){b=b||0;
var a=(c)?180/Math.PI:1;
var d=this._modulo(this._shadow[b].angle,2*Math.PI)*a;
if(c){return Math.round(d)
}return(d)
},getColor:function(b){b=b||0;
var a=this._shadow[b].color;
if(Modernizr&&Modernizr.rgba){return"rgba("+a.getRgba()+")"
}return a.getHex()
},getBlurRadius:function(a){a=a||0;
return this._shadow[a].blur
},getSpreadRadius:function(a){a=a||0;
return this._shadow[a].spread
},getOffsetX:function(a,b){a=a||0;
return(this._shadow[a].x).toFixed(3)
},getOffsetY:function(a,b){a=a||0;
return(this._shadow[a].y).toFixed(3)
},getInset:function(a){a=a||0;
return this._shadow[a].inset
},getToggleOn:function(){return this._toggleOn
},getThemeString:function(){var a=true;
return this._getCssValueFromShadowObject(a)
},getUnit:function(a){a=a||0;
return this._shadow[a].unit
},getCssValue:function(){if(this._toggleOn){return this._getCssValueFromShadowObject()
}else{return""
}},_calcAngle:function(b){b=b||0;
var d={x:this._shadow[b].x,y:this._shadow[b].y};
var a={x:0,y:0};
var c={x:a.x,y:a.y-Math.sqrt((d.x-a.x)*(d.x-a.x)+(d.y-a.y)*(d.y-a.y))};
return 2*Math.atan2(d.x-c.x,d.y-c.y)
},_calcDistance:function(b){b=b||0;
var a=this._shadow[b].x||0;
var c=this._shadow[b].y||0;
return Math.sqrt(a*a+c*c)
},_getSizeFromUnit:function(b){b=String(b);
var a=parseFloat(b);
a=(!isNaN(a))?a:0;
return a
},_parseShadowString:function(c){var f;
var b=[];
var a=0;
var d;
if(typeof c!=="string"){return
}f=c.trim().replace(/\s*([\(\)\}\s,])\s*/g,"$1").replace(/([\)\}]|#\w{3,6}),/g,"$1, ").replace(/[,;]$/,"");
if(!f){return""
}b=f.split(", ");
for(a=0;
a<b.length;
a++){d=b[a].split(" ");
if(d[0]!="inset"){d.unshift("")
}this._shadow[a]=[];
this.setUnit("px",a);
this.setInset(d[0],a);
this.setOffset(d[1],d[2],a);
this.setBlurRadius(d[3],a);
this.setSpreadRadius((d.length>5)?d[4]:0,a);
this.setColor(d.getLast(),a)
}},_getCssValueFromShadowObject:function(b){var c=[];
var a;
for(a=0;
a<this._shadow.length;
a++){if(b){c.push([this.getInset(a),this.getOffsetX(a),this.getOffsetY(a),this.getBlurRadius(a),this.getSpreadRadius(a),this.getColor(a)].join(" ").trim())
}else{c.push([this.getInset(a),Math.round(this.getOffsetX(a))+this._shadow[a].unit,Math.round(this.getOffsetY(a))+this._shadow[a].unit,Math.round(this.getBlurRadius(a))+this._shadow[a].unit,Math.round(this.getSpreadRadius(a))+this._shadow[a].unit,this.getColor(a)].join(" ").trim())
}}return c.join(",")
},_modulo:function(a,b){return(((a%b)+b)%b)
},toString:function(){return this.getCssValue()
}})
}());
(function(){W.Size=new WClass({className:"Size",Static:{UNITS:["px","%","em"],DEFAULT_AMOUNT_FOR_UNIT:{px:12,"%":100,em:1}},initialize:function(b){if(typeOf(b)=="string"){this._parseSizeString(b)
}else{var a=b||{};
this.setUnit((a.getUnit&&typeOf(a.getUnit)=="function")?a.getUnit():undefined);
this.setAmount((a.getAmount&&typeOf(a.getAmount)=="function")?a.getAmount():undefined)
}},multiply:function(a){this._amount*=a;
return this
},decrease:function(a){this._amount-=a;
return this
},increase:function(a){this._amount+=a;
return this
},getThemeString:function(){return this.getCssValue()
},getCssRule:function(){return this.getCssValue()
},getCssValue:function(){return this._amount+this._unit
},getAmount:function(){return this._amount
},getUnit:function(){return this._unit
},add:function(b){var a=new this.$class(b);
if(this._unit===a.getUnit()){this._amount+=a.getAmount()
}},_parseSizeString:function(b){var a=this._seperateAmountFromUnit(b);
this.setAmount(a.amount);
this.setUnit(a.unit)
},setAmount:function(a){if(a||a===0){this._amount=a
}else{this._amount=this._getDefaultAmountForUnit(this._unit)
}},setUnit:function(a){this._unit=a||this._getDefaultUnit()
},_seperateAmountFromUnit:function(c){c=String(c);
var a=parseFloat(c);
var b=c.split(String(a)).join("");
b=(this.UNITS.contains(b))?b:this._getDefaultUnit();
a=(!isNaN(a))?a:this._getDefaultAmountForUnit(b);
return{unit:b,amount:a}
},_getDefaultAmountForUnit:function(a){return this.DEFAULT_AMOUNT_FOR_UNIT[a]||1
},_getDefaultUnit:function(){return(this._unit)?this._unit:this.UNITS[0]
},toString:function(){return this.getCssValue()
}})
})();
W.Classes.newClass({name:"mobile.core.utils.Commands",Class:{Extends:"mobile.core.managers.BaseManager",initialize:function(){this._commandMap={};
this._pendingMap={};
return this
},isReady:function(){return true
},clone:function(){return this.parent()
},toString:function(){return"[Commands Manager]"
},getCommand:function(b){var a=null;
if(b){if(b instanceof this.Command){a=b
}else{a=this._commandMap[b]||null
}}return a
},registerCommand:function(b,f){var d=this._commandMap[b];
if(d){if(!f){LOG.reportError(wixErrors.COMMAND_DUPLICATE,"Commands","registerCommand",b)
}return d
}d=this.createCommand(b);
this._commandMap[b]=d;
var a=this._pendingMap[b];
if(a){for(var c=0;
c<a.length;
++c){var g=a[c];
d.registerListener(g.listener,g.executeCB,g.changedCB)
}delete this._pendingMap[b]
}return d
},registerCommandAndListener:function(b,f,a,g,d){var c=this.registerCommand(b,d);
c.registerListener(f,a,g);
return c
},executeCommand:function(c,d,b){var a=typeof(c);
if("string"==a){c=this.getCommand(c)
}if(c){c.execute(d,b)
}},registerCommandListenerByName:function(c,f,b,g){var d=this.getCommand(c);
if(d){d.registerListener(f,b,g)
}else{var a=this._pendingMap[c]||[];
a.push({listener:f,executeCB:b,changedCB:g});
this._pendingMap[c]=a
}},createCommand:function(a){return new this.Command(a)
},unregisterCommand:function(a){var b=this._commandMap[a];
if(b){b.dispose();
delete this._commandMap[a]
}},unregisterListener:function(c){for(var a in this._commandMap){var b=this._commandMap[a];
b.unregisterListener(c)
}},Command:W.Classes.newClass({name:"mobile.core.utils.commands.Command",Class:{initialize:function(a){this._listeners=[];
this._zombies=[];
this._isEnabled=true;
this._name=a;
this._numTimesExecuted=0;
this._broadcasting=false
},getNumTimesExecuted:function(){return this._numTimesExecuted
},registerListener:function(d,a,b){var c=this._findListenerIndex(d,a);
if(c<0){this._listeners.push({listener:d,onExecute:a,onEnabledChanged:b});
if(b){b.call(d,this)
}}},unregisterListener:function(b){if(this._broadcasting){this._zombies.push(b)
}else{var a;
while((a=this._findListenerIndex(b))>=0){this._listeners.splice(a,1)
}}},dispose:function(){this._listeners=[]
},getName:function(){return this._name
},execute:function(c,b){if(!this._isEnabled){return
}var a={command:this,source:b};
this._numTimesExecuted++;
this._broadcast("onExecute",[c,a])
},setState:function(a){this._setEnabled(!!a)
},enable:function(){this._setEnabled(true)
},disable:function(){this._setEnabled(false)
},isEnabled:function(){return this._isEnabled
},_broadcast:function(f,c){var b=this._listeners.length;
this._broadcasting=true;
for(var d=0;
d<b;
++d){try{var i=this._listeners[d];
var a=i[f];
if(a){a.apply(i.listener,c)
}}catch(g){W.Utils.debugTrace("Exception whlile processing command",this._name,g,g.stack||"")
}}this._broadcasting=false;
this._cleanupZombies()
},_setEnabled:function(a){a=!!a;
if(a!=this._isEnabled){this._isEnabled=a;
this._broadcastEnabledChanged()
}},_broadcastEnabledChanged:function(){this._broadcast("onEnabledChanged",[this])
},_cleanupZombies:function(){var c;
if(0>=this._zombies.length){return
}for(var b=this._zombies.length-1;
b>=0;
--b){var a=this._zombies[b];
while((c=this._findListenerIndex(a))>=0){this._listeners.splice(c,1)
}}this._zombies=[]
},_findListenerIndex:function(d,a){var b=this._listeners;
for(var c=b.length-1;
c>=0;
--c){if(b[c].listener===d&&(a===undefined||b[c].onExecute===a)){return c
}}return -1
}}})}});
W.Classes.newClass({name:"mobile.core.utils.InputBindings",Class:{Extends:"mobile.core.managers.BaseManager",Binds:["isStopCallback"],initialize:function(){this._listener=Mousetrap;
try{this._listener.unpause()
}catch(a){throw new Error("Mousetrap not loaded")
}},isReady:function(){return true
},clone:function(){return new this.$class()
},addBinding:function(c,b,d){b=b||{};
if(!c){return
}var i=(d)?"bindGlobal":"bind";
var a=b.keypressType;
var g=b.command;
var f=b.commandParameter;
if(!g&&b.commandName){g=W.Commands.getCommand(b.commandName)
}this._listener[i](c,function(k,j){if(g&&g.isEnabled()){k.combo=j;
g.execute(f,k)
}k.preventDefault();
k.stopPropagation();
return false
},a)
},removeBinding:function(b,a){this._listener.unbind(b,a)
},setKeysEnabled:function(a){if(a){this._listener.unpause()
}else{this._listener.pause()
}},getKeysEnabled:function(){return this._listener.isEnabled()
},isStopCallback:function(b,a,c,d){return this._listener.stopCallback(b,a,c,d)
}}});
W.Classes.newClass({name:"mobile.core.utils.LinkUtils",Class:{Static:{linkType:{SMS:"SMS",CALL:"CALL",SKYPE:"SKYPE",MAP:"MAP",EMAIL:"EMAIL",FACEBOOK:"FACEBOOK",FLICKR:"FLICKR",BLOGGER:"BLOGGER",MYSPACE:"MYSPACE",LINKEDIN:"LINKEDIN",TWITTER:"TWITTER",TUMBLR:"TUMBLR",YOUTUBE:"YOUTUBE",VIMEO:"VIMEO",PAGE:"PAGE",FREE_LINK:"FREE_LINK",TEXT:"TEXT",DELICIOUS:"DELICIOUS",WEBSITE:"WEBSITE",DOCUMENT:"DOCUMENT",LOGIN:"LOGIN"},linkTarget:{SAME_WINDOW:"_self",NEW_WINDOW:"_blank"}},linkifyElement:function(c,d,b,f){this._fixTargetBug(b);
var g=b.get("href");
var i=b.get("target");
var a=b.get("linkType");
if((g&&i)||(a==="LOGIN"||a==="ADMIN_LOGIN")){this._createLink(c,d,a,g,i);
this._setLinkState(c);
if(f===true){this._disableLinkClickPropagation(d)
}if((a==="LOGIN"||a==="ADMIN_LOGIN")){var j=c._highlightedDisplayer.getLogic();
this._handleSpecialCases(j,a,d)
}}else{this._removeLinkstate(c);
d.set("href","");
d.setStyle("cursor","default");
d.set("target","");
d.removeEvents("click")
}},_createLink:function(b,c,a,f,g){var d=(W.Viewer.getEditorMode()=="PREVIEW");
var i=(g==="_self"&&a==="WEBSITE");
if(d&&i){this._bindPageLeaveWarningToLink(b,c)
}else{c.set("href",f);
c.setStyle("cursor","pointer");
c.set("target",g);
c.removeEvents("click")
}},_setLinkState:function(a){if(a.hasState("noLink","linkableComponent")){a.removeState("noLink","linkableComponent")
}},_removeLinkstate:function(a){if(a.hasState("noLink","linkableComponent")){a.setState("noLink","linkableComponent")
}},_fixTargetBug:function(a){var b=a.get("target");
if(b=="same"||b=="self"){b="_self";
a.set("target","_self")
}},_disableLinkClickPropagation:function(a){a.addEvent("click",function(b){b.stopPropagation()
})
},_bindPageLeaveWarningToLink:function(a,b){b.erase("href");
b.erase("target");
b.addEvent("click",function(c){c.preventDefault();
this._showNavigationDisabledTooltip(a)
}.bind(this))
},_showNavigationDisabledTooltip:function(a){var b={component:a};
this.injects().Commands.executeCommand("linkableComponent.navigateSameWindow",b,a)
},_handleSpecialCases:function(b,a,c){c.removeEvents("click");
switch(a){case this.linkType.LOGIN:c.addEvent("click",function(){if(window.animateForm){var j=this.getDataItem();
var f=j.get("text");
if(f){f=JSON.parse(f);
var l=f.postLoginUrl;
var i=f.postSignupUrl;
var g=f.type;
var k="HTML";
var d=window.userApi?window.userApi.isSessionValid():false;
if(!d){window.animateForm["callOnContent"]([i,l,g,k])
}else{if(l){window.location.href=l
}}}}}.bind(b));
break;
case this.linkType.ADMIN_LOGIN:c.setStyle("cursor","pointer");
c.addEvent("click",function(){this.injects().Commands.executeCommand("WViewerCommands.AdminLogin.Open")
}.bind(b));
break
}}}});
W.Classes.newClass({name:"mobile.core.managers.events.ObjectsByIds",Class:{_objectIdsMap:{},_OBJECT_ID_PROPERTY:"$id",initialize:function(){},getObjectId:function(a,b){var c=a[this._OBJECT_ID_PROPERTY];
if(!c){c=this.injects().Utils.getGUID();
a[this._OBJECT_ID_PROPERTY]=c
}if(!this.getObjectById(c)&&b){this._objectIdsMap[c]=a
}return c
},registerObjectId:function(a,b){a[this._OBJECT_ID_PROPERTY]=b;
this._objectIdsMap[b]=a;
return a
},getObjectById:function(a){return this._objectIdsMap[a]
},removeObjectById:function(a){if(this._objectIdsMap[a]){delete this._objectIdsMap[a]
}}}});
W.Classes.newClass({name:"mobile.core.managers.events.DispatcherToHandlersMap",Class:{_map:{},addHandler:function(a,b,c,i,g){var d=this._getWithInitHandlerObjectsForEventType(a,b);
var f=new this.HandlerObject(c,i,g);
d.push(f);
return f
},isHandlerRegistered:function(a,b,c,f){var d=this._getWithInitHandlerObjectsForEventType(a,b);
return d.some(function(g){return g.listenerId==c&&g.handler==f
})
},HandlerObject:function(a,c,b){this.listenerId=a;
this.handler=c;
if(b){this.nativeHandler=b
}},removeHandler:function(b,c,f,i){var a=this._map[b];
if(!a||!a[c]){return null
}var d=a[c];
var g=null;
d.eraseWithPredicate(function(j){if(j.listenerId===f&&j.handler===i){g=j;
return true
}return false
});
if(d.length===0){delete a[c]
}if(Object.keys(a).length===0){delete this._map[b]
}return g
},removeListenerHandlers:function(b,d){var a=this._map[b];
var g={};
for(var c in a){g[c]=[];
var f=a[c];
f.eraseWithPredicate(function(i){if(i.listenerId===d){g[c].push(i);
return true
}return false
});
if(f.length===0){delete a[c]
}}return g
},deleteEntry:function(a){var b=this._map[a];
delete this._map[a];
return b
},getHandlerObjects:function(b,c){var a=this._map[b];
if(!a||!a[c]){return[]
}return a[c]
},getAllHandlerObjectsForDispatcher:function(b){var a=this._map[b];
if(!a){return[]
}var c=Object.values(a);
return c.flatten()
},getAllDispatcherIds:function(){return Object.keys(this._map)
},_getWithInitHandlerObjectsForEventType:function(a,b){if(!this._map[a]){this._map[a]={}
}if(!this._map[a][b]){this._map[a][b]=[]
}return this._map[a][b]
}}});
W.Classes.newClass({name:"mobile.core.managers.events.ListenerToDispatchersMap",Class:{_map:{},addHandler:function(c,a){if(!this._map[c]){this._map[c]={}
}var b=this._map[c];
if(!b[a]){b[a]=1
}else{b[a]++
}},removeHandler:function(c,a){var b=this._map[c];
if(!b||!b[a]){return
}b[a]--;
if(b[a]==0){delete b[a]
}if(Object.keys(b).length==0){delete this._map[c]
}},removeListenerHandlers:function(b,a){if(!this._map[b]){return
}delete this._map[b][a]
},deleteEntry:function(a){if(this._map[a]){delete this._map[a]
}},getAllDispatcherIdsForListener:function(a){if(!this._map[a]){return[]
}return Object.keys(this._map[a])
}}});
W.Classes.newClass({imports:["mobile.core.managers.events.DispatcherToHandlersMap","mobile.core.managers.events.ListenerToDispatchersMap","mobile.core.managers.events.ObjectsByIds"],name:"mobile.core.managers.events.EventsManager",Class:{Extends:"mobile.core.managers.BaseManager",initialize:function(){this._listenersMapping=new this.imports.ListenerToDispatchersMap();
this._dispatchersMapping=new this.imports.DispatcherToHandlersMap();
this._objectsByIds=new this.imports.ObjectsByIds()
},isReady:function(){return true
},addEventHandler:function(a,b,c,g,f){if(!this._isValidObjectId(a)||!this._isValidObjectId(c)){return
}if(this.isHandlerRegistered(a,b,c,g)){return
}var d=this._dispatchersMapping.addHandler(a,b,c,g,f);
this._addNativeEvent(a,b,f);
this._listenersMapping.addHandler(c,a);
return d
},removeEventHandler:function(a,b,c,f){var d=this._dispatchersMapping.removeHandler(a,b,c,f);
this._listenersMapping.removeHandler(c,a);
this._removeNativeEvent(a,b,d.nativeHandler);
this._deleteObjectIfPossible(c);
this._deleteObjectIfPossible(a);
return d
},removeEventsForListener:function(b,c){var a=this._dispatchersMapping.removeListenerHandlers(b,c);
if(a){this._removeNativeEvents({dispatcherId:a})
}this._listenersMapping.removeListenerHandlers(c,b);
this._deleteObjectIfPossible(c);
this._deleteObjectIfPossible(b)
},isHandlerRegistered:function(a,b,c,d){return this._dispatchersMapping.isHandlerRegistered(a,b,c,d)
},dispatchEvent:function(b,c,f,g){var d=this._dispatchersMapping.getHandlerObjects(b,c);
d=this._filterInactiveHandlers(d);
var a={type:c,data:f,returnedValues:g?[]:undefined,target:this.getObjectById(b),isCustomEvent:true};
d.forEach(function(k){var j=this.getObjectById(k.listenerId);
var i=k.handler.call(j,a);
if(g&&i!==undefined){a.returnedValues.push(i)
}},this);
return a
},_filterInactiveHandlers:function(a){return a
},deleteObjectFromMaps:function(a){var b=this._listenersMapping.getAllDispatcherIdsForListener(a);
var c={};
b.forEach(function(f){c[f]=this._dispatchersMapping.removeListenerHandlers(f,a);
this._deleteObjectIfPossible(f)
},this);
var d=this._dispatchersMapping.getAllHandlerObjectsForDispatcher(a);
d.forEach(function(f){this._listenersMapping.removeHandler(f.listenerId,a);
this._deleteObjectIfPossible(f.listenerId)
},this);
c[a]=this._dispatchersMapping.deleteEntry(a);
this._listenersMapping.deleteEntry(a);
if(c){this._removeNativeEvents(c)
}this._deleteObjectIfPossible(a,true)
},isObjectListensOrDispatchesAnyEvents:function(a){var b=this._listenersMapping.getAllDispatcherIdsForListener(a);
if(b&&b.length>0){return true
}var c=this._dispatchersMapping.getAllHandlerObjectsForDispatcher(a);
return c&&c.length>0
},getAllDispatchingObjectIds:function(){return this._dispatchersMapping.getAllDispatcherIds()
},_deleteObjectIfPossible:function(a,c){var b=this.getObjectById(a);
if(!b){return
}var d=c||!b.isRemovingFromObjectsMapOnlyUponDeath||!b.isRemovingFromObjectsMapOnlyUponDeath();
if(d&&!this.isObjectListensOrDispatchesAnyEvents(a)){this._listenersMapping.deleteEntry(a);
this._dispatchersMapping.deleteEntry(a);
this._deleteObjectFromMap(a)
}},_deleteObjectFromMap:function(a){this._objectsByIds.removeObjectById(a)
},getObjectById:function(a){return this._objectsByIds.getObjectById(a,true)
},getObjectId:function(a){return this._objectsByIds.getObjectId(a,false)
},_isValidObjectId:function(a){return true
},_addNativeEvent:function(a,b,d){if(!d){return
}var c=this.getObjectById(a);
if(!c.addNativeListener){return
}c.addNativeListener(b,d)
},_removeNativeEvent:function(a,b,d){if(!d){return
}var c=this.getObjectById(a);
if(!c.removeNativeListener){return
}c.removeNativeListener(b,d)
},_removeNativeEvents:function(d){for(var b in d){for(var c in d[b]){var a=d[b][c];
a.each(function(f){this._removeNativeEvent(b,c,f.nativeHandler)
},this)
}}}}});
(function(){[Element,Window,Document].invoke("implement",{$alive:true,getEventsSysId:function(){return this._getObjectId(this,false)
},_getObjectId:function(f,d){if(f.$alive!==undefined&&!f.$alive){return null
}return W.Events._objectsByIds.getObjectId(f,d)
},on:function(f,i,n){var j=this._getObjectId(i,true);
var k=this._getObjectId(this,true);
var d=Element.Events[f];
var m=(d&&d.base)||f;
if(W.Events.isHandlerRegistered(k,m,j,n)){return this
}var l=function(o){n.call(i,o)
};
if(d){if(d.onAdd){d.onAdd.call(this,n)
}l=a(this,l,d)
}var g=Element.NativeEvents[m];
l=c(this,l,g);
W.Events.addEventHandler(k,m,j,n,l);
return this
},off:function(f,l,j){var i=this._getObjectId(l,true);
var d=this._getObjectId(this,true);
var k=Element.Events[f];
var g=(k&&k.base)||f;
if(!W.Events.isHandlerRegistered(d,g,i,j)){return this
}if(k){if(k.onRemove){k.onRemove.call(this,j)
}}W.Events.removeEventHandler(d,g,i,j);
return this
},trigger:function(g,f){var j=Element.Events[g];
var i=(j&&j.base)||g;
var k=Element.NativeEvents[i];
if(k){this._triggerNativeEvent(i)
}else{var d=this._getObjectId(this,true);
W.Events.dispatchEvent(d,g,f)
}},exterminate:function(){var d=this._getObjectId(this,true);
W.Events.deleteObjectFromMaps(d);
this.destroy();
this.$alive=false
},isHandlingEventsWhenNotDisplayed:function(){return false
},addNativeListener:function(i,g){if(i=="unload"){var d=g,f=this;
g=function(){f.removeNativeListener("unload",g);
d()
}
}if(this.addEventListener){this.addEventListener(i,g,false)
}else{this.attachEvent("on"+i,g)
}return this
},removeNativeListener:function(f,d){if(this.removeEventListener){this.removeEventListener(f,d,false)
}else{this.detachEvent("on"+f,d)
}return this
},_triggerNativeEvent:function(f){var d;
if(document.createEvent){d=document.createEvent("HTMLEvents");
d.initEvent(f,true,true);
return !this.dispatchEvent(d)
}else{d=document.createEventObject();
return this.fireEvent("on"+f,d)
}}});
if(window.attachEvent&&!window.addEventListener){window.addNativeListener("unload",function(){b().each(function(d){d.exterminate()
});
if(window.CollectGarbage){window.CollectGarbage()
}})
}var a=function(g,f,d){var i=f;
if(d.condition){i=function(j){if(d.condition.call(g,j)){return f(j)
}return true
}
}return i
};
var c=function(f,i,d){var g=null;
if(d){if(d==2){g=function(j){j=new Event(j,f.getWindow());
if(i(j)===false){j.stop()
}}
}else{g=i
}}return g
};
var b=function(){var d=W.Events.getAllDispatchingObjectIds().map(function(f){return this._objectsByIds.getObjectById(f)
},this);
return d.filter(function(f){return typeOf(f)=="element"
})
}
})();
W.Classes.newTrait({name:"mobile.core.managers.events.TimersHandler",trait:({_timerTypes:{timeout:1,interval:2},initialize:function(){this._timers={};
this.on("exterminating",this,this._clearAllTimers)
},setTimeout:function(c,b){var f=b||0;
var d=this._getExecutingFunction(c,this._timerTypes.timeout);
var a=window.setTimeout(d,f);
d.timerId=a;
this._timers[a]={type:this._timerTypes.timeout,isActive:true};
return a
},setInterval:function(c,b){var d=this._getExecutingFunction(c,this._timerTypes.interval);
var a=window.setInterval(d,b);
d.timerId=a;
this._timers[a]={type:this._timerTypes.interval,isActive:true};
return a
},isActiveTimer:function(a){return this._timers[a]&&this._timers[a].isActive
},_getExecutingFunction:function(c,b){var a=this;
return function(){var d=arguments.callee&&arguments.callee.timerId;
if(d&&b==a._timerTypes.timeout&&a._timers[d]){a._timers[d].isActive=false
}c.call(a)
}
},_clearAllTimers:function(){Object.each(this._timers,function(b,a){a=Number(a);
if(b.type==this._timerTypes.timeout){window.clearTimeout(a)
}else{if(b.type==this._timerTypes.interval){window.clearInterval(a)
}}},this)
}})});
Constants.EventDispatcher={Events:{EXTERMINATING:"exterminating"}};
W.Classes.newClass({name:"mobile.core.managers.events.EventDispatcher",traits:["mobile.core.managers.events.TimersHandler"],Class:{$alive:true,initialize:function(){},getEventsSysId:function(){return this._getObjectId(this,false)
},_setEventSysId:function(a){this.injects().Events._objectsByIds.registerObjectId(this,a)
},_getObjectId:function(b,a){if(b.$alive!==undefined&&!b.$alive){return null
}return this.injects().Events._objectsByIds.getObjectId(b,a)
},on:function(b,f,d){var c=this._getObjectId(f,true);
var a=this._getObjectId(this,true);
this.injects().Events.addEventHandler(a,b,c,d);
return this
},off:function(b,f,d){var c=this._getObjectId(f);
var a=this._getObjectId(this,true);
this.injects().Events.removeEventHandler(a,b,c,d);
return this
},trigger:function(c,b,d){var a=this._getObjectId(this,true);
return this.injects().Events.dispatchEvent(a,c,b,d)
},exterminate:function(){this.trigger(Constants.EventDispatcher.Events.EXTERMINATING);
var a=this._getObjectId(this,true);
this.injects().Events.deleteObjectFromMaps(a);
this.$alive=false
},isHandlingEventsWhenNotDisplayed:function(){return false
},isRemovingFromObjectsMapOnlyUponDeath:function(){return false
}}});
W.Classes.newClass({name:"mobile.core.managers.events.Command",Class:{Extends:"mobile.core.managers.events.EventDispatcher",Static:{EXECUTE_EVENT_NAME:"execute",STATE_CHANGED_EVENT_NAME:"stateChanged"},initialize:function(a){this._isEnabled=true;
this._name=a;
this._numTimesExecuted=0;
this._setEventSysId(a)
},getNumTimesExecuted:function(){return this._numTimesExecuted
},registerListener:function(c,a,b){if(a){this.on(this.EXECUTE_EVENT_NAME,c,a)
}if(b){this.on(this.STATE_CHANGED_EVENT_NAME,c,b)
}},unregisterListener:function(b){var a=this._getObjectId(b);
this.injects().Events.removeEventsForListener(this.getEventsSysId(),a)
},getName:function(){return this._name
},execute:function(b,a){if(!this._isEnabled){return
}this._numTimesExecuted++;
this.trigger(this.EXECUTE_EVENT_NAME,{passedData:b,source:a})
},enable:function(){this.setState(true)
},disable:function(){this.setState(false)
},setState:function(a){if(this._isEnabled!=a){this._isEnabled=a;
this.trigger(this.STATE_CHANGED_EVENT_NAME,{currentState:this._isEnabled})
}},isEnabled:function(){return this._isEnabled
},isRemovingFromObjectsMapOnlyUponDeath:function(){return true
}}});
W.Classes.newClass({name:"mobile.core.managers.events.CommandsManager",imports:["mobile.core.managers.events.Command"],Class:{Extends:"mobile.core.managers.BaseManager",initialize:function(){},isReady:function(){return true
},getCommand:function(b){var a=null;
if(b){if(b instanceof this.imports.Command){a=b
}else{a=this.injects().Events.getObjectById(b)||null
}}return a
},registerCommand:function(a){var b=this.injects().Events.getObjectById[a];
if(b){return b
}return new this.imports.Command(a)
},registerCommandListener:function(b,d,a,f){var c=this.registerCommand(b);
c.registerListener(d,a,f);
return c
},registerCommandAndListener:function(b,d,a,f){var c=this.registerCommand(b);
c.registerListener(d,a,f);
return c
},executeCommand:function(b,c,a){b=this.getCommand(b);
if(b){b.execute(c,a)
}},registerCommandListenerByName:function(b,c,a,d){this.registerCommandAndListener(b,c,a,d)
},createCommand:function(a){return new this.Command(a)
},unregisterCommand:function(a){var b=this.getCommand(a);
b.exterminate()
},unregisterListener:function(b){var a=this.injects().Events.getObjectId(b);
if(a){this.injects().Events.deleteObjectFromMaps(a)
}},isCommandInstance:function(a){return a instanceof this.imports.Command
}}});