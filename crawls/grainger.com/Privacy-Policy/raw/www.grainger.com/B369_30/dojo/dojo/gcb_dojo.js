/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

(function(){
var _1=null;
if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){
var _2="",_3="",_4="",_5={},_6={};
_1=_1||djConfig.scopeMap;
for(var i=0;i<_1.length;i++){
var _8=_1[i];
_2+="var "+_8[0]+" = {}; "+_8[1]+" = "+_8[0]+";"+_8[1]+"._scopeName = '"+_8[1]+"';";
_3+=(i==0?"":",")+_8[0];
_4+=(i==0?"":",")+_8[1];
_5[_8[0]]=_8[1];
_6[_8[1]]=_8[0];
}
eval(_2+"dojo._scopeArgs = ["+_4+"];");
dojo._scopePrefixArgs=_3;
dojo._scopePrefix="(function("+_3+"){";
dojo._scopeSuffix="})("+_4+")";
dojo._scopeMap=_5;
dojo._scopeMapRev=_6;
}
(function(){
if(typeof this["loadFirebugConsole"]=="function"){
this["loadFirebugConsole"]();
}else{
this.console=this.console||{};
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var i=0,tn;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _c=tn+"";
console[_c]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(_c+":");
console["log"](a.join(" "));
}:function(){
};
})();
}
}
}
if(typeof dojo=="undefined"){
this.dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};
}
var d=dojo;
if(typeof dijit=="undefined"){
this.dijit={_scopeName:"dijit"};
}
if(typeof dojox=="undefined"){
this.dojox={_scopeName:"dojox"};
}
if(!d._scopeArgs){
d._scopeArgs=[dojo,dijit,dojox];
}
d.global=this;
d.config={isDebug:false,debugAtAllCosts:false};
if(typeof djConfig!="undefined"){
for(var _f in djConfig){
d.config[_f]=djConfig[_f];
}
}
dojo.locale=d.config.locale;
var rev="$Rev: 17468 $".match(/\d+/);
dojo.version={major:1,minor:3,patch:0,flag:"",revision:rev?+rev[0]:NaN,toString:function(){
with(d.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
if(typeof OpenAjax!="undefined"){
OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());
}
var _11={};
dojo._mixin=function(obj,_13){
for(var x in _13){
if(_11[x]===undefined||_11[x]!=_13[x]){
obj[x]=_13[x];
}
}
if(d.isIE&&_13){
var p=_13.toString;
if(typeof p=="function"&&p!=obj.toString&&p!=_11.toString&&p!="\nfunction toString() {\n    [native code]\n}\n"){
obj.toString=_13.toString;
}
}
return obj;
};
dojo.mixin=function(obj,_17){
if(!obj){
obj={};
}
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(obj,arguments[i]);
}
return obj;
};
dojo._getProp=function(_1a,_1b,_1c){
var obj=_1c||d.global;
for(var i=0,p;obj&&(p=_1a[i]);i++){
if(i==0&&this._scopeMap[p]){
p=this._scopeMap[p];
}
obj=(p in obj?obj[p]:(_1b?obj[p]={}:undefined));
}
return obj;
};
dojo.setObject=function(_20,_21,_22){
var _23=_20.split("."),p=_23.pop(),obj=d._getProp(_23,true,_22);
return obj&&p?(obj[p]=_21):undefined;
};
dojo.getObject=function(_26,_27,_28){
return d._getProp(_26.split("."),_27,_28);
};
dojo.exists=function(_29,obj){
return !!d.getObject(_29,false,obj);
};
dojo["eval"]=function(_2b){
return d.global.eval?d.global.eval(_2b):eval(_2b);
};
d.deprecated=d.experimental=function(){
};
})();
(function(){
var d=dojo;
d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_2d){
var mp=this._modulePrefixes;
return !!(mp[_2d]&&mp[_2d].value);
},_getModulePrefix:function(_2f){
var mp=this._modulePrefixes;
if(this._moduleHasPrefix(_2f)){
return mp[_2f].value;
}
return _2f;
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(_31,_32,cb){
var uri=((_31.charAt(0)=="/"||_31.match(/^\w+:/))?"":this.baseUrl)+_31;
try{
return !_32?this._loadUri(uri,cb):this._loadUriAndCheck(uri,_32,cb);
}
catch(e){
console.error(e);
return false;
}
};
dojo._loadUri=function(uri,cb){
if(this._loadedUrls[uri]){
return true;
}
var _37=this._getText(uri,true);
if(!_37){
return false;
}
this._loadedUrls[uri]=true;
this._loadedUrls.push(uri);
if(cb){
_37="("+_37+")";
}else{
_37=this._scopePrefix+_37+this._scopeSuffix;
}
if(d.isMoz){
_37+="\r\n//@ sourceURL="+uri;
}
var _38=d["eval"](_37);
if(cb){
cb(_38);
}
return true;
};
dojo._loadUriAndCheck=function(uri,_3a,cb){
var ok=false;
try{
ok=this._loadUri(uri,cb);
}
catch(e){
console.error("failed loading "+uri+" with error: "+e);
}
return !!(ok&&this._loadedModules[_3a]);
};
dojo.loaded=function(){
this._loadNotifying=true;
this._postLoad=true;
var mll=d._loaders;
this._loaders=[];
for(var x=0;x<mll.length;x++){
mll[x]();
}
this._loadNotifying=false;
if(d._postLoad&&d._inFlightCount==0&&mll.length){
d._callLoaded();
}
};
dojo.unloaded=function(){
var mll=d._unloaders;
while(mll.length){
(mll.pop())();
}
};
d._onto=function(arr,obj,fn){
if(!fn){
arr.push(obj);
}else{
if(fn){
var _43=(typeof fn=="string")?obj[fn]:fn;
arr.push(function(){
_43.call(obj);
});
}
}
};
dojo.addOnLoad=function(obj,_45){
d._onto(d._loaders,obj,_45);
if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){
d._callLoaded();
}
};
var dca=d.config.addOnLoad;
if(dca){
d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);
}
dojo._modulesLoaded=function(){
if(d._postLoad){
return;
}
if(d._inFlightCount>0){
console.warn("files still in flight!");
return;
}
d._callLoaded();
};
dojo._callLoaded=function(){
if(typeof setTimeout=="object"||(dojo.config.useXDomain&&d.isOpera)){
if(dojo.isAIR){
setTimeout(function(){
dojo.loaded();
},0);
}else{
setTimeout(dojo._scopeName+".loaded();",0);
}
}else{
d.loaded();
}
};
dojo._getModuleSymbols=function(_47){
var _48=_47.split(".");
for(var i=_48.length;i>0;i--){
var _4a=_48.slice(0,i).join(".");
if((i==1)&&!this._moduleHasPrefix(_4a)){
_48[0]="../"+_48[0];
}else{
var _4b=this._getModulePrefix(_4a);
if(_4b!=_4a){
_48.splice(0,i,_4b);
break;
}
}
}
return _48;
};
dojo._global_omit_module_check=false;
dojo.loadInit=function(_4c){
_4c();
};
dojo._loadModule=dojo.require=function(_4d,_4e){
_4e=this._global_omit_module_check||_4e;
var _4f=this._loadedModules[_4d];
if(_4f){
return _4f;
}
var _50=this._getModuleSymbols(_4d).join("/")+".js";
var _51=(!_4e)?_4d:null;
var ok=this._loadPath(_50,_51);
if(!ok&&!_4e){
throw new Error("Could not load '"+_4d+"'; last tried '"+_50+"'");
}
if(!_4e&&!this._isXDomain){
_4f=this._loadedModules[_4d];
if(!_4f){
throw new Error("symbol '"+_4d+"' is not defined after loading '"+_50+"'");
}
}
return _4f;
};
dojo.provide=function(_53){
_53=_53+"";
return (d._loadedModules[_53]=d.getObject(_53,true));
};
dojo.platformRequire=function(_54){
var _55=_54.common||[];
var _56=_55.concat(_54[d._name]||_54["default"]||[]);
for(var x=0;x<_56.length;x++){
var _58=_56[x];
if(_58.constructor==Array){
d._loadModule.apply(d,_58);
}else{
d._loadModule(_58);
}
}
};
dojo.requireIf=function(_59,_5a){
if(_59===true){
var _5b=[];
for(var i=1;i<arguments.length;i++){
_5b.push(arguments[i]);
}
d.require.apply(d,_5b);
}
};
dojo.requireAfterIf=d.requireIf;
dojo.registerModulePath=function(_5d,_5e){
d._modulePrefixes[_5d]={name:_5d,value:_5e};
};
dojo.requireLocalization=function(_5f,_60,_61,_62){
d.require("dojo.i18n");
d.i18n._requireLocalization.apply(d.hostenv,arguments);
};
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");
var ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
dojo._Url=function(){
var n=null;
var _a=arguments;
var uri=[_a[0]];
for(var i=1;i<_a.length;i++){
if(!_a[i]){
continue;
}
var _69=new d._Url(_a[i]+"");
var _6a=new d._Url(uri[0]+"");
if(_69.path==""&&!_69.scheme&&!_69.authority&&!_69.query){
if(_69.fragment!=n){
_6a.fragment=_69.fragment;
}
_69=_6a;
}else{
if(!_69.scheme){
_69.scheme=_6a.scheme;
if(!_69.authority){
_69.authority=_6a.authority;
if(_69.path.charAt(0)!="/"){
var _6b=_6a.path.substring(0,_6a.path.lastIndexOf("/")+1)+_69.path;
var _6c=_6b.split("/");
for(var j=0;j<_6c.length;j++){
if(_6c[j]=="."){
if(j==_6c.length-1){
_6c[j]="";
}else{
_6c.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_6c[0]=="")&&_6c[j]==".."&&_6c[j-1]!=".."){
if(j==(_6c.length-1)){
_6c.splice(j,1);
_6c[j-1]="";
}else{
_6c.splice(j-1,2);
j-=2;
}
}
}
}
_69.path=_6c.join("/");
}
}
}
}
uri=[];
if(_69.scheme){
uri.push(_69.scheme,":");
}
if(_69.authority){
uri.push("//",_69.authority);
}
uri.push(_69.path);
if(_69.query){
uri.push("?",_69.query);
}
if(_69.fragment){
uri.push("#",_69.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
dojo._Url.prototype.toString=function(){
return this.uri;
};
dojo.moduleUrl=function(_6f,url){
var loc=d._getModuleSymbols(_6f).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _72=loc.indexOf(":");
if(loc.charAt(0)!="/"&&(_72==-1||_72>loc.indexOf("/"))){
loc=d.baseUrl+loc;
}
return new d._Url(loc,url);
};
})();
if(typeof window!="undefined"){
dojo.isBrowser=true;
dojo._name="browser";
(function(){
var d=dojo;
if(document&&document.getElementsByTagName){
var _74=document.getElementsByTagName("script");
var _75=/dojo(\.xd)?\.js(\W|$)/i;
for(var i=0;i<_74.length;i++){
var src=_74[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_75);
if(m){
if(!d.config.baseUrl){
d.config.baseUrl=src.substring(0,m.index);
}
var cfg=_74[i].getAttribute("djConfig");
if(cfg){
var _7a=eval("({ "+cfg+" })");
for(var x in _7a){
dojo.config[x]=_7a[x];
}
}
break;
}
}
}
d.baseUrl=d.config.baseUrl;
var n=navigator;
var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);
if(dua.indexOf("Opera")>=0){
d.isOpera=tv;
}
if(dua.indexOf("AdobeAIR")>=0){
d.isAIR=1;
}
d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;
d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
var _80=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_80&&!dojo.isChrome){
d.isSafari=parseFloat(dav.split("Version/")[1]);
if(!d.isSafari||parseFloat(dav.substr(_80+7))<=419.3){
d.isSafari=2;
}
}
if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){
d.isMozilla=d.isMoz=tv;
}
if(d.isMoz){
d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1]||dua.split("Shiretoko/")[1])||undefined;
}
if(document.all&&!d.isOpera){
d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
if(d.isIE>=8&&document.documentMode!=5){
d.isIE=document.documentMode;
}
}
if(dojo.isIE&&window.location.protocol==="file:"){
dojo.config.ieForceActiveXXhr=true;
}
var cm=document.compatMode;
d.isQuirks=cm=="BackCompat"||cm=="QuirksMode"||d.isIE<6;
d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();
d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
d._xhrObj=function(){
var _82,_83;
if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){
try{
_82=new XMLHttpRequest();
}
catch(e){
}
}
if(!_82){
for(var i=0;i<3;++i){
var _85=d._XMLHTTP_PROGIDS[i];
try{
_82=new ActiveXObject(_85);
}
catch(e){
_83=e;
}
if(_82){
d._XMLHTTP_PROGIDS=[_85];
break;
}
}
}
if(!_82){
throw new Error("XMLHTTP not available: "+_83);
}
return _82;
};
d._isDocumentOk=function(_86){
var _87=_86.status||0;
return (_87>=200&&_87<300)||_87==304||_87==1223||(!_87&&(location.protocol=="file:"||location.protocol=="chrome:"));
};
var _88=window.location+"";
var _89=document.getElementsByTagName("base");
var _8a=(_89&&_89.length>0);
d._getText=function(uri,_8c){
var _8d=this._xhrObj();
if(!_8a&&dojo._Url){
uri=(new dojo._Url(_88,uri)).toString();
}
if(d.config.cacheBust){
uri+="";
uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");
}
_8d.open("GET",uri,false);
try{
_8d.send(null);
if(!d._isDocumentOk(_8d)){
var err=Error("Unable to load "+uri+" status:"+_8d.status);
err.status=_8d.status;
err.responseText=_8d.responseText;
throw err;
}
}
catch(e){
if(_8c){
return null;
}
throw e;
}
return _8d.responseText;
};
var _w=window;
var _90=function(_91,fp){
var _93=_w[_91]||function(){
};
_w[_91]=function(){
fp.apply(_w,arguments);
_93.apply(_w,arguments);
};
};
d._windowUnloaders=[];
d.windowUnloaded=function(){
var mll=d._windowUnloaders;
while(mll.length){
(mll.pop())();
}
};
var _95=0;
d.addOnWindowUnload=function(obj,_97){
d._onto(d._windowUnloaders,obj,_97);
if(!_95){
_95=1;
_90("onunload",d.windowUnloaded);
}
};
var _98=0;
d.addOnUnload=function(obj,_9a){
d._onto(d._unloaders,obj,_9a);
if(!_98){
_98=1;
_90("onbeforeunload",dojo.unloaded);
}
};
})();
dojo._initFired=false;
dojo._loadInit=function(e){
dojo._initFired=true;
var _9c=e&&e.type?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(_9c!="domcontentloaded"&&_9c!="load")){
return;
}
arguments.callee.initialized=true;
if("_khtmlTimer" in dojo){
clearInterval(dojo._khtmlTimer);
delete dojo._khtmlTimer;
}
if(dojo._inFlightCount==0){
dojo._modulesLoaded();
}
};
if(!dojo.config.afterOnLoad){
if(document.addEventListener){
if(dojo.isWebKit>525||dojo.isOpera||dojo.isFF>=3||(dojo.isMoz&&dojo.config.enableMozDomContentLoaded===true)){
document.addEventListener("DOMContentLoaded",dojo._loadInit,null);
}
window.addEventListener("load",dojo._loadInit,null);
}
if(dojo.isAIR){
window.addEventListener("load",dojo._loadInit,null);
}else{
if((dojo.isWebKit<525)||dojo.isKhtml){
dojo._khtmlTimer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dojo._loadInit();
}
},10);
}
}
}
if(dojo.isIE){
if(!dojo.config.afterOnLoad){
document.write("<scr"+"ipt defer src=\"//:\" "+"onreadystatechange=\"if(this.readyState=='complete'){"+dojo._scopeName+"._loadInit();}\">"+"</scr"+"ipt>");
}
try{
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML);  display:inline-block");
}
catch(e){
}
}
}
(function(){
var mp=dojo.config["modulePaths"];
if(mp){
for(var _9e in mp){
dojo.registerModulePath(_9e,mp[_9e]);
}
}
})();
if(dojo.config.isDebug){
dojo.require("dojo._firebug.firebug");
}
if(dojo.config.debugAtAllCosts){
dojo.config.useXDomain=true;
dojo.require("dojo._base._loader.loader_xd");
dojo.require("dojo._base._loader.loader_debug");
dojo.require("dojo.i18n");
}
if(!dojo._hasResource["dojo._base.lang"]){
dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
dojo.isString=function(it){
return !!arguments.length&&it!=null&&(typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=(function(){
var _a1=function(it){
var t=typeof it;
return it&&(t=="function"||it instanceof Function);
};
return dojo.isSafari?function(it){
if(typeof it=="function"&&it=="[object NodeList]"){
return false;
}
return _a1(it);
}:_a1;
})();
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));
};
dojo.isArrayLike=function(it){
var d=dojo;
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.extend=function(_a9,_aa){
for(var i=1,l=arguments.length;i<l;i++){
dojo._mixin(_a9.prototype,arguments[i]);
}
return _a9;
};
dojo._hitchArgs=function(_ad,_ae){
var pre=dojo._toArray(arguments,2);
var _b0=dojo.isString(_ae);
return function(){
var _b1=dojo._toArray(arguments);
var f=_b0?(_ad||dojo.global)[_ae]:_ae;
return f&&f.apply(_ad||this,pre.concat(_b1));
};
};
dojo.hitch=function(_b3,_b4){
if(arguments.length>2){
return dojo._hitchArgs.apply(dojo,arguments);
}
if(!_b4){
_b4=_b3;
_b3=null;
}
if(dojo.isString(_b4)){
_b3=_b3||dojo.global;
if(!_b3[_b4]){
throw (["dojo.hitch: scope[\"",_b4,"\"] is null (scope=\"",_b3,"\")"].join(""));
}
return function(){
return _b3[_b4].apply(_b3,arguments||[]);
};
}
return !_b3?_b4:function(){
return _b4.apply(_b3,arguments||[]);
};
};
dojo.delegate=dojo._delegate=(function(){
function TMP(){
};
return function(obj,_b7){
TMP.prototype=obj;
var tmp=new TMP();
if(_b7){
dojo._mixin(tmp,_b7);
}
return tmp;
};
})();
(function(){
var _b9=function(obj,_bb,_bc){
return (_bc||[]).concat(Array.prototype.slice.call(obj,_bb||0));
};
var _bd=function(obj,_bf,_c0){
var arr=_c0||[];
for(var x=_bf||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray=dojo.isIE?function(obj){
return ((obj.item)?_bd:_b9).apply(this,arguments);
}:_b9;
})();
dojo.partial=function(_c4){
var arr=[null];
return dojo.hitch.apply(dojo,arr.concat(dojo._toArray(arguments)));
};
dojo.clone=function(o){
if(!o){
return o;
}
if(dojo.isArray(o)){
var r=[];
for(var i=0;i<o.length;++i){
r.push(dojo.clone(o[i]));
}
return r;
}
if(!dojo.isObject(o)){
return o;
}
if(o.nodeType&&o.cloneNode){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
r=new o.constructor();
for(i in o){
if(!(i in r)||r[i]!=o[i]){
r[i]=dojo.clone(o[i]);
}
}
return r;
};
dojo.trim=String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
}
if(!dojo._hasResource["dojo._base.declare"]){
dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
dojo.declare=function(_cb,_cc,_cd){
var dd=arguments.callee,_cf;
if(dojo.isArray(_cc)){
_cf=_cc;
_cc=_cf.shift();
}
if(_cf){
dojo.forEach(_cf,function(m,i){
if(!m){
throw (_cb+": mixin #"+i+" is null");
}
_cc=dd._delegate(_cc,m);
});
}
var _d2=dd._delegate(_cc);
_cd=_cd||{};
_d2.extend(_cd);
dojo.extend(_d2,{declaredClass:_cb,_constructor:_cd.constructor});
_d2.prototype.constructor=_d2;
return dojo.setObject(_cb,_d2);
};
dojo.mixin(dojo.declare,{_delegate:function(_d3,_d4){
var bp=(_d3||0).prototype,mp=(_d4||0).prototype,dd=dojo.declare;
var _d8=dd._makeCtor();
dojo.mixin(_d8,{superclass:bp,mixin:mp,extend:dd._extend});
if(_d3){
_d8.prototype=dojo._delegate(bp);
}
dojo.extend(_d8,dd._core,mp||0,{_constructor:null,preamble:null});
_d8.prototype.constructor=_d8;
_d8.prototype.declaredClass=(bp||0).declaredClass+"_"+(mp||0).declaredClass;
return _d8;
},_extend:function(_d9){
var i,fn;
for(i in _d9){
if(dojo.isFunction(fn=_d9[i])&&!0[i]){
fn.nom=i;
fn.ctor=this;
}
}
dojo.extend(this,_d9);
},_makeCtor:function(){
return function(){
this._construct(arguments);
};
},_core:{_construct:function(_dc){
var c=_dc.callee,s=c.superclass,ct=s&&s.constructor,m=c.mixin,mct=m&&m.constructor,a=_dc,ii,fn;
if(a[0]){
if(((fn=a[0].preamble))){
a=fn.apply(this,a)||a;
}
}
if((fn=c.prototype.preamble)){
a=fn.apply(this,a)||a;
}
if(ct&&ct.apply){
ct.apply(this,a);
}
if(mct&&mct.apply){
mct.apply(this,a);
}
if((ii=c.prototype._constructor)){
ii.apply(this,_dc);
}
if(this.constructor.prototype==c.prototype&&(ct=this.postscript)){
ct.apply(this,_dc);
}
},_findMixin:function(_e5){
var c=this.constructor,p,m;
while(c){
p=c.superclass;
m=c.mixin;
if(m==_e5||(m instanceof _e5.constructor)){
return p;
}
if(m&&m._findMixin&&(m=m._findMixin(_e5))){
return m;
}
c=p&&p.constructor;
}
},_findMethod:function(_e9,_ea,_eb,has){
var p=_eb,c,m,f;
do{
c=p.constructor;
m=c.mixin;
if(m&&(m=this._findMethod(_e9,_ea,m,has))){
return m;
}
if((f=p[_e9])&&(has==(f==_ea))){
return p;
}
p=c.superclass;
}while(p);
return !has&&(p=this._findMixin(_eb))&&this._findMethod(_e9,_ea,p,has);
},inherited:function(_f1,_f2,_f3){
var a=arguments;
if(!dojo.isString(a[0])){
_f3=_f2;
_f2=_f1;
_f1=_f2.callee.nom;
}
a=_f3||_f2;
var c=_f2.callee,p=this.constructor.prototype,fn,mp;
if(this[_f1]!=c||p[_f1]==c){
mp=(c.ctor||0).superclass||this._findMethod(_f1,c,p,true);
if(!mp){
throw (this.declaredClass+": inherited method \""+_f1+"\" mismatch");
}
p=this._findMethod(_f1,c,mp,false);
}
fn=p&&p[_f1];
if(!fn){
throw (mp.declaredClass+": inherited method \""+_f1+"\" not found");
}
return fn.apply(this,a);
}}});
}
if(!dojo._hasResource["dojo._base.connect"]){
dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo._listener={getDispatcher:function(){
return function(){
var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;
var r=t&&t.apply(this,arguments);
var lls;
lls=[].concat(ls);
for(var i in lls){
if(!(i in ap)){
lls[i].apply(this,arguments);
}
}
return r;
};
},add:function(_100,_101,_102){
_100=_100||dojo.global;
var f=_100[_101];
if(!f||!f._listeners){
var d=dojo._listener.getDispatcher();
d.target=f;
d._listeners=[];
f=_100[_101]=d;
}
return f._listeners.push(_102);
},remove:function(_105,_106,_107){
var f=(_105||dojo.global)[_106];
if(f&&f._listeners&&_107--){
delete f._listeners[_107];
}
}};
dojo.connect=function(obj,_10a,_10b,_10c,_10d){
var a=arguments,args=[],i=0;
args.push(dojo.isString(a[0])?null:a[i++],a[i++]);
var a1=a[i+1];
args.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
args.push(a[i]);
}
return dojo._connect.apply(this,args);
};
dojo._connect=function(obj,_113,_114,_115){
var l=dojo._listener,h=l.add(obj,_113,dojo.hitch(_114,_115));
return [obj,_113,h,l];
};
dojo.disconnect=function(_118){
if(_118&&_118[0]!==undefined){
dojo._disconnect.apply(this,_118);
delete _118[0];
}
};
dojo._disconnect=function(obj,_11a,_11b,_11c){
_11c.remove(obj,_11a,_11b);
};
dojo._topics={};
dojo.subscribe=function(_11d,_11e,_11f){
return [_11d,dojo._listener.add(dojo._topics,_11d,dojo.hitch(_11e,_11f))];
};
dojo.unsubscribe=function(_120){
if(_120){
dojo._listener.remove(dojo._topics,_120[0],_120[1]);
}
};
dojo.publish=function(_121,args){
var f=dojo._topics[_121];
if(f){
f.apply(this,args||[]);
}
};
dojo.connectPublisher=function(_124,obj,_126){
var pf=function(){
dojo.publish(_124,arguments);
};
return (_126)?dojo.connect(obj,_126,pf):dojo.connect(obj,pf);
};
}
if(!dojo._hasResource["dojo._base.Deferred"]){
dojo._hasResource["dojo._base.Deferred"]=true;
dojo.provide("dojo._base.Deferred");
dojo.Deferred=function(_128){
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=_128;
this.silentlyCancelled=false;
};
dojo.extend(dojo.Deferred,{_nextId:(function(){
var n=1;
return function(){
return n++;
};
})(),cancel:function(){
var err;
if(this.fired==-1){
if(this.canceller){
err=this.canceller(this);
}else{
this.silentlyCancelled=true;
}
if(this.fired==-1){
if(!(err instanceof Error)){
var res=err;
var msg="Deferred Cancelled";
if(err&&err.toString){
msg+=": "+err.toString();
}
err=new Error(msg);
err.dojoType="cancel";
err.cancelResult=res;
}
this.errback(err);
}
}else{
if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){
this.results[0].cancel();
}
}
},_resback:function(res){
this.fired=((res instanceof Error)?1:0);
this.results[this.fired]=res;
this._fire();
},_check:function(){
if(this.fired!=-1){
if(!this.silentlyCancelled){
throw new Error("already called!");
}
this.silentlyCancelled=false;
return;
}
},callback:function(res){
this._check();
this._resback(res);
},errback:function(res){
this._check();
if(!(res instanceof Error)){
res=new Error(res);
}
this._resback(res);
},addBoth:function(cb,cbfn){
var _132=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_132,_132);
},addCallback:function(cb,cbfn){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(cb,cbfn){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addCallbacks:function(cb,eb){
this.chain.push([cb,eb]);
if(this.fired>=0){
this._fire();
}
return this;
},_fire:function(){
var _139=this.chain;
var _13a=this.fired;
var res=this.results[_13a];
var self=this;
var cb=null;
while((_139.length>0)&&(this.paused==0)){
var f=_139.shift()[_13a];
if(!f){
continue;
}
var func=function(){
var ret=f(res);
if(typeof ret!="undefined"){
res=ret;
}
_13a=((res instanceof Error)?1:0);
if(res instanceof dojo.Deferred){
cb=function(res){
self._resback(res);
self.paused--;
if((self.paused==0)&&(self.fired>=0)){
self._fire();
}
};
this.paused++;
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(err){
_13a=1;
res=err;
}
}
}
this.fired=_13a;
this.results[_13a]=res;
if((cb)&&(this.paused)){
res.addBoth(cb);
}
}});
}
if(!dojo._hasResource["dojo._base.json"]){
dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){
return eval("("+json+")");
};
dojo._escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_145,_146){
if(it===undefined){
return "undefined";
}
var _147=typeof it;
if(_147=="number"||_147=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(dojo.isString(it)){
return dojo._escapeString(it);
}
var _148=arguments.callee;
var _149;
_146=_146||"";
var _14a=_145?_146+dojo.toJsonIndentStr:"";
var tf=it.__json__||it.json;
if(dojo.isFunction(tf)){
_149=tf.call(it);
if(it!==_149){
return _148(_149,_145,_14a);
}
}
if(it.nodeType&&it.cloneNode){
throw new Error("Can't serialize DOM nodes");
}
var sep=_145?" ":"";
var _14d=_145?"\n":"";
if(dojo.isArray(it)){
var res=dojo.map(it,function(obj){
var val=_148(obj,_145,_14a);
if(typeof val!="string"){
val="undefined";
}
return _14d+_14a+val;
});
return "["+res.join(","+sep)+_14d+_146+"]";
}
if(_147=="function"){
return null;
}
var _151=[],key;
for(key in it){
var _153,val;
if(typeof key=="number"){
_153="\""+key+"\"";
}else{
if(typeof key=="string"){
_153=dojo._escapeString(key);
}else{
continue;
}
}
val=_148(it[key],_145,_14a);
if(typeof val!="string"){
continue;
}
_151.push(_14d+_14a+_153+":"+sep+val);
}
return "{"+_151.join(","+sep)+_14d+_146+"}";
};
}
if(!dojo._hasResource["dojo._base.array"]){
dojo._hasResource["dojo._base.array"]=true;
dojo.provide("dojo._base.array");
(function(){
var _155=function(arr,obj,cb){
return [dojo.isString(arr)?arr.split(""):arr,obj||dojo.global,dojo.isString(cb)?new Function("item","index","array",cb):cb];
};
dojo.mixin(dojo,{indexOf:function(_159,_15a,_15b,_15c){
var step=1,end=_159.length||0,i=0;
if(_15c){
i=end-1;
step=end=-1;
}
if(_15b!=undefined){
i=_15b;
}
if((_15c&&i>end)||i<end){
for(;i!=end;i+=step){
if(_159[i]==_15a){
return i;
}
}
}
return -1;
},lastIndexOf:function(_15f,_160,_161){
return dojo.indexOf(_15f,_160,_161,true);
},forEach:function(arr,_163,_164){
if(!arr||!arr.length){
return;
}
var _p=_155(arr,_164,_163);
arr=_p[0];
for(var i=0,l=arr.length;i<l;++i){
_p[2].call(_p[1],arr[i],i,arr);
}
},_everyOrSome:function(_168,arr,_16a,_16b){
var _p=_155(arr,_16b,_16a);
arr=_p[0];
for(var i=0,l=arr.length;i<l;++i){
var _16f=!!_p[2].call(_p[1],arr[i],i,arr);
if(_168^_16f){
return _16f;
}
}
return _168;
},every:function(arr,_171,_172){
return this._everyOrSome(true,arr,_171,_172);
},some:function(arr,_174,_175){
return this._everyOrSome(false,arr,_174,_175);
},map:function(arr,_177,_178){
var _p=_155(arr,_178,_177);
arr=_p[0];
var _17a=(arguments[3]?(new arguments[3]()):[]);
for(var i=0,l=arr.length;i<l;++i){
_17a.push(_p[2].call(_p[1],arr[i],i,arr));
}
return _17a;
},filter:function(arr,_17e,_17f){
var _p=_155(arr,_17f,_17e);
arr=_p[0];
var _181=[];
for(var i=0,l=arr.length;i<l;++i){
if(_p[2].call(_p[1],arr[i],i,arr)){
_181.push(arr[i]);
}
}
return _181;
}});
})();
}
if(!dojo._hasResource["dojo._base.Color"]){
dojo._hasResource["dojo._base.Color"]=true;
dojo.provide("dojo._base.Color");
(function(){
var d=dojo;
dojo.Color=function(_185){
if(_185){
this.setColor(_185);
}
};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){
var t=this;
t.r=r;
t.g=g;
t.b=b;
t.a=a;
},setColor:function(_18b){
if(d.isString(_18b)){
d.colorFromString(_18b,this);
}else{
if(d.isArray(_18b)){
d.colorFromArray(_18b,this);
}else{
this._set(_18b.r,_18b.g,_18b.b,_18b.a);
if(!(_18b instanceof d.Color)){
this.sanitize();
}
}
}
return this;
},sanitize:function(){
return this;
},toRgb:function(){
var t=this;
return [t.r,t.g,t.b];
},toRgba:function(){
var t=this;
return [t.r,t.g,t.b,t.a];
},toHex:function(){
var arr=d.map(["r","g","b"],function(x){
var s=this[x].toString(16);
return s.length<2?"0"+s:s;
},this);
return "#"+arr.join("");
},toCss:function(_191){
var t=this,rgb=t.r+", "+t.g+", "+t.b;
return (_191?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";
},toString:function(){
return this.toCss(true);
}});
dojo.blendColors=function(_194,end,_196,obj){
var t=obj||new d.Color();
d.forEach(["r","g","b","a"],function(x){
t[x]=_194[x]+(end[x]-_194[x])*_196;
if(x!="a"){
t[x]=Math.round(t[x]);
}
});
return t.sanitize();
};
dojo.colorFromRgb=function(_19a,obj){
var m=_19a.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);
};
dojo.colorFromHex=function(_19d,obj){
var t=obj||new d.Color(),bits=(_19d.length==4)?4:8,mask=(1<<bits)-1;
_19d=Number("0x"+_19d.substr(1));
if(isNaN(_19d)){
return null;
}
d.forEach(["b","g","r"],function(x){
var c=_19d&mask;
_19d>>=bits;
t[x]=bits==4?17*c:c;
});
t.a=1;
return t;
};
dojo.colorFromArray=function(a,obj){
var t=obj||new d.Color();
t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));
if(isNaN(t.a)){
t.a=1;
}
return t.sanitize();
};
dojo.colorFromString=function(str,obj){
var a=d.Color.named[str];
return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);
};
})();
}
if(!dojo._hasResource["dojo._base"]){
dojo._hasResource["dojo._base"]=true;
dojo.provide("dojo._base");
}
if(!dojo._hasResource["dojo._base.window"]){
dojo._hasResource["dojo._base.window"]=true;
dojo.provide("dojo._base.window");
dojo.doc=window["document"]||null;
dojo.body=function(){
return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];
};
dojo.setContext=function(_1aa,_1ab){
dojo.global=_1aa;
dojo.doc=_1ab;
};
dojo.withGlobal=function(_1ac,_1ad,_1ae,_1af){
var _1b0=dojo.global;
try{
dojo.global=_1ac;
return dojo.withDoc.call(null,_1ac.document,_1ad,_1ae,_1af);
}
finally{
dojo.global=_1b0;
}
};
dojo.withDoc=function(_1b1,_1b2,_1b3,_1b4){
var _1b5=dojo.doc,_1b6=dojo._bodyLtr;
try{
dojo.doc=_1b1;
delete dojo._bodyLtr;
if(_1b3&&dojo.isString(_1b2)){
_1b2=_1b3[_1b2];
}
return _1b2.apply(_1b3,_1b4||[]);
}
finally{
dojo.doc=_1b5;
if(_1b6!==undefined){
dojo._bodyLtr=_1b6;
}
}
};
}
if(!dojo._hasResource["dojo._base.event"]){
dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
(function(){
var del=(dojo._event_listener={add:function(node,name,fp){
if(!node){
return;
}
name=del._normalizeEventName(name);
fp=del._fixCallback(name,fp);
var _1bb=name;
if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){
var ofp=fp;
name=(name=="mouseenter")?"mouseover":"mouseout";
fp=function(e){
if(dojo.isFF<=2){
try{
e.relatedTarget.tagName;
}
catch(e2){
return;
}
}
if(!dojo.isDescendant(e.relatedTarget,node)){
return ofp.call(this,e);
}
};
}
node.addEventListener(name,fp,false);
return fp;
},remove:function(node,_1bf,_1c0){
if(node){
_1bf=del._normalizeEventName(_1bf);
if(!dojo.isIE&&(_1bf=="mouseenter"||_1bf=="mouseleave")){
_1bf=(_1bf=="mouseenter")?"mouseover":"mouseout";
}
node.removeEventListener(_1bf,_1c0,false);
}
},_normalizeEventName:function(name){
return name.slice(0,2)=="on"?name.slice(2):name;
},_fixCallback:function(name,fp){
return name!="keypress"?fp:function(e){
return fp.call(this,del._fixEvent(e,this));
};
},_fixEvent:function(evt,_1c6){
switch(evt.type){
case "keypress":
del._setKeyChar(evt);
break;
}
return evt;
},_setKeyChar:function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});
dojo.fixEvent=function(evt,_1c9){
return del._fixEvent(evt,_1c9);
};
dojo.stopEvent=function(evt){
evt.preventDefault();
evt.stopPropagation();
};
var _1cb=dojo._listener;
dojo._connect=function(obj,_1cd,_1ce,_1cf,_1d0){
var _1d1=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);
var lid=_1d1?(_1d0?2:1):0,l=[dojo._listener,del,_1cb][lid];
var h=l.add(obj,_1cd,dojo.hitch(_1ce,_1cf));
return [obj,_1cd,h,lid];
};
dojo._disconnect=function(obj,_1d6,_1d7,_1d8){
([dojo._listener,del,_1cb][_1d8]).remove(obj,_1d6,_1d7);
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(dojo.isIE){
var _1d9=function(e,code){
try{
return (e.keyCode=code);
}
catch(e){
return 0;
}
};
var iel=dojo._listener;
var _1dd=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");
if(!dojo.config._allow_leaks){
_1cb=iel=dojo._ie_listener={handlers:[],add:function(_1de,_1df,_1e0){
_1de=_1de||dojo.global;
var f=_1de[_1df];
if(!f||!f[_1dd]){
var d=dojo._getIeDispatcher();
d.target=f&&(ieh.push(f)-1);
d[_1dd]=[];
f=_1de[_1df]=d;
}
return f[_1dd].push(ieh.push(_1e0)-1);
},remove:function(_1e4,_1e5,_1e6){
var f=(_1e4||dojo.global)[_1e5],l=f&&f[_1dd];
if(f&&l&&_1e6--){
delete ieh[l[_1e6]];
delete l[_1e6];
}
}};
var ieh=iel.handlers;
}
dojo.mixin(del,{add:function(node,_1ea,fp){
if(!node){
return;
}
_1ea=del._normalizeEventName(_1ea);
if(_1ea=="onkeypress"){
var kd=node.onkeydown;
if(!kd||!kd[_1dd]||!kd._stealthKeydownHandle){
var h=del.add(node,"onkeydown",del._stealthKeyDown);
kd=node.onkeydown;
kd._stealthKeydownHandle=h;
kd._stealthKeydownRefs=1;
}else{
kd._stealthKeydownRefs++;
}
}
return iel.add(node,_1ea,del._fixCallback(fp));
},remove:function(node,_1ef,_1f0){
_1ef=del._normalizeEventName(_1ef);
iel.remove(node,_1ef,_1f0);
if(_1ef=="onkeypress"){
var kd=node.onkeydown;
if(--kd._stealthKeydownRefs<=0){
iel.remove(node,"onkeydown",kd._stealthKeydownHandle);
delete kd._stealthKeydownHandle;
}
}
},_normalizeEventName:function(_1f2){
return _1f2.slice(0,2)!="on"?"on"+_1f2:_1f2;
},_nop:function(){
},_fixEvent:function(evt,_1f4){
if(!evt){
var w=_1f4&&(_1f4.ownerDocument||_1f4.document||_1f4).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
evt.target=evt.srcElement;
evt.currentTarget=(_1f4||evt.srcElement);
evt.layerX=evt.offsetX;
evt.layerY=evt.offsetY;
var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;
var _1f8=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
var _1f9=dojo._getIeDocumentElementOffset();
evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_1f8.scrollLeft||0)-_1f9.x;
evt.pageY=evt.clientY+(_1f8.scrollTop||0)-_1f9.y;
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
evt.stopPropagation=del._stopPropagation;
evt.preventDefault=del._preventDefault;
return del._fixKeys(evt);
},_fixKeys:function(evt){
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
del._setKeyChar(evt);
break;
}
return evt;
},_stealthKeyDown:function(evt){
var kp=evt.currentTarget.onkeypress;
if(!kp||!kp[_1dd]){
return;
}
var k=evt.keyCode;
var _1ff=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_1ff||evt.ctrlKey){
var c=_1ff?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
kp.call(evt.currentTarget,faux);
evt.cancelBubble=faux.cancelBubble;
evt.returnValue=faux.returnValue;
_1d9(evt,faux.keyCode);
}
},_stopPropagation:function(){
this.cancelBubble=true;
},_preventDefault:function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
_1d9(this,0);
}
this.returnValue=false;
}});
dojo.stopEvent=function(evt){
evt=evt||window.event;
del._stopPropagation.call(evt);
del._preventDefault.call(evt);
};
}
del._synthesizeEvent=function(evt,_204){
var faux=dojo.mixin({},evt,_204);
del._setKeyChar(faux);
faux.preventDefault=function(){
evt.preventDefault();
};
faux.stopPropagation=function(){
evt.stopPropagation();
};
return faux;
};
if(dojo.isOpera){
dojo.mixin(del,{_fixEvent:function(evt,_207){
switch(evt.type){
case "keypress":
var c=evt.which;
if(c==3){
c=99;
}
c=c<41&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return del._synthesizeEvent(evt,{charCode:c});
}
return evt;
}});
}
if(dojo.isWebKit){
del._add=del.add;
del._remove=del.remove;
dojo.mixin(del,{add:function(node,_20a,fp){
if(!node){
return;
}
var _20c=del._add(node,_20a,fp);
if(del._normalizeEventName(_20a)=="keypress"){
_20c._stealthKeyDownHandle=del._add(node,"keydown",function(evt){
var k=evt.keyCode;
var _20f=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_20f||evt.ctrlKey){
var c=_20f?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if(!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
fp.call(evt.currentTarget,faux);
}
});
}
return _20c;
},remove:function(node,_213,_214){
if(node){
if(_214._stealthKeyDownHandle){
del._remove(node,"keydown",_214._stealthKeyDownHandle);
}
del._remove(node,_213,_214);
}
},_fixEvent:function(evt,_216){
switch(evt.type){
case "keypress":
if(evt.faux){
return evt;
}
var c=evt.charCode;
c=c>=32?c:0;
return del._synthesizeEvent(evt,{charCode:c,faux:true});
}
return evt;
}});
}
})();
if(dojo.isIE){
dojo._ieDispatcher=function(args,_219){
var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];
var r=t&&t.apply(_219,args);
var lls=[].concat(ls);
for(var i in lls){
var f=h[lls[i]];
if(!(i in ap)&&f){
f.apply(_219,args);
}
}
return r;
};
dojo._getIeDispatcher=function(){
return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");
};
dojo._event_listener._fixCallback=function(fp){
var f=dojo._event_listener._fixEvent;
return function(e){
return fp.call(this,f(e,this));
};
};
}
}
if(!dojo._hasResource["dojo._base.html"]){
dojo._hasResource["dojo._base.html"]=true;
dojo.provide("dojo._base.html");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
if(dojo.isIE||dojo.isOpera){
dojo.byId=function(id,doc){
if(dojo.isString(id)){
var _d=doc||dojo.doc;
var te=_d.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var eles=_d.all[id];
if(!eles||eles.nodeName){
eles=[eles];
}
var i=0;
while((te=eles[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
}else{
return id;
}
};
}else{
dojo.byId=function(id,doc){
return dojo.isString(id)?(doc||dojo.doc).getElementById(id):id;
};
}
(function(){
var d=dojo;
var _22f=null;
d.addOnWindowUnload(function(){
_22f=null;
});
dojo._destroyElement=dojo.destroy=function(node){
node=d.byId(node);
try{
if(!_22f||_22f.ownerDocument!=node.ownerDocument){
_22f=node.ownerDocument.createElement("div");
}
_22f.appendChild(node.parentNode?node.parentNode.removeChild(node):node);
_22f.innerHTML="";
}
catch(e){
}
};
dojo.isDescendant=function(node,_232){
try{
node=d.byId(node);
_232=d.byId(_232);
while(node){
if(node===_232){
return true;
}
node=node.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(node,_234){
node=d.byId(node);
if(d.isMozilla){
node.style.MozUserSelect=_234?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
node.style.KhtmlUserSelect=_234?"auto":"none";
}else{
if(d.isIE){
var v=(node.unselectable=_234?"":"on");
d.query("*",node).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _236=function(node,ref){
var _239=ref.parentNode;
if(_239){
_239.insertBefore(node,ref);
}
};
var _23a=function(node,ref){
var _23d=ref.parentNode;
if(_23d){
if(_23d.lastChild==ref){
_23d.appendChild(node);
}else{
_23d.insertBefore(node,ref.nextSibling);
}
}
};
dojo.place=function(node,_23f,_240){
_23f=d.byId(_23f);
if(d.isString(node)){
node=node.charAt(0)=="<"?d._toDom(node,_23f.ownerDocument):d.byId(node);
}
if(typeof _240=="number"){
var cn=_23f.childNodes;
if(!cn.length||cn.length<=_240){
_23f.appendChild(node);
}else{
_236(node,cn[_240<0?0:_240]);
}
}else{
switch(_240){
case "before":
_236(node,_23f);
break;
case "after":
_23a(node,_23f);
break;
case "replace":
_23f.parentNode.replaceChild(node,_23f);
break;
case "only":
d.empty(_23f);
_23f.appendChild(node);
break;
case "first":
if(_23f.firstChild){
_236(node,_23f.firstChild);
break;
}
default:
_23f.appendChild(node);
}
}
return node;
};
dojo.boxModel="content-box";
if(d.isIE){
var _dcm=document.compatMode;
d.boxModel=_dcm=="BackCompat"||_dcm=="QuirksMode"||d.isIE<6?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(node){
var s;
if(node instanceof HTMLElement){
var dv=node.ownerDocument.defaultView;
s=dv.getComputedStyle(node,null);
if(!s&&node.style){
node.style.display="";
s=dv.getComputedStyle(node,null);
}
}
return s||{};
};
}else{
if(d.isIE){
gcs=function(node){
return node.nodeType==1?node.currentStyle:{};
};
}else{
gcs=function(node){
return node instanceof HTMLElement?node.ownerDocument.defaultView.getComputedStyle(node,null):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_249,_24a){
return parseFloat(_24a)||0;
};
}else{
d._toPixelValue=function(_24b,_24c){
if(!_24c){
return 0;
}
if(_24c=="medium"){
return 4;
}
if(_24c.slice&&_24c.slice(-2)=="px"){
return parseFloat(_24c);
}
with(_24b){
var _24d=style.left;
var _24e=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_24c;
_24c=style.pixelLeft;
}
catch(e){
_24c=0;
}
style.left=_24d;
runtimeStyle.left=_24e;
}
return _24c;
};
}
var px=d._toPixelValue;
var astr="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(astr);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE?function(node){
try{
return af(node).Opacity/100;
}
catch(e){
return 1;
}
}:function(node){
return gcs(node).opacity;
};
dojo._setOpacity=d.isIE?function(node,_257){
var ov=_257*100;
node.style.zoom=1;
af(node,1).Enabled=!(_257==1);
if(!af(node)){
node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";
}else{
af(node,1).Opacity=ov;
}
if(node.nodeName.toLowerCase()=="tr"){
d.query("> td",node).forEach(function(i){
d._setOpacity(i,_257);
});
}
return _257;
}:function(node,_25b){
return node.style.opacity=_25b;
};
var _25c={left:true,top:true};
var _25d=/margin|padding|width|height|max|min|offset/;
var _25e=function(node,type,_261){
type=type.toLowerCase();
if(d.isIE){
if(_261=="auto"){
if(type=="height"){
return node.offsetHeight;
}
if(type=="width"){
return node.offsetWidth;
}
}
if(type=="fontweight"){
switch(_261){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(type in _25c)){
_25c[type]=_25d.test(type);
}
return _25c[type]?px(node,_261):_261;
};
var _262=d.isIE?"styleFloat":"cssFloat",_263={"cssFloat":_262,"styleFloat":_262,"float":_262};
dojo.style=function(node,_265,_266){
var n=d.byId(node),args=arguments.length,op=(_265=="opacity");
_265=_263[_265]||_265;
if(args==3){
return op?d._setOpacity(n,_266):n.style[_265]=_266;
}
if(args==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(args==2&&!d.isString(_265)){
for(var x in _265){
d.style(node,x,_265[x]);
}
return s;
}
return (args==1)?s:_25e(n,_265,s[_265]||n.style[_265]);
};
dojo._getPadExtents=function(n,_26d){
var s=_26d||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_272){
var ne="none",s=_272||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_278){
var s=_278||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_27d){
var s=_27d||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(node,_284){
var s=_284||gcs(node),me=d._getMarginExtents(node,s);
var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;
if(d.isMoz){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl,t=st;
}else{
if(p&&p.style){
var pcs=gcs(p);
if(pcs.overflow!="visible"){
var be=d._getBorderExtents(p,pcs);
l+=be.l,t+=be.t;
}
}
}
}else{
if(d.isOpera||(d.isIE>7&&!d.isQuirks)){
if(p){
be=d._getBorderExtents(p);
l-=be.l;
t-=be.t;
}
}
}
return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};
};
dojo._getContentBox=function(node,_28f){
var s=_28f||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;
if(!w){
w=node.offsetWidth,h=node.offsetHeight;
}else{
h=node.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(node,_296){
var s=_296||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(node,l,t,w,h,u){
u=u||"px";
var s=node.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
dojo._isButtonTag=function(node){
return node.tagName=="BUTTON"||node.tagName=="INPUT"&&node.getAttribute("type").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(node){
var n=node.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);
};
dojo._setContentSize=function(node,_2a5,_2a6,_2a7){
if(d._usesBorderBox(node)){
var pb=d._getPadBorderExtents(node,_2a7);
if(_2a5>=0){
_2a5+=pb.w;
}
if(_2a6>=0){
_2a6+=pb.h;
}
}
d._setBox(node,NaN,NaN,_2a5,_2a6);
};
dojo._setMarginBox=function(node,_2aa,_2ab,_2ac,_2ad,_2ae){
var s=_2ae||gcs(node),bb=d._usesBorderBox(node),pb=bb?_2b2:d._getPadBorderExtents(node,s);
if(d.isWebKit){
if(d._isButtonTag(node)){
var ns=node.style;
if(_2ac>=0&&!ns.width){
ns.width="4px";
}
if(_2ad>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(node,s);
if(_2ac>=0){
_2ac=Math.max(_2ac-pb.w-mb.w,0);
}
if(_2ad>=0){
_2ad=Math.max(_2ad-pb.h-mb.h,0);
}
d._setBox(node,_2aa,_2ab,_2ac,_2ad);
};
var _2b2={l:0,t:0,w:0,h:0};
dojo.marginBox=function(node,box){
var n=d.byId(node),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(node,box){
var n=d.byId(node),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _2bf=function(node,prop){
if(!(node=(node||0).parentNode)){
return 0;
}
var val,_2c3=0,_b=d.body();
while(node&&node.style){
if(gcs(node).position=="fixed"){
return 0;
}
val=node[prop];
if(val){
_2c3+=val-0;
if(node==_b){
break;
}
}
node=node.parentNode;
}
return _2c3;
};
dojo._docScroll=function(){
var _b=d.body(),_w=d.global,de=d.doc.documentElement;
return {y:(_w.pageYOffset||de.scrollTop||_b.scrollTop||0),x:(_w.pageXOffset||d._fixIeBiDiScrollLeft(de.scrollLeft)||_b.scrollLeft||0)};
};
dojo._isBodyLtr=function(){
return ("_bodyLtr" in d)?d._bodyLtr:d._bodyLtr=gcs(d.body()).direction=="ltr";
};
dojo._getIeDocumentElementOffset=function(){
var de=d.doc.documentElement;
if(d.isIE<7){
return {x:d._isBodyLtr()||window.parent==window?de.clientLeft:de.offsetWidth-de.clientWidth-de.clientLeft,y:de.clientTop};
}else{
if(d.isIE<8){
return {x:de.getBoundingClientRect().left,y:de.getBoundingClientRect().top};
}else{
return {x:0,y:0};
}
}
};
dojo._fixIeBiDiScrollLeft=function(_2c9){
var dd=d.doc;
if(d.isIE<8&&!d._isBodyLtr()){
var de=dd.compatMode=="BackCompat"?dd.body:dd.documentElement;
return _2c9+de.clientWidth-de.scrollWidth;
}
return _2c9;
};
dojo._abs=function(node,_2cd){
var db=d.body(),dh=d.body().parentNode,ret;
if(node["getBoundingClientRect"]){
var _2d1=node.getBoundingClientRect();
ret={x:_2d1.left,y:_2d1.top};
if(d.isFF>=3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
if(d.isIE){
var _2d3=d._getIeDocumentElementOffset();
ret.x-=_2d3.x+(d.isQuirks?db.clientLeft:0);
ret.y-=_2d3.y+(d.isQuirks?db.clientTop:0);
}
}else{
ret={x:0,y:0};
if(node["offsetParent"]){
ret.x-=_2bf(node,"scrollLeft");
ret.y-=_2bf(node,"scrollTop");
var _2d4=node;
do{
var n=_2d4.offsetLeft,t=_2d4.offsetTop;
ret.x+=isNaN(n)?0:n;
ret.y+=isNaN(t)?0:t;
cs=gcs(_2d4);
if(_2d4!=node){
if(d.isFF){
ret.x+=2*px(_2d4,cs.borderLeftWidth);
ret.y+=2*px(_2d4,cs.borderTopWidth);
}else{
ret.x+=px(_2d4,cs.borderLeftWidth);
ret.y+=px(_2d4,cs.borderTopWidth);
}
}
if(d.isFF&&cs.position=="static"){
var _2d7=_2d4.parentNode;
while(_2d7!=_2d4.offsetParent){
var pcs=gcs(_2d7);
if(pcs.position=="static"){
ret.x+=px(_2d4,pcs.borderLeftWidth);
ret.y+=px(_2d4,pcs.borderTopWidth);
}
_2d7=_2d7.parentNode;
}
}
_2d4=_2d4.offsetParent;
}while((_2d4!=dh)&&_2d4);
}else{
if(node.x&&node.y){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
if(_2cd){
var _2d9=d._docScroll();
ret.x+=_2d9.x;
ret.y+=_2d9.y;
}
return ret;
};
dojo.coords=function(node,_2db){
var n=d.byId(node),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d._abs(n,_2db);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _2e0=d.isIE<8;
var _2e1=function(name){
switch(name.toLowerCase()){
case "tabindex":
return _2e0?"tabIndex":"tabindex";
case "readonly":
return "readOnly";
case "class":
return "className";
case "for":
case "htmlfor":
return _2e0?"htmlFor":"for";
default:
return name;
}
};
var _2e3={colspan:"colSpan",enctype:"enctype",frameborder:"frameborder",method:"method",rowspan:"rowSpan",scrolling:"scrolling",shape:"shape",span:"span",type:"type",valuetype:"valueType",classname:"className",innerhtml:"innerHTML"};
dojo.hasAttr=function(node,name){
node=d.byId(node);
var _2e6=_2e1(name);
_2e6=_2e6=="htmlFor"?"for":_2e6;
var attr=node.getAttributeNode&&node.getAttributeNode(_2e6);
return attr?attr.specified:false;
};
var _2e8={},_ctr=0,_2ea=dojo._scopeName+"attrid",_2eb={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(node,name,_2ee){
node=d.byId(node);
var args=arguments.length;
if(args==2&&!d.isString(name)){
for(var x in name){
d.attr(node,x,name[x]);
}
return;
}
name=_2e1(name);
if(args==3){
if(d.isFunction(_2ee)){
var _2f1=d.attr(node,_2ea);
if(!_2f1){
_2f1=_ctr++;
d.attr(node,_2ea,_2f1);
}
if(!_2e8[_2f1]){
_2e8[_2f1]={};
}
var h=_2e8[_2f1][name];
if(h){
d.disconnect(h);
}else{
try{
delete node[name];
}
catch(e){
}
}
_2e8[_2f1][name]=d.connect(node,name,_2ee);
}else{
if(typeof _2ee=="boolean"){
node[name]=_2ee;
}else{
if(name==="style"&&!d.isString(_2ee)){
d.style(node,_2ee);
}else{
if(name=="className"){
node.className=_2ee;
}else{
if(name==="innerHTML"){
if(d.isIE&&node.tagName.toLowerCase() in _2eb){
d.empty(node);
node.appendChild(d._toDom(_2ee,node.ownerDocument));
}else{
node[name]=_2ee;
}
}else{
node.setAttribute(name,_2ee);
}
}
}
}
}
}else{
var prop=_2e3[name.toLowerCase()];
if(prop){
return node[prop];
}
var _2f4=node[name];
return (typeof _2f4=="boolean"||typeof _2f4=="function")?_2f4:(d.hasAttr(node,name)?node.getAttribute(name):null);
}
};
dojo.removeAttr=function(node,name){
d.byId(node).removeAttribute(_2e1(name));
};
dojo.create=function(tag,_2f8,_2f9,pos){
var doc=d.doc;
if(_2f9){
_2f9=d.byId(_2f9);
doc=_2f9.ownerDocument;
}
if(d.isString(tag)){
tag=doc.createElement(tag);
}
if(_2f8){
d.attr(tag,_2f8);
}
if(_2f9){
d.place(tag,_2f9,pos);
}
return tag;
};
d.empty=d.isIE?function(node){
node=d.byId(node);
for(var c;c=node.lastChild;){
d.destroy(c);
}
}:function(node){
d.byId(node).innerHTML="";
};
var _2ff={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_300=/<\s*([\w\:]+)/,_301={},_302=0,_303="__"+d._scopeName+"ToDomId";
for(var _304 in _2ff){
var tw=_2ff[_304];
tw.pre=_304=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
d._toDom=function(frag,doc){
doc=doc||d.doc;
var _308=doc[_303];
if(!_308){
doc[_303]=_308=++_302+"";
_301[_308]=doc.createElement("div");
}
frag+="";
var _309=frag.match(_300),tag=_309?_309[1].toLowerCase():"",_30b=_301[_308],wrap,i,fc,df;
if(_309&&_2ff[tag]){
wrap=_2ff[tag];
_30b.innerHTML=wrap.pre+frag+wrap.post;
for(i=wrap.length;i;--i){
_30b=_30b.firstChild;
}
}else{
_30b.innerHTML=frag;
}
if(_30b.childNodes.length==1){
return _30b.removeChild(_30b.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_30b.firstChild){
df.appendChild(fc);
}
return df;
};
var _30f="className";
dojo.hasClass=function(node,_311){
return ((" "+d.byId(node)[_30f]+" ").indexOf(" "+_311+" ")>=0);
};
dojo.addClass=function(node,_313){
node=d.byId(node);
var cls=node[_30f];
if((" "+cls+" ").indexOf(" "+_313+" ")<0){
node[_30f]=cls+(cls?" ":"")+_313;
}
};
dojo.removeClass=function(node,_316){
node=d.byId(node);
var t=d.trim((" "+node[_30f]+" ").replace(" "+_316+" "," "));
if(node[_30f]!=t){
node[_30f]=t;
}
};
dojo.toggleClass=function(node,_319,_31a){
if(_31a===undefined){
_31a=!d.hasClass(node,_319);
}
d[_31a?"addClass":"removeClass"](node,_319);
};
})();
}
if(!dojo._hasResource["dojo._base.NodeList"]){
dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
(function(){
var d=dojo;
var ap=Array.prototype,aps=ap.slice,apc=ap.concat;
var tnl=function(a){
a.constructor=d.NodeList;
dojo._mixin(a,d.NodeList.prototype);
return a;
};
var _321=function(f,a,o){
a=[0].concat(aps.call(a,0));
o=o||d.global;
return function(node){
a[0]=node;
return f.apply(o,a);
};
};
var _326=function(f,o){
return function(){
this.forEach(_321(f,arguments,o));
return this;
};
};
var _329=function(f,o){
return function(){
return this.map(_321(f,arguments,o));
};
};
var _32c=function(f,o){
return function(){
return this.filter(_321(f,arguments,o));
};
};
var _32f=function(f,g,o){
return function(){
var a=arguments,body=_321(f,a,o);
if(g.call(o||d.global,a)){
return this.map(body);
}
this.forEach(body);
return this;
};
};
var _335=function(a){
return a.length==1&&d.isString(a[0]);
};
var _337=function(node){
var p=node.parentNode;
if(p){
p.removeChild(node);
}
};
dojo.NodeList=function(){
return tnl(Array.apply(null,arguments));
};
var nl=d.NodeList,nlp=nl.prototype;
nl._wrap=tnl;
nl._adaptAsMap=_329;
nl._adaptAsForEach=_326;
nl._adaptAsFilter=_32c;
nl._adaptWithCondition=_32f;
d.forEach(["slice","splice"],function(name){
var f=ap[name];
nlp[name]=function(){
return tnl(f.apply(this,arguments));
};
});
d.forEach(["indexOf","lastIndexOf","every","some"],function(name){
var f=d[name];
nlp[name]=function(){
return f.apply(d,[this].concat(aps.call(arguments,0)));
};
});
d.forEach(["attr","style"],function(name){
nlp[name]=_32f(d[name],_335);
});
d.forEach(["connect","addClass","removeClass","toggleClass","empty"],function(name){
nlp[name]=_326(d[name]);
});
dojo.extend(dojo.NodeList,{concat:function(item){
var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){
return a&&!d.isArray(a)&&(a.constructor===NodeList||a.constructor==nl)?aps.call(a,0):a;
});
return tnl(apc.apply(t,m));
},map:function(func,obj){
return tnl(d.map(this,func,obj));
},forEach:function(_348,_349){
d.forEach(this,_348,_349);
return this;
},coords:_329(d.coords),place:function(_34a,_34b){
var item=d.query(_34a)[0];
return this.forEach(function(node){
d.place(node,item,_34b);
});
},orphan:function(_34e){
return (_34e?d._filterQueryResult(this,_34e):this).forEach(_337);
},adopt:function(_34f,_350){
return d.query(_34f).place(item[0],_350);
},query:function(_351){
if(!_351){
return this;
}
var ret=this.map(function(node){
return d.query(_351,node).filter(function(_354){
return _354!==undefined;
});
});
return tnl(apc.apply([],ret));
},filter:function(_355){
var a=arguments,_357=this,_358=0;
if(d.isString(_355)){
_357=d._filterQueryResult(this,a[0]);
if(a.length==1){
return _357;
}
_358=1;
}
return tnl(d.filter(_357,a[_358],a[_358+1]));
},addContent:function(_359,_35a){
var c=d.isString(_359)?d._toDom(_359,this[0]&&this[0].ownerDocument):_359,i,l=this.length-1;
for(i=0;i<l;++i){
d.place(c.cloneNode(true),this[i],_35a);
}
if(l>=0){
d.place(c,this[l],_35a);
}
return this;
},instantiate:function(_35d,_35e){
var c=d.isFunction(_35d)?_35d:d.getObject(_35d);
_35e=_35e||{};
return this.forEach(function(node){
new c(_35e,node);
});
},at:function(){
var t=new dojo.NodeList();
d.forEach(arguments,function(i){
if(this[i]){
t.push(this[i]);
}
},this);
return t;
}});
d.forEach(["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"],function(evt){
var _oe="on"+evt;
nlp[_oe]=function(a,b){
return this.connect(_oe,a,b);
};
});
})();
}
if(!dojo._hasResource["dojo._base.query"]){
dojo._hasResource["dojo._base.query"]=true;
if(typeof dojo!="undefined"){
dojo.provide("dojo._base.query");
}
(function(d){
var trim=d.trim;
var each=d.forEach;
var qlc=d._queryListCtor=d.NodeList;
var _36b=d.isString;
var _36c=function(){
return d.doc;
};
var _36d=(d.isWebKit&&((_36c().compatMode)=="BackCompat"));
var _36e=!!_36c().firstChild["children"]?"children":"childNodes";
var _36f=">~+";
var _370=false;
var _371=function(){
return true;
};
var _372=function(_373){
if(_36f.indexOf(_373.slice(-1))>=0){
_373+=" * ";
}else{
_373+=" ";
}
var ts=function(s,e){
return trim(_373.slice(s,e));
};
var _377=[];
var _378=-1,_379=-1,_37a=-1,_37b=-1,_37c=-1,inId=-1,_37e=-1,lc="",cc="",_381;
var x=0,ql=_373.length,_384=null,_cp=null;
var _386=function(){
if(_37e>=0){
var tv=(_37e==x)?null:ts(_37e,x);
_384[(_36f.indexOf(tv)<0)?"tag":"oper"]=tv;
_37e=-1;
}
};
var _388=function(){
if(inId>=0){
_384.id=ts(inId,x).replace(/\\/g,"");
inId=-1;
}
};
var _389=function(){
if(_37c>=0){
_384.classes.push(ts(_37c+1,x).replace(/\\/g,""));
_37c=-1;
}
};
var _38a=function(){
_388();
_386();
_389();
};
var _38b=function(){
_38a();
if(_37b>=0){
_384.pseudos.push({name:ts(_37b+1,x)});
}
_384.loops=(_384.pseudos.length||_384.attrs.length||_384.classes.length);
_384.oquery=_384.query=ts(_381,x);
_384.otag=_384.tag=(_384["oper"])?null:(_384.tag||"*");
if(_384.tag){
_384.tag=_384.tag.toUpperCase();
}
if(_377.length&&(_377[_377.length-1].oper)){
_384.infixOper=_377.pop();
_384.query=_384.infixOper.query+" "+_384.query;
}
_377.push(_384);
_384=null;
};
for(;lc=cc,cc=_373.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_384){
_381=x;
_384={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return (_370)?this.otag:this.tag;
}};
_37e=x;
}
if(_378>=0){
if(cc=="]"){
if(!_cp.attr){
_cp.attr=ts(_378+1,x);
}else{
_cp.matchFor=ts((_37a||_378+1),x);
}
var cmf=_cp.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_cp.matchFor=cmf.slice(1,-1);
}
}
_384.attrs.push(_cp);
_cp=null;
_378=_37a=-1;
}else{
if(cc=="="){
var _38d=("|~^$*".indexOf(lc)>=0)?lc:"";
_cp.type=_38d+cc;
_cp.attr=ts(_378+1,x-_38d.length);
_37a=x+1;
}
}
}else{
if(_379>=0){
if(cc==")"){
if(_37b>=0){
_cp.value=ts(_379+1,x);
}
_37b=_379=-1;
}
}else{
if(cc=="#"){
_38a();
inId=x+1;
}else{
if(cc=="."){
_38a();
_37c=x;
}else{
if(cc==":"){
_38a();
_37b=x;
}else{
if(cc=="["){
_38a();
_378=x;
_cp={};
}else{
if(cc=="("){
if(_37b>=0){
_cp={name:ts(_37b+1,x),value:null};
_384.pseudos.push(_cp);
}
_379=x;
}else{
if((cc==" ")&&(lc!=cc)){
_38b();
}
}
}
}
}
}
}
}
}
return _377;
};
var _38e=function(_38f,_390){
if(!_38f){
return _390;
}
if(!_390){
return _38f;
}
return function(){
return _38f.apply(window,arguments)&&_390.apply(window,arguments);
};
};
var _391=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _395=function(n){
return (1==n.nodeType);
};
var _397="";
var _398=function(elem,attr){
if(!elem){
return _397;
}
if(attr=="class"){
return elem.className||_397;
}
if(attr=="for"){
return elem.htmlFor||_397;
}
if(attr=="style"){
return elem.style.cssText||_397;
}
return (_370?elem.getAttribute(attr):elem.getAttribute(attr,2))||_397;
};
var _39b={"*=":function(attr,_39d){
return function(elem){
return (_398(elem,attr).indexOf(_39d)>=0);
};
},"^=":function(attr,_3a0){
return function(elem){
return (_398(elem,attr).indexOf(_3a0)==0);
};
},"$=":function(attr,_3a3){
var tval=" "+_3a3;
return function(elem){
var ea=" "+_398(elem,attr);
return (ea.lastIndexOf(_3a3)==(ea.length-_3a3.length));
};
},"~=":function(attr,_3a8){
var tval=" "+_3a8+" ";
return function(elem){
var ea=" "+_398(elem,attr)+" ";
return (ea.indexOf(tval)>=0);
};
},"|=":function(attr,_3ad){
var _3ae=" "+_3ad+"-";
return function(elem){
var ea=" "+_398(elem,attr);
return ((ea==_3ad)||(ea.indexOf(_3ae)==0));
};
},"=":function(attr,_3b2){
return function(elem){
return (_398(elem,attr)==_3b2);
};
}};
var _3b4=(typeof _36c().firstChild.nextElementSibling=="undefined");
var _ns=!_3b4?"nextElementSibling":"nextSibling";
var _ps=!_3b4?"previousElementSibling":"previousSibling";
var _3b7=(_3b4?_395:_371);
var _3b8=function(node){
while(node=node[_ps]){
if(_3b7(node)){
return false;
}
}
return true;
};
var _3ba=function(node){
while(node=node[_ns]){
if(_3b7(node)){
return false;
}
}
return true;
};
var _3bc=function(node){
var root=node.parentNode;
var i=0,tret=root[_36e],ci=(node["_i"]||-1),cl=(root["_l"]||-1);
if(!tret){
return -1;
}
var l=tret.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
root["_l"]=l;
ci=-1;
for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_ns]){
if(_3b7(te)){
te["_i"]=++i;
if(node===te){
ci=i;
}
}
}
return ci;
};
var _3c5=function(elem){
return !((_3bc(elem))%2);
};
var _3c7=function(elem){
return ((_3bc(elem))%2);
};
var _3c9={"checked":function(name,_3cb){
return function(elem){
return !!d.attr(elem,"checked");
};
},"first-child":function(){
return _3b8;
},"last-child":function(){
return _3ba;
},"only-child":function(name,_3ce){
return function(node){
if(!_3b8(node)){
return false;
}
if(!_3ba(node)){
return false;
}
return true;
};
},"empty":function(name,_3d1){
return function(elem){
var cn=elem.childNodes;
var cnl=elem.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(name,_3d8){
var cz=_3d8.charAt(0);
if(cz=="\""||cz=="'"){
_3d8=_3d8.slice(1,-1);
}
return function(elem){
return (elem.innerHTML.indexOf(_3d8)>=0);
};
},"not":function(name,_3dc){
var p=_372(_3dc)[0];
var _3de={el:1};
if(p.tag!="*"){
_3de.tag=1;
}
if(!p.classes.length){
_3de.classes=1;
}
var ntf=_3e0(p,_3de);
return function(elem){
return (!ntf(elem));
};
},"nth-child":function(name,_3e3){
var pi=parseInt;
if(_3e3=="odd"){
return _3c7;
}else{
if(_3e3=="even"){
return _3c5;
}
}
if(_3e3.indexOf("n")!=-1){
var _3e5=_3e3.split("n",2);
var pred=_3e5[0]?((_3e5[0]=="-")?-1:pi(_3e5[0])):1;
var idx=_3e5[1]?pi(_3e5[1]):0;
var lb=0,ub=-1;
if(pred>0){
if(idx<0){
idx=(idx%pred)&&(pred+(idx%pred));
}else{
if(idx>0){
if(idx>=pred){
lb=idx-idx%pred;
}
idx=idx%pred;
}
}
}else{
if(pred<0){
pred*=-1;
if(idx>0){
ub=idx;
idx=idx%pred;
}
}
}
if(pred>0){
return function(elem){
var i=_3bc(elem);
return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);
};
}else{
_3e3=idx;
}
}
var _3ec=pi(_3e3);
return function(elem){
return (_3bc(elem)==_3ec);
};
}};
var _3ee=(d.isIE)?function(cond){
var clc=cond.toLowerCase();
if(clc=="class"){
cond="className";
}
return function(elem){
return (_370?elem.getAttribute(cond):elem[cond]||elem[clc]);
};
}:function(cond){
return function(elem){
return (elem&&elem.getAttribute&&elem.hasAttribute(cond));
};
};
var _3e0=function(_3f4,_3f5){
if(!_3f4){
return _371;
}
_3f5=_3f5||{};
var ff=null;
if(!("el" in _3f5)){
ff=_38e(ff,_395);
}
if(!("tag" in _3f5)){
if(_3f4.tag!="*"){
ff=_38e(ff,function(elem){
return (elem&&(elem.tagName==_3f4.getTag()));
});
}
}
if(!("classes" in _3f5)){
each(_3f4.classes,function(_3f8,idx,arr){
var re=new RegExp("(?:^|\\s)"+_3f8+"(?:\\s|$)");
ff=_38e(ff,function(elem){
return re.test(elem.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _3f5)){
each(_3f4.pseudos,function(_3fd){
var pn=_3fd.name;
if(_3c9[pn]){
ff=_38e(ff,_3c9[pn](pn,_3fd.value));
}
});
}
if(!("attrs" in _3f5)){
each(_3f4.attrs,function(attr){
var _400;
var a=attr.attr;
if(attr.type&&_39b[attr.type]){
_400=_39b[attr.type](a,attr.matchFor);
}else{
if(a.length){
_400=_3ee(a);
}
}
if(_400){
ff=_38e(ff,_400);
}
});
}
if(!("id" in _3f5)){
if(_3f4.id){
ff=_38e(ff,function(elem){
return (!!elem&&(elem.id==_3f4.id));
});
}
}
if(!ff){
if(!("default" in _3f5)){
ff=_371;
}
}
return ff;
};
var _403=function(_404){
return function(node,ret,bag){
while(node=node[_ns]){
if(_3b4&&(!_395(node))){
continue;
}
if((!bag||_408(node,bag))&&_404(node)){
ret.push(node);
}
break;
}
return ret;
};
};
var _409=function(_40a){
return function(root,ret,bag){
var te=root[_ns];
while(te){
if(_3b7(te)){
if(bag&&!_408(te,bag)){
break;
}
if(_40a(te)){
ret.push(te);
}
}
te=te[_ns];
}
return ret;
};
};
var _40f=function(_410){
_410=_410||_371;
return function(root,ret,bag){
var te,x=0,tret=root[_36e];
while(te=tret[x++]){
if(_3b7(te)&&(!bag||_408(te,bag))&&(_410(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _417=function(node,root){
var pn=node.parentNode;
while(pn){
if(pn==root){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _41b={};
var _41c=function(_41d){
var _41e=_41b[_41d.query];
if(_41e){
return _41e;
}
var io=_41d.infixOper;
var oper=(io?io.oper:"");
var _421=_3e0(_41d,{el:1});
var qt=_41d.tag;
var _423=("*"==qt);
var ecs=_36c()["getElementsByClassName"];
if(!oper){
if(_41d.id){
_421=(!_41d.loops&&_423)?_371:_3e0(_41d,{el:1,id:1});
_41e=function(root,arr){
var te=d.byId(_41d.id,(root.ownerDocument||root));
if(!te||!_421(te)){
return;
}
if(9==root.nodeType){
return _391(te,arr);
}else{
if(_417(te,root)){
return _391(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_41d.classes.length&&!_36d){
_421=_3e0(_41d,{el:1,classes:1,id:1});
var _428=_41d.classes.join(" ");
_41e=function(root,arr,bag){
var ret=_391(0,arr),te,x=0;
var tret=root.getElementsByClassName(_428);
while((te=tret[x++])){
if(_421(te,root)&&_408(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_423&&!_41d.loops){
_41e=function(root,arr,bag){
var ret=_391(0,arr),te,x=0;
var tret=root.getElementsByTagName(_41d.getTag());
while((te=tret[x++])){
if(_408(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_421=_3e0(_41d,{el:1,tag:1,id:1});
_41e=function(root,arr,bag){
var ret=_391(0,arr),te,x=0;
var tret=root.getElementsByTagName(_41d.getTag());
while((te=tret[x++])){
if(_421(te,root)&&_408(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _43e={el:1};
if(_423){
_43e.tag=1;
}
_421=_3e0(_41d,_43e);
if("+"==oper){
_41e=_403(_421);
}else{
if("~"==oper){
_41e=_409(_421);
}else{
if(">"==oper){
_41e=_40f(_421);
}
}
}
}
return _41b[_41d.query]=_41e;
};
var _43f=function(root,_441){
var _442=_391(root),qp,x,te,qpl=_441.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_441[i];
x=_442.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_41c(qp);
while(te=_442[x--]){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_442=ret;
}
return ret;
};
var _44b={},_44c={};
var _44d=function(_44e){
var _44f=_372(trim(_44e));
if(_44f.length==1){
var tef=_41c(_44f[0]);
return function(root){
var r=tef(root,new qlc());
if(r){
r.nozip=true;
}
return r;
};
}
return function(root){
return _43f(root,_44f);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _456=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _457=d.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _459=(!!_36c()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_456));
var _45a=function(_45b,_45c){
if(_459){
var _45d=_44c[_45b];
if(_45d&&!_45c){
return _45d;
}
}
var _45e=_44b[_45b];
if(_45e){
return _45e;
}
var qcz=_45b.charAt(0);
var _460=(-1==_45b.indexOf(" "));
if((_45b.indexOf("#")>=0)&&(_460)){
_45c=true;
}
var _461=(_459&&(!_45c)&&(_36f.indexOf(qcz)==-1)&&(!d.isIE||(_45b.indexOf(":")==-1))&&(!(_36d&&(_45b.indexOf(".")>=0)))&&(_45b.indexOf(":contains")==-1)&&(_45b.indexOf("|=")==-1));
if(_461){
var tq=(_36f.indexOf(_45b.charAt(_45b.length-1))>=0)?(_45b+" *"):_45b;
return _44c[_45b]=function(root){
try{
if(!((9==root.nodeType)||_460)){
throw "";
}
var r=root[qsa](tq);
r[_457]=true;
return r;
}
catch(e){
return _45a(_45b,true)(root);
}
};
}else{
var _465=_45b.split(/\s*,\s*/);
return _44b[_45b]=((_465.length<2)?_44d(_45b):function(root){
var _467=0,ret=[],tp;
while((tp=_465[_467++])){
ret=ret.concat(_44d(tp)(root));
}
return ret;
});
}
};
var _46a=0;
var _46b=d.isIE?function(node){
if(_370){
return (node.getAttribute("_uid")||node.setAttribute("_uid",++_46a)||_46a);
}else{
return node.uniqueID;
}
}:function(node){
return (node._uid||(node._uid=++_46a));
};
var _408=function(node,bag){
if(!bag){
return 1;
}
var id=_46b(node);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _471="_zipIdx";
var _zip=function(arr){
if(arr&&arr.nozip){
return (qlc._wrap)?qlc._wrap(arr):arr;
}
var ret=new qlc();
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_46a++;
if(d.isIE&&_370){
var _475=_46a+"";
arr[0].setAttribute(_471,_475);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_471)!=_475){
ret.push(te);
}
te.setAttribute(_471,_475);
}
}else{
if(d.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_395(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_471]=_46a;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_471]!=_46a){
ret.push(te);
}
te[_471]=_46a;
}
}
}
return ret;
};
d.query=function(_478,root){
qlc=d._queryListCtor;
if(!_478){
return new qlc();
}
if(_478.constructor==qlc){
return _478;
}
if(!_36b(_478)){
return new qlc(_478);
}
if(_36b(root)){
root=d.byId(root);
if(!root){
return new qlc();
}
}
root=root||_36c();
var od=root.ownerDocument||root.documentElement;
_370=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));
var r=_45a(_478)(root);
if(r&&r.nozip&&!qlc._wrap){
return r;
}
return _zip(r);
};
d.query.pseudos=_3c9;
d._filterQueryResult=function(_47c,_47d){
var _47e=new d._queryListCtor();
var _47f=_3e0(_372(_47d)[0]);
for(var x=0,te;te=_47c[x];x++){
if(_47f(te)){
_47e.push(te);
}
}
return _47e;
};
})(this["queryPortability"]||this["acme"]||dojo);
}
if(!dojo._hasResource["dojo._base.xhr"]){
dojo._hasResource["dojo._base.xhr"]=true;
dojo.provide("dojo._base.xhr");
(function(){
var _d=dojo;
function _483(obj,name,_486){
var val=obj[name];
if(_d.isString(val)){
obj[name]=[val,_486];
}else{
if(_d.isArray(val)){
val.push(_486);
}else{
obj[name]=_486;
}
}
};
dojo.formToObject=function(_488){
var ret={};
var _48a="file|submit|image|reset|button|";
_d.forEach(dojo.byId(_488).elements,function(item){
var _in=item.name;
var type=(item.type||"").toLowerCase();
if(_in&&type&&_48a.indexOf(type)==-1&&!item.disabled){
if(type=="radio"||type=="checkbox"){
if(item.checked){
_483(ret,_in,item.value);
}
}else{
if(item.multiple){
ret[_in]=[];
_d.query("option",item).forEach(function(opt){
if(opt.selected){
_483(ret,_in,opt.value);
}
});
}else{
_483(ret,_in,item.value);
if(type=="image"){
ret[_in+".x"]=ret[_in+".y"]=ret[_in].x=ret[_in].y=0;
}
}
}
}
});
return ret;
};
dojo.objectToQuery=function(map){
var enc=encodeURIComponent;
var _491=[];
var _492={};
for(var name in map){
var _494=map[name];
if(_494!=_492[name]){
var _495=enc(name)+"=";
if(_d.isArray(_494)){
for(var i=0;i<_494.length;i++){
_491.push(_495+enc(_494[i]));
}
}else{
_491.push(_495+enc(_494));
}
}
}
return _491.join("&");
};
dojo.formToQuery=function(_497){
return _d.objectToQuery(_d.formToObject(_497));
};
dojo.formToJson=function(_498,_499){
return _d.toJson(_d.formToObject(_498),_499);
};
dojo.queryToObject=function(str){
var ret={};
var qp=str.split("&");
var dec=decodeURIComponent;
_d.forEach(qp,function(item){
if(item.length){
var _49f=item.split("=");
var name=dec(_49f.shift());
var val=dec(_49f.join("="));
if(_d.isString(ret[name])){
ret[name]=[ret[name]];
}
if(_d.isArray(ret[name])){
ret[name].push(val);
}else{
ret[name]=val;
}
}
});
return ret;
};
dojo._blockAsync=false;
dojo._contentHandlers={text:function(xhr){
return xhr.responseText;
},json:function(xhr){
return _d.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!dojo.config.useCommentedJson){
console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");
}
var _4a5=xhr.responseText;
var _4a6=_4a5.indexOf("/*");
var _4a7=_4a5.lastIndexOf("*/");
if(_4a6==-1||_4a7==-1){
throw new Error("JSON was not comment filtered");
}
return _d.fromJson(_4a5.substring(_4a6+2,_4a7));
},javascript:function(xhr){
return _d.eval(xhr.responseText);
},xml:function(xhr){
var _4aa=xhr.responseXML;
if(_d.isIE&&(!_4aa||!_4aa.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_d.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_4aa=dom;
}
catch(e){
return false;
}
return true;
});
}
return _4aa;
}};
dojo._contentHandlers["json-comment-optional"]=function(xhr){
var _4b1=_d._contentHandlers;
if(xhr.responseText&&xhr.responseText.indexOf("/*")!=-1){
return _4b1["json-comment-filtered"](xhr);
}else{
return _4b1["json"](xhr);
}
};
dojo._ioSetArgs=function(args,_4b3,_4b4,_4b5){
var _4b6={args:args,url:args.url};
var _4b7=null;
if(args.form){
var form=_d.byId(args.form);
var _4b9=form.getAttributeNode("action");
_4b6.url=_4b6.url||(_4b9?_4b9.value:null);
_4b7=_d.formToObject(form);
}
var _4ba=[{}];
if(_4b7){
_4ba.push(_4b7);
}
if(args.content){
_4ba.push(args.content);
}
if(args.preventCache){
_4ba.push({"dojo.preventCache":new Date().valueOf()});
}
_4b6.query=_d.objectToQuery(_d.mixin.apply(null,_4ba));
_4b6.handleAs=args.handleAs||"text";
var d=new _d.Deferred(_4b3);
d.addCallbacks(_4b4,function(_4bc){
return _4b5(_4bc,d);
});
var ld=args.load;
if(ld&&_d.isFunction(ld)){
d.addCallback(function(_4be){
return ld.call(args,_4be,_4b6);
});
}
var err=args.error;
if(err&&_d.isFunction(err)){
d.addErrback(function(_4c0){
return err.call(args,_4c0,_4b6);
});
}
var _4c1=args.handle;
if(_4c1&&_d.isFunction(_4c1)){
d.addBoth(function(_4c2){
return _4c1.call(args,_4c2,_4b6);
});
}
d.ioArgs=_4b6;
return d;
};
var _4c3=function(dfd){
dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _at=typeof xhr.abort;
if(_at=="function"||_at=="object"||_at=="unknown"){
xhr.abort();
}
var err=dfd.ioArgs.error;
if(!err){
err=new Error("xhr cancelled");
err.dojoType="cancel";
}
return err;
};
var _4c8=function(dfd){
var ret=_d._contentHandlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _4cb=function(_4cc,dfd){
console.error(_4cc);
return _4cc;
};
var _4ce=null;
var _4cf=[];
var _4d0=function(){
var now=(new Date()).getTime();
if(!_d._blockAsync){
for(var i=0,tif;i<_4cf.length&&(tif=_4cf[i]);i++){
var dfd=tif.dfd;
var func=function(){
if(!dfd||dfd.canceled||!tif.validCheck(dfd)){
_4cf.splice(i--,1);
}else{
if(tif.ioCheck(dfd)){
_4cf.splice(i--,1);
tif.resHandle(dfd);
}else{
if(dfd.startTime){
if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){
_4cf.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel();
}
}
}
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(e){
dfd.errback(e);
}
}
}
}
if(!_4cf.length){
clearInterval(_4ce);
_4ce=null;
return;
}
};
dojo._ioCancelAll=function(){
try{
_d.forEach(_4cf,function(i){
try{
i.dfd.cancel();
}
catch(e){
}
});
}
catch(e){
}
};
if(_d.isIE){
_d.addOnWindowUnload(_d._ioCancelAll);
}
_d._ioWatch=function(dfd,_4d9,_4da,_4db){
var args=dfd.ioArgs.args;
if(args.timeout){
dfd.startTime=(new Date()).getTime();
}
_4cf.push({dfd:dfd,validCheck:_4d9,ioCheck:_4da,resHandle:_4db});
if(!_4ce){
_4ce=setInterval(_4d0,50);
}
if(args.sync){
_4d0();
}
};
var _4dd="application/x-www-form-urlencoded";
var _4de=function(dfd){
return dfd.ioArgs.xhr.readyState;
};
var _4e0=function(dfd){
return 4==dfd.ioArgs.xhr.readyState;
};
var _4e2=function(dfd){
var xhr=dfd.ioArgs.xhr;
if(_d._isDocumentOk(xhr)){
dfd.callback(dfd);
}else{
var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);
err.status=xhr.status;
err.responseText=xhr.responseText;
dfd.errback(err);
}
};
dojo._ioAddQueryToUrl=function(_4e6){
if(_4e6.query.length){
_4e6.url+=(_4e6.url.indexOf("?")==-1?"?":"&")+_4e6.query;
_4e6.query=null;
}
};
dojo.xhr=function(_4e7,args,_4e9){
var dfd=_d._ioSetArgs(args,_4c3,_4c8,_4cb);
dfd.ioArgs.xhr=_d._xhrObj(dfd.ioArgs.args);
if(_4e9){
if("postData" in args){
dfd.ioArgs.query=args.postData;
}else{
if("putData" in args){
dfd.ioArgs.query=args.putData;
}
}
}else{
_d._ioAddQueryToUrl(dfd.ioArgs);
}
var _4eb=dfd.ioArgs;
var xhr=_4eb.xhr;
xhr.open(_4e7,_4eb.url,args.sync!==true,args.user||undefined,args.password||undefined);
if(args.headers){
for(var hdr in args.headers){
if(hdr.toLowerCase()==="content-type"&&!args.contentType){
args.contentType=args.headers[hdr];
}else{
xhr.setRequestHeader(hdr,args.headers[hdr]);
}
}
}
xhr.setRequestHeader("Content-Type",args.contentType||_4dd);
if(!args.headers||!args.headers["X-Requested-With"]){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(dojo.config.debugAtAllCosts){
xhr.send(_4eb.query);
}else{
try{
xhr.send(_4eb.query);
}
catch(e){
dfd.ioArgs.error=e;
dfd.cancel();
}
}
_d._ioWatch(dfd,_4de,_4e0,_4e2);
xhr=null;
return dfd;
};
dojo.xhrGet=function(args){
return _d.xhr("GET",args);
};
dojo.rawXhrPost=dojo.xhrPost=function(args){
return _d.xhr("POST",args,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(args){
return _d.xhr("PUT",args,true);
};
dojo.xhrDelete=function(args){
return _d.xhr("DELETE",args);
};
})();
}
if(!dojo._hasResource["dojo._base.fx"]){
dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
(function(){
var d=dojo;
var _4f3=d.mixin;
dojo._Line=function(_4f4,end){
this.start=_4f4;
this.end=end;
};
dojo._Line.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
d.declare("dojo._Animation",null,{constructor:function(args){
_4f3(this,args);
if(d.isArray(this.curve)){
this.curve=new d._Line(this.curve[0],this.curve[1]);
}
},duration:350,repeat:0,rate:10,_percent:0,_startRepeatCount:0,_fire:function(evt,args){
if(this[evt]){
if(dojo.config.debugAtAllCosts){
this[evt].apply(this,args||[]);
}else{
try{
this[evt].apply(this,args||[]);
}
catch(e){
console.error("exception in animation handler for:",evt);
console.error(e);
}
}
}
return this;
},play:function(_4fa,_4fb){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
if(_4fb){
_t._stopTimer();
_t._active=_t._paused=false;
_t._percent=0;
}else{
if(_t._active&&!_t._paused){
return _t;
}
}
_t._fire("beforeBegin");
var de=_4fa||_t.delay,_p=dojo.hitch(_t,"_play",_4fb);
if(de>0){
_t._delayTimer=setTimeout(_p,de);
return _t;
}
_p();
return _t;
},_play:function(_4ff){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
_t._startTime=new Date().valueOf();
if(_t._paused){
_t._startTime-=_t.duration*_t._percent;
}
_t._endTime=_t._startTime+_t.duration;
_t._active=true;
_t._paused=false;
var _501=_t.curve.getValue(_t._percent);
if(!_t._percent){
if(!_t._startRepeatCount){
_t._startRepeatCount=_t.repeat;
}
_t._fire("onBegin",[_501]);
}
_t._fire("onPlay",[_501]);
_t._cycle();
return _t;
},pause:function(){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
_t._stopTimer();
if(!_t._active){
return _t;
}
_t._paused=true;
_t._fire("onPause",[_t.curve.getValue(_t._percent)]);
return _t;
},gotoPercent:function(_503,_504){
var _t=this;
_t._stopTimer();
_t._active=_t._paused=true;
_t._percent=_503;
if(_504){
_t.play();
}
return _t;
},stop:function(_506){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
if(!_t._timer){
return _t;
}
_t._stopTimer();
if(_506){
_t._percent=1;
}
_t._fire("onStop",[_t.curve.getValue(_t._percent)]);
_t._active=_t._paused=false;
return _t;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _t=this;
if(_t._active){
var curr=new Date().valueOf();
var step=(curr-_t._startTime)/(_t._endTime-_t._startTime);
if(step>=1){
step=1;
}
_t._percent=step;
if(_t.easing){
step=_t.easing(step);
}
_t._fire("onAnimate",[_t.curve.getValue(step)]);
if(_t._percent<1){
_t._startTimer();
}else{
_t._active=false;
if(_t.repeat>0){
_t.repeat--;
_t.play(null,true);
}else{
if(_t.repeat==-1){
_t.play(null,true);
}else{
if(_t._startRepeatCount){
_t.repeat=_t._startRepeatCount;
_t._startRepeatCount=0;
}
}
}
_t._percent=0;
_t._fire("onEnd");
_t._stopTimer();
}
}
return _t;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_50c=[],_50d=null,_50e={run:function(){
}};
dojo._Animation.prototype._startTimer=function(){
if(!this._timer){
this._timer=d.connect(_50e,"run",this,"_cycle");
ctr++;
}
if(!_50d){
_50d=setInterval(d.hitch(_50e,"run"),this.rate);
}
};
dojo._Animation.prototype._stopTimer=function(){
if(this._timer){
d.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_50d);
_50d=null;
ctr=0;
}
};
var _50f=d.isIE?function(node){
var ns=node.style;
if(!ns.width.length&&d.style(node,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
dojo._fade=function(args){
args.node=d.byId(args.node);
var _513=_4f3({properties:{}},args),_514=(_513.properties.opacity={});
_514.start=!("start" in _513)?function(){
return +d.style(_513.node,"opacity")||0;
}:_513.start;
_514.end=_513.end;
var anim=d.animateProperty(_513);
d.connect(anim,"beforeBegin",d.partial(_50f,_513.node));
return anim;
};
dojo.fadeIn=function(args){
return d._fade(_4f3({end:1},args));
};
dojo.fadeOut=function(args){
return d._fade(_4f3({end:0},args));
};
dojo._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _519=function(_51a){
this._properties=_51a;
for(var p in _51a){
var prop=_51a[p];
if(prop.start instanceof d.Color){
prop.tempColor=new d.Color();
}
}
};
_519.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var prop=this._properties[p],_521=prop.start;
if(_521 instanceof d.Color){
ret[p]=d.blendColors(_521,prop.end,r,prop.tempColor).toCss();
}else{
if(!d.isArray(_521)){
ret[p]=((prop.end-_521)*r)+_521+(p!="opacity"?prop.units||"px":0);
}
}
}
return ret;
};
dojo.animateProperty=function(args){
args.node=d.byId(args.node);
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d._Animation(args);
d.connect(anim,"beforeBegin",anim,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var prop=this.properties[p];
prop=pm[p]=_4f3({},(d.isObject(prop)?prop:{end:prop}));
if(d.isFunction(prop.start)){
prop.start=prop.start();
}
if(d.isFunction(prop.end)){
prop.end=prop.end();
}
var _527=(p.toLowerCase().indexOf("color")>=0);
function _528(node,p){
var v={height:node.offsetHeight,width:node.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=d.style(node,p);
return (p=="opacity")?+v:(_527?v:parseFloat(v));
};
if(!("end" in prop)){
prop.end=_528(this.node,p);
}else{
if(!("start" in prop)){
prop.start=_528(this.node,p);
}
}
if(_527){
prop.start=new d.Color(prop.start);
prop.end=new d.Color(prop.end);
}else{
prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);
}
}
this.curve=new _519(pm);
});
d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));
return anim;
};
dojo.anim=function(node,_52d,_52e,_52f,_530,_531){
return d.animateProperty({node:node,duration:_52e||d._Animation.prototype.duration,properties:_52d,easing:_52f,onEnd:_530}).play(_531||0);
};
})();
}
if(!dojo._hasResource["dojo._base.browser"]){
dojo._hasResource["dojo._base.browser"]=true;
dojo.provide("dojo._base.browser");
dojo.forEach(dojo.config.require,function(i){
dojo["require"](i);
});
}
if(dojo.config.afterOnLoad&&dojo.isBrowser){
window.setTimeout(dojo._loadInit,1000);
}
})();
/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(!dojo._hasResource["dojo.back"]){
dojo._hasResource["dojo.back"]=true;
dojo.provide("dojo.back");
(function(){
var _1=dojo.back;
function _2(){
var h=window.location.hash;
if(h.charAt(0)=="#"){
h=h.substring(1);
}
return dojo.isMozilla?h:decodeURIComponent(h);
};
function _4(h){
if(!h){
h="";
}
window.location.hash=encodeURIComponent(h);
_6=history.length;
};
if(dojo.exists("tests.back-hash")){
_1.getHash=_2;
_1.setHash=_4;
}
var _7=(typeof (window)!=="undefined")?window.location.href:"";
var _8=(typeof (window)!=="undefined")?_2():"";
var _9=null;
var _a=null;
var _b=null;
var _c=null;
var _d=[];
var _e=[];
var _f=false;
var _10=false;
var _6;
function _11(){
var _12=_e.pop();
if(!_12){
return;
}
var _13=_e[_e.length-1];
if(!_13&&_e.length==0){
_13=_9;
}
if(_13){
if(_13.kwArgs["back"]){
_13.kwArgs["back"]();
}else{
if(_13.kwArgs["backButton"]){
_13.kwArgs["backButton"]();
}else{
if(_13.kwArgs["handle"]){
_13.kwArgs.handle("back");
}
}
}
}
_d.push(_12);
};
_1.goBack=_11;
function _14(){
var _15=_d.pop();
if(!_15){
return;
}
if(_15.kwArgs["forward"]){
_15.kwArgs.forward();
}else{
if(_15.kwArgs["forwardButton"]){
_15.kwArgs.forwardButton();
}else{
if(_15.kwArgs["handle"]){
_15.kwArgs.handle("forward");
}
}
}
_e.push(_15);
};
_1.goForward=_14;
function _16(url,_18,_19){
return {"url":url,"kwArgs":_18,"urlHash":_19};
};
function _1a(url){
var _1c=url.split("?");
if(_1c.length<2){
return null;
}else{
return _1c[1];
}
};
function _1d(){
var url=(dojo.config["dojoIframeHistoryUrl"]||dojo.moduleUrl("dojo","resources/iframe_history.html"))+"?"+(new Date()).getTime();
_f=true;
if(_c){
dojo.isWebKit?_c.location=url:window.frames[_c.name].location=url;
}else{
}
return url;
};
function _1f(){
if(!_10){
var hsl=_e.length;
var _21=_2();
if((_21===_8||window.location.href==_7)&&(hsl==1)){
_11();
return;
}
if(_d.length>0){
if(_d[_d.length-1].urlHash===_21){
_14();
return;
}
}
if((hsl>=2)&&(_e[hsl-2])){
if(_e[hsl-2].urlHash===_21){
_11();
return;
}
}
if(dojo.isSafari&&dojo.isSafari<3){
var _22=history.length;
if(_22>_6){
_14();
}else{
if(_22<_6){
_11();
}
}
_6=_22;
}
}
};
_1.init=function(){
if(dojo.byId("dj_history")){
return;
}
var src=dojo.config["dojoIframeHistoryUrl"]||dojo.moduleUrl("dojo","resources/iframe_history.html");
document.write("<iframe style=\"border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;\" name=\"dj_history\" id=\"dj_history\" src=\""+src+"\"></iframe>");
};
_1.setInitialState=function(_24){
_9=_16(_7,_24,_8);
};
_1.addToHistory=function(_25){
_d=[];
var _26=null;
var url=null;
if(!_c){
if(dojo.config["useXDomain"]&&!dojo.config["dojoIframeHistoryUrl"]){
console.warn("dojo.back: When using cross-domain Dojo builds,"+" please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"+" to the path on your domain to iframe_history.html");
}
_c=window.frames["dj_history"];
}
if(!_b){
_b=dojo.create("a",{style:{display:"none"}},dojo.body());
}
if(_25["changeUrl"]){
_26=""+((_25["changeUrl"]!==true)?_25["changeUrl"]:(new Date()).getTime());
if(_e.length==0&&_9.urlHash==_26){
_9=_16(url,_25,_26);
return;
}else{
if(_e.length>0&&_e[_e.length-1].urlHash==_26){
_e[_e.length-1]=_16(url,_25,_26);
return;
}
}
_10=true;
setTimeout(function(){
_4(_26);
_10=false;
},1);
_b.href=_26;
if(dojo.isIE){
url=_1d();
var _28=_25["back"]||_25["backButton"]||_25["handle"];
var tcb=function(_2a){
if(_2()!=""){
setTimeout(function(){
_4(_26);
},1);
}
_28.apply(this,[_2a]);
};
if(_25["back"]){
_25.back=tcb;
}else{
if(_25["backButton"]){
_25.backButton=tcb;
}else{
if(_25["handle"]){
_25.handle=tcb;
}
}
}
var _2b=_25["forward"]||_25["forwardButton"]||_25["handle"];
var tfw=function(_2d){
if(_2()!=""){
_4(_26);
}
if(_2b){
_2b.apply(this,[_2d]);
}
};
if(_25["forward"]){
_25.forward=tfw;
}else{
if(_25["forwardButton"]){
_25.forwardButton=tfw;
}else{
if(_25["handle"]){
_25.handle=tfw;
}
}
}
}else{
if(!dojo.isIE){
if(!_a){
_a=setInterval(_1f,200);
}
}
}
}else{
url=_1d();
}
_e.push(_16(url,_25,_26));
};
_1._iframeLoaded=function(evt,_2f){
var _30=_1a(_2f.href);
if(_30==null){
if(_e.length==1){
_11();
}
return;
}
if(_f){
_f=false;
return;
}
if(_e.length>=2&&_30==_1a(_e[_e.length-2].url)){
_11();
}else{
if(_d.length>0&&_30==_1a(_d[_d.length-1].url)){
_14();
}
}
};
})();
}
if(!dojo._hasResource["dojo.regexp"]){
dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(str,_32){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_32&&_32.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_36){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_36);
};
dojo.regexp.group=function(_39,_3a){
return "("+(_3a?"?:":"")+_39+")";
};
}
if(!dojo._hasResource["dojo.cookie"]){
dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(_3b,_3c,_3d){
var c=document.cookie;
if(arguments.length==1){
var _3f=c.match(new RegExp("(?:^|; )"+dojo.regexp.escapeString(_3b)+"=([^;]*)"));
return _3f?decodeURIComponent(_3f[1]):undefined;
}else{
_3d=_3d||{};
var exp=_3d.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_3d.expires=d;
}
if(exp&&exp.toUTCString){
_3d.expires=exp.toUTCString();
}
_3c=encodeURIComponent(_3c);
var _42=_3b+"="+_3c,_43;
for(_43 in _3d){
_42+="; "+_43;
var _44=_3d[_43];
if(_44!==true){
_42+="="+_44;
}
}
document.cookie=_42;
}
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
}
if(!dojo._hasResource["dijit._base.focus"]){
dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
var _45=dojo.doc;
if(_45.selection){
var s=_45.selection;
if(s.type=="Text"){
return !s.createRange().htmlText.length;
}else{
return !s.createRange().length;
}
}else{
var _47=dojo.global;
var _48=_47.getSelection();
if(dojo.isString(_48)){
return !_48;
}else{
return !_48||_48.isCollapsed||!_48.toString();
}
}
},getBookmark:function(){
var _49,_4a=dojo.doc.selection;
if(_4a){
var _4b=_4a.createRange();
if(_4a.type.toUpperCase()=="CONTROL"){
if(_4b.length){
_49=[];
var i=0,len=_4b.length;
while(i<len){
_49.push(_4b.item(i++));
}
}else{
_49=null;
}
}else{
_49=_4b.getBookmark();
}
}else{
if(window.getSelection){
_4a=dojo.global.getSelection();
if(_4a){
_4b=_4a.getRangeAt(0);
_49=_4b.cloneRange();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return _49;
},moveToBookmark:function(_4e){
var _4f=dojo.doc;
if(_4f.selection){
var _50;
if(dojo.isArray(_4e)){
_50=_4f.body.createControlRange();
dojo.forEach(_4e,function(n){
_50.addElement(n);
});
}else{
_50=_4f.selection.createRange();
_50.moveToBookmark(_4e);
}
_50.select();
}else{
var _52=dojo.global.getSelection&&dojo.global.getSelection();
if(_52&&_52.removeAllRanges){
_52.removeAllRanges();
_52.addRange(_4e);
}else{
console.warn("No idea how to restore selection for this browser!");
}
}
},getFocus:function(_53,_54){
return {node:_53&&dojo.isDescendant(dijit._curFocus,_53.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(_54||dojo.global,dijit.isCollapsed)?dojo.withGlobal(_54||dojo.global,dijit.getBookmark):null,openedForWindow:_54};
},focus:function(_55){
if(!_55){
return;
}
var _56="node" in _55?_55.node:_55,_57=_55.bookmark,_58=_55.openedForWindow;
if(_56){
var _59=(_56.tagName.toLowerCase()=="iframe")?_56.contentWindow:_56;
if(_59&&_59.focus){
try{
_59.focus();
}
catch(e){
}
}
dijit._onFocusNode(_56);
}
if(_57&&dojo.withGlobal(_58||dojo.global,dijit.isCollapsed)){
if(_58){
_58.focus();
}
try{
dojo.withGlobal(_58||dojo.global,dijit.moveToBookmark,null,[_57]);
}
catch(e){
}
}
},_activeStack:[],registerIframe:function(_5a){
dijit.registerWin(_5a.contentWindow,_5a);
},registerWin:function(_5b,_5c){
dojo.connect(_5b.document,"onmousedown",function(evt){
dijit._justMouseDowned=true;
setTimeout(function(){
dijit._justMouseDowned=false;
},0);
dijit._onTouchNode(_5c||evt.target||evt.srcElement);
});
var doc=_5b.document;
if(doc){
if(dojo.isIE){
doc.attachEvent("onactivate",function(evt){
if(evt.srcElement.tagName.toLowerCase()!="#document"){
dijit._onFocusNode(_5c||evt.srcElement);
}
});
doc.attachEvent("ondeactivate",function(evt){
dijit._onBlurNode(_5c||evt.srcElement);
});
}else{
doc.addEventListener("focus",function(evt){
dijit._onFocusNode(_5c||evt.target);
},true);
doc.addEventListener("blur",function(evt){
dijit._onBlurNode(_5c||evt.target);
},true);
}
}
doc=null;
},_onBlurNode:function(_63){
dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
if(dijit._justMouseDowned){
return;
}
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
}
dijit._clearActiveWidgetsTimer=setTimeout(function(){
delete dijit._clearActiveWidgetsTimer;
dijit._setStack([]);
dijit._prevFocus=null;
},100);
},_onTouchNode:function(_64){
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer;
}
var _65=[];
try{
while(_64){
if(_64.dijitPopupParent){
_64=dijit.byId(_64.dijitPopupParent).domNode;
}else{
if(_64.tagName&&_64.tagName.toLowerCase()=="body"){
if(_64===dojo.body()){
break;
}
_64=dijit.getDocumentWindow(_64.ownerDocument).frameElement;
}else{
var id=_64.getAttribute&&_64.getAttribute("widgetId");
if(id){
_65.unshift(id);
}
_64=_64.parentNode;
}
}
}
}
catch(e){
}
dijit._setStack(_65);
},_onFocusNode:function(_67){
if(!_67){
return;
}
if(_67.nodeType==9){
return;
}
dijit._onTouchNode(_67);
if(_67==dijit._curFocus){
return;
}
if(dijit._curFocus){
dijit._prevFocus=dijit._curFocus;
}
dijit._curFocus=_67;
dojo.publish("focusNode",[_67]);
},_setStack:function(_68){
var _69=dijit._activeStack;
dijit._activeStack=_68;
for(var _6a=0;_6a<Math.min(_69.length,_68.length);_6a++){
if(_69[_6a]!=_68[_6a]){
break;
}
}
for(var i=_69.length-1;i>=_6a;i--){
var _6c=dijit.byId(_69[i]);
if(_6c){
_6c._focused=false;
_6c._hasBeenBlurred=true;
if(_6c._onBlur){
_6c._onBlur();
}
if(_6c._setStateClass){
_6c._setStateClass();
}
dojo.publish("widgetBlur",[_6c]);
}
}
for(i=_6a;i<_68.length;i++){
_6c=dijit.byId(_68[i]);
if(_6c){
_6c._focused=true;
if(_6c._onFocus){
_6c._onFocus();
}
if(_6c._setStateClass){
_6c._setStateClass();
}
dojo.publish("widgetFocus",[_6c]);
}
}
}});
dojo.addOnLoad(function(){
dijit.registerWin(window);
});
}
if(!dojo._hasResource["dijit._base.manager"]){
dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
},add:function(_6d){
if(this._hash[_6d.id]){
throw new Error("Tried to register widget with id=="+_6d.id+" but that id is already registered");
}
this._hash[_6d.id]=_6d;
},remove:function(id){
delete this._hash[id];
},forEach:function(_6f){
for(var id in this._hash){
_6f(this._hash[id]);
}
},filter:function(_71){
var res=new dijit.WidgetSet();
this.forEach(function(_73){
if(_71(_73)){
res.add(_73);
}
});
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
return this.filter(function(_76){
return _76.declaredClass==cls;
});
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(_77){
var id;
do{
id=_77+"_"+(_77 in dijit._widgetTypeCtr?++dijit._widgetTypeCtr[_77]:dijit._widgetTypeCtr[_77]=0);
}while(dijit.byId(id));
return id;
};
dijit.findWidgets=function(_79){
var _7a=[];
function _7b(_7c){
var _7d=dojo.isIE?_7c.children:_7c.childNodes,i=0,_7f;
while(_7f=_7d[i++]){
if(_7f.nodeType!=1){
continue;
}
var _80=_7f.getAttribute("widgetId");
if(_80){
var _81=dijit.byId(_80);
_7a.push(_81);
}else{
_7b(_7f);
}
}
};
_7b(_79);
return _7a;
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dojo.forEach(dijit.findWidgets(dojo.body()),function(_82){
if(_82.destroyRecursive){
_82.destroyRecursive();
}else{
if(_82.destroy){
_82.destroy();
}
}
});
});
}
dijit.byId=function(id){
return (dojo.isString(id))?dijit.registry.byId(id):id;
};
dijit.byNode=function(_84){
return dijit.registry.byId(_84.getAttribute("widgetId"));
};
dijit.getEnclosingWidget=function(_85){
while(_85){
if(_85.getAttribute&&_85.getAttribute("widgetId")){
return dijit.registry.byId(_85.getAttribute("widgetId"));
}
_85=_85.parentNode;
}
return null;
};
dijit._tabElements={area:true,button:true,input:true,object:true,select:true,textarea:true};
dijit._isElementShown=function(_86){
var _87=dojo.style(_86);
return (_87.visibility!="hidden")&&(_87.visibility!="collapsed")&&(_87.display!="none")&&(dojo.attr(_86,"type")!="hidden");
};
dijit.isTabNavigable=function(_88){
if(dojo.hasAttr(_88,"disabled")){
return false;
}
var _89=dojo.hasAttr(_88,"tabindex");
var _8a=dojo.attr(_88,"tabindex");
if(_89&&_8a>=0){
return true;
}
var _8b=_88.nodeName.toLowerCase();
if(((_8b=="a"&&dojo.hasAttr(_88,"href"))||dijit._tabElements[_8b])&&(!_89||_8a>=0)){
return true;
}
return false;
};
dijit._getTabNavigable=function(_8c){
var _8d,_8e,_8f,_90,_91,_92;
var _93=function(_94){
dojo.query("> *",_94).forEach(function(_95){
var _96=dijit._isElementShown(_95);
if(_96&&dijit.isTabNavigable(_95)){
var _97=dojo.attr(_95,"tabindex");
if(!dojo.hasAttr(_95,"tabindex")||_97==0){
if(!_8d){
_8d=_95;
}
_8e=_95;
}else{
if(_97>0){
if(!_8f||_97<_90){
_90=_97;
_8f=_95;
}
if(!_91||_97>=_92){
_92=_97;
_91=_95;
}
}
}
}
if(_96&&_95.nodeName.toUpperCase()!="SELECT"){
_93(_95);
}
});
};
if(dijit._isElementShown(_8c)){
_93(_8c);
}
return {first:_8d,last:_8e,lowest:_8f,highest:_91};
};
dijit.getFirstInTabbingOrder=function(_98){
var _99=dijit._getTabNavigable(dojo.byId(_98));
return _99.lowest?_99.lowest:_99.first;
};
dijit.getLastInTabbingOrder=function(_9a){
var _9b=dijit._getTabNavigable(dojo.byId(_9a));
return _9b.last?_9b.last:_9b.highest;
};
dijit.defaultDuration=dojo.config["defaultDuration"]||200;
}
if(!dojo._hasResource["dojo.AdapterRegistry"]){
dojo._hasResource["dojo.AdapterRegistry"]=true;
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_9c){
this.pairs=[];
this.returnWrappers=_9c||false;
};
dojo.extend(dojo.AdapterRegistry,{register:function(_9d,_9e,_9f,_a0,_a1){
this.pairs[((_a1)?"unshift":"push")]([_9d,_9e,_9f,_a0]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var _a3=this.pairs[i];
if(_a3[1].apply(this,arguments)){
if((_a3[3])||(this.returnWrappers)){
return _a3[2];
}else{
return _a3[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(_a4){
for(var i=0;i<this.pairs.length;i++){
var _a6=this.pairs[i];
if(_a6[0]==_a4){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
}
if(!dojo._hasResource["dijit._base.place"]){
dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){
var _a7=(dojo.doc.compatMode=="BackCompat")?dojo.body():dojo.doc.documentElement;
var _a8=dojo._docScroll();
return {w:_a7.clientWidth,h:_a7.clientHeight,l:_a8.x,t:_a8.y};
};
dijit.placeOnScreen=function(_a9,pos,_ab,_ac){
var _ad=dojo.map(_ab,function(_ae){
var c={corner:_ae,pos:{x:pos.x,y:pos.y}};
if(_ac){
c.pos.x+=_ae.charAt(1)=="L"?_ac.x:-_ac.x;
c.pos.y+=_ae.charAt(0)=="T"?_ac.y:-_ac.y;
}
return c;
});
return dijit._place(_a9,_ad);
};
dijit._place=function(_b0,_b1,_b2){
var _b3=dijit.getViewport();
if(!_b0.parentNode||String(_b0.parentNode.tagName).toLowerCase()!="body"){
dojo.body().appendChild(_b0);
}
var _b4=null;
dojo.some(_b1,function(_b5){
var _b6=_b5.corner;
var pos=_b5.pos;
if(_b2){
_b2(_b0,_b5.aroundCorner,_b6);
}
var _b8=_b0.style;
var _b9=_b8.display;
var _ba=_b8.visibility;
_b8.visibility="hidden";
_b8.display="";
var mb=dojo.marginBox(_b0);
_b8.display=_b9;
_b8.visibility=_ba;
var _bc=(_b6.charAt(1)=="L"?pos.x:Math.max(_b3.l,pos.x-mb.w)),_bd=(_b6.charAt(0)=="T"?pos.y:Math.max(_b3.t,pos.y-mb.h)),_be=(_b6.charAt(1)=="L"?Math.min(_b3.l+_b3.w,_bc+mb.w):pos.x),_bf=(_b6.charAt(0)=="T"?Math.min(_b3.t+_b3.h,_bd+mb.h):pos.y),_c0=_be-_bc,_c1=_bf-_bd,_c2=(mb.w-_c0)+(mb.h-_c1);
if(_b4==null||_c2<_b4.overflow){
_b4={corner:_b6,aroundCorner:_b5.aroundCorner,x:_bc,y:_bd,w:_c0,h:_c1,overflow:_c2};
}
return !_c2;
});
_b0.style.left=_b4.x+"px";
_b0.style.top=_b4.y+"px";
if(_b4.overflow&&_b2){
_b2(_b0,_b4.aroundCorner,_b4.corner);
}
return _b4;
};
dijit.placeOnScreenAroundNode=function(_c3,_c4,_c5,_c6){
_c4=dojo.byId(_c4);
var _c7=_c4.style.display;
_c4.style.display="";
var _c8=_c4.offsetWidth;
var _c9=_c4.offsetHeight;
var _ca=dojo.coords(_c4,true);
_c4.style.display=_c7;
return dijit._placeOnScreenAroundRect(_c3,_ca.x,_ca.y,_c8,_c9,_c5,_c6);
};
dijit.placeOnScreenAroundRectangle=function(_cb,_cc,_cd,_ce){
return dijit._placeOnScreenAroundRect(_cb,_cc.x,_cc.y,_cc.width,_cc.height,_cd,_ce);
};
dijit._placeOnScreenAroundRect=function(_cf,x,y,_d2,_d3,_d4,_d5){
var _d6=[];
for(var _d7 in _d4){
_d6.push({aroundCorner:_d7,corner:_d4[_d7],pos:{x:x+(_d7.charAt(1)=="L"?0:_d2),y:y+(_d7.charAt(0)=="T"?0:_d3)}});
}
return dijit._place(_cf,_d6,_d5);
};
dijit.placementRegistry=new dojo.AdapterRegistry();
dijit.placementRegistry.register("node",function(n,x){
return typeof x=="object"&&typeof x.offsetWidth!="undefined"&&typeof x.offsetHeight!="undefined";
},dijit.placeOnScreenAroundNode);
dijit.placementRegistry.register("rect",function(n,x){
return typeof x=="object"&&"x" in x&&"y" in x&&"width" in x&&"height" in x;
},dijit.placeOnScreenAroundRectangle);
dijit.placeOnScreenAroundElement=function(_dc,_dd,_de,_df){
return dijit.placementRegistry.match.apply(dijit.placementRegistry,arguments);
};
}
if(!dojo._hasResource["dijit._base.window"]){
dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(doc){
if(dojo.isIE&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
}
if(!dojo._hasResource["dijit._base.popup"]){
dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup=new function(){
var _e2=[],_e3=1000,_e4=1;
this.prepare=function(_e5){
var s=_e5.style;
s.visibility="hidden";
s.position="absolute";
s.top="-9999px";
if(s.display=="none"){
s.display="";
}
dojo.body().appendChild(_e5);
};
this.open=function(_e7){
var _e8=_e7.popup,_e9=_e7.orient||{"BL":"TL","TL":"BL"},_ea=_e7.around,id=(_e7.around&&_e7.around.id)?(_e7.around.id+"_dropdown"):("popup_"+_e4++);
var _ec=dojo.create("div",{id:id,"class":"dijitPopup",style:{zIndex:_e3+_e2.length,visibility:"hidden"}},dojo.body());
dijit.setWaiRole(_ec,"presentation");
_ec.style.left=_ec.style.top="0px";
if(_e7.parent){
_ec.dijitPopupParent=_e7.parent.id;
}
var s=_e8.domNode.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_ec.appendChild(_e8.domNode);
var _ee=new dijit.BackgroundIframe(_ec);
var _ef=_ea?dijit.placeOnScreenAroundElement(_ec,_ea,_e9,_e8.orient?dojo.hitch(_e8,"orient"):null):dijit.placeOnScreen(_ec,_e7,_e9=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],_e7.padding);
_ec.style.visibility="visible";
var _f0=[];
var _f1=function(){
for(var pi=_e2.length-1;pi>0&&_e2[pi].parent===_e2[pi-1].widget;pi--){
}
return _e2[pi];
};
_f0.push(dojo.connect(_ec,"onkeypress",this,function(evt){
if(evt.charOrCode==dojo.keys.ESCAPE&&_e7.onCancel){
dojo.stopEvent(evt);
_e7.onCancel();
}else{
if(evt.charOrCode===dojo.keys.TAB){
dojo.stopEvent(evt);
var _f4=_f1();
if(_f4&&_f4.onCancel){
_f4.onCancel();
}
}
}
}));
if(_e8.onCancel){
_f0.push(dojo.connect(_e8,"onCancel",null,_e7.onCancel));
}
_f0.push(dojo.connect(_e8,_e8.onExecute?"onExecute":"onChange",null,function(){
var _f5=_f1();
if(_f5&&_f5.onExecute){
_f5.onExecute();
}
}));
_e2.push({wrapper:_ec,iframe:_ee,widget:_e8,parent:_e7.parent,onExecute:_e7.onExecute,onCancel:_e7.onCancel,onClose:_e7.onClose,handlers:_f0});
if(_e8.onOpen){
_e8.onOpen(_ef);
}
return _ef;
};
this.close=function(_f6){
while(dojo.some(_e2,function(_f7){
return _f7.widget==_f6;
})){
var top=_e2.pop(),_f9=top.wrapper,_fa=top.iframe,_fb=top.widget,_fc=top.onClose;
if(_fb.onClose){
_fb.onClose();
}
dojo.forEach(top.handlers,dojo.disconnect);
if(!_fb||!_fb.domNode){
return;
}
this.prepare(_fb.domNode);
_fa.destroy();
dojo.destroy(_f9);
if(_fc){
_fc();
}
}
};
}();
dijit._frames=new function(){
var _fd=[];
this.pop=function(){
var _fe;
if(_fd.length){
_fe=_fd.pop();
_fe.style.display="";
}else{
if(dojo.isIE){
var _ff=dojo.config["dojoBlankHtmlUrl"]||(dojo.moduleUrl("dojo","resources/blank.html")+"")||"javascript:\"\"";
var html="<iframe src='"+_ff+"'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_fe=dojo.doc.createElement(html);
}else{
_fe=dojo.create("iframe");
_fe.src="javascript:\"\"";
_fe.className="dijitBackgroundIframe";
}
_fe.tabIndex=-1;
dojo.body().appendChild(_fe);
}
return _fe;
};
this.push=function(_101){
_101.style.display="none";
if(dojo.isIE){
_101.style.removeExpression("width");
_101.style.removeExpression("height");
}
_fd.push(_101);
};
}();
dijit.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(dojo.isIE<7||(dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){
var _103=dijit._frames.pop();
node.appendChild(_103);
if(dojo.isIE){
_103.style.setExpression("width",dojo._scopeName+".doc.getElementById('"+node.id+"').offsetWidth");
_103.style.setExpression("height",dojo._scopeName+".doc.getElementById('"+node.id+"').offsetHeight");
}
this.iframe=_103;
}
};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){
if(this.iframe){
dijit._frames.push(this.iframe);
delete this.iframe;
}
}});
}
if(!dojo._hasResource["dijit._base.scroll"]){
dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(node){
try{
node=dojo.byId(node);
var doc=dojo.doc;
var body=dojo.body();
var html=body.parentNode;
if((!(dojo.isFF>=3||dojo.isIE||dojo.isWebKit)||node==body||node==html)&&(typeof node.scrollIntoView=="function")){
node.scrollIntoView(false);
return;
}
var ltr=dojo._isBodyLtr();
var _109=dojo.isIE>=8&&!_10a;
var rtl=!ltr&&!_109;
var _10c=body;
var _10a=doc.compatMode=="BackCompat";
if(_10a){
html._offsetWidth=html._clientWidth=body._offsetWidth=body.clientWidth;
html._offsetHeight=html._clientHeight=body._offsetHeight=body.clientHeight;
}else{
if(dojo.isWebKit){
body._offsetWidth=body._clientWidth=html.clientWidth;
body._offsetHeight=body._clientHeight=html.clientHeight;
}else{
_10c=html;
}
html._offsetHeight=html.clientHeight;
html._offsetWidth=html.clientWidth;
}
function _10d(_10e){
var ie=dojo.isIE;
return ((ie<=6||(ie>=7&&_10a))?false:(dojo.style(_10e,"position").toLowerCase()=="fixed"));
};
function _110(_111){
var _112=_111.parentNode;
var _113=_111.offsetParent;
if(_113==null||_10d(_111)){
_113=html;
_112=(_111==body)?html:null;
}
_111._offsetParent=_113;
_111._parent=_112;
var bp=dojo._getBorderExtents(_111);
_111._borderStart={H:(_109&&!ltr)?(bp.w-bp.l):bp.l,V:bp.t};
_111._borderSize={H:bp.w,V:bp.h};
_111._scrolledAmount={H:_111.scrollLeft,V:_111.scrollTop};
_111._offsetSize={H:_111._offsetWidth||_111.offsetWidth,V:_111._offsetHeight||_111.offsetHeight};
_111._offsetStart={H:(_109&&!ltr)?_113.clientWidth-_111.offsetLeft-_111._offsetSize.H:_111.offsetLeft,V:_111.offsetTop};
_111._clientSize={H:_111._clientWidth||_111.clientWidth,V:_111._clientHeight||_111.clientHeight};
if(_111!=body&&_111!=html&&_111!=node){
for(var dir in _111._offsetSize){
var _116=_111._offsetSize[dir]-_111._clientSize[dir]-_111._borderSize[dir];
var _117=_111._clientSize[dir]>0&&_116>0;
if(_117){
_111._offsetSize[dir]-=_116;
if(dojo.isIE&&rtl&&dir=="H"){
_111._offsetStart[dir]+=_116;
}
}
}
}
};
var _118=node;
while(_118!=null){
if(_10d(_118)){
node.scrollIntoView(false);
return;
}
_110(_118);
_118=_118._parent;
}
if(dojo.isIE&&node._parent){
var _119=node._offsetParent;
node._offsetStart.H+=_119._borderStart.H;
node._offsetStart.V+=_119._borderStart.V;
}
if(dojo.isIE>=7&&_10c==html&&rtl&&body._offsetStart&&body._offsetStart.H==0){
var _11a=html.scrollWidth-html._offsetSize.H;
if(_11a>0){
body._offsetStart.H=-_11a;
}
}
if(dojo.isIE<=6&&!_10a){
html._offsetSize.H+=html._borderSize.H;
html._offsetSize.V+=html._borderSize.V;
}
if(rtl&&body._offsetStart&&_10c==html&&html._scrolledAmount){
var ofs=body._offsetStart.H;
if(ofs<0){
html._scrolledAmount.H+=ofs;
body._offsetStart.H=0;
}
}
_118=node;
while(_118){
var _11c=_118._parent;
if(!_11c){
break;
}
if(_11c.tagName=="TD"){
var _11d=_11c._parent._parent._parent;
if(_11c!=_118._offsetParent&&_11c._offsetParent!=_118._offsetParent){
_11c=_11d;
}
}
var _11e=_118._offsetParent==_11c;
for(var dir in _118._offsetStart){
var _120=dir=="H"?"V":"H";
if(rtl&&dir=="H"&&(_11c!=html)&&(_11c!=body)&&(dojo.isIE||dojo.isWebKit)&&_11c._clientSize.H>0&&_11c.scrollWidth>_11c._clientSize.H){
var _121=_11c.scrollWidth-_11c._clientSize.H;
if(_121>0){
_11c._scrolledAmount.H-=_121;
}
}
if(_11c._offsetParent.tagName=="TABLE"){
if(dojo.isIE){
_11c._offsetStart[dir]-=_11c._offsetParent._borderStart[dir];
_11c._borderStart[dir]=_11c._borderSize[dir]=0;
}else{
_11c._offsetStart[dir]+=_11c._offsetParent._borderStart[dir];
}
}
if(dojo.isIE){
_11c._offsetStart[dir]+=_11c._offsetParent._borderStart[dir];
}
var _122=_118._offsetStart[dir]-_11c._scrolledAmount[dir]-(_11e?0:_11c._offsetStart[dir])-_11c._borderStart[dir];
var _123=_122+_118._offsetSize[dir]-_11c._offsetSize[dir]+_11c._borderSize[dir];
var _124=(dir=="H")?"scrollLeft":"scrollTop";
var _125=dir=="H"&&rtl;
var _126=_125?-_123:_122;
var _127=_125?-_122:_123;
var _128=(_126*_127<=0)?0:Math[(_126<0)?"max":"min"](_126,_127);
if(_128!=0){
var _129=_11c[_124];
_11c[_124]+=(_125)?-_128:_128;
var _12a=_11c[_124]-_129;
}
if(_11e){
_118._offsetStart[dir]+=_11c._offsetStart[dir];
}
_118._offsetStart[dir]-=_11c[_124];
}
_118._parent=_11c._parent;
_118._offsetParent=_11c._offsetParent;
}
_11c=node;
var next;
while(_11c&&_11c.removeAttribute){
next=_11c.parentNode;
_11c.removeAttribute("_offsetParent");
_11c.removeAttribute("_parent");
_11c=next;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
}
if(!dojo._hasResource["dijit._base.sniff"]){
dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){
var d=dojo,html=d.doc.documentElement,ie=d.isIE,_12f=d.isOpera,maj=Math.floor,ff=d.isFF,_132=d.boxModel.replace(/-/,""),_133={dj_ie:ie,dj_ie6:maj(ie)==6,dj_ie7:maj(ie)==7,dj_iequirks:ie&&d.isQuirks,dj_opera:_12f,dj_opera8:maj(_12f)==8,dj_opera9:maj(_12f)==9,dj_khtml:d.isKhtml,dj_webkit:d.isWebKit,dj_safari:d.isSafari,dj_gecko:d.isMozilla,dj_ff2:maj(ff)==2,dj_ff3:maj(ff)==3};
_133["dj_"+_132]=true;
for(var p in _133){
if(_133[p]){
if(html.className){
html.className+=" "+p;
}else{
html.className=p;
}
}
}
dojo._loaders.unshift(function(){
if(!dojo._isBodyLtr()){
html.className+=" dijitRtl";
for(var p in _133){
if(_133[p]){
html.className+=" "+p+"-rtl";
}
}
}
});
})();
}
if(!dojo._hasResource["dijit._base.typematic"]){
dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_137,node,_139,obj,_13b,_13c){
if(obj!=this._obj){
this.stop();
this._initialDelay=_13c||500;
this._subsequentDelay=_13b||0.9;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(_137,_139);
this._fireEventAndReload();
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_13e,_13f,_140,_141,_142){
if(_13e.keyCode){
_13e.charOrCode=_13e.keyCode;
dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_13e.charCode){
_13e.charOrCode=String.fromCharCode(_13e.charCode);
dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
return [dojo.connect(node,"onkeypress",this,function(evt){
if(evt.charOrCode==_13e.charOrCode&&(_13e.ctrlKey===undefined||_13e.ctrlKey==evt.ctrlKey)&&(_13e.altKey===undefined||_13e.altKey==evt.ctrlKey)&&(_13e.shiftKey===undefined||_13e.shiftKey==evt.ctrlKey)){
dojo.stopEvent(evt);
dijit.typematic.trigger(_13e,_13f,node,_140,_13e,_141,_142);
}else{
if(dijit.typematic._obj==_13e){
dijit.typematic.stop();
}
}
}),dojo.connect(node,"onkeyup",this,function(evt){
if(dijit.typematic._obj==_13e){
dijit.typematic.stop();
}
})];
},addMouseListener:function(node,_146,_147,_148,_149){
var dc=dojo.connect;
return [dc(node,"mousedown",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_146,node,_147,node,_148,_149);
}),dc(node,"mouseup",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mouseout",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mousemove",this,function(evt){
dojo.stopEvent(evt);
}),dc(node,"dblclick",this,function(evt){
dojo.stopEvent(evt);
if(dojo.isIE){
dijit.typematic.trigger(evt,_146,node,_147,node,_148,_149);
setTimeout(dojo.hitch(this,dijit.typematic.stop),50);
}
})];
},addListener:function(_150,_151,_152,_153,_154,_155,_156){
return this.addKeyListener(_151,_152,_153,_154,_155,_156).concat(this.addMouseListener(_150,_153,_154,_155,_156));
}};
}
if(!dojo._hasResource["dijit._base.wai"]){
dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){
var div=dojo.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif"))+"\");"}},dojo.body());
var cs=dojo.getComputedStyle(div);
if(cs){
var _159=cs.backgroundImage;
var _15a=(cs.borderTopColor==cs.borderRightColor)||(_159!=null&&(_159=="none"||_159=="url(invalid-url:)"));
dojo[_15a?"addClass":"removeClass"](dojo.body(),"dijit_a11y");
if(dojo.isIE){
div.outerHTML="";
}else{
dojo.body().removeChild(div);
}
}
}};
if(dojo.isIE||dojo.isMoz){
dojo._loaders.unshift(dijit.wai.onload);
}
dojo.mixin(dijit,{_XhtmlRoles:/banner|contentinfo|definition|main|navigation|search|note|secondary|seealso/,hasWaiRole:function(elem,role){
var _15d=this.getWaiRole(elem);
return role?(_15d.indexOf(role)>-1):(_15d.length>0);
},getWaiRole:function(elem){
return dojo.trim((dojo.attr(elem,"role")||"").replace(this._XhtmlRoles,"").replace("wairole:",""));
},setWaiRole:function(elem,role){
var _161=dojo.attr(elem,"role")||"";
if(dojo.isFF<3||!this._XhtmlRoles.test(_161)){
dojo.attr(elem,"role",dojo.isFF<3?"wairole:"+role:role);
}else{
if((" "+_161+" ").indexOf(" "+role+" ")<0){
var _162=dojo.trim(_161.replace(this._XhtmlRoles,""));
var _163=dojo.trim(_161.replace(_162,""));
dojo.attr(elem,"role",_163+(_163?" ":"")+role);
}
}
},removeWaiRole:function(elem,role){
var _166=dojo.attr(elem,"role");
if(!_166){
return;
}
if(role){
var _167=dojo.isFF<3?"wairole:"+role:role;
var t=dojo.trim((" "+_166+" ").replace(" "+_167+" "," "));
dojo.attr(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_16a){
if(dojo.isFF<3){
return elem.hasAttributeNS("http://www.w3.org/2005/07/aaa",_16a);
}
return elem.hasAttribute?elem.hasAttribute("aria-"+_16a):!!elem.getAttribute("aria-"+_16a);
},getWaiState:function(elem,_16c){
if(dojo.isFF<3){
return elem.getAttributeNS("http://www.w3.org/2005/07/aaa",_16c);
}
return elem.getAttribute("aria-"+_16c)||"";
},setWaiState:function(elem,_16e,_16f){
if(dojo.isFF<3){
elem.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+_16e,_16f);
}else{
elem.setAttribute("aria-"+_16e,_16f);
}
},removeWaiState:function(elem,_171){
if(dojo.isFF<3){
elem.removeAttributeNS("http://www.w3.org/2005/07/aaa",_171);
}else{
elem.removeAttribute("aria-"+_171);
}
}});
}
if(!dojo._hasResource["dijit._base"]){
dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base");
}
if(!dojo._hasResource["dijit._Widget"]){
dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.require("dijit._base");
dojo.connect(dojo,"connect",function(_172,_173){
if(_172&&dojo.isFunction(_172._onConnect)){
_172._onConnect(_173);
}
});
dijit._connectOnUseEventHandler=function(_174){
};
(function(){
var _175={};
var _176=function(dc){
if(!_175[dc]){
var r=[];
var _179;
var _17a=dojo.getObject(dc).prototype;
for(var _17b in _17a){
if(dojo.isFunction(_17a[_17b])&&(_179=_17b.match(/^_set([a-zA-Z]*)Attr$/))&&_179[1]){
r.push(_179[1].charAt(0).toLowerCase()+_179[1].substr(1));
}
}
_175[dc]=r;
}
return _175[dc]||[];
};
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},_deferredConnects:{onClick:"",onDblClick:"",onKeyDown:"",onKeyPress:"",onKeyUp:"",onMouseMove:"",onMouseDown:"",onMouseOut:"",onMouseOver:"",onMouseLeave:"",onMouseEnter:"",onMouseUp:""},onClick:dijit._connectOnUseEventHandler,onDblClick:dijit._connectOnUseEventHandler,onKeyDown:dijit._connectOnUseEventHandler,onKeyPress:dijit._connectOnUseEventHandler,onKeyUp:dijit._connectOnUseEventHandler,onMouseDown:dijit._connectOnUseEventHandler,onMouseMove:dijit._connectOnUseEventHandler,onMouseOut:dijit._connectOnUseEventHandler,onMouseOver:dijit._connectOnUseEventHandler,onMouseLeave:dijit._connectOnUseEventHandler,onMouseEnter:dijit._connectOnUseEventHandler,onMouseUp:dijit._connectOnUseEventHandler,_blankGif:(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif")),postscript:function(_17c,_17d){
this.create(_17c,_17d);
},create:function(_17e,_17f){
this.srcNodeRef=dojo.byId(_17f);
this._connects=[];
this._deferredConnects=dojo.clone(this._deferredConnects);
for(var attr in this.attributeMap){
delete this._deferredConnects[attr];
}
for(attr in this._deferredConnects){
if(this[attr]!==dijit._connectOnUseEventHandler){
delete this._deferredConnects[attr];
}
}
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_17e){
this.params=_17e;
dojo.mixin(this,_17e);
}
this.postMixInProperties();
if(!this.id){
this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
dijit.registry.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _181=this.srcNodeRef;
if(_181&&_181.parentNode){
_181.parentNode.replaceChild(this.domNode,_181);
}
for(attr in this.params){
this._onConnect(attr);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _182=function(attr,_184){
if((_184.params&&attr in _184.params)||_184[attr]){
_184.attr(attr,_184[attr]);
}
};
for(var attr in this.attributeMap){
_182(attr,this);
}
dojo.forEach(_176(this.declaredClass),function(a){
if(!(a in this.attributeMap)){
_182(a,this);
}
},this);
},postMixInProperties:function(){
},buildRendering:function(){
this.domNode=this.srcNodeRef||dojo.create("div");
},postCreate:function(){
},startup:function(){
this._started=true;
},destroyRecursive:function(_187){
this.destroyDescendants(_187);
this.destroy(_187);
},destroy:function(_188){
this.uninitialize();
dojo.forEach(this._connects,function(_189){
dojo.forEach(_189,dojo.disconnect);
});
dojo.forEach(this._supportingWidgets||[],function(w){
if(w.destroy){
w.destroy();
}
});
this.destroyRendering(_188);
dijit.registry.remove(this.id);
},destroyRendering:function(_18b){
if(this.bgIframe){
this.bgIframe.destroy(_18b);
delete this.bgIframe;
}
if(this.domNode){
if(_18b){
dojo.removeAttr(this.domNode,"widgetId");
}else{
dojo.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_18b){
dojo.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_18c){
dojo.forEach(this.getChildren(),function(_18d){
if(_18d.destroyRecursive){
_18d.destroyRecursive(_18c);
}
});
},uninitialize:function(){
return false;
},onFocus:function(){
},onBlur:function(){
},_onFocus:function(e){
this.onFocus();
},_onBlur:function(){
this.onBlur();
},_onConnect:function(_18f){
if(_18f in this._deferredConnects){
var _190=this[this._deferredConnects[_18f]||"domNode"];
this.connect(_190,_18f.toLowerCase(),_18f);
delete this._deferredConnects[_18f];
}
},_setClassAttr:function(_191){
var _192=this[this.attributeMap["class"]||"domNode"];
dojo.removeClass(_192,this["class"]);
this["class"]=_191;
dojo.addClass(_192,_191);
},_setStyleAttr:function(_193){
var _194=this[this.attributeMap["style"]||"domNode"];
if(dojo.isObject(_193)){
dojo.style(_194,_193);
}else{
if(_194.style.cssText){
_194.style.cssText+="; "+_193;
}else{
_194.style.cssText=_193;
}
}
this["style"]=_193;
},setAttribute:function(attr,_196){
dojo.deprecated(this.declaredClass+"::setAttribute() is deprecated. Use attr() instead.","","2.0");
this.attr(attr,_196);
},_attrToDom:function(attr,_198){
var _199=this.attributeMap[attr];
dojo.forEach(dojo.isArray(_199)?_199:[_199],function(_19a){
var _19b=this[_19a.node||_19a||"domNode"];
var type=_19a.type||"attribute";
switch(type){
case "attribute":
if(dojo.isFunction(_198)){
_198=dojo.hitch(this,_198);
}
if(/^on[A-Z][a-zA-Z]*$/.test(attr)){
attr=attr.toLowerCase();
}
dojo.attr(_19b,attr,_198);
break;
case "innerHTML":
_19b.innerHTML=_198;
break;
case "class":
dojo.removeClass(_19b,this[attr]);
dojo.addClass(_19b,_198);
break;
}
},this);
this[attr]=_198;
},attr:function(name,_19e){
var args=arguments.length;
if(args==1&&!dojo.isString(name)){
for(var x in name){
this.attr(x,name[x]);
}
return this;
}
var _1a1=this._getAttrNames(name);
if(args==2){
if(this[_1a1.s]){
return this[_1a1.s](_19e)||this;
}else{
if(name in this.attributeMap){
this._attrToDom(name,_19e);
}
this[name]=_19e;
}
return this;
}else{
if(this[_1a1.g]){
return this[_1a1.g]();
}else{
return this[name];
}
}
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"};
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getDescendants:function(){
if(this.containerNode){
var list=dojo.query("[widgetId]",this.containerNode);
return list.map(dijit.byNode);
}else{
return [];
}
},getChildren:function(){
if(this.containerNode){
return dijit.findWidgets(this.containerNode);
}else{
return [];
}
},nodesWithKeyClick:["input","button"],connect:function(obj,_1a7,_1a8){
var d=dojo;
var dc=dojo.connect;
var _1ab=[];
if(_1a7=="ondijitclick"){
if(!this.nodesWithKeyClick[obj.nodeName]){
var m=d.hitch(this,_1a8);
_1ab.push(dc(obj,"onkeydown",this,function(e){
if(!d.isFF&&e.keyCode==d.keys.ENTER&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
return m(e);
}else{
if(e.keyCode==d.keys.SPACE){
d.stopEvent(e);
}
}
}),dc(obj,"onkeyup",this,function(e){
if(e.keyCode==d.keys.SPACE&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
return m(e);
}
}));
if(d.isFF){
_1ab.push(dc(obj,"onkeypress",this,function(e){
if(e.keyCode==d.keys.ENTER&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
return m(e);
}
}));
}
}
_1a7="onclick";
}
_1ab.push(dc(obj,_1a7,this,_1a8));
this._connects.push(_1ab);
return _1ab;
},disconnect:function(_1b0){
for(var i=0;i<this._connects.length;i++){
if(this._connects[i]==_1b0){
dojo.forEach(_1b0,dojo.disconnect);
this._connects.splice(i,1);
return;
}
}
},isLeftToRight:function(){
return dojo._isBodyLtr();
},isFocusable:function(){
return this.focus&&(dojo.style(this.domNode,"display")!="none");
},placeAt:function(_1b2,_1b3){
if(_1b2["declaredClass"]&&_1b2["addChild"]){
_1b2.addChild(this,_1b3);
}else{
dojo.place(this.domNode,_1b2,_1b3);
}
return this;
}});
})();
}
if(!dojo._hasResource["dojo.string"]){
dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
dojo.string.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=dojo.string.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
dojo.string.substitute=function(_1bd,map,_1bf,_1c0){
_1c0=_1c0||dojo.global;
_1bf=(!_1bf)?function(v){
return v;
}:dojo.hitch(_1c0,_1bf);
return _1bd.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_1c2,key,_1c4){
var _1c5=dojo.getObject(key,false,map);
if(_1c4){
_1c5=dojo.getObject(_1c4,false,_1c0).call(_1c0,_1c5,key);
}
return _1bf(_1c5,key).toString();
});
};
dojo.string.trim=String.prototype.trim?dojo.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
}
if(!dojo._hasResource["dojo.date.stamp"]){
dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(_1c8,_1c9){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _1ca=dojo.date.stamp._isoRegExp.exec(_1c8);
var _1cb=null;
if(_1ca){
_1ca.shift();
if(_1ca[1]){
_1ca[1]--;
}
if(_1ca[6]){
_1ca[6]*=1000;
}
if(_1c9){
_1c9=new Date(_1c9);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _1c9["get"+prop]();
}).forEach(function(_1cd,_1ce){
if(_1ca[_1ce]===undefined){
_1ca[_1ce]=_1cd;
}
});
}
_1cb=new Date(_1ca[0]||1970,_1ca[1]||0,_1ca[2]||1,_1ca[3]||0,_1ca[4]||0,_1ca[5]||0,_1ca[6]||0);
var _1cf=0;
var _1d0=_1ca[7]&&_1ca[7].charAt(0);
if(_1d0!="Z"){
_1cf=((_1ca[8]||0)*60)+(Number(_1ca[9])||0);
if(_1d0!="-"){
_1cf*=-1;
}
}
if(_1d0){
_1cf-=_1cb.getTimezoneOffset();
}
if(_1cf){
_1cb.setTime(_1cb.getTime()+_1cf*60000);
}
}
return _1cb;
};
dojo.date.stamp.toISOString=function(_1d1,_1d2){
var _=function(n){
return (n<10)?"0"+n:n;
};
_1d2=_1d2||{};
var _1d5=[];
var _1d6=_1d2.zulu?"getUTC":"get";
var date="";
if(_1d2.selector!="time"){
var year=_1d1[_1d6+"FullYear"]();
date=["0000".substr((year+"").length)+year,_(_1d1[_1d6+"Month"]()+1),_(_1d1[_1d6+"Date"]())].join("-");
}
_1d5.push(date);
if(_1d2.selector!="date"){
var time=[_(_1d1[_1d6+"Hours"]()),_(_1d1[_1d6+"Minutes"]()),_(_1d1[_1d6+"Seconds"]())].join(":");
var _1da=_1d1[_1d6+"Milliseconds"]();
if(_1d2.milliseconds){
time+="."+(_1da<100?"0":"")+_(_1da);
}
if(_1d2.zulu){
time+="Z";
}else{
if(_1d2.selector!="time"){
var _1db=_1d1.getTimezoneOffset();
var _1dc=Math.abs(_1db);
time+=(_1db>0?"-":"+")+_(Math.floor(_1dc/60))+":"+_(_1dc%60);
}
}
_1d5.push(time);
}
return _1d5.join("T");
};
}
if(!dojo._hasResource["dojo.parser"]){
dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){
var d=dojo;
var _1de=d._scopeName+"Type";
var qry="["+_1de+"]";
var _1e0=0,_1e1={};
var _1e2=function(_1e3,_1e4){
var nso=_1e4||_1e1;
if(dojo.isIE){
var cn=_1e3["__dojoNameCache"];
if(cn&&nso[cn]===_1e3){
return cn;
}
}
var name;
do{
name="__"+_1e0++;
}while(name in nso);
nso[name]=_1e3;
return name;
};
function _1e8(_1e9){
if(d.isString(_1e9)){
return "string";
}
if(typeof _1e9=="number"){
return "number";
}
if(typeof _1e9=="boolean"){
return "boolean";
}
if(d.isFunction(_1e9)){
return "function";
}
if(d.isArray(_1e9)){
return "array";
}
if(_1e9 instanceof Date){
return "date";
}
if(_1e9 instanceof d._Url){
return "url";
}
return "object";
};
function _1ea(_1eb,type){
switch(type){
case "string":
return _1eb;
case "number":
return _1eb.length?Number(_1eb):NaN;
case "boolean":
return typeof _1eb=="boolean"?_1eb:!(_1eb.toLowerCase()=="false");
case "function":
if(d.isFunction(_1eb)){
_1eb=_1eb.toString();
_1eb=d.trim(_1eb.substring(_1eb.indexOf("{")+1,_1eb.length-1));
}
try{
if(_1eb.search(/[^\w\.]+/i)!=-1){
_1eb=_1e2(new Function(_1eb),this);
}
return d.getObject(_1eb,false);
}
catch(e){
return new Function();
}
case "array":
return _1eb?_1eb.split(/\s*,\s*/):[];
case "date":
switch(_1eb){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_1eb);
}
case "url":
return d.baseUrl+_1eb;
default:
return d.fromJson(_1eb);
}
};
var _1ed={};
function _1ee(_1ef){
if(!_1ed[_1ef]){
var cls=d.getObject(_1ef);
if(!d.isFunction(cls)){
throw new Error("Could not load class '"+_1ef+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?");
}
var _1f1=cls.prototype;
var _1f2={},_1f3={};
for(var name in _1f1){
if(name.charAt(0)=="_"){
continue;
}
if(name in _1f3){
continue;
}
var _1f5=_1f1[name];
_1f2[name]=_1e8(_1f5);
}
_1ed[_1ef]={cls:cls,params:_1f2};
}
return _1ed[_1ef];
};
this._functionFromScript=function(_1f6){
var _1f7="";
var _1f8="";
var _1f9=_1f6.getAttribute("args");
if(_1f9){
d.forEach(_1f9.split(/\s*,\s*/),function(part,idx){
_1f7+="var "+part+" = arguments["+idx+"]; ";
});
}
var _1fc=_1f6.getAttribute("with");
if(_1fc&&_1fc.length){
d.forEach(_1fc.split(/\s*,\s*/),function(part){
_1f7+="with("+part+"){";
_1f8+="}";
});
}
return new Function(_1f7+_1f6.innerHTML+_1f8);
};
this.instantiate=function(_1fe,_1ff){
var _200=[];
_1ff=_1ff||{};
d.forEach(_1fe,function(node){
if(!node){
return;
}
var type=_1de in _1ff?_1ff[_1de]:node.getAttribute(_1de);
if(!type||!type.length){
return;
}
var _203=_1ee(type),_204=_203.cls,ps=_204._noScript||_204.prototype._noScript;
var _206={},_207=node.attributes;
for(var name in _203.params){
var item=name in _1ff?{value:_1ff[name],specified:true}:_207.getNamedItem(name);
if(!item||(!item.specified&&(!dojo.isIE||name.toLowerCase()!="value"))){
continue;
}
var _20a=item.value;
switch(name){
case "class":
_20a="className" in _1ff?_1ff.className:node.className;
break;
case "style":
_20a="style" in _1ff?_1ff.style:(node.style&&node.style.cssText);
}
var _20b=_203.params[name];
if(typeof _20a=="string"){
_206[name]=_1ea(_20a,_20b);
}else{
_206[name]=_20a;
}
}
if(!ps){
var _20c=[],_20d=[];
d.query("> script[type^='dojo/']",node).orphan().forEach(function(_20e){
var _20f=_20e.getAttribute("event"),type=_20e.getAttribute("type"),nf=d.parser._functionFromScript(_20e);
if(_20f){
if(type=="dojo/connect"){
_20c.push({event:_20f,func:nf});
}else{
_206[_20f]=nf;
}
}else{
_20d.push(nf);
}
});
}
var _211=_204["markupFactory"];
if(!_211&&_204["prototype"]){
_211=_204.prototype["markupFactory"];
}
var _212=_211?_211(_206,node,_204):new _204(_206,node);
_200.push(_212);
var _213=node.getAttribute("jsId");
if(_213){
d.setObject(_213,_212);
}
if(!ps){
d.forEach(_20c,function(_214){
d.connect(_212,_214.event,null,_214.func);
});
d.forEach(_20d,function(func){
func.call(_212);
});
}
});
d.forEach(_200,function(_216){
if(_216&&_216.startup&&!_216._started&&(!_216.getParent||!_216.getParent())){
_216.startup();
}
});
return _200;
};
this.parse=function(_217){
var list=d.query(qry,_217);
var _219=this.instantiate(list);
return _219;
};
}();
(function(){
var _21a=function(){
if(dojo.config["parseOnLoad"]==true){
dojo.parser.parse();
}
};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){
dojo._loaders.splice(1,0,_21a);
}else{
dojo._loaders.unshift(_21a);
}
})();
}
if(!dojo._hasResource["dijit._Templated"]){
dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateString:null,templatePath:null,widgetsInTemplate:false,_skipNodeCache:false,_stringRepl:function(tmpl){
var _21c=this.declaredClass,_21d=this;
return dojo.string.substitute(tmpl,this,function(_21e,key){
if(key.charAt(0)=="!"){
_21e=dojo.getObject(key.substr(1),false,_21d);
}
if(typeof _21e=="undefined"){
throw new Error(_21c+" template:"+key);
}
if(_21e==null){
return "";
}
return key.charAt(0)=="!"?_21e:_21e.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
var _220=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var node;
if(dojo.isString(_220)){
node=dojo._toDom(this._stringRepl(_220));
}else{
node=_220.cloneNode(true);
}
this.domNode=node;
this._attachTemplateNodes(node);
if(this.widgetsInTemplate){
var cw=(this._supportingWidgets=dojo.parser.parse(node));
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
this._fillContent(this.srcNodeRef);
},_fillContent:function(_225){
var dest=this.containerNode;
if(_225&&dest){
while(_225.hasChildNodes()){
dest.appendChild(_225.firstChild);
}
}
},_attachTemplateNodes:function(_227,_228){
_228=_228||function(n,p){
return n.getAttribute(p);
};
var _22b=dojo.isArray(_227)?_227:(_227.all||_227.getElementsByTagName("*"));
var x=dojo.isArray(_227)?0:-1;
for(;x<_22b.length;x++){
var _22d=(x==-1)?_227:_22b[x];
if(this.widgetsInTemplate&&_228(_22d,"dojoType")){
continue;
}
var _22e=_228(_22d,"dojoAttachPoint");
if(_22e){
var _22f,_230=_22e.split(/\s*,\s*/);
while((_22f=_230.shift())){
if(dojo.isArray(this[_22f])){
this[_22f].push(_22d);
}else{
this[_22f]=_22d;
}
}
}
var _231=_228(_22d,"dojoAttachEvent");
if(_231){
var _232,_233=_231.split(/\s*,\s*/);
var trim=dojo.trim;
while((_232=_233.shift())){
if(_232){
var _235=null;
if(_232.indexOf(":")!=-1){
var _236=_232.split(":");
_232=trim(_236[0]);
_235=trim(_236[1]);
}else{
_232=trim(_232);
}
if(!_235){
_235=_232;
}
this.connect(_22d,_232,_235);
}
}
}
var role=_228(_22d,"waiRole");
if(role){
dijit.setWaiRole(_22d,role);
}
var _238=_228(_22d,"waiState");
if(_238){
dojo.forEach(_238.split(/\s*,\s*/),function(_239){
if(_239.indexOf("-")!=-1){
var pair=_239.split("-");
dijit.setWaiState(_22d,pair[0],pair[1]);
}
});
}
}
}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(_23b,_23c,_23d){
var _23e=dijit._Templated._templateCache;
var key=_23c||_23b;
var _240=_23e[key];
if(_240){
if(!_240.ownerDocument||_240.ownerDocument==dojo.doc){
return _240;
}
dojo.destroy(_240);
}
if(!_23c){
_23c=dijit._Templated._sanitizeTemplateString(dojo.trim(dojo._getText(_23b)));
}
_23c=dojo.string.trim(_23c);
if(_23d||_23c.match(/\$\{([^\}]+)\}/g)){
return (_23e[key]=_23c);
}else{
return (_23e[key]=dojo._toDom(_23c));
}
};
dijit._Templated._sanitizeTemplateString=function(_241){
if(_241){
_241=_241.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _242=_241.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_242){
_241=_242[1];
}
}else{
_241="";
}
return _241;
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
var _243=dijit._Templated._templateCache;
for(var key in _243){
var _245=_243[key];
if(!isNaN(_245.nodeType)){
dojo.destroy(_245);
}
delete _243[key];
}
});
}
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""});
}
if(!dojo._hasResource["dijit.form._FormWidget"]){
dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",name:"",alt:"",value:"",type:"text",tabIndex:"0",disabled:false,readOnly:false,intermediateChanges:false,scrollOnFocus:true,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{value:"focusNode",disabled:"focusNode",readOnly:"focusNode",id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),postMixInProperties:function(){
this.nameAttrSetting=this.name?("name='"+this.name+"'"):"";
this.inherited(arguments);
},_setDisabledAttr:function(_246){
this.disabled=_246;
dojo.attr(this.focusNode,"disabled",_246);
dijit.setWaiState(this.focusNode,"disabled",_246);
if(_246){
this._hovering=false;
this._active=false;
this.focusNode.removeAttribute("tabIndex");
}else{
this.focusNode.setAttribute("tabIndex",this.tabIndex);
}
this._setStateClass();
},setDisabled:function(_247){
dojo.deprecated("setDisabled("+_247+") is deprecated. Use attr('disabled',"+_247+") instead.","","2.0");
this.attr("disabled",_247);
},_onFocus:function(e){
if(this.scrollOnFocus){
dijit.scrollIntoView(this.domNode);
}
this.inherited(arguments);
},_onMouse:function(_249){
var _24a=_249.currentTarget;
if(_24a&&_24a.getAttribute){
this.stateModifier=_24a.getAttribute("stateModifier")||"";
}
if(!this.disabled){
switch(_249.type){
case "mouseenter":
case "mouseover":
this._hovering=true;
this._active=this._mouseDown;
break;
case "mouseout":
case "mouseleave":
this._hovering=false;
this._active=false;
break;
case "mousedown":
this._active=true;
this._mouseDown=true;
var _24b=this.connect(dojo.body(),"onmouseup",function(){
if(this._mouseDown&&this.isFocusable()){
this.focus();
}
this._active=false;
this._mouseDown=false;
this._setStateClass();
this.disconnect(_24b);
});
break;
}
this._setStateClass();
}
},isFocusable:function(){
return !this.disabled&&!this.readOnly&&this.focusNode&&(dojo.style(this.domNode,"display")!="none");
},focus:function(){
dijit.focus(this.focusNode);
},_setStateClass:function(){
var _24c=this.baseClass.split(" ");
function _24d(_24e){
_24c=_24c.concat(dojo.map(_24c,function(c){
return c+_24e;
}),"dijit"+_24e);
};
if(this.checked){
_24d("Checked");
}
if(this.state){
_24d(this.state);
}
if(this.selected){
_24d("Selected");
}
if(this.disabled){
_24d("Disabled");
}else{
if(this.readOnly){
_24d("ReadOnly");
}else{
if(this._active){
_24d(this.stateModifier+"Active");
}else{
if(this._focused){
_24d("Focused");
}
if(this._hovering){
_24d(this.stateModifier+"Hover");
}
}
}
}
var tn=this.stateNode||this.domNode,_251={};
dojo.forEach(tn.className.split(" "),function(c){
_251[c]=true;
});
if("_stateClasses" in this){
dojo.forEach(this._stateClasses,function(c){
delete _251[c];
});
}
dojo.forEach(_24c,function(c){
_251[c]=true;
});
var _255=[];
for(var c in _251){
_255.push(c);
}
tn.className=_255.join(" ");
this._stateClasses=_24c;
},compare:function(val1,val2){
if((typeof val1=="number")&&(typeof val2=="number")){
return (isNaN(val1)&&isNaN(val2))?0:(val1-val2);
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(_259){
},_onChangeActive:false,_handleOnChange:function(_25a,_25b){
this._lastValue=_25a;
if(this._lastValueReported==undefined&&(_25b===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_25a;
}
if((this.intermediateChanges||_25b||_25b===undefined)&&((typeof _25a!=typeof this._lastValueReported)||this.compare(_25a,this._lastValueReported)!=0)){
this._lastValueReported=_25a;
if(this._onChangeActive){
this.onChange(_25a);
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
this._setStateClass();
},destroy:function(){
if(this._layoutHackHandle){
clearTimeout(this._layoutHackHandle);
}
this.inherited(arguments);
},setValue:function(_25c){
dojo.deprecated("dijit.form._FormWidget:setValue("+_25c+") is deprecated.  Use attr('value',"+_25c+") instead.","","2.0");
this.attr("value",_25c);
},getValue:function(){
dojo.deprecated(this.declaredClass+"::getValue() is deprecated. Use attr('value') instead.","","2.0");
return this.attr("value");
},_layoutHack:function(){
if(dojo.isFF==2&&!this._layoutHackHandle){
var node=this.domNode;
var old=node.style.opacity;
node.style.opacity="0.999";
this._layoutHackHandle=setTimeout(dojo.hitch(this,function(){
this._layoutHackHandle=null;
node.style.opacity=old;
}),0);
}
}});
dojo.declare("dijit.form._FormValueWidget",dijit.form._FormWidget,{attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:""}),postCreate:function(){
if(dojo.isIE||dojo.isWebKit){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._resetValue=this.value;
}
},_setValueAttr:function(_25f,_260){
this.value=_25f;
this._handleOnChange(_25f,_260);
},_getValueAttr:function(_261){
return this._lastValue;
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==dojo.keys.ESCAPE&&!e.ctrlKey&&!e.altKey){
var te;
if(dojo.isIE){
e.preventDefault();
te=document.createEventObject();
te.keyCode=dojo.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}else{
if(dojo.isWebKit){
te=document.createEvent("Events");
te.initEvent("keypress",true,true);
te.keyCode=dojo.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.target.dispatchEvent(te);
}
}
}
}});
}
if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_264,_265){
var _266=this.containerNode;
if(_265&&typeof _265=="number"){
var _267=this.getChildren();
if(_267&&_267.length>=_265){
_266=_267[_265-1].domNode;
_265="after";
}
}
dojo.place(_264.domNode,_266,_265);
if(this._started&&!_264._started){
_264.startup();
}
},removeChild:function(_268){
if(typeof _268=="number"&&_268>0){
_268=this.getChildren()[_268];
}
if(!_268||!_268.domNode){
return;
}
var node=_268.domNode;
node.parentNode.removeChild(node);
},_nextElement:function(node){
do{
node=node.nextSibling;
}while(node&&node.nodeType!=1);
return node;
},_firstElement:function(node){
node=node.firstChild;
if(node&&node.nodeType!=1){
node=this._nextElement(node);
}
return node;
},getChildren:function(){
return dojo.query("> [widgetId]",this.containerNode).map(dijit.byNode);
},hasChildren:function(){
return !!this._firstElement(this.containerNode);
},destroyDescendants:function(_26c){
dojo.forEach(this.getChildren(),function(_26d){
_26d.destroyRecursive(_26c);
});
},_getSiblingOfChild:function(_26e,dir){
var node=_26e.domNode;
var _271=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_271];
}while(node&&(node.nodeType!=1||!dijit.byNode(node)));
return node?dijit.byNode(node):null;
},getIndexOfChild:function(_272){
var _273=this.getChildren();
for(var i=0,c;c=_273[i];i++){
if(c==_272){
return i;
}
}
return -1;
}});
}
if(!dojo._hasResource["dijit.form.Button"]){
dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:"<span class=\"dijit dijitReset dijitLeft dijitInline\"\n\tdojoAttachEvent=\"ondijitclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse\"\n\t><span class=\"dijitReset dijitRight dijitInline\"\n\t\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\t\t><button class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\t\tdojoAttachPoint=\"titleNode,focusNode\" \n\t\t\t\t${nameAttrSetting} type=\"${type}\" value=\"${value}\" waiRole=\"button\" waiState=\"labelledby-${id}_label\"\n\t\t\t\t><span class=\"dijitReset dijitInline\" dojoAttachPoint=\"iconNode\" \n\t\t\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#10003;</span \n\t\t\t\t></span \n\t\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\" \n\t\t\t\t\tid=\"${id}_label\"  \n\t\t\t\t\tdojoAttachPoint=\"containerNode\"\n\t\t\t\t></span\n\t\t\t></button\n\t\t></span\n\t></span\n></span>\n",attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{label:{node:"containerNode",type:"innerHTML"},iconClass:{node:"iconNode",type:"class"}}),_onClick:function(e){
if(this.disabled||this.readOnly){
return false;
}
this._clicked();
return this.onClick(e);
},_onButtonClick:function(e){
if(e.type!="click"&&!(this.type=="submit"||this.type=="reset")){
dojo.stopEvent(e);
}
if(this._onClick(e)===false){
e.preventDefault();
}else{
if(this.type=="submit"&&!this.focusNode.form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _279=dijit.byNode(node);
if(_279&&typeof _279._onSubmit=="function"){
_279._onSubmit(e);
break;
}
}
}
}
},_setValueAttr:function(_27a){
var attr=this.attributeMap.value||"";
if(this[attr.node||attr||"domNode"].tagName=="BUTTON"){
if(_27a!=this.value){
console.debug("Cannot change the value attribute on a Button widget.");
}
}
},_fillContent:function(_27c){
if(_27c&&!("label" in this.params)){
this.attr("label",_27c.innerHTML);
}
},postCreate:function(){
if(this.showLabel==false){
dojo.addClass(this.containerNode,"dijitDisplayNone");
}
dojo.setSelectable(this.focusNode,false);
this.inherited(arguments);
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_27f){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use attr('label', ...) instead.","","2.0");
this.attr("label",_27f);
},_setLabelAttr:function(_280){
this.containerNode.innerHTML=this.label=_280;
this._layoutHack();
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:"<span class=\"dijit dijitReset dijitLeft dijitInline\"\n\tdojoAttachEvent=\"onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey\"\n\t><span class='dijitReset dijitRight dijitInline'\n\t\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\t\t><button class=\"dijitReset dijitStretch dijitButtonContents\" \n\t\t\t\t${nameAttrSetting} type=\"${type}\" value=\"${value}\"\n\t\t\t\tdojoAttachPoint=\"focusNode,titleNode\" \n\t\t\t\twaiRole=\"button\" waiState=\"haspopup-true,labelledby-${id}_label\"\n\t\t\t\t><span class=\"dijitReset dijitInline\" \n\t\t\t\t\tdojoAttachPoint=\"iconNode\"\n\t\t\t\t></span\n\t\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"  \n\t\t\t\t\tdojoAttachPoint=\"containerNode,popupStateNode\" \n\t\t\t\t\tid=\"${id}_label\"\n\t\t\t\t></span\n\t\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\">&thinsp;</span\n\t\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t\t></button\n\t\t></span\n\t></span\n></span>\n",_fillContent:function(){
if(this.srcNodeRef){
var _281=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_281[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown){
var _282=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_282);
delete this.dropDownContainer;
}
dijit.popup.prepare(this.dropDown.domNode);
this.inherited(arguments);
},destroyDescendants:function(){
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
this.inherited(arguments);
},_onArrowClick:function(e){
if(this.disabled||this.readOnly){
return;
}
this._toggleDropDown();
},_onDropDownClick:function(e){
var _285=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!_285||e.detail!=0||this._seenKeydown){
this._onArrowClick(e);
}
this._seenKeydown=false;
},_onDropDownKeydown:function(e){
this._seenKeydown=true;
},_onDropDownBlur:function(e){
this._seenKeydown=false;
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
if(e.charOrCode==dojo.keys.DOWN_ARROW){
if(!this.dropDown||this.dropDown.domNode.style.visibility=="hidden"){
dojo.stopEvent(e);
this._toggleDropDown();
}
}
},_onBlur:function(){
this._closeDropDown();
this.inherited(arguments);
},_toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
dijit.focus(this.popupStateNode);
var _289=this.dropDown;
if(!_289){
return;
}
if(!this._opened){
if(_289.href&&!_289.isLoaded){
var self=this;
var _28b=dojo.connect(_289,"onLoad",function(){
dojo.disconnect(_28b);
self._openDropDown();
});
_289.refresh();
return;
}else{
this._openDropDown();
}
}else{
this._closeDropDown();
}
},_openDropDown:function(){
var _28c=this.dropDown;
var _28d=_28c.domNode.style.width;
var self=this;
dijit.popup.open({parent:this,popup:_28c,around:this.domNode,orient:this.isLeftToRight()?{"BL":"TL","BR":"TR","TL":"BL","TR":"BR"}:{"BR":"TR","BL":"TL","TR":"BR","TL":"BL"},onExecute:function(){
self._closeDropDown(true);
},onCancel:function(){
self._closeDropDown(true);
},onClose:function(){
_28c.domNode.style.width=_28d;
self.popupStateNode.removeAttribute("popupActive");
self._opened=false;
}});
if(this.domNode.offsetWidth>_28c.domNode.offsetWidth){
var _28f=null;
if(!this.isLeftToRight()){
_28f=_28c.domNode.parentNode;
var _290=_28f.offsetLeft+_28f.offsetWidth;
}
dojo.marginBox(_28c.domNode,{w:this.domNode.offsetWidth});
if(_28f){
_28f.style.left=_290-this.domNode.offsetWidth+"px";
}
}
this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(_28c.focus){
_28c.focus();
}
},_closeDropDown:function(_291){
if(this._opened){
dijit.popup.close(this.dropDown);
if(_291){
this.focus();
}
this._opened=false;
}
}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:"<table class='dijit dijitReset dijitInline dijitLeft'\n\tcellspacing='0' cellpadding='0' waiRole=\"presentation\"\n\t><tbody waiRole=\"presentation\"><tr waiRole=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\"\n\t\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse\"  dojoAttachPoint=\"titleNode\"\n\t\t\twaiRole=\"button\" waiState=\"labelledby-${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline\" dojoAttachPoint=\"iconNode\" waiRole=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" dojoAttachPoint=\"containerNode\" waiRole=\"presentation\"></div\n\t\t></td\n\t\t><td class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton'\n\t\t\tdojoAttachPoint=\"popupStateNode,focusNode\"\n\t\t\tdojoAttachEvent=\"ondijitclick:_onArrowClick, onkeypress:_onKey,onmouseenter:_onMouse,onmouseleave:_onMouse\"\n\t\t\tstateModifier=\"DownArrow\"\n\t\t\ttitle=\"${optionsTitle}\" ${nameAttrSetting}\n\t\t\twaiRole=\"button\" waiState=\"haspopup-true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" waiRole=\"presentation\">&thinsp;</div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" waiRole=\"presentation\">&#9660;</div\n\t\t></td\n\t></tr></tbody\n></table>\n",attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{id:"",tabIndex:["focusNode","titleNode"]}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){
this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
dojo.forEach(this._focalNodes,dojo.hitch(this,function(node){
if(dojo.isIE){
this.connect(node,"onactivate",this._onNodeFocus);
this.connect(node,"ondeactivate",this._onNodeBlur);
}else{
this.connect(node,"onfocus",this._onNodeFocus);
this.connect(node,"onblur",this._onNodeBlur);
}
}));
},focusFocalNode:function(node){
this._focusedNode=node;
dijit.focus(node);
},hasNextFocalNode:function(){
return this._focusedNode!==this.getFocalNodes()[1];
},focusNext:function(){
this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode);
},hasPrevFocalNode:function(){
return this._focusedNode!==this.getFocalNodes()[0];
},focusPrev:function(){
this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode);
},getFocalNodes:function(){
return this._focalNodes;
},_onNodeFocus:function(evt){
this._focusedNode=evt.currentTarget;
var fnc=this._focusedNode==this.focusNode?"dijitDownArrowButtonFocused":"dijitButtonContentsFocused";
dojo.addClass(this._focusedNode,fnc);
},_onNodeBlur:function(evt){
var fnc=evt.currentTarget==this.focusNode?"dijitDownArrowButtonFocused":"dijitButtonContentsFocused";
dojo.removeClass(evt.currentTarget,fnc);
},_onBlur:function(){
this.inherited(arguments);
this._focusedNode=null;
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(evt){
this.attr("checked",!this.checked);
},_setCheckedAttr:function(_299){
this.checked=_299;
dojo.attr(this.focusNode||this.domNode,"checked",_299);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_299);
this._setStateClass();
this._handleOnChange(_299,true);
},setChecked:function(_29a){
dojo.deprecated("setChecked("+_29a+") is deprecated. Use attr('checked',"+_29a+") instead.","","2.0");
this.attr("checked",_29a);
},reset:function(){
this._hasBeenBlurred=false;
this.attr("checked",this.params.checked||false);
}});
}
if(!dojo._hasResource["dojo.dnd.common"]){
dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._isMac=navigator.appVersion.indexOf("Macintosh")>=0;
dojo.dnd._copyKey=dojo.dnd._isMac?"metaKey":"ctrlKey";
dojo.dnd.getCopyKeyState=function(e){
return e[dojo.dnd._copyKey];
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++dojo.dnd._uniqueId);
}while(dojo.byId(id));
return id;
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
dojo.dnd._lmb=dojo.isIE?1:0;
dojo.dnd._isLmbPressed=dojo.isIE?function(e){
return e.button&1;
}:function(e){
return e.button===0;
};
}
if(!dojo._hasResource["dojo.dnd.autoscroll"]){
dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){
var d=dojo.doc,dd=d.documentElement,w=window,b=dojo.body();
if(dojo.isMozilla){
return {w:dd.clientWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&w.innerWidth){
return {w:w.innerWidth,h:w.innerHeight};
}else{
if(!dojo.isOpera&&dd&&dd.clientWidth){
return {w:dd.clientWidth,h:dd.clientHeight};
}else{
if(b.clientWidth){
return {w:b.clientWidth,h:b.clientHeight};
}
}
}
}
return null;
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){
var v=dojo.dnd.getViewport(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=-dojo.dnd.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=dojo.dnd.H_AUTOSCROLL_VALUE;
}
}
if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=-dojo.dnd.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=dojo.dnd.V_AUTOSCROLL_VALUE;
}
}
window.scrollBy(dx,dy);
};
dojo.dnd._validNodes={"div":1,"p":1,"td":1};
dojo.dnd._validOverflow={"auto":1,"scroll":1};
dojo.dnd.autoScrollNodes=function(e){
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n);
if(s.overflow.toLowerCase() in dojo.dnd._validOverflow){
var b=dojo._getContentBox(n,s),t=dojo._abs(n,true);
var w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-t.x,ry=e.pageY-t.y,dx=0,dy=0;
if(dojo.isWebKit||dojo.isOpera){
rx+=dojo.body().scrollLeft,ry+=dojo.body().scrollTop;
}
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
}
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
}
var _2b4=n.scrollLeft,_2b5=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(_2b4!=n.scrollLeft||_2b5!=n.scrollTop){
return;
}
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
dojo.dnd.autoScroll(e);
};
}
if(!dojo._hasResource["dojo.dnd.Mover"]){
dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(node,e,host){
this.node=dojo.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=this.host=host,d=node.ownerDocument,_2bb=dojo.connect(d,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(d,"onmousemove",this,"onMouseMove"),dojo.connect(d,"onmouseup",this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent),_2bb];
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY});
dojo.stopEvent(e);
},onMouseUp:function(e){
if(dojo.isWebKit&&dojo.dnd._isMac&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
dojo.stopEvent(e);
},onFirstMove:function(){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left));
t=Math.round(parseFloat(s.top));
break;
default:
s.position="absolute";
var m=dojo.marginBox(this.node);
var b=dojo.doc.body;
var bs=dojo.getComputedStyle(b);
var bm=dojo._getMarginBox(b,bs);
var bc=dojo._getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this);
}
dojo.disconnect(this.events.pop());
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
}
if(!dojo._hasResource["dojo.dnd.Moveable"]){
dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(node,_2ca){
this.node=dojo.byId(node);
if(!_2ca){
_2ca={};
}
this.handle=_2ca.handle?dojo.byId(_2ca.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_2ca.delay>0?_2ca.delay:0;
this.skip=_2ca.skip;
this.mover=_2ca.mover?_2ca.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_2cb,node){
return new dojo.dnd.Moveable(node,_2cb);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"),dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_2d3){
dojo.publish("/dnd/move/start",[_2d3]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_2d4){
dojo.publish("/dnd/move/stop",[_2d4]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_2d5){
},onMove:function(_2d6,_2d7){
this.onMoving(_2d6,_2d7);
var s=_2d6.node.style;
s.left=_2d7.l+"px";
s.top=_2d7.t+"px";
this.onMoved(_2d6,_2d7);
},onMoving:function(_2d9,_2da){
},onMoved:function(_2db,_2dc){
}});
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_2dd,node){
return new dojo.dnd.move.constrainedMoveable(node,_2dd);
},constructor:function(node,_2e0){
if(!_2e0){
_2e0={};
}
this.constraints=_2e0.constraints;
this.within=_2e0.within;
},onFirstMove:function(_2e1){
var c=this.constraintBox=this.constraints.call(this,_2e1);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo.marginBox(_2e1.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_2e4,_2e5){
var c=this.constraintBox,s=_2e4.node.style;
s.left=(_2e5.l<c.l?c.l:c.r<_2e5.l?c.r:_2e5.l)+"px";
s.top=(_2e5.t<c.t?c.t:c.b<_2e5.t?c.b:_2e5.t)+"px";
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_2e8,node){
return new dojo.dnd.move.boxConstrainedMoveable(node,_2e8);
},constructor:function(node,_2eb){
var box=_2eb&&_2eb.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_2ed,node){
return new dojo.dnd.move.parentConstrainedMoveable(node,_2ed);
},constructor:function(node,_2f0){
var area=_2f0&&_2f0.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(area=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
dojo.dnd.move.constrainedMover=function(fun,_2f7){
dojo.deprecated("dojo.dnd.move.constrainedMover, use dojo.dnd.move.constrainedMoveable instead");
var _2f8=function(node,e,_2fb){
dojo.dnd.Mover.call(this,node,e,_2fb);
};
dojo.extend(_2f8,dojo.dnd.Mover.prototype);
dojo.extend(_2f8,{onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox,c=this.constraintBox,l=m.l+e.pageX,t=m.t+e.pageY;
l=l<c.l?c.l:c.r<l?c.r:l;
t=t<c.t?c.t:c.b<t?c.b:t;
this.host.onMove(this,{l:l,t:t});
},onFirstMove:function(){
dojo.dnd.Mover.prototype.onFirstMove.call(this);
var c=this.constraintBox=fun.call(this);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(_2f7){
var mb=dojo.marginBox(this.node);
c.r-=mb.w;
c.b-=mb.h;
}
}});
return _2f8;
};
dojo.dnd.move.boxConstrainedMover=function(box,_304){
dojo.deprecated("dojo.dnd.move.boxConstrainedMover, use dojo.dnd.move.boxConstrainedMoveable instead");
return dojo.dnd.move.constrainedMover(function(){
return box;
},_304);
};
dojo.dnd.move.parentConstrainedMover=function(area,_306){
dojo.deprecated("dojo.dnd.move.parentConstrainedMover, use dojo.dnd.move.parentConstrainedMoveable instead");
var fun=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(area=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
return dojo.dnd.move.constrainedMover(fun,_306);
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover;
}
if(!dojo._hasResource["dojo.dnd.TimedMoveable"]){
dojo._hasResource["dojo.dnd.TimedMoveable"]=true;
dojo.provide("dojo.dnd.TimedMoveable");
(function(){
var _30c=dojo.dnd.Moveable.prototype.onMove;
dojo.declare("dojo.dnd.TimedMoveable",dojo.dnd.Moveable,{timeout:40,constructor:function(node,_30e){
if(!_30e){
_30e={};
}
if(_30e.timeout&&typeof _30e.timeout=="number"&&_30e.timeout>=0){
this.timeout=_30e.timeout;
}
},markupFactory:function(_30f,node){
return new dojo.dnd.TimedMoveable(node,_30f);
},onMoveStop:function(_311){
if(_311._timer){
clearTimeout(_311._timer);
_30c.call(this,_311,_311._leftTop);
}
dojo.dnd.Moveable.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_312,_313){
_312._leftTop=_313;
if(!_312._timer){
var _t=this;
_312._timer=setTimeout(function(){
_312._timer=null;
_30c.call(_t,_312,_312._leftTop);
},this.timeout);
}
}});
})();
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{constructor:function(args){
var _t=this;
dojo.mixin(_t,args);
_t.node=args.node;
_t._showArgs=dojo.mixin({},args);
_t._showArgs.node=_t.node;
_t._showArgs.duration=_t.showDuration;
_t.showAnim=_t.showFunc(_t._showArgs);
_t._hideArgs=dojo.mixin({},args);
_t._hideArgs.node=_t.node;
_t._hideArgs.duration=_t.hideDuration;
_t.hideAnim=_t.hideFunc(_t._hideArgs);
dojo.connect(_t.showAnim,"beforeBegin",dojo.hitch(_t.hideAnim,"stop",true));
dojo.connect(_t.hideAnim,"beforeBegin",dojo.hitch(_t.showAnim,"stop",true));
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(_317){
return this.showAnim.play(_317||0);
},hide:function(_318){
return this.hideAnim.play(_318||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_31a={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _31d=function(_31e){
this._index=-1;
this._animations=_31e||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_31d,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
d.disconnect(this._onAnimateCtx);
d.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_320,_321){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_321&&this._current.status()=="playing"){
return this;
}
var _322=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_323=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_325=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_322);
d.disconnect(_323);
d.disconnect(_325);
});
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=d.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
d.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_329,_32a){
this.pause();
var _32b=this.duration*_329;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_32b){
this._current=a;
return true;
}
_32b-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_32b/this._current.duration,_32a);
}
return this;
},stop:function(_32d){
if(this._current){
if(_32d){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=d.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
d.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
}});
d.extend(_31d,_31a);
dojo.fx.chain=function(_330){
return new _31d(_330);
};
var _331=function(_332){
this._animations=_332||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_332,function(a){
var _334=a.duration;
if(a.delay){
_334+=a.delay;
}
if(this.duration<_334){
this.duration=_334;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d._Animation({curve:[0,1],duration:this.duration});
var self=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop"],function(evt){
self._connects.push(d.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
d.extend(_331,{_doAction:function(_337,args){
d.forEach(this._animations,function(a){
a[_337].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished==this._animations.length){
this._fire("onEnd");
}
},_call:function(_33a,args){
var t=this._pseudoAnimation;
t[_33a].apply(t,args);
},play:function(_33d,_33e){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_33f,_340){
var ms=this.duration*_33f;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_340);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_343){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_331,_31a);
dojo.fx.combine=function(_344){
return new _331(_344);
};
dojo.fx.wipeIn=function(args){
args.node=d.byId(args.node);
var node=args.node,s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _34a=d.style(node,"height");
return Math.max(_34a,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
d.connect(anim,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return anim;
};
dojo.fx.wipeOut=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{end:1}}},args));
d.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(anim,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return anim;
};
dojo.fx.slideTo=function(args){
var node=args.node=d.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=d.animateProperty(d.mixin({properties:{top:args.top||0,left:args.left||0}},args));
d.connect(anim,"beforeBegin",anim,init);
return anim;
};
})();
}
if(!dojo._hasResource["dijit.form._FormMixin"]){
dojo._hasResource["dijit.form._FormMixin"]=true;
dojo.provide("dijit.form._FormMixin");
dojo.declare("dijit.form._FormMixin",null,{reset:function(){
dojo.forEach(this.getDescendants(),function(_35a){
if(_35a.reset){
_35a.reset();
}
});
},validate:function(){
var _35b=false;
return dojo.every(dojo.map(this.getDescendants(),function(_35c){
_35c._hasBeenBlurred=true;
var _35d=_35c.disabled||!_35c.validate||_35c.validate();
if(!_35d&&!_35b){
dijit.scrollIntoView(_35c.containerNode||_35c.domNode);
_35c.focus();
_35b=true;
}
return _35d;
}),function(item){
return item;
});
},setValues:function(val){
dojo.deprecated(this.declaredClass+"::setValues() is deprecated. Use attr('value', val) instead.","","2.0");
return this.attr("value",val);
},_setValueAttr:function(obj){
var map={};
dojo.forEach(this.getDescendants(),function(_362){
if(!_362.name){
return;
}
var _363=map[_362.name]||(map[_362.name]=[]);
_363.push(_362);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _365=map[name],_366=dojo.getObject(name,false,obj);
if(_366===undefined){
continue;
}
if(!dojo.isArray(_366)){
_366=[_366];
}
if(typeof _365[0].checked=="boolean"){
dojo.forEach(_365,function(w,i){
w.attr("value",dojo.indexOf(_366,w.value)!=-1);
});
}else{
if(_365[0]._multiValue){
_365[0].attr("value",_366);
}else{
dojo.forEach(_365,function(w,i){
w.attr("value",_366[i]);
});
}
}
}
},getValues:function(){
dojo.deprecated(this.declaredClass+"::getValues() is deprecated. Use attr('value') instead.","","2.0");
return this.attr("value");
},_getValueAttr:function(){
var obj={};
dojo.forEach(this.getDescendants(),function(_36c){
var name=_36c.name;
if(!name||_36c.disabled){
return;
}
var _36e=_36c.attr("value");
if(typeof _36c.checked=="boolean"){
if(/Radio/.test(_36c.declaredClass)){
if(_36e!==false){
dojo.setObject(name,_36e,obj);
}else{
_36e=dojo.getObject(name,false,obj);
if(_36e===undefined){
dojo.setObject(name,null,obj);
}
}
}else{
var ary=dojo.getObject(name,false,obj);
if(!ary){
ary=[];
dojo.setObject(name,ary,obj);
}
if(_36e!==false){
ary.push(_36e);
}
}
}else{
dojo.setObject(name,_36e,obj);
}
});
return obj;
},isValid:function(){
this._invalidWidgets=dojo.filter(this.getDescendants(),function(_370){
return !_370.disabled&&_370.isValid&&!_370.isValid();
});
return !this._invalidWidgets.length;
},onValidStateChange:function(_371){
},_widgetChange:function(_372){
var _373=this._lastValidState;
if(!_372||this._lastValidState===undefined){
_373=this.isValid();
if(this._lastValidState===undefined){
this._lastValidState=_373;
}
}else{
if(_372.isValid){
this._invalidWidgets=dojo.filter(this._invalidWidgets||[],function(w){
return (w!=_372);
},this);
if(!_372.isValid()&&!_372.attr("disabled")){
this._invalidWidgets.push(_372);
}
_373=(this._invalidWidgets.length===0);
}
}
if(_373!==this._lastValidState){
this._lastValidState=_373;
this.onValidStateChange(_373);
}
},connectChildren:function(){
dojo.forEach(this._changeConnections,dojo.hitch(this,"disconnect"));
var _375=this;
var _376=this._changeConnections=[];
dojo.forEach(dojo.filter(this.getDescendants(),function(item){
return item.validate;
}),function(_378){
_376.push(_375.connect(_378,"validate",dojo.hitch(_375,"_widgetChange",_378)));
_376.push(_375.connect(_378,"_setDisabledAttr",dojo.hitch(_375,"_widgetChange",_378)));
});
this._widgetChange(null);
},startup:function(){
this.inherited(arguments);
this._changeConnections=[];
this.connectChildren();
}});
}
if(!dojo._hasResource["dijit._DialogMixin"]){
dojo._hasResource["dijit._DialogMixin"]=true;
dojo.provide("dijit._DialogMixin");
dojo.declare("dijit._DialogMixin",null,{attributeMap:dijit._Widget.prototype.attributeMap,execute:function(_379){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.attr("value"));
},_getFocusItems:function(_37a){
var _37b=dijit._getTabNavigable(dojo.byId(_37a));
this._firstFocusItem=_37b.lowest||_37b.first||_37a;
this._lastFocusItem=_37b.last||_37b.highest||this._firstFocusItem;
if(dojo.isMoz&&this._firstFocusItem.tagName.toLowerCase()=="input"&&dojo.attr(this._firstFocusItem,"type").toLowerCase()=="file"){
dojo.attr(_37a,"tabindex","0");
this._firstFocusItem=_37a;
}
}});
}
if(!dojo._hasResource["dijit.DialogUnderlay"]){
dojo._hasResource["dijit.DialogUnderlay"]=true;
dojo.provide("dijit.DialogUnderlay");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' dojoAttachPoint='node'></div></div>",dialogId:"","class":"",attributeMap:{id:"domNode"},_setDialogIdAttr:function(id){
dojo.attr(this.node,"id",id+"_underlay");
},_setClassAttr:function(_37d){
this.node.className="dijitDialogUnderlay "+_37d;
},postCreate:function(){
dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _380=dijit.getViewport();
os.top=_380.t+"px";
os.left=_380.l+"px";
is.width=_380.w+"px";
is.height=_380.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="block";
}
},hide:function(){
this.domNode.style.display="none";
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="none";
}
},uninitialize:function(){
if(this.bgIframe){
this.bgIframe.destroy();
}
}});
}
if(!dojo._hasResource["dijit._Contained"]){
dojo._hasResource["dijit._Contained"]=true;
dojo.provide("dijit._Contained");
dojo.declare("dijit._Contained",null,{getParent:function(){
for(var p=this.domNode.parentNode;p;p=p.parentNode){
var id=p.getAttribute&&p.getAttribute("widgetId");
if(id){
var _383=dijit.byId(id);
return _383.isContainer?_383:null;
}
}
return null;
},_getSibling:function(_384){
var node=this.domNode;
do{
node=node[_384+"Sibling"];
}while(node&&node.nodeType!=1);
if(!node){
return null;
}
var id=node.getAttribute("widgetId");
return dijit.byId(id);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
}
if(!dojo._hasResource["dijit.layout._LayoutWidget"]){
dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,postCreate:function(){
dojo.addClass(this.domNode,"dijitContainer");
dojo.addClass(this.domNode,this.baseClass);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_388){
_388.startup();
});
if(!this.getParent||!this.getParent()){
this.resize();
this._viewport=dijit.getViewport();
this.connect(dojo.global,"onresize",function(){
var _389=dijit.getViewport();
if(_389.w!=this._viewport.w||_389.h!=this._viewport.h){
this._viewport=_389;
this.resize();
}
});
}
this.inherited(arguments);
},resize:function(_38a,_38b){
var node=this.domNode;
if(_38a){
dojo.marginBox(node,_38a);
if(_38a.t){
node.style.top=_38a.t+"px";
}
if(_38a.l){
node.style.left=_38a.l+"px";
}
}
var mb=_38b||{};
dojo.mixin(mb,_38a||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(node),mb);
}
var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var be=dojo._getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=dojo._getPadExtents(node,cs);
this._contentBox={l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_393){
dojo.addClass(_393.domNode,this.baseClass+"-child");
if(_393.baseClass){
dojo.addClass(_393.domNode,this.baseClass+"-"+_393.baseClass);
}
},addChild:function(_394,_395){
this.inherited(arguments);
if(this._started){
this._setupChild(_394);
}
},removeChild:function(_396){
dojo.removeClass(_396.domNode,this.baseClass+"-child");
if(_396.baseClass){
dojo.removeClass(_396.domNode,this.baseClass+"-"+_396.baseClass);
}
this.inherited(arguments);
}});
dijit.layout.marginBox2contentBox=function(node,mb){
var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var pb=dojo._getPadBorderExtents(node,cs);
return {l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
(function(){
var _39c=function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
var size=function(_39f,dim){
_39f.resize?_39f.resize(dim):dojo.marginBox(_39f.domNode,dim);
dojo.mixin(_39f,dojo.marginBox(_39f.domNode));
dojo.mixin(_39f,dim);
};
dijit.layout.layoutChildren=function(_3a1,dim,_3a3){
dim=dojo.mixin({},dim);
dojo.addClass(_3a1,"dijitLayoutContainer");
_3a3=dojo.filter(_3a3,function(item){
return item.layoutAlign!="client";
}).concat(dojo.filter(_3a3,function(item){
return item.layoutAlign=="client";
}));
dojo.forEach(_3a3,function(_3a6){
var elm=_3a6.domNode,pos=_3a6.layoutAlign;
var _3a9=elm.style;
_3a9.left=dim.l+"px";
_3a9.top=dim.t+"px";
_3a9.bottom=_3a9.right="auto";
dojo.addClass(elm,"dijitAlign"+_39c(pos));
if(pos=="top"||pos=="bottom"){
size(_3a6,{w:dim.w});
dim.h-=_3a6.h;
if(pos=="top"){
dim.t+=_3a6.h;
}else{
_3a9.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
size(_3a6,{h:dim.h});
dim.w-=_3a6.w;
if(pos=="left"){
dim.l+=_3a6.w;
}else{
_3a9.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"){
size(_3a6,dim);
}
}
}
});
};
})();
}
if(!dojo._hasResource["dojo.html"]){
dojo._hasResource["dojo.html"]=true;
dojo.provide("dojo.html");
(function(){
var _3aa=0;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=dojo.empty;
dojo.html._setNodeContent=function(node,cont,_3ae){
if(_3ae){
dojo.html._emptyNode(node);
}
if(typeof cont=="string"){
var pre="",post="",walk=0,name=node.nodeName.toLowerCase();
switch(name){
case "tr":
pre="<tr>";
post="</tr>";
walk+=1;
case "tbody":
case "thead":
pre="<tbody>"+pre;
post+="</tbody>";
walk+=1;
case "table":
pre="<table>"+pre;
post+="</table>";
walk+=1;
break;
}
if(walk){
var n=node.ownerDocument.createElement("div");
n.innerHTML=pre+cont+post;
do{
n=n.firstChild;
}while(--walk);
dojo.forEach(n.childNodes,function(n){
node.appendChild(n.cloneNode(true));
});
}else{
node.innerHTML=cont;
}
}else{
if(cont.nodeType){
node.appendChild(cont);
}else{
dojo.forEach(cont,function(n){
node.appendChild(n.cloneNode(true));
});
}
}
return node;
};
dojo.declare("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,constructor:function(_3b6,node){
dojo.mixin(this,_3b6||{});
node=this.node=dojo.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_3aa++].join("_");
}
if(!(this.node||node)){
new Error(this.declaredClass+": no node provided to "+this.id);
}
},set:function(cont,_3b9){
if(undefined!==cont){
this.content=cont;
}
if(_3b9){
this._mixin(_3b9);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var node=this.node;
if(!node){
console.error("setContent given no node");
}
try{
node=dojo.html._setNodeContent(node,this.content);
}
catch(e){
var _3bb=this.onContentError(e);
try{
node.innerHTML=_3bb;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
dojo.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
dojo.html._emptyNode(this.node);
},onBegin:function(){
var cont=this.content;
if(dojo.isString(cont)){
if(this.cleanContent){
cont=dojo.html._secureForInnerHtml(cont);
}
if(this.extractContent){
var _3be=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_3be){
cont=_3be[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occured setting content: "+err;
},_mixin:function(_3c0){
var _3c1={},key;
for(key in _3c0){
if(key in _3c1){
continue;
}
this[key]=_3c0[key];
}
},_parse:function(){
var _3c3=this.node;
try{
this.parseResults=dojo.parser.parse(_3c3,true);
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_3c6){
var _3c7=this["on"+type+"Error"].call(this,err);
if(_3c6){
console.error(_3c6,err);
}else{
if(_3c7){
dojo.html._setNodeContent(this.node,_3c7,true);
}
}
}});
dojo.html.set=function(node,cont,_3ca){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_3ca){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(dojo.mixin(_3ca,{content:cont,node:node}));
return op.set();
}
};
})();
}
if(!dojo._hasResource["dojo.i18n"]){
dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(_3cc,_3cd,_3ce){
_3ce=dojo.i18n.normalizeLocale(_3ce);
var _3cf=_3ce.split("-");
var _3d0=[_3cc,"nls",_3cd].join(".");
var _3d1=dojo._loadedModules[_3d0];
if(_3d1){
var _3d2;
for(var i=_3cf.length;i>0;i--){
var loc=_3cf.slice(0,i).join("_");
if(_3d1[loc]){
_3d2=_3d1[loc];
break;
}
}
if(!_3d2){
_3d2=_3d1.ROOT;
}
if(_3d2){
var _3d5=function(){
};
_3d5.prototype=_3d2;
return new _3d5();
}
}
throw new Error("Bundle not found: "+_3cd+" in "+_3cc+" , locale="+_3ce);
};
dojo.i18n.normalizeLocale=function(_3d6){
var _3d7=_3d6?_3d6.toLowerCase():dojo.locale;
if(_3d7=="root"){
_3d7="ROOT";
}
return _3d7;
};
dojo.i18n._requireLocalization=function(_3d8,_3d9,_3da,_3db){
var _3dc=dojo.i18n.normalizeLocale(_3da);
var _3dd=[_3d8,"nls",_3d9].join(".");
var _3de="";
if(_3db){
var _3df=_3db.split(",");
for(var i=0;i<_3df.length;i++){
if(_3dc["indexOf"](_3df[i])==0){
if(_3df[i].length>_3de.length){
_3de=_3df[i];
}
}
}
if(!_3de){
_3de="ROOT";
}
}
var _3e1=_3db?_3de:_3dc;
var _3e2=dojo._loadedModules[_3dd];
var _3e3=null;
if(_3e2){
if(dojo.config.localizationComplete&&_3e2._built){
return;
}
var _3e4=_3e1.replace(/-/g,"_");
var _3e5=_3dd+"."+_3e4;
_3e3=dojo._loadedModules[_3e5];
}
if(!_3e3){
_3e2=dojo["provide"](_3dd);
var syms=dojo._getModuleSymbols(_3d8);
var _3e7=syms.concat("nls").join("/");
var _3e8;
dojo.i18n._searchLocalePath(_3e1,_3db,function(loc){
var _3ea=loc.replace(/-/g,"_");
var _3eb=_3dd+"."+_3ea;
var _3ec=false;
if(!dojo._loadedModules[_3eb]){
dojo["provide"](_3eb);
var _3ed=[_3e7];
if(loc!="ROOT"){
_3ed.push(loc);
}
_3ed.push(_3d9);
var _3ee=_3ed.join("/")+".js";
_3ec=dojo._loadPath(_3ee,null,function(hash){
var _3f0=function(){
};
_3f0.prototype=_3e8;
_3e2[_3ea]=new _3f0();
for(var j in hash){
_3e2[_3ea][j]=hash[j];
}
});
}else{
_3ec=true;
}
if(_3ec&&_3e2[_3ea]){
_3e8=_3e2[_3ea];
}else{
_3e2[_3ea]=_3e8;
}
if(_3db){
return true;
}
});
}
if(_3db&&_3dc!=_3de){
_3e2[_3dc.replace(/-/g,"_")]=_3e2[_3de.replace(/-/g,"_")];
}
};
(function(){
var _3f2=dojo.config.extraLocale;
if(_3f2){
if(!_3f2 instanceof Array){
_3f2=[_3f2];
}
var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,_3f6,_3f7){
req(m,b,_3f6,_3f7);
if(_3f6){
return;
}
for(var i=0;i<_3f2.length;i++){
req(m,b,_3f2[i],_3f7);
}
};
}
})();
dojo.i18n._searchLocalePath=function(_3f9,down,_3fb){
_3f9=dojo.i18n.normalizeLocale(_3f9);
var _3fc=_3f9.split("-");
var _3fd=[];
for(var i=_3fc.length;i>0;i--){
_3fd.push(_3fc.slice(0,i).join("-"));
}
_3fd.push(false);
if(down){
_3fd.reverse();
}
for(var j=_3fd.length-1;j>=0;j--){
var loc=_3fd[j]||"ROOT";
var stop=_3fb(loc);
if(stop){
break;
}
}
};
dojo.i18n._preloadLocalizations=function(_402,_403){
function _404(_405){
_405=dojo.i18n.normalizeLocale(_405);
dojo.i18n._searchLocalePath(_405,true,function(loc){
for(var i=0;i<_403.length;i++){
if(_403[i]==loc){
dojo["require"](_402+"_"+loc);
return true;
}
}
return false;
});
};
_404();
var _408=dojo.config.extraLocale||[];
for(var i=0;i<_408.length;i++){
_404(_408[i]);
}
};
}
if(!dojo._hasResource["dijit.layout.ContentPane"]){
dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",doLayout:true,ioArgs:{},isContainer:true,postMixInProperties:function(){
this.inherited(arguments);
var _40a=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,_40a);
this.errorMessage=dojo.string.substitute(this.errorMessage,_40a);
if(!this.href&&this.srcNodeRef&&this.srcNodeRef.innerHTML){
this.isLoaded=true;
}
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},postCreate:function(){
this.domNode.title="";
if(!dojo.attr(this.domNode,"role")){
dijit.setWaiRole(this.domNode,"group");
}
dojo.addClass(this.domNode,this.baseClass);
},startup:function(){
if(this._started){
return;
}
if(this.isLoaded){
dojo.forEach(this.getChildren(),function(_40b){
_40b.startup();
});
if(this.doLayout){
this._checkIfSingleChild();
}
if(!this._singleChild||!dijit._Contained.prototype.getParent.call(this)){
this._scheduleLayout();
}
}
this._loadCheck();
this.inherited(arguments);
},_checkIfSingleChild:function(){
var _40c=dojo.query(">",this.containerNode),_40d=_40c.filter(function(node){
return dojo.hasAttr(node,"dojoType")||dojo.hasAttr(node,"widgetId");
}),_40f=dojo.filter(_40d.map(dijit.byNode),function(_410){
return _410&&_410.domNode&&_410.resize;
});
if(_40c.length==_40d.length&&_40f.length==1){
this._singleChild=_40f[0];
}else{
delete this._singleChild;
}
},setHref:function(href){
dojo.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use attr('href', ...) instead.","","2.0");
return this.attr("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.href=href;
if(this._created&&(this.preload||this._isShown())){
return this.refresh();
}else{
this._hrefChanged=true;
}
},setContent:function(data){
dojo.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use attr('content', ...) instead.","","2.0");
this.attr("content",data);
},_setContentAttr:function(data){
this.href="";
this.cancel();
this._setContent(data||"");
this._isDownloaded=false;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
},uninitialize:function(){
if(this._beingDestroyed){
this.cancel();
}
},destroyRecursive:function(_415){
if(this._beingDestroyed){
return;
}
this._beingDestroyed=true;
this.inherited(arguments);
},resize:function(size){
dojo.marginBox(this.domNode,size);
var node=this.containerNode,mb=dojo.mixin(dojo.marginBox(node),size||{});
var cb=(this._contentBox=dijit.layout.marginBox2contentBox(node,mb));
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize({w:cb.w,h:cb.h});
}
},_isShown:function(){
if("open" in this){
return this.open;
}else{
var node=this.domNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!dojo.hasClass(node,"dijitHidden");
}
},_onShow:function(){
if(this._needLayout){
this._layoutChildren();
}
this._loadCheck();
if(this.onShow){
this.onShow();
}
},_loadCheck:function(){
if((this.href&&!this._xhrDfd)&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)&&(this.preload||this._isShown())){
delete this._hrefChanged;
this.refresh();
}
},refresh:function(){
this.cancel();
this._setContent(this.onDownloadStart(),true);
var self=this;
var _41c={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){
dojo.mixin(_41c,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||dojo.xhrGet)(_41c));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
delete self._xhrDfd;
return html;
});
hand.addErrback(function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
});
},_onLoadHandler:function(data){
this.isLoaded=true;
try{
this.onLoad(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this.isLoaded=false;
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(){
if(this.isLoaded){
this._onUnloadHandler();
}
var _421=this._contentSetter;
dojo.forEach(this.getChildren(),function(_422){
if(_422.destroyRecursive){
_422.destroyRecursive();
}
});
if(_421){
dojo.forEach(_421.parseResults,function(_423){
if(_423.destroyRecursive&&_423.domNode&&_423.domNode.parentNode==dojo.body()){
_423.destroyRecursive();
}
});
delete _421.parseResults;
}
dojo.html._emptyNode(this.containerNode);
},_setContent:function(cont,_425){
this.destroyDescendants();
delete this._singleChild;
var _426=this._contentSetter;
if(!(_426&&_426 instanceof dojo.html._ContentSetter)){
_426=this._contentSetter=new dojo.html._ContentSetter({node:this.containerNode,_onError:dojo.hitch(this,this._onError),onContentError:dojo.hitch(this,function(e){
var _428=this.onContentError(e);
try{
this.containerNode.innerHTML=_428;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _429=dojo.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:this.parseOnLoad},this._contentSetterParams||{});
dojo.mixin(_426,_429);
_426.set((dojo.isObject(cont)&&cont.domNode)?cont.domNode:cont);
delete this._contentSetterParams;
if(!_425){
dojo.forEach(this.getChildren(),function(_42a){
_42a.startup();
});
if(this.doLayout){
this._checkIfSingleChild();
}
this._scheduleLayout();
this._onLoadHandler(cont);
}
},_onError:function(type,err,_42d){
var _42e=this["on"+type+"Error"].call(this,err);
if(_42d){
console.error(_42d,err);
}else{
if(_42e){
this._setContent(_42e,true);
}
}
},_scheduleLayout:function(){
if(this._isShown()){
this._layoutChildren();
}else{
this._needLayout=true;
}
},_layoutChildren:function(){
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||dojo.contentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
dojo.forEach(this.getChildren(),function(_430){
if(_430.resize){
_430.resize();
}
});
}
delete this._needLayout;
},onLoad:function(data){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(_432){
},onDownloadError:function(_433){
return this.errorMessage;
},onDownloadEnd:function(){
}});
}
if(!dojo._hasResource["dijit.TooltipDialog"]){
dojo._hasResource["dijit.TooltipDialog"]=true;
dojo.provide("dijit.TooltipDialog");
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:null,templateString:"<div waiRole=\"presentation\">\n\t<div class=\"dijitTooltipContainer\" waiRole=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" dojoAttachPoint=\"containerNode\" tabindex=\"-1\" waiRole=\"dialog\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" waiRole=\"presentation\"></div>\n</div>\n",postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
this.containerNode.title=this.title;
},orient:function(node,_435,_436){
var c=this._currentOrientClass;
if(c){
dojo.removeClass(this.domNode,c);
}
c="dijitTooltipAB"+(_436.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_436.charAt(0)=="T"?"Below":"Above");
dojo.addClass(this.domNode,c);
this._currentOrientClass=c;
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
this._onShow();
if(this.autofocus){
this._getFocusItems(this.containerNode);
dijit.focus(this._firstFocusItem);
}
},_onKey:function(evt){
var node=evt.target;
var dk=dojo.keys;
if(evt.charOrCode===dk.TAB){
this._getFocusItems(this.containerNode);
}
var _43c=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==dk.ESCAPE){
this.onCancel();
dojo.stopEvent(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===dk.TAB){
if(!_43c){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===dk.TAB&&!evt.shiftKey){
if(!_43c){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(evt);
}else{
if(evt.charOrCode===dk.TAB){
evt.stopPropagation();
}
}
}
}
}});
}
if(!dojo._hasResource["dijit.Dialog"]){
dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin],{templateString:null,templateString:"<div class=\"dijitDialog\" tabindex=\"-1\" waiRole=\"dialog\" waiState=\"labelledby-${id}_title\">\n\t<div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"onclick: onCancel, onmouseenter: _onCloseEnter, onmouseleave: _onCloseLeave\" title=\"${buttonCancel}\">\n\t\t<span dojoAttachPoint=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">close</span>\n\t</span>\n\t</div>\n\t\t<div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n",attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}]}),open:false,duration:dijit.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,_fixSizes:true,postMixInProperties:function(){
var _43d=dojo.i18n.getLocalization("dijit","common");
dojo.mixin(this,_43d);
this.inherited(arguments);
},postCreate:function(){
dojo.style(this.domNode,{visibility:"hidden",position:"absolute",display:"",top:"-9999px"});
dojo.body().appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
this.inherited(arguments);
},_endDrag:function(e){
if(e&&e.node&&e.node===this.domNode){
var vp=dijit.getViewport();
var p=e._leftTop||dojo.coords(e.node,true);
this._relativePosition={t:p.t-vp.t,l:p.l-vp.l};
}
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=(dojo.isIE==6)?new dojo.dnd.TimedMoveable(node,{handle:this.titleBar}):new dojo.dnd.Moveable(node,{handle:this.titleBar,timeout:0});
dojo.subscribe("/dnd/move/stop",this,"_endDrag");
}else{
dojo.addClass(node,"dijitDialogFixed");
}
var _442={dialogId:this.id,"class":dojo.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" ")};
var _444=dijit._underlay;
if(!_444){
_444=dijit._underlay=new dijit.DialogUnderlay(_442);
}
this._fadeIn=dojo.fadeIn({node:node,duration:this.duration,beforeBegin:function(){
_444.attr(_442);
_444.show();
},onEnd:dojo.hitch(this,function(){
if(this.autofocus){
this._getFocusItems(this.domNode);
dijit.focus(this._firstFocusItem);
}
})});
this._fadeOut=dojo.fadeOut({node:node,duration:this.duration,onEnd:function(){
node.style.visibility="hidden";
node.style.top="-9999px";
dijit._underlay.hide();
}});
},uninitialize:function(){
var _445=false;
if(this._fadeIn&&this._fadeIn.status()=="playing"){
_445=true;
this._fadeIn.stop();
}
if(this._fadeOut&&this._fadeOut.status()=="playing"){
_445=true;
this._fadeOut.stop();
}
if(this.open||_445){
dijit._underlay.hide();
}
if(this._moveable){
this._moveable.destroy();
}
},_size:function(){
var mb=dojo.marginBox(this.domNode);
var _447=dijit.getViewport();
if(mb.w>=_447.w||mb.h>=_447.h){
dojo.style(this.containerNode,{width:Math.min(mb.w,Math.floor(_447.w*0.75))+"px",height:Math.min(mb.h,Math.floor(_447.h*0.75))+"px",overflow:"auto",position:"relative"});
}
},_position:function(){
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var node=this.domNode;
var _449=dijit.getViewport();
var p=this._relativePosition;
var mb=p?null:dojo.marginBox(node);
dojo.style(node,{left:Math.floor(_449.l+(p?p.l:(_449.w-mb.w)/2))+"px",top:Math.floor(_449.t+(p?p.t:(_449.h-mb.h)/2))+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var dk=dojo.keys;
var node=evt.target;
if(evt.charOrCode===dk.TAB){
this._getFocusItems(this.domNode);
}
var _44f=(this._firstFocusItem==this._lastFocusItem);
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===dk.TAB){
if(!_44f){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===dk.TAB&&!evt.shiftKey){
if(!_44f){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(evt);
}else{
while(node){
if(node==this.domNode){
if(evt.charOrCode==dk.ESCAPE){
this.onCancel();
}else{
return;
}
}
node=node.parentNode;
}
if(evt.charOrCode!==dk.TAB){
dojo.stopEvent(evt);
}else{
if(!dojo.isOpera){
try{
this._firstFocusItem.focus();
}
catch(e){
}
}
}
}
}
}
},show:function(){
if(this.open){
return;
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOut.status()=="playing"){
this._fadeOut.stop();
}
this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(window,"onresize",this,function(){
var _450=dijit.getViewport();
if(!this._oldViewport||_450.h!=this._oldViewport.h||_450.w!=this._oldViewport.w){
this.layout();
this._oldViewport=_450;
}
}));
this._modalconnects.push(dojo.connect(dojo.doc.documentElement,"onkeypress",this,"_onKey"));
dojo.style(this.domNode,{opacity:0,visibility:""});
if(this._fixSizes){
dojo.style(this.containerNode,{width:"auto",height:"auto"});
}
this.open=true;
this._onShow();
this._size();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
},hide:function(){
if(!this._alreadyInitialized){
return;
}
if(this._fadeIn.status()=="playing"){
this._fadeIn.stop();
}
this._fadeOut.play();
if(this._scrollConnected){
this._scrollConnected=false;
}
dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
if(this.refocus){
this.connect(this._fadeOut,"onEnd",dojo.hitch(dijit,"focus",this._savedFocus));
}
if(this._relativePosition){
delete this._relativePosition;
}
this.open=false;
},layout:function(){
if(this.domNode.style.visibility!="hidden"){
dijit._underlay.layout();
this._position();
}
},destroy:function(){
dojo.forEach(this._modalconnects,dojo.disconnect);
if(this.refocus&&this.open){
setTimeout(dojo.hitch(dijit,"focus",this._savedFocus),25);
}
this.inherited(arguments);
},_onCloseEnter:function(){
dojo.addClass(this.closeButtonNode,"dijitDialogCloseIcon-hover");
},_onCloseLeave:function(){
dojo.removeClass(this.closeButtonNode,"dijitDialogCloseIcon-hover");
}});
}
var agt=navigator.userAgent.toLowerCase();
var is_major=parseInt(navigator.appVersion);
var is_minor=parseFloat(navigator.appVersion);
var is_nav=((dojo.isMozilla>0)||(dojo.isSafari>0));
var is_nav6up=is_nav;
var is_firefox=(dojo.isFF>0);
var is_opera=(dojo.isOpera>0);
var is_ie=(dojo.isIE>0);
var is_ie3=(dojo.isIE==3);
var is_ie4=(dojo.isIE==4);
var is_ie5=(dojo.isIE==5);
var is_ie5_5=(dojo.isIE==5.5);
var is_ie5up=(dojo.isIE>=5);
var is_ie5_5up=(dojo.isIE>=5.5);
var is_ie6=(dojo.isIE==6);
var is_ie6up=(dojo.isIE>=6);
var is_ie7=(dojo.isIE==7);
var is_iframe_compliant=(is_ie5up||is_nav6up||is_opera||(dojo.isChrome>0));
var is_win=((agt.indexOf("win")!=-1)||(agt.indexOf("32bit")!=-1));
var is_mac=(agt.indexOf("mac")!=-1);
function activeXCheck(){
document.cookie="ActiveXEnabled=true; path=/";
if(is_ie){
try{
if(window.ActiveXObject){
return new ActiveXObject(getControlPrefix()+".XmlHttp");
}
}
catch(ex){
if(window.XMLHttpRequest==undefined){
document.cookie="ActiveXEnabled=false; path=/";
}
}
}
};
function getControlPrefix(){
if(getControlPrefix.prefix){
return getControlPrefix.prefix;
}
var _451=["MSXML2","Microsoft","MSXML","MSXML3"];
var o,o2;
for(var i=0;i<_451.length;i++){
try{
o=new ActiveXObject(_451[i]+".XmlHttp");
o2=new ActiveXObject(_451[i]+".XmlDom");
return getControlPrefix.prefix=_451[i];
}
catch(ex){
}
}
throw new Error("Could not find an installed XML parser");
};
activeXCheck();
function openPromoWindow(_455,_456){
var _457=(document.cookie.indexOf(_456)==-1);
var _458=document.cookie.indexOf(_456+"viewed=");
if(_457&&(_458==-1)){
var _459=window.open(_455,"SitePromotions","noresizable,noscrollbars,screenX=100, screenY=100,width=310,height=230");
_459.moveTo(100,100);
}
};
function detectIframeAdobe(_45a,_45b,_45c){
var _45d=createCatalogUrlString(_45a,_45b,_45c);
window.location=_45d;
};
function createCatalogUrlString(_45e,_45f,_460){
var _461,_462=false;
var _463=false;
if(is_iframe_compliant){
_462=detectAdobe();
}
var _464="?";
var _465="browserCompatable="+is_iframe_compliant+"&adobeCompatable="+_462;
if(detectAdobe(true)){
_463=true;
}
_465=_465+"&toolbar="+_463;
if(_45e!=null&&_45e!=""){
_465=_465+"&CatPage="+_45e;
}
if(_45f==null||_45f==""){
_465=_465+"&Catalog=main";
_461="viewCatalogPDF.shtml"+_464+_465;
var _466=window.location.pathname;
var _467=_466.indexOf("/cgi-bin/");
if(_466.indexOf("wwg")==-1){
if(_467==-1){
_461="/Grainger/wwg/"+_461;
}else{
var _468=_466.indexOf("/",9);
var _469=_466.substring(_467,_468);
_461=_469+"/wwg/"+_461;
}
}
}else{
if(_45f.indexOf("?")!=-1){
_464="&";
}else{
_465=_465+"&Catalog=main";
}
_461=_45f+_464+_465;
}
if(_460){
_461="/Grainger/"+_461;
}
return _461;
};
function iframeRefresh(_46a){
if(detectAdobe(true)){
parent.location.reload();
if(_46a!=null){
alert("Please click OK to view the Help Pop-up Window.");
openIt(_46a);
}
}
};
function showPopup(url,_46c,_46d){
var _46e=window.open(url,"childwin","width="+_46c+",height="+_46d+",menubar=no,scrollbars,status=no");
iframeRefresh(_46e);
};
function popUpPositionWidth(_46f){
var _470=(_46f)/2;
var xMax=screen.width;
var _472=((xMax)/2)-_470;
return _472;
};
function popUpPositionHeight(_473){
var _474=(_473)/2;
yMax=screen.height;
yOffset=((yMax)/2)-_474;
return yOffset;
};
function popWin(url,_476,_477,_478,_479,_47a,menu,_47c,_47d,_47e){
if(_476==null||_476==""){
_476=400;
}
if(_477==null||_477==""){
_477=400;
}
if(_479==null||_479==""){
_479="no";
}
if(_47a==null||_47a==""){
_47a="no";
}
if(menu==null||menu==""){
menu="no";
}
if(_47c==null||_47c==""){
_47c="no";
}
if(_47d==null||_47d==""){
_47d="no";
}
if(_47e==null||_47e==""){
_47e="childwin";
}
goBack(_478);
if(window.location.pathname.indexOf("PDF")==-1){
popupwindow=window.open(url,_47e,"width="+_476+",height="+_477+",menubar="+menu+",scrollbars,status="+_47d+",toolbar="+_479+",location="+_47a+",resizable="+_47c);
if(_47e=="mastersetWindow"){
moveX=0;
moveY=0;
if(is_firefox){
moveY=500;
}
openIt(popupwindow,moveX,moveY);
}else{
openIt(popupwindow);
}
}else{
showPopup(url,_476,_477);
}
};
function popWinSurvey(url,_480){
goBack(_480);
popupwindow=window.open(url,"childwin","menubar=no,scrollbars,status=no");
openIt(popupwindow);
};
function openIt(_481,_482,_483){
_481.focus();
if(!_481.opener){
_481.opener=window;
}
if((_482!=null)&&(_483!=null)){
_481.moveTo(_482,_483);
}
};
function goBack(qty){
if(qty!=null&&qty.length>0){
window.history.go(qty);
}
};
function submitSearch(form,obj){
if(!isNullSearch(obj)){
form.submit();
}
};
function isNullSearch(obj){
var _488=obj.value;
_488=_488.replace(/^\s+/,"").replace(/\s+$/,"");
if((_488==null)||(_488=="")){
alert("Please enter text to search.");
return true;
}
return false;
};
function isValidQuantity(obj){
var qty=obj.value;
qty=qty.replace(/^\s+/,"").replace(/\s+$/,"");
if(qty==""||qty=="Qty"){
return true;
}
var _48b=/^[0-9]*$/;
if(_48b.test(qty)==false||parseInt(qty,10)<=0){
alert("You have entered an invalid character in the quantity field for one or more item \nnumbers.  Please double check the quantity field(s) on this page and ensure that\neach one only contains a positive number.");
unlocksubmit();
obj.focus();
return false;
}
return true;
};
function isEmptyItemRow(_48c,_48d){
if((_48d.value.replace(/^(\s)+$/,"")==""||_48d.value.toUpperCase()=="ITEM #")){
return true;
}else{
return false;
}
};
function isValidItemRow(_48e,_48f){
if(isValidQuantity(_48e)){
if(_48f.value.toUpperCase()=="ITEM #"||_48f.value.replace(/^(\s)+$/,"")==""){
alert("Please enter an item number.");
unlocksubmit();
_48f.focus();
}else{
if(_48e.value=="Qty"){
_48e.value="";
}
return true;
}
}else{
_48e.focus();
}
return false;
};
function validateSearchQuery(_490){
return (!isNullSearch(_490));
};
var cansubmit=true;
function _submitOnce(){
if(cansubmit){
cansubmit=false;
return true;
}
return false;
};
function unlocksubmit(){
cansubmit=true;
};
unlocksubmit();
function forward(page){
document.location=page;
};
function getElmtRef(_492){
if(!document.getElementById){
return document.all[_492];
}else{
return document.getElementById(_492);
}
};
String.prototype.trim=function(){
return this.replace(/^\s+|\s+$/g,"");
};
String.prototype.endsWith=function(){
if(arguments.length!=1){
return true;
}
var s=arguments[0];
if(this.length>=s.length){
return this.substring(this.length-s.length,this.length)==s;
}else{
return false;
}
};
function createCookie(name,_495,days){
if(days){
var date=new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var _498="; expires="+date.toGMTString();
}else{
var _498="";
}
document.cookie=name+"="+_495+_498+"; path=/";
};
function readCookie(name){
var _49a=name+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_49a)==0){
return c.substring(_49a.length,c.length);
}
}
return null;
};
function eraseCookie(name){
createCookie(name,"",-1);
};
function elipsis(_49f,_4a0){
if(_49f&&_4a0){
_4a0=parseInt(_4a0);
var _4a1;
if(_49f.length>_4a0){
_4a1="<span title=\""+_49f+"\">"+_49f.substring(0,_4a0-4)+"&nbsp;...</span>";
}else{
_4a1=_49f;
}
return _4a1;
}
return _49f;
};
function decodeUrlChars(_4a2){
return _4a2.replace(/%22/g,"\"").replace(/%27/g,"'");
};
var cookiesEnabled=true;
function cookieCheck(){
var _4a3=new Date();
_4a3.setFullYear(_4a3.getFullYear()+1);
document.cookie="cookies=true; expires="+_4a3.toGMTString()+"; path=/";
document.cookie="grainger=true; path=/";
var _4a4=!(document.cookie.indexOf("grainger=")==-1);
var _4a5=!(document.cookie.indexOf("cookies=")==-1);
if(!_4a4||!_4a5){
cookiesEnabled=false;
}
};
cookieCheck();
function alternateTableRows(_4a6){
if(document.getElementsByTagName){
var _4a7=document.getElementById(_4a6);
var rows=_4a7.getElementsByTagName("tr");
for(i=0;i<rows.length;i++){
if(i%2!=0){
rows[i].className="trgray";
}
}
}
};
function getBaseApplicationURL(){
var uri=location.protocol+"//"+document.domain+location.pathname;
var _4aa=new RegExp("(https*://.*?/(Grainger|gcom_a[0-9]+|cgi-bin/gcom_a[0-9]+))/.*");
return (uri.replace(_4aa,"$1"));
};
function loadJavaScript(_4ab){
var _4ac=document.getElementsByTagName("head").item(0);
var js=document.createElement("script");
js.setAttribute("language","javascript");
js.setAttribute("type","text/javascript");
js.setAttribute("src",_4ab);
if(_4ab.indexOf("dojo.js")>=0){
js.setAttribute("djConfig","parseOnLoad: true");
}
_4ac.appendChild(js);
};
function loadCSS(_4ae){
var _4af=document.getElementsByTagName("head").item(0);
var css1=document.createElement("link");
css1.setAttribute("rel","stylesheet");
css1.setAttribute("type","text/css");
css1.setAttribute("href",_4ae);
_4af.appendChild(css1);
};
function submitEnter(_4b1){
submitEnter(_4b1,"signinForm");
};
function submitEnter(_4b2,_4b3){
var _4b4;
if(window.event){
_4b4=window.event.keyCode;
}else{
if(_4b2){
_4b4=_4b2.which;
}else{
return true;
}
}
if(_4b4==13){
document.getElementById(_4b3).submit();
return false;
}else{
return true;
}
};
function enterKeyPressed(_4b5){
var _4b6;
if(window.event){
_4b6=window.event.keyCode;
}else{
if(_4b5){
_4b6=_4b5.which;
}else{
return false;
}
}
if(_4b6==13){
return true;
}else{
return false;
}
};
function showSignIn(){
var _4b7=readCookie("ActiveXEnabled");
if(_4b7=="false"){
window.location=getBaseApplicationURL()+"/wwg/loginOrRegister.shtml";
}
var _4b8;
if(window.location.href.indexOf("viewCatalogPDF.shtml")>-1){
_4b8="56px";
}else{
_4b8="150px";
}
dojo.extend(dijit.Dialog,{_position:function(){
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var node=this.domNode;
var _4ba=dijit.getViewport();
var p=this._relativePosition;
var mb=p?null:dojo.marginBox(node);
dojo.style(node,{left:Math.floor(_4ba.l+(p?p.l:(_4ba.w-mb.w)/2))+"px",top:_4b8});
}
}});
var _4bd=dijit.byId("signin");
_4bd.show();
var _4be=dojo.byId("loginSubmit");
if(_4be!=null){
_4be.onclick=function(){
_4be.disabled=true;
dojo.byId("signinForm").submit();
return (false);
};
}
document.signinForm.currentPageURL.value=window.location.href;
document.signinForm.userName.focus();
};
var performKeywordSearch=function(form){
if(null!=form.searchQuery&&form.searchQuery.value.length>0){
if(form.searchQuery.value=="Enter keyword or part number"){
alert("Please enter a search value.");
return (false);
}
form.searchQuery.value=form.searchQuery.value.replace(/^\s*|\s*$/g,"");
if(getQueryParam("sst")!=""){
form.sst.value=getQueryParam("sst");
}
if(form.searchQuery.value.length>0){
if(form.Ntt.value.length>0){
form.Ntt.value+="|"+form.searchQuery.value;
}else{
form.Ntt.value=form.searchQuery.value;
}
form.submit();
return (true);
}
}
alert("Please enter a search value.");
return (false);
};
function getQueryParam(key){
var _4c1=window.location.search.substring(1);
var vars=_4c1.split("&");
for(var i=0;i<vars.length;i++){
var _4c4=vars[i].split("=");
if(_4c4[0]==key){
return _4c4[1];
}
}
return "";
};
function searchTypeChange(obj){
if(dojo.byId("mixedviewSearchType").value!=obj.value){
dojo.byId("mixedviewSearchType").value=obj.value;
var _4c6="";
var _4c7="";
if(window.location.href.indexOf("homepage.jsp")!=-1){
_4c6="homepage.jsp";
_4c7="?searchType="+obj.value;
}else{
if(window.location.href.indexOf("start.shtml")!=-1){
_4c6="start.shtml";
_4c7="?searchType="+obj.value;
}else{
if(window.location.href.indexOf("search.shtml")!=-1){
_4c6="search.shtml";
_4c7="?op=search&searchType="+obj.value;
}else{
if(window.location.href.indexOf("compareItemsRender.shtml")!=-1){
_4c6="compareItemsRender.shtml";
_4c7="?searchType="+obj.value;
}else{
if(window.location.href.indexOf("/ecatalog/")!=-1){
_4c6="/ecatalog/";
_4c7="N-?searchType="+obj.value;
}
}
}
}
}
if(_4c7!=""){
var idx=window.location.href.indexOf(_4c6);
window.location.href=window.location.href.substr(0,idx+_4c6.length)+_4c7;
}
}
};
var containsElement=function(arr,ele){
var _4cb=false,_4cc=0;
while(!_4cb&&_4cc<arr.length){
if(arr[_4cc]==ele){
_4cb=true;
}else{
_4cc++;
}
}
return _4cb;
};
var autoCursor=function(_4cd,len,e){
var _4d0=(is_nav)?e.which:e.keyCode;
var _4d1=(is_nav)?[0,8,9]:[0,8,9,16,17,18,37,38,39,40,46];
if(_4cd.value.length>=len&&!containsElement(_4d1,_4d0)){
_4cd.value=_4cd.value.slice(0,len);
var _4d2=getIndex(_4cd);
for(var i=(_4d2+1)%_4cd.form.length;i!=_4d2;i=++i%_4cd.form.length){
try{
_4cd.form[i].focus();
break;
}
catch(e){
continue;
}
}
}
return true;
};
var getIndex=function(_4d4){
var _4d5=-1,i=0,_4d7=false;
while(i<_4d4.form.length&&_4d5==-1){
if(_4d4.form[i]==_4d4){
_4d5=i;
}else{
i++;
}
}
return _4d5;
};
function vmiddleimg(_4d8,_4d9){
var _4da=getElmtRef(_4d8);
_4da.style.top=-(_4d9/2);
};
var showMSDS=function(_4db,_4dc){
var url=_4dc+"/grainger/loadmsds.asp?id=";
url+=_4db;
var top=100;
var left=200;
var _4e0="toolbar=yes,location=no,status=no,menubar=yes,scrollbars=yes,resizable=no,width=765,height=500,top="+top+",left="+left;
var _4e1=window.open(url,null,_4e0);
if(window.focus){
_4e1.focus();
}
};
function partialWipeOut(args){
var node=args.node=dojo.byId(args.node),s=node.style,o;
var _4e6=(args.height&&args.height.end)?args.height.end:1;
var anim=dojo.animateProperty(dojo.mixin({properties:{height:{end:_4e6}}},args));
return anim;
};
dojo.addOnLoad(function(){
var _4e8=dijit.byId("lssWelcomeDialog");
var _4e9=getQuerystring("r");
if(_4e9=="l"){
var _4ea=readCookie("lssWelcomeCount");
if(_4ea==null){
createCookie("lssWelcomeCount",1,360);
}
if(_4ea<2){
createCookie("lssWelcomeCount",++_4ea,360);
cmCreatePageviewTag("/Grainger/wwg/lssintegration/redirectmodal","","","","-5694","GIS","","","","","","","","","","","","");
_4e8.show();
}
}else{
if(_4e9=="a"){
cmCreatePageviewTag("/Grainger/wwg/lssintegration/redirectmodal","","","","-5694","GIS","","","","","","","","","","","","");
_4e8.show();
}
}
});
function getQuerystring(key,_4ec){
if(_4ec==null){
_4ec="";
}
key=key.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var _4ed=new RegExp("[\\?&]"+key+"=([^&#]*)");
var qs=_4ed.exec(window.location.href);
if(qs==null){
return _4ec;
}else{
return qs[1];
}
};
var seoLinkHandler=function(obj,_4f0){
if(typeof obj=="object"&&obj.tagName=="A"){
_4f0=_4f0.replace(/^(\?|&)/,"");
if(obj.href.indexOf("?")!=-1){
document.location=obj.href+"&"+_4f0;
}else{
document.location=obj.href+"?"+_4f0;
}
}
};
var djConfig={parseOnLoad:true,isDebug:false,preventBackButtonFix:false,dojoIframeHistoryUrl:"/dojo/dojo/resources/iframe_history.html"};
function debug(msg){
if(djConfig.isDebug){
console.log(msg);
}
};
function ajaxCall(_4f2,_4f3){
_4f2=_4f2||"POST";
if(_4f2=="POST"){
dojo.xhrPost(_4f3);
}else{
if(_4f2=="GET"){
dojo.xhrGet(_4f3);
}else{
dojo.xhrPost(_4f3);
}
}
};
var defaultBackButtonHandler={handle:function(_4f4){
var _4f5=(_4f4.mimetype)?true:false;
if(_4f4.response){
if(_4f5){
if(_4f4.load){
_4f4.load("",_4f4.response,"");
}else{
_4f4.handle("",_4f4.response,"");
}
}else{
if(_4f4.load){
_4f4.load(response,"");
}else{
_4f4.handle(response,"");
}
}
}else{
if(_4f5){
dojoBind({bindObj:_4f4});
}else{
ajaxCall(_4f4.method,_4f4);
}
}
}};
ApplicationState=function(_4f6,_4f7,_4f8){
this.stateData=_4f6;
this.backButtonHandler=((!_4f7)||_4f7=="")?defaultBackButtonHandler:_4f7;
this.changeUrl=_4f8||(new Date()).getTime();
};
dojo.extend(ApplicationState,{back:function(){
debug("BACK for State Object: "+this.stateData);
this.handleImpl();
},forward:function(){
debug("FORWARD for State Object: "+this.stateData);
this.handleImpl();
},handleImpl:function(){
if(!this.backButtonHandler.handle){
debug("handleBackButton function is not implemented in the backButtonHandler");
}else{
this.backButtonHandler.handle(this.stateData);
}
}});
if(readCookie("debug")){
djConfig.isDebug=true;
}
function isXmlhttpRequestSupported(){
var xhr=null;
try{
xhr=dojo._xhrObj();
}
catch(e){
}
return (!xhr)?false:true;
};
function isAjaxSupported(){
return isXmlhttpRequestSupported();
};
function convertToXhrArgs(_4fa){
var _4fb={url:_4fa.url,content:_4fa.content,form:_4fa.formNode,sync:_4fa.sync||false,error:function(_4fc,_4fd){
return _4fa.error("",_4fc);
},method:_4fa.method,handleAs:getHandleAs(_4fa.mimetype),load:function(_4fe,_4ff){
return _4fa.load("",_4fe,"");
}};
return _4fb;
};
function getHandleAs(_500){
_500=_500||"text/html";
if(_500=="text/html"||_500=="text/plain"){
return "text";
}
if(_500.indexOf("javascript")>0){
return "javascript";
}
if(_500.indexOf("xml")>0){
return "xml";
}
return "text";
};
function modifyInputFields(_501,_502){
var _503=document.getElementById(_501);
if(_503!=null&&_503.tagName=="FORM"){
for(var i=0;i<_503.length;i++){
var _505=_503[i];
if(_505.tagName=="INPUT"){
if(!_502){
_505.disabled=true;
}else{
_505.disabled=false;
}
}
}
}
};
function processAjaxResponse(_506){
debug("ajax response: "+_506);
if(_506.toLowerCase().indexOf("<ajax-response>")<0){
document.write(_506);
document.close();
return;
}
xmlDoc=dojox.data.dom.createDocument(_506);
var _507=xmlDoc.getElementsByTagName("error");
if(_507!=null&&_507.length>0){
processErrors(_507);
}else{
var _508=xmlDoc.getElementsByTagName("field");
processFields(_508);
}
};
function processErrors(_509){
for(var i=0;i<_509.length;i++){
var _50b=_509[i].getAttribute("value");
if(_50b==null){
if(window.ActiveXObject){
_50b=_509[i].firstChild.nodeValue.trim();
}else{
_50b=_509[i].childNodes[1].nodeValue.trim();
}
}
alert(_50b);
}
};
function processFields(_50c){
for(var i=0;i<_50c.length;i++){
var id=_50c[i].getAttribute("id");
if(!dojo.byId(id)){
continue;
}
var _50f=_50c[i].getAttribute("attribute");
var _510=_50c[i].getAttribute("value");
if(_510==null){
if(window.ActiveXObject){
_510=_50c[i].firstChild.nodeValue.trim();
}else{
_510="";
for(var _511=0;_511<_50c[i].childNodes.length;++_511){
_510+=_50c[i].childNodes[_511].nodeValue.trim();
}
}
}
eval("window.replaceValue = function(value) { dojo.byId('"+id+"')."+_50f+" = value;}");
replaceValue(_510);
if(_50f=="innerHTML"&&_510!=null&&_510.length>0){
var node=null;
node=dojo.byId(id);
var _513=node.getElementsByTagName("script");
for(var j=0;j<_513.length;j++){
var src=_513[j].getAttribute("src");
if(src!=null&&src!=""){
if(src.indexOf("dojo.js")<0){
dojo.xhrGet({url:src,handleAs:"javascript",load:function(_516,_517){
},sync:true,error:function(_518,_519){
alert("Error: "+_518);
}});
}
}else{
var _51a="";
if(window.ActiveXObject){
_51a=_513[j].text.trim();
}else{
for(var _511=0;_511<_513[j].childNodes.length;++_511){
_51a+=_513[j].childNodes[_511].nodeValue.trim();
}
}
eval(_51a);
}
}
}
}
};
function dojoBind(oArg){
var _51c=true;
if(oArg.resetTimoutCounter==undefined){
_51c=true;
}else{
_51c=oArg.resetTimoutCounter;
}
if(_51c){
sessionResetCount=0;
}
if(is_ie&&!isXmlhttpRequestSupported()){
var _51d=true;
if(oArg.showMsg==undefined){
_51d=true;
}else{
_51d=oArg.showMsg;
}
if(_51d){
alert("To complete this action, your Internet Explorer browser must have\r\nActiveX controls enabled.   Please update your browser, use a different\r\nbrowser or contact Customer Care at 1-888-361-8649, 24 hours a day,\r\n7 days a week for assistance.");
}
if(oArg.none!=undefined){
for(var i=0;i<oArg.none.length;i++){
if(dojo.byId(oArg.none[i])){
dojo.byId(oArg.none[i]).style.display="none";
}
}
}
if(oArg.inline!=undefined){
for(var i=0;i<oArg.inline.length;i++){
if(dojo.byId(oArg.inline[i])){
dojo.byId(oArg.inline[i]).style.display="inline";
}
}
}
return -1;
}
oArg.bindObj.sendTransport=true;
ajaxCall(oArg.bindObj.method,convertToXhrArgs(oArg.bindObj));
};
function getProfilePageViewURL(){
return (getBaseApplicationURL()+"/wwg/cmProfilePageView.shtml");
};
function getFirePageViewTagBindArgs(_51f,_520,_521){
if(_51f==null||_51f==""){
_51f="";
}
if(_521==null||_521==""){
_521="";
}
var uri=getProfilePageViewURL();
var _523={url:uri,content:{name:_51f,pageid:_520,searchString:_521},method:"POST",mimetype:"text/html",load:function(type,_525,evt){
this.response=_525;
processAjaxResponse(_525);
},error:function(type,_528){
}};
return _523;
};
function firePageViewTag(_529,_52a,_52b,_52c){
if(_52c==null||_52c==""){
resetTimout=true;
}
var _52d=getFirePageViewTagBindArgs(_529,_52a,_52b,_52c);
dojoBind({bindObj:_52d,showMsg:false,resetTimoutCounter:_52c});
};
function getPageCMTargetUrl(_52e){
_52e=_52e||"";
var idx=_52e.indexOf(location.hostname);
if(idx>0){
idx+=location.hostname.length;
return _52e.substring(idx);
}else{
return _52e;
}
};
var cmCreateLinkTag;
function createPageMenuItem(_530,_531){
var _532=_531.selected;
var _533=_531.expandable;
var _534="";
var _535="";
if(_533==1){
_535=_531.altText+"(+)";
}else{
_535=_531.altText;
}
if(_532==1){
_534=_531.altText;
}else{
_534="<a href=\""+_531.absoluteLink+"\" "+"onClick=\"return cmCreateManualLinkClickTag("+"'"+getPageCMTargetUrl(_531.absoluteLink)+"', '"+(_531.formatedCMLinkName||"")+"', '"+location.pathname+"');"+"\" "+"target='"+(_531.external?"_blank":(_531.target||""))+"' "+">"+_535+"</a>";
}
return _534;
};
function createPageLevelToolbar(_536,_537){
var _538=new Object;
var _539=new Array();
var _53a="";
var _53b=new Boolean(false);
var _53c="";
if(_537.length>0){
for(var z=0;z<_537.length;z++){
_538.parentMenu=_537[z].parentMenu;
_538.HTMLMenu=getSecondLevelMenuHtml(_537[z]);
_539[z]=_538;
}
}
if(undefined!=_536){
var _53e=_536.menuName;
_53c="<span class='pageMenuTitle'><h3 class='h3Access'>"+_53e+"</h3></span>";
_53c+="<ul>";
for(var i=0;i<_536.menuItems.length;i++){
var _540=_536.menuItems[i];
var menu=createPageMenuItem(i,_540);
_53c+="<li>&#8226&#32;";
_53c+=menu;
if(_539.length>0){
for(var x=0;x<_539.length;x++){
var _543=_539[x].parentMenu;
if((i+1)==_543){
_53c+=_539[x].HTMLMenu;
}else{
if(_543==0){
_53b=true;
}
}
}
}
_53c+="</li>";
}
if(_53b){
if(_539.length>0){
for(var x=0;x<_539.length;x++){
var _543=_539[x].parentMenu;
if(_543==0){
_53a+=_539[x].HTMLMenu;
}
}
}
}
_53c+=_53a;
_53c=_53c+"</ul>";
}
return _53c;
};
function getSecondLevelMenuHtml(_544){
var _545="<ul>";
for(var x=0;x<_544.menuItems.length;x++){
var _547=_544.menuItems[x];
var _548=createPageMenuItem(x,_547);
_545=_545+"<li>&#183&#32;";
_545=_545+_548;
_545=_545+"</li>";
}
_545=_545+"</ul>";
return _545;
};
function createPageLevelMenu(_549){
var _54a=_549.menuList;
var _54b=document.getElementById("secondaryNavMenus");
var _54c;
var _54d;
var _54e=new Array();
var _54f=0;
if(undefined!=_54b&&null!=_54b){
for(var i=0;i<_54a.length;i++){
var _551=_54a[i];
var _552=_551.parentMenu;
if(_552==0&&i==0){
_54d=_551;
}else{
_54e[_54f]=_551;
_54f++;
}
}
_54c=createPageLevelToolbar(_54d,_54e);
_54b.innerHTML=_54c;
}
};
dojo.i18n._preloadLocalizations("dojo.nls.gcb_min",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nl","nl-nl","no","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
